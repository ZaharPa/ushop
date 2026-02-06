<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RecommandationService
{
    public function getRecommendedProducts($userId = null, $limit = 10)
    {
        $userId = $userId ?? Auth::id();
        if (!$userId) {
            $data = $this->getGuestRecomandations($limit);

            if ($data->isNotEmpty()) {
                return $data;
            }

            return $this->getPopularRecomandations($limit);
        }

        $ratingsCount = DB::table('ratings')->count();

        if ($ratingsCount < 20) {
            return $this->getPopularRecomandations($limit);
        }

        $userRatingsCount = DB::table('ratings')
            ->where('user_id', $userId)
            ->count();

        if ($userRatingsCount >= 3) {
            $data = $this->getHybridRecomandations($userId, $limit);
            if ($data->isNotEmpty()) {
                return $data;
            }
        }

        $data = $this->getViewBasedRecomandations($userId, $limit);
        if ($data->isNotEmpty()) {
            return $data;
        }

        return $this->getPopularRecomandations($limit);
    }

    private function getHybridRecomandations($userId, $limit)
    {
        $scores = [];

        $collavorativeProducts = $this->getCollaborativeRecomandations($userId, $limit * 2);
        foreach ($collavorativeProducts as $index => $product) {
            $scores[$product->id] = ($scores[$product->id] ?? 0) + (1 / ($index + 1)) * 0.4;
        }

        $contetBasedProducts = $this->getContentBasedRecomandations($userId, $limit * 2);
        foreach ($contetBasedProducts as $index => $product) {
            $scores[$product->id] = ($scores[$product->id] ?? 0) + (1 / ($index + 1)) * 0.3;
        }

        $viewBasedProducts = $this->getViewBasedRecomandations($userId, $limit * 2);
        foreach ($viewBasedProducts as $index => $product) {
            $scores[$product->id] = ($scores[$product->id] ?? 0) + (1 / ($index + 1)) * 0.3;
        }

        arsort($scores);

        $topProductsIds = array_slice(array_keys($scores), 0, $limit);

        return Product::with(['items', 'category'])
            ->withAvg('ratings', 'rating')
            ->whereIn('id', $topProductsIds)
            ->get()
            ->sortBy(function ($product) use ($topProductsIds) {
                return array_search($product->id, $topProductsIds);
            })
            ->values();
    }

    private function getCollaborativeRecomandations($userId, $limit)
    {
        $similarUsers = $this->findSimilarUsers($userId);

        if ($similarUsers->isEmpty()) {
            return collect();
        }

        return Product::with(['items', 'category'])
            ->withAvg('ratings', 'rating')
            ->whereHas('ratings', function ($query) use ($similarUsers) {
                $query->whereIn('user_id', $similarUsers);
            })
            ->whereDoesntHave('ratings', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderByDesc('ratings_avg_rating')
            ->take($limit)
            ->get();
    }

    private function getContentBasedRecomandations($userId, $limit)
    {
        $preferredCategories = DB::table('ratings')
            ->join('products', 'ratings.product_id', '=', 'products.id')
            ->where('ratings.user_id', $userId)
            ->where('ratings.rating', '>=', 3)
            ->pluck('products.category_id')
            ->unique();

        if ($preferredCategories->isEmpty()) {
            return collect();
        }

        return Product::with(['items', 'category'])
            ->withAvg('ratings', 'rating')
            ->whereIn('category_id', $preferredCategories)
            ->whereDoesntHave('ratings', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderByDesc('ratings_avg_rating')
            ->take($limit)
            ->get();
    }

    private function getViewBasedRecomandations($userId, $limit)
    {
        $viewedCategories = DB::table('product_views')
            ->join('products', 'product_views.product_id', '=', 'products.id')
            ->where('product_views.user_id', $userId)
            ->where('product_views.viewed_at', '>=', now()->subDays(30))
            ->pluck('products.category_id')
            ->unique();

        if ($viewedCategories->isEmpty()) {
            return collect();
        }

        return Product::with(['items', 'category'])
            ->withAvg('ratings', 'rating')
            ->whereIn('category_id', $viewedCategories)
            ->whereDoesntHave('views', function ($query) use ($userId) {
                $query->where('user_id', $userId)
                    ->where('viewed_at', '>=', now()->subDays(30));
            })
            ->orderByDesc('ratings_avg_rating')
            ->take($limit)
            ->get();
    }

    private function getPopularRecomandations($limit)
    {
        return Product::with(['items', 'category'])
            ->whereHas('ratings')
            ->withAvg('ratings', 'rating')
            ->withCount('ratings')
            ->orderByRaw(
                'COALESCE(ratings_avg_rating, 0) * LOG(ratings_count + 1) DESC'
            )
            ->take($limit)
            ->get();
    }


    private function getGuestRecomandations($limit)
    {
        $sessionId = session()->getId();

        $viewedCategories = DB::table('product_views')
            ->join('products', 'product_views.product_id', '=', 'products.id')
            ->where('product_views.session_id', $sessionId)
            ->where('product_views.viewed_at', '>=', now()->subDays(30))
            ->pluck('products.category_id')
            ->unique();

        if ($viewedCategories->isEmpty()) {
            return $this->getPopularRecomandations($limit);
        }

        return Product::with(['items', 'category'])
            ->withAvg('ratings', 'rating')
            ->whereIn('category_id', $viewedCategories)
            ->whereDoesntHave('views', function ($query) use ($sessionId) {
                $query->where('session_id', $sessionId)
                    ->where('viewed_at', '>=', now()->subDays(30));
            })
            ->orderByDesc('ratings_avg_rating')
            ->take($limit)
            ->get();
    }

    public function findSimilarUsers($userId)
    {
        return DB::table('ratings as r1')
            ->join('ratings as r2', 'r1.product_id', '=', 'r2.product_id')
            ->select('r2.user_id as similar_user', DB::raw('
            SUM(r1.rating * r2.rating) /
            NULLIF(
                (SQRT(SUM(POW(r1.rating, 2))) * SQRT(SUM(POW(r2.rating, 2)))),
                0
            ) as similarity
            '))
            ->where('r1.user_id', $userId)
            ->where('r2.user_id', '!=', $userId)
            ->groupBy('r2.user_id')
            ->having('similarity', '>', 0.3)
            ->orderByDesc('similarity')
            ->limit(20)
            ->pluck('similar_user');
    }
}

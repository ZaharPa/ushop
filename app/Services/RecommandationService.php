<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

class RecommandationService
{
    public function findSimilarUsers($userId)
    {
        return DB::table('ratings as r1')
            ->join('ratings as r2', 'r1.product_id', '=', 'r2.product_id')
            ->select('r2.user_id as similar_user', DB::raw('
            SUM(r1.rating * r2.rating) /
            (SQRT(SUM(POW(r1.rating, 2))) * SQRT(SUM(POW(r2.rating, 2)))) as similarity
            '))
            ->where('r1.user_id', $userId)
            ->where('r2.user_id', '!=', $userId)
            ->groupBy('r2.user_id')
            ->having('similarity', '>', 0.5)
            ->orderByDesc('similarity')
            ->pluck('similar_user');
    }

    public function getRecommendedProducts($userId)
    {
        $similarUsers = $this->findSimilarUsers($userId);

        return Product::with('items:id,product_id')
            ->withAvg('ratings', 'rating')
            ->whereHas('ratings', function ($query) use ($similarUsers) {
                $query->whereIn('user_id', $similarUsers);
            })
            ->whereDoesntHave('ratings', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderByDesc('ratings_avg_rating')
            ->take(10)
            ->get();
    }
}

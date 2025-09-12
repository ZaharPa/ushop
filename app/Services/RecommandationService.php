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

        return Product::select(
            'products.id',
            'products.name',
            'products.description',
            'products.average_rating',
            'products.photo',
            'products.category_id',
            DB::raw('AVG(rating) as avg_rating')
        )
            ->join('ratings', 'products.id', '=', 'ratings.product_id')
            ->whereIn('ratings.user_id', $similarUsers)
            ->whereNotIn('products.id', function ($query) use ($userId) {
                $query->select('product_id')
                    ->from('ratings')
                    ->where('user_id', $userId);
            })
            ->groupBy('products.id', 'products.name', 'products.description', 'products.average_rating', 'products.photo', 'products.category_id')
            ->orderByDesc('avg_rating')
            ->take(10)
            ->get();
    }
}

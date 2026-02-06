<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductView;

class ProductViewService
{
    public function recordView(Product $product)
    {
        $userId = auth()->id();
        $sessionId = session()->getId();
        $ipAddress = request()->ip();


        $recentView = ProductView::where('product_id', $product->id)
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->where('viewed_at', '>', now()->subMinutes(30))
            ->exists();

        if (!$recentView) {
            ProductView::create([
                'user_id' => $userId,
                'product_id' => $product->id,
                'session_id' => $sessionId,
                'ip_address' => $ipAddress,
                'viewed_at' => now(),
            ]);
        }
    }

    public function getUserViewHistory($userId = null, $limit = 20)
    {
        $userId = $userId ?? auth()->id();

        if (!$userId) {
            return ProductView::with(['product.items', 'product.category'])
                ->where('session_id', session()->getId())
                ->orderByDesc('viewed_at')
                ->take($limit)
                ->get();
        }

        return ProductView::with(['product.items', 'product.category'])
            ->where('user_id', $userId)
            ->orderByDesc('viewed_at')
            ->take($limit)
            ->get();
    }

    public function getMostViewedProducts($days = 30, $limit = 10)
    {
        return Product::with(['items', 'category'])
            ->withCount(['views' => function ($query) use ($days) {
                $query->where('viewed_at', '>', now()->subDay($days));
            }])
            ->withAvg('ratings', 'rating')
            ->having('views_count', '>', 0)
            ->orderByDesc('views_count')
            ->take($limit)
            ->get();
    }

    public function cleanOldView($days = 90)
    {
        return ProductView::where('viewed_at', '<', now()->subDays($days))
            ->delete();
    }
}

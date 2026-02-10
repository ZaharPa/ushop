<?php

namespace App\Traits;

use App\Services\ProductViewService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

trait HasRecentlyViewed
{
    protected function getRecentlyViewed($limit = 8)
    {
        $userId = Auth::id();

        if (!$userId) {
            return [];
        }

        return Cache::remember("recently_viewed_{$userId}", 30, function () use ($userId, $limit) {
            $service = app(ProductViewService::class);
            return $service->getUserViewHistory($userId, $limit);
        });
    }
}

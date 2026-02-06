<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RecommandationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class RecommandationController extends Controller
{
    protected $recommandationService;

    public function __construct(RecommandationService $recommandationService)
    {
        $this->recommandationService = $recommandationService;
    }

    public function index()
    {
        $userId = auth()->id();

        if ($userId) {
            $cacheKey = "recommendations_user_{$userId}";
            $cacheDuration = 60 * 60;
        } else {
            $cacheKey = "recommendations_guest_" . session()->getId();
            $cacheDuration = 60 * 30;
        }

        $recommandations = Cache::remember($cacheKey, $cacheDuration, function () use ($userId) {
            return $this->recommandationService->getRecommendedProducts($userId);
        });

        return response()->json($recommandations);
    }
}

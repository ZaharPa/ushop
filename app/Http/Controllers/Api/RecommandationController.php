<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RecommandationService;
use Illuminate\Http\Request;

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

        $recommandationService = $this->recommandationService->getRecommendedProducts($userId);

        return response()->json($recommandationService);
    }
}

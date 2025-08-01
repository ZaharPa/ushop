<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = $request->input('query');

        $results = Product::where('name', 'like', "%query%")
            ->limit(5)
            ->pluck('name');

        return response()->json([
            'suggestions' => $results,
        ]);
    }
}

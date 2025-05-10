<?php

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryFeatureController extends Controller
{
    public function __invoke(Category $category)
    {
        $features = $category->features;

        return response()->json($features);
    }
}

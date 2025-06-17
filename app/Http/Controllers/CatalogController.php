<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only([
            'name',
            'category',
        ]);

        return inertia('Catalog', [
            'filters' => $filters,
            'categories' => Category::all(),
            'products' => Product::with(['category', 'features'])
                ->filter($filters)
                ->latest()
                ->paginate(10),
        ]);
    }
}

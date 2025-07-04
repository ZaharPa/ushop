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
            'sort',
            'min_price',
            'max_price',
            'showUnavailable',
        ]);

        $filters['showUnavailable'] = filter_var($filters['showUnavailable'] ?? false, FILTER_VALIDATE_BOOLEAN);

        return inertia('Catalog', [
            'filters' => $filters,
            'categories' => Category::all(),
            'products' => Product::with([
                'category',
                'items' => fn($q) => $q->orderBy('price'),
            ])
                ->withMin('items', 'price')
                ->filter($filters)
                ->orderByRaw('items_min_price IS NULL, items_min_price ASC')
                ->paginate(10),
        ]);
    }
}

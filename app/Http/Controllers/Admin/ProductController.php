<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only([
            'name',
            'category',
            'priceFrom',
            'priceTo'
        ]);

        return inertia('Admin/Product/Index', [
            'filters' => $filters,
            'categories' => Category::all(),
            'products' => Product::with('category')
                ->filter($filters)
                ->latest()
                ->paginate(10),
        ]);
    }

    public function create()
    {
        return inertia('Admin/Product/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}

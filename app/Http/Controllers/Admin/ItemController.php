<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Item;
use App\Models\Product;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        return inertia('Admin/Item/Index', [
            'products' => Product::all(),
            'items' => Item::with(['product', 'attribute_value'])
                ->latest()
                ->paginate(15)
        ]);
    }

    public function create()
    {
        return inertia('Admin/Item/Create', [
            'products' => Product::all(['id', 'name']),
            'attributes' => Attribute::with('values:id,value,attribute_id')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function edit(string $id)
    {
        //s
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

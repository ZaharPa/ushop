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
            'items' => Item::with(['product', 'attributeValues.attribute'])
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
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'attribute_values' => 'nullable|array',
            'attribute_values.*' => 'exists:attribute_values,id',
            'photo' => 'nullable|array',
            'photo.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $item = Item::create([
            'product_id' => $request->product_id,
            'price' => $request->price,
            'quantity' => $request->quantity,
        ]);

        if ($request->filled('attribute_values')) {
            $item->attributeValues()->attach($request->attribute_values);
        }

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $item->photos()->create([
                    'path' => $photo->store('items', 'public'),
                ]);
            }
        }

        return redirect()->route('admin.item.index')
            ->with('success', 'Item created successfully.');
    }

    public function edit(Item $item)
    {
        return inertia('Admin/Item/Edit', [
            'item' => $item->load(['product', 'attributeValues.attribute', 'photos']),
            'products' => Product::all(['id', 'name']),
            'attributes' => Attribute::with('values:id,value,attribute_id')->get(['id', 'name']),
        ]);
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

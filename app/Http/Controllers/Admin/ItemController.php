<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Item;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'photos' => 'nullable|array',
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

        return redirect()->intended('/admin/item')
            ->with('success', 'Item created successfully!');
    }

    public function edit(Item $item)
    {
        return inertia('Admin/Item/Edit', [
            'item' => $item->load(['product', 'attributeValues.attribute', 'photos']),
            'products' => Product::all(['id', 'name']),
            'attributes' => Attribute::with('values:id,value,attribute_id')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Item $item)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'attribute_values' => 'nullable|array',
            'attribute_values.*' => 'exists:attribute_values,id',
            'old_photos' => 'nullable|array',
            'old_photos.*' => 'exists:item_photos,id',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,jpg,png|max:2048',
        ]);

        $item->update($request->only('product_id', 'price', 'quantity'));
        $item->attributeValues()->sync($request->input('attribute_values', []));

        $oldPhotos = $request->input('old_photos', []);
        $item->photos()->whereNotIn('id', $oldPhotos)->get()->each(function ($photo) {
            Storage::disk('public')->delete($photo->path);
            $photo->delete();
        });

        if ($request->hasFile('photos') && is_array($request->file('photos'))) {
            foreach ($request->file('photos') as $photo) {
                $item->photos()->create([
                    'path' => $photo->store('items', 'public'),
                ]);
            }
        }

        return redirect()->intended('/admin/item')
            ->with('success', 'Item updated successfully!');
    }

    public function destroy(string $id)
    {
        //
    }
}

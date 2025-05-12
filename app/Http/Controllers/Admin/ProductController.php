<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only([
            'name',
            'category',
        ]);

        return inertia('Admin/Product/Index', [
            'filters' => $filters,
            'categories' => Category::all(),
            'products' => Product::with(['category', 'features'])
                ->filter($filters)
                ->latest()
                ->paginate(10),
        ]);
    }

    public function create()
    {
        return inertia('Admin/Product/Create', [
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'features' => 'nullable|array',
            'feature_values' => 'nullable|array',
        ]);

        if ($request->hasFile('photo')) {
            $imagePath = $request->file('photo')->store('products', 'public');
        } else {
            $imagePath = null;
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'photo' => $imagePath,
        ]);

        $features = $request->features ?? [];
        $featureValues = $request->feature_values ?? [];

        $syncData = [];

        foreach ($features as $featureId) {
            $value = $featureValues[$featureId] ?? '';

            $syncData[$featureId] = ['value' => (string) $value];
        }

        $product->features()->sync($syncData);

        return redirect()->intended('/admin/product')
            ->with('success', 'Product created successfully!');
    }


    public function edit(Product $product)
    {
        $product->load('features');

        return inertia('Admin/Product/Edit', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }


    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'features' => 'nullable|json',
            'feature_values' => 'nullable|json',
        ]);

        if ($request->hasFile('photo') && $product->photo != null) {
            Storage::disk('public')->delete($product->photo);
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'photo' => $request->hasFile('photo')
                ? $request->file('photo')->store('products', 'public')
                : $product->photo,
        ]);

        $features = json_decode($request->features, true) ?? [];
        $featureValues = json_decode($request->feature_values, true) ?? [];

        $syncData = [];

        foreach ($features as $featureId) {
            $value = $featureValues[$featureId] ?? '';

            $syncData[$featureId] = ['value' => is_array($value) ? json_encode($value) : (string) $value];
        }

        $product->features()->sync($syncData);

        return redirect()->intended('/admin/product')
            ->with('success', 'Product update successfully');
    }

    public function destroy(Product $product)
    {
        if ($product->photo) {
            Storage::disk('public')->delete($product->photo);
        }

        $product->deleteOrFail();

        return redirect()->intended('/admin/product')
            ->with('success', 'Product delete successfully');
    }

    public function restore(Product $product)
    {
        $product->restore();

        return redirect()->intended('/admin/product')
            ->with('success', 'Product restore successfully');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Category;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller
{
    public function index()
    {
        return inertia('Admin/Categories', [
            'categories' => Category::with('features', 'attributes')->latest()->paginate(5),
            'features' => Feature::all(),
            'attributes' => Attribute::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'slug' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'parent_id' => 'nullable|exists:categories,id',
            'features' => 'nullable|array',
            'features.*' => 'integer|exists:features,id',
            'attributes' => 'nullable|array',
            'attributes.*' => 'integer|exists:attributes,id',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
        } else {
            $imagePath = null;
        }

        $category = Category::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'image' => $imagePath,
            'parent_id' => $request->parent_id,
        ]);

        $category->features()->sync($request->features ?? []);
        $category->attributes()->sync($request->input('attributes' ?? []));

        return redirect()->back()
            ->with('success', 'Category created successfully!');
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'slug' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'parent_id' => 'nullable|exists:categories,id',
            'features' => 'nullable|array',
            'features.*' => 'integer|exists:features,id',
            'attributes' => 'nullable|array',
            'attributes.*' => 'integer|exists:attributes,id'
        ]);

        if ($request->hasFile('image') && $category->image != null) {
            Storage::disk('public')->delete($category->image);
        }

        $category->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'parent_id' => $request->parent_id,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('categories', 'public')
                : $category->image,
        ]);


        $category->features()->sync($request->features ?? []);
        $category->attributes()->sync($request->input('attributes' ?? []));

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category updated successfully!');
    }

    public function destroy(Category $category)
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->features()->detach();
        $category->attributes()->detach();

        $category->delete();

        return redirect()->back()
            ->with('success', 'Category deleted successfully!');
    }
}

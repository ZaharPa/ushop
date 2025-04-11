<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller
{
    public function index()
    {
        return inertia('Admin/Categories', [
            'categories' => Category::latest()->paginate(5),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
        } else {
            $imagePath = null;
        }

        Category::create([
            'name' => $request->name,
            'image' => $imagePath,
            'parent_id' => $request->parent_id,
        ]);

        return redirect()->back()
            ->with('success', 'Category created successfully!');
    }

    public function update(Request $request, Category $category)
    {
        dd($request->all());

        $request->validate([
            'name' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        if ($request->hasFile('image') && $category->image != null) {
            Storage::disk('public')->delete($category->image);
        }

        $category->update([
            'name' => $request->name,
            'parent_id' => $request->parent_id,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('categories', 'public')
                : $category->image,
        ]);

        return redirect()->back()
            ->with('success', 'Category updated successfully!');
    }

    public function destroy(Category $category)
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return redirect()->back()
            ->with('success', 'Category deleted successfully!');
    }
}

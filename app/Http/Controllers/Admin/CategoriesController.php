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
        ]);

        $imagePath = $request->file('image')->store('categories', 'public');

        Category::create([
            'name' => $request->name,
            'image' => $imagePath,
        ]);

        return redirect()->back()
            ->with('success', 'Category created successfully!');
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($category->image);
        }

        $category->update([
            'name' => $request->name,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('categories', 'public')
                : $category->image
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

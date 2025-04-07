<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

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
        ]);

        Category::create([
            'name' => $request->name
        ]);

        return redirect()->back()
            ->with('success', 'Category created successfully!');
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:50',
        ]);

        $category->update([
            'name' => $request->name
        ]);

        return redirect()->back()
            ->with('success', 'Category updated successfully!');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->back()
            ->with('success', 'Category deleted successfully!');
    }
}

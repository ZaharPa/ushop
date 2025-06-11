<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function index()
    {
        return inertia('Admin/Slider', [
            'slides' => Slider::orderBy('order', 'asc')->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'order' => 'nullable|integer|min:0',
            'link' => 'required|url',
        ]);

        $imagePath = $request->file('image')->store('slider', 'public');

        Slider::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'order' => $request->order,
            'link' => $request->link
        ]);

        return back()->with('success', 'Slide created successfully!');
    }

    public function update(Request $request, Slider $slider)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'order' => 'nullable|integer|min:0',
            'link' => 'required|url',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($slider->image);
        }

        $slider->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('slider', 'public')
                : $slider->image,
            'order' => $request->order,
            'link' => $request->link,
        ]);

        return back()->with('success', 'Slide updated successfully!');
    }

    public function destroy(Slider $slider)
    {
        Storage::disk('public')->delete($slider->image);

        $slider->delete();

        return back()->with('success', 'Slide deleted successfully!');
    }
}

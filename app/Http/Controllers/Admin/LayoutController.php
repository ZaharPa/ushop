<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LayoutLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LayoutController extends Controller
{
    public function index()
    {
        return inertia('Admin/Layout', [
            'links' => LayoutLink::orderBy('position')
                ->paginate(15)
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'label' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'position' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        LayoutLink::create($data);

        Cache::forget('layout_links');

        return back()->with('success', 'Layout link created successfully.');
    }

    public function update(Request $request, LayoutLink $layoutLink)
    {
        $data = $request->validate([
            'label' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'position' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        $layoutLink->update($data);

        Cache::forget('layout_links');

        return back()->with('success', 'Layout link updated successfully.');
    }

    public function destroy(LayoutLink $layoutLink)
    {
        $layoutLink->delete();

        Cache::forget('layout_links');

        return back()->with('success', 'Layout link deleted successfully.');
    }
}

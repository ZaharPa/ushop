<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{

    public function index()
    {
        return inertia('Admin/Feature', [
            'features' => Feature::paginate(20)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string'
        ]);

        Feature::create([
            'name' => $request->name,
        ]);

        return redirect()->back()
            ->with('success', 'Feature added successfully');
    }

    public function update(Request $request, Feature $feature)
    {
        $request->validate([
            'name' => 'required|string'
        ]);

        $feature->update([
            'name' => $request->name,
        ]);

        return redirect()->back()
            ->with('success', 'Feature update successfully');
    }

    public function destroy(Feature $feature)
    {
        $feature->delete();

        return redirect()->back()
            ->with('success', 'Feature deleted successfully');
    }
}

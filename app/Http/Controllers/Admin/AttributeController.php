<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    public function index()
    {
        return inertia('Admin/Attribute', [
            'attributes' => Attribute::with('values')
                ->latest()
                ->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'attribute' => 'required|string|max:50'
        ]);

        Attribute::create([
            'name' => $request->attribute,
        ]);

        return redirect()->back()
            ->with('success', 'Attribute created successfully!');
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

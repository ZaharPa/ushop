<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;

class AttributeValueController extends Controller
{

    public function store(Request $request, Attribute $attribute)
    {
        $request->validate(['name' => 'required|string|max:100']);

        $attribute->values()->create(['value' => $request->name]);

        return back()->with('success', 'Value added successfully!');
    }

    public function destroy(string $id)
    {
        //
    }
}

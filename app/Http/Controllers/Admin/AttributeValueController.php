<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;

class AttributeValueController extends Controller
{

    public function store(Request $request, Attribute $attribute)
    {
        $request->validate(['name' => 'required|string|max:100']);

        $attribute->values()->create(['value' => $request->name]);

        return back()->with('success', 'Value added successfully!');
    }

    public function destroy(Attribute $attribute, AttributeValue $value)
    {
        if ($value->attribute_id !== $attribute->id) {
            abort(404);
        }

        $value->delete();

        return back()->with('success', 'Value remove successfully!');
    }
}

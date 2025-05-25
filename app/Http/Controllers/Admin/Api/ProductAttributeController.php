<?php

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductAttributeController extends Controller
{
    public function __invoke(Product $product)
    {
        $attributes = $product->category
            ->attributes()
            ->with('values')
            ->get();

        return response()->json($attributes);
    }
}

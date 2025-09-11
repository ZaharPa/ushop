<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Product;
use Illuminate\Http\Request;

class ShowProductController extends Controller
{
    public function __invoke(Product $product, Item $item)
    {
        abort_unless($item->product_id === $product->id, 404);

        $product->load([
            'category',
            'features',
            'items.attributeValues.attribute',
            'items.photos',
            'items.discount',
        ]);

        $item->load([
            'attributeValues.attribute',
            'photos',
            'discount'
        ]);

        $rating = auth()->check()
            ? $product->ratings()->where('user_id', auth()->id())->first()
            : null;

        return inertia('ShowProduct', [
            'product' => $product,
            'item' => $item,
            'ratingUser' => $rating,
        ]);
    }
}

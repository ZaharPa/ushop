<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show()
    {
        $cart = session('cart', []);
        $items = Item::with('product')->find(array_keys($cart));

        $items = $items->map(function ($item) use ($cart) {
            $item->quantity = $cart[$item->id];
            return $item;
        });

        return inertia('Cart/Index', [
            'items' => $items
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        $items = Item::with('product')->find(array_keys($cart));

        $items = $items->map(function ($item) use ($cart) {
            $item->quantity = $cart[$item->id];
            return $item;
        });

        return inertia('Cart/Checkout', [
            'items' => $items
        ]);
    }

    public function store(Request $request)
    {
        //
    }
}

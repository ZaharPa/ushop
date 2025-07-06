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

    public function add(Request $request)
    {
        $request->validate([
            'item_id' => 'required|integer|exists:items,id',
        ]);

        $itemId = $request->input('item_id');

        $cart = session()->get('cart', []);

        $cart[$itemId] = ($cart[$itemId] ?? 0) + 1;

        session()->put('cart', $cart);

        return response()->noContent();
    }

    public function update(Request $request, Item $item)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = session()->get('cart', []);

        if (array_key_exists($item->id, $cart)) {
            $cart[$item->id] = $request->input('quantity');
            session()->put('cart', $cart);
        }

        return response()->noContent();
    }

    public function remove(Item $item)
    {
        $cart = session()->get('cart', []);
        unset($cart[$item->id]);
        session()->put('cart', $cart);

        return response()->noContent();
    }
}

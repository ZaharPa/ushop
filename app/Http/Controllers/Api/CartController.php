<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class CartController extends Controller
{

    public function add(Request $request)
    {
        $request->validate([
            'item_id' => 'required|integer|exists:items,id',
        ]);

        $itemId = $request->input('item_id');

        $cart = session()->get('cart', []);

        $cart[$itemId] = ($cart[$itemId] ?? 0) + 1;

        session()->put('cart', $cart);

        return response()->json(['status' => 'added']);
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

        return response()->json([
            'cart' => $cart,
        ]);
    }

    public function remove(Item $item)
    {
        $cart = session()->get('cart', []);
        unset($cart[$item->id]);
        session()->put('cart', $cart);

        return response()->json([
            'cart' => $cart,
        ]);
    }
}

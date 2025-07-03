<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AddToCartController extends Controller
{
    public function __invoke(Request $request)
    {
        $itemId = $request->input('item_id');

        $cart = session()->get('cart', []);

        $cart[$itemId] = ($cart[$itemId] ?? 0) + 1;

        session()->put('cart', $cart);

        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        $items = Item::with(['product', 'discount'])->find(array_keys($cart));

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
        $request->validate([
            'name' => 'required|string|max:150',
            'phone' => "required|string|max:15",
            'address' => "required|string|max:150",
            'address2' => "nullable|string|max:150",
            'email' => "nullable|email",
        ]);

        $cart = session('cart', []);
        $items = Item::with('discount')->find(array_keys($cart));

        $total_price = $items->sum(function ($item) use ($cart) {
            $quantity = $cart[$item->id];

            $price = $item->price;

            if (
                $item->discount && $item->discount->is_active &&
                (!$item->discount->start_data || $item->discount->start_date <= now()) &&
                (!$item->discount->start_data || $item->discount->start_date <= now())
            ) {
                $price -= $price * ($item->discount->percentage / 100);
            }

            return $price * $quantity;
        });

        DB::transaction(function () use ($request, $cart, $items, $total_price, &$order) {
            $order = Order::create([
                'user_id' => auth()->user()?->id,
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
                'address2' => $request->address2,
                'email' => $request->email,
                'total_price' => $total_price,
            ]);

            foreach ($items as $item) {
                $quantity = $cart[$item->id];

                $price = $item->price;

                if (
                    $item->discount && $item->discount->is_active &&
                    (!$item->discount->start_data || $item->discount->start_date <= now()) &&
                    (!$item->discount->start_data || $item->discount->start_date <= now())
                ) {
                    $price -= $price * ($item->discount->percentage / 100);
                }

                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $item->id,
                    'price' => $item->price,
                    'quantity' => $quantity,
                    'subtotal' => $price * $quantity,
                ]);
            }
        });

        return inertia('Cart/Payment', ['order' => $order]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Refund;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function create()
    {
        return inertia('Refund');
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'email' => 'required|email',
            'details' => 'required|string',
            'reason' => 'nullable|string',
        ]);

        $order = Order::findOrFail($request->order_id);

        Refund::create([
            'order_id' => $order->id,
            'user_id' => auth()->id() ?? null,
            'amount' => $order->total_price,
            'email' => $request->email,
            'details' => $request->details,
            'reason' => $request->reason,
            'status' => 'pending',
        ]);

        return redirect()->route('main')->with('success', 'Refund request submitted');
    }
}

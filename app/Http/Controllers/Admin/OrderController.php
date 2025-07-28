<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return inertia('Admin/Order/Index', [
            'orders' => Order::with(['user', 'items.item'])
        ]);
    }

    public function show(Order $order)
    {
        return inertia('Admin/Order/Show', [
            'order' => $order->load(['user', 'items.item'])
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order->update($request->only('status'));

        return redirect()->route('admin.order.index')
            ->with('success', 'Order status updated successfully!');
    }
}

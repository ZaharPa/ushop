<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\OrderStatusUpdated;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function index()
    {
        return inertia('Admin/Order/Index', [
            'ordersByStatus' => [
                'pending' => Order::where('status', 'pending')->orderBy('created_at', 'desc')->paginate(10, ['*'], 'pending_page'),
                'confirmed' => Order::where('status', 'confirmed')->orderBy('created_at', 'desc')->paginate(10, ['*'], 'confirmed_page'),
                'paid' => Order::where('status', 'paid')->orderBy('created_at', 'desc')->paginate(10, ['*'], 'paid_page'),
                'shipped' => Order::where('status', 'shipped')->orderBy('created_at', 'desc')->paginate(10, ['*'], 'shipped_page'),
                'delivered' => Order::where('status', 'delivered')->orderBy('created_at', 'desc')->paginate(10, ['*'], 'delivered_page'),
                'cancelled' => Order::where('status', 'cancelled')->orderBy('created_at', 'desc')->paginate(10, ['*'], 'cancelled_page'),
            ]
        ]);
    }

    public function show(Order $order)
    {
        return inertia('Admin/Order/Show', [
            'order' => $order->load(['user', 'items.item.product'])
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,paid,shipped,delivered,cancelled',
        ]);

        $order->update($request->only('status'));

        Mail::to($order->email)->send(new OrderStatusUpdated($order));

        return redirect()->route('admin.order.show', $order->id)
            ->with('success', 'Order status updated successfully!');
    }
}

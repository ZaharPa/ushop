<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class PaymentController extends Controller
{
    public function cash(Request $request)
    {
        $order = Order::findOrFail($request->order_id);
        $order->status = 'confirmed';
        $order->save();

        session()->forget('cart');

        return response()->noContent();
    }

    public function card(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'Order #' . $request->order_id,
                    ],
                    'unit_amount' => (int)($request->amount * 100),
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => url('/payment/success?session_id={CHECKOUT_SESSION_ID'),
            'cancel_url' => url('/payment/cancel'),
            'metadata' => [
                'order_id' => $request->order_id
            ]
        ]);

        return response()->json(['redirect_url' => $session->url]);
    }

    public function paypal() {}

    public function success(Request $request)
    {
        $session = Session::retrieve($request->session_id);
        $orderId = $session->metadata->order_id;

        $order = Order::findOrFail($orderId);
        $order->status = 'paid';
        $order->save();

        return inertia('Cart/Success');
    }

    public function cancel()
    {
        return redirect(route('checkout.index'))->with('error', 'Transaction failed');
    }
}

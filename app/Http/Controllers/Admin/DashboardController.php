<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $start = $request->input('start') ? Carbon::parse($request->input('start')) : Carbon::now()->startOfMonth();
        $end = $request->input('end') ? Carbon::parse($request->input('end')) : Carbon::now()->endOfMonth();

        $orders = Order::whereBetween('created_at', [$start, $end])->with('user')->get();

        $ordersByDay = $orders->groupBy(fn($order) => $order->created_at->format('Y-m-d'))
            ->map(fn($group) => $group->count());

        $incomeByDay = $orders->groupBy(fn($order) => $order->created_at->format('Y-m-d'))
            ->map(fn($group) => $group->sum('total_price'));


        $topItems = OrderItem::with('item')
            ->whereHas('order', fn($q) => $q->whereBetween('created_at', [$start, $end]))
            ->get()
            ->groupBy('item_id')
            ->map(function ($group) {
                return [
                    'name' => $group->first()->item->product->name ?? 'N/A',
                    'quantity' => $group->sum('quantity'),
                ];
            })
            ->sortByDesc('quantity')
            ->take(5)
            ->values();

        $userIds = $orders->pluck('user_id')->filter()->unique();

        $newCustomers = 0;
        $repeatCustomers = 0;
        $anonymousCustomers = $orders->whereNull('user_id')->count();

        foreach ($userIds as $userId) {
            $firstOrderDate = Order::where('user_id', $userId)->min('created_at');
            $firstOrderDate = Carbon::parse($firstOrderDate);

            if ($firstOrderDate >= $start && $firstOrderDate <= $end) {
                $newCustomers++;
            } else {
                $repeatCustomers++;
            }
        }

        return inertia('Admin/Dashboard', [
            'ordersByDay' => $ordersByDay,
            'incomeByDay' => $incomeByDay,
            'topItems' => $topItems,
            'defaultRange' => [
                'start' => $start->toDateString(),
                'end' => $end->toDateString(),
            ],
            'newCustomers' => $newCustomers,
            'repeatCustomers' => $repeatCustomers,
            'anonymousCustomers' => $anonymousCustomers,
        ]);
    }
}

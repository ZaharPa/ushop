<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use App\Models\Item;
use Illuminate\Http\Request;

class DiscountController extends Controller
{

    public function index()
    {
        return inertia('Admin/Discount', [
            'discounts' => Discount::with('item.product')->paginate(20),
            'items' => Item::with('product')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'item_id' => 'required|exists:items,id',
            'percentage' => 'required|numeric|min:0|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        Discount::create([
            'item_id' => $request->item_id,
            'percentage' => $request->percentage,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->back()
            ->with('success', 'Discount created successfully!');
    }

    public function update(Request $request, Discount $discount)
    {
        $request->validate([
            'item_id' => 'required|exists:items,id',
            'percentage' => 'required|numeric|min:0|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $discount->update([
            'item_id' => $request->item_id,
            'percentage' => $request->percentage,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->back()
            ->with('success', 'Discount updated successfully!');
    }

    public function destroy(Discount $discount)
    {
        $discount->delete();

        return redirect()->back()
            ->with('success', 'Discount deleted successfully!');
    }
}

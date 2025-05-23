<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Item;
use Illuminate\Http\Request;

class DiscountController extends Controller
{

    public function index()
    {
        return inertia('Admin/Discount', [
            'discounts' => Discount::with('item')->paginate(20),
            'items' => Item::with('product')->get(),
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function update(Request $request, Discount $dIscount)
    {
        //
    }

    public function destroy(Discount $dIscount)
    {
        //
    }
}

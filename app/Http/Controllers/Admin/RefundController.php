<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Refund;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function index()
    {
        return inertia('Admin/Refund', [
            'refunds' => Refund::with(['order', 'user'])->paginate(15),
        ]);
    }

    public function update(Request $request, Refund $refund)
    {
        $request->validate([
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        $refund->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Refund status updated');
    }
}

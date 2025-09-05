<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\RefundMail;
use App\Models\Refund;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

    public function notify(Request $request, Refund $refund)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $toEmail = $refund->email ?? $refund->user->email;

        if ($toEmail) {
            Mail::to($toEmail)->send(new RefundMail($refund, $request->message));
        }

        return redirect()->back()->with('success', 'Notification email sent');
    }
}

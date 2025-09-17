<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show()
    {
        $user = auth()->user();

        $activeOrders = $user->orders()->with('items.item.product')->whereNotIn('status', ['delivered', 'cancelled'])->paginate('5', ['*'], 'activeOrdersPage');

        $historyOrders = $user->orders()->with('items.item.product')->whereIn('status', ['delivered', 'cancelled'])->paginate('5', ['*'], 'historyOrdersPage');

        return inertia('Profile', [
            'user' => $user,
            'activeOrders' => $activeOrders,
            'historyOrders' => $historyOrders,
        ]);
    }

    public function storeNewEmail(Request $request)
    {
        $request->validate([
            'newEmail' => 'required|email|unique:users,email'
        ]);

        $user = auth()->user();

        $user->email = $request->newEmail;
        $user->email_verified_at = null;
        $user->save();

        $user->sendEmailVerificationNotification();

        return back()->with('success', 'New email saved. Please verify it');
    }

    public function storeNewPass(Request $request)
    {
        $request->validate([
            'oldPass' => 'required|string|min:8|max:30',
            'newPass' => 'required|string|min:8|max:30'
        ]);

        $user = auth()->user();

        if (!Hash::check($request->oldPass, $user->password)) {
            return back()->withErrors(['oldPass' => 'Old password is incorrect']);
        }

        $user->password = Hash::make($request->newPass);
        $user->save();

        return back()->with('success', 'Password updated successfully!');
    }
}

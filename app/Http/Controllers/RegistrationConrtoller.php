<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegistrationConrtoller extends Controller
{
    public function create()
    {
        return inertia('Registration/Registartion');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|max:30|confirmed'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
        ]);

        $user->save();

        Auth::login($user);
        event(new Registered($user));

        return redirect()->route('/')
            ->with('success', 'Account created. Verification email was sent!');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function create()
    {
        return inertia('Auth/Login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'remember' => 'nullable|boolean'
        ]);

        if (!Auth::attempt($request->only('email', 'password'), $request->has('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'Authentification failed'
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/');
    }


    public function destroy(string $id)
    {
        //
    }
}

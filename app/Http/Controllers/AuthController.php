<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
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
            'remember' => 'nullable|boolean',
            'captcha' => 'required'
        ]);

        $response = Http::asForm()->post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'secret' => env('RECAPTCHA_SECRET_KEY'),
                'response' => $request->captcha,
                'remoteip' => $request->ip()
            ]
        );

        $captchaSuccess = $response->json()['success'] ?? false;

        if (!$captchaSuccess) {
            return back()->withErrors(['captcha' => 'Captcha failed']);
        }

        if (!Auth::attempt($request->only('email', 'password'), $request->has('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'Authentification failed'
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/');
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('/')
            ->with('success', 'Logged out successFully!');
    }
}

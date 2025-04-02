<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

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
            'password' => 'required|min:8|max:30|confirmed',
            'captcha' => 'required'
        ]);

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => env('RECAPTCHA_SECRET_KEY'),
            'response' => $request->captcha,
            'remoteip' => $request->ip()
        ]);

        $captchaSuccess = $response->json()['success'] ?? false;

        if (!$captchaSuccess) {
            return back()->withErrors(['captcha' => 'Captcha failed']);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
        ]);

        $user->save();

        Auth::login($user);
        event(new Registered($user));

        return redirect()->route('main')
            ->with('success', 'Account created. Verification email was sent!');
    }
}

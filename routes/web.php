<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\RegistrationConrtoller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainPageController::class, 'index'])->name('main');

Route::get('login', [AuthController::class, 'create'])->name('login');
Route::post('login', [AuthController::class, 'store'])->name('login.store');
Route::delete('logout', [AuthController::class, 'destroy'])->name('logout');

Route::resource('register', RegistrationConrtoller::class)
    ->only(['create', 'store']);

Route::get('/email/verify', function () {
    if (auth()->user()?->hasVerifiedEmail()) {
        return redirect()->route('/')
            ->with('success', 'Email have already been verified!');
    }

    return inertia('Registration/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect()->route('/')
        ->with('success', 'Email verified successfully!');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('success', 'Verification email sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::middleware(['auth', 'verified', 'is_admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('admin.dashboard');
});

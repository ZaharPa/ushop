<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegistrationConrtoller;
use Illuminate\Support\Facades\Route;

Route::get('/', [AuthController::class, 'create'])->name('/');

Route::get('login', [AuthController::class, 'create'])->name('login');
Route::post('login', [AuthController::class, 'store'])->name('login.store');

Route::resource('register', RegistrationConrtoller::class)
    ->only(['create', 'store']);

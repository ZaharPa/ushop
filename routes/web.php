<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('login', [AuthController::class, 'create'])->name('login');
Route::get('/', [AuthController::class, 'create'])->name('/');

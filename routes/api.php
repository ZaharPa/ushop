<?php

use App\Http\Controllers\Admin\Api\CategoryFeatureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/admin/categories/{category}/features', CategoryFeatureController::class)
    ->name('admin.category.features');

<?php

use App\Http\Controllers\Admin\Api\CategoryFeatureController;
use App\Http\Controllers\Admin\Api\ProductAttributeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/admin/categories/{category}/features', CategoryFeatureController::class)
    ->name('admin.category.features');

Route::get('/admin/product/{product}/attributes', ProductAttributeController::class)
    ->name('admin.product.attributes');

<?php

use App\Http\Controllers\Admin\Api\CategoryFeatureController;
use App\Http\Controllers\Admin\Api\ProductAttributeController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/admin/categories/{category}/features', CategoryFeatureController::class)
    ->name('admin.category.features');

Route::get('/admin/product/{product}/attributes', ProductAttributeController::class)
    ->name('admin.product.attributes');

Route::get('/products/{product}/comments', [CommentController::class, 'index'])
    ->name('comments.index');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/comments', [CommentController::class, 'store'])
        ->name('comments.store');
});

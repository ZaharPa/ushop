<?php

use App\Http\Controllers\Admin\Api\CategoryFeatureController;
use App\Http\Controllers\Admin\Api\ProductAttributeController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/admin/categories/{category}/features', CategoryFeatureController::class)
    ->name('admin.category.features');

Route::get('/admin/product/{product}/attributes', ProductAttributeController::class)
    ->name('admin.product.attributes');

Route::get('/products/{product}/comments', [CommentController::class, 'index'])
    ->name('comments.index');

Route::middleware(['web', 'auth'])->post('/comments', [CommentController::class, 'store'])
    ->name('comments.store');

Route::middleware(['web', 'auth'])->delete('/comments/{comment}', [CommentController::class, 'destroy'])
    ->name('comments.destroy');

Route::middleware(['web', 'auth'])->controller(CartController::class)->group(function () {
    Route::post('/cart', 'add')->name('cart.add');
    Route::patch('/cart/{item}', 'update')->name('cart.update');
    Route::delete('/cart/{item}', 'remove')->name('cart.remove');
});

Route::post('/payment/cash', [PaymentController::class, 'cash'])->name('payment.cash');
Route::post('/payment/card', [PaymentController::class, 'card'])->name('payment.card');

Route::get('/search-suggestions', SearchController::class)
    ->name('search.suggestions');

Route::middleware(['web', 'auth'])->post('/product-rating', [RatingController::class, 'store'])
    ->name('product.rating');

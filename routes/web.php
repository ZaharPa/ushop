<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AttributeController;
use App\Http\Controllers\Admin\FeatureController;
use App\Http\Controllers\Admin\ItemController;
use App\Http\Controllers\Admin\AttributeValueController;
use App\Http\Controllers\Admin\DiscountController;
use App\Http\Controllers\Admin\LayoutController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\RegistrationConrtoller;
use App\Http\Controllers\ShowProductController;
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

Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');

Route::get('/product/{product}/item/{item}', ShowProductController::class)
    ->name('product.show');

Route::get('/about-us', AboutUsController::class)
    ->name('aboutUs');

Route::middleware(['auth', 'verified', 'is_admin'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {
        Route::get('/dashboard', DashboardController::class)->name('dashboard');

        Route::resource('categories', CategoriesController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('user', UserController::class)
            ->only(['index', 'update', 'destroy']);
        Route::put('user/{user}/restore', [UserController::class, 'restore'])
            ->name('user.restore')->withTrashed();

        Route::resource('product', ProductController::class)
            ->except('show');
        Route::get('product/deletedList', [ProductController::class, 'listOfDeleted'])->name('product.deleteProducts');
        Route::put('product/{product}/restore', [ProductController::class, 'restore'])
            ->name('product.restore')->withTrashed();

        Route::resource('attribute', AttributeController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::post('/admin/attribute/{attribute}/value', [AttributeValueController::class, 'store'])
            ->name('attribute.newValue');
        Route::delete('/admin/attribute/{attribute}/value/{value}/destroy', [AttributeValueController::class, 'destroy'])
            ->name('attribute.removeValue');

        Route::resource('feature', FeatureController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('item', ItemController::class)
            ->except('show');

        Route::resource('discount', DiscountController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('settings', SettingController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::post('/settings/favicon', [SettingController::class, 'uploadFavicon'])
            ->name('settings.uploadFavicon');

        Route::resource('layout', LayoutController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('slider', SliderController::class)
            ->only(['index', 'store', 'update', 'destroy']);
    });

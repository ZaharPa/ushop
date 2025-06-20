<?php

namespace App\Providers;

use App\Http\Middleware\IsAdmin;
use App\Models\Category;
use App\Models\LayoutLink;
use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::aliasMiddleware('is_admin', IsAdmin::class);

        view()->composer('*', function ($view) {
            $settings = Cache::rememberForever('settings_all', function () {
                return Setting::pluck('value', 'key')->toArray();
            });
            $view->with('settings', $settings);
        });

        $siteEmail = Cache::rememberForever('site_email', function () {
            return Setting::where('key', 'site_email')->value('value');
        });

        if ($siteEmail) {
            config(['mail.from.address' => $siteEmail]);
        }

        Inertia::share([
            'layoutLinks' => function () {
                return Cache::rememberForever('layout_links', function () {
                    return LayoutLink::where('is_active', true)
                        ->orderBy('position')
                        ->get(['label', 'url']);
                });
            },

            'categories' => fn() => Category::all(),
        ]);
    }
}

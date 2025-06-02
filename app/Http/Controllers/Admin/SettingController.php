<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::paginate(20);
        return inertia('Admin/Setting', ['settings' => $settings]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required|string|max:50',
            'value' => 'required|string|max:255',
        ]);

        Cache::forget('settings_all');

        Setting::create([
            'key' => $request->key,
            'value' => $request->value
        ]);

        Cache::put('settings_all', Setting::pluck('value', 'key')->toArray());

        return redirect()->back()
            ->with('success', 'Settings create successfully.');
    }

    public function update(Request $request, Setting $setting)
    {
        $request->validate([
            'key' => 'required|string|max:50',
            'value' => 'required|string|max:255',
        ]);

        Cache::forget('settings_all');

        $setting->update([
            'key' => $request->key,
            'value' => $request->value
        ]);

        Cache::put('settings_all', Setting::pluck('value', 'key')->toArray());

        return redirect()->back()
            ->with('success', 'Settings updated successfully.');
    }

    public function destroy(Setting $setting)
    {
        Cache::forget('settings_all');

        $setting->delete();

        Cache::put('settings_all', Setting::pluck('value', 'key')->toArray());

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings deleted successfully.');
    }

    public function uploadFavicon(Request $request)
    {
        $request->validate([
            'favicon' => 'required|mimes:png,jpg,jpeg,ico,svg|max:2048',
        ]);

        Cache::forget('settings_all');

        $path = $request->file('favicon')->store('favicons', 'public');

        Setting::updateOrCreate(
            ['key' => 'favicon'],
            ['value' => $path]
        );

        Cache::put('settings_all', Setting::pluck('value', 'key')->toArray());

        return redirect()->back()
            ->with('success', 'Favicon uploaded successfully');
    }
}

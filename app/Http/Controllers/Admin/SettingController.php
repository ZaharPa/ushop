<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

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

        Setting::create([
            'key' => $request->key,
            'value' => $request->value
        ]);

        return redirect()->back()
            ->with('success', 'Settings create successfully.');
    }

    public function update(Request $request, Setting $setting)
    {
        $request->validate([
            'key' => 'required|string|max:50',
            'value' => 'required|string|max:255',
        ]);

        $setting->update([
            'key' => $request->key,
            'value' => $request->value
        ]);

        return redirect()->back()
            ->with('success', 'Settings updated successfully.');
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings deleted successfully.');
    }

    public function uploadFavicon(Request $request)
    {
        $request->validate([
            'favicon' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        $path = $request->file('favicon')->store('favicons', 'public');

        Setting::updateOrCreate(
            ['key' => 'favicon'],
            ['value' => $path]
        );

        return redirect()->back()
            ->with('success', 'Favicon uploaded successfully');
    }
}

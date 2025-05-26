<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use App\Models\Product;
use App\Models\Setting;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'is_admin' => true,
        ]);

        User::factory(10)->create();

        Category::factory(10)
            ->has(Product::factory()->count(10), 'products')
            ->create();

        $settings = [
            ['key' => 'site_name', 'value' => 'USHOP'],
            ['key' => 'site_description', 'value' => 'The best online secondHand gadget shop'],
            ['key' => 'site_email', 'value' => 'ushop@gmail.com']
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value']],
            );
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'USHOP'],
            ['key' => 'site_email', 'value' => 'support@ushop.com'],
            ['key' => 'site_phone', 'value' => '+38 (050) 123-45-67'],
            ['key' => 'site_address', 'value' => 'Odesa, Ukraine'],
            ['key' => 'meta_description', 'value' => 'USHOP — buy refurbished and used electronics with warranty. Smartphones, laptops, tablets and accessories at the best prices.'],
            ['key' => 'meta_keywords', 'value' => 'refurbished, used electronics, smartphones, laptops, tablets, headphones, ukraine'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/ushop'],
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/ushop'],
            ['key' => 'social_telegram', 'value' => 'https://t.me/ushop'],
        ];

        foreach ($settings as $setting) {
            DB::table('settings')->insertOrIgnore([
                'key' => $setting['key'],
                'value' => $setting['value'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

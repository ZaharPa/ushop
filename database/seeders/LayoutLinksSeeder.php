<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LayoutLinksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $links = [
            ['label' => 'Home', 'url' => '/', 'position' => 1, 'is_active' => true],
            ['label' => 'Smartphones', 'url' => '/catalog?category=smartphones', 'position' => 2, 'is_active' => true],
            ['label' => 'Laptops', 'url' => '/catalog?category=laptops', 'position' => 3, 'is_active' => true],
            ['label' => 'Tablets', 'url' => '/catalog?category=tablets', 'position' => 4, 'is_active' => true],
            ['label' => 'Headphones', 'url' => '/catalog?category=headphones', 'position' => 5, 'is_active' => true],
            ['label' => 'About Us', 'url' => '/about', 'position' => 6, 'is_active' => true],
            ['label' => 'Contact', 'url' => '/contact', 'position' => 7, 'is_active' => true],
            ['label' => 'Blog', 'url' => '/blog', 'position' => 8, 'is_active' => false],
        ];

        foreach ($links as $link) {
            DB::table('layout_links')->insertOrIgnore([
                'label' => $link['label'],
                'url' => $link['url'],
                'position' => $link['position'],
                'is_active' => $link['is_active'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

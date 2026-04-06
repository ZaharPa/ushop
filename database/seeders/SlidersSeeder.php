<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SlidersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sliders = [
            [
                'title' => 'Top Deals on Refurbished Smartphones',
                'description' => 'Save up to 40% on certified refurbished iPhones and Samsung Galaxy devices.',
                'image' => 'sliders/smartphones-banner.jpg',
                'link' => '/catalog?category=smartphones',
                'active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Premium Laptops at Unbeatable Prices',
                'description' => 'MacBooks, ThinkPads, Dell XPS — fully tested and ready to use.',
                'image' => 'sliders/laptops-banner.jpg',
                'link' => '/catalog?category=laptops',
                'active' => true,
                'order' => 2,
            ],
            [
                'title' => 'Accessories & Headphones',
                'description' => 'AirPods Pro, Sony WH-1000XM5 and more — refurbished with warranty.',
                'image' => 'sliders/headphones-banner.jpg',
                'link' => '/catalog?category=headphones',
                'active' => true,
                'order' => 3,
            ],
            [
                'title' => 'Grade A Quality Guaranteed',
                'description' => 'Every device is inspected, tested, and backed by our warranty.',
                'image' => 'sliders/quality-banner.jpg',
                'link' => '/catalog',
                'active' => false,
                'order' => 4,
            ],
        ];

        foreach ($sliders as $slider) {
            DB::table('sliders')->insertOrIgnore([
                'title' => $slider['title'],
                'description' => $slider['description'],
                'image' => $slider['image'],
                'link' => $slider['link'],
                'active' => $slider['active'],
                'order' => $slider['order'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

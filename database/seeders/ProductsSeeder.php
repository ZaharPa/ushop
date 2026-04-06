<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $topLevel = [
            ['name' => 'Smartphones', 'slug' => 'smartphones', 'image' => 'null'],
            ['name' => 'Laptops', 'slug' => 'laptops', 'image' => null],
            ['name' => 'Tablets', 'slug' => 'tablets', 'image' => null],
            ['name' => 'Accessories', 'slug' => 'accessories', 'image' => null],
        ];

        foreach ($topLevel as $category) {
            DB::table('categories')->insertOrIgnore([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'image' => $category['image'],
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $accessoriesId = DB::table('categories')->where('slug', 'accessories')->value('id');

        DB::table('categories')->insertOrIgnore([
            'name' => 'Headphones',
            'slug' => 'headphones',
            'image' => null,
            'parent_id' => $accessoriesId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $categoriesIds = DB::table('categories')->pluck('id', 'slug');

        $attrDefs = [
            'Color' => ['Black', 'White', 'Blue', 'Gray', 'Green', 'Silver', 'Purple', 'Gold'],
            'RAM' => ['4 GB', '6 GB', '8 GB', '12 GB', '16 GB', '32 GB'],
            'Storage' => ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'],
            'CPU' => ['Apple M1', 'Apple M2', 'Apple M3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
            'Connection Type' => ['Bluetooth', 'Wired (3.5mm)', 'USB-C'],
        ];

        $attrIds = [];
        $avIds = [];

        foreach ($attrDefs as $name => $values) {
            $existing = DB::table('attributes')->where('name', $name)->first();
            $attrId = $existing
                ? $existing->id
                : DB::table('attributes')->insertGetId(['name' => $name, 'created_at' => now(), 'updated_at' => now()]);

            $attrIds[$name] = $attrId;
            $avIds[$name] = [];

            foreach ($values as $value) {
                $ev = DB::table('attribute_values')->where('value', $value)->first();
                $avIds[$name][$value] = $ev
                    ? $ev->id
                    : DB::table('attribute_values')->insertGetId([
                        'attribute_id' => $attrId,
                        'value' => $value,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
            }
        }

        $catAttrs = [
            'smartphones' => ['Color', 'RAM', 'Storage'],
            'laptops' => ['Color', 'RAM', 'Storage', 'CPU'],
            'tablets' => ['Color', 'RAM', 'Storage'],
            'headphones' => ['Color', 'Connection Type'],
        ];

        foreach ($catAttrs as $slug => $attrs) {
            foreach ($attrs as $attr) {
                DB::table('attribute_categories')->insertOrIgnore([
                    'attribute_id' => $attrIds[$attr],
                    'category_id' => $categoriesIds[$slug],
                ]);
            }
        }

        $featureNames = [
            'Brand',
            'Country of Origin',
            'Release Year',
            'Operating System',
            'Battery',
            'Camera',
            'Display',
            'Warranty',
            'Condition',
        ];

        $fetIds = [];
        foreach ($featureNames as $fn) {
            $existing = DB::table('features')->where('name', $fn)->first();
            $fetIds[$fn] = $existing
                ? $existing->id
                : DB::table('features')->insertGetId(['name' => $fn, 'created_at' => now(), 'updated_at' => now()]);
        }

        foreach (['smartphones', 'laptops', 'tablets', 'headphones'] as $slug) {
            foreach ($fetIds as $fId) {
                DB::table('category_features')->insertOrIgnore([
                    'category_id' => $categoriesIds[$slug],
                    'feature_id' => $fId,
                ]);
            }
        }

        $products = [
            [
                'name' => 'Apple iPhone 14',
                'category' => 'smartphones',
                'desc' => 'The iPhone 14 features Apple\'s A15 Bionic chip, a 12 MP dual-camera system, and a 6.1" Super Retina XDR display. Fully inspected and restored to like-new condition.',
                'features' => [
                    'Brand' => 'Apple',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2022',
                    'Operating System' => 'iOS 17',
                    'Battery' => '3279 mAh',
                    'Camera' => '12 MP + 12 MP Ultra Wide',
                    'Display' => '6.1" OLED, 2532x1170, 460 ppi',
                    'Warranty' => '6 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 18500, 'qty' => 3, 'attrs' => ['Color' => 'Black',  'RAM' => '6 GB', 'Storage' => '128 GB']],
                    ['price' => 18500, 'qty' => 2, 'attrs' => ['Color' => 'White',  'RAM' => '6 GB', 'Storage' => '128 GB']],
                    ['price' => 21000, 'qty' => 1, 'attrs' => ['Color' => 'Blue',   'RAM' => '6 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Apple iPhone 13',
                'category' => 'smartphones',
                'desc' => 'iPhone 13 with A15 Bionic, 12 MP dual-camera with sensor-shift OIS, and a 6.1" Super Retina XDR display. Used in excellent condition.',
                'features' => [
                    'Brand' => 'Apple',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2021',
                    'Operating System' => 'iOS 17',
                    'Battery' => '3227 mAh',
                    'Camera' => '12 MP + 12 MP Ultra Wide',
                    'Display' => '6.1" OLED, 2532x1170, 460 ppi',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 14500, 'qty' => 4, 'attrs' => ['Color' => 'Black',  'RAM' => '4 GB', 'Storage' => '128 GB']],
                    ['price' => 16000, 'qty' => 2, 'attrs' => ['Color' => 'Green',  'RAM' => '4 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Samsung Galaxy S23',
                'category' => 'smartphones',
                'desc' => 'The Galaxy S23 runs on Snapdragon 8 Gen 2 with a triple 50+12+10 MP camera, 6.1" Dynamic AMOLED 2X display, and IP68 rating. Refurbished.',
                'features' => [
                    'Brand' => 'Samsung',
                    'Country of Origin' => 'South Korea / Vietnam',
                    'Release Year' => '2023',
                    'Operating System' => 'Android 14 (One UI 6)',
                    'Battery' => '3900 mAh',
                    'Camera' => '50 MP + 12 MP + 10 MP',
                    'Display' => '6.1" Dynamic AMOLED 2X, 2340x1080',
                    'Warranty' => '6 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 16900, 'qty' => 4, 'attrs' => ['Color' => 'Black',  'RAM' => '8 GB', 'Storage' => '128 GB']],
                    ['price' => 19200, 'qty' => 2, 'attrs' => ['Color' => 'Green',  'RAM' => '8 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Samsung Galaxy S22',
                'category' => 'smartphones',
                'desc' => 'Galaxy S22 with Snapdragon 8 Gen 1, a 50 MP triple camera, and a compact 6.1" Dynamic AMOLED 2X display. Used, fully tested.',
                'features' => [
                    'Brand' => 'Samsung',
                    'Country of Origin' => 'South Korea / Vietnam',
                    'Release Year' => '2022',
                    'Operating System' => 'Android 13 (One UI 5)',
                    'Battery' => '3700 mAh',
                    'Camera' => '50 MP + 12 MP + 10 MP',
                    'Display' => '6.1" Dynamic AMOLED 2X, 2340x1080',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 12900, 'qty' => 3, 'attrs' => ['Color' => 'Black',  'RAM' => '8 GB', 'Storage' => '128 GB']],
                    ['price' => 14500, 'qty' => 2, 'attrs' => ['Color' => 'White',  'RAM' => '8 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Samsung Galaxy A54',
                'category' => 'smartphones',
                'desc' => 'Galaxy A54 with a 50 MP OIS camera, 6.4" Super AMOLED 120 Hz display, and 5000 mAh battery. Great mid-range value. Refurbished.',
                'features' => [
                    'Brand' => 'Samsung',
                    'Country of Origin' => 'South Korea / Vietnam',
                    'Release Year' => '2023',
                    'Operating System' => 'Android 13 (One UI 5.1)',
                    'Battery' => '5000 mAh',
                    'Camera' => '50 MP + 12 MP + 5 MP',
                    'Display' => '6.4" Super AMOLED, 2340x1080, 120 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 8900, 'qty' => 5, 'attrs' => ['Color' => 'Black',  'RAM' => '8 GB', 'Storage' => '128 GB']],
                    ['price' => 9800, 'qty' => 3, 'attrs' => ['Color' => 'Purple', 'RAM' => '8 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Xiaomi 13T',
                'category' => 'smartphones',
                'desc' => 'Xiaomi 13T with a Leica-tuned triple camera, MediaTek Dimensity 8200 Ultra, 144 Hz AMOLED display, and 67W fast charging. Used, in excellent condition.',
                'features' => [
                    'Brand' => 'Xiaomi',
                    'Country of Origin' => 'China',
                    'Release Year' => '2023',
                    'Operating System' => 'Android 13 (MIUI 14)',
                    'Battery' => '5000 mAh',
                    'Camera' => '50 MP + 12 MP + 50 MP (Leica)',
                    'Display' => '6.67" AMOLED, 2712x1220, 144 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 11500, 'qty' => 5, 'attrs' => ['Color' => 'Black', 'RAM' => '8 GB',  'Storage' => '256 GB']],
                    ['price' => 13000, 'qty' => 2, 'attrs' => ['Color' => 'Gray',  'RAM' => '12 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Xiaomi Redmi Note 12 Pro',
                'category' => 'smartphones',
                'desc' => 'Redmi Note 12 Pro with a 200 MP main camera, 6.67" AMOLED 120 Hz display, and 67W turbo charging. Refurbished, in like-new condition.',
                'features' => [
                    'Brand' => 'Xiaomi',
                    'Country of Origin' => 'China',
                    'Release Year' => '2023',
                    'Operating System' => 'Android 12 (MIUI 13)',
                    'Battery' => '5000 mAh',
                    'Camera' => '200 MP + 8 MP + 2 MP',
                    'Display' => '6.67" AMOLED, 2400x1080, 120 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 9200, 'qty' => 4, 'attrs' => ['Color' => 'Black', 'RAM' => '8 GB',  'Storage' => '128 GB']],
                    ['price' => 10500, 'qty' => 2, 'attrs' => ['Color' => 'Blue', 'RAM' => '12 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Google Pixel 7a',
                'category' => 'smartphones',
                'desc' => 'Pixel 7a with Google Tensor G2, a 64 MP camera with computational photography, and a 6.1" OLED 90 Hz display. Refurbished.',
                'features' => [
                    'Brand' => 'Google',
                    'Country of Origin' => 'USA / Vietnam',
                    'Release Year' => '2023',
                    'Operating System' => 'Android 14',
                    'Battery' => '4385 mAh',
                    'Camera' => '64 MP + 13 MP Ultra Wide',
                    'Display' => '6.1" OLED, 2400x1080, 90 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 10800, 'qty' => 3, 'attrs' => ['Color' => 'Black', 'RAM' => '8 GB', 'Storage' => '128 GB']],
                    ['price' => 10800, 'qty' => 2, 'attrs' => ['Color' => 'White', 'RAM' => '8 GB', 'Storage' => '128 GB']],
                ],
            ],
            [
                'name' => 'OnePlus 11',
                'category' => 'smartphones',
                'desc' => 'OnePlus 11 with Snapdragon 8 Gen 2, Hasselblad triple camera, 6.7" AMOLED 120 Hz display, and 100W SUPERVOOC charging. Used, excellent condition.',
                'features' => [
                    'Brand' => 'OnePlus',
                    'Country of Origin' => 'China',
                    'Release Year' => '2023',
                    'Operating System' => 'Android 13 (OxygenOS 13)',
                    'Battery' => '5000 mAh',
                    'Camera' => '50 MP + 48 MP + 32 MP (Hasselblad)',
                    'Display' => '6.7" AMOLED, 3216x1440, 120 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 15500, 'qty' => 3, 'attrs' => ['Color' => 'Black', 'RAM' => '8 GB',  'Storage' => '128 GB']],
                    ['price' => 17500, 'qty' => 2, 'attrs' => ['Color' => 'Gray',  'RAM' => '16 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Sony Xperia 5 V',
                'category' => 'smartphones',
                'desc' => 'Xperia 5 V with Snapdragon 8 Gen 2, a 52 MP Zeiss-tuned camera, and a compact 6.1" 120 Hz OLED display. Refurbished.',
                'features' => [
                    'Brand' => 'Sony',
                    'Country of Origin' => 'Japan / Thailand',
                    'Release Year' => '2023',
                    'Operating System' => 'Android 13',
                    'Battery' => '5000 mAh',
                    'Camera' => '52 MP + 12 MP Ultra Wide (Zeiss)',
                    'Display' => '6.1" OLED, 2520x1080, 120 Hz',
                    'Warranty' => '6 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 17900, 'qty' => 2, 'attrs' => ['Color' => 'Black', 'RAM' => '8 GB',  'Storage' => '128 GB']],
                    ['price' => 20000, 'qty' => 1, 'attrs' => ['Color' => 'Blue',  'RAM' => '8 GB',  'Storage' => '256 GB']],
                ],
            ],

            [
                'name' => 'Apple MacBook Air M2 (2022)',
                'category' => 'laptops',
                'desc' => 'MacBook Air with Apple M2 delivers up to 18 hours of battery life, a 13.6" Liquid Retina display, and a fanless design. Refurbished, battery replaced.',
                'features' => [
                    'Brand' => 'Apple',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2022',
                    'Operating System' => 'macOS Sonoma',
                    'Battery' => '52.6 Wh, up to 18 hrs',
                    'Camera' => '1080p FaceTime HD',
                    'Display' => '13.6" Liquid Retina, 2560x1664',
                    'Warranty' => '6 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 36000, 'qty' => 2, 'attrs' => ['Color' => 'Silver', 'RAM' => '8 GB',  'Storage' => '256 GB', 'CPU' => 'Apple M2']],
                    ['price' => 42000, 'qty' => 1, 'attrs' => ['Color' => 'Gray',   'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'Apple M2']],
                ],
            ],
            [
                'name' => 'Apple MacBook Pro 14" M3 (2023)',
                'category' => 'laptops',
                'desc' => 'MacBook Pro 14" with Apple M3 chip, Liquid Retina XDR display, up to 22 hours of battery life, and a full set of ports. Refurbished.',
                'features' => [
                    'Brand' => 'Apple',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2023',
                    'Operating System' => 'macOS Sonoma',
                    'Battery' => '70 Wh, up to 22 hrs',
                    'Camera' => '1080p FaceTime HD',
                    'Display' => '14.2" Liquid Retina XDR, 3024x1964',
                    'Warranty' => '6 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 55000, 'qty' => 1, 'attrs' => ['Color' => 'Silver', 'RAM' => '8 GB',  'Storage' => '512 GB', 'CPU' => 'Apple M3']],
                    ['price' => 63000, 'qty' => 1, 'attrs' => ['Color' => 'Gray',   'RAM' => '16 GB', 'Storage' => '1 TB',   'CPU' => 'Apple M3']],
                ],
            ],
            [
                'name' => 'Lenovo ThinkPad X1 Carbon Gen 10',
                'category' => 'laptops',
                'desc' => 'Business-class ThinkPad X1 Carbon Gen 10 with Intel Core i7-1265U, a 14" 2K IPS display, and extended battery life. Used, in excellent condition.',
                'features' => [
                    'Brand' => 'Lenovo',
                    'Country of Origin' => 'China',
                    'Release Year' => '2022',
                    'Operating System' => 'Windows 11 Pro',
                    'Battery' => '57 Wh, up to 15 hrs',
                    'Camera' => '1080p IR with privacy shutter',
                    'Display' => '14" IPS, 2560x1600, 60 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 28500, 'qty' => 2, 'attrs' => ['Color' => 'Black', 'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'Intel Core i7']],
                    ['price' => 32000, 'qty' => 1, 'attrs' => ['Color' => 'Black', 'RAM' => '32 GB', 'Storage' => '1 TB',   'CPU' => 'Intel Core i7']],
                ],
            ],
            [
                'name' => 'Lenovo IdeaPad 5 Pro (2022)',
                'category' => 'laptops',
                'desc' => 'IdeaPad 5 Pro with AMD Ryzen 7 6800H, a 14" 2.8K OLED 90 Hz display, and a slim, premium build. Refurbished.',
                'features' => [
                    'Brand' => 'Lenovo',
                    'Country of Origin' => 'China',
                    'Release Year' => '2022',
                    'Operating System' => 'Windows 11 Home',
                    'Battery' => '75 Wh',
                    'Camera' => '1080p built-in',
                    'Display' => '14" OLED, 2880x1800, 90 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 22000, 'qty' => 2, 'attrs' => ['Color' => 'Gray', 'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'AMD Ryzen 7']],
                ],
            ],
            [
                'name' => 'ASUS ROG Zephyrus G14 (2023)',
                'category' => 'laptops',
                'desc' => 'ROG Zephyrus G14 with AMD Ryzen 9 7940HS and NVIDIA RTX 4060 in a compact 14" chassis with a 165 Hz QHD+ display. Refurbished.',
                'features' => [
                    'Brand' => 'ASUS',
                    'Country of Origin' => 'Taiwan',
                    'Release Year' => '2023',
                    'Operating System' => 'Windows 11 Home',
                    'Battery' => '76 Wh',
                    'Camera' => '720p built-in',
                    'Display' => '14" QHD+ 2560x1600, 165 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 39000, 'qty' => 2, 'attrs' => ['Color' => 'Gray', 'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'AMD Ryzen 7']],
                    ['price' => 44500, 'qty' => 1, 'attrs' => ['Color' => 'Gray', 'RAM' => '32 GB', 'Storage' => '1 TB',   'CPU' => 'AMD Ryzen 7']],
                ],
            ],
            [
                'name' => 'ASUS ZenBook 14 OLED (2023)',
                'category' => 'laptops',
                'desc' => 'ZenBook 14 OLED with Intel Core i5-1340P, a stunning 14" 2.8K OLED 90 Hz display, and a thin, lightweight design. Used, in excellent condition.',
                'features' => [
                    'Brand' => 'ASUS',
                    'Country of Origin' => 'Taiwan',
                    'Release Year' => '2023',
                    'Operating System' => 'Windows 11 Home',
                    'Battery' => '75 Wh',
                    'Camera' => '1080p built-in',
                    'Display' => '14" OLED, 2880x1800, 90 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 24000, 'qty' => 2, 'attrs' => ['Color' => 'Silver', 'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'Intel Core i5']],
                ],
            ],
            [
                'name' => 'Dell XPS 15 (2022)',
                'category' => 'laptops',
                'desc' => 'Dell XPS 15 with Intel Core i7-12700H, a 15.6" OLED 3.5K 60 Hz display, and NVIDIA RTX 3050 Ti. Premium build quality. Refurbished.',
                'features' => [
                    'Brand' => 'Dell',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2022',
                    'Operating System' => 'Windows 11 Pro',
                    'Battery' => '86 Wh',
                    'Camera' => '720p built-in',
                    'Display' => '15.6" OLED, 3456x2160, 60 Hz',
                    'Warranty' => '6 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 42000, 'qty' => 1, 'attrs' => ['Color' => 'Silver', 'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'Intel Core i7']],
                    ['price' => 49000, 'qty' => 1, 'attrs' => ['Color' => 'Silver', 'RAM' => '32 GB', 'Storage' => '1 TB',   'CPU' => 'Intel Core i7']],
                ],
            ],
            [
                'name' => 'HP Spectre x360 14 (2022)',
                'category' => 'laptops',
                'desc' => 'HP Spectre x360 14 with Intel Core i7-1255U, a 13.5" 3K2K OLED touch display, and a 2-in-1 convertible design. Used, in excellent condition.',
                'features' => [
                    'Brand' => 'HP',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2022',
                    'Operating System' => 'Windows 11 Home',
                    'Battery' => '66 Wh, up to 17 hrs',
                    'Camera' => '5 MP IR with privacy shutter',
                    'Display' => '13.5" OLED touch, 3000x2000',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 31000, 'qty' => 2, 'attrs' => ['Color' => 'Silver', 'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'Intel Core i7']],
                ],
            ],
            [
                'name' => 'Microsoft Surface Laptop 5 (2022)',
                'category' => 'laptops',
                'desc' => 'Surface Laptop 5 with Intel Core i5-1235U, a 13.5" PixelSense touch display, and an ultra-slim design. Refurbished.',
                'features' => [
                    'Brand' => 'Microsoft',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2022',
                    'Operating System' => 'Windows 11 Home',
                    'Battery' => '47.4 Wh, up to 18 hrs',
                    'Camera' => '720p built-in',
                    'Display' => '13.5" PixelSense touch, 2256x1504',
                    'Warranty' => '3 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 27000, 'qty' => 2, 'attrs' => ['Color' => 'Gray',   'RAM' => '8 GB',  'Storage' => '256 GB', 'CPU' => 'Intel Core i5']],
                    ['price' => 31000, 'qty' => 1, 'attrs' => ['Color' => 'Black',  'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'Intel Core i5']],
                ],
            ],
            [
                'name' => 'Acer Swift X 14 (2023)',
                'category' => 'laptops',
                'desc' => 'Acer Swift X 14 with AMD Ryzen 7 7840U, a 14.5" 2.8K OLED 120 Hz display, and NVIDIA RTX 3050. Great for creators. Used.',
                'features' => [
                    'Brand' => 'Acer',
                    'Country of Origin' => 'Taiwan / China',
                    'Release Year' => '2023',
                    'Operating System' => 'Windows 11 Home',
                    'Battery' => '65 Wh',
                    'Camera' => '1080p built-in',
                    'Display' => '14.5" OLED, 2880x1800, 120 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 26500, 'qty' => 2, 'attrs' => ['Color' => 'Gray', 'RAM' => '16 GB', 'Storage' => '512 GB', 'CPU' => 'AMD Ryzen 7']],
                ],
            ],

            [
                'name' => 'Apple iPad Air 5 (2022)',
                'category' => 'tablets',
                'desc' => 'iPad Air 5th generation with Apple M1, a 10.9" Liquid Retina display, support for Apple Pencil 2 and Magic Keyboard. Refurbished, scratch-free.',
                'features' => [
                    'Brand' => 'Apple',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2022',
                    'Operating System' => 'iPadOS 17',
                    'Battery' => '28.65 Wh, up to 10 hrs',
                    'Camera' => '12 MP rear + 12 MP front',
                    'Display' => '10.9" Liquid Retina, 2360x1640',
                    'Warranty' => '6 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 19500, 'qty' => 3, 'attrs' => ['Color' => 'Gray', 'RAM' => '8 GB', 'Storage' => '64 GB']],
                    ['price' => 23000, 'qty' => 2, 'attrs' => ['Color' => 'Blue', 'RAM' => '8 GB', 'Storage' => '256 GB']],
                ],
            ],
            [
                'name' => 'Samsung Galaxy Tab S8',
                'category' => 'tablets',
                'desc' => 'Galaxy Tab S8 with S Pen included, Snapdragon 8 Gen 1, an 11" 120 Hz display, and IP68 rating. Used, in excellent condition.',
                'features' => [
                    'Brand' => 'Samsung',
                    'Country of Origin' => 'South Korea / Vietnam',
                    'Release Year' => '2022',
                    'Operating System' => 'Android 13 (One UI 5)',
                    'Battery' => '8000 mAh',
                    'Camera' => '13 MP + 6 MP Ultra Wide',
                    'Display' => '11" LCD WQXGA, 2560x1600, 120 Hz',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 14500, 'qty' => 3, 'attrs' => ['Color' => 'Black', 'RAM' => '8 GB',  'Storage' => '128 GB']],
                    ['price' => 17000, 'qty' => 1, 'attrs' => ['Color' => 'Gray',  'RAM' => '12 GB', 'Storage' => '256 GB']],
                ],
            ],

            [
                'name' => 'Apple AirPods Pro 2',
                'category' => 'headphones',
                'desc' => 'AirPods Pro 2nd generation with Active Noise Cancellation, Adaptive Audio, and a MagSafe charging case. Refurbished, case battery replaced.',
                'features' => [
                    'Brand' => 'Apple',
                    'Country of Origin' => 'USA / China',
                    'Release Year' => '2022',
                    'Operating System' => '—',
                    'Battery' => 'Up to 6 hrs (buds) + 24 hrs (case)',
                    'Camera' => '—',
                    'Display' => '—',
                    'Warranty' => '3 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 5800, 'qty' => 5, 'attrs' => ['Color' => 'White', 'Connection Type' => 'Bluetooth']],
                ],
            ],
            [
                'name' => 'Sony WH-1000XM5',
                'category' => 'headphones',
                'desc' => 'WH-1000XM5 offers best-in-class noise cancellation, 30 hours of battery life, and LDAC support. Used, in excellent condition.',
                'features' => [
                    'Brand' => 'Sony',
                    'Country of Origin' => 'Japan / Malaysia',
                    'Release Year' => '2022',
                    'Operating System' => '—',
                    'Battery' => 'Up to 30 hrs',
                    'Camera' => '—',
                    'Display' => '—',
                    'Warranty' => '3 months',
                    'Condition' => 'Used (Grade B)',
                ],
                'items' => [
                    ['price' => 7200, 'qty' => 3, 'attrs' => ['Color' => 'Black',  'Connection Type' => 'Bluetooth']],
                    ['price' => 7200, 'qty' => 2, 'attrs' => ['Color' => 'Silver', 'Connection Type' => 'Bluetooth']],
                ],
            ],
            [
                'name' => 'Samsung Galaxy Buds2 Pro',
                'category' => 'headphones',
                'desc' => 'Galaxy Buds2 Pro with ANC, 24-bit Hi-Fi audio, and seamless Galaxy integration. Refurbished.',
                'features' => [
                    'Brand' => 'Samsung',
                    'Country of Origin' => 'South Korea',
                    'Release Year' => '2022',
                    'Operating System' => '—',
                    'Battery' => 'Up to 5 hrs (buds) + 18 hrs (case)',
                    'Camera' => '—',
                    'Display' => '—',
                    'Warranty' => '3 months',
                    'Condition' => 'Refurbished (Grade A)',
                ],
                'items' => [
                    ['price' => 3900, 'qty' => 4, 'attrs' => ['Color' => 'Black', 'Connection Type' => 'Bluetooth']],
                    ['price' => 3900, 'qty' => 3, 'attrs' => ['Color' => 'White', 'Connection Type' => 'Bluetooth']],
                ],
            ],
        ];

        foreach ($products as $prod) {
            $prodId = DB::table('products')->insertGetId([
                'name' => $prod['name'],
                'description' => $prod['desc'],
                'photo' => null,
                'category_id' => $categoriesIds[$prod['category']],
                'average_rating' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($prod['features'] as $featureName => $featureValue) {
                if (isset($fetIds[$featureName])) {
                    DB::table('product_features')->insert([
                        'product_id' => $prodId,
                        'feature_id' => $fetIds[$featureName],
                        'value' => $featureValue,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            foreach ($prod['items'] as $item) {
                $itemId = DB::table('items')->insertGetId([
                    'product_id' => $prodId,
                    'price' => $item['price'],
                    'quantity' => $item['qty'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                foreach ($item['attrs'] as $attrName => $attrValue) {
                    if (isset($avIds[$attrName][$attrValue])) {
                        DB::table('attribute_items')->insert([
                            'item_id' => $itemId,
                            'attribute_value_id' => $avIds[$attrName][$attrValue],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }
        }
    }
}

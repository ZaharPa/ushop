<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsRatingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = DB::table('products')->pluck('id', 'name');
        $users = DB::table('users')->where('is_admin', false)->pluck('id', 'name');

        if ($products->isEmpty() || $users->isEmpty()) {
            $this->command->warn('Required data missing - products/users');
            return;
        }

        $data = [
            [
                'product' => 'Apple iPhone 14',
                'reviews' => [
                    ['user' => 'James Miller', 'rating' => 5, 'comment' => 'Absolutely love this phone. Looks and works like new. Fast shipping too.'],
                    ['user' => 'Emily Johnson', 'rating' => 4, 'comment' => 'Great condition, battery life is solid. Minor scuff on the back but nothing serious.'],
                    ['user' => 'Sophia Brown', 'rating' => 5, 'comment' => 'Best refurbished purchase I\'ve made. Camera quality is outstanding.'],
                ],
            ],
            [
                'product' => 'Samsung Galaxy S23',
                'reviews' => [
                    ['user' => 'Liam Wilson', 'rating' => 5, 'comment' => 'Snapdragon performance is blazing fast. Very happy with the purchase.'],
                    ['user' => 'Noah Davis', 'rating' => 4, 'comment' => 'Good phone overall. Display is gorgeous. Came with original charger which was a bonus.'],
                ],
            ],
            [
                'product' => 'Xiaomi 13T',
                'reviews' => [
                    ['user' => 'Olivia Taylor', 'rating' => 4, 'comment' => 'Great value for the price. Leica camera takes amazing shots.'],
                    ['user' => 'Ethan Martinez', 'rating' => 3, 'comment' => 'Phone is good but MIUI takes some getting used to. Otherwise solid device.'],
                ],
            ],
            [
                'product' => 'Apple MacBook Air M2 (2022)',
                'reviews' => [
                    ['user' => 'Ava Anderson', 'rating' => 5, 'comment' => 'Silent, fast, beautiful display. M2 handles everything I throw at it effortlessly.'],
                    ['user' => 'Lucas Thomas', 'rating' => 5, 'comment' => 'Incredible machine. Battery easily lasts a full workday. Worth every penny.'],
                    ['user' => 'Mia Jackson', 'rating' => 4, 'comment' => 'Excellent refurbished unit. Only 2 ports is a downside but performance is flawless.'],
                ],
            ],
            [
                'product' => 'Lenovo ThinkPad X1 Carbon Gen 10',
                'reviews' => [
                    ['user' => 'James Miller', 'rating' => 5, 'comment' => 'Best business laptop I\'ve used. Keyboard is superb, build quality is tank-like.'],
                    ['user' => 'Noah Davis', 'rating' => 4, 'comment' => 'Lightweight and powerful. Display is crisp. Arrived well packaged.'],
                ],
            ],
            [
                'product' => 'ASUS ROG Zephyrus G14 (2023)',
                'reviews' => [
                    ['user' => 'Liam Wilson', 'rating' => 5, 'comment' => 'Insane gaming performance in such a small form factor. Runs AAA titles without breaking a sweat.'],
                    ['user' => 'Ethan Martinez', 'rating' => 4, 'comment' => 'Great laptop but gets warm under heavy load. Performance is top notch though.'],
                ],
            ],
            [
                'product' => 'Apple iPad Air 5 (2022)',
                'reviews' => [
                    ['user' => 'Sophia Brown', 'rating' => 5, 'comment' => 'Perfect for studying and drawing. Apple Pencil support is a game changer.'],
                    ['user' => 'Olivia Taylor', 'rating' => 4, 'comment' => 'Beautiful display, fast chip. Wished it came with more storage options.'],
                ],
            ],
            [
                'product' => 'Apple AirPods Pro 2',
                'reviews' => [
                    ['user' => 'Mia Jackson', 'rating' => 5, 'comment' => 'ANC is phenomenal. These block out everything. Worth the price without a doubt.'],
                    ['user' => 'Emily Johnson', 'rating' => 5, 'comment' => 'Sound quality is incredible and they fit perfectly. Very happy with this purchase.'],
                ],
            ],
            [
                'product' => 'Sony WH-1000XM5',
                'reviews' => [
                    ['user' => 'Lucas Thomas', 'rating' => 5, 'comment' => 'Best noise cancelling headphones on the market. Comfort level is unmatched.'],
                    ['user' => 'Ava Anderson', 'rating' => 4, 'comment' => 'Sound is rich and detailed. Only wish the ear cups folded flat for easier storage.'],
                ],
            ],
            [
                'product' => 'Samsung Galaxy S22',
                'reviews' => [
                    ['user' => 'James Miller', 'rating' => 4, 'comment' => 'Compact and powerful. Great camera for the price. Device came in great shape.'],
                    ['user' => 'Liam Wilson', 'rating' => 3, 'comment' => 'Decent phone but battery drains a bit faster than expected. Still good value.'],
                ],
            ],
            [
                'product' => 'Google Pixel 7a',
                'reviews' => [
                    ['user' => 'Emily Johnson', 'rating' => 5, 'comment' => 'Pure Android experience is refreshing. Camera computational photography is next level.'],
                    ['user' => 'Noah Davis', 'rating' => 4, 'comment' => 'Smooth performance and great software support. Highly recommend for the price.'],
                ],
            ],
        ];

        foreach ($data as $entry) {
            $productName = $entry['product'];

            if (!isset($products[$productName])) {
                continue;
            }

            $productId = $products[$productName];

            foreach ($entry['reviews'] as $review) {
                $userName = $review['user'];

                if (!isset($users[$userName])) {
                    continue;
                }

                $userId = $users[$userName];

                DB::table('comments')->insertOrIgnore([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'content' => $review['comment'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('ratings')->insertOrIgnore([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'rating' => $review['rating'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $avg = DB::table('ratings')
                ->where('product_id', $productId)
                ->avg('rating');

            DB::table('products')
                ->where('id', $productId)
                ->update(['average_rating' => round($avg, 2)]);
        }
    }
}

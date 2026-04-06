<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProductsSeeder::class,
            UsersSeeder::class,
            SlidersSeeder::class,
            SettingsSeeder::class,
            LayoutLinksSeeder::class,
            CommentsRatingsSeeder::class,
            DiscountsSeeder::class,
            OrdersSeeder::class,
        ]);
    }
}

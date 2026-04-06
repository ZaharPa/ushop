<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiscountsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $itemsByProduct = DB::table('items')
            ->join('products', 'items.product_id', '=', 'products.id')
            ->select('items.id as item_id', 'products.name as product_name')
            ->get()
            ->groupBy('product_name');

        if ($itemsByProduct->isEmpty()) {
            $this->command->warn('No items found');
            return;
        }

        $discounts = [
            ['product' => 'Apple iPhone 13', 'percentage' => 15, 'start' => '2026-04-01', 'end' => '2026-04-30', 'active' => true],
            ['product' => 'Samsung Galaxy A54', 'percentage' => 20, 'start' => '2026-04-01', 'end' => '2026-04-15', 'active' => true],
            ['product' => 'Xiaomi Redmi Note 12 Pro', 'percentage' => 10, 'start' => '2026-04-01', 'end' => '2026-04-30', 'active' => true],
            ['product' => 'Samsung Galaxy S22', 'percentage' => 12, 'start' => '2026-04-05', 'end' => '2026-04-20', 'active' => true],
            ['product' => 'Lenovo IdeaPad 5 Pro (2022)', 'percentage' => 8,  'start' => '2026-04-01', 'end' => '2026-04-30', 'active' => true],
            ['product' => 'Acer Swift X 14 (2023)', 'percentage' => 10, 'start' => '2026-04-01', 'end' => '2026-04-25', 'active' => true],
            ['product' => 'Samsung Galaxy Tab S8', 'percentage' => 18, 'start' => '2026-04-01', 'end' => '2026-04-30', 'active' => true],
            ['product' => 'Sony WH-1000XM5', 'percentage' => 15, 'start' => '2026-03-01', 'end' => '2026-03-31', 'active' => false],
            ['product' => 'Samsung Galaxy Buds2 Pro', 'percentage' => 20, 'start' => '2026-04-10', 'end' => '2026-04-30', 'active' => true],
            ['product' => 'Microsoft Surface Laptop 5 (2022)', 'percentage' => 10, 'start' => '2026-04-01', 'end' => '2026-04-30', 'active' => true],
        ];

        foreach ($discounts as $discount) {
            $productName = $discount['product'];

            if (!isset($itemsByProduct[$productName])) {
                continue;
            }

            foreach ($itemsByProduct[$productName] as $item) {
                DB::table('discounts')->insert([
                    'item_id' => $item->item_id,
                    'percentage' => $discount['percentage'],
                    'start_date' => $discount['start'],
                    'end_date' => $discount['end'],
                    'is_active' => $discount['active'],
                ]);
            }
        }
    }
}

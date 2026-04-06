<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = DB::table('users')->where('is_admin', false)->pluck('id', 'name');
        $items = DB::table('items')
            ->join('products', 'items.product_id', '=', 'products.id')
            ->select('items.id as item_id', 'items.price', 'products.name as product_name')
            ->get()
            ->keyBy('product_name');

        if ($users->isEmpty() || $items->isEmpty()) {
            $this->command->warn("Required data missing - users/items");
            return;
        }

        $orders = [
            [
                'user' => 'James Miller',
                'name' => 'James Miller',
                'phone' => '+38 050 111 2233',
                'address' => '12 Deribasivska St',
                'address2' => 'Apt 4',
                'email' => 'james.miller@gmail.com',
                'status' => 'delivered',
                'date' => '2026-04-02',
                'items' => [
                    ['product' => 'Apple iPhone 14',     'qty' => 1],
                    ['product' => 'Apple AirPods Pro 2', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Emily Johnson',
                'name' => 'Emily Johnson',
                'phone' => '+38 067 222 3344',
                'address' => '5 Pushkinska St',
                'address2' => null,
                'email' => 'emily.johnson@gmail.com',
                'status' => 'delivered',
                'date' => '2026-04-05',
                'items' => [
                    ['product' => 'Apple MacBook Air M2 (2022)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Liam Wilson',
                'name' => 'Liam Wilson',
                'phone' => '+38 093 333 4455',
                'address' => '88 Hretska St',
                'address2' => 'Office 2',
                'email' => 'liam.wilson@outlook.com',
                'status' => 'delivered',
                'date' => '2026-04-07',
                'items' => [
                    ['product' => 'Samsung Galaxy S23', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Sophia Brown',
                'name' => 'Sophia Brown',
                'phone' => '+38 050 444 5566',
                'address' => '33 Preobrazhenska St',
                'address2' => null,
                'email' => 'sophia.brown@yahoo.com',
                'status' => 'delivered',
                'date' => '2026-04-09',
                'items' => [
                    ['product' => 'Apple iPad Air 5 (2022)', 'qty' => 1],
                    ['product' => 'Sony WH-1000XM5',         'qty' => 1],
                ],
            ],
            [
                'user' => 'Noah Davis',
                'name' => 'Noah Davis',
                'phone' => '+38 067 555 6677',
                'address' => '17 Velyka Arnautska St',
                'address2' => 'Apt 12',
                'email' => 'noah.davis@gmail.com',
                'status' => 'delivered',
                'date' => '2026-04-11',
                'items' => [
                    ['product' => 'Lenovo ThinkPad X1 Carbon Gen 10', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Olivia Taylor',
                'name' => 'Olivia Taylor',
                'phone' => '+38 093 666 7788',
                'address' => '9 Bunina St',
                'address2' => null,
                'email' => 'olivia.taylor@gmail.com',
                'status' => 'delivered',
                'date' => '2026-04-14',
                'items' => [
                    ['product' => 'Xiaomi 13T',               'qty' => 1],
                    ['product' => 'Samsung Galaxy Buds2 Pro', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Ethan Martinez',
                'name' => 'Ethan Martinez',
                'phone' => '+38 050 777 8899',
                'address' => '21 Lanzheronovska St',
                'address2' => 'Apt 7',
                'email' => 'ethan.martinez@outlook.com',
                'status' => 'delivered',
                'date' => '2026-04-16',
                'items' => [
                    ['product' => 'ASUS ROG Zephyrus G14 (2023)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Ava Anderson',
                'name' => 'Ava Anderson',
                'phone' => '+38 067 888 9900',
                'address' => '44 Italiyskyi Blvd',
                'address2' => null,
                'email' => 'ava.anderson@yahoo.com',
                'status' => 'delivered',
                'date' => '2026-04-18',
                'items' => [
                    ['product' => 'Apple iPhone 13',     'qty' => 1],
                    ['product' => 'Apple AirPods Pro 2', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Lucas Thomas',
                'name' => 'Lucas Thomas',
                'phone' => '+38 093 999 0011',
                'address' => '3 Rishelyevska St',
                'address2' => 'Apt 1',
                'email' => 'lucas.thomas@gmail.com',
                'status' => 'cancelled',
                'date' => '2026-04-20',
                'items' => [
                    ['product' => 'Dell XPS 15 (2022)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Mia Jackson',
                'name' => 'Mia Jackson',
                'phone' => '+38 050 000 1122',
                'address' => '7 Zhukovskoho St',
                'address2' => null,
                'email' => 'mia.jackson@gmail.com',
                'status' => 'shipped',
                'date' => '2026-04-23',
                'items' => [
                    ['product' => 'Samsung Galaxy Tab S8',    'qty' => 1],
                    ['product' => 'Samsung Galaxy Buds2 Pro', 'qty' => 1],
                ],
            ],
            [
                'user' => 'James Miller',
                'name' => 'James Miller',
                'phone' => '+38 050 111 2233',
                'address' => '12 Deribasivska St',
                'address2' => 'Apt 4',
                'email' => 'james.miller@gmail.com',
                'status' => 'delivered',
                'date' => '2026-04-26',
                'items' => [
                    ['product' => 'Google Pixel 7a', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Noah Davis',
                'name' => 'Noah Davis',
                'phone' => '+38 067 555 6677',
                'address' => '17 Velyka Arnautska St',
                'address2' => 'Apt 12',
                'email' => 'noah.davis@gmail.com',
                'status' => 'delivered',
                'date' => '2026-04-29',
                'items' => [
                    ['product' => 'Samsung Galaxy A54',       'qty' => 1],
                    ['product' => 'Samsung Galaxy Buds2 Pro', 'qty' => 1],
                ],
            ],

            [
                'user' => 'Emily Johnson',
                'name' => 'Emily Johnson',
                'phone' => '+38 067 222 3344',
                'address' => '5 Pushkinska St',
                'address2' => null,
                'email' => 'emily.johnson@gmail.com',
                'status' => 'delivered',
                'date' => '2026-05-03',
                'items' => [
                    ['product' => 'Apple MacBook Pro 14" M3 (2023)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Sophia Brown',
                'name' => 'Sophia Brown',
                'phone' => '+38 050 444 5566',
                'address' => '33 Preobrazhenska St',
                'address2' => null,
                'email' => 'sophia.brown@yahoo.com',
                'status' => 'delivered',
                'date' => '2026-05-07',
                'items' => [
                    ['product' => 'Xiaomi Redmi Note 12 Pro', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Liam Wilson',
                'name' => 'Liam Wilson',
                'phone' => '+38 093 333 4455',
                'address' => '88 Hretska St',
                'address2' => 'Office 2',
                'email' => 'liam.wilson@outlook.com',
                'status' => 'delivered',
                'date' => '2026-05-10',
                'items' => [
                    ['product' => 'HP Spectre x360 14 (2022)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Ethan Martinez',
                'name' => 'Ethan Martinez',
                'phone' => '+38 050 777 8899',
                'address' => '21 Lanzheronovska St',
                'address2' => 'Apt 7',
                'email' => 'ethan.martinez@outlook.com',
                'status' => 'delivered',
                'date' => '2026-05-13',
                'items' => [
                    ['product' => 'OnePlus 11',          'qty' => 1],
                    ['product' => 'Sony WH-1000XM5',     'qty' => 1],
                ],
            ],
            [
                'user' => 'Ava Anderson',
                'name' => 'Ava Anderson',
                'phone' => '+38 067 888 9900',
                'address' => '44 Italiyskyi Blvd',
                'address2' => null,
                'email' => 'ava.anderson@yahoo.com',
                'status' => 'delivered',
                'date' => '2026-05-17',
                'items' => [
                    ['product' => 'ASUS ZenBook 14 OLED (2023)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Mia Jackson',
                'name' => 'Mia Jackson',
                'phone' => '+38 050 000 1122',
                'address' => '7 Zhukovskoho St',
                'address2' => null,
                'email' => 'mia.jackson@gmail.com',
                'status' => 'shipped',
                'date' => '2026-05-21',
                'items' => [
                    ['product' => 'Sony Xperia 5 V',     'qty' => 1],
                    ['product' => 'Apple AirPods Pro 2', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Lucas Thomas',
                'name' => 'Lucas Thomas',
                'phone' => '+38 093 999 0011',
                'address' => '3 Rishelyevska St',
                'address2' => 'Apt 1',
                'email' => 'lucas.thomas@gmail.com',
                'status' => 'delivered',
                'date' => '2026-05-25',
                'items' => [
                    ['product' => 'Microsoft Surface Laptop 5 (2022)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Olivia Taylor',
                'name' => 'Olivia Taylor',
                'phone' => '+38 093 666 7788',
                'address' => '9 Bunina St',
                'address2' => null,
                'email' => 'olivia.taylor@gmail.com',
                'status' => 'confirmed',
                'date' => '2026-05-29',
                'items' => [
                    ['product' => 'Samsung Galaxy S22',       'qty' => 1],
                    ['product' => 'Samsung Galaxy Buds2 Pro', 'qty' => 1],
                ],
            ],

            [
                'user' => 'James Miller',
                'name' => 'James Miller',
                'phone' => '+38 050 111 2233',
                'address' => '12 Deribasivska St',
                'address2' => 'Apt 4',
                'email' => 'james.miller@gmail.com',
                'status' => 'delivered',
                'date' => '2026-06-02',
                'items' => [
                    ['product' => 'Acer Swift X 14 (2023)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Noah Davis',
                'name' => 'Noah Davis',
                'phone' => '+38 067 555 6677',
                'address' => '17 Velyka Arnautska St',
                'address2' => 'Apt 12',
                'email' => 'noah.davis@gmail.com',
                'status' => 'shipped',
                'date' => '2026-06-06',
                'items' => [
                    ['product' => 'Apple iPhone 14',     'qty' => 1],
                    ['product' => 'Apple AirPods Pro 2', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Emily Johnson',
                'name' => 'Emily Johnson',
                'phone' => '+38 067 222 3344',
                'address' => '5 Pushkinska St',
                'address2' => null,
                'email' => 'emily.johnson@gmail.com',
                'status' => 'paid',
                'date' => '2026-06-10',
                'items' => [
                    ['product' => 'Lenovo IdeaPad 5 Pro (2022)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Liam Wilson',
                'name' => 'Liam Wilson',
                'phone' => '+38 093 333 4455',
                'address' => '88 Hretska St',
                'address2' => 'Office 2',
                'email' => 'liam.wilson@outlook.com',
                'status' => 'confirmed',
                'date' => '2026-06-14',
                'items' => [
                    ['product' => 'Samsung Galaxy S23', 'qty' => 1],
                    ['product' => 'Sony WH-1000XM5',    'qty' => 1],
                ],
            ],
            [
                'user' => 'Sophia Brown',
                'name' => 'Sophia Brown',
                'phone' => '+38 050 444 5566',
                'address' => '33 Preobrazhenska St',
                'address2' => null,
                'email' => 'sophia.brown@yahoo.com',
                'status' => 'pending',
                'date' => '2026-06-18',
                'items' => [
                    ['product' => 'Apple iPad Air 5 (2022)', 'qty' => 1],
                ],
            ],
            [
                'user' => 'Ethan Martinez',
                'name' => 'Ethan Martinez',
                'phone' => '+38 050 777 8899',
                'address' => '21 Lanzheronovska St',
                'address2' => 'Apt 7',
                'email' => 'ethan.martinez@outlook.com',
                'status' => 'pending',
                'date' => '2026-06-22',
                'items' => [
                    ['product' => 'Google Pixel 7a',          'qty' => 1],
                    ['product' => 'Samsung Galaxy Buds2 Pro', 'qty' => 1],
                ],
            ],
        ];

        foreach ($orders as $orderData) {
            $userId = $users[$orderData['user']] ?? null;

            $totalPrice = 0;
            foreach ($orderData['items'] as $orderItem) {
                $item = $items[$orderItem['product']] ?? null;
                if ($item) {
                    $totalPrice += $item->price * $orderItem['qty'];
                }
            }

            $orderId = DB::table('orders')->insertGetId([
                'user_id' => $userId,
                'name' => $orderData['name'],
                'phone' => $orderData['phone'],
                'address' => $orderData['address'],
                'address2' => $orderData['address2'],
                'email' => $orderData['email'],
                'status' => $orderData['status'],
                'total_price' => $totalPrice,
                'created_at' => $orderData['date'],
                'updated_at' => $orderData['date'],
            ]);

            foreach ($orderData['items'] as $orderItem) {
                $item = $items[$orderItem['product']] ?? null;
                if (!$item) continue;

                $subtotal = $item->price * $orderItem['qty'];

                DB::table('order_items')->insert([
                    'order_id' => $orderId,
                    'item_id' => $item->item_id,
                    'price' => $item->price,
                    'quantity' => $orderItem['qty'],
                    'subtotal' => $subtotal,
                    'created_at' => $orderData['date'],
                    'updated_at' => $orderData['date'],
                ]);
            }
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@ushop.com',
                'is_admin' => true,
                'email_verified_at' => now(),
            ],

            ['name' => 'James Miller', 'email' => 'james.miller@gmail.com'],
            ['name' => 'Emily Johnson', 'email' => 'emily.johnson@gmail.com'],
            ['name' => 'Liam Wilson', 'email' => 'liam.wilson@outlook.com'],
            ['name' => 'Sophia Brown', 'email' => 'sophia.brown@yahoo.com'],
            ['name' => 'Noah Davis', 'email' => 'noah.davis@gmail.com'],
            ['name' => 'Olivia Taylor', 'email' => 'olivia.taylor@gmail.com'],
            ['name' => 'Ethan Martinez', 'email' => 'ethan.martinez@outlook.com'],
            ['name' => 'Ava Anderson', 'email' => 'ava.anderson@yahoo.com'],
            ['name' => 'Lucas Thomas', 'email' => 'lucas.thomas@gmail.com'],
            ['name' => 'Mia Jackson', 'email' => 'mia.jackson@gmail.com'],
        ];

        foreach ($users as $user) {
            DB::table('users')->insertOrIgnore([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
                'is_admin' => $user['is_admin'] ?? false,
                'email_verified_at' => $user['email_verified_at'] ?? now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

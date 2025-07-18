<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->nullable();

            $table->string('name');
            $table->string('phone');
            $table->string('address');
            $table->string('address2')->nullable();
            $table->string('email')->nullable();

            $table->enum('status', ['pending', 'confirmed', 'paid', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->decimal('total_price', 8, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

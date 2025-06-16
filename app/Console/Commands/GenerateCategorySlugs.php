<?php

namespace App\Console\Commands;

use App\Models\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateCategorySlugs extends Command
{
    protected $signature = 'app:generate-category-slugs';

    protected $description = 'Generate slug for categories';

    public function handle()
    {
        $categories = Category::whereNull('slug')->orWhere('slug', '')->get();

        foreach ($categories as $category) {
            $category->slug = Str::slug($category->name);
            $category->save();
            $this->info("Slug generated for : {$category->name}");
        }

        $this->info("Generation finished!");
    }
}

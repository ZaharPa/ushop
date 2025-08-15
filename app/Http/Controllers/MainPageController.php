<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Item;
use App\Models\Product;
use App\Models\Slider;
use Illuminate\Http\Request;

class MainPageController extends Controller
{

    public function index()
    {
        return inertia('MainPage/Index', [
            'slides' => Slider::where('active', true)->orderBy('order')->get(),
            'categories' => Category::all(),
            'latestProducts' => Product::with(['items' => fn($q) => $q->orderBy('price')->with('discount')])
                ->withMin('items', 'price')
                ->orderByRaw('items_min_price IS NULL, items_min_price ASC')
                ->take(8)
                ->get(),
            'latestComments' => Comment::with(['user', 'product.items'])->latest()->take(5)->get(),
            'popularItems' => Item::with(['product', 'photos', 'discount'])
                ->withCount('orderItems')
                ->orderBy('order_items_count', 'desc')
                ->take(8)
                ->get(),
        ]);
    }
}

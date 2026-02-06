<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Product;
use App\Models\ProductView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShowProductController extends Controller
{
    public function __invoke(Product $product, Item $item)
    {
        abort_unless($item->product_id === $product->id, 404);

        $this->recordView($product);

        $product->load([
            'category',
            'features',
            'items.attributeValues.attribute',
            'items.photos',
            'items.discount',
        ]);

        $item->load([
            'attributeValues.attribute',
            'photos',
            'discount'
        ]);

        $rating = auth()->check()
            ? $product->ratings()->where('user_id', auth()->id())->first()
            : null;

        return inertia('ShowProduct', [
            'product' => $product,
            'item' => $item,
            'ratingUser' => $rating,
        ]);
    }

    private function recordView(Product $product)
    {
        $userId = Auth::id();
        $sessionId = session()->getId();

        $recentView = ProductView::where('product_id', $product->id)
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->where('viewed_at', '>', now()->subMinutes(30))
            ->exists();

        if (!$recentView) {
            ProductView::create([
                'product_id' => $product->id,
                'user_id' => $userId,
                'session_id' => $sessionId,
                'ip_address' => request()->ip(),
                'viewed_at' => now(),
            ]);
        }
    }
}

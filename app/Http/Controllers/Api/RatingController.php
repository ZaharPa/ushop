<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Rating::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
            ],
            [
                'rating' => $request->rating,
            ]
        );

        $avg = Rating::where('product_id', $request->product_id)->avg('rating');

        Product::where('id', $request->product_id)->update([
            'average_rating' => $avg,
        ]);

        return response()->json(['message' => 'Success']);
    }
}

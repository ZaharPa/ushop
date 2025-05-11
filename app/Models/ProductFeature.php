<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductFeature extends Model
{
    protected $table = 'product_features';

    protected $fillable = ['product_id', 'feature_id', 'value'];

    public function feature(): BelongsTo
    {
        return $this->belongsTo(Feature::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}

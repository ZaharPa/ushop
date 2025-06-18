<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'category_id',
        'photo',
    ];

    protected $appends = [
        'photo_url'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'product_features')
            ->withPivot('value')
            ->withTimestamps();
    }

    public function productFeatures(): HasMany
    {
        return $this->hasMany(ProductFeature::class);
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query->when(
            $filters['name'] ?? false,
            fn($query, $value) => $query->where('name', 'like', '%' . $value . '%')
        )->when(
            $filters['category'] ?? false,
            fn($query, $value) => $query->whereHas('category', fn($q) => $q->where('slug', $value))
        )->when(
            $filters['min_price'] ?? false,
            fn($q, $value) =>
            $q->whereHas(
                'items',
                fn($q2) =>
                $q2->where('price', '>=', $value)
            )
        )->when(
            $filters['min_price'] ?? false,
            fn($q, $value) =>
            $q->whereHas(
                'items',
                fn($q2) =>
                $q2->where('price', '>=', $value)
            )
        )->when($filters['sort'] ?? false, function ($q, $sort) {
            if ($sort === 'price_asc') {
                $q->withMin('items', 'price')->orderBy('items_min_price');
            } elseif ($sort === 'price_desc') {
                $q->withMin('items', 'price')->orderByDesc('items_min_price');
            }
        });
    }

    public function getPhotoUrlAttribute()
    {
        return $this->photo
            ? asset('storage/' . $this->photo)
            : asset('storage/products/default.png');
    }
}

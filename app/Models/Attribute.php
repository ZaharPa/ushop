<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attribute extends Model
{
    /** @use HasFactory<\Database\Factories\AttributeFactory> */
    use HasFactory;

    protected $fillable = ['name'];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'attribute_categories');
    }

    public function values(): HasMany
    {
        return $this->hasMany(AttributeValue::class);
    }
}

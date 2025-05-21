<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ItemPhoto extends Model
{
    protected $fillable = [
        'path',
        'item_id',
    ];

    protected $appends = [
        'photo_url'
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function getPhotoUrlAttribute()
    {
        return asset('storage/' . $this->path);
    }
}

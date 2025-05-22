<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Discount extends Model
{
    protected $fillable = [
        'item_id',
        'percentage',
        'start_data',
        'end_data',
        'is_active',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}

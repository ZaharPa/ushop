<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Discount extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'percentage',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}

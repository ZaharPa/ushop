<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class AttributeItem extends Pivot
{
    public $incrementing = true;

    protected $fillable = [
        'item_id',
        'attribute_value_id',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function value(): BelongsTo
    {
        return $this->belongsTo(AttributeValue::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LayoutLink extends Model
{
    protected $fillable = [
        'label',
        'url',
        'position',
        'is_active',
    ];
}

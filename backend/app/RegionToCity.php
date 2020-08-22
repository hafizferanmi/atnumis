<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegionToCity extends Model
{
    protected $table = 'data_region_to_city';

    protected $fillable = ['region', 'city'];
}

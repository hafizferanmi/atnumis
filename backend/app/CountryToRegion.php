<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CountryToRegion extends Model
{
    protected $table = 'data_country_to_region';

    protected $fillable = ['country', 'region'];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CityToRuler extends Model
{
    protected $table = 'data_city_to_ruler';

    protected $fillable = ['city', 'ruler'];
}

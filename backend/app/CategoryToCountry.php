<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryToCountry extends Model
{
    protected $table = 'data_category_to_country';

    protected $fillable = ['category', 'country'];
}

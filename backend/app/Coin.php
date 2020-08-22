<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    protected $fillable = [
      'coin_type', 'coin_pic', 'category', 'country', 'region', 'city', 'ruler', 'date', 'denomination', 'metal', 'diameter', 'weight', 'die_axis', 'standard', 'mint', 'struck_dates', 'obv_legend', 'obv_desc', 'rev_legend', 'rev_desc', 'references', 'comments', 'defects', 'grade', 'pedigree', 'notes', 'check', 'multiple_lot', 'header', 'collection', 'inv_no'
    ];
}

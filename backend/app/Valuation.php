<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Valuation extends Model
{
    protected $table = 'valuation';

    protected $fillable = [
    	'name', 'email', 'condition', 'images', 'ack'
    ];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CoinRep extends Model
{
    protected $fillable = [
    	'ack', 'email', 'message'
    ];

    protected $table = 'coin_rep';
}

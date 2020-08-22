<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bids extends Model
{
     protected $fillable = [
     	'auction_id', 'user', 'ammount'
     ];

     protected $table = 'bids';
}

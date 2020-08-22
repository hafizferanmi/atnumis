<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HighestBidder extends Model
{
    protected $fillable = [
    	'coin_id', 'hammer_price', 'paid', 'shipped', 'tracking_no', 'username', 'status'
    ];

    protected $table = 'highest_bidder';
}

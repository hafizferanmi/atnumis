<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AuctionOrders extends Model
{
    protected $table = 'auction_orders';

    protected $fillable = ['auction_id', 'no_of_coins', 'coin_id', 'total_price', 'order_by', 'status', 'paid'];
}

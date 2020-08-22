<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrdersInfo extends Model
{
    protected $table = 'orders_info';

    protected $fillable = [
    	'no_of_coins', 'total_price', 'order_by', 'status', 'paid'
    ];
}

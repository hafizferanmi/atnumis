<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //use this table for the coin orders

    protected $table = 'orders';

    protected $fillable = [
    	'coin_id', 'quantity', 'orders_info_id'
    ];
}

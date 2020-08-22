<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Auction_Credit_Info extends Model
{
    protected $fillable  = [
    	'username', 'auction_type', 'credit_limit_bal'
    ];

    protected $table = 'auction_credit_info';
}

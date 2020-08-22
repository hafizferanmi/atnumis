<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CardInfo extends Model
{
    protected $table = 'card_info';

    protected $fillable = [
    	'user', 'card_type', 'credit_card_no', 'cvv', 'exp_month', 'exp_year'
    ];
}

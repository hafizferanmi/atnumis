<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BillingInfo extends Model
{
    protected $fillable = [
    	'company', 'firstname', 'lastname', 'street', 'street2', 'zip', 'city' 'state', 'country'
    ];

    protected $table = 'billing_info';
}

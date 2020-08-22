<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consign extends Model
{
    protected $fillable = [
    	'ack', 'email', 'message', 'images'
    ];

    protected $table = 'consign';
}

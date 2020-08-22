<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bibliography extends Model
{
    protected $table = 'bibliography';

    protected $fillable = ['reference', 'publication', 'category'];
}

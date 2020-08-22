<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class XlsTable extends Model
{
    protected $table = 'xls';

    protected $fillable = ['name', 'username'];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admin';

    protected $fillable = ['name', 'username', 'role', 'email', 'password', 'image', 'country', 'phone'];

    protected $hidden = [
        'password'
    ];

    public function setPasswordAttribute($password){
        $this->attributes['password'] = password_hash($password, PASSWORD_BCRYPT);
    }

    
}

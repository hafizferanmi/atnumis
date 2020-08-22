<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'username', 'credit_limit', 'street', 'street2', 'zip', 'city', 'state', 'country', 'role', 'collecting_interest', 'references', 'shipping_address1', 'shipping_address2', 'shipping_city', 'shipping_country', 'shipping_zipcode'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'login_token', 'role', 'created_at', 'updated_at', 'email_verified_at'
    ];


    public function setPasswordAttribute($password){
        $this->attributes['password'] = password_hash($password, PASSWORD_BCRYPT);
    }
}

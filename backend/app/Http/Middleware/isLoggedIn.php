<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class isLoggedIn
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
        $reqUsername = $request->_u;
        $reqToken = $request->_t;

        if ( !isset($reqUsername) || !isset( $reqToken ) || $reqUsername == '' || $reqToken == '') {
            return response()->json(['error' => true, 'message' => 'Invalid Request']);
        }else{
            //check if the username exsit here
            $user = User::whereUsername($reqUsername)->first();
            if (!isset( $user ) || $user->login_token !== $reqToken ) {
                return response()->json(['error' => true, 'message' => 'Invalid user']);
            }else{
                return $next($request);
            }

            
        }



        
    }
}

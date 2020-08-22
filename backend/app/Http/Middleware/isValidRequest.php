<?php

namespace App\Http\Middleware;

use Closure;
// use Request;
use Illuminate\Http\Request;

class isValidRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle( $request, Closure $next)
    { 
        $token = env('TOKEN');

        $reqAppToken = $request->_at;

        if ( !isset( $reqAppToken )){
            return response()->json(['error' => true, 'message' => 'FGHJ ']);
        }

        if ( !isset( $reqAppToken ) || $reqAppToken !== $token ) {
            return response()->json(['error' => true, 'message' => 'Invalid ']);
        }

        return $next($request);
    }
}

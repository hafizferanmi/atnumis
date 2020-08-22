<?php

namespace App\Http\Middleware;

use Closure;
use Session;

class isManager
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
        if (Session::get('admin_role') == 100 || Session::get('admin_role') == 1000) {
            return $next($request);
        } else {
            return redirect('/');
        } 
        
    }
}

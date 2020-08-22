<?php

namespace App\Http\Middleware;

use Closure;

class isAccountant
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
        if (Session::get('admin_role') == 10 || Session::get('admin_role') == 1000) {
            return $next($request);
        } else {
            return redirect('/');
        }
    }
}

<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Admin;
use Session;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $adminId = Session::get('admin_id');
        $admin = Admin::find($adminId); // Get the last 10 registered users
        view()->share('admin_dp', $admin->image);
    }
}

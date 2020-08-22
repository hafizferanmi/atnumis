<div class="top_nav">
    <div class="nav_menu">
        <nav>
            <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li class="">
                    <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                         @if( session()->get('admin_dp') != null )
                            <img src="/storage/dp/{{ session()->get('admin_dp') }}" alt="Profile Image" />
                        @else
                            <img src="{{ asset('coin.dashboard/backoffice/user.png') }}" alt="Profile Image" />
                        @endif
                        {{ Session::get('admin_name') }}

                        
                        {{-- <img src="{{ asset('coin.dashboard/backoffice/user.png') }}" alt=""> {{ Session::get('admin_name') }} --}}
                        <span class="fa fa-angle-down"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-usermenu pull-right">
                        <li><a href="/admin/settings"><i class="fa fa-settings pull-right"></i>Settings</a></li>
                        <li><a href="/logout"><i class="fa fa-sign-out pull-right"></i>Log Out</a></li>
                    </ul>
                </li>
                <!-- Notification center -->
                <li role="presentation" class="dropdown hide">
                    <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                        <i class="fa fa-envelope-o"></i>
                        <span class="badge bg-green">1</span>
                    </a>
                    <ul id="mNotifications" class="dropdown-menu list-unstyled msg_list" role="menu">
                        <li>
                            <a>
                                <span class="image">
                                    @if( session()->get('admin_dp') != null )
                                        <img src="/storage/dp/{{ session()->get('admin_dp') }}" alt="Profile Image" />
                                    @else
                                        <img src="{{ asset('coin.dashboard/backoffice/user.png') }}" alt="Profile Image" />
                                    @endif
                                </span>
                                }
                                <span>
                                    <span>System</span>
                                    <span class="time">3 mins ago</span>
                                </span>
                                <span class="message">Message for settings...
                                </span>
                            </a>
                        </li>
                        <li>
                            <div class="text-center">
                                <a>
                                    <strong>See All Alerts</strong>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </li>
                <!-- /Notification center -->
            </ul>
        </nav>
    </div>
</div>

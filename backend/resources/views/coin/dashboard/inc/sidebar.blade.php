<div class="col-md-3 left_col">
    <div class="left_col scroll-view">
        <div class="navbar" style="border: 0; padding: 15px">
            <a href="/">
                <img src="{{ asset('coin.dashboard/source/images/logo.jpg') }}" class="img-responsive hidden-xs" id="imgLogo" style="width: 90%" />
                <img src="{{ asset('coin.dashboard/source/images/fav.png') }}" class="img-responsive hidden" id="imgLogoSmall" style="width: 90%" />
            </a>
        </div>
        <div class="clearfix"></div>
        <!-- menu profile quick info -->
        <div class="profile clearfix">
            <div class="profile_pic">
                @if( session()->get('admin_dp') != null )
                    <img src="/storage/dp/{{ session()->get('admin_dp') }}" alt="..." class="img-circle profile_img"> 
                @else
                    <img src="{{ asset('coin.dashboard/backoffice/user.png') }}" alt="..." class="img-circle profile_img">
                @endif
                
            </div>
            <div class="profile_info">
                <span>Welcome,</span>
                <h2> {{ Session::get('admin_name') }} </h2>
            </div>
        </div>
        <!-- /menu profile quick info -->
        <br />
        <!-- sidebar menu -->
        <style type="text/css">
        .fa .fa-fw {
            font-size: 8px;
        }

        </style>
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
                <ul id="uExternalVataloguer" class="nav side-menu">
                    <li><a href="/"><i class="fa fa-fw fa-home"></i>Home </a>
                    </li>
                    <li><a><i class="fa fa-fw fa-coins"></i>Auction <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">

                            @if(Session::get('admin_role') > 10)
                                <li><a href="/auction/add">Add auction</a></li>
                                <li><a href="/auction/all">All auctions</a></li>
                                <li><a href="/auction/current">Current auctions</a></li>
                                <li><a href="/auction/unpublished">Unpublished auctions</a></li>
                            @endif
                            
                            <li><a href="/auction/orders"> Orders </a></li>
                            
                        </ul>
                    </li>
                 
                    <li><a><i class="fa fa-fw fa-coins"></i>Selling Coin <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="/catalogue/selling">Selling Catalogue</a></li>
                            <li><a href="/add/selling">Add Selling coin</a></li>
                            <li>
                                <a>Orders <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li><a href="/orders/new">New Orders</a></li>
                                    <li><a href="/orders/all">All Orders</a></li>
                                    
                                </ul>
                            </li>
                        </ul>
                    </li>

                    {{-- <li>
                        <a><i class="fa fa-fw fa-database"></i>Orders <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="/orders/new">New Orders</a></li>
                            <li><a href="/orders/all">All Orders</a></li>
                        </ul>
                    </li> --}}

                    @if(Session::get('admin_role') > 10)

                    <li>
                        <a><i class="fa fa-fw fa-box-open"></i>Services <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li>
                                <a>Consign <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li><a href="/consign/new">New Consign</a></li>
                                    <li><a href="/consign/all">All Consign</a></li>
                                </ul>
                            </li>

                            <li>
                                <a>Coin Representation <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li><a href="/representation/new">New Representation</a></li>
                                    <li><a href="/representation/all">All Representation</a></li>
                                </ul>
                            </li>

                            <li>
                                <a>Valuation <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li><a href="/valuation/new">New Valuation</a></li>
                                    <li><a href="/valuation/all">All Valuation</a></li>
                                </ul>
                            </li>

                        </ul>
                    </li>

                    @endif

                   {{--  <li>
                        <a><i class="fa fa-fw fa-box-open"></i>Consign <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="/consign/new">New Consign</a></li>
                            <li><a href="/consign/all">All Consign</a></li>
                        </ul>
                    </li>
                    <li>
                        <a><i class="fa fa-fw fa-calendar-plus"></i>Coin Representation <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="/representation/new">New Representation</a></li>
                            <li><a href="/representation/all">All Representation</a></li>
                        </ul>
                    </li>
                    <li>
                        <a><i class="fa fa-fw fa-calendar-plus"></i>Valuation <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="/valuation/new">New Valuation</a></li>
                            <li><a href="/valuation/all">All Valuation</a></li>
                        </ul>
                    </li> --}}
                    @if(Session::get('admin_role') > 10)
                    <li>
                        <a><i class="fa fa-fw fa-user"></i>Users <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="/users/all">Users</a></li>
                            {{-- <li><a href="/users/admin">Admin Users</a></li> --}}
                            <li>
                                <a>Admin <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li><a href="/users/admin/add">Add admin</a></li>
                                    <li><a href="/users/admin/all">All admin</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    @endif

                    {{-- <li>
                        <a><i class="fa fa-fw fa-book"></i>Page Content <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="/page-content">Page content</a></li>
                        </ul>
                    </li> --}}
                </ul>
            </div>
        </div>
        <!-- /sidebar menu -->
        <!-- /menu footer buttons -->
        <div class="sidebar-footer hidden-small">
            <a>
                <span class="glyphicon" aria-hidden="true"></span>
            </a>
            <a>
                <span class="glyphicon" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Settings" href="/admin/settings">
                <i class="fa fa-cog"></i>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Logout" href="/logout">
                <i class="fa fa-power-off"></i>
            </a>
        </div>
        <!-- /menu footer buttons -->
    </div>
</div>

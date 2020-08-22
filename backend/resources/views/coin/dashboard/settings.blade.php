@extends('coin.dashboard.master')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
   
    @if ($errors->any())
    <div class="alert alert-danger" style="margin-top: 70px;">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <link rel="stylesheet" type="text/css" href="{{ asset('vendors/slick/slick.css') }}" />
    <script type="text/javascript" src="{{ asset('vendors/slick/slick.min.js') }}"></script>
    <div style="margin-top: 70px;">
        @if( Session::has('flash') )
        <div class="alert alert-info">
            {{ Session::get('flash') }}
        </div>
        @endif
    </div>
    <link rel="stylesheet" type="text/css" href="{{ asset('vendors/slick/slick.css') }}" />
    <script type="text/javascript" src="{{ asset('vendors/slick/slick.min.js') }}"></script>
    <div id="ctl00_upDefault">
        {{-- <div class="page-title">
            <div class="title_left">
                <h3> Edit selling coin </h3>
            </div>
        </div> --}}
        <div class="clearfix"></div>
        <div class="row">
            <div class="col-sm-7 col-xs-12">
                <form method="post" action="/admin/update/details" id="theForm" class="form-horizontal form-label-left">
                	 {{ csrf_field() }}
                    <!-- Left column panels -->
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Update details <small></small> </h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_inventory">
                            {{-- <input type="hidden" name="id" value="{{ $user->id }}"> --}}
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Name:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="name" type="text" id="" value="{{$admin->name }}" class="form-control" placeholder="Name" />
                                </div>
                            </div>
                            {{-- <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Username:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="username" type="text" id="" value="" class="form-control" placeholder="Username" />
                                </div>
                            </div> --}}

                            {{-- <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Email:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="email" type="email" id="email" value="{{$admin->email}}" class="form-control" placeholder="Email" />
                                </div>
                            </div> --}}

                            {{-- <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Password:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="password" type="password" id="" value="" class="form-control" placeholder="Password" />
                                </div>
                            </div> --}}
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Country:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="country" type="text" id="country" value="{{$admin->country }}" class="form-control" placeholder="Country" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Phone:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="phone" type="text" id="" value="{{$admin->phone }}" class="form-control" placeholder="Phone" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="submit" name="submit" value="Update settings" id="btnSetInventory" class="btn btn-success pull-" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <form method="post" action="/admin/update/email" id="theForm" class="form-horizontal form-label-left">
                	 {{ csrf_field() }}
                    <!-- Left column panels -->
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Update Email Address <small></small> </h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_inventory">
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">New Email:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="email" type="email" class="form-control" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="submit" name="submit" value="Update email" id="" class="btn btn-primary pull-" />
                                    </div>
                                </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-5 col-xs-12">
                <form method="post" action="/admin/update/password" id="theForm" class="form-horizontal form-label-left">
                	 {{ csrf_field() }}
                    <!-- Left column panels -->
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Update password <small></small> </h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_inventory">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">New password:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="password" type="password" id="" value="" class="form-control" placeholder="New password" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Confirm password:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="password2" type="password" id="" value="" class="form-control" placeholder="Confirm password" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="submit" name="submit" value="Update password" id="" class="btn btn-primary pull-left" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <form method="post" action="/admin/update/dp" enctype="multipart/form-data" id="theForm" class="form-horizontal form-label-left">
                	 {{ csrf_field() }}
                    <!-- Left column panels -->
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Update Picture <small></small> </h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_inventory">
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Choose image:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="image" type="file" class="form-control" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="submit" name="submit" value="Update picture" id="" class="btn btn-info pull-" />
                                    </div>
                                </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- /page content -->
@stop
@section('title')
Atnumis &middot User settings.
@stop

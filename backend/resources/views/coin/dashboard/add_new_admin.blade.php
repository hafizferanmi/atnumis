@extends('coin.dashboard.master')


@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <form method="post" action="/users/admin/add" id="theForm" class="form-horizontal form-label-left" data-parsley-validate="">

        {{ csrf_field() }}

          @if ($errors->any())
            <div class="alert alert-danger">
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
                    <!-- Left column panels -->
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Add a new admin <small></small> </h2>
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
                                    <input name="name" type="text" id="" value="" class="form-control" placeholder="Name" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Username:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="username" type="text" id="" value="" class="form-control" placeholder="Username" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Email:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="email" type="email" id="email" value="" class="form-control" placeholder="Email" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Password:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="password" type="password" id="" value="" class="form-control" placeholder="Password" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Country:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="country" type="text" id="country" value="" class="form-control" placeholder="Country" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Role:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="role" class="form-control">
                                        <option value="10"> Accountant </option>
                                        <option value="100"> Manager </option>
                                        <option value="1000"> Administrator </option>
                                    </select>
                                </div>
                            </div>
                            

                          {{--   <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Company:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="company" type="text" id="" value="" class="form-control" placeholder="Company" />
                                </div>
                            </div> --}}

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Phone:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="phone" type="text" id="" value="" class="form-control" placeholder="Phone" />
                                </div>
                            </div>

                            {{-- <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Address:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="street" type="text" id="" value="" class="form-control" placeholder="Address" />
                                </div>
                            </div>

                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Address 2:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="street2" type="text" id="" value="" class="form-control" placeholder="Address 2" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Zip: </label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="zip" type="text" id="" value="" class="form-control" placeholder="Zip" />
                                </div>
                            </div> --}}

                         {{--    <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">City:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="city" type="text" id="" value="" class="form-control" placeholder="City" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">State:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="state" type="text" id="" value="" class="form-control" placeholder="State" />
                                </div>
                            </div>
 --}}
                           

                          {{--   <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Shipping address 1:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="shipping_address1" type="text" id="" value="" class="form-control" placeholder="shipping address 1" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Shipping address 2:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="shipping_address2" type="text" id="" value="" class="form-control" placeholder="Shipping address 2" />
                                </div>
                            </div>
                            

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Shipping Country:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="shipping_country" type="text" id="" value="" class="form-control" placeholder="Shipping country" />
                                </div>
                            </div> --}}
                           
                         

                       {{--       <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Shipping city:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="shipping_city" type="text" id="" value="" class="form-control" placeholder="Shipping city" />
                                </div>
                            </div>

                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Shipping Zipcode:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="shipping_zipcode" type="text" id="" value="" class="form-control" placeholder="shipping zipcode" />
                                </div>
                            </div> --}}
                          
                          
                         
                         
                         

                           <div class="form-group">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="submit" name="submit" value="Add Admin" id="btnSetInventory" class="btn btn-success pull-" />
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5 col-xs-12">
                   
                    
                </div>
            </div>


        </div>
        <style>
            .div-toolbar {
        background-color: #e3f7fc;
        display: none;
        box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.3);
        margin-left: 0.1em;
        margin-right: 0.1em;
    }

        .div-toolbar.active {
            display: block;
        }

    .btn-char {
        margin: 0.05em !important;
        min-width: 1.4em;
        padding: 8px 2px !important;
        line-height: 0.1 !important;
    }

    .form-control-special {
        display: block;
        width: 100%;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        min-height: 54px;
        height: auto;
    }

        .form-control-special:focus {
            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
        }
</style>
       
    </form>
</div>
<!-- /page content -->
@stop


@section('title')
    Atnumis &middot Add new admin.
@stop
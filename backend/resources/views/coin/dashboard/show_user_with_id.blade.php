@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            <div class="row">
                  <div style="margin-top: 70px;  margin-bottom: ;">
                    @if( Session::has('flash') )
                        <div class="alert alert-success text-left">
                            {{ Session::get('flash') }}
                        </div>
                    @endif
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>User details. <small></small></h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            {{-- <div class="x_content">
                                Here are all new coin representation.
                            </div> --}}
                            <div class="x_content">
                                <div class="btn btn-success">
                                    <a href="/users/bids/{{$user->username}}" style="color: white"> View Bids </a>
                                </div>
                                <div class="btn btn-info">
                                    <a href="/users/orders/{{$user->username}}" style="color: white"> View Orders </a>
                                </div>
                                <div style="margin-top: 20px;">
                                    <div class="col-md-12">
                                        <table class="table table-bordered table-hover">
                                            <thead>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> Username </td>
                                                    <td> {{ $user->username }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Name </td>
                                                    <td> {{ $user->name }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Email </td>
                                                    <td> {{ $user->email }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Company </td>
                                                    <td> {{ $user->company }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Country </td>
                                                    <td> {{ $user->country }}</td>
                                                </tr>
                                                <tr>
                                                    <td> City </td>
                                                    <td> {{ $user->city }} </td>
                                                </tr>
                                                <tr>
                                                    <td> State </td>
                                                    <td> {{ $user->state }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Zip </td>
                                                    <td> {{ $user->zip }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Address </td>
                                                    <td> {{ $user->street . $user->street2 }}</td>
                                                </tr>
                                                <tr>
                                                    <td> Phone </td>
                                                    <td> {{ $user->phone }}</td>
                                                </tr>
                                                <tr>
                                                    <td> Shipping Country </td>
                                                    <td> {{ $user->shipping_country }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Shipping City </td>
                                                    <td> {{ $user->shipping_city }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Shipping address </td>
                                                    <td> {{ $user->shipping_address1 }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Shipping Address2 </td>
                                                    <td> {{ $user->shipping_address2 }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Shipping Zip code </td>
                                                    <td> {{ $user->shipping_zipcode }} </td>
                                                </tr>
                                                <tr>
                                                    <td> User Restricted </td>
                                                    <td> {{ $user->active ? 'No' : 'Yes' }} </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="btn btn-primary">
                                    <a href="/users/edit/{{$user->id}}" style="color: white"> Edit user details </a>
                                </div>
                                @if($user->active)
                                     <div class="btn btn-success">
                                        <a href="/users/block/{{$user->id}}" style="color: white"> Restrict User </a>
                                    </div>
                                @else
                                     <div class="btn btn-success">
                                        <a href="/users/unblock/{{$user->id}}" style="color: white"> Unrestrict User </a>
                                    </div>
                                @endif
                               
                                <div class="btn btn-danger">
                                    <a href="/users/delete/{{$user->id}}" style="color: white"> Delete user </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@stop
@section('title')
User description &middot Atnumis.
@stop

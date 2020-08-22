@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            <div class="row">

                @if( Session::has('flash') )
                  <div class="alert alert-info" style="margin-top: 70px;">
                      {{ Session::get('flash') }}
                  </div>
                @endif

                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>Admin details. <small></small></h2>
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
                                <div>
                                    <div class="col-md-12">
                                        <table class="table table-bordered table-hover">
                                            <thead>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> Username </td>
                                                    <td> {{ $admin->username }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Name </td>
                                                    <td> {{ $admin->name }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Email </td>
                                                    <td> {{ $admin->email }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Role </td>
                                                    <td> {{ $admin->title }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Country </td>
                                                    <td> {{ $admin->country }}</td>
                                                </tr>
                                              {{--   <tr>
                                                    <td> City </td>
                                                    <td> {{ $admin->city }} </td>
                                                </tr>
                                                <tr>
                                                    <td> State </td>
                                                    <td> {{ $admin->state }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Zip </td>
                                                    <td> {{ $admin->zip }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Address </td>
                                                    <td> {{ $admin->street . $admin->street2 }}</td>
                                                </tr> --}}
                                                <tr>
                                                    <td> Phone </td>
                                                    <td> {{ $admin->phone }}</td>
                                                </tr>
                                              {{--   <tr>
                                                    <td> Shipping Country </td>
                                                    <td> {{ $admin->shipping_country }} </td>
                                                </tr> --}}
                                              {{--   <tr>
                                                    <td> Shipping City </td>
                                                    <td> {{ $admin->shipping_city }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Shipping address </td>
                                                    <td> {{ $admin->shipping_address1 }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Shipping Address2 </td>
                                                    <td> {{ $admin->shipping_address2 }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Shipping Zip code </td>
                                                    <td> {{ $admin->shipping_zipcode }} </td>
                                                </tr> --}}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="btn btn-primary">
                                    <a href="#"   data-toggle="modal" data-target="#myModal" style="color: white"> Edit admin role </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h2> Change order status </h2>
        {{-- <button type="button" class="close" data-dismiss="modal">&times;</button> --}}
      </div>
      <div class="modal-body">
        @if ($errors->any())
            <div >
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

         @if( Session::has('flash') )
          <div class="alert alert-info">
              {{ Session::get('flash') }}
          </div>
        @endif
        <div> From: <h4> {{ ucfirst( str_replace('-', ' ', $admin->title) )  }} </h4>  </div>
        <div class="mb-2">
            <form method="post" action="/users/admin/update/role">
                {{ csrf_field() }}
                <label>To</label>
                <select name="role" class="form-control">
                    <option value=""> Change role to </option>
                    <option value="1000"> Adminstrator </option>
                    <option value="100"> Manager </option>
                    <option value="10"> Accountant </option>
                    
                </select>

                <input type="hidden" name="_id" value="{{ $admin->id }}">

                <div class="mt-4" style="margin-top: 20px;">
                    <input type="submit" name="" class="btn btn-primary btn-s" value="Change Role">
                </div>
            </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
@stop
@section('title')
Admin description &middot Atnumis.
@stop

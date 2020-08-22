@extends('coin.dashboard.master')


@section('content')


<div class="right_col" role="main">


<div id="ctl00_upDefault">
    <div class="">
       {{--  <div class="page-title">
            <div class="title_left">
                <h3> All new coin order_inforesentation. </h3>
            </div>
        </div>
        <div class="clearfix"></div> --}}

        {{--  <div style="margin-top: 40px;">
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div> --}}
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_planel">
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Bid invoice. <small></small></h2>
                            <div class="nav navbar-right panel_toolbox" style="font-size: 20px;">
                                <div class="dropdown no-arrow">
                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>Option
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink" style="font-size: 20px;">
                                  <div class="dropdown-header">Order Action:</div>
                                  <li> <a class="dropdown-item" href="#" data-toggle="modal" data-target="#myModal"> Change order status </a> </li>
                                  
                                </ul>
                              </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                       {{--  <div class="x_content">
                           Here are all new coin order_inforesentation.
                        </div> --}}
                        <div class="x_content">
                            <div>
                                <div class="col-md-12">
                                    <div style="margin-top: 40px;  margin-bottom: ;">
                                        @if( Session::has('flash') )
                                            <div class="alert alert-success text-left">
                                                {{ Session::get('flash') }}
                                            </div>
                                        @endif
                                    </div>
                                  
                                    <div class="product-detail-wrap">
                                        {{-- <div class="col-md-3"  style="margin-top: ;">
                                            <h3 class="mb-20">Order Id</h3>
                                            <h4 class="mb-20" >{{  padzero($order_info->id)  }}</h4>
                                        </div> --}}

                                        <div class="col-md-3">
                                            <h3 class="mb-20" style="margin-top: ;">No of coins</h3>
                                            <h4 class="mb-20">{{ $order_info->no_of_coins }}</h4>
                                        </div>

                                        <div class="col-md-3">
                                            <h3 style="margin-top: ;" class="mb-20">Total price</h3>
                                            <p class="mb-50"> {{ $order_info->total_price }} </p>
                                        </div>

                                        <div class="col-md-3">
                                            <h3 style="margin-top: ;" class="mb-20">Status</h3>
                                            <p class="mb-50"> {{ $order_info->status }} </p>
                                        </div>

                                        <div class="col-md-3">
                                            <h3 style="margin-top: 30px;" class="mb-20">Paid</h3>
                                            <p class="mb-50"> {{ $order_info->paid ? 'Yes' : 'No' }} </p>
                                        </div>

                                        <div class="col-md-3">
                                            <h3 style="margin-top: 30px;" class="mb-20">Order By</h3>
                                            <p class="mb-50"> {{ ucfirst($order_info->order_by)  }} </p>
                                        </div>

                                        <div class="col-md-3">
                                            <h3 style="margin-top:30px ;" class="mb-20">Pay. Method</h3>
                                            <p class="mb-50"> {{ $order_info->payment_method }} </p>
                                        </div>

                                        <div class="col-md-3">
                                            <h3 style="margin-top: 30px;" class="mb-20">Amt. Paid</h3>
                                            <p class="mb-50"> {{ $order_info->paid ? 'Paid' : 'Never paid' }} </p>
                                        </div>

                                        <div class="col-md-12 col-md-offset- " style="margin-bottom: 50px;">
                                            <div class="bg-whitesmoke" style="background: whitesmoke; margin-top: 40px; padding: 50px;">
                
            
                                                    <h2 style="margin-bottom: 30px;">  Products ( {{ $order_info->no_of_coins }} ) </h2>
                                                    <table id="cart" class="table table-hover table-condensed" >
                                                        <thead>
                                                        <tr>
                                                            <th style="width:60%">Product</th>
                                                            <th style="width:10%" class="text-center">Price</th>
                                                            <th style="width:8%" class="text-center">Quantity</th>
                                                            {{-- <th style="width:22%" class="text-center">Subtotal</th> --}}
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                          
                                                            @foreach($orders as $order)
                                                 
                                                               
                                                 
                                                                <tr id="tr{{ $order->id }}">
                                                                    <td data-th="Product">
                                                                        <div class="row">
                                                                            <div class="col-sm-3 hidden-xs"><img src="/storage/selling/{{ $order->coin_pic }}" width="100" height="100" class="img-responsive"/></div>
                                                                            <div class="col-sm-9">
                                                                                <div class="nomargin">{{ $order->country . ' ' . $order->region . ' ' . $order->ruler }}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td data-th="Price"  class="text-center">${{ $order->price }}</td>
                                                                    <td data-th="Quantity" class="text-center">
                                                                      
                                                                        <div  class=""> {{ $order->quantity }} </div>
                                                                    </td>
                                                                    
                                                                   
                                                                   
                                                                </tr>
                                                            @endforeach
                                                    
                                                       
                                                        </tbody>
                                                       
                                                    </table>

                                                   {{--  <div style="background: white; max-width: 130px; padding: 20px;">
                                                        TOTAL <br/>
                                                        <h2 style="margin-top: 10px; margin-bottom: 0px;">$<span class='final_total'>{{ $total }} </span></h2>
                                                    </div> --}}

                                                   

                                                    
                                                </div>
                                        </div>

                                        <div style="margin-top: 50px; font-size: 16px; ">
                                             <div class="row mb-2 mt-2 pr-5" class="text-capitalize" style="text-transform: capitalize;">
                                                  <div class="col-md-6 text-right">
                                                      <h2>Contact Address</h2>
                                                      <div> {{ $user->firstname . ' ' . $user->lastname }} </div>
                                                      <div> {{ $user->phone }} </div>
                                                      <div> {{ $user->email }} </div>
                                                      <div> {{ $user->street }}, {{ $user->street2 }}</div>
                                                      <div> {{ $user->city }}, {{ $user->state }}, {{ $user->country }} </div>
                                                      <div> {{ $user->zip }} </div>
                                                  </div>
                                                  <div class="col-md-6 text-left pl-5">
                                                      <h2>Shipping Details</h2>
                                                        <div> {{ $user->firstname . ' ' . $user->lastname }} </div>
                                                        <div> {{ $user->phone }} </div>
                                                        <div> {{ $user->email }} </div>

                                                      @if($order_info->shipping_is_different == 1)
                                                         <div> {{ $order_info->shipping_address1 }}, {{ $user->shipping_address2 }}</div>
                                                        <div> {{ $order_info->shipping_city }}, {{ $order_info->shipping_state }}, {{ $order_info->shipping_country }} </div>
                                                        <div> {{ $order_info->shipping_zipcode }} </div>
                                                      @else
                                                        <div> {{ $user->street }}, {{ $user->street2 }}</div>
                                                        <div> {{ $user->city }}, {{ $user->state }}, {{ $user->country }} </div>
                                                        <div> {{ $user->zip }} </div>
                                                      @endif
                                                      
                                                  </div>
                                              </div>
                                        </div>
                                  

                                


                                    </div>
                                </div>
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
        <p> Change order status </p>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
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

         @if( Session::has('order-status-flash') )
          <div class="alert alert-info">
              {{ Session::get('order-status-flash') }}
          </div>
        @endif
        <div> From: <h4> {{ ucfirst( str_replace('-', ' ', $order_info->status) )  }} </h4>  </div>
        <div class="mb-2">
            <form method="post" action="/dashboard/coin/change-order-status">
                {{ csrf_field() }}
                <label>To</label>
                <select name="_status" class="form-control">
                    <option value=""> Change status to </option>
                    <option value="completed"> Completed </option>
                    <option value="processing"> Processing </option>
                    <option value="canceled"> Canceled </option>
                    <option value="failed"> Failed </option>
                    <option value="on-hold"> On hold </option>
                    <option value="pending"> Pending </option>
                    <option value="refunded"> Refunded </option>
                    <option value="new"> New </option>
                </select>

                <input type="hidden" name="_id" value="{{ $order_info->id }}">

                <div class="mt-4" style="margin-top: 20px;">
                    <input type="submit" name="" class="btn btn-primary btn-s" value="Change status">
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
    Orders description. &middot Atnumis.
@stop

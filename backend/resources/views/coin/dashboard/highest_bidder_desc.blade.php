@extends('coin.dashboard.master')


@section('content')


<div class="right_col" role="main">


<div id="ctl00_upDefault">
    <div class="">
       {{--  <div class="page-title">
            <div class="title_left">
                <h3> All new coin highest_bidderresentation. </h3>
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
                            <h2>Highest Bidders description. <small></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                       {{--  <div class="x_content">
                           Here are all new coin highest_bidderresentation.
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

                                     <?php 
                                    
                                      $zero = ['0', '00', '000'];
                                        $a = str_split($highest_bidder->id);
                                        if (count($a) < 4) {
                                            $less = 4 - count($a);
                                            $highest_bidder_id = $zero[$less - 1] . $highest_bidder->id;
                                        }else{
                                            $highest_bidder_id = $highest_bidder->id;
                                        }
                                       
                                    ?>

                                    <div class="product-detail-wrap">
                                        <div class="col-md-3"  style="margin-top: 30px;">
                                            <h3 class="mb-20">Coin Id</h3>
                                            <h4 class="mb-20" >{{  $highest_bidder_id  }}</h4>
                                        </div>

                                       


                                        <div class="col-md-3">
                                            <h3 style="margin-top: 30px;" class="mb-20">Status</h3>
                                            <p class="mb-50"> {{ $highest_bidder->status ? 'Pending' : 'Processing' }} </p>
                                        </div>

                                        <div class="col-md-3">
                                            <h3 style="margin-top: 30px;" class="mb-20">Payment</h3>
                                            <p class="mb-50"> {{ $highest_bidder->paid ? 'Paid' : 'Never paid' }} </p>
                                        </div>

                                    

                                        <div class="col-md-3">
                                            <h3 style="margin-top:30px ;" class="mb-20">Status</h3>
                                            <p class="mb-50"> {{ $highest_bidder->paid ? 'Paid' : 'Never paid' }} </p>
                                        </div>



                                        <div class="col-md-10 col-md-offset-1 ">
                                            <div class="bg-whitesmoke" style="background: whitesmoke; margin-top: 40px; padding: 50px;">
                
            
                                                    <h2 style="margin-bottom: 30px;">  Products  </h2>
                                                    <table id="cart" class="table table-hover table-condensed" >
                                                        <thead>
                                                        <tr>
                                                            <th style="width:60%">Coin</th>
                                                            <th style="width:10%" class="text-center">Starting Price</th>
                                                            <th style="width:10%" class="text-center">Hammer Price</th>
                                                            {{-- <th style="width:8%" class="text-center">Quantity</th> --}}
                                                            {{-- <th style="width:22%" class="text-center">Subtotal</th> --}}
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                      
                                                 
                                                                <tr id="tr{{ $highest_bidder->id }}">
                                                                    <td data-th="Product">
                                                                        <div class="row">
                                                                            <div class="col-sm-3 hidden-xs"><img src="/storage/auction/{{ $highest_bidder->coin_pic }}" width="100" height="100" class="img-responsive"/></div>
                                                                            <div class="col-sm-9">
                                                                                <div class="nomargin">{{ $highest_bidder->country . ' ' . $highest_bidder->region . ' ' . $highest_bidder->ruler }}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td data-th="Price"  class="text-center">${{ $highest_bidder->starting_price }}</td>
                                                                    <td data-th="Price"  class="text-center">${{ $highest_bidder->hammer_price }}</td>
                                                                  
                                                                    
                                                                   
                                                                   
                                                                </tr>
                                                    
                                                        </tbody>
                                                       
                                                    </table>

                                                </div>
                                        </div>

                                      


                 {{--                        <div class="col-md-12" style="margin-top: 50px;">
                                            <div>
                                                <h3 style="margin-top: 30px;" class="mb-20"> Company </h3>
                                                <p class="mb-50"> {{ $highest_bidder->company }} </p>
                                                <h3 class="mb-20" style="margin-top: 30px;">Email</h3>
                                                <h4 class="mb-20">{{ $highest_bidder->email }}</h4>
                                                <h3 style="margin-top: 30px;" class="mb-20">Name</h3>
                                                <p class="mb-50"> {{ $highest_bidder->name}} </p>
                                                <h3 style="margin-top: 30px;" class="mb-20"> Street </h3>
                                                <p class="mb-50"> {{ $highest_bidder->street }} </p>
                                                <h3 style="margin-top: 30px;" class="mb-20"> Street line 2 </h3>
                                                <p class="mb-50"> {{ $highest_bidder->street2 }} </p>
                                                <h3 style="margin-top: 30px;" class="mb-20"> Zip </h3>
                                                <p class="mb-50"> {{ $highest_bidder->zip }} </p>
                                                <h3 style="margin-top: 30px;" class="mb-20"> City </h3>
                                                <p class="mb-50"> {{ $highest_bidder->city }} </p>
                                                <h3 style="margin-top: 30px;" class="mb-20"> State </h3>
                                                <p class="mb-50"> {{ $highest_bidder->state }} </p>
                                                <h3 style="margin-top: 30px;" class="mb-20"> Country </h3>
                                                <p class="mb-50"> {{ $highest_bidder->country }} </p>
                                                <h3 style="margin-top: 30px;" class="mb-20"> Phone </h3>
                                                <p class="mb-50"> {{ $highest_bidder->phone }} </p>
                                                <h3 style="margin-top: 30px;" class="mb-20"> Fax </h3>
                                                <p class="mb-50"> {{ $highest_bidder->fax }} </p>
                                                
                                            </div>
                                        </div> --}}


                                         <div class="col-md-10 col-md-offset-1" style="margin-top: 50px;">
                                            <table class="table table-responsive table-bordered table-hover">
                                                <h1> Shipping Information. </h1>
                                                <tbody>
                                                    <tr>
                                                        <td>Company  </td>
                                                        <td> {{ $highest_bidder->company }} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Email </td>
                                                        <td> {{ $highest_bidder->email }} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Name </td>
                                                        <td> {{ $highest_bidder->name}} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Street </td>
                                                        <td> {{ $highest_bidder->street }} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Street line 2 </td>
                                                        <td> {{ $highest_bidder->street2 }} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Zip </td>
                                                        <td> {{ $highest_bidder->zip }} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> City </td>
                                                        <td> {{ $highest_bidder->city }} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> State </td>
                                                        <td> {{ $highest_bidder->state }} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Country </td>
                                                        <td> {{ $highest_bidder->country }} </td>
                                                    </tr>
                                                     <tr>
                                                        <td> Phone </td>
                                                        <td> {{ $highest_bidder->phone }} </td>
                                                    </tr>
                                                   {{--   <tr>
                                                        <td> Fax </td>
                                                        <td> {{ $highest_bidder->fax }} </td>
                                                    </tr> --}}
                                                </tbody>
                                            </table>
                                        </div>

                                        
                                        

{{-- 
                                        @if($highest_bidder->status)
                                            <h3 style="margin-top: ;" class="mb-20">Acknowledged By</h3>
                                            <p class="mb-50"> {{ ucfirst($highest_bidder->ack_by) }} </p>
                                        @endif

                                        <form method="post" action="/dashboard/coin/ack/highest_bidder" style="margin-top: ;">
                                            {{ csrf_field() }}
                                            <input class="" type="hidden" value="{{ $highest_bidder->id }}" name="highest_bidder_id" />
                                            <div class="btn-group mr-10">
                                                <button class="btn btn-{{ $highest_bidder->ack ? 'danger' : 'primary' }} btn btn-sm btn-anim"><span class="btn-text">{{ !$highest_bidder->ack ? 'Acknowledge »' : 'Unacknowledge »' }} </span></button>
                                            </div>
                                        </form>
                                        --}}
                                       
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

@stop

@section('title')
    Highest Bidders Description. &middot Atnumis.
@stop

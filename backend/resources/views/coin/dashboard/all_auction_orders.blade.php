@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            <div style="margin-top: 70px;">
                @if( Session::has('flash') )
                <div class="alert alert-info">
                    {{ Session::get('flash') }}
                </div>
                @endif
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2> Auction Orders <small></small></h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <div class="x_content">
                                <div>
                                    <table class="table jambo_table table-bordered" cellspacing="0" rules="all" border="1" id="gvInventory" style="border-collapse:collapse;">
                                        <thead>
                                            <tr>
                                                <th scope="col">S/N</th>
                                                <th scope="col">Name</th>
                                                {{-- <th scope="col">No of coins</th>
                                                <th scope="col">Published</th>
                                                <th scope="col">Created By</th> --}}
                                                {{-- <th scope="col">Status</th> --}}
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php $i = 1?>
                                            @foreach ($auctions as $auction)
                                            <tr>
                                                <td> {{ $i++ }} </td>
                                                <td> {{ $auction->type }} </td>
                                                {{-- <td> {{ $auction->no_of_coins }} --}}
                                                    {{-- <td> {{ $auction->active ? 'Yes' : 'No' }}</td>
                                                <td> {{ $auction->created_by }}</td> --}}
                                                {{-- <td> {{ $auction->auctionStatus() }}</td> --}}
                                                <td>
                                                    @if($auction->hasBeenActivated())
                                                        @if($auction->isAuctionPast())
                                                            @if($auction->hasGeneratedOrder())
                                                                <a class="btn btn-primary btn-xs" title="Add coin" href="/auction/{{$auction->id}}/{{$auction->slug}}/orders"> View Orders </a>
                                                            @else
                                                                <a class="btn btn-info btn-xs" title="Add coin" href="/auction/{{$auction->id}}/{{$auction->slug}}/generate/orders"> Generate Order </a>
                                                            @endif
                                                        @else
                                                            <button class="btn btn-xs btn-success"> Auction Ongoing </button>
                                                        @endif
                                                    
                                                    @else
                                                        <button class="btn btn-xs btn-danger"> Auction In Future </button>
                                                    @endif
                                                </td>
                                            </tr>
                                            {{-- <p>This is user {{ $user->id }}</p> --}}
                                            @endforeach
                                        </tbody>
                                    </table>
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
Atnumis &middot Auction Orders.
@stop

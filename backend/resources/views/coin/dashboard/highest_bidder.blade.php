@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>Highest Bidders for <small></small></h2>
                                {{-- <h2>Highest Bidders for "{{ $auction }}" <small></small></h2> --}}
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
                                                <th scope="col">Coin Name</th>
                                                <th scope="col">Starting price</th>
                                                <th scope="col">Hammer Price</th>
                                                <th scope="col">Hammer By</th>
                                                {{-- <th scope="col"> Paid </th>
                                                <th scope="col"> Shipped </th>
                                                <th scope="col"> Status </th>
                                                <th scope="col"> Tracking No. </th> --}}
                                                {{-- <th scope="col"> </th> --}}
                                                <th scope="col">Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php $i=1; ?>
                                            @foreach ($highest_bidders as $highest_bidder)
                                            <tr>
                                                <td> {{ $i++ }} </td>
                                                <td> {{ $highest_bidder->country . ' ' . $highest_bidder->region . ' ' . $highest_bidder->ruler }} </td>
                                                <td> {{ $highest_bidder->starting_price }} </td>
                                                <td> {{ $highest_bidder->hammer_price ? $highest_bidder->hammer_price : 'No bids' }} </td>
                                                <td> {{ $highest_bidder->username ? $highest_bidder->username : 'Nil' }} </td>
                                                {{-- <td> {{ $highest_bidder->paid == 0 ? 'No' : 'Yes' }} </td>
                                                <td> {{ $highest_bidder->shipped == 0 ? 'No' : 'Yes' }} </td>
                                                <td> {{ $highest_bidder->shipped == 0 ? 'Pending' : 'Processing' }} </td>
                                                <td> {{ $highest_bidder->tracking_no !== '' ? $highest_bidder->tracking_no : 'Nil' }} </td> --}}
                                                <td><a class="btn btn-primary btn-xs" href="/bids/highest/{{ $highest_bidder->id }}"> View </a></td>
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
Atnumis &middot Highest Bidders.
@stop

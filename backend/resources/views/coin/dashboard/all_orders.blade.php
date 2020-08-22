@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>All orders <small></small></h2>
                                <div class="nav navbar-right panel_toolbox">
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>Options
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-right  animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Order Action:</div>
                                            <li> <a class="dropdown-item" href="/orders/all/processing"> Processing </a> </li>
                                            <li> <a class="dropdown-item" href="/orders/all/pending"> Pending </a> </li>
                                            <li> <a class="dropdown-item" href="/orders/all/completed"> Completed </a> </li>
                                            <li> <a class="dropdown-item" href="/orders/all/on-hold"> On Hold </a> </li>
                                            <li> <a class="dropdown-item" href="/orders/all/refunded"> Refunded </a> </li>
                                            <li> <a class="dropdown-item" href="/orders/all/canceled"> Canceled </a> </li>
                                            <div class="dropdown-divider"></div>
                                            <li> <a class="dropdown-item" href="/orders/all"> View all orders </a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="x_content">
                            </div>
                            <div class="x_content">
                                <div>
                                    <table class="table jambo_table table-bordered text-" cellspacing="0" rules="all" border="1" id="gvInventory" style="border-collapse:collapse;">
                                        <thead class="text-center">
                                            <tr>
                                                {{-- <th scope="col">S/N</th> --}}
                                                <th scope="col">Order ID</th>
                                                <th scope="col">No. of coins</th>
                                                <th scope="col">Total Price</th>
                                                <th scope="col">Order By</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Paid</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php $i = 1;?>
                                            @foreach ($orders as $order)
                                            <tr>
                                                {{-- <td> {{ $i++ }} </td> --}}
                                                <td> {{ padzero($order->id) }} </td>
                                                <td> {{ $order->no_of_coins }} </td>
                                                <td> {{ $order->total_price }} </td>
                                                <td> {{ ucfirst($order->order_by) }} </td>
                                                <td> {{ $order->status }} </td>
                                                <td> {{ $order->paid ? 'Yes' : 'No'}} </td>
                                                <td><a class="btn btn-primary btn-xs" href="/order/{{ $order->id }}">View</a></td>
                                            </tr>
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
Atnumis &middot All Orders.
@stop

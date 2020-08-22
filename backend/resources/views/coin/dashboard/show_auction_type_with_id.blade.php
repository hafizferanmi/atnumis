@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            {{-- <div class="page-title">
                <div class="title_left">
                    <h3> All new coin order_inforesentation. </h3>
                </div>
            </div>
            <div class="clearfix"></div> --}}
            {{-- <div style="margin-top: 40px;">
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
                                <h2>{{ $type->type }} <small></small></h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <div class="x_content">
                                <div>
                                    <div class="col-md-12">
                                        <div style="margin-top: 10px;  margin-bottom: 10px ;">
                                            @if( Session::has('flash') )
                                            <div class="alert alert-success text-left">
                                                {{ Session::get('flash') }}
                                            </div>
                                            @endif
                                        </div>
                                        <div>
                                            <div style="margin: 20px 0;">
                                                <a class="btn btn-primary" href="/auction/{{ $type->id }}/{{ $type->slug }}/add"> Add Auction Coin </a>
                                                <a class="btn btn-success" href="/auction/{{ $type->id }}/{{ $type->slug }}/coins"> View Auction Coin </a>
                                                <a class="btn btn-info" href="/auction/{{ $type->id }}/{{ $type->slug }}/modify"> Edit Auction Details </a>
                                                {{-- <a class="btn btn-danger" href="/auction/add"> Delete Auction </a> --}}
                                            </div>
                                        </div>
                                        <div class="product-detail-wrap">
                                            <div>
                                                <table class="table table-responsive  table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td> <b>Auction Name</b> </td>
                                                            <td> {{ $type->type }} </td>
                                                        </tr>
                                                        <tr>
                                                            <td> <b>Auction starts</b> </td>
                                                            <td> {{ $type->starts_at }} </td>
                                                        </tr>
                                                        <tr>
                                                            <td> <b>Auction ends</b> </td>
                                                            <td> {{ $type->ends_at }} </td>
                                                        </tr>
                                                        <tr>
                                                            <td> <b>No of coins</b> </td>
                                                            <td> {{ $type->no_of_coins }} </td>
                                                        </tr>
                                                        <tr>
                                                            <td> <b>Images</b> </td>
                                                            <td> Image </td>
                                                        </tr>
                                                        <tr>
                                                            <td> <b>Created By</b> </td>
                                                            <td> {{ $type->created_by }} </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {{-- <div class="row">
                                            <div>
                                                <div class="x_content">
                                                    <h3>Auction coins under auction <b>"{{ $type->type }}"</b></h3>
                                                    <div>
                                                        <table class="table jambo_table table-bordered" cellspacing="0" rules="all" border="1" id="gvInventory" style="border-collapse:collapse;">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Image</th>
                                                                    <th scope="col">Inv. No.</th>
                                                                    <th scope="col">Description</th>
                                                                    <th scope="col">Option</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                @foreach ($coins as $coin)
                                                                <tr>
                                                                    <td>
                                                                        <a data-fancybox="images" data-caption="Preview" href="/storage/auction/{{ $coin->coin_pic }}"><img class="img img-responsive" src="/storage/auction/{{ $coin->coin_pic }}" style="width:200px;" /></a>
                                                                    </td>
                                                                    <td>{{ format_id($coin->id) }}</td>
                                                                    <td> {{ $coin->country . ', ' . $coin->region . '. ' . $coin->ruler . ', ' . $coin->date . '. ' . $coin->denomination . '( ' . $coin->metal . ', ' . $coin->diameter . 'mm, ' . $coin->weight . 'g, ' . $coin->die_axis . 'h), ' . $coin->mint . ', ' . $coin->struck_dates . '. ' . $coin->references . '. ' . $coin->grade }}</td>
                                                                    <td><a class="btn btn-primary btn-xs" href="/dashboard/coin/auction/modify/{{ $coin->id }}">Edit</a></td>
                                                                </tr>
                                                                @endforeach
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> --}}
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
    Auction Type. &middot Atnumis.
    @stop

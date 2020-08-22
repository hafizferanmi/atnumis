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
                            <h2>Auction bids <small></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                           Here are coins with their bid info.
                        </div>
                        <div class="x_content">
                            <div>
                                <table class="table jambo_table table-bordered" cellspacing="0" rules="all" border="1" id="gvInventory" style="border-collapse:collapse;">
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Inventory No.</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">No of Bids</th>
                                            <th scope="col">Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($coins as $coin)
                                            <tr>
                                                <td>
                                                    <a data-fancybox="images" data-caption="Preview" href="{{ asset('coin.user/source/images/auction/12') . '/' . $coin->coin_pic }}"><img class="img img-responsive" src="/{{ asset('coin.user/source/images/auction/12') . '/' . $coin->coin_pic }}" style="width:200px;" /></a>
                                                </td>
                                                <td>{{ $coin->id }}</td>
                                                <td> {{ $coin->country . ', ' . $coin->region . '. ' . $coin->ruler . ', ' . $coin->date . '. ' . $coin->denomination . '( ' . $coin->metal . ', ' . $coin->diameter . 'mm, ' . $coin->weight . 'g, ' . $coin->die_axis . 'h), ' . $coin->mint . ', ' . $coin->struck_dates . '. ' . $coin->references . '. ' . $coin->grade }}</td>
                                                <td>{{ $coin->no_of_bids }}</td>
                                                <td><a class="btn btn-primary btn-xs" href="/dashboard/coin/auction/bids/{{ $coin->id }}" target="">View Bids</a></td>
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
    Atnumis &middot All auction coins with bids.
@stop
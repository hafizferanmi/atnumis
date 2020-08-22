@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_content">
                                Here are all the auction coin listed.
                            </div>
                            <div class="x_content">
                                <div>
                                    <table class="table jambo_table table-bordered" cellspacing="0" rules="all" border="1" id="gvInventory" style="border-collapse:collapse;">
                                        <thead>
                                            <tr>
                                                <th scope="col">Image</th>
                                                <th scope="col">Inventory No.</th>
                                                <th scope="col">Description</th>
                                                {{-- <th scope="col">Created By</th> --}}
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
                                                {{-- <td>{{ $coin->created_by }}</td> --}}
                                                <td>
                                                    <a class="btn btn-primary btn-xs" href="/auction/coin/{{ $coin->id }}/modify"> <i class="fa fa-pen"></i> </a>
                                                    <a class="btn btn-success btn-xs" href="/auction/coin/{{ $coin->id }}/details"> <i class="fa fa-eye"></i> </a>
                                                    <a class="btn btn-info btn-xs" href="/auction/coin/{{ $coin->id }}/delete"> <i class="fa fa-trash"></i> </a>
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
Atnumis &middot All auction coins.
@stop

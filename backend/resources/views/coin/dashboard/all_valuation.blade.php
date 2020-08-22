@extends('coin.dashboard.master')


@section('content')


<div class="right_col" role="main">


<div id="ctl00_upDefault">
    <div class="">
       {{--  <div class="page-title">
            <div class="title_left">
                <h3> All new coin representation. </h3>
            </div>
        </div>
        <div class="clearfix"></div> --}}
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_planel">
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>All valuations. <small></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                      {{--   <div class="x_content">
                           Here are all new coin representation.
                        </div> --}}
                        <div class="x_content">
                            @if(count($vals) == 0)
                                <div>
                                    <h1>There are no valuations.</h1>
                                </div>
                            @else

                                <div>
                                    <table class="table jambo_table table-bordered" cellspacing="0" rules="all" border="1" id="gvInventory" style="border-collapse:collapse;">
                                        <thead>
                                            <tr>
                                                <th scope="col">S/N</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Message</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php $i=1?>
                                            @foreach ($vals as $val)
                                                <tr>
                                                    <td> {{ $i++ }} </td>  
                                                    <td> {{ $val->email }} </td>  
                                                    <td> {{ $val->message }} </td>  
                                                    <td><a class="btn btn-primary btn-xs" href="/valuation/{{ $val->id }}" >View</a></td>
                                                </tr>
                                                {{-- <p>This is user {{ $user->id }}</p> --}}
                                            @endforeach

                                        </tbody>
                                    </table>
                                </div>
                            @endif
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
    All Valuations &middot Atnumis.
@stop

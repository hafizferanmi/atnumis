@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            <div class="row">
                  <div style="margin-top: 70px;  margin-bottom: ;">
                    @if( Session::has('flash') )
                        <div class="alert alert-success text-left">
                            {{ Session::get('flash') }}
                        </div>
                    @endif
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>User auction bids. <small></small></h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                          
                            <div class="x_content">
                            	This is the div that shows something is coming on screen as fast as possible.
                            </div>
                        </div>
                    </div>

                     <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>Auction X <small></small></h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                          
                            <div class="x_content">
                            	This is the div that shows something is coming on screen as fast as possible.
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
Users bids. &middot Atnumis.
@stop

@extends('coin.dashboard.master')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <form method="post" enctype="multipart/form-data" action="/auction/modify" id="theForm" class="form-horizontal form-label-left" data-parsley-validate="">
        {{ csrf_field() }}
        <link rel="stylesheet" type="text/css" href="{{ asset('vendors/slick/slick.css') }}" />
        <script type="text/javascript" src="{{ asset('vendors/slick/slick.min.js') }}"></script>
        <div style="margin-top: 70px;">
            @if( Session::has('flash') )
            <div class="alert alert-info">
                {{ Session::get('flash') }}
            </div>
            @endif
        </div>
        <div id="ctl00_upDefault">
            <div class="row">
                <div class="col-sm-7 col-xs-12">
                    <!-- Right column panels -->
                    <div class="x_panel" id="pFinalized">
                        <div class="x_title">
                            <h2> Edit Auction <small><span id="sPercentage"></span></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_finalized">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="hidden" name="id" value="{{ $auction->id }}">
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Auction Name:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="auction_type" type="text" value="{{ $auction->type }}" id="" class="form-control" placeholder="Auction Name" />
                                    </div>
                                </div>
                                {{-- <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Cover Image:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="auction_img" type="file" class="form-control" />
                                    </div>
                                </div> --}}
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Auction Starts:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="auction_starts" type="date" value="{{ $auction->rawStartsAt() }}" id="" class="form-control" placeholder="Auction Starts" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Auction Ends:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        {{-- {{ $auction->rawEndsAt() }} --}}
                                        <input name="auction_ends" type="date" value="{{ $auction->rawEndsAt() }}" id="" class="form-control" placeholder="Auction Ends" />
                                    </div>
                                </div>
                                @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                                @endif
                                <div class="form-group">
                                    {{-- <div class="col-md-6 col-sm-6 col-xs-12"></div> --}}
                                    <div class="">
                                        <input type="submit" name="" value="Modify Auction" id="btnSetInventory" class="btn btn-success" />
                                        {{-- <input type="submit" name="btnCancel" value="Cancel" id="ctl00_btnCancel" class="btn btn-primary pull-right" /> --}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
<!-- /page content -->
@stop
@section('title')
Atnumis &middot Modify Auction "{{ $auction->type }}".
@stop

@extends('coin.dashboard.master')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <form method="post" enctype="multipart/form-data" action="{{ route('dashboard.coin.add.page.content') }}" id="theForm" class="form-horizontal form-label-left" data-parsley-validate="">
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
                <div class=" col-sm-10 col-xs-12">
                    <!-- Right column panels -->
                    <div class="x_panel" id="pFinalized">
                        <div class="x_title">
                            <h2> Modify page content <small><span id="sPercentage"></span></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_finalized">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Page title:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="title" type="text" readonly="true" value="{{$page->title}}" class="form-control" placeholder="Page title" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Page content:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <textarea name="content" rows="20" class="form-control">{{ $page->content }}</textarea>
                                    </div>
                                </div>
                                <input type="hidden" name="_id" value={{ $page->id }}>
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
                                        <input type="submit" name="" value="Modify page content" id="btnSetInventory" class="btn btn-success" />
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
Atnumis &middot Modify page content.
@stop

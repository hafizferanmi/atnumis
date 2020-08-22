@extends('coin.dashboard.master')


@section('content')


<div class="right_col" role="main">


<div id="ctl00_upDefault">
    <div class="">
       {{--  <div class="page-title">
            <div class="title_left">
                <h3> All new coin order_inforesentation. </h3>
            </div>
        </div>
        <div class="clearfix"></div> --}}

        {{--  <div style="margin-top: 40px;">
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
                            <h2> Auction winner   <small></small></h2>
                            <div class="nav navbar-right panel_toolbox" style="font-size: 20px;">
                                
                            </div>
                            <div class="clearfix"></div>
                        </div>
                       {{--  <div class="x_content">
                           Here are all new coin order_inforesentation.
                        </div> --}}
                        <div class="x_content">
                            <div>
                                <div class="col-md-12">
                                    <div style="margin-top: 10px;  margin-bottom: ;">
                                        @if( Session::has('flash') )
                                            <div class="alert alert-success text-left">
                                                {{ Session::get('flash') }}
                                            </div>
                                        @endif
                                    </div>
                                  
                            

                                    <div class="row">
                                        <div>
                                            <div class="x_content">
                                                <div>
                                                    <table class="table jambo_table table-bordered" cellspacing="0" rules="all" border="1" id="gvInventory" style="border-collapse:collapse;">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Image</th>
                                                                <th scope="col">Inv. No.</th>
                                                                <th scope="col">Description</th>
                                                                {{-- <th scope="col">Sortcode</th> --}}
                                                                <th scope="col">Option</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                   
                                                            
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
        </div>
    </div>
</div>


</div>




@stop

@section('title')
    Auction Winner. &middot Atnumis.
@stop

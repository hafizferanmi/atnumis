@extends('coin.dashboard.master')
@section('content')
<div class="right_col" role="main">
    <div id="ctl00_upDefault">
        <div class="">
            <div class="row">
            	 <div style="margin-top: 70px;">
		            @if( Session::has('flash') )
		                <div class="alert alert-info">
		                    {{ Session::get('flash') }}
		                </div>
		            @endif
		        </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_planel">
                        <div class="x_panel">
                            <div class="x_title">
                                <h2>Coin details. <small></small></h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <style type="text/css">
                            	.table > tr:first {
                            		font-weight: bold;
                            	}
                            </style>
                            {{-- <div class="x_content">
                                Here are all new coin representation.
                            </div> --}}
                            <div class="x_content">
                                <div>
                                    <div class="col-md-12">
                                        <table class="table table-bordered table-hover">
                                            <thead>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> Active </td>
                                                    <td> {{ $coin->active ? 'Yes' : 'No' }} </td>
                                                </tr>
                                                <tr>
                                                    <td> No of bids </td>
                                                    <td> {{ $coin->no_of_bids }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Categories </td>
                                                    <td> {{ $coin->category }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Country </td>
                                                    <td> {{ $coin->country }}</td>
                                                </tr>
                                                <tr>
                                                    <td> Region </td>
                                                    <td> {{ $coin->region }} </td>
                                                </tr>
                                                <tr>
                                                    <td> City </td>
                                                    <td> {{ $coin->city }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Ruler </td>
                                                    <td> {{ $coin->ruler }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Date </td>
                                                    <td> {{ $coin->date }}</td>
                                                </tr>
                                                <tr>
                                                    <td> Denomination </td>
                                                    <td> {{ $coin->denomination }}</td>
                                                </tr>
                                                <tr>
                                                    <td> Metal </td>
                                                    <td> {{ $coin->metal }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Diameter </td>
                                                    <td> {{ $coin->diameter }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Weight </td>
                                                    <td> {{ $coin->weight }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Die Axis </td>
                                                    <td> {{ $coin->die_axis }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Standard </td>
                                                    <td> {{ $coin->standard }} </td>
                                                </tr>

                                                <tr>
                                                    <td> Mint </td>
                                                    <td> {{ $coin->mint }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Struck Date </td>
                                                    <td> {{ $coin->struck_dates }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Obv Legend </td>
                                                    <td> {{ $coin->obv_legend }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Obv Desc </td>
                                                    <td> {{ $coin->obv_desc }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Rev Legend </td>
                                                    <td> {{ $coin->rev_legend }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Rev Desc </td>
                                                    <td> {{ $coin->rev_desc }} </td>
                                                </tr>
                                                <tr>
                                                    <td> References </td>
                                                    <td> {{ $coin->references }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Comment </td>
                                                    <td> {{ $coin->comments }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Defect </td>
                                                    <td> {{ $coin->defects }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Grade </td>
                                                    <td> {{ $coin->grade }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Pedigree </td>
                                                    <td> {{ $coin->pedigree }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Notes </td>
                                                    <td> {{ $coin->notes }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Check </td>
                                                    <td> {{ $coin->check }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Multiple Lot </td>
                                                    <td> {{ $coin->multiple_lot }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Header </td>
                                                    <td> {{ $coin->header }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Collection </td>
                                                    <td> {{ $coin->collection }} </td>
                                                </tr>

                                                <tr>
                                                    <td> Starting Price </td>
                                                    <td> {{ $coin->starting_price }} </td>
                                                </tr>
                                                <tr>
                                                    <td> Bid Increment </td>
                                                    <td> {{ $coin->bid_increment }} </td>
                                                </tr>
                                                 <tr>
                                                    <td> Auction Start </td>
                                                    <td> {{ $coin->formatAuctionStart() }} </td>
                                                </tr>
                                                 <tr>
                                                    <td> Auction Ends </td>
                                                    <td> {{ $coin->formatAuctionEnd() }} </td>
                                                </tr>
                                                 <tr>
                                                    <td> Auction Name </td>
                                                    <td> {{ $coin->auction_type }} </td>
                                                </tr>
                                               {{--   <tr>
                                                    <td>  </td>
                                                    <td> {{ $coin-> }} </td>
                                                </tr>
                                                 <tr>
                                                    <td>  </td>
                                                    <td> {{ $coin-> }} </td>
                                                </tr> --}}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                @if($coin->active)
                                	<div class="btn btn-primary">
                                    	<a href="/auction/coin/{{ $coin->id }}/withdraw" style="color: white"> Withdraw Coin </a>
                                	</div>
                                @else
                                	<div class="btn btn-primary">
                                    	<a href="/auction/coin/{{ $coin->id }}/unwithdraw" style="color: white"> UnWithdraw Coin </a>
                                	</div>
                                @endif

                                
                                <div class="btn btn-success">
                                    <a href="/auction/coin/{{ $coin->id }}/modify" style="color: white"> Edit Coin Details </a>
                                </div>
                                <div class="btn btn-danger">
                                    <a href="/auction/coin/{{ $coin->id }}/delete" style="color: white"> Delete Coin </a>
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
Auction description &middot Atnumis.
@stop

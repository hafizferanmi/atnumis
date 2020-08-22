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
                            <h2>Consign description. <small></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        
                        <div class="x_content">
                            <div>
                                <div class="col-md-12">
                                    <div style="margin-top: 40px;  margin-bottom: 30px;">
                                        @if( Session::has('flash') )
                                            <div class="alert alert-success text-left">
                                                {{ Session::get('flash') }}
                                            </div>
                                        @endif
                                    </div>
                                    <?php $imgs = explode(',', $consign->images) ?>


                                   
                                    <div class="product-detail-wrap">
                                        <h3 class="mb-20">Email</h3>
                                        <h4 class="mb-20">{{ $consign->email }}</h4>
                                        <h3 style="margin-top: 30px;" class="mb-20">Message</h3>
                                        <p class="mb-50"> {{ $consign->message }} </p>
                                        <h3 style="margin-top: 30px;" class="mb-20">Consign Coin image(s)</h3>
                                        <div class="image" style="margin-top: 30px;">
                                            @foreach($imgs as $img)
                                                <span>
                                                    <img width="300px;" height="200px;" src="/storage/consign/{{ $img }}" class="img-rounded" />
                                                </span>
                                            @endforeach
                                        
                                        </div>
                                        <h3 style="margin-top: 30px;" class="mb-20">Status</h3>
                                        <p class="mb-50"> {{ $consign->ack ? 'Acknowledged' : 'Not acknowledged' }} </p>

                                        @if($consign->ack)
                                            <h3 style="margin-top: 30px;" class="mb-20">Acknowledged By</h3>
                                            <p class="mb-50"> {{ ucfirst($consign->ack_by) }} </p>
                                        @endif

                                        <form method="post" action="/dashboard/coin/ack/consign" style="margin-top: 30px;">
                                            {{ csrf_field() }}
                                            <input class="" type="hidden" value="{{ $consign->id }}" name="consign_id" />
                                            <div class="btn-group mr-10">
                                                <button class="btn btn-{{ $consign->ack ? 'danger' : 'primary' }} btn btn-sm btn-anim"><span class="btn-text">{{ !$consign->ack ? 'Acknowledge »' : 'Unacknowledge »' }} </span></button>
                                            </div>
                                        </form>
                                       
                                       
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
    Consign description &middot Atnumis.
@stop

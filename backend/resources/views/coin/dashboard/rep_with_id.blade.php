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
                            <h2>Representation description. <small></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                       {{--  <div class="x_content">
                           Here are all new coin representation.
                        </div> --}}
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
                                    <div class="product-detail-wrap">
                                        <h3 class="mb-20">Email</h3>
                                        <h4 class="mb-20">{{ $rep->email }}</h4>
                                        <h3 style="margin-top: 30px;" class="mb-20">Message</h3>
                                        <p class="mb-50"> {{ $rep->message }} </p>
                                        <h3 style="margin-top: 30px;" class="mb-20">Status</h3>
                                        <p class="mb-50"> {{ $rep->ack ? 'Acknowledged' : 'Not acknowledged' }} </p>

                                        @if($rep->ack)
                                            <h3 style="margin-top: 30px;" class="mb-20">Acknowledged By</h3>
                                            <p class="mb-50"> {{ ucfirst($rep->ack_by) }} </p>
                                        @endif

                                        <form method="post" action="/dashboard/coin/ack/rep" style="margin-top: 30px;">
                                            {{ csrf_field() }}
                                            <input class="" type="hidden" value="{{ $rep->id }}" name="rep_id" />
                                            <div class="btn-group mr-10">
                                                <button class="btn btn-{{ $rep->ack ? 'danger' : 'primary' }} btn btn-sm btn-anim"><span class="btn-text">{{ !$rep->ack ? 'Acknowledge »' : 'Unacknowledge »' }} </span></button>
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
    Rep description &middot Atnumis.
@stop

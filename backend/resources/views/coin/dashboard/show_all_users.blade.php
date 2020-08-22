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
                            <h2>All Users <small></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                      
                        <div class="x_content">
                            <div>
                                <table class="table jambo_table table-bordered" cellspacing="0" rules="all" border="1" id="gvInventory" style="border-collapse:collapse;">
                                    <thead>
                                        <tr>
                                            <th> S/N </th>

                                            <th> Username </th>
                                            <th> Fullname </th>
                                            <th> Email </th>
                                            <th> Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php $i=1?>  
                                        @foreach ($users as $user)
                                            <tr>
                                                <td> {{ $i++ }} </td> 
                                                <td>{{ $user->username }}</td>
                                                <td> {{ $user->name }} </td>
                                                <td> {{ $user->email }} </td>
                                                <td>
                                                    <a class="btn btn-primary btn-xs" href="/users/view/{{ $user->id }}" >View </a>
                                                    {{-- <a class="btn btn-primary btn-xs" href="/users/block/{{ $user->id }}" >Restrict </a> --}}
                                                    <a class="btn btn-primary btn-xs" href="/users/edit/{{ $user->id }}" >Edit </a>
                                                    <a class="btn btn-primary btn-xs" href="/users/delete/{{ $user->id }}" >Delete </a>
                                                </td>
                                            </tr>
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
    Atnumis &middot All Users.
@stop
@extends('coin.dashboard.master')


@section('content')


<div class="right_col" role="main">


<div id="">
    <div class="">
      
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_planel">
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>All page content. <small></small></h2>
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
                                            <th scope="col">S/N</th>
                                            <th scope="col">Page title</th>
                                            <th scope="col">Page Content</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php $i=1?>
                                        @foreach ($pages as $page)
                                            <tr>
                                                <td> {{ $i++ }} </td>  
                                                <td> {{ $page->title }} </td>  
                                                <td> {{ $page->content }} </td>  
                                                <td><a class="btn btn-primary btn-xs" href="/page-content/{{ $page->id }}?page={{ $page->slug }}" >View</a></td>
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
    Atnumis &middot All page content.
@stop

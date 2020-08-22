<!DOCTYPE html>
<html lang="en">

<!-- insert header here -->
 @include('coin.dashboard.inc.head')

<body class="nav-md">
    <noscript>
        <div style="position: fixed; top: 0px; left: 0px; z-index: 3000; height: 100%; width: 100%; background-color: #FFFFFF">
            <p style="margin-left: 10px">
                This site requires JavaScript.
                <br />
                Please enable JavaScript.
                <br />
                <br />
                <a href="http://www.enable-javascript.com/">http://www.enable-javascript.com/</a>
            </p>
        </div>
    </noscript>
    <div class="container body">
        <div class="main_container">

            <!-- insert sidebar here -->
            @include('coin.dashboard.inc.sidebar')

                <!-- top navigation -->
                <!-- insert to navigation here -->
                @include('coin.dashboard.inc.header')


                <!-- /top navigation -->


                <!-- page content -->

                <!-- insert page content here -->
                 @yield('content')


                <!-- /page content -->


                <!-- footer content -->
                <!-- insert footer  here -->
                 @include('coin.dashboard.inc.footer')
                <!-- /footer content -->
            </div>
        </div>
        <div class="modal-backdrop fade in" style="display: none" id="loading-indicator">
            <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style="position: absolute; top: 50%; left: 50%;"></i>
        </div>
        <!-- Custom Theme Scripts -->
        <script src="{{ asset('coin.dashboard/backoffice/js/custom.min.js') }}"></script>
</body>

</html>
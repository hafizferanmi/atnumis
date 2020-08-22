

<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title id="tTitle"> Login - Atnumis Admin </title>

    <!-- Bootstrap -->
    <link href="{{ asset('coin.dashboard/vendors/bootstrap/dist/css/bootstrap.min1e8e.css?v=636841202277339218') }}" rel="stylesheet" />
    <!-- Font Awesome -->
    <link href="{{ asset('coin.dashboard/vendors/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">
    <!-- Animate.css -->
    <link href="{{ asset('coin.dashboard/vendors/animate.css/animate.min.css') }}" rel="stylesheet">
    <!-- iCheck -->
    <link href="{{ asset('coin.dashboard/vendors/iCheck/skins/flat/green.css') }}" rel="stylesheet" />
    <!-- Custom Theme Style -->
    <link href="{{ asset('coin.dashboard/backoffice/css/custom.min.css') }}" rel="stylesheet">

    <!-- jQuery -->
    <script src="{{ asset('coin.dashboard/vendors/jquery/dist/jquery.min.js') }}"></script>
    <!-- Bootstrap -->
    <script src="{{ asset('coin.dashboard/vendors/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    <!-- iCheck -->
    <script src="{{ asset('coin.dashboard/vendors/iCheck/icheck.min.js') }}"></script>

</head>
<script>
    $(document).ready(function () {
        if ($("input.flat")[0]) {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        }
    });
</script>
<body class="login">
    <div>
        <a class="hiddenanchor" id="signin"></a>
        <div class="login_wrapper">
            <div class="animate form login_form">
                <section class="login_content">
                    <form method="post" action="login" id="theForm">

                        <h1>Atnumis Admin Login</h1>

                        <div style="margin-top: 40px;">
                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                        </div>

                        <div style="margin-top: 40px;">
                            @if( Session::has('flash') )
                                <div class="alert alert-info">
                                    {{ Session::get('flash') }}
                                </div>
                            @endif
                        </div>

                        {{ csrf_field() }}


                        <div>
                            <input name="username" type="text" id="txtUsername" class="form-control" placeholder="Username" required="" />
                        </div>
                        <div>
                            <input name="password" type="password" id="txtPassword" class="form-control" placeholder="Password" required="" />
                        </div>
                        <div>
                            <p>
                                <input type="submit" name="btnLogin" value="Log in" id="btnLogin" class="btn btn-success pull-right" />
                            </p>
                        </div>
                        <div class="clearfix"></div>

                        <div id="divReturn" class="hidden">Username or password incorrect.</div>

                        <br />

                        <div class="separator">
                            <div class="clearfix"></div>
                            <br />
                            <div>
                                <p>©2019 All Rights Reserved. Atnumis</p>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</body>

</html>

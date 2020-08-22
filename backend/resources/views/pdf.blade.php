<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice - Order</title>
    <link href="{{ asset('coin.user/source/css/bootstrap.min.css') }}" rel="stylesheet" />

	<style type="text/css">
	    body {
	    background: whitesmoke;
	    margin-top: 20px;
	    margin-bottom: 20px;
	}
	</style>
</head>





<body>
<div class="container">
    <div class="row">
        <div class="col-md-9 col-md-offset-2" style="background: white">
            <div class="card">
                <div class="card-body p-0">
                    <div class="row p-5">
                        <div class="col-md-6">
                            <img src="{{ asset('coin.user/source/images/l.jpg') }}" style="height: 60px">
                        </div>

                        <?php 
	                        $zero = ['0', '00', '000'];
	                        $a = str_split($data['order_id']);
	                        if (count($a) < 4) {
	                            $less = 4 - count($a);
	                            $order_id = $zero[$less - 1] . $data['order_id'];
	                        }else{
	                            $order_id = $data['order_id'];
	                        }
	                       
	                    ?>

                        <div class="col-md-6 text-right">
                            <p class="font-weight-bold mb-1">Invoice: #{{ $order_id }}</p>
                            <p class="text-muted">Due to: 4 Dec, 2019</p>
                        </div>
                    </div>

                    <hr class="my-5">

                    <div class="row pb-5 p-5">
                        <div class="col-md-6">
                        	<?php $user = $data['user']?>
                            <p class="font-weight-bold mb-4">Client Information</p>
                            <p class="mb-1">{{ $user->name }}</p>
                            <p>{{ $user->company }}</p>
                            <p class="mb-1">{{ $user->state }}, {{ $user->country }}</p>
                            <p class="mb-1">{{ $user->zip }}</p>
                        </div>

                        <div class="col-md-6 text-right">
                            <p class="font-weight-bold mb-4">Payment Details</p>
                            <p class="mb-1"><span class="text-muted">VAT: </span> 1425782</p>
                            <p class="mb-1"><span class="text-muted">VAT ID: </span> 10253642</p>
                            <p class="mb-1"><span class="text-muted">Payment Type: </span> Root</p>
                            <p class="mb-1"><span class="text-muted">Name: </span> John Doe</p>
                        </div>
                    </div>

                    <div class="row p-5">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                                <thead style="background: whitesmoke;">
                                    <tr>
                                        <th class="border-0 text-uppercase small font-weight-bold">ID</th>
                                        <th class="border-0 text-uppercase small font-weight-bold">Coin</th>
                                        <th class="border-0 text-uppercase small font-weight-bold">Quantity</th>
                                        <th class="border-0 text-uppercase small font-weight-bold">Unit Cost</th>
                                        <th class="border-0 text-uppercase small font-weight-bold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                	<?php $i=1?>
                                	<?php $total = 0 ?>
                                	@foreach($data['orders'] as $order)
                                	<?php $total += $order->price * $order->quantity ?>
                                    <tr>
                                        <td>{{ $i++ }}</td>
                                        <td> {{ $order->country . ', ' . $order->region . '. ' . $order->ruler . ', ' . $order->date . '. ' }}  </td>
                                        <td>{{ $order->quantity }}</td>
                                        <td>{{ $order->price }}</td>
                                        <td>{{ $order->quantity * $order->price }}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="d-flex flex-row-reverse bg-dark text-white p-4">
                        <div class="py-3 px-5 text-right">
                            <div class="mb-2"> Total</div>
                            <div class="h2 font-weight-light">${{ $total }} </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


</div>
</body>
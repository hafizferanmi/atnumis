<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\CardInfo;
use App\BillingInfo;
use App\OrdersInfo;
use App\Order;
use App\Coin;
use App\User;
use DB;
use PDF;
use Storage;

class CheckoutController extends Controller
{
    public function show_checkout_page(){
    	// if(!Session::get('logged_in') || !Session::get('username')){
    	// 	return redirect('/login?dest=checkout');
    	// }else if (count(session('cart')) == 0) {
    	// 	return redirect('/buy');
    	// }

    	return view('coin.user.checkout');
    }

    public function apiCheckout(Request $req){
        $cartCoins = $req['items'];
        $username = $req['_u'];

        $total = 0;
        foreach($cartCoins as $id => $details){
            $total += $details['price'] * $details['qty'];
        }

        $orderinfo = new OrdersInfo;
        $orderinfo->no_of_coins = count($cartCoins);
        $orderinfo->total_price = $total;
        $orderinfo->order_by = $username;
        $orderinfo->status = 'new';
        $orderinfo->paid = 0;

        if($orderinfo->save()){
            foreach($cartCoins as $details){
                $order = new Order;
                $order->coin_id = $details['id'];
                $order->qty = $details['qty'];
                $order->orders_info_id = $orderinfo->id;
                $order->save();

                $coin = Coin::find($details['id']);
                $coin->quantity -= $details['qty'];
                $coin->save();
            }
            return response()->json(returnJson( false, 'Checkout Successful.' ));
        }else{
            return response()->json(returnJson( true, 'Error Occured.' ));
        }

        


        // return response()->json($cartCoins);
    }


    public function checkOut(Request $req){
    	// dd($req);

   		$this->validate($req, [
            'card_type' => 'required',
            'credit_card_no' => 'required',
            'cvv' => 'required',
            'exp_month' => 'required',
            'exp_year' => 'required'
        ]);

        $total = 0;
        foreach(session('cart') as $id => $details){
        	$total += $details['price'] * $details['quantity'];
        }
           

        $orderinfo = new OrdersInfo;
        $orderinfo->no_of_coins = count(session('cart'));
        $orderinfo->total_price = $total;
        $orderinfo->order_by = Session::get('username');
        $orderinfo->status = 0; //pending
        $orderinfo->paid = 0;

        if($orderinfo->save()){
        	$card = new CardInfo;
        	$card->card_type = $req->card_type;
	        $card->credit_card_no = $req->credit_card_no;
	        $card->cvv = $req->cvv;
	        $card->exp_month = $req->exp_month;
	        $card->exp_year = $req->exp_year;
	        $card->user = Session::get('username');
	        $card->order_id = $orderinfo->id;

	        if ($card->save()) {

	        	foreach(session('cart') as $id => $details){
	        		$order = new Order;
	        		$order->coin_id = $details['id'];
		        	$order->quantity = $details['quantity'];
		        	$order->orders_info_id = $orderinfo->id;
		        	$order->save();

		        	$coin = Coin::find($details['id']);
		        	$coin->quantity -= $details['quantity'];
		        	$coin->save();

		        }


	        	$cart = session()->get('cart');
    			session()->remove('cart');
	        	Session::flash('flash', 'Item has been ordered successfully');
            	return redirect('/checkout/success');
	        }else{
	        	Session::flash('flash', 'Error occured, try again later');
            	return redirect('')->back();
	        }
        }else{
        	Session::flash('flash', 'Error occured, try again later');
            return redirect()->back();
        }

    }

    public function genereteOrderPdf(Request $request, $order_id){
        $order_info = OrdersInfo::findOrFail($order_id);
        $order_username = $order_info->order_by;
        $order_info_id = $order_info->id;

        // if ($order_username != Session::get('username')) {
        //     abort(404);
        // }


        $user = User::where('username', $order_username)->first();

        $orders = DB::table('orders_info')
            ->join('orders', 'orders_info.id', '=', 'orders.orders_info_id')
            ->join('coins', 'coins.id', '=', 'orders.coin_id')
            ->where('orders_info_id', $order_info_id)
            // ->select('order.quantity', as, 'qty')
            ->get();

        $orderId = $order_id;


        $data = ['user' => $user, 'orders' => $orders, 'order_id' => $orderId];
        // dd($data);
        view()->share('data',$data);

        if($request->has('download')) {
            $pdf = PDF::loadView('pdf');
            $filename = 'invoice-'. $orderId .'_'. $user->company .'.pdf';
            return $pdf->download($filename);
        }
        // return route()->back();
        return view('pdf');
    }



    public function checkPdf1(){
        // $pdf = App::make('snappy.pdf.wrapper');
        // The view data.
        $users = DB::table("users")->get();
        // view()->share('users',$users);
        $data = ['users' => $users];

        // Generate the PDF output.
        $output = PDF::loadView('pdf', $data)->output();

        // The file name.
        $name = 'invoice-order-#'. $orderId .'.pdf';
        $path = '/uploads/invoice/';
        $fullpath = $path . $name;

        // Get our disk to store the PDF in.
        $disk = Storage::disk('public');

        // Save the file with the PDF output.
        if ($disk->put($fullpath, $output)) {
            // Successfully stored. Return the full path.
            return $disk->path($fullpath);
        }

    }

    public function checkPdf(Request $request){
        $users = DB::table("users")->get();
        view()->share('users',$users);

        // if($request->has('download')) {
            // pass view file
            $pdf = PDF::loadView('pdf');
            // download pdf
            return $pdf->download('userlist.pdf');
        // }
        return view('pdf');
    }

   
}

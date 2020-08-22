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

class OrdersController extends Controller
{

	public function showAllOrders(){
    	$orders = OrdersInfo::all();
    	return view('coin.dashboard.all_orders', compact('orders'));
    }

    public function showNewOrder(){
    	$orders = OrdersInfo::whereStatus('new')->get();
    	return view('coin.dashboard.all_new_orders', compact('orders'));
    }

    public function showOrderWithId($id){
    	$order_info = OrdersInfo::findOrFail($id);
    	$order_username = $order_info->order_by;
    	$order_info_id = $order_info->id;


    	$user = User::where('username', $order_username)->first();

        $orders = DB::table('orders_info')
            ->join('orders', 'orders_info.id', '=', 'orders.orders_info_id')
            ->join('coins', 'coins.id', '=', 'orders.coin_id')
            ->where('orders_info_id', $order_info_id)
            // ->select('orders.quantity', 'as', 'qty')
            ->get();

        // dd($order_info);
        // dd($orders);

    	return view('coin.dashboard.show_order_with_id', compact('orders', 'order_info', 'user'));
    }

    public function showUserOrders($username){
        $orders = OrdersInfo::where('order_by', $username)->get();
        return view('coin.dashboard.user_with_orders', compact('orders', 'username'));
    }

    public function changeOrderStatus(Request $req){
        $this->validate($req, [
            '_id' => 'required',
            '_status' => 'required',
        ]);

        $id = $req->_id;
        $status = $req->_status;

        $order = OrdersInfo::find($id);
        $order->status = $status;

        if ($order->save()) {
            Session::flash('order-status-flash', 'Order status changed successfully!');
            return redirect()->back();
        }else{
            Session::flash('order-status-flash', 'Error Occured, order status could not be changed!');
            return redirect()->back();
        }
        

    }

    


}

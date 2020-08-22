<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AuctionCoin;
use App\AuctionType;
use App\HighestBidder;
use DB;
use App\AuctionOrders;
use Session;
use App\User;

class AuctionOrdersController extends Controller
{
	 public function noOfCoins($username, $coinIds){
        //no of time username won in this coins
        $no_of_coins = HighestBidder::where('username', $username)->whereIn('coin_id', $coinIds)->count();
        return $no_of_coins;
    }

    public function highestBidderOrderDetails($username, $auctiontypeCoinIds){
    	$no_of_coins = HighestBidder::where('username', $username)->whereIn('coin_id', $auctiontypeCoinIds)->get();
    	dd($no_of_coins);
    }
    
    public function auctionCoinIds($id){
        $coins = AuctionCoin::select('id')->where('auction_type', $id)->get();
        $ids = [];
        foreach($coins as $coin){
            $ids[] = $coin['id'];
        }
        return $ids;
    }

    public function generateAuctionOrder($auctionId, $auctionSlug){
    	// dd($auctionId);
    	$auction = AuctionType::find($auctionId);
    	if($auction->order_generated){
    		Session::flash('flash', 'Order has already been generated');
    		return redirect()->back();
    	}


        $coinIds = $this->auctionCoinIds($auctionId); // coin id of this auctoin
        // dd($coinIds);

        // $highest_bidder_details = DB::table('highest_bidder')->select(['username', 'coin_id'])->whereIn('coin_id', $coinIds)->groupBy(['usernme, coin_id'])->get();
        $highest_bidder_details = DB::table('highest_bidder')->select('username')->whereIn('coin_id', $coinIds)->groupBy('username')->get();
        // dd($highest_bidder_details);
        // $highest_bidder_username = $highest_bidder_details->username;
        // dd($highest_bidder_username);

        $highest_bidders = [];
        $total = 0;
        $coinIds = [];
        foreach ($highest_bidder_details as $highest_bidder) {
            $order = new AuctionOrders;
            $order->auction_id = $auctionId;
            $order->order_by = $highest_bidder->username;
            $order->no_of_coins = $this->noOfCoins($highest_bidder->username, $coinIds);
            $order->total_price = $this->calculateOrderTotal($highest_bidder->username, $coinIds);
            $order->coin_id = $this->getWonCoin($highest_bidder->username, $coinIds);
            $order->save();
        }

    	$auction = AuctionType::find($auctionId);
    	$auction->order_generated = true;
    	if($auction->save()){
    		Session::flash('flash', 'Order has been generated successfully.');
			return redirect()->back();
    	}else{
    		Session::flash('flash', 'Error Occured. Try again later.');
			return redirect()->back();
    	}

    }

    public function calculateOrderTotal($username, $coinIds){
    	$coins = HighestBidder::select('hammer_price')->where('username', $username)->whereIn('coin_id', $coinIds)->get();
    	$total = 0;
        foreach($coins as $coin){
            $total += (int)$coin['hammer_price'];
        }
        return $total;
    }

    public function getWonCoin($username, $coinIds){
    	$coins = HighestBidder::select('coin_id')->where('username', $username)->whereIn('coin_id', $coinIds)->get();
    	$ids = [];
        foreach($coins as $coin){
            $ids[] = $coin['id'];
        }
        return implode(',', $ids);
    }

    public function showAuctionOrders($auctionId, $auctionSlug){
    	$orders = AuctionOrders::where('auction_id', $auctionId)->get();
    	return view('coin.dashboard.auction_orders', compact('orders', 'auctionId','auctionSlug'));
    }

    public function showAuctionOrdersDetails($auctionId, $auctionSlug, $user){
    	$coinIds = $this->auctionCoinIds($auctionId);
    	$order_info = AuctionOrders::where(['auction_id' => $auctionId, 'order_by' => $user])->first(); //order details
    	$orders = HighestBidder::where('username', $user)->whereIn('coin_id', $coinIds)->get(); //coins won
    	$user = User::where('username', $user)->first();

    	return view('coin.dashboard.auction_orders_desc', compact('order_info', 'orders', 'user'));
    }

    public function changeOrderStatus(Request $req){
        $this->validate($req, [
            '_id' => 'required',
            '_status' => 'required',
        ]);

        $id = $req->_id;
        $status = $req->_status;

        $order = AuctionOrders::find($id);
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

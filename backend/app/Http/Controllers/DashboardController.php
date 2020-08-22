<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AuctionCoin;
use App\Consign;
use App\CoinRep;
use App\Coin;
use App\OrdersInfo;

class DashboardController extends Controller
{
    public function showCoinDashboard(){
        $auction_count = AuctionCoin::count();
        $selling_count = Coin::count();

        $rep_ack = CoinRep::where('ack', 1)->count();
        $rep_not_ack = CoinRep::where('ack', 0)->count();

        //orders
        $new_orders = OrdersInfo::whereStatus('new')->count();
        $all_orders = OrdersInfo::all()->count();

        //consign details
        $consign_ack = Consign::where('ack', 1)->count();
        $consign_not_ack = Consign::where('ack', 0)->count();

        $data = ['rep_ack' => $rep_ack, 'rep_not_ack' => $rep_not_ack, 'auction_count' => $auction_count, 'selling_count' => $selling_count, 'consign_ack' => $consign_ack, 'consign_not_ack'=> $consign_not_ack, 'new_orders' => $new_orders, 'all_orders' => $all_orders];

        // dd($data);

        return view('coin.dashboard.index', compact('data'));

    }
}

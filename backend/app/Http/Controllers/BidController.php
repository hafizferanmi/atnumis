<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bids;
use App\AuctionCoin;
use DB;
use App\HighestBidder;
use Carbon\Carbon;


class BidController extends Controller
{


	public function show_all_auctions(){
        $coins = DB::table('coin_auction')->orderBy('id', 'desc')->get();
        // dd($coins);
        return view('coin.dashboard.auction_coin_with_bids', compact('coins'));
	}

    public function show_all_bids_with_id($id){

        $coin = DB::table('coin_auction')->where('id', $id)->orderBy('id', 'desc')->first();
        // dd($coins);

        $bids = Bids::where('auction_id', $id)->orderBy('ammount', 'desc')->get();
        return view('coin.dashboard.bids', compact('bids', 'coin'));
    }
	
    public function see_all_bids(){
    	$bids = Bids::all();
    	return view('all-bids', compact('bids'));
    }


    public function placeBidOnCoin(Request $req){
        // $this->validate($req, [
        //     'username' => 'required',
        //     'ammount' => 'required',
        //     'coin_id' => 'required'
        // ]);
        $coin_id = $req->coin_id;
        $coin_bid_ammount = $req->ammount;
        $coin_bid_username = $req->username;

        if (!isset($coin_id)  || !isset($coin_bid_ammount)  || !isset($coin_bid_username)) {
            return $this->error(true, 9, 'inValidData', 'Error occured, trying to by-pass the system.');
        }

        // return response()->json(['username' => $coin_id, 'password' => $coin_bid_ammount]);
        

        //put exceeded value in here

        $coin_info = AuctionCoin::where('id', $coin_id)->first();

        if(!$coin_info){
            return $this->error(true, 9, 'inValidData', 'Invalid data sent.');
        }


        $a = $coin_info->auction_ends;
        $b = explode(' ', $a);
        $c = explode('-', $b[0]);
        $d = explode(':', $b[1]);

        // $first = Carbon::create($c[0], $c[1], $c[2], $d[0], $d[1], $d[2]);

        $auction_ends = Carbon::create($c[0], $c[1], $c[2], $d[0], $d[1], $d[2]);

        

        if ($auction_ends->isPast()) {
            return $this->error(true, 8, 'inValidTiming', 'Auction time elapsed.');
        }

        $coin_starting_price = $coin_info->starting_price;

        //under minimum
        if($coin_bid_ammount < $coin_starting_price){
            return $this->error(true, 1, 'underMinimumPrice', 'Under Minimum bid price');
        }

        $highest_bid = HighestBidder::where('coin_id', $coin_id)->first();
        $hammer_price = $highest_bid->hammer_price;
        $minimum_next_bid = $hammer_price + $coin_info->bid_increment;
        $highest_bidder_username = $highest_bid->username;
        
        if ($hammer_price !== 0) {

            if ($coin_bid_ammount <= $hammer_price) {
                if ($highest_bidder_username == $coin_bid_username) {
                    return $this->error(true, 2, 'pastBidGreater', 'Your previous bid is greater');
                }else{
                    return $this->error(true, 3, 'outBidded', 'You have been outBidded');
                }
            }

            if ($coin_bid_ammount < $minimum_next_bid) {
                return $this->error(true, 5, 'bidIncrement', 'Less than bid increment');
            }

        }

        //offset and credit limit exceeded;

        //after all validations passed. Place a bid successfully.
        $bid = new Bids();
        $bid->user = $req['username'];
        $bid->ammount = $req['ammount'];
        $bid->auction_id = $req['coin_id'];
        // $bid->save();



        if($bid->save()){

            HighestBidder::where('coin_id', $coin_id)
                ->update(['hammer_price' => $bid->ammount, 'username' => $bid->user]);


            $auction = AuctionCoin::find($req->coin_id);
            $auction->no_of_bids++;
            $auction->current_bid = $req['ammount'];
            if($auction->save()){
                return $this->error(false, 4, 'bidCreated', 'Bid created successfully', $auction->no_of_bids);
            }else{
                return $this->error(true, 7, 'bidIncrementFailed', 'Error Occured');
            }
            
        }else{
            return $this->error(true, 6, 'bidFailed', 'Error Occured');
        }

       
    }

    private function error($status, $no, $type, $msg, $count = 0){
        return response()->json([
            'error' => $status,
            'error_no' => $no,
            'type' => $type,
            'message' => $msg,
            'count' => $count
        ]);
    }

    public function noOfCoins($username, $coinIds){
        //no of time username won in this coins
        $no_of_coins = HighestBidder::where('username', $username)->whereIn('coin_id', $coinIds)->count();
        return $no_of_coins;
    }

    public function auctionCoinIds($id){
        $coins = AuctionCoin::select('id')->where('auction_type', $id)->get();
        $ids = [];
        foreach($coins as $coin){
            $ids[] = $coin['id'];
        }
        return $ids;
    }

    public function showAllHighestBidderWithUsers($auctionId, $auctionSlug){
        $coinIds = $this->auctionCoinIds($auctionId);

        $highest_bidders_username = DB::table('highest_bidder')->select('username')->whereIn('coin_id', $coinIds)->groupBy('username')->get();

        $highest_bidders = [];
        foreach ($highest_bidders_username as $highest_bidder) {
            $highest_bidder_details = [
                'username' => $highest_bidder->username,
                'no_of_coins' => $this->noOfCoins($highest_bidder->username, $coinIds),
            ];
            array_push($highest_bidders, $highest_bidder_details);
        }

        // dd($highest_bidders);
        return view('coin.dashboard.highest_bidder_with_user', compact('highest_bidders', 'auctionId', 'auctionSlug'));

    }

    public function showHighestBidderDetails($id, $slug, $user){
        $coinIds = $this->auctionCoinIds($id);
        dd($coinIds);
    }

    public function showAllHighestBidder($id){
        // $highest_bidders = HighestBidder::all();
        $coins = AuctionCoin::select('id')->where('auction_type', $id)->get();
        $ids = [];
        foreach($coins as $coin){
            $ids[] = $coin['id'];
        }
        // return $ids;

        $highest_bidders = DB::table('highest_bidder')
            ->join('coin_auction', 'highest_bidder.coin_id', '=', 'coin_auction.id')
            ->whereIn('highest_bidder.coin_id', $ids)

            // ->join('users', 'highest_bidder.username', '=', 'users.username')
            // ->where()
            ->get();

        // dd($highest_bidders);

        return view('coin.dashboard.highest_bidder', compact('highest_bidders'));
    }

    public function show_all_highest_bidder_desc($id){
        $highest_bidder = HighestBidder::findOrFail($id);

        $highest_bidder = DB::table('highest_bidder')
            ->join('coin_auction', 'highest_bidder.coin_id', '=', 'coin_auction.id')
            ->join('users', 'highest_bidder.username', '=', 'users.username')
            ->where('highest_bidder.id', $id)
            ->first();
        return view('coin.dashboard.highest_bidder_desc', compact('highest_bidder'));
    }


}

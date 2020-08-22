<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AuctionType;
use App\Bids;
use App\AuctionCoin;
use App\HighestBidder;
use Carbon\Carbon;
use DB;
use App\User;

class AuctionController extends Controller
{
    public function currentAuction(){
    	$currentAuction = AuctionType::where('active', true)->first();
    	$type = 'Current Auction';
    	return view('', compact('currentAuction', 'type'));
    }

    public function userUpcomingAuctions(){
        $upcomingAuctions = AuctionType::where('ends_at', '>', Carbon::today()->toDateString())->get();
        return response()->json($upcomingAuctions);

    }

    public function userPastAuctions(){
        $past = [];
        $pastAuctions = AuctionType::where('ends_at', '<', Carbon::today()->toDateString())->get();
        foreach ($pastAuctions as $auction) {
            $emptyBidsCount = AuctionCoin::where(['auction_type' => $auction->id, 'no_of_bids' => 0])->count();
            if ($emptyBidsCount > 0) {
                $unsold = true;
            }else{
                $unsold = false;
            }

            $singlePastAuction = [
                'id' => $auction->id,
                'type' => $auction->type,
                'slug' => $auction->slug,
                'img' => $auction->img,
                'starts_at' => $auction->starts_at,
                'ends_at' => $auction->ends_at,
                'unsold' => $unsold
            ];

            array_push($past, $singlePastAuction);
        }
        return response()->json($past);
    }

    public function landingPageAuctions(){
        $landingPageAuctions = [];
        $pastAuction = AuctionType::select(['img', 'type', 'slug'])->where('ends_at', '<', Carbon::today()->toDateString())->latest()->first();
        $currentAuction = AuctionType::select(['img', 'type', 'slug'])->where('ends_at', '>', Carbon::today()->toDateString())->first();
        $upcomingAuction = AuctionType::select(['img', 'type', 'slug'])->where('active', false)->first();
        array_push($landingPageAuctions, $pastAuction, $currentAuction, $upcomingAuction);

        $coins = AuctionCoin::select(['country', 'city', 'ruler', 'date', 'auction_starts', 'auction_ends', 'id'])
            ->where('auction_type', 3)
                ->take(3)
                    ->inRandomOrder()
                        ->get();
        // $coins = AuctionCoin::where('auction_type', $currentAuction->id)->take(3)->inRandomOrder()->get();
        return response()->json([ 'auctions'=> $landingPageAuctions, 'coins' => $coins]);
    }

    public function pastAuctions(){
    	$type = 'Archive';
    	$auctions = AuctionType::whereDate('ends_at', '<', Carbon::today()->toDateString())->get();
    	// dd($pastAuctions);
    	return view('coin.user.auction_view', compact('auctions', 'type'));

    }

    public function futureAuctions(){
    	$type = 'Future Auctions';
    	$futureAuctions = AuctionType::whereDate('starts_at', '>', Carbon::today()->toDateString())->get();
    	return view('', compact('futureAuctions', 'type'));

    }


    public function auctions1(Request $req){
        //get query params
        $c = $req->c;
        // $auction_type = AuctionType::where('active', true)->firstOrFail();
        // $auction_type = $auction_type->type;
        // dd($auction_type->type);
        if(!isset($c)){
            $coins = AuctionCoin::where('auction_type', $auction_type)->get();
            // dd($coins);
            // return view('coin.user.auction', compact('coins'));
            return response()->json($coins);

        }else{
            
            if (!isset($this->cat[$c])) {
                abort(404);
            }
            $category = $this->cat[$c];
            $coins = AuctionCoin::where(['category' => $this->cat[$c], 'auction_type' => $auction_type])->get();
            // return view('coin.user.sample', compact('coins', 'category'));
            return response()->json($coins);
        }
    }


    public function showAuctionWinner($id, $slug){

        return view('coin.dashboard.winner', compact(''));
    }

    public function showUserAuctions($username){
        $auctions = AuctionType::select('id')->where('active', true)->get();
        // dd($auction_type);
        $ids = [];
        $coins = [];
        foreach($auctions as $auction){
            $ids[] = $auction['id'];
        }
        // return $ids;
        // foreach ($ as $value) {
            
        // }

        // return view('coin.dashboard.user_with_auction_bids');
    }

    public function isValidUser($reqUsername, $reqToken){

        if ( !isset($reqUsername) || !isset( $reqToken ) || $reqUsername == '' || $reqToken == '') {
           $isValidUser = false;
        }else{
            //check if the username exsit here
            $user = User::whereUsername($reqUsername)->first();
            if (!isset( $user ) || $user->login_token !== $reqToken ) {
                $isValidUser = false;
            }else{
                $isValidUser = true;
            }

            
        }

        return $isValidUser;
    }

    public function auctionCoin(Request $req){

        //user and app validation
        $username = $req->_u;
        $token = $req->_t;


        $isValidUser = $this->isValidUser($username, $token);
        $auctionSlug = $req->auctionSlug;
        $auction = AuctionType::whereSlug($auctionSlug)->first();
        $auctionId = $auction->id;
        $auctionType = $auction->type;
        $auctionActive = $auction->active;
        $coins = AuctionCoin::where('auction_type', $auctionId)->get();
            // $username = 'afisi';
        $fullLot = [
            // Thursday 18th April 2019 1:00pm
            'serverTime' => date("l jS F Y h:ia"),
            'error' => false,
            'auctionTitle' => $auctionType,
            'auctionActive' => $auctionActive,
            'message'=> 'Lots for active coin auctions at the moment',
            'msgId' => 'Active Lots',
            'user' => $username,
            'estimates'=> ['min'=> 29.00, 'max'=> 8200.00],
            'dollar' => 0.42,
            'euro' => 1.54,
            'lots'=> [],
            'categories'=> [],
            'lotCount'=> count($coins),
            'coinIds' => [],
            'categories' => $this->loadCategoriesInfo($auctionId)
        ];

            if( !$isValidUser ){
                foreach ($coins as $coin) {
                    $lotsInfo = [
                        'auctionTitle' => $auctionType,
                        'image' => $coin->coin_pic,
                        'category' => $coin->category,
                        'title' => $coin->country . ', ' . $coin->region . '. ' . $coin->ruler . ', ' . $coin->date . '.',
                        'coin_id' => $coin->id,
                        'lotId' => $coin->lot_id,
                        'bidIncrement' => $coin->bid_increment,
                        'minBid' => $coin->starting_price,
                        'currentBid'=> $coin->current_bid,
                        'no_of_bids' => $coin->no_of_bids,
                        'ends_at' => $coin->auction_ends,
                        'coinHasBids' => false,
                        'userHasBid' => false,
                        'hasOutBid' => false,
                        'userCurrentBid' => 0,
                        'isWinning' => false,
                        'hasWon' => false,
                        'isPast' => false,
                        'header' => $coin->header,
                        'slug' => $coin->slug,
                        'active' => $coin->active

                    ];
                    array_push($fullLot['lots'], $lotsInfo);
                    array_push($fullLot['coinIds'], $coin->id);
                }
            }
            else{
                foreach ($coins as $coin) {
                    $lotsInfo = [
                        'auctionTitle' => $auctionType,
                        'image' => $coin->coin_pic,
                        'category' => $coin->category,
                        'title' => $coin->country . ', ' . $coin->region . '. ' . $coin->ruler . ', ' . $coin->date . '.',
                        'coin_id' => $coin->id,
                        'lotId' => $coin->lot_id,
                        'bidIncrement' => $coin->bid_increment,
                        'minBid' => $coin->starting_price,
                        'currentBid'=> $coin->current_bid,
                        'no_of_bids' => $coin->no_of_bids,
                        'ends_at' => $coin->auction_ends,
                        'coinHasBids' => $this->coinHasBids($coin->id),
                        'userHasBid' => $this->hasBid($username, $coin->id),
                        'hasOutBid' => $this->hasOutBid($username, $coin->id),
                        'userCurrentBid' => $this->userCurrentBid($username, $coin->id),
                        'isWinning' => $this->isWinning($username, $coin->id),
                        'hasWon' => $this->hasWon($username, $coin->id),
                        'isPast' => $this->isPast($coin->id),
                        'header' => $coin->header,
                        'slug' => $coin->slug,
                        'active' => $coin->active



                    ];
                    array_push($fullLot['lots'], $lotsInfo);
                    array_push($fullLot['coinIds'], $coin->id);
                }
            }
            


            return response()->json($fullLot);
    }



    public function coinHasBids($coinId){
        $count = Bids::where('auction_id', $coinId)->count();
        if ($count >= 1) {
            return true;
        }else{
            return false;
        }
       
    }

    public function loadCategoriesInfo($auctionId){
        $categories = DB::table("coin_auction")
                ->where('auction_type', $auctionId)
                ->select(DB::raw("COUNT(*) as count"), 'category')
                ->groupBy(DB::raw('category'))
                ->get();

        return $categories;
    }

    public function singleAuctionCoinDesc(Request $req, $id){
        $username = $req->_u;
        $token = $req->_t;
        $app_token = $req->_at;
        $coin = AuctionCoin::whereId($id)->first();

        $isValidUser = $this->isValidUser($username, $token);

         if(!$isValidUser){
            $lotsInfo = [
                'username' => $username,
                'image' => $coin->coin_pic,
                'category' => $coin->category,
                'title' => $coin->country . ', ' . $coin->region . '. ' . $coin->ruler . ', ' . $coin->date . '.',
                'coin_id' => $coin->id,
                'lotId' => $coin->lot_id,
                'bidIncrement' => $coin->bid_increment,
                'minBid' => $coin->starting_price,
                'currentBid'=> $coin->current_bid,
                'no_of_bids' => $coin->no_of_bids,
                'ends_at' => $coin->auction_ends,
                'coinHasBids' => false,
                'userHasBid' => false,
                'hasOutBid' => false,
                'userCurrentBid' => 0,
                'isWinning' => false,
                'hasWon' => false,
                'isPast' => false,
                'header' => $coin->header,
                'slug' => $coin->slug,
                'active' => $coin->active

            ];
         }else{
            $lotsInfo = [
                'username' => $username,
                'image' => $coin->coin_pic,
                'category' => $coin->category,
                'title' => $coin->country . ', ' . $coin->region . '. ' . $coin->ruler . ', ' . $coin->date . '.',
                'coin_id' => $coin->id,
                'lotId' => $coin->lot_id,
                'bidIncrement' => $coin->bid_increment,
                'minBid' => $coin->starting_price,
                'currentBid'=> $coin->current_bid,
                'no_of_bids' => $coin->no_of_bids,
                'ends_at' => $coin->auction_ends,
                'coinHasBids' => $this->coinHasBids($coin->id),
                'userHasBid' => $this->hasBid($username, $coin->id),
                'hasOutBid' => $this->hasOutBid($username, $coin->id),
                'userCurrentBid' => $this->userCurrentBid($username, $coin->id),
                'isWinning' => $this->isWinning($username, $coin->id),
                'hasWon' => $this->hasWon($username, $coin->id),
                'isPast' => $this->isPast($coin->id),
                'header' => $coin->header,
                'slug' => $coin->slug,
                'active' => $coin->active

            ];
        }

       
        return response()->json($lotsInfo);

    }

//methods to check validation of every coin the the lot information

    private function hasBid($username, $coinId){

        if ($username == '') {
            return false;
        }

        // $userHasBid = Bids::where('id', $coinId)->first();

        $userBidCount = Bids::where(['auction_id' => $coinId, 'user' => $username])->count();
        if ($userBidCount > 0) {
            return true;
        }else{
            return false;
        }
    }

    private function isPast($coinId){

        $coin_info = AuctionCoin::where('id', $coinId)->first();


        $a = $coin_info->auction_ends;
        $b = explode(' ', $a);
        $c = explode('-', $b[0]);
        $d = explode(':', $b[1]);

        // $first = Carbon::create($c[0], $c[1], $c[2], $d[0], $d[1], $d[2]);

        $auction_ends = Carbon::create($c[0], $c[1], $c[2], $d[0], $d[1], $d[2]);
        return $auction_ends->isPast();
    }

    private function noOfBidders($coinId){
        $coinInfo = AuctionCoin::where('id', $coinId)->first();
        return $coinInfo->no_of_bids;
    }

    private function userCurrentBid($username, $coinId){
        if ($username == '') {
            return 0;
        }
        $userBid = Bids::where(['user' => $username, 'auction_id' => $coinId])->latest()->first();
        if (!$userBid) {
            return 0;
        }
        $userCurrentBid = $userBid->ammount;
        return $userCurrentBid;
    }

    private function hasWon($username, $coinId){
        if ($username == '') {
            return 0;
        }

        if ($this->isPast($coinId) && $this->isWinning($username, $coinId)) {
            return true;
        }else{
            return false;
        }
    }

    private function hasOutBid($username, $coinId){
        if ($username == '') {
            return false;
        }

        if ($this->hasBid($username, $coinId) && !$this->isWinning($username, $coinId)) {
            return true;
        }else{
            return false;
        }
        

    }

    private function isWinning($username, $coinId){
        if ($username == '') {
            return false;
        }

        $highestBid = HighestBidder::where('coin_id', $coinId)->first();
        $highestBidUsername = $highestBid->username;
        if ($highestBidUsername == $username) {
            return true;
        }else{
            return false;
        }

    }



}

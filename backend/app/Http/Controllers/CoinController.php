<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Coin;
use App\Bids;
use App\AuctionCoin;
use Session;
use Storage;
use DB;
use Carbon\Carbon;
use App\CoinRep;
use App\Consign;
use App\User;
use App\AuctionType;
use App\HighestBidder;

class CoinController extends Controller
{
    private $cat = ['', 'Greek', 'Oriental Greek', 'Central Asian', 'Roman Provincial', 'Roman Republican & Imperatorial', 'Roman Imperial', 'Byzantine', 'Early Medieval & Islamic', 'World', 'Miscellaneous', 'Group Lots'];

    public function landing(){
        $coins = DB::table('coins')->take(4)->get();
        return view('coin.user.landing', compact('coins'));
    }

    public function my_coin_info(){

        if (!Session::get('logged_in')) {
            return redirect('/login');
        }

        $username = Session::get('username');

        // $lots_bids_on = Bids::where('user', $username)->get()->dd();

        $lots_bids_on = 2;
        $total_current_bids =5;


        $credit_limit = User::where('username', $username)->firstOrFail();
        // $credit_limit = $credit_limit->credit_limit;
        $credit_limit = 200;


        $highest_bidder = HighestBidder::where('username', $username)->count();
        $total_max_bid = 150;
        $remaining_credit = 50;



        //my purchases.
        $highestPurchases = DB::table('highest_bidder')
            ->join('coin_auction', 'highest_bidder.coin_id', '=', 'coin_auction.id')
            ->where('username', $username)
            ->get();

        //myconsignment
        $email = Session::get('email');
        $consignments =  Consign::where('email', $email)->get();

        $details = ['lots_bids_on' => $lots_bids_on, 'total_current_bids' => $total_current_bids, 'credit_limit' => $credit_limit, 'highest_bidder' => $highest_bidder, 'total_max_bid' => $total_max_bid, 'remaining_credit' => $remaining_credit , 'highestPurchases' => $highestPurchases, 'consignments' => $consignments];

        return view('coin.user.mycoin', compact('details'));
    }



	public function show_all_selling_coins(){
		$coins = Coin::all();
		// dd($coins);
    	return view('coin.dashboard.all_selling_coin', compact('coins'));
	}

    public function showAllAuctionCoins($id){
        $coins = AuctionCoin::where('auction_type', $id)->get();
        // $coins = AuctionCoin::all();
        // dd($coins);
        return view('coin.dashboard.all_auction_coin', compact('coins'));
    }

    public function create_selling_coin(Request $request){
    	$this->validate($request, [
            'auction_type' => 'required',
            'ddlCategory' => 'required',
            'ddlCountry' => 'required',
            'ddlRegion' => 'required',
            'ddlCity' => 'required',
            'ddlRuler' => 'required',
            'txtDate' => 'required',
            'ddlDenomination' => 'required',
            'ddlMetal' => 'required',
            'txtDiameter' => 'required',
            'txtWeight' => 'required',
            'ddlDie' => 'required',
            'txtMint' => 'required',
            'txtStruck' => 'required',
            'txtReferences' => 'required',
            'ddlGrade' => 'required',
            'price' => 'required', 
            'quantity' => 'required | numeric',
            'file' => 'required'

        ]);

            $uploadedFile = $request->file('file');
            $extension = $uploadedFile->getClientOriginalExtension();
            $filename  = 'selling-coin-' . time() . '.' . $extension;
            $path = $uploadedFile->storeAs('public/selling', $filename);


    	$coin = new Coin();
        $coin->coin_type = '';
        $coin->auction_type = $request->auction_type;
    	$coin->category = $request->ddlCategory;
    	$coin->country = $request->ddlCountry;
    	$coin->region = $request->ddlRegion;
    	$coin->city = $request->ddlCity;
    	$coin->ruler = $request->ddlRuler;
    	$coin->date = $request->txtDate;
    	$coin->denomination = $request->ddlDenomination;
    	$coin->metal = $request->ddlMetal;
    	$coin->diameter = $request->txtDiameter;
    	$coin->weight = $request->txtWeight;
    	$coin->die_axis = $request->ddlDie;
    	$coin->standard = $request->txtStandard;
    	$coin->mint = $request->txtMint;
    	$coin->struck_dates = $request->txtStruck;
    	$coin->coin_pic = $filename;
    	$coin->obv_legend = $request->txtObvLegend;
    	$coin->obv_desc = $request->txtObvLegendDesc;
    	$coin->rev_legend = $request->txtRevLegend;
    	$coin->rev_desc = $request->txtRevLegendDesc;
    	$coin->references = $request->txtReferences;
    	$coin->comments = $request->txtComments;
    	$coin->defects = $request->txtToning;
    	$coin->grade = $request->ddlGrade;
    	$coin->pedigree = $request->txtPedigree;
    	$coin->notes = $request->txtNotes;
    	$coin->check = $request->ddlCondition;
    	$coin->multiple_lot = $request->txtMultipleLots;
    	$coin->header = $request->txtHeader;
    	$coin->collection = $request->ddlCollection;
    	$coin->inv_no = '';
        $coin->price = $request->price;
        $coin->quantity = $request->quantity;
        $coin->slug = slugify($request->ddlCountry . $request->ddlRegion . $request->ddlCity . $request->ddlRuler);
    	// $coin-> = $request->;

    	if($coin->save()){
    		Session::flash('flash', 'Coin has been added successfully');
    		return redirect()->route('dashboard.coin.add.selling');
    	}

    }

    public function show_selling_coin_with_id($id){
        $coin = Coin::where('id', $id)->firstOrFail();
        // dd($coin);
        return view('coin.dashboard.edit_selling_coin',compact('coin'));
    }

    public function showEditAuctionCoinWithId($id){
        $coin = AuctionCoin::where('id', $id)->firstOrFail();
        // dd($coin);
        return view('coin.dashboard.edit_auction_coin',compact('coin'));
    }

    public function showAuctionCoinWithId($id){
        $coin = AuctionCoin::where('id', $id)->firstOrFail();
        return view('coin.dashboard.auction_coin_with_id', compact('coin'));
        // dd($coin);
    }

    public function withdrawCoin(Request $req){
        $coin = AuctionCoin::findOrFail($req->id);
        $coin->active = false;
        if ($coin->save()) {
            Session::flash('flash', 'Coin has been withdraw');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, Try again');
            return redirect()->back();
        }
    }

    public function unWithdrawCoin(Request $req){
        $coin = AuctionCoin::findOrFail($req->id);
        $coin->active = true;
        if ($coin->save()) {
            Session::flash('flash', 'Coin has been unwithdraw');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, Try again');
            return redirect()->back();
        }
    }

    public function deleteAuctionCoin(Request $req){
        $coin = AuctionCoin::findOrFail($req->id);
        if ($coin->delete()) {
            Session::flash('flash', 'Coin has been deleted.');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, Try again');
            return redirect()->back();
        }
    }



    public function modify_selling_coin( Request $request){
        // $con
        $this->validate($request, [
            '_id' => 'required',
            // 'coin_type' => 'required',
            'ddlCategory' => 'required',
            'ddlCountry' => 'required',
            'ddlRegion' => 'required',
            'ddlCity' => 'required',
            'ddlRuler' => 'required',
            'txtDate' => 'required',
            'ddlDenomination' => 'required',
            'ddlMetal' => 'required',
            'txtDiameter' => 'required',
            'txtWeight' => 'required',
            'ddlDie' => 'required',
            'txtMint' => 'required',
            'txtStruck' => 'required',
            'txtReferences' => 'required',
            'ddlGrade' => 'required'

        ]);
        // dd($request);

        $coin = Coin::find($request->_id);
        $coin->coin_type = '';
        $coin->category = $request->ddlCategory;
        $coin->country = $request->ddlCountry;
        $coin->region = $request->ddlRegion;
        $coin->city = $request->ddlCity;
        $coin->ruler = $request->ddlRuler;
        $coin->date = $request->txtDate;
        $coin->denomination = $request->ddlDenomination;
        $coin->metal = $request->ddlMetal;
        $coin->diameter = $request->txtDiameter;
        $coin->weight = $request->txtWeight;
        $coin->die_axis = $request->ddlDie;
        $coin->standard = $request->txtStandard;
        $coin->mint = $request->txtMint;
        $coin->struck_dates = $request->txtStruck;
        // $coin-> = $request->image;
        $coin->obv_legend = $request->txtObvLegend;
        $coin->obv_desc = $request->txtObvLegendDesc;
        $coin->rev_legend = $request->txtRevLegend;
        $coin->rev_desc = $request->txtRevLegendDesc;
        $coin->references = $request->txtReferences;
        $coin->comments = $request->txtComments;
        $coin->defects = $request->txtToning;
        $coin->grade = $request->ddlGrade;
        $coin->pedigree = $request->txtPedigree;
        $coin->notes = $request->txtNotes;
        $coin->check = $request->ddlCondition;
        $coin->multiple_lot = $request->txtMultipleLots;
        $coin->header = $request->txtHeader;
        $coin->collection = $request->ddlCollection;
        $coin->inv_no = $request->inventory;
        $coin->slug = slugify($request->ddlCountry . $request->ddlRegion . $request->ddlCity . $request->ddlRuler);
        // $coin-> = $request->;

        if($coin->save()){
            Session::flash('flash', 'Coin has been edited successfully');
            return redirect()->back();
        }
    }


    // public function coinForSale(Request $req){
    //     $c = $req->c;
    //     if(!isset($c)){
    //         $coins = Coin::all();
    //         return response()->json(returnJson(false, 'Coins for sale', $coins));
    //     }else{
            
    //         if (!isset($this->cat[$c])) {
    //             abort(404);
    //         }
    //         $category = $this->cat[$c];
    //         $coins = AuctionCoin::where('category', $this->cat[$c])->get();
    //         return view('coin.user.buying', compact('coins', 'category'));
    //     }

        
    // }

    public function coinForSale(Request $req){

        $coins = Coin::select(['country', 'city', 'ruler', 'date', 'price', 'coin_pic', 'slug', 'id', 'region'])->get();
        $fullCoin = [
                'serverTime' => date("l jS F Y h:ia"),
                'error' => false,
                'message'=> 'Buy Now.',
                'msgId' => 'coinForSale',
                'estimates'=> ['min'=> 10.00, 'max'=> 2000.00],
                'coins'=> $coins,
                'coinCount'=> count($coins),
                // 'dollar' => 0.42,
                // 'euro' => 1.54,
                'categories' => $this->loadCategoriesInfo()
            ];
        return response()->json($fullCoin);
    }


    public function loadCategoriesInfo(){
        $categories = DB::table("coins")
                ->select(DB::raw("COUNT(*) as count"), 'category')
                ->groupBy(DB::raw('category'))
                ->get();

        return $categories;
    }



    public function sellingCoinDesc($id){
        $coin = Coin::findOrFail($id);
        return response()->json(returnJson(false, 'Coin Description', $coin));
    }

    public function add_auction_coin($id){
        $auction = AuctionType::findOrFail($id);
        return view('coin.dashboard.add_auction_coin', compact('auction'));
    }


    public function create_auction_coin(Request $request){
        $this->validate($request, [
            'auction_type' => 'required',
            'ddlCategory' => 'required',
            'ddlCountry' => 'required',
            'ddlRegion' => 'required',
            'ddlCity' => 'required',
            'ddlRuler' => 'required',
            'txtDate' => 'required',
            'ddlDenomination' => 'required',
            'ddlMetal' => 'required',
            'txtDiameter' => 'required',
            'txtWeight' => 'required',
            'ddlDie' => 'required',
            'txtMint' => 'required',
            'txtStruck' => 'required',
            'txtReferences' => 'required',
            'ddlGrade' => 'required', 
            'file' => 'required',
            'starting_price' => 'required',
            'bid_increment' => 'required',
            'auction_starts' => 'required',
            'auction_ends' => 'required'

        ]);
        // dd($request);

            $uploadedFile = $request->file('file');
            $extension = $uploadedFile->getClientOriginalExtension();
            $filename  = 'auction-coin-' . time() . '.' . $extension;
            $path = $uploadedFile->storeAs('public/auction', $filename);

        $auction = AuctionType::findOrFail($request->auction_type);
        $lastAuctionNo = $auction->no_of_coins;

        
        $coin = new AuctionCoin();

        $coin->lot_no = $lastAuctionNo++;
        $coin->auction_type = $request->auction_type;
        $coin->category = $request->ddlCategory;
        $coin->country = $request->ddlCountry;
        $coin->region = $request->ddlRegion;
        $coin->city = $request->ddlCity;
        $coin->ruler = $request->ddlRuler;
        $coin->date = $request->txtDate;
        $coin->denomination = $request->ddlDenomination;
        $coin->metal = $request->ddlMetal;
        $coin->diameter = $request->txtDiameter;
        $coin->weight = $request->txtWeight;
        $coin->die_axis = $request->ddlDie;
        $coin->standard = $request->txtStandard;
        $coin->mint = $request->txtMint;
        $coin->struck_dates = $request->txtStruck;
        $coin->coin_pic = $filename;
        $coin->obv_legend = $request->txtObvLegend;
        $coin->obv_desc = $request->txtObvLegendDesc;
        $coin->rev_legend = $request->txtRevLegend;
        $coin->rev_desc = $request->txtRevLegendDesc;
        $coin->references = $request->txtReferences;
        $coin->comments = $request->txtComments;
        $coin->defects = $request->txtToning;
        $coin->grade = $request->ddlGrade;
        $coin->pedigree = $request->txtPedigree;
        $coin->notes = $request->txtNotes;
        $coin->check = $request->ddlCondition;
        $coin->multiple_lot = $request->txtMultipleLots;
        $coin->header = $request->txtHeader;
        $coin->collection = $request->ddlCollection;
        $coin->starting_price = $request->starting_price;
        $coin->bid_increment = $request->bid_increment;
        $coin->auction_starts = $request->auction_starts;
        $coin->auction_ends = $request->auction_ends;
        $coin->no_of_bids = 0;
        $coin->slug = slugify($request->ddlCountry . $request->ddlRegion . $request->ddlCity . $request->ddlRuler);

        $highest_bidder = new HighestBidder;
       

        

        if($coin->save()){
            $highest_bidder->coin_id = $coin->id;
            $highest_bidder->paid = false;
            $highest_bidder->shipped = false;
            // $highest_bidder->tracking_no = null

            $auction->no_of_coins++;
            if ($auction->save() && $highest_bidder->save()) {
                Session::flash('flash', 'Coin has been added successfully');
                return redirect()->back();
            }else{
                Session::flash('flash', 'Error Occured, try again.');
                return redirect()->back();
            }
        }else{
            Session::flash('flash', 'Error Occured, try again.');
            return redirect()->back();
        }

    }

    public function modify_auction_coin(Request $request){
        //this is the coin you want to modify
         $this->validate($request, [
            // 'auction_type' => 'required',
            'ddlCategory' => 'required',
            'ddlCountry' => 'required',
            'ddlRegion' => 'required',
            'ddlCity' => 'required',
            'ddlRuler' => 'required',
            'txtDate' => 'required',
            'ddlDenomination' => 'required',
            'ddlMetal' => 'required',
            'txtDiameter' => 'required',
            'txtWeight' => 'required',
            'ddlDie' => 'required',
            'txtMint' => 'required',
            'txtStruck' => 'required',
            'txtReferences' => 'required',
            'ddlGrade' => 'required', 
            // 'file' => 'required',
            'starting_price' => 'required',
            'bid_increment' => 'required',
            'auction_starts' => 'required',
            'auction_ends' => 'required'

        ]);
        // dd($request);

        // $file = $request->file;
        // $imageName = rand().time(). '.' .$file->getClientOriginalExtension();
        // $file->move(public_path('uploads/auction'), $imageName);

        $coin = AuctionCoin::findOrFail($request->_id);
        // $coin->auction_type = $request->auction_type;
        $coin->category = $request->ddlCategory;
        $coin->country = $request->ddlCountry;
        $coin->region = $request->ddlRegion;
        $coin->city = $request->ddlCity;
        $coin->ruler = $request->ddlRuler;
        $coin->date = $request->txtDate;
        $coin->denomination = $request->ddlDenomination;
        $coin->metal = $request->ddlMetal;
        $coin->diameter = $request->txtDiameter;
        $coin->weight = $request->txtWeight;
        $coin->die_axis = $request->ddlDie;
        $coin->standard = $request->txtStandard;
        $coin->mint = $request->txtMint;
        $coin->struck_dates = $request->txtStruck;
        $coin->coin_pic = $request->imageName;
        $coin->obv_legend = $request->txtObvLegend;
        $coin->obv_desc = $request->txtObvLegendDesc;
        $coin->rev_legend = $request->txtRevLegend;
        $coin->rev_desc = $request->txtRevLegendDesc;
        $coin->references = $request->txtReferences;
        $coin->comments = $request->txtComments;
        $coin->defects = $request->txtToning;
        $coin->grade = $request->ddlGrade;
        $coin->pedigree = $request->txtPedigree;
        $coin->notes = $request->txtNotes;
        $coin->check = $request->ddlCondition;
        $coin->multiple_lot = $request->txtMultipleLots;
        $coin->header = $request->txtHeader;
        $coin->collection = $request->ddlCollection;
        $coin->starting_price = $request->starting_price;
        $coin->bid_increment = $request->bid_increment;
        $coin->auction_starts = $request->auction_starts;
        $coin->auction_ends = $request->auction_ends;
        $coin->slug = slugify($request->ddlCountry . $request->ddlRegion . $request->ddlCity . $request->ddlRuler);
        // $coin->no_of_bids = 0;


        if($coin->save()){

            Session::flash('flash', 'Coin has been updated successfully');
            return redirect()->back();
        }
    }



}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AuctionType;
use Session;
use App\AuctionCoin;
use Carbon\Carbon;

class AuctionTypeController extends Controller
{


    public function addAuction(Request $req){
    	$this->validate($req, [
            'auction_type' => 'required',
            'auction_starts' => 'required',
            'auction_ends' => 'required'
        ]);

        $type = AuctionType::where('type', $req->auction_type)->count();
        if ($type > 0) {
        	Session::flash('flash', 'Auction already exist.');
        	return redirect()->back();
        }

        $uploadedFile = $req->auction_img;
        $extension = $uploadedFile->getClientOriginalExtension();
        $filename  = 'auction-' . time() . '.' . $extension;
        $path = $uploadedFile->storeAs('public/auctiontype', $filename);

        $type = new AuctionType;
        $type->type = $req->auction_type;
        $type->slug = slugify($req->auction_type);
        $type->img  = $filename;
        $type->starts_at = $req->auction_starts;
        $type->ends_at = $req->auction_ends;
        $type->created_by = Session::get('admin_username');
        $type->active = false;

        if ($type->save()) {
        	Session::flash('flash', 'Auction added successfully');
        	return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, Try again later');
            return redirect()->back();   
        }
    }

    public function allAuctions(){
        $desc = 'All auctions';
    	$auctions = AuctionType::all();
    	return view('coin.dashboard.all_auction_type', compact('auctions', 'desc'));
    }

    public function allAuctionOrders(){
        $auctions = AuctionType::all();
        return view('coin.dashboard.all_auction_orders', compact('auctions'));
    }

    public function show_auction_type_with_id($id){
    	$type = AuctionType::findOrFail($id);
        // dd($type);
        $coins = AuctionCoin::where('auction_type', $type->id)->get();
    	return view('coin.dashboard.show_auction_type_with_id', compact('id', 'type', 'coins'));
    }

    public function unPublishedAuctions(){
        $desc = 'All Unpublished auctions';
        $auctions = AuctionType::where('active', false)->get();
        return view('coin.dashboard.all_auction_type', compact('auctions', 'desc'));
    }

    public function currentAuctions(){
        $desc = 'All current auctions';
        $auctions = AuctionType::where('active', true)->where('ends_at', '>', Carbon::today()->toDateString())->get();
        return view('coin.dashboard.all_auction_type', compact('auctions', 'desc'));
    }

    public function deleteAuction($id){
        $auction = AuctionType::findOrFail($id);
        if ($auction->delete()) {
            Session::flash('flash', 'Auction deleted successfully');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, Try again later');
            return redirect()->back();
        }
    }

    public function showModifyAuction($id){
        $auction = AuctionType::findOrFail($id);
        return view('coin.dashboard.modify_auction', compact('auction'));
    }

    public function modifyAuction(Request $req){
        $this->validate($req, [
            'auction_type' => 'required',
            'auction_starts' => 'required',
            'auction_ends' => 'required'
        ]);


        $type = AuctionType::findOrFail($req->id);
        $type->type = $req->auction_type;
        $type->slug = slugify($req->auction_type);
        $type->starts_at = $req->auction_starts;
        $type->ends_at = $req->auction_ends;

        if ($type->save()) {
            Session::flash('flash', 'Auction edited successfully');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, Try again later');
            return redirect()->back();   
        }
    }

    public function replaceAuctionCover(Request $req){
        $uploadedFile = $req->auction_img;
        $extension = $uploadedFile->getClientOriginalExtension();
        $filename  = 'auction-' . time() . '.' . $extension;
        $path = $uploadedFile->storeAs('public/auctiontype', $filename);
    }
}

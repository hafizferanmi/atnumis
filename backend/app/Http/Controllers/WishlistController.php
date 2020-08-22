<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Coin;
use Session;
// use App\Wishlist;

class WishlistController extends Controller
{
    public function addToWishlist(Request $req){

    	$this->validate($req, [
            'coin_id' => 'required',
            // 'user' => 'required'
        ]);

        $coin_id = $req->coin_id;
     
        $coin = Coin::find($coin_id);

        if(!$coin) {
            abort(404);
        }
 
        $wishlist = session()->get('wishlist');
        // if wishlist is empty then this the first coin
        if(!$wishlist) {

 
            $wishlist = [
                $coin_id => [
                    'id' => $coin->id,
                    "name" => $coin->country . ', ' . $coin->region . '. ' . $coin->ruler,
		            "price" => $coin->price,
                   

                ]
            ];

 
            session()->put('wishlist', $wishlist);
	    	// if (Session::get('email')) {
	    	// 	$wishlist = new Wishlist();
	    	// 	$wishlist->coin_id = $coin_id;
	    	// 	$wishlist->user_id = Session::get('username');
	    	// 	$wishlist->save();
	    	// }
            return response()->json(['error'=> false, 'msg'=> 'Added to wishlist successfully', 'error_no'=> 1, 'type'=> 'itemAddedToWishlist', 'count'=> count(session('wishlist')), 'json' => json_encode($wishlist), 'itemTitle' => $wishlist[$coin_id]['name'] ]);
            // return redirect()->back()->with('success', 'coin added to wishlist successfully!');
        }


            $wishlist = session()->get('wishlist');
            if(isset($wishlist[$coin_id])) {
                unset($wishlist[$coin_id]);

                if (Session::get('logged_in')) {
                    //delete the wishlist for the user.
                }
                session()->put('wishlist', $wishlist);
                 return response()->json(['error'=>false , 'msg'=> 'Item Deleted', 'error_no'=> 4, 'type'=> 'deleteItemInWishlist', 'count'=> count(session('wishlist')), 'json' => json_encode(session('wishlist')) ]);

            }
           
        // if item not exist in wishlist then add to wishlist 
        $wishlist[$coin_id] = [
            'id' => $coin->id,
            "name" => $coin->country . ', ' . $coin->region . '. ' . $coin->ruler,
            "price" => $coin->price,
            
        ];
        // session()->put('wishlist_ids', $coin_id);
        session()->put('wishlist', $wishlist);
     //    if (Session::get('email')) {
    	// 	$wishlist = new Wishlist();
    	// 	$wishlist->coin_id = $coin_id;
    	// 	$wishlist->user_id = Session::get('user_id');
    	// 	$wishlist->save();
    	// }

 		return response()->json(['error'=> false, 'msg'=> 'Added to wishlist successfully', 'error_no'=> 1, 'type'=> 'itemAddedToWishlist', 'count'=> count(session('wishlist')), 'json' => json_encode(session('wishlist')), 'itemTitle' => $wishlist[$coin_id]['name'] ]);


    }


    public function wishlist(){
        // if(Session::get('logged_in')){
        //     $coins = Wishlist::where('user_id', Session::get('user_id'))->get();
        // }else{
            $coins = session()->get('wishlist');
        // }
        
        // dd($coins);
        return view('user.wishlist', compact('coins'));
    }

    public function removeWishlist(){
    	$wishlist = session()->get('wishlist');
    	session()->remove('wishlist');
    	return redirect()->back()->with('success', 'Your wishlist has been flushed!');
    }
}

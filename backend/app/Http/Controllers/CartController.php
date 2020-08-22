<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Coin;

class CartController extends Controller
{
    

    public function addToCart(Request $req) {
    	$this->validate($req, [
            'coin_id' => 'required',
            'qty' => 'required'
        ]);

        $coin_id = $req->coin_id;
        $qty = $req->qty;

        $coin = Coin::find($coin_id);

        if ($qty > $coin->quantity) {
            return response()->json(['error'=> true, 'msg'=> 'Less item in stock', 'error_no'=> 3, 'type'=> 'lessItemsInStock']);
        }
 
        if(!$coin) {
            abort(404);
        }
 
        $cart = session()->get('cart');
        // if cart is empty then this the first coin
        if(!$cart) {

 
            $cart = [
                $coin_id => [
                    'id' => $coin->id,
                    "name" => $coin->country . ', ' . $coin->region . '. ' . $coin->ruler,
		            "quantity" => $qty,
		            "price" => $coin->price,
		            "photo" => $coin->coin_pic
                ]
            ];
 
            session()->put('cart', $cart);
            return response()->json(['error'=> false, 'msg'=> 'Added to cart successfully', 'error_no'=> 1, 'type'=> 'itemAddedToCart', 'count'=> count(session('cart'))]);
            // return redirect()->back()->with('success', 'coin added to cart successfully!');
        }
 
        // if cart not empty then check if this coin exist then increment quantity
        if(isset($cart[$coin_id])) {
            $cart[$coin_id]['quantity'] = $qty;
            session()->put('cart', $cart);
            return response()->json(['error'=> false, 'msg'=> 'Item updated in cart', 'error_no'=> 2, 'type'=> 'itemUpdateInCart', 'count'=> count(session('cart'))]);
            // return redirect()->back()->with('success', 'coin added to cart successfully!');
 
        }
 
        // if item not exist in cart then add to cart with quantity = 1
        $cart[$coin_id] = [
            'id' => $coin->id,
            "name" => $coin->country . ', ' . $coin->region . '. ' . $coin->ruler,
            "quantity" => $qty,
            "price" => $coin->price,
            "photo" => $coin->coin_pic
        ];
 
        session()->put('cart', $cart);
 		return response()->json(['error'=> false, 'msg'=> 'Added to cart successfully', 'error_no'=> 1, 'type'=> 'itemAddedToCart', 'count'=> count(session('cart'))]);
        // return redirect()->back()->with('success', 'coin added to cart successfully!');
    }


    public function show_coin_cart(){
    	return view('coin.user.cart');
    	// return session('cart');
    }





    public function update(Request $request)
    {
        if($request->id and $request->quantity)
        {
            $id = $request->id;
            $qty = $request->quantity;

            if ($qty == 1) {
                return;
            }

            $coin = Coin::find($id);

            if ($qty > $coin->quantity) {
                return response()->json(['error'=> true, 'msg'=> 'Less item in stock', 'error_no'=> 3, 'type'=> 'lessItemsInStock']);
            }
     
            if(!$coin) {
                abort(404);
            }



            $cart = session()->get('cart');
            $cart[$request->id]["quantity"] = $request->quantity;
            session()->put('cart', $cart);
            return response()->json(['error'=>false , 'msg'=> 'Item updated in your cart', 'error_no'=> 2, 'type'=> 'itemUpdateInCart', 'count'=> count(session('cart'))]);
        }
    }
 
    public function remove(Request $request)
    {
        if($request->id) {
            $cart = session()->get('cart');
            if(isset($cart[$request->id])) {
                unset($cart[$request->id]);
                session()->put('cart', $cart);
            }
            return response()->json(['error'=>false , 'msg'=> 'Item Deleted from your cart', 'error_no'=> 4, 'type'=> 'deleteItemInCart', 'count'=> count(session('cart'))]);
        }
    }

    public function remove_all_coin_from_cart(){
    	$cart = session()->get('cart');
    	session()->remove('cart');
    	return redirect()->back()->with('success', 'Your cart has been flushed!');
    }

    

}

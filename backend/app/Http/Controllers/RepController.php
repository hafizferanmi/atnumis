<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CoinRep;
use Session;

class RepController extends Controller
{
    public function addCoinRep(Request $req){
    	
   		$this->validate($req, [
            'email' => 'required | email',
            'message' => 'required'
        ]);

        $coin_rep = new CoinRep;
        $coin_rep->email = $req->email;
        $coin_rep->message = $req->message;
        $coin_rep->ack = 0;

        if($coin_rep->save()){
        	Session::flash('flash', 'Your request has been submitted and will be attended too shortly.');
        	return redirect()->route('coin.representation');
        }
    }

    

    public function show_new_rep(){
    	$reps = CoinRep::where('ack', 0)->get();
    	return view('coin.dashboard.all_new_representation', compact('reps'));
    }

    public function show_all_rep(){
    	$reps = CoinRep::where('ack', 1)->get();
    	return view('coin.dashboard.all_representation', compact('reps'));
    }

    public function show_rep_with_id($id){
    	$rep = CoinRep::findOrFail($id);
    	return view('coin.dashboard.rep_with_id', compact('rep'));

    }

    public function ack_rep(Request $req){

    	$this->validate($req, [
            'rep_id' => 'required'
        ]);
    	$id = $req->rep_id;
    	$coin_rep = CoinRep::findOrFail($id);
    	$coin_rep->ack = !$coin_rep->ack;
    	$coin_rep->ack_by = Session::get('username');
    	if ($coin_rep->save()) {
    		if ($coin_rep->ack) {
    			Session::flash('flash', 'Representation has been acknowledged');
    		}else{
    			Session::flash('flash', 'Representation has been unacknowledged');
    		}
    		
    		return redirect()->back();
    	}
    	
    }
}

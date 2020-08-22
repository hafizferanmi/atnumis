<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Valuation;
use Session;

class ValuationController extends Controller
{
        public function addValuation(Request $request){
        
        // $this->validate($req, [
        //     'email' => 'required | email',
        //     'message' => 'required'
        // ]);

        // $coin_rep = new Valuation;
        // $coin_rep->email = $req->email;
        // $coin_rep->message = $req->message;
        // $coin_rep->ack = 0;
        $name = $request->name;
        $email = $request->email;
        $condition = $request->condition;

        $files = $request->file;

        $file_names = [];
        $i = 0;
        foreach ($files as $key => $value) {
            $uploadedFile = $files[$i];
            $extension = $uploadedFile->getClientOriginalExtension();
            $filename  = 'valuation-coin-'. rand() . time() . '.' . $extension;
            $path = $uploadedFile->storeAs('public/uploads/valuation', $filename);

            array_push($file_names, $filename);
            $i++;
        }

        $file_names = implode(',', $file_names);

        $valuation = new Valuation;
        $valuation->name = $name;
        $valuation->email = $email;
        $valuation->condition = $condition;
        $valuation->images = $file_names;

        if($valuation->save()){
       		return response()->json(returnJson(false, 'Valuation uploads successful' ));
        }else{
        	return response()->json(returnJson(true, 'Error Occured' ));
        }
    }

    public function showNewValuation(){
    	$vals = Valuation::where('ack', 0)->get();
    	return view('coin.dashboard.all_new_valuation', compact('vals'));
    }

    public function showAllValuation(){
    	$vals = Valuation::where('ack', 1)->get();
    	return view('coin.dashboard.all_valuation', compact('vals'));
    }

    public function showValuationWithId($id){
    	$val = Valuation::findOrFail($id);
    	return view('coin.dashboard.val_with_id', compact('val'));

    }

    public function ackValuation(Request $req){

    	$this->validate($req, [
            'rep_id' => 'required'
        ]);
    	$id = $req->rep_id;
    	$coin_rep = Valuation::findOrFail($id);
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

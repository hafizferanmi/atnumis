<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Consign;
use Session;
use Carbon\Carbon;

class ConsignController extends Controller
{
    public function add_consign(Request $req){

   		// $this->validate($req, [
     //        'email' => 'required | email',
     //        'message' => 'required',
     //        'file' => 'required'
     //    ]);

        $files = $req->file;

        // dd($files);

        $file_names = [];
        $i = 0;
        foreach ($files as $key => $value) {
            $uploadedFile = $files[$i];
            $extension = $uploadedFile->getClientOriginalExtension();
            $filename  = 'consign-coin-'. rand() . time() . '.' . $extension;
            $path = $uploadedFile->storeAs('public/uploads/consign', $filename);

            array_push($file_names, $filename);
            $i++;
        }

        $file_names = implode(',', $file_names);
        

        $consign = new Consign;
        $consign->email = $req->email;
        $consign->message = $req->message;
        $consign->images = $file_names;
        $consign->ack = 0;


        if($consign->save()){
        	return response()->json(['error' => false, 'message' => 'Consign successful']);
        }
    }

    public function show_new_consign(){
        $consigns = Consign::where('ack', 0)->get();
        return view('coin.dashboard.all_new_consign', compact('consigns'));
    }

    public function show_all_consign(){
        $consigns = Consign::where('ack', 1)->get();
        return view('coin.dashboard.all_consign', compact('consigns'));
    }

    public function show_consign_with_id($id){
        $consign = Consign::findOrFail($id);
        return view('coin.dashboard.consign_with_id', compact('consign'));

    }

    public function ack_consign(Request $req){

        $this->validate($req, [
            'consign_id' => 'required'
        ]);
        $id = $req->consign_id;
        $coin_consign = Consign::findOrFail($id);
        $coin_consign->ack = !$coin_consign->ack;
        $coin_consign->ack_by = Session::get('username');
        if ($coin_consign->save()) {
            if ($coin_consign->ack) {
                Session::flash('flash', 'consign has been acknowledged');
            }else{
                Session::flash('flash', 'consign has been unacknowledged');
            }
            return redirect()->back();
        }
        
    }

    public function a(){
        $current = Carbon::now();
        $dt      = Carbon::now();
        $a = '2019-02-14 00:00:00';

        $b = explode(' ', $a);
        $c = explode('-', $b[0]);
        $d = explode(':', $b[1]);

        $first = Carbon::create($c[0], $c[1], $c[2], $d[0], $d[1], $d[2]);
        // $first = Carbon::create(2018, 10, 03, 23, 26, 11);
        $second = Carbon::create(2019, 10, 03, 23, 26, 11);



        if ($first->isPast()) {
            print 'a';
        }

        if ($second->isFuture()) {
            print 'b';
        }

        // $dt = $dt->subHours(6);
        // echo $dt->diffInHours($current). '<br/>';         // -6
        // echo $current->diffInHours($dt). '<br/>';         // 6

        // $future = $current->addMonth(2);
        // $past   = $current->subMonths(2);
        // echo $current->diffInDays($future);      // 31
        // echo $current->diffInSeconds('2018/10/03'). '<br/>'; 
        // echo $current->diffInSeconds('2019/03/13'). '<br/>'; 

    }

}

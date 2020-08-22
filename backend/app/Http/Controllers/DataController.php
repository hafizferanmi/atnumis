<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CategoryToCountry;
use App\CountryToRegion;
use App\RegionToCity;
use App\CityToRuler;
// use App\RulertoDate;

class DataController extends Controller
{
    public function categoryToCountry(Request $req){
		$data = CategoryToCountry::where('category', $req->category)->first();
    	return response()->json(['data' => $data]);
    }

    public function countryToRegion(Request $req){
    	$data = CountryToRegion::where('country', ' ' . $req->country)->first();
    	return response()->json(['data' => $data]);
    }

    public function regionToCity(Request $req){
    	$data = RegionToCity::where('region', ' ' . $req->region)->first();
    	return response()->json(['data' => $data]);
    }

    public function cityToRuler(Request $req){
    	$data = CityToRuler::where('city', ' ' . $req->city)->first();
    	return response()->json(['data' => $data]);
    }

    public function rulerToDate(Request $req){
    	$data = CountryToRegion::where('ruler', ' ' . $req->ruler)->first();
    	return response()->json(['data' => $data]);
    }
}

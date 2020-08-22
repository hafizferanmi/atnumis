<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\XlsTable;
use App\Bibliography;
class BibliographyController extends Controller
{
    public function fetchBibliography($pageNo){
    	$perPage = 100;
    	if ($pageNo == 1) {
    		$pageNo = 1;
    		$skip = 0;
    	}else{
    		$pageNo++;
    		$skip = $pageNo * $perPage;
    	}
    	$bib = Bibliography::skip($skip)->take($perPage)->get();
    	return response()->json(['error' => false, 'message' => 'Fetch successful', 'content' => $bib]);
    }
}

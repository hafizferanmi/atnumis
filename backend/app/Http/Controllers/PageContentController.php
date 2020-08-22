<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PageContent;
use Session;

class PageContentController extends Controller
{
	private $pages = [
		'about' => 'about',
		'contact' => 'contact',
		'representation' => 'representation',
		'conservation' => 'conservation',
		'bibliography' => 'bibliography',
		'privacy' => 'privacy',
		'termsandcondition' => 'termsandcondition'
	];

    public function fetchPageContent(Request $req, $slug){
        $content = PageContent::where('slug', $slug)->first();
        return response()->json(['error' => false, 'message' => 'Fetch successful', 'content' => $content->content]);
    }

	public function allPageContent(){
		$pages = PageContent::all();
		return view('coin.dashboard.all_page_content', compact('pages'));
	}

    public function addPageContent(){
    	return view('coin.dashboard.add_page_content', compact('pages'));
    }

    public function modifyPageContent(Request $req, $id){
    	$page = PageContent::findOrFail($id);
    	if ($req->query('page') == null || $page->slug !== $req->query('page')) {
    		abort(404);
    	}

    	return view('coin.dashboard.modify_page_content', compact('page'));
    }

    public function editPageContent(Request $req){
    	$this->validate($req, [
            '_id' => 'required',
            'title' => 'required',
            'content' => 'required'
        ]);

        $page = PageContent::findOrFail($req->_id);
        $page->title = $req->title;
        $page->content = $req->content;

        if ($page->save()) {
        	Session::flash('flash', 'Page content saved successfully');
        }else{
        	Session::flash('flash', 'Error Occured, try again.');
        }

        return redirect()->back();
    }


    public function deletePageContent(){

    }
}

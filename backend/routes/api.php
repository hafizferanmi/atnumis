<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/', function(){
	return response()->json([ 'message' => 'Contact hafizferanmi@gmail.com (Lead Developer) to use this api. Thanks.', 'Developer' => 'Hafiz Feranmi', 'Social' => ['instagram' => 'https://instagram.com/hafizferanmi', 'twitter' => 'https://twitter.com/hafizferanmi', 'facebook' => 'https://facebook.com/hafizferanmi', 'linkedIn' => 'https://linkedin.com/in/hafizferanmi']]);
});
Route::get('/test', 'UserController@testMail');
Route::get('/category_to_country', 'DataController@categoryToCountry');
Route::get('/country_to_region', 'DataController@countryToRegion');
Route::get('/region_to_city', 'DataController@regionToCity');


Route::group(['middleware' => 'isValidRequest'], function () {


Route::group(['middleware' => 'isLoggedIn'], function () {
	Route::post('/place-bid', 'BidController@placeBidOnCoin');
	Route::post('/profile', 'UserController@myProfile')->name('coin.profile');
	Route::post('/checkout', 'CheckoutController@apiCheckout')->name('coin.checkout');
	Route::post('/change-email', 'UserController@changeEmail')->name('coin.change-email');
	Route::post('/change-password', 'UserController@changePassword')->name('coin.change-password');
	Route::post('/update-profile', 'UserController@updateProfile')->name('coin.update-profile');
	//update-profile
	// checkout
});

Route::post('/forgot-password', 'UserController@forgotPassword');
Route::post('/reset-password', 'UserController@login');

Route::get('/profile', 'UserController@myProfile')->name('coin.profile');


Route::post('/login', 'UserController@login');
Route::post('/signup', 'UserController@register');

Route::get('/buy', 'CoinController@coinForSale')->name('coin.buy');
Route::get('/buy/{id}', 'CoinController@sellingCoinDesc')->name('coin.buy.desc');




Route::get('/landing-page-auctions', 'AuctionController@landingPageAuctions')->name('coin.auction.landing-auctions');
Route::get('/auction', 'AuctionController@auctionCoin')->name('coin.auction.view');
// Route::view('/auction/current', 'AuctionController@currentAuction');
Route::get('/auction/upcoming', 'AuctionController@userUpcomingAuctions');
Route::get('/auction/archive', 'AuctionController@userPastAuctions');
Route::get('/auction/{auctionSlug}', 'AuctionController@auctionCoin')->name('coin.auction.slug');

Route::get('/auction/coin/desc/{id}', 'AuctionController@singleAuctionCoinDesc')->name('coin.auction.desc');


Route::post('/representation', 'RepController@addCoinRep')->name('coin.representation.post');
Route::post('/valuation', 'RepController@addValuation')->name('coin.valuation');
Route::post('/consign', 'ConsignController@add_consign')->name('coin.consign.post');

Route::get('/page-content/{slug}', 'PageContentController@fetchPageContent');
Route::get('/bibliography/{pageNo}', 'BibliographyController@fetchBibliography');



Route::get('/mycoin', 'CoinController@my_coin_info')->name('coin.mycoin');
// Route::get('/change-password', 'UserController@changePassword')->name('coin.changepassword');


});
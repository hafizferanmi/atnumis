<?php


Route::get('/', function(){
	return redirect('/');
})->name('coin.landing');


Route::group(['middleware' => 'isAdmin', 'prefix' => ''], function () {

	Route::get('/', function(){
		return view('dashboard');
	});

	//coin admin dashboard routes
	Route::group([ 'prefix' => ''], function () {
		Route::get('/', 'DashboardController@showCoinDashboard')->name('dashboard');

		Route::get('/catalogue/selling', 'CoinController@show_all_selling_coins')->name('dashboard.coin.selling.catalogue');
		Route::view('/add/selling', 'coin.dashboard.add_selling_coin')->name('dashboard.coin.add.selling');
		Route::post('/add/selling', 'CoinController@create_selling_coin')->name('dashboard.coin.add.selling.post');
		Route::get('/selling/modify/{id}', 'CoinController@show_selling_coin_with_id');
		Route::post('/selling/update', 'CoinController@modify_selling_coin');

		

		Route::get('/auction/bids', 'BidController@show_all_auctions');
		Route::get('auction/bids/{id}', 'BidController@show_all_bids_with_id');


		//update coin details
		Route::post('/auction/coin/update', 'CoinController@modify_auction_coin');
		Route::post('auction/coin/add', 'CoinController@create_auction_coin')->name('dashboard.coin.add.auction.post');
		Route::get('/auction/coin/{id}/modify', 'CoinController@showEditAuctionCoinWithId');
		Route::get('/auction/coin/{id}/details', 'CoinController@showAuctionCoinWithId');
		Route::get('/auction/coin/{id}/withdraw', 'CoinController@withdrawCoin');
		Route::get('/auction/coin/{id}/unwithdraw', 'CoinController@unWithdrawCoin');
		Route::get('/auction/coin/{id}/delete', 'CoinController@deleteAuctionCoin');




		Route::view('/auction/add', 'coin.dashboard.add_auction_type');
		Route::post('/auction_type/add', 'AuctionTypeController@addAuction')->name('dashboard.coin.add.auction_type.post');
		Route::get('/auction/all', 'AuctionTypeController@allAuctions');
		Route::get('/auction/current', 'AuctionTypeController@currentAuctions');
		Route::get('/auction/unpublished', 'AuctionTypeController@unPublishedAuctions');
		Route::get('/auction/{id}/{slug}', 'AuctionTypeController@show_auction_type_with_id');
		Route::get('/auction/{id}/{slug}/delete', 'AuctionTypeController@deleteAuction');
		Route::get('/auction/{id}/{slug}/modify', 'AuctionTypeController@showModifyAuction');
		Route::post('/auction/modify', 'AuctionTypeController@modifyAuction');

		Route::get('/auction/{id}/{slug}/add', 'CoinController@add_auction_coin')->name('dashboard.coin.add.auction');
		Route::get('/auction/{id}/{slug}/coins', 'CoinController@showAllAuctionCoins')->name('dashboard.coin.auction.catalogue');

		// Highest Bidders and auction orders
		Route::get('/auction/orders', 'AuctionTypeController@allAuctionOrders');
		Route::get('auction/{id}/{slug}/generate/orders', 'AuctionOrdersController@generateAuctionOrder');
		Route::get('auction/{id}/{slug}/order/{user}', 'AuctionOrdersController@showAuctionOrdersDetails');
		Route::get('auction/{id}/{slug}/orders', 'AuctionOrdersController@showAuctionOrders');
		Route::post('change-auction-order-status', 'AuctionOrdersController@changeOrderStatus');


		Route::get('auction/{id}/{slug}/highest-bidders', 'BidController@showAllHighestBidder');
		// Route::get('auction/{id}/{slug}/highest-bidder/{user}', 'BidController@showHighestBidderDetails');
		// Route::get('auction/{id}/{slug}/highest-bidders/users', 'BidController@showAllHighestBidderWithUsers');
		Route::get('/bids/highest/{id}', 'BidController@show_all_highest_bidder_desc');

		


		Route::get('/winner/{id}/{slug}', 'AuctionController@showAuctionWinner');

		// coin representation route
		Route::get('/representation/new', 'RepController@show_new_rep')->name('dashboard.coin.new.representation');
		Route::get('/representation/all', 'RepController@show_all_rep')->name('dashboard.coin.all.representation');
		Route::get('/representation/{id}', 'RepController@show_rep_with_id')->name('dashboard.coin.representation');
		Route::post('/ack/rep', 'RepController@ack_rep')->name('ack.representation');

		// consign route
		Route::get('/consign/new', 'ConsignController@show_new_consign')->name('dashboard.coin.new.consign');
		Route::get('/consign/all', 'ConsignController@show_all_consign')->name('dashboard.coin.all.consign');
		Route::get('/consign/{id}', 'ConsignController@show_consign_with_id')->name('dashboard.coin.consign');
		Route::post('/ack/consign', 'ConsignController@ack_consign')->name('ack.consign');

		// orders route
		Route::get('/orders/new', 'OrdersController@showNewOrder')->name('dashboard.coin.new.order');
		Route::get('/orders/all', 'OrdersController@showAllOrders')->name('dashboard.coin.all.order');
		Route::get('/order/{id}', 'OrdersController@showOrderWithId')->name('dashboard.coin.order');
		Route::post('/change-order-status', 'OrdersController@changeOrderStatus')->name('dashboard.coin.order.change');


		//valuation route
		Route::get('/valuation/new', 'ValuationController@showNewValuation')->name('dashboard.coin.new.valuation');
		Route::get('/valuation/all', 'ValuationController@showAllValuation')->name('dashboard.coin.all.valuation');
		Route::get('/valuation/{id}', 'ValuationController@showValuationWithId')->name('dashboard.coin.valuation');

		// users route
		Route::get('/users/all', 'AdminUserController@showAllUsers');
		Route::get('/users/view/{id}', 'AdminUserController@showUserWithId');
		Route::get('/users/delete/{id}', 'AdminUserController@deleteUserWithId');
		Route::get('/users/edit/{id}', 'AdminUserController@showEditUserWithId');
		Route::get('/users/block/{id}', 'AdminUserController@blockUser');
		Route::get('/users/unblock/{id}', 'AdminUserController@unblockUser');
		Route::post('/users/update', 'AdminUserController@editUser');

		Route::get('/users/bids/{username}', 'AuctionController@showUserAuctions');
		Route::get('/users/orders/{username}', 'OrdersController@showUserOrders');


		Route::post('/users/admin/add', 'AdminUserController@addAdminUser');
		Route::get('/users/admin/all', 'AdminUserController@showAdminUsers');
		Route::view('/users/admin/add', 'coin.dashboard.add_new_admin');
		Route::get('/users/admin/{id}/{username}', 'AdminUserController@showAdminDetails');
		Route::post('/users/admin/update/role', 'AdminUserController@editAdminRole');


		Route::get('/admin/settings', 'AdminUserController@showAdminSettings')->name('dashboard.settings');
		Route::post('/admin/update/details', 'AdminUserController@adminUpdateDetails');
		Route::post('/admin/update/password', 'AdminUserController@adminUpdatePassword');
		Route::post('/admin/update/dp', 'AdminUserController@adminUpdateDp');
		Route::post('/admin/update/email', 'AdminUserController@editAdminRole');

		Route::get('/page-content', 'PageContentController@allPageContent');
		Route::get('/page-content/{id}', 'PageContentController@modifyPageContent');
		Route::post('/page-content/modify', 'PageContentController@editPageContent')->name('dashboard.coin.add.page.content');

		Route::get('/xls', 'XlsTableController@xlsView');
		// Route::post('/xls', 'XlsTableController@uploadXls')->name('xls.post');
		Route::post('/xls', 'XlsTableController@uploadXls')->name('xls.post');


	});
});


//Admin login routes 
Route::get('/admin/login', function(){
	if (Session::get('admin_role') !== null) {
		return redirect('/dashboard/coin');
	}
	return view('coin.dashboard.login');
})->name('admin.login');
Route::post('/admin/login', 'AdminUserController@adminLogin');


//Logout route
Route::get('logout', 'AdminUserController@logout')->name('admin.logout');
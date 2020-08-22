<?php

namespace App;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Model;

class AuctionCoin extends Model
{
    protected $fillable = [
       'no_of_bids', 'coin_pic', 'category', 'country', 'region', 'city', 'ruler', 'date', 'denomination', 'metal', 'diameter', 'weight', 'die_axis', 'standard', 'mint', 'struck_dates', 'obv_legend', 'obv_desc', 'rev_legend', 'rev_desc', 'references', 'comments', 'defects', 'grade', 'pedigree', 'notes', 'check', 'multiple_lot', 'header', 'collection', 'starting_price', 'bid_increment', 'auction_starts', 'auction_ends', 'lot_no'
    ];

    protected $table = 'coin_auction';

    public function check_past(){
    	$a = $this->auction_ends;
        $b = explode(' ', $a);
        $c = explode('-', $b[0]);
        $d = explode(':', $b[1]);
        $auction_ends = Carbon::create($c[0], $c[1], $c[2], $d[0], $d[1], $d[2]);
        if ($auction_ends->isPast()) {
            return true;
        }else{
        	return false;
        }
    }

    public function formatAuctionStart(){
         $startsAt =  Carbon::parse($this->auction_starts);
        return strtoupper($startsAt->format('dS F Y')) ;
    }

    public function formatAuctionEnd(){
        $endsAt =  Carbon::parse($this->auction_ends);
        return strtoupper($endsAt->format('dS F Y'));
    }

}
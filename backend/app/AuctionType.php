<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class AuctionType extends Model
{
    protected $table = 'auction_type';

    protected $fillable = [
    	'type', 'active', 'slug', 'img', 'starts_at', 'ends_at'
    ];

    // public function auctionStatus(){
    // 	$start = $this->starts_at;
    // 	$end = $this->ends_at;

    //     $b = explode(' ', $end); // breakdown date auction ends
    //     $c = explode('-', $b[0]);
    //     $d = explode(':', $b[1]);

    //     $e = explode(' ', $start); // breakdown date auction starts.
    //     $f = explode('-', $e[0]);
    //     $g = explode(':', $e[1]);



    //     $auction_start = Carbon::create($f[0], $f[1], $f[2], $g[0], $g[1], $g[2]);
    //     $auction_end = Carbon::create($c[0], $c[1], $c[2], $d[0], $d[1], $d[2]);

    //     if ($auction_end->isPast()) {
    //         return 'Past';
    //     }else if($auction_start->isFuture()){
    //     	return 'Future';
    //     }else{
    //     	return 'Present';
    //     }
    // }

    public function isAuctionPast(){
        $a = $this->ends_at;
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

    public function isAuctionInFuture(){
        $a = $this->starts_at;
        $b = explode(' ', $a);
        $c = explode('-', $b[0]);
        $d = explode(':', $b[1]);

        $auction_starts = Carbon::create($c[0], $c[1], $c[2], $d[0], $d[1], $d[2]);
        if ($auction_starts->isFuture()) {
            return true;
        }else{
            return false;
        }
    }

    public function hasBeenActivated(){
       return $this->active ? true : false;
    }

    public function hasGeneratedOrder(){
        return $this->order_generated ? true : false;
    }



    public function rawStartsAt(){
        return $this->starts_at;
    }

    public function rawEndsAt(){
        return  $this->ends_at;
    }

    // public function getStartsAtAttribute($value){
    //     $startsAt =  Carbon::parse($value);
    //     return strtoupper($startsAt->format('dS F Y')) ;
    // }

    // public function getEndsAtAttribute($value){
    //     $endsAt =  Carbon::parse($value);
    //     return strtoupper($endsAt->format('dS F Y'));
    // }


}

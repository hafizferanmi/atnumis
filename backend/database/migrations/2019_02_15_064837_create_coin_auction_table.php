<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoinAuctionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coin_auction', function (Blueprint $table) {
            $table->increments('id');
            $table->string('category')->nullable();
            $table->string('country')->nullable();
            $table->string('region')->nullable();
            $table->string('city')->nullable();
            $table->string('ruler')->nullable();
            $table->string('date')->nullable();
            $table->string('coin_pic')->nullable();
            $table->string('denomination')->nullable();
            $table->string('metal')->nullable();
            $table->string('diameter')->nullable();
            $table->string('weight')->nullable();
            $table->string('die_axis')->nullable();
            $table->string('standard')->nullable();
            $table->string('mint')->nullable();
            $table->string('struck_dates')->nullable();
            $table->string('obv_legend')->nullable();
            $table->string('obv_desc')->nullable();
            $table->string('rev_legend')->nullable();
            $table->string('rev_desc')->nullable();
            $table->string('references')->nullable();
            $table->string('comments')->nullable();
            $table->string('defects')->nullable();
            $table->string('grade')->nullable();
            $table->string('pedigree')->nullable();
            $table->string('notes')->nullable();
            $table->string('check')->nullable();
            $table->string('multiple_lot')->nullable();
            $table->string('header')->nullable();
            $table->string('collection')->nullable();
            $table->string('starting_price')->nullable();
            $table->string('bid_increment')->nullable();
            $table->string('auction_starts')->nullable();
            $table->string('auction_ends')->nullable();
            // $table->string('')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coin_auction');
    }
}

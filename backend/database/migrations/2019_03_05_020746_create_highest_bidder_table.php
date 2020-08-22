<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHighestBidderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('highest_bidder', function (Blueprint $table) {
            $table->increments('id');
            $table->string('coin_id')->nullable();
            $table->string('hammer_price')->nullable();
            $table->string('paid')->nullable();
            $table->string('shipped')->nullable();
            $table->string('tracking_no')->nullable();
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
        Schema::dropIfExists('highest_bidder');
    }
}

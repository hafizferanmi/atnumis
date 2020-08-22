<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuctionOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auction_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('auction_id')->nullable();
            $table->string('no_of_coins')->nullable();
            $table->string('coin_id')->nullable();  //comma seperated values
            $table->string('total_price')->nullable();
            $table->string('order_by')->nullable();
            $table->string('status')->nullable();
            $table->string('paid')->nullable();
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
        Schema::dropIfExists('auction_orders');
    }
}

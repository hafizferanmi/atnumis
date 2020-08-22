<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuctionCreditInfoTablee extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auction_credit_info', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->nullable();
            $table->string('auction_type')->nullable();
            $table->string('credit_limit_bal')->nullable();
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
        Schema::dropIfExists('auction_credit_info_tablee');
    }
}

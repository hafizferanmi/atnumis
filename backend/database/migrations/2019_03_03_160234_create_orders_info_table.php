<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders_info', function (Blueprint $table) {
            $table->increments('id');
            $table->string('no_of_coins')->nullable();
            $table->string('total_price')->nullable();
            $table->string('order_by')->nullable();
            $table->string('status')->nullable();
            $table->string('paid')->nullable();
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
        Schema::dropIfExists('orders_info');
    }
}

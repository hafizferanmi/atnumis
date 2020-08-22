<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewColumnToOrdersInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders_info', function (Blueprint $table) {
            $table->string('payment_method')->nullable();
            $table->string('ammount_paid')->nullable();
            $table->string('note')->nullable();
            // $table->string('shipping_is_different')->nullable();
            // $table->string('shipping_address1')->nullable();
            // $table->string('shipping_address2')->nullable();
            // $table->string('shipping_city')->nullable();
            // $table->string('shipping_country')->nullable();
            // $table->string('shipping_zipcode')->nullable();
            // $table->string('shipping_state')->nullable();
            // $table->string('shipping_phone')->nullable();
            // $table->string('')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders_info', function (Blueprint $table) {
            //
        });
    }
}

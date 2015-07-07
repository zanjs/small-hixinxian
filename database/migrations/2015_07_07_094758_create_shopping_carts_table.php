<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShoppingCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopping_carts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');         /*用户id*/
            $table->integer('merchant_id');    /*商户id*/
            $table->integer('product_id');     /*产品id*/
            $table->integer('number');          /*产品数量*/
            $table->json('product_json');      /*产品 json */
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
        Schema::drop('shopping_carts');
    }
}

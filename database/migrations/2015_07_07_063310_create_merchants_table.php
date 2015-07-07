<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMerchantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',100);  /*名字*/
            $table->string('login_id',50);  /*登录id*/
            $table->integer('fare')->default(0);  /*配送费*/
            $table->integer('full_price')->default(0);  /*满多少面运费*/
            $table->string('address');  /*地址*/
            $table->string('api_key');  /*api key app*/
            $table->string('printer_key');  /*printer key 打印机*/
            $table->string('printer_code');  /*打印机终端号*/
            $table->string('printer_id');  /*打印机编号*/
            $table->string('printer_mobile');  /*打印机号码*/
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
        Schema::drop('merchants');
    }
}

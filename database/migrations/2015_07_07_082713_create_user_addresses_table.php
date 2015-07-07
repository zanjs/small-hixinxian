<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');       /*用户id*/
            $table->string('user_name');     /* 收货人姓名 */
            $table->string('city');           /* 城区 */
            $table->string('address');       /* 街道 */
            $table->string('tag');           /* 标签 */
            $table->integer('mobile');        /* 联系方式 */
            $table->float('gps_x');           /* 坐标经度 X lng */
            $table->float('gps_y');           /* 坐标经度 Y lat */
            $table->integer('merchant_id');           /* 商户id */
            $table->integer('is_default');           /* 是否默认地址 1 为默认 */
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
        Schema::drop('user_addresses');
    }
}

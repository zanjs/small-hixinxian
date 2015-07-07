<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserDosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_dos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',50); /*用户名*/
            $table->integer('type')->default(0); /*用户类型 0 为购买客户  */
            $table->tinyInteger('status')->default(1);  /*状态 1 正常 0 为时效*/
            $table->string('password',60); /*密码*/
            $table->string('ha_key'); /* 严 key */
            $table->string('open_id'); /*微信 open_id */
            $table->string('describe'); /* 描述 */
            $table->string('thumb'); /* 头像 */
            $table->integer('mobile'); /* 手机 */
            $table->string('merchant_id'); /* 商户id  */
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
        Schema::drop('user_dos');
    }
}

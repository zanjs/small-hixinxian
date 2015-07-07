<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('pid')->default(0);  /*父级 id 默认 0 顶级 无父级*/
            $table->string('name');             /*城市名*/
            $table->string('tag');             /* 标签 共搜索使用 */
            $table->tinyInteger('status')->default(1);  /*状态 1 正常 0 为时效*/
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
        Schema::drop('cities');
    }
}

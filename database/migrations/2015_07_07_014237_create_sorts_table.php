<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSortsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sorts', function (Blueprint $table) {
            $table->increments('id');  /*主键*/
            $table->string('name',50);  /*名字*/
            $table->integer('pid')->default(0);  /*父id 默认0 无父*/
            $table->string('thumb')->default('');  /*缩略图*/
            $table->integer('row')->default(0); /*排序*/
            $table->timestamps();       /*时间*/
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('sorts');
    }
}

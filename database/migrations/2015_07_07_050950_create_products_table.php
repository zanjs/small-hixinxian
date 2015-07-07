<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',50);  /*名字*/
            $table->integer('sort');  /*所属分类*/
            $table->tinyInteger('status')->default(1);  /*状态 1 正常 0 为时效*/
            $table->string('thumb')->default('');  /*缩略图*/
            $table->string('body')->default('这家伙好懒，介绍都没有 ~~~~(>_<)~~~~'); /*产品介绍*/
            $table->decimal('price', 10, 2); /*产品价格*/
            //$table->float('price'); /*产品价格*/
            $table->string('spec')->default('等待添加'); /*产品规格*/
            $table->integer('row')->default(0); /*排序*/
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
        Schema::drop('products');
    }
}

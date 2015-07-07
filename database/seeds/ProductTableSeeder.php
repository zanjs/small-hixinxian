<?php

use Illuminate\Database\Seeder;
use App\Model\Product;

class ProductTableSeeder extends Seeder {

    public function run()
    {
        DB::table('products')->delete();

        for ($i=0; $i < 10; $i++) {
            Product::create([
                'name'   => '产品 '.$i,
                'sort'   => 0,
                'price'  => 12.01,
            ]);
        }
    }

}
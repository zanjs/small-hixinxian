<?php

use Illuminate\Database\Seeder;
use App\Model\Goods;

class GoodsTableSeeder extends Seeder {

    public function run()
    {
        DB::table('goods')->delete();
        for ($i=101; $i < 108; $i++) {
            Goods::create([
                'product_id'       => $i,
                'product_price'  => 12.01,
                'merchant_id'  => 5,

            ]);
        }
    }

}
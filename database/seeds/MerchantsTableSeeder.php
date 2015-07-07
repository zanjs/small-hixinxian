<?php

use Illuminate\Database\Seeder;
use App\Model\Merchant;

class MerchantTableSeeder extends Seeder {

    public function run()
    {
        DB::table('merchants')->delete();

        //$_name = array("商户周","商户王","商户李","商户于");
        $_name = ["商户周","商户王","商户李","商户于"];

        for ($i=0; $i < 4; $i++) {
            Merchant::create([
                'name'       => $_name[$i],
                'login_id'  => 'hi_666_'.$i,

            ]);
        }
    }

}
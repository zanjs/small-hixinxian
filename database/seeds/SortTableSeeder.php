<?php

use Illuminate\Database\Seeder;
use App\Model\Sort;

class SortTableSeeder extends Seeder {

    public function run()
    {
        DB::table('sorts')->delete();

        for ($i=0; $i < 10; $i++) {
            Sort::create([
                'name'   => '分类 '.$i,
            ]);
        }
    }

}
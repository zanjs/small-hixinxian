<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();


        //$this->call(SortTableSeeder::class);
        //$this->call(ProductTableSeeder::class);
        //$this->call(MerchantTableSeeder::class);
        //$this->call(GoodsTableSeeder::class);
        $this->call(CitiesTableSeeder::class);

        Model::reguard();
    }
}

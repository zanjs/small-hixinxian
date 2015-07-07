<?php

use Illuminate\Database\Seeder;
use App\Model\City;

class CitiesTableSeeder extends Seeder {

    public function run()
    {
        DB::table('cities')->delete();

        $_name = ['普陀区','奉贤区','虹口区','嘉定区','静安区','卢湾区','闵行区','浦东新区','宝山区','青浦区','松江区','徐汇区','杨浦区','闸北区','长宁区','黄浦区'];

        City::create([
            'name'       => '上海市',
            'tag'  => 'shs,shanghaishi',

        ]);
        for ($i=0; $i < count($_name); $i++) {
            City::create([
                'name'       => $_name[$i],
                'tag'  => 'shs,shanghaishi',
                'pid' => 3,
            ]);
        }
    }

}
<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use App;
use Session;
use Redirect;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Top\ComController;
use Cache;
use DB;

use App\Model\Product;




class WelcomeController extends ComController
{
    /**
     * 控制器
     * 用于前台展示
     * 2015年7月3日18:11:33
     * @author raoyc <youyadaojia@gmail.com>
     */
    public function index()
    {
        //

        if (empty($_SESSION['logged_user'])) {

//            return Redirect::to('/api/wei?Auth');
              //return Redirect::route('WeiAuth');
        }

        Session::put('key', 'ssss');

//        $product = Product::all()->take(100);
        /* 0 为下架产品 */
       // $product = Product::where('status','=','0')->orderBy('sort','desc')->take(100)->get();
        $product = Product::where('status','=','0')->orderBy('sort','desc')->get();


        //$product = DB::table('t_op_produce_manage')->get();
        //var_dump($product);
        return view('Home.index',['products'=>$product]);
    }


}

<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
|--------------------------------------------------------------------------
| 网站前台
|--------------------------------------------------------------------------
*/

Route::group(array(), function () {
    $Home = 'Home\\';

    # 前台欢迎首页
    Route::get('/', ['as' => 'home', 'uses' => $Home.'WelcomeController@index']);


});

# 微信授权验证
Route::get('/api/weiAuth', ['as' => 'WeiAuth', 'uses' => 'WeiAuth\AuthController@index']);
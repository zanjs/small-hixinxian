## 微信开发 ## 
7/3/2015 5:32:55 PM 



- 下次laravel 框架 - composer create-project laravel/laravel --prefer-dist
- 引入wechat 包 composer require "overtrue/wechat:2.0.*"


## 修改路由 ##

app/Http/routes.php

原

    Route::get('/', function () {
    	return view('welcome');
	});

修改为：

	Route::group(array(), function () {
    $Home = 'Home\\';

    // 前台欢迎首页
    Route::get('/', ['as' => 'home', 'uses' => $Home.'WelcomeController@index']);


});


## 创建控制器

	php artisan make:controller Home/WelcomeController
	php artisan make:controller Top/ComController

修改 Home/WelcomeController 继承 Top/ComController；

## 加载laravel-debugbar
	
	composer require barryvdh/laravel-debugbar

> 以上准备工作就OK了，下面正式开工啦，激动啊~~~；

## 编写 Home\WelcomeController

 在index方法里面 我们响应视图
 
 return view('Home.index');

 建立视图Home.index模板 依次在viewa 下建立 Home 文件夹 index.blade.php；

 把前端html页面复制到 index.blade.php 模板里面；

## 首页数据
 在首页的数据有以下
	
- 产品表
- 用户信息表

创建 Product model

	php artisan make:model Model/Prodoct

创建 User model

	php artisan make:model Model/User


配置 Product model

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

	//因为是在原有的数据库做开发，所以需要关闭 laravel 自带的更新时间戳

	protected $table = 'produce_manage';
    protected $primaryKey = 'produce_id';
    protected $fillable = ['produce_id', 'produce_name', 'stype_id','status','produce_suggest1','produce_pic','produce_price','sort','produce_spec','is_coupon'];
    public $timestamps = false;  //关闭自动更新时间戳


为了能更好的和框架融合；
觉得 数据库重新设计。

## 产品分类表 Sorts；

	php artisan make:model -m Model/Sort


来到 database/migrations/ 修改 sort 表
	
	public function up()
    {
        Schema::create('hi_sorts', function (Blueprint $table) {
            $table->increments('id');  /*主键*/
            $table->string('name',50);  /*名字*/
            $table->integer('pid')->default(0);  /*父id 默认0 无父*/
            $table->string('thumb')->default('');  /*缩略图*/
            $table->integer('row')->default(0); /*排序*/
            $table->timestamps();       /*时间*/
        });
    }

以上是 sort 需要的字段；

  	php artisan migrate


## 数据库填充 Seeder

atabase/seeds/` 下新建 `SortTableSeeder.php` 文件,内容如下

	

	<?php

		use Illuminate\Database\Seeder;
		use App\Model\Sort;
		
		class SortTableSeeder extends Seeder {
		
		  public function run()
		  {
		    DB::table('hi_sorts')->delete();
		
		    for ($i=0; $i < 10; $i++) {
		      Sort::create([
		        'name'   => '分类 '.$i,		       
		      ]);
		    }
		  }
		
		}

添加10条数据 

执行 

	composer dump-autoload
	php artisan db:seed

看看数据库里的 hi_sorts 里面是不是多了10条数据


## 系统产品数据 Products

	php artisan make:model -m Model/Product

修改模型 Model/Product
	
设置表名

	protected $table = 'hi_products';

修改表需要的字段

	public function up()
    {
        Schema::create('hi_products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',50);  /*名字*/
            $table->integer('sort');  /*所属分类*/
            $table->integer('status');  /*状态*/
            $table->string('thumb')->default('');  /*缩略图*/
            $table->string('body'); /*产品介绍*/
            $table->decimal('price', 5, 2); /*产品价格*/
            $table->string('spec'); /*产品规格*/
            $table->integer('row')->default(0); /*排序*/
            $table->timestamps();
        });
    }

下面需要回滚

	php artisan migrate:rollback;
	
执行建立默认产品表

	php artisan migrate;


## 商户表 Merchants 
	
	php artisan make:model -m Model/Merchant
	


修改 模型 添加表名字；

	 protected $table = 'merchants';

修改表字段

	public function up()
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',50);  /*名字*/
            $table->string('login_id',50);  /*登录id*/
            $table->integer('fare')->default(0);  /*配送费*/
            $table->integer('full_price')->default(0);  /*满多少面运费*/
            $table->string('address');  /*地址*/
            $table->string('api_key');  /*api key app*/
            $table->string('printer_key');  /*printer key 打印机*/
            $table->string('printer_code');  /*打印机终端号*/
            $table->string('printer_id');  /*打印机编号*/
            $table->string('printer_mobile');  /*打印机号码*/
            $table->timestamps();
        });
    } 



执行增加表 merchants

	php artisan migrate

给 merchants 表添加点数据吧


在 seeds 目录下面 新建 MerchantsTableSeeder.php  


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
	


## 商户上架产品表 goods

	php artisan make:mode -m Model/Goods

修改 Model/Goods 模型 添加以下

	protected  $table = 'goods';

修改 Goods 字段

	public function up()
    {
        Schema::create('goods', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id');            /*产品 id*/
            $table->decimal('product_price',10,2);   /* 产品价格 */
            $table->integer('merchant_id');          /*商户id*/
            $table->json('product_json');          /*产品json 存储*/
            $table->timestamps();
        });
    }


把表出入数据库吧；

	php artisan migrate

新建 seed 填充一些数据吧
	
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


## 下面我们开始建立用户表吧 UserDo

	php artisan make:model -m Model/UserDo


修改 Model/UserDo 模型 添加以下
	
	protected $table = 'user_dos';

修改 UserDo 字段
	
	public function up()
    {
        Schema::create('user_dos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',50); /*用户名*/
            $table->integer('type')->defaule(0); /*用户类型 0 为购买客户  */
            $table->tinyInteger('status')->default('1');  /*状态 1 正常 0 为时效*/
            $table->string('password',60); /*密码*/
            $table->string('ha_key'); /* 严 key */
            $table->string('open_id'); /*微信 open_id */
            $table->string('describe'); /* 描述 */
            $table->string('thumb'); /* 头像 */
            $table->integer('mobile'); /* 手机 */
            $table->string('merchant_id'); /* 商户id  */
            $table->timestamps();
        });
    }



	
把表出入数据库吧；

	php artisan migrate


## 有了用户表 ，还需要一个 收货地址表 user_address

	php artisan make:mode -m Model/UserAddress

修改 Model/user_address 模型 添加以下
	
	protected $table = 'user_addresses';

修改 user_address 字段

	 public function up()
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');       /*用户id*/
            $table->string('user_name');     /* 收货人姓名 */
            $table->string('city');           /* 城区 */
            $table->string('address');       /* 街道 */
            $table->string('tag');           /* 标签 */
            $table->integer('mobile');        /* 联系方式 */
            $table->float('gps_x');           /* 坐标经度 X lng */
            $table->float('gps_y');           /* 坐标经度 Y lat */
            $table->integer('merchant_id');           /* 商户id */
            $table->integer('is_default');           /* 是否默认地址 1 为默认 */
            $table->timestamps();
        });
    }


把表出入数据库吧；

	php artisan migrate


## 下面开始 建立 city 表吧
	
	php artisan make:model -m Model/City

修改 Model/City 模型 添加以下
	
	protected $table = 'cities';



修改 cities 字段

	public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('pid')->default(0);  /*父级 id 默认 0 顶级 无父级*/
            $table->string('name');             /*城市名*/
            $table->string('tag');             /* 标签 共搜索使用 */
            $table->tinyInteger('status')->defaule('1');  /*状态 1 正常 0 为时效*/
            $table->timestamps();
        });
    }


给 cities 插入一些数据；

创建 CitiesTableSeeder.php 填入如下

	<?php

	use Illuminate\Database\Seeder;
	use App\Model\City;
	
	class CitiesTableSeeder extends Seeder {

    public function run()
	    {
	        //DB::table('cities')->delete();
	
	        $_name = ['上海市'];
	        for ($i=0; $i < count($_name); $i++) {
	            City::create([
	                'name'       => $_name[$i],
	                'tag'  => 'shs,shanghaishi',
	
	            ]);
	        }
	    }

	}

	

## 购物车表 Shopping Cart

	php artisan make:model -m  Model/ShoppingCart




修改 Model/ShoppingCart 模型 添加以下

	 protected $table = 'shopping_carts';



修改 ShoppingCart 字段

	public function up()
    {
        Schema::create('shopping_carts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');         /*用户id*/
            $table->integer('merchant_id');    /*商户id*/
            $table->integer('product_id');    /*产品id*/
            $table->timestamps();
        });
    }


## 订单列表 order 

	php artisan make:mode -m Model/Order


修改 Model/Order 模型 添加以下

	protected $table = 'orders';

修改 Order 字段

	public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('order_no');                 /*订单编号*/
            $table->integer('user_id');                 /*用户id*/
            $table->integer('merchant_id');             /*商户id*/
            $table->json('product_json');               /*产品数据*/
            $table->timestamps();
        });
    }


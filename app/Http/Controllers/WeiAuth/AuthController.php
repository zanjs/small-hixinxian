<?php

namespace App\Http\Controllers\WeiAuth;

use Illuminate\Http\Request;

use Redirect;
use Session;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Overtrue\Wechat\Auth;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
        $appId  = 'wxc864d4ebc9f8b76c';
        $secret = 'e80738a85e733dda1bb77a3f142976b7';

        $auth = new Auth($appId, $secret);

        $auth->authorize($to = null, $scope = 'snsapi_userinfo', $state = 'STATE');


        // 请一定要自己存储用户的登录信息，不要每次都授权
        if (empty($_SESSION['logged_user'])) {
            $user = $auth->authorize(); // 返回用户 Bag
            $_SESSION['logged_user'] = $user;
            // 跳转到其它授权才能访问的页面

        }

        Session::put('key', 'value');
        return view('WeiAuth.index', ['_session'=> $_SESSION['logged_user'] ]);

    }


}

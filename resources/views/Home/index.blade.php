@extends('layout.main')
@section('title', '首页 small.hixinxian.com')
@section('link')
    <link rel="stylesheet" href="css/index.css" />
    <script>
        var _src = "{{ asset('/') }}",
              _T1 =  "touchstart",
              _T2 =  "touchmove",
              _T3 =  "touchend"  ;
    </script>
@stop
@section('body')
    <!--Location-->
    <header class="web-location">
        <a class="reChange" href="javascript:void(0)">
            <span class="shopName">配送地址：金沙江路3131号<i class="iconShopAdd" id="iconShopFrush"></i></span>
        </a>
    </header>
    <!--Location end-->
    {{--banner--}}
    <div class="x-banner"  style="">
        <ul class="con" id="touchSalse" ontouchstart="touchStart(event,'touchSalse');" ontouchmove="touchMove(event,'touchSalse');" ontouchend="touchEnd(event,'touchSalse');">
            <li><a href=""><img src="{{ asset('images/banner/01.jpg') }}" width="100%" /></a></li>
            <li><a href=""><img src="{{ asset('images/banner/02.jpg') }}" width="100%" /></a></li>
            <li><a href=""><img src="{{ asset('images/banner/03.jpg') }}" width="100%" /></a></li>
        </ul>
        <ul class="page"><li style="text-align:right;width:94%;margin:0px auto;"></li></ul>
    </div>
    {{--banner end --}}
    {{--nav --}}
    <nav class="x-nav" id="x-nav" >
        <a href="javascript:void(0);"><i class="icon-nav-1"></i><span>菜品查找</span></a>
        <a href="javascript:void(0);"><i class="icon-nav-2"></i><span>我要点评</span></a>
        <a href="javascript:void(0)" class="alert_pl"><i class="icon-nav-3"></i><span>优惠团购</span></a>
    </nav>
    {{--nav end --}}

    <div class="x-no-find" style="display: none;"><i class="icon"></i><p>附近没有门店哦，我们正在努力覆盖中</p></div>

    {{-- product list --}}
    <div class="x-push-goods x-load" id="pushGoods" style="display: block;">
        <h2>全部商品</h2>
        <ul class="clear" id="pushGoods_u">
            @foreach($products as $product)
                <li>
                    <a href="javascript:;">
                        <img src="{{ asset('images/icon/hiload.gif') }}" data-load="{{ $product -> thumb }}" class="imgLoad"  width="100%">
                        {{--  <div class="mark-teJBg"></div>
                          <div class="mark-teJ">特</div>
                          <div class="mark-teJ2">价</div>--}}
                        <span>
                            {{ $product -> name }}
                        </span>
                        <var>
                            ￥ {{ $product -> price }}
                        </var>
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
    {{-- product list end --}}
    {{-- footer nav --}}
    <footer class="footer-nav">
        <ul>
            <li class="index cur"><a class="react" href="javascript:void(0);"><i></i>嗨新鲜</a>
            <li class="cart"><a class="react" href="javascript:void(0);"><i></i>购物车</a>
            <li class="orderList"><a class="react" href="javascript:void(0);"><i></i>订单</a>
            <li class="mine"><a class="react" href="javascript:void(0)" ><i></i>我的</a>
        </ul>
    </footer>
    {{-- footer nav end --}}
    {{-- 收货地址 --}}
    <div class="mark" style="display: none"></div>
    <div class="addressZone" style="display: none">
        <i class="arrow-up">
        </i>
        <div class="address_now_box" id="address_now_box">
            <h4 class="address_now">
                请选择收货地址
            </h4>
        </div>
        <dl class="address_list">
            <dd class="items"   id="ale_location">
                <em class="address_pin">
                </em>

                <ul>
                    <li class="name">
                        当前位置
                    </li>
                    <li class="addr">
                        嘉定区丰庄地铁站西（金沙江路南）
                    </li>
                </ul>
                <i class="iconShopFrush" id="iconShopFrush_2"></i>
            </dd>
            <dd class="items"  >
                <em class="address_pin address_cur">
                </em>
                <div class="editTab">
                    当前位置
                </div>
                <ul>
                    <li class="name">
                        zan
                        <var>
                            15000003488
                        </var>
                    </li>
                    <li class="addr">
                        结研所
                    </li>
                </ul>
            </dd>
            <dd class="index_not_rss">
                <img src="{{ asset('images/address_pic_none.png') }}" alt=""/>
            </dd>
        </dl>
        <a href="javascript:void(0);" class="new_address">
            新建收货地址
        </a>
    </div>
    {{-- 收货地址 end  --}}
    {{-- --敬请期待 --}}
    <div class="alert_expect" >
        <img src="./images/alert_expect.png" alt="">
    </div>
    {{-- --敬请期待 end --}}
@stop

@section('footer')
    <script type="text/javascript">
        function resizeWindow(){changeWindowWidth(),$(window).resize(changeWindowWidth)}function changeWindowWidth(){var t=$(window).width()>640?640:$(window).width();$("div.x-banner,div.x-banner ul.con li").width(t),$("div.x-banner ul.con").width(t*$("div.x-banner ul.con li").length+20).height(320*t/640),$("div.x-banner").height(320*t/640),$("div.x-banner ul.page").css("top",320*t/640-20),$("div.x-banner #touchSalse li").height(320*t/640),$("div.x-banner #touchSalse li img").height(320*t/640).width(t);for(var e=new Array,n=0;n<$("div.x-banner ul.con li").length;n++)e.push("<em class='"+(0==n?"cur":"")+"'></em>");$("div.x-banner ul.page li").empty(),$("div.x-banner ul.page li").append($(e.join("")))}function touchStart(t){if($("#touchSalse").stop(!0,!0),$("#touchSalse").is(":animated"))return!1;clearTimeout(autoSroll);var e=t.touches[0].clientX,n=t.touches[0].clientY,o={x:e,y:n};touchArray.push(o)}function touchMove(t,e){var n=t.touches[0].clientX,o=t.touches[0].clientY;Math.abs(touchArray[0].x-n)<Math.abs(touchArray[0].y-o)||(t.preventDefault(),touchType=n<touchArray[0].x?1:-1,$("#"+e).css("left",n<touchArray[0].x?$("#"+e).position().left-(touchArray[0].x-n):$("#"+e).position().left+(n-touchArray[0].x)),touchArray[0].x=n,touchArray[0].y=o)}function touchEnd(t,e){touchArray.length=0;var n=$("#"+e).position().left;if(n>0)$("#"+e).animate({left:0},300,function(){setPageCation()}),touchIndex=0;else if(Math.abs(n)>($("#"+e+" li").length-1)*$("#"+e+" li").width())$("#"+e).animate({left:0-($("#"+e+" li").length-1)*$("#"+e+" li").width()},300,function(){setPageCation()}),touchIndex=$("#"+e+" li").length-1;else{var o=$("#"+e+" li").width();touchIndex+=touchType,touchIndex=0>touchIndex?0:touchIndex>$("#"+e+" li").length-1?$("#"+e+" li").length-1:touchIndex,$("#"+e).animate({left:0-o*touchIndex},300,function(){setPageCation()})}autoSroll=setTimeout(function(){autoScrollFn()},5e3)}function setPageCation(){$("div.x-banner ul.page li em").removeClass("cur"),$("div.x-banner ul.page li em:eq("+touchIndex+")").addClass("cur")}function autoScrollFn(){touchIndex=touchIndex+1>$("#touchSalse li").length-1?0:touchIndex+1;var t=$("#touchSalse li").width();$("#touchSalse").animate({left:0-t*touchIndex},300,function(){setPageCation()}),autoSroll=setTimeout(function(){autoScrollFn()},5e3)}var touchArray=new Array,touchType=0,touchIndex=0,autoSroll;$(function(){resizeWindow()}),autoSroll=setTimeout(function(){autoScrollFn()},5e3);
    </script>
    <script>
        require(['./js/common','./js/app/model/uf.min'],function(c){
            require(['controller/index/index']);
            require(['view/backTop.min']);
        })
    </script>
@stop
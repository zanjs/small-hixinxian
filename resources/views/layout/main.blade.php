<!DOCTYPE HTML>
<html>
<head>
    <meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <script src="{{ asset('js/app/view/viewport.js') }}"></script>
    <title>嗨新鲜 手机买菜神器 - @yield('title')</title>
    @section('link')
    @show
</head>
<body>
<div class="x-wrap" >
    <div class="innerWrap">
        @section('body')
        @show
    </div>
</div>
<div class="backTop" style="display:none;">
    <a href="#"></a>
</div>
<script src="js/libs/require.min.js"></script>
@section('footer')
@show

</body>
</html>



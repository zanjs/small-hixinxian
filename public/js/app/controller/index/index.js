/**
 * Created by zan on 2015/3/23.
 */
define(['layer','lazy'], function(a) {
            $("img.imgLoad").imgLoad({
                placeholder : "/assets/images/load.gif",
                effect: "fadeIn"
            });
        // 滚动到底部加载数据
        $(window).scroll(function(){
            if ($(document).scrollTop()+500 >= $(document).height() - $(window).height()) {
                var of = $("#onOff").val();
                if(of==="true"){
                }
            }
        });

        $(".x-nav").on("touchstart",'a', function () {
            $(this).css("background-color","#eee");
        })
        $(".x-nav").on("touchend",'a', function () {
            $(this).css("background-color","#FFF");
        });

        //弹出地址
        $("#addressClick").on("click",function(e) {
            var id = $("#loginId").val();
            e.stopPropagation();// 阻止冒泡事件
        });
        /* 更新默认地址 */
        $(".address_list").on("click", ".updateAddressIu", function() {
            var t = $(this);
        });

        //点击弹出背景
        $(".mark").on("click", function() {
            $(".mark").css("display", "none");
            $(".addressZone").css("display", "none");
        });
        //
        $(".addressZone").on("click", function(e) {
            e.stopPropagation();// 阻止冒泡事件
        });

        $("#iconShopFrush_2").on("click",function(e){
            var t = $(this);
            if(t.hasClass("iconShopLoading")){
                return false;
            }
            e.stopPropagation();
        });

        $(".mark").on('touchend',function(e){
            closeAlertI();
            e.stopPropagation();
        });

        $("#x-nav").on("touchend",'.alert_pl',function(){
            alertI();
        });
        $(".alert_expect").on("touchend",function(){
            closeAlertI();
        });



    //未开通服务弹出
    function alertI(){
        var winW = $(window).width();
         winH = $(window).height(),
         aBox = $(".alert_expect"),
         aBoxW = aBox.width(),
         aBoxH = aBox.height();
        $(".mark").show();
        aBox.show();
        var tp = (winH-aBoxH)/2;
        aBox.animate({top:tp},tp);
    }
//未开通服务关闭
    function closeAlertI(){
        var aBox = $(".alert_expect");
        //aBox.css("top",10);
        $(".mark").hide();
        $(".addressZone").hide();
        aBox.fadeOut();
    }

    

});


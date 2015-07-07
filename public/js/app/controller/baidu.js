/**
 * Created by Administrator on 2015/4/14.
 */
define(['jquery','layer','cookie','location'], function(e) {



    $(function(){
        require(['view/banner']);
        var nui = true;
        var myGeo = new BMap.Geocoder();

        if(nui){
            aMap();
        }else{
            var goC = getCookieAll();
            $(".x-load").fadeIn("5");
        }

        var gO = getCookieAll();
        alert(gO + "0000");
        //创建定位
        function aMap(){
            alert("加载百度Api");
            var goC = getCookieAll();
            var myGeo = new BMap.Geocoder();
            var gpsPoint = new BMap.Point(goC.lon, goC.lat);
            BMap.Convertor.translate(gpsPoint, 0, initMap); // 转换坐标
        }
        //回调得到信息
        function initMap(point){
            myGeo.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                var city = addComp.city;
                var district = addComp.district;
                var street = addComp.street;
                var streetNumber = addComp.streetNumber;
                var allAdd = city+district+street+streetNumber;
                alert("回调函数取坐标地址"+ allAdd);

                updateCookie(allAdd);
            })
        }

        //更新本地地址
        function updateCookie(a){
            var dateL = new Date();
            dateL.setTime(dateL.getTime() + (60 * 60 * 1000));

            $.cookie("xue_address",a,{
                "path":"/",
                "expires":dateL
            });

            alert($.cookie("xue_address") + "已经写入cookie");
        }


    });


    $("#iconShopFrush_2").on("click",function(e){
        var t = $(this);

        if(t.hasClass("iconShopLoading")){

            return false;
        }
        t.removeClass("iconShopFrush");
        t.addClass("iconShopLoading");
        baMap();
        e.stopPropagation();

    })


    $(".mark").click(function(e){
        closeAlertI();
        e.stopPropagation();

    });



    $(".alert_pl").on("click",function(){
        alertI();
    });
    $(".alert_expect").on("click",function(){
        closeAlertI();
    });
    function alertI(){
        var winW = $(window).width();
        var winH = $(window).height();
        var aBox = $(".alert_expect");
        var aBoxW = aBox.width();
        var aBoxH = aBox.height();
        $(".mark").show();
        aBox.show();
        var tp = (winH-aBoxH)/2;

        aBox.animate({top:tp},tp);
    }
    function closeAlertI(){
        var aBox = $(".alert_expect");
        //aBox.css("top",10);
        $(".mark").hide();
        $(".addressZone").hide();
        aBox.fadeOut();
    }


    require(['view/backTop']);



});
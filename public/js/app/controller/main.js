/**
 * Created by zan on 2015/3/23.
 */
define(['jquery','layer','cookie'], function($) {
    $(function(){
        require(['view/banner']);

       /* require(['model/register'],function(){
            //registerStar();
        });*/
        $("#selectPro").click();
        //class 说明
        //iconShopFrush 不旋转图标
        //iconShopLoading 旋转图标
        //iconShopAdd 下拉添加图标
        $("#ale_location").on("click",function(){
            var t = $(this);
            var s = t.find("#iconShopFrush_2");
            if(s.hasClass("iconShopLoading")){
                console.log("已经添加了哦");
                return false;
            }
            s.removeClass("iconShopFrush"); //删掉不转
            s.addClass("iconShopLoading"); //增加转动
        })

        $(".mark").click(function(){
            closeAlertI();
        })

        var i= 0;
        var list = '<dd class="items updateAddressIu"><em class="address_pin address_cur"></em><div class="editTab">当前位置</div><ul><li class="name">zan<var>15000003488</var></li><li class="addr">结研所</li></ul></dd>';
        for( var i =0 ;i<5;i++){
            list += list;
        }

        $(".address_list").on("click",".items",function(){
            var good = $("#pushGoods");
            good.html("<div class='xue-load-data'></div>");
        });
        var person={fname:"John",lname:"Doe",age:25};
        var txt = '';
        for ( x in person)
        {
            txt = txt  +  person[x] ;
        }
        //layer.msg(txt,1,9);
    //    弹出敬请期待
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
    })
    require(['view/backTop']);



});


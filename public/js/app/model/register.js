/**
 * Created by Administrator on 2015/4/22.
 */
//加载注册
addCSS();
function addCSS() {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = './css/animate.css?2015';
    document.getElementsByTagName("head")[0].appendChild(link);
    var link2 = document.createElement('link');
    link2.type = 'text/css';
    link2.rel = 'stylesheet';
    link2.href = './css/register.css?2015';
    //document.getElementsByTagName("head")[0].appendChild(link2);
}
function registerStar(){
    registerStar1();
    inputTextLab();
    //获取验证码
    $("#getPhoneCode").on("click touchend",function(){
        var t = $(this),m = $("#userPhone"),v = m.val(),l = v.length;
        if(l == 11){
            vaTenPhone(m);
            var stN = vaTenPhone(m);
            if(stN == 1){
                //    手机号码正确后执行 发送
                countDown(t);
                //发送手机验证码后 保存手机号
                $.cookie("xueRegPhone",v,{
                    "path":"/",
                    "expires":1
                });
            }
        }else{
            layer.msg("手机号码位数不对哦！");
        }
    });
    $("#reg_btnId1").on("click touchend",function(){
        var n = $("#regName");
        var v = n.val()
        if(v != ''){
            registerStar3();
            $(window).scrollTop(0);
            $.cookie("xueRegName",v,{
                "path":"/",
                "expires":1
            });
        }else{
            layer.msg("还不知道您姓名呢？",1,9);

        }

    })
    //地区
    $("#reg_btnId2").on("click touchend",function(){
        var sT = $("#selectText"),sA = sT.attr("data-sta"),sV = sT.val(),ad = $("#regAddressT"),aV = ad.val();
        if(sA != 1){
            layer.msg("城区选择不完整哦",2,9);
        }else if(aV == "" ){
            layer.msg("地址填写不完整哦",2,9);
            ad.focus();
        }else{
            $.cookie("xueRegCity",sV,{
                "path":"/",
                "expires":1
            });
            $.cookie("xueRegAddress",aV,{
                "path":"/",
                "expires":1
            });
            registerStar4();
            $(window).scrollTop(0);
        }

    })

    //开始选菜
    $("#reg_btnId3").on("click touchend",function(){
        var c = $("#code"),cv = c.val();
        if(cv == ""){
            layer.msg("手机验证码去哪了",1,9);
            return false;
        }else if(cv != "1234"){
            layer.msg("手机验证码不正确",1,9);
            return false;
        }else{
            //正确后取值啦
           var name = $.cookie("xueRegName"),city = $.cookie("xueRegCity"),address = $.cookie("xueRegAddress"),phone = $.cookie("xueRegPhone");
           var h ='您的注册信息如下：<br/>客官名：'+ name +'<br/>城区：'+ city +'<br/>地址：'+ address +'<br/>手机号：'+ phone +'<br/>改信息仅供数据测试使用';
            //layer.alert(h, {
            //    skin: 'layui-layer-molv' //样式类名
            //},"测试使用", function(){
            //    layer.closeAll();
            //    registerStarEnd();
            //});
            layer.msg(name+":注册成功啦",2,9,function(){
                registerStarEnd();
            });

        }

    });

    $("#selectCity").on("change",function(){
        var t = $(this),sT = $("#selectText") ;
        var c = t.children('option:selected').val();
        sT.val(c);
        sT.attr("data-sta",1);
        //t.css({"z-index":8});
        //$(".selectRemind").show();
    })

    //$("#selectPro").on("change",function(){
    //    var t = $(this),sT = $("#selectText");
    //    var c = t.children('option:selected').val();
    //    var v = sT.val();
    //    sT.val(v + c);
    //    sT.attr("data-sta",1);
    //    $("#selectCity").css({"z-index":11});
    //    $(".selectRemind").hide();
    //})
}
function inputTextLab(){
    $('.rText').bind("propertychange input focus", function (event) {
        var t  = $(this),pP =t.parents(".regLan"),sp = pP.find(".reg_btn1 span");
        if (t.val() != "") {
            sp.addClass("on");
        } else {
            sp.removeClass("on");
        }
        t.prev().hide();
    });

    $('.rText').on("blur",function(){
        var t  = $(this),pP =t.parents(".regLan"),sp = pP.find(".reg_btn1 span");
        if (t.val() != "") {
            t.prev().hide();
        } else {
            t.prev().show();
        }
    })
}

var R1 = $("#regLan_1");
var R2 = $("#regLan_2");
var R3 = $("#regLan_3");
rHce();
function rHce(){

    //$(window).scrollTop(0);
    //document.body.addEventListener('touchmove', function (event) {
    //    event.preventDefault(); }, false);
    var wH =$(window).height(),wW =$(window).width(),bo = $("#registered_wrap"),boW= bo.width(),rH1 = R1.height(),rH2 = R2.height(),rH3 = R3.height(),v1= (wH-rH1)/2,v2= (wH-rH3)/2,v3= (wH-rH3)/2;
    $("body").css({"overflow":"hidden","height":"100%"});
    bo.css({"left":(wW-boW)/2});

    R1.css({"top":v1});
    R2.css({"top":v2});
    R3.css({"top":v3});
    $(window).scrollTop(0);
}
function registerStar1(){
    var iF =  $("#registered_in");
    iF.css({"display":"block"}).addClass('animated zoomInUp');
    setTimeout(function(){
        registerStar2();
        setTimeout(function() {
            iF.removeClass("animated zoomInUp");
        },1000)
    },500)
}
//1
function registerStar2(){
    R1.fadeIn("5").addClass('animated lightSpeedIn');

}
//2
function registerStar3(){

    R1.removeClass("lightSpeedIn").addClass('animated fadeOutLeft');
    setTimeout(function(){
        R2.fadeIn("5").addClass('animated fadeInRight');
        setTimeout(function(){
            R1.css({"display":"none"}).removeClass('fadeInRight');
        },4000)
    },500);

}
//3
function registerStar4(){
    //R2.removeClass("fadeInRight").addClass('zoomOut');
    R2.removeClass("fadeInRight").addClass('fadeOutLeft');
    setTimeout(function(){
        //R3.css("display","block").addClass('animated zoomInUp');
        R3.css("display","block").addClass('animated fadeInRight');
        setTimeout(function(){
            R2.css({"display":"none"}).removeClass('hinge');
        },4000)
    },500)
}
//开始选菜结束
function registerStarEnd(){
    //R3.addClass("rollOut");
    //setTimeout(function(){
    //    R2.css("display","block").addClass("zoomOutRight");
    //    setTimeout(function(){
    //        R1.css("display","block").addClass("rotateOutUpRight");
    //        setTimeout(function(){
    //            var wb = $("#registered_in");
    //            wb.addClass("animated flipOutX");
    //
    //        },200)
    //    },1000)
    //},800)

    var wb = $("#registered_in"),box = $("#registered_wrap");
    box.fadeOut("5");
    wb.addClass("animated flipOutX");
}

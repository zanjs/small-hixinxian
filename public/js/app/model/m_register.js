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
/*发送验证码*/
function registerStar(){
    registerStar1();
    inputTextLab();
    //获取验证码
    $("#getPhoneCode").on("click touchend",function(){
        var t = $(this),m = $("#userPhone"),v = m.val(),l = v.length,s=t.attr("data-n");
        if(l == 11){
            vaTenPhone(m);
            var stN = vaTenPhone(m);
            if(stN == 1){
            	
            	if(s == "true"){
                	//发送手机验证码	
                    sendV(v);
                }
                // 手机号码正确后执行 发送
                countDown(t);  
            }
        }else{
            layer.msg("手机号码位数不对哦！");
        }
    });
    //地区
    $("#reg_btnId2").on("click touchend",function(){
        var sT = $("#districtText"),V2 = $("#districtText").attr("data-sta"),sA = sT.attr("data-sta"),sV = sT.val(),ad = $("#regAddressT"),aV = ad.val();
        if(sA != 2){
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
        }

    })

    //开始选菜
    $("#reg_btnId3").on("click touchend",function(){
        var c = $("#mobileToken"),cv = c.val(),rn = $("#randomNum").val(),mo1=$("#mobiles").val(),mo2=$("#userPhone").val();
        if(cv == ""){
            layer.msg("手机验证码去哪了",1,9);
            return false;
        }else if(mo1 != mo2){
        	layer.msg("亲,不要随便更改手机号哦！", 1, 9);
			return false;
        }else{
        	/* ajax判断验证码是否正确 */
			$.ajax({
				type : "POST",
				url : "verificationAction!VerificationMobile",
				data : "mobileToken=" + cv + "&randomNum=" + rn,
				success : function(msg) {
					var items = msg.result;
					if (items == "200") {
						//提交表单
						$("#loginform").submit();
					} else if (items == "400") {
						layer.msg("验证码错误", 1, 8);
						return false;
					} else if (items == "500") {
						layer.msg("网络异常,请重新发送", 1, 8);
						return false;
					}
				}
			});
        }

    });

    /*市*/
    $("#selectCity").on("change",function(){
        var t = $(this),sT = $("#selectText"),dt = $("#districtText");
        var c = t.children('option:selected').val(),cd = t.children('option:selected').attr("data-v");;
        sT.val(c);
        if(cd =="1"){
        	dt.val("请选择区域");
        	dt.attr("data-sta","0");
        	return false;
        }
        
        $("#districtText").attr("data-sta",1);
      
    });
    /*区*/
    $("#selectDistrict").on("change",function(){
        var t = $(this),sT = $("#districtText"),tS = sT.attr("data-sta") ;
        
        if(tS=="0"){
        	layer.msg("还没选择城市哦");
        	return false;
        }
        var c = t.children('option:selected').val(),cd = t.children('option:selected').attr("data-v");
      
        sT.val(c);
        if(cd =="1"){  	
        	sT.val("请选择区域");
        	sT.attr("data-sta",1);
        	return false;
        }
        sT.attr("data-sta",2);
      
    });

   
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

    var wH =$(window).height(),wW =$(window).width(),bo = $("#registered_wrap"),boW= bo.width(),rH1 = R1.height(),rH2 = R2.height(),rH3 = R3.height(),v1= (wH-rH1)/2,v2= (wH-rH3)/2,v3= (wH-rH3)/2;
    bo.css({"left":(wW-boW)/2});
    R1.css({"top":v1});
    R2.css({"top":v2});
    R3.css({"top":v3});
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
    $("#reg_btnId1").on("click touchend",function(){
        var n = $("#regName");
        var v = n.val()
        if(v != ''){
            registerStar3();
            $.cookie("xueRegName",v,{
                "path":"/",
                "expires":1
            });
        }else{
            layer.msg("还不知道您姓名呢？",1,9);

        }

    })
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

    var wb = $("#registered_in"),box = $("#registered_wrap");
    box.fadeOut("5");
    wb.addClass("animated flipOutX");
}
//验证手机号
function vaTenPhone(a){
    var v = a;
    var val = v.val();
    var l = val.length;
    var bt = 0;
    var reg = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
    if(reg.test($.trim(val)) && l == 11){
        bt = 1;
        }else{
        layer.msg("手机号码格式不对！");
    }
    return bt;
}

//发送倒
function countDown(a){

    var t = a,staN = t.attr("data-n");
    if(staN != "true"){
        return false;
    }else{
        t.attr("data-n","false");
        var count = 60;
        var loop = function(){
            if(count < 0) {
                t.text('重新获取');
                t.attr("data-n","true");
                return;
            }
            t.text(count+'秒后可重新发送');
            count--;
            setTimeout(loop,1000);
        };
        loop();
    }
   
}


/*发送验证码*/
function sendV(m){
	
	$.ajax({
		type : "POST",
		url : "oploginAction!getRandomNumber",
		data : "mobile=" + m,
		success : function(msg) {
			var items = msg.result;
			var phone = msg.mobile;
			if (items != null && items != ""
					&& phone != null && phone != "") {
				$("#randomNum").val(items);
				$("#mobiles").val(phone);
			} else {
				layer.msg("网络异常，请重新发送", 1, 8);
				return false;
		}
	}
});

}

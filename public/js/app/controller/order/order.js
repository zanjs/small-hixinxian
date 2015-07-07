/**
 * Created by Administrator on 2015/4/8.
 */
define(['layer'],function(a){

    require(['model/order/m_order'],function(){

       /* console.log(timeArray(hours));
        console.log(hours);*/
        timeHtml(hours);
        dayHtmlM(guoT);

        /*弹出选择支付方式*/

        $(".play-btn").on("touchend",function(){
            var tI = $(this).data("id");
            console.log(tI);
           $(".alert-bg").fadeIn("5");
           $("#order-alert-c-"+tI).fadeIn("5");
        });
        /*选择支付方式*/
        $(".select-play").on("touchend","li",function(){

            var t = $(this),
                tI = t.data("id");
                tB = t.find(".checkbox").data("btn");
                tt = t.find("span").text();
                tH = t.find(".checkbox").data("paly");
            t.parents("ul").find(".checkbox").removeClass("checked");
            t.find(".checkbox").addClass("checked");
            $("#HiddenType-"+tI).val(tH);
            $(".alert-bg").fadeOut("5");
            $(".order-alert-c").fadeOut("5");
            $("#TypeText-"+tI).text(tt);
            console.log(tH);
            if(tB){
                $("#codButton").text(tB)
            }
            
        });
        /*显示选择优惠券*/
        $("#couponCode").on("click",function(){
             var box1 =$("#order_box_main"),box2 = $("#coupon_box_main");
            box1.fadeOut("50");box2.fadeIn("50");
        });
        /*关闭选择优惠券*/
        $("#coupon_close").on("click",function(){
            var box1 =$("#order_box_main"),box2 = $("#coupon_box_main");
            box2.fadeOut("50");box1.fadeIn("50");
        });
        /*选中默认抵用券*/
        $("#coupon-wrap").on("click",".item-list",function(){
            var t = $(this);
            placeCoupon(t)
        })
        /*使用抵用券*/
        $("#useCouponBtn").on("click",function(){
            useCoupon()
        })
        /*选中配送时间*/
        $("#selectDay").change(function(){
            var t = $(this);
            var val = t.val();
            var dv = t.attr("data-v");
            if(val == GetDateStr(0)){
                timeHtml(hours);
                if(guoT>1930){
                    layer.msg("已经打烊,选择明天配送",2,9);
                }
            }else{
                timeHtml(6);
            }
        })
        
        /*form单击*/
        $("#codButton").on("touchend",function(){
            SubmitLocked();
            var playT = $("#HiddenType-2").val();
            playT == 1 ? pay() : orderPay();
        })
        /**/
        /*去支付*/
        function pay(){
           
            if (typeof WeixinJSBridge == "undefined") {
                    alert("请先通过微信访问！");
                }
                else {
                    
                    WeixinJSBridge.invoke('getBrandWCPayRequest',{
                        "appId" : "wxc864d4ebc9f8b76c", //公众号名称，由商户传入
                        "timeStamp" : "1395712654", //时间戳 这里随意使用了一个值
                        "nonceStr" : "968c9b4f09cbb7d7925f38aea3484111", //随机串
                        "package" : "prepay_id=wx2015062609434418fac426b90981584744", //扩展字段，由商户传入
                        "signType" : "MD5", //微信签名方式:sha1
                        "paySign" : "8e73ecf3b1679ae97fd11f0d66aed647" //微信签名
                    }, function(res){
                        SubmitLockedOpen();
                        WeixinJSBridge.log(res.err_msg);
                        cb(res);
                        // 返回 res.err_msg,取值
                        // get_brand_wcpay_request:cancel 用户取消
                        // get_brand_wcpay_request:fail 发送失败
                        // get_brand_wcpay_request:ok 发送成功
                        alert(res.err_code + res.err_desc);
                    });
                }
        }
       /*提交订单*/
        function orderPay(){
        	var selectDay = $("#selectDay").val();
        	var selectTime = $("#selectTime").val();
        	var mId = $("#mId").val();
        	var lId = $("#lId").val();
        	var aId = $("#aId").val();
        	if(selectTime!="no"){
        		if(selectDay!="" && selectTime!="" && mId!="" && lId!="" && aId!=""){
            		$("#orderform").submit();	
            	}else{
            		layer.msg("亲,慢点操作！",1,9);
            		return false;
            	}  	
        	}else{
        		layer.msg("我们已经打烊了！",1,8);
        		return false;
        	}
        };

        // 提交锁
        function SubmitLocked(){
            $(".alert-bg").show();
        }
        function SubmitLockedOpen(){
            $(".alert-bg").hide();
        }
        
    });



})
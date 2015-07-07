/**
 * Created by Administrator on 2015/4/9.
 */
define([ 'layer' ], function(a) {
	layer.load();
	require([ 'view/sta' ], function() {
		$(function() {

			var lId = $("#lId").val(),
			 mId = $("#mId").val(),
			 aId = $("#aId").val(),
			 dateTime = $("#dateTime").val(),
			 dateDay = $("#dateDay").val(),
			 remark = $("#remark").val(),
			 mobile = $("#mobile").val(),
			 payType = $("#payType").val();

			 payType = 1;
			 payType == 1 ? weiPay() : submitOrder();

			 
			 /*微信支付*/
			 function weiPay(){
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
			function submitOrder(){
				$.ajax({
					type : "POST",
					url : "orderAction!getOrderState",
					data : "loginId=" + lId + "&merchantsId=" + mId + "&addressId="
							+ aId + "&dateTime=" + dateTime + "&dateDay=" + dateDay
							+ "&remark="+remark+"&mobile="+mobile+"&orderStatus=saveOrder",
					success : function(msg) {
						var items = msg.result;
						
						if (items == "200") {
							layer.closeAll();
							orderSta1(3);
						} else {
							layer.closeAll();
							orderSta1(2);
						}
					}
				});

				var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc864d4ebc9f8b76c&redirect_uri=http://us.hixinxian.com/oauthAction!getCode&response_type=code&scope=snsapi_base&state=901a8984d9f7fe4c3b14c3440bf1fb36#wechat_redirect";
				jumpUrl(5,$("#orderStaTime"),url);
			}
			
			
		})
	});

})
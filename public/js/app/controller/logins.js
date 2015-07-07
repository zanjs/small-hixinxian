//login.js

define([ 'layer' ], function(layer) {
	$(function() {
		var staN = true;
		//手机正则
		var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
		/* 获取验证码 */
		$("#getRandom").on(
				"click",
				function() {
					var mobile = $("#mobile").val();
					if(!staN){
						return false;
					}
					if ($.trim(mobile) == "") {
						layer.msg("手机号码不能为空！");
						return false;
					}
						
					if (!reg.test($.trim(mobile))) {
						layer.msg("手机号码格式不对！");
						return false;
					}
					
					
					if (mobile.length != 11) {
						layer.msg("手机号码位数不对哦！");
						return false;
					}
							
							
					$.ajax({
							type : "POST",
							url : "oploginAction!getRandomNumber",
							data : "mobile=" + mobile,
							success : function(msg) {
								var items = msg.result;
								var phone = msg.mobile;
								if (items != null && items != ""
										&& phone != null && phone != "") {
									$("#randomNum").val(items);
									$("#mobiles").val(phone);
									countDown();

								} else {
									layer.msg("网络异常，请重新发送", 1, 8);
									return false;
							}
						}
					});
						

				});

		/* 获取验证码按钮 */
		function countDown() {
			staN = false;
			var count = 60;
			var t = $("#getRandom");
			var loop = function() {
				if (count < 0) {
					t.text('重新获取');
					staN = true;
					return;
				}
				t.text(count + '秒后可重新发送');
				count--;
				setTimeout(loop, 1000);
			};
			loop();
		}

		// 验证
		$('#getToken').on(
				'click',
				function() {
					var mob = $("#mobile");
					var mobText = mob.val();
					//手机正则
					var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
					var mobileToken = $("#mobileToken").val();
					var randomNum = $("#randomNum").val();
					var mobiles = $("#mobiles").val();

					// 验证为空
					if ($.trim(mob.val()) == "") {
						layer.msg("手机号码不能为空！");
						return false;
					}
					
					if (!reg.test($.trim(mobText))) {
						layer.msg("手机号码格式不对！");
						return false;
					}
					
					
					if (mobText.length != 11) {
						layer.msg("手机号码位数不对哦！");
						return false;
					}

					if (mobileToken === "" || mobileToken === null) {
						layer.msg("验证码不允许空！");
						return false;
					}

					if (mobiles != $.trim(mob.val())) {
						layer.msg("亲,不要随便更改手机号哦！", 1, 9);
						return false;
					} else {
						/* ajax判断验证码是否正确 */
						$.ajax({
							type : "POST",
							url : "verificationAction!VerificationMobile",
							data : "mobileToken=" + mobileToken + "&randomNum="
									+ randomNum,
							success : function(msg) {
								var items = msg.result;
								if (items == "200") {
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

	});

});

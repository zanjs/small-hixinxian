/**
 * opinion.js
 */
define([ 'layer' ], function(layer) {
	/* 提交建议 */
	$("#sendOpinion").on("click", function() {
		var loginId = $("#loginId").val();
		var userFeedBack = $("#userFeedBack").val();
		if ("" != userFeedBack) {
			/* 提交留言 */
			$.ajax({
				type : "POST",
				url : "suggestAction!addAdvice",
				data : "loginId=" + loginId + "&userFeedBack=" + userFeedBack,
				dataType : "json",
				success : function(msg) {
					var items = msg.result;
					if (items == "200") {
						layer.msg("您的建议已提交,谢谢您的支持",1,8);
						$("#userFeedBack").val('');
						return;
					} else {
						layer.msg("您的网络不太好",1,9);
						return;
					}
				}

			});

		}else{
			layer.msg("请输入您宝贵的建议",1,9);
		}

	});

});
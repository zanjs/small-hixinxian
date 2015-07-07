/**
 * addresslits
 */
define([ 'layer' ],function() {

    require(['model/uf.min'],function(){
			/* 替换默认地址 */
			$(".address_list").on("click", ".addressId", function() {
				var t = $(this);

				var sta = t.attr("data-sta");
				if (sta) {
					layer.msg("操作频繁哦，休息一下吧(*^__^*) 嘻嘻");
					setTimeout(function() {
						t.removeAttr("data-sta");
					}, 1000);
					return false;
				}

				if (t.find(".radiobox").hasClass("radiochecked")) {
					return false;
				}

				var box = $(".address_list");
				box.find(".radiobox").removeClass("radiochecked");
				t.find(".radiobox").addClass("radiochecked");

				// 获取到替换的地址ID
				var addressId = t.find(".name").attr("data-val");
				var loginId = t.find(".name").attr("data-loginId");

				/* 替换默认地址 */
				$.ajax({
					type : "POST",
					url : "addressMsgAction!findByloginId",
					data : "addressId=" + addressId + "&loginId=" + loginId,
					dataType : "json",
					success : function(msg) {
						var items = msg.result;
						if (items == "200") {
							console.log("默认地址更改成功");
						} else {
							console.log("默认地址更改失败");
						}
					}
				});
			});


			/* 删除地址 */
			$(".address_list").on("click", ".trashArea", function(e) {
				var t = $(this);// 当前
				var par = t.parents(".items");// 父亲
				var r = par.find(".radiobox");
				if (r.hasClass(".radiochecked")) {
					layer.msg("默认地址不可删除哦！", 1, 9);
					return false;
				}

				var name = par.find(".name");
				var addressId = name.attr("data-val");// 获取地址id

				e.stopPropagation();// 阻止冒泡事件
				
				layer.confirm('确定删除收货地址吗？', function(){
					/* 删除地址 */
					$.ajax({
						type : "POST",
						url : "deleteAddressAction!deleteByIdAddress",
						data : "addressId=" + addressId,
						dataType : "json",
						success : function(msg) {
							var items = msg.result;
							if (items == "200") {
								par.remove();
								layer.msg("地址删除成功！", 1,8);
							} else if (items == "0") {
								layer.msg("默认地址不可删除哦！", 1, 9);
							} else {
								layer.msg("网络异常,地址删除失败", 1, 9);
							}
						}
					});
				});
				
			});

			
			/* 修改地址 */
			$(".address_list").on("click", ".editArea", function(e) {
				var t = $(this);// 当前
				var par = t.parents(".items");// 父亲
				var r = par.find(".radiobox");

				var name = par.find(".name");
				var addressId = name.attr("data-val");// 获取地址id
				var loginId = name.attr("data-loginId");

				$("#updateAddressid").val(addressId);
				$("#updateLoginid").val(loginId);
				
				if ($("#updateAddressid").val() != "" && $("#updateLoginid").val() != "") {
					$("#byAddressform").submit();// 提交form
				} else {
					layer.msg("您的网络异常", 1, 9);
				}
				e.stopPropagation();// 阻止冒泡事件
			});
    });
});
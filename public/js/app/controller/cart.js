/**
 * Created by Administrator on 2015/4/7.
 */
define([ 'layer' ], function($) {
	
	$(function() {

		// 添加商品数量
		$("#goodsList").on("click", ".plus", function() {
			var sPrice = $("#sPrice");
			var sPriceN = Number(sPrice.text());

			var t = $(this);
			var p = t.parent();
			var input = p.find(".buyNumber");
			var vId = input.attr("data-id");
			
			var shpId = input.attr("data-shp");// 购物车ID
			var mId = input.attr("data-mId");// 商户ID
			var num = parseInt(input.val());

			var restN = 100; // 查询商品剩余数量
			if (num >= restN) {
				layer.msg('不可以在添加了哦', 1, 9);
				return false;
			}
			
			if (shpId != null && shpId != "") {
				
				$.ajax({
					type : "POST",
					url : "orderAction!getOrderState",
					data : "shppingId=" + shpId + "&merchantsId="+mId
							+ "&orderStatus=add",//加1
					success : function(msg) {
						var r = msg.result;
						if (r == "USUSSECC") {
							layer.load(1);
							input.val(num + 1);
							upDataP();
							upDataG();
						} else {
							layer.msg("你的网络不行唉", 1, 8);
						}
					}
				});
				
			}else {
				layer.msg("你的网络不行唉", 1, 8);
			}
		});
		
		
		// 减少商品数量
		$("#goodsList").on(
				"click",
				".minus",
				function() {
					var t = $(this);
					var p = t.parent();
					var input = p.find(".buyNumber");
					var vId = input.attr("data-id");
					var shpId = input.attr("data-shp");// 购物车ID
					var mId = input.attr("data-mId");// 商户ID
					var num = parseInt(input.val());
					var restN = 10; // 查询商品剩余数量
					if (num <= 1) {
						layer.confirm('确定要删除吗', function(e) {
							layer.load(1);
							if (shpId != null && shpId != "") {
								/* 删除 */
								$.ajax({
									type : "POST",
									url : "orderAction!getOrderState",
									data : "shppingId=" + shpId +"&merchantsId="+mId
											+ "&orderStatus=delete",
									success : function(msg) {
										var r = msg.result;
										if (r == "DSUSSECC") {
											t.parents(".items").remove();
											layer.msg("删除成功", 1, 9);
											layer.load(1);
											input.val(num - 1);
											upDataP();
											upDataG();
										} else {
											layer.msg("删除失败", 1, 8);
										}
									}
								});
							} else {
								layer.msg("你的网络不行唉", 1, 8);
							}

							layer.close(e);

						})
						return false;
					}else{
						if (shpId != null && shpId != "") {
							$.ajax({
								type : "POST",
								url : "orderAction!getOrderState",
								data : "shppingId=" + shpId+"&merchantsId="+mId
										+ "&orderStatus=minus",//减1
								success : function(msg) {
									var r = msg.result;
									if (r == "USUSSECC") {
										layer.load(1);
										input.val(num - 1);
										upDataP();
										upDataG();
									} else {
										layer.msg("你的网络不行唉", 1, 8);
									}
								}
							});
							
						}else {
							layer.msg("你的网络不行唉", 1, 8);
						}		
					}	
				})
		// 单击选中/反选商品
		$("#goodsList").on("click", ".checkbox", function() {
			var t = $(this);
			if (t.hasClass("checked")) {
				layer.load(1);
				t.removeClass("checked");
			} else {
				layer.load(1);
				t.addClass("checked");
			}

			upDataG();
		})
		// 全选商品
		$("#topBtn").on("click", "#checkAll", function() {
			var t = $(this);
			if (t.hasClass("checked")) {
				layer.load(1);
				t.removeClass("checked");
				NoCheckAll();
			} else {
				layer.load(1);
				t.addClass("checked");
				CheckAll();
			}

		});
		// 删除选中商品
		$("#topBtn").on("click", "#delGoods", function() {
			layer.confirm('确定要删除吗', function(e) {
				var box = $("#goodsList");
				var items = box.find(".items");
				var array = ""; // 获取要删除的购物车商品id
				var s = [];
				items.each(function(i) {
					var ts = $(this);
					var check = ts.find(".checkbox");
					if (check.hasClass("checked")) {
						//ts.remove();
						var input = ts.find(".buyNumber");
						var shpId = input.attr("data-shp");// 购物车ID;
						if(array==""){
							array+=shpId;	
						}else{
							array+="-"+shpId;
						}	
						s.push(shpId);
					}
				});	
				
				if(array!=""){
					$.ajax({
						type : "POST",
						url : "orderAction!getOrderState",
						data : "shppingId=" + array + "&orderStatus=deletes",
						success : function(msg) {
							var r = msg.result;
							if (r == "DSUSSECC") {
								
								for(var i = 0;i<s.length;i++){
									$("#"+s[i]).remove();
								}
								
								layer.msg("删除成功", 1, 9);
								upDataG(); // 更新数量
							} else {
								layer.msg("删除失败", 1, 8);
							}
						}
					});
				}
				
				
				
				
			});

		})
		// 去结算
		$("#joinCart").on("click", function() {
			
			if($("#mId").val() !="" && $("#lId").val()!="" && $("#addressId").val() !=""){
				$("#orderform").submit();
			}
			
		});
		// 反选function
		function NoCheckAll() {
			var box = $("#goodsList");
			var items = box.find(".items");
			items.each(function(i) {
				var ts = $(this);
				var check = ts.find(".checkbox");
				check.removeClass("checked");
			})
		}
		// 全选function
		function CheckAll() {
			var box = $("#goodsList");
			var items = box.find(".items");
			items.each(function(i) {
				var ts = $(this);
				var check = ts.find(".checkbox");
				check.addClass("checked");
			})

			upDataG();
		}
		// 判断选中的商品删除
		function CheckedDel() {
		
		}

		// 更新商品数
		function upDataG() {
			
			var box = $("#goodsList");
			var items = box.find(".items");
			var it = 0;
			items.each(function(i) {
				var ts = $(this);
				var check = ts.find(".checkbox");
				var input = ts.find(".buyNumber");
				var inputV = input.val();
				if (check.hasClass("checked")) {
					it += parseInt(inputV);
				}
			});
			$("#sale-off-num").text(it);
			upDataB();
			upDataP();
			
		}
		upDataG();
		// 更新总价
		function upDataP() {

			var box = $("#goodsList");

			var items = box.find(".items");

			var price = 0;
			items.each(function(i) {
				var ts = $(this);

				var check = ts.find(".checkbox");

				if (check.hasClass("checked")) {

					var input = ts.find(".buyNumber");

					var num = input.val();

					var pic = Number(input.attr("data-pic")) * Number(num);

					price += pic;

				}
			});
			price = toDecimal2(price);
			$("#sPrice").text(price);
			cartNull();
		}
		
		//判断商品购物车是否为空
		function cartNull(){
			
		    var box = $("#goodsList"); 
		    var item = box.find(".items");	  
		    var noD = $("#cart_num_no");	   
		    var footD = $(".footerBar");	   
		    var topBtn = $("#topBtn");	  
		    if(item.length<1){
		        noD.show();
		        footD.hide();
		        topBtn.hide();
		    }else{
		        noD.hide();
		    }
		}

		// 更新全选按钮
		function upDataB() {
			var box = $("#goodsList");
			var checked = box.find(".checked");
			if (checked.length < 1) {
				$("#checkAll").removeClass("checked");
			}

		}
		// 获取选中的商品id 号数组
		function selId() {
			var box = $("#goodsList");
			var items = box.find(".items");
			var id = [];
			items.each(function(i) {
				var ts = $(this);
				var check = ts.find(".checkbox");
				if (check.hasClass("checked")) {
					var input = ts.find(".buyNumber");
					var vId = input.attr("data-id");
					id.push(vId);
				}
			});

			return id;
		}

		// 精确位数
		function toDecimal2(x) {
			var f = parseFloat(x);
			if (isNaN(f)) {
				return false;
			}
			var f = Math.round(x * 100) / 100;
			var s = f.toString();
			var rs = s.indexOf('.');
			if (rs < 0) {
				rs = s.length;
				s += '.';
			}
			while (s.length <= rs + 2) {
				s += '0';
			}
			return s;
		}

	})
})
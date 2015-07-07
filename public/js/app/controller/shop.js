/**
 * Created by Administrator on 2015/3/25. 商品详细页
 */
define([ 'layer' ],function(a) {
			$(function() {
				var loginId = $("#lId").val();
				var mId = $("#mId").val();
				if (null != loginId && "" != loginId && null != mId && ""!=mId) {
					/* 获取用户默认地址 */
					$.ajax({
						type : "POST",
						url : "defaultAddressAction!getFindDefault",
						data : "loginId=" + loginId +"&merchantsId="+mId,
						dataType : "json",
						success : function(msg) {
							var items = msg.result;
							var price = msg.produceprice;
							var num = msg.producenum;
							if (items == "500") {
								console.log("网络异常");
							} else {
								$("#addressId").val(items);
								$("#shoppingPrice").val(
										toDecimal2(Number(price)));
								$("#shoppingNum").val(parseInt(num));

								$(".num-u-s").html(parseInt(num));
								$(".price-s").html(
										"￥" + (toDecimal2(Number(price))));
							}
						}
					});
				}
				/* 拉取推荐商品 */
				recommendShpping();

				// 加入购物车 需要获取的局部信息
				var addBtn = $("#joinCartBtn");
				var btnL = addBtn.offset().left;
				var btnT = addBtn.offset().top;
				var car = $("#shop_cart");
				var carL = car.offset().left;
				var carT = car.offset().top;
				var ImgA = $("#imgShowA");
				var ImgT = ImgA.off().top;
				var ImgH = ImgA.height();
				var ImgL = ImgA.off().left;
				var src = ImgA.find("img").attr("src");
				var stc = '<img src="'
						+ src
						+ '" class="animateImg" style="display:none; position: absolute;width:150px">';

				// 加入购物车 click
				addBtn.on("click",function() {
									var winSc = $(window).scrollTop();
									var winH = $(window).height();
									var htH = $(document).height();
									$("body").append(stc);

									// 加入购物车操作
									var pId = $("#pId").val();
									var mId = $("#mId").val();
									var lId = $("#lId").val();
									var addressId = $("#addressId").val();
									var producePrice = $("#producePrice").val();
									
									/*不存在默认地址*/
									if("" != addressId){
										if ("" != pId && "" != mId && "" != lId	&& "" != producePrice) {
											$.ajax({
														type : "POST",
														url : "shoppingAction!insertShopping",
														data : "loginId=" + lId
																+ "&merchantsId="
																+ mId
																+ "&productId="
																+ pId
																+ "&addressId="
																+ addressId
																+ "&producePrice="
																+ producePrice,
														dataType : "json",
														success : function(msg) {
	
															var items = msg.result;
															if (items == "200") {
	
																// 当前商品总价
																var price_t = $(
																		"#shoppingPrice")
																		.val();
																// 当前商品总数量
																var Num_t = $(
																		"#shoppingNum")
																		.val();
	
																$(".num-u-s")
																		.html(
																				parseInt(Num_t) + 1);
																$(".price-s")
																		.html(
																				"￥"
																						+ (toDecimal2(Number(price_t)
																								+ Number(producePrice))));
	
																$("#shoppingPrice")
																		.val(
																				toDecimal2(Number(price_t)
																						+ Number(producePrice)));
																$("#shoppingNum")
																		.val(
																				parseInt(Num_t) + 1);
	
																$(".animateImg")
																		.css({
																					left : ImgL,
																					top : ImgT+ ImgH
																				})
																		.animate({
																					width : 0,
																					height : 0,
																					left : carL,
																					top : winH
																							+ winSc
																				},
																				800,
																				function() {
																					$(".animateImg").remove();
																				});
	
															} else {
																layer.msg("网络异常,请检查您的网络",1,8);
															}
														}
													});
										} else {
											layer.msg("网络异常！",1,8);
										}
									}else{	
										
										 if(confirm("请添加收货地址哦")){
											 location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc864d4ebc9f8b76c&redirect_uri=http://us.hixinxian.com/oauthAction!getCode&response_type=code&scope=snsapi_base&state=895caa4a38cd65b75306b7f68127d669#wechat_redirect";				 	
										 
										 }
									}
								});

				/* 商品详情 */
				$("#goodsList").on(
						"click",
						".prod",
						function() {
							var t = $(this);
							var pid = t.attr("data-produceid");
							var mid = t.attr("data-merchantsid");

							// 产品id
							$("#pIds").val("");// 先清空
							$("#pIds").val(pid);// 再添加
							// 商户id
							$("#mIds").val("");// 再添加
							$("#mIds").val(mid);// 再添加

							if ($("#pIds").val() != ""
									&& $("#mIds").val() != ""
									&& $("#lIds").val() != "") {
								$("#productDetailsform").submit();

							} else {
								alert("网络异常，请稍候再来");
								return false;
							}

						});

				// 滚动到底部加载数据
				$(document).ready(
						function() {
							$(window).scroll(
									function() {
										if ($(document).scrollTop() >= $(
												document).height()
												- $(window).height()) {

											recommendShpping();

										}
									});
						});

			});

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

			/* 推荐商品信息 */
			function recommendShpping() {
				var mIds = $("#mId").val();
				var pIds = $("#pId").val();
				var page = $("#goodsList").attr("data-page");
				page = Number(page);

				if (pId != "" && mId != "") {
					/* 拉取关联推荐产品 */
					$
							.ajax({
								type : "POST",
								url : "recommendAction!getRecommendPrdouce",
								data : "currentPage=" + page + "&productId="
										+ pIds + "&merchantsId=" + mIds,
								success : function(msg) {
									var items = msg.result;
									if (items == "200") {
										var list = msg.list;

										if (list != null) {
											var str = "<ul class='produl'>";
											for ( var i in list) {

												str += "<li class='prod' data-produceid="
														+ list[i].produceId
														+ " data-merchantsid="
														+ list[i].loginId
														+ "><a "
														+ " href='javascript:void(0);'> "
														+ "<img src='"
														+ list[i].producePic
														+ "' "
														+ " width='100%'> <span>"
														+ list[i].produceName
														+ "</span> <var>￥"
														+ list[i].producePrice
														+ "</var></a></li>";

												if ((parseInt(i) + parseInt(1)) % 2 === 0) {
													str += '</ul><ul>';
												}

											}

											if (items.length % 2 === 0) {
												str = str.substring(0,
														str.length - 4);
											} else {
												str = str + "<li></li></ul>";
											}

											$("#goodsList").append(str);

											// 修改当前页数
											page = page + 30;
											$("#goodsList").attr("data-page",
													page);

										} else {
											layer.msg("亲,拉不出来啦", 1, 8);
										}
									} else if (items == "400") {
										//layer.msg("没有推荐产品", 1, 8);
									} else {
										layer.msg("网络异常", 1, 8);
									}
								}
							});
				} else {
					layer.msg("猜你还喜欢产品拉取失败", 1, 8);
				}

			}

			/* 购物车列表 */
			$("#shop_cart").on("click", function() {
				$("#shoppingform").submit();
			});

			require([ 'cart' ]);

		});
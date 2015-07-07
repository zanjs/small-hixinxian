/**
 * Created by Administrator on 2015/3/27.
 */

define([ 'layer', 'model/uf' ],function(a,b){
            require(['model/product/m_list'],function() {
                layer.load();
                            setCategoryMenu();
							var lId = $("#lId").val(),/* 用户ID */
                            /* 商户ID */
							 mId = $("#mId").val(),
                            /*获取要查询的类别ID*/
                             typeId = $("#btypeId").val();
                            // 加载数据,首次进入主类是空的，从二类开始
                            ProduceClassify(0, mId, typeId);
                            /*高亮*/
                            $("#categoryMenu a").each(function(){
                                var t = $(this);
                                if(t.attr("data-id")==typeId){
                                    t.addClass("on");
                                    anm();
                                }
                            });
                            /*
                             * 获取用户默认地址
                             * */
							if (null != lId && "" != lId && null != mId && "" != mId) {
                                defaultAddress(lId,mId);
							}
                            /*
                            * 点击分类更新页面
                            * */
							$("#categoryMenu").on("click","a",function(){
                                var t= $(this);
                                console.log(t.attr("data-id"));
                                console.log(t.attr("id"));
                                typeUP(t.attr("id"),t.attr("data-id"));
                            });
                            /*
                             * 查看购物车
                             * */
                            $("#shop_cart").on("click",function(e) {
                                lookCart();
                            })
                            /*
                             * 添加到购物车
                             * */
							$("#theList").on("click",".icon_plus_normal",function(e) {
                                    addCart($(this));
									e.stopPropagation();// 阻止冒泡事件
                            })
							// 滚动加载
							$(window).scroll(function() {
                                if ($(document).scrollTop()+500 >= $(document).height()- $(window).height()) {
                                    var box = $('#theList');
                                    var of = $("#onOff").val();
                                    if(of==="true"){
                                        layer.load();
                                        // 当前页数
                                        var currentPage = $("#currentPage").val();
                                        // 获取要查询的类别ID
                                        var btypeId = $("#btypeId").val();
                                        /* 商户ID */
                                        var mId = $("#mId").val();
                                        console.log(currentPage);
                                        ProduceClassify(currentPage, mId, btypeId);
                                    }
                                }
							});
							  /*全部*/
					        $("#allShpping").on("click",function(){
					        	$("#categoryform").submit();	
					        });
							/* 商品详情 */
							$(".x-push-goods").on("click",".prod",function() {
								var t = $(this);
								var pid = t.attr("data-produceid");
								var mid = t.attr("data-merchantsid");
                                lookProduct(pid,mid)
							});
						})
    require([ 'view/backTop' ]);

});

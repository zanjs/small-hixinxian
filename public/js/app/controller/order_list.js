/**
 * order_list.js
 */
define([ 'layer'], function(a,b) {
    $(function(){
    	
    	//获取用户ID
    	var loginId = $("#loginId").val();
    	
    	/*下拉加载数据*/
        $(window).scroll(function(){
            if($(document).scrollTop()+300>=$(document).height()-$(window).height()){
                var box = $('#orderList');
                layer.load();

                //当前加载条数
                var pageNum = box.children().length;  
                var loadSwitch = $("#loadSwitch").val();
           
                if(loadSwitch === "0"){
                	$("#loadSwitch").val("1");
                	 $.ajax({
                  	   type: "POST",
                  	   url: "orderMsgAction!getFindOrderList",
                  	   data: "loginId="+loginId+"&currentPage="+pageNum,
                  	   success: function(msg){
                  		 var item = msg.items;
                  		   if(item=="200"){
                  			   var result =  msg.list;
                  			   if(result!=null){
	                  				 var str = "";
	 	                  			/*订单状态*/
	 	                  			var sta_0='<div class="timline"><ul class="timeline"><li></li><li></li><li></li><li></li></ul><ul class="status status2"><li class="cur"><i></i>已下单</li><li><i></i>配送中</li><li><i></i>已完成</li></ul></div></dd></dl>';
	 	                  			var sta_1='<div class="timline"><ul class="timeline"><li></li><li></li><li></li><li></li></ul><ul class="status status2"><li class="cur"><i></i>已下单</li><li class="cur"><i></i>配送中</li><li class="cur"><i></i>已完成</li></ul></div></dd></dl>';
	 	                  			var sta_2='<div class="order_list_time_cancel" style="display: block"><p class="mColor">订单状态：已取消</p></div></dd></dl>';
	 	                  			var sta_3='<div class="timline"><ul class="timeline"><li></li><li></li><li></li><li></li></ul><ul class="status status2"><li class="cur"><i></i>已下单</li><li class="cur"><i></i>配送中</li><li><i></i>已完成</li></ul></div></dd></dl>';
	 	                  	
	 	                  			for ( var i in result) {
	 									var time = result[i].theOrderTime;
	 									var adressName = result[i].adressName;
	 									var orderStatus = result[i].orderStatus;
	 									var sta= "";
	 									if(orderStatus=="0"){
	 										sta=sta_0;
	 									}else if(orderStatus=="1"){								
	 										sta=sta_1;
	 									}else if(orderStatus=="2"){								
	 										sta=sta_2;
	 									}else if(orderStatus=="3"){
	 										sta=sta_3;
	 									}
	 									
	 	                  				str += '<dl class="orderinfoId" data-val='+result[i].orderinfoId+'><dt><img src="./images/order_list_thumb.png"style="border:0"width="60"><h5>嗨订单</h5></dt><dd><span><em>下单时间：</em><var>'+time+'</var></span><span class="sp_ad"><em>收货地址：</em><var>'+adressName+'</var></span>'+sta;		
	 	                  				
	 	                  			  }
	 	                  			box.append(str);
	 	                  			
	 	                  			//当数据加载完毕
	 	                  			$("#loadSwitch").val("0");
	 		                      	setTimeout(function(){
	 		                           layer.closeAll();
	 		                      	},50);
 		                      	
                  			   }else if(result==null){
                  				 layer.closeAll();
                  				// layer.msg("亲，不能在拉了",1,8);
                  				 $("#loadSwitch").val("0");
                  				
                  			   }
                  		   }else{
                  			 	layer.closeAll();
	                  			layer.msg("网速有点慢哦",1,7);
	                  			$("#loadSwitch").val("0");
	                  		
                  		   }
                  	   }
                  	});
                }else{
                	 	layer.closeAll();
                		layer.msg("网速有点慢哦",1,7);
                		$("#loadSwitch").val("0");
              }
          }
        });

         /*订单详细*/
        $("#orderList").on("click",".orderinfoId",function(){
        	var t = $(this);
        	var vals = t.attr("data-val");
        	
        	$("#orderNo").val(vals);
        	if($("#orderNo").val() !="" &&$("#orderNo").val() !=null && $("#loginId_02").val() !="" && $("#loginId_02").val()!=null){
        		$("#ordermsgform").submit();
        	}
        	
        });
        
        
        /*查看购物车*/
    	$("#myShpping").on("click",function(){
    		//地址ID
    		$("#address").val($.cookie("HaiAId"));
    		//用户ID
    		$("#lids").val($.cookie("HaiLId"));
    		//商户ID
    		$("#mIds_02").val($.cookie("HaiMId"));
    		
    		if($("#lids").val() == "" || $("#lids").val() == null){
    			if(confirm("请先登录哦")){
    				location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc864d4ebc9f8b76c&redirect_uri=http://us.hixinxian.com/oauthAction!getCode&response_type=code&scope=snsapi_base&state=47429c1d9abc91c010a0782db4f72459#wechat_redirect";
    			 }
    			return false;
    		}
    		
    		if($("#address").val() !=""){
    			$("#shoppingform").submit();
    		}else{
    			 if(confirm("请添加收货地址哦")){
    				 location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc864d4ebc9f8b76c&redirect_uri=http://us.hixinxian.com/oauthAction!getCode&response_type=code&scope=snsapi_base&state=895caa4a38cd65b75306b7f68127d669#wechat_redirect";
    			 }
    		}
    		
    	});
        
        
        
    });

    require(['view/backTop']);
});
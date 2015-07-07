

define([ 'layer'], function(a,b) {
	$(function(){

		$("#codButton").on("click",function(){
			
			layer.confirm('取消订单后我们就不送喽？', function(){
				
				var orderNo =  $("#orderNo").val();
				var mid = $.cookie("HaiMId");
				if(null != orderNo && "" != orderNo && null!= mid && ""!=mid){
					
					$.ajax({
						   type: "POST",
						   url: "orderMsgAction!getFindOrderList",
						   data: "orderNo="+orderNo+"&merchantsId="+mid+"&operationStatus=cOrder",
						   success: function(msg){
							   var result = msg.items;
							   if(result == "200"){	   
								   $("#order_step").css("display","none");			   
								   $("#btn_order").css("display","none");						   
								   $("#cancel_order").css("display","block");	   
								   layer.msg("订单已取消,再去逛逛呀",1,9);
							   }else{
								   layer.msg("哎呦，网络差啊",1,8);
							   }
							   
						   }
						});

				}else{
					layer.msg("亲,稍等一会再操作",1,9);
					
				}
				
			});
				
		});
		
		
	});
});
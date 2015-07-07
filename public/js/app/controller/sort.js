/**
 * Created by Administrator on 2015/4/7.
 */
define(['layer'], function(a) {
	require([ 'view/sort' ]);
    $(function(){
        $(".sort_ul").on("click",".list_more",function(){
            var t = $(this);
            var p = t.parent();
            var li = p.children();
            var s = t.attr("data-s");
            if(s){
                p.find(".show").removeClass("show").addClass("hide");
                t.removeAttr("data-s");
                t.find("i").removeClass("sort_upload2");
            }else{
                 t.attr("data-s",1);
                li.each(function(i){
                    var tLi = $(this);
                    if(tLi.hasClass("hide")){
                        tLi.removeClass("hide").addClass("show");
                    }
                });
                t.find("i").addClass("sort_upload2");
            }

        });
  
        $(".shop_sort_lan").on("click",".sort_ul li",function(){
        	
        	var t = $(this);
        	var stypeId = t.attr("data-val");
        	var stypeName = t.attr("data-name");
	
        	$("#stypeId").val(stypeId);
        	$("#stypeName").val(stypeName);
        		
        	if($("#merchantsId").val()!="" && $("#merchantsId").val()!=null){
        		
        		if($("#stypeId").val()!="" && $("#stypeId").val()!=null && $("#stypeName").val()!="" && $("#stypeName").val()!=null &&
            			$("#loginIds").val()!="" && $("#loginIds").val()!=null){
            		
                	$("#produceclassifyform").submit();
            	}else{
            		location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc864d4ebc9f8b76c&redirect_uri=http://us.hixinxian.com/oauthAction!getCode&response_type=code&scope=snsapi_base&state=47429c1d9abc91c010a0782db4f72459#wechat_redirect";
            	}
        	}else{
        		layer.msg("您的收货地址暂不在配送范围",2,9);	
        		return false;
        	}
        	
        	
        	
        });
        
    })
})
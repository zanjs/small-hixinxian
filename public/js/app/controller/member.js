/**
 * member
 */
define(['layer'], function(a) {

    $("#newAddressPage").on("click",function() {
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc864d4ebc9f8b76c&redirect_uri=http://us.hixinxian.com/oauthAction!getCode&response_type=code&scope=snsapi_base&state=895caa4a38cd65b75306b7f68127d669#wechat_redirect";
    });

    /*查看购物车*/
    $("#myShpping").on("click touchend",function(){
        //地址ID 存放进cookie
        $("#address").val($.cookie("HaiAId"));
        //用户ID存放进cookie
        $("#lids").val($.cookie("HaiLId"));
        //商户ID存放进cookie
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


    /*意见反馈*/
    $("#manageOpinion").on("click touchend",function(){
        $("#adviceform").submit();
    });

});
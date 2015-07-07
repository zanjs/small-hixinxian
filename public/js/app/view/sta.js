/**
 * Created by Administrator on 2015/4/9.
 */
function orderSta1(i){
    $(".orderSuccessArea").hide();
    $(".orderSuccessArea_"+i).show();
}

//跳转函数
function jumpUrl(a,b,c){
    var n = b
    var t = a;
    var url = c;
    var siteUrl = function(){
        if(t < 0) {
            window.location.href = url;
            return false;
        }
        n.html(t+'秒后 跳转到');
        t--;
        setTimeout(siteUrl,1000);
    };
    siteUrl();
}
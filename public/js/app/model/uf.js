//function xueG
//更新本地地址cookie  a-lat,b-lng,c-address

//replace(/(^s*)|(s*$)/g, "") 去空格

function updateCookie(a,b,c){
    var dateL = new Date();
    dateL.setTime(dateL.getTime() + (60 * 60 * 1000));

    $.cookie("XGlat",a,{
        "path":"/",
        "expires":dateL
    });

    $.cookie("XGlng",b,{
        "path":"/",
        "expires":dateL
    });

    $.cookie("XGaddress",c,{
        "path":"/",
        "expires":dateL
    });
}
//获取cookie值
function getCookieAll(){
    var lat  = $.cookie("XGlat");
    var lng  = $.cookie("XGlng");
    var address  = $.cookie("XGaddress");
    var aid  = $.cookie("HaiAId");
    var lid  = $.cookie("HaiLId");
    var mid  = $.cookie("HaiMId");

    var CookieJson = {};
    CookieJson.lat = lat;
    CookieJson.lng = lng;
    CookieJson.address = address;

    CookieJson.aid = aid;
    CookieJson.lid = lid;
    CookieJson.mid = mid;
    return CookieJson;
}

/*用户信息*/
function updateUserck(a,b,c){
    var dateL = new Date();
    dateL.setTime(dateL.getTime() + (60 * 60 * 1000));
    //地址ID 存放进cookie
    $.cookie("HaiAId",a,{
        "path":"/", //cookie的默认属性
        "expires":dateL //有效天数
    });

    //用户ID存放进cookie
    $.cookie("HaiLId",b,{
        "path":"/", //cookie的默认属性
        "expires":dateL //有效天数
    });

    //商户ID存放进cookie
    $.cookie("HaiMId",c,{
        "path":"/", //cookie的默认属性
        "expires":dateL //有效天数
    });
}





/*
 *跳转错误页面
 *errorUrl()
 */
function errorUrl(){
    location.href = "./page/error.jsp";
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

/* 刷新页面 */
function f5(){
    window.location.reload();
}
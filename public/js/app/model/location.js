/**
 * Created by Administrator on 2015/4/14.
 */
function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition,errorBack,positionOptions);
    }
    else{
        alert("您的浏览器不支持定位哦")
    }
}
//成功精确回调
function positionOptions(){

}
//错误回调
function errorBack(error){
    alert(error.message);
}
//成功回调
function showPosition(e){
    //alert(e.coords.latitude);  //估计纬度
    //alert(e.coords.longitude); //估计经度
    //alert(e.coords.altitude); //估计高度
    //alert(e.coords.accuracy); //所提供的以米为单位的经度和纬度估计的精确度
    //alert(e.coords.altitudeAccuracy); //所提供的以米为单位的高度估计的精确度
    //alert(e.coords.heading); //宿主设备当前移动的角度方向，相对于正北方向顺时针计算
    //alert(e.coords.speed); //以米每秒为单位的设备的当前对地速度

    var lat = e.coords.latitude;
    var lon = e.coords.longitude;
    var locationA = [lat,lon];
    alert("Aaa")
    var dateL = new Date();
    dateL.setTime(dateL.getTime() + (60 * 60 * 1000));
    $.cookie("xue_location_x", lat,{
            "path":"/",
            "expires":dateL
    });
    $.cookie("xue_location_y", lon,{
        "path":"/",
        "expires":dateL
    });

    var cVal = $.cookie("xue_location_y");

    if(cVal){
        //alert(cVal);
    }else{
        alert("没有co");

    }
    return locationA;
}


function getCookieAll(){
    var lat  = $.cookie("xue_location_x");
    var lon  = $.cookie("xue_location_y");
    var address  = $.cookie("xue_address");

    var CookieJson = {};
    CookieJson.lat = lat;
    CookieJson.lon = lon;
    CookieJson.address = address;
    return CookieJson;
}


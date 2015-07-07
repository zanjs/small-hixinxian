/**
 * Created by Administrator on 2015/5/15.
 */
/**
 * 显示省市一级
 * showCity1()
 */
function showCity1(){
    /* 查询所有市级 */
   /* $.ajax({
        type : "POST",
        url : "cityAction!findAllCity",
        data : "levelId=" + "",
        dataType : "json",
        success : function(msg) {
            var items = msg.rows;
            var str = "";
            for ( var i in items) {
                str += "<li  data-id='" + items[i].id
                + "' data-val='" + items[i].cityname
                + "'><a><em class='radiobox'></em>"
                + items[i].cityname + "</a></li>";
            }
            //$("#cityLi").html(str);
        }

    });
*/
    $("#addressMsg").css("display", "none");
    $(".btn_pay_style").css("display","none");
    $("#choiseProvinceMask_city").css("display", "block");

    return false;
}
/**
 * 显示省市二级
 * showCity2() a->cityId
 */
function showCity2(a){
    /* 查询市级下所有区 */
   /* $.ajax({
        type : "POST",
        url : "cityAction!findAllCity",
        data : "levelId=" + a,
        dataType : "json",
        success : function(msg) {
            var items = msg.rows;
            var str = "";
            for ( var i in items) {
                str += "<li  data-id='" + items[i].id
                + "' data-val='" + items[i].cityname
                + "'><a><em class='radiobox'></em>"
                + items[i].cityname + "</a></li>";
            }
            $("#districtLi").html(str);
        }
    });*/

    $("#choiseProvinceMask_city").css("display", "none");
    $("#choiseProvinceMask_county").css("display", "block");


}
/**
 * 解析地址
 * initMaps(a)
 */
function initMaps(a){
    // 创建百度api
    var myGeo = new BMap.Geocoder();
    //解析地址
    myGeo.getPoint(a, function(points) {
        if(points){

            updateCookie(points.lat,points.lng,a);

        }else{
            // 加载页面数据
            $(".xue-load-data").css("display", "none");
            var load = $("#x-first-load");
            load.remove();
            $(".x-load").fadeIn("1");
            $("#pushGoods").html("");
            $(".x-no-find").css("display", "block");
            updateCookie("","",a);

        }
        $("#addressform").submit();
    });
}

/**
 * 收货地址表单验证
 * validationForm()
 */
function validationForm(){

    var n = $("#name").val();
    var m = $("#mobile").val();
    var a = $("#area").val();
    var p = $("#poi").val();
    var g = $("#groupName").val();
    var district =  $("#districtName").val();//区

    var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!reg.test(m)) {
        layer.msg("手机号码格式不对！");
        return false;
    }
    if (m.length != 11) {
        layer.msg("手机号码位数不对哦！");
        return false;
    }
    if(n!="" && m!="" && a!="" && p!="" && g!=""){
        var adr = district+p;
        initMaps(adr);

    }else{
        layer.msg("亲,还没填完呢",1,8);
        return false;
    }
}
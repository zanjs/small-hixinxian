

//查询没有数据或找不到地址信息
function noDataAddress(a){
    // 无数据
    loadData.css("display", "none");
    load.remove();
    xLoad.fadeIn("1");
    box.html("");
    noFind.css("display", "block");
    updateCookie("","",a);
}
//未开通服务弹出
function alertI(){
    var winW = $(window).width();
    var winH = $(window).height();
    var aBox = $(".alert_expect");
    var aBoxW = aBox.width();
    var aBoxH = aBox.height();
    mark.show();
    aBox.show();
    var tp = (winH-aBoxH)/2;
    aBox.animate({top:tp},tp);
}
//未开通服务关闭
function closeAlertI(){
    var aBox = $(".alert_expect");
    //aBox.css("top",10);
    mark.hide();
    addressZone.hide();
    aBox.fadeOut();
}



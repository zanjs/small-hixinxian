/**
 * Created by Administrator on 2015/4/9.
 */
function alertI(){
    var winW = $(window).width();
    var winH = $(window).height();
    var aBox = $(".alert_expect");
    var aBoxW = aBox.width();
    var aBoxH = aBox.height();
    $(".mark").show();
    aBox.show();
    var tp = (winH-aBoxH)/2;
    aBox.animate({top:tp},tp);
}
function closeAlertI(){
    var aBox = $(".alert_expect");
    //aBox.css("top",10);
    $(".mark").hide();
    $(".addressZone").hide();
    aBox.fadeOut();
}
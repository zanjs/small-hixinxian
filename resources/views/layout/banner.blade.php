//banner
<script>
var touchArray = new Array();
var touchType = 0 ;
var touchIndex = 0 ;
var autoSroll ;
$(function(){
resizeWindow();
});
function resizeWindow() {
changeWindowWidth();
$(window).resize(changeWindowWidth);
}
function changeWindowWidth(){
var width = $(window).width() > 640 ? 640 : $(window).width() ;
$("div.x-banner,div.x-banner ul.con li").width(width);
$("div.x-banner ul.con").width(width * $("div.x-banner ul.con li").length  + 20).height( (width * 320) / 640  );
$("div.x-banner").height( (width * 320) / 640  );
$("div.x-banner ul.page").css("top",((width * 320) / 640) - 20);
$("div.x-banner #touchSalse li").height( (width * 320) / 640  );
$("div.x-banner #touchSalse li img").height( (width * 320) / 640  ).width(width);
var pageEm = new Array();
for(var i =0 ;i< $("div.x-banner ul.con li").length ; i++){
pageEm.push("<em class='"+ (i==0 ? "cur" :"") +"'></em>");
}
$("div.x-banner ul.page li").empty();
$("div.x-banner ul.page li").append($(pageEm.join("")));
}
function touchStart(event){
$("#touchSalse").stop(true,true);
if($("#touchSalse").is(":animated")){
return false;
}
clearTimeout(autoSroll);
var _x = event.touches[0].clientX;
var _y = event.touches[0].clientY;
var starPoint = {x : _x , y : _y};
touchArray.push(starPoint);
}
function touchMove(event,id){
var _x = event.touches[0].clientX;
var _y = event.touches[0].clientY;
if(Math.abs(touchArray[0].x - _x) < Math.abs(touchArray[0].y - _y)){
return ;
}
event.preventDefault();
touchType =    _x < touchArray[0].x ? 1 : -1 ;
$("#"+id).css("left",  ( _x < touchArray[0].x ? $("#"+id).position().left - (touchArray[0].x - _x) : $("#"+id).position().left + (_x - touchArray[0].x) ));
touchArray[0].x = _x ;
touchArray[0].y = _y ;
}
function touchEnd(event,id){
touchArray.length = 0;
var _left = $("#"+id).position().left;
if(_left > 0){
$("#"+id).animate({left:0},300 ,function(){
setPageCation();
});
touchIndex = 0 ;
}
else if(Math.abs(_left) > ($("#"+id+" li").length - 1) * ($("#"+id+" li").width())){
$("#"+id).animate({left:0 - ($("#"+id+" li").length - 1) * ($("#"+id+" li").width())},300 ,function(){
setPageCation();
});
touchIndex =   $("#"+id+" li").length - 1 ;
}
else{
var itemWidth = ($("#"+id+" li").width());
touchIndex += touchType ;
touchIndex = touchIndex < 0 ? 0 : (touchIndex >$("#"+id+" li").length - 1 ? $("#"+id+" li").length - 1 : touchIndex ) ;
$("#"+id).animate({left : 0 - itemWidth * touchIndex},300 ,function(){
setPageCation();
});
}
autoSroll = setTimeout(function(){
autoScrollFn();
},5000);
}
function setPageCation(){
$("div.x-banner ul.page li em").removeClass("cur");
$("div.x-banner ul.page li em:eq("+touchIndex+")").addClass("cur");

}
function autoScrollFn(){
touchIndex = (touchIndex + 1) > $("#touchSalse li").length - 1 ? 0 : touchIndex + 1;
var itemWidth = ($("#touchSalse li").width());
$("#touchSalse").animate({left : 0 - itemWidth * touchIndex},300 ,function(){
setPageCation();
});
autoSroll = setTimeout(function(){
autoScrollFn();
},5000);
}
autoSroll = setTimeout(function(){
autoScrollFn();
},5000);
</script>
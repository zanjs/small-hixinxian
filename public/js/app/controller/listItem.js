/**
 * Created by zan on 2015/4/15.
 */
define(['jquery'],function ($) {
    require(['view/backTop']);
    require(['view/listItem'],function(){
        hideFoodA();
        $("#food-wrap").on("click",".reactMore",function(e){
            var t = $(this);
            var s = t.attr("data-more");
            if(s == "true"){
                showFood(t);
                t.attr("data-more",false);
                t.html("收起 <i class='more_ShowI'>∧</i>");
            //    ↑ Δ ▲  &uarr; &Lambda;  &dagger; &circ; ∧
            }else{
                hideFood(t);
                t.attr("data-more",true);
                t.html("更多&#187;");
            }

            e.preventDefault();
            return false;
        });

    });
    require(['model/list'],function(){
        setCategoryMenu();
        anm();
        $("#categoryUl").on("click touchend","a",function(){
            var a = $(this);
            $("#categoryUl a").removeClass("on");
            a.addClass("on");
            anm();
            //return false;
        })

        //导航动画函数
        function anm(){
            var aR =$("#categoryUl").find("a");
            aR.each(function(i){
                var a = $(this);
                if(a.hasClass("on")){
                    var lf = a.position().left;
                    var w = a.width();
                    $("#bomLine").animate({"left":lf,"width":w+20},500);
                }
            })
        }

    })
    $(function(){
        document.addEventListener("touchstart", function(){

        }, true);

        //touch

    })


    var touchFunc = function(obj,type,func) {
        //滑动范围在5x5内则做点击处理，s是开始，e是结束
        var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
        var sTime = 0, eTime = 0;
        type = type.toLowerCase();

        obj.addEventListener("touchstart",function(){
            sTime = new Date().getTime();
            init.sx = event.targetTouches[0].pageX;
            init.sy = event.targetTouches[0].pageY;
            init.ex = init.sx;
            init.ey = init.sy;
            if(type.indexOf("start") != -1) func();
        }, false);

        obj.addEventListener("touchmove",function() {
            event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
            init.ex = event.targetTouches[0].pageX;
            init.ey = event.targetTouches[0].pageY;
            if(type.indexOf("move")!=-1) func();
        }, false);

        obj.addEventListener("touchend",function() {
            var changeX = init.sx - init.ex;
            var changeY = init.sy - init.ey;
            if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeY)>init.y) {
                //左右事件
                if(changeX > 0) {
                    if(type.indexOf("left")!=-1) func();
                }else{
                    if(type.indexOf("right")!=-1) func();
                }
            }
            else if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeX)>init.x){
                //上下事件
                if(changeY > 0) {
                    if(type.indexOf("top")!=-1) func();
                }else{
                    if(type.indexOf("down")!=-1) func();
                }
            }
            else if(Math.abs(changeX)<init.x && Math.abs(changeY)<init.y){
                eTime = new Date().getTime();
                //点击事件，此处根据时间差细分下
                if((eTime - sTime) > 300) {
                    if(type.indexOf("long")!=-1) func(); //长按
                }
                else {
                    if(type.indexOf("click")!=-1) func(); //当点击处理
                }
            }
            if(type.indexOf("end")!=-1) func();
        }, false);
    };

})
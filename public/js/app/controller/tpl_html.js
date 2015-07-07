/**
 * Created by Administrator on 2015/4/7.
 */
define(['jquery','layer','underscore','zan','jqueryTpl','quo'],function($,layer,_,z,tmpl,c){
    require(['model/ada']);
    require(['model/cart']);
    //document.addEventListener('touchmove',function(event){event.preventDefault(); },false); // 静止滚动
    $(function(){
        var d = "action=getlink&id=2";
        $.getJSON("a.php",d, function(json) {
            var data = {
                name: json.name,
                s: json.sex,
                t: json.tel,
                n: json.email,
                a: json.age
            };
            //$("#TextTpl_1").tmpl(data).appendTo("#TextTpl_d");

        });


        $$("#goodsList").on("swipeRight",".items",function(e){
            clearInterval(e);
            var t = $(this);
            var iD = t.index();
            alert(iD);

            layer.confirm("要删除吗",function(){
                t.css({"overflow":"hidden"});
                t.animate({height:"0"},500).remove();
            })
        })

        //$$("#goodsList").on("Drag",".items",function(stopint){
        //    clearInterval(stopint);
        //    alert("ttt");
        //})
        //$$(".innerWrap").on("swipeUp",'#demoQuo', function(){
        //    alert("up");
        //});



        //$("#goodsList").on("touchmove",'.items',function(event){
        //
        //    var startX, startY, endX, endY;
        //    var touch = event.touches[0];
        //    startY = touch.pageY;
        //    startX = touch.pageX;
        //    alert(startX);
        //    console.log(event.touch.pageX);
        //    event.stopPropagation(); //冒泡
        //    event.preventDefault(); //滚屏
        //    $("#spText").html("X轴移动大小："+ Y);
        //
        //    function touchStart(event) {
        //        var touch = event.touches[0];
        //        startY = touch.pageY;
        //        startX = touch.pageX;
        //    }
        //    function touchMove(event) {
        //        var touch = event.touches[0];
        //        //endY = (startY - touch.pageY);
        //        endX = touch.pageX;
        //
        //    }
        //})

        function getElementsByClassName(n) {
                var classElements = [],allElements = document.getElementsByTagName('*');
                for (var i=0; i< allElements.length; i++ )
               {
                   if (allElements[i].className == n ) {
                      classElements[classElements.length] = allElements[i];
                    }
               }
               return classElements;
        }



        var eachData = {
            users: [{ name: 'jerry' }, { name: 'john'},{ name: 'johasdasn'}],
            groups: [{ name: 'shu' }, { name: 'mei' }, { name: 'test'},{name :'asdsa'}],
            departs: [{ name: 'IT'},{name:'asdas'}]
        };

        //$("#each").tmpl(eachData).appendTo("#TextTpl_d");

        for(i = 0; i< 3;i++){
            var listD = {
                img : 'http://img10.360buyimg.com/n7/jfs/t847/204/5157818/673076/7c2f8b1d/54da0e79N540dcf8f.jpg',
                title : '中绿苦菊250g/盒',
                num : '0',
                price : '8.50',
                id : '15'
            };
            $("#listD").tmpl(listD).appendTo("#goodsList");
        }

        $("#goodsList").on("touchend",".plus",function(event){
            var sPrice = $("#sPrice");
            var sPriceN = Number(sPrice.text());

            var t = $(this);
            var p = t.parent();
            var input = p.find(".buyNumber");
            var vId = input.attr("data-id");
            var num = parseInt(input.val());

            var restN = 10; //查询商品剩余数量
            if(num >= restN){
                layer.msg('不可以在添加了哦', 1, 9);
                return false;
            }
            layer.load(1);
            input.val(num+1);
            upDataP();
            cartNull();
            event.stopPropagation();
            event.preventDefault();
        })
        //    减少商品数量
        $("#goodsList").on("touchend",".minus",function(event){
            var t = $(this);
            var p = t.parent();
            var input = p.find(".buyNumber");
            var vId = input.attr("data-id");

            var num = parseInt(input.val());
            var restN = 10; //查询商品剩余数量
            if(num <= 1){
                //layer.msg('不可以在减少了哦', 1, 8);
                layer.confirm('确定要删除吗',function(e){
                    layer.load(1);
                    t.parents(".items").remove();
                    layer.close(e);
                    upDataG();

                });

                return false;
            }
            layer.load(1);
            input.val(num-1);

            upDataG();
            event.stopPropagation();
            event.preventDefault();
        })
        //    单击选中/反选商品
        $("#goodsList").on("touchend",".checkbox",function(){
            var t = $(this);
            if(t.hasClass("checked")){
                layer.load(1);
                t.removeClass("checked");
            }else{
                layer.load(1);
                t.addClass("checked");
            }

            upDataG();
        })
        //    全选商品
        $("#topBtn").on("touchend","#checkAll",function(){
            var t = $(this);
            if(t.hasClass("checked")){
                layer.load(1);
                t.removeClass("checked");
                NoCheckAll();
            }else{
                layer.load(1);
                t.addClass("checked");
                CheckAll();
            }

        });
        //    删除选中商品
        $("#topBtn").on("touchend","#delGoods",function(){
            CheckedDel();

        })
        //    去结算
        $("#joinCart").on("click",function(){
            var arrId = selId();
            layer.alert('结算商品id 位'+ arrId,9);
        })

    })

//    定义函数Class
    function GetClassName(name){
        return name.length > 5 ? 'long' : 'short' ;
    }
//    模板引擎测试

})
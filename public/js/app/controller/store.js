/**
 * Created by Administrator on 2015/4/13.
 */
define(['jquery','store','cookie'],function($,store){
    $(function() {

        var mapA = ["19455454.78787.15","78787.887545"];

        store.get('map2') // 获取
        store.remove('map2') //删除
        var map = store.get('map');


        var storeS =  $("#storeD span");
        storeS.html("mapX---" + map.mapX);
        //store.clear();
        store.set('map',{mapX:mapA[0],mapY:mapA[1]});
        //store.set('map', { mapX: '19455454.78787.15', mapY: '78787.887545' })
        //


        $.cookie('example', 'foo', {
            path: '/',
            expires: date2 });


        $.cookie("like", "5211212", {
            path: "/", expiress: 7
        }); //设置cookie


        $.cookie("cookie",//写入cookie
            "sada",//需要cookie写入的业务
            {
                "path":"/", //cookie的默认属性
                "expires":10 //有效天数
            })
        });

        var val= $.cookie('like'); //获取值
        alert(val);
        var cookie=$.cookie("cookie"); //读取cookie
        if(cookie){

            $.cookie("cookie",cookie,{
                "path":"/",
                "expires":10
            })
        }



})
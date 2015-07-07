/**
 * Created by Administrator on 2015/3/27.
 */

define(['jquery','layer','model/list'],function ($,b,c,d) {
        require(['model/ada']);
        require(['view/backTop']);
        require(['model/list'],function(){
            setCategoryMenu();
        });
        $(function(){
            var m =$("#categoryMenu");
            var a = m.find("a");

            a.on("click",function(){
                var t = $(this);
                var text = t.text();
                $(".headerDiv .title").text(text);
                var id = t.attr("data-id");
                m.find("a").removeClass("on")
               t.addClass("on");
                layer.msg("查询栏目为"+ id +"的产品",1,16)
            })

            $("#theList").on("click",".icon_plus_normal",function(){
                var t = $(this);
                var pLi = t.parents("li");
                var tId = t.attr("data-id");
                var checked = pLi.find(".checked");
                checked.css("display","block");

                layer.msg("添加成功",1,1,function(){
                    var sp = $("#shopShowI");
                    var nb = $(".num-u-s");
                    var n = parseInt(sp.text());
                    nb.text(n+1);

                })
            })

            //滚动加载

                $(window).scroll(function(){

                    if($(document).scrollTop()+200 >= $(document).height()-$(window).height()){
                        var box = $('#theList');
                        layer.load();

                        var str = '<li><a href="javascript:;"><div class="imgReBox"><img src="http://img30.360buyimg.com/n2/jfs/t856/220/305964818/123914/e287da92/55152264N430642b8.jpg"width="100%"><i class="icon_plus_normal"data-id="18"></i><i class="checked"style="display:none;"></i></div><span>太姥清韵白茶饼/饼</span><var>￥198.00</var></a></li>';
                        var ht ='<ul>'+ str+str  +'</ul>';
                        box.append(ht);
                        console.log(ht);
                        setTimeout(function(){
                            layer.closeAll();
                        },2000);

                        //$.ajax({
                        //    type:"GET",
                        //    url:'y.php',
                        //    dataType:'json',
                        //    beforeSend:function(){
                        //         //显示加载时候的提示
                        //    },
                        //    success:function(ret){
                        //        box.before(ret) //将ajax请求的数据追加到内容里面
                        //        layer.closeAll() //请求成功,隐藏加载提示
                        //    }
                        //})
                    }
                })


        })




        require(['model/touch'],function(){
            args={
                iniL:30,//X方向滑动的最小距离
                iniT:50,//Y方向滑动的最大距离
                eCallback:function(tPoint){
                    switch(tPoint.direction){
                        case "left":
                            alert("left");
                            break;
                        case "right":
                            alert("right");
                    }
                }
            }
            //Zepto("#categoryMenu").Swipe(args);


        });



    });

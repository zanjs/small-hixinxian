/**
 * Created by Administrator on 2015/3/27.
 */
console.log('listMore load');
define(['jquery','layer'], function($) {

       //滚动到底部加载数据
    $(document).ready(function(){
        $(window).scroll(function(){
            if($(document).scrollTop()>=$(document).height()-$(window).height()){
                var box = $('#pushGoods'),load =$('#load_msg')
                alert("加载数据");
                $.ajax({
                    type:"GET",
                    url:'ajax.php',
                    dataType:'json',
                    beforeSend:function(){
                        load.show() //显示加载时候的提示
                    },
                    success:function(ret){
                        box.before(ret) //将ajax请求的数据追加到内容里面
                        load.hide() //请求成功,隐藏加载提示
                    }
                })
            }
        })
    })

    require(['view/backTop']); //返回顶部
 });

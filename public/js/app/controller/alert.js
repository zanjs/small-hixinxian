/**
 * Created by Administrator on 2015/3/27.
 */
console.log('Alert load');
define(['jquery','layer'],
    function ($,layer) {

        $(function () {
            var staN = true;
            $('#getToken').on('click', function(){
                var mob =$("#mobile");
                var mobText = mob.val();
                var t = $(this);
                var sp = t.children("span");
                //验证为空
                if($.trim(mob.val())=="")
                {
                    layer.msg("手机号码不能为空！");
                    return false;
                }
                //验证格式
                if($.trim(mob.val())!="")
                {
                    var reg = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
                    if(!reg.test($.trim(mob.val())))
                    {
                        layer.msg("手机号码格式不对！");
                        return false;
                    }
                }
                if(mobText.length != 11){
                    layer.msg("手机号码位数不对哦！");
                    return false;
                }

                if(staN) {
                    countDown();
                }


                function countDown(){
                    staN = false;
                    var count = 60;
                    var loop = function(){
                        if(count < 0) {
                            t.text('重新获取')
                            staN = true;
                            return;
                        }
                        t.text(count+'秒后可重新发送');
                        count--;
                        setTimeout(loop,1000);
                    };
                    loop();
                }




                //var secs = 60; //倒计时的秒数
                //
                //function Load(){
                //    for(var i=secs;i>=0;i--)
                //    {
                //        window.setTimeout('doUpdate(' + i + ')', (secs-i) * 1000);
                //    }
                //}
                //
                //function doUpdate(num)
                //{
                //    $('#getToken span').html('('+num+')') ;
                //    if(num == 0) {
                //        $('#getToken span').html("");
                //    }
                //}

            });

        });
    });




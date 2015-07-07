/**
 * Created by Administrator on 2015/6/10.
 */
define(['layer'], function(a) {




        $(".comment-cl").on("touchstart","i",function(){
            $(this).css({"background-color":"#999"})
        })

        $("#comment-submit-btn").on("touchstart",function(){
            $(this).addClass("btn-touchstart")
        })


        //form 提交
        $("#comment-submit-btn").on("touchend",function(){
            $(this).removeClass("btn-touchstart");
        })

        $(".comment-cl").on("touchend click","i",function(){

            var t = $(this),
                _i = t.index(),
                p = t.parent(),
                pi = p.find("i"),
                nt = p.prev().find("input");
                np = p.next();
            nt.val(Number(_i+1));
            np.text(Number(_i+1)+"分");
            p.find(".on").removeClass("on");

            for(i=0;i<=_i;i++){
                pi[i].className='on';
            }

            $(this).css({"background-color":"transparent"});
        })

        $("#text-id").keydown(function(e){
            if(e.keyCode == 8)
            {
                return;
            }
            if(document.getElementById('text-id').value.length >= 50)
            {
                alert("大侠，手机屏幕小，先输入这么多字好不？")
                if(!document.all)
                {
                    e.preventDefault();
                }
                else
                {
                    e.returnValue = false;
                }
            }
        })

        $("#text-id").keyup(function(){
            var s = document.getElementById('text-id').value;

            if(s.length > 50)
            {
                document.getElementById('text-id').value=s.substring(0,50);
            }
        })




})
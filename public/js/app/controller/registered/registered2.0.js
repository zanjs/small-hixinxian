/**
 * Created by Administrator on 2015/5/22.
 */
define(['layer'], function(a) {

    require(['model/registered/m_registered'],function(){
        inputTextLab();
        /*地区选中*/
        $("#selectCity").on("change",function(){
            var t = $(this),sT = $("#selectText"),lab = $("#selectLab"),
                val = t.children('option:selected').val();
            lab.hide();sT.val(val);
        })

        //获取验证码
        $("#getPhoneCode").on("touchend",function(){
            var t = $(this),m = $("#userPhone"),v = m.val(),l = v.length;
            if(l == 11){
                vaTenPhone(m);
                var stN = vaTenPhone(m);
                if(stN == 1){
                    //    手机号码正确后执行 发送
                    countDown(t);
                    //发送手机验证码后 保存手机号
                    $.cookie("xueRegPhone",v,{
                        "path":"/",
                        "expires":1
                    });
                }
            }else{
                layer.msg("手机号码位数不对哦！");
            }
        });

        //开始选菜
        $("#reg_btnId3").on("touchend",function(){
            var cityT = $("#selectText").val(),
                AddT  = $("#regAddressT").val(),
                name  = $("#regName").val(),
                phone = $("#userPhone").val(),
                code  = $("#code").val();
            cityT != "" && AddT != "" && name != "" && phone != "" && code != "" ? regForm() : layer.msg("还没填写完整哦？",1,9);
        });

    })




})
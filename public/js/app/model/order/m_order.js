/**
 * Created by Administrator on 2015/5/6.
 */
/**
 * 没有优惠券
 * no-coupons(a) a-> this();
 */

function noCoupons(){
    var b1 =$(".no-bg-img"),b2 = $(".no-bg-img-ds");
    b1.show().css({"width":$(window).width(),"height":$(window).height()});
    b2.css({"width":$(window).width(),"height":$(window).height()});
}
/**
 * 放置优惠券
 * placeCoupon(a) a-> this();
 */
function placeCoupon(a){
var t =a,
    p= t.parent(),
    tId= t.attr("data-id"),
    tM= t.attr("data-m"),
    tJ= t.attr("data-j"),
    text= t.find("strong").text(),
    inp = $("#couponCode");
    p.find(".radiobox").removeClass("radiochecked");
    t.find(".radiobox").addClass("radiochecked");
    inp.val(text);
    inp.attr("data-id",tId);
    inp.attr("data-m",tM);
    inp.attr("data-j",tJ);
}
/**
 * 使用抵用券
 * useCoupon(a) a-> this();
 */
function useCoupon(){
    var c = $("#couponCode"),
         m =c.attr("data-m"),
         j =c.attr("data-j"),
         pic = $("#price").text();
         pic = pic.replace(/[^0-9]/g,'');
         pic = pic.substring(0,pic.length-2);

    if(Number(m)>Number(pic)){
        layer.msg("不可以使用该优惠券哦，没有满足条件")
    }else{
        layer.msg("可以使用");
        updatePrice();
    }
}
/**
 * 使用抵用券后更新价格
 * updatePrice(a) a-> this();
 */
function updatePrice(){

}
/* ------------------------- 我是华丽的分割线 -----------------------------       */
var d = new Date();
var n = d.getYear(); //当前年份
var nA = d.getFullYear();//完整的年份
var m = d.getMonth(); //当前月份
var date = d.getDate(); //当前日
var day = d.getDay(); //当前星期
var time = d.getTime();  //当前时间
var hours = d.getHours();
var minutes = d.getMinutes();
var timeStr = d.toLocaleTimeString();
var string = d.toDateString();
var DTime = CurTime();  //当前日期加时间
var DDay = CurDay(); //当前日期

var guoT = hours+""+minutes;


/**
 * 生成配送日期三天内的时间
 * dayHtmlM(a) a-> this();
 */
function dayHtmlM(t){
    var dH = '';
    var gD = 0;
    var time = parseInt(t);
    var arrT = ['今天','明天','后天','今天不能配送了'];
    var day1 = '今天';
    var day2 = '明天';
    var day3 = '后天';
    if(time>=1930){
        day1 = '今天不能配送了';
    }
    for(var i=0 ;i<3 ; i++){
        if(i == 0){
            dH += '<option value="'+ GetDateStr(i) +'" data-v="1">'+day1+'</option>';
        }else if(i == 1){
            dH += '<option value="'+ GetDateStr(i) +'">'+day2+'</option>';
        }else{
            dH += '<option value="'+ GetDateStr(i) +'">'+day3+'</option>';
        }

    }
    $("#selectDay").html(dH);

}
//获取指定天
function GetDateStr(AddDayCount){
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate(); //获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
}
//当前日期(如:2015-04-08)
function CurDay(){
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";

    if(day < 10)
        clock += "0";
    clock += day + " ";
    if (mm < 10) clock += '0';

    return(clock);


}

//当前日期加时间(如:2015-04-08 12:00)
function CurTime(){
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return(clock);


}


//生成时间html
function timeHtml(h){
    if(h<8){
        h = 8
    }
    var ay = timeArray(h+1);

    var tt = '';
    for(var i=0 ;i<ay.length;i++){
        tt += '<option value="'+ ay[i] +'">'+ ay[i] +'</option>';
    }

    if(ay.length< 1){
        tt = '<option value="no">已经已经打烊了噢</option>';
    }
    $("#selectTime").html(tt);
}
//生成时间数组
function timeArray(t){
    console.log(t);
    var time = t;
    var ay = [];
    var dt = time;
    if(time<10){
        for(var i=0 ; i< 11-(time-9);i++){
            var n = parseInt(dt) + parseInt(1);
            var s = dt+":00~"+ n + ":00";
            dt+=1;
            ay.push(s);
        }
    }else{
        for(var i=0 ; i< 11-(time-9);i++){
            var n = parseInt(dt) + parseInt(1);
            var s = dt+":"+ minutes +"~"+ n + ":"+ minutes;
            dt+=1;
            ay.push(s);
        }
    }

    return ay;
}
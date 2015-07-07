/**
 * Created by Administrator on 2015/3/24.
 */

-(function(){
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        var $windowHeight = $(window).innerHeight();
        scrollTop > 150 ? $("div.backTop").fadeIn(200).css("display","block") : $("div.backTop").fadeOut(200);
    });
    $('div.backTop').click(function (e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop:0},200);
    });
})();

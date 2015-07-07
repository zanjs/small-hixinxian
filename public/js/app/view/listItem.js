/**
 * Created by Administrator on 2015/4/16.
 */

function showFood(a){
    a.parent().parent().find(".hide").removeClass("hide");
}
function hideFood(a){
    var abc = a.parents(".abc");
    var li = abc.find("li");
    hideFoodAbc(li,abc);
}
function hideFoodAbc(li,abc){
    var liLen = abc.find("li").length;
    li.each(function(b){
        if(b>12){
            $(this).addClass("hide");
        }
    });
    if(liLen>12){
        abc.find(".reactMore").parent("li").removeClass("hide");
    }
}

function hideFoodA(){
    $("#food-wrap .abc").each(function(i){
        var abc = $(this);
        var li = abc.find("li");
        hideFoodAbc(li,abc);
    });


}
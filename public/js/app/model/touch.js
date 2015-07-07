/**
 * Created by Administrator on 2015/4/9.
 */
function transformBox(obj,value,has3d){
    var transl=has3d?"translate3d(0,"+value+"px,0)":"translate(0,"+value+"px)";
    obj.css({'-webkit-transform':transl});
}

function getTransY(obj){
    var transform=obj.css("-webkit-transform"),
        trans=transform.match(/\((.+)\)/),
        transY=0;
    if(trans){
        var transArr=trans[1].split(","),
            len=transArr.length;
        transY=transArr[len-2].replace("px","");
    }
    return Number(transY);
}
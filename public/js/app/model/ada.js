/**
 * Created by Administrator on 2015/4/8.
 */

var viewport = document.querySelector("meta[name=viewport]");
var winWidths=$(window).width();
var densityDpi=640/winWidths;

densityDpi= densityDpi>1?300*640*densityDpi/640:densityDpi;
//var js =' 100 / 640 = fontSize / W, fontSize = W / 640 * 100 = W / 6.4;'
//var w = 100/640 = fontSize / W, fontSize = W / 640 * 100 = W / 6.4;

if(screen.width>414){
    viewport.setAttribute('content', 'width=414, target-densityDpi=414');
}

//if(screen.width>414 && screen.width<720){
//    viewport.setAttribute('content', 'width=414, target-densityDpi=414');
//}
var ie = !-[1,];
//console.log(ie);



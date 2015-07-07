/**
 * Created by Administrator on 2015/4/9.
 */
/**
 * Created by Administrator on 2015/3/27.
 */

define(['zepto','zTouch','IScrollLoadData','model/list'],
    function ($,b,IScrollLoadData,c) {

        require(['model/list'],function(){
            setCategoryMenu();
        });
        Zepto(function($){

        })

        require(['model/touch'],function(){
            ab={
                iniT:200,
                iniL:200,
                iniAngle:180,
                sCallback:function(tPoint){
                    var _this=tPoint.self,
                        _inner=_this.children();
                    tPoint.setAttr("startOffset",getTransY(_inner));
                    Zepto("#showT").html("touchStart");
                },
                mCallback:function(tPoint){
                    var _this=tPoint.self,
                        _inner=_this.children(),
                        innerH=_inner.height();
                    var transY=getTransY(_inner);
                    var offset=tPoint.mY+tPoint.startOffset;
                    if(Math.abs(offset)>innerH-_this.height()+40){
                        offset=-(innerH-_this.height()+40);
                    }
                    if(offset>0){
                        offset=0;
                    }
                    //offset=tPoint.mY>0?offset/1.2:offset*1.2;
                    transformBox(_inner,offset,tPoint.has3d);
                    Zepto("#showT").html("translateY:"+transY+"  时间:"+tPoint.duration+"<br>X-Y轴移动:"+tPoint.mX+"px | "+tPoint.mY);
                }
            }
            Zepto("#touchBox").Swipe(ab);

            ac={
                iniT:200,
                iniAngle:180,
                sCallback:function(tPoint){
                    var _this=tPoint.self,
                        _inner=_this.children();
                    tPoint.setAttr("startOffset",getTransX(_inner));
                    Zepto("#showT").html("touchStart");

                },
                mCallback:function(tPoint){
                    var _this=tPoint.self,
                        _inner=_this.children(),
                        innerW=_inner.width();
                    var transY=getTransY(_inner);
                    var offset=tPoint.mX+tPoint.startOffset;
                    if(Math.abs(offset)>innerW-_this.width()+40){
                        offset=-(innerW-_this.width()+40);
                    }
                    if(offset>0){
                        offset=0;
                    }
                    //offset=tPoint.mY>0?offset/1.2:offset*1.2;

                    transformBox2(_inner,offset,tPoint.has3d);
                    Zepto("#showT").html("translateY:"+transY+"  时间:"+tPoint.duration+"<br>X-Y轴移动:"+tPoint.mX+"px | "+tPoint.mY);
                }
            }
            //Zepto("#touchBox2").Swipe(ac);

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
            Zepto("#touchBox2").Swipe(args);

            ad={
                iniAngle:15,
                speed: 300,
                sCallback:function(tPoint){
                    Zepto("#showT").html("touchStart");
                },
                mCallback:function(tPoint){
                    var _this=tPoint.self,
                        _inner=_this.find("#innerBox"),
                        innerW=_inner.width();
                    var offset=tPoint.mX+tPoint.count*innerW/4;
                    if(Math.abs(tPoint.angle)<15){
                        transformBox3(_inner,offset,0);
                    }
                    //$("#showT").html(tPoint.gStartDis+"  "+tPoint.gEndDis);
                    //$("#showT").html(tPoint.rotation+"  "+tPoint.gStartAngle+"  "+tPoint.gEndAngle);
                    Zepto("#showT").html("角度:"+tPoint.angle+"  时间:"+tPoint.duration+"<br>X轴移动距离"+tPoint.mX+"  Y轴移动距离："+tPoint.mY);
                },
                eCallback:function(tPoint){
                    var _this=tPoint.self,
                        _inner=_this.find("#innerBox"),
                        innerW=_inner.width(),
                        count=tPoint.count;

                    function slide(d){
                        switch(d){
                            case "left":
                                --count;
                                break;
                            case "right":
                                ++count;
                        }
                        count=(count==1||count==-tPoint.total)?tPoint.count:count;
                        var offset = count * innerW/tPoint.total;
                        transformBox3(_inner,offset,tPoint.speed);
                    }
                    slide(tPoint.direction);
                    Zepto("#showT").html("X-Y轴移动:"+tPoint.mX+"px | "+tPoint.mY+"px<br>X-Y轴限定:"+tPoint.iniL+" | "+tPoint.iniL+"<br>手势滑动方向："+tPoint.direction);
                    tPoint.setAttr("count",count);
                }
            }
            Zepto("#touchBox3").Swipe(ad);

        });



    });

/**
 * Created by Administrator on 2015/4/9.
 */
// 调整类别菜单栏宽度
function setCategoryMenu() {
    var sumWidth = 0;
    var styleId = $("#stypeId").val();
    var aA = $("#categoryUl a");
    aA.each(function(){
        var t = $(this);

        sumWidth +=  parseInt(t.width()+20);
        var v = t.attr("data-id");
        if(v == styleId){
            t.addClass("on");//显示高亮
        }

    });
    $('#categoryUl').width(sumWidth);

}

//导航动画函数
function anm(){
    var aR =$("#categoryUl").find("a");
    aR.each(function(i){
        var a = $(this);
        if(a.hasClass("on")){
            var lf = a.position().left;
            var w = a.width();
            $("#bomLine").animate({"left":lf,"width":w+20},500);
        }
    })
}

var slider = {
    // 判断设备是否支持touch事件
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    slider: document.getElementById('categoryUl'),

    // 事件
    events: {
        index: 0,                                       // 显示元素的索引
        slider: this.slider,                            // this为slider对象
        handleEvent: function(event) {
            // this指events对象
            var self = this;

            if (event.type == 'touchstart') {
                self.start(event);
            } else if(event.type == 'touchmove') {
                self.move(event);
            } else if(event.type == 'touchend') {
                self.end(event);
            }
        },

        // 滑动开始
        start: function(event) {
            event.preventDefault();                      // 阻止触摸事件的默认动作,即阻止滚屏
            var touch = event.touches[0];                // touches数组对象获得屏幕上所有的touch，取第一个touch
            startPos = {                                 // 取第一个touch的坐标值
                x: touch.pageX,
                y: touch.pageY,
                time: +new Date
            };

            // 绑定事件
            this.slider.addEventListener('touchmove', this, false);
            this.slider.addEventListener('touchend', this, false);
        },

        // 移动
        move: function(event) {
            event.preventDefault();                      // 阻止触摸事件的默认行为，即阻止滚屏

            // 当屏幕有多个touch或者页面被缩放过，就不执行move操作
            if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
            var touch = event.touches[0];
            endPos = {
                x: touch.pageX - startPos.x,
                y: touch.pageY - startPos.y
            };

            // 执行操作，使元素移动
            this.slider.className = 'cnt';
            alert("000");
            this.slider.style.left = -this.index * 600 + endPos.x + 'px';
        },

        // 滑动释放
        end: function(event) {
            var duration = +new Date - startPos.time;    // 滑动的持续时间

            this.icon[this.index].className = '';
            if (Number(duration) > 100) {
                // 判断是左移还是右移，当偏移量大于50时执行
                if (endPos.x > 50) {
                    if(this.index !== 0) this.index -= 1;
                } else if(endPos.x < -50) {
                    if (this.index !== 4) this.index += 1;
                }
            }

            this.slider.className = 'cnt f-anim';
            this.slider.style.left = -this.index*600 + 'px';
            this.icon[this.index].className = 'curr';

            // 解绑事件
            this.slider.removeEventListener('touchmove', this, false);
            this.slider.removeEventListener('touchend', this, false);
        }
    },

    // 初始化
    init: function() {
        // this指slider对象
        var self = this;

        // addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
        if(!!self.touch) self.slider.addEventListener('touchstart', self.events, false);
    }
};
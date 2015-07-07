/**
 * Created by Administrator on 2015/4/10.
 */
/**
 * Created by Administrator on 2015/3/27.
 */

define(['jquery','IScrollLoadData','layer'],function ($,IScrollLoadData,layer) {

        $(function () {
            function dropBottomAction(cb){
                setTimeout(function(){
                    var d=document.createDocumentFragment();
                    var ul=document.createElement('ul');
                    ul.className= 'list_float_u';
                    var html = '';
                    for(var i=0;i<1;i++){                        // 下拉加载数据
                        html +='<li><a href="javascript:;"><div class="imgReBox"><img src="http://img30.360buyimg.com/n2/jfs/t856/220/305964818/123914/e287da92/55152264N430642b8.jpg"width="100%"><i class="icon_plus_normal"data-id="18"></i><i class="checked"style="display:none;"></i></div><span>太姥清韵白茶饼/饼</span><var>￥198.00</var></a></li>';
                    }
                    ul.innerHTML = html
                    d.appendChild(ul);
                    cb(d);
                },100);
                layer.load(3);

            }
            function dropTopAction(cb){

            }
            function loaded(){
                var wrapper=document.querySelector('#wrapper');
                var content=document.querySelector('#theList');
                new IScrollLoadData(wrapper,content,dropTopAction ,dropBottomAction,30);
                //new IScrollLoadData(wrapper,content,dropTopAction,dropBottomAction,30);
            }
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            loaded();
        });
    });

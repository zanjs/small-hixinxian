/**
 * Created by Administrator on 2015/4/9.
 */
//  反选function
function NoCheckAll(){
    var box = $("#goodsList");
    var items = box.find(".items");
    items.each(function(i){
        var ts = $(this);
        var check = ts.find(".checkbox");
        check.removeClass("checked");
    })
}
//  全选function
function CheckAll(){
    var box = $("#goodsList");
    var items = box.find(".items");
    items.each(function(i){
        var ts = $(this);
        var check = ts.find(".checkbox");
        check.addClass("checked");
    })

    upDataG();
}
//    判断选中的商品删除
function CheckedDel(){
    var box = $("#goodsList");
    var items = box.find(".items");
    var array = []; //获取要删除的购物车商品id
    items.each(function(i){
        var ts = $(this);
        var check = ts.find(".checkbox");
        if(check.hasClass("checked")){
            ts.remove();
            var input = ts.find(".buyNumber");
            var vId = input.attr("data-id");
            array.push(vId);
        }

    })

    layer.load("删除商品id"+array,1)
    //layer.load("删除成功",1)
    upDataG(); //更新数量
}
//    更新商品数
function upDataG(){
    var box = $("#goodsList");
    var items = box.find(".items");
    var it = 0;
    items.each(function(i){
        var ts = $(this);
        var check = ts.find(".checkbox");
        if(check.hasClass("checked")){
            it += 1;

        }
    });
    $("#sale-off-num").text(it);
    upDataP();
    upDataB();
    cartNull();

}
upDataG();
//    更新总价
function upDataP(){
    var box = $("#goodsList");
    var items = box.find(".items");
    var price = 0;
    items.each(function(i){
        var ts = $(this);
        var check = ts.find(".checkbox");
        if(check.hasClass("checked")){
            var input = ts.find(".buyNumber");
            var num = input.val();
            var pic = Number(input.attr("data-pic"))*num;
            price += pic;
        }
    });
    price = toDecimal2(price);
    $("#sPrice").text(price);
    cartNull();
}
//更新全选按钮
function upDataB(){
    var box = $("#goodsList");
    var checked = box.find(".checked");
    if(checked.length < 1){
        $("#checkAll").removeClass("checked");
    }

}
//获取选中的商品id 号数组
function selId(){
    var box = $("#goodsList");
    var items = box.find(".items");
    var id = [];
    items.each(function(i){
        var ts = $(this);
        var check = ts.find(".checkbox");
        if(check.hasClass("checked")){
            var input = ts.find(".buyNumber");
            var vId = input.attr("data-id");
            id.push(vId);
        }
    });

    return id;
}
//    判断商品购物车是否为空
function cartNull(){
	
    var box = $("#goodsList");
  
    var item = box.find(".items");
  
    var noD = $("#cart_num_no");
 
    var footD = $(".footerBar");
   
    var topBtn = $("#topBtn");
  
    if(item.length<1){
        noD.show();
        footD.hide();
        topBtn.hide();
    }else{
        noD.hide();

    }
}
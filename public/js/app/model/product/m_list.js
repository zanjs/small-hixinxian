/**
 * 调整类别菜单栏宽度
 */
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
/**
 * 导航动画函数
 */
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

/**
 * 获取用户默认地址
 * defaultAddress(a.b) a->用户ID b->商户ID
 */
function defaultAddress(a,b){
    /* 获取用户默认地址 */
    var lId = a,mId=b;
    $.ajax({
        type : "POST",
        url : "defaultAddressAction!getFindDefault",
        data : "loginId=" + lId + "&merchantsId="+mId,
        dataType : "json",
        success : function(msg) {
            var items = msg.result;
            var price = msg.produceprice;
            var num = msg.producenum;
            if (items == "500") {
                console.log("网络异常");
            } else {
                $("#addressId").val(items);
                $("#shoppingPrice").val(toDecimal2(Number(price)));
                $("#shoppingNum").val(parseInt(num));
                $(".num-u-s").html(parseInt(num));
                $(".price-s").html("￥"+ (toDecimal2(Number(price))));
            }
        }
    });
}
/*
* 分类更换
* typeUP(a,b) a->this b->分类id,
* */
function typeUP(a,b){
    var t= $("#"+a),m= b,Tid = b,mId= $("#mId").val(),text = t.text();
    layer.load();
    $(".headerDiv .title").text(text);
    $("#categoryMenu").find("a").removeClass("on");
    t.addClass("on");
    anm();
    $("#theList").html("");// 数据清空
    $("#currentPage").val("0"); // 页数恢复0
    $("#btypeId").val(Tid);// 主类ID赋值
    ProduceClassify(0, mId, Tid);
}
 /**
 * 获取分类产品
 */
function ProduceClassify(currentPage,mId,btypeId) {
	$("#onOff").val("false");
	$.ajax({
		type : "POST",
		url : "produceClassifyAction!getClassifyProduce",
		data : "currentPage="+currentPage+"&merchantsId="+mId+"&btypeId="+btypeId,
		success : function(msg) {
			var result = msg.result;
			
			if(result == "200"){
				var items = msg.list;
				// 返回数据正常情况
				if (items != null) {
                    createProduct(items);
				}else{
                    layer.closeAll();
					//layer.msg("亲,没有数据喽", 1, 8);//不做任何处理
				}	
			}else if(result == "500"){
				layer.msg("网络异常", 1, 8);
			}      
		}
	});

}
//
/**
 * 产品列表数据生成
 * createProduct(a) a ->data,
 */
function createProduct(a){
    var items = a,
        str = "<ul class='list_float_u'>";
    for ( var i in items) {
        str+='<li class="prod"  data-produceid="'+items[i].produceId+'"  data-price="'+items[i].producePrice+'"  data-merchantsid="'+ items[i].loginId +'">' +
        '<a href="javascript:;"><div class="imgReBox">' +
        '<img src="'+ items[i].producePic+'" width="100%">' +
        '<i class="icon_plus_normal" id="addBtn'+items[i].produceId+'"></i>' +
        '<i class="checked" style="display:none;"></i></div>' +
        '<span>'+items[i].produceName+'&nbsp;'+items[i].produceSpec+'</span>' +
        '<var>￥'+items[i].producePrice+'</var></a></li>';
        if ((parseInt(i) + parseInt(1)) % 2 === 0) {
            str += '</ul><ul>';
        }
    }
    if (items.length % 2 === 0) {
        str = str.substring(0, str.length - 4);
    } else {
        str = str + "<li></li></ul>";
    }
    //追加数据
    $("#theList").append(str);
    // 修改当前页数
    var page =$("#currentPage").val()
    $("#currentPage").val(parseInt(page)+30);
    console.log($("#currentPage").val());
    if (items.length % 2 === 0) {
        $("#onOff").val("true");
    } else {
        $("#onOff").val("false");
    }
    layer.closeAll();
}
/**
 * 添加到购物车
 * addCart(a) a ->this,
 */
function addCart(a){
    var t = a,
     pLi = t.parents("li"),
     pId = pLi.attr("data-produceid"),// 产品ID
     producePrice = pLi.attr("data-price"), // 产品价格
     mId = $("#mId").val(),
     lId = $("#lId").val(),
     addressId = $("#addressId").val();
    if( "" != addressId){
        if ("" != pId && "" != mId && "" != lId && "" != producePrice) {
            $.ajax({
                type: "POST",
                url: "shoppingAction!insertShopping",
                data: "loginId=" + lId + "&merchantsId=" + mId + "&productId=" + pId + "&addressId=" + addressId + "&producePrice=" + producePrice,
                dataType: "json",
                success: function(msg) {
                    var items = msg.result;
                    if (items == "200") {

                        // 当前商品总价
                        var price_t = $("#shoppingPrice").val();
                        // 当前商品总数量
                        var Num_t = $("#shoppingNum").val();
                        $(".num-u-s").html(parseInt(Num_t) + 1);
                        $(".price-s").html("￥" + (toDecimal2(Number(price_t) + Number(producePrice))));
                        $("#shoppingPrice").val(toDecimal2(Number(price_t) + Number(producePrice)));
                        $("#shoppingNum").val(parseInt(Num_t) + 1);
                        layer.msg("添加成功", 1, 1,
                            function() {
                                var checked = pLi.find(".checked");
                                checked.css("display", "block");
                            })
                    } else {
                        alert("网络异常,请检查您的网络");
                    }
                }
            });
        } else {
            alert("网络异常！");
        }
    }else{
        if(confirm("请添加收货地址哦")){
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc864d4ebc9f8b76c&redirect_uri=http://us.hixinxian.com/oauthAction!getCode&response_type=code&scope=snsapi_base&state=895caa4a38cd65b75306b7f68127d669#wechat_redirect";
        }
    }
}

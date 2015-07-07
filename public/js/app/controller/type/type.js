/**
 * Created by zan on 2015/4/15.
 */
define(['layer'],function (a,b) {

    require(['model/uf.min'],function(){
        document.addEventListener("touchstart", function(){
        }, true);

        /*分类详情*/
        $("#type_food").on("click","a",function(){
        	$("#btypeId").val($(this).attr("data-id"));
        	$("#produceclassifyform").submit();
        });

        /*商品详情*/
        $("#food-wrap").on("click",".prods",function(){
            lookProduct();
        });
        
        /*查看购物车*/
    	$("#myShpping").on("click",function(){
            lookCart();
    	});


    })

    require(['view/backTop']);


})
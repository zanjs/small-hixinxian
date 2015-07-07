/**
 * Created by Administrator on 2015/5/6.
 */
define(['layer'], function(a) {

    require(['model/coupon/m_coupon.min'],function(){

        /*添加抵用券*/
        $("#add-coupon-btn").on("click",function(){
           var text = $(".add-text"),v= text.val();
            addCoupon(v);
        })
    })
})
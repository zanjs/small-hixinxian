/**
 * Created by Administrator on 2015/3/25.
 */
define(['layer'], function() {
	/* 添加城市 */

    require(['model/uf.min','model/address/m_address'],function(){
	    $("#area").on("click",function() {
            showCity1();
		});

            /* 选择市级 */
            $("#citySelect").on("click","li",function() {
				var t = $(this);
				var cityval = t.attr("data-val");
				var cityId = t.attr("data-id");
				$("#cityName").val(cityval);// 赋值
                showCity2();
                return false;
			});

        /* 选择市级 */
        $("#countySelect").on("click", "li", function() {
            var t = $(this);
            var districtName = t.attr("data-val");
            var districtId = t.attr("data-id");
            $("#districtName").val(districtName);// 赋值
            //$("#districtId").val(districtId);// 赋值

            $("#area").val($("#cityName").val() + $("#districtName").val());
            $("#choiseProvinceMask_city").css("display", "none");
            $("#choiseProvinceMask_county").css("display", "none");
            $("#addressMsg").css("display", "block");
            $(".btn_pay_style").css("display","block");
        });
	

        /*提交表单*/
        $("#add_address").on("click",function(){
            validationForm();
        });

        /*提交表单*/
        $("#update_address").on("click",function(){
            validationForm();
        });

    })

});
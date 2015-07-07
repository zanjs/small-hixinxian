-function() {

	$(function() {

		var shop = $(".shop_sort_lan");

		shop.each(function() {

			var t = $(this);

			var li = t.find("li");

			li.each(function(i) {
				var tLi = $(this);
				var tpmore = tLi.parent().find(".list_more");

				if (i < 11) {
					tLi.removeClass("hide");

				} else if (i > 11) {
					tpmore.show();
				}

			});

		});

	});

}()
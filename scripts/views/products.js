define([
	"app",
	"marionette",
	"text!templates/products.html",
	"vent"
	], function (App, Marionette, ProductsTemplate, Vent) {

	var ProductsView = Marionette.ItemView.extend({

		attributes: {
			id: "products"
		},

		tagName: "div",

		template: function(data) {
			return _.template(ProductsTemplate);
		},

		events: {

		},

		initialize: function () {
			$(".preloader").fadeOut(400);
		},

		onClose: function () {
			Vent.unbind("RemoveView");
		},

		onShow: function () {
			var view  = this;

			Vent.bind("RemoveView", this.removeView, this);

			setTimeout(function(){
				view.showProducts();
			}, 100)

		},

		showProducts: function () {
			var list = this.$('.content').children().children();

			$.each(list, function(i, el){
			    setTimeout(function(){
			       $(el).addClass("show");
			    },( i * 100 ));
			});
		},

		removeView: function () {
			$("#products .wrapper").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		}

	});

	return ProductsView;

})
define([
	"app",
	"marionette",
	"text!templates/products.html"
	], function (App, Marionette, ProductsTemplate) {

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
			
		}

	});

	return ProductsView;

})
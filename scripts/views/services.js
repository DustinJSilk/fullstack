define([
	"app",
	"marionette",
	"text!templates/services.html"
	], function (App, Marionette, ServicesTemplate) {

	var ServicesView = Marionette.ItemView.extend({

		attributes: {
			id: "services"
		},

		tagName: "div",

		template: function(data) {
			return _.template(ServicesTemplate);
		},

		events: {

		},

		initialize: function () {
			
		}

	});

	return ServicesView;

})
define([
	"app",
	"marionette",
	"text!templates/about.html"
	], function (App, Marionette, AboutTemplate) {

	var AboutView = Marionette.ItemView.extend({

		attributes: {
			id: "about"
		},

		tagName: "div",

		template: function(data) {
			return _.template(AboutTemplate);
		},

		events: {

		},

		initialize: function () {
			
		}

	});

	return AboutView;

})
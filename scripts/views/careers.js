define([
	"app",
	"marionette",
	"text!templates/careers.html"
	], function (App, Marionette, CareersTemplate) {

	var CareersView = Marionette.ItemView.extend({

		attributes: {
			id: "careers"
		},

		tagName: "div",

		template: function(data) {
			return _.template(CareersTemplate);
		},

		events: {

		},

		initialize: function () {
			
		}

	});

	return CareersView;

})
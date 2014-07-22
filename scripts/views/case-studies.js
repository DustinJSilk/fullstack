define([
	"app",
	"marionette",
	"text!templates/case-studies.html"
	], function (App, Marionette, CaseStudiesTemplate) {

	var CaseStudiesView = Marionette.ItemView.extend({

		attributes: {
			id: "case-studies"
		},

		tagName: "div",

		template: function(data) {
			return _.template(CaseStudiesTemplate);
		},

		events: {

		},

		initialize: function () {
			
		}

	});

	return CaseStudiesView;

})
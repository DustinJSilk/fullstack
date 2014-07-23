define([
	"app",
	"marionette",
	"text!templates/about.html",
	"vent"
	], function (App, Marionette, AboutTemplate, Vent) {

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
			Vent.bind("RemoveView", this.removeView);
		},

		onShow: function () {
			var view = this;

			setTimeout(function(){
				$(".about-copy").addClass("show")
			}, 100)

			setTimeout(function(){
				view.showAboutBlocks();
			}, 300)
		},

		showAboutBlocks: function () {
			$.each($('.about-images'), function(i, el){
			    setTimeout(function(){
			       $(el).addClass("show");
			    },( i * 100 ));
			});
		},

		removeView: function () {
			$("#about .content").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		}

	});

	return AboutView;

})
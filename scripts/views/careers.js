define([
	"app",
	"marionette",
	"text!templates/careers.html",
	"vent"
	], function (App, Marionette, CareersTemplate, Vent) {

	var CareersView = Marionette.ItemView.extend({

		attributes: {
			id: "careers"
		},

		tagName: "div",

		template: function(data) {
			return _.template(CareersTemplate);
		},

		events: {
			"click .apply" : "showForm"
		},

		initialize: function () {
		},

		onClose: function () {
			Vent.unbind("RemoveView");
		},

		onShow: function () {
			var view = this;

			Vent.bind("RemoveView", this.removeView);

			setTimeout(function(){
				view.checkScrolling();
			}, 100)
		},

		checkScrolling: function () {
			var view = this;

			$(window).scroll(function(){
				
				for ( var i = 0; i < view.$('.content').length; i ++) {

					var appearHeight = $(window).height() / 3;
					var htmlHeight = $('html').height();
					var windowHeight = $(window).height();
					var windowScroll = $(window).scrollTop();
					var offsetDistance = view.$('.content').eq(i).offset().top;
					var isntVisible = !view.$('.content').eq(i).hasClass("shown");
					var isntColored = view.$('section').eq(i).hasClass("color-change");

					if ( (windowScroll > (offsetDistance - windowHeight + appearHeight) &&  isntVisible) 
						|| ( windowScroll + windowHeight > htmlHeight - 100) ) {
						view.showContent(i);
					}
					
					if ( windowScroll > (offsetDistance - windowHeight + appearHeight - 100) &&  isntColored )   {
						view.$('section').eq(i).removeClass("color-change");
					}

				}				
				
			});
		},

		showContent: function (contentNumber) {
			var list = this.$(".content").eq(contentNumber).children();
			$.each(list, function(i, el){
			    setTimeout(function(){
			       $(el).addClass("show");
			    },( i * 100 ));
			});
			this.$(".content").eq(contentNumber).addClass("shown");
		},

		showForm: function (e) {
			$(e.target).closest("section").addClass("show-form");
		},

		removeView: function () {
			$("#careers .wrapper").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		}

	});

	return CareersView;

})
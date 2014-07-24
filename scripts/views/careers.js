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

		},

		initialize: function () {
			Vent.bind("RemoveView", this.removeView);
		},

		onShow: function () {
			var view = this;

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

					if ( (windowScroll > (offsetDistance - windowHeight + appearHeight) &&  isntVisible) 
						|| ( windowScroll + windowHeight > htmlHeight - 100) ) {
						view.showContent(i);
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

		removeView: function () {
			$("#careers .content").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		}

	});

	return CareersView;

})
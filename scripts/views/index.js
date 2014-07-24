define([
	"app",
	"marionette",
	"text!templates/index.html",
	"vent"
	], function (App, Marionette, IndexTemplate, Vent) {


	var IndexView = Marionette.ItemView.extend({

		attributes: {
			id: "home"
		},

		tagName: "div",

		template: function(data) {
			return _.template(IndexTemplate);
		},

		events: {
			"click #contact-us-link": 		"contactUs",
		},

		initialize: function () {
			Vent.bind("RemoveView", this.removeView);
		},

		onClose: function () {
			$(window).unbind("resize.services-blocks");
		},

		onShow: function () {
			var view = this;
			
			view.equalizeServices();

			setTimeout(function(){
				view.checkScrolling();
			}, 300)
		},

		//Make services blocks all have the same height
		equalizeServices: function () {
			var that = this;

			var tallestBlock = 0;

			$(window).bind("resize.services-blocks", function () {
				$('.services .block').height("");
				tallestBlock = 0;

				for ( var i = 0; i < 4; i ++ ) {
					var h = $('.services .block').eq(i).height();
					tallestBlock = (tallestBlock < h) ? h : tallestBlock;
				}

				$('.services .block').height(tallestBlock);
			
			});
		},

		contactUs: function () {
			//animate to top then navigate
    		$('html,body').animate({ scrollTop: 0 }, 800, function(){
    			setTimeout(function(){
    				Vent.trigger("GoTo", "#!/contact", {trigger: true});
    			}, 300)
        	});
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
			var list = this.$(".content").eq(contentNumber).find(".fade-item");
			$.each(list, function(i, el){
			    setTimeout(function(){
			       $(el).addClass("show");
			    },( i * 100 ));
			});
			this.$(".content").eq(contentNumber).addClass("shown");
		},

		removeView: function () {
			$("#home .content").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		}

	});

	return IndexView;

})
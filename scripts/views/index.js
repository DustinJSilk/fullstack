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
			"click .services-link" : 		"servicesLink"
		},

		initialize: function () {
			$(".preloader").fadeOut(400);
		},

		onClose: function () {
			$(window).unbind("resize.services-blocks");
		},

		onShow: function () {
			var view = this;
			
			Vent.bind("RemoveView", this.removeView);

			$('html,body').animate({ scrollTop: 0 }, 800);

			setTimeout(function(){
				view.checkScrolling();
				view.showContent(0);
				view.equalizeServices();
			}, 3000)

		},

		//Make services blocks all have the same height
		equalizeServices: function () {
			var that = this;

			var tallestBlock = 0;
			var childrenHeight = 0;

			$(window).bind("resize.services-blocks", function () {
				$('.services .block').height("");
				tallestBlock = 0;
				childrenHeight = 0;


				//check height of blocks
				for ( var i = 0; i < 4; i ++ ) {
					
					var h = $('.services .block').eq(i).height();

					//check height of hover orange text
					var children = $('.services .block .hover-text').eq(i).children();
					for (var n = 0; n < 3; n ++) {
						childrenHeight += children.eq(n).outerHeight(true);
					};

					h = (childrenHeight < h) ? h : childrenHeight;

					tallestBlock = (tallestBlock < h) ? h : tallestBlock;

					childrenHeight = 0;

				}

				$('.services .block').height(tallestBlock);
			});

			$(window).resize();
		},

		contactUs: function () {
    		Vent.trigger("GoTo", "#!/contact", {trigger: true});
    		$('html,body').animate({ scrollTop: 0 }, 800);
		},

		servicesLink: function () {
			Vent.trigger("GoTo", "#!/services", {trigger: true});
    		$('html,body').animate({ scrollTop: 0 }, 800);
		},

		//The scroll event to control the fade in of elements
		checkScrolling: function () {
			var view = this;

			$(window).scroll(function(){
				
				for ( var i = 0; i < view.$('.content').length; i ++) {

					var appearHeight = $(window).height() / 5;
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
			var list = this.$(".content").eq(contentNumber).find(".fade-item");
			$.each(list, function(i, el){
			    setTimeout(function(){
			       $(el).addClass("show");
			    },( i * 100 ));
			});
			this.$(".content").eq(contentNumber).addClass("shown");
		},

		removeView: function () {
			$("#home .wrapper").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 2500)
		}

	});

	return IndexView;

})
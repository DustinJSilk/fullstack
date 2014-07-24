define([
	"app",
	"marionette",
	"text!templates/mobile-navigation.html",
	"vent"
	], function (App, Marionette, NavigationTemplate, Vent) {


	var NavigationView = Marionette.ItemView.extend({

		attributes: {
			id: "mobile-nav-bar"
		},

		tagName: "div",

		template: function(data) {
			return _.template(NavigationTemplate);
		},

		events: {
			"click #link-index": 				"index",
			"click #link-about": 				"about",
			"click #link-services": 			"services",
			//"click #link-clients": 				"clients",
			"click #link-products": 			"products",
			"click #link-case-studies": 		"caseStudies",
			"click #link-fullstack-events": 	"fullstackEvents",
			"click #link-careers": 				"careers",
			"click #link-contact": 				"contact",
			"click #nav-logo img": 				"index",
			"click #mobile-hamburger": 			"mobileMenu"
		},

		onShow: function () {
			this.resizeReposition();
		},

		navigateToHome: function () {
			$("#navigation").addClass("home");
		},

		navigateFromHome: function () {
			$("#navigation").removeClass("home");
		},

		navigateTo: function (route) {
			var list = $("#mobile-navigation").find("li");

			$.each(list, function(i, el){
			    setTimeout(function(){
			        $(el).removeClass("show");
			    },( i * 50 ));
			});

			setTimeout(function() {
				$('body').removeClass("show-menu");
				setTimeout(function(){
					Vent.trigger("GoTo", route, {trigger: true});
				}, 800)
			}, 800)
		},

		resizeReposition: function () {
			var view = this;

			$(window).bind('resize.mobile-navigation', function() {
				view.resizing();
			})
		},

		resizing: function () {
			var resizeTimer;

			if (resizeTimer) {
			    clearTimeout(resizeTimer);   // clear any previous pending timer
			}
			 // set new timer
			resizeTimer = setTimeout(function() {
			    resizeTimer = null;
				var height = $("#mobile-navigation").height();
				$("#mobile-navigation").css({"margin-top": height / -2});
			}, 50);
		},

		index: function () {
			this.navigateTo("#!/");
		},

		about: function () {
			this.navigateTo("#!/about");
		},

		services: function () {
			this.navigateTo("#!/services");
		},

		clients: function () {
			this.navigateTo("#!/clients");
		},

		products: function () {
			this.navigateTo("#!/products");
		},

		caseStudies: function () {
			this.navigateTo("#!/case-studies");
		},

		fullstackEvents: function () {
			this.navigateTo("#!/events");
		},

		careers: function () {
			this.navigateTo("#!/careers");
		},

		contact: function () {
			this.navigateTo("#!/contact");
		}

	});

	return NavigationView;

})
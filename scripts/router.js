define(["marionette", "controller", "vent" ], function (Marionette, Controller, Vent){
	
	var AppRouter = Marionette.AppRouter.extend({
		
		appRoutes: {
			"" : 						"index",
			"!" : 						"index",
			"!/" : 						"index",
			"!/index": 					"index",
			"!/about": 					"about",
			"!/services": 				"services",
			"!/clients": 				"clients",
			"!/products": 				"products",
			"!/case-studies": 			"caseStudies",
			"!/fullstack-events": 		"fullstackEvents",
			"!/careers": 				"careers",
			"!/contact": 				"contact",
			"!/error": 					"error",
			"!/404-error": 				"notFound",
			'*notFound': 				'notFound'
		},

		controller: Controller,

		initialize: function () {
			_.bindAll(this, "GoTo");
            Vent.bind("GoTo", this.GoTo);

            require([ "app", "views/navigation", "views/mobile-navigation", "views/orange-description"], function (App, NavigationView, MobileNavigationView, OrangeDescriptionView) {
                App.navigation.show(new NavigationView());
                App.mobileNavigation.show(new MobileNavigationView());
                App.orangeDescription.show(new OrangeDescriptionView());
            })
		},

        GoTo: function (route, args) {
    		$('body').removeClass("menu");
    		this.navigate(route, args);
        }

	});

	return AppRouter;

});
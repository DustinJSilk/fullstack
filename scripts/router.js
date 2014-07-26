define(["marionette", "controller", "vent", "googleanalytics"], function (Marionette, Controller, Vent, Googleanalytics){
	
	var AppRouter = Marionette.AppRouter.extend({
		
		appRoutes: {
			"!/" : 						"index",
			"!/index": 					"index",
			"!/about": 					"about",
			"!/services": 				"services",
			"!/clients": 				"clients",
			"!/products": 				"products",
			"!/case-studies": 			"caseStudies",
			"!/events": 				"fullstackEvents",
			"!/events/:eventName": 		"fullstackEvent",
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

            _.bindAll(this, "ViewOut");
            Vent.bind("ViewOut", this.ViewOut);

            require([ "app", "views/navigation", "views/mobile-navigation", "views/orange-description"], function (App, NavigationView, MobileNavigationView, OrangeDescriptionView) {
                App.navigation.show(new NavigationView());
                App.mobileNavigation.show(new MobileNavigationView());
                App.orangeDescription.show(new OrangeDescriptionView());
            })

            if (window.location.hash && window.location.hash.length > 2){
            	this.curRoute = "#!/" + window.location.hash.split("/")[1].toLowerCase();
            } else {
            	this.curRoute = "#!/";
            }
            

		},

        GoTo: function (route, args) {
    		$('body').removeClass("menu");
    		if (this.curRoute !== route) {
    			this.curRoute = route;
	    		this.args = args;
	    		Vent.trigger("RemoveView");
    		}
        },

        ViewOut: function () {
        	this.navigate(this.curRoute, this.args);
        }
		
		


	});

	return AppRouter;

});
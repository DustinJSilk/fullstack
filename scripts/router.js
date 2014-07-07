define(["marionette", "controller" ], function (Marionette, Controller){
	
	var AppRouter = Marionette.AppRouter.extend({
		
		appRoutes: {
			"" : 						"index",
			"index": 					"index",
			"error": 					"error",
			"404-error": 				"notFound",
			'*notFound': 				'notFound'
		},

		controller: Controller,

	});

	return AppRouter;

});
define([
	"app",
	"backbone",
	"vent"
	], function (App, Backbone, Vent) {

	var ContactModel = Backbone.Model.extend({

		url: "api/contact",

		defaults: {
			Name: null,
			Email: null,
			Position: null,
			Message: null
		},

		validation: {
		    Name: {
		    	required: true
		    },
		    Email: {
		    	required: true,
		      	pattern: 'email'
		    },
		    Subject: {
		    	required: true
		    },
		    Message: {
		    	required: true	    	
		    }
		}

	});

	return ContactModel;

});
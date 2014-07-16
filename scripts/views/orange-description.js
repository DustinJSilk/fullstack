define([
	"app",
	"marionette",
	"text!templates/orange-description.html",
	"vent"
	], function (App, Marionette, OrangeDescriptionTemplate, Vent) {


	var OrangeDescriptionView = Marionette.ItemView.extend({

		attributes: {
		},

		tagName: "div",

		template: function(data) {
			return _.template(OrangeDescriptionTemplate);
		},

		events: {
		},

		initialize: function () {
			Vent.on('GoTo', this.listenToEvents, this);
			this.currentView = window.location.hash.replace("#!/", "").toLowerCase().trim();
		},

		onShow: function () {
			if (this.currentView !== "" && this.currentView !== "index") {
				this.showOrange(this.currentView);
			}
		},

		listenToEvents: function (route, args) {

			//Get the new route
		    var routeID = route.replace("#!/", "").toLowerCase().trim();
		    if (routeID.length < 1 ) routeID = "index";
		    

		    //if its routing index - hide the orange
		    if ( routeID === "index" ) {
		    	this.hideOrange();


		    //if its routing from index to another view, show the orange
		    } else if ( this.currentView === "index" || this.currentView.length === 0) {
		    	this.showOrange(routeID);


		    //Otherwise animate from one title to another
		    } else {
		    	this.changeOrange(routeID);
		    }

		    this.currentView = routeID;
		},


		hideOrange: function () {
			$(".orange-description-text").removeClass("in");
			$(".orange-description-text").addClass("out");
			$("#orange-description").height(0);
		},


		showOrange: function (route) {
			$(".orange-description-text").removeClass("out");
			$(".orange-description-text").addClass("in");
			$(".orange-description-text").html(this.getNewText(route));

			var height = $(".orange-description-text").height();

			$("#orange-description").height(height);
		},


		changeOrange: function (route) {
			var newText = this.getNewText(route);
		},


		getNewText: function (route) {

			var h1, h2, title;
			switch (route) {

		    	case "index":
		    		console.error("There is no orange text for the index page.");
		    		break;

		    	case "about": 
		    		h1 = "About";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "services": 
		    		h1 = "Services";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "clients": 
		    		h1 = "Clients";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "products": 
		    		h1 = "Products";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "case-studies": 
		    		h1 = "Case Studies";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "fullstack-events": 
		    		h1 = "Events";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "careers": 
		    		h1 = "Careers";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "contact": 
		    		h1 = "Contact";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "error": 
		    		h1 = "Error";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "404-error": 
		    		h1 = "404 Error";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;
		    }

		    title = "<h1>" + h1 + "</h1><h2>" + h2 + "</h2>";

		    return title;
		}

	})

	return OrangeDescriptionView;

});
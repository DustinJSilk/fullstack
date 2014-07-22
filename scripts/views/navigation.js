define([
	"app",
	"marionette",
	"text!templates/navigation.html",
	"vent"
	], function (App, Marionette, NavigationTemplate, Vent) {


	var NavigationView = Marionette.ItemView.extend({

		attributes: {
			id: "nav-bar"
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
			"click #nav-logo img": 				"index"
		},

		initialize: function () {
			Vent.on('GoTo', this.listenToEvents, this);

			//Always remember previous route - for animating to/from home
			this.previousRoute = window.location.hash.replace("#!/", "").toLowerCase();
		    if (this.previousRoute.length < 1 ) this.previousRoute = "index";

		    if (this.previousRoute === "index") {
		    	$("#navigation").addClass("home")
		    }
		},

		onShow: function () {
			var view = this;

			//show the orange selector bar
			setTimeout(function(){
				view.initiateSelectorBar();
			}, 200);

			this.resizeReposition();
		},


		//Listening for route changes to animate the orange bar and home view
		listenToEvents: function (route, args) {

			//Extract route
		    var routeID = route.replace("#!/", "").toLowerCase();
		    if (routeID.length < 1 ) routeID = "index";

		    //animate navigation if going to/from home
		    if (routeID === "index") {
		    	this.navigateToHome();
		    } else if (routeID !== "index" && this.previousRoute === "index") {
		    	this.navigateFromHome();
		    } else {
		    	this.positionSelectorBar(routeID);
		    }

		    this.previousRoute = routeID;

		},


		initiateSelectorBar: function () {
			var view = this;


			//create selector bar
			var bar = '<div id="nav-selector"></div>';
			$('.nav-list').prepend(bar);


			//resize and position correctly before showing
			var route = window.location.hash.replace("#!/", "").toLowerCase();
		    if (route.length < 1 ) route = "index";
			view.positionSelectorBar(route);


			//animate in
			setTimeout(function(){
				$("#nav-selector").addClass("show");
			}, 100)
			
		},


		positionSelectorBar: function (routeID) {
			var leftPosition = $("#link-" + routeID).parent().position().left;
		    var width = $("#link-" + routeID).parent().width();
		    
		    $("#nav-selector").css({
		    	"left": leftPosition - 5,
		    	"width": width + 10
		    });
		},

		resizeReposition: function () {
			var view = this;

			$(window).bind('resize.nav-bar', function () {
				view.positionSelectorBar(view.previousRoute);
			});
		},

		navigateToHome: function () {
			$("#navigation").addClass("home");
		},

		navigateFromHome: function () {
			$("#navigation").removeClass("home");
		},

		index: function () {
			Vent.trigger("GoTo", "#!/", {trigger: true});
		},

		about: function () {
			Vent.trigger("GoTo", "#!/about", {trigger: true});
		},

		services: function () {
			Vent.trigger("GoTo", "#!/services", {trigger: true});
		},

		clients: function () {
			Vent.trigger("GoTo", "#!/clients", {trigger: true});
		},

		products: function () {
			Vent.trigger("GoTo", "#!/products", {trigger: true});
		},

		caseStudies: function () {
			Vent.trigger("GoTo", "#!/case-studies", {trigger: true});
		},

		fullstackEvents: function () {
			Vent.trigger("GoTo", "#!/fullstack-events", {trigger: true});
		},

		careers: function () {
			Vent.trigger("GoTo", "#!/careers", {trigger: true});
		},

		contact: function () {
			Vent.trigger("GoTo", "#!/contact", {trigger: true});
		}

	});

	return NavigationView;

})
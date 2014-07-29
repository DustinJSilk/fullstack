define([
	"app",
	"marionette",
	"text!templates/navigation.html",
	"vent"
	], function (App, Marionette, NavigationTemplate, Vent) {


	var NavigationView = Marionette.ItemView.extend({

		attributes: {
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
			"click #link-events": 				"fullstackEvents",
			"click #link-careers": 				"careers",
			"click #link-contact": 				"contact",
			"click #nav-logo img": 				"index",
			"click #mobile-hamburger": 			"mobileMenu"
		},

		initialize: function () {
			Vent.on('GoTo', this.listenToEvents, this);

			//Always remember previous route - for animating to/from home
			this.previousRoute = window.location.hash.replace("#!/", "").toLowerCase();
		    if (this.previousRoute.length < 1 ) this.previousRoute = "index";

		    if (this.previousRoute === "index") {
		    	//this.navigateToHome();
		    	$("#navigation").addClass("initiateHome home")
		    }

		},

		onShow: function () {
			var view = this;

			if (this.previousRoute === "index") {
				setTimeout(function(){
					view.navigateToHome("initiate");
				}, 100)
		    	
		    }

			//show the orange selector bar
			setTimeout(function(){
				view.initiateSelectorBar();
			}, 200);

			this.resizeReposition();
		},


		//Listening for route changes to animate the orange bar and home view
		listenToEvents: function (route, args) {

			//Extract route
		    var routeID = route.split("/")[1].toLowerCase();
		    if (routeID.length < 1 ) routeID = "index";

		    //animate navigation if going to/from home
		    if (routeID === "index") {
		    	this.navigateToHome();
		    } else if (routeID !== "index" && this.previousRoute === "index") {
		    	this.navigateFromHome(routeID);
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
			var route = window.location.hash.split("/")[1].toLowerCase();
		    if (route.length < 1 ) route = "index";
			view.size(route);
			$("#nav-selector").css("opacity", "0")


			//animate in
			setTimeout(function(){
				$("#nav-selector").addClass("show");
			}, 100)
			
		},

		size: function (routeID) {
			var leftPosition = $("#link-" + routeID).parent().position().left;
		    var width = $("#link-" + routeID).parent().width();
		     $("#nav-selector").css({
		    	"left": leftPosition - 5,
		    	"width": width + 10
		    });
		},

		positionSelectorBar: function (routeID) {
			var view = this;
		    
		    $("#nav-selector").removeClass("show").animate({"opacity": 0}, 400);

		    setTimeout(function() {
		    	view.size(routeID);
		    	$("#nav-selector").removeClass("hide").addClass("show");
		    	setTimeout(function () {
		    		$("#nav-selector").css("opacity", "")
		    	}, 400)
		    }, 800)
		},

		resizeReposition: function () {
			var view = this;

			$(window).bind('resize.nav-bar', function () {
				view.positionSelectorBar(view.previousRoute);
			});
		},

		mobileMenu: function () {
			Vent.trigger("ShowMobileMenu");
		},

		navigateToHome: function (showType) {
			var view = this;

			//set up welcome message
			$("#navigation .nav-welcome").addClass("preShow");

			//hide top bar; show Background
			$("#navigation").addClass("transitionHome");

			//change top bar layout
			setTimeout(function(){
				$("#navigation").addClass("home");
				view.positionSelectorBar("index");
			}, 600)
			
			//show top bar and welcome message
			setTimeout(function(){
				$("#navigation").addClass("showHome").removeClass("initiateHome");
				$("#navigation .nav-welcome").addClass("show");
			}, 2400)

		},

		navigateFromHome: function (route) {
			var view = this;
			
			$("#navigation").addClass("hideHome");
			$("#navigation .nav-welcome").removeClass("show");

			//hide bg and menue
			setTimeout(function(){
				$("#navigation").addClass("transitionAwayHome").removeClass("transitionHome home showHome");
				view.positionSelectorBar(route);
			}, 600)

			//cant remember
			setTimeout(function(){
				$("#navigation").addClass("showHome").removeClass("hideHome transitionAwayHome");
			}, 2000)

			//So confusing
			setTimeout(function(){
				$("#navigation").removeClass("showHome");
				$("#navigation .nav-welcome").removeClass("preShow");
			}, 2400)
			

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
			Vent.trigger("GoTo", "#!/events", {trigger: true});
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
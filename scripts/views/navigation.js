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
			"click #link-home": 				"home",
			"click #link-about": 				"about",
			"click #link-services": 			"services",
			"click #link-clients": 				"clients",
			"click #link-products": 			"products",
			"click #link-case-studies": 		"caseStudies",
			"click #link-fullstack-events": 	"fullstackEvents",
			"click #link-careers": 				"careers",
			"click #link-contact": 				"contact",
		},

		initialize: function () {
			Vent.on('GoTo', this.listenToEvents, this);
		},

		onShow: function () {
			var view = this;

			//show the orange selector bar
			setTimeout(function(){
				view.initiateSelectorBar();
			}, 200);
		},


		//Listening for route changes to animate the orange bar and home view
		listenToEvents: function (route, args) {
		    var routeID = route.replace("#!/", "").toLowerCase();
		    if (routeID.length < 1 ) routeID = "home";

		    this.positionSelectorBar(routeID);
		},


		initiateSelectorBar: function () {
			var view = this;


			//create selector bar
			var bar = '<div id="nav-selector"></div>';
			$('.nav-list').prepend(bar);


			//resize and position correctly before showing
			var route = window.location.hash.replace("#!/", "").toLowerCase();
		    if (route.length < 1 ) route = "home";
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

		home: function () {
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
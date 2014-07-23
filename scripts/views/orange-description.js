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
			this.currentView = window.location.hash.split("/")[1].toLowerCase().trim();
		},

		onShow: function () {
			if (this.currentView !== "" && this.currentView !== "index") {
				this.showOrange(this.currentView);
			}

			this.resizeReposition();
		},

		resizeReposition: function () {
			$(window).bind('resize.orange', function() {
				var width = $(window).width();
				if ( width <= 1024 ) {
					$(".orange-description-text-2").css({"margin-left": width / -2});
					$(".orange-description-text").css({"margin-left": width / -2});
					var height = $(".orange-description-text").outerHeight();
					$("#orange-description").height(height);
				}
			})
		},

		listenToEvents: function (route, args) {

			//Get the new route
		    var routeID = route.split("/")[1].toLowerCase();
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
			$(".orange-description-text").removeClass("in").removeClass("in-up");
			$(".orange-description-text").addClass("out-up");
			$("#orange-description").height(0);
			setTimeout(function(){
				$("#orange-description").hide();
			}, 400)
		},


		showOrange: function (route) {

			$("#orange-description").height(0);
			$("#orange-description").show();
			
			//make responsive
			var width = $(window).width();
			var style = "";
			if ( width < 1024 ) {
				$(".orange-description-text").css({"margin-left": width / -2});
			}

			//set new text before getting height
			$(".orange-description-text").html(this.getNewText(route));
			
			//get orange height
			var height = $(".orange-description-text").outerHeight();

			//start animating in new text
			$(".orange-description-text").removeClass("out").removeClass("out-up");
			$(".orange-description-text").addClass("in-up");

			//animate height
			$("#orange-description").height(height);
		},


		changeOrange: function (route) {

			//make responsive
			var width = $(window).width();
			var style = "";
			if ( width < 1024 ) {
				style = "style='margin-left: " + width / -2 + "px;'";
			}

			//create new text
			var newText = this.getNewText(route);
			var newElement = "<div class='orange-description-text-2 in'" + style + ">" + newText + "</div>";

			//animate out old text
			$(".orange-description-text").removeClass("in").removeClass("in-up");
			$(".orange-description-text").addClass("out");

			//animate in new text
			$(".orange-description-text").parent().append(newElement);

			//set new height
			var height = $(".orange-description-text-2").outerHeight();
			$("#orange-description").height(height);

			//remove old text
			setTimeout(function(){
				$(".orange-description-text").remove();
				$(".orange-description-text-2").addClass("orange-description-text").removeClass("orange-description-text-2");
			}, 400)
		},


		getNewText: function (route) {

			var h1 = "", h2 = "", title;
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
		    		h2 = "Short copy test";
		    		break;

		    	case "clients": 
		    		h1 = "Clients";
		    		h2 = "Long copy test.<br />We provide data products and services<br />and this is how we work/our process<br />and this is how we work/our process";
		    		break;

		    	case "products": 
		    		h1 = "Products";
		    		h2 = "For FULLSTACK, products are solutions commonly required. Our approach to products is iterative and in no way shrink wrapped. All our products are built on network services. Our product roll outs require an training, change management and implementation phase. ";
		    		break;

		    	case "case-studies": 
		    		h1 = "Case Studies";
		    		h2 = "We provide data products and services<br />and this is how we work/our process";
		    		break;

		    	case "events": 
		    		h1 = "Events";
		    		break;

		    	case "careers": 
		    		h1 = "Careers";
		    		h2 = "FULLSTACK prides itself on a unique and fulfilling career journey for our staff. The development of quality software requires quality people. Our greatest asset is our staff operating effectively within a team. Team work is core to our ability to deliver on our promise to build software of a high quality on time for a fixed price. Teams at FULL STACK are built on the team unit called a quadrant. Every team at FULL STACK is built by an analyst, a master developer, a journeyman developer and an apprentice. " + 

		    			"<br /> <br /> " + 
 
						"At FULL STACK everyone has a computer science, information systems and/or engineering background. We are beloved generalists, and while we may be accomplished musicians, artists, psychologists, debaters or philosophers, we come together at FULL STACK to create great software. Our first language is SQL, our pride is our products, our passion is our code. " + 

						"<br /> <br /> " + 

						"One of the first things you’ll notice at FULL STACK which is different is that we don’t have leave forms: we don’t need them – we need mature adults to build business critical software; and we think if you are mature enough to write and deliver software capable of unlocking millions in business value, then you will have the maturity to take some time off. ";
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
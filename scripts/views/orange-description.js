define([
	"app",
	"marionette",
	"vent"
	], function (App, Marionette, Vent) {


	var OrangeDescriptionView = Marionette.ItemView.extend({


		orangeIndex: 1,

		attributes: {
			class: "orange-description-text 1"
		},

		tagName: "div",

		template: function () {
			return "";
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
			} else {
				$("#orange-description").hide();
			}
			
			this.resizeReposition();

		},

		resizeReposition: function () {
			var view = this;

			var resizeTimer;
			$(window).bind('resize.orange', function() {
				if (resizeTimer) {
				    clearTimeout(resizeTimer);   // clear any previous pending timer
				}
				 // set new timer
				resizeTimer = setTimeout(function() {
				    resizeTimer = null;
					view.resize();
				}, 50);
			})
		},

		resize: function () {
			var width = $(".orange-description-text").outerWidth();
			$(".orange-description-text").css({"margin-left": width / -2});
			var height = $(".orange-description-text").outerHeight();
			$("#orange-description").height(height);
		},

		listenToEvents: function (route, args) {
			var view = this;

			//Get the new route
		    var routeID = route.split("/")[1].toLowerCase();
		    if (routeID.length < 1 ) routeID = "index";
		    

		    //if its routing index - hide the orange
		    if ( routeID === "index" ) {
		    	this.hideOrange();

		    //if its routing from index to another view, show the orange
		    } else if ( this.currentView === "index" || this.currentView.length === 0) {
		    	setTimeout(function(){
		    		view.showOrange(routeID);
		    	}, 2400)

		    //Otherwise animate from one title to another
		    } else {
		    	this.changeOrange(routeID);
		    }

		    this.currentView = routeID;
		},


		hideOrange: function () {
			$("#orange-description").fadeOut(400);
		},


		showOrange: function (route) {
			var view = this;

			$("#orange-description").height(0);
			$("#orange-description").show();
			
			//make responsive
			var width = $("#orange-description").width();
			var style = "style='margin-left: " + width / -2 + "px;'";

			view.resize();

			//if orange text doesnt exist - create it quick
			if ($(".orange-description-text." + this.orangeIndex).length < 1) $("#orange-description div").append("<div class='orange-description-text " + this.orangeIndex + "' />");

			//set new text before getting height
			$(".orange-description-text." + this.orangeIndex).html(this.getNewText(route));
			
			//get orange height
			var height = $(".orange-description-text." + this.orangeIndex).outerHeight();

			//start animating in new text
			$(".orange-description-text." + this.orangeIndex).removeClass("out").removeClass("out-up");
			$(".orange-description-text." + this.orangeIndex).addClass("in-up");

			//animate height
			$("#orange-description").height(height);
		},


		changeOrange: function (route) {
			var view = this;

			//make responsive
			var width = $("#orange-description").width();
			var style = "style='margin-left: " + width / -2 + "px;'";

			view.resize();

			//create new text
			var newText = this.getNewText(route);
			var newElement = "<div class='orange-description-text in " + (this.orangeIndex + 1) + "'" + style + ">" + newText + "</div>";

			//if orange text doesnt exist - create it quick
			if ($(".orange-description-text." + this.orangeIndex).length < 1) $("#orange-description div").append("<div class='orange-description-text " + this.orangeIndex + "' />");
		
			//animate out old text
			$(".orange-description-text." + this.orangeIndex).removeClass("in").removeClass("in-up");
			$(".orange-description-text." + this.orangeIndex).addClass("out");

			//animate in new text
			$(".orange-description-text." + this.orangeIndex).parent().append(newElement);

			//set new height
			var height = $(".orange-description-text." + (this.orangeIndex + 1)).outerHeight();
			$("#orange-description").height(height);

			//remove old text
			setTimeout(function(){
				$(".orange-description-text." + view.orangeIndex).remove();
				view.orangeIndex ++;
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
		    		h2 = "NEED COPY";
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
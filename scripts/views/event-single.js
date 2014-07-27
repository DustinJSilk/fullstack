define([
	"app",
	"marionette",
	"text!templates/event.html",
	"vent"
	], function (App, Marionette, EventTemplate, Vent) {

	var EventsView = Marionette.ItemView.extend({

		attributes: {
			id: "event"
		},

		tagName: "div",

		template: function(data) {
			return _.template(EventTemplate, data, {"variable": "data"});
		},

		events: {

		},

		serializeData: function () {
			var data = this.getEventDetails();
			return data;
		},

		initialize: function () {
		},

		onClose: function () {
			Vent.unbind("RemoveView");
		},

		onShow: function () {
			var view = this;

			Vent.bind("RemoveView", this.removeView);

			setTimeout(function(){
				view.showContent();
			}, 100)
		},

		showContent: function () {
			var list = this.$(".content").children();
			list.push($(".map"))
			$.each(list, function(i, el){
			    setTimeout(function(){
			       $(el).addClass("show");
			    },( i * 100 ));
			});
		},

		showMap: function () {
			setTimeout(function(){
				$(".map.hide").removeClass("hide");
			}, 400)
			
		},

		getEventDetails: function () {
			var data = {};

			switch (this.options.eventName) {
				case "hackathon": 
					data.title = "Fullstack Hackathon Title";
					data.info = "Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in.";
					data.location = "66 Albert Road, Woodstock Exchange, Cape Town";
					return data;
					break;
				case "hackathon": 
					data.title = "Fullstack Hackathon Title";
					data.info = "Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in.";
					data.location = "66 Albert Road, Woodstock Exchange, Cape Town";
					return data;
					break;
				case "hackathon": 
					data.title = "Fullstack Hackathon Title";
					data.info = "Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in.";
					data.location = "66 Albert Road, Woodstock Exchange, Cape Town";
					return data;
					break;
				case "hackathon": 
					data.title = "Fullstack Hackathon Title";
					data.info = "Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in.";
					data.location = "66 Albert Road, Woodstock Exchange, Cape Town";
					return data;
					break;
			}
		},

		removeView: function () {
			$("#event .wrapper").addClass("close-view");
			$(".map").removeClass("show")
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		}
		

	});

	return EventsView;

})
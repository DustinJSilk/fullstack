define([
	"app",
	"marionette",
	"text!templates/events.html"
	], function (App, Marionette, EventsTemplate) {

	var EventsView = Marionette.ItemView.extend({

		attributes: {
			id: "events"
		},

		tagName: "div",

		template: function(data) {
			return _.template(EventsTemplate);
		},

		events: {

		},

		initialize: function () {
			
		},

		onRemove: function () {
			this.$el.fadeOut(1000, function () {
				return true;
			})

			return false;
		}

	});

	return EventsView;

})
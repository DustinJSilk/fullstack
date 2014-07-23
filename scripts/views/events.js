define([
	"app",
	"marionette",
	"text!templates/events.html",
	"vent"
	], function (App, Marionette, EventsTemplate, Vent) {

	var EventsView = Marionette.ItemView.extend({

		attributes: {
			id: "events"
		},

		tagName: "div",

		template: function(data) {
			return _.template(EventsTemplate);
		},

		events: {
			"click .event-link"	: "event"
		},

		initialize: function () {
			
		},

		onShow: function () {
			this.equalizeHeights();
		},

		onClose: function () {
			$(window).unbind("resize.event-blocks");
		},

		equalizeHeights: function () {
			var that = this;

			var tallestBlock = 0;

			$(window).bind("resize.event-blocks", function () {

				//reset height for equalizing
				$('.events .block').height("");
				tallestBlock = 0;

				//Check to see if orange text overlay is taller than the block
				for ( var n = 0; n < 4; n ++ ) {
					var o = $('.events .block .hover-text').eq(n).height();
					if ($('.events .block').eq(n).height() < o) {
						$('.events .block').eq(n).height(o)
					}
				}

				//Equalize block heights
				for ( var i = 0; i < 4; i ++ ) {
					var h = $('.events .block').eq(i).height();
					tallestBlock = (tallestBlock < h) ? h : tallestBlock;
				}
				$('.events .block').height(tallestBlock);
			
			});

			$(window).resize();
		},

		event: function (target) {
			var route = $(target.currentTarget).attr("data-route");
			Vent.trigger("GoTo", "#!/events/" + route, {trigger: true});
		}

		

	});

	return EventsView;

})
define([
	"app",
	"marionette",
	"text!templates/index.html"
	], function (App, Marionette, IndexTemplate) {


	var IndexView = Marionette.ItemView.extend({

		attributes: {
			id: "home"
		},

		tagName: "div",

		template: function(data) {
			return _.template(IndexTemplate);
		},

		events: {
			"click #link-home": 		"home",
			"hover #link-about": 		"aboutFunc",
		},

		initialize: function () {

		},

		onClose: function () {
			$(window).unbind("resize.services-blocks");
		},

		onShow: function () {
			this.equalizeServices();
		},

		//Make services blocks all have the same height
		equalizeServices: function () {
			var that = this;

			var tallestBlock = 0;

			$(window).bind("resize.services-blocks", function () {
				$('.services .block').height("");
				tallestBlock = 0;

				for ( var i = 0; i < 4; i ++ ) {
					var h = $('.services .block').eq(i).height();
					tallestBlock = (tallestBlock < h) ? h : tallestBlock;
				}

				$('.services .block').height(tallestBlock);
			
			});


		}

	});

	return IndexView;

})
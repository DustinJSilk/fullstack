define([
	"app",
	"marionette",
	"text!templates/index.html",
	"vent"
	], function (App, Marionette, IndexTemplate, Vent) {


	var IndexView = Marionette.ItemView.extend({

		attributes: {
			id: "home"
		},

		tagName: "div",

		template: function(data) {
			return _.template(IndexTemplate);
		},

		events: {
			"click #contact-us-link": 		"contactUs",
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
		},

		contactUs: function () {
			//animate to top then navigate
    		$('html,body').animate({ scrollTop: 0 }, 800, function(){
    			setTimeout(function(){
    				Vent.trigger("GoTo", "#!/contact", {trigger: true});
    			}, 300)
        	});
		}

	});

	return IndexView;

})
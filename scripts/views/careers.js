define([
	"app",
	"marionette",
	"text!templates/careers.html",
	"vent",
	"lib/modernizr.custom",
	"fullscreenform"
	], function (App, Marionette, CareersTemplate, Vent) {

	var CareersView = Marionette.ItemView.extend({

		attributes: {
			id: "careers"
		},

		tagName: "div",

		template: function(data) {
			return _.template(CareersTemplate);
		},

		events: {
			"click .apply" : "showForm",
			"submit #myform" : "submitForm",
			"click .fs-close" : "hideForm"
		},

		initialize: function () {
			$(".preloader").fadeOut(400);
		},

		onClose: function () {
			Vent.unbind("RemoveView");
		},

		onShow: function () {
			var view = this;

			Vent.bind("RemoveView", this.removeView);

			setTimeout(function(){
				view.checkScrolling();
				view.showContent(0);
			}, 100)

		},


		//The scroll event to control the fade in of elements
		checkScrolling: function () {
			var view = this;

			$(window).scroll(function(){
				
				for ( var i = 0; i < view.$('.content').length; i ++) {

					var appearHeight = $(window).height() / 4;
					var htmlHeight = $('html').height();
					var windowHeight = $(window).height();
					var windowScroll = $(window).scrollTop();
					var offsetDistance = view.$('.content').eq(i).offset().top;
					var isntVisible = !view.$('.content').eq(i).hasClass("shown");
					var isntColored = view.$('section').eq(i).hasClass("color-change");

					if ( (windowScroll > (offsetDistance - windowHeight + appearHeight) &&  isntVisible) 
						|| ( windowScroll + windowHeight > htmlHeight - 100) ) {
						view.showContent(i);
					}
					
					if ( windowScroll > (offsetDistance - windowHeight + appearHeight - 100) &&  isntColored )   {
						view.$('section').eq(i).removeClass("color-change");
					}

				}				
				
			});
		},

		showContent: function (contentNumber) {
			var list = this.$(".content").eq(contentNumber).children();
			$.each(list, function(i, el){
			    setTimeout(function(){
			       $(el).addClass("show");
			    },( i * 100 ));
			});
			this.$(".content").eq(contentNumber).addClass("shown");
		},

		showForm: function (e) {
			// This is just to go live. Have a jobs@fullstack.co.za address
			document.location.href = "mailto:jobs@fullstack.co.za";
			
			/*var scrollTop = $(window).scrollTop();

			$("body, html").addClass("apply-body")//.css("top", scrollTop * -1);

			$("#fs-form-wrap").fadeIn(400)//.css("top", scrollTop);
			
			this.position = $(e.target).closest(".content").find("h2").text();
			this.initiateFullscreenForm();*/
		},

		removeView: function () {
			$("#careers .wrapper").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		},

		initiateFullscreenForm: function () {
			var formWrap = document.getElementById( 'fs-form-wrap' );

			[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
				new SelectFx( el, {
					stickyPlaceholder: false,
					onChange: function(val){
						document.querySelector('span.cs-placeholder').style.backgroundColor = val;
					}
				});
			} );

			new FForm( formWrap, {
				onReview : function() {
					$(document.body).addClass('overview')
				}
			} );
		},

		submitForm: function (event) {
			event.preventDefault();

			var view = this;

			var data = {
				name: "name",
				email: "email",
				position: this.position,
				message: "message"
			};

			$.ajax({
				type: "POST",
				url: "api/apply",
				data: data,
				success: function () {
					$(".fs-submit").addClass("response").find(".response").text("Success!");
					setTimeout(function () {
						view.hideForm();
					}, 1000)
				}, 
				error: function () {
					$(".fs-submit").addClass("response").find(".response").text("Oops, Error!");
					setTimeout(function () {
						$(".fs-submit").removeClass("response");
					}, 2500)
				}
			})
		},

		hideForm: function () {
			$("#fs-form-wrap").fadeOut(400, function () {
				$("body, html").css("top", 0);
				$("#fs-form-wrap").css("top", 0);
				$("#myform").attr("class", "fs-form fs-form-full");
				$("body, html").removeClass("apply-body");
				$("#myform input, #myform textarea").val("");
				$(".fs-current").removeClass("fs-current");
				$(".fs-progress").width(0);
				$('.fs-controls').remove();
			})
		}

	});

	return CareersView;

})
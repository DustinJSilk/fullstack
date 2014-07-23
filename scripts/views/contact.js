define([
	"app",
	"marionette",
	"text!templates/contact.html",
	"vent"
	], function (App, Marionette, ContactTemplate, Vent) {

	var ContactView = Marionette.ItemView.extend({

		attributes: {
			id: "contact"
		},

		tagName: "div",

		template: function(data) {
			return _.template(ContactTemplate);
		},

		events: {

		},

		initialize: function () {
			Vent.bind("RemoveView", this.removeView);
		},

		onShow: function () {
			var view = this;

			setTimeout(function(){
				view.showContactTypes();
			}, 100)

			setTimeout(function(){
				view.showContactForm();
			}, 700)

		},

		showContactTypes: function () {
			$.each($('.contact-type'), function(i, el){
			    setTimeout(function(){
			       $(el).addClass("show");
			    },( i * 100 ));
			});
		},

		showContactForm: function () {
			$(".contact-form").addClass("show");
		},

		removeView: function () {
			$("#contact .content").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		}

	});

	return ContactView;

})
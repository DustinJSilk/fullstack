define([
	"app",
	"marionette",
	"text!templates/contact.html"
	], function (App, Marionette, ContactTemplate) {

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
			
		},

		onShow: function () {
			var view = this;

			setTimeout(function(){
				view.showContactTypes();
			}, 400)

			setTimeout(function(){
				view.showContactForm();
			}, 1000)

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
		}

	});

	return ContactView;

})
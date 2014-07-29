define([
	"app",
	"marionette",
	"text!templates/contact.html",
	"vent",
	"backbonevalidation"
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
			"blur input[type=text], textarea" : 	"saveInput",
			"focus input[type=text], textarea" : 	"removeError",
			"click #submit-contact" : 				"submitForm"
		},

		initialize: function () {

			Backbone.Validation.bind(this, {
				valid: function(view, attr) {
				},
				invalid: function(view, attr, errorMessage) {
					$('#' + attr.toLowerCase()).removeClass("error").addClass("error");
				}
		    });
		    console.log($(".preloader"))
		    $(".preloader").fadeOut(400);
		},

		onClose: function () {
			Vent.unbind("RemoveView");
		},

		onShow: function () {
			var view = this;

			Vent.bind("RemoveView", this.removeView);

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

		saveInput: function (e) {
			var attribute = $(e.target).attr('name');
			var value = $(e.target).val();
			var formItem = $('#' + attribute.toLowerCase());

			//set in model
			this.model.set(attribute, value);

			//validate
			var errorMessage = this.model.preValidate(attribute, value);
			if (errorMessage.length > 0) {
				formItem.addClass("error");
			}
		},

		removeError: function (e) {
			var attribute = $(e.target).attr('name');
			var formItem = $('#' + attribute.toLowerCase());
			formItem.removeClass("error")
		},

		submitForm: function () {
			this.model.save(null, {
				success: function () {
					$("#submit-contact").addClass("response").find(".response").text("Success!");
				},
				error: function () {
					$("#submit-contact").addClass("response").find(".response").text("Oops, Error!");
				}
			})
		},

		removeView: function () {
			$("#contact .wrapper").addClass("close-view");
			setTimeout(function(){
				Vent.trigger("ViewOut");
			}, 600)
		}

	});

	return ContactView;

})
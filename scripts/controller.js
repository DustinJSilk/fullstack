define(["app"], function (App) {

    var Controller = {

        index: function () {
            require([ "app", "views/index"], function (App, IndexView) {
                App.page.show(new IndexView())
            })
        },

        about: function () {
            require([ "app", "views/about"], function (App, AboutView) {
                App.page.show(new AboutView())
            })
        },

        services: function () {
            require([ "app", "views/services"], function (App, ServicesView) {
                App.page.show(new ServicesView())
            })
        },

        clients: function () {
            require([ "app", "views/about"], function (App, AboutView) {
                App.page.show(new AboutView())
            })
        },

        products: function () {
            require([ "app", "views/products"], function (App, ProductsView) {
                App.page.show(new ProductsView())
            })
        },

        caseStudies: function () {
            require([ "app", "views/case-studies"], function (App, CaseStudiesView) {
                App.page.show(new CaseStudiesView())
            })
        },

        fullstackEvents: function () {
            require([ "app", "views/events"], function (App, EventsView) {
                App.page.show(new EventsView())
            })
        },

        fullstackEvent: function (eventName) {
            require([ "app", "views/event-single"], function (App, EventView) {
                App.page.show(new EventView({eventName: eventName}));
            })
        },

        careers: function () {
            require([ "app", "views/careers"], function (App, CareersView) {
                App.page.show(new CareersView())
            })
        },

        contact: function () {
            require([ "app", "views/contact"], function (App, ContactView) {
                App.page.show(new ContactView())
            })
        },

        error: function () {
            require([ "app", "views/index"], function (App, IndexView) {
                App.page.show(new IndexView())
            })
        },

        notFound: function () {
            require([ "app", "views/index"], function (App, IndexView) {
                App.page.show(new IndexView())
            })
        }

    }

    return Controller;
});
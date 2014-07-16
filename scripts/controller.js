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
            require([ "app", "views/about"], function (App, AboutView) {
                App.page.show(new AboutView())
            })
        },

        clients: function () {
            require([ "app", "views/about"], function (App, AboutView) {
                App.page.show(new AboutView())
            })
        },

        products: function () {
            require([ "app", "views/about"], function (App, AboutView) {
                App.page.show(new AboutView())
            })
        },

        caseStudies: function () {
            require([ "app", "views/about"], function (App, AboutView) {
                App.page.show(new AboutView())
            })
        },

        fullstackEvents: function () {
            require([ "app", "views/about"], function (App, AboutView) {
                App.page.show(new AboutView())
            })
        },

        careers: function () {
            require([ "app", "views/careers"], function (App, CareersView) {
                App.page.show(new CareersView())
            })
        },

        contact: function () {
            require([ "app", "views/about"], function (App, AboutView) {
                App.page.show(new AboutView())
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
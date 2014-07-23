define(["marionette", "router"], function (Marionette, AppRouter) {

    // set up the app instance
    var MyApp = new Marionette.Application();

    // configuration, setting up regions, etc ...
    MyApp.addRegions({
        navigation: "#navigation",
        mobileNavigation: "#mobile-navigation",
        orangeDescription: "#orange-description",
        page: "#page"
    });

    MyApp.addInitializer(function (options) {
        MyApp.Router = new AppRouter();
        Backbone.history.start();
    });
    
    // export the app from this module
    return MyApp;
});
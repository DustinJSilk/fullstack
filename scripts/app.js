define(["marionette"], function (Marionette) {

    // set up the app instance
    var MyApp = new Marionette.Application();

    // configuration, setting up regions, etc ...
    MyApp.addRegions({
        navigation: "#navigation",
        mobileNavigation: "#mobile-navigation",
        orangeDescription: "#orange-description",
        page: "#page"
    });
    
    // export the app from this module
    return MyApp;
});
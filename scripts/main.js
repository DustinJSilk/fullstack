require.config({
	baseURL: 'scripts',
    paths: {
        "jquery":  "lib/jquery",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "backbonevalidation": 'lib/backbone-validation',
		"googleanalytics": "lib/backbone.analytics",
        "radio": "lib/backbone.radio.min",
        "marionette": 'lib/marionette',
        "fullscreenform": 'lib/fullscreenForm',
        "templates": "../templates",
        "text": "lib/text",
        "vent": "vent",
        "preloader": "lib/pre-loader"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backbonevalidation: {
            deps: ['backbone'],
            exports: 'Validation'
        },
		googleanalytics: {
            deps: ['underscore', 'backbone', 'jquery'],
            exports: 'Googleanalytics'
        },
        radio: {
            deps: ['underscore', 'backbone', 'jquery'],
            exports: 'Radio'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        fullscreenform: {
            deps: ['jquery'],
            exports: 'fullscreenform'
        },
        waitSeconds: 45
    }
});

require([ "app", "preloader", "router"], function (App, preLoader, AppRouter) {

    //If index - make url #!/ - to avoid annoyances here and there
    if (window.location.hash.length < 3) {
        window.location.hash = "#!/";
    }



    //get route
    var route = window.location.hash.split("/")[1].toLowerCase();



    //get items to preload. Because its a small site we can easily define them here.
    // Attach them to the App object and we can grab them to preload when ever we change route.
    App.getPreloaderItems = function (route) {
        var array;

        var index = [
                    "img/capetown.jpg",
                    "img/about-icon-left.jpg",
                    "img/about-icon-middle.jpg",
                    "img/about-icon-right.jpg",
                    "img/services-software.png",
                    "img/services-systems.png",
                    "img/services-technology.png",
                    "img/services-developer.png",
                    "img/clients-brilliant.png",
                    "img/clients-colormedia.png",
                    "img/clients-livefyre.png",
                    "img/clients-nuride.png",
                    "img/clients-open-suse.png",
                    "img/clients-techcombank.png"
                ];

        var about = [
                    "img/about-andrew.jpg",
                    "img/about-werner.jpg"
                ];

        var services = [
                    "img/services-icon-dev-review.png",
                    "img/services-icon-software.png",
                    "img/services-icon-systems.png",
                    "img/services-icon-tech-audit.png",
                ];

        var products = [];

        var caseStudies = [
                    "img/case-study-icon-1.jpg",
                    "img/case-study-icon-2.jpg",
                    "img/case-study-icon-3.jpg",
                    "img/case-study-large-1.jpg",
                    "img/case-study-large-2.png",
                    "img/case-study-livefyre-logo.jpg",
                    "img/case-study-colormedia-logo.png"
                ];

        var events = [
                    "img/map.jpg"
                ];

        var careers = [
                    "img/briefcase-icon.png",
                    "img/close.png"
                ];

        var contact = [
                    "img/contact-address.png",
                    "img/contact-phone.png",
                    "img/contact-skype.png",
                    "img/contact-email.png",
                    "img/map.jpg"
                ];


        switch (route) {
            case "":
                array = index;
                break;

            case "about":
                array = about;
                break;

            case "services":
                array = services;
                break;

            case "clients":
                array = clients;
                break;

            case "products":
                array = products;
                break;

            case "case-studies":
                array = caseStudies;
                break;

            case "events":
                array = events;
                break;

            case "careers":
                array = careers;
                break;

            case "contact":
                array = contact;
                break;

            case "all":
                var all = index.concat(about, services,clients,products,caseStudies,events, careers, contact);
                array = all;
                break;
               
        }

        array.push(
            "img/social-sprite.png", 
            "img/fullstack-logo.png", 
            "img/nav-logo.png"
        )

        return array;
    }


    function startApp () {

        //add initializer method here to avoid circular dependancies when using App object in router for preloading images.
        App.addInitializer(function (options) {
            App.Router = new AppRouter();
            Backbone.history.start();
        });

        App.start();
    }


    //set up items to preload the start the app
    App.preloader = new preLoader(App.getPreloaderItems(route), {
        pipeline: false,
        auto: true,
        onComplete: function(loaded, errors){
            startApp();
        }
    });


});


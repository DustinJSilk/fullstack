require.config({
	baseURL: 'scripts',
    paths: {
        "jquery":  "lib/jquery",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
		"googleanalytics": "lib/backbone.analytics",
        "radio": "lib/backbone.radio.min",
        "marionette": 'lib/marionette',
        "templates": "../templates",
        "text": "lib/text",
        "vent": "vent"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
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
        waitSeconds: 45
    }
});

require([ "app"], function(App) {

    if (window.location.hash.length < 3) {
        window.location.hash = "#!/";
    }

    App.start();


});


require.config({
	baseURL: 'scripts',
    paths: {
        "jquery":  "lib/jquery",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
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

    App.start();

});


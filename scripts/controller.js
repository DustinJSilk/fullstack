define(["app"], function (App) {

    var Controller = {

        index: function () {
            require([ "app", "views/index", "models/user" ], function (App, IndexView, UserModel) {
                App.page.show(new IndexView({ model: UserModel }))
            })
        }

    }

    return Controller;
});
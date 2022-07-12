define(function () {

    'use strict';

    return function MockedView() {

        this.update = function () {
            this.updated = true;
            this.def.resolve(true);
        };

        this.isUpdated = function () {
            return this.def.promise();
        };

        this.reset = function () {
            this.updated = false;
            this.def = $.Deferred();
        };

    };

});

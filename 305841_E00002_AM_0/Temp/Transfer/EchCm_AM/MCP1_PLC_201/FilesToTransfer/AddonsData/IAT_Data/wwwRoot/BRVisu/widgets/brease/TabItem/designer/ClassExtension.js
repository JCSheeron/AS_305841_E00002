define(function () {

    'use strict';

    var ClassExtension = {
        extend: function (WidgetClass) {
            WidgetClass.static.getInitialProperties = function (x, y) {
                return {
                    left: 0
                };
            };
            WidgetClass.extended = true;
        }
    };

    return ClassExtension;

});

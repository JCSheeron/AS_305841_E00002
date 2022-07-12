define(function () {

    'use strict';

    var ClassExtension = {
        extend: function (WidgetClass) {
            WidgetClass.static.getInitialProperties = function (x, y) {
                return {
                    x1: x,
                    y1: y,
                    x2: x + 100,
                    y2: y
                };
            };
            WidgetClass.extended = true;
        }
    };

    return ClassExtension;

});

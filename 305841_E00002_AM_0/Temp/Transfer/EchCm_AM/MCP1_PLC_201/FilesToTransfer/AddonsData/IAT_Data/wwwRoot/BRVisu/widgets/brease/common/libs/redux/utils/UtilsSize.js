define(function () {
    
    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.utils.UtilsSize
     */

    var UtilsSize = {};

    UtilsSize.getWidth = function (width, elem) {
        var value = 0;
        if (isNaN(width) === false) {
            value = parseInt(width, 10);
        } else {
            $(elem).css('width', width);
            value = elem.offsetWidth;
        }

        //bugfix for SVG
        if (value === undefined) {
            value = $(elem).parent().width() * (parseInt(width, 10) / 100);
        }

        return value;
    };

    UtilsSize.getHeight = function (height, elem) {
        var value = 0;
        if (isNaN(height) === false) {
            value = parseInt(height, 10);
        } else {
            $(elem).css('height', height);
            value = elem.offsetHeight;
        }

        //bugfix for SVG
        if (value === undefined) {
            value = $(elem).parent().height() * (parseInt(height, 10) / 100);
        }

        return value;
    };

    return UtilsSize;
});

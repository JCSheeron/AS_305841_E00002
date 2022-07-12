define(function () {

    'use strict';

    var UtilsStyle = {};

    UtilsStyle.addStylePrefix = function (prefix, style) {
        return prefix + '_style_' + style;
    };

    return UtilsStyle;

});

define(function () {

    /**
    * @class widgets.brease.common.libs.wfUtils.UtilsCommon
    * Contains helper functions
    * @singleton
    */
    return {
        /**
        * @method addCssClasses
        * add several css classes to an element
        * @param {jQuery} element
        * @param {Object} textSettings
        * @param {Boolean} textSettings.ellipsis
        * @param {Boolean} textSettings.multiLine
        * @param {Boolean} textSettings.wordWrap
        * @param {Boolean} textSettings.breakWord
        * @param {Boolean} selected
        */
        addCssClasses: function (element, textSettings, selected) {
            element.addClass('TextView');
            if (textSettings.ellipsis === true) {
                element.addClass('ellipsis');
            } else {
                element.removeClass('ellipsis');
            }
            if (selected) {
                element.addClass('textSelected');
            } else {
                element.removeClass('textSelected');
            }
            if (textSettings.multiLine === true) {
                element.addClass('multiLine');
                if (textSettings.wordWrap === true) {
                    element.addClass('wordWrap');
                    element.removeClass('multiLine');
                } else {
                    element.removeClass('wordWrap');
                }
                if (textSettings.breakWord === true) {
                    element.addClass('breakWord');
                    element.removeClass('multiLine');
                } else {
                    element.removeClass('breakWord');
                }
            } else {
                element.removeClass('breakWord');
                element.removeClass('wordWrap');
                element.removeClass('multiLine');
            }
        }
    };
});

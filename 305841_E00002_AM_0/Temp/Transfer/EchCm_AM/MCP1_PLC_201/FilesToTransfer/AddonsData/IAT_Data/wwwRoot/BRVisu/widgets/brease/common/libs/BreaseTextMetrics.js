define(['brease/core/Types'], function (Types) {
    'use strict';
    /**
    * @class widgets.brease.common.libs.BreaseTextMetrics
    * class to retrieve metrics about rendered text
    * @extends Object
    * @singleton
    */
    var BreaseTextMetrics = function () {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.defaultFont = this.ctx.font.slice();
        },
        p = BreaseTextMetrics.prototype;

    /**
    * @method measureText
    * retrieve the width of a text in a certain font
    * @param {String} text
    * @param {String} font CSSFont string
    * @returns {Object}
    * @returns {Number} return.width
    */
    p.measureText = function (text, font) {
        this.ctx.font = typeof font === 'string' && font.length > 0 ? font : this.defaultFont;
        return this.ctx.measureText(Types.parseValue(text, 'String', { default: '' }));
    };

    var instance = new BreaseTextMetrics();
    return instance;
});

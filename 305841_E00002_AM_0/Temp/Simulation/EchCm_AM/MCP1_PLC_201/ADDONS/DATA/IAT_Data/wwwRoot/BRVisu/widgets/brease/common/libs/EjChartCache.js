define(function () {

    'use strict';

    /**
    * @class widgets.brease.common.libs.EjChartCache
    * Extendends snyfusion ejChart to cache data which synfusion would oderwise recalulate on each redraw
    * @extends Object
    */
    /**
    * @method constructor
    */
    var EjChartCache = function () {
            this.textSizeCache = {};
        },
        p = EjChartCache.prototype;
    /**
    * @method cacheTextSize
    * @param {String} text
    * @param {Object} font
    * @param {String} font.color
    * @param {String} font.fontFamily
    * @param {String} font.fontStyle
    * @param {String} font.fontWeight
    * @param {Number} font.opacity
    * @param {String} font.size
    * @param {Object} bounds
    * @param {Number} bounds.height
    * @param {Number} bounds.width
    */
    p.cacheTextSize = function (text, font, bounds) {
        var textLen = text.toString().length;
        if (!this.textSizeCache[font.fontFamily]) {
            this.textSizeCache[font.fontFamily] = { fontFamily: font.fontFamily };
        }
        if (!this.textSizeCache[font.fontFamily][font.size]) {
            this.textSizeCache[font.fontFamily][font.size] = { fontSize: font.size };
        }
        if (!this.textSizeCache[font.fontFamily][font.size][textLen]) {
            // reserver some additional space in width because the cache just uses the text length
            bounds.width = bounds.width * 1.2;
            // store the bounds with the text lenght as key. Keep in mind that this not strictly exact because different text content with the same length could result in different text bounds !
            this.textSizeCache[font.fontFamily][font.size][textLen] = { bounds: bounds };
        }
    };
    /**
    * @method getTextSize
    * @param {String} text
    * @param {Object} font
    * @param {String} font.color
    * @param {String} font.fontFamily
    * @param {String} font.fontStyle
    * @param {String} font.fontWeight
    * @param {Number} font.opacity
    * @param {String} font.size
    */
    p.getTextSize = function (text, font) {
        if (text == null) {
            return { width: 0, height: 0 };
        }
        var textLen = text.toString().length;
        if (this.textSizeCache[font.fontFamily] &&
            this.textSizeCache[font.fontFamily][font.size] &&
            this.textSizeCache[font.fontFamily][font.size][textLen]) {
            return this.textSizeCache[font.fontFamily][font.size][textLen].bounds;
        }
    };
    return EjChartCache;
});

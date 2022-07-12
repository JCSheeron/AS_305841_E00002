define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.objects.Area
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new Area instance.
    * @param {String} id
    * @param {Object} data
    * @param {Integer} data.width
    * @param {Integer} data.height
    * @param {Integer} data.top
    * @param {Integer} data.left
    * @param {String/Number} data.cssWidth (optional)
    * @param {String/Number} data.cssHeight (optional)
    */
    /**
    * @property {String} id
    */
    /**
    * @property {Integer} width
    */
    /**
    * @property {Integer} height
    */
    /**
    * @property {Integer} top
    */
    /**
    * @property {Integer} left
    */
    /**
    * @property {Integer} zIndex
    */
    /**
    * @property {Integer} tabIndex
    */
    /**
    * @property {String/Number} cssWidth
    */
    /**
    * @property {String/Number} cssHeight
    */
    /**
    * @property {String} styleWidth returns width as String, either in % (e.g. "50%") or as px (e.g. "90px"), if cssWidth is a Number
    * @readonly
    */
    /**
    * @property {String} styleHeight returns height as String, either in % (e.g. "50%") or as px (e.g. "90px"), if cssHeight is a Number
    * @readonly
    */
    var Area = function (id, data) {
        _setRequired.call(this, 'id', id);
        _setRequired.call(this, 'width', data.width);
        _setRequired.call(this, 'height', data.height);
        _setRequired.call(this, 'top', data.top);
        _setRequired.call(this, 'left', data.left);

        _setOptional.call(this, 'zIndex', data.zIndex);
        _setOptional.call(this, 'tabIndex', data.tabIndex);
        _setOptional.call(this, 'cssWidth', data.cssWidth);
        _setOptional.call(this, 'cssHeight', data.cssHeight);

    };
    /**
    * @method updateSize
    * updates the size of an area. Omitted size properties will not be changed 
    * @param {Object} size
    * @param {Number} size.width (optional)
    * @param {Number} size.height (optional)
    * @param {String/Number} size.cssWidth (optional)
    * @param {String/Number} size.cssHeight (optional)
    */
    Area.prototype.updateSize = function (size) {
        size = size || {};
        var data = {
            width: size.width !== undefined ? size.width : this.width,
            height: size.height !== undefined ? size.height : this.height,
            cssWidth: size.cssWidth !== undefined ? size.cssWidth : this.cssWidth,
            cssHeight: size.cssHeight !== undefined ? size.cssHeight : this.cssHeight
        };

        _setRequired.call(this, 'width', data.width);
        _setRequired.call(this, 'height', data.height);
        _setOptional.call(this, 'cssWidth', data.cssWidth);
        _setOptional.call(this, 'cssHeight', data.cssHeight);
    };

    Area.prototype.hasPercentageWidth = function () {
        return (this.cssWidth !== undefined && this.cssWidth.indexOf('%') !== -1);
    };

    Area.prototype.hasPercentageHeight = function () {
        return (this.cssHeight !== undefined && this.cssHeight.indexOf('%') !== -1);
    };

    Object.defineProperty(Area.prototype, 'styleWidth', { get: function () { return ((Utils.isString(this.cssWidth) && this.cssWidth.indexOf('%') !== -1) ? this.cssWidth : this.width + 'px'); } });
    Object.defineProperty(Area.prototype, 'styleHeight', { get: function () { return ((Utils.isString(this.cssHeight) && this.cssHeight.indexOf('%') !== -1) ? this.cssHeight : this.height + 'px'); } });

    function _setRequired(propertyName, value) {
        if (value !== undefined) {
            this[propertyName] = value;
        } else {
            //console.log(this, value)
            throw new SyntaxError(propertyName + ' is required');
        }
    }

    function _setOptional(propertyName, value) {
        if (value !== undefined) {
            this[propertyName] = value;
        }
    }

    return Area;
});

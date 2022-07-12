define(function () {

    'use strict';

    var NumericValue = function (widget) {
        return this.init(widget);
    };

    NumericValue.prototype.init = function (widget) {
        this.numericValueVal = widget.el.find('.breaseNumpadNumericValue');

        if (this.numericValueVal.length > 0) {
            return this; 
        } else {
            return {};
        }
    };

    NumericValue.prototype.setValueAsString = function (str) {
        this.numericValueVal.text(str);
    };

    NumericValue.prototype.setError = function (error) {
        this.numericValueVal.toggleClass('error', error); 
    };

    return NumericValue;
});

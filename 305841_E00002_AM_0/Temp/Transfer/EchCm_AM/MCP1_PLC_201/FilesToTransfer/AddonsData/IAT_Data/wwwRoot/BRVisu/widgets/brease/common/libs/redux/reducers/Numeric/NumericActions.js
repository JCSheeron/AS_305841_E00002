define(function () {

    'use strict';

    var NumericActions = {
        UPDATE_VALUE: 'UPDATE_VALUE',
        updateValue: function updateValue(newValue) {
            var obj = {
                type: NumericActions.UPDATE_VALUE,
                value: newValue
            };
            return obj;
        },
        UPDATE_MINVALUE: 'UPDATE_MINVALUE',
        updateMinValue: function updateMinValue(newMinValue) {
            var obj = {
                type: NumericActions.UPDATE_MINVALUE,
                minValue: newMinValue
            };
            return obj;
        },
        UPDATE_MAXVALUE: 'UPDATE_MAXVALUE',
        updateMaxValue: function updateMaxValue(newMaxValue) {
            var obj = {
                type: NumericActions.UPDATE_MAXVALUE,
                maxValue: newMaxValue
            };
            return obj;
        }
    };

    return NumericActions;

});

define([
    'brease/core/Class'
], function (SuperClass) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.ValueDisplay.ValueDisplayActions
     * @iatMeta studio:visible
     * false
     */

    var ValueDisplayActions = {
        //Change to a new VALUEDISPLAYSIZE
        VALUEDISPLAYSIZE_CHANGE: 'VALUEDISPLAYSIZE_CHANGE',
        changeValueDisplaySize: function changeValueDisplaySize(newValueDisplaySize) {
            return {
                type: ValueDisplayActions.VALUEDISPLAYSIZE_CHANGE,
                valueDisplaySize: parseInt(newValueDisplaySize, 10)
            };
        },        
        SHOWVALUEDISPLAY_CHANGE: 'SHOWVALUEDISPLAY_CHANGE',
        changeShowValueDisplay: function changeShowValueDisplay(newShowValueDisplay) {
            return {
                type: ValueDisplayActions.SHOWVALUEDISPLAY_CHANGE,
                showValueDisplay: newShowValueDisplay
            };
        },        
        SHOWUNIT_CHANGE: 'SHOWUNIT_CHANGE',
        changeShowUnit: function changeShowUnit(newShowUnit) {
            return {
                type: ValueDisplayActions.SHOWUNIT_CHANGE,
                showUnit: newShowUnit
            };
        },
        UNITSYMBOL_CHANGE: 'UNITSYMBOL_CHANGE',
        changeUnitSymbol: function changeUnitSymbol(newUnitSymbol) {
            return {
                type: ValueDisplayActions.UNITSYMBOL_CHANGE,
                unitSymbol: newUnitSymbol
            };
        },
        ELLIPSIS_CHANGE: 'ELLIPSIS_CHANGE',
        changeEllipsis: function changeEllipsis(newEllipsis) {
            return {
                type: ValueDisplayActions.ELLIPSIS_CHANGE,
                ellipsis: newEllipsis
            };
        }
    };

    return ValueDisplayActions;

});

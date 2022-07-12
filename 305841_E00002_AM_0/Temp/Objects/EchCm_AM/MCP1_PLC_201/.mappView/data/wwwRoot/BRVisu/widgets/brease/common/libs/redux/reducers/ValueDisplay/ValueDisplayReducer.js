define([
    'widgets/brease/common/libs/redux/reducers/ValueDisplay/ValueDisplayActions'
], function (ValueDisplayActions) {

    'use strict';

    var ValueDisplayReducer = function ValueDisplayReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case ValueDisplayActions.VALUEDISPLAYSIZE_CHANGE:
                state.valueDisplaySize = parseInt(action.valueDisplaySize, 10);
                return state;

            case ValueDisplayActions.SHOWVALUEDISPLAY_CHANGE:
                state.showValueDisplay = action.showValueDisplay;
                return state;

            case ValueDisplayActions.SHOWUNIT_CHANGE:
                state.showUnit = action.showUnit;
                return state;

            case ValueDisplayActions.UNITSYMBOL_CHANGE:
                state.unitSymbol = action.unitSymbol;
                return state;

            case ValueDisplayActions.ELLIPSIS_CHANGE:
                state.ellipsis = action.ellipsis;
                return state;

            default:
                return state;
        }
    };

    return ValueDisplayReducer;

});

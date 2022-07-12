define([
    'widgets/brease/common/libs/redux/reducers/Numeric/NumericActions'
], function (NumericActions) {

    'use strict';

    var NumericReducer = function NumericReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case NumericActions.UPDATE_VALUE:
                state.value = action.value;
                return state;
            case NumericActions.UPDATE_MINVALUE:
                state.minValue = action.minValue;
                return state;
            case NumericActions.UPDATE_MAXVALUE:
                state.maxValue = action.maxValue;
                return state;
            default:
                return state;
        }
    };

    return NumericReducer;

});

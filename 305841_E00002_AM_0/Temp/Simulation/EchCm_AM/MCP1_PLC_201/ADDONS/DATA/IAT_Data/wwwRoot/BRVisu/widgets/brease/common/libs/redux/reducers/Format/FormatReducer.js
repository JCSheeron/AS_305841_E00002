define([
    'widgets/brease/common/libs/redux/reducers/Format/FormatActions'
], function (FormatActions) {

    'use strict';

    var FormatReducer = function FormatReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case FormatActions.FORMAT_CHANGE:
                state.format = action.format;
                return state;

            default:
                return state;
        }
    };

    return FormatReducer;

});

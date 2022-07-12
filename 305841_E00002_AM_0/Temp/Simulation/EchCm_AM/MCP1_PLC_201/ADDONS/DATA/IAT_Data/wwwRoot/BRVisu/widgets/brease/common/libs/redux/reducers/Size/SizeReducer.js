define([
    'widgets/brease/common/libs/redux/reducers/Size/SizeActions'
], function (SizeActions) {

    'use strict';

    var SizeReducer = function SizeReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case SizeActions.HEIGHT_CHANGE:
                state.height = action.height;
                return state;
            case SizeActions.WIDTH_CHANGE:
                state.width = action.width;
                return state;
            default:
                return state;
        }
    };

    return SizeReducer;

});

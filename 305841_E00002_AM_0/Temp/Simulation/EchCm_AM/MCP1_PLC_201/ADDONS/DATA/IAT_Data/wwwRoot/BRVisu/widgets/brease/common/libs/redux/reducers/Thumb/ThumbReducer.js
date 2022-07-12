define([
    'widgets/brease/common/libs/redux/reducers/Thumb/ThumbActions'
], function (ThumbActions) {

    'use strict';

    var ThumbReducer = function ThumbReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case ThumbActions.THUMBSIZE_CHANGE:
                state.thumbSize = parseInt(action.thumbSize, 10);
                return state;

            case ThumbActions.THUMBIMAGE_CHANGE:
                state.thumbImage = action.thumbImage;
                return state;

            case ThumbActions.SELECT_THUMB:
                state.thumbSelected = true;
                return state;

            case ThumbActions.UNSELECT_THUMB:
                state.thumbSelected = false;
                return state;

            default:
                return state;
        }
    };

    return ThumbReducer;

});

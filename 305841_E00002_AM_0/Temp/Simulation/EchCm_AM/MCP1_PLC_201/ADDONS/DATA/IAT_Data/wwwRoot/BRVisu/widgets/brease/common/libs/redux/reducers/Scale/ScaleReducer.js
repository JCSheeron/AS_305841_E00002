define([
    'widgets/brease/common/libs/redux/reducers/Scale/ScaleActions'
], function (ScaleActions) {

    'use strict';

    var ScaleReducer = function ScaleReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case ScaleActions.SCALEDOMAIN_CHANGE:
                state.scaleDomain = action.scaleDomain;
                return state;

            case ScaleActions.SCALERANGE_CHANGE:
                state.scaleRange = action.scaleRange;
                return state;

            case ScaleActions.SCALEOFFSET_CHANGE:
                state.scaleOffset = parseInt(action.scaleOffset, 10);
                return state;

            case ScaleActions.SCALEPOSITION_CHANGE:
                state.tickPosition = action.tickPosition;
                return state;

            case ScaleActions.SCALEMAJORTICKS_CHANGE:
                state.majorTicks = action.majorTicks;
                return state;

            case ScaleActions.SCALESHOWTICKNUMBERS_CHANGE:
                state.showTickNumbers = action.showTickNumbers;
                return state;

            default:
                return state;
        }
    };

    return ScaleReducer;

});

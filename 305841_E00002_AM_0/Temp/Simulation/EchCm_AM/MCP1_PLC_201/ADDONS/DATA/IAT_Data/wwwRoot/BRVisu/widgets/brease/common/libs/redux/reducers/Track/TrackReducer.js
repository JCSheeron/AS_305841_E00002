define([
    'widgets/brease/common/libs/redux/reducers/Track/TrackActions'
], function (TrackActions) {

    'use strict';

    var TrackReducer = function TrackReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case TrackActions.TRACKSIZE_CHANGE:
                state.trackSize = parseInt(action.trackSize, 10);
                return state;
            case TrackActions.TRACK_LOCKED:
                state.trackLocked = action.trackLocked;
                return state;

            default:
                return state;
        }
    };

    return TrackReducer;

});

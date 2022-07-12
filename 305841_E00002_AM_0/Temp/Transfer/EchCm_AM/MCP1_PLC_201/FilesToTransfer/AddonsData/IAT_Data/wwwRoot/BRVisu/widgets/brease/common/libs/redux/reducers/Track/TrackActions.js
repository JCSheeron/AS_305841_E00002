define(function () {

    'use strict';

    /**
        * @class widgets.brease.common.libs.redux.reducers.Track.TrackActions
        * @iatMeta studio:visible
        * false
        */

    var TrackActions = {
        //Change to a new trackSize
        TRACKSIZE_CHANGE: 'TRACKSIZE_CHANGE',
        changeTrackSize: function changeTrackSize(newTrackSize) {
            return {
                type: TrackActions.TRACKSIZE_CHANGE,
                trackSize: parseInt(newTrackSize, 10)
            };
        },
        TRACK_LOCKED: 'TRACK_LOCKED',
        lockTrack: function lockTrack(locked) {
            return {
                type: TrackActions.TRACK_LOCKED,
                trackLocked: locked
            };
        }
    };

    return TrackActions;

});

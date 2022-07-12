define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Orientation.OrientationActions
     * @iatMeta studio:visible
     * false
     */

    var OrientationActions = {
        ORIENTATION_CHANGE: 'ORIENTATION_CHANGE',
        changeOrientation: function changeOrientation(newOrientation) {
            return {
                type: OrientationActions.ORIENTATION_CHANGE,
                orientation: newOrientation
            };
        }
    };

    return OrientationActions;

});

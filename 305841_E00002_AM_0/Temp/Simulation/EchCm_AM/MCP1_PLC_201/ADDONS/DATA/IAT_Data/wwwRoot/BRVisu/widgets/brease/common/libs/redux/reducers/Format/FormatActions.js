define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Format.FormatActions
     * @iatMeta studio:visible
     * false
     */

    var FormatActions = {
        //Change to a new trackSize
        FORMAT_CHANGE: 'FORMAT_CHANGE',
        changeFormat: function changeFormat(newFormat) {
            return {
                type: FormatActions.FORMAT_CHANGE,
                format: newFormat
            };
        }
    };

    return FormatActions;

});

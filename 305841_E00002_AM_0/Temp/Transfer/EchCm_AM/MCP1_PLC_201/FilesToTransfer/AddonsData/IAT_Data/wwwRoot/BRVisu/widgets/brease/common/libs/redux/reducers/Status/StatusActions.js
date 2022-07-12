define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Status.StatusActions
     * @iatMeta studio:visible
     * false
     */

    var StatusActions = {
        //Chnage on visible
        VISIBLE_CHANGE: 'VISIBLE_CHANGE',
        changeVisible: function changeVisible(newVisibility) {
            return {
                type: StatusActions.VISIBLE_CHANGE,
                visibility: newVisibility
            };
        },
        //Chnage on enable
        ENABLE_CHANGE: 'ENABLE_CHANGE',
        changeEnable: function changeEnable(newEnable) {
            return {
                type: StatusActions.ENABLE_CHANGE,
                enable: newEnable
            };
        },
        //Change on suspend/wake
        ACTIVE_CHANGE: 'ACTIVE_CHANGE',
        changeActive: function changeActive(newActive) {
            return {
                type: StatusActions.ACTIVE_CHANGE,
                active: newActive
            };
        }
    };

    return StatusActions;

});

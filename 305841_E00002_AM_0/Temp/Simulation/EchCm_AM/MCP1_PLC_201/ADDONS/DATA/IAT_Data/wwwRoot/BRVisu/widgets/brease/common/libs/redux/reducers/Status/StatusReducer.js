define([
    'widgets/brease/common/libs/redux/reducers/Status/StatusActions'
], function (StatusActions) {

    'use strict';

    var StatusReducer = function StatusReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case StatusActions.VISIBLE_CHANGE:
                state.visible = action.visibility;
                return state;
            case StatusActions.ENABLE_CHANGE:
                state.enabled = action.enable;
                return state;
            case StatusActions.ACTIVE_CHANGE:
                state.active = action.active;
                return state;
            default:
                return state;
        }
    };

    return StatusReducer;

});

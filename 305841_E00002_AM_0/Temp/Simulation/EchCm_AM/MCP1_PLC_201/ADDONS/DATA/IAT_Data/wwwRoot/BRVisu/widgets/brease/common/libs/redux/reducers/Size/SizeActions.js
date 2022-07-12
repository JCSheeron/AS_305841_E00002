define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Size.SizeActions
     * @iatMeta studio:visible
     * false
     */

    var SizeActions = {
        //Chnage on height
        HEIGHT_CHANGE: 'HEIGHT_CHANGE',
        changeHeight: function changeHeight(newHeight) {
            return {
                type: SizeActions.HEIGHT_CHANGE,
                height: newHeight
            };
        },
        //Chnage on enable
        WIDTH_CHANGE: 'WIDTH_CHANGE',
        changeWidth: function changeWidth(newWidth) {
            return {
                type: SizeActions.WIDTH_CHANGE,
                width: newWidth
            };
        }
    };

    return SizeActions;

});

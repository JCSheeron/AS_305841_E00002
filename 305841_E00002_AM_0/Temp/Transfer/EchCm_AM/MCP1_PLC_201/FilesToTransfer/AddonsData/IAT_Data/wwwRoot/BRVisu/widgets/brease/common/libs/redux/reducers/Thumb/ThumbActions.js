define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Thumb.ThumbActions
     * @iatMeta studio:visible
     * false
     */

    var ThumbActions = {
        //Change to a new thumbSize
        THUMBSIZE_CHANGE: 'THUMBSIZE_CHANGE',
        changeThumbSize: function changeThumbSize(newThumbSize) {
            return {
                type: ThumbActions.THUMBSIZE_CHANGE,
                thumbSize: parseInt(newThumbSize, 10)
            };
        },
        THUMBIMAGE_CHANGE: 'THUMBIMAGE_CHANGE',
        changeThumbImage: function changeThumbImage(newThumbImage) {
            return {
                type: ThumbActions.THUMBIMAGE_CHANGE,
                thumbImage: newThumbImage
            };
        },
        SELECT_THUMB: 'SELECT_THUMB',
        selectThumb: function selectThumb() {
            return {
                type: ThumbActions.SELECT_THUMB
            };
        },
        UNSELECT_THUMB: 'UNSELECT_THUMB',
        unselectThumb: function unselectThumb() {
            return {
                type: ThumbActions.UNSELECT_THUMB
            };
        }
    };

    return ThumbActions;

});

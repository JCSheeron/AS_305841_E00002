define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Image.ImageActions
     * @iatMeta studio:visible
     * false
     */

    var ImageActions = {
    //Update the whole list of images
        UPDATE_IMAGE_LIST: 'UPDATE_IMAGE_LIST',
        updateImageList: function updateImageList(newImageList) {
            return {
                type: ImageActions.UPDATE_IMAGE_LIST,
                imageList: newImageList
            };
        },
        UPDATE_IMAGE_PATH: 'UPDATE_IMAGE_PATH',
        updateImagePath: function updateImagePath(newImagePath) {
            return {
                type: ImageActions.UPDATE_IMAGE_PATH,
                imagePath: newImagePath
            };
        },
        //Update textSettings
        UPDATE_IMAGE_SETTINGS: 'UPDATE_IMAGE_SETTINGS',
        updateImageSettings: function updateImageSettings(newImageSettings) {
            return {
                type: ImageActions.UPDATE_IMAGE_SETTINGS,
                imageSettings: newImageSettings
            };
        }
    };

    return ImageActions;

});

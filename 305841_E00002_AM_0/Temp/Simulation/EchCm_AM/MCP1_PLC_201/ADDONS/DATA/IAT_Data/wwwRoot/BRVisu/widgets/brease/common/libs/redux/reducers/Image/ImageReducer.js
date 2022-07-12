define([
    'widgets/brease/common/libs/redux/reducers/Image/ImageActions',
    'widgets/brease/common/libs/redux/utils/UtilsImage'
], function (ImageActions, UtilsImage) {

    'use strict';

    var ImageReducer = function ImageReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        var imageElements;
        switch (action.type) {
            case ImageActions.UPDATE_IMAGE_LIST:
                imageElements = UtilsImage.createImageElements(action.imageList, state.imagePath);
                return _.assign({}, state, {
                    imageList: action.imageList,
                    imageElements: imageElements
                });
            case ImageActions.UPDATE_IMAGE_PATH:
                imageElements = UtilsImage.createImageElements(state.imageList, action.imagePath);
                return _.assign({}, state, {
                    imagePath: action.imagePath,
                    imageElements: imageElements
                });
            default:
                return state;
        }
    };

    return ImageReducer;

});

define([
    'widgets/brease/common/libs/flux/stores/ImageStore/ImageActionTypes'
], function (ImageActionTypes) {

    'use strict';

    var ImageActions = function (dispatcher) {
        this.dispatcher = dispatcher;
    };

    ImageActions.prototype.initImage = function initImage() {
        this.dispatcher.dispatch({
            type: ImageActionTypes.INIT_IMAGE
        });
    };

    ImageActions.prototype.initImageAfterPreload = function initImageAfterPreload() {
        this.dispatcher.dispatch({
            type: ImageActionTypes.INIT_IMAGE_AFTER_PRELOAD
        });
    };

    ImageActions.prototype.setImageList = function setImageList(imageList) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_IMAGE_LIST,
            data: imageList
        });
    };

    ImageActions.prototype.setImageFromIndex = function setImageFromIndex(imageArg, indexArg) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_IMAGE_FROM_INDEX,
            data: { image: imageArg, index: indexArg }
        });
    };

    ImageActions.prototype.setImageIndex = function setImageIndex(index) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_IMAGE_INDEX,
            data: index
        });
    };

    ImageActions.prototype.setPathPrefix = function setPathPrefix(prefix) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_PATH_PREFIX,
            data: prefix
        });
    };

    ImageActions.prototype.setSizeMode = function setSizeMode(sizeMode) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_SIZE_MODE,
            data: sizeMode
        });
    };

    ImageActions.prototype.setUseSVGStyling = function setUseSVGStyling(useSVGStyling) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_USE_SVG_STYLING,
            data: useSVGStyling
        });
    };

    ImageActions.prototype.setBackgroundAlignment = function setBackgroundAlignment(backgroundAlignment) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_BACKGROUND_ALIGNMENT,
            data: backgroundAlignment
        });
    };

    ImageActions.prototype.setWidth = function setWidth(width) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_WIDTH,
            data: width
        });
    };

    ImageActions.prototype.setHeight = function setHeight(height) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_HEIGHT,
            data: height
        });
    };

    ImageActions.prototype.setVisible = function setVisible(visible) {
        this.dispatcher.dispatch({
            type: ImageActionTypes.SET_VISIBLE,
            data: visible
        });
    };

    return ImageActions;

});

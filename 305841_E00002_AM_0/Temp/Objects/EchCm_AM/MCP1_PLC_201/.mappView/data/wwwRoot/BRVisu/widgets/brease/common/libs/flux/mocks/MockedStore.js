define([
    'brease/enum/Enum'
], function (Enum) {

    'use strict';

    return function MockedView() {

        this.subscribedViews = [];

        this.registerView = function registerView(view) {
            this.subscribedViews.push(view);
        };

        this.dispatchAction = function dispatchAction() {
            this.subscribedViews.forEach(function (view) {
                view.update();
            });
        };

        this.state = {
            imageList: [''],
            imageListWithPrefix: [''],
            imageIndex: 0,
            pathPrefix: '',
            sizeMode: Enum.SizeMode.CONTAIN,
            backgroundAlignment: ['left', 'top'],
            type: 'invalid',
            svgInline: undefined,
            actualImage: '',
            height: 'auto',
            width: 'auto',
            visible: true,
            preloading: false
        };

        this.getImageType = function getImageType() {
            return this.state.type;
        };

        this.getImagePath = function getImagePath() {
            return this.state.actualImage;
        };

        this.getSvgInline = function getSvgInline() {
            return this.state.svgInline;
        };

        this.getImageSizeMode = function getImageSizeMode() {
            return this.state.sizeMode;
        };

        this.getBackgroundAlignment = function getBackgroundAlignment() {
            return this.state.backgroundAlignment;
        };

        this.getHeight = function getHeight() {
            return this.state.height;
        };

        this.getWidth = function getWidth() {
            return this.state.width;
        };

        this.getVisible = function getVisible() {
            return this.state.visible;
        };

        this.getPreloading = function getPreloading() {
            return this.state.preloading;
        };

    };

});

define([
    'widgets/brease/common/libs/wfUtils/UtilsImage'
], function (UtilsImage) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.ImageHandling
     * This Module should be used to create the SVG and IMG Tags
     * Furthermore the setImage Function is doing everything what needs to be done when having images. 
     * It checks if the provided Image is an SVG or not.
     */

    var ImageHandling = {};

    /*
     * The helpers functions should not be directly used from the Module.
     * If you need the Utils, require them directly in your widget, module
     * They are just placed inside the helper object to have a better testability
     */
    ImageHandling.helpers = {
        utilsImage: UtilsImage
    };

    /**
     * @method setImage
     * The setImage function is handling the loading of Images
     * Furthermore it checks if the image is an svg or not
     * When everything is done the callbackFunction will be called with the Tag-Parameter --> In the Widget you just need to position it correctly
     * @param {String} image path to the Image
     * @param {Function} callBackFn
     */
    ImageHandling.setImage = function (image, callBackFn) {
        var tag;
        if (ImageHandling.helpers.utilsImage.isStylable(image)) {
            //image is SVG
            tag = ImageHandling.createSvgTag();
            if (this.imageDeferred !== undefined) {
                if (this.imageDeferred.state() === 'pending') {
                    this.imageDeferred.reject();
                }
            }
            this.imageDeferred = ImageHandling.helpers.utilsImage.getInlineSvg(image);
            this.imageDeferred.done(function (svgElement) {
                tag.replaceWith(svgElement);
                tag = svgElement;
                tag.removeClass('remove');
                callBackFn(tag);
            });
        } else {
            //image is NOT SVG
            if (this.imageDeferred !== undefined) {
                this.imageDeferred.reject();
            }

            tag = ImageHandling.createImgTag();
            tag.attr('src', image);
            if (image !== undefined && image !== '') {
                tag.removeClass('remove');
            }
            callBackFn(tag);

        }
    };

    /**
     * @method createImgTag
     * The createImgTag function is creating an ImgTag and adds the Class 'remove'
     * @return {HTMLElement} returns the jQuery Element of the ImgTag
     */
    ImageHandling.createImgTag = function () {
        return $('<img/>').addClass('remove');
    };

    /**
     * @method createSvgTag
     * The createSvgTag function is creating an SvgTag and adds the Class 'remove'
     * @return {HTMLElement} returns the jQuery Element of the SvgTag
     */
    ImageHandling.createSvgTag = function () {
        return $('<svg/>').addClass('remove');
    };

    /**
     * @method createImgSvgTags
     * The createImgSvgTags function is creating an SvgTag as well as an ImgTag and adds the Class 'remove'
     * @return {Object} Returns an Object with imgEl and svgEl inside
     */
    ImageHandling.createImgSvgTags = function () {
        var obj = {
            imgEl: ImageHandling.createImgTag(),
            svgEl: ImageHandling.createSvgTag()
        };
        return obj;
    };

    function ImageHandlingFn() {
        return {
            setImage: ImageHandling.setImage,
            createImgTag: ImageHandling.createImgTag,
            createSvgTag: ImageHandling.createSvgTag,
            createImgSvgTags: ImageHandling.createImgSvgTags
        };
    }

    return ImageHandlingFn;

});

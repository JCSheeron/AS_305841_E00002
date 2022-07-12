define([
    'widgets/brease/common/libs/BoxLayout',
    'widgets/brease/common/libs/wfUtils/UtilsImage'
], function (BoxLayout, UtilsImage) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.view.ImageView.ImageView
     * View displaying an Image
     */

    var ImageView = function (props, parent) {
        this.render(props, parent);
    };

    var p = ImageView.prototype;

    /**
     * @method render
     * Renders the view
     * @param {jQuery} parent DOM element for the parent View
     * @param {Object} props Properties for the View
     * @param {String} props.image Path to the image
     */
    p.render = function render(props, parent) {
        this.el = $(BoxLayout.createBox());
        this.el.addClass('ImageView');
        if (props.subClasses !== undefined && props.subClasses !== '') {
            this.el.addClass(props.subClasses);
        }
        if (UtilsImage.isStylable(props.image)) {
            var that = this;
            this.imageDeferred = UtilsImage.getInlineSvg(props.image, false, undefined, props.cache);
            this.imageDeferred.done(function (svgElement) {
                that.image = svgElement;
                that.el.append(that.image);
            });
        } else {
            this.image = $('<img src=' + props.image + '>');
            this.el.append(this.image);
        }
        parent.append(this.el);
    };

    p.dispose = function dispose() {
        if (this.imageDeferred !== undefined) {
            if (this.imageDeferred.state() === 'pending') {
                this.imageDeferred.reject();
            }
        }
        this.image.remove();
        this.el.remove();
    };

    return ImageView;

});

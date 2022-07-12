define([
    'widgets/brease/ToggleButton/ToggleButton',
    'brease/enum/Enum',
    'brease/events/BreaseEvent',
    'brease/core/Types',
    'widgets/brease/common/libs/wfUtils/UtilsImage'
], function (SuperClass, Enum, BreaseEvent, Types, UtilsImage) {

    'use strict';

    /**
    * @class widgets.brease.CheckBox
    * #Description
    * CheckBox widget  
    *  
    * @breaseNote 
    * @extends widgets.brease.ToggleButton
    * @aside example buttons
    *
    * @iatMeta category:Category
    * Buttons,Selector
    * @iatMeta description:short
    * Umschalten zwischen 0/1
    * @iatMeta description:de
    * Ermöglicht es dem Benutzer die zugehörige Option zu aktivieren oder deaktivieren
    * @iatMeta description:en
    * Enables the user to select or clear the associated option
    */

    /**
    * @cfg {Integer} boxSize=25
    * @iatStudioExposed
    * @iatCategory Appearance
    * Size of the checkbox symbol
    */

    /**
    * @cfg {ImagePath} image=''
    * @hide
    */

    /**
    * @cfg {ImagePath} mouseDownImage=''
    * @hide
    */

    /**
    * @method setMouseDownImage
    * @hide
    */

    /**
    * @cfg {ImagePath} uncheckedBoxImage=''
    * @iatStudioExposed
    * @iatCategory Appearance
    * Image of the box when the widget is unchecked.
    */

    /**
    * @cfg {ImagePath} checkedBoxImage=''
    * @iatStudioExposed
    * @iatCategory Appearance
    * Image of the box when the widget is checked.
    */

    /**
    * @cfg {ImagePath} disabledCheckedBoxImage=''
    * @iatStudioExposed
    * @iatCategory Appearance
    * Image of the box when the widget is checked and disabled. 
    */

    /**
    * @cfg {ImagePath} disabledUncheckedBoxImage=''
    * @iatStudioExposed
    * @iatCategory Appearance
    * Image of the box when the widget is unchecked and disabled. 
    */

    var defaultSettings = {
            boxSize: 25,
            textAlign: 'left',
            imageAlign: 'left',
            checkedBoxImage: '',
            uncheckedBoxImage: '',
            disabledCheckedBoxImage: '',
            disabledUncheckedBoxImage: ''
        },

        WidgetClass = SuperClass.extend(function CheckBox() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseCheckBox');
        }

        _appendElements(this);
        SuperClass.prototype.init.call(this);
        _updateElement(this);
    };

    /**
     * @method setBoxSize
     * Sets boxSize
     * @param {Integer} boxSize
     */
    p.setBoxSize = function (boxSize) {
        this.settings.boxSize = boxSize;
        _setBoxSize(this);
    };

    /**
     * @method getBoxSize 
     * Returns boxSize.
     * @return {Integer}
     */
    p.getBoxSize = function () {
        return this.settings.boxSize;
    };

    /**
     * @method setCheckedBoxImage
     * Sets checkedBoxImage
     * @param {String} checkedBoxImage
     */
    p.setCheckedBoxImage = function (checkedBoxImage) {
        this.settings.checkedBoxImage = checkedBoxImage;
        _updateElement(this);
    };

    /**
     * @method getCheckedBoxImage 
     * Returns checkedBoxImage.
     * @return {String}
     */
    p.getCheckedBoxImage = function () {
        return this.settings.checkedBoxImage;
    };

    /**
     * @method setUncheckedBoxImage
     * Sets uncheckedBoxImage
     * @param {String} uncheckedBoxImage
     */
    p.setUncheckedBoxImage = function (uncheckedBoxImage) {
        this.settings.uncheckedBoxImage = uncheckedBoxImage;
        _updateElement(this);
    };

    /**
     * @method getUncheckedBoxImage 
     * Returns uncheckedBoxImage.
     * @return {String}
     */
    p.getUncheckedBoxImage = function () {
        return this.settings.uncheckedBoxImage;
    };

    /**
     * @method setDisabledCheckedBoxImage
     * Sets disabledCheckedBoxImage
     * @param {String} disabledCheckedBoxImage
     */
    p.setDisabledCheckedBoxImage = function (disabledCheckedBoxImage) {
        this.settings.disabledCheckedBoxImage = disabledCheckedBoxImage;
        _updateElement(this);
    };

    /**
     * @method getDisabledCheckedBoxImage 
     * Returns disabledCheckedBoxImage.
     * @return {String}
     */
    p.getDisabledCheckedBoxImage = function () {
        return this.settings.disabledCheckedBoxImage;
    };

    /**
     * @method setDisabledUncheckedBoxImage
     * Sets disabledUncheckedBoxImage
     * @param {String} disabledUncheckedBoxImage
     */
    p.setDisabledUncheckedBoxImage = function (disabledUncheckedBoxImage) {
        this.settings.disabledUncheckedBoxImage = disabledUncheckedBoxImage;
        _updateElement(this);
    };

    /**
     * @method getDisabledUncheckedBoxImage 
     * Returns disabledUncheckedBoxImage.
     * @return {String}
     */
    p.getDisabledUncheckedBoxImage = function () {
        return this.settings.disabledUncheckedBoxImage;
    };

    /**
     * @method setImage 
     * Remove the setImage action from the ToggleButton
     */
    p.setImage = function () {
    };

    /**
     * @method removeImage 
     * Remove the removeImage action from the ToggleButton
     */
    p.removeImage = function () {
    };

    /**
     * @method setUseSVGStyling
     * Sets useSVGStyling
     * @param {Boolean} useSVGStyling
     */
    p.setUseSVGStyling = function (useSVGStyling) {
        SuperClass.prototype.setUseSVGStyling.apply(this, arguments);
        _updateElement(this);
    };

    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;
        this.setClasses();
        _alignElement(this);
    };

    p.toggle = function (status, omitSubmit) {
        SuperClass.prototype.toggle.call(this, status, omitSubmit);
        _updateElement(this);
    };

    p._enableHandler = function () {
        SuperClass.prototype._enableHandler.apply(this, arguments);
        _updateElement(this);
    };

    p.setClasses = function () {
        var imgClass;
        if (((this.imgEl !== undefined) || (this.radiobutton !== undefined) || (this.checkbox !== undefined)) &&
            (this.textEl !== undefined && this.settings.text !== '')) {

            switch (this.settings.imageAlign) {
                case Enum.ImageAlign.left:
                    imgClass = 'image-left';
                    break;

                case Enum.ImageAlign.right:
                    imgClass = 'image-right';
                    break;

                case Enum.ImageAlign.top:
                    imgClass = 'image-top';
                    break;

                case Enum.ImageAlign.bottom:
                    imgClass = 'image-bottom';
                    break;

            }
            this.el.removeClass('image-left image-right image-top image-bottom');
            this.el.addClass(imgClass);
        } else {
            this.el.removeClass('image-left image-right image-top image-bottom');
        }
    };

    function _setBoxSize(widget) {
        widget.imgEl.height(parseInt(widget.settings.boxSize, 10))
            .width(parseInt(widget.settings.boxSize, 10))
            .css('font-size', widget.settings.boxSize + 'px')
            .css('line-height', widget.settings.boxSize + 'px');
        widget.svgEl.height(parseInt(widget.settings.boxSize, 10))
            .width(parseInt(widget.settings.boxSize, 10))
            .css('font-size', widget.settings.boxSize + 'px')
            .css('line-height', widget.settings.boxSize + 'px');
        widget.checkbox.height(parseInt(widget.settings.boxSize, 10))
            .width(parseInt(widget.settings.boxSize, 10))
            .css('font-size', widget.settings.boxSize + 'px')
            .css('line-height', widget.settings.boxSize + 'px');
    }

    function _updateElement(widget) {
        var imageToLoad = '';

        if (widget.imageDeferred !== undefined) {
            if (widget.imageDeferred.state() === 'pending') {
                widget.imageDeferred.reject();
            }
        }
        var state = widget.isEnabled() << 1 | widget.getValue() << 0;
        switch (state) {
            case 1: // disabled/checked
                widget.el.addClass('checked');
                imageToLoad = widget.getDisabledCheckedBoxImage();
                break;
            case 2: // enabled/unchecked
                widget.el.removeClass('checked');
                imageToLoad = widget.getUncheckedBoxImage();
                break;
            case 3: // enabled/checked
                widget.el.addClass('checked');
                imageToLoad = widget.getCheckedBoxImage();
                break;
            default: // disabled/unchecked
                widget.el.removeClass('checked');
                imageToLoad = widget.getDisabledUncheckedBoxImage();
        }
        imageToLoad = typeof imageToLoad === 'string' && imageToLoad.length > 0 ? imageToLoad : undefined;

        if (imageToLoad !== undefined) {
            if (UtilsImage.isStylable(imageToLoad) && widget.settings.useSVGStyling === true) {
                widget.imageDeferred = UtilsImage.getInlineSvg(imageToLoad);
                widget.imageDeferred.done(function (svgElement) {
                    widget._setSvgEl(svgElement);
                });
            } else {
                widget._setImgEl(imageToLoad);
            }
        } else {
            widget._setCheckBox();
        }
    }

    p._setSvgEl = function (svgElement) {
        this.svgEl.replaceWith(svgElement);
        this.svgEl = svgElement;
        _setBoxSize(this);
        this.svgEl.show();
        this.imgEl.hide();
        this.checkbox.hide();
    };

    p._setImgEl = function (image) {
        this.imgEl.attr('src', image);
        this.svgEl.hide();
        this.imgEl.show();
        this.checkbox.hide();
    };

    p._setCheckBox = function () {
        this.svgEl.hide();
        this.imgEl.hide();
        this.checkbox.show();
    };

    function _appendElements(widget) {
        widget.imgEl = $('<img/>').hide();
        widget.svgEl = $('<svg/>').hide();
        widget.checkbox = $('<div class="checkbox"><div>').hide();
        _alignElement(widget);
        _setBoxSize(widget);
    }

    function _alignElement(widget) {
        if (widget.checkbox !== undefined && widget.imgEl !== undefined && widget.svgEl !== undefined) {
            if ((widget.settings.imageAlign === Enum.ImageAlign.left) || (widget.settings.imageAlign === Enum.ImageAlign.top)) {
                widget.el.prepend(widget.checkbox);
                widget.el.prepend(widget.imgEl);
                widget.el.prepend(widget.svgEl);
            } else {
                widget.el.append(widget.checkbox);
                widget.el.append(widget.imgEl);
                widget.el.append(widget.svgEl);
            }
        }
    }

    return WidgetClass;

});

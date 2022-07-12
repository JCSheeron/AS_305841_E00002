define(['widgets/brease/ToggleButton/ToggleButton',
    'brease/enum/Enum',
    'brease/events/BreaseEvent',
    'widgets/brease/common/libs/wfUtils/UtilsImage'],
function (SuperClass, Enum, BreaseEvent, UtilsImage) {
    
    'use strict';

    /**
    * @class widgets.brease.RadioButton
    * #Description
    * Enables the user to select a single option from a group of choices when paired with other RadioButtons. RadioButtons are combined in groups via the "data-brease-group" attribute.
    * @breaseNote 
    * @extends widgets.brease.ToggleButton

    * @aside example buttons

    * @iatMeta category:Category
    * Buttons
    * @iatMeta description:short
    * Optionsbutton
    * @iatMeta description:de
    * Ermöglicht es dem Benutzer, eine einzelne Option aus einer Gruppe von Optionen zu wählen, wenn diese mit anderen RadioButtons gepaart sind
    * @iatMeta description:en
    * Enables the user to select a single option from a group of choices when paired with other RadioButtons
    */

    /**
    * @cfg {ImagePath} image
    * @hide
    */

    /**
    * @cfg {ImagePath} mouseDownImage
    * @hide
    */

    /**
    * @method setMouseDownImage
    * @hide
    */

    /**
    * @cfg {Integer} boxSize=25
    * @iatStudioExposed
    * @iatCategory Appearance
    * Size of the radiobutton symbol
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
            height: 30,
            boxSize: 25,
            textAlign: 'left',
            imageAlign: 'left',
            checkedBoxImage: '',
            uncheckedBoxImage: '',
            disabledCheckedBoxImage: '',
            disabledUncheckedBoxImage: ''
        },

        WidgetClass = SuperClass.extend(function RadioButton() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        this.group = this.el.data('brease-group');
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseRadioButton');
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
    * @method setUseSVGStyling
    * Sets useSVGStyling
    * @param {Boolean} useSVGStyling
    */
    p.setUseSVGStyling = function (useSVGStyling) {
        SuperClass.prototype.setUseSVGStyling.apply(this, arguments);
        _updateElement(this);
    };

    /**
    * @method setImage 
    * Remove the setImage action from the ToggleButton
    */
    p.setImage = function () {};

    /**
    * @method removeImage 
    * Remove the removeImage action from the ToggleButton
    */
    p.removeImage = function () {};

    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;
        this.setClasses();
        _alignElement(this);
    };

    p.toggle = function (status, omitSubmit, omitGroupCheck, omitGroupSend) {
        //console.log('RadioButton[' + this.elem.id + '].toggle:', status, this.isChecked());
        var checkedBtn = $('[data-brease-group=' + this.group + '].checked'),
            newCheckedBtn,
            checkedId = checkedBtn.attr('id'),
            oldCheckedId = checkedBtn.attr('id');

        SuperClass.prototype.toggle.call(this, status, omitSubmit);
        if (omitGroupCheck !== true) {
            if (checkedBtn.length > 0 && checkedId !== this.elem.id && this.settings.value === SuperClass.values.checked) {
                brease.callWidget(checkedId, 'toggle', SuperClass.values.unchecked, false);
            }
        }
        newCheckedBtn = $('[data-brease-group=' + this.group + '].checked');
        checkedId = newCheckedBtn.attr('id');
        if (omitGroupSend !== true && checkedId !== oldCheckedId) {
            this.dispatchEvent(new CustomEvent(BreaseEvent.GROUP_CHANGE, { bubbles: true, cancelable: true, detail: { checkedId: newCheckedBtn.attr('id') } }));
        }
        _updateElement(this);
    };

    p.setEnable = function () {
        SuperClass.prototype.setEnable.apply(this, arguments);
        _updateElement(this);
    };

    /**
    * @method getCheckedId
    * Gets the id of the checked radio button of radio button group
    * @return {String}
    */
    p.getCheckedId = function () {
        var checkedBtn = $('[data-brease-group=' + this.group + '].checked');
        if (checkedBtn.length > 0) {
            return checkedBtn.attr('id');
        } else {
            return null;
        }
    };

    p._onButtonClick = function (e) {
        if (this.isChecked() === false) {
            SuperClass.prototype._onButtonClick.call(this, e);
        }
    };

    p.setClasses = function () {
        var imgClass;
        if (((this.imgEl !== undefined) || (this.radiobutton !== undefined) || (this.radiobutton !== undefined)) &&
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
    
    p._enableHandler = function () {
        SuperClass.prototype._enableHandler.apply(this, arguments);
        _updateElement(this);
    };

    //private functions

    function _setBoxSize(widget) {
        widget.imgEl.height(parseInt(widget.settings.boxSize, 10))
            .width(parseInt(widget.settings.boxSize, 10))
            .css('font-size', widget.settings.boxSize + 'px')
            .css('line-height', widget.settings.boxSize + 'px');
        widget.svgEl.height(parseInt(widget.settings.boxSize, 10))
            .width(parseInt(widget.settings.boxSize, 10))
            .css('font-size', widget.settings.boxSize + 'px')
            .css('line-height', widget.settings.boxSize + 'px');
        widget.radiobutton.height(parseInt(widget.settings.boxSize, 10))
            .width(parseInt(widget.settings.boxSize, 10))
            .css('font-size', widget.settings.boxSize + 'px')
            .css('line-height', widget.settings.boxSize + 'px');
    }

    function _updateElement(widget) {
        var checkedBoxImage = widget.getCheckedBoxImage(),
            uncheckedBoxImage = widget.getUncheckedBoxImage(),
            disabledCheckedBoxImage = widget.getDisabledCheckedBoxImage(),
            disabledUncheckedBoxImage = widget.getDisabledUncheckedBoxImage();

        if (widget.imageDeferred !== undefined) {
            if (widget.imageDeferred.state() === 'pending') {
                widget.imageDeferred.reject();
            }
        }

        if (widget.isEnabled()) {
            if (widget.getValue()) {
                widget.el.addClass('checked');
                setImageOrSvg(widget, checkedBoxImage);
            } else {
                widget.el.removeClass('checked');
                setImageOrSvg(widget, uncheckedBoxImage);
            }
        } else {
            if (widget.getValue()) {
                widget.el.addClass('checked');
                setImageOrSvg(widget, disabledCheckedBoxImage);
            } else {
                widget.el.removeClass('checked');
                setImageOrSvg(widget, disabledUncheckedBoxImage);
            }
        }
    }

    function setImageOrSvg(widget, src) {
        if (isDefinedImage(src)) {
            if (useSVGStyling(widget, src)) {
                widget.imageDeferred = UtilsImage.getInlineSvg(src);
                widget.imageDeferred.done(function (svgElement) {
                    widget._setSvgEl(svgElement);
                });
            } else {
                widget._setImgEl(src);
            }
        } else {
            widget._setRadioButton();
        }
    }

    function useSVGStyling(widget, src) {
        return UtilsImage.isStylable(src) && widget.settings.useSVGStyling;
    }

    function isDefinedImage(src) {
        return src !== undefined && src !== '';
    }
    
    p._setSvgEl = function (svgElement) {
        this.svgEl.replaceWith(svgElement);
        this.svgEl = svgElement;
        _setBoxSize(this);
        this.svgEl.show();
        this.imgEl.hide();
        this.radiobutton.hide();
    };

    p._setImgEl = function (image) {
        this.imgEl.attr('src', image);
        this.svgEl.hide();
        this.imgEl.show();
        this.radiobutton.hide();
    };

    p._setRadioButton = function () {
        this.svgEl.hide();
        this.imgEl.hide();
        this.radiobutton.show();
    };

    function _appendElements(widget) {
        widget.imgEl = $('<img/>').hide();
        widget.svgEl = $('<svg/>').hide();
        widget.radiobutton = $('<div class="radiobutton"></div>').hide();
        _alignElement(widget);
        _setBoxSize(widget);
    }

    function _alignElement(widget) {
        if (widget.radiobutton !== undefined && widget.imgEl !== undefined && widget.svgEl !== undefined) {
            if ((widget.settings.imageAlign === Enum.ImageAlign.left) || (widget.settings.imageAlign === Enum.ImageAlign.top)) {
                widget.el.prepend(widget.radiobutton);
                widget.el.prepend(widget.imgEl);
                widget.el.prepend(widget.svgEl);
            } else {
                widget.el.append(widget.radiobutton);
                widget.el.append(widget.imgEl);
                widget.el.append(widget.svgEl);
            }
        }
    }

    return WidgetClass;

});

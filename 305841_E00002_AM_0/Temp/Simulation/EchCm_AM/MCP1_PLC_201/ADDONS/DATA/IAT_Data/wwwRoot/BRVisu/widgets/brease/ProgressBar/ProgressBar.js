define([
    'brease/core/BaseWidget',
    'brease/enum/Enum',
    'widgets/brease/ProgressBar/libs/Config',
    'widgets/brease/common/libs/BoxLayout',
    'brease/datatype/Node',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'], 
function (SuperClass, Enum, Config, BoxLayout, Node, dragAndDropCapability) {
        
    'use strict';

    /**
    * @class widgets.brease.ProgressBar
    * #Despription
    * A single bar graphical element with an optional percentage text field.  
    *
    * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
    *  
    * @breaseNote 
    * @extends brease.core.BaseWidget
    
    * @iatMeta studio:license
    * licensed
    * @iatMeta category:Category
    * Numeric
    * @iatMeta category:IO
    * Output,Analog
    * @iatMeta category:Appliance
    * Graphic
    * @iatMeta category:Performance
    * Low,Medium,High
    * @iatMeta description:short
    * Balkenanzeige
    * @iatMeta description:de
    * Zeigt einen numerischen Wert als Balken an
    * @iatMeta description:en
    * Displays a numeric value as a bar
    */

    var defaultSettings = Config,

        WidgetClass = SuperClass.extend(function ProgressBar() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {

        // static HTML 
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseProgressBar');
        }

        this.data = {
            node: new Node(this.settings.value, null, this.settings.minValue, this.settings.maxValue)
        };

        _createBoxes(this);

        this.setShowLabel(this.settings.showLabel);
        this.setOrientation(this.settings.orientation);
        this.setStripedProgressBar(this.settings.stripedProgressBar);
        this.setBarAnimation(this.settings.barAnimation);
        this.setTransitionTime(this.settings.transitionTime);   

        //set dummy value in the editor if the value is 0
        if (brease.config.editMode === true && this.settings.value === 0) {
            this.setValue(65);
        } else {
            _updateBar(this);
        }

        SuperClass.prototype.init.call(this);
    };

    /**
    * @method setValue
    * @iatStudioExposed
    * set the actual value
    * @param {Number} value
    */
    p.setValue = function (value) {
        if (value !== undefined) {
            this.settings.value = parseFloat(value);
            this.data.node.setValue(this.settings.value);
        }
        _updateBar(this);
    };

    /**
    * @method getValue
    * get value
    * @return {Number}
    */
    p.getValue = function () {
        this.settings.value = this.data.node.getValue();
        return this.settings.value;
    };

    /**
    * @method setNode
    * Sets node
    * @param {brease.datatype.Node} node
    */
    p.setNode = function (node) {
        var oldNode = (this.data.node === undefined) ? {} : this.data.node;
        
        if (node.value !== undefined && node.value !== oldNode.value) {
            this.data.node.setValue(node.value);
        }
        if (node.minValue !== undefined && node.minValue !== oldNode.minValue) {
            this.data.node.setMinValue(node.minValue);
        }
        if (node.maxValue !== undefined && node.maxValue !== oldNode.maxValue) {
            this.data.node.setMaxValue(node.maxValue);
        }
        if (node.unit !== undefined && node.unit !== oldNode.unit) {
            this.data.node.setUnit(node.unit);
        }

        _updateBar(this);
    };

    /**
    * @method getNode 
    * Returns node.
    * @return {brease.datatype.Node}
    */
    p.getNode = function () {
        return this.data.node;
    };

    /**
     * @method setMinValue
     * @iatStudioExposed
     * sets the mininum value of the ProgressBar number range
     * @param {Number} value
     */
    p.setMinValue = function (value) {
        if (value !== undefined) {
            this.data.node.setMinValue(value);
            this.settings.minValue = value;
        }
        _updateBar(this);
    };

    /**
     * @method getMinValue 
     * Returns minValue.
     * @return {Number}
     */
    p.getMinValue = function () {
        this.settings.minValue = this.data.node.getMinValue();
        return this.settings.minValue;
    };

    /**
     * @method setMaxValue
     * @iatStudioExposed
     * sets the maximum value of the ProgressBar number range
     * @param {Number} value
     */
    p.setMaxValue = function (value) {
        if (value !== undefined) {
            this.data.node.setMaxValue(value);
            this.settings.maxValue = value;
        }
        _updateBar(this);
    };

    /**
     * @method getMaxValue 
     * Returns maxValue.
     * @return {Number}
     */
    p.getMaxValue = function () {
        this.settings.maxValue = this.data.node.getMaxValue();
        return this.settings.maxValue;
    };

    /**
     * @method setOrientation
     * Set the orientation of the widget
     * @param {brease.enum.Orientation} orientation
     */
    p.setOrientation = function (orientation) {
        this.settings.orientation = orientation;
        _setProgressBarOrientation(this);
    };

    /**
    * @method getOrientation
    * Returns the orientation of the widget.
    * @return {brease.enum.Orientation}
    */
    p.getOrientation = function () {
        return this.settings.orientation;
    };

    /**
     * @method setShowLabel
     * Sets the visibility of the text output field
     * @param {Boolean} value
     */
    p.setShowLabel = function (value) {
        if (value !== undefined) {

            if (typeof (value) === 'string') {
                value = (value === 'true');
            }
            this.settings.showLabel = value;

            //call helper method
            _configureShowLabel(this);
            _updateLabelSize(this, this.settings.labelSize);
        }
    };

    /**
     * @method getShowLabel
     * Returns the status of the text output field of the widget
     * @return {Boolean}
     */
    p.getShowLabel = function () {
        return this.settings.showLabel;
    };

    /**
    * @method setLabelPosition
    * Configures the position of the percentage text field.
    * @param {brease.enum.Position} labelPosition
    */
    p.setLabelPosition = function (labelPosition) {
        this.settings.labelPosition = labelPosition;
        _validateLabelPosition(this);
        _setLabelPosition(this);
    };

    /**
     * @method getLabelPosition
     * Returns the configured position of the percentage text field.
     * @return {brease.enum.Position}
     */
    p.getLabelPosition = function () {
        return this.settings.labelPosition;
    };

    /**
    * @method setStripedProgressBar
    * Configures striped styling for progress bar.
    * @param {Boolean} value
    */
    p.setStripedProgressBar = function (value) {
        if (value !== undefined) {
            if (typeof (value) === 'string') {
                value = (value === 'true');
            }
            this.settings.stripedProgressBar = value;
            _configureStripes(this);
        }
    };

    /**
     * @method getStripedProgressBar
     * Returns whether striped progress bar has been configured.
     * @return {Boolean}
     */
    p.getStripedProgressBar = function () {
        return this.settings.stripedProgressBar;
    };

    /**
    * @method setBarAnimation
    * Configured the animation function of the progress bar.
    * @param {Boolean} value
    */
    p.setBarAnimation = function (value) {
        if (value !== undefined) {
            if (typeof (value) === 'string') {
                value = (value === 'true');
            }
            this.settings.barAnimation = value;
            _configureAnimation(this);
        }
    };

    /**
     * @method getBarAnimation
     * Returns status of the bar animation option.
     * @return {Boolean}
     */
    p.getBarAnimation = function () {
        return this.settings.barAnimation;
    };

    /**
     * @method setTransitionTime
     * Configure the animation time span for new values of the ProgressBar
     * @param {UInteger} value
     */
    p.setTransitionTime = function (value) {
        if (value !== undefined) {
            this.settings.transitionTime = value;
            _configureTransition(this);
        }
    };

    /**
     * @method getTransitionTime
     * Returns configured transition/animation time for new values
     * @return {UInteger}
     */
    p.getTransitionTime = function () {
        return this.settings.transitionTime;
    };

    /**
     * @method setLabelSize 
     * Sets labelSize.
     * @param {Size} value The labelSize value to be set
     */
    p.setLabelSize = function (value) {
        this.settings.labelSize = value;
        _updateLabelSize(this, value);
    };

    /**
    * @method getLabelSize 
    * Returns labelSize.
    * @return {Size} Current labelSize value
    */
    p.getLabelSize = function () {
        return this.settings.labelSize;
    };

    /**
     * @event MaxValueReached
     * @iatStudioExposed
     * Fired once when maximum value is reached.
     * @param {Boolean} value 
     * value reflects the state of the "value" property >= maxValue. 
     */
    p._maxValueReachedHandler = function (val) {
        var ev = this.createEvent('MaxValueReached', { value: val });
        if (ev) {
            ev.dispatch();
        }
    };

    /**
     * @event MinValueReached
     * @iatStudioExposed
     * Fired once when minimum value is reached.
     * @param {Boolean} value 
     * value reflects the state of the "value" property <= minValue. 
     */
    p._minValueReachedHandler = function (val) {
        var ev = this.createEvent('MinValueReached', { value: val });
        if (ev) {
            ev.dispatch();
        }
    };

    p.dispose = function () {
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    // PRIVATE

    function _createBoxes(widget) {

        // Create boxes
        widget.pbBoxContainer = BoxLayout.createBoxContainer();
        widget.pbBoxContainer.classList.add('pb-outer-area');

        widget.pbProgressBarBox = BoxLayout.createBox();
        widget.pbProgressBarBox.classList.add('pb-progress-box');

        widget.pbProgressBarDiv = $('<div/>')
            .addClass('pb-bar-container');
        widget.pbProgressBar = $('<div/>')
            .addClass('pb-progress');

        widget.pbLabelBox = BoxLayout.createBox();
        widget.pbLabelBox.classList.add('pb-label-box');

        widget.pbLabelDiv = $('<div/>')
            .addClass('pb-label');
        widget.pbLabelText = $('<span/>')
            .addClass('pb-label-text');

        // Add items to boxes
        widget.pbProgressBarDiv.append(widget.pbProgressBar);
        widget.pbLabelDiv.append(widget.pbLabelText);
        widget.pbProgressBarBox.appendChild(widget.pbProgressBarDiv.get(0));
        widget.pbLabelBox.appendChild(widget.pbLabelDiv.get(0));
        widget.pbBoxContainer.appendChild(widget.pbProgressBarBox);
        widget.pbBoxContainer.appendChild(widget.pbLabelBox);

        // Add items to widget
        widget.elem.appendChild(widget.pbBoxContainer);
    }

    // Calculates the percentage "position" of the ProgressBar, based on supplied value, minValue and maxValue
    function _valueToPosition(node) {

        var barValue,
            opValue,
            range;

        if (node.minValue !== undefined && node.maxValue !== undefined) {

            range = node.maxValue - node.minValue;

            if (range !== 0 && range !== undefined) {

                if (node.value < node.minValue) {
                    opValue = 0;
                } else if (node.value > node.maxValue) {
                    opValue = range;
                } else {
                    opValue = node.value - node.minValue;
                }
                barValue = Math.round((opValue / range * 100));
            } else { // if minValue = maxValue --> keep bar at zero
                barValue = 0;
            }
        } else {
            barValue = 50.9;
        }
        return (barValue);
    }

    // updates bar values
    function _updateBar(widget) {
        var barValue = _valueToPosition(widget.data.node);

        widget.pbProgressBar.css(widget.controlProperty, barValue + '%')
            .css(widget.fillProperty, '100%');

        widget.pbLabelText.text(barValue + '%');

        if (barValue === 100) {
            widget._maxValueReachedHandler(true);
        } else if (barValue === 0) {
            widget._minValueReachedHandler(true);
        }
    }

    // configures class for showLabel property
    function _configureShowLabel(widget) {
        if (widget.settings.showLabel === false) {
            widget.pbLabelBox.classList.add('pb-no-text');
        } else {
            widget.pbLabelBox.classList.remove('pb-no-text');
        }
    }

    function _setProgressBarOrientation(widget) {
        widget.pbProgressBarDiv.removeClass('bottom-to-top');
        widget.pbProgressBarDiv.removeClass('left-to-right');
        widget.pbProgressBarDiv.removeClass('right-to-left');
        widget.pbProgressBarDiv.removeClass('top-to-bottom');

        switch (_getProgressBarOrientationEnum(widget, widget.settings.orientation)) {
            case Enum.Orientation.BTT:
                widget.controlProperty = 'height';
                widget.fillProperty = 'width';
                widget.pbProgressBarDiv.addClass('bottom-to-top');
                break;
            case Enum.Orientation.LTR:
                widget.controlProperty = 'width';
                widget.fillProperty = 'height';
                widget.pbProgressBarDiv.addClass('left-to-right');
                break;
            case Enum.Orientation.RTL:
                widget.controlProperty = 'width';
                widget.fillProperty = 'height';
                widget.pbProgressBarDiv.addClass('right-to-left');
                break;
            case Enum.Orientation.TTB:
                widget.controlProperty = 'height';
                widget.fillProperty = 'width';
                widget.pbProgressBarDiv.addClass('top-to-bottom');
                break;
        }

        widget.setLabelPosition(widget.settings.labelPosition);
        _configureStripes(widget);
        _configureAnimation(widget);
        _updateBar(widget);
    }

    function _validateLabelPosition(widget) {
        var orientation = _getProgressBarOrientationEnum(widget, widget.settings.orientation);
        var labelPosition = _getLabelPositionEnum(widget, widget.settings.labelPosition);
        switch (orientation) {
            case Enum.Orientation.RTL:
            case Enum.Orientation.LTR:
                if (labelPosition === Enum.Position.top ||
                    labelPosition === Enum.Position.bottom) {
                    widget.settings.labelPosition = Enum.Position.right;
                }
                break;
            case Enum.Orientation.TTB:
            case Enum.Orientation.BTT:
                if (labelPosition === Enum.Position.right ||
                    labelPosition === Enum.Position.left) {
                    widget.settings.labelPosition = Enum.Position.bottom;
                }
                break;
        }
    }

    function _setLabelPosition(widget) {
        widget.pbBoxContainer.classList.remove('pb-orientation-vertical');
        widget.pbBoxContainer.classList.remove('pb-orientation-horizontal');
        widget.pbLabelBox.classList.remove('pb-text-center');

        switch (_getLabelPositionEnum(widget, widget.settings.labelPosition)) {
            case Enum.Position.right:
                BoxLayout.setOrientation(widget.pbBoxContainer, Enum.Orientation.LTR);
                widget.pbBoxContainer.classList.add('pb-orientation-horizontal');
                break;
            case Enum.Position.top:
                BoxLayout.setOrientation(widget.pbBoxContainer, Enum.Orientation.BTT);
                widget.pbBoxContainer.classList.add('pb-orientation-vertical');
                break;
            case Enum.Position.bottom:
                BoxLayout.setOrientation(widget.pbBoxContainer, Enum.Orientation.TTB);
                widget.pbBoxContainer.classList.add('pb-orientation-vertical');
                break;
            case Enum.Position.left:
                BoxLayout.setOrientation(widget.pbBoxContainer, Enum.Orientation.RTL);
                widget.pbBoxContainer.classList.add('pb-orientation-horizontal');
                break;
            case Enum.Position.center:
            case Enum.Position.middle:
                widget.pbLabelBox.classList.add('pb-text-center');
                break;
        }
    }

    function _configureStripes(widget) {
        widget.pbProgressBar.removeClass('pb-progress-stripes');
        widget.pbProgressBar.removeClass('pb-progress-stripes-v');

        if (widget.settings.stripedProgressBar === true) {
            switch (_getProgressBarOrientationEnum(widget, widget.settings.orientation)) {
                case Enum.Orientation.BTT:
                case Enum.Orientation.RTL:
                    widget.pbProgressBar.addClass('pb-progress-stripes-v');
                    break;
                case Enum.Orientation.TTB:
                case Enum.Orientation.LTR:
                    widget.pbProgressBar.addClass('pb-progress-stripes');
                    break;
            }
        }
    }

    function _configureAnimation(widget) {
        widget.pbProgressBar.removeClass('pb-stripe-animation');
        widget.pbProgressBar.removeClass('pb-stripe-animation-r');
        widget.pbProgressBar.removeClass('pb-stripe-animation-vt');
        widget.pbProgressBar.removeClass('pb-stripe-animation-vb');

        if (widget.settings.barAnimation === true) {
            switch (_getProgressBarOrientationEnum(widget, widget.settings.orientation)) {
                case Enum.Orientation.BTT:
                    widget.pbProgressBar.addClass('pb-stripe-animation-vb');
                    break;
                case Enum.Orientation.RTL:
                    widget.pbProgressBar.addClass('pb-stripe-animation-r');
                    break;
                case Enum.Orientation.TTB:
                    widget.pbProgressBar.addClass('pb-stripe-animation-vt');
                    break;
                case Enum.Orientation.LTR:
                    widget.pbProgressBar.addClass('pb-stripe-animation');
                    break;
            }
        }
    }

    function _configureTransition(widget) {
        var cssTransition = 'width ' + widget.settings.transitionTime + 'ms, height ' + widget.settings.transitionTime + 'ms';
        
        widget.pbProgressBar.css('transition', cssTransition)
            .css('-webkit-transition', cssTransition);
    }

    function _getLabelPositionEnum(widget, position) {
        switch (position) {
            case 4:
            case Enum.Position.right:
            case 'Right':
                return Enum.Position.right;
            case 5:
            case Enum.Position.top:
            case 'Top':
                return Enum.Position.top;
            case 0:
            case Enum.Position.bottom:
            case 'Bottom':
                return Enum.Position.bottom;
            case 2:
            case Enum.Position.left:
            case 'Left':
                return Enum.Position.left;
            case 1:
            case 3:
            case Enum.Position.center:
            case Enum.Position.middle:
            case 'Center':
            case 'Middle':
                return Enum.Position.center;
        }
    }

    function _getProgressBarOrientationEnum(widget, orientation) {
        switch (orientation) {
            case 'BottomToTop':
            case 0:
            case 'BTT':
                return Enum.Orientation.BTT;
            case 'LeftToRight':
            case 1:
            case 'LTR':
                return Enum.Orientation.LTR;
            case 'RightToLeft':
            case 2:
            case 'RTL':
                return Enum.Orientation.RTL;
            case 'TopToBottom':
            case 3:
            case 'TTB':
                return Enum.Orientation.TTB;
        }
    }

    function _updateLabelSize(widget, value) {
        if (!widget.settings.showLabel) {
            _resetLabelSize(widget);
            return;
        }

        _setLabelSizeValue(widget, value);
        _correctLabelSize(widget);
    }

    function _setLabelSizeValue(widget, value) {
        if (value !== undefined && value !== '') {
            if (!isNaN(value)) {
                value = value + 'px';
            } else if (value.endsWith('%')) {
                // Set input width according to 100% - [unit width]
                var percentValue = value.substring(0, value.length - 1);
                if (!isNaN(percentValue)) {
                    var inputValue = 100 - parseFloat(percentValue);
                    if (inputValue < 0) {
                        inputValue = 0;
                    }
                    widget.pbProgressBarBox.style.width = inputValue + '%';
                }
            }
            widget.pbLabelBox.style.flex = '0 0 ' + value;
        }
    }

    function _resetLabelSize(widget) {
        widget.pbProgressBarBox.style.width = '100%';
        widget.pbLabelBox.style.flex = '';
    }

    function _correctLabelSize(widget) {
        if (widget.settings.labelPosition !== Enum.ImageAlign.top &&
            widget.settings.labelPosition !== Enum.ImageAlign.bottom) {
            // AG Because Of backwards compatibility, set width to "auto" if content is bigger then defined value in LabelSize property
            if (widget.state === Enum.WidgetState.READY) {
                if (widget.pbLabelBox.offsetWidth < widget.pbLabelText.get(0).offsetWidth) {
                    widget.pbLabelBox.style.flex = '0 0 auto';
                }
            }
        } else {
            _resetLabelSize(widget);
        }
    }

    return dragAndDropCapability.decorate(WidgetClass, false);

});

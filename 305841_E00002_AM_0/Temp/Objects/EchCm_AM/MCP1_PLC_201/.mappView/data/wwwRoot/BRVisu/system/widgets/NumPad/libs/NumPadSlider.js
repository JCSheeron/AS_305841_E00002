define(['brease/events/BreaseEvent',
    'brease/core/Utils',
    'brease/core/Types',
    'brease/enum/EnumObject',
    'brease/events/EventDispatcher',
    'libs/d3/d3'
],
function (BreaseEvent, Utils, Types, EnumObject, EventDispatcher, d3) {

    'use strict';

    var NumPadSlider = function (sliderEl) {
        this.el = sliderEl;
        this.init();
    };

    NumPadSlider.TRACKCLICKBEHAVIOR = new EnumObject({
        changeValueByInterval: 'changeValueByInterval',
        changeValueToClickPoint: 'changeValueToClickPoint'
    });

    NumPadSlider.createInstances = function (widgetEl) {
        var elements = [],
            sliderEl = widgetEl.find('.breaseNumpadSlider');
        if (sliderEl.length > 0) {
            sliderEl.each(function () {
                elements.push(new NumPadSlider($(this)));
            });
        }
        return elements;
    };

    NumPadSlider.defaultSettings = {
        numberFormat: { decimalPlaces: 1 },
        tickPadding: 12, // padding between ticks and numbers
        axisHeight: 50, // height of svg axis for ticks and numbers
        axisPadding: 30, // padding left and right of axis to draw numbers outside the axis range
        thumbHeight: 62,
        trackPadding: 5, // increases the click area of the track (track is bigger than visible area)
        arrowHeight: 6,
        arrowMargin: 3,
        boxHeight: 42
    };

    NumPadSlider.elementOptions = {
        thumbSize: {
            type: 'UInteger', // datatype in xml is StrictPixelVal
            default: 22
        },
        trackSize: {
            type: 'UInteger', // datatype in xml is StrictPixelVal
            default: 6
        },
        // nr of major ticks between start and end 
        majorTicks: {
            type: 'UInteger',
            default: 5
        },
        // nr of minor ticks between two major ticks
        minorTicks: {
            type: 'UInteger',
            default: 0
        },
        showTicks: {
            type: 'Boolean',
            default: false
        },
        showTickNumbers: {
            type: 'Boolean',
            default: false
        },
        showValueDisplay: {
            type: 'Boolean',
            default: true
        },
        trackClickBehavior: {
            type: 'Enum',
            default: NumPadSlider.TRACKCLICKBEHAVIOR.changeValueByInterval,
            enum: NumPadSlider.TRACKCLICKBEHAVIOR
        }
    };
    for (var key in NumPadSlider.elementOptions) {
        NumPadSlider.defaultSettings[key] = NumPadSlider.elementOptions[key].default;
    }

    NumPadSlider.prototype = new EventDispatcher();

    NumPadSlider.prototype.init = function () {
        this.settings = $.extend({}, NumPadSlider.defaultSettings, getElementOptions(this.el));
        addElements.call(this);
        this.settings.width = this.track.outerWidth();
        this.settings.zoomFactor = getZoomFactor.call(this);
        if (this.settings.showTicks === true || this.settings.showTickNumbers === true) {
            addTickAxis.call(this);
        }
        addListeners.call(this);
    };

    NumPadSlider.prototype.dispose = function () {
        this.el = undefined;
        if (this.thumb) {
            this.thumb.off();
            this.thumb = undefined;
        }
        if (this.track) {
            this.track.off();
            this.track = undefined;
        }
        this.outputVal = undefined;
    };

    /**
        * @method getLimit
        * calculate values for major ticks formatted for the current numberFormat
        * @param {Number} value
        * @param {Number} minValue
        * @param {Number} maxValue
        * @return {Number}
        */
    NumPadSlider.prototype.getLimit = function (value, minValue, maxValue) {
        if (isNaN(value) || value === null) {
            return value;
        }
        if (value < minValue) {
            value = minValue;
        }

        if (value > maxValue) {
            value = maxValue;
        }
        return value - 0;
    };

    NumPadSlider.prototype.update = function () {
        this.settings.zoomFactor = getZoomFactor.call(this);
        this.updateTickAxis();
    };

    NumPadSlider.prototype.updateTickAxis = function () {

        var nrOfMajorTicks = this.getNrOfMajorTicks(),
            nrOfMinorTicks = this.getNrOfMinorTicks(nrOfMajorTicks, this.settings.minorTicks),
            config = {
                minValue: this.settings.minValue,
                maxValue: this.settings.maxValue,
                numberFormat: this.settings.numberFormat,
                useDigitGrouping: this.settings.useDigitGrouping,
                separators: this.settings.separators
            },
            majorTickValues = this.calcMajorTickValues($.extend(config, { ticks: nrOfMajorTicks })),
            minorTickValues = this.calcMinorTickValues($.extend(config, { ticks: nrOfMinorTicks }));

        minorTickValues = minorTickValues.filter(function (item) {
            return !majorTickValues.includes(item);
        });

        // add minor ticks before major ticks to allow major to overlay minor (deprecated, as no minorTicks are drawn on place of majorTicks any more)
        addMinorTickAxis.call(this, minorTickValues, config);
        addMajorTickAxis.call(this, majorTickValues, config);
    };

    /**
        * @method calcMajorTickValues
        * calculate values for major ticks formatted for the current numberFormat
        * @param {Object} config
        * @param {Integer} config.ticks number of ticks
        * @param {Number} config.minValue
        * @param {Number} config.maxValue
        * @param {brease.config.NumberFormat} config.numberFormat
        * @param {Boolean} config.useDigitGrouping
        * @param {Object} config.separators
        * @param {String} config.separators.dsp
        * @param {String} config.separators.gsp
        * @return {Number[]}
        */
    NumPadSlider.prototype.calcMajorTickValues = function (config) {
        if (!validOptions(config) || config.ticks < 2) {
            return [];
        }
        var steps = (config.maxValue - config.minValue) / (config.ticks - 1),
            tickValues = [];

        for (var i = 0; i < config.ticks; i += 1) {
            tickValues[i] = _calcTickValue(config.minValue + i * steps, config);
        }
        return tickValues;
    };

    /**
        * @method calcMinorTickValues
        * calculate values for minor ticks 
        * @param {Object} config
        * @param {Number} config.minValue
        * @param {Number} config.maxValue
        * @param {Integer} config.ticks number of ticks
        * @return {Number[]} 
        */
    NumPadSlider.prototype.calcMinorTickValues = function (config) {
        if (config.ticks === 0) {
            return [];
        }
        if (config.ticks === 1) {
            return [0];
        }
        var steps = (config.maxValue - config.minValue) / (config.ticks - 1),
            tickValues = [];
        for (var i = 0; i < config.ticks; i += 1) {
            tickValues[i] = _calcTickValue(config.minValue + i * steps, config);
        }
        return tickValues;
    };

    function _calcTickValue(nr, config) {
        var formatted = brease.formatter.formatNumber(nr, config.numberFormat, config.useDigitGrouping, config.separators),
            value = brease.formatter.parseFloat(formatted, config.separators);
        return value;
    }

    NumPadSlider.prototype.setConfig = function (config) {
        for (var key in config) {
            this.settings[key] = config[key];
        }
    };

    NumPadSlider.prototype.setValue = function (value, dispatch) {
        if (value !== undefined) {
            this.value = value;
            if (this.value !== null) {

                var val = Math.round(value / this.settings.smallChange) * this.settings.smallChange,
                    pos;

                val = this.getLimit(val, this.settings.minValue, this.settings.maxValue);
                pos = valToPos.call(this, val);

                if (val >= this.settings.minValue && val <= this.settings.maxValue) {
                    this.value = val;
                    setPosition.call(this, pos);
                    if (dispatch === true) {
                        this.dispatchEvent({ type: 'ValueChanged', detail: { value: this.value } });
                    }
                }
            }
        }
    };

    NumPadSlider.prototype.setValueAsString = function (str) {
        if (this.outputVal) {
            this.outputVal.text(str);
        }
    };

    NumPadSlider.prototype.setError = function (error) {
        if (this.outputVal) {
            this.outputVal.toggleClass('error', error);
        }
    };

    /**
        * @method getNrOfMinorTicks
        * calculate number of minor ticks 
        * @param {Integer} nrOfMajorTicks total number of majorTicks including start and end tick
        * @param {Integer} minorTicks number of minorTicks as configured = number of ticks between two major ticks
        * @return {Integer} 
        */
    NumPadSlider.prototype.getNrOfMinorTicks = function (nrOfMajorTicks, minorTicks) {
        if (nrOfMajorTicks < 2 || minorTicks < 0) {
            return 0;
        } else {
            return 1 + (nrOfMajorTicks - 1) * (minorTicks + 1);
        }
    };
    
    NumPadSlider.prototype.getNrOfMajorTicks = function () {
        return this.settings.majorTicks + 2;
    };

    function addTickAxis() {

        this.axisElement = d3.select(this.el.get(0))
            .append('svg')
            .attr('class', 'axisElement')
            .attr('width', this.settings.width + 2 * this.settings.axisPadding)
            .attr('height', this.settings.axisHeight)
            .attr('transform', 'translate(-' + this.settings.axisPadding + ',' + (-this.settings.axisHeight + this.settings.trackPadding + this.settings.trackSize) + ')');

        this.tickAxisClasses = {
            major: 'majorTickAxis' + ((this.settings.showTicks === true) ? ' showTicks' : '') + ((this.settings.showTickNumbers === true) ? ' showTickNumbers' : ''),
            minor: 'minorTickAxis' + ((this.settings.showTicks === true) ? ' showTicks' : '')
        };
    }

    function addMajorTickAxis(majorTickValues, config) {
        if (this.settings.showTicks === true || this.settings.showTickNumbers === true) {

            this.axisScale = d3.scale.linear()
                .domain([config.minValue, config.maxValue])
                .range([0, this.settings.width]);

            this.majorTickAxis = d3.svg.axis()
                .scale(this.axisScale)
                .tickValues(majorTickValues)
                .innerTickSize(this.settings.trackSize)
                .tickPadding(this.settings.tickPadding)
                .tickFormat(d3.format('.' + this.settings.numberFormat.decimalPlaces + 'f'))
                .orient('top');

            // if axis already exists -> only draw the new values
            if (this.axisElement.select('.majorTickAxis')[0][0] !== null) {
                this.axisElement.select('.majorTickAxis')
                    .call(this.majorTickAxis);
            } else {
                this.axisElement.append('g')
                    .attr('class', this.tickAxisClasses.major)
                    .attr('transform', 'translate(' + this.settings.axisPadding + ',' + this.settings.axisHeight + ')')
                    .call(this.majorTickAxis);
            }
        }
    }

    function addMinorTickAxis(minorTickValues, config) {

        if (this.settings.showTicks === true && this.settings.minorTicks > 0) {
            var axisScale = d3.scale.linear()
                .domain([config.minValue, config.maxValue])
                .range([0, this.settings.width]);

            this.minorTickAxis = d3.svg.axis()
                .scale(axisScale)
                .tickValues(minorTickValues)
                .innerTickSize(this.settings.trackSize)
                .tickPadding(this.settings.tickPadding)
                .tickFormat('') // this hides values
                .orient('top');

            // if axis already exists -> only draw the new values
            if (this.axisElement.select('.minorTickAxis')[0][0] !== null) {
                this.axisElement.select('.minorTickAxis')
                    .call(this.minorTickAxis);
            } else {
                this.axisElement.append('g')
                    .attr('class', this.tickAxisClasses.minor)
                    .attr('transform', 'translate(' + this.settings.axisPadding + ',' + this.settings.axisHeight + ')')
                    .call(this.minorTickAxis);
            }
        }
    }

    function readAttr(optionName, $el, option) {
        var attrValue = $el[0].dataset[optionName.toLowerCase()];
        if (attrValue !== undefined) {
            if (option.type === 'UInteger') {
                return Types.parseValue(attrValue, 'Integer', { min: 0, default: option.default });
            } else if (option.type === 'Integer') {
                return Types.parseValue(attrValue, 'Integer', { default: option.default });
            } else if (option.type === 'Boolean') {
                if (['true', 'false'].indexOf(attrValue) !== -1) {
                    return attrValue === 'true';
                } else {
                    return option.default;
                }
            } else if (option.type === 'String') {
                return attrValue;
            } else if (option.type === 'Enum') {
                return Types.parseValue(attrValue, 'Enum', { Enum: option.enum, default: option.default });
            }
        } else {
            return option.default;
        }
    }
    /*
        * @method to read options from DOM element
        */
    function getElementOptions($el) {
        var options = {};
        for (var optionName in NumPadSlider.elementOptions) {
            options[optionName] = readAttr(optionName, $el, NumPadSlider.elementOptions[optionName]);
        }
        return options;
    }

    function addElements() {

        var config = this.settings,
            defaults = NumPadSlider.defaultSettings,
            thumbHeight = defaults.thumbHeight + (config.thumbSize - defaults.thumbSize) / 2,
            trackInnerHeight = config.trackSize,
            trackHeight = trackInnerHeight + 2 * defaults.trackPadding,
            knobBottom = -(config.thumbSize / 2),
            thumbTop = -(defaults.boxHeight + defaults.arrowHeight + defaults.arrowMargin + config.thumbSize / 2 - defaults.trackPadding - config.trackSize / 2);

        var thumbDOM = '<div class="numpadSlider_thumb" style="height:' + thumbHeight + 'px;top:' + thumbTop + 'px;"><div class="numpadSlider_knob" style="bottom:' + knobBottom + 'px;width:' + config.thumbSize + 'px;height:' + config.thumbSize + 'px;"></div>';
        if (this.settings.showValueDisplay) {
            thumbDOM += '<div class="numpadSlider_output"><span></span></div>';
        }
        thumbDOM += '</div>';
        this.thumb = $(thumbDOM)
            .appendTo(this.el);
        this.track = $('<div class="numpadSlider_track" style="height:' + trackHeight + 'px;"><div class="numpadSlider_track_inner" style="height:' + trackInnerHeight + 'px;"></div></div>')
            .appendTo(this.el);
        if (this.settings.showValueDisplay) {
            this.outputVal = this.el.find('.numpadSlider_output span');
        }
    }

    function addListeners() {
        this.thumb.on(BreaseEvent.MOUSE_DOWN, onMouseDown.bind(this));
        this.track.on(BreaseEvent.CLICK, trackClickHandler.bind(this));
        this.bound_onMouseMove = onMouseMove.bind(this);
        this.bound_onMouseUp = onMouseUp.bind(this);
    }

    function validOptions(options) {
        if (isNaN(options.minValue) || isNaN(options.maxValue) || isNaN(options.ticks)) {
            return false;
        }
        if (options.minValue > options.maxValue) {
            return false;
        }
        if (!Number.isInteger(options.ticks)) {
            return false;
        }
        return true;
    }

    function moveSlider(e) {
        var pageX = Utils.getOffsetOfEvent(e).x,
            pos = pageX - this.trackOffset * this.settings.zoomFactor,
            val = posToVal.call(this, pos);

        this.setValue(val, true);
    }

    function calcTrackOffset() {
        this.trackOffset = this.track.offset().left;
    }

    function onMouseDown() {
        this.mouseMove = true;
        calcTrackOffset.call(this);

        brease.bodyEl.on(BreaseEvent.MOUSE_MOVE, this.bound_onMouseMove);
        brease.bodyEl.on(BreaseEvent.MOUSE_UP, this.bound_onMouseUp);
    }

    function onMouseMove(e) {
        moveSlider.call(this, e);
    }

    function onMouseUp(e) {
        this.mouseMove = false;
        brease.bodyEl.off(BreaseEvent.MOUSE_MOVE);
        brease.bodyEl.off(BreaseEvent.MOUSE_UP);
        moveSlider.call(this, e);
    }

    function getZoomFactor() { // A&P 451830: Slider in Numpad not usable when zoomed
        var zoomFactor = brease.bodyEl.css('zoom');
        if (zoomFactor === undefined || zoomFactor === 'normal' || zoomFactor === 'auto') {
            return 1;
        } else {
            return parseFloat(zoomFactor);
        }
    }

    function trackClickHandler(e) {
        var value = this.value,
            newValue;

        if (!this.mouseMove) {
            if (this.settings.trackClickBehavior === NumPadSlider.TRACKCLICKBEHAVIOR.changeValueToClickPoint) {
                newValue = posToVal.call(this, e.offsetX);
            } else {
                var offset = calcOffset.call(this, e);
                newValue = calcStep.call(this, offset, value);
                newValue = this.getLimit(newValue, this.settings.minValue, this.settings.maxValue);
            }
            this.setValue(newValue, true);
        }
        this.mouseMove = false;
    }

    function calcOffset(e) {
        var thumbOffsetX = this.thumb.offset().left,
            eventOffsetX = Utils.getOffsetOfEvent(e).x / this.settings.zoomFactor;

        return eventOffsetX - thumbOffsetX;
    }

    function calcStep(offset, value) {
        var val = value;

        if (offset > 0) {
            val = value + this.settings.largeChange;
        } else if (offset < 0) {
            val = value - this.settings.largeChange;
        }

        return val;
    }

    function posToVal(pos) {
        var nenner = (this.settings.width * this.settings.zoomFactor),
            val = (pos * (this.settings.maxValue / nenner - this.settings.minValue / nenner)) + this.settings.minValue;

        return this.getLimit(val, this.settings.minValue, this.settings.maxValue);
    }

    function valToPos(val) {
        var pos;
        val = this.getLimit(val, this.settings.minValue, this.settings.maxValue);

        if (this.settings.maxValue === -this.settings.minValue) {

            pos = (((this.settings.width / this.settings.maxValue) / 2) * val) - rangeToPixels.call(this, this.settings.minValue);
        } else {

            pos = ((this.settings.width * val) / (this.settings.maxValue - this.settings.minValue)) - rangeToPixels.call(this, this.settings.minValue);
        }
        return pos;
    }

    function rangeToPixels(range) {
        var px;
        if (this.settings.maxValue === -this.settings.minValue) {

            px = ((range / 2) / this.settings.maxValue) * this.settings.width;
        } else {

            px = (range * this.settings.width) / (this.settings.maxValue - this.settings.minValue);
        }
        return px;
    }

    function setPosition(pos) {
        this.thumb.css('left', pos + 'px');
    }

    return NumPadSlider;

});

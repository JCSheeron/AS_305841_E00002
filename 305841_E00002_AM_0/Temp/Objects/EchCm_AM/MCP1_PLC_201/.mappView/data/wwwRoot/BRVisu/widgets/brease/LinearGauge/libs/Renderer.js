define([
    'brease/core/Class',
    'libs/d3/d3',
    'brease/enum/Enum'
], function (SuperClass, d3, Enum) {

    'use strict';

    var Renderer = SuperClass.extend(function Renderer(widget) {
            SuperClass.call(this);
            this.widget = widget;
            this.initialize();
        }, null),

        p = Renderer.prototype;

    p.initialize = function () {
        this._createSVG(this);
        this.drawUnitLabel(this);
        this.drawAxis(this);
        this.drawAreas(this);
        this.drawPointer(this);
        // A&P 720665: needed to draw the unit label first (before drawing the "axis"), then reposition it with the updateUnitLabel method
        this.updateUnitLabel(); 
    };

    p.redraw = function () {
        this.removeUnitLabel();
        this.drawUnitLabel();
        this.removeAxis();
        this.drawAxis();
        this.removeAreas();
        this.drawAreas();
        this.removePointer();
        this.drawPointer();
        // A&P 720665: needed to draw the unit label first (before drawing the "axis"), then reposition it with the updateUnitLabel method
        this.updateUnitLabel();
    };

    p.drawAxis = function () {
        this._calculateAxisConfiguration();
        this._calculateTicks();
        this.scale = d3.scale.linear()
            .domain([this.axisConfiguration.startValue, this.axisConfiguration.endValue])
            .range([this.axisConfiguration.startRange, this.axisConfiguration.endRange]);
        this.axisMinorTick = d3.svg.axis()
            .scale(this.scale)
            .tickValues(this.tickConfiguration.minorTick)
            .orient(this.axisConfiguration.orientation);
        this.axisMinorTickElement = this.scaleContainer.append('g')
            .attr('class', 'axisMinorTicks')
            .attr('transform', 'translate(' + this.axisConfiguration.offsetX + ',' + this.axisConfiguration.offsetY + ')')
            .call(this.axisMinorTick);
        this.axis = d3.svg.axis()
            .scale(this.scale)
            .tickValues(this.tickConfiguration.majorTick)
            .tickFormat(d3.format(this.tickConfiguration.format))
            .orient(this.axisConfiguration.orientation);
        this.axisElement = this.scaleContainer.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + this.axisConfiguration.offsetX + ',' + this.axisConfiguration.offsetY + ')')
            .call(this.axis);
    };

    p.removeAxis = function () {
        if (this.axisElement !== undefined) {
            this.axisElement.remove();
        }
        if (this.axisMinorTickElement !== undefined) {
            this.axisMinorTickElement.remove();
        }

    };

    p.drawAreas = function () {
        this._calculateAreas();
        this.areas = this.scaleContainer.selectAll('rect')
            .data(this.areaData)
            .enter()
            .append('rect')
            .attr('class', function (d) { return 'scaleArea' + d.scaleNumber; })
            .attr('x', function (d) { return d.x; })
            .attr('y', function (d) { return d.y; })
            .attr('width', function (d) { return d.width; })
            .attr('height', function (d) { return d.height; });
    };

    p.removeAreas = function () {
        if (this.areas !== undefined) {
            this.areas.remove();
        }
    };

    p.drawPointer = function () {
        var renderer = this;
        if (this.widget.getShowPointer()) {
            this._calculatePointerConfiguration();
            this.pointerShape = d3.svg.symbol().type('triangle-down')
                .size(function (d) { return (renderer.pointerConfiguration.size * renderer.pointerConfiguration.size) / 2; });
            this.pointer = this.scaleContainer.append('path')
                .attr('d', this.pointerShape)
                .attr('class', 'pointer')
                .attr('transform', 'translate(' + this.pointerConfiguration.offsetX + ',' + this.pointerConfiguration.offsetY + ') rotate(' + this.pointerConfiguration.rotation + ')');
        }
    };

    p.removePointer = function () {
        if (this.pointer !== undefined) {
            this.pointer.remove();
        }
    };

    p.updatePointer = function () {
        if (this.widget.getShowPointer()) {
            this._calculatePointerConfiguration();
            this.pointer.transition()
                .attr('transform', 'translate(' + this.pointerConfiguration.offsetX + ',' + this.pointerConfiguration.offsetY + ') rotate(' + this.pointerConfiguration.rotation + ')')
                .each('end', function () { // added to dedect transiton end in order to stabilize the property test
                    this.dispatchEvent(new CustomEvent('linearGaugeUpdatePointerTransitionEnded'));         
                });
        }
    };

    p.drawUnitLabel = function () {
        if (this.widget.getShowUnit()) {
            this.unitLabel = this.scaleContainer.append('text')
                .attr('class', 'unit');
        }
    };

    p.removeUnitLabel = function () {
        if (this.unitLabel !== undefined) {
            this.unitLabel.remove();
        }
    };

    p.updateUnitLabel = function () {
        if (this.widget.getShowUnit()) {
            this._calculateUnitLabelConfiguration();
            this.unitLabel.text(this.widget.settings.unitSymbol)
                .attr('transform', 'translate(' + this.unitLabelConfiguration.positionX + ',' + this.unitLabelConfiguration.positionY + ') rotate(' + this.unitLabelConfiguration.rotation + ')')
                .style('text-anchor', this.unitLabelConfiguration.textAnchor)
                .style('alignment-baseline', this.unitLabelConfiguration.baseLine);
        }
    };

    p.getInnerWidth = function () {
        return this.widget.settings.width;
    };

    p.getInnerHeight = function () {
        return this.widget.settings.height;
    };

    p._rangeMajorTicks = function (min, majorTicks, majorTickRange) {
        var i, arrayOfTicks = [];

        for (i = 0; i < majorTicks + 2; i = i + 1) {
            arrayOfTicks.push(min);
            min = min + majorTickRange;
        }
        return arrayOfTicks;
    };

    p._rangeMinorTicks = function (min, minorTicks, majorTicks, minorTickRange) {
        var i, totalTicks, arrayOfTicks = [];

        totalTicks = minorTicks * (majorTicks + 1) + majorTicks + 2;

        for (i = 0; i < totalTicks; i = i + 1) {
            arrayOfTicks.push(min);
            min = min + minorTickRange;
        }
        return arrayOfTicks;
    };

    p._calculateAxisConfiguration = function () {
        this.axisConfiguration = {};

        var scalePadding = this.widget.getScalePadding(),
            axisPadding = this.widget.getAxisPadding(),
            scalePaddingOutterHorizontal,
            scalePaddingOutterVertical,
            unitFontSizeOffset = this._getUnitFontSizeOffset();
            
        if (axisPadding === 0) {
            scalePaddingOutterHorizontal = 35;
            scalePaddingOutterVertical = 75;
        } else {
            scalePaddingOutterHorizontal = 0;
            scalePaddingOutterVertical = 0;
        }

        if (this.widget.settings.orientation === Enum.Orientation.LTR || this.widget.settings.orientation === Enum.Orientation.RTL) {
            this.axisConfiguration.orientation = 'bottom';
            this.axisConfiguration.startRange = scalePadding;
            this.axisConfiguration.endRange = this.getInnerWidth() - scalePadding;
            this.axisConfiguration.offsetX = 0;
            this.axisConfiguration.offsetY = this.getInnerHeight() - scalePaddingOutterHorizontal - axisPadding;
        } else {
            this.axisConfiguration.orientation = 'left';
            this.axisConfiguration.startRange = scalePadding;
            this.axisConfiguration.endRange = this.getInnerHeight() - scalePadding - unitFontSizeOffset;
            this.axisConfiguration.offsetX = scalePaddingOutterVertical + axisPadding;
            this.axisConfiguration.offsetY = unitFontSizeOffset;
        }

        if (this.widget.settings.orientation === Enum.Orientation.LTR || this.widget.settings.orientation === Enum.Orientation.TTB) {
            this.axisConfiguration.startValue = this.widget.getMinValue();
            this.axisConfiguration.endValue = this.widget.getMaxValue();
        } else {
            this.axisConfiguration.startValue = this.widget.getMaxValue();
            this.axisConfiguration.endValue = this.widget.getMinValue();
        }
    };

    //Private functions

    p._createSVG = function () {
        this.scaleContainer = d3.select(this.widget.el.get(0))
            .append('svg')
            .attr('class', 'scaleContainer');
    };

    p._calculateUnitLabelConfiguration = function () {
        var scalePaddingOutterHorizontal = 5,
            scaleFontSizeOffset = this._getScaleFontSizeOffset();

        this.unitLabelConfiguration = {};

        if (this.widget.settings.orientation === Enum.Orientation.LTR || this.widget.settings.orientation === Enum.Orientation.RTL) {
            this.unitLabelConfiguration.positionX = this.axisConfiguration.offsetX + this.getInnerWidth() / 2;
            this.unitLabelConfiguration.positionY = this.axisConfiguration.offsetY + scalePaddingOutterHorizontal + scaleFontSizeOffset;
            this.unitLabelConfiguration.textAnchor = 'middle';
        } else {
            this.unitLabelConfiguration.positionX = this.axisConfiguration.offsetX;
            this.unitLabelConfiguration.positionY = this.widget.getScalePadding() - 15;
            this.unitLabelConfiguration.textAnchor = 'end';
        }
        this.unitLabelConfiguration.baseLine = 'hanging';
        this.unitLabelConfiguration.rotation = 0;
    };

    p._calculatePointerConfiguration = function () {
        var unitFontSizeOffset = this._getUnitFontSizeOffset();
        this.pointerConfiguration = { size: this.widget.getPointerSize() };
        if (this.widget.settings.orientation === Enum.Orientation.LTR || this.widget.settings.orientation === Enum.Orientation.RTL) {
            this.pointerConfiguration.offsetX = this.scale(this.widget.getSaturatedValue());
            this.pointerConfiguration.offsetY = this.axisConfiguration.offsetY - this.pointerConfiguration.size / 2 - this.widget.getPointerPadding();
            this.pointerConfiguration.rotation = 0;
        } else {
            this.pointerConfiguration.offsetX = this.axisConfiguration.offsetX + this.pointerConfiguration.size / 2 + this.widget.getPointerPadding();
            this.pointerConfiguration.offsetY = this.scale(this.widget.getSaturatedValue()) + unitFontSizeOffset;
            this.pointerConfiguration.rotation = 90;
        }
    };

    p._calculateTicks = function () {
        this.tickConfiguration = {};

        var majorTick = parseInt(this.widget.getMajorTicks(), 10), minorTick = parseInt(this.widget.getMinorTicks(), 10),
            minValue = this.widget.getMinValue(), maxValue = this.widget.getMaxValue(),
            totalRange = maxValue - minValue,
            majorTickRange = totalRange / (majorTick + 1),
            minorTickRange = majorTickRange / (minorTick + 1);

        this.tickConfiguration.majorTick = this._rangeMajorTicks(minValue, majorTick, majorTickRange);
        this.tickConfiguration.minorTick = this._rangeMinorTicks(minValue, minorTick, majorTick, minorTickRange);
        if (_.last(this.tickConfiguration.majorTick) > maxValue + majorTickRange) {
            this.tickConfiguration.majorTick = _.initial(this.tickConfiguration.majorTick);
        }
        if (_.last(this.tickConfiguration.minorTick) > maxValue + minorTickRange) {
            this.tickConfiguration.minorTick = _.initial(this.tickConfiguration.minorTick);
        }

        var format = this.widget.getCurrentFormat(),
            decimalComa = format.decimalPlaces === 0 || format.decimalPlaces === undefined ? 0 : 1,
            decimalPlaces = format.decimalPlaces === undefined ? 0 : format.decimalPlaces,
            minimumIntegerDigits = format.minimumIntegerDigits === undefined ? 0 : format.minimumIntegerDigits,
            width = minimumIntegerDigits + decimalComa + decimalPlaces;
        this.tickConfiguration.format = '#0' + width + '.' + decimalPlaces + 'f';

    };

    p._calculateAreas = function () {
        var i, numberOfScales = 5,
            areaHeight = this.widget.getAreasSize(),
            marginArea = this.widget.getAreasPadding(),
            scales = this.widget.getScalesAreas(),
            unitFontSizeOffset = this._getUnitFontSizeOffset();
        this.areaData = [];
        for (i = 0; i < numberOfScales; i = i + 1) {
            var tempObject = {};
            tempObject.scaleNumber = i + 1;

            if (this.widget.settings.orientation === Enum.Orientation.LTR) {
                tempObject.y = this.axisConfiguration.offsetY - areaHeight - marginArea;
                tempObject.height = areaHeight;
                tempObject.x = this.scale(scales[i]);
                tempObject.width = this.scale(scales[i + 1]) - this.scale(scales[i]);
                tempObject.width = tempObject.width > 0 ? tempObject.width : 0;

            } else if (this.widget.settings.orientation === Enum.Orientation.RTL) {
                tempObject.y = this.axisConfiguration.offsetY - areaHeight - marginArea;
                tempObject.height = areaHeight;
                tempObject.width = this.scale(scales[i]) - this.scale(scales[i + 1]);
                tempObject.width = tempObject.width > 0 ? tempObject.width : 0;
                tempObject.x = this.scale(scales[i]) - tempObject.width;

            } else if (this.widget.settings.orientation === Enum.Orientation.TTB) {
                tempObject.x = this.axisConfiguration.offsetX + marginArea;
                tempObject.width = areaHeight;
                tempObject.y = this.scale(scales[i]) + unitFontSizeOffset;
                tempObject.height = this.scale(scales[i + 1]) - this.scale(scales[i]);
                tempObject.height = tempObject.height > 0 ? tempObject.height : 0;

            } else if (this.widget.settings.orientation === Enum.Orientation.BTT) {
                tempObject.x = this.axisConfiguration.offsetX + marginArea;
                tempObject.width = areaHeight;
                tempObject.height = this.scale(scales[i]) - this.scale(scales[i + 1]);
                tempObject.height = tempObject.height > 0 ? tempObject.height : 0;
                tempObject.y = this.scale(scales[i]) - tempObject.height + unitFontSizeOffset;
            }

            this.areaData.push(tempObject);
        }
    };

    p._getUnitFontSizeOffset = function () {
        var unitText,
            unitFontSizeOffset = 0;

        if (this.widget.getShowUnit()) {
            unitText = this.widget.el.find('.unit')[0];

            if (unitText !== undefined) {
                unitFontSizeOffset = parseInt(window.getComputedStyle(unitText, null).getPropertyValue('font-size'), 10);
            }
        }

        return unitFontSizeOffset;
    };

    p._getScaleFontSizeOffset = function () {
        var scaleText = this.widget.el.find('.axis').find('.tick').last().children('text')[0],
            scaleTextOffset = 0;

        if (scaleText !== undefined) {
            scaleTextOffset = parseInt(window.getComputedStyle(scaleText, null).getPropertyValue('font-size'), 10);
        }

        return scaleTextOffset;
    };

    return Renderer;

});

define([
    'libs/d3/d3', 
    'widgets/brease/common/libs/redux/utils/UtilsNumeric', 
    'brease/enum/Enum'
], function (d3, UtilsNumeric, Enum) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.utils.UtilsAxis
     * The Module should be used for creating / appending / updating SVG - Axis
     */

    var UtilsAxis = {};

    /**
     * @method createSVGContainer
     * creates the SVG Container.
     * @param {HTMLElement} elem HTMLElement where the SVG-Container should be appended
     * @param {Integer} height height of the SVG-Container
     * @param {Integer} width width of the SVG-Container
     * @return {HTMLElement} svgContainer
     */
    UtilsAxis.createSVGContainer = function (elem, height, width) {
        var svgContainer = d3.select(elem).append('svg').attr('height', height).attr('width', width).attr('class', 'Axis');
        return svgContainer;
    };

    /**
     * @method createAxisTop
     * creates the Axis with Orientation Top
     * @param {Object} scale scale-object of d3
     * @param {Number} limitMin minimumValue for Axis
     * @param {Number} limitMax maximumValue for Axis
     * @param {UInteger} majorTicks amount of Ticks to be shown 
     * @param {brease.config.MeasurementSystemFormat} format will be used to create correct amount of DecimalPlaces
     * @return {HTMLElement} axis
     */
    UtilsAxis.createAxisTop = function (scale, limitMin, limitMax, majorTicks, format) {
        var tickValues = _calculateValues(limitMin, limitMax, majorTicks),
            axis = d3.svg.axis()
                .orient('top')
                .tickValues(tickValues)
                .tickFormat(d3.format(',.' + UtilsNumeric.getDecimalPlaces(format) + 'f'))
                .scale(scale);
        return axis;
    };

    /**
     * @method createAxisRight
     * creates the Axis with Orientation Right
     * @param {Object} scale scale-object of d3
     * @param {Number} limitMin minimumValue for Axis
     * @param {Number} limitMax maximumValue for Axis
     * @param {UInteger} majorTicks amount of Ticks to be shown 
     * @param {brease.config.MeasurementSystemFormat} format will be used to create correct amount of DecimalPlaces
     * @return {HTMLElement} axis
     */
    UtilsAxis.createAxisRight = function (scale, limitMin, limitMax, majorTicks, format) {
        var tickValues = _calculateValues(limitMin, limitMax, majorTicks),
            axis = d3.svg.axis()
                .orient('right')
                .tickValues(tickValues)
                .tickFormat(d3.format(',.' + UtilsNumeric.getDecimalPlaces(format) + 'f'))
                .scale(scale);
        return axis;
    };

    /**
     * @method createAxisBottom
     * creates the Axis with Orientation Bottom
     * @param {Object} scale scale-object of d3
     * @param {Number} limitMin minimumValue for Axis
     * @param {Number} limitMax maximumValue for Axis
     * @param {UInteger} majorTicks amount of Ticks to be shown 
     * @param {brease.config.MeasurementSystemFormat} format will be used to create correct amount of DecimalPlaces
     * @return {HTMLElement} axis
     */
    UtilsAxis.createAxisBottom = function (scale, limitMin, limitMax, majorTicks, format) {
        var tickValues = _calculateValues(limitMin, limitMax, majorTicks),
            axis = d3.svg.axis()
                .orient('bottom')
                .tickValues(tickValues)
                .tickFormat(d3.format(',.' + UtilsNumeric.getDecimalPlaces(format) + 'f'))
                .scale(scale);
        return axis;
    };

    /**
     * @method createAxisLeft
     * creates the Axis with Orientation Left
     * @param {Object} scale scale-object of d3
     * @param {Number} limitMin minimumValue for Axis
     * @param {Number} limitMax maximumValue for Axis
     * @param {UInteger} majorTicks amount of Ticks to be shown 
     * @param {brease.config.MeasurementSystemFormat} format will be used to create correct amount of DecimalPlaces
     * @return {HTMLElement} axis
     */
    UtilsAxis.createAxisLeft = function (scale, limitMin, limitMax, majorTicks, format) {
        var tickValues = _calculateValues(limitMin, limitMax, majorTicks),
            axis = d3.svg.axis()
                .orient('left')
                .tickValues(tickValues)
                .tickFormat(d3.format(',.' + UtilsNumeric.getDecimalPlaces(format) + 'f'))
                .scale(scale);
        return axis;
    };

    /**
     * @method appendAxisHorizontal
     * appends the Axis on horizontal position
     * @param {HTMLElement} svgContainer Reference to SVG-Element where the Axis should be appended
     * @param {Object} axis (used for .call(axis))
     * @param {Integer} offset offset-parameter for horizontal offset
     */
    UtilsAxis.appendAxisHorizontal = function (svgContainer, axis, offset) {
        svgContainer.append('g')
            .attr('transform', 'translate(0,' + offset + ')')
            .call(axis);
    };

    /**
     * @method appendAxisVertical
     * appends the Axis on vertical position
     * @param {HTMLElement} svgContainer Reference to SVG-Element where the Axis should be appended
     * @param {Object} axis (used for .call(axis))
     * @param {Integer} offset offset-parameter for vertical offset
     */
    UtilsAxis.appendAxisVertical = function (svgContainer, axis, offset) {
        svgContainer.append('g')
            .attr('transform', 'translate(' + offset + ',0)')
            .call(axis);
    };

    /**
     * @method showTickNumber
     * shows / hiddes all Numbers from Ticks of given SVG-Container
     * <b>ATTENTION: the selector is: selectAll('g.tick text')!</b>
     * @param {HTMLElement} svgContainer SVG-Container of Elements where the TickNumbers should be shown/hidden
     * @param {Boolean} showTickNumbers if true the Numbers will be shown
     */
    UtilsAxis.showTickNumber = function (svgContainer, showTickNumbers) {
        //if true, show Numbers
        
        if (showTickNumbers) {
            svgContainer.selectAll('g.tick text').classed('remove', false);
        } else {
            svgContainer.selectAll('g.tick text').classed('remove', true);
        }
    };

    /**
     * @method showUnitSymbol
     * shows / hiddes all unitSymbols of given SVG-Container
     * <b>ATTENTION: the selector is: selectAll('text.UnitSymbol')!</b>
     * @param {HTMLElement} svgContainer SVG-Container of Elements where the unit-Symbol should be shown/hidden
     * @param {Boolean} showUnitSymbols if true the symbols will be shown
     */
    UtilsAxis.showUnitSymbol = function (svgContainer, showUnitSymbols) {
        //if true, show UnitSymbol
        if (showUnitSymbols) {
            svgContainer.selectAll('text.UnitSymbol').classed('remove', false);
        } else {
            svgContainer.selectAll('text.UnitSymbol').classed('remove', true);
        }
    };

    /**
     * @method createCombinedAxis
     * creates an Scale and Axis and appends it to parent
     * @param {Object} configObject structure with all necessary information to create an Axis
     * @param {HTMLElement} configObject.elem HTMLElement where the Axis should be added
     * @param {UInteger} configObject.height height of Axis-Container
     * @param {UInteger} configObject.width width of Axis-Container
     * @param {brease.enum.TickStyle} configObject.tickPosition position of the Ticks
     * @param {brease.enum.Orientation} configObject.orientation Orientation of the Widget
     * @param {Object} configObject.scale scale for the Axis
     * @param {Number} configObject.limitMin minimumLimit for Axis
     * @param {Number} configObject.limitMax maximumLimit for Axis
     * @param {UInteger} configObject.majorTicks amount of Ticks to be shown on Axis
     * @param {brease.config.MeasurementSystemFormat} configObject.format format which should be applied to tickNumbers
     * @param {Boolean} configObject.showTickNumbers defines if the Ticknumbers will be shown
     * @param {Boolean} configObject.showUnitSymbol defines if the UnitSymbol should be shown
     * @param {Integer} configObject.scaleOffset defines the offset from the Center
     *
     */
    UtilsAxis.createCombinedAxis = function (configObject) {
        //1. create SVG
        var svgContainer = this.createSVGContainer(configObject.elem, configObject.height, configObject.width, configObject.additionalClasses);

        //2. Check which Axis should be created
        switch (configObject.orientation) {
            case Enum.Orientation.LTR:
            case Enum.Orientation.RTL:
                //3. Create Axis with scale and selected format
                this.createCombinedAxisHorizontal(configObject, svgContainer);
                break;
            case Enum.Orientation.BTT:
            case Enum.Orientation.TTB:
                //3. Create Axis with scale and selected format
                this.createCombinedAxisVertical(configObject, svgContainer);
                break;
        }

        this.showTickNumber(svgContainer, configObject.showTickNumbers);

        return svgContainer;
    };

    /**
     * @method updateCombinedAxis
     * updates the given Scale and Axis
     * @param {Object} configObject structure with all necessary information to create an Axis
     * @param {HTMLElement} configObject.elem HTMLElement where the Axis should be added
     * @param {UInteger} configObject.height height of Axis-Container
     * @param {UInteger} configObject.width width of Axis-Container
     * @param {brease.enum.TickStyle} configObject.tickPosition position of the Ticks
     * @param {brease.enum.Orientation} configObject.orientation Orientation of the Widget
     * @param {Object} configObject.scale scale for the Axis
     * @param {Number} configObject.limitMin minimumLimit for Axis
     * @param {Number} configObject.limitMax maximumLimit for Axis
     * @param {UInteger} configObject.majorTicks amount of Ticks to be shown on Axis
     * @param {brease.config.MeasurementSystemFormat} configObject.format format which should be applied to tickNumbers
     * @param {Boolean} configObject.showTickNumbers defines if the Ticknumbers will be shown
     * @param {Boolean} configObject.showUnitSymbol defines if the UnitSymbol should be shown
     * @param {Integer} configObject.scaleOffset defines the offset from the Center
     *
     */
    UtilsAxis.updateCombinedAxis = function (configObject) {
        var svgContainer = d3.select(configObject.elem).select('svg').attr('height', configObject.height).attr('width', configObject.width);
        svgContainer.selectAll('g').remove();
        //2. Check which Axis should be created
        switch (configObject.orientation) {
            case Enum.Orientation.LTR:
            case Enum.Orientation.RTL:
                //3. Create Axis with scale and selected format
                this.createCombinedAxisHorizontal(configObject, svgContainer);
                break;
            case Enum.Orientation.BTT:
            case Enum.Orientation.TTB:
                //3. Create Axis with scale and selected format
                this.createCombinedAxisVertical(configObject, svgContainer);
                break;
        }

        this.showTickNumber(svgContainer, configObject.showTickNumbers);

        return svgContainer;
    };

    /**
     * @method createCombinedAxisHorizontal
     * creates the Scale and the Axis for Horizontal
     * @param {Object} configObject structure with all necessary information to create an Axis
     * @param {HTMLElement} configObject.elem HTMLElement where the Axis should be added
     * @param {UInteger} configObject.height height of Axis-Container
     * @param {UInteger} configObject.width width of Axis-Container
     * @param {brease.enum.TickStyle} configObject.tickPosition position of the Ticks
     * @param {brease.enum.Orientation} configObject.orientation Orientation of the Widget
     * @param {Object} configObject.scale scale for the Axis
     * @param {Number} configObject.limitMin minimumLimit for Axis
     * @param {Number} configObject.limitMax maximumLimit for Axis
     * @param {UInteger} configObject.majorTicks amount of Ticks to be shown on Axis
     * @param {brease.config.MeasurementSystemFormat} configObject.format format which should be applied to tickNumbers
     * @param {Boolean} configObject.showTickNumbers defines if the Ticknumbers will be shown
     * @param {Boolean} configObject.showUnitSymbol defines if the UnitSymbol should be shown
     * @param {Integer} configObject.scaleOffset defines the offset from the Center
     *
     * @param {HTMLElement} svgContainer jQuery selection of Container where the Axis should be appended
     */
    UtilsAxis.createCombinedAxisHorizontal = function (configObject, svgContainer) {
        var axis;
        switch (configObject.tickPosition) {
            case Enum.TickStyle.NONE:
                //no appending of axis needed.
                break;
            case Enum.TickStyle.TOP:
                //1. create AxisTop
                axis = this.createAxisTop(configObject.scale, configObject.limitMin, configObject.limitMax, configObject.majorTicks, configObject.format);
                //1. append axis on position
                this.appendAxisHorizontal(svgContainer, axis, (configObject.height / 2) - configObject.scaleOffset);
                break;
            case Enum.TickStyle.BOTTOM:
                //1. create AxisBottom
                axis = this.createAxisBottom(configObject.scale, configObject.limitMin, configObject.limitMax, configObject.majorTicks, configObject.format);
                //2. Append Axis on Position
                this.appendAxisHorizontal(svgContainer, axis, (configObject.height / 2) + configObject.scaleOffset);
                break;
            case Enum.TickStyle.TOPBOTTOM:
                //1. create AxisTop
                axis = this.createAxisTop(configObject.scale, configObject.limitMin, configObject.limitMax, configObject.majorTicks, configObject.format);
                //2. Append Axis on Position
                this.appendAxisHorizontal(svgContainer, axis, (configObject.height / 2) - configObject.scaleOffset);
                //3. create AxisBottom
                axis = this.createAxisBottom(configObject.scale, configObject.limitMin, configObject.limitMax, configObject.majorTicks, configObject.format);
                //4. Append Axis on Position
                this.appendAxisHorizontal(svgContainer, axis, (configObject.height / 2) + configObject.scaleOffset);
                break;
        }
    };

    /**
     * @method createCombinedAxisVertical
     * creates the Scale and the Axis for Vertical
     * @param {Object} configObject structure with all necessary information to create an Axis
     * @param {HTMLElement} configObject.elem HTMLElement where the Axis should be added
     * @param {UInteger} configObject.height height of Axis-Container
     * @param {UInteger} configObject.width width of Axis-Container
     * @param {brease.enum.TickStyle} configObject.tickPosition position of the Ticks
     * @param {brease.enum.Orientation} configObject.orientation Orientation of the Widget
     * @param {Object} configObject.scale scale for the Axis
     * @param {Number} configObject.limitMin minimumLimit for Axis
     * @param {Number} configObject.limitMax maximumLimit for Axis
     * @param {UInteger} configObject.majorTicks amount of Ticks to be shown on Axis
     * @param {brease.config.MeasurementSystemFormat} configObject.format format which should be applied to tickNumbers
     * @param {Boolean} configObject.showTickNumbers defines if the Ticknumbers will be shown
     * @param {Boolean} configObject.showUnitSymbol defines if the UnitSymbol should be shown
     * @param {Integer} configObject.scaleOffset defines the offset from the Center
     *
     * @param {HTMLElement} svgContainer jQuery selection of Container where the Axis should be appended
     */
    UtilsAxis.createCombinedAxisVertical = function (configObject, svgContainer) {
        var axis;
        switch (configObject.tickPosition) {
            case Enum.TickStyle.NONE:
                //no appending of axis needed.
                break;
            case Enum.TickStyle.TOP:
                //1. create AxisLeft
                axis = this.createAxisLeft(configObject.scale, configObject.limitMin, configObject.limitMax, configObject.majorTicks, configObject.format);
                //2. Append Axis on Position
                this.appendAxisVertical(svgContainer, axis, (configObject.width / 2) - configObject.scaleOffset);
                break;
            case Enum.TickStyle.BOTTOM:
                //1. create AxisRight
                axis = this.createAxisRight(configObject.scale, configObject.limitMin, configObject.limitMax, configObject.majorTicks, configObject.format);
                //2. Append Axis on Position
                this.appendAxisVertical(svgContainer, axis, (configObject.width / 2) + configObject.scaleOffset);
                break;
            case Enum.TickStyle.TOPBOTTOM:
                //1. create AxisLeft
                axis = this.createAxisLeft(configObject.scale, configObject.limitMin, configObject.limitMax, configObject.majorTicks, configObject.format);
                //2. Append Axis on Position
                this.appendAxisVertical(svgContainer, axis, (configObject.width / 2) - configObject.scaleOffset);
                //3. create AxisRight
                axis = this.createAxisRight(configObject.scale, configObject.limitMin, configObject.limitMax, configObject.majorTicks, configObject.format);
                //4. Append Axis on Position
                this.appendAxisVertical(svgContainer, axis, (configObject.width / 2) + configObject.scaleOffset);
                break;
        }
    };

    function _calculateValues(limitMin, limitMax, majorTicks) {
        var values = [];
        var range = limitMax - limitMin;

        if (majorTicks === 0) {
            values = [];
        } else if (majorTicks === 1) {
            values = [(range / 2) + limitMin];
        } else {
            var factor = range / (majorTicks - 1);
            for (var i = 0; i < majorTicks; i += 1) {
                values.push((limitMin) + ((factor) * i));
            }
        }

        return values;
    }

    return UtilsAxis;
});

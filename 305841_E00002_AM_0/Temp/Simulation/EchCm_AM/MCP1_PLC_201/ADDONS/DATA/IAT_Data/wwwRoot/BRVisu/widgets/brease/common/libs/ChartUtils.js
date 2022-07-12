define([
    'libs/d3/d3'
], function (d3) {

    'use strict';

    var ChartUtils = {};

    function _parseInt(stringValue, defaultValue) {
        var result = parseInt(stringValue, 10);
        if (isNaN(result)) {
            return defaultValue;
        }
        return result;
    }

    ChartUtils.rotateTickLabels = function (tickTextSelection, axisPosition, distance, rotation) {

        var rotationInteger = _parseInt(rotation, 0),
            distanceInteger = _parseInt(distance, 0),
            rotationInteger90 = sawtoothInt(rotationInteger, 180, 180, 0.5, 90),
            distanceAttribute = '',
            rotationString = '',
            deltaY;

        if (axisPosition === 'top') {
            distanceAttribute = 'y';
            distanceInteger = -distanceInteger;
            deltaY = (rotationInteger90 === -90) ? '0.3em' : '0em';
            rotationString = 'rotate(' + rotationInteger90 + ', 0, ' + distanceInteger + ')';
        } else if (axisPosition === 'bottom') {
            distanceAttribute = 'y';
            deltaY = (rotationInteger90 === -90) ? '0.3em' : '0.7em';
            rotationString = 'rotate(' + rotationInteger90 + ', 0, ' + distanceInteger + ')';
        } else if (axisPosition === 'right') {
            distanceAttribute = 'x';
            deltaY = (rotationInteger90 === -90) ? '0.7em' : '0.3em';
            rotationString = 'rotate(' + rotationInteger90 + ', ' + distanceInteger + ', 0)';
        } else {
            distanceAttribute = 'x';
            deltaY = (rotationInteger90 === -90) ? '-0.3em' : '0.3em';
            distanceInteger = -distanceInteger;
            rotationString = 'rotate(' + rotationInteger90 + ', ' + distanceInteger + ', 0)';
        }

        tickTextSelection
            .attr(distanceAttribute, distanceInteger)
            .attr('dy', deltaY)
            .attr('transform', rotationString)
            .style('text-anchor', getTickLabelAnchor(rotationInteger90, axisPosition));
    };

    ChartUtils.getNumberOfTickLabel = function (tickLabelSVGs, axisData) {
        var rotationInteger90 = sawtoothInt(_parseInt(axisData.info.tickLabelRotation, 0), 180, 180, 0.5, 90),
            absRotationInteger90rad = Math.abs(rotationInteger90 * Math.PI / 180),
            tickLabelAnchor = getTickLabelAnchor(rotationInteger90, axisData.info.position),
            label2LabelDistance = 10, // value in px
            labelSizes = tickLabelSVGs.map(function (tickLabelElem) {
                var tickLabelElemBBox = tickLabelElem.getBBox();
                return { width: tickLabelElemBBox.width, height: tickLabelElemBBox.height };
            }),
            labelWidth = Math.max.apply(null, labelSizes.map(function (labelSize) { return labelSize.width; })),
            labelHeight = Math.max.apply(null, labelSizes.map(function (labelSize) { return labelSize.height; })),
            tickLabelStep = labelWidth + label2LabelDistance,
            numberOfTickLabel;

        if (tickLabelAnchor === 'middle') {
            numberOfTickLabel = Math.floor(axisData.width / tickLabelStep);
        } else {
            tickLabelStep = Math.min((labelHeight + label2LabelDistance / 2) / Math.sin(absRotationInteger90rad), labelWidth * Math.cos(absRotationInteger90rad));
            tickLabelStep = Math.max(tickLabelStep, labelHeight + label2LabelDistance / 2);

            numberOfTickLabel = Math.floor(axisData.width / tickLabelStep);
        }

        return numberOfTickLabel;
    };

    ChartUtils.getTickLabelValues = function (axisDomain, numberOfTickLabel, axisType) {

        // always at least 1 label
        if (numberOfTickLabel < 0) {
            console.error('ChartUtils.getTickLabelValues: numberOfTickLabel must be >= 0');
            return;
        }

        numberOfTickLabel = numberOfTickLabel || 1;

        var step = this._getTickLabelStep(axisDomain, numberOfTickLabel, axisType),
            roundedDomain = getRoundedDomain(axisDomain, step),
            tickLabelValues;

        switch (axisType) {
            case 'dateTime':
                tickLabelValues = d3.range(roundedDomain[0], roundedDomain[1], step)
                    .map(function (tickLabelValueMillisecond) {
                        return new Date(tickLabelValueMillisecond);
                    });
                break;
            case 'index':
            case 'secondsAsNumber':
                tickLabelValues = d3.range(roundedDomain[0], roundedDomain[1], step);
                break;
            default:
                tickLabelValues = [0, 1];
        }

        return tickLabelValues;
    };

    ChartUtils.getMultiLine = function (tickLabelSelection, axisPosition) {
        var tickLabelMultiLine = tickLabelSelection;

        if (tickLabelMultiLine.length > 0 && tickLabelMultiLine[0].length > 0 && tickLabelMultiLine[0][0]) {
            var arrayMultiLine = tickLabelMultiLine[0][0].innerHTML.split('\n'),
                i, j;

            if (arrayMultiLine.length > 1) {
                if (axisPosition === 'bottom') {

                    for (j = 0; j < tickLabelMultiLine[0].length; j = j + 1) {
                        d3.select(tickLabelMultiLine[0][j]).append('tspan')
                            .text($(tickLabelMultiLine[0][j])[0].firstChild.data.split('\n')[0]);

                        for (i = 1; i < arrayMultiLine.length; i = i + 1) {
                            d3.select(tickLabelMultiLine[0][j]).append('tspan')
                                .text($(tickLabelMultiLine[0][j])[0].firstChild.data.split('\n')[i])
                                .attr('position', 'relative')
                                .attr('x', '0')
                                .attr('dy', 1 + 'em');
                        }
                        $(tickLabelMultiLine[0][j])[0].firstChild.data = '';
                    }
                } else if (axisPosition === 'top') {

                    for (j = 0; j < tickLabelMultiLine[0].length; j = j + 1) {
                        d3.select(tickLabelMultiLine[0][j]).append('tspan')
                            .text($(tickLabelMultiLine[0][j])[0].firstChild.data.split('\n')[arrayMultiLine.length - 1]);

                        for (i = arrayMultiLine.length - 2; i > -1; i = i - 1) {
                            d3.select(tickLabelMultiLine[0][j]).append('tspan')
                                .text($(tickLabelMultiLine[0][j])[0].firstChild.data.split('\n')[i])
                                .attr('position', 'relative')
                                .attr('x', '0')
                                .attr('dy', -1 + 'em');
                        }
                        $(tickLabelMultiLine[0][j])[0].firstChild.data = '';
                    }
                }
            } 
        }
        return tickLabelMultiLine;
    };

    ChartUtils._binarySearchSuccessor = function (array, target) {

        if (!array.length) {
            return -1;
        }

        if (array[array.length - 1] < target) {
            return array.length - 1;
        }

        var low = 0,
            high = array.length - 1,
            mid;

        while (low !== high) {
            mid = (low + high) >>> 1;

            if (array[mid] === target) {
                return mid;
            } else if (array[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        if (low === 0 && (array[low] < target)) {
            return -1;
        }

        return low;
    };

    ChartUtils._getTickLabelStep = function (axisDomain, numberOfTickLabel, axisType) {

        switch (axisType) {
            case 'dateTime':
                return getTickLabelStepTime.call(this, axisDomain, numberOfTickLabel);
            case 'index':
            case 'secondsAsNumber':
                return getTickLabelStepLinear(axisDomain, numberOfTickLabel);
            default:
                return 1;
        }
    };

    function getTickLabelStepLinear(axisDomain, maximumNumberOfTickLabel) {

        var span = Math.abs(axisDomain[1] - axisDomain[0]),
            maximumNumberOfInterval = maximumNumberOfTickLabel - 1,
            stepBase = [2, 5, 10],
            numberOfTickLabelTemp,
            maximumMultipleOfStepBase = 5,
            step, stepTemp,
            numberOfTickLabel = -1,
            multipleOfStepBase;

        for (var i = 0; i < stepBase.length; i = i + 1) {
            stepTemp = Math.pow(stepBase[i], Math.floor(Math.log(span / (maximumNumberOfInterval)) / Math.log(stepBase[i])));

            multipleOfStepBase = Math.ceil(span / (maximumNumberOfInterval * stepTemp));
            numberOfTickLabelTemp = Math.floor(span / (multipleOfStepBase * stepTemp));

            if ((numberOfTickLabel < numberOfTickLabelTemp) && (numberOfTickLabelTemp <= maximumNumberOfInterval) && (multipleOfStepBase <= maximumMultipleOfStepBase)) {
                numberOfTickLabel = numberOfTickLabelTemp;
                step = multipleOfStepBase * stepTemp;
            }
        }

        return step;
    }

    function getRoundedDomain(axisDomain, step) {

        var start = Math.ceil(axisDomain[0] / step) * step,
            stop = Math.floor(axisDomain[1] / step) * step + 0.5 * step;

        return [start, stop];
    }

    ChartUtils._stepBases = [1, 2, 4, 5, 10, 20, 50, 100, 200, 400, 500, 1e3, /*1ms 2ms 4ms 5ms 10ms 20ms 50ms 100ms 200ms 400ms 500ms 1s*/
        2e3, 4e3, 5e3, 6e3, 10e3, 12e3, 15e3, 20e3, 30e3, 45e3, 60e3, /*2s 4s 5s 6s 10s 12s 15s 20s 30s 45s 60s*/
        120e3, 240e3, 300e3, 360e3, 600e3, 720e3, 900e3, 1200e3, 1800e3, 2700e3, 3600e3, /*2m 4m 5m 6m 10m 12m 15m 20m 30m 45m 60m*/
        72e5, 108e5, 144e5, 216e5, 288e5, 432e5, 864e5, /*2h 3h 4h 6h 8h 12h 24h*/
        1728e5, 3456e5, 6048e5, 12096e5, 2592e6, 5184e6, 7776e6, 31536e6, /*2d 4d 7d 14d 30d 60d 90d 1year*/
        63072e6, 126144e6, 157680e6, 31536e7, 63072e7, 157680e7, 31536e8, /*2years 4years 5years 10years 20years 50years 100years*/
        63072e8, 126144e8, 157680e8, 31536e9, 63072e9, 157680e9, 31536e10]; /*200years 400years 500years 1000years 2000years 5000years 10000years*/

    function getTickLabelStepTime(axisDomain, maximumNumberOfTickLabel) {
        var span = Math.abs(axisDomain[1] - axisDomain[0]), // span in milliseconds
            target = span / maximumNumberOfTickLabel,
            index = this._binarySearchSuccessor(this._stepBases, target),
            step = (index === -1) ? 1 : this._stepBases[index];

        return step;
    }

    function getTickLabelAnchor(rotationInteger, axisPosition) {

        switch (axisPosition) {
            case 'top':
            case 'bottom':
                return getTickLabelAnchorHorizontalAxis(rotationInteger, axisPosition);

            case 'right':
                if (rotationInteger === -90) {
                    return 'middle';
                }
                return 'start';

            case 'left':
                if (rotationInteger === -90) {
                    return 'middle';
                }
                return 'end';

            default:
                return 'middle';
        }
    }

    function getTickLabelAnchorHorizontalAxis(rotationInteger, axisPosition) {

        if (rotationInteger === 0) {
            return 'middle';
        }

        if (((rotationInteger + 180) % 180) < 90) {
            return (axisPosition === 'top') ? 'end' : 'start';
        } else {
            return (axisPosition === 'top') ? 'start' : 'end';
        }
    }

    function sawtoothInt(x, amplitude, period, phase, yOffset) {
        return Math.round(amplitude * ((x / period) - phase - Math.floor((x / period) - phase)) - yOffset);
    }

    return ChartUtils;
});

define([
    'brease/core/Class',
    'libs/d3/d3',
    'brease/core/Utils'
], function (SuperClass, d3) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.DataAdapter
     * #Description
     * DataAdapter
     * @extends brease.core.Class
     *
     * @iatMeta studio:visible
     * false
     */

    var ModuleClass = SuperClass.extend(function DataAdapter(widget) {
            SuperClass.call(this);

            this.widget = widget;
            this.settings = {
                chartMargin: {
                    marginTop: 15,
                    marginRight: 15,
                    marginBottom: 15,
                    marginLeft: 15
                },
                cursorAreaWidth: 20
            };

            this.init();
        }, null),

        p = ModuleClass.prototype;

    p.init = function () {

        this.xAxisAreas = [];
        this.yAxisAreas = [];
        this.xAxisCursorAreas = [];
        this.chartArea = {};

        this.yScales = [];
        this.xScales = [];
        this.xAxisCursors = [];

        this.graphs = [];
        for (var yValues in this.widget.chartItems.yValues) {

            this.graphs.push({
                id: yValues,
                coordinates: []
            });
        }

        this.graphIntersectionPoints = [];
        for (var i = 0; i < this.graphs.length; i = i + 1) {
            this.graphIntersectionPoints[i] = {
                graphId: this.graphs[i].id,
                xCursors: []
            };
        }

        _initializeChartAreas(this);
    };

    p.dispose = function () {

    };

    // Update
    p.updateScales = function () {

        _updateScales(this);
    };
    p.updateGraphData = function () {

        _updateGraphData(this);
    };
    p.updateCursor = function () {

        _updateCursor(this);
    };

    p.updateZoomLevelLimits = function () {

        _updateZoomLevelLimits(this);
    };

    // Getters
    p.getXAxisAreas = function () {

        return this.xAxisAreas;
    };
    p.getYAxisAreas = function () {

        return this.yAxisAreas;
    };
    p.getXAxisCursorAreas = function () {

        return this.xAxisCursorAreas;
    };
    p.getChartArea = function () {

        return this.chartArea;
    };
    p.getGraphs = function () {

        return this.graphs;
    };

    p.getGraphIntersectionPoints = function () {

        return this.graphIntersectionPoints;
    };

    p.getYAxesMinimum = function () {
        var axisAreas = this.getYAxisAreas();
        var minimum = null;

        if (!this.widget || this.widget.chartItems.length < 1 || this.widget.chartItems.yAxis.length < 0) {
            return minimum;
        }

        for (var axisId in axisAreas) {
            if (Object.prototype.hasOwnProperty.call(axisAreas, axisId)) {
                var axisMinimum = this.widget.chartItems.yAxis[axisId].minimum();
                if (minimum === null || axisMinimum < minimum) {
                    minimum = axisMinimum;
                }
            }
        }

        return minimum;
    };

    p.getYAxesMaximum = function () {
        var axisAreas = this.getYAxisAreas();
        var maximum = null;

        if (!this.widget || this.widget.chartItems.length < 1 || this.widget.chartItems.yAxis.length < 0) {
            return maximum;
        }

        for (var axisId in axisAreas) {
            if (Object.prototype.hasOwnProperty.call(axisAreas, axisId)) {
                var axisMaximum = this.widget.chartItems.yAxis[axisId].maximum();
                if (maximum === null || axisMaximum > maximum) {
                    maximum = axisMaximum;
                }
            }
        }

        return maximum;
    };

    // Private Functions
    function _initializeChartAreas(dataAdapter) {

        var i = 0,
            axisId,
            xCursorId,
            xOffsetLeft = 0,
            xOffsetRight = dataAdapter.widget.settings.width,
            yOffsetTop = 0,
            yOffsetBottom = dataAdapter.widget.settings.height,
            xAxisSize = 0,
            yAxisSize = 0,
            xAxisWidget,
            yAxisWidget,
            tickLabelDistance,
            tickLabelRotation,
            parseChartMargin,
            topBorderWidth,
            bottomBorderWidth,
            leftBorderWidth,
            rightBorderWidth;

        parseChartMargin = dataAdapter.widget.settings.chartMargin.match(/-?\d+(\.\d+)?px/g);

        for (var pos in dataAdapter.settings.chartMargin) {
            dataAdapter.settings.chartMargin[pos] = parseFloat(parseChartMargin[i], 10);
            i = (parseChartMargin[i + 1]) ? i + 1 : 0;
        }

        topBorderWidth = parseInt(dataAdapter.widget.el.css('border-top-width'), 10);
        bottomBorderWidth = parseInt(dataAdapter.widget.el.css('border-bottom-width'), 10);
        leftBorderWidth = parseInt(dataAdapter.widget.el.css('border-left-width'), 10);
        rightBorderWidth = parseInt(dataAdapter.widget.el.css('border-right-width'), 10);
        xOffsetLeft += dataAdapter.settings.chartMargin['marginLeft'];
        xOffsetRight -= dataAdapter.settings.chartMargin['marginRight'] + leftBorderWidth + rightBorderWidth;
        yOffsetTop += dataAdapter.settings.chartMargin['marginTop'];
        yOffsetBottom -= dataAdapter.settings.chartMargin['marginBottom'];

        // Y-Axes (x positioning)
        for (axisId in dataAdapter.widget.chartItems.yAxis) {

            yAxisWidget = dataAdapter.widget.chartItems.yAxis[axisId];
            yAxisSize = parseInt(dataAdapter.widget.chartItems.yAxis[axisId].settings.width, 10);
            tickLabelDistance = parseFloat(yAxisWidget.getTickLabelDistance());
            tickLabelRotation = parseFloat(yAxisWidget.getTickLabelRotation()) % 360;

            dataAdapter.yAxisAreas[axisId] = {
                id: axisId,
                y: dataAdapter.settings.chartMargin['marginTop'],
                width: yAxisSize,
                info: {
                    coordinate: 'y',
                    position: dataAdapter.widget.chartItems.yAxis[axisId].getAxisPosition(),
                    axisLabelDistance: parseInt(yAxisWidget.getAxisLabelDistance(), 10),
                    tickLabelDistance: tickLabelDistance || 0,
                    tickLabelRotation: tickLabelRotation || 0,
                    minZoomLevel: dataAdapter.widget.getMinZoomLevel() / 100,
                    maxZoomLevel: dataAdapter.widget.getMaxZoomLevel() / 100,
                    format: yAxisWidget.currentFormat(),
                    type: 'number'
                }
            };

            xOffsetRight -= (dataAdapter.yAxisAreas[axisId].info.position === 'right') ? yAxisSize : 0;

            dataAdapter.yAxisAreas[axisId].x = (dataAdapter.yAxisAreas[axisId].info.position === 'left') ? xOffsetLeft : xOffsetRight;

            xOffsetLeft += (dataAdapter.yAxisAreas[axisId].info.position === 'left') ? yAxisSize : 0;

            dataAdapter.yScales[axisId] = d3.scale.linear();
            dataAdapter.yAxisAreas[axisId].scale = dataAdapter.yScales[axisId];
        }

        // X-Axes
        for (axisId in dataAdapter.widget.chartItems.xAxis) {

            xAxisWidget = dataAdapter.widget.chartItems.xAxis[axisId];
            xAxisSize = parseInt(xAxisWidget.settings.height, 10);
            tickLabelDistance = parseFloat(xAxisWidget.getTickLabelDistance());
            tickLabelRotation = parseFloat(xAxisWidget.getTickLabelRotation()) % 360;

            dataAdapter.xAxisAreas[axisId] = {
                id: axisId,
                x: xOffsetLeft,
                width: xOffsetRight - xOffsetLeft,
                height: xAxisSize,
                info: {
                    coordinate: 'x',
                    position: xAxisWidget.getAxisPosition(),
                    axisLabelDistance: parseInt(xAxisWidget.getAxisLabelDistance(), 10),
                    tickLabelDistance: tickLabelDistance || 0,
                    tickLabelRotation: tickLabelRotation || 0,
                    minZoomLevel: dataAdapter.widget.getMinZoomLevel() / 100,
                    maxZoomLevel: dataAdapter.widget.getMaxZoomLevel() / 100
                }
            };

            yOffsetBottom -= (dataAdapter.xAxisAreas[axisId].info.position === 'bottom') ? xAxisSize : 0;

            dataAdapter.xAxisAreas[axisId].y = (dataAdapter.xAxisAreas[axisId].info.position === 'bottom') ? yOffsetBottom - bottomBorderWidth - topBorderWidth : yOffsetTop;

            yOffsetTop += (dataAdapter.xAxisAreas[axisId].info.position === 'top') ? xAxisSize : 0;

            switch (xAxisWidget._getAxisType()) {

                case 'dateTime':
                    dataAdapter.xScales[axisId] = d3.time.scale();
                    break;

                case 'index':
                case 'secondsAsNumber':
                    dataAdapter.xScales[axisId] = d3.scale.linear();
                    break;
            }
            //dataAdapter.xScales[axisId] = (typeof xAxisMinValue === 'object') ? d3.time.scale() : d3.scale.linear();;
            dataAdapter.xAxisAreas[axisId].scale = dataAdapter.xScales[axisId];
        }

        // Y-Axes (y positioning)
        for (axisId in dataAdapter.widget.chartItems.yAxis) {
            dataAdapter.yAxisAreas[axisId].y = yOffsetTop;
            dataAdapter.yAxisAreas[axisId].height = yOffsetBottom - yOffsetTop - topBorderWidth - bottomBorderWidth;
        }

        // Chart Area
        dataAdapter.chartArea = {
            x: xOffsetLeft,
            y: yOffsetTop,
            width: xOffsetRight - xOffsetLeft,
            height: yOffsetBottom - yOffsetTop - topBorderWidth - bottomBorderWidth
        };

        // Cursor area - Position with respect to the graph area
        for (xCursorId in dataAdapter.widget.chartItems.xCursors) {
            var cursorWidget = dataAdapter.widget.chartItems.xCursors[xCursorId];

            dataAdapter.xAxisCursorAreas[xCursorId] = {
                id: xCursorId,
                xCursor: cursorWidget._getValue(),
                yValues: [],
                yValueAxes: [],
                markerVisible: [],
                active: false,
                x: -dataAdapter.settings.cursorAreaWidth / 2 + dataAdapter.xAxisAreas[cursorWidget.axisWidget.elem.id].scale(cursorWidget._getValue()),
                y: 0,
                width: dataAdapter.settings.cursorAreaWidth,
                height: dataAdapter.chartArea.height,
                maxAvailableXPositionIndex: cursorWidget._getMaxDrawnXSampleIndex(cursorWidget._getMaxNumberOfSamples())
                //markerRadius: 
            };

            for (var graphId in cursorWidget.graphWidgets) {
                var graphWidget = cursorWidget.graphWidgets[graphId],
                    cursorPositionWithinGraphNumberOfSamples,
                    graphNumberOfSamples;

                graphNumberOfSamples = (graphWidget.getNumberOfSamples() < 0) ? graphWidget.getValue().length : graphWidget.getNumberOfSamples();

                cursorPositionWithinGraphNumberOfSamples = cursorWidget.axisWidget._xPositions()
                    .map(function (xPosition) {
                        return +xPosition;
                    })
                    .indexOf(+dataAdapter.xAxisCursorAreas[xCursorId].xCursor) <= (graphNumberOfSamples - 1);

                dataAdapter.xAxisCursorAreas[xCursorId].yValues[graphId] = graphWidget.getCursorValue();
                dataAdapter.xAxisCursorAreas[xCursorId].yValueAxes[graphId] = graphWidget.axisWidget.elem.id;
                dataAdapter.xAxisCursorAreas[xCursorId].markerVisible[graphId] = graphWidget.isVisible() && cursorWidget.isVisible() && cursorPositionWithinGraphNumberOfSamples;
            }
        }

        _addIntersectionPointsToGraphs(dataAdapter);

        dataAdapter._createGraphIntersectionPoints();
    }

    function _addIntersectionPointsToGraphs(dataAdapter) {
        for (var i = 0; i < dataAdapter.graphs.length; i = i + 1) {
            var graphId = dataAdapter.graphs[i].id,
                graphWidget = dataAdapter.widget.chartItems.yValues[graphId],
                graphCursorIds = graphWidget.xAxisWidget.cursors,
                graphIntersectionPoints = dataAdapter.graphs[i].intersectionPoints = {};

            for (var xCursorId in graphCursorIds) {
                var cursorWidget = dataAdapter.widget.chartItems.xCursors[xCursorId],
                    graphNumberOfSamples = (graphWidget.getNumberOfSamples() < 0) ? graphWidget.getValue().length : graphWidget.getNumberOfSamples(),
                    cursorPositionWithinGraphNumberOfSamples = cursorWidget.axisWidget._xPositions()
                        .map(function (xPosition) {
                            return +xPosition;
                        })
                        .indexOf(+dataAdapter.xAxisCursorAreas[xCursorId].xCursor) <= (graphNumberOfSamples - 1);

                graphIntersectionPoints[xCursorId] = {
                    xValue: cursorWidget._getValue(),
                    yValues: graphWidget._getYValueFromXCoordinate(cursorWidget._getValue()),
                    yValueAxes: graphWidget.axisWidget.elem.id,
                    markerSize: parseInt(graphWidget.getIntersectionPointSize(), 10),
                    markerEnable: cursorWidget.isEnabled(),
                    markerActive: cursorWidget._getActive(),
                    markerVisible: graphWidget.isVisible() && graphWidget.isVisible() && cursorWidget.isVisible() && cursorPositionWithinGraphNumberOfSamples
                };
            }
        }
    }

    p._createGraphIntersectionPoints = function () {

        var dataAdapter = this;

        this.getGraphIntersectionPoints().forEach(function (graph) {
            var graphId = graph.graphId,
                graphWidget = dataAdapter.widget.chartItems.yValues[graphId],
                graphCursorIds = graphWidget.xAxisWidget.cursors;

            for (var xCursorId in graphCursorIds) {
                var cursorWidget = dataAdapter.widget.chartItems.xCursors[xCursorId],
                    graphNumberOfSamples = (graphWidget.getNumberOfSamples() < 0) ? graphWidget.getValue().length : graphWidget.getNumberOfSamples(),
                    cursorPositionWithinGraphNumberOfSamples = cursorWidget.axisWidget._xPositions()
                        .map(function (xPosition) {
                            return +xPosition;
                        })
                        .indexOf(+dataAdapter.xAxisCursorAreas[xCursorId].xCursor) <= (graphNumberOfSamples - 1);

                graph.xCursors[xCursorId] = {
                    xValue: cursorWidget._getValue(),
                    yValues: graphWidget._getYValueFromXCoordinate(cursorWidget._getValue()),
                    yValueAxes: graphWidget.axisWidget.elem.id,
                    markerSize: parseInt(graphWidget.getIntersectionPointSize(), 10),
                    markerEnable: cursorWidget.isEnabled(),
                    markerActive: cursorWidget._getActive(),
                    markerVisible: graphWidget.isVisible() && graphWidget.isVisible() && cursorWidget.isVisible() && cursorPositionWithinGraphNumberOfSamples
                };
            }
        });
    };

    p._updateGraphIntersectionPoints = function () {

        var dataAdapter = this;

        this.getGraphIntersectionPoints().forEach(function (graph) {
            var graphId = graph.graphId,
                graphWidget = dataAdapter.widget.chartItems.yValues[graphId],
                graphCursorIds = graphWidget.xAxisWidget.cursors;

            for (var xCursorId in graphCursorIds) {
                var cursorWidget = dataAdapter.widget.chartItems.xCursors[xCursorId],
                    graphNumberOfSamples = (graphWidget.getNumberOfSamples() < 0) ? graphWidget.getValue().length : graphWidget.getNumberOfSamples(),
                    cursorPositionWithinGraphNumberOfSamples = cursorWidget.axisWidget._xPositions()
                        .map(function (xPosition) {
                            return +xPosition;
                        })
                        .indexOf(+dataAdapter.xAxisCursorAreas[xCursorId].xCursor) <= (graphNumberOfSamples - 1);

                graph.xCursors[xCursorId] = {
                    xValue: cursorWidget._getValue(),
                    yValues: graphWidget._getYValueFromXCoordinate(cursorWidget._getValue()),
                    yValueAxes: graphWidget.axisWidget.elem.id,
                    markerSize: parseInt(graphWidget.getIntersectionPointSize(), 10),
                    markerEnable: cursorWidget.isEnabled(),
                    markerActive: cursorWidget._getActive(),
                    markerVisible: graphWidget.isVisible() && graphWidget.isVisible() && cursorWidget.isVisible() && cursorPositionWithinGraphNumberOfSamples
                };
            }
        });
    };

    function _updateScales(dataAdapter) {

        var axisId,
            xAxisMinValue,
            xAxisMaxValue,
            yAxisMinValue,
            yAxisMaxValue;

        for (axisId in dataAdapter.yAxisAreas) {

            yAxisMinValue = dataAdapter.widget.chartItems.yAxis[axisId].minimum();
            yAxisMaxValue = dataAdapter.widget.chartItems.yAxis[axisId].maximum();

            if (yAxisMinValue === yAxisMaxValue) {
                if (yAxisMinValue !== 0) {
                    yAxisMinValue = yAxisMinValue * 0.9;
                    yAxisMaxValue = yAxisMaxValue * 1.1;
                } else {
                    yAxisMinValue = -1;
                    yAxisMaxValue = 1;
                }
            }

            dataAdapter.yScales[axisId] = d3.scale.linear()
                .domain([
                    yAxisMinValue,
                    yAxisMaxValue])
                .range([
                    dataAdapter.yAxisAreas[axisId].height,
                    0]);

            dataAdapter.yAxisAreas[axisId].scale = dataAdapter.yScales[axisId];
            dataAdapter.yAxisAreas[axisId].info.format = dataAdapter.widget.chartItems.yAxis[axisId].currentFormat();
        }

        for (axisId in dataAdapter.xAxisAreas) {

            var xAxisWidget = dataAdapter.widget.chartItems.xAxis[axisId];

            xAxisMinValue = xAxisWidget._getMinValue();
            xAxisMaxValue = xAxisWidget._getMaxValue();

            switch (xAxisWidget._getAxisType()) {
                case 'dateTime':
                    dataAdapter.xScales[axisId] = d3.time.scale();
                    dataAdapter.xAxisAreas[axisId].info.type = xAxisWidget._getAxisType();
                    break;

                case 'index':
                case 'secondsAsNumber':
                    dataAdapter.xScales[axisId] = d3.scale.linear();
                    dataAdapter.xAxisAreas[axisId].info.type = xAxisWidget._getAxisType();
                    break;
            }

            dataAdapter.xAxisAreas[axisId].info.format = dataAdapter.widget.chartItems.xAxis[axisId].currentFormat();

            dataAdapter.xScales[axisId]
                .domain([xAxisMinValue, xAxisMaxValue])
                .range([0, dataAdapter.xAxisAreas[axisId].width]);

            dataAdapter.xAxisAreas[axisId].scale = dataAdapter.xScales[axisId];
        }

        _updateGraphData(dataAdapter);
        _updateCursor(dataAdapter);
    }

    function _updateGraphData(dataAdapter) {

        var valueWidget,
            yAxisWidgetId,
            xAxisWidgetId;

        for (var i = 0; i < dataAdapter.graphs.length; i += 1) {

            valueWidget = dataAdapter.widget.chartItems.yValues[dataAdapter.graphs[i].id];

            yAxisWidgetId = valueWidget.axisWidget.elem.id;
            xAxisWidgetId = valueWidget.xAxisWidget.elem.id;

            dataAdapter.graphs[i].yScale = dataAdapter.yScales[yAxisWidgetId];
            dataAdapter.graphs[i].xScale = dataAdapter.xScales[xAxisWidgetId];
            dataAdapter.graphs[i].coordinates = valueWidget._coordinates();
            dataAdapter.graphs[i].interpolationType = valueWidget.getInterpolationType();
            dataAdapter.graphs[i].isHidden = valueWidget.isHidden;
        }
    }

    function _updateCursor(dataAdapter) {

        for (var xCursorId in dataAdapter.widget.chartItems.xCursors) {

            var cursorWidget = dataAdapter.widget.chartItems.xCursors[xCursorId];

            dataAdapter.xAxisCursorAreas[xCursorId].xCursor = cursorWidget._getValue();
            dataAdapter.xAxisCursorAreas[xCursorId].active = cursorWidget._getActive();
            dataAdapter.xAxisCursorAreas[xCursorId].x = -dataAdapter.settings.cursorAreaWidth / 2 + dataAdapter.xAxisAreas[cursorWidget.axisWidget.elem.id].scale(cursorWidget._getValue());
            dataAdapter.xAxisCursorAreas[xCursorId].y = 0;
            dataAdapter.xAxisCursorAreas[xCursorId].width = dataAdapter.settings.cursorAreaWidth;

            for (var graphId in cursorWidget.graphWidgets) {
                var graphWidget = cursorWidget.graphWidgets[graphId],
                    cursorPositionWithinGraphNumberOfSamples,
                    graphNumberOfSamples;

                graphNumberOfSamples = (graphWidget.getNumberOfSamples() < 0) ? graphWidget.getValue().length : graphWidget.getNumberOfSamples();

                cursorPositionWithinGraphNumberOfSamples = cursorWidget.axisWidget._xPositions()
                    .map(function (xPosition) {
                        return +xPosition;
                    })
                    .indexOf(+dataAdapter.xAxisCursorAreas[xCursorId].xCursor) <= (graphNumberOfSamples - 1);

                dataAdapter.xAxisCursorAreas[xCursorId].markerVisible[graphId] = graphWidget.isVisible() && cursorWidget.isVisible() && cursorPositionWithinGraphNumberOfSamples;
                if (dataAdapter.xAxisCursorAreas[xCursorId].markerVisible[graphId]) {
                    dataAdapter.xAxisCursorAreas[xCursorId].yValues[graphId] = graphWidget._getIntersectionValue(cursorWidget._getValue(), cursorWidget._getActive(), true);
                }
                dataAdapter.xAxisCursorAreas[xCursorId].yValueAxes[graphId] = graphWidget.axisWidget.elem.id;
            }
            dataAdapter.xAxisCursorAreas[xCursorId].maxAvailableXPositionIndex = cursorWidget._getMaxDrawnXSampleIndex(cursorWidget._getMaxNumberOfSamples());
        }

        _updateIntersectionPoints(dataAdapter);

        dataAdapter._updateGraphIntersectionPoints();
    }

    function _updateIntersectionPoints(dataAdapter) {
        for (var i = 0; i < dataAdapter.graphs.length; i = i + 1) {
            var graphId = dataAdapter.graphs[i].id,
                graphWidget = dataAdapter.widget.chartItems.yValues[graphId],
                graphCursorIds = graphWidget.xAxisWidget.cursors,
                graphIntersectionPoints = dataAdapter.graphs[i].intersectionPoints;

            for (var xCursorId in graphCursorIds) {
                var cursorWidget = dataAdapter.widget.chartItems.xCursors[xCursorId],
                    graphNumberOfSamples = (graphWidget.getNumberOfSamples() < 0) ? graphWidget.getValue().length : graphWidget.getNumberOfSamples(),
                    cursorPositionWithinGraphNumberOfSamples = cursorWidget.axisWidget._xPositions()
                        .map(function (xPosition) {
                            return +xPosition;
                        })
                        .indexOf(+dataAdapter.xAxisCursorAreas[xCursorId].xCursor) <= (graphNumberOfSamples - 1);

                graphIntersectionPoints[xCursorId] = {
                    xValue: cursorWidget._getValue(),
                    yValues: graphWidget._getYValueFromXCoordinate(cursorWidget._getValue()),
                    yValueAxes: graphWidget.axisWidget.elem.id,
                    markerEnable: cursorWidget.isEnabled(),
                    markerActive: cursorWidget._getActive(),
                    markerVisible: graphWidget.isVisible() && graphWidget.isVisible() && cursorWidget.isVisible() && cursorPositionWithinGraphNumberOfSamples
                };
            }
        }
    }

    function _updateZoomLevelLimits(dataAdapter) {
        var axisId;
        // update y-axes
        for (axisId in dataAdapter.widget.chartItems.yAxis) {

            dataAdapter.yAxisAreas[axisId].info.minZoomLevel = dataAdapter.widget.getMinZoomLevel() / 100;
            dataAdapter.yAxisAreas[axisId].info.maxZoomLevel = dataAdapter.widget.getMaxZoomLevel() / 100;
        }

        // update x-axes
        for (axisId in dataAdapter.widget.chartItems.xAxis) {

            dataAdapter.xAxisAreas[axisId].info.minZoomLevel = dataAdapter.widget.getMinZoomLevel() / 100;
            dataAdapter.xAxisAreas[axisId].info.maxZoomLevel = dataAdapter.widget.getMaxZoomLevel() / 100;
        }
    }

    return ModuleClass;
});

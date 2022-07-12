define([
    'brease/core/Class',
    'libs/d3/d3',
    'brease/core/Utils',
    'brease/enum/Enum',
    'widgets/brease/common/libs/ChartUtils',
    'brease/events/BreaseEvent',
    'globalize'
], function (SuperClass, d3, Utils, Enum, ChartUtils, BreaseEvent) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.Renderer
     * #Description
     * Renderer
     * @extends brease.core.Class
     *
     * @iatMeta studio:visible
     * false
     */

    var defaultSettings = {
            enableZoomingBehavior: true
        },

        ModuleClass = SuperClass.extend(function Renderer(widget, options) {
            SuperClass.call(this);

            if (options !== undefined) {
                this.settings = $.extend(true, {}, this.defaultSettings, options);
            } else {
                this.settings = Utils.deepCopy(this.defaultSettings);
            }
            this.widget = widget;
            this.dataAdapter = widget.dataAdapter;
            this.clipPathId = Utils.uniqueID(this.widget.elem.id + '_svg_clipPath');

            this.init();

        }, defaultSettings),

        p = ModuleClass.prototype;

    p.init = function () {

        this.svg = d3.select(this.widget.elem)
            .append('svg')
            .attr('width', this.widget.el.width())
            .attr('height', this.widget.el.height());

        this.forceRepaint = _.throttle(_forceRepaint.bind(this), 100, { trailing: true, leading: false });
        this.mainZoomBehavior = null;
        this.savedX = null;
        this.savedY = null;
        this.scaleXY = null;
        this.scaleX = null;
        this.scaleY = null;
        this.roundScale = 0.05;
        this.previousMainScale = null;
        this.zoomBehaviorXAxes = [];
        this.zoomBehaviorYAxes = [];
        _createGroups(this);
        _createAxis(this);
        if (this.settings.enableZoomingBehavior) { _createZoomBehavior(this); }
        _createGraphs(this);
        _createCursors(this);
        this._createGraphIntersectionPoints();
        _applyCursorDragBehavior(this);
    };

    p.updateAxis = function () {

        _updateAxis(this);
        if (this.settings.enableZoomingBehavior) { _updateAxisZoomBehavior(this); }
    };

    p.updateCursor = function () {

        _updateCursor(this);
    };

    p.updateGraphs = function () {
        // A&P 711445: chart refresh not painting correct
        // forceRepaint will change css of svg before and after _updateGraphs
        this.forceRepaint();
        _updateGraphs(this);
    };

    p.updateZoomLevelLimits = function () {

        _updateZoomLevelLimits(this);
    };

    p.updateZoomType = function (zoomType) {
        _updateZoomType(this, zoomType);
    };

    p.zoomIn = function () {

        _adjustZooming(this, this.widget.settings.zoomFactor, { x: 0, y: 0 });
    };

    p.zoomOut = function () {

        _adjustZooming(this, 1 / this.widget.settings.zoomFactor, { x: 0, y: 0 });

    };

    p.zoomReset = function () {
        var zoomType = this.widget.getZoomType();
        if (zoomType !== Enum.ChartZoomType.none) {
            this.mainZoomBehavior.scale(1);
            this.mainZoomBehavior.translate([0, 0]);
            this.previousMainScale = 1;
            this.scaleX = 1;
            this.scaleY = 1;
        }
        if (zoomType === Enum.ChartZoomType.x) {
            this.savedX = null;
            this.savedY = 0;
        } else if (zoomType === Enum.ChartZoomType.y) {
            this.savedX = 0;
            this.savedY = null;
        }
        _handleZooming(this, true);
    };

    p.scrollLeft = function () {

        _adjustZooming(this, 1, { x: this.widget.settings.scrollFactor, y: 0 });
    };

    p.scrollRight = function () {

        _adjustZooming(this, 1, { x: -this.widget.settings.scrollFactor, y: 0 });
    };

    p.scrollUp = function () {

        _adjustZooming(this, 1, { x: 0, y: this.widget.settings.scrollFactor });
    };

    p.scrollDown = function () {

        _adjustZooming(this, 1, { x: 0, y: -this.widget.settings.scrollFactor });
    };

    p.xCursorStepLeft = function (xCursorId, stepSize) {
        _xCursorStepLeft(this, xCursorId, stepSize);
    };

    p.xCursorStepRight = function (xCursorId, stepSize) {
        _xCursorStepRight(this, xCursorId, stepSize);
    };

    p.xCursorDisableDrag = function (xCursorId) {
        _xCursorDisableDrag(this, xCursorId);
    };

    p.xCursorEnableDrag = function (xCursorId) {
        _xCursorEnableDrag(this, xCursorId);
    };

    p._updateGraphIntersectionPoints = function () {
        var renderer = this,
            // eslint-disable-next-line no-unused-vars
            chartArea = this.dataAdapter.getChartArea(),
            graphIntersectionPointGroups = this.svg.select('g.chart')
                .selectAll('g.intersectionPoints');

        graphIntersectionPointGroups.each(function (graphData) {
            var d3GraphIntersectionPoint = d3.select(this);

            for (var xCursorId in graphData.xCursors) {
                var currentXCursorData = graphData.xCursors[xCursorId],
                    marker = d3GraphIntersectionPoint.selectAll('circle[data-xCursorId="' + xCursorId + '"].marker'),
                    xCursorWidget = renderer.widget.chartItems.xCursors[xCursorId],
                    x = renderer.dataAdapter.xAxisAreas[xCursorWidget.axisWidget.elem.id].scale(currentXCursorData.xValue),
                    y = renderer.dataAdapter
                        .yAxisAreas[currentXCursorData.yValueAxes]
                        .scale(currentXCursorData.yValues);

                marker.attr('cx', x)
                    .attr('cy', (y !== undefined && y !== null) ? y : renderer.dataAdapter.getChartArea().height)
                    .classed('disabled', !currentXCursorData.markerEnable)
                    .classed('active', currentXCursorData.markerActive)
                    .classed('remove', !currentXCursorData.markerVisible);
            }
        });
    };

    function _forceRepaint() {
        var renderer = this,
            prevStyle = renderer.svg.attr('style') || '';

        renderer.svg.attr('style', 'transform:rotateZ(0deg);' + prevStyle);
        _cancelRepaint.call(renderer);
        renderer._timeoutRepaint = window.setTimeout(function () {
            renderer.svg.attr('style', prevStyle);
        }, 80);
    }

    function _cancelRepaint() {
        if (this._timeoutRepaint) {
            window.clearTimeout(this._timeoutRepaint);
        }
    }

    p.dispose = function () {
        _cancelRepaint.call(this);
        this.forceRepaint.cancel();
    };

    // Private Functions
    function _createGroups(renderer) {

        var chartArea = renderer.dataAdapter.getChartArea();

        renderer.svg.append('defs')
            .append('clipPath')
            .attr('id', renderer.clipPathId)
            .append('rect')
            .attr('x', 0.5)
            .attr('y', 0.5)
            .attr('width', chartArea.width - 1)
            .attr('height', chartArea.height - 1);

        renderer.svg.append('g')
            .attr('class', 'chart')
            .attr('transform', 'translate(' + (chartArea.x + 0.5) + ',' + (chartArea.y + 0.5) + ')')
            .append('rect')
            .attr('width', chartArea.width)
            .attr('height', chartArea.height);

        renderer.svg.selectAll('g.xAxis')
            .data(d3.values(renderer.dataAdapter.getXAxisAreas()))
            .enter()
            .append('g')
            .attr('class', 'axis xAxisArea')
            .attr('transform', function (d) {
                return 'translate(' + (d.x + 0.5) + ',' + (d.y + 0.5) + ')';
            });

        renderer.svg.selectAll('g.yAxis')
            .data(d3.values(renderer.dataAdapter.getYAxisAreas()))
            .enter()
            .append('g')
            .attr('class', 'axis yAxisArea')
            .attr('transform', function (d) {
                return 'translate(' + (d.x + 0.5) + ',' + (d.y + 0.5) + ')';
            });
    }

    function _createAxis(renderer) {

        var chartArea = renderer.dataAdapter.getChartArea();

        renderer.svg.selectAll('g.xAxisArea')
            .each(function (d) {
                var currentAxis = renderer.widget.chartItems.xAxis[d.id];
                var gXAxisArea = d3.select(this)
                    .append('g')
                    .attr('id', d.id + '_breaseChartXAxis')
                    .attr('class', 'xAxis')
                    .classed('disabled', !currentAxis.isEnabled())
                    .classed('remove', currentAxis.isHidden)
                    .attr('fill', 'none')
                    .attr('transform', function (d) {
                        return 'translate(0, ' + ((d.info.position === 'top') ? d.height : 0) + ')';
                    });

                gXAxisArea.append('rect')
                    .attr('id', d.id + '_rect')
                    .attr('height', currentAxis.settings.height)
                    .attr('width', chartArea.width)
                    .attr('pointer-events', 'visible')
                    .attr('transform', function (d) {
                        return 'translate(0, ' + ((d.info.position === 'top') ? d.height * (-1) : 0) + ')';
                    });

                var axisElem = gXAxisArea[0][0];
                $(axisElem).on(BreaseEvent.CLICK, currentAxis._bind('_clickHandler'));

                gXAxisArea.append('g')
                    .attr('transform', 'translate(' + (chartArea.width / 2) + ', ' + ((d.info.position === 'top') ? -d.info.axisLabelDistance : d.info.axisLabelDistance) + ')')
                    .append('text')
                    .attr('class', 'xAxisDescription')
                    .attr('dy', ((d.info.position === 'top') ? '-0.03em' : '0.75em'))
                    .attr('text-anchor', 'middle');
            });

        renderer.svg.selectAll('g.chart')
            .append('g')
            .attr('class', 'xGrid gridLines')
            .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + renderer.clipPathId + ')');

        renderer.svg.selectAll('g.chart')
            .append('g')
            .attr('class', 'yGrid gridLines')
            .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + renderer.clipPathId + ')');

        renderer.svg.selectAll('g.yAxisArea')
            .each(function (d) {

                var currentAxis = renderer.widget.chartItems.yAxis[d.id];
                var gYAxisArea = d3.select(this)
                    .append('g')
                    .attr('id', d.id + '_breaseChartYAxis')
                    .attr('class', 'yAxis')
                    .classed('disabled', !currentAxis.isEnabled())
                    .classed('remove', currentAxis.isHidden)
                    .attr('fill', 'none')
                    .attr('transform', function (d) {
                        return 'translate(' + ((d.info.position === 'left') ? d.width : 0) + ', 0)';
                    });

                gYAxisArea.append('rect')
                    .attr('id', d.id + '_rect')
                    .attr('height', chartArea.height)
                    .attr('width', currentAxis.settings.width)
                    .attr('pointer-events', 'visible')
                    .attr('transform', function (d) {
                        return 'translate(' + ((d.info.position === 'left') ? d.width * (-1) : 0) + ',0)';
                    });

                var axisElem = gYAxisArea[0][0];
                $(axisElem).on(BreaseEvent.CLICK, currentAxis._bind('_clickHandler'));

                gYAxisArea.append('g')
                    .attr('transform', 'rotate(-90) translate(-' + (d.height / 2) + ', ' + ((d.info.position === 'left') ? -d.info.axisLabelDistance : d.info.axisLabelDistance) + ')')
                    .append('text')
                    .attr('class', 'yAxisDescription')
                    .attr('dy', ((d.info.position === 'left') ? '-0.03em' : '0.75em'))
                    .style('text-anchor', 'middle');
            });
    }

    function _createCursors(renderer) {

        var chartArea = renderer.dataAdapter.getChartArea();

        // cursor area
        renderer.svg.select('g.chart').selectAll('g.xCursorAreas')
            .data(d3.values(renderer.dataAdapter.getXAxisCursorAreas()))
            .enter()
            .append('g')
            .attr('class', 'xCursorArea')
            .classed('disabled', function (d) {
                return !renderer.widget.chartItems.xCursors[d.id].isEnabled();
            })
            .classed('remove', function (d) {
                return !renderer.widget.chartItems.xCursors[d.id].isVisible();
            })
            .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + renderer.clipPathId + ')')
            .append('rect')
            .attr('class', function (d) {
                return 'cursor ' + d.id;
            })
            .classed('remove', function (d) {
                return renderer.widget.chartItems.xCursors[d.id].isHidden;
            })
            .attr('transform', function (d) {
                return 'translate(' + (d.x + 0.5) + ',' + (d.y + 0.5) + ')';
            })
            .attr('height', function (d) {
                return d.height;
            })
            .attr('width', function (d) {
                return d.width;
            })
            .style('fill', 'transparent')
            .style('stroke', 'transparent');

        // cursor line
        renderer.svg.selectAll('g.xCursorArea')
            .each(function (d) {
                // eslint-disable-next-line no-unused-vars
                var cursorWidget = renderer.widget.chartItems.xCursors[d.id],
                    // eslint-disable-next-line no-unused-vars
                    gXCursorArea = d3.select(this)
                        .attr('id', d.id + '_breaseChartXAxisCursor')
                        .append('line')
                        .attr('class', 'cursor ' + d.id)
                        .classed('remove', renderer.widget.chartItems.xCursors[d.id].isHidden)
                        .attr('x1', 0)
                        .attr('x2', 0)
                        .attr('y1', 0)
                        .attr('y2', chartArea.height);
            });

        // click event
        renderer.svg.selectAll('g.xCursorArea')
            .each(function (d) {
                var cursorWidget = renderer.widget.chartItems.xCursors[d.id],
                    gXCursorArea = d3.select(this);
                var cursorAreaElem = gXCursorArea[0][0];
                $(cursorAreaElem).on(BreaseEvent.CLICK, cursorWidget._bind('_clickHandler'));
            });
    }

    function _updateAxis(renderer) {

        var xAxisGridTickValues = {
            top: [],
            bottom: []
        };

        renderer.svg.selectAll('g.xAxisArea')
            .each(function (d) {
                var xAxisWidget = renderer.widget.chartItems.xAxis[d.id],
                    tickLabelSVGs,
                    numberOfTickLabel,
                    tickLabelValues;

                var xAxis = d3.svg.axis()
                    .scale(d.scale)
                    .orient(d.info.position)
                    .tickFormat(function (d) {
                        return _tickFormat(renderer.dataAdapter.xAxisAreas[xAxisWidget.elem.id].info.format, d, renderer.dataAdapter.xAxisAreas[xAxisWidget.elem.id].info.type);
                    });

                d3.select(this).selectAll('g.xAxis')
                    .call(xAxis);

                d3.select(this).selectAll('text.xAxisDescription')
                    .text(xAxisWidget.getAxisLabel());

                var tickLabelSelection = d3.select(this).selectAll('.tick>text');

                tickLabelSelection = ChartUtils.getMultiLine(tickLabelSelection, d.info.position);
                ChartUtils.rotateTickLabels(tickLabelSelection, d.info.position,
                    d.info.tickLabelDistance, d.info.tickLabelRotation);

                tickLabelSVGs = Array.prototype.slice.call(renderer.widget.elem.getRootNode().getElementById(d.id + '_breaseChartXAxis').querySelectorAll('.tick text'));

                numberOfTickLabel = Math.min(ChartUtils.getNumberOfTickLabel(tickLabelSVGs, d), 10);
                tickLabelValues = ChartUtils.getTickLabelValues(d.scale.domain(), numberOfTickLabel, d.info.type);
                xAxisGridTickValues[d.info.position] = tickLabelValues;

                xAxis = d3.svg.axis()
                    .scale(d.scale)
                    .orient(d.info.position)
                    .tickFormat(function (d) {
                        return _tickFormat(renderer.dataAdapter.xAxisAreas[xAxisWidget.elem.id].info.format, d, renderer.dataAdapter.xAxisAreas[xAxisWidget.elem.id].info.type);
                    })
                    .tickValues(tickLabelValues);

                d3.select(this).selectAll('g.xAxis')
                    .call(xAxis);

                tickLabelSelection = d3.select(this).selectAll('.tick>text');

                tickLabelSelection = ChartUtils.getMultiLine(tickLabelSelection, d.info.position);
                ChartUtils.rotateTickLabels(tickLabelSelection, d.info.position,
                    d.info.tickLabelDistance, d.info.tickLabelRotation);
            });

        renderer.svg.selectAll('g.yAxisArea')
            .each(function (d) {

                var yAxisWidget = renderer.widget.chartItems.yAxis[d.id];

                var yAxis = d3.svg.axis()
                    .scale(d.scale)
                    .orient(d.info.position)
                    .tickFormat(function (d) {
                        return _tickFormat(renderer.dataAdapter.yAxisAreas[yAxisWidget.elem.id].info.format, d, renderer.dataAdapter.yAxisAreas[yAxisWidget.elem.id].info.type);
                    });

                d3.select(this).selectAll('g.yAxis')
                    .call(yAxis);

                d3.select(this).selectAll('text.yAxisDescription')
                    .text(yAxisWidget.getAxisLabel() + ' ' + yAxisWidget.currentUnitSymbol());

                var tickLabelSelection = d3.select(this).selectAll('.tick>text');
                ChartUtils.rotateTickLabels(tickLabelSelection, d.info.position,
                    d.info.tickLabelDistance, d.info.tickLabelRotation);
            });

        _updateGrid(renderer, renderer.widget.settings.showGrid, xAxisGridTickValues);
        _updateGraphs(renderer);
        _updateCursor(renderer);
    }

    function _updateGrid(renderer, visible, xAxisTickValues) {

        var chartArea = renderer.dataAdapter.getChartArea(),
            yAxisAreas = renderer.dataAdapter.getYAxisAreas(),
            yAxisAreaLeft = null,
            yAxisAreaRight = null,
            yAxisAreaGrid = null,
            xAxisAreas = renderer.dataAdapter.getXAxisAreas(),
            xAxisAreaTop = null,
            xAxisAreaBottom = null,
            xAxisAreaGrid = null,
            xAxisGridTickValues,
            xGrid,
            yGrid,
            areaId;

        for (areaId in yAxisAreas) {
            if (yAxisAreas[areaId].info.position === 'left') {
                yAxisAreaLeft = yAxisAreas[areaId];
            }
            if (yAxisAreas[areaId].info.position === 'right') {
                yAxisAreaRight = yAxisAreas[areaId];
            }
        }
        yAxisAreaGrid = (yAxisAreaLeft) || yAxisAreaRight;

        for (areaId in xAxisAreas) {
            if (xAxisAreas[areaId].info.position === 'bottom') {
                xAxisAreaBottom = xAxisAreas[areaId];
            }
            if (xAxisAreas[areaId].info.position === 'top') {
                xAxisAreaTop = xAxisAreas[areaId];
            }
        }
        if (xAxisAreaBottom) {
            xAxisAreaGrid = xAxisAreaBottom;
            xAxisGridTickValues = xAxisTickValues.bottom;
        } else {
            xAxisAreaGrid = xAxisAreaTop;
            xAxisGridTickValues = xAxisTickValues.top;
        }

        if ((visible) && (xAxisAreaGrid) && (yAxisAreaGrid)) {

            xGrid = d3.svg.axis()
                .scale(xAxisAreaGrid.scale)
                .outerTickSize(0)
                .innerTickSize(-chartArea.height)
                .orient('top')
                .tickValues(xAxisGridTickValues);

            yGrid = d3.svg.axis()
                .scale(yAxisAreaGrid.scale)
                .outerTickSize(0)
                .innerTickSize(-chartArea.width)
                .orient('left');

            renderer.svg.selectAll('g.xGrid')
                .call(xGrid);

            renderer.svg.selectAll('g.yGrid')
                .call(yGrid);
        } else {

            renderer.svg.selectAll('g.xGrid')
                .selectAll('*')
                .remove();

            renderer.svg.selectAll('g.yGrid')
                .selectAll('*')
                .remove();
        }
    }

    function _updateCursor(renderer) {

        renderer.svg.selectAll('g.xCursorArea')
            .each(function (d) {

                var xCursorWidget = renderer.widget.chartItems.xCursors[d.id];

                if (!xCursorWidget.axisWidget.elem.id) {
                    return;
                }

                var x = renderer.dataAdapter.xAxisAreas[xCursorWidget.axisWidget.elem.id].scale(xCursorWidget._getValue());

                renderer.svg.select('rect.' + d.id)
                    .attr('transform', 'translate(' + (x - renderer.dataAdapter.settings.cursorAreaWidth / 2) + ', 0)');

                renderer.svg.select('line.' + d.id)
                    .attr('transform', 'translate(' + x + ', 0)');
            });

        renderer._updateGraphIntersectionPoints();
    }

    function _createZoomBehavior(renderer) {
        renderer.mainZoomBehavior = _createMainZoomBehavior(renderer);

        var axisId = '';
        for (axisId in renderer.dataAdapter.xAxisAreas) {
            if (Object.prototype.hasOwnProperty.call(renderer.dataAdapter.xAxisAreas, axisId)) {
                renderer.zoomBehaviorXAxes[axisId] = d3.behavior.zoom();
            }
        }

        for (axisId in renderer.dataAdapter.yAxisAreas) {
            if (Object.prototype.hasOwnProperty.call(renderer.dataAdapter.yAxisAreas, axisId)) {
                renderer.zoomBehaviorYAxes[axisId] = d3.behavior.zoom();
            }
        }
        renderer.svg.selectAll('g.chart')
            .call(renderer.mainZoomBehavior);
    }

    function _createMainZoomBehavior(renderer) {
        var minZoomLevel = renderer.widget.getMinZoomLevel() / 100,
            maxZoomLevel = renderer.widget.getMaxZoomLevel() / 100;

        var mainZoomBehavior = d3.behavior.zoom()
            .x(_getFirstXAxisScale(renderer))
            .y(_getFirstYAxisScale(renderer))
            .scaleExtent([
                minZoomLevel,
                maxZoomLevel
            ])
            .on('zoomstart', function () {
                // A&P 618730
                // d3 double click event triggers a zoomstart event, but since dblclick is not a native event sourceEvent is null
                if (d3.event.sourceEvent) {
                    d3.event.sourceEvent.stopPropagation();
                    d3.event.sourceEvent.stopImmediatePropagation();
                }
            })
            .on('zoom.stopPropagation', function () {
                // A&P 618730
                // d3 double click event triggers a zoomstart event, but since dblclick is not a native event sourceEvent is null
                if (d3.event.sourceEvent) {
                    d3.event.sourceEvent.stopPropagation();
                    d3.event.sourceEvent.stopImmediatePropagation();
                }
            })
            .on('zoom.throttledHandleZooming', _.throttle(_.partial(_handleZooming, renderer), 50, { trailing: false, leading: true }));

        var scale = mainZoomBehavior.scale();
        renderer.scaleX = scale;
        renderer.scaleY = scale;
        renderer.scaleXY = scale;
        renderer.previousMainScale = scale;

        return mainZoomBehavior;
    }

    function _updateZoomLevelLimits(renderer) {

        renderer.mainZoomBehavior
            .scaleExtent([
                renderer.widget.getMinZoomLevel() / 100,
                renderer.widget.getMaxZoomLevel() / 100
            ]);

        renderer.svg.selectAll('g.chart')
            .call(renderer.mainZoomBehavior);
    }

    function _updateAxisZoomBehavior(renderer) {

        var yAxisAreas = renderer.dataAdapter.getYAxisAreas(),
            xAxisAreas = renderer.dataAdapter.getXAxisAreas();

        renderer.svg.selectAll('g.xAxisArea')
            .each(function (d) {
                renderer.zoomBehaviorXAxes[d.id]
                    .x(xAxisAreas[d.id].scale);
            });

        renderer.svg.selectAll('g.yAxisArea')
            .each(function (d) {

                renderer.zoomBehaviorYAxes[d.id]
                    .y(yAxisAreas[d.id].scale);
            });

        _loadZoomTranslation(renderer);
        var forceUpdateXY = renderer.widget.chartItems.isDirty && renderer.widget.chartItems.isDirty.xaxis === true && renderer.widget.chartItems.isDirty.yaxis === true;
        _handleZooming(renderer, forceUpdateXY);
    }

    function _updateZoomType(renderer, zoomType) {
        _loadZoomTranslation(renderer);

        var mainZoom = renderer.mainZoomBehavior;
        var mainTranslate = mainZoom.translate();

        if (zoomType === Enum.ChartZoomType.xy) {
            renderer.savedX = null;
            renderer.savedY = null;
        }
        if (zoomType === Enum.ChartZoomType.x) {
            renderer.mainZoomBehavior.scale(renderer.scaleX);
            renderer.previousMainScale = renderer.scaleX;
            renderer.savedX = null;
            renderer.savedY = mainTranslate[1];
        }
        if (zoomType === Enum.ChartZoomType.y) {
            renderer.mainZoomBehavior.scale(renderer.scaleY);
            renderer.previousMainScale = renderer.scaleY;
            renderer.savedX = mainTranslate[0];
            renderer.savedY = null;
        }
        if (zoomType === Enum.ChartZoomType.none) {
            renderer.savedX = mainTranslate[0];
            renderer.savedY = mainTranslate[1];
        }
    }

    function _loadZoomTranslation(renderer) {
        var mainZoom = renderer.mainZoomBehavior;
        var mainTranslate = mainZoom.translate();
        var loadedTranslate = mainTranslate;
        if (renderer.savedX !== null) {
            loadedTranslate[0] = renderer.savedX;
        }
        if (renderer.savedY !== null) {
            loadedTranslate[1] = renderer.savedY;
        }
        mainZoom.translate(loadedTranslate);
    }

    /*
    * @method 
    * Handles the zooming behavior
    * @param {Object} renderer 
    * @param {boolean} forceUpdateXY Set to true, to force an update on X and Y Axis
    */
    function _handleZooming(renderer, forceUpdateXY) {
        /* Use case when forceUpdateXY should be used:
                - Set zoomType to "x"
                - ZoomIn into Chart
                - Set zoomType to "y" (do not ZoomIn)
                - Change page and back again to Chart page
                At this point zooming should be updated for both axes independent of chosen zoomType
              */
        var ev = new CustomEvent('Zoomed');

        renderer.widget.dispatchEvent(ev);
        var zoomType = renderer.widget.getZoomType();

        if (zoomType !== Enum.ChartZoomType.none) {
            var scaleDiff = renderer.mainZoomBehavior.scale() - renderer.previousMainScale,
                percentScale = 1 + (scaleDiff / renderer.previousMainScale),
                scaleFactor = Utils.getChromeScale(renderer.widget.elem),
                zoomTranslate = renderer.mainZoomBehavior.translate(),
                scaleX = renderer.scaleX,
                scaleY = renderer.scaleY;

            renderer.scaleX = renderer.scaleX * percentScale;
            renderer.scaleY = renderer.scaleY * percentScale;

            if (!renderer.widget.getInfiniteScroll()) {
                renderer.scaleX = parseFloat(renderer.scaleX.toFixed(5));
                renderer.scaleY = parseFloat(renderer.scaleY.toFixed(5));
            
                // limit scale
                if (renderer.scaleX <= (1 + renderer.roundScale)) {
                    renderer.scaleX = 1;
                }
                if (renderer.scaleY <= (1 + renderer.roundScale)) {
                    renderer.scaleY = 1;
                }
                var scale;
                scale = _handleZoomLimitation(renderer);
                // limit translate
                _handleTranslationLimitation(renderer, zoomTranslate, scale.x, scale.y, scaleFactor);
            
                if (renderer.mainZoomBehavior.scale() < 1) {
                    renderer.mainZoomBehavior.scale(1);
                }
            }

            if (zoomType === Enum.ChartZoomType.xy || forceUpdateXY) {
                var zoomScale;

                zoomScale = _handleZoomLimitation(renderer);
                renderer.scaleX = zoomScale.x;
                renderer.scaleY = zoomScale.y;

                // Checks (for both axis) if the new calculated scale is 
                // inside the zoom limitation
                if (!zoomScale.limited) {
                    _handleZoomX(renderer, zoomScale.x, zoomTranslate);
                    _handleZoomY(renderer, zoomScale.y, zoomTranslate);
                } else {
                    renderer.scaleX = scaleX;
                    renderer.scaleY = scaleY;
                    renderer.mainZoomBehavior.scale(renderer.previousMainScale);
                    renderer.mainZoomBehavior.translate(renderer.previousZoomTranslate);
                }
         
            } else if (zoomType === Enum.ChartZoomType.x) {
                renderer.scaleY = scaleY;
                renderer.mainZoomBehavior.scale(renderer.scaleX);
                _handleZoomX(renderer, renderer.scaleX, zoomTranslate);
            } else if (zoomType === Enum.ChartZoomType.y) {
                renderer.scaleX = scaleX;
                renderer.mainZoomBehavior.scale(renderer.scaleY);
                _handleZoomY(renderer, renderer.scaleY, zoomTranslate);
            }

            _updateAxis(renderer);
            _updateGraphs(renderer);
            _updateCursor(renderer);

            renderer.previousMainScale = renderer.mainZoomBehavior.scale();
            renderer.previousZoomTranslate = renderer.mainZoomBehavior.translate();
        } else {
            renderer.mainZoomBehavior.scale(renderer.previousMainScale);
        }
    }

    function _handleZoomLimitation(renderer) {
        var minZoomLevel = renderer.widget.getMinZoomLevel() / 100,
            maxZoomLevel = renderer.widget.getMaxZoomLevel() / 100,
            scale = { 
                x: renderer.scaleX,
                y: renderer.scaleY,
                limited: false
            };

        if (scale.x < minZoomLevel) {
            scale.x = minZoomLevel;
        } else if (renderer.scaleX > maxZoomLevel) {
            scale.x = maxZoomLevel;
        }
        if (scale.y < minZoomLevel) {
            scale.y = minZoomLevel;
        } else if (renderer.scaleY > maxZoomLevel) {
            scale.y = maxZoomLevel;
        }

        if (scale.x !== renderer.scaleX || scale.y !== renderer.scaleY) {
            scale.limited = true;
        } 

        return scale;
    }

    function _handleTranslationLimitation(renderer, zoomTranslate, newScaleX, newScaleY, scaleFactor) {

        // limit translate
        zoomTranslate[0] = _scrollLimitX(renderer, newScaleX, zoomTranslate[0]);
        zoomTranslate[0] = (Math.abs(zoomTranslate[0]) > renderer.roundScale) ? zoomTranslate[0] : 0;
        zoomTranslate[1] = _scrollLimitY(renderer, newScaleY, zoomTranslate[1]);
        zoomTranslate[1] = (Math.abs(zoomTranslate[1]) > renderer.roundScale) ? zoomTranslate[1] : 0;
        zoomTranslate = zoomTranslate.map(function (x) {
            return x / scaleFactor;
        });
        renderer.mainZoomBehavior.translate(zoomTranslate);
    }

    function _handleZoomX(renderer, scale, translate) {
        var zoomBehaviorId = '';

        for (zoomBehaviorId in renderer.zoomBehaviorXAxes) {
            if (Object.prototype.hasOwnProperty.call(renderer.zoomBehaviorXAxes, zoomBehaviorId)) {
                renderer.zoomBehaviorXAxes[zoomBehaviorId]
                    .scale(scale)
                    .translate(translate);
            }
        }

    }

    function _handleZoomY(renderer, scale, translate) {
        var zoomBehaviorId = '';

        for (zoomBehaviorId in renderer.zoomBehaviorYAxes) {
            if (Object.prototype.hasOwnProperty.call(renderer.zoomBehaviorYAxes, zoomBehaviorId)) {
                renderer.zoomBehaviorYAxes[zoomBehaviorId]
                    .scale(scale)
                    .translate(translate);
            }
        }
    }

    function _scrollLimitX(renderer, scaleX, zoomTranslateX) {
        var width = renderer.dataAdapter.chartArea.width;
        var tx = zoomTranslateX;
        var graphs = renderer.dataAdapter.graphs;
        var padding = 0;

        for (var i = 0; i < graphs.length; i = i + 1) {
            var graph = graphs[i];
            var xScale = graph.xScale;
            if (graph.coordinates.length > 0) {
                var domainWidth = width / (((xScale.domain()[1] - xScale.domain()[0])) * scaleX);
                var maxX = padding;
                var minX = (-(((xScale.domain()[0] - xScale.domain()[1]) * scaleX) +
                        (xScale.range()[1] - (xScale.range()[1] - (width * (scaleX) / domainWidth)))) *
                        domainWidth) - padding;

                if (tx > maxX) {
                    tx = maxX;
                } else if (tx < minX) {
                    tx = minX;
                }
            }
        }
        return tx;
    }

    function _scrollLimitY(renderer, scaleY, zoomTranslateY) {
        var height = renderer.dataAdapter.chartArea.height;
        var ty = zoomTranslateY;
        var graphs = renderer.dataAdapter.graphs;

        var minYValue = renderer.dataAdapter.getYAxesMinimum();
        var maxYValue = renderer.dataAdapter.getYAxesMaximum();
        var padding = 0;

        for (var i = 0; i < graphs.length; i = i + 1) {
            var graph = graphs[i];
            var yScale = graph.yScale;

            if (graph.coordinates.length > 0) {

                // Calculation according to http://bl.ocks.org/garrilla/11280861
                var domainHeight = height / (((yScale.domain()[1] - yScale.domain()[0])) * scaleY);
                var maxY = ((((yScale.domain()[0] - yScale.domain()[1]) * scaleY) +
                        (maxYValue - minYValue)) * domainHeight * scaleY) + padding;
                var minY = (-(((yScale.domain()[0] - yScale.domain()[1]) * scaleY) +
                        (maxYValue - (maxYValue - (height * (scaleY) / domainHeight)))) *
                        domainHeight) - padding;

                if ((yScale.domain()[1] + ty) > maxYValue) {
                    ty = 0;
                } else if (ty > maxY) {
                    ty = maxY;
                } else if (ty < minY) {
                    ty = minY;
                }
            }
        }
        return ty;
    }

    function _getFirstXAxisScale(renderer) {
        for (var axisId in renderer.dataAdapter.xAxisAreas) {
            if (Object.prototype.hasOwnProperty.call(renderer.dataAdapter.xAxisAreas, axisId)) {
                return renderer.dataAdapter.xScales[axisId];
            }
        }
        return null;
    }

    function _getFirstYAxisScale(renderer) {
        for (var axisId in renderer.dataAdapter.yAxisAreas) {
            if (Object.prototype.hasOwnProperty.call(renderer.dataAdapter.yAxisAreas, axisId)) {
                return renderer.dataAdapter.yScales[axisId];
            }
        }
        return null;
    }

    function _createGraphs(renderer) {

        var graphGroups = renderer.svg.select('g.chart')
            .selectAll('g.graph')
            .data(renderer.dataAdapter.getGraphs())
            .enter()
            .append('g')
            .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + renderer.clipPathId + ')')
            .attr('class', 'graph');

        graphGroups.each(function (d) {

            var area = d3.svg.area();
            var graphWidget = renderer.widget.chartItems.yValues[d.id];
            d3.select(this)
                .attr('id', d.id + '_breaseChartYValueList')
                .append('path')
                .datum(d.coordinates)
                .attr('id', d.id + '_breaseChartYValueList_area')
                .attr('class', 'area')
                .style('stroke', 'none')
                .attr('pointer-events', 'none')
                .classed('disabled', !graphWidget.isEnabled())
                .classed('remove', graphWidget.isHidden)
                .attr('d', area(d.coordinates));

            var line = d3.svg.line();

            var path = d3.select(this).append('path')
                .attr('id', d.id + '_breaseChartYValueList_line')
                .attr('class', 'graph')
                .style('fill', 'none')
                .classed('disabled', !graphWidget.isEnabled())
                .classed('remove', graphWidget.isHidden)
                .attr('d', line(d.coordinates));

            var pathElem = path[0][0];
            $(pathElem).on(BreaseEvent.CLICK, graphWidget._bind('_clickHandler'));
        });
    }

    p._createGraphIntersectionPoints = function () {

        var renderer = this,
            chartArea = this.dataAdapter.getChartArea(),
            graphIntersectionPointGroups = this.svg.select('g.chart')
                .selectAll('g.intersectionPoints')
                .data(this.dataAdapter.getGraphIntersectionPoints())
                .enter()
                .append('g')
                .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + this.clipPathId + ')')
                .attr('class', 'intersectionPoints');

        graphIntersectionPointGroups.each(function (graphData) {
            var graphIntersectionPointElem = this;

            graphIntersectionPointElem.setAttribute('id', graphData.graphId + '_intersectionPoints');

            Object.keys(graphData.xCursors).forEach(function (xCursorId) {
                var currentXCursorData = graphData.xCursors[xCursorId],
                    y = renderer.dataAdapter
                        .yAxisAreas[currentXCursorData.yValueAxes]
                        .scale(currentXCursorData.yValues),
                    xCursorWidget = renderer.widget.chartItems.xCursors[xCursorId];

                d3.select(graphIntersectionPointElem)
                    .append('circle')
                    .attr('class', 'marker')
                    .attr('data-xCursorId', xCursorId)
                    .classed('active', currentXCursorData.markerActive)
                    .classed('disabled', !currentXCursorData.markerEnable)
                    .classed('remove', !currentXCursorData.markerVisible)
                    .attr('cx', renderer.dataAdapter.xAxisAreas[xCursorWidget.axisWidget.elem.id].scale(currentXCursorData.xValue))
                    .attr('cy', (y !== undefined && y !== null) ? y : chartArea.height)
                    .attr('r', currentXCursorData.markerSize / 2);

                //add click Event to intersectionPoint
                var cursorWidget = renderer.widget.chartItems.xCursors[xCursorId],
                    $intersectionEl = $(graphIntersectionPointElem)[0].children;
                for (var i = 0; i < $intersectionEl.length; i = i + 1) {
                    if ($intersectionEl[i].attributes[1].nodeValue === xCursorId) {
                        $($intersectionEl[i]).on(BreaseEvent.CLICK, cursorWidget._bind('_clickHandler'));
                    }
                }
            });
        });
    };

    function _updateGraphs(renderer) {

        var graphGroups = renderer.svg.select('g.chart')
            .selectAll('g.graph')
            .data(renderer.dataAdapter.getGraphs());

        graphGroups.each(function (d) {

            var yScale = d.yScale,
                xScale = d.xScale;

            if (d.isHidden) { return; }

            var area = d3.svg.area()
                .interpolate(d.interpolationType)
                .x(function (args) {
                    return xScale(args.x);
                })
                .y0(renderer.dataAdapter.chartArea.height)
                .y1(function (args) {
                    return yScale(args.y);
                });

            d3.select(this).selectAll('path.area')
                .attr('d', area(d.coordinates));

            var line = d3.svg.line()
                .interpolate(d.interpolationType)
                .x(function (args) {
                    return xScale(args.x);
                })
                .y(function (args) {
                    return yScale(args.y);
                });

            d3.select(this).selectAll('path.graph')
                .attr('d', line(d.coordinates));
        });
    }

    function _adjustZooming(renderer, zoomFactor, scrollFactor) {

        var mainZoomBehavior = renderer.mainZoomBehavior,
            chartArea = renderer.dataAdapter.getChartArea(),
            center = [chartArea.width / 2, chartArea.height / 2],
            viewOld = {
                x: mainZoomBehavior.translate()[0],
                y: mainZoomBehavior.translate()[1],
                s: mainZoomBehavior.scale()
            },
            translate = [
                (center[0] - viewOld.x) / viewOld.s,
                (center[1] - viewOld.y) / viewOld.s
            ],
            viewNew = {
                x: viewOld.x + chartArea.width * scrollFactor.x,
                y: viewOld.y + chartArea.height * scrollFactor.y,
                s: mainZoomBehavior.scale() * (zoomFactor)
            },
            translateOffset;

        if (viewNew.s < mainZoomBehavior.scaleExtent()[0]) {
            viewNew.s = mainZoomBehavior.scaleExtent()[0];
        } else if (viewNew.s > mainZoomBehavior.scaleExtent()[1]) {
            viewNew.s = mainZoomBehavior.scaleExtent()[1];
        }

        translateOffset = [translate[0] * viewNew.s + viewOld.x, translate[1] * viewNew.s + viewOld.y];

        viewNew.x += (center[0] - translateOffset[0]);
        viewNew.y += (center[1] - translateOffset[1]);

        mainZoomBehavior.scale(viewNew.s);
        mainZoomBehavior.translate([viewNew.x, viewNew.y]);

        _handleZooming(renderer);
    }

    function _createCursorDragBehavior(renderer) {

        var drag = d3.behavior.drag()
            .on('dragstart', function (d) {

                var xCursorId = d3.event.sourceEvent.target.getAttribute('data-xCursorId'),
                    xCursorWidget;

                d.currentXCursorId = (xCursorId) || d.id;

                xCursorWidget = renderer.widget.chartItems.xCursors[d.currentXCursorId];

                d3.event.sourceEvent.stopPropagation();

                if (!xCursorWidget._getActive()) {
                    xCursorWidget.axisWidget._setActiveCursor(d.currentXCursorId);
                }
            })
            .on('drag', function (d) {
                var scaleFactor = Utils.getChromeScale(renderer.widget.elem),
                    mousePosX = (d3.event.x / scaleFactor) + (renderer.dataAdapter.getChartArea().x / scaleFactor) - renderer.dataAdapter.getChartArea().x,
                    xCursorId = d.currentXCursorId;

                var xCursorWidget = (xCursorId) ? renderer.widget.chartItems.xCursors[xCursorId] : renderer.widget.chartItems.xCursors[xCursorId],
                    domain = xCursorWidget.axisWidget._xPositions(xCursorWidget.cursorType),
                    xCursorDrag = renderer.dataAdapter.xAxisAreas[xCursorWidget.axisWidget.elem.id].scale.invert(mousePosX),
                    currentXCursor = xCursorWidget._getValue(),
                    newXCursor;

                var idx = d3.bisectLeft(domain, xCursorDrag),
                    x0 = domain[Math.max(idx - 1, 0)],
                    // eslint-disable-next-line no-useless-call
                    x1 = domain[Math.min.apply(Math, [idx, domain.length - 1, renderer.dataAdapter.xAxisCursorAreas[xCursorWidget.elem.id].maxAvailableXPositionIndex])],
                    areGraphsVisible = false;
                for (var graph in xCursorWidget.graphWidgets) {
                    if (xCursorWidget.graphWidgets[graph].settings.visible) {
                        areGraphsVisible = true;
                    }
                }
                if (areGraphsVisible) {
                    newXCursor = (((+xCursorDrag) - (((+x1) + (+x0)) / 2) < 0)) ? x0 : x1;

                    if (newXCursor !== currentXCursor) {
                        xCursorWidget._updateValue(newXCursor);
                    }
                }

            })
            .on('dragend', function () {
            });

        return drag;
    }

    // eslint-disable-next-line no-unused-vars
    function _isValueDrawn(xCursorWidget, xValue) {
        for (var graph in xCursorWidget.graphWidgets) {
            if (Object.prototype.hasOwnProperty.call(xCursorWidget.graphWidgets, graph)) {
                var idx = xCursorWidget.graphWidgets[graph].getIndexOfXCoordinate(xValue);
                var numberOfSamples = xCursorWidget.graphWidgets[graph].getNumberOfSamples();
                if (numberOfSamples < 0 || (idx < numberOfSamples && idx >= 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    function _applyCursorDragBehavior(renderer) {

        var drag = _createCursorDragBehavior(renderer);

        renderer.svg.selectAll('g.xCursorArea')
            .each(function (d) {
                if (renderer.widget.chartItems.xCursors[d.id].isEnabled()) {
                    d3.select(this).call(drag);

                    var cursorMarkers = Array.from(document.querySelectorAll('circle.marker'))
                        .filter(function (markerElem) {
                            return markerElem.getAttribute('data-xCursorId') === d.id;
                        });

                    cursorMarkers.forEach(function (cursorMarkerElem) {
                        d3.select(cursorMarkerElem).call(drag);
                    });
                }
            });
    }

    function _xCursorStepLeft(renderer, xCursorId, stepSize) {

        var cursorWidget = renderer.widget.chartItems.xCursors[xCursorId],
            currentIdx = cursorWidget.axisWidget._xPositions(cursorWidget.cursorType).map(function (d) {
                return +d;
            }).indexOf(+cursorWidget._getValue()),
            newIdx;

        newIdx = ((currentIdx - stepSize) >= 0) ? currentIdx - stepSize : currentIdx;

        if (newIdx !== currentIdx) {
            renderer.widget.chartItems.xCursors[xCursorId]._updateValue(cursorWidget.axisWidget._xPositions(cursorWidget.cursorType)[newIdx]);
            _updateCursor(renderer);
        }
    }

    function _xCursorStepRight(renderer, xCursorId, stepSize) {

        var cursorWidget = renderer.widget.chartItems.xCursors[xCursorId],
            currentIdx = cursorWidget.axisWidget._xPositions(cursorWidget.cursorType).map(function (d) {
                return +d;
            }).indexOf(+cursorWidget._getValue()),
            newIdx;

        newIdx = ((currentIdx + stepSize) <= renderer.dataAdapter.xAxisCursorAreas[cursorWidget.elem.id].maxAvailableXPositionIndex) ? currentIdx + stepSize : currentIdx;

        if (newIdx !== currentIdx) {
            renderer.widget.chartItems.xCursors[xCursorId]._updateValue(cursorWidget.axisWidget._xPositions(cursorWidget.cursorType)[newIdx]);
            _updateCursor(renderer);
        }
    }

    function _xCursorDisableDrag(renderer, xCursorId) {
        var xCursorArea = renderer.svg.selectAll('g.xCursorArea')
                .filter(function (d) {
                    return (d.id === xCursorId) ? this : null;
                }),
            cursorMarkers = Array.from(document.querySelectorAll('circle.marker'))
                .filter(function (markerElem) {
                    return markerElem.getAttribute('data-xCursorId') === xCursorId;
                });

        xCursorArea.on('.drag', null);
        cursorMarkers.forEach(function (cursorMarker) {
            d3.select(cursorMarker).on('.drag', null);
        });
    }

    function _xCursorEnableDrag(renderer, xCursorId) {

        var xCursorArea = renderer.svg.selectAll('g.xCursorArea')
                .filter(function (d) {
                    return (d.id === xCursorId) ? this : null;
                }),
            cursorMarkers = Array.from(document.querySelectorAll('circle.marker'))
                .filter(function (markerElem) {
                    return markerElem.getAttribute('data-xCursorId') === xCursorId;
                }),
            drag = _createCursorDragBehavior(renderer);

        xCursorArea.call(drag);
        cursorMarkers.forEach(function (cursorMarker) {
            d3.select(cursorMarker).call(drag);
        });
    }

    function _tickFormat(format, d, axisType) {

        var numFormat;

        switch (axisType) {

            case 'dateTime':
                return Globalize.format(d, format);

            case 'secondsAsNumber':
                numFormat = d3.format('0.6f');
                return numFormat(d);

            default:
                var digits = (format.decimalPlaces === 0) ? format.minimumIntegerDigits : format.minimumIntegerDigits + format.decimalPlaces + 1;

                numFormat = d3.format('0' + ((d < 0) ? digits + 1 : digits) + '.' + format.decimalPlaces + 'f');

                return numFormat(d);
        }
    }

    return ModuleClass;
});

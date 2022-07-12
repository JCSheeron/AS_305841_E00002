var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../core/interfaces/components/ui/chart/chartInterface", "../common/widgetBase", "./helpers/chartRangeHelper", "../../framework/events", "./userInteraction/userInteractionController", "../../models/common/point", "../common/states/cursorStates", "./cursor/CursorPositionInfo", "./chartViewSerie", "../../common/seriesHelper", "./chartWrapper/SFChartWrapper", "../../models/chartManagerDataModel/eventScaleDataChangedArgs", "./componentDefaultDefinition", "../../common/componentBase/componentBase", "../../common/componentFactory/componentFactory", "../common/states/cursorType"], function (require, exports, chartInterface_1, widgetBase_1, chartRangeHelper_1, events_1, userInteractionController_1, point_1, cursorStates_1, CursorPositionInfo_1, chartViewSerie_1, seriesHelper_1, SFChartWrapper_1, eventScaleDataChangedArgs_1, componentDefaultDefinition_1, componentBase_1, componentFactory_1, cursorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartObjectType;
    (function (ChartObjectType) {
        ChartObjectType[ChartObjectType["cursor"] = 0] = "cursor";
        ChartObjectType[ChartObjectType["series"] = 1] = "series";
        ChartObjectType[ChartObjectType["axis"] = 2] = "axis";
        ChartObjectType[ChartObjectType["chartSpace"] = 3] = "chartSpace";
        ChartObjectType[ChartObjectType["emptySpace"] = 4] = "emptySpace";
        ChartObjectType[ChartObjectType["invalid"] = 5] = "invalid";
    })(ChartObjectType || (ChartObjectType = {}));
    exports.ChartObjectType = ChartObjectType;
    var DropLocationType;
    (function (DropLocationType) {
        DropLocationType[DropLocationType["addNewScale"] = 0] = "addNewScale";
        DropLocationType[DropLocationType["assignToScale"] = 1] = "assignToScale";
        DropLocationType[DropLocationType["invalid"] = 2] = "invalid";
    })(DropLocationType || (DropLocationType = {}));
    exports.DropLocationType = DropLocationType;
    var ChartObjectInformation = /** @class */ (function () {
        function ChartObjectInformation(chartObjectType, args) {
            this.chartObjectType = chartObjectType;
            this.args = args;
        }
        return ChartObjectInformation;
    }());
    exports.ChartObjectInformation = ChartObjectInformation;
    var EventUserChartInteraction = /** @class */ (function (_super) {
        __extends(EventUserChartInteraction, _super);
        function EventUserChartInteraction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventUserChartInteraction;
    }(events_1.TypedEvent));
    exports.EventUserChartInteraction = EventUserChartInteraction;
    ;
    var EventUserChartInteractionArgs = /** @class */ (function () {
        function EventUserChartInteractionArgs(chartInteractionType, eventArguments) {
            this.chartInteractionType = chartInteractionType;
            this.eventArguments = eventArguments;
        }
        return EventUserChartInteractionArgs;
    }());
    exports.EventUserChartInteractionArgs = EventUserChartInteractionArgs;
    var EventRedrawAllCharts = /** @class */ (function (_super) {
        __extends(EventRedrawAllCharts, _super);
        function EventRedrawAllCharts() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventRedrawAllCharts;
    }(events_1.TypedEvent));
    exports.EventRedrawAllCharts = EventRedrawAllCharts;
    ;
    var EventRedrawAllChartsArgs = /** @class */ (function () {
        function EventRedrawAllChartsArgs(chartType) {
            this.chartType = chartType;
        }
        return EventRedrawAllChartsArgs;
    }());
    exports.EventRedrawAllChartsArgs = EventRedrawAllChartsArgs;
    var EventSeriesAdded = /** @class */ (function (_super) {
        __extends(EventSeriesAdded, _super);
        function EventSeriesAdded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSeriesAdded;
    }(events_1.TypedEvent));
    exports.EventSeriesAdded = EventSeriesAdded;
    ;
    var ChartBase = /** @class */ (function (_super) {
        __extends(ChartBase, _super);
        function ChartBase(parentView, name, scale) {
            var _this = _super.call(this) || this;
            _this.widgetName = "";
            _this.textMeasurementCanvasId = "textMeasurementCanvas";
            _this.series = [];
            _this.hoveredSeries = [];
            _this.scales = [];
            //private keyEventsPlaced = false;
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            _this.cursorHoverDistance = 8;
            _this.draggedSeriesIndex = 0;
            _this.axisBounds = [];
            _this.xAxisWidth = 0;
            _this.yAxisAlignmentOffset = 0;
            _this.flaggedForResize = false;
            if (_this.component == undefined) {
                // TODO: component should be set by component factory when charts can be created with component factory
                _this.component = new componentBase_1.ComponentBase(componentFactory_1.ComponentFactory.getInstance(), _this);
                _this.initializeComponent();
                _this.component.addDefaultComponentSettings();
            }
            _this.component.type = "ChartBase"; // TODO: Remove when chartbase(xychart, fftchart, ytchart) will be created with the component factory
            _this.component.id = name;
            _this.parentView = parentView;
            _this.widgetName = name;
            _this.scales = scale;
            _this.eventUserChartInteraction = new EventUserChartInteraction();
            _this.eventRedrawAllCharts = new EventRedrawAllCharts();
            _this.eventSeriesAdded = new EventSeriesAdded();
            return _this;
        }
        Object.defineProperty(ChartBase.prototype, "axisDropZoneId", {
            /**
             * Returns the id for the axis dropZone
             *
             * @readonly
             * @private
             * @type {string}
             * @memberof ChartBase
             */
            get: function () {
                return this.mainDivId + '_axisDropZone';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartBase.prototype, "axisDropZoneChartAreaId", {
            /**
             * Returns the id for the axis chart area dropZone
             *
             * @readonly
             * @protected
             * @type {string}
             * @memberof ChartBase
             */
            get: function () {
                return this.axisDropZoneId + '_chartArea';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Destroy object
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.dispose = function () {
            // TODO: Dispose of CursorStates must be done globaly
            this.cursorsStates.dispose();
            var chartObj = $(this.mainDiv).data("ejChart");
            if (chartObj != undefined) {
                chartObj.destroy();
            }
            else {
                // TODO: dispose of this widget is called from splitter and also from the chartViewChartManager
                //console.warn("Dispose of chartObj(== undefined) not possible!");
            }
            _super.prototype.dispose.call(this);
        };
        ChartBase.prototype.initialized = function () {
            var _this = this;
            _super.prototype.initialized.call(this);
            for (var _i = 0, _a = this.scales; _i < _a.length; _i++) {
                var scale = _a[_i];
                this.addSeriesToChart(scale.childs, scale, false);
            }
            var newChart = new SFChartWrapper_1.SFChartWrapper(this.mainDiv, this.scales, this.primaryXAxisName);
            newChart.eventAxisRangeChanged.attach(function (sender, args) { return _this.onAxisRangeChanged(sender, args); });
            newChart.eventMouseAction.attach(function (sender, args) { return _this.onMouseAction(sender, args); });
            newChart.eventMouseWheel.attach(function (sender, args) { return _this.onChartMouseWheel(sender, args); });
            this.chartInstance = newChart._SFChart;
            this.chart = newChart;
            this.setBoxZoom(false);
        };
        ChartBase.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        Object.defineProperty(ChartBase.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {TCursorStates}
             * @memberof ChartBase
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartBase
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateUICursors(cursorStates);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor states.
         *
         * @protected
         * @param {CursorStates} cursorStates
         * @memberof ChartBase
         */
        ChartBase.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        ChartBase.prototype.onAxisRangeChanged = function (sender, args) {
            for (var i = 0; i < args.axisIDs.length; i++) {
                var scale = void 0;
                //Workaround until X-Axis handling is implemented correct
                if (args.axisIDs[i] != this.primaryXAxisName) {
                    scale = this.getScaleByScaleId(args.axisIDs[i]);
                }
                else {
                    scale = this.scales[0];
                }
                if (scale != undefined) {
                    var axis = sender;
                    var range = axis.getAxisRange();
                    if (axis.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                        this.setScaleRange(scale, range.min, range.max, scale.minYValue, scale.maxYValue, "", false);
                        if (args.syncAxis == true) {
                            this.eventRedrawAllCharts.raise(this, new EventRedrawAllChartsArgs(this.type));
                        }
                    }
                    else {
                        this.setScaleRange(scale, scale.minXValue, scale.maxXValue, range.min, range.max, "", false);
                    }
                }
            }
            if (args.forceRedraw == true) {
                this.redrawChart();
            }
        };
        /**
         *
         *
         * @param {number} mouseX
         * @param {number} mouseY
         * @returns {ChartObjectInformation}
         * @memberof ChartBase
         */
        ChartBase.prototype.getChartObjectUnderMouse = function (mouseX, mouseY) {
            this.calculateChartDimensions();
            if (this.mouseIsInChartBounds(mouseX, mouseY)) {
                var index = this.cursorsStates.getHoveredCursorIndex();
                if (index !== -1) {
                    //TODO: might be better to use cursor instance instead of index
                    return new ChartObjectInformation(ChartObjectType.cursor, { cursorIndex: index });
                }
                return new ChartObjectInformation(ChartObjectType.chartSpace, {});
            }
            for (var i = 0; i < this.axisBounds.length; i++) {
                if ((mouseX - this.axisBounds[i].x) < (this.axisBounds[i].width) && mouseX > this.axisBounds[i].x) {
                    if ((mouseY - this.axisBounds[i].y) < (this.axisBounds[i].height) && mouseY > this.axisBounds[i].y) {
                        var axis = this.chart.getAxis(this.axisBounds[i].axis.name);
                        return new ChartObjectInformation(ChartObjectType.axis, { axis: axis });
                    }
                }
            }
            return new ChartObjectInformation(ChartObjectType.emptySpace, {});
        };
        /**
         *
         *
         * @private
         * @memberof ChartBase
         */
        ChartBase.prototype.calculateChartDimensions = function () {
            this.axisBounds = [];
            for (var i = 0; i < this.scales.length; i++) {
                var axis_1 = this.chart.getAxis(this.scales[i].id);
                if (axis_1 != undefined) {
                    this.axisBounds.push(axis_1.getAxisBounds());
                }
            }
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                this.axisBounds.push(axis.getAxisBounds());
            }
        };
        ChartBase.prototype.onMouseAction = function (sender, args) {
            switch (args.mouseActionType) {
                case userInteractionController_1.MouseActionType.mouseDown: {
                    this.onChartMouseDown(sender, args);
                    break;
                }
                case userInteractionController_1.MouseActionType.mouseUp: {
                    this.onChartMouseUp(sender, args);
                    break;
                }
                case userInteractionController_1.MouseActionType.mouseMove: {
                    this.onChartMouseMove(sender, args);
                    break;
                }
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseDown = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePointChart.x, args.mousePointChart.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseDown, args);
            eventUserChartInteractionArgs.eventArguments.hoveredSeries = this.hoveredSeries;
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseUp = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePointChart.x, args.mousePointChart.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseUp, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseMove = function (sender, args) {
            var chartObjectUnderMouse = this.getChartObjectUnderMouse(args.mousePointChart.x, args.mousePointChart.y);
            args.objectUnderMouse = chartObjectUnderMouse;
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseMove, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         * This method is called by the InteractionStratetgies when a click in the
         * chart has been made.
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.setCursorOnPointerPosition = function (mousePoint) {
            this.setCursor(mousePoint.x, mousePoint.y);
            this.checkCursorsHovering(mousePoint);
        };
        /**
         * Internal method for actually moving the cursors. Overwritten in FFTChart.ts
         *
         * @protected
         * @param {number} x
         * @param {number} y
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.setCursor = function (x, y) {
            if (!this.series.length) {
                return;
            }
            this.cursorsStates.setLastCursorTypeSelected(cursorType_1.CursorType.timeDomain);
            var hoveredCursorIndex = this.cursorsStates.getHoveredCursorIndex();
            if (hoveredCursorIndex != -1) { // Set selected cursor when hovered cursor was found
                this.cursorsStates.setSelected(hoveredCursorIndex, true);
            }
            else {
                this.cursorsStates.setSelected(this.cursorsStates.getSelectedCursorIndex(), true);
            }
            this.updateSelectedCursor(x, y);
        };
        /**
         * Pass the x and y position on the property and this method will figure out where to
         * place the cursors and update the states accordingly
         *
         * @protected
         * @param {CursorStates} cursorsStates
         * @param {number} x
         * @param {number} y
         * @memberof ChartBase
         */
        ChartBase.prototype.updateSelectedCursor = function (x, y) {
            var point = this.getChartCoordinateFromPixel(this.primaryXAxisName, this.scales[0].id, x, y);
            var nearestTimestampFromAllSeries = this.getTimestampInSeries(point, this.series);
            this.cursorsStates.setActive(this.cursorsStates.getSelectedCursorIndex(), true);
            this.cursorsStates.setPosition(this.cursorsStates.getSelectedCursorIndex(), nearestTimestampFromAllSeries);
            this.cursorsStates.setHovered(this.cursorsStates.getSelectedCursorIndex(), this.getSerieCursorType(), false);
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         * Internal method for actually moving the cursors. Pass the x and y
         * position on the property and this method will figure out where to
         * place the cursors and update the states accordingly
         *
         * @private
         * @param {number} x
         * @param {number} y
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.dragCursorAlongLine = function (x, y, hoverdSeries) {
            if (!this.series.length) {
                return;
            }
            if (hoverdSeries.length != 0) {
                var point = this.getChartCoordinateFromPixel(this.primaryXAxisName, this.scales[0].id, x, y);
                var nearestTimestampFromSingleSeries = this.getTimestampInSeries(point, hoverdSeries);
                this.cursorsStates.setPosition(this.cursorsStates.getSelectedCursorIndex(), nearestTimestampFromSingleSeries);
            }
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         * This method is called by the userInteraction stragetgy whenever
         * the mouse is moved across a chart. If the mouse is above a cursor
         * this cursor updates it's own state to HOVERING and once it is no
         * longer below the mouse it will reset to it's previous state
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.checkCursorsHovering = function (mousePoint) {
            if (this.cursorHandler != undefined) {
                var chartArea = this.chart.getChartArea();
                var actualMousePoint = new point_1.Point(mousePoint.x - chartArea.x, mousePoint.y - chartArea.y);
                var selectedCursorIndex = this.cursorsStates.getSelectedCursorIndex();
                var closestCursorPosition = this.cursorHandler.getClosestCursorPositionToPoint(actualMousePoint, selectedCursorIndex);
                if (closestCursorPosition != undefined) {
                    var distanceToCursor = closestCursorPosition.additionalInformation["distance"];
                    var currentlyHoveredSeries = this.hoveredSeries;
                    this.hoveredSeries = [];
                    var closestCursorIndex = void 0;
                    if (distanceToCursor < this.cursorHoverDistance) {
                        closestCursorPosition.additionalInformation["highlight"] = true;
                        closestCursorIndex = closestCursorPosition.additionalInformation["cursorIndex"];
                        this.hoveredSeries = closestCursorPosition.additionalInformation["series"];
                        //as the cursor state is not updated when the hoveredSeries change, the redraw has to be called manually
                        if (!this.seriesArrayEqualsSeriesArray(currentlyHoveredSeries, this.hoveredSeries)) {
                            this.updateUICursors(this.cursorsStates);
                        }
                    }
                    this.updateHoveringStatesInCursors(this.cursorsStates, closestCursorIndex);
                    this.updateCursorStates(this.cursorsStates);
                }
            }
        };
        /**
         * check if two arrays of type ChartViewSerie[] contain the exact same order of series by id
         *
         * @private
         * @param {ChartViewSerie[]} seriesArray1
         * @param {ChartViewSerie[]} seriesArray2
         * @returns {boolean}
         * @memberof ChartBase
         */
        ChartBase.prototype.seriesArrayEqualsSeriesArray = function (seriesArray1, seriesArray2) {
            if (seriesArray1.length != seriesArray2.length) {
                return false;
            }
            for (var i = 0; i < seriesArray1.length; i++) {
                if (seriesArray1[i].id != seriesArray2[i].id) {
                    return false;
                }
            }
            return true;
        };
        ChartBase.prototype.getSerieCursorType = function () {
            if (this.series.length > 0) {
                return cursorType_1.CursorTypeHelper.getCursorTypeForSeries(this.series[0].serie);
            }
            else {
                return undefined;
            }
        };
        /**
         * Reset cursor states with the given cursor type
         *
         * @param {CursorType} cursorType
         * @memberof ChartBase
         */
        ChartBase.prototype.resetCursorStates = function (cursorType) {
            this.cursorsStates.resetCursorStates(cursorType);
        };
        /**
         * Reset hovering of all cursors when mouse is outside of the charts
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.resetCursorsHovered = function () {
            var hoveredCursor = this.cursorsStates.getHoveredCursorIndex();
            //If any cursor is hovered, reset all
            if (hoveredCursor !== -1) {
                this.hoveredSeries = [];
                this.updateHoveringStatesInCursors(this.cursorsStates, undefined);
                this.updateCursorStates(this.cursorsStates);
            }
        };
        /**
         * Internal method to calculate the state which is to be updated in the
         * states to be HOVERING. This method will also reset the correct states
         * to it's previous values if non of the cursors are hovering.
         *
         * @private
         * @param {CursorStates} cursorStates
         * @param {number} closestIndex
         * @returns {CursorStates}
         * @memberof ChartBase
         */
        ChartBase.prototype.updateHoveringStatesInCursors = function (cursorStates, closestIndex) {
            if (closestIndex !== undefined) {
                // Index of cursor found => set hovered flag
                cursorStates.setHovered(closestIndex, this.getSerieCursorType(), true);
            }
            else {
                // No index of cursor found => reset all hovered flags of all cursors
                cursorStates.setHovered(-1, this.getSerieCursorType(), false);
            }
            return cursorStates;
        };
        /**
         * Calculate zoom on mousewheel action
         *
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseWheel = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePoint.x, args.mousePoint.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseWheel, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         * Get if mouse is inside chart bounds
         *
         * @private
         * @param {*} mouseX
         * @param {*} mouseY
         * @returns {boolean}
         * @memberof ChartBase
         */
        ChartBase.prototype.mouseIsInChartBounds = function (mouseX, mouseY) {
            var isInBounds = true;
            var chartArea = this.chart.getChartArea();
            if (mouseX < chartArea.x || mouseX > (chartArea.x + chartArea.width)) {
                isInBounds = false;
            }
            if (mouseY < chartArea.y || mouseY > (chartArea.y + chartArea.height)) {
                isInBounds = false;
            }
            return isInBounds;
        };
        /**
         * Resize chart
         *
         * @param {*} width
         * @param {*} height
         * @memberof ChartBase
         */
        ChartBase.prototype.resize = function (width, height) {
            this.resizeChart(height, width);
        };
        /**
         * Resize Chart only if needed
         *
         * @private
         * @param {*} width
         * @param {*} height
         * @param {*} width
         * @memberof ChartBase
         */
        ChartBase.prototype.resizeChart = function (height, width) {
            if (this.flaggedForResize || this._actualHeight != height || this._actualWidth != width) {
                this._actualHeight = height, this._actualWidth = width;
                width = width - this.yAxisAlignmentOffset;
                this.chart.resize(height, width);
                this.redrawChart();
            }
        };
        /**
         * Redraws chart
         *
         * @param {boolean}
         * @memberof ChartBase
         */
        ChartBase.prototype.redrawChart = function () {
            this.chart.redraw();
            if (this.cursorHandler != undefined) {
                this.cursorHandler.updateChartArea(this.chart.getChartArea());
            }
            this.repositionCursors();
        };
        /**
         * Adds a given serie into a chart
         *
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @memberof ChartBase
         */
        ChartBase.prototype.addSeriesToChart = function (series, yScale, updateRangeX) {
            for (var i = 0; i < series.length; i++) {
                if (series[i].rawPointsValid == true && this.series.map(function (e) { return e.serie; }).indexOf(series[i]) == -1) {
                    var chartSeries = new chartViewSerie_1.ChartViewSerie(series[i], yScale);
                    this.series.push(chartSeries);
                }
                this.eventSeriesAdded.raise(this, series[i]);
            }
        };
        /**
         * Remove a given serie from the chart
         *
         * @param {BaseSeries} serie
         * @param {boolean} resetCursorStates
         * @memberof ChartBase
         */
        ChartBase.prototype.removeSerieFromChart = function (serie, resetCursorStates) {
            var index = this.serieInChart(serie);
            var cursorType = this.getSerieCursorType();
            if (index > -1) {
                this.series.splice(index, 1);
            }
            this.setAvailableSeriesAsDataSource();
            //Reset cursor states if there are no more series in the chartView with the corresponding cursor type
            if (resetCursorStates) {
                this.resetCursorStates(cursorType);
            }
            //redraw cursors
            var states = this.getUsedCursorStates();
            for (var i = 0; i < states.length; i++) {
                var timestamp = states[i].position;
                this.drawCursor(timestamp, i, states[i].hovered, states[i].selected);
            }
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} serie
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.serieInChart = function (serie) {
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i].id == serie.id) {
                    return i;
                }
            }
            return -1;
        };
        ChartBase.prototype.setZoomAxes = function (zoomAxes) {
            this.chart.setZoomDirection(zoomAxes);
        };
        ChartBase.prototype.setPanning = function (enable) {
            this.chart.enablePanning(enable);
        };
        /**
         * Panning operation
         *
         * @param {*} pageX
         * @param {*} pageY
         * @memberof ChartBase
         */
        ChartBase.prototype.doPanning = function (pageX, pageY) {
            this.chart.doPanning(pageX, pageY);
            this.eventRedrawAllCharts.raise(this, new EventRedrawAllChartsArgs(this.type));
        };
        ChartBase.prototype.resetPanningCoords = function () {
            //TODO: this is a only workaround, needs to be fixed 
            this.chart.prevPanningCoords = { 'x': undefined, 'y': undefined };
        };
        /**
         * Enables box zooming
         *
         * @param {boolean} enable
         * @memberof ChartBase
         */
        ChartBase.prototype.setBoxZoom = function (enable) {
            this.chart.enableBoxZoom(enable);
        };
        /**
         *Draw the cursor defined by its index for a given timestamp
         *
         * @private
         * @param {number} timestamp
         * @param {number} cursorIndex
         * @param {boolean} hovered
         * @param {boolean} selected
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.drawCursor = function (timestamp, cursorIndex, hovered, selected) {
            if (this.cursorHandler != undefined) {
                var leadCursorPixelPosition = void 0;
                var leadCursorTimestamp = void 0;
                //the cursorPosition for each serie is stored in an array
                var cursorPositions = [];
                //if the given timestamp is outside of the series bounds, the cursor must not be drawn at all
                var cursorOutOfSeriesBounds = true;
                for (var seriesIndex = 0; seriesIndex < this.series.length; seriesIndex++) {
                    if (timestamp >= this.series[seriesIndex].serie.timestamps[0] && timestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                        cursorOutOfSeriesBounds = false;
                    }
                }
                if (cursorOutOfSeriesBounds == false) {
                    //leadCursorPosition has to be converted to pixels to be drawn
                    leadCursorPixelPosition = this.getPixelsFromChartPoint(timestamp, 0, this.primaryYAxisName);
                    //leadCursorTimestamp is needed to calculate the cursor positions for the other series (might be different from the timestamp argument)
                    leadCursorTimestamp = timestamp; //this.getTimestampInSeries(leadCursorChartPoint, allSeries);
                    //the cursor positions are calculated for each series to draw the squares for the timestamp indicator
                    cursorPositions = [];
                    for (var seriesIndex = 0; seriesIndex < this.series.length; seriesIndex++) {
                        //only draw the cursor for a series when it is within the series bounds of that chart
                        if (leadCursorTimestamp >= this.series[seriesIndex].serie.timestamps[0] && leadCursorTimestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                            var cursorChartPoint = this.getCursorPoint(timestamp, this.series, seriesIndex);
                            var scaleId = this.getScaleIDForSeries(this.series[seriesIndex].serie);
                            var cursorPosition = this.getPixelsFromChartPoint(cursorChartPoint.x, cursorChartPoint.y, scaleId);
                            //set highlight to true if cursor is hovered and if its series is currently selected
                            var highlightCursor = false;
                            if (this.hoveredSeries.indexOf(this.series[seriesIndex]) != -1 && hovered && (this.series.length != this.hoveredSeries.length || this.hoveredSeries.length == 1)) {
                                highlightCursor = true;
                            }
                            cursorPositions.push(new CursorPositionInfo_1.CursorPosition(cursorPosition, { selected: selected, hovered: hovered, highlight: highlightCursor, series: [this.series[seriesIndex]], cursorIndex: cursorIndex }));
                        }
                    }
                }
                var leadCursorPosition = new CursorPositionInfo_1.CursorPosition(leadCursorPixelPosition, { selected: selected, hovered: hovered, series: this.series, cursorIndex: cursorIndex });
                this.cursorHandler.drawCursor(leadCursorPosition, cursorPositions, cursorIndex);
            }
        };
        ChartBase.prototype.getScaleIDForSeries = function (series) {
            for (var i = 0; i < this.scales.length; i++) {
                if (this.scales[i].hasSerie(series)) {
                    return this.scales[i].id;
                }
            }
            return "";
        };
        ChartBase.prototype.getScaleByScaleId = function (scaleId) {
            for (var i = 0; i < this.scales.length; i++) {
                if (scaleId == this.scales[i].id) {
                    return this.scales[i];
                }
            }
        };
        ChartBase.prototype.autoScaleYScales = function () {
            var scales = this.getYScales();
            var chartMinYPixel;
            var chartMaxYPixel;
            for (var _i = 0, scales_1 = scales; _i < scales_1.length; _i++) {
                var scale = scales_1[_i];
                var seriesMinY = this.getSeriesMinYForScale(scale);
                var seriesMaxY = this.getSeriesMaxYForScale(scale);
                if (seriesMinY != undefined && seriesMaxY != undefined) {
                    var axisMinYPixel = this.calculatePixelY(scale.id, seriesMinY);
                    var axisMaxYPixel = this.calculatePixelY(scale.id, seriesMaxY);
                    if (chartMinYPixel == undefined || axisMinYPixel > chartMinYPixel) {
                        chartMinYPixel = axisMinYPixel;
                    }
                    if (chartMaxYPixel == undefined || axisMaxYPixel < chartMaxYPixel) {
                        chartMaxYPixel = axisMaxYPixel;
                    }
                }
            }
            if (chartMinYPixel != undefined && chartMaxYPixel != undefined) {
                for (var _a = 0, scales_2 = scales; _a < scales_2.length; _a++) {
                    var scale = scales_2[_a];
                    var newAxisMinValue = this.getChartCoordinateFromPixel(this.primaryXAxisName, scale.id, 0, chartMinYPixel).y;
                    var newAxisMaxValue = this.getChartCoordinateFromPixel(this.primaryXAxisName, scale.id, 0, chartMaxYPixel).y;
                    this.updateRangeY(scale, newAxisMinValue, newAxisMaxValue);
                }
            }
        };
        /**
         * Sets the range for X Axis
         *
         * @param {number} newMinX
         * @param {number} newMaxX
         * @memberof ChartBase
         */
        ChartBase.prototype.setRangeX = function (newMinX, newMaxX) {
            this.scales[0].minXValue = newMinX;
            this.scales[0].maxXValue = newMaxX;
            //Trigger event so axis range can be persisted when 'AutoScale' or 'Reset All'  
            var args = new eventScaleDataChangedArgs_1.EventScaleDataChangedArgs(eventScaleDataChangedArgs_1.ScaleAction.xRangeChanged, { scale: this.scales[0] });
            this.scales[0].eventDataChanged.raise(this.scales[0], args);
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                axis.setAxisRange({ min: newMinX, max: newMaxX });
            }
        };
        /**
         *  Sets the range of this chart for the given axis and min/max values
         *
         *
         * @param {Scale} scale
         * @param {number} minXValue
         * @param {number} maxXValue
         * @param {number} minYValue
         * @param {number} maxYValue
         * @param {boolean} [setAxisRange=true]
         * @memberof ChartBase
         */
        ChartBase.prototype.setScaleRange = function (scale, minXValue, maxXValue, minYValue, maxYValue, orientation, setAxisRange) {
            if (setAxisRange === void 0) { setAxisRange = true; }
            scale.setScaleRange(minXValue, maxXValue, minYValue, maxYValue);
            if (setAxisRange) {
                var axis = this.chart.getAxis(scale.id);
                if (axis != undefined) {
                    axis.setAxisRange({ min: scale.minYValue, max: scale.maxYValue });
                }
            }
        };
        /**
         * Update Y range
         *
         * @private
         * @param {Scale} scale
         * @param {number} yAxisMaxValue
         * @param {number} yAxisMinValue
         * @memberof ChartBase
         */
        ChartBase.prototype.updateRangeY = function (scale, yAxisMinValue, yAxisMaxValue) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper;
            if (!isNaN(yAxisMaxValue) || !isNaN(yAxisMinValue)) {
                yAxisMaxValue = Number(yAxisMaxValue.toPrecision(14));
                yAxisMinValue = Number(yAxisMinValue.toPrecision(14));
                var yAxisRange = yAxisMaxValue - yAxisMinValue;
                var yAxisOffset = void 0;
                if (yAxisRange == 0) {
                    //if range is zero, we have to calculate an arbitrary offset to display the y axis correctly
                    yAxisOffset = chartRangeHelper.getAxisOffsetForStraightLines(yAxisMinValue);
                }
                else {
                    var axis = this.chart.getAxis(scale.id);
                    if (axis != undefined) {
                        var pixelRange = axis.getAxisRangeInPixel();
                        yAxisOffset = chartRangeHelper.getAxisOffset(yAxisRange, (pixelRange.max - pixelRange.min));
                    }
                }
                yAxisMaxValue += yAxisOffset;
                yAxisMinValue -= yAxisOffset;
                yAxisRange = yAxisMaxValue - yAxisMinValue;
                this.setScaleRange(scale, scale.minXValue, scale.maxXValue, yAxisMinValue, yAxisMaxValue);
            }
        };
        /**
         * Get min Y value from all the series in the chart
         *
         * @private
         * @param {Scale} scale
         * @returns {(number|undefined)}
         * @memberof ChartBase
         */
        ChartBase.prototype.getSeriesMinYForScale = function (scale) {
            var minY = undefined;
            for (var i = 0; i < scale.childs.length; i++) {
                if (minY == undefined || scale.childs[i].minY < minY) {
                    minY = scale.childs[i].minY;
                }
            }
            return minY;
        };
        /**
         * Get max Y value from all the series on the axis
         *
         * @private
         * @param {Scale} scale
         * @returns {(number|undefined)}
         * @memberof ChartBase
         */
        ChartBase.prototype.getSeriesMaxYForScale = function (scale) {
            var maxY = undefined;
            for (var i = 0; i < scale.childs.length; i++) {
                if (maxY == undefined || scale.childs[i].maxY > maxY) {
                    maxY = scale.childs[i].maxY;
                }
            }
            return maxY;
        };
        /**
         * Updates the available ui cursors according to the current state in response to a state change.
         *
         * @private
         * @param {CursorStates} modifiedState
         * @memberof ChartBase
         */
        ChartBase.prototype.updateUICursors = function (modifiedState) {
            try {
                var serieCursorType = this.getSerieCursorType();
                var cursorTimeStates = modifiedState.getTimeStates();
                var cursorFreqStates = modifiedState.getFrequencyStates();
                if (serieCursorType == cursorType_1.CursorType.timeDomain) {
                    this.updateCursorLoations(cursorTimeStates);
                }
                else if (serieCursorType == cursorType_1.CursorType.frequencyDomain) {
                    this.updateCursorLoations(cursorFreqStates);
                }
            }
            catch (error) {
                // the try catch block fixes an incorrect sequence when closing and reopening the analysis view as a workaround until
                // the binding connections will be cleaned up correctly.
                console.warn("ChartBase.updateUICursors: cursors could not be updated because of exception %o", error);
            }
        };
        ChartBase.prototype.updateCursorLoations = function (cursorStates) {
            for (var index = 0; index < cursorStates.length; index++) {
                // this.setCursorState(index, cursorStates[index]);
                // update the cursors only if they have a valid position
                var position = cursorStates[index].position;
                if (position != undefined) {
                    this.drawCursor(position, index, cursorStates[index].hovered, cursorStates[index].selected);
                }
            }
        };
        /**
         *
         *
         * @private
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.getMinXAxisValue = function () {
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                return axis.getAxisRange().min;
            }
        };
        /**
         *
         *
         * @private
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.getMaxXAxisValue = function () {
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                return axis.getAxisRange().max;
            }
        };
        /**
         *
         *
         * @private
         * @param {number} x
         * @param {number} y
         * @returns {{ x: number, y: number}}
         * @memberof ChartBase
         */
        ChartBase.prototype.getPixelsFromChartPoint = function (x, y, scaleID) {
            var chartArea = this.chart.getChartArea();
            return { x: this.calculatePixelX(x) - chartArea.x, y: this.calculatePixelY(scaleID, y) - chartArea.y };
        };
        /**
         * We reposition the cursors aswell when we update the chart
         *
         * @private
         * @memberof ChartBase
         */
        ChartBase.prototype.repositionCursors = function () {
            // Force updating the cursors states which in response updates the cursor ui ....
            //this.updateCursorStates(this.cursorsStates);
            this.updateUICursors(this.cursorsStates);
        };
        /**
         *
         *
         * @private
         * @param {number} chartX
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.calculatePixelX = function (chartX) {
            var minX = this.getMinXAxisValue();
            var maxX = this.getMaxXAxisValue();
            if (maxX != undefined && minX != undefined) {
                var range = (maxX - minX);
                var startX = minX;
                var actualRange = range;
                var timePercentage = (chartX - startX) / actualRange;
                var chartArea = this.chart.getChartArea();
                return chartArea.x + chartArea.width * timePercentage;
            }
            return 0;
        };
        /**
         *
         *
         * @private
         * @param {number} chartY
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.calculatePixelY = function (scaleID, chartY) {
            var axis = this.chart.getAxis(scaleID);
            if (axis != undefined) {
                var axisRange = axis.getAxisRange();
                var range = void 0;
                if (axisRange.delta != undefined) {
                    range = axisRange.delta;
                }
                else {
                    range = axisRange.max - axisRange.min;
                }
                var startY = axisRange.min;
                var valuePercentage = 1 - ((chartY - startY) / range);
                var chartArea = this.chart.getChartArea();
                return chartArea.y + chartArea.height * valuePercentage;
            }
            return 0;
        };
        /**
         * Remove drop locations from the chart
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.removeSerieDropLocations = function () {
            var chartDiv = $(this.mainDiv);
            for (var _i = 0, _a = this.axisBounds; _i < _a.length; _i++) {
                var axisBound = _a[_i];
                var dropZoneDiv_1 = chartDiv.find("#" + this.axisDropZoneId + axisBound.axis.name);
                dropZoneDiv_1.remove();
            }
            var dropZoneDiv = chartDiv.find("#" + this.axisDropZoneId + "_chartArea");
            dropZoneDiv.remove();
        };
        /**
         * Get number of y axes inside a chart
         *
         * @returns {number}
         * @memberof ChartBase
         */
        ChartBase.prototype.getNumberOfYScales = function () {
            return this.scales.length;
        };
        /**
         * Get all y axes from a chart
         *
         * @returns {Scale[]}
         * @memberof ChartBase
         */
        ChartBase.prototype.getYScales = function () {
            return this.scales;
        };
        /**
         *
         *
         * @protected
         * @param {number} pixelCoordinateX
         * @param {number} pixelCoordinateY
         * @returns
         * @memberof XYChart
         */
        ChartBase.prototype.getChartCoordinateFromPixel = function (scaleIDX, scaleIDY, pixelCoordinateX, pixelCoordinateY) {
            var chartArea = this.chart.getChartArea();
            var xAxis = this.chart.getAxis(scaleIDX);
            var yAxis = this.chart.getAxis(scaleIDY);
            var yAxisRange = yAxis.getAxisRange();
            var xAxisRange = xAxis.getAxisRange();
            // X Axis: 
            var relativePixelCoordinateX = Big(pixelCoordinateX).minus(Big(chartArea.x));
            var chartAxisXRange = Big(xAxisRange.max).minus(Big(xAxisRange.min));
            var chartCoordinatePerPixel = chartAxisXRange.div(Big(chartArea.width));
            var closestXAxisValueToClick = Big(xAxisRange.min).plus((relativePixelCoordinateX.times(chartCoordinatePerPixel)));
            // Y Axis: 
            var relativePixelCoordinateY = Big(pixelCoordinateY).minus(Big(chartArea.y));
            var chartAxisYRange = Big(yAxisRange.max).minus(Big(yAxisRange.min));
            chartCoordinatePerPixel = chartAxisYRange.div(Big(chartArea.height));
            var closestYAxisValueToClick = Big(yAxisRange.min).plus(chartAxisYRange.minus(relativePixelCoordinateY.times(chartCoordinatePerPixel)));
            var closestYAxisValueNumber = Number(closestYAxisValueToClick.toFixed(14));
            var closestXAxisValueNumber = Number(closestXAxisValueToClick.toFixed(14));
            return new point_1.Point(closestXAxisValueNumber, closestYAxisValueNumber);
        };
        /**
         * gets a series point in chart coordinates for the specefied timestamp
         *
         * @protected
         * @param {number} timestamp
         * @returns {Point}
         * @memberof YTChart
         */
        ChartBase.prototype.getSeriesPointFromTimestamp = function (timestamp) {
            // we provide y == 0 if we are not able to find matching points
            var seriesPoint = new point_1.Point(timestamp, 0);
            // skip searching if the series index is out of range
            if (this.series.length == 0)
                return seriesPoint;
            // find a matching series point related to the timestamp
            seriesPoint = this.findNearestPointInAllSeries(timestamp);
            return seriesPoint;
        };
        /**
         * Searches for the nearest point related to the timestamp in all series
         *
         * @private
         * @param {number} timestamp
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.findNearestPointInAllSeries = function (timestamp) {
            // collect the nearest points from every series
            var nearestSeriesPoints = this.series.map(function (singleSeries) { return singleSeries.serie.pointFromTimestamp(timestamp); });
            // sort the nearest points by their timestamp value
            nearestSeriesPoints.sort(function (value1, value2) { return value1.x - value2.x; });
            // get the timestamp values
            var nearestSeriesTimestamps = nearestSeriesPoints.map(function (seriesPoint) { return seriesPoint.x; });
            // find the nearest point from all series. The found index refers to the nearest series !
            var nearestSeriesIndex = seriesHelper_1.SeriesHelper.indexOfNearest(timestamp, nearestSeriesTimestamps);
            // get the nearest point from the series
            var seriesPointFromTimeStamp = nearestSeriesPoints[nearestSeriesIndex];
            // create a point instance with a matching timestamp
            var seriesPoint = seriesPointFromTimeStamp ? new point_1.Point(seriesPointFromTimeStamp.x, seriesPointFromTimeStamp.y) : new point_1.Point(timestamp, 0);
            return seriesPoint;
        };
        // --------------------------------------------------- Overload methods in derived chart --------------------------------------------------- //
        ChartBase.prototype.removeYScaleFromChart = function (yScale) { };
        ;
        ChartBase.prototype.onSynchronizeScaleRange = function (scale, min, max) { };
        ChartBase.prototype.setAvailableSeriesAsDataSource = function () { };
        ChartBase.prototype.updateChartRangeX = function (xAxisMinValue, xAxisMaxValue) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            if (xAxisMaxValue != undefined && xAxisMinValue != undefined) {
                var xAxisSegmentRange = xAxisMaxValue - xAxisMinValue;
                var xAxisOffset = void 0;
                if (xAxisSegmentRange == 0) {
                    xAxisOffset = chartRangeHelper.getAxisOffsetForStraightLines(this.series[0].rawPoints[0].x);
                }
                else {
                    var axis = this.chart.getAxis(this.primaryXAxisName);
                    if (axis != undefined) {
                        var axisPixelRange = axis.getAxisRangeInPixel();
                        xAxisOffset = chartRangeHelper.getAxisOffset(xAxisSegmentRange, (axisPixelRange.max - axisPixelRange.min));
                    }
                }
                xAxisMaxValue += xAxisOffset;
                xAxisMinValue -= xAxisOffset;
                xAxisSegmentRange = xAxisMaxValue - xAxisMinValue;
                this.setRangeX(xAxisMinValue, xAxisMaxValue);
            }
        };
        ChartBase.prototype.getTimestampInSeries = function (p, series) { return p.x; };
        ChartBase.prototype.getCursorPoint = function (timestamp, series, seriesIndex) { return { x: timestamp, y: 0, timestamp: timestamp }; };
        ChartBase.prototype.addSerieDropLocations = function (serie, chartManagerChart) { };
        ;
        ChartBase.prototype.addDropLocations = function (serie) { };
        ;
        ChartBase.prototype.getDropLocationType = function (currentTarget) { return DropLocationType.invalid; };
        ChartBase.prototype.addYScale = function (scale, position) { };
        ChartBase.prototype.updateDroppableAreas = function (currentTarget) { };
        ;
        ChartBase.prototype.resetHighlighting = function () { };
        ;
        ChartBase.prototype.getUsedCursorStates = function () { return []; };
        ;
        return ChartBase;
    }(widgetBase_1.WidgetBase));
    exports.ChartBase = ChartBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L0NoYXJ0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBK0JBLElBQUssZUFPSjtJQVBELFdBQUssZUFBZTtRQUNoQix5REFBTSxDQUFBO1FBQ04seURBQU0sQ0FBQTtRQUNOLHFEQUFJLENBQUE7UUFDSixpRUFBVSxDQUFBO1FBQ1YsaUVBQVUsQ0FBQTtRQUNWLDJEQUFPLENBQUE7SUFDWCxDQUFDLEVBUEksZUFBZSxLQUFmLGVBQWUsUUFPbkI7SUF1eEMrSSwwQ0FBZTtJQXJ4Qy9KLElBQUssZ0JBSUo7SUFKRCxXQUFLLGdCQUFnQjtRQUNqQixxRUFBVyxDQUFBO1FBQ1gseUVBQWEsQ0FBQTtRQUNiLDZEQUFPLENBQUE7SUFDWCxDQUFDLEVBSkksZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUlwQjtJQWl4Q2dLLDRDQUFnQjtJQS93Q2pMO1FBSUksZ0NBQVksZUFBZ0MsRUFBRSxJQUFVO1lBQ3BELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUFSRCxJQVFDO0lBdXdDa0wsd0RBQXNCO0lBcndDek07UUFBd0MsNkNBQXFEO1FBQTdGOztRQUErRixDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQWhHLENBQXdDLG1CQUFVLEdBQThDO0lBcXdDViw4REFBeUI7SUFyd0NmLENBQUM7SUFDakc7UUFJSSx1Q0FBWSxvQkFBcUMsRUFBRSxjQUFvQjtZQUNuRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7WUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDekMsQ0FBQztRQUNMLG9DQUFDO0lBQUQsQ0FBQyxBQVJE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aUIsSUFBRSxDQUFDO1FBQUEsQ0FBQztRQUUxQyx1Q0FBbUIsR0FBMUIsVUFBMkIsYUFBa0IsSUFBcUIsT0FBTyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTdGLDZCQUFTLEdBQWhCLFVBQWlCLEtBQWEsRUFBRSxRQUFzQixJQUFFLENBQUM7UUFFbEQsd0NBQW9CLEdBQTNCLFVBQTRCLGFBQWEsSUFBRyxDQUFDO1FBQUEsQ0FBQztRQUV2QyxxQ0FBaUIsR0FBeEIsY0FBMkIsQ0FBQztRQUFBLENBQUM7UUFFbkIsdUNBQW1CLEdBQTdCLGNBQXVELE9BQU8sRUFBRSxDQUFBLENBQUEsQ0FBQztRQUFBLENBQUM7UUFDdEUsZ0JBQUM7SUFBRCxDQUFDLEFBN3VDRCxDQUFpQyx1QkFBVSxHQTZ1QzFDO0lBRVEsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDdXJzb3JTdGF0ZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9jdXJzb3JTdGF0ZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBJQ2hhcnQsIEV2ZW50QXhpc1JhbmdlQ2hhbmdlZEFyZ3MsIEF4aXNPcmllbnRhdGlvbiwgRXZlbnRNb3VzZUFyZ3MsIEV2ZW50TW91c2VXaGVlbEFyZ3MsIEF4aXNQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENoYXJ0UmFuZ2VIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IE1vdXNlQWN0aW9uVHlwZSB9IGZyb20gXCIuL3VzZXJJbnRlcmFjdGlvbi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3BvaW50XCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JIYW5kbGVyIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgQ3Vyc29yUG9zaXRpb24gYXMgQ3Vyc29yUG9zaXRpb25JbmZvIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvclBvc2l0aW9uSW5mb1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1NlcmllIH0gZnJvbSBcIi4vY2hhcnRWaWV3U2VyaWVcIjtcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgU0ZDaGFydFdyYXBwZXIgfSBmcm9tIFwiLi9jaGFydFdyYXBwZXIvU0ZDaGFydFdyYXBwZXJcIjtcclxuaW1wb3J0IHsgQXhpc0JvdW5kcyB9IGZyb20gXCIuLi8uLi9jb3JlL3R5cGVzL0F4aXNCb3VuZHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncywgU2NhbGVBY3Rpb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBDdXJzb3JUeXBlSGVscGVyLCBDdXJzb3JUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yVHlwZVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZVBvaW50ID0gSVBvaW50ICYge3RpbWVzdGFtcDogbnVtYmVyfTtcclxuXHJcbmVudW0gQ2hhcnRPYmplY3RUeXBle1xyXG4gICAgY3Vyc29yLFxyXG4gICAgc2VyaWVzLFxyXG4gICAgYXhpcyxcclxuICAgIGNoYXJ0U3BhY2UsXHJcbiAgICBlbXB0eVNwYWNlLFxyXG4gICAgaW52YWxpZCAgICBcclxufVxyXG5cclxuZW51bSBEcm9wTG9jYXRpb25UeXBle1xyXG4gICAgYWRkTmV3U2NhbGUsXHJcbiAgICBhc3NpZ25Ub1NjYWxlLFxyXG4gICAgaW52YWxpZFxyXG59XHJcblxyXG5jbGFzcyBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgY2hhcnRPYmplY3RUeXBlOiBDaGFydE9iamVjdFR5cGU7XHJcbiAgICBhcmdzIDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0T2JqZWN0VHlwZTogQ2hhcnRPYmplY3RUeXBlLCBhcmdzIDogYW55KXtcclxuICAgICAgICB0aGlzLmNoYXJ0T2JqZWN0VHlwZSA9IGNoYXJ0T2JqZWN0VHlwZTtcclxuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uIGV4dGVuZHMgVHlwZWRFdmVudCA8Q2hhcnRCYXNlLCBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncz4ge307XHJcbmNsYXNzIEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzIHtcclxuICAgIGNoYXJ0SW50ZXJhY3Rpb25UeXBlOiBNb3VzZUFjdGlvblR5cGU7XHJcbiAgICBldmVudEFyZ3VtZW50cyA6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFydEludGVyYWN0aW9uVHlwZTogTW91c2VBY3Rpb25UeXBlLCBldmVudEFyZ3VtZW50cyA6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2hhcnRJbnRlcmFjdGlvblR5cGUgPSBjaGFydEludGVyYWN0aW9uVHlwZTtcclxuICAgICAgICB0aGlzLmV2ZW50QXJndW1lbnRzID0gZXZlbnRBcmd1bWVudHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV2ZW50UmVkcmF3QWxsQ2hhcnRzIGV4dGVuZHMgVHlwZWRFdmVudDxDaGFydEJhc2UsIEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncz4ge307XHJcbmNsYXNzIEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyB7ICAgIFxyXG4gICAgY2hhcnRUeXBlIDogQ2hhcnRUeXBlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChjaGFydFR5cGUgOiBDaGFydFR5cGUpe1xyXG4gICAgICAgIHRoaXMuY2hhcnRUeXBlID0gY2hhcnRUeXBlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudFNlcmllc0FkZGVkIGV4dGVuZHMgVHlwZWRFdmVudDxDaGFydEJhc2UsIEJhc2VTZXJpZXM+IHt9O1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgQ2hhcnRCYXNlIGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNoYXJ0IHtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbiA6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb247XHJcbiAgICBwdWJsaWMgZXZlbnRSZWRyYXdBbGxDaGFydHMgOiBFdmVudFJlZHJhd0FsbENoYXJ0cztcclxuICAgIHB1YmxpYyBldmVudFNlcmllc0FkZGVkIDogRXZlbnRTZXJpZXNBZGRlZDtcclxuICAgIFxyXG4gICAgdHlwZTtcclxuICAgIGN1cnNvclR5cGU7XHJcbiAgICB3aWRnZXROYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdGV4dE1lYXN1cmVtZW50Q2FudmFzSWQ6IHN0cmluZyA9IFwidGV4dE1lYXN1cmVtZW50Q2FudmFzXCJcclxuICAgIFxyXG4gICAgY2hhcnRJbnN0YW5jZS8vICA6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkNoYXJ0O1xyXG4gICAgY2hhcnQhIDogSUNoYXJ0O1xyXG5cclxuICAgIHNlcmllczogQXJyYXk8Q2hhcnRWaWV3U2VyaWU+ID0gW107XHJcbiAgICBob3ZlcmVkU2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSA9IFtdO1xyXG4gICAgc2NhbGVzOiBBcnJheTxTY2FsZT4gPSBbXTtcclxuXHJcbiAgICBwYXJlbnRWaWV3OiBJVmlldztcclxuICAgIFxyXG4gICAgLy9wcml2YXRlIGtleUV2ZW50c1BsYWNlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBjdXJyZW50IGN1cnNvciBzdGF0ZXMgdmFsdWVzLiBXZSBpbml0aWFsaXplIHRoZSBtZW1iZXIgZm9yIGRlZmF1bHQuIFRoZSBlZmZlY3RpdmUgaW5pdGlhbGl6YXRpb24gdGFrZXMgcGxhY2Ugd2hlbiB0aGUgZXh0ZXJuYWwgc2hhcmVkIGluc3RhbmNlXHJcbiAgICAvLyBvZiB0aGUgY3Vyc29yIHN0YXRlcyBpcyBjcmVhdGVkIGFuZCByZWZsZWN0ZWQgdGhyb3VnaCB0aGUgY3Vyb3JTdGF0ZXMgc2V0dGVyIVxyXG4gICAgcHJvdGVjdGVkIF9jdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlcyA9IG5ldyBDdXJzb3JTdGF0ZXMoKTtcclxuXHJcbiAgICBhYnN0cmFjdCBjdXJzb3JIYW5kbGVyOiBDdXJzb3JIYW5kbGVyfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgY3Vyc29ySG92ZXJEaXN0YW5jZTogbnVtYmVyID0gODtcclxuICAgIHByb3RlY3RlZCBkcmFnZ2VkU2VyaWVzSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgYWJzdHJhY3QgcHJpbWFyeVhBeGlzTmFtZTogc3RyaW5nO1xyXG4gICAgYWJzdHJhY3QgcHJpbWFyeVlBeGlzTmFtZTogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIGF4aXNCb3VuZHM6IEF4aXNCb3VuZHNbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyB4QXhpc1dpZHRoIDogbnVtYmVyID0gMFxyXG4gICAgXHJcbiAgICB5QXhpc0FsaWdubWVudE9mZnNldDogbnVtYmVyID0gMDtcclxuICAgIGZsYWdnZWRGb3JSZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpZCBmb3IgdGhlIGF4aXMgZHJvcFpvbmVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGF4aXNEcm9wWm9uZUlkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluRGl2SWQgKyAnX2F4aXNEcm9wWm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpZCBmb3IgdGhlIGF4aXMgY2hhcnQgYXJlYSBkcm9wWm9uZSBcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgYXhpc0Ryb3Bab25lQ2hhcnRBcmVhSWQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF4aXNEcm9wWm9uZUlkICsgJ19jaGFydEFyZWEnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudFZpZXcgOiBJVmlldywgbmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGVbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYodGhpcy5jb21wb25lbnQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogY29tcG9uZW50IHNob3VsZCBiZSBzZXQgYnkgY29tcG9uZW50IGZhY3Rvcnkgd2hlbiBjaGFydHMgY2FuIGJlIGNyZWF0ZWQgd2l0aCBjb21wb25lbnQgZmFjdG9yeVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRCYXNlKENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKSwgdGhpcyk7IFxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnR5cGUgPSBcIkNoYXJ0QmFzZVwiOyAvLyBUT0RPOiBSZW1vdmUgd2hlbiBjaGFydGJhc2UoeHljaGFydCwgZmZ0Y2hhcnQsIHl0Y2hhcnQpIHdpbGwgYmUgY3JlYXRlZCB3aXRoIHRoZSBjb21wb25lbnQgZmFjdG9yeVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmlkID0gbmFtZTtcclxuICAgICAgICB0aGlzLnBhcmVudFZpZXcgPSBwYXJlbnRWaWV3O1xyXG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zY2FsZXMgPSBzY2FsZTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVkcmF3QWxsQ2hhcnRzID0gbmV3IEV2ZW50UmVkcmF3QWxsQ2hhcnRzKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFNlcmllc0FkZGVkID0gbmV3IEV2ZW50U2VyaWVzQWRkZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc3Ryb3kgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIC8vIFRPRE86IERpc3Bvc2Ugb2YgQ3Vyc29yU3RhdGVzIG11c3QgYmUgZG9uZSBnbG9iYWx5XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLmRpc3Bvc2UoKTtcclxuICAgICAgICBsZXQgY2hhcnRPYmogPSAkKHRoaXMubWFpbkRpdikuZGF0YShcImVqQ2hhcnRcIik7XHJcbiAgICAgICAgaWYoY2hhcnRPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY2hhcnRPYmouZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBkaXNwb3NlIG9mIHRoaXMgd2lkZ2V0IGlzIGNhbGxlZCBmcm9tIHNwbGl0dGVyIGFuZCBhbHNvIGZyb20gdGhlIGNoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICAgICAgICAvL2NvbnNvbGUud2FybihcIkRpc3Bvc2Ugb2YgY2hhcnRPYmooPT0gdW5kZWZpbmVkKSBub3QgcG9zc2libGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICBmb3IobGV0IHNjYWxlIG9mIHRoaXMuc2NhbGVzKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXNUb0NoYXJ0KHNjYWxlLmNoaWxkcywgc2NhbGUsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdDaGFydCA9IG5ldyBTRkNoYXJ0V3JhcHBlcih0aGlzLm1haW5EaXYsIHRoaXMuc2NhbGVzLCB0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIG5ld0NoYXJ0LmV2ZW50QXhpc1JhbmdlQ2hhbmdlZC5hdHRhY2goKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkF4aXNSYW5nZUNoYW5nZWQoc2VuZGVyLCBhcmdzKSk7XHJcbiAgICAgICAgbmV3Q2hhcnQuZXZlbnRNb3VzZUFjdGlvbi5hdHRhY2goKHNlbmRlcixhcmdzKSA9PiB0aGlzLm9uTW91c2VBY3Rpb24oc2VuZGVyLCBhcmdzKSk7XHJcbiAgICAgICAgbmV3Q2hhcnQuZXZlbnRNb3VzZVdoZWVsLmF0dGFjaCgoc2VuZGVyLGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlV2hlZWwoc2VuZGVyLCBhcmdzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnRJbnN0YW5jZSA9IG5ld0NoYXJ0Ll9TRkNoYXJ0O1xyXG4gICAgICAgIHRoaXMuY2hhcnQgPSBuZXdDaGFydDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldEJveFpvb20oZmFsc2UpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJzb3JzIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtUQ3Vyc29yU3RhdGVzfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGN1cnNvcnNTdGF0ZXMoKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXMuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSBjdXJzb3Igc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXQgY3Vyc29yc1N0YXRlcyhjdXJzb3JTdGF0ZXMgOiBDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGJhY2t1cCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX2N1cnNvclN0YXRlcyA9IGN1cnNvclN0YXRlcztcclxuICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlVUlDdXJzb3JzKGN1cnNvclN0YXRlcyk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3Igc3RhdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JTdGF0ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUN1cnNvclN0YXRlcyhjdXJzb3JTdGF0ZXM6Q3Vyc29yU3RhdGVzKXtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtZXRob2QgY2FsbCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcbiAgXHJcblxyXG4gICAgcHJpdmF0ZSBvbkF4aXNSYW5nZUNoYW5nZWQoc2VuZGVyOiBJQ2hhcnRBeGlzLCBhcmdzIDogRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncyl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFyZ3MuYXhpc0lEcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzY2FsZTogU2NhbGV8dW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAvL1dvcmthcm91bmQgdW50aWwgWC1BeGlzIGhhbmRsaW5nIGlzIGltcGxlbWVudGVkIGNvcnJlY3RcclxuICAgICAgICAgICAgaWYoYXJncy5heGlzSURzW2ldICE9IHRoaXMucHJpbWFyeVhBeGlzTmFtZSl7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0gdGhpcy5nZXRTY2FsZUJ5U2NhbGVJZChhcmdzLmF4aXNJRHNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IHRoaXMuc2NhbGVzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNjYWxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpczogSUNoYXJ0QXhpcyA9IHNlbmRlcjtcclxuICAgICAgICAgICAgICAgIGxldCByYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICBpZihheGlzLmdldEF4aXNPcmllbnRhdGlvbigpID09IEF4aXNPcmllbnRhdGlvbi5ob3Jpem9udGFsKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNjYWxlUmFuZ2Uoc2NhbGUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCBzY2FsZS5taW5ZVmFsdWUsIHNjYWxlLm1heFlWYWx1ZSwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZ3Muc3luY0F4aXMgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRSZWRyYXdBbGxDaGFydHMucmFpc2UodGhpcywgbmV3IEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyh0aGlzLnR5cGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2NhbGVSYW5nZShzY2FsZSwgc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCBcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGFyZ3MuZm9yY2VSZWRyYXcgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3VzZVhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3VzZVlcclxuICAgICAqIEByZXR1cm5zIHtDaGFydE9iamVjdEluZm9ybWF0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKG1vdXNlWDogbnVtYmVyLCBtb3VzZVk6IG51bWJlcikgOiBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2hhcnREaW1lbnNpb25zKCk7XHJcbiAgICAgICAgaWYodGhpcy5tb3VzZUlzSW5DaGFydEJvdW5kcyhtb3VzZVgsIG1vdXNlWSkpe1xyXG5cclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldEhvdmVyZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgICAgICBpZihpbmRleCAhPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBtaWdodCBiZSBiZXR0ZXIgdG8gdXNlIGN1cnNvciBpbnN0YW5jZSBpbnN0ZWFkIG9mIGluZGV4XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24oQ2hhcnRPYmplY3RUeXBlLmN1cnNvciwge2N1cnNvckluZGV4OiBpbmRleH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuY2hhcnRTcGFjZSwge30pO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmF4aXNCb3VuZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZigobW91c2VYIC0gdGhpcy5heGlzQm91bmRzW2ldLngpIDwgKHRoaXMuYXhpc0JvdW5kc1tpXS53aWR0aCkgJiYgbW91c2VYID4gdGhpcy5heGlzQm91bmRzW2ldLngpe1xyXG4gICAgICAgICAgICAgICAgaWYoKG1vdXNlWSAtIHRoaXMuYXhpc0JvdW5kc1tpXS55KSA8ICh0aGlzLmF4aXNCb3VuZHNbaV0uaGVpZ2h0KSAmJiBtb3VzZVkgPiB0aGlzLmF4aXNCb3VuZHNbaV0ueSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5heGlzQm91bmRzW2ldLmF4aXMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5heGlzLCB7YXhpczogYXhpc30pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24oQ2hhcnRPYmplY3RUeXBlLmVtcHR5U3BhY2UsIHt9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNhbGN1bGF0ZUNoYXJ0RGltZW5zaW9ucygpe1xyXG4gICAgICAgIHRoaXMuYXhpc0JvdW5kcyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5heGlzQm91bmRzLnB1c2goYXhpcy5nZXRBeGlzQm91bmRzKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmF4aXNCb3VuZHMucHVzaChheGlzLmdldEF4aXNCb3VuZHMoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlQWN0aW9uKHNlbmRlciwgYXJnczogRXZlbnRNb3VzZUFyZ3Mpe1xyXG4gICAgICAgIHN3aXRjaCAoYXJncy5tb3VzZUFjdGlvblR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlICBNb3VzZUFjdGlvblR5cGUubW91c2VEb3duIDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYXJ0TW91c2VEb3duKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICBNb3VzZUFjdGlvblR5cGUubW91c2VVcCA6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFydE1vdXNlVXAoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBjYXNlICBNb3VzZUFjdGlvblR5cGUubW91c2VNb3ZlIDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYXJ0TW91c2VNb3ZlKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VEb3duKHNlbmRlciwgYXJncyA6IEV2ZW50TW91c2VBcmdzKXtcclxuICAgICAgICBhcmdzLm9iamVjdFVuZGVyTW91c2UgPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnRDaGFydC54LCBhcmdzLm1vdXNlUG9pbnRDaGFydC55KTtcclxuICAgICAgICBsZXQgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzO1xyXG4gICAgICAgIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZURvd24sIGFyZ3MpO1xyXG4gICAgICAgIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzLmV2ZW50QXJndW1lbnRzLmhvdmVyZWRTZXJpZXMgPSB0aGlzLmhvdmVyZWRTZXJpZXM7XHJcbiAgICAgICAgdGhpcy5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLnJhaXNlKHRoaXMsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlVXAoc2VuZGVyLCBhcmdzOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgYXJncy5vYmplY3RVbmRlck1vdXNlID0gdGhpcy5nZXRDaGFydE9iamVjdFVuZGVyTW91c2UoYXJncy5tb3VzZVBvaW50Q2hhcnQueCwgYXJncy5tb3VzZVBvaW50Q2hhcnQueSk7XHJcbiAgICAgICAgbGV0IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncztcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VVcCwgYXJncyk7XHJcbiAgICAgICAgdGhpcy5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLnJhaXNlKHRoaXMsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlTW92ZShzZW5kZXIsIGFyZ3M6IEV2ZW50TW91c2VBcmdzKXtcclxuICAgICAgICBsZXQgY2hhcnRPYmplY3RVbmRlck1vdXNlIDogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbiA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKGFyZ3MubW91c2VQb2ludENoYXJ0LngsIGFyZ3MubW91c2VQb2ludENoYXJ0LnkpO1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZTtcclxuICAgICAgICBsZXQgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzO1xyXG4gICAgICAgIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncylcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIEludGVyYWN0aW9uU3RyYXRldGdpZXMgd2hlbiBhIGNsaWNrIGluIHRoZVxyXG4gICAgICogY2hhcnQgaGFzIGJlZW4gbWFkZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbihtb3VzZVBvaW50IDogSVBvaW50KXtcclxuICAgICAgICB0aGlzLnNldEN1cnNvcihtb3VzZVBvaW50LngsIG1vdXNlUG9pbnQueSk7XHJcbiAgICAgICAgdGhpcy5jaGVja0N1cnNvcnNIb3ZlcmluZyhtb3VzZVBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludGVybmFsIG1ldGhvZCBmb3IgYWN0dWFsbHkgbW92aW5nIHRoZSBjdXJzb3JzLiBPdmVyd3JpdHRlbiBpbiBGRlRDaGFydC50c1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldEN1cnNvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5zZXJpZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoQ3Vyc29yVHlwZS50aW1lRG9tYWluKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaG92ZXJlZEN1cnNvckluZGV4ID0gIHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRIb3ZlcmVkQ3Vyc29ySW5kZXgoKTtcclxuICAgICAgICBpZiAoaG92ZXJlZEN1cnNvckluZGV4ICE9IC0xKSB7IC8vIFNldCBzZWxlY3RlZCBjdXJzb3Igd2hlbiBob3ZlcmVkIGN1cnNvciB3YXMgZm91bmRcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKGhvdmVyZWRDdXJzb3JJbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoIHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZEN1cnNvcih4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhc3MgdGhlIHggYW5kIHkgcG9zaXRpb24gb24gdGhlIHByb3BlcnR5IGFuZCB0aGlzIG1ldGhvZCB3aWxsIGZpZ3VyZSBvdXQgd2hlcmUgdG9cclxuICAgICAqIHBsYWNlIHRoZSBjdXJzb3JzIGFuZCB1cGRhdGUgdGhlIHN0YXRlcyBhY2NvcmRpbmdseVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JzU3RhdGVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVNlbGVjdGVkQ3Vyc29yKHg6IG51bWJlciwgeTogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCB0aGlzLnNjYWxlc1swXS5pZCwgeCwgeSk7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXBGcm9tQWxsU2VyaWVzID0gdGhpcy5nZXRUaW1lc3RhbXBJblNlcmllcyhwb2ludCwgdGhpcy5zZXJpZXMpO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0QWN0aXZlKHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIHRydWUpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRQb3NpdGlvbih0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpLCBuZWFyZXN0VGltZXN0YW1wRnJvbUFsbFNlcmllcyk7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldEhvdmVyZWQodGhpcy5jdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKSwgZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIGZvciBhY3R1YWxseSBtb3ZpbmcgdGhlIGN1cnNvcnMuIFBhc3MgdGhlIHggYW5kIHlcclxuICAgICAqIHBvc2l0aW9uIG9uIHRoZSBwcm9wZXJ0eSBhbmQgdGhpcyBtZXRob2Qgd2lsbCBmaWd1cmUgb3V0IHdoZXJlIHRvXHJcbiAgICAgKiBwbGFjZSB0aGUgY3Vyc29ycyBhbmQgdXBkYXRlIHRoZSBzdGF0ZXMgYWNjb3JkaW5nbHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZHJhZ0N1cnNvckFsb25nTGluZSAoeDogbnVtYmVyLCB5OiBudW1iZXIsIGhvdmVyZFNlcmllcykge1xyXG4gICAgICAgIGlmICghdGhpcy5zZXJpZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICB9IFxyXG4gICAgICAgXHJcbiAgICAgICAgaWYoaG92ZXJkU2VyaWVzLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCB0aGlzLnNjYWxlc1swXS5pZCwgeCwgeSk7XHJcbiAgICAgICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wRnJvbVNpbmdsZVNlcmllcyA9IHRoaXMuZ2V0VGltZXN0YW1wSW5TZXJpZXMocG9pbnQsIGhvdmVyZFNlcmllcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRQb3NpdGlvbih0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpLCBuZWFyZXN0VGltZXN0YW1wRnJvbVNpbmdsZVNlcmllcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgdXNlckludGVyYWN0aW9uIHN0cmFnZXRneSB3aGVuZXZlclxyXG4gICAgICogdGhlIG1vdXNlIGlzIG1vdmVkIGFjcm9zcyBhIGNoYXJ0LiBJZiB0aGUgbW91c2UgaXMgYWJvdmUgYSBjdXJzb3JcclxuICAgICAqIHRoaXMgY3Vyc29yIHVwZGF0ZXMgaXQncyBvd24gc3RhdGUgdG8gSE9WRVJJTkcgYW5kIG9uY2UgaXQgaXMgbm9cclxuICAgICAqIGxvbmdlciBiZWxvdyB0aGUgbW91c2UgaXQgd2lsbCByZXNldCB0byBpdCdzIHByZXZpb3VzIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tDdXJzb3JzSG92ZXJpbmcobW91c2VQb2ludDogSVBvaW50KXtcclxuICAgICAgICBpZih0aGlzLmN1cnNvckhhbmRsZXIgIT0gdW5kZWZpbmVkKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgICAgICBsZXQgYWN0dWFsTW91c2VQb2ludCA9IG5ldyBQb2ludChtb3VzZVBvaW50LnggLSBjaGFydEFyZWEueCwgbW91c2VQb2ludC55IC0gY2hhcnRBcmVhLnkpO1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDdXJzb3JJbmRleCA9IHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY2xvc2VzdEN1cnNvclBvc2l0aW9uIDogQ3Vyc29yUG9zaXRpb25JbmZvID0gdGhpcy5jdXJzb3JIYW5kbGVyLmdldENsb3Nlc3RDdXJzb3JQb3NpdGlvblRvUG9pbnQoYWN0dWFsTW91c2VQb2ludCwgc2VsZWN0ZWRDdXJzb3JJbmRleClcclxuICAgICAgICAgICAgaWYoY2xvc2VzdEN1cnNvclBvc2l0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2VUb0N1cnNvciA9IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbi5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJkaXN0YW5jZVwiXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRseUhvdmVyZWRTZXJpZXMgOiBDaGFydFZpZXdTZXJpZVtdID0gdGhpcy5ob3ZlcmVkU2VyaWVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3ZlcmVkU2VyaWVzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3RDdXJzb3JJbmRleDtcclxuICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlVG9DdXJzb3IgPCB0aGlzLmN1cnNvckhvdmVyRGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RDdXJzb3JQb3NpdGlvbi5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJoaWdobGlnaHRcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RDdXJzb3JJbmRleCA9IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbi5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJjdXJzb3JJbmRleFwiXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvdmVyZWRTZXJpZXMgPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb24uYWRkaXRpb25hbEluZm9ybWF0aW9uW1wic2VyaWVzXCJdOyBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2FzIHRoZSBjdXJzb3Igc3RhdGUgaXMgbm90IHVwZGF0ZWQgd2hlbiB0aGUgaG92ZXJlZFNlcmllcyBjaGFuZ2UsIHRoZSByZWRyYXcgaGFzIHRvIGJlIGNhbGxlZCBtYW51YWxseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLnNlcmllc0FycmF5RXF1YWxzU2VyaWVzQXJyYXkoY3VycmVudGx5SG92ZXJlZFNlcmllcywgdGhpcy5ob3ZlcmVkU2VyaWVzKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUlDdXJzb3JzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSG92ZXJpbmdTdGF0ZXNJbkN1cnNvcnModGhpcy5jdXJzb3JzU3RhdGVzLCBjbG9zZXN0Q3Vyc29ySW5kZXgpOyAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoZWNrIGlmIHR3byBhcnJheXMgb2YgdHlwZSBDaGFydFZpZXdTZXJpZVtdIGNvbnRhaW4gdGhlIGV4YWN0IHNhbWUgb3JkZXIgb2Ygc2VyaWVzIGJ5IGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3U2VyaWVbXX0gc2VyaWVzQXJyYXkxXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld1NlcmllW119IHNlcmllc0FycmF5MlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2VyaWVzQXJyYXlFcXVhbHNTZXJpZXNBcnJheShzZXJpZXNBcnJheTEgOiBDaGFydFZpZXdTZXJpZVtdLCBzZXJpZXNBcnJheTI6IENoYXJ0Vmlld1NlcmllW10pIDogYm9vbGVhbntcclxuICAgICAgICBpZihzZXJpZXNBcnJheTEubGVuZ3RoICE9IHNlcmllc0FycmF5Mi5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzQXJyYXkxLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoc2VyaWVzQXJyYXkxW2ldLmlkICE9IHNlcmllc0FycmF5MltpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VyaWVDdXJzb3JUeXBlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlcmllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDdXJzb3JUeXBlSGVscGVyLmdldEN1cnNvclR5cGVGb3JTZXJpZXModGhpcy5zZXJpZXNbMF0uc2VyaWUpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBjdXJzb3Igc3RhdGVzIHdpdGggdGhlIGdpdmVuIGN1cnNvciB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JUeXBlfSBjdXJzb3JUeXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldEN1cnNvclN0YXRlcyhjdXJzb3JUeXBlOiBDdXJzb3JUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnJlc2V0Q3Vyc29yU3RhdGVzKGN1cnNvclR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgaG92ZXJpbmcgb2YgYWxsIGN1cnNvcnMgd2hlbiBtb3VzZSBpcyBvdXRzaWRlIG9mIHRoZSBjaGFydHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldEN1cnNvcnNIb3ZlcmVkKCkge1xyXG4gICAgICAgIGxldCBob3ZlcmVkQ3Vyc29yID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldEhvdmVyZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgIC8vSWYgYW55IGN1cnNvciBpcyBob3ZlcmVkLCByZXNldCBhbGxcclxuICAgICAgICBpZiAoaG92ZXJlZEN1cnNvciAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3ZlcmVkU2VyaWVzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSG92ZXJpbmdTdGF0ZXNJbkN1cnNvcnModGhpcy5jdXJzb3JzU3RhdGVzLCB1bmRlZmluZWQpOyAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUgd2hpY2ggaXMgdG8gYmUgdXBkYXRlZCBpbiB0aGVcclxuICAgICAqIHN0YXRlcyB0byBiZSBIT1ZFUklORy4gVGhpcyBtZXRob2Qgd2lsbCBhbHNvIHJlc2V0IHRoZSBjb3JyZWN0IHN0YXRlc1xyXG4gICAgICogdG8gaXQncyBwcmV2aW91cyB2YWx1ZXMgaWYgbm9uIG9mIHRoZSBjdXJzb3JzIGFyZSBob3ZlcmluZy4gXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JTdGF0ZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjbG9zZXN0SW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtDdXJzb3JTdGF0ZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSG92ZXJpbmdTdGF0ZXNJbkN1cnNvcnMgKGN1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzLCBjbG9zZXN0SW5kZXg6IG51bWJlcnx1bmRlZmluZWQpIDogQ3Vyc29yU3RhdGVzIHtcclxuICAgICAgICBpZiAoY2xvc2VzdEluZGV4ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBJbmRleCBvZiBjdXJzb3IgZm91bmQgPT4gc2V0IGhvdmVyZWQgZmxhZ1xyXG4gICAgICAgICAgICBjdXJzb3JTdGF0ZXMuc2V0SG92ZXJlZChjbG9zZXN0SW5kZXgsIHRoaXMuZ2V0U2VyaWVDdXJzb3JUeXBlKCksIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBObyBpbmRleCBvZiBjdXJzb3IgZm91bmQgPT4gcmVzZXQgYWxsIGhvdmVyZWQgZmxhZ3Mgb2YgYWxsIGN1cnNvcnNcclxuICAgICAgICAgICAgY3Vyc29yU3RhdGVzLnNldEhvdmVyZWQoLTEsIHRoaXMuZ2V0U2VyaWVDdXJzb3JUeXBlKCksIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSB6b29tIG9uIG1vdXNld2hlZWwgYWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNoYXJ0TW91c2VXaGVlbChzZW5kZXIsIGFyZ3MgOiBFdmVudE1vdXNlV2hlZWxBcmdzKXtcclxuICAgICAgICBhcmdzLm9iamVjdFVuZGVyTW91c2UgPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnQueCwgYXJncy5tb3VzZVBvaW50LnkpO1xyXG4gICAgICAgIGxldCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M7XHJcbiAgICAgICAgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MgPSBuZXcgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlV2hlZWwsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBpZiBtb3VzZSBpcyBpbnNpZGUgY2hhcnQgYm91bmRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gbW91c2VYXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vdXNlWVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VJc0luQ2hhcnRCb3VuZHMobW91c2VYLCBtb3VzZVkpIDogYm9vbGVhbntcclxuICAgICAgICBsZXQgaXNJbkJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgaWYobW91c2VYIDwgY2hhcnRBcmVhLnggfHwgbW91c2VYID4gKGNoYXJ0QXJlYS54ICsgY2hhcnRBcmVhLndpZHRoKSAgKXtcclxuICAgICAgICAgICAgaXNJbkJvdW5kcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtb3VzZVkgPCBjaGFydEFyZWEueSB8fCBtb3VzZVkgPiAoY2hhcnRBcmVhLnkgKyBjaGFydEFyZWEuaGVpZ2h0KSAgKXtcclxuICAgICAgICAgICAgaXNJbkJvdW5kcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNJbkJvdW5kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNpemUod2lkdGgsIGhlaWdodCl7XHJcbiAgICAgICAgdGhpcy5yZXNpemVDaGFydChoZWlnaHQsIHdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSBDaGFydCBvbmx5IGlmIG5lZWRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0geyp9IGhlaWdodFxyXG4gICAgICogQHBhcmFtIHsqfSB3aWR0aFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZUNoYXJ0KGhlaWdodCwgd2lkdGgpIHtcclxuICAgICAgICBpZih0aGlzLmZsYWdnZWRGb3JSZXNpemUgfHwgdGhpcy5fYWN0dWFsSGVpZ2h0ICE9IGhlaWdodCB8fCB0aGlzLl9hY3R1YWxXaWR0aCAhPSB3aWR0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodCwgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3aWR0aCA9IHdpZHRoIC0gdGhpcy55QXhpc0FsaWdubWVudE9mZnNldDtcclxuICAgICAgICAgICAgdGhpcy5jaGFydC5yZXNpemUoaGVpZ2h0LCB3aWR0aCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWRyYXdzIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVkcmF3Q2hhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydC5yZWRyYXcoKTtcclxuICAgICAgICBpZih0aGlzLmN1cnNvckhhbmRsZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyLnVwZGF0ZUNoYXJ0QXJlYSh0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXBvc2l0aW9uQ3Vyc29ycygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGdpdmVuIHNlcmllIGludG8gYSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNlcmllc1RvQ2hhcnQoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgeVNjYWxlOiBTY2FsZSwgdXBkYXRlUmFuZ2VYOiBib29sZWFuKXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ucmF3UG9pbnRzVmFsaWQgPT0gdHJ1ZSAmJiB0aGlzLnNlcmllcy5tYXAoZSA9PiBlLnNlcmllKS5pbmRleE9mKHNlcmllc1tpXSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydFNlcmllcyA9IG5ldyBDaGFydFZpZXdTZXJpZShzZXJpZXNbaV0sIHlTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllcy5wdXNoKGNoYXJ0U2VyaWVzKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJpZXNBZGRlZC5yYWlzZSh0aGlzLCBzZXJpZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGdpdmVuIHNlcmllIGZyb20gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSByZXNldEN1cnNvclN0YXRlc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWVGcm9tQ2hhcnQoc2VyaWU6IEJhc2VTZXJpZXN8Q2hhcnRWaWV3U2VyaWUsIHJlc2V0Q3Vyc29yU3RhdGVzOiBib29sZWFuKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlcmllSW5DaGFydChzZXJpZSk7XHJcbiAgICAgICAgbGV0IGN1cnNvclR5cGUgPSB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG5cclxuICAgICAgICAvL1Jlc2V0IGN1cnNvciBzdGF0ZXMgaWYgdGhlcmUgYXJlIG5vIG1vcmUgc2VyaWVzIGluIHRoZSBjaGFydFZpZXcgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBjdXJzb3IgdHlwZVxyXG4gICAgICAgIGlmIChyZXNldEN1cnNvclN0YXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0Q3Vyc29yU3RhdGVzKGN1cnNvclR5cGUhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVkcmF3IGN1cnNvcnNcclxuICAgICAgICBsZXQgc3RhdGVzID0gdGhpcy5nZXRVc2VkQ3Vyc29yU3RhdGVzKCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdGF0ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdGltZXN0YW1wID0gc3RhdGVzW2ldLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdDdXJzb3IodGltZXN0YW1wISwgaSwgc3RhdGVzW2ldLmhvdmVyZWQsIHN0YXRlc1tpXS5zZWxlY3RlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VyaWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXJpZUluQ2hhcnQoc2VyaWUpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJpZXNbaV0uaWQgPT0gc2VyaWUuaWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFpvb21BeGVzKHpvb21BeGVzOiBab29tRGlyZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmNoYXJ0LnNldFpvb21EaXJlY3Rpb24oem9vbUF4ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhbm5pbmcoZW5hYmxlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmNoYXJ0LmVuYWJsZVBhbm5pbmcoZW5hYmxlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUGFubmluZyBvcGVyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhZ2VYXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhZ2VZXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKXtcclxuICAgICAgICB0aGlzLmNoYXJ0LmRvUGFubmluZyhwYWdlWCwgcGFnZVkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWRyYXdBbGxDaGFydHMucmFpc2UodGhpcywgbmV3IEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyh0aGlzLnR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRQYW5uaW5nQ29vcmRzKCl7XHJcbiAgICAgICAgLy9UT0RPOiB0aGlzIGlzIGEgb25seSB3b3JrYXJvdW5kLCBuZWVkcyB0byBiZSBmaXhlZCBcclxuICAgICAgICAodGhpcy5jaGFydCBhcyBTRkNoYXJ0V3JhcHBlcikucHJldlBhbm5pbmdDb29yZHMgPSB7J3gnOiB1bmRlZmluZWQsICd5JzogdW5kZWZpbmVkfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZXMgYm94IHpvb21pbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Qm94Wm9vbShlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNoYXJ0LmVuYWJsZUJveFpvb20oZW5hYmxlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpEcmF3IHRoZSBjdXJzb3IgZGVmaW5lZCBieSBpdHMgaW5kZXggZm9yIGEgZ2l2ZW4gdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBob3ZlcmVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZHJhd0N1cnNvcih0aW1lc3RhbXA6IG51bWJlciwgY3Vyc29ySW5kZXg6IG51bWJlciwgaG92ZXJlZDogYm9vbGVhbiwgc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZih0aGlzLmN1cnNvckhhbmRsZXIgIT0gdW5kZWZpbmVkKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yUGl4ZWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgbGV0IGxlYWRDdXJzb3JUaW1lc3RhbXA7XHJcblxyXG4gICAgICAgICAgICAvL3RoZSBjdXJzb3JQb3NpdGlvbiBmb3IgZWFjaCBzZXJpZSBpcyBzdG9yZWQgaW4gYW4gYXJyYXlcclxuICAgICAgICAgICAgbGV0IGN1cnNvclBvc2l0aW9ucyA6IEN1cnNvclBvc2l0aW9uSW5mb1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvL2lmIHRoZSBnaXZlbiB0aW1lc3RhbXAgaXMgb3V0c2lkZSBvZiB0aGUgc2VyaWVzIGJvdW5kcywgdGhlIGN1cnNvciBtdXN0IG5vdCBiZSBkcmF3biBhdCBhbGxcclxuICAgICAgICAgICAgbGV0IGN1cnNvck91dE9mU2VyaWVzQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yKGxldCBzZXJpZXNJbmRleCA9IDAgOyBzZXJpZXNJbmRleCA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgc2VyaWVzSW5kZXgrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aW1lc3RhbXAgPj0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHNbMF0gJiYgdGltZXN0YW1wIDw9IHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzW3RoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzLmxlbmd0aC0xXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yT3V0T2ZTZXJpZXNCb3VuZHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjdXJzb3JPdXRPZlNlcmllc0JvdW5kcyA9PSBmYWxzZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9sZWFkQ3Vyc29yUG9zaXRpb24gaGFzIHRvIGJlIGNvbnZlcnRlZCB0byBwaXhlbHMgdG8gYmUgZHJhd25cclxuICAgICAgICAgICAgICAgIGxlYWRDdXJzb3JQaXhlbFBvc2l0aW9uID0gdGhpcy5nZXRQaXhlbHNGcm9tQ2hhcnRQb2ludCh0aW1lc3RhbXAsIDAsIHRoaXMucHJpbWFyeVlBeGlzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vbGVhZEN1cnNvclRpbWVzdGFtcCBpcyBuZWVkZWQgdG8gY2FsY3VsYXRlIHRoZSBjdXJzb3IgcG9zaXRpb25zIGZvciB0aGUgb3RoZXIgc2VyaWVzIChtaWdodCBiZSBkaWZmZXJlbnQgZnJvbSB0aGUgdGltZXN0YW1wIGFyZ3VtZW50KVxyXG4gICAgICAgICAgICAgICAgbGVhZEN1cnNvclRpbWVzdGFtcCA9IHRpbWVzdGFtcC8vdGhpcy5nZXRUaW1lc3RhbXBJblNlcmllcyhsZWFkQ3Vyc29yQ2hhcnRQb2ludCwgYWxsU2VyaWVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoZSBjdXJzb3IgcG9zaXRpb25zIGFyZSBjYWxjdWxhdGVkIGZvciBlYWNoIHNlcmllcyB0byBkcmF3IHRoZSBzcXVhcmVzIGZvciB0aGUgdGltZXN0YW1wIGluZGljYXRvclxyXG4gICAgICAgICAgICAgICAgY3Vyc29yUG9zaXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHNlcmllc0luZGV4ID0gMCA7IHNlcmllc0luZGV4IDwgdGhpcy5zZXJpZXMubGVuZ3RoOyBzZXJpZXNJbmRleCsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vbmx5IGRyYXcgdGhlIGN1cnNvciBmb3IgYSBzZXJpZXMgd2hlbiBpdCBpcyB3aXRoaW4gdGhlIHNlcmllcyBib3VuZHMgb2YgdGhhdCBjaGFydFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxlYWRDdXJzb3JUaW1lc3RhbXAgPj0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHNbMF0gJiYgbGVhZEN1cnNvclRpbWVzdGFtcCA8PSB0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wc1t0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wcy5sZW5ndGgtMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yQ2hhcnRQb2ludCA9IHRoaXMuZ2V0Q3Vyc29yUG9pbnQodGltZXN0YW1wLCB0aGlzLnNlcmllcywgc2VyaWVzSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVJZCA9IHRoaXMuZ2V0U2NhbGVJREZvclNlcmllcyh0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yUG9zaXRpb24gPSB0aGlzLmdldFBpeGVsc0Zyb21DaGFydFBvaW50KGN1cnNvckNoYXJ0UG9pbnQueCwgY3Vyc29yQ2hhcnRQb2ludC55LCBzY2FsZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IGhpZ2hsaWdodCB0byB0cnVlIGlmIGN1cnNvciBpcyBob3ZlcmVkIGFuZCBpZiBpdHMgc2VyaWVzIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0Q3Vyc29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaG92ZXJlZFNlcmllcy5pbmRleE9mKHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XSApICE9IC0xICYmIGhvdmVyZWQgJiYgKHRoaXMuc2VyaWVzLmxlbmd0aCAhPSB0aGlzLmhvdmVyZWRTZXJpZXMubGVuZ3RoIHx8IHRoaXMuaG92ZXJlZFNlcmllcy5sZW5ndGggPT0gMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0Q3Vyc29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JQb3NpdGlvbnMucHVzaChuZXcgQ3Vyc29yUG9zaXRpb25JbmZvKGN1cnNvclBvc2l0aW9uLCB7c2VsZWN0ZWQ6IHNlbGVjdGVkLCBob3ZlcmVkOiBob3ZlcmVkLCBoaWdobGlnaHQ6IGhpZ2hsaWdodEN1cnNvciwgc2VyaWVzOiBbdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdXSwgY3Vyc29ySW5kZXg6IGN1cnNvckluZGV4fSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yUG9zaXRpb24gPSBuZXcgQ3Vyc29yUG9zaXRpb25JbmZvKGxlYWRDdXJzb3JQaXhlbFBvc2l0aW9uLCB7c2VsZWN0ZWQ6IHNlbGVjdGVkLCBob3ZlcmVkOiBob3ZlcmVkLCBzZXJpZXM6IHRoaXMuc2VyaWVzLCBjdXJzb3JJbmRleDogY3Vyc29ySW5kZXh9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyLmRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uLGN1cnNvclBvc2l0aW9ucywgY3Vyc29ySW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0U2NhbGVJREZvclNlcmllcyhzZXJpZXM6IEJhc2VTZXJpZXMpIDogc3RyaW5ne1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2NhbGVzW2ldLmhhc1NlcmllKHNlcmllcykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGVzW2ldLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTY2FsZUJ5U2NhbGVJZChzY2FsZUlkKSA6IFNjYWxlfHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihzY2FsZUlkID09IHRoaXMuc2NhbGVzW2ldLmlkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYWxlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXV0b1NjYWxlWVNjYWxlcygpe1xyXG4gICAgICAgIGxldCBzY2FsZXMgPSB0aGlzLmdldFlTY2FsZXMoKTtcclxuICAgICAgICBsZXQgY2hhcnRNaW5ZUGl4ZWwgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBjaGFydE1heFlQaXhlbCA6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNjYWxlIG9mIHNjYWxlcyl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNNaW5ZID0gdGhpcy5nZXRTZXJpZXNNaW5ZRm9yU2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzTWF4WSA9IHRoaXMuZ2V0U2VyaWVzTWF4WUZvclNjYWxlKHNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNlcmllc01pblkgIT0gdW5kZWZpbmVkICYmIHNlcmllc01heFkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWluWVBpeGVsID0gdGhpcy5jYWxjdWxhdGVQaXhlbFkoc2NhbGUuaWQsIHNlcmllc01pblkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNYXhZUGl4ZWwgPSB0aGlzLmNhbGN1bGF0ZVBpeGVsWShzY2FsZS5pZCwgc2VyaWVzTWF4WSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnRNaW5ZUGl4ZWwgPT0gdW5kZWZpbmVkIHx8IGF4aXNNaW5ZUGl4ZWwgPiBjaGFydE1pbllQaXhlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRNaW5ZUGl4ZWwgPSBheGlzTWluWVBpeGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnRNYXhZUGl4ZWwgPT0gdW5kZWZpbmVkIHx8IGF4aXNNYXhZUGl4ZWwgPCBjaGFydE1heFlQaXhlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRNYXhZUGl4ZWwgPSBheGlzTWF4WVBpeGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjaGFydE1pbllQaXhlbCAhPSB1bmRlZmluZWQgJiYgY2hhcnRNYXhZUGl4ZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgc2NhbGUgb2Ygc2NhbGVzKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBeGlzTWluVmFsdWUgPSB0aGlzLmdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbCh0aGlzLnByaW1hcnlYQXhpc05hbWUsIHNjYWxlLmlkLCAwLCBjaGFydE1pbllQaXhlbCkueTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBeGlzTWF4VmFsdWUgPSB0aGlzLmdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbCh0aGlzLnByaW1hcnlYQXhpc05hbWUsIHNjYWxlLmlkLCAwLCBjaGFydE1heFlQaXhlbCkueTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJhbmdlWShzY2FsZSxuZXdBeGlzTWluVmFsdWUsIG5ld0F4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHJhbmdlIGZvciBYIEF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3TWluWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01heFhcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFJhbmdlWChuZXdNaW5YOiBudW1iZXIsIG5ld01heFg6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5zY2FsZXNbMF0ubWluWFZhbHVlID0gbmV3TWluWDtcclxuICAgICAgICB0aGlzLnNjYWxlc1swXS5tYXhYVmFsdWUgPSBuZXdNYXhYO1xyXG5cclxuICAgICAgICAvL1RyaWdnZXIgZXZlbnQgc28gYXhpcyByYW5nZSBjYW4gYmUgcGVyc2lzdGVkIHdoZW4gJ0F1dG9TY2FsZScgb3IgJ1Jlc2V0IEFsbCcgIFxyXG4gICAgICAgIGxldCBhcmdzID0gbmV3IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3MoU2NhbGVBY3Rpb24ueFJhbmdlQ2hhbmdlZCwge3NjYWxlOiB0aGlzLnNjYWxlc1swXX0pO1xyXG4gICAgICAgIHRoaXMuc2NhbGVzWzBdLmV2ZW50RGF0YUNoYW5nZWQucmFpc2UodGhpcy5zY2FsZXNbMF0sYXJncyk7XHJcblxyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgaWYoIGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYXhpcy5zZXRBeGlzUmFuZ2Uoe21pbjogbmV3TWluWCwgbWF4OiBuZXdNYXhYfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgU2V0cyB0aGUgcmFuZ2Ugb2YgdGhpcyBjaGFydCBmb3IgdGhlIGdpdmVuIGF4aXMgYW5kIG1pbi9tYXggdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4WFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWVZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4WVZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZXRBeGlzUmFuZ2U9dHJ1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNjYWxlUmFuZ2Uoc2NhbGU6IFNjYWxlLCBtaW5YVmFsdWU6IG51bWJlciwgbWF4WFZhbHVlOiBudW1iZXIsIG1pbllWYWx1ZTogbnVtYmVyLCBtYXhZVmFsdWU6IG51bWJlciwgb3JpZW50YXRpb24/OiBzdHJpbmcsIHNldEF4aXNSYW5nZSA9IHRydWUpIHtcclxuICAgICAgICBzY2FsZS5zZXRTY2FsZVJhbmdlKG1pblhWYWx1ZSwgbWF4WFZhbHVlLCBtaW5ZVmFsdWUsIG1heFlWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChzZXRBeGlzUmFuZ2UpIHtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGUuaWQpO1xyXG4gICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKHsgbWluOiBzY2FsZS5taW5ZVmFsdWUsIG1heDogc2NhbGUubWF4WVZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIFkgcmFuZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5QXhpc01heFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geUF4aXNNaW5WYWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlUmFuZ2VZKHNjYWxlOiBTY2FsZSwgeUF4aXNNaW5WYWx1ZTogbnVtYmVyLCB5QXhpc01heFZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXI7XHJcbiAgICBcclxuICAgICAgICBpZighaXNOYU4oeUF4aXNNYXhWYWx1ZSkgfHwgIWlzTmFOKHlBeGlzTWluVmFsdWUpKXtcclxuXHJcbiAgICAgICAgICAgIHlBeGlzTWF4VmFsdWUgPSBOdW1iZXIoeUF4aXNNYXhWYWx1ZS50b1ByZWNpc2lvbigxNCkpO1xyXG4gICAgICAgICAgICB5QXhpc01pblZhbHVlID0gTnVtYmVyKHlBeGlzTWluVmFsdWUudG9QcmVjaXNpb24oMTQpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB5QXhpc1JhbmdlID0geUF4aXNNYXhWYWx1ZSAtIHlBeGlzTWluVmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB5QXhpc09mZnNldDtcclxuICAgICAgICAgICAgaWYoeUF4aXNSYW5nZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIC8vaWYgcmFuZ2UgaXMgemVybywgd2UgaGF2ZSB0byBjYWxjdWxhdGUgYW4gYXJiaXRyYXJ5IG9mZnNldCB0byBkaXNwbGF5IHRoZSB5IGF4aXMgY29ycmVjdGx5XHJcbiAgICAgICAgICAgICAgICB5QXhpc09mZnNldCA9IGNoYXJ0UmFuZ2VIZWxwZXIuZ2V0QXhpc09mZnNldEZvclN0cmFpZ2h0TGluZXMoeUF4aXNNaW5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGl4ZWxSYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlSW5QaXhlbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgeUF4aXNPZmZzZXQgPSBjaGFydFJhbmdlSGVscGVyLmdldEF4aXNPZmZzZXQoeUF4aXNSYW5nZSwocGl4ZWxSYW5nZS5tYXggLSBwaXhlbFJhbmdlLm1pbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB5QXhpc01heFZhbHVlICs9IHlBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICB5QXhpc01pblZhbHVlIC09IHlBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgeUF4aXNSYW5nZSA9IHlBeGlzTWF4VmFsdWUhIC0geUF4aXNNaW5WYWx1ZSFcclxuICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVJhbmdlKHNjYWxlLCBzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSwgeUF4aXNNaW5WYWx1ZSwgeUF4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBZIHZhbHVlIGZyb20gYWxsIHRoZSBzZXJpZXMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VyaWVzTWluWUZvclNjYWxlKHNjYWxlOiBTY2FsZSkgOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5ZOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGUuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKG1pblkgPT0gdW5kZWZpbmVkIHx8IHNjYWxlLmNoaWxkc1tpXS5taW5ZISA8IG1pblkpe1xyXG4gICAgICAgICAgICAgICAgbWluWSA9IHNjYWxlLmNoaWxkc1tpXS5taW5ZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtaW5ZOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCBZIHZhbHVlIGZyb20gYWxsIHRoZSBzZXJpZXMgb24gdGhlIGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXJpZXNNYXhZRm9yU2NhbGUoc2NhbGU6IFNjYWxlKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGUuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKG1heFkgPT0gdW5kZWZpbmVkIHx8IHNjYWxlLmNoaWxkc1tpXS5tYXhZISA+IG1heFkpe1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHNjYWxlLmNoaWxkc1tpXS5tYXhZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhZOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgYXZhaWxhYmxlIHVpIGN1cnNvcnMgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHN0YXRlIGluIHJlc3BvbnNlIHRvIGEgc3RhdGUgY2hhbmdlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gbW9kaWZpZWRTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVVJQ3Vyc29ycyAobW9kaWZpZWRTdGF0ZTogQ3Vyc29yU3RhdGVzKSB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZUN1cnNvclR5cGUgPSB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yVGltZVN0YXRlcyA9IG1vZGlmaWVkU3RhdGUuZ2V0VGltZVN0YXRlcygpO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yRnJlcVN0YXRlcyA9IG1vZGlmaWVkU3RhdGUuZ2V0RnJlcXVlbmN5U3RhdGVzKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKHNlcmllQ3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yTG9hdGlvbnMoY3Vyc29yVGltZVN0YXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VyaWVDdXJzb3JUeXBlID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvckxvYXRpb25zKGN1cnNvckZyZXFTdGF0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gdGhlIHRyeSBjYXRjaCBibG9jayBmaXhlcyBhbiBpbmNvcnJlY3Qgc2VxdWVuY2Ugd2hlbiBjbG9zaW5nIGFuZCByZW9wZW5pbmcgdGhlIGFuYWx5c2lzIHZpZXcgYXMgYSB3b3JrYXJvdW5kIHVudGlsXHJcbiAgICAgICAgICAgIC8vIHRoZSBiaW5kaW5nIGNvbm5lY3Rpb25zIHdpbGwgYmUgY2xlYW5lZCB1cCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNoYXJ0QmFzZS51cGRhdGVVSUN1cnNvcnM6IGN1cnNvcnMgY291bGQgbm90IGJlIHVwZGF0ZWQgYmVjYXVzZSBvZiBleGNlcHRpb24gJW9cIixlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHVwZGF0ZUN1cnNvckxvYXRpb25zIChjdXJzb3JTdGF0ZXM6IElDdXJzb3JTdGF0ZVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGN1cnNvclN0YXRlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5zZXRDdXJzb3JTdGF0ZShpbmRleCwgY3Vyc29yU3RhdGVzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY3Vyc29ycyBvbmx5IGlmIHRoZXkgaGF2ZSBhIHZhbGlkIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IGN1cnNvclN0YXRlc1tpbmRleF0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0N1cnNvcihwb3NpdGlvbiwgaW5kZXgsIGN1cnNvclN0YXRlc1tpbmRleF0uaG92ZXJlZCwgY3Vyc29yU3RhdGVzW2luZGV4XS5zZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1pblhBeGlzVmFsdWUgKCkgIHtcclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGF4aXMuZ2V0QXhpc1JhbmdlKCkubWluXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXhYQXhpc1ZhbHVlICgpIHtcclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGF4aXMuZ2V0QXhpc1JhbmdlKCkubWF4XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcmV0dXJucyB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGl4ZWxzRnJvbUNoYXJ0UG9pbnQgKHg6IG51bWJlciwgeTogbnVtYmVyLCBzY2FsZUlEOiBzdHJpbmcpOiB7IHg6IG51bWJlciwgeTogbnVtYmVyfSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgcmV0dXJuIHsgeDogdGhpcy5jYWxjdWxhdGVQaXhlbFgoeCkgLSBjaGFydEFyZWEueCwgeTogdGhpcy5jYWxjdWxhdGVQaXhlbFkoc2NhbGVJRCwgeSkgLSBjaGFydEFyZWEueX07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXZSByZXBvc2l0aW9uIHRoZSBjdXJzb3JzIGFzd2VsbCB3aGVuIHdlIHVwZGF0ZSB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcmVwb3NpdGlvbkN1cnNvcnMoKSB7XHJcbiAgICAgICAgLy8gRm9yY2UgdXBkYXRpbmcgdGhlIGN1cnNvcnMgc3RhdGVzIHdoaWNoIGluIHJlc3BvbnNlIHVwZGF0ZXMgdGhlIGN1cnNvciB1aSAuLi4uXHJcbiAgICAgICAgLy90aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVUlDdXJzb3JzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNoYXJ0WFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVQaXhlbFggKGNoYXJ0WDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbWluWCA9IHRoaXMuZ2V0TWluWEF4aXNWYWx1ZSgpO1xyXG4gICAgICAgIGxldCBtYXhYID0gdGhpcy5nZXRNYXhYQXhpc1ZhbHVlKCk7IFxyXG5cclxuICAgICAgICBpZihtYXhYICE9IHVuZGVmaW5lZCAmJiBtaW5YICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCByYW5nZSA9IChtYXhYIC0gbWluWClcclxuICAgICAgICAgICAgbGV0IHN0YXJ0WCA9IG1pblg7IFxyXG4gICAgICAgICAgICBsZXQgYWN0dWFsUmFuZ2UgPSByYW5nZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aW1lUGVyY2VudGFnZSA9IChjaGFydFggLSBzdGFydFgpIC8gYWN0dWFsUmFuZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0QXJlYS54ICsgY2hhcnRBcmVhLndpZHRoICogdGltZVBlcmNlbnRhZ2VcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFydFlcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUGl4ZWxZIChzY2FsZUlEOiBzdHJpbmcsIGNoYXJ0WTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyhzY2FsZUlEKTtcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBheGlzUmFuZ2UgPSBheGlzLmdldEF4aXNSYW5nZSgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcmFuZ2U7XHJcbiAgICAgICAgICAgIGlmKGF4aXNSYW5nZS5kZWx0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmFuZ2UgPSBheGlzUmFuZ2UuZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJhbmdlID0gYXhpc1JhbmdlLm1heCAtIGF4aXNSYW5nZS5taW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzdGFydFkgPSBheGlzUmFuZ2UubWluO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVQZXJjZW50YWdlID0gMSAtICgoY2hhcnRZIC0gc3RhcnRZKSAvIHJhbmdlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnRBcmVhLnkgKyBjaGFydEFyZWEuaGVpZ2h0ICogdmFsdWVQZXJjZW50YWdlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgZHJvcCBsb2NhdGlvbnMgZnJvbSB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVTZXJpZURyb3BMb2NhdGlvbnMoKXtcclxuICAgICAgICBsZXQgY2hhcnREaXYgPSAkKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgZm9yKGxldCBheGlzQm91bmQgb2YgdGhpcy5heGlzQm91bmRzKXtcclxuICAgICAgICAgICAgbGV0IGRyb3Bab25lRGl2ID0gY2hhcnREaXYuZmluZChcIiNcIiArIHRoaXMuYXhpc0Ryb3Bab25lSWQgKyBheGlzQm91bmQuYXhpcy5uYW1lKTtcclxuICAgICAgICAgICAgZHJvcFpvbmVEaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkcm9wWm9uZURpdiA9IGNoYXJ0RGl2LmZpbmQoXCIjXCIgKyB0aGlzLmF4aXNEcm9wWm9uZUlkICtcIl9jaGFydEFyZWFcIik7XHJcbiAgICAgICAgZHJvcFpvbmVEaXYucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbnVtYmVyIG9mIHkgYXhlcyBpbnNpZGUgYSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXROdW1iZXJPZllTY2FsZXMoKSA6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCB5IGF4ZXMgZnJvbSBhIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NjYWxlW119XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRZU2NhbGVzKCkgOiBTY2FsZVtde1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBpeGVsQ29vcmRpbmF0ZVhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbENvb3JkaW5hdGVZXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbChzY2FsZUlEWDogc3RyaW5nLCBzY2FsZUlEWTogc3RyaW5nLHBpeGVsQ29vcmRpbmF0ZVggOiBudW1iZXIsIHBpeGVsQ29vcmRpbmF0ZVkgOiBudW1iZXIpIDogUG9pbnR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgbGV0IHhBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlSURYKTtcclxuICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGVJRFkpO1xyXG4gICAgICAgIGxldCB5QXhpc1JhbmdlID0geUF4aXMhLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgIGxldCB4QXhpc1JhbmdlID0geEF4aXMhLmdldEF4aXNSYW5nZSgpO1xyXG5cclxuICAgICAgICAvLyBYIEF4aXM6IFxyXG4gICAgICAgIGxldCByZWxhdGl2ZVBpeGVsQ29vcmRpbmF0ZVggPSBCaWcocGl4ZWxDb29yZGluYXRlWCkubWludXMoQmlnKGNoYXJ0QXJlYS54KSk7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXhpc1hSYW5nZSA9IEJpZyh4QXhpc1JhbmdlLm1heCkubWludXMoQmlnKHhBeGlzUmFuZ2UubWluKSk7XHJcblxyXG4gICAgICAgIGxldCBjaGFydENvb3JkaW5hdGVQZXJQaXhlbCA9IGNoYXJ0QXhpc1hSYW5nZS5kaXYoQmlnKGNoYXJ0QXJlYS53aWR0aCkpO1xyXG4gICAgICAgIGxldCBjbG9zZXN0WEF4aXNWYWx1ZVRvQ2xpY2sgPSBCaWcoeEF4aXNSYW5nZS5taW4pLnBsdXMoKHJlbGF0aXZlUGl4ZWxDb29yZGluYXRlWC50aW1lcyhjaGFydENvb3JkaW5hdGVQZXJQaXhlbCkpKTtcclxuXHJcbiAgICAgICAgLy8gWSBBeGlzOiBcclxuICAgICAgICBsZXQgcmVsYXRpdmVQaXhlbENvb3JkaW5hdGVZID0gQmlnKHBpeGVsQ29vcmRpbmF0ZVkpLm1pbnVzKEJpZyhjaGFydEFyZWEueSkpO1xyXG4gICAgICAgIGxldCBjaGFydEF4aXNZUmFuZ2UgPSBCaWcoeUF4aXNSYW5nZS5tYXgpLm1pbnVzKEJpZyh5QXhpc1JhbmdlLm1pbikpO1xyXG5cclxuICAgICAgICBjaGFydENvb3JkaW5hdGVQZXJQaXhlbCA9IGNoYXJ0QXhpc1lSYW5nZS5kaXYoQmlnKGNoYXJ0QXJlYS5oZWlnaHQpKTtcclxuICAgICAgICBsZXQgY2xvc2VzdFlBeGlzVmFsdWVUb0NsaWNrID0gIEJpZyh5QXhpc1JhbmdlLm1pbikucGx1cyhjaGFydEF4aXNZUmFuZ2UubWludXMocmVsYXRpdmVQaXhlbENvb3JkaW5hdGVZLnRpbWVzKGNoYXJ0Q29vcmRpbmF0ZVBlclBpeGVsKSkpXHJcblxyXG5cclxuICAgICAgICBsZXQgY2xvc2VzdFlBeGlzVmFsdWVOdW1iZXIgPSBOdW1iZXIoY2xvc2VzdFlBeGlzVmFsdWVUb0NsaWNrLnRvRml4ZWQoMTQpKTtcclxuICAgICAgICBsZXQgY2xvc2VzdFhBeGlzVmFsdWVOdW1iZXIgPSBOdW1iZXIoY2xvc2VzdFhBeGlzVmFsdWVUb0NsaWNrLnRvRml4ZWQoMTQpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludChjbG9zZXN0WEF4aXNWYWx1ZU51bWJlciwgY2xvc2VzdFlBeGlzVmFsdWVOdW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNlcmllcyBwb2ludCBpbiBjaGFydCBjb29yZGluYXRlcyBmb3IgdGhlIHNwZWNlZmllZCB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0U2VyaWVzUG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcDogbnVtYmVyKTogUG9pbnQge1xyXG5cclxuICAgICAgICAvLyB3ZSBwcm92aWRlIHkgPT0gMCBpZiB3ZSBhcmUgbm90IGFibGUgdG8gZmluZCBtYXRjaGluZyBwb2ludHNcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnQgPSBuZXcgUG9pbnQodGltZXN0YW1wLCAwKTtcclxuXHJcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hpbmcgaWYgdGhlIHNlcmllcyBpbmRleCBpcyBvdXQgb2YgcmFuZ2VcclxuICAgICAgICBpZiAodGhpcy5zZXJpZXMubGVuZ3RoID09IDAgKSByZXR1cm4gc2VyaWVzUG9pbnQ7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgYSBtYXRjaGluZyBzZXJpZXMgcG9pbnQgcmVsYXRlZCB0byB0aGUgdGltZXN0YW1wXHJcbiAgICAgICAgc2VyaWVzUG9pbnQgPSB0aGlzLmZpbmROZWFyZXN0UG9pbnRJbkFsbFNlcmllcyh0aW1lc3RhbXApO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWVzUG9pbnQ7XHJcbiAgICB9XHJcbiAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyBmb3IgdGhlIG5lYXJlc3QgcG9pbnQgcmVsYXRlZCB0byB0aGUgdGltZXN0YW1wIGluIGFsbCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTmVhcmVzdFBvaW50SW5BbGxTZXJpZXModGltZXN0YW1wOiBudW1iZXIpOiBQb2ludCB7ICAgICAgIFxyXG5cclxuICAgICAgICAvLyBjb2xsZWN0IHRoZSBuZWFyZXN0IHBvaW50cyBmcm9tIGV2ZXJ5IHNlcmllc1xyXG4gICAgICAgIGxldCBuZWFyZXN0U2VyaWVzUG9pbnRzOiBJUG9pbnRbXSA9IHRoaXMuc2VyaWVzLm1hcCgoc2luZ2xlU2VyaWVzKT0+IHsgcmV0dXJuIHNpbmdsZVNlcmllcy5zZXJpZS5wb2ludEZyb21UaW1lc3RhbXAodGltZXN0YW1wKX0pO1xyXG5cclxuICAgICAgICAvLyBzb3J0IHRoZSBuZWFyZXN0IHBvaW50cyBieSB0aGVpciB0aW1lc3RhbXAgdmFsdWVcclxuICAgICAgICBuZWFyZXN0U2VyaWVzUG9pbnRzLnNvcnQoKHZhbHVlMSwgdmFsdWUyKSA9PiB7IHJldHVybiB2YWx1ZTEueCAtIHZhbHVlMi54OyB9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0aW1lc3RhbXAgdmFsdWVzXHJcbiAgICAgICAgbGV0IG5lYXJlc3RTZXJpZXNUaW1lc3RhbXBzOiBudW1iZXJbXSA9IG5lYXJlc3RTZXJpZXNQb2ludHMubWFwKChzZXJpZXNQb2ludCk9PnsgcmV0dXJuIHNlcmllc1BvaW50Lnh9KTtcclxuXHJcbiAgICAgICAgLy8gZmluZCB0aGUgbmVhcmVzdCBwb2ludCBmcm9tIGFsbCBzZXJpZXMuIFRoZSBmb3VuZCBpbmRleCByZWZlcnMgdG8gdGhlIG5lYXJlc3Qgc2VyaWVzICFcclxuICAgICAgICBsZXQgbmVhcmVzdFNlcmllc0luZGV4ID0gU2VyaWVzSGVscGVyLmluZGV4T2ZOZWFyZXN0KHRpbWVzdGFtcCwgbmVhcmVzdFNlcmllc1RpbWVzdGFtcHMpO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG5lYXJlc3QgcG9pbnQgZnJvbSB0aGUgc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc1BvaW50RnJvbVRpbWVTdGFtcCA9IG5lYXJlc3RTZXJpZXNQb2ludHNbbmVhcmVzdFNlcmllc0luZGV4XTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgcG9pbnQgaW5zdGFuY2Ugd2l0aCBhIG1hdGNoaW5nIHRpbWVzdGFtcFxyXG4gICAgICAgIGxldCBzZXJpZXNQb2ludCA9IHNlcmllc1BvaW50RnJvbVRpbWVTdGFtcCA/IG5ldyBQb2ludChzZXJpZXNQb2ludEZyb21UaW1lU3RhbXAueCwgc2VyaWVzUG9pbnRGcm9tVGltZVN0YW1wLnkpIDogbmV3IFBvaW50KHRpbWVzdGFtcCwgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpZXNQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gT3ZlcmxvYWQgbWV0aG9kcyBpbiBkZXJpdmVkIGNoYXJ0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVtb3ZlWVNjYWxlRnJvbUNoYXJ0KHlTY2FsZTogU2NhbGUpe307XHJcblxyXG4gICAgcHVibGljIG9uU3luY2hyb25pemVTY2FsZVJhbmdlKHNjYWxlIDogU2NhbGUsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpIHt9XHJcblxyXG4gICAgcHVibGljIHNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpe31cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUNoYXJ0UmFuZ2VYKHhBeGlzTWluVmFsdWU6IG51bWJlciwgeEF4aXNNYXhWYWx1ZTogbnVtYmVyICkge1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKVxyXG5cclxuXHJcbiAgICAgICAgaWYoeEF4aXNNYXhWYWx1ZSAhPSB1bmRlZmluZWQgJiYgeEF4aXNNaW5WYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgeEF4aXNTZWdtZW50UmFuZ2UgPSB4QXhpc01heFZhbHVlIC0geEF4aXNNaW5WYWx1ZTtcclxuICAgICAgICAgICAgbGV0IHhBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICBpZih4QXhpc1NlZ21lbnRSYW5nZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHhBeGlzT2Zmc2V0ID0gY2hhcnRSYW5nZUhlbHBlci5nZXRBeGlzT2Zmc2V0Rm9yU3RyYWlnaHRMaW5lcyh0aGlzLnNlcmllc1swXS5yYXdQb2ludHNbMF0ueCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNQaXhlbFJhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2VJblBpeGVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeEF4aXNPZmZzZXQgPSBjaGFydFJhbmdlSGVscGVyLmdldEF4aXNPZmZzZXQoeEF4aXNTZWdtZW50UmFuZ2UsIChheGlzUGl4ZWxSYW5nZS5tYXggLSBheGlzUGl4ZWxSYW5nZS5taW4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB4QXhpc01heFZhbHVlISArPSB4QXhpc09mZnNldDtcclxuICAgICAgICAgICAgeEF4aXNNaW5WYWx1ZSEgLT0geEF4aXNPZmZzZXQ7XHJcbiAgICAgICAgICAgIHhBeGlzU2VnbWVudFJhbmdlID0geEF4aXNNYXhWYWx1ZSAtIHhBeGlzTWluVmFsdWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFJhbmdlWCh4QXhpc01pblZhbHVlLCB4QXhpc01heFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0VGltZXN0YW1wSW5TZXJpZXMocDogUG9pbnQsIHNlcmllcyA6IENoYXJ0Vmlld1NlcmllW10pOiBudW1iZXIgeyByZXR1cm4gcC54OyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEN1cnNvclBvaW50KHRpbWVzdGFtcDogbnVtYmVyLHNlcmllczogQ2hhcnRWaWV3U2VyaWVbXSwgc2VyaWVzSW5kZXg6bnVtYmVyKTogVGltZVBvaW50IHsgcmV0dXJuIHt4OiB0aW1lc3RhbXAseTogMCwgdGltZXN0YW1wOiB0aW1lc3RhbXB9O31cclxuXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVEcm9wTG9jYXRpb25zKHNlcmllOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnRNYW5hZ2VyQ2hhcnQpe307XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZERyb3BMb2NhdGlvbnMgKHNlcmllOiBCYXNlU2VyaWVzKXt9O1xyXG5cclxuICAgIHB1YmxpYyBnZXREcm9wTG9jYXRpb25UeXBlKGN1cnJlbnRUYXJnZXQ6IGFueSk6IERyb3BMb2NhdGlvblR5cGV7IHJldHVybiBEcm9wTG9jYXRpb25UeXBlLmludmFsaWQ7IH1cclxuXHJcbiAgICBwdWJsaWMgYWRkWVNjYWxlKHNjYWxlIDogU2NhbGUsIHBvc2l0aW9uOiBBeGlzUG9zaXRpb24pe31cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlRHJvcHBhYmxlQXJlYXMoY3VycmVudFRhcmdldCkge307XHJcblxyXG4gICAgcHVibGljIHJlc2V0SGlnaGxpZ2h0aW5nKCl7fTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VXNlZEN1cnNvclN0YXRlcygpOiBBcnJheTxJQ3Vyc29yU3RhdGU+IHsgcmV0dXJuIFtdfTtcclxufVxyXG5cclxuZXhwb3J0IHsgQ2hhcnRCYXNlLCBFdmVudFJlZHJhd0FsbENoYXJ0cywgRXZlbnRSZWRyYXdBbGxDaGFydHNBcmdzLCBFdmVudFNlcmllc0FkZGVkLCBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uLCBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncywgQ2hhcnRPYmplY3RUeXBlLCBEcm9wTG9jYXRpb25UeXBlLCBDaGFydE9iamVjdEluZm9ybWF0aW9ufTtcclxuXHJcbiJdfQ==
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "../common/domHelper", "./watchablesGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./watchableValueBuffer", "./componentDefaultDefinition"], function (require, exports, domHelper_1, watchablesGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, watchableValueBuffer_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // defines the base id for the watchable value template
    var WATCHABLE_VALUE_ID = "watchableValue_";
    var WATCHABLE_TREND_ID = "watchableTrend_";
    /**
     * implements the widget for displaying the watchables and their values with fast update. It includes displaying a short value trend.
     *
     * @class WatchablesWidget
     * @extends {TreeGridWidgetBase}
     */
    var WatchablesWidget = /** @class */ (function (_super) {
        __extends(WatchablesWidget, _super);
        function WatchablesWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // holds a list of parameters to watch
            _this._watchableParameters = [];
            // holds a list of watchable parameters that use an icon to show its state
            _this._watchableStateParameters = [];
            // holds a trend buffer for every parameter
            _this._watchableTrendValues = {};
            // specifies the time span of the trend.
            _this._trendTimeSpan = 60000;
            // specifies the period for sampling the parameter values (msecs)
            _this._trendSamplingInterval = 100;
            // specifies the ui refresh rate (msecs)
            _this._trendRefreshingInterval = 500;
            // holds the timer id for the sample timer
            _this._watchableSampleTimerId = undefined;
            // holds the timer id for the trend timer
            _this._watchablTrendTimerId = -1;
            _this._watchableIconUpdateHandler = function (sender, args) { return _this.onWatchableIconUpdated(sender, args); };
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        WatchablesWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Watch");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        WatchablesWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        Object.defineProperty(WatchablesWidget.prototype, "watchableParameters", {
            /**
             * Sets the watchable parameters as the data source for the watchables widget
             *
             * @memberof WatchablesWidget
             */
            set: function (watchableParametersParametersLink) {
                this._watchableParameters = watchableParametersParametersLink.value;
                if (this._watchableParameters.length > 0) {
                    this.onComponentParametersUpdated();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WatchablesWidget.prototype, "watchableStateParameters", {
            set: function (watchableStateParameters) {
                this._watchableStateParameters = watchableStateParameters;
                this.addTreeGridIcons();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Loads the styles for the watchables widget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/watchablesWidget/style/css/toolbarIcons.css");
        };
        /**
         * The component parameters have been upfated
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onComponentParametersUpdated = function () {
            // create trend buffers for the parameters
            this.createWatchableTrendBuffers(this._watchableParameters);
            // start watchable trend timer
            this.startWatchablesTrend();
            // populate the watchables widget
            this.populateWatchablesWidget();
            // update treegrid's toolbar Icons
            this.updateToolbarIcons();
            // after populating the watchables we start observing value changes of the watchables
            this.observeWatchables(this._watchableParameters);
        };
        /**
         * Start
         *
         * @returns {*}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startWatchablesTrend = function () {
            this.startSamplingWatchables();
            this.startRefreshingWatchablesTrend();
        };
        /**
         * Starts sampling the watchables
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startSamplingWatchables = function () {
            var _this = this;
            // stop an eventually running timer before starting a new one
            this.stopSamplingTimer();
            this._watchableSampleTimerId = setInterval(function () {
                _this.sampleWatchables(_this._watchableParameters);
            }, this._trendSamplingInterval, this._watchableSampleTimerId);
        };
        /**
         * Stops the sampling timer
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.stopSamplingTimer = function () {
            if (this._watchableSampleTimerId) {
                clearInterval(this._watchableSampleTimerId);
            }
        };
        /**
         * Starts refreshing the watchables trend
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startRefreshingWatchablesTrend = function () {
            var _this = this;
            // stop an eventually running timer before starting a new one
            this.stopTrendTimer();
            this._watchablTrendTimerId = setInterval(function () {
                _this.refreshWatchablesTrend(_this._watchableParameters);
            }, this._trendRefreshingInterval);
        };
        /**
         * Stops the trend timer
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.stopTrendTimer = function () {
            if (this._watchablTrendTimerId) {
                clearInterval(this._watchablTrendTimerId);
            }
        };
        /**
         * Creates a trend buffer for every watchable parameter
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createWatchableTrendBuffers = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                _this._watchableTrendValues[watchableParameter.browseName] = watchableValueBuffer_1.WatchableValueTrendBuffer.create(_this._trendTimeSpan / _this._trendSamplingInterval);
            });
        };
        /** resizes the watchables widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            // Refresh watchable values after resize (treegrid sets the data to "0" after resize)
            this.refreshWatchablesValues(this._watchableParameters);
        };
        /** creates the tree grid for the watchables informations
         *
         * @protected
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { dataSource: undefined, cssClass: 'watchablesWidget', allowSelection: false, isResponsive: false, editSettings: {
                    allowEditing: false,
                    allowAdding: false,
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Name", isPrimaryKey: true, width: "200" },
                    { field: "displayValue", headerText: "Value", width: "200", isTemplateColumn: true, template: "<div style='padding-left: 20px' id='" + this.mainDivId + WATCHABLE_VALUE_ID + "{{:uiId}}'>0</div>" },
                    { field: "engineeringUnit", headerText: "Unit", width: "100" },
                    { field: "watchableTrend", headerText: "Trend", isTemplateColumn: true, template: "<div id='" + this.mainDivId + WATCHABLE_TREND_ID + "{{:uiId}}'></div>" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.columnResized(args); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @protected
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new watchablesGridToolbar_1.WatchablesGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        WatchablesWidget.prototype.columnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            // Refresh watchable values after resize (treegrid sets the data to "0" after resize)
            this.refreshWatchablesValues(this._watchableParameters);
        };
        /**
         * Add icons to the toolbar treegrid
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.addTreeGridIcons = function () {
            var _this = this;
            this._watchableStateParameters.forEach(function (stateParameter) {
                _this._toolbar.addIcon(stateParameter);
            });
        };
        /**
         * Disable button properties from icons
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.updateToolbarIcons = function () {
            var toolbar = this._toolbar;
            toolbar.hideIcon('empty');
            toolbar.disableIcons();
            toolbar.addEventListeners();
            toolbar.tooltipExtension();
        };
        /**
         *
         * marks the parameters with an id as a reference to the ui
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.setWatchablesUiId = function (watchableParameters) {
            for (var i = 0; i < watchableParameters.length; i++) {
                var watchableParameter = watchableParameters[i];
                watchableParameter.uiId = i;
            }
        };
        /**
         * Populate the widget with its specific data content.
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.populateWatchablesWidget = function () {
            this.setWatchablesUiId(this._watchableParameters);
            $(this.mainDiv).ejTreeGrid({
                dataSource: this._watchableParameters,
                toolbarSettings: {
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            });
        };
        /**
         * Samples the watchable values
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.sampleWatchables = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                // update the trend buffer
                _this.addWatchableTrendValue(watchableParameter);
            });
        };
        /**
         * Refreshes the watchables trend fields
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchablesTrend = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                var watchableTrendElement = _this.getWatchableTrendElement(watchableParameter);
                if (watchableTrendElement && domHelper_1.DomHelper.isElementInViewport(watchableTrendElement)) {
                    var watchableTrendFieldId = "#" + watchableTrendElement.id;
                    // update the trend field
                    _this.refreshWatchableTrendField(watchableParameter, watchableTrendFieldId);
                }
            });
        };
        /**
         * refreshes the content of the watchable value fields
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchablesValues = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) { _this.refreshWatchableValueField(watchableParameter); });
        };
        /**
         * Gets an element corresponding to the parameter to be used for displaying the watchable value
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableValueElement = function (watchableParameter) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + WATCHABLE_VALUE_ID + watchableParameter.uiId);
            return mySubDiv;
        };
        /**
         * Gets an element corresponding to the parameter to be used for displaying the watchable trend line
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns {(HTMLElement | null)}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableTrendElement = function (watchableParameter) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + WATCHABLE_TREND_ID + watchableParameter.uiId);
            return mySubDiv;
        };
        /**
         * updates a watchable field with the current values of the corresponding parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchableValueField = function (watchableParameter) {
            // get the corresponding ui element
            var watchableValueElement = this.getWatchableValueElement(watchableParameter);
            // let minValue = this._watchableTrendValues[watchableParameter.browseName]._minValue;
            // let maxValue = this._watchableTrendValues[watchableParameter.browseName]._maxValue;
            // let valueString: string = watchableParameter.displayValue.toString() + "(" + minValue + "-" + maxValue + ")";
            var valueString = watchableParameter.displayValue.toString();
            if (watchableValueElement) {
                watchableValueElement.innerHTML = valueString;
            }
        };
        /**
         * refreshes the visible trend filed content
         *
         * @param {MappCockpitComponentParameter} watchableParameter
         * @param {string} watchableTrendFieldId
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchableTrendField = function (watchableParameter, watchableTrendFieldId) {
            var watchableTrendData = this.getWatchableTrendValues(watchableParameter);
            this.renderWatchableTrend(watchableTrendFieldId, watchableTrendData);
        };
        /**
         * gets the trend values for the watchable parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns {Array<any>}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableTrendValues = function (watchableParameter) {
            var trendValues = [];
            if (this._watchableTrendValues[watchableParameter.browseName]) {
                trendValues = this._watchableTrendValues[watchableParameter.browseName].values;
            }
            return trendValues;
        };
        /**
         * renders a short history of trends
         *
         * @private
         * @param {string} watchableTrendFieldId
         * @param {number[]} watchableTrendData
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.renderWatchableTrend = function (watchableTrendFieldId, watchableTrendData) {
            // get the trend cell
            var $trendCell = $(watchableTrendFieldId);
            var $sparkInstance = $(watchableTrendFieldId + "_sparkline_svg");
            // create a new sparkline instance if not already existing
            if ($sparkInstance.length === 0) {
                this.createWatchableTrendView($trendCell, watchableTrendData);
            }
            else {
                // update the trendline with new data
                this.updateWatchableTrendView($trendCell, watchableTrendData);
            }
        };
        /**
         * updates the trend view with new data
         *
         * @private
         * @param {JQuery<HTMLElement>} $trendCell
         * @param {number[]} watchableTrendData
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.updateWatchableTrendView = function ($trendCell, watchableTrendData) {
            $trendCell.ejSparkline({
                dataSource: watchableTrendData,
            });
        };
        /**
         *
         * creates a new instance of a watchable trend view
         * @private
         * @param {JQuery<HTMLElement>} jqtrendCell
         * @param {number[]} watchableTrendData
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createWatchableTrendView = function ($trendCell, watchableTrendData) {
            $trendCell.ejSparkline({
                dataSource: watchableTrendData,
                width: 2,
                stroke: "#C4C4C4",
                type: "line",
                size: { height: 28, width: $trendCell.width() },
                isResponsive: false,
                padding: 2,
            });
        };
        /**
         * Observes the watchables for changes
         *
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.observeWatchables = function (watchableParameters) {
            // invoke observing the watchables
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, watchableParameters);
            // observe watchables inside each watchable state expression
            this.observeWatchablesInStateExpression(watchableParameters);
        };
        /**
         * called after changes of observables
         *
         * @param {Observable[]} changedObservables
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onObservablesChanged = function (changedObservables) {
            var _this = this;
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            changedObservables.forEach(function (observable) {
                if (observable.property === "Value") {
                    var watchableParameter = observable.object;
                    _this.onWatchableValueChanged(watchableParameter);
                }
            });
        };
        /**
         * Send watchables to state expression to be observed
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.observeWatchablesInStateExpression = function (watchableParameters) {
            var _this = this;
            this._watchableStateParameters.forEach(function (state) {
                var observedWatchables = watchableParameters.filter(function (watchable) { return state.stateExpression.watchableMapping.has(watchable.browseName); });
                state.stateExpression.observeWatchables(observedWatchables);
                //attach event listener
                state.stateExpression.eventIconUpdated.attach(_this._watchableIconUpdateHandler);
            });
        };
        /**
         * Handles the value change of a watchable parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableValueChanged = function (watchableParameter) {
            // refresh the value field.
            this.refreshWatchableValueField(watchableParameter);
        };
        /**
         * Called when watchable icon is updated
         *
         * @private
         * @param {*} sender
         * @param {{name: string, watchableIcon: WatchableIcon}} args
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableIconUpdated = function (sender, args) {
            this._toolbar.updateIcon(args.name, args.watchableIcon);
        };
        /**
         * Adds a new value to the parameters trend buffer
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.addWatchableTrendValue = function (watchableParameter) {
            // filter numbers and boolean values to be recorded
            if (typeof watchableParameter.value === "number" || typeof watchableParameter.value === "boolean") {
                this._watchableTrendValues[watchableParameter.browseName].push(watchableParameter.value);
            }
        };
        /**
         * activates WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.activate = function () {
            console.log("WatchablesWidget activated");
            mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this, this._watchableParameters);
        };
        /**
         * deactivates WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.deactivate = function () {
            console.log("WatchablesWidget deactivated");
            mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this, this._watchableParameters);
        };
        /**
         * disposes WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.dispose = function () {
            var _this = this;
            this.stopSamplingTimer();
            this.stopTrendTimer();
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, this._watchableParameters);
            // detach event listeners
            this._watchableStateParameters.forEach(function (state) {
                state.stateExpression.eventIconUpdated.detach(_this._watchableIconUpdateHandler);
            });
            _super.prototype.dispose.call(this);
        };
        return WatchablesWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.WatchablesWidget = WatchablesWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3dhdGNoYWJsZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0EsdURBQXVEO0lBQ3ZELElBQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDN0MsSUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztJQUM3Qzs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQXNtQkM7WUFybUJHLHNDQUFzQztZQUM5QiwwQkFBb0IsR0FBb0MsRUFBRSxDQUFDO1lBQ25FLDBFQUEwRTtZQUNsRSwrQkFBeUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3BFLDJDQUEyQztZQUNuQywyQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDbkMsd0NBQXdDO1lBQ2hDLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1lBQ3ZDLGlFQUFpRTtZQUN6RCw0QkFBc0IsR0FBVSxHQUFHLENBQUM7WUFDNUMsd0NBQXdDO1lBQ2hDLDhCQUF3QixHQUFVLEdBQUcsQ0FBQztZQUM5QywwQ0FBMEM7WUFDbEMsNkJBQXVCLEdBQXFCLFNBQVMsQ0FBQztZQUM5RCx5Q0FBeUM7WUFDakMsMkJBQXFCLEdBQXFCLENBQUMsQ0FBQyxDQUFDO1lBRTdDLGlDQUEyQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXhDLENBQXdDLENBQUM7O1FBb2xCbEcsQ0FBQztRQWxsQkc7Ozs7O1dBS0c7UUFDSCw2Q0FBa0IsR0FBbEI7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxzQ0FBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0s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QUFmO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQzFDLG9EQUE2QixDQUFDLDJCQUEyQixDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM5RixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLHFDQUFVLEdBQWpCO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQzVDLG9EQUE2QixDQUFDLDZCQUE2QixDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNoRyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLGtDQUFPLEdBQWQ7WUFBQSxpQkFTQztZQVJHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixvREFBNkIsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDM0YseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO2dCQUN6QyxLQUFLLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNwRixDQUFDLENBQUMsQ0FBQTtZQUNGLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUF0bUJELENBQStCLHVDQUFrQixHQXNtQmhEO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuaW1wb3J0IHsgSVdhdGNoYWJsZXNXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3dhdGNoYWJsZXNXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVVpQmluZGluZyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlc0dyaWRUb29sYmFyIH0gZnJvbSBcIi4vd2F0Y2hhYmxlc0dyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyIH0gZnJvbSBcIi4vd2F0Y2hhYmxlVmFsdWVCdWZmZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFdhdGNoYWJsZUljb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zdGF0ZUV4cHJlc3Npb24vd2F0Y2hhYmxlSWNvblwiO1xyXG5cclxuLy8gZGVmaW5lcyB0aGUgYmFzZSBpZCBmb3IgdGhlIHdhdGNoYWJsZSB2YWx1ZSB0ZW1wbGF0ZVxyXG5jb25zdCBXQVRDSEFCTEVfVkFMVUVfSUQgPSBcIndhdGNoYWJsZVZhbHVlX1wiO1xyXG5jb25zdCBXQVRDSEFCTEVfVFJFTkRfSUQgPSBcIndhdGNoYWJsZVRyZW5kX1wiO1xyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgd2lkZ2V0IGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGVzIGFuZCB0aGVpciB2YWx1ZXMgd2l0aCBmYXN0IHVwZGF0ZS4gSXQgaW5jbHVkZXMgZGlzcGxheWluZyBhIHNob3J0IHZhbHVlIHRyZW5kLlxyXG4gKlxyXG4gKiBAY2xhc3MgV2F0Y2hhYmxlc1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgV2F0Y2hhYmxlc1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElXYXRjaGFibGVzV2lkZ2V0IHtcclxuICAgIC8vIGhvbGRzIGEgbGlzdCBvZiBwYXJhbWV0ZXJzIHRvIHdhdGNoXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICAvLyBob2xkcyBhIGxpc3Qgb2Ygd2F0Y2hhYmxlIHBhcmFtZXRlcnMgdGhhdCB1c2UgYW4gaWNvbiB0byBzaG93IGl0cyBzdGF0ZVxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10gPSBbXTtcclxuICAgIC8vIGhvbGRzIGEgdHJlbmQgYnVmZmVyIGZvciBldmVyeSBwYXJhbWV0ZXJcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVRyZW5kVmFsdWVzID0ge307XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHRpbWUgc3BhbiBvZiB0aGUgdHJlbmQuXHJcbiAgICBwcml2YXRlIF90cmVuZFRpbWVTcGFuOiBudW1iZXIgPSA2MDAwMDtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgcGVyaW9kIGZvciBzYW1wbGluZyB0aGUgcGFyYW1ldGVyIHZhbHVlcyAobXNlY3MpXHJcbiAgICBwcml2YXRlIF90cmVuZFNhbXBsaW5nSW50ZXJ2YWw6bnVtYmVyID0gMTAwO1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSB1aSByZWZyZXNoIHJhdGUgKG1zZWNzKVxyXG4gICAgcHJpdmF0ZSBfdHJlbmRSZWZyZXNoaW5nSW50ZXJ2YWw6bnVtYmVyID0gNTAwO1xyXG4gICAgLy8gaG9sZHMgdGhlIHRpbWVyIGlkIGZvciB0aGUgc2FtcGxlIHRpbWVyXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVTYW1wbGVUaW1lcklkOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgLy8gaG9sZHMgdGhlIHRpbWVyIGlkIGZvciB0aGUgdHJlbmQgdGltZXJcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsVHJlbmRUaW1lcklkOiBudW1iZXJ8dW5kZWZpbmVkID0gLTE7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlSWNvblVwZGF0ZUhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uV2F0Y2hhYmxlSWNvblVwZGF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlZmluZUhlYWRlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiV2F0Y2hcIik7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMywgMTAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgd2F0Y2hhYmxlIHBhcmFtZXRlcnMgYXMgdGhlIGRhdGEgc291cmNlIGZvciB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHdhdGNoYWJsZVBhcmFtZXRlcnMod2F0Y2hhYmxlUGFyYW1ldGVyc1BhcmFtZXRlcnNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+KSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVBhcmFtZXRlcnNQYXJhbWV0ZXJzTGluay52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMod2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVycztcclxuICAgICAgICB0aGlzLmFkZFRyZWVHcmlkSWNvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSB3YXRjaGFibGVzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgICBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIHN1cGVyLmxvYWRTdHlsZXMoKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvd2F0Y2hhYmxlc1dpZGdldC9zdHlsZS9jc3MvdG9vbGJhckljb25zLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb21wb25lbnQgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBmYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpIHtcclxuICAgICAgICAvLyBjcmVhdGUgdHJlbmQgYnVmZmVycyBmb3IgdGhlIHBhcmFtZXRlcnNcclxuICAgICAgICB0aGlzLmNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAvLyBzdGFydCB3YXRjaGFibGUgdHJlbmQgdGltZXJcclxuICAgICAgICB0aGlzLnN0YXJ0V2F0Y2hhYmxlc1RyZW5kKCk7XHJcbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTtcclxuICAgICAgICAvLyB1cGRhdGUgdHJlZWdyaWQncyB0b29sYmFyIEljb25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFySWNvbnMoKTtcclxuICAgICAgICAvLyBhZnRlciBwb3B1bGF0aW5nIHRoZSB3YXRjaGFibGVzIHdlIHN0YXJ0IG9ic2VydmluZyB2YWx1ZSBjaGFuZ2VzIG9mIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdGNoYWJsZXNUcmVuZCgpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRTYW1wbGluZ1dhdGNoYWJsZXMoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0UmVmcmVzaGluZ1dhdGNoYWJsZXNUcmVuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHNhbXBsaW5nIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRTYW1wbGluZ1dhdGNoYWJsZXMoKSB7ICAgICAgICBcclxuICAgICAgICAvLyBzdG9wIGFuIGV2ZW50dWFsbHkgcnVubmluZyB0aW1lciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5zdG9wU2FtcGxpbmdUaW1lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCA9ICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9LCB0aGlzLl90cmVuZFNhbXBsaW5nSW50ZXJ2YWwsdGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgc2FtcGxpbmcgdGltZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wU2FtcGxpbmdUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyByZWZyZXNoaW5nIHRoZSB3YXRjaGFibGVzIHRyZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRSZWZyZXNoaW5nV2F0Y2hhYmxlc1RyZW5kKCkge1xyXG5cclxuICAgICAgICAvLyBzdG9wIGFuIGV2ZW50dWFsbHkgcnVubmluZyB0aW1lciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5zdG9wVHJlbmRUaW1lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZXNUcmVuZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9LCB0aGlzLl90cmVuZFJlZnJlc2hpbmdJbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgdHJlbmQgdGltZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wVHJlbmRUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGFibFRyZW5kVGltZXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHRyZW5kIGJ1ZmZlciBmb3IgZXZlcnkgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh3YXRjaGFibGVQYXJhbWV0ZXJzOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyLmNyZWF0ZTxhbnk+KHRoaXMuX3RyZW5kVGltZVNwYW4vdGhpcy5fdHJlbmRTYW1wbGluZ0ludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCB3YXRjaGFibGUgdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlc1ZhbHVlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgd2F0Y2hhYmxlcyBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd3YXRjaGFibGVzV2lkZ2V0JyxcclxuICAgICAgICAgICAgYWxsb3dTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGFsbG93RWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0FkZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0RlbGV0aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93RGVsZXRlQ29uZmlybURpYWxvZyAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dDb25maXJtRGlhbG9nICA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIGlzUHJpbWFyeUtleTogdHJ1ZSwgd2lkdGg6IFwiMjAwXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheVZhbHVlXCIsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgd2lkdGg6IFwiMjAwXCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3BhZGRpbmctbGVmdDogMjBweCcgaWQ9J1wiICsgdGhpcy5tYWluRGl2SWQgKyBXQVRDSEFCTEVfVkFMVUVfSUQgKyBcInt7OnVpSWR9fSc+MDwvZGl2PlwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImVuZ2luZWVyaW5nVW5pdFwiLCBoZWFkZXJUZXh0OiBcIlVuaXRcIiwgd2lkdGg6IFwiMTAwXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwid2F0Y2hhYmxlVHJlbmRcIiwgaGVhZGVyVGV4dDogXCJUcmVuZFwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZTogXCI8ZGl2IGlkPSdcIiArIHRoaXMubWFpbkRpdklkICsgV0FUQ0hBQkxFX1RSRU5EX0lEICsgXCJ7ezp1aUlkfX0nPjwvZGl2PlwiIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gdGhpcy5jb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgV2F0Y2hhYmxlc0dyaWRUb29sYmFyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZWQoYXJncyl7XHJcbiAgICAgICAgc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKTtcclxuICAgICAgICAvLyBSZWZyZXNoIHdhdGNoYWJsZSB2YWx1ZXMgYWZ0ZXIgcmVzaXplICh0cmVlZ3JpZCBzZXRzIHRoZSBkYXRhIHRvIFwiMFwiIGFmdGVyIHJlc2l6ZSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hXYXRjaGFibGVzVmFsdWVzKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBpY29ucyB0byB0aGUgdG9vbGJhciB0cmVlZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRyZWVHcmlkSWNvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzLmZvckVhY2goKHN0YXRlUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgICh0aGlzLl90b29sYmFyIGFzIFdhdGNoYWJsZXNHcmlkVG9vbGJhcikuYWRkSWNvbihzdGF0ZVBhcmFtZXRlcik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGUgYnV0dG9uIHByb3BlcnRpZXMgZnJvbSBpY29uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvb2xiYXJJY29ucygpIHtcclxuICAgICAgICBsZXQgdG9vbGJhciA9IHRoaXMuX3Rvb2xiYXIgYXMgV2F0Y2hhYmxlc0dyaWRUb29sYmFyO1xyXG4gICAgICAgIHRvb2xiYXIuaGlkZUljb24oJ2VtcHR5Jyk7XHJcbiAgICAgICAgdG9vbGJhci5kaXNhYmxlSWNvbnMoKTtcclxuICAgICAgICB0b29sYmFyLmFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdG9vbGJhci50b29sdGlwRXh0ZW5zaW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogbWFya3MgdGhlIHBhcmFtZXRlcnMgd2l0aCBhbiBpZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgdWkgXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFdhdGNoYWJsZXNVaUlkKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2F0Y2hhYmxlUGFyYW1ldGVyID0gd2F0Y2hhYmxlUGFyYW1ldGVyc1tpXTtcclxuICAgICAgICAgICAgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkID0gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3B1bGF0ZSB0aGUgd2lkZ2V0IHdpdGggaXRzIHNwZWNpZmljIGRhdGEgY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRXYXRjaGFibGVzVWlJZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYW1wbGVzIHRoZSB3YXRjaGFibGUgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzYW1wbGVXYXRjaGFibGVzKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcik9PntcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB0cmVuZCBidWZmZXJcclxuICAgICAgICAgICAgdGhpcy5hZGRXYXRjaGFibGVUcmVuZFZhbHVlKHdhdGNoYWJsZVBhcmFtZXRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdGhlIHdhdGNoYWJsZXMgdHJlbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoV2F0Y2hhYmxlc1RyZW5kKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgd2F0Y2hhYmxlVHJlbmRFbGVtZW50ID0gdGhpcy5nZXRXYXRjaGFibGVUcmVuZEVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgaWYgKHdhdGNoYWJsZVRyZW5kRWxlbWVudCAmJiBEb21IZWxwZXIuaXNFbGVtZW50SW5WaWV3cG9ydCh3YXRjaGFibGVUcmVuZEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F0Y2hhYmxlVHJlbmRGaWVsZElkID0gXCIjXCIgKyB3YXRjaGFibGVUcmVuZEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kIGZpZWxkXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hXYXRjaGFibGVUcmVuZEZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcix3YXRjaGFibGVUcmVuZEZpZWxkSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbnRlbnQgb2YgdGhlIHdhdGNoYWJsZSB2YWx1ZSBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hXYXRjaGFibGVzVmFsdWVzKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcik9Pnt0aGlzLnJlZnJlc2hXYXRjaGFibGVWYWx1ZUZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcil9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gZWxlbWVudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBwYXJhbWV0ZXIgdG8gYmUgdXNlZCBmb3IgZGlzcGxheWluZyB0aGUgd2F0Y2hhYmxlIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0V2F0Y2hhYmxlVmFsdWVFbGVtZW50KHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBFbGVtZW50IHwgbnVsbCB7XHJcbiAgICAgICAgdmFyIG15U3ViRGl2ID0gdGhpcy5tYWluRGl2LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyB0aGlzLm1haW5EaXZJZCArIFdBVENIQUJMRV9WQUxVRV9JRCArICg8SVVpQmluZGluZz48YW55PndhdGNoYWJsZVBhcmFtZXRlcikudWlJZCk7XHJcbiAgICAgICAgcmV0dXJuIG15U3ViRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBlbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhcmFtZXRlciB0byBiZSB1c2VkIGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGUgdHJlbmQgbGluZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsoSFRNTEVsZW1lbnQgfCBudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0V2F0Y2hhYmxlVHJlbmRFbGVtZW50KHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBFbGVtZW50IHwgbnVsbCB7XHJcbiAgICAgICAgdmFyIG15U3ViRGl2ID0gdGhpcy5tYWluRGl2LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyB0aGlzLm1haW5EaXZJZCArIFdBVENIQUJMRV9UUkVORF9JRCArICg8SVVpQmluZGluZz48YW55PndhdGNoYWJsZVBhcmFtZXRlcikudWlJZCk7XHJcbiAgICAgICAgcmV0dXJuIG15U3ViRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBhIHdhdGNoYWJsZSBmaWVsZCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgY29ycmVzcG9uZGluZyBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hXYXRjaGFibGVWYWx1ZUZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgdWkgZWxlbWVudFxyXG4gICAgICAgIGxldCB3YXRjaGFibGVWYWx1ZUVsZW1lbnQgPSAgdGhpcy5nZXRXYXRjaGFibGVWYWx1ZUVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IG1pblZhbHVlID0gdGhpcy5fd2F0Y2hhYmxlVHJlbmRWYWx1ZXNbd2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWVdLl9taW5WYWx1ZTtcclxuICAgICAgICAvLyBsZXQgbWF4VmFsdWUgPSB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uX21heFZhbHVlO1xyXG5cclxuICAgICAgICAvLyBsZXQgdmFsdWVTdHJpbmc6IHN0cmluZyA9IHdhdGNoYWJsZVBhcmFtZXRlci5kaXNwbGF5VmFsdWUudG9TdHJpbmcoKSArIFwiKFwiICsgbWluVmFsdWUgKyBcIi1cIiArIG1heFZhbHVlICsgXCIpXCI7XHJcbiAgICAgICAgbGV0IHZhbHVlU3RyaW5nOiBzdHJpbmcgPSB3YXRjaGFibGVQYXJhbWV0ZXIuZGlzcGxheVZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHdhdGNoYWJsZVZhbHVlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB3YXRjaGFibGVWYWx1ZUVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWVTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSB2aXNpYmxlIHRyZW5kIGZpbGVkIGNvbnRlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB3YXRjaGFibGVUcmVuZEZpZWxkSWRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2hXYXRjaGFibGVUcmVuZEZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsd2F0Y2hhYmxlVHJlbmRGaWVsZElkOnN0cmluZyApOiBhbnkge1xyXG4gICAgICAgIGxldCB3YXRjaGFibGVUcmVuZERhdGEgPSB0aGlzLmdldFdhdGNoYWJsZVRyZW5kVmFsdWVzKHdhdGNoYWJsZVBhcmFtZXRlcik7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJXYXRjaGFibGVUcmVuZCh3YXRjaGFibGVUcmVuZEZpZWxkSWQsIHdhdGNoYWJsZVRyZW5kRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB0cmVuZCB2YWx1ZXMgZm9yIHRoZSB3YXRjaGFibGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFdhdGNoYWJsZVRyZW5kVmFsdWVzKHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBBcnJheTxhbnk+IHtcclxuICAgICAgICBsZXQgdHJlbmRWYWx1ZXMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxlVHJlbmRWYWx1ZXNbd2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRyZW5kVmFsdWVzID0gdGhpcy5fd2F0Y2hhYmxlVHJlbmRWYWx1ZXNbd2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWVdLnZhbHVlczsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyZW5kVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVuZGVycyBhIHNob3J0IGhpc3Rvcnkgb2YgdHJlbmRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB3YXRjaGFibGVUcmVuZEZpZWxkSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHdhdGNoYWJsZVRyZW5kRGF0YVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyV2F0Y2hhYmxlVHJlbmQod2F0Y2hhYmxlVHJlbmRGaWVsZElkOiBzdHJpbmcsIHdhdGNoYWJsZVRyZW5kRGF0YTogbnVtYmVyW10pIHtcclxuICAgICAgICAvLyBnZXQgdGhlIHRyZW5kIGNlbGxcclxuICAgICAgICBsZXQgJHRyZW5kQ2VsbCA9ICQod2F0Y2hhYmxlVHJlbmRGaWVsZElkKTtcclxuICAgICAgICBsZXQgJHNwYXJrSW5zdGFuY2UgPSAkKHdhdGNoYWJsZVRyZW5kRmllbGRJZCArIFwiX3NwYXJrbGluZV9zdmdcIik7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBzcGFya2xpbmUgaW5zdGFuY2UgaWYgbm90IGFscmVhZHkgZXhpc3RpbmdcclxuICAgICAgICBpZiAoJHNwYXJrSW5zdGFuY2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGwsIHdhdGNoYWJsZVRyZW5kRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB0cmVuZGxpbmUgd2l0aCBuZXcgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdhdGNoYWJsZVRyZW5kVmlldygkdHJlbmRDZWxsLCB3YXRjaGFibGVUcmVuZERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgdGhlIHRyZW5kIHZpZXcgd2l0aCBuZXcgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59ICR0cmVuZENlbGxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHdhdGNoYWJsZVRyZW5kRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVXYXRjaGFibGVUcmVuZFZpZXcoJHRyZW5kQ2VsbDogSlF1ZXJ5PEhUTUxFbGVtZW50Piwgd2F0Y2hhYmxlVHJlbmREYXRhOiBudW1iZXJbXSkge1xyXG4gICAgICAgICR0cmVuZENlbGwuZWpTcGFya2xpbmUoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB3YXRjaGFibGVUcmVuZERhdGEsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogY3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHdhdGNoYWJsZSB0cmVuZCB2aWV3XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSBqcXRyZW5kQ2VsbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gd2F0Y2hhYmxlVHJlbmREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVdhdGNoYWJsZVRyZW5kVmlldygkdHJlbmRDZWxsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB3YXRjaGFibGVUcmVuZERhdGE6IG51bWJlcltdKSB7XHJcbiAgICAgICAgJHRyZW5kQ2VsbC5lalNwYXJrbGluZSh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHdhdGNoYWJsZVRyZW5kRGF0YSxcclxuICAgICAgICAgICAgd2lkdGg6IDIsXHJcbiAgICAgICAgICAgIHN0cm9rZTogXCIjQzRDNEM0XCIsICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFwibGluZVwiLFxyXG4gICAgICAgICAgICBzaXplOiB7IGhlaWdodDogMjgsIHdpZHRoOiAkdHJlbmRDZWxsLndpZHRoKCkgfSxcclxuICAgICAgICAgICAgaXNSZXNwb25zaXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgcGFkZGluZzogMixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIHRoZSB3YXRjaGFibGVzIGZvciBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBvYnNlcnZlV2F0Y2hhYmxlcyh3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgLy8gaW52b2tlIG9ic2VydmluZyB0aGUgd2F0Y2hhYmxlc1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLm9ic2VydmVQYXJhbWV0ZXJWYWx1ZUNoYW5nZXModGhpcyx3YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAvLyBvYnNlcnZlIHdhdGNoYWJsZXMgaW5zaWRlIGVhY2ggd2F0Y2hhYmxlIHN0YXRlIGV4cHJlc3Npb25cclxuICAgICAgICB0aGlzLm9ic2VydmVXYXRjaGFibGVzSW5TdGF0ZUV4cHJlc3Npb24od2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgYWZ0ZXIgY2hhbmdlcyBvZiBvYnNlcnZhYmxlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JzZXJ2YWJsZVtdfSBjaGFuZ2VkT2JzZXJ2YWJsZXNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25PYnNlcnZhYmxlc0NoYW5nZWQ6ICVvICVvXCIsdGhpcyxjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgICAgIGNoYW5nZWRPYnNlcnZhYmxlcy5mb3JFYWNoKChvYnNlcnZhYmxlKT0+e1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YWJsZS5wcm9wZXJ0eSA9PT0gXCJWYWx1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F0Y2hhYmxlUGFyYW1ldGVyOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyID0gb2JzZXJ2YWJsZS5vYmplY3QgYXMgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uV2F0Y2hhYmxlVmFsdWVDaGFuZ2VkKHdhdGNoYWJsZVBhcmFtZXRlcik7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIHdhdGNoYWJsZXMgdG8gc3RhdGUgZXhwcmVzc2lvbiB0byBiZSBvYnNlcnZlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZVdhdGNoYWJsZXNJblN0YXRlRXhwcmVzc2lvbih3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzLmZvckVhY2goKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlZFdhdGNoYWJsZXMgPSB3YXRjaGFibGVQYXJhbWV0ZXJzLmZpbHRlcigod2F0Y2hhYmxlKSA9PiBzdGF0ZS5zdGF0ZUV4cHJlc3Npb24ud2F0Y2hhYmxlTWFwcGluZy5oYXMod2F0Y2hhYmxlLmJyb3dzZU5hbWUpKTtcclxuICAgICAgICAgICAgc3RhdGUuc3RhdGVFeHByZXNzaW9uLm9ic2VydmVXYXRjaGFibGVzKG9ic2VydmVkV2F0Y2hhYmxlcyk7XHJcbiAgICAgICAgICAgIC8vYXR0YWNoIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRXhwcmVzc2lvbi5ldmVudEljb25VcGRhdGVkLmF0dGFjaCh0aGlzLl93YXRjaGFibGVJY29uVXBkYXRlSGFuZGxlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSB2YWx1ZSBjaGFuZ2Ugb2YgYSB3YXRjaGFibGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbldhdGNoYWJsZVZhbHVlQ2hhbmdlZCh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgdmFsdWUgZmllbGQuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlVmFsdWVGaWVsZCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gd2F0Y2hhYmxlIGljb24gaXMgdXBkYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHt7bmFtZTogc3RyaW5nLCB3YXRjaGFibGVJY29uOiBXYXRjaGFibGVJY29ufX0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbldhdGNoYWJsZUljb25VcGRhdGVkKHNlbmRlciwgYXJnczoge25hbWU6IHN0cmluZywgd2F0Y2hhYmxlSWNvbjogV2F0Y2hhYmxlSWNvbn0pIHtcclxuICAgICAgICAodGhpcy5fdG9vbGJhciBhcyBXYXRjaGFibGVzR3JpZFRvb2xiYXIpLnVwZGF0ZUljb24oYXJncy5uYW1lLCBhcmdzLndhdGNoYWJsZUljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyB2YWx1ZSB0byB0aGUgcGFyYW1ldGVycyB0cmVuZCBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFdhdGNoYWJsZVRyZW5kVmFsdWUod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vIGZpbHRlciBudW1iZXJzIGFuZCBib29sZWFuIHZhbHVlcyB0byBiZSByZWNvcmRlZFxyXG4gICAgICAgIGlmICh0eXBlb2Ygd2F0Y2hhYmxlUGFyYW1ldGVyLnZhbHVlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiB3YXRjaGFibGVQYXJhbWV0ZXIudmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICAgICg8V2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlcj50aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0pLnB1c2goPG51bWJlcj53YXRjaGFibGVQYXJhbWV0ZXIudmFsdWUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFjdGl2YXRlcyBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXRjaGFibGVzV2lkZ2V0IGFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5hY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlYWN0aXZhdGVzIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2F0Y2hhYmxlc1dpZGdldCBkZWFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5kZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzcG9zZXMgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5zdG9wU2FtcGxpbmdUaW1lcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcFRyZW5kVGltZXIoKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgLy8gZGV0YWNoIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5mb3JFYWNoKChzdGF0ZSkgPT4geyBcclxuICAgICAgICAgICAgc3RhdGUuc3RhdGVFeHByZXNzaW9uLmV2ZW50SWNvblVwZGF0ZWQuZGV0YWNoKHRoaXMuX3dhdGNoYWJsZUljb25VcGRhdGVIYW5kbGVyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgV2F0Y2hhYmxlc1dpZGdldCB9OyJdfQ==
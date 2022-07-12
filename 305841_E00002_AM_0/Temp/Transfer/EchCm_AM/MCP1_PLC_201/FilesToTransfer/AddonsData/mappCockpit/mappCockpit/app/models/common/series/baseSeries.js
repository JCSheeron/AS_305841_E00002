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
define(["require", "exports", "../../../framework/events", "../signal/eventSignalDataChangedArgs", "../calculatorProvider/calculationDataPoints", "../../../common/dateTimeHelper", "../../../common/seriesHelper", "../point", "../calculatorProvider/calculationDataInfo", "./seriesType", "../../../common/persistence/settings", "../signal/signal", "./settingIds", "./eventSerieDataChangedArgs", "../../signalManagerDataModel/signalCategory"], function (require, exports, events_1, eventSignalDataChangedArgs_1, calculationDataPoints_1, dateTimeHelper_1, seriesHelper_1, point_1, calculationDataInfo_1, seriesType_1, settings_1, signal_1, settingIds_1, eventSerieDataChangedArgs_1, signalCategory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSeriesDataChanged = /** @class */ (function (_super) {
        __extends(EventSeriesDataChanged, _super);
        function EventSeriesDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSeriesDataChanged;
    }(events_1.TypedEvent));
    ;
    var BaseSeries = /** @class */ (function () {
        /**
         * Creates an instance of BaseSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {CursorType} cursorType
         * @param {ISeriesProvider} serieProvider
         * @param {string} [uniqueId=""]
         * @memberof BaseSeries
         */
        function BaseSeries(signal, name, color, serieProvider, uniqueId) {
            var _this = this;
            this.type = seriesType_1.SeriesType.timeSeries;
            this.eventDataChanged = new EventSeriesDataChanged();
            this._onSignalDataChanged = function (sender, eventArgs) { _this.onSignalDataChanged(sender, eventArgs); };
            this._rawPoints = [];
            this._isCalculated = false;
            this._startTriggerTime = 0;
            this.calculationDataInfo = undefined;
            this.isAutoUpdated = false;
            this._data = [];
            // holds the timestamps
            this._timestamps = [];
            this._errorInfo = new Array();
            this._seriesProvider = serieProvider;
            this._name = name;
            this._color = color;
            this.signal = signal;
            this.signal.eventDataChanged.attach(this._onSignalDataChanged);
            this._description = "";
            // Set given unique id
            this._id = uniqueId;
            this.persistID = serieProvider.getSeriesPersistingId(this._id);
        }
        Object.defineProperty(BaseSeries.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "errorInfo", {
            get: function () {
                return this._errorInfo;
            },
            set: function (value) {
                this._errorInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "originalName", {
            get: function () {
                return this.signal.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "description", {
            get: function () {
                return this._description;
            },
            set: function (value) {
                this._description = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Create a signal with the given persisted signalData
         *
         * @protected
         * @param {*} signalData
         * @returns {ISignal}
         * @memberof BaseSeries
         */
        BaseSeries.createSignal = function (signalData) {
            var signal = new signal_1.Signal("", new Array());
            if (signalData != undefined) {
                signal.setSettings(signalData);
            }
            return signal;
        };
        /**
         * Returns the icon representation of this series (serie type, auto upload, series color, ... is included)
         *
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getIcon = function () {
            return this._seriesProvider.getIcon(this);
        };
        /**
         * Returns a specific icon for this series (e.g. only a single overlay)
         *
         * @param {string} svgName (e.g. "autoUpdatedOverlay" or "exclamationOverlay")
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getSpecificIcon = function (svgName) {
            return this._seriesProvider.getSpecificIcon(svgName);
        };
        /**
         * Retruns an error text for this series if some error infos are available
         *
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getErrorText = function () {
            var formatedText = "";
            if (this.errorInfo != undefined) {
                if (this.errorInfo.length > 0) {
                    formatedText = "";
                    this.errorInfo.forEach(function (error) {
                        formatedText += error + "\r\n";
                    });
                }
            }
            return formatedText;
        };
        /**
         * Returns the persisting data of the BaseSeries
         *
         * @returns {ISettings}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getSettings = function () {
            var settings = new settings_1.Settings("BaseSeries");
            var calculationDataInfoSettings = undefined;
            var signalDataSettings = undefined;
            var transferables;
            if (this.calculationDataInfo == undefined) {
                signalDataSettings = this.signal.getSettings();
                transferables = [signalDataSettings.data.rawPointsX.buffer, signalDataSettings.data.rawPointsY.buffer];
            }
            else {
                calculationDataInfoSettings = this.calculationDataInfo.getSettings();
            }
            settings.setValue(settingIds_1.SettingIds.SeriesId, this.id);
            settings.setValue(settingIds_1.SettingIds.SeriesName, this.name);
            settings.setValue(settingIds_1.SettingIds.SeriesColor, this.color);
            settings.setValue(settingIds_1.SettingIds.SeriesSignalData, signalDataSettings);
            settings.setValue(settingIds_1.SettingIds.SeriesCalculationData, calculationDataInfoSettings);
            settings.setValue("transferables", transferables);
            return settings;
        };
        /**
         * Disposes the BaseSeries
         *
         * @memberof BaseSeries
         */
        BaseSeries.prototype.dispose = function () {
            this.signal.eventDataChanged.detach(this._onSignalDataChanged);
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateTimestamps = function () {
        };
        Object.defineProperty(BaseSeries.prototype, "iconDefinition", {
            /**
             * Get serie icon definition
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                var iconDefinition = "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:6px;margin-top:2px'>";
                // add series icon (with overlays)
                iconDefinition += this.getIcon();
                iconDefinition += "</div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the data of an existing serie
         *
         * @param {Array<IPoint>} rawPoints
         * @memberof baseSeries
         */
        BaseSeries.prototype.updatePoints = function (rawPoints) {
            this.rawPoints = rawPoints;
            this.getRange();
            this.simplifySignal(rawPoints);
            this.signal.rawPoints = rawPoints;
        };
        BaseSeries.prototype.simplifySignal = function (rawPoints) { };
        ;
        /**
         * Updates input data (DataPoints list) for calculated series
         *
         * @param {Array<CalculationDataPoints>} inputData
         * @memberof baseSeries
         */
        BaseSeries.prototype.updateInputData = function (inputData) {
            if (this.calculationDataInfo != undefined) {
                for (var i = 0; i < inputData.length; i++) {
                    if (inputData[i] instanceof calculationDataPoints_1.CalculationDataPoints) {
                        this.calculationDataInfo.inputData[i] = inputData[i];
                    }
                }
            }
        };
        /**
         * Updates input data values (input string; e.g. signalname, 5, ...) for calculated series
         *
         * @private
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateInputDataValues = function (inputChilds) {
            if (this.calculationDataInfo != undefined) {
                var values = new Array();
                var inputDataIds = new Array();
                for (var i = 0; i < inputChilds.length; i++) {
                    values.push(inputChilds[i].getRawValue());
                    inputDataIds.push(inputChilds[i].calculationData.id);
                }
                this.calculationDataInfo.inputDataIds = inputDataIds;
                this.calculationDataInfo.inputDataValues = values;
            }
        };
        /**
         * Updates the input series for calculated series
         *
         * @private
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateInputSeriesIds = function (inputChilds) {
            if (this.calculationDataInfo != undefined) {
                this.calculationDataInfo.inputSeriesIds = [];
                for (var i = 0; i < inputChilds.length; i++) {
                    var serie = inputChilds[i].serie;
                    if (serie != undefined) {
                        this.calculationDataInfo.inputSeriesIds.push(serie.id);
                    }
                }
            }
        };
        /**
         * Updates the calculation informations for this series
         *
         * @param {Array<TCalculationData>} inputData
         * @param {string} type
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateCalculationDataInfo = function (inputData, type, inputChilds, seriesProvider) {
            if (this.calculationDataInfo == undefined) {
                this.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo(seriesProvider.getUniqueCalculationId());
            }
            this.calculationDataInfo.type = type;
            this.updateInputData(inputData);
            this.updateInputDataValues(inputChilds);
            this.updateInputSeriesIds(inputChilds);
        };
        /**
         * Gets the range limits from a serie
         *
         * @protected
         * @memberof baseSeries
         */
        BaseSeries.prototype.getRange = function () {
            this.maxX = this.getMaxX();
            this.minX = this.getMinX();
            this.maxY = this.getMaxY();
            this.minY = this.getMinY();
        };
        /**
         *
         *
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMaxX = function () {
            return 0;
        };
        /**
         *
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMinX = function () {
            return 0;
        };
        /**
         * Get max Y value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMaxY = function () {
            var maxY;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (maxY == undefined || this.rawPoints[i].y > maxY) {
                        maxY = this.rawPoints[i].y;
                    }
                }
            }
            return maxY;
        };
        /**
         * Get min Y value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMinY = function () {
            var minY;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (minY == undefined || this.rawPoints[i].y < minY) {
                        minY = this.rawPoints[i].y;
                    }
                }
            }
            return minY;
        };
        Object.defineProperty(BaseSeries.prototype, "rawPoints", {
            /**
             * Get rawPoints
             *
             * @type {Array<IPoint>}
             * @memberof baseSeries
             */
            get: function () {
                return this._rawPoints;
            },
            /**
             * Set rawPoints
             *
             * @memberof baseSeries
             */
            set: function (points) {
                this._rawPoints = points;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "timestamps", {
            /**
             * gets the timestamps available in the series
             *
             * @readonly
             * @type {Array<number>}
             * @memberof baseSeries
             */
            get: function () {
                return this._timestamps;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * determines the index of the timestamp within the available timestamps
         *
         * @param {number} timestamp
         * @param {number[]} timestamps
         * @param {BinSearchMode} LOWER
         * @returns
         * @memberof baseSeries
         */
        BaseSeries.prototype.getTimestampIndex = function (timestamp, binSearchMode) {
            if (binSearchMode === void 0) { binSearchMode = seriesHelper_1.BinSearchMode.NEAREST; }
            // get the available timestamps
            var timestamps = this.timestamps;
            // get the index of the timestamp 
            var timestampIndex = seriesHelper_1.SeriesHelper.indexOfNearest(timestamp, timestamps, binSearchMode);
            return timestampIndex >= 0 && timestampIndex < timestamps.length ? timestampIndex : -1;
        };
        /**
         * Gets the series point nearest to the timestamp
         *
         * @returns {IPoint}
         * @memberof baseSeries
         */
        BaseSeries.prototype.pointFromTimestamp = function (timestamp) {
            var nearestTimestampIndex = this.getTimestampIndex(timestamp);
            return nearestTimestampIndex >= 0 ? this.rawPoints[nearestTimestampIndex] : new point_1.Point(0, 0);
        };
        /**
         * Gets the series point previous to the timestamp
         *
         * @returns {IPoint}
         * @memberof baseSeries
         */
        BaseSeries.prototype.previousPointFromTimestamp = function (timestamp) {
            // get the lowerbound timestamp index ( if the timestamp is not matching exactly)
            var nearestTimestampIndex = this.getTimestampIndex(timestamp, seriesHelper_1.BinSearchMode.LOWERBOUND);
            return nearestTimestampIndex >= 0 ? this.rawPoints[nearestTimestampIndex] : new point_1.Point(0, 0);
        };
        /**
         * Checks if the timestamp is within the available range
         *
         * @param {number} timestamp
         * @returns {boolean}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.timestampIsInRange = function (timestamp) {
            return seriesHelper_1.SeriesHelper.isInRange(timestamp, this.timestamps);
        };
        Object.defineProperty(BaseSeries.prototype, "isCalculated", {
            /**
             * Get if serie is calculated
             *
             * @type {boolean}
             * @memberof baseSeries
             */
            get: function () {
                return this._isCalculated;
            },
            /**
             * Set if serie is calculated
             *
             * @memberof baseSeries
             */
            set: function (value) {
                this._isCalculated = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "name", {
            /**
             * Get serie name
             *
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._name;
            },
            /**
             * Set serie name
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldName = this._name;
                this._name = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.rename, this._name, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "id", {
            /**
             * Get unique serie id
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "color", {
            /**
             * Get serie color
             *
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._color;
            },
            /**
             * Set serie color
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldColor = this._color;
                this._color = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.colorChanged, this._color, oldColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "rawPointsValid", {
            /**
             * Get if rawPoints are valid
             *
             * @readonly
             * @type {boolean}
             * @memberof baseSeries
             */
            get: function () {
                return this.signal.rawPointsValid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "startTriggerTime", {
            /**
             * Get startTriggerTime
             *
             * @type {number}
             * @memberof baseSeries
             */
            get: function () {
                return this._startTriggerTime;
            },
            /**
             * Set startTriggerTime
             *
             * @memberof baseSeries
             */
            set: function (value) {
                if (value != this._startTriggerTime) {
                    var oldStartTriggerTime = this._startTriggerTime;
                    this._startTriggerTime = value;
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged, oldStartTriggerTime);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "additionalInfo", {
            /**
             * Get start trigger formated time (shown next to serie name)
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                if (this._startTriggerTime != 0) {
                    return dateTimeHelper_1.DateTimeHelper.getDateTime(this._startTriggerTime);
                }
                return ""; // No start trigger info available
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "parent", {
            /**
             * Get parent of serie
             *
             * @type {(ISerieGroup | undefined)}
             * @memberof baseSeries
             */
            get: function () {
                return this._parent;
            },
            /**
             * Set parent of serie
             *
             * @memberof baseSeries
             */
            set: function (value) {
                this._parent = value;
                if (this._parent != undefined) {
                    if (this._parent.parent instanceof signalCategory_1.SignalCategory) {
                        if (this._parent.parent.id == signalCategory_1.SignalCategory.CategoryIdRecent) {
                            // Set serie to autoUpdated if in recent category
                            this.isAutoUpdated = true;
                        }
                    }
                    this.startTriggerTime = this._parent.startTriggerTime;
                }
                else {
                    this.startTriggerTime = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Resets the name to the original name from the signal
         *
         * @memberof baseSeries
         */
        BaseSeries.prototype.resetName = function () {
            this.name = this.originalName;
        };
        /**
         * Clones this serie
         *
         * @returns
         * @memberof baseSeries
         */
        BaseSeries.prototype.clone = function () {
            var settings = this.getSettings();
            settings.setValue(settingIds_1.SettingIds.SeriesId, this._seriesProvider.getUniqueId());
            return this._seriesProvider.createSerie(settings);
        };
        /**
         * Handles the serie data changed event (e.g. serie color, serie datapoints, rename changed)
         *
         * @private
         * @param {*} sender
         * @param {*} eventArgs
         * @memberof baseSeries
         */
        BaseSeries.prototype.onSignalDataChanged = function (sender, eventArgs) {
            switch (eventArgs.action) {
                case eventSignalDataChangedArgs_1.SignalAction.dataPointsChanged: {
                    this.updateTimestamps();
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged, eventArgs.data);
                    break;
                }
                case eventSignalDataChangedArgs_1.SignalAction.startTriggerTimeChanged: {
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged, eventArgs.data);
                    break;
                }
            }
        };
        BaseSeries.prototype.onDataChanged = function (action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            var eventArgs = new eventSerieDataChangedArgs_1.EventSerieDataChangedArgs(action, data, oldData);
            this.eventDataChanged.raise(this, eventArgs);
            if (action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                this.onSerieDataChanged(data);
            }
        };
        /**
         * Called whenever the seris data has changed
         *
         * @private
         * @param {IPoint[]} data
         * @memberof BaseSeries
         */
        BaseSeries.prototype.onSerieDataChanged = function (data) {
            //TODO: eventually call simplification ????
        };
        return BaseSeries;
    }());
    exports.BaseSeries = BaseSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVNlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBd0JBO1FBQXFDLDBDQUFrRDtRQUF2Rjs7UUFBeUYsQ0FBQztRQUFELDZCQUFDO0lBQUQsQ0FBQyxBQUExRixDQUFxQyxtQkFBVSxHQUEyQztJQUFBLENBQUM7SUFFM0Y7UUE2REk7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQXNCLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLGFBQThCLEVBQUUsUUFBZ0I7WUFBcEgsaUJBV0M7WUFoRkQsU0FBSSxHQUFHLHVCQUFVLENBQUMsVUFBVSxDQUFDO1lBQzdCLHFCQUFnQixHQUEyQixJQUFJLHNCQUFzQixFQUFFLENBQUM7WUFJaEUseUJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUE7WUFHMUYsZUFBVSxHQUFrQixFQUFFLENBQUM7WUFNakMsa0JBQWEsR0FBWSxLQUFLLENBQUM7WUFFL0Isc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1lBRXRDLHdCQUFtQixHQUFrQyxTQUFTLENBQUM7WUFFL0Qsa0JBQWEsR0FBWSxLQUFLLENBQUM7WUFDckIsVUFBSyxHQUFrQixFQUFFLENBQUM7WUFjaEMsdUJBQXVCO1lBQ2IsZ0JBQVcsR0FBWSxFQUFFLENBQUM7WUFFaEMsZUFBVSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFnQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FB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LElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM3QyxJQUFHLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLGlCQUFpQixFQUFDO2dCQUN2QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakM7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08sdUNBQWtCLEdBQTVCLFVBQThCLElBQWM7WUFDeEMsMkNBQTJDO1FBQy9DLENBQUM7UUFDTCxpQkFBQztJQUFELENBQUMsQUFycEJELElBcXBCQztJQXJwQlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVHcm91cEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuXHJcbmltcG9ydCB7IFNpZ25hbEFjdGlvbiwgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vc2lnbmFsL2V2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kYXRlVGltZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIsIEJpblNlYXJjaE1vZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuXHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuLi8uLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuLi8uLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZXNEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQgPEJhc2VTZXJpZXMsIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VTZXJpZXN7XHJcblxyXG4gICAgdHlwZSA9IFNlcmllc1R5cGUudGltZVNlcmllcztcclxuICAgIGV2ZW50RGF0YUNoYW5nZWQ6IEV2ZW50U2VyaWVzRGF0YUNoYW5nZWQgPSBuZXcgRXZlbnRTZXJpZXNEYXRhQ2hhbmdlZCgpO1xyXG4gICAgcGVyc2lzdElEOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX29uU2lnbmFsRGF0YUNoYW5nZWQgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5vblNpZ25hbERhdGFDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKX1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHNpZ25hbDogSVNpZ25hbDtcclxuICAgIHByb3RlY3RlZCBfcmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfY29sb3I6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9pc0NhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3BhcmVudDogSVNlcmllR3JvdXAgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zdGFydFRyaWdnZXJUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBjYWxjdWxhdGlvbkRhdGFJbmZvOiBDYWxjdWxhdGlvbkRhdGFJbmZvfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDsgXHJcbiAgICBcclxuICAgIGlzQXV0b1VwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBfZGF0YTogQXJyYXk8SVBvaW50PiA9IFtdO1xyXG4gICAgbWF4WCA6IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICBtaW5YIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIG1heFkgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgbWluWSA6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOkFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgICAgICAvLyBob2xkcyB0aGUgdGltZXN0YW1wc1xyXG4gICAgICAgIHByb3RlY3RlZCBfdGltZXN0YW1wczpudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX2Vycm9ySW5mbyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICBwdWJsaWMgZ2V0IGVycm9ySW5mbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3JJbmZvO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBlcnJvckluZm8odmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9lcnJvckluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG9yaWdpbmFsTmFtZSgpOnN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmFsLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZGVzY3JpcHRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9zZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCYXNlU2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge0lTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JUeXBlfSBjdXJzb3JUeXBlXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZXNQcm92aWRlcn0gc2VyaWVQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bmlxdWVJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBzZXJpZVByb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gc2VyaWVQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuc2lnbmFsID0gc2lnbmFsO1xyXG4gICAgICAgIHRoaXMuc2lnbmFsLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX29uU2lnbmFsRGF0YUNoYW5nZWQpO1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gXCJcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgZ2l2ZW4gdW5pcXVlIGlkXHJcbiAgICAgICAgdGhpcy5faWQgPSB1bmlxdWVJZDsgIFxyXG4gICAgICAgIHRoaXMucGVyc2lzdElEID0gc2VyaWVQcm92aWRlci5nZXRTZXJpZXNQZXJzaXN0aW5nSWQodGhpcy5faWQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBzaWduYWwgd2l0aCB0aGUgZ2l2ZW4gcGVyc2lzdGVkIHNpZ25hbERhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHtJU2lnbmFsfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBjcmVhdGVTaWduYWwoc2lnbmFsRGF0YTogYW55KTogSVNpZ25hbHtcclxuICAgICAgICBsZXQgc2lnbmFsOiBJU2lnbmFsID0gbmV3IFNpZ25hbChcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpKTtcclxuICAgICAgICBpZihzaWduYWxEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNpZ25hbC5zZXRTZXR0aW5ncyhzaWduYWxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpZ25hbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gcmVwcmVzZW50YXRpb24gb2YgdGhpcyBzZXJpZXMgKHNlcmllIHR5cGUsIGF1dG8gdXBsb2FkLCBzZXJpZXMgY29sb3IsIC4uLiBpcyBpbmNsdWRlZClcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0SWNvbigpOiBzdHJpbmd7XHJcbiAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0SWNvbih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBzcGVjaWZpYyBpY29uIGZvciB0aGlzIHNlcmllcyAoZS5nLiBvbmx5IGEgc2luZ2xlIG92ZXJsYXkpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN2Z05hbWUgKGUuZy4gXCJhdXRvVXBkYXRlZE92ZXJsYXlcIiBvciBcImV4Y2xhbWF0aW9uT3ZlcmxheVwiKVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldFNwZWNpZmljSWNvbihzdmdOYW1lOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldFNwZWNpZmljSWNvbihzdmdOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJ1bnMgYW4gZXJyb3IgdGV4dCBmb3IgdGhpcyBzZXJpZXMgaWYgc29tZSBlcnJvciBpbmZvcyBhcmUgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldEVycm9yVGV4dCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGZvcm1hdGVkVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgaWYodGhpcy5lcnJvckluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lcnJvckluZm8ubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRlZFRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckluZm8uZm9yRWFjaChlcnJvciA9PntcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRlZFRleHQgKz0gZXJyb3IgKyBcIlxcclxcblwiO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JtYXRlZFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwZXJzaXN0aW5nIGRhdGEgb2YgdGhlIEJhc2VTZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0U2V0dGluZ3MoKTogSVNldHRpbmdze1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhcIkJhc2VTZXJpZXNcIik7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm9TZXR0aW5nczogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YVNldHRpbmdzOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCB0cmFuc2ZlcmFibGVzO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgc2lnbmFsRGF0YVNldHRpbmdzID0gdGhpcy5zaWduYWwuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgdHJhbnNmZXJhYmxlcyA9IFtzaWduYWxEYXRhU2V0dGluZ3MuZGF0YS5yYXdQb2ludHNYLmJ1ZmZlciwgc2lnbmFsRGF0YVNldHRpbmdzLmRhdGEucmF3UG9pbnRzWS5idWZmZXJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGFJbmZvU2V0dGluZ3MgPSB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZCwgdGhpcy5pZCk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNOYW1lLCB0aGlzLm5hbWUpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ29sb3IsIHRoaXMuY29sb3IpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzU2lnbmFsRGF0YSwgc2lnbmFsRGF0YVNldHRpbmdzKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NhbGN1bGF0aW9uRGF0YSwgY2FsY3VsYXRpb25EYXRhSW5mb1NldHRpbmdzKTtcclxuXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoXCJ0cmFuc2ZlcmFibGVzXCIsIHRyYW5zZmVyYWJsZXMpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBCYXNlU2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuc2lnbmFsLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX29uU2lnbmFsRGF0YUNoYW5nZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdGltZXN0YW1wcyBiYXNlb24gdGhlIGF2YWlsYWJsZSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRpbWVzdGFtcHMoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc2VyaWUgaWNvbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IGA8ZGl2IGNsYXNzPSdlLWRvYycgc3R5bGU9J3Bvc2l0aW9uOiByZWxhdGl2ZTtoZWlnaHQ6MTZweDt3aWR0aDozMHB4O21hcmdpbjphdXRvO2Zsb2F0OmxlZnQ7bWFyZ2luLWxlZnQ6NnB4O21hcmdpbi10b3A6MnB4Jz5gO1xyXG4gICAgICAgIC8vIGFkZCBzZXJpZXMgaWNvbiAod2l0aCBvdmVybGF5cylcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLmdldEljb24oKTtcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZGF0YSBvZiBhbiBleGlzdGluZyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gcmF3UG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlUG9pbnRzKHJhd1BvaW50czogQXJyYXk8SVBvaW50Pil7XHJcbiAgICAgICAgdGhpcy5yYXdQb2ludHMgPSByYXdQb2ludHM7XHJcbiAgICAgICAgdGhpcy5nZXRSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2ltcGxpZnlTaWduYWwocmF3UG9pbnRzKTtcclxuICAgICAgICB0aGlzLnNpZ25hbC5yYXdQb2ludHMgPSByYXdQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNpbXBsaWZ5U2lnbmFsKHJhd1BvaW50czogQXJyYXk8SVBvaW50Pil7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgaW5wdXQgZGF0YSAoRGF0YVBvaW50cyBsaXN0KSBmb3IgY2FsY3VsYXRlZCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59IGlucHV0RGF0YVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbnB1dERhdGEoaW5wdXREYXRhOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPil7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXREYXRhW2ldIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhW2ldID0gaW5wdXREYXRhW2ldIGFzIENhbGN1bGF0aW9uRGF0YVBvaW50cztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgaW5wdXQgZGF0YSB2YWx1ZXMgKGlucHV0IHN0cmluZzsgZS5nLiBzaWduYWxuYW1lLCA1LCAuLi4pIGZvciBjYWxjdWxhdGVkIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT59IGlucHV0Q2hpbGRzXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0RGF0YVZhbHVlcyhpbnB1dENoaWxkczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPil7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXREYXRhSWRzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0Q2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGlucHV0Q2hpbGRzW2ldLmdldFJhd1ZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goaW5wdXRDaGlsZHNbaV0uY2FsY3VsYXRpb25EYXRhLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhSWRzID0gaW5wdXREYXRhSWRzO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhVmFsdWVzID0gdmFsdWVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGlucHV0IHNlcmllcyBmb3IgY2FsY3VsYXRlZCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBpbnB1dENoaWxkc1xyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbnB1dFNlcmllc0lkcyhpbnB1dENoaWxkczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPil7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dFNlcmllc0lkcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q2hpbGRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWUgPSBpbnB1dENoaWxkc1tpXS5zZXJpZTtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzSWRzLnB1c2goc2VyaWUuaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY2FsY3VsYXRpb24gaW5mb3JtYXRpb25zIGZvciB0aGlzIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8VENhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn0gaW5wdXRDaGlsZHNcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVDYWxjdWxhdGlvbkRhdGFJbmZvIChpbnB1dERhdGE6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+LCB0eXBlOiBzdHJpbmcsIGlucHV0Q2hpbGRzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+LCBzZXJpZXNQcm92aWRlciA6IElTZXJpZXNQcm92aWRlcikge1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhSW5mbyhzZXJpZXNQcm92aWRlci5nZXRVbmlxdWVDYWxjdWxhdGlvbklkKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8udHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dERhdGEoaW5wdXREYXRhKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0RGF0YVZhbHVlcyhpbnB1dENoaWxkcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFNlcmllc0lkcyhpbnB1dENoaWxkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSByYW5nZSBsaW1pdHMgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFJhbmdlKCl7XHJcbiAgICAgICAgdGhpcy5tYXhYID0gdGhpcy5nZXRNYXhYKCk7XHJcbiAgICAgICAgdGhpcy5taW5YID0gdGhpcy5nZXRNaW5YKCk7XHJcbiAgICAgICAgdGhpcy5tYXhZID0gdGhpcy5nZXRNYXhZKCk7XHJcbiAgICAgICAgdGhpcy5taW5ZID0gdGhpcy5nZXRNaW5ZKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhYKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1pblgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCBZIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhZKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WTtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yYXdQb2ludHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobWF4WSA9PSB1bmRlZmluZWQgfHwgdGhpcy5yYXdQb2ludHNbaV0ueSA+IG1heFkgKXtcclxuICAgICAgICAgICAgICAgICAgICBtYXhZID0gdGhpcy5yYXdQb2ludHNbaV0ueVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBZIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5ZKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWluWTtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yYXdQb2ludHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobWluWSA9PSB1bmRlZmluZWQgfHwgdGhpcy5yYXdQb2ludHNbaV0ueSA8IG1pblkgKXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5ZID0gdGhpcy5yYXdQb2ludHNbaV0ueVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtaW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHJhd1BvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcmF3UG9pbnRzKHBvaW50czogQXJyYXk8SVBvaW50Pil7XHJcbiAgICAgICAgdGhpcy5fcmF3UG9pbnRzID0gcG9pbnRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldCByYXdQb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmF3UG9pbnRzKCk6ICBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYXdQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHRpbWVzdGFtcHMgYXZhaWxhYmxlIGluIHRoZSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0aW1lc3RhbXBzKCkgOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZXN0YW1wcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRldGVybWluZXMgdGhlIGluZGV4IG9mIHRoZSB0aW1lc3RhbXAgd2l0aGluIHRoZSBhdmFpbGFibGUgdGltZXN0YW1wc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHRpbWVzdGFtcHNcclxuICAgICAqIEBwYXJhbSB7QmluU2VhcmNoTW9kZX0gTE9XRVJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRUaW1lc3RhbXBJbmRleCh0aW1lc3RhbXA6IG51bWJlcixiaW5TZWFyY2hNb2RlOkJpblNlYXJjaE1vZGUgPSBCaW5TZWFyY2hNb2RlLk5FQVJFU1QpIHtcclxuICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgYXZhaWxhYmxlIHRpbWVzdGFtcHNcclxuICAgICAgICBsZXQgdGltZXN0YW1wcyA9IHRoaXMudGltZXN0YW1wcztcclxuICAgICAgICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSB0aW1lc3RhbXAgXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcEluZGV4ID0gU2VyaWVzSGVscGVyLmluZGV4T2ZOZWFyZXN0KHRpbWVzdGFtcCx0aW1lc3RhbXBzLGJpblNlYXJjaE1vZGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gIHRpbWVzdGFtcEluZGV4ID49IDAgJiYgdGltZXN0YW1wSW5kZXggPCB0aW1lc3RhbXBzLmxlbmd0aCA/IHRpbWVzdGFtcEluZGV4IDogLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzZXJpZXMgcG9pbnQgbmVhcmVzdCB0byB0aGUgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lQb2ludH1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb2ludEZyb21UaW1lc3RhbXAodGltZXN0YW1wOm51bWJlcikgOiBJUG9pbnR7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXBJbmRleCA9IHRoaXMuZ2V0VGltZXN0YW1wSW5kZXgodGltZXN0YW1wKTtcclxuICAgICAgICByZXR1cm4gIG5lYXJlc3RUaW1lc3RhbXBJbmRleCA+PSAwID8gIHRoaXMucmF3UG9pbnRzW25lYXJlc3RUaW1lc3RhbXBJbmRleF0gOiBuZXcgUG9pbnQoMCwwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzZXJpZXMgcG9pbnQgcHJldmlvdXMgdG8gdGhlIHRpbWVzdGFtcFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJUG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJldmlvdXNQb2ludEZyb21UaW1lc3RhbXAodGltZXN0YW1wOiBudW1iZXIpOiBJUG9pbnQge1xyXG4gICAgICAgIC8vIGdldCB0aGUgbG93ZXJib3VuZCB0aW1lc3RhbXAgaW5kZXggKCBpZiB0aGUgdGltZXN0YW1wIGlzIG5vdCBtYXRjaGluZyBleGFjdGx5KVxyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wSW5kZXggPSB0aGlzLmdldFRpbWVzdGFtcEluZGV4KHRpbWVzdGFtcCxCaW5TZWFyY2hNb2RlLkxPV0VSQk9VTkQpO1xyXG4gICAgICAgIHJldHVybiBuZWFyZXN0VGltZXN0YW1wSW5kZXggPj0gMCA/IHRoaXMucmF3UG9pbnRzW25lYXJlc3RUaW1lc3RhbXBJbmRleF0gOiBuZXcgUG9pbnQoMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIHRpbWVzdGFtcCBpcyB3aXRoaW4gdGhlIGF2YWlsYWJsZSByYW5nZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRpbWVzdGFtcElzSW5SYW5nZSh0aW1lc3RhbXA6bnVtYmVyKSA6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuICBTZXJpZXNIZWxwZXIuaXNJblJhbmdlKHRpbWVzdGFtcCx0aGlzLnRpbWVzdGFtcHMpO1xyXG4gICAgfVxyXG4gICAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0IGlmIHNlcmllIGlzIGNhbGN1bGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGlzQ2FsY3VsYXRlZCh2YWx1ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5faXNDYWxjdWxhdGVkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaWYgc2VyaWUgaXMgY2FsY3VsYXRlZFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc0NhbGN1bGF0ZWQoKTogYm9vbGVhbntcclxuICAgICAgIHJldHVybiB0aGlzLl9pc0NhbGN1bGF0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc2VyaWUgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgb2xkTmFtZSA9ICB0aGlzLl9uYW1lO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24ucmVuYW1lLCB0aGlzLl9uYW1lLCBvbGROYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzZXJpZSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdW5pcXVlIHNlcmllIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNlcmllIGNvbG9yXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgb2xkQ29sb3IgPSB0aGlzLl9jb2xvcjtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5jb2xvckNoYW5nZWQsIHRoaXMuX2NvbG9yLCBvbGRDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc2VyaWUgY29sb3JcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGlmIHJhd1BvaW50cyBhcmUgdmFsaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByYXdQb2ludHNWYWxpZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25hbC5yYXdQb2ludHNWYWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzdGFydFRyaWdnZXJUaW1lXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc3RhcnRUcmlnZ2VyVGltZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc3RhcnRUcmlnZ2VyVGltZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgc3RhcnRUcmlnZ2VyVGltZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBpZih2YWx1ZSAhPSB0aGlzLl9zdGFydFRyaWdnZXJUaW1lKXtcclxuICAgICAgICAgICAgbGV0IG9sZFN0YXJ0VHJpZ2dlclRpbWUgPSB0aGlzLl9zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5zdGFydFRyaWdnZXJUaW1lQ2hhbmdlZCwgb2xkU3RhcnRUcmlnZ2VyVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHN0YXJ0IHRyaWdnZXIgZm9ybWF0ZWQgdGltZSAoc2hvd24gbmV4dCB0byBzZXJpZSBuYW1lKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYWRkaXRpb25hbEluZm8oKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUgIT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZSh0aGlzLl9zdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7IC8vIE5vIHN0YXJ0IHRyaWdnZXIgaW5mbyBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBwYXJlbnQgb2Ygc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHBhcmVudCBvZiBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVHcm91cCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIGlmKHRoaXMuX3BhcmVudC5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9wYXJlbnQucGFyZW50LmlkID09IFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRSZWNlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBzZXJpZSB0byBhdXRvVXBkYXRlZCBpZiBpbiByZWNlbnQgY2F0ZWdvcnlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQXV0b1VwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IHRoaXMuX3BhcmVudC5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJpZ2dlclRpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGUgbmFtZSB0byB0aGUgb3JpZ2luYWwgbmFtZSBmcm9tIHRoZSBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXROYW1lKCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5vcmlnaW5hbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhpcyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogQmFzZVNlcmllc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgKHNldHRpbmdzIGFzIFNldHRpbmdzKS5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0lkLCB0aGlzLl9zZXJpZXNQcm92aWRlci5nZXRVbmlxdWVJZCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzUHJvdmlkZXIuY3JlYXRlU2VyaWUoc2V0dGluZ3MpITtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIHNlcmllIGRhdGEgY2hhbmdlZCBldmVudCAoZS5nLiBzZXJpZSBjb2xvciwgc2VyaWUgZGF0YXBvaW50cywgcmVuYW1lIGNoYW5nZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGV2ZW50QXJnc1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblNpZ25hbERhdGFDaGFuZ2VkKHNlbmRlcjogSVNpZ25hbCwgZXZlbnRBcmdzOiBFdmVudFNpZ25hbERhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICAgICAgc3dpdGNoIChldmVudEFyZ3MuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2lnbmFsQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWVzdGFtcHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCwgZXZlbnRBcmdzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTaWduYWxBY3Rpb24uc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQ6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkLCBldmVudEFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRGF0YUNoYW5nZWQoYWN0aW9uOiBTZXJpZUFjdGlvbiwgZGF0YTogYW55LCBvbGREYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MoYWN0aW9uLCBkYXRhLCBvbGREYXRhKTtcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUNoYW5nZWQucmFpc2UodGhpcywgZXZlbnRBcmdzKTtcclxuICAgICAgICBpZihhY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIHNlcmlzIGRhdGEgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uU2VyaWVEYXRhQ2hhbmdlZCggZGF0YTogSVBvaW50W10pIHtcclxuICAgICAgICAvL1RPRE86IGV2ZW50dWFsbHkgY2FsbCBzaW1wbGlmaWNhdGlvbiA/Pz8/XHJcbiAgICB9XHJcbn0iXX0=
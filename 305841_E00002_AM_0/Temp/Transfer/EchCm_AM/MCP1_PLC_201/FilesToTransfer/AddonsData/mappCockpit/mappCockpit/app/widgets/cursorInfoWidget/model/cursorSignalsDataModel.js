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
define(["require", "exports", "../../../framework/events", "../../../models/common/series/eventSerieDataChangedArgs", "../../../models/common/point", "../../../models/common/series/seriesType", "./ytCursorSignal", "./xyCursorSignal", "./fftCursorSignal", "./componentDefaultDefinition", "./settingIds", "../../../common/persistence/settings", "../../common/states/cursorType"], function (require, exports, events_1, eventSerieDataChangedArgs_1, point_1, seriesType_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, componentDefaultDefinition_1, settingIds_1, settings_1, cursorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventModelChanged = /** @class */ (function (_super) {
        __extends(EventModelChanged, _super);
        function EventModelChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelChanged;
    }(events_1.TypedEvent));
    ;
    var CursorSignalsDataModel = /** @class */ (function () {
        function CursorSignalsDataModel() {
            var _this = this;
            this._isPersistEnabled = false;
            this.eventModelChanged = new EventModelChanged();
            this._cursorSignals = new Array();
            this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
        }
        CursorSignalsDataModel.prototype.initialize = function () {
            this.component.loadComponentSettings();
            //When widget is initialized data can be persisted
            this._isPersistEnabled = true;
        };
        CursorSignalsDataModel.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        CursorSignalsDataModel.prototype.dispose = function () {
        };
        /**
         * Returns the list with the cursor signals for the cursor info widget
         *
         * @returns {Array<CursorSignal>}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignals = function () {
            return this._cursorSignals;
        };
        /**
         *  Returns the CursorSignal which links to the given serie
         *
         * @param {BaseSeries} serie
         * @returns {(CursorSignal|undefined)}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignal = function (serie) {
            for (var i = 0; i < this._cursorSignals.length; i++) {
                if (this._cursorSignals[i].serie.id === serie.id) {
                    // serie already in list
                    return this._cursorSignals[i];
                }
            }
            return undefined;
        };
        /**
         * Returns the index of the cursorSignal in the datamodel else -1 if not found
         *
         * @param {CursorSignal} cursorSignal
         * @returns {number}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getIndex = function (cursorSignal) {
            return this._cursorSignals.indexOf(cursorSignal);
        };
        CursorSignalsDataModel.prototype.getComponentSettings = function (onlyModified) {
            var cursorSignalsData = new Array();
            for (var i = 0; i < this._cursorSignals.length; i++) {
                cursorSignalsData.push(this._cursorSignals[i].getSettings());
            }
            this.component.setSetting("cursorSignalsData", cursorSignalsData);
            return this.component.getComponentSettings(onlyModified);
        };
        CursorSignalsDataModel.prototype.setComponentSettings = function (componentSettings) {
            if (componentSettings != undefined) {
                this.component.setComponentSettings(componentSettings);
                var cursorSignalsData = this.component.getSetting("cursorSignalsData");
                if (cursorSignalsData != undefined) {
                    //We add the series from bottom to top. In the cursorInfoWidget, the last serie we insert is always placed on top.
                    for (var i = cursorSignalsData.length - 1; i > -1; i--) {
                        var cursorSignalData = cursorSignalsData[i];
                        var settings = settings_1.Settings.create(cursorSignalData);
                        var series = new Array();
                        var serie = this.getSerieFromProvider(settings.getValue(settingIds_1.SettingIds.SerieId));
                        if (serie != undefined) {
                            series.push(serie);
                        }
                        this.addSeries(series, settings.getValue(settingIds_1.SettingIds.ExpandState), settings.getValue(settingIds_1.SettingIds.CursorInfo));
                    }
                }
                this.onModelChanged();
            }
        };
        CursorSignalsDataModel.prototype.getSerieFromProvider = function (id) {
            var seriesProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
            if (seriesProvider != undefined) {
                return seriesProvider.get(id);
            }
            return undefined;
        };
        CursorSignalsDataModel.prototype.addSeries = function (series, expandState, cursorInfo) {
            var cursorSignals = new Array();
            for (var i = 0; i < series.length; i++) {
                if (series[i].type === seriesType_1.SeriesType.timeSeries) {
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i], expandState, cursorInfo));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i], expandState, cursorInfo));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i], expandState, cursorInfo));
                }
            }
            this.addSignal(cursorSignals);
        };
        /**
         * Adds the given signal to the signal list
         *
         * @param {Array<CursorSignal>} cursorSignal
         * @returns
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.addSignal = function (cursorSignal) {
            for (var i = 0; i < cursorSignal.length; i++) {
                var index = this._cursorSignals.indexOf(cursorSignal[i]);
                if (index > -1) {
                    // cusorSignal already in list
                    return;
                }
                //Check if serie is not in the list
                if (this.getCursorSignal(cursorSignal[i].serie) == undefined) {
                    cursorSignal[i].serie.eventDataChanged.attach(this._serieDataChangedHandler);
                    this._cursorSignals.splice(0, 0, cursorSignal[i]);
                    this.updateCursorSignalValues(cursorSignal[i]);
                    this.onModelChanged();
                }
            }
        };
        /**
         * Updates the cursor signal values for the currently available cursor state positions
         *
         * @private
         * @param {CursorSignal} cursorSignal
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.updateCursorSignalValues = function (cursorSignal) {
            var _a, _b;
            var cursorType = cursorType_1.CursorTypeHelper.getCursorTypeForSeries(cursorSignal.serie);
            this.updateCursorValues(cursorSignal, (_a = this._currentCursorStates) === null || _a === void 0 ? void 0 : _a.getPosition(0, cursorType), (_b = this._currentCursorStates) === null || _b === void 0 ? void 0 : _b.getPosition(1, cursorType));
        };
        /**
         * Clears all the cursor value informations of this signal
         *
         * @private
         * @param {CursorSignal} cursorSignal
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.clearCursorSignalValues = function (cursorSignal) {
            cursorSignal.clearValues();
        };
        /**
         * Removes the given signal from the signal list
         *
         * @param {CursorSignal} cursorSignal
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.removeSerie = function (cursorSignal) {
            var index = this._cursorSignals.indexOf(cursorSignal);
            if (index > -1) {
                this._cursorSignals.splice(index, 1);
                cursorSignal.serie.eventDataChanged.detach(this._serieDataChangedHandler);
                this.onModelChanged();
            }
        };
        /**
         * Updates the cursor informations for the given signal to the defined cursorIndex 1 and 2
         *
         * @private
         * @param {CursorSignal} cursorSignal
         * @param {(number|undefined)} cursorTimestamp1
         * @param {(number|undefined)} cursorTimestamp2
         * @returns
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.updateCursorValues = function (cursorSignal, cursorTimestamp1, cursorTimestamp2) {
            if (!cursorSignal.serie.rawPointsValid) {
                cursorSignal.clearValues();
                return;
            }
            var cursorPoint1;
            var cursorPoint2;
            if (cursorTimestamp1 != undefined) {
                cursorPoint1 = this.getCursorSignalPoint(cursorSignal, cursorTimestamp1);
            }
            if (cursorTimestamp2 != undefined) {
                cursorPoint2 = this.getCursorSignalPoint(cursorSignal, cursorTimestamp2);
            }
            cursorSignal.updateValues(cursorPoint1, cursorPoint2, cursorTimestamp1, cursorTimestamp2);
        };
        /**
         * gets a cursor signal point from the given curor signal and timestamp
         *
         * @private
         * @param {CursorSignal} cursorSignal
         * @param {number} cursorTimestamp
         * @returns
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignalPoint = function (cursorSignal, cursorTimestamp) {
            var cursorPoint = point_1.Point.Empty();
            // get the nearest signal point for valid timestamps
            if (cursorTimestamp != undefined && cursorSignal.serie.timestampIsInRange(cursorTimestamp)) {
                cursorPoint = cursorSignal.serie.previousPointFromTimestamp(cursorTimestamp);
            }
            return cursorPoint;
        };
        /**
         * updates the cursor info values corresponding to the given cursor state values
         *
         * @param {CursorStates} modifiedState
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.updateInfoCursorsWithNewCursorStateValues = function (currentCursorStates) {
            var _this = this;
            this._currentCursorStates = currentCursorStates;
            this.getCursorSignals().forEach(function (cursorSignal) {
                if (cursorSignal.serie.rawPointsValid) {
                    _this.updateCursorSignalValues(cursorSignal);
                }
                else {
                    _this.clearCursorSignalValues(cursorSignal);
                }
            });
        };
        CursorSignalsDataModel.prototype.onSerieDataChanged = function (sender, args) {
            if (args.action == eventSerieDataChangedArgs_1.SerieAction.rename || args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged
                || args.action == eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged || args.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                // if the datapoints have changed, then the cursor values must be updated
                if (args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                    var cursorSignal = this.getCursorSignal(sender);
                    if (cursorSignal != undefined) {
                        this.updateCursorSignalValues(cursorSignal);
                    }
                }
                this.onModelChanged();
            }
        };
        CursorSignalsDataModel.prototype.onModelChanged = function () {
            this.eventModelChanged.raise(this, null);
            this.saveSettings();
        };
        /**
         * Save settings in cursor dataModel
         *
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.saveSettings = function () {
            if (this._isPersistEnabled) {
                this.component.saveComponentSettings();
            }
        };
        return CursorSignalsDataModel;
    }());
    exports.CursorSignalsDataModel = CursorSignalsDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvclNpZ25hbHNEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXVCQTtRQUFnQyxxQ0FBd0M7UUFBeEU7O1FBQTBFLENBQUM7UUFBRCx3QkFBQztJQUFELENBQUMsQUFBM0UsQ0FBZ0MsbUJBQVUsR0FBaUM7SUFBQSxDQUFDO0lBRTVFO1FBY0k7WUFBQSxpQkFFQztZQVpPLHNCQUFpQixHQUFZLEtBQUssQ0FBQztZQUUzQyxzQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFFcEMsbUJBQWMsR0FBd0IsSUFBSyxLQUFLLEVBQWdCLENBQUM7WUFJakUsNkJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztRQUl2RixDQUFDO1FBRUQsMkNBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN2QyxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBRUQsb0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQsd0NBQU8sR0FBUDtRQUNBLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLGlEQUFnQixHQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksZ0RBQWUsR0FBdEIsVUFBdUIsS0FBaUI7WUFDcEMs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RyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoRCxJQUFHLFlBQVksSUFBSSxTQUFTLEVBQUM7d0JBQzFCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDOUM7aUJBQ0o7Z0JBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQztRQUVPLCtDQUFjLEdBQXRCO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksNkNBQVksR0FBbkI7WUFDSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQzFDO1FBQ0wsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQXRSRCxJQXNSQztJQXRSWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVBY3Rpb24sIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgWVRDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi95dEN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBYWUN1cnNvclNpZ25hbCB9IGZyb20gXCIuL3h5Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IEZGVEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL2ZmdEN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVmlzaWJpbGl0eSB9IGZyb20gXCIuL2N1cnNvckluZm9WaXNpYmlsaXR5XCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RhdGVzL2N1cnNvclR5cGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcblxyXG5jbGFzcyBFdmVudE1vZGVsQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8Q3Vyc29yU2lnbmFsc0RhdGFNb2RlbCwgbnVsbD57IH07XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCBpbXBsZW1lbnRzIElDb21wb25lbnR7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjb21wb25lbnQhOiBDb21wb25lbnRCYXNlO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9pc1BlcnNpc3RFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgZXZlbnRNb2RlbENoYW5nZWQgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWQoKTtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+ID0gbmV3ICBBcnJheTxDdXJzb3JTaWduYWw+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3VycmVudEN1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzfHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplKCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQubG9hZENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgLy9XaGVuIHdpZGdldCBpcyBpbml0aWFsaXplZCBkYXRhIGNhbiBiZSBwZXJzaXN0ZWRcclxuICAgICAgICB0aGlzLl9pc1BlcnNpc3RFbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0IHdpdGggdGhlIGN1cnNvciBzaWduYWxzIGZvciB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvclNpZ25hbD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q3Vyc29yU2lnbmFscygpOiBBcnJheTxDdXJzb3JTaWduYWw+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTaWduYWxzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFJldHVybnMgdGhlIEN1cnNvclNpZ25hbCB3aGljaCBsaW5rcyB0byB0aGUgZ2l2ZW4gc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7KEN1cnNvclNpZ25hbHx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1cnNvclNpZ25hbChzZXJpZTogQmFzZVNlcmllcyk6IEN1cnNvclNpZ25hbHx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLl9jdXJzb3JTaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fY3Vyc29yU2lnbmFsc1tpXS5zZXJpZS5pZCA9PT0gc2VyaWUuaWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gc2VyaWUgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFsc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBjdXJzb3JTaWduYWwgaW4gdGhlIGRhdGFtb2RlbCBlbHNlIC0xIGlmIG5vdCBmb3VuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfSBjdXJzb3JTaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SW5kZXgoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclNpZ25hbHMuaW5kZXhPZihjdXJzb3JTaWduYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICBsZXQgY3Vyc29yU2lnbmFsc0RhdGEgPSBuZXcgQXJyYXk8SVNldHRpbmdzPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHRoaXMuX2N1cnNvclNpZ25hbHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWxzRGF0YS5wdXNoKHRoaXMuX2N1cnNvclNpZ25hbHNbaV0uZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoXCJjdXJzb3JTaWduYWxzRGF0YVwiLCBjdXJzb3JTaWduYWxzRGF0YSk7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihjb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTaWduYWxzRGF0YTogQXJyYXk8SVNldHRpbmdzPiA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoXCJjdXJzb3JTaWduYWxzRGF0YVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGN1cnNvclNpZ25hbHNEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvL1dlIGFkZCB0aGUgc2VyaWVzIGZyb20gYm90dG9tIHRvIHRvcC4gSW4gdGhlIGN1cnNvckluZm9XaWRnZXQsIHRoZSBsYXN0IHNlcmllIHdlIGluc2VydCBpcyBhbHdheXMgcGxhY2VkIG9uIHRvcC5cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IGN1cnNvclNpZ25hbHNEYXRhLmxlbmd0aCAtMTsgaSA+IC0xOyBpLS0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJzb3JTaWduYWxEYXRhOiBJU2V0dGluZ3MgPSBjdXJzb3JTaWduYWxzRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSBTZXR0aW5ncy5jcmVhdGUoY3Vyc29yU2lnbmFsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZSA9IHRoaXMuZ2V0U2VyaWVGcm9tUHJvdmlkZXIoc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZUlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllcyhzZXJpZXMsIHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuRXhwYW5kU3RhdGUpLCBzZXR0aW5ncy5nZXRWYWx1ZShTZXR0aW5nSWRzLkN1cnNvckluZm8pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQoKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNlcmllRnJvbVByb3ZpZGVyKGlkOiBzdHJpbmcpOiBCYXNlU2VyaWVzfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgc2VyaWVzUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNlcmllc1Byb3ZpZGVySWQpIGFzIElTZXJpZXNQcm92aWRlcjtcclxuICAgICAgICBpZihzZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gc2VyaWVzUHJvdmlkZXIuZ2V0KGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBleHBhbmRTdGF0ZTogYm9vbGVhbiwgY3Vyc29ySW5mbzogQXJyYXk8Q3Vyc29ySW5mb1Zpc2liaWxpdHk+KXtcclxuICAgICAgICBsZXQgY3Vyc29yU2lnbmFscyA9IG5ldyBBcnJheTxDdXJzb3JTaWduYWw+KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLnR5cGUgPT09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBZVEN1cnNvclNpZ25hbChzZXJpZXNbaV0sIGV4cGFuZFN0YXRlLCBjdXJzb3JJbmZvKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VyaWVzW2ldLnR5cGUgPT09IFNlcmllc1R5cGUueHlTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgWFlDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBleHBhbmRTdGF0ZSwgY3Vyc29ySW5mbykpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBGRlRDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBleHBhbmRTdGF0ZSwgY3Vyc29ySW5mbykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkU2lnbmFsKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gc2lnbmFsIHRvIHRoZSBzaWduYWwgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNpZ25hbChjdXJzb3JTaWduYWw6IEFycmF5PEN1cnNvclNpZ25hbD4pe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vyc29yU2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fY3Vyc29yU2lnbmFscy5pbmRleE9mKGN1cnNvclNpZ25hbFtpXSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjdXNvclNpZ25hbCBhbHJlYWR5IGluIGxpc3RcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0NoZWNrIGlmIHNlcmllIGlzIG5vdCBpbiB0aGUgbGlzdFxyXG4gICAgICAgICAgICBpZih0aGlzLmdldEN1cnNvclNpZ25hbChjdXJzb3JTaWduYWxbaV0uc2VyaWUpID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxbaV0uc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFscy5zcGxpY2UoMCwgMCwgY3Vyc29yU2lnbmFsW2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU2lnbmFsVmFsdWVzKGN1cnNvclNpZ25hbFtpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3Igc2lnbmFsIHZhbHVlcyBmb3IgdGhlIGN1cnJlbnRseSBhdmFpbGFibGUgY3Vyc29yIHN0YXRlIHBvc2l0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUN1cnNvclNpZ25hbFZhbHVlcyhjdXJzb3JTaWduYWw6IEN1cnNvclNpZ25hbCl7XHJcbiAgICAgICAgbGV0IGN1cnNvclR5cGUgPSBDdXJzb3JUeXBlSGVscGVyLmdldEN1cnNvclR5cGVGb3JTZXJpZXMoY3Vyc29yU2lnbmFsLnNlcmllKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWwsIHRoaXMuX2N1cnJlbnRDdXJzb3JTdGF0ZXM/LmdldFBvc2l0aW9uKDAsIGN1cnNvclR5cGUpLCB0aGlzLl9jdXJyZW50Q3Vyc29yU3RhdGVzPy5nZXRQb3NpdGlvbigxLCBjdXJzb3JUeXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBjdXJzb3IgdmFsdWUgaW5mb3JtYXRpb25zIG9mIHRoaXMgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfSBjdXJzb3JTaWduYWxcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xlYXJDdXJzb3JTaWduYWxWYWx1ZXMoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwpe1xyXG4gICAgICAgIGN1cnNvclNpZ25hbC5jbGVhclZhbHVlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gc2lnbmFsIGZyb20gdGhlIHNpZ25hbCBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx9IGN1cnNvclNpZ25hbFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVNlcmllKGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKXtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9jdXJzb3JTaWduYWxzLmluZGV4T2YoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGN1cnNvclNpZ25hbC5zZXJpZS5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQoKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciBpbmZvcm1hdGlvbnMgZm9yIHRoZSBnaXZlbiBzaWduYWwgdG8gdGhlIGRlZmluZWQgY3Vyc29ySW5kZXggMSBhbmQgMlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcGFyYW0geyhudW1iZXJ8dW5kZWZpbmVkKX0gY3Vyc29yVGltZXN0YW1wMVxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyfHVuZGVmaW5lZCl9IGN1cnNvclRpbWVzdGFtcDJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWw6Q3Vyc29yU2lnbmFsLCBjdXJzb3JUaW1lc3RhbXAxOiBudW1iZXJ8dW5kZWZpbmVkLCBjdXJzb3JUaW1lc3RhbXAyOiBudW1iZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZiAoIWN1cnNvclNpZ25hbC5zZXJpZS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgIGN1cnNvclNpZ25hbC5jbGVhclZhbHVlcygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQxOiBJUG9pbnR8dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBjdXJzb3JQb2ludDI6IElQb2ludHx1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoY3Vyc29yVGltZXN0YW1wMSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JQb2ludDEgPSB0aGlzLmdldEN1cnNvclNpZ25hbFBvaW50KGN1cnNvclNpZ25hbCwgY3Vyc29yVGltZXN0YW1wMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cnNvclRpbWVzdGFtcDIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY3Vyc29yUG9pbnQyID0gdGhpcy5nZXRDdXJzb3JTaWduYWxQb2ludChjdXJzb3JTaWduYWwsIGN1cnNvclRpbWVzdGFtcDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJzb3JTaWduYWwudXBkYXRlVmFsdWVzKGN1cnNvclBvaW50MSwgY3Vyc29yUG9pbnQyLCBjdXJzb3JUaW1lc3RhbXAxLCBjdXJzb3JUaW1lc3RhbXAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBjdXJzb3Igc2lnbmFsIHBvaW50IGZyb20gdGhlIGdpdmVuIGN1cm9yIHNpZ25hbCBhbmQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfSBjdXJzb3JTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JUaW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEN1cnNvclNpZ25hbFBvaW50KGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsLCBjdXJzb3JUaW1lc3RhbXA6IG51bWJlcik6SVBvaW50IHtcclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQ6SVBvaW50ID0gUG9pbnQuRW1wdHkoKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHNpZ25hbCBwb2ludCBmb3IgdmFsaWQgdGltZXN0YW1wc1xyXG4gICAgICAgIGlmIChjdXJzb3JUaW1lc3RhbXAgIT0gdW5kZWZpbmVkICYmIGN1cnNvclNpZ25hbC5zZXJpZS50aW1lc3RhbXBJc0luUmFuZ2UoY3Vyc29yVGltZXN0YW1wKSkge1xyXG4gICAgICAgICAgICBjdXJzb3JQb2ludCA9ICBjdXJzb3JTaWduYWwuc2VyaWUucHJldmlvdXNQb2ludEZyb21UaW1lc3RhbXAoY3Vyc29yVGltZXN0YW1wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJzb3JQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgdGhlIGN1cnNvciBpbmZvIHZhbHVlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBjdXJzb3Igc3RhdGUgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IG1vZGlmaWVkU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVJbmZvQ3Vyc29yc1dpdGhOZXdDdXJzb3JTdGF0ZVZhbHVlcyhjdXJyZW50Q3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMpe1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRDdXJzb3JTdGF0ZXMgPSBjdXJyZW50Q3Vyc29yU3RhdGVzO1xyXG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yU2lnbmFscygpLmZvckVhY2goKGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKT0+e1xyXG4gICAgICAgICAgICBpZihjdXJzb3JTaWduYWwuc2VyaWUucmF3UG9pbnRzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTaWduYWxWYWx1ZXMoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckN1cnNvclNpZ25hbFZhbHVlcyhjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyOiBCYXNlU2VyaWVzLCBhcmdzOiBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5yZW5hbWUgfHwgYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQgXHJcbiAgICAgICAgICAgIHx8IGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkIHx8IGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBkYXRhcG9pbnRzIGhhdmUgY2hhbmdlZCwgdGhlbiB0aGUgY3Vyc29yIHZhbHVlcyBtdXN0IGJlIHVwZGF0ZWRcclxuICAgICAgICAgICAgaWYoYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvclNpZ25hbCA9IHRoaXMuZ2V0Q3Vyc29yU2lnbmFsKHNlbmRlcik7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJzb3JTaWduYWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU2lnbmFsVmFsdWVzKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Nb2RlbENoYW5nZWQoKXtcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxDaGFuZ2VkLnJhaXNlKHRoaXMsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlIHNldHRpbmdzIGluIGN1cnNvciBkYXRhTW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZVNldHRpbmdzKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzUGVyc2lzdEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2F2ZUNvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
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
define(["require", "exports", "../../framework/events", "./eventScaleDataChangedArgs", "./chartManagerChart", "../../common/persistence/settings", "./settingIds"], function (require, exports, events_1, eventScaleDataChangedArgs_1, chartManagerChart_1, settings_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventScaleDataChanged = /** @class */ (function (_super) {
        __extends(EventScaleDataChanged, _super);
        function EventScaleDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventScaleDataChanged;
    }(events_1.TypedEvent));
    ;
    var Scale = /** @class */ (function () {
        /**
         * Creates an instance of Scale
         * @param {string} id
         * @memberof Scale
         */
        function Scale(id, parent) {
            this.dropPossible = false;
            this.expandState = true;
            this.uniqueId = 0;
            this._minYValue = 0;
            this._maxYValue = 100;
            this._minXValue = 0;
            this._maxXValue = 100;
            this._xValue = [0, 100];
            this.eventDataChanged = new EventScaleDataChanged();
            this.parent = parent;
            this.id = id;
            this.name = 'Scale';
            this.description = "";
            this.childs = new Array();
            this.isDisabled = false;
        }
        Scale.prototype.getSettings = function () {
            var settings = new settings_1.Settings("Scale");
            var series = this.getChilds();
            var seriesExport = new Array();
            series.forEach(function (serie) {
                seriesExport.push(serie.id);
            });
            settings.setValue(settingIds_1.SettingIds.ScaleId, this.id);
            settings.setValue(settingIds_1.SettingIds.ScaleName, this.name);
            settings.setValue(settingIds_1.SettingIds.ScaleExpandState, this.expandState);
            settings.setValue(settingIds_1.SettingIds.ScaleMinXValue, this.minXValue);
            settings.setValue(settingIds_1.SettingIds.ScaleMaxXValue, this.maxXValue);
            settings.setValue(settingIds_1.SettingIds.ScaleMinYValue, this.minYValue);
            settings.setValue(settingIds_1.SettingIds.ScaleMaxYValue, this.maxYValue);
            settings.setValue(settingIds_1.SettingIds.ScaleSeriesIds, seriesExport);
            return settings;
        };
        Scale.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.id = settingsObj.getValue(settingIds_1.SettingIds.ScaleId);
            this.name = settingsObj.getValue(settingIds_1.SettingIds.ScaleName);
            this.expandState = settingsObj.getValue(settingIds_1.SettingIds.ScaleExpandState);
            var minXValue = settingsObj.getValue(settingIds_1.SettingIds.ScaleMinXValue);
            var maxXValue = settingsObj.getValue(settingIds_1.SettingIds.ScaleMaxXValue);
            var minYValue = settingsObj.getValue(settingIds_1.SettingIds.ScaleMinYValue);
            var maxYValue = settingsObj.getValue(settingIds_1.SettingIds.ScaleMaxYValue);
            this.setScaleRange(minXValue, maxXValue, minYValue, maxYValue);
            // TODO: Set series to scale here and not in chartmanager datamodel
            //this.seriesExport = settingsObj.getData("seriesIds");
        };
        Object.defineProperty(Scale.prototype, "minYValue", {
            get: function () {
                return this._minYValue;
            },
            set: function (value) {
                this._minYValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "maxYValue", {
            get: function () {
                return this._maxYValue;
            },
            set: function (value) {
                this._maxYValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "minXValue", {
            get: function () {
                return this._minXValue;
            },
            set: function (value) {
                if (value != this._minXValue) {
                    this._minXValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "maxXValue", {
            get: function () {
                return this._maxXValue;
            },
            set: function (value) {
                if (value != this._maxXValue) {
                    this._maxXValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "xValue", {
            get: function () {
                return this._xValue;
            },
            set: function (value) {
                this._xValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "iconDefinition", {
            get: function () {
                var iconDefinition = "";
                var classNames = "e-treegridcollapse treegridcollapse";
                // Add collapse/expand icon 
                if (this.expandState == true) {
                    classNames += "e-treegridexpand treegridexpand";
                }
                iconDefinition += "<div class='" + classNames + "'></div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Add series to scale
         *
         * @param {Array<BaseSeries>} series
         * @memberof Scale
         */
        Scale.prototype.addSeries = function (series) {
            for (var i = 0; i < series.length; i++) {
                this.childs.push(series[i]);
            }
        };
        /**
         *
         *
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof Scale
         */
        Scale.prototype.removeSerie = function (serie) {
            var index = -1;
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] == serie) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this.childs.splice(index, 1);
                return true;
            }
            return false;
        };
        /**
         * Returns the number of matching series between the ones being dragged and the ones in the scale
         *
         * @param {Array<BaseSeries>} data
         * @returns {number}
         * @memberof Scale
         */
        Scale.prototype.numberOfMatchingSeries = function (data) {
            var index = 0;
            //FFT exception. Avoid to insert same input signal in FFT chart
            var isFFTChart = this.parent.chartType == chartManagerChart_1.ChartType.FFTChart;
            for (var i = 0; i < this.childs.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (this.childs[i] == data[j] || (isFFTChart && this.isSerieInCalculation(this.childs[i], data[j]))) {
                        index += 1;
                        break;
                    }
                }
            }
            return index;
        };
        /**
         * Returns true if the signal is in the scale
         *
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof Scale
         */
        Scale.prototype.hasSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] == serie) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Check if serie is already used in a calculated serie that is inside the chart
         *
         * @param {BaseSeries} serieInScale
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof Scale
         */
        Scale.prototype.isSerieInCalculation = function (serieInScale, serie) {
            var calculationDataInfo = serieInScale.calculationDataInfo;
            if (calculationDataInfo != undefined) {
                if (calculationDataInfo.inputSeriesIds[0] == serie.id) {
                    return true;
                }
            }
            return false;
        };
        Scale.prototype.getChilds = function () {
            var series = [];
            for (var i = 0; i < this.childs.length; i++) {
                series.push(this.childs[i]);
            }
            return series;
        };
        /**
         * Sets the chart disabled or enabled
         *
         * @param {boolean} disabled
         * @memberof Scale
         */
        Scale.prototype.setDisabled = function (disabled) {
            this.isDisabled = disabled;
        };
        /**
         * Sets the range of this scale for the given axis and min/max values
         *
         * @param {number} minXValue
         * @param {number} maxXValue
         * @param {number} minYValue
         * @param {number} maxYValue
         * @memberof Scale
         */
        Scale.prototype.setScaleRange = function (minXValue, maxXValue, minYValue, maxYValue) {
            var xAxisChanged = false;
            var yAxisChanged = false;
            if (this.minXValue != minXValue || this.maxXValue != maxXValue) {
                xAxisChanged = true;
            }
            if (this.minYValue != minYValue || this.maxYValue != maxYValue) {
                yAxisChanged = true;
            }
            this.minYValue = minYValue;
            this.maxYValue = maxYValue;
            this.minXValue = minXValue;
            this.maxXValue = maxXValue;
            if (xAxisChanged) {
                var args = new eventScaleDataChangedArgs_1.EventScaleDataChangedArgs(eventScaleDataChangedArgs_1.ScaleAction.xRangeChanged, { scale: this });
                this.eventDataChanged.raise(this, args);
            }
            if (yAxisChanged) {
                var args = new eventScaleDataChangedArgs_1.EventScaleDataChangedArgs(eventScaleDataChangedArgs_1.ScaleAction.yRangeChanged, { scale: this });
                this.eventDataChanged.raise(this, args);
            }
        };
        return Scale;
    }());
    exports.Scale = Scale;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBO1FBQW9DLHlDQUE2QztRQUFqRjs7UUFBbUYsQ0FBQztRQUFELDRCQUFDO0lBQUQsQ0FBQyxBQUFwRixDQUFvQyxtQkFBVSxHQUFzQztJQUFBLENBQUM7SUFHckY7UUFzQkk7Ozs7V0FJRztRQUNILGVBQVksRUFBVSxFQUFFLE1BQTBCO1lBcEJsRCxpQkFBWSxHQUFZLEtBQUssQ0FBQztZQUM5QixnQkFBVyxHQUFZLElBQUksQ0FBQztZQUM1QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1lBRWIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLGVBQVUsR0FBRyxHQUFHLENBQUM7WUFFakIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLGVBQVUsR0FBRyxHQUFHLENBQUM7WUFFakIsWUFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTNCLHFCQUFnQixHQUEwQixJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFTbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtZQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUVELDJCQUFXLEdBQVg7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFD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QUksRUFBQyxJQUFJLENBQUMsQ0FBQzthQUMxQztRQUNMLENBQUM7UUFDTCxZQUFDO0lBQUQsQ0FBQyxBQXBSRCxJQW9SQztJQXBSWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IElTY2FsZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2NhbGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncywgU2NhbGVBY3Rpb24gfSBmcm9tIFwiLi9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuXHJcbmNsYXNzIEV2ZW50U2NhbGVEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQgPFNjYWxlLCBFdmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2NhbGUgaW1wbGVtZW50cyBJU2NhbGV7XHJcbiAgICBwYXJlbnQ6IElDaGFydE1hbmFnZXJDaGFydDtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgY2hpbGRzOiBCYXNlU2VyaWVzW107XHJcbiAgICBpc0Rpc2FibGVkOiBib29sZWFuO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBleHBhbmRTdGF0ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB1bmlxdWVJZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIF9taW5ZVmFsdWUgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbWF4WVZhbHVlID0gMTAwO1xyXG5cclxuICAgIHByaXZhdGUgX21pblhWYWx1ZSA9IDA7XHJcbiAgICBwcml2YXRlIF9tYXhYVmFsdWUgPSAxMDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfeFZhbHVlID0gWzAsIDEwMF07XHJcblxyXG4gICAgZXZlbnREYXRhQ2hhbmdlZDogRXZlbnRTY2FsZURhdGFDaGFuZ2VkID0gbmV3IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZCgpO1xyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNjYWxlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBTY2FsZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBwYXJlbnQ6IElDaGFydE1hbmFnZXJDaGFydCl7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdTY2FsZSdcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNoaWxkcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoXCJTY2FsZVwiKTtcclxuICAgICAgICBsZXQgc2VyaWVzID0gdGhpcy5nZXRDaGlsZHMoKTtcclxuICAgICAgICBsZXQgc2VyaWVzRXhwb3J0ID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBzZXJpZXMuZm9yRWFjaChzZXJpZSA9PntcclxuICAgICAgICAgIHNlcmllc0V4cG9ydC5wdXNoKHNlcmllLmlkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TY2FsZUlkLCB0aGlzLmlkKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNjYWxlTmFtZSwgdGhpcy5uYW1lKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNjYWxlRXhwYW5kU3RhdGUsIHRoaXMuZXhwYW5kU3RhdGUpO1xyXG5cclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNjYWxlTWluWFZhbHVlLCB0aGlzLm1pblhWYWx1ZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TY2FsZU1heFhWYWx1ZSwgdGhpcy5tYXhYVmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2NhbGVNaW5ZVmFsdWUsIHRoaXMubWluWVZhbHVlKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNjYWxlTWF4WVZhbHVlLCB0aGlzLm1heFlWYWx1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TY2FsZVNlcmllc0lkcywgc2VyaWVzRXhwb3J0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBJU2V0dGluZ3Mpe1xyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5pZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2NhbGVJZCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TY2FsZU5hbWUpO1xyXG4gICAgICAgIHRoaXMuZXhwYW5kU3RhdGUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNjYWxlRXhwYW5kU3RhdGUpO1xyXG5cclxuICAgICAgICBsZXQgbWluWFZhbHVlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TY2FsZU1pblhWYWx1ZSk7XHJcbiAgICAgICAgbGV0IG1heFhWYWx1ZSA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2NhbGVNYXhYVmFsdWUpO1xyXG5cclxuICAgICAgICBsZXQgbWluWVZhbHVlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TY2FsZU1pbllWYWx1ZSk7XHJcbiAgICAgICAgbGV0IG1heFlWYWx1ZSA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2NhbGVNYXhZVmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0U2NhbGVSYW5nZShtaW5YVmFsdWUsIG1heFhWYWx1ZSwgbWluWVZhbHVlLCBtYXhZVmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAvLyBUT0RPOiBTZXQgc2VyaWVzIHRvIHNjYWxlIGhlcmUgYW5kIG5vdCBpbiBjaGFydG1hbmFnZXIgZGF0YW1vZGVsXHJcbiAgICAgICAgLy90aGlzLnNlcmllc0V4cG9ydCA9IHNldHRpbmdzT2JqLmdldERhdGEoXCJzZXJpZXNJZHNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pbllWYWx1ZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbllWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWluWVZhbHVlKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX21pbllWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhZVmFsdWUoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhZVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1heFlWYWx1ZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9tYXhZVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluWFZhbHVlKCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluWFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW5YVmFsdWUodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgaWYodmFsdWUgIT0gdGhpcy5fbWluWFZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5fbWluWFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhYVmFsdWUoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhYVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1heFhWYWx1ZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBpZih2YWx1ZSAhPSB0aGlzLl9tYXhYVmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhYVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHhWYWx1ZSgpIDogbnVtYmVyW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3hWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgeFZhbHVlKCB2YWx1ZSA6bnVtYmVyW10pe1xyXG4gICAgICAgIHRoaXMuX3hWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWNvbkRlZmluaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBcIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjbGFzc05hbWVzID0gXCJlLXRyZWVncmlkY29sbGFwc2UgdHJlZWdyaWRjb2xsYXBzZVwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBjb2xsYXBzZS9leHBhbmQgaWNvbiBcclxuICAgICAgICBpZih0aGlzLmV4cGFuZFN0YXRlID09IHRydWUpe1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiZS10cmVlZ3JpZGV4cGFuZCB0cmVlZ3JpZGV4cGFuZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPGRpdiBjbGFzcz0nYCArIGNsYXNzTmFtZXMgKyBgJz48L2Rpdj5gO1xyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBzZXJpZXMgdG8gc2NhbGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBTY2FsZVxyXG4gICAgICovXHJcbiAgICBhZGRTZXJpZXMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5wdXNoKHNlcmllc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTY2FsZVxyXG4gICAgICovXHJcbiAgICByZW1vdmVTZXJpZShzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGlsZHNbaV0gPT0gc2VyaWUpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBtYXRjaGluZyBzZXJpZXMgYmV0d2VlbiB0aGUgb25lcyBiZWluZyBkcmFnZ2VkIGFuZCB0aGUgb25lcyBpbiB0aGUgc2NhbGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNjYWxlXHJcbiAgICAgKi9cclxuICAgIG51bWJlck9mTWF0Y2hpbmdTZXJpZXMoZGF0YTogQXJyYXk8QmFzZVNlcmllcz4pOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDsgXHJcbiAgICAgICAgLy9GRlQgZXhjZXB0aW9uLiBBdm9pZCB0byBpbnNlcnQgc2FtZSBpbnB1dCBzaWduYWwgaW4gRkZUIGNoYXJ0XHJcbiAgICAgICAgbGV0IGlzRkZUQ2hhcnQgPSB0aGlzLnBhcmVudC5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0O1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldID09IGRhdGFbal0gfHwgKGlzRkZUQ2hhcnQgJiYgdGhpcy5pc1NlcmllSW5DYWxjdWxhdGlvbih0aGlzLmNoaWxkc1tpXSwgZGF0YVtqXSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc2lnbmFsIGlzIGluIHRoZSBzY2FsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNjYWxlXHJcbiAgICAgKi9cclxuICAgIGhhc1NlcmllKHNlcmllOiBCYXNlU2VyaWVzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGlsZHNbaV0gPT0gc2VyaWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgc2VyaWUgaXMgYWxyZWFkeSB1c2VkIGluIGEgY2FsY3VsYXRlZCBzZXJpZSB0aGF0IGlzIGluc2lkZSB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllSW5TY2FsZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2NhbGVcclxuICAgICAqL1xyXG4gICAgaXNTZXJpZUluQ2FsY3VsYXRpb24oc2VyaWVJblNjYWxlOiBCYXNlU2VyaWVzLCBzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvID0gc2VyaWVJblNjYWxlLmNhbGN1bGF0aW9uRGF0YUluZm87XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzSWRzWzBdID09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGlsZHMoKSB7XHJcbiAgICAgICAgbGV0IHNlcmllczogQmFzZVNlcmllc1tdID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgc2VyaWVzLnB1c2godGhpcy5jaGlsZHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2hhcnQgZGlzYWJsZWQgb3IgZW5hYmxlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWRcclxuICAgICAqIEBtZW1iZXJvZiBTY2FsZVxyXG4gICAgICovXHJcbiAgICBzZXREaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSByYW5nZSBvZiB0aGlzIHNjYWxlIGZvciB0aGUgZ2l2ZW4gYXhpcyBhbmQgbWluL21heCB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4WFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWVZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4WVZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2NhbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNjYWxlUmFuZ2UobWluWFZhbHVlOiBudW1iZXIsIG1heFhWYWx1ZTogbnVtYmVyLCBtaW5ZVmFsdWU6IG51bWJlciwgbWF4WVZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCB4QXhpc0NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgeUF4aXNDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5taW5YVmFsdWUgIT0gbWluWFZhbHVlIHx8IHRoaXMubWF4WFZhbHVlICE9IG1heFhWYWx1ZSl7XHJcbiAgICAgICAgICAgIHhBeGlzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfSAgICBcclxuICAgICAgICBpZih0aGlzLm1pbllWYWx1ZSAhPSBtaW5ZVmFsdWUgfHwgdGhpcy5tYXhZVmFsdWUgIT0gbWF4WVZhbHVlKXtcclxuICAgICAgICAgICAgeUF4aXNDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5taW5ZVmFsdWUgPSBtaW5ZVmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXhZVmFsdWUgPSBtYXhZVmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMubWluWFZhbHVlID0gbWluWFZhbHVlO1xyXG4gICAgICAgIHRoaXMubWF4WFZhbHVlID0gbWF4WFZhbHVlO1xyXG5cclxuICAgICAgICBpZih4QXhpc0NoYW5nZWQpe1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IG5ldyBFdmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzKFNjYWxlQWN0aW9uLnhSYW5nZUNoYW5nZWQsIHtzY2FsZTogdGhpc30pO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RGF0YUNoYW5nZWQucmFpc2UodGhpcyxhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHlBeGlzQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIGxldCBhcmdzID0gbmV3IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3MoU2NhbGVBY3Rpb24ueVJhbmdlQ2hhbmdlZCwge3NjYWxlOiB0aGlzfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnREYXRhQ2hhbmdlZC5yYWlzZSh0aGlzLGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
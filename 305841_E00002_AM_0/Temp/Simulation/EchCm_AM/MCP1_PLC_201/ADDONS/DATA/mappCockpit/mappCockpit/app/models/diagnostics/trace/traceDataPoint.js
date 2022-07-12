define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides data for describing a trace data point
     *
     * @class TraceDataPoint
     */
    var TraceDataPoint = /** @class */ (function () {
        function TraceDataPoint(datapointName, componentName, name, description) {
            if (componentName === void 0) { componentName = ""; }
            if (name === void 0) { name = ""; }
            if (description === void 0) { description = ""; }
            this._dataPointName = datapointName;
            this._description = description;
            this._componentName = componentName;
            this._name = name;
        }
        TraceDataPoint.createSimpleDataPoint = function (datapointName, componentName, name, description) {
            if (componentName === void 0) { componentName = ""; }
            if (name === void 0) { name = ""; }
            if (description === void 0) { description = ""; }
            return new TraceDataPoint(datapointName, componentName, name, description);
        };
        TraceDataPoint.createWithDataPointInfo = function (datapointInfo) {
            var dataPoint = new TraceDataPoint(datapointInfo.fullname, datapointInfo.componentName, datapointInfo.name, datapointInfo.description);
            return dataPoint;
        };
        Object.defineProperty(TraceDataPoint.prototype, "componentName", {
            get: function () {
                return this._componentName;
            },
            set: function (value) {
                this._componentName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataPoint.prototype, "dataPointName", {
            get: function () {
                return this._dataPointName;
            },
            set: function (value) {
                this._dataPointName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataPoint.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataPoint.prototype, "description", {
            get: function () {
                return this._description;
            },
            set: function (value) {
                this._description = value;
            },
            enumerable: true,
            configurable: true
        });
        return TraceDataPoint;
    }());
    exports.TraceDataPoint = TraceDataPoint;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VEYXRhUG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTs7OztPQUlHO0lBQ0g7UUFPSSx3QkFBb0IsYUFBcUIsRUFBRSxhQUEwQixFQUFFLElBQWlCLEVBQUUsV0FBd0I7WUFBdkUsOEJBQUEsRUFBQSxrQkFBMEI7WUFBRSxxQkFBQSxFQUFBLFNBQWlCO1lBQUUsNEJBQUEsRUFBQSxnQkFBd0I7WUFDOUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVNLG9DQUFxQixHQUE1QixVQUE2QixhQUFxQixFQUFFLGFBQTBCLEVBQUUsSUFBaUIsRUFBRSxXQUF3QjtZQUF2RSw4QkFBQSxFQUFBLGtCQUEwQjtZQUFFLHFCQUFBLEVBQUEsU0FBaUI7WUFBRSw0QkFBQSxFQUFBLGdCQUF3QjtZQUN2SCxPQUFPLElBQUksY0FBYyxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFFTSxzQ0FBdUIsR0FBOUIsVUFBK0IsYUFBaUM7WUFDNUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxzQkFBVyx5Q0FBYTtpQkFBeEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQy9CLENBQUM7aUJBRUQsVUFBeUIsS0FBYTtnQkFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVyx5Q0FBYTtpQkFBeEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQy9CLENBQUM7aUJBRUQsVUFBeUIsS0FBYTtnQkFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVyxnQ0FBSTtpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFFRCxVQUFnQixLQUFhO2dCQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDOzs7V0FKQTtRQU1ELHNCQUFXLHVDQUFXO2lCQUF0QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQztpQkFFRCxVQUF1QixLQUFhO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDOzs7V0FKQTtRQUtMLHFCQUFDO0lBQUQsQ0FBQyxBQXRERCxJQXNEQztJQXREWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuL3RyYWNlRGF0YVBvaW50SW5mb1wiO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGRhdGEgZm9yIGRlc2NyaWJpbmcgYSB0cmFjZSBkYXRhIHBvaW50XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZURhdGFQb2ludFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyYWNlRGF0YVBvaW50e1xyXG5cclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudE5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2RhdGFQb2ludE5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2Rlc2NyaXB0aW9uOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihkYXRhcG9pbnROYW1lOiBzdHJpbmcsIGNvbXBvbmVudE5hbWU6IHN0cmluZyA9IFwiXCIsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKXtcclxuICAgICAgICB0aGlzLl9kYXRhUG9pbnROYW1lID0gZGF0YXBvaW50TmFtZTtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgY3JlYXRlU2ltcGxlRGF0YVBvaW50KGRhdGFwb2ludE5hbWU6IHN0cmluZywgY29tcG9uZW50TmFtZTogc3RyaW5nID0gXCJcIiwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVHJhY2VEYXRhUG9pbnQoZGF0YXBvaW50TmFtZSwgY29tcG9uZW50TmFtZSwgbmFtZSwgZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgY3JlYXRlV2l0aERhdGFQb2ludEluZm8oZGF0YXBvaW50SW5mbzogVHJhY2VEYXRhUG9pbnRJbmZvKTogYW55IHtcclxuICAgICAgICBsZXQgZGF0YVBvaW50ID0gbmV3IFRyYWNlRGF0YVBvaW50KGRhdGFwb2ludEluZm8uZnVsbG5hbWUsIGRhdGFwb2ludEluZm8uY29tcG9uZW50TmFtZSwgZGF0YXBvaW50SW5mby5uYW1lLCBkYXRhcG9pbnRJbmZvLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICByZXR1cm4gZGF0YVBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50TmFtZSgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbXBvbmVudE5hbWUodmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50TmFtZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YVBvaW50TmFtZSgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVBvaW50TmFtZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldCBkYXRhUG9pbnROYW1lKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2RhdGFQb2ludE5hbWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBuYW1lKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUodmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRlc2NyaXB0aW9uKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuIl19
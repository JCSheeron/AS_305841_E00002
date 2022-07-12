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
define(["require", "exports", "../../../common/math/sum", "../../../common/math/mean", "../../../common/math/standardDeviation", "../../../common/math/variance", "../../../common/math/min", "../../../common/math/max", "../../../common/math/rms", "./cursorSignal", "./fftCursorSignalDescriptor"], function (require, exports, sum_1, mean_1, standardDeviation_1, variance_1, min_1, max_1, rms_1, cursorSignal_1, fftCursorSignalDescriptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTCursorSignal = /** @class */ (function (_super) {
        __extends(FFTCursorSignal, _super);
        /**
         * Creates an instance of FFtCursorSignal
         * @param {BaseSeries} serie
         * @memberof FFtCursorSignal
         */
        function FFTCursorSignal(serie, expandState, cursorInfo) {
            var _this = _super.call(this, serie, expandState) || this;
            // represents all available values for the actual given cursors
            _this._availableValues = new InfoValues();
            _this._sum = new sum_1.Sum();
            _this._rms = new rms_1.RootMeanSquare();
            _this._mean = new mean_1.Mean();
            _this._std = new standardDeviation_1.StandardDeviation();
            _this._var = new variance_1.Variance();
            _this._min = new min_1.Min();
            _this._max = new max_1.Max();
            // create specific cursor signal desriptor
            _this._cursorSignalDescriptor = new fftCursorSignalDescriptor_1.FFTCursorSignalDescriptor(cursorInfo);
            return _this;
        }
        /**
         * Updates the cursor value informations for the given cursors
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof FFtCursorSignal
         */
        FFTCursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
            var _this = this;
            this.updateSimpleValues(cursorData1, cursorData2, time1, time2);
            this.updateCalculatedValues(cursorData1, cursorData2);
            this.cursorInfos.forEach(function (cursorInfo) {
                _this.setCursorInfo(cursorInfo);
            });
        };
        FFTCursorSignal.prototype.updateSimpleValues = function (cursor1Data, cursor2Data, time1, time2) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && time1 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y1 = cursor1Data.y.toPrecision(17);
                this._availableValues.f1 = cursor1Data.x.toPrecision(6);
            }
            else {
                this._availableValues.y1 = undefined;
                this._availableValues.f1 = undefined;
            }
            if (cursor2Data != undefined && cursor2Data.y != undefined && time2 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y2 = cursor2Data.y.toPrecision(17);
                this._availableValues.f2 = cursor2Data.x.toPrecision(6);
            }
            else {
                this._availableValues.y2 = undefined;
                this._availableValues.f2 = undefined;
            }
        };
        FFTCursorSignal.prototype.updateCalculatedValues = function (cursor1Data, cursor2Data) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && cursor2Data != undefined && cursor2Data.y != undefined) {
                var cursorMinXValue = cursor1Data.x;
                var cursorMaxXValue = cursor2Data.x;
                if (cursorMinXValue > cursorMaxXValue) {
                    // Change min and max value
                    var tempXValue = cursorMaxXValue;
                    cursorMaxXValue = cursorMinXValue;
                    cursorMinXValue = tempXValue;
                }
                var signalInfos = this.getSignalInfosFromCursorWindow(cursorMinXValue, cursorMaxXValue, cursor1Data.y);
                this._availableValues.yDiff = (cursor2Data.y - cursor1Data.y).toPrecision(17);
                this._availableValues.fDiff = (cursor2Data.x - cursor1Data.x).toPrecision(6);
                this._availableValues.yMean = signalInfos.yMean.toPrecision(17);
                this._availableValues.yStD = signalInfos.yStD.toPrecision(17);
                this._availableValues.yVar = signalInfos.yVar.toPrecision(17);
                this._availableValues.yRms = signalInfos.yRms.toPrecision(17);
                this._availableValues.yMinimum = signalInfos.yMinimum.toPrecision(17);
                this._availableValues.yMaximum = signalInfos.yMaximum.toPrecision(17);
                this._availableValues.yPp = (signalInfos.yMaximum - signalInfos.yMinimum).toPrecision(17);
            }
            else {
                this._availableValues.yDiff = undefined;
                this._availableValues.fDiff = undefined;
                this._availableValues.yMean = undefined;
                this._availableValues.yStD = undefined;
                this._availableValues.yVar = undefined;
                this._availableValues.yRms = undefined;
                this._availableValues.yMinimum = undefined;
                this._availableValues.yMaximum = undefined;
                this._availableValues.yPp = undefined;
            }
        };
        /**
         * Set cursor informations
         *
         * @private
         * @param {*} cursorInfo
         * @memberof FFtCursorSignal
         */
        FFTCursorSignal.prototype.setCursorInfo = function (cursorInfo) {
            var value = this._availableValues[cursorInfo.id];
            if (value == undefined) {
                value = InfoValues.undefinedText;
            }
            cursorInfo.value = value;
        };
        FFTCursorSignal.prototype.getSignalInfosFromCursorWindow = function (cursorMinXValue, cursorMaxXValue, defaultYValue) {
            var ySelectedValues = [];
            for (var counter = 0; counter < this._serie.rawPoints.length; counter++) {
                if (this._serie.rawPoints[counter].x >= cursorMinXValue && this._serie.rawPoints[counter].x <= cursorMaxXValue) {
                    ySelectedValues.push(this._serie.rawPoints[counter].y);
                }
            }
            this._sum.data = ySelectedValues;
            this._rms.data = ySelectedValues;
            this._mean.data = ySelectedValues;
            this._std.data = ySelectedValues;
            this._max.data = ySelectedValues;
            this._min.data = ySelectedValues;
            var mean = this._mean.calculate();
            this._std.mean = mean;
            var yStd = this._std.calculate();
            this._var.data = yStd;
            return {
                ySum: this._sum.calculate(),
                yRms: this._rms.calculate(),
                yMinimum: this._min.calculate(),
                yMaximum: this._max.calculate(),
                yMean: mean,
                yStD: yStd,
                yVar: this._var.calculate()
            };
        };
        /**
         * provides all available cursor infos
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof FFtCursorSignal
         */
        FFTCursorSignal.prototype.getAllCursorInfo = function () {
            return this._cursorSignalDescriptor.getAllCursorInfo();
        };
        return FFTCursorSignal;
    }(cursorSignal_1.CursorSignal));
    exports.FFTCursorSignal = FFTCursorSignal;
    var InfoValues = /** @class */ (function () {
        function InfoValues() {
            this.y1 = InfoValues.undefinedText;
            this.y2 = InfoValues.undefinedText;
            this.f1 = InfoValues.undefinedText;
            this.f2 = InfoValues.undefinedText;
            this.yDiff = InfoValues.undefinedText;
            this.fDiff = InfoValues.undefinedText;
            this.yMean = InfoValues.undefinedText;
            this.yStD = InfoValues.undefinedText;
            this.yVar = InfoValues.undefinedText;
            this.yRms = InfoValues.undefinedText;
            this.yMinimum = InfoValues.undefinedText;
            this.yMaximum = InfoValues.undefinedText;
            this.yPp = InfoValues.undefinedText;
        }
        InfoValues.undefinedText = "";
        return InfoValues;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Q3Vyc29yU2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvZmZ0Q3Vyc29yU2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlQTtRQUFxQyxtQ0FBWTtRQVk3Qzs7OztXQUlHO1FBQ0gseUJBQVksS0FBaUIsRUFBRSxXQUFvQixFQUFFLFVBQW1DO1lBQXhGLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLFdBQVcsQ0FBQyxTQUk1QjtZQXBCRCwrREFBK0Q7WUFDdkQsc0JBQWdCLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNoRCxVQUFJLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztZQUNqQixVQUFJLEdBQUcsSUFBSSxvQkFBYyxFQUFFLENBQUM7WUFDNUIsV0FBSyxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDbkIsVUFBSSxHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUMvQixVQUFJLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDdEIsVUFBSSxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDakIsVUFBSSxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFVckIsMENBQTBDO1lBQzFDLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHFEQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDOztRQUM3RSxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxzQ0FBWSxHQUFuQixVQUFvQixXQUFtQixFQUFFLFdBQW1CLEVBQUUsS0FBYSxFQUFFLEtBQWE7WUFBMUYsaUJBTUM7WUFMRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMs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VSxDQUFDLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxDQUFDO1FBaEJzQix3QkFBYSxHQUFXLEVBQUUsQ0FBQztRQWlCdEQsaUJBQUM7S0FBQSxBQWpDRCxJQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU3VtIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvc3VtJztcclxuaW1wb3J0IHsgTWVhbiB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL21lYW4nO1xyXG5pbXBvcnQgeyBTdGFuZGFyZERldmlhdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL3N0YW5kYXJkRGV2aWF0aW9uJztcclxuaW1wb3J0IHsgVmFyaWFuY2UgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbWF0aC92YXJpYW5jZSc7XHJcbmltcG9ydCB7IE1pbiB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL21pbic7XHJcbmltcG9ydCB7IE1heCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL21heCc7XHJcbmltcG9ydCB7IFJvb3RNZWFuU3F1YXJlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tYXRoL3Jtc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vY3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MgfSBmcm9tIFwiLi9keW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgRkZUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvciB9IGZyb20gXCIuL2ZmdEN1cnNvclNpZ25hbERlc2NyaXB0b3JcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mbyB9IGZyb20gXCIuL2N1cnNvckluZm9cIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mb1Zpc2liaWxpdHkgfSBmcm9tIFwiLi9jdXJzb3JJbmZvVmlzaWJpbGl0eVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZGVEN1cnNvclNpZ25hbCBleHRlbmRzIEN1cnNvclNpZ25hbHtcclxuXHJcbiAgICAvLyByZXByZXNlbnRzIGFsbCBhdmFpbGFibGUgdmFsdWVzIGZvciB0aGUgYWN0dWFsIGdpdmVuIGN1cnNvcnNcclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZVZhbHVlczogSW5mb1ZhbHVlcyA9IG5ldyBJbmZvVmFsdWVzKCk7XHJcbiAgICBwcml2YXRlIF9zdW0gPSBuZXcgU3VtKCk7XHJcbiAgICBwcml2YXRlIF9ybXMgPSBuZXcgUm9vdE1lYW5TcXVhcmUoKTtcclxuICAgIHByaXZhdGUgX21lYW4gPSBuZXcgTWVhbigpO1xyXG4gICAgcHJpdmF0ZSBfc3RkID0gbmV3IFN0YW5kYXJkRGV2aWF0aW9uKCk7XHJcbiAgICBwcml2YXRlIF92YXIgPSBuZXcgVmFyaWFuY2UoKTtcclxuICAgIHByaXZhdGUgX21pbiA9IG5ldyBNaW4oKTtcclxuICAgIHByaXZhdGUgX21heCA9IG5ldyBNYXgoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRkZ0Q3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgRkZ0Q3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlcmllOiBCYXNlU2VyaWVzLCBleHBhbmRTdGF0ZTogYm9vbGVhbiwgY3Vyc29ySW5mbz86IEN1cnNvckluZm9WaXNpYmlsaXR5W10pe1xyXG4gICAgICAgIHN1cGVyKHNlcmllLCBleHBhbmRTdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzcGVjaWZpYyBjdXJzb3Igc2lnbmFsIGRlc3JpcHRvclxyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbERlc2NyaXB0b3IgPSBuZXcgRkZUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcihjdXJzb3JJbmZvKTsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3IgdmFsdWUgaW5mb3JtYXRpb25zIGZvciB0aGUgZ2l2ZW4gY3Vyc29yc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBjdXJzb3JEYXRhMVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IGN1cnNvckRhdGEyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZTFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lMlxyXG4gICAgICogQG1lbWJlcm9mIEZGdEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVmFsdWVzKGN1cnNvckRhdGExOiBJUG9pbnQsIGN1cnNvckRhdGEyOiBJUG9pbnQsIHRpbWUxOiBudW1iZXIsIHRpbWUyOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2ltcGxlVmFsdWVzKGN1cnNvckRhdGExLCBjdXJzb3JEYXRhMiwgdGltZTEsIHRpbWUyKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZXMoY3Vyc29yRGF0YTEsIGN1cnNvckRhdGEyKTtcclxuICAgICAgICB0aGlzLmN1cnNvckluZm9zLmZvckVhY2goY3Vyc29ySW5mbyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29ySW5mbyhjdXJzb3JJbmZvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlU2ltcGxlVmFsdWVzKGN1cnNvcjFEYXRhOiBJUG9pbnQsIGN1cnNvcjJEYXRhOiBJUG9pbnQsIHRpbWUxOiBudW1iZXIsIHRpbWUyOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGN1cnNvcjFEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IxRGF0YS55ICE9IHVuZGVmaW5lZCAmJiB0aW1lMSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgY3Vyc29yIDEgaW5mb3NcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkxID0gY3Vyc29yMURhdGEueS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy5mMSA9IGN1cnNvcjFEYXRhLngudG9QcmVjaXNpb24oNik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLmYxID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJzb3IyRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMkRhdGEueSAhPSB1bmRlZmluZWQgJiYgdGltZTIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGN1cnNvciAxIGluZm9zXHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MiA9IGN1cnNvcjJEYXRhLnkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMuZjIgPSBjdXJzb3IyRGF0YS54LnRvUHJlY2lzaW9uKDYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy5mMiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDYWxjdWxhdGVkVmFsdWVzKGN1cnNvcjFEYXRhOiBJUG9pbnQsIGN1cnNvcjJEYXRhOiBJUG9pbnQpe1xyXG4gICAgICAgIGlmKGN1cnNvcjFEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IxRGF0YS55ICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IyRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMkRhdGEueSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yTWluWFZhbHVlID0gY3Vyc29yMURhdGEueDtcclxuICAgICAgICAgICAgbGV0IGN1cnNvck1heFhWYWx1ZSA9IGN1cnNvcjJEYXRhLng7XHJcbiAgICAgICAgICAgIGlmKGN1cnNvck1pblhWYWx1ZSA+IGN1cnNvck1heFhWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgbWluIGFuZCBtYXggdmFsdWVcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wWFZhbHVlID0gY3Vyc29yTWF4WFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yTWF4WFZhbHVlID0gY3Vyc29yTWluWFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yTWluWFZhbHVlID0gdGVtcFhWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNpZ25hbEluZm9zID0gdGhpcy5nZXRTaWduYWxJbmZvc0Zyb21DdXJzb3JXaW5kb3coY3Vyc29yTWluWFZhbHVlLCBjdXJzb3JNYXhYVmFsdWUsIGN1cnNvcjFEYXRhLnkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlEaWZmID0gKGN1cnNvcjJEYXRhLnktY3Vyc29yMURhdGEueSkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMuZkRpZmYgPSAoY3Vyc29yMkRhdGEueC1jdXJzb3IxRGF0YS54KS50b1ByZWNpc2lvbig2KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlNZWFuID0gc2lnbmFsSW5mb3MueU1lYW4udG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVN0RCA9IHNpZ25hbEluZm9zLnlTdEQudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVZhciA9IHNpZ25hbEluZm9zLnlWYXIudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVJtcyA9IHNpZ25hbEluZm9zLnlSbXMudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueU1pbmltdW0gPSBzaWduYWxJbmZvcy55TWluaW11bS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55TWF4aW11bSA9IHNpZ25hbEluZm9zLnlNYXhpbXVtLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlQcCA9IChzaWduYWxJbmZvcy55TWF4aW11bSAtIHNpZ25hbEluZm9zLnlNaW5pbXVtKS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55RGlmZiA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMuZkRpZmYgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55TWVhbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlTdEQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55VmFyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVJtcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlNaW5pbXVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueU1heGltdW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55UHAgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGN1cnNvciBpbmZvcm1hdGlvbnNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY3Vyc29ySW5mb1xyXG4gICAgICogQG1lbWJlcm9mIEZGdEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvckluZm8oY3Vyc29ySW5mbzogQ3Vyc29ySW5mbyl7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fYXZhaWxhYmxlVmFsdWVzW2N1cnNvckluZm8uaWRdO1xyXG4gICAgICAgIGlmKHZhbHVlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJzb3JJbmZvLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwcml2YXRlIGdldFNpZ25hbEluZm9zRnJvbUN1cnNvcldpbmRvdyhjdXJzb3JNaW5YVmFsdWU6IG51bWJlciwgY3Vyc29yTWF4WFZhbHVlOiBudW1iZXIsIGRlZmF1bHRZVmFsdWUpOiBhbnl7XHJcbiAgICAgICAgbGV0IHlTZWxlY3RlZFZhbHVlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgY291bnRlciA9IDA7IGNvdW50ZXIgPCB0aGlzLl9zZXJpZS5yYXdQb2ludHMubGVuZ3RoOyBjb3VudGVyKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zZXJpZS5yYXdQb2ludHNbY291bnRlcl0ueCA+PSBjdXJzb3JNaW5YVmFsdWUgJiYgdGhpcy5fc2VyaWUucmF3UG9pbnRzW2NvdW50ZXJdLnggPD0gY3Vyc29yTWF4WFZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHlTZWxlY3RlZFZhbHVlcy5wdXNoKHRoaXMuX3NlcmllLnJhd1BvaW50c1tjb3VudGVyXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdW0uZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9ybXMuZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9tZWFuLmRhdGEgPSB5U2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgdGhpcy5fc3RkLmRhdGEgPSB5U2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgdGhpcy5fbWF4LmRhdGEgPSB5U2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgdGhpcy5fbWluLmRhdGEgPSB5U2VsZWN0ZWRWYWx1ZXM7XHJcblxyXG4gICAgICAgIGxldCBtZWFuID0gdGhpcy5fbWVhbi5jYWxjdWxhdGUoKTtcclxuICAgICAgICB0aGlzLl9zdGQubWVhbiA9IG1lYW47XHJcbiAgICAgICAgbGV0IHlTdGQgPSB0aGlzLl9zdGQuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fdmFyLmRhdGEgPSB5U3RkO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB5U3VtOiB0aGlzLl9zdW0uY2FsY3VsYXRlKCksIFxyXG4gICAgICAgICAgICB5Um1zOiB0aGlzLl9ybXMuY2FsY3VsYXRlKCksXHJcbiAgICAgICAgICAgIHlNaW5pbXVtOiB0aGlzLl9taW4uY2FsY3VsYXRlKCksIFxyXG4gICAgICAgICAgICB5TWF4aW11bTogdGhpcy5fbWF4LmNhbGN1bGF0ZSgpLFxyXG4gICAgICAgICAgICB5TWVhbjogbWVhbixcclxuICAgICAgICAgICAgeVN0RDogeVN0ZCwgXHJcbiAgICAgICAgICAgIHlWYXI6IHRoaXMuX3Zhci5jYWxjdWxhdGUoKX07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwcm92aWRlcyBhbGwgYXZhaWxhYmxlIGN1cnNvciBpbmZvc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPn1cclxuICAgICAqIEBtZW1iZXJvZiBGRnRDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFsbEN1cnNvckluZm8gKCk6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFsRGVzY3JpcHRvci5nZXRBbGxDdXJzb3JJbmZvKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEluZm9WYWx1ZXN7XHJcbiAgICAvLyBUaGlzIHByb3BlcnRpZXMgbXVzdCBoYXZlIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGlkcyBkZWZpbmVkIGluIHRoZSBDdXJzb3JTaWduYWwgY2xhc3MgKGUuZy4gY3Vyc29ySW5mb0lkX3kxID0gXCJ5MVwiOylcclxuICAgIHB1YmxpYyB5MTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5Mjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBmMTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBmMjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5RGlmZjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBmRGlmZjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5TWVhbjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5U3REOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlWYXI6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeVJtczogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5TWluaW11bTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5TWF4aW11bTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5UHA6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB1bmRlZmluZWRUZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy55MSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnkyID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMuZjEgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy5mMiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlEaWZmID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMuZkRpZmYgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55TWVhbiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlTdEQgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55VmFyID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueVJtcyA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlNaW5pbXVtID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueU1heGltdW0gPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55UHAgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICB9XHJcbn0iXX0=
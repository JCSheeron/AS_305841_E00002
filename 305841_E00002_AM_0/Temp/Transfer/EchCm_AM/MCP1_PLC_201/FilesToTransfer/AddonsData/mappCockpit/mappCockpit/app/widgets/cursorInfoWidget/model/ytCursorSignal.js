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
define(["require", "exports", "./ytCursorSignalDescriptor", "../../../common/math/sum", "../../../common/math/mean", "../../../common/math/standardDeviation", "../../../common/math/variance", "../../../common/math/min", "../../../common/math/max", "../../../common/math/rms", "./cursorSignal"], function (require, exports, ytCursorSignalDescriptor_1, sum_1, mean_1, standardDeviation_1, variance_1, min_1, max_1, rms_1, cursorSignal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTCursorSignal = /** @class */ (function (_super) {
        __extends(YTCursorSignal, _super);
        /**
         * Creates an instance of YTCursorSignal
         * @param {BaseSeries} serie
         * @memberof YTCursorSignal
         */
        function YTCursorSignal(serie, expandState, cursorInfo) {
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
            // create specific cursor signal descriptor
            _this._cursorSignalDescriptor = new ytCursorSignalDescriptor_1.YTCursorSignalDescriptor(cursorInfo);
            return _this;
        }
        /**
         * Updates the cursor value informations for the given cursors
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof YTCursorSignal
         */
        YTCursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
            var _this = this;
            this.updateSimpleValues(cursorData1, cursorData2, time1, time2);
            this.updateCalculatedValues(cursorData1, cursorData2);
            this.cursorInfos.forEach(function (cursorInfo) {
                _this.setCursorInfo(cursorInfo);
            });
        };
        YTCursorSignal.prototype.updateSimpleValues = function (cursor1Data, cursor2Data, time1, time2) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && time1 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y1 = cursor1Data.y.toPrecision(17);
                this._availableValues.t1 = cursor1Data.x.toPrecision(6);
            }
            else {
                this._availableValues.y1 = undefined;
                this._availableValues.t1 = undefined;
            }
            if (cursor2Data != undefined && cursor2Data.y != undefined && time2 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y2 = cursor2Data.y.toPrecision(17);
                this._availableValues.t2 = cursor2Data.x.toPrecision(6);
            }
            else {
                this._availableValues.y2 = undefined;
                this._availableValues.t2 = undefined;
            }
        };
        YTCursorSignal.prototype.updateCalculatedValues = function (cursor1Data, cursor2Data) {
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
                this._availableValues.tDiff = (cursor2Data.x - cursor1Data.x).toPrecision(6);
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
                this._availableValues.tDiff = undefined;
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
         * @memberof YTCursorSignal
         */
        YTCursorSignal.prototype.setCursorInfo = function (cursorInfo) {
            var value = this._availableValues[cursorInfo.id];
            if (value == undefined) {
                value = InfoValues.undefinedText;
            }
            cursorInfo.value = value;
        };
        YTCursorSignal.prototype.getSignalInfosFromCursorWindow = function (cursorMinXValue, cursorMaxXValue, defaultYValue) {
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
         * @memberof YTCursorSignal
         */
        YTCursorSignal.prototype.getAllCursorInfo = function () {
            return this._cursorSignalDescriptor.getAllCursorInfo();
        };
        return YTCursorSignal;
    }(cursorSignal_1.CursorSignal));
    exports.YTCursorSignal = YTCursorSignal;
    var InfoValues = /** @class */ (function () {
        function InfoValues() {
            this.y1 = InfoValues.undefinedText;
            this.y2 = InfoValues.undefinedText;
            this.t1 = InfoValues.undefinedText;
            this.t2 = InfoValues.undefinedText;
            this.yDiff = InfoValues.undefinedText;
            this.tDiff = InfoValues.undefinedText;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXRDdXJzb3JTaWduYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY3Vyc29ySW5mb1dpZGdldC9tb2RlbC95dEN1cnNvclNpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBZUE7UUFBb0Msa0NBQVk7UUFZNUM7Ozs7V0FJRztRQUNILHdCQUFZLEtBQWlCLEVBQUUsV0FBb0IsRUFBRSxVQUFtQztZQUF4RixZQUNJLGtCQUFNLEtBQUssRUFBRSxXQUFXLENBQUMsU0FJNUI7WUFwQkQsK0RBQStEO1lBQ3ZELHNCQUFnQixHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEQsVUFBSSxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDakIsVUFBSSxHQUFHLElBQUksb0JBQWMsRUFBRSxDQUFDO1lBQzVCLFdBQUssR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ25CLFVBQUksR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDL0IsVUFBSSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQ3RCLFVBQUksR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO1lBQ2pCLFVBQUksR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO1lBVXJCLDJDQUEyQztZQUMzQyxLQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxtREFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFDNUUsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0kscUNBQVksR0FBbkIsVUFBb0IsV0FBbUIsRUFBRSxXQUFtQixFQUFFLEtBQWEsRUFBRSxLQUFhO1lBQTFGLGlCQU1DO1lBTEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENB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Q0FBQyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN6QyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDeEMsQ0FBQztRQWhCc0Isd0JBQWEsR0FBVyxFQUFFLENBQUM7UUFpQnRELGlCQUFDO0tBQUEsQUFqQ0QsSUFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFlUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvciB9IGZyb20gXCIuL3l0Q3Vyc29yU2lnbmFsRGVzY3JpcHRvclwiO1xyXG5pbXBvcnQgeyBTdW0gfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbWF0aC9zdW0nO1xyXG5pbXBvcnQgeyBNZWFuIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvbWVhbic7XHJcbmltcG9ydCB7IFN0YW5kYXJkRGV2aWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvc3RhbmRhcmREZXZpYXRpb24nO1xyXG5pbXBvcnQgeyBWYXJpYW5jZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL3ZhcmlhbmNlJztcclxuaW1wb3J0IHsgTWluIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvbWluJztcclxuaW1wb3J0IHsgTWF4IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvbWF4JztcclxuaW1wb3J0IHsgUm9vdE1lYW5TcXVhcmUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21hdGgvcm1zXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyB9IGZyb20gXCIuL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvIH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVmlzaWJpbGl0eSB9IGZyb20gXCIuL2N1cnNvckluZm9WaXNpYmlsaXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWVRDdXJzb3JTaWduYWwgZXh0ZW5kcyBDdXJzb3JTaWduYWx7XHJcblxyXG4gICAgLy8gcmVwcmVzZW50cyBhbGwgYXZhaWxhYmxlIHZhbHVlcyBmb3IgdGhlIGFjdHVhbCBnaXZlbiBjdXJzb3JzXHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVWYWx1ZXM6IEluZm9WYWx1ZXMgPSBuZXcgSW5mb1ZhbHVlcygpO1xyXG4gICAgcHJpdmF0ZSBfc3VtID0gbmV3IFN1bSgpO1xyXG4gICAgcHJpdmF0ZSBfcm1zID0gbmV3IFJvb3RNZWFuU3F1YXJlKCk7XHJcbiAgICBwcml2YXRlIF9tZWFuID0gbmV3IE1lYW4oKTtcclxuICAgIHByaXZhdGUgX3N0ZCA9IG5ldyBTdGFuZGFyZERldmlhdGlvbigpO1xyXG4gICAgcHJpdmF0ZSBfdmFyID0gbmV3IFZhcmlhbmNlKCk7XHJcbiAgICBwcml2YXRlIF9taW4gPSBuZXcgTWluKCk7XHJcbiAgICBwcml2YXRlIF9tYXggPSBuZXcgTWF4KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFlUQ3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VyaWU6IEJhc2VTZXJpZXMsIGV4cGFuZFN0YXRlOiBib29sZWFuLCBjdXJzb3JJbmZvPzogQ3Vyc29ySW5mb1Zpc2liaWxpdHlbXSl7XHJcbiAgICAgICAgc3VwZXIoc2VyaWUsIGV4cGFuZFN0YXRlKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHNwZWNpZmljIGN1cnNvciBzaWduYWwgZGVzY3JpcHRvclxyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbERlc2NyaXB0b3IgPSBuZXcgWVRDdXJzb3JTaWduYWxEZXNjcmlwdG9yKGN1cnNvckluZm8pOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciB2YWx1ZSBpbmZvcm1hdGlvbnMgZm9yIHRoZSBnaXZlbiBjdXJzb3JzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IGN1cnNvckRhdGExXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gY3Vyc29yRGF0YTJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lMVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUyXHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVZhbHVlcyhjdXJzb3JEYXRhMTogSVBvaW50LCBjdXJzb3JEYXRhMjogSVBvaW50LCB0aW1lMTogbnVtYmVyLCB0aW1lMjogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNpbXBsZVZhbHVlcyhjdXJzb3JEYXRhMSwgY3Vyc29yRGF0YTIsIHRpbWUxLCB0aW1lMik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxjdWxhdGVkVmFsdWVzKGN1cnNvckRhdGExLCBjdXJzb3JEYXRhMik7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JJbmZvcy5mb3JFYWNoKGN1cnNvckluZm8gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnNvckluZm8oY3Vyc29ySW5mbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNpbXBsZVZhbHVlcyhjdXJzb3IxRGF0YTogSVBvaW50LCBjdXJzb3IyRGF0YTogSVBvaW50LCB0aW1lMTogbnVtYmVyLCB0aW1lMjogbnVtYmVyKXtcclxuICAgICAgICBpZihjdXJzb3IxRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMURhdGEueSAhPSB1bmRlZmluZWQgJiYgdGltZTEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGN1cnNvciAxIGluZm9zXHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MSA9IGN1cnNvcjFEYXRhLnkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudDEgPSBjdXJzb3IxRGF0YS54LnRvUHJlY2lzaW9uKDYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50MSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3Vyc29yMkRhdGEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjJEYXRhLnkgIT0gdW5kZWZpbmVkICYmIHRpbWUyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjdXJzb3IgMSBpbmZvc1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTIgPSBjdXJzb3IyRGF0YS55LnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnQyID0gY3Vyc29yMkRhdGEueC50b1ByZWNpc2lvbig2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudDIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQ2FsY3VsYXRlZFZhbHVlcyhjdXJzb3IxRGF0YTogSVBvaW50LCBjdXJzb3IyRGF0YTogSVBvaW50KXtcclxuICAgICAgICBpZihjdXJzb3IxRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMURhdGEueSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMkRhdGEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjJEYXRhLnkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGN1cnNvck1pblhWYWx1ZSA9IGN1cnNvcjFEYXRhLng7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JNYXhYVmFsdWUgPSBjdXJzb3IyRGF0YS54O1xyXG4gICAgICAgICAgICBpZihjdXJzb3JNaW5YVmFsdWUgPiBjdXJzb3JNYXhYVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlIG1pbiBhbmQgbWF4IHZhbHVlXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcFhWYWx1ZSA9IGN1cnNvck1heFhWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGN1cnNvck1heFhWYWx1ZSA9IGN1cnNvck1pblhWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGN1cnNvck1pblhWYWx1ZSA9IHRlbXBYVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzaWduYWxJbmZvcyA9IHRoaXMuZ2V0U2lnbmFsSW5mb3NGcm9tQ3Vyc29yV2luZG93KGN1cnNvck1pblhWYWx1ZSwgY3Vyc29yTWF4WFZhbHVlLCBjdXJzb3IxRGF0YS55KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55RGlmZiA9IChjdXJzb3IyRGF0YS55LWN1cnNvcjFEYXRhLnkpLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnREaWZmID0gKGN1cnNvcjJEYXRhLngtY3Vyc29yMURhdGEueCkudG9QcmVjaXNpb24oNik7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55TWVhbiA9IHNpZ25hbEluZm9zLnlNZWFuLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlTdEQgPSBzaWduYWxJbmZvcy55U3RELnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlWYXIgPSBzaWduYWxJbmZvcy55VmFyLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlSbXMgPSBzaWduYWxJbmZvcy55Um1zLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlNaW5pbXVtID0gc2lnbmFsSW5mb3MueU1pbmltdW0udG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueU1heGltdW0gPSBzaWduYWxJbmZvcy55TWF4aW11bS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55UHAgPSAoc2lnbmFsSW5mb3MueU1heGltdW0gLSBzaWduYWxJbmZvcy55TWluaW11bSkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueURpZmYgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnREaWZmID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueU1lYW4gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55U3REID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVZhciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlSbXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55TWluaW11bSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlNYXhpbXVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVBwID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBjdXJzb3IgaW5mb3JtYXRpb25zXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnNvckluZm9cclxuICAgICAqIEBtZW1iZXJvZiBZVEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvckluZm8oY3Vyc29ySW5mbzogQ3Vyc29ySW5mbyl7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fYXZhaWxhYmxlVmFsdWVzW2N1cnNvckluZm8uaWRdO1xyXG4gICAgICAgIGlmKHZhbHVlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJzb3JJbmZvLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwcml2YXRlIGdldFNpZ25hbEluZm9zRnJvbUN1cnNvcldpbmRvdyhjdXJzb3JNaW5YVmFsdWU6IG51bWJlciwgY3Vyc29yTWF4WFZhbHVlOiBudW1iZXIsIGRlZmF1bHRZVmFsdWUpOiBhbnl7XHJcbiAgICAgICAgbGV0IHlTZWxlY3RlZFZhbHVlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgY291bnRlciA9IDA7IGNvdW50ZXIgPCB0aGlzLl9zZXJpZS5yYXdQb2ludHMubGVuZ3RoOyBjb3VudGVyKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zZXJpZS5yYXdQb2ludHNbY291bnRlcl0ueCA+PSBjdXJzb3JNaW5YVmFsdWUgJiYgdGhpcy5fc2VyaWUucmF3UG9pbnRzW2NvdW50ZXJdLnggPD0gY3Vyc29yTWF4WFZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHlTZWxlY3RlZFZhbHVlcy5wdXNoKHRoaXMuX3NlcmllLnJhd1BvaW50c1tjb3VudGVyXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdW0uZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9ybXMuZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9tZWFuLmRhdGEgPSB5U2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgdGhpcy5fc3RkLmRhdGEgPSB5U2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgdGhpcy5fbWF4LmRhdGEgPSB5U2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgdGhpcy5fbWluLmRhdGEgPSB5U2VsZWN0ZWRWYWx1ZXM7XHJcblxyXG4gICAgICAgIGxldCBtZWFuID0gdGhpcy5fbWVhbi5jYWxjdWxhdGUoKTtcclxuICAgICAgICB0aGlzLl9zdGQubWVhbiA9IG1lYW47XHJcbiAgICAgICAgbGV0IHlTdGQgPSB0aGlzLl9zdGQuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fdmFyLmRhdGEgPSB5U3RkO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB5U3VtOiB0aGlzLl9zdW0uY2FsY3VsYXRlKCksIFxyXG4gICAgICAgICAgICB5Um1zOiB0aGlzLl9ybXMuY2FsY3VsYXRlKCksXHJcbiAgICAgICAgICAgIHlNaW5pbXVtOiB0aGlzLl9taW4uY2FsY3VsYXRlKCksIFxyXG4gICAgICAgICAgICB5TWF4aW11bTogdGhpcy5fbWF4LmNhbGN1bGF0ZSgpLFxyXG4gICAgICAgICAgICB5TWVhbjogbWVhbixcclxuICAgICAgICAgICAgeVN0RDogeVN0ZCwgXHJcbiAgICAgICAgICAgIHlWYXI6IHRoaXMuX3Zhci5jYWxjdWxhdGUoKX07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwcm92aWRlcyBhbGwgYXZhaWxhYmxlIGN1cnNvciBpbmZvc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPn1cclxuICAgICAqIEBtZW1iZXJvZiBZVEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsQ3Vyc29ySW5mbyAoKTogQXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTaWduYWxEZXNjcmlwdG9yLmdldEFsbEN1cnNvckluZm8oKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSW5mb1ZhbHVlc3tcclxuICAgIC8vIFRoaXMgcHJvcGVydGllcyBtdXN0IGhhdmUgdGhlIHNhbWUgbmFtZSBhcyB0aGUgaWRzIGRlZmluZWQgaW4gdGhlIEN1cnNvclNpZ25hbCBjbGFzcyAoZS5nLiBjdXJzb3JJbmZvSWRfeTEgPSBcInkxXCI7KVxyXG4gICAgcHVibGljIHkxOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHkyOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHQxOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHQyOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlEaWZmOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHREaWZmOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlNZWFuOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlTdEQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeVZhcjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5Um1zOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlNaW5pbXVtOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlNYXhpbXVtOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlQcDogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHVuZGVmaW5lZFRleHQ6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnkxID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueTIgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy50MSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnQyID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueURpZmYgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy50RGlmZiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlNZWFuID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueVN0RCA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlWYXIgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55Um1zID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueU1pbmltdW0gPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55TWF4aW11bSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlQcCA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgIH1cclxufSJdfQ==
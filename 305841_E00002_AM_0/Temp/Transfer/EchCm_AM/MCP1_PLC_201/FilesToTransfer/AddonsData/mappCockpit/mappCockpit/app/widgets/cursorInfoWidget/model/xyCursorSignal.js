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
define(["require", "exports", "./xyCursorSignalDescriptor", "./cursorSignal"], function (require, exports, xyCursorSignalDescriptor_1, cursorSignal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYCursorSignal = /** @class */ (function (_super) {
        __extends(XYCursorSignal, _super);
        /**
         * Creates an instance of XYCursorSignal
         * @param {BaseSeries} serie
         * @memberof XYCursorSignal
         */
        function XYCursorSignal(serie, expandState, cursorInfo) {
            var _this = _super.call(this, serie, expandState) || this;
            // represents all available values for the actual given cursors
            _this._availableValues = new InfoValues();
            // create specific cursor signal desriptor
            _this._cursorSignalDescriptor = new xyCursorSignalDescriptor_1.XYCursorSignalDescriptor(cursorInfo);
            return _this;
        }
        /**
         * Updates the cursor value informations for the given cursors
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof XYCursorSignal
         */
        XYCursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
            var _this = this;
            this.updateSimpleValues(cursorData1, cursorData2, time1, time2);
            this.updateCalculatedValues(cursorData1, cursorData2, time1, time2);
            this.cursorInfos.forEach(function (cursorInfo) {
                _this.setCursorInfo(cursorInfo);
            });
        };
        XYCursorSignal.prototype.updateSimpleValues = function (cursor1Data, cursor2Data, time1, time2) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && time1 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y1 = cursor1Data.y.toPrecision(17);
                this._availableValues.x1 = cursor1Data.x.toPrecision(17);
                this._availableValues.t1 = time1.toPrecision(6);
            }
            else {
                this._availableValues.y1 = undefined;
                this._availableValues.x1 = undefined;
                this._availableValues.t1 = undefined;
            }
            if (cursor2Data != undefined && cursor2Data.y != undefined && time2 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y2 = cursor2Data.y.toPrecision(17);
                this._availableValues.x2 = cursor2Data.x.toPrecision(17);
                this._availableValues.t2 = time2.toPrecision(6);
            }
            else {
                this._availableValues.y2 = undefined;
                this._availableValues.x2 = undefined;
                this._availableValues.t2 = undefined;
            }
        };
        XYCursorSignal.prototype.updateCalculatedValues = function (cursor1Data, cursor2Data, time1, time2) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && time1 != undefined && cursor2Data != undefined && cursor2Data.y != undefined && time2 != undefined) {
                var cursorMinXValue = cursor1Data.x;
                var cursorMaxXValue = cursor2Data.x;
                if (cursorMinXValue > cursorMaxXValue) {
                    // Change min and max value
                    var tempXValue = cursorMaxXValue;
                    cursorMaxXValue = cursorMinXValue;
                    cursorMinXValue = tempXValue;
                }
                this._availableValues.yDiff = (cursor2Data.y - cursor1Data.y).toPrecision(17);
                this._availableValues.xDiff = (cursor2Data.x - cursor1Data.x).toPrecision(17);
                this._availableValues.tDiff = (time2 - time1).toPrecision(6);
                this._availableValues.eucDist = (Math.sqrt(Math.pow(cursor2Data.x - cursor1Data.x, 2) + Math.pow(cursor2Data.y - cursor1Data.y, 2))).toPrecision(17);
            }
            else {
                this._availableValues.yDiff = undefined;
                this._availableValues.tDiff = undefined;
                this._availableValues.xDiff = undefined;
            }
        };
        /**
         * Set cursor informations
         *
         * @private
         * @param {*} cursorInfo
         * @memberof XYCursorSignal
         */
        XYCursorSignal.prototype.setCursorInfo = function (cursorInfo) {
            var value = this._availableValues[cursorInfo.id];
            if (value == undefined) {
                value = InfoValues.undefinedText;
            }
            cursorInfo.value = value;
        };
        /**
         * provides all available cursor infos
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof XYCursorSignal
         */
        XYCursorSignal.prototype.getAllCursorInfo = function () {
            return this._cursorSignalDescriptor.getAllCursorInfo();
        };
        return XYCursorSignal;
    }(cursorSignal_1.CursorSignal));
    exports.XYCursorSignal = XYCursorSignal;
    var InfoValues = /** @class */ (function () {
        function InfoValues() {
            this.y1 = InfoValues.undefinedText;
            this.y2 = InfoValues.undefinedText;
            this.x1 = InfoValues.undefinedText;
            this.x2 = InfoValues.undefinedText;
            this.t1 = InfoValues.undefinedText;
            this.t2 = InfoValues.undefinedText;
            this.yDiff = InfoValues.undefinedText;
            this.tDiff = InfoValues.undefinedText;
            this.xDiff = InfoValues.undefinedText;
            this.eucDist = InfoValues.undefinedText;
        }
        InfoValues.undefinedText = "";
        return InfoValues;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlDdXJzb3JTaWduYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY3Vyc29ySW5mb1dpZGdldC9tb2RlbC94eUN1cnNvclNpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBb0Msa0NBQVk7UUFLNUM7Ozs7V0FJRztRQUNILHdCQUFZLEtBQWlCLEVBQUUsV0FBb0IsRUFBRSxVQUFtQztZQUF4RixZQUNJLGtCQUFNLEtBQUssRUFBRSxXQUFXLENBQUMsU0FJNUI7WUFiRCwrREFBK0Q7WUFDdkQsc0JBQWdCLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQVVwRCwwQ0FBMEM7WUFDMUMsS0FBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksbURBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7O1FBQzVFLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLHFDQUFZLEdBQW5CLFVBQW9CLFdBQW1CLEVBQUUsV0FBbUIsRUFBRSxLQUFhLEVBQUUsS0FBYTtZQUExRixpQkFNQztZQUxHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2dCQUMvQixLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUdPLDJDQUFrQixHQUExQixVQUEyQixXQUFtQixFQUFFLFdBQW1CLEVBQUUsS0FBYSxFQUFFLEtBQWE7WUFDN0YsSUFBRyxXQUFXLElBQUksU0FBUyxJQUFJLFdBQVcsQ0FBQyxDQUFDLElBQUksU0FB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QUMsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzVDLENBQUM7UUFic0Isd0JBQWEsR0FBVyxFQUFFLENBQUM7UUFjdEQsaUJBQUM7S0FBQSxBQTNCRCxJQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yIH0gZnJvbSBcIi4veHlDdXJzb3JTaWduYWxEZXNjcmlwdG9yXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyB9IGZyb20gXCIuL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvIH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVmlzaWJpbGl0eSB9IGZyb20gXCIuL2N1cnNvckluZm9WaXNpYmlsaXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWFlDdXJzb3JTaWduYWwgZXh0ZW5kcyBDdXJzb3JTaWduYWx7XHJcblxyXG4gICAgLy8gcmVwcmVzZW50cyBhbGwgYXZhaWxhYmxlIHZhbHVlcyBmb3IgdGhlIGFjdHVhbCBnaXZlbiBjdXJzb3JzXHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVWYWx1ZXM6IEluZm9WYWx1ZXMgPSBuZXcgSW5mb1ZhbHVlcygpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWFlDdXJzb3JTaWduYWxcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBYWUN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJpZTogQmFzZVNlcmllcywgZXhwYW5kU3RhdGU6IGJvb2xlYW4sIGN1cnNvckluZm8/OiBDdXJzb3JJbmZvVmlzaWJpbGl0eVtdKXtcclxuICAgICAgICBzdXBlcihzZXJpZSwgZXhwYW5kU3RhdGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc3BlY2lmaWMgY3Vyc29yIHNpZ25hbCBkZXNyaXB0b3JcclxuICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxEZXNjcmlwdG9yID0gbmV3IFhZQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcihjdXJzb3JJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciB2YWx1ZSBpbmZvcm1hdGlvbnMgZm9yIHRoZSBnaXZlbiBjdXJzb3JzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IGN1cnNvckRhdGExXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gY3Vyc29yRGF0YTJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lMVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUyXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVZhbHVlcyhjdXJzb3JEYXRhMTogSVBvaW50LCBjdXJzb3JEYXRhMjogSVBvaW50LCB0aW1lMTogbnVtYmVyLCB0aW1lMjogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNpbXBsZVZhbHVlcyhjdXJzb3JEYXRhMSwgY3Vyc29yRGF0YTIsIHRpbWUxLCB0aW1lMik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxjdWxhdGVkVmFsdWVzKGN1cnNvckRhdGExLCBjdXJzb3JEYXRhMiwgdGltZTEsIHRpbWUyKTtcclxuICAgICAgICB0aGlzLmN1cnNvckluZm9zLmZvckVhY2goY3Vyc29ySW5mbyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29ySW5mbyhjdXJzb3JJbmZvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaW1wbGVWYWx1ZXMoY3Vyc29yMURhdGE6IElQb2ludCwgY3Vyc29yMkRhdGE6IElQb2ludCwgdGltZTE6IG51bWJlciwgdGltZTI6IG51bWJlcil7XHJcbiAgICAgICAgaWYoY3Vyc29yMURhdGEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjFEYXRhLnkgIT0gdW5kZWZpbmVkICYmIHRpbWUxICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjdXJzb3IgMSBpbmZvc1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTEgPSBjdXJzb3IxRGF0YS55LnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLngxID0gY3Vyc29yMURhdGEueC50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50MSA9IHRpbWUxLnRvUHJlY2lzaW9uKDYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy54MSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnQxID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJzb3IyRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMkRhdGEueSAhPSB1bmRlZmluZWQgJiYgdGltZTIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGN1cnNvciAxIGluZm9zXHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MiA9IGN1cnNvcjJEYXRhLnkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueDIgPSBjdXJzb3IyRGF0YS54LnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnQyID0gdGltZTIudG9QcmVjaXNpb24oNik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLngyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudDIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQ2FsY3VsYXRlZFZhbHVlcyhjdXJzb3IxRGF0YTogSVBvaW50LCBjdXJzb3IyRGF0YTogSVBvaW50LCB0aW1lMTogbnVtYmVyLCB0aW1lMjogbnVtYmVyKXtcclxuICAgICAgICBpZihjdXJzb3IxRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMURhdGEueSAhPSB1bmRlZmluZWQgJiYgdGltZTEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjJEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IyRGF0YS55ICE9IHVuZGVmaW5lZCAmJiB0aW1lMiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yTWluWFZhbHVlID0gY3Vyc29yMURhdGEueDtcclxuICAgICAgICAgICAgbGV0IGN1cnNvck1heFhWYWx1ZSA9IGN1cnNvcjJEYXRhLng7XHJcbiAgICAgICAgICAgIGlmKGN1cnNvck1pblhWYWx1ZSA+IGN1cnNvck1heFhWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgbWluIGFuZCBtYXggdmFsdWVcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wWFZhbHVlID0gY3Vyc29yTWF4WFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yTWF4WFZhbHVlID0gY3Vyc29yTWluWFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yTWluWFZhbHVlID0gdGVtcFhWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlEaWZmID0gKGN1cnNvcjJEYXRhLnktY3Vyc29yMURhdGEueSkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueERpZmYgPSAoY3Vyc29yMkRhdGEueC1jdXJzb3IxRGF0YS54KS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50RGlmZiA9ICh0aW1lMi10aW1lMSkudG9QcmVjaXNpb24oNik7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy5ldWNEaXN0ID0gKE1hdGguc3FydChNYXRoLnBvdyhjdXJzb3IyRGF0YS54IC0gY3Vyc29yMURhdGEueCwgMikgKyBNYXRoLnBvdyhjdXJzb3IyRGF0YS55IC0gY3Vyc29yMURhdGEueSwgMikgKSkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueURpZmYgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50RGlmZiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnhEaWZmID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBjdXJzb3IgaW5mb3JtYXRpb25zXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnNvckluZm9cclxuICAgICAqIEBtZW1iZXJvZiBYWUN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvckluZm8oY3Vyc29ySW5mbzogQ3Vyc29ySW5mbyl7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fYXZhaWxhYmxlVmFsdWVzW2N1cnNvckluZm8uaWRdO1xyXG4gICAgICAgIGlmKHZhbHVlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJzb3JJbmZvLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIGFsbCBhdmFpbGFibGUgY3Vyc29yIGluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+fVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxDdXJzb3JJbmZvICgpOiBBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclNpZ25hbERlc2NyaXB0b3IuZ2V0QWxsQ3Vyc29ySW5mbygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBJbmZvVmFsdWVze1xyXG4gICAgLy8gVGhpcyBwcm9wZXJ0aWVzIG11c3QgaGF2ZSB0aGUgc2FtZSBuYW1lIGFzIHRoZSBpZHMgZGVmaW5lZCBpbiB0aGUgQ3Vyc29yU2lnbmFsIGNsYXNzIChlLmcuIGN1cnNvckluZm9JZF95MSA9IFwieTFcIjspXHJcbiAgICBwdWJsaWMgeTE6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeTI6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgdDE6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgdDI6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeDE6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeDI6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeURpZmY6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgdERpZmY6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeERpZmY6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgZXVjRGlzdDogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHVuZGVmaW5lZFRleHQ6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnkxID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueTIgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy54MSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLngyID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMudDEgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy50MiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlEaWZmID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMudERpZmYgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy54RGlmZiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLmV1Y0Rpc3QgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICB9XHJcbn0iXX0=
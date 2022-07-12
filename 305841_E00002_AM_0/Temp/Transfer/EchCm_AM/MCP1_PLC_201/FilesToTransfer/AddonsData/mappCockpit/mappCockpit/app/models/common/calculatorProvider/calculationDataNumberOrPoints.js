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
define(["require", "exports", "./calculationData"], function (require, exports, calculationData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationDataNumberOrPoints = /** @class */ (function (_super) {
        __extends(CalculationDataNumberOrPoints, _super);
        /**
         * Creates an instance of CalculationDataNumberOrPoints
         * @param {string} id
         * @param {string} name
         * @param {number} value
         * @param {string} [description=""]
         * @param {(CalculationDataDisplayInfo|undefined)} [displayInfo=undefined]
         * @memberof CalculationDataNumberOrPoints
         */
        function CalculationDataNumberOrPoints(id, name, value, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            return _super.call(this, id, name, value.toString(), value, description, displayInfo) || this;
        }
        /**
         * Returns the data as number or IPoint array
         *
         * @returns {(number|Array<IPoint>)}
         * @memberof CalculationDataNumberOrPoints
         */
        CalculationDataNumberOrPoints.prototype.getData = function () {
            return _super.prototype.getData.call(this);
        };
        /**
         * Sets the data as number or IPoint array
         *
         * @param {(number|Array<IPoint>)} data
         * @memberof CalculationDataNumberOrPoints
         */
        CalculationDataNumberOrPoints.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
        };
        return CalculationDataNumberOrPoints;
    }(calculationData_1.CalculationData));
    exports.CalculationDataNumberOrPoints = CalculationDataNumberOrPoints;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUFtRCxpREFBZTtRQUU5RDs7Ozs7Ozs7V0FRRztRQUNILHVDQUFZLEVBQVUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLFdBQXVCLEVBQUUsV0FBNkQ7WUFBdEYsNEJBQUEsRUFBQSxnQkFBdUI7WUFBRSw0QkFBQSxFQUFBLHVCQUE2RDttQkFDdkksa0JBQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsK0NBQU8sR0FBUDtZQUNJLE9BQU8saUJBQU0sT0FBTyxXQUEwQixDQUFDO1FBQ25ELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILCtDQUFPLEdBQVAsVUFBUSxJQUEwQjtZQUM5QixpQkFBTSxPQUFPLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNMLG9DQUFDO0lBQUQsQ0FBQyxBQWxDRCxDQUFtRCxpQ0FBZSxHQWtDakU7SUFsQ1ksc0VBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyBleHRlbmRzIENhbGN1bGF0aW9uRGF0YXtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXVxyXG4gICAgICogQHBhcmFtIHsoQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm98dW5kZWZpbmVkKX0gW2Rpc3BsYXlJbmZvPXVuZGVmaW5lZF1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIGRlc2NyaXB0aW9uOnN0cmluZyA9IFwiXCIsIGRpc3BsYXlJbmZvOiBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHN1cGVyKGlkLCBuYW1lLCB2YWx1ZS50b1N0cmluZygpLCB2YWx1ZSwgZGVzY3JpcHRpb24sIGRpc3BsYXlJbmZvKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkYXRhIGFzIG51bWJlciBvciBJUG9pbnQgYXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnxBcnJheTxJUG9pbnQ+KX1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1xyXG4gICAgICovXHJcbiAgICBnZXREYXRhKCk6IG51bWJlcnxBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0RGF0YSgpIGFzIG51bWJlcnxBcnJheTxJUG9pbnQ+O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZGF0YSBhcyBudW1iZXIgb3IgSVBvaW50IGFycmF5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyfEFycmF5PElQb2ludD4pfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcclxuICAgICAqL1xyXG4gICAgc2V0RGF0YShkYXRhOiBudW1iZXJ8QXJyYXk8SVBvaW50Pikge1xyXG4gICAgICAgIHN1cGVyLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19
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
    var CalculationDataNumber = /** @class */ (function (_super) {
        __extends(CalculationDataNumber, _super);
        /**
         * Creates an instance of CalculationDataNumber
         * @param {string} id
         * @param {string} name
         * @param {number} value
         * @param {string} [description=""]
         * @param {(CalculationDataDisplayInfo|undefined)} [displayInfo=undefined]
         * @memberof CalculationDataNumber
         */
        function CalculationDataNumber(id, name, value, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            return _super.call(this, id, name, value.toString(), value, description, displayInfo) || this;
        }
        /**
         * Returns the data as number
         *
         * @returns {number}
         * @memberof CalculationDataNumber
         */
        CalculationDataNumber.prototype.getData = function () {
            return _super.prototype.getData.call(this);
        };
        /**
         * Sets the data as number
         *
         * @param {number} data
         * @memberof CalculationDataNumber
         */
        CalculationDataNumber.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
        };
        return CalculationDataNumber;
    }(calculationData_1.CalculationData));
    exports.CalculationDataNumber = CalculationDataNumber;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQTJDLHlDQUFlO1FBRXREOzs7Ozs7OztXQVFHO1FBQ0gsK0JBQVksRUFBVSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsV0FBdUIsRUFBRSxXQUE2RDtZQUF0Riw0QkFBQSxFQUFBLGdCQUF1QjtZQUFFLDRCQUFBLEVBQUEsdUJBQTZEO21CQUN2SSxrQkFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztRQUN0RSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBTyxHQUFQO1lBQ0ksT0FBTyxpQkFBTSxPQUFPLFdBQVksQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBTyxHQUFQLFVBQVEsSUFBWTtZQUNoQixpQkFBTSxPQUFPLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQWxDRCxDQUEyQyxpQ0FBZSxHQWtDekQ7SUFsQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgZXh0ZW5kcyBDYWxjdWxhdGlvbkRhdGF7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENhbGN1bGF0aW9uRGF0YU51bWJlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdXHJcbiAgICAgKiBAcGFyYW0geyhDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQpfSBbZGlzcGxheUluZm89dW5kZWZpbmVkXVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YU51bWJlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIGRlc2NyaXB0aW9uOnN0cmluZyA9IFwiXCIsIGRpc3BsYXlJbmZvOiBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHN1cGVyKGlkLCBuYW1lLCB2YWx1ZS50b1N0cmluZygpLCB2YWx1ZSwgZGVzY3JpcHRpb24sIGRpc3BsYXlJbmZvKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkYXRhIGFzIG51bWJlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyXHJcbiAgICAgKi9cclxuICAgIGdldERhdGEoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0RGF0YSgpIGFzIG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRhdGEgYXMgbnVtYmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJcclxuICAgICAqL1xyXG4gICAgc2V0RGF0YShkYXRhOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlci5zZXREYXRhKGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
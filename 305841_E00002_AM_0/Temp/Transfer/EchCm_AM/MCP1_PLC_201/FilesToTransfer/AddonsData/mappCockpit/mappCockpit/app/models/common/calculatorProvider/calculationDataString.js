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
    var CalculationDataString = /** @class */ (function (_super) {
        __extends(CalculationDataString, _super);
        /**
         * Creates an instance of CalculationDataString
         * @param {string} id
         * @param {string} name
         * @param {string} value
         * @param {string} [description=""]
         * @param {(CalculationDataDisplayInfo|undefined)} [displayInfo=undefined]
         * @memberof CalculationDataString
         */
        function CalculationDataString(id, name, value, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            return _super.call(this, id, name, value, value, description, displayInfo) || this;
        }
        /**
         * Retruns the data as string
         *
         * @returns {string}
         * @memberof CalculationDataString
         */
        CalculationDataString.prototype.getData = function () {
            return _super.prototype.getData.call(this);
        };
        /**
         * Sets the data as string
         *
         * @param {string} data
         * @memberof CalculationDataString
         */
        CalculationDataString.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
        };
        return CalculationDataString;
    }(calculationData_1.CalculationData));
    exports.CalculationDataString = CalculationDataString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQTJDLHlDQUFlO1FBRXREOzs7Ozs7OztXQVFHO1FBQ0gsK0JBQVksRUFBVSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsV0FBdUIsRUFBRSxXQUE2RDtZQUF0Riw0QkFBQSxFQUFBLGdCQUF1QjtZQUFFLDRCQUFBLEVBQUEsdUJBQTZEO21CQUN2SSxrQkFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztRQUMzRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBTyxHQUFQO1lBQ0ksT0FBTyxpQkFBTSxPQUFPLFdBQVksQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBTyxHQUFQLFVBQVEsSUFBWTtZQUNoQixpQkFBTSxPQUFPLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQWxDRCxDQUEyQyxpQ0FBZSxHQWtDekQ7SUFsQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkRhdGFTdHJpbmcgZXh0ZW5kcyBDYWxjdWxhdGlvbkRhdGF7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENhbGN1bGF0aW9uRGF0YVN0cmluZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdXHJcbiAgICAgKiBAcGFyYW0geyhDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQpfSBbZGlzcGxheUluZm89dW5kZWZpbmVkXVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVN0cmluZ1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOnN0cmluZyA9IFwiXCIsIGRpc3BsYXlJbmZvOiBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHN1cGVyKGlkLCBuYW1lLCB2YWx1ZSwgdmFsdWUsIGRlc2NyaXB0aW9uLCBkaXNwbGF5SW5mbyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0aGUgZGF0YSBhcyBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVN0cmluZ1xyXG4gICAgICovXHJcbiAgICBnZXREYXRhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldERhdGEoKSBhcyBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBkYXRhIGFzIHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhU3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHNldERhdGEoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0RGF0YShkYXRhKTtcclxuICAgIH1cclxufVxyXG4iXX0=
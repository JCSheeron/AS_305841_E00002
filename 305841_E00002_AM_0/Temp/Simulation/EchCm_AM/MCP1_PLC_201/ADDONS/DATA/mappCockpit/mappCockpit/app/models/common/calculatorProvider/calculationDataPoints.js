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
    var CalculationDataPoints = /** @class */ (function (_super) {
        __extends(CalculationDataPoints, _super);
        /**
         * Creates an instance of CalculationDataPoints
         * @param {string} id
         * @param {string} name
         * @param {string} value
         * @param {Array<IPoint>} data
         * @param {string} [description=""]
         * @param {(CalculationDataDisplayInfo|undefined)} [displayInfo=undefined]
         * @memberof CalculationDataPoints
         */
        function CalculationDataPoints(id, name, value, data, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            return _super.call(this, id, name, value, data, description, displayInfo) || this;
        }
        /**
         * Returns the data as IPoint array
         *
         * @returns {Array<IPoint>}
         * @memberof CalculationDataPoints
         */
        CalculationDataPoints.prototype.getData = function () {
            return _super.prototype.getData.call(this);
        };
        /**
         * Sets the data as IPoint array
         *
         * @param {Array<IPoint>} data
         * @memberof CalculationDataPoints
         */
        CalculationDataPoints.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
        };
        return CalculationDataPoints;
    }(calculationData_1.CalculationData));
    exports.CalculationDataPoints = CalculationDataPoints;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhUG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFQb2ludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQTJDLHlDQUFlO1FBRXREOzs7Ozs7Ozs7V0FTRztRQUNILCtCQUFZLEVBQVUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLElBQW1CLEVBQUMsV0FBdUIsRUFBRSxXQUE2RDtZQUF0Riw0QkFBQSxFQUFBLGdCQUF1QjtZQUFFLDRCQUFBLEVBQUEsdUJBQTZEO21CQUMzSixrQkFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztRQUMxRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBTyxHQUFQO1lBQ0ksT0FBTyxpQkFBTSxPQUFPLFdBQW1CLENBQUM7UUFDNUMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQU8sR0FBUCxVQUFRLElBQW1CO1lBQ3ZCLGlCQUFNLE9BQU8sWUFBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBbkNELENBQTJDLGlDQUFlLEdBbUN6RDtJQW5DWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uRGF0YVBvaW50cyBleHRlbmRzIENhbGN1bGF0aW9uRGF0YXtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2FsY3VsYXRpb25EYXRhUG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gZGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXVxyXG4gICAgICogQHBhcmFtIHsoQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm98dW5kZWZpbmVkKX0gW2Rpc3BsYXlJbmZvPXVuZGVmaW5lZF1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRhOiBBcnJheTxJUG9pbnQ+LGRlc2NyaXB0aW9uOnN0cmluZyA9IFwiXCIsIGRpc3BsYXlJbmZvOiBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHN1cGVyKGlkLCBuYW1lLCB2YWx1ZSwgZGF0YSwgZGVzY3JpcHRpb24sIGRpc3BsYXlJbmZvKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkYXRhIGFzIElQb2ludCBhcnJheVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVBvaW50c1xyXG4gICAgICovXHJcbiAgICBnZXREYXRhKCk6IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXREYXRhKCkgYXMgQXJyYXk8SVBvaW50PjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRhdGEgYXMgSVBvaW50IGFycmF5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhUG9pbnRzXHJcbiAgICAgKi9cclxuICAgIHNldERhdGEoZGF0YTogQXJyYXk8SVBvaW50Pikge1xyXG4gICAgICAgIHN1cGVyLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19
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
define(["require", "exports", "../../point", "./filters/butterworth", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, butterworth_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LpButterworthCalculator = /** @class */ (function (_super) {
        __extends(LpButterworthCalculator, _super);
        function LpButterworthCalculator() {
            var _this = _super.call(this, "lp butterworth", "LP Butterworth", "Filters a signal with a parameterizable Butterworth low-pass filter") || this;
            _this.inputId1 = "Order";
            _this.inputId2 = "CutoffFrequency";
            _this.inputId3 = "InputSignal";
            _this.inputName1 = "Order";
            _this.inputName2 = "Cutoff frequency";
            _this.inputName3 = "Input signal";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "filtered signal";
            _this._filterOrderMin = butterworth_1.Butterworth.filterOrderMin;
            _this._filterOrderMax = butterworth_1.Butterworth.filterOrderMax;
            return _this;
        }
        LpButterworthCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            // Numeric, 1-5
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputId1, this.inputName1, 1, "The order of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(true, false, this.getFilterOrderValues())));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputId2, this.inputName2, 3.2, "The cut-off frequency (frequency with an attenuation of -3dB) of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false)));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputId3, this.inputName3, "", new Array(), "The signal to be filtered", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        LpButterworthCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        LpButterworthCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var filterOrder = calculationInputDataContainer[0];
            var cutoffFrequency = calculationInputDataContainer[1];
            var inputSignal = calculationInputDataContainer[2];
            if (filterOrder == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(filterOrder.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (cutoffFrequency == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(cutoffFrequency.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
            if (inputSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName3]);
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculationInputDataContainer[0].data < this._filterOrderMin || calculationInputDataContainer[0].data > this._filterOrderMax) {
                this.addError("Calculation Error: '" + this.inputName1 + "' is out of range (valid range " + this._filterOrderMin + "-" + this._filterOrderMax + ")!");
            }
        };
        LpButterworthCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var filterOrder = calculationInputDataContainer[0];
            var cutoffFrequency = calculationInputDataContainer[1];
            var inputSignal = calculationInputDataContainer[2];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(filterOrder.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(cutoffFrequency.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                result = this.calculateButterworth(inputSignal.data, filterOrder.data, cutoffFrequency.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName,
                id: this.outputId
            });
        };
        /**
         * Calculate butterworth with the given data
         *
         * @private
         * @param {Array<IPoint>} signalData
         * @param {number} filterOrder
         * @param {number} inputCutOffFrequence
         * @returns {Array<IPoint>}
         * @memberof LpButterworthCalculator
         */
        LpButterworthCalculator.prototype.calculateButterworth = function (signalData, filterOrder, inputCutOffFrequence) {
            var ts = calculatorHelper_1.CalculatorHelper.estimateSampleTime(signalData);
            var inputSignal = new Array();
            for (var i = 0; i < signalData.length; i++) {
                inputSignal.push(signalData[i].y);
            }
            var filter = new butterworth_1.Butterworth(filterOrder, inputCutOffFrequence, ts);
            var outputSignal = filter.filter(inputSignal);
            var output = new Array();
            for (var i = 0; i < outputSignal.length; i++) {
                output.push(new point_1.Point(signalData[i].x, outputSignal[i]));
            }
            return output;
        };
        /**
         * Returns the supported filter orders for the butterworth filter
         *
         * @private
         * @returns {Array<IValueListItem>}
         * @memberof LpButterworthCalculator
         */
        LpButterworthCalculator.prototype.getFilterOrderValues = function () {
            var filterOrderValues = new Array();
            for (var i = this._filterOrderMin; i <= this._filterOrderMax; i++) {
                filterOrderValues.push({ value: i.toString(), displayValue: i.toString() });
            }
            return filterOrderValues;
        };
        return LpButterworthCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.LpButterworthCalculator = LpButterworthCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2xwQnV0dGVyd29ydGhDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXQTtRQUE2QywyQ0FBYztRQWdCdkQ7WUFBQSxZQUNJLGtCQUFNLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLHFFQUFxRSxDQUFDLFNBSW5IO1lBbkJPLGNBQVEsR0FBVyxPQUFPLENBQUM7WUFDM0IsY0FBUSxHQUFXLGlCQUFpQixDQUFDO1lBQ3JDLGNBQVEsR0FBVyxhQUFhLENBQUM7WUFDakMsZ0JBQVUsR0FBVyxPQUFPLENBQUM7WUFDN0IsZ0JBQVUsR0FBVyxrQkFBa0IsQ0FBQztZQUN4QyxnQkFBVSxHQUFXLGNBQWMsQ0FBQztZQUVwQyxjQUFRLEdBQVcsY0FBYyxDQUFDO1lBQ2xDLGdCQUFVLEdBQVcsZUFBZSxDQUFDO1lBQ3JDLGlCQUFXLEdBQVcsaUJBQWlCLENBQUM7WUFRNUMsS0FBSSxDQUFDLGVBQWUsR0FBRyx5QkFBVyxDQUFDLGNBQWMsQ0FBQztZQUNsRCxLQUFJLENBQUMsZUFBZSxHQUFHLHlCQUFXLENBQUMsY0FBYyxDQUFDOztRQUN0RCxDQUFDO1FBRU0scURBQW1CLEdBQTFCO1lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxpQkFBTSxtQkFBbUIsV0FBRSxDQUFDO1lBRW5ELGVBQWU7WUFDZixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLHlCQUF5QixFQUFFLElBQUksdURBQTBCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFD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cG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQnV0dGVyd29ydGggfSBmcm9tIFwiLi9maWx0ZXJzL2J1dHRlcndvcnRoXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBJVmFsdWVMaXN0SXRlbSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vaW50ZXJmYWNlcy92YWx1ZUxpc3RJdGVtSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMcEJ1dHRlcndvcnRoQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0SWQxOiBzdHJpbmcgPSBcIk9yZGVyXCI7XHJcbiAgICBwcml2YXRlIGlucHV0SWQyOiBzdHJpbmcgPSBcIkN1dG9mZkZyZXF1ZW5jeVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dElkMzogc3RyaW5nID0gXCJJbnB1dFNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxOiBzdHJpbmcgPSBcIk9yZGVyXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6IHN0cmluZyA9IFwiQ3V0b2ZmIGZyZXF1ZW5jeVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUzOiBzdHJpbmcgPSBcIklucHV0IHNpZ25hbFwiO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIG91dHB1dElkOiBzdHJpbmcgPSBcIk91dHB1dFNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXROYW1lOiBzdHJpbmcgPSBcIk91dHB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0VmFsdWU6IHN0cmluZyA9IFwiZmlsdGVyZWQgc2lnbmFsXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZmlsdGVyT3JkZXJNaW46IG51bWJlcjsgXHJcbiAgICBwcml2YXRlIF9maWx0ZXJPcmRlck1heDogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJscCBidXR0ZXJ3b3J0aFwiLCBcIkxQIEJ1dHRlcndvcnRoXCIsIFwiRmlsdGVycyBhIHNpZ25hbCB3aXRoIGEgcGFyYW1ldGVyaXphYmxlIEJ1dHRlcndvcnRoIGxvdy1wYXNzIGZpbHRlclwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlsdGVyT3JkZXJNaW4gPSBCdXR0ZXJ3b3J0aC5maWx0ZXJPcmRlck1pbjtcclxuICAgICAgICB0aGlzLl9maWx0ZXJPcmRlck1heCA9IEJ1dHRlcndvcnRoLmZpbHRlck9yZGVyTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+e1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICAvLyBOdW1lcmljLCAxLTVcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlcih0aGlzLmlucHV0SWQxLCB0aGlzLmlucHV0TmFtZTEsIDEsIFwiVGhlIG9yZGVyIG9mIHRoZSBmaWx0ZXJcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKHRydWUsIGZhbHNlLCB0aGlzLmdldEZpbHRlck9yZGVyVmFsdWVzKCkpKSk7XHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIodGhpcy5pbnB1dElkMiwgdGhpcy5pbnB1dE5hbWUyLCAzLjIsIFwiVGhlIGN1dC1vZmYgZnJlcXVlbmN5IChmcmVxdWVuY3kgd2l0aCBhbiBhdHRlbnVhdGlvbiBvZiAtM2RCKSBvZiB0aGUgZmlsdGVyXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgZmFsc2UpKSk7XHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5pbnB1dElkMywgdGhpcy5pbnB1dE5hbWUzLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgdG8gYmUgZmlsdGVyZWRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdElucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPdXRwdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdE91dHB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdE91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMub3V0cHV0SWQsIHRoaXMub3V0cHV0TmFtZSwgdGhpcy5vdXRwdXRWYWx1ZSwgbmV3IEFycmF5PElQb2ludD4oKSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdE91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbHRlck9yZGVyID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGN1dG9mZkZyZXF1ZW5jeSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzJdO1xyXG5cclxuICAgICAgICBpZihmaWx0ZXJPcmRlciA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihmaWx0ZXJPcmRlci5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1dG9mZkZyZXF1ZW5jeSA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihjdXRvZmZGcmVxdWVuY3kuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbnB1dFNpZ25hbCA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUzXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdLmRhdGEgPCB0aGlzLl9maWx0ZXJPcmRlck1pbiB8fCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXS5kYXRhID4gdGhpcy5fZmlsdGVyT3JkZXJNYXgpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiAnXCIgKyB0aGlzLmlucHV0TmFtZTEgKyBcIicgaXMgb3V0IG9mIHJhbmdlICh2YWxpZCByYW5nZSBcIiArIHRoaXMuX2ZpbHRlck9yZGVyTWluICsgXCItXCIgKyB0aGlzLl9maWx0ZXJPcmRlck1heCArIFwiKSFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVyT3JkZXIgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgY3V0b2ZmRnJlcXVlbmN5ID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMl07XHJcblxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihmaWx0ZXJPcmRlci5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoY3V0b2ZmRnJlcXVlbmN5LmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNhbGN1bGF0ZUJ1dHRlcndvcnRoKGlucHV0U2lnbmFsLmRhdGEsIGZpbHRlck9yZGVyLmRhdGEsIGN1dG9mZkZyZXF1ZW5jeS5kYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2FsY3VsYXRpb25PdXRwdXREYXRhKHtcclxuICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5vdXRwdXRWYWx1ZSxcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5vdXRwdXROYW1lLFxyXG4gICAgICAgICAgICBpZDogdGhpcy5vdXRwdXRJZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIGJ1dHRlcndvcnRoIHdpdGggdGhlIGdpdmVuIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsdGVyT3JkZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dEN1dE9mZkZyZXF1ZW5jZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCdXR0ZXJ3b3J0aChzaWduYWxEYXRhOiBBcnJheTxJUG9pbnQ+LCBmaWx0ZXJPcmRlcjogbnVtYmVyLCBpbnB1dEN1dE9mZkZyZXF1ZW5jZTogbnVtYmVyKTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgdHMgPSBDYWxjdWxhdG9ySGVscGVyLmVzdGltYXRlU2FtcGxlVGltZShzaWduYWxEYXRhKTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWw6IG51bWJlcltdID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzaWduYWxEYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaW5wdXRTaWduYWwucHVzaChzaWduYWxEYXRhW2ldLnkpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZpbHRlcjogQnV0dGVyd29ydGggPSBuZXcgQnV0dGVyd29ydGgoZmlsdGVyT3JkZXIsIGlucHV0Q3V0T2ZmRnJlcXVlbmNlLCB0cyk7IFxyXG4gICAgICAgIGxldCBvdXRwdXRTaWduYWw6IG51bWJlcltdID0gZmlsdGVyLmZpbHRlcihpbnB1dFNpZ25hbCk7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgb3V0cHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2gobmV3IFBvaW50KHNpZ25hbERhdGFbaV0ueCwgb3V0cHV0U2lnbmFsW2ldKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHN1cHBvcnRlZCBmaWx0ZXIgb3JkZXJzIGZvciB0aGUgYnV0dGVyd29ydGggZmlsdGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJVmFsdWVMaXN0SXRlbT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRGaWx0ZXJPcmRlclZhbHVlcygpOiBBcnJheTxJVmFsdWVMaXN0SXRlbT57XHJcbiAgICAgICAgbGV0IGZpbHRlck9yZGVyVmFsdWVzID0gbmV3IEFycmF5PElWYWx1ZUxpc3RJdGVtPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuX2ZpbHRlck9yZGVyTWluOyAgaSA8PSB0aGlzLl9maWx0ZXJPcmRlck1heDsgaSsrKXtcclxuICAgICAgICAgICAgZmlsdGVyT3JkZXJWYWx1ZXMucHVzaCh7dmFsdWU6IGkudG9TdHJpbmcoKSwgZGlzcGxheVZhbHVlOiBpLnRvU3RyaW5nKCl9IGFzIElWYWx1ZUxpc3RJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlck9yZGVyVmFsdWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==
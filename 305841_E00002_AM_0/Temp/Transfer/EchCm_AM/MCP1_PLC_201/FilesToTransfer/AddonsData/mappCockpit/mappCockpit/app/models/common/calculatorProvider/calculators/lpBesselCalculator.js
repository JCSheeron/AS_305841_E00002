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
define(["require", "exports", "../../point", "./filters/bessel", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, bessel_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LpBesselCalculator = /** @class */ (function (_super) {
        __extends(LpBesselCalculator, _super);
        function LpBesselCalculator() {
            var _this = _super.call(this, "lp bessel", "LP Bessel", "Filters a signal with a parameterizable Bessel low-pass filter") || this;
            _this.inputId1 = "Order";
            _this.inputId2 = "CutoffFrequency";
            _this.inputId3 = "InputSignal";
            _this.inputName1 = "Order";
            _this.inputName2 = "Cutoff frequency";
            _this.inputName3 = "Input signal";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "filtered signal";
            _this._filterOrderMin = bessel_1.Bessel.filterOrderMin;
            _this._filterOrderMax = bessel_1.Bessel.filterOrderMax;
            return _this;
        }
        LpBesselCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            var cutOffFrequencyDisplayInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            cutOffFrequencyDisplayInfo.minValue = 0;
            // Numeric, 1-5
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputId1, this.inputName1, 1, "The order of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(true, false, this.getFilterOrderValues())));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputId2, this.inputName2, 3.2, "The cut-off frequency (frequency with an attenuation of -3dB) of the filter", cutOffFrequencyDisplayInfo));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputId3, this.inputName3, "", new Array(), "The signal to be filtered", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        LpBesselCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        LpBesselCalculator.prototype.verifyCalculationInputData = function () {
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
            if (filterOrder.data < this._filterOrderMin || filterOrder.data > this._filterOrderMax) {
                this.addError("Calculation Error: '" + this.inputName1 + "' is out of range (valid range " + this._filterOrderMin + "-" + this._filterOrderMax + ")!");
            }
        };
        LpBesselCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var filterOrder = calculationInputDataContainer[0];
            var cutoffFrequency = calculationInputDataContainer[1];
            var inputSignal = calculationInputDataContainer[2];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(filterOrder.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(cutoffFrequency.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                result = this.calculateBessel(inputSignal.data, filterOrder.data, cutoffFrequency.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName,
                id: this.outputId
            });
        };
        /**
         * Calculate bessel with the given data
         *
         * @private
         * @param {Array<IPoint>} signalData
         * @param {number} filterOrder
         * @param {number} inputCutOffFrequence
         * @returns {Array<IPoint>}
         * @memberof LpBesselCalculator
         */
        LpBesselCalculator.prototype.calculateBessel = function (signalData, filterOrder, inputCutOffFrequence) {
            var ts = calculatorHelper_1.CalculatorHelper.estimateSampleTime(signalData);
            var inputSignal = new Array();
            for (var i = 0; i < signalData.length; i++) {
                inputSignal.push(signalData[i].y);
            }
            var filter = new bessel_1.Bessel(filterOrder, inputCutOffFrequence, ts);
            var outputSignal = filter.filter(inputSignal);
            var output = new Array();
            for (var i = 0; i < outputSignal.length; i++) {
                output.push(new point_1.Point(signalData[i].x, outputSignal[i]));
            }
            return output;
        };
        /**
         * Returns the supported filter orders for the bessel filter
         *
         * @private
         * @returns {Array<IValueListItem>}
         * @memberof LpBesselCalculator
         */
        LpBesselCalculator.prototype.getFilterOrderValues = function () {
            var filterOrderValues = new Array();
            for (var i = this._filterOrderMin; i <= this._filterOrderMax; i++) {
                filterOrderValues.push({ value: i.toString(), displayValue: i.toString() });
            }
            return filterOrderValues;
        };
        return LpBesselCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.LpBesselCalculator = LpBesselCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHBCZXNzZWxDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9scEJlc3NlbENhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVdBO1FBQXdDLHNDQUFjO1FBZ0JsRDtZQUFBLFlBQ0ksa0JBQU0sV0FBVyxFQUFFLFdBQVcsRUFBRSxnRUFBZ0UsQ0FBQyxTQUlwRztZQW5CTyxjQUFRLEdBQVcsT0FBTyxDQUFDO1lBQzNCLGNBQVEsR0FBVyxpQkFBaUIsQ0FBQztZQUNyQyxjQUFRLEdBQVcsYUFBYSxDQUFDO1lBQ2pDLGdCQUFVLEdBQVcsT0FBTyxDQUFDO1lBQzdCLGdCQUFVLEdBQVcsa0JBQWtCLENBQUM7WUFDeEMsZ0JBQVUsR0FBVyxjQUFjLENBQUM7WUFFcEMsY0FBUSxHQUFXLGNBQWMsQ0FBQztZQUNsQyxnQkFBVSxHQUFXLGVBQWUsQ0FBQztZQUNyQyxpQkFBVyxHQUFXLGlCQUFpQixDQUFDO1lBUTVDLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBTSxDQUFDLGNBQWMsQ0FBQztZQUM3QyxLQUFJLENBQUMsZUFBZSxHQUFHLGVBQU0sQ0FBQyxjQUFjLENBQUM7O1FBQ2pELENBQUM7UUFFTSxnREFBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsSUFBSSwwQkFBMEIsR0FBRyxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5RSwwQkFBMEIsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLGVBQWU7WUFDZixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FB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Ii4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQmVzc2VsIH0gZnJvbSBcIi4vZmlsdGVycy9iZXNzZWxcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UsIEVycm9yTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExwQmVzc2VsQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0SWQxOiBzdHJpbmcgPSBcIk9yZGVyXCI7XHJcbiAgICBwcml2YXRlIGlucHV0SWQyOiBzdHJpbmcgPSBcIkN1dG9mZkZyZXF1ZW5jeVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dElkMzogc3RyaW5nID0gXCJJbnB1dFNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxOiBzdHJpbmcgPSBcIk9yZGVyXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6IHN0cmluZyA9IFwiQ3V0b2ZmIGZyZXF1ZW5jeVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUzOiBzdHJpbmcgPSBcIklucHV0IHNpZ25hbFwiO1xyXG5cclxuICAgIHByaXZhdGUgb3V0cHV0SWQ6IHN0cmluZyA9IFwiT3V0cHV0U2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dE5hbWU6IHN0cmluZyA9IFwiT3V0cHV0IHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXRWYWx1ZTogc3RyaW5nID0gXCJmaWx0ZXJlZCBzaWduYWxcIjtcclxuXHJcbiAgICBwcml2YXRlIF9maWx0ZXJPcmRlck1pbjogbnVtYmVyOyBcclxuICAgIHByaXZhdGUgX2ZpbHRlck9yZGVyTWF4OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwibHAgYmVzc2VsXCIsIFwiTFAgQmVzc2VsXCIsIFwiRmlsdGVycyBhIHNpZ25hbCB3aXRoIGEgcGFyYW1ldGVyaXphYmxlIEJlc3NlbCBsb3ctcGFzcyBmaWx0ZXJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpbHRlck9yZGVyTWluID0gQmVzc2VsLmZpbHRlck9yZGVyTWluO1xyXG4gICAgICAgIHRoaXMuX2ZpbHRlck9yZGVyTWF4ID0gQmVzc2VsLmZpbHRlck9yZGVyTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+e1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY3V0T2ZmRnJlcXVlbmN5RGlzcGxheUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBjdXRPZmZGcmVxdWVuY3lEaXNwbGF5SW5mby5taW5WYWx1ZSA9IDA7XHJcblxyXG4gICAgICAgIC8vIE51bWVyaWMsIDEtNVxyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKHRoaXMuaW5wdXRJZDEsIHRoaXMuaW5wdXROYW1lMSwgMSwgXCJUaGUgb3JkZXIgb2YgdGhlIGZpbHRlclwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8odHJ1ZSwgZmFsc2UsIHRoaXMuZ2V0RmlsdGVyT3JkZXJWYWx1ZXMoKSkpKTtcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlcih0aGlzLmlucHV0SWQyLCB0aGlzLmlucHV0TmFtZTIsIDMuMiwgXCJUaGUgY3V0LW9mZiBmcmVxdWVuY3kgKGZyZXF1ZW5jeSB3aXRoIGFuIGF0dGVudWF0aW9uIG9mIC0zZEIpIG9mIHRoZSBmaWx0ZXJcIiwgY3V0T2ZmRnJlcXVlbmN5RGlzcGxheUluZm8pKTtcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLmlucHV0SWQzLCB0aGlzLmlucHV0TmFtZTMsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIHNpZ25hbCB0byBiZSBmaWx0ZXJlZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdE91dHB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXRJZCwgdGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVyT3JkZXIgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgY3V0b2ZmRnJlcXVlbmN5ID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMl07XHJcblxyXG4gICAgICAgIGlmKGZpbHRlck9yZGVyID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGZpbHRlck9yZGVyLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3V0b2ZmRnJlcXVlbmN5ID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGN1dG9mZkZyZXF1ZW5jeS5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTNdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZmlsdGVyT3JkZXIuZGF0YSA8IHRoaXMuX2ZpbHRlck9yZGVyTWluIHx8IGZpbHRlck9yZGVyLmRhdGEgPiB0aGlzLl9maWx0ZXJPcmRlck1heCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6ICdcIiArIHRoaXMuaW5wdXROYW1lMSArIFwiJyBpcyBvdXQgb2YgcmFuZ2UgKHZhbGlkIHJhbmdlIFwiICsgdGhpcy5fZmlsdGVyT3JkZXJNaW4gKyBcIi1cIiArIHRoaXMuX2ZpbHRlck9yZGVyTWF4ICsgXCIpIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJPcmRlciA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBjdXRvZmZGcmVxdWVuY3kgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsyXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGZpbHRlck9yZGVyLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihjdXRvZmZGcmVxdWVuY3kuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2FsY3VsYXRlQmVzc2VsKGlucHV0U2lnbmFsLmRhdGEsIGZpbHRlck9yZGVyLmRhdGEsIGN1dG9mZkZyZXF1ZW5jeS5kYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2FsY3VsYXRpb25PdXRwdXREYXRhKHtcclxuICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5vdXRwdXRWYWx1ZSxcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5vdXRwdXROYW1lLFxyXG4gICAgICAgICAgICBpZDogdGhpcy5vdXRwdXRJZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIGJlc3NlbCB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gc2lnbmFsRGF0YVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpbHRlck9yZGVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXRDdXRPZmZGcmVxdWVuY2VcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIExwQmVzc2VsQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJlc3NlbChzaWduYWxEYXRhOiBBcnJheTxJUG9pbnQ+LCBmaWx0ZXJPcmRlcjogbnVtYmVyLCBpbnB1dEN1dE9mZkZyZXF1ZW5jZTogbnVtYmVyKTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgdHMgPSBDYWxjdWxhdG9ySGVscGVyLmVzdGltYXRlU2FtcGxlVGltZShzaWduYWxEYXRhKTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWw6IG51bWJlcltdID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzaWduYWxEYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaW5wdXRTaWduYWwucHVzaChzaWduYWxEYXRhW2ldLnkpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZpbHRlcjogQmVzc2VsID0gbmV3IEJlc3NlbChmaWx0ZXJPcmRlciwgaW5wdXRDdXRPZmZGcmVxdWVuY2UsIHRzKTsgXHJcbiAgICAgICAgbGV0IG91dHB1dFNpZ25hbDogbnVtYmVyW10gPSBmaWx0ZXIuZmlsdGVyKGlucHV0U2lnbmFsKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBvdXRwdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChuZXcgUG9pbnQoc2lnbmFsRGF0YVtpXS54LCBvdXRwdXRTaWduYWxbaV0pKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHN1cHBvcnRlZCBmaWx0ZXIgb3JkZXJzIGZvciB0aGUgYmVzc2VsIGZpbHRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVZhbHVlTGlzdEl0ZW0+fVxyXG4gICAgICogQG1lbWJlcm9mIExwQmVzc2VsQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEZpbHRlck9yZGVyVmFsdWVzKCk6IEFycmF5PElWYWx1ZUxpc3RJdGVtPntcclxuICAgICAgICBsZXQgZmlsdGVyT3JkZXJWYWx1ZXMgPSBuZXcgQXJyYXk8SVZhbHVlTGlzdEl0ZW0+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy5fZmlsdGVyT3JkZXJNaW47ICBpIDw9IHRoaXMuX2ZpbHRlck9yZGVyTWF4OyBpKyspe1xyXG4gICAgICAgICAgICBmaWx0ZXJPcmRlclZhbHVlcy5wdXNoKHt2YWx1ZTogaS50b1N0cmluZygpLCBkaXNwbGF5VmFsdWU6IGkudG9TdHJpbmcoKX0gYXMgSVZhbHVlTGlzdEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlsdGVyT3JkZXJWYWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuIl19
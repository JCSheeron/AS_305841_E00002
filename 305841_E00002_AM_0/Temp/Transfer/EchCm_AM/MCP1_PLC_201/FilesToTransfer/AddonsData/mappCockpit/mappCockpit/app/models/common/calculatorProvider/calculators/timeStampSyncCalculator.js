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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeStampSyncCalculator = /** @class */ (function (_super) {
        __extends(TimeStampSyncCalculator, _super);
        function TimeStampSyncCalculator() {
            var _this = _super.call(this, "timeStampSync", "Time stamp synchronization", "Synchronizes the time stamps of a signal to the time stamps of a reference signal.") || this;
            _this.inputId1 = "InputSignalAToSynchronizeTimeStamps";
            _this.inputId2 = "InputSignalBWithReferenceTimeStamps";
            _this.inputName1 = "Input signal a to synchronize time stamps";
            _this.inputName2 = "Input signal b with reference time stamps";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "result";
            return _this;
        }
        TimeStampSyncCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputId1, this.inputName1, "", new Array(), "The signal whose time stamps are to be synchronized.", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputId2, this.inputName2, "", new Array(), "The signal with the reference time stamps.", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        TimeStampSyncCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        TimeStampSyncCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var signalToSynchronize = calculationInputDataContainer[0];
            var referenceSignal = calculationInputDataContainer[1];
            if (signalToSynchronize == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(signalToSynchronize.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (referenceSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(referenceSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
        };
        TimeStampSyncCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var signalToSynchronize = calculationInputDataContainer[0];
            var referenceSignal = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(signalToSynchronize.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(referenceSignal.data)) {
                result = this.synchronizeTimeStamp(signalToSynchronize.data, referenceSignal.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName,
                id: this.outputId
            });
        };
        /**
         * Calculates output signal depending on type of inputs
         *
         * @private
         * @param {*} inputNumber1
         * @param {*} inputNumber2
         * @param {(Array<IPoint>|undefined)} inputSignalData1
         * @param {(Array<IPoint>|undefined)} inputSignalData2
         * @returns {Array<IPoint>}
         * @memberof AddCalculator
         */
        TimeStampSyncCalculator.prototype.synchronizeTimeStamp = function (inputSignalToSync, inputSignalRefTimeStamp) {
            var points = new Array();
            var lastIndex = 0;
            for (var i = 0; i < inputSignalRefTimeStamp.length; i++) {
                for (var j = lastIndex; j < inputSignalToSync.length; j++) {
                    if (inputSignalToSync[j].x > inputSignalRefTimeStamp[i].x) {
                        if (j > 0) { //zero order hold -> To take over a value at the first sampling point, 
                            //the signal "inputSignalToSync" must have a sampling before the very first sampling of the signal "inputSignalRefTimeStamp".
                            var x = inputSignalRefTimeStamp[i].x;
                            var y = inputSignalToSync[j - 1].y;
                            points.push(new point_1.Point(x, y));
                            lastIndex = j;
                        }
                        break;
                    }
                }
                //check if last point is relevant (time interval between last point and next time stamp < period time of signal to be synchronized)   
                if (inputSignalRefTimeStamp[i].x >= inputSignalToSync[inputSignalToSync.length - 1].x) {
                    if ((inputSignalRefTimeStamp[i].x - inputSignalToSync[inputSignalToSync.length - 1].x) < (inputSignalToSync[inputSignalToSync.length - 1].x - inputSignalToSync[inputSignalToSync.length - 2].x)) {
                        var x = inputSignalRefTimeStamp[i].x;
                        var y = inputSignalToSync[inputSignalToSync.length - 1].y;
                        points.push(new point_1.Point(x, y));
                    }
                }
            }
            return points;
        };
        return TimeStampSyncCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.TimeStampSyncCalculator = TimeStampSyncCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVN0YW1wU3luY0NhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3RpbWVTdGFtcFN5bmNDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTtRQUE2QywyQ0FBYztRQVd2RDtZQUFBLFlBQ0ksa0JBQU0sZUFBZSxFQUFFLDRCQUE0QixFQUFFLG9GQUFvRixDQUFDLFNBQzdJO1lBWE8sY0FBUSxHQUFXLHFDQUFxQyxDQUFDO1lBQ3pELGNBQVEsR0FBVyxxQ0FBcUMsQ0FBQztZQUN6RCxnQkFBVSxHQUFXLDJDQUEyQyxDQUFDO1lBQ2pFLGdCQUFVLEdBQVcsMkNBQTJDLENBQUM7WUFFakUsY0FBUSxHQUFXLGNBQWMsQ0FBQztZQUNsQyxnQkFBVSxHQUFXLGVBQWUsQ0FBQztZQUNyQyxpQkFBVyxHQUFXLFFBQVEsQ0FBQzs7UUFJdkMsQ0FBQztRQUVNLHFEQUFtQixHQUExQjtZQUNJLElBQUksZ0JBQWdCLEdBQUcsaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUVuRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsc0RBQXNELEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9NLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQVUsRUFBRSw0Q0FBNEMsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJ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YUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNoQztpQkFDSjthQUNKO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFFbEIsQ0FBQztRQUNMLDhCQUFDO0lBQUQsQ0FBQyxBQTlHRCxDQUE2QywrQkFBYyxHQThHMUQ7SUE5R1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb3JNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVN0YW1wU3luY0NhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dElkMTogc3RyaW5nID0gXCJJbnB1dFNpZ25hbEFUb1N5bmNocm9uaXplVGltZVN0YW1wc1wiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dElkMjogc3RyaW5nID0gXCJJbnB1dFNpZ25hbEJXaXRoUmVmZXJlbmNlVGltZVN0YW1wc1wiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxOiBzdHJpbmcgPSBcIklucHV0IHNpZ25hbCBhIHRvIHN5bmNocm9uaXplIHRpbWUgc3RhbXBzXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIGIgd2l0aCByZWZlcmVuY2UgdGltZSBzdGFtcHNcIjtcclxuXHJcbiAgICBwcml2YXRlIG91dHB1dElkOiBzdHJpbmcgPSBcIk91dHB1dFNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXROYW1lOiBzdHJpbmcgPSBcIk91dHB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0VmFsdWU6IHN0cmluZyA9IFwicmVzdWx0XCI7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcInRpbWVTdGFtcFN5bmNcIiwgXCJUaW1lIHN0YW1wIHN5bmNocm9uaXphdGlvblwiLCBcIlN5bmNocm9uaXplcyB0aGUgdGltZSBzdGFtcHMgb2YgYSBzaWduYWwgdG8gdGhlIHRpbWUgc3RhbXBzIG9mIGEgcmVmZXJlbmNlIHNpZ25hbC5cIilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRJbnB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXRJZDEsIHRoaXMuaW5wdXROYW1lMSwgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSwgXCJUaGUgc2lnbmFsIHdob3NlIHRpbWUgc3RhbXBzIGFyZSB0byBiZSBzeW5jaHJvbml6ZWQuXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLmlucHV0SWQyLCB0aGlzLmlucHV0TmFtZTIsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIHNpZ25hbCB3aXRoIHRoZSByZWZlcmVuY2UgdGltZSBzdGFtcHMuXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dElkLCB0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRPdXRwdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgc2lnbmFsVG9TeW5jaHJvbml6ZSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCByZWZlcmVuY2VTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoIHNpZ25hbFRvU3luY2hyb25pemUgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoc2lnbmFsVG9TeW5jaHJvbml6ZS5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCByZWZlcmVuY2VTaWduYWwgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwocmVmZXJlbmNlU2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBzaWduYWxUb1N5bmNocm9uaXplID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IHJlZmVyZW5jZVNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoc2lnbmFsVG9TeW5jaHJvbml6ZS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwocmVmZXJlbmNlU2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuc3luY2hyb25pemVUaW1lU3RhbXAoc2lnbmFsVG9TeW5jaHJvbml6ZS5kYXRhLCByZWZlcmVuY2VTaWduYWwuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZSxcclxuICAgICAgICAgICAgaWQ6IHRoaXMub3V0cHV0SWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCBkZXBlbmRpbmcgb24gdHlwZSBvZiBpbnB1dHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBpbnB1dE51bWJlcjFcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXROdW1iZXIyXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCl9IGlucHV0U2lnbmFsRGF0YTFcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElQb2ludD58dW5kZWZpbmVkKX0gaW5wdXRTaWduYWxEYXRhMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN5bmNocm9uaXplVGltZVN0YW1wKGlucHV0U2lnbmFsVG9TeW5jOiBBcnJheTxJUG9pbnQ+LCBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcDogQXJyYXk8SVBvaW50PikgOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBsYXN0SW5kZXg6bnVtYmVyID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBsYXN0SW5kZXg7IGogPCBpbnB1dFNpZ25hbFRvU3luYy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0U2lnbmFsVG9TeW5jW2pdLnggPiBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPiAwKSB7IC8vemVybyBvcmRlciBob2xkIC0+IFRvIHRha2Ugb3ZlciBhIHZhbHVlIGF0IHRoZSBmaXJzdCBzYW1wbGluZyBwb2ludCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlIHNpZ25hbCBcImlucHV0U2lnbmFsVG9TeW5jXCIgbXVzdCBoYXZlIGEgc2FtcGxpbmcgYmVmb3JlIHRoZSB2ZXJ5IGZpcnN0IHNhbXBsaW5nIG9mIHRoZSBzaWduYWwgXCJpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFwiLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeTpudW1iZXIgPSBpbnB1dFNpZ25hbFRvU3luY1tqLTFdLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0SW5kZXggPSBqOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jaGVjayBpZiBsYXN0IHBvaW50IGlzIHJlbGV2YW50ICh0aW1lIGludGVydmFsIGJldHdlZW4gbGFzdCBwb2ludCBhbmQgbmV4dCB0aW1lIHN0YW1wIDwgcGVyaW9kIHRpbWUgb2Ygc2lnbmFsIHRvIGJlIHN5bmNocm9uaXplZCkgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0U2lnbmFsUmVmVGltZVN0YW1wW2ldLnggPj0gaW5wdXRTaWduYWxUb1N5bmNbaW5wdXRTaWduYWxUb1N5bmMubGVuZ3RoLTFdLngpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaW5wdXRTaWduYWxSZWZUaW1lU3RhbXBbaV0ueCAtIGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0xXS54KSA8IChpbnB1dFNpZ25hbFRvU3luY1tpbnB1dFNpZ25hbFRvU3luYy5sZW5ndGgtMV0ueCAtIGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0yXS54KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5Om51bWJlciA9IGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0xXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcblxyXG4gICAgfVxyXG59Il19
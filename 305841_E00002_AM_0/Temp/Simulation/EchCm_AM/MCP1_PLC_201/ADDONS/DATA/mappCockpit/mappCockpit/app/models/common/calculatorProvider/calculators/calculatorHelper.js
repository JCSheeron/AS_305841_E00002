define(["require", "exports", "../calculationDataPoints", "../../../../common/math/mathX", "../../point"], function (require, exports, calculationDataPoints_1, mathX_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Helper class for calculator to provide common functionalities only used in some calculators.
     *
     * @class CalculatorHelper
     */
    var CalculatorHelper = /** @class */ (function () {
        /**
         * Constructor set to private as Helper class should only provide static helper functions.
         * Creates an instance of CalculatorHelper.
         * @memberof CalculatorHelper
         */
        function CalculatorHelper() {
        }
        ;
        /**
         * Filters two input signals for matching signal parts.
         *
         * @static
         * @param {(Array<TCalculationData>)} inputData
         * @returns {(Array<TCalculationData>)}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.tryFilterMatchingSignalParts = function (inputData) {
            var outputData = inputData;
            var input1 = inputData[0].getData();
            var input2 = inputData[1].getData();
            if (Array.isArray(input1) && Array.isArray(input2)
                && input1.length >= 2 && input2.length >= 2) { // only filter for matching signal parts if both inputs are valid signals
                var dataContainer = {
                    pointArray1: input1,
                    pointArray2: input2
                };
                dataContainer = CalculatorHelper.filterMatchingPointsByXvalue(dataContainer);
                //create new calculation data points with filtered signals to cut the connection with input data
                var dataPoints1 = new calculationDataPoints_1.CalculationDataPoints(inputData[0].id, inputData[0].getDisplayName(), inputData[0].value, dataContainer.pointArray1, inputData[0].description, inputData[0].displayInfo);
                var dataPoints2 = new calculationDataPoints_1.CalculationDataPoints(inputData[1].id, inputData[1].getDisplayName(), inputData[1].value, dataContainer.pointArray2, inputData[1].description, inputData[1].displayInfo);
                outputData = new Array();
                outputData.push(dataPoints1);
                outputData.push(dataPoints2);
            }
            return outputData;
        };
        /**
         * Gathers Samples of same timestamp from two signals.
         * Used to filter two signals for only the matching parts of the signal (by timestamp).
         *
         * @static
         * @param {TwoPointArraysContainer} input
         * @returns {TwoPointArraysContainer} Matching signal parts based on timestamp.
         * @memberof CalculatorHelper
         */
        CalculatorHelper.filterMatchingPointsByXvalue = function (input) {
            var gatheredPoints = {
                pointArray1: new Array(),
                pointArray2: new Array()
            };
            var i = 0;
            var j = 0;
            //extract samples with matching timestamps by iterating both signals at once.
            //worst case iteration amount is length of input1 + length of input2.
            while (i < input.pointArray1.length && j < input.pointArray2.length) {
                if (input.pointArray1[i].x < input.pointArray2[j].x) {
                    i++;
                }
                else if (input.pointArray1[i].x > input.pointArray2[j].x) {
                    j++;
                }
                else {
                    gatheredPoints.pointArray1.push(input.pointArray1[i]);
                    gatheredPoints.pointArray2.push(input.pointArray2[j]);
                    i++;
                    j++;
                }
            }
            return gatheredPoints;
        };
        /**
         * Estimates the sample time to remove jitterbased on median and rounding.
         *
         * @static
         * @param {Array<IPoint>} signalData
         * @returns {number}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.estimateSampleTime = function (signalData) {
            var sampleTime = this.getMedianOfSampleTime(signalData);
            sampleTime = this.roundSampleTime(sampleTime);
            return sampleTime;
        };
        /**
         * Calculates the median of the sampletimes
         *
         * @private
         * @static
         * @param {Array<IPoint>} signalData
         * @returns {number}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.getMedianOfSampleTime = function (signalData) {
            var sampleTimes = new Array();
            for (var i = 0; i < signalData.length - 1; i++) {
                var sampleTime_1 = signalData[i + 1].x - signalData[i].x;
                sampleTimes.push(sampleTime_1);
            }
            var sampleTime = mathX_1.MathX.median(sampleTimes);
            return sampleTime;
        };
        /**
         * Rounds the sampletime
         *
         * @private
         * @static
         * @param {number} sampleTime
         * @returns
         * @memberof CalculatorHelper
         */
        CalculatorHelper.roundSampleTime = function (sampleTime) {
            sampleTime = sampleTime * 20000;
            sampleTime = Math.round(sampleTime);
            sampleTime = sampleTime / 20000;
            return sampleTime;
        };
        /**
         * Checks whether the Y values of a signal contain a non-finite/NaN value.
         *
         * @static
         * @param {Array<IPoint>} signal Signal to be checked.
         * @returns {boolean} Returns true if NaN or +/- Infinity is contained.
         * @memberof CalculatorHelper
         */
        CalculatorHelper.containsNaNOrInfinityInYvalue = function (signal) {
            var containsNaNOrInfinity = false;
            for (var i = 0; i < signal.length && !containsNaNOrInfinity; i++) {
                if (Number.isNaN(signal[i].y) || !Number.isFinite(signal[i].y)) {
                    containsNaNOrInfinity = true;
                }
            }
            return containsNaNOrInfinity;
        };
        /**
         * Returning true if array has NaN or infinity values
         *
         * @public
         * @static
         * @param {Array<number>} signalData
         * @returns {boolean}
         * @memberof StringMathjsCalculator
         */
        CalculatorHelper.arrayHasNaNOrInvinityValues = function (signalData) {
            for (var i = 0; i < signalData.length; i++) {
                if (isNaN(signalData[i]) || !isFinite(signalData[i])) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Checks whether the signal has at least length of minimum
         *
         * @static
         * @param {Array<IPoint>} signal
         * @param {number} [minimum=2] The default minimum is 2.
         * @returns {boolean} Returns true if the signal length is equal or longer than minimum
         * @memberof CalculatorHelper
         */
        CalculatorHelper.isSignalLongerThanMinimum = function (signal, minimum) {
            if (minimum === void 0) { minimum = 2; }
            return signal.length >= minimum;
        };
        /**
         * Checks whether the given CalculationInputData is a signal.
         *
         * @static
         * @param {(Array<IPoint> | number | string)} calculationInputData
         * @returns {calculationInputData is Array<IPoint>}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.calculationInputDataIsSignal = function (calculationInputData) {
            var isSignal = false;
            if (Array.isArray(calculationInputData)) {
                isSignal = true;
            }
            return isSignal;
        };
        /**
         * Checks whether the given CalculationInputData is a number.
         *
         * @static
         * @param {(Array<IPoint> | number | string)} calculationInputData
         * @returns {calculationInputData is number}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.calculationInputDataIsNumber = function (calculationInputData) {
            var isNumber = false;
            if (typeof calculationInputData === "number") {
                isNumber = true;
            }
            return isNumber;
        };
        /**
         * Checks whether the given CalculationInputData is a string.
         *
         * @static
         * @param {(Array<IPoint> | number | string)} calculationInputData
         * @returns {calculationInputData is string}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.calculationInputDataIsString = function (calculationInputData) {
            var isString = false;
            if (typeof calculationInputData === "string") {
                isString = true;
            }
            return isString;
        };
        /**
         * Validates a signal if it has at least two points and only valid (finite, non-NaN) Y values contained.
         *
         * @private
         * @static
         * @param {IPoint[]} signal
         * @returns {boolean} Returns true if signal is valid.
         * @memberof CalculatorHelper
         */
        CalculatorHelper.isValidSignal = function (signal) {
            var isValid = false;
            if (CalculatorHelper.isSignalLongerThanMinimum(signal) && !this.containsNaNOrInfinityInYvalue(signal)) {
                isValid = true;
            }
            return isValid;
        };
        /**
         * Validates a number if it is finite and non-NaN
         *
         * @private
         * @static
         * @param {number} num
         * @returns {boolean} Returns true if number is valid.
         * @memberof CalculatorHelper
         */
        CalculatorHelper.isValidNumber = function (num) {
            var isValid = false;
            if (!Number.isNaN(num) && Number.isFinite(num)) {
                isValid = true;
            }
            return isValid;
        };
        /**
         *
         * Returns the amount of 0 of Y-values in an IPoint Array
         *
         * @public
         * @static
         * @param {Array<IPoint>} arr
         * @returns {number}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.amountOfZerosInIPointArrayInYValues = function (arr) {
            var cnt = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].y == 0) {
                    ++cnt;
                }
            }
            return cnt;
        };
        /**
         * Return true when the Y values of an IPoint Array contain a floating type number
         *
         * @public
         * @static
         * @param {Array<IPoint>} inputSignal
         * @returns {boolean}
         * @memberof calculatorHelper
         */
        CalculatorHelper.iPointArrayHasFloatInYValues = function (inputSignal) {
            for (var i = 0; i < inputSignal.length; i++) {
                if (!Number.isSafeInteger(inputSignal[i].y)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true, when the x values of the IPoint array are strictly monotonically increasing (each value is geater than the previous one).
         *
         * @static
         * @param {Array<IPoint>} inputSignal
         * @returns {boolean}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.isStrictlyMonotonicallyIncreasingInTime = function (inputSignal) {
            return inputSignal.every(function (currentPoint, index, data) {
                return (index !== 0) ? (currentPoint.x > data[index - 1].x) : true;
            });
        };
        /**
        * Split a IPoint Array into X-axis array and Y-axis array
        *
        * @static
        * @param {Array<IPoint>} iPointArrData
        * @returns {SplittedAxisValuesContainer}
        * @memberof CalculatorHelper
        */
        CalculatorHelper.fromIPointArrayToNumberArray = function (iPointArrData) {
            var splittedIPointArr = {
                xArr: new Array(),
                yArr: new Array()
            };
            for (var i = 0; i < iPointArrData.length; i++) {
                splittedIPointArr.xArr.push(iPointArrData[i].x);
                splittedIPointArr.yArr.push(iPointArrData[i].y);
            }
            return splittedIPointArr;
        };
        /**
         * Combining two Number Arrays same length to an Ipoint Array.
         * If the two Number Arrays don't have same size an empty Array gets returned
         *
         * @static
         * @param {Array<number>} arrX
         * @param {Array<number>} arrY
         * @returns {Array<IPoint>}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.fromTwoNumberArrayToIPointArray = function (arrX, arrY) {
            var combinedIPointArr = new Array();
            if (arrX.length == arrY.length) {
                for (var i = 0; i < arrX.length; i++) {
                    var point = new point_1.Point(arrX[i], arrY[i]);
                    combinedIPointArr.push(point);
                }
            }
            return combinedIPointArr;
        };
        return CalculatorHelper;
    }());
    exports.CalculatorHelper = CalculatorHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvckhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvY2FsY3VsYXRvckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFXQTs7OztPQUlHO0lBQ0g7UUFHSTs7OztXQUlHO1FBQ0g7UUFBdUIsQ0FBQztRQUFBLENBQUM7UUFHekI7Ozs7Ozs7V0FPRztRQUNXLDZDQUE0QixHQUExQyxVQUEyQyxTQUFtQztZQUUxRSxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFFM0IsSUFBSSxNQUFNLEdBQTRCLFNBQVMsQ0FBQyxDQUFDLENBQXFCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakYsSUFBSSxNQUFNLEdBQTRCLFNBQVMsQ0FBQyxDQUFDLENBQXFCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFakYsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO21CQUMzQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxFQUFFLHlFQUF5RTtnQkFFeEgsSUFBSSxhQUFhLEdBQTRCO29CQUN6QyxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsV0FBVyxFQUFFLE1BQU07aUJBQ3RCLENBQUM7Z0JBRUYsYUFBYSxHQUFHLGdCQUFnQixDQUFDLDRCQUE0QixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUU3RSxnR0FBZ0c7Z0JBQ2hHLElBQUksV0FBVyxHQUFHLElBQUksNkNBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUss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QyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzthQUNKO1lBRUQsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBMVlELElBMFlDO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IE1hdGhYIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9tYXRoL21hdGhYXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEsIENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuXHJcbi8vVHlwZSBhbGlhcyB0byBwcm92aWRlIGEgbmFtZSBmb3Igc3RydWN0dXJlIHJldHVybmUgYnkgZ2F0aGVyU2FtcGxlc1dpdGhTYW1lVGltZXN0YW1wXHJcbnR5cGUgVHdvUG9pbnRBcnJheXNDb250YWluZXIgPSB7IHBvaW50QXJyYXkxOiBBcnJheTxJUG9pbnQ+LCBwb2ludEFycmF5MjogQXJyYXk8SVBvaW50Pn07XHJcblxyXG50eXBlIFNwbGl0dGVkQXhpc1ZhbHVlc0NvbnRhaW5lciA9IHt4QXJyOiBBcnJheTxudW1iZXI+LCB5QXJyOiBBcnJheTxudW1iZXI+fTtcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgZm9yIGNhbGN1bGF0b3IgdG8gcHJvdmlkZSBjb21tb24gZnVuY3Rpb25hbGl0aWVzIG9ubHkgdXNlZCBpbiBzb21lIGNhbGN1bGF0b3JzLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ2FsY3VsYXRvckhlbHBlclxyXG4gKi9cclxuY2xhc3MgQ2FsY3VsYXRvckhlbHBlciB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igc2V0IHRvIHByaXZhdGUgYXMgSGVscGVyIGNsYXNzIHNob3VsZCBvbmx5IHByb3ZpZGUgc3RhdGljIGhlbHBlciBmdW5jdGlvbnMuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENhbGN1bGF0b3JIZWxwZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsdGVycyB0d28gaW5wdXQgc2lnbmFscyBmb3IgbWF0Y2hpbmcgc2lnbmFsIHBhcnRzLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KX0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KX1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJ5RmlsdGVyTWF0Y2hpbmdTaWduYWxQYXJ0cyhpbnB1dERhdGE6ICBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPik6ICBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gaW5wdXREYXRhO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXQxOiBzdHJpbmd8bnVtYmVyfElQb2ludFtdID0gKGlucHV0RGF0YVswXSBhcyBDYWxjdWxhdGlvbkRhdGEpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgaW5wdXQyOiBzdHJpbmd8bnVtYmVyfElQb2ludFtdID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGEpLmdldERhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShpbnB1dDEpICYmIEFycmF5LmlzQXJyYXkoaW5wdXQyKSBcclxuICAgICAgICAgICAgJiYgaW5wdXQxLmxlbmd0aCA+PSAyICYmIGlucHV0Mi5sZW5ndGggPj0gMikgeyAvLyBvbmx5IGZpbHRlciBmb3IgbWF0Y2hpbmcgc2lnbmFsIHBhcnRzIGlmIGJvdGggaW5wdXRzIGFyZSB2YWxpZCBzaWduYWxzXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGF0YUNvbnRhaW5lcjogVHdvUG9pbnRBcnJheXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludEFycmF5MTogaW5wdXQxLFxyXG4gICAgICAgICAgICAgICAgcG9pbnRBcnJheTI6IGlucHV0MlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZGF0YUNvbnRhaW5lciA9IENhbGN1bGF0b3JIZWxwZXIuZmlsdGVyTWF0Y2hpbmdQb2ludHNCeVh2YWx1ZShkYXRhQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vY3JlYXRlIG5ldyBjYWxjdWxhdGlvbiBkYXRhIHBvaW50cyB3aXRoIGZpbHRlcmVkIHNpZ25hbHMgdG8gY3V0IHRoZSBjb25uZWN0aW9uIHdpdGggaW5wdXQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgZGF0YVBvaW50czEgPSBuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKGlucHV0RGF0YVswXS5pZCwgaW5wdXREYXRhWzBdLmdldERpc3BsYXlOYW1lKCksIGlucHV0RGF0YVswXS52YWx1ZSwgZGF0YUNvbnRhaW5lci5wb2ludEFycmF5MSwgaW5wdXREYXRhWzBdLmRlc2NyaXB0aW9uLCBpbnB1dERhdGFbMF0uZGlzcGxheUluZm8gKTtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludHMyID0gbmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhpbnB1dERhdGFbMV0uaWQsIGlucHV0RGF0YVsxXS5nZXREaXNwbGF5TmFtZSgpLCBpbnB1dERhdGFbMV0udmFsdWUsIGRhdGFDb250YWluZXIucG9pbnRBcnJheTIsIGlucHV0RGF0YVsxXS5kZXNjcmlwdGlvbiwgaW5wdXREYXRhWzFdLmRpc3BsYXlJbmZvICk7XHJcblxyXG4gICAgICAgICAgICBvdXRwdXREYXRhID0gbmV3IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvdXRwdXREYXRhLnB1c2goZGF0YVBvaW50czEpO1xyXG4gICAgICAgICAgICBvdXRwdXREYXRhLnB1c2goZGF0YVBvaW50czIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdhdGhlcnMgU2FtcGxlcyBvZiBzYW1lIHRpbWVzdGFtcCBmcm9tIHR3byBzaWduYWxzLlxyXG4gICAgICogVXNlZCB0byBmaWx0ZXIgdHdvIHNpZ25hbHMgZm9yIG9ubHkgdGhlIG1hdGNoaW5nIHBhcnRzIG9mIHRoZSBzaWduYWwgKGJ5IHRpbWVzdGFtcCkuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtUd29Qb2ludEFycmF5c0NvbnRhaW5lcn0gaW5wdXRcclxuICAgICAqIEByZXR1cm5zIHtUd29Qb2ludEFycmF5c0NvbnRhaW5lcn0gTWF0Y2hpbmcgc2lnbmFsIHBhcnRzIGJhc2VkIG9uIHRpbWVzdGFtcC5cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmlsdGVyTWF0Y2hpbmdQb2ludHNCeVh2YWx1ZShpbnB1dDogVHdvUG9pbnRBcnJheXNDb250YWluZXIpOiBUd29Qb2ludEFycmF5c0NvbnRhaW5lciB7XHJcblxyXG4gICAgICAgIGxldCBnYXRoZXJlZFBvaW50czogVHdvUG9pbnRBcnJheXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgICAgIHBvaW50QXJyYXkxOiBuZXcgQXJyYXk8SVBvaW50PigpLFxyXG4gICAgICAgICAgICBwb2ludEFycmF5MjogbmV3IEFycmF5PElQb2ludD4oKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBpOiBudW1iZXI9MDtcclxuICAgICAgICBsZXQgajogbnVtYmVyPTA7XHJcblxyXG4gICAgICAgIC8vZXh0cmFjdCBzYW1wbGVzIHdpdGggbWF0Y2hpbmcgdGltZXN0YW1wcyBieSBpdGVyYXRpbmcgYm90aCBzaWduYWxzIGF0IG9uY2UuXHJcbiAgICAgICAgLy93b3JzdCBjYXNlIGl0ZXJhdGlvbiBhbW91bnQgaXMgbGVuZ3RoIG9mIGlucHV0MSArIGxlbmd0aCBvZiBpbnB1dDIuXHJcbiAgICAgICAgd2hpbGUgKGkgPCBpbnB1dC5wb2ludEFycmF5MS5sZW5ndGggJiYgaiA8IGlucHV0LnBvaW50QXJyYXkyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGlucHV0LnBvaW50QXJyYXkxW2ldLnggPCBpbnB1dC5wb2ludEFycmF5MltqXS54KSB7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXQucG9pbnRBcnJheTFbaV0ueCA+IGlucHV0LnBvaW50QXJyYXkyW2pdLngpIHtcclxuICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdhdGhlcmVkUG9pbnRzLnBvaW50QXJyYXkxLnB1c2goaW5wdXQucG9pbnRBcnJheTFbaV0pO1xyXG4gICAgICAgICAgICAgICAgZ2F0aGVyZWRQb2ludHMucG9pbnRBcnJheTIucHVzaChpbnB1dC5wb2ludEFycmF5MltqXSk7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICBqKys7ICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZ2F0aGVyZWRQb2ludHM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVzdGltYXRlcyB0aGUgc2FtcGxlIHRpbWUgdG8gcmVtb3ZlIGppdHRlcmJhc2VkIG9uIG1lZGlhbiBhbmQgcm91bmRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBlc3RpbWF0ZVNhbXBsZVRpbWUoc2lnbmFsRGF0YTogQXJyYXk8SVBvaW50Pik6IG51bWJlcnsgICAgICAgIFxyXG4gICAgICAgIGxldCBzYW1wbGVUaW1lID0gdGhpcy5nZXRNZWRpYW5PZlNhbXBsZVRpbWUoc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgc2FtcGxlVGltZSA9IHRoaXMucm91bmRTYW1wbGVUaW1lKHNhbXBsZVRpbWUpO1xyXG4gICAgICAgIHJldHVybiBzYW1wbGVUaW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG1lZGlhbiBvZiB0aGUgc2FtcGxldGltZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TWVkaWFuT2ZTYW1wbGVUaW1lKHNpZ25hbERhdGE6IEFycmF5PElQb2ludD4pOm51bWJlcntcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2FtcGxlVGltZXMgOiBBcnJheTxudW1iZXI+PSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHNpZ25hbERhdGEubGVuZ3RoLTE7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzYW1wbGVUaW1lID0gc2lnbmFsRGF0YVtpKzFdLnggLSBzaWduYWxEYXRhW2ldLng7XHJcbiAgICAgICAgICAgIHNhbXBsZVRpbWVzLnB1c2goc2FtcGxlVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2FtcGxlVGltZSA9IE1hdGhYLm1lZGlhbihzYW1wbGVUaW1lcyk7ICAgICBcclxuXHJcbiAgICAgICAgcmV0dXJuIHNhbXBsZVRpbWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUm91bmRzIHRoZSBzYW1wbGV0aW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzYW1wbGVUaW1lXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcm91bmRTYW1wbGVUaW1lKHNhbXBsZVRpbWUgOiBudW1iZXIpe1xyXG4gICAgICAgIHNhbXBsZVRpbWUgPSBzYW1wbGVUaW1lKjIwMDAwO1xyXG4gICAgICAgIHNhbXBsZVRpbWUgPSBNYXRoLnJvdW5kKHNhbXBsZVRpbWUpO1xyXG4gICAgICAgIHNhbXBsZVRpbWUgPSBzYW1wbGVUaW1lLzIwMDAwO1xyXG4gICAgICAgIHJldHVybiBzYW1wbGVUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFkgdmFsdWVzIG9mIGEgc2lnbmFsIGNvbnRhaW4gYSBub24tZmluaXRlL05hTiB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbCBTaWduYWwgdG8gYmUgY2hlY2tlZC5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgTmFOIG9yICsvLSBJbmZpbml0eSBpcyBjb250YWluZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbnRhaW5zTmFOT3JJbmZpbml0eUluWXZhbHVlKHNpZ25hbDogQXJyYXk8SVBvaW50PikgOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRhaW5zTmFOT3JJbmZpbml0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2lnbmFsLmxlbmd0aCAmJiAhY29udGFpbnNOYU5PckluZmluaXR5OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmKE51bWJlci5pc05hTihzaWduYWxbaV0ueSkgfHwgIU51bWJlci5pc0Zpbml0ZShzaWduYWxbaV0ueSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5zTmFOT3JJbmZpbml0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluc05hTk9ySW5maW5pdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5pbmcgdHJ1ZSBpZiBhcnJheSBoYXMgTmFOIG9yIGluZmluaXR5IHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gc2lnbmFsRGF0YVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFycmF5SGFzTmFOT3JJbnZpbml0eVZhbHVlcyhzaWduYWxEYXRhOiBBcnJheTxudW1iZXI+KTogYm9vbGVhbiB7IFxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2lnbmFsRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihpc05hTihzaWduYWxEYXRhW2ldKSB8fCAhaXNGaW5pdGUoc2lnbmFsRGF0YVtpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBzaWduYWwgaGFzIGF0IGxlYXN0IGxlbmd0aCBvZiBtaW5pbXVtXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbWluaW11bT0yXSBUaGUgZGVmYXVsdCBtaW5pbXVtIGlzIDIuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzaWduYWwgbGVuZ3RoIGlzIGVxdWFsIG9yIGxvbmdlciB0aGFuIG1pbmltdW1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNTaWduYWxMb25nZXJUaGFuTWluaW11bShzaWduYWw6IEFycmF5PElQb2ludD4sIG1pbmltdW06IG51bWJlciA9IDIpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNpZ25hbC5sZW5ndGggPj0gbWluaW11bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBDYWxjdWxhdGlvbklucHV0RGF0YSBpcyBhIHNpZ25hbC5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxJUG9pbnQ+IHwgbnVtYmVyIHwgc3RyaW5nKX0gY2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtjYWxjdWxhdGlvbklucHV0RGF0YSBpcyBBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGNhbGN1bGF0aW9uSW5wdXREYXRhOiBBcnJheTxJUG9pbnQ+IHwgbnVtYmVyIHwgc3RyaW5nKTogY2FsY3VsYXRpb25JbnB1dERhdGEgaXMgQXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlzU2lnbmFsID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoY2FsY3VsYXRpb25JbnB1dERhdGEpKXtcclxuICAgICAgICAgICAgaXNTaWduYWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gaXNTaWduYWw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBDYWxjdWxhdGlvbklucHV0RGF0YSBpcyBhIG51bWJlci5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxJUG9pbnQ+IHwgbnVtYmVyIHwgc3RyaW5nKX0gY2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtjYWxjdWxhdGlvbklucHV0RGF0YSBpcyBudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoY2FsY3VsYXRpb25JbnB1dERhdGE6IEFycmF5PElQb2ludD4gfCBudW1iZXIgfCBzdHJpbmcpOiBjYWxjdWxhdGlvbklucHV0RGF0YSBpcyBudW1iZXIge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpc051bWJlciA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgY2FsY3VsYXRpb25JbnB1dERhdGEgPT09IFwibnVtYmVyXCIpe1xyXG4gICAgICAgICAgICBpc051bWJlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBpc051bWJlcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIENhbGN1bGF0aW9uSW5wdXREYXRhIGlzIGEgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElQb2ludD4gfCBudW1iZXIgfCBzdHJpbmcpfSBjYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge2NhbGN1bGF0aW9uSW5wdXREYXRhIGlzIHN0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhjYWxjdWxhdGlvbklucHV0RGF0YTogQXJyYXk8SVBvaW50PiB8IG51bWJlciB8IHN0cmluZyk6IGNhbGN1bGF0aW9uSW5wdXREYXRhIGlzIHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlzU3RyaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBjYWxjdWxhdGlvbklucHV0RGF0YSA9PT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgICAgIGlzU3RyaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGVzIGEgc2lnbmFsIGlmIGl0IGhhcyBhdCBsZWFzdCB0d28gcG9pbnRzIGFuZCBvbmx5IHZhbGlkIChmaW5pdGUsIG5vbi1OYU4pIFkgdmFsdWVzIGNvbnRhaW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gc2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHNpZ25hbCBpcyB2YWxpZC5cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNWYWxpZFNpZ25hbChzaWduYWw6IElQb2ludFtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5pc1NpZ25hbExvbmdlclRoYW5NaW5pbXVtKHNpZ25hbCkgJiYgIXRoaXMuY29udGFpbnNOYU5PckluZmluaXR5SW5ZdmFsdWUoc2lnbmFsKSkge1xyXG4gICAgICAgICAgICBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGVzIGEgbnVtYmVyIGlmIGl0IGlzIGZpbml0ZSBhbmQgbm9uLU5hTlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIG51bWJlciBpcyB2YWxpZC5cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNWYWxpZE51bWJlcihudW06IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZighTnVtYmVyLmlzTmFOKG51bSkgJiYgTnVtYmVyLmlzRmluaXRlKG51bSkpIHtcclxuICAgICAgICAgICAgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogUmV0dXJucyB0aGUgYW1vdW50IG9mIDAgb2YgWS12YWx1ZXMgaW4gYW4gSVBvaW50IEFycmF5XHJcbiAgICAgKiBcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gYXJyIFxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFtb3VudE9mWmVyb3NJbklQb2ludEFycmF5SW5ZVmFsdWVzKGFycjogQXJyYXk8SVBvaW50Pik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNudDogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGFycltpXS55ID09IDApIHtcclxuICAgICAgICAgICAgICAgICsrY250O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSB3aGVuIHRoZSBZIHZhbHVlcyBvZiBhbiBJUG9pbnQgQXJyYXkgY29udGFpbiBhIGZsb2F0aW5nIHR5cGUgbnVtYmVyXHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgY2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlQb2ludEFycmF5SGFzRmxvYXRJbllWYWx1ZXMoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pIDogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihpbnB1dFNpZ25hbFtpXS55KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSwgd2hlbiB0aGUgeCB2YWx1ZXMgb2YgdGhlIElQb2ludCBhcnJheSBhcmUgc3RyaWN0bHkgbW9ub3RvbmljYWxseSBpbmNyZWFzaW5nIChlYWNoIHZhbHVlIGlzIGdlYXRlciB0aGFuIHRoZSBwcmV2aW91cyBvbmUpLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1N0cmljdGx5TW9ub3RvbmljYWxseUluY3JlYXNpbmdJblRpbWUoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5wdXRTaWduYWwuZXZlcnkoKGN1cnJlbnRQb2ludCwgaW5kZXgsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoaW5kZXggIT09IDApID8gKGN1cnJlbnRQb2ludC54ID4gZGF0YVtpbmRleC0xXS54KSA6IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIFNwbGl0IGEgSVBvaW50IEFycmF5IGludG8gWC1heGlzIGFycmF5IGFuZCBZLWF4aXMgYXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlQb2ludEFyckRhdGFcclxuICAgICAqIEByZXR1cm5zIHtTcGxpdHRlZEF4aXNWYWx1ZXNDb250YWluZXJ9IFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tSVBvaW50QXJyYXlUb051bWJlckFycmF5KGlQb2ludEFyckRhdGE6IEFycmF5PElQb2ludD4pOiBTcGxpdHRlZEF4aXNWYWx1ZXNDb250YWluZXJ7IFxyXG5cclxuICAgICAgICBsZXQgc3BsaXR0ZWRJUG9pbnRBcnI6IFNwbGl0dGVkQXhpc1ZhbHVlc0NvbnRhaW5lciA9IHtcclxuICAgICAgICAgICAgeEFycjogbmV3IEFycmF5PG51bWJlcj4oKSxcclxuICAgICAgICAgICAgeUFycjogbmV3IEFycmF5PG51bWJlcj4oKSBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaVBvaW50QXJyRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzcGxpdHRlZElQb2ludEFyci54QXJyLnB1c2goaVBvaW50QXJyRGF0YVtpXS54KTtcclxuICAgICAgICAgICAgc3BsaXR0ZWRJUG9pbnRBcnIueUFyci5wdXNoKGlQb2ludEFyckRhdGFbaV0ueSk7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHNwbGl0dGVkSVBvaW50QXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tYmluaW5nIHR3byBOdW1iZXIgQXJyYXlzIHNhbWUgbGVuZ3RoIHRvIGFuIElwb2ludCBBcnJheS5cclxuICAgICAqIElmIHRoZSB0d28gTnVtYmVyIEFycmF5cyBkb24ndCBoYXZlIHNhbWUgc2l6ZSBhbiBlbXB0eSBBcnJheSBnZXRzIHJldHVybmVkXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBhcnJYXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGFycllcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tVHdvTnVtYmVyQXJyYXlUb0lQb2ludEFycmF5KGFyclg6IEFycmF5PG51bWJlcj4sIGFyclk6IEFycmF5PG51bWJlcj4pOiBBcnJheTxJUG9pbnQ+eyBcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29tYmluZWRJUG9pbnRBcnIgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBpZihhcnJYLmxlbmd0aCA9PSBhcnJZLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyWC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gbmV3IFBvaW50KGFyclhbaV0sIGFycllbaV0pO1xyXG4gICAgICAgICAgICAgICAgY29tYmluZWRJUG9pbnRBcnIucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21iaW5lZElQb2ludEFycjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9OyJdfQ==
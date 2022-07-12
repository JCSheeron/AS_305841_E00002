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
define(["require", "exports", "../calculationDataNumberOrPoints", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "../calculationDataString", "../../../../libs/math/mathjs", "../mathjsWrapper", "../mathjsHtmlConverter", "./calculatorHelper"], function (require, exports, calculationDataNumberOrPoints_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculationDataString_1, math, mathjsWrapper_1, mathjsHtmlConverter_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StringMathjsCalculator = /** @class */ (function (_super) {
        __extends(StringMathjsCalculator, _super);
        function StringMathjsCalculator() {
            var _this = _super.call(this, "stringmathjs", "Math expression", "Calculates separated values and time as mathematical expression") || this;
            _this.inputStringYId = "CalculatingValues";
            _this.inputStringXId = "CalculatingTime";
            _this.inputSignalAId = "InputSignalOrNumberA";
            _this.inputSignalBId = "InputSignalOrNumberB";
            _this.inputSignalCId = "InputSignalOrNumberC";
            _this.inputSignalDId = "InputSignalOrNumberD";
            _this.inputSignalEId = "InputSignalOrNumberE";
            _this.inputStringYName = "Calculating values";
            _this.inputStringXName = "Calculating time";
            _this.inputSignalAName = "Input signal or number a";
            _this.inputSignalBName = "Input signal or number b";
            _this.inputSignalCName = "Input signal or number c";
            _this.inputSignalDName = "Input signal or number d";
            _this.inputSignalEName = "Input signal or number e";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "math expression";
            _this.inputStringDescripion = "Mathematical expression expected";
            _this._mathJSLib = mathjsWrapper_1.MathjsWrapper.getInstance();
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {Array<TCalculationData>}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.getDefaultInputData = function () {
            var inputData = _super.prototype.getDefaultInputData.call(this);
            // convert the received input strings to a display value with math.js specific html for enabling syntax highlighting
            var stringInputData1 = new calculationDataString_1.CalculationDataString(this.inputStringYId, this.inputStringYName, this.inputStringDescripion, "Calculates mathematical formulas from the math.js library for the y values", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false));
            stringInputData1.valueConverter = new mathjsHtmlConverter_1.MathjsHtmlConverter(this.inputStringDescripion);
            inputData.push(stringInputData1);
            var stringInputData2 = new calculationDataString_1.CalculationDataString(this.inputStringXId, this.inputStringXName, this.inputStringDescripion, "Calculates mathematical formulas from the math.js library for the x values", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false));
            stringInputData2.valueConverter = new mathjsHtmlConverter_1.MathjsHtmlConverter(this.inputStringDescripion);
            inputData.push(stringInputData2);
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalAId, this.inputSignalAName, 0, "Input is a signal: a.value, a.time and a.sampleTime can be used for the calculation; Input is a number: a can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalBId, this.inputSignalBName, 0, "Input is a Signal: b.value, b.time and b.sampleTime can be used for the calculation; Input is a number: b can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalCId, this.inputSignalCName, 0, "Input is a Signal: c.value, c.time and c.sampleTime can be used for the calculation; Input is a number: c can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalDId, this.inputSignalDName, 0, "Input is a Signal: d.value, d.time and d.sampleTime can be used for the calculation; Input is a number: d can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalEId, this.inputSignalEName, 0, "Input is a Signal: e.value, e.time and e.sampleTime can be used for the calculation; Input is a number: e can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof stringMathjsCalculator
         */
        StringMathjsCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return outputData;
        };
        StringMathjsCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            //retrieve calculation input data
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var stringDataY = calculationInputDataContainer[0];
            var stringDataX = calculationInputDataContainer[1];
            // check if all input data are valid
            if (stringDataY === undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataY.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringYName]);
            }
            if (stringDataX === undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataX.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringXName]);
            }
            for (var i = 2; i < calculationInputDataContainer.length; i++) {
                var calculationInputData = calculationInputDataContainer[i];
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(calculationInputData.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                }
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataY.data) && stringDataY.data === this.inputStringDescripion) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringYName]);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataX.data) && stringDataX.data === this.inputStringDescripion) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringXName]);
            }
        };
        StringMathjsCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            // retrieve calculation input data and initialize result
            var calculationInputData = this.getCalculationInputDataContainer();
            var result = new Array();
            // prepare the input data for calculation
            var stringDataY = calculationInputData[0];
            var stringDataX = calculationInputData[1];
            var signalData = new Array();
            for (var i = 2; i < calculationInputData.length; i++) {
                var data = calculationInputData[i].data;
                if (!calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(data)) {
                    signalData.push(data);
                }
            }
            // Execute the calculation of the stringMathjsCalculator
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataY.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataX.data)) {
                result = this.calculateString(stringDataY.data, stringDataX.data, signalData);
            }
            // add the result of the calculation to the calculationOutpuContainer
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName,
                id: this.outputId
            });
        };
        /**
         * Calculate mathematical expressions with the given data
         *
         * @private
         * @param {string} stringDataY
         * @param {string} stringDataX
         * @param {Array<IPoint[] | number>} signalData
         * @returns {Array<IPoint>}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.calculateString = function (stringDataY, stringDataX, signalData) {
            var output = new Array();
            // Receive the results of the calculation for both axis
            var resultX = this.evaluateString(stringDataX, signalData);
            var resultY = this.evaluateString(stringDataY, signalData);
            // If in both axis no errors occured during calculating, then they get combined to an IPoint Array
            if (!this.hasErrors()) {
                output = calculatorHelper_1.CalculatorHelper.fromTwoNumberArrayToIPointArray(resultX, resultY);
                if (output.length === 0) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.ArraysHaveDifferentLength, ["Calculating values and calculating time"]);
                }
            }
            return output;
        };
        StringMathjsCalculator.prototype.verifyCalculationOutputData = function () {
            var _this = this;
            _super.prototype.verifyCalculationOutputData.call(this);
            var calculationOutputDataContainer = this.getCalculationOutputDataContainer();
            // checks if the calculation time values are strictly monotonically increasing
            calculationOutputDataContainer.forEach(function (calculationOutputData) {
                if (!calculatorHelper_1.CalculatorHelper.isStrictlyMonotonicallyIncreasingInTime(calculationOutputData.data)) {
                    _this.addErrorByType(calculatorBase_1.ErrorMessageType.NotStrictlyMonotonicallyIncreasingInTime, [calculationOutputData.name]);
                }
            });
        };
        /**
         * Calculate the string value with mathjs lib and match to the inputsignal or constant
         * @private
         * @param {string} str
         * @param {Array<IPoint[] | number>} signalData
         * @returns {number | Array<number>}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.evaluateString = function (str, signalData) {
            var arrResult = new Array();
            try {
                var code = this._mathJSLib.limitedParse(str);
                // Add the input signal data to the scope for evaluating
                var scope = {
                    a: this.getScopeObjectOrValue(signalData[0]),
                    b: this.getScopeObjectOrValue(signalData[1]),
                    c: this.getScopeObjectOrValue(signalData[2]),
                    d: this.getScopeObjectOrValue(signalData[3]),
                    e: this.getScopeObjectOrValue(signalData[4])
                };
                var compiledCode = code.compile();
                var result = compiledCode.evaluate(scope);
                // The evaluate function can lead to several different resulting datatypes, but only arrays of numbers can be used later
                arrResult = this.convertMathjsResultTypeToArray(result);
            }
            catch (error) {
                this.addError("Error in expression: " + str + "!\n" + error.name + ": " + error.message + "!");
            }
            return arrResult;
        };
        /**
        * Check the datatype of the evaluated mathjs result and convert it to an Number Array if possible
        * Throws errors if they are not valid
        *
        * @private
        * @param {any} result
        * @returns {Array<number>}
        * @memberof StringMathjsCalculator
        */
        StringMathjsCalculator.prototype.convertMathjsResultTypeToArray = function (result) {
            //get the matrix or array value from a multiline expression
            if (math.typeOf(result) == 'ResultSet') {
                if (!result.hasOwnProperty('entries')) {
                    this.mathjsResultTypeError('Result is a invalid ResultSet', 'The result of the expression is invalid');
                }
                result = result.entries[0];
            }
            //get the array from the matrix
            if (math.typeOf(result) == 'Matrix') {
                if (result._size.length != 1) {
                    this.mathjsResultTypeError('Result is a multidimensional matrix', 'The result of the expression is not allowed to be a multidimensional matrix');
                }
                result = result._data;
            }
            this.checkForInvalidDataType(result);
            return result;
        };
        /**
        * Check if the datatype of the evaluated mathjs result is valid
        * Throws errors if they are not valid
        * @private
        * @param {any} result
        * @memberof StringMathjsCalculator
        */
        StringMathjsCalculator.prototype.checkForInvalidDataType = function (result) {
            switch (math.typeOf(result)) {
                case 'undefined': this.mathjsResultTypeError('Result is undefined', 'The result of the expression is not allowed to be undefined');
                case 'number': this.mathjsResultTypeError('Result is a number', 'The result of the expression is not allowed to be a number');
                case 'boolean': this.mathjsResultTypeError('Result is a boolean', 'The result of the expression is not allowed to be a single boolean');
                case 'null': this.mathjsResultTypeError('Result is null', 'The result of the expression is not allowed to be null');
                case 'Array':
                    if (calculatorHelper_1.CalculatorHelper.arrayHasNaNOrInvinityValues(result)) {
                        this.mathjsResultTypeError('Result is an array with NaN or invinity values', 'The result of the expression is not allowed to be an array with NaN or invinity values');
                    }
                    break;
                default: this.mathjsResultTypeError('Result is invalid', 'The result of the expression is invalid');
            }
        };
        /**
         * Returns the suitable object for the evaluation scope of math.js
         *
         * @private
         * @param {IPoint[] | number} signalData
         * @returns {any}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.getScopeObjectOrValue = function (signalData) {
            //Scope for a number
            if (signalData != undefined && !Array.isArray(signalData)) {
                return signalData;
            }
            //Scope for a signal
            else if (signalData != undefined && Array.isArray(signalData)) {
                var splittedSignal = calculatorHelper_1.CalculatorHelper.fromIPointArrayToNumberArray(signalData);
                return {
                    value: splittedSignal.yArr,
                    time: splittedSignal.xArr,
                    sampleTime: calculatorHelper_1.CalculatorHelper.estimateSampleTime(signalData)
                };
            }
        };
        /**
         * method for generalize throw messages for invalid calculation results
         *
         * @private
         * @param {string} errorName
         * @param {string} errorMessage
         * @returns {never}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.mathjsResultTypeError = function (errorName, errorMessage) {
            throw { name: errorName, data: errorMessage };
        };
        return StringMathjsCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.StringMathjsCalculator = StringMathjsCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nTWF0aGpzQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvc3RyaW5nTWF0aGpzQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBNEMsMENBQWM7UUF5QnREO1lBQUEsWUFDSSxrQkFBTSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsaUVBQWlFLENBQUMsU0FFOUc7WUExQk8sb0JBQWMsR0FBVyxtQkFBbUIsQ0FBQztZQUM3QyxvQkFBYyxHQUFXLGlCQUFpQixDQUFDO1lBQzNDLG9CQUFjLEdBQVcsc0JBQXNCLENBQUM7WUFDaEQsb0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztZQUNoRCxvQkFBYyxHQUFXLHNCQUFzQixDQUFDO1lBQ2hELG9CQUFjLEdBQVcsc0JBQXNCLENBQUM7WUFDaEQsb0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztZQUNoRCxzQkFBZ0IsR0FBVyxvQkFBb0IsQ0FBQztZQUNoRCxzQkFBZ0IsR0FBVyxrQkFBa0IsQ0FBQztZQUM5QyxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUN0RCxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUN0RCxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUN0RCxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUN0RCxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUV0RCxjQUFRLEdBQVcsY0FBYyxDQUFDO1lBQ2xDLGdCQUFVLEdBQUcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQUcsaUJBQWlCLENBQUM7WUFFaEMsMkJBQXFCLEdBQVcsa0NBQWtDLENBQUM7WUFNdkUsS0FBSSxDQUFDLFVBQVUsR0FBRyw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNsRCxDQUFDO1FBQ0Q7Ozs7O1dBS0c7UUFDSSxvREFBbUIsR0FBMUI7WUFDSSxJQUFJLFNBQVMsR0FBNEIsaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUVyRSxvSEFBb0g7WUFDcEgsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSw0RUFBNEUsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JQLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxJQUFJLHlDQUFtQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3RGLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNqQyxJQUFJLGdCQUFnQixHQUFHLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLDRFQUE0RSxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDclAsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLElBQUkseUNBQW1CLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdEYsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRWpDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsMklBQTJJLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsMklBQTJJLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsMklBQTJJLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsMklBQTJJLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsMklBQTJJLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNSLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHFEQUFvQixHQUEzQjtZQUVJLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO1lBRXBELDhDQUE4QztZQUM5QyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEgsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUdTLDJEQUEwQixHQUFwQztZQUNJLGlCQUFNLDBCQUEwQixXQUFFLENBQUM7WUFFbkMsaUNBQWlDO1lBQ2pDLElBQUksNkJBQTZCLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7WUFFNUUsSUFBSSxXQUFXLEdBQUcsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxXQUFXLEdBQUcsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkQsb0NBQW9DO1lBQ3BDLElBQUcsV0FBVyxLQUFLLFNBQVMsSUFBSSxDQUFDLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDN0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQ0FBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7YUFDeEY7WUFDRCxJQUFHLFdBQVcsS0FBSyxTQUFTLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQzdGLElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2FBQ3hGO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDMUQsSUFBSSxvQkFBb0IsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsSUFBRyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQ0FBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzVGO2FBQ0o7WUFDRCxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQztnQkFDaEIsT0FBTzthQUNWO1lBQ0QsSUFBRyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMscUJBQXFCLEVBQUM7Z0JBQ2xILElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2FBQ3hGO1lBQ0QsSUFBRyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMscUJBQXFCLEVBQUM7Z0JBQ2xILElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2FBQ3hGO1FBQ0wsQ0FBQztRQUVTLGlEQUFnQixHQUExQjtZQUNJLGlCQUFNLGdCQUFnQixXQUFFLENBQUE7WUFFeEIsd0RBQXdEO1lBQ3hELElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7WUFDbkUsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUVqQyx5Q0FBeUM7WUFDekMsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxVQUFVLEdBQWdDLElBQUksS0FBSyxFQUF3QixDQUFDO1lBQ2hGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ2pELElBQUksSUFBSSxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEMsSUFBRyxDQUFDLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNyRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN6QjthQUNKO1lBRUQsd0RBQXdEO1lBQ3hELElBQUcsbUNBQWdCLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbkksTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ2pGO1lBRUQscUVBQXFFO1lBQ3JFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztnQkFDMUIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQ3JCLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUTthQUNwQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBR0Q7Ozs7Ozs7OztXQVNHO1FBQ0ssZ0RBQWUsR0FBdkIsVUFBd0IsV0FBbUIsRUFBRSxXQUFtQixFQUFFLFVBQW9DO1lBRWxHLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFakMsdURBQXVEO1lBQ3ZELElBQUksT0FBTyxHQUFrQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMxRSxJQUFJLE9BQU8sR0FBa0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFMUUsa0dBQWtHO1lBQ2xHLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUM7Z0JBQ2pCLE1BQU0sR0FBRyxtQ0FBZ0IsQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzVFLElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMseUJBQXlCLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hIO2FBQ0o7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRVMsNERBQTJCLEdBQXJDO1lBQUEsaUJBV0M7WUFWRyxpQkFBTSwyQkFBMkIsV0FBRSxDQUFDO1lBRXBDLElBQUksOEJBQThCLEdBQUcsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7WUFFOUUsOEVBQThFO1lBQzlFLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxVQUFDLHFCQUFxQjtnQkFDekQsSUFBRyxDQUFDLG1DQUFnQixDQUFDLHVDQUF1QyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0RixLQUFJLENBQUMsY0FBYyxDQUFDLGlDQUFnQixDQUFDLHdDQUF3QyxFQUFFLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDaEg7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssK0NBQWMsR0FBdEIsVUFBdUIsR0FBVyxFQUFFLFVBQW9DO1lBRXBFLElBQUksU0FBUyxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO1lBRW5ELElBQUk7Z0JBRUEsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTdDLHdEQUF3RDtnQkFDeEQsSUFBSSxLQUFLLEdBQUc7b0JBQ1IsQ0FBQyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLENBQUMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxDQUFDLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLENBQUMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQyxDQUFBO2dCQUNELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUMsd0hBQXdIO2dCQUN4SCxTQUFTLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsT0FBTyxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDbEc7WUFFRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUE7Ozs7Ozs7O1VBUUU7UUFDSywrREFBOEIsR0FBdEMsVUFBdUMsTUFBVztZQUM5QywyREFBMkQ7WUFDM0QsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRTtnQkFDbkMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQywrQkFBK0IsRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDO2lCQUMxRztnQkFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUNELCtCQUErQjtZQUMvQixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxFQUFFO2dCQUNoQyxJQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztvQkFDeEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHFDQUFxQyxFQUFFLDZFQUE2RSxDQUFDLENBQUM7aUJBQ3BKO2dCQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFHQTs7Ozs7O1VBTUU7UUFDSyx3REFBdUIsR0FBL0IsVUFBZ0MsTUFBVztZQUN2QyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixFQUFFLDZEQUE2RCxDQUFDLENBQUM7Z0JBQ25JLEtBQUssUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLDREQUE0RCxDQUFDLENBQUM7Z0JBQzlILEtBQUssU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixFQUFFLG9FQUFvRSxDQUFDLENBQUM7Z0JBQ3hJLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixFQUFFLHdEQUF3RCxDQUFDLENBQUM7Z0JBQ3BILEtBQUssT0FBTztvQkFBRSxJQUFHLG1DQUFnQixDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUMvRCxJQUFJLENBQUMscUJBQXFCLENBQUMsZ0RBQWdELEVBQUUsd0ZBQXdGLENBQUMsQ0FBQztxQkFDMUs7b0JBQUMsTUFBTTtnQkFDWixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUseUNBQXlDLENBQUMsQ0FBQzthQUN2RztRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssc0RBQXFCLEdBQTdCLFVBQThCLFVBQTZCO1lBRXZELG9CQUFvQjtZQUNwQixJQUFHLFVBQVUsSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN0RCxPQUFPLFVBQVUsQ0FBQzthQUNyQjtZQUNELG9CQUFvQjtpQkFDZixJQUFHLFVBQVUsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDMUQsSUFBSSxjQUFjLEdBQUcsbUNBQWdCLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9FLE9BQU87b0JBQ0gsS0FBSyxFQUFFLGNBQWMsQ0FBQyxJQUFJO29CQUMxQixJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7b0JBQ3pCLFVBQVUsRUFBRSxtQ0FBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7aUJBQzlELENBQUM7YUFDTDtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLHNEQUFxQixHQUE3QixVQUE4QixTQUFpQixFQUFFLFlBQW9CO1lBQ2pFLE1BQU0sRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBN1NELENBQTRDLCtCQUFjLEdBNlN6RDtJQTdTWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb3JNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVN0cmluZyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFTdHJpbmdcIjtcclxuaW1wb3J0ICogYXMgbWF0aCBmcm9tICBcIi4uLy4uLy4uLy4uL2xpYnMvbWF0aC9tYXRoanNcIlxyXG5pbXBvcnQgeyBNYXRoanNXcmFwcGVyIH0gZnJvbSBcIi4uL21hdGhqc1dyYXBwZXJcIjtcclxuaW1wb3J0IHsgTWF0aGpzSHRtbENvbnZlcnRlciB9IGZyb20gXCIuLi9tYXRoanNIdG1sQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmluZ1lJZDogc3RyaW5nID0gXCJDYWxjdWxhdGluZ1ZhbHVlc1wiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmluZ1hJZDogc3RyaW5nID0gXCJDYWxjdWxhdGluZ1RpbWVcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxBSWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckFcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxCSWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckJcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxDSWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckNcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxESWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckRcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxFSWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckVcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTdHJpbmdZTmFtZTogc3RyaW5nID0gXCJDYWxjdWxhdGluZyB2YWx1ZXNcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTdHJpbmdYTmFtZTogc3RyaW5nID0gXCJDYWxjdWxhdGluZyB0aW1lXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsQU5hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBhXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsQk5hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBiXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsQ05hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBjXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsRE5hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBkXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsRU5hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBlXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBvdXRwdXRJZDogc3RyaW5nID0gXCJPdXRwdXRTaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZSA9IFwiT3V0cHV0IHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXRWYWx1ZSA9IFwibWF0aCBleHByZXNzaW9uXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgaW5wdXRTdHJpbmdEZXNjcmlwaW9uOiBzdHJpbmcgPSBcIk1hdGhlbWF0aWNhbCBleHByZXNzaW9uIGV4cGVjdGVkXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX21hdGhKU0xpYjogTWF0aGpzV3JhcHBlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJzdHJpbmdtYXRoanNcIiwgXCJNYXRoIGV4cHJlc3Npb25cIiwgXCJDYWxjdWxhdGVzIHNlcGFyYXRlZCB2YWx1ZXMgYW5kIHRpbWUgYXMgbWF0aGVtYXRpY2FsIGV4cHJlc3Npb25cIik7XHJcbiAgICAgICAgdGhpcy5fbWF0aEpTTGliID0gTWF0aGpzV3JhcHBlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGlucHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvciBcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8VENhbGN1bGF0aW9uRGF0YT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnZlcnQgdGhlIHJlY2VpdmVkIGlucHV0IHN0cmluZ3MgdG8gYSBkaXNwbGF5IHZhbHVlIHdpdGggbWF0aC5qcyBzcGVjaWZpYyBodG1sIGZvciBlbmFibGluZyBzeW50YXggaGlnaGxpZ2h0aW5nXHJcbiAgICAgICAgbGV0IHN0cmluZ0lucHV0RGF0YTEgPSBuZXcgQ2FsY3VsYXRpb25EYXRhU3RyaW5nKHRoaXMuaW5wdXRTdHJpbmdZSWQsIHRoaXMuaW5wdXRTdHJpbmdZTmFtZSwgdGhpcy5pbnB1dFN0cmluZ0Rlc2NyaXBpb24sIFwiQ2FsY3VsYXRlcyBtYXRoZW1hdGljYWwgZm9ybXVsYXMgZnJvbSB0aGUgbWF0aC5qcyBsaWJyYXJ5IGZvciB0aGUgeSB2YWx1ZXNcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSkpO1xyXG4gICAgICAgIHN0cmluZ0lucHV0RGF0YTEudmFsdWVDb252ZXJ0ZXIgPSBuZXcgTWF0aGpzSHRtbENvbnZlcnRlcih0aGlzLmlucHV0U3RyaW5nRGVzY3JpcGlvbik7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2goc3RyaW5nSW5wdXREYXRhMSk7XHJcbiAgICAgICAgbGV0IHN0cmluZ0lucHV0RGF0YTIgPSBuZXcgQ2FsY3VsYXRpb25EYXRhU3RyaW5nKHRoaXMuaW5wdXRTdHJpbmdYSWQsIHRoaXMuaW5wdXRTdHJpbmdYTmFtZSwgdGhpcy5pbnB1dFN0cmluZ0Rlc2NyaXBpb24sIFwiQ2FsY3VsYXRlcyBtYXRoZW1hdGljYWwgZm9ybXVsYXMgZnJvbSB0aGUgbWF0aC5qcyBsaWJyYXJ5IGZvciB0aGUgeCB2YWx1ZXNcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSkpO1xyXG4gICAgICAgIHN0cmluZ0lucHV0RGF0YTIudmFsdWVDb252ZXJ0ZXIgPSBuZXcgTWF0aGpzSHRtbENvbnZlcnRlcih0aGlzLmlucHV0U3RyaW5nRGVzY3JpcGlvbik7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2goc3RyaW5nSW5wdXREYXRhMik7XHJcblxyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsQUlkLCB0aGlzLmlucHV0U2lnbmFsQU5hbWUsIDAsIFwiSW5wdXQgaXMgYSBzaWduYWw6IGEudmFsdWUsIGEudGltZSBhbmQgYS5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBhIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsQklkLCB0aGlzLmlucHV0U2lnbmFsQk5hbWUsIDAsIFwiSW5wdXQgaXMgYSBTaWduYWw6IGIudmFsdWUsIGIudGltZSBhbmQgYi5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBiIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsQ0lkLCB0aGlzLmlucHV0U2lnbmFsQ05hbWUsIDAsIFwiSW5wdXQgaXMgYSBTaWduYWw6IGMudmFsdWUsIGMudGltZSBhbmQgYy5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBjIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsRElkLCB0aGlzLmlucHV0U2lnbmFsRE5hbWUsIDAsIFwiSW5wdXQgaXMgYSBTaWduYWw6IGQudmFsdWUsIGQudGltZSBhbmQgZC5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBkIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsRUlkLCB0aGlzLmlucHV0U2lnbmFsRU5hbWUsIDAsIFwiSW5wdXQgaXMgYSBTaWduYWw6IGUudmFsdWUsIGUudGltZSBhbmQgZS5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBlIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIHN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBvdXRwdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dElkLCB0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpIHtcclxuICAgICAgICBzdXBlci52ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICAvL3JldHJpZXZlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGFcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCBzdHJpbmdEYXRhWSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBzdHJpbmdEYXRhWCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dCBkYXRhIGFyZSB2YWxpZFxyXG4gICAgICAgIGlmKHN0cmluZ0RhdGFZID09PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhzdHJpbmdEYXRhWS5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0U3RyaW5nWU5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RyaW5nRGF0YVggPT09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKHN0cmluZ0RhdGFYLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTdHJpbmdYTmFtZV0pO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyW2ldO1xyXG4gICAgICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFtjYWxjdWxhdGlvbklucHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKHN0cmluZ0RhdGFZLmRhdGEpICYmIHN0cmluZ0RhdGFZLmRhdGEgPT09IHRoaXMuaW5wdXRTdHJpbmdEZXNjcmlwaW9uKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTdHJpbmdZTmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoc3RyaW5nRGF0YVguZGF0YSkgJiYgc3RyaW5nRGF0YVguZGF0YSA9PT0gdGhpcy5pbnB1dFN0cmluZ0Rlc2NyaXBpb24pe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFN0cmluZ1hOYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKVxyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhIGFuZCBpbml0aWFsaXplIHJlc3VsdFxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YSA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgLy8gcHJlcGFyZSB0aGUgaW5wdXQgZGF0YSBmb3IgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgc3RyaW5nRGF0YVkgPSBjYWxjdWxhdGlvbklucHV0RGF0YVswXTtcclxuICAgICAgICBsZXQgc3RyaW5nRGF0YVggPSBjYWxjdWxhdGlvbklucHV0RGF0YVsxXTtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YTogQXJyYXk8bnVtYmVyfEFycmF5PElQb2ludD4+ID0gbmV3IEFycmF5PG51bWJlcnxBcnJheTxJUG9pbnQ+PigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgY2FsY3VsYXRpb25JbnB1dERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhW2ldLmRhdGE7XHJcbiAgICAgICAgICAgIGlmKCFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbERhdGEucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgLy8gRXhlY3V0ZSB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIHN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoc3RyaW5nRGF0YVkuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKHN0cmluZ0RhdGFYLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2FsY3VsYXRlU3RyaW5nKHN0cmluZ0RhdGFZLmRhdGEsIHN0cmluZ0RhdGFYLmRhdGEsIHNpZ25hbERhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIHRoZSByZXN1bHQgb2YgdGhlIGNhbGN1bGF0aW9uIHRvIHRoZSBjYWxjdWxhdGlvbk91dHB1Q29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm91dHB1dFZhbHVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm91dHB1dE5hbWUsXHJcbiAgICAgICAgICAgIGlkOiB0aGlzLm91dHB1dElkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSBtYXRoZW1hdGljYWwgZXhwcmVzc2lvbnMgd2l0aCB0aGUgZ2l2ZW4gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nRGF0YVlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdEYXRhWFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnRbXSB8IG51bWJlcj59IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVTdHJpbmcoc3RyaW5nRGF0YVk6IHN0cmluZywgc3RyaW5nRGF0YVg6IHN0cmluZywgc2lnbmFsRGF0YTogQXJyYXk8SVBvaW50W10gfCBudW1iZXI+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICAvLyBSZWNlaXZlIHRoZSByZXN1bHRzIG9mIHRoZSBjYWxjdWxhdGlvbiBmb3IgYm90aCBheGlzXHJcbiAgICAgICAgbGV0IHJlc3VsdFg6IEFycmF5PG51bWJlcj4gPSB0aGlzLmV2YWx1YXRlU3RyaW5nKHN0cmluZ0RhdGFYLCBzaWduYWxEYXRhKTtcclxuICAgICAgICBsZXQgcmVzdWx0WTogQXJyYXk8bnVtYmVyPiA9IHRoaXMuZXZhbHVhdGVTdHJpbmcoc3RyaW5nRGF0YVksIHNpZ25hbERhdGEpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIElmIGluIGJvdGggYXhpcyBubyBlcnJvcnMgb2NjdXJlZCBkdXJpbmcgY2FsY3VsYXRpbmcsIHRoZW4gdGhleSBnZXQgY29tYmluZWQgdG8gYW4gSVBvaW50IEFycmF5XHJcbiAgICAgICAgaWYoIXRoaXMuaGFzRXJyb3JzKCkpe1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBDYWxjdWxhdG9ySGVscGVyLmZyb21Ud29OdW1iZXJBcnJheVRvSVBvaW50QXJyYXkocmVzdWx0WCwgcmVzdWx0WSk7XHJcbiAgICAgICAgICAgIGlmKG91dHB1dC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5BcnJheXNIYXZlRGlmZmVyZW50TGVuZ3RoLCBbXCJDYWxjdWxhdGluZyB2YWx1ZXMgYW5kIGNhbGN1bGF0aW5nIHRpbWVcIl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25PdXRwdXREYXRhKCkgeyAvL1RoaXMgY2FsY3VsYXRvciBhbGxvd3MgZm9yIHNpZ25hbCBnZW5lcmF0aW9uIGFuZCByZXR1cm5zIGEgWVQtc2lnbmFsLiBUaGVyZWZvcmUgdGhlIHRpbWUgbXVzdCBiZSBzdHJpY3RseSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcuXHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25PdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICAvLyBjaGVja3MgaWYgdGhlIGNhbGN1bGF0aW9uIHRpbWUgdmFsdWVzIGFyZSBzdHJpY3RseSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmdcclxuICAgICAgICBjYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIuZm9yRWFjaCgoY2FsY3VsYXRpb25PdXRwdXREYXRhKSA9PiB7ICAgICAgIFxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1N0cmljdGx5TW9ub3RvbmljYWxseUluY3JlYXNpbmdJblRpbWUoY2FsY3VsYXRpb25PdXRwdXREYXRhLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTm90U3RyaWN0bHlNb25vdG9uaWNhbGx5SW5jcmVhc2luZ0luVGltZSwgW2NhbGN1bGF0aW9uT3V0cHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIHN0cmluZyB2YWx1ZSB3aXRoIG1hdGhqcyBsaWIgYW5kIG1hdGNoIHRvIHRoZSBpbnB1dHNpZ25hbCBvciBjb25zdGFudFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50W10gfCBudW1iZXI+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyIHwgQXJyYXk8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXZhbHVhdGVTdHJpbmcoc3RyOiBzdHJpbmcsIHNpZ25hbERhdGE6IEFycmF5PElQb2ludFtdIHwgbnVtYmVyPik6IEFycmF5PG51bWJlcj4geyBcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYXJyUmVzdWx0OiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjb2RlID0gdGhpcy5fbWF0aEpTTGliLmxpbWl0ZWRQYXJzZShzdHIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBpbnB1dCBzaWduYWwgZGF0YSB0byB0aGUgc2NvcGUgZm9yIGV2YWx1YXRpbmdcclxuICAgICAgICAgICAgbGV0IHNjb3BlID0ge1xyXG4gICAgICAgICAgICAgICAgYTogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVswXSksIFxyXG4gICAgICAgICAgICAgICAgYjogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVsxXSksIFxyXG4gICAgICAgICAgICAgICAgYzogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVsyXSksIFxyXG4gICAgICAgICAgICAgICAgZDogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVszXSksIFxyXG4gICAgICAgICAgICAgICAgZTogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVs0XSkgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvbXBpbGVkQ29kZSA9IGNvZGUuY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gY29tcGlsZWRDb2RlLmV2YWx1YXRlKHNjb3BlKTtcclxuICAgICAgICAgICAgLy8gVGhlIGV2YWx1YXRlIGZ1bmN0aW9uIGNhbiBsZWFkIHRvIHNldmVyYWwgZGlmZmVyZW50IHJlc3VsdGluZyBkYXRhdHlwZXMsIGJ1dCBvbmx5IGFycmF5cyBvZiBudW1iZXJzIGNhbiBiZSB1c2VkIGxhdGVyXHJcbiAgICAgICAgICAgIGFyclJlc3VsdCA9IHRoaXMuY29udmVydE1hdGhqc1Jlc3VsdFR5cGVUb0FycmF5KHJlc3VsdCk7ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiRXJyb3IgaW4gZXhwcmVzc2lvbjogXCIgKyBzdHIgKyBcIiFcXG5cIiArIGVycm9yLm5hbWUgKyBcIjogXCIgKyBlcnJvci5tZXNzYWdlICsgXCIhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFyclJlc3VsdDtcclxuICAgIH1cclxuIFxyXG4gICAgIC8qKlxyXG4gICAgICogQ2hlY2sgdGhlIGRhdGF0eXBlIG9mIHRoZSBldmFsdWF0ZWQgbWF0aGpzIHJlc3VsdCBhbmQgY29udmVydCBpdCB0byBhbiBOdW1iZXIgQXJyYXkgaWYgcG9zc2libGVcclxuICAgICAqIFRocm93cyBlcnJvcnMgaWYgdGhleSBhcmUgbm90IHZhbGlkXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzdWx0XHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVydE1hdGhqc1Jlc3VsdFR5cGVUb0FycmF5KHJlc3VsdDogYW55KTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgLy9nZXQgdGhlIG1hdHJpeCBvciBhcnJheSB2YWx1ZSBmcm9tIGEgbXVsdGlsaW5lIGV4cHJlc3Npb25cclxuICAgICAgICBpZihtYXRoLnR5cGVPZihyZXN1bHQpID09ICdSZXN1bHRTZXQnKSB7XHJcbiAgICAgICAgICAgIGlmKCFyZXN1bHQuaGFzT3duUHJvcGVydHkoJ2VudHJpZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRoanNSZXN1bHRUeXBlRXJyb3IoJ1Jlc3VsdCBpcyBhIGludmFsaWQgUmVzdWx0U2V0JywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5lbnRyaWVzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2dldCB0aGUgYXJyYXkgZnJvbSB0aGUgbWF0cml4XHJcbiAgICAgICAgaWYobWF0aC50eXBlT2YocmVzdWx0KSA9PSAnTWF0cml4Jykge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQuX3NpemUubGVuZ3RoICE9IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRoanNSZXN1bHRUeXBlRXJyb3IoJ1Jlc3VsdCBpcyBhIG11bHRpZGltZW5zaW9uYWwgbWF0cml4JywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgYSBtdWx0aWRpbWVuc2lvbmFsIG1hdHJpeCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5fZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja0ZvckludmFsaWREYXRhVHlwZShyZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgZGF0YXR5cGUgb2YgdGhlIGV2YWx1YXRlZCBtYXRoanMgcmVzdWx0IGlzIHZhbGlkXHJcbiAgICAgKiBUaHJvd3MgZXJyb3JzIGlmIHRoZXkgYXJlIG5vdCB2YWxpZFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7YW55fSByZXN1bHRcclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tGb3JJbnZhbGlkRGF0YVR5cGUocmVzdWx0OiBhbnkpe1xyXG4gICAgICAgIHN3aXRjaCAobWF0aC50eXBlT2YocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBjYXNlICd1bmRlZmluZWQnOiB0aGlzLm1hdGhqc1Jlc3VsdFR5cGVFcnJvcignUmVzdWx0IGlzIHVuZGVmaW5lZCcsICdUaGUgcmVzdWx0IG9mIHRoZSBleHByZXNzaW9uIGlzIG5vdCBhbGxvd2VkIHRvIGJlIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjYXNlICdudW1iZXInOiB0aGlzLm1hdGhqc1Jlc3VsdFR5cGVFcnJvcignUmVzdWx0IGlzIGEgbnVtYmVyJywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgYSBudW1iZXInKTtcclxuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6IHRoaXMubWF0aGpzUmVzdWx0VHlwZUVycm9yKCdSZXN1bHQgaXMgYSBib29sZWFuJywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgYSBzaW5nbGUgYm9vbGVhbicpO1xyXG4gICAgICAgICAgICBjYXNlICdudWxsJzogdGhpcy5tYXRoanNSZXN1bHRUeXBlRXJyb3IoJ1Jlc3VsdCBpcyBudWxsJywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgbnVsbCcpO1xyXG4gICAgICAgICAgICBjYXNlICdBcnJheSc6IGlmKENhbGN1bGF0b3JIZWxwZXIuYXJyYXlIYXNOYU5PckludmluaXR5VmFsdWVzKHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGhqc1Jlc3VsdFR5cGVFcnJvcignUmVzdWx0IGlzIGFuIGFycmF5IHdpdGggTmFOIG9yIGludmluaXR5IHZhbHVlcycsICdUaGUgcmVzdWx0IG9mIHRoZSBleHByZXNzaW9uIGlzIG5vdCBhbGxvd2VkIHRvIGJlIGFuIGFycmF5IHdpdGggTmFOIG9yIGludmluaXR5IHZhbHVlcycpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogdGhpcy5tYXRoanNSZXN1bHRUeXBlRXJyb3IoJ1Jlc3VsdCBpcyBpbnZhbGlkJywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgaW52YWxpZCcpOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzdWl0YWJsZSBvYmplY3QgZm9yIHRoZSBldmFsdWF0aW9uIHNjb3BlIG9mIG1hdGguanNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W10gfCBudW1iZXJ9IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNjb3BlT2JqZWN0T3JWYWx1ZShzaWduYWxEYXRhOiBJUG9pbnRbXSB8IG51bWJlcik6IGFueSB7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vU2NvcGUgZm9yIGEgbnVtYmVyXHJcbiAgICAgICAgaWYoc2lnbmFsRGF0YSAhPSB1bmRlZmluZWQgJiYgIUFycmF5LmlzQXJyYXkoc2lnbmFsRGF0YSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNpZ25hbERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vU2NvcGUgZm9yIGEgc2lnbmFsXHJcbiAgICAgICAgZWxzZSBpZihzaWduYWxEYXRhICE9IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHNpZ25hbERhdGEpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGxpdHRlZFNpZ25hbCA9IENhbGN1bGF0b3JIZWxwZXIuZnJvbUlQb2ludEFycmF5VG9OdW1iZXJBcnJheShzaWduYWxEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBzcGxpdHRlZFNpZ25hbC55QXJyLFxyXG4gICAgICAgICAgICAgICAgdGltZTogc3BsaXR0ZWRTaWduYWwueEFycixcclxuICAgICAgICAgICAgICAgIHNhbXBsZVRpbWU6IENhbGN1bGF0b3JIZWxwZXIuZXN0aW1hdGVTYW1wbGVUaW1lKHNpZ25hbERhdGEpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWV0aG9kIGZvciBnZW5lcmFsaXplIHRocm93IG1lc3NhZ2VzIGZvciBpbnZhbGlkIGNhbGN1bGF0aW9uIHJlc3VsdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yTWVzc2FnZVxyXG4gICAgICogQHJldHVybnMge25ldmVyfSBcclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWF0aGpzUmVzdWx0VHlwZUVycm9yKGVycm9yTmFtZTogc3RyaW5nLCBlcnJvck1lc3NhZ2U6IHN0cmluZyk6IG5ldmVyIHsgICAgXHJcbiAgICAgICAgdGhyb3cge25hbWU6IGVycm9yTmFtZSwgZGF0YTogZXJyb3JNZXNzYWdlfTtcclxuICAgIH1cclxufVxyXG5cclxuIl19
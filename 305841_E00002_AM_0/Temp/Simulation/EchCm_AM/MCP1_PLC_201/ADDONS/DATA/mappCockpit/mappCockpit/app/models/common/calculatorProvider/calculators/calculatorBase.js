define(["require", "exports", "../calculationDataPoints", "../../../common/series/seriesType", "./calculatorHelper"], function (require, exports, calculationDataPoints_1, seriesType_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ErrorMessageType;
    (function (ErrorMessageType) {
        ErrorMessageType[ErrorMessageType["MissingOrInvalidInput"] = 0] = "MissingOrInvalidInput";
        ErrorMessageType[ErrorMessageType["InvalidOutput"] = 1] = "InvalidOutput";
        ErrorMessageType[ErrorMessageType["InvalidInputType"] = 2] = "InvalidInputType";
        ErrorMessageType[ErrorMessageType["NotEnoughCommonTimestamps"] = 3] = "NotEnoughCommonTimestamps";
        ErrorMessageType[ErrorMessageType["ContainsNaNOrInfinity"] = 4] = "ContainsNaNOrInfinity";
        ErrorMessageType[ErrorMessageType["ContainsZeroInYValues"] = 5] = "ContainsZeroInYValues";
        ErrorMessageType[ErrorMessageType["ContainsFloatingNumbers"] = 6] = "ContainsFloatingNumbers";
        ErrorMessageType[ErrorMessageType["NumberNotAllowedToBeZero"] = 7] = "NumberNotAllowedToBeZero";
        ErrorMessageType[ErrorMessageType["NumberIsNoInt"] = 8] = "NumberIsNoInt";
        ErrorMessageType[ErrorMessageType["NotStrictlyMonotonicallyIncreasingInTime"] = 9] = "NotStrictlyMonotonicallyIncreasingInTime";
        ErrorMessageType[ErrorMessageType["ArraysHaveDifferentLength"] = 10] = "ArraysHaveDifferentLength";
    })(ErrorMessageType || (ErrorMessageType = {}));
    exports.ErrorMessageType = ErrorMessageType;
    exports.ErroMessageType = ErrorMessageType;
    /**
     * Base class for all calculators
     *
     * @class CalculatorBase
     * @implements {ICalculator}
     */
    var CalculatorBase = /** @class */ (function () {
        /**
         * Creates an instance of CalculatorBase.
         *
         * @param {string} id
         * @param {string} displayName
         * @param {string} description
         * @memberof CalculatorBase
         */
        function CalculatorBase(id, displayName, description) {
            this.errorList = new Array();
            this.calculationInputDataContainer = new Array();
            this.calculationOutputDataContainer = new Array();
            this._id = id;
            this._displayName = displayName;
            this._description = description;
        }
        Object.defineProperty(CalculatorBase.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculatorBase.prototype, "displayName", {
            get: function () {
                return this._displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculatorBase.prototype, "description", {
            get: function () {
                return this._description;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Empties the error list.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearErrors = function () {
            this.errorList = new Array();
        };
        /**
         * Adds an error to the errorlist.
         *
         * @protected
         * @param {string} errorMessage
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addError = function (errorMessage) {
            this.errorList.push(errorMessage);
        };
        /**
         * Returns the error list.
         *
         * @returns {Array<string>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getErrors = function () {
            return this.errorList;
        };
        /**
         * Returns if the error list has entries.
         *
         * @protected
         * @returns {boolean}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.hasErrors = function () {
            return this.errorList.length > 0;
        };
        /**
         * Empties the calculation input data container.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearCalculationInputDataContainer = function () {
            this.calculationInputDataContainer = new Array();
        };
        /**
         * Adds calculation input data (data to be calculated) to the calculation input data container.
         *
         * @protected
         * @param {CalculationInputData} calculationData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addCalculationInputData = function (calculationData) {
            this.calculationInputDataContainer.push(calculationData);
        };
        /**
         * Returns the calculation input data container (data to be calculated).
         *
         * @returns {Array<CalculationInputData>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getCalculationInputDataContainer = function () {
            return this.calculationInputDataContainer;
        };
        /**
         * Empties the calculation output data container.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearCalculationOutputDataContainer = function () {
            this.calculationOutputDataContainer = new Array();
        };
        /**
         * Adds calculation output data (data resulting from calculation) to ther calculation output data container.
         *
         * @protected
         * @param {CalculationOutputData} calculationOutputData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addCalculationOutputData = function (calculationOutputData) {
            this.calculationOutputDataContainer.push(calculationOutputData);
        };
        /**
         * Returns the container holding the calculation output data (data resulting from calculation).
         *
         * @returns {Array<CalculationOutputData>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getCalculationOutputDataContainer = function () {
            return this.calculationOutputDataContainer;
        };
        /**
         * Adds an error to the errorlist of the calculator.
         * Generates the error message based on error type.
         *
         * @protected
         * @param {ErrorMessageType} errorMessageType
         * @param {Array<string>} errorMessageData
         * @returns
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addErrorByType = function (errorMessageType, errorMessageData) {
            if (!(errorMessageData.length > 0)) { // log to console if no errorMessageData is provided
                console.error("errorMessageData is missing!");
                return;
            }
            var errorMessage = "";
            var joinedErrorMessageData = errorMessageData.join(", ");
            switch (errorMessageType) { // generate error message according to errror type
                case ErrorMessageType.MissingOrInvalidInput:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is missing or invalid!";
                    break;
                case ErrorMessageType.InvalidOutput:
                    errorMessage = "Calculation Error: Output data for '" + joinedErrorMessageData + "' is invalid!";
                    break;
                case ErrorMessageType.InvalidInputType:
                    errorMessage = "Calculation Error: Input signal type for '" + joinedErrorMessageData + "' is not supported! Please use input signal of type YT.";
                    break;
                case ErrorMessageType.NotEnoughCommonTimestamps:
                    errorMessage = "Calculation Error: The inputs '" + joinedErrorMessageData + "' do not share enough common timestamps!";
                    break;
                case ErrorMessageType.ContainsNaNOrInfinity:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain NaN or Infinity!";
                    break;
                case ErrorMessageType.ContainsZeroInYValues:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain 0 in the y values!";
                    break;
                case ErrorMessageType.ContainsFloatingNumbers:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain floating point numbers in the y values!";
                    break;
                case ErrorMessageType.NumberNotAllowedToBeZero:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not allowed to be 0!";
                    break;
                case ErrorMessageType.NumberIsNoInt:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not allowed to be a floating point number!";
                    break;
                case ErrorMessageType.NotStrictlyMonotonicallyIncreasingInTime:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not strictly monotonically increasing in time!";
                    break;
                case ErrorMessageType.ArraysHaveDifferentLength:
                    errorMessage = "Calculation Error: " + joinedErrorMessageData + " need to have the same length!";
                    break;
                default:
                    errorMessage = "Calculation Error: Calculation of '" + joinedErrorMessageData + "' failed! Unknown reason!";
                    break;
            }
            this.errorList.push(errorMessage);
        };
        /**
         * Hook to provide the default input data
         *
         * @returns {(Array<TCalculationData>)}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getDefaultInputData = function () {
            var defaultInputData = new Array();
            return defaultInputData;
        };
        /**
         * Hook to provide the default output data
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getDefaultOutputData = function () {
            var defaultOutputData = new Array();
            return defaultOutputData;
        };
        /**
         * Runs the steps necessary to perform the calculation of the calculator.
         *
         * @param {(Array<TCalculationData>)} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.calculate = function (inputData) {
            this.clearErrors();
            this.clearCalculationInputDataContainer();
            this.clearCalculationOutputDataContainer();
            this.extractCalculationData(inputData);
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.prepareCalculationData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.verifyCalculationInputData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.executeAlgorithm();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.verifyCalculationOutputData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            var outputData = this.generateOutputData();
            return outputData;
        };
        /**
         * Extracts the calculation input data from the calculator input.
         * Checks if input is not of type XY or FFT.
         *
         * @private
         * @param {(Array<TCalculationData>)} inputData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.extractCalculationData = function (inputData) {
            var _this = this;
            var invalidSerieTypesNames = new Array();
            inputData.forEach(function (input) {
                var calculationData = {
                    data: input.getData(),
                    name: input.getDisplayName()
                };
                if (input.type == seriesType_1.SeriesType.fftSeries || input.type == seriesType_1.SeriesType.xySeries) {
                    invalidSerieTypesNames.push(input.getDisplayName());
                }
                _this.addCalculationInputData(calculationData);
            });
            if (invalidSerieTypesNames.length > 0) {
                this.addErrorByType(ErrorMessageType.InvalidInputType, invalidSerieTypesNames);
            }
        };
        /**
         * Hook for preparing the calculation input data.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.prepareCalculationData = function () { };
        /**
         * Hook for verifying calculation input data.
         * Performs basic verification as default.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.verifyCalculationInputData = function () {
            var _this = this;
            this.getCalculationInputDataContainer().forEach(function (calculationInputData) {
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(calculationInputData.data)) { //calculationInputData is a signal
                    if (!calculatorHelper_1.CalculatorHelper.isSignalLongerThanMinimum(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                    else if (calculatorHelper_1.CalculatorHelper.containsNaNOrInfinityInYvalue(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationInputData.name]);
                    }
                }
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(calculationInputData.data)) { //calculationInputData is a number
                    if (Number.isNaN(calculationInputData.data)) { //NaN means no data provided 
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                    else if (!calculatorHelper_1.CalculatorHelper.isValidNumber(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationInputData.name]);
                    }
                }
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(calculationInputData.data)) {
                    if (calculationInputData.data === "") {
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                }
            });
        };
        /**
         * Hook for executing the algorithm/calculation.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.executeAlgorithm = function () { };
        /**
         * Hook for verifying the calculation result.
         * Performs basic verfication as default.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.verifyCalculationOutputData = function () {
            var _this = this;
            this.getCalculationOutputDataContainer().forEach(function (calculationOutputData) {
                if (!calculatorHelper_1.CalculatorHelper.isSignalLongerThanMinimum(calculationOutputData.data)) {
                    _this.addErrorByType(ErrorMessageType.InvalidOutput, [calculationOutputData.name]);
                }
                else if (calculatorHelper_1.CalculatorHelper.containsNaNOrInfinityInYvalue(calculationOutputData.data)) {
                    _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationOutputData.name]);
                }
            });
        };
        /**
         * Generates output data of the calculator based on the data in the calculationOutputDataContainer.
         *
         * @private
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.generateOutputData = function () {
            var outputData = new Array();
            var calculationOutputDataContainer = this.getCalculationOutputDataContainer();
            calculationOutputDataContainer.forEach(function (calculationOutputData) {
                outputData.push(new calculationDataPoints_1.CalculationDataPoints(calculationOutputData.id, calculationOutputData.name, calculationOutputData.value, calculationOutputData.data));
            });
            if (calculationOutputDataContainer.length == 0) {
                outputData = this.getDefaultOutputData();
            }
            return outputData;
        };
        /**
         * Returns the calculation data used by the algorithm of the calculator after all preparations done.
         *
         * @returns {(Array<TCalculationData>)}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getActualInputData = function () {
            var inputData = this.getDefaultInputData();
            var calculationData = this.getCalculationInputDataContainer();
            for (var i = 0; i < inputData.length && i < calculationData.length; i++) {
                inputData[i].setData(calculationData[i].data);
            }
            return inputData;
        };
        return CalculatorBase;
    }());
    exports.CalculatorBase = CalculatorBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvckJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2NhbGN1bGF0b3JCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BLElBQUssZ0JBWUo7SUFaRCxXQUFLLGdCQUFnQjtRQUNqQix5RkFBcUIsQ0FBQTtRQUNyQix5RUFBYSxDQUFBO1FBQ2IsK0VBQWdCLENBQUE7UUFDaEIsaUdBQXlCLENBQUE7UUFDekIseUZBQXFCLENBQUE7UUFDckIseUZBQXFCLENBQUE7UUFDckIsNkZBQXVCLENBQUE7UUFDdkIsK0ZBQXdCLENBQUE7UUFDeEIseUVBQWEsQ0FBQTtRQUNiLCtIQUF3QyxDQUFBO1FBQ3hDLGtHQUF5QixDQUFBO0lBQzdCLENBQUMsRUFaSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBWXBCO0lBd2N1Qiw0Q0FBZ0I7SUFBc0IsMkNBQWU7SUEzYjdFOzs7OztPQUtHO0lBQ0g7UUF5Qkk7Ozs7Ozs7V0FPRztRQUNILHdCQUFzQixFQUFVLEVBQUUsV0FBbUIsRUFBRSxXQUFtQjtZQTFCbEUsY0FBUyxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO1lBRS9DLGtDQUE2QixHQUFnQyxJQUFJLEtBQUssRUFBd0IsQ0FBQztZQUUvRixtQ0FBOEIsR0FBaUMsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUF1QnRHLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDcEMsQ0FBQztRQXhCRCxzQkFBVyw4QkFBRTtpQkFBYjtnQkFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDcEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1Q0FBVztpQkFBdEI7Z0JBQ0ks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LFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztZQUU5RCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0QsU0FBUyxDQUFDLENBQUMsQ0FBcUIsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RFO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVMLHFCQUFDO0lBQUQsQ0FBQyxBQW5iRCxJQW1iQztJQUVPLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSwgQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5cclxuZW51bSBFcnJvck1lc3NhZ2VUeXBlIHtcclxuICAgIE1pc3NpbmdPckludmFsaWRJbnB1dCxcclxuICAgIEludmFsaWRPdXRwdXQsXHJcbiAgICBJbnZhbGlkSW5wdXRUeXBlLFxyXG4gICAgTm90RW5vdWdoQ29tbW9uVGltZXN0YW1wcyxcclxuICAgIENvbnRhaW5zTmFOT3JJbmZpbml0eSxcclxuICAgIENvbnRhaW5zWmVyb0luWVZhbHVlcyxcclxuICAgIENvbnRhaW5zRmxvYXRpbmdOdW1iZXJzLFxyXG4gICAgTnVtYmVyTm90QWxsb3dlZFRvQmVaZXJvLFxyXG4gICAgTnVtYmVySXNOb0ludCxcclxuICAgIE5vdFN0cmljdGx5TW9ub3RvbmljYWxseUluY3JlYXNpbmdJblRpbWUsXHJcbiAgICBBcnJheXNIYXZlRGlmZmVyZW50TGVuZ3RoXHJcbn1cclxuXHJcbnR5cGUgQ2FsY3VsYXRpb25JbnB1dERhdGEgPSB7XHJcbiAgICBkYXRhOiBudW1iZXIgfCBzdHJpbmcgfCBBcnJheTxJUG9pbnQ+LFxyXG4gICAgbmFtZTogc3RyaW5nXHJcbn1cclxudHlwZSBDYWxjdWxhdGlvbk91dHB1dERhdGEgPSB7XHJcbiAgICBkYXRhOiBBcnJheTxJUG9pbnQ+LFxyXG4gICAgdmFsdWU6IHN0cmluZyxcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGlkOiBzdHJpbmcsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCYXNlIGNsYXNzIGZvciBhbGwgY2FsY3VsYXRvcnNcclxuICpcclxuICogQGNsYXNzIENhbGN1bGF0b3JCYXNlXHJcbiAqIEBpbXBsZW1lbnRzIHtJQ2FsY3VsYXRvcn1cclxuICovXHJcbmNsYXNzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9kaXNwbGF5TmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZGVzY3JpcHRpb246IHN0cmluZztcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBlcnJvckxpc3Q6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXI6IEFycmF5PENhbGN1bGF0aW9uSW5wdXREYXRhPiA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbklucHV0RGF0YT4oKTtcclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcjogQXJyYXk8Q2FsY3VsYXRpb25PdXRwdXREYXRhPiA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbk91dHB1dERhdGE+KCk7XHJcblxyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENhbGN1bGF0b3JCYXNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwbGF5TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc2NyaXB0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBFbXB0aWVzIHRoZSBlcnJvciBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY2xlYXJFcnJvcnMoKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvckxpc3QgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBlcnJvciB0byB0aGUgZXJyb3JsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvck1lc3NhZ2VcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkRXJyb3IoZXJyb3JNZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmVycm9yTGlzdC5wdXNoKGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBlcnJvciBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFcnJvcnMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpZiB0aGUgZXJyb3IgbGlzdCBoYXMgZW50cmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaGFzRXJyb3JzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yTGlzdC5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtcHRpZXMgdGhlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY2xlYXJDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpIHtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gbmV3IEFycmF5PENhbGN1bGF0aW9uSW5wdXREYXRhPigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhIChkYXRhIHRvIGJlIGNhbGN1bGF0ZWQpIHRvIHRoZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0NhbGN1bGF0aW9uSW5wdXREYXRhfSBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkQ2FsY3VsYXRpb25JbnB1dERhdGEoY2FsY3VsYXRpb25EYXRhOiBDYWxjdWxhdGlvbklucHV0RGF0YSkge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIucHVzaChjYWxjdWxhdGlvbkRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSBjb250YWluZXIgKGRhdGEgdG8gYmUgY2FsY3VsYXRlZCkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uSW5wdXREYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTogQXJyYXk8Q2FsY3VsYXRpb25JbnB1dERhdGE+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbXB0aWVzIHRoZSBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjbGVhckNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcigpIHtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lciA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbk91dHB1dERhdGE+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhIChkYXRhIHJlc3VsdGluZyBmcm9tIGNhbGN1bGF0aW9uKSB0byB0aGVyIGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0NhbGN1bGF0aW9uT3V0cHV0RGF0YX0gY2FsY3VsYXRpb25PdXRwdXREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YShjYWxjdWxhdGlvbk91dHB1dERhdGE6IENhbGN1bGF0aW9uT3V0cHV0RGF0YSkge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyLnB1c2goY2FsY3VsYXRpb25PdXRwdXREYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbnRhaW5lciBob2xkaW5nIHRoZSBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSAoZGF0YSByZXN1bHRpbmcgZnJvbSBjYWxjdWxhdGlvbikuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uT3V0cHV0RGF0YT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldENhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcigpOiBBcnJheTxDYWxjdWxhdGlvbk91dHB1dERhdGE+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXI7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZXJyb3IgdG8gdGhlIGVycm9ybGlzdCBvZiB0aGUgY2FsY3VsYXRvci5cclxuICAgICAqIEdlbmVyYXRlcyB0aGUgZXJyb3IgbWVzc2FnZSBiYXNlZCBvbiBlcnJvciB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7RXJyb3JNZXNzYWdlVHlwZX0gZXJyb3JNZXNzYWdlVHlwZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBlcnJvck1lc3NhZ2VEYXRhXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRFcnJvckJ5VHlwZShlcnJvck1lc3NhZ2VUeXBlOiBFcnJvck1lc3NhZ2VUeXBlLCBlcnJvck1lc3NhZ2VEYXRhOiBBcnJheTxzdHJpbmc+KXtcclxuXHJcbiAgICAgICAgaWYoIShlcnJvck1lc3NhZ2VEYXRhLmxlbmd0aCA+IDApKSB7IC8vIGxvZyB0byBjb25zb2xlIGlmIG5vIGVycm9yTWVzc2FnZURhdGEgaXMgcHJvdmlkZWRcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvck1lc3NhZ2VEYXRhIGlzIG1pc3NpbmchXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJcIjtcclxuICAgICAgICBsZXQgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSA9IGVycm9yTWVzc2FnZURhdGEuam9pbihcIiwgXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAoZXJyb3JNZXNzYWdlVHlwZSkgeyAvLyBnZW5lcmF0ZSBlcnJvciBtZXNzYWdlIGFjY29yZGluZyB0byBlcnJyb3IgdHlwZVxyXG5cclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dDpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IERhdGEgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgaXMgbWlzc2luZyBvciBpbnZhbGlkIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5JbnZhbGlkT3V0cHV0OlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogT3V0cHV0IGRhdGEgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgaXMgaW52YWxpZCFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuSW52YWxpZElucHV0VHlwZTpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IElucHV0IHNpZ25hbCB0eXBlIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGlzIG5vdCBzdXBwb3J0ZWQhIFBsZWFzZSB1c2UgaW5wdXQgc2lnbmFsIG9mIHR5cGUgWVQuXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLk5vdEVub3VnaENvbW1vblRpbWVzdGFtcHM6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXRzICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgZG8gbm90IHNoYXJlIGVub3VnaCBjb21tb24gdGltZXN0YW1wcyFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuQ29udGFpbnNOYU5PckluZmluaXR5OlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogRGF0YSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBkb2VzIGNvbnRhaW4gTmFOIG9yIEluZmluaXR5IVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc1plcm9JbllWYWx1ZXM6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBEYXRhIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGRvZXMgY29udGFpbiAwIGluIHRoZSB5IHZhbHVlcyFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuQ29udGFpbnNGbG9hdGluZ051bWJlcnM6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBEYXRhIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGRvZXMgY29udGFpbiBmbG9hdGluZyBwb2ludCBudW1iZXJzIGluIHRoZSB5IHZhbHVlcyFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuTnVtYmVyTm90QWxsb3dlZFRvQmVaZXJvOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogRGF0YSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBpcyBub3QgYWxsb3dlZCB0byBiZSAwIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5OdW1iZXJJc05vSW50OlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogRGF0YSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBpcyBub3QgYWxsb3dlZCB0byBiZSBhIGZsb2F0aW5nIHBvaW50IG51bWJlciFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuTm90U3RyaWN0bHlNb25vdG9uaWNhbGx5SW5jcmVhc2luZ0luVGltZTpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IERhdGEgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgaXMgbm90IHN0cmljdGx5IG1vbm90b25pY2FsbHkgaW5jcmVhc2luZyBpbiB0aW1lIVwiXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLkFycmF5c0hhdmVEaWZmZXJlbnRMZW5ndGg6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIiBuZWVkIHRvIGhhdmUgdGhlIHNhbWUgbGVuZ3RoIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBDYWxjdWxhdGlvbiBvZiAnXCIrIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgK1wiJyBmYWlsZWQhIFVua25vd24gcmVhc29uIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVycm9yTGlzdC5wdXNoKGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9vayB0byBwcm92aWRlIHRoZSBkZWZhdWx0IGlucHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KX1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcblxyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gbmV3IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KCk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb29rIHRvIHByb3ZpZGUgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuXHJcbiAgICAgICAgbGV0IGRlZmF1bHRPdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdE91dHB1dERhdGE7XHJcbiAgICB9XHJcbiAgICAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJ1bnMgdGhlIHN0ZXBzIG5lY2Vzc2FyeSB0byBwZXJmb3JtIHRoZSBjYWxjdWxhdGlvbiBvZiB0aGUgY2FsY3VsYXRvci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxUQ2FsY3VsYXRpb25EYXRhPil9IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZShpbnB1dERhdGE6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXh0cmFjdENhbGN1bGF0aW9uRGF0YShpbnB1dERhdGEpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXBhcmVDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdE91dHB1dERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZXhlY3V0ZUFsZ29yaXRobSgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcmlmeUNhbGN1bGF0aW9uT3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3V0cHV0RGF0YTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiA9IHRoaXMuZ2VuZXJhdGVPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0cmFjdHMgdGhlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEgZnJvbSB0aGUgY2FsY3VsYXRvciBpbnB1dC5cclxuICAgICAqIENoZWNrcyBpZiBpbnB1dCBpcyBub3Qgb2YgdHlwZSBYWSBvciBGRlQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KX0gaW5wdXREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHRyYWN0Q2FsY3VsYXRpb25EYXRhKGlucHV0RGF0YTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4pIHtcclxuXHJcbiAgICAgICAgbGV0IGludmFsaWRTZXJpZVR5cGVzTmFtZXM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICBpbnB1dERhdGEuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgZGF0YTogaW5wdXQuZ2V0RGF0YSgpLFxyXG4gICAgICAgICAgICAgICBuYW1lOiBpbnB1dC5nZXREaXNwbGF5TmFtZSgpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZihpbnB1dC50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzIHx8IGlucHV0LnR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgaW52YWxpZFNlcmllVHlwZXNOYW1lcy5wdXNoKGlucHV0LmdldERpc3BsYXlOYW1lKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uSW5wdXREYXRhKGNhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKGludmFsaWRTZXJpZVR5cGVzTmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuSW52YWxpZElucHV0VHlwZSwgaW52YWxpZFNlcmllVHlwZXNOYW1lcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvb2sgZm9yIHByZXBhcmluZyB0aGUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkICBwcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCkge31cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb29rIGZvciB2ZXJpZnlpbmcgY2FsY3VsYXRpb24gaW5wdXQgZGF0YS5cclxuICAgICAqIFBlcmZvcm1zIGJhc2ljIHZlcmlmaWNhdGlvbiBhcyBkZWZhdWx0LlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKXtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKS5mb3JFYWNoKChjYWxjdWxhdGlvbklucHV0RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGNhbGN1bGF0aW9uSW5wdXREYXRhLmRhdGEpKSB7IC8vY2FsY3VsYXRpb25JbnB1dERhdGEgaXMgYSBzaWduYWxcclxuICAgICAgICAgICAgICAgIGlmKCFDYWxjdWxhdG9ySGVscGVyLmlzU2lnbmFsTG9uZ2VyVGhhbk1pbmltdW0oY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW2NhbGN1bGF0aW9uSW5wdXREYXRhLm5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihDYWxjdWxhdG9ySGVscGVyLmNvbnRhaW5zTmFOT3JJbmZpbml0eUluWXZhbHVlKGNhbGN1bGF0aW9uSW5wdXREYXRhLmRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc05hTk9ySW5maW5pdHksIFtjYWxjdWxhdGlvbklucHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGNhbGN1bGF0aW9uSW5wdXREYXRhLmRhdGEpKXsgLy9jYWxjdWxhdGlvbklucHV0RGF0YSBpcyBhIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYoTnVtYmVyLmlzTmFOKGNhbGN1bGF0aW9uSW5wdXREYXRhLmRhdGEpKXsgLy9OYU4gbWVhbnMgbm8gZGF0YSBwcm92aWRlZCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbY2FsY3VsYXRpb25JbnB1dERhdGEubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZE51bWJlcihjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc05hTk9ySW5maW5pdHksIFtjYWxjdWxhdGlvbklucHV0RGF0YS5uYW1lXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpe1xyXG4gICAgICAgICAgICAgICAgaWYoY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFtjYWxjdWxhdGlvbklucHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb29rIGZvciBleGVjdXRpbmcgdGhlIGFsZ29yaXRobS9jYWxjdWxhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkICBleGVjdXRlQWxnb3JpdGhtKCkge31cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb29rIGZvciB2ZXJpZnlpbmcgdGhlIGNhbGN1bGF0aW9uIHJlc3VsdC5cclxuICAgICAqIFBlcmZvcm1zIGJhc2ljIHZlcmZpY2F0aW9uIGFzIGRlZmF1bHQuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbk91dHB1dERhdGEoKXtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIoKS5mb3JFYWNoKChjYWxjdWxhdGlvbk91dHB1dERhdGEpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFDYWxjdWxhdG9ySGVscGVyLmlzU2lnbmFsTG9uZ2VyVGhhbk1pbmltdW0oY2FsY3VsYXRpb25PdXRwdXREYXRhLmRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkludmFsaWRPdXRwdXQsIFtjYWxjdWxhdGlvbk91dHB1dERhdGEubmFtZV0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoQ2FsY3VsYXRvckhlbHBlci5jb250YWluc05hTk9ySW5maW5pdHlJbll2YWx1ZShjYWxjdWxhdGlvbk91dHB1dERhdGEuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuQ29udGFpbnNOYU5PckluZmluaXR5LCBbY2FsY3VsYXRpb25PdXRwdXREYXRhLm5hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIG91dHB1dCBkYXRhIG9mIHRoZSBjYWxjdWxhdG9yIGJhc2VkIG9uIHRoZSBkYXRhIGluIHRoZSBjYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lci5mb3JFYWNoKChjYWxjdWxhdGlvbk91dHB1dERhdGEpPT57XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoY2FsY3VsYXRpb25PdXRwdXREYXRhLmlkLCBjYWxjdWxhdGlvbk91dHB1dERhdGEubmFtZSwgY2FsY3VsYXRpb25PdXRwdXREYXRhLnZhbHVlLCBjYWxjdWxhdGlvbk91dHB1dERhdGEuZGF0YSkpOyBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIG91dHB1dERhdGEgPSB0aGlzLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY2FsY3VsYXRpb24gZGF0YSB1c2VkIGJ5IHRoZSBhbGdvcml0aG0gb2YgdGhlIGNhbGN1bGF0b3IgYWZ0ZXIgYWxsIHByZXBhcmF0aW9ucyBkb25lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4pfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBY3R1YWxJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSB0aGlzLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPGlucHV0RGF0YS5sZW5ndGggJiYgaTxjYWxjdWxhdGlvbkRhdGEubGVuZ3RoOyBpKyspIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgKGlucHV0RGF0YVtpXSBhcyBDYWxjdWxhdGlvbkRhdGEpLnNldERhdGEoY2FsY3VsYXRpb25EYXRhW2ldLmRhdGEpOyAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7Q2FsY3VsYXRvckJhc2UsIEVycm9yTWVzc2FnZVR5cGUsIEVycm9yTWVzc2FnZVR5cGUgYXMgRXJyb01lc3NhZ2VUeXBlfTsiXX0=
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
define(["require", "exports", "../common/calculatorProvider/calculatorProvider", "../common/signal/serieContainer", "../common/calculatorProvider/calculationData", "../common/calculatorProvider/calculationDataPoints", "./signalManagerCalculationInputData", "./signalManagerCalculationOutputData", "../common/series/eventSerieDataChangedArgs", "./signalManagerCalculation", "./eventSignalManagerDataChangedArgs"], function (require, exports, calculatorProvider_1, serieContainer_1, calculationData_1, calculationDataPoints_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, eventSerieDataChangedArgs_1, signalManagerCalculation_1, eventSignalManagerDataChangedArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculatorType = /** @class */ (function (_super) {
        __extends(SignalManagerCalculatorType, _super);
        /**
         * Creates an instance of SignalManagerCalculatorType
         * @param {string} name
         * @param {string} value
         * @memberof SignalManagerCalculatorType
         */
        function SignalManagerCalculatorType(name, value, seriesProvider) {
            var _this = _super.call(this, name, "", true) || this;
            _this._inputDataChangedHandler = function (sender, args) { return _this.onInputDataValueChanged(sender, args); };
            _this._inputSerieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            _this._outputDataChangedHandler = function (sender, args) { return _this.onOutputDataValueChanged(sender, args); };
            _this.dataTypeName = "String";
            _this._seriesProvider = seriesProvider;
            _this._value = value;
            _this.canDelete = false;
            _this._values = _this.getAvailableCalculators();
            _this._onlyValuesFromListAreAllowed = true;
            return _this;
        }
        Object.defineProperty(SignalManagerCalculatorType.prototype, "values", {
            get: function () {
                return this._values;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "onlyValuesFromListAreAllowed", {
            get: function () {
                return this._onlyValuesFromListAreAllowed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "minValue", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "maxValue", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "name", {
            /**
             * Returns the name of this calculator type
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculatorType
             */
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == true) {
                        return this._name; // Show the name of calculator type in the edit mode (e.g. Algorithm)
                    }
                }
                return this.value; // Show only the value (e.g. "Add")
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "parent", {
            /**
             * Returns the parent of this calculator type
             *
             * @type {(ISerieContainer | undefined)}
             * @memberof SignalManagerCalculatorType
             */
            get: function () {
                return this._parent;
            },
            /**
             * Sets the parent of this calculator type
             *
             * @memberof SignalManagerCalculatorType
             */
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Remove reference to serie from this calculation
         *
         * @param {BaseSeries} serie
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.removeReferenceToSerie = function (serie) {
            var calcDatas = this.getCalculationDatasCorrespondingToSignalName(serie);
            calcDatas.forEach(function (calculationData) {
                calculationData.value = "";
                var defaultData = new Array();
                calculationData.calculationData.setData(defaultData);
            });
        };
        Object.defineProperty(SignalManagerCalculatorType.prototype, "displayValue", {
            // needed for CellTypeEditor
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "value", {
            /**
             * Returns the value of this calculator type
             *
             * @type {string}
             * @memberof SignalManagerCalculatorType
             */
            get: function () {
                return this._value;
            },
            /**
             * Sets the value of this calculator type
             *
             * @memberof SignalManagerCalculatorType
             */
            set: function (value) {
                if (this._value != value) {
                    var id = calculatorProvider_1.CalculatorProvider.getInstance().convertDisplayNameToId(value);
                    this.setCalculatorById(id);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the calculator by the given id
         *
         * @param {string} id
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.setCalculatorById = function (id) {
            var oldValue = this._value;
            var displayName = calculatorProvider_1.CalculatorProvider.getInstance().convertIdToDisplayName(id);
            this._value = displayName;
            this._calculator = calculatorProvider_1.CalculatorProvider.getInstance().getCalculator(id);
            this.updateChildsByCalculatorType();
            // Calculate with default values to get error infos which data is not available
            this.calculate();
            // Raise data changed event
            this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.valueChanged, displayName, oldValue));
        };
        /**
         * Attach to the events of the input and output data
         *
         * @private
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.attachEvents = function () {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    this.childs[i].eventDataChanged.attach(this._inputDataChangedHandler);
                    this.childs[i].eventSerieDataChanged.attach(this._inputSerieDataChangedHandler);
                }
                else if (this.childs[i] instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    this.childs[i].eventDataChanged.attach(this._outputDataChangedHandler);
                }
            }
        };
        /**
         * Detach events from the input and output data
         *
         * @private
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.detachEvents = function () {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    this.childs[i].eventDataChanged.detach(this._inputDataChangedHandler);
                    this.childs[i].eventSerieDataChanged.detach(this._inputSerieDataChangedHandler);
                }
                else if (this.childs[i] instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    this.childs[i].eventDataChanged.detach(this._outputDataChangedHandler);
                }
            }
        };
        SignalManagerCalculatorType.prototype.updateChildsByCalculatorType = function () {
            // Detach events of current childs
            this.detachEvents();
            // Clear current childs
            this.clear();
            if (this._calculator == undefined) {
                return;
            }
            // Add input data for calculation
            var defaultInputData = this._calculator.getDefaultInputData();
            for (var i = 0; i < defaultInputData.length; i++) {
                var inputData = new signalManagerCalculationInputData_1.SignalManagerCalculationInputData(defaultInputData[i]);
                this.addSerieNode(inputData);
            }
            // Add ouput data for calculation
            var defaultOutputData = this._calculator.getDefaultOutputData();
            for (var i = 0; i < defaultOutputData.length; i++) {
                var outputData = new signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData(defaultOutputData[i], this._seriesProvider);
                this.addSerieNode(outputData);
            }
            // Attach events to the new childs
            this.attachEvents();
        };
        Object.defineProperty(SignalManagerCalculatorType.prototype, "description", {
            /**
             * Returns the description of the calculator type
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculatorType
             */
            get: function () {
                if (this._calculator != undefined) {
                    return this._calculator.description;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Dispose the SignalManagerCalculatorType
         *
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.dispose = function () {
            // Detach events
            this.detachEvents();
            _super.prototype.dispose.call(this);
        };
        /**
         * Clones the SignalManagerCalculatorType object with all childs
         *
         * @returns {SignalManagerCalculatorType}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.clone = function () {
            // Clone object
            var clone = new SignalManagerCalculatorType(this._name, "", this._seriesProvider);
            if (this._calculator != undefined) {
                clone.setCalculatorById(this._calculator.id); // Set current used calculator from original
            }
            // Set input data 
            var originalInputDatas = this.getInputCalculationData();
            var clonedInputDatas = clone.getInputCalculationData();
            for (var i = 0; i < originalInputDatas.length; i++) {
                // Set data from original to cloned object
                var originalInputData = originalInputDatas[i];
                clonedInputDatas[i].value = originalInputData.value;
                if (originalInputData.serie != undefined) {
                    clonedInputDatas[i].serie = originalInputData.serie.clone();
                }
                // Sets the data information from the original object to the new created cloned object
                calculationData_1.CalculationData.setRawData(originalInputData.calculationData, clonedInputDatas[i].calculationData);
            }
            // Set output data
            var originalOutputData = this.getFirstOutputCalculationData(); // TODO: multioutput
            var clonedOutputData = clone.getFirstOutputCalculationData(); // TODO: multioutput
            if (originalOutputData != undefined && clonedOutputData != undefined) {
                clonedOutputData.value = originalOutputData.value;
            }
            clone.calculate();
            return clone;
        };
        /**
         * Returns a list with available calculators displayValue and id
         *
         * @private
         * @returns {any[]}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.getAvailableCalculators = function () {
            var possibleTypes = new Array();
            var calculators = calculatorProvider_1.CalculatorProvider.getInstance().calculators;
            for (var i = 0; i < calculators.length; i++) {
                possibleTypes.push({ displayValue: calculators[i].displayName, value: calculators[i].id });
            }
            return possibleTypes;
        };
        SignalManagerCalculatorType.prototype.getSerie = function (serieName) {
            if (serieName != undefined) {
                var serieGroup = this.getSerieGroup();
                if (serieGroup != undefined) {
                    return serieGroup.getSerie(serieName);
                }
            }
            return undefined;
        };
        SignalManagerCalculatorType.prototype.onInputDataValueChanged = function (sender, args) {
            if (args.data == args.oldData) {
                // Nothing has changed
                return;
            }
            if (sender instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                var signalCalculationInputData = sender;
                var calculationData = signalCalculationInputData.calculationData;
                // Check if old input data was a signal(name)
                var oldSerie = this.getSerie(calculationData.value);
                if (oldSerie != undefined) {
                    // Remove current used signal from calculationData
                    signalCalculationInputData.serie = undefined;
                }
                // Check if new input data is a signal(name)
                var serie = this.getSerie(signalCalculationInputData.getRawValue()); // get the signal group and look for signal with given name in it
                if (serie != undefined) {
                    if (this.cycleFound(signalCalculationInputData.value, "", true) == false) {
                        signalCalculationInputData.setSignalCalculationValueToCalculationDataWithSerieData(serie, calculationData);
                    }
                    else {
                        //  Cycle found use old input data
                        signalCalculationInputData.value = calculationData.value; // TODO: Show MessageBox
                    }
                }
                else {
                    calculationData.type = undefined;
                    signalCalculationInputData.setSignalCalculationValueToCalculationData(calculationData);
                }
                this.calculate();
            }
        };
        /**
         * Check if the signal name, which will be used for input of this calculation depends on the output of this calculation
         *
         * @param {string} inputSignalName
         * @param {string} [ouputSignalName=""]
         * @returns {boolean}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.cycleFound = function (inputSignalName, ouputSignalName, showMessage) {
            if (ouputSignalName === void 0) { ouputSignalName = ""; }
            if (showMessage === void 0) { showMessage = false; }
            // get serieNode where it is defined(calculation output or normal signal)
            var serieNode = this.getSerieGroup().getSerieNode(inputSignalName);
            if (serieNode == undefined) {
                return false; // No signal node found => no cycle
            }
            if (!(serieNode instanceof signalManagerCalculation_1.SignalManagerCalculation)) {
                return false; // No calculated signal => no cycle
            }
            if (ouputSignalName == "") {
                //Workaround: Fixed for creation of FFT with D&D. Input data should be added after calculator has been created.
                var firstOutputData = this.getFirstOutputCalculationData();
                if (firstOutputData != undefined) {
                    ouputSignalName = firstOutputData.value;
                }
            }
            if (this.foundCircularReference(serieNode, ouputSignalName, showMessage)) {
                return true;
            }
            return false;
        };
        SignalManagerCalculatorType.prototype.foundCircularReference = function (calculationNode, ouputSignalName, showMessage) {
            if (ouputSignalName === void 0) { ouputSignalName = ""; }
            // get input signals of calculation
            // TODO: refactor a little
            if (calculationNode.getChilds()[0] instanceof SignalManagerCalculatorType) {
                var calculatorType = calculationNode.getChilds()[0];
                var inputSerieNodes = calculatorType.getInputCalculationData();
                for (var i = 0; i < inputSerieNodes.length; i++) {
                    if (inputSerieNodes[i].value == ouputSignalName) { // TODO: multi output
                        if (showMessage == true) {
                            alert("Circular reference found!");
                        }
                        return true; // input references to output of current calculation => cycle found
                    }
                    else {
                        var childSerieNode = inputSerieNodes[i].getSerieGroup().getSerieNode(inputSerieNodes[i].value);
                        if (childSerieNode != undefined) {
                            var cycleFound = inputSerieNodes[i].parent.cycleFound(inputSerieNodes[i].value, ouputSignalName, showMessage);
                            if (cycleFound == true) {
                                if (showMessage == true) {
                                    alert("Circular reference found!");
                                }
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        SignalManagerCalculatorType.prototype.onSerieDataChanged = function (sender, args) {
            var serie = sender;
            var correspondingCalculationDatas = this.getCalculationDatasCorrespondingToSignalName(serie);
            if (args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                correspondingCalculationDatas.forEach(function (calcData) {
                    calcData.calculationData.setData(args.data); // Sets the actual data points to the calculation input data
                });
                this.calculate();
            }
            else if (args.action == eventSerieDataChangedArgs_1.SerieAction.rename) {
                correspondingCalculationDatas.forEach(function (calcData) {
                    calcData.value = serie.name;
                });
            }
        };
        SignalManagerCalculatorType.prototype.getCalculationDatasCorrespondingToSignalName = function (serie) {
            var calcDatas = new Array();
            for (var i = 0; i < this.childs.length; i++) {
                var signalCalculationData = (this.childs[i]);
                if (signalCalculationData.serie == serie) {
                    calcDatas.push(this.childs[i]);
                }
            }
            return calcDatas;
        };
        /**
         * Calculates with the current input data and updates the outputdata
         *
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.calculate = function () {
            // Calculate with actual input data
            var inputData = new Array();
            var calculationOutputData = new Array();
            var inputCalculationData;
            var actuallyUsedInputData = inputData;
            if (this._calculator != undefined) {
                // Start calculation with actual input data
                inputCalculationData = this.getInputCalculationData();
                inputCalculationData.forEach(function (inputCalculationData) {
                    inputData.push(inputCalculationData.calculationData);
                });
                calculationOutputData = this._calculator.calculate(inputData);
                actuallyUsedInputData = this._calculator.getActualInputData();
            }
            // Update outputdata TODO: multi output ,not only the first one
            var outputData = this.getFirstOutputCalculationData();
            if (outputData != undefined && outputData.serie != undefined) {
                if (this._calculator != undefined) {
                    var errors = this._calculator.getErrors();
                    if (errors.length > 0) {
                        outputData.serie.errorInfo = errors;
                    }
                }
                var calculatorType = calculatorProvider_1.CalculatorProvider.getInstance().convertDisplayNameToId(this.value);
                outputData.serie.updateCalculationDataInfo(actuallyUsedInputData, calculatorType, this.getInputCalculationData(), this._seriesProvider);
                if (calculationOutputData[0] instanceof calculationDataPoints_1.CalculationDataPoints) {
                    outputData.serie.updatePoints(calculationOutputData[0].getData());
                    var seriesGroup = outputData.getSerieGroup();
                    if (seriesGroup != undefined) {
                        outputData.serie.startTriggerTime = seriesGroup.startTriggerTime;
                    }
                }
                else {
                    console.error("New calculation output data available. New implementation needed! Only DataPoints supported currently.");
                }
            }
        };
        /**
         * Returns all calculation input datas
         *
         * @returns {Array<SignalManagerCalculationInputData>}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.getInputCalculationData = function () {
            var inputData = new Array();
            var calculationTypeChilds = this.childs;
            for (var i = 0; i < calculationTypeChilds.length; i++) {
                var signalCalculationData = calculationTypeChilds[i];
                if (signalCalculationData instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    inputData.push(signalCalculationData);
                }
            }
            return inputData;
        };
        SignalManagerCalculatorType.prototype.getInputCalculationDataById = function (id) {
            var calculationTypeChilds = this.childs;
            for (var i = 0; i < calculationTypeChilds.length; i++) {
                var signalCalculationData = calculationTypeChilds[i];
                if (signalCalculationData instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    if (signalCalculationData.calculationData.id == id) {
                        return signalCalculationData;
                    }
                }
            }
            return undefined;
        };
        /**
         * Returns the first calculation output data
         *
         * @returns {(SignalManagerCalculationOutputData|undefined)}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.getFirstOutputCalculationData = function () {
            var calculationTypeChilds = this.childs;
            for (var i = 0; i < calculationTypeChilds.length; i++) {
                var calculationData = calculationTypeChilds[i];
                if (calculationData instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    return calculationData;
                }
            }
            return undefined;
        };
        /**
         * Returns a series for the given name from this calculator type node (e.g. output series of calculations)
         *
         * @param {string} [serieName=""] if serieName = "" all series wil be returned
         * @returns {Array<ISerieNode>}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.getSerieNodes = function (serieName) {
            if (serieName === void 0) { serieName = ""; }
            var serieNodes = new Array();
            for (var i = 0; i < this.childs.length; i++) {
                var child = this.childs[i];
                if (child instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) { // Is only a signal in case of outputdata
                    if (serieName == "" || child.value == serieName) {
                        serieNodes.push(child);
                    }
                }
                else if (child instanceof serieContainer_1.SerieContainer) {
                    serieNodes = serieNodes.concat(child.getSerieNodes(serieName));
                }
            }
            return serieNodes;
        };
        SignalManagerCalculatorType.prototype.onOutputDataValueChanged = function (sender, args) {
            var serieGroup = this.getSerieGroup();
            if (serieGroup != undefined) {
                var serieNode = this.getSerieGroup().getSerieNodes(args.data);
                if (serieNode.length > 1) { // Signal with given name already available => set signal name to the used name before
                    var signalCalculationData = sender;
                    signalCalculationData.value = args.oldData;
                    //let calculationData = signalCalculationData.calculationData
                    //calculationData.value = args.oldData; 
                    // TODO: Show MessageBox
                    return;
                }
            }
            this.onDataChanged(sender, args);
        };
        return SignalManagerCalculatorType;
    }(serieContainer_1.SerieContainer));
    exports.SignalManagerCalculatorType = SignalManagerCalculatorType;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWtCQTtRQUFpRCwrQ0FBYztRQWlOM0Q7Ozs7O1dBS0c7UUFDSCxxQ0FBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLGNBQStCO1lBQXhFLFlBQ0ksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FNdkI7WUF4Tk0sOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQztZQUN4RixtQ0FBNkIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBQ3hGLCtCQUF5QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTNDLENBQTJDLENBQUM7WUFjbEcsa0JBQVksR0FBVyxRQUFRLENBQUM7WUFtTTVCLEtBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDOUMsS0FBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQzs7UUFDN0MsQ0FBQztRQWpORixzQkFB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QUMsT0FBTyxDQUFDO29CQUMzQyw2REFBNkQ7b0JBQzdELHdDQUF3QztvQkFDeEMsd0JBQXdCO29CQUN4QixPQUFPO2lCQUNWO2FBQ0o7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUwsa0NBQUM7SUFBRCxDQUFDLEFBOWlCRCxDQUFpRCwrQkFBYyxHQThpQjlEO0lBOWlCWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdG9yUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9yUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhLCBDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncywgU2VyaWVBY3Rpb24gfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllcy9ldmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncywgU2lnbmFsTWFuYWdlckFjdGlvbiB9IGZyb20gXCIuL2V2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJnc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSBleHRlbmRzIFNlcmllQ29udGFpbmVyIGltcGxlbWVudHMgSUNlbGxJbmZve1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgX2NhbGN1bGF0b3I6IElDYWxjdWxhdG9yfHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9pbnB1dERhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25JbnB1dERhdGFWYWx1ZUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuICAgIHByaXZhdGUgX2lucHV0U2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfb3V0cHV0RGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbk91dHB1dERhdGFWYWx1ZUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlczogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+O1xyXG4gICAgcHVibGljIGdldCB2YWx1ZXMoKTogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQ6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgZ2V0IG9ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YVR5cGVOYW1lOiBzdHJpbmcgPSBcIlN0cmluZ1wiO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbWluVmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IG1heFZhbHVlKCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhpcyBjYWxjdWxhdG9yIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBkYXRhTW9kZWwgPSB0aGlzLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgIGlmKGRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihkYXRhTW9kZWwuZWRpdE1vZGVBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZSE7IC8vIFNob3cgdGhlIG5hbWUgb2YgY2FsY3VsYXRvciB0eXBlIGluIHRoZSBlZGl0IG1vZGUgKGUuZy4gQWxnb3JpdGhtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlOyAvLyBTaG93IG9ubHkgdGhlIHZhbHVlIChlLmcuIFwiQWRkXCIpXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFyZW50IG9mIHRoaXMgY2FsY3VsYXRvciB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcGFyZW50IG9mIHRoaXMgY2FsY3VsYXRvciB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHBhcmVudCh2YWx1ZTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgcmVmZXJlbmNlIHRvIHNlcmllIGZyb20gdGhpcyBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVJlZmVyZW5jZVRvU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGxldCBjYWxjRGF0YXMgPSB0aGlzLmdldENhbGN1bGF0aW9uRGF0YXNDb3JyZXNwb25kaW5nVG9TaWduYWxOYW1lKHNlcmllKTtcclxuICAgICAgICBjYWxjRGF0YXMuZm9yRWFjaChjYWxjdWxhdGlvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdERhdGEgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEuY2FsY3VsYXRpb25EYXRhLnNldERhdGEoPGFueT5kZWZhdWx0RGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbmVlZGVkIGZvciBDZWxsVHlwZUVkaXRvclxyXG4gICAgcHVibGljIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGlzIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5fdmFsdWUgIT0gdmFsdWUpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBDYWxjdWxhdG9yUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5jb252ZXJ0RGlzcGxheU5hbWVUb0lkKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRDYWxjdWxhdG9yQnlJZChpZCk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2FsY3VsYXRvciBieSB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENhbGN1bGF0b3JCeUlkKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIGxldCBkaXNwbGF5TmFtZSA9IENhbGN1bGF0b3JQcm92aWRlci5nZXRJbnN0YW5jZSgpLmNvbnZlcnRJZFRvRGlzcGxheU5hbWUoaWQpO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gZGlzcGxheU5hbWU7XHJcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRvciA9IENhbGN1bGF0b3JQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldENhbGN1bGF0b3IoaWQpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hpbGRzQnlDYWxjdWxhdG9yVHlwZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aXRoIGRlZmF1bHQgdmFsdWVzIHRvIGdldCBlcnJvciBpbmZvcyB3aGljaCBkYXRhIGlzIG5vdCBhdmFpbGFibGVcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpOyAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmFpc2UgZGF0YSBjaGFuZ2VkIGV2ZW50XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi52YWx1ZUNoYW5nZWQsIGRpc3BsYXlOYW1lLCBvbGRWYWx1ZSkpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCB0byB0aGUgZXZlbnRzIG9mIHRoZSBpbnB1dCBhbmQgb3V0cHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaEV2ZW50cygpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkc1tpXS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9pbnB1dERhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkc1tpXS5ldmVudFNlcmllRGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX2lucHV0U2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jaGlsZHNbaV0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX291dHB1dERhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2ggZXZlbnRzIGZyb20gdGhlIGlucHV0IGFuZCBvdXRwdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoRXZlbnRzKCl7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX2lucHV0RGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50U2VyaWVEYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5faW5wdXRTZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmNoaWxkc1tpXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHNbaV0uZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb3V0cHV0RGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNoaWxkc0J5Q2FsY3VsYXRvclR5cGUoKXtcclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzIG9mIGN1cnJlbnQgY2hpbGRzXHJcbiAgICAgICAgdGhpcy5kZXRhY2hFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBjaGlsZHNcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2NhbGN1bGF0b3IgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgaW5wdXQgZGF0YSBmb3IgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IhLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGRlZmF1bHRJbnB1dERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YShkZWZhdWx0SW5wdXREYXRhW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZU5vZGUoaW5wdXREYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBvdXB1dCBkYXRhIGZvciBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IhLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkZWZhdWx0T3V0cHV0RGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEoZGVmYXVsdE91dHB1dERhdGFbaV0sIHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZU5vZGUob3V0cHV0RGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdHRhY2ggZXZlbnRzIHRvIHRoZSBuZXcgY2hpbGRzXHJcbiAgICAgICAgdGhpcy5hdHRhY2hFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBjYWxjdWxhdG9yIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLl9jYWxjdWxhdG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWxjdWxhdG9yLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcil7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgXCJcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzUHJvdmlkZXIgPSBzZXJpZXNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gdGhpcy5nZXRBdmFpbGFibGVDYWxjdWxhdG9ycygpO1xyXG4gICAgICAgIHRoaXMuX29ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQgPSB0cnVlO1xyXG4gICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgICAvLyBEZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgIHRoaXMuZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhlIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSBvYmplY3Qgd2l0aCBhbGwgY2hpbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIHtcclxuICAgICAgICAvLyBDbG9uZSBvYmplY3RcclxuICAgICAgICBsZXQgY2xvbmUgPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKHRoaXMuX25hbWUhLCBcIlwiLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcbiAgICAgICAgaWYodGhpcy5fY2FsY3VsYXRvciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjbG9uZS5zZXRDYWxjdWxhdG9yQnlJZCh0aGlzLl9jYWxjdWxhdG9yLmlkKTsgLy8gU2V0IGN1cnJlbnQgdXNlZCBjYWxjdWxhdG9yIGZyb20gb3JpZ2luYWxcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICAvLyBTZXQgaW5wdXQgZGF0YSBcclxuICAgICAgICBsZXQgb3JpZ2luYWxJbnB1dERhdGFzID0gdGhpcy5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGxldCBjbG9uZWRJbnB1dERhdGFzID0gY2xvbmUuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IG9yaWdpbmFsSW5wdXREYXRhcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vIFNldCBkYXRhIGZyb20gb3JpZ2luYWwgdG8gY2xvbmVkIG9iamVjdFxyXG4gICAgICAgICAgICBsZXQgb3JpZ2luYWxJbnB1dERhdGEgPSBvcmlnaW5hbElucHV0RGF0YXNbaV07XHJcbiAgICAgICAgICAgIGNsb25lZElucHV0RGF0YXNbaV0udmFsdWUgPSBvcmlnaW5hbElucHV0RGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgaWYob3JpZ2luYWxJbnB1dERhdGEuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNsb25lZElucHV0RGF0YXNbaV0uc2VyaWUgPSBvcmlnaW5hbElucHV0RGF0YS5zZXJpZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXRzIHRoZSBkYXRhIGluZm9ybWF0aW9uIGZyb20gdGhlIG9yaWdpbmFsIG9iamVjdCB0byB0aGUgbmV3IGNyZWF0ZWQgY2xvbmVkIG9iamVjdFxyXG4gICAgICAgICAgICBDYWxjdWxhdGlvbkRhdGEuc2V0UmF3RGF0YShvcmlnaW5hbElucHV0RGF0YS5jYWxjdWxhdGlvbkRhdGEsIGNsb25lZElucHV0RGF0YXNbaV0uY2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IG91dHB1dCBkYXRhXHJcbiAgICAgICAgbGV0IG9yaWdpbmFsT3V0cHV0RGF0YSA9IHRoaXMuZ2V0Rmlyc3RPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgLy8gVE9ETzogbXVsdGlvdXRwdXRcclxuICAgICAgICBsZXQgY2xvbmVkT3V0cHV0RGF0YSA9IGNsb25lLmdldEZpcnN0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7IC8vIFRPRE86IG11bHRpb3V0cHV0XHJcbiAgICAgICAgaWYob3JpZ2luYWxPdXRwdXREYXRhICE9IHVuZGVmaW5lZCAmJiBjbG9uZWRPdXRwdXREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNsb25lZE91dHB1dERhdGEudmFsdWUgPSBvcmlnaW5hbE91dHB1dERhdGEudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsb25lLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgIHJldHVybiBjbG9uZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IHdpdGggYXZhaWxhYmxlIGNhbGN1bGF0b3JzIGRpc3BsYXlWYWx1ZSBhbmQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2FueVtdfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEF2YWlsYWJsZUNhbGN1bGF0b3JzKCk6IGFueVtde1xyXG4gICAgICAgIGxldCBwb3NzaWJsZVR5cGVzID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRvcnMgPSBDYWxjdWxhdG9yUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5jYWxjdWxhdG9ycztcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGNhbGN1bGF0b3JzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgcG9zc2libGVUeXBlcy5wdXNoKHtkaXNwbGF5VmFsdWU6IGNhbGN1bGF0b3JzW2ldLmRpc3BsYXlOYW1lLCB2YWx1ZTogY2FsY3VsYXRvcnNbaV0uaWR9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9zc2libGVUeXBlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNlcmllKHNlcmllTmFtZTogc3RyaW5nfHVuZGVmaW5lZCk6IEJhc2VTZXJpZXN8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHNlcmllTmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVHcm91cCA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWVHcm91cC5nZXRTZXJpZShzZXJpZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbklucHV0RGF0YVZhbHVlQ2hhbmdlZChzZW5kZXI6IElTZXJpZU5vZGUsIGFyZ3M6IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5kYXRhID09IGFyZ3Mub2xkRGF0YSl7XHJcbiAgICAgICAgICAgIC8vIE5vdGhpbmcgaGFzIGNoYW5nZWRcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZW5kZXIgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpe1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFsQ2FsY3VsYXRpb25JbnB1dERhdGE6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSA9IHNlbmRlcjtcclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YSA9IHNpZ25hbENhbGN1bGF0aW9uSW5wdXREYXRhLmNhbGN1bGF0aW9uRGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG9sZCBpbnB1dCBkYXRhIHdhcyBhIHNpZ25hbChuYW1lKVxyXG4gICAgICAgICAgICBsZXQgb2xkU2VyaWUgPSB0aGlzLmdldFNlcmllKGNhbGN1bGF0aW9uRGF0YS52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmKG9sZFNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY3VycmVudCB1c2VkIHNpZ25hbCBmcm9tIGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25JbnB1dERhdGEuc2VyaWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBuZXcgaW5wdXQgZGF0YSBpcyBhIHNpZ25hbChuYW1lKVxyXG4gICAgICAgICAgICBsZXQgc2VyaWUgPSB0aGlzLmdldFNlcmllKHNpZ25hbENhbGN1bGF0aW9uSW5wdXREYXRhLmdldFJhd1ZhbHVlKCkpOyAvLyBnZXQgdGhlIHNpZ25hbCBncm91cCBhbmQgbG9vayBmb3Igc2lnbmFsIHdpdGggZ2l2ZW4gbmFtZSBpbiBpdFxyXG4gICAgICAgICAgICBpZihzZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jeWNsZUZvdW5kKHNpZ25hbENhbGN1bGF0aW9uSW5wdXREYXRhLnZhbHVlLCBcIlwiLCB0cnVlKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25JbnB1dERhdGEuc2V0U2lnbmFsQ2FsY3VsYXRpb25WYWx1ZVRvQ2FsY3VsYXRpb25EYXRhV2l0aFNlcmllRGF0YShzZXJpZSwgY2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIEN5Y2xlIGZvdW5kIHVzZSBvbGQgaW5wdXQgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbENhbGN1bGF0aW9uSW5wdXREYXRhLnZhbHVlID0gY2FsY3VsYXRpb25EYXRhLnZhbHVlOyAvLyBUT0RPOiBTaG93IE1lc3NhZ2VCb3hcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY2FsY3VsYXRpb25EYXRhLnR5cGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxDYWxjdWxhdGlvbklucHV0RGF0YS5zZXRTaWduYWxDYWxjdWxhdGlvblZhbHVlVG9DYWxjdWxhdGlvbkRhdGEoY2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIHNpZ25hbCBuYW1lLCB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIGlucHV0IG9mIHRoaXMgY2FsY3VsYXRpb24gZGVwZW5kcyBvbiB0aGUgb3V0cHV0IG9mIHRoaXMgY2FsY3VsYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRTaWduYWxOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW291cHV0U2lnbmFsTmFtZT1cIlwiXVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIGN5Y2xlRm91bmQoaW5wdXRTaWduYWxOYW1lOiBzdHJpbmcsIG91cHV0U2lnbmFsTmFtZTogc3RyaW5nID0gXCJcIiwgc2hvd01lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW57XHJcbiAgICAgICAgLy8gZ2V0IHNlcmllTm9kZSB3aGVyZSBpdCBpcyBkZWZpbmVkKGNhbGN1bGF0aW9uIG91dHB1dCBvciBub3JtYWwgc2lnbmFsKVxyXG4gICAgICAgIGxldCBzZXJpZU5vZGUgPSB0aGlzLmdldFNlcmllR3JvdXAoKSEuZ2V0U2VyaWVOb2RlKGlucHV0U2lnbmFsTmFtZSk7XHJcbiAgICAgICAgaWYoc2VyaWVOb2RlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gTm8gc2lnbmFsIG5vZGUgZm91bmQgPT4gbm8gY3ljbGVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIShzZXJpZU5vZGUgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBObyBjYWxjdWxhdGVkIHNpZ25hbCA9PiBubyBjeWNsZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYob3VwdXRTaWduYWxOYW1lID09IFwiXCIpe1xyXG4gICAgICAgICAgICAvL1dvcmthcm91bmQ6IEZpeGVkIGZvciBjcmVhdGlvbiBvZiBGRlQgd2l0aCBEJkQuIElucHV0IGRhdGEgc2hvdWxkIGJlIGFkZGVkIGFmdGVyIGNhbGN1bGF0b3IgaGFzIGJlZW4gY3JlYXRlZC5cclxuICAgICAgICAgICAgbGV0IGZpcnN0T3V0cHV0RGF0YSA9IHRoaXMuZ2V0Rmlyc3RPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgaWYoZmlyc3RPdXRwdXREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBvdXB1dFNpZ25hbE5hbWUgPSBmaXJzdE91dHB1dERhdGEudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZm91bmRDaXJjdWxhclJlZmVyZW5jZShzZXJpZU5vZGUsIG91cHV0U2lnbmFsTmFtZSwgc2hvd01lc3NhZ2UpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvdW5kQ2lyY3VsYXJSZWZlcmVuY2UoY2FsY3VsYXRpb25Ob2RlOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24sIG91cHV0U2lnbmFsTmFtZTogc3RyaW5nID0gXCJcIiwgc2hvd01lc3NhZ2U6IGJvb2xlYW4pOiBib29sZWFue1xyXG4gICAgICAgIC8vIGdldCBpbnB1dCBzaWduYWxzIG9mIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgLy8gVE9ETzogcmVmYWN0b3IgYSBsaXR0bGVcclxuICAgICAgICBpZihjYWxjdWxhdGlvbk5vZGUuZ2V0Q2hpbGRzKClbMF0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUpe1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRvclR5cGUgPSBjYWxjdWxhdGlvbk5vZGUuZ2V0Q2hpbGRzKClbMF0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRTZXJpZU5vZGVzID0gY2FsY3VsYXRvclR5cGUuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBpbnB1dFNlcmllTm9kZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRTZXJpZU5vZGVzW2ldLnZhbHVlID09IG91cHV0U2lnbmFsTmFtZSl7Ly8gVE9ETzogbXVsdGkgb3V0cHV0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2hvd01lc3NhZ2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiQ2lyY3VsYXIgcmVmZXJlbmNlIGZvdW5kIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIGlucHV0IHJlZmVyZW5jZXMgdG8gb3V0cHV0IG9mIGN1cnJlbnQgY2FsY3VsYXRpb24gPT4gY3ljbGUgZm91bmRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkU2VyaWVOb2RlID0gaW5wdXRTZXJpZU5vZGVzW2ldLmdldFNlcmllR3JvdXAoKSEuZ2V0U2VyaWVOb2RlKGlucHV0U2VyaWVOb2Rlc1tpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGRTZXJpZU5vZGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN5Y2xlRm91bmQgPSAoaW5wdXRTZXJpZU5vZGVzW2ldLnBhcmVudCEgYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKS5jeWNsZUZvdW5kKGlucHV0U2VyaWVOb2Rlc1tpXS52YWx1ZSwgb3VwdXRTaWduYWxOYW1lLCBzaG93TWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGN5Y2xlRm91bmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzaG93TWVzc2FnZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkNpcmN1bGFyIHJlZmVyZW5jZSBmb3VuZCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXI6IEJhc2VTZXJpZXMsIGFyZ3M6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgICAgIGxldCBzZXJpZSA9IHNlbmRlcjtcclxuICAgICAgICBsZXQgY29ycmVzcG9uZGluZ0NhbGN1bGF0aW9uRGF0YXMgPSB0aGlzLmdldENhbGN1bGF0aW9uRGF0YXNDb3JyZXNwb25kaW5nVG9TaWduYWxOYW1lKHNlcmllKTtcclxuICAgICAgICBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIGNvcnJlc3BvbmRpbmdDYWxjdWxhdGlvbkRhdGFzLmZvckVhY2goKGNhbGNEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGF0YS5jYWxjdWxhdGlvbkRhdGEuc2V0RGF0YSg8YW55PmFyZ3MuZGF0YSk7IC8vIFNldHMgdGhlIGFjdHVhbCBkYXRhIHBvaW50cyB0byB0aGUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnJlbmFtZSl7XHJcbiAgICAgICAgICAgIGNvcnJlc3BvbmRpbmdDYWxjdWxhdGlvbkRhdGFzLmZvckVhY2goKGNhbGNEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGF0YS52YWx1ZSA9IHNlcmllLm5hbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENhbGN1bGF0aW9uRGF0YXNDb3JyZXNwb25kaW5nVG9TaWduYWxOYW1lKHNlcmllOiBCYXNlU2VyaWVzKTogQXJyYXk8YW55PntcclxuICAgICAgICBsZXQgY2FsY0RhdGFzID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNpZ25hbENhbGN1bGF0aW9uRGF0YSA9ICh0aGlzLmNoaWxkc1tpXSk7XHJcbiAgICAgICAgICAgIGlmKHNpZ25hbENhbGN1bGF0aW9uRGF0YS5zZXJpZSA9PSBzZXJpZSl7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGF0YXMucHVzaCh0aGlzLmNoaWxkc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbGNEYXRhcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgd2l0aCB0aGUgY3VycmVudCBpbnB1dCBkYXRhIGFuZCB1cGRhdGVzIHRoZSBvdXRwdXRkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoKXtcclxuICAgICAgICAvLyBDYWxjdWxhdGUgd2l0aCBhY3R1YWwgaW5wdXQgZGF0YVxyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSBuZXcgQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4oKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25PdXRwdXREYXRhID0gbmV3IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KCk7XHJcbiAgICAgICAgbGV0IGlucHV0Q2FsY3VsYXRpb25EYXRhO1xyXG4gICAgICAgIGxldCBhY3R1YWxseVVzZWRJbnB1dERhdGEgPSBpbnB1dERhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fY2FsY3VsYXRvciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTdGFydCBjYWxjdWxhdGlvbiB3aXRoIGFjdHVhbCBpbnB1dCBkYXRhXHJcbiAgICAgICAgICAgIGlucHV0Q2FsY3VsYXRpb25EYXRhID0gIHRoaXMuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgaW5wdXRDYWxjdWxhdGlvbkRhdGEuZm9yRWFjaChpbnB1dENhbGN1bGF0aW9uRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGEucHVzaChpbnB1dENhbGN1bGF0aW9uRGF0YS5jYWxjdWxhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uT3V0cHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IuY2FsY3VsYXRlKGlucHV0RGF0YSk7XHJcbiAgICAgICAgICAgIGFjdHVhbGx5VXNlZElucHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IuZ2V0QWN0dWFsSW5wdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFVwZGF0ZSBvdXRwdXRkYXRhIFRPRE86IG11bHRpIG91dHB1dCAsbm90IG9ubHkgdGhlIGZpcnN0IG9uZVxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gdGhpcy5nZXRGaXJzdE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGlmKG91dHB1dERhdGEgIT0gdW5kZWZpbmVkICYmIG91dHB1dERhdGEuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fY2FsY3VsYXRvciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGVycm9ycyA9IHRoaXMuX2NhbGN1bGF0b3IuZ2V0RXJyb3JzKCk7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0RGF0YS5zZXJpZS5lcnJvckluZm8gPSBlcnJvcnM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0b3JUeXBlID0gQ2FsY3VsYXRvclByb3ZpZGVyLmdldEluc3RhbmNlKCkuY29udmVydERpc3BsYXlOYW1lVG9JZCh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgb3V0cHV0RGF0YS5zZXJpZS51cGRhdGVDYWxjdWxhdGlvbkRhdGFJbmZvKGFjdHVhbGx5VXNlZElucHV0RGF0YSwgY2FsY3VsYXRvclR5cGUsIHRoaXMuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKSwgdGhpcy5fc2VyaWVzUHJvdmlkZXIpXHJcbiAgICAgICAgICAgIGlmKGNhbGN1bGF0aW9uT3V0cHV0RGF0YVswXSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXREYXRhLnNlcmllLnVwZGF0ZVBvaW50cygoY2FsY3VsYXRpb25PdXRwdXREYXRhWzBdIGFzIENhbGN1bGF0aW9uRGF0YVBvaW50cykuZ2V0RGF0YSgpKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXNHcm91cCA9IG91dHB1dERhdGEuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXREYXRhLnNlcmllLnN0YXJ0VHJpZ2dlclRpbWUgPSBzZXJpZXNHcm91cC5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTmV3IGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhIGF2YWlsYWJsZS4gTmV3IGltcGxlbWVudGF0aW9uIG5lZWRlZCEgT25seSBEYXRhUG9pbnRzIHN1cHBvcnRlZCBjdXJyZW50bHkuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgY2FsY3VsYXRpb24gaW5wdXQgZGF0YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KCk7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uVHlwZUNoaWxkcyA9IHRoaXMuY2hpbGRzO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2FsY3VsYXRpb25UeXBlQ2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNpZ25hbENhbGN1bGF0aW9uRGF0YSA9IGNhbGN1bGF0aW9uVHlwZUNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoc2lnbmFsQ2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YS5wdXNoKHNpZ25hbENhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGFCeUlkKGlkOiBzdHJpbmcpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGF8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvblR5cGVDaGlsZHMgPSB0aGlzLmNoaWxkcztcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGNhbGN1bGF0aW9uVHlwZUNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzaWduYWxDYWxjdWxhdGlvbkRhdGEgPSBjYWxjdWxhdGlvblR5cGVDaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKHNpZ25hbENhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICBpZihzaWduYWxDYWxjdWxhdGlvbkRhdGEuY2FsY3VsYXRpb25EYXRhLmlkID09IGlkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2lnbmFsQ2FsY3VsYXRpb25EYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Rmlyc3RPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YXx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uVHlwZUNoaWxkcyA9IHRoaXMuY2hpbGRzO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2FsY3VsYXRpb25UeXBlQ2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YSA9IGNhbGN1bGF0aW9uVHlwZUNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsY3VsYXRpb25EYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc2VyaWVzIGZvciB0aGUgZ2l2ZW4gbmFtZSBmcm9tIHRoaXMgY2FsY3VsYXRvciB0eXBlIG5vZGUgKGUuZy4gb3V0cHV0IHNlcmllcyBvZiBjYWxjdWxhdGlvbnMpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzZXJpZU5hbWU9XCJcIl0gaWYgc2VyaWVOYW1lID0gXCJcIiBhbGwgc2VyaWVzIHdpbCBiZSByZXR1cm5lZFxyXG4gICAgICogQHJldHVybnMge0FycmF5PElTZXJpZU5vZGU+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBnZXRTZXJpZU5vZGVzKHNlcmllTmFtZTogc3RyaW5nID0gXCJcIik6IEFycmF5PElTZXJpZU5vZGU+e1xyXG4gICAgICAgIGxldCBzZXJpZU5vZGVzID0gbmV3IEFycmF5PElTZXJpZU5vZGU+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpeyAvLyBJcyBvbmx5IGEgc2lnbmFsIGluIGNhc2Ugb2Ygb3V0cHV0ZGF0YVxyXG4gICAgICAgICAgICAgICAgaWYoIHNlcmllTmFtZSA9PSBcIlwiIHx8IGNoaWxkLnZhbHVlID09IHNlcmllTmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVOb2Rlcy5wdXNoKGNoaWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNoaWxkIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG4gICAgICAgICAgICAgICAgc2VyaWVOb2RlcyA9IHNlcmllTm9kZXMuY29uY2F0KGNoaWxkLmdldFNlcmllTm9kZXMoc2VyaWVOYW1lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllTm9kZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk91dHB1dERhdGFWYWx1ZUNoYW5nZWQoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICBsZXQgc2VyaWVHcm91cCA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIGlmKHNlcmllR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHNlcmllTm9kZSA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpIS5nZXRTZXJpZU5vZGVzKGFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKHNlcmllTm9kZS5sZW5ndGggPiAxKXsgLy8gU2lnbmFsIHdpdGggZ2l2ZW4gbmFtZSBhbHJlYWR5IGF2YWlsYWJsZSA9PiBzZXQgc2lnbmFsIG5hbWUgdG8gdGhlIHVzZWQgbmFtZSBiZWZvcmVcclxuICAgICAgICAgICAgICAgIGxldCBzaWduYWxDYWxjdWxhdGlvbkRhdGE6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEgPSBzZW5kZXI7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxDYWxjdWxhdGlvbkRhdGEudmFsdWUgPSBhcmdzLm9sZERhdGE7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBjYWxjdWxhdGlvbkRhdGEgPSBzaWduYWxDYWxjdWxhdGlvbkRhdGEuY2FsY3VsYXRpb25EYXRhXHJcbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0aW9uRGF0YS52YWx1ZSA9IGFyZ3Mub2xkRGF0YTsgXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTaG93IE1lc3NhZ2VCb3hcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==
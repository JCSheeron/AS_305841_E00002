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
define(["require", "exports", "../../common/dateTimeHelper", "../common/calculation/calculation", "./signalManagerCalculatorType", "../common/signal/serieContainer", "./signalManagerCalculationInputData", "../common/calculatorProvider/calculationDataPoints", "../common/calculatorProvider/calculationDataNumberOrPoints", "../common/signal/serieNode", "../common/series/seriesType"], function (require, exports, dateTimeHelper_1, calculation_1, signalManagerCalculatorType_1, serieContainer_1, signalManagerCalculationInputData_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, serieNode_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculation = /** @class */ (function (_super) {
        __extends(SignalManagerCalculation, _super);
        /**
         * Creates an instance of SignalManagerCalculation.
         * @param {string} name
         * @memberof SignalManagerCalculation
         */
        function SignalManagerCalculation(name, seriesProvider) {
            var _this = _super.call(this, name) || this;
            _this._seriesProvider = seriesProvider;
            _this.id = name + SignalManagerCalculation.uniqueId;
            SignalManagerCalculation.uniqueId++;
            _this._calculation = new calculation_1.Calculation("select type");
            // Init => Add Type for calculation
            _this._calculatorType = new signalManagerCalculatorType_1.SignalManagerCalculatorType("Algorithm", "select type", _this._seriesProvider);
            _this.addSerieContainer(_this._calculatorType, -1);
            return _this;
        }
        Object.defineProperty(SignalManagerCalculation.prototype, "validNode", {
            get: function () {
                var outputData = this.getOutputCalculationData();
                if (outputData.length > 0) {
                    if (outputData[0].serie != undefined) {
                        return outputData[0].serie.rawPointsValid;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "visibleChilds", {
            /**
             * Returns only the visible childs (e.g visible childs only available in edit mode)
             *
             * @readonly
             * @type {(ISerieNode[]|undefined)}
             * @memberof SignalManagerCalculation
             */
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == false) {
                        return undefined;
                    }
                }
                return this.childs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "name", {
            get: function () {
                var data = this.getOutputCalculationData();
                if (data.length > 0) {
                    // TODO: multi output ,use not only the first output
                    return data[0].serie.name;
                }
                if (this._name != undefined) {
                    return this._name;
                }
                return "";
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "serie", {
            get: function () {
                var data = this.getOutputCalculationData();
                if (data.length > 0) {
                    // TODO: multi output ,not only the first output
                    return data[0].serie;
                }
                return undefined;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "color", {
            get: function () {
                var data = this.getOutputCalculationData();
                if (data.length > 0) {
                    // TODO: multi output ,not only the first output
                    return data[0].color;
                }
                return undefined;
            },
            set: function (color) {
                var data = this.getOutputCalculationData();
                if (data.length > 0 && color != undefined) {
                    // TODO: multi output ,not only the first output
                    data[0].color = color;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "startTriggerTime", {
            get: function () {
                var serieGroup = this.getSerieGroup();
                if (serieGroup != undefined) {
                    return serieGroup.startTriggerTime;
                }
                return 0; // Not start trigger available
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "startTriggerTimeFormated", {
            get: function () {
                var serieGroup = this.getSerieGroup();
                if (serieGroup != undefined) {
                    return dateTimeHelper_1.DateTimeHelper.getDateTime(serieGroup.startTriggerTime);
                }
                return ""; // Not start trigger info available
            },
            enumerable: true,
            configurable: true
        });
        SignalManagerCalculation.prototype.dispose = function () {
            this._calculatorType.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Removes all references to the given series from the calculation
         *
         * @param {BaseSeries} serie
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.removeReferencesToSerie = function (serie) {
            this._calculatorType.removeReferenceToSerie(serie);
        };
        Object.defineProperty(SignalManagerCalculation.prototype, "nodeType", {
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == true) {
                        return serieNode_1.NodeType.container;
                    }
                }
                return serieNode_1.NodeType.series;
            },
            enumerable: true,
            configurable: true
        });
        SignalManagerCalculation.prototype.calculate = function () {
            this._calculatorType.calculate();
        };
        /**
         * Sets the calculator type(e.g. "add", "sub", ...)
         *
         * @param {string} calculatorTypeId
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.setCalculatorTypeById = function (calculatorTypeId) {
            this._calculatorType.setCalculatorById(calculatorTypeId);
        };
        /**
           *  Sets the given value to the inputparameter with given id
           *
           * @param {number} index
           * @param {string} value
           * @memberof SignalManagerCalculation
           */
        SignalManagerCalculation.prototype.setInputValueById = function (id, value) {
            var inputData = this._calculatorType.getInputCalculationDataById(id);
            if (inputData != undefined) {
                inputData.value = value;
            }
            else {
                console.error("Value can't be set to current id! => " + id);
            }
        };
        /**
         * Sets the signal name of the calculation ouptut
         *
         * @param {string} name
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.setOutputSignalName = function (name) {
            var outputDatas = this.getOutputCalculationData();
            if (outputDatas != undefined && outputDatas.length > 0) {
                outputDatas[0].value = name;
            }
        };
        /**
         * Clones the calculation
         *
         * @returns
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.clone = function () {
            // Clone object
            var clonedSignalCalculation = new SignalManagerCalculation(this.name, this._seriesProvider);
            clonedSignalCalculation._calculation = this._calculation;
            // Clone calculator type child container
            clonedSignalCalculation.childs.splice(0, 1); // TODO: Implement RemoveSerieContainer
            var calculatorType = this._calculatorType.clone();
            clonedSignalCalculation._calculatorType = calculatorType;
            clonedSignalCalculation.addSerieContainer(calculatorType);
            return clonedSignalCalculation;
        };
        /**
         * Needed to update the input series of this calculations to the new series of the new serieGroup
         *
         * @param {SerieGroup} serieGroup
         * @returns {Array<string>} serie ids which are not needed any more as input series(should be removed from series provider)
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.updateInputData = function (serieGroup) {
            var listOfSeriesIdsToRemove = new Array();
            var calculationInputDatas = this.getInputCalculationData();
            for (var j = 0; j < calculationInputDatas.length; j++) {
                var inputData = calculationInputDatas[j];
                if (inputData.serie != undefined) {
                    // find serie in new cloned serie group by name ...
                    var foundSerie = serieGroup.getSerie(inputData.serie.name);
                    if (foundSerie != undefined) {
                        // Save id of clone serie object which one can be removed after updating all input Series
                        if (listOfSeriesIdsToRemove.includes(inputData.serie.id) == false) {
                            listOfSeriesIdsToRemove.push(inputData.serie.id);
                        }
                        // ... and set the new serie
                        inputData.serie = foundSerie;
                    }
                }
            }
            return listOfSeriesIdsToRemove;
        };
        /**
         * Sets(or resets) a flag at all inputs of this calculation where a drop of the given series would be possible
         *
         * @param {boolean} activate
         * @param {BaseSeries} series
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.setDropLocations = function (activate, series) {
            var _this = this;
            if (this.visibleChilds != undefined) {
                if (this.visibleChilds.length > 0) {
                    var calculationType = this.visibleChilds[0];
                    calculationType.visibleChilds.forEach(function (calculationData) {
                        if (calculationData instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                            if (_this.isSeriesDropAllowedAtCurrentInputItem(calculationData, series) == true) {
                                calculationData.dropPossible = activate;
                            }
                        }
                    });
                }
            }
        };
        /**
         * Checks if a drop of a series is possible for the given calculation input
         *
         * @private
         * @param {SignalManagerCalculationInputData} inputItem
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.isSeriesDropAllowedAtCurrentInputItem = function (inputItem, serie) {
            // It is not allowed to use xy or fft series as input 
            if (serie.type == seriesType_1.SeriesType.xySeries || serie.type == seriesType_1.SeriesType.fftSeries) {
                return false;
            }
            // It is not allowed to use fft series as input for FFT calculation
            // if(inputItem.parent instanceof SignalManagerCalculatorType){
            //     if(inputItem.parent.value == 'FFT' && serie.type == SeriesType.fftSeries) {
            //         return false;
            //     }
            // }
            // Series can only be dropped at an input where serie(datapoints) are allowed
            if (!(inputItem.calculationData instanceof calculationDataPoints_1.CalculationDataPoints) && !(inputItem.calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints)) {
                return false;
            }
            var outputSeriesOfCalculation = inputItem.parent.getSeries();
            if (outputSeriesOfCalculation.indexOf(serie) == -1) { // OutputSeries of this calculation are not allowed for this calculation as input(circular reference)
                if (inputItem.getSerieGroup() == serie.parent) { // Check for same serie group
                    if (inputItem.parent instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType) {
                        if (inputItem.parent.cycleFound(serie.name) == false) { // check for cycle
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /**
         * Returns all calculation input datas
         *
         * @returns {Array<SignalManagerCalculationInputData>}
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.getInputCalculationData = function () {
            return this._calculatorType.getInputCalculationData();
        };
        /**
         * Returns all calculation output datas
         *
         * @returns {Array<SignalManagerCalculationOutputData>}
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.getOutputCalculationData = function () {
            var outputData = this._calculatorType.getFirstOutputCalculationData();
            if (outputData != undefined) {
                return [outputData];
            }
            return new Array();
        };
        SignalManagerCalculation.uniqueId = 0; // TODO: use unique id 
        return SignalManagerCalculation;
    }(serieContainer_1.SerieContainer));
    exports.SignalManagerCalculation = SignalManagerCalculation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTtRQUE4Qyw0Q0FBYztRQW1HeEQ7Ozs7V0FJRztRQUNILGtDQUFZLElBQVksRUFBRSxjQUErQjtZQUF6RCxZQUNJLGtCQUFNLElBQUksQ0FBQyxTQVdkO1lBVEcsS0FBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7WUFDdEMsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDO1lBQ25ELHdCQUF3QixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXBDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRW5ELG1DQUFtQztZQUNuQyxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUkseURBQTJCLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxlQUFlLEVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDdEQsQ0FBQztRQTFHRCxzQkFBVywrQ0FBUztpQkFBcEI7Z0JBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQ2pELElBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7b0JBQ3JCLElBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7d0JBQ2hDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7cUJBQzdDO2lCQUNKO2dC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QUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDdEUsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUN2QixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkI7WUFDRCxPQUFPLElBQUksS0FBSyxFQUFzQyxDQUFDO1FBQzNELENBQUM7UUF4VGMsaUNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7UUF5VGhFLCtCQUFDO0tBQUEsQUE3VEQsQ0FBOEMsK0JBQWMsR0E2VDNEO0lBN1RZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kYXRlVGltZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0aW9uL2NhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBOb2RlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllTm9kZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIGV4dGVuZHMgU2VyaWVDb250YWluZXJ7XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdW5pcXVlSWQ6IG51bWJlciA9IDA7IC8vIFRPRE86IHVzZSB1bmlxdWUgaWQgXHJcblxyXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRpb246IElDYWxjdWxhdGlvbjtcclxuICAgIHByaXZhdGUgX2NhbGN1bGF0b3JUeXBlOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcbiAgICBwcml2YXRlIF9zZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsaWROb2RlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSB0aGlzLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGlmKG91dHB1dERhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGlmKG91dHB1dERhdGFbMF0uc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhWzBdLnNlcmllLnJhd1BvaW50c1ZhbGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgb25seSB0aGUgdmlzaWJsZSBjaGlsZHMgKGUuZyB2aXNpYmxlIGNoaWxkcyBvbmx5IGF2YWlsYWJsZSBpbiBlZGl0IG1vZGUpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZU5vZGVbXXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGVDaGlsZHMoKTogSVNlcmllTm9kZVtdfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7IFxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsdXNlIG5vdCBvbmx5IHRoZSBmaXJzdCBvdXRwdXRcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFbMF0uc2VyaWUhLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX25hbWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlcmllKCk6IEJhc2VTZXJpZXN8dW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7IFxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsbm90IG9ubHkgdGhlIGZpcnN0IG91dHB1dFxyXG4gICAgICAgICAgIHJldHVybiBkYXRhWzBdLnNlcmllO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VyaWUodmFsdWU6IEJhc2VTZXJpZXN8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogbXVsdGkgb3V0cHV0ICxub3Qgb25seSB0aGUgZmlyc3Qgb3V0cHV0XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhWzBdLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29sb3IoY29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAwICYmIGNvbG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsbm90IG9ubHkgdGhlIGZpcnN0IG91dHB1dFxyXG4gICAgICAgICAgICBkYXRhWzBdLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhcnRUcmlnZ2VyVGltZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJpZUdyb3VwLnN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwOyAvLyBOb3Qgc3RhcnQgdHJpZ2dlciBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0VHJpZ2dlclRpbWVGb3JtYXRlZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZShzZXJpZUdyb3VwLnN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjsgLy8gTm90IHN0YXJ0IHRyaWdnZXIgaW5mbyBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyKXtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VyaWVzUHJvdmlkZXIgPSBzZXJpZXNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLmlkID0gbmFtZSArIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbi51bmlxdWVJZDtcclxuICAgICAgICBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24udW5pcXVlSWQrKztcclxuXHJcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRpb24gPSBuZXcgQ2FsY3VsYXRpb24oXCJzZWxlY3QgdHlwZVwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBJbml0ID0+IEFkZCBUeXBlIGZvciBjYWxjdWxhdGlvblxyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0b3JUeXBlID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZShcIkFsZ29yaXRobVwiLCBcInNlbGVjdCB0eXBlXCIsIHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuICAgICAgICB0aGlzLmFkZFNlcmllQ29udGFpbmVyKHRoaXMuX2NhbGN1bGF0b3JUeXBlICwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLl9jYWxjdWxhdG9yVHlwZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgcmVmZXJlbmNlcyB0byB0aGUgZ2l2ZW4gc2VyaWVzIGZyb20gdGhlIGNhbGN1bGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlUmVmZXJlbmNlc1RvU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0b3JUeXBlLnJlbW92ZVJlZmVyZW5jZVRvU2VyaWUoc2VyaWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbm9kZVR5cGUoKTogTm9kZVR5cGV7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOb2RlVHlwZS5jb250YWluZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE5vZGVUeXBlLnNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlKCl7XHJcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRvclR5cGUuY2FsY3VsYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjYWxjdWxhdG9yIHR5cGUoZS5nLiBcImFkZFwiLCBcInN1YlwiLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhbGN1bGF0b3JUeXBlSWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENhbGN1bGF0b3JUeXBlQnlJZChjYWxjdWxhdG9yVHlwZUlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0b3JUeXBlLnNldENhbGN1bGF0b3JCeUlkKGNhbGN1bGF0b3JUeXBlSWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgLyoqXHJcbiAgICAgKiAgU2V0cyB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIGlucHV0cGFyYW1ldGVyIHdpdGggZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0SW5wdXRWYWx1ZUJ5SWQoaWQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSB0aGlzLl9jYWxjdWxhdG9yVHlwZS5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YUJ5SWQoaWQpO1xyXG4gICAgICAgIGlmKGlucHV0RGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpbnB1dERhdGEudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZhbHVlIGNhbid0IGJlIHNldCB0byBjdXJyZW50IGlkISA9PiBcIiArIGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9ICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNpZ25hbCBuYW1lIG9mIHRoZSBjYWxjdWxhdGlvbiBvdXB0dXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0T3V0cHV0U2lnbmFsTmFtZShuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhcyA9IHRoaXMuZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7IFxyXG4gICAgICAgIGlmKG91dHB1dERhdGFzICE9IHVuZGVmaW5lZCAmJiBvdXRwdXREYXRhcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgb3V0cHV0RGF0YXNbMF0udmFsdWUgPSBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhlIGNhbGN1bGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ue1xyXG4gICAgICAgIC8vIENsb25lIG9iamVjdFxyXG4gICAgICAgIGxldCBjbG9uZWRTaWduYWxDYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24odGhpcy5uYW1lLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcbiAgICAgICAgY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb24uX2NhbGN1bGF0aW9uID0gdGhpcy5fY2FsY3VsYXRpb247XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2xvbmUgY2FsY3VsYXRvciB0eXBlIGNoaWxkIGNvbnRhaW5lclxyXG4gICAgICAgIGNsb25lZFNpZ25hbENhbGN1bGF0aW9uLmNoaWxkcy5zcGxpY2UoMCwxKTsgLy8gVE9ETzogSW1wbGVtZW50IFJlbW92ZVNlcmllQ29udGFpbmVyXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JUeXBlID0gdGhpcy5fY2FsY3VsYXRvclR5cGUuY2xvbmUoKSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcbiAgICAgICAgY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb24uX2NhbGN1bGF0b3JUeXBlID0gY2FsY3VsYXRvclR5cGU7XHJcbiAgICAgICAgY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb24uYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRvclR5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjbG9uZWRTaWduYWxDYWxjdWxhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5lZWRlZCB0byB1cGRhdGUgdGhlIGlucHV0IHNlcmllcyBvZiB0aGlzIGNhbGN1bGF0aW9ucyB0byB0aGUgbmV3IHNlcmllcyBvZiB0aGUgbmV3IHNlcmllR3JvdXBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NlcmllR3JvdXB9IHNlcmllR3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fSBzZXJpZSBpZHMgd2hpY2ggYXJlIG5vdCBuZWVkZWQgYW55IG1vcmUgYXMgaW5wdXQgc2VyaWVzKHNob3VsZCBiZSByZW1vdmVkIGZyb20gc2VyaWVzIHByb3ZpZGVyKVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICB1cGRhdGVJbnB1dERhdGEoc2VyaWVHcm91cDogU2VyaWVHcm91cCk6IEFycmF5PHN0cmluZz57XHJcbiAgICAgICAgbGV0IGxpc3RPZlNlcmllc0lkc1RvUmVtb3ZlOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFzID0gdGhpcy5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGZvcihsZXQgaj0wOyBqIDwgY2FsY3VsYXRpb25JbnB1dERhdGFzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgbGV0IGlucHV0RGF0YSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhc1tqXTtcclxuICAgICAgICAgICAgaWYoaW5wdXREYXRhLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBmaW5kIHNlcmllIGluIG5ldyBjbG9uZWQgc2VyaWUgZ3JvdXAgYnkgbmFtZSAuLi5cclxuICAgICAgICAgICAgICAgIGxldCBmb3VuZFNlcmllID0gc2VyaWVHcm91cC5nZXRTZXJpZShpbnB1dERhdGEuc2VyaWUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZihmb3VuZFNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2F2ZSBpZCBvZiBjbG9uZSBzZXJpZSBvYmplY3Qgd2hpY2ggb25lIGNhbiBiZSByZW1vdmVkIGFmdGVyIHVwZGF0aW5nIGFsbCBpbnB1dCBTZXJpZXNcclxuICAgICAgICAgICAgICAgICAgICBpZihsaXN0T2ZTZXJpZXNJZHNUb1JlbW92ZS5pbmNsdWRlcyhpbnB1dERhdGEuc2VyaWUuaWQpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdE9mU2VyaWVzSWRzVG9SZW1vdmUucHVzaChpbnB1dERhdGEuc2VyaWUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAuLi4gYW5kIHNldCB0aGUgbmV3IHNlcmllXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhLnNlcmllID0gZm91bmRTZXJpZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdE9mU2VyaWVzSWRzVG9SZW1vdmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzKG9yIHJlc2V0cykgYSBmbGFnIGF0IGFsbCBpbnB1dHMgb2YgdGhpcyBjYWxjdWxhdGlvbiB3aGVyZSBhIGRyb3Agb2YgdGhlIGdpdmVuIHNlcmllcyB3b3VsZCBiZSBwb3NzaWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHNldERyb3BMb2NhdGlvbnMoYWN0aXZhdGU6IGJvb2xlYW4sIHNlcmllczogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgaWYodGhpcy52aXNpYmxlQ2hpbGRzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmlzaWJsZUNoaWxkcyEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25UeXBlID0gdGhpcy52aXNpYmxlQ2hpbGRzWzBdIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZTtcclxuICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uVHlwZS52aXNpYmxlQ2hpbGRzIS5mb3JFYWNoKGNhbGN1bGF0aW9uRGF0YT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzU2VyaWVzRHJvcEFsbG93ZWRBdEN1cnJlbnRJbnB1dEl0ZW0oY2FsY3VsYXRpb25EYXRhLCBzZXJpZXMpID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRpb25EYXRhLmRyb3BQb3NzaWJsZSA9IGFjdGl2YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVx0XHRcdFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgYSBkcm9wIG9mIGEgc2VyaWVzIGlzIHBvc3NpYmxlIGZvciB0aGUgZ2l2ZW4gY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGF9IGlucHV0SXRlbVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNTZXJpZXNEcm9wQWxsb3dlZEF0Q3VycmVudElucHV0SXRlbShpbnB1dEl0ZW06IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSwgc2VyaWU6IEJhc2VTZXJpZXMpOiBib29sZWFue1xyXG5cdFx0Ly8gSXQgaXMgbm90IGFsbG93ZWQgdG8gdXNlIHh5IG9yIGZmdCBzZXJpZXMgYXMgaW5wdXQgXHJcblx0XHRpZihzZXJpZS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMgfHwgc2VyaWUudHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcyl7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gSXQgaXMgbm90IGFsbG93ZWQgdG8gdXNlIGZmdCBzZXJpZXMgYXMgaW5wdXQgZm9yIEZGVCBjYWxjdWxhdGlvblxyXG4gICAgICAgIC8vIGlmKGlucHV0SXRlbS5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUpe1xyXG4gICAgICAgIC8vICAgICBpZihpbnB1dEl0ZW0ucGFyZW50LnZhbHVlID09ICdGRlQnICYmIHNlcmllLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuXHRcdC8vIFNlcmllcyBjYW4gb25seSBiZSBkcm9wcGVkIGF0IGFuIGlucHV0IHdoZXJlIHNlcmllKGRhdGFwb2ludHMpIGFyZSBhbGxvd2VkXHJcblx0XHRpZighKGlucHV0SXRlbS5jYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMpICYmICEoaW5wdXRJdGVtLmNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKSl7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGxldCBvdXRwdXRTZXJpZXNPZkNhbGN1bGF0aW9uID0gaW5wdXRJdGVtLnBhcmVudCEuZ2V0U2VyaWVzKCk7XHJcblx0XHRpZihvdXRwdXRTZXJpZXNPZkNhbGN1bGF0aW9uLmluZGV4T2Yoc2VyaWUpID09IC0xKXsgLy8gT3V0cHV0U2VyaWVzIG9mIHRoaXMgY2FsY3VsYXRpb24gYXJlIG5vdCBhbGxvd2VkIGZvciB0aGlzIGNhbGN1bGF0aW9uIGFzIGlucHV0KGNpcmN1bGFyIHJlZmVyZW5jZSlcclxuXHRcdFx0aWYoaW5wdXRJdGVtLmdldFNlcmllR3JvdXAoKSA9PSBzZXJpZS5wYXJlbnQpeyAvLyBDaGVjayBmb3Igc2FtZSBzZXJpZSBncm91cFxyXG5cdFx0XHRcdGlmKGlucHV0SXRlbS5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUpe1xyXG5cdFx0XHRcdFx0aWYoaW5wdXRJdGVtLnBhcmVudCEuY3ljbGVGb3VuZChzZXJpZS5uYW1lKSA9PSBmYWxzZSl7IC8vIGNoZWNrIGZvciBjeWNsZVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FsY3VsYXRvclR5cGUuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgIH0gICAgXHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSB0aGlzLl9jYWxjdWxhdG9yVHlwZS5nZXRGaXJzdE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGlmKG91dHB1dERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtvdXRwdXREYXRhXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPigpO1xyXG4gICAgfVxyXG59Il19
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
define(["require", "exports", "../common/signal/serieNode", "./eventSignalManagerDataChangedArgs", "../common/calculatorProvider/calculationDataNumber", "./signalManagerCalculatorType", "./signalManagerCalculationOutputData", "../common/series/seriesType", "../common/calculatorProvider/calculationDataNumberOrPoints", "../common/calculatorProvider/calculationDataString", "../common/calculatorProvider/calculationDataPoints"], function (require, exports, serieNode_1, eventSignalManagerDataChangedArgs_1, calculationDataNumber_1, signalManagerCalculatorType_1, signalManagerCalculationOutputData_1, seriesType_1, calculationDataNumberOrPoints_1, calculationDataString_1, calculationDataPoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculationInputData = /** @class */ (function (_super) {
        __extends(SignalManagerCalculationInputData, _super);
        /**
         * Creates an instance of SignalManagerCalculationInputData.
         * @param {TCalculationData} calculationData
         * @param {boolean} isInput
         * @memberof SignalManagerCalculationInputData
         */
        function SignalManagerCalculationInputData(calculationData) {
            var _this = _super.call(this, "", undefined) || this;
            _this.onlyValuesFromListAreAllowed = false;
            _this.dropPossible = false;
            _this.calculationData = calculationData;
            if (_this.calculationData.displayInfo != undefined) {
                _this.onlyValuesFromListAreAllowed = _this.calculationData.displayInfo.onlyValuesFromListAreAllowed;
            }
            _this._value = _this.calculationData.value;
            _this.canDelete = false;
            return _this;
        }
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "values", {
            /**
             * Returns a list with available values for this calculation input
             *
             * @readonly
             * @type {(Array<IValueListItem>|undefined)}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                if (this.calculationData.values != undefined) {
                    return this.calculationData.values;
                }
                else if (this.calculationData.displayInfo != undefined && this.calculationData.displayInfo.showSignalList == true) {
                    return this.getSerieSelections();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "dataTypeName", {
            /**
             * Returns the datatype of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                if (this.calculationData instanceof calculationDataNumber_1.CalculationDataNumber) {
                    return "Float";
                }
                else {
                    return "String";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "minValue", {
            get: function () {
                if (this.calculationData.displayInfo != undefined) {
                    return this.calculationData.displayInfo.minValue;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "maxValue", {
            get: function () {
                if (this.calculationData.displayInfo != undefined) {
                    return this.calculationData.displayInfo.maxValue;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "parent", {
            /**
             * Returns the parent of this calculation input
             *
             * @type {(ISerieContainer | undefined)}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this._parent;
            },
            /**
             * Sets the parent of this calculation input
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "name", {
            /**
             * Returns the name of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == true) {
                        return this.calculationData.getDisplayName(); // Show the display name of input/output parameter in edit mode
                    }
                }
                return this.value; // Show only the value 
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "description", {
            /**
             * Returns the description of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this.calculationData.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "color", {
            /**
             * Returns the color of this calculation input => currently no color needed for inputs
             *
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return "";
            },
            /**
             * Sets the color of this calculation input => currently no color needed for inputs
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                if (this.serie != undefined) {
                    this.serie.color = value;
                }
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.colorChanged, value));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the value of the calculation input written in the cell (rowdata)
         * Added for html
         * @type {string}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getRawValue = function () {
            return this._value;
        };
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "value", {
            /**
             * Returns the value of this calculation input
             *
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this.calculationData.getDisplayValue(this._value);
            },
            /**
             * Sets the value of this calculation input
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                var oldValue = this._value;
                this._value = this.calculationData.getRawValueToDisplayValue(value);
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.valueChanged, value, oldValue));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "nodeType", {
            /**
             * Returns the type of this calculation input
             *
             * @readonly
             * @protected
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return serieNode_1.NodeType.calculationInputParam;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the value of the signalCalculationData to the calculation data (NOT FOR serie names in signal calculation data; only for strings, numerics, ...)
         * Resets an old serie to undefined if it was used before in this SignalManagerCalculation data.
         *
         * @private
         * @param {SignalManagerCalculationInputData} signalCalculationData
         * @param {CalculationData} calculationData
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculationInputData.prototype.setSignalCalculationValueToCalculationData = function (calculationData) {
            calculationData.value = this.getRawValue();
            if (calculationData instanceof calculationDataNumber_1.CalculationDataNumber || calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                calculationData.setData(parseFloat(calculationData.value)); // Set available number data
            }
            else if (calculationData instanceof calculationDataString_1.CalculationDataString) {
                calculationData.setData(calculationData.value); // Set available string data
            }
            else if (calculationData instanceof calculationDataPoints_1.CalculationDataPoints) {
                calculationData.setData(new Array()); // No signal data available, set empty points
            }
            // Remove current used serie from calculationData
            this.serie = undefined;
        };
        SignalManagerCalculationInputData.prototype.setSignalCalculationValueToCalculationDataWithSerieData = function (serie, calculationData) {
            calculationData.value = this.value;
            calculationData.type = serie.type;
            if (calculationData instanceof calculationDataPoints_1.CalculationDataPoints || calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                calculationData.setData(serie.rawPoints);
            }
            // Add current used signal to calculationData
            this.serie = serie;
        };
        /**
         * Returns all a list(displayValue, value) of the series which are available at the parent serie group, output series of the current calculation will be removed
         *
         * @private
         * @returns {Array<any>}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getSerieSelections = function () {
            // get all available series from parent serieGroup
            var serieSelections = this.getAllSeriesFromParentSerieGroup();
            // Remove own output series from this calculation
            var outputSerieData = this.getOutputDatasOfParent()[0]; // TODO: multi output
            if (outputSerieData != undefined) {
                if (outputSerieData.serie != undefined) {
                    for (var i = 0; i < serieSelections.length; i++) {
                        if (serieSelections[i].value == outputSerieData.serie.name) {
                            serieSelections.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
            // Remove series which results in a cycle of calculations
            if (this.parent instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType) {
                for (var i = 0; i < serieSelections.length; i++) {
                    if (this.parent.cycleFound(serieSelections[i].value) == true) { // check for cycle
                        serieSelections.splice(i, 1);
                        i--;
                    }
                }
            }
            return serieSelections;
        };
        /**
         * Returns a list(with displayValue and value) of all series from the parent serie group
         *
         * @private
         * @returns {Array<any>}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getAllSeriesFromParentSerieGroup = function () {
            var serieSelections = new Array();
            var serieGroup = this.getSerieGroup();
            if (serieGroup != undefined) { // Is a serie group available
                var series = serieGroup.getSeries();
                for (var i = 0; i < series.length; i++) {
                    // So far, only allowed to use yt series as input 
                    if (series[i].type == seriesType_1.SeriesType.timeSeries) {
                        var serieName = series[i].name;
                        serieSelections.push({ displayValue: serieName, value: serieName });
                    }
                }
            }
            return serieSelections;
        };
        SignalManagerCalculationInputData.prototype.getOutputDatasOfParent = function () {
            var outputDatas = new Array();
            if (this._parent != undefined) {
                var parentChilds = this._parent.getChilds();
                for (var i = 0; i < parentChilds.length; i++) {
                    if (parentChilds[i] instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                        outputDatas.push(parentChilds[i]);
                    }
                }
            }
            return outputDatas;
        };
        return SignalManagerCalculationInputData;
    }(serieNode_1.SerieNode));
    exports.SignalManagerCalculationInputData = SignalManagerCalculationInputData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTtRQUF1RCxxREFBUztRQTBNNUQ7Ozs7O1dBS0c7UUFDSCwyQ0FBWSxlQUFpQztZQUE3QyxZQUNJLGtCQUFNLEVBQUUsRUFBRSxTQUFTLENBQUMsU0FPdkI7WUF0TkQsa0NBQTRCLEdBQVksS0FBSyxDQUFDO1lBQzlDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1lBK00xQixLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBQztnQkFDN0MsS0FBSSxDQUFDLDRCQUE0QixHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLDRCQUE0QixDQUFDO2FBQ3JHO1lBQ0QsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztZQUN6QyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7UUFDM0IsQ0FBQztRQTFNRCxzQkFBVyxxREFBTTtZQVBqQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUM7b0JBQ3hDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7aUJBQ3RDO3FCQUNJLElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUM7b0JBQzdHLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQ3BDO1lBQ0wsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVywyREFBWTtZQVB2Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsZUFBZSxZQUFZLDZDQUFxQixFQUFDO29CQUNyRCxPQUFPLE9BQU8sQ0FBQztpQkFDbEI7cUJBQ0c7b0JBQ0EsT0FBTyxRQUFRLENBQUM7aUJBQ25CO1lBQ0wsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1REFBUTtpQkFBbkI7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsSUFBSSxTQUFTLEVBQUM7b0JBQzdDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2lCQUNwRDtnQkFDRCxPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDOzs7V0FBQTtRQUVELHNCQUFXLHVEQUFRO2lCQUFuQjtnQkFDSSxJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBQztvQkFDN0MsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7aUJBQ3BEO2dCQUNELE9BQU8sU0FBUyxDQUFDO1lBQ3JCLENBQUM7OztXQUFBO1FBUUQsc0JBQVcscURBQU07WUFOakI7Ozs7O2VBS0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7WUFFRDs7OztlQUlHO2lCQUNILFVBQWtCLEtBQWtDO2dCQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDOzs7V0FUQTtRQWtCRCxzQkFBVyxtREFBSTtZQVBmOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BDLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsSUFBRyxTQUFTLENBQUMsY0FBYyxJQUFJLElBQUksRUFBQzt3QkFDaEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsK0RBQStEO3FCQUNoSDtpQkFDSjtnQkFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBRSx1QkFBdUI7WUFDL0MsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVywwREFBVztZQVB0Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUM1QyxDQUFDOzs7V0FBQTtRQVFELHNCQUFXLG9EQUFLO1lBTmhCOzs7OztlQUtHO2lCQUNIO2dCQUNJLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQztZQUVEOzs7O2VBSUc7aUJBQ0gsVUFBaUIsS0FBYTtnQkFDMUIsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQztvQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLHFFQUFpQyxDQUFDLHVEQUFtQixDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdHLENBQUM7OztXQVpBO1FBY0Q7Ozs7O1dBS0c7UUFDSSx1REFBVyxHQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO1FBUUQsc0JBQVcsb0RBQUs7WUFOaEI7Ozs7O2VBS0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0QsQ0FBQztZQUVEOzs7O2VBSUc7aUJBQ0gsVUFBaUIsS0FBYTtnQkFDMUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVwRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLHFFQUFpQyxDQUFDLHVEQUFtQixDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2SCxDQUFDOzs7V0FaQTtRQXVCRCxzQkFBVyx1REFBUTtZQVJuQjs7Ozs7OztlQU9HO2lCQUNIO2dCQUNJLE9BQU8sb0JBQVEsQ0FBQyxxQkFBcUIsQ0FBQztZQUMxQyxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksc0ZBQTBDLEdBQWpELFVBQWtELGVBQWdDO1lBRTlFLGVBQWUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNDLElBQUcsZUFBZSxZQUFZLDZDQUFxQixJQUFJLGVBQWUsWUFBWSw2REFBNkIsRUFBRTtnQkFDN0csZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7YUFDM0Y7aUJBQ0ksSUFBSSxlQUFlLFlBQVksNkNBQXFCLEVBQUM7Z0JBQ3RELGVBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUcsNEJBQTRCO2FBQ2pGO2lCQUNJLElBQUksZUFBZSxZQUFZLDZDQUFxQixFQUFDO2dCQUN0RCxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQyxDQUFHLDZDQUE2QzthQUNoRztZQUNELGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUMzQixDQUFDO1FBRU0sbUdBQXVELEdBQTlELFVBQStELEtBQWlCLEVBQUUsZUFBaUM7WUFDL0csZUFBZSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLGVBQWUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNsQyxJQUFHLGVBQWUsWUFBWSw2Q0FBcUIsSUFBSSxlQUFlLFlBQVksNkRBQTZCLEVBQUM7Z0JBQzVHLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsNkNBQTZDO1lBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFrQkQ7Ozs7OztXQU1HO1FBQ0ssOERBQWtCLEdBQTFCO1lBQ0ksa0RBQWtEO1lBQ2xELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBRTlELGlEQUFpRDtZQUNqRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLHFCQUFxQjtZQUM1RSxJQUFHLGVBQWUsSUFBSSxTQUFTLEVBQUM7Z0JBQzVCLElBQUcsZUFBZSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7b0JBQ2xDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO3dCQUN6QyxJQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7NEJBQ3RELGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixDQUFDLEVBQUUsQ0FBQzt5QkFDUDtxQkFDSjtpQkFDSjthQUNKO1lBRUQseURBQXlEO1lBQ3pELElBQUcsSUFBSSxDQUFDLE1BQU0sWUFBWSx5REFBMkIsRUFBQztnQkFDbEQsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3pDLElBQUcsSUFBSSxDQUFDLE1BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBQyxFQUFFLGtCQUFrQjt3QkFDN0UsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLENBQUMsRUFBRSxDQUFDO3FCQUNQO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLGVBQWUsQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssNEVBQWdDLEdBQXhDO1lBQ0ksSUFBSSxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdEMsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDLEVBQUUsNkJBQTZCO2dCQUN0RCxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3BDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNoQyxrREFBa0Q7b0JBQ3hELElBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBQzt3QkFDakMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDL0IsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7cUJBQzNFO2lCQUNFO2FBQ0o7WUFDRCxPQUFPLGVBQWUsQ0FBQztRQUMzQixDQUFDO1FBRU8sa0VBQXNCLEdBQTlCO1lBQ0ksSUFBSSxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQXNDLENBQUM7WUFDbEUsSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBQztnQkFDekIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDNUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3RDLElBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLHVFQUFrQyxFQUFDO3dCQUM3RCxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQXVDLENBQUMsQ0FBQztxQkFDM0U7aUJBQ0o7YUFDSjtZQUNELE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFFTCx3Q0FBQztJQUFELENBQUMsQUFuU0QsQ0FBdUQscUJBQVMsR0FtUy9EO0lBblNZLDhFQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcmllTm9kZSwgTm9kZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckFjdGlvbiwgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSwgQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhU3RyaW5nIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhU3RyaW5nXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgZXh0ZW5kcyBTZXJpZU5vZGUgaW1wbGVtZW50cyBJQ2VsbEluZm97XHJcbiAgICBjYWxjdWxhdGlvbkRhdGE6IFRDYWxjdWxhdGlvbkRhdGE7XHJcbiAgICBvbmx5VmFsdWVzRnJvbUxpc3RBcmVBbGxvd2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBkcm9wUG9zc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgd2l0aCBhdmFpbGFibGUgdmFsdWVzIGZvciB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KEFycmF5PElWYWx1ZUxpc3RJdGVtPnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlcygpOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkIHtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YS52YWx1ZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLnZhbHVlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mbyAhPSB1bmRlZmluZWQgJiYgdGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8uc2hvd1NpZ25hbExpc3QgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlcmllU2VsZWN0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGF0eXBlIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGVOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkZsb2F0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0cmluZ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG1pblZhbHVlKCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvLm1pblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IG1heFZhbHVlKCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvLm1heFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFyZW50IG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXQgXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwYXJlbnQgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmdldERpc3BsYXlOYW1lKCk7IC8vIFNob3cgdGhlIGRpc3BsYXkgbmFtZSBvZiBpbnB1dC9vdXRwdXQgcGFyYW1ldGVyIGluIGVkaXQgbW9kZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlOyAgLy8gU2hvdyBvbmx5IHRoZSB2YWx1ZSBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlc2NyaXB0aW9uIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb2xvciBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0ID0+IGN1cnJlbnRseSBubyBjb2xvciBuZWVkZWQgZm9yIGlucHV0c1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29sb3Igb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dCA9PiBjdXJyZW50bHkgbm8gY29sb3IgbmVlZGVkIGZvciBpbnB1dHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgbmV3IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyhTaWduYWxNYW5hZ2VyQWN0aW9uLmNvbG9yQ2hhbmdlZCwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBjYWxjdWxhdGlvbiBpbnB1dCB3cml0dGVuIGluIHRoZSBjZWxsIChyb3dkYXRhKVxyXG4gICAgICogQWRkZWQgZm9yIGh0bWxcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSYXdWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0IFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZ2V0RGlzcGxheVZhbHVlKHRoaXMuX3ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZ2V0UmF3VmFsdWVUb0Rpc3BsYXlWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi52YWx1ZUNoYW5nZWQsIHZhbHVlLCBvbGRWYWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbm9kZVR5cGUoKTogTm9kZVR5cGV7XHJcbiAgICAgICAgcmV0dXJuIE5vZGVUeXBlLmNhbGN1bGF0aW9uSW5wdXRQYXJhbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBzaWduYWxDYWxjdWxhdGlvbkRhdGEgdG8gdGhlIGNhbGN1bGF0aW9uIGRhdGEgKE5PVCBGT1Igc2VyaWUgbmFtZXMgaW4gc2lnbmFsIGNhbGN1bGF0aW9uIGRhdGE7IG9ubHkgZm9yIHN0cmluZ3MsIG51bWVyaWNzLCAuLi4pXHJcbiAgICAgKiBSZXNldHMgYW4gb2xkIHNlcmllIHRvIHVuZGVmaW5lZCBpZiBpdCB3YXMgdXNlZCBiZWZvcmUgaW4gdGhpcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGF9IHNpZ25hbENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQHBhcmFtIHtDYWxjdWxhdGlvbkRhdGF9IGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2lnbmFsQ2FsY3VsYXRpb25WYWx1ZVRvQ2FsY3VsYXRpb25EYXRhKGNhbGN1bGF0aW9uRGF0YTogQ2FsY3VsYXRpb25EYXRhKXtcclxuICAgICAgICBcclxuICAgICAgICBjYWxjdWxhdGlvbkRhdGEudmFsdWUgPSB0aGlzLmdldFJhd1ZhbHVlKCk7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIHx8IGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKSB7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKHBhcnNlRmxvYXQoY2FsY3VsYXRpb25EYXRhLnZhbHVlKSk7IC8vIFNldCBhdmFpbGFibGUgbnVtYmVyIGRhdGFcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhU3RyaW5nKXtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25EYXRhLnNldERhdGEoY2FsY3VsYXRpb25EYXRhLnZhbHVlKTsgICAvLyBTZXQgYXZhaWxhYmxlIHN0cmluZyBkYXRhXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVBvaW50cyl7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKG5ldyBBcnJheTxJUG9pbnQ+KCkpOyAgIC8vIE5vIHNpZ25hbCBkYXRhIGF2YWlsYWJsZSwgc2V0IGVtcHR5IHBvaW50c1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgY3VycmVudCB1c2VkIHNlcmllIGZyb20gY2FsY3VsYXRpb25EYXRhXHJcbiAgICAgICAgdGhpcy5zZXJpZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2lnbmFsQ2FsY3VsYXRpb25WYWx1ZVRvQ2FsY3VsYXRpb25EYXRhV2l0aFNlcmllRGF0YShzZXJpZTogQmFzZVNlcmllcywgY2FsY3VsYXRpb25EYXRhOiBUQ2FsY3VsYXRpb25EYXRhKXtcclxuICAgICAgICBjYWxjdWxhdGlvbkRhdGEudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGNhbGN1bGF0aW9uRGF0YS50eXBlID0gc2VyaWUudHlwZTtcclxuICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfHwgY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMpe1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEuc2V0RGF0YShzZXJpZS5yYXdQb2ludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgY3VycmVudCB1c2VkIHNpZ25hbCB0byBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAgICB0aGlzLnNlcmllID0gc2VyaWU7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhLlxyXG4gICAgICogQHBhcmFtIHtUQ2FsY3VsYXRpb25EYXRhfSBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNJbnB1dFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYWxjdWxhdGlvbkRhdGE6IFRDYWxjdWxhdGlvbkRhdGEpe1xyXG4gICAgICAgIHN1cGVyKFwiXCIsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGEgPSBjYWxjdWxhdGlvbkRhdGE7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5vbmx5VmFsdWVzRnJvbUxpc3RBcmVBbGxvd2VkID0gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8ub25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLmNhbGN1bGF0aW9uRGF0YS52YWx1ZTtcclxuICAgICAgICB0aGlzLmNhbkRlbGV0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgYSBsaXN0KGRpc3BsYXlWYWx1ZSwgdmFsdWUpIG9mIHRoZSBzZXJpZXMgd2hpY2ggYXJlIGF2YWlsYWJsZSBhdCB0aGUgcGFyZW50IHNlcmllIGdyb3VwLCBvdXRwdXQgc2VyaWVzIG9mIHRoZSBjdXJyZW50IGNhbGN1bGF0aW9uIHdpbGwgYmUgcmVtb3ZlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZVNlbGVjdGlvbnMoKTogQXJyYXk8YW55PntcclxuICAgICAgICAvLyBnZXQgYWxsIGF2YWlsYWJsZSBzZXJpZXMgZnJvbSBwYXJlbnQgc2VyaWVHcm91cFxyXG4gICAgICAgIGxldCBzZXJpZVNlbGVjdGlvbnMgPSB0aGlzLmdldEFsbFNlcmllc0Zyb21QYXJlbnRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmVtb3ZlIG93biBvdXRwdXQgc2VyaWVzIGZyb20gdGhpcyBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCBvdXRwdXRTZXJpZURhdGEgPSB0aGlzLmdldE91dHB1dERhdGFzT2ZQYXJlbnQoKVswXTsvLyBUT0RPOiBtdWx0aSBvdXRwdXRcclxuICAgICAgICBpZihvdXRwdXRTZXJpZURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYob3V0cHV0U2VyaWVEYXRhLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlcmllU2VsZWN0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VyaWVTZWxlY3Rpb25zW2ldLnZhbHVlID09IG91dHB1dFNlcmllRGF0YS5zZXJpZS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVTZWxlY3Rpb25zLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLS07ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHNlcmllcyB3aGljaCByZXN1bHRzIGluIGEgY3ljbGUgb2YgY2FsY3VsYXRpb25zXHJcbiAgICAgICAgaWYodGhpcy5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlcmllU2VsZWN0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudCEuY3ljbGVGb3VuZChzZXJpZVNlbGVjdGlvbnNbaV0udmFsdWUpID09IHRydWUpeyAvLyBjaGVjayBmb3IgY3ljbGVcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZVNlbGVjdGlvbnMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tOyAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmllU2VsZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0KHdpdGggZGlzcGxheVZhbHVlIGFuZCB2YWx1ZSkgb2YgYWxsIHNlcmllcyBmcm9tIHRoZSBwYXJlbnQgc2VyaWUgZ3JvdXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QWxsU2VyaWVzRnJvbVBhcmVudFNlcmllR3JvdXAoKTogQXJyYXk8YW55PntcclxuICAgICAgICBsZXQgc2VyaWVTZWxlY3Rpb25zID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBsZXQgc2VyaWVHcm91cCA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIGlmKHNlcmllR3JvdXAgIT0gdW5kZWZpbmVkKXsgLy8gSXMgYSBzZXJpZSBncm91cCBhdmFpbGFibGVcclxuICAgICAgICAgICAgbGV0IHNlcmllcyA9IHNlcmllR3JvdXAuZ2V0U2VyaWVzKCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIC8vIFNvIGZhciwgb25seSBhbGxvd2VkIHRvIHVzZSB5dCBzZXJpZXMgYXMgaW5wdXQgXHJcblx0XHQgICAgICAgIGlmKHNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllTmFtZSA9IHNlcmllc1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllU2VsZWN0aW9ucy5wdXNoKHtkaXNwbGF5VmFsdWU6IHNlcmllTmFtZSwgdmFsdWU6IHNlcmllTmFtZX0pO1xyXG5cdFx0ICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllU2VsZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE91dHB1dERhdGFzT2ZQYXJlbnQoKTogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGFzID0gbmV3IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGE+KCk7XHJcbiAgICAgICAgaWYodGhpcy5fcGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnRDaGlsZHMgPSB0aGlzLl9wYXJlbnQuZ2V0Q2hpbGRzKCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcGFyZW50Q2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHBhcmVudENoaWxkc1tpXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dERhdGFzLnB1c2gocGFyZW50Q2hpbGRzW2ldIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhcztcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==
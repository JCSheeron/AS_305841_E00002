var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../communication/rest/opcUaRestServices", "../online/mappCockpitComponent", "../online/mappCockpitComponentReflection", "./mappCockpitComponentParameterProvider"], function (require, exports, opcUaRestServices_1, ModelItems, mappCockpitComponentReflection_1, mappCockpitComponentParameterProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements component method access services
     *
     * @export
     * @class MappCockpitComponentMethodProvider
     */
    var MappCockpitComponentMethodProvider = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentMethodProvider.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof MappCockpitComponentMethodProvider
         */
        function MappCockpitComponentMethodProvider(diagnosticProvider, parameterProvider) {
            this._diagnosticProvider = diagnosticProvider;
            this._parameterProvider = new mappCockpitComponentParameterProvider_1.MappCockpitComponentParameterProvider(diagnosticProvider);
        }
        /**
     * Browses the methods of a component
     *
     * @private
     * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
     * @memberof MappCockpitComponentMethodProvider
     */
        MappCockpitComponentMethodProvider.prototype.browseComponentMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var methodSet, componentMethods, i, componentMethod, mappCockpitComponentMethod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMethodSet(this._diagnosticProvider.sessionId, mappCockpitComponent.id)];
                        case 1:
                            methodSet = _a.sent();
                            componentMethods = new Array();
                            for (i = 0; i < methodSet.length; i++) {
                                try {
                                    componentMethod = methodSet[i];
                                    mappCockpitComponentMethod = new ModelItems.MappCockpitComponentMethod(mappCockpitComponent, componentMethod.displayName, componentMethod);
                                    componentMethods.push(mappCockpitComponentMethod);
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            }
                            mappCockpitComponent.methods = componentMethods;
                            return [2 /*return*/, mappCockpitComponent.methods];
                    }
                });
            });
        };
        /**
         * Browses the component method parameters
         *
         * @private
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentMethodProvider
         */
        MappCockpitComponentMethodProvider.prototype.browseComponentMethodParameters = function (mappCockpitComponentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                var methodInputParameterReadRequest, methodInputParameters;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            methodInputParameterReadRequest = [];
                            mappCockpitComponentMethods.forEach(function (mappCockpitComponentMethod) { methodInputParameterReadRequest.push(_this.readMethodInputParameters(mappCockpitComponentMethod)); });
                            return [4 /*yield*/, Promise.all(methodInputParameterReadRequest)];
                        case 1:
                            methodInputParameters = _a.sent();
                            return [2 /*return*/, methodInputParameters];
                    }
                });
            });
        };
        /**
         * Read input parameters for a component method
         *
         * @private
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {Promise<ModelItems.MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentMethodProvider.prototype.readMethodInputParameters = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var inputParameters, componentMethodInputParameters, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // clear current input parameters
                            componentMethod.inputParameters = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readMethodParameters(this._diagnosticProvider.sessionId, componentMethod.id)];
                        case 2:
                            inputParameters = _a.sent();
                            componentMethodInputParameters = inputParameters.map(function (inputParameter) { return new ModelItems.MappCockpitMethodParameter(componentMethod, inputParameter.name, inputParameter); });
                            // update the methods parameter list
                            componentMethod.inputParameters = componentMethodInputParameters;
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error("MappCockpitComponentProvider: Could not read method input parameters for %o ", componentMethod);
                            return [3 /*break*/, 4];
                        case 4: 
                        // return the methods input parameters
                        return [2 /*return*/, componentMethod.inputParameters];
                    }
                });
            });
        };
        /**
         * reads and updates method parameter enums
         *
         * @param {ModelItems.MappCockpitComponentMethod[]} methods
         * @returns {*}
         * @memberof MappCockpitComponentMethodProvider
         */
        MappCockpitComponentMethodProvider.prototype.readMethodParameterEnums = function (methods) {
            var metaData = methods[0].component.metaData;
            for (var i = 0; i < methods.length; i++) {
                var method = methods[i];
                if (method.inputParameters.length > 0) {
                    mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.readMethodParameterEnums(method, metaData);
                }
            }
        };
        /**
         * executes a component method
         *
         * @param {MappCockpitComponentMethod} mappCockpitComponentMethod
         * @returns {*}
         * @memberof MappCockpitComponentMethodProvider
         */
        MappCockpitComponentMethodProvider.prototype.executeComponentMethod = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var methodResult, methodNodeId, methodArgs, i, inputParameter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mappCockpitComponentMethod.isExecutable.value) return [3 /*break*/, 2];
                            methodNodeId = mappCockpitComponentMethod.id.split(".")[0] + ".MethodSet";
                            methodArgs = {};
                            for (i = 0; i < mappCockpitComponentMethod.inputParameters.length; i++) {
                                inputParameter = mappCockpitComponentMethod.inputParameters[i];
                                methodArgs[inputParameter.name] = inputParameter.value;
                            }
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeMethod(this._diagnosticProvider.sessionId, methodNodeId, mappCockpitComponentMethod.id, methodArgs)];
                        case 1:
                            methodResult = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            console.error("MappCockpitComponentProvider: method %o called though not executable!");
                            methodResult = undefined;
                            _a.label = 3;
                        case 3: return [2 /*return*/, methodResult];
                    }
                });
            });
        };
        /**
         * updates method parameter data types
         *
         * @param {MappCockpitComponentMethod[]} methods
         * @returns {*}
         * @memberof MappCockpitComponentMethodProvider
         */
        MappCockpitComponentMethodProvider.prototype.updateMethodParameterDataTypes = function (methods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // read and update method parameter data types
                        return [4 /*yield*/, this.readMethodParameterDataTypes(methods)];
                        case 1:
                            // read and update method parameter data types
                            _a.sent();
                            // read and update parameter enums
                            this.readMethodParameterEnums(methods);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * reads and assigns method parameter data types
        *
        * @param {ModelItems.MappCockpitComponentMethod[]} methods
        * @returns {Promise<any>}
        * @memberof MappCockpitComponentMethodProvider
        */
        MappCockpitComponentMethodProvider.prototype.readMethodParameterDataTypes = function (methods) {
            return __awaiter(this, void 0, void 0, function () {
                var iMethod, method, iPar, inputPar;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            iMethod = 0;
                            _a.label = 1;
                        case 1:
                            if (!(iMethod < methods.length)) return [3 /*break*/, 6];
                            method = methods[iMethod];
                            iPar = 0;
                            _a.label = 2;
                        case 2:
                            if (!(iPar < method.inputParameters.length)) return [3 /*break*/, 5];
                            inputPar = method.inputParameters[iPar];
                            return [4 /*yield*/, this.updateMethodParameterDataType(inputPar)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            iPar++;
                            return [3 /*break*/, 2];
                        case 5:
                            iMethod++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Updates the method input parameter s data type
         *
         * @private
         * @param {ModelItems.MappCockpitMethodParameter} inputParameter
         * @memberof MappCockpitComponentMethodProvider
         */
        MappCockpitComponentMethodProvider.prototype.updateMethodParameterDataType = function (inputParameter) {
            return __awaiter(this, void 0, void 0, function () {
                var dataTypeRef;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!inputParameter.dataType.isDefined) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._parameterProvider.readDataTypeInfo(inputParameter.dataTypeId)];
                        case 1:
                            dataTypeRef = _a.sent();
                            inputParameter.dataType = dataTypeRef;
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return MappCockpitComponentMethodProvider;
    }());
    exports.MappCockpitComponentMethodProvider = MappCockpitComponentMethodProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQWFJOzs7O1dBSUc7UUFDSCw0Q0FBWSxrQkFBaUQsRUFBRSxpQkFBd0Q7WUFDbkgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLDZFQUFxQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDNUYsQ0FBQztRQUVEOzs7Ozs7T0FNRDtRQUNjLG1FQUFzQixHQUFuQyxVQUFvQyxvQkFBcUQ7Ozs7O2dDQUNyRSxxQkFBTSxxQ0FBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxFQUFBOzs0QkFBcEgsU0FBUyxHQUFHLFNBQXdHOzRCQUNwSCxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssRUFBeUMsQ0FBQzs0QkFDMUUsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dDQUN2QyxJQUFJO29DQUNJLGVBQWUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQy9CLDBCQUEwQixHQUFHLElBQUksVUFBVSxDQUFDLDBCQUEwQixDQUFDLG9CQUFvQixFQUFFLGVBQWUsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7b0NBQy9JLGdCQUFnQixDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2lDQUNyRDtnQ0FDRCxP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UUFDVywwRUFBNkIsR0FBM0MsVUFBNEMsY0FBcUQ7Ozs7OztpQ0FDekYsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBbEMsd0JBQWtDOzRCQUNoQixxQkFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFBOzs0QkFBdkYsV0FBVyxHQUFHLFNBQXlFOzRCQUMzRixjQUFjLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQzs7Ozs7O1NBRTdDO1FBRUwseUNBQUM7SUFBRCxDQUFDLEFBM0xELElBMkxDO0lBM0xZLGdGQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wY1VhUmVzdFNlcnZpY2VzIH0gZnJvbSAnLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFNlcnZpY2VzJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIgfSBmcm9tICcuL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyJztcclxuaW1wb3J0ICogYXMgTW9kZWxJdGVtcyBmcm9tICcuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQnO1xyXG5pbXBvcnQgeyAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvbic7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlciB9IGZyb20gJy4vbWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlcic7XHJcblxyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgY29tcG9uZW50IG1ldGhvZCBhY2Nlc3Mgc2VydmljZXMgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFByb3ZpZGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICogUmVmZXJlbmNlcyB0aGUgZGlhZ25vc3RpYyBwcm92aWRlclxyXG4gICAgKlxyXG4gICAgKiBAdHlwZSB7TWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJ9XHJcbiAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgcGFybWV0ZXIgcHJvdmlkZXJcclxuICAgIHByaXZhdGUgX3BhcmFtZXRlclByb3ZpZGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFByb3ZpZGVyLlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcn0gZGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLCBwYXJhbWV0ZXJQcm92aWRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlcikge1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJQcm92aWRlciA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyKGRpYWdub3N0aWNQcm92aWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAqIEJyb3dzZXMgdGhlIG1ldGhvZHMgb2YgYSBjb21wb25lbnRcclxuICpcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQcm92aWRlclxyXG4gKi9cclxuICAgIHB1YmxpYyBhc3luYyBicm93c2VDb21wb25lbnRNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50KTogUHJvbWlzZTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPiB7XHJcbiAgICAgICAgdmFyIG1ldGhvZFNldCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVNZXRob2RTZXQodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgbWFwcENvY2twaXRDb21wb25lbnQuaWQpO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRNZXRob2RzID0gbmV3IEFycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRob2RTZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRNZXRob2QgPSBtZXRob2RTZXRbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgPSBuZXcgTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZChtYXBwQ29ja3BpdENvbXBvbmVudCwgY29tcG9uZW50TWV0aG9kLmRpc3BsYXlOYW1lLCBjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50TWV0aG9kcy5wdXNoKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzID0gY29tcG9uZW50TWV0aG9kcztcclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIGNvbXBvbmVudCBtZXRob2QgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50TWV0aG9kUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHM6IEFycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KTogUHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10+IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZElucHV0UGFyYW1ldGVyUmVhZFJlcXVlc3Q6IFByb21pc2U8YW55PltdID0gW107XHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RzLmZvckVhY2goKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSA9PiB7IG1ldGhvZElucHV0UGFyYW1ldGVyUmVhZFJlcXVlc3QucHVzaCh0aGlzLnJlYWRNZXRob2RJbnB1dFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpKTsgfSk7XHJcbiAgICAgICAgbGV0IG1ldGhvZElucHV0UGFyYW1ldGVycyA9IGF3YWl0IFByb21pc2UuYWxsKG1ldGhvZElucHV0UGFyYW1ldGVyUmVhZFJlcXVlc3QpO1xyXG4gICAgICAgIHJldHVybiBtZXRob2RJbnB1dFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBpbnB1dCBwYXJhbWV0ZXJzIGZvciBhIGNvbXBvbmVudCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gY29tcG9uZW50TWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKGNvbXBvbmVudE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT4ge1xyXG5cclxuICAgICAgICAvLyBjbGVhciBjdXJyZW50IGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgbWV0aG9kcyBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIHZhciBpbnB1dFBhcmFtZXRlcnM6IEFycmF5PGFueT4gPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTWV0aG9kUGFyYW1ldGVycyh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBjb21wb25lbnRNZXRob2QuaWQpO1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIG1ldGhvZCBpbnB1dCBwYXJhbWV0ZXIgbHNpdFxyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TWV0aG9kSW5wdXRQYXJhbWV0ZXJzID0gaW5wdXRQYXJhbWV0ZXJzLm1hcCgoaW5wdXRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG5ldyBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKGNvbXBvbmVudE1ldGhvZCwgaW5wdXRQYXJhbWV0ZXIubmFtZSwgaW5wdXRQYXJhbWV0ZXIpIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXRob2RzIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgICAgICAgIGNvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnMgPSBjb21wb25lbnRNZXRob2RJbnB1dFBhcmFtZXRlcnM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXI6IENvdWxkIG5vdCByZWFkIG1ldGhvZCBpbnB1dCBwYXJhbWV0ZXJzIGZvciAlbyBcIiwgY29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGFuZCB1cGRhdGVzIG1ldGhvZCBwYXJhbWV0ZXIgZW51bXMgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IG1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRNZXRob2RQYXJhbWV0ZXJFbnVtcyhtZXRob2RzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbWV0YURhdGEgPSAoPGFueT5tZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRob2RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IG1ldGhvZHNbaV07XHJcbiAgICAgICAgICAgIGlmIChtZXRob2QuaW5wdXRQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5yZWFkTWV0aG9kUGFyYW1ldGVyRW51bXMobWV0aG9kLCBtZXRhRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleGVjdXRlcyBhIGNvbXBvbmVudCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZXhlY3V0ZUNvbXBvbmVudE1ldGhvZChtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IG1ldGhvZFJlc3VsdDtcclxuXHJcbiAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTm9kZUlkID0gbWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuaWQuc3BsaXQoXCIuXCIpWzBdICsgXCIuTWV0aG9kU2V0XCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWV0aG9kQXJncyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRQYXJhbWV0ZXIgPSBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgbWV0aG9kQXJnc1tpbnB1dFBhcmFtZXRlci5uYW1lXSA9IGlucHV0UGFyYW1ldGVyLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZXRob2RSZXN1bHQgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5leGVjdXRlTWV0aG9kKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIG1ldGhvZE5vZGVJZCwgbWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuaWQsIG1ldGhvZEFyZ3MpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyOiBtZXRob2QgJW8gY2FsbGVkIHRob3VnaCBub3QgZXhlY3V0YWJsZSFcIik7XHJcbiAgICAgICAgICAgIG1ldGhvZFJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBtZXRob2QgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IG1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlcyhtZXRob2RzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vIHJlYWQgYW5kIHVwZGF0ZSBtZXRob2QgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAgICBhd2FpdCB0aGlzLnJlYWRNZXRob2RQYXJhbWV0ZXJEYXRhVHlwZXMobWV0aG9kcyk7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgYW5kIHVwZGF0ZSBwYXJhbWV0ZXIgZW51bXNcclxuICAgICAgICB0aGlzLnJlYWRNZXRob2RQYXJhbWV0ZXJFbnVtcyhtZXRob2RzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIHJlYWRzIGFuZCBhc3NpZ25zIG1ldGhvZCBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gbWV0aG9kc1xyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQcm92aWRlclxyXG4gICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZE1ldGhvZFBhcmFtZXRlckRhdGFUeXBlcyhtZXRob2RzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpTWV0aG9kID0gMDsgaU1ldGhvZCA8IG1ldGhvZHMubGVuZ3RoOyBpTWV0aG9kKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gbWV0aG9kc1tpTWV0aG9kXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaVBhciA9IDA7IGlQYXIgPCBtZXRob2QuaW5wdXRQYXJhbWV0ZXJzLmxlbmd0aDsgaVBhcisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dFBhciA9IG1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbaVBhcl07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlKGlucHV0UGFyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWV0aG9kIGlucHV0IHBhcmFtZXRlciBzIGRhdGEgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJ9IGlucHV0UGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlKGlucHV0UGFyYW1ldGVyOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgaWYgKCFpbnB1dFBhcmFtZXRlci5kYXRhVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFUeXBlUmVmID0gYXdhaXQgdGhpcy5fcGFyYW1ldGVyUHJvdmlkZXIucmVhZERhdGFUeXBlSW5mbyhpbnB1dFBhcmFtZXRlci5kYXRhVHlwZUlkKTtcclxuICAgICAgICAgICAgaW5wdXRQYXJhbWV0ZXIuZGF0YVR5cGUgPSBkYXRhVHlwZVJlZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19
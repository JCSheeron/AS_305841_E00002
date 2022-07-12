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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "../online/mappCockpitComponent", "./mappCockpitComponentParameterProvider", "./mappCockpitComponentMethodProvider"], function (require, exports, opcUaRestServices_1, ModelItems, mappCockpitComponentParameterProvider_1, mappCockpitComponentMethodProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements component access services
     *
     * @class MappCockpitComponentProvider
     */
    var MappCockpitComponentProvider = /** @class */ (function () {
        function MappCockpitComponentProvider(diagnosticProvider) {
            this._diagnosticProvider = diagnosticProvider;
            this._parameterProvider = new mappCockpitComponentParameterProvider_1.MappCockpitComponentParameterProvider(diagnosticProvider);
            this._methodProvider = new mappCockpitComponentMethodProvider_1.MappCockpitComponentMethodProvider(diagnosticProvider, this._parameterProvider);
        }
        /**
         * Browses the available mapp cockpit components
         *
         * @private
         * @param {number} sessionId
         * @param {number} namespaceIndex
         * @param {MappCockpitComponentDataModel} mappCockpitComponentDataModel
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.browseComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var allComponents, filteredMappCockpitComponents, mappCockpitComponents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(this._diagnosticProvider.sessionId, this._diagnosticProvider.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitRootNodeId)];
                        case 1:
                            allComponents = (_a.sent());
                            filteredMappCockpitComponents = opcUaRestServices_1.OpcUaRestServices.filterMappCockpitNodes(allComponents, this._diagnosticProvider.namespace);
                            mappCockpitComponents = filteredMappCockpitComponents.map(function (mappCockpitComponentRef) {
                                return new ModelItems.MappCockpitComponent(null, mappCockpitComponentRef.displayName, mappCockpitComponentRef);
                            });
                            return [2 /*return*/, mappCockpitComponents];
                    }
                });
            });
        };
        /**
         * browses the available meta information for a component
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<ModelItems.MappCockpitComponentParameter[]>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.browseComponentMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMetaInfo(this._diagnosticProvider.sessionId, mappCockpitComponent.id)];
                        case 1:
                            metaInfoReferences = _a.sent();
                            return [2 /*return*/, metaInfoReferences];
                    }
                });
            });
        };
        /**
         * Browses the parameters of a component
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.browseComponentParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._parameterProvider.browseComponentParameters(mappCockpitComponent)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * updates parameter data types
         *
         * @param {any[]} parameters
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.updateParameterDataTypes = function (parameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._parameterProvider.updateParameterDataTypes(parameters)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * reads a parameters value and updates the parameters value if specified
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @param {boolean} [update=true] updates the parameters value if true
         * @returns
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readComponentParameterValue = function (componentParameter, update) {
            if (update === void 0) { update = true; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._parameterProvider.readComponentParameterValue(componentParameter, update)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * writes a parameter value
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @returns
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.writeComponentParameterValue = function (componentParameter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._parameterProvider.writeComponentParameterValue(componentParameter)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Browses the methods of a component
         *
         * @private
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.browseComponentMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._methodProvider.browseComponentMethods(mappCockpitComponent)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * executes a component method
         *
         * @param {MappCockpitComponentMethod} mappCockpitComponentMethod
         * @returns {*}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.executeComponentMethod = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._methodProvider.executeComponentMethod(mappCockpitComponentMethod)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Browses the component method parameters
         *
         * @private
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.browseComponentMethodParameters = function (mappCockpitComponentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._methodProvider.browseComponentMethodParameters(mappCockpitComponentMethods)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * updates method parameter data types
         *
         * @param {MappCockpitComponentMethod[]} methods
         * @returns {*}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.updateMethodParameterDataTypes = function (methods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._methodProvider.updateMethodParameterDataTypes(methods)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MappCockpitComponentProvider;
    }());
    exports.MappCockpitComponentProvider = MappCockpitComponentProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7T0FJRztJQUNIO1FBZ0JJLHNDQUFZLGtCQUFpRDtZQUN6RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksNkVBQXFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksdUVBQWtDLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0csQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ1UsdURBQWdCLEdBQTdCOzs7OztnQ0FHeUIscUJBQU0scUNBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcscUNBQWlCLENBQUMscUJBQXFCLENBQUMsRUFBQTs7NEJBQTVLLGFBQWEsR0FBRyxDQUFDLFNBQTJKLENBQUM7NEJBQzdLLDZCQUE2QixHQUFHLHFDQUFpQixDQUFDLHNCQUFzQixDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBSzNILHFCQUFxQixHQUFzQyw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsVUFBQyx1QkFBdUI7Z0NBQ3JILE9BQU8sSUFBSSxVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFBOzRCQUNqSCxDQUFDLENBQUMsQ0FBQzs0QkFFSCxzQkFBTyxxQkFBcUIsRUFBQzs7OztTQUNoQztRQUVEOzs7Ozs7V0FNRztRQUNVLDhEQUF1QixHQUFwQyxVQUFxQyxvQkFBcUQ7Ozs7O2dDQUc3RCxxQkFBTSxxQ0FBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxFQUFBOzs0QkFBNUgsa0JBQWtCLEdBQUcsU0FBdUc7NEJBQ2hJLHNCQUFPLGtCQUFrQixFQUFFOzs7O1NBQzlCO1FBRUQ7Ozs7Ozs7V0FPRztRQUNVLGdFQUF5QixHQUF0QyxVQUF1QyxvQkFBcUQ7Ozs7Z0NBQ2pGLHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBO2dDQUFwRixzQkFBTyxTQUE2RSxFQUFDOzs7O1NBQ3hGO1FBRUQ7Ozs7OztXQU1HO1FBQ0csK0RBQXdCLEdBQTlCLFVBQStCLFVBQXNEOzs7O2dDQUMxRSxxQkFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLEVBQUE7Z0NBQXpFLHNCQUFPLFNBQWtFLEVBQUM7Ozs7U0FDN0U7UUFHRDs7Ozs7OztXQU9HO1FBQ1Usa0VBQTJCLEdBQXhDLFVBQXlDLGtCQUE0RCxFQUFFLE1BQWE7WUFBYix1QkFBQSxFQUFBLGFBQWE7Ozs7Z0NBQ3pHLHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywyQkFBMkIsQ0FBQyxrQkFBa0IsRUFBQyxNQUFNLENBQUMsRUFBQTtnQ0FBM0Ysc0JBQU8sU0FBb0YsRUFBQzs7OztTQUMvRjtRQUVEOzs7Ozs7V0FNRztRQUNVLG1FQUE0QixHQUF6QyxVQUEwQyxrQkFBNEQ7Ozs7Z0NBQzNGLHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFBO2dDQUFyRixzQkFBTyxTQUE4RSxFQUFDOzs7O1NBQ3pGO1FBRUQ7Ozs7OztXQU1HO1FBQ1UsNkRBQXNCLEdBQW5DLFVBQW9DLG9CQUFxRDs7OztnQ0FDOUUscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBO2dDQUE5RSxzQkFBTyxTQUF1RSxFQUFDOzs7O1NBQ2xGO1FBRUQ7Ozs7OztXQU1HO1FBQ0csNkRBQXNCLEdBQTVCLFVBQTZCLDBCQUFpRTs7OztnQ0FDbkYscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQywwQkFBMEIsQ0FBQyxFQUFBO2dDQUFwRixzQkFBTyxTQUE2RSxFQUFDOzs7O1NBQ3hGO1FBRUQ7Ozs7OztXQU1HO1FBQ1Usc0VBQStCLEdBQTVDLFVBQTZDLDJCQUF5RTs7OztnQ0FDM0cscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQywrQkFBK0IsQ0FBQywyQkFBMkIsQ0FBQyxFQUFBO2dDQUE5RixzQkFBTyxTQUF1RixFQUFDOzs7O1NBQ2xHO1FBRUQ7Ozs7OztXQU1HO1FBQ1UscUVBQThCLEdBQTNDLFVBQTRDLE9BQWdEOzs7O2dDQUN4RixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxFQUFBOzs0QkFBbEUsU0FBa0UsQ0FBQzs7Ozs7U0FDdEU7UUFFTCxtQ0FBQztJQUFELENBQUMsQUF4SkQsSUF3SkM7SUF4Slksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZXMgfSBmcm9tICcuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZXMnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9IGZyb20gJy4vbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXInO1xyXG5pbXBvcnQgKiBhcyBNb2RlbEl0ZW1zIGZyb20gJy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXIgfSBmcm9tICcuL21hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFByb3ZpZGVyIH0gZnJvbSAnLi9tYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFByb3ZpZGVyJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGNvbXBvbmVudCBhY2Nlc3Mgc2VydmljZXNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZmVyZW5jZXMgdGhlIGRpYWdub3N0aWMgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBwYXJtZXRlciBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyUHJvdmlkZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXI7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIG1ldGhvZCBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kUHJvdmlkZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kUHJvdmlkZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcikge1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJQcm92aWRlciA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyKGRpYWdub3N0aWNQcm92aWRlcik7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kUHJvdmlkZXIgPSBuZXcgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQcm92aWRlcihkaWFnbm9zdGljUHJvdmlkZXIsIHRoaXMuX3BhcmFtZXRlclByb3ZpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIGF2YWlsYWJsZSBtYXBwIGNvY2twaXQgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmFtZXNwYWNlSW5kZXhcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IG1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50cygpOiBQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRbXT4ge1xyXG5cclxuICAgICAgICAvLyBSZWFkIGNvbXBvbmVudHNcclxuICAgICAgICBsZXQgYWxsQ29tcG9uZW50cyA9IChhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2Rlcyh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIubmFtZXNwYWNlICsgXCI7XCIgKyBPcGNVYVJlc3RTZXJ2aWNlcy5tYXBwQ29ja3BpdFJvb3ROb2RlSWQpKTtcclxuICAgICAgICB2YXIgZmlsdGVyZWRNYXBwQ29ja3BpdENvbXBvbmVudHMgPSBPcGNVYVJlc3RTZXJ2aWNlcy5maWx0ZXJNYXBwQ29ja3BpdE5vZGVzKGFsbENvbXBvbmVudHMsdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLm5hbWVzcGFjZSk7XHJcbiAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRoZSByZWZlcmVuY2VzIHRvIG1vZGVsIGl0ZW1zXHJcbiAgICAgICAgbGV0IG1hcHBDb2NrcGl0Q29tcG9uZW50czogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFtdID0gZmlsdGVyZWRNYXBwQ29ja3BpdENvbXBvbmVudHMubWFwKChtYXBwQ29ja3BpdENvbXBvbmVudFJlZikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQobnVsbCxtYXBwQ29ja3BpdENvbXBvbmVudFJlZi5kaXNwbGF5TmFtZSwgbWFwcENvY2twaXRDb21wb25lbnRSZWYpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwQ29ja3BpdENvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBhdmFpbGFibGUgbWV0YSBpbmZvcm1hdGlvbiBmb3IgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGJyb3dzZUNvbXBvbmVudE1ldGFJbmZvKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFJlYWQgY29tcG9uZW50IHBhcmFtZXRlcnMuXHJcbiAgICAgICAgdmFyIG1ldGFJbmZvUmVmZXJlbmNlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVNZXRhSW5mbyh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBtYXBwQ29ja3BpdENvbXBvbmVudC5pZCk7XHJcbiAgICAgICAgcmV0dXJuIG1ldGFJbmZvUmVmZXJlbmNlcyA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBwYXJhbWV0ZXJzIG9mIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGJyb3dzZUNvbXBvbmVudFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9wYXJhbWV0ZXJQcm92aWRlci5icm93c2VDb21wb25lbnRQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlUGFyYW1ldGVyRGF0YVR5cGVzKHBhcmFtZXRlcnM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3BhcmFtZXRlclByb3ZpZGVyLnVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlcyhwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhIHBhcmFtZXRlcnMgdmFsdWUgYW5kIHVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgdmFsdWUgaWYgc3BlY2lmaWVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBjb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3VwZGF0ZT10cnVlXSB1cGRhdGVzIHRoZSBwYXJhbWV0ZXJzIHZhbHVlIGlmIHRydWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVhZENvbXBvbmVudFBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgdXBkYXRlID0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9wYXJhbWV0ZXJQcm92aWRlci5yZWFkQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyLHVwZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3cml0ZXMgYSBwYXJhbWV0ZXIgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB3cml0ZUNvbXBvbmVudFBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9wYXJhbWV0ZXJQcm92aWRlci53cml0ZUNvbXBvbmVudFBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBtZXRob2RzIG9mIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBicm93c2VDb21wb25lbnRNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX21ldGhvZFByb3ZpZGVyLmJyb3dzZUNvbXBvbmVudE1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZXhlY3V0ZXMgYSBjb21wb25lbnQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZXhlY3V0ZUNvbXBvbmVudE1ldGhvZChtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX21ldGhvZFByb3ZpZGVyLmV4ZWN1dGVDb21wb25lbnRNZXRob2QobWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgY29tcG9uZW50IG1ldGhvZCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBicm93c2VDb21wb25lbnRNZXRob2RQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kczogQXJyYXk8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pOiBQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9tZXRob2RQcm92aWRlci5icm93c2VDb21wb25lbnRNZXRob2RQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIG1ldGhvZCBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gbWV0aG9kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKG1ldGhvZHM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWV0aG9kUHJvdmlkZXIudXBkYXRlTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKG1ldGhvZHMpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==
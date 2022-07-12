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
define(["require", "exports", "../mappCockpitCommonInfoProvider", "./traceDataPointInfo", "../../../framework/property", "../../../framework/command", "./mappCockpitTraceComponent", "../../../framework/componentHub/bindings/componentBinding", "../../../framework/componentHub/bindings/componentBindings"], function (require, exports, mappCockpitCommonInfoProvider_1, traceDataPointInfo_1, property_1, command_1, mappCockpitTraceComponent_1, componentBinding_1, componentBindings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements trace access services
     *
     * @class MappCockpitTraceProvider
     */
    var MappCockpitTraceProvider = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitTraceProvider.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof MappCockpitTraceProvider
         */
        function MappCockpitTraceProvider(diagnosticProvider) {
            this._diagnosticProvider = diagnosticProvider;
            this._availableTraceDataPoints = property_1.Property.create([]);
            this.createCommands();
        }
        /**
         * Creates the exposed commands
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.createCommands = function () {
            this._commandReadAvailableTracePoints = command_1.Command.create(this, this.executeCommandReadAvailableTracePoints());
        };
        /**
         * Initializes and connects the trace provider
         *
         * @param {number} sessionId
         * @param {number} _namespaceIndex
         * @returns {*}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.initializeTraceComponents()];
                        case 1:
                            _a._traceComponents = _b.sent();
                            return [4 /*yield*/, this.commandReadAvailableTracePoints.execute(null, function (availableTraceDataPoints) {
                                    _this.updateAvailableTracePointsInfo(availableTraceDataPoints);
                                })];
                        case 2:
                            _b.sent();
                            this.createComponentBindings();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates the bindings to other components
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.createComponentBindings = function () {
            var bindingAvailableDataPoints = new componentBinding_1.ComponentBinding();
            bindingAvailableDataPoints.type = componentBinding_1.BindingType.DATA;
            bindingAvailableDataPoints.component = this;
            bindingAvailableDataPoints.scope = "app::trace configuration";
            bindingAvailableDataPoints.id = "available data points";
            bindingAvailableDataPoints.sourceKey = "updateAvailableDataPoints";
            bindingAvailableDataPoints.passByValue = false;
            componentBindings_1.ComponentBindings.bind(bindingAvailableDataPoints);
        };
        /**
         * Notifies from updating the available trace points
         *
         * @private
         * @param {TraceDataPointInfo[]} availableTraceDataPoints
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.updateAvailableTracePointsInfo = function (availableTraceDataPoints) {
            this._availableTraceDataPoints.value = availableTraceDataPoints;
            //TODO: extract to own method to be called from the red trace points response
            this._traceComponents.forEach(function (traceComponent) {
                traceComponent.updateDataPointInformations(traceComponent.traceConfigurationData);
            });
        };
        Object.defineProperty(MappCockpitTraceProvider.prototype, "commandReadAvailableTracePoints", {
            /**
             * Command for reading the currently available trace points.
             *
             * @readonly
             * @type {Command<any, TraceData>}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._commandReadAvailableTracePoints;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Implements the command for reading the available trace points
         *
         * @returns {*}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.executeCommandReadAvailableTracePoints = function () {
            var _this = this;
            return function (commandArguments, commandResponse) {
                _this.readAllTraceDataPoints().then(function (traceDataPoints) {
                    commandResponse.executed(traceDataPoints);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        Object.defineProperty(MappCockpitTraceProvider.prototype, "traceComponents", {
            /**
             * Returns the trace components
             *
             * @readonly
             * @type {MappCockpitTraceComponent[]}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._traceComponents;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceProvider.prototype, "availableDataPoints", {
            /**
             * Gets the traceable data points
             *
             * @readonly
             * @type {Property<Array<TraceDataPoint>>}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._availableTraceDataPoints;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initializes and connects the target trace components
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.initializeTraceComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var components, traceComponents, i, traceComponent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getTraceComponents()];
                        case 1:
                            components = _a.sent();
                            traceComponents = new Array();
                            for (i = 0; i < components.length; i++) {
                                traceComponent = new mappCockpitTraceComponent_1.MappCockpitTraceComponent(this._diagnosticProvider, components[i]);
                                traceComponent.availableTraceDataPoints = this._availableTraceDataPoints;
                                traceComponents.push(traceComponent);
                            }
                            ;
                            return [2 /*return*/, traceComponents];
                    }
                });
            });
        };
        /**
         * gets the trace components from all available components
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.getTraceComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceComponents;
                return __generator(this, function (_a) {
                    traceComponents = this._diagnosticProvider.model.components.filter(function (component) { return component.browseName == "NewTraceConfig"; });
                    if (traceComponents.length == 1) {
                        // Set Displayname of trace component "NewTraceConfig" to "Trace"
                        traceComponents[0].displayName = "Trace";
                        return [2 /*return*/, traceComponents];
                    }
                    return [2 /*return*/, new Array()];
                });
            });
        };
        /**
         * Reads the available trace datapoints from all components.
         *
         * @private
         * @returns
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readAllTraceDataPoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var allAvailableTraceDataPoints, traceableComponents;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allAvailableTraceDataPoints = new Array();
                            return [4 /*yield*/, this.readTraceProviderComponents()];
                        case 1:
                            traceableComponents = _a.sent();
                            // collect the components data points into one flat array
                            traceableComponents.forEach(function (traceableComponentcomponent) {
                                var componetTracePoints = _this.readComponentTraceDataPoints(traceableComponentcomponent);
                                allAvailableTraceDataPoints = allAvailableTraceDataPoints.concat(componetTracePoints);
                            });
                            // update the available trace points link.
                            this._availableTraceDataPoints.value = allAvailableTraceDataPoints;
                            this.updateAvailableDataPoints(allAvailableTraceDataPoints);
                            return [2 /*return*/, allAvailableTraceDataPoints];
                    }
                });
            });
        };
        /**
         * Updates the available data points
         *
         * @private
         * @param {TraceDataPointInfo[]} allAvailableTraceDataPoints
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.updateAvailableDataPoints = function (allAvailableTraceDataPoints) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Collects components supporting traceability and exposing tracepoints
         *
         * @returns {Array<MappCockpitComponent>}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readTraceProviderComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceComponents, allComponents, i, component;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            traceComponents = new Array();
                            return [4 /*yield*/, this._diagnosticProvider.componentProvider.browseComponents()];
                        case 1:
                            allComponents = _a.sent();
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < allComponents.length)) return [3 /*break*/, 5];
                            component = allComponents[i];
                            return [4 /*yield*/, mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readComponentMetaInfo(component)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5:
                            traceComponents = allComponents.filter(function (component) { return component.metaData && component.metaData.MetaConfigDatapoints; });
                            return [2 /*return*/, traceComponents];
                    }
                });
            });
        };
        /**
         * Reads the trace data points from a single component
         *
         * @private
         * @param {MappCockpitComponent} traceableComponent
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readComponentTraceDataPoints = function (traceableComponent) {
            var traceDataPoints = [];
            var traceMetaInfo = traceableComponent.metaData.MetaConfigDatapoints.DataPointsDefinition;
            traceMetaInfo.Namespaces.forEach(function (namespace) {
                namespace.Data.DataPoints.forEach(function (dataPointRef) {
                    traceDataPoints.push(traceDataPointInfo_1.TraceDataPointInfo.create(traceableComponent.browseName, traceMetaInfo.DeviceAddress, namespace, dataPointRef));
                });
            });
            return traceDataPoints;
        };
        return MappCockpitTraceProvider;
    }());
    exports.MappCockpitTraceProvider = MappCockpitTraceProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRUcmFjZVByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlBOzs7O09BSUc7SUFDSDtRQWdCSTs7OztXQUlHO1FBQ0gsa0NBQVksa0JBQWlEO1lBRXpELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUU5QyxJQUFJLENBQUMseUJBQXlCLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQTRCLEVBQUUsQ0FBQyxDQUFDO1lBRWhGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBR0Q7Ozs7O1dBS0c7UUFDSyxpREFBYyxHQUF0QjtZQUNJLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLHNDQUFzQyxFQUFFLENBQUMsQ0FBQztRQUNoSCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNHLDZDQUFVLEdBQWhCOzs7Ozs7OzRCQUVJLEtBQUEsSUFBSSxDQUFBOzRCQUFvQixxQkFBTSxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBQTs7NEJBQTlELEdBQUssZ0JBQWdCLEdBQUcsU0FBc0MsQ0FBQzs0QkFHL0QscUJBQU0sSUFBSSxDQUFDLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsVUFBQyx3QkFBd0I7b0NBQzdFLEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dDQUNsRSxDQUFDLENBQUMsRUFBQTs7NEJBRkYsU0FFRSxDQUFDOzRCQUVILElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDOzs7OztTQUNsQztRQUVEOzs7OztXQUtHO1FBQ0ss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YWdub3N0aWNQcm92aWRlciB9IGZyb20gJy4uL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnR9IGZyb20gJy4uLy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyIH0gZnJvbSAnLi4vbWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludEluZm8gfSBmcm9tICcuL3RyYWNlRGF0YVBvaW50SW5mbyc7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5JztcclxuaW1wb3J0IHsgSVRyYWNlRGF0YVByb3ZpZGVyIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3RyYWNlRGF0YVByb3ZpZGVySW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29tbWFuZCwgSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlLCBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2NvbW1hbmQnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50IH0gZnJvbSAnLi9tYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZywgQmluZGluZ1R5cGUgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmcnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5ncyB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdHJhY2UgYWNjZXNzIHNlcnZpY2VzXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlciBpbXBsZW1lbnRzICBJVHJhY2VEYXRhUHJvdmlkZXIge1xyXG4gICBcclxuICAgIC8vIFJlZmVyZW5jZXMgdGhlIGRpYWdub3N0aWMgcHJvdmlkZXJcclxuICAgIHByaXZhdGUgX2RpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIHRyYWNlIGNvbXBvbmVudHMgaW5zdGFuY2VzXHJcbiAgICBwcml2YXRlIF90cmFjZUNvbXBvbmVudHMhOiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50W107XHJcbiAgICBcclxuICAgIC8vIEhvbGRzIHRoZSBhdmFpbGFibGUgdHJhY2UgZGF0YSBwb2ludHM7XHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFByb3BlcnR5PEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+O1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21tYW5kIGZvciByZWFkaW5nIHRoIHRyYWNlIGRhdGFcclxuICAgIHByaXZhdGUgX2NvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHMhOiBDb21tYW5kPGFueSwgQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPj47XHJcblxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlci5cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJ9IGRpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuXHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+KFtdKTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kcygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGV4cG9zZWQgY29tbWFuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRzKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHMgPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kUmVhZEF2YWlsYWJsZVRyYWNlUG9pbnRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYW5kIGNvbm5lY3RzIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBfbmFtZXNwYWNlSW5kZXhcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBpbml0aWFsaXplKCk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29tcG9uZW50cyA9IGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVRyYWNlQ29tcG9uZW50cygpO1xyXG5cclxuICAgXHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb21tYW5kUmVhZEF2YWlsYWJsZVRyYWNlUG9pbnRzLmV4ZWN1dGUobnVsbCwoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUF2YWlsYWJsZVRyYWNlUG9pbnRzSW5mbyhhdmFpbGFibGVUcmFjZURhdGFQb2ludHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudEJpbmRpbmdzKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiaW5kaW5ncyB0byBvdGhlciBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnRCaW5kaW5ncygpIHtcclxuICAgICAgICBjb25zdCBiaW5kaW5nQXZhaWxhYmxlRGF0YVBvaW50cyA9IG5ldyBDb21wb25lbnRCaW5kaW5nKCk7XHJcbiAgICAgICAgYmluZGluZ0F2YWlsYWJsZURhdGFQb2ludHMudHlwZSA9IEJpbmRpbmdUeXBlLkRBVEE7XHJcbiAgICAgICAgYmluZGluZ0F2YWlsYWJsZURhdGFQb2ludHMuY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBiaW5kaW5nQXZhaWxhYmxlRGF0YVBvaW50cy5zY29wZSA9IFwiYXBwOjp0cmFjZSBjb25maWd1cmF0aW9uXCI7XHJcbiAgICAgICAgYmluZGluZ0F2YWlsYWJsZURhdGFQb2ludHMuaWQgPSBcImF2YWlsYWJsZSBkYXRhIHBvaW50c1wiO1xyXG4gICAgICAgIGJpbmRpbmdBdmFpbGFibGVEYXRhUG9pbnRzLnNvdXJjZUtleSA9IFwidXBkYXRlQXZhaWxhYmxlRGF0YVBvaW50c1wiO1xyXG4gICAgICAgIGJpbmRpbmdBdmFpbGFibGVEYXRhUG9pbnRzLnBhc3NCeVZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuYmluZChiaW5kaW5nQXZhaWxhYmxlRGF0YVBvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb3RpZmllcyBmcm9tIHVwZGF0aW5nIHRoZSBhdmFpbGFibGUgdHJhY2UgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhY2VEYXRhUG9pbnRJbmZvW119IGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUF2YWlsYWJsZVRyYWNlUG9pbnRzSW5mbyhhdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFRyYWNlRGF0YVBvaW50SW5mb1tdKSB7XHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLnZhbHVlID0gYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgIC8vVE9ETzogZXh0cmFjdCB0byBvd24gbWV0aG9kIHRvIGJlIGNhbGxlZCBmcm9tIHRoZSByZWQgdHJhY2UgcG9pbnRzIHJlc3BvbnNlXHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb21wb25lbnRzLmZvckVhY2godHJhY2VDb21wb25lbnQgPT4ge1xyXG4gICAgICAgICAgICB0cmFjZUNvbXBvbmVudC51cGRhdGVEYXRhUG9pbnRJbmZvcm1hdGlvbnModHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21tYW5kIGZvciByZWFkaW5nIHRoZSBjdXJyZW50bHkgYXZhaWxhYmxlIHRyYWNlIHBvaW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtDb21tYW5kPGFueSwgVHJhY2VEYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21tYW5kUmVhZEF2YWlsYWJsZVRyYWNlUG9pbnRzKCk6IENvbW1hbmQ8YW55LCBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBsZW1lbnRzIHRoZSBjb21tYW5kIGZvciByZWFkaW5nIHRoZSBhdmFpbGFibGUgdHJhY2UgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHMoKTogIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LFRyYWNlRGF0YVBvaW50SW5mb1tdPntcclxuICAgICAgICByZXR1cm4gKGNvbW1hbmRBcmd1bWVudHM6YW55LGNvbW1hbmRSZXNwb25zZTogSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlPFRyYWNlRGF0YVBvaW50SW5mb1tdPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRBbGxUcmFjZURhdGFQb2ludHMoKS50aGVuKCh0cmFjZURhdGFQb2ludHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCh0cmFjZURhdGFQb2ludHMpO1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJhY2UgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0cmFjZUNvbXBvbmVudHMoKTogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2VDb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdHJhY2VhYmxlIGRhdGEgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7UHJvcGVydHk8QXJyYXk8VHJhY2VEYXRhUG9pbnQ+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBhdmFpbGFibGVEYXRhUG9pbnRzKCkgOiBQcm9wZXJ0eTxBcnJheTxUcmFjZURhdGFQb2ludEluZm8+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgIH1cclxuICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGFuZCBjb25uZWN0cyB0aGUgdGFyZ2V0IHRyYWNlIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXRpYWxpemVUcmFjZUNvbXBvbmVudHMoKSAge1xyXG5cclxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IGF3YWl0IHRoaXMuZ2V0VHJhY2VDb21wb25lbnRzKCk7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29tcG9uZW50cyA9IG5ldyBBcnJheTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0cmFjZUNvbXBvbmVudCA9IG5ldyBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50KHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciwgY29tcG9uZW50c1tpXSk7XHJcbiAgICAgICAgICAgIHRyYWNlQ29tcG9uZW50LmF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICAgICAgdHJhY2VDb21wb25lbnRzLnB1c2godHJhY2VDb21wb25lbnQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAgIHJldHVybiB0cmFjZUNvbXBvbmVudHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB0cmFjZSBjb21wb25lbnRzIGZyb20gYWxsIGF2YWlsYWJsZSBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRUcmFjZUNvbXBvbmVudHMoKTogUHJvbWlzZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+IHtcclxuICAgICAgICBsZXQgdHJhY2VDb21wb25lbnRzID0gdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLm1vZGVsLmNvbXBvbmVudHMuZmlsdGVyKGNvbXBvbmVudCA9PiB7cmV0dXJuIGNvbXBvbmVudC5icm93c2VOYW1lID09IFwiTmV3VHJhY2VDb25maWdcIn0pO1xyXG4gICAgICAgIGlmKHRyYWNlQ29tcG9uZW50cy5sZW5ndGggPT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFNldCBEaXNwbGF5bmFtZSBvZiB0cmFjZSBjb21wb25lbnQgXCJOZXdUcmFjZUNvbmZpZ1wiIHRvIFwiVHJhY2VcIlxyXG4gICAgICAgICAgICB0cmFjZUNvbXBvbmVudHNbMF0uZGlzcGxheU5hbWUgPSBcIlRyYWNlXCI7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFjZUNvbXBvbmVudHNcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBhdmFpbGFibGUgdHJhY2UgZGF0YXBvaW50cyBmcm9tIGFsbCBjb21wb25lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlYWRBbGxUcmFjZURhdGFQb2ludHMoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFsbEF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IG5ldyBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+KCk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0cmFjZWFibGUgY29tcG9uZW50c1xyXG4gICAgICAgIGxldCB0cmFjZWFibGVDb21wb25lbnRzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4gPSBhd2FpdCB0aGlzLnJlYWRUcmFjZVByb3ZpZGVyQ29tcG9uZW50cygpO1xyXG5cclxuICAgICAgICAvLyBjb2xsZWN0IHRoZSBjb21wb25lbnRzIGRhdGEgcG9pbnRzIGludG8gb25lIGZsYXQgYXJyYXlcclxuICAgICAgICB0cmFjZWFibGVDb21wb25lbnRzLmZvckVhY2goKHRyYWNlYWJsZUNvbXBvbmVudGNvbXBvbmVudCk9PntcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmV0VHJhY2VQb2ludHMgPSB0aGlzLnJlYWRDb21wb25lbnRUcmFjZURhdGFQb2ludHModHJhY2VhYmxlQ29tcG9uZW50Y29tcG9uZW50KTtcclxuICAgICAgICAgICAgYWxsQXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gYWxsQXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLmNvbmNhdChjb21wb25ldFRyYWNlUG9pbnRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBhdmFpbGFibGUgdHJhY2UgcG9pbnRzIGxpbmsuXHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLnZhbHVlID0gYWxsQXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUF2YWlsYWJsZURhdGFQb2ludHMoYWxsQXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFsbEF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGF2YWlsYWJsZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50SW5mb1tdfSBhbGxBdmFpbGFibGVUcmFjZURhdGFQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVBdmFpbGFibGVEYXRhUG9pbnRzKGFsbEF2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRJbmZvW10pIHtcclxuICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IG1ldGhvZCBzdHViIHRvIG1ha2UgdGhlIHBhc3NlZCBkYXRhIGJpbmRhYmxlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBjb21wb25lbnRzIHN1cHBvcnRpbmcgdHJhY2VhYmlsaXR5IGFuZCBleHBvc2luZyB0cmFjZXBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHJlYWRUcmFjZVByb3ZpZGVyQ29tcG9uZW50cygpOiBQcm9taXNlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIGxldCB0cmFjZUNvbXBvbmVudHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+KCk7XHJcbiAgICAgICAgLy9sZXQgYWxsQ29tcG9uZW50cyA9IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5tb2RlbC5jb21wb25lbnRzO1xyXG4gICAgICAgIGxldCBhbGxDb21wb25lbnRzID0gYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLmNvbXBvbmVudFByb3ZpZGVyLmJyb3dzZUNvbXBvbmVudHMoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGFsbENvbXBvbmVudHNbaV07XHJcbiAgICAgICAgICAgIGF3YWl0IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkucmVhZENvbXBvbmVudE1ldGFJbmZvKGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cmFjZUNvbXBvbmVudHMgPSBhbGxDb21wb25lbnRzLmZpbHRlcigoY29tcG9uZW50KT0+e3JldHVybiAoPGFueT5jb21wb25lbnQpLm1ldGFEYXRhICYmICg8YW55PmNvbXBvbmVudCkubWV0YURhdGEuTWV0YUNvbmZpZ0RhdGFwb2ludHMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNlQ29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSB0cmFjZSBkYXRhIHBvaW50cyBmcm9tIGEgc2luZ2xlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSB0cmFjZWFibGVDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkQ29tcG9uZW50VHJhY2VEYXRhUG9pbnRzKHRyYWNlYWJsZUNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdHJhY2VEYXRhUG9pbnRzOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+ID0gW107XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgdHJhY2VNZXRhSW5mbyA9ICg8YW55PnRyYWNlYWJsZUNvbXBvbmVudC5tZXRhRGF0YSkuTWV0YUNvbmZpZ0RhdGFwb2ludHMuRGF0YVBvaW50c0RlZmluaXRpb247XHJcblxyXG4gICAgICAgIHRyYWNlTWV0YUluZm8uTmFtZXNwYWNlcy5mb3JFYWNoKChuYW1lc3BhY2UpPT57XHJcbiAgICAgICAgICAgIG5hbWVzcGFjZS5EYXRhLkRhdGFQb2ludHMuZm9yRWFjaCgoZGF0YVBvaW50UmVmKT0+e1xyXG4gICAgICAgICAgICAgICAgdHJhY2VEYXRhUG9pbnRzLnB1c2goVHJhY2VEYXRhUG9pbnRJbmZvLmNyZWF0ZSh0cmFjZWFibGVDb21wb25lbnQuYnJvd3NlTmFtZSx0cmFjZU1ldGFJbmZvLkRldmljZUFkZHJlc3MsbmFtZXNwYWNlLGRhdGFQb2ludFJlZikpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiB0cmFjZURhdGFQb2ludHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIgfTsiXX0=
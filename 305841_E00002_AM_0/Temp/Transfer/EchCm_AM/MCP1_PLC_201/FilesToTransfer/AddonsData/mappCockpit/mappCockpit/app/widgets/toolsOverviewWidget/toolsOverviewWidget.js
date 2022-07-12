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
define(["require", "exports", "../common/overviewTreeGridWidgetBase", "../../framework/events", "../common/eventOpenViewArgs", "../../framework/property", "../../models/online/mappCockpitComponent", "../../common/directoryProvider", "../common/viewTypeProvider", "../loggerWidget/driveLog/driveLogDataProvider", "../loggerWidget/loggerProvider"], function (require, exports, overviewTreeGridWidgetBase_1, events_1, eventOpenViewArgs_1, property_1, mappCockpitComponent_1, directoryProvider_1, viewTypeProvider_1, driveLogDataProvider_1, loggerProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventOpenView = /** @class */ (function (_super) {
        __extends(EventOpenView, _super);
        function EventOpenView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventOpenView;
    }(events_1.TypedEvent));
    ;
    /**
     * implements the ToolsOverviewWidget
     *
     * @class ToolsOverviewWidget
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {IToolsOverviewWidget}
     */
    var ToolsOverviewWidget = /** @class */ (function (_super) {
        __extends(ToolsOverviewWidget, _super);
        function ToolsOverviewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventOpenView = new EventOpenView();
            _this._components = property_1.Property.create([]);
            _this._networkCommandTraceToolName = "mapp Motion Drive Log";
            _this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "toolsOverviewWidget/style/images/";
            return _this;
        }
        ToolsOverviewWidget.prototype.getHeaderText = function () {
            return "Tools Overview";
        };
        Object.defineProperty(ToolsOverviewWidget.prototype, "components", {
            set: function (components) {
                var _this = this;
                this._components = components;
                this._driveLogComponent = this._components.value.filter(function (component) { return component.browseName == loggerProvider_1.LoggerProvider.driveLogComponentName; })[0];
                if (this._driveLogComponent == undefined) {
                    return;
                }
                this._driveLogComponent.displayName = "Drive Log";
                this._driveLogComponent.commandConnectComponent.execute(null, function (result) {
                    var methods = _this._driveLogComponent.methods;
                    if (methods.length > 0) {
                        _this.onComponentMethodsUpdated(methods);
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * The component methods have been updated ...
         *
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @memberof ToolsOverviewWidget
         */
        ToolsOverviewWidget.prototype.onComponentMethodsUpdated = function (componentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                var getDriveLogConfigInfoMethod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._getDriveLogSnapshotMethod = componentMethods.filter(function (method) { return method.browseName == driveLogDataProvider_1.DriveLogDataProvider.getDriveLogSnapshotMethodName; })[0];
                            getDriveLogConfigInfoMethod = componentMethods.filter(function (method) { return method.browseName == driveLogDataProvider_1.DriveLogDataProvider.getDriveLogConfigInfoMethodName; })[0];
                            if (!(this._getDriveLogSnapshotMethod != undefined)) return [3 /*break*/, 2];
                            // update the methods input parameters
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(this._getDriveLogSnapshotMethod)];
                        case 1:
                            // update the methods input parameters
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(getDriveLogConfigInfoMethod != undefined)) return [3 /*break*/, 4];
                            // update the methods input parameters
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(getDriveLogConfigInfoMethod)];
                        case 3:
                            // update the methods input parameters
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Active the widget
         *
         * @memberof ToolsOverviewWidget
         */
        ToolsOverviewWidget.prototype.activate = function () {
            this.updateToolsOverviewData();
        };
        ToolsOverviewWidget.prototype.updateToolsOverviewData = function () {
            var dataSource = new Array();
            // TODO: get tools from a tools provider
            var networkCommandTraceTool = { displayName: this._networkCommandTraceToolName };
            dataSource.push(networkCommandTraceTool);
            $(this.mainDiv).ejTreeGrid({
                dataSource: dataSource,
            });
        };
        /**
         * Retruns the column definition for this tree grid widget
         *
         * @protected
         * @returns {{}}
         * @memberof ToolsOverviewWidget
         */
        ToolsOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: ToolsOverviewWidget.columnName, width: "350" },
                    { field: "commandButtons", headerText: ToolsOverviewWidget.columnExecuteCommand },
                ],
            };
        };
        ToolsOverviewWidget.prototype.getCommandIdsFromItem = function (item) {
            var component = item;
            var availableViews = new Array();
            availableViews.push(viewTypeProvider_1.ViewType.Open);
            /* Uncomment for switching back to export INSTEAD of Open */
            //availableViews.push(ViewType.Export);
            return availableViews;
        };
        ToolsOverviewWidget.prototype.getDefaultCommandFromComponent = function (component) {
            // TODO get default view from component
            return viewTypeProvider_1.ViewType.Open;
            /* Uncomment for switching back to export INSTEAD of Open */
            //return ViewType.Export;
        };
        ToolsOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewType[commandId];
        };
        ToolsOverviewWidget.prototype.getIconForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewTypeProvider.getInstance().getIconClassByViewType(commandId);
        };
        ToolsOverviewWidget.prototype.click = function (item, commandId) {
            this.onExecuteToolCommand(item.displayName, commandId);
        };
        ToolsOverviewWidget.prototype.doubleClick = function (args) {
            if (args.columnName == ToolsOverviewWidget.columnName && args.model.selectedItem != undefined) {
                var component = args.model.selectedItem.item;
                var defaultToolCommand = this.getDefaultCommandFromComponent(component);
                this.onExecuteToolCommand(args.model.selectedItem.displayName, defaultToolCommand);
            }
        };
        ToolsOverviewWidget.prototype.onExecuteToolCommand = function (toolName, command) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.info("Command '" + this.getNameForCommandId(command.toString()) + "' from tool '" + toolName + "' executed!");
                            if (!(toolName == this._networkCommandTraceToolName)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.executeNetworkCommandTraceCommand(command)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ToolsOverviewWidget.prototype.executeNetworkCommandTraceCommand = function (command) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(command == viewTypeProvider_1.ViewType.Open)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.openNetworkCommandTrace(command)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ToolsOverviewWidget.prototype.openNetworkCommandTrace = function (command) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this._getDriveLogSnapshotMethod == undefined) { // was not set at startup, maybe not ready
                        // Update _getNwCmdTraceData if possible
                        console.error("Open tool not possible, because component not available at startup!");
                    }
                    else {
                        this.onOpenView(this._getDriveLogSnapshotMethod.component, command);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /* Uncomment for switching back to export INSTEAD of Open */
        /*private async exportNetworkCommandtrace(){
            let nwctProvider = new DriveLogDataProvider(this._mcAcpDrvComponent);
            nwctProvider.exportUploadNetworkCommandTrace();
        }*/
        ToolsOverviewWidget.prototype.onOpenView = function (component, openViewType) {
            var eventArgs = new eventOpenViewArgs_1.EventOpenViewArgs(this, component, openViewType);
            this.eventOpenView.raise(null, eventArgs);
        };
        ToolsOverviewWidget.columnName = "Name";
        ToolsOverviewWidget.columnExecuteCommand = "Shortcuts";
        return ToolsOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.ToolsOverviewWidget = ToolsOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHNPdmVydmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90b29sc092ZXJ2aWV3V2lkZ2V0L3Rvb2xzT3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7OztPQU1HO0lBQ0g7UUFBa0MsdUNBQTBCO1FBQTVEO1lBQUEscUVBOEtDO1lBNUtHLG1CQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUs1QixpQkFBVyxHQUEyQyxtQkFBUSxDQUFDLE1BQU0sQ0FBOEIsRUFBRSxDQUFDLENBQUM7WUFNdkcsa0NBQTRCLEdBQUcsdUJBQXVCLENBQUM7WUFFdkQscUJBQWUsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxtQ0FBbUMsQ0FBQzs7UUErSjFILENBQUM7UUEzSmEsMkNBQWEsR0FBdkI7WUFDSSxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFRCxzQkFBVywyQ0FBVTtpQkFBckIsVUFBc0IsVUFBa0Q7Z0JBQXhFLGlCQWNDO2dCQWJHLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUU5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsU0FBUyxJQUFLLE9BQU8sU0FBUyxDQUFDLFVBQVUsSUFBSSwrQkFBYyxDQUFDLHFCQUFxQixDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hKLElBQUcsSUFBSSxDQUFDLGtCQUFr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a0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRvb2xzT3ZlcnZpZXdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3Rvb2xzT3ZlcnZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudE9wZW5WaWV3QXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRPcGVuVmlld0FyZ3NcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50LCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5cclxuaW1wb3J0IHsgVmlld1R5cGUsIFZpZXdUeXBlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRHJpdmVMb2dEYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vbG9nZ2VyV2lkZ2V0L2RyaXZlTG9nL2RyaXZlTG9nRGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IExvZ2dlclByb3ZpZGVyIH0gZnJvbSBcIi4uL2xvZ2dlcldpZGdldC9sb2dnZXJQcm92aWRlclwiO1xyXG5cclxuY2xhc3MgRXZlbnRPcGVuVmlldyBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnRPcGVuVmlld0FyZ3M+eyB9O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRvb2xzT3ZlcnZpZXdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRvb2xzT3ZlcnZpZXdXaWRnZXRcclxuICogQGV4dGVuZHMge092ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SVRvb2xzT3ZlcnZpZXdXaWRnZXR9XHJcbiAqL1xyXG5jbGFzcyBUb29sc092ZXJ2aWV3V2lkZ2V0IGV4dGVuZHMgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVG9vbHNPdmVydmlld1dpZGdldCB7XHJcblxyXG4gICAgZXZlbnRPcGVuVmlldyA9IG5ldyBFdmVudE9wZW5WaWV3KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5OYW1lID0gXCJOYW1lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbHVtbkV4ZWN1dGVDb21tYW5kID0gXCJTaG9ydGN1dHNcIjtcclxuXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOiAgUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdKTtcclxuXHJcbiAgICBwcml2YXRlIF9kcml2ZUxvZ0NvbXBvbmVudCE6IE1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG5cclxuICAgIHByaXZhdGUgX2dldERyaXZlTG9nU25hcHNob3RNZXRob2QhOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZDtcclxuXHJcbiAgICBwcml2YXRlIF9uZXR3b3JrQ29tbWFuZFRyYWNlVG9vbE5hbWUgPSBcIm1hcHAgTW90aW9uIERyaXZlIExvZ1wiO1xyXG5cclxuICAgIHByaXZhdGUgX2ltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwidG9vbHNPdmVydmlld1dpZGdldC9zdHlsZS9pbWFnZXMvXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBud2N0QmluUGFyc2VyOyAvLyBnZXREYXRhIGRpcmVjdGx5IGluIG5ldHdvcmtDb21tYW5kVHJhY2UgPT4gbWV0aG9kIGZvciBnZXR0aW5nIGRhdGEgaW4gYmFzZSBjbGFzc1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJUb29scyBPdmVydmlld1wiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29tcG9uZW50cyhjb21wb25lbnRzIDogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+Pikge1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBjb21wb25lbnRzO1xyXG5cclxuICAgICAgICB0aGlzLl9kcml2ZUxvZ0NvbXBvbmVudCA9IHRoaXMuX2NvbXBvbmVudHMudmFsdWUuZmlsdGVyKGNvbXBvbmVudCA9PiB7cmV0dXJuIGNvbXBvbmVudC5icm93c2VOYW1lID09IExvZ2dlclByb3ZpZGVyLmRyaXZlTG9nQ29tcG9uZW50TmFtZTt9KVswXTtcclxuICAgICAgICBpZih0aGlzLl9kcml2ZUxvZ0NvbXBvbmVudCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2RyaXZlTG9nQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gXCJEcml2ZSBMb2dcIjtcclxuICAgICAgICB0aGlzLl9kcml2ZUxvZ0NvbXBvbmVudC5jb21tYW5kQ29ubmVjdENvbXBvbmVudC5leGVjdXRlKG51bGwsKHJlc3VsdCkgPT57XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RzID0gdGhpcy5fZHJpdmVMb2dDb21wb25lbnQubWV0aG9kcztcclxuICAgICAgICAgICAgaWYgKG1ldGhvZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBvbmVudE1ldGhvZHNVcGRhdGVkKG1ldGhvZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29tcG9uZW50IG1ldGhvZHMgaGF2ZSBiZWVuIHVwZGF0ZWQgLi4uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAbWVtYmVyb2YgVG9vbHNPdmVydmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhc3luYyBvbkNvbXBvbmVudE1ldGhvZHNVcGRhdGVkKGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pIHtcclxuICAgICAgICB0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90TWV0aG9kID0gY29tcG9uZW50TWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IHtyZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gRHJpdmVMb2dEYXRhUHJvdmlkZXIuZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZE5hbWV9KVswXTtcclxuICAgICAgICBsZXQgZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kID0gY29tcG9uZW50TWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IHtyZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gRHJpdmVMb2dEYXRhUHJvdmlkZXIuZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kTmFtZX0pWzBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2dldERyaXZlTG9nU25hcHNob3RNZXRob2QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QudXBkYXRlSW5wdXRQYXJhbWV0ZXJzKHRoaXMuX2dldERyaXZlTG9nU25hcHNob3RNZXRob2QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgbWV0aG9kcyBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIGF3YWl0IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLnVwZGF0ZUlucHV0UGFyYW1ldGVycyhnZXREcml2ZUxvZ0NvbmZpZ0luZm9NZXRob2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRvb2xzT3ZlcnZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xzT3ZlcnZpZXdEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sc092ZXJ2aWV3RGF0YSgpIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IG5ldyBBcnJheSgpOyAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIFRPRE86IGdldCB0b29scyBmcm9tIGEgdG9vbHMgcHJvdmlkZXJcclxuICAgICAgICBsZXQgbmV0d29ya0NvbW1hbmRUcmFjZVRvb2wgPSB7IGRpc3BsYXlOYW1lOiB0aGlzLl9uZXR3b3JrQ29tbWFuZFRyYWNlVG9vbE5hbWV9O1xyXG4gICAgICAgIGRhdGFTb3VyY2UucHVzaChuZXR3b3JrQ29tbWFuZFRyYWNlVG9vbCk7XHJcblxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogZGF0YVNvdXJjZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJ1bnMgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGZvciB0aGlzIHRyZWUgZ3JpZCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVG9vbHNPdmVydmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogVG9vbHNPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lLCB3aWR0aDogXCIzNTBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21tYW5kQnV0dG9uc1wiLCBoZWFkZXJUZXh0OiBUb29sc092ZXJ2aWV3V2lkZ2V0LmNvbHVtbkV4ZWN1dGVDb21tYW5kIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGl0ZW0pOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGxldCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50ID0gaXRlbTtcclxuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVZpZXdzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgYXZhaWxhYmxlVmlld3MucHVzaChWaWV3VHlwZS5PcGVuKTtcclxuICAgICAgICAvKiBVbmNvbW1lbnQgZm9yIHN3aXRjaGluZyBiYWNrIHRvIGV4cG9ydCBJTlNURUFEIG9mIE9wZW4gKi9cclxuICAgICAgICAvL2F2YWlsYWJsZVZpZXdzLnB1c2goVmlld1R5cGUuRXhwb3J0KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlVmlld3M7XHJcbiAgICB9ICBcclxuXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRDb21tYW5kRnJvbUNvbXBvbmVudChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogVmlld1R5cGV7XHJcbiAgICAgICAgLy8gVE9ETyBnZXQgZGVmYXVsdCB2aWV3IGZyb20gY29tcG9uZW50XHJcbiAgICAgICByZXR1cm4gVmlld1R5cGUuT3BlbjtcclxuICAgICAgIC8qIFVuY29tbWVudCBmb3Igc3dpdGNoaW5nIGJhY2sgdG8gZXhwb3J0IElOU1RFQUQgb2YgT3BlbiAqL1xyXG4gICAgICAgLy9yZXR1cm4gVmlld1R5cGUuRXhwb3J0O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBWaWV3VHlwZVtjb21tYW5kSWRdO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRJY29uRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVmlld1R5cGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEljb25DbGFzc0J5Vmlld1R5cGUoPFZpZXdUeXBlPjxhbnk+Y29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2xpY2soaXRlbSwgY29tbWFuZElkKXtcclxuICAgICAgICB0aGlzLm9uRXhlY3V0ZVRvb2xDb21tYW5kKGl0ZW0uZGlzcGxheU5hbWUsIGNvbW1hbmRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRvdWJsZUNsaWNrKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uTmFtZSA9PSBUb29sc092ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUgJiYgYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQgPSBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbS5pdGVtO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFRvb2xDb21tYW5kID0gdGhpcy5nZXREZWZhdWx0Q29tbWFuZEZyb21Db21wb25lbnQoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgdGhpcy5vbkV4ZWN1dGVUb29sQ29tbWFuZChhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbS5kaXNwbGF5TmFtZSwgZGVmYXVsdFRvb2xDb21tYW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBvbkV4ZWN1dGVUb29sQ29tbWFuZCh0b29sTmFtZTogc3RyaW5nLCBjb21tYW5kOiBWaWV3VHlwZSkge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIkNvbW1hbmQgJ1wiICsgdGhpcy5nZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmQudG9TdHJpbmcoKSkgKyBcIicgZnJvbSB0b29sICdcIiArIHRvb2xOYW1lICsgXCInIGV4ZWN1dGVkIVwiKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0b29sTmFtZSA9PSB0aGlzLl9uZXR3b3JrQ29tbWFuZFRyYWNlVG9vbE5hbWUpe1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVOZXR3b3JrQ29tbWFuZFRyYWNlQ29tbWFuZChjb21tYW5kKTtcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBleGVjdXRlTmV0d29ya0NvbW1hbmRUcmFjZUNvbW1hbmQoY29tbWFuZDogVmlld1R5cGUpe1xyXG4gICAgICAgIGlmKGNvbW1hbmQgPT0gVmlld1R5cGUuT3Blbikge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLm9wZW5OZXR3b3JrQ29tbWFuZFRyYWNlKGNvbW1hbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBVbmNvbW1lbnQgZm9yIHN3aXRjaGluZyBiYWNrIHRvIGV4cG9ydCBJTlNURUFEIG9mIE9wZW4gKi9cclxuICAgICAgICAvKmlmKGNvbW1hbmQgPT0gVmlld1R5cGUuRXhwb3J0KSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZXhwb3J0TmV0d29ya0NvbW1hbmR0cmFjZSgpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgb3Blbk5ldHdvcmtDb21tYW5kVHJhY2UoY29tbWFuZDogVmlld1R5cGUpe1xyXG4gICAgICAgIGlmKHRoaXMuX2dldERyaXZlTG9nU25hcHNob3RNZXRob2QgPT0gdW5kZWZpbmVkKXsgLy8gd2FzIG5vdCBzZXQgYXQgc3RhcnR1cCwgbWF5YmUgbm90IHJlYWR5XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBfZ2V0TndDbWRUcmFjZURhdGEgaWYgcG9zc2libGVcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk9wZW4gdG9vbCBub3QgcG9zc2libGUsIGJlY2F1c2UgY29tcG9uZW50IG5vdCBhdmFpbGFibGUgYXQgc3RhcnR1cCFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5vbk9wZW5WaWV3KHRoaXMuX2dldERyaXZlTG9nU25hcHNob3RNZXRob2QuY29tcG9uZW50IGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50LCBjb21tYW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogVW5jb21tZW50IGZvciBzd2l0Y2hpbmcgYmFjayB0byBleHBvcnQgSU5TVEVBRCBvZiBPcGVuICovXHJcbiAgICAvKnByaXZhdGUgYXN5bmMgZXhwb3J0TmV0d29ya0NvbW1hbmR0cmFjZSgpe1xyXG4gICAgICAgIGxldCBud2N0UHJvdmlkZXIgPSBuZXcgRHJpdmVMb2dEYXRhUHJvdmlkZXIodGhpcy5fbWNBY3BEcnZDb21wb25lbnQpO1xyXG4gICAgICAgIG53Y3RQcm92aWRlci5leHBvcnRVcGxvYWROZXR3b3JrQ29tbWFuZFRyYWNlKCk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBwcml2YXRlIG9uT3BlblZpZXcoY29tcG9uZW50Ok1hcHBDb2NrcGl0Q29tcG9uZW50LCBvcGVuVmlld1R5cGU6Vmlld1R5cGUpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50T3BlblZpZXdBcmdzKHRoaXMsIGNvbXBvbmVudCwgb3BlblZpZXdUeXBlKVxyXG4gICAgICAgIHRoaXMuZXZlbnRPcGVuVmlldy5yYWlzZShudWxsLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUb29sc092ZXJ2aWV3V2lkZ2V0IH07Il19
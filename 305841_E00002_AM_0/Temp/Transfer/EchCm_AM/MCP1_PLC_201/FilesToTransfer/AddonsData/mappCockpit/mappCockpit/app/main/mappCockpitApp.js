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
define(["require", "exports", "../framework/events", "../common/directoryProvider", "../framework/appConsole", "../debug/diagnostics", "../common/mappCockpitConfig", "../common/componentFactory/componentFactory", "../common/componentFactory/componentDefinition", "../common/persistence/persistDataController"], function (require, exports, events_1, directoryProvider_1, appConsole_1, diagnostics_1, mappCockpitConfig_1, componentFactory_1, componentDefinition_1, persistDataController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Declares Event-AppInitialized
    var EventAppInitialized = /** @class */ (function (_super) {
        __extends(EventAppInitialized, _super);
        function EventAppInitialized() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventAppInitialized;
    }(events_1.TypedEvent));
    ;
    // Boot container definition
    var bootContentId = "mappCockpitContent";
    var mainPaneId = "mappCockpitMainPane";
    var bootContent = "<div id=" + bootContentId + ' style="overflow:hidden"></div>';
    /**
     * The class represents the application main class.
     *
     * @class MappCockpitApp
     */
    var MappCockpitApp = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitApp.
         * @memberof MappCockpitApp
         */
        function MappCockpitApp() {
            // Events
            this.eventAppInitialized = new EventAppInitialized();
        }
        /**
         * Creates an AppConsole instance
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.createAppConsole = function () {
            if (!MappCockpitApp.cxcoDebug) {
                // in release mode we override the standard console
                appConsole_1.AppConsole.create();
            }
            // ....otherwise the standard console keeps alive...
        };
        /**
         * Creates and initializes the mapp cockpit app.
         *
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.create = function () {
            var _this = this;
            var initCommands = window.location.search.substring(1);
            if (initCommands.indexOf("CLEAR") > -1 || initCommands.indexOf("clear") > -1) {
                var persistingDataController_1 = new persistDataController_1.PersistDataController(undefined);
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, persistingDataController_1.clearDefaultStorage()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            if (this.mode == "cxcoDbg") {
                this.loadApp();
            }
            else {
                if (initCommands.indexOf("DEBUG") > -1) {
                    var cxcoDbg = window.prompt("Enter debug password !");
                    if (cxcoDbg == "cxcoDbg") {
                        document.write(diagnostics_1.Diagnostics.DEBUG);
                    }
                    else {
                        this.createAppConsole();
                        this.loadApp();
                    }
                }
                else {
                    this.createAppConsole();
                    this.loadApp();
                }
            }
        };
        MappCockpitApp.prototype.loadApp = function () {
            this.attachUnloadHandler();
            this.loadAppConfiguration();
        };
        /**
         * Loads application configuration settings
         *
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.loadAppConfiguration = function () {
            var _this = this;
            var cfgFile = "../../../" + directoryProvider_1.DirectoryProvider.getAppDirectory() + "common/mappCockpitConfigSettings.json";
            $.getJSON(cfgFile, function (appCfg) { _this.onAppSettingsLoaded(appCfg); });
        };
        /**
         * Called after the app settings have been loaded
         *
         * @private
         * @param {*} appCfg
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.onAppSettingsLoaded = function (appCfg) {
            // load and update application settings
            mappCockpitConfig_1.MappCockpitConfiguration.initialize(appCfg);
            // boot the application
            this.loadBootContent();
        };
        /**
         * Loads the main content
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.loadBootContent = function () {
            var _this = this;
            // Get the page body
            var pageBody = $("body");
            // ... append the main content div
            var $bootContent = $(bootContent);
            $bootContent[0].style.height = (window.innerHeight).toString() + 'px';
            var uniqueResizeId = 123;
            $(window).resize(function (args) {
                $bootContent[0].style.height = (window.innerHeight).toString() + 'px';
                clearTimeout(uniqueResizeId);
                uniqueResizeId = setTimeout(function () { return _this.doneResizing(args); }, 500);
            });
            pageBody.append($bootContent);
            // Load the main content into the main div
            $bootContent.load("../../../" + directoryProvider_1.DirectoryProvider.getAppDirectory() + "layout/mappCockpitMain.html", function () { _this.onBootContentLoaded(pageBody); });
        };
        MappCockpitApp.prototype.doneResizing = function (args) {
            if (this._mappCockpitWidget != undefined) {
                this._mappCockpitWidget.resize(window.innerWidth, window.innerHeight);
            }
        };
        /**
         * Handler called after loading the main content file.
         *
         * @private
         * @param {JQuery} contentContainer
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.onBootContentLoaded = function (contentContainer) {
            return __awaiter(this, void 0, void 0, function () {
                var mainLayoutPane;
                var _this = this;
                return __generator(this, function (_a) {
                    mainLayoutPane = $("#" + mainPaneId);
                    // Check if the boot div exists 
                    if (mainLayoutPane.length) {
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.createMappCockpitWidget()];
                                case 1:
                                    _a.sent();
                                    this.onAppInitialized();
                                    return [2 /*return*/];
                            }
                        }); }); })();
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * creates the mapp cockpit widget
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.createMappCockpitWidget = function () {
            this._mappCockpitWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("MappCockpitWidget", "MappCockpitWidget"), undefined);
            if (this._mappCockpitWidget != undefined) {
                this._mappCockpitWidget.initialize();
                // add widget to the parent container
                this._mappCockpitWidget.addToParentContainerId(mainPaneId);
                this._mappCockpitWidget.resize(window.innerWidth, window.innerHeight);
            }
        };
        /**
         * Notifies that the app has been initialized
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.onAppInitialized = function () {
            console.log("App Initialized");
            this.eventAppInitialized.raise(this, null);
        };
        /**
         *
         * attaches a handler for unloading mapp cockpit
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.attachUnloadHandler = function () {
            var _this = this;
            window.onbeforeunload = function (e) { _this.handleUnload(e); };
        };
        /**
         * handles unloading mapp cockpit....releasing resources, disconnecting ...
         *
         * @param {BeforeUnloadEvent} e
         * @returns {*}
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.handleUnload = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this._mappCockpitWidget != undefined) {
                        this._mappCockpitWidget.dataModel.dispose();
                        this._mappCockpitWidget.dispose();
                    }
                    console.log("MappCockpitApp: unloading ....");
                    return [2 /*return*/];
                });
            });
        };
        return MappCockpitApp;
    }());
    exports.MappCockpitApp = MappCockpitApp;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRBcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL21haW4vbWFwcENvY2twaXRBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlBLGdDQUFnQztJQUNoQztRQUFrQyx1Q0FBZ0M7UUFBbEU7O1FBQW9FLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBckUsQ0FBa0MsbUJBQVUsR0FBeUI7SUFBQSxDQUFDO0lBRXRFLDRCQUE0QjtJQUM1QixJQUFNLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztJQUMzQyxJQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUN6QyxJQUFNLFdBQVcsR0FBRyxVQUFVLEdBQUcsYUFBYSxHQUFHLGlDQUFpQyxDQUFDO0lBRW5GOzs7O09BSUc7SUFDSDtRQU1JOzs7V0FHRztRQUNIO1lBUkEsU0FBUztZQUNULHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQVFoRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5Q0FBZ0IsR0FBeEI7WUFDSSxJQUFJLENBQU8sY0FBZSxDQUFDLFNBQVMsRUFBRTtnQkFDbEMsbURBQW1EO2dCQUNuRCx1QkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3ZCO1lBQ0Qsb0RBQW9EO1FBQ3hELENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsK0JBQU0sR0FBTjtZQUFBLGlCQTRCQztZQTNCRyxJQUFJLFlBQVksR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFFLElB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QyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekU7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5Q0FBZ0IsR0FBeEI7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7WUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssNENBQW1CLEdBQTNCO1lBQUEsaUJBRUM7WUFERyxNQUFNLENBQUMsY0FBYyxHQUFHLFVBQUMsQ0FBQyxJQUFNLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNHLHFDQUFZLEdBQWxCLFVBQW1CLENBQW9COzs7b0JBQ25DLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLFNBQVMsRUFBRTt3QkFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUVyQztvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Ozs7U0FFakQ7UUFDTCxxQkFBQztJQUFELENBQUMsQUFwTUQsSUFvTUM7SUFFUSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBDb21tb25MaWJzID0gcmVxdWlyZSgnLi4vbGlicy9jb21tb24nKTtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQXBwQ29uc29sZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYXBwQ29uc29sZVwiO1xyXG5pbXBvcnQgeyBEaWFnbm9zdGljcyB9IGZyb20gXCIuLi9kZWJ1Zy9kaWFnbm9zdGljc1wiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL21hcHBDb2NrcGl0Q29uZmlnXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFDb250cm9sbGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi93aWRnZXRzL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5cclxuLy8gRGVjbGFyZXMgRXZlbnQtQXBwSW5pdGlhbGl6ZWRcclxuY2xhc3MgRXZlbnRBcHBJbml0aWFsaXplZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRBcHAsIG51bGw+eyB9O1xyXG5cclxuLy8gQm9vdCBjb250YWluZXIgZGVmaW5pdGlvblxyXG5jb25zdCBib290Q29udGVudElkID0gXCJtYXBwQ29ja3BpdENvbnRlbnRcIjtcclxuY29uc3QgbWFpblBhbmVJZCA9IFwibWFwcENvY2twaXRNYWluUGFuZVwiO1xyXG5jb25zdCBib290Q29udGVudCA9IFwiPGRpdiBpZD1cIiArIGJvb3RDb250ZW50SWQgKyAnIHN0eWxlPVwib3ZlcmZsb3c6aGlkZGVuXCI+PC9kaXY+JztcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgcmVwcmVzZW50cyB0aGUgYXBwbGljYXRpb24gbWFpbiBjbGFzcy5cclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0QXBwXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdEFwcCB7XHJcblxyXG4gICAgLy8gRXZlbnRzXHJcbiAgICBldmVudEFwcEluaXRpYWxpemVkID0gbmV3IEV2ZW50QXBwSW5pdGlhbGl6ZWQoKTtcclxuICAgIHByaXZhdGUgX21hcHBDb2NrcGl0V2lkZ2V0OiBJV2lkZ2V0fHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXRBcHAuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIEFwcENvbnNvbGUgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQXBwQ29uc29sZSgpIHtcclxuICAgICAgICBpZiAoISg8YW55Pk1hcHBDb2NrcGl0QXBwKS5jeGNvRGVidWcpIHtcclxuICAgICAgICAgICAgLy8gaW4gcmVsZWFzZSBtb2RlIHdlIG92ZXJyaWRlIHRoZSBzdGFuZGFyZCBjb25zb2xlXHJcbiAgICAgICAgICAgIEFwcENvbnNvbGUuY3JlYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC4uLi5vdGhlcndpc2UgdGhlIHN0YW5kYXJkIGNvbnNvbGUga2VlcHMgYWxpdmUuLi5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSBtYXBwIGNvY2twaXQgYXBwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBjcmVhdGUoKSB7XHJcbiAgICAgICAgdmFyIGluaXRDb21tYW5kczogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgaWYgKGluaXRDb21tYW5kcy5pbmRleE9mKFwiQ0xFQVJcIikgPiAtMSB8fCBpbml0Q29tbWFuZHMuaW5kZXhPZihcImNsZWFyXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgbGV0IHBlcnNpc3RpbmdEYXRhQ29udHJvbGxlciA9IG5ldyBQZXJzaXN0RGF0YUNvbnRyb2xsZXIodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBwZXJzaXN0aW5nRGF0YUNvbnRyb2xsZXIuY2xlYXJEZWZhdWx0U3RvcmFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoPGFueT50aGlzKS5tb2RlID09IFwiY3hjb0RiZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEFwcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChpbml0Q29tbWFuZHMuaW5kZXhPZihcIkRFQlVHXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjeGNvRGJnID0gd2luZG93LnByb21wdChcIkVudGVyIGRlYnVnIHBhc3N3b3JkICFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3hjb0RiZyA9PSBcImN4Y29EYmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LndyaXRlKERpYWdub3N0aWNzLkRFQlVHKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBcHBDb25zb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQXBwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcENvbnNvbGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFwcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRBcHAoKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hVbmxvYWRIYW5kbGVyKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkQXBwQ29uZmlndXJhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBsb2FkQXBwQ29uZmlndXJhdGlvbigpIHtcclxuICAgICAgICBsZXQgY2ZnRmlsZSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRBcHBEaXJlY3RvcnkoKSArIFwiY29tbW9uL21hcHBDb2NrcGl0Q29uZmlnU2V0dGluZ3MuanNvblwiO1xyXG4gICAgICAgICQuZ2V0SlNPTihjZmdGaWxlLCAoYXBwQ2ZnKSA9PiB7IHRoaXMub25BcHBTZXR0aW5nc0xvYWRlZChhcHBDZmcpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgYXBwIHNldHRpbmdzIGhhdmUgYmVlbiBsb2FkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcHBDZmdcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQXBwU2V0dGluZ3NMb2FkZWQoYXBwQ2ZnOiBhbnkpIHtcclxuXHJcbiAgICAgICAgLy8gbG9hZCBhbmQgdXBkYXRlIGFwcGxpY2F0aW9uIHNldHRpbmdzXHJcbiAgICAgICAgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLmluaXRpYWxpemUoYXBwQ2ZnKTtcclxuXHJcbiAgICAgICAgLy8gYm9vdCB0aGUgYXBwbGljYXRpb25cclxuICAgICAgICB0aGlzLmxvYWRCb290Q29udGVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIG1haW4gY29udGVudCBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZEJvb3RDb250ZW50KCkge1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIHBhZ2UgYm9keVxyXG4gICAgICAgIHZhciBwYWdlQm9keSA9ICQoXCJib2R5XCIpO1xyXG4gICAgICAgIC8vIC4uLiBhcHBlbmQgdGhlIG1haW4gY29udGVudCBkaXZcclxuICAgICAgICB2YXIgJGJvb3RDb250ZW50ID0gJChib290Q29udGVudCk7XHJcbiAgICAgICAgJGJvb3RDb250ZW50WzBdLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQhKS50b1N0cmluZygpICsgJ3B4JztcclxuICAgICAgICB2YXIgdW5pcXVlUmVzaXplSWQgPSAxMjM7XHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZSgoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAkYm9vdENvbnRlbnRbMF0uc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCEpLnRvU3RyaW5nKCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHVuaXF1ZVJlc2l6ZUlkKTtcclxuICAgICAgICAgICAgdW5pcXVlUmVzaXplSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZG9uZVJlc2l6aW5nKGFyZ3MpLCA1MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhZ2VCb2R5LmFwcGVuZCgkYm9vdENvbnRlbnQpO1xyXG5cclxuICAgICAgICAvLyBMb2FkIHRoZSBtYWluIGNvbnRlbnQgaW50byB0aGUgbWFpbiBkaXZcclxuICAgICAgICAkYm9vdENvbnRlbnQubG9hZChcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0QXBwRGlyZWN0b3J5KCkgKyBcImxheW91dC9tYXBwQ29ja3BpdE1haW4uaHRtbFwiLCAoKSA9PiB7IHRoaXMub25Cb290Q29udGVudExvYWRlZChwYWdlQm9keSk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG9uZVJlc2l6aW5nKGFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwcENvY2twaXRXaWRnZXQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0LnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVyIGNhbGxlZCBhZnRlciBsb2FkaW5nIHRoZSBtYWluIGNvbnRlbnQgZmlsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtKUXVlcnl9IGNvbnRlbnRDb250YWluZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIG9uQm9vdENvbnRlbnRMb2FkZWQoY29udGVudENvbnRhaW5lcjogSlF1ZXJ5KSB7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgbWFpbiBkaXZcclxuICAgICAgICB2YXIgbWFpbkxheW91dFBhbmUgPSAkKFwiI1wiICsgbWFpblBhbmVJZCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBib290IGRpdiBleGlzdHMgXHJcbiAgICAgICAgaWYgKG1haW5MYXlvdXRQYW5lLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAoYXN5bmMgKCkgPT4geyBhd2FpdCB0aGlzLmNyZWF0ZU1hcHBDb2NrcGl0V2lkZ2V0KCk7IHRoaXMub25BcHBJbml0aWFsaXplZCgpOyB9KSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIG1hcHAgY29ja3BpdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlTWFwcENvY2twaXRXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwcENvY2twaXRXaWRnZXQgPSBDb21wb25lbnRGYWN0b3J5LmdldEluc3RhbmNlKCkuY3JlYXRlKG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiTWFwcENvY2twaXRXaWRnZXRcIiwgXCJNYXBwQ29ja3BpdFdpZGdldFwiKSwgdW5kZWZpbmVkKSBhcyBJV2lkZ2V0O1xyXG4gICAgICAgIGlmKHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0LmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcklkKG1haW5QYW5lSWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm90aWZpZXMgdGhhdCB0aGUgYXBwIGhhcyBiZWVuIGluaXRpYWxpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQXBwSW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBcHAgSW5pdGlhbGl6ZWRcIilcclxuICAgICAgICB0aGlzLmV2ZW50QXBwSW5pdGlhbGl6ZWQucmFpc2UodGhpcywgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogYXR0YWNoZXMgYSBoYW5kbGVyIGZvciB1bmxvYWRpbmcgbWFwcCBjb2NrcGl0XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoVW5sb2FkSGFuZGxlcigpIHtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSAoZSkgPT4ge3RoaXMuaGFuZGxlVW5sb2FkKGUpOyB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB1bmxvYWRpbmcgbWFwcCBjb2NrcGl0Li4uLnJlbGVhc2luZyByZXNvdXJjZXMsIGRpc2Nvbm5lY3RpbmcgLi4uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCZWZvcmVVbmxvYWRFdmVudH0gZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgYXN5bmMgaGFuZGxlVW5sb2FkKGU6IEJlZm9yZVVubG9hZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0QXBwOiB1bmxvYWRpbmcgLi4uLlwiKTtcclxuICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0QXBwIH07XHJcbiJdfQ==
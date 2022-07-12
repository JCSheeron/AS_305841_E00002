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
define(["require", "exports", "../componentFactory/componentFactory", "../componentFactory/componentDefinition", "../../services/appServices", "../textProvider/textFormatter/formatterInputArguments/formatterInputArgumentList", "../textProvider/textFormatter/formatterInputArguments/formatterInputArgumentString", "../textProvider/textFormatter/formatterInputArguments/formatterInputArgumentFloat", "../../framework/events", "../textProvider/textFormatter/formatterInputArguments/formatterInputArgumentInt"], function (require, exports, componentFactory_1, componentDefinition_1, appServices_1, formatterInputArgumentList_1, formatterInputArgumentString_1, formatterInputArgumentFloat_1, events_1, formatterInputArgumentInt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NamespacesLoaded = /** @class */ (function (_super) {
        __extends(NamespacesLoaded, _super);
        function NamespacesLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NamespacesLoaded;
    }(events_1.TypedEvent));
    ;
    var NwctTextProvider = /** @class */ (function () {
        function NwctTextProvider() {
            var _this = this;
            /**
             * Handler for uploadedNamespacesFinished event
             *
             * @private
             * @memberof NwctTextProvider
             */
            this._uploadedNamespacesFinishedHandler = function (sender, args) { return _this.onUploadedNamespacesFinished(sender, args); };
            /**
             * NamespaceLoaded event will be raise after loading some namespaces
             *
             * @memberof NwctTextProvider
             */
            this.eventNamespacesLoaded = new NamespacesLoaded();
        }
        /**
         * loads the namespaces for the given namespace names
         *
         * @param {Array<string>} namespaceNames
         * @memberof NwctTextProvider
         */
        NwctTextProvider.prototype.loadNamespaces = function (namespaceNames) {
            return __awaiter(this, void 0, void 0, function () {
                var componentFactory, defaultLanguageId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentFactory = componentFactory_1.ComponentFactory.getInstance();
                            this._textProvider = componentFactory.create(new componentDefinition_1.ComponentDefinition("TextProvider", "TextProvider", "textProviderDefinition"), undefined);
                            return [4 /*yield*/, appServices_1.Services.textSystem.getDefaultLanguage()];
                        case 1:
                            defaultLanguageId = _a.sent();
                            this._textProvider.setSelectedLanguage(defaultLanguageId);
                            // Listen to namespaceLoaded event
                            this._textProvider.eventNamespacesLoaded.attach(this._uploadedNamespacesFinishedHandler);
                            // Load namespaces
                            this._textProvider.loadFullNamespacesRequest(namespaceNames);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Raises the eventNamespaceLoaded when the loading of namespaces is finished
         *
         * @private
         * @param {ITextProvider} sender
         * @param {EventNamespacesLoadedResponse} args
         * @memberof NwctTextProvider
         */
        NwctTextProvider.prototype.onUploadedNamespacesFinished = function (sender, args) {
            sender.eventNamespacesLoaded.detach(this._uploadedNamespacesFinishedHandler);
            if (args.errors.length !== 0) {
                // react to not all namespaces found
                console.error("Some namespaces could not be found/loaded!");
            }
            this.eventNamespacesLoaded.raise(this, undefined);
        };
        /**
         * Returns the text from the textprovider for the given textId
         *
         * @param {string} textId
         * @param {(string|undefined)} value
         * @param {string} valueType
         * @param {string} unit
         * @returns {string}
         * @memberof NwctTextProvider
         */
        NwctTextProvider.prototype.getFormattedText = function (textId, value, valueType, unit) {
            // is text provider available?
            if (this._textProvider == undefined) {
                console.error("TextProvider not available. No namespaces loaded!");
                return "";
            }
            // Use value as input argument -> convert to correct inputArgument type
            var inputArgs = new formatterInputArgumentList_1.FormatterInputArgumentList();
            if (value != undefined) {
                // Value defined => add unit and value to input arguments
                inputArgs.push(new formatterInputArgumentString_1.FormatterInputArgumentString(unit));
                if (valueType == "") { // "" => string type
                    inputArgs.push(new formatterInputArgumentString_1.FormatterInputArgumentString(value));
                }
                else {
                    var number = Number(value);
                    if (Number.isSafeInteger(number)) {
                        inputArgs.push(new formatterInputArgumentInt_1.FormatterInputArgumentInt(number));
                    }
                    else {
                        inputArgs.push(new formatterInputArgumentFloat_1.FormatterInputArgumentFloat(number));
                    }
                }
            }
            // Returns the formated text
            return this._textProvider.getFormattedText("BR/EventLog", textId.toString(), inputArgs).value;
        };
        return NwctTextProvider;
    }());
    exports.NwctTextProvider = NwctTextProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFRleHRQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9ud2N0VGV4dFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZQTtRQUErQixvQ0FBaUM7UUFBaEU7O1FBQWtFLENBQUM7UUFBRCx1QkFBQztJQUFELENBQUMsQUFBbkUsQ0FBK0IsbUJBQVUsR0FBMEI7SUFBQSxDQUFDO0lBRXBFO1FBQUE7WUFBQSxpQkFzR0M7WUFwR0c7Ozs7O2VBS0c7WUFDSyx1Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUEvQyxDQUErQyxDQUFDO1lBVzdHOzs7O2VBSUc7WUFDSSwwQkFBcUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUE4RTFELENBQUM7UUE1RUc7Ozs7O1dBS0c7UUFDVSx5Q0FBYyxHQUEzQixVQUE0QixjQUE2Qjs7Ozs7OzRCQUVqRCxnQkFBZ0IsR0FBc0IsbUNBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ3pFLElBQUksQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUkseUNBQW1CLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSx3QkFBd0IsQ0FBQyxFQUFFLFNBQVMsQ0FBa0IsQ0FBQzs0QkFHbEkscUJBQU0sc0JBQVEsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs7NEJBQWxFLGlCQUFpQixHQUFHLFNBQThDOzRCQUN4RSxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUM7NEJBRTFELGtDQUFrQzs0QkFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7NEJBRXpGLGtCQUFrQjs0QkFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7Ozs7U0FDaEU7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssdURBQTRCLEdBQXBDLFVBQXFDLE1BQXFCLEVBQUUsSUFBbUM7WUFDM0YsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUM3RSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDekIsb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUE7YUFDOUQ7WUFDRCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0ksMkNBQWdCLEdBQXZCLFVBQXdCLE1BQWMsRUFBRSxLQUF1QixFQUFFLFNBQWlCLEVBQUUsSUFBWTtZQUM1Riw4QkFBOEI7WUFDOUIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBRUQsdUVBQXVFO1lBQ3ZFLElBQUksU0FBUyxHQUFHLElBQUksdURBQTBCLEVBQUUsQ0FBQztZQUNqRCxJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ2xCLHlEQUF5RDtnQkFDekQsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDJEQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELElBQUcsU0FBUyxJQUFJLEVBQUUsRUFBQyxFQUFFLG9CQUFvQjtvQkFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDJEQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQzNEO3FCQUNHO29CQUNBLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsSUFBRyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFDO3dCQUM1QixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUkscURBQXlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDekQ7eUJBQUk7d0JBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLHlEQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQzNEO2lCQUNKO2FBQ0o7WUFDRCw0QkFBNEI7WUFDNUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2xHLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUF0R0QsSUFzR0M7SUF0R1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudEZhY3RvcnlcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgSVRleHRQcm92aWRlciB9IGZyb20gXCIuLi90ZXh0UHJvdmlkZXIvaW50ZXJmYWNlL3RleHRQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJ2aWNlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcHBTZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBFdmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZSB9IGZyb20gXCIuLi90ZXh0UHJvdmlkZXIvZXZlbnROYW1lc3BhY2VzTG9hZGVkUmVzcG9uc2VcIjtcclxuaW1wb3J0IHsgRm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QgfSBmcm9tIFwiLi4vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvZm9ybWF0dGVySW5wdXRBcmd1bWVudHMvZm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3RcIjtcclxuaW1wb3J0IHsgRm9ybWF0dGVySW5wdXRBcmd1bWVudFN0cmluZyB9IGZyb20gXCIuLi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50cy9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nXCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnRGbG9hdCB9IGZyb20gXCIuLi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50cy9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50RmxvYXRcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uL2NvbXBvbmVudEZhY3RvcnkvaW50ZXJmYWNlcy9jb21wb25lbnRGYWN0b3J5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnRJbnQgfSBmcm9tIFwiLi4vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvZm9ybWF0dGVySW5wdXRBcmd1bWVudHMvZm9ybWF0dGVySW5wdXRBcmd1bWVudEludFwiO1xyXG5cclxuY2xhc3MgTmFtZXNwYWNlc0xvYWRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TndjdFRleHRQcm92aWRlciwgYW55PnsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBOd2N0VGV4dFByb3ZpZGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlciBmb3IgdXBsb2FkZWROYW1lc3BhY2VzRmluaXNoZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdXBsb2FkZWROYW1lc3BhY2VzRmluaXNoZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncyk9PnRoaXMub25VcGxvYWRlZE5hbWVzcGFjZXNGaW5pc2hlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHRleHRQcm92aWRlciBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KElUZXh0UHJvdmlkZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0VGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3RleHRQcm92aWRlcjpJVGV4dFByb3ZpZGVyfHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lc3BhY2VMb2FkZWQgZXZlbnQgd2lsbCBiZSByYWlzZSBhZnRlciBsb2FkaW5nIHNvbWUgbmFtZXNwYWNlc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0VGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBldmVudE5hbWVzcGFjZXNMb2FkZWQgPSBuZXcgTmFtZXNwYWNlc0xvYWRlZCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogbG9hZHMgdGhlIG5hbWVzcGFjZXMgZm9yIHRoZSBnaXZlbiBuYW1lc3BhY2UgbmFtZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG5hbWVzcGFjZU5hbWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgbG9hZE5hbWVzcGFjZXMobmFtZXNwYWNlTmFtZXM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICAvLyBnZXQgdGhlIHRleHRQcm92aWRlclxyXG4gICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5OiBJQ29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLl90ZXh0UHJvdmlkZXIgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShuZXcgQ29tcG9uZW50RGVmaW5pdGlvbihcIlRleHRQcm92aWRlclwiLCBcIlRleHRQcm92aWRlclwiLCBcInRleHRQcm92aWRlckRlZmluaXRpb25cIiksIHVuZGVmaW5lZCkgYXMgSVRleHRQcm92aWRlcjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgZGVmYXVsdCBsYW5ndWFnZVxyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRMYW5ndWFnZUlkID0gYXdhaXQgU2VydmljZXMudGV4dFN5c3RlbS5nZXREZWZhdWx0TGFuZ3VhZ2UoKTtcclxuICAgICAgICB0aGlzLl90ZXh0UHJvdmlkZXIuc2V0U2VsZWN0ZWRMYW5ndWFnZShkZWZhdWx0TGFuZ3VhZ2VJZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIExpc3RlbiB0byBuYW1lc3BhY2VMb2FkZWQgZXZlbnRcclxuICAgICAgICB0aGlzLl90ZXh0UHJvdmlkZXIuZXZlbnROYW1lc3BhY2VzTG9hZGVkLmF0dGFjaCh0aGlzLl91cGxvYWRlZE5hbWVzcGFjZXNGaW5pc2hlZEhhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIExvYWQgbmFtZXNwYWNlc1xyXG4gICAgICAgIHRoaXMuX3RleHRQcm92aWRlci5sb2FkRnVsbE5hbWVzcGFjZXNSZXF1ZXN0KG5hbWVzcGFjZU5hbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlcyB0aGUgZXZlbnROYW1lc3BhY2VMb2FkZWQgd2hlbiB0aGUgbG9hZGluZyBvZiBuYW1lc3BhY2VzIGlzIGZpbmlzaGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TmFtZXNwYWNlc0xvYWRlZFJlc3BvbnNlfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVXBsb2FkZWROYW1lc3BhY2VzRmluaXNoZWQoc2VuZGVyOiBJVGV4dFByb3ZpZGVyLCBhcmdzOiBFdmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZSkge1xyXG4gICAgICAgIHNlbmRlci5ldmVudE5hbWVzcGFjZXNMb2FkZWQuZGV0YWNoKHRoaXMuX3VwbG9hZGVkTmFtZXNwYWNlc0ZpbmlzaGVkSGFuZGxlcik7XHJcbiAgICAgICAgaWYoYXJncy5lcnJvcnMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIHJlYWN0IHRvIG5vdCBhbGwgbmFtZXNwYWNlcyBmb3VuZFxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU29tZSBuYW1lc3BhY2VzIGNvdWxkIG5vdCBiZSBmb3VuZC9sb2FkZWQhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnROYW1lc3BhY2VzTG9hZGVkLnJhaXNlKHRoaXMsIHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0ZXh0IGZyb20gdGhlIHRleHRwcm92aWRlciBmb3IgdGhlIGdpdmVuIHRleHRJZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0SWRcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3x1bmRlZmluZWQpfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlVHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Rm9ybWF0dGVkVGV4dCh0ZXh0SWQ6IHN0cmluZywgdmFsdWU6IHN0cmluZ3x1bmRlZmluZWQsIHZhbHVlVHlwZTogc3RyaW5nLCB1bml0OiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgLy8gaXMgdGV4dCBwcm92aWRlciBhdmFpbGFibGU/XHJcbiAgICAgICAgaWYodGhpcy5fdGV4dFByb3ZpZGVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUZXh0UHJvdmlkZXIgbm90IGF2YWlsYWJsZS4gTm8gbmFtZXNwYWNlcyBsb2FkZWQhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVzZSB2YWx1ZSBhcyBpbnB1dCBhcmd1bWVudCAtPiBjb252ZXJ0IHRvIGNvcnJlY3QgaW5wdXRBcmd1bWVudCB0eXBlXHJcbiAgICAgICAgbGV0IGlucHV0QXJncyA9IG5ldyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCgpO1xyXG4gICAgICAgIGlmKHZhbHVlICE9IHVuZGVmaW5lZCl7IFxyXG4gICAgICAgICAgICAvLyBWYWx1ZSBkZWZpbmVkID0+IGFkZCB1bml0IGFuZCB2YWx1ZSB0byBpbnB1dCBhcmd1bWVudHNcclxuICAgICAgICAgICAgaW5wdXRBcmdzLnB1c2gobmV3IEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcodW5pdCkpO1xyXG4gICAgICAgICAgICBpZih2YWx1ZVR5cGUgPT0gXCJcIil7IC8vIFwiXCIgPT4gc3RyaW5nIHR5cGVcclxuICAgICAgICAgICAgICAgIGlucHV0QXJncy5wdXNoKG5ldyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nKHZhbHVlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoTnVtYmVyLmlzU2FmZUludGVnZXIobnVtYmVyKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRBcmdzLnB1c2gobmV3IEZvcm1hdHRlcklucHV0QXJndW1lbnRJbnQobnVtYmVyKSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEFyZ3MucHVzaChuZXcgRm9ybWF0dGVySW5wdXRBcmd1bWVudEZsb2F0KG51bWJlcikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJldHVybnMgdGhlIGZvcm1hdGVkIHRleHRcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dFByb3ZpZGVyLmdldEZvcm1hdHRlZFRleHQoXCJCUi9FdmVudExvZ1wiLCB0ZXh0SWQudG9TdHJpbmcoKSwgaW5wdXRBcmdzKS52YWx1ZTtcclxuICAgIH1cclxufSJdfQ==
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
define(["require", "exports", "./componentDefaultDefinition", "../componentBase/componentBase", "./textResourceHandling/textResource", "./languageCodes", "./settingIds", "./textFormatter/textFormatter", "./textResourceHandling/textResourcesContainer", "./errorHandling/textSystemErrorHandler", "./textProviderHelper", "./arTextSystemConnector", "../../framework/events", "./eventNamespacesLoadedResponse"], function (require, exports, componentDefaultDefinition_1, componentBase_1, textResource_1, languageCodes_1, settingIds_1, textFormatter_1, textResourcesContainer_1, textSystemErrorHandler_1, textProviderHelper_1, arTextSystemConnector_1, events_1, eventNamespacesLoadedResponse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventNamespacesLoaded = /** @class */ (function (_super) {
        __extends(EventNamespacesLoaded, _super);
        function EventNamespacesLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventNamespacesLoaded;
    }(events_1.TypedEvent));
    exports.EventNamespacesLoaded = EventNamespacesLoaded;
    ;
    var EventSingleTextLoaded = /** @class */ (function (_super) {
        __extends(EventSingleTextLoaded, _super);
        function EventSingleTextLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSingleTextLoaded;
    }(events_1.TypedEvent));
    exports.EventSingleTextLoaded = EventSingleTextLoaded;
    ;
    /**
     * This class handles provides access to all multilanguage texts
     * Texts are packaged in languages and namespaces
     * For searching for textresources the hirarchy is: language -> namepsage -> TextID
     *
     * @export
     * @class TextProvider
     * @extends {ComponentWithoutSettingsBase}
     * @implements {ITextProvider}
     */
    var TextProvider = /** @class */ (function () {
        /**
         * Creates an instance of TextProvider.
         *
         * @memberof TextProvider
         */
        function TextProvider() {
            this.eventNamespacesLoaded = new EventNamespacesLoaded();
            this.eventSingleTextLoaded = new EventSingleTextLoaded();
            /**
             * At first the TextSystem tries to find the namespace with the _selectedLanguage as languagecode
             *
             * @private
             * @type {string}
             * @memberof TextProvider
             */
            this._selectedLanguage = "";
            /**
             * If there is no namespace found with the _selectedLanguage as languagecode, the _fallbackLanguage is used
             *
             * @private
             * @type {string}
             * @memberof TextProvider
             */
            this._fallbackLanguage = "";
            /**
             * If there is also no namespace found with the _fallbackLanguage as languagecode, the _systemLanguage is used
             * The system language of the TextSystem is english
             *
             * @private
             * @memberof TextProvider
             */
            this._systemLanguage = languageCodes_1.LanguageCodes.english;
            /**
             *
             *
             * @private
             * @type {TextResourcesContainer}
             * @memberof TextProvider
             */
            this._resources = new textResourcesContainer_1.TextResourcesContainer();
            /**
             * Is used for persisting the TextSystem
             *
             * @type {ComponentBase}
             * @memberof TextProvider
             */
            this.component = new componentBase_1.ComponentBase(undefined, this);
        }
        /**
         * Initializes the component
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        /**
         * Loads the peristed data for the TextSystem
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
        };
        /**
         * Disposes this component
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.dispose = function () {
            this._resources.clearAllTexts();
        };
        /**
         * Clears all the data of this component
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.clear = function () {
            this._resources.clearAllTexts();
            this.component.saveComponentSettings();
        };
        /**
         * Gets the current ComponentSettings
         *
         * @returns {ComponentSettings}
         * @memberof TextProvider
         */
        TextProvider.prototype.getComponentSettings = function () {
            // Get a valid format for persiting the textresources
            var textResourcesAsSettings = this._resources.getRecoursesSettings();
            // persist the selectedLanguage, fallbackLanguage and recourses
            this.component.setSetting(settingIds_1.SettingIds.TextResources, textResourcesAsSettings);
            this.component.setSetting(settingIds_1.SettingIds.SelectedLanguage, this._selectedLanguage);
            this.component.setSetting(settingIds_1.SettingIds.FallbackLanguage, this._fallbackLanguage);
            return this.component.getComponentSettings();
        };
        /**
         * Sets the given ComponentSettings
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof TextProvider
         */
        TextProvider.prototype.setComponentSettings = function (settings) {
            var _this = this;
            this._resources.clearAllTexts();
            this.component.setComponentSettings(settings);
            if (settings === undefined) {
                return;
            }
            // load the selectedLanguage, fallbackLanguage and recourses from the component
            this._selectedLanguage = this.component.getSetting(settingIds_1.SettingIds.SelectedLanguage);
            this._fallbackLanguage = this.component.getSetting(settingIds_1.SettingIds.FallbackLanguage);
            var textResourcesSettings = this.component.getSetting(settingIds_1.SettingIds.TextResources);
            if (textResourcesSettings === undefined) {
                return;
            }
            // get the correct resource type from settings array
            textResourcesSettings.forEach(function (textResourcesSetting) {
                var textResource = textResource_1.TextResource.create(textResourcesSetting);
                _this._resources.addReplaceTextResource(textResource);
            });
        };
        /**
         * Sets the selected language
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof TextProvider
         */
        TextProvider.prototype.setSelectedLanguage = function (selectedLanguage) {
            this._selectedLanguage = selectedLanguage;
            this.component.saveComponentSettings();
        };
        /**
         * Sets the fallback language
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof TextProvider
         */
        TextProvider.prototype.setFallbackLanguage = function (fallbackLanguage) {
            this._fallbackLanguage = fallbackLanguage;
            this.component.saveComponentSettings();
        };
        /**
         * Add textRecourse to the allready existing ones.
         * If a resource with same namespace and languagecode exist allready, the existing one is replaced.
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.persistTextResource = function (textResource) {
            this._resources.addReplaceTextResource(textResource);
            this.component.saveComponentSettings();
        };
        /**
         * Add the fully qualified textId to the allready existing ones.
         * If there exist allready one on the same path, the existing one is replaced.
         *
         * @param {string} namespace
         * @param {string} textId
         * @param {string} text
         * @param {string} [languageCode=this._systemLanguage]
         * @memberof TextProvider
         */
        TextProvider.prototype.persistFullyQualifiedTextId = function (namespace, textId, text, languageCode) {
            if (languageCode === void 0) { languageCode = this._systemLanguage; }
            this._resources.addReplaceFullyQualifiedTextId(namespace, textId, text, languageCode);
            this.component.saveComponentSettings();
        };
        /**
         * The passed namespace gets fully loaded to the target and persisted in the textSystem
         *
         * @param {string} namespace
         * @param {string} [languageCode=this._selectedLanguage]
         * @return {*}
         * @memberof TextProvider
         */
        TextProvider.prototype.loadFullNamespacesRequest = function (namespaces, languageCode) {
            var _this = this;
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            // Returned argument from the EventNamespacesLoaded
            var eventNamespacesLoadedResponse = new eventNamespacesLoadedResponse_1.EventNamespacesLoadedResponse();
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var _i, namespaces_1, namespace, textMap, textResource, exception_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, namespaces_1 = namespaces;
                            _a.label = 1;
                        case 1:
                            if (!(_i < namespaces_1.length)) return [3 /*break*/, 7];
                            namespace = namespaces_1[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            if (!!this._resources.isFullyLoadedNamespace(namespace, languageCode)) return [3 /*break*/, 4];
                            return [4 /*yield*/, arTextSystemConnector_1.ArTextSystemConnector.getFullNamespaceRequest(namespace, languageCode)];
                        case 3:
                            textMap = _a.sent();
                            textResource = new textResource_1.TextResource(namespace, textMap, languageCode, true);
                            this.persistTextResource(textResource);
                            _a.label = 4;
                        case 4:
                            eventNamespacesLoadedResponse.loadedNamespaces.push(namespace);
                            return [3 /*break*/, 6];
                        case 5:
                            exception_1 = _a.sent();
                            eventNamespacesLoadedResponse.errors.push(namespace);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7:
                            // trigger event when all namespaces are loaded
                            this.eventNamespacesLoaded.raise(this, eventNamespacesLoadedResponse);
                            return [2 /*return*/];
                    }
                });
            }); })();
        };
        /**
         * The passed fullyQualifiedTextId gets loaded to the target and persisted in the textSystem
         *
         * @param {string} namespace
         * @param {string} textId
         * @param {string} [languageCode=this._selectedLanguage]
         * @return {*}
         * @memberof TextProvider
         */
        TextProvider.prototype.loadFullyQualifiedTextIdRequest = function (namespace, textId, languageCode) {
            var _this = this;
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var text, exception_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!!this._resources.isFullyLoadedNamespace(namespace, languageCode)) return [3 /*break*/, 2];
                            return [4 /*yield*/, arTextSystemConnector_1.ArTextSystemConnector.getSingleEntryRequest(namespace, textId, languageCode)];
                        case 1:
                            text = _a.sent();
                            // If a text is found it gets persited    
                            this.persistFullyQualifiedTextId(namespace, textId, text, languageCode);
                            _a.label = 2;
                        case 2:
                            this.eventSingleTextLoaded.raise(this, true);
                            return [3 /*break*/, 4];
                        case 3:
                            exception_2 = _a.sent();
                            this.eventSingleTextLoaded.raise(this, false);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); })();
        };
        /**
         * Searches for an entry in the textsystem with the passed namespace and textId.
         * Returns the requested text, a fallback text or an error text.
         * In case of an error the error is included in the error container of the returned textItem.
         *
         * @param {string} namespace
         * @param {string} textID
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextSystem
         */
        TextProvider.prototype.getRawText = function (namespace, textID, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            var text = textProviderHelper_1.TextProviderHelper.getTextNoFallback(this._resources, namespace, textID, languageCode);
            // fallback 1: use fallback language
            if (!text.isValid()) {
                text = textProviderHelper_1.TextProviderHelper.getTextNoFallback(this._resources, namespace, textID, this._fallbackLanguage);
            }
            // fallback 2: use system language
            if (!text.isValid()) {
                text = textProviderHelper_1.TextProviderHelper.getTextNoFallback(this._resources, namespace, textID, this._systemLanguage);
            }
            // generate Error message
            if (!text.isValid()) {
                text.value = textSystemErrorHandler_1.TextSystemErrorHandler.getErrorMessageByNamespaceAndID(text.errors[0].statusNumber, namespace, textID);
            }
            return text;
        };
        /**
         * Searches for an entry in the textsystem with the passed fullyQualifiedTextId.
         * Returns the requested text, a fallback text or an error text.
         * In case of an error the error is included in the error container of the returned textItem.
         *
         * @param {string} fullyQualifiedTextId
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextProvider
         */
        TextProvider.prototype.getRawTextByFullyQualifiedTextId = function (fullyQualifiedTextId, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            // retrieve namespace and textId
            var textQualifier = textProviderHelper_1.TextProviderHelper.decodeFullyQualifiedTextId(fullyQualifiedTextId);
            return this.getRawText(textQualifier.namespace, textQualifier.textId, languageCode);
        };
        /**
         * Searches for an entry in the textsystem with the passed namespace and textId.
         * In case the received text contains format items, they get resolved.
         * Returns the requested text, a fallback text or an error text.
         * In case of an error the error is included in the error container of the returned textItem.     *
         *
         * @param {string} namespace
         * @param {string} textID
         * @param {FormatterInputArgumentList} formatterArgs
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextProvider
         */
        TextProvider.prototype.getFormattedText = function (namespace, textID, formatterArgs, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            // get the text that the formatter should work with
            var text = this.getRawText(namespace, textID, languageCode);
            if (text.isValid()) {
                // prepare a referece the this text system, so that the formatter can get a text if required (e.g. to resolve a format item such as {$someNamespace/someTextId})
                var textSystemInterface = this;
                // format the raw text
                text = textFormatter_1.TextFormatter.formatText(text.value, textSystemInterface, formatterArgs, languageCode);
            }
            return text;
        };
        return TextProvider;
    }());
    exports.TextProvider = TextProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JBO1FBQTJDLHlDQUF3RDtRQUFuRzs7UUFBb0csQ0FBQztRQUFELDRCQUFDO0lBQUQsQ0FBQyxBQUFyRyxDQUEyQyxtQkFBVSxHQUFnRDtJQUF4RixzREFBcUI7SUFBbUUsQ0FBQztJQUN0RztRQUEyQyx5Q0FBa0M7UUFBN0U7O1FBQThFLENBQUM7UUFBRCw0QkFBQztJQUFELENBQUMsQUFBL0UsQ0FBMkMsbUJBQVUsR0FBMEI7SUFBbEUsc0RBQXFCO0lBQTZDLENBQUM7SUFFaEY7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFpREk7Ozs7V0FJRztRQUNIO1lBcERPLDBCQUFxQixHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztZQUNwRCwwQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFFM0Q7Ozs7OztlQU1HO1lBQ0ssc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1lBRXZDOzs7Ozs7ZUFNRztZQUNLLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztZQUV2Qzs7Ozs7O2VBTUc7WUFDYyxvQkFBZSxHQUFHLDZCQUFhLENBQUMsT0FBTyxDQUFDO1lBRXpEOzs7Ozs7ZUFNRztZQUNLLGVBQVUsR0FBMkIsSUFBSSwrQ0FBc0IsRUFBRSxDQUFDO1lBRTFFOzs7OztlQUtHO1lBQ0ksY0FBUyxHQUFrQixJQUFJLDZCQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBTzlDLENBQUM7UUFFeEI7Ozs7V0FJRztRQUNJLDBDQUFtQixHQUExQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxD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Ozs7Ozs7Ozs7V0FZRztRQUNJLHVDQUFnQixHQUF2QixVQUF3QixTQUFpQixFQUFFLE1BQWEsRUFBRSxhQUEwQyxFQUFFLFlBQXFDO1lBQXJDLDZCQUFBLEVBQUEsZUFBZSxJQUFJLENBQUMsaUJBQWlCO1lBRXZJLG1EQUFtRDtZQUNuRCxJQUFJLElBQUksR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFdEUsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2YsZ0tBQWdLO2dCQUNoSyxJQUFJLG1CQUFtQixHQUFtQixJQUFJLENBQUM7Z0JBRS9DLHNCQUFzQjtnQkFDdEIsSUFBSSxHQUFHLDZCQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ2pHO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQWhWRCxJQWdWQztJQWhWWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2UvdGV4dFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGV4dFJlc291cmNlIH0gZnJvbSBcIi4vdGV4dFJlc291cmNlSGFuZGxpbmcvdGV4dFJlc291cmNlXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlQ29kZXMgfSBmcm9tIFwiLi9sYW5ndWFnZUNvZGVzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IFRleHRGb3JtYXR0ZXIgfSBmcm9tIFwiLi90ZXh0Rm9ybWF0dGVyL3RleHRGb3JtYXR0ZXJcIjtcclxuaW1wb3J0IHsgRm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QgfSBmcm9tIFwiLi90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0XCI7XHJcbmltcG9ydCB7IFRleHRJdGVtIH0gZnJvbSBcIi4vdGV4dEl0ZW1cIjtcclxuaW1wb3J0IHsgVGV4dFJlc291cmNlc0NvbnRhaW5lciB9IGZyb20gXCIuL3RleHRSZXNvdXJjZUhhbmRsaW5nL3RleHRSZXNvdXJjZXNDb250YWluZXJcIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9ySGFuZGxlciB9IGZyb20gXCIuL2Vycm9ySGFuZGxpbmcvdGV4dFN5c3RlbUVycm9ySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBUZXh0UHJvdmlkZXJIZWxwZXIgfSBmcm9tIFwiLi90ZXh0UHJvdmlkZXJIZWxwZXJcIjtcclxuaW1wb3J0IHsgQXJUZXh0U3lzdGVtQ29ubmVjdG9yIH0gZnJvbSBcIi4vYXJUZXh0U3lzdGVtQ29ubmVjdG9yXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZSB9IGZyb20gXCIuL2V2ZW50TmFtZXNwYWNlc0xvYWRlZFJlc3BvbnNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnROYW1lc3BhY2VzTG9hZGVkIGV4dGVuZHMgVHlwZWRFdmVudDxJVGV4dFByb3ZpZGVyLCBFdmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZT57fTtcclxuZXhwb3J0IGNsYXNzIEV2ZW50U2luZ2xlVGV4dExvYWRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVRleHRQcm92aWRlciwgYm9vbGVhbj57fTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGhhbmRsZXMgcHJvdmlkZXMgYWNjZXNzIHRvIGFsbCBtdWx0aWxhbmd1YWdlIHRleHRzXHJcbiAqIFRleHRzIGFyZSBwYWNrYWdlZCBpbiBsYW5ndWFnZXMgYW5kIG5hbWVzcGFjZXNcclxuICogRm9yIHNlYXJjaGluZyBmb3IgdGV4dHJlc291cmNlcyB0aGUgaGlyYXJjaHkgaXM6IGxhbmd1YWdlIC0+IG5hbWVwc2FnZSAtPiBUZXh0SURcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgVGV4dFByb3ZpZGVyXHJcbiAqIEBleHRlbmRzIHtDb21wb25lbnRXaXRob3V0U2V0dGluZ3NCYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SVRleHRQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0UHJvdmlkZXIgaW1wbGVtZW50cyBJVGV4dFByb3ZpZGVye1xyXG5cclxuICAgIHB1YmxpYyBldmVudE5hbWVzcGFjZXNMb2FkZWQgPSBuZXcgRXZlbnROYW1lc3BhY2VzTG9hZGVkKCk7XHJcbiAgICBwdWJsaWMgZXZlbnRTaW5nbGVUZXh0TG9hZGVkID0gbmV3IEV2ZW50U2luZ2xlVGV4dExvYWRlZCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXQgZmlyc3QgdGhlIFRleHRTeXN0ZW0gdHJpZXMgdG8gZmluZCB0aGUgbmFtZXNwYWNlIHdpdGggdGhlIF9zZWxlY3RlZExhbmd1YWdlIGFzIGxhbmd1YWdlY29kZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZExhbmd1YWdlOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlcmUgaXMgbm8gbmFtZXNwYWNlIGZvdW5kIHdpdGggdGhlIF9zZWxlY3RlZExhbmd1YWdlIGFzIGxhbmd1YWdlY29kZSwgdGhlIF9mYWxsYmFja0xhbmd1YWdlIGlzIHVzZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZmFsbGJhY2tMYW5ndWFnZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZXJlIGlzIGFsc28gbm8gbmFtZXNwYWNlIGZvdW5kIHdpdGggdGhlIF9mYWxsYmFja0xhbmd1YWdlIGFzIGxhbmd1YWdlY29kZSwgdGhlIF9zeXN0ZW1MYW5ndWFnZSBpcyB1c2VkXHJcbiAgICAgKiBUaGUgc3lzdGVtIGxhbmd1YWdlIG9mIHRoZSBUZXh0U3lzdGVtIGlzIGVuZ2xpc2ggXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3N5c3RlbUxhbmd1YWdlID0gTGFuZ3VhZ2VDb2Rlcy5lbmdsaXNoO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge1RleHRSZXNvdXJjZXNDb250YWluZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Jlc291cmNlczogVGV4dFJlc291cmNlc0NvbnRhaW5lciA9IG5ldyBUZXh0UmVzb3VyY2VzQ29udGFpbmVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB1c2VkIGZvciBwZXJzaXN0aW5nIHRoZSBUZXh0U3lzdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0NvbXBvbmVudEJhc2V9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb21wb25lbnQ6IENvbXBvbmVudEJhc2UgPSBuZXcgQ29tcG9uZW50QmFzZSh1bmRlZmluZWQsIHRoaXMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUZXh0UHJvdmlkZXIuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICgpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBwZXJpc3RlZCBkYXRhIGZvciB0aGUgVGV4dFN5c3RlbVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRpYWxpemUoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5sb2FkQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5jbGVhckFsbFRleHRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogQ2xlYXJzIGFsbCB0aGUgZGF0YSBvZiB0aGlzIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyKCl7XHJcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmNsZWFyQWxsVGV4dHMoKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgQ29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgLy8gR2V0IGEgdmFsaWQgZm9ybWF0IGZvciBwZXJzaXRpbmcgdGhlIHRleHRyZXNvdXJjZXNcclxuICAgICAgICBsZXQgdGV4dFJlc291cmNlc0FzU2V0dGluZ3M6IEFycmF5PElTZXR0aW5ncz4gPSB0aGlzLl9yZXNvdXJjZXMuZ2V0UmVjb3Vyc2VzU2V0dGluZ3MoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBwZXJzaXN0IHRoZSBzZWxlY3RlZExhbmd1YWdlLCBmYWxsYmFja0xhbmd1YWdlIGFuZCByZWNvdXJzZXNcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFNldHRpbmdJZHMuVGV4dFJlc291cmNlcywgdGV4dFJlc291cmNlc0FzU2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoU2V0dGluZ0lkcy5TZWxlY3RlZExhbmd1YWdlLCB0aGlzLl9zZWxlY3RlZExhbmd1YWdlKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFNldHRpbmdJZHMuRmFsbGJhY2tMYW5ndWFnZSwgdGhpcy5fZmFsbGJhY2tMYW5ndWFnZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5jbGVhckFsbFRleHRzKCk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICBpZihzZXR0aW5ncyA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gbG9hZCB0aGUgc2VsZWN0ZWRMYW5ndWFnZSwgZmFsbGJhY2tMYW5ndWFnZSBhbmQgcmVjb3Vyc2VzIGZyb20gdGhlIGNvbXBvbmVudFxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2UgPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFNldHRpbmdJZHMuU2VsZWN0ZWRMYW5ndWFnZSkgYXMgc3RyaW5nO1xyXG4gICAgICAgIHRoaXMuX2ZhbGxiYWNrTGFuZ3VhZ2UgPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFNldHRpbmdJZHMuRmFsbGJhY2tMYW5ndWFnZSkgYXMgc3RyaW5nO1xyXG4gICAgICAgIGxldCB0ZXh0UmVzb3VyY2VzU2V0dGluZ3MgOiBBcnJheTxJU2V0dGluZ3M+ID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhTZXR0aW5nSWRzLlRleHRSZXNvdXJjZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRleHRSZXNvdXJjZXNTZXR0aW5ncyA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb3JyZWN0IHJlc291cmNlIHR5cGUgZnJvbSBzZXR0aW5ncyBhcnJheVxyXG4gICAgICAgIHRleHRSZXNvdXJjZXNTZXR0aW5ncy5mb3JFYWNoKHRleHRSZXNvdXJjZXNTZXR0aW5nID0+IHtcclxuICAgICAgICAgICAgbGV0IHRleHRSZXNvdXJjZSA9IFRleHRSZXNvdXJjZS5jcmVhdGUodGV4dFJlc291cmNlc1NldHRpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkUmVwbGFjZVRleHRSZXNvdXJjZSh0ZXh0UmVzb3VyY2UpO1xyXG4gICAgICAgIH0pOyAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRMYW5ndWFnZShzZWxlY3RlZExhbmd1YWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZExhbmd1YWdlID0gc2VsZWN0ZWRMYW5ndWFnZTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZmFsbGJhY2sgbGFuZ3VhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfSBzZXR0aW5nc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEZhbGxiYWNrTGFuZ3VhZ2UoZmFsbGJhY2tMYW5ndWFnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZmFsbGJhY2tMYW5ndWFnZSA9IGZhbGxiYWNrTGFuZ3VhZ2U7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2F2ZUNvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGV4dFJlY291cnNlIHRvIHRoZSBhbGxyZWFkeSBleGlzdGluZyBvbmVzLiBcclxuICAgICAqIElmIGEgcmVzb3VyY2Ugd2l0aCBzYW1lIG5hbWVzcGFjZSBhbmQgbGFuZ3VhZ2Vjb2RlIGV4aXN0IGFsbHJlYWR5LCB0aGUgZXhpc3Rpbmcgb25lIGlzIHJlcGxhY2VkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBlcnNpc3RUZXh0UmVzb3VyY2UodGV4dFJlc291cmNlOlRleHRSZXNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGRSZXBsYWNlVGV4dFJlc291cmNlKHRleHRSZXNvdXJjZSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2F2ZUNvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIGZ1bGx5IHF1YWxpZmllZCB0ZXh0SWQgdG8gdGhlIGFsbHJlYWR5IGV4aXN0aW5nIG9uZXMuIFxyXG4gICAgICogSWYgdGhlcmUgZXhpc3QgYWxscmVhZHkgb25lIG9uIHRoZSBzYW1lIHBhdGgsIHRoZSBleGlzdGluZyBvbmUgaXMgcmVwbGFjZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbGFuZ3VhZ2VDb2RlPXRoaXMuX3N5c3RlbUxhbmd1YWdlXVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGVyc2lzdEZ1bGx5UXVhbGlmaWVkVGV4dElkKG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0SWQ6IHN0cmluZywgdGV4dDogc3RyaW5nLCBsYW5ndWFnZUNvZGU6IHN0cmluZyA9IHRoaXMuX3N5c3RlbUxhbmd1YWdlKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZFJlcGxhY2VGdWxseVF1YWxpZmllZFRleHRJZChuYW1lc3BhY2UsIHRleHRJZCwgdGV4dCwgbGFuZ3VhZ2VDb2RlKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBwYXNzZWQgbmFtZXNwYWNlIGdldHMgZnVsbHkgbG9hZGVkIHRvIHRoZSB0YXJnZXQgYW5kIHBlcnNpc3RlZCBpbiB0aGUgdGV4dFN5c3RlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbGFuZ3VhZ2VDb2RlPXRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2VdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSBcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRGdWxsTmFtZXNwYWNlc1JlcXVlc3QobmFtZXNwYWNlczogQXJyYXk8c3RyaW5nPiwgbGFuZ3VhZ2VDb2RlOiBzdHJpbmcgPSB0aGlzLl9zZWxlY3RlZExhbmd1YWdlKSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybmVkIGFyZ3VtZW50IGZyb20gdGhlIEV2ZW50TmFtZXNwYWNlc0xvYWRlZFxyXG4gICAgICAgIGxldCBldmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZSA9IG5ldyBFdmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZSgpOyBcclxuXHJcbiAgICAgICAgKGFzeW5jKCk9PiB7XHJcbiAgICAgICAgICAgIGZvcihjb25zdCBuYW1lc3BhY2Ugb2YgbmFtZXNwYWNlcykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgbmFtZXNwYWNlIGlzbid0IGFsbHJlYWR5IHBlcnNpc3RlZCAtPiBvbmx5IHZhbGlkIHdoZW4gZWl0aGVyIHRoZSBmdWxsIG5hbWVzcGFjZSBpcyBjb3JyZWN0IGxvYWRlZCBvciBhbiBleGVwdGlvbiBpcyB0aHJvd25cclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzLmlzRnVsbHlMb2FkZWROYW1lc3BhY2UobmFtZXNwYWNlLCBsYW5ndWFnZUNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCBhbGwgdGV4dHMgZnJvbSB0aGUgbmFtZXNwYWNlIGZyb20gdGhlIHRleHRzeXN0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dE1hcDogTWFwPHN0cmluZywgc3RyaW5nPiA9IGF3YWl0IEFyVGV4dFN5c3RlbUNvbm5lY3Rvci5nZXRGdWxsTmFtZXNwYWNlUmVxdWVzdChuYW1lc3BhY2UsIGxhbmd1YWdlQ29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQZXJzaXN0IHJlY2V2ZWQgdGV4dHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHRSZXNvdXJjZTogVGV4dFJlc291cmNlID0gbmV3IFRleHRSZXNvdXJjZShuYW1lc3BhY2UsIHRleHRNYXAsIGxhbmd1YWdlQ29kZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc2lzdFRleHRSZXNvdXJjZSh0ZXh0UmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZS5sb2FkZWROYW1lc3BhY2VzLnB1c2gobmFtZXNwYWNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoKGV4Y2VwdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lc3BhY2VzTG9hZGVkUmVzcG9uc2UuZXJyb3JzLnB1c2gobmFtZXNwYWNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBldmVudCB3aGVuIGFsbCBuYW1lc3BhY2VzIGFyZSBsb2FkZWRcclxuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWVzcGFjZXNMb2FkZWQucmFpc2UodGhpcywgZXZlbnROYW1lc3BhY2VzTG9hZGVkUmVzcG9uc2UpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcGFzc2VkIGZ1bGx5UXVhbGlmaWVkVGV4dElkIGdldHMgbG9hZGVkIHRvIHRoZSB0YXJnZXQgYW5kIHBlcnNpc3RlZCBpbiB0aGUgdGV4dFN5c3RlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0SWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbGFuZ3VhZ2VDb2RlPXRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2VdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSBcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRGdWxseVF1YWxpZmllZFRleHRJZFJlcXVlc3QobmFtZXNwYWNlOiBzdHJpbmcsIHRleHRJZDogc3RyaW5nLCBsYW5ndWFnZUNvZGU6IHN0cmluZyA9IHRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2UpIHtcclxuXHJcbiAgICAgICAgKGFzeW5jKCk9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgc2luZ2xlIHRleHQgZnJvbSB0ZXh0c3lzdGVtXHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzLmlzRnVsbHlMb2FkZWROYW1lc3BhY2UobmFtZXNwYWNlLCBsYW5ndWFnZUNvZGUpKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSBhd2FpdCBBclRleHRTeXN0ZW1Db25uZWN0b3IuZ2V0U2luZ2xlRW50cnlSZXF1ZXN0KG5hbWVzcGFjZSwgdGV4dElkLCBsYW5ndWFnZUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGEgdGV4dCBpcyBmb3VuZCBpdCBnZXRzIHBlcnNpdGVkICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc2lzdEZ1bGx5UXVhbGlmaWVkVGV4dElkKG5hbWVzcGFjZSwgdGV4dElkLCB0ZXh0LCBsYW5ndWFnZUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudFNpbmdsZVRleHRMb2FkZWQucmFpc2UodGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2goZXhjZXB0aW9uKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTaW5nbGVUZXh0TG9hZGVkLnJhaXNlKHRoaXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKCk7ICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyBmb3IgYW4gZW50cnkgaW4gdGhlIHRleHRzeXN0ZW0gd2l0aCB0aGUgcGFzc2VkIG5hbWVzcGFjZSBhbmQgdGV4dElkLlxyXG4gICAgICogUmV0dXJucyB0aGUgcmVxdWVzdGVkIHRleHQsIGEgZmFsbGJhY2sgdGV4dCBvciBhbiBlcnJvciB0ZXh0LlxyXG4gICAgICogSW4gY2FzZSBvZiBhbiBlcnJvciB0aGUgZXJyb3IgaXMgaW5jbHVkZWQgaW4gdGhlIGVycm9yIGNvbnRhaW5lciBvZiB0aGUgcmV0dXJuZWQgdGV4dEl0ZW0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRJRFxyXG4gICAgICogQHBhcmFtIHsqfSBbbGFuZ3VhZ2VDb2RlPXRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2VdXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRTeXN0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJhd1RleHQobmFtZXNwYWNlOiBzdHJpbmcsIHRleHRJRDpzdHJpbmcsIGxhbmd1YWdlQ29kZSA9IHRoaXMuX3NlbGVjdGVkTGFuZ3VhZ2UpOiBUZXh0SXRlbSB7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0OiBUZXh0SXRlbSA9IFRleHRQcm92aWRlckhlbHBlci5nZXRUZXh0Tm9GYWxsYmFjayh0aGlzLl9yZXNvdXJjZXMsIG5hbWVzcGFjZSwgdGV4dElELCBsYW5ndWFnZUNvZGUpO1xyXG5cclxuICAgICAgICAvLyBmYWxsYmFjayAxOiB1c2UgZmFsbGJhY2sgbGFuZ3VhZ2VcclxuICAgICAgICBpZighdGV4dC5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGV4dCA9IFRleHRQcm92aWRlckhlbHBlci5nZXRUZXh0Tm9GYWxsYmFjayh0aGlzLl9yZXNvdXJjZXMsIG5hbWVzcGFjZSwgdGV4dElELCB0aGlzLl9mYWxsYmFja0xhbmd1YWdlKTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGZhbGxiYWNrIDI6IHVzZSBzeXN0ZW0gbGFuZ3VhZ2VcclxuICAgICAgICBpZighdGV4dC5pc1ZhbGlkKCkpe1xyXG4gICAgICAgICAgICB0ZXh0ID0gVGV4dFByb3ZpZGVySGVscGVyLmdldFRleHROb0ZhbGxiYWNrKHRoaXMuX3Jlc291cmNlcywgbmFtZXNwYWNlLCB0ZXh0SUQsIHRoaXMuX3N5c3RlbUxhbmd1YWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdlbmVyYXRlIEVycm9yIG1lc3NhZ2VcclxuICAgICAgICBpZighdGV4dC5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGV4dC52YWx1ZSA9IFRleHRTeXN0ZW1FcnJvckhhbmRsZXIuZ2V0RXJyb3JNZXNzYWdlQnlOYW1lc3BhY2VBbmRJRCh0ZXh0LmVycm9yc1swXS5zdGF0dXNOdW1iZXIsIG5hbWVzcGFjZSwgdGV4dElEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyBmb3IgYW4gZW50cnkgaW4gdGhlIHRleHRzeXN0ZW0gd2l0aCB0aGUgcGFzc2VkIGZ1bGx5UXVhbGlmaWVkVGV4dElkLlxyXG4gICAgICogUmV0dXJucyB0aGUgcmVxdWVzdGVkIHRleHQsIGEgZmFsbGJhY2sgdGV4dCBvciBhbiBlcnJvciB0ZXh0LlxyXG4gICAgICogSW4gY2FzZSBvZiBhbiBlcnJvciB0aGUgZXJyb3IgaXMgaW5jbHVkZWQgaW4gdGhlIGVycm9yIGNvbnRhaW5lciBvZiB0aGUgcmV0dXJuZWQgdGV4dEl0ZW0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZ1bGx5UXVhbGlmaWVkVGV4dElkXHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5fc2VsZWN0ZWRMYW5ndWFnZV1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSYXdUZXh0QnlGdWxseVF1YWxpZmllZFRleHRJZChmdWxseVF1YWxpZmllZFRleHRJZDogc3RyaW5nLCBsYW5ndWFnZUNvZGUgPSB0aGlzLl9zZWxlY3RlZExhbmd1YWdlKTogVGV4dEl0ZW0ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJldHJpZXZlIG5hbWVzcGFjZSBhbmQgdGV4dElkXHJcbiAgICAgICAgbGV0IHRleHRRdWFsaWZpZXIgPSBUZXh0UHJvdmlkZXJIZWxwZXIuZGVjb2RlRnVsbHlRdWFsaWZpZWRUZXh0SWQoZnVsbHlRdWFsaWZpZWRUZXh0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSYXdUZXh0KHRleHRRdWFsaWZpZXIubmFtZXNwYWNlLCB0ZXh0UXVhbGlmaWVyLnRleHRJZCwgbGFuZ3VhZ2VDb2RlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyBmb3IgYW4gZW50cnkgaW4gdGhlIHRleHRzeXN0ZW0gd2l0aCB0aGUgcGFzc2VkIG5hbWVzcGFjZSBhbmQgdGV4dElkLlxyXG4gICAgICogSW4gY2FzZSB0aGUgcmVjZWl2ZWQgdGV4dCBjb250YWlucyBmb3JtYXQgaXRlbXMsIHRoZXkgZ2V0IHJlc29sdmVkLlxyXG4gICAgICogUmV0dXJucyB0aGUgcmVxdWVzdGVkIHRleHQsIGEgZmFsbGJhY2sgdGV4dCBvciBhbiBlcnJvciB0ZXh0LlxyXG4gICAgICogSW4gY2FzZSBvZiBhbiBlcnJvciB0aGUgZXJyb3IgaXMgaW5jbHVkZWQgaW4gdGhlIGVycm9yIGNvbnRhaW5lciBvZiB0aGUgcmV0dXJuZWQgdGV4dEl0ZW0uICAgICAqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0SURcclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3R9IGZvcm1hdHRlckFyZ3NcclxuICAgICAqIEBwYXJhbSB7Kn0gW2xhbmd1YWdlQ29kZT10aGlzLl9zZWxlY3RlZExhbmd1YWdlXVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEZvcm1hdHRlZFRleHQobmFtZXNwYWNlOiBzdHJpbmcsIHRleHRJRDpzdHJpbmcsIGZvcm1hdHRlckFyZ3MgOiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlID0gdGhpcy5fc2VsZWN0ZWRMYW5ndWFnZSk6IFRleHRJdGVtIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0ZXh0IHRoYXQgdGhlIGZvcm1hdHRlciBzaG91bGQgd29yayB3aXRoXHJcbiAgICAgICAgbGV0IHRleHQ6IFRleHRJdGVtID0gdGhpcy5nZXRSYXdUZXh0KG5hbWVzcGFjZSwgdGV4dElELCBsYW5ndWFnZUNvZGUpO1xyXG5cclxuICAgICAgICBpZih0ZXh0LmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAvLyBwcmVwYXJlIGEgcmVmZXJlY2UgdGhlIHRoaXMgdGV4dCBzeXN0ZW0sIHNvIHRoYXQgdGhlIGZvcm1hdHRlciBjYW4gZ2V0IGEgdGV4dCBpZiByZXF1aXJlZCAoZS5nLiB0byByZXNvbHZlIGEgZm9ybWF0IGl0ZW0gc3VjaCBhcyB7JHNvbWVOYW1lc3BhY2Uvc29tZVRleHRJZH0pXHJcbiAgICAgICAgICAgIGxldCB0ZXh0U3lzdGVtSW50ZXJmYWNlIDogSVRleHRQcm92aWRlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBmb3JtYXQgdGhlIHJhdyB0ZXh0XHJcbiAgICAgICAgICAgIHRleHQgPSBUZXh0Rm9ybWF0dGVyLmZvcm1hdFRleHQodGV4dC52YWx1ZSwgdGV4dFN5c3RlbUludGVyZmFjZSwgZm9ybWF0dGVyQXJncywgbGFuZ3VhZ2VDb2RlKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iXX0=
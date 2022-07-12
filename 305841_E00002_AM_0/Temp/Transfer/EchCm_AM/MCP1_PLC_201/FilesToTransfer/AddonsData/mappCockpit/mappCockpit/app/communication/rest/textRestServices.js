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
define(["require", "exports", "./opcUaRestServices", "./restService"], function (require, exports, opcUaRestServices_1, restService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides Text system access rest services
     *
     * @export
     * @class TextSystemRestServices
     */
    var TextSystemRestServices = /** @class */ (function () {
        function TextSystemRestServices() {
        }
        /**
         * Gets the base url for text system requests
         *
         * @static
         * @returns {string}
         * @memberof TextSystemRestServices
         */
        TextSystemRestServices.getTextSystemBaseUrl = function () {
            return opcUaRestServices_1.OpcUaRestServices.getBaseUrl() + TextSystemRestServices.textSystem;
        };
        /**
         * Gets the available languages as id's
         *
         * @static
         * @returns {Promise<any>}
         * @memberof TextSystemRestServices
         */
        TextSystemRestServices.getLanguages = function () {
            return __awaiter(this, void 0, void 0, function () {
                var textResource, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.getTextResource(TextSystemRestServices.resIdLanguages)];
                        case 1:
                            textResource = _a.sent();
                            return [2 /*return*/, textResource.languageIds];
                        case 2:
                            error_1 = _a.sent();
                            throw new Error(error_1);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets the default language as id
         *
         * @static
         * @returns {Promise<Array<string>>}
         * @memberof TextSystemRestServices
         */
        TextSystemRestServices.getDefaultLanguage = function () {
            return __awaiter(this, void 0, void 0, function () {
                var textResource, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.getTextResource(TextSystemRestServices.resIdDefaultLanguage)];
                        case 1:
                            textResource = _a.sent();
                            return [2 /*return*/, textResource.defaultLanguageId];
                        case 2:
                            error_2 = _a.sent();
                            throw new Error(error_2);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets all text resources contained in the specified namespace
         *
         * @static
         * @param {string} languageId
         * @param {string} namespace
         * @returns {Promise<Array<string>>}
         * @memberof TextSystemRestServices
         */
        TextSystemRestServices.getNamespaceTextItems = function (languageId, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var namespaceTextResources, namespaceTextItems, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.getTextResource(languageId + '/' + encodeURIComponent(namespace))];
                        case 1:
                            namespaceTextResources = _a.sent();
                            namespaceTextItems = new Map(Object.entries(namespaceTextResources));
                            return [2 /*return*/, namespaceTextItems];
                        case 2:
                            error_3 = _a.sent();
                            throw new Error(error_3);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets a single text item form the specifiedlanguage and namespace
         *
         * @static
         * @param {string} languageId
         * @param {string} namespace
         * @param {string} textId
         * @returns  Promise<string>
         * @memberof TextSystemRestServices
         */
        TextSystemRestServices.getText = function (languageId, namespace, textId) {
            return __awaiter(this, void 0, void 0, function () {
                var namespaceTextItem, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.getTextResource(languageId + '/' + encodeURIComponent(namespace) + '/' + encodeURIComponent(textId))];
                        case 1:
                            namespaceTextItem = _a.sent();
                            return [2 /*return*/, namespaceTextItem[textId]];
                        case 2:
                            error_4 = _a.sent();
                            throw new Error(error_4);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads a text resource from the textsystem specified by the resource id
         *
         * @static
         * @param {string} textResourceId
         * @returns {Promise<any>}
         * @memberof TextSystemRestServices
         */
        TextSystemRestServices.getTextResource = function (textResourceId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getTextSystemBaseUrl() + textResourceId;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_5 = _a.sent();
                            throw new Error(error_5);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Connects the textsystem
         *
         * @static
         * @param {number} sessionId
         * @memberof OpcUaRestServices
         */
        TextSystemRestServices.connectTextSystem = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        // declares the base url for text system rest services
        TextSystemRestServices.textSystem = '/text/';
        TextSystemRestServices.resIdLanguages = '/languages/';
        TextSystemRestServices.resIdDefaultLanguage = '/languages/default/';
        return TextSystemRestServices;
    }());
    exports.TextSystemRestServices = TextSystemRestServices;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFJlc3RTZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbXVuaWNhdGlvbi9yZXN0L3RleHRSZXN0U2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7Ozs7O09BS0c7SUFDSDtRQUFBO1FBNkhBLENBQUM7UUFySEc7Ozs7OztXQU1HO1FBQ0ksMkNBQW9CLEdBQTNCO1lBQ0csT0FBTyxxQ0FBaUIsQ0FBQyxVQUFVLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7UUFDN0UsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNVLG1DQUFZLEdBQXpCOzs7Ozs7OzRCQUUyQixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxFQUFBOzs0QkFBaEYsWUFBWSxHQUFHLFNBQWlFOzRCQUNwRixzQkFBYSxZQUFhLENBQUMsV0FBVyxFQUFDOzs7NEJBRXZDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBSyxDQUFDLENBQUM7Ozs7O1NBRTlCO1FBR0Q7Ozs7OztXQU1HO1FBQ1UseUNBQWtCLEdBQS9COzs7Ozs7OzRCQUUyQixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLEVBQUE7OzRCQUF0RixZQUFZLEdBQUcsU0FBdUU7NEJBQzFGLHNCQUFhLFlBQWEsQ0FBQyxpQkFBaUIsRUFBQzs7OzRCQUU3QyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQUssQ0FBQyxDQUFDOzs7OztTQUU5QjtRQUdEOzs7Ozs7OztXQVFHO1FBQ1UsNENBQXFCLEdBQWxDLFVBQW1DLFVBQWlCLEVBQUMsU0FBZ0I7Ozs7Ozs7NEJBRWhDLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBSSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFBOzs0QkFBdEcsc0JBQXNCLEdBQUcsU0FBNkU7NEJBR3BHLGtCQUFrQixHQUFHLElBQUksR0FBRyxDQUFnQixNQUFNLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQzs0QkFDMUYsc0JBQU8sa0JBQWtCLEVBQUM7Ozs0QkFFMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFLLENBQUMsQ0FBQzs7Ozs7U0FFOUI7UUFHRDs7Ozs7Ozs7O1dBU0c7UUFDVSw4QkFBTyxHQUFwQixVQUFxQixVQUFrQixFQUFFLFNBQWlCLEVBQUUsTUFBYzs7Ozs7Ozs0QkFFMUMscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFJLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFBOzs0QkFBckksaUJBQWlCLEdBQUcsU0FBaUg7NEJBQ3pJLHNCQUFPLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFDOzs7NEJBRWpDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBSyxDQUFDLENBQUM7Ozs7O1NBRTlCO1FBR0Q7Ozs7Ozs7V0FPRztRQUNVLHNDQUFlLEdBQTVCLFVBQTZCLGNBQXFCOzs7Ozs7OzRCQUd0QyxVQUFVLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsY0FBYyxDQUFDOzRCQUNqRCxxQkFBTSx5QkFBVyxDQUFDLElBQUksQ0FBTSw2QkFBZSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBQTs7NEJBQXJFLE1BQU0sR0FBRyxTQUE0RDs0QkFDekUsc0JBQU8sTUFBTSxFQUFDOzs7NEJBRWQsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFLLENBQUMsQ0FBQzs7Ozs7U0FFOUI7UUFFRDs7Ozs7O1dBTUc7UUFDVSx3Q0FBaUIsR0FBOUI7Ozs7OztTQUVDO1FBeEhELHNEQUFzRDtRQUN0QyxpQ0FBVSxHQUFZLFFBQVEsQ0FBQztRQUMvQixxQ0FBYyxHQUFZLGFBQWEsQ0FBQztRQUN4QywyQ0FBb0IsR0FBWSxxQkFBcUIsQ0FBQztRQXVIMUUsNkJBQUM7S0FBQSxBQTdIRCxJQTZIQztJQTdIWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcyB9IGZyb20gXCIuL29wY1VhUmVzdFNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IFJlc3RTZXJ2aWNlLCBSZXN0U2VydmljZVR5cGUgfSBmcm9tIFwiLi9yZXN0U2VydmljZVwiO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIFRleHQgc3lzdGVtIGFjY2VzcyByZXN0IHNlcnZpY2VzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFRleHRTeXN0ZW1SZXN0U2VydmljZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0U3lzdGVtUmVzdFNlcnZpY2Vze1xyXG5cclxuXHJcbiAgICAvLyBkZWNsYXJlcyB0aGUgYmFzZSB1cmwgZm9yIHRleHQgc3lzdGVtIHJlc3Qgc2VydmljZXNcclxuICAgIHN0YXRpYyByZWFkb25seSB0ZXh0U3lzdGVtIDogc3RyaW5nID0gJy90ZXh0Lyc7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgcmVzSWRMYW5ndWFnZXMgOiBzdHJpbmcgPSAnL2xhbmd1YWdlcy8nO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IHJlc0lkRGVmYXVsdExhbmd1YWdlIDogc3RyaW5nID0gJy9sYW5ndWFnZXMvZGVmYXVsdC8nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgYmFzZSB1cmwgZm9yIHRleHQgc3lzdGVtIHJlcXVlc3RzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0U3lzdGVtUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRUZXh0U3lzdGVtQmFzZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgcmV0dXJuIE9wY1VhUmVzdFNlcnZpY2VzLmdldEJhc2VVcmwoKSArIFRleHRTeXN0ZW1SZXN0U2VydmljZXMudGV4dFN5c3RlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGF2YWlsYWJsZSBsYW5ndWFnZXMgYXMgaWQnc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFN5c3RlbVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0TGFuZ3VhZ2VzKCk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4geyBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgdGV4dFJlc291cmNlID0gYXdhaXQgdGhpcy5nZXRUZXh0UmVzb3VyY2UoVGV4dFN5c3RlbVJlc3RTZXJ2aWNlcy5yZXNJZExhbmd1YWdlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiAoPGFueT50ZXh0UmVzb3VyY2UpLmxhbmd1YWdlSWRzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZGVmYXVsdCBsYW5ndWFnZSBhcyBpZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PHN0cmluZz4+fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRTeXN0ZW1SZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGdldERlZmF1bHRMYW5ndWFnZSgpOiBQcm9taXNlPHN0cmluZz4geyBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgdGV4dFJlc291cmNlID0gYXdhaXQgdGhpcy5nZXRUZXh0UmVzb3VyY2UoVGV4dFN5c3RlbVJlc3RTZXJ2aWNlcy5yZXNJZERlZmF1bHRMYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoPGFueT50ZXh0UmVzb3VyY2UpLmRlZmF1bHRMYW5ndWFnZUlkO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbGwgdGV4dCByZXNvdXJjZXMgY29udGFpbmVkIGluIHRoZSBzcGVjaWZpZWQgbmFtZXNwYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PHN0cmluZz4+fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRTeXN0ZW1SZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGdldE5hbWVzcGFjZVRleHRJdGVtcyhsYW5ndWFnZUlkOnN0cmluZyxuYW1lc3BhY2U6c3RyaW5nKTogUHJvbWlzZTxNYXA8c3RyaW5nLHN0cmluZz4+IHsgXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIG5hbWVzcGFjZVRleHRSZXNvdXJjZXMgPSBhd2FpdCB0aGlzLmdldFRleHRSZXNvdXJjZShsYW5ndWFnZUlkICsgJy8nICsgIGVuY29kZVVSSUNvbXBvbmVudChuYW1lc3BhY2UpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdGhlIHBsYWluIG9iamVjdCBpbnRvIHJlZ3VsYXIgbWFwICh0ZXh0S2V5IC0+IHRleHRWYWx1ZSlcclxuICAgICAgICAgICAgY29uc3QgbmFtZXNwYWNlVGV4dEl0ZW1zID0gbmV3IE1hcDxzdHJpbmcsc3RyaW5nPihPYmplY3QuZW50cmllcyhuYW1lc3BhY2VUZXh0UmVzb3VyY2VzKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lc3BhY2VUZXh0SXRlbXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgc2luZ2xlIHRleHQgaXRlbSBmb3JtIHRoZSBzcGVjaWZpZWRsYW5ndWFnZSBhbmQgbmFtZXNwYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0SWRcclxuICAgICAqIEByZXR1cm5zICBQcm9taXNlPHN0cmluZz4gXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFN5c3RlbVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0VGV4dChsYW5ndWFnZUlkOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0SWQ6IHN0cmluZykgOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lc3BhY2VUZXh0SXRlbSA9IGF3YWl0IHRoaXMuZ2V0VGV4dFJlc291cmNlKGxhbmd1YWdlSWQgKyAnLycgKyAgZW5jb2RlVVJJQ29tcG9uZW50KG5hbWVzcGFjZSkgKyAnLycgKyAgZW5jb2RlVVJJQ29tcG9uZW50KHRleHRJZCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmFtZXNwYWNlVGV4dEl0ZW1bdGV4dElkXTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0gIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgdGV4dCByZXNvdXJjZSBmcm9tIHRoZSB0ZXh0c3lzdGVtIHNwZWNpZmllZCBieSB0aGUgcmVzb3VyY2UgaWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFJlc291cmNlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFN5c3RlbVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0VGV4dFJlc291cmNlKHRleHRSZXNvdXJjZUlkOnN0cmluZyk6IFByb21pc2U8YW55PiB7ICAgICBcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldFRleHRTeXN0ZW1CYXNlVXJsKCkgKyB0ZXh0UmVzb3VyY2VJZDtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSB0ZXh0c3lzdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBjb25uZWN0VGV4dFN5c3RlbSgpIHsgIFxyXG4gICAgICAgIC8vIHN0dWIgZm9yIHRleHQgc3lzdGVtIGluaXRpYWxpemF0aW9uICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXX0=
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
define(["require", "exports", "../../services/appServices"], function (require, exports, appServices_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Not implemented!
     * Should load either the full namespace or a single entry from the ArTextSys
     *
     * @export
     * @class ArTextSystemConnector
     */
    var ArTextSystemConnector = /** @class */ (function () {
        function ArTextSystemConnector() {
        }
        ArTextSystemConnector.getFullNamespaceRequest = function (namespace, languageCode) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appServices_1.Services.textSystem.getNamespaceTextItems(languageCode, namespace)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ArTextSystemConnector.getSingleEntryRequest = function (namespace, textId, languageCodes) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appServices_1.Services.textSystem.getText(languageCodes, namespace, textId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return ArTextSystemConnector;
    }());
    exports.ArTextSystemConnector = ArTextSystemConnector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJUZXh0U3lzdGVtQ29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL2FyVGV4dFN5c3RlbUNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTs7Ozs7O09BTUc7SUFDSDtRQUVJO1FBQXVCLENBQUM7UUFFSiw2Q0FBdUIsR0FBM0MsVUFBNEMsU0FBaUIsRUFBRSxZQUFvQjs7OztnQ0FDeEUscUJBQU0sc0JBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUFBO2dDQUEvRSxzQkFBTyxTQUF3RSxFQUFDOzs7O1NBQ25GO1FBRW1CLDJDQUFxQixHQUF6QyxVQUEwQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxhQUFxQjs7OztnQ0FDdkYscUJBQU0sc0JBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUE7Z0NBQTFFLHNCQUFPLFNBQW1FLEVBQUM7Ozs7U0FDOUU7UUFDTCw0QkFBQztJQUFELENBQUMsQUFYRCxJQVdDO0lBWFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBwU2VydmljZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBOb3QgaW1wbGVtZW50ZWQhXHJcbiAqIFNob3VsZCBsb2FkIGVpdGhlciB0aGUgZnVsbCBuYW1lc3BhY2Ugb3IgYSBzaW5nbGUgZW50cnkgZnJvbSB0aGUgQXJUZXh0U3lzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEFyVGV4dFN5c3RlbUNvbm5lY3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFyVGV4dFN5c3RlbUNvbm5lY3RvciB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0RnVsbE5hbWVzcGFjZVJlcXVlc3QobmFtZXNwYWNlOiBzdHJpbmcsIGxhbmd1YWdlQ29kZTogc3RyaW5nKSA6IFByb21pc2U8TWFwPHN0cmluZywgc3RyaW5nPj4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBTZXJ2aWNlcy50ZXh0U3lzdGVtLmdldE5hbWVzcGFjZVRleHRJdGVtcyhsYW5ndWFnZUNvZGUsIG5hbWVzcGFjZSk7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0U2luZ2xlRW50cnlSZXF1ZXN0KG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0SWQ6IHN0cmluZywgbGFuZ3VhZ2VDb2Rlczogc3RyaW5nKSA6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFNlcnZpY2VzLnRleHRTeXN0ZW0uZ2V0VGV4dChsYW5ndWFnZUNvZGVzLCBuYW1lc3BhY2UsIHRleHRJZCk7XHJcbiAgICB9XHJcbn0iXX0=
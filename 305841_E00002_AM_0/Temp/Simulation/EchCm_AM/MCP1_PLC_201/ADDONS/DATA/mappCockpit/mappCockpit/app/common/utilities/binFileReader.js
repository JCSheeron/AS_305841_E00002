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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The class reads a binary file.
     *
     * @export
     * @class FileReader
     */
    var FileReader = /** @class */ (function () {
        function FileReader() {
        }
        /**
         * Reads the content of a file and returns an ArrayBuffer
         *
         * @static
         * @param {string} fileName
         * @returns {Promise<ArrayBuffer>}
         * @memberof BinFileReader
         */
        FileReader.readBinary = function (fileName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.readFormat(fileName, "arraybuffer")];
                });
            });
        };
        /**
         * Reads the content of a file and returns a string
         *
         * @static
         * @param {string} fileName
         * @returns {Promise<string>}
         * @memberof FileReader
         */
        FileReader.readText = function (fileName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.readFormat(fileName, "text")];
                });
            });
        };
        /**
         * Reads the content of a file and returns a JSON object
         *
         * @static
         * @param {string} fileName
         * @returns {Promise<string>}
         * @memberof FileReader
         */
        FileReader.readJSON = function (fileName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.readFormat(fileName, "json")];
                });
            });
        };
        /**
        * Reads the content of a file and returns the specified format/responsetype
         *
         * @private
         * @static
         * @param {string} fileName
         * @param {XMLHttpRequestResponseType} [responseType=""]
         * @returns {Promise<any>}
         * @memberof FileReader
         */
        FileReader.readFormat = function (fileName, responseType) {
            if (responseType === void 0) { responseType = ""; }
            return __awaiter(this, void 0, void 0, function () {
                var xhrPromise;
                return __generator(this, function (_a) {
                    xhrPromise = new Promise(function (resolve, reject) {
                        try {
                            // prepare the xhr request 
                            var xhr = new XMLHttpRequest();
                            xhr.responseType = responseType;
                            xhr.open("GET", fileName, true);
                            // handle the xhr response
                            xhr.onload = function (xhrEvent) {
                                // because we did request 'arraybuffer' as response type we can return the xhr response data as promise result directly.
                                resolve(xhr.response);
                            };
                            // initiate xhr request
                            xhr.send(null);
                        }
                        catch (error) {
                            // recect becaus of an xhr error
                            reject("FileReader: could not read file: " + fileName);
                        }
                    });
                    return [2 /*return*/, xhrPromise];
                });
            });
        };
        return FileReader;
    }());
    exports.FileReader = FileReader;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluRmlsZVJlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3V0aWxpdGllcy9iaW5GaWxlUmVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQStFQSxDQUFDO1FBNUVHOzs7Ozs7O1dBT0c7UUFDaUIscUJBQVUsR0FBOUIsVUFBK0IsUUFBZ0I7OztvQkFDM0Msc0JBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLEVBQUM7OztTQUNuRDtRQUVEOzs7Ozs7O1dBT0c7UUFDaUIsbUJBQVEsR0FBNUIsVUFBNkIsUUFBZ0I7OztvQkFDekMsc0JBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUM7OztTQUM1QztRQUdEOzs7Ozs7O1dBT0c7UUFDaUIsbUJBQVEsR0FBNUIsVUFBNkIsUUFBZ0I7OztvQkFDekMsc0JBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUM7OztTQUM1QztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNrQixxQkFBVSxHQUEvQixVQUFnQyxRQUFnQixFQUFFLFlBQTZDO1lBQTdDLDZCQUFBLEVBQUEsaUJBQTZDOzs7O29CQUVyRixVQUFVLEdBQUcsSUFBSSxPQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDaEQsSUFBSTs0QkFFQSwyQkFBMkI7NEJBQzNCLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7NEJBQy9CLEdBQUcsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOzRCQUNoQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBRWhDLDBCQUEwQjs0QkFDMUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLFFBQVE7Z0NBRTNCLHdIQUF3SDtnQ0FDeEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDMUIsQ0FBQyxDQUFDOzRCQUVGLHVCQUF1Qjs0QkFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDbEI7d0JBQUMsT0FBTyxLQUFLLEVBQUU7NEJBQ1osZ0NBQWdDOzRCQUNoQyxNQUFNLENBQUMsbUNBQW1DLEdBQUcsUUFBUSxDQUFDLENBQUM7eUJBQzFEO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUVILHNCQUFPLFVBQVUsRUFBQzs7O1NBQ3JCO1FBR0wsaUJBQUM7SUFBRCxDQUFDLEFBL0VELElBK0VDO0lBL0VZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoZSBjbGFzcyByZWFkcyBhIGJpbmFyeSBmaWxlLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBGaWxlUmVhZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmlsZVJlYWRlciB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGNvbnRlbnQgb2YgYSBmaWxlIGFuZCByZXR1cm5zIGFuIEFycmF5QnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheUJ1ZmZlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluRmlsZVJlYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlYWRCaW5hcnkoZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkRm9ybWF0KGZpbGVOYW1lLCBcImFycmF5YnVmZmVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGNvbnRlbnQgb2YgYSBmaWxlIGFuZCByZXR1cm5zIGEgc3RyaW5nIFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTmFtZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBGaWxlUmVhZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVhZFRleHQoZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZEZvcm1hdChmaWxlTmFtZSwgXCJ0ZXh0XCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBjb250ZW50IG9mIGEgZmlsZSBhbmQgcmV0dXJucyBhIEpTT04gb2JqZWN0IFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTmFtZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBGaWxlUmVhZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVhZEpTT04oZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8SlNPTj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRGb3JtYXQoZmlsZU5hbWUsIFwianNvblwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVhZHMgdGhlIGNvbnRlbnQgb2YgYSBmaWxlIGFuZCByZXR1cm5zIHRoZSBzcGVjaWZpZWQgZm9ybWF0L3Jlc3BvbnNldHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWVcclxuICAgICAqIEBwYXJhbSB7WE1MSHR0cFJlcXVlc3RSZXNwb25zZVR5cGV9IFtyZXNwb25zZVR5cGU9XCJcIl1cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgRmlsZVJlYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyByZWFkRm9ybWF0KGZpbGVOYW1lOiBzdHJpbmcsIHJlc3BvbnNlVHlwZTogWE1MSHR0cFJlcXVlc3RSZXNwb25zZVR5cGUgPSBcIlwiKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgY29uc3QgeGhyUHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgdGhlIHhociByZXF1ZXN0IFxyXG4gICAgICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcclxuICAgICAgICAgICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIGZpbGVOYW1lLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgdGhlIHhociByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICh4aHJFdmVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIHdlIGRpZCByZXF1ZXN0ICdhcnJheWJ1ZmZlcicgYXMgcmVzcG9uc2UgdHlwZSB3ZSBjYW4gcmV0dXJuIHRoZSB4aHIgcmVzcG9uc2UgZGF0YSBhcyBwcm9taXNlIHJlc3VsdCBkaXJlY3RseS5cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGluaXRpYXRlIHhociByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICB4aHIuc2VuZChudWxsKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlY2VjdCBiZWNhdXMgb2YgYW4geGhyIGVycm9yXHJcbiAgICAgICAgICAgICAgICByZWplY3QoXCJGaWxlUmVhZGVyOiBjb3VsZCBub3QgcmVhZCBmaWxlOiBcIiArIGZpbGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4geGhyUHJvbWlzZTtcclxuICAgIH1cclxuXHJcblxyXG59Il19
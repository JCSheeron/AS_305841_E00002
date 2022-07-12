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
define(["require", "exports", "./classInfo"], function (require, exports, classInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements a factory for loading classes at runtime and creating instances dynamically *
     * @export
     * @class ClassFactory
     */
    var ClassFactory = /** @class */ (function () {
        function ClassFactory() {
        }
        /**
         * Loads the specified class module
         *
         * @static
         * @param {string} className
         * @memberof ClassFactory
         */
        ClassFactory.loadClass = function (className) {
            return __awaiter(this, void 0, void 0, function () {
                var classPath, classModule, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            classPath = classInfo_1.ClassInfo[className].path;
                            return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require([classPath], resolve_1, reject_1); })];
                        case 1:
                            classModule = _a.sent();
                            // return the loaded class module
                            return [2 /*return*/, classModule];
                        case 2:
                            error_1 = _a.sent();
                            console.error("ClassFactory: Could not load class %o %o! ", className, error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Registers a type (class) by its class name
         *
         * @static
         * @param {string} className
         * @param {TConstructor} classType
         * @memberof ClassFactory
         */
        ClassFactory.registerDynamicClass = function (className, classType) {
            this._classMap.set(className, classType);
        };
        /**
         * Creates an instance of the specified class
         *
         * @static
         * @template TYPE
         * @param {string} typeName
         * @param {string} [instanceId=""]
         * @returns {(TYPE|null)}
         * @memberof ClassFactory
         */
        ClassFactory.createInstance = function (typeName, instanceId) {
            if (instanceId === void 0) { instanceId = ""; }
            var instance = undefined;
            if (this._classMap.has(typeName)) {
                // get the class constructor
                var typeConstructor = this._classMap.get(typeName);
                // a type constructor is needed for creating an instance
                if (typeConstructor) {
                    // if a named instance is requested ....
                    if (instanceId !== "") {
                        // if an instance for this id already exists ..
                        if (this._instanceMap.has(instanceId)) {
                            // .. we just get the existing instance.
                            instance = this._instanceMap.get(instanceId);
                        }
                        else {
                            // otherwise we create a new instance ...
                            instance = new typeConstructor();
                            // ... and save it under the specified id
                            this._instanceMap.set(instanceId, instance);
                        }
                    }
                    else {
                        // otherwise we jsut create a new instance
                        instance = new typeConstructor();
                    }
                }
            }
            return instance;
        };
        /**
         * verifies if the class factory contains the requestd type and instance
         *
         * @static
         * @template TYPE
         * @param {string} className
         * @param {string} [instanceId=""]
         * @returns {boolean}
         * @memberof ClassFactory
         */
        ClassFactory.contains = function (className, instanceId) {
            if (instanceId === void 0) { instanceId = ""; }
            return instanceId !== "" ? this._classMap.has(className) && this._instanceMap.has(instanceId) : this._classMap.has(className);
        };
        // holds a type name to class constructor map
        ClassFactory._classMap = new Map();
        // holds a id to instance map
        ClassFactory._instanceMap = new Map();
        return ClassFactory;
    }());
    exports.ClassFactory = ClassFactory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9mYWN0b3J5L2NsYXNzRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTs7OztPQUlHO0lBRUg7UUFBQTtRQTJHQSxDQUFDO1FBcEdHOzs7Ozs7V0FNRztRQUNVLHNCQUFTLEdBQXRCLFVBQXVCLFNBQWlCOzs7Ozs7OzRCQUsxQixTQUFTLEdBQUcscUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBRTFCLDJFQUFhLFNBQVMsNkJBQUM7OzRCQUFyQyxXQUFXLEdBQUcsU0FBdUI7NEJBRXpDLGlDQUFpQzs0QkFDakMsc0JBQU8sV0FBVyxFQUFDOzs7NEJBR25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsNENBQTRDLEVBQUMsU0FBUyxFQUFDLE9BQUssQ0FBQyxDQUFDOzs7Ozs7U0FFbkY7UUFJRDs7Ozs7OztXQU9HO1FBQ1csaUNBQW9CLEdBQWxDLFVBQW1DLFNBQWdCLEVBQUUsU0FBdUI7WUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFJRDs7Ozs7Ozs7O1dBU0c7UUFDVywyQkFBYyxHQUE1QixVQUFtQyxRQUFlLEVBQUMsVUFBc0I7WUFBdEIsMkJBQUEsRUFBQSxlQUFzQjtZQUNyRSxJQUFJLFFBQVEsR0FBTyxTQUFTLENBQUM7WUFFN0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFFOUIsNEJBQTRCO2dCQUM1QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFbkQsd0RBQXdEO2dCQUN4RCxJQUFJLGVBQWUsRUFBRTtvQkFFakIsd0NBQXdDO29CQUN4QyxJQUFJLFVBQVUsS0FBSyxFQUFFLEVBQUU7d0JBRW5CLCtDQUErQzt3QkFDL0MsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDbkMsd0NBQXdDOzRCQUN4QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ2hEOzZCQUFJOzRCQUNELHlDQUF5Qzs0QkFDekMsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7NEJBQ2pDLHlDQUF5Qzs0QkFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUM5QztxQkFFSjt5QkFBSTt3QkFDRCwwQ0FBMEM7d0JBQzFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO3FCQUNwQztpQkFDSjthQUNKO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUdEOzs7Ozs7Ozs7V0FTRztRQUNXLHFCQUFRLEdBQXRCLFVBQTZCLFNBQWdCLEVBQUUsVUFBc0I7WUFBdEIsMkJBQUEsRUFBQSxlQUFzQjtZQUNqRSxPQUFPLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsSSxDQUFDO1FBdEdELDZDQUE2QztRQUM5QixzQkFBUyxHQUE2QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQy9ELDZCQUE2QjtRQUNkLHlCQUFZLEdBQXVCLElBQUksR0FBRyxFQUFFLENBQUM7UUFzR2hFLG1CQUFDO0tBQUEsQUEzR0QsSUEyR0M7SUEzR1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUQ29uc3RydWN0b3IgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuaW1wb3J0IHsgQ2xhc3NJbmZvIH0gZnJvbSBcIi4vY2xhc3NJbmZvXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgYSBmYWN0b3J5IGZvciBsb2FkaW5nIGNsYXNzZXMgYXQgcnVudGltZSBhbmQgY3JlYXRpbmcgaW5zdGFuY2VzIGR5bmFtaWNhbGx5ICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ2xhc3NGYWN0b3J5XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENsYXNzRmFjdG9yeXtcclxuXHJcbiAgICAvLyBob2xkcyBhIHR5cGUgbmFtZSB0byBjbGFzcyBjb25zdHJ1Y3RvciBtYXBcclxuICAgIHByaXZhdGUgc3RhdGljIF9jbGFzc01hcDogTWFwPHN0cmluZyxUQ29uc3RydWN0b3I+ID0gbmV3IE1hcCgpOyBcclxuICAgIC8vIGhvbGRzIGEgaWQgdG8gaW5zdGFuY2UgbWFwXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2VNYXA6IE1hcDxzdHJpbmcsb2JqZWN0PiA9IG5ldyBNYXAoKTsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3BlY2lmaWVkIGNsYXNzIG1vZHVsZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICAgICAqIEBtZW1iZXJvZiBDbGFzc0ZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGxvYWRDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzIHBhdGhcclxuICAgICAgICAgICAgY29uc3QgY2xhc3NQYXRoID0gQ2xhc3NJbmZvW2NsYXNzTmFtZV0ucGF0aDtcclxuICAgICAgICAgICAgLy8gaW1wb3J0IHRoZSBjbGFzcyBtb2R1bGUgXHJcbiAgICAgICAgICAgIGxldCBjbGFzc01vZHVsZSA9IGF3YWl0IGltcG9ydChjbGFzc1BhdGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBsb2FkZWQgY2xhc3MgbW9kdWxlXHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzc01vZHVsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNsYXNzRmFjdG9yeTogQ291bGQgbm90IGxvYWQgY2xhc3MgJW8gJW8hIFwiLGNsYXNzTmFtZSxlcnJvcik7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyBhIHR5cGUgKGNsYXNzKSBieSBpdHMgY2xhc3MgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICAgICAqIEBwYXJhbSB7VENvbnN0cnVjdG9yfSBjbGFzc1R5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDbGFzc0ZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlckR5bmFtaWNDbGFzcyhjbGFzc05hbWU6c3RyaW5nLCBjbGFzc1R5cGU6IFRDb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgIHRoaXMuX2NsYXNzTWFwLnNldChjbGFzc05hbWUsY2xhc3NUeXBlKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIGNsYXNzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHRlbXBsYXRlIFRZUEVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpbnN0YW5jZUlkPVwiXCJdXHJcbiAgICAgKiBAcmV0dXJucyB7KFRZUEV8bnVsbCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2xhc3NGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlSW5zdGFuY2U8VFlQRT4odHlwZU5hbWU6c3RyaW5nLGluc3RhbmNlSWQ6c3RyaW5nID0gXCJcIik6VFlQRXxudWxse1xyXG4gICAgICAgIGxldCBpbnN0YW5jZTphbnkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2NsYXNzTWFwLmhhcyh0eXBlTmFtZSkpIHtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAgICBsZXQgdHlwZUNvbnN0cnVjdG9yID0gdGhpcy5fY2xhc3NNYXAuZ2V0KHR5cGVOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGEgdHlwZSBjb25zdHJ1Y3RvciBpcyBuZWVkZWQgZm9yIGNyZWF0aW5nIGFuIGluc3RhbmNlXHJcbiAgICAgICAgICAgIGlmICh0eXBlQ29uc3RydWN0b3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBhIG5hbWVkIGluc3RhbmNlIGlzIHJlcXVlc3RlZCAuLi4uXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VJZCAhPT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbiBpbnN0YW5jZSBmb3IgdGhpcyBpZCBhbHJlYWR5IGV4aXN0cyAuLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZU1hcC5oYXMoaW5zdGFuY2VJZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLi4gd2UganVzdCBnZXQgdGhlIGV4aXN0aW5nIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlTWFwLmdldChpbnN0YW5jZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSAuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgdHlwZUNvbnN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLiBhbmQgc2F2ZSBpdCB1bmRlciB0aGUgc3BlY2lmaWVkIGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlTWFwLnNldChpbnN0YW5jZUlkLGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIGpzdXQgY3JlYXRlIGEgbmV3IGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgdHlwZUNvbnN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgfSAgXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmVyaWZpZXMgaWYgdGhlIGNsYXNzIGZhY3RvcnkgY29udGFpbnMgdGhlIHJlcXVlc3RkIHR5cGUgYW5kIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHRlbXBsYXRlIFRZUEVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbaW5zdGFuY2VJZD1cIlwiXVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2xhc3NGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29udGFpbnM8VFlQRT4oY2xhc3NOYW1lOnN0cmluZywgaW5zdGFuY2VJZDpzdHJpbmcgPSBcIlwiKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZUlkICE9PSBcIlwiID8gdGhpcy5fY2xhc3NNYXAuaGFzKGNsYXNzTmFtZSkgJiYgdGhpcy5faW5zdGFuY2VNYXAuaGFzKGluc3RhbmNlSWQpIDogdGhpcy5fY2xhc3NNYXAuaGFzKGNsYXNzTmFtZSk7XHJcbiAgICB9ICBcclxuXHJcblxyXG59Il19
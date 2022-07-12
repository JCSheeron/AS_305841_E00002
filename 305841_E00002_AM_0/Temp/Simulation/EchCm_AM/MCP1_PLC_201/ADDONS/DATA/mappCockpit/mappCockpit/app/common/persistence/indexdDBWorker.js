"use strict";
//import { IndexedDBCommand } from "./interfaces/indexeddbCommandInterface.js";
// TODO: change to "import type" in ts version 3.8+
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
//import type {IndexedDBCommand} from "./interfaces/indexeddbCommandInterface.js"
var IndexedDBCommandMessage;
(function (IndexedDBCommandMessage) {
    IndexedDBCommandMessage["clear"] = "clear";
    IndexedDBCommandMessage["init"] = "init";
    IndexedDBCommandMessage["store"] = "store";
    IndexedDBCommandMessage["load"] = "load";
    IndexedDBCommandMessage["success"] = "success";
    IndexedDBCommandMessage["error"] = "error";
})(IndexedDBCommandMessage || (IndexedDBCommandMessage = {}));
;
var IndexedDBCommand = /** @class */ (function () {
    function IndexedDBCommand(message, data) {
        this.message = message;
        this.data = data;
    }
    return IndexedDBCommand;
}());
;
var database;
var objectStore;
var _location;
var _store;
/**
 * initialize database
 *
 * @param {*} data
 */
function initDatabase(data, resolve, reject, version) {
    if (version === void 0) { version = 1; }
    _location = data.location + "_" + data.version;
    _store = "data_" + data.version;
    var request = indexedDB.open(_location, version);
    request.onupgradeneeded = function (e) {
        database = e.target.result;
        objectStore = database.createObjectStore(_store);
    };
    request.onsuccess = function (e) {
        database = request.result;
        var dbCommand = new IndexedDBCommand(IndexedDBCommandMessage.success, { message: "database initialized" });
        self.postMessage(dbCommand);
    };
    request.onerror = function (e) {
        var dbCommand = new IndexedDBCommand(IndexedDBCommandMessage.error, { message: "error while init database" });
        self.postMessage(dbCommand);
    };
}
/**
 * store data in the database for a specific key
 *
 * @param {*} data : {key : string, data: any}
 */
function storeData(data) {
    if (database == undefined) {
        console.error("IndexedDb not initialized! Storing data not possible.");
        return;
    }
    var transaction = database.transaction(_store, 'readwrite');
    var store = transaction.objectStore(_store);
    var request;
    if (data.key != undefined) {
        if (data.data != undefined) {
            request = store.put(data.data, data.key);
        }
        else {
            request = store.delete(data.key);
        }
        request.onsuccess = function () {
            self.postMessage(new IndexedDBCommand(IndexedDBCommandMessage.store, { message: "stored element for key: " + data.key }));
        };
        request.onerror = function (event) {
            self.postMessage(new IndexedDBCommand(IndexedDBCommandMessage.error, { message: "error storeing element for key: " + data.key }));
        };
    }
    else {
        console.log("idbworker error: no key provide to store data");
    }
}
/**
 * load all data from database and post result to main thread
 *
 *
 */
function loadData() {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, store, storedata, request;
        return __generator(this, function (_a) {
            if (database == undefined) {
                console.error("IndexedDb not initialized! Loading data not possible.");
                return [2 /*return*/];
            }
            transaction = database.transaction(_store, 'readonly');
            store = transaction.objectStore(_store);
            storedata = {};
            request = store.openCursor();
            request.onerror = function (event) {
                self.postMessage(new IndexedDBCommand(IndexedDBCommandMessage.error, { message: "error loading data" }));
            };
            request.onsuccess = function (event) {
                if (event != null) {
                    var cursor = event.target.result;
                    if (cursor) {
                        var key = cursor.primaryKey;
                        var value = cursor.value;
                        storedata[key] = value;
                        cursor.continue();
                    }
                    else {
                        self.postMessage(new IndexedDBCommand(IndexedDBCommandMessage.load, { message: "loaded all data from database", data: storedata }));
                    }
                }
            };
            return [2 /*return*/];
        });
    });
}
/**
 * remove all data from the database
 *
 */
function clear(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            /* delete all databases will come later
            // @ts-ignore
            let databases = await indexedDB.databases()
        
            console.log(databases);
        
            for(let i = 0; i < databases.length; i++){
                console.log(databases[i].name);
                indexedDB.deleteDatabase(databases[i].name)
            }
        
            */
            _location = data.location + "_" + data.version;
            indexedDB.deleteDatabase(_location);
            return [2 /*return*/];
        });
    });
}
/**
 * handle command recieved from main thread
 *
 *
 */
onmessage = function onmessage(event) {
    var command = event.data;
    switch (command.message) {
        case IndexedDBCommandMessage.init:
            {
                initDatabase(command.data);
                break;
            }
        case IndexedDBCommandMessage.store:
            {
                storeData(command.data);
                break;
            }
        case IndexedDBCommandMessage.load:
            {
                loadData();
                break;
            }
        case IndexedDBCommandMessage.clear:
            {
                clear(command.data);
                break;
            }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhkREJXb3JrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbmRleGREQldvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0VBQStFO0FBQy9FLG1EQUFtRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVuRCxpRkFBaUY7QUFDakYsSUFBSyx1QkFPSjtBQVBELFdBQUssdUJBQXVCO0lBQ3hCLDBDQUFlLENBQUE7SUFDZix3Q0FBYSxDQUFBO0lBQ2IsMENBQWUsQ0FBQTtJQUNmLHdDQUFhLENBQUE7SUFDYiw4Q0FBbUIsQ0FBQTtJQUNuQiwwQ0FBZSxDQUFBO0FBQ25CLENBQUMsRUFQSSx1QkFBdUIsS0FBdkIsdUJBQXVCLFFBTzNCO0FBQUEsQ0FBQztBQUVGO0lBSUksMEJBQVksT0FBZ0MsRUFBRSxJQUFTO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBQUEsQ0FBQztBQUVGLElBQUksUUFBcUIsQ0FBQztBQUMxQixJQUFJLFdBQTJCLENBQUM7QUFFaEMsSUFBSSxTQUFpQixDQUFDO0FBQ3RCLElBQUksTUFBYyxDQUFDO0FBRW5COzs7O0dBSUc7QUFDSCxTQUFTLFlBQVksQ0FBQyxJQUFTLEVBQUUsT0FBUSxFQUFFLE1BQU8sRUFBRSxPQUFXO0lBQVgsd0JBQUEsRUFBQSxXQUFXO0lBQzNELFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzlDLE1BQU0sR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUVoQyxJQUFJLE9BQU8sR0FBcUIsU0FBUyxDQUFDLElBQUksQ0FBQyxT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TyxHQUFxQixLQUFLLENBQUMsSUFBSSxDQUFDO0lBRTNDLFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNyQixLQUFLLHVCQUF1QixDQUFDLElBQUk7WUFDN0I7Z0JBQ0ksWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsTUFBTTthQUNUO1FBRUwsS0FBSyx1QkFBdUIsQ0FBQyxLQUFLO1lBQzlCO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3ZCLE1BQU07YUFDVDtRQUVMLEtBQUssdUJBQXVCLENBQUMsSUFBSTtZQUM3QjtnQkFDSSxRQUFRLEVBQUUsQ0FBQztnQkFDWCxNQUFNO2FBQ1Q7UUFDTCxLQUFLLHVCQUF1QixDQUFDLEtBQUs7WUFDOUI7Z0JBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsTUFBTTthQUNUO0tBQ1I7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCB7IEluZGV4ZWREQkNvbW1hbmQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2luZGV4ZWRkYkNvbW1hbmRJbnRlcmZhY2UuanNcIjtcclxuLy8gVE9ETzogY2hhbmdlIHRvIFwiaW1wb3J0IHR5cGVcIiBpbiB0cyB2ZXJzaW9uIDMuOCtcclxuXHJcbi8vaW1wb3J0IHR5cGUge0luZGV4ZWREQkNvbW1hbmR9IGZyb20gXCIuL2ludGVyZmFjZXMvaW5kZXhlZGRiQ29tbWFuZEludGVyZmFjZS5qc1wiXHJcbmVudW0gSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uge1xyXG4gICAgY2xlYXIgPSBcImNsZWFyXCIsXHJcbiAgICBpbml0ID0gXCJpbml0XCIsXHJcbiAgICBzdG9yZSA9IFwic3RvcmVcIixcclxuICAgIGxvYWQgPSBcImxvYWRcIixcclxuICAgIHN1Y2Nlc3MgPSBcInN1Y2Nlc3NcIixcclxuICAgIGVycm9yID0gXCJlcnJvclwiXHJcbn07XHJcblxyXG5jbGFzcyBJbmRleGVkREJDb21tYW5ke1xyXG4gICAgbWVzc2FnZTogSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2U7XHJcbiAgICBkYXRhOiBhbnk7IFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IEluZGV4ZWREQkNvbW1hbmRNZXNzYWdlLCBkYXRhOiBhbnkpe1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH0gXHJcbn07XHJcblxyXG52YXIgZGF0YWJhc2U6IElEQkRhdGFiYXNlO1xyXG5sZXQgb2JqZWN0U3RvcmU6IElEQk9iamVjdFN0b3JlO1xyXG5cclxubGV0IF9sb2NhdGlvbjogc3RyaW5nO1xyXG5sZXQgX3N0b3JlOiBzdHJpbmc7XHJcblxyXG4vKipcclxuICogaW5pdGlhbGl6ZSBkYXRhYmFzZVxyXG4gKlxyXG4gKiBAcGFyYW0geyp9IGRhdGFcclxuICovXHJcbmZ1bmN0aW9uIGluaXREYXRhYmFzZShkYXRhOiBhbnksIHJlc29sdmU/LCByZWplY3Q/LCB2ZXJzaW9uID0gMSkge1xyXG4gICAgX2xvY2F0aW9uID0gZGF0YS5sb2NhdGlvbiArIFwiX1wiKyBkYXRhLnZlcnNpb247XHJcbiAgICBfc3RvcmUgPSBcImRhdGFfXCIgKyBkYXRhLnZlcnNpb247XHJcblxyXG4gICAgbGV0IHJlcXVlc3Q6IElEQk9wZW5EQlJlcXVlc3QgPSBpbmRleGVkREIub3BlbihfbG9jYXRpb24sIHZlcnNpb24pO1xyXG5cclxuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBkYXRhYmFzZSA9IChlLnRhcmdldCBhcyBhbnkpLnJlc3VsdDtcclxuICAgICAgICBvYmplY3RTdG9yZSA9IGRhdGFiYXNlLmNyZWF0ZU9iamVjdFN0b3JlKF9zdG9yZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBkYXRhYmFzZSA9IHJlcXVlc3QucmVzdWx0O1xyXG4gICAgICAgICAgICBsZXQgZGJDb21tYW5kOiBJbmRleGVkREJDb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uuc3VjY2Vzcywge21lc3NhZ2U6IFwiZGF0YWJhc2UgaW5pdGlhbGl6ZWRcIn0pO1xyXG4gICAgICAgICAgICAoc2VsZiBhcyB1bmtub3duIGFzIFdvcmtlcikucG9zdE1lc3NhZ2UoZGJDb21tYW5kKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgZGJDb21tYW5kOiBJbmRleGVkREJDb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuZXJyb3IsIHttZXNzYWdlOiBcImVycm9yIHdoaWxlIGluaXQgZGF0YWJhc2VcIn0pO1xyXG4gICAgICAgIChzZWxmIGFzIHVua25vd24gYXMgV29ya2VyKS5wb3N0TWVzc2FnZShkYkNvbW1hbmQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHN0b3JlIGRhdGEgaW4gdGhlIGRhdGFiYXNlIGZvciBhIHNwZWNpZmljIGtleVxyXG4gKlxyXG4gKiBAcGFyYW0geyp9IGRhdGEgOiB7a2V5IDogc3RyaW5nLCBkYXRhOiBhbnl9XHJcbiAqL1xyXG5mdW5jdGlvbiBzdG9yZURhdGEoZGF0YSkge1xyXG4gICAgaWYoZGF0YWJhc2UgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXhlZERiIG5vdCBpbml0aWFsaXplZCEgU3RvcmluZyBkYXRhIG5vdCBwb3NzaWJsZS5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0cmFuc2FjdGlvbiA9IGRhdGFiYXNlLnRyYW5zYWN0aW9uKF9zdG9yZSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgbGV0IHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoX3N0b3JlKTtcclxuICAgIGxldCByZXF1ZXN0O1xyXG5cclxuICAgIGlmKGRhdGEua2V5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoZGF0YS5kYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJlcXVlc3QgPSBzdG9yZS5wdXQoZGF0YS5kYXRhLCBkYXRhLmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJlcXVlc3QgPSBzdG9yZS5kZWxldGUoZGF0YS5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHsgIFxyXG4gICAgICAgICAgICAoc2VsZiBhcyB1bmtub3duIGFzIFdvcmtlcikucG9zdE1lc3NhZ2UobmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uuc3RvcmUsIHttZXNzYWdlOiBcInN0b3JlZCBlbGVtZW50IGZvciBrZXk6IFwiICsgZGF0YS5rZXl9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAoc2VsZiBhcyB1bmtub3duIGFzIFdvcmtlcikucG9zdE1lc3NhZ2UobmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuZXJyb3IsIHttZXNzYWdlOiBcImVycm9yIHN0b3JlaW5nIGVsZW1lbnQgZm9yIGtleTogXCIgKyBkYXRhLmtleX0pKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImlkYndvcmtlciBlcnJvcjogbm8ga2V5IHByb3ZpZGUgdG8gc3RvcmUgZGF0YVwiKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIGxvYWQgYWxsIGRhdGEgZnJvbSBkYXRhYmFzZSBhbmQgcG9zdCByZXN1bHQgdG8gbWFpbiB0aHJlYWRcclxuICpcclxuICogXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBsb2FkRGF0YSgpIHtcclxuICAgIGlmKGRhdGFiYXNlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4ZWREYiBub3QgaW5pdGlhbGl6ZWQhIExvYWRpbmcgZGF0YSBub3QgcG9zc2libGUuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCB0cmFuc2FjdGlvbiA9IGRhdGFiYXNlLnRyYW5zYWN0aW9uKF9zdG9yZSwgJ3JlYWRvbmx5Jyk7XHJcbiAgICBsZXQgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShfc3RvcmUpO1xyXG4gICBcclxuICAgIGxldCBzdG9yZWRhdGEgPSB7fVxyXG4gICAgbGV0IHJlcXVlc3QgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XHJcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAoc2VsZiBhcyB1bmtub3duIGFzIFdvcmtlcikucG9zdE1lc3NhZ2UobmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuZXJyb3IsIHttZXNzYWdlOiBcImVycm9yIGxvYWRpbmcgZGF0YVwifSkpO1xyXG4gICAgfTtcclxuICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGN1cnNvciA9IChldmVudC50YXJnZXQgYXMgYW55KS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3IpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBjdXJzb3IucHJpbWFyeUtleTtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHN0b3JlZGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIChzZWxmIGFzIHVua25vd24gYXMgV29ya2VyKS5wb3N0TWVzc2FnZShuZXcgSW5kZXhlZERCQ29tbWFuZChJbmRleGVkREJDb21tYW5kTWVzc2FnZS5sb2FkLCB7bWVzc2FnZTogXCJsb2FkZWQgYWxsIGRhdGEgZnJvbSBkYXRhYmFzZVwiLCBkYXRhOiBzdG9yZWRhdGEgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW1vdmUgYWxsIGRhdGEgZnJvbSB0aGUgZGF0YWJhc2VcclxuICpcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGNsZWFyKGRhdGEpe1xyXG4gICAgLyogZGVsZXRlIGFsbCBkYXRhYmFzZXMgd2lsbCBjb21lIGxhdGVyXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBsZXQgZGF0YWJhc2VzID0gYXdhaXQgaW5kZXhlZERCLmRhdGFiYXNlcygpXHJcblxyXG4gICAgY29uc29sZS5sb2coZGF0YWJhc2VzKTtcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YWJhc2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhYmFzZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKGRhdGFiYXNlc1tpXS5uYW1lKVxyXG4gICAgfVxyXG5cclxuICAgICovXHJcbiAgICBfbG9jYXRpb24gPSBkYXRhLmxvY2F0aW9uICsgXCJfXCIrIGRhdGEudmVyc2lvbjtcclxuICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShfbG9jYXRpb24pO1xyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIGNvbW1hbmQgcmVjaWV2ZWQgZnJvbSBtYWluIHRocmVhZFxyXG4gKlxyXG4gKiBcclxuICovXHJcbm9ubWVzc2FnZSA9IGZ1bmN0aW9uIG9ubWVzc2FnZShldmVudCkge1xyXG4gICAgbGV0IGNvbW1hbmQ6IEluZGV4ZWREQkNvbW1hbmQgPSBldmVudC5kYXRhO1xyXG5cclxuICAgIHN3aXRjaCAoY29tbWFuZC5tZXNzYWdlKSB7XHJcbiAgICAgICAgY2FzZSBJbmRleGVkREJDb21tYW5kTWVzc2FnZS5pbml0OlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbml0RGF0YWJhc2UoY29tbWFuZC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uuc3RvcmU6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0b3JlRGF0YShjb21tYW5kLmRhdGEpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIEluZGV4ZWREQkNvbW1hbmRNZXNzYWdlLmxvYWQ6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuY2xlYXI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyKGNvbW1hbmQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
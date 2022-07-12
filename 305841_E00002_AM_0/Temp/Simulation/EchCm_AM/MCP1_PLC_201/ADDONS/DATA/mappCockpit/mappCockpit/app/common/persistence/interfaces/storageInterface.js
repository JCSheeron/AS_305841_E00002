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
define(["require", "exports", "../../../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StorageEventNotificationType;
    (function (StorageEventNotificationType) {
        StorageEventNotificationType[StorageEventNotificationType["dataLoaded"] = 0] = "dataLoaded";
        StorageEventNotificationType[StorageEventNotificationType["dataSaved"] = 1] = "dataSaved";
        StorageEventNotificationType[StorageEventNotificationType["storageConnected"] = 2] = "storageConnected";
        StorageEventNotificationType[StorageEventNotificationType["storageCleared"] = 3] = "storageCleared";
        StorageEventNotificationType[StorageEventNotificationType["error"] = 4] = "error";
    })(StorageEventNotificationType = exports.StorageEventNotificationType || (exports.StorageEventNotificationType = {}));
    var StorageEventNotificationArgs = /** @class */ (function () {
        function StorageEventNotificationArgs(type, data) {
            this.type = type;
            this.data = data;
        }
        return StorageEventNotificationArgs;
    }());
    exports.StorageEventNotificationArgs = StorageEventNotificationArgs;
    var StorageEventNotification = /** @class */ (function (_super) {
        __extends(StorageEventNotification, _super);
        function StorageEventNotification() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StorageEventNotification;
    }(events_1.TypedEvent));
    exports.StorageEventNotification = StorageEventNotification;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc3RvcmFnZUludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBRUEsSUFBWSw0QkFNWDtJQU5ELFdBQVksNEJBQTRCO1FBQ3BDLDJGQUFVLENBQUE7UUFDVix5RkFBUyxDQUFBO1FBQ1QsdUdBQWdCLENBQUE7UUFDaEIsbUdBQWMsQ0FBQTtRQUNkLGlGQUFLLENBQUE7SUFDVCxDQUFDLEVBTlcsNEJBQTRCLEdBQTVCLG9DQUE0QixLQUE1QixvQ0FBNEIsUUFNdkM7SUFFRDtRQUlJLHNDQUFZLElBQWtDLEVBQUUsSUFBUztZQUNyRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBUkQsSUFRQztJQVJZLG9FQUE0QjtJQVV6QztRQUE4Qyw0Q0FBa0Q7UUFBaEc7O1FBQWtHLENBQUM7UUFBRCwrQkFBQztJQUFELENBQUMsQUFBbkcsQ0FBOEMsbUJBQVUsR0FBMkM7SUFBdEYsNERBQXdCO0lBQThELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0b3JhZ2VFdmVudE5vdGlmaWNhdGlvblR5cGV7XHJcbiAgICBkYXRhTG9hZGVkLFxyXG4gICAgZGF0YVNhdmVkLFxyXG4gICAgc3RvcmFnZUNvbm5lY3RlZCxcclxuICAgIHN0b3JhZ2VDbGVhcmVkLFxyXG4gICAgZXJyb3IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25Bcmdze1xyXG4gICAgdHlwZTogU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uVHlwZTtcclxuICAgIGRhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25UeXBlLCBkYXRhOiBhbnkpe1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VFdmVudE5vdGlmaWNhdGlvbiBleHRlbmRzIFR5cGVkRXZlbnQ8SVN0b3JhZ2UsIFN0b3JhZ2VFdmVudE5vdGlmaWNhdGlvbkFyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RvcmFnZXtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTb21lIGV2ZW50cyBmcm9tIHRoZSBzdG9yYWdlKGUuZyBkYXRhTG9hZGVkLCBzdG9yYWdlSW5pdGlhbGl6ZWQsLi4uKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtTdG9yYWdlRXZlbnROb3RpZmljYXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgSVN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgZXZlbnROb3RpZmljYXRpb246IFN0b3JhZ2VFdmVudE5vdGlmaWNhdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYSBwYXRoIG9yIGFuIGlkIGZvciB0aGUgbG9jYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBJU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBjb25uZWN0U3RvcmFnZShsb2NhdGlvbjogc3RyaW5nKTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBsb2FkIGRhdGEgZnJvbSB0aGUgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIElTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIGxvYWREYXRhKCk6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlIHRoZSBkYXRhIGxvYWRlZCBhc3luY2hyb25vdXNseSBmcm9tIHN0b3JhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBJU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICAvL3JldHJpZXZlRGF0YSgpIDogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIGRhdGEgdG8gdGhlIHN0b3JhZ2UgZm9yIGEgc3BlY2lmaWMga2V5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgSVN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgc2F2ZURhdGEoa2V5OiBzdHJpbmcsIGRhdGE6IGFueSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBkYXRhIGZyb20gc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBjbGVhcigpO1xyXG59Il19
define(["require", "exports", "../objParser/nwctTypeEnums"], function (require, exports, nwctTypeEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctDataEntryWrapper = /** @class */ (function () {
        function NwctDataEntryWrapper(dataEntry) {
            this.wConfigEntry = undefined;
            this.response = undefined;
            this.request = undefined;
            this._dataEntry = dataEntry;
        }
        Object.defineProperty(NwctDataEntryWrapper.prototype, "dataEntry", {
            get: function () {
                return this._dataEntry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctDataEntryWrapper.prototype, "isRequest", {
            get: function () {
                // first check if there is a config entry at all
                if (this.wConfigEntry === undefined ||
                    !this.wConfigEntry.configEntry.datagramType.valid) {
                    return false;
                }
                var datagramType = this.wConfigEntry.configEntry.datagramType.value;
                // check if this is a read request, read response, write request or write response
                return datagramType === nwctTypeEnums_1.NwctDatagramType.READ_REQUEST ||
                    datagramType === nwctTypeEnums_1.NwctDatagramType.WRITE_REQUEST;
            },
            enumerable: true,
            configurable: true
        });
        return NwctDataEntryWrapper;
    }());
    exports.NwctDataEntryWrapper = NwctDataEntryWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdERhdGFFbnRyeVdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9ud2N0UHJvdmlkZXIvZW5yaWNobWVudC9ud2N0RGF0YUVudHJ5V3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQU9JLDhCQUFtQixTQUEwQjtZQUp0QyxpQkFBWSxHQUF3QyxTQUFTLENBQUM7WUFDOUQsYUFBUSxHQUFzQyxTQUFTLENBQUM7WUFDeEQsWUFBTyxHQUFzQyxTQUFTLENBQUM7WUFHMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDaEMsQ0FBQztRQUdELHNCQUFXLDJDQUFTO2lCQUFwQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQzs7O1dBQUE7UUFHRCxzQkFBVywyQ0FBUztpQkFBcEI7Z0JBRUksZ0RBQWdEO2dCQUNoRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUztvQkFDL0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFDO29CQUNsRCxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBRUQsSUFBSSxZQUFZLEdBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFFN0Usa0ZBQWtGO2dCQUNsRixPQUFRLFlBQVksS0FBSyxnQ0FBZ0IsQ0FBQyxZQUFZO29CQUM5QyxZQUFZLEtBQUssZ0NBQWdCLENBQUMsYUFBYSxDQUFDO1lBRTVELENBQUM7OztXQUFBO1FBSUwsMkJBQUM7SUFBRCxDQUFDLEFBbkNELElBbUNDO0lBbkNZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElOd2N0RGF0YUVudHJ5IH0gZnJvbSBcIi4uL29ialBhcnNlci9pbnRlcmZhY2VzL253Y3REYXRhRW50cnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTndjdERhdGFncmFtVHlwZSB9IGZyb20gXCIuLi9vYmpQYXJzZXIvbndjdFR5cGVFbnVtc1wiO1xyXG5pbXBvcnQgeyBOd2N0Q29uZmlnRW50cnlXcmFwcGVyIH0gZnJvbSBcIi4vbndjdENvbmZpZ0VudHJ5V3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE53Y3REYXRhRW50cnlXcmFwcGVye1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGFFbnRyeSA6IElOd2N0RGF0YUVudHJ5O1xyXG4gICAgcHVibGljIHdDb25maWdFbnRyeSA6IE53Y3RDb25maWdFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgcmVzcG9uc2UgOiBOd2N0RGF0YUVudHJ5V3JhcHBlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyByZXF1ZXN0IDogTndjdERhdGFFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRhdGFFbnRyeSA6IElOd2N0RGF0YUVudHJ5KXtcclxuICAgICAgICB0aGlzLl9kYXRhRW50cnkgPSBkYXRhRW50cnk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YUVudHJ5KCkgOiBJTndjdERhdGFFbnRyeXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YUVudHJ5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzUmVxdWVzdCgpIDogYm9vbGVhbnsgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIGZpcnN0IGNoZWNrIGlmIHRoZXJlIGlzIGEgY29uZmlnIGVudHJ5IGF0IGFsbFxyXG4gICAgICAgIGlmKCB0aGlzLndDb25maWdFbnRyeSA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICF0aGlzLndDb25maWdFbnRyeS5jb25maWdFbnRyeS5kYXRhZ3JhbVR5cGUudmFsaWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YWdyYW1UeXBlIDogbnVtYmVyID0gdGhpcy53Q29uZmlnRW50cnkuY29uZmlnRW50cnkuZGF0YWdyYW1UeXBlLnZhbHVlO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIGEgcmVhZCByZXF1ZXN0LCByZWFkIHJlc3BvbnNlLCB3cml0ZSByZXF1ZXN0IG9yIHdyaXRlIHJlc3BvbnNlXHJcbiAgICAgICAgcmV0dXJuICBkYXRhZ3JhbVR5cGUgPT09IE53Y3REYXRhZ3JhbVR5cGUuUkVBRF9SRVFVRVNUIHx8IFxyXG4gICAgICAgICAgICAgICAgZGF0YWdyYW1UeXBlID09PSBOd2N0RGF0YWdyYW1UeXBlLldSSVRFX1JFUVVFU1Q7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59Il19
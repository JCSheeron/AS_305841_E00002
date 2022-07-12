define(["require", "exports", "./nwctDataEntriesWrapper"], function (require, exports, nwctDataEntriesWrapper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctConfigEntryWrapper = /** @class */ (function () {
        function NwctConfigEntryWrapper(configEntry) {
            this._relevantDataEntries = new nwctDataEntriesWrapper_1.NwctDataEntriesWrapper();
            this._configEntry = configEntry;
        }
        Object.defineProperty(NwctConfigEntryWrapper.prototype, "configEntry", {
            get: function () {
                return this._configEntry;
            },
            enumerable: true,
            configurable: true
        });
        NwctConfigEntryWrapper.prototype.addDataEntryRef = function (wDataEntry) {
            this._relevantDataEntries.addDataEntry(wDataEntry);
        };
        NwctConfigEntryWrapper.prototype.getReferencedDataEntries = function () {
            return this._relevantDataEntries;
        };
        Object.defineProperty(NwctConfigEntryWrapper.prototype, "wDataEntries", {
            get: function () {
                return this._relevantDataEntries;
            },
            enumerable: true,
            configurable: true
        });
        return NwctConfigEntryWrapper;
    }());
    exports.NwctConfigEntryWrapper = NwctConfigEntryWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdENvbmZpZ0VudHJ5V3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9lbnJpY2htZW50L253Y3RDb25maWdFbnRyeVdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFNSSxnQ0FBbUIsV0FBOEI7WUFGekMseUJBQW9CLEdBQTRCLElBQUksK0NBQXNCLEVBQUUsQ0FBQztZQUdqRixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNwQyxDQUFDO1FBR0Qsc0JBQVcsK0NBQVc7aUJBQXRCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQUdNLGdEQUFlLEdBQXRCLFVBQXVCLFVBQWlDO1lBQ3BELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUdNLHlEQUF3QixHQUEvQjtZQUNJLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3JDLENBQUM7UUFHRCxzQkFBVyxnREFBWTtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7WUFDckMsQ0FBQzs7O1dBQUE7UUFJTCw2QkFBQztJQUFELENBQUMsQUFoQ0QsSUFnQ0M7SUFoQ1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU53Y3RDb25maWdFbnRyeSB9IGZyb20gXCIuLi9vYmpQYXJzZXIvaW50ZXJmYWNlcy9ud2N0Q29uZmlnRW50cnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTndjdERhdGFFbnRyaWVzV3JhcHBlciB9IGZyb20gXCIuL253Y3REYXRhRW50cmllc1dyYXBwZXJcIjtcclxuaW1wb3J0IHsgTndjdERhdGFFbnRyeVdyYXBwZXIgfSBmcm9tIFwiLi9ud2N0RGF0YUVudHJ5V3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE53Y3RDb25maWdFbnRyeVdyYXBwZXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29uZmlnRW50cnkgOiBJTndjdENvbmZpZ0VudHJ5O1xyXG5cclxuICAgIHByaXZhdGUgX3JlbGV2YW50RGF0YUVudHJpZXMgOiBOd2N0RGF0YUVudHJpZXNXcmFwcGVyID0gbmV3IE53Y3REYXRhRW50cmllc1dyYXBwZXIoKTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnRW50cnkgOiBJTndjdENvbmZpZ0VudHJ5KXtcclxuICAgICAgICB0aGlzLl9jb25maWdFbnRyeSA9IGNvbmZpZ0VudHJ5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZ0VudHJ5KCkgOiBJTndjdENvbmZpZ0VudHJ5e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWdFbnRyeTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFkZERhdGFFbnRyeVJlZih3RGF0YUVudHJ5IDogTndjdERhdGFFbnRyeVdyYXBwZXIgKSB7XHJcbiAgICAgICAgdGhpcy5fcmVsZXZhbnREYXRhRW50cmllcy5hZGREYXRhRW50cnkod0RhdGFFbnRyeSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRSZWZlcmVuY2VkRGF0YUVudHJpZXMoKSA6IE53Y3REYXRhRW50cmllc1dyYXBwZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbGV2YW50RGF0YUVudHJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHdEYXRhRW50cmllcygpIDogTndjdERhdGFFbnRyaWVzV3JhcHBlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVsZXZhbnREYXRhRW50cmllcztcclxuICAgIH1cclxuXHJcblxyXG5cclxufSJdfQ==
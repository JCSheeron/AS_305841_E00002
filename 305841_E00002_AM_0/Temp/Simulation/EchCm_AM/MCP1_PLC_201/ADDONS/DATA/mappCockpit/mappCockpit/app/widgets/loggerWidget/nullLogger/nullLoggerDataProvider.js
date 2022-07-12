define(["require", "exports", "./../interfaces/loggerDataProviderInterface"], function (require, exports, loggerDataProviderInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Null LoggerDataProvider object
     *
     * @export
     * @class NullLoggerDataProvider
     * @implements {ILoggerDataProvider}
     */
    var NullLoggerDataProvider = /** @class */ (function () {
        function NullLoggerDataProvider() {
            this.eventDataAvailable = new loggerDataProviderInterface_1.EventDataAvailable();
            this.eventDataLoadingProgressChanged = new loggerDataProviderInterface_1.EventDataLoadingProgress();
        }
        NullLoggerDataProvider.prototype.uploadDataFromTarget = function () {
        };
        NullLoggerDataProvider.prototype.importDataFromFile = function () {
        };
        NullLoggerDataProvider.prototype.exportDataToFile = function (data) {
        };
        NullLoggerDataProvider.prototype.isExportPossible = function () {
            return false;
        };
        return NullLoggerDataProvider;
    }());
    exports.NullLoggerDataProvider = NullLoggerDataProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbExvZ2dlckRhdGFQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9sb2dnZXJXaWRnZXQvbnVsbExvZ2dlci9udWxsTG9nZ2VyRGF0YVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7Ozs7T0FNRztJQUNIO1FBQUE7WUFDSSx1QkFBa0IsR0FBRyxJQUFJLGdEQUFrQixFQUFFLENBQUM7WUFDOUMsb0NBQStCLEdBQUcsSUFBSSxzREFBd0IsRUFBRSxDQUFDO1FBa0JyRSxDQUFDO1FBaEJHLHFEQUFvQixHQUFwQjtRQUVBLENBQUM7UUFFRCxtREFBa0IsR0FBbEI7UUFFQSxDQUFDO1FBRUQsaURBQWdCLEdBQWhCLFVBQWlCLElBQVU7UUFFM0IsQ0FBQztRQUVELGlEQUFnQixHQUFoQjtZQUNJLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFTCw2QkFBQztJQUFELENBQUMsQUFwQkQsSUFvQkM7SUFwQlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxvZ2dlckRhdGFQcm92aWRlciwgRXZlbnREYXRhQXZhaWxhYmxlLCBFdmVudERhdGFMb2FkaW5nUHJvZ3Jlc3MgfSBmcm9tIFwiLi8uLi9pbnRlcmZhY2VzL2xvZ2dlckRhdGFQcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIE51bGwgTG9nZ2VyRGF0YVByb3ZpZGVyIG9iamVjdFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBOdWxsTG9nZ2VyRGF0YVByb3ZpZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyRGF0YVByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE51bGxMb2dnZXJEYXRhUHJvdmlkZXIgaW1wbGVtZW50cyBJTG9nZ2VyRGF0YVByb3ZpZGVye1xyXG4gICAgZXZlbnREYXRhQXZhaWxhYmxlID0gbmV3IEV2ZW50RGF0YUF2YWlsYWJsZSgpO1xyXG4gICAgZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZCA9IG5ldyBFdmVudERhdGFMb2FkaW5nUHJvZ3Jlc3MoKTtcclxuICAgIFxyXG4gICAgdXBsb2FkRGF0YUZyb21UYXJnZXQoKSB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbXBvcnREYXRhRnJvbUZpbGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0RGF0YVRvRmlsZShkYXRhOiBCbG9iKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzRXhwb3J0UG9zc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
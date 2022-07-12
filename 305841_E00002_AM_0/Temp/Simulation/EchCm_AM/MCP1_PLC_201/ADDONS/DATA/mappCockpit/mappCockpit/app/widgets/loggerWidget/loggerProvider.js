define(["require", "exports", "./driveLog/driveLogDefinitions", "./driveLog/driveLogDataProvider", "./nullLogger/nullLoggerDefinitions", "./nullLogger/nullLoggerDataProvider"], function (require, exports, driveLogDefinitions_1, driveLogDataProvider_1, nullLoggerDefinitions_1, nullLoggerDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides all the available logger implementations(e.g. network command trace,...)
     *
     * @export
     * @class LoggerProvider
     */
    var LoggerProvider = /** @class */ (function () {
        function LoggerProvider() {
        }
        /**
         * Returns the logger data provider for the given component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {ILoggerDataProvider}
         * @memberof LoggerProvider
         */
        LoggerProvider.getLoggerDataProviderForComponent = function (component) {
            if (component.browseName == this.driveLogComponentName) {
                return new driveLogDataProvider_1.DriveLogDataProvider(component);
            }
            return new nullLoggerDataProvider_1.NullLoggerDataProvider();
        };
        /**
         * Returns the logger definitions for the given component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {ILoggerDefinitions}
         * @memberof LoggerProvider
         */
        LoggerProvider.getLoggerDefinitionsForComponent = function (component) {
            if (component.browseName == this.driveLogComponentName) {
                return new driveLogDefinitions_1.DriveLogDefinitions();
            }
            return new nullLoggerDefinitions_1.NullLoggerDefinitions();
        };
        /**
         * Name of the DriveLog component
         *
         * @static
         * @memberof LoggerProvider
         */
        LoggerProvider.driveLogComponentName = "DriveLog";
        return LoggerProvider;
    }());
    exports.LoggerProvider = LoggerProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9nZ2VyV2lkZ2V0L2xvZ2dlclByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVlBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQXVDQSxDQUFDO1FBN0JHOzs7Ozs7O1dBT0c7UUFDSSxnREFBaUMsR0FBeEMsVUFBeUMsU0FBK0I7WUFDcEUsSUFBRyxTQUFTLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBQztnQkFDbEQsT0FBTyxJQUFJLDJDQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsT0FBTyxJQUFJLCtDQUFzQixFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSwrQ0FBZ0MsR0FBdkMsVUFBd0MsU0FBK0I7WUFDbkUsSUFBRyxTQUFTLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBQztnQkFDbEQsT0FBTyxJQUFJLHlDQUFtQixFQUFFLENBQUM7YUFDcEM7WUFDRCxPQUFPLElBQUksNkNBQXFCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBcENEOzs7OztXQUtHO1FBQ29CLG9DQUFxQixHQUFHLFVBQVUsQ0FBQztRQStCOUQscUJBQUM7S0FBQSxBQXZDRCxJQXVDQztJQXZDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBJTG9nZ2VyRGVmaW5pdGlvbnMgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2xvZ2dlckRlZmluaXRpb25zSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElMb2dnZXJEYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2xvZ2dlckRhdGFQcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgRHJpdmVMb2dEZWZpbml0aW9ucyB9IGZyb20gXCIuL2RyaXZlTG9nL2RyaXZlTG9nRGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHsgRHJpdmVMb2dEYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi9kcml2ZUxvZy9kcml2ZUxvZ0RhdGFQcm92aWRlclwiO1xyXG5cclxuaW1wb3J0IHsgTnVsbExvZ2dlckRlZmluaXRpb25zIH0gZnJvbSBcIi4vbnVsbExvZ2dlci9udWxsTG9nZ2VyRGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHsgTnVsbExvZ2dlckRhdGFQcm92aWRlciB9IGZyb20gXCIuL251bGxMb2dnZXIvbnVsbExvZ2dlckRhdGFQcm92aWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGFsbCB0aGUgYXZhaWxhYmxlIGxvZ2dlciBpbXBsZW1lbnRhdGlvbnMoZS5nLiBuZXR3b3JrIGNvbW1hbmQgdHJhY2UsLi4uKVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBMb2dnZXJQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvZ2dlclByb3ZpZGVye1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIE5hbWUgb2YgdGhlIERyaXZlTG9nIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRyaXZlTG9nQ29tcG9uZW50TmFtZSA9IFwiRHJpdmVMb2dcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsb2dnZXIgZGF0YSBwcm92aWRlciBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge0lMb2dnZXJEYXRhUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldExvZ2dlckRhdGFQcm92aWRlckZvckNvbXBvbmVudChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogSUxvZ2dlckRhdGFQcm92aWRlcntcclxuICAgICAgICBpZihjb21wb25lbnQuYnJvd3NlTmFtZSA9PSB0aGlzLmRyaXZlTG9nQ29tcG9uZW50TmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRHJpdmVMb2dEYXRhUHJvdmlkZXIoY29tcG9uZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdWxsTG9nZ2VyRGF0YVByb3ZpZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsb2dnZXIgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtJTG9nZ2VyRGVmaW5pdGlvbnN9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldExvZ2dlckRlZmluaXRpb25zRm9yQ29tcG9uZW50KGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBJTG9nZ2VyRGVmaW5pdGlvbnN7XHJcbiAgICAgICAgaWYoY29tcG9uZW50LmJyb3dzZU5hbWUgPT0gdGhpcy5kcml2ZUxvZ0NvbXBvbmVudE5hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERyaXZlTG9nRGVmaW5pdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdWxsTG9nZ2VyRGVmaW5pdGlvbnMoKTtcclxuICAgIH1cclxufSJdfQ==
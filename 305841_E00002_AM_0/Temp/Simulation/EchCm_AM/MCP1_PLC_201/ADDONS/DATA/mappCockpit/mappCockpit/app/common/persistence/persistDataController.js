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
define(["require", "exports", "./interfaces/storageInterface", "./indexeddb", "../../framework/events"], function (require, exports, storageInterface_1, indexeddb_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersistDataControllerEventNotificationType;
    (function (PersistDataControllerEventNotificationType) {
        PersistDataControllerEventNotificationType[PersistDataControllerEventNotificationType["connected"] = 0] = "connected";
        PersistDataControllerEventNotificationType[PersistDataControllerEventNotificationType["dataLoaded"] = 1] = "dataLoaded";
    })(PersistDataControllerEventNotificationType = exports.PersistDataControllerEventNotificationType || (exports.PersistDataControllerEventNotificationType = {}));
    var PersistDataControllerEventNotification = /** @class */ (function (_super) {
        __extends(PersistDataControllerEventNotification, _super);
        function PersistDataControllerEventNotification() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PersistDataControllerEventNotification;
    }(events_1.TypedEvent));
    ;
    var PersistDataController = /** @class */ (function () {
        /**
         * Creates an instance of PersistDataController
         * @param {(PersistDataProvider|undefined)} dataProvider
         * @memberof PersistDataController
         */
        function PersistDataController(dataProvider) {
            var _this = this;
            /**
             * Handler for the events from the storage
             *
             * @private
             * @memberof PersistDataController
             */
            this._storageNotificationHandler = function (sender, eventArgs) { _this.handleStorageNotification(sender, eventArgs); };
            /**
             * Event of the persist data controller(connected, data loaded, ....)
             *
             * @memberof PersistDataController
             */
            this.eventNotification = new PersistDataControllerEventNotification();
            this._defaultStorage = new indexeddb_1.Indexeddb();
            this._dataProvider = dataProvider;
            if (this._dataProvider != undefined) {
                this._dataProvider.dataChanged.attach(function (sender, args) { return _this.dataProviderDataChanged(sender, args); });
            }
        }
        /**
         * handler for the events from the dafault storage
         *
         * @private
         * @param {*} sender
         * @param {StorageEventNotificationType} eventArgs
         * @memberof PersistDataController
         */
        PersistDataController.prototype.handleStorageNotification = function (sender, eventArgs) {
            if (eventArgs.type == storageInterface_1.StorageEventNotificationType.storageConnected) {
                this._defaultStorage.eventNotification.detach(this._storageNotificationHandler);
                this.eventNotification.raise(this, PersistDataControllerEventNotificationType.connected);
            }
            if (eventArgs.type == storageInterface_1.StorageEventNotificationType.dataLoaded) {
                this._defaultStorage.eventNotification.detach(this._storageNotificationHandler);
                var dataFromStorage = eventArgs.data;
                if (dataFromStorage != undefined) {
                    if (this._dataProvider != undefined) {
                        this._dataProvider.setData(dataFromStorage);
                    }
                }
                this.eventNotification.raise(this, PersistDataControllerEventNotificationType.dataLoaded);
            }
        };
        /**
         * Connect to the defaultStorage
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.connect = function () {
            this._defaultStorage.eventNotification.attach(this._storageNotificationHandler);
            this._defaultStorage.connectStorage('mappCockpit');
        };
        /**
         * Save data with the given key to the defaultStorage
         *
         * @param {*} key
         * @param {*} data
         * @memberof PersistDataController
         */
        PersistDataController.prototype.saveData = function (key, data) {
            if (this._dataProvider != undefined) {
                this._defaultStorage.saveData(key, data);
            }
        };
        /**
         * Load the whole data from the default storage
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.loadData = function () {
            this._defaultStorage.eventNotification.attach(this._storageNotificationHandler);
            this._defaultStorage.loadData();
        };
        /**
         * Removes all data from the default storage
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.clearDefaultStorage = function () {
            this._defaultStorage.clear();
        };
        /**
         * Notification when data in the dataprovider has changed or added
         *
         * @param {PersistDataProvider} sender
         * @param {PersistDataChangedEventArgs} args
         * @memberof PersistDataController
         */
        PersistDataController.prototype.dataProviderDataChanged = function (sender, args) {
            // Save data on every change
            this.saveData(args.id, args.data);
        };
        return PersistDataController;
    }());
    exports.PersistDataController = PersistDataController;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdERhdGFDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQSxJQUFZLDBDQUdYO0lBSEQsV0FBWSwwQ0FBMEM7UUFDbEQscUhBQVMsQ0FBQTtRQUNULHVIQUFVLENBQUE7SUFDZCxDQUFDLEVBSFcsMENBQTBDLEdBQTFDLGtEQUEwQyxLQUExQyxrREFBMEMsUUFHckQ7SUFFRDtRQUFxRCwwREFBNkU7UUFBbEk7O1FBQW9JLENBQUM7UUFBRCw2Q0FBQztJQUFELENBQUMsQUFBckksQ0FBcUQsbUJBQVUsR0FBc0U7SUFBQSxDQUFDO0lBRXRJO1FBbUNJOzs7O1dBSUc7UUFDSCwrQkFBWSxZQUEyQztZQUF2RCxpQkFPQztZQTNCRDs7Ozs7ZUFLRztZQUNLLGdDQUEyQixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBRW5IOzs7O2VBSUc7WUFDSCxzQkFBaUIsR0FBRyxJQUFJLHNDQUFzQyxFQUFFLENBQUM7WUFRN0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztZQUNsQyxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFBO2FBQ3RHO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyx5REFBeUIsR0FBakMsVUFBa0MsTUFBTSxFQUFFLFNBQXVDO1lBQzdFLElBQUcsU0FBUyxDQUFDLElBQUksSUFBSSwrQ0FBNEIsQ0FBQyxnQkFBZ0IsRUFBQztnQkFDL0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ2hGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLDBDQUEwQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVGO1lBQ0QsSUFBRyxTQUFTLENBQUMsSUFBSSxJQUFJLCtDQUE0QixDQUFDLFVBQVUsRUFBQztnQkFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ2hGLElBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLElBQUcsZUFBZSxJQUFJLFNBQVMsRUFBQztvQkFDNUIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQzt3QkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7cUJBQy9DO2lCQUNKO2dCQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLDBDQUEwQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzdGO1FBQ0wsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCx1Q0FBTyxHQUFQO1lBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHdDQUFRLEdBQVIsVUFBUyxHQUFHLEVBQUUsSUFBSTtZQUNkLElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsQ0FBQzthQUMzQztRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsd0NBQVEsR0FBUjtZQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxtREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCx1REFBdUIsR0FBdkIsVUFBd0IsTUFBMkIsRUFBRSxJQUFpQztZQUNsRiw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQyxDQUFDO1FBQ0osNEJBQUM7SUFBRCxDQUFDLEFBL0hGLElBK0hFO0lBL0hXLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJncyB9IGZyb20gXCIuL3BlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJnc1wiO1xyXG5pbXBvcnQgeyBJU3RvcmFnZSwgU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uQXJncywgU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uVHlwZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3RvcmFnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbmRleGVkZGIgfSBmcm9tIFwiLi9pbmRleGVkZGJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcblxyXG5leHBvcnQgZW51bSBQZXJzaXN0RGF0YUNvbnRyb2xsZXJFdmVudE5vdGlmaWNhdGlvblR5cGV7XHJcbiAgICBjb25uZWN0ZWQsXHJcbiAgICBkYXRhTG9hZGVkLFxyXG59XHJcblxyXG5jbGFzcyBQZXJzaXN0RGF0YUNvbnRyb2xsZXJFdmVudE5vdGlmaWNhdGlvbiBleHRlbmRzIFR5cGVkRXZlbnQ8UGVyc2lzdERhdGFDb250cm9sbGVyLCBQZXJzaXN0RGF0YUNvbnRyb2xsZXJFdmVudE5vdGlmaWNhdGlvblR5cGU+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFBlcnNpc3REYXRhQ29udHJvbGxlcntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhUHJvdmlkZXIgd2hpY2ggcHJvdmlkZXMgdGhlIHBlcnNpc3RpbmcgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KFBlcnNpc3REYXRhUHJvdmlkZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGF0YVByb3ZpZGVyOiBQZXJzaXN0RGF0YVByb3ZpZGVyfHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHN0b3JhZ2UgZm9yIHBlcnNpc3RpbmcgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7SVN0b3JhZ2V9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RlZmF1bHRTdG9yYWdlOiBJU3RvcmFnZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXIgZm9yIHRoZSBldmVudHMgZnJvbSB0aGUgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3N0b3JhZ2VOb3RpZmljYXRpb25IYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuaGFuZGxlU3RvcmFnZU5vdGlmaWNhdGlvbihzZW5kZXIsIGV2ZW50QXJncykgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV2ZW50IG9mIHRoZSBwZXJzaXN0IGRhdGEgY29udHJvbGxlcihjb25uZWN0ZWQsIGRhdGEgbG9hZGVkLCAuLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgZXZlbnROb3RpZmljYXRpb24gPSBuZXcgUGVyc2lzdERhdGFDb250cm9sbGVyRXZlbnROb3RpZmljYXRpb24oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKiBAcGFyYW0geyhQZXJzaXN0RGF0YVByb3ZpZGVyfHVuZGVmaW5lZCl9IGRhdGFQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhUHJvdmlkZXI6IFBlcnNpc3REYXRhUHJvdmlkZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0U3RvcmFnZSA9IG5ldyBJbmRleGVkZGIoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIgPSBkYXRhUHJvdmlkZXI7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFQcm92aWRlciEuZGF0YUNoYW5nZWQuYXR0YWNoKChzZW5kZXIsYXJncykgPT4gdGhpcy5kYXRhUHJvdmlkZXJEYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpKVxyXG4gICAgICAgIH1cclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVyIGZvciB0aGUgZXZlbnRzIGZyb20gdGhlIGRhZmF1bHQgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtTdG9yYWdlRXZlbnROb3RpZmljYXRpb25UeXBlfSBldmVudEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVTdG9yYWdlTm90aWZpY2F0aW9uKHNlbmRlciwgZXZlbnRBcmdzOiBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25BcmdzKXtcclxuICAgICAgICBpZihldmVudEFyZ3MudHlwZSA9PSBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25UeXBlLnN0b3JhZ2VDb25uZWN0ZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0U3RvcmFnZS5ldmVudE5vdGlmaWNhdGlvbi5kZXRhY2godGhpcy5fc3RvcmFnZU5vdGlmaWNhdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50Tm90aWZpY2F0aW9uLnJhaXNlKHRoaXMsIFBlcnNpc3REYXRhQ29udHJvbGxlckV2ZW50Tm90aWZpY2F0aW9uVHlwZS5jb25uZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihldmVudEFyZ3MudHlwZSA9PSBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25UeXBlLmRhdGFMb2FkZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0U3RvcmFnZS5ldmVudE5vdGlmaWNhdGlvbi5kZXRhY2godGhpcy5fc3RvcmFnZU5vdGlmaWNhdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YUZyb21TdG9yYWdlID0gZXZlbnRBcmdzLmRhdGE7XHJcbiAgICAgICAgICAgIGlmKGRhdGFGcm9tU3RvcmFnZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fZGF0YVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNldERhdGEoZGF0YUZyb21TdG9yYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50Tm90aWZpY2F0aW9uLnJhaXNlKHRoaXMsIFBlcnNpc3REYXRhQ29udHJvbGxlckV2ZW50Tm90aWZpY2F0aW9uVHlwZS5kYXRhTG9hZGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0IHRvIHRoZSBkZWZhdWx0U3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgY29ubmVjdCgpe1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRTdG9yYWdlLmV2ZW50Tm90aWZpY2F0aW9uLmF0dGFjaCh0aGlzLl9zdG9yYWdlTm90aWZpY2F0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdFN0b3JhZ2UuY29ubmVjdFN0b3JhZ2UoJ21hcHBDb2NrcGl0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlIGRhdGEgd2l0aCB0aGUgZ2l2ZW4ga2V5IHRvIHRoZSBkZWZhdWx0U3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgc2F2ZURhdGEoa2V5LCBkYXRhKSB7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRTdG9yYWdlLnNhdmVEYXRhKGtleSxkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHRoZSB3aG9sZSBkYXRhIGZyb20gdGhlIGRlZmF1bHQgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgbG9hZERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdFN0b3JhZ2UuZXZlbnROb3RpZmljYXRpb24uYXR0YWNoKHRoaXMuX3N0b3JhZ2VOb3RpZmljYXRpb25IYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0U3RvcmFnZS5sb2FkRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgZGF0YSBmcm9tIHRoZSBkZWZhdWx0IHN0b3JhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGNsZWFyRGVmYXVsdFN0b3JhZ2UoKXtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0U3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm90aWZpY2F0aW9uIHdoZW4gZGF0YSBpbiB0aGUgZGF0YXByb3ZpZGVyIGhhcyBjaGFuZ2VkIG9yIGFkZGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQZXJzaXN0RGF0YVByb3ZpZGVyfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7UGVyc2lzdERhdGFDaGFuZ2VkRXZlbnRBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGRhdGFQcm92aWRlckRhdGFDaGFuZ2VkKHNlbmRlcjogUGVyc2lzdERhdGFQcm92aWRlciwgYXJnczogUGVyc2lzdERhdGFDaGFuZ2VkRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICAgICAgLy8gU2F2ZSBkYXRhIG9uIGV2ZXJ5IGNoYW5nZVxyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoYXJncy5pZCwgYXJncy5kYXRhKVxyXG4gICAgfVxyXG4gfSJdfQ==
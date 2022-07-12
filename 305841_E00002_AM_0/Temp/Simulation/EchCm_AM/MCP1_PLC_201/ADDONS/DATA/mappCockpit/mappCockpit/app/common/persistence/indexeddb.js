define(["require", "exports", "./interfaces/storageInterface", "./interfaces/indexeddbCommandInterface", "../utilities/versionNumberProvider"], function (require, exports, storageInterface_1, indexeddbCommandInterface_1, versionNumberProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Indexeddb = /** @class */ (function () {
        function Indexeddb() {
            /**
             * Some events from the storage(e.g dataLoaded, storageInitialized,...)
             *
             * @memberof Indexeddb
             */
            this.eventNotification = new storageInterface_1.StorageEventNotification();
            //private _data;
            this._location = 'mappCockpit';
            this._databaseWorker = new Worker("./common/persistence/indexdDBWorker.js");
        }
        Indexeddb.prototype.connectStorage = function (location) {
            var _this = this;
            this._location = location;
            this._databaseWorker.onmessage = function (event) { return _this.onMessageFromWorker(event.data); };
            var command = new indexeddbCommandInterface_1.IndexedDBCommand(indexeddbCommandInterface_1.IndexedDBCommandMessage.init, { location: this._location, version: versionNumberProvider_1.VersionNumberProvider.getVersionNumberFromSVG() });
            this._databaseWorker.postMessage(command);
        };
        Indexeddb.prototype.loadData = function () {
            var _this = this;
            this._databaseWorker.onmessage = function (event) { return _this.onMessageFromWorker(event.data); };
            var command = new indexeddbCommandInterface_1.IndexedDBCommand(indexeddbCommandInterface_1.IndexedDBCommandMessage.load, {});
            this._databaseWorker.postMessage(command);
        };
        /*retrieveData() : any{
            if(this._data != undefined){
                return this._data
            }
            else {
                console.log("data not defined");
            }
        }*/
        Indexeddb.prototype.saveData = function (key, data) {
            var transferables = this.getTransferablesFromData(data);
            var dbWorkerCommand = new indexeddbCommandInterface_1.IndexedDBCommand(indexeddbCommandInterface_1.IndexedDBCommandMessage.store, { data: data, key: key });
            this._databaseWorker.postMessage(dbWorkerCommand, transferables);
        };
        ;
        Indexeddb.prototype.clear = function () {
            var command = new indexeddbCommandInterface_1.IndexedDBCommand(indexeddbCommandInterface_1.IndexedDBCommandMessage.clear, { location: this._location, version: versionNumberProvider_1.VersionNumberProvider.getVersionNumberFromSVG() });
            this._databaseWorker.postMessage(command);
        };
        /**
         * called when the background worker finished a task,
         * used to raise the event of this storage(data loaded, ...)
         *
         * @private
         * @param {IndexedDBCommand} indexedDBCommand
         * @memberof Indexeddb
         */
        Indexeddb.prototype.onMessageFromWorker = function (indexedDBCommand) {
            var eventNotificationType = this.getEventNotificationType(indexedDBCommand.message);
            var eventNotificationData = this.getEventNotificationData(indexedDBCommand);
            if (eventNotificationType != undefined) {
                this.eventNotification.raise(this, new storageInterface_1.StorageEventNotificationArgs(eventNotificationType, eventNotificationData));
            }
        };
        /**
         * get data from indexedDB command(from worker) which should be raised from this storage class
         *
         * @private
         * @param {IndexedDBCommand} indexedDBCommand
         * @returns {*}
         * @memberof Indexeddb
         */
        Indexeddb.prototype.getEventNotificationData = function (indexedDBCommand) {
            if (indexedDBCommand.message == indexeddbCommandInterface_1.IndexedDBCommandMessage.load) {
                return indexedDBCommand.data.data;
            }
            return undefined;
        };
        /**
         * Convert IndexedDbCommand type to StorageEventType
         *
         * @private
         * @param {IndexedDBCommand} indexedDBCommandMessage
         * @returns {(StorageEventNotificationType|undefined)}
         * @memberof Indexeddb
         */
        Indexeddb.prototype.getEventNotificationType = function (indexedDBCommandMessage) {
            if (indexedDBCommandMessage == indexeddbCommandInterface_1.IndexedDBCommandMessage.load) {
                return storageInterface_1.StorageEventNotificationType.dataLoaded;
            }
            else if (indexedDBCommandMessage == indexeddbCommandInterface_1.IndexedDBCommandMessage.store) {
                return storageInterface_1.StorageEventNotificationType.dataSaved;
            }
            else if (indexedDBCommandMessage == indexeddbCommandInterface_1.IndexedDBCommandMessage.success) {
                return storageInterface_1.StorageEventNotificationType.storageConnected;
            }
            else if (indexedDBCommandMessage == indexeddbCommandInterface_1.IndexedDBCommandMessage.clear) {
                return storageInterface_1.StorageEventNotificationType.storageCleared;
            }
            else if (indexedDBCommandMessage == indexeddbCommandInterface_1.IndexedDBCommandMessage.error) {
                return storageInterface_1.StorageEventNotificationType.error;
            }
            return undefined;
        };
        Indexeddb.prototype.getTransferablesFromData = function (data) {
            var transferables = [];
            if (data != undefined && data.data.transferables != undefined) {
                var transferables_1 = [];
                data.data.transferables.forEach(function (element) {
                    transferables_1.push(element);
                });
                data.data.transferables = {};
            }
            return transferables;
        };
        return Indexeddb;
    }());
    exports.Indexeddb = Indexeddb;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlZGRiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGVyc2lzdGVuY2UvaW5kZXhlZGRiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBQUE7WUFFSTs7OztlQUlHO1lBQ0gsc0JBQWlCLEdBQUcsSUFBSSwyQ0FBd0IsRUFBRSxDQUFDO1lBRW5ELGdCQUFnQjtZQUNSLGNBQVMsR0FBVSxhQUFhLENBQUM7WUFFakMsb0JBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBK0duRixDQUFDO1FBNUdHLGtDQUFjLEdBQWQsVUFBZSxRQUFnQjtZQUEvQixpQkFNQztZQUxHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBRTFCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUF3QixDQUFDLEVBQXhELENBQXdELENBQUM7WUFDckcsSUFBSSxPQUFPLEdBQUcsSUFBSSw0Q0FBZ0IsQ0FBQyxtREFBdUIsQ0FBQyxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUcsNkNBQXFCLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDekosSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUdELDRCQUFRLEdBQVI7WUFBQSxpQkFJQztZQUhHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUF3QixDQUFDLEVBQXhELENBQXdELENBQUM7WUFDckcsSUFBSSxPQUFPLEdBQUcsSUFBSSw0Q0FBZ0IsQ0FBQyxtREFBdUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFFSCw0QkFBUSxHQUFSLFVBQVMsR0FBVyxFQUFFLElBQVU7WUFDNUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhELElBQUksZUFBZSxHQUFHLElBQUksNENBQWdCLENBQUMsbURBQXVCLENBQUMsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUNsRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUFBLENBQUM7UUFFRix5QkFBSyxHQUFMO1lBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSw0Q0FBZ0IsQ0FBQyxtREFBdUIsQ0FBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUcsNkNBQXFCLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDMUosSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyx1Q0FBbUIsR0FBM0IsVUFBNEIsZ0JBQW1DO1lBQzNELElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BGLElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDNUUsSUFBRyxxQkFBcUIsSUFBSSxTQUFTLEVBQUM7Z0JBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksK0NBQTRCLENBQUMscUJBQXFCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2FBQ3RIO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw0Q0FBd0IsR0FBaEMsVUFBaUMsZ0JBQWtDO1lBQy9ELElBQUcsZ0JBQWdCLENBQUMsT0FBTyxJQUFJLG1EQUF1QixDQUFDLElBQUksRUFBQztnQkFDeEQsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3JDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw0Q0FBd0IsR0FBaEMsVUFBaUMsdUJBQWdEO1lBQzdFLElBQUcsdUJBQXVCLElBQUksbURBQXVCLENBQUMsSUFBSSxFQUFDO2dCQUN2RCxPQUFPLCtDQUE0QixDQUFDLFVBQVUsQ0FBQzthQUNsRDtpQkFDSSxJQUFHLHVCQUF1QixJQUFJLG1EQUF1QixDQUFDLEtBQUssRUFBQztnQkFDN0QsT0FBTywrQ0FBNEIsQ0FBQyxTQUFTLENBQUM7YUFDakQ7aUJBQ0ksSUFBRyx1QkFBdUIsSUFBSSxtREFBdUIsQ0FBQyxPQUFPLEVBQUM7Z0JBQy9ELE9BQU8sK0NBQTRCLENBQUMsZ0JBQWdCLENBQUM7YUFDeEQ7aUJBQ0ksSUFBRyx1QkFBdUIsSUFBSSxtREFBdUIsQ0FBQyxLQUFLLEVBQUM7Z0JBQzdELE9BQU8sK0NBQTRCLENBQUMsY0FBYyxDQUFDO2FBQ3REO2lCQUNJLElBQUcsdUJBQXVCLElBQUksbURBQXVCLENBQUMsS0FBSyxFQUFDO2dCQUM3RCxPQUFPLCtDQUE0QixDQUFDLEtBQUssQ0FBQzthQUM3QztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFTyw0Q0FBd0IsR0FBaEMsVUFBaUMsSUFBUztZQUN0QyxJQUFJLGFBQWEsR0FBVSxFQUFFLENBQUM7WUFDOUIsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBRTtnQkFDM0QsSUFBSSxlQUFhLEdBQVUsRUFBRSxDQUFDO2dCQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUNuQyxlQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7YUFDaEM7WUFFRCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBM0hELElBMkhDO0lBM0hZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVN0b3JhZ2UsIFN0b3JhZ2VFdmVudE5vdGlmaWNhdGlvbiwgU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uVHlwZSwgU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uQXJncyB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3RvcmFnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbmRleGVkREJDb21tYW5kLCBJbmRleGVkREJDb21tYW5kTWVzc2FnZX0gZnJvbSBcIi4vaW50ZXJmYWNlcy9pbmRleGVkZGJDb21tYW5kSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFZlcnNpb25OdW1iZXJQcm92aWRlciB9IGZyb20gXCIuLi91dGlsaXRpZXMvdmVyc2lvbk51bWJlclByb3ZpZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEluZGV4ZWRkYiBpbXBsZW1lbnRzIElTdG9yYWdle1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNvbWUgZXZlbnRzIGZyb20gdGhlIHN0b3JhZ2UoZS5nIGRhdGFMb2FkZWQsIHN0b3JhZ2VJbml0aWFsaXplZCwuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZGV4ZWRkYlxyXG4gICAgICovXHJcbiAgICBldmVudE5vdGlmaWNhdGlvbiA9IG5ldyBTdG9yYWdlRXZlbnROb3RpZmljYXRpb24oKTtcclxuICAgIFxyXG4gICAgLy9wcml2YXRlIF9kYXRhO1xyXG4gICAgcHJpdmF0ZSBfbG9jYXRpb246c3RyaW5nID0gJ21hcHBDb2NrcGl0JztcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhYmFzZVdvcmtlciA9IG5ldyBXb3JrZXIoXCIuL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbmRleGREQldvcmtlci5qc1wiKTtcclxuXHJcblxyXG4gICAgY29ubmVjdFN0b3JhZ2UobG9jYXRpb246IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fbG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9kYXRhYmFzZVdvcmtlci5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHRoaXMub25NZXNzYWdlRnJvbVdvcmtlcihldmVudC5kYXRhIGFzIEluZGV4ZWREQkNvbW1hbmQpO1xyXG4gICAgICAgIGxldCBjb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuaW5pdCwge2xvY2F0aW9uIDogdGhpcy5fbG9jYXRpb24sIHZlcnNpb24gOiBWZXJzaW9uTnVtYmVyUHJvdmlkZXIuZ2V0VmVyc2lvbk51bWJlckZyb21TVkcoKX0pO1xyXG4gICAgICAgIHRoaXMuX2RhdGFiYXNlV29ya2VyLnBvc3RNZXNzYWdlKGNvbW1hbmQpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIFxyXG4gICAgbG9hZERhdGEoKXtcclxuICAgICAgICB0aGlzLl9kYXRhYmFzZVdvcmtlci5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHRoaXMub25NZXNzYWdlRnJvbVdvcmtlcihldmVudC5kYXRhIGFzIEluZGV4ZWREQkNvbW1hbmQpO1xyXG4gICAgICAgIGxldCBjb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UubG9hZCwge30pO1xyXG4gICAgICAgIHRoaXMuX2RhdGFiYXNlV29ya2VyLnBvc3RNZXNzYWdlKGNvbW1hbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qcmV0cmlldmVEYXRhKCkgOiBhbnl7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhIG5vdCBkZWZpbmVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIHNhdmVEYXRhKGtleTogc3RyaW5nLCBkYXRhIDogYW55KXtcclxuICAgICAgICBsZXQgdHJhbnNmZXJhYmxlcyA9IHRoaXMuZ2V0VHJhbnNmZXJhYmxlc0Zyb21EYXRhKGRhdGEpO1xyXG5cclxuICAgICAgICBsZXQgZGJXb3JrZXJDb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uuc3RvcmUsIHtkYXRhOiBkYXRhLCBrZXk6IGtleX0pO1xyXG4gICAgICAgIHRoaXMuX2RhdGFiYXNlV29ya2VyLnBvc3RNZXNzYWdlKGRiV29ya2VyQ29tbWFuZCwgdHJhbnNmZXJhYmxlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIGxldCBjb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuY2xlYXIsIHtsb2NhdGlvbiA6IHRoaXMuX2xvY2F0aW9uLCB2ZXJzaW9uIDogVmVyc2lvbk51bWJlclByb3ZpZGVyLmdldFZlcnNpb25OdW1iZXJGcm9tU1ZHKCl9KTtcclxuICAgICAgICB0aGlzLl9kYXRhYmFzZVdvcmtlci5wb3N0TWVzc2FnZShjb21tYW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSBiYWNrZ3JvdW5kIHdvcmtlciBmaW5pc2hlZCBhIHRhc2ssIFxyXG4gICAgICogdXNlZCB0byByYWlzZSB0aGUgZXZlbnQgb2YgdGhpcyBzdG9yYWdlKGRhdGEgbG9hZGVkLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SW5kZXhlZERCQ29tbWFuZH0gaW5kZXhlZERCQ29tbWFuZFxyXG4gICAgICogQG1lbWJlcm9mIEluZGV4ZWRkYlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTWVzc2FnZUZyb21Xb3JrZXIoaW5kZXhlZERCQ29tbWFuZCA6IEluZGV4ZWREQkNvbW1hbmQpe1xyXG4gICAgICAgIGxldCBldmVudE5vdGlmaWNhdGlvblR5cGUgPSB0aGlzLmdldEV2ZW50Tm90aWZpY2F0aW9uVHlwZShpbmRleGVkREJDb21tYW5kLm1lc3NhZ2UpO1xyXG4gICAgICAgIGxldCBldmVudE5vdGlmaWNhdGlvbkRhdGEgPSB0aGlzLmdldEV2ZW50Tm90aWZpY2F0aW9uRGF0YShpbmRleGVkREJDb21tYW5kKTtcclxuICAgICAgICBpZihldmVudE5vdGlmaWNhdGlvblR5cGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5ldmVudE5vdGlmaWNhdGlvbi5yYWlzZSh0aGlzLCBuZXcgU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uQXJncyhldmVudE5vdGlmaWNhdGlvblR5cGUsIGV2ZW50Tm90aWZpY2F0aW9uRGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBkYXRhIGZyb20gaW5kZXhlZERCIGNvbW1hbmQoZnJvbSB3b3JrZXIpIHdoaWNoIHNob3VsZCBiZSByYWlzZWQgZnJvbSB0aGlzIHN0b3JhZ2UgY2xhc3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJbmRleGVkREJDb21tYW5kfSBpbmRleGVkREJDb21tYW5kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBJbmRleGVkZGJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRFdmVudE5vdGlmaWNhdGlvbkRhdGEoaW5kZXhlZERCQ29tbWFuZDogSW5kZXhlZERCQ29tbWFuZCk6IGFueSB7XHJcbiAgICAgICAgaWYoaW5kZXhlZERCQ29tbWFuZC5tZXNzYWdlID09IEluZGV4ZWREQkNvbW1hbmRNZXNzYWdlLmxvYWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXhlZERCQ29tbWFuZC5kYXRhLmRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IEluZGV4ZWREYkNvbW1hbmQgdHlwZSB0byBTdG9yYWdlRXZlbnRUeXBlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SW5kZXhlZERCQ29tbWFuZH0gaW5kZXhlZERCQ29tbWFuZE1lc3NhZ2VcclxuICAgICAqIEByZXR1cm5zIHsoU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uVHlwZXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEluZGV4ZWRkYlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEV2ZW50Tm90aWZpY2F0aW9uVHlwZShpbmRleGVkREJDb21tYW5kTWVzc2FnZTogSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UpOiBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25UeXBlfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYoaW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UgPT0gSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UubG9hZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25UeXBlLmRhdGFMb2FkZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UgPT0gSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uuc3RvcmUpe1xyXG4gICAgICAgICAgICByZXR1cm4gU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uVHlwZS5kYXRhU2F2ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UgPT0gSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uuc3VjY2Vzcyl7XHJcbiAgICAgICAgICAgIHJldHVybiBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25UeXBlLnN0b3JhZ2VDb25uZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UgPT0gSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuY2xlYXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gU3RvcmFnZUV2ZW50Tm90aWZpY2F0aW9uVHlwZS5zdG9yYWdlQ2xlYXJlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbmRleGVkREJDb21tYW5kTWVzc2FnZSA9PSBJbmRleGVkREJDb21tYW5kTWVzc2FnZS5lcnJvcil7XHJcbiAgICAgICAgICAgIHJldHVybiBTdG9yYWdlRXZlbnROb3RpZmljYXRpb25UeXBlLmVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICBcclxuICAgIHByaXZhdGUgZ2V0VHJhbnNmZXJhYmxlc0Zyb21EYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCB0cmFuc2ZlcmFibGVzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCAmJiBkYXRhLmRhdGEudHJhbnNmZXJhYmxlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZmVyYWJsZXM6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgICAgICBkYXRhLmRhdGEudHJhbnNmZXJhYmxlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmZXJhYmxlcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEuZGF0YS50cmFuc2ZlcmFibGVzID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhbnNmZXJhYmxlcztcclxuICAgIH1cclxufSJdfQ==
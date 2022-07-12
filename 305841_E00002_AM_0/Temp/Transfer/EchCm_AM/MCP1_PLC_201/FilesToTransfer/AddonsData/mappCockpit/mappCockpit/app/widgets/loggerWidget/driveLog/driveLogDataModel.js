define(["require", "exports", "./driveLogEntry", "../../../common/persistence/settings"], function (require, exports, driveLogEntry_1, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Datamodel implementation for the logger representation of the network command trace data
     *
     * @export
     * @class DriveLogDataModel
     */
    var DriveLogDataModel = /** @class */ (function () {
        /**
         * Creates an instance of DriveLogDataModel
         * @memberof DriveLogDataModel
         */
        function DriveLogDataModel() {
            /**
             * Holds the dataSource of this dataModel
             *
             * @private
             * @type {Array<any>}
             * @memberof DriveLogDataModel
             */
            this._dataSource = new Array();
        }
        Object.defineProperty(DriveLogDataModel.prototype, "dataSource", {
            /**
             * Returns the data source of the datamodel
             *
             * @readonly
             * @type {Array<IDriveLogEntry>}
             * @memberof DriveLogDataModel
             */
            get: function () {
                return this._dataSource;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the settings(export data) of this datamodel
         *
         * @returns {ISettings}
         * @memberof DriveLogDataModel
         */
        DriveLogDataModel.prototype.getSettings = function () {
            var settings = new settings_1.Settings("DriveLogDataModel", "1.0");
            var exportEntries = new Array();
            this.dataSource.forEach(function (entry) {
                exportEntries.push(entry.getExportData());
            });
            settings.setValue("entries", exportEntries);
            return settings;
        };
        /**
         * Sets the settings(export data) to this datamodel
         *
         * @param {ISettings} settings
         * @memberof DriveLogDataModel
         */
        DriveLogDataModel.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            if (settingsObj.version == "1.0") {
                var data = settingsObj.getValue("entries");
                this.setDataSourceWithImportData(data);
            }
            else {
                console.error("Importfile version not supported! (Version: " + settingsObj.version + ")");
            }
        };
        /**
         * Update datamodel with new network command trace data from nwct provider(data from target)
         *
         * @param {NwctProvider} nwctProvider
         * @memberof DriveLogDataModel
         */
        DriveLogDataModel.prototype.setNwctProvider = function (nwctProvider) {
            this._dataSource = this.getDataSourceFromNwctProvider(nwctProvider);
        };
        /**
         * Returns a valid datasource for the treegrid corresponding to the given nwct bin data
         *
         * @private
         * @param {NwctProvider} nwctProvider
         * @returns
         * @memberof DriveLogDataModel
         */
        DriveLogDataModel.prototype.getDataSourceFromNwctProvider = function (nwctProvider) {
            var _this = this;
            var dataSource = new Array();
            var sortedEntries = nwctProvider.entries;
            sortedEntries.forEach(function (dataRecord) {
                if (!dataRecord.isResponse) { // TODO: add responses without request and show correct
                    var record = _this.getRecord(dataRecord);
                    dataSource.push(record);
                }
                else {
                    // Search for response without request and add them also
                    if (!dataRecord.requestEntry) {
                        var record = _this.getRecord(dataRecord);
                        dataSource.push(record);
                    }
                }
            });
            return dataSource;
        };
        /**
         * Sets the import data to the datasource of this datamdodel
         *
         * @private
         * @param {*} importData
         * @memberof DriveLogDataModel
         */
        DriveLogDataModel.prototype.setDataSourceWithImportData = function (importData) {
            var dataSource = new Array();
            importData.forEach(function (importEntry) {
                var entry = new driveLogEntry_1.DriveLogEntry(undefined, importEntry);
                dataSource.push(entry);
            });
            this._dataSource = dataSource;
        };
        /**
         * Returns a logger representation network command trace record
         *
         * @private
         * @param {INwctDataEntry} dataRecord
         * @returns {IDriveLogEntry}
         * @memberof DriveLogDataModel
         */
        DriveLogDataModel.prototype.getRecord = function (dataRecord) {
            return new driveLogEntry_1.DriveLogEntry(dataRecord);
        };
        return DriveLogDataModel;
    }());
    exports.DriveLogDataModel = DriveLogDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dEYXRhTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9nZ2VyV2lkZ2V0L2RyaXZlTG9nL2RyaXZlTG9nRGF0YU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVNBOzs7OztPQUtHO0lBQ0g7UUFzQkk7OztXQUdHO1FBQ0g7WUF4QkE7Ozs7OztlQU1HO1lBQ0ssZ0JBQVcsR0FBMEIsSUFBSSxLQUFLLEVBQWtCLENBQUM7UUFrQnpFLENBQUM7UUFURCxzQkFBVyx5Q0FBVTtZQVByQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzVCLENBQUM7OztXQUFBO1FBU0Q7Ozs7O1dBS0c7UUFDSCx1Q0FBVyxHQUFYO1lBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3ZELElBQUksYUFBYSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUN6QixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDNUMsT0FBTyxRQUFRLENBQUM7UUFFcEIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQVcsR0FBWCxVQUFZLFFBQW1CO1lBQzNCLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUcsV0FBVyxDQUFDLE9BQU8sSUFBSSxLQUFLLEVBQUM7Z0JBQzVCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQztpQkFDRztnQkFDQSxPQUFPLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDN0Y7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwyQ0FBZSxHQUFmLFVBQWdCLFlBQTBCO1lBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hFLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0sseURBQTZCLEdBQXJDLFVBQXNDLFlBQTBCO1lBQWhFLGlCQW1CQztZQWxCRyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztZQUM3QyxJQUFJLGFBQWEsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO1lBRXpDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2dCQUM1QixJQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBQyxFQUFFLHVEQUF1RDtvQkFDL0UsSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDeEMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDM0I7cUJBQ0c7b0JBQ0Esd0RBQXdEO29CQUN4RCxJQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBQzt3QkFDeEIsSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDeEMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDNUI7aUJBQ0g7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyx1REFBMkIsR0FBbkMsVUFBb0MsVUFBVTtZQUMxQyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztZQUU3QyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVztnQkFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDdEQsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFBO1FBQ2pDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0sscUNBQVMsR0FBakIsVUFBa0IsVUFBc0I7WUFDcEMsT0FBTyxJQUFJLDZCQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQWxJRCxJQWtJQztJQWxJWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOd2N0UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9ud2N0UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRHJpdmVMb2dFbnRyeSB9IGZyb20gXCIuL2RyaXZlTG9nRW50cnlcIjtcclxuaW1wb3J0IHsgSURyaXZlTG9nRW50cnkgfSBmcm9tIFwiLi4vZHJpdmVMb2cvaW50ZXJmYWNlcy9kcml2ZUxvZ0VudHJ5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElOd2N0RW50cnkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9pbnRlcmZhY2VzL253Y3RFbnRyeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3NPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NPYmplY3RJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJTG9nZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbG9nZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogRGF0YW1vZGVsIGltcGxlbWVudGF0aW9uIGZvciB0aGUgbG9nZ2VyIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBEcml2ZUxvZ0RhdGFNb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERyaXZlTG9nRGF0YU1vZGVsIGltcGxlbWVudHMgSVNldHRpbmdzT2JqZWN0LCBJTG9nZ2VyRGF0YU1vZGVse1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBkYXRhU291cmNlIG9mIHRoaXMgZGF0YU1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtBcnJheTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IEFycmF5PElEcml2ZUxvZ0VudHJ5PiA9IG5ldyBBcnJheTxJRHJpdmVMb2dFbnRyeT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGEgc291cmNlIG9mIHRoZSBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxJRHJpdmVMb2dFbnRyeT59XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IEFycmF5PElEcml2ZUxvZ0VudHJ5PntcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRHJpdmVMb2dEYXRhTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmdzKGV4cG9ydCBkYXRhKSBvZiB0aGlzIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgZ2V0U2V0dGluZ3MoKTogSVNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoXCJEcml2ZUxvZ0RhdGFNb2RlbFwiLCBcIjEuMFwiKVxyXG4gICAgICAgIGxldCBleHBvcnRFbnRyaWVzID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgIGV4cG9ydEVudHJpZXMucHVzaChlbnRyeS5nZXRFeHBvcnREYXRhKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwiZW50cmllc1wiLCBleHBvcnRFbnRyaWVzKTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNldHRpbmdzKGV4cG9ydCBkYXRhKSB0byB0aGlzIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBJU2V0dGluZ3MpIHtcclxuICAgICAgICBsZXQgc2V0dGluZ3NPYmogPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3MpO1xyXG4gICAgICAgIGlmKHNldHRpbmdzT2JqLnZlcnNpb24gPT0gXCIxLjBcIil7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoXCJlbnRyaWVzXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGFTb3VyY2VXaXRoSW1wb3J0RGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkltcG9ydGZpbGUgdmVyc2lvbiBub3Qgc3VwcG9ydGVkISAoVmVyc2lvbjogXCIgKyBzZXR0aW5nc09iai52ZXJzaW9uICsgXCIpXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgZGF0YW1vZGVsIHdpdGggbmV3IG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhIGZyb20gbndjdCBwcm92aWRlcihkYXRhIGZyb20gdGFyZ2V0KVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TndjdFByb3ZpZGVyfSBud2N0UHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBzZXROd2N0UHJvdmlkZXIobndjdFByb3ZpZGVyOiBOd2N0UHJvdmlkZXIpe1xyXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB0aGlzLmdldERhdGFTb3VyY2VGcm9tTndjdFByb3ZpZGVyKG53Y3RQcm92aWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdmFsaWQgZGF0YXNvdXJjZSBmb3IgdGhlIHRyZWVncmlkIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIG53Y3QgYmluIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtOd2N0UHJvdmlkZXJ9IG53Y3RQcm92aWRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERhdGFTb3VyY2VGcm9tTndjdFByb3ZpZGVyKG53Y3RQcm92aWRlcjogTndjdFByb3ZpZGVyKTogQXJyYXk8SURyaXZlTG9nRW50cnk+e1xyXG4gICAgICAgIGxldCBkYXRhU291cmNlID0gbmV3IEFycmF5PElEcml2ZUxvZ0VudHJ5PigpO1xyXG4gICAgICAgIGxldCBzb3J0ZWRFbnRyaWVzID0gbndjdFByb3ZpZGVyLmVudHJpZXM7XHJcblxyXG4gICAgICAgIHNvcnRlZEVudHJpZXMuZm9yRWFjaChkYXRhUmVjb3JkID0+IHtcclxuICAgICAgICAgICAgaWYoIWRhdGFSZWNvcmQuaXNSZXNwb25zZSl7IC8vIFRPRE86IGFkZCByZXNwb25zZXMgd2l0aG91dCByZXF1ZXN0IGFuZCBzaG93IGNvcnJlY3RcclxuICAgICAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGlzLmdldFJlY29yZChkYXRhUmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIGRhdGFTb3VyY2UucHVzaChyZWNvcmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBTZWFyY2ggZm9yIHJlc3BvbnNlIHdpdGhvdXQgcmVxdWVzdCBhbmQgYWRkIHRoZW0gYWxzb1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGFSZWNvcmQucmVxdWVzdEVudHJ5KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5nZXRSZWNvcmQoZGF0YVJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZS5wdXNoKHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGFTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpbXBvcnQgZGF0YSB0byB0aGUgZGF0YXNvdXJjZSBvZiB0aGlzIGRhdGFtZG9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBpbXBvcnREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXREYXRhU291cmNlV2l0aEltcG9ydERhdGEoaW1wb3J0RGF0YSl7XHJcbiAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSBuZXcgQXJyYXk8SURyaXZlTG9nRW50cnk+KCk7XHJcblxyXG4gICAgICAgIGltcG9ydERhdGEuZm9yRWFjaChpbXBvcnRFbnRyeSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeSA9IG5ldyBEcml2ZUxvZ0VudHJ5KHVuZGVmaW5lZCwgaW1wb3J0RW50cnkpO1xyXG4gICAgICAgICAgICBkYXRhU291cmNlLnB1c2goZW50cnkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBkYXRhU291cmNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbG9nZ2VyIHJlcHJlc2VudGF0aW9uIG5ldHdvcmsgY29tbWFuZCB0cmFjZSByZWNvcmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJTndjdERhdGFFbnRyeX0gZGF0YVJlY29yZFxyXG4gICAgICogQHJldHVybnMge0lEcml2ZUxvZ0VudHJ5fVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UmVjb3JkKGRhdGFSZWNvcmQ6IElOd2N0RW50cnkpOiBJRHJpdmVMb2dFbnRyeSB7IC8vIGNyZWF0ZSByZWNvcmRcclxuICAgICAgICByZXR1cm4gbmV3IERyaXZlTG9nRW50cnkoZGF0YVJlY29yZCk7XHJcbiAgICB9XHJcbn0iXX0=
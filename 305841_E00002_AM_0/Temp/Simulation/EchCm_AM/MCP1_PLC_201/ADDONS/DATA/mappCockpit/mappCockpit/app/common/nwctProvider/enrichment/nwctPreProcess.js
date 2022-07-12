define(["require", "exports", "./nwctConfigEntriesWrapper", "./nwctConfigEntryWrapper", "./nwctDataEntriesWrapper", "./nwctDataEntryWrapper"], function (require, exports, nwctConfigEntriesWrapper_1, nwctConfigEntryWrapper_1, nwctDataEntriesWrapper_1, nwctDataEntryWrapper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class adds further information to the raw NWCT ringbuffer data, such as links between entries,...
     *
     * Input expectaction: strongly typed nwct record entries and data entries
     *
     * @export
     * @class NwctPreProcess
     */
    var NwctPreProcess = /** @class */ (function () {
        function NwctPreProcess(root) {
            // wrap all data entries
            var wDataEntries = root.dataEntries.sortedDataEntries.map(function (entry) { return new nwctDataEntryWrapper_1.NwctDataEntryWrapper(entry); });
            this._wDataEntries = new nwctDataEntriesWrapper_1.NwctDataEntriesWrapper(wDataEntries);
            // wrap all config entries
            var configEntries = root.configEntries.configEntries.map(function (entry) { return new nwctConfigEntryWrapper_1.NwctConfigEntryWrapper(entry); });
            this._wConfigEntries = new nwctConfigEntriesWrapper_1.NwctConfigEntriesWrapper(configEntries);
            //*********************************************************************************************************************** */
            // prepare config entries 
            //*********************************************************************************************************************** */
            this._wConfigEntries.preprocess();
            // match all data-entries with the responses and store the link on both sides
            this.mapDataEntriesAndConfigEntries();
            // for each config entry: sort the links to data entries by the data entry index
            this.sortDataReferencesInConfigEntries();
            // map responses to requests
            this.mapResponses();
        }
        /**
         * maps all responses to requests
         *
         * @private
         * @memberof NwctPreProcess
         */
        NwctPreProcess.prototype.mapResponses = function () {
            // add the information to the config entries, which data entries they refer to
            var _this = this;
            // retrieve all request entries
            var requests = this._wDataEntries.wDataEntries.filter(function (wDataEntry) {
                return wDataEntry.isRequest;
            });
            // link all responses
            requests.forEach(function (wDataEntry) {
                // get index of next request (this is the criteria to stop searching)
                var maxIndex = _this.findIndexOfNextRequest(wDataEntry);
                wDataEntry.response = _this.findResponse(wDataEntry, maxIndex);
                if (wDataEntry.response != undefined) {
                    // Set request entry within the response entry
                    wDataEntry.response.request = wDataEntry;
                }
            });
        };
        /**
         * This method maps data entries and config entries in both directions
         * One config entry hold an array of references to data entries
         *
         * config entry             data entry
         * ----------               ----------
         * |        |               |        |
         * |        | 1          n  |        |
         * |        |---------------|        |
         * |        |               |        |
         * ----------               ----------
         *
         * @private
         * @memberof NwctPreProcess
         */
        NwctPreProcess.prototype.mapDataEntriesAndConfigEntries = function () {
            var _this = this;
            this._wDataEntries.wDataEntries.forEach(function (wDataEntry) { return wDataEntry.wConfigEntry = _this._wConfigEntries.linkDataEntry2ConfigEntry(wDataEntry); });
        };
        /**
         * This method iterates through all config entries and sorts the array of references to the data entries.
         *
         * @private
         * @memberof NwctPreProcess
         */
        NwctPreProcess.prototype.sortDataReferencesInConfigEntries = function () {
            this._wConfigEntries.wConfigEntires.forEach(function (wConfigEntry) { return wConfigEntry.wDataEntries.sortByIndex(); });
        };
        /**
         * Searches for the response to an request entry stops the search when index >= maxIndex
         *
         * @private
         * @param {NwctDataEntryWrapper} wDataEntry
         * @returns {(NwctDataEntryWrapper | undefined)}
         * @memberof NwctPreProcess
         */
        NwctPreProcess.prototype.findResponse = function (wDataEntry, maxIndex) {
            // the configId has to be the configId of the data entry +1
            var expectedConfigId = wDataEntry.dataEntry.configId.value + 1;
            // get the config entry that we are looking for
            var configEntry = this._wConfigEntries.getConfigEntry(expectedConfigId);
            // get all possible data entries (these are linke to the config entry)
            if (configEntry === undefined) { // only if there is a linked config entry
                return undefined;
            }
            var probes = configEntry.wDataEntries;
            // find response
            if (probes === undefined) { // only if there are probes
                return undefined;
            }
            var response = probes.findResponse(wDataEntry, maxIndex);
            return response;
        };
        /**
         * When searching for a response, the search has to be stopped when detecting the next response
         * This function returns the index of the next relevant request entry
         *
         * @private
         * @param {NwctDataEntryWrapper} wDataEntry
         * @returns {number}
         * @memberof NwctPreProcess
         */
        NwctPreProcess.prototype.findIndexOfNextRequest = function (wDataEntry) {
            // the configId has to be the configId of the data entry +1
            var expectedConfigId = wDataEntry.dataEntry.configId.value;
            // get the config entry that we are looking for
            var configEntry = this._wConfigEntries.getConfigEntry(expectedConfigId);
            // get all possible data entries (these are linke to the config entry)
            if (configEntry === undefined) { // only if there is a linked config entry
                return 0; // no reply available
            }
            var probes = configEntry.wDataEntries;
            // find response
            if (probes === undefined) { // only if there are probes
                return 0; // no reply available
            }
            var nextRequest = probes.findNextRequest(wDataEntry);
            if (nextRequest === undefined || !nextRequest.dataEntry.index.valid) {
                return Number.MAX_SAFE_INTEGER; // no criteria to stop the serach found
            }
            return nextRequest.dataEntry.index.value;
        };
        Object.defineProperty(NwctPreProcess.prototype, "dataEntries", {
            get: function () {
                return this._wDataEntries;
            },
            enumerable: true,
            configurable: true
        });
        return NwctPreProcess;
    }());
    exports.NwctPreProcess = NwctPreProcess;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByZVByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9ud2N0UHJvdmlkZXIvZW5yaWNobWVudC9ud2N0UHJlUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTs7Ozs7OztPQU9HO0lBQ0g7UUFNSSx3QkFBbUIsSUFBZTtZQUU5Qix3QkFBd0I7WUFDeEIsSUFBSSxZQUFZLEdBQTRCLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsSUFBSSwyQ0FBb0IsQ0FBQyxLQUFLLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1lBQzdILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSwrQ0FBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU5RCwwQkFBMEI7WUFDMUIsSUFBSSxhQUFhLEdBQThCLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLElBQUksK0NBQXNCLENBQUMsS0FBSyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztZQUNoSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksbURBQXdCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbkUsNEhBQTRIO1lBQzVILDBCQUEwQjtZQUMxQiw0SEFBNEg7WUFDNUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsQyw2RUFBNkU7WUFDNUUsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFFdkMsZ0ZBQWdGO1lBQ2hGLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO1lBRXpDLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFeEIsQ0FBQztRQUlEOzs7OztXQUtHO1FBQ0sscUNBQVksR0FBcEI7WUFDSSw4RUFBOEU7WUFEbEYsaUJBc0JDO1lB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O2FBQ2xDO1lBQ0QsSUFBSSxXQUFXLEdBQXNDLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEYsSUFBRyxXQUFXLEtBQUssU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFHO2dCQUNqRSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLHVDQUF1QzthQUMxRTtZQUVELE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzdDLENBQUM7UUFHRCxzQkFBVyx1Q0FBVztpQkFBdEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzlCLENBQUM7OztXQUFBO1FBTUwscUJBQUM7SUFBRCxDQUFDLEFBbExELElBa0xDO0lBbExZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTndjdFJvb3QgfSBmcm9tIFwiLi4vb2JqUGFyc2VyL253Y3RSb290XCJcclxuaW1wb3J0IHsgTndjdENvbmZpZ0VudHJpZXNXcmFwcGVyIH0gZnJvbSBcIi4vbndjdENvbmZpZ0VudHJpZXNXcmFwcGVyXCI7XHJcbmltcG9ydCB7IE53Y3RDb25maWdFbnRyeVdyYXBwZXIgfSBmcm9tIFwiLi9ud2N0Q29uZmlnRW50cnlXcmFwcGVyXCI7XHJcbmltcG9ydCB7IE53Y3REYXRhRW50cmllc1dyYXBwZXIgfSBmcm9tIFwiLi9ud2N0RGF0YUVudHJpZXNXcmFwcGVyXCI7XHJcbmltcG9ydCB7IE53Y3REYXRhRW50cnlXcmFwcGVyIH0gZnJvbSBcIi4vbndjdERhdGFFbnRyeVdyYXBwZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGFkZHMgZnVydGhlciBpbmZvcm1hdGlvbiB0byB0aGUgcmF3IE5XQ1QgcmluZ2J1ZmZlciBkYXRhLCBzdWNoIGFzIGxpbmtzIGJldHdlZW4gZW50cmllcywuLi5cclxuICogXHJcbiAqIElucHV0IGV4cGVjdGFjdGlvbjogc3Ryb25nbHkgdHlwZWQgbndjdCByZWNvcmQgZW50cmllcyBhbmQgZGF0YSBlbnRyaWVzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE53Y3RQcmVQcm9jZXNzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTndjdFByZVByb2Nlc3N7XHJcblxyXG4gICAgXHJcbiAgICBwcml2YXRlIF93RGF0YUVudHJpZXMgOiBOd2N0RGF0YUVudHJpZXNXcmFwcGVyOyBcclxuICAgIHByaXZhdGUgX3dDb25maWdFbnRyaWVzIDogTndjdENvbmZpZ0VudHJpZXNXcmFwcGVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb290IDogTndjdFJvb3Qpe1xyXG5cclxuICAgICAgICAvLyB3cmFwIGFsbCBkYXRhIGVudHJpZXNcclxuICAgICAgICBsZXQgd0RhdGFFbnRyaWVzIDogTndjdERhdGFFbnRyeVdyYXBwZXJbXSA9IHJvb3QuZGF0YUVudHJpZXMuc29ydGVkRGF0YUVudHJpZXMubWFwKGVudHJ5ID0+IG5ldyBOd2N0RGF0YUVudHJ5V3JhcHBlcihlbnRyeSkpO1xyXG4gICAgICAgIHRoaXMuX3dEYXRhRW50cmllcyA9IG5ldyBOd2N0RGF0YUVudHJpZXNXcmFwcGVyKHdEYXRhRW50cmllcyk7XHJcblxyXG4gICAgICAgIC8vIHdyYXAgYWxsIGNvbmZpZyBlbnRyaWVzXHJcbiAgICAgICAgbGV0IGNvbmZpZ0VudHJpZXMgOiBOd2N0Q29uZmlnRW50cnlXcmFwcGVyW10gPSByb290LmNvbmZpZ0VudHJpZXMuY29uZmlnRW50cmllcy5tYXAoZW50cnkgPT4gbmV3IE53Y3RDb25maWdFbnRyeVdyYXBwZXIoZW50cnkpKTtcclxuICAgICAgICB0aGlzLl93Q29uZmlnRW50cmllcyA9IG5ldyBOd2N0Q29uZmlnRW50cmllc1dyYXBwZXIoY29uZmlnRW50cmllcyk7XHJcblxyXG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICAgICAgICAvLyBwcmVwYXJlIGNvbmZpZyBlbnRyaWVzIFxyXG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICAgICAgICB0aGlzLl93Q29uZmlnRW50cmllcy5wcmVwcm9jZXNzKCk7XHJcblxyXG4gICAgICAgIC8vIG1hdGNoIGFsbCBkYXRhLWVudHJpZXMgd2l0aCB0aGUgcmVzcG9uc2VzIGFuZCBzdG9yZSB0aGUgbGluayBvbiBib3RoIHNpZGVzXHJcbiAgICAgICAgIHRoaXMubWFwRGF0YUVudHJpZXNBbmRDb25maWdFbnRyaWVzKCk7XHJcblxyXG4gICAgICAgIC8vIGZvciBlYWNoIGNvbmZpZyBlbnRyeTogc29ydCB0aGUgbGlua3MgdG8gZGF0YSBlbnRyaWVzIGJ5IHRoZSBkYXRhIGVudHJ5IGluZGV4XHJcbiAgICAgICAgdGhpcy5zb3J0RGF0YVJlZmVyZW5jZXNJbkNvbmZpZ0VudHJpZXMoKTtcclxuXHJcbiAgICAgICAgLy8gbWFwIHJlc3BvbnNlcyB0byByZXF1ZXN0c1xyXG4gICAgICAgIHRoaXMubWFwUmVzcG9uc2VzKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYXBzIGFsbCByZXNwb25zZXMgdG8gcmVxdWVzdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcmVQcm9jZXNzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWFwUmVzcG9uc2VzKCl7XHJcbiAgICAgICAgLy8gYWRkIHRoZSBpbmZvcm1hdGlvbiB0byB0aGUgY29uZmlnIGVudHJpZXMsIHdoaWNoIGRhdGEgZW50cmllcyB0aGV5IHJlZmVyIHRvXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJldHJpZXZlIGFsbCByZXF1ZXN0IGVudHJpZXNcclxuICAgICAgICBsZXQgcmVxdWVzdHMgOiBBcnJheTxOd2N0RGF0YUVudHJ5V3JhcHBlcj4gPSB0aGlzLl93RGF0YUVudHJpZXMud0RhdGFFbnRyaWVzLmZpbHRlciggd0RhdGFFbnRyeSA9PiBcclxuICAgICAgICAgICAgd0RhdGFFbnRyeS5pc1JlcXVlc3RcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBsaW5rIGFsbCByZXNwb25zZXNcclxuICAgICAgICByZXF1ZXN0cy5mb3JFYWNoKHdEYXRhRW50cnkgPT57XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IGluZGV4IG9mIG5leHQgcmVxdWVzdCAodGhpcyBpcyB0aGUgY3JpdGVyaWEgdG8gc3RvcCBzZWFyY2hpbmcpXHJcbiAgICAgICAgICAgIGxldCBtYXhJbmRleCA6IG51bWJlciA9IHRoaXMuZmluZEluZGV4T2ZOZXh0UmVxdWVzdCh3RGF0YUVudHJ5KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdEYXRhRW50cnkucmVzcG9uc2UgPSB0aGlzLmZpbmRSZXNwb25zZSh3RGF0YUVudHJ5LCBtYXhJbmRleCk7XHJcbiAgICAgICAgICAgIGlmKHdEYXRhRW50cnkucmVzcG9uc2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCByZXF1ZXN0IGVudHJ5IHdpdGhpbiB0aGUgcmVzcG9uc2UgZW50cnlcclxuICAgICAgICAgICAgICAgIHdEYXRhRW50cnkucmVzcG9uc2UucmVxdWVzdCA9IHdEYXRhRW50cnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgbWFwcyBkYXRhIGVudHJpZXMgYW5kIGNvbmZpZyBlbnRyaWVzIGluIGJvdGggZGlyZWN0aW9uc1xyXG4gICAgICogT25lIGNvbmZpZyBlbnRyeSBob2xkIGFuIGFycmF5IG9mIHJlZmVyZW5jZXMgdG8gZGF0YSBlbnRyaWVzXHJcbiAgICAgKiBcclxuICAgICAqIGNvbmZpZyBlbnRyeSAgICAgICAgICAgICBkYXRhIGVudHJ5XHJcbiAgICAgKiAtLS0tLS0tLS0tICAgICAgICAgICAgICAgLS0tLS0tLS0tLVxyXG4gICAgICogfCAgICAgICAgfCAgICAgICAgICAgICAgIHwgICAgICAgIHxcclxuICAgICAqIHwgICAgICAgIHwgMSAgICAgICAgICBuICB8ICAgICAgICB8XHJcbiAgICAgKiB8ICAgICAgICB8LS0tLS0tLS0tLS0tLS0tfCAgICAgICAgfFxyXG4gICAgICogfCAgICAgICAgfCAgICAgICAgICAgICAgIHwgICAgICAgIHxcclxuICAgICAqIC0tLS0tLS0tLS0gICAgICAgICAgICAgICAtLS0tLS0tLS0tXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJlUHJvY2Vzc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1hcERhdGFFbnRyaWVzQW5kQ29uZmlnRW50cmllcygpIHtcclxuICAgICAgICB0aGlzLl93RGF0YUVudHJpZXMud0RhdGFFbnRyaWVzLmZvckVhY2god0RhdGFFbnRyeSA9PiB3RGF0YUVudHJ5LndDb25maWdFbnRyeSA9IHRoaXMuX3dDb25maWdFbnRyaWVzLmxpbmtEYXRhRW50cnkyQ29uZmlnRW50cnkod0RhdGFFbnRyeSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGl0ZXJhdGVzIHRocm91Z2ggYWxsIGNvbmZpZyBlbnRyaWVzIGFuZCBzb3J0cyB0aGUgYXJyYXkgb2YgcmVmZXJlbmNlcyB0byB0aGUgZGF0YSBlbnRyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByZVByb2Nlc3NcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzb3J0RGF0YVJlZmVyZW5jZXNJbkNvbmZpZ0VudHJpZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fd0NvbmZpZ0VudHJpZXMud0NvbmZpZ0VudGlyZXMuZm9yRWFjaCh3Q29uZmlnRW50cnkgPT4gd0NvbmZpZ0VudHJ5LndEYXRhRW50cmllcy5zb3J0QnlJbmRleCgpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyBmb3IgdGhlIHJlc3BvbnNlIHRvIGFuIHJlcXVlc3QgZW50cnkgc3RvcHMgdGhlIHNlYXJjaCB3aGVuIGluZGV4ID49IG1heEluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TndjdERhdGFFbnRyeVdyYXBwZXJ9IHdEYXRhRW50cnlcclxuICAgICAqIEByZXR1cm5zIHsoTndjdERhdGFFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcmVQcm9jZXNzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZFJlc3BvbnNlKHdEYXRhRW50cnkgOiBOd2N0RGF0YUVudHJ5V3JhcHBlciwgbWF4SW5kZXggOm51bWJlcikgOiBOd2N0RGF0YUVudHJ5V3JhcHBlciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdGhlIGNvbmZpZ0lkIGhhcyB0byBiZSB0aGUgY29uZmlnSWQgb2YgdGhlIGRhdGEgZW50cnkgKzFcclxuICAgICAgICBsZXQgZXhwZWN0ZWRDb25maWdJZCA6IG51bWJlcj0gd0RhdGFFbnRyeS5kYXRhRW50cnkuY29uZmlnSWQudmFsdWUgKyAxO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvbmZpZyBlbnRyeSB0aGF0IHdlIGFyZSBsb29raW5nIGZvclxyXG4gICAgICAgIGxldCBjb25maWdFbnRyeSA6IE53Y3RDb25maWdFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQgPSB0aGlzLl93Q29uZmlnRW50cmllcy5nZXRDb25maWdFbnRyeShleHBlY3RlZENvbmZpZ0lkKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGFsbCBwb3NzaWJsZSBkYXRhIGVudHJpZXMgKHRoZXNlIGFyZSBsaW5rZSB0byB0aGUgY29uZmlnIGVudHJ5KVxyXG4gICAgICAgIGlmKGNvbmZpZ0VudHJ5ID09PSB1bmRlZmluZWQpeyAgLy8gb25seSBpZiB0aGVyZSBpcyBhIGxpbmtlZCBjb25maWcgZW50cnlcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByb2JlcyA6IE53Y3REYXRhRW50cmllc1dyYXBwZXIgfCB1bmRlZmluZWQgPSBjb25maWdFbnRyeS53RGF0YUVudHJpZXM7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgcmVzcG9uc2VcclxuICAgICAgICBpZihwcm9iZXMgPT09IHVuZGVmaW5lZCl7IC8vIG9ubHkgaWYgdGhlcmUgYXJlIHByb2Jlc1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzcG9uc2UgOiBOd2N0RGF0YUVudHJ5V3JhcHBlciB8IHVuZGVmaW5lZCA9IHByb2Jlcy5maW5kUmVzcG9uc2Uod0RhdGFFbnRyeSwgbWF4SW5kZXgpO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHNlYXJjaGluZyBmb3IgYSByZXNwb25zZSwgdGhlIHNlYXJjaCBoYXMgdG8gYmUgc3RvcHBlZCB3aGVuIGRldGVjdGluZyB0aGUgbmV4dCByZXNwb25zZVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbmV4dCByZWxldmFudCByZXF1ZXN0IGVudHJ5XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TndjdERhdGFFbnRyeVdyYXBwZXJ9IHdEYXRhRW50cnlcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByZVByb2Nlc3NcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kSW5kZXhPZk5leHRSZXF1ZXN0KHdEYXRhRW50cnkgOiBOd2N0RGF0YUVudHJ5V3JhcHBlcikgOiBudW1iZXIge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHRoZSBjb25maWdJZCBoYXMgdG8gYmUgdGhlIGNvbmZpZ0lkIG9mIHRoZSBkYXRhIGVudHJ5ICsxXHJcbiAgICAgICAgbGV0IGV4cGVjdGVkQ29uZmlnSWQgOiBudW1iZXI9IHdEYXRhRW50cnkuZGF0YUVudHJ5LmNvbmZpZ0lkLnZhbHVlO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvbmZpZyBlbnRyeSB0aGF0IHdlIGFyZSBsb29raW5nIGZvclxyXG4gICAgICAgIGxldCBjb25maWdFbnRyeSA6IE53Y3RDb25maWdFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQgPSB0aGlzLl93Q29uZmlnRW50cmllcy5nZXRDb25maWdFbnRyeShleHBlY3RlZENvbmZpZ0lkKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGFsbCBwb3NzaWJsZSBkYXRhIGVudHJpZXMgKHRoZXNlIGFyZSBsaW5rZSB0byB0aGUgY29uZmlnIGVudHJ5KVxyXG4gICAgICAgIGlmKGNvbmZpZ0VudHJ5ID09PSB1bmRlZmluZWQpeyAgLy8gb25seSBpZiB0aGVyZSBpcyBhIGxpbmtlZCBjb25maWcgZW50cnlcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vIG5vIHJlcGx5IGF2YWlsYWJsZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJvYmVzIDogTndjdERhdGFFbnRyaWVzV3JhcHBlciB8IHVuZGVmaW5lZCA9IGNvbmZpZ0VudHJ5LndEYXRhRW50cmllcztcclxuXHJcbiAgICAgICAgLy8gZmluZCByZXNwb25zZVxyXG4gICAgICAgIGlmKHByb2JlcyA9PT0gdW5kZWZpbmVkKXsgLy8gb25seSBpZiB0aGVyZSBhcmUgcHJvYmVzXHJcbiAgICAgICAgICAgIHJldHVybiAwOyAvLyBubyByZXBseSBhdmFpbGFibGVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5leHRSZXF1ZXN0IDogTndjdERhdGFFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQgPSBwcm9iZXMuZmluZE5leHRSZXF1ZXN0KHdEYXRhRW50cnkpO1xyXG5cclxuICAgICAgICBpZihuZXh0UmVxdWVzdCA9PT0gdW5kZWZpbmVkIHx8ICFuZXh0UmVxdWVzdC5kYXRhRW50cnkuaW5kZXgudmFsaWQpICB7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjsgLy8gbm8gY3JpdGVyaWEgdG8gc3RvcCB0aGUgc2VyYWNoIGZvdW5kXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV4dFJlcXVlc3QuZGF0YUVudHJ5LmluZGV4LnZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFFbnRyaWVzKCkgOiBOd2N0RGF0YUVudHJpZXNXcmFwcGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93RGF0YUVudHJpZXM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufSJdfQ==
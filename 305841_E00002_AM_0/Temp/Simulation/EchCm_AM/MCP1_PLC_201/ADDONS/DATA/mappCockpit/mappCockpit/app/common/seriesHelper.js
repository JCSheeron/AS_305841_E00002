define(["require", "exports", "./persistence/settings", "./utilities/binSearch", "../models/common/series/seriesType", "../models/common/series/settingIds"], function (require, exports, settings_1, binSearch_1, seriesType_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BinSearchMode = binSearch_1.BinSearchMode;
    var SeriesHelper = /** @class */ (function () {
        function SeriesHelper() {
        }
        /**
         * searches for the next nearest timestamp in all series.
         *
         * @static
         * @param {number} searchValue the value to be searched for.
         * @param {number[][]} valueCollection an array of a value array containing the possible values.
         * @param {BinSearchMode} [searchMode=BinSearchMode.NEAREST] specefies the search mode to decide if the bigger, smaller or nearest values shoud be picked.
         * @returns
         * @memberof SeriesHelper
         */
        SeriesHelper.findNearestValueFromCollection = function (searchValue, valueCollection, searchMode) {
            if (searchMode === void 0) { searchMode = binSearch_1.BinSearchMode.NEAREST; }
            var nearestValues = [];
            // find and collect the nearest points within a single series
            valueCollection.forEach(function (values) {
                var nearestValueIndex = binSearch_1.BinSearch.findNearest(searchValue, values, searchMode);
                if (nearestValues.indexOf(values[nearestValueIndex]) == -1) {
                    nearestValues.push(values[nearestValueIndex]);
                }
            });
            // sort the nearest series points of multiple series by their x value (timestamp)
            nearestValues.sort(function (value1, value2) { return value1 - value2; });
            // get the nearest value from all value series
            var nearestValueIndex = binSearch_1.BinSearch.findNearest(searchValue, nearestValues, searchMode);
            var nearestValue = nearestValues[nearestValueIndex];
            return nearestValue;
        };
        /**
         * sreaches for the nearest value
         *
         * @static
         * @param {number} searchValue
         * @param {number[]} values
         * @param {*} [searchMode=BinSearchMode.NEAREST]
         * @param {number} [iFrom=0]
         * @param {number} [iTo=0]
         * @returns {number}
         * @memberof SeriesHelper
         */
        SeriesHelper.indexOfNearest = function (searchValue, values, searchMode) {
            if (searchMode === void 0) { searchMode = binSearch_1.BinSearchMode.NEAREST; }
            return binSearch_1.BinSearch.findNearest(searchValue, values, searchMode);
        };
        /**
         * Checks if the specified timestamp is with the available values
         *
         * @static
         * @param {number} timestamp
         * @param {number[]} timestamps
         * @returns {boolean}
         * @memberof SeriesHelper
         */
        SeriesHelper.isInRange = function (timestamp, timestamps) {
            return timestamps.length > 0 && timestamp >= timestamps[0] && timestamp <= timestamps[timestamps.length - 1];
        };
        /**
         * Returns all necessary settings to create a new serie
         *
         * @static
         * @param {ISignal} signal
         * @param {string} signalName
         * @param {string} color
         * @param {string} id
         * @param {SeriesType} type
         * @returns {ISettings}
         * @memberof SeriesHelper
         */
        SeriesHelper.createSerieSettings = function (signal, signalName, color, id, type) {
            var serieType = SeriesHelper.getSerieType(type);
            var settings = new settings_1.Settings(serieType);
            var signalDataSettings = signal.getSettings();
            var transferables = [signalDataSettings.data.rawPointsX.buffer, signalDataSettings.data.rawPointsY.buffer];
            settings.setValue(settingIds_1.SettingIds.SeriesId, id);
            settings.setValue(settingIds_1.SettingIds.SeriesName, signalName);
            settings.setValue(settingIds_1.SettingIds.SeriesColor, color);
            settings.setValue(settingIds_1.SettingIds.SeriesSignalData, signalDataSettings);
            settings.setValue("transferables", transferables);
            return settings;
        };
        SeriesHelper.getSerieType = function (type) {
            if (type == seriesType_1.SeriesType.timeSeries) {
                return "YTSeries";
            }
            else if (type == seriesType_1.SeriesType.xySeries) {
                return "XYSeries";
            }
            else {
                return "FFTSeries";
            }
        };
        return SeriesHelper;
    }());
    exports.SeriesHelper = SeriesHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vc2VyaWVzSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTJHTyx3QkF6R2EseUJBQWEsQ0F5R2I7SUFwR3BCO1FBQUE7UUFrR0EsQ0FBQztRQWpHRzs7Ozs7Ozs7O1dBU0c7UUFDSSwyQ0FBOEIsR0FBckMsVUFBc0MsV0FBbUIsRUFBRSxlQUEyQixFQUFFLFVBQWlEO1lBQWpELDJCQUFBLEVBQUEsYUFBNEIseUJBQWEsQ0FBQyxPQUFPO1lBRXJJLElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQztZQUVqQyw2REFBNkQ7WUFDN0QsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQzNCLElBQUksaUJBQWlCLEdBQUcscUJBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUUsSUFBRyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUM7b0JBQ3RELGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztpQkFDakQ7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILGlGQUFpRjtZQUNqRixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU0sSUFBTyxPQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRSw4Q0FBOEM7WUFDOUMsSUFBSSxpQkFBaUIsR0FBRyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JGLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNJLDJCQUFjLEdBQXJCLFVBQXNCLFdBQW1CLEVBQUUsTUFBZ0IsRUFBRSxVQUFrQztZQUFsQywyQkFBQSxFQUFBLGFBQWEseUJBQWEsQ0FBQyxPQUFPO1lBQzNGLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxzQkFBUyxHQUFoQixVQUFpQixTQUFpQixFQUFFLFVBQW9CO1lBQ3BELE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEgsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0ksZ0NBQW1CLEdBQTFCLFVBQTJCLE1BQWUsRUFBRSxVQUFrQixFQUFFLEtBQWEsRUFBRSxFQUFVLEVBQUUsSUFBZ0I7WUFDdkcsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkMsSUFBSSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTNHLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNyRCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ25FLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFTSx5QkFBWSxHQUFuQixVQUFvQixJQUFnQjtZQUNoQyxJQUFJLElBQUksSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBRTtnQkFDL0IsT0FBTyxVQUFVLENBQUM7YUFDckI7aUJBQ0ksSUFBSSxJQUFJLElBQUksdUJBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xDLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO2lCQUNJO2dCQUNELE9BQU8sV0FBVyxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQWxHRCxJQWtHQztJQWxHWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJpblNlYXJjaCwgQmluU2VhcmNoTW9kZSB9IGZyb20gXCIuL3V0aWxpdGllcy9iaW5TZWFyY2hcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VyaWVzSGVscGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogc2VhcmNoZXMgZm9yIHRoZSBuZXh0IG5lYXJlc3QgdGltZXN0YW1wIGluIGFsbCBzZXJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlYXJjaFZhbHVlIHRoZSB2YWx1ZSB0byBiZSBzZWFyY2hlZCBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdW119IHZhbHVlQ29sbGVjdGlvbiBhbiBhcnJheSBvZiBhIHZhbHVlIGFycmF5IGNvbnRhaW5pbmcgdGhlIHBvc3NpYmxlIHZhbHVlcy5cclxuICAgICAqIEBwYXJhbSB7QmluU2VhcmNoTW9kZX0gW3NlYXJjaE1vZGU9QmluU2VhcmNoTW9kZS5ORUFSRVNUXSBzcGVjZWZpZXMgdGhlIHNlYXJjaCBtb2RlIHRvIGRlY2lkZSBpZiB0aGUgYmlnZ2VyLCBzbWFsbGVyIG9yIG5lYXJlc3QgdmFsdWVzIHNob3VkIGJlIHBpY2tlZC5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmaW5kTmVhcmVzdFZhbHVlRnJvbUNvbGxlY3Rpb24oc2VhcmNoVmFsdWU6IG51bWJlciwgdmFsdWVDb2xsZWN0aW9uOiBudW1iZXJbXVtdLCBzZWFyY2hNb2RlOiBCaW5TZWFyY2hNb2RlID0gQmluU2VhcmNoTW9kZS5ORUFSRVNUKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG5lYXJlc3RWYWx1ZXM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgIC8vIGZpbmQgYW5kIGNvbGxlY3QgdGhlIG5lYXJlc3QgcG9pbnRzIHdpdGhpbiBhIHNpbmdsZSBzZXJpZXNcclxuICAgICAgICB2YWx1ZUNvbGxlY3Rpb24uZm9yRWFjaCgodmFsdWVzKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZWFyZXN0VmFsdWVJbmRleCA9IEJpblNlYXJjaC5maW5kTmVhcmVzdChzZWFyY2hWYWx1ZSwgdmFsdWVzLHNlYXJjaE1vZGUpO1xyXG4gICAgICAgICAgICBpZihuZWFyZXN0VmFsdWVzLmluZGV4T2YodmFsdWVzW25lYXJlc3RWYWx1ZUluZGV4XSkgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdFZhbHVlcy5wdXNoKHZhbHVlc1tuZWFyZXN0VmFsdWVJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHNvcnQgdGhlIG5lYXJlc3Qgc2VyaWVzIHBvaW50cyBvZiBtdWx0aXBsZSBzZXJpZXMgYnkgdGhlaXIgeCB2YWx1ZSAodGltZXN0YW1wKVxyXG4gICAgICAgIG5lYXJlc3RWYWx1ZXMuc29ydCgodmFsdWUxLCB2YWx1ZTIpID0+IHsgcmV0dXJuIHZhbHVlMSAtIHZhbHVlMjsgfSk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbmVhcmVzdCB2YWx1ZSBmcm9tIGFsbCB2YWx1ZSBzZXJpZXNcclxuICAgICAgICBsZXQgbmVhcmVzdFZhbHVlSW5kZXggPSBCaW5TZWFyY2guZmluZE5lYXJlc3Qoc2VhcmNoVmFsdWUsIG5lYXJlc3RWYWx1ZXMsc2VhcmNoTW9kZSk7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RWYWx1ZSA9IG5lYXJlc3RWYWx1ZXNbbmVhcmVzdFZhbHVlSW5kZXhdO1xyXG4gICAgICAgIHJldHVybiBuZWFyZXN0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzcmVhY2hlcyBmb3IgdGhlIG5lYXJlc3QgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2VhcmNoVmFsdWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHZhbHVlc1xyXG4gICAgICogQHBhcmFtIHsqfSBbc2VhcmNoTW9kZT1CaW5TZWFyY2hNb2RlLk5FQVJFU1RdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2lGcm9tPTBdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2lUbz0wXVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluZGV4T2ZOZWFyZXN0KHNlYXJjaFZhbHVlOiBudW1iZXIsIHZhbHVlczogbnVtYmVyW10sIHNlYXJjaE1vZGUgPSBCaW5TZWFyY2hNb2RlLk5FQVJFU1QpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBCaW5TZWFyY2guZmluZE5lYXJlc3Qoc2VhcmNoVmFsdWUsIHZhbHVlcyxzZWFyY2hNb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgc3BlY2lmaWVkIHRpbWVzdGFtcCBpcyB3aXRoIHRoZSBhdmFpbGFibGUgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gdGltZXN0YW1wc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0luUmFuZ2UodGltZXN0YW1wOiBudW1iZXIsIHRpbWVzdGFtcHM6IG51bWJlcltdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVzdGFtcHMubGVuZ3RoID4gMCAmJiAgdGltZXN0YW1wID49IHRpbWVzdGFtcHNbMF0gJiYgdGltZXN0YW1wIDw9IHRpbWVzdGFtcHNbdGltZXN0YW1wcy5sZW5ndGgtMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBuZWNlc3Nhcnkgc2V0dGluZ3MgdG8gY3JlYXRlIGEgbmV3IHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaWduYWxOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtTZXJpZXNUeXBlfSB0eXBlXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0hlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlU2VyaWVTZXR0aW5ncyhzaWduYWw6IElTaWduYWwsIHNpZ25hbE5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZywgaWQ6IHN0cmluZywgdHlwZTogU2VyaWVzVHlwZSk6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNlcmllVHlwZSA9IFNlcmllc0hlbHBlci5nZXRTZXJpZVR5cGUodHlwZSk7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKHNlcmllVHlwZSk7XHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGFTZXR0aW5ncyA9IHNpZ25hbC5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgIGxldCB0cmFuc2ZlcmFibGVzID0gW3NpZ25hbERhdGFTZXR0aW5ncy5kYXRhLnJhd1BvaW50c1guYnVmZmVyLCBzaWduYWxEYXRhU2V0dGluZ3MuZGF0YS5yYXdQb2ludHNZLmJ1ZmZlcl07XHJcblxyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWQsIGlkKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc05hbWUsIHNpZ25hbE5hbWUpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ29sb3IsIGNvbG9yKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc1NpZ25hbERhdGEsIHNpZ25hbERhdGFTZXR0aW5ncyk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoXCJ0cmFuc2ZlcmFibGVzXCIsIHRyYW5zZmVyYWJsZXMpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0U2VyaWVUeXBlKHR5cGU6IFNlcmllc1R5cGUpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIllUU2VyaWVzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJYWVNlcmllc1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiRkZUU2VyaWVzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnR7QmluU2VhcmNoTW9kZX0iXX0=
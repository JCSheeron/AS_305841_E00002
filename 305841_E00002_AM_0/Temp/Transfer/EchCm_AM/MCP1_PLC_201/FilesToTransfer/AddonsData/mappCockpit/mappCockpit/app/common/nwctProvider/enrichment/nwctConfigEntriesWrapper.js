define(["require", "exports", "../../utilities/binSearch"], function (require, exports, binSearch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctConfigEntriesWrapper = /** @class */ (function () {
        function NwctConfigEntriesWrapper(configEntries) {
            this._wConfigEntriesSorted = new Array();
            this._configIDsSorted = new Array();
            this._preprocessingCompleted = false;
            this._wConfigEntries = configEntries;
        }
        Object.defineProperty(NwctConfigEntriesWrapper.prototype, "configEntry", {
            get: function () {
                return this._wConfigEntries;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * perform all preprocessing tasks to allow a fast search
         *
         * @returns
         * @memberof NwctConfigEntriesWrapper
         */
        NwctConfigEntriesWrapper.prototype.preprocess = function () {
            // only do once
            if (this._preprocessingCompleted) {
                return;
            }
            this._preprocessingCompleted = true;
            this.sortById(); // only executed once anyway
            this.setConfigIDsSorted(); // only executed once anyway
        };
        /**
         * Sets the sorted entries array (sorted by ascending configRecordID)
         *
         * @private
         * @memberof NwctConfigEntriesWrapper
         */
        NwctConfigEntriesWrapper.prototype.sortById = function () {
            this._wConfigEntriesSorted = this._wConfigEntries.sort(this.compareConfigId);
        };
        /**
         * used to sort the config entries based on configRecordID
         *
         * @private
         * @param {INwctConfigEntry} a
         * @param {INwctConfigEntry} b
         * @returns {number}
         * @memberof NwctConfigEntriesWrapper
         */
        NwctConfigEntriesWrapper.prototype.compareConfigId = function (a, b) {
            // undefined should be set to the end
            if (!a.configEntry.configurationRecordId.valid) {
                return 1; // positive number --> change order --> b,a
            }
            if (!b.configEntry.configurationRecordId.valid) {
                return -1; // negative number --> nothing to do --> a,b
            }
            return a.configEntry.configurationRecordId.value - b.configEntry.configurationRecordId.value;
        };
        /**
         * creates an array that only contains the config IDs (for use in binary search)
         *
         * @private
         * @memberof NwctConfigEntriesWrapper
         */
        NwctConfigEntriesWrapper.prototype.setConfigIDsSorted = function () {
            this._configIDsSorted = this._wConfigEntriesSorted.map(function (wConfigEntrie) { return wConfigEntrie.configEntry.configurationRecordId.value; });
        };
        /**
         *
         *
         * @private
         * @param {number} p
         * @param {number} q
         * @returns {number}
         * @memberof NwctConfigEntriesWrapper
         */
        NwctConfigEntriesWrapper.prototype.cmpBinSearchNumber = function (p, q) {
            return p - q;
        };
        /**
         * This method should be used to get the config entry for a specific config id
         * It returns undefined if it can't be found
         *
         * @param {number} id
         * @returns {(INwctConfigEntry | undefined)}
         * @memberof NwctConfigEntriesWrapper
         */
        NwctConfigEntriesWrapper.prototype.getConfigEntry = function (id) {
            this.preprocess();
            // return the config entry with the correct id or undifined
            var arrayIndex = binSearch_1.BinSearch.findExactMatch(this._configIDsSorted, id, this.cmpBinSearchNumber);
            return this._wConfigEntriesSorted[arrayIndex];
        };
        /**
         * Searches for the matching config entry
         *  if it can be found, then:
         *      - the link to the data entry will be stored in the config entry
         *      - the config entry is returned
         *
         * @param {NwctDataEntryWrapper} wDataEntry
         * @memberof NwctConfigEntriesWrapper
         */
        NwctConfigEntriesWrapper.prototype.linkDataEntry2ConfigEntry = function (wDataEntry) {
            // check for valid config ID
            if (!wDataEntry.dataEntry.configId.valid) {
                return undefined;
            }
            var configId = wDataEntry.dataEntry.configId.value;
            var configEntry = this.getConfigEntry(configId);
            // config could not be found
            if (configEntry === undefined) {
                return undefined;
            }
            // config available
            configEntry.addDataEntryRef(wDataEntry);
            return configEntry;
        };
        // for performance comparison only
        NwctConfigEntriesWrapper.prototype.getConfigEntryDeprivcated = function (id) {
            this.preprocess();
            return this._wConfigEntries.find(function (entry) { return entry.configEntry.valid && entry.configEntry.configurationRecordId.value === id; });
        };
        Object.defineProperty(NwctConfigEntriesWrapper.prototype, "wConfigEntires", {
            /**
             * return all config entries
             *
             * @readonly
             * @type {Array<NwctConfigEntryWrapper>}
             * @memberof NwctConfigEntriesWrapper
             */
            get: function () {
                return this._wConfigEntries;
            },
            enumerable: true,
            configurable: true
        });
        return NwctConfigEntriesWrapper;
    }());
    exports.NwctConfigEntriesWrapper = NwctConfigEntriesWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdENvbmZpZ0VudHJpZXNXcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbndjdFByb3ZpZGVyL2VucmljaG1lbnQvbndjdENvbmZpZ0VudHJpZXNXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBUUksa0NBQW1CLGFBQXdDO1lBTG5ELDBCQUFxQixHQUE4QixJQUFJLEtBQUssRUFBMEIsQ0FBQztZQUN2RixxQkFBZ0IsR0FBbUIsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUV2RCw0QkFBdUIsR0FBRyxLQUFLLENBQUM7WUFHcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUdELHNCQUFXLGlEQUFXO2lCQUF0QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDaEMsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7V0FLRztRQUNJLDZDQUFVLEdBQWpCO1lBQ0ksZUFBZTtZQUNmLElBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFDO2dCQUM1QixPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBRXBDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QjtZQUM3QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QjtRQUUzRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSywyQ0FBUSxHQUFoQjtZQUNJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDakYsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssa0RBQWUsR0FBdkIsVUFBd0IsQ0FBMEIsRUFBRSxDQUF5QjtZQUN6RSxxQ0FBcUM7WUFDckMsSUFBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFDO2dCQUMxQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDJDQUEyQzthQUN4RDtZQUNELElBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBQztnQkFDMUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLDRDQUE0QzthQUMxRDtZQUVELE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUM7UUFDakcsQ0FBQztRQUdEOzs7OztXQUtHO1FBQ0sscURBQWtCLEdBQTFCO1lBQ0ksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsVUFBQSxhQUFhLElBQUksT0FBQSxhQUFhLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBckQsQ0FBcUQsQ0FBQyxDQUFDO1FBQ25JLENBQUM7UUFJRDs7Ozs7Ozs7V0FRRztRQUNLLHFEQUFrQixHQUExQixVQUEyQixDQUFTLEVBQUUsQ0FBUztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSSxpREFBYyxHQUFyQixVQUFzQixFQUFXO1lBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsQiwyREFBMkQ7WUFDM0QsSUFBSSxVQUFVLEdBQUcscUJBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUU1RixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBR0Q7Ozs7Ozs7O1dBUUc7UUFDSSw0REFBeUIsR0FBaEMsVUFBaUMsVUFBaUM7WUFFOUQsNEJBQTRCO1lBQzVCLElBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUM7Z0JBQ3BDLE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1lBR0QsSUFBSSxRQUFRLEdBQVksVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBRTVELElBQUksV0FBVyxHQUF3QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXJGLDRCQUE0QjtZQUM1QixJQUFHLFdBQVcsS0FBSyxTQUFTLEVBQUM7Z0JBQ3pCLE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1lBRUQsbUJBQW1CO1lBQ25CLFdBQVcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEMsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUlELGtDQUFrQztRQUMzQiw0REFBeUIsR0FBaEMsVUFBaUMsRUFBVztZQUN4QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFbEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBL0UsQ0FBK0UsQ0FBQyxDQUFDO1FBQy9ILENBQUM7UUFVRCxzQkFBVyxvREFBYztZQVB6Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ2hDLENBQUM7OztXQUFBO1FBR0wsK0JBQUM7SUFBRCxDQUFDLEFBdEtELElBc0tDO0lBdEtZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJpblNlYXJjaCB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvYmluU2VhcmNoXCI7XHJcbmltcG9ydCB7IE53Y3RDb25maWdFbnRyeVdyYXBwZXIgfSBmcm9tIFwiLi9ud2N0Q29uZmlnRW50cnlXcmFwcGVyXCI7XHJcbmltcG9ydCB7IE53Y3REYXRhRW50cnlXcmFwcGVyIH0gZnJvbSBcIi4vbndjdERhdGFFbnRyeVdyYXBwZXJcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE53Y3RDb25maWdFbnRyaWVzV3JhcHBlcntcclxuXHJcbiAgICBwcml2YXRlIF93Q29uZmlnRW50cmllcyA6IE53Y3RDb25maWdFbnRyeVdyYXBwZXJbXTtcclxuICAgIHByaXZhdGUgX3dDb25maWdFbnRyaWVzU29ydGVkIDogTndjdENvbmZpZ0VudHJ5V3JhcHBlcltdID0gbmV3IEFycmF5PE53Y3RDb25maWdFbnRyeVdyYXBwZXI+KCk7XHJcbiAgICBwcml2YXRlIF9jb25maWdJRHNTb3J0ZWQgOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVwcm9jZXNzaW5nQ29tcGxldGVkID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZ0VudHJpZXMgOiBOd2N0Q29uZmlnRW50cnlXcmFwcGVyW10pe1xyXG4gICAgICAgIHRoaXMuX3dDb25maWdFbnRyaWVzID0gY29uZmlnRW50cmllcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWdFbnRyeSgpIDogTndjdENvbmZpZ0VudHJ5V3JhcHBlcltde1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93Q29uZmlnRW50cmllcztcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIHBlcmZvcm0gYWxsIHByZXByb2Nlc3NpbmcgdGFza3MgdG8gYWxsb3cgYSBmYXN0IHNlYXJjaFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdENvbmZpZ0VudHJpZXNXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcmVwcm9jZXNzKCl7XHJcbiAgICAgICAgLy8gb25seSBkbyBvbmNlXHJcbiAgICAgICAgaWYodGhpcy5fcHJlcHJvY2Vzc2luZ0NvbXBsZXRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcHJlcHJvY2Vzc2luZ0NvbXBsZXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc29ydEJ5SWQoKTsgLy8gb25seSBleGVjdXRlZCBvbmNlIGFueXdheVxyXG4gICAgICAgIHRoaXMuc2V0Q29uZmlnSURzU29ydGVkKCk7IC8vIG9ubHkgZXhlY3V0ZWQgb25jZSBhbnl3YXlcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNvcnRlZCBlbnRyaWVzIGFycmF5IChzb3J0ZWQgYnkgYXNjZW5kaW5nIGNvbmZpZ1JlY29yZElEKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdENvbmZpZ0VudHJpZXNXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc29ydEJ5SWQoKXtcclxuICAgICAgICB0aGlzLl93Q29uZmlnRW50cmllc1NvcnRlZCA9IHRoaXMuX3dDb25maWdFbnRyaWVzLnNvcnQodGhpcy5jb21wYXJlQ29uZmlnSWQpOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVzZWQgdG8gc29ydCB0aGUgY29uZmlnIGVudHJpZXMgYmFzZWQgb24gY29uZmlnUmVjb3JkSURcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJTndjdENvbmZpZ0VudHJ5fSBhXHJcbiAgICAgKiBAcGFyYW0ge0lOd2N0Q29uZmlnRW50cnl9IGJcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdENvbmZpZ0VudHJpZXNXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29tcGFyZUNvbmZpZ0lkKGEgOiBOd2N0Q29uZmlnRW50cnlXcmFwcGVyLCBiOiBOd2N0Q29uZmlnRW50cnlXcmFwcGVyKSA6IG51bWJlcntcclxuICAgICAgICAvLyB1bmRlZmluZWQgc2hvdWxkIGJlIHNldCB0byB0aGUgZW5kXHJcbiAgICAgICAgaWYoIWEuY29uZmlnRW50cnkuY29uZmlndXJhdGlvblJlY29yZElkLnZhbGlkKXtcclxuICAgICAgICAgICAgcmV0dXJuIDE7IC8vIHBvc2l0aXZlIG51bWJlciAtLT4gY2hhbmdlIG9yZGVyIC0tPiBiLGFcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWIuY29uZmlnRW50cnkuY29uZmlndXJhdGlvblJlY29yZElkLnZhbGlkKXtcclxuICAgICAgICAgICAgcmV0dXJuIC0xOyAvLyBuZWdhdGl2ZSBudW1iZXIgLS0+IG5vdGhpbmcgdG8gZG8gLS0+IGEsYlxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYS5jb25maWdFbnRyeS5jb25maWd1cmF0aW9uUmVjb3JkSWQudmFsdWUgLSBiLmNvbmZpZ0VudHJ5LmNvbmZpZ3VyYXRpb25SZWNvcmRJZC52YWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGFuIGFycmF5IHRoYXQgb25seSBjb250YWlucyB0aGUgY29uZmlnIElEcyAoZm9yIHVzZSBpbiBiaW5hcnkgc2VhcmNoKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdENvbmZpZ0VudHJpZXNXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q29uZmlnSURzU29ydGVkKCl7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnSURzU29ydGVkID0gdGhpcy5fd0NvbmZpZ0VudHJpZXNTb3J0ZWQubWFwKHdDb25maWdFbnRyaWUgPT4gd0NvbmZpZ0VudHJpZS5jb25maWdFbnRyeS5jb25maWd1cmF0aW9uUmVjb3JkSWQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0Q29uZmlnRW50cmllc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbXBCaW5TZWFyY2hOdW1iZXIocDogbnVtYmVyLCBxOiBudW1iZXIpIDogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiBwIC0gcTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgdXNlZCB0byBnZXQgdGhlIGNvbmZpZyBlbnRyeSBmb3IgYSBzcGVjaWZpYyBjb25maWcgaWRcclxuICAgICAqIEl0IHJldHVybnMgdW5kZWZpbmVkIGlmIGl0IGNhbid0IGJlIGZvdW5kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7KElOd2N0Q29uZmlnRW50cnkgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyaWVzV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29uZmlnRW50cnkoaWQgOiBudW1iZXIpIDogTndjdENvbmZpZ0VudHJ5V3JhcHBlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICB0aGlzLnByZXByb2Nlc3MoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZXR1cm4gdGhlIGNvbmZpZyBlbnRyeSB3aXRoIHRoZSBjb3JyZWN0IGlkIG9yIHVuZGlmaW5lZFxyXG4gICAgICAgIGxldCBhcnJheUluZGV4ID0gQmluU2VhcmNoLmZpbmRFeGFjdE1hdGNoKHRoaXMuX2NvbmZpZ0lEc1NvcnRlZCxpZCx0aGlzLmNtcEJpblNlYXJjaE51bWJlcik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl93Q29uZmlnRW50cmllc1NvcnRlZFthcnJheUluZGV4XTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyBmb3IgdGhlIG1hdGNoaW5nIGNvbmZpZyBlbnRyeVxyXG4gICAgICogIGlmIGl0IGNhbiBiZSBmb3VuZCwgdGhlbjpcclxuICAgICAqICAgICAgLSB0aGUgbGluayB0byB0aGUgZGF0YSBlbnRyeSB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgY29uZmlnIGVudHJ5XHJcbiAgICAgKiAgICAgIC0gdGhlIGNvbmZpZyBlbnRyeSBpcyByZXR1cm5lZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TndjdERhdGFFbnRyeVdyYXBwZXJ9IHdEYXRhRW50cnlcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0Q29uZmlnRW50cmllc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxpbmtEYXRhRW50cnkyQ29uZmlnRW50cnkod0RhdGFFbnRyeSA6IE53Y3REYXRhRW50cnlXcmFwcGVyKSA6IE53Y3RDb25maWdFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIHZhbGlkIGNvbmZpZyBJRFxyXG4gICAgICAgIGlmKCF3RGF0YUVudHJ5LmRhdGFFbnRyeS5jb25maWdJZC52YWxpZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGNvbmZpZ0lkIDogbnVtYmVyID0gd0RhdGFFbnRyeS5kYXRhRW50cnkuY29uZmlnSWQudmFsdWU7XHJcblxyXG4gICAgICAgIGxldCBjb25maWdFbnRyeSA6IE53Y3RDb25maWdFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQgPSB0aGlzLmdldENvbmZpZ0VudHJ5KGNvbmZpZ0lkKTtcclxuXHJcbiAgICAgICAgLy8gY29uZmlnIGNvdWxkIG5vdCBiZSBmb3VuZFxyXG4gICAgICAgIGlmKGNvbmZpZ0VudHJ5ID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBjb25maWcgYXZhaWxhYmxlXHJcbiAgICAgICAgY29uZmlnRW50cnkuYWRkRGF0YUVudHJ5UmVmKHdEYXRhRW50cnkpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnRW50cnk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyBmb3IgcGVyZm9ybWFuY2UgY29tcGFyaXNvbiBvbmx5XHJcbiAgICBwdWJsaWMgZ2V0Q29uZmlnRW50cnlEZXByaXZjYXRlZChpZCA6IG51bWJlcikgOiBOd2N0Q29uZmlnRW50cnlXcmFwcGVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIHRoaXMucHJlcHJvY2VzcygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl93Q29uZmlnRW50cmllcy5maW5kKGVudHJ5ID0+IGVudHJ5LmNvbmZpZ0VudHJ5LnZhbGlkICYmIGVudHJ5LmNvbmZpZ0VudHJ5LmNvbmZpZ3VyYXRpb25SZWNvcmRJZC52YWx1ZSA9PT0gaWQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiBhbGwgY29uZmlnIGVudHJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxOd2N0Q29uZmlnRW50cnlXcmFwcGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0Q29uZmlnRW50cmllc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB3Q29uZmlnRW50aXJlcygpIDogQXJyYXk8TndjdENvbmZpZ0VudHJ5V3JhcHBlcj57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dDb25maWdFbnRyaWVzO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctDataEntriesWrapper = /** @class */ (function () {
        function NwctDataEntriesWrapper(dataEntries) {
            if (dataEntries === void 0) { dataEntries = new Array(); }
            this._wDataEntriesSorted = new Array();
            this._wDataEntries = dataEntries;
        }
        NwctDataEntriesWrapper.prototype.addDataEntry = function (dataEntry) {
            this._wDataEntries.push(dataEntry);
        };
        Object.defineProperty(NwctDataEntriesWrapper.prototype, "wDataEntries", {
            get: function () {
                return this._wDataEntries;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * sorts the data entries by ID
         *
         * @private
         * @memberof NwctDataEntriesWrapper
         */
        NwctDataEntriesWrapper.prototype.sortByIndex = function () {
            // do only once
            if (this.isSortedByIndex) {
                return;
            }
            this._wDataEntriesSorted = this._wDataEntries.sort(this.compareIndex);
        };
        Object.defineProperty(NwctDataEntriesWrapper.prototype, "isSortedByIndex", {
            // checks if the entries were already sorted
            get: function () {
                return this.wDataEntries.length === this._wDataEntriesSorted.length;
            },
            enumerable: true,
            configurable: true
        });
        NwctDataEntriesWrapper.prototype.compareIndex = function (a, b) {
            // undefined should be set to the end
            if (!a.dataEntry.index.valid) {
                return 1; // positive number --> change order --> b,a
            }
            if (!b.dataEntry.index.valid) {
                return -1; // negative number --> nothing to do --> a,b
            }
            // 
            return a.dataEntry.index.value - b.dataEntry.index.value;
        };
        /**
         * Find the response to a given request
         *
         * Prerequisits:
         * - All probed data entries all fullfill: configId(probe) == configId(request) +1
         *
         * @param {NwctDataEntryWrapper} request
         * @returns {(NwctDataEntryWrapper | undefined)}
         * @memberof NwctDataEntriesWrapper
         */
        NwctDataEntriesWrapper.prototype.findResponse = function (request, maxIndex) {
            // validate input data
            if (request.wConfigEntry === undefined) {
                return undefined;
            }
            // prepare return data
            var response = undefined;
            // begin the search with the first entry that has a higher index number
            var searchIndex = this._wDataEntriesSorted.findIndex(function (probe) { return probe.dataEntry.index.value > request.dataEntry.index.value; });
            // check if there is no next element available --> exit
            if (searchIndex === -1) {
                return undefined;
            }
            var isMatch = false;
            var abort = false;
            // search for the first match, but stop at the end of the array
            while (searchIndex < this._wDataEntriesSorted.length && !isMatch && !abort) {
                // fetch next entry
                var probe = this._wDataEntriesSorted[searchIndex];
                // check for abort criteria
                abort = NwctDataEntriesWrapper.isAbortCriteriaMet(probe, maxIndex);
                // if(abort){
                //     console.debug("abort criteria met: request: index="+request.dataEntry.index.value.toString()+"; abortIndex="+maxIndex.toString());
                // }
                // does entry match?
                isMatch = NwctDataEntriesWrapper.isResponse(probe, request);
                if (isMatch && !abort) {
                    // set return values
                    response = probe;
                }
                // increment search index
                searchIndex++;
            }
            return response;
        };
        /**
         * checks if the search for a response should be stopped because the abort criteria is met
         *
         * @private
         * @static
         * @param {NwctDataEntryWrapper} probedDataEntry
         * @param {number} maxIndex
         * @returns {boolean}
         * @memberof NwctDataEntriesWrapper
         */
        NwctDataEntriesWrapper.isAbortCriteriaMet = function (probedDataEntry, maxIndex) {
            if (probedDataEntry == undefined || !probedDataEntry.dataEntry.index.valid) {
                return true;
            }
            return probedDataEntry.dataEntry.index.value >= maxIndex;
        };
        /**
         * Find the next request to a given request
         *  used to stop the search for response
         *
         * Prerequisits:
         * - All probed data entries all fullfill: configId(probe) == configId(request)
         *
         * @param {NwctDataEntryWrapper} request
         * @returns {(NwctDataEntryWrapper | undefined)}
         * @memberof NwctDataEntriesWrapper
         */
        NwctDataEntriesWrapper.prototype.findNextRequest = function (request) {
            // validate input data
            if (request.wConfigEntry === undefined) {
                return undefined;
            }
            // prepare return data
            var nextRequest = undefined;
            // begin the search with the first entry that has a higher index number
            var searchIndex = this._wDataEntriesSorted.findIndex(function (probe) { return probe.dataEntry.index.value > request.dataEntry.index.value; });
            // no next entry found
            if (searchIndex === -1) {
                return undefined;
            }
            var isMatch = false;
            var abort = false;
            // search for the first match, but stop at the end of the array
            while (searchIndex < this._wDataEntriesSorted.length && !isMatch && !abort) {
                // fetch next entry
                var probe = this._wDataEntriesSorted[searchIndex];
                // does entry match?
                isMatch = NwctDataEntriesWrapper.isNextRequest(probe, request);
                if (isMatch) {
                    // set return values
                    nextRequest = probe;
                }
                // increment search index
                searchIndex++;
            }
            return nextRequest;
        };
        /**
         * Check response to a given reqeust
         *
         * Prerequisits:
         * - The probed data entries all fullfill: configId(probe) == configId(request) +1
         * - The probed data entries have been inserted after the request
         *
         * @private
         * @static
         * @param {NwctDataEntryWrapper} probedDataEntry
         * @param {NwctDataEntryWrapper} request
         * @returns {boolean}
         * @memberof NwctDataEntriesWrapper
         */
        NwctDataEntriesWrapper.isResponse = function (probedDataEntry, request) {
            if (probedDataEntry == undefined || request == undefined) {
                console.error("nwctProvider: probedDataEntry or request undefined!");
                return false;
            }
            // criteria 1: parCnt has to be identical
            var criteria1 = probedDataEntry.dataEntry.parCnt.valid &&
                request.dataEntry.parCnt.valid &&
                probedDataEntry.dataEntry.parCnt.value === request.dataEntry.parCnt.value;
            // criteria 2: ChannelIndex(Response) == Channelndex(Request)                                 
            var criteria2 = probedDataEntry.dataEntry.channelIndex.valid &&
                request.dataEntry.channelIndex.valid &&
                probedDataEntry.dataEntry.channelIndex.value === request.dataEntry.channelIndex.value;
            // all criteria must be met
            return criteria1 && criteria2;
        };
        /**
         * checks if the probe is the next request
         *
         * Prerequisits:
         * - The probed data entries all fullfill: configId(probe) == configId(request)
         * - The probed data entries have been inserted after the request
         *
         * @private
         * @static
         * @memberof NwctDataEntriesWrapper
         */
        NwctDataEntriesWrapper.isNextRequest = function (probedDataEntry, request) {
            if (probedDataEntry == undefined || request == undefined) {
                console.error("nwctProvider: probedDataEntry or request undefined!");
                return false;
            }
            // criteria 1: parCnt has to be identical --> ParCnt(Request2) == ParCnt(Request1)
            var criteria1 = probedDataEntry.dataEntry.parCnt.valid &&
                request.dataEntry.parCnt.valid &&
                probedDataEntry.dataEntry.parCnt.value === request.dataEntry.parCnt.value;
            // criteria 2: ChannelIndex(Request2) == Channelndex(Request1)                             
            var criteria2 = probedDataEntry.dataEntry.channelIndex.valid &&
                request.dataEntry.channelIndex.valid &&
                probedDataEntry.dataEntry.channelIndex.value === request.dataEntry.channelIndex.value;
            // all criteria must be met
            return criteria1 && criteria2;
        };
        return NwctDataEntriesWrapper;
    }());
    exports.NwctDataEntriesWrapper = NwctDataEntriesWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdERhdGFFbnRyaWVzV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9lbnJpY2htZW50L253Y3REYXRhRW50cmllc1dyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFLSSxnQ0FBbUIsV0FBd0U7WUFBeEUsNEJBQUEsRUFBQSxrQkFBMkMsS0FBSyxFQUF3QjtZQUZuRix3QkFBbUIsR0FBZ0MsSUFBSSxLQUFLLEVBQXdCLENBQUM7WUFHekYsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDckMsQ0FBQztRQUVNLDZDQUFZLEdBQW5CLFVBQW9CLFNBQWdDO1lBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxzQkFBVyxnREFBWTtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzlCLENBQUM7OztXQUFBO1FBSUQ7Ozs7O1dBS0c7UUFDSSw0Q0FBVyxHQUFsQjtZQUVJLGVBQWU7WUFDZixJQUFHLElBQUksQ0FBQyxlQUFlLEVBQUM7Z0JBQ3BCLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUUsQ0FBQztRQUdELHNCQUFZLG1EQUFlO1lBRDNCLDRDQUE0QztpQkFDNUM7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO1lBQ3hFLENBQUM7OztXQUFBO1FBR08sNkNBQVksR0FBcEIsVUFBcUIsQ0FBd0IsRUFBRSxDQUF1QjtZQUNsRSxxQ0FBcUM7WUFDckMsSUFBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQztnQkFDeEIsT0FBTyxDQUFDLENBQUMsQ0FBQywyQ0FBMkM7YUFDeEQ7WUFDRCxJQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDO2dCQUN4QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsNENBQTRDO2FBQzFEO1lBQ0QsR0FBRztZQUNILE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM3RCxDQUFDO1FBR0Q7Ozs7Ozs7OztXQVNHO1FBQ0ksNkNBQVksR0FBbkIsVUFBb0IsT0FBOEIsRUFBRSxRQUFnQjtZQUVoRSxzQkFBc0I7WUFDdEIsSUFBRyxPQUFPLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBQztnQkFDbEMsT0FBTyxTQUFTLENBQUM7YUFDcEI7WUFFRCxzQkFBc0I7WUFDdEIsSUFBSSxRQUFRLEdBQXNDLFNBQVMsQ0FBQztZQUU1RCx1RUFBdUU7WUFDdkUsSUFBSSxXQUFXLEdBQVksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQTNELENBQTJELENBQUMsQ0FBQztZQUVwSSx1REFBdUQ7WUFDdkQsSUFBRyxXQUFXLEtBQUssQ0FBQyxDQUFDLEVBQUM7Z0JBQ2xCLE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1lBR0QsSUFBSSxPQUFPLEdBQWEsS0FBSyxDQUFDO1lBQzlCLElBQUksS0FBSyxHQUFhLEtBQUssQ0FBQztZQUU1QiwrREFBK0Q7WUFDL0QsT0FBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBQztnQkFFdEUsbUJBQW1CO2dCQUNuQixJQUFJLEtBQUssR0FBMEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUd6RSwyQkFBMkI7Z0JBQzNCLEtBQUssR0FBRyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRW5FLGFBQWE7Z0JBQ2IseUlBQXlJO2dCQUN6SSxJQUFJO2dCQUVKLG9CQUFvQjtnQkFDcEIsT0FBTyxHQUFHLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRTVELElBQUcsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFDO29CQUNqQixvQkFBb0I7b0JBQ3BCLFFBQVEsR0FBRyxLQUFLLENBQUM7aUJBQ3BCO2dCQUVELHlCQUF5QjtnQkFDekIsV0FBVyxFQUFFLENBQUM7YUFFakI7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1kseUNBQWtCLEdBQWpDLFVBQWtDLGVBQXNDLEVBQUUsUUFBaUI7WUFFdkYsSUFBRyxlQUFlLElBQUksU0FBUyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDO2dCQUN0RSxPQUFPLElBQUksQ0FBQzthQUNmO1lBRUQsT0FBTyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO1FBQzdELENBQUM7UUFLRDs7Ozs7Ozs7OztXQVVHO1FBQ0MsZ0RBQWUsR0FBdEIsVUFBdUIsT0FBOEI7WUFFbEQsc0JBQXNCO1lBQ3RCLElBQUcsT0FBTyxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUM7Z0JBQ2xDLE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1lBRUQsc0JBQXNCO1lBQ3RCLElBQUksV0FBVyxHQUFzQyxTQUFTLENBQUM7WUFFL0QsdUVBQXVFO1lBQ3ZFLElBQUksV0FBVyxHQUFZLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUEzRCxDQUEyRCxDQUFDLENBQUM7WUFFcEksc0JBQXNCO1lBQ3RCLElBQUcsV0FBVyxLQUFLLENBQUMsQ0FBQyxFQUFDO2dCQUNsQixPQUFPLFNBQVMsQ0FBQzthQUNwQjtZQUVELElBQUksT0FBTyxHQUFhLEtBQUssQ0FBQztZQUM5QixJQUFJLEtBQUssR0FBYSxLQUFLLENBQUM7WUFFNUIsK0RBQStEO1lBQy9ELE9BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUM7Z0JBRXRFLG1CQUFtQjtnQkFDbkIsSUFBSSxLQUFLLEdBQTBCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFHekUsb0JBQW9CO2dCQUNwQixPQUFPLEdBQUcsc0JBQXNCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFFL0QsSUFBRyxPQUFPLEVBQUM7b0JBQ1Asb0JBQW9CO29CQUNwQixXQUFXLEdBQUcsS0FBSyxDQUFDO2lCQUN2QjtnQkFFRCx5QkFBeUI7Z0JBQ3pCLFdBQVcsRUFBRSxDQUFDO2FBRWpCO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUdHOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDWSxpQ0FBVSxHQUF6QixVQUEwQixlQUFzQyxFQUFFLE9BQThCO1lBRTVGLElBQUcsZUFBZSxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksU0FBUyxFQUFDO2dCQUNwRCxPQUFPLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7Z0JBQ3JFLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQseUNBQXlDO1lBQ3pDLElBQUksU0FBUyxHQUFtQixlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dCQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dCQUM5QixlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBRTFHLDhGQUE4RjtZQUM5RixJQUFJLFNBQVMsR0FBbUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSztnQkFDNUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSztnQkFDcEMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUd0SCwyQkFBMkI7WUFDM0IsT0FBTyxTQUFTLElBQUksU0FBUyxDQUFFO1FBQ25DLENBQUM7UUFJRDs7Ozs7Ozs7OztXQVVHO1FBQ1ksb0NBQWEsR0FBNUIsVUFBNkIsZUFBc0MsRUFBRSxPQUE4QjtZQUMvRixJQUFHLGVBQWUsSUFBSSxTQUFTLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBQztnQkFDcEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO2dCQUNyRSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELGtGQUFrRjtZQUNsRixJQUFJLFNBQVMsR0FBbUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDdEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDOUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUUxRywyRkFBMkY7WUFDM0YsSUFBSSxTQUFTLEdBQW1CLGVBQWUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUs7Z0JBQzVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUs7Z0JBQ3BDLGVBQWUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFHdEgsMkJBQTJCO1lBQzNCLE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBRTtRQUVuQyxDQUFDO1FBR0wsNkJBQUM7SUFBRCxDQUFDLEFBM1FELElBMlFDO0lBM1FZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE53Y3REYXRhRW50cnlXcmFwcGVyIH0gZnJvbSBcIi4vbndjdERhdGFFbnRyeVdyYXBwZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTndjdERhdGFFbnRyaWVzV3JhcHBlcntcclxuXHJcbiAgICBwcml2YXRlIF93RGF0YUVudHJpZXMgICAgICAgICAgIDogTndjdERhdGFFbnRyeVdyYXBwZXJbXTtcclxuICAgIHByaXZhdGUgX3dEYXRhRW50cmllc1NvcnRlZCAgICAgOiBOd2N0RGF0YUVudHJ5V3JhcHBlcltdID0gbmV3IEFycmF5PE53Y3REYXRhRW50cnlXcmFwcGVyPigpO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkYXRhRW50cmllcyA6IE53Y3REYXRhRW50cnlXcmFwcGVyW10gPSBuZXcgQXJyYXk8TndjdERhdGFFbnRyeVdyYXBwZXI+KCkpe1xyXG4gICAgICAgIHRoaXMuX3dEYXRhRW50cmllcyA9IGRhdGFFbnRyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGREYXRhRW50cnkoZGF0YUVudHJ5IDogTndjdERhdGFFbnRyeVdyYXBwZXIpe1xyXG4gICAgICAgIHRoaXMuX3dEYXRhRW50cmllcy5wdXNoKGRhdGFFbnRyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB3RGF0YUVudHJpZXMoKSA6IE53Y3REYXRhRW50cnlXcmFwcGVyW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dEYXRhRW50cmllcztcclxuICAgIH0gICBcclxuXHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHNvcnRzIHRoZSBkYXRhIGVudHJpZXMgYnkgSURcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3REYXRhRW50cmllc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNvcnRCeUluZGV4KCl7XHJcblxyXG4gICAgICAgIC8vIGRvIG9ubHkgb25jZVxyXG4gICAgICAgIGlmKHRoaXMuaXNTb3J0ZWRCeUluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fd0RhdGFFbnRyaWVzU29ydGVkID0gdGhpcy5fd0RhdGFFbnRyaWVzLnNvcnQodGhpcy5jb21wYXJlSW5kZXgpOyAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrcyBpZiB0aGUgZW50cmllcyB3ZXJlIGFscmVhZHkgc29ydGVkXHJcbiAgICBwcml2YXRlIGdldCBpc1NvcnRlZEJ5SW5kZXgoKSA6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud0RhdGFFbnRyaWVzLmxlbmd0aCA9PT0gdGhpcy5fd0RhdGFFbnRyaWVzU29ydGVkLmxlbmd0aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBwcml2YXRlIGNvbXBhcmVJbmRleChhIDogTndjdERhdGFFbnRyeVdyYXBwZXIsIGI6IE53Y3REYXRhRW50cnlXcmFwcGVyKSA6IG51bWJlcntcclxuICAgICAgICAvLyB1bmRlZmluZWQgc2hvdWxkIGJlIHNldCB0byB0aGUgZW5kXHJcbiAgICAgICAgaWYoIWEuZGF0YUVudHJ5LmluZGV4LnZhbGlkKXtcclxuICAgICAgICAgICAgcmV0dXJuIDE7IC8vIHBvc2l0aXZlIG51bWJlciAtLT4gY2hhbmdlIG9yZGVyIC0tPiBiLGFcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWIuZGF0YUVudHJ5LmluZGV4LnZhbGlkKXtcclxuICAgICAgICAgICAgcmV0dXJuIC0xOyAvLyBuZWdhdGl2ZSBudW1iZXIgLS0+IG5vdGhpbmcgdG8gZG8gLS0+IGEsYlxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBcclxuICAgICAgICByZXR1cm4gYS5kYXRhRW50cnkuaW5kZXgudmFsdWUgLSBiLmRhdGFFbnRyeS5pbmRleC52YWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIHRoZSByZXNwb25zZSB0byBhIGdpdmVuIHJlcXVlc3RcclxuICAgICAqIFxyXG4gICAgICogUHJlcmVxdWlzaXRzOlxyXG4gICAgICogLSBBbGwgcHJvYmVkIGRhdGEgZW50cmllcyBhbGwgZnVsbGZpbGw6IGNvbmZpZ0lkKHByb2JlKSA9PSBjb25maWdJZChyZXF1ZXN0KSArMSBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge053Y3REYXRhRW50cnlXcmFwcGVyfSByZXF1ZXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KE53Y3REYXRhRW50cnlXcmFwcGVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJpZXNXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kUmVzcG9uc2UocmVxdWVzdCA6IE53Y3REYXRhRW50cnlXcmFwcGVyLCBtYXhJbmRleDogbnVtYmVyICkgOiBOd2N0RGF0YUVudHJ5V3JhcHBlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBcclxuICAgICAgICAvLyB2YWxpZGF0ZSBpbnB1dCBkYXRhXHJcbiAgICAgICAgaWYocmVxdWVzdC53Q29uZmlnRW50cnkgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBwcmVwYXJlIHJldHVybiBkYXRhXHJcbiAgICAgICAgbGV0IHJlc3BvbnNlIDogTndjdERhdGFFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vIGJlZ2luIHRoZSBzZWFyY2ggd2l0aCB0aGUgZmlyc3QgZW50cnkgdGhhdCBoYXMgYSBoaWdoZXIgaW5kZXggbnVtYmVyXHJcbiAgICAgICAgbGV0IHNlYXJjaEluZGV4IDogbnVtYmVyID0gdGhpcy5fd0RhdGFFbnRyaWVzU29ydGVkLmZpbmRJbmRleChwcm9iZSA9PiBwcm9iZS5kYXRhRW50cnkuaW5kZXgudmFsdWUgPiByZXF1ZXN0LmRhdGFFbnRyeS5pbmRleC52YWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIG5vIG5leHQgZWxlbWVudCBhdmFpbGFibGUgLS0+IGV4aXRcclxuICAgICAgICBpZihzZWFyY2hJbmRleCA9PT0gLTEpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgbGV0IGlzTWF0Y2ggOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGFib3J0IDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgdGhlIGZpcnN0IG1hdGNoLCBidXQgc3RvcCBhdCB0aGUgZW5kIG9mIHRoZSBhcnJheVxyXG4gICAgICAgIHdoaWxlKHNlYXJjaEluZGV4IDwgdGhpcy5fd0RhdGFFbnRyaWVzU29ydGVkLmxlbmd0aCAmJiAhaXNNYXRjaCAmJiAhYWJvcnQpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZmV0Y2ggbmV4dCBlbnRyeVxyXG4gICAgICAgICAgICBsZXQgcHJvYmUgOiBOd2N0RGF0YUVudHJ5V3JhcHBlciA9IHRoaXMuX3dEYXRhRW50cmllc1NvcnRlZFtzZWFyY2hJbmRleF07XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgYWJvcnQgY3JpdGVyaWFcclxuICAgICAgICAgICAgYWJvcnQgPSBOd2N0RGF0YUVudHJpZXNXcmFwcGVyLmlzQWJvcnRDcml0ZXJpYU1ldChwcm9iZSwgbWF4SW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYoYWJvcnQpe1xyXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5kZWJ1ZyhcImFib3J0IGNyaXRlcmlhIG1ldDogcmVxdWVzdDogaW5kZXg9XCIrcmVxdWVzdC5kYXRhRW50cnkuaW5kZXgudmFsdWUudG9TdHJpbmcoKStcIjsgYWJvcnRJbmRleD1cIittYXhJbmRleC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gZG9lcyBlbnRyeSBtYXRjaD9cclxuICAgICAgICAgICAgaXNNYXRjaCA9IE53Y3REYXRhRW50cmllc1dyYXBwZXIuaXNSZXNwb25zZShwcm9iZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGlzTWF0Y2ggJiYgIWFib3J0KXtcclxuICAgICAgICAgICAgICAgIC8vIHNldCByZXR1cm4gdmFsdWVzXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHByb2JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGluY3JlbWVudCBzZWFyY2ggaW5kZXhcclxuICAgICAgICAgICAgc2VhcmNoSW5kZXgrKztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVja3MgaWYgdGhlIHNlYXJjaCBmb3IgYSByZXNwb25zZSBzaG91bGQgYmUgc3RvcHBlZCBiZWNhdXNlIHRoZSBhYm9ydCBjcml0ZXJpYSBpcyBtZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtOd2N0RGF0YUVudHJ5V3JhcHBlcn0gcHJvYmVkRGF0YUVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4SW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3REYXRhRW50cmllc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNBYm9ydENyaXRlcmlhTWV0KHByb2JlZERhdGFFbnRyeSA6IE53Y3REYXRhRW50cnlXcmFwcGVyLCBtYXhJbmRleCA6IG51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBcclxuICAgICAgICBpZihwcm9iZWREYXRhRW50cnkgPT0gdW5kZWZpbmVkIHx8ICFwcm9iZWREYXRhRW50cnkuZGF0YUVudHJ5LmluZGV4LnZhbGlkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcHJvYmVkRGF0YUVudHJ5LmRhdGFFbnRyeS5pbmRleC52YWx1ZSA+PSBtYXhJbmRleDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgdGhlIG5leHQgcmVxdWVzdCB0byBhIGdpdmVuIHJlcXVlc3RcclxuICAgICAqICB1c2VkIHRvIHN0b3AgdGhlIHNlYXJjaCBmb3IgcmVzcG9uc2VcclxuICAgICAqIFxyXG4gICAgICogUHJlcmVxdWlzaXRzOlxyXG4gICAgICogLSBBbGwgcHJvYmVkIGRhdGEgZW50cmllcyBhbGwgZnVsbGZpbGw6IGNvbmZpZ0lkKHByb2JlKSA9PSBjb25maWdJZChyZXF1ZXN0KVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TndjdERhdGFFbnRyeVdyYXBwZXJ9IHJlcXVlc3RcclxuICAgICAqIEByZXR1cm5zIHsoTndjdERhdGFFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3REYXRhRW50cmllc1dyYXBwZXJcclxuICAgICAqL1xyXG4gcHVibGljIGZpbmROZXh0UmVxdWVzdChyZXF1ZXN0IDogTndjdERhdGFFbnRyeVdyYXBwZXIpIDogTndjdERhdGFFbnRyeVdyYXBwZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgXHJcbiAgICAvLyB2YWxpZGF0ZSBpbnB1dCBkYXRhXHJcbiAgICBpZihyZXF1ZXN0LndDb25maWdFbnRyeSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByZXBhcmUgcmV0dXJuIGRhdGFcclxuICAgIGxldCBuZXh0UmVxdWVzdCA6IE53Y3REYXRhRW50cnlXcmFwcGVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIC8vIGJlZ2luIHRoZSBzZWFyY2ggd2l0aCB0aGUgZmlyc3QgZW50cnkgdGhhdCBoYXMgYSBoaWdoZXIgaW5kZXggbnVtYmVyXHJcbiAgICBsZXQgc2VhcmNoSW5kZXggOiBudW1iZXIgPSB0aGlzLl93RGF0YUVudHJpZXNTb3J0ZWQuZmluZEluZGV4KHByb2JlID0+IHByb2JlLmRhdGFFbnRyeS5pbmRleC52YWx1ZSA+IHJlcXVlc3QuZGF0YUVudHJ5LmluZGV4LnZhbHVlKTtcclxuXHJcbiAgICAvLyBubyBuZXh0IGVudHJ5IGZvdW5kXHJcbiAgICBpZihzZWFyY2hJbmRleCA9PT0gLTEpe1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlzTWF0Y2ggOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsZXQgYWJvcnQgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIC8vIHNlYXJjaCBmb3IgdGhlIGZpcnN0IG1hdGNoLCBidXQgc3RvcCBhdCB0aGUgZW5kIG9mIHRoZSBhcnJheVxyXG4gICAgd2hpbGUoc2VhcmNoSW5kZXggPCB0aGlzLl93RGF0YUVudHJpZXNTb3J0ZWQubGVuZ3RoICYmICFpc01hdGNoICYmICFhYm9ydCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZmV0Y2ggbmV4dCBlbnRyeVxyXG4gICAgICAgIGxldCBwcm9iZSA6IE53Y3REYXRhRW50cnlXcmFwcGVyID0gdGhpcy5fd0RhdGFFbnRyaWVzU29ydGVkW3NlYXJjaEluZGV4XTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICAvLyBkb2VzIGVudHJ5IG1hdGNoP1xyXG4gICAgICAgIGlzTWF0Y2ggPSBOd2N0RGF0YUVudHJpZXNXcmFwcGVyLmlzTmV4dFJlcXVlc3QocHJvYmUsIHJlcXVlc3QpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYoaXNNYXRjaCl7XHJcbiAgICAgICAgICAgIC8vIHNldCByZXR1cm4gdmFsdWVzXHJcbiAgICAgICAgICAgIG5leHRSZXF1ZXN0ID0gcHJvYmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgLy8gaW5jcmVtZW50IHNlYXJjaCBpbmRleFxyXG4gICAgICAgIHNlYXJjaEluZGV4Kys7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHRSZXF1ZXN0O1xyXG59XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgcmVzcG9uc2UgdG8gYSBnaXZlbiByZXFldXN0XHJcbiAgICAgKiBcclxuICAgICAqIFByZXJlcXVpc2l0czpcclxuICAgICAqIC0gVGhlIHByb2JlZCBkYXRhIGVudHJpZXMgYWxsIGZ1bGxmaWxsOiBjb25maWdJZChwcm9iZSkgPT0gY29uZmlnSWQocmVxdWVzdCkgKzEgXHJcbiAgICAgKiAtIFRoZSBwcm9iZWQgZGF0YSBlbnRyaWVzIGhhdmUgYmVlbiBpbnNlcnRlZCBhZnRlciB0aGUgcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge053Y3REYXRhRW50cnlXcmFwcGVyfSBwcm9iZWREYXRhRW50cnlcclxuICAgICAqIEBwYXJhbSB7TndjdERhdGFFbnRyeVdyYXBwZXJ9IHJlcXVlc3RcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3REYXRhRW50cmllc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNSZXNwb25zZShwcm9iZWREYXRhRW50cnkgOiBOd2N0RGF0YUVudHJ5V3JhcHBlciwgcmVxdWVzdCA6IE53Y3REYXRhRW50cnlXcmFwcGVyKSA6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBpZihwcm9iZWREYXRhRW50cnkgPT0gdW5kZWZpbmVkIHx8IHJlcXVlc3QgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm53Y3RQcm92aWRlcjogcHJvYmVkRGF0YUVudHJ5IG9yIHJlcXVlc3QgdW5kZWZpbmVkIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY3JpdGVyaWEgMTogcGFyQ250IGhhcyB0byBiZSBpZGVudGljYWxcclxuICAgICAgICBsZXQgY3JpdGVyaWExIDogYm9vbGVhbiA9ICAgICAgIHByb2JlZERhdGFFbnRyeS5kYXRhRW50cnkucGFyQ250LnZhbGlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmRhdGFFbnRyeS5wYXJDbnQudmFsaWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JlZERhdGFFbnRyeS5kYXRhRW50cnkucGFyQ250LnZhbHVlID09PSByZXF1ZXN0LmRhdGFFbnRyeS5wYXJDbnQudmFsdWU7XHJcblxyXG4gICAgICAgIC8vIGNyaXRlcmlhIDI6IENoYW5uZWxJbmRleChSZXNwb25zZSkgPT0gQ2hhbm5lbG5kZXgoUmVxdWVzdCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBsZXQgY3JpdGVyaWEyIDogYm9vbGVhbiA9ICAgICAgIHByb2JlZERhdGFFbnRyeS5kYXRhRW50cnkuY2hhbm5lbEluZGV4LnZhbGlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmRhdGFFbnRyeS5jaGFubmVsSW5kZXgudmFsaWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JlZERhdGFFbnRyeS5kYXRhRW50cnkuY2hhbm5lbEluZGV4LnZhbHVlID09PSByZXF1ZXN0LmRhdGFFbnRyeS5jaGFubmVsSW5kZXgudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gYWxsIGNyaXRlcmlhIG11c3QgYmUgbWV0XHJcbiAgICAgICAgcmV0dXJuIGNyaXRlcmlhMSAmJiBjcml0ZXJpYTIgO1xyXG4gICAgfSBcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hlY2tzIGlmIHRoZSBwcm9iZSBpcyB0aGUgbmV4dCByZXF1ZXN0XHJcbiAgICAgKiBcclxuICAgICAqIFByZXJlcXVpc2l0czpcclxuICAgICAqIC0gVGhlIHByb2JlZCBkYXRhIGVudHJpZXMgYWxsIGZ1bGxmaWxsOiBjb25maWdJZChwcm9iZSkgPT0gY29uZmlnSWQocmVxdWVzdClcclxuICAgICAqIC0gVGhlIHByb2JlZCBkYXRhIGVudHJpZXMgaGF2ZSBiZWVuIGluc2VydGVkIGFmdGVyIHRoZSByZXF1ZXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJpZXNXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGlzTmV4dFJlcXVlc3QocHJvYmVkRGF0YUVudHJ5IDogTndjdERhdGFFbnRyeVdyYXBwZXIsIHJlcXVlc3QgOiBOd2N0RGF0YUVudHJ5V3JhcHBlcil7XHJcbiAgICAgICAgaWYocHJvYmVkRGF0YUVudHJ5ID09IHVuZGVmaW5lZCB8fCByZXF1ZXN0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJud2N0UHJvdmlkZXI6IHByb2JlZERhdGFFbnRyeSBvciByZXF1ZXN0IHVuZGVmaW5lZCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNyaXRlcmlhIDE6IHBhckNudCBoYXMgdG8gYmUgaWRlbnRpY2FsIC0tPiBQYXJDbnQoUmVxdWVzdDIpID09IFBhckNudChSZXF1ZXN0MSlcclxuICAgICAgICBsZXQgY3JpdGVyaWExIDogYm9vbGVhbiA9ICAgICAgIHByb2JlZERhdGFFbnRyeS5kYXRhRW50cnkucGFyQ250LnZhbGlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmRhdGFFbnRyeS5wYXJDbnQudmFsaWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JlZERhdGFFbnRyeS5kYXRhRW50cnkucGFyQ250LnZhbHVlID09PSByZXF1ZXN0LmRhdGFFbnRyeS5wYXJDbnQudmFsdWU7XHJcblxyXG4gICAgICAgIC8vIGNyaXRlcmlhIDI6IENoYW5uZWxJbmRleChSZXF1ZXN0MikgPT0gQ2hhbm5lbG5kZXgoUmVxdWVzdDEpICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBsZXQgY3JpdGVyaWEyIDogYm9vbGVhbiA9ICAgICAgIHByb2JlZERhdGFFbnRyeS5kYXRhRW50cnkuY2hhbm5lbEluZGV4LnZhbGlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmRhdGFFbnRyeS5jaGFubmVsSW5kZXgudmFsaWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JlZERhdGFFbnRyeS5kYXRhRW50cnkuY2hhbm5lbEluZGV4LnZhbHVlID09PSByZXF1ZXN0LmRhdGFFbnRyeS5jaGFubmVsSW5kZXgudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gYWxsIGNyaXRlcmlhIG11c3QgYmUgbWV0XHJcbiAgICAgICAgcmV0dXJuIGNyaXRlcmlhMSAmJiBjcml0ZXJpYTIgO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59Il19
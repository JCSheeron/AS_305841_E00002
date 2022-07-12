define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *  This class is used to encapsulate the annomalities when dealing with virtual axis (node number handling and channel number handling)
     *
     * The number of virtual axis can exceed the maximum number of channels (255)
     * To handle that, in the binary ring buffer, the node number (which is irrelevant in this case) is misused to carry additional information
     *
     * A virtual axis can be dedected based on the
     *
     * The channel number is calculated by the following formula:
     * channelNumber = channelNumber + max(256(cfg_rec.node_nr- 1),0)
     *
     * The node number is also changed to 0 as this is more correct
     * nodeNo = 0
     *
     * @export
     * @abstract
     * @class NwctVirtAxHelper
     */
    var NwctVirtAxHelper = /** @class */ (function () {
        function NwctVirtAxHelper() {
        }
        /**
         * Get node number (taking virtual axis anomalities into account)
         *
         * @static
         * @param {NwctDataEntryWrapper} wDataEntry
         * @memberof NwctVirtAxHelper
         */
        NwctVirtAxHelper.getNodeNumber = function (wDataEntry) {
            // get the configuration entry
            var configEntry = NwctVirtAxHelper.nwctConfigEntry(wDataEntry);
            // check for invalid entry
            if (configEntry === undefined) {
                return -1;
            }
            // further input data checks
            if (!configEntry.datagramEncodingId.valid || !configEntry.nodeNumberOfDrive.valid) {
                return -1;
            }
            // check for virtual axis
            if (configEntry.datagramEncodingId.value === NwctVirtAxHelper.DATAGRAM_ENCODING_ID_VIRTUAL_AXIS) {
                return 0;
            }
            return configEntry.nodeNumberOfDrive.value;
        };
        /**
         * Get channel number (taking virtual axis anomalities into account)
         *
         * @static
         * @param {NwctDataEntryWrapper} wDataEntry
         * @returns {number}
         * @memberof NwctVirtAxHelper
         */
        NwctVirtAxHelper.getChannelNumber = function (wDataEntry) {
            // get the configuration entry
            var configEntry = NwctVirtAxHelper.nwctConfigEntry(wDataEntry);
            // check for invalid entry
            if (configEntry === undefined) {
                return -1;
            }
            // further input data checks
            if (!configEntry.datagramEncodingId.valid || !wDataEntry.dataEntry.channelIndex.valid || !configEntry.nodeNumberOfDrive.valid) {
                return -1;
            }
            // check for virtual axis
            if (configEntry.datagramEncodingId.value === NwctVirtAxHelper.DATAGRAM_ENCODING_ID_VIRTUAL_AXIS) {
                var channelNumber = wDataEntry.dataEntry.channelIndex.value;
                var nodeNumber = configEntry.nodeNumberOfDrive.value;
                // the additional information transferred via node no. is calculated into the channel number
                return channelNumber + Math.max(256 * (nodeNumber - 1), 0);
            }
            // a normal non virtual axis
            return wDataEntry.dataEntry.channelIndex.value;
        };
        /**
         * internal helper class to access the config records
         *
         * @private
         * @static
         * @param {NwctDataEntryWrapper} wDataEntry
         * @returns {(INwctConfigEntry | undefined)}
         * @memberof NwctVirtAxHelper
         */
        NwctVirtAxHelper.nwctConfigEntry = function (wDataEntry) {
            var _a;
            return (_a = wDataEntry.wConfigEntry) === null || _a === void 0 ? void 0 : _a.configEntry;
        };
        NwctVirtAxHelper.DATAGRAM_ENCODING_ID_VIRTUAL_AXIS = 1; // this encoding id (also called display_function in some documents) with this value means that a virtual axis is in play
        return NwctVirtAxHelper;
    }());
    exports.NwctVirtAxHelper = NwctVirtAxHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFZpcnRBeEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9ud2N0VmlydEF4SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNIO1FBQUE7UUE2RkEsQ0FBQztRQXhGRzs7Ozs7O1dBTUc7UUFDVyw4QkFBYSxHQUEzQixVQUE2QixVQUFpQztZQUUxRCw4QkFBOEI7WUFDOUIsSUFBSSxXQUFXLEdBQWtDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5RiwwQkFBMEI7WUFDMUIsSUFBRyxXQUFXLEtBQUssU0FBUyxFQUFDO2dCQUN6QixPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2I7WUFFRCw0QkFBNEI7WUFDNUIsSUFBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFO2dCQUM5RSxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2I7WUFHRCx5QkFBeUI7WUFDekIsSUFBRyxXQUFXLENBQUMsa0JBQWtCLENBQUMsS0FBSyxLQUFLLGdCQUFnQixDQUFDLGlDQUFpQyxFQUFDO2dCQUMzRixPQUFPLENBQUMsQ0FBQzthQUNaO1lBRUQsT0FBTyxXQUFXLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQy9DLENBQUM7UUFJRDs7Ozs7OztXQU9HO1FBQ1csaUNBQWdCLEdBQTlCLFVBQWdDLFVBQWlDO1lBRTdELDhCQUE4QjtZQUM5QixJQUFJLFdBQVcsR0FBa0MsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlGLDBCQUEwQjtZQUMxQixJQUFHLFdBQVcsS0FBSyxTQUFTLEVBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtZQUVELDRCQUE0QjtZQUM1QixJQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7Z0JBQzFILE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtZQUVELHlCQUF5QjtZQUN6QixJQUFHLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLENBQUMsaUNBQWlDLEVBQUM7Z0JBQzNGLElBQUksYUFBYSxHQUFZLFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDckUsSUFBSSxVQUFVLEdBQVksV0FBVyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztnQkFFOUQsNEZBQTRGO2dCQUM1RixPQUFPLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBQyxDQUFDLFVBQVUsR0FBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzthQUMxRDtZQUVELDRCQUE0QjtZQUM1QixPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVuRCxDQUFDO1FBS0Q7Ozs7Ozs7O1dBUUc7UUFDWSxnQ0FBZSxHQUE5QixVQUFnQyxVQUFpQzs7WUFDN0QsYUFBTyxVQUFVLENBQUMsWUFBWSwwQ0FBRSxXQUFXLENBQUM7UUFDaEQsQ0FBQztRQXRGYyxrREFBaUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx5SEFBeUg7UUEwRm5MLHVCQUFDO0tBQUEsQUE3RkQsSUE2RkM7SUE3RnFCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE53Y3REYXRhRW50cnlXcmFwcGVyIH0gZnJvbSBcIi4vZW5yaWNobWVudC9ud2N0RGF0YUVudHJ5V3JhcHBlclwiO1xyXG5pbXBvcnQgeyBJTndjdENvbmZpZ0VudHJ5IH0gZnJvbSBcIi4vb2JqUGFyc2VyL2ludGVyZmFjZXMvbndjdENvbmZpZ0VudHJ5SW50ZXJmYWNlXCI7XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiAgVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGVuY2Fwc3VsYXRlIHRoZSBhbm5vbWFsaXRpZXMgd2hlbiBkZWFsaW5nIHdpdGggdmlydHVhbCBheGlzIChub2RlIG51bWJlciBoYW5kbGluZyBhbmQgY2hhbm5lbCBudW1iZXIgaGFuZGxpbmcpXHJcbiAqIFxyXG4gKiBUaGUgbnVtYmVyIG9mIHZpcnR1YWwgYXhpcyBjYW4gZXhjZWVkIHRoZSBtYXhpbXVtIG51bWJlciBvZiBjaGFubmVscyAoMjU1KVxyXG4gKiBUbyBoYW5kbGUgdGhhdCwgaW4gdGhlIGJpbmFyeSByaW5nIGJ1ZmZlciwgdGhlIG5vZGUgbnVtYmVyICh3aGljaCBpcyBpcnJlbGV2YW50IGluIHRoaXMgY2FzZSkgaXMgbWlzdXNlZCB0byBjYXJyeSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIFxyXG4gKiBBIHZpcnR1YWwgYXhpcyBjYW4gYmUgZGVkZWN0ZWQgYmFzZWQgb24gdGhlIFxyXG4gKiBcclxuICogVGhlIGNoYW5uZWwgbnVtYmVyIGlzIGNhbGN1bGF0ZWQgYnkgdGhlIGZvbGxvd2luZyBmb3JtdWxhOlxyXG4gKiBjaGFubmVsTnVtYmVyID0gY2hhbm5lbE51bWJlciArIG1heCgyNTYoY2ZnX3JlYy5ub2RlX25yLSAxKSwwKVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICogVGhlIG5vZGUgbnVtYmVyIGlzIGFsc28gY2hhbmdlZCB0byAwIGFzIHRoaXMgaXMgbW9yZSBjb3JyZWN0XHJcbiAqIG5vZGVObyA9IDBcclxuICogXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBOd2N0VmlydEF4SGVscGVyXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTndjdFZpcnRBeEhlbHBlcntcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREFUQUdSQU1fRU5DT0RJTkdfSURfVklSVFVBTF9BWElTID0gMTsgLy8gdGhpcyBlbmNvZGluZyBpZCAoYWxzbyBjYWxsZWQgZGlzcGxheV9mdW5jdGlvbiBpbiBzb21lIGRvY3VtZW50cykgd2l0aCB0aGlzIHZhbHVlIG1lYW5zIHRoYXQgYSB2aXJ0dWFsIGF4aXMgaXMgaW4gcGxheVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG5vZGUgbnVtYmVyICh0YWtpbmcgdmlydHVhbCBheGlzIGFub21hbGl0aWVzIGludG8gYWNjb3VudClcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge053Y3REYXRhRW50cnlXcmFwcGVyfSB3RGF0YUVudHJ5XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFZpcnRBeEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE5vZGVOdW1iZXIoIHdEYXRhRW50cnkgOiBOd2N0RGF0YUVudHJ5V3JhcHBlcik6IG51bWJlcntcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb25maWd1cmF0aW9uIGVudHJ5XHJcbiAgICAgICAgbGV0IGNvbmZpZ0VudHJ5IDogSU53Y3RDb25maWdFbnRyeSB8IHVuZGVmaW5lZCA9IE53Y3RWaXJ0QXhIZWxwZXIubndjdENvbmZpZ0VudHJ5KHdEYXRhRW50cnkpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgaW52YWxpZCBlbnRyeVxyXG4gICAgICAgIGlmKGNvbmZpZ0VudHJ5ID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmdXJ0aGVyIGlucHV0IGRhdGEgY2hlY2tzXHJcbiAgICAgICAgaWYoIWNvbmZpZ0VudHJ5LmRhdGFncmFtRW5jb2RpbmdJZC52YWxpZCB8fCAhY29uZmlnRW50cnkubm9kZU51bWJlck9mRHJpdmUudmFsaWQgKXtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGZvciB2aXJ0dWFsIGF4aXNcclxuICAgICAgICBpZihjb25maWdFbnRyeS5kYXRhZ3JhbUVuY29kaW5nSWQudmFsdWUgPT09IE53Y3RWaXJ0QXhIZWxwZXIuREFUQUdSQU1fRU5DT0RJTkdfSURfVklSVFVBTF9BWElTKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnRW50cnkubm9kZU51bWJlck9mRHJpdmUudmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBjaGFubmVsIG51bWJlciAodGFraW5nIHZpcnR1YWwgYXhpcyBhbm9tYWxpdGllcyBpbnRvIGFjY291bnQpXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtOd2N0RGF0YUVudHJ5V3JhcHBlcn0gd0RhdGFFbnRyeVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0VmlydEF4SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hhbm5lbE51bWJlciggd0RhdGFFbnRyeSA6IE53Y3REYXRhRW50cnlXcmFwcGVyKTogbnVtYmVye1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgY29uZmlndXJhdGlvbiBlbnRyeVxyXG4gICAgICAgIGxldCBjb25maWdFbnRyeSA6IElOd2N0Q29uZmlnRW50cnkgfCB1bmRlZmluZWQgPSBOd2N0VmlydEF4SGVscGVyLm53Y3RDb25maWdFbnRyeSh3RGF0YUVudHJ5KTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIGludmFsaWQgZW50cnlcclxuICAgICAgICBpZihjb25maWdFbnRyeSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZnVydGhlciBpbnB1dCBkYXRhIGNoZWNrc1xyXG4gICAgICAgIGlmKCFjb25maWdFbnRyeS5kYXRhZ3JhbUVuY29kaW5nSWQudmFsaWQgfHwgIXdEYXRhRW50cnkuZGF0YUVudHJ5LmNoYW5uZWxJbmRleC52YWxpZCB8fCAhY29uZmlnRW50cnkubm9kZU51bWJlck9mRHJpdmUudmFsaWQgKXtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIHZpcnR1YWwgYXhpc1xyXG4gICAgICAgIGlmKGNvbmZpZ0VudHJ5LmRhdGFncmFtRW5jb2RpbmdJZC52YWx1ZSA9PT0gTndjdFZpcnRBeEhlbHBlci5EQVRBR1JBTV9FTkNPRElOR19JRF9WSVJUVUFMX0FYSVMpe1xyXG4gICAgICAgICAgICBsZXQgY2hhbm5lbE51bWJlciA6IG51bWJlciA9IHdEYXRhRW50cnkuZGF0YUVudHJ5LmNoYW5uZWxJbmRleC52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IG5vZGVOdW1iZXIgOiBudW1iZXIgPSBjb25maWdFbnRyeS5ub2RlTnVtYmVyT2ZEcml2ZS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHRyYW5zZmVycmVkIHZpYSBub2RlIG5vLiBpcyBjYWxjdWxhdGVkIGludG8gdGhlIGNoYW5uZWwgbnVtYmVyXHJcbiAgICAgICAgICAgIHJldHVybiBjaGFubmVsTnVtYmVyICsgTWF0aC5tYXgoMjU2Kihub2RlTnVtYmVyLSAxKSwwKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICAvLyBhIG5vcm1hbCBub24gdmlydHVhbCBheGlzXHJcbiAgICAgICAgcmV0dXJuIHdEYXRhRW50cnkuZGF0YUVudHJ5LmNoYW5uZWxJbmRleC52YWx1ZTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbnRlcm5hbCBoZWxwZXIgY2xhc3MgdG8gYWNjZXNzIHRoZSBjb25maWcgcmVjb3Jkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge053Y3REYXRhRW50cnlXcmFwcGVyfSB3RGF0YUVudHJ5XHJcbiAgICAgKiBAcmV0dXJucyB7KElOd2N0Q29uZmlnRW50cnkgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RWaXJ0QXhIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbndjdENvbmZpZ0VudHJ5KCB3RGF0YUVudHJ5IDogTndjdERhdGFFbnRyeVdyYXBwZXIpIDogSU53Y3RDb25maWdFbnRyeSB8IHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gd0RhdGFFbnRyeS53Q29uZmlnRW50cnk/LmNvbmZpZ0VudHJ5O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59Il19
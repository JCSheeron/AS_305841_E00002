define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements a buffer for storing short value trends
     *
     * @class WatchableValueTrendBuffer
     * @template T_VALUE
     */
    var WatchableValueTrendBuffer = /** @class */ (function () {
        /**
         *Creates an instance of WatchableValueTrendBuffer.
         * @param {number} bufferSize
         * @memberof WatchableValueTrendBuffer
         */
        function WatchableValueTrendBuffer(bufferSize) {
            // holds the trend values
            this._values = [];
            // specifies the buffer size
            this._bufferSize = 0;
            this._bufferSize = bufferSize;
            this._values = new Array();
            this.clearTrendBuffer();
        }
        /**
         * Clears the trend buffer
         *
         * @private
         * @memberof WatchableValueTrendBuffer
         */
        WatchableValueTrendBuffer.prototype.clearTrendBuffer = function () {
            // ad points for marking the minimal y range (0-1)
            this._values.push(0);
            this._values.push(1);
        };
        /**
         * Creates a new trend buffer
         *
         * @static
         * @template T_VALUE
         * @param {number} length
         * @returns {WatchableValueTrendBuffer<T_VALUE>}
         * @memberof WatchableValueTrendBuffer
         */
        WatchableValueTrendBuffer.create = function (length) {
            return new WatchableValueTrendBuffer(length);
        };
        /**
         * Adds a new value to the buffer end. The maximal value count is limited to the buffer size
         *
         * @param {T_VALUE} newValue
         * @memberof WatchableValueTrendBuffer
         */
        WatchableValueTrendBuffer.prototype.push = function (newValue) {
            // if the buffer is full ...
            if (this._values.length >= this._bufferSize) {
                // ... we remove the oldest value ....
                // the oldest value is on index 2 becaue 0 and 1 hold the minimal range values ( 0 and 1).
                // remove the oldest value
                this._values.splice(2, 1);
            }
            // ... and add the new one
            this._values.push(newValue);
        };
        Object.defineProperty(WatchableValueTrendBuffer.prototype, "values", {
            /**
             * Gets the buffers current values
             *
             * @readonly
             * @type {T_VALUE[]}
             * @memberof WatchableValueTrendBuffer
             */
            get: function () {
                return this._values;
            },
            enumerable: true,
            configurable: true
        });
        return WatchableValueTrendBuffer;
    }());
    exports.WatchableValueTrendBuffer = WatchableValueTrendBuffer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlVmFsdWVCdWZmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvd2F0Y2hhYmxlc1dpZGdldC93YXRjaGFibGVWYWx1ZUJ1ZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTs7Ozs7T0FLRztJQUNIO1FBT0k7Ozs7V0FJRztRQUNILG1DQUFvQixVQUFrQjtZQVZ0Qyx5QkFBeUI7WUFDakIsWUFBTyxHQUFrQixFQUFFLENBQUM7WUFDcEMsNEJBQTRCO1lBQ3BCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1lBUTVCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUU1QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxvREFBZ0IsR0FBeEI7WUFFSSxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksZ0NBQU0sR0FBYixVQUF1QixNQUFjO1lBQ2pDLE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx3Q0FBSSxHQUFKLFVBQUssUUFBZ0I7WUFDakIsNEJBQTRCO1lBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDekMsc0NBQXNDO2dCQUN0QywwRkFBMEY7Z0JBQzFGLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFVRCxzQkFBVyw2Q0FBTTtZQVBqQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBQ0wsZ0NBQUM7SUFBRCxDQUFDLEFBMUVELElBMEVDO0lBRU0sOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgYnVmZmVyIGZvciBzdG9yaW5nIHNob3J0IHZhbHVlIHRyZW5kc1xyXG4gKlxyXG4gKiBAY2xhc3MgV2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlclxyXG4gKiBAdGVtcGxhdGUgVF9WQUxVRVxyXG4gKi9cclxuY2xhc3MgV2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlcntcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgdHJlbmQgdmFsdWVzXHJcbiAgICBwcml2YXRlIF92YWx1ZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgYnVmZmVyIHNpemVcclxuICAgIHByaXZhdGUgX2J1ZmZlclNpemU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBidWZmZXJTaXplXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKGJ1ZmZlclNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlclNpemUgPSBidWZmZXJTaXplO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhclRyZW5kQnVmZmVyKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSB0cmVuZCBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZVZhbHVlVHJlbmRCdWZmZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhclRyZW5kQnVmZmVyKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGFkIHBvaW50cyBmb3IgbWFya2luZyB0aGUgbWluaW1hbCB5IHJhbmdlICgwLTEpXHJcbiAgICAgICAgdGhpcy5fdmFsdWVzLnB1c2goMCk7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVzLnB1c2goMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHRyZW5kIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBUX1ZBTFVFXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoXHJcbiAgICAgKiBAcmV0dXJucyB7V2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlcjxUX1ZBTFVFPn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGU8VF9WQUxVRT4obGVuZ3RoOiBudW1iZXIpOiBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFdhdGNoYWJsZVZhbHVlVHJlbmRCdWZmZXIobGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgdmFsdWUgdG8gdGhlIGJ1ZmZlciBlbmQuIFRoZSBtYXhpbWFsIHZhbHVlIGNvdW50IGlzIGxpbWl0ZWQgdG8gdGhlIGJ1ZmZlciBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtUX1ZBTFVFfSBuZXdWYWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZVZhbHVlVHJlbmRCdWZmZXJcclxuICAgICAqL1xyXG4gICAgcHVzaChuZXdWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gaWYgdGhlIGJ1ZmZlciBpcyBmdWxsIC4uLlxyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZXMubGVuZ3RoID49IHRoaXMuX2J1ZmZlclNpemUpIHtcclxuICAgICAgICAgICAgLy8gLi4uIHdlIHJlbW92ZSB0aGUgb2xkZXN0IHZhbHVlIC4uLi5cclxuICAgICAgICAgICAgLy8gdGhlIG9sZGVzdCB2YWx1ZSBpcyBvbiBpbmRleCAyIGJlY2F1ZSAwIGFuZCAxIGhvbGQgdGhlIG1pbmltYWwgcmFuZ2UgdmFsdWVzICggMCBhbmQgMSkuXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgb2xkZXN0IHZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5zcGxpY2UoMiwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLi4uIGFuZCBhZGQgdGhlIG5ldyBvbmVcclxuICAgICAgICB0aGlzLl92YWx1ZXMucHVzaChuZXdWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgYnVmZmVycyBjdXJyZW50IHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1RfVkFMVUVbXX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWVzKCkgOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0e1dhdGNoYWJsZVZhbHVlVHJlbmRCdWZmZXJ9OyJdfQ==
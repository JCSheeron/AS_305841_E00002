define(["require", "exports", "./editStringHelper", "./formatItemIdentifier"], function (require, exports, editStringHelper_1, formatItemIdentifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class holds the information of the unformatted data.
     * Everytime a data is set, the indexes for the format item are updated
     *
     * @export
     * @class RawTextItem
     */
    var RawTextItem = /** @class */ (function () {
        /**
         * Creates an instance of RawTextItem.
         * Only sets the defauld values
         *
         * @memberof RawTextItem
         */
        function RawTextItem() {
            this._data = "";
            this._indexOfStartOfNextFormatItem = -1;
            this._indexOfEndFormatItem = -1;
        }
        Object.defineProperty(RawTextItem.prototype, "data", {
            /**
             * Get the unformatted data
             *
             * @type {string}
             * @memberof RawTextItem
             */
            get: function () {
                return this._data;
            },
            /**
             * Set the unformtted data.
             * Everytime the data is set, the indexOfStartOfNextFormatItem
             * and indexOfEndFormatItem get updated according the new data
             *
             * @param {string} rawData
             * @memberof RawTextItem
             */
            set: function (rawData) {
                this._data = rawData;
                this.setIndexOfStartOfNextFormatItem();
                this.setIndexOfEndOfNextFormatItem();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Add input string to formatted string until indexOfStartOfNextFormatItem ("{") as there is nothing to process so far
         *
         * @return {*}  {string}
         * @memberof RawTextItem
         */
        RawTextItem.prototype.getTextBeforeFormatItem = function () {
            return this.data.substring(0, this._indexOfStartOfNextFormatItem);
        };
        /**
         * Remove the added string from the raw Text until the indexOfStartOfNextFormatItem ("{")
         *
         * @memberof RawTextItem
         */
        RawTextItem.prototype.removeTextBeforeFormatItem = function () {
            this.data = this.data.substring(this._indexOfStartOfNextFormatItem, this.data.length);
        };
        /**
         * Remove the formattet part of the data
         *
         * @memberof RawTextItem
         */
        RawTextItem.prototype.removeFormattedText = function () {
            this.data = this.data.substring(this._indexOfEndFormatItem + 1, this.data.length);
        };
        /**
         * Returns the content string of the allready found format item
         * Bsp: "{1|-10.3f} is the ..." -> "1|-10.3f"
         *
         * @return {*}  {string}
         * @memberof RawTextItem
         */
        RawTextItem.prototype.getFormatItemWithoutCurls = function () {
            return this.data.substring(1, this._indexOfEndFormatItem);
        };
        /**
         * Checks if the second position of the _data is a "="
         * If it is the first to positions of data are removed
         *
         * @return {*}  {boolean}
         * @memberof RawTextItem
         */
        RawTextItem.prototype.containsRecursiveFormatItem = function () {
            // check if there is a "="
            if (this.data[1] !== formatItemIdentifier_1.FormatItemIdentifier.recursion) {
                return false;
            }
            this.data = this.data.substring(2, this.data.length);
            return true;
        };
        /**
         * Returns true when the data contains a format item
         *
         * @return {*}  {boolean}
         * @memberof RawTextItem
         */
        RawTextItem.prototype.containsFurtherFormatItem = function () {
            return this.containsStartOfNextFormatItem() && this.containsEndOfNextFormatItem();
        };
        /**
         * Check if there is a start of a next format item
         *
         * @private
         * @return {*}  {boolean}
         * @memberof RawTextItem
         */
        RawTextItem.prototype.containsStartOfNextFormatItem = function () {
            return editStringHelper_1.EditStringHelper.indexIsValid(this._indexOfStartOfNextFormatItem);
        };
        /**
         * Check if there is a end of a next format item
         *
         * @private
         * @return {*}  {boolean}
         * @memberof RawTextItem
         */
        RawTextItem.prototype.containsEndOfNextFormatItem = function () {
            return editStringHelper_1.EditStringHelper.indexIsValid(this._indexOfEndFormatItem);
        };
        /**
         * Set the index of the first open curl "{" in a string.
         * If no open curl is found then -1 is set.
         * Two open curls in a row "{{" are ignored.
         *
         * @private
         * @memberof RawTextItem
         */
        RawTextItem.prototype.setIndexOfStartOfNextFormatItem = function () {
            // (?<!{)   -> the sequence I am looking for must not have a "{" in front of it
            // {        -> that is what I am looking for
            // ({{)*    -> it might be followed by an even number of "{" characters, to be an odd number overall
            // (?!{)    -> it must not be followed by another "{", otherwise we haven't gotten the complete number of chained "{" characters
            var regex = RegExp('(?<!' + formatItemIdentifier_1.FormatItemIdentifier.next + ')' + formatItemIdentifier_1.FormatItemIdentifier.next + '(' + formatItemIdentifier_1.FormatItemIdentifier.next + formatItemIdentifier_1.FormatItemIdentifier.next + ')*(?!' + formatItemIdentifier_1.FormatItemIdentifier.next + ')', 'g');
            if (regex.exec(this.data) === null) {
                this._indexOfStartOfNextFormatItem - 1;
            }
            this._indexOfStartOfNextFormatItem = regex.lastIndex - 1;
        };
        /**
         * set the index of the end starting the count from the beginning of the format item.
         * If no closing for the format item is found then -1 is set.
         *
         * @private
         * @memberof RawTextItem
         */
        RawTextItem.prototype.setIndexOfEndOfNextFormatItem = function () {
            if (editStringHelper_1.EditStringHelper.indexIsValid(this._indexOfStartOfNextFormatItem)) {
                var nextItemString = this.data.substring(this._indexOfStartOfNextFormatItem, this.data.length);
                this._indexOfEndFormatItem = nextItemString.indexOf(formatItemIdentifier_1.FormatItemIdentifier.end);
            }
            else {
                this._indexOfEndFormatItem = -1;
            }
        };
        return RawTextItem;
    }());
    exports.RawTextItem = RawTextItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3VGV4dEl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9yYXdUZXh0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTs7Ozs7O09BTUc7SUFDSDtRQVlJOzs7OztXQUtHO1FBQ0g7WUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsNkJBQTZCLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFVRCxzQkFBVyw2QkFBSTtZQU1mOzs7OztlQUtHO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO1lBdEJEOzs7Ozs7O2VBT0c7aUJBQ0gsVUFBZ0IsT0FBZTtnQkFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBQ3JCLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUN6QyxDQUFDOzs7V0FBQTtRQVlEOzs7OztXQUtHO1FBQ0ksNkNBQXVCLEdBQTlCO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSxnREFBMEIsR0FBakM7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFGLENBQUM7UUFFRDs7OztXQUlHO1FBQ0kseUNBQW1CLEdBQTFCO1lBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtDQUF5QixHQUFoQztZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxpREFBMkIsR0FBbEM7WUFDSSwwQkFBMEI7WUFDMUIsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLDJDQUFvQixDQUFDLFNBQVMsRUFBRTtnQkFDaEQsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLCtDQUF5QixHQUFoQztZQUNJLE9BQU8sSUFBSSxDQUFDLDZCQUE2QixFQUFFLElBQUksSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDdEYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1EQUE2QixHQUFyQztZQUNJLE9BQU8sbUNBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxpREFBMkIsR0FBbkM7WUFDSSxPQUFPLG1DQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLHFEQUErQixHQUF2QztZQUVJLCtFQUErRTtZQUMvRSw0Q0FBNEM7WUFDNUMsb0dBQW9HO1lBQ3BHLGdJQUFnSTtZQUNoSSxJQUFJLEtBQUssR0FBVyxNQUFNLENBQUMsTUFBTSxHQUFDLDJDQUFvQixDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsMkNBQW9CLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQywyQ0FBb0IsQ0FBQyxJQUFJLEdBQUMsMkNBQW9CLENBQUMsSUFBSSxHQUFDLE9BQU8sR0FBQywyQ0FBb0IsQ0FBQyxJQUFJLEdBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzlMLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUMvQixJQUFJLENBQUMsNkJBQTZCLEdBQUUsQ0FBQyxDQUFDO2FBQ3pDO1lBRUQsSUFBSSxDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxtREFBNkIsR0FBckM7WUFFSSxJQUFHLG1DQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsRUFBRTtnQkFDbEUsSUFBSSxjQUFjLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLDJDQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pGO2lCQUNJO2dCQUNELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuQztRQUNMLENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUE5S0QsSUE4S0M7SUE5S1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFZGl0U3RyaW5nSGVscGVyIH0gZnJvbSBcIi4vZWRpdFN0cmluZ0hlbHBlclwiO1xyXG5pbXBvcnQgeyBGb3JtYXRJdGVtSWRlbnRpZmllciB9IGZyb20gXCIuL2Zvcm1hdEl0ZW1JZGVudGlmaWVyXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gb2YgdGhlIHVuZm9ybWF0dGVkIGRhdGEuIFxyXG4gKiBFdmVyeXRpbWUgYSBkYXRhIGlzIHNldCwgdGhlIGluZGV4ZXMgZm9yIHRoZSBmb3JtYXQgaXRlbSBhcmUgdXBkYXRlZCBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgUmF3VGV4dEl0ZW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSYXdUZXh0SXRlbSB7XHJcbiAgICBcclxuICAgIC8vIHVuZm9ybWF0dGVkIGRhdGFcclxuICAgIHByaXZhdGUgX2RhdGE6IHN0cmluZztcclxuICAgIFxyXG4gICAgLy8gc2hvd3MgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGZvcm1hdCBpdGVtIChcIntcIilcclxuICAgIC8vIG9yIC0xIGlmIG5vdGhpbmcgZm91bmRcclxuICAgIHByaXZhdGUgX2luZGV4T2ZTdGFydE9mTmV4dEZvcm1hdEl0ZW06IG51bWJlcjtcclxuICAgIC8vIHNob3dzIHRoZSBpbmRleCBvZiB0aGUgZW5kIG9mIGZvcm1hdCBpdGVtIChcIn1cIikgc3RhcnRpbmcgdG8gY291bnQgZnJvbSB0aGUgaW5kZXhPZlN0YXJ0T2ZOZXh0Rm9ybWF0SXRlbVxyXG4gICAgLy8gb3IgLTEgaWYgbm90aGluZyBmb3VuZFxyXG4gICAgcHJpdmF0ZSBfaW5kZXhPZkVuZEZvcm1hdEl0ZW06IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmF3VGV4dEl0ZW0uXHJcbiAgICAgKiBPbmx5IHNldHMgdGhlIGRlZmF1bGQgdmFsdWVzXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBSYXdUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9pbmRleE9mU3RhcnRPZk5leHRGb3JtYXRJdGVtID0gLTE7XHJcbiAgICAgICAgdGhpcy5faW5kZXhPZkVuZEZvcm1hdEl0ZW0gPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgdW5mb3JtdHRlZCBkYXRhLlxyXG4gICAgICogRXZlcnl0aW1lIHRoZSBkYXRhIGlzIHNldCwgdGhlIGluZGV4T2ZTdGFydE9mTmV4dEZvcm1hdEl0ZW0gXHJcbiAgICAgKiBhbmQgaW5kZXhPZkVuZEZvcm1hdEl0ZW0gZ2V0IHVwZGF0ZWQgYWNjb3JkaW5nIHRoZSBuZXcgZGF0YVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmF3RGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFJhd1RleHRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgZGF0YShyYXdEYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gcmF3RGF0YTtcclxuICAgICAgICB0aGlzLnNldEluZGV4T2ZTdGFydE9mTmV4dEZvcm1hdEl0ZW0oKTtcclxuICAgICAgICB0aGlzLnNldEluZGV4T2ZFbmRPZk5leHRGb3JtYXRJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHVuZm9ybWF0dGVkIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFJhd1RleHRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGlucHV0IHN0cmluZyB0byBmb3JtYXR0ZWQgc3RyaW5nIHVudGlsIGluZGV4T2ZTdGFydE9mTmV4dEZvcm1hdEl0ZW0gKFwie1wiKSBhcyB0aGVyZSBpcyBub3RoaW5nIHRvIHByb2Nlc3Mgc28gZmFyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgUmF3VGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRleHRCZWZvcmVGb3JtYXRJdGVtKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zdWJzdHJpbmcoMCwgdGhpcy5faW5kZXhPZlN0YXJ0T2ZOZXh0Rm9ybWF0SXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgdGhlIGFkZGVkIHN0cmluZyBmcm9tIHRoZSByYXcgVGV4dCB1bnRpbCB0aGUgaW5kZXhPZlN0YXJ0T2ZOZXh0Rm9ybWF0SXRlbSAoXCJ7XCIpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFJhd1RleHRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVUZXh0QmVmb3JlRm9ybWF0SXRlbSgpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc3Vic3RyaW5nKHRoaXMuX2luZGV4T2ZTdGFydE9mTmV4dEZvcm1hdEl0ZW0sIHRoaXMuZGF0YS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRoZSBmb3JtYXR0ZXQgcGFydCBvZiB0aGUgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBSYXdUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRm9ybWF0dGVkVGV4dCgpIHsgIFxyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5zdWJzdHJpbmcodGhpcy5faW5kZXhPZkVuZEZvcm1hdEl0ZW0rMSwgdGhpcy5kYXRhLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb250ZW50IHN0cmluZyBvZiB0aGUgYWxscmVhZHkgZm91bmQgZm9ybWF0IGl0ZW1cclxuICAgICAqIEJzcDogXCJ7MXwtMTAuM2Z9IGlzIHRoZSAuLi5cIiAtPiBcIjF8LTEwLjNmXCJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBSYXdUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Rm9ybWF0SXRlbVdpdGhvdXRDdXJscygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc3Vic3RyaW5nKDEsIHRoaXMuX2luZGV4T2ZFbmRGb3JtYXRJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgc2Vjb25kIHBvc2l0aW9uIG9mIHRoZSBfZGF0YSBpcyBhIFwiPVwiXHJcbiAgICAgKiBJZiBpdCBpcyB0aGUgZmlyc3QgdG8gcG9zaXRpb25zIG9mIGRhdGEgYXJlIHJlbW92ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgUmF3VGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnRhaW5zUmVjdXJzaXZlRm9ybWF0SXRlbSgpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIFwiPVwiXHJcbiAgICAgICAgaWYodGhpcy5kYXRhWzFdICE9PSBGb3JtYXRJdGVtSWRlbnRpZmllci5yZWN1cnNpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc3Vic3RyaW5nKDIsIHRoaXMuZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIGRhdGEgY29udGFpbnMgYSBmb3JtYXQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBSYXdUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udGFpbnNGdXJ0aGVyRm9ybWF0SXRlbSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluc1N0YXJ0T2ZOZXh0Rm9ybWF0SXRlbSgpICYmIHRoaXMuY29udGFpbnNFbmRPZk5leHRGb3JtYXRJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGVyZSBpcyBhIHN0YXJ0IG9mIGEgbmV4dCBmb3JtYXQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgUmF3VGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb250YWluc1N0YXJ0T2ZOZXh0Rm9ybWF0SXRlbSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gRWRpdFN0cmluZ0hlbHBlci5pbmRleElzVmFsaWQodGhpcy5faW5kZXhPZlN0YXJ0T2ZOZXh0Rm9ybWF0SXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGVyZSBpcyBhIGVuZCBvZiBhIG5leHQgZm9ybWF0IGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7Kn0gIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFJhd1RleHRJdGVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udGFpbnNFbmRPZk5leHRGb3JtYXRJdGVtKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBFZGl0U3RyaW5nSGVscGVyLmluZGV4SXNWYWxpZCh0aGlzLl9pbmRleE9mRW5kRm9ybWF0SXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBvcGVuIGN1cmwgXCJ7XCIgaW4gYSBzdHJpbmcuIFxyXG4gICAgICogSWYgbm8gb3BlbiBjdXJsIGlzIGZvdW5kIHRoZW4gLTEgaXMgc2V0LlxyXG4gICAgICogVHdvIG9wZW4gY3VybHMgaW4gYSByb3cgXCJ7e1wiIGFyZSBpZ25vcmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUmF3VGV4dEl0ZW1cclxuICAgICAqLyAgXHJcbiAgICBwcml2YXRlIHNldEluZGV4T2ZTdGFydE9mTmV4dEZvcm1hdEl0ZW0oKSB7XHJcbiAgICAgICBcclxuICAgICAgICAvLyAoPzwheykgICAtPiB0aGUgc2VxdWVuY2UgSSBhbSBsb29raW5nIGZvciBtdXN0IG5vdCBoYXZlIGEgXCJ7XCIgaW4gZnJvbnQgb2YgaXRcclxuICAgICAgICAvLyB7ICAgICAgICAtPiB0aGF0IGlzIHdoYXQgSSBhbSBsb29raW5nIGZvclxyXG4gICAgICAgIC8vICh7eykqICAgIC0+IGl0IG1pZ2h0IGJlIGZvbGxvd2VkIGJ5IGFuIGV2ZW4gbnVtYmVyIG9mIFwie1wiIGNoYXJhY3RlcnMsIHRvIGJlIGFuIG9kZCBudW1iZXIgb3ZlcmFsbFxyXG4gICAgICAgIC8vICg/IXspICAgIC0+IGl0IG11c3Qgbm90IGJlIGZvbGxvd2VkIGJ5IGFub3RoZXIgXCJ7XCIsIG90aGVyd2lzZSB3ZSBoYXZlbid0IGdvdHRlbiB0aGUgY29tcGxldGUgbnVtYmVyIG9mIGNoYWluZWQgXCJ7XCIgY2hhcmFjdGVyc1xyXG4gICAgICAgIGxldCByZWdleDogUmVnRXhwID0gUmVnRXhwKCcoPzwhJytGb3JtYXRJdGVtSWRlbnRpZmllci5uZXh0KycpJytGb3JtYXRJdGVtSWRlbnRpZmllci5uZXh0KycoJytGb3JtYXRJdGVtSWRlbnRpZmllci5uZXh0K0Zvcm1hdEl0ZW1JZGVudGlmaWVyLm5leHQrJykqKD8hJytGb3JtYXRJdGVtSWRlbnRpZmllci5uZXh0KycpJywgJ2cnKTtcclxuICAgICAgICBpZihyZWdleC5leGVjKHRoaXMuZGF0YSkgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5kZXhPZlN0YXJ0T2ZOZXh0Rm9ybWF0SXRlbSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5kZXhPZlN0YXJ0T2ZOZXh0Rm9ybWF0SXRlbSA9IHJlZ2V4Lmxhc3RJbmRleC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBpbmRleCBvZiB0aGUgZW5kIHN0YXJ0aW5nIHRoZSBjb3VudCBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGZvcm1hdCBpdGVtLlxyXG4gICAgICogSWYgbm8gY2xvc2luZyBmb3IgdGhlIGZvcm1hdCBpdGVtIGlzIGZvdW5kIHRoZW4gLTEgaXMgc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUmF3VGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRJbmRleE9mRW5kT2ZOZXh0Rm9ybWF0SXRlbSgpIHtcclxuIFxyXG4gICAgICAgIGlmKEVkaXRTdHJpbmdIZWxwZXIuaW5kZXhJc1ZhbGlkKHRoaXMuX2luZGV4T2ZTdGFydE9mTmV4dEZvcm1hdEl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0SXRlbVN0cmluZzogc3RyaW5nID0gdGhpcy5kYXRhLnN1YnN0cmluZyh0aGlzLl9pbmRleE9mU3RhcnRPZk5leHRGb3JtYXRJdGVtLCB0aGlzLmRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5kZXhPZkVuZEZvcm1hdEl0ZW0gPSBuZXh0SXRlbVN0cmluZy5pbmRleE9mKEZvcm1hdEl0ZW1JZGVudGlmaWVyLmVuZCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faW5kZXhPZkVuZEZvcm1hdEl0ZW0gPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
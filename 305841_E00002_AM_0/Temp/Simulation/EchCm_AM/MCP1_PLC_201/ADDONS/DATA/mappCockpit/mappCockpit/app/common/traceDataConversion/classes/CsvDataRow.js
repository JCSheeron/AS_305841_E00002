define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents the operations which can be performed on as csv data row.
     *
     * @class CsvDataRow
     */
    var CsvDataRow = /** @class */ (function () {
        function CsvDataRow() {
        }
        /**
         * Writes a csv data row from an array of numbers.
         *
         * @static
         * @param {Array<number>} data
         * @param {string} colsep character used to seperate entries
         * @param {string} comsep character used as decimal delimiter
         * @param {boolean} [endRowWithColsep=false] flag to control if a colsep is placed on end of line
         * @returns {string}
         * @memberof CsvDataRow
         */
        CsvDataRow.writeDataRow = function (data, colsep, comsep, endRowWithColsep) {
            if (endRowWithColsep === void 0) { endRowWithColsep = false; }
            var row = "";
            for (var i = 0; i < data.length; i++) {
                if (i !== 0) {
                    row += colsep;
                }
                row += (isNaN(data[i])) ? CsvDataRow.undefValueString : this.stringifyNumber(data[i], comsep);
            }
            return endRowWithColsep ? row + colsep : row;
        };
        /**
         * Reads a csv data row into an array of numbers.
         * Invalid numbers and empty columns are represented as NaN.
         *
         * @static
         * @param {string} row
         * @param {string} colsep character which seperates columns
         * @param {string} [comsep=','] character which delimits decimal digits
         * @returns {Array<number>}
         * @memberof CsvDataRow
         */
        CsvDataRow.readDataRow = function (row, colsep, comsep) {
            if (comsep === void 0) { comsep = ','; }
            var nums = new Array();
            var rowParts = row.split(colsep);
            rowParts.forEach(function (str) {
                str = str.replace(' ', '');
                if (str !== '') {
                    str = str.replace(comsep, '.');
                    nums.push(parseFloat(str));
                }
                else {
                    nums.push(NaN);
                }
            });
            return nums;
        };
        /**
         * Creates and returns a formatted string from a given number.
         *
         * @private
         * @static
         * @param {number} value
         * @param {string} comsep
         * @returns {string}
         * @memberof CsvDataRow
         */
        CsvDataRow.stringifyNumber = function (value, comsep) {
            var strValue = "";
            strValue = value.toExponential(16);
            // remove negative sign
            var negStr = "";
            if (strValue[0] === "-") {
                negStr = "-";
                strValue = strValue.slice(1);
            }
            var strArray = strValue.split("e");
            var exponent = Number(strArray[1]);
            // get value without decimal character
            var mantissa = strArray[0].replace(".", "");
            var mantissaLength = mantissa.length;
            // fill leading or trailing "0"
            if (exponent < 0) {
                // add leading "0"
                strValue = "0" + comsep + this.strRepeat('0', (exponent * (-1.0)) - 1) + mantissa;
            }
            else if (exponent > (mantissaLength - 1)) {
                // add trailing "0"
                strValue = mantissa + this.strRepeat('0', exponent - mantissaLength + 1);
            }
            else if (exponent === (mantissaLength - 1)) {
                // nothing to do
                strValue = mantissa;
            }
            else {
                // place decimal character within the mantissa at the correct position
                strValue = mantissa.substring(0, exponent + 1) + comsep + mantissa.substring(exponent + 1, mantissaLength);
            }
            // add negative sign
            strValue = negStr + strValue;
            return strValue;
        };
        /**
         * Creates and returns a string containing the entered string "str" which is repeated as often as defined in "qty".
         * Original code comes from a forum entry, where this was metnioned as the fastest solution that had been in the comparison.
         *
         * @private
         * @param {string} str string which should be repeated
         * @param {number} qty number of repeats (must be positive)
         * @returns {string}
         * @memberof CsvDataRow
         */
        CsvDataRow.strRepeat = function (str, qty) {
            var result = '';
            while (qty > 0) {
                // If the LSB of qty is set, append str to result.   
                if (qty & 1) {
                    result += str;
                }
                // The bits of qty are shifted to the right by 1 bit. The new bit inserted on the left is a copy of the previous left bit.  
                // The now unnecessary previous right bit gets discarded. The new value is stored in qty. Realises a base 2 exponential shrinking of qty.
                qty >>= 1;
                // Concatenates str on itself and stores this new string in str. Realises a base 2 exponential growth of str.
                str += str;
            }
            return result;
        };
        CsvDataRow.undefValueString = "       ";
        return CsvDataRow;
    }());
    exports.CsvDataRow = CsvDataRow;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3N2RGF0YVJvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9Dc3ZEYXRhUm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7O09BSUc7SUFDSDtRQUlJO1FBQXVCLENBQUM7UUFHeEI7Ozs7Ozs7Ozs7V0FVRztRQUNXLHVCQUFZLEdBQTFCLFVBQTJCLElBQW1CLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxnQkFBZ0M7WUFBaEMsaUNBQUEsRUFBQSx3QkFBZ0M7WUFFNUcsSUFBSSxHQUFHLEdBQVUsRUFBRSxDQUFDO1lBRXBCLEtBQUksSUFBSSxDQUFDLEdBQVUsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ1IsR0FBRyxJQUFHLE1BQU0sQ0FBQztpQkFDaEI7Z0JBRUQsR0FBRyxJQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFFaEc7WUFFRCxPQUFPLGdCQUFnQixDQUFBLENBQUMsQ0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDOUMsQ0FBQztRQUdEOzs7Ozs7Ozs7O1dBVUc7UUFDVyxzQkFBVyxHQUF6QixVQUEwQixHQUFXLEVBQUUsTUFBYyxFQUFFLE1BQW1CO1lBQW5CLHVCQUFBLEVBQUEsWUFBbUI7WUFFdEUsSUFBSSxJQUFJLEdBQWlCLElBQUksS0FBSyxFQUFVLENBQUM7WUFFN0MsSUFBSSxRQUFRLEdBQWlCLEdBQUcs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QUFHLEdBQUcsQ0FBQyxFQUFDO29CQUNWLE1BQU0sSUFBSSxHQUFHLENBQUM7aUJBQ2Y7Z0JBRUQsNEhBQTRIO2dCQUM1SCx5SUFBeUk7Z0JBQ3pJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBRVYsNkdBQTZHO2dCQUM3RyxHQUFHLElBQUksR0FBRyxDQUFDO2FBQ1o7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBdEpxQiwyQkFBZ0IsR0FBVyxTQUFTLENBQUM7UUF1SmpFLGlCQUFDO0tBQUEsQUF6SkQsSUF5SkM7SUFDUSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIG9wZXJhdGlvbnMgd2hpY2ggY2FuIGJlIHBlcmZvcm1lZCBvbiBhcyBjc3YgZGF0YSByb3cuXHJcbiAqXHJcbiAqIEBjbGFzcyBDc3ZEYXRhUm93XHJcbiAqL1xyXG5jbGFzcyBDc3ZEYXRhUm93IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSB1bmRlZlZhbHVlU3RyaW5nOiBzdHJpbmcgPSBcIiAgICAgICBcIjtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIGEgY3N2IGRhdGEgcm93IGZyb20gYW4gYXJyYXkgb2YgbnVtYmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGRhdGFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xzZXAgY2hhcmFjdGVyIHVzZWQgdG8gc2VwZXJhdGUgZW50cmllc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXNlcCBjaGFyYWN0ZXIgdXNlZCBhcyBkZWNpbWFsIGRlbGltaXRlclxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZW5kUm93V2l0aENvbHNlcD1mYWxzZV0gZmxhZyB0byBjb250cm9sIGlmIGEgY29sc2VwIGlzIHBsYWNlZCBvbiBlbmQgb2YgbGluZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDc3ZEYXRhUm93XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgd3JpdGVEYXRhUm93KGRhdGE6IEFycmF5PG51bWJlcj4sIGNvbHNlcDogc3RyaW5nLCBjb21zZXA6IHN0cmluZywgZW5kUm93V2l0aENvbHNlcDogYm9vbGVhbj0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByb3c6IHN0cmluZz0gXCJcIjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpOiBudW1iZXI9IDA7IGk8ZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByb3crPSBjb2xzZXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvdys9IChpc05hTihkYXRhW2ldKSkgPyBDc3ZEYXRhUm93LnVuZGVmVmFsdWVTdHJpbmcgOiB0aGlzLnN0cmluZ2lmeU51bWJlcihkYXRhW2ldLCBjb21zZXApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbmRSb3dXaXRoQ29sc2VwPyByb3crY29sc2VwIDogcm93O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgY3N2IGRhdGEgcm93IGludG8gYW4gYXJyYXkgb2YgbnVtYmVycy5cclxuICAgICAqIEludmFsaWQgbnVtYmVycyBhbmQgZW1wdHkgY29sdW1ucyBhcmUgcmVwcmVzZW50ZWQgYXMgTmFOLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByb3dcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xzZXAgY2hhcmFjdGVyIHdoaWNoIHNlcGVyYXRlcyBjb2x1bW5zXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbXNlcD0nLCddIGNoYXJhY3RlciB3aGljaCBkZWxpbWl0cyBkZWNpbWFsIGRpZ2l0c1xyXG4gICAgICogQHJldHVybnMge0FycmF5PG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3N2RGF0YVJvd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWREYXRhUm93KHJvdzogc3RyaW5nLCBjb2xzZXA6IHN0cmluZywgY29tc2VwOiBzdHJpbmc9ICcsJyk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBudW1zOiBBcnJheTxudW1iZXI+PSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICBsZXQgcm93UGFydHM6IEFycmF5PHN0cmluZz49IHJvdy5zcGxpdChjb2xzZXApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJvd1BhcnRzLmZvckVhY2goKHN0cikgPT4geyBcclxuXHJcbiAgICAgICAgICAgIHN0cj0gc3RyLnJlcGxhY2UoJyAnLCAnJyk7XHJcblxyXG4gICAgICAgICAgICBpZihzdHIgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHN0cj0gc3RyLnJlcGxhY2UoY29tc2VwLCAnLicpOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBudW1zLnB1c2gocGFyc2VGbG9hdChzdHIpKTsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBudW1zLnB1c2goTmFOKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbnVtcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBmb3JtYXR0ZWQgc3RyaW5nIGZyb20gYSBnaXZlbiBudW1iZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXNlcFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDc3ZEYXRhUm93XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHN0cmluZ2lmeU51bWJlcih2YWx1ZSA6IG51bWJlciAsY29tc2VwIDogc3RyaW5nKTpzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHJWYWx1ZSA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgc3RyVmFsdWUgPSB2YWx1ZS50b0V4cG9uZW50aWFsKDE2KTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIG5lZ2F0aXZlIHNpZ25cclxuICAgICAgICBsZXQgbmVnU3RyIDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZihzdHJWYWx1ZVswXSA9PT1cIi1cIikge1xyXG4gICAgICAgICAgICBuZWdTdHI9XCItXCI7XHJcbiAgICAgICAgICAgIHN0clZhbHVlPXN0clZhbHVlLnNsaWNlKDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0ckFycmF5IDogc3RyaW5nW10gPSBzdHJWYWx1ZS5zcGxpdChcImVcIik7XHJcbiAgICAgICAgbGV0IGV4cG9uZW50IDogbnVtYmVyID0gTnVtYmVyKHN0ckFycmF5WzFdKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHZhbHVlIHdpdGhvdXQgZGVjaW1hbCBjaGFyYWN0ZXJcclxuICAgICAgICBsZXQgbWFudGlzc2EgOnN0cmluZyA9IHN0ckFycmF5WzBdLnJlcGxhY2UoXCIuXCIsXCJcIik7XHJcbiAgICAgICAgbGV0IG1hbnRpc3NhTGVuZ3RoIDpudW1iZXIgPSBtYW50aXNzYS5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vIGZpbGwgbGVhZGluZyBvciB0cmFpbGluZyBcIjBcIlxyXG4gICAgICAgIGlmKGV4cG9uZW50IDwgMCkgeyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCBsZWFkaW5nIFwiMFwiXHJcbiAgICAgICAgICAgIHN0clZhbHVlID0gXCIwXCIrY29tc2VwKyB0aGlzLnN0clJlcGVhdCgnMCcsKGV4cG9uZW50KigtMS4wKSkgLTEpICsgbWFudGlzc2E7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZXhwb25lbnQgPiAobWFudGlzc2FMZW5ndGggLSAxKSkgeyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCB0cmFpbGluZyBcIjBcIlxyXG4gICAgICAgICAgICBzdHJWYWx1ZSA9IG1hbnRpc3NhICsgdGhpcy5zdHJSZXBlYXQoJzAnLGV4cG9uZW50IC0gbWFudGlzc2FMZW5ndGggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihleHBvbmVudCA9PT0gKG1hbnRpc3NhTGVuZ3RoIC0gMSkpIHsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvXHJcbiAgICAgICAgICAgIHN0clZhbHVlID0gbWFudGlzc2E7XHJcbiAgICAgICAgfWVsc2UgeyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHBsYWNlIGRlY2ltYWwgY2hhcmFjdGVyIHdpdGhpbiB0aGUgbWFudGlzc2EgYXQgdGhlIGNvcnJlY3QgcG9zaXRpb25cclxuICAgICAgICAgICAgc3RyVmFsdWUgPSBtYW50aXNzYS5zdWJzdHJpbmcoMCxleHBvbmVudCsxKSArIGNvbXNlcCArIG1hbnRpc3NhLnN1YnN0cmluZyhleHBvbmVudCsxLG1hbnRpc3NhTGVuZ3RoKTtcclxuICAgICAgICB9ICBcclxuXHJcbiAgICAgICAgLy8gYWRkIG5lZ2F0aXZlIHNpZ25cclxuICAgICAgICBzdHJWYWx1ZSA9IG5lZ1N0ciArIHN0clZhbHVlXHJcblxyXG4gICAgICAgIHJldHVybiBzdHJWYWx1ZTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGVudGVyZWQgc3RyaW5nIFwic3RyXCIgd2hpY2ggaXMgcmVwZWF0ZWQgYXMgb2Z0ZW4gYXMgZGVmaW5lZCBpbiBcInF0eVwiLlxyXG4gICAgICogT3JpZ2luYWwgY29kZSBjb21lcyBmcm9tIGEgZm9ydW0gZW50cnksIHdoZXJlIHRoaXMgd2FzIG1ldG5pb25lZCBhcyB0aGUgZmFzdGVzdCBzb2x1dGlvbiB0aGF0IGhhZCBiZWVuIGluIHRoZSBjb21wYXJpc29uLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciBzdHJpbmcgd2hpY2ggc2hvdWxkIGJlIHJlcGVhdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcXR5IG51bWJlciBvZiByZXBlYXRzIChtdXN0IGJlIHBvc2l0aXZlKVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDc3ZEYXRhUm93XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHN0clJlcGVhdChzdHIgOnN0cmluZywgcXR5IDogbnVtYmVyKTpzdHJpbmcgeyAgXHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuXHJcbiAgICAgICAgd2hpbGUgKHF0eSA+IDApIHtcclxuXHJcbiAgICAgICAgICAvLyBJZiB0aGUgTFNCIG9mIHF0eSBpcyBzZXQsIGFwcGVuZCBzdHIgdG8gcmVzdWx0LiAgIFxyXG4gICAgICAgICAgaWYgKHF0eSAmIDEpe1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyO1xyXG4gICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAvLyBUaGUgYml0cyBvZiBxdHkgYXJlIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0IGJ5IDEgYml0LiBUaGUgbmV3IGJpdCBpbnNlcnRlZCBvbiB0aGUgbGVmdCBpcyBhIGNvcHkgb2YgdGhlIHByZXZpb3VzIGxlZnQgYml0LiAgXHJcbiAgICAgICAgICAvLyBUaGUgbm93IHVubmVjZXNzYXJ5IHByZXZpb3VzIHJpZ2h0IGJpdCBnZXRzIGRpc2NhcmRlZC4gVGhlIG5ldyB2YWx1ZSBpcyBzdG9yZWQgaW4gcXR5LiBSZWFsaXNlcyBhIGJhc2UgMiBleHBvbmVudGlhbCBzaHJpbmtpbmcgb2YgcXR5LlxyXG4gICAgICAgICAgcXR5ID4+PSAxO1xyXG5cclxuICAgICAgICAgIC8vIENvbmNhdGVuYXRlcyBzdHIgb24gaXRzZWxmIGFuZCBzdG9yZXMgdGhpcyBuZXcgc3RyaW5nIGluIHN0ci4gUmVhbGlzZXMgYSBiYXNlIDIgZXhwb25lbnRpYWwgZ3Jvd3RoIG9mIHN0ci5cclxuICAgICAgICAgIHN0ciArPSBzdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH1cclxufVxyXG5leHBvcnQgeyBDc3ZEYXRhUm93IH07Il19
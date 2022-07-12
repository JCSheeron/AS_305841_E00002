define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BinSearchMode;
    (function (BinSearchMode) {
        BinSearchMode[BinSearchMode["NEAREST"] = 0] = "NEAREST";
        BinSearchMode[BinSearchMode["PREVIOUSLOWER"] = 1] = "PREVIOUSLOWER";
        BinSearchMode[BinSearchMode["LOWERBOUND"] = 2] = "LOWERBOUND";
        BinSearchMode[BinSearchMode["NEXTUPPER"] = 3] = "NEXTUPPER";
        BinSearchMode[BinSearchMode["UPPERBOUND"] = 4] = "UPPERBOUND";
    })(BinSearchMode = exports.BinSearchMode || (exports.BinSearchMode = {}));
    /**
     * implements binary search.
     *
     * @export
     * @class BinSearch
     */
    var BinSearch = /** @class */ (function () {
        function BinSearch() {
        }
        BinSearch.findNearest = function (value, data, searchMode, iFrom, iTo) {
            if (searchMode === void 0) { searchMode = BinSearchMode.NEAREST; }
            if (iFrom === void 0) { iFrom = 0; }
            if (iTo === void 0) { iTo = 0; }
            var OUT_OF_RANGE = -1;
            if (data.length > 1) {
                // initialize start index
                if (iFrom === 0 && iTo === 0) {
                    iTo = data.length - 1;
                }
                // check if value is outside the range and return the matching limit value
                if (value < data[iFrom])
                    return iFrom;
                else if (value > data[iTo])
                    return iTo;
                if (iTo - iFrom > 1) {
                    // split and select range containing the value
                    return BinSearch.splitRange(iFrom, iTo, value, data, searchMode);
                }
                else {
                    // we now reached the last step and need to select the best matching value depending on the search mode
                    return BinSearch.selectNearestValue(iFrom, iTo, value, data, searchMode);
                }
            }
            else if (data.length === 1) {
                return 0;
            }
            else {
                return OUT_OF_RANGE;
            }
        };
        /**
         * splits the available range and selects the one containing the value
         *
         * @private
         * @static
         * @param {number} iFrom
         * @param {number} iTo
         * @param {number} value
         * @param {number[]} data
         * @param {BinSearchMode} searchMode
         * @returns
         * @memberof BinSearch
         */
        BinSearch.splitRange = function (iFrom, iTo, value, data, searchMode) {
            // calculate the middle index
            var iMiddle = Math.floor((iFrom + iTo) / 2);
            // continue searching the upper range
            if (value > data[iMiddle]) {
                // continue searching within the upper range
                return this.findNearest(value, data, searchMode, iMiddle, iTo);
            }
            else {
                // continue seearching the lower range
                return this.findNearest(value, data, searchMode, iFrom, iMiddle);
            }
        };
        /**
         * determines the nearest value. The picked value depends on the search mode.
         *
         * @private
         * @static
         * @param {number} iFrom
         * @param {BinSearchMode} searchMode
         * @param {number} value
         * @param {number[]} data
         * @param {number} iTo
         * @returns
         * @memberof BinSearch
         */
        BinSearch.selectNearestValue = function (iFrom, iTo, value, data, searchMode) {
            var foundIndex = iFrom;
            switch (searchMode) {
                case BinSearchMode.NEAREST:
                    // select the nearest index
                    foundIndex = Math.abs(value - data[iFrom]) <= Math.abs(value - data[iTo]) ? iFrom : iTo;
                    break;
                case BinSearchMode.PREVIOUSLOWER:
                    // select the next smaller smaller possible value
                    foundIndex = value > data[iFrom] ? iFrom : iFrom > 0 ? iFrom - 1 : iFrom;
                    break;
                case BinSearchMode.LOWERBOUND:
                    // select the next smaller smaller possible value
                    foundIndex = value < data[iTo] ? iFrom : iTo;
                    break;
                case BinSearchMode.NEXTUPPER:
                    // select the next greater possible value
                    foundIndex = value < data[iTo] ? iTo : iTo + 1 < data.length ? iTo + 1 : iTo;
                    break;
                case BinSearchMode.UPPERBOUND:
                    // select the next greater possible value
                    foundIndex = value > data[iFrom] ? iTo : iFrom;
                    break;
            }
            return foundIndex;
        };
        /**
         * Source: https://codereview.stackexchange.com/questions/39573/is-this-binary-search-in-typescript-correct
         *
         * Good case:
         *  Returns the array index of the match
         *
         * Precondition:
         *  The array has to be sorted in an ascending way
         *
         * Error handling:
         *  Returns -1 if there is no match
         *
         * @static
         * @template T
         * @param {T[]} xs
         * @param {T} x
         * @param {(p: T, q: T) => number} fnCmp
         * @returns {number}
         * @memberof BinSearch
         */
        BinSearch.findExactMatch = function (xs, x, fnCmp) {
            var bot = 0;
            var top = xs.length;
            while (bot < top) { // If x is in xs, it's somewhere in xs[bot..top).
                var mid = Math.floor((bot + top) / 2);
                var c = fnCmp(xs[mid], x);
                if (c === 0)
                    return mid;
                if (c < 0)
                    bot = mid + 1;
                if (0 < c)
                    top = mid;
            }
            return -1;
        };
        return BinSearch;
    }());
    exports.BinSearch = BinSearch;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdXRpbGl0aWVzL2JpblNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQSxJQUFZLGFBTVg7SUFORCxXQUFZLGFBQWE7UUFDckIsdURBQU8sQ0FBQTtRQUNQLG1FQUFhLENBQUE7UUFDYiw2REFBVSxDQUFBO1FBQ1YsMkRBQVMsQ0FBQTtRQUNULDZEQUFVLENBQUE7SUFDZCxDQUFDLEVBTlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFNeEI7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQUE7UUE4SUEsQ0FBQztRQTdJVSxxQkFBVyxHQUFsQixVQUFtQixLQUFhLEVBQUUsSUFBYyxFQUFFLFVBQWtDLEVBQUUsS0FBaUIsRUFBRSxHQUFlO1lBQXRFLDJCQUFBLEVBQUEsYUFBYSxhQUFhLENBQUMsT0FBTztZQUFFLHNCQUFBLEVBQUEsU0FBaUI7WUFBRSxvQkFBQSxFQUFBLE9BQWU7WUFFcEgsSUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFFakIseUJBQXlCO2dCQUN6QixJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtvQkFDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QjtnQkFFRCwwRUFBMEU7Z0JBQzFFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ25CLE9BQU8sS0FBSyxDQUFDO3FCQUNaLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ3RCLE9BQU8sR0FBRyxDQUFDO2dCQUVmLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ2pCLDhDQUE4QztvQkFDOUMsT0FBTyxTQUFTLENB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Q0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQy9DLE1BQU07YUFDYjtZQUNELE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW1CRztRQUNXLHdCQUFjLEdBQTVCLFVBQWdDLEVBQU8sRUFBRSxDQUFJLEVBQUUsS0FBNkI7WUFFcEUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ1osSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNwQixPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxpREFBaUQ7Z0JBQ2pFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQUUsT0FBTyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQzthQUN6QjtZQUNKLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBOUlELElBOElDO0lBOUlZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBlbnVtIEJpblNlYXJjaE1vZGUge1xyXG4gICAgTkVBUkVTVCxcclxuICAgIFBSRVZJT1VTTE9XRVIsXHJcbiAgICBMT1dFUkJPVU5ELFxyXG4gICAgTkVYVFVQUEVSLFxyXG4gICAgVVBQRVJCT1VORFxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBiaW5hcnkgc2VhcmNoLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBCaW5TZWFyY2hcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5TZWFyY2gge1xyXG4gICAgc3RhdGljIGZpbmROZWFyZXN0KHZhbHVlOiBudW1iZXIsIGRhdGE6IG51bWJlcltdLCBzZWFyY2hNb2RlID0gQmluU2VhcmNoTW9kZS5ORUFSRVNULCBpRnJvbTogbnVtYmVyID0gMCwgaVRvOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgY29uc3QgT1VUX09GX1JBTkdFID0gLTE7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgc3RhcnQgaW5kZXhcclxuICAgICAgICAgICAgaWYgKGlGcm9tID09PSAwICYmIGlUbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaVRvID0gZGF0YS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB2YWx1ZSBpcyBvdXRzaWRlIHRoZSByYW5nZSBhbmQgcmV0dXJuIHRoZSBtYXRjaGluZyBsaW1pdCB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPCBkYXRhW2lGcm9tXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBpRnJvbTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPiBkYXRhW2lUb10pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaVRvO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlUbyAtIGlGcm9tID4gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc3BsaXQgYW5kIHNlbGVjdCByYW5nZSBjb250YWluaW5nIHRoZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJpblNlYXJjaC5zcGxpdFJhbmdlKGlGcm9tLCBpVG8sIHZhbHVlLCBkYXRhLCBzZWFyY2hNb2RlKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB3ZSBub3cgcmVhY2hlZCB0aGUgbGFzdCBzdGVwIGFuZCBuZWVkIHRvIHNlbGVjdCB0aGUgYmVzdCBtYXRjaGluZyB2YWx1ZSBkZXBlbmRpbmcgb24gdGhlIHNlYXJjaCBtb2RlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmluU2VhcmNoLnNlbGVjdE5lYXJlc3RWYWx1ZShpRnJvbSwgaVRvLCB2YWx1ZSwgZGF0YSwgc2VhcmNoTW9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9VVF9PRl9SQU5HRTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3BsaXRzIHRoZSBhdmFpbGFibGUgcmFuZ2UgYW5kIHNlbGVjdHMgdGhlIG9uZSBjb250YWluaW5nIHRoZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaUZyb21cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpVG9cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gZGF0YVxyXG4gICAgICogQHBhcmFtIHtCaW5TZWFyY2hNb2RlfSBzZWFyY2hNb2RlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEJpblNlYXJjaFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzcGxpdFJhbmdlKGlGcm9tOiBudW1iZXIsIGlUbzogbnVtYmVyLCB2YWx1ZTogbnVtYmVyLCBkYXRhOiBudW1iZXJbXSwgc2VhcmNoTW9kZTogQmluU2VhcmNoTW9kZSkge1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIG1pZGRsZSBpbmRleFxyXG4gICAgICAgIGNvbnN0IGlNaWRkbGUgPSBNYXRoLmZsb29yKChpRnJvbSArIGlUbykgLyAyKTtcclxuXHJcbiAgICAgICAgLy8gY29udGludWUgc2VhcmNoaW5nIHRoZSB1cHBlciByYW5nZVxyXG4gICAgICAgIGlmICh2YWx1ZSA+IGRhdGFbaU1pZGRsZV0pIHtcclxuICAgICAgICAgICAgLy8gY29udGludWUgc2VhcmNoaW5nIHdpdGhpbiB0aGUgdXBwZXIgcmFuZ2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5lYXJlc3QodmFsdWUsIGRhdGEsIHNlYXJjaE1vZGUsIGlNaWRkbGUsIGlUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjb250aW51ZSBzZWVhcmNoaW5nIHRoZSBsb3dlciByYW5nZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTmVhcmVzdCh2YWx1ZSwgZGF0YSwgc2VhcmNoTW9kZSwgaUZyb20sIGlNaWRkbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRldGVybWluZXMgdGhlIG5lYXJlc3QgdmFsdWUuIFRoZSBwaWNrZWQgdmFsdWUgZGVwZW5kcyBvbiB0aGUgc2VhcmNoIG1vZGUuIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaUZyb21cclxuICAgICAqIEBwYXJhbSB7QmluU2VhcmNoTW9kZX0gc2VhcmNoTW9kZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaVRvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEJpblNlYXJjaFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZWxlY3ROZWFyZXN0VmFsdWUoaUZyb206IG51bWJlciwgaVRvOiBudW1iZXIsIHZhbHVlOiBudW1iZXIsIGRhdGE6IG51bWJlcltdLCBzZWFyY2hNb2RlOiBCaW5TZWFyY2hNb2RlKSB7XHJcbiAgICAgICAgbGV0IGZvdW5kSW5kZXggPSBpRnJvbTtcclxuICAgICAgICBzd2l0Y2ggKHNlYXJjaE1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBCaW5TZWFyY2hNb2RlLk5FQVJFU1Q6XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxlY3QgdGhlIG5lYXJlc3QgaW5kZXhcclxuICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSBNYXRoLmFicyh2YWx1ZSAtIGRhdGFbaUZyb21dKSA8PSBNYXRoLmFicyh2YWx1ZSAtIGRhdGFbaVRvXSkgPyBpRnJvbSA6IGlUbztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJpblNlYXJjaE1vZGUuUFJFVklPVVNMT1dFUjpcclxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdCB0aGUgbmV4dCBzbWFsbGVyIHNtYWxsZXIgcG9zc2libGUgdmFsdWVcclxuICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSB2YWx1ZSA+IGRhdGFbaUZyb21dID8gaUZyb20gOiBpRnJvbSA+IDAgPyBpRnJvbSAtIDEgOiBpRnJvbTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJpblNlYXJjaE1vZGUuTE9XRVJCT1VORDpcclxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdCB0aGUgbmV4dCBzbWFsbGVyIHNtYWxsZXIgcG9zc2libGUgdmFsdWVcclxuICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSB2YWx1ZSA8IGRhdGFbaVRvXSA/IGlGcm9tIDogaVRvO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQmluU2VhcmNoTW9kZS5ORVhUVVBQRVI6XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxlY3QgdGhlIG5leHQgZ3JlYXRlciBwb3NzaWJsZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IHZhbHVlIDwgZGF0YVtpVG9dID8gaVRvIDogaVRvICsgMSA8IGRhdGEubGVuZ3RoID8gaVRvICsgMSA6IGlUbztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJpblNlYXJjaE1vZGUuVVBQRVJCT1VORDpcclxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdCB0aGUgbmV4dCBncmVhdGVyIHBvc3NpYmxlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICBmb3VuZEluZGV4ID0gdmFsdWUgPiBkYXRhW2lGcm9tXSA/IGlUbyA6IGlGcm9tO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZEluZGV4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNvdXJjZTogaHR0cHM6Ly9jb2RlcmV2aWV3LnN0YWNrZXhjaGFuZ2UuY29tL3F1ZXN0aW9ucy8zOTU3My9pcy10aGlzLWJpbmFyeS1zZWFyY2gtaW4tdHlwZXNjcmlwdC1jb3JyZWN0XHJcbiAgICAgKiBcclxuICAgICAqIEdvb2QgY2FzZTpcclxuICAgICAqICBSZXR1cm5zIHRoZSBhcnJheSBpbmRleCBvZiB0aGUgbWF0Y2hcclxuICAgICAqIFxyXG4gICAgICogUHJlY29uZGl0aW9uOlxyXG4gICAgICogIFRoZSBhcnJheSBoYXMgdG8gYmUgc29ydGVkIGluIGFuIGFzY2VuZGluZyB3YXlcclxuICAgICAqIFxyXG4gICAgICogRXJyb3IgaGFuZGxpbmc6XHJcbiAgICAgKiAgUmV0dXJucyAtMSBpZiB0aGVyZSBpcyBubyBtYXRjaFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBUXHJcbiAgICAgKiBAcGFyYW0ge1RbXX0geHNcclxuICAgICAqIEBwYXJhbSB7VH0geFxyXG4gICAgICogQHBhcmFtIHsocDogVCwgcTogVCkgPT4gbnVtYmVyfSBmbkNtcFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBCaW5TZWFyY2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kRXhhY3RNYXRjaDxUPih4czogVFtdLCB4OiBULCBmbkNtcDogKHA6IFQsIHE6IFQpID0+IG51bWJlcikgOiBudW1iZXJ7XHJcbiAgICAgXHJcbiAgICAgICAgICAgIHZhciBib3QgPSAwO1xyXG4gICAgICAgICAgICB2YXIgdG9wID0geHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZSAoYm90IDwgdG9wKSB7IC8vIElmIHggaXMgaW4geHMsIGl0J3Mgc29tZXdoZXJlIGluIHhzW2JvdC4udG9wKS5cclxuICAgICAgICAgICAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChib3QgKyB0b3ApIC8gMik7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IGZuQ21wKHhzW21pZF0sIHgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IDApIHJldHVybiBtaWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDApIGJvdCA9IG1pZCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoMCA8IGMpIHRvcCA9IG1pZDsgXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH0gICAgXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
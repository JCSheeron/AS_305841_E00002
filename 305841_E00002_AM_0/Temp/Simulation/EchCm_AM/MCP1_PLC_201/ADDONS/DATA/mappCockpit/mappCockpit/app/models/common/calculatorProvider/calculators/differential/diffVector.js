define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Static class to execute the differential algortihm.
     *
     * @class diffVector
     */
    var DiffVector = /** @class */ (function () {
        /**
         * Constructor set to private class should only provide static calculation functions.
         * Creates an instance of diffVector.
         * @memberof diffVector
         */
        function DiffVector() {
        }
        ;
        /**
         * Calculate differential; If the input parameters are invalid an empty array get returned
         *
         * @public
         * @static
         * @param {Array<number>} inputSignalX
         * @param {Array<number>} inputSignalY
         * @returns {Array<number>} returns calculated Y Values
         * @memberof diffVector
         */
        DiffVector.diffCalculate = function (inputSignalX, inputSignalY) {
            var outputSignal = new Array();
            if (inputSignalX.length == inputSignalY.length && inputSignalX.length > 0) {
                var dXTemp = inputSignalX[0];
                var dYTemp = inputSignalY[0];
                var closeNegativeValueToZero = -1E-10;
                var closePostiveValueToZero = 1E-10;
                for (var i = 0; i < inputSignalX.length - 1; i++) {
                    var dDiv = inputSignalX[i + 1] - dXTemp;
                    var dFact = inputSignalY[i + 1] - dYTemp;
                    var newYValue = dFact;
                    if ((dDiv < closeNegativeValueToZero) || (dDiv > closePostiveValueToZero)) { //Avoid division by zero
                        newYValue = dFact / dDiv;
                    }
                    if (i == 0) {
                        // Add start datapoint to get same points as in input
                        outputSignal.push(newYValue);
                    }
                    outputSignal.push(newYValue);
                    dXTemp = inputSignalX[i + 1];
                    dYTemp = inputSignalY[i + 1];
                }
            }
            return outputSignal;
        };
        return DiffVector;
    }());
    exports.DiffVector = DiffVector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZlZlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvZGlmZmVyZW50aWFsL2RpZmZWZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7Ozs7T0FJRztJQUNIO1FBRUk7Ozs7V0FJRztRQUNIO1FBQXVCLENBQUM7UUFBQSxDQUFDO1FBRXpCOzs7Ozs7Ozs7V0FTRztRQUNXLHdCQUFhLEdBQTNCLFVBQTRCLFlBQTJCLEVBQUUsWUFBMkI7WUFFaEYsSUFBSSxZQUFZLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUV2QyxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFFdkUsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdCLElBQUksd0JBQXdCLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RDLElBQUksdUJBQXVCLEdBQUcsS0FBSyxDQUFDO2dCQUVwQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBRTFDLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUN0QyxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDdkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN0QixJQUFHLENBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQXVCLENBQUMsRUFBQyxFQUFFLHdCQUF3Qjt3QkFDL0YsU0FBUyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7cUJBQzVCO29CQUNELElBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQzt3QkFDTixxREFBcUQ7d0JBQ3JELFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ2hDO29CQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRTdCLE1BQU0sR0FBRyxZQUFZLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUI7YUFFSjtZQUNELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFDTCxpQkFBQztJQUFELENBQUMsQUFwREQsSUFvREM7SUFwRFksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU3RhdGljIGNsYXNzIHRvIGV4ZWN1dGUgdGhlIGRpZmZlcmVudGlhbCBhbGdvcnRpaG0uXHJcbiAqXHJcbiAqIEBjbGFzcyBkaWZmVmVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGlmZlZlY3RvciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvciBzZXQgdG8gcHJpdmF0ZSBjbGFzcyBzaG91bGQgb25seSBwcm92aWRlIHN0YXRpYyBjYWxjdWxhdGlvbiBmdW5jdGlvbnMuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGRpZmZWZWN0b3IuXHJcbiAgICAgKiBAbWVtYmVyb2YgZGlmZlZlY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgZGlmZmVyZW50aWFsOyBJZiB0aGUgaW5wdXQgcGFyYW1ldGVycyBhcmUgaW52YWxpZCBhbiBlbXB0eSBhcnJheSBnZXQgcmV0dXJuZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGlucHV0U2lnbmFsWFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBpbnB1dFNpZ25hbFlcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxudW1iZXI+fSByZXR1cm5zIGNhbGN1bGF0ZWQgWSBWYWx1ZXNcclxuICAgICAqIEBtZW1iZXJvZiBkaWZmVmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGlmZkNhbGN1bGF0ZShpbnB1dFNpZ25hbFg6IEFycmF5PG51bWJlcj4sIGlucHV0U2lnbmFsWTogQXJyYXk8bnVtYmVyPikgOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgb3V0cHV0U2lnbmFsID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0U2lnbmFsWC5sZW5ndGggPT0gaW5wdXRTaWduYWxZLmxlbmd0aCAmJiBpbnB1dFNpZ25hbFgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRYVGVtcCA9IGlucHV0U2lnbmFsWFswXTtcclxuICAgICAgICAgICAgbGV0IGRZVGVtcCA9IGlucHV0U2lnbmFsWVswXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjbG9zZU5lZ2F0aXZlVmFsdWVUb1plcm8gPSAtMUUtMTA7XHJcbiAgICAgICAgICAgIGxldCBjbG9zZVBvc3RpdmVWYWx1ZVRvWmVybyA9IDFFLTEwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsWC5sZW5ndGgtMTsgaSsrKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGREaXYgPSBpbnB1dFNpZ25hbFhbaSsxXSAtIGRYVGVtcDtcdFxyXG4gICAgICAgICAgICAgICAgbGV0IGRGYWN0ID0gaW5wdXRTaWduYWxZW2krMV0gLSBkWVRlbXA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3WVZhbHVlID0gZEZhY3Q7XHJcbiAgICAgICAgICAgICAgICBpZigoZERpdiA8IGNsb3NlTmVnYXRpdmVWYWx1ZVRvWmVybykgfHwgKGREaXYgPiBjbG9zZVBvc3RpdmVWYWx1ZVRvWmVybykpeyAvL0F2b2lkIGRpdmlzaW9uIGJ5IHplcm9cclxuICAgICAgICAgICAgICAgICAgICBuZXdZVmFsdWUgPSBkRmFjdCAvIGREaXY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBzdGFydCBkYXRhcG9pbnQgdG8gZ2V0IHNhbWUgcG9pbnRzIGFzIGluIGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0U2lnbmFsLnB1c2gobmV3WVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG91dHB1dFNpZ25hbC5wdXNoKG5ld1lWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRYVGVtcCA9IGlucHV0U2lnbmFsWFtpKzFdO1xyXG4gICAgICAgICAgICAgICAgZFlUZW1wID0gaW5wdXRTaWduYWxZW2krMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXRwdXRTaWduYWw7XHJcbiAgICB9XHJcbn1cclxuICAgICJdfQ==
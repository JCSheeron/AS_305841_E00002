define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MathX = /** @class */ (function () {
        function MathX() {
        }
        /**
         * Returns the median of an array of numbers
         * Two relevant cases:
         *  - even number of array elements:
         *      the avarave of the two middle elements is returned
         *  - odd number of array elements
         *      the middle element is returned
         *
         * @export
         * @param {*} arr
         * @returns
         */
        MathX.median = function (arr) {
            arr.sort(function (a, b) { return a - b; }); // sort all elements depending on the value
            var medianNumber = 0.0;
            if (arr.length % 2 == 0) { // even number of elements take the two closest elements and calculate the mean values of both of them
                var lowerIndex = Math.floor((arr.length - 1.0) / 2.0);
                var upperIndex = lowerIndex + 1;
                medianNumber = (arr[lowerIndex] + arr[upperIndex]) / 2.0;
            }
            else { // odd number of elements --> take the element in the middle
                medianNumber = arr[(arr.length - 1) / 2];
            }
            return medianNumber;
        };
        /**
         * Finds the maximum within an array
         *
         * @param {*} values
         * @returns
         * @memberof MAthX
         */
        MathX.max = function (values) {
            var max = values[0];
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                max = value > max ? value : max;
            }
            return max;
        };
        /**
         * Finds the minimum within the array
         *
         * @param {*} values
         * @returns
         * @memberof MAthX
         */
        MathX.min = function (values) {
            var min = values[0];
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                min = value < min ? value : min;
            }
            return min;
        };
        return MathX;
    }());
    exports.MathX = MathX;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aFguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9tYXRoL21hdGhYLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7UUF1RUEsQ0FBQztRQXBFRzs7Ozs7Ozs7Ozs7V0FXRztRQUNXLFlBQU0sR0FBcEIsVUFBcUIsR0FBWTtZQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQyxFQUFFLENBQUMsSUFBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLDJDQUEyQztZQUV0RixJQUFJLFlBQVksR0FBVyxHQUFHLENBQUM7WUFFL0IsSUFBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxzR0FBc0c7Z0JBQzNILElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLFVBQVUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQzVEO2lCQUNHLEVBQUUsNERBQTREO2dCQUM5RCxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QztZQUVELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDSSxTQUFHLEdBQVYsVUFBVyxNQUFnQjtZQUN2QixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2FBQ25DO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksU0FBRyxHQUFWLFVBQVcsTUFBZ0I7WUFFdkIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUNuQztZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUtMLFlBQUM7SUFBRCxDQUFDLEFBdkVELElBdUVDO0lBdkVZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5leHBvcnQgY2xhc3MgTWF0aFh7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbWVkaWFuIG9mIGFuIGFycmF5IG9mIG51bWJlcnNcclxuICAgICAqIFR3byByZWxldmFudCBjYXNlczpcclxuICAgICAqICAtIGV2ZW4gbnVtYmVyIG9mIGFycmF5IGVsZW1lbnRzOlxyXG4gICAgICogICAgICB0aGUgYXZhcmF2ZSBvZiB0aGUgdHdvIG1pZGRsZSBlbGVtZW50cyBpcyByZXR1cm5lZFxyXG4gICAgICogIC0gb2RkIG51bWJlciBvZiBhcnJheSBlbGVtZW50c1xyXG4gICAgICogICAgICB0aGUgbWlkZGxlIGVsZW1lbnQgaXMgcmV0dXJuZWRcclxuICAgICAqXHJcbiAgICAgKiBAZXhwb3J0XHJcbiAgICAgKiBAcGFyYW0geyp9IGFyclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtZWRpYW4oYXJyOm51bWJlcltdKXtcclxuICAgICAgICBhcnIuc29ydChmdW5jdGlvbihhLCBiKXsgcmV0dXJuIGEgLSBiOyB9KTsgLy8gc29ydCBhbGwgZWxlbWVudHMgZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZVxyXG5cclxuICAgICAgICBsZXQgbWVkaWFuTnVtYmVyIDpudW1iZXIgPSAwLjA7XHJcbiAgICBcclxuICAgICAgICBpZihhcnIubGVuZ3RoICUgMiA9PSAwKXsgLy8gZXZlbiBudW1iZXIgb2YgZWxlbWVudHMgdGFrZSB0aGUgdHdvIGNsb3Nlc3QgZWxlbWVudHMgYW5kIGNhbGN1bGF0ZSB0aGUgbWVhbiB2YWx1ZXMgb2YgYm90aCBvZiB0aGVtXHJcbiAgICAgICAgICAgIGxldCBsb3dlckluZGV4ID0gTWF0aC5mbG9vcigoYXJyLmxlbmd0aC0xLjApLzIuMCk7XHJcbiAgICAgICAgICAgIGxldCB1cHBlckluZGV4ID0gbG93ZXJJbmRleCArIDE7XHJcbiAgICAgICAgICAgIG1lZGlhbk51bWJlciA9IChhcnJbbG93ZXJJbmRleF0gKyBhcnJbdXBwZXJJbmRleF0pIC8gMi4wOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAvLyBvZGQgbnVtYmVyIG9mIGVsZW1lbnRzIC0tPiB0YWtlIHRoZSBlbGVtZW50IGluIHRoZSBtaWRkbGVcclxuICAgICAgICAgICAgbWVkaWFuTnVtYmVyID0gYXJyWyhhcnIubGVuZ3RoLTEpLzJdOyAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIG1lZGlhbk51bWJlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyB0aGUgbWF4aW11bSB3aXRoaW4gYW4gYXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNQXRoWFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbWF4KHZhbHVlczogbnVtYmVyW10pIHtcclxuICAgICAgICBsZXQgbWF4ID0gdmFsdWVzWzBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xyXG4gICAgICAgICAgICBtYXggPSB2YWx1ZSA+IG1heCA/IHZhbHVlIDogbWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgdGhlIG1pbmltdW0gd2l0aGluIHRoZSBhcnJheVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1BdGhYXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtaW4odmFsdWVzOiBudW1iZXJbXSkge1xyXG5cclxuICAgICAgICBsZXQgbWluID0gdmFsdWVzWzBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcclxuICAgICAgICAgICAgbWluID0gdmFsdWUgPCBtaW4gPyB2YWx1ZSA6IG1pbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtaW47XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59Il19
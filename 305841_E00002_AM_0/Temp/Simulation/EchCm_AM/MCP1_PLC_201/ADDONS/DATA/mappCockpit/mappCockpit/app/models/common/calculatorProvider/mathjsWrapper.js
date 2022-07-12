define(["require", "exports", "../../../libs/math/mathjs", "./calculators/filters/bessel", "./calculators/differential/diffVector"], function (require, exports, math, bessel_1, diffVector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Wrapper singleton class for calculator to provide common functionalities only used in some cases with mathjs.
     *
     * @class MathjsRapper
     */
    var MathjsWrapper = /** @class */ (function () {
        /**
         * Constructor set by getInstance should create a singleton class.
         * Creates an instance of MathjsWrapper.
         * @memberof MathjsWrapper
         */
        function MathjsWrapper() {
            /**
             * Use the Bessel Calculator as typed mathjs function and returns filtered signal
             * @private
             * @param {Array<number>} inputSignalY
             * @param {number} sampleTime
             * @param {number} cutOffFrequency
             * @param {number} filterOrder
             * @returns {Array<number>}
             * @memberof MathjsWrapper
             */
            this.lpBessel = math.typed("BR_LP_Bessel", {
                'Array, number, number, number': function (inputSignalY, sampleTime, cutOffFrequency, filterOrder) {
                    if (isNaN(filterOrder) || filterOrder < bessel_1.Bessel.filterOrderMin || filterOrder > bessel_1.Bessel.filterOrderMax) {
                        //this.addError("Calculation Error: '" + filterOrder + "' is not defined or out of range (valid range 1-5)!");
                        return new Array();
                    }
                    var filter = new bessel_1.Bessel(filterOrder, cutOffFrequency, sampleTime);
                    return filter.filter(inputSignalY);
                }
            });
            /**
             * Use the diff Calculator as typed mathjs function
             * @private
             * @param {Array<number>} inputSignalX
             * @param {Array<number>} inputSignalY
             * @returns {Array<number>}
             * @memberof MathjsWrapper
            */
            this.diffSignal = math.typed("BR_Diff", {
                'Array, Array': function (inputSignalX, inputSignalY) {
                    return diffVector_1.DiffVector.diffCalculate(inputSignalX, inputSignalY);
                }
            });
            this._mathLibFn = math.create(math.all);
            this.setAdditionalCalculators();
        }
        ;
        /**
         *Runs the mathjs parse function with limited function pool
         *
         * @param {string} inputString
         * @returns {any} Returns a parse tree
         * @memberof MathjsWrapper
         */
        MathjsWrapper.prototype.limitedParse = function (inputString) {
            return this._limitedParse(inputString);
        };
        /**
         * gets a singleton instance of MathjsWrapper
         *
         * @public
         * @static
         * @type {MathjsWrapper}
         * @memberof MathjsWrapper
         */
        MathjsWrapper.getInstance = function () {
            if (MathjsWrapper._instance == undefined) {
                MathjsWrapper._instance = new MathjsWrapper();
            }
            return MathjsWrapper._instance;
        };
        /**
         * This function sets the self-generated functions
         * and excludes existing functions of the math.js library that can lead to an security risk.
         * According to that this function handles the parsing limitations for the receivable math instance.
         *
         * @private
         * @memberof MathjsWrapper
         */
        MathjsWrapper.prototype.setAdditionalCalculators = function () {
            //Receive additional calculators
            this._mathLibFn.import({
                BR_LP_Bessel: this.lpBessel,
                BR_Diff: this.diffSignal,
            }, { override: true });
            //Evaluate and parse function for internal usage
            this._limitedParse = this._mathLibFn.parse;
            //Exclude functions with security risks for the user     
            this._mathLibFn.import({
                'import': function () { throw new Error('Function import is disabled'); },
                'createUnit': function () { throw new Error('Function createUnit is disabled'); },
                'evaluate': function () { throw new Error('Function evaluate is disabled'); },
                'parse': function () { throw new Error('Function parse is disabled'); },
                'simplify': function () { throw new Error('Function simplify is disabled'); },
                'derivative': function () { throw new Error('Function derivative is disabled'); }
            }, { override: true });
        };
        return MathjsWrapper;
    }());
    exports.MathjsWrapper = MathjsWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aGpzV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvbWF0aGpzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTs7OztPQUlHO0lBQ0g7UUFNSTs7OztXQUlHO1FBQ0g7WUE2REE7Ozs7Ozs7OztlQVNHO1lBQ0ssYUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO2dCQUMxQywrQkFBK0IsRUFBRSxVQUFTLFlBQTJCLEVBQUUsVUFBa0IsRUFBRSxlQUF1QixFQUFFLFdBQW1CO29CQUVuSSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLEdBQUcsZUFBTSxDQUFDLGNBQWMsSUFBSSxXQUFXLEdBQUcsZUFBTSxDQUFDLGNBQWMsRUFBRTt3QkFDakcsOEdBQThHO3dCQUM5RyxPQUFPLElBQUksS0FBSyxFQUFVLENBQUM7cUJBQzlCO29CQUVELElBQUksTUFBTSxHQUFXLElBQUksZUFBTSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQzFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkMsQ0FBQzthQUNKLENBQUMsQ0FBQztZQUVIOzs7Ozs7O2NBT0U7WUFDTSxlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3ZDLGNBQWMsRUFBRSxVQUFTLFlBQTJCLEVBQUUsWUFBMkI7b0JBQzdFLE9BQU8sdUJBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNoRSxDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBL0ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUFBLENBQUM7UUFFRjs7Ozs7O1dBTUc7UUFDSSxvQ0FBWSxHQUFuQixVQUFvQixXQUFtQjtZQUNuQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDVyx5QkFBVyxHQUF6QjtZQUNJLElBQUcsYUFBYSxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUM7Z0JBQ3BDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQzthQUNqRDtZQUNELE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLGdEQUF3QixHQUFoQztZQUVJLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztnQkFDbkIsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDM0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRXZCLGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBRTNDLHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztnQkFDbkIsUUFBUSxFQUFNLGNBQWMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDNUUsWUFBWSxFQUFFLGNBQWMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDaEYsVUFBVSxFQUFJLGNBQWMsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDOUUsT0FBTyxFQUFPLGNBQWMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDM0UsVUFBVSxFQUFJLGNBQWMsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDOUUsWUFBWSxFQUFFLGNBQWMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBLENBQUMsQ0FBQzthQUNuRixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDMUIsQ0FBQztRQXNDTCxvQkFBQztJQUFELENBQUMsQUE1R0QsSUE0R0M7SUE1R1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtYXRoIGZyb20gIFwiLi4vLi4vLi4vbGlicy9tYXRoL21hdGhqc1wiXHJcbmltcG9ydCB7IEJlc3NlbCB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2ZpbHRlcnMvYmVzc2VsXCI7XHJcbmltcG9ydCB7IERpZmZWZWN0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9kaWZmZXJlbnRpYWwvZGlmZlZlY3RvclwiO1xyXG5cclxuLyoqXHJcbiAqIFdyYXBwZXIgc2luZ2xldG9uIGNsYXNzIGZvciBjYWxjdWxhdG9yIHRvIHByb3ZpZGUgY29tbW9uIGZ1bmN0aW9uYWxpdGllcyBvbmx5IHVzZWQgaW4gc29tZSBjYXNlcyB3aXRoIG1hdGhqcy5cclxuICpcclxuICogQGNsYXNzIE1hdGhqc1JhcHBlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hdGhqc1dyYXBwZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTWF0aGpzV3JhcHBlcjtcclxuICAgIHByaXZhdGUgX21hdGhMaWJGbjogYW55O1xyXG4gICAgcHJpdmF0ZSBfbGltaXRlZFBhcnNlOiBhbnk7ICAvL05lZWRlZCBpbiBjYWxjdWxhdG9yc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igc2V0IGJ5IGdldEluc3RhbmNlIHNob3VsZCBjcmVhdGUgYSBzaW5nbGV0b24gY2xhc3MuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hdGhqc1dyYXBwZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0aGpzV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX21hdGhMaWJGbiA9IG1hdGguY3JlYXRlKG1hdGguYWxsKTtcclxuICAgICAgICB0aGlzLnNldEFkZGl0aW9uYWxDYWxjdWxhdG9ycygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqUnVucyB0aGUgbWF0aGpzIHBhcnNlIGZ1bmN0aW9uIHdpdGggbGltaXRlZCBmdW5jdGlvbiBwb29sXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0U3RyaW5nIFxyXG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyBhIHBhcnNlIHRyZWVcclxuICAgICAqIEBtZW1iZXJvZiBNYXRoanNXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsaW1pdGVkUGFyc2UoaW5wdXRTdHJpbmc6IHN0cmluZykgOiBhbnkgeyAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGltaXRlZFBhcnNlKGlucHV0U3RyaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgTWF0aGpzV3JhcHBlclxyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtNYXRoanNXcmFwcGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hdGhqc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBNYXRoanNXcmFwcGVye1xyXG4gICAgICAgIGlmKE1hdGhqc1dyYXBwZXIuX2luc3RhbmNlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIE1hdGhqc1dyYXBwZXIuX2luc3RhbmNlID0gbmV3IE1hdGhqc1dyYXBwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGhqc1dyYXBwZXIuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBzZWxmLWdlbmVyYXRlZCBmdW5jdGlvbnMgXHJcbiAgICAgKiBhbmQgZXhjbHVkZXMgZXhpc3RpbmcgZnVuY3Rpb25zIG9mIHRoZSBtYXRoLmpzIGxpYnJhcnkgdGhhdCBjYW4gbGVhZCB0byBhbiBzZWN1cml0eSByaXNrLlxyXG4gICAgICogQWNjb3JkaW5nIHRvIHRoYXQgdGhpcyBmdW5jdGlvbiBoYW5kbGVzIHRoZSBwYXJzaW5nIGxpbWl0YXRpb25zIGZvciB0aGUgcmVjZWl2YWJsZSBtYXRoIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0aGpzV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEFkZGl0aW9uYWxDYWxjdWxhdG9ycygpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vUmVjZWl2ZSBhZGRpdGlvbmFsIGNhbGN1bGF0b3JzXHJcbiAgICAgICAgdGhpcy5fbWF0aExpYkZuLmltcG9ydCh7XHJcbiAgICAgICAgICAgIEJSX0xQX0Jlc3NlbDogdGhpcy5scEJlc3NlbCxcclxuICAgICAgICAgICAgQlJfRGlmZjogdGhpcy5kaWZmU2lnbmFsLFxyXG4gICAgICAgIH0sIHsgb3ZlcnJpZGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIC8vRXZhbHVhdGUgYW5kIHBhcnNlIGZ1bmN0aW9uIGZvciBpbnRlcm5hbCB1c2FnZVxyXG4gICAgICAgIHRoaXMuX2xpbWl0ZWRQYXJzZSA9IHRoaXMuX21hdGhMaWJGbi5wYXJzZTtcclxuXHJcbiAgICAgICAgLy9FeGNsdWRlIGZ1bmN0aW9ucyB3aXRoIHNlY3VyaXR5IHJpc2tzIGZvciB0aGUgdXNlciAgICAgXHJcbiAgICAgICAgdGhpcy5fbWF0aExpYkZuLmltcG9ydCh7XHJcbiAgICAgICAgICAgICdpbXBvcnQnOiAgICAgZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIGltcG9ydCBpcyBkaXNhYmxlZCcpIH0sXHJcbiAgICAgICAgICAgICdjcmVhdGVVbml0JzogZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIGNyZWF0ZVVuaXQgaXMgZGlzYWJsZWQnKSB9LFxyXG4gICAgICAgICAgICAnZXZhbHVhdGUnOiAgIGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBldmFsdWF0ZSBpcyBkaXNhYmxlZCcpIH0sXHJcbiAgICAgICAgICAgICdwYXJzZSc6ICAgICAgZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIHBhcnNlIGlzIGRpc2FibGVkJykgfSxcclxuICAgICAgICAgICAgJ3NpbXBsaWZ5JzogICBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gc2ltcGxpZnkgaXMgZGlzYWJsZWQnKSB9LFxyXG4gICAgICAgICAgICAnZGVyaXZhdGl2ZSc6IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBkZXJpdmF0aXZlIGlzIGRpc2FibGVkJykgfVxyXG4gICAgICAgIH0sIHsgb3ZlcnJpZGU6IHRydWUgfSkgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVXNlIHRoZSBCZXNzZWwgQ2FsY3VsYXRvciBhcyB0eXBlZCBtYXRoanMgZnVuY3Rpb24gYW5kIHJldHVybnMgZmlsdGVyZWQgc2lnbmFsXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBpbnB1dFNpZ25hbFlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzYW1wbGVUaW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3V0T2ZmRnJlcXVlbmN5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsdGVyT3JkZXJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hdGhqc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBscEJlc3NlbCA9IG1hdGgudHlwZWQoXCJCUl9MUF9CZXNzZWxcIiwge1xyXG4gICAgICAgICdBcnJheSwgbnVtYmVyLCBudW1iZXIsIG51bWJlcic6IGZ1bmN0aW9uKGlucHV0U2lnbmFsWTogQXJyYXk8bnVtYmVyPiwgc2FtcGxlVGltZTogbnVtYmVyLCBjdXRPZmZGcmVxdWVuY3k6IG51bWJlciwgZmlsdGVyT3JkZXI6IG51bWJlcikgOiBBcnJheTxudW1iZXI+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKGlzTmFOKGZpbHRlck9yZGVyKSB8fCBmaWx0ZXJPcmRlciA8IEJlc3NlbC5maWx0ZXJPcmRlck1pbiB8fCBmaWx0ZXJPcmRlciA+IEJlc3NlbC5maWx0ZXJPcmRlck1heCApe1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6ICdcIiArIGZpbHRlck9yZGVyICsgXCInIGlzIG5vdCBkZWZpbmVkIG9yIG91dCBvZiByYW5nZSAodmFsaWQgcmFuZ2UgMS01KSFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZpbHRlcjogQmVzc2VsID0gbmV3IEJlc3NlbChmaWx0ZXJPcmRlciwgY3V0T2ZmRnJlcXVlbmN5LCBzYW1wbGVUaW1lKTsgXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXIuZmlsdGVyKGlucHV0U2lnbmFsWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdGhlIGRpZmYgQ2FsY3VsYXRvciBhcyB0eXBlZCBtYXRoanMgZnVuY3Rpb25cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGlucHV0U2lnbmFsWFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBpbnB1dFNpZ25hbFlcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hdGhqc1dyYXBwZXJcclxuICAgICovXHJcbiAgICBwcml2YXRlIGRpZmZTaWduYWwgPSBtYXRoLnR5cGVkKFwiQlJfRGlmZlwiLCB7XHJcbiAgICAgICAgJ0FycmF5LCBBcnJheSc6IGZ1bmN0aW9uKGlucHV0U2lnbmFsWDogQXJyYXk8bnVtYmVyPiwgaW5wdXRTaWduYWxZOiBBcnJheTxudW1iZXI+KSA6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgICAgICByZXR1cm4gRGlmZlZlY3Rvci5kaWZmQ2FsY3VsYXRlKGlucHV0U2lnbmFsWCwgaW5wdXRTaWduYWxZKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSJdfQ==
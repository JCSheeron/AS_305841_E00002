var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./valuePair"], function (require, exports, valuePair_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents a amplitude at a certain frequency.
     *
     * @class FrequencyAmplitude
     * @extends {ValuePair<number, number>}
     * @implements {IFrequencyAmplitude}
     */
    var FrequencyAmplitude = /** @class */ (function (_super) {
        __extends(FrequencyAmplitude, _super);
        /**
         * Creates an instance of FrequencyAmplitude.
         *
         * @param {number} f
         * @param {number} a
         * @memberof FrequencyAmplitude
         */
        function FrequencyAmplitude(f, a) {
            return _super.call(this, f, a) || this;
        }
        Object.defineProperty(FrequencyAmplitude.prototype, "f", {
            get: function () {
                return this._value1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrequencyAmplitude.prototype, "a", {
            get: function () {
                return this._value2;
            },
            enumerable: true,
            configurable: true
        });
        return FrequencyAmplitude;
    }(valuePair_1.ValuePair));
    exports.FrequencyAmplitude = FrequencyAmplitude;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlcXVlbmN5QW1wbGl0dWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb3JlL3R5cGVzL2ZyZXF1ZW5jeUFtcGxpdHVkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7Ozs7OztPQU1HO0lBQ0g7UUFBaUMsc0NBQXlCO1FBR3REOzs7Ozs7V0FNRztRQUNILDRCQUFZLENBQVMsRUFBRSxDQUFTO21CQUU1QixrQkFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVELHNCQUFXLGlDQUFDO2lCQUFaO2dCQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUVELHNCQUFXLGlDQUFDO2lCQUFaO2dCQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUVMLHlCQUFDO0lBQUQsQ0FBQyxBQXpCRCxDQUFpQyxxQkFBUyxHQXlCekM7SUFFUSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRnJlcXVlbmN5QW1wbGl0dWRlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZnJlcXVlbmN5QW1wbGl0dWRlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFZhbHVlUGFpciB9IGZyb20gXCIuL3ZhbHVlUGFpclwiO1xyXG5cclxuXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIGFtcGxpdHVkZSBhdCBhIGNlcnRhaW4gZnJlcXVlbmN5LlxyXG4gKlxyXG4gKiBAY2xhc3MgRnJlcXVlbmN5QW1wbGl0dWRlXHJcbiAqIEBleHRlbmRzIHtWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+fVxyXG4gKiBAaW1wbGVtZW50cyB7SUZyZXF1ZW5jeUFtcGxpdHVkZX1cclxuICovXHJcbmNsYXNzIEZyZXF1ZW5jeUFtcGxpdHVkZSBleHRlbmRzIFZhbHVlUGFpcjxudW1iZXIsIG51bWJlcj4gaW1wbGVtZW50cyBJRnJlcXVlbmN5QW1wbGl0dWRlIHtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEZyZXF1ZW5jeUFtcGxpdHVkZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhXHJcbiAgICAgKiBAbWVtYmVyb2YgRnJlcXVlbmN5QW1wbGl0dWRlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGY6IG51bWJlciwgYTogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKGYsIGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZigpOiBudW1iZXIge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYSgpOiBudW1iZXIge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUyO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgRnJlcXVlbmN5QW1wbGl0dWRlIH07Il19
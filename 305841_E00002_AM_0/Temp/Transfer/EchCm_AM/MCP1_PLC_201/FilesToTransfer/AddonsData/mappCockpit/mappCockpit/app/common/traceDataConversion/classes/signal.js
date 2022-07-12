define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents a generic signal made of value paris and a name.
     *
     * @class Signal
     * @implements {ISignal}
     */
    var Signal = /** @class */ (function () {
        /**
         * Creates an instance of Signal.
         *
         * @param {string} name
         * @param {Array<IValuePair<number, number>>} items
         * @memberof Signal
         */
        function Signal(name, items) {
            this._name = name;
            this._items = items;
        }
        Object.defineProperty(Signal.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "items", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        return Signal;
    }());
    exports.Signal = Signal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL3NpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTs7Ozs7T0FLRztJQUNIO1FBTUk7Ozs7OztXQU1HO1FBQ0gsZ0JBQVksSUFBWSxFQUFFLEtBQXdDO1lBRTlELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxzQkFBVyx3QkFBSTtpQkFBZjtnQkFFSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx5QkFBSztpQkFBaEI7Z0JBRUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7OztXQUFBO1FBRUwsYUFBQztJQUFELENBQUMsQUE3QkQsSUE2QkM7SUFFUSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWwgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZhbHVlUGFpciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvdmFsdWVQYWlySW50ZXJmYWNlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBnZW5lcmljIHNpZ25hbCBtYWRlIG9mIHZhbHVlIHBhcmlzIGFuZCBhIG5hbWUuXHJcbiAqXHJcbiAqIEBjbGFzcyBTaWduYWxcclxuICogQGltcGxlbWVudHMge0lTaWduYWx9XHJcbiAqL1xyXG5jbGFzcyBTaWduYWwgaW1wbGVtZW50cyBJU2lnbmFsIHtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7ICAgIFxyXG4gICAgcHJvdGVjdGVkIF9pdGVtczogQXJyYXk8SVZhbHVlUGFpcjxudW1iZXIsIG51bWJlcj4+O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJVmFsdWVQYWlyPG51bWJlciwgbnVtYmVyPj59IGl0ZW1zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaXRlbXM6IEFycmF5PElWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+Pikge1xyXG5cclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEFycmF5PElWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IFNpZ25hbCB9OyJdfQ==
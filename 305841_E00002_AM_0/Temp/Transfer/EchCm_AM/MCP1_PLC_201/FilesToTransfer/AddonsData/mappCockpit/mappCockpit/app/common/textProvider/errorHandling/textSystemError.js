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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Specific error that is used for exeption handling in the textformatter
     *
     * @export
     * @class TextSystemError
     * @extends {Error}
     */
    var TextSystemError = /** @class */ (function (_super) {
        __extends(TextSystemError, _super);
        function TextSystemError(message, item) {
            var _this = _super.call(this, message) || this;
            _this._item = item;
            return _this;
        }
        Object.defineProperty(TextSystemError.prototype, "item", {
            get: function () {
                return this._item;
            },
            enumerable: true,
            configurable: true
        });
        return TextSystemError;
    }(Error));
    exports.TextSystemError = TextSystemError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFN5c3RlbUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL2Vycm9ySGFuZGxpbmcvdGV4dFN5c3RlbUVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTs7Ozs7O09BTUc7SUFDSDtRQUFxQyxtQ0FBSztRQUl0Qyx5QkFBbUIsT0FBZSxFQUFFLElBQXlCO1lBQTdELFlBQ0ksa0JBQU0sT0FBTyxDQUFDLFNBRWpCO1lBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O1FBQ3RCLENBQUM7UUFFRCxzQkFBSSxpQ0FBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQzs7O1dBQUE7UUFDTCxzQkFBQztJQUFELENBQUMsQUFaRCxDQUFxQyxLQUFLLEdBWXpDO0lBWlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0U3lzdGVtRXJyb3JJdGVtIH0gZnJvbSBcIi4vdGV4dFN5c3RlbUVycm9ySXRlbVwiO1xyXG5cclxuLyoqXHJcbiAqIFNwZWNpZmljIGVycm9yIHRoYXQgaXMgdXNlZCBmb3IgZXhlcHRpb24gaGFuZGxpbmcgaW4gdGhlIHRleHRmb3JtYXR0ZXJcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgVGV4dFN5c3RlbUVycm9yXHJcbiAqIEBleHRlbmRzIHtFcnJvcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0U3lzdGVtRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2l0ZW06IFRleHRTeXN0ZW1FcnJvckl0ZW07XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgaXRlbTogVGV4dFN5c3RlbUVycm9ySXRlbSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuX2l0ZW0gPSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpdGVtKCk6IFRleHRTeXN0ZW1FcnJvckl0ZW0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtO1xyXG4gICAgfVxyXG59Il19
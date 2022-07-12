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
define(["require", "exports", "./signal"], function (require, exports, signal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents an YT signal.
     *
     * @class YTSignal
     * @extends {Signal}
     */
    var YTSignal = /** @class */ (function (_super) {
        __extends(YTSignal, _super);
        /**
         * Creates an instance of YTSignal.
         *
         * @param {string} name
         * @param {Array<Sample>} items
         * @memberof YTSignal
         */
        function YTSignal(name, items) {
            return _super.call(this, name, items) || this;
        }
        Object.defineProperty(YTSignal.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YTSignal.prototype, "items", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        return YTSignal;
    }(signal_1.Signal));
    exports.YTSignal = YTSignal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXRTaWduYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMveXRTaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFBdUIsNEJBQU07UUFJekI7Ozs7OztXQU1HO1FBQ0gsa0JBQW1CLElBQVksRUFBRSxLQUFvQjttQkFFakQsa0JBQU0sSUFBSSxFQUFFLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBRUQsc0JBQVcsMEJBQUk7aUJBQWY7Z0JBRUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7OztXQUFBO1FBRUQsc0JBQVksMkJBQUs7aUJBQWpCO2dCQUVJLE9BQU8sSUFBSSxDQUFDLE1BQXVCLENBQUM7WUFDeEMsQ0FBQzs7O1dBQUE7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQXpCRCxDQUF1QixlQUFNLEdBeUI1QjtJQUVRLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XHJcbmltcG9ydCB7IFNhbXBsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3R5cGVzL3NhbXBsZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIFlUIHNpZ25hbC5cclxuICpcclxuICogQGNsYXNzIFlUU2lnbmFsXHJcbiAqIEBleHRlbmRzIHtTaWduYWx9XHJcbiAqL1xyXG5jbGFzcyBZVFNpZ25hbCBleHRlbmRzIFNpZ25hbCB7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWVRTaWduYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2FtcGxlPn0gaXRlbXNcclxuICAgICAqIEBtZW1iZXJvZiBZVFNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpdGVtczogQXJyYXk8U2FtcGxlPikge1xyXG5cclxuICAgICAgICBzdXBlcihuYW1lLCBpdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAgZ2V0IGl0ZW1zKCk6IEFycmF5PFNhbXBsZT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMgYXMgQXJyYXk8U2FtcGxlPjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgWVRTaWduYWwgfTsiXX0=
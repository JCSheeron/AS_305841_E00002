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
define(["require", "exports", "../textItem"], function (require, exports, textItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * TextItem needed for the processing of the TextFormatter that includes the information of the recursion cnt
     *
     * @export
     * @class FormatterTextItem
     * @extends {TextItem}
     */
    var FormatterTextItem = /** @class */ (function (_super) {
        __extends(FormatterTextItem, _super);
        function FormatterTextItem(value, errors, recursionCnt) {
            if (value === void 0) { value = ""; }
            if (errors === void 0) { errors = new Array(); }
            if (recursionCnt === void 0) { recursionCnt = 0; }
            var _this = _super.call(this, value, errors) || this;
            _this._recursionCnt = recursionCnt;
            _this._recursionLimitExeeded = _this.getRecursionStatus();
            return _this;
        }
        Object.defineProperty(FormatterTextItem.prototype, "recurisionCnt", {
            get: function () {
                return this._recursionCnt;
            },
            set: function (value) {
                this._recursionCnt = value;
                this._recursionLimitExeeded = this.getRecursionStatus();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormatterTextItem.prototype, "recursionLimitExeeded", {
            /**
             * recieve the information if the recurision cnt is out of valid range (>10)
             *
             * @readonly
             * @type {boolean}
             * @memberof FormatterTextItem
             */
            get: function () {
                return this._recursionLimitExeeded;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * increment the recursion cnt of the textformatter by 1
         *
         * @memberof FormatterTextItem
         */
        FormatterTextItem.prototype.incrementRecurisionCnt = function () {
            this._recursionCnt++;
            this._recursionLimitExeeded = this.getRecursionStatus();
        };
        /**
         * resetset recursion cnt of the textformatter
         *
         * @memberof FormatterTextItem
         */
        FormatterTextItem.prototype.resetRecurisionCnt = function () {
            this._recursionCnt = 0;
            this._recursionLimitExeeded = this.getRecursionStatus();
        };
        /**
         * When the recursionCnt is over 10 then it returns true, false otherwise
         *
         * @private
         * @return {*}  {boolean}
         * @memberof FormatterTextItem
         */
        FormatterTextItem.prototype.getRecursionStatus = function () {
            if (this._recursionCnt < 10) {
                return false;
            }
            return true;
        };
        return FormatterTextItem;
    }(textItem_1.TextItem));
    exports.FormatterTextItem = FormatterTextItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyVGV4dEl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9mb3JtYXR0ZXJUZXh0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7Ozs7OztPQU1HO0lBQ0g7UUFBdUMscUNBQVE7UUFLM0MsMkJBQW1CLEtBQWtCLEVBQUUsTUFBc0UsRUFBRSxZQUF3QjtZQUFwSCxzQkFBQSxFQUFBLFVBQWtCO1lBQUUsdUJBQUEsRUFBQSxhQUEwQyxLQUFLLEVBQXVCO1lBQUUsNkJBQUEsRUFBQSxnQkFBd0I7WUFBdkksWUFDSSxrQkFBTSxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBR3ZCO1lBRkcsS0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7WUFDbEMsS0FBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDOztRQUM1RCxDQUFDO1FBRUQsc0JBQVcsNENBQWE7aUJBQXhCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixDQUFDO2lCQUVELFVBQXlCLEtBQWE7Z0JBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDNUQsQ0FBQzs7O1dBTEE7UUFjRCxzQkFBVyxvREFBcUI7WUFQaEM7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQ3ZDLENBQUM7OztXQUFBO1FBRUQ7Ozs7V0FJRztRQUNJLGtEQUFzQixHQUE3QjtZQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUQsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSw4Q0FBa0IsR0FBekI7WUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDhDQUFrQixHQUExQjtZQUNJLElBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLEVBQUU7Z0JBQ3hCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQWhFRCxDQUF1QyxtQkFBUSxHQWdFOUM7SUFoRVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9ySXRlbSB9IGZyb20gXCIuLi9lcnJvckhhbmRsaW5nL3RleHRTeXN0ZW1FcnJvckl0ZW1cIjtcclxuaW1wb3J0IHsgVGV4dEl0ZW0gfSBmcm9tIFwiLi4vdGV4dEl0ZW1cIjtcclxuXHJcbi8qKlxyXG4gKiBUZXh0SXRlbSBuZWVkZWQgZm9yIHRoZSBwcm9jZXNzaW5nIG9mIHRoZSBUZXh0Rm9ybWF0dGVyIHRoYXQgaW5jbHVkZXMgdGhlIGluZm9ybWF0aW9uIG9mIHRoZSByZWN1cnNpb24gY250XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEZvcm1hdHRlclRleHRJdGVtXHJcbiAqIEBleHRlbmRzIHtUZXh0SXRlbX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtYXR0ZXJUZXh0SXRlbSBleHRlbmRzIFRleHRJdGVtIHtcclxuXHJcbiAgICBwcml2YXRlIF9yZWN1cnNpb25DbnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JlY3Vyc2lvbkxpbWl0RXhlZWRlZDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZyA9IFwiXCIsIGVycm9yczogQXJyYXk8VGV4dFN5c3RlbUVycm9ySXRlbT4gPSAgbmV3IEFycmF5PFRleHRTeXN0ZW1FcnJvckl0ZW0+KCksIHJlY3Vyc2lvbkNudDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHN1cGVyKHZhbHVlLCBlcnJvcnMpO1xyXG4gICAgICAgIHRoaXMuX3JlY3Vyc2lvbkNudCA9IHJlY3Vyc2lvbkNudDtcclxuICAgICAgICB0aGlzLl9yZWN1cnNpb25MaW1pdEV4ZWVkZWQgPSB0aGlzLmdldFJlY3Vyc2lvblN0YXR1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVjdXJpc2lvbkNudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWN1cnNpb25DbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCByZWN1cmlzaW9uQ250KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9yZWN1cnNpb25DbnQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9yZWN1cnNpb25MaW1pdEV4ZWVkZWQgPSB0aGlzLmdldFJlY3Vyc2lvblN0YXR1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVjaWV2ZSB0aGUgaW5mb3JtYXRpb24gaWYgdGhlIHJlY3VyaXNpb24gY250IGlzIG91dCBvZiB2YWxpZCByYW5nZSAoPjEwKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0dGVyVGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByZWN1cnNpb25MaW1pdEV4ZWVkZWQoKTogYm9vbGVhbiB7ICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVjdXJzaW9uTGltaXRFeGVlZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5jcmVtZW50IHRoZSByZWN1cnNpb24gY250IG9mIHRoZSB0ZXh0Zm9ybWF0dGVyIGJ5IDFcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0dGVyVGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGluY3JlbWVudFJlY3VyaXNpb25DbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjdXJzaW9uQ250Kys7XHJcbiAgICAgICAgdGhpcy5fcmVjdXJzaW9uTGltaXRFeGVlZGVkID0gdGhpcy5nZXRSZWN1cnNpb25TdGF0dXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlc2V0c2V0IHJlY3Vyc2lvbiBjbnQgb2YgdGhlIHRleHRmb3JtYXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0dGVyVGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0UmVjdXJpc2lvbkNudCgpIHtcclxuICAgICAgICB0aGlzLl9yZWN1cnNpb25DbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3JlY3Vyc2lvbkxpbWl0RXhlZWRlZCA9IHRoaXMuZ2V0UmVjdXJzaW9uU3RhdHVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRoZSByZWN1cnNpb25DbnQgaXMgb3ZlciAxMCB0aGVuIGl0IHJldHVybnMgdHJ1ZSwgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBGb3JtYXR0ZXJUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFJlY3Vyc2lvblN0YXR1cygpOiBib29sZWFuIHtcclxuICAgICAgICBpZih0aGlzLl9yZWN1cnNpb25DbnQgPCAxMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59Il19
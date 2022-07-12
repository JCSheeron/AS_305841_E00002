define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmFilter = /** @class */ (function () {
        /**
         * Creates an instance of CmFilter
         * @param {string} parameterRef
         * @param {(string|undefined)} parameterValue
         * @param {(Array<string>|undefined)} [parameterValues=undefined]
         * @memberof CmFilter
         */
        function CmFilter(parameterRef, parameterValue, parameterValues) {
            if (parameterValues === void 0) { parameterValues = undefined; }
            this.parameterRef = parameterRef;
            this.parameterValue = parameterValue;
            this.parameterValues = parameterValues;
            this.active = false;
        }
        return CmFilter;
    }());
    exports.CmFilter = CmFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21GaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2NtRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBaUNJOzs7Ozs7V0FNRztRQUNILGtCQUFZLFlBQW9CLEVBQUUsY0FBZ0MsRUFBRSxlQUFvRDtZQUFwRCxnQ0FBQSxFQUFBLDJCQUFvRDtZQUNwSCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUE5Q0QsSUE4Q0M7SUE5Q1ksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ21GaWx0ZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NtRmlsdGVySW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ21GaWx0ZXIgaW1wbGVtZW50cyBJQ21GaWx0ZXJ7XHJcbiAgICAvKipcclxuICAgICAqIEZpbHRlciBhY3RpdmUgb3Igbm90OyBkb24ndCBzaG93IHBhcmFtZXRlciBpZiBmaWx0ZXIgaXMgYWN0aXZlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21GaWx0ZXJcclxuICAgICAqL1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmZXJlbmNlIHRvIHBhcmFtZXRlciBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDbUZpbHRlclxyXG4gICAgICovXHJcbiAgICBwYXJhbWV0ZXJSZWY6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNpbmdsZSBwYXJhbWV0ZXIgdmFsdWUgZm9yIGZpbHRlcmluZ1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21GaWx0ZXJcclxuICAgICAqL1xyXG4gICAgcGFyYW1ldGVyVmFsdWU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNdWx0aXBsZSBwYXJhbWV0ZXIgdmFsdWVzIGZvciBmaWx0ZXJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KEFycmF5PHN0cmluZz58dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDbUZpbHRlclxyXG4gICAgICovXHJcbiAgICBwYXJhbWV0ZXJWYWx1ZXM6IEFycmF5PHN0cmluZz58dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ21GaWx0ZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbWV0ZXJSZWZcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3x1bmRlZmluZWQpfSBwYXJhbWV0ZXJWYWx1ZVxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8c3RyaW5nPnx1bmRlZmluZWQpfSBbcGFyYW1ldGVyVmFsdWVzPXVuZGVmaW5lZF1cclxuICAgICAqIEBtZW1iZXJvZiBDbUZpbHRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJSZWY6IHN0cmluZywgcGFyYW1ldGVyVmFsdWU6IHN0cmluZ3x1bmRlZmluZWQsIHBhcmFtZXRlclZhbHVlczogQXJyYXk8c3RyaW5nPnx1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVyUmVmID0gcGFyYW1ldGVyUmVmO1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVyVmFsdWUgPSBwYXJhbWV0ZXJWYWx1ZTtcclxuICAgICAgICB0aGlzLnBhcmFtZXRlclZhbHVlcyA9IHBhcmFtZXRlclZhbHVlcztcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59Il19
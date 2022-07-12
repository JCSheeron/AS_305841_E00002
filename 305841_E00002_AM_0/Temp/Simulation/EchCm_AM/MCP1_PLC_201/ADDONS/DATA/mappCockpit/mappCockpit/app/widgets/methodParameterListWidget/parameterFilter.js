define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ParameterFilter = /** @class */ (function () {
        function ParameterFilter(parameterRef, parameterValues) {
            if (parameterRef === void 0) { parameterRef = ''; }
            if (parameterValues === void 0) { parameterValues = []; }
            this._parameterRef = parameterRef;
            this._parameterValues = parameterValues;
        }
        Object.defineProperty(ParameterFilter.prototype, "parameterRef", {
            get: function () {
                return this._parameterRef;
            },
            set: function (parameterRef) {
                this._parameterRef = parameterRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParameterFilter.prototype, "parameterValues", {
            get: function () {
                return this._parameterValues;
            },
            set: function (parameterValues) {
                this._parameterValues = parameterValues;
            },
            enumerable: true,
            configurable: true
        });
        return ParameterFilter;
    }());
    exports.ParameterFilter = ParameterFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1ldGVyRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQvcGFyYW1ldGVyRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBT0kseUJBQVksWUFBaUIsRUFBRSxlQUFxQjtZQUF4Qyw2QkFBQSxFQUFBLGlCQUFpQjtZQUFFLGdDQUFBLEVBQUEsb0JBQXFCO1lBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDNUMsQ0FBQztRQUVELHNCQUFJLHlDQUFZO2lCQUloQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUIsQ0FBQztpQkFORCxVQUFpQixZQUFvQjtnQkFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7WUFDdEMsQ0FBQzs7O1dBQUE7UUFNRCxzQkFBSSw0Q0FBZTtpQkFJbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsQ0FBQztpQkFORCxVQUFvQixlQUE4QjtnQkFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtZQUMzQyxDQUFDOzs7V0FBQTtRQUtMLHNCQUFDO0lBQUQsQ0FBQyxBQTNCRCxJQTJCQztJQUVPLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGFyYW1ldGVyRmlsdGVyIHtcclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgcGFyYW1ldGVyIHJlZmVyZW5jZSB0aGF0IGhhbmRsZXMgdGhlIGZpbHRlcmluZ1xyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyUmVmOiBzdHJpbmc7XHJcbiAgICAvLyBIb2xkcyB0aGUgcGFyYW1ldGVyIHJlZmVyZW5jZSB2YWx1ZXMgd2hpY2ggd2lsbCBkaXNhYmxlIHRoZSBmaWx0ZXJpbmdcclxuICAgIHByaXZhdGUgX3BhcmFtZXRlclZhbHVlczogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJSZWYgPSAnJywgcGFyYW1ldGVyVmFsdWVzICA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVyUmVmID0gcGFyYW1ldGVyUmVmO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlclZhbHVlcyA9IHBhcmFtZXRlclZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGFyYW1ldGVyUmVmKHBhcmFtZXRlclJlZjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVyUmVmID0gcGFyYW1ldGVyUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXJhbWV0ZXJSZWYoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVyUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwYXJhbWV0ZXJWYWx1ZXMocGFyYW1ldGVyVmFsdWVzOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVyVmFsdWVzID0gcGFyYW1ldGVyVmFsdWVzXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhcmFtZXRlclZhbHVlcygpOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJWYWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UGFyYW1ldGVyRmlsdGVyfTsiXX0=
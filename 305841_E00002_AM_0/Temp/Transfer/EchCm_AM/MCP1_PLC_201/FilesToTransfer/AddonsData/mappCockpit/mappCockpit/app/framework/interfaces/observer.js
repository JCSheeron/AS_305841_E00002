define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Holds desriptive data for observables
     *
     * @class ObservableInfo
     */
    var Observable = /** @class */ (function () {
        function Observable(object, property) {
            this._object = {};
            this._property = "";
            this._object = object;
            this._property = property;
        }
        Object.defineProperty(Observable.prototype, "object", {
            get: function () {
                return this._object;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Observable.prototype, "property", {
            get: function () {
                return this._property;
            },
            enumerable: true,
            configurable: true
        });
        return Observable;
    }());
    exports.Observable = Observable;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVdBOzs7O09BSUc7SUFDSDtRQWlCSSxvQkFBWSxNQUFVLEVBQUMsUUFBZTtZQWY5QixZQUFPLEdBQU8sRUFBRSxDQUFDO1lBQ2pCLGNBQVMsR0FBVSxFQUFFLENBQUM7WUFlMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDOUIsQ0FBQztRQWRELHNCQUFXLDhCQUFNO2lCQUFqQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFHRCxzQkFBVyxnQ0FBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBU0wsaUJBQUM7SUFBRCxDQUFDLEFBdEJELElBc0JDO0lBRWlCLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgYW4gb2JzZXJ2ZXIgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgSU9ic2VydmVyXHJcbiAqL1xyXG5pbnRlcmZhY2UgSU9ic2VydmVye1xyXG4gICAgb25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzOk9ic2VydmFibGVbXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIb2xkcyBkZXNyaXB0aXZlIGRhdGEgZm9yIG9ic2VydmFibGVzXHJcbiAqXHJcbiAqIEBjbGFzcyBPYnNlcnZhYmxlSW5mb1xyXG4gKi9cclxuY2xhc3MgT2JzZXJ2YWJsZXtcclxuXHJcbiAgICBwcml2YXRlIF9vYmplY3Q6YW55ID0ge307XHJcbiAgICBwcml2YXRlIF9wcm9wZXJ0eTpzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBvYmplY3QoKSA6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgcHJvcGVydHkoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnR5O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmplY3Q6YW55LHByb3BlcnR5OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xyXG4gICAgICAgIHRoaXMuX3Byb3BlcnR5ID0gcHJvcGVydHk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge0lPYnNlcnZlcixPYnNlcnZhYmxlfTsiXX0=
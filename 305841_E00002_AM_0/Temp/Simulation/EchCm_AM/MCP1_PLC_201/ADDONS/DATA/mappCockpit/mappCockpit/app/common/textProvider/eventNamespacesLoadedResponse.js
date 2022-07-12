define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventNamespacesLoadedResponse = /** @class */ (function () {
        function EventNamespacesLoadedResponse() {
            /**
             * List of all found namespaces
             *
             * @private
             * @type {Array<string>}
             * @memberof EventNamespacesLoadedResponse
             */
            this._loadedNamespaces = new Array();
            /**
             * key: not found namepsace
             * value: error message
             * @private
             * @type {Map<string, string>}
             * @memberof EventNamespacesLoadedResponse
             */
            this._errors = new Array();
        }
        Object.defineProperty(EventNamespacesLoadedResponse.prototype, "loadedNamespaces", {
            get: function () {
                return this._loadedNamespaces;
            },
            set: function (value) {
                this._loadedNamespaces = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventNamespacesLoadedResponse.prototype, "errors", {
            get: function () {
                return this._errors;
            },
            set: function (value) {
                this._errors = value;
            },
            enumerable: true,
            configurable: true
        });
        return EventNamespacesLoadedResponse;
    }());
    exports.EventNamespacesLoadedResponse = EventNamespacesLoadedResponse;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnROYW1lc3BhY2VzTG9hZGVkUmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvZXZlbnROYW1lc3BhY2VzTG9hZGVkUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7UUFvQkk7WUFsQkE7Ozs7OztlQU1HO1lBQ0ssc0JBQWlCLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7WUFFL0Q7Ozs7OztlQU1HO1lBQ0ssWUFBTyxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO1FBRS9CLENBQUM7UUFFdkIsc0JBQVcsMkRBQWdCO2lCQUEzQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDO2lCQUVELFVBQTRCLEtBQW9CO2dCQUM1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLENBQUM7OztXQUpBO1FBTUQsc0JBQVcsaURBQU07aUJBQWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO2lCQUVELFVBQWtCLEtBQW9CO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDOzs7V0FKQTtRQU1MLG9DQUFDO0lBQUQsQ0FBQyxBQXRDRCxJQXNDQztJQXRDWSxzRUFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXZlbnROYW1lc3BhY2VzTG9hZGVkUmVzcG9uc2Uge1xyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBhbGwgZm91bmQgbmFtZXNwYWNlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBFdmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9sb2FkZWROYW1lc3BhY2VzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBrZXk6IG5vdCBmb3VuZCBuYW1lcHNhY2VcclxuICAgICAqIHZhbHVlOiBlcnJvciBtZXNzYWdlXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge01hcDxzdHJpbmcsIHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXZlbnROYW1lc3BhY2VzTG9hZGVkUmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZXJyb3JzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxvYWRlZE5hbWVzcGFjZXMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlZE5hbWVzcGFjZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBsb2FkZWROYW1lc3BhY2VzKHZhbHVlOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVkTmFtZXNwYWNlcyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZXJyb3JzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXQgZXJyb3JzKHZhbHVlOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdGhpcy5fZXJyb3JzID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==
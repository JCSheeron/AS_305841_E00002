define(["require", "exports", "../communication/rest/textRestServices"], function (require, exports, textRestServices_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides services to be used from components.
     *
     * @export
     * @class Services
     */
    var Services = /** @class */ (function () {
        function Services() {
        }
        Object.defineProperty(Services, "textSystem", {
            /**
             * Provides Text System services
             *
             * @readonly
             * @static
             * @type {ITextSystem}
             * @memberof Services
             */
            get: function () {
                return textRestServices_1.TextSystemRestServices;
            },
            enumerable: true,
            configurable: true
        });
        return Services;
    }());
    exports.Services = Services;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwU2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL3NlcnZpY2VzL2FwcFNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQWVBLENBQUM7UUFMRyxzQkFBVyxzQkFBVTtZQVJyQjs7Ozs7OztlQU9HO2lCQUNIO2dCQUNJLE9BQU8seUNBQXNCLENBQUM7WUFDbEMsQ0FBQzs7O1dBQUE7UUFHTCxlQUFDO0lBQUQsQ0FBQyxBQWZELElBZUM7SUFmWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRTeXN0ZW1SZXN0U2VydmljZXMgfSBmcm9tIFwiLi4vY29tbXVuaWNhdGlvbi9yZXN0L3RleHRSZXN0U2VydmljZXNcIjtcclxuaW1wb3J0IHsgSVRleHRTeXN0ZW0gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RleHRTeXN0ZW1JbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBzZXJ2aWNlcyB0byBiZSB1c2VkIGZyb20gY29tcG9uZW50cy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgU2VydmljZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlc3tcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIFRleHQgU3lzdGVtIHNlcnZpY2VzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdHlwZSB7SVRleHRTeXN0ZW19XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCB0ZXh0U3lzdGVtKCk6IElUZXh0U3lzdGVtIHtcclxuICAgICAgICByZXR1cm4gVGV4dFN5c3RlbVJlc3RTZXJ2aWNlcztcclxuICAgIH1cclxuICAgIFxyXG5cclxufVxyXG5cclxuIl19
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
     * Exception class for MceConversions (PackageAdapters)
     *
     * @class MceConversionError
     * @extends {Error}
     */
    var MceConversionError = /** @class */ (function (_super) {
        __extends(MceConversionError, _super);
        /**
         * Creates an instance of MceConversionError.
         * Set to private to enforce use of facxtory methods.
         *
         * @param {string} message
         * @memberof MceConversionError
         */
        function MceConversionError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = MceConversionError.errorName;
            return _this;
        }
        /**
         * Typeguard for MceConversionError.
         *
         * @static
         * @param {Error} e
         * @returns {e is MceConversionError}
         * @memberof MceConversionError
         */
        MceConversionError.isMceConversionError = function (e) {
            return e.name === this.errorName;
        };
        /**
         * Creates an instance of MceConverionError.
         * Erroremessage will be generated from type and errorMessageData attributes.
         *
         * @static
         * @param {MceConversionErrorType} type
         * @param {string} [errorMessageData=""]
         * @returns
         * @memberof MceConversionError
         */
        MceConversionError.createErrorByType = function (type, errorMessageData) {
            if (errorMessageData === void 0) { errorMessageData = ""; }
            var errorMessage = type + ": " + errorMessageData;
            return new MceConversionError(errorMessage);
        };
        /**
         * Returns a string representing the error
         *
         * @returns {string}
         * @memberof MceConversionError
         */
        MceConversionError.prototype.toString = function () {
            return this.name + ": " + this.message;
        };
        /**
         * Name for instances of the MceConversionError class.
         *
         * @private
         * @static
         * @memberof MceConversionError
         */
        MceConversionError.errorName = "MCE Conversion Error";
        return MceConversionError;
    }(Error));
    exports.MceConversionError = MceConversionError;
    /**
     * Contains the Error type supported by the MceConversionError
     *
     * @enum {number}
     */
    var MceConversionErrorType;
    (function (MceConversionErrorType) {
        MceConversionErrorType["MISSING_DATA"] = "Data is missing";
        MceConversionErrorType["UNSUPPORTED_VERSION"] = "Unsupported version";
        MceConversionErrorType["UNSUPPORTED_TYPE"] = "Unsupported type";
    })(MceConversionErrorType || (MceConversionErrorType = {}));
    exports.MceConversionErrorType = MceConversionErrorType;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNlQ29udmVyc2lvbkVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWNlQ29udmVyc2lvbkVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTs7Ozs7T0FLRztJQUNIO1FBQWlDLHNDQUFLO1FBR2xDOzs7Ozs7V0FNRztRQUNILDRCQUFvQixPQUFlO1lBQW5DLFlBRUksa0JBQU0sT0FBTyxDQUFDLFNBRWpCO1lBREcsS0FBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7O1FBQzdDLENBQUM7UUFZRDs7Ozs7OztXQU9HO1FBQ1csdUNBQW9CLEdBQWxDLFVBQW1DLENBQVE7WUFDdkMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNXLG9DQUFpQixHQUEvQixVQUFnQyxJQUE0QixFQUFFLGdCQUE2QjtZQUE3QixpQ0FBQSxFQUFBLHFCQUE2QjtZQUV2RixJQUFJLFlBQVksR0FBTSxJQUFJLFVBQUssZ0JBQWtCLENBQUM7WUFFbEQsT0FBTyxJQUFJLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFHRDs7Ozs7V0FLRztRQUNJLHFDQUFRLEdBQWY7WUFDSSxPQUFVLElBQUksQ0FBQyxJQUFJLFVBQUssSUFBSSxDQUFDLE9BQVMsQ0FBQztRQUMzQyxDQUFDO1FBaEREOzs7Ozs7V0FNRztRQUNxQiw0QkFBUyxHQUFHLHNCQUFzQixDQUFDO1FBMEMvRCx5QkFBQztLQUFBLEFBakVELENBQWlDLEtBQUssR0FpRXJDO0lBYU8sZ0RBQWtCO0lBWDFCOzs7O09BSUc7SUFDSCxJQUFLLHNCQUlKO0lBSkQsV0FBSyxzQkFBc0I7UUFDdkIsMERBQWdDLENBQUE7UUFDaEMscUVBQTJDLENBQUE7UUFDM0MsK0RBQXFDLENBQUE7SUFDekMsQ0FBQyxFQUpJLHNCQUFzQixLQUF0QixzQkFBc0IsUUFJMUI7SUFFMkIsd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKipcclxuICogRXhjZXB0aW9uIGNsYXNzIGZvciBNY2VDb252ZXJzaW9ucyAoUGFja2FnZUFkYXB0ZXJzKVxyXG4gKlxyXG4gKiBAY2xhc3MgTWNlQ29udmVyc2lvbkVycm9yXHJcbiAqIEBleHRlbmRzIHtFcnJvcn1cclxuICovXHJcbmNsYXNzIE1jZUNvbnZlcnNpb25FcnJvciBleHRlbmRzIEVycm9ye1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWNlQ29udmVyc2lvbkVycm9yLlxyXG4gICAgICogU2V0IHRvIHByaXZhdGUgdG8gZW5mb3JjZSB1c2Ugb2YgZmFjeHRvcnkgbWV0aG9kcy5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcclxuICAgICAqIEBtZW1iZXJvZiBNY2VDb252ZXJzaW9uRXJyb3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBNY2VDb252ZXJzaW9uRXJyb3IuZXJyb3JOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmFtZSBmb3IgaW5zdGFuY2VzIG9mIHRoZSBNY2VDb252ZXJzaW9uRXJyb3IgY2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBNY2VDb252ZXJzaW9uRXJyb3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZXJyb3JOYW1lID0gXCJNQ0UgQ29udmVyc2lvbiBFcnJvclwiO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFR5cGVndWFyZCBmb3IgTWNlQ29udmVyc2lvbkVycm9yLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVcclxuICAgICAqIEByZXR1cm5zIHtlIGlzIE1jZUNvbnZlcnNpb25FcnJvcn1cclxuICAgICAqIEBtZW1iZXJvZiBNY2VDb252ZXJzaW9uRXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc01jZUNvbnZlcnNpb25FcnJvcihlOiBFcnJvcik6IGUgaXMgTWNlQ29udmVyc2lvbkVycm9yIHtcclxuICAgICAgICByZXR1cm4gZS5uYW1lID09PSB0aGlzLmVycm9yTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWNlQ29udmVyaW9uRXJyb3IuXHJcbiAgICAgKiBFcnJvcmVtZXNzYWdlIHdpbGwgYmUgZ2VuZXJhdGVkIGZyb20gdHlwZSBhbmQgZXJyb3JNZXNzYWdlRGF0YSBhdHRyaWJ1dGVzLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWNlQ29udmVyc2lvbkVycm9yVHlwZX0gdHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtlcnJvck1lc3NhZ2VEYXRhPVwiXCJdXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1jZUNvbnZlcnNpb25FcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUVycm9yQnlUeXBlKHR5cGU6IE1jZUNvbnZlcnNpb25FcnJvclR5cGUsIGVycm9yTWVzc2FnZURhdGE6IHN0cmluZyA9IFwiXCIpIHtcclxuXHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGAke3R5cGV9OiAke2Vycm9yTWVzc2FnZURhdGF9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNY2VDb252ZXJzaW9uRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXJyb3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1jZUNvbnZlcnNpb25FcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfTogJHt0aGlzLm1lc3NhZ2V9YDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5zIHRoZSBFcnJvciB0eXBlIHN1cHBvcnRlZCBieSB0aGUgTWNlQ29udmVyc2lvbkVycm9yXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIE1jZUNvbnZlcnNpb25FcnJvclR5cGUge1xyXG4gICAgTUlTU0lOR19EQVRBID0gXCJEYXRhIGlzIG1pc3NpbmdcIixcclxuICAgIFVOU1VQUE9SVEVEX1ZFUlNJT04gPSBcIlVuc3VwcG9ydGVkIHZlcnNpb25cIixcclxuICAgIFVOU1VQUE9SVEVEX1RZUEUgPSBcIlVuc3VwcG9ydGVkIHR5cGVcIlxyXG59XHJcblxyXG5leHBvcnR7IE1jZUNvbnZlcnNpb25FcnJvciwgTWNlQ29udmVyc2lvbkVycm9yVHlwZSB9Il19
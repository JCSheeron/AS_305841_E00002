define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class enables simpler formatting by remembering
     * the seperating the sign information from argument.
     *
     * @export
     * @class SignHolder
     */
    var SignHolder = /** @class */ (function () {
        /**
         * Creates an instance of SignHolder.
         * @memberof SignHolder
         */
        function SignHolder() {
            this._sign = "";
        }
        /**
         * Removes the sign from the input argument and remember it in _sign
         *
         * @param {number} argument
         * @return {number}
         * @memberof SignHolder
         */
        SignHolder.prototype.getUnsigendArgument = function (argument) {
            if (argument > 0) {
                this._sign = "+";
            }
            else if (argument == 0) {
                this._sign = " ";
            }
            else if (argument < 0) {
                this._sign = "-";
                // get positive value from negative
                argument = Math.abs(argument);
            }
            else {
                this._sign = "";
            }
            return argument;
        };
        /**
         * Get the sign from the current processed argument
         *
         * @return {*}  {string}
         * @memberof SignHolder
         */
        SignHolder.prototype.getSign = function () {
            return this._sign;
        };
        return SignHolder;
    }());
    exports.SignHolder = SignHolder;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbkhvbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlci9zaWduSG9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7Ozs7T0FNRztJQUNIO1FBSUk7OztXQUdHO1FBQ0g7WUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksd0NBQW1CLEdBQTFCLFVBQTJCLFFBQWdCO1lBRXZDLElBQUcsUUFBUSxHQUFHLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzthQUNwQjtpQkFDSSxJQUFHLFFBQVEsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2FBQ3BCO2lCQUNJLElBQUcsUUFBUSxHQUFHLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ2pCLG1DQUFtQztnQkFDbkMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakM7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDbkI7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw0QkFBTyxHQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFFTCxpQkFBQztJQUFELENBQUMsQUFqREQsSUFpREM7SUFqRFksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhpcyBjbGFzcyBlbmFibGVzIHNpbXBsZXIgZm9ybWF0dGluZyBieSByZW1lbWJlcmluZyBcclxuICogdGhlIHNlcGVyYXRpbmcgdGhlIHNpZ24gaW5mb3JtYXRpb24gZnJvbSBhcmd1bWVudC5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgU2lnbkhvbGRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNpZ25Ib2xkZXIge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9zaWduOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNpZ25Ib2xkZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbkhvbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fc2lnbiA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBzaWduIGZyb20gdGhlIGlucHV0IGFyZ3VtZW50IGFuZCByZW1lbWJlciBpdCBpbiBfc2lnblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhcmd1bWVudFxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBcclxuICAgICAqIEBtZW1iZXJvZiBTaWduSG9sZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRVbnNpZ2VuZEFyZ3VtZW50KGFyZ3VtZW50OiBudW1iZXIpIDogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgaWYoYXJndW1lbnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ24gPSBcIitcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhcmd1bWVudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ24gPSBcIiBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhcmd1bWVudCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbiA9IFwiLVwiO1xyXG4gICAgICAgICAgICAvLyBnZXQgcG9zaXRpdmUgdmFsdWUgZnJvbSBuZWdhdGl2ZVxyXG4gICAgICAgICAgICBhcmd1bWVudCA9IE1hdGguYWJzKGFyZ3VtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ24gPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYXJndW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHNpZ24gZnJvbSB0aGUgY3VycmVudCBwcm9jZXNzZWQgYXJndW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduSG9sZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTaWduKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ247XHJcbiAgICB9XHJcblxyXG59Il19
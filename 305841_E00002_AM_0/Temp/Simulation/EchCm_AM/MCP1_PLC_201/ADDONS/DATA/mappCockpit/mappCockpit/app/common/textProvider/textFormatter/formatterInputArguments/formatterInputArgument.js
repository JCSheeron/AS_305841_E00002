define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The basic input argument for the formatter,
     * which need to be extended by the specific input arguments
     *
     * @export
     * @class FormatterInputArgument
     * @implements {IFormatterInputArgument}
     */
    var FormatterInputArgument = /** @class */ (function () {
        function FormatterInputArgument(argument, inputType, engineeringUnit) {
            this.argument = argument;
            this.inputType = inputType;
            if (engineeringUnit !== undefined) {
                this.engineeringUnit = " " + engineeringUnit;
            }
            else {
                this.engineeringUnit = "";
            }
        }
        return FormatterInputArgument;
    }());
    exports.FormatterInputArgument = FormatterInputArgument;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVySW5wdXRBcmd1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7Ozs7Ozs7T0FPRztJQUNIO1FBS0ksZ0NBQXNCLFFBQXlCLEVBQUUsU0FBaUMsRUFBRSxlQUF3QjtZQUN4RyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUUzQixJQUFHLGVBQWUsS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxHQUFHLGVBQWUsQ0FBQzthQUNoRDtpQkFDSTtnQkFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQzthQUM3QjtRQUNMLENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUFoQkQsSUFnQkM7SUFoQlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUZvcm1hdHRlcklucHV0QXJndW1lbnQsIEZvcm1hdHRlckFyZ3VtZW50VHlwZXMgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlL2Zvcm1hdHRlcklucHV0QXJndW1lbnRJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgYmFzaWMgaW5wdXQgYXJndW1lbnQgZm9yIHRoZSBmb3JtYXR0ZXIsXHJcbiAqIHdoaWNoIG5lZWQgdG8gYmUgZXh0ZW5kZWQgYnkgdGhlIHNwZWNpZmljIGlucHV0IGFyZ3VtZW50c1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50XHJcbiAqIEBpbXBsZW1lbnRzIHtJRm9ybWF0dGVySW5wdXRBcmd1bWVudH1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IGltcGxlbWVudHMgSUZvcm1hdHRlcklucHV0QXJndW1lbnQge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGFyZ3VtZW50OiBzdHJpbmcgfCBudW1iZXI7IFxyXG4gICAgcHVibGljIHJlYWRvbmx5IGlucHV0VHlwZTogRm9ybWF0dGVyQXJndW1lbnRUeXBlcztcclxuICAgIHB1YmxpYyByZWFkb25seSBlbmdpbmVlcmluZ1VuaXQ6IHN0cmluZztcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoYXJndW1lbnQ6IHN0cmluZyB8IG51bWJlciwgaW5wdXRUeXBlOiBGb3JtYXR0ZXJBcmd1bWVudFR5cGVzLCBlbmdpbmVlcmluZ1VuaXQ/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZW5naW5lZXJpbmdVbml0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmVlcmluZ1VuaXQgPSBcIiBcIiArIGVuZ2luZWVyaW5nVW5pdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5naW5lZXJpbmdVbml0ID0gXCJcIjsgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
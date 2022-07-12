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
define(["require", "exports", "./formatterInputArgument", "../../interface/formatterInputArgumentInterface"], function (require, exports, formatterInputArgument_1, formatterInputArgumentInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Takes a string as input argument
     *
     * @export
     * @class FormatterInputArgumentString
     * @extends {FormatterInputArgument}
     */
    var FormatterInputArgumentString = /** @class */ (function (_super) {
        __extends(FormatterInputArgumentString, _super);
        function FormatterInputArgumentString(argument) {
            return _super.call(this, argument, formatterInputArgumentInterface_1.FormatterArgumentTypes.String) || this;
        }
        return FormatterInputArgumentString;
    }(formatterInputArgument_1.FormatterInputArgument));
    exports.FormatterInputArgumentString = FormatterInputArgumentString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVySW5wdXRBcmd1bWVudFN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7Ozs7T0FNRztJQUNIO1FBQWtELGdEQUFzQjtRQUNwRSxzQ0FBWSxRQUFnQjttQkFDeEIsa0JBQU0sUUFBUSxFQUFFLHdEQUFzQixDQUFDLE1BQU0sQ0FBQztRQUNsRCxDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBSkQsQ0FBa0QsK0NBQXNCLEdBSXZFO0lBSlksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWF0dGVySW5wdXRBcmd1bWVudCB9IGZyb20gXCIuL2Zvcm1hdHRlcklucHV0QXJndW1lbnRcIjtcclxuaW1wb3J0IHsgRm9ybWF0dGVyQXJndW1lbnRUeXBlcyB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2UvZm9ybWF0dGVySW5wdXRBcmd1bWVudEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIGEgc3RyaW5nIGFzIGlucHV0IGFyZ3VtZW50XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmdcclxuICogQGV4dGVuZHMge0Zvcm1hdHRlcklucHV0QXJndW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybWF0dGVySW5wdXRBcmd1bWVudFN0cmluZyBleHRlbmRzIEZvcm1hdHRlcklucHV0QXJndW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoYXJndW1lbnQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGFyZ3VtZW50LCBGb3JtYXR0ZXJBcmd1bWVudFR5cGVzLlN0cmluZyk7XHJcbiAgICB9XHJcbn0iXX0=
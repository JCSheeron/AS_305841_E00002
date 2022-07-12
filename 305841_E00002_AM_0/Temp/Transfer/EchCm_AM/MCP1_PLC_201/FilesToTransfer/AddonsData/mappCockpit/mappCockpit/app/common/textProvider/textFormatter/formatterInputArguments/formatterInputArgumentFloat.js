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
     * Takes floating numbers as input argument with the possibility to declare an enginieering unit
     *
     * @export
     * @class FormatterInputArgumentFloat
     * @extends {FormatterInputArgument}
     */
    var FormatterInputArgumentFloat = /** @class */ (function (_super) {
        __extends(FormatterInputArgumentFloat, _super);
        function FormatterInputArgumentFloat(argument, engineeringUnit) {
            return _super.call(this, argument, formatterInputArgumentInterface_1.FormatterArgumentTypes.Float, engineeringUnit) || this;
        }
        return FormatterInputArgumentFloat;
    }(formatterInputArgument_1.FormatterInputArgument));
    exports.FormatterInputArgumentFloat = FormatterInputArgumentFloat;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVySW5wdXRBcmd1bWVudEZsb2F0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvZm9ybWF0dGVySW5wdXRBcmd1bWVudHMvZm9ybWF0dGVySW5wdXRBcmd1bWVudEZsb2F0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTs7Ozs7O09BTUc7SUFDSDtRQUFpRCwrQ0FBc0I7UUFDbkUscUNBQVksUUFBZ0IsRUFBRSxlQUF3QjttQkFDbEQsa0JBQU0sUUFBUSxFQUFFLHdEQUFzQixDQUFDLEtBQUssRUFBRSxlQUFlLENBQUM7UUFDbEUsQ0FBQztRQUNMLGtDQUFDO0lBQUQsQ0FBQyxBQUpELENBQWlELCtDQUFzQixHQUl0RTtJQUpZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnQgfSBmcm9tIFwiLi9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50XCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlckFyZ3VtZW50VHlwZXMgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlL2Zvcm1hdHRlcklucHV0QXJndW1lbnRJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBmbG9hdGluZyBudW1iZXJzIGFzIGlucHV0IGFyZ3VtZW50IHdpdGggdGhlIHBvc3NpYmlsaXR5IHRvIGRlY2xhcmUgYW4gZW5naW5pZWVyaW5nIHVuaXRcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgRm9ybWF0dGVySW5wdXRBcmd1bWVudEZsb2F0XHJcbiAqIEBleHRlbmRzIHtGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50fVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1hdHRlcklucHV0QXJndW1lbnRGbG9hdCBleHRlbmRzIEZvcm1hdHRlcklucHV0QXJndW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoYXJndW1lbnQ6IG51bWJlciwgZW5naW5lZXJpbmdVbml0Pzogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoYXJndW1lbnQsIEZvcm1hdHRlckFyZ3VtZW50VHlwZXMuRmxvYXQsIGVuZ2luZWVyaW5nVW5pdCk7XHJcbiAgICB9XHJcbn0iXX0=
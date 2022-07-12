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
     * Takes integer numbers as input argument with the possibility to declare an enginieering unit
     * If the passed integer is no safe Integer NaN gets stored instead
     *
     * @export
     * @class FormatterInputArgumentInt
     * @extends {FormatterInputArgument}
     */
    var FormatterInputArgumentInt = /** @class */ (function (_super) {
        __extends(FormatterInputArgumentInt, _super);
        function FormatterInputArgumentInt(argument, engineeringUnit) {
            var _this = this;
            if (!Number.isSafeInteger(argument)) {
                argument = NaN;
            }
            _this = _super.call(this, argument, formatterInputArgumentInterface_1.FormatterArgumentTypes.Integer, engineeringUnit) || this;
            return _this;
        }
        return FormatterInputArgumentInt;
    }(formatterInputArgument_1.FormatterInputArgument));
    exports.FormatterInputArgumentInt = FormatterInputArgumentInt;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVySW5wdXRBcmd1bWVudEludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRJbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7Ozs7O09BT0c7SUFDSDtRQUErQyw2Q0FBc0I7UUFDakUsbUNBQVksUUFBZ0IsRUFBRSxlQUF3QjtZQUF0RCxpQkFLQztZQUpHLElBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNoQyxRQUFRLEdBQUcsR0FBRyxDQUFDO2FBQ2xCO1lBQ0QsUUFBQSxrQkFBTSxRQUFRLEVBQUUsd0RBQXNCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxTQUFDOztRQUNyRSxDQUFDO1FBQ0wsZ0NBQUM7SUFBRCxDQUFDLEFBUEQsQ0FBK0MsK0NBQXNCLEdBT3BFO0lBUFksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWF0dGVySW5wdXRBcmd1bWVudCB9IGZyb20gXCIuL2Zvcm1hdHRlcklucHV0QXJndW1lbnRcIjtcclxuaW1wb3J0IHsgRm9ybWF0dGVyQXJndW1lbnRUeXBlcyB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2UvZm9ybWF0dGVySW5wdXRBcmd1bWVudEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIGludGVnZXIgbnVtYmVycyBhcyBpbnB1dCBhcmd1bWVudCB3aXRoIHRoZSBwb3NzaWJpbGl0eSB0byBkZWNsYXJlIGFuIGVuZ2luaWVlcmluZyB1bml0XHJcbiAqIElmIHRoZSBwYXNzZWQgaW50ZWdlciBpcyBubyBzYWZlIEludGVnZXIgTmFOIGdldHMgc3RvcmVkIGluc3RlYWRcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgRm9ybWF0dGVySW5wdXRBcmd1bWVudEludFxyXG4gKiBAZXh0ZW5kcyB7Rm9ybWF0dGVySW5wdXRBcmd1bWVudH1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50SW50IGV4dGVuZHMgRm9ybWF0dGVySW5wdXRBcmd1bWVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihhcmd1bWVudDogbnVtYmVyLCBlbmdpbmVlcmluZ1VuaXQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZighTnVtYmVyLmlzU2FmZUludGVnZXIoYXJndW1lbnQpKSB7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50ID0gTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlcihhcmd1bWVudCwgRm9ybWF0dGVyQXJndW1lbnRUeXBlcy5JbnRlZ2VyLCBlbmdpbmVlcmluZ1VuaXQpO1xyXG4gICAgfVxyXG59Il19
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
define(["require", "exports", "../../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSelectionChanged = /** @class */ (function (_super) {
        __extends(EventSelectionChanged, _super);
        function EventSelectionChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSelectionChanged;
    }(events_1.TypedEvent));
    ;
    /**
     * implements a type editor base class for parameters to be used within tree grid cells.
     *
     * @class TreeGridParameterTypeEditorBase
     */
    var TreeGridParameterTypeEditorBase = /** @class */ (function () {
        function TreeGridParameterTypeEditorBase() {
            this.eventSelectionChanged = new EventSelectionChanged();
        }
        /**
         * gets a html fragment for specifying the input template
         *
         * @returns {*}
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.getEditInputTemplate = function () {
            return "<input>";
        };
        /**
         * Returns the cell value after editing (depending on parameter data type)
         *
         * @param {*} editingParameter
         * @param {*} args
         * @returns
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.endCellEdit = function (args) {
            if (args[0].classList.contains("e-dropdownlist")) {
                args.ejDropDownList("hidePopup"); // BUGFIX to hide dropdownlist after setting new value with keys(instead of simple mouse click)
                var value = args.ejDropDownList("getValue");
            }
            else if (args[0].classList.contains("e-combobox")) {
                args.ejComboBox("hidePopup"); // BUGFIX to avoid the jumping of the combobox to the top left corner in case of mouse wheel scroll
                var value = args.ejComboBox("value");
            }
            else if (args[0].classList.contains("e-maskedit")) {
                var value = args.ejMaskEdit("get_StrippedValue");
            }
            else if (args[0].classList.contains("e-colorpicker")) {
                var value = args.ejColorPicker("getValue");
            }
            else if (args[0].classList.contains("e-numerictextbox")) {
                var value = args.ejNumericTextbox("getValue");
            }
            if (value == undefined) {
                value = "";
            }
            return value;
        };
        /**
         * Shows the needed edit cell when in edit mode (depending on parameter data type, e.g. numeric text box, color picker, dropdown, ...)
         *
         * @param {*} args
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.beginCellEdit = function (args, currentValue, cellInfo) {
            var _a = this.getEditCellSize(args), editCellWidth = _a.editCellWidth, editCellHeight = _a.editCellHeight;
            if (cellInfo.values != undefined) {
                if (cellInfo.onlyValuesFromListAreAllowed == false) {
                    this.initComboBox(args, currentValue, cellInfo.values, editCellWidth, editCellHeight);
                }
                else {
                    this.initDropDownList(args, currentValue, cellInfo.values, editCellWidth, editCellHeight);
                }
            }
            else if (cellInfo.dataTypeName != undefined) {
                if (this.isColorDataType(cellInfo.dataTypeName) == true) {
                    this.initColorPicker(args, currentValue);
                }
                else if (this.isStringDataType(cellInfo.dataTypeName) == true) {
                    if (args.rowdata.calculationData != undefined && args.rowdata.calculationData.valueConverter != undefined) {
                        currentValue = args.rowdata.getRawValue();
                    }
                    this.initTextBox(args, editCellWidth, editCellHeight, currentValue);
                }
                else {
                    this.initNumericBox(args, currentValue, editCellWidth, editCellHeight, cellInfo.dataTypeName, cellInfo.minValue, cellInfo.maxValue);
                }
            }
            else {
                // Default show text input
                this.initTextBox(args, editCellWidth, editCellHeight, currentValue);
            }
        };
        /**
         * Is color datatype (e.g. color)
         *
         * @private
         * @param {string} dataTypeName
         * @returns {boolean}
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.isColorDataType = function (dataTypeName) {
            if (dataTypeName == "Color") {
                return true;
            }
            return false;
        };
        /**
         * Is string datatype (e.g. String)
         *
         * @private
         * @param {string} dataTypeName
         * @returns {boolean}
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.isStringDataType = function (dataTypeName) {
            if (dataTypeName == "String") {
                return true;
            }
            return false;
        };
        /**
         * Is integer datatype (e.g. Int16, UInt32, ...)
         *
         * @private
         * @param {string} dataTypeName
         * @returns {boolean}
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.isIntegerDataType = function (dataTypeName) {
            if (dataTypeName == "Int16" || dataTypeName == "UInt16" ||
                dataTypeName == "Int32" || dataTypeName == "UInt32" ||
                dataTypeName == "Int64" || dataTypeName == "UInt64") {
                return true;
            }
            return false;
        };
        /**
         * Is unsigned integer datatype (e.g. UInt16, UInt32, ...)
         *
         * @private
         * @param {string} dataTypeName
         * @returns {boolean}
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.isUnsignedIntegerDataType = function (dataTypeName) {
            if (dataTypeName == "UInt16" ||
                dataTypeName == "UInt32" ||
                dataTypeName == "UInt64") {
                return true;
            }
            return false;
        };
        /**
         * Create ComboBox with edit support
         *
         * @private
         * @param {*} args
         * @param {string} currentValue
         * @param {*} values
         * @param {*} cellWidth
         * @param {*} cellHeight
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.initComboBox = function (args, currentValue, values, cellWidth, cellHeight) {
            var _this = this;
            args.element.ejComboBox({
                dataSource: values,
                text: currentValue,
                width: cellWidth,
                height: cellHeight,
                fields: { text: "displayValue", value: "value" },
                select: function (args) {
                    _this.eventSelectionChanged.raise(null, args);
                }
            });
        };
        /**
         * Create DropDownList (no edit support)
         *
         * @private
         * @param {*} args
         * @param {string} currentValue
         * @param {*} values
         * @param {*} cellWidth
         * @param {*} cellHeight
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.initDropDownList = function (args, currentValue, values, cellWidth, cellHeight) {
            var _this = this;
            args.element.ejDropDownList({
                dataSource: values,
                text: currentValue,
                width: cellWidth,
                height: cellHeight,
                popupHeight: "50%",
                fields: { text: "displayValue", value: "value" },
                select: function (args) {
                    _this.eventSelectionChanged.raise(null, args);
                }
            });
        };
        /**
         * Create TextBox
         *
         * @private
         * @param {*} args
         * @param {*} cellWidth
         * @param {*} cellHeight
         * @param {*} cellValue
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.initTextBox = function (args, cellWidth, cellHeight, cellValue) {
            args.element.ejMaskEdit({
                width: cellWidth,
                height: cellHeight,
                value: cellValue,
            });
        };
        /**
         * Create ColorPiccker
         *
         * @private
         * @param {*} args
         * @param {string} currentValue
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.initColorPicker = function (args, currentValue) {
            args.element.ejColorPicker({
                value: currentValue,
                modelType: "palette",
            });
        };
        /**
         * Create NumericTextbox
         *
         * @private
         * @param {*} args
         * @param {string} currentValue
         * @param {*} cellWidth
         * @param {*} cellHeight
         * @param {boolean} [decimalSupport=false]
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.initNumericBox = function (args, currentValue, cellWidth, cellHeight, dataTypeName, minValue, maxValue) {
            if (minValue === void 0) { minValue = undefined; }
            if (maxValue === void 0) { maxValue = undefined; }
            var decimalSupport = !this.isIntegerDataType(dataTypeName);
            var isUnsignedType = this.isUnsignedIntegerDataType(dataTypeName);
            var decimalPlaces = 0;
            if (decimalSupport == true) {
                decimalPlaces = -1;
            }
            var minVal = minValue;
            if (minValue == undefined) {
                if (isUnsignedType == true) {
                    minVal = 0; // Limit to 0 if unsigned datatype
                }
                else {
                    minVal = -(Number.MAX_VALUE);
                }
            }
            var maxVal = maxValue;
            if (maxValue == undefined) {
                maxVal = Number.MAX_VALUE;
            }
            args.element.ejNumericTextbox({
                value: currentValue,
                width: cellWidth,
                height: cellHeight,
                showRoundedCorner: true,
                showSpinButton: false,
                decimalPlaces: decimalPlaces,
                minValue: minVal,
                maxValue: maxVal,
            });
        };
        /**
         * determines the edit cell size
         *
         * @param {*} args
         * @returns
         * @memberof TreeGridParameterTypeEditorBase
         */
        TreeGridParameterTypeEditorBase.prototype.getEditCellSize = function (args) {
            var editCellWidth = args.column.width - 6;
            var editCellHeight = 23; // default cell height
            var otherElement = args.element[0].parentElement.parentElement;
            if (otherElement != undefined) {
                // set cell height from parent element if found
                editCellHeight = otherElement.clientHeight - 4;
            }
            return { editCellWidth: editCellWidth, editCellHeight: editCellHeight };
        };
        return TreeGridParameterTypeEditorBase;
    }());
    exports.TreeGridParameterTypeEditorBase = TreeGridParameterTypeEditorBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBb0MseUNBQW9CO1FBQXhEOztRQUEwRCxDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQTNELENBQW9DLG1CQUFVLEdBQWE7SUFBQSxDQUFDO0lBRTVEOzs7O09BSUc7SUFDSDtRQUFBO1lBRUksMEJBQXFCLEdBQTBCLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQWdTL0UsQ0FBQztRQTlSRzs7Ozs7V0FLRztRQUNILDhEQUFvQixHQUFwQjtZQUNJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gscURBQVcsR0FBWCxVQUFZLElBQVM7WUFDakIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsK0ZBQStGO2dCQUNqSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQy9DO2lCQUNJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxtR0FBbUc7Z0JBQ2pJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEM7aUJBQ0ksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEs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S0FBSyxHQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7WUFDL0MsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQy9ELElBQUcsWUFBWSxJQUFJLFNBQVMsRUFBQztnQkFDekIsK0NBQStDO2dCQUMvQyxjQUFjLEdBQUcsWUFBWSxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUM7YUFDaEQ7WUFDRCxPQUFPLEVBQUUsYUFBYSxlQUFBLEVBQUUsY0FBYyxnQkFBQSxFQUFFLENBQUM7UUFDN0MsQ0FBQztRQUNMLHNDQUFDO0lBQUQsQ0FBQyxBQWxTRCxJQWtTQztJQWxTWSwwRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jZWxsSW5mb0ludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTZWxlY3Rpb25DaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCB7fT57IH07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIHR5cGUgZWRpdG9yIGJhc2UgY2xhc3MgZm9yIHBhcmFtZXRlcnMgdG8gYmUgdXNlZCB3aXRoaW4gdHJlZSBncmlkIGNlbGxzLlxyXG4gKlxyXG4gKiBAY2xhc3MgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2V7XHJcbiAgICBcclxuICAgIGV2ZW50U2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRTZWxlY3Rpb25DaGFuZ2VkID0gbmV3IEV2ZW50U2VsZWN0aW9uQ2hhbmdlZCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIGh0bWwgZnJhZ21lbnQgZm9yIHNwZWNpZnlpbmcgdGhlIGlucHV0IHRlbXBsYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBnZXRFZGl0SW5wdXRUZW1wbGF0ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBcIjxpbnB1dD5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNlbGwgdmFsdWUgYWZ0ZXIgZWRpdGluZyAoZGVwZW5kaW5nIG9uIHBhcmFtZXRlciBkYXRhIHR5cGUpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBlZGl0aW5nUGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBlbmRDZWxsRWRpdChhcmdzOiBhbnkpIHtcclxuICAgICAgICBpZiAoYXJnc1swXS5jbGFzc0xpc3QuY29udGFpbnMoXCJlLWRyb3Bkb3dubGlzdFwiKSkge1xyXG4gICAgICAgICAgICBhcmdzLmVqRHJvcERvd25MaXN0KFwiaGlkZVBvcHVwXCIpOyAvLyBCVUdGSVggdG8gaGlkZSBkcm9wZG93bmxpc3QgYWZ0ZXIgc2V0dGluZyBuZXcgdmFsdWUgd2l0aCBrZXlzKGluc3RlYWQgb2Ygc2ltcGxlIG1vdXNlIGNsaWNrKVxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhcmdzLmVqRHJvcERvd25MaXN0KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ3NbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZS1jb21ib2JveFwiKSkge1xyXG4gICAgICAgICAgICBhcmdzLmVqQ29tYm9Cb3goXCJoaWRlUG9wdXBcIik7IC8vIEJVR0ZJWCB0byBhdm9pZCB0aGUganVtcGluZyBvZiB0aGUgY29tYm9ib3ggdG8gdGhlIHRvcCBsZWZ0IGNvcm5lciBpbiBjYXNlIG9mIG1vdXNlIHdoZWVsIHNjcm9sbFxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhcmdzLmVqQ29tYm9Cb3goXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJnc1swXS5jbGFzc0xpc3QuY29udGFpbnMoXCJlLW1hc2tlZGl0XCIpKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGFyZ3MuZWpNYXNrRWRpdChcImdldF9TdHJpcHBlZFZhbHVlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3NbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZS1jb2xvcnBpY2tlclwiKSl7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGFyZ3MuZWpDb2xvclBpY2tlcihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3NbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZS1udW1lcmljdGV4dGJveFwiKSl7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGFyZ3MuZWpOdW1lcmljVGV4dGJveChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih2YWx1ZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIHRoZSBuZWVkZWQgZWRpdCBjZWxsIHdoZW4gaW4gZWRpdCBtb2RlIChkZXBlbmRpbmcgb24gcGFyYW1ldGVyIGRhdGEgdHlwZSwgZS5nLiBudW1lcmljIHRleHQgYm94LCBjb2xvciBwaWNrZXIsIGRyb3Bkb3duLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBiZWdpbkNlbGxFZGl0KGFyZ3M6IGFueSwgY3VycmVudFZhbHVlOiBzdHJpbmcsIGNlbGxJbmZvOiBJQ2VsbEluZm8pIHtcclxuICAgICAgICB2YXIgeyBlZGl0Q2VsbFdpZHRoLCBlZGl0Q2VsbEhlaWdodCB9ID0gdGhpcy5nZXRFZGl0Q2VsbFNpemUoYXJncyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNlbGxJbmZvLnZhbHVlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYoY2VsbEluZm8ub25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDb21ib0JveChhcmdzLCBjdXJyZW50VmFsdWUsIGNlbGxJbmZvLnZhbHVlcywgZWRpdENlbGxXaWR0aCwgZWRpdENlbGxIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXREcm9wRG93bkxpc3QoYXJncywgY3VycmVudFZhbHVlLCBjZWxsSW5mby52YWx1ZXMsIGVkaXRDZWxsV2lkdGgsIGVkaXRDZWxsSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjZWxsSW5mby5kYXRhVHlwZU5hbWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc0NvbG9yRGF0YVR5cGUoY2VsbEluZm8uZGF0YVR5cGVOYW1lKSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdENvbG9yUGlja2VyKGFyZ3MsIGN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmlzU3RyaW5nRGF0YVR5cGUoY2VsbEluZm8uZGF0YVR5cGVOYW1lKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihhcmdzLnJvd2RhdGEuY2FsY3VsYXRpb25EYXRhICE9IHVuZGVmaW5lZCAmJiBhcmdzLnJvd2RhdGEuY2FsY3VsYXRpb25EYXRhLnZhbHVlQ29udmVydGVyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IGFyZ3Mucm93ZGF0YS5nZXRSYXdWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0VGV4dEJveChhcmdzLCBlZGl0Q2VsbFdpZHRoLCBlZGl0Q2VsbEhlaWdodCwgY3VycmVudFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0TnVtZXJpY0JveChhcmdzLCBjdXJyZW50VmFsdWUsIGVkaXRDZWxsV2lkdGgsIGVkaXRDZWxsSGVpZ2h0LCBjZWxsSW5mby5kYXRhVHlwZU5hbWUsIGNlbGxJbmZvLm1pblZhbHVlLCBjZWxsSW5mby5tYXhWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gRGVmYXVsdCBzaG93IHRleHQgaW5wdXRcclxuICAgICAgICAgICAgdGhpcy5pbml0VGV4dEJveChhcmdzLCBlZGl0Q2VsbFdpZHRoLCBlZGl0Q2VsbEhlaWdodCwgY3VycmVudFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyBjb2xvciBkYXRhdHlwZSAoZS5nLiBjb2xvcilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFUeXBlTmFtZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzQ29sb3JEYXRhVHlwZShkYXRhVHlwZU5hbWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoZGF0YVR5cGVOYW1lID09IFwiQ29sb3JcIil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyBzdHJpbmcgZGF0YXR5cGUgKGUuZy4gU3RyaW5nKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVR5cGVOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNTdHJpbmdEYXRhVHlwZShkYXRhVHlwZU5hbWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoZGF0YVR5cGVOYW1lID09IFwiU3RyaW5nXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIElzIGludGVnZXIgZGF0YXR5cGUgKGUuZy4gSW50MTYsIFVJbnQzMiwgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVR5cGVOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNJbnRlZ2VyRGF0YVR5cGUoZGF0YVR5cGVOYW1lOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGlmKGRhdGFUeXBlTmFtZSA9PSBcIkludDE2XCIgfHwgZGF0YVR5cGVOYW1lID09IFwiVUludDE2XCIgfHxcclxuICAgICAgICAgICAgZGF0YVR5cGVOYW1lID09IFwiSW50MzJcIiB8fCBkYXRhVHlwZU5hbWUgPT0gXCJVSW50MzJcIiB8fFxyXG4gICAgICAgICAgICBkYXRhVHlwZU5hbWUgPT0gXCJJbnQ2NFwiIHx8IGRhdGFUeXBlTmFtZSA9PSBcIlVJbnQ2NFwiKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB1bnNpZ25lZCBpbnRlZ2VyIGRhdGF0eXBlIChlLmcuIFVJbnQxNiwgVUludDMyLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhVHlwZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1Vuc2lnbmVkSW50ZWdlckRhdGFUeXBlKGRhdGFUeXBlTmFtZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICBpZiggZGF0YVR5cGVOYW1lID09IFwiVUludDE2XCIgfHxcclxuICAgICAgICAgICAgZGF0YVR5cGVOYW1lID09IFwiVUludDMyXCIgfHxcclxuICAgICAgICAgICAgZGF0YVR5cGVOYW1lID09IFwiVUludDY0XCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBDb21ib0JveCB3aXRoIGVkaXQgc3VwcG9ydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VmFsdWVcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVzXHJcbiAgICAgKiBAcGFyYW0geyp9IGNlbGxXaWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBjZWxsSGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRDb21ib0JveChhcmdzLCBjdXJyZW50VmFsdWU6IHN0cmluZywgdmFsdWVzLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQpe1xyXG4gICAgICAgIGFyZ3MuZWxlbWVudC5lakNvbWJvQm94KHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdmFsdWVzLFxyXG4gICAgICAgICAgICB0ZXh0OiBjdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICAgIHdpZHRoOiBjZWxsV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogY2VsbEhlaWdodCxcclxuICAgICAgICAgICAgZmllbGRzOiB7IHRleHQ6IFwiZGlzcGxheVZhbHVlXCIsIHZhbHVlOiBcInZhbHVlXCIgfSxcclxuICAgICAgICAgICAgc2VsZWN0OiAoYXJncykgPT4geyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLnJhaXNlKG51bGwsIGFyZ3MpOyAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIERyb3BEb3duTGlzdCAobm8gZWRpdCBzdXBwb3J0KVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VmFsdWVcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVzXHJcbiAgICAgKiBAcGFyYW0geyp9IGNlbGxXaWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBjZWxsSGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXREcm9wRG93bkxpc3QoYXJncywgY3VycmVudFZhbHVlOiBzdHJpbmcsIHZhbHVlcywgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0KXtcclxuICAgICAgICBhcmdzLmVsZW1lbnQuZWpEcm9wRG93bkxpc3Qoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB2YWx1ZXMsXHJcbiAgICAgICAgICAgIHRleHQ6IGN1cnJlbnRWYWx1ZSxcclxuICAgICAgICAgICAgd2lkdGg6IGNlbGxXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBjZWxsSGVpZ2h0LFxyXG4gICAgICAgICAgICBwb3B1cEhlaWdodDogXCI1MCVcIixcclxuICAgICAgICAgICAgZmllbGRzOiB7IHRleHQ6IFwiZGlzcGxheVZhbHVlXCIsIHZhbHVlOiBcInZhbHVlXCIgfSxcclxuICAgICAgICAgICAgc2VsZWN0OiAoYXJncykgPT4geyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLnJhaXNlKG51bGwsIGFyZ3MpOyAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIFRleHRCb3hcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0geyp9IGNlbGxXaWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBjZWxsSGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0geyp9IGNlbGxWYWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0VGV4dEJveChhcmdzLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIGNlbGxWYWx1ZSl7XHJcbiAgICAgICAgYXJncy5lbGVtZW50LmVqTWFza0VkaXQoe1xyXG4gICAgICAgICAgICB3aWR0aDogY2VsbFdpZHRoLCAvLyBTZXQgdGV4dGJveCB3aWR0aCB0byBjb2x1bW4gd2lkdGhcclxuICAgICAgICAgICAgaGVpZ2h0OiBjZWxsSGVpZ2h0LFxyXG4gICAgICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIENvbG9yUGljY2tlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdENvbG9yUGlja2VyKGFyZ3MsIGN1cnJlbnRWYWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBhcmdzLmVsZW1lbnQuZWpDb2xvclBpY2tlcih7XHJcbiAgICAgICAgICAgIHZhbHVlOiBjdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICAgIG1vZGVsVHlwZTogXCJwYWxldHRlXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgTnVtZXJpY1RleHRib3hcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFZhbHVlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNlbGxXaWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBjZWxsSGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWNpbWFsU3VwcG9ydD1mYWxzZV1cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdE51bWVyaWNCb3goYXJncywgY3VycmVudFZhbHVlOiBzdHJpbmcsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgZGF0YVR5cGVOYW1lOiBzdHJpbmcsIG1pblZhbHVlOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkLCBtYXhWYWx1ZTogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRlY2ltYWxTdXBwb3J0ID0gIXRoaXMuaXNJbnRlZ2VyRGF0YVR5cGUoZGF0YVR5cGVOYW1lKTtcclxuICAgICAgICBsZXQgaXNVbnNpZ25lZFR5cGUgPSB0aGlzLmlzVW5zaWduZWRJbnRlZ2VyRGF0YVR5cGUoZGF0YVR5cGVOYW1lKTtcclxuXHJcbiAgICAgICAgbGV0IGRlY2ltYWxQbGFjZXMgPSAwO1xyXG4gICAgICAgIGlmKGRlY2ltYWxTdXBwb3J0ID09IHRydWUpe1xyXG4gICAgICAgICAgICBkZWNpbWFsUGxhY2VzID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtaW5WYWwgPSBtaW5WYWx1ZTtcclxuICAgICAgICBpZihtaW5WYWx1ZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihpc1Vuc2lnbmVkVHlwZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIG1pblZhbCA9IDA7IC8vIExpbWl0IHRvIDAgaWYgdW5zaWduZWQgZGF0YXR5cGVcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBtaW5WYWwgPSAtKE51bWJlci5NQVhfVkFMVUUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXhWYWwgPSBtYXhWYWx1ZTtcclxuICAgICAgICBpZihtYXhWYWx1ZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBtYXhWYWwgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcmdzLmVsZW1lbnQuZWpOdW1lcmljVGV4dGJveCh7XHJcbiAgICAgICAgICAgIHZhbHVlOiBjdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICAgIHdpZHRoOiBjZWxsV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogY2VsbEhlaWdodCxcclxuICAgICAgICAgICAgc2hvd1JvdW5kZWRDb3JuZXI6IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dTcGluQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgZGVjaW1hbFBsYWNlczogZGVjaW1hbFBsYWNlcyxcclxuICAgICAgICAgICAgbWluVmFsdWU6IG1pblZhbCxcclxuICAgICAgICAgICAgbWF4VmFsdWU6IG1heFZhbCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiBkZXRlcm1pbmVzIHRoZSBlZGl0IGNlbGwgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIGdldEVkaXRDZWxsU2l6ZShhcmdzOiBhbnkpIHtcclxuICAgICAgICB2YXIgZWRpdENlbGxXaWR0aCA9IGFyZ3MuY29sdW1uLndpZHRoLTY7XHJcbiAgICAgICAgdmFyIGVkaXRDZWxsSGVpZ2h0ID0gMjM7IC8vIGRlZmF1bHQgY2VsbCBoZWlnaHRcclxuICAgICAgICB2YXIgb3RoZXJFbGVtZW50ID0gYXJncy5lbGVtZW50WzBdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBpZihvdGhlckVsZW1lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gc2V0IGNlbGwgaGVpZ2h0IGZyb20gcGFyZW50IGVsZW1lbnQgaWYgZm91bmRcclxuICAgICAgICAgICAgZWRpdENlbGxIZWlnaHQgPSBvdGhlckVsZW1lbnQuY2xpZW50SGVpZ2h0LTQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IGVkaXRDZWxsV2lkdGgsIGVkaXRDZWxsSGVpZ2h0IH07XHJcbiAgICB9XHJcbn1cclxuIl19
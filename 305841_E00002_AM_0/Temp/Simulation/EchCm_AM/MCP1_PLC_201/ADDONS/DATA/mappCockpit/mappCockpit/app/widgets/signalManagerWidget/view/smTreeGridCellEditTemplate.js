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
define(["require", "exports", "../../common/treeGridParameterTypeEditorBase", "../signalManagerWidget"], function (require, exports, treeGridParameterTypeEditorBase_1, signalManagerWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SmTreeGridCellEditTemplate = /** @class */ (function (_super) {
        __extends(SmTreeGridCellEditTemplate, _super);
        function SmTreeGridCellEditTemplate() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * handle creating the cell edit template
             *
             * @returns
             * @memberof SmTreeGridCellEditTemplate
             */
            _this.create = function () { return _this.getEditInputTemplate(); };
            /**
             * handles reading parameter values
             *
             * @param {*} args
             * @memberof SmTreeGridCellEditTemplate
             */
            _this.read = function (args) { return _this.endCellEdit(args); };
            /**
             * handles writing parameter values
             *
             * @param {*} args
             * @memberof SmTreeGridCellEditTemplate
             */
            _this.write = function (args) {
                if (args.column.field == signalManagerWidget_1.SignalManagerWidget.colorColumnId) {
                    var cellInfo = { dataTypeName: "Color", values: undefined, onlyValuesFromListAreAllowed: true };
                    return _this.beginCellEdit(args, args.rowdata.color, cellInfo);
                }
                else {
                    var dataTypeName = "String";
                    if (args.rowdata.dataTypeName != undefined) {
                        dataTypeName = args.rowdata.dataTypeName;
                    }
                    var cellInfo = { dataTypeName: dataTypeName, values: args.rowdata.values, onlyValuesFromListAreAllowed: args.rowdata.onlyValuesFromListAreAllowed };
                    if (args.rowdata.calculationData != undefined) {
                        var displayInfo = args.rowdata.calculationData.displayInfo;
                        if (displayInfo != undefined) {
                            if (displayInfo.minValue != undefined) {
                                cellInfo.minValue = displayInfo.minValue;
                            }
                            if (displayInfo.maxValue != undefined) {
                                cellInfo.maxValue = displayInfo.maxValue;
                            }
                        }
                    }
                    return _this.beginCellEdit(args, args.rowdata.value, cellInfo);
                }
            };
            return _this;
        }
        /**
         * creates an instance
         *
         * @static
         * @returns {*}
         * @memberof SmTreeGridCellEditTemplate
         */
        SmTreeGridCellEditTemplate.createInstance = function () {
            return new SmTreeGridCellEditTemplate();
        };
        return SmTreeGridCellEditTemplate;
    }(treeGridParameterTypeEditorBase_1.TreeGridParameterTypeEditorBase));
    exports.SmTreeGridCellEditTemplate = SmTreeGridCellEditTemplate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvc2lnbmFsTWFuYWdlcldpZGdldC92aWV3L3NtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUFnRCw4Q0FBK0I7UUFBL0U7WUFBQSxxRUE4REM7WUFqREc7Ozs7O2VBS0c7WUFDSCxZQUFNLEdBQUcsY0FBTSxPQUFPLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJEOzs7OztlQUtHO1lBQ0gsVUFBSSxHQUFHLFVBQUMsSUFBSSxJQUFLLE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsRDs7Ozs7ZUFLRztZQUNILFdBQUssR0FBRyxVQUFDLElBQUk7Z0JBQ1QsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSx5Q0FBbUIsQ0FBQyxhQUFhLEVBQUM7b0JBQ3RELElBQUksUUFBUSxHQUFHLEVBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDRCQUE0QixFQUFFLElBQUksRUFBYyxDQUFDO29CQUMzRyxPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNqRTtxQkFDRztvQkFDQSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUM7b0JBQzVCLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO3dCQUN0QyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7cUJBQzVDO29CQUVELElBQUksUUFBUSxHQUFHLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBZSxDQUFDO29CQUNoSyxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxJQUFJLFNBQVMsRUFBQzt3QkFDekMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO3dCQUMzRCxJQUFHLFdBQVcsSUFBSSxTQUFTLEVBQUM7NEJBQ3hCLElBQUcsV0FBVyxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUM7Z0NBQ2pDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQzs2QkFDNUM7NEJBQ0QsSUFBRyxXQUFXLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBQztnQ0FDakMsUUFBUSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDOzZCQUM1Qzt5QkFDSjtxQkFDSjtvQkFFRCxPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNqRTtZQUNMLENBQUMsQ0FBQzs7UUFDTixDQUFDO1FBNURHOzs7Ozs7V0FNRztRQUNJLHlDQUFjLEdBQXJCO1lBQ0ksT0FBTyxJQUFJLDBCQUEwQixFQUFFLENBQUM7UUFDNUMsQ0FBQztRQW1ETCxpQ0FBQztJQUFELENBQUMsQUE5REQsQ0FBZ0QsaUVBQStCLEdBOEQ5RTtJQTlEWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJXaWRnZXQgfSBmcm9tIFwiLi4vc2lnbmFsTWFuYWdlcldpZGdldFwiO1xyXG5pbXBvcnQgeyBJQ2VsbEluZm8gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSBleHRlbmRzIFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2V7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhbiBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFNtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVJbnN0YW5jZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGUgY3JlYXRpbmcgdGhlIGNlbGwgZWRpdCB0ZW1wbGF0ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgY3JlYXRlID0gKCk9PnsgcmV0dXJuIHRoaXMuZ2V0RWRpdElucHV0VGVtcGxhdGUoKTsgfTsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHJlYWRpbmcgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFNtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHJlYWQgPSAoYXJncyk9PnsgcmV0dXJuIHRoaXMuZW5kQ2VsbEVkaXQoYXJncyk7IH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHdyaXRpbmcgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFNtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHdyaXRlID0gKGFyZ3MpPT57IFxyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uLmZpZWxkID09IFNpZ25hbE1hbmFnZXJXaWRnZXQuY29sb3JDb2x1bW5JZCl7XHJcbiAgICAgICAgICAgIGxldCBjZWxsSW5mbyA9IHtkYXRhVHlwZU5hbWU6IFwiQ29sb3JcIiwgdmFsdWVzOiB1bmRlZmluZWQsIG9ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQ6IHRydWV9IGFzIElDZWxsSW5mbztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmVnaW5DZWxsRWRpdChhcmdzLCBhcmdzLnJvd2RhdGEuY29sb3IsIGNlbGxJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGRhdGFUeXBlTmFtZSA9IFwiU3RyaW5nXCI7XHJcbiAgICAgICAgICAgIGlmKGFyZ3Mucm93ZGF0YS5kYXRhVHlwZU5hbWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlTmFtZSA9IGFyZ3Mucm93ZGF0YS5kYXRhVHlwZU5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjZWxsSW5mbyA9IHtkYXRhVHlwZU5hbWU6IGRhdGFUeXBlTmFtZSwgdmFsdWVzOiBhcmdzLnJvd2RhdGEudmFsdWVzLCBvbmx5VmFsdWVzRnJvbUxpc3RBcmVBbGxvd2VkOiBhcmdzLnJvd2RhdGEub25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZCB9IGFzIElDZWxsSW5mbztcclxuICAgICAgICAgICAgaWYoYXJncy5yb3dkYXRhLmNhbGN1bGF0aW9uRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3BsYXlJbmZvID0gYXJncy5yb3dkYXRhLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mbztcclxuICAgICAgICAgICAgICAgIGlmKGRpc3BsYXlJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlzcGxheUluZm8ubWluVmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZm8ubWluVmFsdWUgPSBkaXNwbGF5SW5mby5taW5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlzcGxheUluZm8ubWF4VmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZm8ubWF4VmFsdWUgPSBkaXNwbGF5SW5mby5tYXhWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJlZ2luQ2VsbEVkaXQoYXJncywgYXJncy5yb3dkYXRhLnZhbHVlLCBjZWxsSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSJdfQ==
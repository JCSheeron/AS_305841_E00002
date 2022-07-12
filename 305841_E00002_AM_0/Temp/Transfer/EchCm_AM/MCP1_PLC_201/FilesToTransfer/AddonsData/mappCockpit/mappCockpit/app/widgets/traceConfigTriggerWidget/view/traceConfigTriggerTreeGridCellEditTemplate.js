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
define(["require", "exports", "../../common/treeGridParameterTypeEditorBase"], function (require, exports, treeGridParameterTypeEditorBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigTriggerTreeGridCellEditTemplate = /** @class */ (function (_super) {
        __extends(TraceConfigTriggerTreeGridCellEditTemplate, _super);
        function TraceConfigTriggerTreeGridCellEditTemplate() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * handle creating the cell edit template
             *
             * @returns
             * @memberof TraceConfigTriggerTreeGridCellEditTemplate
             */
            _this.create = function () { return _this.getEditInputTemplate(); };
            /**
             * handles reading parameter values
             *
             * @param {*} args
             * @memberof TraceConfigTriggerTreeGridCellEditTemplate
             */
            _this.read = function (args) { return _this.endCellEdit(args); };
            /**
             * handles writing parameter values
             *
             * @param {*} args
             * @memberof TraceConfigTriggerTreeGridCellEditTemplate
             */
            _this.write = function (args) {
                var componentParameter = args.rowdata.componentParameter;
                var values = undefined;
                if (componentParameter.enumType.values != undefined) {
                    values = componentParameter.enumType.values.map(function (value) { return value; });
                }
                var cellInfo = { values: values, dataTypeName: componentParameter.dataType.name, onlyValuesFromListAreAllowed: true };
                return _this.beginCellEdit(args, args.rowdata.displayValue, cellInfo);
            };
            return _this;
        }
        /**
         * creates an instance
         *
         * @static
         * @returns {*}
         * @memberof TraceConfigTriggerTreeGridCellEditTemplate
         */
        TraceConfigTriggerTreeGridCellEditTemplate.createInstance = function () {
            return new TraceConfigTriggerTreeGridCellEditTemplate();
        };
        return TraceConfigTriggerTreeGridCellEditTemplate;
    }(treeGridParameterTypeEditorBase_1.TreeGridParameterTypeEditorBase));
    exports.TraceConfigTriggerTreeGridCellEditTemplate = TraceConfigTriggerTreeGridCellEditTemplate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC92aWV3L3RyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBZ0UsOERBQStCO1FBQS9GO1lBQUEscUVBNENDO1lBL0JHOzs7OztlQUtHO1lBQ0gsWUFBTSxHQUFHLGNBQU0sT0FBTyxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyRDs7Ozs7ZUFLRztZQUNILFVBQUksR0FBRyxVQUFDLElBQUksSUFBSyxPQUFPLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFakQ7Ozs7O2VBS0c7WUFDSCxXQUFLLEdBQUcsVUFBQyxJQUFJO2dCQUNULElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBbUQsQ0FBQztnQkFDMUYsSUFBSSxNQUFNLEdBQW9DLFNBQVMsQ0FBQztnQkFDeEQsSUFBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBQztvQkFDL0MsTUFBTSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBdUIsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO2lCQUNyRjtnQkFDRCxJQUFJLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFjLENBQUM7Z0JBQ2pJLE9BQU8sS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDOztRQUNQLENBQUM7UUExQ0c7Ozs7OztXQU1HO1FBQ0kseURBQWMsR0FBckI7WUFDSSxPQUFPLElBQUksMENBQTBDLEVBQUUsQ0FBQztRQUM1RCxDQUFDO1FBaUNMLGlEQUFDO0lBQUQsQ0FBQyxBQTVDRCxDQUFnRSxpRUFBK0IsR0E0QzlGO0lBNUNZLGdHQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2VcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL2NlbGxJbmZvSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSBleHRlbmRzIFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2V7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhbiBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlSW5zdGFuY2UoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gbmV3IFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlIGNyZWF0aW5nIHRoZSBjZWxsIGVkaXQgdGVtcGxhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGUgPSAoKT0+eyByZXR1cm4gdGhpcy5nZXRFZGl0SW5wdXRUZW1wbGF0ZSgpOyB9OyBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHJlYWRpbmcgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICByZWFkID0gKGFyZ3MpPT57IHJldHVybiB0aGlzLmVuZENlbGxFZGl0KGFyZ3MpOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHdyaXRpbmcgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICB3cml0ZSA9IChhcmdzKT0+eyBcclxuICAgICAgICBsZXQgY29tcG9uZW50UGFyYW1ldGVyID0gYXJncy5yb3dkYXRhLmNvbXBvbmVudFBhcmFtZXRlciBhcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcjtcclxuICAgICAgICBsZXQgdmFsdWVzOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKGNvbXBvbmVudFBhcmFtZXRlci5lbnVtVHlwZS52YWx1ZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdmFsdWVzID0gY29tcG9uZW50UGFyYW1ldGVyLmVudW1UeXBlLnZhbHVlcy5tYXAodmFsdWUgPT4gdmFsdWUgYXMgSVZhbHVlTGlzdEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2VsbEluZm8gPSB7dmFsdWVzOiB2YWx1ZXMsIGRhdGFUeXBlTmFtZTogY29tcG9uZW50UGFyYW1ldGVyLmRhdGFUeXBlLm5hbWUsIG9ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQ6IHRydWV9IGFzIElDZWxsSW5mbztcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWdpbkNlbGxFZGl0KGFyZ3MsIGFyZ3Mucm93ZGF0YS5kaXNwbGF5VmFsdWUsIGNlbGxJbmZvKTtcclxuICAgICB9O1xyXG59Il19
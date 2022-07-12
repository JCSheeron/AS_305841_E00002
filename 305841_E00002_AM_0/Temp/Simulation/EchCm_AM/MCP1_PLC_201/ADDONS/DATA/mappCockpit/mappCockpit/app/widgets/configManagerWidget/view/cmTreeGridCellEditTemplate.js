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
    var CmTreeGridCellEditTemplate = /** @class */ (function (_super) {
        __extends(CmTreeGridCellEditTemplate, _super);
        function CmTreeGridCellEditTemplate() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * handle creating the cell edit template
             *
             * @returns
             * @memberof CmTreeGridCellEditTemplate
             */
            _this.create = function () { return _this.getEditInputTemplate(); };
            /**
             * handles reading parameter values
             *
             * @param {*} args
             * @memberof CmTreeGridCellEditTemplate
             */
            _this.read = function (args) { return _this.endCellEdit(args); };
            /**
             * handles writing parameter values
             *
             * @memberof CmTreeGridCellEditTemplate
             */
            _this.write = function (args) {
                var componentParameter = args.rowdata.element.componentParameter;
                var values = undefined;
                if (componentParameter.enumType.values != undefined) {
                    values = componentParameter.enumType.values.map(function (value) { return value; });
                }
                var cellInfo = { values: values, dataTypeName: componentParameter.dataType.name };
                return _this.beginCellEdit(args, args.rowdata.modifiedDisplayValue, cellInfo);
            };
            return _this;
        }
        /**
         * creates an instance
         *
         * @static
         * @returns {*}
         * @memberof CmTreeGridCellEditTemplate
         */
        CmTreeGridCellEditTemplate.createInstance = function () {
            return new CmTreeGridCellEditTemplate();
        };
        return CmTreeGridCellEditTemplate;
    }(treeGridParameterTypeEditorBase_1.TreeGridParameterTypeEditorBase));
    exports.CmTreeGridCellEditTemplate = CmTreeGridCellEditTemplate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC92aWV3L2NtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUFnRCw4Q0FBK0I7UUFBL0U7WUFBQSxxRUEyQ0M7WUE5Qkc7Ozs7O2VBS0c7WUFDSCxZQUFNLEdBQUcsY0FBTSxPQUFPLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJEOzs7OztlQUtHO1lBQ0gsVUFBSSxHQUFHLFVBQUMsSUFBSSxJQUFLLE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUVqRDs7OztlQUlHO1lBQ0gsV0FBSyxHQUFHLFVBQUMsSUFBSTtnQkFDVCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFtRCxDQUFDO2dCQUNsRyxJQUFJLE1BQU0sR0FBb0MsU0FBUyxDQUFDO2dCQUN4RCxJQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFDO29CQUMvQyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUF1QixFQUF2QixDQUF1QixDQUFDLENBQUM7aUJBQ3JGO2dCQUNELElBQUksUUFBUSxHQUFHLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBYyxDQUFDO2dCQUM3RixPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEYsQ0FBQyxDQUFDOztRQUNQLENBQUM7UUF6Q0c7Ozs7OztXQU1HO1FBQ0kseUNBQWMsR0FBckI7WUFDSSxPQUFPLElBQUksMEJBQTBCLEVBQUUsQ0FBQztRQUM1QyxDQUFDO1FBZ0NMLGlDQUFDO0lBQUQsQ0FBQyxBQTNDRCxDQUFnRCxpRUFBK0IsR0EyQzlFO0lBM0NZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2VcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL2NlbGxJbmZvSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIGV4dGVuZHMgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZXtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGFuIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUluc3RhbmNlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlIGNyZWF0aW5nIHRoZSBjZWxsIGVkaXQgdGVtcGxhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZSA9ICgpPT57IHJldHVybiB0aGlzLmdldEVkaXRJbnB1dFRlbXBsYXRlKCk7IH07IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgcmVhZGluZyBwYXJhbWV0ZXIgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgcmVhZCA9IChhcmdzKT0+eyByZXR1cm4gdGhpcy5lbmRDZWxsRWRpdChhcmdzKTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB3cml0aW5nIHBhcmFtZXRlciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgd3JpdGUgPSAoYXJncyk9PntcclxuICAgICAgICBsZXQgY29tcG9uZW50UGFyYW1ldGVyID0gYXJncy5yb3dkYXRhLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyO1xyXG4gICAgICAgIGxldCB2YWx1ZXM6IEFycmF5PElWYWx1ZUxpc3RJdGVtPnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoY29tcG9uZW50UGFyYW1ldGVyLmVudW1UeXBlLnZhbHVlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB2YWx1ZXMgPSBjb21wb25lbnRQYXJhbWV0ZXIuZW51bVR5cGUudmFsdWVzLm1hcCh2YWx1ZSA9PiB2YWx1ZSBhcyBJVmFsdWVMaXN0SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjZWxsSW5mbyA9IHt2YWx1ZXM6IHZhbHVlcywgZGF0YVR5cGVOYW1lOiBjb21wb25lbnRQYXJhbWV0ZXIuZGF0YVR5cGUubmFtZX0gYXMgSUNlbGxJbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJlZ2luQ2VsbEVkaXQoYXJncywgYXJncy5yb3dkYXRhLm1vZGlmaWVkRGlzcGxheVZhbHVlLCBjZWxsSW5mbyk7XHJcbiAgICAgfTtcclxufSJdfQ==
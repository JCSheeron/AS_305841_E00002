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
    var TraceConfigTimingTreeGridCellEditTemplate = /** @class */ (function (_super) {
        __extends(TraceConfigTimingTreeGridCellEditTemplate, _super);
        function TraceConfigTimingTreeGridCellEditTemplate() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * handle creating the cell edit template
             *
             * @returns
             * @memberof TraceConfigTimingTreeGridCellEditTemplate
             */
            _this.create = function () { return _this.getEditInputTemplate(); };
            /**
             * handles reading parameter values
             *
             * @param {*} args
             * @memberof TraceConfigTimingTreeGridCellEditTemplate
             */
            _this.read = function (args) { return _this.endCellEdit(args); };
            /**
             * handles writing parameter values
             *
             * @param {*} args
             * @memberof TraceConfigTimingTreeGridCellEditTemplate
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
         * @memberof TraceConfigTimingTreeGridCellEditTemplate
         */
        TraceConfigTimingTreeGridCellEditTemplate.createInstance = function () {
            return new TraceConfigTimingTreeGridCellEditTemplate();
        };
        return TraceConfigTimingTreeGridCellEditTemplate;
    }(treeGridParameterTypeEditorBase_1.TreeGridParameterTypeEditorBase));
    exports.TraceConfigTimingTreeGridCellEditTemplate = TraceConfigTimingTreeGridCellEditTemplate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvdmlldy90cmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBK0QsNkRBQStCO1FBQTlGO1lBQUEscUVBNENDO1lBL0JHOzs7OztlQUtHO1lBQ0gsWUFBTSxHQUFHLGNBQU0sT0FBTyxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyRDs7Ozs7ZUFLRztZQUNILFVBQUksR0FBRyxVQUFDLElBQUksSUFBSyxPQUFPLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFakQ7Ozs7O2VBS0c7WUFDSCxXQUFLLEdBQUcsVUFBQyxJQUFJO2dCQUNULElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBbUQsQ0FBQztnQkFDMUYsSUFBSSxNQUFNLEdBQW9DLFNBQVMsQ0FBQztnQkFDeEQsSUFBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBQztvQkFDL0MsTUFBTSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBdUIsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO2lCQUNyRjtnQkFDRCxJQUFJLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFjLENBQUM7Z0JBQ2pJLE9BQU8sS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDOztRQUNQLENBQUM7UUExQ0c7Ozs7OztXQU1HO1FBQ0ksd0RBQWMsR0FBckI7WUFDSSxPQUFPLElBQUkseUNBQXlDLEVBQUUsQ0FBQztRQUMzRCxDQUFDO1FBaUNMLGdEQUFDO0lBQUQsQ0FBQyxBQTVDRCxDQUErRCxpRUFBK0IsR0E0QzdGO0lBNUNZLDhGQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2VcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL2NlbGxJbmZvSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIGV4dGVuZHMgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZXtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGFuIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUluc3RhbmNlKCk6IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGUgY3JlYXRpbmcgdGhlIGNlbGwgZWRpdCB0ZW1wbGF0ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgY3JlYXRlID0gKCk9PnsgcmV0dXJuIHRoaXMuZ2V0RWRpdElucHV0VGVtcGxhdGUoKTsgfTsgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyByZWFkaW5nIHBhcmFtZXRlciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICByZWFkID0gKGFyZ3MpPT57IHJldHVybiB0aGlzLmVuZENlbGxFZGl0KGFyZ3MpOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHdyaXRpbmcgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHdyaXRlID0gKGFyZ3MpPT57XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlciA9IGFyZ3Mucm93ZGF0YS5jb21wb25lbnRQYXJhbWV0ZXIgYXMgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI7XHJcbiAgICAgICAgbGV0IHZhbHVlczogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZihjb21wb25lbnRQYXJhbWV0ZXIuZW51bVR5cGUudmFsdWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHZhbHVlcyA9IGNvbXBvbmVudFBhcmFtZXRlci5lbnVtVHlwZS52YWx1ZXMubWFwKHZhbHVlID0+IHZhbHVlIGFzIElWYWx1ZUxpc3RJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNlbGxJbmZvID0ge3ZhbHVlczogdmFsdWVzLCBkYXRhVHlwZU5hbWU6IGNvbXBvbmVudFBhcmFtZXRlci5kYXRhVHlwZS5uYW1lLCBvbmx5VmFsdWVzRnJvbUxpc3RBcmVBbGxvd2VkOiB0cnVlfSBhcyBJQ2VsbEluZm87XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVnaW5DZWxsRWRpdChhcmdzLCBhcmdzLnJvd2RhdGEuZGlzcGxheVZhbHVlLCBjZWxsSW5mbyk7XHJcbiAgICAgfTtcclxufSJdfQ==
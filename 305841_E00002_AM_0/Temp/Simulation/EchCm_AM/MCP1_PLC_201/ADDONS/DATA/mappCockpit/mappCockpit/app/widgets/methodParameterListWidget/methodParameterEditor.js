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
define(["require", "exports", "../common/treeGridParameterTypeEditorBase", "../../models/online/mappCockpitComponent"], function (require, exports, treeGridParameterTypeEditorBase_1, mappCockpitComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements a type editor for parameters to be used within grid cells.
     *
     * @class MappCockpitParameterTypeEditor
     */
    var MappCockpitParameterTypeEditor = /** @class */ (function (_super) {
        __extends(MappCockpitParameterTypeEditor, _super);
        function MappCockpitParameterTypeEditor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * handle creating the cell edit template
             *
             * @returns
             * @memberof MappCockpitParameterTypeEditor
             */
            _this.create = function () { return _this.getEditInputTemplate(); };
            /**
             * handles reading parameter values
             *
             * @memberof MappCockpitParameterTypeEditor
             */
            _this.read = function (args) { return _this.endCellEdit(args); };
            /**
             * handles writing parameter values
             *
             * @memberof MappCockpitParameterTypeEditor
             */
            _this.write = function (args) {
                var methodParameter = args.rowdata;
                if (methodParameter != undefined && methodParameter instanceof mappCockpitComponent_1.MappCockpitMethodParameter) {
                    var values = undefined;
                    if (methodParameter.enumType != undefined && methodParameter.enumType.values != undefined) {
                        values = methodParameter.enumType.values.map(function (value) { return value; });
                    }
                    var cellInfo = { values: values, dataTypeName: methodParameter.dataType.name, onlyValuesFromListAreAllowed: true };
                    return _this.beginCellEdit(args, methodParameter.displayValue, cellInfo);
                }
            };
            return _this;
        }
        /**
         * creates an instance
         *
         * @static
         * @returns {*}
         * @memberof MappCockpitParameterTypeEditor
         */
        MappCockpitParameterTypeEditor.createInstance = function () {
            return new MappCockpitParameterTypeEditor();
        };
        return MappCockpitParameterTypeEditor;
    }(treeGridParameterTypeEditorBase_1.TreeGridParameterTypeEditorBase));
    exports.MappCockpitParameterTypeEditor = MappCockpitParameterTypeEditor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kUGFyYW1ldGVyRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQvbWV0aG9kUGFyYW1ldGVyRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTs7OztPQUlHO0lBQ0g7UUFBb0Qsa0RBQStCO1FBQW5GO1lBQUEscUVBNENDO1lBL0JHOzs7OztlQUtHO1lBQ0gsWUFBTSxHQUFHLGNBQU0sT0FBTyxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyRDs7OztlQUlHO1lBQ0gsVUFBSSxHQUFJLFVBQUMsSUFBSSxJQUFLLE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQTtZQUVqRDs7OztlQUlHO1lBQ0gsV0FBSyxHQUFHLFVBQUMsSUFBSTtnQkFDVCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBcUMsQ0FBQztnQkFDakUsSUFBRyxlQUFlLElBQUksU0FBUyxJQUFJLGVBQWUsWUFBWSxpREFBMEIsRUFBQztvQkFDckYsSUFBSSxNQUFNLEdBQW9DLFNBQVMsQ0FBQztvQkFDeEQsSUFBRyxlQUFlLENBQUMsUUFBUSxJQUFJLFNBQVMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUM7d0JBQ3JGLE1BQU0sR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUF1QixFQUF2QixDQUF1QixDQUFDLENBQUM7cUJBQ2xGO29CQUNELElBQUksUUFBUSxHQUFHLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFjLENBQUM7b0JBQzlILE9BQU8sS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDM0U7WUFDTCxDQUFDLENBQUE7O1FBQ0wsQ0FBQztRQTFDRzs7Ozs7O1dBTUc7UUFDSSw2Q0FBYyxHQUFyQjtZQUNJLE9BQU8sSUFBSSw4QkFBOEIsRUFBRSxDQUFDO1FBQ2hELENBQUM7UUFpQ0wscUNBQUM7SUFBRCxDQUFDLEFBNUNELENBQW9ELGlFQUErQixHQTRDbEY7SUE1Q1ksd0VBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRQYXJhbWV0ZXJUeXBlRWRpdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBJQ2VsbEluZm8gfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJVmFsdWVMaXN0SXRlbSB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy92YWx1ZUxpc3RJdGVtSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIHR5cGUgZWRpdG9yIGZvciBwYXJhbWV0ZXJzIHRvIGJlIHVzZWQgd2l0aGluIGdyaWQgY2VsbHMuXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdFBhcmFtZXRlclR5cGVFZGl0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBwQ29ja3BpdFBhcmFtZXRlclR5cGVFZGl0b3IgZXh0ZW5kcyBUcmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNle1xyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGFuIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJUeXBlRWRpdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVJbnN0YW5jZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWFwcENvY2twaXRQYXJhbWV0ZXJUeXBlRWRpdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGUgY3JlYXRpbmcgdGhlIGNlbGwgZWRpdCB0ZW1wbGF0ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJUeXBlRWRpdG9yXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZSA9ICgpPT57IHJldHVybiB0aGlzLmdldEVkaXRJbnB1dFRlbXBsYXRlKCk7IH07IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyByZWFkaW5nIHBhcmFtZXRlciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJUeXBlRWRpdG9yXHJcbiAgICAgKi9cclxuICAgIHJlYWQgID0gKGFyZ3MpPT57IHJldHVybiB0aGlzLmVuZENlbGxFZGl0KGFyZ3MpO31cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgd3JpdGluZyBwYXJhbWV0ZXIgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyVHlwZUVkaXRvclxyXG4gICAgICovXHJcbiAgICB3cml0ZSA9IChhcmdzKSA9PntcclxuICAgICAgICBsZXQgbWV0aG9kUGFyYW1ldGVyID0gYXJncy5yb3dkYXRhIGFzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyO1xyXG4gICAgICAgIGlmKG1ldGhvZFBhcmFtZXRlciAhPSB1bmRlZmluZWQgJiYgbWV0aG9kUGFyYW1ldGVyIGluc3RhbmNlb2YgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIpe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVzOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZihtZXRob2RQYXJhbWV0ZXIuZW51bVR5cGUgIT0gdW5kZWZpbmVkICYmIG1ldGhvZFBhcmFtZXRlci5lbnVtVHlwZS52YWx1ZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHZhbHVlcyA9IG1ldGhvZFBhcmFtZXRlci5lbnVtVHlwZS52YWx1ZXMubWFwKHZhbHVlID0+IHZhbHVlIGFzIElWYWx1ZUxpc3RJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2VsbEluZm8gPSB7dmFsdWVzOiB2YWx1ZXMsIGRhdGFUeXBlTmFtZTogbWV0aG9kUGFyYW1ldGVyLmRhdGFUeXBlLm5hbWUsIG9ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQ6IHRydWV9IGFzIElDZWxsSW5mbztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmVnaW5DZWxsRWRpdChhcmdzLCBtZXRob2RQYXJhbWV0ZXIuZGlzcGxheVZhbHVlLCBjZWxsSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
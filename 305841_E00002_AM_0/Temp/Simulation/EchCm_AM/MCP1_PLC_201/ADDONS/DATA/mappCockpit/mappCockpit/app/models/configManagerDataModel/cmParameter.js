define(["require", "exports", "./cmFilter"], function (require, exports, cmFilter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmParameter = /** @class */ (function () {
        /**
         * Creates an instance of CmParameter
         * @param {IMetaDataParameter} paramMetaData
         * @param {Array<MappCockpitComponentParameter>} componentParameters
         * @param {boolean} editModeActive
         * @memberof CmParameter
         */
        function CmParameter(paramMetaData, componentParameters, editModeActive) {
            /**
             * Is edit mode currently active for this parameter
             *
             * @type {boolean}
             * @memberof CmParameter
             */
            this.editModeActive = false;
            this.editModeActive = editModeActive;
            this.filter = undefined;
            if (paramMetaData != null) {
                this.displayName = paramMetaData.DisplayName;
                this.description = paramMetaData.Description;
                this.componentParameter = CmParameter.getComponentParameter(componentParameters, paramMetaData.Ref);
                var parameterValues = undefined;
                if (paramMetaData.Filter != null) {
                    if (paramMetaData.Filter.ParameterValues != null) {
                        parameterValues = paramMetaData.Filter.ParameterValues;
                    }
                    this.filter = new cmFilter_1.CmFilter(paramMetaData.Filter.ParameterRef, paramMetaData.Filter.ParameterValue, parameterValues);
                }
            }
            else {
                this.displayName = "Unkown node type";
                this.description = "";
                this.componentParameter = undefined;
            }
        }
        /**
         * Returns the component parameter for the given parameter reference name from the given component parameters list, else undefined
         *
         * @private
         * @static
         * @param {(Array<MappCockpitComponentParameter>|undefined)} componentParameters
         * @param {string} paramRef
         * @returns {(MappCockpitComponentParameter|undefined)}
         * @memberof CmParameter
         */
        CmParameter.getComponentParameter = function (componentParameters, paramRef) {
            if (paramRef == undefined || componentParameters == undefined) {
                return undefined;
            }
            for (var _i = 0, componentParameters_1 = componentParameters; _i < componentParameters_1.length; _i++) {
                var parameter = componentParameters_1[_i];
                if (parameter.browseName == paramRef) {
                    return parameter;
                }
            }
        };
        return CmParameter;
    }());
    exports.CmParameter = CmParameter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21QYXJhbWV0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2NtUGFyYW1ldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBMENJOzs7Ozs7V0FNRztRQUNILHFCQUFZLGFBQWlDLEVBQUUsbUJBQW1FLEVBQUUsY0FBdUI7WUFmM0k7Ozs7O2VBS0c7WUFDSCxtQkFBYyxHQUFZLEtBQUssQ0FBQztZQVU1QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUVyQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUN4QixJQUFHLGFBQWEsSUFBSSxJQUFJLEVBQUM7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDO2dCQUU3QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEcsSUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNoQyxJQUFHLGFBQWEsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFDO29CQUM1QixJQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsZUFBZSxJQUFJLElBQUksRUFBQzt3QkFDNUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO3FCQUMxRDtvQkFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztpQkFDdkg7YUFDSjtpQkFDRztnQkFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQzthQUN2QztRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDWSxpQ0FBcUIsR0FBcEMsVUFBcUMsbUJBQW1FLEVBQUUsUUFBZ0I7WUFDdEgsSUFBRyxRQUFRLElBQUksU0FBUyxJQUFJLG1CQUFtQixJQUFJLFNBQVMsRUFBQztnQkFDekQsT0FBTyxTQUFTLENBQUM7YUFDcEI7WUFFRCxLQUFzQixVQUFtQixFQUFuQiwyQ0FBbUIsRUFBbkIsaUNBQW1CLEVBQW5CLElBQW1CLEVBQUM7Z0JBQXJDLElBQUksU0FBUyw0QkFBQTtnQkFDZCxJQUFHLFNBQVMsQ0FBQyxVQUFVLElBQUksUUFBUSxFQUFDO29CQUNoQyxPQUFPLFNBQVMsQ0FBQztpQkFDdEI7YUFDRjtRQUNMLENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUE5RkQsSUE4RkM7SUE5Rlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ21QYXJhbWV0ZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NtUGFyYW1ldGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDbUZpbHRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21GaWx0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ21GaWx0ZXIgfSBmcm9tIFwiLi9jbUZpbHRlclwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSU1ldGFEYXRhUGFyYW1ldGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tZXRhRGF0YVBhcmFtZXRlckludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtUGFyYW1ldGVyIGltcGxlbWVudHMgSUNtUGFyYW1ldGVye1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERpc3BsYXkgbmFtZSBvZiB0aGlzIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21QYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc2NyaXB0aW9uIHRleHQgZm9yIHRoaXMgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDbVBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsdGVyZGVmaW5pdGlvbiBmb3IgdGhpcyBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KElDbUZpbHRlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENtUGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIGZpbHRlcjogSUNtRmlsdGVyfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgY29tcG9uZW50IHBhcmFtZXRlciBmcm9tIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDbVBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIGVkaXQgbW9kZSBjdXJyZW50bHkgYWN0aXZlIGZvciB0aGlzIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENtUGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIGVkaXRNb2RlQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDbVBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtJTWV0YURhdGFQYXJhbWV0ZXJ9IHBhcmFtTWV0YURhdGFcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVkaXRNb2RlQWN0aXZlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ21QYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1NZXRhRGF0YTogSU1ldGFEYXRhUGFyYW1ldGVyLCBjb21wb25lbnRQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj58dW5kZWZpbmVkLCBlZGl0TW9kZUFjdGl2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5lZGl0TW9kZUFjdGl2ZSA9IGVkaXRNb2RlQWN0aXZlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKHBhcmFtTWV0YURhdGEgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheU5hbWUgPSBwYXJhbU1ldGFEYXRhLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gcGFyYW1NZXRhRGF0YS5EZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UGFyYW1ldGVyID0gQ21QYXJhbWV0ZXIuZ2V0Q29tcG9uZW50UGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnMsIHBhcmFtTWV0YURhdGEuUmVmKTtcclxuICAgICAgICAgICAgbGV0IHBhcmFtZXRlclZhbHVlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYocGFyYW1NZXRhRGF0YS5GaWx0ZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhbU1ldGFEYXRhLkZpbHRlci5QYXJhbWV0ZXJWYWx1ZXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyVmFsdWVzID0gcGFyYW1NZXRhRGF0YS5GaWx0ZXIuUGFyYW1ldGVyVmFsdWVzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSBuZXcgQ21GaWx0ZXIocGFyYW1NZXRhRGF0YS5GaWx0ZXIuUGFyYW1ldGVyUmVmLCBwYXJhbU1ldGFEYXRhLkZpbHRlci5QYXJhbWV0ZXJWYWx1ZSwgcGFyYW1ldGVyVmFsdWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlOYW1lID0gXCJVbmtvd24gbm9kZSB0eXBlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtZXRlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyIHJlZmVyZW5jZSBuYW1lIGZyb20gdGhlIGdpdmVuIGNvbXBvbmVudCBwYXJhbWV0ZXJzIGxpc3QsIGVsc2UgdW5kZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPnx1bmRlZmluZWQpfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1SZWZcclxuICAgICAqIEByZXR1cm5zIHsoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDbVBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRDb21wb25lbnRQYXJhbWV0ZXIoY29tcG9uZW50UGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fHVuZGVmaW5lZCwgcGFyYW1SZWY6IHN0cmluZyk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfHVuZGVmaW5lZHtcclxuICAgICAgICBpZihwYXJhbVJlZiA9PSB1bmRlZmluZWQgfHwgY29tcG9uZW50UGFyYW1ldGVycyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgcGFyYW1ldGVyIG9mIGNvbXBvbmVudFBhcmFtZXRlcnMpe1xyXG4gICAgICAgICAgICBpZihwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PSBwYXJhbVJlZil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1ldGVyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
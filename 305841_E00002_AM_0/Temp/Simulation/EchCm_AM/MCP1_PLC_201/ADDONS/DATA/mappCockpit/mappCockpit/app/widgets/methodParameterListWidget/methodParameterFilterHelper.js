define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Helper class used to change the visibility of method input parameters
     *
     * @class MethodParameterFilterHelper
     */
    var MethodParameterFilterHelper = /** @class */ (function () {
        function MethodParameterFilterHelper(widget) {
            this.methodInputParametersMapping = new Map();
            this.widget = widget;
        }
        /**
         * Add method and filtered parameters to mapping
         *
         * @param {*} method
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.addMethodInputParameters = function (method) {
            var inputParameters = this.getFilteredInputParameters(method);
            // add mapping of method and input parameters
            this.methodInputParametersMapping.set(method.browseName, inputParameters);
        };
        /**
         * Triggered when edit cell has finished. Filters input parameters and update parameter list if need it
         *
         * @param {(MappCockpitComponentMethod | undefined)} actualMethod
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.endTreegridEdit = function (actualMethod) {
            if (actualMethod) {
                var previousInputParameters = this.methodInputParametersMapping.get(actualMethod.browseName);
                var filteredInputParameters = this.getFilteredInputParameters(actualMethod);
                // update mapping of method and input parameters
                this.methodInputParametersMapping.set(actualMethod.browseName, filteredInputParameters);
                //If parameters are the same, don't update parameter list
                var update = this.areInputParametersChanged(previousInputParameters, filteredInputParameters);
                if (update) {
                    this.widget.updateParametersList(actualMethod);
                }
            }
        };
        /**
         * Return true if input parameters have been filtered
         *
         * @private
         * @param {MappCockpitMethodParameter[]} actualParameters
         * @param {MappCockpitMethodParameter[]} filteredParameters
         * @returns {boolean}
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.areInputParametersChanged = function (actualParameters, filteredParameters) {
            if (actualParameters.length === filteredParameters.length) {
                for (var i = 0; i < actualParameters.length; i++) {
                    if (actualParameters[i] !== filteredParameters[i]) {
                        return true;
                    }
                }
                //If all parameters are the same, returns false
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * Returns filtered input paramaters
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @returns {MappCockpitMethodParameter[]}
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.getFilteredInputParameters = function (method) {
            var inputParametersVisibilityState = this.initInputParametersVisibilityState(method.inputParameters);
            this.updateParametersVisibilityState(method, inputParametersVisibilityState);
            var inputParametersShown = this.getUpdatedInputParameters(method.inputParameters, inputParametersVisibilityState);
            return inputParametersShown;
        };
        /**
         * Initialize the mapping of each input parameter and its visible state
         *
         * @private
         * @param {MappCockpitMethodParameter[]} inputParameters
         * @returns {Map<string, boolean>}
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.initInputParametersVisibilityState = function (inputParameters) {
            var inputParamFilterState = new Map();
            inputParameters.forEach(function (inputParameter) {
                //Initialize all input parameters to visible state
                inputParamFilterState.set(inputParameter.name, true);
            });
            return inputParamFilterState;
        };
        /**
         * Update visible state of the input parameter mapping
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @param {Map<string, boolean>} inputParametersVisibilityState
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.updateParametersVisibilityState = function (method, inputParametersVisibilityState) {
            var _this = this;
            //Get just parameters that are using the filter mechanism
            var parametersWithFilter = method.inputParameters.filter(function (parameter) { return parameter.filter.parameterRef !== ''; });
            parametersWithFilter.forEach(function (parameter) {
                if (_this.isFilterActivated(method, parameter.filter)) {
                    inputParametersVisibilityState.set(parameter.name, false);
                }
                else {
                    inputParametersVisibilityState.set(parameter.name, true);
                }
            });
        };
        /**
         * Get state of filter
         *
         * @private
         * @param {*} method
         * @param {ParameterFilter} filter
         * @returns {boolean}
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.isFilterActivated = function (method, filter) {
            var parameterRefValue = this.getValueFromParameterRef(method, filter.parameterRef);
            var valueFound = filter.parameterValues.find(function (parameterValue) { return parameterRefValue === parameterValue; });
            //If value is found, filter is not activated
            if (valueFound !== undefined) {
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * Get value need it for filtering from parameter reference
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @param {string} reference
         * @returns {string}
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.getValueFromParameterRef = function (method, reference) {
            var parameterRef = method.inputParameters.find(function (parameter) { return parameter.name === reference; });
            if (parameterRef !== undefined) {
                if (typeof (parameterRef.value) !== 'string') {
                    return parameterRef.value.toString();
                }
                else {
                    return parameterRef.value;
                }
            }
            else {
                return '';
            }
        };
        /**
         * Return just visible inputParameters
         *
         * @static
         * @param {MappCockpitMethodParameter[]} parameters
         * @param {Map<string, boolean>} inputParametersVisibilityState
         * @returns {MappCockpitMethodParameter[]}
         * @memberof MethodParameterFilterHelper
         */
        MethodParameterFilterHelper.prototype.getUpdatedInputParameters = function (parameters, inputParametersVisibilityState) {
            var inputParameters = parameters.filter(function (parameter) { return inputParametersVisibilityState.get(parameter.name); });
            return inputParameters;
        };
        return MethodParameterFilterHelper;
    }());
    exports.MethodParameterFilterHelper = MethodParameterFilterHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kUGFyYW1ldGVyRmlsdGVySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQvbWV0aG9kUGFyYW1ldGVyRmlsdGVySGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBOzs7O09BSUc7SUFDSDtRQUtJLHFDQUFZLE1BQWlDO1lBSDdDLGlDQUE0QixHQUE4QyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBSWhGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDhEQUF3QixHQUEvQixVQUFnQyxNQUFNO1lBQ2xDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5RCw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHFEQUFlLEdBQXRCLFVBQXVCLFlBQW9EO1lBQ3ZFLElBQUksWUFBWSxFQUFFO2dCQUNkLElBQUksdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFpQyxDQUFDO2dCQUM3SCxJQUFJLHVCQUF1QixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFNUUsZ0RBQWdEO2dCQUNoRCxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztnQkFFeEYseURBQXlEO2dCQUN6RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsdUJBQXVCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTtn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QUFTLEVBQUU7Z0JBQzFCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO2lCQUNJO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDTSw4REFBd0IsR0FBakMsVUFBa0MsTUFBa0MsRUFBRSxTQUFpQjtZQUNuRixJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFDLFNBQVMsSUFBSyxPQUFBLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUE1QixDQUE0QixDQUFDLENBQUM7WUFFNUYsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUM1QixJQUFJLE9BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUN6QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3hDO3FCQUNJO29CQUNELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztpQkFDN0I7YUFDSjtpQkFDSTtnQkFDRCxPQUFPLEVBQUUsQ0FBQTthQUNaO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ00sK0RBQXlCLEdBQWxDLFVBQW1DLFVBQXdDLEVBQUUsOEJBQW9EO1lBQzdILElBQUksZUFBZSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTLElBQU0sT0FBTyw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEgsT0FBTyxlQUFlLENBQUM7UUFDM0IsQ0FBQztRQUVMLGtDQUFDO0lBQUQsQ0FBQyxBQXhMRCxJQXdMQztJQUVPLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0IH0gZnJvbSBcIi4vbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFwiO1xyXG5pbXBvcnQgeyBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tIFwiLi9wYXJhbWV0ZXJGaWx0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgdXNlZCB0byBjaGFuZ2UgdGhlIHZpc2liaWxpdHkgb2YgbWV0aG9kIGlucHV0IHBhcmFtZXRlcnMgXHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRob2RQYXJhbWV0ZXJGaWx0ZXJIZWxwZXJcclxuICovXHJcbmNsYXNzIE1ldGhvZFBhcmFtZXRlckZpbHRlckhlbHBlciB7XHJcblxyXG4gICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXJzTWFwcGluZzogTWFwPHN0cmluZywgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT4gPSBuZXcgTWFwKCk7XHJcbiAgICB3aWRnZXQ6IFdpZGdldHMuSU1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQ7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHdpZGdldDogTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCkge1xyXG4gICAgICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG1ldGhvZCBhbmQgZmlsdGVyZWQgcGFyYW1ldGVycyB0byBtYXBwaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJGaWx0ZXJIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZE1ldGhvZElucHV0UGFyYW1ldGVycyhtZXRob2QpIHtcclxuICAgICAgICBsZXQgaW5wdXRQYXJhbWV0ZXJzID0gdGhpcy5nZXRGaWx0ZXJlZElucHV0UGFyYW1ldGVycyhtZXRob2QpO1xyXG5cclxuICAgICAgICAvLyBhZGQgbWFwcGluZyBvZiBtZXRob2QgYW5kIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICB0aGlzLm1ldGhvZElucHV0UGFyYW1ldGVyc01hcHBpbmcuc2V0KG1ldGhvZC5icm93c2VOYW1lLCBpbnB1dFBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIFRyaWdnZXJlZCB3aGVuIGVkaXQgY2VsbCBoYXMgZmluaXNoZWQuIEZpbHRlcnMgaW5wdXQgcGFyYW1ldGVycyBhbmQgdXBkYXRlIHBhcmFtZXRlciBsaXN0IGlmIG5lZWQgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB8IHVuZGVmaW5lZCl9IGFjdHVhbE1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckZpbHRlckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZW5kVHJlZWdyaWRFZGl0KGFjdHVhbE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAoYWN0dWFsTWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2aW91c0lucHV0UGFyYW1ldGVycyA9IHRoaXMubWV0aG9kSW5wdXRQYXJhbWV0ZXJzTWFwcGluZy5nZXQoYWN0dWFsTWV0aG9kLmJyb3dzZU5hbWUpIGFzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW107XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZElucHV0UGFyYW1ldGVycyA9IHRoaXMuZ2V0RmlsdGVyZWRJbnB1dFBhcmFtZXRlcnMoYWN0dWFsTWV0aG9kKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBtYXBwaW5nIG9mIG1ldGhvZCBhbmQgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICB0aGlzLm1ldGhvZElucHV0UGFyYW1ldGVyc01hcHBpbmcuc2V0KGFjdHVhbE1ldGhvZC5icm93c2VOYW1lLCBmaWx0ZXJlZElucHV0UGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0lmIHBhcmFtZXRlcnMgYXJlIHRoZSBzYW1lLCBkb24ndCB1cGRhdGUgcGFyYW1ldGVyIGxpc3RcclxuICAgICAgICAgICAgbGV0IHVwZGF0ZSA9IHRoaXMuYXJlSW5wdXRQYXJhbWV0ZXJzQ2hhbmdlZChwcmV2aW91c0lucHV0UGFyYW1ldGVycywgZmlsdGVyZWRJbnB1dFBhcmFtZXRlcnMpXHJcbiAgICAgICAgICAgIGlmICh1cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2lkZ2V0LnVwZGF0ZVBhcmFtZXRlcnNMaXN0KGFjdHVhbE1ldGhvZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiBpbnB1dCBwYXJhbWV0ZXJzIGhhdmUgYmVlbiBmaWx0ZXJlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW119IGFjdHVhbFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXX0gZmlsdGVyZWRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJGaWx0ZXJIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhcmVJbnB1dFBhcmFtZXRlcnNDaGFuZ2VkKGFjdHVhbFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10sIGZpbHRlcmVkUGFyYW1ldGVyczogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChhY3R1YWxQYXJhbWV0ZXJzLmxlbmd0aCA9PT0gZmlsdGVyZWRQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdHVhbFBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3R1YWxQYXJhbWV0ZXJzW2ldICE9PSBmaWx0ZXJlZFBhcmFtZXRlcnNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0lmIGFsbCBwYXJhbWV0ZXJzIGFyZSB0aGUgc2FtZSwgcmV0dXJucyBmYWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGZpbHRlcmVkIGlucHV0IHBhcmFtYXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJGaWx0ZXJIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRGaWx0ZXJlZElucHV0UGFyYW1ldGVycyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IGlucHV0UGFyYW1ldGVyc1Zpc2liaWxpdHlTdGF0ZSA9IHRoaXMuaW5pdElucHV0UGFyYW1ldGVyc1Zpc2liaWxpdHlTdGF0ZShtZXRob2QuaW5wdXRQYXJhbWV0ZXJzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcnNWaXNpYmlsaXR5U3RhdGUobWV0aG9kLCBpbnB1dFBhcmFtZXRlcnNWaXNpYmlsaXR5U3RhdGUpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRQYXJhbWV0ZXJzU2hvd24gPSB0aGlzLmdldFVwZGF0ZWRJbnB1dFBhcmFtZXRlcnMobWV0aG9kLmlucHV0UGFyYW1ldGVycywgaW5wdXRQYXJhbWV0ZXJzVmlzaWJpbGl0eVN0YXRlKTtcclxuICAgICAgICByZXR1cm4gaW5wdXRQYXJhbWV0ZXJzU2hvd247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBtYXBwaW5nIG9mIGVhY2ggaW5wdXQgcGFyYW1ldGVyIGFuZCBpdHMgdmlzaWJsZSBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW119IGlucHV0UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge01hcDxzdHJpbmcsIGJvb2xlYW4+fVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckZpbHRlckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRJbnB1dFBhcmFtZXRlcnNWaXNpYmlsaXR5U3RhdGUoaW5wdXRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdKTogTWFwPHN0cmluZywgYm9vbGVhbj4ge1xyXG4gICAgICAgIGxldCBpbnB1dFBhcmFtRmlsdGVyU3RhdGUgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgaW5wdXRQYXJhbWV0ZXJzLmZvckVhY2goKGlucHV0UGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vSW5pdGlhbGl6ZSBhbGwgaW5wdXQgcGFyYW1ldGVycyB0byB2aXNpYmxlIHN0YXRlXHJcbiAgICAgICAgICAgIGlucHV0UGFyYW1GaWx0ZXJTdGF0ZS5zZXQoaW5wdXRQYXJhbWV0ZXIubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gaW5wdXRQYXJhbUZpbHRlclN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHZpc2libGUgc3RhdGUgb2YgdGhlIGlucHV0IHBhcmFtZXRlciBtYXBwaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCBib29sZWFuPn0gaW5wdXRQYXJhbWV0ZXJzVmlzaWJpbGl0eVN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyRmlsdGVySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUGFyYW1ldGVyc1Zpc2liaWxpdHlTdGF0ZShtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBpbnB1dFBhcmFtZXRlcnNWaXNpYmlsaXR5U3RhdGU6IE1hcDxzdHJpbmcsIGJvb2xlYW4+KSB7XHJcbiAgICAgICAgLy9HZXQganVzdCBwYXJhbWV0ZXJzIHRoYXQgYXJlIHVzaW5nIHRoZSBmaWx0ZXIgbWVjaGFuaXNtXHJcbiAgICAgICAgbGV0IHBhcmFtZXRlcnNXaXRoRmlsdGVyID0gbWV0aG9kLmlucHV0UGFyYW1ldGVycy5maWx0ZXIoKHBhcmFtZXRlcikgPT4gcGFyYW1ldGVyLmZpbHRlci5wYXJhbWV0ZXJSZWYgIT09ICcnKTtcclxuXHJcbiAgICAgICAgcGFyYW1ldGVyc1dpdGhGaWx0ZXIuZm9yRWFjaCgocGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRmlsdGVyQWN0aXZhdGVkKG1ldGhvZCwgcGFyYW1ldGVyLmZpbHRlcikpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0UGFyYW1ldGVyc1Zpc2liaWxpdHlTdGF0ZS5zZXQocGFyYW1ldGVyLm5hbWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlucHV0UGFyYW1ldGVyc1Zpc2liaWxpdHlTdGF0ZS5zZXQocGFyYW1ldGVyLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzdGF0ZSBvZiBmaWx0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RcclxuICAgICAqIEBwYXJhbSB7UGFyYW1ldGVyRmlsdGVyfSBmaWx0ZXJcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckZpbHRlckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRmlsdGVyQWN0aXZhdGVkKG1ldGhvZCwgZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgcGFyYW1ldGVyUmVmVmFsdWUgPSB0aGlzLmdldFZhbHVlRnJvbVBhcmFtZXRlclJlZihtZXRob2QsIGZpbHRlci5wYXJhbWV0ZXJSZWYpO1xyXG4gICAgICAgIGxldCB2YWx1ZUZvdW5kID0gZmlsdGVyLnBhcmFtZXRlclZhbHVlcy5maW5kKChwYXJhbWV0ZXJWYWx1ZSkgPT4gcGFyYW1ldGVyUmVmVmFsdWUgPT09IHBhcmFtZXRlclZhbHVlKTtcclxuICAgICAgICBcclxuICAgICAgICAvL0lmIHZhbHVlIGlzIGZvdW5kLCBmaWx0ZXIgaXMgbm90IGFjdGl2YXRlZFxyXG4gICAgICAgIGlmICh2YWx1ZUZvdW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHZhbHVlIG5lZWQgaXQgZm9yIGZpbHRlcmluZyBmcm9tIHBhcmFtZXRlciByZWZlcmVuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmZXJlbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckZpbHRlckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlICBnZXRWYWx1ZUZyb21QYXJhbWV0ZXJSZWYobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgcmVmZXJlbmNlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBwYXJhbWV0ZXJSZWYgPSBtZXRob2QuaW5wdXRQYXJhbWV0ZXJzLmZpbmQoKHBhcmFtZXRlcikgPT4gcGFyYW1ldGVyLm5hbWUgPT09IHJlZmVyZW5jZSk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJSZWYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mKHBhcmFtZXRlclJlZi52YWx1ZSkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1ldGVyUmVmLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1ldGVyUmVmLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4ganVzdCB2aXNpYmxlIGlucHV0UGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXX0gcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCBib29sZWFuPn0gaW5wdXRQYXJhbWV0ZXJzVmlzaWJpbGl0eVN0YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJGaWx0ZXJIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSAgZ2V0VXBkYXRlZElucHV0UGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdLCBpbnB1dFBhcmFtZXRlcnNWaXNpYmlsaXR5U3RhdGU6IE1hcDxzdHJpbmcsIGJvb2xlYW4+KTogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IGlucHV0UGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiB7IHJldHVybiBpbnB1dFBhcmFtZXRlcnNWaXNpYmlsaXR5U3RhdGUuZ2V0KHBhcmFtZXRlci5uYW1lKSB9KTtcclxuICAgICAgICByZXR1cm4gaW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtNZXRob2RQYXJhbWV0ZXJGaWx0ZXJIZWxwZXJ9OyJdfQ==
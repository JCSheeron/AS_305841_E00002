define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Class that handles the evaluation of metadata expressions
     *
     * @class StateExpression
     */
    var StateExpression = /** @class */ (function () {
        function StateExpression(name, expression, watchableVariableDeclaration) {
            //Holds variable declaration for expression variables
            this.mathjsVarDeclaration = {};
            this.name = name;
            this.expression = expression;
            this.watchableMapping = new Map(watchableVariableDeclaration);
            this.initializeMathjsVarDeclaration();
        }
        /**
         * Initialize mathjsvarDeclaration, used for the expression
         *
         * @private
         * @returns {MathjsVariableDeclaration}
         * @memberof StateExpression
         */
        StateExpression.prototype.initializeMathjsVarDeclaration = function () {
            var _this = this;
            this.watchableMapping.forEach(function (expressionVar, key) {
                _this.mathjsVarDeclaration[expressionVar] = null;
            });
        };
        /**
         * Update variable declaration with the given watchable variable
         *
         * @protected
         * @param {MappCockpitComponentParameter} watchable
         * @memberof StateExpression
         */
        StateExpression.prototype.updateMathjsVarDeclaration = function (watchable) {
            var expressionVar = this.watchableMapping.get(watchable.browseName);
            if (expressionVar !== undefined) {
                this.mathjsVarDeclaration[expressionVar] = this.getWatchableValueAsNumber(watchable.value);
            }
        };
        /**
         * Return watchable value as number so it can be evaluated by mathjs
         *
         * @private
         * @param {(number | string)} value
         * @returns {(number | null)}
         * @memberof StateExpression
         */
        StateExpression.prototype.getWatchableValueAsNumber = function (value) {
            if (typeof (value) == 'number') {
                return value;
            }
            else if (typeof (value) == 'boolean') {
                return value ? 1 : 0;
            }
            else {
                return null;
            }
        };
        return StateExpression;
    }());
    exports.StateExpression = StateExpression;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVFeHByZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3N0YXRlRXhwcmVzc2lvbi9jb21tb24vc3RhdGVFeHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBOzs7O09BSUc7SUFDSDtRQVdJLHlCQUFtQixJQUFZLEVBQUUsVUFBa0IsRUFBRSw0QkFBcUQ7WUFIMUcscURBQXFEO1lBQzlDLHlCQUFvQixHQUE4QixFQUFFLENBQUM7WUFHeEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDMUMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHdEQUE4QixHQUF0QztZQUFBLGlCQUlDO1lBSEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFDLGFBQWEsRUFBRSxHQUFHO2dCQUM3QyxLQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLG9EQUEwQixHQUFwQyxVQUFxQyxTQUF3QztZQUN6RSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRSxJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlGO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxtREFBeUIsR0FBakMsVUFBa0MsS0FBc0I7WUFDcEQsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxFQUFFO2dCQUM1QixPQUFPLEtBQUssQ0FBQzthQUNoQjtpQkFDSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2xDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QjtpQkFDSTtnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNmO1FBQ0wsQ0FBQztRQUVMLHNCQUFDO0lBQUQsQ0FBQyxBQWpFRCxJQWlFQztJQUVPLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hdGhqc1ZhcmlhYmxlRGVjbGFyYXRpb24gfSBmcm9tIFwiLi9tYXRoanNWYXJpYWJsZURlY2xhcmF0aW9uXCI7XHJcblxyXG4vKipcclxuICogQ2xhc3MgdGhhdCBoYW5kbGVzIHRoZSBldmFsdWF0aW9uIG9mIG1ldGFkYXRhIGV4cHJlc3Npb25zXHJcbiAqXHJcbiAqIEBjbGFzcyBTdGF0ZUV4cHJlc3Npb25cclxuICovXHJcbmNsYXNzIFN0YXRlRXhwcmVzc2lvbntcclxuXHJcbiAgICAvL0hvbGRzIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICAvL0hvbGRzIHRoZSBleHByZXNzaW9uIHVzZWQgdG8gZXZhbHVhdGUgdGhlIGVuYWJsZWQgc3RhdGVcclxuICAgIHB1YmxpYyBleHByZXNzaW9uOiBzdHJpbmc7XHJcbiAgICAvL0hvbGRzIHRoZSB2YXJpYWJsZSBtYXBwaW5nIG9mIHdhdGNoYWJsZSB2YXJpYWJsZXMgYW5kIHRoZSBleHByZXNzaW9uXHJcbiAgICBwdWJsaWMgd2F0Y2hhYmxlTWFwcGluZzogTWFwPHN0cmluZyxzdHJpbmc+O1xyXG4gICAgLy9Ib2xkcyB2YXJpYWJsZSBkZWNsYXJhdGlvbiBmb3IgZXhwcmVzc2lvbiB2YXJpYWJsZXNcclxuICAgIHB1YmxpYyBtYXRoanNWYXJEZWNsYXJhdGlvbjogTWF0aGpzVmFyaWFibGVEZWNsYXJhdGlvbiA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGV4cHJlc3Npb246IHN0cmluZywgd2F0Y2hhYmxlVmFyaWFibGVEZWNsYXJhdGlvbjogQXJyYXk8W3N0cmluZywgc3RyaW5nXT4pe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcclxuICAgICAgICB0aGlzLndhdGNoYWJsZU1hcHBpbmcgPSBuZXcgTWFwKHdhdGNoYWJsZVZhcmlhYmxlRGVjbGFyYXRpb24pO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZU1hdGhqc1ZhckRlY2xhcmF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIG1hdGhqc3ZhckRlY2xhcmF0aW9uLCB1c2VkIGZvciB0aGUgZXhwcmVzc2lvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0aGpzVmFyaWFibGVEZWNsYXJhdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBTdGF0ZUV4cHJlc3Npb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplTWF0aGpzVmFyRGVjbGFyYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy53YXRjaGFibGVNYXBwaW5nLmZvckVhY2goKGV4cHJlc3Npb25WYXIsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hdGhqc1ZhckRlY2xhcmF0aW9uW2V4cHJlc3Npb25WYXJdID0gbnVsbDtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHZhcmlhYmxlIGRlY2xhcmF0aW9uIHdpdGggdGhlIGdpdmVuIHdhdGNoYWJsZSB2YXJpYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIFN0YXRlRXhwcmVzc2lvblxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlTWF0aGpzVmFyRGVjbGFyYXRpb24od2F0Y2hhYmxlOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIGxldCBleHByZXNzaW9uVmFyID0gdGhpcy53YXRjaGFibGVNYXBwaW5nLmdldCh3YXRjaGFibGUuYnJvd3NlTmFtZSk7XHJcbiAgICAgICAgaWYgKGV4cHJlc3Npb25WYXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hdGhqc1ZhckRlY2xhcmF0aW9uW2V4cHJlc3Npb25WYXJdID0gdGhpcy5nZXRXYXRjaGFibGVWYWx1ZUFzTnVtYmVyKHdhdGNoYWJsZS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHdhdGNoYWJsZSB2YWx1ZSBhcyBudW1iZXIgc28gaXQgY2FuIGJlIGV2YWx1YXRlZCBieSBtYXRoanNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgbnVsbCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RhdGVFeHByZXNzaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0V2F0Y2hhYmxlVmFsdWVBc051bWJlcih2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtTdGF0ZUV4cHJlc3Npb259OyJdfQ==
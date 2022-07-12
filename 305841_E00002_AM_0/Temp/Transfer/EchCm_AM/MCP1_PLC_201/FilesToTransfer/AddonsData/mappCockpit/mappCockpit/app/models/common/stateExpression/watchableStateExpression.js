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
define(["require", "exports", "../../../libs/math/mathjs", "../../online/mappCockpitComponent", "./watchableIcon", "./common/stateExpression", "../../../framework/events"], function (require, exports, math, mappCockpitComponent_1, watchableIcon_1, stateExpression_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventIconUpdated = /** @class */ (function (_super) {
        __extends(EventIconUpdated, _super);
        function EventIconUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventIconUpdated;
    }(events_1.TypedEvent));
    ;
    /**
     * Class that handles evaluation of expression for watchableState parameters
     *
     * @class WatchableStateExpression
     * @extends {StateExpression}
     */
    var WatchableStateExpression = /** @class */ (function (_super) {
        __extends(WatchableStateExpression, _super);
        function WatchableStateExpression(name, expression, watchableVariableDeclaration, icon) {
            if (name === void 0) { name = ''; }
            if (expression === void 0) { expression = ''; }
            if (watchableVariableDeclaration === void 0) { watchableVariableDeclaration = []; }
            if (icon === void 0) { icon = {}; }
            var _this = _super.call(this, name, expression, watchableVariableDeclaration) || this;
            // event that will be raised when an icon is updated
            _this.eventIconUpdated = new EventIconUpdated();
            // holds the icon value given by the expression
            _this._iconValue = null;
            _this.watchableIcons = _this.initializeWatchableIcon(icon);
            return _this;
        }
        /**
         * Return a map of WatchableIcon with the value assigned in the metaData
         *
         * @private
         * @param {*} icon
         * @returns {Map<number, WatchableIcon>}
         * @memberof WatchableStateExpression
         */
        WatchableStateExpression.prototype.initializeWatchableIcon = function (icon) {
            var watchableIcon = new Map();
            for (var value in icon) {
                watchableIcon.set(parseInt(value), new watchableIcon_1.WatchableIcon(icon[value].ImageName, icon[value].Tooltip));
            }
            return watchableIcon;
        };
        /**
         * Update icon value
         *
         * @private
         * @param {MappCockpitComponentParameter} watchable
         * @memberof WatchableStateExpression
         */
        WatchableStateExpression.prototype.updateIconValue = function (watchable) {
            this.updateMathjsVarDeclaration(watchable);
            this._iconValue = this.getIconValue();
            var watchableIcon = this.getWatchableIcon();
            this.onIconUpdated(this.name, watchableIcon);
        };
        WatchableStateExpression.prototype.observeWatchables = function (watchableParameters) {
            // invoke observing the watchables
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, watchableParameters);
        };
        /**
         * Called after change of observable
         *
         * @param {Observable[]} changedObservables
         * @memberof WatchableStateExpression
         */
        WatchableStateExpression.prototype.onObservablesChanged = function (changedObservables) {
            var _this = this;
            changedObservables.forEach(function (observable) {
                if (observable.property === "Value") {
                    var watchableParameter = observable.object;
                    _this.updateIconValue(watchableParameter);
                }
            });
        };
        /**
         * Get value of evaluated expression
         *
         * @private
         * @returns {boolean}
         * @memberof WatchableStateExpression
         */
        WatchableStateExpression.prototype.getIconValue = function () {
            if (Object.values(this.mathjsVarDeclaration).every(function (elem) { return typeof (elem) === 'number'; })) {
                return math.evaluate(this.expression, this.mathjsVarDeclaration);
            }
            else {
                //If one value of mathjsVarDeclaration is not a number, return null as invalid
                return null;
            }
        };
        /**
         * Get watchableIcon according to its value
         *
         * @private
         * @returns {WatchableIcon}
         * @memberof WatchableStateExpression
         */
        WatchableStateExpression.prototype.getWatchableIcon = function () {
            var watchableIcon;
            if (this._iconValue !== null && this.watchableIcons.has(this._iconValue)) {
                watchableIcon = this.watchableIcons.get(this._iconValue);
            }
            else {
                watchableIcon = watchableIcon_1.WatchableIcon.getUnkownWatchableIcon();
            }
            return watchableIcon;
        };
        Object.defineProperty(WatchableStateExpression.prototype, "iconValue", {
            /**
             * Get icon value
             *
             * @readonly
             * @type {(number | null)}
             * @memberof WatchableStateExpression
             */
            get: function () {
                return this._iconValue;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Triggers the event
         *
         * @private
         * @memberof WatchableStateExpression
         */
        WatchableStateExpression.prototype.onIconUpdated = function (name, watchableIcon) {
            this.eventIconUpdated.raise(null, { name: name, watchableIcon: watchableIcon });
        };
        return WatchableStateExpression;
    }(stateExpression_1.StateExpression));
    exports.WatchableStateExpression = WatchableStateExpression;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3N0YXRlRXhwcmVzc2lvbi93YXRjaGFibGVTdGF0ZUV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQStCLG9DQUE4RDtRQUE3Rjs7UUFBK0YsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUFoRyxDQUErQixtQkFBVSxHQUF1RDtJQUFBLENBQUM7SUFFakc7Ozs7O09BS0c7SUFDSDtRQUF1Qyw0Q0FBZTtRQVVsRCxrQ0FBbUIsSUFBaUIsRUFBRSxVQUF1QixFQUFFLDRCQUEwRCxFQUFFLElBQVM7WUFBakgscUJBQUEsRUFBQSxTQUFpQjtZQUFFLDJCQUFBLEVBQUEsZUFBdUI7WUFBRSw2Q0FBQSxFQUFBLGlDQUEwRDtZQUFFLHFCQUFBLEVBQUEsU0FBUztZQUFwSSxZQUNJLGtCQUFNLElBQUksRUFBRSxVQUFVLEVBQUUsNEJBQTRCLENBQUMsU0FFeEQ7WUFYRCxvREFBb0Q7WUFDN0Msc0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBRWpELCtDQUErQztZQUN2QyxnQkFBVSxHQUFrQixJQUFJLENBQUM7WUFNckMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBQzdELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssMERBQXVCLEdBQS9CLFVBQWdDLElBQUk7WUFDaEMsSUFBSSxhQUFhLEdBQStCLElBQUksR0FBRyxFQUFFLENBQUM7WUFDMUQsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ3BCLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksNkJBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQ3BHO1lBQ0QsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGtEQUFlLEdBQXZCLFVBQXdCLFNBQXdDO1lBQzVELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVNLG9EQUFpQixHQUF4QixVQUF5QixtQkFBb0Q7WUFDekUsa0NBQWtDO1lBQ2xDLG9EQUE2QixDQUFDLDRCQUE0QixDQUFDLElBQUksRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHVEQUFvQixHQUEzQixVQUE0QixrQkFBZ0M7WUFBNUQsaUJBT0M7WUFORyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO2dCQUNsQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO29CQUNqQyxJQUFJLGtCQUFrQixHQUFpQyxVQUFVLENBQUMsTUFBdUMsQ0FBQztvQkFDMUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLCtDQUFZLEdBQXBCO1lBQ0ksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLE9BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLEVBQXpCLENBQXlCLENBQUMsRUFBRTtnQkFDbkYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDcEU7aUJBQ0k7Z0JBQ0QsOEVBQThFO2dCQUM5RSxPQUFPLElBQUksQ0FBQzthQUNmO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1EQUFnQixHQUF4QjtZQUNJLElBQUksYUFBNEIsQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDdEUsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQWtCLENBQUM7YUFDN0U7aUJBQ0k7Z0JBQ0QsYUFBYSxHQUFHLDZCQUFhLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzthQUMxRDtZQUNELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFTRCxzQkFBVywrQ0FBUztZQVBwQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBRUQ7Ozs7O1dBS0c7UUFDSyxnREFBYSxHQUFyQixVQUFzQixJQUFZLEVBQUUsYUFBNEI7WUFDNUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLE1BQUEsRUFBRSxhQUFhLGVBQUEsRUFBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVMLCtCQUFDO0lBQUQsQ0FBQyxBQXpIRCxDQUF1QyxpQ0FBZSxHQXlIckQ7SUFFTyw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtYXRoIGZyb20gXCIuLi8uLi8uLi9saWJzL21hdGgvbWF0aGpzXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBXYXRjaGFibGVJY29uIH0gZnJvbSBcIi4vd2F0Y2hhYmxlSWNvblwiO1xyXG5pbXBvcnQgeyBTdGF0ZUV4cHJlc3Npb24gfSBmcm9tIFwiLi9jb21tb24vc3RhdGVFeHByZXNzaW9uXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcblxyXG5jbGFzcyBFdmVudEljb25VcGRhdGVkIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCB7bmFtZTogc3RyaW5nLCB3YXRjaGFibGVJY29uOiBXYXRjaGFibGVJY29ufT57IH07XHJcblxyXG4vKipcclxuICogQ2xhc3MgdGhhdCBoYW5kbGVzIGV2YWx1YXRpb24gb2YgZXhwcmVzc2lvbiBmb3Igd2F0Y2hhYmxlU3RhdGUgcGFyYW1ldGVyc1xyXG4gKlxyXG4gKiBAY2xhc3MgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXHJcbiAqIEBleHRlbmRzIHtTdGF0ZUV4cHJlc3Npb259XHJcbiAqL1xyXG5jbGFzcyBXYXRjaGFibGVTdGF0ZUV4cHJlc3Npb24gZXh0ZW5kcyBTdGF0ZUV4cHJlc3Npb257XHJcblxyXG4gICAgLy8gZXZlbnQgdGhhdCB3aWxsIGJlIHJhaXNlZCB3aGVuIGFuIGljb24gaXMgdXBkYXRlZFxyXG4gICAgcHVibGljIGV2ZW50SWNvblVwZGF0ZWQgPSBuZXcgRXZlbnRJY29uVXBkYXRlZCgpO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBpY29uIHZhbHVlIGdpdmVuIGJ5IHRoZSBleHByZXNzaW9uXHJcbiAgICBwcml2YXRlIF9pY29uVmFsdWU6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgLy8gaG9sZHMgYSBtYXBwaW5nIGJldHdlZW4gdGhlIHZhbHVlIG9mIHRoZSBleHByZXNzaW9uIGFuZCBpY29uIHByb3BlcnRpZXMgZ2l2ZW4gaW4gdGhlIG1ldGFkYXRhXHJcbiAgICBwdWJsaWMgd2F0Y2hhYmxlSWNvbnM6IE1hcDxudW1iZXIsIFdhdGNoYWJsZUljb24+O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcgPSAnJywgZXhwcmVzc2lvbjogc3RyaW5nID0gJycsIHdhdGNoYWJsZVZhcmlhYmxlRGVjbGFyYXRpb246IEFycmF5PFtzdHJpbmcsIHN0cmluZ10+ID0gW10sIGljb24gPSB7fSl7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgZXhwcmVzc2lvbiwgd2F0Y2hhYmxlVmFyaWFibGVEZWNsYXJhdGlvbik7XHJcbiAgICAgICAgdGhpcy53YXRjaGFibGVJY29ucyA9IHRoaXMuaW5pdGlhbGl6ZVdhdGNoYWJsZUljb24oaWNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBtYXAgb2YgV2F0Y2hhYmxlSWNvbiB3aXRoIHRoZSB2YWx1ZSBhc3NpZ25lZCBpbiB0aGUgbWV0YURhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBpY29uXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwPG51bWJlciwgV2F0Y2hhYmxlSWNvbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVdhdGNoYWJsZUljb24oaWNvbik6IE1hcDxudW1iZXIsIFdhdGNoYWJsZUljb24+IHtcclxuICAgICAgICBsZXQgd2F0Y2hhYmxlSWNvbjogTWFwPG51bWJlciwgV2F0Y2hhYmxlSWNvbj4gPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgZm9yICh2YXIgdmFsdWUgaW4gaWNvbikge1xyXG4gICAgICAgICAgICB3YXRjaGFibGVJY29uLnNldChwYXJzZUludCh2YWx1ZSksIG5ldyBXYXRjaGFibGVJY29uKGljb25bdmFsdWVdLkltYWdlTmFtZSwgaWNvblt2YWx1ZV0uVG9vbHRpcCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3YXRjaGFibGVJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGljb24gdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSWNvblZhbHVlKHdhdGNoYWJsZTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdGhqc1ZhckRlY2xhcmF0aW9uKHdhdGNoYWJsZSk7XHJcbiAgICAgICAgdGhpcy5faWNvblZhbHVlID0gdGhpcy5nZXRJY29uVmFsdWUoKTtcclxuICAgICAgICBsZXQgd2F0Y2hhYmxlSWNvbiA9IHRoaXMuZ2V0V2F0Y2hhYmxlSWNvbigpO1xyXG4gICAgICAgIHRoaXMub25JY29uVXBkYXRlZCh0aGlzLm5hbWUsIHdhdGNoYWJsZUljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvYnNlcnZlV2F0Y2hhYmxlcyh3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgLy8gaW52b2tlIG9ic2VydmluZyB0aGUgd2F0Y2hhYmxlc1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLm9ic2VydmVQYXJhbWV0ZXJWYWx1ZUNoYW5nZXModGhpcyx3YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBjaGFuZ2Ugb2Ygb2JzZXJ2YWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JzZXJ2YWJsZVtdfSBjaGFuZ2VkT2JzZXJ2YWJsZXNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVTdGF0ZUV4cHJlc3Npb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uT2JzZXJ2YWJsZXNDaGFuZ2VkKGNoYW5nZWRPYnNlcnZhYmxlczogT2JzZXJ2YWJsZVtdKSB7XHJcbiAgICAgICAgY2hhbmdlZE9ic2VydmFibGVzLmZvckVhY2goKG9ic2VydmFibGUpPT57XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZhYmxlLnByb3BlcnR5ID09PSBcIlZhbHVlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3YXRjaGFibGVQYXJhbWV0ZXI6TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgPSBvYnNlcnZhYmxlLm9iamVjdCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSWNvblZhbHVlKHdhdGNoYWJsZVBhcmFtZXRlcik7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdmFsdWUgb2YgZXZhbHVhdGVkIGV4cHJlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SWNvblZhbHVlKCk6IG51bWJlciB8IG51bGx7XHJcbiAgICAgICAgaWYgKE9iamVjdC52YWx1ZXModGhpcy5tYXRoanNWYXJEZWNsYXJhdGlvbikuZXZlcnkoZWxlbSA9PiB0eXBlb2YoZWxlbSkgPT09ICdudW1iZXInKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0aC5ldmFsdWF0ZSh0aGlzLmV4cHJlc3Npb24sIHRoaXMubWF0aGpzVmFyRGVjbGFyYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9JZiBvbmUgdmFsdWUgb2YgbWF0aGpzVmFyRGVjbGFyYXRpb24gaXMgbm90IGEgbnVtYmVyLCByZXR1cm4gbnVsbCBhcyBpbnZhbGlkXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB3YXRjaGFibGVJY29uIGFjY29yZGluZyB0byBpdHMgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge1dhdGNoYWJsZUljb259XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0V2F0Y2hhYmxlSWNvbigpOiBXYXRjaGFibGVJY29uIHtcclxuICAgICAgICBsZXQgd2F0Y2hhYmxlSWNvbjogV2F0Y2hhYmxlSWNvbjtcclxuICAgICAgICBpZiAodGhpcy5faWNvblZhbHVlICE9PSBudWxsICYmIHRoaXMud2F0Y2hhYmxlSWNvbnMuaGFzKHRoaXMuX2ljb25WYWx1ZSkpIHtcclxuICAgICAgICAgICAgd2F0Y2hhYmxlSWNvbiA9IHRoaXMud2F0Y2hhYmxlSWNvbnMuZ2V0KHRoaXMuX2ljb25WYWx1ZSkgYXMgV2F0Y2hhYmxlSWNvbjsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3YXRjaGFibGVJY29uID0gV2F0Y2hhYmxlSWNvbi5nZXRVbmtvd25XYXRjaGFibGVJY29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3YXRjaGFibGVJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGljb24gdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsobnVtYmVyIHwgbnVsbCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaWNvblZhbHVlKCk6IG51bWJlciB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pY29uVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VycyB0aGUgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZVN0YXRlRXhwcmVzc2lvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uSWNvblVwZGF0ZWQobmFtZTogc3RyaW5nLCB3YXRjaGFibGVJY29uOiBXYXRjaGFibGVJY29uKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudEljb25VcGRhdGVkLnJhaXNlKG51bGwsIHtuYW1lLCB3YXRjaGFibGVJY29ufSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge1dhdGNoYWJsZVN0YXRlRXhwcmVzc2lvbn07Il19
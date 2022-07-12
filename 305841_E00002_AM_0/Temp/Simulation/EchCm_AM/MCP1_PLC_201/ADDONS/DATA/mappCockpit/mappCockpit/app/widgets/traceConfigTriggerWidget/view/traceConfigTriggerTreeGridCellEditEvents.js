define(["require", "exports", "../model/triggerGroup"], function (require, exports, triggerGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigTriggerTreeGridCellEditEvents = /** @class */ (function () {
        function TraceConfigTriggerTreeGridCellEditEvents() {
        }
        TraceConfigTriggerTreeGridCellEditEvents.prototype.beginEdit = function (args) {
            if (args.columnIndex != 1) {
                // Only value column cells can be edited
                args.cancel = true;
                return;
            }
            if (args.data.item instanceof triggerGroup_1.TriggerGroup) {
                // supress editing of trigger group value
                args.cancel = true;
                return;
            }
        };
        TraceConfigTriggerTreeGridCellEditEvents.prototype.endEdit = function (args) {
            if (args.columnObject.field == "displayValue") {
                var value = args.value;
                var componentParameter = args.data.componentParameter;
                if (componentParameter.enumType.values != undefined) {
                    for (var i = 0; i < componentParameter.enumType.values.length; i++) {
                        var enumItem = componentParameter.enumType.values[i];
                        if (enumItem.displayValue == args.value) {
                            value = enumItem.value;
                            break;
                        }
                    }
                }
                args.data.parentItem.setValue(args.data.item, value);
            }
        };
        return TraceConfigTriggerTreeGridCellEditEvents;
    }());
    exports.TraceConfigTriggerTreeGridCellEditEvents = TraceConfigTriggerTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdEV2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQvdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0RXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7UUE4QkEsQ0FBQztRQTdCRyw0REFBUyxHQUFULFVBQVUsSUFBSTtZQUNWLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQUM7Z0JBQ3JCLHdDQUF3QztnQkFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksMkJBQVksRUFBQztnQkFDdEMseUNBQXlDO2dCQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsT0FBTzthQUNWO1FBQ0wsQ0FBQztRQUVELDBEQUFPLEdBQVAsVUFBUSxJQUFJO1lBQ1IsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxjQUFjLEVBQUM7Z0JBQ3pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBbUQsQ0FBQztnQkFDdkYsSUFBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBQztvQkFDL0MsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO3dCQUM1RCxJQUFJLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyRCxJQUFHLFFBQVEsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssRUFBQzs0QkFDbkMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7NEJBQ3ZCLE1BQU07eUJBQ1Q7cUJBQ0o7aUJBQ0o7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3hEO1FBQ0wsQ0FBQztRQUNMLCtDQUFDO0lBQUQsQ0FBQyxBQTlCRCxJQThCQztJQTlCWSw0RkFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmlnZ2VyR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWwvdHJpZ2dlckdyb3VwXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0RXZlbnRze1xyXG4gICAgYmVnaW5FZGl0KGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggIT0gMSl7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgdmFsdWUgY29sdW1uIGNlbGxzIGNhbiBiZSBlZGl0ZWRcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFyZ3MuZGF0YS5pdGVtIGluc3RhbmNlb2YgVHJpZ2dlckdyb3VwKXtcclxuICAgICAgICAgICAgLy8gc3VwcmVzcyBlZGl0aW5nIG9mIHRyaWdnZXIgZ3JvdXAgdmFsdWVcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZEVkaXQoYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5PYmplY3QuZmllbGQgPT0gXCJkaXNwbGF5VmFsdWVcIil7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGFyZ3MudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRQYXJhbWV0ZXIgPSBhcmdzLmRhdGEuY29tcG9uZW50UGFyYW1ldGVyIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyO1xyXG4gICAgICAgICAgICBpZihjb21wb25lbnRQYXJhbWV0ZXIuZW51bVR5cGUudmFsdWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGNvbXBvbmVudFBhcmFtZXRlci5lbnVtVHlwZS52YWx1ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbnVtSXRlbSA9IGNvbXBvbmVudFBhcmFtZXRlci5lbnVtVHlwZS52YWx1ZXNbaV07IFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVudW1JdGVtLmRpc3BsYXlWYWx1ZSA9PSBhcmdzLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBlbnVtSXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZ3MuZGF0YS5wYXJlbnRJdGVtLnNldFZhbHVlKGFyZ3MuZGF0YS5pdGVtLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
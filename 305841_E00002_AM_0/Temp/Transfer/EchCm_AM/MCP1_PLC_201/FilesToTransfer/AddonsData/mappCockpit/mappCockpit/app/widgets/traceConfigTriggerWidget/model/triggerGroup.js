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
define(["require", "exports", "./triggerParameter"], function (require, exports, triggerParameter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TriggerPropertIds = /** @class */ (function () {
        function TriggerPropertIds() {
        }
        TriggerPropertIds.Condition = "condition";
        TriggerPropertIds.Datapoint = "datapoint";
        TriggerPropertIds.Threshold = "threshold";
        TriggerPropertIds.Window = "window";
        return TriggerPropertIds;
    }());
    exports.TriggerPropertIds = TriggerPropertIds;
    var TriggerGroup = /** @class */ (function (_super) {
        __extends(TriggerGroup, _super);
        function TriggerGroup(displayName, startTriggerRef) {
            var _this = _super.call(this, "", displayName, "", "", undefined) || this;
            _this.childs = new Array();
            _this._startTriggerRef = startTriggerRef;
            return _this;
        }
        TriggerGroup.prototype.setValue = function (triggerParameter, value) {
            if (triggerParameter.id == TriggerPropertIds.Condition) {
                this._startTriggerRef.condition = value;
            }
            else if (triggerParameter.id == TriggerPropertIds.Datapoint) {
                this._startTriggerRef.dataPointName = value;
            }
            else if (triggerParameter.id == TriggerPropertIds.Threshold) {
                this._startTriggerRef.threshold = value;
            }
            else if (triggerParameter.id == TriggerPropertIds.Window) {
                this._startTriggerRef.window = value;
            }
        };
        return TriggerGroup;
    }(triggerParameter_1.TriggerParameter));
    exports.TriggerGroup = TriggerGroup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlckdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC9tb2RlbC90cmlnZ2VyR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQUE7UUFLQSxDQUFDO1FBSm1CLDJCQUFTLEdBQUcsV0FBVyxDQUFDO1FBQ3hCLDJCQUFTLEdBQUcsV0FBVyxDQUFDO1FBQ3hCLDJCQUFTLEdBQUcsV0FBVyxDQUFDO1FBQ3hCLHdCQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLHdCQUFDO0tBQUEsQUFMRCxJQUtDO0lBNkJzQiw4Q0FBaUI7SUEzQnhDO1FBQTJCLGdDQUFnQjtRQUt2QyxzQkFBWSxXQUFtQixFQUFFLGVBQWtDO1lBQW5FLFlBQ0ksa0JBQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxTQUU1QztZQU5NLFlBQU0sR0FBdUIsSUFBSSxLQUFLLEVBQW9CLENBQUM7WUFLOUQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQzs7UUFDNUMsQ0FBQztRQUVNLCtCQUFRLEdBQWYsVUFBZ0IsZ0JBQWtDLEVBQUUsS0FBYTtZQUU3RCxJQUFHLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUM7Z0JBQ2xELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQzNDO2lCQUNJLElBQUcsZ0JBQWdCLENBQUMsRUFBRSxJQUFJLGlCQUFpQixDQUFDLFNBQVMsRUFBQztnQkFDdkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFDL0M7aUJBQ0ksSUFBRyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksaUJBQWlCLENBQUMsU0FBUyxFQUFDO2dCQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUMzQztpQkFDSSxJQUFHLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUM7Z0JBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3hDO1FBQ0wsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQXpCRCxDQUEyQixtQ0FBZ0IsR0F5QjFDO0lBRVEsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmlnZ2VyUGFyYW1ldGVyIH0gZnJvbSBcIi4vdHJpZ2dlclBhcmFtZXRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXJ0VHJpZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VTdGFydFRyaWdnZXJcIjtcclxuXHJcbmNsYXNzIFRyaWdnZXJQcm9wZXJ0SWRze1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IENvbmRpdGlvbiA9IFwiY29uZGl0aW9uXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGF0YXBvaW50ID0gXCJkYXRhcG9pbnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBUaHJlc2hvbGQgPSBcInRocmVzaG9sZFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFdpbmRvdyA9IFwid2luZG93XCI7XHJcbn1cclxuXHJcbmNsYXNzIFRyaWdnZXJHcm91cCBleHRlbmRzIFRyaWdnZXJQYXJhbWV0ZXJ7XHJcblxyXG4gICAgcHVibGljIGNoaWxkczogVHJpZ2dlclBhcmFtZXRlcltdID0gbmV3IEFycmF5PFRyaWdnZXJQYXJhbWV0ZXI+KCk7XHJcbiAgICBwcml2YXRlIF9zdGFydFRyaWdnZXJSZWY6IFRyYWNlU3RhcnRUcmlnZ2VyO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihkaXNwbGF5TmFtZTogc3RyaW5nLCBzdGFydFRyaWdnZXJSZWY6IFRyYWNlU3RhcnRUcmlnZ2VyKXtcclxuICAgICAgICBzdXBlcihcIlwiLCBkaXNwbGF5TmFtZSwgXCJcIiwgXCJcIiwgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJSZWYgPSBzdGFydFRyaWdnZXJSZWY7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXRWYWx1ZSh0cmlnZ2VyUGFyYW1ldGVyOiBUcmlnZ2VyUGFyYW1ldGVyLCB2YWx1ZTogc3RyaW5nKXtcclxuXHJcbiAgICAgICAgaWYodHJpZ2dlclBhcmFtZXRlci5pZCA9PSBUcmlnZ2VyUHJvcGVydElkcy5Db25kaXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJSZWYuY29uZGl0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJpZ2dlclBhcmFtZXRlci5pZCA9PSBUcmlnZ2VyUHJvcGVydElkcy5EYXRhcG9pbnQpe1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJSZWYuZGF0YVBvaW50TmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyaWdnZXJQYXJhbWV0ZXIuaWQgPT0gVHJpZ2dlclByb3BlcnRJZHMuVGhyZXNob2xkKXtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VyUmVmLnRocmVzaG9sZCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyaWdnZXJQYXJhbWV0ZXIuaWQgPT0gVHJpZ2dlclByb3BlcnRJZHMuV2luZG93KXtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VyUmVmLndpbmRvdyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJpZ2dlckdyb3VwLCBUcmlnZ2VyUHJvcGVydElkcyB9OyJdfQ==
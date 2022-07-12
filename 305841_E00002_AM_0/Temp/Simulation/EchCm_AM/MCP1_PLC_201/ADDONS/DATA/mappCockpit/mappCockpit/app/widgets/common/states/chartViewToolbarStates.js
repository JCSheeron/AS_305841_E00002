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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../../../framework/state", "../../chartViewWidget/chartViewWidget", "../../../framework/reflection/decorators/metaClassPropertyDecorator", "../../../framework/componentHub/common/commonTypes"], function (require, exports, state_1, chartViewWidget_1, Reflection, commonTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewToolStateEnum;
    (function (ChartViewToolStateEnum) {
        ChartViewToolStateEnum[ChartViewToolStateEnum["CURSORS"] = 0] = "CURSORS";
        ChartViewToolStateEnum[ChartViewToolStateEnum["PANNING"] = 1] = "PANNING";
        ChartViewToolStateEnum[ChartViewToolStateEnum["BOXZOOM"] = 2] = "BOXZOOM";
    })(ChartViewToolStateEnum = exports.ChartViewToolStateEnum || (exports.ChartViewToolStateEnum = {}));
    /**
     *
     * @singleton
     * @export
     * @class ChartViewToolState
     */
    var ChartViewToolState = /** @class */ (function (_super) {
        __extends(ChartViewToolState, _super);
        function ChartViewToolState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selectedTool = ChartViewToolStateEnum.CURSORS;
            return _this;
        }
        ChartViewToolState = __decorate([
            Reflection.metaClassProperty(Reflection.MetaClassProperty.transferType, commonTypes_1.DataTransferType.byValue),
            Reflection.metaClassProperty(Reflection.MetaClassProperty.className, "ChartViewToolState")
        ], ChartViewToolState);
        return ChartViewToolState;
    }(state_1.State));
    exports.ChartViewToolState = ChartViewToolState;
    var ChartViewZoomDirectionState = /** @class */ (function () {
        function ChartViewZoomDirectionState() {
            this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
        }
        ChartViewZoomDirectionState = __decorate([
            Reflection.metaClassProperty(Reflection.MetaClassProperty.transferType, commonTypes_1.DataTransferType.byValue),
            Reflection.metaClassProperty(Reflection.MetaClassProperty.className, "ChartViewZoomDirectionState")
        ], ChartViewZoomDirectionState);
        return ChartViewZoomDirectionState;
    }());
    exports.ChartViewZoomDirectionState = ChartViewZoomDirectionState;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3VG9vbGJhclN0YXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtBLElBQVksc0JBS1g7SUFMRCxXQUFZLHNCQUFzQjtRQUM5Qix5RUFBTyxDQUFBO1FBQ1AseUVBQU8sQ0FBQTtRQUNQLHlFQUFPLENBQUE7SUFFWCxDQUFDLEVBTFcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFLakM7SUFFRDs7Ozs7T0FLRztJQUdIO1FBQXdDLHNDQUFLO1FBQTdDO1lBQUEscUVBRUM7WUFERyxrQkFBWSxHQUEyQixzQkFBc0IsQ0FBQyxPQUFPLENBQUM7O1FBQzFFLENBQUM7UUFGWSxrQkFBa0I7WUFGN0IsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUMsOEJBQWdCLENBQUMsT0FBTyxDQUFDO1lBQ2hHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFDLG9CQUFvQixDQUFDO1dBQzlFLGtCQUFrQixDQUU5QjtRQUFELHlCQUFDO0tBQUEsQUFGRCxDQUF3QyxhQUFLLEdBRTVDO0lBRlksZ0RBQWtCO0lBTy9CO1FBQUE7WUFDSSxrQkFBYSxHQUFrQiwrQkFBYSxDQUFDLEVBQUUsQ0FBQztRQUNwRCxDQUFDO1FBRlksMkJBQTJCO1lBRnZDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFDLDhCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUNoRyxVQUFVLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBQyw2QkFBNkIsQ0FBQztXQUN0RiwyQkFBMkIsQ0FFdkM7UUFBRCxrQ0FBQztLQUFBLEFBRkQsSUFFQztJQUZZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9zdGF0ZVwiO1xyXG5pbXBvcnQgeyBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4uLy4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0ICogYXMgUmVmbGVjdGlvbiAgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9yZWZsZWN0aW9uL2RlY29yYXRvcnMvbWV0YUNsYXNzUHJvcGVydHlEZWNvcmF0b3JcIjtcclxuaW1wb3J0IHsgRGF0YVRyYW5zZmVyVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2NvbW1vbi9jb21tb25UeXBlc1wiO1xyXG5cclxuZXhwb3J0IGVudW0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bXtcclxuICAgIENVUlNPUlMsXHJcbiAgICBQQU5OSU5HLFxyXG4gICAgQk9YWk9PTSxcclxuICAgIFxyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHNpbmdsZXRvblxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDaGFydFZpZXdUb29sU3RhdGVcclxuICovXHJcbiBAUmVmbGVjdGlvbi5tZXRhQ2xhc3NQcm9wZXJ0eShSZWZsZWN0aW9uLk1ldGFDbGFzc1Byb3BlcnR5LnRyYW5zZmVyVHlwZSxEYXRhVHJhbnNmZXJUeXBlLmJ5VmFsdWUpXHJcbiBAUmVmbGVjdGlvbi5tZXRhQ2xhc3NQcm9wZXJ0eShSZWZsZWN0aW9uLk1ldGFDbGFzc1Byb3BlcnR5LmNsYXNzTmFtZSxcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKVxyXG5leHBvcnQgY2xhc3MgQ2hhcnRWaWV3VG9vbFN0YXRlIGV4dGVuZHMgU3RhdGV7XHJcbiAgICBzZWxlY3RlZFRvb2w6IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0gPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkNVUlNPUlM7ICBcclxufVxyXG5cclxuXHJcbkBSZWZsZWN0aW9uLm1ldGFDbGFzc1Byb3BlcnR5KFJlZmxlY3Rpb24uTWV0YUNsYXNzUHJvcGVydHkudHJhbnNmZXJUeXBlLERhdGFUcmFuc2ZlclR5cGUuYnlWYWx1ZSkgXHJcbkBSZWZsZWN0aW9uLm1ldGFDbGFzc1Byb3BlcnR5KFJlZmxlY3Rpb24uTWV0YUNsYXNzUHJvcGVydHkuY2xhc3NOYW1lLFwiQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlXCIpIFxyXG5leHBvcnQgY2xhc3MgQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRle1xyXG4gICAgem9vbURpcmVjdGlvbjogWm9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbn0iXX0=
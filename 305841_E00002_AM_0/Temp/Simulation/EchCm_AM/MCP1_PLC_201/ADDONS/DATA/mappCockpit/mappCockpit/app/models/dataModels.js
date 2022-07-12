define(["require", "exports", "./mappCockpitDataModel/mappCockpitDataModel", "./configManagerDataModel/configManagerDataModel", "./signalManagerDataModel/signalManagerDataModel", "./chartManagerDataModel/chartManagerDataModel", "./topBarDataModel/tabWidgetDataModel"], function (require, exports, mappCockpitDataModel_1, configManagerDataModel_1, signalManagerDataModel_1, chartManagerDataModel_1, tabWidgetDataModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitDataModel = /** @class */ (function () {
        function MappCockpitDataModel() {
        }
        MappCockpitDataModel.create = function () { return new mappCockpitDataModel_1.MappCockpitDataModel(); };
        ;
        return MappCockpitDataModel;
    }());
    exports.MappCockpitDataModel = MappCockpitDataModel;
    var ConfigManagerDataModel = /** @class */ (function () {
        function ConfigManagerDataModel() {
        }
        ConfigManagerDataModel.create = function () { return new configManagerDataModel_1.ConfigManagerDataModel(); };
        ;
        return ConfigManagerDataModel;
    }());
    exports.ConfigManagerDataModel = ConfigManagerDataModel;
    var SignalManagerDataModel = /** @class */ (function () {
        function SignalManagerDataModel() {
        }
        SignalManagerDataModel.create = function () { return new signalManagerDataModel_1.SignalManagerDataModel(); };
        ;
        return SignalManagerDataModel;
    }());
    exports.SignalManagerDataModel = SignalManagerDataModel;
    var ChartManagerDataModel = /** @class */ (function () {
        function ChartManagerDataModel() {
        }
        ChartManagerDataModel.create = function () { return new chartManagerDataModel_1.ChartManagerDataModel(); };
        ;
        return ChartManagerDataModel;
    }());
    exports.ChartManagerDataModel = ChartManagerDataModel;
    var TabWidgetDataModel = /** @class */ (function () {
        function TabWidgetDataModel() {
        }
        TabWidgetDataModel.create = function () { return new tabWidgetDataModel_1.TabWidgetDataModel(); };
        ;
        return TabWidgetDataModel;
    }());
    exports.TabWidgetDataModel = TabWidgetDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RhdGFNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtRQUE0SCxDQUFDO1FBQWpGLDJCQUFNLEdBQWIsY0FBc0MsT0FBTyxJQUFJLDJDQUFrQyxFQUFFLENBQUEsQ0FBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLDJCQUFDO0lBQUQsQ0FBQyxBQUE3SCxJQUE2SDtJQWtCckgsb0RBQW9CO0lBZDVCO1FBQUE7UUFBa0ksQ0FBQztRQUFyRiw2QkFBTSxHQUFiLGNBQXdDLE9BQU8sSUFBSSwrQ0FBb0MsRUFBRSxDQUFBLENBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSw2QkFBQztJQUFELENBQUMsQUFBbkksSUFBbUk7SUFlL0gsd0RBQXNCO0lBWDFCO1FBQUE7UUFBa0ksQ0FBQztRQUFyRiw2QkFBTSxHQUFiLGNBQXdDLE9BQU8sSUFBSSwrQ0FBb0MsRUFBRSxDQUFBLENBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSw2QkFBQztJQUFELENBQUMsQUFBbkksSUFBbUk7SUFZL0gsd0RBQXNCO0lBUjFCO1FBQUE7UUFBK0gsQ0FBQztRQUFuRiw0QkFBTSxHQUFiLGNBQXVDLE9BQU8sSUFBSSw2Q0FBbUMsRUFBRSxDQUFBLENBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSw0QkFBQztJQUFELENBQUMsQUFBaEksSUFBZ0k7SUFTNUgsc0RBQXFCO0lBTHpCO1FBQUE7UUFBc0gsQ0FBQztRQUE3RSx5QkFBTSxHQUFiLGNBQW9DLE9BQU8sSUFBSSx1Q0FBZ0MsRUFBRSxDQUFBLENBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSx5QkFBQztJQUFELENBQUMsQUFBdkgsSUFBdUg7SUFNbkgsZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0RGF0YU1vZGVsIGFzICBNYXBwQ29ja3BpdERhdGFNb2RlbEltcGxlbWVudGF0aW9ufSBmcm9tIFwiLi9tYXBwQ29ja3BpdERhdGFNb2RlbC9tYXBwQ29ja3BpdERhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJTWFwcENvY2twaXREYXRhTW9kZWwgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdERhdGFNb2RlbC9tYXBwQ29ja3BpdERhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5hYnN0cmFjdCBjbGFzcyBNYXBwQ29ja3BpdERhdGFNb2RlbHsgc3RhdGljIGNyZWF0ZSgpOklNYXBwQ29ja3BpdERhdGFNb2RlbHtyZXR1cm4gbmV3IE1hcHBDb2NrcGl0RGF0YU1vZGVsSW1wbGVtZW50YXRpb24oKX07fVxyXG5cclxuaW1wb3J0IHsgQ29uZmlnTWFuYWdlckRhdGFNb2RlbCBhcyAgQ29uZmlnTWFuYWdlckRhdGFNb2RlbEltcGxlbWVudGF0aW9ufSBmcm9tIFwiLi9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY29uZmlnTWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5hYnN0cmFjdCBjbGFzcyBDb25maWdNYW5hZ2VyRGF0YU1vZGVseyBzdGF0aWMgY3JlYXRlKCk6SUNvbmZpZ01hbmFnZXJEYXRhTW9kZWx7cmV0dXJuIG5ldyBDb25maWdNYW5hZ2VyRGF0YU1vZGVsSW1wbGVtZW50YXRpb24oKX07fVxyXG5cclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckRhdGFNb2RlbCBhcyAgU2lnbmFsTWFuYWdlckRhdGFNb2RlbEltcGxlbWVudGF0aW9ufSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5hYnN0cmFjdCBjbGFzcyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVseyBzdGF0aWMgY3JlYXRlKCk6SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWx7cmV0dXJuIG5ldyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsSW1wbGVtZW50YXRpb24oKX07fVxyXG5cclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIGFzICBDaGFydE1hbmFnZXJEYXRhTW9kZWxJbXBsZW1lbnRhdGlvbn0gZnJvbSBcIi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmFic3RyYWN0IGNsYXNzIENoYXJ0TWFuYWdlckRhdGFNb2RlbHsgc3RhdGljIGNyZWF0ZSgpOklDaGFydE1hbmFnZXJEYXRhTW9kZWx7cmV0dXJuIG5ldyBDaGFydE1hbmFnZXJEYXRhTW9kZWxJbXBsZW1lbnRhdGlvbigpfTt9XHJcblxyXG5pbXBvcnQgeyBUYWJXaWRnZXREYXRhTW9kZWwgYXMgIFRhYldpZGdldERhdGFNb2RlbEltcGxlbWVudGF0aW9ufSBmcm9tIFwiLi90b3BCYXJEYXRhTW9kZWwvdGFiV2lkZ2V0RGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IElUYWJXaWRnZXREYXRhTW9kZWwgfSBmcm9tIFwiLi90b3BCYXJEYXRhTW9kZWwvaW50ZXJmYWNlcy90YWJXaWRnZXREYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuYWJzdHJhY3QgY2xhc3MgVGFiV2lkZ2V0RGF0YU1vZGVseyBzdGF0aWMgY3JlYXRlKCk6SVRhYldpZGdldERhdGFNb2RlbHtyZXR1cm4gbmV3IFRhYldpZGdldERhdGFNb2RlbEltcGxlbWVudGF0aW9uKCl9O31cclxuXHJcbmV4cG9ydCB7TWFwcENvY2twaXREYXRhTW9kZWwsSU1hcHBDb2NrcGl0RGF0YU1vZGVsLFxyXG4gICAgQ29uZmlnTWFuYWdlckRhdGFNb2RlbCxJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCxcclxuICAgIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsXHJcbiAgICBDaGFydE1hbmFnZXJEYXRhTW9kZWwsSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCxcclxuICAgIFRhYldpZGdldERhdGFNb2RlbCwgSVRhYldpZGdldERhdGFNb2RlbCxcclxufSJdfQ==
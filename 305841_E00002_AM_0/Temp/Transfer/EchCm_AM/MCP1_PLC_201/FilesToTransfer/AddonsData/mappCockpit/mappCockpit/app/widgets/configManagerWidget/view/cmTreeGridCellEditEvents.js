define(["require", "exports", "../configManagerWidget"], function (require, exports, configManagerWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridCellEditEvents = /** @class */ (function () {
        function CmTreeGridCellEditEvents() {
        }
        CmTreeGridCellEditEvents.prototype.beginEdit = function (args, dataModel) {
            // index 1 is modified value and index 2 is value
            // modified value can only be changed if user with write access is logged in
            var writeAccess = false;
            if (dataModel != undefined) {
                writeAccess = dataModel.writeAccess;
            }
            if (args.columnIndex != 1 || (writeAccess == false || args.data.element.componentParameter == undefined)) {
                args.cancel = true;
            }
        };
        CmTreeGridCellEditEvents.prototype.endEdit = function (args, dataModel) {
            if (args.columnObject.field == configManagerWidget_1.ConfigManagerWidget.displayModifiedValueColumnId) {
                if (dataModel != undefined) {
                    dataModel.setValue(args.data.element, args.value);
                }
            }
        };
        return CmTreeGridCellEditEvents;
    }());
    exports.CmTreeGridCellEditEvents = CmTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZENlbGxFZGl0RXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvdmlldy9jbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtRQW9CQSxDQUFDO1FBbkJHLDRDQUFTLEdBQVQsVUFBVSxJQUFJLEVBQUUsU0FBaUQ7WUFDN0QsaURBQWlEO1lBQ2pELDRFQUE0RTtZQUM1RSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO2dCQUN0QixXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzthQUN2QztZQUNELElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLFNBQVMsQ0FBQyxFQUFDO2dCQUNwRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtRQUNMLENBQUM7UUFFRCwwQ0FBTyxHQUFQLFVBQVEsSUFBSSxFQUFFLFNBQWlEO1lBQzNELElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUkseUNBQW1CLENBQUMsNEJBQTRCLEVBQUM7Z0JBQzNFLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JEO2FBQ0o7UUFDTCxDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBcEJELElBb0JDO0lBcEJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZ01hbmFnZXJXaWRnZXQgfSBmcm9tIFwiLi4vY29uZmlnTWFuYWdlcldpZGdldFwiO1xyXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsIH0gZnJvbSBcIi4uL21vZGVsL2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHN7XHJcbiAgICBiZWdpbkVkaXQoYXJncywgZGF0YU1vZGVsOiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gaW5kZXggMSBpcyBtb2RpZmllZCB2YWx1ZSBhbmQgaW5kZXggMiBpcyB2YWx1ZVxyXG4gICAgICAgIC8vIG1vZGlmaWVkIHZhbHVlIGNhbiBvbmx5IGJlIGNoYW5nZWQgaWYgdXNlciB3aXRoIHdyaXRlIGFjY2VzcyBpcyBsb2dnZWQgaW5cclxuICAgICAgICBsZXQgd3JpdGVBY2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgd3JpdGVBY2Nlc3MgPSBkYXRhTW9kZWwud3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggIT0gMSB8fCAod3JpdGVBY2Nlc3MgPT0gZmFsc2UgfHwgYXJncy5kYXRhLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyID09IHVuZGVmaW5lZCkpe1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZEVkaXQoYXJncywgZGF0YU1vZGVsOiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5PYmplY3QuZmllbGQgPT0gQ29uZmlnTWFuYWdlcldpZGdldC5kaXNwbGF5TW9kaWZpZWRWYWx1ZUNvbHVtbklkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBkYXRhTW9kZWwuc2V0VmFsdWUoYXJncy5kYXRhLmVsZW1lbnQsIGFyZ3MudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
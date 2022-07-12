define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigTimingTreeGridCellEditEvents = /** @class */ (function () {
        function TraceConfigTimingTreeGridCellEditEvents() {
        }
        TraceConfigTimingTreeGridCellEditEvents.prototype.beginEdit = function (args) {
            // Only value column can be edited (TODO: use column id instead of index)
            if (args.columnIndex != 1) {
                args.cancel = true;
            }
        };
        TraceConfigTimingTreeGridCellEditEvents.prototype.endEdit = function (args, dataModel) {
            if (args.columnObject.field == "displayValue") {
                dataModel.setValue(args.data.item, args.value);
                /*if(args.value != args.data.item.componentParameter.value) {
                    args.rowElement[0].children[0].style.fontWeight = "bold";
                }
                else{
                    args.rowElement[0].children[0].style.fontWeight = "normal";
                }*/
            }
        };
        return TraceConfigTimingTreeGridCellEditEvents;
    }());
    exports.TraceConfigTimingTreeGridCellEditEvents = TraceConfigTimingTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0RXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVGltaW5nV2lkZ2V0L3ZpZXcvdHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0RXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7UUFtQkEsQ0FBQztRQWxCRywyREFBUyxHQUFULFVBQVUsSUFBSTtZQUNWLHlFQUF5RTtZQUN6RSxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFDO2dCQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtRQUNMLENBQUM7UUFFRCx5REFBTyxHQUFQLFVBQVEsSUFBSSxFQUFFLFNBQXNDO1lBQ2hELElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksY0FBYyxFQUFDO2dCQUN6QyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0M7Ozs7O21CQUtHO2FBQ047UUFDTCxDQUFDO1FBQ0wsOENBQUM7SUFBRCxDQUFDLEFBbkJELElBbUJDO0lBbkJZLDBGQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCB9IGZyb20gXCIuLi9tb2RlbC90cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdEV2ZW50c3tcclxuICAgIGJlZ2luRWRpdChhcmdzKXtcclxuICAgICAgICAvLyBPbmx5IHZhbHVlIGNvbHVtbiBjYW4gYmUgZWRpdGVkIChUT0RPOiB1c2UgY29sdW1uIGlkIGluc3RlYWQgb2YgaW5kZXgpXHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5JbmRleCAhPSAxKXtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmRFZGl0KGFyZ3MsIGRhdGFNb2RlbDogSVRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsKXtcclxuICAgICAgICBpZihhcmdzLmNvbHVtbk9iamVjdC5maWVsZCA9PSBcImRpc3BsYXlWYWx1ZVwiKXtcclxuICAgICAgICAgICAgZGF0YU1vZGVsLnNldFZhbHVlKGFyZ3MuZGF0YS5pdGVtLCBhcmdzLnZhbHVlKTtcclxuICAgICAgICAgICAgLyppZihhcmdzLnZhbHVlICE9IGFyZ3MuZGF0YS5pdGVtLmNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgYXJncy5yb3dFbGVtZW50WzBdLmNoaWxkcmVuWzBdLnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYXJncy5yb3dFbGVtZW50WzBdLmNoaWxkcmVuWzBdLnN0eWxlLmZvbnRXZWlnaHQgPSBcIm5vcm1hbFwiO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
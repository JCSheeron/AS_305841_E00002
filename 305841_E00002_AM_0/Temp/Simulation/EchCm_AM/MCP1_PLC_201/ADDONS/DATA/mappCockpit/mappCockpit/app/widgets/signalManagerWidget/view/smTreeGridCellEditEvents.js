define(["require", "exports", "../signalManagerWidget"], function (require, exports, signalManagerWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SmTreeGridCellEditEvents = /** @class */ (function () {
        function SmTreeGridCellEditEvents() {
        }
        SmTreeGridCellEditEvents.prototype.beginEdit = function (args, widget) {
            var colorColumnIndex = SmTreeGridCellEditEvents.getColumnIndex(signalManagerWidget_1.SignalManagerWidget.colorColumnId, args.model);
            var valueColumnIndex = SmTreeGridCellEditEvents.getColumnIndex(signalManagerWidget_1.SignalManagerWidget.valueColumnId, args.model);
            if (args.columnIndex == colorColumnIndex) {
                if (args.data.item.color == undefined) {
                    // Only color setting can be edited if available
                    args.cancel = true;
                }
            }
            else if (args.columnIndex == valueColumnIndex) {
                if (args.data.item.value != undefined) {
                }
                else {
                    args.cancel = true;
                }
            }
            else {
                args.cancel = true;
            }
            // Remove dragging support to avoid problems with selecting parts of the edit cell
            if (!args.cancel) {
                widget.removeDraggingSupport();
            }
        };
        SmTreeGridCellEditEvents.prototype.endEdit = function (args, widget) {
            // Add dragging support (removed in beginEdit)
            widget.addDraggingSupport();
            if (args.columnObject.field == signalManagerWidget_1.SignalManagerWidget.colorColumnId) {
                if (args.data.item.color != undefined) {
                    // update signal icon with correct color
                    widget.refresh();
                }
            }
        };
        SmTreeGridCellEditEvents.getColumnIndex = function (columnId, dataModel) {
            for (var index = 0; index < dataModel.columns.length; index++) {
                if (dataModel.columns[index].field == columnId) {
                    return index;
                }
            }
            // Default column
            return 1;
        };
        return SmTreeGridCellEditEvents;
    }());
    exports.SmTreeGridCellEditEvents = SmTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21UcmVlR3JpZENlbGxFZGl0RXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvdmlldy9zbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtRQW1EQSxDQUFDO1FBbERHLDRDQUFTLEdBQVQsVUFBVSxJQUFJLEVBQUUsTUFBNEI7WUFHeEMsSUFBSSxnQkFBZ0IsR0FBRyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMseUNBQW1CLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RyxJQUFJLGdCQUFnQixHQUFHLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyx5Q0FBbUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlHLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxnQkFBZ0IsRUFBQztnQkFFcEMsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO29CQUNqQyxnREFBZ0Q7b0JBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUN0QjthQUNKO2lCQUNJLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxnQkFBZ0IsRUFBQztnQkFDekMsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO2lCQUNwQztxQkFDRztvQkFDQSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztpQkFDdEI7YUFDSjtpQkFDRztnQkFDQSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtZQUVELGtGQUFrRjtZQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZCxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFFRCwwQ0FBTyxHQUFQLFVBQVEsSUFBSSxFQUFFLE1BQTRCO1lBQ3RDLDhDQUE4QztZQUM5QyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM1QixJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLHlDQUFtQixDQUFDLGFBQWEsRUFBQztnQkFDNUQsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO29CQUNqQyx3Q0FBd0M7b0JBQ3hDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDcEI7YUFDSjtRQUNMLENBQUM7UUFFYyx1Q0FBYyxHQUE3QixVQUE4QixRQUFRLEVBQUUsU0FBUztZQUM3QyxLQUFJLElBQUksS0FBSyxHQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUM7Z0JBQ3ZELElBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFDO29CQUMxQyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7YUFDSjtZQUVELGlCQUFpQjtZQUNqQixPQUFPLENBQUMsQ0FBQztRQUNiLENBQUM7UUFDTCwrQkFBQztJQUFELENBQUMsQUFuREQsSUFtREM7SUFuRFksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lnbmFsTWFuYWdlcldpZGdldCB9IGZyb20gXCIuLi9zaWduYWxNYW5hZ2VyV2lkZ2V0XCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsTWFuYWdlcldpZGdldEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNtVHJlZUdyaWRDZWxsRWRpdEV2ZW50c3tcclxuICAgIGJlZ2luRWRpdChhcmdzLCB3aWRnZXQ6IElTaWduYWxNYW5hZ2VyV2lkZ2V0KXtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29sb3JDb2x1bW5JbmRleCA9IFNtVHJlZUdyaWRDZWxsRWRpdEV2ZW50cy5nZXRDb2x1bW5JbmRleChTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQsIGFyZ3MubW9kZWwpO1xyXG4gICAgICAgIGxldCB2YWx1ZUNvbHVtbkluZGV4ID0gU21UcmVlR3JpZENlbGxFZGl0RXZlbnRzLmdldENvbHVtbkluZGV4KFNpZ25hbE1hbmFnZXJXaWRnZXQudmFsdWVDb2x1bW5JZCwgYXJncy5tb2RlbCk7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5JbmRleCA9PSBjb2xvckNvbHVtbkluZGV4KXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS5pdGVtLmNvbG9yID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGNvbG9yIHNldHRpbmcgY2FuIGJlIGVkaXRlZCBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MuY29sdW1uSW5kZXggPT0gdmFsdWVDb2x1bW5JbmRleCl7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS5pdGVtLnZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZHJhZ2dpbmcgc3VwcG9ydCB0byBhdm9pZCBwcm9ibGVtcyB3aXRoIHNlbGVjdGluZyBwYXJ0cyBvZiB0aGUgZWRpdCBjZWxsXHJcbiAgICAgICAgaWYgKCFhcmdzLmNhbmNlbCkge1xyXG4gICAgICAgICAgICB3aWRnZXQucmVtb3ZlRHJhZ2dpbmdTdXBwb3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZEVkaXQoYXJncywgd2lkZ2V0OiBJU2lnbmFsTWFuYWdlcldpZGdldCl7XHJcbiAgICAgICAgLy8gQWRkIGRyYWdnaW5nIHN1cHBvcnQgKHJlbW92ZWQgaW4gYmVnaW5FZGl0KVxyXG4gICAgICAgIHdpZGdldC5hZGREcmFnZ2luZ1N1cHBvcnQoKTtcclxuICAgICAgICBpZihhcmdzLmNvbHVtbk9iamVjdC5maWVsZCA9PSBTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS5jb2xvciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHNpZ25hbCBpY29uIHdpdGggY29ycmVjdCBjb2xvclxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRDb2x1bW5JbmRleChjb2x1bW5JZCwgZGF0YU1vZGVsKTpudW1iZXJ7XHJcbiAgICAgICAgZm9yKGxldCBpbmRleD0wOyBpbmRleCA8IGRhdGFNb2RlbC5jb2x1bW5zLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5jb2x1bW5zW2luZGV4XS5maWVsZCA9PSBjb2x1bW5JZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgY29sdW1uXHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbn1cclxuIl19
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
define(["require", "exports", "./cursorInfo", "./dynamicCursorSignalTemplate", "./cursorSignalDescriptor"], function (require, exports, cursorInfo_1, dynamicCursorSignalTemplate_1, cursorSignalDescriptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTCursorSignalDescriptor = /** @class */ (function (_super) {
        __extends(YTCursorSignalDescriptor, _super);
        /**
         * Creates an instance of XYCursorSignalDescriptor.
         * @memberof YTCursorSignalDescriptor
         */
        function YTCursorSignalDescriptor(cursorInfo) {
            return _super.call(this, cursorInfo) || this;
        }
        YTCursorSignalDescriptor.prototype.initializeCursorSignalInfos = function () {
            this._cursorInfoIds = [
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y1", "y cursor 1", "The y position of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("t1", "t cursor 1", "The time of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y2", "y cursor 2", "The y position of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("t2", "t cursor 2", "The time of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yDiff", "y diff (y2-y1)", "The y difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("tDiff", "t diff (t2-t1)", "The time difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMean", "y mean", "The mean value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yStD", "y standard deviation", "The standard deviation of the y value between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yVar", "y variance", "The variance of the y value between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yRms", "y RMS", "The root Mean Square (RMS) value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMinimum", "y min", "The minimum value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMaximum", "y max", "The maximum value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yPp", "y peak to peak", "The peak to peak value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors)
            ];
            this.visibleInfoIds = ['y1', 'y2', 't1', 't2'];
        };
        Object.defineProperty(YTCursorSignalDescriptor.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the YTChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof YTCursorSignalDescriptor
         */
        YTCursorSignalDescriptor.prototype.getAllCursorInfo = function () {
            return this._cursorInfoIds;
        };
        return YTCursorSignalDescriptor;
    }(cursorSignalDescriptor_1.CursorSignalDescriptor));
    exports.YTCursorSignalDescriptor = YTCursorSignalDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXRDdXJzb3JTaWduYWxEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwveXRDdXJzb3JTaWduYWxEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUE4Qyw0Q0FBc0I7UUFFaEU7OztXQUdHO1FBQ0gsa0NBQVksVUFBOEM7bUJBQ3RELGtCQUFNLFVBQVUsQ0FBQztRQUNyQixDQUFDO1FBRUQsOERBQTJCLEdBQTNCO1lBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRztnQkFDbEIsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDaEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDaEcsSUFBSSxvREFBc0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0RBQWdELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNySSxJQUFJLG9EQUFzQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtREFBbUQsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ3hJLElBQUksb0RBQXNCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxtREFBbUQsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ2hJLElBQUksb0RBQXNCLENBQUMsTUFBTSxFQUFFLHNCQUFzQixFQUFFLHFFQUFxRSxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDL0osSUFBSSxvREFBc0IsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLDJEQUEyRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDM0ksSUFBSSxvREFBc0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLHFFQUFxRSxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDaEosSUFBSSxvREFBc0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLHNEQUFzRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDckksSUFBSSxvREFBc0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLHNEQUFzRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDckksSUFBSSxvREFBc0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsMkRBQTJELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2FBQ2pKLENBQUM7WUFFRixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELHNCQUFJLGlEQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNJLG1EQUFnQixHQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBNUNELENBQThDLCtDQUFzQixHQTRDbkU7SUE1Q1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3Vyc29ySW5mbywgQ3Vyc29yRGVwZW5kZW5jeSB9IGZyb20gXCIuL2N1cnNvckluZm9cIjtcclxuaW1wb3J0IHsgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyB9IGZyb20gXCIuL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWxEZXNjcmlwdG9yIH0gZnJvbSBcIi4vY3Vyc29yU2lnbmFsRGVzY3JpcHRvclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVmlzaWJpbGl0eSB9IGZyb20gXCIuL2N1cnNvckluZm9WaXNpYmlsaXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWVRDdXJzb3JTaWduYWxEZXNjcmlwdG9yIGV4dGVuZHMgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcntcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yLlxyXG4gICAgICogQG1lbWJlcm9mIFlUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjdXJzb3JJbmZvOiBDdXJzb3JJbmZvVmlzaWJpbGl0eVtdIHwgdW5kZWZpbmVkKXtcclxuICAgICAgICBzdXBlcihjdXJzb3JJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ3Vyc29yU2lnbmFsSW5mb3MoKSB7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb0lkcyA9IFtcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5MVwiLCBcInkgY3Vyc29yIDFcIiwgXCJUaGUgeSBwb3NpdGlvbiBvZiBjdXJzb3IgMVwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjEpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInQxXCIsIFwidCBjdXJzb3IgMVwiLCBcIlRoZSB0aW1lIG9mIGN1cnNvciAxXCIsIEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMSksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieTJcIiwgXCJ5IGN1cnNvciAyXCIsIFwiVGhlIHkgcG9zaXRpb24gb2YgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IyKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ0MlwiLCBcInQgY3Vyc29yIDJcIiwgXCJUaGUgdGltZSBvZiBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjIpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlEaWZmXCIsIFwieSBkaWZmICh5Mi15MSlcIiwgXCJUaGUgeSBkaWZmZXJlbmNlIGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInREaWZmXCIsIFwidCBkaWZmICh0Mi10MSlcIiwgXCJUaGUgdGltZSBkaWZmZXJlbmNlIGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlNZWFuXCIsIFwieSBtZWFuXCIsIFwiVGhlIG1lYW4gdmFsdWUgb2YgeSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5U3REXCIsIFwieSBzdGFuZGFyZCBkZXZpYXRpb25cIiwgXCJUaGUgc3RhbmRhcmQgZGV2aWF0aW9uIG9mIHRoZSB5IHZhbHVlIGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlWYXJcIiwgXCJ5IHZhcmlhbmNlXCIsIFwiVGhlIHZhcmlhbmNlIG9mIHRoZSB5IHZhbHVlIGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlSbXNcIiwgXCJ5IFJNU1wiLCBcIlRoZSByb290IE1lYW4gU3F1YXJlIChSTVMpIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieU1pbmltdW1cIiwgXCJ5IG1pblwiLCBcIlRoZSBtaW5pbXVtIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieU1heGltdW1cIiwgXCJ5IG1heFwiLCBcIlRoZSBtYXhpbXVtIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieVBwXCIsIFwieSBwZWFrIHRvIHBlYWtcIiwgXCJUaGUgcGVhayB0byBwZWFrIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycylcclxuICAgICAgICBdO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy52aXNpYmxlSW5mb0lkcyA9IFsneTEnLCAneTInLCAndDEnLCAndDInXTsgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY3Vyc29ySW5mb3MoKTogQXJyYXk8Q3Vyc29ySW5mbz57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvckluZm9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCBieSB0aGUgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlIHRvIGdldCBob2xkXHJcbiAgICAgKiBvZiBhbGwgYXZhaWxhYmxlIGN1cnNvciBpbmZvcm1hdGlvbiBhdmFpbGFibGUgdG8gdGhlIFlUQ2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz59XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDdXJzb3JTaWduYWxEZXNjcmlwdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxDdXJzb3JJbmZvICgpOiBBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvckluZm9JZHM7XHJcbiAgICB9XHJcbn1cclxuIl19
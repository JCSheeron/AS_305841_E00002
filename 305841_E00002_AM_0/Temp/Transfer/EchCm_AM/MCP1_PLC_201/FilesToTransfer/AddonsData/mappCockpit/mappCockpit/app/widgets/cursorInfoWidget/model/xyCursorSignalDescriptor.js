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
    var XYCursorSignalDescriptor = /** @class */ (function (_super) {
        __extends(XYCursorSignalDescriptor, _super);
        /**
         * Creates an instance of XYCursorSignalDescriptor
         * @memberof XYCursorSignalDescriptor
         */
        function XYCursorSignalDescriptor(cursorInfo) {
            return _super.call(this, cursorInfo) || this;
        }
        XYCursorSignalDescriptor.prototype.initializeCursorSignalInfos = function () {
            this._cursorInfoIds = [
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y1", "y cursor 1", "The y position of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("x1", "x cursor 1", "The x position of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("t1", "t cursor 1", "The time of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y2", "y cursor 2", "The y position of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("x2", "x cursor 2", "The x position of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("t2", "t cursor 2", "The time of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yDiff", "y diff (y2-y1)", "The y difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("xDiff", "x diff (x2-x1)", "The x difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("tDiff", "t diff (t2-t1)", "The time difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("eucDist", "Euclidean Distance", "The euclidean distance between two points", cursorInfo_1.CursorDependency.BothCursors)
            ];
            this.visibleInfoIds = ['y1', 'y2', 'x1', 'x2'];
        };
        Object.defineProperty(XYCursorSignalDescriptor.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the XYChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof XYCursorSignalDescriptor
         */
        XYCursorSignalDescriptor.prototype.getAllCursorInfo = function () {
            return this._cursorInfoIds;
        };
        return XYCursorSignalDescriptor;
    }(cursorSignalDescriptor_1.CursorSignalDescriptor));
    exports.XYCursorSignalDescriptor = XYCursorSignalDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlDdXJzb3JTaWduYWxEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwveHlDdXJzb3JTaWduYWxEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUE4Qyw0Q0FBc0I7UUFFaEU7OztXQUdHO1FBQ0gsa0NBQVksVUFBOEM7bUJBQ3RELGtCQUFNLFVBQVUsQ0FBQztRQUNyQixDQUFDO1FBRUQsOERBQTJCLEdBQTNCO1lBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRztnQkFDbEIsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDaEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDaEcsSUFBSSxvREFBc0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0RBQWdELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNySSxJQUFJLG9EQUFzQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnREFBZ0QsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ3JJLElBQUksb0RBQXNCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLG1EQUFtRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDeEksSUFBSSxvREFBc0IsQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsMkNBQTJDLEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2FBQ3pJLENBQUM7WUFFRixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELHNCQUFJLGlEQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNJLG1EQUFnQixHQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBekNELENBQThDLCtDQUFzQixHQXlDbkU7SUF6Q1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3Vyc29ySW5mbywgQ3Vyc29yRGVwZW5kZW5jeSB9IGZyb20gXCIuL2N1cnNvckluZm9cIjtcclxuaW1wb3J0IHsgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyB9IGZyb20gXCIuL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWxEZXNjcmlwdG9yIH0gZnJvbSBcIi4vY3Vyc29yU2lnbmFsRGVzY3JpcHRvclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVmlzaWJpbGl0eSB9IGZyb20gXCIuL2N1cnNvckluZm9WaXNpYmlsaXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yIGV4dGVuZHMgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFhZQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjdXJzb3JJbmZvOiBDdXJzb3JJbmZvVmlzaWJpbGl0eVtdIHwgdW5kZWZpbmVkKXtcclxuICAgICAgICBzdXBlcihjdXJzb3JJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ3Vyc29yU2lnbmFsSW5mb3MoKSB7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb0lkcyA9IFtcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5MVwiLCBcInkgY3Vyc29yIDFcIiwgXCJUaGUgeSBwb3NpdGlvbiBvZiBjdXJzb3IgMVwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjEpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcIngxXCIsIFwieCBjdXJzb3IgMVwiLCBcIlRoZSB4IHBvc2l0aW9uIG9mIGN1cnNvciAxXCIsIEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMSksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwidDFcIiwgXCJ0IGN1cnNvciAxXCIsIFwiVGhlIHRpbWUgb2YgY3Vyc29yIDFcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IxKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5MlwiLCBcInkgY3Vyc29yIDJcIiwgXCJUaGUgeSBwb3NpdGlvbiBvZiBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjIpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcIngyXCIsIFwieCBjdXJzb3IgMlwiLCBcIlRoZSB4IHBvc2l0aW9uIG9mIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMiksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwidDJcIiwgXCJ0IGN1cnNvciAyXCIsIFwiVGhlIHRpbWUgb2YgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IyKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5RGlmZlwiLCBcInkgZGlmZiAoeTIteTEpXCIsIFwiVGhlIHkgZGlmZmVyZW5jZSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ4RGlmZlwiLCBcInggZGlmZiAoeDIteDEpXCIsIFwiVGhlIHggZGlmZmVyZW5jZSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ0RGlmZlwiLCBcInQgZGlmZiAodDItdDEpXCIsIFwiVGhlIHRpbWUgZGlmZmVyZW5jZSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJldWNEaXN0XCIsIFwiRXVjbGlkZWFuIERpc3RhbmNlXCIsIFwiVGhlIGV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycylcclxuICAgICAgICBdO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy52aXNpYmxlSW5mb0lkcyA9IFsneTEnLCAneTInLCAneDEnLCAneDInXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGN1cnNvckluZm9zKCk6IEFycmF5PEN1cnNvckluZm8+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgYnkgdGhlIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSB0byBnZXQgaG9sZFxyXG4gICAgICogb2YgYWxsIGF2YWlsYWJsZSBjdXJzb3IgaW5mb3JtYXRpb24gYXZhaWxhYmxlIHRvIHRoZSBYWUNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+fVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsQ3Vyc29ySW5mbyAoKTogQXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JJbmZvSWRzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
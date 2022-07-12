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
    var FFTCursorSignalDescriptor = /** @class */ (function (_super) {
        __extends(FFTCursorSignalDescriptor, _super);
        /**
         * Creates an instance of XYCursorSignalDescriptor.
         * @memberof FFTCursorSignalDescriptor
         */
        function FFTCursorSignalDescriptor(cursorInfo) {
            return _super.call(this, cursorInfo) || this;
        }
        FFTCursorSignalDescriptor.prototype.initializeCursorSignalInfos = function () {
            this._cursorInfoIds = [
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y1", "y cursor 1", "The y position of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("f1", "f cursor 1", "The frequency of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y2", "y cursor 2", "The y position of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("f2", "f cursor 2", "The frequency of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yDiff", "y diff (y2-y1)", "The y difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("fDiff", "f diff (f2-f1)", "The frequency difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMean", "y mean", "The mean value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yStD", "y standard deviation", "The standard deviation of the y value between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yVar", "y variance", "The variance of the y value between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yRms", "y RMS", "The root Mean Square (RMS) value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMinimum", "y min", "The minimum value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMaximum", "y max", "The maximum value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yPp", "y peak to peak", "The peak to peak value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors)
            ];
            this.visibleInfoIds = ['y1', 'y2', 'f1', 'f2'];
        };
        Object.defineProperty(FFTCursorSignalDescriptor.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the FFTChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof FFTCursorSignalDescriptor
         */
        FFTCursorSignalDescriptor.prototype.getAllCursorInfo = function () {
            return this._cursorInfoIds;
        };
        return FFTCursorSignalDescriptor;
    }(cursorSignalDescriptor_1.CursorSignalDescriptor));
    exports.FFTCursorSignalDescriptor = FFTCursorSignalDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Q3Vyc29yU2lnbmFsRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2ZmdEN1cnNvclNpZ25hbERlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUtBO1FBQStDLDZDQUFzQjtRQUVqRTs7O1dBR0c7UUFDSCxtQ0FBWSxVQUE4QzttQkFDdEQsa0JBQU0sVUFBVSxDQUFDO1FBQ3JCLENBQUM7UUFFRCwrREFBMkIsR0FBM0I7WUFDSSxJQUFJLENBQUMsY0FBYyxHQUFHO2dCQUNsQixJQUFJLG9EQUFzQixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsNkJBQWdCLENBQUMsT0FBTyxDQUFDO2dCQUN0RyxJQUFJLG9EQUFzQixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsMkJBQTJCLEVBQUUsNkJBQWdCLENBQUMsT0FBTyxDQUFDO2dCQUNyRyxJQUFJLG9EQUFzQixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsNkJBQWdCLENBQUMsT0FBTyxDQUFDO2dCQUN0RyxJQUFJLG9EQUFzQixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsMkJBQTJCLEVBQUUsNkJBQWdCLENBQUMsT0FBTyxDQUFDO2dCQUNyRyxJQUFJLG9EQUFzQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnREFBZ0QsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ3JJLElBQUksb0RBQXNCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHdEQUF3RCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDN0ksSUFBSSxvREFBc0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLG1EQUFtRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDaEksSUFBSSxvREFBc0IsQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLEVBQUUscUVBQXFFLEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUMvSixJQUFJLG9EQUFzQixDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsMkRBQTJELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUMzSSxJQUFJLG9EQUFzQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUscUVBQXFFLEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNoSixJQUFJLG9EQUFzQixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsc0RBQXNELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNySSxJQUFJLG9EQUFzQixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsc0RBQXNELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNySSxJQUFJLG9EQUFzQixDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSwyREFBMkQsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7YUFDakosQ0FBQztZQUVGLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsc0JBQUksa0RBQVc7aUJBQWY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzdCLENBQUM7OztXQUFBO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksb0RBQWdCLEdBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUE1Q0QsQ0FBK0MsK0NBQXNCLEdBNENwRTtJQTVDWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXJzb3JJbmZvLCBDdXJzb3JEZXBlbmRlbmN5IH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbERlc2NyaXB0b3IgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxEZXNjcmlwdG9yXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm9WaXNpYmlsaXR5IH0gZnJvbSBcIi4vY3Vyc29ySW5mb1Zpc2liaWxpdHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGRlRDdXJzb3JTaWduYWxEZXNjcmlwdG9yIGV4dGVuZHMgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcntcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yLlxyXG4gICAgICogQG1lbWJlcm9mIEZGVEN1cnNvclNpZ25hbERlc2NyaXB0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY3Vyc29ySW5mbzogQ3Vyc29ySW5mb1Zpc2liaWxpdHlbXSB8IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgc3VwZXIoY3Vyc29ySW5mbyk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ3Vyc29yU2lnbmFsSW5mb3MoKSB7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb0lkcyA9IFtcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5MVwiLCBcInkgY3Vyc29yIDFcIiwgXCJUaGUgeSBwb3NpdGlvbiBvZiBjdXJzb3IgMVwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjEpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcImYxXCIsIFwiZiBjdXJzb3IgMVwiLCBcIlRoZSBmcmVxdWVuY3kgb2YgY3Vyc29yIDFcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IxKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5MlwiLCBcInkgY3Vyc29yIDJcIiwgXCJUaGUgeSBwb3NpdGlvbiBvZiBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjIpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcImYyXCIsIFwiZiBjdXJzb3IgMlwiLCBcIlRoZSBmcmVxdWVuY3kgb2YgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IyKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5RGlmZlwiLCBcInkgZGlmZiAoeTIteTEpXCIsIFwiVGhlIHkgZGlmZmVyZW5jZSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJmRGlmZlwiLCBcImYgZGlmZiAoZjItZjEpXCIsIFwiVGhlIGZyZXF1ZW5jeSBkaWZmZXJlbmNlIGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlNZWFuXCIsIFwieSBtZWFuXCIsIFwiVGhlIG1lYW4gdmFsdWUgb2YgeSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5U3REXCIsIFwieSBzdGFuZGFyZCBkZXZpYXRpb25cIiwgXCJUaGUgc3RhbmRhcmQgZGV2aWF0aW9uIG9mIHRoZSB5IHZhbHVlIGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlWYXJcIiwgXCJ5IHZhcmlhbmNlXCIsIFwiVGhlIHZhcmlhbmNlIG9mIHRoZSB5IHZhbHVlIGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlSbXNcIiwgXCJ5IFJNU1wiLCBcIlRoZSByb290IE1lYW4gU3F1YXJlIChSTVMpIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieU1pbmltdW1cIiwgXCJ5IG1pblwiLCBcIlRoZSBtaW5pbXVtIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieU1heGltdW1cIiwgXCJ5IG1heFwiLCBcIlRoZSBtYXhpbXVtIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieVBwXCIsIFwieSBwZWFrIHRvIHBlYWtcIiwgXCJUaGUgcGVhayB0byBwZWFrIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycylcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLnZpc2libGVJbmZvSWRzID0gWyd5MScsICd5MicsICdmMScsICdmMiddOyBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGN1cnNvckluZm9zKCk6IEFycmF5PEN1cnNvckluZm8+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgYnkgdGhlIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSB0byBnZXQgaG9sZFxyXG4gICAgICogb2YgYWxsIGF2YWlsYWJsZSBjdXJzb3IgaW5mb3JtYXRpb24gYXZhaWxhYmxlIHRvIHRoZSBGRlRDaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPn1cclxuICAgICAqIEBtZW1iZXJvZiBGRlRDdXJzb3JTaWduYWxEZXNjcmlwdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxDdXJzb3JJbmZvICgpOiBBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvckluZm9JZHM7XHJcbiAgICB9XHJcbn1cclxuIl19
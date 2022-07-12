define(["require", "exports", "./Cursor"], function (require, exports, Cursor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorHandler = /** @class */ (function () {
        /**
         * initializes the main cursor handler
         * @param {HTMLDivElement} parentContainer
         * @param {Rectangle} [chartArea]
         * @memberof MainCursorHandler
         */
        function CursorHandler(parentContainer, chartArea) {
            this._enableLineCursor = false;
            this._enableCrosshairCursor = false;
            this.parentContainer = parentContainer;
            this.containerId = parentContainer.id + "_cursorHandler";
            this.appendContainer(chartArea);
            //initialize Cursors
            this.cursors = new Array();
            this.cursors[0] = new Cursor_1.Cursor(this.containerId, 0);
            this.cursors[1] = new Cursor_1.Cursor(this.containerId, 1);
            //set cursor colors
            this.cursors[0].setCursorColor("var(--main-cursor1-color)", "var(--main-cursor1-hover-color)", "var(--main-cursor1-active-color)");
            this.cursors[1].setCursorColor("var(--main-cursor2-color)", "var(--main-cursor2-hover-color)", "var(--main-cursor2-active-color)");
        }
        /**
         *draw the cursor of the given cursor index onto the given positions
         *
         * @param {CursorPosition} leadCursorPosition
         * @param {CursorPosition[]} cursorPositions
         * @param {number} cursorIndex
         * @memberof MainCursorHandler
         */
        CursorHandler.prototype.drawCursor = function (leadCursorPosition, cursorPositions, cursorIndex) {
            this.cursors[cursorIndex].drawCursor(leadCursorPosition, cursorPositions);
        };
        /**
         *return the closest cursors position and additional data to a given point
         *
         * @param {IPoint} point
         * @returns {CursorPosition}
         * @memberof MainCursorHandler
         */
        CursorHandler.prototype.getClosestCursorPositionToPoint = function (point, selectedCursorIndex) {
            var distance = undefined;
            var currentClosestCursorPosition;
            for (var _i = 0, _a = this.cursors; _i < _a.length; _i++) {
                var cursor = _a[_i];
                var closestCursorPosition = cursor.getClosestCursorPositionToPoint(point);
                if (closestCursorPosition != undefined) {
                    var cursorsClosestDistance = closestCursorPosition.additionalInformation["distance"];
                    if (distance == undefined || distance > cursorsClosestDistance) {
                        distance = cursorsClosestDistance;
                        currentClosestCursorPosition = closestCursorPosition;
                    }
                    else if (distance == cursorsClosestDistance) {
                        if (cursor.cursorIndex == selectedCursorIndex) {
                            distance = cursorsClosestDistance;
                            currentClosestCursorPosition = closestCursorPosition;
                        }
                    }
                }
            }
            return currentClosestCursorPosition;
        };
        /**
         * sets up the cursor handler html code
         *
         * @private
         * @param {Rectangle} [chartArea]
         * @memberof MainCursorHandler
         */
        CursorHandler.prototype.appendContainer = function (chartArea) {
            var cursorHandlerDiv = document.createElement("div");
            cursorHandlerDiv.id = this.containerId;
            $(this.parentContainer).append(cursorHandlerDiv);
            this.updateChartArea(chartArea);
        };
        /**
         *updates the cursor handlers html position
         *
         * @param {Rectangle} [chartArea]
         * @memberof MainCursorHandler
         */
        CursorHandler.prototype.updateChartArea = function (chartArea) {
            var cursorHandlerDiv = document.getElementById(this.containerId);
            if (cursorHandlerDiv != undefined) {
                cursorHandlerDiv.setAttribute("style", "position: absolute; top: " + chartArea.y + "px;left: " + chartArea.x + "px;width: " + chartArea.width + "px;height: " + chartArea.height + "px;");
            }
        };
        Object.defineProperty(CursorHandler.prototype, "enableLineCursor", {
            get: function () {
                return this._enableLineCursor;
            },
            set: function (enable) {
                this._enableLineCursor = enable;
                for (var i = 0; i < this.cursors.length; i++) {
                    this.cursors[i].enableLineCursor = enable;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorHandler.prototype, "enableCrosshairCursor", {
            get: function () {
                return this._enableCrosshairCursor;
            },
            set: function (enable) {
                this._enableCrosshairCursor = enable;
                for (var i = 0; i < this.cursors.length; i++) {
                    this.cursors[i].enableCrossHairCursor = enable;
                }
            },
            enumerable: true,
            configurable: true
        });
        return CursorHandler;
    }());
    exports.CursorHandler = CursorHandler;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29ySGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9jdXJzb3IvQ3Vyc29ySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQVVJOzs7OztXQUtHO1FBQ0gsdUJBQVksZUFBK0IsRUFBRSxTQUFxQjtZQVoxRCxzQkFBaUIsR0FBYSxLQUFLLENBQUM7WUFDcEMsMkJBQXNCLEdBQVksS0FBSyxDQUFDO1lBWTVDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztZQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVUsQ0FBQyxDQUFDO1lBRWpDLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVsRCxtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsMkJBQTJCLEVBQUMsaUNBQWlDLEVBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNqSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsRUFBQyxpQ0FBaUMsRUFBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3JJLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ0ksa0NBQVUsR0FBakIsVUFBa0Isa0JBQWtDLEVBQUUsZUFBZ0MsRUFBRSxXQUFtQjtZQUN2RyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksdURBQStCLEdBQXRDLFVBQXVDLEtBQWEsRUFBRSxtQkFBMkI7WUFDN0UsSUFBSSxRQUFRLEdBQXFCLFNBQVMsQ0FBQztZQUMzQyxJQUFJLDRCQUE2QyxDQUFDO1lBRWxELEtBQWtCLFVBQVksRUFBWixLQUFBLElBQUksQ0FBQyxPQUFPLEVBQVosY0FBWSxFQUFaLElBQVksRUFBQztnQkFBM0IsSUFBSSxNQUFNLFNBQUE7Z0JBQ1YsSUFBSSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFFLElBQUcscUJBQXFCLElBQUksU0FBUyxFQUFDO29CQUNsQyxJQUFJLHNCQUFzQixHQUFHLHFCQUFzQixDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN0RixJQUFHLFFBQVEsSUFBSSxTQUFTLElBQUksUUFBUSxHQUFHLHNCQUFzQixFQUFDO3dCQUMxRCxRQUFRLEdBQUcsc0JBQXNCLENBQUM7d0JBQ2xDLDRCQUE0QixHQUFHLHFCQUFxQixDQUFDO3FCQUN4RDt5QkFDSSxJQUFHLFFBQVEsSUFBSSxzQkFBc0IsRUFBQzt3QkFDdkMsSUFBRyxNQUFNLENBQUMsV0FBVyxJQUFJLG1CQUFtQixFQUFDOzRCQUN6QyxRQUFRLEdBQUcsc0JBQXNCLENBQUM7NEJBQ2xDLDRCQUE0QixHQUFHLHFCQUFxQixDQUFDO3lCQUN4RDtxQkFDSjtpQkFDSjthQUNKO1lBRUQsT0FBTyw0QkFBNkIsQ0FBQztRQUN6QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssdUNBQWUsR0FBdkIsVUFBeUIsU0FBb0I7WUFDekMsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELGdCQUFnQixDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSx1Q0FBZSxHQUF0QixVQUF1QixTQUFxQjtZQUN4QyxJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pFLElBQUcsZ0JBQWdCLElBQUksU0FBUyxFQUFDO2dCQUM3QixnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLDJCQUEyQixHQUFFLFNBQVUsQ0FBQyxDQUFDLEdBQUcsV0FBVyxHQUFFLFNBQVUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxHQUFFLFNBQVUsQ0FBQyxLQUFLLEdBQUcsYUFBYSxHQUFFLFNBQVUsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0w7UUFDTCxDQUFDO1FBRUQsc0JBQVcsMkNBQWdCO2lCQU8zQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDO2lCQVRELFVBQTRCLE1BQWdCO2dCQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO2dCQUNoQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO2lCQUM3QztZQUNMLENBQUM7OztXQUFBO1FBTUQsc0JBQVcsZ0RBQXFCO2lCQU9oQztnQkFDSSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUN2QyxDQUFDO2lCQVRELFVBQWlDLE1BQWdCO2dCQUM3QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDO2dCQUNyQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDO2lCQUNsRDtZQUNMLENBQUM7OztXQUFBO1FBS0wsb0JBQUM7SUFBRCxDQUFDLEFBM0hELElBMkhDO0lBM0hZLHNDQUFhO0lBMkh6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3IgfSBmcm9tIFwiLi9DdXJzb3JcIjtcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvUmVjdGFuZ2xlXCI7XHJcbmltcG9ydCB7IEN1cnNvclBvc2l0aW9uIH0gZnJvbSBcIi4vQ3Vyc29yUG9zaXRpb25JbmZvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29ySGFuZGxlciB7IFxyXG4gICAgcHJpdmF0ZSBwYXJlbnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBjb250YWluZXJJZDogc3RyaW5nXHJcblxyXG4gICAgcHJpdmF0ZSBfZW5hYmxlTGluZUN1cnNvciA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2VuYWJsZUNyb3NzaGFpckN1cnNvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgXHJcbiAgICBwcml2YXRlIGN1cnNvcnMgOiBDdXJzb3JbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBtYWluIGN1cnNvciBoYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBwYXJlbnRDb250YWluZXJcclxuICAgICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBbY2hhcnRBcmVhXVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5DdXJzb3JIYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQsIGNoYXJ0QXJlYT86IFJlY3RhbmdsZSkge1xyXG4gICAgICAgIHRoaXMucGFyZW50Q29udGFpbmVyID0gcGFyZW50Q29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySWQgPSBwYXJlbnRDb250YWluZXIuaWQgKyBcIl9jdXJzb3JIYW5kbGVyXCI7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDb250YWluZXIoY2hhcnRBcmVhISk7XHJcbiAgICBcclxuICAgICAgICAvL2luaXRpYWxpemUgQ3Vyc29yc1xyXG4gICAgICAgIHRoaXMuY3Vyc29ycyA9IG5ldyBBcnJheTxDdXJzb3I+KCk7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzWzBdID0gbmV3IEN1cnNvcih0aGlzLmNvbnRhaW5lcklkLCAwKTtcclxuICAgICAgICB0aGlzLmN1cnNvcnNbMV0gPSBuZXcgQ3Vyc29yKHRoaXMuY29udGFpbmVySWQsIDEpO1xyXG5cclxuICAgICAgICAvL3NldCBjdXJzb3IgY29sb3JzXHJcbiAgICAgICAgdGhpcy5jdXJzb3JzWzBdLnNldEN1cnNvckNvbG9yKFwidmFyKC0tbWFpbi1jdXJzb3IxLWNvbG9yKVwiLFwidmFyKC0tbWFpbi1jdXJzb3IxLWhvdmVyLWNvbG9yKVwiLFwidmFyKC0tbWFpbi1jdXJzb3IxLWFjdGl2ZS1jb2xvcilcIik7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzWzFdLnNldEN1cnNvckNvbG9yKFwidmFyKC0tbWFpbi1jdXJzb3IyLWNvbG9yKVwiLFwidmFyKC0tbWFpbi1jdXJzb3IyLWhvdmVyLWNvbG9yKVwiLFwidmFyKC0tbWFpbi1jdXJzb3IyLWFjdGl2ZS1jb2xvcilcIik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqZHJhdyB0aGUgY3Vyc29yIG9mIHRoZSBnaXZlbiBjdXJzb3IgaW5kZXggb250byB0aGUgZ2l2ZW4gcG9zaXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JQb3NpdGlvbn0gbGVhZEN1cnNvclBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclBvc2l0aW9uW119IGN1cnNvclBvc2l0aW9uc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbkN1cnNvckhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uOiBDdXJzb3JQb3NpdGlvbiwgY3Vyc29yUG9zaXRpb25zOkN1cnNvclBvc2l0aW9uW10sIGN1cnNvckluZGV4OiBudW1iZXIpIDogdm9pZHtcclxuICAgICAgICB0aGlzLmN1cnNvcnNbY3Vyc29ySW5kZXhdLmRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uLCBjdXJzb3JQb3NpdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpyZXR1cm4gdGhlIGNsb3Nlc3QgY3Vyc29ycyBwb3NpdGlvbiBhbmQgYWRkaXRpb25hbCBkYXRhIHRvIGEgZ2l2ZW4gcG9pbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gcG9pbnRcclxuICAgICAqIEByZXR1cm5zIHtDdXJzb3JQb3NpdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluQ3Vyc29ySGFuZGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2xvc2VzdEN1cnNvclBvc2l0aW9uVG9Qb2ludChwb2ludDogSVBvaW50LCBzZWxlY3RlZEN1cnNvckluZGV4OiBudW1iZXIpOiBDdXJzb3JQb3NpdGlvbntcclxuICAgICAgICBsZXQgZGlzdGFuY2UgOnVuZGVmaW5lZHxudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb24gOiBDdXJzb3JQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBjdXJzb3Igb2YgdGhpcy5jdXJzb3JzKXtcclxuICAgICAgICAgICAgbGV0IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbiA9IGN1cnNvci5nZXRDbG9zZXN0Q3Vyc29yUG9zaXRpb25Ub1BvaW50KHBvaW50KTtcclxuICAgICAgICAgICAgaWYoY2xvc2VzdEN1cnNvclBvc2l0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yc0Nsb3Nlc3REaXN0YW5jZSA9IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbiEuYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiZGlzdGFuY2VcIl07XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZSA9PSB1bmRlZmluZWQgfHwgZGlzdGFuY2UgPiBjdXJzb3JzQ2xvc2VzdERpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbiA9IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoZGlzdGFuY2UgPT0gY3Vyc29yc0Nsb3Nlc3REaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3Vyc29yLmN1cnNvckluZGV4ID09IHNlbGVjdGVkQ3Vyc29ySW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb24gPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbiE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzIHVwIHRoZSBjdXJzb3IgaGFuZGxlciBodG1sIGNvZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtSZWN0YW5nbGV9IFtjaGFydEFyZWFdXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbkN1cnNvckhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhcHBlbmRDb250YWluZXIgKGNoYXJ0QXJlYTogUmVjdGFuZ2xlKSB7ICAgICAgICBcclxuICAgICAgICBsZXQgY3Vyc29ySGFuZGxlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY3Vyc29ySGFuZGxlckRpdi5pZCA9IHRoaXMuY29udGFpbmVySWQ7XHJcbiAgICAgICAgJCh0aGlzLnBhcmVudENvbnRhaW5lcikuYXBwZW5kKGN1cnNvckhhbmRsZXJEaXYpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hhcnRBcmVhKGNoYXJ0QXJlYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKnVwZGF0ZXMgdGhlIGN1cnNvciBoYW5kbGVycyBodG1sIHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZWN0YW5nbGV9IFtjaGFydEFyZWFdXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbkN1cnNvckhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUNoYXJ0QXJlYShjaGFydEFyZWE/OiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIGxldCBjdXJzb3JIYW5kbGVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5jb250YWluZXJJZCk7XHJcbiAgICAgICAgaWYoY3Vyc29ySGFuZGxlckRpdiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JIYW5kbGVyRGl2LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IFwiKyBjaGFydEFyZWEhLnkgKyBcInB4O2xlZnQ6IFwiKyBjaGFydEFyZWEhLnggKyBcInB4O3dpZHRoOiBcIisgY2hhcnRBcmVhIS53aWR0aCArIFwicHg7aGVpZ2h0OiBcIisgY2hhcnRBcmVhIS5oZWlnaHQrXCJweDtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZW5hYmxlTGluZUN1cnNvcihlbmFibGUgOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9lbmFibGVMaW5lQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmN1cnNvcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNbaV0uZW5hYmxlTGluZUN1cnNvciA9IGVuYWJsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBlbmFibGVMaW5lQ3Vyc29yKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZUxpbmVDdXJzb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBlbmFibGVDcm9zc2hhaXJDdXJzb3IoZW5hYmxlIDogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlQ3Jvc3NoYWlyQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmN1cnNvcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNbaV0uZW5hYmxlQ3Jvc3NIYWlyQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVuYWJsZUNyb3NzaGFpckN1cnNvcigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVDcm9zc2hhaXJDdXJzb3I7XHJcbiAgICB9XHJcbn07Il19
define(["require", "exports", "./CrossHairCursor", "./LineCursor"], function (require, exports, CrossHairCursor_1, LineCursor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Cursor = /** @class */ (function () {
        function Cursor(cursorHandlerID, cursorIndex) {
            this._enableLineCursor = false;
            this._enableCrossHairCursor = false;
            this.cursorIndex = cursorIndex;
            this.lineCursor = new LineCursor_1.LineCursor(cursorHandlerID, cursorIndex);
            this.crossHairCursor = new CrossHairCursor_1.CrossHairCursor(cursorHandlerID, cursorIndex);
        }
        /**
         * set the cursor colors
         *
         * @param {string} cursorColor
         * @param {string} hoverColor
         * @param {string} selectedColor
         * @memberof Cursor
         */
        Cursor.prototype.setCursorColor = function (cursorColor, hoverColor, selectedColor) {
            this.lineCursor.setColor(cursorColor, hoverColor, selectedColor);
            this.crossHairCursor.setColor(cursorColor, hoverColor, selectedColor);
        };
        /**
         *draw the cursor to the given positions
         *
         * @param {*} leadCursorPosition
         * @param {*} cursorPositions
         * @memberof Cursor
         */
        Cursor.prototype.drawCursor = function (leadCursorPosition, cursorPositions) {
            this.lineCursor.removeCursors();
            if (this.enableLineCursor == true) {
                this.lineCursor.drawCursor(leadCursorPosition, cursorPositions);
            }
            this.crossHairCursor.removeCursors();
            if (this.enableCrossHairCursor == true) {
                this.crossHairCursor.drawCursor(leadCursorPosition, cursorPositions);
            }
        };
        /**
         * return the closest cursors position and additional data to a given point
         *
         * @param {IPoint} point
         * @returns {CursorPosition}
         * @memberof Cursor
         */
        Cursor.prototype.getClosestCursorPositionToPoint = function (point) {
            var distance = undefined;
            var currentClosestCursorPosition;
            var cursorStyles = this.getCursorStyleArray();
            for (var i = 0; i < cursorStyles.length; i++) {
                var cursorsClosestCursorPosition = cursorStyles[i].getClosestCursorPositionToPoint(point);
                if (cursorsClosestCursorPosition != undefined) {
                    var cursorsClosestDistance = cursorsClosestCursorPosition.additionalInformation["distance"];
                    if ((distance == undefined || distance > cursorsClosestDistance)) {
                        distance = cursorsClosestDistance;
                        currentClosestCursorPosition = cursorsClosestCursorPosition;
                    }
                }
            }
            return currentClosestCursorPosition;
        };
        /**
         *
         * returns an array with all available cursor styles
         * @private
         * @returns {Array<CursorDefinitionBase>}
         * @memberof Cursor
         */
        Cursor.prototype.getCursorStyleArray = function () {
            var cursorStyles = new Array();
            if (this.enableLineCursor == true) {
                cursorStyles.push(this.lineCursor);
            }
            if (this.enableCrossHairCursor == true) {
                cursorStyles.push(this.crossHairCursor);
            }
            return cursorStyles;
        };
        Object.defineProperty(Cursor.prototype, "enableLineCursor", {
            get: function () {
                return this._enableLineCursor;
            },
            set: function (enable) {
                this._enableLineCursor = enable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cursor.prototype, "enableCrossHairCursor", {
            get: function () {
                return this._enableCrossHairCursor;
            },
            set: function (enable) {
                this._enableCrossHairCursor = enable;
            },
            enumerable: true,
            configurable: true
        });
        return Cursor;
    }());
    exports.Cursor = Cursor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2N1cnNvci9DdXJzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7UUFVSSxnQkFBWSxlQUF1QixFQUFFLFdBQW1CO1lBTmhELHNCQUFpQixHQUFZLEtBQUssQ0FBQztZQUNuQywyQkFBc0IsR0FBWSxLQUFLLENBQUM7WUFNNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNJLCtCQUFjLEdBQXJCLFVBQXNCLFdBQW1CLEVBQUUsVUFBa0IsRUFBRSxhQUFxQjtZQUNoRixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDJCQUFVLEdBQWpCLFVBQWtCLGtCQUFrQixFQUFFLGVBQWU7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNoQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQ25FO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQ3hFO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGdEQUErQixHQUF0QyxVQUF1QyxLQUFhO1lBQ2hELElBQUksUUFBUSxHQUF1QixTQUFTLENBQUM7WUFDN0MsSUFBSSw0QkFBNEIsQ0FBQztZQUNqQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSw0QkFBNEIsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFGLElBQUksNEJBQTRCLElBQUksU0FBUyxFQUFDO29CQUMxQyxJQUFJLHNCQUFzQixHQUFHLDRCQUE2QixDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM3RixJQUFHLENBQUMsUUFBUSxJQUFJLFNBQVMsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsRUFBRTt3QkFDN0QsUUFBUSxHQUFHLHNCQUFzQixDQUFDO3dCQUNsQyw0QkFBNEIsR0FBRyw0QkFBNEIsQ0FBQztxQkFDL0Q7aUJBQ0o7YUFDSjtZQUNELE9BQU8sNEJBQTRCLENBQUM7UUFDeEMsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNLLG9DQUFtQixHQUEzQjtZQUNJLElBQUksWUFBWSxHQUFHLElBQUksS0FBSyxFQUF3QixDQUFDO1lBQ3JELElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtnQkFDL0IsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdEM7WUFDRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQztRQUlELHNCQUFXLG9DQUFnQjtpQkFHM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbEMsQ0FBQztpQkFMRCxVQUE0QixNQUFlO2dCQUN2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLENBQUM7OztXQUFBO1FBSUQsc0JBQVcseUNBQXFCO2lCQUdoQztnQkFDSSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUN2QyxDQUFDO2lCQUxELFVBQWlDLE1BQWU7Z0JBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUM7WUFDekMsQ0FBQzs7O1dBQUE7UUFJTCxhQUFDO0lBQUQsQ0FBQyxBQXpHRCxJQXlHQztJQXpHWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29yUG9zaXRpb24gfSBmcm9tIFwiLi9DdXJzb3JQb3NpdGlvbkluZm9cIjtcclxuaW1wb3J0IHsgQ3Jvc3NIYWlyQ3Vyc29yIH0gZnJvbSBcIi4vQ3Jvc3NIYWlyQ3Vyc29yXCI7XHJcbmltcG9ydCB7IExpbmVDdXJzb3IgfSBmcm9tIFwiLi9MaW5lQ3Vyc29yXCI7XHJcbmltcG9ydCB7IEN1cnNvckRlZmluaXRpb25CYXNlIH0gZnJvbSBcIi4vQ3Vyc29yRGVmaW5pdGlvbkJhc2VcIjtcclxuZXhwb3J0IGNsYXNzIEN1cnNvciB7XHJcbiAgICBwdWJsaWMgY3Vyc29ySW5kZXg6IG51bWJlcjtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfZW5hYmxlTGluZUN1cnNvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZW5hYmxlQ3Jvc3NIYWlyQ3Vyc29yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIHByaXZhdGUgbGluZUN1cnNvcjogTGluZUN1cnNvcjtcclxuICAgIHByaXZhdGUgY3Jvc3NIYWlyQ3Vyc29yOiBDcm9zc0hhaXJDdXJzb3I7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGN1cnNvckhhbmRsZXJJRDogc3RyaW5nLCBjdXJzb3JJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JJbmRleCA9IGN1cnNvckluZGV4O1xyXG4gICAgICAgIHRoaXMubGluZUN1cnNvciA9IG5ldyBMaW5lQ3Vyc29yKGN1cnNvckhhbmRsZXJJRCwgY3Vyc29ySW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY3Jvc3NIYWlyQ3Vyc29yID0gbmV3IENyb3NzSGFpckN1cnNvcihjdXJzb3JIYW5kbGVySUQsIGN1cnNvckluZGV4KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIGN1cnNvciBjb2xvcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3Vyc29yQ29sb3JcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBob3ZlckNvbG9yXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWRDb2xvclxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q3Vyc29yQ29sb3IoY3Vyc29yQ29sb3I6IHN0cmluZywgaG92ZXJDb2xvcjogc3RyaW5nLCBzZWxlY3RlZENvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmxpbmVDdXJzb3Iuc2V0Q29sb3IoY3Vyc29yQ29sb3IsIGhvdmVyQ29sb3IsIHNlbGVjdGVkQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY3Jvc3NIYWlyQ3Vyc29yLnNldENvbG9yKGN1cnNvckNvbG9yLCBob3ZlckNvbG9yLCBzZWxlY3RlZENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqZHJhdyB0aGUgY3Vyc29yIHRvIHRoZSBnaXZlbiBwb3NpdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGxlYWRDdXJzb3JQb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJzb3JQb3NpdGlvbnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uLCBjdXJzb3JQb3NpdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmxpbmVDdXJzb3IucmVtb3ZlQ3Vyc29ycygpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZUxpbmVDdXJzb3IgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVDdXJzb3IuZHJhd0N1cnNvcihsZWFkQ3Vyc29yUG9zaXRpb24sIGN1cnNvclBvc2l0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3Jvc3NIYWlyQ3Vyc29yLnJlbW92ZUN1cnNvcnMoKTtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVDcm9zc0hhaXJDdXJzb3IgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNyb3NzSGFpckN1cnNvci5kcmF3Q3Vyc29yKGxlYWRDdXJzb3JQb3NpdGlvbiwgY3Vyc29yUG9zaXRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGhlIGNsb3Nlc3QgY3Vyc29ycyBwb3NpdGlvbiBhbmQgYWRkaXRpb25hbCBkYXRhIHRvIGEgZ2l2ZW4gcG9pbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gcG9pbnRcclxuICAgICAqIEByZXR1cm5zIHtDdXJzb3JQb3NpdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENsb3Nlc3RDdXJzb3JQb3NpdGlvblRvUG9pbnQocG9pbnQ6IElQb2ludCk6IEN1cnNvclBvc2l0aW9uIHtcclxuICAgICAgICBsZXQgZGlzdGFuY2U6IHVuZGVmaW5lZCB8IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbjtcclxuICAgICAgICBsZXQgY3Vyc29yU3R5bGVzID0gdGhpcy5nZXRDdXJzb3JTdHlsZUFycmF5KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJzb3JTdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnNvcnNDbG9zZXN0Q3Vyc29yUG9zaXRpb24gPSBjdXJzb3JTdHlsZXNbaV0uZ2V0Q2xvc2VzdEN1cnNvclBvc2l0aW9uVG9Qb2ludChwb2ludCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JzQ2xvc2VzdEN1cnNvclBvc2l0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yc0Nsb3Nlc3REaXN0YW5jZSA9IGN1cnNvcnNDbG9zZXN0Q3Vyc29yUG9zaXRpb24hLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImRpc3RhbmNlXCJdO1xyXG4gICAgICAgICAgICAgICAgaWYoKGRpc3RhbmNlID09IHVuZGVmaW5lZCB8fCBkaXN0YW5jZSA+IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBjdXJzb3JzQ2xvc2VzdERpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb24gPSBjdXJzb3JzQ2xvc2VzdEN1cnNvclBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Q2xvc2VzdEN1cnNvclBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiByZXR1cm5zIGFuIGFycmF5IHdpdGggYWxsIGF2YWlsYWJsZSBjdXJzb3Igc3R5bGVzXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvckRlZmluaXRpb25CYXNlPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3JTdHlsZUFycmF5KCk6IEFycmF5PEN1cnNvckRlZmluaXRpb25CYXNlPiB7XHJcbiAgICAgICAgbGV0IGN1cnNvclN0eWxlcyA9IG5ldyBBcnJheTxDdXJzb3JEZWZpbml0aW9uQmFzZT4oKTtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVMaW5lQ3Vyc29yID09IHRydWUpIHtcclxuICAgICAgICAgICAgY3Vyc29yU3R5bGVzLnB1c2godGhpcy5saW5lQ3Vyc29yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlQ3Jvc3NIYWlyQ3Vyc29yID09IHRydWUpIHtcclxuICAgICAgICAgICAgY3Vyc29yU3R5bGVzLnB1c2godGhpcy5jcm9zc0hhaXJDdXJzb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3Vyc29yU3R5bGVzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXQgZW5hYmxlTGluZUN1cnNvcihlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9lbmFibGVMaW5lQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBlbmFibGVMaW5lQ3Vyc29yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVMaW5lQ3Vyc29yO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBlbmFibGVDcm9zc0hhaXJDdXJzb3IoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlQ3Jvc3NIYWlyQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBlbmFibGVDcm9zc0hhaXJDdXJzb3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZUNyb3NzSGFpckN1cnNvcjtcclxuICAgIH1cclxufVxyXG4iXX0=
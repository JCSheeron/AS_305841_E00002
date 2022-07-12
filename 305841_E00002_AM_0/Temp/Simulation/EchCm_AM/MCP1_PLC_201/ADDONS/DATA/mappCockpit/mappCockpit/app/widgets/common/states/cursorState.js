define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * holds and manages the state of a single cursor
     *
     * @class CursorState
     */
    var CursorState = /** @class */ (function () {
        /**
         * Creates an instance of CursorState.
         * @memberof CursorState
         */
        function CursorState(type) {
            // initialize states
            this.selected = false;
            this.active = false;
            this.hovered = false;
            this.position = undefined;
            this.type = type;
        }
        return CursorState;
    }());
    exports.CursorState = CursorState;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTs7OztPQUlHO0lBQ0g7UUFRSTs7O1dBR0c7UUFDSCxxQkFBWSxJQUFJO1lBQ1osb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUFwQkQsSUFvQkM7SUFwQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ3Vyc29yU3RhdGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jdXJzb3JTdGF0ZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JUeXBlIH0gZnJvbSBcIi4vY3Vyc29yVHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIGhvbGRzIGFuZCBtYW5hZ2VzIHRoZSBzdGF0ZSBvZiBhIHNpbmdsZSBjdXJzb3JcclxuICpcclxuICogQGNsYXNzIEN1cnNvclN0YXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3Vyc29yU3RhdGUgaW1wbGVtZW50cyBJQ3Vyc29yU3RhdGV7XHJcblxyXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgICBob3ZlcmVkOiBib29sZWFuO1xyXG4gICAgcG9zaXRpb246IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICB0eXBlOiBDdXJzb3JUeXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDdXJzb3JTdGF0ZS5cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlKXtcclxuICAgICAgICAvLyBpbml0aWFsaXplIHN0YXRlc1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaG92ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxufSJdfQ==
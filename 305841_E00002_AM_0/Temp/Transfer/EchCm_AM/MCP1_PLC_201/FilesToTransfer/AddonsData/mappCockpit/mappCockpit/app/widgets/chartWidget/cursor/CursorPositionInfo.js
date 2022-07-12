define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *this class holds the cursors position and additional information that is defined by the user
     *
     * @export
     * @class CursorPosition
     */
    var CursorPosition = /** @class */ (function () {
        function CursorPosition(position, additionalInformation) {
            this.position = position;
            this.additionalInformation = (additionalInformation != undefined) ? additionalInformation : {};
        }
        return CursorPosition;
    }());
    exports.CursorPosition = CursorPosition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yUG9zaXRpb25JbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2N1cnNvci9DdXJzb3JQb3NpdGlvbkluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7Ozs7O09BS0c7SUFDSDtRQUdJLHdCQUFZLFFBQWdCLEVBQUUscUJBQTBCO1lBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLHFCQUFxQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ25HLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUFQRCxJQU9DO0lBUFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICp0aGlzIGNsYXNzIGhvbGRzIHRoZSBjdXJzb3JzIHBvc2l0aW9uIGFuZCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHRoYXQgaXMgZGVmaW5lZCBieSB0aGUgdXNlclxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDdXJzb3JQb3NpdGlvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEN1cnNvclBvc2l0aW9uIHtcclxuICAgIHBvc2l0aW9uOiBJUG9pbnQ7XHJcbiAgICBhZGRpdGlvbmFsSW5mb3JtYXRpb246IHt9O1xyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IElQb2ludCwgYWRkaXRpb25hbEluZm9ybWF0aW9uPzoge30pIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsSW5mb3JtYXRpb24gPSAoYWRkaXRpb25hbEluZm9ybWF0aW9uICE9IHVuZGVmaW5lZCkgPyBhZGRpdGlvbmFsSW5mb3JtYXRpb24gOiB7fTtcclxuICAgIH1cclxufVxyXG4iXX0=
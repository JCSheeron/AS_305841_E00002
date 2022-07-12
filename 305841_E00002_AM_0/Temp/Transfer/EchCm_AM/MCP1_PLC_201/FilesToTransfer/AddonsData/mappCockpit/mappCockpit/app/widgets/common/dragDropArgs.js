define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DragDropArgs = /** @class */ (function () {
        function DragDropArgs(currentTraget, data, dragDropRepresentation) {
            if (dragDropRepresentation === void 0) { dragDropRepresentation = undefined; }
            this._currentTarget = currentTraget;
            this._data = data;
            this._dragDropRepresentation = dragDropRepresentation;
        }
        Object.defineProperty(DragDropArgs.prototype, "currentTarget", {
            get: function () {
                return this._currentTarget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragDropArgs.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragDropArgs.prototype, "dragDropRepresentation", {
            get: function () {
                return this._dragDropRepresentation;
            },
            set: function (value) {
                this._dragDropRepresentation = value;
            },
            enumerable: true,
            configurable: true
        });
        return DragDropArgs;
    }());
    exports.DragDropArgs = DragDropArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0Ryb3BBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9kcmFnRHJvcEFyZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFxQkksc0JBQVksYUFBa0IsRUFBRSxJQUFTLEVBQUUsc0JBQW9FO1lBQXBFLHVDQUFBLEVBQUEsa0NBQW9FO1lBQzNHLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxzQkFBc0IsQ0FBQztRQUMxRCxDQUFDO1FBdEJELHNCQUFXLHVDQUFhO2lCQUF4QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDL0IsQ0FBQzs7O1dBQUE7UUFHRCxzQkFBVyw4QkFBSTtpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQzs7O1dBQUE7UUFHRCxzQkFBVyxnREFBc0I7aUJBQWpDO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDO1lBQ3hDLENBQUM7aUJBRUQsVUFBa0MsS0FBdUM7Z0JBQ3JFLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7WUFDekMsQ0FBQzs7O1dBSkE7UUFXTCxtQkFBQztJQUFELENBQUMsQUExQkQsSUEwQkM7SUExQlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4vZHJhZ0Ryb3BSZXByZXNlbnRhdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERyYWdEcm9wQXJnc3tcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY3VycmVudFRhcmdldDogYW55O1xyXG4gICAgcHVibGljIGdldCBjdXJyZW50VGFyZ2V0KCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRUYXJnZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2RhdGE6IGFueTtcclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RyYWdEcm9wUmVwcmVzZW50YXRpb246IERyYWdEcm9wUmVwcmVzZW50YXRpb258dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGdldCBkcmFnRHJvcFJlcHJlc2VudGF0aW9uKCk6IERyYWdEcm9wUmVwcmVzZW50YXRpb258dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRyYWdEcm9wUmVwcmVzZW50YXRpb24odmFsdWU6IERyYWdEcm9wUmVwcmVzZW50YXRpb258dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihjdXJyZW50VHJhZ2V0OiBhbnksIGRhdGE6IGFueSwgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbjogRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbnx1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBjdXJyZW50VHJhZ2V0O1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuX2RyYWdEcm9wUmVwcmVzZW50YXRpb24gPSBkcmFnRHJvcFJlcHJlc2VudGF0aW9uO1xyXG4gICAgfVxyXG59Il19
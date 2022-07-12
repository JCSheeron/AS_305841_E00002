define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PaneProperties = /** @class */ (function () {
        function PaneProperties() {
            this._collapsible = false;
            this._expandable = false;
            this._maxSize = null;
            this._minSize = 10;
            this._paneSize = -1;
            this._resizable = true;
        }
        Object.defineProperty(PaneProperties.prototype, "collapsible", {
            get: function () {
                return this._collapsible;
            },
            set: function (collapsible) {
                this._collapsible = collapsible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaneProperties.prototype, "expandable", {
            get: function () {
                return this._expandable;
            },
            set: function (expandable) {
                this._expandable = expandable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaneProperties.prototype, "maxSize", {
            get: function () {
                return this._maxSize;
            },
            set: function (maxSize) {
                this._maxSize = maxSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaneProperties.prototype, "minSize", {
            get: function () {
                return this._minSize;
            },
            set: function (minSize) {
                this._minSize = minSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaneProperties.prototype, "paneSize", {
            get: function () {
                return this._paneSize;
            },
            set: function (paneSize) {
                this._paneSize = paneSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaneProperties.prototype, "resizable", {
            get: function () {
                return this._resizable;
            },
            set: function (resizable) {
                this._resizable = resizable;
            },
            enumerable: true,
            configurable: true
        });
        return PaneProperties;
    }());
    exports.PaneProperties = PaneProperties;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZVByb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3BhbmVQcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7WUFFWSxpQkFBWSxHQUFZLEtBQUssQ0FBQztZQUM5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztZQUM3QixhQUFRLEdBQWtCLElBQUksQ0FBQztZQUMvQixhQUFRLEdBQVcsRUFBRSxDQUFDO1lBQ3RCLGNBQVMsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUN2QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBa0R2QyxDQUFDO1FBaERHLHNCQUFJLHVDQUFXO2lCQUlmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDO2lCQU5ELFVBQWdCLFdBQW9CO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNwQyxDQUFDOzs7V0FBQTtRQU1ELHNCQUFJLHNDQUFVO2lCQUlkO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QixDQUFDO2lCQU5ELFVBQWUsVUFBbUI7Z0JBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLENBQUM7OztXQUFBO1FBTUQsc0JBQUksbUNBQU87aUJBSVg7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7aUJBTkQsVUFBWSxPQUFzQjtnQkFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDNUIsQ0FBQzs7O1dBQUE7UUFNRCxzQkFBSSxtQ0FBTztpQkFJWDtnQkFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekIsQ0FBQztpQkFORCxVQUFZLE9BQWU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQzVCLENBQUM7OztXQUFBO1FBTUQsc0JBQUksb0NBQVE7aUJBSVo7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUM7aUJBTkQsVUFBYSxRQUFnQjtnQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDOUIsQ0FBQzs7O1dBQUE7UUFNRCxzQkFBSSxxQ0FBUztpQkFJYjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQztpQkFORCxVQUFjLFNBQWtCO2dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUNoQyxDQUFDOzs7V0FBQTtRQU1MLHFCQUFDO0lBQUQsQ0FBQyxBQXpERCxJQXlEQztJQUVPLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGFuZVByb3BlcnRpZXN7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29sbGFwc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2V4cGFuZGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX21heFNpemU6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWluU2l6ZTogbnVtYmVyID0gMTA7XHJcbiAgICBwcml2YXRlIF9wYW5lU2l6ZTogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9yZXNpemFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHNldCBjb2xsYXBzaWJsZShjb2xsYXBzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2NvbGxhcHNpYmxlID0gY29sbGFwc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbGxhcHNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZXhwYW5kYWJsZShleHBhbmRhYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwYW5kYWJsZSA9IGV4cGFuZGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGV4cGFuZGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1heFNpemUobWF4U2l6ZTogbnVtYmVyIHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX21heFNpemUgPSBtYXhTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhTaXplKCk6IG51bWJlciB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW5TaXplKG1pblNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX21pblNpemUgPSBtaW5TaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW5TaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBhbmVTaXplKHBhbmVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9wYW5lU2l6ZSA9IHBhbmVTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYW5lU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYW5lU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcmVzaXphYmxlKHJlc2l6YWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Jlc2l6YWJsZSA9IHJlc2l6YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVzaXphYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNpemFibGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge1BhbmVQcm9wZXJ0aWVzfTsiXX0=
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
define(["require", "exports", "./widgetBase", "../../framework/events", "./uniqueIdGenerator"], function (require, exports, widgetBase_1, events_1, uniqueIdGenerator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventWidgetActivated = /** @class */ (function (_super) {
        __extends(EventWidgetActivated, _super);
        function EventWidgetActivated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventWidgetActivated;
    }(events_1.TypedEvent));
    ;
    var LayoutWidgetBase = /** @class */ (function (_super) {
        __extends(LayoutWidgetBase, _super);
        function LayoutWidgetBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventWidgetActivated = new EventWidgetActivated();
            return _this;
        }
        LayoutWidgetBase.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            for (var key in this.layoutPanes) {
                // check if the property/key is defined in the object
                if (this.layoutPanes.hasOwnProperty(key)) {
                    delete this.layoutPanes[key];
                }
            }
        };
        /**
         * Adds a widget to the widgets list of this layout widget
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {{}} [data]
         * @param {PaneProperties} [paneProperties]
         * @memberof LayoutWidgetBase
         */
        LayoutWidgetBase.prototype.addWidget = function (widget, name, viewType, data, paneProperties) {
            if (viewType == undefined) {
                console.error("viewType for addWidget(...) not defined!");
            }
            var id = name + "_" + viewType.toString();
            id = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(id);
            if (this._widgets.get(id) != undefined) {
                console.error("addWidget %s => id (%s) must be unique", name, viewType);
            }
            this._widgets.set(id, widget);
            this.addWidgetToView(widget, this.view);
        };
        /**
         * Removes a widget from the widgets list of this layout widget
         *
         * @param {(IWidget|undefined)} widget
         * @returns
         * @memberof LayoutWidgetBase
         */
        LayoutWidgetBase.prototype.removeWidget = function (widget) {
            var _this = this;
            if (widget == undefined) {
                return;
            }
            this._widgets.forEach(function (widgetTemp, key) {
                if (widgetTemp === widget) {
                    if (_this.view) {
                        _this.removeWidgetFromView(widget);
                    }
                    _this._widgets.delete(key);
                }
            });
        };
        LayoutWidgetBase.prototype.addWidgetToView = function (widget, view) {
            if (view) {
                view.addWidget(widget);
            }
        };
        LayoutWidgetBase.prototype.removeWidgetFromView = function (widget) {
            if (this.view) {
                this.view.removeWidget(widget);
            }
        };
        LayoutWidgetBase.prototype.recalculateLayout = function () {
        };
        return LayoutWidgetBase;
    }(widgetBase_1.WidgetBase));
    exports.LayoutWidgetBase = LayoutWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0V2lkZ2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBbUMsd0NBQTBDO1FBQTdFOztRQUErRSxDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQUFDLEFBQWhGLENBQW1DLG1CQUFVLEdBQW1DO0lBQUEsQ0FBQztJQUVqRjtRQUF3QyxvQ0FBVTtRQUFsRDtZQUFBLHFFQStFQztZQTdFRywwQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7O1FBNkV0RCxDQUFDO1FBekVHLGtDQUFPLEdBQVA7WUFDSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztZQUVoQixLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzlCLHFEQUFxRDtnQkFDckQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDdEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQzthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILG9DQUFTLEdBQVQsVUFBVSxNQUFlLEVBQUUsSUFBWSxFQUFFLFFBQWtCLEVBQUUsSUFBUyxFQUFFLGNBQStCO1lBQ25HLElBQUcsUUFBUSxJQUFJLFNBQVMsRUFBQztnQkFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2FBQzdEO1lBQ0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekMsRUFBRSxHQUFHLHFDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRS9ELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTthQUMxRTtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU5QixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHVDQUFZLEdBQVosVUFBYSxNQUF5QjtZQUF0QyxpQkFZQztZQVhHLElBQUcsTUFBTSxJQUFJLFNBQVMsRUFBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVLEVBQUUsR0FBRztnQkFDbEMsSUFBRyxVQUFVLEtBQUssTUFBTSxFQUFDO29CQUNyQixJQUFJLEtBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ1gsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDN0I7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTywwQ0FBZSxHQUF2QixVQUF3QixNQUFlLEVBQUUsSUFBcUI7WUFDMUQsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMxQjtRQUNMLENBQUM7UUFFTywrQ0FBb0IsR0FBNUIsVUFBNkIsTUFBZTtZQUN4QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbEM7UUFDTCxDQUFDO1FBRUQsNENBQWlCLEdBQWpCO1FBRUEsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQS9FRCxDQUF3Qyx1QkFBVSxHQStFakQ7SUFFTyw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSAnLi93aWRnZXRCYXNlJztcclxuaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gJy4vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZSc7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZXZlbnRzJztcclxuaW1wb3J0IHsgRXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzIH0gZnJvbSAnLi9ldmVudFdpZGdldEFjdGl2YXRlZEFyZ3MnO1xyXG5pbXBvcnQgeyBJTGF5b3V0UGFuZSB9IGZyb20gJy4uL3NwbGl0dGVyV2lkZ2V0L2ludGVyZmFjZXMvbGF5b3V0UGFuZUludGVyZmFjZSc7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSAnLi92aWV3VHlwZVByb3ZpZGVyJztcclxuaW1wb3J0IHsgVW5pcXVlSWRHZW5lcmF0b3IgfSBmcm9tICcuL3VuaXF1ZUlkR2VuZXJhdG9yJztcclxuaW1wb3J0IHsgSVZpZXcgfSBmcm9tICcuL2ludGVyZmFjZXMvdmlld0ludGVyZmFjZSc7XHJcbmltcG9ydCB7IFBhbmVQcm9wZXJ0aWVzIH0gZnJvbSAnLi9wYW5lUHJvcGVydGllcyc7XHJcblxyXG5jbGFzcyBFdmVudFdpZGdldEFjdGl2YXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzPnsgfTtcclxuXHJcbmFic3RyYWN0IGNsYXNzIExheW91dFdpZGdldEJhc2UgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSUxheW91dFdpZGdldHtcclxuICAgIFxyXG4gICAgZXZlbnRXaWRnZXRBY3RpdmF0ZWQgPSBuZXcgRXZlbnRXaWRnZXRBY3RpdmF0ZWQoKTtcclxuXHJcbiAgICBsYXlvdXRQYW5lcyE6IElMYXlvdXRQYW5lW107XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHByb3BlcnR5L2tleSBpcyBkZWZpbmVkIGluIHRoZSBvYmplY3RcclxuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0UGFuZXMuaGFzT3duUHJvcGVydHkoa2V5KSkgeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHdpZGdldCB0byB0aGUgd2lkZ2V0cyBsaXN0IG9mIHRoaXMgbGF5b3V0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEBwYXJhbSB7e319IFtkYXRhXVxyXG4gICAgICogQHBhcmFtIHtQYW5lUHJvcGVydGllc30gW3BhbmVQcm9wZXJ0aWVzXVxyXG4gICAgICogQG1lbWJlcm9mIExheW91dFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgbmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUsIGRhdGE/OiB7fSwgcGFuZVByb3BlcnRpZXM/OiBQYW5lUHJvcGVydGllcykge1xyXG4gICAgICAgIGlmKHZpZXdUeXBlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ2aWV3VHlwZSBmb3IgYWRkV2lkZ2V0KC4uLikgbm90IGRlZmluZWQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWQgPSBuYW1lICsgXCJfXCIrIHZpZXdUeXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWQgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyhpZCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl93aWRnZXRzLmdldChpZCkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJhZGRXaWRnZXQgJXMgPT4gaWQgKCVzKSBtdXN0IGJlIHVuaXF1ZVwiLCBuYW1lLCB2aWV3VHlwZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5zZXQoaWQsIHdpZGdldCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0VG9WaWV3KHdpZGdldCx0aGlzLnZpZXcpO1xyXG5cclxuICAgIH0gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgd2lkZ2V0IGZyb20gdGhlIHdpZGdldHMgbGlzdCBvZiB0aGlzIGxheW91dCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhJV2lkZ2V0fHVuZGVmaW5lZCl9IHdpZGdldFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBMYXlvdXRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXR8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZih3aWRnZXQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldFRlbXAsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXRUZW1wID09PSB3aWRnZXQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlV2lkZ2V0RnJvbVZpZXcod2lkZ2V0KTsgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZGdldHMuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBhZGRXaWRnZXRUb1ZpZXcod2lkZ2V0OiBJV2lkZ2V0LCB2aWV3OiBJVmlld3x1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICB2aWV3LmFkZFdpZGdldCh3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVdpZGdldEZyb21WaWV3KHdpZGdldDogSVdpZGdldCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3LnJlbW92ZVdpZGdldCh3aWRnZXQpOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlY2FsY3VsYXRlTGF5b3V0KCl7XHJcbiAgICBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtMYXlvdXRXaWRnZXRCYXNlfTsiXX0=
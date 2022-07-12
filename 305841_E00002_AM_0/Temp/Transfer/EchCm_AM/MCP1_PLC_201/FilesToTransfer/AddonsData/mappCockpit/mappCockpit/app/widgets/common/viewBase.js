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
define(["require", "exports", "./widgetBase"], function (require, exports, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The class is the base for views representing a container for a composition of other wigets
     *
     * @export
     * @abstract
     * @class ViewBase
     * @extends {WidgetBase}
     * @implements {IView}
     */
    var ViewBase = /** @class */ (function (_super) {
        __extends(ViewBase, _super);
        function ViewBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._childWidgets = [];
            return _this;
        }
        /**
         * Adds respectively connects a widget to its view
         *
         * @param {IWidget} widget
         * @memberof ViewBase
         */
        ViewBase.prototype.addWidget = function (widget) {
            this._childWidgets.push(widget);
            widget.view = this;
        };
        /**
         * Removes respectively disconnects a widget from its view
         *
         * @param {IWidget} widget
         * @memberof ViewBase
         */
        ViewBase.prototype.removeWidget = function (widget) {
            var i = this._childWidgets.indexOf(widget);
            if (i >= 0) {
                this._childWidgets.splice(i, 1);
            }
        };
        Object.defineProperty(ViewBase.prototype, "states", {
            /**
             * Gets the views states
             *
             * @readonly
             * @type {Store}
             * @memberof ViewBase
             */
            get: function () {
                return this._states;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the widget for the given id if found, else undefined
         *
         * @param {string} id the widget id
         * @returns {*}
         * @memberof ViewBase
         */
        ViewBase.prototype.getWidgetById = function (id) {
            for (var key in this._childWidgets) {
                var widget = this._childWidgets[key];
                if (widget.component.id == id) {
                    return widget;
                }
            }
            return undefined;
        };
        return ViewBase;
    }(widgetBase_1.WidgetBase));
    exports.ViewBase = ViewBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3ZpZXdCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTs7Ozs7Ozs7T0FRRztJQUNIO1FBQXVDLDRCQUFVO1FBQWpEO1lBQUEscUVBdURDO1lBckRXLG1CQUFhLEdBQWtCLEVBQUUsQ0FBQzs7UUFxRDlDLENBQUM7UUFuREc7Ozs7O1dBS0c7UUFDSCw0QkFBUyxHQUFULFVBQVUsTUFBZTtZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwrQkFBWSxHQUFaLFVBQWEsTUFBZTtZQUN4QixJQUFJLENBQUMsR0FBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQVNELHNCQUFXLDRCQUFNO1lBUGpCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSSxnQ0FBYSxHQUFwQixVQUFxQixFQUFVO1lBQzNCLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsSUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUM7b0JBQ3pCLE9BQU8sTUFBTSxDQUFDO2lCQUNqQjthQUNKO1lBQ0QsT0FBTyxTQUFTLENBQUE7UUFDcEIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUFDLEFBdkRELENBQXVDLHVCQUFVLEdBdURoRDtJQXZEcUIsNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuL2ludGVyZmFjZXMvdmlld0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3N0b3JlXCI7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGlzIHRoZSBiYXNlIGZvciB2aWV3cyByZXByZXNlbnRpbmcgYSBjb250YWluZXIgZm9yIGEgY29tcG9zaXRpb24gb2Ygb3RoZXIgd2lnZXRzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBWaWV3QmFzZVxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lWaWV3fVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXdCYXNlIGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElWaWV3IHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY2hpbGRXaWRnZXRzOkFycmF5PElXaWRnZXQ+ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHJlc3BlY3RpdmVseSBjb25uZWN0cyBhIHdpZGdldCB0byBpdHMgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgVmlld0Jhc2VcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCkgeyAgICBcclxuICAgICAgICB0aGlzLl9jaGlsZFdpZGdldHMucHVzaCh3aWRnZXQpO1xyXG4gICAgICAgIHdpZGdldC52aWV3ID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgcmVzcGVjdGl2ZWx5IGRpc2Nvbm5lY3RzIGEgd2lkZ2V0IGZyb20gaXRzIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFZpZXdCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXQpIHsgICAgXHJcbiAgICAgICAgbGV0IGkgID0gdGhpcy5fY2hpbGRXaWRnZXRzLmluZGV4T2Yod2lkZ2V0KTtcclxuICAgICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkV2lkZ2V0cy5zcGxpY2UoaSwxKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmlld3Mgc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7U3RvcmV9XHJcbiAgICAgKiBAbWVtYmVyb2YgVmlld0Jhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzdGF0ZXMoKSA6IFN0b3JlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgd2lkZ2V0IGZvciB0aGUgZ2l2ZW4gaWQgaWYgZm91bmQsIGVsc2UgdW5kZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSB3aWRnZXQgaWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFZpZXdCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRXaWRnZXRCeUlkKGlkOiBzdHJpbmcpOiBJV2lkZ2V0fHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fY2hpbGRXaWRnZXRzKSB7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl9jaGlsZFdpZGdldHNba2V5XTtcclxuICAgICAgICAgICAgaWYod2lkZ2V0LmNvbXBvbmVudC5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2lkZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxufVxyXG4iXX0=
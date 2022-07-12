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
define(["require", "exports", "../common/widgetBase"], function (require, exports, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the StartPageWidget
     *
     * @class StartPageWidget
     * @extends {WidgetBase}
     */
    var StartPageWidget = /** @class */ (function (_super) {
        __extends(StartPageWidget, _super);
        function StartPageWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StartPageWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        /**
         * Loads the styles for the start page widget
         *
         * @memberof SplitterWidget
         */
        StartPageWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/startPageWidget/style/css/startPageStyle.css");
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof StartPageWidget
         */
        StartPageWidget.prototype.createLayout = function () {
            this.mainDiv.innerHTML += " <div id=\"parent_mCo_logo\">\n                                                        <img id=\"mCo_logo\"/>\n                                                    </div>";
        };
        /** resizes the startpage widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof StartPageWidget
         */
        StartPageWidget.prototype.resize = function (width, height) {
            this.mainDiv.style.width = width.toString() + "px";
            this.mainDiv.style.height = height.toString() + "px";
        };
        return StartPageWidget;
    }(widgetBase_1.WidgetBase));
    exports.StartPageWidget = StartPageWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnRQYWdlV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3N0YXJ0UGFnZVdpZGdldC9zdGFydFBhZ2VXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFBOEIsbUNBQVU7UUFBeEM7O1FBb0NBLENBQUM7UUFsQ0csNkNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0NBQVUsR0FBVjtZQUNJLGlCQUFNLFFBQVEsWUFBQyxzREFBc0QsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsc0NBQVksR0FBWjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFHLDJLQUUwQixDQUFDO1FBQ3hELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILGdDQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBYztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztRQUN6RCxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBcENELENBQThCLHVCQUFVLEdBb0N2QztJQUVRLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJU3RhcnRQYWdlV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zdGFydFBhZ2VXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBTdGFydFBhZ2VXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFN0YXJ0UGFnZVdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFN0YXJ0UGFnZVdpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU3RhcnRQYWdlV2lkZ2V0IHtcclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgc3RhcnQgcGFnZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9zdGFydFBhZ2VXaWRnZXQvc3R5bGUvY3NzL3N0YXJ0UGFnZVN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RhcnRQYWdlV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLm1haW5EaXYuaW5uZXJIVE1MKz0gYCA8ZGl2IGlkPVwicGFyZW50X21Db19sb2dvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBpZD1cIm1Db19sb2dvXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgc3RhcnRwYWdlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFN0YXJ0UGFnZVdpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS53aWR0aCA9IHdpZHRoLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLmhlaWdodCA9IGhlaWdodC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBTdGFydFBhZ2VXaWRnZXQgfTsiXX0=
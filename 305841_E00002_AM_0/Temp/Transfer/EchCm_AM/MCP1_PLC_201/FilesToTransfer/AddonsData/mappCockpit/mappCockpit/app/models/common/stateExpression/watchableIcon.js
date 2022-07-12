define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WatchableIcon = /** @class */ (function () {
        function WatchableIcon(imageName, tooltip) {
            this.imageName = imageName;
            this.tooltip = tooltip;
        }
        /**
         * Define unkown watchable icon object
         *
         * @static
         * @returns {WatchableIcon}
         * @memberof WatchableIcon
         */
        WatchableIcon.getUnkownWatchableIcon = function () {
            return new WatchableIcon(this._unkownIcon, this._unkownTooltip);
        };
        // holds unkown state image name
        WatchableIcon._unkownIcon = "unkown";
        // holds unkown state tooltip
        WatchableIcon._unkownTooltip = "Unkown state";
        return WatchableIcon;
    }());
    exports.WatchableIcon = WatchableIcon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zdGF0ZUV4cHJlc3Npb24vd2F0Y2hhYmxlSWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQVlJLHVCQUFZLFNBQWlCLEVBQUUsT0FBZTtZQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksb0NBQXNCLEdBQTdCO1lBQ0ksT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBbkJELGdDQUFnQztRQUNoQix5QkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2Qyw2QkFBNkI7UUFDYiw0QkFBYyxHQUFHLGNBQWMsQ0FBQztRQWlCcEQsb0JBQUM7S0FBQSxBQTNCRCxJQTJCQztJQUVPLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgV2F0Y2hhYmxlSWNvbntcclxuICAgIFxyXG4gICAgLy8gaG9sZHMgaW1hZ2UgbmFtZSB1c2VkIGZvciB0aGUgd2F0Y2hhYmxlIHN0YXRlIGljb25cclxuICAgIHB1YmxpYyBpbWFnZU5hbWU6IHN0cmluZztcclxuICAgIC8vIGhvbGRzIHRvb2x0aXAgdXNlZCBmb3IgdGhlIHdhdGNoYWJsZSBzdGF0ZSBpY29uXHJcbiAgICBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xyXG5cclxuICAgIC8vIGhvbGRzIHVua293biBzdGF0ZSBpbWFnZSBuYW1lXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgX3Vua293bkljb24gPSBcInVua293blwiO1xyXG4gICAgLy8gaG9sZHMgdW5rb3duIHN0YXRlIHRvb2x0aXBcclxuICAgIHN0YXRpYyByZWFkb25seSBfdW5rb3duVG9vbHRpcCA9IFwiVW5rb3duIHN0YXRlXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW1hZ2VOYW1lOiBzdHJpbmcsIHRvb2x0aXA6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lID0gaW1hZ2VOYW1lO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcCA9IHRvb2x0aXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgdW5rb3duIHdhdGNoYWJsZSBpY29uIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtXYXRjaGFibGVJY29ufVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZUljb25cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFVua293bldhdGNoYWJsZUljb24oKTogV2F0Y2hhYmxlSWNvbiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBXYXRjaGFibGVJY29uKHRoaXMuX3Vua293bkljb24sIHRoaXMuX3Vua293blRvb2x0aXApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1dhdGNoYWJsZUljb259OyJdfQ==
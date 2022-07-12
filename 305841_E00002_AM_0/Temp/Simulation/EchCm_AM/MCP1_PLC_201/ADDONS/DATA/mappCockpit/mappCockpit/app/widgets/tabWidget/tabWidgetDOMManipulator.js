define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetDOMManipulator = /** @class */ (function () {
        function TabWidgetDOMManipulator() {
        }
        /**
         * Removes all tags where the passed classname is set
         *
         * @static
         * @param {string} className
         * @memberof TabWidgetDOMManipulator
         */
        TabWidgetDOMManipulator.removeHTMLTagByClass = function (className) {
            $("." + className).remove();
        };
        /**
         * Append the passed html tag on the passed id
         *
         * @static
         * @param {string} id
         * @param {string} htmlTag
         * @memberof TabWidgetDOMManipulator
         */
        TabWidgetDOMManipulator.appendHTMLTagAtID = function (id, htmlTag) {
            $("#" + id).append(htmlTag);
        };
        /**
         * Add css class in the element of the passed id
         *
         * @static
         * @param {string} id
         * @param {string} className
         * @memberof TabWidgetDOMManipulator
         */
        TabWidgetDOMManipulator.addClassAtID = function (id, className) {
            $("#" + id).addClass(className);
        };
        /**
        * Remove css class in the element of the passed id
        *
        * @static
        * @param {string} id
        * @param {string} className
        * @memberof TabWidgetDOMManipulator
        */
        TabWidgetDOMManipulator.removeClassAtID = function (id, className) {
            $("#" + id).removeClass(className);
        };
        return TabWidgetDOMManipulator;
    }());
    exports.TabWidgetDOMManipulator = TabWidgetDOMManipulator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RE9NTWFuaXB1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdGFiV2lkZ2V0L3RhYldpZGdldERPTU1hbmlwdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBRUk7UUFBdUIsQ0FBQztRQUV4Qjs7Ozs7O1dBTUc7UUFDVyw0Q0FBb0IsR0FBbEMsVUFBbUMsU0FBaUI7WUFDaEQsQ0FBQyxDQUFDLEdBQUcsR0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNXLHlDQUFpQixHQUEvQixVQUFnQyxFQUFVLEVBQUUsT0FBZTtZQUN2RCxDQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNXLG9DQUFZLEdBQTFCLFVBQTJCLEVBQVUsRUFBRSxTQUFpQjtZQUNwRCxDQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUE7Ozs7Ozs7VUFPRTtRQUNhLHVDQUFlLEdBQTdCLFVBQThCLEVBQVUsRUFBRSxTQUFpQjtZQUN6RCxDQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQ0wsOEJBQUM7SUFBRCxDQUFDLEFBbERELElBa0RDO0lBbERZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUYWJXaWRnZXRET01NYW5pcHVsYXRvciB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgdGFncyB3aGVyZSB0aGUgcGFzc2VkIGNsYXNzbmFtZSBpcyBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RE9NTWFuaXB1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVIVE1MVGFnQnlDbGFzcyhjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgICQoXCIuXCIrY2xhc3NOYW1lKS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGVuZCB0aGUgcGFzc2VkIGh0bWwgdGFnIG9uIHRoZSBwYXNzZWQgaWQgXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFRhZ1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldERPTU1hbmlwdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXBwZW5kSFRNTFRhZ0F0SUQoaWQ6IHN0cmluZywgaHRtbFRhZzogc3RyaW5nKSB7XHJcbiAgICAgICAgJChcIiNcIitpZCkuYXBwZW5kKGh0bWxUYWcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGNzcyBjbGFzcyBpbiB0aGUgZWxlbWVudCBvZiB0aGUgcGFzc2VkIGlkIFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldERPTU1hbmlwdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkQ2xhc3NBdElEKGlkOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJChcIiNcIitpZCkuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgY3NzIGNsYXNzIGluIHRoZSBlbGVtZW50IG9mIHRoZSBwYXNzZWQgaWQgXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RE9NTWFuaXB1bGF0b3JcclxuICAgICAqL1xyXG4gICAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUNsYXNzQXRJRChpZDogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgICQoXCIjXCIraWQpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbn0iXX0=
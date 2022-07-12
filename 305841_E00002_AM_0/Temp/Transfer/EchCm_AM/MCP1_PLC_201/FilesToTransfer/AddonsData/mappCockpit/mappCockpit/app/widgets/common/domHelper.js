define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * provides some utility methods for dom and element features
     *
     * @class DomHelper
     */
    var DomHelper = /** @class */ (function () {
        function DomHelper() {
        }
        /**
         * the method checks if an element is within the visible viewport.
         *
         * @static
         * @param {*} element
         * @returns
         * @memberof DomHelper
         */
        DomHelper.isElementInViewport = function (element) {
            var rect = element.getBoundingClientRect();
            //TODO: optimize detection of currently visible elements. To compare if an element is visible, the relative location and div z-order has
            // to be considered!
            return (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */);
        };
        /**
         * Adds the disabled classes(e.g. mCoDisabled) to the element(or removes them)
         *
         * @static
         * @param {*} element
         * @param {*} disable
         * @returns
         * @memberof DomHelper
         */
        DomHelper.disableElement = function (element, disable) {
            if (!element) {
                console.error("element not defined for disableElement");
                return;
            }
            if (!element.classList) {
                return;
            }
            // this tag defines the classname which will be added if an element should be shown disabled
            // this tag also will be used in the ranorex test environment
            var disabledClassName = "mCoDisabled";
            if (disable == true) {
                element.classList.add(disabledClassName);
            }
            else {
                element.classList.remove(disabledClassName);
            }
        };
        return DomHelper;
    }());
    exports.DomHelper = DomHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9kb21IZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7Ozs7T0FJRztJQUNIO1FBQUE7UUFvREEsQ0FBQztRQWxERzs7Ozs7OztXQU9HO1FBQ0ksNkJBQW1CLEdBQTFCLFVBQTRCLE9BQU87WUFFL0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFFM0Msd0lBQXdJO1lBQ3hJLG9CQUFvQjtZQUNwQixPQUFPLENBQ0gsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNiLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLDBCQUEwQjtnQkFDMUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyx5QkFBeUIsQ0FDdEcsQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNXLHdCQUFjLEdBQTVCLFVBQTZCLE9BQU8sRUFBRSxPQUFPO1lBQ3pDLElBQUcsQ0FBQyxPQUFPLEVBQUM7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO2dCQUN2RCxPQUFPO2FBQ1Y7WUFDRCxJQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQztnQkFDbEIsT0FBTzthQUNWO1lBQ0QsNEZBQTRGO1lBQzVGLDZEQUE2RDtZQUM3RCxJQUFJLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztZQUV0QyxJQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUM7Z0JBQ2YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUM1QztpQkFDRztnQkFDQSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQy9DO1FBQ0wsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQXBERCxJQW9EQztJQUVPLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIHByb3ZpZGVzIHNvbWUgdXRpbGl0eSBtZXRob2RzIGZvciBkb20gYW5kIGVsZW1lbnQgZmVhdHVyZXNcclxuICpcclxuICogQGNsYXNzIERvbUhlbHBlclxyXG4gKi9cclxuY2xhc3MgRG9tSGVscGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIG1ldGhvZCBjaGVja3MgaWYgYW4gZWxlbWVudCBpcyB3aXRoaW4gdGhlIHZpc2libGUgdmlld3BvcnQuIFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBEb21IZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzRWxlbWVudEluVmlld3BvcnQgKGVsZW1lbnQpIHtcclxuICAgXHJcbiAgICAgICAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgXHJcbiAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBkZXRlY3Rpb24gb2YgY3VycmVudGx5IHZpc2libGUgZWxlbWVudHMuIFRvIGNvbXBhcmUgaWYgYW4gZWxlbWVudCBpcyB2aXNpYmxlLCB0aGUgcmVsYXRpdmUgbG9jYXRpb24gYW5kIGRpdiB6LW9yZGVyIGhhc1xyXG4gICAgICAgIC8vIHRvIGJlIGNvbnNpZGVyZWQhXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgcmVjdC50b3AgPj0gMCAmJlxyXG4gICAgICAgICAgICByZWN0LmxlZnQgPj0gMCAmJlxyXG4gICAgICAgICAgICByZWN0LmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICYmIC8qb3IgJCh3aW5kb3cpLmhlaWdodCgpICovXHJcbiAgICAgICAgICAgIHJlY3QucmlnaHQgPD0gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgLypvciAkKHdpbmRvdykud2lkdGgoKSAqL1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBkaXNhYmxlZCBjbGFzc2VzKGUuZy4gbUNvRGlzYWJsZWQpIHRvIHRoZSBlbGVtZW50KG9yIHJlbW92ZXMgdGhlbSlcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7Kn0gZGlzYWJsZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBEb21IZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkaXNhYmxlRWxlbWVudChlbGVtZW50LCBkaXNhYmxlKXtcclxuICAgICAgICBpZighZWxlbWVudCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlbGVtZW50IG5vdCBkZWZpbmVkIGZvciBkaXNhYmxlRWxlbWVudFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcyB0YWcgZGVmaW5lcyB0aGUgY2xhc3NuYW1lIHdoaWNoIHdpbGwgYmUgYWRkZWQgaWYgYW4gZWxlbWVudCBzaG91bGQgYmUgc2hvd24gZGlzYWJsZWRcclxuICAgICAgICAvLyB0aGlzIHRhZyBhbHNvIHdpbGwgYmUgdXNlZCBpbiB0aGUgcmFub3JleCB0ZXN0IGVudmlyb25tZW50XHJcbiAgICAgICAgbGV0IGRpc2FibGVkQ2xhc3NOYW1lID0gXCJtQ29EaXNhYmxlZFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGRpc2FibGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChkaXNhYmxlZENsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShkaXNhYmxlZENsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0RvbUhlbHBlcn0iXX0=
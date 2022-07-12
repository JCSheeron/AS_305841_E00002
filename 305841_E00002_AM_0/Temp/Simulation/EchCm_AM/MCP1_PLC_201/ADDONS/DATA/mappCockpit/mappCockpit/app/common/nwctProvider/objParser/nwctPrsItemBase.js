define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This is the base for all obj parser parts
     *
     * @export
     * @abstract
     * @class NwctPrsItemBase
     * @implements {INwctPrsItem}
     */
    var NwctPrsItemBase = /** @class */ (function () {
        /**
         *Creates an instance of NwctPrsItemBase.
         * @param {*} input
         * @param {Array<string>} [location]
         * @memberof NwctPrsItemBase
         */
        function NwctPrsItemBase(input, location) {
            // retrieve property if location is provided
            if (location !== undefined && location.length >= 1) {
                this._input = this.getUntypedPropertyByName(input, location);
            }
            else { // input is at the right position already
                this._input = input;
            }
        }
        /**
         * retrives an untyped property via the name
         *
         * @protected
         * @param {*} input
         * @param {Array<string>} locationOfPropertyInInput
         * @returns {*}
         * @memberof NwctPrsItemBase
         */
        NwctPrsItemBase.prototype.getUntypedPropertyByName = function (input, locationOfPropertyInInput) {
            var property = input;
            // resolve the protperty that might be a inside of a property, e.g. ["acoposData", "payload", "ctn"] -> "acoposData.payload.ctn"
            locationOfPropertyInInput.forEach(function (nameOfProperty) {
                property !== undefined ? property = property[nameOfProperty] : property = undefined;
            });
            return property;
        };
        return NwctPrsItemBase;
    }());
    exports.NwctPrsItemBase = NwctPrsItemBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByc0l0ZW1CYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbndjdFByb3ZpZGVyL29ialBhcnNlci9ud2N0UHJzSXRlbUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7Ozs7Ozs7T0FPRztJQUNIO1FBSUk7Ozs7O1dBS0c7UUFDSCx5QkFBbUIsS0FBVyxFQUFFLFFBQXlCO1lBQ3JELDRDQUE0QztZQUM1QyxJQUFHLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7Z0JBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNoRTtpQkFDRyxFQUFFLHlDQUF5QztnQkFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdkI7UUFDTCxDQUFDO1FBY0Q7Ozs7Ozs7O1dBUUc7UUFDTyxrREFBd0IsR0FBbEMsVUFBbUMsS0FBVSxFQUFFLHlCQUF5QztZQUVwRixJQUFJLFFBQVEsR0FBUyxLQUFLLENBQUM7WUFFM0IsZ0lBQWdJO1lBQ2hJLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxVQUFBLGNBQWM7Z0JBQzVDLFFBQVEsS0FBSyxTQUFTLENBQUEsQ0FBQyxDQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFDeEYsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBZUwsc0JBQUM7SUFBRCxDQUFDLEFBbEVELElBa0VDO0lBbEVxQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElOd2N0UHJzSXRlbSB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdFByc0l0ZW1JbnRlcmZhY2VcIjtcclxuXHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYmFzZSBmb3IgYWxsIG9iaiBwYXJzZXIgcGFydHNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIE53Y3RQcnNJdGVtQmFzZVxyXG4gKiBAaW1wbGVtZW50cyB7SU53Y3RQcnNJdGVtfVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE53Y3RQcnNJdGVtQmFzZSBpbXBsZW1lbnRzIElOd2N0UHJzSXRlbXtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbnB1dDogYW55OyAvLyB0aGlzIGlzIHRoZSBpbnB1dCBkZXNjcmliaW5nIHRoZSByZWxldmFudCBwYXJ0IChkZXBlbmRpbmcgb24gdGhlIGNsYXNzIGltcGxlbWVudGF0aW9uKSBhcyBpdCBpcyBjb21taW5nIGZyb20gdGhlIGthaXRhaSBwYXJzZXJcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOd2N0UHJzSXRlbUJhc2UuXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IFtsb2NhdGlvbl1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzSXRlbUJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGlucHV0IDogYW55LCBsb2NhdGlvbj8gOiBBcnJheTxzdHJpbmc+KXsgICAgICAgXHJcbiAgICAgICAgLy8gcmV0cmlldmUgcHJvcGVydHkgaWYgbG9jYXRpb24gaXMgcHJvdmlkZWRcclxuICAgICAgICBpZihsb2NhdGlvbiAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLmxlbmd0aCA+PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5faW5wdXQgPSB0aGlzLmdldFVudHlwZWRQcm9wZXJ0eUJ5TmFtZShpbnB1dCwgbG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAvLyBpbnB1dCBpcyBhdCB0aGUgcmlnaHQgcG9zaXRpb24gYWxyZWFkeVxyXG4gICAgICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIHRydWUgaWYgYWxsIGNvbnRhaW5lZCBpbmZvcm1hdGlvbiBpcyB2YWxpZFxyXG4gICAgICogXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByc0l0ZW1CYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgdmFsaWQoKSA6IGJvb2xlYW47XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpdmVzIGFuIHVudHlwZWQgcHJvcGVydHkgdmlhIHRoZSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsqfSBpbnB1dFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBsb2NhdGlvbk9mUHJvcGVydHlJbklucHV0XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzSXRlbUJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFVudHlwZWRQcm9wZXJ0eUJ5TmFtZShpbnB1dDogYW55LCBsb2NhdGlvbk9mUHJvcGVydHlJbklucHV0IDogQXJyYXk8c3RyaW5nPik6YW55e1xyXG5cclxuICAgICAgICBsZXQgcHJvcGVydHkgOiBhbnkgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgLy8gcmVzb2x2ZSB0aGUgcHJvdHBlcnR5IHRoYXQgbWlnaHQgYmUgYSBpbnNpZGUgb2YgYSBwcm9wZXJ0eSwgZS5nLiBbXCJhY29wb3NEYXRhXCIsIFwicGF5bG9hZFwiLCBcImN0blwiXSAtPiBcImFjb3Bvc0RhdGEucGF5bG9hZC5jdG5cIlxyXG4gICAgICAgIGxvY2F0aW9uT2ZQcm9wZXJ0eUluSW5wdXQuZm9yRWFjaChuYW1lT2ZQcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgICAgIHByb3BlcnR5ICE9PSB1bmRlZmluZWQ/ICBwcm9wZXJ0eSA9IHByb3BlcnR5W25hbWVPZlByb3BlcnR5XSA6IHByb3BlcnR5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBwcm9wZXJ0eTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG59Il19
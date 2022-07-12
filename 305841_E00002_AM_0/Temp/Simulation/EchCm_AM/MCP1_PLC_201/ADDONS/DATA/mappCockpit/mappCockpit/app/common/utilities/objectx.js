define(["require", "exports", "./objectCompare"], function (require, exports, objectCompare_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectX = /** @class */ (function () {
        function ObjectX() {
        }
        ObjectX.copy = function (targetObject, sourceObject) {
            // shallow copy the source properties to the target instance
            return Object.assign(targetObject, sourceObject);
        };
        ObjectX.clone = function (typeConstructor, sourceObject) {
            var newInstance;
            // copy the source objects properties to the new instance
            try {
                newInstance = ObjectX.deepCopy(sourceObject, typeConstructor);
            }
            catch (error) {
                console.error(error);
            }
            return newInstance;
        };
        /**
         * create a deep copy of the source object
         *
         * @static
         * @memberof ObjectX
         */
        ObjectX.deepCopy = function (sourceObject, ctor) {
            if (ctor === void 0) { ctor = null; }
            // we return the source object as default when it is a primitive value.
            var copiedObject = sourceObject;
            if (sourceObject !== null) {
                // copy based on type
                if (sourceObject instanceof Array) {
                    // copy array
                    copiedObject = ObjectX.deepCopyArray(sourceObject);
                }
                else if (typeof sourceObject === 'object' && sourceObject !== {}) {
                    // copy object
                    var targetObject = ctor ? new ctor() : {};
                    copiedObject = objectCompare_1.ObjectCompare.deepCopy(targetObject, sourceObject);
                }
            }
            return copiedObject;
        };
        /**
         * create a deep copy of an array
         *
         * @static
         * @param {any[]} sourceArray
         * @returns {any[]}
         * @memberof ObjectX
         */
        ObjectX.deepCopyArray = function (sourceArray) {
            // create a new arrray 
            var copiedArray = [];
            // copy array items
            sourceArray.forEach(function (arrayItem) { copiedArray.push(arrayItem); });
            // copy array item values
            var copy = copiedArray.map(function (arrayItem) { return ObjectX.deepCopy(arrayItem); });
            return copy;
        };
        /**
         * compares two objects on content equality
         *
         * @static
         * @param {*} sourceObject
         * @param {*} targetObject
         * @returns {boolean}
         * @memberof ObjectX
         */
        ObjectX.deepEquals = function (sourceObject, targetObject) {
            return objectCompare_1.ObjectCompare.isEqual(targetObject, sourceObject);
        };
        return ObjectX;
    }());
    exports.ObjectX = ObjectX;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0eC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3V0aWxpdGllcy9vYmplY3R4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7UUF5RkEsQ0FBQztRQXZGVSxZQUFJLEdBQVgsVUFBWSxZQUFpQixFQUFFLFlBQWlCO1lBQzVDLDREQUE0RDtZQUM1RCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFHTSxhQUFLLEdBQVosVUFBbUIsZUFBb0IsRUFBRSxZQUFnQjtZQUVyRCxJQUFJLFdBQVcsQ0FBRTtZQUNqQix5REFBeUQ7WUFDekQsSUFBSTtnQkFDQSxXQUFXLEdBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUMsZUFBZSxDQUFTLENBQUE7YUFDdEU7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUdIOzs7OztXQUtHO1FBQ0ksZ0JBQVEsR0FBZixVQUFtQixZQUFpQixFQUFDLElBQWU7WUFBZixxQkFBQSxFQUFBLFdBQWU7WUFFbEQsdUVBQXVFO1lBQ3ZFLElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQztZQUVoQyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7Z0JBRXpCLHFCQUFxQjtnQkFDckIsSUFBSSxZQUFZLFlBQVksS0FBSyxFQUFFO29CQUVqQyxhQUFhO29CQUNiLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQXFCLENBQUMsQ0FBQztpQkFFN0Q7cUJBQU0sSUFBSSxPQUFPLFlBQVksS0FBSyxRQUFRLElBQUksWUFBWSxLQUFLLEVBQUUsRUFBRTtvQkFFbEUsY0FBYztvQkFDZCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDMUMsWUFBWSxHQUFHLDZCQUFhLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFFbkU7YUFDRjtZQUVELE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ1kscUJBQWEsR0FBNUIsVUFBNkIsV0FBa0I7WUFFN0MsdUJBQXVCO1lBQ3ZCLElBQUksV0FBVyxHQUFHLEVBQVcsQ0FBQztZQUU5QixtQkFBbUI7WUFDbkIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVMsSUFBTyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckUseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFjLElBQUssT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFNLFNBQVMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFRLENBQUM7WUFFeEYsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxrQkFBVSxHQUFqQixVQUFrQixZQUFpQixFQUFDLFlBQWdCO1lBRWxELE9BQU8sNkJBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFSCxjQUFDO0lBQUQsQ0FBQyxBQXpGRCxJQXlGQztJQXpGWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9iamVjdENvbXBhcmUgfSBmcm9tIFwiLi9vYmplY3RDb21wYXJlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0WHtcclxuXHJcbiAgICBzdGF0aWMgY29weSh0YXJnZXRPYmplY3Q6IGFueSwgc291cmNlT2JqZWN0OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIC8vIHNoYWxsb3cgY29weSB0aGUgc291cmNlIHByb3BlcnRpZXMgdG8gdGhlIHRhcmdldCBpbnN0YW5jZVxyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRhcmdldE9iamVjdCxzb3VyY2VPYmplY3QpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgY2xvbmU8VFlQRT4odHlwZUNvbnN0cnVjdG9yOiBhbnksIHNvdXJjZU9iamVjdDphbnkpOiBUWVBFIHtcclxuXHJcbiAgICAgICAgbGV0IG5ld0luc3RhbmNlIDtcclxuICAgICAgICAvLyBjb3B5IHRoZSBzb3VyY2Ugb2JqZWN0cyBwcm9wZXJ0aWVzIHRvIHRoZSBuZXcgaW5zdGFuY2VcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXdJbnN0YW5jZT0gT2JqZWN0WC5kZWVwQ29weShzb3VyY2VPYmplY3QsdHlwZUNvbnN0cnVjdG9yKSBhcyBUWVBFXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3SW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgYSBkZWVwIGNvcHkgb2YgdGhlIHNvdXJjZSBvYmplY3RcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0WFxyXG4gICAqL1xyXG4gIHN0YXRpYyBkZWVwQ29weTxUPihzb3VyY2VPYmplY3Q6IGFueSxjdG9yOmFueSA9IG51bGwpIDogVCB7XHJcbiAgICBcclxuICAgIC8vIHdlIHJldHVybiB0aGUgc291cmNlIG9iamVjdCBhcyBkZWZhdWx0IHdoZW4gaXQgaXMgYSBwcmltaXRpdmUgdmFsdWUuXHJcbiAgICBsZXQgY29waWVkT2JqZWN0ID0gc291cmNlT2JqZWN0O1xyXG5cclxuICAgIGlmIChzb3VyY2VPYmplY3QgIT09IG51bGwpIHtcclxuXHJcbiAgICAgIC8vIGNvcHkgYmFzZWQgb24gdHlwZVxyXG4gICAgICBpZiAoc291cmNlT2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjb3B5IGFycmF5XHJcbiAgICAgICAgY29waWVkT2JqZWN0ID0gT2JqZWN0WC5kZWVwQ29weUFycmF5KHNvdXJjZU9iamVjdCBhcyBhbnlbXSk7XHJcbiAgICAgIFxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2VPYmplY3QgPT09ICdvYmplY3QnICYmIHNvdXJjZU9iamVjdCAhPT0ge30pIHtcclxuXHJcbiAgICAgICAgLy8gY29weSBvYmplY3RcclxuICAgICAgICBsZXQgdGFyZ2V0T2JqZWN0ID0gY3RvciA/IG5ldyBjdG9yKCkgOiB7fTtcclxuICAgICAgICBjb3BpZWRPYmplY3QgPSBPYmplY3RDb21wYXJlLmRlZXBDb3B5KHRhcmdldE9iamVjdCwgc291cmNlT2JqZWN0KTtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29waWVkT2JqZWN0O1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBjcmVhdGUgYSBkZWVwIGNvcHkgb2YgYW4gYXJyYXlcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0ge2FueVtdfSBzb3VyY2VBcnJheVxyXG4gICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0WFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGRlZXBDb3B5QXJyYXkoc291cmNlQXJyYXk6IGFueVtdKTogYW55W10ge1xyXG4gICAgXHJcbiAgICAvLyBjcmVhdGUgYSBuZXcgYXJycmF5IFxyXG4gICAgbGV0IGNvcGllZEFycmF5ID0gW10gYXMgYW55W107XHJcblxyXG4gICAgLy8gY29weSBhcnJheSBpdGVtc1xyXG4gICAgc291cmNlQXJyYXkuZm9yRWFjaCgoYXJyYXlJdGVtKSA9PiB7IGNvcGllZEFycmF5LnB1c2goYXJyYXlJdGVtKTsgfSk7XHJcblxyXG4gICAgLy8gY29weSBhcnJheSBpdGVtIHZhbHVlc1xyXG4gICAgbGV0IGNvcHkgPSBjb3BpZWRBcnJheS5tYXAoKGFycmF5SXRlbTogYW55KSA9PiBPYmplY3RYLmRlZXBDb3B5PGFueT4oYXJyYXlJdGVtKSkgYXMgYW55O1xyXG5cclxuICAgIHJldHVybiBjb3B5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29tcGFyZXMgdHdvIG9iamVjdHMgb24gY29udGVudCBlcXVhbGl0eVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0gc291cmNlT2JqZWN0XHJcbiAgICogQHBhcmFtIHsqfSB0YXJnZXRPYmplY3RcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0WFxyXG4gICAqL1xyXG4gIHN0YXRpYyBkZWVwRXF1YWxzKHNvdXJjZU9iamVjdDogYW55LHRhcmdldE9iamVjdDphbnkpOmJvb2xlYW57IFxyXG4gICAgXHJcbiAgICByZXR1cm4gT2JqZWN0Q29tcGFyZS5pc0VxdWFsKHRhcmdldE9iamVjdCwgc291cmNlT2JqZWN0KTtcclxuICB9XHJcblxyXG59Il19
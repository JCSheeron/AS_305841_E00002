define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectReflection = /** @class */ (function () {
        function ObjectReflection() {
        }
        /**
         * Returns a list all methods of a class as strings,
         * NOT including the constructor
         * NOT including inherited methods
         *
         * @static
         * @param {object} obj
         * @returns {string[]}
         * @memberof ObjectReflection
         */
        ObjectReflection.getMethodNames = function (obj) {
            var proto = Object.getPrototypeOf(obj);
            if (proto == null) {
                return [];
            }
            var names = Object.getOwnPropertyNames(proto);
            var filteredNames = names.filter(function (name) { return name !== "constructor"; });
            return filteredNames;
        };
        /**
         * returns the value of a getter property, given the name of the property
         *
         *
         * @static
         * @param {object} obj
         * @param {string} name
         * @returns {*}
         * @memberof ObjectReflection
         */
        ObjectReflection.callGetterByName = function (obj, name) {
            var proto = Object.getPrototypeOf(obj);
            var descriptor = Object.getOwnPropertyDescriptor(proto, name);
            // check if getter exists
            if ((descriptor === null || descriptor === void 0 ? void 0 : descriptor.get) == undefined) {
                return undefined;
            }
            return descriptor.get.call(obj);
        };
        return ObjectReflection;
    }());
    exports.ObjectReflection = ObjectReflection;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0UmVmbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9vYmpQYXJzZXIvb2JqZWN0UmVmbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTtRQUFBO1FBbURBLENBQUM7UUFqREc7Ozs7Ozs7OztXQVNHO1FBQ1csK0JBQWMsR0FBNUIsVUFBNkIsR0FBVztZQUVwQyxJQUFNLEtBQUssR0FBbUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV6RCxJQUFHLEtBQUssSUFBSSxJQUFJLEVBQ2hCO2dCQUNJLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFFRCxJQUFNLEtBQUssR0FBYyxNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBRyxhQUFhLEVBQXBCLENBQW9CLENBQUMsQ0FBQztZQUVsRSxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1csaUNBQWdCLEdBQTlCLFVBQStCLEdBQVcsRUFBRSxJQUFhO1lBRXJELElBQU0sS0FBSyxHQUFhLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkQsSUFBTSxVQUFVLEdBQW9DLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFakcseUJBQXlCO1lBQ3pCLElBQUcsQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsR0FBRyxLQUFJLFNBQVMsRUFBQztnQkFDNUIsT0FBTyxTQUFTLENBQUM7YUFDcEI7WUFFRCxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFHTCx1QkFBQztJQUFELENBQUMsQUFuREQsSUFtREM7SUFuRFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RSZWZsZWN0aW9ue1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3QgYWxsIG1ldGhvZHMgb2YgYSBjbGFzcyBhcyBzdHJpbmdzLCBcclxuICAgICAqIE5PVCBpbmNsdWRpbmcgdGhlIGNvbnN0cnVjdG9yIFxyXG4gICAgICogTk9UIGluY2x1ZGluZyBpbmhlcml0ZWQgbWV0aG9kc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cclxuICAgICAqIEBtZW1iZXJvZiBPYmplY3RSZWZsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWV0aG9kTmFtZXMob2JqOiBvYmplY3QpIDogc3RyaW5nW117XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcHJvdG8gOiBPYmplY3QgfCBudWxsID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XHJcblxyXG4gICAgICAgIGlmKHByb3RvID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuYW1lcyA6IHN0cmluZ1tdID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkTmFtZXMgPSBuYW1lcy5maWx0ZXIoIG5hbWUgPT4gbmFtZSE9PVwiY29uc3RydWN0b3JcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkTmFtZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGdldHRlciBwcm9wZXJ0eSwgZ2l2ZW4gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XHJcbiAgICAgKiBcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgT2JqZWN0UmVmbGVjdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbGxHZXR0ZXJCeU5hbWUob2JqOiBvYmplY3QsIG5hbWUgOiBzdHJpbmcpIDogYW55e1xyXG5cclxuICAgICAgICBjb25zdCBwcm90byA6IE9iamVjdCAgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdG9yIDogUHJvcGVydHlEZXNjcmlwdG9yIHwgdW5kZWZpbmVkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgbmFtZSk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGdldHRlciBleGlzdHNcclxuICAgICAgICBpZihkZXNjcmlwdG9yPy5nZXQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3IuZ2V0LmNhbGwob2JqKTtcclxuICAgIH1cclxuXHJcblxyXG59ICAgIl19
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contains utility for object comparison.
     *
     * @class ObjectCompare
     */
    var ObjectCompare = /** @class */ (function () {
        function ObjectCompare() {
        }
        /**
         * TypeGuard for type Primitive which representates (number | string | boolean | null | undefined).
         * Matches on everything which is not Object or derived from Object.
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is Primitive}
         * @memberof ObjectCompare
         */
        ObjectCompare.isPrimitive = function (x) {
            return !(x instanceof Object);
        };
        /**
         * TypeGuard for type Date
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is Date}
         * @memberof ObjectCompare
         */
        ObjectCompare.isDate = function (x) {
            return (x instanceof Date);
        };
        /**
         * TypeGuard for type Array.
         * Matches on all Arrays regardless of types contained as Array<any>.
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is Array<any>}
         * @memberof ObjectCompare
         */
        ObjectCompare.isArray = function (x) {
            return Array.isArray(x);
        };
        /**
         * TypeGuard for type Object.
         * Also matches for all extensions of Object (every class).
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is Object}
         * @memberof ObjectCompare
         */
        ObjectCompare.isObject = function (x) {
            return (x instanceof Object);
        };
        /**
         * TypeGuard for type number
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is number}
         * @memberof ObjectCompare
         */
        ObjectCompare.isNumber = function (x) {
            return (typeof x === "number");
        };
        /**
         * Generic deep comparison.
         * Use to compare interface data.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are contained in the argument "actual".
         * argument "expected" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {*} actual
         * @param {*} expected
         * @returns {boolean}
         * @memberof ObjectCompare
         */
        ObjectCompare.isContained = function (actual, expected) {
            var result = ObjectCompare.contains(actual, expected);
            return result.success;
        };
        /**
         * Generic deep comparison.
         * Use to compare interface data.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are contained in the argument "actual".
         * argument "expected" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {*} actual
         * @param {*} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.contains = function (actual, expected) {
            var result = new ComparisonResult(false, "actual < " + actual + " > and expected < " + expected + " > are not the same type.");
            if (ObjectCompare.isPrimitive(actual) && ObjectCompare.isPrimitive(expected)) { //Primitive
                result = ObjectCompare.comparePrimitives(actual, expected);
            }
            else if (ObjectCompare.isDate(actual) && ObjectCompare.isDate(expected)) { //Date
                result = ObjectCompare.compareDate(actual, expected);
            }
            else if (ObjectCompare.isArray(actual) && ObjectCompare.isArray(expected)) { //Array
                result = ObjectCompare.containsArray(actual, expected);
            }
            else if (ObjectCompare.isObject(actual) && ObjectCompare.isObject(expected)) { // Object
                result = ObjectCompare.containsObject(actual, expected);
            }
            return result;
        };
        /**
         * Compares two primitives typesafe.
         *
         * @private
         * @static
         * @param {Primitive} actual
         * @param {Primitive} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.comparePrimitives = function (actual, expected) {
            var isEqual = false;
            if (ObjectCompare.isNumber(actual) && ObjectCompare.isNumber(expected)) { //check numbers seperatly to cover NaN values
                isEqual = ((actual === expected) || (Number.isNaN(actual) && Number.isNaN(expected)));
            }
            else { //other primitives, undefined and null
                isEqual = (actual === expected);
            }
            return new ComparisonResult(isEqual, "actual value <" + actual + "> does not match expected value <" + expected + ">");
        };
        /**
         * Compares two Dates based on timestamp.
         *
         * @private
         * @static
         * @param {Date} actual
         * @param {Date} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.compareDate = function (actual, expected) {
            //extract timestamps
            var actualTimeStamp = actual.getTime();
            var expectedTimeStamp = expected.getTime();
            return new ComparisonResult((actualTimeStamp === expectedTimeStamp), "actual timestamp <" + actualTimeStamp + "> does not match expected timestamp <" + expectedTimeStamp + ">");
        };
        /**
         * Generic deep comparison of Arrays.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are contained in the argument "actual".
         * argument "expected" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @private
         * @static
         * @param {Array<any>} actual
         * @param {Array<any>} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.containsArray = function (actual, expected) {
            var result = new ComparisonResult(true, "empty");
            //loop through all entries
            for (var i = 0; (i < expected.length) && result.success; i += 1) {
                result = ObjectCompare.contains(actual[i], expected[i]);
            }
            return result;
        };
        /**
         * Generic deep comparison of Objects.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are contained in the argument "actual".
         * argument "expected" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @private
         * @static
         * @template T
         * @param {T} actual
         * @param {T} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.containsObject = function (actual, expected) {
            var result = new ComparisonResult(true, "empty");
            //loop through all member
            for (var key in expected) {
                result = ObjectCompare.contains(actual[key], expected[key]);
                if (!result.success) {
                    break;
                }
            }
            return result;
        };
        /**
         * Generic deep copy.
         * Use to copy interface data.
         *
         * Performs a deep copy of the given structure in argument source. Copies the values of the argument "source" to the the argument "target".
         * Argument "source" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are copied via timestamp.
         *
         * @static
         * @template T
         * @param {T} target
         * @param {T} source
         * @returns {T}
         * @memberof ObjectCompare
         */
        ObjectCompare.deepCopy = function (target, source) {
            if (ObjectCompare.isDate(target) && ObjectCompare.isDate(source)) { //Date
                target.setTime(source.getTime());
            }
            else if (ObjectCompare.isArray(target) && ObjectCompare.isArray(source)) { //Array
                ObjectCompare.deepCopyArray(target, source);
            }
            else { // Object
                ObjectCompare.deepCopyObject(target, source);
            }
            return target;
        };
        /**
         * Generic deep copy of an Array.
         *
         * Performs a deep copy of the given structure in argument source. Copies the values of the argument "source" to the argument "target".
         * Argument "source" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are copied via timestamp.
         *
         * @private
         * @static
         * @param {Array<any>} target
         * @param {Array<any>} source
         * @memberof ObjectCompare
         */
        ObjectCompare.deepCopyArray = function (target, source) {
            //loop through all entries
            for (var i = 0; i < source.length; i += 1) {
                if (ObjectCompare.isPrimitive(target[i]) && ObjectCompare.isPrimitive(source[i])) { //Primitive entry
                    target[i] = source[i];
                }
                else { // complex entry
                    ObjectCompare.deepCopy(target[i], source[i]);
                }
            }
        };
        /**
         * Generic deep copy of an Object.
         *
         * Performs a deep copy of the given structure in argument source. Copies the values of the argument "source" to the the argument "target".
         * Argument "source" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are copied via timestamp.
         *
         * @private
         * @static
         * @param {Object} target
         * @param {Object} source
         * @memberof ObjectCompare
         */
        ObjectCompare.deepCopyObject = function (target, source) {
            //loop through member
            for (var key in source) {
                if (ObjectCompare.isPrimitive(target[key]) && ObjectCompare.isPrimitive(target[key])) { //Primitive member
                    target[key] = source[key];
                }
                else { // complex member
                    ObjectCompare.deepCopy(target[key], source[key]);
                }
            }
        };
        /**
         * Generic deep comparison.
         * Use to compare interface data.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are equal in the argument "actual".
         * arguments "expected" and "actual" need to be pure data objects at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {*} actual
         * @param {*} expected
         * @returns {boolean}
         * @memberof ObjectCompare
         */
        ObjectCompare.isEqual = function (actual, expected) {
            var result = ObjectCompare.equals(actual, expected);
            return result.success;
        };
        /**
         * Generic deep comparison.
         * Use to compare interface data.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are equal in the argument "actual".
         * arguments "expected" and "actual" need to be pure data objects at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {*} actual
         * @param {*} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.equals = function (actual, expected) {
            var result = new ComparisonResult(false, "actual < " + actual + " > and expected < " + expected + " > are not the same type.");
            if (ObjectCompare.isPrimitive(actual) && ObjectCompare.isPrimitive(expected)) { //Primitive
                result = ObjectCompare.comparePrimitives(actual, expected);
            }
            else if (ObjectCompare.isDate(actual) && ObjectCompare.isDate(expected)) { //Date
                result = ObjectCompare.compareDate(actual, expected);
            }
            else if (ObjectCompare.isArray(actual) && ObjectCompare.isArray(expected)) { //Array
                result = ObjectCompare.equalsArray(actual, expected);
            }
            else if (ObjectCompare.isObject(actual) && ObjectCompare.isObject(expected)) { // Object
                result = ObjectCompare.equalsObject(actual, expected);
            }
            return result;
        };
        /**
         * Generic deep comparison of Arrays.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are equal in the argument "actual".
         * arguments "expected" and "actual" need to be pure data objects at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {Array<any>} actual
         * @param {Array<any>} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.equalsArray = function (actual, expected) {
            var result = new ComparisonResult(false, "actual array < " + actual + " > and expected array < " + expected + " > do not have the same length");
            if (actual.length === expected.length) {
                result = new ComparisonResult(true, "empty arrays");
                //loop through all entries
                for (var i = 0; (i < expected.length) && result.success; i += 1) {
                    result = ObjectCompare.equals(actual[i], expected[i]);
                }
            }
            return result;
        };
        /**
         * Generic deep comparison of Objects.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are equal in the argument "actual".
         * arguments "expected" and "actual" need to be pure data objects at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @template T
         * @param {T} actual
         * @param {T} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.equalsObject = function (actual, expected) {
            var result = new ComparisonResult(false, "actual object < " + actual + " > and expected object < " + expected + " > do not have the same keys");
            var keysAreEqual = false;
            var actualKeys = Object.keys(actual).sort();
            var expectedKeys = Object.keys(expected).sort();
            if (actualKeys.length === expectedKeys.length) { // same number of keys?
                keysAreEqual = true;
            }
            for (var i = 0; keysAreEqual && (i < expectedKeys.length); i++) { //same keys?
                keysAreEqual = actualKeys[i] === expectedKeys[i];
            }
            if (keysAreEqual) { // same content of keys?
                result = new ComparisonResult(true, "empty objects");
                //loop through all member
                for (var key in expected) {
                    result = ObjectCompare.equals(actual[key], expected[key]);
                    if (!result.success) {
                        break;
                    }
                }
            }
            return result;
        };
        return ObjectCompare;
    }());
    exports.ObjectCompare = ObjectCompare;
    /**
     * Describes the result of an comparison
     *
     * @class ComparisonResult
     */
    var ComparisonResult = /** @class */ (function () {
        function ComparisonResult(isSuccess, failureMessage) {
            if (failureMessage === void 0) { failureMessage = "Message decribing reason of failure was not defined"; }
            this._isSuccess = isSuccess;
            this._failureMessage = failureMessage;
        }
        Object.defineProperty(ComparisonResult.prototype, "failureMessage", {
            /**
             * Returns the reason of failure of the described comparison
             *
             * @returns {string}
             * @memberof ComparisonResult
             */
            get: function () {
                return this._failureMessage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComparisonResult.prototype, "success", {
            /**
             * Return a boolean representating the success of the described comparison
             *
             * @returns {boolean}
             * @memberof ComparisonResult
             */
            get: function () {
                return this._isSuccess;
            },
            enumerable: true,
            configurable: true
        });
        return ComparisonResult;
    }());
    exports.ComparisonResult = ComparisonResult;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0Q29tcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3V0aWxpdGllcy9vYmplY3RDb21wYXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7O09BSUc7SUFDSDtRQUFBO1FBcWNBLENBQUM7UUFsY0M7Ozs7Ozs7OztXQVNHO1FBQ1kseUJBQVcsR0FBMUIsVUFBMkIsQ0FBTTtZQUUvQixPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUdEOzs7Ozs7OztXQVFHO1FBQ1ksb0JBQU0sR0FBckIsVUFBc0IsQ0FBTTtZQUUxQixPQUFPLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDWSxxQkFBTyxHQUF0QixVQUF1QixDQUFNO1lBRTNCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1ksc0JBQVEsR0FBdkIsVUFBd0IsQ0FBTTtZQUU1QixPQUFPLENBQUMsQ0FBQyxZQUFZLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNZLHNCQUFRLEdBQXZCLFVBQXdCLENBQU07WUFFNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFLRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ1cseUJBQVcsR0FBekIsVUFBMEIsTUFBVyxFQUFFLFFBQWE7WUFFbEQsSUFBSSxNQUFNLEdBQW9CLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNXLHNCQUFRLEdBQXRCLFVBQXVCLE1BQVcsRUFBRSxRQUFhO1lBRS9DLElBQUksTUFBTSxHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFdBQVcsR0FBRSxNQUFNLEdBQUcsb0JBQW9CLEdBQUcsUUFBUSxHQUFHLDJCQUEyQixDQUFDLENBQUM7WUFFOUgsSUFBRyxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxXQUFXO2dCQUV4RixNQUFNLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM1RDtpQkFBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE1BQU07Z0JBRWpGLE1BQU0sR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN0RDtpQkFBTSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE9BQU87Z0JBRXBGLE1BQU0sR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN4RDtpQkFBTSxJQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQyxFQUFFLFNBQVM7Z0JBRXRGLE1BQU0sR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6RDtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDWSwrQkFBaUIsR0FBaEMsVUFBaUMsTUFBaUIsRUFBRSxRQUFtQjtZQUVyRSxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7WUFFN0IsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSw2Q0FBNkM7Z0JBRXJILE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2RjtpQkFBTSxFQUFFLHNDQUFzQztnQkFFN0MsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDO2FBQ2pDO1lBRUQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsbUNBQW1DLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3pILENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDWSx5QkFBVyxHQUExQixVQUEyQixNQUFZLEVBQUUsUUFBYztZQUVyRCxvQkFBb0I7WUFDcEIsSUFBSSxlQUFlLEdBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RDLElBQUksaUJBQWlCLEdBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRTFDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLGVBQWUsS0FBSyxpQkFBaUIsQ0FBQyxFQUFFLG9CQUFvQixHQUFHLGVBQWUsR0FBRyx1Q0FBdUMsR0FBRyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNuTCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNZLDJCQUFhLEdBQTVCLFVBQTZCLE1BQWtCLEVBQUUsUUFBb0I7WUFFbkUsSUFBSSxNQUFNLEdBQXFCLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRW5FLDBCQUEwQjtZQUMxQixLQUFJLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFO2dCQUVuRSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekQ7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDWSw0QkFBYyxHQUE3QixVQUFnRCxNQUFTLEVBQUUsUUFBVztZQUVwRSxJQUFJLE1BQU0sR0FBcUIsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFbkUseUJBQXlCO1lBQ3pCLEtBQUssSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO2dCQUN4QixNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUNuQixNQUFNO2lCQUNQO2FBQ0Y7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDVyxzQkFBUSxHQUF0QixVQUF5QyxNQUFTLEVBQUUsTUFBUztZQUUzRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU07Z0JBRXhFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDbEM7aUJBQU0sSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPO2dCQUVsRixhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM3QztpQkFBTSxFQUFFLFNBQVM7Z0JBRWhCLGFBQWEsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNZLDJCQUFhLEdBQTVCLFVBQTZCLE1BQWtCLEVBQUUsTUFBa0I7WUFFakUsMEJBQTBCO1lBQzFCLEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBRWpELElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCO29CQUVuRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN2QjtxQkFBTSxFQUFFLGdCQUFnQjtvQkFFdkIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlDO2FBQ0Y7UUFDSCxDQUFDO1FBR0Q7Ozs7Ozs7Ozs7OztXQVlHO1FBQ1ksNEJBQWMsR0FBN0IsVUFBOEIsTUFBYyxFQUFFLE1BQWM7WUFFMUQscUJBQXFCO1lBQ3JCLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO2dCQUV0QixJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLGtCQUFrQjtvQkFFeEcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDM0I7cUJBQU0sRUFBRSxpQkFBaUI7b0JBRXhCLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNsRDthQUNGO1FBQ0gsQ0FBQztRQUdEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDVyxxQkFBTyxHQUFyQixVQUFzQixNQUFXLEVBQUUsUUFBYTtZQUU5QyxJQUFJLE1BQU0sR0FBcUIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdEUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFHRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ1csb0JBQU0sR0FBcEIsVUFBcUIsTUFBVyxFQUFFLFFBQWE7WUFFN0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsV0FBVyxHQUFFLE1BQU0sR0FBRyxvQkFBb0IsR0FBRyxRQUFRLEdBQUcsMkJBQTJCLENBQUMsQ0FBQztZQUU5SCxJQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFdBQVc7Z0JBRXhGLE1BQU0sR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVEO2lCQUFNLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTTtnQkFFakYsTUFBTSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsT0FBTztnQkFFcEYsTUFBTSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNLElBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUUsU0FBUztnQkFFdEYsTUFBTSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZEO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNJLHlCQUFXLEdBQWxCLFVBQW1CLE1BQWtCLEVBQUUsUUFBb0I7WUFFekQsSUFBSSxNQUFNLEdBQXFCLElBQUksZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGlCQUFpQixHQUFFLE1BQU0sR0FBRSwwQkFBMEIsR0FBRSxRQUFRLEdBQUUsZ0NBQWdDLENBQUMsQ0FBQztZQUU5SixJQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDcEMsTUFBTSxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUNwRCwwQkFBMEI7Z0JBQzFCLEtBQUksSUFBSSxDQUFDLEdBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBRSxDQUFDLEVBQUU7b0JBRW5FLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkQ7YUFDRjtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0ksMEJBQVksR0FBbkIsVUFBc0MsTUFBUyxFQUFFLFFBQVc7WUFFMUQsSUFBSSxNQUFNLEdBQXFCLElBQUksZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGtCQUFrQixHQUFFLE1BQU0sR0FBRSwyQkFBMkIsR0FBRSxRQUFRLEdBQUUsOEJBQThCLENBQUMsQ0FBQztZQUU5SixJQUFJLFlBQVksR0FBWSxLQUFLLENBQUM7WUFFbEMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QyxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWhELElBQUcsVUFBVSxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsdUJBQXVCO2dCQUNyRSxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1lBRUQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQVk7Z0JBQzNFLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1lBRUQsSUFBRyxZQUFZLEVBQUUsRUFBRSx3QkFBd0I7Z0JBQ3pDLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDckQseUJBQXlCO2dCQUN6QixLQUFLLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtvQkFDeEIsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTt3QkFDbkIsTUFBTTtxQkFDUDtpQkFDRjthQUNGO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0FBQyxBQXJjRCxJQXFjQztJQTJDUSxzQ0FBYTtJQXpDdEI7Ozs7T0FJRztJQUNIO1FBS0UsMEJBQVksU0FBa0IsRUFBRSxjQUE2RTtZQUE3RSwrQkFBQSxFQUFBLHNFQUE2RTtZQUUzRyxJQUFJLENBQUMsVUFBVSxHQUFFLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsZUFBZSxHQUFFLGNBQWMsQ0FBQztRQUN2QyxDQUFDO1FBU0Qsc0JBQVcsNENBQWM7WUFOekI7Ozs7O2VBS0c7aUJBQ0g7Z0JBRUUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzlCLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcscUNBQU87WUFObEI7Ozs7O2VBS0c7aUJBQ0g7Z0JBRUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3pCLENBQUM7OztXQUFBO1FBQ0gsdUJBQUM7SUFBRCxDQUFDLEFBbENELElBa0NDO0lBRXVCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbInR5cGUgUHJpbWl0aXZlID0gbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQ7XHJcblxyXG4vKipcclxuICogQ29udGFpbnMgdXRpbGl0eSBmb3Igb2JqZWN0IGNvbXBhcmlzb24uXHJcbiAqXHJcbiAqIEBjbGFzcyBPYmplY3RDb21wYXJlXHJcbiAqL1xyXG5jbGFzcyBPYmplY3RDb21wYXJlIHtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGVHdWFyZCBmb3IgdHlwZSBQcmltaXRpdmUgd2hpY2ggcmVwcmVzZW50YXRlcyAobnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpLlxyXG4gICAqIE1hdGNoZXMgb24gZXZlcnl0aGluZyB3aGljaCBpcyBub3QgT2JqZWN0IG9yIGRlcml2ZWQgZnJvbSBPYmplY3QuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0geyp9IHhcclxuICAgKiBAcmV0dXJucyB7eCBpcyBQcmltaXRpdmV9XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBpc1ByaW1pdGl2ZSh4OiBhbnkpOiB4IGlzIFByaW1pdGl2ZSB7XHJcblxyXG4gICAgcmV0dXJuICEoeCBpbnN0YW5jZW9mIE9iamVjdCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZUd1YXJkIGZvciB0eXBlIERhdGVcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0geFxyXG4gICAqIEByZXR1cm5zIHt4IGlzIERhdGV9XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBpc0RhdGUoeDogYW55KTogeCBpcyBEYXRlIHtcclxuXHJcbiAgICByZXR1cm4gKHggaW5zdGFuY2VvZiBEYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGVHdWFyZCBmb3IgdHlwZSBBcnJheS5cclxuICAgKiBNYXRjaGVzIG9uIGFsbCBBcnJheXMgcmVnYXJkbGVzcyBvZiB0eXBlcyBjb250YWluZWQgYXMgQXJyYXk8YW55Pi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0geyp9IHhcclxuICAgKiBAcmV0dXJucyB7eCBpcyBBcnJheTxhbnk+fVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgaXNBcnJheSh4OiBhbnkpOiB4IGlzIEFycmF5PGFueT4ge1xyXG5cclxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZUd1YXJkIGZvciB0eXBlIE9iamVjdC5cclxuICAgKiBBbHNvIG1hdGNoZXMgZm9yIGFsbCBleHRlbnNpb25zIG9mIE9iamVjdCAoZXZlcnkgY2xhc3MpLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHsqfSB4XHJcbiAgICogQHJldHVybnMge3ggaXMgT2JqZWN0fVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgaXNPYmplY3QoeDogYW55KTogeCBpcyBPYmplY3Qge1xyXG5cclxuICAgIHJldHVybiAoeCBpbnN0YW5jZW9mIE9iamVjdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUeXBlR3VhcmQgZm9yIHR5cGUgbnVtYmVyXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0geyp9IHhcclxuICAgKiBAcmV0dXJucyB7eCBpcyBudW1iZXJ9XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBpc051bWJlcih4OiBhbnkpOiB4IGlzIG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gXCJudW1iZXJcIik7XHJcbiAgfVxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJpYyBkZWVwIGNvbXBhcmlzb24uXHJcbiAgICogVXNlIHRvIGNvbXBhcmUgaW50ZXJmYWNlIGRhdGEuXHJcbiAgICogXHJcbiAgICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gdG8gdmFsaWRhdGUgaWYgdGhlIHN0cnVjdHVyZSBhbmQgdmFsdWVzIG9mIHRoZSBhcmd1bWVudCBcImV4cGVjdGVkXCIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgYXJndW1lbnQgXCJhY3R1YWxcIi5cclxuICAgKiBhcmd1bWVudCBcImV4cGVjdGVkXCIgbmVlZHMgdG8gYmUgYSBwdXJlIGRhdGEgb2JqZWN0IGF0IGFsbCBsYXllcnMgKGJ1dCBjYW4gY29udGFpbiBuZXN0ZWQgb2JqZWN0cyBhbmQgYXJyYXlzKS5cclxuICAgKiBEYXRlcyBhcmUgY29tcGFyZWQgdmlhIHRpbWVzdGFtcC5cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0geyp9IGFjdHVhbFxyXG4gICAqIEBwYXJhbSB7Kn0gZXhwZWN0ZWRcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNDb250YWluZWQoYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpOiBib29sZWFuIHtcclxuXHJcbiAgICBsZXQgcmVzdWx0OiBDb21wYXJpc29uUmVzdWx0PSBPYmplY3RDb21wYXJlLmNvbnRhaW5zKGFjdHVhbCwgZXhwZWN0ZWQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdC5zdWNjZXNzO1xyXG4gIH1cclxuICAgXHJcbiAgLyoqXHJcbiAgICogR2VuZXJpYyBkZWVwIGNvbXBhcmlzb24uXHJcbiAgICogVXNlIHRvIGNvbXBhcmUgaW50ZXJmYWNlIGRhdGEuXHJcbiAgICogXHJcbiAgICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gdG8gdmFsaWRhdGUgaWYgdGhlIHN0cnVjdHVyZSBhbmQgdmFsdWVzIG9mIHRoZSBhcmd1bWVudCBcImV4cGVjdGVkXCIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgYXJndW1lbnQgXCJhY3R1YWxcIi5cclxuICAgKiBhcmd1bWVudCBcImV4cGVjdGVkXCIgbmVlZHMgdG8gYmUgYSBwdXJlIGRhdGEgb2JqZWN0IGF0IGFsbCBsYXllcnMgKGJ1dCBjYW4gY29udGFpbiBuZXN0ZWQgb2JqZWN0cyBhbmQgYXJyYXlzKS5cclxuICAgKiBEYXRlcyBhcmUgY29tcGFyZWQgdmlhIHRpbWVzdGFtcC5cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0geyp9IGFjdHVhbFxyXG4gICAqIEBwYXJhbSB7Kn0gZXhwZWN0ZWRcclxuICAgKiBAcmV0dXJucyB7Q29tcGFyaXNvblJlc3VsdH1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgY29udGFpbnMoYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpOiBDb21wYXJpc29uUmVzdWx0IHtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IENvbXBhcmlzb25SZXN1bHQoZmFsc2UsIFwiYWN0dWFsIDwgXCIrIGFjdHVhbCArIFwiID4gYW5kIGV4cGVjdGVkIDwgXCIgKyBleHBlY3RlZCArIFwiID4gYXJlIG5vdCB0aGUgc2FtZSB0eXBlLlwiKTtcclxuXHJcbiAgICBpZihPYmplY3RDb21wYXJlLmlzUHJpbWl0aXZlKGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc1ByaW1pdGl2ZShleHBlY3RlZCkpIHsgLy9QcmltaXRpdmVcclxuXHJcbiAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuY29tcGFyZVByaW1pdGl2ZXMoYWN0dWFsLCBleHBlY3RlZCk7XHJcbiAgICB9IGVsc2UgaWYgKE9iamVjdENvbXBhcmUuaXNEYXRlKGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc0RhdGUoZXhwZWN0ZWQpKSB7IC8vRGF0ZVxyXG5cclxuICAgICAgcmVzdWx0ID0gT2JqZWN0Q29tcGFyZS5jb21wYXJlRGF0ZShhY3R1YWwsIGV4cGVjdGVkKTtcclxuICAgIH0gZWxzZSBpZiAoT2JqZWN0Q29tcGFyZS5pc0FycmF5KGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc0FycmF5KGV4cGVjdGVkKSkgeyAvL0FycmF5XHJcblxyXG4gICAgICByZXN1bHQgPSBPYmplY3RDb21wYXJlLmNvbnRhaW5zQXJyYXkoYWN0dWFsLCBleHBlY3RlZCk7XHJcbiAgICB9IGVsc2UgaWYoT2JqZWN0Q29tcGFyZS5pc09iamVjdChhY3R1YWwpICYmIE9iamVjdENvbXBhcmUuaXNPYmplY3QoZXhwZWN0ZWQpKXsgLy8gT2JqZWN0XHJcblxyXG4gICAgICByZXN1bHQgPSBPYmplY3RDb21wYXJlLmNvbnRhaW5zT2JqZWN0KGFjdHVhbCwgZXhwZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wYXJlcyB0d28gcHJpbWl0aXZlcyB0eXBlc2FmZS5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7UHJpbWl0aXZlfSBhY3R1YWxcclxuICAgKiBAcGFyYW0ge1ByaW1pdGl2ZX0gZXhwZWN0ZWRcclxuICAgKiBAcmV0dXJucyB7Q29tcGFyaXNvblJlc3VsdH1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGNvbXBhcmVQcmltaXRpdmVzKGFjdHVhbDogUHJpbWl0aXZlLCBleHBlY3RlZDogUHJpbWl0aXZlKTogQ29tcGFyaXNvblJlc3VsdCB7XHJcblxyXG4gICAgbGV0IGlzRXF1YWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoT2JqZWN0Q29tcGFyZS5pc051bWJlcihhY3R1YWwpICYmIE9iamVjdENvbXBhcmUuaXNOdW1iZXIoZXhwZWN0ZWQpKSB7IC8vY2hlY2sgbnVtYmVycyBzZXBlcmF0bHkgdG8gY292ZXIgTmFOIHZhbHVlc1xyXG5cclxuICAgICAgaXNFcXVhbCA9ICgoYWN0dWFsID09PSBleHBlY3RlZCkgfHwgKE51bWJlci5pc05hTihhY3R1YWwpICYmIE51bWJlci5pc05hTihleHBlY3RlZCkpKTtcclxuICAgIH0gZWxzZSB7IC8vb3RoZXIgcHJpbWl0aXZlcywgdW5kZWZpbmVkIGFuZCBudWxsXHJcblxyXG4gICAgICBpc0VxdWFsID0gKGFjdHVhbCA9PT0gZXhwZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQ29tcGFyaXNvblJlc3VsdChpc0VxdWFsLCBcImFjdHVhbCB2YWx1ZSA8XCIgKyBhY3R1YWwgKyBcIj4gZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgdmFsdWUgPFwiICsgZXhwZWN0ZWQgKyBcIj5cIik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wYXJlcyB0d28gRGF0ZXMgYmFzZWQgb24gdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHtEYXRlfSBhY3R1YWxcclxuICAgKiBAcGFyYW0ge0RhdGV9IGV4cGVjdGVkXHJcbiAgICogQHJldHVybnMge0NvbXBhcmlzb25SZXN1bHR9XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBjb21wYXJlRGF0ZShhY3R1YWw6IERhdGUsIGV4cGVjdGVkOiBEYXRlKTogQ29tcGFyaXNvblJlc3VsdCB7XHJcblxyXG4gICAgLy9leHRyYWN0IHRpbWVzdGFtcHNcclxuICAgIGxldCBhY3R1YWxUaW1lU3RhbXA9IGFjdHVhbC5nZXRUaW1lKCk7XHJcbiAgICBsZXQgZXhwZWN0ZWRUaW1lU3RhbXA9IGV4cGVjdGVkLmdldFRpbWUoKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBDb21wYXJpc29uUmVzdWx0KChhY3R1YWxUaW1lU3RhbXAgPT09IGV4cGVjdGVkVGltZVN0YW1wKSwgXCJhY3R1YWwgdGltZXN0YW1wIDxcIiArIGFjdHVhbFRpbWVTdGFtcCArIFwiPiBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCB0aW1lc3RhbXAgPFwiICsgZXhwZWN0ZWRUaW1lU3RhbXAgKyBcIj5cIik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmljIGRlZXAgY29tcGFyaXNvbiBvZiBBcnJheXMuXHJcbiAgICpcclxuICAgKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiB0byB2YWxpZGF0ZSBpZiB0aGUgc3RydWN0dXJlIGFuZCB2YWx1ZXMgb2YgdGhlIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBhcmUgY29udGFpbmVkIGluIHRoZSBhcmd1bWVudCBcImFjdHVhbFwiLlxyXG4gICAqIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBuZWVkcyB0byBiZSBhIHB1cmUgZGF0YSBvYmplY3QgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb21wYXJlZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYWN0dWFsXHJcbiAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBleHBlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtDb21wYXJpc29uUmVzdWx0fVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY29udGFpbnNBcnJheShhY3R1YWw6IEFycmF5PGFueT4sIGV4cGVjdGVkOiBBcnJheTxhbnk+KTogQ29tcGFyaXNvblJlc3VsdCB7XHJcblxyXG4gICAgbGV0IHJlc3VsdDogQ29tcGFyaXNvblJlc3VsdCA9IG5ldyBDb21wYXJpc29uUmVzdWx0KHRydWUsIFwiZW1wdHlcIik7XHJcblxyXG4gICAgLy9sb29wIHRocm91Z2ggYWxsIGVudHJpZXNcclxuICAgIGZvcihsZXQgaTogbnVtYmVyPSAwOyAoaSA8IGV4cGVjdGVkLmxlbmd0aCkgJiYgcmVzdWx0LnN1Y2Nlc3M7IGkrPTEpIHtcclxuXHJcbiAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuY29udGFpbnMoYWN0dWFsW2ldLCBleHBlY3RlZFtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyaWMgZGVlcCBjb21wYXJpc29uIG9mIE9iamVjdHMuXHJcbiAgICpcclxuICAgKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiB0byB2YWxpZGF0ZSBpZiB0aGUgc3RydWN0dXJlIGFuZCB2YWx1ZXMgb2YgdGhlIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBhcmUgY29udGFpbmVkIGluIHRoZSBhcmd1bWVudCBcImFjdHVhbFwiLlxyXG4gICAqIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBuZWVkcyB0byBiZSBhIHB1cmUgZGF0YSBvYmplY3QgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb21wYXJlZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEB0ZW1wbGF0ZSBUXHJcbiAgICogQHBhcmFtIHtUfSBhY3R1YWxcclxuICAgKiBAcGFyYW0ge1R9IGV4cGVjdGVkXHJcbiAgICogQHJldHVybnMge0NvbXBhcmlzb25SZXN1bHR9XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBjb250YWluc09iamVjdDxUIGV4dGVuZHMgT2JqZWN0PihhY3R1YWw6IFQsIGV4cGVjdGVkOiBUKTogQ29tcGFyaXNvblJlc3VsdCB7XHJcblxyXG4gICAgbGV0IHJlc3VsdDogQ29tcGFyaXNvblJlc3VsdCA9IG5ldyBDb21wYXJpc29uUmVzdWx0KHRydWUsIFwiZW1wdHlcIik7IFxyXG5cclxuICAgIC8vbG9vcCB0aHJvdWdoIGFsbCBtZW1iZXJcclxuICAgIGZvciAobGV0IGtleSBpbiBleHBlY3RlZCkge1xyXG4gICAgICByZXN1bHQgPSBPYmplY3RDb21wYXJlLmNvbnRhaW5zKGFjdHVhbFtrZXldLCBleHBlY3RlZFtrZXldKTtcclxuICAgICAgaWYgKCFyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyaWMgZGVlcCBjb3B5LlxyXG4gICAqIFVzZSB0byBjb3B5IGludGVyZmFjZSBkYXRhLlxyXG4gICAqIFxyXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb3B5IG9mIHRoZSBnaXZlbiBzdHJ1Y3R1cmUgaW4gYXJndW1lbnQgc291cmNlLiBDb3BpZXMgdGhlIHZhbHVlcyBvZiB0aGUgYXJndW1lbnQgXCJzb3VyY2VcIiB0byB0aGUgdGhlIGFyZ3VtZW50IFwidGFyZ2V0XCIuXHJcbiAgICogQXJndW1lbnQgXCJzb3VyY2VcIiBuZWVkcyB0byBiZSBhIHB1cmUgZGF0YSBvYmplY3QgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb3BpZWQgdmlhIHRpbWVzdGFtcC5cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAdGVtcGxhdGUgVFxyXG4gICAqIEBwYXJhbSB7VH0gdGFyZ2V0XHJcbiAgICogQHBhcmFtIHtUfSBzb3VyY2VcclxuICAgKiBAcmV0dXJucyB7VH1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZGVlcENvcHk8VCBleHRlbmRzIE9iamVjdD4odGFyZ2V0OiBULCBzb3VyY2U6IFQpOiBUIHtcclxuXHJcbiAgICBpZiAoT2JqZWN0Q29tcGFyZS5pc0RhdGUodGFyZ2V0KSAmJiBPYmplY3RDb21wYXJlLmlzRGF0ZShzb3VyY2UpKSB7IC8vRGF0ZVxyXG5cclxuICAgICAgdGFyZ2V0LnNldFRpbWUoc291cmNlLmdldFRpbWUoKSk7XHJcbiAgICB9IGVsc2UgaWYgKE9iamVjdENvbXBhcmUuaXNBcnJheSh0YXJnZXQpICYmIE9iamVjdENvbXBhcmUuaXNBcnJheShzb3VyY2UpKSB7IC8vQXJyYXlcclxuXHJcbiAgICAgIE9iamVjdENvbXBhcmUuZGVlcENvcHlBcnJheSh0YXJnZXQsIHNvdXJjZSk7XHJcbiAgICB9IGVsc2UgeyAvLyBPYmplY3RcclxuXHJcbiAgICAgIE9iamVjdENvbXBhcmUuZGVlcENvcHlPYmplY3QodGFyZ2V0LCBzb3VyY2UpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyaWMgZGVlcCBjb3B5IG9mIGFuIEFycmF5LlxyXG4gICAqIFxyXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb3B5IG9mIHRoZSBnaXZlbiBzdHJ1Y3R1cmUgaW4gYXJndW1lbnQgc291cmNlLiBDb3BpZXMgdGhlIHZhbHVlcyBvZiB0aGUgYXJndW1lbnQgXCJzb3VyY2VcIiB0byB0aGUgYXJndW1lbnQgXCJ0YXJnZXRcIi5cclxuICAgKiBBcmd1bWVudCBcInNvdXJjZVwiIG5lZWRzIHRvIGJlIGEgcHVyZSBkYXRhIG9iamVjdCBhdCBhbGwgbGF5ZXJzIChidXQgY2FuIGNvbnRhaW4gbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cykuXHJcbiAgICogRGF0ZXMgYXJlIGNvcGllZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHtBcnJheTxhbnk+fSB0YXJnZXRcclxuICAgKiBAcGFyYW0ge0FycmF5PGFueT59IHNvdXJjZVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZGVlcENvcHlBcnJheSh0YXJnZXQ6IEFycmF5PGFueT4sIHNvdXJjZTogQXJyYXk8YW55Pikge1xyXG4gICAgXHJcbiAgICAvL2xvb3AgdGhyb3VnaCBhbGwgZW50cmllc1xyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgXHJcbiAgICAgIGlmIChPYmplY3RDb21wYXJlLmlzUHJpbWl0aXZlKHRhcmdldFtpXSkgJiYgT2JqZWN0Q29tcGFyZS5pc1ByaW1pdGl2ZShzb3VyY2VbaV0pKSB7IC8vUHJpbWl0aXZlIGVudHJ5XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGFyZ2V0W2ldID0gc291cmNlW2ldO1xyXG4gICAgICB9IGVsc2UgeyAvLyBjb21wbGV4IGVudHJ5XHJcblxyXG4gICAgICAgIE9iamVjdENvbXBhcmUuZGVlcENvcHkodGFyZ2V0W2ldLCBzb3VyY2VbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJpYyBkZWVwIGNvcHkgb2YgYW4gT2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb3B5IG9mIHRoZSBnaXZlbiBzdHJ1Y3R1cmUgaW4gYXJndW1lbnQgc291cmNlLiBDb3BpZXMgdGhlIHZhbHVlcyBvZiB0aGUgYXJndW1lbnQgXCJzb3VyY2VcIiB0byB0aGUgdGhlIGFyZ3VtZW50IFwidGFyZ2V0XCIuXHJcbiAgICogQXJndW1lbnQgXCJzb3VyY2VcIiBuZWVkcyB0byBiZSBhIHB1cmUgZGF0YSBvYmplY3QgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb3BpZWQgdmlhIHRpbWVzdGFtcC5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlXHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBkZWVwQ29weU9iamVjdCh0YXJnZXQ6IE9iamVjdCwgc291cmNlOiBPYmplY3QpIHtcclxuXHJcbiAgICAvL2xvb3AgdGhyb3VnaCBtZW1iZXJcclxuICAgIGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcclxuICAgIFxyXG4gICAgICBpZiAoT2JqZWN0Q29tcGFyZS5pc1ByaW1pdGl2ZSh0YXJnZXRba2V5XSkgJiYgT2JqZWN0Q29tcGFyZS5pc1ByaW1pdGl2ZSh0YXJnZXRba2V5XSkpIHsgLy9QcmltaXRpdmUgbWVtYmVyXHJcblxyXG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcbiAgICAgIH0gZWxzZSB7IC8vIGNvbXBsZXggbWVtYmVyXHJcblxyXG4gICAgICAgIE9iamVjdENvbXBhcmUuZGVlcENvcHkodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyaWMgZGVlcCBjb21wYXJpc29uLlxyXG4gICAqIFVzZSB0byBjb21wYXJlIGludGVyZmFjZSBkYXRhLlxyXG4gICAqIFxyXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIHRvIHZhbGlkYXRlIGlmIHRoZSBzdHJ1Y3R1cmUgYW5kIHZhbHVlcyBvZiB0aGUgYXJndW1lbnQgXCJleHBlY3RlZFwiIGFyZSBlcXVhbCBpbiB0aGUgYXJndW1lbnQgXCJhY3R1YWxcIi5cclxuICAgKiBhcmd1bWVudHMgXCJleHBlY3RlZFwiIGFuZCBcImFjdHVhbFwiIG5lZWQgdG8gYmUgcHVyZSBkYXRhIG9iamVjdHMgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb21wYXJlZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0gYWN0dWFsXHJcbiAgICogQHBhcmFtIHsqfSBleHBlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBpc0VxdWFsKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KSA6IGJvb2xlYW4ge1xyXG5cclxuICAgIGxldCByZXN1bHQ6IENvbXBhcmlzb25SZXN1bHQgPSBPYmplY3RDb21wYXJlLmVxdWFscyhhY3R1YWwsIGV4cGVjdGVkKTtcclxuICAgIHJldHVybiByZXN1bHQuc3VjY2VzcztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmljIGRlZXAgY29tcGFyaXNvbi5cclxuICAgKiBVc2UgdG8gY29tcGFyZSBpbnRlcmZhY2UgZGF0YS5cclxuICAgKiBcclxuICAgKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiB0byB2YWxpZGF0ZSBpZiB0aGUgc3RydWN0dXJlIGFuZCB2YWx1ZXMgb2YgdGhlIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBhcmUgZXF1YWwgaW4gdGhlIGFyZ3VtZW50IFwiYWN0dWFsXCIuXHJcbiAgICogYXJndW1lbnRzIFwiZXhwZWN0ZWRcIiBhbmQgXCJhY3R1YWxcIiBuZWVkIHRvIGJlIHB1cmUgZGF0YSBvYmplY3RzIGF0IGFsbCBsYXllcnMgKGJ1dCBjYW4gY29udGFpbiBuZXN0ZWQgb2JqZWN0cyBhbmQgYXJyYXlzKS5cclxuICAgKiBEYXRlcyBhcmUgY29tcGFyZWQgdmlhIHRpbWVzdGFtcC5cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0geyp9IGFjdHVhbFxyXG4gICAqIEBwYXJhbSB7Kn0gZXhwZWN0ZWRcclxuICAgKiBAcmV0dXJucyB7Q29tcGFyaXNvblJlc3VsdH1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZXF1YWxzKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KTogQ29tcGFyaXNvblJlc3VsdCB7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBDb21wYXJpc29uUmVzdWx0KGZhbHNlLCBcImFjdHVhbCA8IFwiKyBhY3R1YWwgKyBcIiA+IGFuZCBleHBlY3RlZCA8IFwiICsgZXhwZWN0ZWQgKyBcIiA+IGFyZSBub3QgdGhlIHNhbWUgdHlwZS5cIik7XHJcblxyXG4gICAgaWYoT2JqZWN0Q29tcGFyZS5pc1ByaW1pdGl2ZShhY3R1YWwpICYmIE9iamVjdENvbXBhcmUuaXNQcmltaXRpdmUoZXhwZWN0ZWQpKSB7IC8vUHJpbWl0aXZlXHJcblxyXG4gICAgICByZXN1bHQgPSBPYmplY3RDb21wYXJlLmNvbXBhcmVQcmltaXRpdmVzKGFjdHVhbCwgZXhwZWN0ZWQpO1xyXG4gICAgfSBlbHNlIGlmIChPYmplY3RDb21wYXJlLmlzRGF0ZShhY3R1YWwpICYmIE9iamVjdENvbXBhcmUuaXNEYXRlKGV4cGVjdGVkKSkgeyAvL0RhdGVcclxuXHJcbiAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuY29tcGFyZURhdGUoYWN0dWFsLCBleHBlY3RlZCk7XHJcbiAgICB9IGVsc2UgaWYgKE9iamVjdENvbXBhcmUuaXNBcnJheShhY3R1YWwpICYmIE9iamVjdENvbXBhcmUuaXNBcnJheShleHBlY3RlZCkpIHsgLy9BcnJheVxyXG5cclxuICAgICAgcmVzdWx0ID0gT2JqZWN0Q29tcGFyZS5lcXVhbHNBcnJheShhY3R1YWwsIGV4cGVjdGVkKTtcclxuICAgIH0gZWxzZSBpZihPYmplY3RDb21wYXJlLmlzT2JqZWN0KGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc09iamVjdChleHBlY3RlZCkpeyAvLyBPYmplY3RcclxuXHJcbiAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuZXF1YWxzT2JqZWN0KGFjdHVhbCwgZXhwZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmljIGRlZXAgY29tcGFyaXNvbiBvZiBBcnJheXMuXHJcbiAgICpcclxuICAgKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiB0byB2YWxpZGF0ZSBpZiB0aGUgc3RydWN0dXJlIGFuZCB2YWx1ZXMgb2YgdGhlIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBhcmUgZXF1YWwgaW4gdGhlIGFyZ3VtZW50IFwiYWN0dWFsXCIuXHJcbiAgICogYXJndW1lbnRzIFwiZXhwZWN0ZWRcIiBhbmQgXCJhY3R1YWxcIiBuZWVkIHRvIGJlIHB1cmUgZGF0YSBvYmplY3RzIGF0IGFsbCBsYXllcnMgKGJ1dCBjYW4gY29udGFpbiBuZXN0ZWQgb2JqZWN0cyBhbmQgYXJyYXlzKS5cclxuICAgKiBEYXRlcyBhcmUgY29tcGFyZWQgdmlhIHRpbWVzdGFtcC5cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGFjdHVhbFxyXG4gICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZXhwZWN0ZWRcclxuICAgKiBAcmV0dXJucyB7Q29tcGFyaXNvblJlc3VsdH1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBlcXVhbHNBcnJheShhY3R1YWw6IEFycmF5PGFueT4sIGV4cGVjdGVkOiBBcnJheTxhbnk+KTogQ29tcGFyaXNvblJlc3VsdCB7XHJcbiAgICBcclxuICAgIGxldCByZXN1bHQ6IENvbXBhcmlzb25SZXN1bHQgPSBuZXcgQ29tcGFyaXNvblJlc3VsdChmYWxzZSwgXCJhY3R1YWwgYXJyYXkgPCBcIiArYWN0dWFsKyBcIiA+IGFuZCBleHBlY3RlZCBhcnJheSA8IFwiICtleHBlY3RlZCsgXCIgPiBkbyBub3QgaGF2ZSB0aGUgc2FtZSBsZW5ndGhcIik7XHJcblxyXG4gICAgaWYoYWN0dWFsLmxlbmd0aCA9PT0gZXhwZWN0ZWQubGVuZ3RoKSB7XHJcbiAgICAgIHJlc3VsdCA9IG5ldyBDb21wYXJpc29uUmVzdWx0KHRydWUsIFwiZW1wdHkgYXJyYXlzXCIpO1xyXG4gICAgICAvL2xvb3AgdGhyb3VnaCBhbGwgZW50cmllc1xyXG4gICAgICBmb3IobGV0IGk6IG51bWJlcj0gMDsgKGkgPCBleHBlY3RlZC5sZW5ndGgpICYmIHJlc3VsdC5zdWNjZXNzOyBpKz0xKSB7XHJcblxyXG4gICAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuZXF1YWxzKGFjdHVhbFtpXSwgZXhwZWN0ZWRbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyaWMgZGVlcCBjb21wYXJpc29uIG9mIE9iamVjdHMuXHJcbiAgICpcclxuICAgKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiB0byB2YWxpZGF0ZSBpZiB0aGUgc3RydWN0dXJlIGFuZCB2YWx1ZXMgb2YgdGhlIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBhcmUgZXF1YWwgaW4gdGhlIGFyZ3VtZW50IFwiYWN0dWFsXCIuXHJcbiAgICogYXJndW1lbnRzIFwiZXhwZWN0ZWRcIiBhbmQgXCJhY3R1YWxcIiBuZWVkIHRvIGJlIHB1cmUgZGF0YSBvYmplY3RzIGF0IGFsbCBsYXllcnMgKGJ1dCBjYW4gY29udGFpbiBuZXN0ZWQgb2JqZWN0cyBhbmQgYXJyYXlzKS5cclxuICAgKiBEYXRlcyBhcmUgY29tcGFyZWQgdmlhIHRpbWVzdGFtcC5cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAdGVtcGxhdGUgVFxyXG4gICAqIEBwYXJhbSB7VH0gYWN0dWFsXHJcbiAgICogQHBhcmFtIHtUfSBleHBlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtDb21wYXJpc29uUmVzdWx0fVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgc3RhdGljIGVxdWFsc09iamVjdDxUIGV4dGVuZHMgT2JqZWN0PihhY3R1YWw6IFQsIGV4cGVjdGVkOiBUKTogQ29tcGFyaXNvblJlc3VsdCB7XHJcbiAgICBcclxuICAgIGxldCByZXN1bHQ6IENvbXBhcmlzb25SZXN1bHQgPSBuZXcgQ29tcGFyaXNvblJlc3VsdChmYWxzZSwgXCJhY3R1YWwgb2JqZWN0IDwgXCIgK2FjdHVhbCsgXCIgPiBhbmQgZXhwZWN0ZWQgb2JqZWN0IDwgXCIgK2V4cGVjdGVkKyBcIiA+IGRvIG5vdCBoYXZlIHRoZSBzYW1lIGtleXNcIik7IFxyXG5cclxuICAgIGxldCBrZXlzQXJlRXF1YWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgYWN0dWFsS2V5cyA9IE9iamVjdC5rZXlzKGFjdHVhbCkuc29ydCgpO1xyXG4gICAgbGV0IGV4cGVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkKS5zb3J0KCk7XHJcbiAgICBcclxuICAgIGlmKGFjdHVhbEtleXMubGVuZ3RoID09PSBleHBlY3RlZEtleXMubGVuZ3RoKSB7IC8vIHNhbWUgbnVtYmVyIG9mIGtleXM/XHJcbiAgICAgIGtleXNBcmVFcXVhbCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBpID0gMDsga2V5c0FyZUVxdWFsICYmIChpIDwgZXhwZWN0ZWRLZXlzLmxlbmd0aCk7IGkrKykgeyAvL3NhbWUga2V5cz9cclxuICAgICAga2V5c0FyZUVxdWFsID0gYWN0dWFsS2V5c1tpXSA9PT0gZXhwZWN0ZWRLZXlzW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGtleXNBcmVFcXVhbCkgeyAvLyBzYW1lIGNvbnRlbnQgb2Yga2V5cz9cclxuICAgICAgcmVzdWx0ID0gbmV3IENvbXBhcmlzb25SZXN1bHQodHJ1ZSwgXCJlbXB0eSBvYmplY3RzXCIpO1xyXG4gICAgICAvL2xvb3AgdGhyb3VnaCBhbGwgbWVtYmVyXHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBleHBlY3RlZCkge1xyXG4gICAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuZXF1YWxzKGFjdHVhbFtrZXldLCBleHBlY3RlZFtrZXldKTtcclxuICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlc2NyaWJlcyB0aGUgcmVzdWx0IG9mIGFuIGNvbXBhcmlzb25cclxuICpcclxuICogQGNsYXNzIENvbXBhcmlzb25SZXN1bHRcclxuICovXHJcbmNsYXNzIENvbXBhcmlzb25SZXN1bHQge1xyXG5cclxuICBwcml2YXRlIF9pc1N1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfZmFpbHVyZU1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoaXNTdWNjZXNzOiBib29sZWFuLCBmYWlsdXJlTWVzc2FnZTogc3RyaW5nPSBcIk1lc3NhZ2UgZGVjcmliaW5nIHJlYXNvbiBvZiBmYWlsdXJlIHdhcyBub3QgZGVmaW5lZFwiKSB7XHJcblxyXG4gICAgdGhpcy5faXNTdWNjZXNzPSBpc1N1Y2Nlc3M7XHJcbiAgICB0aGlzLl9mYWlsdXJlTWVzc2FnZT0gZmFpbHVyZU1lc3NhZ2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqIFxyXG4gICAqIFJldHVybnMgdGhlIHJlYXNvbiBvZiBmYWlsdXJlIG9mIHRoZSBkZXNjcmliZWQgY29tcGFyaXNvblxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICogQG1lbWJlcm9mIENvbXBhcmlzb25SZXN1bHRcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGZhaWx1cmVNZXNzYWdlKCk6IHN0cmluZyB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2ZhaWx1cmVNZXNzYWdlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhIGJvb2xlYW4gcmVwcmVzZW50YXRpbmcgdGhlIHN1Y2Nlc3Mgb2YgdGhlIGRlc2NyaWJlZCBjb21wYXJpc29uXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgQ29tcGFyaXNvblJlc3VsdFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgc3VjY2VzcygpOiBib29sZWFuIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5faXNTdWNjZXNzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgT2JqZWN0Q29tcGFyZSwgQ29tcGFyaXNvblJlc3VsdCB9Il19
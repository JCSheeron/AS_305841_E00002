define(["require", "exports", "./metaClassProperties"], function (require, exports, metaClassProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides setting and retrieving descriptive and informational capabilities of reflected types and atributes for classes.
     *
     * @export
     * @class MetaClassReflectionInfo
     */
    var MetaClassReflectionInfo = /** @class */ (function () {
        function MetaClassReflectionInfo() {
        }
        /**
         * Specifies one or more class properties.
         *
         * @static
         * @param {string} classType
         * @param {{}} newClassProperties
         * @memberof MetaClassReflectionData
         */
        MetaClassReflectionInfo.registerProperty = function (classType, propertyName, propertyValue) {
            // Registering a class name qualifies for beeing a valid meta info owner !
            var metaClassInfo = propertyName === metaClassProperties_1.MetaClassProperty.className ? this.createMetaClassInfo(classType) : this.getMetaClassInfo(classType);
            if (metaClassInfo && classType instanceof Function) {
                // set the meta property and value.
                metaClassInfo[propertyName] = propertyValue;
            }
        };
        /**
         * Creates a meta info property for a given class
         *
         * @private
         * @static
         * @param {Function} classType
         * @returns {(object | undefined)}
         * @memberof MetaClassReflectionInfo
         */
        MetaClassReflectionInfo.createMetaClassInfo = function (classType) {
            // the meta property owner needs to be a constructor method
            if ((classType instanceof Function) && classType !== undefined && classType.prototype !== undefined) {
                // create the meta info property
                classType.prototype.__$$classMetaInfo = {};
            }
            return classType.prototype.__$$classMetaInfo;
        };
        /**
         * Retrieves the class meta info for a given class
         *
         * @private
         * @param {TConstructor} classType
         * @returns {(object |undefined)}
         * @memberof MetaClassReflectionInfo
         */
        MetaClassReflectionInfo.getMetaClassInfo = function (classType) {
            var classMetaInfo = undefined;
            // the meta property owner needs to be a constructor method
            if ((classType instanceof Function) && classType !== undefined && classType.prototype !== undefined) {
                // get the meta properties from the class type
                classMetaInfo = classType.prototype.__$$classMetaInfo;
            }
            return classMetaInfo;
        };
        /**
         * Determines if the class has the specified property.
         *
         * @static
         * @param {string} className
         * @param {string} propertyName
         * @returns {boolean}
         * @memberof MetaClassReflectionInfo
         */
        MetaClassReflectionInfo.classHasMetaProperty = function (classType, propertyName) {
            var classHasProperty = false;
            // get meta data for the requested class.
            var metaClassInfo = this.getMetaClassInfo(classType);
            if (metaClassInfo) {
                // check for existing property 
                classHasProperty = metaClassInfo.hasOwnProperty(propertyName);
            }
            return classHasProperty;
        };
        /**
         * Reads the value of the specified propety
         *
         * @static
         * @param {string} className
         * @param {string} propertyName
         * @returns {*}
         * @memberof MetaClassReflectionInfo
         */
        MetaClassReflectionInfo.getClassMetaPropertyValue = function (classType, propertyName) {
            var propertyValue = undefined;
            // get meta data for the requested class.
            var metaClassInfo = this.getMetaClassInfo(classType);
            if (metaClassInfo && this.classHasMetaProperty(classType, propertyName)) {
                // get the property value
                propertyValue = metaClassInfo[propertyName];
            }
            return propertyValue;
        };
        return MetaClassReflectionInfo;
    }());
    exports.MetaClassReflectionInfo = MetaClassReflectionInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YUNsYXNzUmVmbGVjdGlvbkluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9yZWZsZWN0aW9uL21ldGFDbGFzc1JlZmxlY3Rpb25JbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQXdIQSxDQUFDO1FBdEhHOzs7Ozs7O1dBT0c7UUFDVyx3Q0FBZ0IsR0FBOUIsVUFBK0IsU0FBdUIsRUFBRSxZQUFvQixFQUFFLGFBQWtCO1lBRTVGLDBFQUEwRTtZQUMxRSxJQUFJLGFBQWEsR0FBRyxZQUFZLEtBQUssdUNBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzSSxJQUFJLGFBQWEsSUFBSSxTQUFTLFlBQVksUUFBUSxFQUFFO2dCQUVoRCxtQ0FBbUM7Z0JBQ25DLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxhQUFhLENBQUM7YUFDL0M7UUFFTCxDQUFDO1FBR0Q7Ozs7Ozs7O1dBUUc7UUFDWSwyQ0FBbUIsR0FBbEMsVUFBbUMsU0FBbUI7WUFFbEQsMkRBQTJEO1lBQzNELElBQUksQ0FBQyxTQUFTLFlBQVksUUFBUSxDQUFDLElBQUksU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFFakcsZ0NBQWdDO2dCQUNoQyxTQUFTLENBQUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQzthQUU5QztZQUVELE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztRQUVqRCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNpQix3Q0FBZ0IsR0FBL0IsVUFBZ0MsU0FBbUI7WUFFaEQsSUFBSSxhQUFhLEdBQW9CLFNBQVMsQ0FBQztZQUUvQywyREFBMkQ7WUFDM0QsSUFBSSxDQUFDLFNBQVMsWUFBWSxRQUFRLENBQUMsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUVqRyw4Q0FBOEM7Z0JBQzlDLGFBQWEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDO2FBQ3pEO1lBRUQsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQUVMOzs7Ozs7OztXQVFHO1FBQ1csNENBQW9CLEdBQWxDLFVBQW1DLFNBQXVCLEVBQUUsWUFBb0I7WUFFNUUsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFFN0IseUNBQXlDO1lBQ3pDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyRCxJQUFJLGFBQWEsRUFBRTtnQkFDZiwrQkFBK0I7Z0JBQy9CLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakU7WUFDRCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFHRDs7Ozs7Ozs7V0FRRztRQUNXLGlEQUF5QixHQUF2QyxVQUF3QyxTQUF1QixFQUFFLFlBQW9CO1lBRWpGLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUU5Qix5Q0FBeUM7WUFDekMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJELElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3BFLHlCQUF5QjtnQkFDekIsYUFBYSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMvQztZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFLTCw4QkFBQztJQUFELENBQUMsQUF4SEQsSUF3SEM7SUF4SFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVENvbnN0cnVjdG9yIH0gZnJvbSBcIi4uL2NvbXBvbmVudEh1Yi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuaW1wb3J0IHsgTWV0YUNsYXNzUHJvcGVydHkgfSBmcm9tIFwiLi9tZXRhQ2xhc3NQcm9wZXJ0aWVzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIHNldHRpbmcgYW5kIHJldHJpZXZpbmcgZGVzY3JpcHRpdmUgYW5kIGluZm9ybWF0aW9uYWwgY2FwYWJpbGl0aWVzIG9mIHJlZmxlY3RlZCB0eXBlcyBhbmQgYXRyaWJ1dGVzIGZvciBjbGFzc2VzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBNZXRhQ2xhc3NSZWZsZWN0aW9uSW5mb1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyBvbmUgb3IgbW9yZSBjbGFzcyBwcm9wZXJ0aWVzLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc1R5cGVcclxuICAgICAqIEBwYXJhbSB7e319IG5ld0NsYXNzUHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIE1ldGFDbGFzc1JlZmxlY3Rpb25EYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVnaXN0ZXJQcm9wZXJ0eShjbGFzc1R5cGU6IFRDb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IGFueSkge1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlcmluZyBhIGNsYXNzIG5hbWUgcXVhbGlmaWVzIGZvciBiZWVpbmcgYSB2YWxpZCBtZXRhIGluZm8gb3duZXIgIVxyXG4gICAgICAgIGxldCBtZXRhQ2xhc3NJbmZvID0gcHJvcGVydHlOYW1lID09PSBNZXRhQ2xhc3NQcm9wZXJ0eS5jbGFzc05hbWUgPyAgdGhpcy5jcmVhdGVNZXRhQ2xhc3NJbmZvKGNsYXNzVHlwZSkgOiB0aGlzLmdldE1ldGFDbGFzc0luZm8oY2xhc3NUeXBlKTtcclxuXHJcbiAgICAgICAgaWYgKG1ldGFDbGFzc0luZm8gJiYgY2xhc3NUeXBlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBzZXQgdGhlIG1ldGEgcHJvcGVydHkgYW5kIHZhbHVlLlxyXG4gICAgICAgICAgICBtZXRhQ2xhc3NJbmZvW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0eVZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1ldGEgaW5mbyBwcm9wZXJ0eSBmb3IgYSBnaXZlbiBjbGFzc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbGFzc1R5cGVcclxuICAgICAqIEByZXR1cm5zIHsob2JqZWN0IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRhQ2xhc3NSZWZsZWN0aW9uSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVNZXRhQ2xhc3NJbmZvKGNsYXNzVHlwZTogRnVuY3Rpb24pOiBvYmplY3QgfCB1bmRlZmluZWQge1xyXG5cclxuICAgICAgICAvLyB0aGUgbWV0YSBwcm9wZXJ0eSBvd25lciBuZWVkcyB0byBiZSBhIGNvbnN0cnVjdG9yIG1ldGhvZFxyXG4gICAgICAgIGlmICgoY2xhc3NUeXBlIGluc3RhbmNlb2YgRnVuY3Rpb24pICYmIGNsYXNzVHlwZSAhPT0gdW5kZWZpbmVkICYmIGNsYXNzVHlwZS5wcm90b3R5cGUgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBtZXRhIGluZm8gcHJvcGVydHlcclxuICAgICAgICAgICAgY2xhc3NUeXBlLnByb3RvdHlwZS5fXyQkY2xhc3NNZXRhSW5mbyA9IHt9O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjbGFzc1R5cGUucHJvdG90eXBlLl9fJCRjbGFzc01ldGFJbmZvO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgY2xhc3MgbWV0YSBpbmZvIGZvciBhIGdpdmVuIGNsYXNzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VENvbnN0cnVjdG9yfSBjbGFzc1R5cGVcclxuICAgICAqIEByZXR1cm5zIHsob2JqZWN0IHx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvXHJcbiAgICAgKi9cclxuICAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TWV0YUNsYXNzSW5mbyhjbGFzc1R5cGU6IEZ1bmN0aW9uKTogb2JqZWN0IHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjbGFzc01ldGFJbmZvOm9iamVjdHx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGUgbWV0YSBwcm9wZXJ0eSBvd25lciBuZWVkcyB0byBiZSBhIGNvbnN0cnVjdG9yIG1ldGhvZFxyXG4gICAgICAgICAgICBpZiAoKGNsYXNzVHlwZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSAmJiBjbGFzc1R5cGUgIT09IHVuZGVmaW5lZCAmJiBjbGFzc1R5cGUucHJvdG90eXBlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBtZXRhIHByb3BlcnRpZXMgZnJvbSB0aGUgY2xhc3MgdHlwZVxyXG4gICAgICAgICAgICAgICAgY2xhc3NNZXRhSW5mbyA9IGNsYXNzVHlwZS5wcm90b3R5cGUuX18kJGNsYXNzTWV0YUluZm87XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzc01ldGFJbmZvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGNsYXNzIGhhcyB0aGUgc3BlY2lmaWVkIHByb3BlcnR5LlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3NIYXNNZXRhUHJvcGVydHkoY2xhc3NUeXBlOiBUQ29uc3RydWN0b3IsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGxldCBjbGFzc0hhc1Byb3BlcnR5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGdldCBtZXRhIGRhdGEgZm9yIHRoZSByZXF1ZXN0ZWQgY2xhc3MuXHJcbiAgICAgICAgbGV0IG1ldGFDbGFzc0luZm8gPSB0aGlzLmdldE1ldGFDbGFzc0luZm8oY2xhc3NUeXBlKTtcclxuXHJcbiAgICAgICAgaWYgKG1ldGFDbGFzc0luZm8pIHtcclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGV4aXN0aW5nIHByb3BlcnR5IFxyXG4gICAgICAgICAgICBjbGFzc0hhc1Byb3BlcnR5ID0gbWV0YUNsYXNzSW5mby5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2xhc3NIYXNQcm9wZXJ0eTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBwcm9wZXR5XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0YUNsYXNzUmVmbGVjdGlvbkluZm9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDbGFzc01ldGFQcm9wZXJ0eVZhbHVlKGNsYXNzVHlwZTogVENvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGFueSB8IHVuZGVmaW5lZCB7XHJcblxyXG4gICAgICAgIGxldCBwcm9wZXJ0eVZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBtZXRhIGRhdGEgZm9yIHRoZSByZXF1ZXN0ZWQgY2xhc3MuXHJcbiAgICAgICAgbGV0IG1ldGFDbGFzc0luZm8gPSB0aGlzLmdldE1ldGFDbGFzc0luZm8oY2xhc3NUeXBlKTtcclxuXHJcbiAgICAgICAgaWYgKG1ldGFDbGFzc0luZm8gJiYgdGhpcy5jbGFzc0hhc01ldGFQcm9wZXJ0eShjbGFzc1R5cGUscHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHByb3BlcnR5IHZhbHVlXHJcbiAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSBtZXRhQ2xhc3NJbmZvW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcHJvcGVydHlWYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn0iXX0=
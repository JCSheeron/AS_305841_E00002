define(["require", "exports", "../metaClassReflectionInfo", "../../../framework/reflection/metaClassProperties", "../../../factory/classFactory"], function (require, exports, metaClassReflectionInfo_1, metaClassProperties_1, classFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetaClassProperty = metaClassProperties_1.MetaClassProperty;
    /**
     * Decorator for reflecting the meta properties
     *
     * @export
     * @param {string} propertyName
     * @param {*} propertyValue
     * @returns
     */
    function metaClassProperty(propertyName, propertyValue) {
        // return decorator function
        return function registerMetaProperty(constructor) {
            // register the meta class property
            metaClassReflectionInfo_1.MetaClassReflectionInfo.registerProperty(constructor, propertyName, propertyValue);
            // when registering a class name we add the class to the class factory
            if (propertyName === metaClassProperties_1.MetaClassProperty.className) {
                classFactory_1.ClassFactory.registerDynamicClass(propertyValue, constructor);
            }
        };
    }
    exports.metaClassProperty = metaClassProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YUNsYXNzUHJvcGVydHlEZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9yZWZsZWN0aW9uL2RlY29yYXRvcnMvbWV0YUNsYXNzUHJvcGVydHlEZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBNEIwQiw0QkExQmxCLHVDQUFpQixDQTBCa0I7SUF0QjNDOzs7Ozs7O09BT0c7SUFDSCxTQUFTLGlCQUFpQixDQUFDLFlBQW1CLEVBQUMsYUFBaUI7UUFDNUQsNEJBQTRCO1FBQzVCLE9BQU8sU0FBUyxvQkFBb0IsQ0FBQyxXQUF3QjtZQUN6RCxtQ0FBbUM7WUFDbkMsaURBQXVCLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUVuRixzRUFBc0U7WUFDdEUsSUFBRyxZQUFZLEtBQUssdUNBQWlCLENBQUMsU0FBUyxFQUFDO2dCQUM1QywyQkFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBQyxXQUFXLENBQUMsQ0FBQzthQUNoRTtRQUVMLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFTyw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUQ29uc3RydWN0b3IgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50SHViL2NvbW1vbi9jb21tb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBNZXRhQ2xhc3NSZWZsZWN0aW9uSW5mbyB9IGZyb20gXCIuLi9tZXRhQ2xhc3NSZWZsZWN0aW9uSW5mb1wiO1xyXG5pbXBvcnQge01ldGFDbGFzc1Byb3BlcnR5fSAgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9yZWZsZWN0aW9uL21ldGFDbGFzc1Byb3BlcnRpZXNcIjtcclxuaW1wb3J0IHsgQ2xhc3NGYWN0b3J5IH0gZnJvbSBcIi4uLy4uLy4uL2ZhY3RvcnkvY2xhc3NGYWN0b3J5XCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIERlY29yYXRvciBmb3IgcmVmbGVjdGluZyB0aGUgbWV0YSBwcm9wZXJ0aWVzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxyXG4gKiBAcGFyYW0geyp9IHByb3BlcnR5VmFsdWVcclxuICogQHJldHVybnNcclxuICovXHJcbmZ1bmN0aW9uIG1ldGFDbGFzc1Byb3BlcnR5KHByb3BlcnR5TmFtZTpzdHJpbmcscHJvcGVydHlWYWx1ZTphbnkpIHtcclxuICAgIC8vIHJldHVybiBkZWNvcmF0b3IgZnVuY3Rpb25cclxuICAgIHJldHVybiBmdW5jdGlvbiByZWdpc3Rlck1ldGFQcm9wZXJ0eShjb25zdHJ1Y3RvcjpUQ29uc3RydWN0b3IpIHtcclxuICAgICAgICAvLyByZWdpc3RlciB0aGUgbWV0YSBjbGFzcyBwcm9wZXJ0eVxyXG4gICAgICAgIE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvLnJlZ2lzdGVyUHJvcGVydHkoY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIHdoZW4gcmVnaXN0ZXJpbmcgYSBjbGFzcyBuYW1lIHdlIGFkZCB0aGUgY2xhc3MgdG8gdGhlIGNsYXNzIGZhY3RvcnlcclxuICAgICAgICBpZihwcm9wZXJ0eU5hbWUgPT09IE1ldGFDbGFzc1Byb3BlcnR5LmNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgIENsYXNzRmFjdG9yeS5yZWdpc3RlckR5bmFtaWNDbGFzcyhwcm9wZXJ0eVZhbHVlLGNvbnN0cnVjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge21ldGFDbGFzc1Byb3BlcnR5LE1ldGFDbGFzc1Byb3BlcnR5fTsiXX0=
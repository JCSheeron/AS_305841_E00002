define(["require", "exports", "../editStringHelper", "../formatter/baseFormatterHelper", "./formatSpecificationFlag", "./formatSpecificationPrecision", "./formatSpecificationType"], function (require, exports, editStringHelper_1, baseFormatterHelper_1, formatSpecificationFlag_1, formatSpecificationPrecision_1, formatSpecificationType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class provides static FormatSpecificationWidth functions
     *
     * @static
     * @class FormatSpecificationWidth
     */
    var FormatSpecificationWidth = /** @class */ (function () {
        /**
         * Constructor set to private FormatSpecificationWidth class should only provide static functions.
         * Creates an instance of FormatSpecificationWidth.
         * @memberof FormatSpecificationWidth
         */
        function FormatSpecificationWidth() {
        }
        ;
        /**
         * Gets the width from the input string as number and set it in the IFormatSpecification.width
         * If there is no match no width is set
         *
         * @static
         * @param {IFormatSpecification} formatSpecification
         * @param {string} textFormatSpecification
         * @return {IFormatSpecification}
         * @memberof FormatSpecificationWidth
         */
        FormatSpecificationWidth.getFormatSpecificationWidth = function (formatSpecification, textFormatSpecification) {
            // get width string from the FormatSpecification string
            var flagSeperator = formatSpecificationFlag_1.FormatSpecificationFlag.getFlagsSeperator(textFormatSpecification);
            var widthSeperator = this.getWidthSeperator(textFormatSpecification);
            var widthStr = textFormatSpecification.substring(flagSeperator, widthSeperator);
            // get width from the width string
            var width = baseFormatterHelper_1.BaseFormatterHelper.parseStringToInt(widthStr);
            if (!isNaN(width)) {
                formatSpecification.width = width;
            }
            return formatSpecification;
        };
        /**
         * Returns the position of the textFormatSpecification that shows the end of the width
         *
         *
         * @static
         * @param {string} textFormatSpecification
         * @return {*}  {number}
         * @memberof FormatSpecificationType
         */
        FormatSpecificationWidth.getWidthSeperator = function (textFormatSpecification) {
            //get the position of "."
            var widthSeperator = formatSpecificationPrecision_1.FormatSpecificationPrecision.getPrecisionSeperator(textFormatSpecification);
            //if there is no "." then get the type position
            if (!editStringHelper_1.EditStringHelper.indexIsValid(widthSeperator)) {
                widthSeperator = formatSpecificationType_1.FormatSpecificationType.getTypeSeperator(textFormatSpecification);
            }
            return widthSeperator;
        };
        return FormatSpecificationWidth;
    }());
    exports.FormatSpecificationWidth = FormatSpecificationWidth;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U3BlY2lmaWNhdGlvbldpZHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvZm9ybWF0U3BlY2lmaWNhdGlvbi9mb3JtYXRTcGVjaWZpY2F0aW9uV2lkdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7Ozs7O09BS0c7SUFDSDtRQUVJOzs7O1dBSUc7UUFDSDtRQUF1QixDQUFDO1FBQUEsQ0FBQztRQUV6Qjs7Ozs7Ozs7O1dBU0c7UUFDVyxvREFBMkIsR0FBekMsVUFBMEMsbUJBQXlDLEVBQUUsdUJBQStCO1lBRWhILHVEQUF1RDtZQUN2RCxJQUFJLGFBQWEsR0FBVyxpREFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQy9GLElBQUksY0FBYyxHQUFXLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQzdFLElBQUksUUFBUSxHQUFXLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFeEYsa0NBQWtDO1lBQ2xDLElBQUksS0FBSyxHQUFXLHlDQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25FLElBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2QsbUJBQW1CLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNyQztZQUVELE9BQU8sbUJBQW1CLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ1csMENBQWlCLEdBQS9CLFVBQWdDLHVCQUErQjtZQUUzRCx5QkFBeUI7WUFDekIsSUFBSSxjQUFjLEdBQVcsMkRBQTRCLENBQUMscUJBQXFCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUV6RywrQ0FBK0M7WUFDL0MsSUFBRyxDQUFDLG1DQUFnQixDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDL0MsY0FBYyxHQUFHLGlEQUF1QixDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDdEY7WUFFRCxPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBeERELElBd0RDO0lBeERZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElGb3JtYXRTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZS9mb3JtYXRTcGVjaWZpY2F0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEVkaXRTdHJpbmdIZWxwZXIgfSBmcm9tIFwiLi4vZWRpdFN0cmluZ0hlbHBlclwiO1xyXG5pbXBvcnQgeyBCYXNlRm9ybWF0dGVySGVscGVyIH0gZnJvbSBcIi4uL2Zvcm1hdHRlci9iYXNlRm9ybWF0dGVySGVscGVyXCI7XHJcbmltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb25GbGFnIH0gZnJvbSBcIi4vZm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdcIjtcclxuaW1wb3J0IHsgRm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbiB9IGZyb20gXCIuL2Zvcm1hdFNwZWNpZmljYXRpb25QcmVjaXNpb25cIjtcclxuaW1wb3J0IHsgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi9mb3JtYXRTcGVjaWZpY2F0aW9uVHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgc3RhdGljIEZvcm1hdFNwZWNpZmljYXRpb25XaWR0aCBmdW5jdGlvbnNcclxuICogXHJcbiAqIEBzdGF0aWNcclxuICogQGNsYXNzIEZvcm1hdFNwZWNpZmljYXRpb25XaWR0aFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1hdFNwZWNpZmljYXRpb25XaWR0aHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yIHNldCB0byBwcml2YXRlIEZvcm1hdFNwZWNpZmljYXRpb25XaWR0aCBjbGFzcyBzaG91bGQgb25seSBwcm92aWRlIHN0YXRpYyBmdW5jdGlvbnMuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEZvcm1hdFNwZWNpZmljYXRpb25XaWR0aC5cclxuICAgICAqIEBtZW1iZXJvZiBGb3JtYXRTcGVjaWZpY2F0aW9uV2lkdGhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgd2lkdGggZnJvbSB0aGUgaW5wdXQgc3RyaW5nIGFzIG51bWJlciBhbmQgc2V0IGl0IGluIHRoZSBJRm9ybWF0U3BlY2lmaWNhdGlvbi53aWR0aFxyXG4gICAgICogSWYgdGhlcmUgaXMgbm8gbWF0Y2ggbm8gd2lkdGggaXMgc2V0IFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUZvcm1hdFNwZWNpZmljYXRpb259IGZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvblxyXG4gICAgICogQHJldHVybiB7SUZvcm1hdFNwZWNpZmljYXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0U3BlY2lmaWNhdGlvbldpZHRoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Rm9ybWF0U3BlY2lmaWNhdGlvbldpZHRoKGZvcm1hdFNwZWNpZmljYXRpb246IElGb3JtYXRTcGVjaWZpY2F0aW9uLCB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbjogc3RyaW5nKSA6IElGb3JtYXRTcGVjaWZpY2F0aW9uIHsgICAgICAgXHJcblxyXG4gICAgICAgIC8vIGdldCB3aWR0aCBzdHJpbmcgZnJvbSB0aGUgRm9ybWF0U3BlY2lmaWNhdGlvbiBzdHJpbmdcclxuICAgICAgICBsZXQgZmxhZ1NlcGVyYXRvcjogbnVtYmVyID0gRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWcuZ2V0RmxhZ3NTZXBlcmF0b3IodGV4dEZvcm1hdFNwZWNpZmljYXRpb24pO1xyXG4gICAgICAgIGxldCB3aWR0aFNlcGVyYXRvcjogbnVtYmVyID0gdGhpcy5nZXRXaWR0aFNlcGVyYXRvcih0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbik7XHJcbiAgICAgICAgbGV0IHdpZHRoU3RyOiBzdHJpbmcgPSB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbi5zdWJzdHJpbmcoZmxhZ1NlcGVyYXRvciwgd2lkdGhTZXBlcmF0b3IpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB3aWR0aCBmcm9tIHRoZSB3aWR0aCBzdHJpbmdcclxuICAgICAgICBsZXQgd2lkdGg6IG51bWJlciA9IEJhc2VGb3JtYXR0ZXJIZWxwZXIucGFyc2VTdHJpbmdUb0ludCh3aWR0aFN0cik7XHJcbiAgICAgICAgaWYoIWlzTmFOKHdpZHRoKSkge1xyXG4gICAgICAgICAgICBmb3JtYXRTcGVjaWZpY2F0aW9uLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0U3BlY2lmaWNhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbiB0aGF0IHNob3dzIHRoZSBlbmQgb2YgdGhlIHdpZHRoXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFdpZHRoU2VwZXJhdG9yKHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uOiBzdHJpbmcpIDogbnVtYmVyIHtcclxuICAgICAgICBcclxuICAgICAgICAvL2dldCB0aGUgcG9zaXRpb24gb2YgXCIuXCJcclxuICAgICAgICBsZXQgd2lkdGhTZXBlcmF0b3I6IG51bWJlciA9IEZvcm1hdFNwZWNpZmljYXRpb25QcmVjaXNpb24uZ2V0UHJlY2lzaW9uU2VwZXJhdG9yKHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uKTtcclxuXHJcbiAgICAgICAgLy9pZiB0aGVyZSBpcyBubyBcIi5cIiB0aGVuIGdldCB0aGUgdHlwZSBwb3NpdGlvblxyXG4gICAgICAgIGlmKCFFZGl0U3RyaW5nSGVscGVyLmluZGV4SXNWYWxpZCh3aWR0aFNlcGVyYXRvcikpIHtcclxuICAgICAgICAgICAgd2lkdGhTZXBlcmF0b3IgPSBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZS5nZXRUeXBlU2VwZXJhdG9yKHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB3aWR0aFNlcGVyYXRvcjtcclxuICAgIH1cclxufVxyXG4iXX0=
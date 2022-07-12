define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FormatSpecificationFlags;
    (function (FormatSpecificationFlags) {
        FormatSpecificationFlags["leftAlignedOutput"] = "-";
        FormatSpecificationFlags["signAlwaysOutput"] = "+";
        FormatSpecificationFlags["signOnlyNegativeOutput"] = " ";
        FormatSpecificationFlags["fillOutputWithNull"] = "0";
        FormatSpecificationFlags["alternativeFormtting"] = "#";
    })(FormatSpecificationFlags = exports.FormatSpecificationFlags || (exports.FormatSpecificationFlags = {}));
    /**
     * This class provides static flag functions
     *
     * @static
     * @class FormatSpecificationFlag
     */
    var FormatSpecificationFlag = /** @class */ (function () {
        /**
         * Constructor set to private FormatSpecificationFlag class should only provide static functions.
         * Creates an instance of FormatSpecificationFlag.
         * @memberof FormatSpecificationFlag
         */
        function FormatSpecificationFlag() {
        }
        ;
        /**
         * Get the included IFormatSpecificationFlag from the passed string.
         * If there is no match IFormatSpecification.flags an empty array
         *
         * @static
         * @param {IFormatSpecification} formatSpecification
         * @param {string} textFormatSpecification
         * @return {*}  {Array<IFormatSpecificationFlag>}
         * @memberof FormatSpecificationFlag
         */
        FormatSpecificationFlag.getFormatSpecificationFlag = function (formatSpecification, textFormatSpecification) {
            var flagSeperator = this.getFlagsSeperator(textFormatSpecification);
            var flagString = textFormatSpecification.substring(0, flagSeperator);
            var flagItem;
            for (var i = 0; i < flagString.length; i++) {
                // get the IFormatSpecificationFlag from the given position
                flagItem = this._flagMap.get(flagString[i]);
                // check if the flag is allready in the array
                if (flagItem !== undefined && !formatSpecification.flags.includes(flagItem)) {
                    formatSpecification.flags.push(flagItem);
                }
            }
            return formatSpecification;
        };
        /**
         * Returns the amount of flag symbols in the formatSpecification string
         *
         * @static
         * @param {string} textFormatSpecification
         * @return {*}  {number}
         * @memberof FormatSpecificationFlag
         */
        FormatSpecificationFlag.getFlagsSeperator = function (textFormatSpecification) {
            var cnt = 0;
            var flagItem;
            // counts up every time a flag is found, if no flag is found break up
            do {
                flagItem = this._flagMap.get(textFormatSpecification[cnt]);
                ++cnt;
            } while (flagItem !== undefined);
            return cnt - 1;
        };
        /**
         * Maps the string flag to the enum flag
         *
         * @private
         * @static
         * @type {Map<string, FormatSpecificationFlags>}
         * @memberof FormatSpecificationFlag
         */
        FormatSpecificationFlag._flagMap = new Map([
            ["-", FormatSpecificationFlags.leftAlignedOutput],
            ["+", FormatSpecificationFlags.signAlwaysOutput],
            [" ", FormatSpecificationFlags.signOnlyNegativeOutput],
            ["0", FormatSpecificationFlags.fillOutputWithNull],
            ["#", FormatSpecificationFlags.alternativeFormtting]
        ]);
        return FormatSpecificationFlag;
    }());
    exports.FormatSpecificationFlag = FormatSpecificationFlag;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U3BlY2lmaWNhdGlvbkZsYWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25GbGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBLElBQVksd0JBTVg7SUFORCxXQUFZLHdCQUF3QjtRQUNoQyxtREFBdUIsQ0FBQTtRQUN2QixrREFBc0IsQ0FBQTtRQUN0Qix3REFBNEIsQ0FBQTtRQUM1QixvREFBd0IsQ0FBQTtRQUN4QixzREFBMEIsQ0FBQTtJQUM5QixDQUFDLEVBTlcsd0JBQXdCLEdBQXhCLGdDQUF3QixLQUF4QixnQ0FBd0IsUUFNbkM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBa0JJOzs7O1dBSUc7UUFDSDtRQUF1QixDQUFDO1FBQUEsQ0FBQztRQUV6Qjs7Ozs7Ozs7O1dBU0c7UUFDVyxrREFBMEIsR0FBeEMsVUFBeUMsbUJBQXlDLEVBQUUsdUJBQStCO1lBRS9HLElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQzVFLElBQUksVUFBVSxHQUFXLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFN0UsSUFBSSxRQUE4QyxDQUFDO1lBRW5ELEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoRCwyREFBMkQ7Z0JBQzNELFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsNkNBQTZDO2dCQUM3QyxJQUFHLFFBQVEsS0FBSyxTQUFTLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN4RSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QzthQUNKO1lBRUQsT0FBTyxtQkFBbUIsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNXLHlDQUFpQixHQUEvQixVQUFnQyx1QkFBK0I7WUFDM0QsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksUUFBOEMsQ0FBQztZQUVuRCxxRUFBcUU7WUFDckUsR0FBRztnQkFDQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsRUFBRSxHQUFHLENBQUM7YUFDVCxRQUFRLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFFakMsT0FBTyxHQUFHLEdBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7UUF2RUQ7Ozs7Ozs7V0FPRztRQUNxQixnQ0FBUSxHQUEyQyxJQUFJLEdBQUcsQ0FBb0M7WUFDbEgsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsaUJBQWlCLENBQUM7WUFDakQsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUM7WUFDaEQsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsc0JBQXNCLENBQUM7WUFDdEQsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsa0JBQWtCLENBQUM7WUFDbEQsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsb0JBQW9CLENBQUM7U0FDdkQsQ0FBQyxDQUFDO1FBMERQLDhCQUFDO0tBQUEsQUExRUQsSUEwRUM7SUExRVksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUZvcm1hdFNwZWNpZmljYXRpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlL2Zvcm1hdFNwZWNpZmljYXRpb25JbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEZvcm1hdFNwZWNpZmljYXRpb25GbGFnc3tcclxuICAgIGxlZnRBbGlnbmVkT3V0cHV0ID0gXCItXCIsXHJcbiAgICBzaWduQWx3YXlzT3V0cHV0ID0gXCIrXCIsXHJcbiAgICBzaWduT25seU5lZ2F0aXZlT3V0cHV0ID0gXCIgXCIsIFxyXG4gICAgZmlsbE91dHB1dFdpdGhOdWxsID0gXCIwXCIsXHJcbiAgICBhbHRlcm5hdGl2ZUZvcm10dGluZyA9IFwiI1wiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIHN0YXRpYyBmbGFnIGZ1bmN0aW9uc1xyXG4gKiBcclxuICogQHN0YXRpY1xyXG4gKiBAY2xhc3MgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3tcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIHRoZSBzdHJpbmcgZmxhZyB0byB0aGUgZW51bSBmbGFnXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCBGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3M+fVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdFNwZWNpZmljYXRpb25GbGFnXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9mbGFnTWFwIDogTWFwPHN0cmluZywgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzPiA9IG5ldyBNYXAgPHN0cmluZywgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzPihbXHJcbiAgICAgICAgW1wiLVwiLCBGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3MubGVmdEFsaWduZWRPdXRwdXRdLFxyXG4gICAgICAgIFtcIitcIiwgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzLnNpZ25BbHdheXNPdXRwdXRdLFxyXG4gICAgICAgIFtcIiBcIiwgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzLnNpZ25Pbmx5TmVnYXRpdmVPdXRwdXRdLFxyXG4gICAgICAgIFtcIjBcIiwgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzLmZpbGxPdXRwdXRXaXRoTnVsbF0sXHJcbiAgICAgICAgW1wiI1wiLCBGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3MuYWx0ZXJuYXRpdmVGb3JtdHRpbmddXHJcbiAgICBdKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yIHNldCB0byBwcml2YXRlIEZvcm1hdFNwZWNpZmljYXRpb25GbGFnIGNsYXNzIHNob3VsZCBvbmx5IHByb3ZpZGUgc3RhdGljIGZ1bmN0aW9ucy5cclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWcuXHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBpbmNsdWRlZCBJRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWcgZnJvbSB0aGUgcGFzc2VkIHN0cmluZy5cclxuICAgICAqIElmIHRoZXJlIGlzIG5vIG1hdGNoIElGb3JtYXRTcGVjaWZpY2F0aW9uLmZsYWdzIGFuIGVtcHR5IGFycmF5IFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUZvcm1hdFNwZWNpZmljYXRpb259IGZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvblxyXG4gICAgICogQHJldHVybiB7Kn0gIHtBcnJheTxJRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWc+fVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdFNwZWNpZmljYXRpb25GbGFnXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Rm9ybWF0U3BlY2lmaWNhdGlvbkZsYWcoZm9ybWF0U3BlY2lmaWNhdGlvbjogSUZvcm1hdFNwZWNpZmljYXRpb24sIHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uOiBzdHJpbmcpIDogSUZvcm1hdFNwZWNpZmljYXRpb24ge1xyXG5cclxuICAgICAgICBsZXQgZmxhZ1NlcGVyYXRvcjogbnVtYmVyID0gdGhpcy5nZXRGbGFnc1NlcGVyYXRvcih0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbik7XHJcbiAgICAgICAgbGV0IGZsYWdTdHJpbmc6IHN0cmluZyA9IHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uLnN1YnN0cmluZygwLCBmbGFnU2VwZXJhdG9yKTtcclxuXHJcbiAgICAgICAgbGV0IGZsYWdJdGVtOiBGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3MgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBmbGFnU3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgSUZvcm1hdFNwZWNpZmljYXRpb25GbGFnIGZyb20gdGhlIGdpdmVuIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGZsYWdJdGVtID0gdGhpcy5fZmxhZ01hcC5nZXQoZmxhZ1N0cmluZ1tpXSk7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBmbGFnIGlzIGFsbHJlYWR5IGluIHRoZSBhcnJheVxyXG4gICAgICAgICAgICBpZihmbGFnSXRlbSAhPT0gdW5kZWZpbmVkICYmICFmb3JtYXRTcGVjaWZpY2F0aW9uLmZsYWdzLmluY2x1ZGVzKGZsYWdJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0U3BlY2lmaWNhdGlvbi5mbGFncy5wdXNoKGZsYWdJdGVtKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmb3JtYXRTcGVjaWZpY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYW1vdW50IG9mIGZsYWcgc3ltYm9scyBpbiB0aGUgZm9ybWF0U3BlY2lmaWNhdGlvbiBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dEZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdFNwZWNpZmljYXRpb25GbGFnXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RmxhZ3NTZXBlcmF0b3IodGV4dEZvcm1hdFNwZWNpZmljYXRpb246IHN0cmluZykgOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjbnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGZsYWdJdGVtOiBGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3MgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY291bnRzIHVwIGV2ZXJ5IHRpbWUgYSBmbGFnIGlzIGZvdW5kLCBpZiBubyBmbGFnIGlzIGZvdW5kIGJyZWFrIHVwXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBmbGFnSXRlbSA9IHRoaXMuX2ZsYWdNYXAuZ2V0KHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uW2NudF0pO1xyXG4gICAgICAgICAgICArK2NudDtcclxuICAgICAgICB9IHdoaWxlIChmbGFnSXRlbSAhPT0gdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNudC0xO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=
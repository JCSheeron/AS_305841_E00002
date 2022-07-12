define(["require", "exports", "../../models/diagnostics/trace/traceConfig/traceConfigValueConverter"], function (require, exports, traceConfigValueConverter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TriggerDescriptionProvider = /** @class */ (function () {
        function TriggerDescriptionProvider() {
        }
        /**
         * Returns an html string with the trigger condition description
         *
         * @static
         * @param {number} triggerConditionId
         * @returns {string}
         * @memberof TriggerDescriptionProvider
         */
        TriggerDescriptionProvider.getHtmlDescription = function (triggerConditionId) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var triggerConditionImagePath = TriggerDescriptionProvider.getTriggerConditionImagePath(triggerConditionId);
            var htmlData = "";
            switch (triggerConditionId) {
                case traceConfigValueConverter_1.ConditionIds.InWindow:
                    htmlData = "<b>IN_WINDOW</b></br></br>The trigger event occurs if the value of the data point meets the following conditions:</br></br>&quot;Value \n\t\t\t    &le; Threshold + Window&quot; and</br>&quot;Value &ge; Threshold - Window&quot;</br></br><img\n                src=\"" + triggerConditionImagePath + "\">";
                    break;
                case traceConfigValueConverter_1.ConditionIds.OutOfWindow:
                    htmlData = "<b>OUT_OF_WINDOW</b></br></br>The trigger event occurs if the value of the data point meets the following conditions:</br></br>&quot;Value \n                &gt; Threshold + Window&quot; or</br>&quot;Value &lt; Threshold - Window&quot;</br></br><img\n                src=\"" + triggerConditionImagePath + "\">";
                    break;
                case traceConfigValueConverter_1.ConditionIds.AboveThreshold:
                    htmlData = "<b>ABOVE_THRESHOLD</b></br></br>The trigger event occurs if the value of the data point meets the following condition:</br></br>&quot;Value \n                &gt; Threshold + Window&quot;</br></br><img src=\"" + triggerConditionImagePath + "\">";
                    break;
                case traceConfigValueConverter_1.ConditionIds.BelowThreshold:
                    htmlData = "<b>BELOW_THRESHOLD</b></br></br>The trigger event occurs if the value of the data point meets the following condition:</br></br>&quot;Value \n                &lt; Threshold - Window&quot;</br></br><img src=\"" + triggerConditionImagePath + "\">";
                    break;
                case traceConfigValueConverter_1.ConditionIds.EnterWindow:
                    htmlData = "<b>ENTER_WINDOW</b></br></br>The trigger event occurs if the value for the data point</br>goes below the upper window \n                limit &quot;Threshold + Window&quot; or</br>goes above the lower window limit &quot;Threshold \n                - Window&quot;</br>(after being outside the window before) and is then within the \n                window. If the value of the data point is already within the window when the \n                trace is enabled, then the trace is not yet started.</br></br><img src=\"" + triggerConditionImagePath + "\">";
                    break;
                case traceConfigValueConverter_1.ConditionIds.LeaveWindow:
                    htmlData = "<b>LEAVE_WINDOW</b></br></br>The trigger event occurs if the value for the data point</br>goes above the upper window \n                limit &quot;Threshold + Window&quot; or</br>goes below the lower window limit &quot;Threshold \n                - Window&quot;</br>(after being inside the window before) and is then outside the \n                window. If the value of the data point is already outside the window when the trace is enabled, then \n                the trace is not yet started.</br></br><img src=\"" + triggerConditionImagePath + "\">";
                    break;
                case traceConfigValueConverter_1.ConditionIds.GoesAboveWindow:
                    htmlData = "<b>GOES_ABOVE_WINDOW</b></br></br>The trigger event occurs if the value of the data point goes goes above the upper window \n                limit &quot;Threshold + Window&quot;.</br>If the value of \n                the trigger parameter is already above the window while the trace is being enabled, then the trace is not yet started.</br></br><img\n                src=\"" + triggerConditionImagePath + "\">";
                    break;
                case traceConfigValueConverter_1.ConditionIds.GoesBelowWindow:
                    htmlData = "<b>GOES_BELOW_WINDOW</b></br></br>The trigger event occurs if the value of the data point goes below the lower window \n                limit &quot;Threshold - Window&quot;.</br>If the value of \n                the trigger parameter is already below the window while the trace is being enabled, then the trace is not yet started.</br></br><img\n                src=\"" + triggerConditionImagePath + "\">";
                    break;
                default:
                    htmlData = "";
                    break;
            }
            return htmlData;
            /* tslint:enable:max-func-body-length */
        };
        /**
         * Returns the trigger condition image path for the given trigger condition id
         *
         * @private
         * @static
         * @param {number} triggerConditionId
         * @returns {string}
         * @memberof TriggerDescriptionProvider
         */
        TriggerDescriptionProvider.getTriggerConditionImagePath = function (triggerConditionId) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var triggerConditionImagePath = "widgets/traceConfigTriggerWidget/resources/images/";
            switch (triggerConditionId) {
                case traceConfigValueConverter_1.ConditionIds.InWindow:
                    triggerConditionImagePath += "IN_WINDOW.svg";
                    break;
                case traceConfigValueConverter_1.ConditionIds.OutOfWindow:
                    triggerConditionImagePath += "OUT_WINDOW.svg";
                    break;
                case traceConfigValueConverter_1.ConditionIds.AboveThreshold:
                    triggerConditionImagePath += "ABOVE_WINDOW.svg";
                    break;
                case traceConfigValueConverter_1.ConditionIds.BelowThreshold:
                    triggerConditionImagePath += "BELOW_WINDOW.svg";
                    break;
                case traceConfigValueConverter_1.ConditionIds.EnterWindow:
                    triggerConditionImagePath += "IN_WINDOW_ENTRY.svg";
                    break;
                case traceConfigValueConverter_1.ConditionIds.LeaveWindow:
                    triggerConditionImagePath += "OUT_WINDOW_ENTRY.svg";
                    break;
                case traceConfigValueConverter_1.ConditionIds.GoesAboveWindow:
                    triggerConditionImagePath += "ABOVE_WINDOW_ENTRY.svg";
                    break;
                case traceConfigValueConverter_1.ConditionIds.GoesBelowWindow:
                    triggerConditionImagePath += "BELOW_WINDOW_ENTRY.svg";
                    break;
                default:
                    triggerConditionImagePath = "";
                    break;
            }
            return triggerConditionImagePath;
            /* tslint:enable:max-func-body-length */
        };
        return TriggerDescriptionProvider;
    }());
    exports.TriggerDescriptionProvider = TriggerDescriptionProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlckRlc2NyaXB0aW9uUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0L3RyaWdnZXJEZXNjcmlwdGlvblByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7UUErR0EsQ0FBQztRQTdHRzs7Ozs7OztXQU9HO1FBQ0ksNkNBQWtCLEdBQXpCLFVBQTBCLGtCQUEwQjtZQUNoRCx5Q0FBeUMsQ0FBQyw4QkFBOEI7WUFDeEUsSUFBSSx5QkFBeUIsR0FBRywwQkFBMEIsQ0FBQyw0QkFBNEIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzVHLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNsQixRQUFRLGtCQUFrQixFQUFDO2dCQUN2QixLQUFLLHdDQUFZLENBQUMsUUFBUTtvQkFDdEIsUUFBUSxHQUFHLDBRQUVMLEdBQUcseUJBQXlCLEdBQUcsS0FBSSxDQUFDO29CQUMxQyxNQUFNO2dCQUNWLEtBQUssd0NBQVksQ0FBQyxXQUFXO29CQUN6QixRQUFRLEdBQUcsbVJBRUwsR0FBRyx5QkFBeUIsR0FBRyxLQUFJLENBQUM7b0JBQzFDLE1BQU07Z0JBQ1YsS0FBSyx3Q0FBWSxDQUFDLGNBQWM7b0JBQzVCLFFBQVEsR0FBRyxrTkFDdUMsR0FBRyx5QkFBeUIsR0FBRyxLQUFJLENBQUM7b0JBQ3RGLE1BQU07Z0JBQ1YsS0FBSyx3Q0FBWSxDQUFDLGNBQWM7b0JBQzVCLFFBQVEsR0FBRyxrTkFDdUMsR0FBRyx5QkFBeUIsR0FBRyxLQUFJLENBQUM7b0JBQ3RGLE1BQU07Z0JBQ1YsS0FBSyx3Q0FBWSxDQUFDLFdBQVc7b0JBQ3pCLFFBQVEsR0FBRyxzZ0JBSThELEdBQUcseUJBQXlCLEdBQUcsS0FBSSxDQUFDO29CQUM3RyxNQUFNO2dCQUNWLEtBQUssd0NBQVksQ0FBQyxXQUFXO29CQUN6QixRQUFRLEdBQUcsdWdCQUl1QyxHQUFHLHlCQUF5QixHQUFHLEtBQUksQ0FBQztvQkFDdEYsTUFBTTtnQkFDVixLQUFLLHdDQUFZLENBQUMsZUFBZTtvQkFDN0IsUUFBUSxHQUFHLHVYQUdMLEdBQUcseUJBQXlCLEdBQUcsS0FBSSxDQUFDO29CQUMxQyxNQUFNO2dCQUNWLEtBQUssd0NBQVksQ0FBQyxlQUFlO29CQUM3QixRQUFRLEdBQUcsa1hBR0wsR0FBRyx5QkFBeUIsR0FBRyxLQUFJLENBQUM7b0JBQzFDLE1BQU07Z0JBQ1Y7b0JBQ0ksUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDZCxNQUFNO2FBQ2I7WUFDRCxPQUFPLFFBQVEsQ0FBQztZQUNoQix3Q0FBd0M7UUFDNUMsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ1ksdURBQTRCLEdBQTNDLFVBQTRDLGtCQUEwQjtZQUNsRSx5Q0FBeUMsQ0FBQyw4QkFBOEI7WUFDeEUsSUFBSSx5QkFBeUIsR0FBRyxvREFBb0QsQ0FBQztZQUNyRixRQUFRLGtCQUFrQixFQUFDO2dCQUN2QixLQUFLLHdDQUFZLENBQUMsUUFBUTtvQkFDdEIseUJBQXlCLElBQUksZUFBZSxDQUFDO29CQUM3QyxNQUFNO2dCQUNWLEtBQUssd0NBQVksQ0FBQyxXQUFXO29CQUN6Qix5QkFBeUIsSUFBSSxnQkFBZ0IsQ0FBQztvQkFDOUMsTUFBTTtnQkFDVixLQUFLLHdDQUFZLENBQUMsY0FBYztvQkFDNUIseUJBQXlCLElBQUksa0JBQWtCLENBQUM7b0JBQ2hELE1BQU07Z0JBQ1YsS0FBSyx3Q0FBWSxDQUFDLGNBQWM7b0JBQzVCLHlCQUF5QixJQUFJLGtCQUFrQixDQUFDO29CQUNoRCxNQUFNO2dCQUNWLEtBQUssd0NBQVksQ0FBQyxXQUFXO29CQUN6Qix5QkFBeUIsSUFBSSxxQkFBcUIsQ0FBQztvQkFDbkQsTUFBTTtnQkFDVixLQUFLLHdDQUFZLENBQUMsV0FBVztvQkFDekIseUJBQXlCLElBQUksc0JBQXNCLENBQUM7b0JBQ3BELE1BQU07Z0JBQ1YsS0FBSyx3Q0FBWSxDQUFDLGVBQWU7b0JBQzdCLHlCQUF5QixJQUFJLHdCQUF3QixDQUFDO29CQUN0RCxNQUFNO2dCQUNWLEtBQUssd0NBQVksQ0FBQyxlQUFlO29CQUM3Qix5QkFBeUIsSUFBSSx3QkFBd0IsQ0FBQztvQkFDdEQsTUFBTTtnQkFDVjtvQkFDSSx5QkFBeUIsR0FBRyxFQUFFLENBQUM7b0JBQy9CLE1BQU07YUFDYjtZQUNELE9BQU8seUJBQXlCLENBQUM7WUFDakMsd0NBQXdDO1FBQzVDLENBQUM7UUFDTCxpQ0FBQztJQUFELENBQUMsQUEvR0QsSUErR0M7SUEvR1ksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZGl0aW9uSWRzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJpZ2dlckRlc2NyaXB0aW9uUHJvdmlkZXJ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBodG1sIHN0cmluZyB3aXRoIHRoZSB0cmlnZ2VyIGNvbmRpdGlvbiBkZXNjcmlwdGlvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0cmlnZ2VyQ29uZGl0aW9uSWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJpZ2dlckRlc2NyaXB0aW9uUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEh0bWxEZXNjcmlwdGlvbih0cmlnZ2VyQ29uZGl0aW9uSWQ6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqLyAvLyBkaXNhYmxlZCBkdWUgdG8gc3dpdGNoIGNhc2VcclxuICAgICAgICBsZXQgdHJpZ2dlckNvbmRpdGlvbkltYWdlUGF0aCA9IFRyaWdnZXJEZXNjcmlwdGlvblByb3ZpZGVyLmdldFRyaWdnZXJDb25kaXRpb25JbWFnZVBhdGgodHJpZ2dlckNvbmRpdGlvbklkKTtcclxuICAgICAgICBsZXQgaHRtbERhdGEgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAodHJpZ2dlckNvbmRpdGlvbklkKXtcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuSW5XaW5kb3c6XHJcbiAgICAgICAgICAgICAgICBodG1sRGF0YSA9IGA8Yj5JTl9XSU5ET1c8L2I+PC9icj48L2JyPlRoZSB0cmlnZ2VyIGV2ZW50IG9jY3VycyBpZiB0aGUgdmFsdWUgb2YgdGhlIGRhdGEgcG9pbnQgbWVldHMgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvYnI+PC9icj4mcXVvdDtWYWx1ZSBcclxuXHRcdFx0ICAgICZsZTsgVGhyZXNob2xkICsgV2luZG93JnF1b3Q7IGFuZDwvYnI+JnF1b3Q7VmFsdWUgJmdlOyBUaHJlc2hvbGQgLSBXaW5kb3cmcXVvdDs8L2JyPjwvYnI+PGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPVwiYCArIHRyaWdnZXJDb25kaXRpb25JbWFnZVBhdGggKyBgXCI+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5PdXRPZldpbmRvdzpcclxuICAgICAgICAgICAgICAgIGh0bWxEYXRhID0gYDxiPk9VVF9PRl9XSU5ET1c8L2I+PC9icj48L2JyPlRoZSB0cmlnZ2VyIGV2ZW50IG9jY3VycyBpZiB0aGUgdmFsdWUgb2YgdGhlIGRhdGEgcG9pbnQgbWVldHMgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvYnI+PC9icj4mcXVvdDtWYWx1ZSBcclxuICAgICAgICAgICAgICAgICZndDsgVGhyZXNob2xkICsgV2luZG93JnF1b3Q7IG9yPC9icj4mcXVvdDtWYWx1ZSAmbHQ7IFRocmVzaG9sZCAtIFdpbmRvdyZxdW90OzwvYnI+PC9icj48aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9XCJgICsgdHJpZ2dlckNvbmRpdGlvbkltYWdlUGF0aCArIGBcIj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkFib3ZlVGhyZXNob2xkOlxyXG4gICAgICAgICAgICAgICAgaHRtbERhdGEgPSBgPGI+QUJPVkVfVEhSRVNIT0xEPC9iPjwvYnI+PC9icj5UaGUgdHJpZ2dlciBldmVudCBvY2N1cnMgaWYgdGhlIHZhbHVlIG9mIHRoZSBkYXRhIHBvaW50IG1lZXRzIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uOjwvYnI+PC9icj4mcXVvdDtWYWx1ZSBcclxuICAgICAgICAgICAgICAgICZndDsgVGhyZXNob2xkICsgV2luZG93JnF1b3Q7PC9icj48L2JyPjxpbWcgc3JjPVwiYCArIHRyaWdnZXJDb25kaXRpb25JbWFnZVBhdGggKyBgXCI+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5CZWxvd1RocmVzaG9sZDpcclxuICAgICAgICAgICAgICAgIGh0bWxEYXRhID0gYDxiPkJFTE9XX1RIUkVTSE9MRDwvYj48L2JyPjwvYnI+VGhlIHRyaWdnZXIgZXZlbnQgb2NjdXJzIGlmIHRoZSB2YWx1ZSBvZiB0aGUgZGF0YSBwb2ludCBtZWV0cyB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbjo8L2JyPjwvYnI+JnF1b3Q7VmFsdWUgXHJcbiAgICAgICAgICAgICAgICAmbHQ7IFRocmVzaG9sZCAtIFdpbmRvdyZxdW90OzwvYnI+PC9icj48aW1nIHNyYz1cImAgKyB0cmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoICsgYFwiPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuRW50ZXJXaW5kb3c6XHJcbiAgICAgICAgICAgICAgICBodG1sRGF0YSA9IGA8Yj5FTlRFUl9XSU5ET1c8L2I+PC9icj48L2JyPlRoZSB0cmlnZ2VyIGV2ZW50IG9jY3VycyBpZiB0aGUgdmFsdWUgZm9yIHRoZSBkYXRhIHBvaW50PC9icj5nb2VzIGJlbG93IHRoZSB1cHBlciB3aW5kb3cgXHJcbiAgICAgICAgICAgICAgICBsaW1pdCAmcXVvdDtUaHJlc2hvbGQgKyBXaW5kb3cmcXVvdDsgb3I8L2JyPmdvZXMgYWJvdmUgdGhlIGxvd2VyIHdpbmRvdyBsaW1pdCAmcXVvdDtUaHJlc2hvbGQgXHJcbiAgICAgICAgICAgICAgICAtIFdpbmRvdyZxdW90OzwvYnI+KGFmdGVyIGJlaW5nIG91dHNpZGUgdGhlIHdpbmRvdyBiZWZvcmUpIGFuZCBpcyB0aGVuIHdpdGhpbiB0aGUgXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuIElmIHRoZSB2YWx1ZSBvZiB0aGUgZGF0YSBwb2ludCBpcyBhbHJlYWR5IHdpdGhpbiB0aGUgd2luZG93IHdoZW4gdGhlIFxyXG4gICAgICAgICAgICAgICAgdHJhY2UgaXMgZW5hYmxlZCwgdGhlbiB0aGUgdHJhY2UgaXMgbm90IHlldCBzdGFydGVkLjwvYnI+PC9icj48aW1nIHNyYz1cImAgKyB0cmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoICsgYFwiPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuTGVhdmVXaW5kb3c6XHJcbiAgICAgICAgICAgICAgICBodG1sRGF0YSA9IGA8Yj5MRUFWRV9XSU5ET1c8L2I+PC9icj48L2JyPlRoZSB0cmlnZ2VyIGV2ZW50IG9jY3VycyBpZiB0aGUgdmFsdWUgZm9yIHRoZSBkYXRhIHBvaW50PC9icj5nb2VzIGFib3ZlIHRoZSB1cHBlciB3aW5kb3cgXHJcbiAgICAgICAgICAgICAgICBsaW1pdCAmcXVvdDtUaHJlc2hvbGQgKyBXaW5kb3cmcXVvdDsgb3I8L2JyPmdvZXMgYmVsb3cgdGhlIGxvd2VyIHdpbmRvdyBsaW1pdCAmcXVvdDtUaHJlc2hvbGQgXHJcbiAgICAgICAgICAgICAgICAtIFdpbmRvdyZxdW90OzwvYnI+KGFmdGVyIGJlaW5nIGluc2lkZSB0aGUgd2luZG93IGJlZm9yZSkgYW5kIGlzIHRoZW4gb3V0c2lkZSB0aGUgXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuIElmIHRoZSB2YWx1ZSBvZiB0aGUgZGF0YSBwb2ludCBpcyBhbHJlYWR5IG91dHNpZGUgdGhlIHdpbmRvdyB3aGVuIHRoZSB0cmFjZSBpcyBlbmFibGVkLCB0aGVuIFxyXG4gICAgICAgICAgICAgICAgdGhlIHRyYWNlIGlzIG5vdCB5ZXQgc3RhcnRlZC48L2JyPjwvYnI+PGltZyBzcmM9XCJgICsgdHJpZ2dlckNvbmRpdGlvbkltYWdlUGF0aCArIGBcIj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkdvZXNBYm92ZVdpbmRvdzpcclxuICAgICAgICAgICAgICAgIGh0bWxEYXRhID0gYDxiPkdPRVNfQUJPVkVfV0lORE9XPC9iPjwvYnI+PC9icj5UaGUgdHJpZ2dlciBldmVudCBvY2N1cnMgaWYgdGhlIHZhbHVlIG9mIHRoZSBkYXRhIHBvaW50IGdvZXMgZ29lcyBhYm92ZSB0aGUgdXBwZXIgd2luZG93IFxyXG4gICAgICAgICAgICAgICAgbGltaXQgJnF1b3Q7VGhyZXNob2xkICsgV2luZG93JnF1b3Q7LjwvYnI+SWYgdGhlIHZhbHVlIG9mIFxyXG4gICAgICAgICAgICAgICAgdGhlIHRyaWdnZXIgcGFyYW1ldGVyIGlzIGFscmVhZHkgYWJvdmUgdGhlIHdpbmRvdyB3aGlsZSB0aGUgdHJhY2UgaXMgYmVpbmcgZW5hYmxlZCwgdGhlbiB0aGUgdHJhY2UgaXMgbm90IHlldCBzdGFydGVkLjwvYnI+PC9icj48aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9XCJgICsgdHJpZ2dlckNvbmRpdGlvbkltYWdlUGF0aCArIGBcIj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkdvZXNCZWxvd1dpbmRvdzpcclxuICAgICAgICAgICAgICAgIGh0bWxEYXRhID0gYDxiPkdPRVNfQkVMT1dfV0lORE9XPC9iPjwvYnI+PC9icj5UaGUgdHJpZ2dlciBldmVudCBvY2N1cnMgaWYgdGhlIHZhbHVlIG9mIHRoZSBkYXRhIHBvaW50IGdvZXMgYmVsb3cgdGhlIGxvd2VyIHdpbmRvdyBcclxuICAgICAgICAgICAgICAgIGxpbWl0ICZxdW90O1RocmVzaG9sZCAtIFdpbmRvdyZxdW90Oy48L2JyPklmIHRoZSB2YWx1ZSBvZiBcclxuICAgICAgICAgICAgICAgIHRoZSB0cmlnZ2VyIHBhcmFtZXRlciBpcyBhbHJlYWR5IGJlbG93IHRoZSB3aW5kb3cgd2hpbGUgdGhlIHRyYWNlIGlzIGJlaW5nIGVuYWJsZWQsIHRoZW4gdGhlIHRyYWNlIGlzIG5vdCB5ZXQgc3RhcnRlZC48L2JyPjwvYnI+PGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPVwiYCArIHRyaWdnZXJDb25kaXRpb25JbWFnZVBhdGggKyBgXCI+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaHRtbERhdGEgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBodG1sRGF0YTtcclxuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmlnZ2VyIGNvbmRpdGlvbiBpbWFnZSBwYXRoIGZvciB0aGUgZ2l2ZW4gdHJpZ2dlciBjb25kaXRpb24gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRyaWdnZXJDb25kaXRpb25JZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmlnZ2VyRGVzY3JpcHRpb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUcmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoKHRyaWdnZXJDb25kaXRpb25JZDogbnVtYmVyKTogc3RyaW5ne1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovIC8vIGRpc2FibGVkIGR1ZSB0byBzd2l0Y2ggY2FzZVxyXG4gICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoID0gXCJ3aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC9yZXNvdXJjZXMvaW1hZ2VzL1wiO1xyXG4gICAgICAgIHN3aXRjaCAodHJpZ2dlckNvbmRpdGlvbklkKXtcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuSW5XaW5kb3c6XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoICs9IFwiSU5fV0lORE9XLnN2Z1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLk91dE9mV2luZG93OlxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNvbmRpdGlvbkltYWdlUGF0aCArPSBcIk9VVF9XSU5ET1cuc3ZnXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuQWJvdmVUaHJlc2hvbGQ6XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoICs9IFwiQUJPVkVfV0lORE9XLnN2Z1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkJlbG93VGhyZXNob2xkOlxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNvbmRpdGlvbkltYWdlUGF0aCArPSBcIkJFTE9XX1dJTkRPVy5zdmdcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5FbnRlcldpbmRvdzpcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJDb25kaXRpb25JbWFnZVBhdGggKz0gXCJJTl9XSU5ET1dfRU5UUlkuc3ZnXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuTGVhdmVXaW5kb3c6XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoICs9IFwiT1VUX1dJTkRPV19FTlRSWS5zdmdcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5Hb2VzQWJvdmVXaW5kb3c6XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoICs9IFwiQUJPVkVfV0lORE9XX0VOVFJZLnN2Z1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkdvZXNCZWxvd1dpbmRvdzpcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJDb25kaXRpb25JbWFnZVBhdGggKz0gXCJCRUxPV19XSU5ET1dfRU5UUlkuc3ZnXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJDb25kaXRpb25JbWFnZVBhdGggPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmlnZ2VyQ29uZGl0aW9uSW1hZ2VQYXRoO1xyXG4gICAgICAgIC8qIHRzbGludDplbmFibGU6bWF4LWZ1bmMtYm9keS1sZW5ndGggKi9cclxuICAgIH1cclxufSJdfQ==
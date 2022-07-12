define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessagesViewModel = /** @class */ (function () {
        function MessagesViewModel() {
        }
        /**
         * splits the content of the message parameters and creates the effective message data model
         *
         * @private
         * @param {MessageParameters} messageParameters
         * @returns {MessagesData}
         * @memberof MessagesViewModel
         */
        MessagesViewModel.convertParametersToMessageData = function (messageParameters) {
            var messageParameterObject = MessagesViewModel.retrieveMessageParameters(messageParameters);
            var messageData = new MessagesData();
            if (messageParameterObject.severity != undefined && Array.isArray(messageParameterObject.severity.value)) {
                for (var i = 0; i < messageParameterObject.severity.value.length; i++) {
                    var description = messageParameterObject.description.value[i];
                    var event_1 = messageParameterObject.eventId.value[i];
                    var severity = this.convertSeverity(messageParameterObject.severity.value[i]);
                    var time = messageParameterObject.timeStamp.value[i];
                    messageData.addMessage(severity, event_1, time, description);
                }
            }
            return messageData;
        };
        /**
         * Convert Severity to severity id if severity name is defined
         *
         * @static
         * @param {string} severity
         * @returns
         * @memberof MessagesViewModel
         */
        MessagesViewModel.convertSeverity = function (severity) {
            if (severity == "Success") {
                return "0";
            }
            if (severity == "Information") {
                return "1";
            }
            if (severity == "Warning") {
                return "2";
            }
            if (severity == "Error") {
                return "3";
            }
            return severity;
        };
        /**
         * retrieves the message parameters from the component parameters
         *
         * @private
         * @param {Array<MappCockpitComponentParameter>} componentParameters
         * @returns {Array<MappCockpitComponentParameter>}
         * @memberof MessagesViewModel
         */
        MessagesViewModel.retrieveMessageParameters = function (componentParameters) {
            var messageParameters = new MessageParameters;
            if (componentParameters[0] == undefined) {
                return messageParameters;
            }
            var messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "intArraySeverity"; })[0];
            if (messageSeverityParameter == undefined) {
                messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArraySeverity"; })[0];
            }
            messageParameters.severity = messageSeverityParameter;
            messageParameters.description = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayDescription"; })[0];
            messageParameters.eventId = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayEventID"; })[0];
            messageParameters.timeStamp = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayTime"; })[0];
            return messageParameters;
        };
        return MessagesViewModel;
    }());
    exports.MessagesViewModel = MessagesViewModel;
    var MessageParameters = /** @class */ (function () {
        function MessageParameters() {
        }
        return MessageParameters;
    }());
    var MessagDataItem = /** @class */ (function () {
        function MessagDataItem(severity, eventId, timeStam, description) {
            this.severity = severity;
            this.eventId = eventId;
            this.timeStamp = timeStam;
            this.description = description;
        }
        return MessagDataItem;
    }());
    exports.MessagDataItem = MessagDataItem;
    var MessagesData = /** @class */ (function () {
        function MessagesData() {
            this._messages = [];
            this._messages = [];
        }
        Object.defineProperty(MessagesData.prototype, "messages", {
            get: function () {
                return this._messages;
            },
            enumerable: true,
            configurable: true
        });
        MessagesData.prototype.addMessage = function (severity, eventId, timeStamp, description) {
            this._messages.push(new MessagDataItem(severity, eventId, timeStamp, description));
        };
        return MessagesData;
    }());
    exports.MessagesData = MessagesData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNWaWV3TW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWVzc2FnZXNXaWRnZXQvbW9kZWwvbWVzc2FnZXNWaWV3TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtRQStFQSxDQUFDO1FBN0VHOzs7Ozs7O1dBT0c7UUFDSSxnREFBOEIsR0FBckMsVUFBc0MsaUJBQWtEO1lBRXBGLElBQUksc0JBQXNCLEdBQUcsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM1RixJQUFJLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBRXJDLElBQUksc0JBQXNCLENBQUMsUUFBUSxJQUFJLFNBQVMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFFdEcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNuRSxJQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxJQUFNLE9BQUssR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEYsSUFBTSxJQUFJLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsT0FBSyxFQUFD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UyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBRUQsaUNBQVUsR0FBVixVQUFXLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVc7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUVwRixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBaEJELElBZ0JDO0lBRTBCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5cclxuY2xhc3MgTWVzc2FnZXNWaWV3TW9kZWwgIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNwbGl0cyB0aGUgY29udGVudCBvZiB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGFuZCBjcmVhdGVzIHRoZSBlZmZlY3RpdmUgbWVzc2FnZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWVzc2FnZVBhcmFtZXRlcnN9IG1lc3NhZ2VQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7TWVzc2FnZXNEYXRhfVxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzVmlld01vZGVsXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb252ZXJ0UGFyYW1ldGVyc1RvTWVzc2FnZURhdGEobWVzc2FnZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOk1lc3NhZ2VzRGF0YSB7XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlUGFyYW1ldGVyT2JqZWN0ID0gTWVzc2FnZXNWaWV3TW9kZWwucmV0cmlldmVNZXNzYWdlUGFyYW1ldGVycyhtZXNzYWdlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VEYXRhID0gbmV3IE1lc3NhZ2VzRGF0YSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChtZXNzYWdlUGFyYW1ldGVyT2JqZWN0LnNldmVyaXR5ICE9IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KG1lc3NhZ2VQYXJhbWV0ZXJPYmplY3Quc2V2ZXJpdHkudmFsdWUpKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlUGFyYW1ldGVyT2JqZWN0LnNldmVyaXR5LnZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IG1lc3NhZ2VQYXJhbWV0ZXJPYmplY3QuZGVzY3JpcHRpb24udmFsdWVbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IG1lc3NhZ2VQYXJhbWV0ZXJPYmplY3QuZXZlbnRJZC52YWx1ZVtpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldmVyaXR5ID0gdGhpcy5jb252ZXJ0U2V2ZXJpdHkobWVzc2FnZVBhcmFtZXRlck9iamVjdC5zZXZlcml0eS52YWx1ZVtpXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gbWVzc2FnZVBhcmFtZXRlck9iamVjdC50aW1lU3RhbXAudmFsdWVbaV07XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlRGF0YS5hZGRNZXNzYWdlKHNldmVyaXR5LGV2ZW50LHRpbWUsZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgU2V2ZXJpdHkgdG8gc2V2ZXJpdHkgaWQgaWYgc2V2ZXJpdHkgbmFtZSBpcyBkZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNldmVyaXR5XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzVmlld01vZGVsXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb252ZXJ0U2V2ZXJpdHkoc2V2ZXJpdHk6IHN0cmluZyl7XHJcbiAgICAgICAgaWYoc2V2ZXJpdHkgPT0gXCJTdWNjZXNzXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNldmVyaXR5ID09IFwiSW5mb3JtYXRpb25cIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjFcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2V2ZXJpdHkgPT0gXCJXYXJuaW5nXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCIyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNldmVyaXR5ID09IFwiRXJyb3JcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNldmVyaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSBtZXNzYWdlIHBhcmFtZXRlcnMgZnJvbSB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNWaWV3TW9kZWxcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlTWVzc2FnZVBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KTogTWVzc2FnZVBhcmFtZXRlcnMge1xyXG5cclxuICAgICAgICBsZXQgbWVzc2FnZVBhcmFtZXRlcnMgPSBuZXcgTWVzc2FnZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgaWYoY29tcG9uZW50UGFyYW1ldGVyc1swXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWVzc2FnZVNldmVyaXR5UGFyYW1ldGVyID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcImludEFycmF5U2V2ZXJpdHlcIjsgfSlbMF07XHJcbiAgICAgICAgaWYobWVzc2FnZVNldmVyaXR5UGFyYW1ldGVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VTZXZlcml0eVBhcmFtZXRlciA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiB7IHJldHVybiBwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PT0gXCJzdHJBcnJheVNldmVyaXR5XCI7IH0pWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZVBhcmFtZXRlcnMuc2V2ZXJpdHkgPSBtZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXI7XHJcbiAgICAgICAgbWVzc2FnZVBhcmFtZXRlcnMuZGVzY3JpcHRpb24gPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlEZXNjcmlwdGlvblwiOyB9KVswXTtcclxuICAgICAgICBtZXNzYWdlUGFyYW1ldGVycy5ldmVudElkID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcInN0ckFycmF5RXZlbnRJRFwiOyB9KVswXTtcclxuICAgICAgICBtZXNzYWdlUGFyYW1ldGVycy50aW1lU3RhbXAgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlUaW1lXCI7IH0pWzBdO1xyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlUGFyYW1ldGVyc3tcclxuICAgIHNldmVyaXR5ITogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI7XHJcbiAgICB0aW1lU3RhbXAhOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIDtcclxuICAgIGV2ZW50SWQhOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIDtcclxuICAgIGRlc2NyaXB0aW9uITpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcjtcclxufVxyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ0RhdGFJdGVte1xyXG4gICAgc2V2ZXJpdHk6IHN0cmluZztcclxuICAgIHRpbWVTdGFtcDpzdHJpbmcgO1xyXG4gICAgZXZlbnRJZDpzdHJpbmcgO1xyXG4gICAgZGVzY3JpcHRpb246c3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNldmVyaXR5LCBldmVudElkLCB0aW1lU3RhbSwgZGVzY3JpcHRpb24pe1xyXG4gICAgICAgIHRoaXMuc2V2ZXJpdHkgPSBzZXZlcml0eTtcclxuICAgICAgICB0aGlzLmV2ZW50SWQgPSBldmVudElkO1xyXG4gICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW07XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZXNEYXRhe1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZXM6QXJyYXk8TWVzc2FnRGF0YUl0ZW0+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlcyA9IFtdO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWVzc2FnZXMoKTpBcnJheTxNZXNzYWdEYXRhSXRlbT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1lc3NhZ2Uoc2V2ZXJpdHksIGV2ZW50SWQsIHRpbWVTdGFtcCwgZGVzY3JpcHRpb24pe1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzLnB1c2gobmV3IE1lc3NhZ0RhdGFJdGVtKHNldmVyaXR5LGV2ZW50SWQsdGltZVN0YW1wLGRlc2NyaXB0aW9uKSk7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNZXNzYWdlc1ZpZXdNb2RlbCxNZXNzYWdlc0RhdGEsTWVzc2FnRGF0YUl0ZW0gfTsiXX0=
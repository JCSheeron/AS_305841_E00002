define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines the ids of some trace configuration data on opc ua server(browsenames)
     *
     * @export
     * @class TraceConfigBrowseNameIds
     */
    var TraceConfigBrowseNameIds = /** @class */ (function () {
        function TraceConfigBrowseNameIds() {
        }
        TraceConfigBrowseNameIds.AcoposSamplingTime = "Timing_AcoposSampleTime";
        TraceConfigBrowseNameIds.PlcTaskClass = "Timing_PlcTaskClass";
        TraceConfigBrowseNameIds.TotalRecordingTime = "Timing_TotalRecordingTime";
        TraceConfigBrowseNameIds.TriggerOffsetTime = "Timing_TriggerOffsetTime";
        TraceConfigBrowseNameIds.PlcSampleTime = "Timing_PlcSampleTime";
        return TraceConfigBrowseNameIds;
    }());
    exports.TraceConfigBrowseNameIds = TraceConfigBrowseNameIds;
    /**
     * Defines the ids of some trace configuration properties which will be used in the export/import trace configuration file format
     *
     * @export
     * @class TraceConfigFilePropertyIds
     */
    var TraceConfigFilePropertyIds = /** @class */ (function () {
        function TraceConfigFilePropertyIds() {
        }
        // Timing Ids
        TraceConfigFilePropertyIds.AcoposSamplingTime = "TrcACOPOSSampleTime";
        TraceConfigFilePropertyIds.PvTaskClass = "TrcPVTaskClass";
        TraceConfigFilePropertyIds.TotalRecordingTime = "TrcTotalRecordingTime";
        TraceConfigFilePropertyIds.TriggerOffsetTime = "TrcTriggerOffsetTime";
        TraceConfigFilePropertyIds.PlcSampleTime = "TrcPLCSampleTime";
        // Start Trigger Ids
        TraceConfigFilePropertyIds.TriggerCondition = "TrcTriggerCondition";
        TraceConfigFilePropertyIds.TriggerDataPoint = "TrcTriggerDataPoint";
        TraceConfigFilePropertyIds.TriggerConditionSelection = "TrcTriggerConditionSelection";
        TraceConfigFilePropertyIds.TriggerThreshold = "TrcThreshold";
        TraceConfigFilePropertyIds.TriggerWindow = "TrcWindow";
        // DataPoint Ids
        TraceConfigFilePropertyIds.DataPoint = "TrcDataPoint";
        return TraceConfigFilePropertyIds;
    }());
    exports.TraceConfigFilePropertyIds = TraceConfigFilePropertyIds;
    /**
     * Defines the trace configuration group ids(e.g. categories like datapoints, starttriggers, ..) in the export/import trace configuration file format
     *
     * @export
     * @class TraceConfigFileGroupIds
     */
    var TraceConfigFileGroupIds = /** @class */ (function () {
        function TraceConfigFileGroupIds() {
        }
        TraceConfigFileGroupIds.DataPointList = "TrcDataPointList";
        TraceConfigFileGroupIds.TimingSettings = "TrcTimingSettings";
        TraceConfigFileGroupIds.TriggerSettings = "TrcTriggerSettings";
        return TraceConfigFileGroupIds;
    }());
    exports.TraceConfigFileGroupIds = TraceConfigFileGroupIds;
    /**
     * Defines the xml types which will be used in the trace configuration export/import format (e.g. group, selector, property, ...)
     *
     * @export
     * @class XmlNodeTypes
     */
    var XmlNodeTypes = /** @class */ (function () {
        function XmlNodeTypes() {
        }
        XmlNodeTypes.Configuration = "Configuration";
        XmlNodeTypes.Element = "Element";
        XmlNodeTypes.Group = "Group";
        XmlNodeTypes.Selector = "Selector";
        XmlNodeTypes.Property = "Property";
        return XmlNodeTypes;
    }());
    exports.XmlNodeTypes = XmlNodeTypes;
    /**
     * Defines the xml attribute ids which will be used in the trace configuration export/import format (e.g. ID, Value, ...)
     *
     * @export
     * @class XmlAttributes
     */
    var XmlAttributes = /** @class */ (function () {
        function XmlAttributes() {
        }
        XmlAttributes.Id = "ID";
        XmlAttributes.Value = "Value";
        return XmlAttributes;
    }());
    exports.XmlAttributes = XmlAttributes;
    /**
     * Defines the trace state ids
     *
     * @export
     * @class TraceStateIds
     */
    var TraceStateIds = /** @class */ (function () {
        function TraceStateIds() {
        }
        TraceStateIds.Disabled = "1";
        TraceStateIds.Config_processing = "10";
        TraceStateIds.Config_applied = "11";
        TraceStateIds.Wait_start_trigger = "20";
        TraceStateIds.Wait_stop_event = "21";
        TraceStateIds.Data_available = "23";
        TraceStateIds.Record_failure = "82";
        return TraceStateIds;
    }());
    exports.TraceStateIds = TraceStateIds;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEZWZpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb25maWcvdHJhY2VDb25maWdEZWZpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQU1BLENBQUM7UUFMbUIsMkNBQWtCLEdBQUcseUJBQXlCLENBQUM7UUFDL0MscUNBQVksR0FBRSxxQkFBcUIsQ0FBQztRQUNwQywyQ0FBa0IsR0FBRywyQkFBMkIsQ0FBQztRQUNqRCwwQ0FBaUIsR0FBRywwQkFBMEIsQ0FBQztRQUMvQyxzQ0FBYSxHQUFHLHNCQUFzQixDQUFDO1FBQzNELCtCQUFDO0tBQUEsQUFORCxJQU1DO0lBTlksNERBQXdCO0lBUXJDOzs7OztPQUtHO0lBQ0g7UUFBQTtRQWlCQSxDQUFDO1FBaEJHLGFBQWE7UUFDRyw2Q0FBa0IsR0FBRyxxQkFBcUIsQ0FBQztRQUMzQyxzQ0FBVyxHQUFFLGdCQUFnQixDQUFDO1FBQzlCLDZDQUFrQixHQUFHLHVCQUF1QixDQUFDO1FBQzdDLDRDQUFpQixHQUFHLHNCQUFzQixDQUFDO1FBQzNDLHdDQUFhLEdBQUcsa0JBQWtCLENBQUM7UUFFbkQsb0JBQW9CO1FBQ0osMkNBQWdCLEdBQUcscUJBQXFCLENBQUM7UUFDekMsMkNBQWdCLEdBQUcscUJBQXFCLENBQUM7UUFDekMsb0RBQXlCLEdBQUcsOEJBQThCLENBQUM7UUFDM0QsMkNBQWdCLEdBQUcsY0FBYyxDQUFDO1FBQ2xDLHdDQUFhLEdBQUcsV0FBVyxDQUFDO1FBRTVDLGdCQUFnQjtRQUNBLG9DQUFTLEdBQUcsY0FBYyxDQUFDO1FBQy9DLGlDQUFDO0tBQUEsQUFqQkQsSUFpQkM7SUFqQlksZ0VBQTBCO0lBb0J2Qzs7Ozs7T0FLRztJQUNIO1FBQUE7UUFJQSxDQUFDO1FBSG1CLHFDQUFhLEdBQUcsa0JBQWtCLENBQUM7UUFDbkMsc0NBQWMsR0FBRyxtQkFBbUIsQ0FBQztRQUNyQyx1Q0FBZSxHQUFHLG9CQUFvQixDQUFDO1FBQzNELDhCQUFDO0tBQUEsQUFKRCxJQUlDO0lBSlksMERBQXVCO0lBTXBDOzs7OztPQUtHO0lBQ0g7UUFBQTtRQU1BLENBQUM7UUFMbUIsMEJBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsb0JBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsa0JBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIscUJBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIscUJBQVEsR0FBRyxVQUFVLENBQUM7UUFDMUMsbUJBQUM7S0FBQSxBQU5ELElBTUM7SUFOWSxvQ0FBWTtJQVF6Qjs7Ozs7T0FLRztJQUNIO1FBQUE7UUFHQSxDQUFDO1FBRm1CLGdCQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ1YsbUJBQUssR0FBRyxPQUFPLENBQUM7UUFDcEMsb0JBQUM7S0FBQSxBQUhELElBR0M7SUFIWSxzQ0FBYTtJQUsxQjs7Ozs7T0FLRztJQUNIO1FBQUE7UUFRQSxDQUFDO1FBUG1CLHNCQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2YsK0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLDRCQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdDQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQiw2QkFBZSxHQUFHLElBQUksQ0FBQztRQUN2Qiw0QkFBYyxHQUFHLElBQUksQ0FBQztRQUN0Qiw0QkFBYyxHQUFHLElBQUksQ0FBQztRQUMxQyxvQkFBQztLQUFBLEFBUkQsSUFRQztJQVJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIERlZmluZXMgdGhlIGlkcyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YSBvbiBvcGMgdWEgc2VydmVyKGJyb3dzZW5hbWVzKVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ0Jyb3dzZU5hbWVJZHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFjZUNvbmZpZ0Jyb3dzZU5hbWVJZHN7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQWNvcG9zU2FtcGxpbmdUaW1lID0gXCJUaW1pbmdfQWNvcG9zU2FtcGxlVGltZVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFBsY1Rhc2tDbGFzcz0gXCJUaW1pbmdfUGxjVGFza0NsYXNzXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVG90YWxSZWNvcmRpbmdUaW1lID0gXCJUaW1pbmdfVG90YWxSZWNvcmRpbmdUaW1lXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVHJpZ2dlck9mZnNldFRpbWUgPSBcIlRpbWluZ19UcmlnZ2VyT2Zmc2V0VGltZVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFBsY1NhbXBsZVRpbWUgPSBcIlRpbWluZ19QbGNTYW1wbGVUaW1lXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBpZHMgb2Ygc29tZSB0cmFjZSBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgd2hpY2ggd2lsbCBiZSB1c2VkIGluIHRoZSBleHBvcnQvaW1wb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb24gZmlsZSBmb3JtYXRcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWdGaWxlUHJvcGVydHlJZHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkc3tcclxuICAgIC8vIFRpbWluZyBJZHNcclxuICAgIHN0YXRpYyByZWFkb25seSBBY29wb3NTYW1wbGluZ1RpbWUgPSBcIlRyY0FDT1BPU1NhbXBsZVRpbWVcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBQdlRhc2tDbGFzcz0gXCJUcmNQVlRhc2tDbGFzc1wiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFRvdGFsUmVjb3JkaW5nVGltZSA9IFwiVHJjVG90YWxSZWNvcmRpbmdUaW1lXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVHJpZ2dlck9mZnNldFRpbWUgPSBcIlRyY1RyaWdnZXJPZmZzZXRUaW1lXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUGxjU2FtcGxlVGltZSA9IFwiVHJjUExDU2FtcGxlVGltZVwiO1xyXG5cclxuICAgIC8vIFN0YXJ0IFRyaWdnZXIgSWRzXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVHJpZ2dlckNvbmRpdGlvbiA9IFwiVHJjVHJpZ2dlckNvbmRpdGlvblwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFRyaWdnZXJEYXRhUG9pbnQgPSBcIlRyY1RyaWdnZXJEYXRhUG9pbnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBUcmlnZ2VyQ29uZGl0aW9uU2VsZWN0aW9uID0gXCJUcmNUcmlnZ2VyQ29uZGl0aW9uU2VsZWN0aW9uXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVHJpZ2dlclRocmVzaG9sZCA9IFwiVHJjVGhyZXNob2xkXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVHJpZ2dlcldpbmRvdyA9IFwiVHJjV2luZG93XCI7XHJcbiAgICBcclxuICAgIC8vIERhdGFQb2ludCBJZHNcclxuICAgIHN0YXRpYyByZWFkb25seSBEYXRhUG9pbnQgPSBcIlRyY0RhdGFQb2ludFwiO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gZ3JvdXAgaWRzKGUuZy4gY2F0ZWdvcmllcyBsaWtlIGRhdGFwb2ludHMsIHN0YXJ0dHJpZ2dlcnMsIC4uKSBpbiB0aGUgZXhwb3J0L2ltcG9ydCB0cmFjZSBjb25maWd1cmF0aW9uIGZpbGUgZm9ybWF0XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnRmlsZUdyb3VwSWRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWdGaWxlR3JvdXBJZHN7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGF0YVBvaW50TGlzdCA9IFwiVHJjRGF0YVBvaW50TGlzdFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFRpbWluZ1NldHRpbmdzID0gXCJUcmNUaW1pbmdTZXR0aW5nc1wiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFRyaWdnZXJTZXR0aW5ncyA9IFwiVHJjVHJpZ2dlclNldHRpbmdzXCI7IFxyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgeG1sIHR5cGVzIHdoaWNoIHdpbGwgYmUgdXNlZCBpbiB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBleHBvcnQvaW1wb3J0IGZvcm1hdCAoZS5nLiBncm91cCwgc2VsZWN0b3IsIHByb3BlcnR5LCAuLi4pXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFhtbE5vZGVUeXBlc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFhtbE5vZGVUeXBlc3tcclxuICAgIHN0YXRpYyByZWFkb25seSBDb25maWd1cmF0aW9uID0gXCJDb25maWd1cmF0aW9uXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRWxlbWVudCA9IFwiRWxlbWVudFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdyb3VwID0gXCJHcm91cFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNlbGVjdG9yID0gXCJTZWxlY3RvclwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFByb3BlcnR5ID0gXCJQcm9wZXJ0eVwiO1xyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgeG1sIGF0dHJpYnV0ZSBpZHMgd2hpY2ggd2lsbCBiZSB1c2VkIGluIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIGV4cG9ydC9pbXBvcnQgZm9ybWF0IChlLmcuIElELCBWYWx1ZSwgLi4uKVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBYbWxBdHRyaWJ1dGVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgWG1sQXR0cmlidXRlc3tcclxuICAgIHN0YXRpYyByZWFkb25seSBJZCA9IFwiSURcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBWYWx1ZSA9IFwiVmFsdWVcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIHRyYWNlIHN0YXRlIGlkc1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUcmFjZVN0YXRlSWRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhY2VTdGF0ZUlkc3tcclxuICAgIHN0YXRpYyByZWFkb25seSBEaXNhYmxlZCA9IFwiMVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IENvbmZpZ19wcm9jZXNzaW5nID0gXCIxMFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IENvbmZpZ19hcHBsaWVkID0gXCIxMVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFdhaXRfc3RhcnRfdHJpZ2dlciA9IFwiMjBcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBXYWl0X3N0b3BfZXZlbnQgPSBcIjIxXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGF0YV9hdmFpbGFibGUgPSBcIjIzXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUmVjb3JkX2ZhaWx1cmUgPSBcIjgyXCI7XHJcbn1cclxuXHJcbiJdfQ==
define(["require", "exports", "../traceDataPoint", "../traceStartTrigger", "./traceConfigValueConverter", "./traceConfigDefines", "./traceConfigImportData"], function (require, exports, traceDataPoint_1, traceStartTrigger_1, traceConfigValueConverter_1, traceConfigDefines_1, traceConfigImportData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigImport = /** @class */ (function () {
        function TraceConfigImport() {
        }
        /**
         * Returns the trace configuration informations for the given trace configuration xml string(import/export format)
         *
         * @static
         * @param {string} fileData
         * @returns {TraceConfigurationImportData}
         * @memberof TraceConfigImport
         */
        TraceConfigImport.getTraceConfigDataFromXml = function (xmlData) {
            var traceConfigurationImportData;
            var traceConfigElement = TraceConfigImport.getTraceConfigElement(xmlData);
            if (traceConfigElement != undefined) {
                traceConfigurationImportData = TraceConfigImport.getTraceConfigurationImportData(traceConfigElement);
            }
            else {
                console.error("No trace configuration found!");
            }
            return traceConfigurationImportData;
        };
        /**
         * Returns the first trace configuration element from the xml trace configuration data, else undefined
         *
         * @private
         * @param {string} xmlData
         * @returns {Element}
         * @memberof TraceConfigImport
         */
        TraceConfigImport.getTraceConfigElement = function (xmlData) {
            var domParser = new DOMParser();
            try {
                var xmlDoc = domParser.parseFromString(xmlData, "text/xml");
                if (xmlDoc.documentElement != null) {
                    if (xmlDoc.documentElement.nodeName == traceConfigDefines_1.XmlNodeTypes.Configuration) {
                        if (xmlDoc.documentElement.children[0].nodeName == traceConfigDefines_1.XmlNodeTypes.Element) {
                            return xmlDoc.documentElement.children[0];
                        }
                    }
                }
            }
            catch (e) {
                console.error("Error while parsing trace configuration xml data!");
                console.error(e);
            }
            return undefined;
        };
        /**
         * Returns the trace configuration informations or undefined from the given trace config element
         *
         * @private
         * @static
         * @param {Element} traceConfigElement
         * @returns {TraceConfigurationImportData}
         * @memberof TraceConfigImport
         */
        TraceConfigImport.getTraceConfigurationImportData = function (traceConfigElement) {
            var importedDatapoints = new Array();
            var importedTimingParameters = {};
            var importedStartTriggers = new Array();
            for (var i = 0; i < traceConfigElement.children.length; i++) {
                var child = traceConfigElement.children[i];
                if (child.nodeName == traceConfigDefines_1.XmlNodeTypes.Group) {
                    if (child.attributes[traceConfigDefines_1.XmlAttributes.Id].value == traceConfigDefines_1.TraceConfigFileGroupIds.DataPointList) {
                        importedDatapoints = TraceConfigImport.getTraceDataPoints(child);
                    }
                    else if (child.attributes[traceConfigDefines_1.XmlAttributes.Id].value == traceConfigDefines_1.TraceConfigFileGroupIds.TimingSettings) {
                        importedTimingParameters = TraceConfigImport.getTimingParameters(child);
                    }
                    else if (child.attributes[traceConfigDefines_1.XmlAttributes.Id].value == traceConfigDefines_1.TraceConfigFileGroupIds.TriggerSettings) {
                        importedStartTriggers = TraceConfigImport.getStartTriggers(child);
                    }
                }
            }
            return new traceConfigImportData_1.TraceConfigurationImportData(importedDatapoints, importedTimingParameters, importedStartTriggers);
        };
        /**
         * Returns a list with tracedatapoint for the given tracedatapoint element
         *
         * @private
         * @static
         * @param {Element} traceDataPointXmlElement
         * @returns {Array<TraceDataPoint>}
         * @memberof TraceConfigImport
         */
        TraceConfigImport.getTraceDataPoints = function (traceDataPointXmlElement) {
            var traceDataPoints = new Array();
            for (var datapointCounter = 0; datapointCounter < traceDataPointXmlElement.children.length; datapointCounter++) {
                var datapointProperty = traceDataPointXmlElement.children[datapointCounter];
                if (datapointProperty.nodeName == traceConfigDefines_1.XmlNodeTypes.Property) {
                    var dataPointValue = datapointProperty.attributes[traceConfigDefines_1.XmlAttributes.Value];
                    if (dataPointValue != undefined) {
                        if (dataPointValue.value != "") { // Add only datapoints with value(datapoint name)
                            traceDataPoints.push(traceDataPoint_1.TraceDataPoint.createSimpleDataPoint(dataPointValue.value));
                        }
                    }
                }
            }
            return traceDataPoints;
        };
        /**
         * Returns a key value pair list with the timing parameters for the given timing element
         *
         * @private
         * @static
         * @param {Element} timingXmlElement
         * @returns {{[key: string]: string}}
         * @memberof TraceConfigImport
         */
        TraceConfigImport.getTimingParameters = function (timingXmlElement) {
            var timingParameters = {};
            for (var timingParamCounter = 0; timingParamCounter < timingXmlElement.children.length; timingParamCounter++) {
                var timingProperty = timingXmlElement.children[timingParamCounter];
                if (timingProperty.nodeName == traceConfigDefines_1.XmlNodeTypes.Property) {
                    timingParameters[timingProperty.attributes[traceConfigDefines_1.XmlAttributes.Id].value] = timingProperty.attributes[traceConfigDefines_1.XmlAttributes.Value].value;
                }
                if (timingProperty.nodeName == traceConfigDefines_1.XmlNodeTypes.Selector) {
                    var selectorId = timingProperty.attributes[traceConfigDefines_1.XmlAttributes.Id].value;
                    var selectorValue = timingProperty.attributes[traceConfigDefines_1.XmlAttributes.Value].value;
                    if (selectorId == traceConfigDefines_1.TraceConfigFilePropertyIds.PvTaskClass) {
                        selectorValue = traceConfigValueConverter_1.TraceConfigValueConverter.getPvTaskClassNumber(selectorValue);
                    }
                    timingParameters[selectorId] = selectorValue;
                    // Add sub properties (e.g. TrcPLCSampleTime)
                    for (var subParamCounter = 0; subParamCounter < timingProperty.children.length; subParamCounter++) {
                        var subTimingProperty = timingProperty.children[subParamCounter];
                        if (subTimingProperty.nodeName == traceConfigDefines_1.XmlNodeTypes.Property) {
                            timingParameters[subTimingProperty.attributes[traceConfigDefines_1.XmlAttributes.Id].value] = subTimingProperty.attributes[traceConfigDefines_1.XmlAttributes.Value].value;
                        }
                    }
                }
            }
            return timingParameters;
        };
        /**
         * Returns a list with tracestarttriggers the given starttrigger element
         *
         * @private
         * @static
         * @param {Element} startTriggerXmlElement
         * @returns {Array<TraceStartTrigger>}
         * @memberof TraceConfigImport
         */
        TraceConfigImport.getStartTriggers = function (startTriggerXmlElement) {
            var startTriggers = new Array();
            for (var triggerCounter = 0; triggerCounter < startTriggerXmlElement.children.length; triggerCounter++) {
                var triggerGroup = startTriggerXmlElement.children[triggerCounter];
                if (triggerGroup.nodeName == traceConfigDefines_1.XmlNodeTypes.Group) {
                    var startTrigger = this.getStartTrigger(triggerGroup);
                    if (startTrigger != undefined) {
                        startTriggers.push(startTrigger);
                    }
                }
            }
            return startTriggers;
        };
        /**
         * Returns one starttrigger or undefined for the given starttrigger group element
         *
         * @private
         * @static
         * @param {Element} triggerGroup
         * @returns {TraceStartTrigger|undefined}
         * @memberof TraceConfigImport
         */
        TraceConfigImport.getStartTrigger = function (triggerGroup) {
            var condition = "";
            var dataPointName = "";
            var threshold = "";
            var window = "";
            for (var i = 0; i < triggerGroup.children.length; i++) {
                var child = triggerGroup.children[i];
                if (child.nodeName == traceConfigDefines_1.XmlNodeTypes.Property) {
                    if (child.attributes[traceConfigDefines_1.XmlAttributes.Id].value == traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerDataPoint) {
                        if (child.attributes[traceConfigDefines_1.XmlAttributes.Value] != undefined) {
                            dataPointName = child.attributes[traceConfigDefines_1.XmlAttributes.Value].value;
                        }
                    }
                }
                else if (child.nodeName == traceConfigDefines_1.XmlNodeTypes.Selector) {
                    if (child.attributes[traceConfigDefines_1.XmlAttributes.Id].value == traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerConditionSelection) {
                        condition = traceConfigValueConverter_1.TraceConfigValueConverter.getConditionId(child.attributes[traceConfigDefines_1.XmlAttributes.Value].value).toString();
                        for (var j = 0; j < child.children.length; j++) {
                            var conditionChild = child.children[j];
                            if (conditionChild.nodeName == traceConfigDefines_1.XmlNodeTypes.Property) {
                                var conditionChildId = conditionChild.attributes[traceConfigDefines_1.XmlAttributes.Id].value;
                                if (conditionChildId == traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerThreshold) {
                                    threshold = conditionChild.attributes[traceConfigDefines_1.XmlAttributes.Value].value;
                                }
                                else if (conditionChildId == traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerWindow) {
                                    window = conditionChild.attributes[traceConfigDefines_1.XmlAttributes.Value].value;
                                }
                            }
                        }
                    }
                }
            }
            // Don't add start triggers without datapointname
            if (dataPointName == "") {
                return undefined;
            }
            return new traceStartTrigger_1.TraceStartTrigger(condition, dataPointName, threshold, window);
        };
        return TraceConfigImport;
    }());
    exports.TraceConfigImport = TraceConfigImport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdJbXBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0ltcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQUFBO1FBb05BLENBQUM7UUFsTkc7Ozs7Ozs7V0FPRztRQUNXLDJDQUF5QixHQUF2QyxVQUF3QyxPQUFlO1lBQ25ELElBQUksNEJBQW9FLENBQUM7WUFDekUsSUFBSSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRSxJQUFHLGtCQUFrQixJQUFJLFNBQVMsRUFBQztnQkFDL0IsNEJBQTRCLEdBQUcsaUJBQWlCLENBQUMsK0JBQStCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUN4RztpQkFDRztnQkFDQSxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUE7YUFDakQ7WUFFRCxPQUFPLDRCQUE0QixDQUFDO1FBQ3hDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ1ksdUNBQXFCLEdBQXBDLFVBQXFDLE9BQWU7WUFDaEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNoQyxJQUFJO2dCQUNBLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM1RCxJQUFHLE1BQU0sQ0FBQyxlQUFlLElBQUksSUFBSSxFQUFDO29CQUM5QixJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxJQUFJLGlDQUFZLENBQUMsYUFBYSxFQUFFO3dCQUMvRCxJQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxpQ0FBWSxDQUFDLE9BQU8sRUFBQzs0QkFDbkUsT0FBTyxNQUFNLENB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QztnQ0FDaEQsSUFBSSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLGtDQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO2dDQUN6RSxJQUFHLGdCQUFnQixJQUFJLCtDQUEwQixDQUFDLGdCQUFnQixFQUFDO29DQUMvRCxTQUFTLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxrQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztpQ0FDcEU7cUNBQ0ksSUFBRyxnQkFBZ0IsSUFBSSwrQ0FBMEIsQ0FBQyxhQUFhLEVBQUM7b0NBQ2pFLE1BQU0sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLGtDQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO2lDQUNqRTs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsaURBQWlEO1lBQ2pELElBQUcsYUFBYSxJQUFJLEVBQUUsRUFBQztnQkFDbkIsT0FBTyxTQUFTLENBQUM7YUFDcEI7WUFDRCxPQUFPLElBQUkscUNBQWlCLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQXBORCxJQW9OQztJQXBOWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFjZURhdGFQb2ludCB9IGZyb20gXCIuLi90cmFjZURhdGFQb2ludFwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXJ0VHJpZ2dlciB9IGZyb20gXCIuLi90cmFjZVN0YXJ0VHJpZ2dlclwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyIH0gZnJvbSBcIi4vdHJhY2VDb25maWdWYWx1ZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBYbWxOb2RlVHlwZXMsIFRyYWNlQ29uZmlnRmlsZUdyb3VwSWRzLCBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkcywgWG1sQXR0cmlidXRlcyB9IGZyb20gXCIuL3RyYWNlQ29uZmlnRGVmaW5lc1wiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ3VyYXRpb25JbXBvcnREYXRhIH0gZnJvbSBcIi4vdHJhY2VDb25maWdJbXBvcnREYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWdJbXBvcnR7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIGluZm9ybWF0aW9ucyBmb3IgdGhlIGdpdmVuIHRyYWNlIGNvbmZpZ3VyYXRpb24geG1sIHN0cmluZyhpbXBvcnQvZXhwb3J0IGZvcm1hdClcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZURhdGFcclxuICAgICAqIEByZXR1cm5zIHtUcmFjZUNvbmZpZ3VyYXRpb25JbXBvcnREYXRhfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnSW1wb3J0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VHJhY2VDb25maWdEYXRhRnJvbVhtbCh4bWxEYXRhOiBzdHJpbmcpOiBUcmFjZUNvbmZpZ3VyYXRpb25JbXBvcnREYXRhfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlndXJhdGlvbkltcG9ydERhdGE6IFRyYWNlQ29uZmlndXJhdGlvbkltcG9ydERhdGF8dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCB0cmFjZUNvbmZpZ0VsZW1lbnQgPSBUcmFjZUNvbmZpZ0ltcG9ydC5nZXRUcmFjZUNvbmZpZ0VsZW1lbnQoeG1sRGF0YSk7XHJcbiAgICAgICAgaWYodHJhY2VDb25maWdFbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRyYWNlQ29uZmlndXJhdGlvbkltcG9ydERhdGEgPSBUcmFjZUNvbmZpZ0ltcG9ydC5nZXRUcmFjZUNvbmZpZ3VyYXRpb25JbXBvcnREYXRhKHRyYWNlQ29uZmlnRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyB0cmFjZSBjb25maWd1cmF0aW9uIGZvdW5kIVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdHJhY2VDb25maWd1cmF0aW9uSW1wb3J0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBmaXJzdCB0cmFjZSBjb25maWd1cmF0aW9uIGVsZW1lbnQgZnJvbSB0aGUgeG1sIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YSwgZWxzZSB1bmRlZmluZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHhtbERhdGFcclxuICAgICAqIEByZXR1cm5zIHtFbGVtZW50fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnSW1wb3J0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFRyYWNlQ29uZmlnRWxlbWVudCh4bWxEYXRhOiBzdHJpbmcpOiBFbGVtZW50fHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgZG9tUGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB4bWxEb2MgPSBkb21QYXJzZXIucGFyc2VGcm9tU3RyaW5nKHhtbERhdGEsIFwidGV4dC94bWxcIik7XHJcbiAgICAgICAgICAgIGlmKHhtbERvYy5kb2N1bWVudEVsZW1lbnQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoeG1sRG9jLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PSBYbWxOb2RlVHlwZXMuQ29uZmlndXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHhtbERvYy5kb2N1bWVudEVsZW1lbnQuY2hpbGRyZW5bMF0ubm9kZU5hbWUgPT0gWG1sTm9kZVR5cGVzLkVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geG1sRG9jLmRvY3VtZW50RWxlbWVudC5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB3aGlsZSBwYXJzaW5nIHRyYWNlIGNvbmZpZ3VyYXRpb24geG1sIGRhdGEhXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIGluZm9ybWF0aW9ucyBvciB1bmRlZmluZWQgZnJvbSB0aGUgZ2l2ZW4gdHJhY2UgY29uZmlnIGVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0cmFjZUNvbmZpZ0VsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtUcmFjZUNvbmZpZ3VyYXRpb25JbXBvcnREYXRhfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnSW1wb3J0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFRyYWNlQ29uZmlndXJhdGlvbkltcG9ydERhdGEodHJhY2VDb25maWdFbGVtZW50OiBFbGVtZW50KTogVHJhY2VDb25maWd1cmF0aW9uSW1wb3J0RGF0YXtcclxuICAgICAgICBsZXQgaW1wb3J0ZWREYXRhcG9pbnRzID0gbmV3IEFycmF5PFRyYWNlRGF0YVBvaW50PigpO1xyXG4gICAgICAgIGxldCBpbXBvcnRlZFRpbWluZ1BhcmFtZXRlcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XHJcbiAgICAgICAgbGV0IGltcG9ydGVkU3RhcnRUcmlnZ2VycyA9IG5ldyBBcnJheTxUcmFjZVN0YXJ0VHJpZ2dlcj4oKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRyYWNlQ29uZmlnRWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRyYWNlQ29uZmlnRWxlbWVudC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYoY2hpbGQubm9kZU5hbWUgPT0gWG1sTm9kZVR5cGVzLkdyb3VwKXtcclxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLmF0dHJpYnV0ZXNbWG1sQXR0cmlidXRlcy5JZF0udmFsdWUgPT0gVHJhY2VDb25maWdGaWxlR3JvdXBJZHMuRGF0YVBvaW50TGlzdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1wb3J0ZWREYXRhcG9pbnRzID0gVHJhY2VDb25maWdJbXBvcnQuZ2V0VHJhY2VEYXRhUG9pbnRzKGNoaWxkKTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGNoaWxkLmF0dHJpYnV0ZXNbWG1sQXR0cmlidXRlcy5JZF0udmFsdWUgPT0gVHJhY2VDb25maWdGaWxlR3JvdXBJZHMuVGltaW5nU2V0dGluZ3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydGVkVGltaW5nUGFyYW1ldGVycyA9IFRyYWNlQ29uZmlnSW1wb3J0LmdldFRpbWluZ1BhcmFtZXRlcnMoY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihjaGlsZC5hdHRyaWJ1dGVzW1htbEF0dHJpYnV0ZXMuSWRdLnZhbHVlID09IFRyYWNlQ29uZmlnRmlsZUdyb3VwSWRzLlRyaWdnZXJTZXR0aW5ncyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1wb3J0ZWRTdGFydFRyaWdnZXJzID0gVHJhY2VDb25maWdJbXBvcnQuZ2V0U3RhcnRUcmlnZ2VycyhjaGlsZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFRyYWNlQ29uZmlndXJhdGlvbkltcG9ydERhdGEoaW1wb3J0ZWREYXRhcG9pbnRzLCBpbXBvcnRlZFRpbWluZ1BhcmFtZXRlcnMsIGltcG9ydGVkU3RhcnRUcmlnZ2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCB3aXRoIHRyYWNlZGF0YXBvaW50IGZvciB0aGUgZ2l2ZW4gdHJhY2VkYXRhcG9pbnQgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRyYWNlRGF0YVBvaW50WG1sRWxlbWVudFxyXG4gICAgICogQHJldHVybnMge0FycmF5PFRyYWNlRGF0YVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0ltcG9ydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUcmFjZURhdGFQb2ludHModHJhY2VEYXRhUG9pbnRYbWxFbGVtZW50OiBFbGVtZW50KTogQXJyYXk8VHJhY2VEYXRhUG9pbnQ+e1xyXG4gICAgICAgIGxldCB0cmFjZURhdGFQb2ludHMgPSBuZXcgQXJyYXk8VHJhY2VEYXRhUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBkYXRhcG9pbnRDb3VudGVyID0gMDsgZGF0YXBvaW50Q291bnRlciA8IHRyYWNlRGF0YVBvaW50WG1sRWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGRhdGFwb2ludENvdW50ZXIrKyl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhcG9pbnRQcm9wZXJ0eSA9IHRyYWNlRGF0YVBvaW50WG1sRWxlbWVudC5jaGlsZHJlbltkYXRhcG9pbnRDb3VudGVyXTtcclxuICAgICAgICAgICAgaWYoZGF0YXBvaW50UHJvcGVydHkubm9kZU5hbWUgPT0gWG1sTm9kZVR5cGVzLlByb3BlcnR5KXtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhUG9pbnRWYWx1ZSA9IGRhdGFwb2ludFByb3BlcnR5LmF0dHJpYnV0ZXNbWG1sQXR0cmlidXRlcy5WYWx1ZV07XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhUG9pbnRWYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFQb2ludFZhbHVlLnZhbHVlICE9IFwiXCIpeyAvLyBBZGQgb25seSBkYXRhcG9pbnRzIHdpdGggdmFsdWUoZGF0YXBvaW50IG5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlRGF0YVBvaW50cy5wdXNoKFRyYWNlRGF0YVBvaW50LmNyZWF0ZVNpbXBsZURhdGFQb2ludChkYXRhUG9pbnRWYWx1ZS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGtleSB2YWx1ZSBwYWlyIGxpc3Qgd2l0aCB0aGUgdGltaW5nIHBhcmFtZXRlcnMgZm9yIHRoZSBnaXZlbiB0aW1pbmcgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRpbWluZ1htbEVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHt7W2tleTogc3RyaW5nXTogc3RyaW5nfX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0ltcG9ydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUaW1pbmdQYXJhbWV0ZXJzKHRpbWluZ1htbEVsZW1lbnQ6IEVsZW1lbnQpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfXtcclxuICAgICAgICB2YXIgdGltaW5nUGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yKGxldCB0aW1pbmdQYXJhbUNvdW50ZXIgPSAwOyB0aW1pbmdQYXJhbUNvdW50ZXIgPCB0aW1pbmdYbWxFbGVtZW50LmNoaWxkcmVuLmxlbmd0aDsgdGltaW5nUGFyYW1Db3VudGVyKyspe1xyXG4gICAgICAgICAgICBsZXQgdGltaW5nUHJvcGVydHkgPSB0aW1pbmdYbWxFbGVtZW50LmNoaWxkcmVuW3RpbWluZ1BhcmFtQ291bnRlcl07XHJcbiAgICAgICAgICAgIGlmKHRpbWluZ1Byb3BlcnR5Lm5vZGVOYW1lID09IFhtbE5vZGVUeXBlcy5Qcm9wZXJ0eSl7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmdQYXJhbWV0ZXJzW3RpbWluZ1Byb3BlcnR5LmF0dHJpYnV0ZXNbWG1sQXR0cmlidXRlcy5JZF0udmFsdWVdID0gdGltaW5nUHJvcGVydHkuYXR0cmlidXRlc1tYbWxBdHRyaWJ1dGVzLlZhbHVlXS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aW1pbmdQcm9wZXJ0eS5ub2RlTmFtZSA9PSBYbWxOb2RlVHlwZXMuU2VsZWN0b3Ipe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdG9ySWQgPSB0aW1pbmdQcm9wZXJ0eS5hdHRyaWJ1dGVzW1htbEF0dHJpYnV0ZXMuSWRdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdG9yVmFsdWUgPSB0aW1pbmdQcm9wZXJ0eS5hdHRyaWJ1dGVzW1htbEF0dHJpYnV0ZXMuVmFsdWVdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0b3JJZCA9PSBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkcy5QdlRhc2tDbGFzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JWYWx1ZSA9IFRyYWNlQ29uZmlnVmFsdWVDb252ZXJ0ZXIuZ2V0UHZUYXNrQ2xhc3NOdW1iZXIoc2VsZWN0b3JWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aW1pbmdQYXJhbWV0ZXJzW3NlbGVjdG9ySWRdID0gc2VsZWN0b3JWYWx1ZTtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBzdWIgcHJvcGVydGllcyAoZS5nLiBUcmNQTENTYW1wbGVUaW1lKVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBzdWJQYXJhbUNvdW50ZXIgPSAwOyBzdWJQYXJhbUNvdW50ZXIgPCB0aW1pbmdQcm9wZXJ0eS5jaGlsZHJlbi5sZW5ndGg7IHN1YlBhcmFtQ291bnRlcisrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ViVGltaW5nUHJvcGVydHkgPSB0aW1pbmdQcm9wZXJ0eS5jaGlsZHJlbltzdWJQYXJhbUNvdW50ZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN1YlRpbWluZ1Byb3BlcnR5Lm5vZGVOYW1lID09IFhtbE5vZGVUeXBlcy5Qcm9wZXJ0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWluZ1BhcmFtZXRlcnNbc3ViVGltaW5nUHJvcGVydHkuYXR0cmlidXRlc1tYbWxBdHRyaWJ1dGVzLklkXS52YWx1ZV0gPSBzdWJUaW1pbmdQcm9wZXJ0eS5hdHRyaWJ1dGVzW1htbEF0dHJpYnV0ZXMuVmFsdWVdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltaW5nUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IHdpdGggdHJhY2VzdGFydHRyaWdnZXJzIHRoZSBnaXZlbiBzdGFydHRyaWdnZXIgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHN0YXJ0VHJpZ2dlclhtbEVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxUcmFjZVN0YXJ0VHJpZ2dlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdJbXBvcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U3RhcnRUcmlnZ2VycyhzdGFydFRyaWdnZXJYbWxFbGVtZW50OiBFbGVtZW50KTogQXJyYXk8VHJhY2VTdGFydFRyaWdnZXI+e1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJzID0gbmV3IEFycmF5PFRyYWNlU3RhcnRUcmlnZ2VyPigpO1xyXG4gICAgICAgIGZvcihsZXQgdHJpZ2dlckNvdW50ZXIgPSAwOyB0cmlnZ2VyQ291bnRlciA8IHN0YXJ0VHJpZ2dlclhtbEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoOyB0cmlnZ2VyQ291bnRlcisrKXtcclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJHcm91cCA9IHN0YXJ0VHJpZ2dlclhtbEVsZW1lbnQuY2hpbGRyZW5bdHJpZ2dlckNvdW50ZXJdO1xyXG4gICAgICAgICAgICBpZih0cmlnZ2VyR3JvdXAubm9kZU5hbWUgPT0gWG1sTm9kZVR5cGVzLkdyb3VwKXtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydFRyaWdnZXIgPSB0aGlzLmdldFN0YXJ0VHJpZ2dlcih0cmlnZ2VyR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhcnRUcmlnZ2VyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUcmlnZ2Vycy5wdXNoKHN0YXJ0VHJpZ2dlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXJ0VHJpZ2dlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIG9uZSBzdGFydHRyaWdnZXIgb3IgdW5kZWZpbmVkIGZvciB0aGUgZ2l2ZW4gc3RhcnR0cmlnZ2VyIGdyb3VwIGVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0cmlnZ2VyR3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtUcmFjZVN0YXJ0VHJpZ2dlcnx1bmRlZmluZWR9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdJbXBvcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U3RhcnRUcmlnZ2VyKHRyaWdnZXJHcm91cDogRWxlbWVudCk6IFRyYWNlU3RhcnRUcmlnZ2VyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgY29uZGl0aW9uOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGxldCBkYXRhUG9pbnROYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGxldCB0aHJlc2hvbGQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHdpbmRvdzogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRyaWdnZXJHcm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRyaWdnZXJHcm91cC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYoY2hpbGQubm9kZU5hbWUgPT0gWG1sTm9kZVR5cGVzLlByb3BlcnR5KXtcclxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLmF0dHJpYnV0ZXNbWG1sQXR0cmlidXRlcy5JZF0udmFsdWUgPT0gVHJhY2VDb25maWdGaWxlUHJvcGVydHlJZHMuVHJpZ2dlckRhdGFQb2ludCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQuYXR0cmlidXRlc1tYbWxBdHRyaWJ1dGVzLlZhbHVlXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnROYW1lID0gY2hpbGQuYXR0cmlidXRlc1tYbWxBdHRyaWJ1dGVzLlZhbHVlXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjaGlsZC5ub2RlTmFtZSA9PSBYbWxOb2RlVHlwZXMuU2VsZWN0b3Ipe1xyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQuYXR0cmlidXRlc1tYbWxBdHRyaWJ1dGVzLklkXS52YWx1ZSA9PSBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkcy5UcmlnZ2VyQ29uZGl0aW9uU2VsZWN0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb24gPSBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyLmdldENvbmRpdGlvbklkKGNoaWxkLmF0dHJpYnV0ZXNbWG1sQXR0cmlidXRlcy5WYWx1ZV0udmFsdWUpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNoaWxkLmNoaWxkcmVuLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbmRpdGlvbkNoaWxkID0gY2hpbGQuY2hpbGRyZW5bal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbmRpdGlvbkNoaWxkLm5vZGVOYW1lID09IFhtbE5vZGVUeXBlcy5Qcm9wZXJ0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29uZGl0aW9uQ2hpbGRJZCA9IGNvbmRpdGlvbkNoaWxkLmF0dHJpYnV0ZXNbWG1sQXR0cmlidXRlcy5JZF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb25kaXRpb25DaGlsZElkID09IFRyYWNlQ29uZmlnRmlsZVByb3BlcnR5SWRzLlRyaWdnZXJUaHJlc2hvbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocmVzaG9sZCA9IGNvbmRpdGlvbkNoaWxkLmF0dHJpYnV0ZXNbWG1sQXR0cmlidXRlcy5WYWx1ZV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGNvbmRpdGlvbkNoaWxkSWQgPT0gVHJhY2VDb25maWdGaWxlUHJvcGVydHlJZHMuVHJpZ2dlcldpbmRvdyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93ID0gY29uZGl0aW9uQ2hpbGQuYXR0cmlidXRlc1tYbWxBdHRyaWJ1dGVzLlZhbHVlXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEb24ndCBhZGQgc3RhcnQgdHJpZ2dlcnMgd2l0aG91dCBkYXRhcG9pbnRuYW1lXHJcbiAgICAgICAgaWYoZGF0YVBvaW50TmFtZSA9PSBcIlwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFjZVN0YXJ0VHJpZ2dlcihjb25kaXRpb24sIGRhdGFQb2ludE5hbWUsIHRocmVzaG9sZCwgd2luZG93KTtcclxuICAgIH1cclxufSJdfQ==
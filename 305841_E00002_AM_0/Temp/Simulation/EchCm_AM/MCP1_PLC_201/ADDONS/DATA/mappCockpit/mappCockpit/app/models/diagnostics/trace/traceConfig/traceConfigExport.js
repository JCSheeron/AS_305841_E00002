define(["require", "exports", "./traceConfigValueConverter", "./traceConfigDefines"], function (require, exports, traceConfigValueConverter_1, traceConfigDefines_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigExport = /** @class */ (function () {
        /**
         * Creates an instance of TraceConfigExport.
         * @memberof TraceConfigExport
         */
        function TraceConfigExport() {
        }
        /**
         * Returns an xml string with the trace configuration data
         *
         * @param {TraceConfigurationData} traceConfigurationData
         * @returns {string}
         * @memberof TraceConfigExport
         */
        TraceConfigExport.prototype.getXmlDataFromTraceConfig = function (traceConfigurationData) {
            // init xml document
            this._xmlDoc = document.implementation.createDocument("", "", null);
            // add body data to xml document
            var configuration = this._xmlDoc.createElement(traceConfigDefines_1.XmlNodeTypes.Configuration);
            this._xmlDoc.appendChild(configuration);
            var element = this.createNode(traceConfigDefines_1.XmlNodeTypes.Element, "NewTraceConfig");
            element.setAttribute("Type", "tracecfg");
            configuration.appendChild(element);
            var property = this.createNode(traceConfigDefines_1.XmlNodeTypes.Property, "mappCockpitTypeID", "TraceCfg");
            element.appendChild(property);
            // add traceconfig data to xml document
            this.addTraceConfigData(element, traceConfigurationData);
            // format xml document data (e.g. add carriage return line feed)
            this._xmlDoc = TraceConfigExport.transformXML(this._xmlDoc);
            // set xml version and encoding
            var xmlString = '<?xml version="1.0" encoding="utf-8"?>\r\n';
            // add xml data from xml document
            var serializer = new XMLSerializer();
            xmlString += serializer.serializeToString(this._xmlDoc);
            return xmlString;
        };
        /**
         * Makes a transformation of the xml document to get carriage return line feeds in serialized xml string
         *
         * @private
         * @static
         * @param {*} xmlDoc
         * @returns {Document}
         * @memberof TraceConfigExport
         */
        TraceConfigExport.transformXML = function (xmlDoc) {
            var xsltDoc = new DOMParser().parseFromString([
                // describes how we want to modify the XML - indent everything
                '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                '  <xsl:strip-space elements="*"/>',
                '  <xsl:template match="para[content-style][not(text())]">',
                '    <xsl:value-of select="normalize-space(.)"/>',
                '  </xsl:template>',
                '  <xsl:template match="node()|@*">',
                '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                '  </xsl:template>',
                '  <xsl:output indent="yes"/>',
                '</xsl:stylesheet>',
            ].join('\n'), 'application/xml');
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);
            return xsltProcessor.transformToDocument(xmlDoc);
        };
        /**
         * Adds all trace configuration data to the element
         *
         * @private
         * @param {HTMLElement} element
         * @param {*} traceConfigurationData
         * @memberof TraceConfigExport
         */
        TraceConfigExport.prototype.addTraceConfigData = function (element, traceConfigurationData) {
            // add datapoints
            var groupDataPoints = this.createNode(traceConfigDefines_1.XmlNodeTypes.Group, traceConfigDefines_1.TraceConfigFileGroupIds.DataPointList);
            this.addDataPoints(groupDataPoints, traceConfigurationData.dataPoints);
            element.appendChild(groupDataPoints);
            // add TimingSettings
            var groupTimings = this.createNode(traceConfigDefines_1.XmlNodeTypes.Group, traceConfigDefines_1.TraceConfigFileGroupIds.TimingSettings);
            this.addTimingSettings(groupTimings, traceConfigurationData.timingParameters);
            element.appendChild(element.appendChild(groupTimings));
            // add TriggerSettings
            var groupTriggers = this.createNode(traceConfigDefines_1.XmlNodeTypes.Group, traceConfigDefines_1.TraceConfigFileGroupIds.TriggerSettings);
            this.addStartTriggers(groupTriggers, traceConfigurationData.startTriggers);
            element.appendChild(groupTriggers);
        };
        /**
         * Adds all datapoints to the groupDataPoints element
         *
         * @private
         * @param {HTMLElement} groupDataPoints
         * @param {TraceDataPoint[]} traceConfigurationDataPoints
         * @memberof TraceConfigExport
         */
        TraceConfigExport.prototype.addDataPoints = function (groupDataPoints, traceConfigurationDataPoints) {
            for (var i = 0; i < traceConfigurationDataPoints.length; i++) {
                var dataPointPropertyId = traceConfigDefines_1.TraceConfigFilePropertyIds.DataPoint + "[" + (i + 1) + "]";
                var datapointProperty = this.createNode(traceConfigDefines_1.XmlNodeTypes.Property, dataPointPropertyId, traceConfigurationDataPoints[i].dataPointName);
                groupDataPoints.appendChild(datapointProperty);
            }
        };
        /**
         * Adds all timing settings to the groupTimings element
         *
         * @private
         * @param {HTMLElement} groupTimings
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @memberof TraceConfigExport
         */
        TraceConfigExport.prototype.addTimingSettings = function (groupTimings, timingParameters) {
            // Add timing settings parameter in the following order
            this.addTimingNode(groupTimings, traceConfigDefines_1.TraceConfigBrowseNameIds.TotalRecordingTime, timingParameters);
            this.addTimingNode(groupTimings, traceConfigDefines_1.TraceConfigBrowseNameIds.TriggerOffsetTime, timingParameters);
            this.addTimingNode(groupTimings, traceConfigDefines_1.TraceConfigBrowseNameIds.PlcTaskClass, timingParameters);
            this.addTimingNode(groupTimings, traceConfigDefines_1.TraceConfigBrowseNameIds.AcoposSamplingTime, timingParameters);
        };
        /**
         * Adds a timing node with the given information to the given group node
         *
         * @private
         * @param {HTMLElement} groupTimings
         * @param {string} parameterBrowseName
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @memberof TraceConfigExport
         */
        TraceConfigExport.prototype.addTimingNode = function (groupTimings, parameterBrowseName, timingParameters) {
            var timingNode = this.createTimingNode(parameterBrowseName, timingParameters);
            if (timingNode != undefined) {
                groupTimings.appendChild(timingNode);
            }
        };
        /**
         * Adds all start triggers to the groupTriggers element
         *
         * @private
         * @param {HTMLElement} groupTriggers
         * @param {TraceStartTrigger[]} startTriggers
         * @memberof TraceConfigExport
         */
        TraceConfigExport.prototype.addStartTriggers = function (groupTriggers, startTriggers) {
            for (var i = 0; i < startTriggers.length; i++) {
                // add start trigger group
                var triggerGroup = this._xmlDoc.createElement(traceConfigDefines_1.XmlNodeTypes.Group);
                triggerGroup.setAttribute(traceConfigDefines_1.XmlAttributes.Id, traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerCondition + "[" + (i + 1) + "]");
                groupTriggers.appendChild(triggerGroup);
                // add start trigger datapointname
                var triggerDataPointNameProperty = this.createNode(traceConfigDefines_1.XmlNodeTypes.Property, traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerDataPoint, startTriggers[i].dataPointName);
                triggerGroup.appendChild(triggerDataPointNameProperty);
                // add start trigger condition selector ...
                var triggerConditionDisplayName = traceConfigValueConverter_1.TraceConfigValueConverter.getConditionDefine(startTriggers[i].condition);
                var triggerConditonSelector = this.createNode(traceConfigDefines_1.XmlNodeTypes.Selector, traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerConditionSelection, triggerConditionDisplayName);
                triggerGroup.appendChild(triggerConditonSelector);
                // ... and add the sub properties to the trigger condition selector (e.g. threshold, window)
                var triggerThresholdProperty = this.createNode(traceConfigDefines_1.XmlNodeTypes.Property, traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerThreshold, startTriggers[i].threshold);
                var triggerWindowProperty = this.createNode(traceConfigDefines_1.XmlNodeTypes.Property, traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerWindow, startTriggers[i].window);
                triggerConditonSelector.appendChild(triggerThresholdProperty);
                triggerConditonSelector.appendChild(triggerWindowProperty);
            }
        };
        /**
         * Creates an xml element with the given type, id and value if defined
         *
         * @private
         * @param {string} type
         * @param {string} id
         * @param {(string|undefined)} value
         * @returns {HTMLElement}
         * @memberof TraceConfigExport
         */
        TraceConfigExport.prototype.createNode = function (type, id, value) {
            if (value === void 0) { value = undefined; }
            // create xml element
            var node = this._xmlDoc.createElement(type);
            // add id attribute
            node.setAttribute(traceConfigDefines_1.XmlAttributes.Id, id);
            // add value attribute if available
            if (value != undefined) {
                node.setAttribute(traceConfigDefines_1.XmlAttributes.Value, value);
            }
            return node;
        };
        /**
         * Creates an xml node with timing parameter information for the given timing parameter browsename
         * Adds some xml sub nodes if needed for a timing parameter
         *
         * @private
         * @param {string} parameterBrowseName
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @returns {HTMLElement}
         * @memberof TraceConfigExport
         */
        TraceConfigExport.prototype.createTimingNode = function (parameterBrowseName, timingParameters) {
            // get timing parameter for the given browsename
            var timingParameter = timingParameters.filter(function (traceParameter) { return traceParameter.browseName === parameterBrowseName; })[0];
            if (timingParameter == undefined) {
                return undefined;
            }
            // get id for import/export format
            var timingParameterId = TraceConfigExport.getTimingParamId(timingParameter.browseName);
            var timingParameterValue = timingParameter.value;
            var timingParameterType = traceConfigDefines_1.XmlNodeTypes.Property;
            var pvTaskClassSubNode = undefined;
            if (timingParameterId == traceConfigDefines_1.TraceConfigFilePropertyIds.PvTaskClass) {
                // create Selector instead of Property for PvTaskClass
                timingParameterType = traceConfigDefines_1.XmlNodeTypes.Selector;
                // convert task class number to export/import format define
                timingParameterValue = traceConfigValueConverter_1.TraceConfigValueConverter.getPvTaskClassDefine(timingParameterValue);
                // create PvTaskClass sub node (e.g. PlcSampleTime)
                pvTaskClassSubNode = this.createTimingNode(traceConfigDefines_1.TraceConfigBrowseNameIds.PlcSampleTime, timingParameters);
            }
            var node = this.createNode(timingParameterType, timingParameterId, timingParameterValue);
            if (pvTaskClassSubNode != undefined) {
                node.appendChild(pvTaskClassSubNode);
            }
            return node;
        };
        /**
         * Returns the id of a timing parameter which will be used in the export/import file format of the trace configuration for the given browsename
         *
         * @static
         * @param {string} browseName
         * @returns {string}
         * @memberof TraceConfigExport
         */
        TraceConfigExport.getTimingParamId = function (browseName) {
            if (browseName == traceConfigDefines_1.TraceConfigBrowseNameIds.AcoposSamplingTime) {
                return traceConfigDefines_1.TraceConfigFilePropertyIds.AcoposSamplingTime;
            }
            if (browseName == traceConfigDefines_1.TraceConfigBrowseNameIds.PlcTaskClass) {
                return traceConfigDefines_1.TraceConfigFilePropertyIds.PvTaskClass;
            }
            if (browseName == traceConfigDefines_1.TraceConfigBrowseNameIds.TotalRecordingTime) {
                return traceConfigDefines_1.TraceConfigFilePropertyIds.TotalRecordingTime;
            }
            if (browseName == traceConfigDefines_1.TraceConfigBrowseNameIds.TriggerOffsetTime) {
                return traceConfigDefines_1.TraceConfigFilePropertyIds.TriggerOffsetTime;
            }
            if (browseName == traceConfigDefines_1.TraceConfigBrowseNameIds.PlcSampleTime) {
                return traceConfigDefines_1.TraceConfigFilePropertyIds.PlcSampleTime;
            }
            return "";
        };
        return TraceConfigExport;
    }());
    exports.TraceConfigExport = TraceConfigExport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdFeHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0V4cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTtRQVVJOzs7V0FHRztRQUNIO1FBRUEsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHFEQUF5QixHQUFoQyxVQUFpQyxzQkFBOEM7WUFDM0Usb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVwRSxnQ0FBZ0M7WUFDaEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsaUNBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGlDQUFZLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDdEUsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDekMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVuQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGlDQUFZLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZGLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFOUIsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztZQUV6RCxnRUFBZ0U7WUFDaEUsSUFB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SUFBSSw2Q0FBd0IsQ0FBQyxhQUFhLEVBQUM7Z0JBQ3BELE9BQU8sK0NBQTBCLENBQUMsYUFBYSxDQUFDO2FBQ25EO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBcFJELElBb1JDO0lBcFJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYWNlRGF0YVBvaW50IH0gZnJvbSBcIi4uL3RyYWNlRGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IFRyYWNlU3RhcnRUcmlnZ2VyIH0gZnJvbSBcIi4uL3RyYWNlU3RhcnRUcmlnZ2VyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEgfSBmcm9tIFwiLi90cmFjZUNvbmZpZ0RhdGFcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVmFsdWVDb252ZXJ0ZXIgfSBmcm9tIFwiLi90cmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnQnJvd3NlTmFtZUlkcywgVHJhY2VDb25maWdGaWxlUHJvcGVydHlJZHMsIFRyYWNlQ29uZmlnRmlsZUdyb3VwSWRzLCBYbWxOb2RlVHlwZXMsIFhtbEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi90cmFjZUNvbmZpZ0RlZmluZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFjZUNvbmZpZ0V4cG9ydHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB4bWwgZG9jdW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRXhwb3J0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3htbERvYztcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRyYWNlQ29uZmlnRXhwb3J0LlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRXhwb3J0XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiB4bWwgc3RyaW5nIHdpdGggdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VHJhY2VDb25maWd1cmF0aW9uRGF0YX0gdHJhY2VDb25maWd1cmF0aW9uRGF0YVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0V4cG9ydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0WG1sRGF0YUZyb21UcmFjZUNvbmZpZyh0cmFjZUNvbmZpZ3VyYXRpb25EYXRhOiBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhKTogc3RyaW5ne1xyXG4gICAgICAgIC8vIGluaXQgeG1sIGRvY3VtZW50XHJcbiAgICAgICAgdGhpcy5feG1sRG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoXCJcIiwgXCJcIiwgbnVsbCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBib2R5IGRhdGEgdG8geG1sIGRvY3VtZW50XHJcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb24gPSB0aGlzLl94bWxEb2MuY3JlYXRlRWxlbWVudChYbWxOb2RlVHlwZXMuQ29uZmlndXJhdGlvbik7XHJcbiAgICAgICAgdGhpcy5feG1sRG9jLmFwcGVuZENoaWxkKGNvbmZpZ3VyYXRpb24pO1xyXG5cclxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuY3JlYXRlTm9kZShYbWxOb2RlVHlwZXMuRWxlbWVudCwgXCJOZXdUcmFjZUNvbmZpZ1wiKTtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcIlR5cGVcIiwgXCJ0cmFjZWNmZ1wiKTtcclxuICAgICAgICBjb25maWd1cmF0aW9uLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuY3JlYXRlTm9kZShYbWxOb2RlVHlwZXMuUHJvcGVydHksIFwibWFwcENvY2twaXRUeXBlSURcIiwgXCJUcmFjZUNmZ1wiKTsgICAgICAgIFxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvcGVydHkpO1xyXG5cclxuICAgICAgICAvLyBhZGQgdHJhY2Vjb25maWcgZGF0YSB0byB4bWwgZG9jdW1lbnRcclxuICAgICAgICB0aGlzLmFkZFRyYWNlQ29uZmlnRGF0YShlbGVtZW50LCB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBmb3JtYXQgeG1sIGRvY3VtZW50IGRhdGEgKGUuZy4gYWRkIGNhcnJpYWdlIHJldHVybiBsaW5lIGZlZWQpXHJcbiAgICAgICAgdGhpcy5feG1sRG9jID0gVHJhY2VDb25maWdFeHBvcnQudHJhbnNmb3JtWE1MKHRoaXMuX3htbERvYyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IHhtbCB2ZXJzaW9uIGFuZCBlbmNvZGluZ1xyXG4gICAgICAgIGxldCB4bWxTdHJpbmcgPSAnPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwidXRmLThcIj8+XFxyXFxuJztcclxuICAgICAgICBcclxuICAgICAgICAvLyBhZGQgeG1sIGRhdGEgZnJvbSB4bWwgZG9jdW1lbnRcclxuICAgICAgICBsZXQgc2VyaWFsaXplciA9IG5ldyBYTUxTZXJpYWxpemVyKCk7XHJcbiAgICAgICAgeG1sU3RyaW5nICs9IHNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcodGhpcy5feG1sRG9jKTtcclxuICAgICAgICByZXR1cm4geG1sU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgeG1sIGRvY3VtZW50IHRvIGdldCBjYXJyaWFnZSByZXR1cm4gbGluZSBmZWVkcyBpbiBzZXJpYWxpemVkIHhtbCBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSB4bWxEb2NcclxuICAgICAqIEByZXR1cm5zIHtEb2N1bWVudH1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0V4cG9ydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0cmFuc2Zvcm1YTUwoeG1sRG9jKTogRG9jdW1lbnR7XHJcbiAgICAgICAgdmFyIHhzbHREb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKFtcclxuICAgICAgICAgICAgLy8gZGVzY3JpYmVzIGhvdyB3ZSB3YW50IHRvIG1vZGlmeSB0aGUgWE1MIC0gaW5kZW50IGV2ZXJ5dGhpbmdcclxuICAgICAgICAgICAgJzx4c2w6c3R5bGVzaGVldCB4bWxuczp4c2w9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L1hTTC9UcmFuc2Zvcm1cIj4nLFxyXG4gICAgICAgICAgICAnICA8eHNsOnN0cmlwLXNwYWNlIGVsZW1lbnRzPVwiKlwiLz4nLFxyXG4gICAgICAgICAgICAnICA8eHNsOnRlbXBsYXRlIG1hdGNoPVwicGFyYVtjb250ZW50LXN0eWxlXVtub3QodGV4dCgpKV1cIj4nLCAvLyBjaGFuZ2UgdG8ganVzdCB0ZXh0KCkgdG8gc3RyaXAgc3BhY2UgaW4gdGV4dCBub2Rlc1xyXG4gICAgICAgICAgICAnICAgIDx4c2w6dmFsdWUtb2Ygc2VsZWN0PVwibm9ybWFsaXplLXNwYWNlKC4pXCIvPicsXHJcbiAgICAgICAgICAgICcgIDwveHNsOnRlbXBsYXRlPicsXHJcbiAgICAgICAgICAgICcgIDx4c2w6dGVtcGxhdGUgbWF0Y2g9XCJub2RlKCl8QCpcIj4nLFxyXG4gICAgICAgICAgICAnICAgIDx4c2w6Y29weT48eHNsOmFwcGx5LXRlbXBsYXRlcyBzZWxlY3Q9XCJub2RlKCl8QCpcIi8+PC94c2w6Y29weT4nLFxyXG4gICAgICAgICAgICAnICA8L3hzbDp0ZW1wbGF0ZT4nLFxyXG4gICAgICAgICAgICAnICA8eHNsOm91dHB1dCBpbmRlbnQ9XCJ5ZXNcIi8+JyxcclxuICAgICAgICAgICAgJzwveHNsOnN0eWxlc2hlZXQ+JyxcclxuICAgICAgICBdLmpvaW4oJ1xcbicpLCAnYXBwbGljYXRpb24veG1sJyk7XHJcbiAgICBcclxuICAgICAgICB2YXIgeHNsdFByb2Nlc3NvciA9IG5ldyBYU0xUUHJvY2Vzc29yKCk7ICAgIFxyXG4gICAgICAgIHhzbHRQcm9jZXNzb3IuaW1wb3J0U3R5bGVzaGVldCh4c2x0RG9jKTtcclxuICAgICAgICByZXR1cm4geHNsdFByb2Nlc3Nvci50cmFuc2Zvcm1Ub0RvY3VtZW50KHhtbERvYyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFsbCB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGEgdG8gdGhlIGVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdFeHBvcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUcmFjZUNvbmZpZ0RhdGEoZWxlbWVudDogSFRNTEVsZW1lbnQsIHRyYWNlQ29uZmlndXJhdGlvbkRhdGE6IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEpe1xyXG4gICAgICAgIC8vIGFkZCBkYXRhcG9pbnRzXHJcbiAgICAgICAgbGV0IGdyb3VwRGF0YVBvaW50cyA9IHRoaXMuY3JlYXRlTm9kZShYbWxOb2RlVHlwZXMuR3JvdXAsIFRyYWNlQ29uZmlnRmlsZUdyb3VwSWRzLkRhdGFQb2ludExpc3QpO1xyXG4gICAgICAgIHRoaXMuYWRkRGF0YVBvaW50cyhncm91cERhdGFQb2ludHMsIHRyYWNlQ29uZmlndXJhdGlvbkRhdGEuZGF0YVBvaW50cyk7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChncm91cERhdGFQb2ludHMpO1xyXG5cclxuICAgICAgICAvLyBhZGQgVGltaW5nU2V0dGluZ3NcclxuICAgICAgICBsZXQgZ3JvdXBUaW1pbmdzID0gdGhpcy5jcmVhdGVOb2RlKFhtbE5vZGVUeXBlcy5Hcm91cCwgVHJhY2VDb25maWdGaWxlR3JvdXBJZHMuVGltaW5nU2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMuYWRkVGltaW5nU2V0dGluZ3MoZ3JvdXBUaW1pbmdzLCB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhLnRpbWluZ1BhcmFtZXRlcnMpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudC5hcHBlbmRDaGlsZChncm91cFRpbWluZ3MpKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIFRyaWdnZXJTZXR0aW5nc1xyXG4gICAgICAgIGxldCBncm91cFRyaWdnZXJzID0gdGhpcy5jcmVhdGVOb2RlKFhtbE5vZGVUeXBlcy5Hcm91cCwgVHJhY2VDb25maWdGaWxlR3JvdXBJZHMuVHJpZ2dlclNldHRpbmdzKTsgXHJcbiAgICAgICAgdGhpcy5hZGRTdGFydFRyaWdnZXJzKGdyb3VwVHJpZ2dlcnMsIHRyYWNlQ29uZmlndXJhdGlvbkRhdGEuc3RhcnRUcmlnZ2Vycyk7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChncm91cFRyaWdnZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYWxsIGRhdGFwb2ludHMgdG8gdGhlIGdyb3VwRGF0YVBvaW50cyBlbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGdyb3VwRGF0YVBvaW50c1xyXG4gICAgICogQHBhcmFtIHtUcmFjZURhdGFQb2ludFtdfSB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdFeHBvcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGREYXRhUG9pbnRzKGdyb3VwRGF0YVBvaW50czogSFRNTEVsZW1lbnQsIHRyYWNlQ29uZmlndXJhdGlvbkRhdGFQb2ludHM6IFRyYWNlRGF0YVBvaW50W10pe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhUG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludFByb3BlcnR5SWQgPSBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkcy5EYXRhUG9pbnQgKyBcIltcIiArIChpKzEpICsgXCJdXCI7XHJcbiAgICAgICAgICAgIGxldCBkYXRhcG9pbnRQcm9wZXJ0eSA9IHRoaXMuY3JlYXRlTm9kZShYbWxOb2RlVHlwZXMuUHJvcGVydHksIGRhdGFQb2ludFByb3BlcnR5SWQsIHRyYWNlQ29uZmlndXJhdGlvbkRhdGFQb2ludHNbaV0uZGF0YVBvaW50TmFtZSk7XHJcbiAgICAgICAgICAgIGdyb3VwRGF0YVBvaW50cy5hcHBlbmRDaGlsZChkYXRhcG9pbnRQcm9wZXJ0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbGwgdGltaW5nIHNldHRpbmdzIHRvIHRoZSBncm91cFRpbWluZ3MgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBncm91cFRpbWluZ3NcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdGltaW5nUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRXhwb3J0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVGltaW5nU2V0dGluZ3MoZ3JvdXBUaW1pbmdzOiBIVE1MRWxlbWVudCwgdGltaW5nUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSl7XHJcbiAgICAgICAgLy8gQWRkIHRpbWluZyBzZXR0aW5ncyBwYXJhbWV0ZXIgaW4gdGhlIGZvbGxvd2luZyBvcmRlclxyXG4gICAgICAgIHRoaXMuYWRkVGltaW5nTm9kZShncm91cFRpbWluZ3MsIFRyYWNlQ29uZmlnQnJvd3NlTmFtZUlkcy5Ub3RhbFJlY29yZGluZ1RpbWUsIHRpbWluZ1BhcmFtZXRlcnMpO1xyXG4gICAgICAgIHRoaXMuYWRkVGltaW5nTm9kZShncm91cFRpbWluZ3MsIFRyYWNlQ29uZmlnQnJvd3NlTmFtZUlkcy5UcmlnZ2VyT2Zmc2V0VGltZSwgdGltaW5nUGFyYW1ldGVycyk7XHJcbiAgICAgICAgdGhpcy5hZGRUaW1pbmdOb2RlKGdyb3VwVGltaW5ncywgVHJhY2VDb25maWdCcm93c2VOYW1lSWRzLlBsY1Rhc2tDbGFzcywgdGltaW5nUGFyYW1ldGVycyk7XHJcbiAgICAgICAgdGhpcy5hZGRUaW1pbmdOb2RlKGdyb3VwVGltaW5ncywgVHJhY2VDb25maWdCcm93c2VOYW1lSWRzLkFjb3Bvc1NhbXBsaW5nVGltZSwgdGltaW5nUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgdGltaW5nIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gaW5mb3JtYXRpb24gdG8gdGhlIGdpdmVuIGdyb3VwIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZ3JvdXBUaW1pbmdzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1ldGVyQnJvd3NlTmFtZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0aW1pbmdQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdFeHBvcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUaW1pbmdOb2RlKGdyb3VwVGltaW5nczogSFRNTEVsZW1lbnQsIHBhcmFtZXRlckJyb3dzZU5hbWU6IHN0cmluZywgdGltaW5nUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSl7XHJcbiAgICAgICAgbGV0IHRpbWluZ05vZGUgPSB0aGlzLmNyZWF0ZVRpbWluZ05vZGUocGFyYW1ldGVyQnJvd3NlTmFtZSwgdGltaW5nUGFyYW1ldGVycyk7XHJcbiAgICAgICAgaWYodGltaW5nTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBncm91cFRpbWluZ3MuYXBwZW5kQ2hpbGQodGltaW5nTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbGwgc3RhcnQgdHJpZ2dlcnMgdG8gdGhlIGdyb3VwVHJpZ2dlcnMgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBncm91cFRyaWdnZXJzXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlU3RhcnRUcmlnZ2VyW119IHN0YXJ0VHJpZ2dlcnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0V4cG9ydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFN0YXJ0VHJpZ2dlcnMoZ3JvdXBUcmlnZ2VyczogSFRNTEVsZW1lbnQsIHN0YXJ0VHJpZ2dlcnM6IFRyYWNlU3RhcnRUcmlnZ2VyW10pe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdGFydFRyaWdnZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgLy8gYWRkIHN0YXJ0IHRyaWdnZXIgZ3JvdXBcclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJHcm91cCA9IHRoaXMuX3htbERvYy5jcmVhdGVFbGVtZW50KFhtbE5vZGVUeXBlcy5Hcm91cCk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJHcm91cC5zZXRBdHRyaWJ1dGUoWG1sQXR0cmlidXRlcy5JZCwgVHJhY2VDb25maWdGaWxlUHJvcGVydHlJZHMuVHJpZ2dlckNvbmRpdGlvbiArXCJbXCIgKyAoaSsxKSArIFwiXVwiKTtcclxuICAgICAgICAgICAgZ3JvdXBUcmlnZ2Vycy5hcHBlbmRDaGlsZCh0cmlnZ2VyR3JvdXApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYWRkIHN0YXJ0IHRyaWdnZXIgZGF0YXBvaW50bmFtZVxyXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckRhdGFQb2ludE5hbWVQcm9wZXJ0eSA9IHRoaXMuY3JlYXRlTm9kZShYbWxOb2RlVHlwZXMuUHJvcGVydHksIFRyYWNlQ29uZmlnRmlsZVByb3BlcnR5SWRzLlRyaWdnZXJEYXRhUG9pbnQsIHN0YXJ0VHJpZ2dlcnNbaV0uZGF0YVBvaW50TmFtZSk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJHcm91cC5hcHBlbmRDaGlsZCh0cmlnZ2VyRGF0YVBvaW50TmFtZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCBzdGFydCB0cmlnZ2VyIGNvbmRpdGlvbiBzZWxlY3RvciAuLi5cclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25EaXNwbGF5TmFtZSA9IFRyYWNlQ29uZmlnVmFsdWVDb252ZXJ0ZXIuZ2V0Q29uZGl0aW9uRGVmaW5lKHN0YXJ0VHJpZ2dlcnNbaV0uY29uZGl0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRvblNlbGVjdG9yID0gdGhpcy5jcmVhdGVOb2RlKFhtbE5vZGVUeXBlcy5TZWxlY3RvciwgVHJhY2VDb25maWdGaWxlUHJvcGVydHlJZHMuVHJpZ2dlckNvbmRpdGlvblNlbGVjdGlvbiwgdHJpZ2dlckNvbmRpdGlvbkRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgdHJpZ2dlckdyb3VwLmFwcGVuZENoaWxkKHRyaWdnZXJDb25kaXRvblNlbGVjdG9yKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIC4uLiBhbmQgYWRkIHRoZSBzdWIgcHJvcGVydGllcyB0byB0aGUgdHJpZ2dlciBjb25kaXRpb24gc2VsZWN0b3IgKGUuZy4gdGhyZXNob2xkLCB3aW5kb3cpXHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyVGhyZXNob2xkUHJvcGVydHkgPSB0aGlzLmNyZWF0ZU5vZGUoWG1sTm9kZVR5cGVzLlByb3BlcnR5LCBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkcy5UcmlnZ2VyVGhyZXNob2xkLCBzdGFydFRyaWdnZXJzW2ldLnRocmVzaG9sZCk7XHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyV2luZG93UHJvcGVydHkgPSB0aGlzLmNyZWF0ZU5vZGUoWG1sTm9kZVR5cGVzLlByb3BlcnR5LCBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkcy5UcmlnZ2VyV2luZG93LCBzdGFydFRyaWdnZXJzW2ldLndpbmRvdyk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJDb25kaXRvblNlbGVjdG9yLmFwcGVuZENoaWxkKHRyaWdnZXJUaHJlc2hvbGRQcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJDb25kaXRvblNlbGVjdG9yLmFwcGVuZENoaWxkKHRyaWdnZXJXaW5kb3dQcm9wZXJ0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiB4bWwgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiB0eXBlLCBpZCBhbmQgdmFsdWUgaWYgZGVmaW5lZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8dW5kZWZpbmVkKX0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0V4cG9ydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZU5vZGUodHlwZTogc3RyaW5nLCBpZDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IEhUTUxFbGVtZW50e1xyXG4gICAgICAgIC8vIGNyZWF0ZSB4bWwgZWxlbWVudFxyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5feG1sRG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gYWRkIGlkIGF0dHJpYnV0ZVxyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFhtbEF0dHJpYnV0ZXMuSWQsIGlkKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBhZGQgdmFsdWUgYXR0cmlidXRlIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgIGlmKHZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFhtbEF0dHJpYnV0ZXMuVmFsdWUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIHhtbCBub2RlIHdpdGggdGltaW5nIHBhcmFtZXRlciBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIHRpbWluZyBwYXJhbWV0ZXIgYnJvd3NlbmFtZVxyXG4gICAgICogQWRkcyBzb21lIHhtbCBzdWIgbm9kZXMgaWYgbmVlZGVkIGZvciBhIHRpbWluZyBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlckJyb3dzZU5hbWVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdGltaW5nUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRXhwb3J0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVGltaW5nTm9kZShwYXJhbWV0ZXJCcm93c2VOYW1lOiBzdHJpbmcsIHRpbWluZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBIVE1MRWxlbWVudHx1bmRlZmluZWR7XHJcbiAgICAgICAgLy8gZ2V0IHRpbWluZyBwYXJhbWV0ZXIgZm9yIHRoZSBnaXZlbiBicm93c2VuYW1lXHJcbiAgICAgICAgbGV0IHRpbWluZ1BhcmFtZXRlciA9IHRpbWluZ1BhcmFtZXRlcnMuZmlsdGVyKCh0cmFjZVBhcmFtZXRlcikgPT4geyByZXR1cm4gdHJhY2VQYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PT0gcGFyYW1ldGVyQnJvd3NlTmFtZSB9KVswXTtcclxuICAgICAgICBpZih0aW1pbmdQYXJhbWV0ZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBpZCBmb3IgaW1wb3J0L2V4cG9ydCBmb3JtYXRcclxuICAgICAgICBsZXQgdGltaW5nUGFyYW1ldGVySWQgPSBUcmFjZUNvbmZpZ0V4cG9ydC5nZXRUaW1pbmdQYXJhbUlkKHRpbWluZ1BhcmFtZXRlci5icm93c2VOYW1lKTtcclxuICAgICAgICBsZXQgdGltaW5nUGFyYW1ldGVyVmFsdWUgPSB0aW1pbmdQYXJhbWV0ZXIudmFsdWU7XHJcbiAgICAgICAgbGV0IHRpbWluZ1BhcmFtZXRlclR5cGUgPSBYbWxOb2RlVHlwZXMuUHJvcGVydHk7XHJcbiAgICAgICAgbGV0IHB2VGFza0NsYXNzU3ViTm9kZTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKHRpbWluZ1BhcmFtZXRlcklkID09IFRyYWNlQ29uZmlnRmlsZVByb3BlcnR5SWRzLlB2VGFza0NsYXNzKXtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIFNlbGVjdG9yIGluc3RlYWQgb2YgUHJvcGVydHkgZm9yIFB2VGFza0NsYXNzXHJcbiAgICAgICAgICAgIHRpbWluZ1BhcmFtZXRlclR5cGUgPSBYbWxOb2RlVHlwZXMuU2VsZWN0b3I7XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdGFzayBjbGFzcyBudW1iZXIgdG8gZXhwb3J0L2ltcG9ydCBmb3JtYXQgZGVmaW5lXHJcbiAgICAgICAgICAgIHRpbWluZ1BhcmFtZXRlclZhbHVlID0gVHJhY2VDb25maWdWYWx1ZUNvbnZlcnRlci5nZXRQdlRhc2tDbGFzc0RlZmluZSh0aW1pbmdQYXJhbWV0ZXJWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBQdlRhc2tDbGFzcyBzdWIgbm9kZSAoZS5nLiBQbGNTYW1wbGVUaW1lKVxyXG4gICAgICAgICAgICBwdlRhc2tDbGFzc1N1Yk5vZGUgPSB0aGlzLmNyZWF0ZVRpbWluZ05vZGUoVHJhY2VDb25maWdCcm93c2VOYW1lSWRzLlBsY1NhbXBsZVRpbWUsIHRpbWluZ1BhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSh0aW1pbmdQYXJhbWV0ZXJUeXBlLCB0aW1pbmdQYXJhbWV0ZXJJZCwgdGltaW5nUGFyYW1ldGVyVmFsdWUpO1xyXG4gICAgICAgIGlmKHB2VGFza0NsYXNzU3ViTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHB2VGFza0NsYXNzU3ViTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGlkIG9mIGEgdGltaW5nIHBhcmFtZXRlciB3aGljaCB3aWxsIGJlIHVzZWQgaW4gdGhlIGV4cG9ydC9pbXBvcnQgZmlsZSBmb3JtYXQgb2YgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBnaXZlbiBicm93c2VuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJyb3dzZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdFeHBvcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUaW1pbmdQYXJhbUlkKGJyb3dzZU5hbWU6IHN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIGlmKGJyb3dzZU5hbWUgPT0gVHJhY2VDb25maWdCcm93c2VOYW1lSWRzLkFjb3Bvc1NhbXBsaW5nVGltZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkcy5BY29wb3NTYW1wbGluZ1RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGJyb3dzZU5hbWUgPT0gVHJhY2VDb25maWdCcm93c2VOYW1lSWRzLlBsY1Rhc2tDbGFzcyl7XHJcbiAgICAgICAgICAgIHJldHVybiBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkcy5QdlRhc2tDbGFzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYnJvd3NlTmFtZSA9PSBUcmFjZUNvbmZpZ0Jyb3dzZU5hbWVJZHMuVG90YWxSZWNvcmRpbmdUaW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIFRyYWNlQ29uZmlnRmlsZVByb3BlcnR5SWRzLlRvdGFsUmVjb3JkaW5nVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYnJvd3NlTmFtZSA9PSBUcmFjZUNvbmZpZ0Jyb3dzZU5hbWVJZHMuVHJpZ2dlck9mZnNldFRpbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gVHJhY2VDb25maWdGaWxlUHJvcGVydHlJZHMuVHJpZ2dlck9mZnNldFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGJyb3dzZU5hbWUgPT0gVHJhY2VDb25maWdCcm93c2VOYW1lSWRzLlBsY1NhbXBsZVRpbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gVHJhY2VDb25maWdGaWxlUHJvcGVydHlJZHMuUGxjU2FtcGxlVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn0iXX0=
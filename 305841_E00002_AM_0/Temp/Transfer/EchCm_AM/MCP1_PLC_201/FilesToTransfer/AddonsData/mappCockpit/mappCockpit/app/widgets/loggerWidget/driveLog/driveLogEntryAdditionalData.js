define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdditionalData = /** @class */ (function () {
        function AdditionalData() {
        }
        /**
         * Create an instance with the given export data
         *
         * @static
         * @param {(Array<INwctParamGroupInfo>|undefined)} parGroupData
         * @param {(INwctErrorInfo|undefined)} errorInfoData
         * @param {(Array<INwctBitDefinition>|undefined)} bitPatternData
         * @returns {(AdditionalData|undefined)}
         * @memberof AdditionalData
         */
        AdditionalData.create = function (parGroupData, errorInfoData, bitPatternData) {
            var newObj = new AdditionalData();
            if (parGroupData != undefined || errorInfoData != undefined || bitPatternData != undefined) {
                // create real objects with the given import data 
                var bitPattern = this.createBitPattern(bitPatternData);
                var errorInfo = this.createErrorInfo(errorInfoData);
                var parGroup = this.createParGroup(parGroupData);
                newObj.mergedData = { parGroup: parGroup, errorInfo: errorInfo, bitPattern: bitPattern };
            }
            return newObj;
        };
        /**
         * Add some additional data (bitpattern, param group, error info)
         *
         * @param {(IAdditionalData|undefined)} dataToMerge
         * @returns
         * @memberof AdditionalData
         */
        AdditionalData.prototype.addData = function (dataToMerge) {
            if (this.mergedData == undefined) {
                this.mergedData = dataToMerge;
                return;
            }
            if (dataToMerge != undefined) {
                if (dataToMerge.bitPattern != undefined) {
                    this.mergedData.bitPattern = dataToMerge.bitPattern;
                }
                if (dataToMerge.errorInfo != undefined) {
                    this.mergedData.errorInfo = dataToMerge.errorInfo;
                }
                if (dataToMerge.parGroup != undefined) {
                    this.mergedData.parGroup = dataToMerge.parGroup;
                }
            }
        };
        /**
         * Returns the parameter group data for export
         *
         * @returns {(Array<INwctParamGroupInfo>|undefined)}
         * @memberof AdditionalData
         */
        AdditionalData.prototype.getParGroupExportData = function () {
            if (this.mergedData != undefined && this.mergedData.parGroup != undefined) {
                var onlyExportData_1 = new Array();
                this.mergedData.parGroup.forEach(function (element) {
                    var onlyExportDataElement = { parId: element.parId,
                        parName: element.parName,
                        parType: undefined,
                        parValue: element.parValue,
                        parUnit: element.parUnit,
                        bitPattern: element.bitPattern };
                    onlyExportData_1.push(onlyExportDataElement);
                });
                return onlyExportData_1;
            }
            return undefined;
        };
        /**
         * Returns the bitpattern data for export
         *
         * @returns {(Array<INwctBitDefinition>|undefined)}
         * @memberof AdditionalData
         */
        AdditionalData.prototype.getBitPatternExportData = function () {
            if (this.mergedData != undefined && this.mergedData.bitPattern != undefined) {
                var onlyExportData_2 = new Array();
                this.mergedData.bitPattern.forEach(function (element) {
                    var isSet = undefined;
                    if (element.isSet == true) {
                        isSet = true;
                    }
                    var isModified = undefined;
                    if (element.isModified == true) {
                        isModified = true;
                    }
                    onlyExportData_2.push({ bit: element.bit, name: element.name, isSet: isSet, isModified: isModified });
                });
                return onlyExportData_2;
            }
            return undefined;
        };
        /**
         * Returns the error info data for export
         *
         * @returns {(INwctErrorInfo|undefined)}
         * @memberof AdditionalData
         */
        AdditionalData.prototype.getErrorInfoExportData = function () {
            if (this.mergedData != undefined && this.mergedData.errorInfo != undefined) {
                var errorValue = this.mergedData.errorInfo.errorValue;
                if (errorValue == "") {
                    errorValue = undefined;
                }
                var errorValueType = this.mergedData.errorInfo.errorValueType;
                if (errorValueType == "") {
                    errorValueType = undefined;
                }
                var errorValueUnit = this.mergedData.errorInfo.errorValueUnit;
                if (errorValueUnit == "") {
                    errorValueUnit = undefined;
                }
                var onlyExportData = { errorNumber: this.mergedData.errorInfo.errorNumber,
                    errorValue: errorValue,
                    errorValueType: errorValueType,
                    errorValueUnit: errorValueUnit,
                    errorMessage: this.mergedData.errorInfo.errorMessage,
                };
                return onlyExportData;
            }
            return undefined;
        };
        /**
         * create real object with the given import data, and some converting if needed
         *
         * @private
         * @static
         * @param {*} errorInfoData
         * @returns {(INwctErrorInfo|undefined)}
         * @memberof AdditionalData
         */
        AdditionalData.createErrorInfo = function (errorInfoData) {
            if (errorInfoData != undefined) {
                var errorInfo = void 0;
                var errorValue = errorInfoData.errorValue;
                if (errorValue == undefined) {
                    errorValue = "";
                }
                var errorValueType = errorInfoData.errorValueType;
                if (errorValueType == undefined) {
                    errorValueType = "";
                }
                var errorValueUnit = errorInfoData.errorValueUnit;
                if (errorValueUnit == undefined) {
                    errorValueUnit = "";
                }
                errorInfo = { errorNumber: errorInfoData.errorNumber, errorValue: errorValue, errorValueType: errorValueType,
                    errorValueUnit: errorValueUnit, errorMessage: errorInfoData.errorMessage };
                return errorInfo;
            }
            return undefined;
        };
        /**
         * create real object with the given import data, and some converting if needed
         *
         * @private
         * @static
         * @param {*} bitPatternData
         * @returns {(Array<INwctBitDefinition>|undefined)}
         * @memberof AdditionalData
         */
        AdditionalData.createBitPattern = function (bitPatternData) {
            if (bitPatternData != undefined) {
                var bitPattern_1 = new Array();
                bitPatternData.forEach(function (element) {
                    var isSet = element.isSet;
                    if (isSet == undefined) {
                        isSet = false;
                    }
                    var isModified = element.isModified;
                    if (isModified == undefined) {
                        isModified = false;
                    }
                    bitPattern_1.push({ bit: element.bit, name: element.name, isSet: isSet, isModified: isModified });
                });
                return bitPattern_1;
            }
            return undefined;
        };
        /**
         * create real object with the given import data, and some converting if needed
         *
         * @private
         * @static
         * @param {*} parGroupData
         * @returns {(Array<INwctParamGroupInfo>|undefined)}
         * @memberof AdditionalData
         */
        AdditionalData.createParGroup = function (parGroupData) {
            if (parGroupData != undefined) {
                var parGroup_1 = new Array();
                parGroupData.forEach(function (element) {
                    parGroup_1.push({ parId: element.parId, parName: element.parName, parValue: element.parValue, parType: element.parType, parUnit: element.parUnit, bitPattern: element.bitPattern });
                });
                return parGroup_1;
            }
            return undefined;
        };
        return AdditionalData;
    }());
    exports.AdditionalData = AdditionalData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dFbnRyeUFkZGl0aW9uYWxEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2xvZ2dlcldpZGdldC9kcml2ZUxvZy9kcml2ZUxvZ0VudHJ5QWRkaXRpb25hbERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7UUFBQTtRQTJOQSxDQUFDO1FBbE5HOzs7Ozs7Ozs7V0FTRztRQUNXLHFCQUFNLEdBQXBCLFVBQXFCLFlBQWtELEVBQUUsYUFBdUMsRUFBRSxjQUFtRDtZQUNqSyxJQUFJLE1BQU0sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ2xDLElBQUcsWUFBWSxJQUFJLFNBQVMsSUFBSSxhQUFhLElBQUksU0FBUyxJQUFJLGNBQWMsSUFBSSxTQUFTLEVBQUM7Z0JBQ3RGLGtEQUFrRDtnQkFDbEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUMsQ0FBQzthQUMxRjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxnQ0FBTyxHQUFQLFVBQVEsV0FBc0M7WUFDMUMsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7Z0JBQzlCLE9BQU87YUFDVjtZQUNELElBQUcsV0FBVyxJQUFJLFNBQVMsRUFBQztnQkFDeEIsSUFBRyxX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QUcsSUFBSSxLQUFLLEVBQXVCLENBQUM7Z0JBQ2hELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUN2QixVQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFBO2dCQUNwTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLFVBQVEsQ0FBQzthQUNuQjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUEzTkQsSUEyTkM7SUEzTlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTndjdEJpdERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9pbnRlcmZhY2VzL253Y3RCaXREZWZpbml0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElOd2N0UGFyYW1Hcm91cEluZm8gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9pbnRlcmZhY2VzL253Y3RQYXJhbUdyb3VwSW5mb0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdEVycm9ySW5mbyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL2ludGVyZmFjZXMvbndjdEVycm9ySW5mb0ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWRkaXRpb25hbERhdGF7XHJcbiAgICBwYXJHcm91cDogQXJyYXk8SU53Y3RQYXJhbUdyb3VwSW5mbz58dW5kZWZpbmVkO1xyXG4gICAgZXJyb3JJbmZvOiBJTndjdEVycm9ySW5mb3x1bmRlZmluZWQ7XHJcbiAgICBiaXRQYXR0ZXJuOiBBcnJheTxJTndjdEJpdERlZmluaXRpb24+fHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFkZGl0aW9uYWxEYXRhe1xyXG4gICAgLyoqXHJcbiAgICAgKiBob2xkcyBhbGwgdGhlIGFkZGl0aW9uYWwgaW5mb3MoZS5nLiBiaXQgcGF0dGVybiwgcGFyYW1ldGVyIGdyb3VwLCBlcnJvciBpbmZvKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoSUFkZGl0aW9uYWxEYXRhfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkaXRpb25hbERhdGFcclxuICAgICAqL1xyXG4gICAgbWVyZ2VkRGF0YTogSUFkZGl0aW9uYWxEYXRhfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbiBpbnN0YW5jZSB3aXRoIHRoZSBnaXZlbiBleHBvcnQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElOd2N0UGFyYW1Hcm91cEluZm8+fHVuZGVmaW5lZCl9IHBhckdyb3VwRGF0YVxyXG4gICAgICogQHBhcmFtIHsoSU53Y3RFcnJvckluZm98dW5kZWZpbmVkKX0gZXJyb3JJbmZvRGF0YVxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8SU53Y3RCaXREZWZpbml0aW9uPnx1bmRlZmluZWQpfSBiaXRQYXR0ZXJuRGF0YVxyXG4gICAgICogQHJldHVybnMgeyhBZGRpdGlvbmFsRGF0YXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEFkZGl0aW9uYWxEYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhckdyb3VwRGF0YTogQXJyYXk8SU53Y3RQYXJhbUdyb3VwSW5mbz58dW5kZWZpbmVkLCBlcnJvckluZm9EYXRhOiBJTndjdEVycm9ySW5mb3x1bmRlZmluZWQsIGJpdFBhdHRlcm5EYXRhOiBBcnJheTxJTndjdEJpdERlZmluaXRpb24+fHVuZGVmaW5lZCk6IEFkZGl0aW9uYWxEYXRhfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbmV3T2JqID0gbmV3IEFkZGl0aW9uYWxEYXRhKCk7XHJcbiAgICAgICAgaWYocGFyR3JvdXBEYXRhICE9IHVuZGVmaW5lZCB8fCBlcnJvckluZm9EYXRhICE9IHVuZGVmaW5lZCB8fCBiaXRQYXR0ZXJuRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgcmVhbCBvYmplY3RzIHdpdGggdGhlIGdpdmVuIGltcG9ydCBkYXRhIFxyXG4gICAgICAgICAgICBsZXQgYml0UGF0dGVybiA9IHRoaXMuY3JlYXRlQml0UGF0dGVybihiaXRQYXR0ZXJuRGF0YSk7IFxyXG4gICAgICAgICAgICBsZXQgZXJyb3JJbmZvID0gdGhpcy5jcmVhdGVFcnJvckluZm8oZXJyb3JJbmZvRGF0YSk7XHJcbiAgICAgICAgICAgIGxldCBwYXJHcm91cCA9IHRoaXMuY3JlYXRlUGFyR3JvdXAocGFyR3JvdXBEYXRhKTtcclxuICAgICAgICAgICAgbmV3T2JqLm1lcmdlZERhdGEgPSB7cGFyR3JvdXA6IHBhckdyb3VwLCBlcnJvckluZm86IGVycm9ySW5mbywgYml0UGF0dGVybjogYml0UGF0dGVybn07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdPYmo7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgc29tZSBhZGRpdGlvbmFsIGRhdGEgKGJpdHBhdHRlcm4sIHBhcmFtIGdyb3VwLCBlcnJvciBpbmZvKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KElBZGRpdGlvbmFsRGF0YXx1bmRlZmluZWQpfSBkYXRhVG9NZXJnZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBBZGRpdGlvbmFsRGF0YVxyXG4gICAgICovXHJcbiAgICBhZGREYXRhKGRhdGFUb01lcmdlOiBJQWRkaXRpb25hbERhdGF8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZih0aGlzLm1lcmdlZERhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5tZXJnZWREYXRhID0gZGF0YVRvTWVyZ2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YVRvTWVyZ2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YVRvTWVyZ2UuYml0UGF0dGVybiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXJnZWREYXRhLmJpdFBhdHRlcm4gPSBkYXRhVG9NZXJnZS5iaXRQYXR0ZXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRhdGFUb01lcmdlLmVycm9ySW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXJnZWREYXRhLmVycm9ySW5mbyA9IGRhdGFUb01lcmdlLmVycm9ySW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihkYXRhVG9NZXJnZS5wYXJHcm91cCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXJnZWREYXRhLnBhckdyb3VwID0gZGF0YVRvTWVyZ2UucGFyR3JvdXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJhbWV0ZXIgZ3JvdXAgZGF0YSBmb3IgZXhwb3J0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxJTndjdFBhcmFtR3JvdXBJbmZvPnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEFkZGl0aW9uYWxEYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQYXJHcm91cEV4cG9ydERhdGEoKTpBcnJheTxJTndjdFBhcmFtR3JvdXBJbmZvPnx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYodGhpcy5tZXJnZWREYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLm1lcmdlZERhdGEucGFyR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG9ubHlFeHBvcnREYXRhID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVyZ2VkRGF0YS5wYXJHcm91cC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9ubHlFeHBvcnREYXRhRWxlbWVudCA9IHsgICBwYXJJZDogZWxlbWVudC5wYXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyTmFtZTogZWxlbWVudC5wYXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJUeXBlOiB1bmRlZmluZWQsIC8vIFR5cGUgbXVzdCBub3QgYmUgZXhwb3J0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyVmFsdWU6IGVsZW1lbnQucGFyVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhclVuaXQ6IGVsZW1lbnQucGFyVW5pdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0UGF0dGVybjogZWxlbWVudC5iaXRQYXR0ZXJufTtcclxuICAgICAgICAgICAgICAgIG9ubHlFeHBvcnREYXRhLnB1c2gob25seUV4cG9ydERhdGFFbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvbmx5RXhwb3J0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGJpdHBhdHRlcm4gZGF0YSBmb3IgZXhwb3J0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxJTndjdEJpdERlZmluaXRpb24+fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkaXRpb25hbERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJpdFBhdHRlcm5FeHBvcnREYXRhKCk6QXJyYXk8SU53Y3RCaXREZWZpbml0aW9uPnx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYodGhpcy5tZXJnZWREYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLm1lcmdlZERhdGEuYml0UGF0dGVybiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgb25seUV4cG9ydERhdGEgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgICAgICB0aGlzLm1lcmdlZERhdGEuYml0UGF0dGVybi5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzU2V0OiBib29sZWFufHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuaXNTZXQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGlzTW9kaWZpZWQ6IGJvb2xlYW58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5pc01vZGlmaWVkID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb25seUV4cG9ydERhdGEucHVzaCh7Yml0OiBlbGVtZW50LmJpdCwgbmFtZTogZWxlbWVudC5uYW1lLCBpc1NldDogaXNTZXQsIGlzTW9kaWZpZWQ6IGlzTW9kaWZpZWR9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvbmx5RXhwb3J0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVycm9yIGluZm8gZGF0YSBmb3IgZXhwb3J0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhJTndjdEVycm9ySW5mb3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEFkZGl0aW9uYWxEYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFcnJvckluZm9FeHBvcnREYXRhKCk6SU53Y3RFcnJvckluZm98dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMubWVyZ2VkRGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5tZXJnZWREYXRhLmVycm9ySW5mbyAhPSB1bmRlZmluZWQpe1xyXG5cclxuICAgICAgICAgICAgbGV0IGVycm9yVmFsdWUgPSB0aGlzLm1lcmdlZERhdGEuZXJyb3JJbmZvLmVycm9yVmFsdWU7XHJcbiAgICAgICAgICAgIGlmKGVycm9yVmFsdWUgPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBlcnJvclZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZXJyb3JWYWx1ZVR5cGUgPSB0aGlzLm1lcmdlZERhdGEuZXJyb3JJbmZvLmVycm9yVmFsdWVUeXBlO1xyXG4gICAgICAgICAgICBpZihlcnJvclZhbHVlVHlwZSA9PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGVycm9yVmFsdWVUeXBlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZXJyb3JWYWx1ZVVuaXQgPSB0aGlzLm1lcmdlZERhdGEuZXJyb3JJbmZvLmVycm9yVmFsdWVVbml0O1xyXG4gICAgICAgICAgICBpZihlcnJvclZhbHVlVW5pdCA9PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGVycm9yVmFsdWVVbml0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgb25seUV4cG9ydERhdGEgPSB7ICBlcnJvck51bWJlcjogdGhpcy5tZXJnZWREYXRhLmVycm9ySW5mby5lcnJvck51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JWYWx1ZTogZXJyb3JWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JWYWx1ZVR5cGU6IGVycm9yVmFsdWVUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclZhbHVlVW5pdDogZXJyb3JWYWx1ZVVuaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5tZXJnZWREYXRhLmVycm9ySW5mby5lcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIG9ubHlFeHBvcnREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIHJlYWwgb2JqZWN0IHdpdGggdGhlIGdpdmVuIGltcG9ydCBkYXRhLCBhbmQgc29tZSBjb252ZXJ0aW5nIGlmIG5lZWRlZCBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBlcnJvckluZm9EYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KElOd2N0RXJyb3JJbmZvfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkaXRpb25hbERhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlRXJyb3JJbmZvKGVycm9ySW5mb0RhdGE6IGFueSk6IElOd2N0RXJyb3JJbmZvfHVuZGVmaW5lZHtcclxuICAgICAgICBpZihlcnJvckluZm9EYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBlcnJvckluZm86IElOd2N0RXJyb3JJbmZvO1xyXG5cclxuICAgICAgICAgICAgbGV0IGVycm9yVmFsdWUgPSBlcnJvckluZm9EYXRhLmVycm9yVmFsdWU7XHJcbiAgICAgICAgICAgIGlmKGVycm9yVmFsdWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGVycm9yVmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBlcnJvclZhbHVlVHlwZSA9IGVycm9ySW5mb0RhdGEuZXJyb3JWYWx1ZVR5cGU7XHJcbiAgICAgICAgICAgIGlmKGVycm9yVmFsdWVUeXBlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBlcnJvclZhbHVlVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGVycm9yVmFsdWVVbml0ID0gZXJyb3JJbmZvRGF0YS5lcnJvclZhbHVlVW5pdDtcclxuICAgICAgICAgICAgaWYoZXJyb3JWYWx1ZVVuaXQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGVycm9yVmFsdWVVbml0ID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlcnJvckluZm8gPSB7ZXJyb3JOdW1iZXI6IGVycm9ySW5mb0RhdGEuZXJyb3JOdW1iZXIsIGVycm9yVmFsdWU6IGVycm9yVmFsdWUsIGVycm9yVmFsdWVUeXBlOiBlcnJvclZhbHVlVHlwZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclZhbHVlVW5pdDogZXJyb3JWYWx1ZVVuaXQsIGVycm9yTWVzc2FnZTogZXJyb3JJbmZvRGF0YS5lcnJvck1lc3NhZ2V9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JJbmZvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIHJlYWwgb2JqZWN0IHdpdGggdGhlIGdpdmVuIGltcG9ydCBkYXRhLCBhbmQgc29tZSBjb252ZXJ0aW5nIGlmIG5lZWRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IGJpdFBhdHRlcm5EYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PElOd2N0Qml0RGVmaW5pdGlvbj58dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBBZGRpdGlvbmFsRGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVCaXRQYXR0ZXJuKGJpdFBhdHRlcm5EYXRhOiBhbnkpOiBBcnJheTxJTndjdEJpdERlZmluaXRpb24+fHVuZGVmaW5lZHtcclxuICAgICAgICBpZihiaXRQYXR0ZXJuRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgYml0UGF0dGVybiA9IG5ldyBBcnJheTxJTndjdEJpdERlZmluaXRpb24+KCk7XHJcbiAgICAgICAgICAgIGJpdFBhdHRlcm5EYXRhLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNTZXQgPSBlbGVtZW50LmlzU2V0O1xyXG4gICAgICAgICAgICAgICAgaWYoaXNTZXQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1NldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGlzTW9kaWZpZWQgPSBlbGVtZW50LmlzTW9kaWZpZWQ7XHJcbiAgICAgICAgICAgICAgICBpZihpc01vZGlmaWVkID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNNb2RpZmllZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYml0UGF0dGVybi5wdXNoKHtiaXQ6IGVsZW1lbnQuYml0LCBuYW1lOiBlbGVtZW50Lm5hbWUsIGlzU2V0OiBpc1NldCwgaXNNb2RpZmllZDogaXNNb2RpZmllZH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYml0UGF0dGVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSByZWFsIG9iamVjdCB3aXRoIHRoZSBnaXZlbiBpbXBvcnQgZGF0YSwgYW5kIHNvbWUgY29udmVydGluZyBpZiBuZWVkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBwYXJHcm91cERhdGFcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8SU53Y3RQYXJhbUdyb3VwSW5mbz58dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBBZGRpdGlvbmFsRGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVQYXJHcm91cChwYXJHcm91cERhdGE6IGFueSk6IEFycmF5PElOd2N0UGFyYW1Hcm91cEluZm8+fHVuZGVmaW5lZHtcclxuICAgICAgICBpZihwYXJHcm91cERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHBhckdyb3VwID0gbmV3IEFycmF5PElOd2N0UGFyYW1Hcm91cEluZm8+KCk7XHJcbiAgICAgICAgICAgIHBhckdyb3VwRGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgIHBhckdyb3VwLnB1c2goe3BhcklkOiBlbGVtZW50LnBhcklkLCBwYXJOYW1lOiBlbGVtZW50LnBhck5hbWUsIHBhclZhbHVlOiBlbGVtZW50LnBhclZhbHVlLCBwYXJUeXBlOiBlbGVtZW50LnBhclR5cGUsIHBhclVuaXQ6IGVsZW1lbnQucGFyVW5pdCwgYml0UGF0dGVybjogZWxlbWVudC5iaXRQYXR0ZXJufSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJHcm91cDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufSJdfQ==
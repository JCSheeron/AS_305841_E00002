define(["require", "exports", "./driveLogEntryAdditionalData", "./driveLogEntryHelper"], function (require, exports, driveLogEntryAdditionalData_1, driveLogEntryHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents one network command trace logger entry
     *
     * @export
     * @class DriveLogEntry
     * @implements {IDriveLogEntry}
     */
    var DriveLogEntry = /** @class */ (function () {
        /**
         * Creates an instance of DriveLogEntry with a nwctEntry or driveLogEntryExport data
         * @param {INwctEntry} parsedEntry
         * @param {(NwctTextProvider|undefined)} nwctTextProvider
         * @memberof DriveLogEntry
         */
        function DriveLogEntry(parsedEntry, exportData) {
            if (exportData === void 0) { exportData = undefined; }
            this._parsedEntry = parsedEntry;
            if (exportData != undefined) {
                this.setExportData(exportData);
                return;
            }
            if (this._parsedEntry != undefined) {
                var record = this._parsedEntry;
                this._recordType = record.entryType;
                this._recordTypeName = record.entryTypeName;
                if (record.responseEntry != undefined) {
                    this._linkedRecordType = record.responseEntry.entryType;
                    this._linkedRecordTypeName = record.responseEntry.entryTypeName;
                    this._isLinkedRecordValid = record.parId == record.responseEntry.parId;
                }
                else {
                    // Default values if no response is available
                    this._linkedRecordType = -1;
                    this._linkedRecordTypeName = "";
                    this._isLinkedRecordValid = true;
                }
                return;
            }
            if (this._parsedEntry == undefined) {
                console.error("No entry data available!");
            }
        }
        /**
         * Returns the export data of this entry
         *
         * @returns {IDriveLogEntryExportData}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getExportData = function () {
            // Get mandatory export data
            var exportData = { recNumber: this.recordNumber,
                recType: this._recordType,
                recTypeName: this._recordTypeName,
                time: this.time,
                modInterface: this.getModuleInterface(),
                modType: this.getModuleType(),
                modChannel: this.getModuleChannel(),
                applObject: this.objectName,
                parId: this._parId,
                parName: this.getDescriptionText(),
                parValue: this.getValue(),
            };
            // Add additional export data
            var unit = this.getUnit();
            if (unit != "") {
                exportData["parUnit"] = unit;
            }
            if (this._linkedRecordType != undefined && this._linkedRecordType != -1) {
                // linked record available
                exportData["linkedRecType"] = this._linkedRecordType;
                if (this._isLinkedRecordError != undefined && this._isLinkedRecordError == true) {
                    exportData["isLinkedRecError"] = this._isLinkedRecordError;
                }
                if (this._linkedRecordTypeName != "") {
                    exportData["linkedRecTypeName"] = this._linkedRecordTypeName;
                }
                if (this._errorResponseParId != undefined && this._errorResponseParId != -1) {
                    exportData["linkedRecParId"] = this._errorResponseParId;
                }
                if (this._errorResponseParName != undefined && this._errorResponseParName != "") {
                    exportData["linkedRecParName"] = this._errorResponseParName;
                }
                /*if(this._linkedParValue != undefined){
                    exportData["linkedParValue"] = this._linkedParValue;
                }*/
            }
            if (this.responseTime != "") {
                exportData["linkedRecDelay"] = this.responseTime;
            }
            if (this._additionalData != undefined && this._additionalData.mergedData != undefined) {
                exportData["parGroup"] = this._additionalData.getParGroupExportData();
                exportData["errorInfo"] = this._additionalData.getErrorInfoExportData();
                exportData["bitPattern"] = this._additionalData.getBitPatternExportData();
            }
            return exportData;
        };
        /**
         * Sets the export data to this entry
         *
         * @param {IDriveLogEntryExportDataOptional} exportData
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.setExportData = function (exportData) {
            // Set mandatory export data
            this._recordNumber = exportData.recNumber;
            this._recordType = exportData.recType;
            this._recordTypeName = exportData.recTypeName;
            this._time = exportData.time;
            this._moduleInterface = exportData.modInterface;
            this._moduleType = exportData.modType;
            this._moduleChannel = exportData.modChannel;
            this._objectName = exportData.applObject;
            this._parId = exportData.parId;
            this._descriptionText = exportData.parName;
            this._value = exportData.parValue;
            // Set additional export data or default values if not available
            this._additionalData = driveLogEntryAdditionalData_1.AdditionalData.create(exportData.parGroup, exportData.errorInfo, exportData.bitPattern);
            this._responseTime = exportData.linkedRecDelay;
            if (this._responseTime == undefined) {
                this._responseTime = "";
            }
            this._unit = exportData.parUnit;
            if (this._unit == undefined) {
                this._unit = "";
            }
            this._linkedRecordType = exportData.linkedRecType;
            if (this._linkedRecordType == undefined) {
                // Set default values for linkedRecord if not available
                this._linkedRecordType = -1;
                this._linkedRecordTypeName = "";
                this._isLinkedRecordValid = true;
                this._isLinkedRecordError = false;
                this._errorResponseParName = "";
                this._errorResponseParId = -1;
            }
            else {
                this._linkedRecordTypeName = exportData.linkedRecTypeName;
                if (this._linkedRecordTypeName == undefined) {
                    this._linkedRecordTypeName = "";
                }
                this._isLinkedRecordValid = true;
                if (exportData.linkedRecParName != undefined && exportData.linkedRecParName != exportData.parName) {
                    this._isLinkedRecordValid = false;
                }
                /*this._linkedParValue = undefined;
                if(exportData.linkedParValue != undefined){
                    this._linkedParValue = exportData.linkedParValue;
                }*/
                this._isLinkedRecordError = exportData.isLinkedRecError;
                if (this._isLinkedRecordError == undefined) {
                    this._isLinkedRecordError = false;
                }
                this._errorResponseParName = exportData.linkedRecParName;
                if (this._errorResponseParName == undefined) {
                    this._errorResponseParName = "";
                }
                this._errorResponseParId = exportData.linkedRecParId;
                if (this._errorResponseParId == undefined) {
                    this._errorResponseParId = -1;
                }
            }
            this._isRecordError = false;
            if (this._additionalData != undefined) {
                if (this._additionalData.mergedData != undefined) {
                    if (this._additionalData.mergedData.errorInfo != undefined) {
                        if (this._linkedRecordType == undefined || this._linkedRecordType == -1) {
                            // If error info is available but no linked record it musst be a record error(no response error)
                            this._isRecordError = true;
                        }
                    }
                }
            }
            this._isBitPattern = false;
            if (this._additionalData != undefined) {
                if (this._additionalData.mergedData != undefined) {
                    if (this._additionalData.mergedData.bitPattern != undefined) {
                        this._isBitPattern = true;
                    }
                }
            }
            this._descriptionError = this.getDescriptionError();
        };
        Object.defineProperty(DriveLogEntry.prototype, "recordNumber", {
            /**
             * Returns the unique number of the logger entry
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._recordNumber == undefined) {
                    this._recordNumber = this._parsedEntry.index;
                }
                return this._recordNumber;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "module", {
            /**
             * Returns the module description for this logger entry (e.g. PLK: SL1.IF2.ST1 (CHAN 2))
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._module == undefined) {
                    this._module = this.getModuleFormated(this.getModuleInterface(), this.getModuleType(), this.getModuleChannel());
                }
                return this._module;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "objectName", {
            /**
             * Returns the name of the object (e.g. gAxis01)
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._objectName == undefined) {
                    this._objectName = this._parsedEntry.componentName;
                }
                return this._objectName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "descriptionRawData", {
            /**
             * Retruns the info which is used for the description column for the search and filtering(texts without styling)
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._descriptionRawData == undefined) {
                    this._descriptionRawData = this.getDescriptionRawData(this.getDescriptionText(), this.getDescriptionValueWithUnit(), this.getAdditionalSearchInfo());
                }
                return this._descriptionRawData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the id of the icon which one should be shown for this record
         * If response and request is available and valid the ids will be added with a "_" between -> "id1_id2")
         * If response of request is invalid a postfix will be added -> "_invalid" e.g. id1_invalid
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionIconId = function () {
            if (this._descriptionIconId == undefined) {
                var invalidLinkedRecord = false;
                if (this.isResponseAvailable()) {
                    invalidLinkedRecord = !this.isResponseParIdValid();
                }
                this._descriptionIconId = driveLogEntryHelper_1.DriveLogEntryHelper.generateIconId(this._recordType, this._linkedRecordType, invalidLinkedRecord);
            }
            return this._descriptionIconId;
        };
        /**
         * Returns only the description text without the value
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionText = function () {
            if (this._descriptionText == undefined) {
                this._descriptionText = this.getDescriptionTextFromRecord();
            }
            return this._descriptionText;
        };
        /**
         * Returns only the formated description text (e.g. red font color) without the value
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionTextFormated = function () {
            if (this._descriptionTextFormated == undefined) {
                if (this.isErrorRecord()) {
                    this._descriptionTextFormated = driveLogEntryHelper_1.DriveLogEntryHelper.setStyleError(this.getDescriptionText());
                }
                else {
                    this._descriptionTextFormated = this.getDescriptionText();
                }
            }
            return this._descriptionTextFormated;
        };
        /**
         * Retruns the formated value (e.g. red font color) with the unit
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionValueWithUnitFormated = function () {
            if (this._descriptionValueWithUnitFormated == undefined) {
                // only show value in red if responsError and read request
                if (this.isResponseError() && this._recordType == 4) { // 4 -> readRequest
                    this._descriptionValueWithUnitFormated = driveLogEntryHelper_1.DriveLogEntryHelper.setStyleError(this.getDescriptionValueWithUnit());
                }
                else {
                    this._descriptionValueWithUnitFormated = this.getDescriptionValueWithUnit();
                }
            }
            return this._descriptionValueWithUnitFormated;
        };
        /**
         * Returns the formated error description
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionErrorFormated = function () {
            return driveLogEntryHelper_1.DriveLogEntryHelper.setStyleError(this.descriptionError());
        };
        Object.defineProperty(DriveLogEntry.prototype, "descriptionTooltip", {
            /**
             * Returns the tooltip text for the description text and value
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._descriptionTooltip == undefined) {
                    this._descriptionTooltip = this.getDescriptionTooltip();
                }
                return this._descriptionTooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "time", {
            /**
             * Returns the time of the logger entry
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._time == undefined) {
                    this._time = this._parsedEntry.time.toFixed(4).toString();
                }
                return this._time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "responseTime", {
            /**
             * Returns the time delay between the request and the response
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._responseTime == undefined) {
                    this._responseTime = "";
                    if (this._parsedEntry.responseEntry != undefined) {
                        this._responseTime = ((this._parsedEntry.responseEntry.time - this._parsedEntry.time) * 1000).toFixed(3).toString();
                    }
                }
                return this._responseTime;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * is the entry a error record
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isErrorRecord = function () {
            if (this._isRecordError == undefined) {
                this._isRecordError = false; // Default false
                var record = this._parsedEntry;
                if (record != undefined) {
                    this._isRecordError = record.isErrorRecord;
                }
            }
            return this._isRecordError;
        };
        /**
         * is the entry response error record(response available but response par id not valid)
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isResponseError = function () {
            if (this._isResponseError == undefined) {
                this._isResponseError = this.isResponseAvailable() && !this.isResponseParIdValid();
            }
            return this._isResponseError;
        };
        /**
         * Returns the module string( interface, type, channel,...)
         *
         * @private
         * @param {string} moduleInterface
         * @param {string} modulType
         * @param {number} modulChannel
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleFormated = function (moduleInterface, modulType, modulChannel) {
            var moduleFormated = moduleInterface;
            if (modulType != "") {
                moduleFormated += " (" + modulType + " " + modulChannel + ")";
            }
            return moduleFormated;
        };
        /**
         * Retruns the interface name incl. nodenumber
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleInterface = function () {
            if (this._moduleInterface == undefined) {
                this._moduleInterface = this.getModuleInterfaceFromRecord();
            }
            return this._moduleInterface;
        };
        /**
         * Returns the type of the module
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleType = function () {
            if (this._moduleType == undefined) {
                this._moduleType = this.getModuleTypeFromRecord();
            }
            return this._moduleType;
        };
        /**
         * Returns the channel of the module
         *
         * @private
         * @returns {number}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleChannel = function () {
            if (this._moduleChannel == undefined) {
                this._moduleChannel = this.getModuleChannelFromRecord();
            }
            return this._moduleChannel;
        };
        /**
         * Returns the interfacename incl. nodenumber from nwct entry
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleInterfaceFromRecord = function () {
            return this._parsedEntry.networkInterface + this.getNodeNumber();
        };
        /**
         * Returns the description raw data, needed for search an filtering; e.g  param name, param value, additional info like errornumber, ...)
         *
         * @private
         * @param {(string|undefined)} descriptionText
         * @param {(string|undefined)} descriptionValue
         * @param {string} additionalSearchInfo
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionRawData = function (descriptionText, descriptionValue, additionalSearchInfo) {
            if (descriptionText == undefined) {
                descriptionText = "";
            }
            if (descriptionValue == undefined) {
                descriptionValue = "";
            }
            return descriptionText + " " + descriptionValue + " " + additionalSearchInfo;
        };
        /**
         * Returns only the value without the description
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionValueWithUnit = function () {
            if (this._descriptionValueWithUnit == undefined) {
                this._descriptionValueWithUnit = driveLogEntryHelper_1.DriveLogEntryHelper.combineValueWithUnit(this.getValue(), this.getUnit());
            }
            return this._descriptionValueWithUnit;
        };
        /**
         * Holds the error description without formating
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.descriptionError = function () {
            var _a;
            if (this._descriptionError == undefined) {
                this._descriptionError = "";
                if (this.isResponseError()) {
                    var record = this._parsedEntry;
                    this._errorResponseParName = record.responseEntry.parIdName;
                    this._errorResponseParId = (_a = record === null || record === void 0 ? void 0 : record.responseEntry) === null || _a === void 0 ? void 0 : _a.parId;
                }
                this._descriptionError = this.getDescriptionError();
            }
            return this._descriptionError;
        };
        /**
         * Returns the description error
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionError = function () {
            if (this._errorResponseParName != undefined && this._errorResponseParName != "") {
                if (this.isResponseErrorRec()) {
                    return this._errorResponseParName; // Only return the parameter name if response error
                }
                // if response par id is different to request par id -> show special error
                return "(Error: RespParID=" + this._errorResponseParName + ")";
            }
            return "";
        };
        /**
         * Returns the description text without the value(with or without styling)
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionTextFromRecord = function () {
            var record = this._parsedEntry;
            if (record != undefined) {
                return record.parIdName;
            }
            return "";
        };
        /**
         * Retruns the par id
         *
         * @private
         * @returns {number}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getParId = function () {
            if (this._parId == undefined) {
                var record = this._parsedEntry;
                this._parId = record.parId;
            }
            return this._parId;
        };
        /**
         * Returns only the value
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getValue = function () {
            if (this._value == undefined) {
                this._value = this.getValueFromRecord();
            }
            return this._value;
        };
        /**
         * Returns only the unit
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getUnit = function () {
            if (this._unit == undefined) {
                this._unit = this.getUnitFromRecord();
            }
            return this._unit;
        };
        /**
         * Returns true if the parameter is a bitPattern and has some bitPattern infos available
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isBitPattern = function () {
            if (this._isBitPattern == undefined) {
                var record = this._parsedEntry;
                this._isBitPattern = record.isBitPattern;
            }
            return this._isBitPattern;
        };
        /**
         * Returns the value which should be shown for the given record
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getValueFromRecord = function () {
            var record = this._parsedEntry;
            if (this.isResponseAvailable()) {
                var returnValue = "";
                if (this._linkedRecordType == 5) { // "RD_RSP" => ReadResponse => show the value from the response and not from the request
                    var formatedValue = record.responseEntry.formatedValue;
                    returnValue = formatedValue;
                }
                else {
                    returnValue = record.formatedValue;
                }
                return returnValue;
            }
            else {
                if (record.isResponse && this._recordType == 3) { // "WR_RSP" => WriteResponse => don't show the value because it is only shown in the write request
                    return "";
                }
                else if (this._recordType == 4) { // "RD_REQ" => ReadRequest => don't show the value because it is only a read request (and not the already read value from the response)
                    return "";
                }
            }
            return record.formatedValue;
        };
        /**
         * Returns the unit from the nwct enry which should be shown for the given record
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getUnitFromRecord = function () {
            var record = this._parsedEntry;
            if (this.isResponseAvailable()) {
                var returnValue = "";
                if (this._linkedRecordType == 5) { // "RD_RSP" => ReadResponse => show the value/unit from the response and not from the request
                    returnValue = record.responseEntry.unit;
                }
                else {
                    returnValue = record.unit;
                }
                return returnValue;
            }
            else {
                if (record.isResponse && this._recordType == 3) { // "WR_RSP" => WriteResponse => don't show the value/unit because it is only shown in the write request
                    return "";
                }
                else if (this._recordType == 4) { // "RD_REQ" => ReadRequest => don't show the value/unit because it is only a read request (and not the already read value from the response)
                    return "";
                }
            }
            return record.unit;
        };
        /**
         * Returns some text which should also be used for the search/filter mechanisms(e.g. errorNumber, error description)
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getAdditionalSearchInfo = function () {
            var _a, _b;
            var errorNumber = (_b = (_a = this.getAddtionalData().mergedData) === null || _a === void 0 ? void 0 : _a.errorInfo) === null || _b === void 0 ? void 0 : _b.errorNumber;
            var additionalData = "";
            if (errorNumber != undefined && errorNumber != -1) {
                additionalData = errorNumber.toString();
            }
            if (this.descriptionError() != "") {
                // Add error description to search info
                if (additionalData != "") {
                    additionalData += " ";
                }
                additionalData += this.descriptionError();
            }
            return additionalData;
        };
        /**
         * Returns a description tooltip text
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionTooltip = function () {
            var tooltip = driveLogEntryHelper_1.DriveLogEntryHelper.getMainDescriptionTooltip(this.getMergedRecordTypeName(), this.getParId());
            // Add parameter name and value if available
            tooltip += this.getDescriptionTextFormated();
            // add value only if it is not a bitpattern value
            if (this.getDescriptionValueWithUnitFormated() != "" && !this.isBitPattern()) {
                tooltip += " = " + this.getDescriptionValueWithUnitFormated();
            }
            // Format the additionalData(paramGroups data, bitmask data, ...)
            var tooltipForRecord = driveLogEntryHelper_1.DriveLogEntryHelper.getAdditionalDescriptionTooltip(this.getAddtionalData().mergedData);
            if (tooltipForRecord != "") {
                tooltip += "<br/>";
                tooltip += tooltipForRecord;
            }
            return tooltip;
        };
        /**
         * Returns the additional data for this entry(e.g. error info, param group info, bit mask info)
         *
         * @private
         * @returns {AdditionalData}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getAddtionalData = function () {
            if (this._additionalData == undefined) {
                var record = this._parsedEntry;
                var additionalData = new driveLogEntryAdditionalData_1.AdditionalData();
                // Add tooltip info of request if available
                if ((!this.isErrorRecord() && this._recordType != 4) || (!this.isResponseAvailable())) {
                    // show info if no response is available or
                    // show info if it is not an read error request => for read error request the data will be used from the response
                    var data = this.getAdditionalDataForRecord(record);
                    if (data != undefined) {
                        additionalData.addData(data);
                    }
                }
                // Add tooltip info of response if available
                if (this.isResponseAvailable() && (this._recordType != 2 || this.isResponseErrorRec())) { //"WR_REQ" write value already shown from request data; only show error data if available
                    var data = this.getAdditionalDataForRecord(record.responseEntry);
                    if (data != undefined) {
                        additionalData.addData(data);
                    }
                }
                this._additionalData = additionalData;
            }
            return this._additionalData;
        };
        /**
         * Get tooltip data for the given record(request or response)
         *
         * @private
         * @param {INwctEntry} record
         * @returns {(IAdditionalData|undefined)}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getAdditionalDataForRecord = function (record) {
            var parGroup;
            var errorInfo;
            var bitPattern;
            if (record.isParameterGroup) {
                // Show parameterGroup info in case of parameter group
                var parGroupDescriptionData = record.parameterGroupDescription;
                if (Array.isArray(parGroupDescriptionData)) {
                    parGroup = parGroupDescriptionData;
                }
                else {
                    errorInfo = parGroupDescriptionData;
                }
            }
            if (record.isBitPattern) {
                // Add parameter name in case of bitpattern
                bitPattern = record.bitPatternDescription;
            }
            if (parGroup == undefined && bitPattern == undefined && errorInfo == undefined) {
                return undefined;
            }
            var data = { parGroup: parGroup, errorInfo: errorInfo, bitPattern: bitPattern };
            return data;
        };
        /**
         * Returns the node number to which the logger entry belongs to
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getNodeNumber = function () {
            var nodeNumber = this._parsedEntry.nodeNumber.toString();
            if (nodeNumber == "0") { // if node number is 0 don't show => e.g. NCMAN
                return "";
            }
            return ".ST" + nodeNumber;
        };
        /**
         * Returns the channel of the object
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleChannelFromRecord = function () {
            return this._parsedEntry.channelNumber;
        };
        /**
         * Returns the object type (e.g. AXIS, VAXIS, ...)
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleTypeFromRecord = function () {
            return this._parsedEntry.componentType;
        };
        /**
         * Returns the tooltip text for the record type(e.g. "Write Request", ..)
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getMergedRecordTypeName = function () {
            if (this._mergedRecordTypeName == undefined) {
                if (this.isResponseAvailable()) {
                    // Response is available -> Show request/response merged text
                    var responseText = this._linkedRecordTypeName;
                    var diffCharIndex = driveLogEntryHelper_1.DriveLogEntryHelper.findFirstDifferentChar(this._recordTypeName, responseText);
                    if (diffCharIndex > 0) {
                        responseText = responseText.substr(diffCharIndex);
                    }
                    // show response text in red and add error if response is invalid
                    this._mergedRecordTypeName = this._recordTypeName + "/" + responseText;
                }
                else {
                    this._mergedRecordTypeName = this._recordTypeName;
                }
            }
            if (this.isResponseError()) {
                var responseStartIndex = this._mergedRecordTypeName.indexOf("/");
                if (responseStartIndex != -1) {
                    var requestText = this._mergedRecordTypeName.substr(0, responseStartIndex + 1);
                    var responseText = this._mergedRecordTypeName.substr(responseStartIndex + 1);
                    responseText = driveLogEntryHelper_1.DriveLogEntryHelper.setStyleError(responseText + " Error");
                    return requestText + responseText;
                }
                else {
                    return this._mergedRecordTypeName;
                }
            }
            return this._mergedRecordTypeName;
        };
        /**
         * Returns true if a response is available for the given request
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isResponseAvailable = function () {
            if (this._linkedRecordType != undefined) {
                if (this._linkedRecordType != -1) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true if the given response is valid for the given request(same command/parameterId for request and response)
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isResponseParIdValid = function () {
            if (this._isLinkedRecordValid != undefined) {
                return this._isLinkedRecordValid;
            }
            return true;
        };
        /**
         * Retruns true if a response error, else false
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isResponseErrorRec = function () {
            if (this._isLinkedRecordError == undefined) {
                var record = this._parsedEntry;
                this._isLinkedRecordError = record.responseEntry.isErrorRecord;
            }
            return this._isLinkedRecordError;
        };
        return DriveLogEntry;
    }());
    exports.DriveLogEntry = DriveLogEntry;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dFbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9sb2dnZXJXaWRnZXQvZHJpdmVMb2cvZHJpdmVMb2dFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTs7Ozs7O09BTUc7SUFDSDtRQW1NSTs7Ozs7V0FLRztRQUNILHVCQUFZLFdBQWlDLEVBQUUsVUFBa0U7WUFBbEUsMkJBQUEsRUFBQSxzQkFBa0U7WUFDN0csSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQixPQUFPO2FBQ1Y7WUFDRCxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTyxDQUFDLGFBQWEsQ0FBQztnQkFDN0MsSUFBRyxNQUFNLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztvQkFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO29CQUN4RCxJQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7b0JBQ2hFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFPLENBQUMsS0FBSyxJQUFJLE1BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO2lCQUM1RTtxQkFDRztvQkFDQSw2Q0FBNkM7b0JBQzdDLElBQUksQ0FBQyxpQkFBaUIsR0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUs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VyxHQUFHLFlBQVksQ0FBQztpQkFDckM7cUJBQ0c7b0JBQ0EsT0FBTyxJQUFJLENBQUMscUJBQXNCLENBQUM7aUJBQ3RDO2FBRUo7WUFDRCxPQUFPLElBQUksQ0FBQyxxQkFBc0IsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssMkNBQW1CLEdBQTNCO1lBQ0ksSUFBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksU0FBUyxFQUFDO2dCQUNuQyxJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSyxDQUFDLENBQUMsRUFBQztvQkFDN0IsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyw0Q0FBb0IsR0FBNUI7WUFDSSxJQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxTQUFTLEVBQUM7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDBDQUFrQixHQUExQjtZQUNJLElBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLFNBQVMsRUFBQztnQkFDdEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDL0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU8sQ0FBQyxhQUFjLENBQUMsYUFBYSxDQUFDO2FBQ3BFO1lBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDckMsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQS9sQ0QsSUErbENDO0lBL2xDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElEcml2ZUxvZ0VudHJ5IH0gZnJvbSBcIi4uL2RyaXZlTG9nL2ludGVyZmFjZXMvZHJpdmVMb2dFbnRyeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdEVudHJ5IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvaW50ZXJmYWNlcy9ud2N0RW50cnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSU53Y3RCaXREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvaW50ZXJmYWNlcy9ud2N0Qml0RGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRHJpdmVMb2dFbnRyeUV4cG9ydERhdGEsIElEcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YU9wdGlvbmFsIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9kcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBZGRpdGlvbmFsRGF0YSwgSUFkZGl0aW9uYWxEYXRhIH0gZnJvbSBcIi4vZHJpdmVMb2dFbnRyeUFkZGl0aW9uYWxEYXRhXCI7XHJcbmltcG9ydCB7IERyaXZlTG9nRW50cnlIZWxwZXIgfSBmcm9tIFwiLi9kcml2ZUxvZ0VudHJ5SGVscGVyXCI7XHJcbmltcG9ydCB7IElOd2N0UGFyYW1Hcm91cEluZm8gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9pbnRlcmZhY2VzL253Y3RQYXJhbUdyb3VwSW5mb0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdEVycm9ySW5mbyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL2ludGVyZmFjZXMvbndjdEVycm9ySW5mb0ludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgb25lIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBsb2dnZXIgZW50cnlcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgRHJpdmVMb2dFbnRyeVxyXG4gKiBAaW1wbGVtZW50cyB7SURyaXZlTG9nRW50cnl9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRHJpdmVMb2dFbnRyeSBpbXBsZW1lbnRzIElEcml2ZUxvZ0VudHJ5eyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBwYXJzZWQgZGF0YSBvZiB0aGUgb3JpZ2luYWwgbmV0d29yayBjb21tYW5kIHRyYWNlIGVudHJ5XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtJTndjdEVudHJ5fVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcGFyc2VkRW50cnk6IElOd2N0RW50cnl8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogdW5pcXVlIG51bWJlciBvZiB0aGUgcmVjb3JkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZWNvcmROdW1iZXI6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbW9kdWxlIG5hbWUobmV0d29yayBpbnRlcmZhY2VOYW1lICsgbm9kZW51bWJlciArIGVsZW1lbnRUeXBlICsgY2hhbm5lbCkgb2YgdGhlIGxvZ2dlciBlbnRyeVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbW9kdWxlOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbW9kdWxlSW50ZXJmYWNlOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbW9kdWxlVHlwZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX21vZHVsZUNoYW5uZWw6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkIHRoZSBhcHBsaWNhdGlvbiBvYmplY3QgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfb2JqZWN0TmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBpY29uIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvbkljb25JZDogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBkZXNjcmlwdGlvbiBpbmZvcm1hdGlvbih1c2VkIGZvciBmaWx0ZXJpbmcgYW5kIHNlYXJjaGluZylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2Rlc2NyaXB0aW9uUmF3RGF0YTogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBkZXNjcmlwdGlvbiB0ZXh0IChhbmQgdGhlIGZvcm1hdGVkIHRleHQ7IGUuZy4gcmVkIGZvbnQsLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGVzY3JpcHRpb25UZXh0OiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfZGVzY3JpcHRpb25UZXh0Rm9ybWF0ZWQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgZGVzY3JpcHRpb24gdmFsdWUgaW5mb3JtYXRpb24gKGFuZCB0aGUgZm9ybWF0ZWQgdGV4dDsgZS5nLiByZWQgZm9udCwuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvblZhbHVlV2l0aFVuaXQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvblZhbHVlV2l0aFVuaXRGb3JtYXRlZDogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSB2YWx1ZSBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHVuaXQgZm9yIHRoZSBnaXZlbiB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdW5pdDogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBkZXNjcmlwdGlvbiB0b29sdGlwIHRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2Rlc2NyaXB0aW9uVG9vbHRpcDogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRlaCBkZXNjcmlwdGlvbiBlcnJvciB0ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvbkVycm9yOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHRpbWUgd2hlbiB0aGlzIGxvZyBlbnRyeSBvY2N1cmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICAgcHJpdmF0ZSBfdGltZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSB0aW1lIGRlbGF5IG9mIGEgcmVzcG9uY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Jlc3BvbnNlVGltZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY29yZCB0eXBlIGFuZCBuYW1lIG9mIHJlY29yZCBhbiBsaW5rZWQgcmVjb3JkKHJlc3BvbnNlKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVjb3JkVHlwZTogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3JlY29yZFR5cGVOYW1lOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbGlua2VkUmVjb3JkVHlwZTogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2xpbmtlZFJlY29yZFR5cGVOYW1lOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIE1lcmdlZCByZWNvcmQgdHlwZSBuYW1lIChlLmcuIFJlYWQgUmVxdWVzdC9SZWFkIFJlc3BvbnNlIC0+IFJlYWQgUmVxdWVzdC9SZXNwb25zZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX21lcmdlZFJlY29yZFR5cGVOYW1lOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXMgcGFyYW1ldGVyIGEgYml0UGF0dGVybiBhbmQgaGFzIGJpdFBhdHRlcm4gaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KGJvb2xlYW58dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2lzQml0UGF0dGVybjogYm9vbGVhbnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRpdGlvbmFsIGluZm8gdXNlZCBmb3IgdG9vbHRpcCBpbmZvKGVycm9yIGluZm9zLCBwYXJhbWV0ZXIgZ3JvdXAgaW5mb3MsIGJpdFBhdHRlcm4gaW5mb3MpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoQWRkaXRpb25hbERhdGF8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2FkZGl0aW9uYWxEYXRhOiBBZGRpdGlvbmFsRGF0YXx1bmRlZmluZWQ7XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTb21tZSBlcnJvciBpbmZvcyhpcyBlcnJvciByZWNvcmQsIGlzIHJlc3BvbnNlIGVycm9yIHJlY29yZCwgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KGJvb2xlYW58dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2lzUmVjb3JkRXJyb3I6IGJvb2xlYW58dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfaXNSZXNwb25zZUVycm9yOiBib29sZWFufHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2lzTGlua2VkUmVjb3JkVmFsaWQ6IGJvb2xlYW58dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfaXNMaW5rZWRSZWNvcmRFcnJvcjogYm9vbGVhbnx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9lcnJvclJlc3BvbnNlUGFyTmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHBhciBpZCBhbmQgdGhlIHJlc3BvbnNlIHBhciBpZCBpZiBkaWZmZXJlbnQgZnJvbSBwYXIgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BhcklkOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfZXJyb3JSZXNwb25zZVBhcklkOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRHJpdmVMb2dFbnRyeSB3aXRoIGEgbndjdEVudHJ5IG9yIGRyaXZlTG9nRW50cnlFeHBvcnQgZGF0YVxyXG4gICAgICogQHBhcmFtIHtJTndjdEVudHJ5fSBwYXJzZWRFbnRyeVxyXG4gICAgICogQHBhcmFtIHsoTndjdFRleHRQcm92aWRlcnx1bmRlZmluZWQpfSBud2N0VGV4dFByb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJzZWRFbnRyeTogSU53Y3RFbnRyeXx1bmRlZmluZWQsIGV4cG9ydERhdGE6IElEcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YU9wdGlvbmFsfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5fcGFyc2VkRW50cnkgPSBwYXJzZWRFbnRyeTtcclxuICAgICAgICBpZihleHBvcnREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RXhwb3J0RGF0YShleHBvcnREYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9wYXJzZWRFbnRyeSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5fcGFyc2VkRW50cnk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZFR5cGUgPSByZWNvcmQhLmVudHJ5VHlwZTtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkVHlwZU5hbWUgPSByZWNvcmQhLmVudHJ5VHlwZU5hbWU7XHJcbiAgICAgICAgICAgIGlmKHJlY29yZC5yZXNwb25zZUVudHJ5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5rZWRSZWNvcmRUeXBlID0gcmVjb3JkLnJlc3BvbnNlRW50cnkuZW50cnlUeXBlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlua2VkUmVjb3JkVHlwZU5hbWUgPSByZWNvcmQucmVzcG9uc2VFbnRyeS5lbnRyeVR5cGVOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRWYWxpZCA9IHJlY29yZCEucGFySWQgPT0gcmVjb3JkIS5yZXNwb25zZUVudHJ5LnBhcklkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHZhbHVlcyBpZiBubyByZXNwb25zZSBpcyBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPS0xO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlua2VkUmVjb3JkVHlwZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9wYXJzZWRFbnRyeSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gZW50cnkgZGF0YSBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBleHBvcnQgZGF0YSBvZiB0aGlzIGVudHJ5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lEcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFeHBvcnREYXRhKCk6IElEcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YXtcclxuICAgICAgICAvLyBHZXQgbWFuZGF0b3J5IGV4cG9ydCBkYXRhXHJcbiAgICAgICAgbGV0IGV4cG9ydERhdGEgPSAgeyByZWNOdW1iZXI6IHRoaXMucmVjb3JkTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjVHlwZTogdGhpcy5fcmVjb3JkVHlwZSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNUeXBlTmFtZTogdGhpcy5fcmVjb3JkVHlwZU5hbWUhLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IHRoaXMudGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kSW50ZXJmYWNlOiB0aGlzLmdldE1vZHVsZUludGVyZmFjZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kVHlwZTogdGhpcy5nZXRNb2R1bGVUeXBlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RDaGFubmVsOiB0aGlzLmdldE1vZHVsZUNoYW5uZWwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbE9iamVjdDogdGhpcy5vYmplY3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJJZDogdGhpcy5fcGFySWQhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyTmFtZTogdGhpcy5nZXREZXNjcmlwdGlvblRleHQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhclZhbHVlOiB0aGlzLmdldFZhbHVlKCksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGFkZGl0aW9uYWwgZXhwb3J0IGRhdGFcclxuICAgICAgICBsZXQgdW5pdCA9IHRoaXMuZ2V0VW5pdCgpO1xyXG4gICAgICAgIGlmKHVuaXQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIGV4cG9ydERhdGFbXCJwYXJVbml0XCJdID0gdW5pdDtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBpZih0aGlzLl9saW5rZWRSZWNvcmRUeXBlICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9saW5rZWRSZWNvcmRUeXBlICE9IC0xKXtcclxuICAgICAgICAgICAgLy8gbGlua2VkIHJlY29yZCBhdmFpbGFibGVcclxuICAgICAgICAgICAgZXhwb3J0RGF0YVtcImxpbmtlZFJlY1R5cGVcIl0gPSB0aGlzLl9saW5rZWRSZWNvcmRUeXBlO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9pc0xpbmtlZFJlY29yZEVycm9yICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9pc0xpbmtlZFJlY29yZEVycm9yID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgZXhwb3J0RGF0YVtcImlzTGlua2VkUmVjRXJyb3JcIl0gPSB0aGlzLl9pc0xpbmtlZFJlY29yZEVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2xpbmtlZFJlY29yZFR5cGVOYW1lICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgZXhwb3J0RGF0YVtcImxpbmtlZFJlY1R5cGVOYW1lXCJdID0gdGhpcy5fbGlua2VkUmVjb3JkVHlwZU5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5fZXJyb3JSZXNwb25zZVBhcklkICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9lcnJvclJlc3BvbnNlUGFySWQgIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgZXhwb3J0RGF0YVtcImxpbmtlZFJlY1BhcklkXCJdID0gdGhpcy5fZXJyb3JSZXNwb25zZVBhcklkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9lcnJvclJlc3BvbnNlUGFyTmFtZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGV4cG9ydERhdGFbXCJsaW5rZWRSZWNQYXJOYW1lXCJdID0gdGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyppZih0aGlzLl9saW5rZWRQYXJWYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgZXhwb3J0RGF0YVtcImxpbmtlZFBhclZhbHVlXCJdID0gdGhpcy5fbGlua2VkUGFyVmFsdWU7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMucmVzcG9uc2VUaW1lICE9IFwiXCIpe1xyXG4gICAgICAgICAgICBleHBvcnREYXRhW1wibGlua2VkUmVjRGVsYXlcIl0gPSB0aGlzLnJlc3BvbnNlVGltZTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9hZGRpdGlvbmFsRGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5fYWRkaXRpb25hbERhdGEubWVyZ2VkRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBleHBvcnREYXRhW1wicGFyR3JvdXBcIl0gPSB0aGlzLl9hZGRpdGlvbmFsRGF0YS5nZXRQYXJHcm91cEV4cG9ydERhdGEoKTtcclxuICAgICAgICAgICAgZXhwb3J0RGF0YVtcImVycm9ySW5mb1wiXSA9IHRoaXMuX2FkZGl0aW9uYWxEYXRhLmdldEVycm9ySW5mb0V4cG9ydERhdGEoKTtcclxuICAgICAgICAgICAgZXhwb3J0RGF0YVtcImJpdFBhdHRlcm5cIl0gPSB0aGlzLl9hZGRpdGlvbmFsRGF0YS5nZXRCaXRQYXR0ZXJuRXhwb3J0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHJldHVybiBleHBvcnREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZXhwb3J0IGRhdGEgdG8gdGhpcyBlbnRyeVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURyaXZlTG9nRW50cnlFeHBvcnREYXRhT3B0aW9uYWx9IGV4cG9ydERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgICBwcml2YXRlIHNldEV4cG9ydERhdGEoZXhwb3J0RGF0YTogSURyaXZlTG9nRW50cnlFeHBvcnREYXRhT3B0aW9uYWwpe1xyXG4gICAgICAgIC8vIFNldCBtYW5kYXRvcnkgZXhwb3J0IGRhdGFcclxuICAgICAgICB0aGlzLl9yZWNvcmROdW1iZXIgPSBleHBvcnREYXRhLnJlY051bWJlcjtcclxuICAgICAgICB0aGlzLl9yZWNvcmRUeXBlID0gZXhwb3J0RGF0YS5yZWNUeXBlO1xyXG4gICAgICAgIHRoaXMuX3JlY29yZFR5cGVOYW1lID0gZXhwb3J0RGF0YS5yZWNUeXBlTmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGltZSA9IGV4cG9ydERhdGEudGltZTtcclxuXHJcbiAgICAgICAgdGhpcy5fbW9kdWxlSW50ZXJmYWNlID0gZXhwb3J0RGF0YS5tb2RJbnRlcmZhY2U7XHJcbiAgICAgICAgdGhpcy5fbW9kdWxlVHlwZSA9IGV4cG9ydERhdGEubW9kVHlwZTtcclxuICAgICAgICB0aGlzLl9tb2R1bGVDaGFubmVsID0gZXhwb3J0RGF0YS5tb2RDaGFubmVsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB0aGlzLl9vYmplY3ROYW1lID0gZXhwb3J0RGF0YS5hcHBsT2JqZWN0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3BhcklkID0gZXhwb3J0RGF0YS5wYXJJZDtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblRleHQgPSBleHBvcnREYXRhLnBhck5hbWU7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBleHBvcnREYXRhLnBhclZhbHVlOyAgICAgIFxyXG5cclxuICAgICAgICAvLyBTZXQgYWRkaXRpb25hbCBleHBvcnQgZGF0YSBvciBkZWZhdWx0IHZhbHVlcyBpZiBub3QgYXZhaWxhYmxlXHJcbiAgICAgICAgdGhpcy5fYWRkaXRpb25hbERhdGEgPSBBZGRpdGlvbmFsRGF0YS5jcmVhdGUoZXhwb3J0RGF0YS5wYXJHcm91cCwgZXhwb3J0RGF0YS5lcnJvckluZm8sIGV4cG9ydERhdGEuYml0UGF0dGVybik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lID0gZXhwb3J0RGF0YS5saW5rZWRSZWNEZWxheTtcclxuICAgICAgICBpZih0aGlzLl9yZXNwb25zZVRpbWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lID0gXCJcIjtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5fdW5pdCA9IGV4cG9ydERhdGEucGFyVW5pdDtcclxuICAgICAgICBpZih0aGlzLl91bml0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3VuaXQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9saW5rZWRSZWNvcmRUeXBlID0gZXhwb3J0RGF0YS5saW5rZWRSZWNUeXBlO1xyXG4gICAgICAgIGlmKHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzIGZvciBsaW5rZWRSZWNvcmQgaWYgbm90IGF2YWlsYWJsZVxyXG4gICAgICAgICAgICB0aGlzLl9saW5rZWRSZWNvcmRUeXBlID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpbmtlZFJlY29yZFR5cGVOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzTGlua2VkUmVjb3JkRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLl9lcnJvclJlc3BvbnNlUGFySWQgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fbGlua2VkUmVjb3JkVHlwZU5hbWUgPSBleHBvcnREYXRhLmxpbmtlZFJlY1R5cGVOYW1lO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9saW5rZWRSZWNvcmRUeXBlTmFtZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlua2VkUmVjb3JkVHlwZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pc0xpbmtlZFJlY29yZFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYoZXhwb3J0RGF0YS5saW5rZWRSZWNQYXJOYW1lICE9IHVuZGVmaW5lZCAmJiBleHBvcnREYXRhLmxpbmtlZFJlY1Bhck5hbWUgIT0gZXhwb3J0RGF0YS5wYXJOYW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzTGlua2VkUmVjb3JkVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyp0aGlzLl9saW5rZWRQYXJWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYoZXhwb3J0RGF0YS5saW5rZWRQYXJWYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlua2VkUGFyVmFsdWUgPSBleHBvcnREYXRhLmxpbmtlZFBhclZhbHVlO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9pc0xpbmtlZFJlY29yZEVycm9yID0gZXhwb3J0RGF0YS5pc0xpbmtlZFJlY0Vycm9yO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9pc0xpbmtlZFJlY29yZEVycm9yID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0xpbmtlZFJlY29yZEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lID0gZXhwb3J0RGF0YS5saW5rZWRSZWNQYXJOYW1lO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9lcnJvclJlc3BvbnNlUGFyTmFtZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9lcnJvclJlc3BvbnNlUGFySWQgPSBleHBvcnREYXRhLmxpbmtlZFJlY1BhcklkO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9lcnJvclJlc3BvbnNlUGFySWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJJZCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2lzUmVjb3JkRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLl9hZGRpdGlvbmFsRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9hZGRpdGlvbmFsRGF0YS5tZXJnZWREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9hZGRpdGlvbmFsRGF0YS5tZXJnZWREYXRhLmVycm9ySW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPT0gdW5kZWZpbmVkIHx8IHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBlcnJvciBpbmZvIGlzIGF2YWlsYWJsZSBidXQgbm8gbGlua2VkIHJlY29yZCBpdCBtdXNzdCBiZSBhIHJlY29yZCBlcnJvcihubyByZXNwb25zZSBlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNSZWNvcmRFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pc0JpdFBhdHRlcm4gPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLl9hZGRpdGlvbmFsRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9hZGRpdGlvbmFsRGF0YS5tZXJnZWREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9hZGRpdGlvbmFsRGF0YS5tZXJnZWREYXRhLmJpdFBhdHRlcm4gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0JpdFBhdHRlcm4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbkVycm9yID0gdGhpcy5nZXREZXNjcmlwdGlvbkVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUgbnVtYmVyIG9mIHRoZSBsb2dnZXIgZW50cnlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJlY29yZE51bWJlcigpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYodGhpcy5fcmVjb3JkTnVtYmVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZE51bWJlciA9IHRoaXMuX3BhcnNlZEVudHJ5IS5pbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29yZE51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG1vZHVsZSBkZXNjcmlwdGlvbiBmb3IgdGhpcyBsb2dnZXIgZW50cnkgKGUuZy4gUExLOiBTTDEuSUYyLlNUMSAoQ0hBTiAyKSlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1vZHVsZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fbW9kdWxlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21vZHVsZSA9IHRoaXMuZ2V0TW9kdWxlRm9ybWF0ZWQodGhpcy5nZXRNb2R1bGVJbnRlcmZhY2UoKSwgdGhpcy5nZXRNb2R1bGVUeXBlKCksIHRoaXMuZ2V0TW9kdWxlQ2hhbm5lbCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZHVsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIG9iamVjdCAoZS5nLiBnQXhpczAxKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgb2JqZWN0TmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fb2JqZWN0TmFtZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9vYmplY3ROYW1lID0gdGhpcy5fcGFyc2VkRW50cnkhLmNvbXBvbmVudE5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9vYmplY3ROYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0aGUgaW5mbyB3aGljaCBpcyB1c2VkIGZvciB0aGUgZGVzY3JpcHRpb24gY29sdW1uIGZvciB0aGUgc2VhcmNoIGFuZCBmaWx0ZXJpbmcodGV4dHMgd2l0aG91dCBzdHlsaW5nKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb25SYXdEYXRhKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9kZXNjcmlwdGlvblJhd0RhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25SYXdEYXRhID0gdGhpcy5nZXREZXNjcmlwdGlvblJhd0RhdGEodGhpcy5nZXREZXNjcmlwdGlvblRleHQoKSwgdGhpcy5nZXREZXNjcmlwdGlvblZhbHVlV2l0aFVuaXQoKSwgdGhpcy5nZXRBZGRpdGlvbmFsU2VhcmNoSW5mbygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uUmF3RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpZCBvZiB0aGUgaWNvbiB3aGljaCBvbmUgc2hvdWxkIGJlIHNob3duIGZvciB0aGlzIHJlY29yZCBcclxuICAgICAqIElmIHJlc3BvbnNlIGFuZCByZXF1ZXN0IGlzIGF2YWlsYWJsZSBhbmQgdmFsaWQgdGhlIGlkcyB3aWxsIGJlIGFkZGVkIHdpdGggYSBcIl9cIiBiZXR3ZWVuIC0+IFwiaWQxX2lkMlwiKVxyXG4gICAgICogSWYgcmVzcG9uc2Ugb2YgcmVxdWVzdCBpcyBpbnZhbGlkIGEgcG9zdGZpeCB3aWxsIGJlIGFkZGVkIC0+IFwiX2ludmFsaWRcIiBlLmcuIGlkMV9pbnZhbGlkXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZXNjcmlwdGlvbkljb25JZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fZGVzY3JpcHRpb25JY29uSWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGludmFsaWRMaW5rZWRSZWNvcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Jlc3BvbnNlQXZhaWxhYmxlKCkpe1xyXG4gICAgICAgICAgICAgICAgaW52YWxpZExpbmtlZFJlY29yZCA9ICF0aGlzLmlzUmVzcG9uc2VQYXJJZFZhbGlkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25JY29uSWQgPSBEcml2ZUxvZ0VudHJ5SGVscGVyLmdlbmVyYXRlSWNvbklkKHRoaXMuX3JlY29yZFR5cGUsIHRoaXMuX2xpbmtlZFJlY29yZFR5cGUsIGludmFsaWRMaW5rZWRSZWNvcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb25JY29uSWQ7XHJcbiAgICB9XHJcbiAgICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBvbmx5IHRoZSBkZXNjcmlwdGlvbiB0ZXh0IHdpdGhvdXQgdGhlIHZhbHVlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREZXNjcmlwdGlvblRleHQoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX2Rlc2NyaXB0aW9uVGV4dCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblRleHQgPSB0aGlzLmdldERlc2NyaXB0aW9uVGV4dEZyb21SZWNvcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgb25seSB0aGUgZm9ybWF0ZWQgZGVzY3JpcHRpb24gdGV4dCAoZS5nLiByZWQgZm9udCBjb2xvcikgd2l0aG91dCB0aGUgdmFsdWUgXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZXNjcmlwdGlvblRleHRGb3JtYXRlZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fZGVzY3JpcHRpb25UZXh0Rm9ybWF0ZWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc0Vycm9yUmVjb3JkKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25UZXh0Rm9ybWF0ZWQgPSBEcml2ZUxvZ0VudHJ5SGVscGVyLnNldFN0eWxlRXJyb3IodGhpcy5nZXREZXNjcmlwdGlvblRleHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uVGV4dEZvcm1hdGVkID0gdGhpcy5nZXREZXNjcmlwdGlvblRleHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb25UZXh0Rm9ybWF0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRydW5zIHRoZSBmb3JtYXRlZCB2YWx1ZSAoZS5nLiByZWQgZm9udCBjb2xvcikgd2l0aCB0aGUgdW5pdFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0Rm9ybWF0ZWQoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX2Rlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdEZvcm1hdGVkID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIG9ubHkgc2hvdyB2YWx1ZSBpbiByZWQgaWYgcmVzcG9uc0Vycm9yIGFuZCByZWFkIHJlcXVlc3RcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Jlc3BvbnNlRXJyb3IoKSAmJiB0aGlzLl9yZWNvcmRUeXBlID09IDQpeyAvLyA0IC0+IHJlYWRSZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblZhbHVlV2l0aFVuaXRGb3JtYXRlZCA9IERyaXZlTG9nRW50cnlIZWxwZXIuc2V0U3R5bGVFcnJvcih0aGlzLmdldERlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0Rm9ybWF0ZWQgPSB0aGlzLmdldERlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvblZhbHVlV2l0aFVuaXRGb3JtYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGZvcm1hdGVkIGVycm9yIGRlc2NyaXB0aW9uIFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGdldERlc2NyaXB0aW9uRXJyb3JGb3JtYXRlZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIERyaXZlTG9nRW50cnlIZWxwZXIuc2V0U3R5bGVFcnJvcih0aGlzLmRlc2NyaXB0aW9uRXJyb3IoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0b29sdGlwIHRleHQgZm9yIHRoZSBkZXNjcmlwdGlvbiB0ZXh0IGFuZCB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb25Ub29sdGlwKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9kZXNjcmlwdGlvblRvb2x0aXAgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25Ub29sdGlwID0gdGhpcy5nZXREZXNjcmlwdGlvblRvb2x0aXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uVG9vbHRpcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRpbWUgb2YgdGhlIGxvZ2dlciBlbnRyeVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdGltZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fdGltZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gdGhpcy5fcGFyc2VkRW50cnkhLnRpbWUudG9GaXhlZCg0KS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRpbWUgZGVsYXkgYmV0d2VlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIHJlc3BvbnNlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByZXNwb25zZVRpbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLl9yZXNwb25zZVRpbWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lID0gXCJcIjtcclxuICAgICAgICAgICAgaWYodGhpcy5fcGFyc2VkRW50cnkhLnJlc3BvbnNlRW50cnkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZSA9ICgodGhpcy5fcGFyc2VkRW50cnkhLnJlc3BvbnNlRW50cnkudGltZSAtIHRoaXMuX3BhcnNlZEVudHJ5IS50aW1lKSoxMDAwKS50b0ZpeGVkKDMpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGlzIHRoZSBlbnRyeSBhIGVycm9yIHJlY29yZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNFcnJvclJlY29yZCgpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuX2lzUmVjb3JkRXJyb3IgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5faXNSZWNvcmRFcnJvciA9IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGlzLl9wYXJzZWRFbnRyeTtcclxuICAgICAgICAgICAgaWYocmVjb3JkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1JlY29yZEVycm9yID0gcmVjb3JkLmlzRXJyb3JSZWNvcmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmVjb3JkRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpcyB0aGUgZW50cnkgcmVzcG9uc2UgZXJyb3IgcmVjb3JkKHJlc3BvbnNlIGF2YWlsYWJsZSBidXQgcmVzcG9uc2UgcGFyIGlkIG5vdCB2YWxpZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzUmVzcG9uc2VFcnJvcigpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuX2lzUmVzcG9uc2VFcnJvciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Jlc3BvbnNlRXJyb3IgPSB0aGlzLmlzUmVzcG9uc2VBdmFpbGFibGUoKSAmJiAhdGhpcy5pc1Jlc3BvbnNlUGFySWRWYWxpZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faXNSZXNwb25zZUVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbW9kdWxlIHN0cmluZyggaW50ZXJmYWNlLCB0eXBlLCBjaGFubmVsLC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZUludGVyZmFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsVHlwZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vZHVsQ2hhbm5lbFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TW9kdWxlRm9ybWF0ZWQobW9kdWxlSW50ZXJmYWNlOiBzdHJpbmcsIG1vZHVsVHlwZTogc3RyaW5nLCBtb2R1bENoYW5uZWw6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgbW9kdWxlRm9ybWF0ZWQgPSBtb2R1bGVJbnRlcmZhY2U7XHJcbiAgICAgICAgaWYobW9kdWxUeXBlICE9IFwiXCIpe1xyXG4gICAgICAgICAgICBtb2R1bGVGb3JtYXRlZCArPSBcIiAoXCIrIG1vZHVsVHlwZSArIFwiIFwiICsgbW9kdWxDaGFubmVsICtcIilcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vZHVsZUZvcm1hdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0aGUgaW50ZXJmYWNlIG5hbWUgaW5jbC4gbm9kZW51bWJlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNb2R1bGVJbnRlcmZhY2UoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX21vZHVsZUludGVyZmFjZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tb2R1bGVJbnRlcmZhY2UgPSB0aGlzLmdldE1vZHVsZUludGVyZmFjZUZyb21SZWNvcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZHVsZUludGVyZmFjZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIG1vZHVsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNb2R1bGVUeXBlKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9tb2R1bGVUeXBlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21vZHVsZVR5cGUgPSB0aGlzLmdldE1vZHVsZVR5cGVGcm9tUmVjb3JkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2R1bGVUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY2hhbm5lbCBvZiB0aGUgbW9kdWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vZHVsZUNoYW5uZWwoKTogbnVtYmVye1xyXG4gICAgICAgIGlmKHRoaXMuX21vZHVsZUNoYW5uZWwgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbW9kdWxlQ2hhbm5lbCA9IHRoaXMuZ2V0TW9kdWxlQ2hhbm5lbEZyb21SZWNvcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZHVsZUNoYW5uZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbnRlcmZhY2VuYW1lIGluY2wuIG5vZGVudW1iZXIgZnJvbSBud2N0IGVudHJ5XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vZHVsZUludGVyZmFjZUZyb21SZWNvcmQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJzZWRFbnRyeSEubmV0d29ya0ludGVyZmFjZSArIHRoaXMuZ2V0Tm9kZU51bWJlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlc2NyaXB0aW9uIHJhdyBkYXRhLCBuZWVkZWQgZm9yIHNlYXJjaCBhbiBmaWx0ZXJpbmc7IGUuZyAgcGFyYW0gbmFtZSwgcGFyYW0gdmFsdWUsIGFkZGl0aW9uYWwgaW5mbyBsaWtlIGVycm9ybnVtYmVyLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3x1bmRlZmluZWQpfSBkZXNjcmlwdGlvblRleHRcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3x1bmRlZmluZWQpfSBkZXNjcmlwdGlvblZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWRkaXRpb25hbFNlYXJjaEluZm9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERlc2NyaXB0aW9uUmF3RGF0YShkZXNjcmlwdGlvblRleHQ6IHN0cmluZ3x1bmRlZmluZWQsIGRlc2NyaXB0aW9uVmFsdWU6IHN0cmluZ3x1bmRlZmluZWQsIGFkZGl0aW9uYWxTZWFyY2hJbmZvOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYoZGVzY3JpcHRpb25UZXh0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRlc2NyaXB0aW9uVmFsdWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvblRleHQgKyBcIiBcIiArIGRlc2NyaXB0aW9uVmFsdWUgKyBcIiBcIiArIGFkZGl0aW9uYWxTZWFyY2hJbmZvO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIG9ubHkgdGhlIHZhbHVlIHdpdGhvdXQgdGhlIGRlc2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0KCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9kZXNjcmlwdGlvblZhbHVlV2l0aFVuaXQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0ID0gRHJpdmVMb2dFbnRyeUhlbHBlci5jb21iaW5lVmFsdWVXaXRoVW5pdCh0aGlzLmdldFZhbHVlKCksIHRoaXMuZ2V0VW5pdCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBlcnJvciBkZXNjcmlwdGlvbiB3aXRob3V0IGZvcm1hdGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXNjcmlwdGlvbkVycm9yKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9kZXNjcmlwdGlvbkVycm9yID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uRXJyb3IgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzUmVzcG9uc2VFcnJvcigpKXtcclxuICAgICAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGlzLl9wYXJzZWRFbnRyeTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lID0gcmVjb3JkIS5yZXNwb25zZUVudHJ5IS5wYXJJZE5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvclJlc3BvbnNlUGFySWQgPSByZWNvcmQ/LnJlc3BvbnNlRW50cnk/LnBhcklkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uRXJyb3IgPSB0aGlzLmdldERlc2NyaXB0aW9uRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNjcmlwdGlvbiBlcnJvclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREZXNjcmlwdGlvbkVycm9yKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9lcnJvclJlc3BvbnNlUGFyTmFtZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWUgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNSZXNwb25zZUVycm9yUmVjKCkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lOyAvLyBPbmx5IHJldHVybiB0aGUgcGFyYW1ldGVyIG5hbWUgaWYgcmVzcG9uc2UgZXJyb3JcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiByZXNwb25zZSBwYXIgaWQgaXMgZGlmZmVyZW50IHRvIHJlcXVlc3QgcGFyIGlkIC0+IHNob3cgc3BlY2lhbCBlcnJvclxyXG4gICAgICAgICAgICByZXR1cm4gXCIoRXJyb3I6IFJlc3BQYXJJRD1cIiArIHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lICsgXCIpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVzY3JpcHRpb24gdGV4dCB3aXRob3V0IHRoZSB2YWx1ZSh3aXRoIG9yIHdpdGhvdXQgc3R5bGluZylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RGVzY3JpcHRpb25UZXh0RnJvbVJlY29yZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuX3BhcnNlZEVudHJ5O1xyXG4gICAgICAgIGlmKHJlY29yZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkLnBhcklkTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRydW5zIHRoZSBwYXIgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGFySWQoKTogbnVtYmVye1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcklkID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGlzLl9wYXJzZWRFbnRyeTtcclxuICAgICAgICAgICAgdGhpcy5fcGFySWQgPSByZWNvcmQhLnBhcklkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFySWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIG9ubHkgdGhlIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZhbHVlKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl92YWx1ZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuZ2V0VmFsdWVGcm9tUmVjb3JkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBvbmx5IHRoZSB1bml0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFVuaXQoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX3VuaXQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fdW5pdCA9IHRoaXMuZ2V0VW5pdEZyb21SZWNvcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VuaXQ7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGEgYml0UGF0dGVybiBhbmQgaGFzIHNvbWUgYml0UGF0dGVybiBpbmZvcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzQml0UGF0dGVybigpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuX2lzQml0UGF0dGVybiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5fcGFyc2VkRW50cnk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQml0UGF0dGVybiA9IHJlY29yZCEuaXNCaXRQYXR0ZXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faXNCaXRQYXR0ZXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgd2hpY2ggc2hvdWxkIGJlIHNob3duIGZvciB0aGUgZ2l2ZW4gcmVjb3JkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZhbHVlRnJvbVJlY29yZCgpOnN0cmluZ3tcclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5fcGFyc2VkRW50cnk7XHJcbiAgICAgICAgaWYodGhpcy5pc1Jlc3BvbnNlQXZhaWxhYmxlKCkpe1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBcIlwiOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLl9saW5rZWRSZWNvcmRUeXBlID09IDUpeyAvLyBcIlJEX1JTUFwiID0+IFJlYWRSZXNwb25zZSA9PiBzaG93IHRoZSB2YWx1ZSBmcm9tIHRoZSByZXNwb25zZSBhbmQgbm90IGZyb20gdGhlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtYXRlZFZhbHVlID0gcmVjb3JkIS5yZXNwb25zZUVudHJ5IS5mb3JtYXRlZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBmb3JtYXRlZFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJlY29yZCEuZm9ybWF0ZWRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHJlY29yZCEuaXNSZXNwb25zZSAmJiB0aGlzLl9yZWNvcmRUeXBlID09IDMpeyAvLyBcIldSX1JTUFwiID0+IFdyaXRlUmVzcG9uc2UgPT4gZG9uJ3Qgc2hvdyB0aGUgdmFsdWUgYmVjYXVzZSBpdCBpcyBvbmx5IHNob3duIGluIHRoZSB3cml0ZSByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuX3JlY29yZFR5cGUgPT0gNCl7IC8vIFwiUkRfUkVRXCIgPT4gUmVhZFJlcXVlc3QgPT4gZG9uJ3Qgc2hvdyB0aGUgdmFsdWUgYmVjYXVzZSBpdCBpcyBvbmx5IGEgcmVhZCByZXF1ZXN0IChhbmQgbm90IHRoZSBhbHJlYWR5IHJlYWQgdmFsdWUgZnJvbSB0aGUgcmVzcG9uc2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVjb3JkIS5mb3JtYXRlZFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdW5pdCBmcm9tIHRoZSBud2N0IGVucnkgd2hpY2ggc2hvdWxkIGJlIHNob3duIGZvciB0aGUgZ2l2ZW4gcmVjb3JkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFVuaXRGcm9tUmVjb3JkKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCByZWNvcmQgPSB0aGlzLl9wYXJzZWRFbnRyeTtcclxuICAgICAgICBpZih0aGlzLmlzUmVzcG9uc2VBdmFpbGFibGUoKSl7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IFwiXCI7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPT0gNSl7IC8vIFwiUkRfUlNQXCIgPT4gUmVhZFJlc3BvbnNlID0+IHNob3cgdGhlIHZhbHVlL3VuaXQgZnJvbSB0aGUgcmVzcG9uc2UgYW5kIG5vdCBmcm9tIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJlY29yZCEucmVzcG9uc2VFbnRyeSEudW5pdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSByZWNvcmQhLnVuaXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihyZWNvcmQhLmlzUmVzcG9uc2UgJiYgdGhpcy5fcmVjb3JkVHlwZSA9PSAzKXsgLy8gXCJXUl9SU1BcIiA9PiBXcml0ZVJlc3BvbnNlID0+IGRvbid0IHNob3cgdGhlIHZhbHVlL3VuaXQgYmVjYXVzZSBpdCBpcyBvbmx5IHNob3duIGluIHRoZSB3cml0ZSByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuX3JlY29yZFR5cGUgPT0gNCl7IC8vIFwiUkRfUkVRXCIgPT4gUmVhZFJlcXVlc3QgPT4gZG9uJ3Qgc2hvdyB0aGUgdmFsdWUvdW5pdCBiZWNhdXNlIGl0IGlzIG9ubHkgYSByZWFkIHJlcXVlc3QgKGFuZCBub3QgdGhlIGFscmVhZHkgcmVhZCB2YWx1ZSBmcm9tIHRoZSByZXNwb25zZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWNvcmQhLnVuaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHNvbWUgdGV4dCB3aGljaCBzaG91bGQgYWxzbyBiZSB1c2VkIGZvciB0aGUgc2VhcmNoL2ZpbHRlciBtZWNoYW5pc21zKGUuZy4gZXJyb3JOdW1iZXIsIGVycm9yIGRlc2NyaXB0aW9uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBZGRpdGlvbmFsU2VhcmNoSW5mbygpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGVycm9yTnVtYmVyID0gdGhpcy5nZXRBZGR0aW9uYWxEYXRhKCkubWVyZ2VkRGF0YT8uZXJyb3JJbmZvPy5lcnJvck51bWJlcjtcclxuICAgICAgICBsZXQgYWRkaXRpb25hbERhdGEgPSBcIlwiO1xyXG4gICAgICAgIGlmKGVycm9yTnVtYmVyICE9IHVuZGVmaW5lZCAmJiBlcnJvck51bWJlciAhPSAtMSl7XHJcbiAgICAgICAgICAgYWRkaXRpb25hbERhdGEgPSBlcnJvck51bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmRlc2NyaXB0aW9uRXJyb3IoKSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgLy8gQWRkIGVycm9yIGRlc2NyaXB0aW9uIHRvIHNlYXJjaCBpbmZvXHJcbiAgICAgICAgICAgIGlmKGFkZGl0aW9uYWxEYXRhICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbERhdGEgKz0gXCIgXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWRkaXRpb25hbERhdGEgKz0gdGhpcy5kZXNjcmlwdGlvbkVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsRGF0YTtcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBkZXNjcmlwdGlvbiB0b29sdGlwIHRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RGVzY3JpcHRpb25Ub29sdGlwKCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgdG9vbHRpcCA9IERyaXZlTG9nRW50cnlIZWxwZXIuZ2V0TWFpbkRlc2NyaXB0aW9uVG9vbHRpcCh0aGlzLmdldE1lcmdlZFJlY29yZFR5cGVOYW1lKCksIHRoaXMuZ2V0UGFySWQoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIHBhcmFtZXRlciBuYW1lIGFuZCB2YWx1ZSBpZiBhdmFpbGFibGVcclxuICAgICAgICB0b29sdGlwICs9IHRoaXMuZ2V0RGVzY3JpcHRpb25UZXh0Rm9ybWF0ZWQoKTtcclxuICAgICAgICAvLyBhZGQgdmFsdWUgb25seSBpZiBpdCBpcyBub3QgYSBiaXRwYXR0ZXJuIHZhbHVlXHJcbiAgICAgICAgaWYodGhpcy5nZXREZXNjcmlwdGlvblZhbHVlV2l0aFVuaXRGb3JtYXRlZCgpICE9IFwiXCIgJiYgIXRoaXMuaXNCaXRQYXR0ZXJuKCkpe1xyXG4gICAgICAgICAgICB0b29sdGlwICs9IFwiID0gXCIgKyB0aGlzLmdldERlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdEZvcm1hdGVkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGb3JtYXQgdGhlIGFkZGl0aW9uYWxEYXRhKHBhcmFtR3JvdXBzIGRhdGEsIGJpdG1hc2sgZGF0YSwgLi4uKVxyXG4gICAgICAgIGxldCB0b29sdGlwRm9yUmVjb3JkID0gRHJpdmVMb2dFbnRyeUhlbHBlci5nZXRBZGRpdGlvbmFsRGVzY3JpcHRpb25Ub29sdGlwKHRoaXMuZ2V0QWRkdGlvbmFsRGF0YSgpLm1lcmdlZERhdGEpO1xyXG4gICAgICAgIGlmKHRvb2x0aXBGb3JSZWNvcmQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRvb2x0aXAgKz0gXCI8YnIvPlwiO1xyXG4gICAgICAgICAgICB0b29sdGlwICs9IHRvb2x0aXBGb3JSZWNvcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0b29sdGlwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYWRkaXRpb25hbCBkYXRhIGZvciB0aGlzIGVudHJ5KGUuZy4gZXJyb3IgaW5mbywgcGFyYW0gZ3JvdXAgaW5mbywgYml0IG1hc2sgaW5mbylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FkZGl0aW9uYWxEYXRhfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBZGR0aW9uYWxEYXRhKCk6IEFkZGl0aW9uYWxEYXRhe1xyXG4gICAgICAgIGlmKHRoaXMuX2FkZGl0aW9uYWxEYXRhID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGlzLl9wYXJzZWRFbnRyeTtcclxuICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxEYXRhID0gbmV3IEFkZGl0aW9uYWxEYXRhKCk7XHJcbiAgICAgICAgICAgIC8vIEFkZCB0b29sdGlwIGluZm8gb2YgcmVxdWVzdCBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYoKCF0aGlzLmlzRXJyb3JSZWNvcmQoKSAmJiB0aGlzLl9yZWNvcmRUeXBlICE9IDQpIHx8ICghdGhpcy5pc1Jlc3BvbnNlQXZhaWxhYmxlKCkpKXsgXHJcbiAgICAgICAgICAgICAgICAvLyBzaG93IGluZm8gaWYgbm8gcmVzcG9uc2UgaXMgYXZhaWxhYmxlIG9yXHJcbiAgICAgICAgICAgICAgICAvLyBzaG93IGluZm8gaWYgaXQgaXMgbm90IGFuIHJlYWQgZXJyb3IgcmVxdWVzdCA9PiBmb3IgcmVhZCBlcnJvciByZXF1ZXN0IHRoZSBkYXRhIHdpbGwgYmUgdXNlZCBmcm9tIHRoZSByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldEFkZGl0aW9uYWxEYXRhRm9yUmVjb3JkKHJlY29yZCEpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXRhLmFkZERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQWRkIHRvb2x0aXAgaW5mbyBvZiByZXNwb25zZSBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Jlc3BvbnNlQXZhaWxhYmxlKCkgJiYgKHRoaXMuX3JlY29yZFR5cGUgIT0gMiB8fCB0aGlzLmlzUmVzcG9uc2VFcnJvclJlYygpKSl7IC8vXCJXUl9SRVFcIiB3cml0ZSB2YWx1ZSBhbHJlYWR5IHNob3duIGZyb20gcmVxdWVzdCBkYXRhOyBvbmx5IHNob3cgZXJyb3IgZGF0YSBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRBZGRpdGlvbmFsRGF0YUZvclJlY29yZChyZWNvcmQhLnJlc3BvbnNlRW50cnkhKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YS5hZGREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2FkZGl0aW9uYWxEYXRhID0gYWRkaXRpb25hbERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRpdGlvbmFsRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0b29sdGlwIGRhdGEgZm9yIHRoZSBnaXZlbiByZWNvcmQocmVxdWVzdCBvciByZXNwb25zZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJTndjdEVudHJ5fSByZWNvcmRcclxuICAgICAqIEByZXR1cm5zIHsoSUFkZGl0aW9uYWxEYXRhfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFkZGl0aW9uYWxEYXRhRm9yUmVjb3JkKHJlY29yZDogSU53Y3RFbnRyeSk6IElBZGRpdGlvbmFsRGF0YXx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHBhckdyb3VwOiBBcnJheTxJTndjdFBhcmFtR3JvdXBJbmZvPnx1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGVycm9ySW5mbzogSU53Y3RFcnJvckluZm98dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBiaXRQYXR0ZXJuOiBBcnJheTxJTndjdEJpdERlZmluaXRpb24+fHVuZGVmaW5lZDtcclxuICAgICAgICBpZihyZWNvcmQuaXNQYXJhbWV0ZXJHcm91cCl7XHJcbiAgICAgICAgICAgIC8vIFNob3cgcGFyYW1ldGVyR3JvdXAgaW5mbyBpbiBjYXNlIG9mIHBhcmFtZXRlciBncm91cFxyXG4gICAgICAgICAgICBsZXQgcGFyR3JvdXBEZXNjcmlwdGlvbkRhdGEgPSByZWNvcmQucGFyYW1ldGVyR3JvdXBEZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShwYXJHcm91cERlc2NyaXB0aW9uRGF0YSkpe1xyXG4gICAgICAgICAgICAgICAgcGFyR3JvdXAgPSBwYXJHcm91cERlc2NyaXB0aW9uRGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZXJyb3JJbmZvID0gcGFyR3JvdXBEZXNjcmlwdGlvbkRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmVjb3JkLmlzQml0UGF0dGVybil7XHJcbiAgICAgICAgICAgIC8vIEFkZCBwYXJhbWV0ZXIgbmFtZSBpbiBjYXNlIG9mIGJpdHBhdHRlcm5cclxuICAgICAgICAgICAgYml0UGF0dGVybiA9IHJlY29yZC5iaXRQYXR0ZXJuRGVzY3JpcHRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBhckdyb3VwID09IHVuZGVmaW5lZCAmJiBiaXRQYXR0ZXJuID09IHVuZGVmaW5lZCAmJiBlcnJvckluZm8gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7cGFyR3JvdXA6IHBhckdyb3VwLCBlcnJvckluZm86IGVycm9ySW5mbywgYml0UGF0dGVybjogYml0UGF0dGVybn07XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBub2RlIG51bWJlciB0byB3aGljaCB0aGUgbG9nZ2VyIGVudHJ5IGJlbG9uZ3MgdG9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Tm9kZU51bWJlcigpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IG5vZGVOdW1iZXIgPSB0aGlzLl9wYXJzZWRFbnRyeSEubm9kZU51bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgIGlmKG5vZGVOdW1iZXIgPT0gXCIwXCIpeyAvLyBpZiBub2RlIG51bWJlciBpcyAwIGRvbid0IHNob3cgPT4gZS5nLiBOQ01BTlxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiLlNUXCIgKyBub2RlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY2hhbm5lbCBvZiB0aGUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vZHVsZUNoYW5uZWxGcm9tUmVjb3JkKCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VkRW50cnkhLmNoYW5uZWxOdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgdHlwZSAoZS5nLiBBWElTLCBWQVhJUywgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNb2R1bGVUeXBlRnJvbVJlY29yZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlZEVudHJ5IS5jb21wb25lbnRUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRvb2x0aXAgdGV4dCBmb3IgdGhlIHJlY29yZCB0eXBlKGUuZy4gXCJXcml0ZSBSZXF1ZXN0XCIsIC4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgZ2V0TWVyZ2VkUmVjb3JkVHlwZU5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX21lcmdlZFJlY29yZFR5cGVOYW1lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNSZXNwb25zZUF2YWlsYWJsZSgpKXtcclxuICAgICAgICAgICAgICAgIC8vIFJlc3BvbnNlIGlzIGF2YWlsYWJsZSAtPiBTaG93IHJlcXVlc3QvcmVzcG9uc2UgbWVyZ2VkIHRleHRcclxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZVRleHQgPSB0aGlzLl9saW5rZWRSZWNvcmRUeXBlTmFtZSE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRpZmZDaGFySW5kZXggPSBEcml2ZUxvZ0VudHJ5SGVscGVyLmZpbmRGaXJzdERpZmZlcmVudENoYXIodGhpcy5fcmVjb3JkVHlwZU5hbWUhLCByZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGlmZkNoYXJJbmRleCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVGV4dCA9IHJlc3BvbnNlVGV4dC5zdWJzdHIoZGlmZkNoYXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIHNob3cgcmVzcG9uc2UgdGV4dCBpbiByZWQgYW5kIGFkZCBlcnJvciBpZiByZXNwb25zZSBpcyBpbnZhbGlkXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXJnZWRSZWNvcmRUeXBlTmFtZSA9IHRoaXMuX3JlY29yZFR5cGVOYW1lICsgXCIvXCIgKyByZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21lcmdlZFJlY29yZFR5cGVOYW1lID0gdGhpcy5fcmVjb3JkVHlwZU5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pc1Jlc3BvbnNlRXJyb3IoKSl7IFxyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2VTdGFydEluZGV4ID0gdGhpcy5fbWVyZ2VkUmVjb3JkVHlwZU5hbWUhLmluZGV4T2YoXCIvXCIpO1xyXG4gICAgICAgICAgICBpZihyZXNwb25zZVN0YXJ0SW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3RUZXh0ID0gdGhpcy5fbWVyZ2VkUmVjb3JkVHlwZU5hbWUhLnN1YnN0cigwLHJlc3BvbnNlU3RhcnRJbmRleCsxKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZVRleHQgPSB0aGlzLl9tZXJnZWRSZWNvcmRUeXBlTmFtZSEuc3Vic3RyKHJlc3BvbnNlU3RhcnRJbmRleCsxKTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlVGV4dCA9IERyaXZlTG9nRW50cnlIZWxwZXIuc2V0U3R5bGVFcnJvcihyZXNwb25zZVRleHQgKyBcIiBFcnJvclwiKTsgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdFRleHQgKyByZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZXJnZWRSZWNvcmRUeXBlTmFtZSE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXJnZWRSZWNvcmRUeXBlTmFtZSE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYSByZXNwb25zZSBpcyBhdmFpbGFibGUgZm9yIHRoZSBnaXZlbiByZXF1ZXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1Jlc3BvbnNlQXZhaWxhYmxlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5fbGlua2VkUmVjb3JkVHlwZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9saW5rZWRSZWNvcmRUeXBlICAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHJlc3BvbnNlIGlzIHZhbGlkIGZvciB0aGUgZ2l2ZW4gcmVxdWVzdChzYW1lIGNvbW1hbmQvcGFyYW1ldGVySWQgZm9yIHJlcXVlc3QgYW5kIHJlc3BvbnNlKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNSZXNwb25zZVBhcklkVmFsaWQoKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLl9pc0xpbmtlZFJlY29yZFZhbGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0xpbmtlZFJlY29yZFZhbGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJ1bnMgdHJ1ZSBpZiBhIHJlc3BvbnNlIGVycm9yLCBlbHNlIGZhbHNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1Jlc3BvbnNlRXJyb3JSZWMoKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLl9pc0xpbmtlZFJlY29yZEVycm9yID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGlzLl9wYXJzZWRFbnRyeTtcclxuICAgICAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvciA9IHJlY29yZCEucmVzcG9uc2VFbnRyeSEuaXNFcnJvclJlY29yZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTGlua2VkUmVjb3JkRXJyb3I7XHJcbiAgICB9XHJcbn0iXX0=
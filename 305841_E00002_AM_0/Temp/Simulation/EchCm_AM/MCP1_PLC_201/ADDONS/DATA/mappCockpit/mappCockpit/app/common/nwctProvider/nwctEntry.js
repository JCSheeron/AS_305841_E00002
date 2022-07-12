define(["require", "exports", "./nwctPayloadBytesHelper", "../textProvider/textFormatter/formatterInputArguments/formatterInputArgumentList", "../textProvider/textFormatter/textFormatter", "../textProvider/textFormatter/formatterInputArguments/formatterInputArgumentInt", "../textProvider/textFormatter/formatterInputArguments/formatterInputArgumentFloat", "../textProvider/textFormatter/formatterInputArguments/formatterInputArgumentString", "./interfaces/metaData/acoposParameterDefinition", "./nwctVirtAxHelper"], function (require, exports, nwctPayloadBytesHelper_1, formatterInputArgumentList_1, textFormatter_1, formatterInputArgumentInt_1, formatterInputArgumentFloat_1, formatterInputArgumentString_1, acoposParameterDefinition_1, nwctVirtAxHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctEntry = /** @class */ (function () {
        /**
         * Creates an instance of NwctEntry
         * @param {NwctDataEntryWrapper} wDataEntry
         * @param {NwctMetaDataProvider} nwctMetaDataProvider
         * @param {(NwctTextProvider|undefined)} nwctTextProvider
         * @memberof NwctEntry
         */
        function NwctEntry(wDataEntry, nwctMetaDataProvider, nwctTextProvider) {
            /**
             * Last value of bit pattern if available for this parId on this interface/node/type/channel
             *
             * @type {string}
             * @memberof NwctEntry
             */
            this.lastBitPatternValue = undefined;
            this._wDataEntry = wDataEntry;
            this._nwctMetaDataProvider = nwctMetaDataProvider;
            this._nwctTextProvider = nwctTextProvider;
            this._parameterDefinition = this._nwctMetaDataProvider.getParameterDefinition(this.parId);
            this._dataRecordTypeDefinition = this._nwctMetaDataProvider.getDataRecordTypeDefinition(this.entryType);
        }
        Object.defineProperty(NwctEntry.prototype, "index", {
            /**
             * Returns the index of this entry
             *
             * @readonly
             * @type {number}
             * @memberof NwctEntry
             */
            get: function () {
                return this.dataEntry.index.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "networkInterface", {
            /**
             * Returns the network interface name (e.g. "PLK: IF3")
             *
             * @readonly
             * @type {string}
             * @memberof NwctEntry
             */
            get: function () {
                var networkInterfaceName = "";
                var configEntry = this.nwctConfigEntry;
                if (configEntry != undefined) {
                    var networkInterfaceTypeId = configEntry.networkType.value;
                    var networkInterfaceIndex = configEntry.networkInterfaceIndex.value;
                    networkInterfaceName = this._nwctMetaDataProvider.getNetworkInterfaceName(networkInterfaceTypeId, networkInterfaceIndex);
                }
                return networkInterfaceName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "nodeNumber", {
            /**
             * Returns the nodenumber of the recipient
             *
             * @readonly
             * @type {number}
             * @memberof NwctEntry
             */
            get: function () {
                // the node number is processed prior to passing it, to account for the tricks with virtual axis
                return nwctVirtAxHelper_1.NwctVirtAxHelper.getNodeNumber(this._wDataEntry);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "ncObjectType", {
            /**
             * Returns the nc object type
             *
             * @readonly
             * @type {number}
             * @memberof NwctEntry
             */
            get: function () {
                return this.dataEntry.ncObjectType.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "channelNumber", {
            /**
             * Retruns the channel number on the recipient
             *
             * @readonly
             * @type {number}
             * @memberof NwctEntry
             */
            get: function () {
                // the channel number is processed prior to passing it, to account for the tricks with virtual axis
                return nwctVirtAxHelper_1.NwctVirtAxHelper.getChannelNumber(this._wDataEntry);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "componentName", {
            /**
             * Returns the name of the component (e.g. "gAxis1")
             *
             * @readonly
             * @type {string}
             * @memberof NwctEntry
             */
            get: function () {
                var configEntry = this.nwctConfigEntry;
                if (configEntry != undefined) {
                    return this._nwctMetaDataProvider.getComponentName(configEntry.networkType.value, configEntry.networkInterfaceIndex.value, this.nodeNumber, this.dataEntry.ncObjectType.value, this.channelNumber);
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "componentType", {
            /**
             * Returns the component type (e.g. "AX", "VAX", "CHAN", ...)
             *
             * @readonly
             * @type {string}
             * @memberof NwctEntry
             */
            get: function () {
                var ncObjectTypeId = this.dataEntry.ncObjectType.value;
                return this._nwctMetaDataProvider.getNcObjectTypeName(ncObjectTypeId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "entryType", {
            /**
             * Returns the entry type (e.g. 2 => "write request", 7 => "Info")
             *
             * @readonly
             * @type {number}
             * @memberof NwctEntry
             */
            get: function () {
                var configEntry = this.nwctConfigEntry;
                var dataRecordType = -1;
                if (configEntry != undefined)
                    dataRecordType = configEntry.datagramType.value;
                return dataRecordType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "isResponse", {
            /**
             * Is this entry a response entry
             *
             * @readonly
             * @type {boolean}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._dataRecordTypeDefinition != undefined) {
                    return this._dataRecordTypeDefinition.isResponse;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "entryTypeName", {
            /**
             * Returns the name for the entry type(e.g "Write Response", "Read Request", ..)
             *
             * @returns {string}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._dataRecordTypeDefinition != undefined) {
                    return this._dataRecordTypeDefinition.name;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "isBitPattern", {
            /**
             * Is this entry a parameter with bitpattern information
             *
             * @readonly
             * @type {boolean}
             * @memberof NwctEntry
             */
            get: function () {
                var type = "";
                if (this._parameterDefinition != undefined) {
                    type = this._parameterDefinition.typ;
                }
                // TODO: change to has bit pattern definition or additionally
                if (type == "BP8" || type == "BP16" || type == "BP32") {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "isParameterGroup", {
            /**
             * Is this entry a parameter with parameter group information
             *
             * @readonly
             * @type {boolean}
             * @memberof NwctEntry
             */
            get: function () {
                var type = "";
                if (this._parameterDefinition != undefined) {
                    type = this._parameterDefinition.typ;
                }
                if (type == "PG") {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "time", {
            /**
             * Returns the relativ time in seconds
             *
             * @readonly
             * @type {number}
             * @memberof NwctEntry
             */
            get: function () {
                return this.dataEntry.time.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "parId", {
            /**
             * Returns the parId
             *
             * @readonly
             * @type {number}
             * @memberof NwctEntry
             */
            get: function () {
                return this.dataEntry.parId.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "parIdName", {
            /**
             * Returns the name of the par id(language independent short name)
             *
             * @readonly
             * @type {string}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._parIdName != undefined) {
                    return this._parIdName;
                }
                this._parIdName = this._nwctMetaDataProvider.getParIdName(this.parId, this._parameterDefinition);
                return this._parIdName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "formatedValue", {
            /**
             * Returns the formated value (corresponding to the type of the parameter) for this entry
             *
             * @readonly
             * @type {string}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._formatedValue != undefined) {
                    return this._formatedValue;
                }
                var paramDef = this._parameterDefinition;
                if (paramDef == undefined) {
                    // No parameter definition!
                    console.error("No parameter definition!");
                    paramDef = acoposParameterDefinition_1.AcoposParameterDefinition.create(-1, "", "");
                }
                var ref = { notUsedPayloadBytes: new Uint8Array() };
                this._formatedValue = this.getFormatedValue(this.dataEntry.payloadBytes.value, paramDef, ref);
                return this._formatedValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "unit", {
            /**
             * Returns the unit corresponding to the value of this entry
             *
             * @returns {string}
             * @memberof NwctEntry
             */
            get: function () {
                var paramDef = this._parameterDefinition;
                if (paramDef != undefined) {
                    return this.getUnit(paramDef);
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "bitPatternDefinitions", {
            /**
             * Returns the definitions of the single bits of the bitpattern, or undefined if no bit pattern
             *
             * @readonly
             * @private
             * @type {(Array<IBitDefinitionInfo>|undefined)}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._parameterDefinition != undefined) {
                    return this._parameterDefinition.bits;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "entryValueDataType", {
            /**
             * Returns the dataType of the parameter from this entry (e.g. UI4,X2,R4,...)
             *
             * @readonly
             * @private
             * @type {string}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._parameterDefinition != undefined) {
                    return this._parameterDefinition.typ;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the formated value for the given payload data for the given acoposParameterDefinition
         *
         * @private
         * @param {Uint8Array} payloadBytes
         * @param {IAcoposParameterDefinition} paramDefinition
         * @param {{notUsedPayloadBytes: Uint8Array}} ref
         * @returns {string}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getFormatedValue = function (payloadBytes, paramDefinition, ref) {
            var value = payloadBytes.toString();
            var byteLengthForType = this._nwctMetaDataProvider.byteCount(paramDefinition.typ);
            // get inputData
            var inputData = this.getInputData(payloadBytes, paramDefinition);
            // format input data if available to value string 
            if (inputData != undefined) {
                value = this.formatInputData(inputData, paramDefinition.typ, paramDefinition);
            }
            else {
                value = "";
            }
            // Get unused bytes of payload(needed for parameter group interpretation)
            ref.notUsedPayloadBytes = payloadBytes.slice(byteLengthForType);
            // Find an enum/string representation for the given value/number
            var formatedValue = this.getEnumForValueIfAvailable(value, paramDefinition);
            return formatedValue;
        };
        /**
         * get unit from parameter definition
         *
         * @private
         * @param {IAcoposParameterDefinition} paramDefinition
         * @returns {string}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getUnit = function (paramDefinition) {
            // Output of value with unit and type
            if (paramDefinition.unit != undefined && paramDefinition.unit != "") {
                return paramDefinition.unit;
            }
            return "";
        };
        /**
         * Returns the inputData for the given payloadBytes
         *
         * @private
         * @param {Uint8Array} payloadBytes
         * @param {IAcoposParameterDefinition} paramDefinition
         * @returns {(number|Array<number>|string|undefined)}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getInputData = function (payloadBytes, paramDefinition) {
            return nwctPayloadBytesHelper_1.NwctPayloadBytesHelper.getKaitaiParsedTypes(payloadBytes, paramDefinition.typ);
        };
        /**
         * Formats the inputData into a formated value string
         *
         * @private
         * @param {(number|Array<number>|string)} inputData
         * @param {string} type
         * @param {IAcoposParameterDefinition} paramDefinition
         * @returns {string}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.formatInputData = function (inputData, type, paramDefinition) {
            var formatterString = this._nwctMetaDataProvider.getDefaultFormatterForType(type);
            if (paramDefinition.id >= 0) {
                // Check for special formatter for the given parameter definition
                if (paramDefinition.formatter != undefined) {
                    formatterString = paramDefinition.formatter;
                }
            }
            return this.getAsFormatedString(inputData, formatterString);
        };
        /**
         * Returns the enum/const name for the given value
         *
         * @private
         * @param {string} value
         * @param {IAcoposParameterDefinition} paramDefinition
         * @returns {string}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getEnumForValueIfAvailable = function (value, paramDefinition) {
            if (paramDefinition.values != undefined) {
                var valueDefinition = paramDefinition.values.find(function (def) { return def.val == +value; });
                if (valueDefinition != undefined) {
                    return valueDefinition.name; // Returns the enum name vor the given value
                }
            }
            return value;
        };
        /**
         * Returns a formated string for the given value in the given format
         *
         * @private
         * @param {(number|Array<number>|string)} data
         * @param {string} format
         * @returns {string}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getAsFormatedString = function (data, format) {
            var inputArguments = new formatterInputArgumentList_1.FormatterInputArgumentList();
            if (data instanceof Array) {
                data.forEach(function (num) {
                    inputArguments.push(new formatterInputArgumentInt_1.FormatterInputArgumentInt(num));
                });
            }
            else {
                if (typeof data == "string") {
                    inputArguments.push(new formatterInputArgumentString_1.FormatterInputArgumentString(data));
                }
                else if (Number.isSafeInteger(data)) {
                    inputArguments.push(new formatterInputArgumentInt_1.FormatterInputArgumentInt(data));
                }
                else {
                    inputArguments.push(new formatterInputArgumentFloat_1.FormatterInputArgumentFloat(data));
                }
            }
            return textFormatter_1.TextFormatter.formatArgument(format, inputArguments);
        };
        /**
         * Returns the parameter group infos
         *
         * @private
         * @returns {Array<INwctParamGroupInfo>}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getParameterGroupInfos = function () {
            var _this = this;
            var payloadBytes = this.dataEntry.payloadBytes.value;
            var payloadTempBytes = payloadBytes;
            var nwctParamGroupInfos = new Array();
            if (this._parameterDefinition != undefined) {
                var pg_ids_1 = this._parameterDefinition.pg_ids;
                if (pg_ids_1 != undefined) {
                    pg_ids_1.forEach(function (pg_id) {
                        var pgIdDefinition = _this._nwctMetaDataProvider.getParameterDefinition(pg_id);
                        if (pgIdDefinition != undefined) {
                            var ref = { notUsedPayloadBytes: new Uint8Array() };
                            var type = pgIdDefinition.typ;
                            // If this is a error record parameter group and the current par id is the second one of the group(error info) get the type for the errorinfo
                            var formatedValue = "";
                            var unit = "";
                            if (_this.isErrorRecord == true && pg_id == pg_ids_1[1]) {
                                var errorNumber = nwctPayloadBytesHelper_1.NwctPayloadBytesHelper.getNumber(payloadBytes, 2); // get the errornumber from the first two bytes of payload
                                type = _this.getErrorInfoDataType(errorNumber); // get error info type for the given errorNumber
                                var paraDef = acoposParameterDefinition_1.AcoposParameterDefinition.create(-1, "", type);
                                formatedValue = _this.getFormatedValue(payloadTempBytes, paraDef, ref);
                                unit = _this.getUnit(paraDef);
                            }
                            else {
                                formatedValue = _this.getFormatedValue(payloadTempBytes, pgIdDefinition, ref);
                                unit = _this.getUnit(pgIdDefinition);
                            }
                            // Add bitmask infos
                            var bitPattern = undefined;
                            if (pgIdDefinition.typ.startsWith("BP") && pgIdDefinition.bits != undefined) {
                                bitPattern = _this.getBitMaskDescription(pgIdDefinition.bits, nwctPayloadBytesHelper_1.NwctPayloadBytesHelper.getBPnumber(payloadTempBytes, type));
                            }
                            nwctParamGroupInfos.push({ parId: pg_id, parName: pgIdDefinition.const, parValue: formatedValue, parType: type, parUnit: unit, bitPattern: bitPattern });
                            payloadTempBytes = ref.notUsedPayloadBytes;
                        }
                    });
                }
            }
            return nwctParamGroupInfos;
        };
        Object.defineProperty(NwctEntry.prototype, "isErrorRecord", {
            /**
             * Returns true if this entry is from type error record
             *
             * @readonly
             * @type {boolean}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._isErrorRecord == undefined) {
                    if (this._parameterDefinition != undefined) {
                        this._isErrorRecord = this._nwctMetaDataProvider.isErrorRec(this._parameterDefinition.id, this._parameterDefinition);
                    }
                    else {
                        this._isErrorRecord = false;
                    }
                }
                return this._isErrorRecord;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "errorNumber", {
            /**
             * Returns the error number if available or -1 if this is no error record
             *
             * @returns {number}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._errorNumber == undefined) {
                    this._errorNumber = -1;
                    if (this.isErrorRecord) {
                        // Use payloadBytes from response
                        if (this.responseEntry != undefined) {
                            if (this.responseEntry._parameterDefinition != undefined) {
                                var payloadBytes = this.responseEntry.dataEntry.payloadBytes.value;
                                var ref = { notUsedPayloadBytes: new Uint8Array() };
                                var pg_ids = this.responseEntry._parameterDefinition.pg_ids;
                                if (pg_ids != undefined && pg_ids.length > 0) {
                                    var pgIdDefinition = this._nwctMetaDataProvider.getParameterDefinition(pg_ids[0]);
                                    if (pgIdDefinition != undefined) {
                                        var formatedValue = this.getFormatedValue(payloadBytes, pgIdDefinition, ref);
                                        this._errorNumber = Number(formatedValue);
                                        return this._errorNumber;
                                    }
                                }
                            }
                        }
                    }
                }
                return this._errorNumber;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "responseEntry", {
            /**
             * Returns a corresponding response entry if available, else undefined
             *
             * @readonly
             * @type {(NwctEntry | undefined)}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._wDataEntry.response === undefined) {
                    return undefined;
                }
                return new NwctEntry(this._wDataEntry.response, this._nwctMetaDataProvider, this._nwctTextProvider);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "requestEntry", {
            /**
             * Returns a corresponding request entry if available, else undefined
             *
             * @readonly
             * @type {(NwctEntry | undefined)}
             * @memberof NwctEntry
             */
            get: function () {
                if (this._wDataEntry.request === undefined) {
                    return undefined;
                }
                return new NwctEntry(this._wDataEntry.request, this._nwctMetaDataProvider, this._nwctTextProvider);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "bitPatternDescription", {
            /**
             * Returns the description for a bitpattern
             *
             * @readonly
             * @type {(Array<INwctBitDefinition>|undefined)}
             * @memberof NwctEntry
             */
            get: function () {
                var bitMaskDescription;
                if (this.bitPatternDefinitions != undefined) {
                    var bitPatternValue = this.bitPatternNumber;
                    bitMaskDescription = this.getBitMaskDescription(this.bitPatternDefinitions, bitPatternValue);
                }
                return bitMaskDescription;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "bitPatternNumber", {
            /**
             * Returns the bit pattern number/value
             *
             * @readonly
             * @type {number}
             * @memberof NwctEntry
             */
            get: function () {
                return nwctPayloadBytesHelper_1.NwctPayloadBytesHelper.getBPnumber(this.payload, this.entryValueDataType);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctEntry.prototype, "nwctConfigEntry", {
            /**
             * Returns the configuration entry
             *
             * @readonly
             * @type {(INwctConfigEntry | undefined)}
             * @memberof NwctEntry
             */
            get: function () {
                var _a;
                return (_a = this._wDataEntry.wConfigEntry) === null || _a === void 0 ? void 0 : _a.configEntry;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns a bit mask description in a string array representation
         *
         * @private
         * @param {Array<IBitDefinitionInfo>} bitDefinitions
         * @param {number} data
         * @returns {Array<string>}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getBitMaskDescription = function (bitDefinitions, data) {
            var _this = this;
            var description = new Array();
            bitDefinitions.forEach(function (element) {
                var isBitSet = NwctEntry.isBitSet(data, element.bit);
                var lastValueIsBitSet = isBitSet;
                if (_this.lastBitPatternValue != undefined) {
                    lastValueIsBitSet = NwctEntry.isBitSet(_this.lastBitPatternValue, element.bit);
                }
                var isBitModified = false;
                if (lastValueIsBitSet != isBitSet) {
                    isBitModified = true;
                }
                description.push({ bit: element.bit, name: element.name, isSet: isBitSet, isModified: isBitModified });
            });
            return description;
        };
        Object.defineProperty(NwctEntry.prototype, "parameterGroupDescription", {
            /**
             * Returns a description for a parameter group (also error record)
             *
             * @readonly
             * @type {Array<any>}
             * @memberof NwctEntry
             */
            get: function () {
                var pgInfos = this.getParameterGroupInfos();
                if (this.isErrorRecord) {
                    // Show error record tooltip info(a error record is a special parameter group with error number and additional info)
                    var errorNumber = pgInfos[0].parValue;
                    var errorValue = pgInfos[1].parValue;
                    var errorValueType = pgInfos[1].parType;
                    if (errorValueType == undefined) {
                        errorValueType = "";
                    }
                    var unit = "";
                    var prefix = "Warning ";
                    if (this.isError(Number(errorNumber))) {
                        prefix = "Error ";
                    }
                    prefix += errorNumber + ": ";
                    var eventLogId = this.getEventLogId(Number(errorNumber));
                    var errorText = "";
                    if (this._nwctTextProvider != undefined) {
                        // if valueType is PARID => replace par id by par name
                        if (errorValueType == "PARID") {
                            var parName = this._nwctMetaDataProvider.getParIdName(Number(errorValue), undefined);
                            errorValue = parName;
                            errorValueType = ""; // Change type to string("" is used for string by default)
                        }
                        errorText = prefix + this._nwctTextProvider.getFormattedText(eventLogId, errorValue, errorValueType, unit);
                    }
                    else { // TextProvider not available => show only error info
                        errorText = prefix + "Info: " + errorValue + unit;
                    }
                    return { errorNumber: Number(errorNumber), errorValue: errorValue, errorValueType: errorValueType, errorValueUnit: unit, errorMessage: errorText };
                }
                return pgInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the datatype of the additional info for the given errorNumber
         *
         * @private
         * @param {number} errorNumber
         * @returns {string}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getErrorInfoDataType = function (errorNumber) {
            return this._nwctMetaDataProvider.getErrorInfoDataType(errorNumber);
        };
        Object.defineProperty(NwctEntry.prototype, "payload", {
            /**
             * Returns the payload data
             *
             * @readonly
             * @private
             * @type {Uint8Array}
             * @memberof NwctEntry
             */
            get: function () {
                return this.dataEntry.payloadBytes.value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the event log id for the geiven acp10 error number
         *
         * @private
         * @param {number} errorNumber
         * @returns {string}
         * @memberof NwctEntry
         */
        NwctEntry.prototype.getEventLogId = function (errorNumber) {
            var textId = "";
            //0x0061 0000 => Acopos Facility ID
            //0xC000 0000 => Error
            //0x8000 0000 => Warning
            //0xFFFF FFFF 0000 0000 => - for event log ids
            if (this.isError(errorNumber)) {
                textId = (errorNumber + -1067384832).toString(); // => add FFFF FFFF C061 0000 for errors
            }
            else {
                textId = (errorNumber + -2141126656).toString(); // => add FFFF FFFF 8061 0000 for warnings
            }
            return textId;
        };
        /**
         * Is the given ACP10 error number an error or a warning
         *
         * @private
         * @param {number} errorNumber
         * @returns
         * @memberof NwctEntry
         */
        NwctEntry.prototype.isError = function (errorNumber) {
            if (errorNumber <= 32767 || errorNumber == 65535) {
                return true;
            }
            return false;
        };
        /**
         * Returns the value of the bit for the given index
         *
         * @private
         * @static
         * @param {number} num
         * @param {number} bit
         * @returns {boolean}
         * @memberof NwctEntry
         */
        NwctEntry.isBitSet = function (num, bit) {
            return ((num >> bit) % 2 != 0);
        };
        Object.defineProperty(NwctEntry.prototype, "dataEntry", {
            /**
             * Returns the data entry
             *
             * @readonly
             * @private
             * @type {INwctDataEntry}
             * @memberof NwctEntry
             */
            get: function () {
                return this._wDataEntry.dataEntry;
            },
            enumerable: true,
            configurable: true
        });
        return NwctEntry;
    }());
    exports.NwctEntry = NwctEntry;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdEVudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbndjdFByb3ZpZGVyL253Y3RFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFxQkE7UUFlSTs7Ozs7O1dBTUc7UUFDSCxtQkFBbUIsVUFBaUMsRUFBRSxvQkFBMEMsRUFBRSxnQkFBNEM7WUFnUTlJOzs7OztlQUtHO1lBQ0ksd0JBQW1CLEdBQXFCLFNBQVMsQ0FBQztZQXJRckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLG9CQUFvQixDQUFDO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRixJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RyxDQUFDO1FBU0Qsc0JBQVcsNEJBQUs7WUFQaEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsdUNBQWdCO1lBUDNCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxJQUFJLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxXQUFXLEdBQWtDLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3RFLElBQUcsV0FBVyxJQUFJLFNBQVMsRUFBQztvQkFDeEIsSUFBSSxzQkFBc0IsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztvQkFDM0QsSUFBSSxxQkFBcUIsR0FBRyxXQUFXLENBQUMs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N0Y7aUJBQ0c7Z0JBQ0EsTUFBTSxHQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQywwQ0FBMEM7YUFDL0Y7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDJCQUFPLEdBQWYsVUFBZ0IsV0FBbUI7WUFDL0IsSUFBRyxXQUFXLElBQUksS0FBSyxJQUFJLFdBQVcsSUFBSSxLQUFLLEVBQUM7Z0JBQzVDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1ksa0JBQVEsR0FBdkIsVUFBd0IsR0FBVyxFQUFFLEdBQVc7WUFDNUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBVUQsc0JBQVksZ0NBQVM7WUFSckI7Ozs7Ozs7ZUFPRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBdHdCRCxJQXN3QkM7SUF0d0JZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTndjdERhdGFFbnRyeVdyYXBwZXIgfSBmcm9tIFwiLi9lbnJpY2htZW50L253Y3REYXRhRW50cnlXcmFwcGVyXCI7XHJcbmltcG9ydCB7IElOd2N0RW50cnkgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL253Y3RFbnRyeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdENvbmZpZ0VudHJ5IH0gZnJvbSBcIi4vb2JqUGFyc2VyL2ludGVyZmFjZXMvbndjdENvbmZpZ0VudHJ5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE53Y3RNZXRhRGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4vbndjdE1ldGFEYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgSU53Y3REYXRhRW50cnkgfSBmcm9tIFwiLi9vYmpQYXJzZXIvaW50ZXJmYWNlcy9ud2N0RGF0YUVudHJ5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElCaXREZWZpbml0aW9uSW5mbyB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0YURhdGEvYml0RGVmaW5pdGlvbkluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGFEYXRhL2Fjb3Bvc1BhcmFtZXRlckRlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURhdGFSZWNvcmRUeXBlRGVmaW5pdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0YURhdGEvZGF0YVJlY29yZFR5cGVEZWZpbml0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE53Y3RQYXlsb2FkQnl0ZXNIZWxwZXIgfSBmcm9tIFwiLi9ud2N0UGF5bG9hZEJ5dGVzSGVscGVyXCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0IH0gZnJvbSBcIi4uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0XCI7XHJcbmltcG9ydCB7IFRleHRGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvdGV4dEZvcm1hdHRlclwiO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50SW50IH0gZnJvbSBcIi4uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRJbnRcIjtcclxuaW1wb3J0IHsgRm9ybWF0dGVySW5wdXRBcmd1bWVudEZsb2F0IH0gZnJvbSBcIi4uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRGbG9hdFwiO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nIH0gZnJvbSBcIi4uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmdcIjtcclxuaW1wb3J0IHsgQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0YURhdGEvYWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBOd2N0VGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4vbndjdFRleHRQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJTndjdFBhcmFtR3JvdXBJbmZvIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0UGFyYW1Hcm91cEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSU53Y3RCaXREZWZpbml0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0Qml0RGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBOd2N0VmlydEF4SGVscGVyIH0gZnJvbSBcIi4vbndjdFZpcnRBeEhlbHBlclwiO1xyXG5pbXBvcnQgeyBJTndjdEVycm9ySW5mbyB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdEVycm9ySW5mb0ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE53Y3RFbnRyeSBpbXBsZW1lbnRzIElOd2N0RW50cnl7XHJcblxyXG4gICAgcHJpdmF0ZSBfd0RhdGFFbnRyeSA6IE53Y3REYXRhRW50cnlXcmFwcGVyO1xyXG4gICAgcHJpdmF0ZSBfbndjdE1ldGFEYXRhUHJvdmlkZXI6IE53Y3RNZXRhRGF0YVByb3ZpZGVyO1xyXG4gICAgcHJpdmF0ZSBfbndjdFRleHRQcm92aWRlcjogTndjdFRleHRQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyRGVmaW5pdGlvbjogSUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb258dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfZGF0YVJlY29yZFR5cGVEZWZpbml0aW9uOiBJRGF0YVJlY29yZFR5cGVEZWZpbml0aW9ufHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9mb3JtYXRlZFZhbHVlOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfcGFySWROYW1lOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2lzRXJyb3JSZWNvcmQ6IGJvb2xlYW58dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfZXJyb3JOdW1iZXI6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE53Y3RFbnRyeVxyXG4gICAgICogQHBhcmFtIHtOd2N0RGF0YUVudHJ5V3JhcHBlcn0gd0RhdGFFbnRyeVxyXG4gICAgICogQHBhcmFtIHtOd2N0TWV0YURhdGFQcm92aWRlcn0gbndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7KE53Y3RUZXh0UHJvdmlkZXJ8dW5kZWZpbmVkKX0gbndjdFRleHRQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iod0RhdGFFbnRyeSA6IE53Y3REYXRhRW50cnlXcmFwcGVyLCBud2N0TWV0YURhdGFQcm92aWRlcjogTndjdE1ldGFEYXRhUHJvdmlkZXIsIG53Y3RUZXh0UHJvdmlkZXI6IE53Y3RUZXh0UHJvdmlkZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLl93RGF0YUVudHJ5ID0gd0RhdGFFbnRyeTtcclxuICAgICAgICB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlciA9IG53Y3RNZXRhRGF0YVByb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuX253Y3RUZXh0UHJvdmlkZXIgPSBud2N0VGV4dFByb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlckRlZmluaXRpb24gPSB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlci5nZXRQYXJhbWV0ZXJEZWZpbml0aW9uKHRoaXMucGFySWQpO1xyXG4gICAgICAgIHRoaXMuX2RhdGFSZWNvcmRUeXBlRGVmaW5pdGlvbiA9IHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLmdldERhdGFSZWNvcmRUeXBlRGVmaW5pdGlvbih0aGlzLmVudHJ5VHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGlzIGVudHJ5XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGluZGV4KCkgOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YUVudHJ5LmluZGV4LnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmV0d29yayBpbnRlcmZhY2UgbmFtZSAoZS5nLiBcIlBMSzogSUYzXCIpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5ldHdvcmtJbnRlcmZhY2UoKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBuZXR3b3JrSW50ZXJmYWNlTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNvbmZpZ0VudHJ5IDogSU53Y3RDb25maWdFbnRyeSB8IHVuZGVmaW5lZCA9IHRoaXMubndjdENvbmZpZ0VudHJ5O1xyXG4gICAgICAgIGlmKGNvbmZpZ0VudHJ5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrSW50ZXJmYWNlVHlwZUlkID0gY29uZmlnRW50cnkubmV0d29ya1R5cGUudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrSW50ZXJmYWNlSW5kZXggPSBjb25maWdFbnRyeS5uZXR3b3JrSW50ZXJmYWNlSW5kZXgudmFsdWU7XHJcbiAgICAgICAgICAgIG5ldHdvcmtJbnRlcmZhY2VOYW1lID0gdGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIuZ2V0TmV0d29ya0ludGVyZmFjZU5hbWUobmV0d29ya0ludGVyZmFjZVR5cGVJZCwgbmV0d29ya0ludGVyZmFjZUluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldHdvcmtJbnRlcmZhY2VOYW1lO1xyXG4gICAgfSAgIFxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5vZGVudW1iZXIgb2YgdGhlIHJlY2lwaWVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBub2RlTnVtYmVyKCk6IG51bWJlcntcclxuXHJcbiAgICAgICAgLy8gdGhlIG5vZGUgbnVtYmVyIGlzIHByb2Nlc3NlZCBwcmlvciB0byBwYXNzaW5nIGl0LCB0byBhY2NvdW50IGZvciB0aGUgdHJpY2tzIHdpdGggdmlydHVhbCBheGlzXHJcbiAgICAgICAgcmV0dXJuIE53Y3RWaXJ0QXhIZWxwZXIuZ2V0Tm9kZU51bWJlcih0aGlzLl93RGF0YUVudHJ5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5jIG9iamVjdCB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5jT2JqZWN0VHlwZSgpIDogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFFbnRyeS5uY09iamVjdFR5cGUudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRydW5zIHRoZSBjaGFubmVsIG51bWJlciBvbiB0aGUgcmVjaXBpZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNoYW5uZWxOdW1iZXIoKTogbnVtYmVyeyBcclxuICAgICAgICBcclxuICAgICAgICAvLyB0aGUgY2hhbm5lbCBudW1iZXIgaXMgcHJvY2Vzc2VkIHByaW9yIHRvIHBhc3NpbmcgaXQsIHRvIGFjY291bnQgZm9yIHRoZSB0cmlja3Mgd2l0aCB2aXJ0dWFsIGF4aXNcclxuICAgICAgICByZXR1cm4gTndjdFZpcnRBeEhlbHBlci5nZXRDaGFubmVsTnVtYmVyKHRoaXMuX3dEYXRhRW50cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IChlLmcuIFwiZ0F4aXMxXCIpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudE5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBjb25maWdFbnRyeSA6IElOd2N0Q29uZmlnRW50cnkgfCB1bmRlZmluZWQgPSB0aGlzLm53Y3RDb25maWdFbnRyeTtcclxuICAgICAgICBpZihjb25maWdFbnRyeSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIuZ2V0Q29tcG9uZW50TmFtZShjb25maWdFbnRyeS5uZXR3b3JrVHlwZS52YWx1ZSwgY29uZmlnRW50cnkubmV0d29ya0ludGVyZmFjZUluZGV4LnZhbHVlLCB0aGlzLm5vZGVOdW1iZXIsIHRoaXMuZGF0YUVudHJ5Lm5jT2JqZWN0VHlwZS52YWx1ZSwgdGhpcy5jaGFubmVsTnVtYmVyKTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IHR5cGUgKGUuZy4gXCJBWFwiLCBcIlZBWFwiLCBcIkNIQU5cIiwgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRUeXBlKCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgbmNPYmplY3RUeXBlSWQgPSB0aGlzLmRhdGFFbnRyeS5uY09iamVjdFR5cGUudmFsdWU7ICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlci5nZXROY09iamVjdFR5cGVOYW1lKG5jT2JqZWN0VHlwZUlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVudHJ5IHR5cGUgKGUuZy4gMiA9PiBcIndyaXRlIHJlcXVlc3RcIiwgNyA9PiBcIkluZm9cIilcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZW50cnlUeXBlKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgY29uZmlnRW50cnk6IElOd2N0Q29uZmlnRW50cnkgfCB1bmRlZmluZWQgPSB0aGlzLm53Y3RDb25maWdFbnRyeTtcclxuICAgICAgICBsZXQgZGF0YVJlY29yZFR5cGUgPSAtMTtcclxuICAgICAgICBpZihjb25maWdFbnRyeSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGRhdGFSZWNvcmRUeXBlID0gY29uZmlnRW50cnkuZGF0YWdyYW1UeXBlLnZhbHVlO1xyXG4gICAgICAgIHJldHVybiBkYXRhUmVjb3JkVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHRoaXMgZW50cnkgYSByZXNwb25zZSBlbnRyeVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNSZXNwb25zZSgpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuX2RhdGFSZWNvcmRUeXBlRGVmaW5pdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVJlY29yZFR5cGVEZWZpbml0aW9uLmlzUmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgZm9yIHRoZSBlbnRyeSB0eXBlKGUuZyBcIldyaXRlIFJlc3BvbnNlXCIsIFwiUmVhZCBSZXF1ZXN0XCIsIC4uKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZW50cnlUeXBlTmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YVJlY29yZFR5cGVEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhUmVjb3JkVHlwZURlZmluaXRpb24ubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB0aGlzIGVudHJ5IGEgcGFyYW1ldGVyIHdpdGggYml0cGF0dGVybiBpbmZvcm1hdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNCaXRQYXR0ZXJuKCk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IHR5cGUgPSBcIlwiO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcmFtZXRlckRlZmluaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdHlwZSA9IHRoaXMuX3BhcmFtZXRlckRlZmluaXRpb24udHlwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBUT0RPOiBjaGFuZ2UgdG8gaGFzIGJpdCBwYXR0ZXJuIGRlZmluaXRpb24gb3IgYWRkaXRpb25hbGx5XHJcbiAgICAgICAgaWYodHlwZSA9PSBcIkJQOFwiIHx8IHR5cGUgPT0gXCJCUDE2XCIgfHwgdHlwZSA9PSBcIkJQMzJcIil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB0aGlzIGVudHJ5IGEgcGFyYW1ldGVyIHdpdGggcGFyYW1ldGVyIGdyb3VwIGluZm9ybWF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc1BhcmFtZXRlckdyb3VwKCk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IHR5cGUgPSBcIlwiO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcmFtZXRlckRlZmluaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdHlwZSA9IHRoaXMuX3BhcmFtZXRlckRlZmluaXRpb24udHlwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlID09IFwiUEdcIil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByZWxhdGl2IHRpbWUgaW4gc2Vjb25kc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0aW1lKCk6IG51bWJlcnsgLy8gcmVsYXRpdmUgdGltZSBpbiBzZWNvbmRzXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YUVudHJ5LnRpbWUudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJJZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXJJZCgpOiBudW1iZXJ7IC8vIHBhcklEXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YUVudHJ5LnBhcklkLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgcGFyIGlkKGxhbmd1YWdlIGluZGVwZW5kZW50IHNob3J0IG5hbWUpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBhcklkTmFtZSgpOiBzdHJpbmd7IC8vIHBhcklETmFtZVxyXG4gICAgICAgIGlmKHRoaXMuX3BhcklkTmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFySWROYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wYXJJZE5hbWUgPSB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlci5nZXRQYXJJZE5hbWUodGhpcy5wYXJJZCwgdGhpcy5fcGFyYW1ldGVyRGVmaW5pdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcklkTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGZvcm1hdGVkIHZhbHVlIChjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlIG9mIHRoZSBwYXJhbWV0ZXIpIGZvciB0aGlzIGVudHJ5XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGZvcm1hdGVkVmFsdWUoKTogc3RyaW5neyAvLyB2YWx1ZSB0byB0aGlzIHBhciBpZFxyXG4gICAgICAgIGlmKHRoaXMuX2Zvcm1hdGVkVmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdGVkVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyYW1EZWYgPSB0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9uO1xyXG4gICAgICAgIGlmKHBhcmFtRGVmID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIE5vIHBhcmFtZXRlciBkZWZpbml0aW9uIVxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gcGFyYW1ldGVyIGRlZmluaXRpb24hXCIpO1xyXG4gICAgICAgICAgICBwYXJhbURlZiA9IEFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb24uY3JlYXRlKC0xLFwiXCIsXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWYgPSB7bm90VXNlZFBheWxvYWRCeXRlczogbmV3IFVpbnQ4QXJyYXkoKX07XHJcbiAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2Zvcm1hdGVkVmFsdWUgPSB0aGlzLmdldEZvcm1hdGVkVmFsdWUodGhpcy5kYXRhRW50cnkucGF5bG9hZEJ5dGVzLnZhbHVlLCBwYXJhbURlZiwgcmVmKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0ZWRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVuaXQgY29ycmVzcG9uZGluZyB0byB0aGUgdmFsdWUgb2YgdGhpcyBlbnRyeVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdW5pdCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHBhcmFtRGVmID0gdGhpcy5fcGFyYW1ldGVyRGVmaW5pdGlvbjtcclxuICAgICAgICBpZihwYXJhbURlZiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVbml0KHBhcmFtRGVmKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMYXN0IHZhbHVlIG9mIGJpdCBwYXR0ZXJuIGlmIGF2YWlsYWJsZSBmb3IgdGhpcyBwYXJJZCBvbiB0aGlzIGludGVyZmFjZS9ub2RlL3R5cGUvY2hhbm5lbFxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGFzdEJpdFBhdHRlcm5WYWx1ZTogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmluaXRpb25zIG9mIHRoZSBzaW5nbGUgYml0cyBvZiB0aGUgYml0cGF0dGVybiwgb3IgdW5kZWZpbmVkIGlmIG5vIGJpdCBwYXR0ZXJuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhBcnJheTxJQml0RGVmaW5pdGlvbkluZm8+fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGJpdFBhdHRlcm5EZWZpbml0aW9ucygpOiBBcnJheTxJQml0RGVmaW5pdGlvbkluZm8+fHVuZGVmaW5lZHtcclxuICAgICAgICBpZih0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9uLmJpdHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9ICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGFUeXBlIG9mIHRoZSBwYXJhbWV0ZXIgZnJvbSB0aGlzIGVudHJ5IChlLmcuIFVJNCxYMixSNCwuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgZW50cnlWYWx1ZURhdGFUeXBlKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9uLnR5cDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBmb3JtYXRlZCB2YWx1ZSBmb3IgdGhlIGdpdmVuIHBheWxvYWQgZGF0YSBmb3IgdGhlIGdpdmVuIGFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtVaW50OEFycmF5fSBwYXlsb2FkQnl0ZXNcclxuICAgICAqIEBwYXJhbSB7SUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb259IHBhcmFtRGVmaW5pdGlvblxyXG4gICAgICogQHBhcmFtIHt7bm90VXNlZFBheWxvYWRCeXRlczogVWludDhBcnJheX19IHJlZlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRGb3JtYXRlZFZhbHVlKHBheWxvYWRCeXRlczogVWludDhBcnJheSwgcGFyYW1EZWZpbml0aW9uOiBJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbiwgcmVmOiB7bm90VXNlZFBheWxvYWRCeXRlczogVWludDhBcnJheX0pOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBwYXlsb2FkQnl0ZXMudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgYnl0ZUxlbmd0aEZvclR5cGU6IG51bWJlciA9IHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLmJ5dGVDb3VudChwYXJhbURlZmluaXRpb24udHlwKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGlucHV0RGF0YVxyXG4gICAgICAgIGxldCBpbnB1dERhdGE6IG51bWJlcnxBcnJheTxudW1iZXI+fHN0cmluZ3x1bmRlZmluZWQgPSB0aGlzLmdldElucHV0RGF0YShwYXlsb2FkQnl0ZXMsIHBhcmFtRGVmaW5pdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZm9ybWF0IGlucHV0IGRhdGEgaWYgYXZhaWxhYmxlIHRvIHZhbHVlIHN0cmluZyBcclxuICAgICAgICBpZihpbnB1dERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdElucHV0RGF0YShpbnB1dERhdGEsIHBhcmFtRGVmaW5pdGlvbi50eXAsIHBhcmFtRGVmaW5pdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR2V0IHVudXNlZCBieXRlcyBvZiBwYXlsb2FkKG5lZWRlZCBmb3IgcGFyYW1ldGVyIGdyb3VwIGludGVycHJldGF0aW9uKVxyXG4gICAgICAgIHJlZi5ub3RVc2VkUGF5bG9hZEJ5dGVzID0gcGF5bG9hZEJ5dGVzLnNsaWNlKGJ5dGVMZW5ndGhGb3JUeXBlKTtcclxuXHJcbiAgICAgICAgLy8gRmluZCBhbiBlbnVtL3N0cmluZyByZXByZXNlbnRhdGlvbiBmb3IgdGhlIGdpdmVuIHZhbHVlL251bWJlclxyXG4gICAgICAgIGxldCBmb3JtYXRlZFZhbHVlID0gdGhpcy5nZXRFbnVtRm9yVmFsdWVJZkF2YWlsYWJsZSh2YWx1ZSwgcGFyYW1EZWZpbml0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdGVkVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdW5pdCBmcm9tIHBhcmFtZXRlciBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb259IHBhcmFtRGVmaW5pdGlvblxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRVbml0KHBhcmFtRGVmaW5pdGlvbjogSUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb24pOiBzdHJpbmd7XHJcbiAgICAgICAgLy8gT3V0cHV0IG9mIHZhbHVlIHdpdGggdW5pdCBhbmQgdHlwZVxyXG4gICAgICAgIGlmKHBhcmFtRGVmaW5pdGlvbi51bml0ICE9IHVuZGVmaW5lZCAmJiBwYXJhbURlZmluaXRpb24udW5pdCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtRGVmaW5pdGlvbi51bml0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5wdXREYXRhIGZvciB0aGUgZ2l2ZW4gcGF5bG9hZEJ5dGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VWludDhBcnJheX0gcGF5bG9hZEJ5dGVzXHJcbiAgICAgKiBAcGFyYW0ge0lBY29wb3NQYXJhbWV0ZXJEZWZpbml0aW9ufSBwYXJhbURlZmluaXRpb25cclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfEFycmF5PG51bWJlcj58c3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW5wdXREYXRhKHBheWxvYWRCeXRlczogVWludDhBcnJheSwgcGFyYW1EZWZpbml0aW9uOiBJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbik6IG51bWJlcnxBcnJheTxudW1iZXI+fHN0cmluZ3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIE53Y3RQYXlsb2FkQnl0ZXNIZWxwZXIuZ2V0S2FpdGFpUGFyc2VkVHlwZXMocGF5bG9hZEJ5dGVzLCBwYXJhbURlZmluaXRpb24udHlwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcm1hdHMgdGhlIGlucHV0RGF0YSBpbnRvIGEgZm9ybWF0ZWQgdmFsdWUgc3RyaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KG51bWJlcnxBcnJheTxudW1iZXI+fHN0cmluZyl9IGlucHV0RGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7SUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb259IHBhcmFtRGVmaW5pdGlvblxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmb3JtYXRJbnB1dERhdGEoaW5wdXREYXRhOiBudW1iZXJ8QXJyYXk8bnVtYmVyPnxzdHJpbmcsIHR5cGU6IHN0cmluZywgcGFyYW1EZWZpbml0aW9uOiBJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgZm9ybWF0dGVyU3RyaW5nID0gdGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIuZ2V0RGVmYXVsdEZvcm1hdHRlckZvclR5cGUodHlwZSk7XHJcbiAgICAgICAgaWYocGFyYW1EZWZpbml0aW9uLmlkID49IDApe1xyXG4gICAgICAgICAgICAvLyBDaGVjayBmb3Igc3BlY2lhbCBmb3JtYXR0ZXIgZm9yIHRoZSBnaXZlbiBwYXJhbWV0ZXIgZGVmaW5pdGlvblxyXG4gICAgICAgICAgICBpZihwYXJhbURlZmluaXRpb24uZm9ybWF0dGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXJTdHJpbmcgPSBwYXJhbURlZmluaXRpb24uZm9ybWF0dGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFzRm9ybWF0ZWRTdHJpbmcoaW5wdXREYXRhLCBmb3JtYXR0ZXJTdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZW51bS9jb25zdCBuYW1lIGZvciB0aGUgZ2l2ZW4gdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge0lBY29wb3NQYXJhbWV0ZXJEZWZpbml0aW9ufSBwYXJhbURlZmluaXRpb25cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RW51bUZvclZhbHVlSWZBdmFpbGFibGUodmFsdWU6IHN0cmluZywgcGFyYW1EZWZpbml0aW9uOiBJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbik6IHN0cmluZ3tcclxuICAgICAgICBpZihwYXJhbURlZmluaXRpb24udmFsdWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZURlZmluaXRpb24gPSBwYXJhbURlZmluaXRpb24udmFsdWVzLmZpbmQoZGVmID0+IGRlZi52YWwgPT0gK3ZhbHVlKTtcclxuICAgICAgICAgICAgaWYodmFsdWVEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVEZWZpbml0aW9uLm5hbWU7IC8vIFJldHVybnMgdGhlIGVudW0gbmFtZSB2b3IgdGhlIGdpdmVuIHZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZvcm1hdGVkIHN0cmluZyBmb3IgdGhlIGdpdmVuIHZhbHVlIGluIHRoZSBnaXZlbiBmb3JtYXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyfEFycmF5PG51bWJlcj58c3RyaW5nKX0gZGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBc0Zvcm1hdGVkU3RyaW5nKGRhdGE6IG51bWJlcnxBcnJheTxudW1iZXI+fHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGlucHV0QXJndW1lbnRzOiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCA9IG5ldyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCgpO1xyXG5cclxuICAgICAgICBpZihkYXRhIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2gobnVtID0+e1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcmd1bWVudHMucHVzaChuZXcgRm9ybWF0dGVySW5wdXRBcmd1bWVudEludChudW0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBkYXRhID09IFwic3RyaW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgaW5wdXRBcmd1bWVudHMucHVzaChuZXcgRm9ybWF0dGVySW5wdXRBcmd1bWVudFN0cmluZyhkYXRhIGFzIHN0cmluZykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoTnVtYmVyLmlzU2FmZUludGVnZXIoZGF0YSBhcyBudW1iZXIpKXtcclxuICAgICAgICAgICAgICAgIGlucHV0QXJndW1lbnRzLnB1c2gobmV3IEZvcm1hdHRlcklucHV0QXJndW1lbnRJbnQoZGF0YSBhcyBudW1iZXIpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEFyZ3VtZW50cy5wdXNoKG5ldyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50RmxvYXQoZGF0YSBhcyBudW1iZXIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFRleHRGb3JtYXR0ZXIuZm9ybWF0QXJndW1lbnQoZm9ybWF0LCBpbnB1dEFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJhbWV0ZXIgZ3JvdXAgaW5mb3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElOd2N0UGFyYW1Hcm91cEluZm8+fVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhcmFtZXRlckdyb3VwSW5mb3MoKTpBcnJheTxJTndjdFBhcmFtR3JvdXBJbmZvPntcclxuICAgICAgICBsZXQgcGF5bG9hZEJ5dGVzID0gdGhpcy5kYXRhRW50cnkucGF5bG9hZEJ5dGVzLnZhbHVlO1xyXG4gICAgICAgIGxldCBwYXlsb2FkVGVtcEJ5dGVzID0gcGF5bG9hZEJ5dGVzO1xyXG4gICAgICAgIGxldCBud2N0UGFyYW1Hcm91cEluZm9zID0gbmV3IEFycmF5PElOd2N0UGFyYW1Hcm91cEluZm8+KCk7XHJcbiAgICAgICAgaWYodGhpcy5fcGFyYW1ldGVyRGVmaW5pdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgcGdfaWRzID0gdGhpcy5fcGFyYW1ldGVyRGVmaW5pdGlvbi5wZ19pZHM7XHJcbiAgICAgICAgICAgIGlmKHBnX2lkcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcGdfaWRzLmZvckVhY2gocGdfaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZ0lkRGVmaW5pdGlvbiA9IHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLmdldFBhcmFtZXRlckRlZmluaXRpb24ocGdfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBnSWREZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWYgPSB7bm90VXNlZFBheWxvYWRCeXRlczogbmV3IFVpbnQ4QXJyYXkoKX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBlID0gcGdJZERlZmluaXRpb24udHlwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgZXJyb3IgcmVjb3JkIHBhcmFtZXRlciBncm91cCBhbmQgdGhlIGN1cnJlbnQgcGFyIGlkIGlzIHRoZSBzZWNvbmQgb25lIG9mIHRoZSBncm91cChlcnJvciBpbmZvKSBnZXQgdGhlIHR5cGUgZm9yIHRoZSBlcnJvcmluZm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1hdGVkVmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdW5pdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNFcnJvclJlY29yZCA9PSB0cnVlICYmIHBnX2lkID09IHBnX2lkcyFbMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yTnVtYmVyID0gTndjdFBheWxvYWRCeXRlc0hlbHBlci5nZXROdW1iZXIocGF5bG9hZEJ5dGVzLCAyKTsgLy8gZ2V0IHRoZSBlcnJvcm51bWJlciBmcm9tIHRoZSBmaXJzdCB0d28gYnl0ZXMgb2YgcGF5bG9hZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHRoaXMuZ2V0RXJyb3JJbmZvRGF0YVR5cGUoZXJyb3JOdW1iZXIpOyAvLyBnZXQgZXJyb3IgaW5mbyB0eXBlIGZvciB0aGUgZ2l2ZW4gZXJyb3JOdW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJhRGVmID0gQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbi5jcmVhdGUoLTEsIFwiXCIsIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ZWRWYWx1ZSA9IHRoaXMuZ2V0Rm9ybWF0ZWRWYWx1ZShwYXlsb2FkVGVtcEJ5dGVzLCBwYXJhRGVmLCByZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdCA9IHRoaXMuZ2V0VW5pdChwYXJhRGVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ZWRWYWx1ZSA9IHRoaXMuZ2V0Rm9ybWF0ZWRWYWx1ZShwYXlsb2FkVGVtcEJ5dGVzLCBwZ0lkRGVmaW5pdGlvbiwgcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQgPSB0aGlzLmdldFVuaXQocGdJZERlZmluaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgYml0bWFzayBpbmZvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYml0UGF0dGVybjogQXJyYXk8SU53Y3RCaXREZWZpbml0aW9uPnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBnSWREZWZpbml0aW9uLnR5cC5zdGFydHNXaXRoKFwiQlBcIikgJiYgcGdJZERlZmluaXRpb24uYml0cyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0UGF0dGVybiA9IHRoaXMuZ2V0Qml0TWFza0Rlc2NyaXB0aW9uKHBnSWREZWZpbml0aW9uLmJpdHMsIE53Y3RQYXlsb2FkQnl0ZXNIZWxwZXIuZ2V0QlBudW1iZXIocGF5bG9hZFRlbXBCeXRlcywgdHlwZSkpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbndjdFBhcmFtR3JvdXBJbmZvcy5wdXNoKHtwYXJJZDogcGdfaWQsIHBhck5hbWU6IHBnSWREZWZpbml0aW9uLmNvbnN0LCBwYXJWYWx1ZTogZm9ybWF0ZWRWYWx1ZSwgcGFyVHlwZTogdHlwZSwgcGFyVW5pdDogdW5pdCwgYml0UGF0dGVybjogYml0UGF0dGVybn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVGVtcEJ5dGVzID0gcmVmLm5vdFVzZWRQYXlsb2FkQnl0ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG53Y3RQYXJhbUdyb3VwSW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBlbnRyeSBpcyBmcm9tIHR5cGUgZXJyb3IgcmVjb3JkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc0Vycm9yUmVjb3JkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5faXNFcnJvclJlY29yZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0Vycm9yUmVjb3JkID0gdGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIuaXNFcnJvclJlYyh0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9uLmlkLCB0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNFcnJvclJlY29yZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Vycm9yUmVjb3JkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXJyb3IgbnVtYmVyIGlmIGF2YWlsYWJsZSBvciAtMSBpZiB0aGlzIGlzIG5vIGVycm9yIHJlY29yZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZXJyb3JOdW1iZXIoKTogbnVtYmVye1xyXG4gICAgICAgIGlmKHRoaXMuX2Vycm9yTnVtYmVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yTnVtYmVyID0gLTE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNFcnJvclJlY29yZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgcGF5bG9hZEJ5dGVzIGZyb20gcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVzcG9uc2VFbnRyeSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucmVzcG9uc2VFbnRyeS5fcGFyYW1ldGVyRGVmaW5pdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF5bG9hZEJ5dGVzID0gdGhpcy5yZXNwb25zZUVudHJ5LmRhdGFFbnRyeS5wYXlsb2FkQnl0ZXMudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWYgPSB7bm90VXNlZFBheWxvYWRCeXRlczogbmV3IFVpbnQ4QXJyYXkoKX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwZ19pZHMgPSB0aGlzLnJlc3BvbnNlRW50cnkuX3BhcmFtZXRlckRlZmluaXRpb24ucGdfaWRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwZ19pZHMgIT0gdW5kZWZpbmVkICYmIHBnX2lkcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwZ0lkRGVmaW5pdGlvbiA9IHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLmdldFBhcmFtZXRlckRlZmluaXRpb24ocGdfaWRzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBnSWREZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1hdGVkVmFsdWUgPSB0aGlzLmdldEZvcm1hdGVkVmFsdWUocGF5bG9hZEJ5dGVzLCBwZ0lkRGVmaW5pdGlvbiwgcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJvck51bWJlciA9IE51bWJlcihmb3JtYXRlZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3JOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9yTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2UgZW50cnkgaWYgYXZhaWxhYmxlLCBlbHNlIHVuZGVmaW5lZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyhOd2N0RW50cnkgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJlc3BvbnNlRW50cnkoKSA6IE53Y3RFbnRyeSB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiggdGhpcy5fd0RhdGFFbnRyeS5yZXNwb25zZSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOd2N0RW50cnkodGhpcy5fd0RhdGFFbnRyeS5yZXNwb25zZSwgdGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIsIHRoaXMuX253Y3RUZXh0UHJvdmlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGNvcnJlc3BvbmRpbmcgcmVxdWVzdCBlbnRyeSBpZiBhdmFpbGFibGUsIGVsc2UgdW5kZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KE53Y3RFbnRyeSB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmVxdWVzdEVudHJ5KCkgOiBOd2N0RW50cnkgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgaWYoIHRoaXMuX3dEYXRhRW50cnkucmVxdWVzdCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOd2N0RW50cnkodGhpcy5fd0RhdGFFbnRyeS5yZXF1ZXN0LCB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlciwgdGhpcy5fbndjdFRleHRQcm92aWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNjcmlwdGlvbiBmb3IgYSBiaXRwYXR0ZXJuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KEFycmF5PElOd2N0Qml0RGVmaW5pdGlvbj58dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBiaXRQYXR0ZXJuRGVzY3JpcHRpb24oKTogQXJyYXk8SU53Y3RCaXREZWZpbml0aW9uPnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IGJpdE1hc2tEZXNjcmlwdGlvbjtcclxuICAgICAgICBpZih0aGlzLmJpdFBhdHRlcm5EZWZpbml0aW9ucyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgYml0UGF0dGVyblZhbHVlID0gdGhpcy5iaXRQYXR0ZXJuTnVtYmVyO1xyXG4gICAgICAgICAgICBiaXRNYXNrRGVzY3JpcHRpb24gPSB0aGlzLmdldEJpdE1hc2tEZXNjcmlwdGlvbih0aGlzLmJpdFBhdHRlcm5EZWZpbml0aW9ucywgYml0UGF0dGVyblZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJpdE1hc2tEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGJpdCBwYXR0ZXJuIG51bWJlci92YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBiaXRQYXR0ZXJuTnVtYmVyKCk6IG51bWJlcntcclxuICAgICAgIHJldHVybiBOd2N0UGF5bG9hZEJ5dGVzSGVscGVyLmdldEJQbnVtYmVyKHRoaXMucGF5bG9hZCwgdGhpcy5lbnRyeVZhbHVlRGF0YVR5cGUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyYXRpb24gZW50cnlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoSU53Y3RDb25maWdFbnRyeSB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbndjdENvbmZpZ0VudHJ5KCkgOiBJTndjdENvbmZpZ0VudHJ5IHwgdW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93RGF0YUVudHJ5LndDb25maWdFbnRyeT8uY29uZmlnRW50cnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgYml0IG1hc2sgZGVzY3JpcHRpb24gaW4gYSBzdHJpbmcgYXJyYXkgcmVwcmVzZW50YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQml0RGVmaW5pdGlvbkluZm8+fSBiaXREZWZpbml0aW9uc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEJpdE1hc2tEZXNjcmlwdGlvbihiaXREZWZpbml0aW9uczogQXJyYXk8SUJpdERlZmluaXRpb25JbmZvPiwgZGF0YTogbnVtYmVyKTogQXJyYXk8SU53Y3RCaXREZWZpbml0aW9uPntcclxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGJpdERlZmluaXRpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpc0JpdFNldCA9IE53Y3RFbnRyeS5pc0JpdFNldChkYXRhLCBlbGVtZW50LmJpdCk7XHJcbiAgICAgICAgICAgIGxldCBsYXN0VmFsdWVJc0JpdFNldCA9IGlzQml0U2V0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RCaXRQYXR0ZXJuVmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxhc3RWYWx1ZUlzQml0U2V0ID0gTndjdEVudHJ5LmlzQml0U2V0KHRoaXMubGFzdEJpdFBhdHRlcm5WYWx1ZSwgZWxlbWVudC5iaXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgaXNCaXRNb2RpZmllZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZihsYXN0VmFsdWVJc0JpdFNldCAhPSBpc0JpdFNldCl7XHJcbiAgICAgICAgICAgICAgICBpc0JpdE1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5wdXNoKHtiaXQ6IGVsZW1lbnQuYml0LCBuYW1lOiBlbGVtZW50Lm5hbWUsIGlzU2V0OiBpc0JpdFNldCwgaXNNb2RpZmllZDogaXNCaXRNb2RpZmllZH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGRlc2NyaXB0aW9uIGZvciBhIHBhcmFtZXRlciBncm91cCAoYWxzbyBlcnJvciByZWNvcmQpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXJhbWV0ZXJHcm91cERlc2NyaXB0aW9uKCk6IElOd2N0RXJyb3JJbmZvfEFycmF5PElOd2N0UGFyYW1Hcm91cEluZm8+e1xyXG4gICAgICAgIGxldCBwZ0luZm9zID0gdGhpcy5nZXRQYXJhbWV0ZXJHcm91cEluZm9zKCk7XHJcbiAgICAgICAgaWYodGhpcyEuaXNFcnJvclJlY29yZCl7XHJcbiAgICAgICAgICAgIC8vIFNob3cgZXJyb3IgcmVjb3JkIHRvb2x0aXAgaW5mbyhhIGVycm9yIHJlY29yZCBpcyBhIHNwZWNpYWwgcGFyYW1ldGVyIGdyb3VwIHdpdGggZXJyb3IgbnVtYmVyIGFuZCBhZGRpdGlvbmFsIGluZm8pXHJcbiAgICAgICAgICAgIGxldCBlcnJvck51bWJlcjogc3RyaW5nID0gcGdJbmZvc1swXS5wYXJWYWx1ZTtcclxuICAgICAgICAgICAgbGV0IGVycm9yVmFsdWU6IHN0cmluZ3x1bmRlZmluZWQgPSBwZ0luZm9zWzFdLnBhclZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZXJyb3JWYWx1ZVR5cGUgPSBwZ0luZm9zWzFdLnBhclR5cGU7XHJcbiAgICAgICAgICAgIGlmKGVycm9yVmFsdWVUeXBlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBlcnJvclZhbHVlVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHVuaXQgPSBcIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcHJlZml4ID0gXCJXYXJuaW5nIFwiO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzRXJyb3IoTnVtYmVyKGVycm9yTnVtYmVyKSkpe1xyXG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJFcnJvciBcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlZml4ICs9IGVycm9yTnVtYmVyICsgXCI6IFwiO1xyXG4gICAgICAgICAgICBsZXQgZXZlbnRMb2dJZCA9IHRoaXMuZ2V0RXZlbnRMb2dJZChOdW1iZXIoZXJyb3JOdW1iZXIpKTtcclxuICAgICAgICAgICAgbGV0IGVycm9yVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX253Y3RUZXh0UHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHZhbHVlVHlwZSBpcyBQQVJJRCA9PiByZXBsYWNlIHBhciBpZCBieSBwYXIgbmFtZVxyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3JWYWx1ZVR5cGUgPT0gXCJQQVJJRFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyTmFtZSA9IHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLmdldFBhcklkTmFtZShOdW1iZXIoZXJyb3JWYWx1ZSksIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JWYWx1ZSA9IHBhck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JWYWx1ZVR5cGUgPSBcIlwiOyAvLyBDaGFuZ2UgdHlwZSB0byBzdHJpbmcoXCJcIiBpcyB1c2VkIGZvciBzdHJpbmcgYnkgZGVmYXVsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVycm9yVGV4dCA9IHByZWZpeCArIHRoaXMuX253Y3RUZXh0UHJvdmlkZXIuZ2V0Rm9ybWF0dGVkVGV4dChldmVudExvZ0lkLCBlcnJvclZhbHVlLCBlcnJvclZhbHVlVHlwZSwgdW5pdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXsgLy8gVGV4dFByb3ZpZGVyIG5vdCBhdmFpbGFibGUgPT4gc2hvdyBvbmx5IGVycm9yIGluZm9cclxuICAgICAgICAgICAgICAgIGVycm9yVGV4dCA9IHByZWZpeCArIFwiSW5mbzogXCIgKyBlcnJvclZhbHVlICsgdW5pdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ge2Vycm9yTnVtYmVyOiBOdW1iZXIoZXJyb3JOdW1iZXIpLCBlcnJvclZhbHVlOiBlcnJvclZhbHVlLCBlcnJvclZhbHVlVHlwZTogZXJyb3JWYWx1ZVR5cGUsIGVycm9yVmFsdWVVbml0OiB1bml0LCBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dH07ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwZ0luZm9zOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGF0eXBlIG9mIHRoZSBhZGRpdGlvbmFsIGluZm8gZm9yIHRoZSBnaXZlbiBlcnJvck51bWJlciBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVycm9yTnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEVycm9ySW5mb0RhdGFUeXBlKGVycm9yTnVtYmVyOiBudW1iZXIpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLmdldEVycm9ySW5mb0RhdGFUeXBlKGVycm9yTnVtYmVyKTtcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBheWxvYWQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtVaW50OEFycmF5fVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBwYXlsb2FkKCk6IFVpbnQ4QXJyYXl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YUVudHJ5LnBheWxvYWRCeXRlcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGV2ZW50IGxvZyBpZCBmb3IgdGhlIGdlaXZlbiBhY3AxMCBlcnJvciBudW1iZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVycm9yTnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEV2ZW50TG9nSWQoZXJyb3JOdW1iZXI6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgdGV4dElkID0gXCJcIjtcclxuICAgICAgICAvLzB4MDA2MSAwMDAwID0+IEFjb3BvcyBGYWNpbGl0eSBJRFxyXG4gICAgICAgIC8vMHhDMDAwIDAwMDAgPT4gRXJyb3JcclxuICAgICAgICAvLzB4ODAwMCAwMDAwID0+IFdhcm5pbmdcclxuICAgICAgICAvLzB4RkZGRiBGRkZGIDAwMDAgMDAwMCA9PiAtIGZvciBldmVudCBsb2cgaWRzXHJcbiAgICAgICAgaWYodGhpcy5pc0Vycm9yKGVycm9yTnVtYmVyKSl7IFxyXG4gICAgICAgICAgICB0ZXh0SWQgPSAgKGVycm9yTnVtYmVyICsgLTEwNjczODQ4MzIpLnRvU3RyaW5nKCk7IC8vID0+IGFkZCBGRkZGIEZGRkYgQzA2MSAwMDAwIGZvciBlcnJvcnNcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGV4dElkID0gIChlcnJvck51bWJlciArIC0yMTQxMTI2NjU2KS50b1N0cmluZygpOyAvLyA9PiBhZGQgRkZGRiBGRkZGIDgwNjEgMDAwMCBmb3Igd2FybmluZ3NcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRleHRJZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB0aGUgZ2l2ZW4gQUNQMTAgZXJyb3IgbnVtYmVyIGFuIGVycm9yIG9yIGEgd2FybmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXJyb3JOdW1iZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNFcnJvcihlcnJvck51bWJlcjogbnVtYmVyKXtcclxuICAgICAgICBpZihlcnJvck51bWJlciA8PSAzMjc2NyB8fCBlcnJvck51bWJlciA9PSA2NTUzNSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGJpdCBmb3IgdGhlIGdpdmVuIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiaXRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc0JpdFNldChudW06IG51bWJlciwgYml0OiBudW1iZXIpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiAoKG51bT4+Yml0KSAlIDIgIT0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkYXRhIGVudHJ5XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lOd2N0RGF0YUVudHJ5fVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBkYXRhRW50cnkoKTogSU53Y3REYXRhRW50cnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dEYXRhRW50cnkuZGF0YUVudHJ5O1xyXG4gICAgfVxyXG59Il19
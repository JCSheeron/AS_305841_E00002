define(["require", "exports", "./nwctStaticMetaData"], function (require, exports, nwctStaticMetaData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctMetaDataProvider = /** @class */ (function () {
        /**
         * Creates an instance of TextProvider
         * @memberof NwctMetaDataProvider
         */
        function NwctMetaDataProvider() {
            /**
             * Holds the network interface definitions
             *
             * @private
             * @memberof NwctMetaDataProvider
             */
            this._networkInterfaceDefinitions = new Array();
            /**
             * Holds the component definitions
             *
             * @private
             * @memberof NwctMetaDataProvider
             */
            this._componentDefinitions = new Array();
            /**
             * Holds the data record type definitions
             *
             * @private
             * @memberof NwctMetaDataProvider
             */
            this._dataRecordTypeDefinitions = new Array();
            /**
             * Holds the nc object definitions
             *
             * @private
             * @memberof NwctMetaDataProvider
             */
            this._ncObjectTypeDefinitions = new Array();
            /**
             * Holds the acopos parameter definitions
             *
             * @private
             * @memberof NwctMetaDataProvider
             */
            this._parameterDefinitions = new Array();
            /**
             * Holds the error infos definitions
             *
             * @private
             * @memberof NwctMetaDataProvider
             */
            this._errorInfoDefinitions = new Array();
            /**
             * Holds the info how many bytes should be used(interpreted for the UI) for the given type
             *
             * @private
             * @type {Map<string, number>}
             * @memberof NwctMetaDataProvider
             */
            this._byteCounts = new Map();
            this.initializeDefinitions();
        }
        NwctMetaDataProvider.prototype.byteCount = function (type) {
            var number = this._byteCounts.get(type);
            if (number == undefined) {
                if (type.startsWith("BYTES") || type.startsWith("STR")) {
                    number = 4;
                }
                else {
                    number = 0;
                }
            }
            return number;
        };
        /**
         * Set some static metaDataInfos(E.g. acopos parameter definitions, error info definitions...)
         *
         * @param {NwctStaticMetaData} staticMetaData
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.setStaticMetaData = function (staticMetaData) {
            if (staticMetaData == undefined) {
                staticMetaData = new nwctStaticMetaData_1.NwctStaticMetaData(undefined, undefined);
            }
            this._acoposFubParIdDefinitions = staticMetaData.acoposFubParIdDefinitions;
            this._parameterDefinitions = staticMetaData.parameterDefinitions;
            this._errorInfoDefinitions = staticMetaData.errorInfoDefinitions;
            // Generate fub par id defines from the given data
            this._acoposFubParIdDefinitions.acoposFubParIdRange1Max = this._acoposFubParIdDefinitions.min + this._acoposFubParIdDefinitions.range - 1;
            this._acoposFubParIdDefinitions.acoposFubParIdPLCopenMin = this._acoposFubParIdDefinitions.min + this._acoposFubParIdDefinitions.offsetPLCopen;
            this._acoposFubParIdDefinitions.acoposFubParIdPLCopenMax = this._acoposFubParIdDefinitions.acoposFubParIdPLCopenMin + this._acoposFubParIdDefinitions.range - 1;
        };
        /**
         * Set some dynamic metaDataInfos(E.g. network interface definitions, component definitions, ...)
         *
         * @param {NwctDynamicMetaData} dynamicMetaData
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.setDynamicMetaData = function (dynamicMetaData) {
            if (dynamicMetaData == undefined) {
                // Reset data
                this._networkInterfaceDefinitions = new Array();
                this._componentDefinitions = new Array();
                this._ncObjectTypeDefinitions = new Array();
            }
            else {
                // Use given meta data 
                this._networkInterfaceDefinitions = dynamicMetaData.networkInterfaces;
                this._componentDefinitions = dynamicMetaData.mappMotionObjects;
                this._ncObjectTypeDefinitions = dynamicMetaData.mappMotionObjectTypes;
            }
        };
        /**
         * Returns the NetworkInterfaceName by network interface id and index
         *
         * @param {number} networkInterfaceTypeId
         * @param {number} networkInterfaceIndex
         * @returns {string}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getNetworkInterfaceName = function (networkInterfaceTypeId, networkInterfaceIndex) {
            if (this._networkInterfaceDefinitions != undefined) {
                var networkInterfaceDefinition = this._networkInterfaceDefinitions.find(function (definition) { return definition.id == networkInterfaceTypeId && definition.idx == networkInterfaceIndex; });
                if (networkInterfaceDefinition != undefined) {
                    return networkInterfaceDefinition.name;
                }
            }
            return "NwIfTypId: " + networkInterfaceTypeId.toString() + "; NwIfIdx: " + networkInterfaceIndex.toString();
        };
        /**
         * Returns the componentName by config id
         *
         * @param {number} configId
         * @returns {string}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getComponentName = function (netIfTypeID, netIfIdx, node, objTypeID, channelNr) {
            if (this._componentDefinitions != undefined) {
                var componentDefinition = this._componentDefinitions.find(function (definition) { return definition.netIfTyp == netIfTypeID && definition.netIfIdx == netIfIdx
                    && definition.node == node && definition.objTyp == objTypeID
                    // show component name also if channel number is defined with 0
                    && (definition.channel == channelNr || definition.channel == 0); });
                if (componentDefinition != undefined) {
                    return componentDefinition.name;
                }
            }
            return "";
        };
        /**
         * Returns the ncObjectType name for the given id
         *
         * @param {number} ncObjectTypeId
         * @returns {string}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getNcObjectTypeName = function (ncObjectTypeId) {
            if (this._ncObjectTypeDefinitions != undefined) {
                var ncObjectTypeDefinition = this._ncObjectTypeDefinitions.find(function (definition) { return definition.id == ncObjectTypeId; });
                if (ncObjectTypeDefinition != undefined) {
                    return ncObjectTypeDefinition.name;
                }
            }
            return "ELE" + ncObjectTypeId.toString();
        };
        /**
         * Returns the constant name for the given par id
         *
         * @param {number} parId
         * @param {(IAcoposParameterDefinition|undefined)} parameterDefinition if undefined, the definition will be found automatically(performance!)
         * @returns {string}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getParIdName = function (parId, parameterDefinition) {
            var parIdConst = parId.toString();
            var parIdDefinition = parameterDefinition;
            if (parIdDefinition == undefined) {
                parIdDefinition = this.getParameterDefinition(parId);
            }
            if (parIdDefinition != undefined) {
                parIdConst = parIdDefinition.const;
            }
            // check if it is maybe a FUB par id
            if (parId >= this._acoposFubParIdDefinitions.min && parId <= this._acoposFubParIdDefinitions.acoposFubParIdRange1Max) {
                // find instance number
                var instanceNumber = parId % this._acoposFubParIdDefinitions.instances;
                return parIdConst + "+" + instanceNumber; // Add FUB instance number
            }
            // check if it is maybe a plcOpen FUB par id
            else if (parId >= this._acoposFubParIdDefinitions.acoposFubParIdPLCopenMin && parId <= this._acoposFubParIdDefinitions.acoposFubParIdPLCopenMax) {
                // find instance number
                var instanceNumber = parId % this._acoposFubParIdDefinitions.instances;
                var parIdName = "PLCopen: " + parIdConst;
                parIdName = parIdName + "+" + instanceNumber; // Add FUB instance number;
                return parIdName;
            }
            return parIdConst;
        };
        /**
         * Is the given parameter id an error record
         *
         * @param {number} parId
         * @param {(IAcoposParameterDefinition|undefined)} parameterDefinition
         * @returns {boolean}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.isErrorRec = function (parId, parameterDefinition) {
            var parIdDefinition = parameterDefinition;
            if (parIdDefinition == undefined) {
                parIdDefinition = this.getParameterDefinition(parId);
            }
            if (parIdDefinition != undefined) {
                if (parIdDefinition.attr != undefined) {
                    if (parIdDefinition.attr.find(function (attr) { return attr == "err"; }) != undefined) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * Returns the original par id if the par id is a (plcOpen) FUB instance
         *
         * @private
         * @param {number} parId
         * @returns {number}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getOriginalParIdFromFUBParId = function (parId) {
            if (parId >= this._acoposFubParIdDefinitions.min && parId <= this._acoposFubParIdDefinitions.acoposFubParIdRange1Max) {
                // return original parId for this FUB par id
                var instanceNumber = parId % this._acoposFubParIdDefinitions.instances;
                return parId - instanceNumber;
            }
            if (parId >= this._acoposFubParIdDefinitions.acoposFubParIdPLCopenMin && parId <= this._acoposFubParIdDefinitions.acoposFubParIdPLCopenMax) {
                // return original parId for this plcOpen FUB par id
                var instanceNumber = parId % this._acoposFubParIdDefinitions.instances;
                return (parId - instanceNumber) - this._acoposFubParIdDefinitions.offsetPLCopen;
            }
            return parId;
        };
        /**
         * Returns the parameter definition for the given parameter id
         *
         * @param {number} parId
         * @returns {(IAcoposParameterDefinition|undefined)}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getParameterDefinition = function (parId) {
            var originalParId = this.getOriginalParIdFromFUBParId(parId);
            return this._parameterDefinitions.find(function (definition) { return definition.id == originalParId; });
        };
        /**
         * Returns the dataRecordType definition for the given record type
         *
         * @param {number} recordType
         * @returns {(IDataRecordTypeDefinition|undefined)}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getDataRecordTypeDefinition = function (recordType) {
            return this._dataRecordTypeDefinitions.find(function (definition) { return definition.id == recordType; });
        };
        /**
         * Retruns the datatype for the info of the given errornumber
         *
         * @param {number} errorNumber
         * @returns {string}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getErrorInfoDataType = function (errorNumber) {
            var errorInfoDefinition = this._errorInfoDefinitions.find(function (errorInfo) { return errorInfo.id == errorNumber; });
            if (errorInfoDefinition != undefined) {
                return errorInfoDefinition.typ;
            }
            return "";
        };
        /**
         * Returns the default formatter for the given type
         *
         * @param {string} type
         * @returns {string}
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.getDefaultFormatterForType = function (type) {
            switch (type) {
                case "BOOL":
                case "I1":
                case "I2":
                case "I4":
                case "UI1":
                case "UI2":
                case "UI4":
                case "PARID":
                    return "{1}";
                case "R4":
                case "R8":
                    return "{1|g}";
                case "X1":
                case "X2":
                case "X4":
                    var minCharacterCount = Number(type.slice(1)) * 2;
                    return "0x{1|0" + minCharacterCount + "X}"; // e.g. "0x{1|02X}" or "0x{1|04X}"
                case "BP8":
                case "BP16":
                case "BP32":
                    var byteCount = Number(type.slice(2)) / 8;
                    var formatString = "";
                    var seperator = " ";
                    for (var i = byteCount; i > 0; i--) {
                        formatString += "{" + i + "|08b}";
                        if (i > 1) {
                            formatString += seperator;
                        }
                    }
                    return formatString;
                case "BYTES6":
                    return "{1|02X} {2|02X} {3|02X} {4|02X} {5|02X} {6|02X}";
                case "T5":
                    return "{1}:{2|02}:{3|02}.{4|02} {5|02}.{6|02}.{7}";
            }
            if (type == "DATA" || type == "BRMOD" || type.startsWith("BYTES") || type.startsWith("STR")) {
                return "{1}";
            }
            return "";
        };
        /**
         * Get all the meta data definitions
         *
         * @private
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.initializeDefinitions = function () {
            this.initializeByteCount();
            this.initializeDataRecordTypeDefinitions();
        };
        /**
         * Initialize the _byteCounts map
         *
         * @private
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.initializeByteCount = function () {
            this._byteCounts.set("BOOL", 1);
            this._byteCounts.set("I1", 1);
            this._byteCounts.set("I2", 2);
            this._byteCounts.set("I4", 4);
            this._byteCounts.set("UI1", 1);
            this._byteCounts.set("UI2", 2);
            this._byteCounts.set("UI4", 4);
            this._byteCounts.set("X1", 1);
            this._byteCounts.set("X2", 2);
            this._byteCounts.set("X4", 4);
            this._byteCounts.set("BP8", 1);
            this._byteCounts.set("BP16", 2);
            this._byteCounts.set("BP32", 4);
            this._byteCounts.set("R4", 4);
            this._byteCounts.set("T5", 5);
            this._byteCounts.set("STR6", 6);
            this._byteCounts.set("BYTES6", 6);
            this._byteCounts.set("DATA", 4);
            this._byteCounts.set("BRMOD", 4);
        };
        /**
         * Initialize the DataRecordTypeDefinitions
         *
         * @private
         * @memberof NwctMetaDataProvider
         */
        NwctMetaDataProvider.prototype.initializeDataRecordTypeDefinitions = function () {
            // Set some dummy meta data info
            this._dataRecordTypeDefinitions.push({ id: 1, const: "BRD_COM", name: "", isResponse: false });
            this._dataRecordTypeDefinitions.push({ id: 2, const: "WR_REQ", name: "Write Request", isResponse: false });
            this._dataRecordTypeDefinitions.push({ id: 3, const: "WR_RSP", name: "Write Response", isResponse: true });
            this._dataRecordTypeDefinitions.push({ id: 4, const: "RD_REQ", name: "Read Request", isResponse: false });
            this._dataRecordTypeDefinitions.push({ id: 5, const: "RD_RSP", name: "Read Response", isResponse: true });
            this._dataRecordTypeDefinitions.push({ id: 6, const: "STAT", name: "Drive Status", isResponse: false });
            this._dataRecordTypeDefinitions.push({ id: 7, const: "INFO", name: "Info", isResponse: false });
        };
        return NwctMetaDataProvider;
    }());
    exports.NwctMetaDataProvider = NwctMetaDataProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdE1ldGFEYXRhUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9ud2N0UHJvdmlkZXIvbndjdE1ldGFEYXRhUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7UUFpRkk7OztXQUdHO1FBQ0g7WUFuRkE7Ozs7O2VBS0c7WUFDSyxpQ0FBNEIsR0FBRyxJQUFJLEtBQUssRUFBK0IsQ0FBQztZQUVoRjs7Ozs7ZUFLRztZQUNLLDBCQUFxQixHQUFHLElBQUksS0FBSyxFQUF3QixDQUFDO1lBRWxFOzs7OztlQUtHO1lBQ0ssK0JBQTBCLEdBQUcsSUFBSSxLQUFLLEVBQTZCLENBQUM7WUFFNUU7Ozs7O2VBS0c7WUFDTSw2QkFBd0IsR0FBRyxJQUFJLEtBQUssRUFBMkIsQ0FBQztZQVd6RTs7Ozs7ZUFLRztZQUNLLDBCQUFxQixHQUFHLElBQUksS0FBSyxFQUE4QixDQUFDO1lBRXhFOzs7OztlQUtHO1lBQ0ssMEJBQXFCLEdBQUcsSUFBSSxLQUFLLEVBQXdCLENBQUM7WUFFbEU7Ozs7OztlQU1HO1lBQ0ssZ0JBQVcsR0FBd0IsSUFBSSxHQUFHLEVBQWtCLENBQUM7WUFvQmpFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFuQk0sd0NBQVMsR0FBaEIsVUFBaUIsSUFBWTtZQUN6QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUM7Z0JBQ25CLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDO29CQUNsRCxNQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO3FCQUNHO29CQUNBLE1BQU0sR0FBRyxDQUFDLENBQUM7aUJBQ2Q7YUFDSjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFVRDs7Ozs7V0FLRztRQUNJLGdEQUFpQixHQUF4QixVQUF5QixjQUE0QztZQUNqRSxJQUFHLGNBQWMsSUFBSSxTQUFTLEVBQUM7Z0JBQzNCLGNBQWMsR0FBRyxJQUFJLHVDQUFrQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNqRTtZQUNELElBQUksQ0FBQywwQkFBMEIsR0FBRyxjQUFjLENBQUMseUJBQXlCLENBQUM7WUFDM0UsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQztZQUNqRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsY0FBYyxDQUFDLG9CQUFvQixDQUFDO1lBRWpFLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUMxSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsYUFBYSxDQUFDO1lBQy9JLElBQUksQ0FBQywwQkFBMEIsQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDcEssQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksaURBQWtCLEdBQXpCLFVBQTBCLGVBQThDO1lBQ3BFLElBQUcsZUFBZSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsYUFBYTtnQkFDYixJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxLQUFLLEVBQStCLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLEtBQUssRUFBd0IsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksS0FBSyxFQUEyQixDQUFDO2FBQ3hFO2lCQUNHO2dCQUNBLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLDRCQUE0QixHQUFHLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLHdCQUF3QixHQUFHLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQzthQUN6RTtRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksc0RBQXVCLEdBQTlCLFVBQStCLHNCQUE4QixFQUFFLHFCQUE2QjtZQUN4RixJQUFHLElBQUksQ0FBQyw0QkFBNEIsSUFBSSxTQUFTLEVBQUM7Z0JBQzlDLElBQUksMEJBQTBCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxVQUFBLFVBQVUsSUFBSSxPQUFBLFVBQVUsQ0FBQyxFQUFFLElBQUksc0JBQXNCLElBQUksVUFBVSxDQUFDLEdBQUcsSUFBSSxxQkFBcUIsRUFBbEYsQ0FBa0YsQ0FBQyxDQUFDO2dCQUMxSyxJQUFHLDBCQUEwQixJQUFJLFNBQVMsRUFBQztvQkFDdkMsT0FBTywwQkFBMEIsQ0FBQyxJQUFJLENBQUM7aUJBQzFDO2FBQ0o7WUFFRCxPQUFPLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxhQUFhLEdBQUcscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEgsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtDQUFnQixHQUF2QixVQUF3QixXQUFtQixFQUFFLFFBQWdCLEVBQUUsSUFBWSxFQUFFLFNBQWlCLEVBQUUsU0FBaUI7WUFDN0csSUFBRyxJQUFJLENBQUMscUJBQXFCLElBQUksU0FBUyxFQUFDO2dCQUN2QyxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxVQUFVLENBQUMsUUFBUSxJQUFJLFdBQVcsSUFBSSxVQUFVLENBQUMsUUFBUSxJQUFJLFFBQVE7dUJBQ2xGLFVBQVUsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksU0FBUztvQkFDNUQsK0RBQStEO3VCQUM1RCxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksU0FBUyxJQUFJLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEVBSC9DLENBRytDLENBQUMsQ0FBQztnQkFDekgsSUFBRyxtQkFBbUIsSUFBSSxTQUFTLEVBQUM7b0JBQ2hDLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDO2lCQUNuQzthQUNKO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksa0RBQW1CLEdBQTFCLFVBQTJCLGNBQXNCO1lBQzdDLElBQUcsSUFBSSxDQUFDLHdCQUF3QixJQUFJLFNBQVMsRUFBQztnQkFDMUMsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFVBQUEsVUFBVSxJQUFJLE9BQUEsVUFBVSxDQUFDLEVBQUUsSUFBSSxjQUFjLEVBQS9CLENBQStCLENBQUMsQ0FBQztnQkFDL0csSUFBRyxzQkFBc0IsSUFBSSxTQUFTLEVBQUM7b0JBQ25DLE9BQU8sc0JBQXNCLENBQUMsSUFBSSxDQUFDO2lCQUN0QzthQUNKO1lBQ0QsT0FBTyxLQUFLLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksMkNBQVksR0FBbkIsVUFBb0IsS0FBYSxFQUFFLG1CQUF5RDtZQUN4RixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsSUFBSSxlQUFlLEdBQUcsbUJBQW1CLENBQUM7WUFDMUMsSUFBRyxlQUFlLElBQUksU0FBUyxFQUFDO2dCQUM1QixlQUFlLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hEO1lBQ0QsSUFBRyxlQUFlLElBQUksU0FBUyxFQUFDO2dCQUM1QixVQUFVLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQzthQUN0QztZQUVELG9DQUFvQztZQUNwQyxJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsdUJBQXVCLEVBQUM7Z0JBQ2hILHVCQUF1QjtnQkFDdkIsSUFBSSxjQUFjLEdBQUcsS0FBSyxHQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUM7Z0JBQ3JFLE9BQU8sVUFBVSxHQUFHLEdBQUcsR0FBRyxjQUFjLENBQUMsQ0FBQywwQkFBMEI7YUFDdkU7WUFDQSw0Q0FBNEM7aUJBQ3hDLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQywwQkFBMEIsQ0FBQyx3QkFBd0IsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLDBCQUEwQixDQUFDLHdCQUF3QixFQUFDO2dCQUMzSSx1QkFBdUI7Z0JBQ3ZCLElBQUksY0FBYyxHQUFHLEtBQUssR0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxDQUFDO2dCQUVyRSxJQUFJLFNBQVMsR0FBRyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUN6QyxTQUFTLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxjQUFjLENBQUMsQ0FBQywyQkFBMkI7Z0JBRXpFLE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1lBQ0QsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSx5Q0FBVSxHQUFqQixVQUFrQixLQUFhLEVBQUUsbUJBQXlEO1lBQ3RGLElBQUksZUFBZSxHQUFHLG1CQUFtQixDQUFDO1lBQzFDLElBQUcsZUFBZSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4RDtZQUNELElBQUcsZUFBZSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsSUFBRyxlQUFlLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztvQkFDakMsSUFBRyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksSUFBSSxLQUFLLEVBQWIsQ0FBYSxDQUFDLElBQUksU0FBUyxFQUFDO3dCQUM3RCxPQUFPLElBQUksQ0FBQztxQkFDZjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSywyREFBNEIsR0FBcEMsVUFBcUMsS0FBYTtZQUM5QyxJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsdUJBQXVCLEVBQUM7Z0JBQ2hILDRDQUE0QztnQkFDNUMsSUFBSSxjQUFjLEdBQUcsS0FBSyxHQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUM7Z0JBQ3JFLE9BQU8sS0FBSyxHQUFDLGNBQWMsQ0FBQzthQUMvQjtZQUNELElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQywwQkFBMEIsQ0FBQyx3QkFBd0IsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLDBCQUEwQixDQUFDLHdCQUF3QixFQUFDO2dCQUN0SSxvREFBb0Q7Z0JBQ3BELElBQUksY0FBYyxHQUFHLEtBQUssR0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxDQUFDO2dCQUNyRSxPQUFPLENBQUMsS0FBSyxHQUFDLGNBQWMsQ0FBQyxHQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLENBQUM7YUFDL0U7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0kscURBQXNCLEdBQTdCLFVBQThCLEtBQWE7WUFDdkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxVQUFBLFVBQVUsSUFBSSxPQUFBLFVBQVUsQ0FBQyxFQUFFLElBQUksYUFBYSxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDekYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDBEQUEyQixHQUFsQyxVQUFtQyxVQUFrQjtZQUNqRCxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxVQUFVLENBQUMsRUFBRSxJQUFJLFVBQVUsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1FBQzNGLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxtREFBb0IsR0FBM0IsVUFBNEIsV0FBbUI7WUFDM0MsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsU0FBUyxDQUFDLEVBQUUsSUFBSSxXQUFXLEVBQTNCLENBQTJCLENBQUMsQ0FBQztZQUNwRyxJQUFHLG1CQUFtQixJQUFJLFNBQVMsRUFBQztnQkFDaEMsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7YUFDbEM7WUFDRCxPQUFPLEVBQUUsQ0FBQTtRQUNiLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSx5REFBMEIsR0FBakMsVUFBa0MsSUFBWTtZQUMxQyxRQUFPLElBQUksRUFBQztnQkFDUixLQUFLLE1BQU0sQ0FBQztnQkFDWixLQUFLLElBQUksQ0FBQztnQkFDVixLQUFLLElBQUksQ0FBQztnQkFDVixLQUFLLElBQUksQ0FBQztnQkFDVixLQUFLLEtBQUssQ0FBQztnQkFDWCxLQUFLLEtBQUssQ0FBQztnQkFDWCxLQUFLLEtBQUssQ0FBQztnQkFDWCxLQUFLLE9BQU87b0JBQ1IsT0FBTyxLQUFLLENBQUM7Z0JBQ2pCLEtBQUssSUFBSSxDQUFDO2dCQUNWLEtBQUssSUFBSTtvQkFDTCxPQUFPLE9BQU8sQ0FBQztnQkFDbkIsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLElBQUksaUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7b0JBQ2hELE9BQU8sUUFBUSxHQUFHLGlCQUFpQixHQUFHLElBQUksQ0FBQyxDQUFDLGtDQUFrQztnQkFDbEYsS0FBSyxLQUFLLENBQUM7Z0JBQ1gsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxNQUFNO29CQUNQLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQ3RCLElBQUksU0FBUyxHQUFJLEdBQUcsQ0FBQztvQkFDckIsS0FBSSxJQUFJLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDOUIsWUFBWSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO3dCQUNsQyxJQUFHLENBQUMsR0FBRyxDQUFDLEVBQUM7NEJBQ0wsWUFBWSxJQUFJLFNBQVMsQ0FBQzt5QkFDN0I7cUJBQ0o7b0JBQ0QsT0FBTyxZQUFZLENBQUM7Z0JBQ3hCLEtBQUssUUFBUTtvQkFDVCxPQUFPLGlEQUFpRCxDQUFDO2dCQUM3RCxLQUFLLElBQUk7b0JBQ0wsT0FBTyw0Q0FBNEMsQ0FBQzthQUMzRDtZQUNELElBQUcsSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQztnQkFDdkYsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLG9EQUFxQixHQUE3QjtZQUNJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLGtEQUFtQixHQUEzQjtZQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxrRUFBbUMsR0FBM0M7WUFDSSxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDeEcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUN0RyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDbEcsQ0FBQztRQUNMLDJCQUFDO0lBQUQsQ0FBQyxBQTNaRCxJQTJaQztJQTNaWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTmV0d29ya0ludGVyZmFjZURlZmluaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGFEYXRhL25ldHdvcmtJbnRlcmZhY2VEZWZpbml0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tZXRhRGF0YS9jb21wb25lbnREZWZpbml0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElOY09iamVjdFR5cGVEZWZpbml0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tZXRhRGF0YS9uY09iamVjdFR5cGVEZWZpbml0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElEYXRhUmVjb3JkVHlwZURlZmluaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGFEYXRhL2RhdGFSZWNvcmRUeXBlRGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQWNvcG9zRnViUGFySWREZWZpbml0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tZXRhRGF0YS9hY29wb3NGdWJQYXJJZERlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGFEYXRhL2Fjb3Bvc1BhcmFtZXRlckRlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUVycm9ySW5mb0RlZmluaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGFEYXRhL2Vycm9ySW5mb0RlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTndjdFN0YXRpY01ldGFEYXRhIH0gZnJvbSBcIi4vbndjdFN0YXRpY01ldGFEYXRhXCI7XHJcbmltcG9ydCB7IE53Y3REeW5hbWljTWV0YURhdGEgfSBmcm9tIFwiLi9ud2N0RHluYW1pY01ldGFEYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTndjdE1ldGFEYXRhUHJvdmlkZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbmV0d29yayBpbnRlcmZhY2UgZGVmaW5pdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RNZXRhRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX25ldHdvcmtJbnRlcmZhY2VEZWZpbml0aW9ucyA9IG5ldyBBcnJheTxJTmV0d29ya0ludGVyZmFjZURlZmluaXRpb24+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgY29tcG9uZW50IGRlZmluaXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnREZWZpbml0aW9ucyA9IG5ldyBBcnJheTxJQ29tcG9uZW50RGVmaW5pdGlvbj4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBkYXRhIHJlY29yZCB0eXBlIGRlZmluaXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kYXRhUmVjb3JkVHlwZURlZmluaXRpb25zID0gbmV3IEFycmF5PElEYXRhUmVjb3JkVHlwZURlZmluaXRpb24+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbmMgb2JqZWN0IGRlZmluaXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICAgcHJpdmF0ZSBfbmNPYmplY3RUeXBlRGVmaW5pdGlvbnMgPSBuZXcgQXJyYXk8SU5jT2JqZWN0VHlwZURlZmluaXRpb24+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgQUNPUE9TIEZVQiBkZWZpbml0aW9ucyhlLmcuIHN0YXJ0IG9mIHRoZSBGVUIgaW5zdGFuY2VzIGFuZCBQTEMgb3BlbiBGVUIgaW50c2FuY2VzLCBjb3VudCBvZiBpbnN0YW5jZXMgcGVyIEZVQilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lBY29wb3NGdWJQYXJJZERlZmluaXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYWNvcG9zRnViUGFySWREZWZpbml0aW9ucyE6IElBY29wb3NGdWJQYXJJZERlZmluaXRpb247XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGFjb3BvcyBwYXJhbWV0ZXIgZGVmaW5pdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RNZXRhRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BhcmFtZXRlckRlZmluaXRpb25zID0gbmV3IEFycmF5PElBY29wb3NQYXJhbWV0ZXJEZWZpbml0aW9uPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGVycm9yIGluZm9zIGRlZmluaXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9lcnJvckluZm9EZWZpbml0aW9ucyA9IG5ldyBBcnJheTxJRXJyb3JJbmZvRGVmaW5pdGlvbj4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBpbmZvIGhvdyBtYW55IGJ5dGVzIHNob3VsZCBiZSB1c2VkKGludGVycHJldGVkIGZvciB0aGUgVUkpIGZvciB0aGUgZ2l2ZW4gdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7TWFwPHN0cmluZywgbnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9ieXRlQ291bnRzOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcclxuXHJcbiAgICBwdWJsaWMgYnl0ZUNvdW50KHR5cGU6IHN0cmluZyk6IG51bWJlcntcclxuICAgICAgICBsZXQgbnVtYmVyID0gdGhpcy5fYnl0ZUNvdW50cy5nZXQodHlwZSk7XHJcbiAgICAgICAgaWYobnVtYmVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHR5cGUuc3RhcnRzV2l0aChcIkJZVEVTXCIpIHx8IHR5cGUuc3RhcnRzV2l0aChcIlNUUlwiKSl7XHJcbiAgICAgICAgICAgICAgICBudW1iZXIgPSA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRleHRQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RNZXRhRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRGVmaW5pdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzb21lIHN0YXRpYyBtZXRhRGF0YUluZm9zKEUuZy4gYWNvcG9zIHBhcmFtZXRlciBkZWZpbml0aW9ucywgZXJyb3IgaW5mbyBkZWZpbml0aW9ucy4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge053Y3RTdGF0aWNNZXRhRGF0YX0gc3RhdGljTWV0YURhdGFcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3RhdGljTWV0YURhdGEoc3RhdGljTWV0YURhdGE6IE53Y3RTdGF0aWNNZXRhRGF0YXx1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHN0YXRpY01ldGFEYXRhID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN0YXRpY01ldGFEYXRhID0gbmV3IE53Y3RTdGF0aWNNZXRhRGF0YSh1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Fjb3Bvc0Z1YlBhcklkRGVmaW5pdGlvbnMgPSBzdGF0aWNNZXRhRGF0YS5hY29wb3NGdWJQYXJJZERlZmluaXRpb25zO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlckRlZmluaXRpb25zID0gc3RhdGljTWV0YURhdGEucGFyYW1ldGVyRGVmaW5pdGlvbnM7XHJcbiAgICAgICAgdGhpcy5fZXJyb3JJbmZvRGVmaW5pdGlvbnMgPSBzdGF0aWNNZXRhRGF0YS5lcnJvckluZm9EZWZpbml0aW9ucztcclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUgZnViIHBhciBpZCBkZWZpbmVzIGZyb20gdGhlIGdpdmVuIGRhdGFcclxuICAgICAgICB0aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zLmFjb3Bvc0Z1YlBhcklkUmFuZ2UxTWF4ID0gdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5taW4gKyB0aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zLnJhbmdlIC0gMTtcclxuICAgICAgICB0aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zLmFjb3Bvc0Z1YlBhcklkUExDb3Blbk1pbiA9IHRoaXMuX2Fjb3Bvc0Z1YlBhcklkRGVmaW5pdGlvbnMubWluICsgdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5vZmZzZXRQTENvcGVuO1xyXG4gICAgICAgIHRoaXMuX2Fjb3Bvc0Z1YlBhcklkRGVmaW5pdGlvbnMuYWNvcG9zRnViUGFySWRQTENvcGVuTWF4ID0gdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5hY29wb3NGdWJQYXJJZFBMQ29wZW5NaW4gKyB0aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zLnJhbmdlIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzb21lIGR5bmFtaWMgbWV0YURhdGFJbmZvcyhFLmcuIG5ldHdvcmsgaW50ZXJmYWNlIGRlZmluaXRpb25zLCBjb21wb25lbnQgZGVmaW5pdGlvbnMsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge053Y3REeW5hbWljTWV0YURhdGF9IGR5bmFtaWNNZXRhRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RNZXRhRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXREeW5hbWljTWV0YURhdGEoZHluYW1pY01ldGFEYXRhOiBOd2N0RHluYW1pY01ldGFEYXRhfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoZHluYW1pY01ldGFEYXRhID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5fbmV0d29ya0ludGVyZmFjZURlZmluaXRpb25zID0gbmV3IEFycmF5PElOZXR3b3JrSW50ZXJmYWNlRGVmaW5pdGlvbj4oKTtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50RGVmaW5pdGlvbnMgPSBuZXcgQXJyYXk8SUNvbXBvbmVudERlZmluaXRpb24+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX25jT2JqZWN0VHlwZURlZmluaXRpb25zID0gbmV3IEFycmF5PElOY09iamVjdFR5cGVEZWZpbml0aW9uPigpOyAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBVc2UgZ2l2ZW4gbWV0YSBkYXRhIFxyXG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrSW50ZXJmYWNlRGVmaW5pdGlvbnMgPSBkeW5hbWljTWV0YURhdGEubmV0d29ya0ludGVyZmFjZXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudERlZmluaXRpb25zID0gZHluYW1pY01ldGFEYXRhLm1hcHBNb3Rpb25PYmplY3RzO1xyXG4gICAgICAgICAgICB0aGlzLl9uY09iamVjdFR5cGVEZWZpbml0aW9ucyA9IGR5bmFtaWNNZXRhRGF0YS5tYXBwTW90aW9uT2JqZWN0VHlwZXM7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgTmV0d29ya0ludGVyZmFjZU5hbWUgYnkgbmV0d29yayBpbnRlcmZhY2UgaWQgYW5kIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ldHdvcmtJbnRlcmZhY2VUeXBlSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXR3b3JrSW50ZXJmYWNlSW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE5ldHdvcmtJbnRlcmZhY2VOYW1lKG5ldHdvcmtJbnRlcmZhY2VUeXBlSWQ6IG51bWJlciwgbmV0d29ya0ludGVyZmFjZUluZGV4OiBudW1iZXIpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fbmV0d29ya0ludGVyZmFjZURlZmluaXRpb25zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrSW50ZXJmYWNlRGVmaW5pdGlvbiA9IHRoaXMuX25ldHdvcmtJbnRlcmZhY2VEZWZpbml0aW9ucy5maW5kKGRlZmluaXRpb24gPT4gZGVmaW5pdGlvbi5pZCA9PSBuZXR3b3JrSW50ZXJmYWNlVHlwZUlkICYmIGRlZmluaXRpb24uaWR4ID09IG5ldHdvcmtJbnRlcmZhY2VJbmRleCk7XHJcbiAgICAgICAgICAgIGlmKG5ldHdvcmtJbnRlcmZhY2VEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya0ludGVyZmFjZURlZmluaXRpb24ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFwiTndJZlR5cElkOiBcIiArIG5ldHdvcmtJbnRlcmZhY2VUeXBlSWQudG9TdHJpbmcoKSArIFwiOyBOd0lmSWR4OiBcIiArIG5ldHdvcmtJbnRlcmZhY2VJbmRleC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29tcG9uZW50TmFtZSBieSBjb25maWcgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29uZmlnSWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbXBvbmVudE5hbWUobmV0SWZUeXBlSUQ6IG51bWJlciwgbmV0SWZJZHg6IG51bWJlciwgbm9kZTogbnVtYmVyLCBvYmpUeXBlSUQ6IG51bWJlciwgY2hhbm5lbE5yOiBudW1iZXIpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fY29tcG9uZW50RGVmaW5pdGlvbnMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudERlZmluaXRpb24gPSB0aGlzLl9jb21wb25lbnREZWZpbml0aW9ucy5maW5kKGRlZmluaXRpb24gPT4gZGVmaW5pdGlvbi5uZXRJZlR5cCA9PSBuZXRJZlR5cGVJRCAmJiBkZWZpbml0aW9uLm5ldElmSWR4ID09IG5ldElmSWR4IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGRlZmluaXRpb24ubm9kZSA9PSBub2RlICYmIGRlZmluaXRpb24ub2JqVHlwID09IG9ialR5cGVJRCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG93IGNvbXBvbmVudCBuYW1lIGFsc28gaWYgY2hhbm5lbCBudW1iZXIgaXMgZGVmaW5lZCB3aXRoIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoZGVmaW5pdGlvbi5jaGFubmVsID09IGNoYW5uZWxOciB8fCBkZWZpbml0aW9uLmNoYW5uZWwgPT0gMCkpOyBcclxuICAgICAgICAgICAgaWYoY29tcG9uZW50RGVmaW5pdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudERlZmluaXRpb24ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5jT2JqZWN0VHlwZSBuYW1lIGZvciB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmNPYmplY3RUeXBlSWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE5jT2JqZWN0VHlwZU5hbWUobmNPYmplY3RUeXBlSWQ6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9uY09iamVjdFR5cGVEZWZpbml0aW9ucyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgbmNPYmplY3RUeXBlRGVmaW5pdGlvbiA9IHRoaXMuX25jT2JqZWN0VHlwZURlZmluaXRpb25zLmZpbmQoZGVmaW5pdGlvbiA9PiBkZWZpbml0aW9uLmlkID09IG5jT2JqZWN0VHlwZUlkKTtcclxuICAgICAgICAgICAgaWYobmNPYmplY3RUeXBlRGVmaW5pdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5jT2JqZWN0VHlwZURlZmluaXRpb24ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJFTEVcIiArIG5jT2JqZWN0VHlwZUlkLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb25zdGFudCBuYW1lIGZvciB0aGUgZ2l2ZW4gcGFyIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhcklkXHJcbiAgICAgKiBAcGFyYW0geyhJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbnx1bmRlZmluZWQpfSBwYXJhbWV0ZXJEZWZpbml0aW9uIGlmIHVuZGVmaW5lZCwgdGhlIGRlZmluaXRpb24gd2lsbCBiZSBmb3VuZCBhdXRvbWF0aWNhbGx5KHBlcmZvcm1hbmNlISlcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBhcklkTmFtZShwYXJJZDogbnVtYmVyLCBwYXJhbWV0ZXJEZWZpbml0aW9uOiBJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbnx1bmRlZmluZWQpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHBhcklkQ29uc3QgPSBwYXJJZC50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBwYXJJZERlZmluaXRpb24gPSBwYXJhbWV0ZXJEZWZpbml0aW9uO1xyXG4gICAgICAgIGlmKHBhcklkRGVmaW5pdGlvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBwYXJJZERlZmluaXRpb24gPSB0aGlzLmdldFBhcmFtZXRlckRlZmluaXRpb24ocGFySWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwYXJJZERlZmluaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcGFySWRDb25zdCA9IHBhcklkRGVmaW5pdGlvbi5jb25zdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgbWF5YmUgYSBGVUIgcGFyIGlkXHJcbiAgICAgICAgaWYocGFySWQgPj0gdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5taW4gJiYgcGFySWQgPD0gdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5hY29wb3NGdWJQYXJJZFJhbmdlMU1heCl7XHJcbiAgICAgICAgICAgIC8vIGZpbmQgaW5zdGFuY2UgbnVtYmVyXHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZU51bWJlciA9IHBhcklkJXRoaXMuX2Fjb3Bvc0Z1YlBhcklkRGVmaW5pdGlvbnMuaW5zdGFuY2VzO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFySWRDb25zdCArIFwiK1wiICsgaW5zdGFuY2VOdW1iZXI7IC8vIEFkZCBGVUIgaW5zdGFuY2UgbnVtYmVyXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBtYXliZSBhIHBsY09wZW4gRlVCIHBhciBpZFxyXG4gICAgICAgIGVsc2UgaWYocGFySWQgPj0gdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5hY29wb3NGdWJQYXJJZFBMQ29wZW5NaW4gJiYgcGFySWQgPD0gdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5hY29wb3NGdWJQYXJJZFBMQ29wZW5NYXgpe1xyXG4gICAgICAgICAgICAvLyBmaW5kIGluc3RhbmNlIG51bWJlclxyXG4gICAgICAgICAgICBsZXQgaW5zdGFuY2VOdW1iZXIgPSBwYXJJZCV0aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zLmluc3RhbmNlcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwYXJJZE5hbWUgPSBcIlBMQ29wZW46IFwiICsgcGFySWRDb25zdDtcclxuICAgICAgICAgICAgcGFySWROYW1lID0gcGFySWROYW1lICsgXCIrXCIgKyBpbnN0YW5jZU51bWJlcjsgLy8gQWRkIEZVQiBpbnN0YW5jZSBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGFySWROYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFySWRDb25zdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHRoZSBnaXZlbiBwYXJhbWV0ZXIgaWQgYW4gZXJyb3IgcmVjb3JkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhcklkXHJcbiAgICAgKiBAcGFyYW0geyhJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbnx1bmRlZmluZWQpfSBwYXJhbWV0ZXJEZWZpbml0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFcnJvclJlYyhwYXJJZDogbnVtYmVyLCBwYXJhbWV0ZXJEZWZpbml0aW9uOiBJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbnx1bmRlZmluZWQpOiBib29sZWFue1xyXG4gICAgICAgIGxldCBwYXJJZERlZmluaXRpb24gPSBwYXJhbWV0ZXJEZWZpbml0aW9uO1xyXG4gICAgICAgIGlmKHBhcklkRGVmaW5pdGlvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBwYXJJZERlZmluaXRpb24gPSB0aGlzLmdldFBhcmFtZXRlckRlZmluaXRpb24ocGFySWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwYXJJZERlZmluaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYocGFySWREZWZpbml0aW9uLmF0dHIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmKHBhcklkRGVmaW5pdGlvbi5hdHRyLmZpbmQoYXR0ciA9PiBhdHRyID09IFwiZXJyXCIpICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgb3JpZ2luYWwgcGFyIGlkIGlmIHRoZSBwYXIgaWQgaXMgYSAocGxjT3BlbikgRlVCIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYXJJZFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE9yaWdpbmFsUGFySWRGcm9tRlVCUGFySWQocGFySWQ6IG51bWJlcik6IG51bWJlcntcclxuICAgICAgICBpZihwYXJJZCA+PSB0aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zLm1pbiAmJiBwYXJJZCA8PSB0aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zLmFjb3Bvc0Z1YlBhcklkUmFuZ2UxTWF4KXtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIG9yaWdpbmFsIHBhcklkIGZvciB0aGlzIEZVQiBwYXIgaWRcclxuICAgICAgICAgICAgbGV0IGluc3RhbmNlTnVtYmVyID0gcGFySWQldGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5pbnN0YW5jZXM7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJJZC1pbnN0YW5jZU51bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGFySWQgPj0gdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5hY29wb3NGdWJQYXJJZFBMQ29wZW5NaW4gJiYgcGFySWQgPD0gdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucy5hY29wb3NGdWJQYXJJZFBMQ29wZW5NYXgpe1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gb3JpZ2luYWwgcGFySWQgZm9yIHRoaXMgcGxjT3BlbiBGVUIgcGFyIGlkXHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZU51bWJlciA9IHBhcklkJXRoaXMuX2Fjb3Bvc0Z1YlBhcklkRGVmaW5pdGlvbnMuaW5zdGFuY2VzO1xyXG4gICAgICAgICAgICByZXR1cm4gKHBhcklkLWluc3RhbmNlTnVtYmVyKS10aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zLm9mZnNldFBMQ29wZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhcmFtZXRlciBkZWZpbml0aW9uIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyIGlkIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYXJJZFxyXG4gICAgICogQHJldHVybnMgeyhJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RNZXRhRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQYXJhbWV0ZXJEZWZpbml0aW9uKHBhcklkOiBudW1iZXIpOiBJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsUGFySWQgPSB0aGlzLmdldE9yaWdpbmFsUGFySWRGcm9tRlVCUGFySWQocGFySWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9ucy5maW5kKGRlZmluaXRpb24gPT4gZGVmaW5pdGlvbi5pZCA9PSBvcmlnaW5hbFBhcklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGFSZWNvcmRUeXBlIGRlZmluaXRpb24gZm9yIHRoZSBnaXZlbiByZWNvcmQgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZWNvcmRUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7KElEYXRhUmVjb3JkVHlwZURlZmluaXRpb258dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGF0YVJlY29yZFR5cGVEZWZpbml0aW9uKHJlY29yZFR5cGU6IG51bWJlcik6IElEYXRhUmVjb3JkVHlwZURlZmluaXRpb258dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhUmVjb3JkVHlwZURlZmluaXRpb25zLmZpbmQoZGVmaW5pdGlvbiA9PiBkZWZpbml0aW9uLmlkID09IHJlY29yZFR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0aGUgZGF0YXR5cGUgZm9yIHRoZSBpbmZvIG9mIHRoZSBnaXZlbiBlcnJvcm51bWJlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlcnJvck51bWJlclxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RXJyb3JJbmZvRGF0YVR5cGUoZXJyb3JOdW1iZXI6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgZXJyb3JJbmZvRGVmaW5pdGlvbiA9IHRoaXMuX2Vycm9ySW5mb0RlZmluaXRpb25zLmZpbmQoZXJyb3JJbmZvID0+IGVycm9ySW5mby5pZCA9PSBlcnJvck51bWJlcik7XHJcbiAgICAgICAgaWYoZXJyb3JJbmZvRGVmaW5pdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JJbmZvRGVmaW5pdGlvbi50eXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGZvcm1hdHRlciBmb3IgdGhlIGdpdmVuIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdEZvcm1hdHRlckZvclR5cGUodHlwZTogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBcIkJPT0xcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkkxXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJJMlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiSTRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIlVJMVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiVUkyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJVSTRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIlBBUklEXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ7MX1cIjtcclxuICAgICAgICAgICAgY2FzZSBcIlI0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJSOFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiezF8Z31cIjtcclxuICAgICAgICAgICAgY2FzZSBcIlgxXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJYMlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiWDRcIjpcclxuICAgICAgICAgICAgICAgIGxldCBtaW5DaGFyYWN0ZXJDb3VudCA9IE51bWJlcih0eXBlLnNsaWNlKDEpKSoyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiMHh7MXwwXCIgKyBtaW5DaGFyYWN0ZXJDb3VudCArIFwiWH1cIjsgLy8gZS5nLiBcIjB4ezF8MDJYfVwiIG9yIFwiMHh7MXwwNFh9XCJcclxuICAgICAgICAgICAgY2FzZSBcIkJQOFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiQlAxNlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiQlAzMlwiOlxyXG4gICAgICAgICAgICAgICAgbGV0IGJ5dGVDb3VudCA9IE51bWJlcih0eXBlLnNsaWNlKDIpKS84O1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdFN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VwZXJhdG9yID0gIFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gYnl0ZUNvdW50OyBpID4gMDsgaS0tKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRTdHJpbmcgKz0gXCJ7XCIgKyBpICsgXCJ8MDhifVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0U3RyaW5nICs9IHNlcGVyYXRvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0U3RyaW5nO1xyXG4gICAgICAgICAgICBjYXNlIFwiQllURVM2XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ7MXwwMlh9IHsyfDAyWH0gezN8MDJYfSB7NHwwMlh9IHs1fDAyWH0gezZ8MDJYfVwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiVDVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInsxfTp7MnwwMn06ezN8MDJ9Lns0fDAyfSB7NXwwMn0uezZ8MDJ9Lns3fVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlID09IFwiREFUQVwiIHx8IHR5cGUgPT0gXCJCUk1PRFwiIHx8IHR5cGUuc3RhcnRzV2l0aChcIkJZVEVTXCIpIHx8IHR5cGUuc3RhcnRzV2l0aChcIlNUUlwiKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBcInsxfVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIHRoZSBtZXRhIGRhdGEgZGVmaW5pdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RNZXRhRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZURlZmluaXRpb25zKCl7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQnl0ZUNvdW50KCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRGF0YVJlY29yZFR5cGVEZWZpbml0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgX2J5dGVDb3VudHMgbWFwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVCeXRlQ291bnQoKXtcclxuICAgICAgICB0aGlzLl9ieXRlQ291bnRzLnNldChcIkJPT0xcIiwgMSk7XHJcbiAgICAgICAgdGhpcy5fYnl0ZUNvdW50cy5zZXQoXCJJMVwiLCAxKTtcclxuICAgICAgICB0aGlzLl9ieXRlQ291bnRzLnNldChcIkkyXCIsIDIpO1xyXG4gICAgICAgIHRoaXMuX2J5dGVDb3VudHMuc2V0KFwiSTRcIiwgNCk7XHJcbiAgICAgICAgdGhpcy5fYnl0ZUNvdW50cy5zZXQoXCJVSTFcIiwgMSk7XHJcbiAgICAgICAgdGhpcy5fYnl0ZUNvdW50cy5zZXQoXCJVSTJcIiwgMik7XHJcbiAgICAgICAgdGhpcy5fYnl0ZUNvdW50cy5zZXQoXCJVSTRcIiwgNCk7XHJcbiAgICAgICAgdGhpcy5fYnl0ZUNvdW50cy5zZXQoXCJYMVwiLCAxKTtcclxuICAgICAgICB0aGlzLl9ieXRlQ291bnRzLnNldChcIlgyXCIsIDIpO1xyXG4gICAgICAgIHRoaXMuX2J5dGVDb3VudHMuc2V0KFwiWDRcIiwgNCk7XHJcbiAgICAgICAgdGhpcy5fYnl0ZUNvdW50cy5zZXQoXCJCUDhcIiwgMSk7XHJcbiAgICAgICAgdGhpcy5fYnl0ZUNvdW50cy5zZXQoXCJCUDE2XCIsIDIpO1xyXG4gICAgICAgIHRoaXMuX2J5dGVDb3VudHMuc2V0KFwiQlAzMlwiLCA0KTtcclxuICAgICAgICB0aGlzLl9ieXRlQ291bnRzLnNldChcIlI0XCIsIDQpO1xyXG4gICAgICAgIHRoaXMuX2J5dGVDb3VudHMuc2V0KFwiVDVcIiwgNSk7XHJcbiAgICAgICAgdGhpcy5fYnl0ZUNvdW50cy5zZXQoXCJTVFI2XCIsIDYpO1xyXG4gICAgICAgIHRoaXMuX2J5dGVDb3VudHMuc2V0KFwiQllURVM2XCIsIDYpO1xyXG4gICAgICAgIHRoaXMuX2J5dGVDb3VudHMuc2V0KFwiREFUQVwiLCA0KTtcclxuICAgICAgICB0aGlzLl9ieXRlQ291bnRzLnNldChcIkJSTU9EXCIsIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgRGF0YVJlY29yZFR5cGVEZWZpbml0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRGF0YVJlY29yZFR5cGVEZWZpbml0aW9ucygpe1xyXG4gICAgICAgIC8vIFNldCBzb21lIGR1bW15IG1ldGEgZGF0YSBpbmZvXHJcbiAgICAgICAgdGhpcy5fZGF0YVJlY29yZFR5cGVEZWZpbml0aW9ucy5wdXNoKHtpZDogMSwgY29uc3Q6IFwiQlJEX0NPTVwiLCBuYW1lOiBcIlwiLCBpc1Jlc3BvbnNlOiBmYWxzZX0pO1xyXG4gICAgICAgIHRoaXMuX2RhdGFSZWNvcmRUeXBlRGVmaW5pdGlvbnMucHVzaCh7aWQ6IDIsIGNvbnN0OiBcIldSX1JFUVwiLCBuYW1lOiBcIldyaXRlIFJlcXVlc3RcIiwgaXNSZXNwb25zZTogZmFsc2V9KTtcclxuICAgICAgICB0aGlzLl9kYXRhUmVjb3JkVHlwZURlZmluaXRpb25zLnB1c2goe2lkOiAzLCBjb25zdDogXCJXUl9SU1BcIiwgbmFtZTogXCJXcml0ZSBSZXNwb25zZVwiLCBpc1Jlc3BvbnNlOiB0cnVlfSk7XHJcbiAgICAgICAgdGhpcy5fZGF0YVJlY29yZFR5cGVEZWZpbml0aW9ucy5wdXNoKHtpZDogNCwgY29uc3Q6IFwiUkRfUkVRXCIsIG5hbWU6IFwiUmVhZCBSZXF1ZXN0XCIsIGlzUmVzcG9uc2U6IGZhbHNlfSk7XHJcbiAgICAgICAgdGhpcy5fZGF0YVJlY29yZFR5cGVEZWZpbml0aW9ucy5wdXNoKHtpZDogNSwgY29uc3Q6IFwiUkRfUlNQXCIsIG5hbWU6IFwiUmVhZCBSZXNwb25zZVwiLCBpc1Jlc3BvbnNlOiB0cnVlfSk7XHJcbiAgICAgICAgdGhpcy5fZGF0YVJlY29yZFR5cGVEZWZpbml0aW9ucy5wdXNoKHtpZDogNiwgY29uc3Q6IFwiU1RBVFwiLCBuYW1lOiBcIkRyaXZlIFN0YXR1c1wiLCBpc1Jlc3BvbnNlOiBmYWxzZX0pO1xyXG4gICAgICAgIHRoaXMuX2RhdGFSZWNvcmRUeXBlRGVmaW5pdGlvbnMucHVzaCh7aWQ6IDcsIGNvbnN0OiBcIklORk9cIiwgbmFtZTogXCJJbmZvXCIsIGlzUmVzcG9uc2U6IGZhbHNlfSk7XHJcbiAgICB9XHJcbn0iXX0=
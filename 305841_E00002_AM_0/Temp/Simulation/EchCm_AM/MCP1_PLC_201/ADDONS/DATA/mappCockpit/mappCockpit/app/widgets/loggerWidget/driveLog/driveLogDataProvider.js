var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../../common/fileProvider", "../interfaces/loggerDataProviderInterface", "./driveLogDataModel", "../../../common/nwctProvider/nwctProvider", "../dataLoadingProgressArgs", "../../../common/nwctProvider/nwctMetaDataProvider", "../../../common/nwctProvider/nwctDynamicMetaData", "../../../common/nwctProvider/nwctStaticMetaData", "../../../common/nwctProvider/brModuleParser", "../../../common/zipContainer", "../../common/alertDialog"], function (require, exports, mappCockpitComponent_1, fileProvider_1, loggerDataProviderInterface_1, driveLogDataModel_1, nwctProvider_1, dataLoadingProgressArgs_1, nwctMetaDataProvider_1, nwctDynamicMetaData_1, nwctStaticMetaData_1, brModuleParser_1, zipContainer_1, alertDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements some functionality to export/import or upload some network command trace data
     *
     * @export
     * @class DriveLogDataProvider
     */
    var DriveLogDataProvider = /** @class */ (function () {
        /**
         * Creates an instance of NetworkCommandTraceProvider
         * @param {MappCockpitComponent} nwctComponent
         * @memberof DriveLogDataProvider
         */
        function DriveLogDataProvider(nwctComponent) {
            var _this = this;
            /**
             * Event handler for the file provider when loading data from file is finished
             *
             * @private
             * @memberof DriveLogDataProvider
             */
            this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(sender, args); };
            /**
             * Event handler for namespaces for textsystem loading finished
             *
             * @private
             * @memberof DriveLogDataProvider
             */
            this._namespacesLoadedHandler = function (sender, args) { return _this.onNamespacesLoaded(sender, args); };
            /**
             * Event handler for data zipped
             *
             * @private
             * @memberof DriveLogDataProvider
             */
            this._dataZippedHandler = function (sender, zippedData) { return _this.onDataZippedHandler(sender, zippedData); };
            /**
             * Event handler for data unzipped
             *
             * @private
             * @memberof DriveLogDataProvider
             */
            this._dataUnzippedHandler = function (sender, unzippedData) { return _this.onDataUnzippedHandler(sender, unzippedData); };
            /**
             * Event to inform when some data is available(e.g. loading from file or from target)
             *
             * @memberof DriveLogDataProvider
             */
            this.eventDataAvailable = new loggerDataProviderInterface_1.EventDataAvailable();
            /**
             * Event to inform how many data is already loaded(e.g. 0%, 10%, ...., 100%);
             *
             * @memberof DriveLogDataProvider
             */
            this.eventDataLoadingProgressChanged = new loggerDataProviderInterface_1.EventDataLoadingProgress();
            this._fileProvider = new fileProvider_1.FileProvider(true);
            this._createDriveLogSnapshotMethod = nwctComponent.methods.filter(function (method) { return method.browseName == DriveLogDataProvider.createDriveLogSnapshotMethodName; })[0];
            this._getDriveLogSnapshot = nwctComponent.methods.filter(function (method) { return method.browseName == DriveLogDataProvider.getDriveLogSnapshotMethodName; })[0];
            this._getDriveLogConfigInfo = nwctComponent.methods.filter(function (method) { return method.browseName == DriveLogDataProvider.getDriveLogConfigInfoMethodName; })[0];
        }
        /**
         * Is there some data available to export something
         *
         * @returns {boolean}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.isExportPossible = function () {
            return true;
        };
        /**
         * Uploads the network command trace data from target (eventUploadDataFinished will be raise))
         *
         * @returns
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.uploadDataFromTarget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dataAvailable, ref, currentNwctBinData, dynamicMetaData, staticMetaDataFromTarget;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._createDriveLogSnapshotMethod != undefined && this._getDriveLogSnapshot != undefined)) return [3 /*break*/, 9];
                            // create network command trace snapshot on target
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._createDriveLogSnapshotMethod)];
                        case 1:
                            // create network command trace snapshot on target
                            _a.sent();
                            return [4 /*yield*/, this.dataAvailable()];
                        case 2:
                            dataAvailable = _a.sent();
                            if (!dataAvailable) return [3 /*break*/, 8];
                            ref = { data: new Uint8Array() };
                            return [4 /*yield*/, this.getNwctData(ref)];
                        case 3:
                            _a.sent();
                            currentNwctBinData = ref.data;
                            return [4 /*yield*/, this.getDynamicMetaData()];
                        case 4:
                            dynamicMetaData = _a.sent();
                            if (!(this._nwctMetaDataProvider == undefined)) return [3 /*break*/, 6];
                            this._nwctMetaDataProvider = new nwctMetaDataProvider_1.NwctMetaDataProvider();
                            return [4 /*yield*/, this.getStaticMetaData()];
                        case 5:
                            staticMetaDataFromTarget = _a.sent();
                            this._nwctMetaDataProvider.setStaticMetaData(staticMetaDataFromTarget);
                            _a.label = 6;
                        case 6:
                            // Set dynamic data(network interface names, component names, ...) for every new upload of network command trace data
                            this._nwctMetaDataProvider.setDynamicMetaData(dynamicMetaData);
                            return [4 /*yield*/, this.createNwctProvider(currentNwctBinData, this._nwctMetaDataProvider)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            console.error("No network command trace data available!");
                            _a.label = 9;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Returns the static meta data from target (OPC UA methods)
         *
         * @private
         * @returns {(Promise<NwctStaticMetaData|undefined>)}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getStaticMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var acoposParameterStaticData, errorInfoStaticData, refMetaData, staticdata, refMetaDataErrorInfo, errorInfoStaticdata;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            acoposParameterStaticData = undefined;
                            errorInfoStaticData = undefined;
                            refMetaData = { data: "" };
                            return [4 /*yield*/, this.getNwctStaticMetaDataAcoposParameter(refMetaData)];
                        case 1:
                            _a.sent();
                            staticdata = refMetaData.data;
                            // create json objects
                            try {
                                acoposParameterStaticData = JSON.parse(staticdata);
                            }
                            catch (e) {
                                console.error("Problem with data from GetDriveLogConfigInfo with id 2!");
                                console.error(e);
                            }
                            refMetaDataErrorInfo = { data: "" };
                            return [4 /*yield*/, this.getNwctStaticMetaDataErrorInfo(refMetaDataErrorInfo)];
                        case 2:
                            _a.sent();
                            errorInfoStaticdata = refMetaDataErrorInfo.data;
                            // create json objects
                            try {
                                errorInfoStaticData = JSON.parse(errorInfoStaticdata);
                            }
                            catch (e) {
                                console.error("Problem with data from GetDriveLogConfigInfo with id 3!");
                                console.error(e);
                            }
                            // load data into satic metaData object
                            return [2 /*return*/, new nwctStaticMetaData_1.NwctStaticMetaData(acoposParameterStaticData, errorInfoStaticData)];
                    }
                });
            });
        };
        /**
         * Returns the dynamic meta data from the target (OPC UA methods)
         *
         * @private
         * @returns {(Promise<NwctDynamicMetaData|undefined>)}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getDynamicMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var refMetaData, dyndata, mappMotionArConfigObject;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refMetaData = { data: "" };
                            return [4 /*yield*/, this.getNwctDynamicMetaData(refMetaData)];
                        case 1:
                            _a.sent();
                            dyndata = refMetaData.data;
                            mappMotionArConfigObject = undefined;
                            try {
                                mappMotionArConfigObject = JSON.parse(dyndata);
                            }
                            catch (e) {
                                console.error("Problem with data from GetDriveLogConfigInfo with id 1!");
                                console.error(e);
                            }
                            // load data into dynamic metaData object
                            return [2 /*return*/, new nwctDynamicMetaData_1.NwctDynamicMetaData(mappMotionArConfigObject)];
                    }
                });
            });
        };
        /**
         * Exports the network command trace data from target to a file
         *
         * @memberof DriveLogDataProvider
         */
        /*public async exportUploadNetworkCommandTrace(){
            if(this._createDriveLogSnapshotMethod != undefined && this._getDriveLogSnapshot != undefined){
                        
                // create network command trace snapshot on target
                await MappCockpitComponentMethod.execute(this._createDriveLogSnapshotMethod);
    
                let dataAvailable = await this.dataAvailable();
                if(dataAvailable){
                    // get network command trace snapshot from target
                    let ref = {data: new Blob()};
                    await this.createNetworkCommandTraceData(ref);
    
                    // download network command trace snapshot
                    FileProvider.downloadData("DriveLogSnapShot" + FileProvider.BinFileExt, ref.data);
                }
                else{
                    console.error("No network command trace data available!");
                }
            }
        }*/
        /**
         * Exports the last imported/uploaded network command trace data to a file
         *
         * @memberof DriveLogDataProvider
         */
        /*public exportCurrentDataToFile(){
            let binBlobData = this.getCurrentBinDataAsBlob();
            if(binBlobData != undefined){
                // download current etwork command trace snapshot(uploaded or imported)
                FileProvider.downloadData("DriveLogSnapShot" + FileProvider.BinFileExt, binBlobData);
            }
        }*/
        /**
         * Export the dat to zip file
         *
         * @param {Blob} data
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.exportDataToFile = function (data) {
            if (data != undefined) {
                // Raise start exporting event 0%
                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.exportToFileType, 0));
                // Start compressing data
                this.zipData(data);
            }
        };
        /**
         * Compress data and save to file
         *
         * @private
         * @param {Blob} data
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.zipData = function (data) {
            var zipContainer = new zipContainer_1.ZipContainer();
            zipContainer.addFile("DriveLog.json", data);
            zipContainer.eventDataZipped.attach(this._dataZippedHandler);
            zipContainer.zipData();
        };
        /**
         * Imports some network command trace data from a file
         * Shows an file explorer to select a file and starts loading the file data (eventUploadDataFinished will be raise)
         *
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.importDataFromFile = function () {
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(fileProvider_1.FileProvider.DriveLogExportFileExt + "," + fileProvider_1.FileProvider.BrFileExt);
        };
        /**
         * Occurs after reading data from file(trace configuration import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onUploadDataFinished = function (sender, args) {
            var _this = this;
            // Timeout needed to show some busyscreen before importing data otherwise UI have no time to update
            setTimeout(function () { return _this.onDataAvailable(sender, args); }, 200);
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * Raised when the data from a loaded file is available
         *
         * @private
         * @param {HTMLInputElement} fileInputElement
         * @param {Map<string, string>} fileContents
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onDataAvailable = function (fileInputElement, fileContents) {
            var _this = this;
            if (fileContents.size === 1) {
                // Start with Progress 0% (load from file)
                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 0));
                // Timeout needed to show the busyscreen before exporting data 
                setTimeout(function () { return _this.interpretData(fileContents); }, 200);
            }
        };
        /**
         * Loads the network command trace data from file (eventUploadDataFinished will be raise))
         *
         * @private
         * @param {*} fileContents
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.interpretData = function (fileContents) {
            return __awaiter(this, void 0, void 0, function () {
                var filedata, filename;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            filedata = fileContents.values().next().value;
                            filename = fileContents.keys().next().value;
                            if (!filename.endsWith(fileProvider_1.FileProvider.BrFileExt)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.importSdmBrFile(filedata)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                        case 2:
                            if (filename.endsWith(fileProvider_1.FileProvider.DriveLogExportFileExt)) { // dle file DriveLog import
                                this.importDleFile(filedata);
                                return [2 /*return*/];
                            }
                            _a.label = 3;
                        case 3:
                            /*else if(filename.endsWith(FileProvider.BinFileExt)){ // Bin file import
                                this.importBinFile(filedata);
                                return;
                            }*/
                            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 100));
                            this.showFileNotSupportedWarningWhenImportingFile();
                            // Raise EmtpyDataModel to clear the view
                            this.raiseEmptyDataModel();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Raises the dataAvailable event with an empty datamodel
         *
         * @private
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.raiseEmptyDataModel = function () {
            var loggerDataModel = new driveLogDataModel_1.DriveLogDataModel();
            this.eventDataAvailable.raise(this, loggerDataModel);
        };
        /**
         * Import SDM br file
         *
         * @private
         * @param {string} filedata
         * @returns
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.importSdmBrFile = function (filedata) {
            return __awaiter(this, void 0, void 0, function () {
                var arrayBuffer2, brModuleData, mappMotionArConfigObject, dynamicMetaData, staticMetaData, nwctMetaDataProvider;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            arrayBuffer2 = this.str2ab(filedata);
                            brModuleData = new brModuleParser_1.BrModuleParser(arrayBuffer2);
                            // check if its an valid NC data 
                            if (brModuleData.isNCData === false || brModuleData.has6Sections === false) {
                                //handle error
                                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 100));
                                this.showFileNotSupportedWarningWhenImportingFile();
                                // Raise EmtpyDataModel to clear the view
                                this.raiseEmptyDataModel();
                                return [2 /*return*/];
                            }
                            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 100));
                            mappMotionArConfigObject = JSON.parse(brModuleData.mappMotionArConfig);
                            dynamicMetaData = new nwctDynamicMetaData_1.NwctDynamicMetaData(mappMotionArConfigObject);
                            staticMetaData = new nwctStaticMetaData_1.NwctStaticMetaData(JSON.parse(brModuleData.acoposParIDs), JSON.parse(brModuleData.acoposErrInfTypes));
                            nwctMetaDataProvider = new nwctMetaDataProvider_1.NwctMetaDataProvider();
                            // Set the static data from sdm binary file (parameter definitions, error info definitions, ...)
                            nwctMetaDataProvider.setStaticMetaData(staticMetaData);
                            // Set dynamic data(network interface names, component names, ...) from sdm binary file
                            nwctMetaDataProvider.setDynamicMetaData(dynamicMetaData);
                            return [4 /*yield*/, this.createNwctProvider(brModuleData.mTrcBinDat01, nwctMetaDataProvider)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates a warning message when the user imports a .br file(or unsupported file extension) which one is not supported
         *
         * @private
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.showFileNotSupportedWarningWhenImportingFile = function () {
            new alertDialog_1.AlertDialog().createMessageBox("File not supported", "Invalid file for this operation!", alertDialog_1.messageBoxType.Warning, undefined);
        };
        /**
         * Import dle file
         *
         * @private
         * @param {string} filedata
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.importDleFile = function (filedata) {
            var zipContainer = new zipContainer_1.ZipContainer();
            zipContainer.eventDataUnzipped.attach(this._dataUnzippedHandler);
            zipContainer.unzipData(filedata, "DriveLog.json");
        };
        // -----------------------------Remove for release------------------------------------------
        /**
         * Import bin file
         *
         * @private
         * @param {string} filedata
         * @memberof DriveLogDataProvider
         */
        /*private async importBinFile(filedata: string){
            // Convert bin string to array buffer
            let arrayBuffer = this.str2ab(filedata);
            
            // End with Progress 100% (load from file)
            this.eventDataLoadingProgressChanged.raise(this, new DataLoadingProgressArgs(DataLoadingProgressArgs.loadFromFileType, 100));
    
            // get DynamicMetaData from data buffer
            let dynamicMetaData = this.getDynamicMetaDataFromBuffer(arrayBuffer);
            // get only the data buffer without metaData info
            let dataBuffer = this.getDataBuffer(arrayBuffer);
    
            // create nwct provider
            if(this._nwctMetaDataProvider == undefined){
                this._nwctMetaDataProvider = new NwctMetaDataProvider();
                // Set the static data (parameter definitions, error info definitions, ...) after creating the NwctMetaDataProvider
                let staticMetaDataFromTarget = await this.getStaticMetaData();
                this._nwctMetaDataProvider.setStaticMetaData(staticMetaDataFromTarget);
            }
    
            // Set dynamic data(network interface names, component names, ...) for every new upload of network command trace data
            this._nwctMetaDataProvider.setDynamicMetaData(dynamicMetaData);
            // create nwct provider
            await this.createNwctProvider(dataBuffer, this._nwctMetaDataProvider);
        }*/
        /**
         * Returns only the network command trace buffer without the metadata
         *
         * @private
         * @param {ArrayBuffer} networkCmdTrcData
         * @returns {ArrayBuffer}
         * @memberof DriveLogDataProvider
         */
        /*private getDataBuffer(networkCmdTrcData: ArrayBuffer): ArrayBuffer{
            let metaDataStartIndex = this.findMetaDataStart(networkCmdTrcData);
            let dataBuffer = networkCmdTrcData;
            if(metaDataStartIndex != -1){
                // Extract metaData
                dataBuffer = networkCmdTrcData.slice(0,metaDataStartIndex);
            }
            return dataBuffer;
        }*/
        /**
         * Returns the dynamic meta data found within the drive log buffer
         *
         * @private
         * @param {ArrayBuffer} networkCmdTrcData
         * @returns {(NwctDynamicMetaData|undefined)}
         * @memberof DriveLogDataProvider
         */
        /*private getDynamicMetaDataFromBuffer(networkCmdTrcData: ArrayBuffer): NwctDynamicMetaData|undefined{
            let metaDataStartIndex: number = this.findMetaDataStart(networkCmdTrcData);
            let currentMetaDataString;
            if(metaDataStartIndex != -1){
                // Extract metaData
                let metaDataBuffer = networkCmdTrcData.slice(metaDataStartIndex);
                currentMetaDataString = this.ab2str(metaDataBuffer);
            }
            
            let metaDataObject: NwctDynamicMetaData|undefined;
            if(currentMetaDataString != undefined){
                
                let indexMappMotionArConfig = currentMetaDataString.search("mappMotionArConfig");
                let mappMotionArConfig = currentMetaDataString.substr(indexMappMotionArConfig-2);
    
                let newSection = mappMotionArConfig.indexOf("{\"acoposParIDs\":");
                if(newSection != -1){
                    mappMotionArConfig = mappMotionArConfig.substr(0, newSection);
                }
                let endIndex = mappMotionArConfig.lastIndexOf("}");
    
                mappMotionArConfig = mappMotionArConfig.substr(0, endIndex+1); // Remove wrong characters at the end
                
                // create json objects
                let mappMotionArConfigObject = JSON.parse(mappMotionArConfig);
    
                // load data into dynamic metaData object
                metaDataObject = new NwctDynamicMetaData(mappMotionArConfigObject);
            }
            return metaDataObject;
        }*/
        /**
         * Find the index where the metaData is located in the bin buffer if available, other wise -1
         *
         * @private
         * @param {ArrayBuffer} networkCmdTrcData
         * @returns {number}
         * @memberof DriveLogDataProvider
         */
        /*private findMetaDataStart(networkCmdTrcData: ArrayBuffer): number{
            for(let i = 0; i < networkCmdTrcData.byteLength+4; i++){
                // TODO: Find start of MetaData in bin buffer if used in final version(maybe with kaitai parser)
                // 7B 22 6D 61 70 70 4D 6F 74 69 6F 6E 41 72 43 6F => {"mappMotionArCo(nfig)
                if(networkCmdTrcData[i] == 123 && networkCmdTrcData[i+1] == 34 && networkCmdTrcData[i+2] == 109 && networkCmdTrcData[i+3] == 97 && networkCmdTrcData[i+4] == 112 && networkCmdTrcData[i+5] == 112 ){
                    return i;
                }
            }
            return -1;
        }*/
        // -----------------------------Remove for release------------------------------------------
        /**
         * Parses the available network command trace *.bin data -> raises the eventDataAvailable when nwctProvider is finished with loading the data
         *
         * @private
         * @param {ArrayBuffer} networkCmdTrcData
         * @param {NwctMetaDataProvider} nwctMetaDataProvider
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.createNwctProvider = function (networkCmdTrcData, nwctMetaDataProvider) {
            return __awaiter(this, void 0, void 0, function () {
                var nwctProvider, namespaces;
                return __generator(this, function (_a) {
                    // Start with Progress 0% (loading resources)
                    this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadResourcesType, 0));
                    nwctProvider = new nwctProvider_1.NwctProvider(networkCmdTrcData, nwctMetaDataProvider);
                    nwctProvider.eventNamespacesLoaded.attach(this._namespacesLoadedHandler);
                    namespaces = this.getNeededNamespaces();
                    nwctProvider.loadTextSystemNamespaces(namespaces);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Searches for namespaces which are needed for the current nwctTrace data and returns them
         *
         * @private
         * @returns {Array<string>}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNeededNamespaces = function () {
            // TODO: load needed namespace names from target
            var namespaces = new Array();
            namespaces.push("BR/EventLog");
            return namespaces;
        };
        /**
         * Raised when loading namespaces is finished
         *
         * @private
         * @param {NwctProvider} sender
         * @param {*} args
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onNamespacesLoaded = function (sender, args) {
            // End with Progress 100% (loading resources)
            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadResourcesType, 100));
            // Update the data in the datamodel after loading of namespaces is finished
            var loggerDataModel = new driveLogDataModel_1.DriveLogDataModel();
            try {
                loggerDataModel.setNwctProvider(sender);
            }
            catch (e) {
                // No valid nwctProvider data
                this.showFileNotSupportedWarningWhenImportingFile();
            }
            this.eventDataAvailable.raise(this, loggerDataModel);
            // detach event namespacesLoaded
            sender.eventNamespacesLoaded.detach(this._namespacesLoadedHandler);
        };
        /**
         * Data zipped handler
         *
         * @private
         * @param {ZipContainer} sender
         * @param {*} zippedData
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onDataZippedHandler = function (sender, zippedData) {
            // download zipped network command trace snapshot(uploaded or imported)
            fileProvider_1.FileProvider.downloadData("DriveLogSnapShot" + fileProvider_1.FileProvider.DriveLogExportFileExt, zippedData);
            // Raise end exporting event 100%
            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.exportToFileType, 100));
            //Detach datazipped event
            sender.eventDataZipped.detach(this._dataZippedHandler);
        };
        /**
         * Data unzipped handler
         *
         * @private
         * @param {ZipContainer} sender
         * @param {*} unzippedData
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onDataUnzippedHandler = function (sender, unzippedData) {
            // Create new datamodel with the new data
            var loggerDataModel = new driveLogDataModel_1.DriveLogDataModel();
            loggerDataModel.setSettings(JSON.parse(unzippedData));
            // Raise dataAvailable event
            this.eventDataAvailable.raise(this, loggerDataModel);
            // End with Progress 100% (load from file)
            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 100));
            // Detach data unzipped event
            sender.eventDataUnzipped.detach(this._dataUnzippedHandler);
        };
        /**
         * Creates network command trace data for export in blob format (*.bin)
         *
         * @private
         * @param {{data: Blob}} ref
         * @memberof DriveLogDataProvider
         */
        /*private async createNetworkCommandTraceData(ref: {data: Blob}){
            let internalRef = {data: new Uint8Array()};
            await this.getNwctData(internalRef);
            this._currentNwctBinData = internalRef.data;
            ref.data = this.getCurrentBinDataAsBlob();
            
        }*/
        /**
         * Returns the current bin data(uploaded or imported) incl. metadata as blob (else empty blob if error)
         *
         * @private
         * @returns {Blob}
         * @memberof DriveLogDataProvider
         */
        /*private getCurrentBinDataAsBlob(): Blob{
            // Add Network Command Trace Buffer and add dynamic MetaData
            //let data = new Blob([new Uint8Array(this._currentNwctBinData)]);
            let mergedArray: Uint8Array|undefined;
            let data = new Uint8Array(this._currentNwctBinData);
            if(this._currentMetaDataBuffer != undefined){
                let metaData =  new Uint8Array(this._currentMetaDataBuffer);
                mergedArray = new Uint8Array(data.length + metaData.length);
                mergedArray.set(data);
                mergedArray.set(metaData, data.length);
            }
            else{
                console.error("No metadata available!");
            }
            if(mergedArray != undefined){
                let blob = new Blob([mergedArray]);
                return blob;
            }
            // Return emtpy blob in case of an error
            return new Blob();
        }*/
        /**
         * Converts a string to an array buffer
         *
         * @private
         * @param {string} str
         * @returns {Uint8Array}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.str2ab = function (str) {
            var buf = new Uint8Array(str.length);
            for (var i = 0, strLen = str.length; i < strLen; i++) {
                buf[i] = str.charCodeAt(i);
            }
            return buf;
        };
        /**
         * Converts an array buffer to a string
         *
         * @private
         * @param {ArrayBuffer} buf
         * @returns {string}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.ab2str = function (buf) {
            return new TextDecoder().decode(buf);
        };
        /**
         * Upload network command trace data
         *
         * @private
         * @param {{data: Uint8Array}} ref
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNwctData = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loadData(this._getDriveLogSnapshot, ref)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload the dynamic meta data for the network command trace
         *
         * @private
         * @param {{data: Uint8Array}} ref
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNwctDynamicMetaData = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                var refMetaData, metaData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refMetaData = { data: new Uint8Array() };
                            return [4 /*yield*/, this.loadData(this._getDriveLogConfigInfo, refMetaData, 1)];
                        case 1:
                            _a.sent();
                            metaData = this.ab2str(refMetaData.data);
                            ref.data = metaData;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload the static meta data for the network command trace for the acopos parameters
         *
         * @private
         * @param {{data: Uint8Array}} ref
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNwctStaticMetaDataAcoposParameter = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                var refMetaData, metaData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refMetaData = { data: new Uint8Array() };
                            return [4 /*yield*/, this.loadData(this._getDriveLogConfigInfo, refMetaData, 2)];
                        case 1:
                            _a.sent();
                            metaData = this.ab2str(refMetaData.data);
                            ref.data = metaData;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload the static meta data for the network command trace for the error infos
         *
         * @private
         * @param {{data: Uint8Array}} ref
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNwctStaticMetaDataErrorInfo = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                var refMetaData, metaData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refMetaData = { data: new Uint8Array() };
                            return [4 /*yield*/, this.loadData(this._getDriveLogConfigInfo, refMetaData, 3)];
                        case 1:
                            _a.sent();
                            metaData = this.ab2str(refMetaData.data);
                            ref.data = metaData;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Load data from target with the given component method
         *
         * @private
         * @param {MappCockpitComponentMethod} componentMethod
         * @param {{data: Uint8Array}} ref
         * @param {number} [additionalId=0] id which data should be loaded(needed for loading dynamically metaData)
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.loadData = function (componentMethod, ref, additionalId) {
            if (additionalId === void 0) { additionalId = 0; }
            return __awaiter(this, void 0, void 0, function () {
                var startOffset, maxBytes, inputCounter, startOffsetInputIndex, maxBytesInputIndex, result, dataLength, data, encData, i, encData_1, i, progress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startOffset = 0;
                            maxBytes = 32768;
                            // Start with Progress 0% (load from target) => currently only for nwct Bin Data
                            if (componentMethod == this._getDriveLogSnapshot) {
                                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromTargetType, 0));
                            }
                            inputCounter = 0;
                            if (additionalId != 0) {
                                componentMethod.inputParameters[inputCounter].value = additionalId;
                                inputCounter++;
                            }
                            startOffsetInputIndex = inputCounter;
                            maxBytesInputIndex = inputCounter + 1;
                            componentMethod.inputParameters[startOffsetInputIndex].value = startOffset;
                            componentMethod.inputParameters[maxBytesInputIndex].value = maxBytes;
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(componentMethod)];
                        case 1:
                            result = _a.sent();
                            dataLength = result.args.DataLeft + result.args.DataRead;
                            data = new Uint8Array(dataLength);
                            encData = this.encodeBase64(result.args.Data);
                            for (i = 0; i < encData.length; i++) {
                                data[startOffset + i] = encData[i];
                            }
                            startOffset += result.args.DataRead;
                            if (!(result.args.DataLeft == 0)) return [3 /*break*/, 2];
                            // Data loaded completly
                            if (componentMethod == this._getDriveLogSnapshot) {
                                // raise event -> 100% progress
                                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromTargetType, 100));
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(result.args.DataLeft > 0)) return [3 /*break*/, 4];
                            componentMethod.inputParameters[startOffsetInputIndex].value = startOffset;
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(componentMethod)];
                        case 3:
                            result = _a.sent();
                            encData_1 = this.encodeBase64(result.args.Data);
                            for (i = 0; i < encData_1.length; i++) {
                                data[startOffset + i] = encData_1[i];
                            }
                            startOffset += result.args.DataRead;
                            // Calculate progress after every loaded datapart (load from target) => currently only for nwct Bin Data
                            if (componentMethod == this._getDriveLogSnapshot) {
                                progress = 100 - (result.args.DataLeft * 100) / dataLength;
                                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromTargetType, Math.round(progress)));
                            }
                            return [3 /*break*/, 2];
                        case 4:
                            ref.data = data;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Convert from base64 string to Uint8Array
         *
         * @private
         * @param {any} base64
         * @returns {Uint8Array}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.encodeBase64 = function (base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes;
        };
        /**
         * Executes a command on the target to look if there is some network command trace data available
         *
         * @private
         * @returns
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.dataAvailable = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._getDriveLogSnapshot.inputParameters[0].value = 0;
                            this._getDriveLogSnapshot.inputParameters[1].value = 10;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 20)) return [3 /*break*/, 5];
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._getDriveLogSnapshot)];
                        case 2:
                            result = _a.sent();
                            if (result.args != undefined && result.args.DataRead == 10) {
                                return [2 /*return*/, true];
                            }
                            return [4 /*yield*/, this.sleep(200)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, false];
                    }
                });
            });
        };
        /**
         * Wait some time
         *
         * @private
         * @param {number} ms time to wait in milliseconds
         * @returns
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.sleep = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        /**
         * Method names for loading the drive log snapshot and the drive log config infos
         *
         * @static
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.createDriveLogSnapshotMethodName = "CreateDriveLogSnapshot";
        DriveLogDataProvider.getDriveLogSnapshotMethodName = "GetDriveLogSnapshot";
        DriveLogDataProvider.getDriveLogConfigInfoMethodName = "GetDriveLogConfigInfo";
        return DriveLogDataProvider;
    }());
    exports.DriveLogDataProvider = DriveLogDataProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dEYXRhUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9nZ2VyV2lkZ2V0L2RyaXZlTG9nL2RyaXZlTG9nRGF0YVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVBOzs7OztPQUtHO0lBQ0g7UUFpSEk7Ozs7V0FJRztRQUNILDhCQUFtQixhQUFtQztZQUF0RCxpQkFLQztZQTVFRDs7Ozs7ZUFLRztZQUNLLCtCQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXRDLENBQXNDLENBQUM7WUFFM0Y7Ozs7O2VBS0c7WUFDSyw2QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBRXpGOzs7OztlQUtHO1lBQ0ssdUJBQWtCLEdBQUcsVUFBQyxNQUFNLEVBQUUsVUFBVSxJQUFHLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQztZQUVoRzs7Ozs7ZUFLRztZQUNLLHlCQUFvQixHQUFHLFVBQUMsTUFBTSxFQUFFLFlBQVksSUFBRyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLEVBQWhELENBQWdELENBQUM7WUFFeEc7Ozs7ZUFJRztZQUNILHVCQUFrQixHQUFHLElBQUksZ0RBQWtCLEVBQUUsQ0FBQztZQUU5Qzs7OztlQUlHO1lBQ0gsb0NBQStCLEdBQUcsSUFBSSxzREFBd0IsRUFBRSxDQUFDO1lBNEI3RCxJQUFJLENBQUMsYUFBYSxHQUFHLElB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RUFBRSxFQUFFLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUE5eUJEOzs7OztXQUtHO1FBQ29CLHFEQUFnQyxHQUFHLHdCQUF3QixDQUFDO1FBQzVELGtEQUE2QixHQUFHLHFCQUFxQixDQUFDO1FBQ3RELG9EQUErQixHQUFHLHVCQUF1QixDQUFDO1FBdXlCckYsMkJBQUM7S0FBQSxBQXQ1QkQsSUFzNUJDO0lBdDVCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJTG9nZ2VyRGF0YVByb3ZpZGVyLCBFdmVudERhdGFBdmFpbGFibGUsIEV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzcyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2xvZ2dlckRhdGFQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEcml2ZUxvZ0RhdGFNb2RlbCB9IGZyb20gXCIuL2RyaXZlTG9nRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IE53Y3RQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL253Y3RQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyB9IGZyb20gXCIuLi9kYXRhTG9hZGluZ1Byb2dyZXNzQXJnc1wiO1xyXG5pbXBvcnQgeyBOd2N0TWV0YURhdGFQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL253Y3RNZXRhRGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE53Y3REeW5hbWljTWV0YURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9ud2N0RHluYW1pY01ldGFEYXRhXCI7XHJcbmltcG9ydCB7IE53Y3RTdGF0aWNNZXRhRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL253Y3RTdGF0aWNNZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBJQnJNb2R1bGVQYXJzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9pbnRlcmZhY2VzL2JyTW9kdWxlUGFyc2VySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJyTW9kdWxlUGFyc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvYnJNb2R1bGVQYXJzZXJcIjtcclxuXHJcbmltcG9ydCB7IFppcENvbnRhaW5lciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vemlwQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IEFsZXJ0RGlhbG9nLCBtZXNzYWdlQm94VHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24vYWxlcnREaWFsb2dcIjtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHNvbWUgZnVuY3Rpb25hbGl0eSB0byBleHBvcnQvaW1wb3J0IG9yIHVwbG9hZCBzb21lIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRHJpdmVMb2dEYXRhUHJvdmlkZXIgaW1wbGVtZW50cyBJTG9nZ2VyRGF0YVByb3ZpZGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIG1ldGhvZCB0byBjcmVhdGUgYSBuZXR3b3JrIGNvbW1hbmQgc25hcHNob3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NyZWF0ZURyaXZlTG9nU25hcHNob3RNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIG1ldGhvZCB0byB1cGxvYWQgdGhlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXREcml2ZUxvZ1NuYXBzaG90OiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBtZXRob2QgdG8gdXBsb2FkIHRoZSBkeW5hbWljIGFuZCBzdGF0aWMgbWV0YSBkYXRhIGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0RHJpdmVMb2dDb25maWdJbmZvOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgZmlsZXByb3ZpZGVyKG5lZWRlZCBmb3IgaW1wb3J0L2V4cG9ydCBvZiBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0ZpbGVQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9maWxlUHJvdmlkZXI6IEZpbGVQcm92aWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBud2N0TWV0YURhdGFQcm92aWRlciBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7SVRleHRQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9ud2N0TWV0YURhdGFQcm92aWRlcjogTndjdE1ldGFEYXRhUHJvdmlkZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3IgdGhlIGZpbGUgcHJvdmlkZXIgd2hlbiBsb2FkaW5nIGRhdGEgZnJvbSBmaWxlIGlzIGZpbmlzaGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vblVwbG9hZERhdGFGaW5pc2hlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBuYW1lc3BhY2VzIGZvciB0ZXh0c3lzdGVtIGxvYWRpbmcgZmluaXNoZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX25hbWVzcGFjZXNMb2FkZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncyk9PnRoaXMub25OYW1lc3BhY2VzTG9hZGVkKHNlbmRlciwgYXJncyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBkYXRhIHppcHBlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGF0YVppcHBlZEhhbmRsZXIgPSAoc2VuZGVyLCB6aXBwZWREYXRhKT0+dGhpcy5vbkRhdGFaaXBwZWRIYW5kbGVyKHNlbmRlciwgemlwcGVkRGF0YSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBkYXRhIHVuemlwcGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kYXRhVW56aXBwZWRIYW5kbGVyID0gKHNlbmRlciwgdW56aXBwZWREYXRhKT0+dGhpcy5vbkRhdGFVbnppcHBlZEhhbmRsZXIoc2VuZGVyLCB1bnppcHBlZERhdGEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXZlbnQgdG8gaW5mb3JtIHdoZW4gc29tZSBkYXRhIGlzIGF2YWlsYWJsZShlLmcuIGxvYWRpbmcgZnJvbSBmaWxlIG9yIGZyb20gdGFyZ2V0KVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBldmVudERhdGFBdmFpbGFibGUgPSBuZXcgRXZlbnREYXRhQXZhaWxhYmxlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCB0byBpbmZvcm0gaG93IG1hbnkgZGF0YSBpcyBhbHJlYWR5IGxvYWRlZChlLmcuIDAlLCAxMCUsIC4uLi4sIDEwMCUpO1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkID0gbmV3IEV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzcygpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXMgdGhlcmUgc29tZSBkYXRhIGF2YWlsYWJsZSB0byBleHBvcnQgc29tZXRoaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRXhwb3J0UG9zc2libGUoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCBuYW1lcyBmb3IgbG9hZGluZyB0aGUgZHJpdmUgbG9nIHNuYXBzaG90IGFuZCB0aGUgZHJpdmUgbG9nIGNvbmZpZyBpbmZvc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZURyaXZlTG9nU25hcHNob3RNZXRob2ROYW1lID0gXCJDcmVhdGVEcml2ZUxvZ1NuYXBzaG90XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdldERyaXZlTG9nU25hcHNob3RNZXRob2ROYW1lID0gXCJHZXREcml2ZUxvZ1NuYXBzaG90XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdldERyaXZlTG9nQ29uZmlnSW5mb01ldGhvZE5hbWUgPSBcIkdldERyaXZlTG9nQ29uZmlnSW5mb1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOZXR3b3JrQ29tbWFuZFRyYWNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG53Y3RDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobndjdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpe1xyXG4gICAgICAgIHRoaXMuX2ZpbGVQcm92aWRlciA9IG5ldyBGaWxlUHJvdmlkZXIodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZCA9IG53Y3RDb21wb25lbnQubWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IHtyZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gRHJpdmVMb2dEYXRhUHJvdmlkZXIuY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZE5hbWV9KVswXTtcclxuICAgICAgICB0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90ID0gbndjdENvbXBvbmVudC5tZXRob2RzLmZpbHRlcihtZXRob2QgPT4ge3JldHVybiBtZXRob2QuYnJvd3NlTmFtZSA9PSBEcml2ZUxvZ0RhdGFQcm92aWRlci5nZXREcml2ZUxvZ1NuYXBzaG90TWV0aG9kTmFtZX0pWzBdO1xyXG4gICAgICAgIHRoaXMuX2dldERyaXZlTG9nQ29uZmlnSW5mbyA9IG53Y3RDb21wb25lbnQubWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IHtyZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gRHJpdmVMb2dEYXRhUHJvdmlkZXIuZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kTmFtZX0pWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBsb2FkcyB0aGUgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgZnJvbSB0YXJnZXQgKGV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkIHdpbGwgYmUgcmFpc2UpKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVwbG9hZERhdGFGcm9tVGFyZ2V0KCl7XHJcbiAgICAgICAgaWYodGhpcy5fY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90IG9uIHRhcmdldFxyXG4gICAgICAgICAgICBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2NyZWF0ZURyaXZlTG9nU25hcHNob3RNZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFBdmFpbGFibGUgPSBhd2FpdCB0aGlzLmRhdGFBdmFpbGFibGUoKTtcclxuICAgICAgICAgICAgaWYoZGF0YUF2YWlsYWJsZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlZiA9IHtkYXRhOiBuZXcgVWludDhBcnJheSgpfTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0TndjdERhdGEocmVmKTtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TndjdEJpbkRhdGEgPSByZWYuZGF0YTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IER5bmFtaWNNZXRhRGF0YSBmcm9tIHRhcmdldChvcGMgdWEgbWV0aG9kcylcclxuICAgICAgICAgICAgICAgIGxldCBkeW5hbWljTWV0YURhdGEgPSBhd2FpdCB0aGlzLmdldER5bmFtaWNNZXRhRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbndjdCBwcm92aWRlclxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlciA9IG5ldyBOd2N0TWV0YURhdGFQcm92aWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgc3RhdGljIGRhdGEgKHBhcmFtZXRlciBkZWZpbml0aW9ucywgZXJyb3IgaW5mbyBkZWZpbml0aW9ucywgLi4uKSBhZnRlciBjcmVhdGluZyB0aGUgTndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdGljTWV0YURhdGFGcm9tVGFyZ2V0ID0gYXdhaXQgdGhpcy5nZXRTdGF0aWNNZXRhRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLnNldFN0YXRpY01ldGFEYXRhKHN0YXRpY01ldGFEYXRhRnJvbVRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZHluYW1pYyBkYXRhKG5ldHdvcmsgaW50ZXJmYWNlIG5hbWVzLCBjb21wb25lbnQgbmFtZXMsIC4uLikgZm9yIGV2ZXJ5IG5ldyB1cGxvYWQgb2YgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLnNldER5bmFtaWNNZXRhRGF0YShkeW5hbWljTWV0YURhdGEpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVOd2N0UHJvdmlkZXIoY3VycmVudE53Y3RCaW5EYXRhLCB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YSBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzdGF0aWMgbWV0YSBkYXRhIGZyb20gdGFyZ2V0IChPUEMgVUEgbWV0aG9kcylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgeyhQcm9taXNlPE53Y3RTdGF0aWNNZXRhRGF0YXx1bmRlZmluZWQ+KX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldFN0YXRpY01ldGFEYXRhKCk6IFByb21pc2U8TndjdFN0YXRpY01ldGFEYXRhfHVuZGVmaW5lZD57XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFjb3Bvc1BhcmFtZXRlclN0YXRpY0RhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGVycm9ySW5mb1N0YXRpY0RhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbG9hZCBhY29wb3MgcGFyYW1ldGVyIG1ldGEgZGF0YVxyXG4gICAgICAgIGxldCByZWZNZXRhRGF0YSA9IHtkYXRhOiBcIlwifTtcclxuICAgICAgICBhd2FpdCB0aGlzLmdldE53Y3RTdGF0aWNNZXRhRGF0YUFjb3Bvc1BhcmFtZXRlcihyZWZNZXRhRGF0YSk7XHJcbiAgICAgICAgbGV0IHN0YXRpY2RhdGEgPSByZWZNZXRhRGF0YS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUganNvbiBvYmplY3RzXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBhY29wb3NQYXJhbWV0ZXJTdGF0aWNEYXRhID0gSlNPTi5wYXJzZShzdGF0aWNkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9ibGVtIHdpdGggZGF0YSBmcm9tIEdldERyaXZlTG9nQ29uZmlnSW5mbyB3aXRoIGlkIDIhXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsb2FkIGVycm9yIGluZm8gbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IHJlZk1ldGFEYXRhRXJyb3JJbmZvID0ge2RhdGE6IFwiXCJ9O1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0TndjdFN0YXRpY01ldGFEYXRhRXJyb3JJbmZvKHJlZk1ldGFEYXRhRXJyb3JJbmZvKTtcclxuICAgICAgICBsZXQgZXJyb3JJbmZvU3RhdGljZGF0YSA9IHJlZk1ldGFEYXRhRXJyb3JJbmZvLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBqc29uIG9iamVjdHNcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGVycm9ySW5mb1N0YXRpY0RhdGEgPSBKU09OLnBhcnNlKGVycm9ySW5mb1N0YXRpY2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlByb2JsZW0gd2l0aCBkYXRhIGZyb20gR2V0RHJpdmVMb2dDb25maWdJbmZvIHdpdGggaWQgMyFcIilcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGxvYWQgZGF0YSBpbnRvIHNhdGljIG1ldGFEYXRhIG9iamVjdFxyXG4gICAgICAgIHJldHVybiBuZXcgTndjdFN0YXRpY01ldGFEYXRhKGFjb3Bvc1BhcmFtZXRlclN0YXRpY0RhdGEsIGVycm9ySW5mb1N0YXRpY0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZHluYW1pYyBtZXRhIGRhdGEgZnJvbSB0aGUgdGFyZ2V0IChPUEMgVUEgbWV0aG9kcylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgeyhQcm9taXNlPE53Y3REeW5hbWljTWV0YURhdGF8dW5kZWZpbmVkPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXREeW5hbWljTWV0YURhdGEoKTogUHJvbWlzZTxOd2N0RHluYW1pY01ldGFEYXRhfHVuZGVmaW5lZD57XHJcbiAgICAgICAgbGV0IHJlZk1ldGFEYXRhID0ge2RhdGE6IFwiXCJ9O1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0TndjdER5bmFtaWNNZXRhRGF0YShyZWZNZXRhRGF0YSk7XHJcbiAgICAgICAgbGV0IGR5bmRhdGEgPSByZWZNZXRhRGF0YS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUganNvbiBvYmplY3RzXHJcbiAgICAgICAgbGV0IG1hcHBNb3Rpb25BckNvbmZpZ09iamVjdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIG1hcHBNb3Rpb25BckNvbmZpZ09iamVjdCA9IEpTT04ucGFyc2UoZHluZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUHJvYmxlbSB3aXRoIGRhdGEgZnJvbSBHZXREcml2ZUxvZ0NvbmZpZ0luZm8gd2l0aCBpZCAxIVwiKVxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbG9hZCBkYXRhIGludG8gZHluYW1pYyBtZXRhRGF0YSBvYmplY3RcclxuICAgICAgICByZXR1cm4gbmV3IE53Y3REeW5hbWljTWV0YURhdGEobWFwcE1vdGlvbkFyQ29uZmlnT2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgdGhlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0IHRvIGEgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICAvKnB1YmxpYyBhc3luYyBleHBvcnRVcGxvYWROZXR3b3JrQ29tbWFuZFRyYWNlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90IG9uIHRhcmdldFxyXG4gICAgICAgICAgICBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2NyZWF0ZURyaXZlTG9nU25hcHNob3RNZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFBdmFpbGFibGUgPSBhd2FpdCB0aGlzLmRhdGFBdmFpbGFibGUoKTtcclxuICAgICAgICAgICAgaWYoZGF0YUF2YWlsYWJsZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90IGZyb20gdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVmID0ge2RhdGE6IG5ldyBCbG9iKCl9O1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVOZXR3b3JrQ29tbWFuZFRyYWNlRGF0YShyZWYpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRvd25sb2FkIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBzbmFwc2hvdFxyXG4gICAgICAgICAgICAgICAgRmlsZVByb3ZpZGVyLmRvd25sb2FkRGF0YShcIkRyaXZlTG9nU25hcFNob3RcIiArIEZpbGVQcm92aWRlci5CaW5GaWxlRXh0LCByZWYuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YSBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIHRoZSBsYXN0IGltcG9ydGVkL3VwbG9hZGVkIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhIHRvIGEgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICAvKnB1YmxpYyBleHBvcnRDdXJyZW50RGF0YVRvRmlsZSgpe1xyXG4gICAgICAgIGxldCBiaW5CbG9iRGF0YSA9IHRoaXMuZ2V0Q3VycmVudEJpbkRhdGFBc0Jsb2IoKTtcclxuICAgICAgICBpZihiaW5CbG9iRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBkb3dubG9hZCBjdXJyZW50IGV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90KHVwbG9hZGVkIG9yIGltcG9ydGVkKVxyXG4gICAgICAgICAgICBGaWxlUHJvdmlkZXIuZG93bmxvYWREYXRhKFwiRHJpdmVMb2dTbmFwU2hvdFwiICsgRmlsZVByb3ZpZGVyLkJpbkZpbGVFeHQsIGJpbkJsb2JEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydCB0aGUgZGF0IHRvIHppcCBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCbG9ifSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4cG9ydERhdGFUb0ZpbGUoZGF0YTogQmxvYil7XHJcbiAgICAgICAgaWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBSYWlzZSBzdGFydCBleHBvcnRpbmcgZXZlbnQgMCVcclxuICAgICAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5leHBvcnRUb0ZpbGVUeXBlLCAwKSk7XHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IGNvbXByZXNzaW5nIGRhdGFcclxuICAgICAgICAgICAgdGhpcy56aXBEYXRhKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXByZXNzIGRhdGEgYW5kIHNhdmUgdG8gZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jsb2J9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHppcERhdGEoZGF0YTogQmxvYil7XHJcbiAgICAgICAgbGV0IHppcENvbnRhaW5lciA9IG5ldyBaaXBDb250YWluZXIoKTtcclxuICAgICAgICB6aXBDb250YWluZXIuYWRkRmlsZShcIkRyaXZlTG9nLmpzb25cIiwgZGF0YSk7XHJcbiAgICAgICAgemlwQ29udGFpbmVyLmV2ZW50RGF0YVppcHBlZC5hdHRhY2godGhpcy5fZGF0YVppcHBlZEhhbmRsZXIpO1xyXG4gICAgICAgIHppcENvbnRhaW5lci56aXBEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnRzIHNvbWUgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgZnJvbSBhIGZpbGVcclxuICAgICAqIFNob3dzIGFuIGZpbGUgZXhwbG9yZXIgdG8gc2VsZWN0IGEgZmlsZSBhbmQgc3RhcnRzIGxvYWRpbmcgdGhlIGZpbGUgZGF0YSAoZXZlbnRVcGxvYWREYXRhRmluaXNoZWQgd2lsbCBiZSByYWlzZSlcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcG9ydERhdGFGcm9tRmlsZSgpe1xyXG4gICAgICAgIHRoaXMuX2ZpbGVQcm92aWRlci5ldmVudFVwbG9hZERhdGFGaW5pc2hlZC5hdHRhY2godGhpcy5fdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmlsZVByb3ZpZGVyLnVwbG9hZERhdGEoRmlsZVByb3ZpZGVyLkRyaXZlTG9nRXhwb3J0RmlsZUV4dCArIFwiLFwiICsgRmlsZVByb3ZpZGVyLkJyRmlsZUV4dCApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2NjdXJzIGFmdGVyIHJlYWRpbmcgZGF0YSBmcm9tIGZpbGUodHJhY2UgY29uZmlndXJhdGlvbiBpbXBvcnQgZGF0YSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyOiBIVE1MSW5wdXRFbGVtZW50LCBhcmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KXtcclxuXHRcdC8vIFRpbWVvdXQgbmVlZGVkIHRvIHNob3cgc29tZSBidXN5c2NyZWVuIGJlZm9yZSBpbXBvcnRpbmcgZGF0YSBvdGhlcndpc2UgVUkgaGF2ZSBubyB0aW1lIHRvIHVwZGF0ZVxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLm9uRGF0YUF2YWlsYWJsZShzZW5kZXIsIGFyZ3MpLCAyMDApO1xyXG5cclxuXHRcdHRoaXMuX2ZpbGVQcm92aWRlci5ldmVudFVwbG9hZERhdGFGaW5pc2hlZC5kZXRhY2godGhpcy5fdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiB0aGUgZGF0YSBmcm9tIGEgbG9hZGVkIGZpbGUgaXMgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmlsZUlucHV0RWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGF0YUF2YWlsYWJsZShmaWxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LCBmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG4gICAgICAgIGlmKGZpbGVDb250ZW50cy5zaXplID09PSAxKXtcclxuICAgICAgICAgICAgLy8gU3RhcnQgd2l0aCBQcm9ncmVzcyAwJSAobG9hZCBmcm9tIGZpbGUpXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZC5yYWlzZSh0aGlzLCBuZXcgRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MoRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MubG9hZEZyb21GaWxlVHlwZSwgMCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGltZW91dCBuZWVkZWQgdG8gc2hvdyB0aGUgYnVzeXNjcmVlbiBiZWZvcmUgZXhwb3J0aW5nIGRhdGEgXHJcblx0XHQgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmludGVycHJldERhdGEoZmlsZUNvbnRlbnRzKSwgMjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgZnJvbSBmaWxlIChldmVudFVwbG9hZERhdGFGaW5pc2hlZCB3aWxsIGJlIHJhaXNlKSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBmaWxlQ29udGVudHNcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGludGVycHJldERhdGEoZmlsZUNvbnRlbnRzKXtcclxuICAgICAgICBsZXQgZmlsZWRhdGE6c3RyaW5nID0gZmlsZUNvbnRlbnRzLnZhbHVlcygpLm5leHQoKS52YWx1ZTtcclxuICAgICAgICBsZXQgZmlsZW5hbWUgPSBmaWxlQ29udGVudHMua2V5cygpLm5leHQoKS52YWx1ZTtcclxuICAgICAgICBpZihmaWxlbmFtZS5lbmRzV2l0aChGaWxlUHJvdmlkZXIuQnJGaWxlRXh0KSl7IC8vIFNETSBiciBmaWxlIGltcG9ydFxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmltcG9ydFNkbUJyRmlsZShmaWxlZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlbmFtZS5lbmRzV2l0aChGaWxlUHJvdmlkZXIuRHJpdmVMb2dFeHBvcnRGaWxlRXh0KSl7IC8vIGRsZSBmaWxlIERyaXZlTG9nIGltcG9ydFxyXG4gICAgICAgICAgICB0aGlzLmltcG9ydERsZUZpbGUoZmlsZWRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qZWxzZSBpZihmaWxlbmFtZS5lbmRzV2l0aChGaWxlUHJvdmlkZXIuQmluRmlsZUV4dCkpeyAvLyBCaW4gZmlsZSBpbXBvcnRcclxuICAgICAgICAgICAgdGhpcy5pbXBvcnRCaW5GaWxlKGZpbGVkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZC5yYWlzZSh0aGlzLCBuZXcgRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MoRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MubG9hZEZyb21GaWxlVHlwZSwgMTAwKSk7XHJcbiAgICAgICAgdGhpcy5zaG93RmlsZU5vdFN1cHBvcnRlZFdhcm5pbmdXaGVuSW1wb3J0aW5nRmlsZSgpO1xyXG4gICAgICAgIC8vIFJhaXNlIEVtdHB5RGF0YU1vZGVsIHRvIGNsZWFyIHRoZSB2aWV3XHJcbiAgICAgICAgdGhpcy5yYWlzZUVtcHR5RGF0YU1vZGVsKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBkYXRhQXZhaWxhYmxlIGV2ZW50IHdpdGggYW4gZW1wdHkgZGF0YW1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJhaXNlRW1wdHlEYXRhTW9kZWwoKXtcclxuICAgICAgICBsZXQgbG9nZ2VyRGF0YU1vZGVsID0gbmV3IERyaXZlTG9nRGF0YU1vZGVsKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFBdmFpbGFibGUucmFpc2UodGhpcywgbG9nZ2VyRGF0YU1vZGVsKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnQgU0RNIGJyIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVkYXRhXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgaW1wb3J0U2RtQnJGaWxlKGZpbGVkYXRhOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIENvbnZlcnQgYmluIHN0cmluZyB0byBhcnJheSBidWZmZXIgXHJcbiAgICAgICAgbGV0IGFycmF5QnVmZmVyMiA9IHRoaXMuc3RyMmFiKGZpbGVkYXRhKTtcclxuXHJcbiAgICAgICAgLy8gUmVjZWl2ZSB0aGUgcGFyc2VkIGJyIG1vZHVsZSBkYXRhXHJcbiAgICAgICAgbGV0IGJyTW9kdWxlRGF0YTogSUJyTW9kdWxlUGFyc2VyID0gbmV3IEJyTW9kdWxlUGFyc2VyKGFycmF5QnVmZmVyMik7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGl0cyBhbiB2YWxpZCBOQyBkYXRhIFxyXG4gICAgICAgIGlmKGJyTW9kdWxlRGF0YS5pc05DRGF0YSA9PT0gZmFsc2UgfHwgYnJNb2R1bGVEYXRhLmhhczZTZWN0aW9ucyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy9oYW5kbGUgZXJyb3JcclxuICAgICAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbUZpbGVUeXBlLCAxMDApKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmlsZU5vdFN1cHBvcnRlZFdhcm5pbmdXaGVuSW1wb3J0aW5nRmlsZSgpO1xyXG4gICAgICAgICAgICAvLyBSYWlzZSBFbXRweURhdGFNb2RlbCB0byBjbGVhciB0aGUgdmlld1xyXG4gICAgICAgICAgICB0aGlzLnJhaXNlRW1wdHlEYXRhTW9kZWwoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbUZpbGVUeXBlLCAxMDApKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGpzb24gb2JqZWN0c1xyXG4gICAgICAgIGxldCBtYXBwTW90aW9uQXJDb25maWdPYmplY3QgPSBKU09OLnBhcnNlKGJyTW9kdWxlRGF0YS5tYXBwTW90aW9uQXJDb25maWcpO1xyXG5cclxuICAgICAgICAvLyBsb2FkIGRhdGEgaW50byBkeW5hbWljIG1ldGFEYXRhIG9iamVjdFxyXG4gICAgICAgIGxldCBkeW5hbWljTWV0YURhdGEgPSBuZXcgTndjdER5bmFtaWNNZXRhRGF0YShtYXBwTW90aW9uQXJDb25maWdPYmplY3QpO1xyXG4gICAgICAgIC8vIFRPRE86IHRyeSBjYXRjaCBmb3IgSlNPTiBwYXJzZVxyXG4gICAgICAgIGxldCBzdGF0aWNNZXRhRGF0YSA9IG5ldyBOd2N0U3RhdGljTWV0YURhdGEoSlNPTi5wYXJzZShick1vZHVsZURhdGEuYWNvcG9zUGFySURzKSwgSlNPTi5wYXJzZShick1vZHVsZURhdGEuYWNvcG9zRXJySW5mVHlwZXMpKTtcclxuXHJcbiAgICAgICAgbGV0IG53Y3RNZXRhRGF0YVByb3ZpZGVyID0gbmV3IE53Y3RNZXRhRGF0YVByb3ZpZGVyKCk7XHJcbiAgICAgICAgLy8gU2V0IHRoZSBzdGF0aWMgZGF0YSBmcm9tIHNkbSBiaW5hcnkgZmlsZSAocGFyYW1ldGVyIGRlZmluaXRpb25zLCBlcnJvciBpbmZvIGRlZmluaXRpb25zLCAuLi4pXHJcbiAgICAgICAgbndjdE1ldGFEYXRhUHJvdmlkZXIuc2V0U3RhdGljTWV0YURhdGEoc3RhdGljTWV0YURhdGEpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBkYXRhKG5ldHdvcmsgaW50ZXJmYWNlIG5hbWVzLCBjb21wb25lbnQgbmFtZXMsIC4uLikgZnJvbSBzZG0gYmluYXJ5IGZpbGVcclxuICAgICAgICBud2N0TWV0YURhdGFQcm92aWRlci5zZXREeW5hbWljTWV0YURhdGEoZHluYW1pY01ldGFEYXRhKTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVOd2N0UHJvdmlkZXIoYnJNb2R1bGVEYXRhLm1UcmNCaW5EYXQwMSwgbndjdE1ldGFEYXRhUHJvdmlkZXIpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuICAgICAqIENyZWF0ZXMgYSB3YXJuaW5nIG1lc3NhZ2Ugd2hlbiB0aGUgdXNlciBpbXBvcnRzIGEgLmJyIGZpbGUob3IgdW5zdXBwb3J0ZWQgZmlsZSBleHRlbnNpb24pIHdoaWNoIG9uZSBpcyBub3Qgc3VwcG9ydGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dGaWxlTm90U3VwcG9ydGVkV2FybmluZ1doZW5JbXBvcnRpbmdGaWxlKCkge1xyXG5cdFx0bmV3IEFsZXJ0RGlhbG9nKCkuY3JlYXRlTWVzc2FnZUJveChcIkZpbGUgbm90IHN1cHBvcnRlZFwiLCBcIkludmFsaWQgZmlsZSBmb3IgdGhpcyBvcGVyYXRpb24hXCIsIG1lc3NhZ2VCb3hUeXBlLldhcm5pbmcsIHVuZGVmaW5lZCk7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wb3J0IGRsZSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW1wb3J0RGxlRmlsZShmaWxlZGF0YTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgemlwQ29udGFpbmVyID0gbmV3IFppcENvbnRhaW5lcigpO1xyXG4gICAgICAgIHppcENvbnRhaW5lci5ldmVudERhdGFVbnppcHBlZC5hdHRhY2godGhpcy5fZGF0YVVuemlwcGVkSGFuZGxlcik7XHJcbiAgICAgICAgemlwQ29udGFpbmVyLnVuemlwRGF0YShmaWxlZGF0YSxcIkRyaXZlTG9nLmpzb25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1SZW1vdmUgZm9yIHJlbGVhc2UtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICogSW1wb3J0IGJpbiBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIC8qcHJpdmF0ZSBhc3luYyBpbXBvcnRCaW5GaWxlKGZpbGVkYXRhOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIENvbnZlcnQgYmluIHN0cmluZyB0byBhcnJheSBidWZmZXIgXHJcbiAgICAgICAgbGV0IGFycmF5QnVmZmVyID0gdGhpcy5zdHIyYWIoZmlsZWRhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEVuZCB3aXRoIFByb2dyZXNzIDEwMCUgKGxvYWQgZnJvbSBmaWxlKVxyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZC5yYWlzZSh0aGlzLCBuZXcgRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MoRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MubG9hZEZyb21GaWxlVHlwZSwgMTAwKSk7XHJcblxyXG4gICAgICAgIC8vIGdldCBEeW5hbWljTWV0YURhdGEgZnJvbSBkYXRhIGJ1ZmZlclxyXG4gICAgICAgIGxldCBkeW5hbWljTWV0YURhdGEgPSB0aGlzLmdldER5bmFtaWNNZXRhRGF0YUZyb21CdWZmZXIoYXJyYXlCdWZmZXIpO1xyXG4gICAgICAgIC8vIGdldCBvbmx5IHRoZSBkYXRhIGJ1ZmZlciB3aXRob3V0IG1ldGFEYXRhIGluZm9cclxuICAgICAgICBsZXQgZGF0YUJ1ZmZlciA9IHRoaXMuZ2V0RGF0YUJ1ZmZlcihhcnJheUJ1ZmZlcik7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBud2N0IHByb3ZpZGVyXHJcbiAgICAgICAgaWYodGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIgPSBuZXcgTndjdE1ldGFEYXRhUHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBzdGF0aWMgZGF0YSAocGFyYW1ldGVyIGRlZmluaXRpb25zLCBlcnJvciBpbmZvIGRlZmluaXRpb25zLCAuLi4pIGFmdGVyIGNyZWF0aW5nIHRoZSBOd2N0TWV0YURhdGFQcm92aWRlclxyXG4gICAgICAgICAgICBsZXQgc3RhdGljTWV0YURhdGFGcm9tVGFyZ2V0ID0gYXdhaXQgdGhpcy5nZXRTdGF0aWNNZXRhRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlci5zZXRTdGF0aWNNZXRhRGF0YShzdGF0aWNNZXRhRGF0YUZyb21UYXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgZGF0YShuZXR3b3JrIGludGVyZmFjZSBuYW1lcywgY29tcG9uZW50IG5hbWVzLCAuLi4pIGZvciBldmVyeSBuZXcgdXBsb2FkIG9mIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhXHJcbiAgICAgICAgdGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIuc2V0RHluYW1pY01ldGFEYXRhKGR5bmFtaWNNZXRhRGF0YSk7XHJcbiAgICAgICAgLy8gY3JlYXRlIG53Y3QgcHJvdmlkZXJcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZU53Y3RQcm92aWRlcihkYXRhQnVmZmVyLCB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlcik7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgb25seSB0aGUgbmV0d29yayBjb21tYW5kIHRyYWNlIGJ1ZmZlciB3aXRob3V0IHRoZSBtZXRhZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBuZXR3b3JrQ21kVHJjRGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5QnVmZmVyfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIC8qcHJpdmF0ZSBnZXREYXRhQnVmZmVyKG5ldHdvcmtDbWRUcmNEYXRhOiBBcnJheUJ1ZmZlcik6IEFycmF5QnVmZmVye1xyXG4gICAgICAgIGxldCBtZXRhRGF0YVN0YXJ0SW5kZXggPSB0aGlzLmZpbmRNZXRhRGF0YVN0YXJ0KG5ldHdvcmtDbWRUcmNEYXRhKTtcclxuICAgICAgICBsZXQgZGF0YUJ1ZmZlciA9IG5ldHdvcmtDbWRUcmNEYXRhO1xyXG4gICAgICAgIGlmKG1ldGFEYXRhU3RhcnRJbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgbWV0YURhdGFcclxuICAgICAgICAgICAgZGF0YUJ1ZmZlciA9IG5ldHdvcmtDbWRUcmNEYXRhLnNsaWNlKDAsbWV0YURhdGFTdGFydEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGFCdWZmZXI7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGR5bmFtaWMgbWV0YSBkYXRhIGZvdW5kIHdpdGhpbiB0aGUgZHJpdmUgbG9nIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBuZXR3b3JrQ21kVHJjRGF0YVxyXG4gICAgICogQHJldHVybnMgeyhOd2N0RHluYW1pY01ldGFEYXRhfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgLypwcml2YXRlIGdldER5bmFtaWNNZXRhRGF0YUZyb21CdWZmZXIobmV0d29ya0NtZFRyY0RhdGE6IEFycmF5QnVmZmVyKTogTndjdER5bmFtaWNNZXRhRGF0YXx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1ldGFEYXRhU3RhcnRJbmRleDogbnVtYmVyID0gdGhpcy5maW5kTWV0YURhdGFTdGFydChuZXR3b3JrQ21kVHJjRGF0YSk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRNZXRhRGF0YVN0cmluZztcclxuICAgICAgICBpZihtZXRhRGF0YVN0YXJ0SW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICAvLyBFeHRyYWN0IG1ldGFEYXRhXHJcbiAgICAgICAgICAgIGxldCBtZXRhRGF0YUJ1ZmZlciA9IG5ldHdvcmtDbWRUcmNEYXRhLnNsaWNlKG1ldGFEYXRhU3RhcnRJbmRleCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRNZXRhRGF0YVN0cmluZyA9IHRoaXMuYWIyc3RyKG1ldGFEYXRhQnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG1ldGFEYXRhT2JqZWN0OiBOd2N0RHluYW1pY01ldGFEYXRhfHVuZGVmaW5lZDtcclxuICAgICAgICBpZihjdXJyZW50TWV0YURhdGFTdHJpbmcgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBpbmRleE1hcHBNb3Rpb25BckNvbmZpZyA9IGN1cnJlbnRNZXRhRGF0YVN0cmluZy5zZWFyY2goXCJtYXBwTW90aW9uQXJDb25maWdcIik7XHJcbiAgICAgICAgICAgIGxldCBtYXBwTW90aW9uQXJDb25maWcgPSBjdXJyZW50TWV0YURhdGFTdHJpbmcuc3Vic3RyKGluZGV4TWFwcE1vdGlvbkFyQ29uZmlnLTIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld1NlY3Rpb24gPSBtYXBwTW90aW9uQXJDb25maWcuaW5kZXhPZihcIntcXFwiYWNvcG9zUGFySURzXFxcIjpcIik7XHJcbiAgICAgICAgICAgIGlmKG5ld1NlY3Rpb24gIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgbWFwcE1vdGlvbkFyQ29uZmlnID0gbWFwcE1vdGlvbkFyQ29uZmlnLnN1YnN0cigwLCBuZXdTZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZW5kSW5kZXggPSBtYXBwTW90aW9uQXJDb25maWcubGFzdEluZGV4T2YoXCJ9XCIpO1xyXG5cclxuICAgICAgICAgICAgbWFwcE1vdGlvbkFyQ29uZmlnID0gbWFwcE1vdGlvbkFyQ29uZmlnLnN1YnN0cigwLCBlbmRJbmRleCsxKTsgLy8gUmVtb3ZlIHdyb25nIGNoYXJhY3RlcnMgYXQgdGhlIGVuZFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGpzb24gb2JqZWN0c1xyXG4gICAgICAgICAgICBsZXQgbWFwcE1vdGlvbkFyQ29uZmlnT2JqZWN0ID0gSlNPTi5wYXJzZShtYXBwTW90aW9uQXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgLy8gbG9hZCBkYXRhIGludG8gZHluYW1pYyBtZXRhRGF0YSBvYmplY3RcclxuICAgICAgICAgICAgbWV0YURhdGFPYmplY3QgPSBuZXcgTndjdER5bmFtaWNNZXRhRGF0YShtYXBwTW90aW9uQXJDb25maWdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWV0YURhdGFPYmplY3Q7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgdGhlIGluZGV4IHdoZXJlIHRoZSBtZXRhRGF0YSBpcyBsb2NhdGVkIGluIHRoZSBiaW4gYnVmZmVyIGlmIGF2YWlsYWJsZSwgb3RoZXIgd2lzZSAtMVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBuZXR3b3JrQ21kVHJjRGF0YVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgZmluZE1ldGFEYXRhU3RhcnQobmV0d29ya0NtZFRyY0RhdGE6IEFycmF5QnVmZmVyKTogbnVtYmVye1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuZXR3b3JrQ21kVHJjRGF0YS5ieXRlTGVuZ3RoKzQ7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IEZpbmQgc3RhcnQgb2YgTWV0YURhdGEgaW4gYmluIGJ1ZmZlciBpZiB1c2VkIGluIGZpbmFsIHZlcnNpb24obWF5YmUgd2l0aCBrYWl0YWkgcGFyc2VyKVxyXG4gICAgICAgICAgICAvLyA3QiAyMiA2RCA2MSA3MCA3MCA0RCA2RiA3NCA2OSA2RiA2RSA0MSA3MiA0MyA2RiA9PiB7XCJtYXBwTW90aW9uQXJDbyhuZmlnKVxyXG4gICAgICAgICAgICBpZihuZXR3b3JrQ21kVHJjRGF0YVtpXSA9PSAxMjMgJiYgbmV0d29ya0NtZFRyY0RhdGFbaSsxXSA9PSAzNCAmJiBuZXR3b3JrQ21kVHJjRGF0YVtpKzJdID09IDEwOSAmJiBuZXR3b3JrQ21kVHJjRGF0YVtpKzNdID09IDk3ICYmIG5ldHdvcmtDbWRUcmNEYXRhW2krNF0gPT0gMTEyICYmIG5ldHdvcmtDbWRUcmNEYXRhW2krNV0gPT0gMTEyICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9Ki9cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUmVtb3ZlIGZvciByZWxlYXNlLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgdGhlIGF2YWlsYWJsZSBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgKi5iaW4gZGF0YSAtPiByYWlzZXMgdGhlIGV2ZW50RGF0YUF2YWlsYWJsZSB3aGVuIG53Y3RQcm92aWRlciBpcyBmaW5pc2hlZCB3aXRoIGxvYWRpbmcgdGhlIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gbmV0d29ya0NtZFRyY0RhdGFcclxuICAgICAqIEBwYXJhbSB7TndjdE1ldGFEYXRhUHJvdmlkZXJ9IG53Y3RNZXRhRGF0YVByb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVOd2N0UHJvdmlkZXIobmV0d29ya0NtZFRyY0RhdGE6IEFycmF5QnVmZmVyLCBud2N0TWV0YURhdGFQcm92aWRlcjogTndjdE1ldGFEYXRhUHJvdmlkZXIpe1xyXG4gICAgICAgIC8vIFN0YXJ0IHdpdGggUHJvZ3Jlc3MgMCUgKGxvYWRpbmcgcmVzb3VyY2VzKVxyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZC5yYWlzZSh0aGlzLCBuZXcgRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MoRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MubG9hZFJlc291cmNlc1R5cGUsIDApKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIG53Y3RQcm92aWRlciB0byBwcm92aWRlciB0aGUgZHJpdmUgbG9nIGRhdGEgZm9yIHRoZSBnaXZlbiBkYXRhIGJ1ZmZlclxyXG4gICAgICAgIGxldCBud2N0UHJvdmlkZXIgPSBuZXcgTndjdFByb3ZpZGVyKG5ldHdvcmtDbWRUcmNEYXRhLCBud2N0TWV0YURhdGFQcm92aWRlcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbndjdFByb3ZpZGVyLmV2ZW50TmFtZXNwYWNlc0xvYWRlZC5hdHRhY2godGhpcy5fbmFtZXNwYWNlc0xvYWRlZEhhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGxvYWQgbmVlZGVkIG5hbWVzcGFjZXMgICAgICAgIFxyXG4gICAgICAgIGxldCBuYW1lc3BhY2VzID0gdGhpcy5nZXROZWVkZWROYW1lc3BhY2VzKCk7XHJcbiAgICAgICAgbndjdFByb3ZpZGVyLmxvYWRUZXh0U3lzdGVtTmFtZXNwYWNlcyhuYW1lc3BhY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaGVzIGZvciBuYW1lc3BhY2VzIHdoaWNoIGFyZSBuZWVkZWQgZm9yIHRoZSBjdXJyZW50IG53Y3RUcmFjZSBkYXRhIGFuZCByZXR1cm5zIHRoZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXROZWVkZWROYW1lc3BhY2VzKCk6IEFycmF5PHN0cmluZz57XHJcbiAgICAgICAgLy8gVE9ETzogbG9hZCBuZWVkZWQgbmFtZXNwYWNlIG5hbWVzIGZyb20gdGFyZ2V0XHJcbiAgICAgICAgbGV0IG5hbWVzcGFjZXM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIG5hbWVzcGFjZXMucHVzaChcIkJSL0V2ZW50TG9nXCIpO1xyXG4gICAgICAgIHJldHVybiBuYW1lc3BhY2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VkIHdoZW4gbG9hZGluZyBuYW1lc3BhY2VzIGlzIGZpbmlzaGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TndjdFByb3ZpZGVyfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25OYW1lc3BhY2VzTG9hZGVkKHNlbmRlcjogTndjdFByb3ZpZGVyLCBhcmdzKXtcclxuICAgICAgICAvLyBFbmQgd2l0aCBQcm9ncmVzcyAxMDAlIChsb2FkaW5nIHJlc291cmNlcylcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQucmFpc2UodGhpcywgbmV3IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmxvYWRSZXNvdXJjZXNUeXBlLCAxMDApKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGRhdGEgaW4gdGhlIGRhdGFtb2RlbCBhZnRlciBsb2FkaW5nIG9mIG5hbWVzcGFjZXMgaXMgZmluaXNoZWRcclxuICAgICAgICBsZXQgbG9nZ2VyRGF0YU1vZGVsID0gbmV3IERyaXZlTG9nRGF0YU1vZGVsKCk7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsb2dnZXJEYXRhTW9kZWwuc2V0TndjdFByb3ZpZGVyKHNlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAvLyBObyB2YWxpZCBud2N0UHJvdmlkZXIgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnNob3dGaWxlTm90U3VwcG9ydGVkV2FybmluZ1doZW5JbXBvcnRpbmdGaWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhQXZhaWxhYmxlLnJhaXNlKHRoaXMsIGxvZ2dlckRhdGFNb2RlbCk7XHJcblxyXG4gICAgICAgIC8vIGRldGFjaCBldmVudCBuYW1lc3BhY2VzTG9hZGVkXHJcbiAgICAgICAgc2VuZGVyLmV2ZW50TmFtZXNwYWNlc0xvYWRlZC5kZXRhY2godGhpcy5fbmFtZXNwYWNlc0xvYWRlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0YSB6aXBwZWQgaGFuZGxlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1ppcENvbnRhaW5lcn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHppcHBlZERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGF0YVppcHBlZEhhbmRsZXIoc2VuZGVyOiBaaXBDb250YWluZXIsIHppcHBlZERhdGE6IGFueSl7XHJcbiAgICAgICAgLy8gZG93bmxvYWQgemlwcGVkIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBzbmFwc2hvdCh1cGxvYWRlZCBvciBpbXBvcnRlZClcclxuICAgICAgICBGaWxlUHJvdmlkZXIuZG93bmxvYWREYXRhKFwiRHJpdmVMb2dTbmFwU2hvdFwiICsgRmlsZVByb3ZpZGVyLkRyaXZlTG9nRXhwb3J0RmlsZUV4dCwgemlwcGVkRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmFpc2UgZW5kIGV4cG9ydGluZyBldmVudCAxMDAlXHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5leHBvcnRUb0ZpbGVUeXBlLCAxMDApKTtcclxuICAgICAgICBcclxuICAgICAgICAvL0RldGFjaCBkYXRhemlwcGVkIGV2ZW50XHJcbiAgICAgICAgc2VuZGVyLmV2ZW50RGF0YVppcHBlZC5kZXRhY2godGhpcy5fZGF0YVppcHBlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERhdGEgdW56aXBwZWQgaGFuZGxlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1ppcENvbnRhaW5lcn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHVuemlwcGVkRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgICBwcml2YXRlIG9uRGF0YVVuemlwcGVkSGFuZGxlcihzZW5kZXI6IFppcENvbnRhaW5lciwgdW56aXBwZWREYXRhOiBhbnkpe1xyXG4gICAgICAgIC8vIENyZWF0ZSBuZXcgZGF0YW1vZGVsIHdpdGggdGhlIG5ldyBkYXRhXHJcbiAgICAgICAgbGV0IGxvZ2dlckRhdGFNb2RlbCA9IG5ldyBEcml2ZUxvZ0RhdGFNb2RlbCgpO1xyXG4gICAgICAgIGxvZ2dlckRhdGFNb2RlbC5zZXRTZXR0aW5ncyhKU09OLnBhcnNlKHVuemlwcGVkRGF0YSkpO1xyXG5cclxuICAgICAgICAvLyBSYWlzZSBkYXRhQXZhaWxhYmxlIGV2ZW50XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFBdmFpbGFibGUucmFpc2UodGhpcywgbG9nZ2VyRGF0YU1vZGVsKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRW5kIHdpdGggUHJvZ3Jlc3MgMTAwJSAobG9hZCBmcm9tIGZpbGUpXHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbUZpbGVUeXBlLCAxMDApKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBEZXRhY2ggZGF0YSB1bnppcHBlZCBldmVudFxyXG4gICAgICAgIHNlbmRlci5ldmVudERhdGFVbnppcHBlZC5kZXRhY2godGhpcy5fZGF0YVVuemlwcGVkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhIGZvciBleHBvcnQgaW4gYmxvYiBmb3JtYXQgKCouYmluKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3tkYXRhOiBCbG9ifX0gcmVmXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgLypwcml2YXRlIGFzeW5jIGNyZWF0ZU5ldHdvcmtDb21tYW5kVHJhY2VEYXRhKHJlZjoge2RhdGE6IEJsb2J9KXtcclxuICAgICAgICBsZXQgaW50ZXJuYWxSZWYgPSB7ZGF0YTogbmV3IFVpbnQ4QXJyYXkoKX07XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXROd2N0RGF0YShpbnRlcm5hbFJlZik7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudE53Y3RCaW5EYXRhID0gaW50ZXJuYWxSZWYuZGF0YTtcclxuICAgICAgICByZWYuZGF0YSA9IHRoaXMuZ2V0Q3VycmVudEJpbkRhdGFBc0Jsb2IoKTtcclxuICAgICAgICBcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBiaW4gZGF0YSh1cGxvYWRlZCBvciBpbXBvcnRlZCkgaW5jbC4gbWV0YWRhdGEgYXMgYmxvYiAoZWxzZSBlbXB0eSBibG9iIGlmIGVycm9yKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QmxvYn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgZ2V0Q3VycmVudEJpbkRhdGFBc0Jsb2IoKTogQmxvYntcclxuICAgICAgICAvLyBBZGQgTmV0d29yayBDb21tYW5kIFRyYWNlIEJ1ZmZlciBhbmQgYWRkIGR5bmFtaWMgTWV0YURhdGFcclxuICAgICAgICAvL2xldCBkYXRhID0gbmV3IEJsb2IoW25ldyBVaW50OEFycmF5KHRoaXMuX2N1cnJlbnROd2N0QmluRGF0YSldKTtcclxuICAgICAgICBsZXQgbWVyZ2VkQXJyYXk6IFVpbnQ4QXJyYXl8dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fY3VycmVudE53Y3RCaW5EYXRhKTtcclxuICAgICAgICBpZih0aGlzLl9jdXJyZW50TWV0YURhdGFCdWZmZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG1ldGFEYXRhID0gIG5ldyBVaW50OEFycmF5KHRoaXMuX2N1cnJlbnRNZXRhRGF0YUJ1ZmZlcik7XHJcbiAgICAgICAgICAgIG1lcmdlZEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGggKyBtZXRhRGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBtZXJnZWRBcnJheS5zZXQoZGF0YSk7XHJcbiAgICAgICAgICAgIG1lcmdlZEFycmF5LnNldChtZXRhRGF0YSwgZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gbWV0YWRhdGEgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWVyZ2VkQXJyYXkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbbWVyZ2VkQXJyYXldKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJsb2I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJldHVybiBlbXRweSBibG9iIGluIGNhc2Ugb2YgYW4gZXJyb3JcclxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoKTtcclxuICAgIH0qL1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGFuIGFycmF5IGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKiBAcmV0dXJucyB7VWludDhBcnJheX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0cjJhYihzdHI6IHN0cmluZyk6IFVpbnQ4QXJyYXl7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGk9MCwgc3RyTGVuPXN0ci5sZW5ndGg7IGk8c3RyTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgYnVmW2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBidWY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhbiBhcnJheSBidWZmZXIgdG8gYSBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYnVmXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWIyc3RyKGJ1ZjogQXJyYXlCdWZmZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoYnVmKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZCBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3tkYXRhOiBVaW50OEFycmF5fX0gcmVmXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXROd2N0RGF0YShyZWY6IHtkYXRhOiBVaW50OEFycmF5fSl7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSh0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90LCByZWYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBsb2FkIHRoZSBkeW5hbWljIG1ldGEgZGF0YSBmb3IgdGhlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHt7ZGF0YTogVWludDhBcnJheX19IHJlZlxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0TndjdER5bmFtaWNNZXRhRGF0YShyZWY6IHtkYXRhOiBzdHJpbmd9KXtcclxuICAgICAgICAgLy8gZ2V0IGRhdGEgYnVmZmVyXHJcbiAgICAgICAgbGV0IHJlZk1ldGFEYXRhID0ge2RhdGE6IG5ldyBVaW50OEFycmF5KCl9O1xyXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEodGhpcy5fZ2V0RHJpdmVMb2dDb25maWdJbmZvLCByZWZNZXRhRGF0YSwgMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY29udmVydCBkYXRhIGJ1ZmZlciB0byBzdHJpbmdcclxuICAgICAgICBsZXQgbWV0YURhdGEgPSB0aGlzLmFiMnN0cihyZWZNZXRhRGF0YS5kYXRhKTtcclxuICAgICAgICByZWYuZGF0YSA9IG1ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBsb2FkIHRoZSBzdGF0aWMgbWV0YSBkYXRhIGZvciB0aGUgbmV0d29yayBjb21tYW5kIHRyYWNlIGZvciB0aGUgYWNvcG9zIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHt7ZGF0YTogVWludDhBcnJheX19IHJlZlxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0TndjdFN0YXRpY01ldGFEYXRhQWNvcG9zUGFyYW1ldGVyKHJlZjoge2RhdGE6IHN0cmluZ30pe1xyXG4gICAgICAgIC8vIGdldCBkYXRhIGJ1ZmZlclxyXG4gICAgICAgIGxldCByZWZNZXRhRGF0YSA9IHtkYXRhOiBuZXcgVWludDhBcnJheSgpfTtcclxuICAgICAgICBhd2FpdCB0aGlzLmxvYWREYXRhKHRoaXMuX2dldERyaXZlTG9nQ29uZmlnSW5mbywgcmVmTWV0YURhdGEsIDIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnZlcnQgZGF0YSBidWZmZXIgdG8gc3RyaW5nXHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0gdGhpcy5hYjJzdHIocmVmTWV0YURhdGEuZGF0YSk7XHJcbiAgICAgICAgcmVmLmRhdGEgPSBtZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZCB0aGUgc3RhdGljIG1ldGEgZGF0YSBmb3IgdGhlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBmb3IgdGhlIGVycm9yIGluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7e2RhdGE6IFVpbnQ4QXJyYXl9fSByZWZcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldE53Y3RTdGF0aWNNZXRhRGF0YUVycm9ySW5mbyhyZWY6IHtkYXRhOiBzdHJpbmd9KXtcclxuICAgICAgICAvLyBnZXQgZGF0YSBidWZmZXJcclxuICAgICAgICBsZXQgcmVmTWV0YURhdGEgPSB7ZGF0YTogbmV3IFVpbnQ4QXJyYXkoKX07XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSh0aGlzLl9nZXREcml2ZUxvZ0NvbmZpZ0luZm8sIHJlZk1ldGFEYXRhLCAzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjb252ZXJ0IGRhdGEgYnVmZmVyIHRvIHN0cmluZ1xyXG4gICAgICAgIGxldCBtZXRhRGF0YSA9IHRoaXMuYWIyc3RyKHJlZk1ldGFEYXRhLmRhdGEpO1xyXG4gICAgICAgIHJlZi5kYXRhID0gbWV0YURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGRhdGEgZnJvbSB0YXJnZXQgd2l0aCB0aGUgZ2l2ZW4gY29tcG9uZW50IG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBjb21wb25lbnRNZXRob2RcclxuICAgICAqIEBwYXJhbSB7e2RhdGE6IFVpbnQ4QXJyYXl9fSByZWZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbYWRkaXRpb25hbElkPTBdIGlkIHdoaWNoIGRhdGEgc2hvdWxkIGJlIGxvYWRlZChuZWVkZWQgZm9yIGxvYWRpbmcgZHluYW1pY2FsbHkgbWV0YURhdGEpXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBsb2FkRGF0YShjb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCByZWY6IHtkYXRhOiBVaW50OEFycmF5fSwgYWRkaXRpb25hbElkOiBudW1iZXIgPSAwKXtcclxuICAgICAgICBsZXQgc3RhcnRPZmZzZXQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG1heEJ5dGVzOiBudW1iZXIgPSAzMjc2ODtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIFN0YXJ0IHdpdGggUHJvZ3Jlc3MgMCUgKGxvYWQgZnJvbSB0YXJnZXQpID0+IGN1cnJlbnRseSBvbmx5IGZvciBud2N0IEJpbiBEYXRhXHJcbiAgICAgICAgaWYoY29tcG9uZW50TWV0aG9kID09IHRoaXMuX2dldERyaXZlTG9nU25hcHNob3Qpe1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQucmFpc2UodGhpcywgbmV3IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmxvYWRGcm9tVGFyZ2V0VHlwZSwwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW5wdXRDb3VudGVyID0gMDtcclxuICAgICAgICBpZihhZGRpdGlvbmFsSWQgIT0gMCl7XHJcbiAgICAgICAgICAgICBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzW2lucHV0Q291bnRlcl0udmFsdWUgPSBhZGRpdGlvbmFsSWQ7XHJcbiAgICAgICAgICAgICBpbnB1dENvdW50ZXIrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0YXJ0T2Zmc2V0SW5wdXRJbmRleCA9IGlucHV0Q291bnRlcjtcclxuICAgICAgICBsZXQgbWF4Qnl0ZXNJbnB1dEluZGV4ID0gaW5wdXRDb3VudGVyKzE7XHJcbiAgICAgICAgY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVyc1tzdGFydE9mZnNldElucHV0SW5kZXhdLnZhbHVlID0gc3RhcnRPZmZzZXQ7XHJcbiAgICAgICAgY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVyc1ttYXhCeXRlc0lucHV0SW5kZXhdLnZhbHVlID0gbWF4Qnl0ZXM7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUoY29tcG9uZW50TWV0aG9kKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGFMZW5ndGggPSByZXN1bHQuYXJncy5EYXRhTGVmdCArIHJlc3VsdC5hcmdzLkRhdGFSZWFkO1xyXG4gICAgICAgIGxldCBkYXRhOiBVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YUxlbmd0aCk7XHJcbiAgICAgICAgbGV0IGVuY0RhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChyZXN1bHQuYXJncy5EYXRhKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGVuY0RhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBkYXRhW3N0YXJ0T2Zmc2V0K2ldID0gZW5jRGF0YVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0T2Zmc2V0ICs9IHJlc3VsdC5hcmdzLkRhdGFSZWFkO1xyXG4gICAgICAgIGlmKHJlc3VsdC5hcmdzLkRhdGFMZWZ0ID09IDApe1xyXG4gICAgICAgICAgICAvLyBEYXRhIGxvYWRlZCBjb21wbGV0bHlcclxuICAgICAgICAgICAgaWYoY29tcG9uZW50TWV0aG9kID09IHRoaXMuX2dldERyaXZlTG9nU25hcHNob3Qpe1xyXG4gICAgICAgICAgICAgICAgLy8gcmFpc2UgZXZlbnQgLT4gMTAwJSBwcm9ncmVzc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbVRhcmdldFR5cGUsIDEwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIExvYWQgdGhlIHJlc3Qgb2YgdGhlIGRhdGFcclxuICAgICAgICAgICAgd2hpbGUocmVzdWx0LmFyZ3MuRGF0YUxlZnQgPiAwKXtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbc3RhcnRPZmZzZXRJbnB1dEluZGV4XS52YWx1ZSA9IHN0YXJ0T2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZShjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuY0RhdGEgPSB0aGlzLmVuY29kZUJhc2U2NChyZXN1bHQuYXJncy5EYXRhKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZW5jRGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtzdGFydE9mZnNldCtpXSA9IGVuY0RhdGFbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGFydE9mZnNldCArPSByZXN1bHQuYXJncy5EYXRhUmVhZDtcclxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwcm9ncmVzcyBhZnRlciBldmVyeSBsb2FkZWQgZGF0YXBhcnQgKGxvYWQgZnJvbSB0YXJnZXQpID0+IGN1cnJlbnRseSBvbmx5IGZvciBud2N0IEJpbiBEYXRhXHJcbiAgICAgICAgICAgICAgICBpZihjb21wb25lbnRNZXRob2QgPT0gdGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gMTAwIC0gKHJlc3VsdC5hcmdzLkRhdGFMZWZ0KjEwMCkgLyBkYXRhTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZC5yYWlzZSh0aGlzLCBuZXcgRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MoRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MubG9hZEZyb21UYXJnZXRUeXBlLCBNYXRoLnJvdW5kKHByb2dyZXNzKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlZi5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgZnJvbSBiYXNlNjQgc3RyaW5nIHRvIFVpbnQ4QXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHthbnl9IGJhc2U2NFxyXG4gICAgICogQHJldHVybnMge1VpbnQ4QXJyYXl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbmNvZGVCYXNlNjQoYmFzZTY0OiBhbnkpOiBVaW50OEFycmF5IHtcclxuICAgICAgICB2YXIgYmluYXJ5X3N0cmluZyA9IHdpbmRvdy5hdG9iKGJhc2U2NCk7XHJcbiAgICAgICAgdmFyIGxlbiA9IGJpbmFyeV9zdHJpbmcubGVuZ3RoO1xyXG4gICAgICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGxlbik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBieXRlc1tpXSA9IGJpbmFyeV9zdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgYSBjb21tYW5kIG9uIHRoZSB0YXJnZXQgdG8gbG9vayBpZiB0aGVyZSBpcyBzb21lIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZGF0YUF2YWlsYWJsZSgpe1xyXG4gICAgICAgIHRoaXMuX2dldERyaXZlTG9nU25hcHNob3QuaW5wdXRQYXJhbWV0ZXJzWzBdLnZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90LmlucHV0UGFyYW1ldGVyc1sxXS52YWx1ZSA9IDEwO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgMjA7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2dldERyaXZlTG9nU25hcHNob3QpO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQuYXJncyAhPSB1bmRlZmluZWQgJiYgcmVzdWx0LmFyZ3MuRGF0YVJlYWQgPT0gMTApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zbGVlcCgyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXYWl0IHNvbWUgdGltZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbXMgdGltZSB0byB3YWl0IGluIG1pbGxpc2Vjb25kc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNsZWVwKG1zOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxuICAgIH1cclxufSJdfQ==
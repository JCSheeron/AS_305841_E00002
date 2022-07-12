var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../common/widgetBase", "../common/domHelper", "../common/themeProvider", "../../common/fileProvider", "../../models/diagnostics/trace/traceConfig/traceConfigDefines", "./componentDefaultDefinition"], function (require, exports, widgetBase_1, domHelper_1, themeProvider_1, fileProvider_1, traceConfigDefines_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Layout styles for dynamic layout
     *
     * @enum {number}
     */
    var LayoutStyle;
    (function (LayoutStyle) {
        LayoutStyle[LayoutStyle["Default"] = 0] = "Default";
        LayoutStyle[LayoutStyle["MinimizeStep1"] = 1] = "MinimizeStep1";
        LayoutStyle[LayoutStyle["MinimizeStep2"] = 2] = "MinimizeStep2";
        LayoutStyle[LayoutStyle["MinimizeStep3"] = 3] = "MinimizeStep3";
    })(LayoutStyle || (LayoutStyle = {}));
    /**
     * The texts for the buttons
     *
     * @class ButtonTexts
     */
    var ButtonTexts = /** @class */ (function () {
        function ButtonTexts() {
        }
        // Default button texts
        ButtonTexts.Activate = "Activate";
        ButtonTexts.ForceStart = "Force start";
        ButtonTexts.ForceStop = "Force stop";
        ButtonTexts.SaveTraceConfiguration = "Save trace configuration";
        ButtonTexts.ImportTraceConfiguration = "Import trace configuration";
        ButtonTexts.ExportTraceConfiguration = "Export trace configuration";
        // Minimized button texts
        ButtonTexts.SaveTraceConfigurationMinimized = "Save";
        ButtonTexts.ImportTraceConfigurationMinimized = "Import";
        ButtonTexts.ExportTraceConfigurationMinimized = "Export";
        return ButtonTexts;
    }());
    /**
     * implements the TraceControlWidget
     *
     * @class TraceControlWidget
     * @extends {WidgetBase}
     */
    var TraceControlWidget = /** @class */ (function (_super) {
        __extends(TraceControlWidget, _super);
        function TraceControlWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._actualTraceState = traceConfigDefines_1.TraceStateIds.Disabled;
            _this._saveConfigIsActive = false;
            _this._activateIsActive = false;
            _this._fileProvider = new fileProvider_1.FileProvider();
            _this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(sender, args); };
            /**
             * Default button width for active button
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth1 = "85px";
            /**
             * Default button width for force start/stop button
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth2 = "100px";
            /**
             * Default button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3 = "195px";
            /**
             * Minimized Step 1 button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3MinimizedStep1 = "60px";
            /**
             * Minimized Step 2 button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3MinimizedStep2 = "16px";
            /**
             * Default left position of the save/import/export buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._leftPositionStart = 730;
            /**
             * Default space between the  save/import/export buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonSpace = 35;
            return _this;
        }
        TraceControlWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Dispose some objects from this widget
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.dispose = function () {
            // Dispose static button and fields
            this.destroyButton(this._activateButtonId);
            this.destroyField(this._stateFieldId);
            this.destroyButton(this._forceStartButtonId);
            this.destroyButton(this._forceStopButtonId);
            // Dispose dynamic buttons if available
            this.destroyButton(this._saveTraceConfigurationButtonId);
            this.destroyButton(this._importTraceConfigurationButtonId);
            this.destroyButton(this._exportTraceConfigurationButtonId);
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createLayout = function () {
            this.initButtonAndFieldIds();
            this.createDivButtonsAndFieldsLayout();
            this.addStaticButtons();
        };
        /**
         * Initializes the ids for the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.initButtonAndFieldIds = function () {
            var layoutContainerId = this.mainDivId;
            this._activateButtonId = layoutContainerId + "_activateButton";
            this._forceStartButtonId = layoutContainerId + "_forceStartButton";
            this._forceStopButtonId = layoutContainerId + "_forceStopButton";
            this._saveTraceConfigurationButtonId = layoutContainerId + "_saveTraceConfigurationButton";
            this._importTraceConfigurationButtonId = layoutContainerId + "_importTraceConfigurationButton";
            this._exportTraceConfigurationButtonId = layoutContainerId + "_exportTraceConfigurationButton";
            this._stateFieldId = layoutContainerId + "tracecontrol_state";
            this._stateImage = layoutContainerId + "tracecontrol_state_image";
        };
        /**
         * Creates the layout for the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createDivButtonsAndFieldsLayout = function () {
            this.mainDiv.style.paddingTop = "4px";
            this.mainDiv.style.background = "var(--main-grey-dark2)";
            this.mainDiv.style.overflow = "hidden";
            var element = $(this.mainDiv);
            element.append("<div style='left: 25px; position: absolute;' id='" + this._activateButtonId + "'></div>");
            element.append("<div style='top: 10px; left: 150px; position: absolute;' class='traceControlStateImage' id='" + this._stateImage + "'></div>");
            element.append("<div style='top: 10px; left: 180px; position: absolute;' id='" + this._stateFieldId + "'></div>");
            element.append("<div style='left: 340px; position: absolute;' id='" + this._forceStartButtonId + "'></div>");
            element.append("<div style='left: 475px; position: absolute;' id='" + this._forceStopButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(0) + "px; position: absolute;' id='" + this._saveTraceConfigurationButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(1) + "px; position: absolute;' id='" + this._importTraceConfigurationButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(2) + "px; position: absolute;' id='" + this._exportTraceConfigurationButtonId + "'></div>");
        };
        /**
         * Returns the left position of a button for the given LayoutStyle
         *
         * @private
         * @param {number} index
         * @param {LayoutStyle} [layoutStyle=LayoutStyle.Default]
         * @returns {number}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getLeftPosition = function (index, layoutStyle) {
            if (layoutStyle === void 0) { layoutStyle = LayoutStyle.Default; }
            if (index == 0) {
                return this._leftPositionStart;
            }
            else {
                var defaultButtonWidth = this._defaultButtonWidth3;
                if (layoutStyle == LayoutStyle.MinimizeStep1) {
                    defaultButtonWidth = this._defaultButtonWidth3MinimizedStep1;
                }
                else if (layoutStyle == LayoutStyle.MinimizeStep2) {
                    defaultButtonWidth = this._defaultButtonWidth3MinimizedStep2;
                }
                var buttonWidth = parseInt(defaultButtonWidth, 10);
                return this._leftPositionStart + (index * (buttonWidth + this._defaultButtonSpace));
            }
        };
        /**
         * Creates the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addStaticButtons = function () {
            this.createButton(this._activateButtonId, ButtonTexts.Activate, this.getImagePath("play.svg"), this._defaultButtonWidth1);
            this.createField(this._stateFieldId);
            this.createButton(this._forceStartButtonId, ButtonTexts.ForceStart, this.getImagePath("record.svg"), this._defaultButtonWidth2);
            this.createButton(this._forceStopButtonId, ButtonTexts.ForceStop, this.getImagePath("stop.svg"), this._defaultButtonWidth2);
        };
        /**
         * Loads the styles for the trace control widget
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/traceControlWidget/style/css/traceControlStyle.css");
            _super.prototype.addStyle.call(this, "widgets/traceControlWidget/style/css/traceControlButtonStyle.css");
        };
        /**
         * Activates/Deactivates a button
         *
         * @private
         * @param {string} id
         * @param {boolean} deactivate
         * @returns
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.deactivateButton = function (id, deactivate) {
            var ejButton = $("#" + id).data("ejButton");
            if (ejButton == undefined) {
                return;
            }
            this.setButtonCssClass(ejButton, deactivate);
            var buttonElement = $("#" + id)[0];
            var imagePath = this.getImagePathForId(id, deactivate);
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            domHelper_1.DomHelper.disableElement(buttonElement, deactivate);
        };
        /**
         * Sets the layout of the button(e.g. text, size, left postion)
         *
         * @private
         * @param {string} id
         * @param {string} buttonText
         * @param {string} newSize
         * @param {string} newLeftPosition
         * @returns
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonLayout = function (id, buttonText, newSize, newLeftPosition) {
            var ejButton = $("#" + id).data("ejButton");
            if (ejButton == undefined) {
                return;
            }
            ejButton.option("text", buttonText, true);
            if (buttonText == "") {
                ejButton.option("contentType", ej.ContentType.ImageOnly, true);
            }
            else {
                ejButton.option("contentType", ej.ContentType.TextAndImage, true);
            }
            ejButton.option("width", newSize, true);
            var buttonElement = $("#" + id)[0];
            if (buttonElement != undefined) {
                buttonElement.style.left = newLeftPosition;
            }
        };
        /**
         * Returns the imagepath for the button ids
         *
         * @private
         * @param {string} buttonId
         * @param {boolean} deactivate
         * @returns {string}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getImagePathForId = function (buttonId, deactivate) {
            var imagePath;
            if (buttonId == this._forceStartButtonId) {
                imagePath = this.getImagePath("record.svg", deactivate);
            }
            else if (buttonId == this._forceStopButtonId) {
                imagePath = this.getImagePath("stop.svg", deactivate);
            }
            else if (buttonId == this._saveTraceConfigurationButtonId) {
                imagePath = this.getImagePath("save.svg", deactivate);
            }
            else if (buttonId == this._activateButtonId) {
                imagePath = this.getImagePath("play.svg", deactivate);
            }
            else if (buttonId == this._importTraceConfigurationButtonId) {
                imagePath = this.getImagePath("import.svg", deactivate);
            }
            else if (buttonId == this._exportTraceConfigurationButtonId) {
                imagePath = this.getImagePath("export.svg", deactivate);
            }
            return imagePath;
        };
        /**
         * Sets the Button css styles for activated or deactivated state
         *
         * @private
         * @param {*} ejButton
         * @param {boolean} deactivate
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonCssClass = function (ejButton, deactivate) {
            if (deactivate == true) {
                ejButton.option("cssClass", "traceControlButtonDeactivated", true);
            }
            else {
                ejButton.option("cssClass", "traceControlButton", true);
            }
        };
        /**
         * Creates a button with the given text and image
         *
         * @param {string} id
         * @param {string} text
         * @param {string} imagePath
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createButton = function (id, text, imagePath, width) {
            var _this = this;
            $("#" + id).ejButton({
                text: text,
                contentType: ej.ContentType.TextAndImage,
                cssClass: "traceControlButton",
                prefixIcon: "e-icon",
                click: function (clickArgs) { return _this.click(id); },
                width: width,
            });
            var buttonElement = $("#" + id)[0];
            buttonElement.style.backgroundPositionX = "4px";
            buttonElement.style.backgroundPositionY = "4px";
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            buttonElement.style.backgroundRepeat = "no-repeat";
            buttonElement.style.backgroundSize = "16px 16px";
        };
        /**
         * Destroys the button object
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.destroyButton = function (id) {
            var button = $("#" + id).data("ejButton");
            if (button != undefined) {
                button.destroy();
            }
        };
        /**
         * Creates the trace state field (currently a special button is used)
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createField = function (id) {
            $("#" + id).ejButton({
                text: "0",
                contentType: ej.ContentType.TextOnly,
                cssClass: "traceStateButton",
            });
            var fieldElement = $("#" + id)[0];
            if (fieldElement != undefined) {
                fieldElement.style.color = "#FFFFFF";
            }
        };
        /**
         * Destroys the field object
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.destroyField = function (id) {
            var field = $("#" + id).data("ejButton");
            if (field != undefined) {
                field.destroy();
            }
        };
        /**
         * Resizes the trace control widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.resize = function (width, height) {
            this._actualHeight = height;
            this._actualWidth = width;
            this.mainDiv.style.width = width.toString() + "px";
            this.mainDiv.style.height = height.toString() + "px";
            this.updateDynamicLayout();
        };
        /**
         * Updates the dynamic layout (e.g. smaller buttons if small widget size)
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.updateDynamicLayout = function () {
            var neededSizeForDefaultLayout = 1400;
            var neededSizeForMinimzedLayoutStep1 = 1000;
            if (this._actualWidth > neededSizeForDefaultLayout) {
                this.setLayout(LayoutStyle.Default);
            }
            else if (this._actualWidth > neededSizeForMinimzedLayoutStep1) {
                this.setLayout(LayoutStyle.MinimizeStep1);
            }
            else {
                this.setLayout(LayoutStyle.MinimizeStep2);
            }
        };
        /**
         * Sets the dynamic layout to a defined layout style (e.g. default or minimized)
         *
         * @private
         * @param {LayoutStyle} layoutStyle
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setLayout = function (layoutStyle) {
            switch (layoutStyle) {
                case LayoutStyle.MinimizeStep2: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(0, LayoutStyle.MinimizeStep2) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(1, LayoutStyle.MinimizeStep2) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(2, LayoutStyle.MinimizeStep2) + "px");
                    break;
                }
                case LayoutStyle.MinimizeStep1: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(0, LayoutStyle.MinimizeStep1) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(1, LayoutStyle.MinimizeStep1) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(2, LayoutStyle.MinimizeStep1) + "px");
                    break;
                }
                case LayoutStyle.Default: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(0) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(1) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(2) + "px");
                    break;
                }
            }
        };
        Object.defineProperty(TraceControlWidget.prototype, "traceControlInterface", {
            /**
             * Sets and defines the interface to the trace control
             *
             * @memberof TraceControlWidget
             */
            set: function (traceComponentControl) {
                this._traceControlInterface = traceComponentControl;
                if (this._traceControlInterface) {
                    this.addDynamicButtonsForAvailableCommands(this._traceControlInterface);
                    this.addTraceState(this._traceControlInterface);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Add trace state info to layout
         *
         * @private
         * @param {*} traceControlInterface
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addTraceState = function (traceControlInterface) {
            this.createField(this._stateFieldId);
            this.refreshTraceControlParameterValue(this._actualTraceState);
        };
        /**
         * Adds the dynamic buttons (save/import/export trace configuation) if command is available in command interface
         *
         * @private
         * @param {*} commands
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addDynamicButtonsForAvailableCommands = function (commands) {
            if (commands.commandSaveConfiguration) {
                this.createButton(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfiguration, this.getImagePath("save.svg"), this._defaultButtonWidth3);
            }
            if (commands.commandImportTraceConfiguration) {
                this.createButton(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfiguration, this.getImagePath("import.svg"), this._defaultButtonWidth3);
            }
            if (commands.commandExportTraceConfiguration) {
                this.createButton(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfiguration, this.getImagePath("export.svg"), this._defaultButtonWidth3);
            }
            // Update layout after adding new buttons
            this.updateDynamicLayout();
        };
        /**
         * Will be called when a button was clicked
         *
         * @private
         * @param {*} buttonId
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.click = function (buttonId) {
            switch (buttonId) {
                case this._activateButtonId:
                    this.executeActivate();
                    break;
                case this._forceStartButtonId:
                    this.executeForceStart();
                    break;
                case this._forceStopButtonId:
                    this.executeForceStop();
                    break;
                case this._saveTraceConfigurationButtonId:
                    this.executeSaveConfiguration();
                    break;
                case this._importTraceConfigurationButtonId:
                    this.importTraceConfiguration();
                    break;
                case this._exportTraceConfigurationButtonId:
                    this.exportTraceConfiguration();
                    break;
            }
        };
        /**
         * Activates the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeActivate = function () {
            // invoke activate trace by using a component command
            if (this._saveConfigIsActive == false) {
                this._activateIsActive = true;
                this.setButtonStates(this._traceControlInterface.traceState.value);
                this.activateTrace();
            }
        };
        TraceControlWidget.prototype.activateTrace = function () {
            // BINDINGSOURCE: dispatches the mthod to bound targets
        };
        /**
         * Processes trace activation response
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onTraceActivated = function () {
            this._activateIsActive = false;
            this.setButtonStates(this._actualTraceState);
        };
        /**
         * handles trace state changes
         *
         * @param {*} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onTraceStateChanged = function (traceState) {
            this._actualTraceState = traceState;
            this.refreshTraceControlParameterValue(traceState);
        };
        /**
         * Forces starting the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeForceStart = function () {
            if (this._traceControlInterface) {
                if (this._actualTraceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                    this._traceControlInterface.commandForceStart.execute();
                }
            }
        };
        /**
         * Forces stopping the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeForceStop = function () {
            if (this._traceControlInterface) {
                if (this._actualTraceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) { // Only while running
                    this._traceControlInterface.commandForceStop.execute();
                }
            }
        };
        /**
         * Saves the trace configuration on target
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeSaveConfiguration = function () {
            var _this = this;
            if (this._traceControlInterface) {
                if (this.saveTraceConfigPossibleInThisState(this._actualTraceState)) {
                    this._saveConfigIsActive = true;
                    this.setButtonStates(this._traceControlInterface.traceState.value);
                    this._traceControlInterface.commandSaveConfiguration.execute(null, function (result) {
                        _this._saveConfigIsActive = false;
                        _this.setButtonStates(_this._traceControlInterface.traceState.value);
                    });
                }
            }
        };
        /**
         * Opens a file select dialog and imports a trace configuration from the file
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.importTraceConfiguration = function () {
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(".tracecfg"); // Only show/accept *.tracecfg files
        };
        /**
         * Export a trace configuration to a file
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.exportTraceConfiguration = function () {
            this._traceControlInterface.commandExportTraceConfiguration.execute(null, function (result) {
                var blob = new Blob([result], { type: "text/xml" });
                fileProvider_1.FileProvider.downloadData("TraceConfi.tracecfg", blob);
            });
        };
        /**
         * Occurs after reading data from file(trace configuration import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onUploadDataFinished = function (sender, args) {
            /*this.setBusyInformation(new BusyInformation("Importing data...", ImageId.defaultImage, 48, true));
            this.setBusy(true);*/
            var _this = this;
            // Timeout needed to show the busyscreen before importing data 
            setTimeout(function () { return _this.importData(sender, args); }, 200);
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * imports the given filedata with the given filename
         *
         * @private
         * @param {HTMLInputElement} fileInputElement
         * @param {Map<string, string>} fileContents
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.importData = function (fileInputElement, fileContents) {
            if (fileContents.size === 1) {
                var filedata = fileContents.values().next().value;
                this._traceControlInterface.commandImportTraceConfiguration.execute(filedata, function (result) {
                });
            }
        };
        /**
         * refreshes the trace state (displayname of value and the state icon)
         *
         * @private
         * @param {MappCockpitComponentParameter} traceControlParameter
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.refreshTraceControlParameterValue = function (traceState) {
            this.setTraceStateText(traceState);
            this.setTraceStateImage(traceState);
            this.setButtonStates(traceState);
        };
        /**
         * Set the display name for the trace state in the visualization
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setTraceStateText = function (traceState) {
            // Get display name for the trace state
            var traceStateDisplayText = "Inactive";
            if (traceState == traceConfigDefines_1.TraceStateIds.Config_processing || traceState == traceConfigDefines_1.TraceStateIds.Config_applied) {
                traceStateDisplayText = "Applying configuration";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                traceStateDisplayText = "Wait for start trigger";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                traceStateDisplayText = "Running";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Data_available) {
                traceStateDisplayText = "Data available";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Record_failure) {
                traceStateDisplayText = "Record failed";
            }
            // Set display name for the trace state
            $("#" + this._stateFieldId).ejButton({
                text: traceStateDisplayText,
            });
        };
        /**
         * Sets an image for the trace state in the visualization
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setTraceStateImage = function (traceState) {
            // Get image for the trace state
            var imagepath = this.getImagePath("inactive.svg");
            if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                imagepath = this.getImagePath("wait_start_trigger.svg");
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                imagepath = this.getImagePath("wait_stop_event.svg");
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Data_available) {
                imagepath = this.getImagePath("data_available.svg");
            }
            // Set image for the trace state
            var imageElement = $("#" + this._stateImage)[0];
            if (imageElement != undefined) {
                imageElement.style.backgroundImage = "url('" + imagepath + "')";
            }
        };
        /**
         * Sets the states(enabled/disabled) of the buttons for the given trace state
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStates = function (traceState) {
            if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                this.setButtonStateInWaitStartTriggerState();
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                this.setButtonStateInWaitStopEventState();
            }
            else {
                if (this.saveTraceConfigPossibleInThisState(traceState)) {
                    this.deactivateButton(this._saveTraceConfigurationButtonId, false);
                }
                // other state => deactivate force start trigger and force stop event
                this.deactivateButton(this._forceStartButtonId, true);
                this.deactivateButton(this._forceStopButtonId, true);
                // set activate button state
                if (this._activateIsActive == false && this._saveConfigIsActive == false) {
                    this.deactivateButton(this._activateButtonId, false);
                }
                else {
                    this.deactivateButton(this._activateButtonId, true);
                }
            }
        };
        /**
         * Sets the button states if the trace state is waiting for start trigger
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStateInWaitStartTriggerState = function () {
            // Wait for start trigger => activate force start; deactivate force stop event
            this.deactivateButton(this._forceStartButtonId, false);
            this.deactivateButton(this._forceStopButtonId, true);
            this.deactivateButton(this._saveTraceConfigurationButtonId, true);
        };
        /**
         * Sets the button states if the trace state is waiting for the stop event
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStateInWaitStopEventState = function () {
            // Running => deactivate force start trigger; activate force stop event
            this.deactivateButton(this._forceStartButtonId, true);
            this.deactivateButton(this._forceStopButtonId, false);
            this.deactivateButton(this._saveTraceConfigurationButtonId, true);
        };
        /**
         * Returns the imagePath for the given imageName and state(activated/deactivated)
         *
         * @private
         * @param {string} imageName
         * @param {boolean} [deactivated=false]
         * @returns {string}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getImagePath = function (imageName, deactivated) {
            if (deactivated === void 0) { deactivated = false; }
            if (deactivated == true) {
                imageName = imageName.replace(".svg", "_deactivated.svg");
            }
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/traceControlWidget/style/images/" + imageName);
        };
        /**
         * Return true if saveing of trace configuration is possible in the current trace state
         *
         * @private
         * @param {*} state
         * @returns {boolean}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.saveTraceConfigPossibleInThisState = function (state) {
            if (state == traceConfigDefines_1.TraceStateIds.Disabled || state == traceConfigDefines_1.TraceStateIds.Data_available || state == traceConfigDefines_1.TraceStateIds.Record_failure) {
                return true;
            }
            return false;
        };
        return TraceControlWidget;
    }(widgetBase_1.WidgetBase));
    exports.TraceControlWidget = TraceControlWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb250cm9sV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC90cmFjZUNvbnRyb2xXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBOzs7O09BSUc7SUFDSCxJQUFLLFdBS0o7SUFMRCxXQUFLLFdBQVc7UUFDWixtREFBTyxDQUFBO1FBQ1AsK0RBQWEsQ0FBQTtRQUNiLCtEQUFhLENBQUE7UUFDYiwrREFBYSxDQUFBO0lBQ2pCLENBQUMsRUFMSSxXQUFXLEtBQVgsV0FBVyxRQUtmO0lBRUQ7Ozs7T0FJRztJQUNIO1FBQUE7UUFhQSxDQUFDO1FBWkcsdUJBQXVCO1FBQ1Asb0JBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsc0JBQVUsR0FBRyxhQUFhLENBQUM7UUFDM0IscUJBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsa0NBQXNCLEdBQUcsMEJBQTBCLENBQUM7UUFDcEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFDeEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFFeEUseUJBQXlCO1FBQ1QsMkNBQStCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLDZDQUFpQyxHQUFHLFFBQVEsQ0FBQztRQUM3Qyw2Q0FBaUMsR0FBRyxRQUFRLENBQUM7UUFDakUsa0JBQUM7S0FBQSxBQWJELElBYUM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQWlDLHNDQUFVO1FBQTNDO1lBQUEscUVBdzBCQztZQTl6QlcsdUJBQWlCLEdBQUcsa0NBQWEsQ0FBQyxRQUFRLENBQUM7WUFFM0MseUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQzVCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztZQUkxQixtQkFBYSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1lBRW5DLGdDQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXRDLENBQXNDLENBQUM7WUFFM0Y7Ozs7O2VBS0c7WUFDYywwQkFBb0IsR0FBRyxNQUFNLENBQUM7WUFFL0M7Ozs7O2VBS0c7WUFDYywwQkFBb0IsR0FBRyxPQUFPLENBQUM7WUFFaEQ7Ozs7O2VBS0c7WUFDYywwQkFBb0IsR0FBRyxPQUFPLENBQUM7WUFHaEQ7Ozs7O2VBS0c7WUFDYyx3Q0FBa0MsR0FBRyxNQUFNLENBQUM7WUFFN0Q7Ozs7O2VBS0c7WUFDYyx3Q0FBa0MsR0FBRyxNQUFNLENBQUM7WUFFN0Q7Ozs7O2VBS0c7WUFDYyx3QkFBa0IsR0FBRyxHQUFHLENBQUM7WUFFMUM7Ozs7O2VBS0c7WUFDYyx5QkFBbUIsR0FBRyxFQUFFLENBQUM7O1FBNHZCOUMsQ0FBQztRQTF2QkcsZ0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxvQ0FBTyxHQUFQO1lBQ0ksbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRTVDLHVDQUF1QztZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtZQUUxRCxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHlDQUFZLEdBQVo7WUFDSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUU3QixJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxrREFBcUIsR0FBN0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1lBQy9ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztZQUNuRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLEdBQUcsa0JBQWtCLENBQUM7WUFDakUsSUFBSSxDQUFDLCtCQUErQixHQUFHLGlCQUFpQixHQUFHLCtCQUErQixDQUFDO1lBQzNGLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxpQkFBaUIsR0FBRyxpQ0FBaUMsQ0FBQztZQUMvRixJQUFJLENBQUMsaUNBQWlDLEdBQUcsaUJBQWlCLEdBQUcsaUNBQWlDLENBQUM7WUFDL0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztZQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFpQixHQUFHLDBCQUEwQixDQUFDO1FBQ3RFLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDREQUErQixHQUF2QztZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO1lBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFFdkMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLG1EQUFtRCxHQUFFLElBQUksQ0FBQyxpQkFBaUIsR0FBRSxVQUFVLENBQUMsQ0FBQztZQUN4RyxPQUFPLENBQUMsTUFBTSxDQUFDLDhGQUE4RixHQUFFLElBQUksQ0FBQyxXQUFXLEdBQUUsVUFBVSxDQUFDLENBQUM7WUFDN0ksT0FBTyxDQUFDLE1BQU0sQ0FBQywrREFBK0QsR0FBRSxJQUFJLENBQUMsYUFBYSxHQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2hILE9BQU8sQ0FBQyxNQUFNLENBQUMsb0RBQW9ELEdBQUUsSUFBSSxDQUFDLG1CQUFtQixHQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzNHLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0RBQW9ELEdBQUUsSUFBSSxDQUFDLGtCQUFrQixHQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsR0FBRSxJQUFJLENBQUMsK0JBQStCLEdBQUUsVUFBVSxDQUFDLENBQUM7WUFDbkosT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixHQUFFLElBQUksQ0FBQyxpQ0FBaUMsR0FBRSxVQUFVLENBQUMsQ0FBQztZQUNySixPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLEdBQUUsSUFBSSxDQUFDLGlDQUFpQyxHQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3pKLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLDRDQUFlLEdBQXZCLFVBQXdCLEtBQWEsRUFBRSxXQUE4QztZQUE5Qyw0QkFBQSxFQUFBLGNBQTJCLFdBQVcsQ0FBQyxPQUFPO1lBQ2pGLElBQUcsS0FBSyxJQUFJLENBQUMsRUFBQztnQkFDVixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUNsQztpQkFDRztnQkFDQSxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztnQkFDbkQsSUFBRyxXQUFXLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBQztvQkFDeEMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtDQUFrQyxDQUFDO2lCQUNoRTtxQkFBSyxJQUFHLFdBQVcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFDO29CQUM5QyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0NBQWtDLENBQUM7aUJBQ2hFO2dCQUNELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQzthQUN2RjtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDZDQUFnQixHQUF4QjtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUMzSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsVUFBVSxFQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDakksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2pJLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsdUNBQVUsR0FBVjtZQUNJLGlCQUFNLFFBQVEsWUFBQyw0REFBNEQsQ0FBQyxDQUFDO1lBQzdFLGlCQUFNLFFBQVEsWUFBQyxrRUFBa0UsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLDZDQUFnQixHQUF4QixVQUF5QixFQUFVLEVBQUUsVUFBbUI7WUFDcEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRTdDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2RCxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLEdBQUcsU0FBUyxHQUFFLElBQUksQ0FBQztZQUVoRSxxQkFBUyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSyw0Q0FBZSxHQUF2QixVQUF3QixFQUFVLEVBQUUsVUFBa0IsRUFBRSxPQUFlLEVBQUUsZUFBdUI7WUFDNUYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixPQUFPO2FBQ1Y7WUFDRCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUMsSUFBRyxVQUFVLElBQUksRUFBRSxFQUFDO2dCQUNoQixRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNsRTtpQkFDRztnQkFDQSxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyRTtZQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV4QyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUcsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDMUIsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFBO2FBQzdDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssOENBQWlCLEdBQXpCLFVBQTBCLFFBQWdCLEVBQUUsVUFBbUI7WUFDM0QsSUFBSSxTQUFTLENBQUM7WUFDZCxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUM7Z0JBQ3BDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzRDtpQkFDSSxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUM7Z0JBQ3hDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN6RDtpQkFDSSxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsK0JBQStCLEVBQUM7Z0JBQ3JELFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN6RDtpQkFDSSxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUM7Z0JBQ3ZDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN6RDtpQkFDSSxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsaUNBQWlDLEVBQUM7Z0JBQ3ZELFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzRDtpQkFDSSxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsaUNBQWlDLEVBQUM7Z0JBQ3ZELFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzRDtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssOENBQWlCLEdBQXpCLFVBQTBCLFFBQVEsRUFBRSxVQUFtQjtZQUNuRCxJQUFHLFVBQVUsSUFBSSxJQUFJLEVBQUM7Z0JBQ2xCLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RFO2lCQUNHO2dCQUNBLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNEO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyx5Q0FBWSxHQUFwQixVQUFxQixFQUFVLEVBQUUsSUFBWSxFQUFFLFNBQWlCLEVBQUUsS0FBSztZQUF2RSxpQkFnQkM7WUFmUyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBRSxDQUFDLFFBQVEsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWTtnQkFDeEMsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLEtBQUssRUFBRSxVQUFDLFNBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQWQsQ0FBYztnQkFDcEMsS0FBSyxFQUFFLEtBQUs7YUFDZixDQUFDLENBQUM7WUFFSCxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQ2hELGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQ2hELGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE9BQU8sR0FBRyxTQUFTLEdBQUUsSUFBSSxDQUFDO1lBQ2hFLGFBQWEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1lBQ25ELGFBQWEsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztRQUNyRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSywwQ0FBYSxHQUFyQixVQUFzQixFQUFVO1lBQzVCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLElBQUcsTUFBTSxJQUFJLFNBQVMsRUFBQztnQkFDbkIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssd0NBQVcsR0FBbkIsVUFBb0IsRUFBVTtZQUNwQixDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBRSxDQUFDLFFBQVEsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUTtnQkFDcEMsUUFBUSxFQUFFLGtCQUFrQjthQUMvQixDQUFDLENBQUM7WUFFSCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUcsWUFBWSxJQUFJLFNBQVMsRUFBQztnQkFDekIsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2FBQ3hDO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0sseUNBQVksR0FBcEIsVUFBcUIsRUFBVTtZQUMzQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ2xCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNuQjtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxtQ0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQWM7WUFFaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFFckQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssZ0RBQW1CLEdBQTNCO1lBQ0ksSUFBSSwwQkFBMEIsR0FBRyxJQUFJLENBQUM7WUFDdEMsSUFBSSxnQ0FBZ0MsR0FBRyxJQUFJLENBQUM7WUFDNUMsSUFBRyxJQUFJLENBQUMsWUFBWSxHQUFHLDBCQUEwQixFQUFDO2dCQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN2QztpQkFDSSxJQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsZ0NBQWdDLEVBQUM7Z0JBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdDO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHNDQUFTLEdBQWpCLFVBQWtCLFdBQXdCO1lBQ3RDLFFBQU8sV0FBVyxFQUFDO2dCQUNmLEtBQUssV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDbkssSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ3JLLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUNySyxNQUFNO2lCQUNUO2dCQUNELEtBQUssV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxXQUFXLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDNU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsV0FBVyxDQUFDLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ2hOLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLFdBQVcsQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUNoTixNQUFNO2lCQUNUO2dCQUNELEtBQUssV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxXQUFXLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQzFKLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztvQkFDN0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsV0FBVyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUM5SixNQUFNO2lCQUNUO2FBQ0o7UUFDTCxDQUFDO1FBT0Qsc0JBQVcscURBQXFCO1lBTGhDOzs7O2VBSUc7aUJBQ0gsVUFBaUMscUJBQTZDO2dCQUMxRSxJQUFJLENBQUMsc0JBQXNCLEdBQUcscUJBQXFCLENBQUM7Z0JBQ3BELElBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFDO29CQUMzQixJQUFJLENBQUMscUNBQXFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQ3hFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7aUJBQ25EO1lBQ0wsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSywwQ0FBYSxHQUFyQixVQUFzQixxQkFBcUI7WUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxrRUFBcUMsR0FBN0MsVUFBOEMsUUFBUTtZQUNsRCxJQUFHLFFBQVEsQ0FBQyx3QkFBd0IsRUFBQztnQkFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsV0FBVyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDeko7WUFDRCxJQUFHLFFBQVEsQ0FBQywrQkFBK0IsRUFBQztnQkFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsV0FBVyxDQUFDLHdCQUF3QixFQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDaEs7WUFDRCxJQUFHLFFBQVEsQ0FBQywrQkFBK0IsRUFBQztnQkFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsV0FBVyxDQUFDLHdCQUF3QixFQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7YUFDL0o7WUFFRCx5Q0FBeUM7WUFDekMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGtDQUFLLEdBQWIsVUFBYyxRQUFRO1lBRWxCLFFBQU8sUUFBUSxFQUFDO2dCQUNaLEtBQUssSUFBSSxDQUFDLGlCQUFpQjtvQkFDdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN2QixNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDLG1CQUFtQjtvQkFDekIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLE1BQU07Z0JBQ1YsS0FBSyxJQUFJLENBQUMsa0JBQWtCO29CQUN4QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQywrQkFBK0I7b0JBQ3JDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO29CQUNoQyxNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDLGlDQUFpQztvQkFDdkMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1YsS0FBSyxJQUFJLENBQUMsaUNBQWlDO29CQUN2QyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztvQkFDaEMsTUFBTTthQUNiO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssNENBQWUsR0FBdkI7WUFDSSxxREFBcUQ7WUFDckQsSUFBRyxJQUFJLENBQUMsbUJBQW1CLElBQUksS0FBSyxFQUFDO2dCQUVqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxzQkFBdUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXBFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUM7UUFFTywwQ0FBYSxHQUFyQjtZQUNJLHVEQUF1RDtRQUMzRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw2Q0FBZ0IsR0FBeEI7WUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDakQsQ0FBQztRQUdEOzs7OztXQUtHO1FBQ0ssZ0RBQW1CLEdBQTNCLFVBQTRCLFVBQWtCO1lBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7WUFDcEMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFHRDs7Ozs7V0FLRztRQUNLLDhDQUFpQixHQUF6QjtZQUNJLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUM3QixJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxrQ0FBYSxDQUFDLGtCQUFrQixFQUFDO29CQUMxRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQzNEO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw2Q0FBZ0IsR0FBeEI7WUFDSSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDN0IsSUFBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksa0NBQWEsQ0FBQyxlQUFlLEVBQUMsRUFBRSxxQkFBcUI7b0JBQzlFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDMUQ7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHFEQUF3QixHQUFoQztZQUFBLGlCQVdDO1lBVkcsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7Z0JBQzdCLElBQUcsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDO29CQUMvRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO29CQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxzQkFBdUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLFVBQUMsTUFBTTt3QkFDckUsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzt3QkFDakMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsc0JBQXVCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4RSxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0sscURBQXdCLEdBQWhDO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7UUFDcEYsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0sscURBQXdCLEdBQWhDO1lBRUksSUFBSSxDQUFDLHNCQUF1QixDQUFDLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsVUFBQyxNQUFNO2dCQUM3RSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELDJCQUFZLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxpREFBb0IsR0FBNUIsVUFBNkIsTUFBd0IsRUFBRSxJQUF5QjtZQUNsRjtpQ0FDcUI7WUFGbkIsaUJBUUM7WUFKSCwrREFBK0Q7WUFDL0QsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVyRCxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBRUQ7Ozs7Ozs7V0FPQTtRQUNLLHVDQUFVLEdBQWxCLFVBQW1CLGdCQUFrQyxFQUFFLFlBQWlDO1lBRWpGLElBQUcsWUFBWSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUM7Z0JBQ3ZCLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxzQkFBdUIsQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLFVBQUMsTUFBTTtnQkFFckYsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNSLENBQUM7UUFFRTs7Ozs7O1dBTUc7UUFDSyw4REFBaUMsR0FBekMsVUFBMEMsVUFBa0I7WUFDeEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyw4Q0FBaUIsR0FBekIsVUFBMEIsVUFBa0I7WUFDeEMsdUNBQXVDO1lBQ3ZDLElBQUkscUJBQXFCLEdBQUcsVUFBVSxDQUFDO1lBQ3ZDLElBQUcsVUFBVSxJQUFJLGtDQUFhLENBQUMsaUJBQWlCLElBQUksVUFBVSxJQUFJLGtDQUFhLENBQUMsY0FBYyxFQUFDO2dCQUMzRixxQkFBcUIsR0FBRyx3QkFBd0IsQ0FBQzthQUNwRDtpQkFDSSxJQUFHLFVBQVUsSUFBSSxrQ0FBYSxDQUFDLGtCQUFrQixFQUFDO2dCQUNuRCxxQkFBcUIsR0FBRyx3QkFBd0IsQ0FBQzthQUNwRDtpQkFDSSxJQUFHLFVBQVUsSUFBSSxrQ0FBYSxDQUFDLGVBQWUsRUFBQztnQkFDaEQscUJBQXFCLEdBQUcsU0FBUyxDQUFDO2FBQ3JDO2lCQUNJLElBQUcsVUFBVSxJQUFJLGtDQUFhLENBQUMsY0FBYyxFQUFDO2dCQUMvQyxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQzthQUM1QztpQkFDSSxJQUFHLFVBQVUsSUFBSSxrQ0FBYSxDQUFDLGNBQWMsRUFBQztnQkFDL0MscUJBQXFCLEdBQUcsZUFBZSxDQUFDO2FBQzNDO1lBRUQsdUNBQXVDO1lBQ2pDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDLFFBQVEsQ0FBQztnQkFDeEMsSUFBSSxFQUFHLHFCQUFxQjthQUMvQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssK0NBQWtCLEdBQTFCLFVBQTJCLFVBQWlCO1lBQ3hDLGdDQUFnQztZQUNoQyxJQUFJLFNBQVMsR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25ELElBQUcsVUFBVSxJQUFHLGtDQUFhLENBQUMsa0JBQWtCLEVBQUM7Z0JBQzdDLFNBQVMsR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDNUQ7aUJBQ0ksSUFBRyxVQUFVLElBQUksa0NBQWEsQ0FBQyxlQUFlLEVBQUM7Z0JBQ2hELFNBQVMsR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDekQ7aUJBQ0ksSUFBRyxVQUFVLElBQUksa0NBQWEsQ0FBQyxjQUFjLEVBQUM7Z0JBQy9DLFNBQVMsR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDeEQ7WUFFRCxnQ0FBZ0M7WUFDaEMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBRyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUN6QixZQUFZLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLEdBQUcsU0FBUyxHQUFFLElBQUksQ0FBQzthQUNsRTtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyw0Q0FBZSxHQUF2QixVQUF3QixVQUFrQjtZQUN0QyxJQUFHLFVBQVUsSUFBSSxrQ0FBYSxDQUFDLGtCQUFrQixFQUFDO2dCQUM5QyxJQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQzthQUNoRDtpQkFDSSxJQUFHLFVBQVUsSUFBSSxrQ0FBYSxDQUFDLGVBQWUsRUFBQztnQkFDaEQsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7YUFDN0M7aUJBQ0c7Z0JBQ0EsSUFBRyxJQUFJLENBQUMsa0NBQWtDLENBQUMsVUFBVSxDQUFDLEVBQUM7b0JBQ25ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ3RFO2dCQUNELHFFQUFxRTtnQkFDckUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFckQsNEJBQTRCO2dCQUM1QixJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLEtBQUssRUFBQztvQkFDcEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDeEQ7cUJBQ0c7b0JBQ0EsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDdkQ7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLGtFQUFxQyxHQUE3QztZQUNJLDhFQUE4RTtZQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSywrREFBa0MsR0FBMUM7WUFDSSx1RUFBdUU7WUFDdkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0sseUNBQVksR0FBcEIsVUFBcUIsU0FBaUIsRUFBRSxXQUE0QjtZQUE1Qiw0QkFBQSxFQUFBLG1CQUE0QjtZQUNoRSxJQUFHLFdBQVcsSUFBSSxJQUFJLEVBQUM7Z0JBQ25CLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2FBQzdEO1lBQ0QsT0FBTyw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLDBDQUEwQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBQ2pILENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssK0RBQWtDLEdBQTFDLFVBQTJDLEtBQUs7WUFDNUMsSUFBRyxLQUFLLElBQUksa0NBQWEsQ0FBQyxRQUFRLElBQUksS0FBSyxJQUFJLGtDQUFhLENBQUMsY0FBYyxJQUFJLEtBQUssSUFBSSxrQ0FBYSxDQUFDLGNBQWMsRUFBQztnQkFDakgsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDTCx5QkFBQztJQUFELENBQUMsQUF4MEJELENBQWlDLHVCQUFVLEdBdzBCMUM7SUFFUSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbnRyb2xXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFdpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3RoZW1lUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRmlsZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9maWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VTdGF0ZUlkcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb25maWcvdHJhY2VDb25maWdEZWZpbmVzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBMYXlvdXQgc3R5bGVzIGZvciBkeW5hbWljIGxheW91dFxyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBMYXlvdXRTdHlsZXtcclxuICAgIERlZmF1bHQsXHJcbiAgICBNaW5pbWl6ZVN0ZXAxLFxyXG4gICAgTWluaW1pemVTdGVwMixcclxuICAgIE1pbmltaXplU3RlcDMsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgdGV4dHMgZm9yIHRoZSBidXR0b25zXHJcbiAqXHJcbiAqIEBjbGFzcyBCdXR0b25UZXh0c1xyXG4gKi9cclxuY2xhc3MgQnV0dG9uVGV4dHN7XHJcbiAgICAvLyBEZWZhdWx0IGJ1dHRvbiB0ZXh0c1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEFjdGl2YXRlID0gXCJBY3RpdmF0ZVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEZvcmNlU3RhcnQgPSBcIkZvcmNlIHN0YXJ0XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRm9yY2VTdG9wID0gXCJGb3JjZSBzdG9wXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU2F2ZVRyYWNlQ29uZmlndXJhdGlvbiA9IFwiU2F2ZSB0cmFjZSBjb25maWd1cmF0aW9uXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uID0gXCJJbXBvcnQgdHJhY2UgY29uZmlndXJhdGlvblwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiA9IFwiRXhwb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb25cIjtcclxuXHJcbiAgICAvLyBNaW5pbWl6ZWQgYnV0dG9uIHRleHRzXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU2F2ZVRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCA9IFwiU2F2ZVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCA9IFwiSW1wb3J0XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkID0gXCJFeHBvcnRcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb250cm9sV2lkZ2V0IGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbnRyb2xXaWRnZXQge1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVGaWVsZElkO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVJbWFnZTtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmF0ZUJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfZm9yY2VTdGFydEJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfZm9yY2VTdG9wQnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsVHJhY2VTdGF0ZSA9IFRyYWNlU3RhdGVJZHMuRGlzYWJsZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2F2ZUNvbmZpZ0lzQWN0aXZlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9hY3RpdmF0ZUlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb250cm9sSW50ZXJmYWNlOiBJVHJhY2VDb21wb25lbnRDb250cm9sfHVuZGVmaW5lZDtcclxuXHRcdFxyXG4gICAgcHJpdmF0ZSBfZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVQcm92aWRlcigpO1xyXG5cdFxyXG4gICAgcHJpdmF0ZSBfdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IGJ1dHRvbiB3aWR0aCBmb3IgYWN0aXZlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRCdXR0b25XaWR0aDEgPSBcIjg1cHhcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IGJ1dHRvbiB3aWR0aCBmb3IgZm9yY2Ugc3RhcnQvc3RvcCBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgyID0gXCIxMDBweFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBidXR0b24gd2lkdGggZm9yIHNhdmUvaW1wb3J0L2V4cG9ydCB0cmFjZSBjb25maWcgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRCdXR0b25XaWR0aDMgPSBcIjE5NXB4XCI7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW1pemVkIFN0ZXAgMSBidXR0b24gd2lkdGggZm9yIHNhdmUvaW1wb3J0L2V4cG9ydCB0cmFjZSBjb25maWcgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMSA9IFwiNjBweFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW1pemVkIFN0ZXAgMiBidXR0b24gd2lkdGggZm9yIHNhdmUvaW1wb3J0L2V4cG9ydCB0cmFjZSBjb25maWcgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMiA9IFwiMTZweFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBsZWZ0IHBvc2l0aW9uIG9mIHRoZSBzYXZlL2ltcG9ydC9leHBvcnQgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRQb3NpdGlvblN0YXJ0ID0gNzMwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBzcGFjZSBiZXR3ZWVuIHRoZSAgc2F2ZS9pbXBvcnQvZXhwb3J0IGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uU3BhY2UgPSAzNTtcclxuICAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2Ugc29tZSBvYmplY3RzIGZyb20gdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBEaXNwb3NlIHN0YXRpYyBidXR0b24gYW5kIGZpZWxkc1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lGaWVsZCh0aGlzLl9zdGF0ZUZpZWxkSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCk7XHJcblxyXG4gICAgICAgIC8vIERpc3Bvc2UgZHluYW1pYyBidXR0b25zIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95QnV0dG9uKHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKVxyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0QnV0dG9uQW5kRmllbGRJZHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVEaXZCdXR0b25zQW5kRmllbGRzTGF5b3V0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRTdGF0aWNCdXR0b25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgaWRzIGZvciB0aGUgYnV0dG9ucyBhbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0QnV0dG9uQW5kRmllbGRJZHMoKXtcclxuICAgICAgICBsZXQgbGF5b3V0Q29udGFpbmVySWQgPSB0aGlzLm1haW5EaXZJZDtcclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9hY3RpdmF0ZUJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfZm9yY2VTdGFydEJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9mb3JjZVN0b3BCdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfaW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlRmllbGRJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJ0cmFjZWNvbnRyb2xfc3RhdGVcIjtcclxuICAgICAgICB0aGlzLl9zdGF0ZUltYWdlID0gbGF5b3V0Q29udGFpbmVySWQgKyBcInRyYWNlY29udHJvbF9zdGF0ZV9pbWFnZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IGZvciB0aGUgYnV0dG9ucyBhbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEaXZCdXR0b25zQW5kRmllbGRzTGF5b3V0KCl7XHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLnBhZGRpbmdUb3AgPSBcIjRweFwiO1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ2YXIoLS1tYWluLWdyZXktZGFyazIpXCI7XHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZWxlbWVudCA9ICQodGhpcy5tYWluRGl2KTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IDI1cHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5fYWN0aXZhdGVCdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J3RvcDogMTBweDsgbGVmdDogMTUwcHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGNsYXNzPSd0cmFjZUNvbnRyb2xTdGF0ZUltYWdlJyBpZD0nXCIrIHRoaXMuX3N0YXRlSW1hZ2UgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSd0b3A6IDEwcHg7IGxlZnQ6IDE4MHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX3N0YXRlRmllbGRJZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IDM0MHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IDQ3NXB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0nbGVmdDogXCIgKyB0aGlzLmdldExlZnRQb3NpdGlvbigwKSArIFwicHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0nbGVmdDogXCIgKyB0aGlzLmdldExlZnRQb3NpdGlvbigxKSArIFwicHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiBcIiArIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDIpICsgXCJweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGxlZnQgcG9zaXRpb24gb2YgYSBidXR0b24gZm9yIHRoZSBnaXZlbiBMYXlvdXRTdHlsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAqIEBwYXJhbSB7TGF5b3V0U3R5bGV9IFtsYXlvdXRTdHlsZT1MYXlvdXRTdHlsZS5EZWZhdWx0XVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRMZWZ0UG9zaXRpb24oaW5kZXg6IG51bWJlciwgbGF5b3V0U3R5bGU6IExheW91dFN0eWxlID0gTGF5b3V0U3R5bGUuRGVmYXVsdCk6IG51bWJlcntcclxuICAgICAgICBpZihpbmRleCA9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnRQb3NpdGlvblN0YXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdEJ1dHRvbldpZHRoID0gdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMztcclxuICAgICAgICAgICAgaWYobGF5b3V0U3R5bGUgPT0gTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMSl7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0QnV0dG9uV2lkdGggPSB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDE7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGxheW91dFN0eWxlID09IExheW91dFN0eWxlLk1pbmltaXplU3RlcDIpe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEJ1dHRvbldpZHRoID0gdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBidXR0b25XaWR0aCA9IHBhcnNlSW50KGRlZmF1bHRCdXR0b25XaWR0aCwgMTApO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVmdFBvc2l0aW9uU3RhcnQgKyAoaW5kZXggKiAoYnV0dG9uV2lkdGggKyB0aGlzLl9kZWZhdWx0QnV0dG9uU3BhY2UpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBidXR0b25zIGFuZCBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFN0YXRpY0J1dHRvbnMoKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkLCBCdXR0b25UZXh0cy5BY3RpdmF0ZSwgIHRoaXMuZ2V0SW1hZ2VQYXRoKFwicGxheS5zdmdcIiksIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDEpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRmllbGQodGhpcy5fc3RhdGVGaWVsZElkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIEJ1dHRvblRleHRzLkZvcmNlU3RhcnQsICB0aGlzLmdldEltYWdlUGF0aChcInJlY29yZC5zdmdcIiksIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDIpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkLCBCdXR0b25UZXh0cy5Gb3JjZVN0b3AsICB0aGlzLmdldEltYWdlUGF0aChcInN0b3Auc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSB0cmFjZSBjb250cm9sIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy90cmFjZUNvbnRyb2xXaWRnZXQvc3R5bGUvY3NzL3RyYWNlQ29udHJvbFN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L3N0eWxlL2Nzcy90cmFjZUNvbnRyb2xCdXR0b25TdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMvRGVhY3RpdmF0ZXMgYSBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlYWN0aXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVhY3RpdmF0ZUJ1dHRvbihpZDogc3RyaW5nLCBkZWFjdGl2YXRlOiBib29sZWFuKXtcclxuICAgICAgICB2YXIgZWpCdXR0b24gPSAkKFwiI1wiKyBpZCkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKGVqQnV0dG9uID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uQ3NzQ2xhc3MoZWpCdXR0b24sIGRlYWN0aXZhdGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChcIiNcIiArIGlkKVswXTtcclxuXHJcbiAgICAgICAgbGV0IGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoRm9ySWQoaWQsIGRlYWN0aXZhdGUpO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ1wiICsgaW1hZ2VQYXRoICtcIicpXCI7XHJcblxyXG4gICAgICAgIERvbUhlbHBlci5kaXNhYmxlRWxlbWVudChidXR0b25FbGVtZW50LCBkZWFjdGl2YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGxheW91dCBvZiB0aGUgYnV0dG9uKGUuZy4gdGV4dCwgc2l6ZSwgbGVmdCBwb3N0aW9uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25UZXh0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3U2l6ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld0xlZnRQb3NpdGlvblxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRCdXR0b25MYXlvdXQoaWQ6IHN0cmluZywgYnV0dG9uVGV4dDogc3RyaW5nLCBuZXdTaXplOiBzdHJpbmcsIG5ld0xlZnRQb3NpdGlvbjogc3RyaW5nKXtcclxuICAgICAgICB2YXIgZWpCdXR0b24gPSAkKFwiI1wiKyBpZCkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKGVqQnV0dG9uID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwidGV4dFwiLCBidXR0b25UZXh0LCB0cnVlKTtcclxuICAgICAgICBpZihidXR0b25UZXh0ID09IFwiXCIpe1xyXG4gICAgICAgICAgICBlakJ1dHRvbi5vcHRpb24oXCJjb250ZW50VHlwZVwiLCBlai5Db250ZW50VHlwZS5JbWFnZU9ubHksIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBlakJ1dHRvbi5vcHRpb24oXCJjb250ZW50VHlwZVwiLCBlai5Db250ZW50VHlwZS5UZXh0QW5kSW1hZ2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlakJ1dHRvbi5vcHRpb24oXCJ3aWR0aFwiLCBuZXdTaXplLCB0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSAkKFwiI1wiICsgaWQpWzBdO1xyXG4gICAgICAgIGlmKGJ1dHRvbkVsZW1lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5sZWZ0ID0gbmV3TGVmdFBvc2l0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW1hZ2VwYXRoIGZvciB0aGUgYnV0dG9uIGlkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVhY3RpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVBhdGhGb3JJZChidXR0b25JZDogc3RyaW5nLCBkZWFjdGl2YXRlOiBib29sZWFuKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBpbWFnZVBhdGg7XHJcbiAgICAgICAgaWYoYnV0dG9uSWQgPT0gdGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJyZWNvcmQuc3ZnXCIsIGRlYWN0aXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGJ1dHRvbklkID09IHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJzdG9wLnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQpe1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aChcInNhdmUuc3ZnXCIsIGRlYWN0aXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGJ1dHRvbklkID09IHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQpe1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aChcInBsYXkuc3ZnXCIsIGRlYWN0aXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGJ1dHRvbklkID09IHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJpbXBvcnQuc3ZnXCIsIGRlYWN0aXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGJ1dHRvbklkID09IHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJleHBvcnQuc3ZnXCIsIGRlYWN0aXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW1hZ2VQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgQnV0dG9uIGNzcyBzdHlsZXMgZm9yIGFjdGl2YXRlZCBvciBkZWFjdGl2YXRlZCBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVqQnV0dG9uXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlYWN0aXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRCdXR0b25Dc3NDbGFzcyhlakJ1dHRvbiwgZGVhY3RpdmF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgaWYoZGVhY3RpdmF0ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwiY3NzQ2xhc3NcIiwgXCJ0cmFjZUNvbnRyb2xCdXR0b25EZWFjdGl2YXRlZFwiLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwiY3NzQ2xhc3NcIiwgXCJ0cmFjZUNvbnRyb2xCdXR0b25cIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJ1dHRvbiB3aXRoIHRoZSBnaXZlbiB0ZXh0IGFuZCBpbWFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVBhdGhcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b24oaWQ6IHN0cmluZywgdGV4dDogc3RyaW5nLCBpbWFnZVBhdGg6IHN0cmluZywgd2lkdGgpe1xyXG4gICAgICAgICg8YW55PiQoXCIjXCIgKyBpZCkpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRBbmRJbWFnZSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwidHJhY2VDb250cm9sQnV0dG9uXCIsXHJcbiAgICAgICAgICAgIHByZWZpeEljb246IFwiZS1pY29uXCIsIC8vU3BlY2lmaWVzIHRoZSBwcmltYXJ5IGljb24gZm9yIEJ1dHRvblxyXG4gICAgICAgICAgICBjbGljazogKGNsaWNrQXJncykgPT4gdGhpcy5jbGljayhpZCksXHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSAkKFwiI1wiICsgaWQpWzBdO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWCA9IFwiNHB4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25ZID0gXCI0cHhcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdcIiArIGltYWdlUGF0aCArXCInKVwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9IFwibm8tcmVwZWF0XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMTZweCAxNnB4XCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95cyB0aGUgYnV0dG9uIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lCdXR0b24oaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9ICQoXCIjXCIgKyBpZCkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKGJ1dHRvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBidXR0b24uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB0cmFjZSBzdGF0ZSBmaWVsZCAoY3VycmVudGx5IGEgc3BlY2lhbCBidXR0b24gaXMgdXNlZClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVGaWVsZChpZDogc3RyaW5nKXtcclxuICAgICAgICAoPGFueT4kKFwiI1wiICsgaWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiMFwiLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dE9ubHksXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcInRyYWNlU3RhdGVCdXR0b25cIixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGZpZWxkRWxlbWVudCA9ICQoXCIjXCIgKyBpZClbMF07XHJcbiAgICAgICAgaWYoZmllbGRFbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZpZWxkRWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0ZGRkZGRlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc3Ryb3lzIHRoZSBmaWVsZCBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95RmllbGQoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGZpZWxkID0gJChcIiNcIiArIGlkKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgaWYoZmllbGQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZmllbGQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZXMgdGhlIHRyYWNlIGNvbnRyb2wgd2lkZ2V0XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLndpZHRoID0gd2lkdGgudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICB0aGlzLm1haW5EaXYuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVEeW5hbWljTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkeW5hbWljIGxheW91dCAoZS5nLiBzbWFsbGVyIGJ1dHRvbnMgaWYgc21hbGwgd2lkZ2V0IHNpemUpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVEeW5hbWljTGF5b3V0KCl7XHJcbiAgICAgICAgbGV0IG5lZWRlZFNpemVGb3JEZWZhdWx0TGF5b3V0ID0gMTQwMDtcclxuICAgICAgICBsZXQgbmVlZGVkU2l6ZUZvck1pbmltemVkTGF5b3V0U3RlcDEgPSAxMDAwO1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdHVhbFdpZHRoID4gbmVlZGVkU2l6ZUZvckRlZmF1bHRMYXlvdXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldExheW91dChMYXlvdXRTdHlsZS5EZWZhdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLl9hY3R1YWxXaWR0aCA+IG5lZWRlZFNpemVGb3JNaW5pbXplZExheW91dFN0ZXAxKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRMYXlvdXQoTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TGF5b3V0KExheW91dFN0eWxlLk1pbmltaXplU3RlcDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGR5bmFtaWMgbGF5b3V0IHRvIGEgZGVmaW5lZCBsYXlvdXQgc3R5bGUgKGUuZy4gZGVmYXVsdCBvciBtaW5pbWl6ZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TGF5b3V0U3R5bGV9IGxheW91dFN0eWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TGF5b3V0KGxheW91dFN0eWxlOiBMYXlvdXRTdHlsZSl7XHJcbiAgICAgICAgc3dpdGNoKGxheW91dFN0eWxlKXtcclxuICAgICAgICAgICAgY2FzZSBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIFwiXCIsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMiwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMCwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMikgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIFwiXCIsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMiwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMSwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMikgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIFwiXCIsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMiwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMiwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMikgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLlNhdmVUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMSwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMCwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMSkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkltcG9ydFRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAxLCB0aGlzLmdldExlZnRQb3NpdGlvbigxLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDEsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDIsIExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTGF5b3V0U3R5bGUuRGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5TYXZlVHJhY2VDb25maWd1cmF0aW9uLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzLCB0aGlzLmdldExlZnRQb3NpdGlvbigwKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzLCB0aGlzLmdldExlZnRQb3NpdGlvbigxKSArXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5FeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24sIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDIpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYW5kIGRlZmluZXMgdGhlIGludGVyZmFjZSB0byB0aGUgdHJhY2UgY29udHJvbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB0cmFjZUNvbnRyb2xJbnRlcmZhY2UodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlID0gdHJhY2VDb21wb25lbnRDb250cm9sO1xyXG4gICAgICAgIGlmKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRHluYW1pY0J1dHRvbnNGb3JBdmFpbGFibGVDb21tYW5kcyh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRyYWNlU3RhdGUodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdHJhY2Ugc3RhdGUgaW5mbyB0byBsYXlvdXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZUNvbnRyb2xJbnRlcmZhY2VcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUcmFjZVN0YXRlKHRyYWNlQ29udHJvbEludGVyZmFjZSl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVGaWVsZCh0aGlzLl9zdGF0ZUZpZWxkSWQpO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hUcmFjZUNvbnRyb2xQYXJhbWV0ZXJWYWx1ZSh0aGlzLl9hY3R1YWxUcmFjZVN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGR5bmFtaWMgYnV0dG9ucyAoc2F2ZS9pbXBvcnQvZXhwb3J0IHRyYWNlIGNvbmZpZ3VhdGlvbikgaWYgY29tbWFuZCBpcyBhdmFpbGFibGUgaW4gY29tbWFuZCBpbnRlcmZhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjb21tYW5kc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZER5bmFtaWNCdXR0b25zRm9yQXZhaWxhYmxlQ29tbWFuZHMoY29tbWFuZHMpe1xyXG4gICAgICAgIGlmKGNvbW1hbmRzLmNvbW1hbmRTYXZlQ29uZmlndXJhdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuU2F2ZVRyYWNlQ29uZmlndXJhdGlvbiwgdGhpcy5nZXRJbWFnZVBhdGgoXCJzYXZlLnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNvbW1hbmRzLmNvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uLCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJpbXBvcnQuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY29tbWFuZHMuY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5FeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24sICB0aGlzLmdldEltYWdlUGF0aChcImV4cG9ydC5zdmdcIiksIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVwZGF0ZSBsYXlvdXQgYWZ0ZXIgYWRkaW5nIG5ldyBidXR0b25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVEeW5hbWljTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgYnV0dG9uIHdhcyBjbGlja2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYnV0dG9uSWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGljayhidXR0b25JZCl7XHJcblxyXG4gICAgICAgIHN3aXRjaChidXR0b25JZCl7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fYWN0aXZhdGVCdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQ6ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUZvcmNlU3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlRm9yY2VTdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVTYXZlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltcG9ydFRyYWNlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSB0cmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUFjdGl2YXRlKCl7XHJcbiAgICAgICAgLy8gaW52b2tlIGFjdGl2YXRlIHRyYWNlIGJ5IHVzaW5nIGEgY29tcG9uZW50IGNvbW1hbmRcclxuICAgICAgICBpZih0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPT0gZmFsc2UpeyAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmF0ZUlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlIS50cmFjZVN0YXRlLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVUcmFjZSgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWN0aXZhdGVUcmFjZSgpIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtdGhvZCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdHJhY2UgYWN0aXZhdGlvbiByZXNwb25zZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UcmFjZUFjdGl2YXRlZCgpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZUlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB0cmFjZSBzdGF0ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZVN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UcmFjZVN0YXRlQ2hhbmdlZCh0cmFjZVN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9hY3R1YWxUcmFjZVN0YXRlID0gdHJhY2VTdGF0ZTsgXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVHJhY2VDb250cm9sUGFyYW1ldGVyVmFsdWUodHJhY2VTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIHN0YXJ0aW5nIHRoZSB0cmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUZvcmNlU3RhcnQoKXtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlLmNvbW1hbmRGb3JjZVN0YXJ0LmV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcmNlcyBzdG9wcGluZyB0aGUgdHJhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVGb3JjZVN0b3AoKXtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0b3BfZXZlbnQpeyAvLyBPbmx5IHdoaWxlIHJ1bm5pbmdcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZS5jb21tYW5kRm9yY2VTdG9wLmV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIG9uIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZVNhdmVDb25maWd1cmF0aW9uKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNhdmVUcmFjZUNvbmZpZ1Bvc3NpYmxlSW5UaGlzU3RhdGUodGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2F2ZUNvbmZpZ0lzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSEudHJhY2VTdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UuY29tbWFuZFNhdmVDb25maWd1cmF0aW9uLmV4ZWN1dGUobnVsbCwocmVzdWx0KSA9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlcyh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UhLnRyYWNlU3RhdGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyBhIGZpbGUgc2VsZWN0IGRpYWxvZyBhbmQgaW1wb3J0cyBhIHRyYWNlIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW1wb3J0VHJhY2VDb25maWd1cmF0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmF0dGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9maWxlUHJvdmlkZXIudXBsb2FkRGF0YShcIi50cmFjZWNmZ1wiKTsgLy8gT25seSBzaG93L2FjY2VwdCAqLnRyYWNlY2ZnIGZpbGVzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnQgYSB0cmFjZSBjb25maWd1cmF0aW9uIHRvIGEgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKCl7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSEuY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbi5leGVjdXRlKG51bGwsKHJlc3VsdCkgPT57XHJcbiAgICAgICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW3Jlc3VsdF0sIHsgdHlwZTogXCJ0ZXh0L3htbFwiIH0pO1xyXG4gICAgICAgICAgICBGaWxlUHJvdmlkZXIuZG93bmxvYWREYXRhKFwiVHJhY2VDb25maS50cmFjZWNmZ1wiLCBibG9iKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2NjdXJzIGFmdGVyIHJlYWRpbmcgZGF0YSBmcm9tIGZpbGUodHJhY2UgY29uZmlndXJhdGlvbiBpbXBvcnQgZGF0YSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcjogSFRNTElucHV0RWxlbWVudCwgYXJnczogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcblx0XHQvKnRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJJbXBvcnRpbmcgZGF0YS4uLlwiLCBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgNDgsIHRydWUpKTtcclxuXHRcdHRoaXMuc2V0QnVzeSh0cnVlKTsqL1xyXG5cdFx0XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBpbXBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbXBvcnREYXRhKHNlbmRlciwgYXJncyksIDIwMCk7XHJcblxyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmRldGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcblx0ICogaW1wb3J0cyB0aGUgZ2l2ZW4gZmlsZWRhdGEgd2l0aCB0aGUgZ2l2ZW4gZmlsZW5hbWVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbGVtZW50XHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbXBvcnREYXRhKGZpbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZmlsZUNvbnRlbnRzLnNpemUgPT09IDEpe1xyXG4gICAgICAgICAgICBsZXQgZmlsZWRhdGEgPSBmaWxlQ29udGVudHMudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UhLmNvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24uZXhlY3V0ZShmaWxlZGF0YSwocmVzdWx0KSA9PntcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHRyYWNlIHN0YXRlIChkaXNwbGF5bmFtZSBvZiB2YWx1ZSBhbmQgdGhlIHN0YXRlIGljb24pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHRyYWNlQ29udHJvbFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hUcmFjZUNvbnRyb2xQYXJhbWV0ZXJWYWx1ZSh0cmFjZVN0YXRlOiBzdHJpbmcpIHsgICBcclxuICAgICAgICB0aGlzLnNldFRyYWNlU3RhdGVUZXh0KHRyYWNlU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VTdGF0ZUltYWdlKHRyYWNlU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRyYWNlU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBkaXNwbGF5IG5hbWUgZm9yIHRoZSB0cmFjZSBzdGF0ZSBpbiB0aGUgdmlzdWFsaXphdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2VTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFRyYWNlU3RhdGVUZXh0KHRyYWNlU3RhdGU6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gR2V0IGRpc3BsYXkgbmFtZSBmb3IgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgbGV0IHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiSW5hY3RpdmVcIjtcclxuICAgICAgICBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuQ29uZmlnX3Byb2Nlc3NpbmcgfHwgdHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkNvbmZpZ19hcHBsaWVkKXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJBcHBseWluZyBjb25maWd1cmF0aW9uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RhcnRfdHJpZ2dlcil7XHJcbiAgICAgICAgICAgIHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiV2FpdCBmb3Igc3RhcnQgdHJpZ2dlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0b3BfZXZlbnQpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIlJ1bm5pbmdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIkRhdGEgYXZhaWxhYmxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLlJlY29yZF9mYWlsdXJlKXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJSZWNvcmQgZmFpbGVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkaXNwbGF5IG5hbWUgZm9yIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICAgICg8YW55PiQoXCIjXCIgKyB0aGlzLl9zdGF0ZUZpZWxkSWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6ICB0cmFjZVN0YXRlRGlzcGxheVRleHQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGFuIGltYWdlIGZvciB0aGUgdHJhY2Ugc3RhdGUgaW4gdGhlIHZpc3VhbGl6YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUcmFjZVN0YXRlSW1hZ2UodHJhY2VTdGF0ZTpzdHJpbmcpe1xyXG4gICAgICAgIC8vIEdldCBpbWFnZSBmb3IgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgICAgbGV0IGltYWdlcGF0aCA9ICB0aGlzLmdldEltYWdlUGF0aChcImluYWN0aXZlLnN2Z1wiKTtcclxuICAgICAgICBpZih0cmFjZVN0YXRlID09VHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpeyBcclxuICAgICAgICAgICAgaW1hZ2VwYXRoID0gIHRoaXMuZ2V0SW1hZ2VQYXRoKFwid2FpdF9zdGFydF90cmlnZ2VyLnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdG9wX2V2ZW50KXtcclxuICAgICAgICAgICAgaW1hZ2VwYXRoID0gIHRoaXMuZ2V0SW1hZ2VQYXRoKFwid2FpdF9zdG9wX2V2ZW50LnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpe1xyXG4gICAgICAgICAgICBpbWFnZXBhdGggPSAgdGhpcy5nZXRJbWFnZVBhdGgoXCJkYXRhX2F2YWlsYWJsZS5zdmdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgaW1hZ2UgZm9yIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICAgIGxldCBpbWFnZUVsZW1lbnQgPSAkKFwiI1wiICsgdGhpcy5fc3RhdGVJbWFnZSlbMF07XHJcbiAgICAgICAgaWYoaW1hZ2VFbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGltYWdlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZXBhdGggK1wiJylcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzdGF0ZXMoZW5hYmxlZC9kaXNhYmxlZCkgb2YgdGhlIGJ1dHRvbnMgZm9yIHRoZSBnaXZlbiB0cmFjZSBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2VTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0YXRlcyh0cmFjZVN0YXRlOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlSW5XYWl0U3RhcnRUcmlnZ2VyU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdG9wX2V2ZW50KXtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZUluV2FpdFN0b3BFdmVudFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZSh0cmFjZVN0YXRlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb3RoZXIgc3RhdGUgPT4gZGVhY3RpdmF0ZSBmb3JjZSBzdGFydCB0cmlnZ2VyIGFuZCBmb3JjZSBzdG9wIGV2ZW50XHJcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGFjdGl2YXRlIGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgICAgICBpZih0aGlzLl9hY3RpdmF0ZUlzQWN0aXZlID09IGZhbHNlICYmIHRoaXMuX3NhdmVDb25maWdJc0FjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYnV0dG9uIHN0YXRlcyBpZiB0aGUgdHJhY2Ugc3RhdGUgaXMgd2FpdGluZyBmb3Igc3RhcnQgdHJpZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3RhdGVJbldhaXRTdGFydFRyaWdnZXJTdGF0ZSgpe1xyXG4gICAgICAgIC8vIFdhaXQgZm9yIHN0YXJ0IHRyaWdnZXIgPT4gYWN0aXZhdGUgZm9yY2Ugc3RhcnQ7IGRlYWN0aXZhdGUgZm9yY2Ugc3RvcCBldmVudFxyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYnV0dG9uIHN0YXRlcyBpZiB0aGUgdHJhY2Ugc3RhdGUgaXMgd2FpdGluZyBmb3IgdGhlIHN0b3AgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0YXRlSW5XYWl0U3RvcEV2ZW50U3RhdGUoKXtcclxuICAgICAgICAvLyBSdW5uaW5nID0+IGRlYWN0aXZhdGUgZm9yY2Ugc3RhcnQgdHJpZ2dlcjsgYWN0aXZhdGUgZm9yY2Ugc3RvcCBldmVudFxyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW1hZ2VQYXRoIGZvciB0aGUgZ2l2ZW4gaW1hZ2VOYW1lIGFuZCBzdGF0ZShhY3RpdmF0ZWQvZGVhY3RpdmF0ZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlYWN0aXZhdGVkPWZhbHNlXVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVBhdGgoaW1hZ2VOYW1lOiBzdHJpbmcsIGRlYWN0aXZhdGVkOiBib29sZWFuID0gZmFsc2UpOnN0cmluZ3tcclxuICAgICAgICBpZihkZWFjdGl2YXRlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lID0gaW1hZ2VOYW1lLnJlcGxhY2UoXCIuc3ZnXCIsIFwiX2RlYWN0aXZhdGVkLnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L3N0eWxlL2ltYWdlcy9cIiArIGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiBzYXZlaW5nIG9mIHRyYWNlIGNvbmZpZ3VyYXRpb24gaXMgcG9zc2libGUgaW4gdGhlIGN1cnJlbnQgdHJhY2Ugc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzdGF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZShzdGF0ZSk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoc3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EaXNhYmxlZCB8fCBzdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkRhdGFfYXZhaWxhYmxlIHx8IHN0YXRlID09IFRyYWNlU3RhdGVJZHMuUmVjb3JkX2ZhaWx1cmUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbnRyb2xXaWRnZXQgfTsiXX0=
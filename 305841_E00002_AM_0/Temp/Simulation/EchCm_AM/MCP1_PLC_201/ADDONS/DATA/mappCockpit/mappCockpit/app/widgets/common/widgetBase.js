define(["require", "exports", "../../models/dataModelInterface", "./busyInformation", "./themeProvider", "./widgetsWithDropSupportProvider", "../../framework/store", "./dragDropArgs", "../../framework/componentHub/bindings/componentBindings", "../../common/componentBase/componentSettings", "./componentDefaultDefinitionWidgetBase"], function (require, exports, dataModelInterface_1, busyInformation_1, themeProvider_1, widgetsWithDropSupportProvider_1, store_1, dragDropArgs_1, componentBindings_1, componentSettings_1, componentDefaultDefinitionWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WidgetBase = /** @class */ (function () {
        /**
         * Creates an instance of WidgetBase
         * @memberof WidgetBase
         */
        function WidgetBase() {
            var _this = this;
            this._states = new store_1.Store();
            this._widgets = new Map();
            this._subComponentsLoadedHandler = function (sender, eventArgs) { _this.handleSubComponentsLoaded(sender, eventArgs); };
            this._componentSettingsLoadedHandler = function (sender, eventArgs) { _this.handleComponentSettingsLoaded(sender, eventArgs); };
            this.busyScreenId = "";
            this.flaggedForResize = false;
            this.widgetName = "";
            this._actualWidth = 0;
            this._actualHeight = 0;
            this._headerHeight = 0;
            this._footerHeight = 0;
            this._busyInformation = new busyInformation_1.BusyInformation();
            this._modelChangedHandler = function (sender, data) { _this.handleModelChanged(sender, data); };
            this._modelItemsChangedHandler = function (sender, data) { _this.handleModelItemsChanged(sender, data); };
            //#region Drop support
            this._supportedDragDropDataIds = new Array(); //e.g. Signal, ..
            //#endregion
            //#region drag support
            this._dropPossible = false;
            this._draggingSupportActive = false;
            this._defaultDropNotPossibleRepresentation = "";
            this._dataModel = new NullDataModel();
        }
        Object.defineProperty(WidgetBase.prototype, "mainDiv", {
            get: function () {
                return this._widgetMainDiv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "headerDiv", {
            get: function () {
                return this._widgetHeaderDiv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "footerDiv", {
            get: function () {
                return this._widgetFooterDiv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "mainDivId", {
            /**
             * Returns the widgets main div id
             *
             * @readonly
             * @type {string}
             * @memberof WidgetBase
             */
            get: function () {
                return this.mainDiv.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "view", {
            get: function () {
                return this._view;
            },
            set: function (view) {
                this._view = view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "states", {
            get: function () {
                return this._view ? this._view.states : this._states;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "width", {
            /**
             * Returns the current width of the widget
             *
             * @readonly
             * @type {number}
             * @memberof WidgetBase
             */
            get: function () {
                return this._actualWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "height", {
            /**
             * Returns the current height of the widget
             *
             * @readonly
             * @type {number}
             * @memberof WidgetBase
             */
            get: function () {
                return this._actualHeight;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns a unique div id (e.g. Cont_1)
         *
         * @static
         * @returns {string}
         * @memberof WidgetBase
         */
        WidgetBase.getUniqueDivId = function () {
            WidgetBase._uniqueDivId++;
            var id = WidgetBase._uniqueDivId.toString();
            return "Cont_" + id;
        };
        /**
         * Initializes the widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initialize = function () {
            this.initializeWithId(WidgetBase.getUniqueDivId());
        };
        /**
         * Initializes the widget with the given id
         *
         * @private
         * @param {string} divId
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initializeWithId = function (divId) {
            // Create the needed divs
            this.createDivs(divId);
            // Add divs to document body (otherwise syncfusion can not initialize the widgets correct)
            this.addToDocumentsTemp();
            // Load styles
            this.loadStyles();
            // Load component settings
            this.component.eventSubComponentsLoaded.attach(this._subComponentsLoadedHandler);
            this.component.eventComponentSettingsLoaded.attach(this._componentSettingsLoadedHandler);
            this.component.loadComponentSettings();
            this.component.eventSubComponentsLoaded.detach(this._subComponentsLoadedHandler);
            this.component.eventComponentSettingsLoaded.detach(this._componentSettingsLoadedHandler);
        };
        /**
         * Creates the main div and if needed header and footer divs
         *
         * @private
         * @param {string} divId
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createDivs = function (divId) {
            // Create widget main div at first to define the mainDivId
            this._widgetMainDiv = document.createElement("div");
            this._widgetMainDiv.id = divId;
            this._headerHeight = this.defineHeaderHeight();
            if (this._headerHeight != 0) {
                this.createHeaderDiv();
            }
            this._footerHeight = this.defineFooterHeight();
            if (this._footerHeight != 0) {
                this.createFooterDiv();
            }
        };
        /**
         * Returns the height which the header should have
         *
         * @returns {number}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.defineHeaderHeight = function () {
            return 0;
        };
        /**
         * Returns the height which the footer should have
         *
         * @returns {number}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.defineFooterHeight = function () {
            return 0;
        };
        /**
         * Adds(moves) the div containers of this widget to the document(needed for correct behavior of the syncfusion widget because they are looking into the document)
         *
         * @public
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addToDocumentsTemp = function () {
            var widgetTempDivId = "widgetTemp";
            // create document body widgetTemp container if not already available ...
            var widgetTempDiv = document.getElementById(widgetTempDivId);
            if (widgetTempDiv == null) {
                widgetTempDiv = document.createElement("div");
                widgetTempDiv.id = widgetTempDivId;
                document.body.appendChild(widgetTempDiv);
            }
            // ... and add the divs of this widget
            if (this.headerDiv != undefined) {
                widgetTempDiv.appendChild(this.headerDiv);
            }
            widgetTempDiv.appendChild(this.mainDiv);
            if (this.footerDiv != undefined) {
                widgetTempDiv.appendChild(this.footerDiv);
            }
        };
        /**
         * Creates a new header div
         *
         * @protected
         * @param {number} headerHeight
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createHeaderDiv = function () {
            var headerContainerId = this.mainDivId + "_header";
            this._widgetHeaderDiv = this.createDiv(headerContainerId, "widgetHeader", this._headerHeight);
        };
        /**
         * creates a new footer div
         *
         * @protected
         * @param {number} footerHeight
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createFooterDiv = function () {
            var footerContainerId = this.mainDivId + "_footer";
            this._widgetFooterDiv = this.createDiv(footerContainerId, "widgetFooter", this._footerHeight);
        };
        /**
         * Creates a new div with the given informations
         *
         * @private
         * @param {string} id
         * @param {string} className
         * @param {number} height
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createDiv = function (id, className, height) {
            var newHeaderDiv = document.createElement("div");
            newHeaderDiv.id = id;
            newHeaderDiv.classList.add(className);
            newHeaderDiv.style.height = height.toString() + "px";
            return newHeaderDiv;
        };
        /**
         * Adds the div containers(header, main, footer, ...) of this widget to the given parent container
         *
         * @param {(HTMLDivElement|undefined)} parentContainer
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addToParentContainer = function (parentContainer) {
            if (parentContainer == undefined) {
                return;
            }
            // Add header
            if (this._widgetHeaderDiv != undefined) {
                parentContainer.append(this._widgetHeaderDiv);
            }
            // Add main
            parentContainer.append(this.mainDiv);
            // Add footer
            if (this._widgetFooterDiv != undefined) {
                parentContainer.append(this._widgetFooterDiv);
            }
        };
        WidgetBase.prototype.addToParentContainerId = function (parentContainerId) {
            var parentContainer = document.getElementById(parentContainerId);
            if (parentContainer != null) {
                this.addToParentContainer(parentContainer);
            }
        };
        /**
         * Handles the sub component loaded event
         *
         * @param {ComponentBase} sender
         * @param {*} eventargs
         * @memberof WidgetBase
         */
        WidgetBase.prototype.handleSubComponentsLoaded = function (sender, eventargs) {
            this.createLayout();
            this.attachLayoutToView();
        };
        /**
         * Handles the component settings loaded event
         *
         * @param {ComponentBase} sender
         * @param {*} eventargs
         * @memberof WidgetBase
         */
        WidgetBase.prototype.handleComponentSettingsLoaded = function (sender, eventargs) {
            this.initialized();
            this.component.setBindingsData();
        };
        /**
         * Reinitializes the chart
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.reinitialize = function () {
            // get current div id
            var currentId = this.mainDivId;
            // empty current wirdget div
            $(this.mainDiv).empty();
            // initialize widget with the already used div id
            this.initializeWithId(currentId);
        };
        /**
         * Will be called after initialization(when loading persisting data was done)
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initialized = function () {
        };
        /**
         * Initialize the component parts here
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initializeComponent = function () {
        };
        /**
         * Set the id for the default settings data which should be used if no persisting data is available
         *
         * @param {string} defaultSettingsDataId
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setDefaultComponentSettingsDataId = function (defaultSettingsDataId) {
            this.component.defaultSettingsDataId = defaultSettingsDataId;
        };
        /**
         * Returns the settings of this component
         *
         * @returns {ComponentSettings}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.getComponentSettings = function (onlyModified) {
            return this.component.getComponentSettings(onlyModified);
        };
        /**
         * Sets settings to this component
         *
         * @param {(ComponentSettings|undefined)} settings
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setComponentSettings = function (settings) {
            if (settings != undefined) {
                // Set componentSettings
                this.component.setComponentSettings(settings);
            }
        };
        WidgetBase.prototype.attachLayoutToView = function (parentView) {
            if (parentView === void 0) { parentView = undefined; }
            var view = parentView ? parentView : this._view;
            if (view && this._layoutWidget) {
                this._layoutWidget.view = view;
            }
        };
        /** sets the header content
         *
         * @param {string} content
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setHeaderContent = function (content) {
            if (this._widgetHeaderDiv != undefined) {
                this._widgetHeaderDiv.innerHTML = content;
            }
        };
        /** sets the footer content
         *
         * @param {string} content
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setFooterContent = function (content) {
            if (this._widgetFooterDiv != undefined) {
                this._widgetFooterDiv.innerHTML = content;
            }
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createLayout = function () {
        };
        /**
         * Load styles for WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.loadStyles = function () {
            //this.styleLoaded(undefined);
        };
        ;
        WidgetBase.prototype.addStyle = function (filePath) {
            var themedFilePath = this.getThemedFilePath(filePath);
            $(this.mainDiv).append('<link rel="stylesheet" href="' + themedFilePath + '" type="text/css" />');
            /*var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = filePath;
            $(this.mainDiv).append(link);*/
            //this.loadCss($(this.mainDiv), filePath, (link) =>{this.styleLoaded(link)});
        };
        ;
        WidgetBase.prototype.addStyleToContentId = function (parentContainer, filePath) {
            if (parentContainer != undefined && parentContainer.id != "") {
                var themedFilePath = this.getThemedFilePath(filePath);
                $(parentContainer).append('<link rel="stylesheet" href="' + themedFilePath + '" type="text/css" />');
            }
        };
        WidgetBase.prototype.getThemedFilePath = function (filePath) {
            var themeProvider = themeProvider_1.ThemeProvider.getInstance();
            return themeProvider.getThemedFilePath(filePath);
        };
        Object.defineProperty(WidgetBase.prototype, "supportedDragDropDataIds", {
            get: function () {
                return this._supportedDragDropDataIds;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds the given dragdrop data id to this widget, and adds this widget to the WidgetsWithDropSupportProvider if not already there
         * Can only be used if the widget derives from IDroppable
         *
         * @param {string} id
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addSupportedDragDropDataId = function (id) {
            widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().addWidget(this);
            // check if already in list
            var index = this._supportedDragDropDataIds.indexOf(id);
            if (index == -1) {
                this._supportedDragDropDataIds.push(id);
            }
        };
        /**
         * Removes the given dragdrop data id from this widget, and if it is the last dragdrop data id, removes the widget from the WidgetsWithDropSupportProvider
         * Can only be used if the widget derives from IDroppable
         *
         * @param {string} id
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeSupportedDragDropDataId = function (id) {
            var index = this._supportedDragDropDataIds.indexOf(id);
            if (index != -1) {
                this._supportedDragDropDataIds.splice(index, 1);
            }
            if (this._supportedDragDropDataIds.length == 0) {
                widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().removeWidget(this);
            }
        };
        /**
         * Adds dragging support to this widget; via IDraggable the widget can provide the information which object should be dragged
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addDraggingSupport = function () {
            var _this = this;
            if (this.mainDivId == "") {
                console.error("widget main div id not set for draggable support");
                return;
            }
            var imageProvider = this.component.getSubComponent(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase.ImageProviderId);
            if (imageProvider != undefined) {
                this._defaultDropNotPossibleRepresentation = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/dropNotPossible.svg");
            }
            else {
                console.error("ImageProvider not available => Add ImageProvider sub component to this widget!");
            }
            this._draggingSupportActive = true;
            this._draggingContainer = $(this.mainDiv);
            this._draggingContainer.ejDraggable({
                distance: 10,
                helper: function (args) { return _this.draggingHelper(args); },
                dragStart: function (args) { return _this.draggingStart(args); },
                dragStop: function (args) { return _this.draggingStop(args); },
                destroy: function (args) { return _this.draggingDestroy(args); },
                drag: function (args) { return _this.draggingDrag(args); },
            });
        };
        /**
         * Removes dragging support from this widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeDraggingSupport = function () {
            this._draggingSupportActive = false;
            var ejDraggableObj = this._draggingContainer.data("ejDraggable");
            if (ejDraggableObj != undefined) {
                ejDraggableObj.destroy();
            }
        };
        /**
         * Will be called at the end of a drag&drop operation
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingDestroy = function (args) {
        };
        /**
         * Creates the temporary drag object for the drag & drop operation and adds it to the document body
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingHelper = function (args) {
            var ejDraggableObj = this._draggingContainer.data("ejDraggable");
            if (ejDraggableObj != undefined) {
                // Set drag object position (_relYposition and _relXposition are the positions within the draggable object)
                ejDraggableObj.option("cursorAt", { top: (ejDraggableObj._relYposition * -1) - 10, left: ejDraggableObj._relXposition * -1 }, true);
            }
            // Get the information of the drag object from widget
            var dragDataObject = this.startDragging();
            if (dragDataObject == undefined) {
                return;
            }
            this._dragDataObject = dragDataObject;
            this._defaultDragRepresentation = this._dragDataObject.representation;
            this._dragSymbol = $('<pre>').html(this._defaultDropNotPossibleRepresentation);
            // Adds the current data to the drag data
            this.setDragData(args, this._dragDataObject.data);
            this._dragSymbol.appendTo(document.body);
            return this._dragSymbol;
        };
        /**
         * Will be called at the beginning of a drag&drop operation
         *
         * @protected
         * @returns {(DragDropDataObject|undefined)}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.startDragging = function () {
            return undefined;
        };
        /**
         * Will be called after the drop
         *
         * @protected
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStopped = function () {
        };
        /**
         * Removes the temporary drag object after drag & drop operation
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeDragObjectFromDocument = function () {
            for (var i = document.body.childNodes.length - 1; i >= 0; i--) {
                if (document.body.childNodes[i].nodeName == "PRE") {
                    document.body.childNodes[i].remove();
                }
            }
        };
        /**
         * Will be called at start dragging
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStart = function (args) {
            var _this = this;
            var dragData = this.getDragData(args);
            if (dragData != undefined) {
                // Inform only widgets with drop support for the given dragDropDataId
                widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                    // call dragStart
                    widget.dragStart(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData, _this._defaultDragRepresentation));
                });
                return;
            }
            args.cancel = true;
        };
        /**
         * Will be called while dragging is active
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingDrag = function (args) {
            var _this = this;
            this._dropPossible = false;
            var currentDragDropElement = this._defaultDragRepresentation.clone();
            var dragData = this.getDragData(args);
            if (dragData != undefined) {
                var newWidget_1 = undefined;
                if (args.currentTarget != undefined) { // undefined if out of browser window
                    // Inform only widgets with drop support for the given dragDropDataId
                    widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                        // Only widget with currentTarget(divId) as parent should be informed
                        if (_this.isElementWithinWidget(args.currentTarget, widget.mainDivId)) {
                            newWidget_1 = widget;
                            // call dragOver
                            var dragDropArgs = new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData, currentDragDropElement);
                            var dragOverPossible = widget.dragOver(dragDropArgs);
                            if (dragOverPossible) {
                                _this._dropPossible = dragOverPossible;
                            }
                        }
                    });
                }
                if (newWidget_1 != this._currentWidget) {
                    // DragOver changed from one widget to an other
                    if (this._currentWidget != undefined) {
                        this._currentWidget.dropFocusLost(args);
                    }
                    this._currentWidget = newWidget_1;
                }
            }
            if (this._dropPossible) {
                this._dragSymbol[0].innerHTML = currentDragDropElement.getDragDropElement();
            }
            else {
                this._dragSymbol[0].innerHTML = this._defaultDropNotPossibleRepresentation;
            }
        };
        /**
         * Will be called when dragging was stopped
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStop = function (args) {
            var _this = this;
            var dragData = this.getDragData(args);
            if (this._dropPossible) {
                if (args.currentTarget != undefined) { // undefined if out of browser window
                    // Inform only widgets with drop support for the given dragDropDataId
                    widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                        // Only widget with currentTarget(divId) as parent should be informed
                        if (_this.isElementWithinWidget(args.currentTarget, widget.mainDivId)) {
                            // call drop
                            widget.drop(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData));
                        }
                    });
                }
            }
            // Inform only widgets with drop support for the given dragDropDataId
            widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                // call dragStop
                widget.dragStop(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData));
            });
            this.draggingStopped();
            this.removeDragObjectFromDocument();
        };
        WidgetBase.prototype.getDragData = function (args) {
            if (this._dragDataObject != undefined) {
                return args.element.data(this._dragDataObject.id);
            }
            return undefined;
        };
        WidgetBase.prototype.setDragData = function (args, data) {
            args.element.data(this._dragDataObject.id, data);
        };
        /**
         * Check if an element is a child of the given parent id
         *
         * @private
         * @param {*} element
         * @param {string} widgetId
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.isElementWithinWidget = function (element, widgetId) {
            var id = "#" + widgetId;
            var parent = element.closest(id);
            if (parent == null) {
                return false;
            }
            return true;
        };
        /**
         * Returns the widget for the given id if found, else undefined
         *
         * @param {string} id the widget id
         * @returns {*}
         * @memberof WidgetBase
         */
        /*public getWidgetById(id: string, recursive: boolean = false): IWidget|undefined{
            for (let key in this._widgets) {
                let foundWidget: IWidget|undefined = undefined;
                let widget = this._widgets[key];
                if(widget.id == id){
                    foundWidget = widget;
                }
                else{
                    if(recursive == true){
                        let foundChildWidget = widget.getWidgetById(id, true);
                        if(foundChildWidget != undefined){
                            foundWidget = foundChildWidget;
                        }
                    }
                }
                if(foundWidget != undefined){
                    return foundWidget;
                }
            }
            return undefined
        }*/
        //#endregion
        /*private styleLoaded(link){
            
        }
    
        private loadCss(element, url, callback){
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;
            
            element[0].appendChild(link);
        
            var img = document.createElement('img');
            img.onerror = function(){
                if(callback){
                    callback(link);
                }
            }
            img.src = url;
        }*/
        /**
         * Activate the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.activate = function () {
        };
        /**
         * Deactivate the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.deactivate = function () {
        };
        /**
         * Dispose the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.dispose = function () {
            if (this._draggingSupportActive == true) {
                this.removeDraggingSupport();
            }
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.detach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.detach(this._modelItemsChangedHandler);
            }
            // delete bindings
            componentBindings_1.ComponentBindings.unbind(this);
        };
        /**
         * Sets the busy screen information which will be shown when the busy flag true
         *
         * @param {BusyInformation} busyInformation
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setBusyInformation = function (busyInformation) {
            this._busyInformation = busyInformation;
        };
        /**
         * Set the busy flag of the WidgetBase
         *
         * @param {boolean} flag if true busy screen will be shown
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setBusy = function (flag) {
            this.busyScreenId = this.mainDivId + "_busyScreen";
            if (flag == true) {
                var commonLayoutProvider = this.component.getSubComponent(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase.CommonLayoutProviderId);
                if (commonLayoutProvider != undefined) {
                    var html = commonLayoutProvider.getBusyScreenLayout(this.busyScreenId, this._busyInformation);
                    $(this.mainDiv).parent().append(html);
                }
                else {
                    console.error("CommonLayoutProvider not available => add to sub components!");
                }
            }
            else {
                var busyDiv = $(this.mainDiv).parent().find("#" + this.busyScreenId);
                busyDiv.remove();
            }
        };
        WidgetBase.prototype.changeBusyMessage = function (newMessage) {
            var commonLayoutProvider = this.component.getSubComponent(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase.CommonLayoutProviderId);
            if (commonLayoutProvider != undefined) {
                commonLayoutProvider.changeBusyMessage(this.busyScreenId, newMessage);
            }
        };
        /**
         * Persist widget settings
         *
         * @protected
         * @memberof WidgetBase
         */
        WidgetBase.prototype.saveSettings = function () {
            this.component.saveComponentSettings();
        };
        /**
         * Resize the WidgetBase
         *
         * @param {number} width
         * @param {number} height
         * @memberof WidgetBase
         */
        WidgetBase.prototype.resize = function (width, height) {
        };
        Object.defineProperty(WidgetBase.prototype, "dataModel", {
            get: function () {
                return this._dataModel;
            },
            set: function (dataModel) {
                // Detach events from old dataModel
                this.detachDataModelEvents();
                // Set new dataModel
                this._dataModel = dataModel;
                // Attach events to new dataModel
                this.attachDataModelEvents();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * attaches the data model events
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.attachDataModelEvents = function () {
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.attach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.attach(this._modelItemsChangedHandler);
            }
        };
        /**
         * detaches the data model events
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.detachDataModelEvents = function () {
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.detach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.detach(this._modelItemsChangedHandler);
            }
        };
        WidgetBase.prototype.handleModelChanged = function (sender, data) {
        };
        WidgetBase.prototype.handleModelItemsChanged = function (sender, eventArgs) {
        };
        WidgetBase.prototype.onObservablesChanged = function (changedObservables) {
        };
        WidgetBase.WidgetSettingId = "widget";
        /**
         * Holds the last used unique div id
         *
         * @private
         * @static
         * @type {number}
         * @memberof WidgetBase
         */
        WidgetBase._uniqueDivId = 0;
        return WidgetBase;
    }());
    exports.WidgetBase = WidgetBase;
    /**
     * the class implements the null object for the data model. It is intended to be set for widgets without a real data model
     *
     * @class NullDataModel
     * @implements {IDataModel}
     */
    var NullDataModel = /** @class */ (function () {
        function NullDataModel() {
            this.eventModelChanged = new dataModelInterface_1.EventModelChanged;
            this.eventModelItemsChanged = new dataModelInterface_1.EventModelItemsChanged;
        }
        NullDataModel.prototype.observeModelItems = function (observableItems) {
        };
        NullDataModel.prototype.onModelItemsChanged = function (sender, data) {
        };
        NullDataModel.prototype.handleModelItemsChanged = function (sender, data) {
        };
        NullDataModel.prototype.initialize = function () {
        };
        NullDataModel.prototype.clear = function () {
        };
        NullDataModel.prototype.dispose = function () {
        };
        NullDataModel.prototype.getDefaultStoringData = function () {
            return undefined;
        };
        NullDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        NullDataModel.prototype.getComponentSettings = function () {
            return new componentSettings_1.ComponentSettings();
        };
        NullDataModel.prototype.setComponentSettings = function (data) {
        };
        NullDataModel.prototype.connect = function () {
        };
        NullDataModel.prototype.onModelChanged = function (sender, data) {
        };
        NullDataModel.prototype.handleModelChanged = function (sender, data) {
        };
        return NullDataModel;
    }());
    exports.NullDataModel = NullDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vd2lkZ2V0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUF1QkE7UUFzRkk7OztXQUdHO1FBQ0g7WUFBQSxpQkFFQztZQTFGUyxZQUFPLEdBQVMsSUFBSSxhQUFLLEVBQUUsQ0FBQztZQUU1QixhQUFRLEdBQXlCLElBQUksR0FBRyxFQUFtQixDQUFDO1lBNEM5RCxnQ0FBMkIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUMzRyxvQ0FBK0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUUzSCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztZQUVsQixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7WUFDbEMsZUFBVSxHQUFXLEVBQUUsQ0FBQTtZQUViLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1lBQ3pCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1lBRTFCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1lBRWpCLHFCQUFnQixHQUFvQixJQUFJLGlDQUFlLEVBQUUsQ0FBQztZQUUxRCx5QkFBb0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQU8sS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRiw4QkFBeUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQU8sS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QUEsQUF0K0JELElBcytCQztJQWlFTyxnQ0FBVTtJQS9EbEI7Ozs7O09BS0c7SUFDSDtRQUFBO1lBRUksc0JBQWlCLEdBQXNCLElBQUksc0NBQWlCLENBQUM7WUFDN0QsMkJBQXNCLEdBQTJCLElBQUksMkNBQXNCLENBQUM7UUFvRGhGLENBQUM7UUFoREcseUNBQWlCLEdBQWpCLFVBQWtCLGVBQXNCO1FBRXhDLENBQUM7UUFDRCwyQ0FBbUIsR0FBbkIsVUFBb0IsTUFBa0IsRUFBRSxJQUEyQjtRQUVuRSxDQUFDO1FBQ0QsK0NBQXVCLEdBQXZCLFVBQXdCLE1BQWtCLEVBQUUsSUFBMkI7UUFFdkUsQ0FBQztRQUlELGtDQUFVLEdBQVY7UUFFQSxDQUFDO1FBRUQsNkJBQUssR0FBTDtRQUVBLENBQUM7UUFFRCwrQkFBTyxHQUFQO1FBRUEsQ0FBQztRQUNELDZDQUFxQixHQUFyQjtZQUNJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRCwyQ0FBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELDRDQUFvQixHQUFwQjtZQUNJLE9BQU8sSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRCw0Q0FBb0IsR0FBcEIsVUFBcUIsSUFBdUI7UUFFNUMsQ0FBQztRQUVELCtCQUFPLEdBQVA7UUFFQSxDQUFDO1FBQ0Qsc0NBQWMsR0FBZCxVQUFlLE1BQWtCLEVBQUUsSUFBMkI7UUFFOUQsQ0FBQztRQUNELDBDQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLElBQTJCO1FBRWxFLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUF2REQsSUF1REM7SUF2RFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRGF0YU1vZGVsLEV2ZW50TW9kZWxDaGFuZ2VkLEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCB9IGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2UnXHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZSc7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tICcuL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSVZpZXcgfSBmcm9tICcuL2ludGVyZmFjZXMvdmlld0ludGVyZmFjZSc7XHJcbmltcG9ydCB7IElEcm9wcGFibGUgfSBmcm9tICcuL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZSc7XHJcbmltcG9ydCB7IElMYXlvdXRXaWRnZXQgfSBmcm9tICcuL2ludGVyZmFjZXMvbGF5b3V0V2lkZ2V0SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSU9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBCdXN5SW5mb3JtYXRpb24gfSBmcm9tICcuL2J1c3lJbmZvcm1hdGlvbic7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICcuL3RoZW1lUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIgfSBmcm9tICcuL3dpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlcic7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YU9iamVjdCB9IGZyb20gJy4vZHJhZ0RhdGFPYmplY3QnO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9zdG9yZSc7XHJcbmltcG9ydCB7IERyYWdEcm9wUmVwcmVzZW50YXRpb24gfSBmcm9tICcuL2RyYWdEcm9wUmVwcmVzZW50YXRpb24nO1xyXG5pbXBvcnQgeyBEcmFnRHJvcEFyZ3MgfSBmcm9tICcuL2RyYWdEcm9wQXJncyc7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tICcuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRCYXNlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZ3MgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tICcuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5ncyc7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSB9IGZyb20gJy4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlJztcclxuaW1wb3J0IHsgSUltYWdlUHJvdmlkZXIgfSBmcm9tICcuL2ludGVyZmFjZXMvaW1hZ2VQcm92aWRlckludGVyZmFjZSc7XHJcbmltcG9ydCB7IElDb21tb25MYXlvdXRQcm92aWRlciB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb21tb25MYXlvdXRQcm92aWRlckludGVyZmFjZSc7XHJcbmltcG9ydCB7IEV2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWRBcmdzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvZXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZEFyZ3MnO1xyXG5pbXBvcnQgeyBFdmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvZXZlbnRTdWJDb21wb25lbnRzTG9hZGVkQXJncyc7XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSVdpZGdldCwgSU9ic2VydmVyLCBJQ29tcG9uZW50e1xyXG4gICAgICAgXHJcbiAgICBwcm90ZWN0ZWQgX3N0YXRlczpTdG9yZSA9IG5ldyBTdG9yZSgpO1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhTW9kZWw6IElEYXRhTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgX3dpZGdldHM6IE1hcDxzdHJpbmcsIElXaWRnZXQ+ID0gbmV3IE1hcDxzdHJpbmcsIElXaWRnZXQ+KCk7XHJcbiAgICBwcml2YXRlIF92aWV3OklWaWV3fHVuZGVmaW5lZDtcclxuICAgICAgIFxyXG4gICAgcHJvdGVjdGVkIF9sYXlvdXRXaWRnZXQ6IElMYXlvdXRXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiAgSG9sZHMgdGhlIG1haW4gZGl2IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0TWFpbkRpdiE6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIGdldCBtYWluRGl2KCk6IEhUTUxEaXZFbGVtZW50e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXRNYWluRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGhlYWRlciBkaXYgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF93aWRnZXRIZWFkZXJEaXY6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBnZXQgaGVhZGVyRGl2KCk6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0SGVhZGVyRGl2O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBmb290ZXIgZGl2IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0Rm9vdGVyRGl2OiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgZ2V0IGZvb3RlckRpdigpOiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldEZvb3RlckRpdjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBXaWRnZXRTZXR0aW5nSWQgPSBcIndpZGdldFwiO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9zdWJDb21wb25lbnRzTG9hZGVkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZVN1YkNvbXBvbmVudHNMb2FkZWQoc2VuZGVyLCBldmVudEFyZ3MpIH07XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRTZXR0aW5nc0xvYWRlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVDb21wb25lbnRTZXR0aW5nc0xvYWRlZChzZW5kZXIsIGV2ZW50QXJncykgfTtcclxuICAgICAgXHJcbiAgICBidXN5U2NyZWVuSWQgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBmbGFnZ2VkRm9yUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB3aWRnZXROYW1lOiBzdHJpbmcgPSBcIlwiXHJcblxyXG4gICAgcHJvdGVjdGVkIF9hY3R1YWxXaWR0aDogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBfYWN0dWFsSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBfaGVhZGVySGVpZ2h0ID0gMDtcclxuXHRwcm90ZWN0ZWQgX2Zvb3RlckhlaWdodCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVzeUluZm9ybWF0aW9uOiBCdXN5SW5mb3JtYXRpb24gPSBuZXcgQnVzeUluZm9ybWF0aW9uKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHsgdGhpcy5oYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyLCBkYXRhKTsgfTtcclxuICAgIHByaXZhdGUgX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHsgdGhpcy5oYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXIsIGRhdGEpOyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgd2lkZ2V0cyBtYWluIGRpdiBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbWFpbkRpdklkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluRGl2LmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbXBvbmVudCBvZiB0aGlzIHdpZGdldChob2xkcyB0aGUgc2V0dGluZ3MgZm9yIHBlcnNpc3RpbmcpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0NvbXBvbmVudEJhc2V9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29tcG9uZW50ITogQ29tcG9uZW50QmFzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2lkZ2V0QmFzZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gbmV3IE51bGxEYXRhTW9kZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlldygpIDogSVZpZXd8dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBzZXQgdmlldyh2aWV3IDogSVZpZXd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgc3RhdGVzKCkgOiBTdG9yZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXcgPyB0aGlzLl92aWV3LnN0YXRlcyA6IHRoaXMuX3N0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgd2lkdGggb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGdldCB3aWR0aCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdHVhbFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBoZWlnaHQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3R1YWxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbGFzdCB1c2VkIHVuaXF1ZSBkaXYgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF91bmlxdWVEaXZJZDogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdW5pcXVlIGRpdiBpZCAoZS5nLiBDb250XzEpXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgZ2V0VW5pcXVlRGl2SWQoKTogc3RyaW5ne1xyXG4gICAgICAgIFdpZGdldEJhc2UuX3VuaXF1ZURpdklkKys7XHJcbiAgICAgICAgbGV0IGlkID0gV2lkZ2V0QmFzZS5fdW5pcXVlRGl2SWQudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gXCJDb250X1wiICsgaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVXaXRoSWQoV2lkZ2V0QmFzZS5nZXRVbmlxdWVEaXZJZCgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSB3aWRnZXQgd2l0aCB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpdklkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVXaXRoSWQoZGl2SWQ6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBuZWVkZWQgZGl2c1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRGl2cyhkaXZJZCk7XHJcbiAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBkaXZzIHRvIGRvY3VtZW50IGJvZHkgKG90aGVyd2lzZSBzeW5jZnVzaW9uIGNhbiBub3QgaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0cyBjb3JyZWN0KVxyXG4gICAgICAgIHRoaXMuYWRkVG9Eb2N1bWVudHNUZW1wKCk7XHJcblxyXG4gICAgICAgIC8vIExvYWQgc3R5bGVzXHJcbiAgICAgICAgdGhpcy5sb2FkU3R5bGVzKCk7XHJcblxyXG4gICAgICAgIC8vIExvYWQgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZXZlbnRTdWJDb21wb25lbnRzTG9hZGVkLmF0dGFjaCh0aGlzLl9zdWJDb21wb25lbnRzTG9hZGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZC5hdHRhY2godGhpcy5fY29tcG9uZW50U2V0dGluZ3NMb2FkZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5sb2FkQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5ldmVudFN1YkNvbXBvbmVudHNMb2FkZWQuZGV0YWNoKHRoaXMuX3N1YkNvbXBvbmVudHNMb2FkZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5ldmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkLmRldGFjaCh0aGlzLl9jb21wb25lbnRTZXR0aW5nc0xvYWRlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbWFpbiBkaXYgYW5kIGlmIG5lZWRlZCBoZWFkZXIgYW5kIGZvb3RlciBkaXZzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXZJZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEaXZzKGRpdklkOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIENyZWF0ZSB3aWRnZXQgbWFpbiBkaXYgYXQgZmlyc3QgdG8gZGVmaW5lIHRoZSBtYWluRGl2SWRcclxuICAgICAgICB0aGlzLl93aWRnZXRNYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLl93aWRnZXRNYWluRGl2LmlkID0gZGl2SWQ7XHJcblxyXG4gICAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IHRoaXMuZGVmaW5lSGVhZGVySGVpZ2h0KCk7XHJcbiAgICAgICAgaWYodGhpcy5faGVhZGVySGVpZ2h0ICE9IDApe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUhlYWRlckRpdigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9mb290ZXJIZWlnaHQgPSB0aGlzLmRlZmluZUZvb3RlckhlaWdodCgpO1xyXG4gICAgICAgIGlmKHRoaXMuX2Zvb3RlckhlaWdodCAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb290ZXJEaXYoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgd2hpY2ggdGhlIGhlYWRlciBzaG91bGQgaGF2ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGhlaWdodCB3aGljaCB0aGUgZm9vdGVyIHNob3VsZCBoYXZlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGRlZmluZUZvb3RlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzKG1vdmVzKSB0aGUgZGl2IGNvbnRhaW5lcnMgb2YgdGhpcyB3aWRnZXQgdG8gdGhlIGRvY3VtZW50KG5lZWRlZCBmb3IgY29ycmVjdCBiZWhhdmlvciBvZiB0aGUgc3luY2Z1c2lvbiB3aWRnZXQgYmVjYXVzZSB0aGV5IGFyZSBsb29raW5nIGludG8gdGhlIGRvY3VtZW50KVxyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRUb0RvY3VtZW50c1RlbXAoKXtcclxuICAgICAgICBjb25zdCB3aWRnZXRUZW1wRGl2SWQgPSBcIndpZGdldFRlbXBcIjtcclxuICAgICAgICAvLyBjcmVhdGUgZG9jdW1lbnQgYm9keSB3aWRnZXRUZW1wIGNvbnRhaW5lciBpZiBub3QgYWxyZWFkeSBhdmFpbGFibGUgLi4uXHJcbiAgICAgICAgbGV0IHdpZGdldFRlbXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh3aWRnZXRUZW1wRGl2SWQpO1xyXG4gICAgICAgIGlmKHdpZGdldFRlbXBEaXYgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHdpZGdldFRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICB3aWRnZXRUZW1wRGl2LmlkID0gd2lkZ2V0VGVtcERpdklkO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdpZGdldFRlbXBEaXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLi4uIGFuZCBhZGQgdGhlIGRpdnMgb2YgdGhpcyB3aWRnZXRcclxuICAgICAgICBpZih0aGlzLmhlYWRlckRpdiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB3aWRnZXRUZW1wRGl2LmFwcGVuZENoaWxkKHRoaXMuaGVhZGVyRGl2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2lkZ2V0VGVtcERpdi5hcHBlbmRDaGlsZCh0aGlzLm1haW5EaXYpO1xyXG5cdFx0aWYodGhpcy5mb290ZXJEaXYgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0d2lkZ2V0VGVtcERpdi5hcHBlbmRDaGlsZCh0aGlzLmZvb3RlckRpdik7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGhlYWRlciBkaXZcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVhZGVySGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSGVhZGVyRGl2KCl7XHJcblx0XHRsZXQgaGVhZGVyQ29udGFpbmVySWQgPSB0aGlzLm1haW5EaXZJZCArIFwiX2hlYWRlclwiO1xyXG4gICAgICAgIHRoaXMuX3dpZGdldEhlYWRlckRpdiA9IHRoaXMuY3JlYXRlRGl2KGhlYWRlckNvbnRhaW5lcklkLCBcIndpZGdldEhlYWRlclwiLCB0aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgbmV3IGZvb3RlciBkaXZcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZm9vdGVySGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlRm9vdGVyRGl2KCl7XHJcblx0XHRsZXQgZm9vdGVyQ29udGFpbmVySWQgPSB0aGlzLm1haW5EaXZJZCArIFwiX2Zvb3RlclwiO1xyXG4gICAgICAgIHRoaXMuX3dpZGdldEZvb3RlckRpdiA9IHRoaXMuY3JlYXRlRGl2KGZvb3RlckNvbnRhaW5lcklkLCBcIndpZGdldEZvb3RlclwiLCB0aGlzLl9mb290ZXJIZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGRpdiB3aXRoIHRoZSBnaXZlbiBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEaXYoaWQ6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcsIGhlaWdodDogbnVtYmVyKTogSFRNTERpdkVsZW1lbnR7XHJcbiAgICAgICAgbGV0IG5ld0hlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbmV3SGVhZGVyRGl2LmlkID0gaWQ7XHJcbiAgICAgICAgbmV3SGVhZGVyRGl2LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICBuZXdIZWFkZXJEaXYuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgcmV0dXJuIG5ld0hlYWRlckRpdjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBkaXYgY29udGFpbmVycyhoZWFkZXIsIG1haW4sIGZvb3RlciwgLi4uKSBvZiB0aGlzIHdpZGdldCB0byB0aGUgZ2l2ZW4gcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZCl9IHBhcmVudENvbnRhaW5lclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRUb1BhcmVudENvbnRhaW5lcihwYXJlbnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZCl7XHJcblx0XHRpZihwYXJlbnRDb250YWluZXIgPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBoZWFkZXJcclxuXHRcdGlmKHRoaXMuX3dpZGdldEhlYWRlckRpdiAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRwYXJlbnRDb250YWluZXIuYXBwZW5kKHRoaXMuX3dpZGdldEhlYWRlckRpdik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIG1haW5cclxuXHRcdHBhcmVudENvbnRhaW5lci5hcHBlbmQodGhpcy5tYWluRGl2KTtcclxuXHJcblx0XHQvLyBBZGQgZm9vdGVyXHJcblx0XHRpZih0aGlzLl93aWRnZXRGb290ZXJEaXYgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cGFyZW50Q29udGFpbmVyLmFwcGVuZCh0aGlzLl93aWRnZXRGb290ZXJEaXYpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWRkVG9QYXJlbnRDb250YWluZXJJZChwYXJlbnRDb250YWluZXJJZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgcGFyZW50Q29udGFpbmVyID0gPEhUTUxEaXZFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRDb250YWluZXJJZCk7XHJcbiAgICAgICAgaWYocGFyZW50Q29udGFpbmVyICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRvUGFyZW50Q29udGFpbmVyKHBhcmVudENvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgc3ViIGNvbXBvbmVudCBsb2FkZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJhc2V9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBldmVudGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZVN1YkNvbXBvbmVudHNMb2FkZWQoc2VuZGVyOiBDb21wb25lbnRCYXNlLCBldmVudGFyZ3M6IEV2ZW50U3ViQ29tcG9uZW50c0xvYWRlZEFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyBsb2FkZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJhc2V9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBldmVudGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUNvbXBvbmVudFNldHRpbmdzTG9hZGVkKHNlbmRlcjogQ29tcG9uZW50QmFzZSwgZXZlbnRhcmdzOiBFdmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkQXJncyl7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCgpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldEJpbmRpbmdzRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVpbml0aWFsaXplcyB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICByZWluaXRpYWxpemUoKTp2b2lkIHtcclxuICAgICAgICAvLyBnZXQgY3VycmVudCBkaXYgaWRcclxuICAgICAgICBsZXQgY3VycmVudElkID0gdGhpcy5tYWluRGl2SWQ7XHJcbiAgICAgICAgLy8gZW1wdHkgY3VycmVudCB3aXJkZ2V0IGRpdlxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lbXB0eSgpO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgd2lkZ2V0IHdpdGggdGhlIGFscmVhZHkgdXNlZCBkaXYgaWRcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVXaXRoSWQoY3VycmVudElkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGFmdGVyIGluaXRpYWxpemF0aW9uKHdoZW4gbG9hZGluZyBwZXJzaXN0aW5nIGRhdGEgd2FzIGRvbmUpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKTp2b2lkIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhlIGNvbXBvbmVudCBwYXJ0cyBoZXJlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgaWQgZm9yIHRoZSBkZWZhdWx0IHNldHRpbmdzIGRhdGEgd2hpY2ggc2hvdWxkIGJlIHVzZWQgaWYgbm8gcGVyc2lzdGluZyBkYXRhIGlzIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0U2V0dGluZ3NEYXRhSWRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NEYXRhSWQoZGVmYXVsdFNldHRpbmdzRGF0YUlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBkZWZhdWx0U2V0dGluZ3NEYXRhSWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2V0dGluZ3Mgb2YgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcbiAgICB9XHJcbiBcclxuICAgICAvKipcclxuICAgICAgKiBTZXRzIHNldHRpbmdzIHRvIHRoaXMgY29tcG9uZW50XHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0geyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfSBzZXR0aW5nc1xyXG4gICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoc2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGNvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGF0dGFjaExheW91dFRvVmlldyhwYXJlbnRWaWV3OklWaWV3fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCB2aWV3ID0gcGFyZW50VmlldyA/IHBhcmVudFZpZXcgOiB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBpZiAodmlldyAmJiB0aGlzLl9sYXlvdXRXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LnZpZXcgPSB2aWV3O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogc2V0cyB0aGUgaGVhZGVyIGNvbnRlbnQgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuXHRzZXRIZWFkZXJDb250ZW50KGNvbnRlbnQ6c3RyaW5nKXtcclxuXHRcdGlmKHRoaXMuX3dpZGdldEhlYWRlckRpdiAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHR0aGlzLl93aWRnZXRIZWFkZXJEaXYuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogc2V0cyB0aGUgZm9vdGVyIGNvbnRlbnQgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuXHRzZXRGb290ZXJDb250ZW50KGNvbnRlbnQ6c3RyaW5nKXtcclxuXHRcdGlmKHRoaXMuX3dpZGdldEZvb3RlckRpdiAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHR0aGlzLl93aWRnZXRGb290ZXJEaXYuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHRcdH1cclxuXHR9ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKXtcclxuXHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBzdHlsZXMgZm9yIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgLy90aGlzLnN0eWxlTG9hZGVkKHVuZGVmaW5lZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZFN0eWxlKGZpbGVQYXRoOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCB0aGVtZWRGaWxlUGF0aCA9IHRoaXMuZ2V0VGhlbWVkRmlsZVBhdGgoZmlsZVBhdGgpO1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5hcHBlbmQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiJyArIHRoZW1lZEZpbGVQYXRoICsgJ1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+Jyk7XHJcbiAgICAgICAgLyp2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gICAgICAgIGxpbmsuaHJlZiA9IGZpbGVQYXRoO1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5hcHBlbmQobGluayk7Ki9cclxuICAgICAgICAvL3RoaXMubG9hZENzcygkKHRoaXMubWFpbkRpdiksIGZpbGVQYXRoLCAobGluaykgPT57dGhpcy5zdHlsZUxvYWRlZChsaW5rKX0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGRTdHlsZVRvQ29udGVudElkKHBhcmVudENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnR8dW5kZWZpbmVkLCBmaWxlUGF0aDogc3RyaW5nKXtcclxuICAgICAgICBpZihwYXJlbnRDb250YWluZXIgIT0gdW5kZWZpbmVkICYmIHBhcmVudENvbnRhaW5lci5pZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgbGV0IHRoZW1lZEZpbGVQYXRoID0gdGhpcy5nZXRUaGVtZWRGaWxlUGF0aChmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICQocGFyZW50Q29udGFpbmVyKS5hcHBlbmQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiJyArIHRoZW1lZEZpbGVQYXRoICsgJ1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFRoZW1lZEZpbGVQYXRoKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRoZW1lUHJvdmlkZXIgPSBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoZW1lUHJvdmlkZXIuZ2V0VGhlbWVkRmlsZVBhdGgoZmlsZVBhdGgpO1xyXG4gICAgfVxyXG5cclxuLy8jcmVnaW9uIERyb3Agc3VwcG9ydFxyXG4gICAgcHJpdmF0ZSBfc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzID0gbmV3IEFycmF5PHN0cmluZz4oKTsgLy9lLmcuIFNpZ25hbCwgLi5cclxuICAgIHB1YmxpYyBnZXQgc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHM7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIGRyYWdkcm9wIGRhdGEgaWQgdG8gdGhpcyB3aWRnZXQsIGFuZCBhZGRzIHRoaXMgd2lkZ2V0IHRvIHRoZSBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIgaWYgbm90IGFscmVhZHkgdGhlcmVcclxuICAgICAqIENhbiBvbmx5IGJlIHVzZWQgaWYgdGhlIHdpZGdldCBkZXJpdmVzIGZyb20gSURyb3BwYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgYWRkU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmFkZFdpZGdldCg8YW55PnRoaXMgYXMgSURyb3BwYWJsZSk7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmKGluZGV4ID09IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzLnB1c2goaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIGRyYWdkcm9wIGRhdGEgaWQgZnJvbSB0aGlzIHdpZGdldCwgYW5kIGlmIGl0IGlzIHRoZSBsYXN0IGRyYWdkcm9wIGRhdGEgaWQsIHJlbW92ZXMgdGhlIHdpZGdldCBmcm9tIHRoZSBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXJcclxuICAgICAqIENhbiBvbmx5IGJlIHVzZWQgaWYgdGhlIHdpZGdldCBkZXJpdmVzIGZyb20gSURyb3BwYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZihpbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVXaWRnZXQoPGFueT50aGlzIGFzIElEcm9wcGFibGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuLy8jcmVnaW9uIGRyYWcgc3VwcG9ydFxyXG4gICAgcHJpdmF0ZSBfZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9kcmFnZ2luZ1N1cHBvcnRBY3RpdmUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2RyYWdnaW5nQ29udGFpbmVyO1xyXG4gICAgcHJpdmF0ZSBfZHJhZ0RhdGFPYmplY3QhOiBEcmFnRHJvcERhdGFPYmplY3Q7XHJcbiAgICBwcml2YXRlIF9kcmFnU3ltYm9sO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdERyYWdSZXByZXNlbnRhdGlvbiE6IERyYWdEcm9wUmVwcmVzZW50YXRpb247XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0RHJvcE5vdFBvc3NpYmxlUmVwcmVzZW50YXRpb246c3RyaW5nID0gXCJcIjtcclxuICAgIFxyXG5cdC8qKlxyXG4gICAgICogQWRkcyBkcmFnZ2luZyBzdXBwb3J0IHRvIHRoaXMgd2lkZ2V0OyB2aWEgSURyYWdnYWJsZSB0aGUgd2lkZ2V0IGNhbiBwcm92aWRlIHRoZSBpbmZvcm1hdGlvbiB3aGljaCBvYmplY3Qgc2hvdWxkIGJlIGRyYWdnZWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRHJhZ2dpbmdTdXBwb3J0KCl7XHJcbiAgICAgICAgaWYodGhpcy5tYWluRGl2SWQgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ3aWRnZXQgbWFpbiBkaXYgaWQgbm90IHNldCBmb3IgZHJhZ2dhYmxlIHN1cHBvcnRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGltYWdlUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7IFxyXG4gICAgICAgIGlmKGltYWdlUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdERyb3BOb3RQb3NzaWJsZVJlcHJlc2VudGF0aW9uID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvZHJvcE5vdFBvc3NpYmxlLnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkltYWdlUHJvdmlkZXIgbm90IGF2YWlsYWJsZSA9PiBBZGQgSW1hZ2VQcm92aWRlciBzdWIgY29tcG9uZW50IHRvIHRoaXMgd2lkZ2V0IVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nU3VwcG9ydEFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdDb250YWluZXIgPSAkKHRoaXMubWFpbkRpdik7XHJcblxyXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nQ29udGFpbmVyLmVqRHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgZGlzdGFuY2U6IDEwLFxyXG5cclxuICAgICAgICAgICAgaGVscGVyOiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ0hlbHBlcihhcmdzKSxcclxuICAgICAgICAgICAgZHJhZ1N0YXJ0OiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ1N0YXJ0KGFyZ3MpLFxyXG4gICAgICAgICAgICBkcmFnU3RvcDogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdTdG9wKGFyZ3MpLFxyXG4gICAgICAgICAgICBkZXN0cm95OiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ0Rlc3Ryb3koYXJncyksXHJcbiAgICAgICAgICAgIGRyYWc6IChhcmdzKSA9PiB0aGlzLmRyYWdnaW5nRHJhZyhhcmdzKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgZHJhZ2dpbmcgc3VwcG9ydCBmcm9tIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZURyYWdnaW5nU3VwcG9ydCgpe1xyXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nU3VwcG9ydEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBlakRyYWdnYWJsZU9iaiA9IHRoaXMuX2RyYWdnaW5nQ29udGFpbmVyLmRhdGEoXCJlakRyYWdnYWJsZVwiKTtcclxuICAgICAgICBpZihlakRyYWdnYWJsZU9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBlakRyYWdnYWJsZU9iai5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHRoZSBlbmQgb2YgYSBkcmFnJmRyb3Agb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0Rlc3Ryb3koYXJncyl7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRlbXBvcmFyeSBkcmFnIG9iamVjdCBmb3IgdGhlIGRyYWcgJiBkcm9wIG9wZXJhdGlvbiBhbmQgYWRkcyBpdCB0byB0aGUgZG9jdW1lbnQgYm9keVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyYWdnaW5nSGVscGVyKGFyZ3MpIHtcclxuICAgICAgICB2YXIgZWpEcmFnZ2FibGVPYmogPSB0aGlzLl9kcmFnZ2luZ0NvbnRhaW5lci5kYXRhKFwiZWpEcmFnZ2FibGVcIik7XHJcbiAgICAgICAgaWYoZWpEcmFnZ2FibGVPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGRyYWcgb2JqZWN0IHBvc2l0aW9uIChfcmVsWXBvc2l0aW9uIGFuZCBfcmVsWHBvc2l0aW9uIGFyZSB0aGUgcG9zaXRpb25zIHdpdGhpbiB0aGUgZHJhZ2dhYmxlIG9iamVjdClcclxuICAgICAgICAgICAgZWpEcmFnZ2FibGVPYmoub3B0aW9uKFwiY3Vyc29yQXRcIiwgeyB0b3A6ICggZWpEcmFnZ2FibGVPYmouX3JlbFlwb3NpdGlvbiotMSktMTAsIGxlZnQ6ICBlakRyYWdnYWJsZU9iai5fcmVsWHBvc2l0aW9uKi0xIH0sIHRydWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEdldCB0aGUgaW5mb3JtYXRpb24gb2YgdGhlIGRyYWcgb2JqZWN0IGZyb20gd2lkZ2V0XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhT2JqZWN0ID0gdGhpcy5zdGFydERyYWdnaW5nKCk7XHJcbiAgICAgICAgaWYoZHJhZ0RhdGFPYmplY3QgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kcmFnRGF0YU9iamVjdCA9IGRyYWdEYXRhT2JqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLl9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uID0gdGhpcy5fZHJhZ0RhdGFPYmplY3QucmVwcmVzZW50YXRpb247XHJcbiAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbCA9ICQoJzxwcmU+JykuaHRtbCh0aGlzLl9kZWZhdWx0RHJvcE5vdFBvc3NpYmxlUmVwcmVzZW50YXRpb24pO1xyXG5cclxuICAgICAgICAvLyBBZGRzIHRoZSBjdXJyZW50IGRhdGEgdG8gdGhlIGRyYWcgZGF0YVxyXG4gICAgICAgIHRoaXMuc2V0RHJhZ0RhdGEoYXJncywgdGhpcy5fZHJhZ0RhdGFPYmplY3QuZGF0YSlcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbC5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ1N5bWJvbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSBkcmFnJmRyb3Agb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhEcmFnRHJvcERhdGFPYmplY3R8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGFydERyYWdnaW5nKCk6RHJhZ0Ryb3BEYXRhT2JqZWN0fHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGRyb3BcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZHJhZ2dpbmdTdG9wcGVkKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHRlbXBvcmFyeSBkcmFnIG9iamVjdCBhZnRlciBkcmFnICYgZHJvcCBvcGVyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVEcmFnT2JqZWN0RnJvbURvY3VtZW50KCkgeyAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzW2ldLm5vZGVOYW1lID09IFwiUFJFXCIpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzW2ldLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHN0YXJ0IGRyYWdnaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdTdGFydChhcmdzKSB7XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhID0gdGhpcy5nZXREcmFnRGF0YShhcmdzKTtcclxuICAgICAgICBpZihkcmFnRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBJbmZvcm0gb25seSB3aWRnZXRzIHdpdGggZHJvcCBzdXBwb3J0IGZvciB0aGUgZ2l2ZW4gZHJhZ0Ryb3BEYXRhSWRcclxuICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFnU3RhcnRcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kcmFnU3RhcnQobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhLCB0aGlzLl9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uKSk7XHJcbiAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgd2hpbGUgZHJhZ2dpbmcgaXMgYWN0aXZlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0RyYWcoYXJncykge1xyXG4gICAgICAgIHRoaXMuX2Ryb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RHJhZ0Ryb3BFbGVtZW50ID0gdGhpcy5fZGVmYXVsdERyYWdSZXByZXNlbnRhdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIGxldCBkcmFnRGF0YSA9IHRoaXMuZ2V0RHJhZ0RhdGEoYXJncyk7XHJcbiAgICAgICAgaWYoZHJhZ0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG5ld1dpZGdldDogSURyb3BwYWJsZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuY3VycmVudFRhcmdldCAhPSB1bmRlZmluZWQpeyAvLyB1bmRlZmluZWQgaWYgb3V0IG9mIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEluZm9ybSBvbmx5IHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnQgZm9yIHRoZSBnaXZlbiBkcmFnRHJvcERhdGFJZFxyXG4gICAgICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgd2lkZ2V0IHdpdGggY3VycmVudFRhcmdldChkaXZJZCkgYXMgcGFyZW50IHNob3VsZCBiZSBpbmZvcm1lZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNFbGVtZW50V2l0aGluV2lkZ2V0KGFyZ3MuY3VycmVudFRhcmdldCwgd2lkZ2V0Lm1haW5EaXZJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXaWRnZXQgPSB3aWRnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIGRyYWdPdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkcmFnRHJvcEFyZ3MgPSBuZXcgRHJhZ0Ryb3BBcmdzKGFyZ3MuY3VycmVudFRhcmdldCwgZHJhZ0RhdGEsIGN1cnJlbnREcmFnRHJvcEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHJhZ092ZXJQb3NzaWJsZSA9IHdpZGdldC5kcmFnT3ZlcihkcmFnRHJvcEFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkcmFnT3ZlclBvc3NpYmxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Ryb3BQb3NzaWJsZSA9IGRyYWdPdmVyUG9zc2libGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICBpZihuZXdXaWRnZXQgIT0gdGhpcy5fY3VycmVudFdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICAvLyBEcmFnT3ZlciBjaGFuZ2VkIGZyb20gb25lIHdpZGdldCB0byBhbiBvdGhlclxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY3VycmVudFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXQuZHJvcEZvY3VzTG9zdChhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXQgPSBuZXdXaWRnZXQ7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2Ryb3BQb3NzaWJsZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTeW1ib2xbMF0uaW5uZXJIVE1MID0gY3VycmVudERyYWdEcm9wRWxlbWVudC5nZXREcmFnRHJvcEVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbFswXS5pbm5lckhUTUwgPSB0aGlzLl9kZWZhdWx0RHJvcE5vdFBvc3NpYmxlUmVwcmVzZW50YXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgd2hlbiBkcmFnZ2luZyB3YXMgc3RvcHBlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdTdG9wKGFyZ3MpIHtcclxuICAgICAgICBsZXQgZHJhZ0RhdGEgPSB0aGlzLmdldERyYWdEYXRhKGFyZ3MpO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9kcm9wUG9zc2libGUpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmN1cnJlbnRUYXJnZXQgIT0gdW5kZWZpbmVkICl7ICAvLyB1bmRlZmluZWQgaWYgb3V0IG9mIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICAvLyBJbmZvcm0gb25seSB3aWRnZXRzIHdpdGggZHJvcCBzdXBwb3J0IGZvciB0aGUgZ2l2ZW4gZHJhZ0Ryb3BEYXRhSWRcclxuICAgICAgICAgICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFdpZGdldHNXaXRoRHJhZ0Ryb3BEYXRhSWQodGhpcy5fZHJhZ0RhdGFPYmplY3QuaWQpLmZvckVhY2god2lkZ2V0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHdpZGdldCB3aXRoIGN1cnJlbnRUYXJnZXQoZGl2SWQpIGFzIHBhcmVudCBzaG91bGQgYmUgaW5mb3JtZWRcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzRWxlbWVudFdpdGhpbldpZGdldChhcmdzLmN1cnJlbnRUYXJnZXQsIHdpZGdldC5tYWluRGl2SWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCBkcm9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5kcm9wKG5ldyBEcmFnRHJvcEFyZ3MoYXJncy5jdXJyZW50VGFyZ2V0LCBkcmFnRGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbmZvcm0gb25seSB3aWRnZXRzIHdpdGggZHJvcCBzdXBwb3J0IGZvciB0aGUgZ2l2ZW4gZHJhZ0Ryb3BEYXRhSWRcclxuICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRXaWRnZXRzV2l0aERyYWdEcm9wRGF0YUlkKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkKS5mb3JFYWNoKHdpZGdldCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNhbGwgZHJhZ1N0b3BcclxuICAgICAgICAgICAgd2lkZ2V0LmRyYWdTdG9wKG5ldyBEcmFnRHJvcEFyZ3MoYXJncy5jdXJyZW50VGFyZ2V0LCBkcmFnRGF0YSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmRyYWdnaW5nU3RvcHBlZCgpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRHJhZ09iamVjdEZyb21Eb2N1bWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RHJhZ0RhdGEoYXJnczogYW55KTogYW55e1xyXG4gICAgICAgIGlmKHRoaXMuX2RyYWdEYXRhT2JqZWN0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmVsZW1lbnQuZGF0YSh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXREcmFnRGF0YShhcmdzOiBhbnksIGRhdGE6IGFueSl7XHJcbiAgICAgICAgYXJncy5lbGVtZW50LmRhdGEodGhpcy5fZHJhZ0RhdGFPYmplY3QuaWQsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgYW4gZWxlbWVudCBpcyBhIGNoaWxkIG9mIHRoZSBnaXZlbiBwYXJlbnQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gd2lkZ2V0SWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaXNFbGVtZW50V2l0aGluV2lkZ2V0KGVsZW1lbnQsIHdpZGdldElkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBpZCA9IFwiI1wiICsgd2lkZ2V0SWQ7XHJcbiAgICAgICAgbGV0IHBhcmVudCA9IGVsZW1lbnQuY2xvc2VzdChpZCk7XHJcbiAgICAgICAgaWYocGFyZW50ID09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgd2lkZ2V0IGZvciB0aGUgZ2l2ZW4gaWQgaWYgZm91bmQsIGVsc2UgdW5kZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSB3aWRnZXQgaWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgLypwdWJsaWMgZ2V0V2lkZ2V0QnlJZChpZDogc3RyaW5nLCByZWN1cnNpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IElXaWRnZXR8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl93aWRnZXRzKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZFdpZGdldDogSVdpZGdldHx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl93aWRnZXRzW2tleV07XHJcbiAgICAgICAgICAgIGlmKHdpZGdldC5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICBmb3VuZFdpZGdldCA9IHdpZGdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYocmVjdXJzaXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZENoaWxkV2lkZ2V0ID0gd2lkZ2V0LmdldFdpZGdldEJ5SWQoaWQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvdW5kQ2hpbGRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRXaWRnZXQgPSBmb3VuZENoaWxkV2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihmb3VuZFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kV2lkZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH0qL1xyXG5cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvKnByaXZhdGUgc3R5bGVMb2FkZWQobGluayl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQ3NzKGVsZW1lbnQsIHVybCwgY2FsbGJhY2spe1xyXG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVsZW1lbnRbMF0uYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICBcclxuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhsaW5rKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGUgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFjdGl2YXRlIHRoZSBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fZHJhZ2dpbmdTdXBwb3J0QWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZURyYWdnaW5nU3VwcG9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQuZGV0YWNoKHRoaXMuX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBkZWxldGUgYmluZGluZ3NcclxuICAgICAgICBDb21wb25lbnRCaW5kaW5ncy51bmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBidXN5IHNjcmVlbiBpbmZvcm1hdGlvbiB3aGljaCB3aWxsIGJlIHNob3duIHdoZW4gdGhlIGJ1c3kgZmxhZyB0cnVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCdXN5SW5mb3JtYXRpb259IGJ1c3lJbmZvcm1hdGlvblxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgc2V0QnVzeUluZm9ybWF0aW9uKGJ1c3lJbmZvcm1hdGlvbjogQnVzeUluZm9ybWF0aW9uKXtcclxuICAgICAgICB0aGlzLl9idXN5SW5mb3JtYXRpb24gPSBidXN5SW5mb3JtYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGJ1c3kgZmxhZyBvZiB0aGUgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZmxhZyBpZiB0cnVlIGJ1c3kgc2NyZWVuIHdpbGwgYmUgc2hvd25cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHNldEJ1c3koZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5idXN5U2NyZWVuSWQgPSB0aGlzLm1haW5EaXZJZCArIFwiX2J1c3lTY3JlZW5cIjtcclxuICAgICAgICBpZihmbGFnID09IHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgY29tbW9uTGF5b3V0UHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlLkNvbW1vbkxheW91dFByb3ZpZGVySWQpIGFzIElDb21tb25MYXlvdXRQcm92aWRlcjtcclxuICAgICAgICAgICAgaWYoY29tbW9uTGF5b3V0UHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBodG1sID0gY29tbW9uTGF5b3V0UHJvdmlkZXIuZ2V0QnVzeVNjcmVlbkxheW91dCh0aGlzLmJ1c3lTY3JlZW5JZCwgdGhpcy5fYnVzeUluZm9ybWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICQodGhpcy5tYWluRGl2KS5wYXJlbnQoKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21tb25MYXlvdXRQcm92aWRlciBub3QgYXZhaWxhYmxlID0+IGFkZCB0byBzdWIgY29tcG9uZW50cyFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGJ1c3lEaXYgPSAkKHRoaXMubWFpbkRpdikucGFyZW50KCkuZmluZChcIiNcIit0aGlzLmJ1c3lTY3JlZW5JZCk7XHJcbiAgICAgICAgICAgIGJ1c3lEaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUJ1c3lNZXNzYWdlKG5ld01lc3NhZ2U6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGNvbW1vbkxheW91dFByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZS5Db21tb25MYXlvdXRQcm92aWRlcklkKSBhcyBJQ29tbW9uTGF5b3V0UHJvdmlkZXI7XHJcbiAgICAgICAgaWYoY29tbW9uTGF5b3V0UHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29tbW9uTGF5b3V0UHJvdmlkZXIuY2hhbmdlQnVzeU1lc3NhZ2UodGhpcy5idXN5U2NyZWVuSWQsIG5ld01lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBlcnNpc3Qgd2lkZ2V0IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNhdmVTZXR0aW5ncygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSB0aGUgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGFNb2RlbCgpOklEYXRhTW9kZWx7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGF0YU1vZGVsKGRhdGFNb2RlbDogSURhdGFNb2RlbCl7XHJcbiAgICAgICAgLy8gRGV0YWNoIGV2ZW50cyBmcm9tIG9sZCBkYXRhTW9kZWxcclxuICAgICAgICB0aGlzLmRldGFjaERhdGFNb2RlbEV2ZW50cygpO1xyXG4gICAgICAgIC8vIFNldCBuZXcgZGF0YU1vZGVsXHJcbiAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gZGF0YU1vZGVsO1xyXG4gICAgICAgIC8vIEF0dGFjaCBldmVudHMgdG8gbmV3IGRhdGFNb2RlbFxyXG4gICAgICAgIHRoaXMuYXR0YWNoRGF0YU1vZGVsRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhdHRhY2hlcyB0aGUgZGF0YSBtb2RlbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fbW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5ldmVudE1vZGVsSXRlbXNDaGFuZ2VkLmF0dGFjaCh0aGlzLl9tb2RlbEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXRhY2hlcyB0aGUgZGF0YSBtb2RlbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fbW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5ldmVudE1vZGVsSXRlbXNDaGFuZ2VkLmRldGFjaCh0aGlzLl9tb2RlbEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogYW55LCBkYXRhOiBhbnkpOiBhbnkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uT2JzZXJ2YWJsZXNDaGFuZ2VkKGNoYW5nZWRPYnNlcnZhYmxlczogT2JzZXJ2YWJsZVtdKSB7XHJcbiBcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG4vKipcclxuICogdGhlIGNsYXNzIGltcGxlbWVudHMgdGhlIG51bGwgb2JqZWN0IGZvciB0aGUgZGF0YSBtb2RlbC4gSXQgaXMgaW50ZW5kZWQgdG8gYmUgc2V0IGZvciB3aWRnZXRzIHdpdGhvdXQgYSByZWFsIGRhdGEgbW9kZWxcclxuICpcclxuICogQGNsYXNzIE51bGxEYXRhTW9kZWxcclxuICogQGltcGxlbWVudHMge0lEYXRhTW9kZWx9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTnVsbERhdGFNb2RlbCBpbXBsZW1lbnRzIElEYXRhTW9kZWx7XHJcblxyXG4gICAgZXZlbnRNb2RlbENoYW5nZWQ6IEV2ZW50TW9kZWxDaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkOyBcclxuICAgIGV2ZW50TW9kZWxJdGVtc0NoYW5nZWQ6IEV2ZW50TW9kZWxJdGVtc0NoYW5nZWQgPSBuZXcgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZDsgXHJcbiAgICAgICAgXHJcbiAgICBwdWJsaWMgY29tcG9uZW50ITogQ29tcG9uZW50QmFzZTtcclxuXHJcbiAgICBvYnNlcnZlTW9kZWxJdGVtcyhvYnNlcnZhYmxlSXRlbXM6IGFueVtdKSB7XHJcblxyXG4gICAgfVxyXG4gICAgb25Nb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG5cclxuICAgIH1cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiBcclxuICAgIH1cclxuXHJcblxyXG4gICAgZGF0YTphbnkgOyAgICBkYXRhU291cmNlO1xyXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsZWFyKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuXHJcbiAgICB9XHJcbiAgICBnZXREZWZhdWx0U3RvcmluZ0RhdGEoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0KCk6IHZvaWQge1xyXG4gICBcclxuICAgIH1cclxuICAgIG9uTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiBcclxuICAgIH1cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gIFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1dpZGdldEJhc2V9OyJdfQ==
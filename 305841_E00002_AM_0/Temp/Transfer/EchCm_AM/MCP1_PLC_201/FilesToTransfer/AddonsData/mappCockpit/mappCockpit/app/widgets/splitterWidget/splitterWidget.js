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
define(["require", "exports", "../common/layoutWidgetBase", "./layoutPane", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./splitterPaneDefinition", "./splitterDefinition", "../../common/componentFactory/componentDefinition", "../common/widgetBase", "../common/paneProperties"], function (require, exports, layoutWidgetBase_1, layoutPane_1, viewTypeProvider_1, uniqueIdGenerator_1, splitterPaneDefinition_1, splitterDefinition_1, componentDefinition_1, widgetBase_1, paneProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitterWidget = /** @class */ (function (_super) {
        __extends(SplitterWidget, _super);
        function SplitterWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._orientation = ej.Orientation.Horizontal;
            _this._isResponsive = true;
            _this._defaultSplitterSize = 9; // TODO get actual splitter size 
            return _this;
        }
        /**
         * Initialize the splitter widget
         *
         * @param {number} [headerHeight=0]
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.initialize = function () {
            this._actualWidth = 1000;
            this._actualHeight = 400;
            this.layoutPanes = new Array();
            _super.prototype.initialize.call(this);
        };
        /**
         * Sets the orientation of the splitters in the widget (vertical or horizontal)
         *
         * @param {string} orientation
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setOrientation = function (orientation) {
            if (orientation == splitterDefinition_1.SplitterDefinition.orientationVertical) {
                this._orientation = ej.Orientation.Vertical;
            }
            else if (orientation == splitterDefinition_1.SplitterDefinition.orientationHorizontal) {
                this._orientation = ej.Orientation.Horizontal;
            }
        };
        /**
         * Returns the orientation of the splitters in the widget (vertical or horizontal)
         *
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getOrientation = function () {
            if (this._orientation == ej.Orientation.Vertical) {
                return splitterDefinition_1.SplitterDefinition.orientationVertical;
            }
            else if (this._orientation == ej.Orientation.Horizontal) {
                return splitterDefinition_1.SplitterDefinition.orientationHorizontal;
            }
            return "";
        };
        SplitterWidget.prototype.getResponsive = function () {
            return this._isResponsive;
        };
        SplitterWidget.prototype.setResponsive = function (isResponsive) {
            this._isResponsive = isResponsive;
            this._actualHeight = 400;
        };
        /**
         * Creates the splitter widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.createLayout = function () {
            var _this = this;
            $(this.mainDiv).ejSplitter({
                isResponsive: true,
                orientation: ej.Orientation.Horizontal,
                allowKeyboardNavigation: false,
                // Set a default size => Needed for inactive splitter windows to avoid AddItem problems
                width: "400px",
                height: "400px",
                resize: function (args) {
                    _this.onSplitterResize(args);
                },
                create: function (args) {
                    _this.mainDiv.style.padding = "0px";
                }
            });
        };
        /**
         * Sets the actual layout panes definitions to the ejsplitter
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.recalculateLayout = function () {
            var splitter = this.getSplitter();
            // Set orientation before get properties to the correct paneSizes(height/width)
            splitter.option("orientation", this._orientation);
            var properties = this.getProperties(splitter);
            var keys = Object.keys(this.layoutPanes);
            if (properties.length != keys.length) {
                throw (new Error("properties.length != this.layoutPanes.length"));
            }
            this.updatePropertiesInformationsWithLayoutPanesData(properties);
            this.setProperties(splitter, properties);
            if (this._isResponsive == false) {
                // create default first pane, which will be needed for drag&drop of new widgets to the splitter widget
                var splitter_1 = this.getSplitter();
                var newItem = splitter_1.addItem("<div id='" + this.getLastPaneId() + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, 0);
            }
        };
        /**
         * resizes the splitter widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resize = function (width, height) {
            if (this._isResponsive) {
                this._actualHeight = height;
            }
            this._actualWidth = width;
            this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Loads the styles for the splitter widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.loadStyles = function () {
            // TODO: get div from _layoutContainerId
            //super.addStyleToContentId("#" + this._layoutContainerId, "widgets/splitterWidget/style/css/splitterStyle.css");
            //super.addStyleToContentId("#" + this._layoutContainerId, "widgets/common/style/css/widgetHeaderFooterStyle.css");
        };
        /**
         * Activates all the widget in the different splitter panes
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.activate = function () {
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.activate();
                }
            });
        };
        /**
         * Deactivates all the widget in the different splitter panes
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.deactivate = function () {
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.deactivate();
                }
            });
        };
        /**
         * Disposes the widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.dispose = function () {
            this.component.disablePersisting();
            _super.prototype.dispose.call(this);
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.dispose();
                }
            });
        };
        SplitterWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId, this.getSplitterDefinition());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SplitterWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
                var splitterDefinition = this.component.getSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId);
                if (splitterDefinition != undefined) {
                    this.setSplitterDefinition(splitterDefinition);
                }
            }
        };
        SplitterWidget.prototype.getSplitterDefinition = function () {
            var splitterDefinition = new splitterDefinition_1.SplitterDefinition(this.getOrientation(), this.getResponsive());
            splitterDefinition.paneDefinitions = this.getSplitterPaneDefinitions();
            return splitterDefinition;
        };
        SplitterWidget.prototype.setSplitterDefinition = function (splitterDefinition) {
            var splitterOrientation = splitterDefinition.orientation;
            var splitterResponsive = splitterDefinition.responsive;
            var paneDefinitions = splitterDefinition.paneDefinitions;
            if (paneDefinitions == undefined) {
                return;
            }
            // Set splitter panes
            this.setSplitterPaneDefinitions(paneDefinitions);
            // Set orientation of splitter panes
            this.setOrientation(splitterOrientation);
            // Set responsive of splitter
            this.setResponsive(splitterResponsive);
            this.recalculateLayout();
        };
        SplitterWidget.prototype.getSplitterPaneDefinitions = function () {
            var _this = this;
            var paneDefinitions = new Array();
            this._widgets.forEach(function (widget, key) {
                if (widget != undefined) {
                    var componentDefinition = new componentDefinition_1.ComponentDefinition("", "", "");
                    componentDefinition.set(widget.component.getDefinition());
                    var paneSettings = undefined;
                    var layoutPane = _this.getLayoutPane(key);
                    if (layoutPane != undefined) {
                        paneSettings = layoutPane.getSettings();
                    }
                    else {
                        console.error("LayoutPane not defined!");
                    }
                    paneDefinitions.push(new splitterPaneDefinition_1.SplitterPaneDefinition(componentDefinition, paneSettings));
                }
            });
            return paneDefinitions;
        };
        SplitterWidget.prototype.getLayoutPane = function (key) {
            var layoutPane;
            layoutPane = this.layoutPanes.filter(function (element) { return element.name == key; });
            return layoutPane[0];
        };
        SplitterWidget.prototype.setSplitterPaneDefinitions = function (paneDefinitions) {
            // Create splitter panes and add widgets
            for (var i_1 = 0; i_1 < paneDefinitions.length; i_1++) {
                if (paneDefinitions[i_1] != undefined) {
                    var componentDefinition = paneDefinitions[i_1].componentDefinition;
                    if (this.component.componentFactory != undefined) {
                        var component = this.component.addSubComponent(componentDefinition.type, componentDefinition.id, componentDefinition.defaultSettingsDataId, this.component.context);
                        if (component != undefined) {
                            // check if instance is a widget
                            if (component instanceof widgetBase_1.WidgetBase) {
                                var widget = component;
                                var splitterStoringDataId = componentDefinition.defaultSettingsDataId;
                                if (splitterStoringDataId != "") {
                                    widget.setDefaultComponentSettingsDataId(splitterStoringDataId);
                                }
                                this.addWidget(widget, componentDefinition.id, viewTypeProvider_1.ViewType.Default, new paneProperties_1.PaneProperties());
                            }
                        }
                        else {
                            if (componentDefinition.type != "ChartBase") { // "ChartBase" currently not implemented => TODO: create charts with componentfactory
                                console.warn("Component with component type '" + componentDefinition.type + "' could not be created!");
                            }
                        }
                    }
                    else {
                        console.error("ComponentFactory not available!");
                    }
                }
            }
            // Set splitter pane sizes
            var i = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (paneDefinitions[i].paneData != undefined) {
                    layoutPane.setSettings(paneDefinitions[i].paneData); // TODO: paneData
                }
                i++;
            }
        };
        /**
         * Get pane definitions from chartSplitter component
         *
         * @returns {Array<SplitterPaneDefinition>}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getChartViewSplitterPaneDefinitions = function () {
            var settings = this.component.getComponentSettings();
            var paneDefinitions = new Array();
            if (settings.data != undefined) {
                if (settings.data.splitterDefinition != undefined) {
                    paneDefinitions = settings.data.splitterDefinition.paneDefinitions;
                }
            }
            return paneDefinitions;
        };
        /**
         * Adds a widget to the splitter => a new pane will be added for the widget to the splitter
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {PaneProperties} paneProperties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addWidget = function (widget, name, viewType, paneProperties) {
            _super.prototype.addWidget.call(this, widget, name, viewType);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            var oldPaneSizes = this.getPaneSizes(properties);
            if (!this._isResponsive && paneProperties.paneSize != -1) {
                this._actualHeight += paneProperties.paneSize + this._defaultSplitterSize;
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
            var paneId = this.getPaneDivId(name);
            var indexOfNewPane = splitter.model.properties.length;
            this.addPane(splitter, paneId, indexOfNewPane, paneProperties);
            widget.initialize();
            // add widget to the parent container
            widget.addToParentContainerId(paneId);
            this.updateLayoutPanesAfterAddingNewPane(properties, oldPaneSizes, widget, viewType);
            if (!this._isResponsive) {
                this.setProperties(splitter, properties);
                this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
            }
        };
        /**
         * adds this widget to the given container
         *
         * @param {(HTMLDivElement|undefined)} parentContainer
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addToParentContainer = function (parentContainer) {
            // Adds some additional needed styles for this splitter to the parent container
            this.addStyleToContentId(parentContainer, "widgets/splitterWidget/style/css/splitterStyle.css");
            this.addStyleToContentId(parentContainer, "widgets/common/style/css/widgetHeaderFooterStyle.css");
            _super.prototype.addToParentContainer.call(this, parentContainer);
        };
        /**
         * Removes a widget(pane) from the splitter
         *
         * @param {IWidget} widget
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removeWidget = function (widget) {
            var paneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            // get all actual paneSizes 
            var properties = this.getProperties(splitter);
            var sizeToRemove = properties[paneIndex].paneSize;
            var paneSizes = this.getPaneSizes(properties);
            paneSizes.splice(paneIndex, 1);
            splitter.removeItem(paneIndex);
            this.adjustChartsDivContainerSize(sizeToRemove);
            var newSplitterHeight = this.adjustSplitterSize(splitter, sizeToRemove);
            for (var i = 0; i < properties.length; i++) {
                properties[i].paneSize = paneSizes[i];
            }
            this.layoutPanes.splice(paneIndex, 1);
            this.removeWidgetFromList(widget);
            this._actualHeight = newSplitterHeight;
            this.setProperties(splitter, properties);
        };
        /**
         * Moves a widget(splitter pane) from the source index to the target index
         * (internal: target index will be decreased by 1 if source index is before target index)
         *
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.moveWidget = function (widget, targetPaneIndex) {
            // adds the widget divs to the documents temp
            widget.addToDocumentsTemp();
            var sourcePaneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            var layoutPane = this.layoutPanes[sourcePaneIndex];
            targetPaneIndex = this.updataTargetPaneIndex(sourcePaneIndex, targetPaneIndex);
            var originalPaneProperies = this.getPaneProperties(layoutPane);
            var properties = this.getProperties(splitter);
            this.updatePropertiesList(properties, sourcePaneIndex, targetPaneIndex);
            this.removePane(splitter, sourcePaneIndex);
            var paneId = this.getPaneDivId(widget.widgetName);
            this.addPane(splitter, paneId, targetPaneIndex, originalPaneProperies);
            this.updateLayoutPanesListAfterMoving(layoutPane, sourcePaneIndex, targetPaneIndex);
            this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            // adds the widget divs to the new added splitter pane
            widget.addToParentContainerId(paneId);
            widget.flaggedForResize = true;
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Returns the paneProperties of the given layoutPane
         *
         * @private
         * @param {ILayoutPane} layoutPane
         * @returns {PaneProperties}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneProperties = function (layoutPane) {
            var paneProperties = new paneProperties_1.PaneProperties();
            paneProperties.collapsible = layoutPane.collapsible;
            paneProperties.expandable = layoutPane.expandable;
            paneProperties.minSize = layoutPane.minimumSize;
            paneProperties.resizable = layoutPane.resizable;
            return paneProperties;
        };
        /**
         * Resize a widget to a new size and adapt the other widgets in this layoutWidget(splitter)
         *
         * @param {IWidget} widget
         * @param {number} newSize
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeWidget = function (widget, newSize) {
            var paneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            // set new pane sizes
            var currentPaneSize = properties[paneIndex].paneSize;
            var paneDiffSize = currentPaneSize - newSize;
            var sizeOfOtherPane = -1;
            var indexOfOtherPane = -1;
            if (paneIndex + 1 >= this.layoutPanes.length) {
                // Last pane size changed => update the size of the pane before
                sizeOfOtherPane = properties[paneIndex - 1].paneSize + paneDiffSize;
                indexOfOtherPane = paneIndex - 1;
            }
            else {
                // Update the following pane size
                sizeOfOtherPane = properties[paneIndex + 1].paneSize + paneDiffSize;
                indexOfOtherPane = paneIndex + 1;
            }
            if (sizeOfOtherPane < 0) {
                // Avoid resizing the following pane(or the pane before) to a size smaller then 0
                var oldValue = Math.abs(sizeOfOtherPane);
                sizeOfOtherPane = 50;
                newSize = newSize - oldValue - 50;
            }
            this.layoutPanes[indexOfOtherPane].size = sizeOfOtherPane;
            properties[indexOfOtherPane].paneSize = sizeOfOtherPane;
            this.layoutPanes[paneIndex].size = newSize;
            properties[paneIndex].paneSize = newSize;
            // Updates the splitters
            this.setPanePropertiesToSplitter(splitter, properties);
            // updates the contents in the splitters
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight);
        };
        /**
         * Returns the ejSplitter data object
         *
         * @private
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getSplitter = function () {
            return $(this.mainDiv).data("ejSplitter");
        };
        /**
         * Returns the sizes of all panes together, incl. the dynamic pane
         *
         * @private
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.sumOfDefinedLayoutPaneSizes = function () {
            var sum = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane != undefined) {
                    sum += layoutPane.size;
                }
            }
            return sum;
        };
        /**
         * Returns the sizes of all panes together, without the size of the dynamic pane but including the splitter size(e.g. 9px)
         *
         * @private
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.sumOfDefinedPaneSizes = function () {
            var sum = 0;
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        sum += layoutPane.size;
                    }
                    if (index > 0) {
                        var splitterSize = this._defaultSplitterSize;
                        sum += splitterSize; // Add size of splitter
                    }
                }
                index++;
            }
            return sum;
        };
        /**
         * if the pane sizes are too big for the current window size, the panes would be decreased in size
         *
         * @private
         * @param {number} size
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adoptLayoutPanesToFitCurrentSize = function (size) {
            var sumOfPanesWitoutDynamic = this.sumOfDefinedPaneSizes();
            var neededSize = sumOfPanesWitoutDynamic - size;
            if (neededSize > 0) {
                // TODO: get last not dynamic pane
                var lastPane = this.layoutPanes[this.layoutPanes.length - 1];
                lastPane.size = lastPane.size - neededSize;
            }
        };
        /**
         * Adds a new pane at the given index with the given size
         *
         * @private
         * @param {ej.Splitter} splitter
         * @param {string} paneId
         * @param {number} indexOfNewPane
         * @param {PaneProperties} paneProperties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addPane = function (splitter, paneId, indexOfNewPane, paneProperties) {
            var newItem;
            if (!this._isResponsive && paneProperties.paneSize != -1) {
                if (indexOfNewPane == 0) {
                    indexOfNewPane++;
                }
                newItem = splitter.removeItem(indexOfNewPane - 1);
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden'></div>", { paneSize: paneProperties.paneSize, expandable: paneProperties.expandable, collapsible: paneProperties.collapsible, minSize: paneProperties.minSize }, indexOfNewPane - 1);
                //Check splitter size: Increase height of splitter if it is not big enough to insert a new chart
                if (!this.hasPaneMinSize(splitter)) {
                    this.resizeSplitter(this._actualWidth, this._actualHeight + 1);
                }
                newItem = splitter.addItem("<div id='" + this.getLastPaneId() + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, indexOfNewPane);
            }
            else {
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden'></div>", { paneSize: paneProperties.paneSize, expandable: paneProperties.expandable, collapsible: paneProperties.collapsible, minSize: paneProperties.minSize }, indexOfNewPane);
            }
            if (newItem.toString() == "") {
                console.error("ERROR: splitter.addItem");
            }
            else {
                newItem[0].style.overflow = "hidden";
            }
        };
        /**
         * Returns the div id of the last pane
         *
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getLastPaneId = function () {
            return this.mainDivId + "_lastPane";
        };
        /**
         * Returns the div id of a pane for the given widgetname
         *
         * @private
         * @param {string} name
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneDivId = function (name) {
            return this.mainDivId + "pane_" + name.replace(" ", "");
        };
        /**
         *  Removes the pane with the given index from the splitter
         *
         * @private
         * @param {*} splitter
         * @param {number} paneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removePane = function (splitter, paneIndex) {
            splitter.removeItem(paneIndex);
        };
        SplitterWidget.prototype.updateLayoutPanesAfterAddingNewPane = function (properties, oldPaneSizes, widget, viewType) {
            if (this._isResponsive) {
                this.updataLayoutPanesAfterAddingNewPaneResponsive(properties, widget);
            }
            else {
                oldPaneSizes[oldPaneSizes.length - 1] = undefined;
                for (var i = 0; i < properties.length - 1; i++) {
                    var name_1 = "";
                    if (oldPaneSizes[i] != undefined) {
                        properties[i].paneSize = oldPaneSizes[i];
                        name_1 = this.layoutPanes[i].name;
                    }
                    if (name_1 === "") {
                        name_1 = widget.widgetName + "_" + viewType.toString();
                        name_1 = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(name_1);
                        name_1 = name_1.replace(/[&\/\\#,+( )$~%.'":*?<>{}]/g, '_');
                    }
                    var paneWidget = widget;
                    if (this.layoutPanes[i] != undefined) {
                        paneWidget = this.layoutPanes[i].widget;
                    }
                    this.layoutPanes[i] = new layoutPane_1.LayoutPane(name_1, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible, properties[i].minSize);
                }
            }
        };
        SplitterWidget.prototype.updataLayoutPanesAfterAddingNewPaneResponsive = function (properties, widget) {
            var _loop_1 = function (i) {
                var name_2 = "";
                var j = 0;
                this_1._widgets.forEach(function (value, key) {
                    if (j == i) {
                        name_2 = key;
                    }
                    j++;
                });
                var paneWidget = widget;
                if (this_1.layoutPanes[i] != undefined) {
                    paneWidget = this_1.layoutPanes[i].widget;
                }
                this_1.layoutPanes[i] = new layoutPane_1.LayoutPane(name_2, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible, properties[i].minSize);
            };
            var this_1 = this;
            for (var i = 0; i < properties.length; i++) {
                _loop_1(i);
            }
        };
        /**
         * Updates the properties with the informations from the layoutPane definitions;
         * Size of dynamic pane will be calculated by using the actual widget size
         *
         * @private
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePropertiesInformationsWithLayoutPanesData = function (properties) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        properties[index].paneSize = layoutPane.size;
                    }
                    else {
                        var size = this._actualWidth;
                        if (this._orientation == ej.Orientation.Vertical) {
                            size = this._actualHeight;
                        }
                        properties[index].paneSize = size - this.sumOfDefinedLayoutPaneSizes();
                    }
                    properties[index].expandable = layoutPane.expandable;
                    properties[index].collapsible = layoutPane.collapsible;
                    properties[index].resizable = layoutPane.resizable;
                    properties[index].minSize = layoutPane.minimumSize;
                }
                index++;
            }
        };
        /**
         * resize the splitter and update the splitter panesizes
         *
         * @private
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeSplitter = function (width, height) {
            var splitter = this.getSplitter();
            splitter.option("width", width, true);
            splitter.option("height", height, true);
            var properties = this.getProperties(splitter);
            this.updatePaneProperties(properties, width, height);
            this.setPanePropertiesToSplitter(splitter, properties);
        };
        /**
         * Return true if splitter has enough size to insert all necessary charts.
         *
         * @private
         * @param {ej.Splitter} splitter
         * @returns {boolean}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.hasPaneMinSize = function (splitter) {
            var minHeight = 0;
            var sumOfPaneHeights = minHeight;
            if (splitter.model.properties && splitter.model.properties.length > 0) {
                //Min height of splitter => lastPaneSize + bar size (409) + minSize of all charts + the bar height between charts(9)
                minHeight = 409 + (splitter.model.properties.length - 1) * 9;
                sumOfPaneHeights = (splitter.model.properties.length - 1) * 9;
                splitter.model.properties.forEach(function (pane) {
                    minHeight += pane.minSize;
                    sumOfPaneHeights += pane.paneSize;
                });
            }
            if (sumOfPaneHeights >= minHeight) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Updates the panesize in the properties for the new height/width
         *
         * @private
         * @param {*} properties
         * @param {*} width
         * @param {*} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePaneProperties = function (properties, width, height) {
            // Set all know pane sizes
            this.setKnownPaneSizes(properties);
            // Set all dynamic pane sizes
            this.setDynamicPaneSizes(properties, width, height);
        };
        SplitterWidget.prototype.setKnownPaneSizes = function (properties) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        properties[index].paneSize = layoutPane.size;
                    }
                }
                index++;
            }
        };
        SplitterWidget.prototype.setDynamicPaneSizes = function (properties, width, height) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == true) {
                        if (this._orientation == ej.Orientation.Vertical) {
                            properties[index].paneSize = height - this.sumOfDefinedPaneSizes();
                        }
                        else {
                            properties[index].paneSize = width - this.sumOfDefinedPaneSizes();
                        }
                    }
                }
                index++;
            }
        };
        /**
         * Sets the given properties(panesizes, ...) to the ejsplitter
         * if the last panesize is under 1px a correction of the panesize will be done; occures sometimes in case of browser zoom
         *
         * @private
         * @param {*} splitter
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setPanePropertiesToSplitter = function (splitter, properties) {
            this.setProperties(splitter, properties);
            if (splitter.panes.length > 0) {
                var lastPane = splitter.panes[splitter.panes.length - 1];
                if (lastPane != undefined) {
                    var lastPaneSizeString = lastPane.style.width;
                    if (this._orientation == ej.Orientation.Vertical) {
                        lastPaneSizeString = lastPane.style.height;
                    }
                    var lastPaneSize = parseFloat(lastPaneSizeString);
                    if (lastPaneSize <= 0.9999 && properties[properties.length - 1].paneSize > 0) {
                        // Size of last splitter pane was not set correct => to less space!
                        // if browser zoom is used the sizes will be defined with decimalplaces;
                        // the ejSplitter sets the size of the last pane to 0 if it is a little bit to tall (e.g. "0.1px") => pane will not be shown
                        // Set last pane a little bit smaller
                        properties[properties.length - 1].paneSize--;
                        this.setProperties(splitter, properties);
                    }
                }
            }
        };
        /**
         * Sets the splitter pane content sizes (widget sizes)
         *
         * @private
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeSplitterPaneContents = function (width, height) {
            // Set the sizes of the splitter panecontents
            var index = 0;
            for (var i = 0; i < this.layoutPanes.length; i++) {
                var widget = this._widgets.get(this.layoutPanes[i].name);
                if (widget != undefined) {
                    var widgetWidth = width;
                    var widgetHeight = height;
                    if (this._orientation == ej.Orientation.Vertical) {
                        if (this.layoutPanes[index].fillSpace == true) {
                            widgetHeight = height - this.sumOfDefinedPaneSizes();
                            if (widgetHeight < 0) { // No place for dynamic pane, maybe also other panes have to be adopted
                                this.adoptLayoutPanesToFitCurrentSize(height);
                                widgetHeight = 0;
                            }
                        }
                        else {
                            widgetHeight = this.layoutPanes[index].size;
                        }
                    }
                    else {
                        if (this.layoutPanes[index].fillSpace == true) {
                            widgetWidth = width - this.sumOfDefinedPaneSizes();
                            if (widgetWidth < 0) { // No place for dynamic pane, maybe also other panes have to be adopted
                                this.adoptLayoutPanesToFitCurrentSize(width);
                                widgetWidth = 0;
                            }
                        }
                        else {
                            widgetWidth = this.layoutPanes[index].size;
                        }
                    }
                    widget.resize(widgetWidth, widgetHeight);
                }
                index++;
            }
            //Persist data every time a splitter is resized
            this.saveSettings();
        };
        /**
         * Updates the layout panes
         *
         * @private
         * @param {*} splitbarIndex
         * @param {*} prevPaneSize
         * @param {*} nextPaneSize
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updateLayoutPanesOnSplitterResize = function (splitbarIndex, prevPaneSize, nextPaneSize) {
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            if (!this._isResponsive) {
                if (this.layoutPanes[splitbarIndex + 1] != undefined) {
                    properties[splitbarIndex + 1].paneSize = this.layoutPanes[splitbarIndex + 1].size;
                }
            }
            else {
                this.layoutPanes[splitbarIndex + 1].size = nextPaneSize;
            }
            this.setProperties(splitter, properties);
            var oldSize = this.layoutPanes[splitbarIndex].size;
            this.layoutPanes[splitbarIndex].size = prevPaneSize;
            if (!this._isResponsive) {
                this._actualHeight += (prevPaneSize - oldSize);
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
        };
        /**
         * corrects the target index if source index is before target index
         *
         * @private
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updataTargetPaneIndex = function (sourcePaneIndex, targetPaneIndex) {
            if (sourcePaneIndex < targetPaneIndex) {
                // moved element is in list before target position and was removed before, so index must be decreased to get correct insert position
                targetPaneIndex--;
            }
            return targetPaneIndex;
        };
        /**
         * Returns the properties from the ejSplitter
         *
         * @private
         * @param {*} splitter
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getProperties = function (splitter) {
            return splitter.option("properties");
        };
        /**
         * Sets the properties of the ejSplitter
         *
         * @private
         * @param {*} splitter
         * @param {*} properties
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setProperties = function (splitter, properties) {
            splitter.option("properties", properties, true); // force the setting to resize the chart splitters
        };
        /**
         * Updates the properties => moves the property informations from source to target index
         *
         * @private
         * @param {*} properties
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePropertiesList = function (properties, sourcePaneIndex, targetPaneIndex) {
            var paneProperties = properties[sourcePaneIndex];
            properties.splice(sourcePaneIndex, 1);
            properties.splice(targetPaneIndex, 0, paneProperties);
        };
        /**
         * Updates the layout panes list after moving
         *
         * @private
         * @param {*} layoutPane
         * @param {*} sourcePaneIndex
         * @param {*} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updateLayoutPanesListAfterMoving = function (layoutPane, sourcePaneIndex, targetPaneIndex) {
            this.layoutPanes.splice(sourcePaneIndex, 1);
            this.layoutPanes.splice(targetPaneIndex, 0, layoutPane);
        };
        /**
         * Returns the pane index of the given widget
         *
         * @private
         * @param {*} widget
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneIndex = function (widget) {
            var paneIndex = -1;
            for (var i = 0; i < this.layoutPanes.length; i++) {
                if (this.layoutPanes[i].widget == widget) {
                    paneIndex = i;
                }
            }
            return paneIndex;
        };
        /**
         * Removes the widget from the widgets list of this layout widget
         *
         * @private
         * @param {*} widget
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removeWidgetFromList = function (widget) {
            var _this = this;
            this._widgets.forEach(function (widgetTemp, key) {
                if (widgetTemp == widget) {
                    _this._widgets.delete(key);
                }
            });
        };
        /**
         * Adjust charts div container => remove chart size
         *
         * @private
         * @param {*} sizeToRemove
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adjustChartsDivContainerSize = function (sizeToRemove) {
            this.mainDiv.style.height = (this.mainDiv.offsetHeight - sizeToRemove - 400 + this._defaultSplitterSize) + "px"; // Remove pane size + splitter size(9px)
        };
        /**
         *  Adjust ejSplitter size
         *
         * @private
         * @param {*} splitter
         * @param {*} sizeToRemove
         * @returns {number} Returns the new splitter size after removing
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adjustSplitterSize = function (splitter, sizeToRemove) {
            var actualSplitterHeight = splitter.option("height");
            var newSplitterHeight = parseInt(actualSplitterHeight, 10); // parseInt to remove "px"
            newSplitterHeight -= sizeToRemove + this._defaultSplitterSize; // Remove pane size + splitter size(9px)
            splitter.option("height", newSplitterHeight, true); // TODO: not only height, also width 
            return newSplitterHeight;
        };
        /**
         * Notifies that splitter has resized
         *
         * @private
         */
        SplitterWidget.prototype.onSplitterResize = function (args) {
            this.updateLayoutPanesOnSplitterResize(args.splitbarIndex, args.prevPane.size, args.nextPane.size);
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Returns a list with only the sizes of the panes
         *
         * @private
         * @param {*} properties
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneSizes = function (properties) {
            var paneSizes = new Array();
            properties.forEach(function (property) {
                paneSizes.push(property.paneSize);
            });
            return paneSizes;
        };
        return SplitterWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.SplitterWidget = SplitterWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTtRQUE2QixrQ0FBZ0I7UUFBN0M7WUFBQSxxRUFvbENDO1lBbGxDVyxrQkFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBRXpDLG1CQUFhLEdBQVksSUFBSSxDQUFDO1lBRTlCLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDLGlDQUFpQzs7UUE4a0MvRSxDQUFDO1FBM2tDRzs7Ozs7V0FLRztRQUNILG1DQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztZQUV6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFFL0IsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQWMsR0FBZCxVQUFlLFdBQW1CO1lBQzlCLElBQUcsV0FBVyxJQUFJLHVDQUFrQixDQUFDLG1CQUFtQixFQUFDO2dCQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2FBQy9DO2lCQUNJLElBQUcsV0FBVyxJQUFJLHVDQUFrQixDQUFDLHFCQUFxQixFQUFDO2dCQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQWMsR0FBZDtZQUNJLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQztnQkFDNUMsT0FBTyx1Q0FB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V2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBMYXlvdXRQYW5lIH0gZnJvbSBcIi4vbGF5b3V0UGFuZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuXHJcbmltcG9ydCB7IFNwbGl0dGVyUGFuZURlZmluaXRpb24gfSBmcm9tIFwiLi9zcGxpdHRlclBhbmVEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuL3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUxheW91dFBhbmUgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2xheW91dFBhbmVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGFuZVByb3BlcnRpZXMgfSBmcm9tIFwiLi4vY29tbW9uL3BhbmVQcm9wZXJ0aWVzXCI7XHJcbmltcG9ydCB7IElTcGxpdHRlcldpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3BsaXR0ZXJXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmNsYXNzIFNwbGl0dGVyV2lkZ2V0IGV4dGVuZHMgTGF5b3V0V2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElTcGxpdHRlcldpZGdldHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsO1xyXG5cclxuICAgIHByaXZhdGUgX2lzUmVzcG9uc2l2ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFNwbGl0dGVyU2l6ZTogbnVtYmVyID0gOTsgLy8gVE9ETyBnZXQgYWN0dWFsIHNwbGl0dGVyIHNpemUgXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtoZWFkZXJIZWlnaHQ9MF1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gMTAwMDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSA0MDA7XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgIFxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzcGxpdHRlcnMgaW4gdGhlIHdpZGdldCAodmVydGljYWwgb3IgaG9yaXpvbnRhbClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZW50YXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbjogc3RyaW5nKXtcclxuICAgICAgICBpZihvcmllbnRhdGlvbiA9PSBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25WZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gZWouT3JpZW50YXRpb24uVmVydGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYob3JpZW50YXRpb24gPT0gU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uSG9yaXpvbnRhbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgc3BsaXR0ZXJzIGluIHRoZSB3aWRnZXQgKHZlcnRpY2FsIG9yIGhvcml6b250YWwpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXRPcmllbnRhdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICByZXR1cm4gU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXNwb25zaXZlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmVzcG9uc2l2ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSZXNwb25zaXZlKGlzUmVzcG9uc2l2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5faXNSZXNwb25zaXZlID0gaXNSZXNwb25zaXZlO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IDQwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHNwbGl0dGVyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqU3BsaXR0ZXIoe1xyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsLCAvLyBJbml0aWFsIG9ubHkgSG9yaXpvbnRhbCBpcyB3b3JraW5nID0+IGxhdGVyIHN3aXRjaCB0byB2ZXJ0aWNhbCBpbiByZWNhbGN1bGF0ZSBsYXlvdXQgaXMgcG9zc2libGVcclxuICAgICAgICAgICAgYWxsb3dLZXlib2FyZE5hdmlnYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyBTZXQgYSBkZWZhdWx0IHNpemUgPT4gTmVlZGVkIGZvciBpbmFjdGl2ZSBzcGxpdHRlciB3aW5kb3dzIHRvIGF2b2lkIEFkZEl0ZW0gcHJvYmxlbXNcclxuICAgICAgICAgICAgd2lkdGg6IFwiNDAwcHhcIixcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjQwMHB4XCIsXHJcbiAgICAgICAgICAgIHJlc2l6ZTogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TcGxpdHRlclJlc2l6ZShhcmdzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3R1YWwgbGF5b3V0IHBhbmVzIGRlZmluaXRpb25zIHRvIHRoZSBlanNwbGl0dGVyXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZWNhbGN1bGF0ZUxheW91dCgpe1xyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICAvLyBTZXQgb3JpZW50YXRpb24gYmVmb3JlIGdldCBwcm9wZXJ0aWVzIHRvIHRoZSBjb3JyZWN0IHBhbmVTaXplcyhoZWlnaHQvd2lkdGgpXHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwib3JpZW50YXRpb25cIiwgdGhpcy5fb3JpZW50YXRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMubGF5b3V0UGFuZXMpO1xyXG4gICAgICAgIGlmKHByb3BlcnRpZXMubGVuZ3RoICE9IGtleXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKFwicHJvcGVydGllcy5sZW5ndGggIT0gdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGhcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXNJbmZvcm1hdGlvbnNXaXRoTGF5b3V0UGFuZXNEYXRhKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2lzUmVzcG9uc2l2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBkZWZhdWx0IGZpcnN0IHBhbmUsIHdoaWNoIHdpbGwgYmUgbmVlZGVkIGZvciBkcmFnJmRyb3Agb2YgbmV3IHdpZGdldHMgdG8gdGhlIHNwbGl0dGVyIHdpZGdldFxyXG4gICAgICAgICAgICBsZXQgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdJdGVtID0gc3BsaXR0ZXIuYWRkSXRlbShcIjxkaXYgaWQ9J1wiICsgdGhpcy5nZXRMYXN0UGFuZUlkKCkgKyBcIicgc3R5bGU9J292ZXJmbG93OmhpZGRlbjsgd2lkdGg6MTAwJTsgaGVpZ2h0OjEwMCUnPjwvZGl2PlwiLCB7IHBhbmVTaXplOiA0MDAsIGV4cGFuZGFibGU6IGZhbHNlLCBjb2xsYXBzaWJsZTogZmFsc2V9LCAwKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVzaXplcyB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7ICAgXHJcbiAgICAgICAgaWYodGhpcy5faXNSZXNwb25zaXZlKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIHNwbGl0dGVyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgLy8gVE9ETzogZ2V0IGRpdiBmcm9tIF9sYXlvdXRDb250YWluZXJJZFxyXG4gICAgICAgIC8vc3VwZXIuYWRkU3R5bGVUb0NvbnRlbnRJZChcIiNcIiArIHRoaXMuX2xheW91dENvbnRhaW5lcklkLCBcIndpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3R5bGUvY3NzL3NwbGl0dGVyU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIC8vc3VwZXIuYWRkU3R5bGVUb0NvbnRlbnRJZChcIiNcIiArIHRoaXMuX2xheW91dENvbnRhaW5lcklkLCBcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy93aWRnZXRIZWFkZXJGb290ZXJTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgYWxsIHRoZSB3aWRnZXQgaW4gdGhlIGRpZmZlcmVudCBzcGxpdHRlciBwYW5lc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGVzIGFsbCB0aGUgd2lkZ2V0IGluIHRoZSBkaWZmZXJlbnQgc3BsaXR0ZXIgcGFuZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFNwbGl0dGVyRGVmaW5pdGlvbi5zcGxpdHRlckRlZmluaXRpb25JZCwgdGhpcy5nZXRTcGxpdHRlckRlZmluaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKGRhdGE6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNwbGl0dGVyRGVmaW5pdGlvbiA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoU3BsaXR0ZXJEZWZpbml0aW9uLnNwbGl0dGVyRGVmaW5pdGlvbklkKTtcclxuICAgICAgICAgICAgaWYoc3BsaXR0ZXJEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNwbGl0dGVyRGVmaW5pdGlvbihzcGxpdHRlckRlZmluaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U3BsaXR0ZXJEZWZpbml0aW9uKCk6IFNwbGl0dGVyRGVmaW5pdGlvbntcclxuICAgICAgICBsZXQgc3BsaXR0ZXJEZWZpbml0aW9uID0gbmV3IFNwbGl0dGVyRGVmaW5pdGlvbih0aGlzLmdldE9yaWVudGF0aW9uKCksIHRoaXMuZ2V0UmVzcG9uc2l2ZSgpKTtcclxuICAgICAgICBzcGxpdHRlckRlZmluaXRpb24ucGFuZURlZmluaXRpb25zID0gdGhpcy5nZXRTcGxpdHRlclBhbmVEZWZpbml0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTcGxpdHRlckRlZmluaXRpb24oc3BsaXR0ZXJEZWZpbml0aW9uOiBTcGxpdHRlckRlZmluaXRpb24pe1xyXG4gICAgICAgIGxldCBzcGxpdHRlck9yaWVudGF0aW9uID0gc3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uO1xyXG4gICAgICAgIGxldCBzcGxpdHRlclJlc3BvbnNpdmUgPSBzcGxpdHRlckRlZmluaXRpb24ucmVzcG9uc2l2ZTtcclxuICAgICAgICBsZXQgcGFuZURlZmluaXRpb25zID0gc3BsaXR0ZXJEZWZpbml0aW9uLnBhbmVEZWZpbml0aW9ucztcclxuICAgICAgICBcclxuICAgICAgICBpZihwYW5lRGVmaW5pdGlvbnMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZXQgc3BsaXR0ZXIgcGFuZXNcclxuICAgICAgICB0aGlzLnNldFNwbGl0dGVyUGFuZURlZmluaXRpb25zKHBhbmVEZWZpbml0aW9ucyk7XHJcbiBcclxuICAgICAgICAvLyBTZXQgb3JpZW50YXRpb24gb2Ygc3BsaXR0ZXIgcGFuZXNcclxuICAgICAgICB0aGlzLnNldE9yaWVudGF0aW9uKHNwbGl0dGVyT3JpZW50YXRpb24pO1xyXG5cclxuICAgICAgICAvLyBTZXQgcmVzcG9uc2l2ZSBvZiBzcGxpdHRlclxyXG4gICAgICAgIHRoaXMuc2V0UmVzcG9uc2l2ZShzcGxpdHRlclJlc3BvbnNpdmUpO1xyXG5cclxuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlTGF5b3V0KCk7ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBnZXRTcGxpdHRlclBhbmVEZWZpbml0aW9ucygpOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPntcclxuICAgICAgICBsZXQgcGFuZURlZmluaXRpb25zID0gbmV3IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+KCk7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnREZWZpbml0aW9uID0gbmV3IENvbXBvbmVudERlZmluaXRpb24oXCJcIixcIlwiLFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RGVmaW5pdGlvbi5zZXQod2lkZ2V0LmNvbXBvbmVudC5nZXREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVTZXR0aW5nczogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gdGhpcy5nZXRMYXlvdXRQYW5lKGtleSk7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZVNldHRpbmdzID0gbGF5b3V0UGFuZS5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTGF5b3V0UGFuZSBub3QgZGVmaW5lZCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYW5lRGVmaW5pdGlvbnMucHVzaChuZXcgU3BsaXR0ZXJQYW5lRGVmaW5pdGlvbihjb21wb25lbnREZWZpbml0aW9uLCBwYW5lU2V0dGluZ3MpKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcGFuZURlZmluaXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGF5b3V0UGFuZShrZXk6IHN0cmluZyk6IElMYXlvdXRQYW5le1xyXG4gICAgICAgIGxldCBsYXlvdXRQYW5lO1xyXG4gICAgICAgIGxheW91dFBhbmUgPSB0aGlzLmxheW91dFBhbmVzLmZpbHRlcihlbGVtZW50ID0+IHsgcmV0dXJuIGVsZW1lbnQubmFtZSA9PSBrZXl9KVxyXG4gICAgICAgIHJldHVybiBsYXlvdXRQYW5lWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMocGFuZURlZmluaXRpb25zOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPil7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHNwbGl0dGVyIHBhbmVzIGFuZCBhZGQgd2lkZ2V0c1xyXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgcGFuZURlZmluaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhbmVEZWZpbml0aW9uc1tpXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudERlZmluaXRpb24gPSBwYW5lRGVmaW5pdGlvbnNbaV0uY29tcG9uZW50RGVmaW5pdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEZhY3RvcnkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuYWRkU3ViQ29tcG9uZW50KGNvbXBvbmVudERlZmluaXRpb24udHlwZSwgY29tcG9uZW50RGVmaW5pdGlvbi5pZCwgY29tcG9uZW50RGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQsIHRoaXMuY29tcG9uZW50LmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpbnN0YW5jZSBpcyBhIHdpZGdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjb21wb25lbnQgaW5zdGFuY2VvZiBXaWRnZXRCYXNlKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0ID0gY29tcG9uZW50ICBhcyBJV2lkZ2V0OyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BsaXR0ZXJTdG9yaW5nRGF0YUlkID0gY29tcG9uZW50RGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzcGxpdHRlclN0b3JpbmdEYXRhSWQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0RhdGFJZChzcGxpdHRlclN0b3JpbmdEYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV2lkZ2V0KHdpZGdldCwgY29tcG9uZW50RGVmaW5pdGlvbi5pZCwgVmlld1R5cGUuRGVmYXVsdCwgbmV3IFBhbmVQcm9wZXJ0aWVzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudERlZmluaXRpb24udHlwZSAhPSBcIkNoYXJ0QmFzZVwiKXsgLy8gXCJDaGFydEJhc2VcIiBjdXJyZW50bHkgbm90IGltcGxlbWVudGVkID0+IFRPRE86IGNyZWF0ZSBjaGFydHMgd2l0aCBjb21wb25lbnRmYWN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDb21wb25lbnQgd2l0aCBjb21wb25lbnQgdHlwZSAnXCIgKyBjb21wb25lbnREZWZpbml0aW9uLnR5cGUgKyBcIicgY291bGQgbm90IGJlIGNyZWF0ZWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50RmFjdG9yeSBub3QgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IHNwbGl0dGVyIHBhbmUgc2l6ZXNcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKHBhbmVEZWZpbml0aW9uc1tpXS5wYW5lRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGF5b3V0UGFuZS5zZXRTZXR0aW5ncyhwYW5lRGVmaW5pdGlvbnNbaV0ucGFuZURhdGEpOyAvLyBUT0RPOiBwYW5lRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgcGFuZSBkZWZpbml0aW9ucyBmcm9tIGNoYXJ0U3BsaXR0ZXIgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+fVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFydFZpZXdTcGxpdHRlclBhbmVEZWZpbml0aW9ucygpOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPntcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGxldCBwYW5lRGVmaW5pdGlvbnMgPSBuZXcgQXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj4oKTtcclxuICAgICAgICBpZiAoc2V0dGluZ3MuZGF0YSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmRhdGEuc3BsaXR0ZXJEZWZpbml0aW9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcGFuZURlZmluaXRpb25zID0gc2V0dGluZ3MuZGF0YS5zcGxpdHRlckRlZmluaXRpb24ucGFuZURlZmluaXRpb25zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFuZURlZmluaXRpb25zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSB3aWRnZXQgdG8gdGhlIHNwbGl0dGVyID0+IGEgbmV3IHBhbmUgd2lsbCBiZSBhZGRlZCBmb3IgdGhlIHdpZGdldCB0byB0aGUgc3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0ge1BhbmVQcm9wZXJ0aWVzfSBwYW5lUHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIG5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlLCBwYW5lUHJvcGVydGllczogUGFuZVByb3BlcnRpZXMpeyBcclxuICAgICAgICBzdXBlci5hZGRXaWRnZXQod2lkZ2V0LCBuYW1lLCB2aWV3VHlwZSk7XHJcblxyXG4gICAgICAgIGxldCBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7IFxyXG4gICAgICAgIGxldCBvbGRQYW5lU2l6ZXMgPSB0aGlzLmdldFBhbmVTaXplcyhwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSAmJiBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSAhPSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCArPSBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSArIHRoaXMuX2RlZmF1bHRTcGxpdHRlclNpemU7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCAtIHRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFuZUlkID0gdGhpcy5nZXRQYW5lRGl2SWQobmFtZSk7XHJcbiAgICAgICAgdmFyIGluZGV4T2ZOZXdQYW5lID0gc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcyEubGVuZ3RoO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFBhbmUoc3BsaXR0ZXIsIHBhbmVJZCwgaW5kZXhPZk5ld1BhbmUsIHBhbmVQcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgd2lkZ2V0LmluaXRpYWxpemUoKTtcclxuICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgd2lkZ2V0LmFkZFRvUGFyZW50Q29udGFpbmVySWQocGFuZUlkKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVMYXlvdXRQYW5lc0FmdGVyQWRkaW5nTmV3UGFuZShwcm9wZXJ0aWVzLCBvbGRQYW5lU2l6ZXMsIHdpZGdldCwgdmlld1R5cGUpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5faXNSZXNwb25zaXZlKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkcyB0aGlzIHdpZGdldCB0byB0aGUgZ2l2ZW4gY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoSFRNTERpdkVsZW1lbnR8dW5kZWZpbmVkKX0gcGFyZW50Q29udGFpbmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkVG9QYXJlbnRDb250YWluZXIocGFyZW50Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQpe1xyXG4gICAgICAgIC8vIEFkZHMgc29tZSBhZGRpdGlvbmFsIG5lZWRlZCBzdHlsZXMgZm9yIHRoaXMgc3BsaXR0ZXIgdG8gdGhlIHBhcmVudCBjb250YWluZXJcclxuICAgICAgICB0aGlzLmFkZFN0eWxlVG9Db250ZW50SWQocGFyZW50Q29udGFpbmVyLCBcIndpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3R5bGUvY3NzL3NwbGl0dGVyU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkU3R5bGVUb0NvbnRlbnRJZChwYXJlbnRDb250YWluZXIsIFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3dpZGdldEhlYWRlckZvb3RlclN0eWxlLmNzc1wiKTtcclxuXHJcbiAgICAgICAgc3VwZXIuYWRkVG9QYXJlbnRDb250YWluZXIocGFyZW50Q29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYSB3aWRnZXQocGFuZSkgZnJvbSB0aGUgc3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXQpe1xyXG4gICAgICAgIGxldCBwYW5lSW5kZXggPSB0aGlzLmdldFBhbmVJbmRleCh3aWRnZXQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICAvLyBnZXQgYWxsIGFjdHVhbCBwYW5lU2l6ZXMgXHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpOyAgXHJcbiAgICAgICAgdmFyIHNpemVUb1JlbW92ZSA9IHByb3BlcnRpZXNbcGFuZUluZGV4XS5wYW5lU2l6ZTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcGFuZVNpemVzID0gdGhpcy5nZXRQYW5lU2l6ZXMocHJvcGVydGllcyk7XHJcbiAgICAgICAgcGFuZVNpemVzLnNwbGljZShwYW5lSW5kZXgsIDEpO1xyXG4gICAgICAgIHNwbGl0dGVyLnJlbW92ZUl0ZW0ocGFuZUluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkanVzdENoYXJ0c0RpdkNvbnRhaW5lclNpemUoc2l6ZVRvUmVtb3ZlKTtcclxuICAgICAgICBsZXQgbmV3U3BsaXR0ZXJIZWlnaHQgPSB0aGlzLmFkanVzdFNwbGl0dGVyU2l6ZShzcGxpdHRlciwgc2l6ZVRvUmVtb3ZlKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXNbaV0ucGFuZVNpemUgPSBwYW5lU2l6ZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMuc3BsaWNlKHBhbmVJbmRleCwxKTtcclxuICAgICAgICB0aGlzLnJlbW92ZVdpZGdldEZyb21MaXN0KHdpZGdldCk7XHJcbiBcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBuZXdTcGxpdHRlckhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyBhIHdpZGdldChzcGxpdHRlciBwYW5lKSBmcm9tIHRoZSBzb3VyY2UgaW5kZXggdG8gdGhlIHRhcmdldCBpbmRleFxyXG4gICAgICogKGludGVybmFsOiB0YXJnZXQgaW5kZXggd2lsbCBiZSBkZWNyZWFzZWQgYnkgMSBpZiBzb3VyY2UgaW5kZXggaXMgYmVmb3JlIHRhcmdldCBpbmRleClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc291cmNlUGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0UGFuZUluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbW92ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIHRhcmdldFBhbmVJbmRleDogbnVtYmVyKXtcclxuICAgICAgICAvLyBhZGRzIHRoZSB3aWRnZXQgZGl2cyB0byB0aGUgZG9jdW1lbnRzIHRlbXBcclxuICAgICAgICB3aWRnZXQuYWRkVG9Eb2N1bWVudHNUZW1wKCk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VQYW5lSW5kZXggPSB0aGlzLmdldFBhbmVJbmRleCh3aWRnZXQpO1xyXG4gICAgICAgIGxldCBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbGF5b3V0UGFuZSA9IHRoaXMubGF5b3V0UGFuZXNbc291cmNlUGFuZUluZGV4XTtcclxuICAgICAgICB0YXJnZXRQYW5lSW5kZXggPSB0aGlzLnVwZGF0YVRhcmdldFBhbmVJbmRleChzb3VyY2VQYW5lSW5kZXgsIHRhcmdldFBhbmVJbmRleCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG9yaWdpbmFsUGFuZVByb3BlcmllcyA9IHRoaXMuZ2V0UGFuZVByb3BlcnRpZXMobGF5b3V0UGFuZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvcGVydGllc0xpc3QocHJvcGVydGllcywgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQYW5lKHNwbGl0dGVyLCBzb3VyY2VQYW5lSW5kZXgpO1xyXG5cclxuICAgICAgICBsZXQgcGFuZUlkID0gdGhpcy5nZXRQYW5lRGl2SWQod2lkZ2V0LndpZGdldE5hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkUGFuZShzcGxpdHRlciwgcGFuZUlkLCB0YXJnZXRQYW5lSW5kZXgsIG9yaWdpbmFsUGFuZVByb3Blcmllcyk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTGF5b3V0UGFuZXNMaXN0QWZ0ZXJNb3ZpbmcobGF5b3V0UGFuZSwgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBhZGRzIHRoZSB3aWRnZXQgZGl2cyB0byB0aGUgbmV3IGFkZGVkIHNwbGl0dGVyIHBhbmVcclxuICAgICAgICB3aWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXJJZChwYW5lSWQpO1xyXG4gICAgICAgIHdpZGdldC5mbGFnZ2VkRm9yUmVzaXplID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFuZVByb3BlcnRpZXMgb2YgdGhlIGdpdmVuIGxheW91dFBhbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJTGF5b3V0UGFuZX0gbGF5b3V0UGFuZVxyXG4gICAgICogQHJldHVybnMge1BhbmVQcm9wZXJ0aWVzfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGFuZVByb3BlcnRpZXMobGF5b3V0UGFuZTogSUxheW91dFBhbmUpOiBQYW5lUHJvcGVydGllc3tcclxuICAgICAgICBsZXQgcGFuZVByb3BlcnRpZXMgPSBuZXcgUGFuZVByb3BlcnRpZXMoKTtcclxuICAgICAgICBwYW5lUHJvcGVydGllcy5jb2xsYXBzaWJsZSA9IGxheW91dFBhbmUuY29sbGFwc2libGU7XHJcbiAgICAgICAgcGFuZVByb3BlcnRpZXMuZXhwYW5kYWJsZSA9IGxheW91dFBhbmUuZXhwYW5kYWJsZTtcclxuICAgICAgICBwYW5lUHJvcGVydGllcy5taW5TaXplID0gbGF5b3V0UGFuZS5taW5pbXVtU2l6ZTtcclxuICAgICAgICBwYW5lUHJvcGVydGllcy5yZXNpemFibGUgPSBsYXlvdXRQYW5lLnJlc2l6YWJsZTtcclxuICAgICAgICByZXR1cm4gcGFuZVByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgYSB3aWRnZXQgdG8gYSBuZXcgc2l6ZSBhbmQgYWRhcHQgdGhlIG90aGVyIHdpZGdldHMgaW4gdGhpcyBsYXlvdXRXaWRnZXQoc3BsaXR0ZXIpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdTaXplXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgbmV3U2l6ZTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcGFuZUluZGV4ID0gdGhpcy5nZXRQYW5lSW5kZXgod2lkZ2V0KTtcclxuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcblxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKSBcclxuICAgICAgICAvLyBzZXQgbmV3IHBhbmUgc2l6ZXNcclxuICAgICAgICBsZXQgY3VycmVudFBhbmVTaXplID0gcHJvcGVydGllc1twYW5lSW5kZXhdLnBhbmVTaXplO1xyXG4gICAgICAgIGxldCBwYW5lRGlmZlNpemUgPSBjdXJyZW50UGFuZVNpemUtbmV3U2l6ZTtcclxuXHJcbiAgICAgICAgbGV0IHNpemVPZk90aGVyUGFuZSA9IC0xO1xyXG4gICAgICAgIGxldCBpbmRleE9mT3RoZXJQYW5lID0gLTE7XHJcbiAgICAgICAgaWYocGFuZUluZGV4ICsxID49IHRoaXMubGF5b3V0UGFuZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgLy8gTGFzdCBwYW5lIHNpemUgY2hhbmdlZCA9PiB1cGRhdGUgdGhlIHNpemUgb2YgdGhlIHBhbmUgYmVmb3JlXHJcbiAgICAgICAgICAgIHNpemVPZk90aGVyUGFuZSA9IHByb3BlcnRpZXNbcGFuZUluZGV4LTFdLnBhbmVTaXplK3BhbmVEaWZmU2l6ZTtcclxuICAgICAgICAgICAgaW5kZXhPZk90aGVyUGFuZSA9IHBhbmVJbmRleC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGZvbGxvd2luZyBwYW5lIHNpemVcclxuICAgICAgICAgICAgc2l6ZU9mT3RoZXJQYW5lID0gcHJvcGVydGllc1twYW5lSW5kZXgrMV0ucGFuZVNpemUrcGFuZURpZmZTaXplO1xyXG4gICAgICAgICAgICBpbmRleE9mT3RoZXJQYW5lID0gcGFuZUluZGV4KzE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNpemVPZk90aGVyUGFuZSA8IDApe1xyXG4gICAgICAgICAgICAvLyBBdm9pZCByZXNpemluZyB0aGUgZm9sbG93aW5nIHBhbmUob3IgdGhlIHBhbmUgYmVmb3JlKSB0byBhIHNpemUgc21hbGxlciB0aGVuIDBcclxuICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gTWF0aC5hYnMoc2l6ZU9mT3RoZXJQYW5lKTtcclxuICAgICAgICAgICAgc2l6ZU9mT3RoZXJQYW5lID0gNTA7ICAgXHJcbiAgICAgICAgICAgIG5ld1NpemUgPSBuZXdTaXplIC0gb2xkVmFsdWUgLSA1MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpbmRleE9mT3RoZXJQYW5lXS5zaXplID0gc2l6ZU9mT3RoZXJQYW5lO1xyXG4gICAgICAgIHByb3BlcnRpZXNbaW5kZXhPZk90aGVyUGFuZV0ucGFuZVNpemUgPSBzaXplT2ZPdGhlclBhbmU7XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXNbcGFuZUluZGV4XS5zaXplID0gbmV3U2l6ZTtcclxuICAgICAgICBwcm9wZXJ0aWVzW3BhbmVJbmRleF0ucGFuZVNpemUgPSBuZXdTaXplO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVwZGF0ZXMgdGhlIHNwbGl0dGVyc1xyXG4gICAgICAgIHRoaXMuc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlcyB0aGUgY29udGVudHMgaW4gdGhlIHNwbGl0dGVyc1xyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBlalNwbGl0dGVyIGRhdGEgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTcGxpdHRlcigpOiBhbnl7XHJcbiAgICAgICAgcmV0dXJuICQodGhpcy5tYWluRGl2KS5kYXRhKFwiZWpTcGxpdHRlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNpemVzIG9mIGFsbCBwYW5lcyB0b2dldGhlciwgaW5jbC4gdGhlIGR5bmFtaWMgcGFuZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3VtT2ZEZWZpbmVkTGF5b3V0UGFuZVNpemVzKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgc3VtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzdW0gKz0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzaXplcyBvZiBhbGwgcGFuZXMgdG9nZXRoZXIsIHdpdGhvdXQgdGhlIHNpemUgb2YgdGhlIGR5bmFtaWMgcGFuZSBidXQgaW5jbHVkaW5nIHRoZSBzcGxpdHRlciBzaXplKGUuZy4gOXB4KVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgc3VtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lLmZpbGxTcGFjZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGxheW91dFBhbmUuc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGluZGV4PjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGxpdHRlclNpemUgPSB0aGlzLl9kZWZhdWx0U3BsaXR0ZXJTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBzcGxpdHRlclNpemU7IC8vIEFkZCBzaXplIG9mIHNwbGl0dGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGlmIHRoZSBwYW5lIHNpemVzIGFyZSB0b28gYmlnIGZvciB0aGUgY3VycmVudCB3aW5kb3cgc2l6ZSwgdGhlIHBhbmVzIHdvdWxkIGJlIGRlY3JlYXNlZCBpbiBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZG9wdExheW91dFBhbmVzVG9GaXRDdXJyZW50U2l6ZShzaXplOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBzdW1PZlBhbmVzV2l0b3V0RHluYW1pYyA9IHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgbGV0IG5lZWRlZFNpemUgPSBzdW1PZlBhbmVzV2l0b3V0RHluYW1pYyAtIHNpemU7XHJcbiAgICAgICAgaWYobmVlZGVkU2l6ZSA+IDApe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBnZXQgbGFzdCBub3QgZHluYW1pYyBwYW5lXHJcbiAgICAgICAgICAgIGxldCBsYXN0UGFuZSA9IHRoaXMubGF5b3V0UGFuZXNbdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgIGxhc3RQYW5lLnNpemUgPSBsYXN0UGFuZS5zaXplLSBuZWVkZWRTaXplO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBwYW5lIGF0IHRoZSBnaXZlbiBpbmRleCB3aXRoIHRoZSBnaXZlbiBzaXplIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2VqLlNwbGl0dGVyfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhbmVJZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4T2ZOZXdQYW5lXHJcbiAgICAgKiBAcGFyYW0ge1BhbmVQcm9wZXJ0aWVzfSBwYW5lUHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUGFuZShzcGxpdHRlcjogZWouU3BsaXR0ZXIsIHBhbmVJZDogc3RyaW5nLCBpbmRleE9mTmV3UGFuZTogbnVtYmVyLCBwYW5lUHJvcGVydGllczogUGFuZVByb3BlcnRpZXMpe1xyXG4gICAgICAgIGxldCBuZXdJdGVtO1xyXG4gICAgICAgIGlmKCF0aGlzLl9pc1Jlc3BvbnNpdmUgJiYgcGFuZVByb3BlcnRpZXMucGFuZVNpemUgIT0gLTEpe1xyXG4gICAgICAgICAgICBpZihpbmRleE9mTmV3UGFuZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZOZXdQYW5lKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3SXRlbT0gc3BsaXR0ZXIucmVtb3ZlSXRlbShpbmRleE9mTmV3UGFuZS0xKTtcclxuXHJcbiAgICAgICAgICAgIG5ld0l0ZW09IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHBhbmVJZCArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuJz48L2Rpdj5cIiwgeyBwYW5lU2l6ZTogcGFuZVByb3BlcnRpZXMucGFuZVNpemUsIGV4cGFuZGFibGU6IHBhbmVQcm9wZXJ0aWVzLmV4cGFuZGFibGUsIGNvbGxhcHNpYmxlOiBwYW5lUHJvcGVydGllcy5jb2xsYXBzaWJsZSwgbWluU2l6ZTogcGFuZVByb3BlcnRpZXMubWluU2l6ZX0sIGluZGV4T2ZOZXdQYW5lLTEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9DaGVjayBzcGxpdHRlciBzaXplOiBJbmNyZWFzZSBoZWlnaHQgb2Ygc3BsaXR0ZXIgaWYgaXQgaXMgbm90IGJpZyBlbm91Z2ggdG8gaW5zZXJ0IGEgbmV3IGNoYXJ0XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNQYW5lTWluU2l6ZShzcGxpdHRlcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCArIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuZXdJdGVtPSBzcGxpdHRlci5hZGRJdGVtKFwiPGRpdiBpZD0nXCIgKyB0aGlzLmdldExhc3RQYW5lSWQoKSArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJSc+PC9kaXY+XCIsIHsgcGFuZVNpemU6IDQwMCwgZXhwYW5kYWJsZTogZmFsc2UsIGNvbGxhcHNpYmxlOiBmYWxzZX0sIGluZGV4T2ZOZXdQYW5lKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG5ld0l0ZW0gPSBzcGxpdHRlci5hZGRJdGVtKFwiPGRpdiBpZD0nXCIgKyBwYW5lSWQgKyBcIicgc3R5bGU9J292ZXJmbG93OmhpZGRlbic+PC9kaXY+XCIsIHsgcGFuZVNpemU6IHBhbmVQcm9wZXJ0aWVzLnBhbmVTaXplLCBleHBhbmRhYmxlOiBwYW5lUHJvcGVydGllcy5leHBhbmRhYmxlLCBjb2xsYXBzaWJsZTogcGFuZVByb3BlcnRpZXMuY29sbGFwc2libGUsIG1pblNpemU6IHBhbmVQcm9wZXJ0aWVzLm1pblNpemV9LCBpbmRleE9mTmV3UGFuZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihuZXdJdGVtLnRvU3RyaW5nKCkgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogc3BsaXR0ZXIuYWRkSXRlbVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbmV3SXRlbVswXS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGl2IGlkIG9mIHRoZSBsYXN0IHBhbmVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMYXN0UGFuZUlkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluRGl2SWQgKyBcIl9sYXN0UGFuZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGl2IGlkIG9mIGEgcGFuZSBmb3IgdGhlIGdpdmVuIHdpZGdldG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQYW5lRGl2SWQobmFtZTogc3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkRpdklkICsgXCJwYW5lX1wiICsgbmFtZS5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICogIFJlbW92ZXMgdGhlIHBhbmUgd2l0aCB0aGUgZ2l2ZW4gaW5kZXggZnJvbSB0aGUgc3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlUGFuZShzcGxpdHRlciwgcGFuZUluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIHNwbGl0dGVyLnJlbW92ZUl0ZW0ocGFuZUluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lKHByb3BlcnRpZXMsIG9sZFBhbmVTaXplcywgd2lkZ2V0OiBJV2lkZ2V0LCB2aWV3VHlwZSl7XHJcbiAgICAgICAgaWYodGhpcy5faXNSZXNwb25zaXZlKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGFMYXlvdXRQYW5lc0FmdGVyQWRkaW5nTmV3UGFuZVJlc3BvbnNpdmUocHJvcGVydGllcywgd2lkZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsgIFxyXG4gICAgICAgICAgICBvbGRQYW5lU2l6ZXNbb2xkUGFuZVNpemVzLmxlbmd0aC0xXSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoLTE7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZihvbGRQYW5lU2l6ZXNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplID0gb2xkUGFuZVNpemVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLmxheW91dFBhbmVzW2ldLm5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB3aWRnZXQud2lkZ2V0TmFtZSArIFwiX1wiKyB2aWV3VHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyhuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1smXFwvXFxcXCMsKyggKSR+JS4nXCI6Kj88Pnt9XS9nLCdfJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFuZVdpZGdldCA9IHdpZGdldDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lV2lkZ2V0ID0gdGhpcy5sYXlvdXRQYW5lc1tpXS53aWRnZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFBhbmVzW2ldICA9ICBuZXcgTGF5b3V0UGFuZShuYW1lLCBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplLCBwYW5lV2lkZ2V0LCBmYWxzZSwgdHJ1ZSwgcHJvcGVydGllc1tpXS5leHBhbmRhYmxlLCBwcm9wZXJ0aWVzW2ldLmNvbGxhcHNpYmxlLCBwcm9wZXJ0aWVzW2ldLm1pblNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRhTGF5b3V0UGFuZXNBZnRlckFkZGluZ05ld1BhbmVSZXNwb25zaXZlKHByb3BlcnRpZXMsIHdpZGdldCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBqID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihqID09IGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhbmVXaWRnZXQgPSB3aWRnZXQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHBhbmVXaWRnZXQgPSB0aGlzLmxheW91dFBhbmVzW2ldLndpZGdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheW91dFBhbmVzW2ldID0gbmV3IExheW91dFBhbmUobmFtZSwgcHJvcGVydGllc1tpXS5wYW5lU2l6ZSwgcGFuZVdpZGdldCwgZmFsc2UsIHRydWUsIHByb3BlcnRpZXNbaV0uZXhwYW5kYWJsZSwgcHJvcGVydGllc1tpXS5jb2xsYXBzaWJsZSwgcHJvcGVydGllc1tpXS5taW5TaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHByb3BlcnRpZXMgd2l0aCB0aGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIGxheW91dFBhbmUgZGVmaW5pdGlvbnM7XHJcbiAgICAgKiBTaXplIG9mIGR5bmFtaWMgcGFuZSB3aWxsIGJlIGNhbGN1bGF0ZWQgYnkgdXNpbmcgdGhlIGFjdHVhbCB3aWRnZXQgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb3BlcnRpZXNJbmZvcm1hdGlvbnNXaXRoTGF5b3V0UGFuZXNEYXRhKHByb3BlcnRpZXMpeyAgIFxyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lLmZpbGxTcGFjZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBsYXlvdXRQYW5lLnNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fYWN0dWFsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gdGhpcy5fYWN0dWFsSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5wYW5lU2l6ZSA9IHNpemUgLSB0aGlzLnN1bU9mRGVmaW5lZExheW91dFBhbmVTaXplcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0uZXhwYW5kYWJsZSA9IGxheW91dFBhbmUuZXhwYW5kYWJsZTtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLmNvbGxhcHNpYmxlID0gbGF5b3V0UGFuZS5jb2xsYXBzaWJsZTtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnJlc2l6YWJsZSA9IGxheW91dFBhbmUucmVzaXphYmxlO1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ubWluU2l6ZSA9IGxheW91dFBhbmUubWluaW11bVNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgICAqIHJlc2l6ZSB0aGUgc3BsaXR0ZXIgYW5kIHVwZGF0ZSB0aGUgc3BsaXR0ZXIgcGFuZXNpemVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzaXplU3BsaXR0ZXIod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuXHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwid2lkdGhcIiwgd2lkdGgsIHRydWUpO1xyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiLCBoZWlnaHQsIHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVQYW5lUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgIH0gIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgc3BsaXR0ZXIgaGFzIGVub3VnaCBzaXplIHRvIGluc2VydCBhbGwgbmVjZXNzYXJ5IGNoYXJ0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtlai5TcGxpdHRlcn0gc3BsaXR0ZXJcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFzUGFuZU1pblNpemUoc3BsaXR0ZXI6IGVqLlNwbGl0dGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG1pbkhlaWdodCA9IDA7XHJcbiAgICAgICAgbGV0IHN1bU9mUGFuZUhlaWdodHMgPSBtaW5IZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChzcGxpdHRlci5tb2RlbC5wcm9wZXJ0aWVzICYmIHNwbGl0dGVyLm1vZGVsLnByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL01pbiBoZWlnaHQgb2Ygc3BsaXR0ZXIgPT4gbGFzdFBhbmVTaXplICsgYmFyIHNpemUgKDQwOSkgKyBtaW5TaXplIG9mIGFsbCBjaGFydHMgKyB0aGUgYmFyIGhlaWdodCBiZXR3ZWVuIGNoYXJ0cyg5KVxyXG4gICAgICAgICAgICBtaW5IZWlnaHQgPSA0MDkgKyAoc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcy5sZW5ndGggLSAxKSAqIDk7XHJcbiAgICAgICAgICAgIHN1bU9mUGFuZUhlaWdodHMgPSAoc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcy5sZW5ndGggLSAxKSAqIDk7XHJcblxyXG4gICAgICAgICAgICBzcGxpdHRlci5tb2RlbC5wcm9wZXJ0aWVzLmZvckVhY2gocGFuZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQgKz0gcGFuZS5taW5TaXplO1xyXG4gICAgICAgICAgICAgICAgc3VtT2ZQYW5lSGVpZ2h0cyArPSBwYW5lLnBhbmVTaXplO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHN1bU9mUGFuZUhlaWdodHMgPj0gbWluSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHBhbmVzaXplIGluIHRoZSBwcm9wZXJ0aWVzIGZvciB0aGUgbmV3IGhlaWdodC93aWR0aFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQYW5lUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFsbCBrbm93IHBhbmUgc2l6ZXNcclxuICAgICAgICB0aGlzLnNldEtub3duUGFuZVNpemVzKHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFsbCBkeW5hbWljIHBhbmUgc2l6ZXNcclxuICAgICAgICB0aGlzLnNldER5bmFtaWNQYW5lU2l6ZXMocHJvcGVydGllcywgd2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRLbm93blBhbmVTaXplcyhwcm9wZXJ0aWVzKXtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RHluYW1pY1BhbmVTaXplcyhwcm9wZXJ0aWVzLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gIHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYobGF5b3V0UGFuZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGxheW91dFBhbmUuZmlsbFNwYWNlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBoZWlnaHQgLSB0aGlzLnN1bU9mRGVmaW5lZFBhbmVTaXplcygpOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSB3aWR0aCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIHByb3BlcnRpZXMocGFuZXNpemVzLCAuLi4pIHRvIHRoZSBlanNwbGl0dGVyXHJcbiAgICAgKiBpZiB0aGUgbGFzdCBwYW5lc2l6ZSBpcyB1bmRlciAxcHggYSBjb3JyZWN0aW9uIG9mIHRoZSBwYW5lc2l6ZSB3aWxsIGJlIGRvbmU7IG9jY3VyZXMgc29tZXRpbWVzIGluIGNhc2Ugb2YgYnJvd3NlciB6b29tXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKXtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgIGlmKCg8YW55PnNwbGl0dGVyKS5wYW5lcy5sZW5ndGggPiAwKSB7IFxyXG4gICAgICAgICAgICBsZXQgbGFzdFBhbmUgPSAoPGFueT5zcGxpdHRlcikucGFuZXNbKDxhbnk+c3BsaXR0ZXIpLnBhbmVzLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgaWYobGFzdFBhbmUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0UGFuZVNpemVTdHJpbmcgPSBsYXN0UGFuZS5zdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFuZVNpemVTdHJpbmcgPSBsYXN0UGFuZS5zdHlsZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdFBhbmVTaXplID0gcGFyc2VGbG9hdChsYXN0UGFuZVNpemVTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgaWYobGFzdFBhbmVTaXplIDw9IDAuOTk5OSAmJiBwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoLTFdLnBhbmVTaXplID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2l6ZSBvZiBsYXN0IHNwbGl0dGVyIHBhbmUgd2FzIG5vdCBzZXQgY29ycmVjdCA9PiB0byBsZXNzIHNwYWNlIVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGJyb3dzZXIgem9vbSBpcyB1c2VkIHRoZSBzaXplcyB3aWxsIGJlIGRlZmluZWQgd2l0aCBkZWNpbWFscGxhY2VzO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBlalNwbGl0dGVyIHNldHMgdGhlIHNpemUgb2YgdGhlIGxhc3QgcGFuZSB0byAwIGlmIGl0IGlzIGEgbGl0dGxlIGJpdCB0byB0YWxsIChlLmcuIFwiMC4xcHhcIikgPT4gcGFuZSB3aWxsIG5vdCBiZSBzaG93blxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBsYXN0IHBhbmUgYSBsaXR0bGUgYml0IHNtYWxsZXJcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoLTFdLnBhbmVTaXplLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNwbGl0dGVyIHBhbmUgY29udGVudCBzaXplcyAod2lkZ2V0IHNpemVzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICAvLyBTZXQgdGhlIHNpemVzIG9mIHRoZSBzcGxpdHRlciBwYW5lY29udGVudHNcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxheW91dFBhbmVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHRoaXMuX3dpZGdldHMuZ2V0KHRoaXMubGF5b3V0UGFuZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZGdldFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0SGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2luZGV4XS5maWxsU3BhY2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldEhlaWdodCA9IGhlaWdodCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdpZGdldEhlaWdodCA8IDApeyAvLyBObyBwbGFjZSBmb3IgZHluYW1pYyBwYW5lLCBtYXliZSBhbHNvIG90aGVyIHBhbmVzIGhhdmUgdG8gYmUgYWRvcHRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZG9wdExheW91dFBhbmVzVG9GaXRDdXJyZW50U2l6ZShoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRIZWlnaHQgPSB0aGlzLmxheW91dFBhbmVzW2luZGV4XS5zaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLmZpbGxTcGFjZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0V2lkdGggPSB3aWR0aCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdpZGdldFdpZHRoIDwgMCl7IC8vIE5vIHBsYWNlIGZvciBkeW5hbWljIHBhbmUsIG1heWJlIGFsc28gb3RoZXIgcGFuZXMgaGF2ZSB0byBiZSBhZG9wdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkb3B0TGF5b3V0UGFuZXNUb0ZpdEN1cnJlbnRTaXplKHdpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldFdpZHRoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRXaWR0aCA9IHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLnNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnJlc2l6ZSh3aWRnZXRXaWR0aCwgd2lkZ2V0SGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vUGVyc2lzdCBkYXRhIGV2ZXJ5IHRpbWUgYSBzcGxpdHRlciBpcyByZXNpemVkXHJcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxheW91dCBwYW5lcyBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdGJhckluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHByZXZQYW5lU2l6ZVxyXG4gICAgICogQHBhcmFtIHsqfSBuZXh0UGFuZVNpemVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxheW91dFBhbmVzT25TcGxpdHRlclJlc2l6ZShzcGxpdGJhckluZGV4LCBwcmV2UGFuZVNpemUsIG5leHRQYW5lU2l6ZSl7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleCArIDFdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3NwbGl0YmFySW5kZXggKyAxXS5wYW5lU2l6ZSA9IHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleCArIDFdLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tzcGxpdGJhckluZGV4KzFdLnNpemUgPSBuZXh0UGFuZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG9sZFNpemUgPSB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemVcclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemUgPSBwcmV2UGFuZVNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCArPSAocHJldlBhbmVTaXplIC0gb2xkU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvcnJlY3RzIHRoZSB0YXJnZXQgaW5kZXggaWYgc291cmNlIGluZGV4IGlzIGJlZm9yZSB0YXJnZXQgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0YVRhcmdldFBhbmVJbmRleChzb3VyY2VQYW5lSW5kZXg6IG51bWJlciwgdGFyZ2V0UGFuZUluZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYoc291cmNlUGFuZUluZGV4IDwgdGFyZ2V0UGFuZUluZGV4KXtcclxuICAgICAgICAgICAgLy8gbW92ZWQgZWxlbWVudCBpcyBpbiBsaXN0IGJlZm9yZSB0YXJnZXQgcG9zaXRpb24gYW5kIHdhcyByZW1vdmVkIGJlZm9yZSwgc28gaW5kZXggbXVzdCBiZSBkZWNyZWFzZWQgdG8gZ2V0IGNvcnJlY3QgaW5zZXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHRhcmdldFBhbmVJbmRleC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0UGFuZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBlalNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKXtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGVqU3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyl7XHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiLCBwcm9wZXJ0aWVzLCB0cnVlKTsgLy8gZm9yY2UgdGhlIHNldHRpbmcgdG8gcmVzaXplIHRoZSBjaGFydCBzcGxpdHRlcnNcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwcm9wZXJ0aWVzID0+IG1vdmVzIHRoZSBwcm9wZXJ0eSBpbmZvcm1hdGlvbnMgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0IGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvcGVydGllc0xpc3QocHJvcGVydGllcywgc291cmNlUGFuZUluZGV4OiBudW1iZXIsIHRhcmdldFBhbmVJbmRleDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcGFuZVByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzW3NvdXJjZVBhbmVJbmRleF07XHJcbiAgICAgICAgcHJvcGVydGllcy5zcGxpY2Uoc291cmNlUGFuZUluZGV4LCAxKTtcclxuICAgICAgICBwcm9wZXJ0aWVzLnNwbGljZSh0YXJnZXRQYW5lSW5kZXgsIDAsIHBhbmVQcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxheW91dCBwYW5lcyBsaXN0IGFmdGVyIG1vdmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGxheW91dFBhbmVcclxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlUGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTGF5b3V0UGFuZXNMaXN0QWZ0ZXJNb3ZpbmcobGF5b3V0UGFuZSwgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpe1xyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMuc3BsaWNlKHNvdXJjZVBhbmVJbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcy5zcGxpY2UodGFyZ2V0UGFuZUluZGV4LCAwLCBsYXlvdXRQYW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhbmUgaW5kZXggb2YgdGhlIGdpdmVuIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVJbmRleCh3aWRnZXQpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHBhbmVJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0ud2lkZ2V0ID09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICBwYW5lSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYW5lSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSB3aWRnZXQgZnJvbSB0aGUgd2lkZ2V0cyBsaXN0IG9mIHRoaXMgbGF5b3V0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlV2lkZ2V0RnJvbUxpc3Qod2lkZ2V0KXtcclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldFRlbXAsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXRUZW1wID09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aWRnZXRzLmRlbGV0ZShrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkanVzdCBjaGFydHMgZGl2IGNvbnRhaW5lciA9PiByZW1vdmUgY2hhcnQgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpemVUb1JlbW92ZVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRqdXN0Q2hhcnRzRGl2Q29udGFpbmVyU2l6ZShzaXplVG9SZW1vdmUpe1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5oZWlnaHQhID0gKHRoaXMubWFpbkRpdi5vZmZzZXRIZWlnaHQhIC0gc2l6ZVRvUmVtb3ZlIC0gNDAwICsgdGhpcy5fZGVmYXVsdFNwbGl0dGVyU2l6ZSkgKyBcInB4XCI7IC8vIFJlbW92ZSBwYW5lIHNpemUgKyBzcGxpdHRlciBzaXplKDlweClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBBZGp1c3QgZWpTcGxpdHRlciBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gc2l6ZVRvUmVtb3ZlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBuZXcgc3BsaXR0ZXIgc2l6ZSBhZnRlciByZW1vdmluZ1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRqdXN0U3BsaXR0ZXJTaXplKHNwbGl0dGVyLCBzaXplVG9SZW1vdmUpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IGFjdHVhbFNwbGl0dGVySGVpZ2h0ID0gc3BsaXR0ZXIub3B0aW9uKFwiaGVpZ2h0XCIpO1xyXG4gICAgICAgIGxldCBuZXdTcGxpdHRlckhlaWdodCA9IHBhcnNlSW50KGFjdHVhbFNwbGl0dGVySGVpZ2h0LCAxMCk7IC8vIHBhcnNlSW50IHRvIHJlbW92ZSBcInB4XCJcclxuICAgICAgICBuZXdTcGxpdHRlckhlaWdodCAtPSBzaXplVG9SZW1vdmUgKyB0aGlzLl9kZWZhdWx0U3BsaXR0ZXJTaXplOyAvLyBSZW1vdmUgcGFuZSBzaXplICsgc3BsaXR0ZXIgc2l6ZSg5cHgpXHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwiaGVpZ2h0XCIsIG5ld1NwbGl0dGVySGVpZ2h0LCB0cnVlKTsgLy8gVE9ETzogbm90IG9ubHkgaGVpZ2h0LCBhbHNvIHdpZHRoIFxyXG4gICAgICAgIHJldHVybiBuZXdTcGxpdHRlckhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vdGlmaWVzIHRoYXQgc3BsaXR0ZXIgaGFzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uU3BsaXR0ZXJSZXNpemUoYXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGF5b3V0UGFuZXNPblNwbGl0dGVyUmVzaXplKGFyZ3Muc3BsaXRiYXJJbmRleCwgYXJncy5wcmV2UGFuZS5zaXplLCBhcmdzLm5leHRQYW5lLnNpemUpO1xyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgd2l0aCBvbmx5IHRoZSBzaXplcyBvZiB0aGUgcGFuZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGFuZVNpemVzKHByb3BlcnRpZXMpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICB2YXIgcGFuZVNpemVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xyXG4gICAgICAgICAgICBwYW5lU2l6ZXMucHVzaChwcm9wZXJ0eS5wYW5lU2l6ZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhbmVTaXplcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtTcGxpdHRlcldpZGdldH07Il19
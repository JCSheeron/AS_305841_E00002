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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
define(["require", "exports", "./model/configManagerWidgetDataModel", "../common/treeGridWidgetBase", "./view/cmTreeGridCellEditTemplate", "./view/cmTreeGridCellEditEvents", "./view/cmTreeGridCellStyle", "./view/cmTreeGridToolbar", "../../framework/property", "../../models/online/mappCockpitComponent", "./componentDefaultDefinition", "../common/widgetBase"], function (require, exports, configManagerWidgetDataModel_1, treeGridWidgetBase_1, cmTreeGridCellEditTemplate_1, cmTreeGridCellEditEvents_1, cmTreeGridCellStyle_1, cmTreeGridToolbar_1, property_1, mappCockpitComponent_1, componentDefaultDefinition_1, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigManagerWidget = /** @class */ (function (_super) {
        __extends(ConfigManagerWidget, _super);
        function ConfigManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * is edit mode active in the widget
             *
             * @private
             * @type {boolean}
             * @memberof ConfigManagerWidget
             */
            _this._editModeActive = false;
            _this._methods = property_1.Property.create([]);
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        ConfigManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Configuration");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        ConfigManagerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        Object.defineProperty(ConfigManagerWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof ConfigManagerWidget
             */
            set: function (methodsLink) {
                var _this = this;
                methodsLink.changed(function () {
                    _this._methods = methodsLink;
                    // get the save configuration method
                    _this._saveParametersMethod = _this.retrieveSaveParametersMethod();
                    // disable save button
                    var toolbar = _this._toolbar;
                    toolbar.saveButtonExecutable(false);
                    // enable the save button depending on executable state.
                    if (_this._saveParametersMethod) {
                        toolbar.saveButtonExecutable(_this._saveParametersMethod.isExecutable.value);
                        _this._saveParametersMethod.isExecutable.changed(function (isExecutable) {
                            toolbar.saveButtonExecutable(isExecutable);
                        });
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        ConfigManagerWidget.prototype.retrieveSaveParametersMethod = function () {
            return this._methods.value.filter(function (method) { return method.browseName == "Save Config"; })[0];
        };
        Object.defineProperty(ConfigManagerWidget.prototype, "configurationParameters", {
            /**
             * Sets the configurationparameters as the data source for the configuration manager widget
             *
             * @memberof ConfigManagerWidget
             */
            set: function (componentParameters) {
                var configManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ConfigManagerDataModel);
                if (configManagerDataModel != undefined) {
                    configManagerDataModel.setEditModeActive(this._editModeActive);
                    configManagerDataModel.configurationParameters = componentParameters;
                    this.dataModel = configManagerDataModel;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates the layout of the widget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.createLayout = function () {
            this.mainDiv.style.overflow = "hidden";
            $(this.mainDiv).append(this.getScriptInformationForTreeGrid());
            _super.prototype.createLayout.call(this);
        };
        /**
         * Sets the component settings deactivates the edit settings by default
         *
         * @param {ComponentSettings} data
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
            // Deactivate the edit mode by default
            this.setEditMode(false);
        };
        /**
         * Returns the template for the display name column (Icons, expand state, display name...)
         *
         * @private
         * @returns {string}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getScriptInformationForTreeGrid = function () {
            var str = "<script type=\"text/x-jsrender\" id=\"cmDisplayNameColumnTemplate\">\n\t\t\t\t<div style='height:24px;' unselectable='on'>\n\t\t\t\t\t<div class='cmIndent' style='width:{{:level*20}}px;'></div>\n                    <div class='cmCollapseExpandIcon'>{{:#data['collapseExpandIconDefinition']}}</div>\n                    <div class='cmNodeIcon'>{{:#data['iconDefinition']}}</div>                   \n                                     \n                    <div class='e-cell cmCell' unselectable='on'>{{:#data['displayName']}}</div>\n                    </div>\n\t\t</script>";
            return str;
        };
        /**
         * Load the styles for the config manager
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/configManagerWidget/style/css/treeGridIconStyles.css");
        };
        ConfigManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            // delegate model change processing depending on change type (hint)
            switch (eventArgs.hint) {
                case "writeAccessChanged":
                    this.handleWriteAccessChanged(eventArgs.data);
                    break;
                default:
                    this.updateGridData(sender);
            }
        };
        /**
         * Handles write access changes.
         *
         * @private
         * @param {boolean} writeAccess
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.handleWriteAccessChanged = function (writeAccess) {
            this.updateWriteAccess(writeAccess);
        };
        /**
         * Updates write access related ui states.
         *
         * @param {boolean} writeAccess
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.updateWriteAccess = function (writeAccess) {
            if (this._configManagerWidgetDataModel != undefined) {
                this._configManagerWidgetDataModel.writeAccess = writeAccess;
            }
            var toolbar = this._toolbar;
            toolbar.setWriteAccess(writeAccess);
            this.refresh();
        };
        /**
         * Applies the modified parameters (writes them to target)
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.applyModifiedParameters = function () {
            if (this._configManagerWidgetDataModel) {
                this._configManagerWidgetDataModel.applyModifiedParameters();
            }
        };
        /**
         * Discards parameter modifications
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.discard = function () {
            if (this._configManagerWidgetDataModel) {
                this._configManagerWidgetDataModel.discard();
            }
        };
        /**
         * Executes the save parameters method
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.saveParameters = function () {
            if (this._saveParametersMethod != undefined) {
                if (this._saveParametersMethod.isExecutable != undefined) {
                    if (this._saveParametersMethod.isExecutable.value == true) {
                        mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._saveParametersMethod);
                    }
                }
            }
        };
        /**
         * Activates/Deactivates the edit mode
         *
         * @param {boolean} activate
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.setEditMode = function (activate) {
            this._editModeActive = activate;
            // Set the info if the editmode is active or not to the datamodel
            if (!(this.dataModel instanceof widgetBase_1.NullDataModel)) {
                this.dataModel.setEditModeActive(activate);
            }
            // Show or hide edit mode columns
            var treeObject = this.getTreeGridObject();
            var modifiedValueColumn = treeObject.getColumnByField(ConfigManagerWidget.displayModifiedValueColumnId);
            if (activate == true) {
                treeObject.showColumn(modifiedValueColumn.headerText);
            }
            else {
                treeObject.hideColumn(modifiedValueColumn.headerText);
            }
            this.updateGridData(this.dataModel);
            // Update toolbar button positions(e.g. position of right align toolbar) after hide or show toolbar button
            this._toolbar.resize(this.width);
        };
        /**
         * Handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.updateGridData(sender);
        };
        /**
         * Activate the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.activate = function () {
            var componentParameters = this.getComponentParameters();
            if (componentParameters != undefined) {
                mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this.dataModel, componentParameters);
            }
        };
        /**
         * Deactivate the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.deactivate = function () {
            var componentParameters = this.getComponentParameters();
            if (componentParameters) {
                mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this.dataModel, componentParameters);
            }
        };
        /**
         * Dispose the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.dispose = function () {
            var componentParameters = this.getComponentParameters();
            if (componentParameters) {
                mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this.dataModel, componentParameters);
            }
            if (this.dataModel != undefined) {
                this.dataModel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the tree grid for the configuration structure
         *
         * @protected
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var cellEditEvents = new cmTreeGridCellEditEvents_1.CmTreeGridCellEditEvents();
            var cellStyle = new cmTreeGridCellStyle_1.CmTreeGridCellStyle();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { dataSource: undefined, childMapping: "childs", expandStateMapping: "expandState", isResponsive: false, allowReordering: false, editSettings: {
                    allowEditing: true,
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false,
                }, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, queryCellInfo: function (args) { return cellStyle.setCellStyle(args, _this._configManagerWidgetDataModel); }, beginEdit: function (args) { return cellEditEvents.beginEdit(args, _this._configManagerWidgetDataModel); }, endEdit: function (args) { return cellEditEvents.endEdit(args, _this._configManagerWidgetDataModel); }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: ConfigManagerWidget.displayNameColumnId, headerText: "Name", width: "300", isTemplateColumn: true, templateID: "cmDisplayNameColumnTemplate" },
                    { field: ConfigManagerWidget.displayModifiedValueColumnId, headerText: "Value", visible: false, width: "180", editType: "stringedit", editTemplate: cmTreeGridCellEditTemplate_1.CmTreeGridCellEditTemplate.createInstance() },
                    { field: ConfigManagerWidget.displayValueColumnId, headerText: "Target Value", width: "180", editType: "stringedit", editTemplate: cmTreeGridCellEditTemplate_1.CmTreeGridCellEditTemplate.createInstance() },
                    { field: ConfigManagerWidget.unitColumnId, headerText: "Unit", width: "100" },
                    { field: ConfigManagerWidget.descriptionColumnId, headerText: "Description", width: "400" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new cmTreeGridToolbar_1.CmTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * Handles the collapse/expand events
         *
         * @private
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        /**
         * Returns the component parameters from the datamodel
         *
         * @private
         * @returns {(Array<MappCockpitComponentParameter>|undefined)}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getComponentParameters = function () {
            return this.dataModel.componentParameters;
        };
        /**
         * Updates the grids data
         *
         * @private
         * @param {IDataModel} dataModel
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.updateGridData = function (dataModel) {
            var newDataModel = new configManagerWidgetDataModel_1.ConfigManagerWidgetDataModel(dataModel);
            if (this._configManagerWidgetDataModel != undefined) {
                newDataModel.writeAccess = this._configManagerWidgetDataModel.writeAccess;
                // set expands states from the current to the new datamodel
                newDataModel.setExpandStates(this._configManagerWidgetDataModel.getDataModel());
                this._configManagerWidgetDataModel.dispose();
            }
            this._configManagerWidgetDataModel = newDataModel;
            var toolbar = this._toolbar;
            toolbar.setTransferPossible(this._configManagerWidgetDataModel.isTransferPossible);
            this.refresh();
        };
        /**
         * refreshes the tree grids data
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.refresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                var datamodel;
                return __generator(this, function (_a) {
                    if (this._configManagerWidgetDataModel != undefined && this.refreshEnabled) {
                        datamodel = this._configManagerWidgetDataModel.getDataModel();
                        this.setModelWithEditSupport(datamodel);
                    }
                    return [2 /*return*/];
                });
            });
        };
        // column definitions
        ConfigManagerWidget.displayNameColumnId = "displayName";
        ConfigManagerWidget.displayModifiedValueColumnId = "modifiedDisplayValue";
        ConfigManagerWidget.displayValueColumnId = "displayValue";
        ConfigManagerWidget.unitColumnId = "unit";
        ConfigManagerWidget.descriptionColumnId = "description";
        return ConfigManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.ConfigManagerWidget = ConfigManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L2NvbmZpZ01hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBO1FBQWtDLHVDQUFrQjtRQUFwRDtZQUFBLHFFQTZiQztZQTNhRzs7Ozs7O2VBTUc7WUFDSyxxQkFBZSxHQUFZLEtBQUssQ0FBQztZQXlCakMsY0FBUSxHQUErQyxtQkFBUSxDQUFDLE1BQU0sQ0FBK0IsRUFBRSxDQUFDLENBQUM7O1FBMllySCxDQUFDO1FBbGFHOzs7OztXQUtHO1FBQ0gsZ0RBQWtCLEdBQWxCO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQseUNBQVcsR0FBWDtZQUNJLGlCQUFNLFdBQVcsV0FBRSxDQUFDO1lBRXBCLGlCQUFNLGdCQUFnQixZQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRXhDLDhCQUE4QjtZQUM5QixpQkFBTSxnQkFBZ0IsWUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELGlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQVVELHNCQUFXLHdDQUFPO1lBTGxCOzs7O2VBSUc7aUJBQ0gsVUFBbUIsV0FBd0Q7Z0JBQTNFLGlCQWdCQztnQkFmRyxXQUFXLENBQUMsT0FBTyxDQUFDO29CQUNoQixLQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztvQkFDNUIsb0NBQW9DO29CQUNwQyxLQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7b0JBQ2pFLHNCQUFz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QixHQTZibkQ7SUFFUSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy9jbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxTdHlsZSB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxTdHlsZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IElDb25maWdNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb25maWdNYW5hZ2VyV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IE51bGxEYXRhTW9kZWwgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuXHJcbmNsYXNzIENvbmZpZ01hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJQ29uZmlnTWFuYWdlcldpZGdldCB7XHJcbiAgICBcclxuICAgIC8vIGNvbHVtbiBkZWZpbml0aW9uc1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGlzcGxheU5hbWVDb2x1bW5JZCA9IFwiZGlzcGxheU5hbWVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGlzcGxheU1vZGlmaWVkVmFsdWVDb2x1bW5JZCA9IFwibW9kaWZpZWREaXNwbGF5VmFsdWVcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRpc3BsYXlWYWx1ZUNvbHVtbklkID0gXCJkaXNwbGF5VmFsdWVcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHVuaXRDb2x1bW5JZCA9IFwidW5pdFwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVzY3JpcHRpb25Db2x1bW5JZCA9IFwiZGVzY3JpcHRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGhvbGRzIHRoZSB1aSBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsOiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsfHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBpcyBlZGl0IG1vZGUgYWN0aXZlIGluIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9lZGl0TW9kZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ29uZmlndXJhdGlvblwiKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigzLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kczpQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4+ID0gUHJvcGVydHkuY3JlYXRlPE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+KFtdKTtcclxuICAgIHByaXZhdGUgX3NhdmVQYXJhbWV0ZXJzTWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtZXRob2RzIGRhdGEgbGluayBhcyBhIHJlZmVyZW5jZSB0byB0aGUgbWV0aG9kcyB0byBiZSBkaXNwbGF5ZWRcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtZXRob2RzKG1ldGhvZHNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4+KSB7XHJcbiAgICAgICAgbWV0aG9kc0xpbmsuY2hhbmdlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZHMgPSBtZXRob2RzTGluaztcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBzYXZlIGNvbmZpZ3VyYXRpb24gbWV0aG9kXHJcbiAgICAgICAgICAgIHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kID0gdGhpcy5yZXRyaWV2ZVNhdmVQYXJhbWV0ZXJzTWV0aG9kKCk7XHJcbiAgICAgICAgICAgIC8vIGRpc2FibGUgc2F2ZSBidXR0b25cclxuICAgICAgICAgICAgbGV0IHRvb2xiYXIgPSB0aGlzLl90b29sYmFyIGFzIENtVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgICAgICAgICB0b29sYmFyLnNhdmVCdXR0b25FeGVjdXRhYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gZW5hYmxlIHRoZSBzYXZlIGJ1dHRvbiBkZXBlbmRpbmcgb24gZXhlY3V0YWJsZSBzdGF0ZS5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFyLnNhdmVCdXR0b25FeGVjdXRhYmxlKHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZC5pc0V4ZWN1dGFibGUuY2hhbmdlZCgoaXNFeGVjdXRhYmxlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXIuc2F2ZUJ1dHRvbkV4ZWN1dGFibGUoaXNFeGVjdXRhYmxlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJldHJpZXZlU2F2ZVBhcmFtZXRlcnNNZXRob2QoKTpNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kcy52YWx1ZS5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5icm93c2VOYW1lID09IFwiU2F2ZSBDb25maWdcIilbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb25maWd1cmF0aW9ucGFyYW1ldGVycyBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSBjb25maWd1cmF0aW9uIG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+KSB7XHJcbiAgICAgICBsZXQgY29uZmlnTWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5Db25maWdNYW5hZ2VyRGF0YU1vZGVsKSBhcyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbDtcclxuICAgICAgICBpZihjb25maWdNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbmZpZ01hbmFnZXJEYXRhTW9kZWwuc2V0RWRpdE1vZGVBY3RpdmUodGhpcy5fZWRpdE1vZGVBY3RpdmUpO1xyXG4gICAgICAgICAgICBjb25maWdNYW5hZ2VyRGF0YU1vZGVsLmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBjb25maWdNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5vdmVyZmxvdyA9XCJoaWRkZW5cIjtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKHRoaXMuZ2V0U2NyaXB0SW5mb3JtYXRpb25Gb3JUcmVlR3JpZCgpKTtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlci5jcmVhdGVMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb21wb25lbnQgc2V0dGluZ3MgZGVhY3RpdmF0ZXMgdGhlIGVkaXQgc2V0dGluZ3MgYnkgZGVmYXVsdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50U2V0dGluZ3N9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgICAgIGlmKGRhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgc3VwZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERlYWN0aXZhdGUgdGhlIGVkaXQgbW9kZSBieSBkZWZhdWx0XHJcbiAgICAgICAgdGhpcy5zZXRFZGl0TW9kZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdGVtcGxhdGUgZm9yIHRoZSBkaXNwbGF5IG5hbWUgY29sdW1uIChJY29ucywgZXhwYW5kIHN0YXRlLCBkaXNwbGF5IG5hbWUuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNjcmlwdEluZm9ybWF0aW9uRm9yVHJlZUdyaWQoKSA6IHN0cmluZ3tcclxuXHRcdHZhciBzdHIgPVxyXG5cdFx0YDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwiY21EaXNwbGF5TmFtZUNvbHVtblRlbXBsYXRlXCI+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT0naGVpZ2h0OjI0cHg7JyB1bnNlbGVjdGFibGU9J29uJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J2NtSW5kZW50JyBzdHlsZT0nd2lkdGg6e3s6bGV2ZWwqMjB9fXB4Oyc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY21Db2xsYXBzZUV4cGFuZEljb24nPnt7OiNkYXRhWydjb2xsYXBzZUV4cGFuZEljb25EZWZpbml0aW9uJ119fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NtTm9kZUljb24nPnt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX08L2Rpdj4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdlLWNlbGwgY21DZWxsJyB1bnNlbGVjdGFibGU9J29uJz57ezojZGF0YVsnZGlzcGxheU5hbWUnXX19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblx0XHQ8L3NjcmlwdD5gXHJcblxyXG4gICAgICByZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgdGhlIHN0eWxlcyBmb3IgdGhlIGNvbmZpZyBtYW5hZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L3N0eWxlL2Nzcy90cmVlR3JpZEljb25TdHlsZXMuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuXHRoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgLy8gZGVsZWdhdGUgbW9kZWwgY2hhbmdlIHByb2Nlc3NpbmcgZGVwZW5kaW5nIG9uIGNoYW5nZSB0eXBlIChoaW50KVxyXG4gICAgICAgIHN3aXRjaChldmVudEFyZ3MuaGludCl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3cml0ZUFjY2Vzc0NoYW5nZWRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlV3JpdGVBY2Nlc3NDaGFuZ2VkKGV2ZW50QXJncy5kYXRhIGFzIGJvb2xlYW4pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdyaWREYXRhKHNlbmRlciBhcyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCk7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgd3JpdGUgYWNjZXNzIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd3JpdGVBY2Nlc3NcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlV3JpdGVBY2Nlc3NDaGFuZ2VkKHdyaXRlQWNjZXNzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVXcml0ZUFjY2Vzcyh3cml0ZUFjY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHdyaXRlIGFjY2VzcyByZWxhdGVkIHVpIHN0YXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdyaXRlQWNjZXNzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlV3JpdGVBY2Nlc3Mod3JpdGVBY2Nlc3M6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZih0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwud3JpdGVBY2Nlc3MgPSB3cml0ZUFjY2VzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvb2xiYXIgPSB0aGlzLl90b29sYmFyIGFzIENtVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgICAgIHRvb2xiYXIuc2V0V3JpdGVBY2Nlc3Mod3JpdGVBY2Nlc3MpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwbGllcyB0aGUgbW9kaWZpZWQgcGFyYW1ldGVycyAod3JpdGVzIHRoZW0gdG8gdGFyZ2V0KVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhcHBseU1vZGlmaWVkUGFyYW1ldGVycygpe1xyXG4gICAgICAgIGlmICggdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmFwcGx5TW9kaWZpZWRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzY2FyZHMgcGFyYW1ldGVyIG1vZGlmaWNhdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzY2FyZCgpe1xyXG4gICAgICAgIGlmICggdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmRpc2NhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgc2F2ZSBwYXJhbWV0ZXJzIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlUGFyYW1ldGVycygpe1xyXG4gICAgICAgIGlmICh0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUodGhpcy5fc2F2ZVBhcmFtZXRlcnNNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzL0RlYWN0aXZhdGVzIHRoZSBlZGl0IG1vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RWRpdE1vZGUoYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuX2VkaXRNb2RlQWN0aXZlID0gYWN0aXZhdGU7XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgaW5mbyBpZiB0aGUgZWRpdG1vZGUgaXMgYWN0aXZlIG9yIG5vdCB0byB0aGUgZGF0YW1vZGVsXHJcbiAgICAgICAgaWYoISh0aGlzLmRhdGFNb2RlbCBpbnN0YW5jZW9mIE51bGxEYXRhTW9kZWwpKXtcclxuICAgICAgICAgICAgKHRoaXMuZGF0YU1vZGVsIGFzIElDb25maWdNYW5hZ2VyRGF0YU1vZGVsKS5zZXRFZGl0TW9kZUFjdGl2ZShhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaG93IG9yIGhpZGUgZWRpdCBtb2RlIGNvbHVtbnNcclxuXHRcdGxldCB0cmVlT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpOyBcclxuXHRcdGxldCBtb2RpZmllZFZhbHVlQ29sdW1uID0gdHJlZU9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKENvbmZpZ01hbmFnZXJXaWRnZXQuZGlzcGxheU1vZGlmaWVkVmFsdWVDb2x1bW5JZCk7XHJcblx0XHRpZihhY3RpdmF0ZSA9PSB0cnVlKXtcclxuXHRcdFx0dHJlZU9iamVjdC5zaG93Q29sdW1uKG1vZGlmaWVkVmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHR0cmVlT2JqZWN0LmhpZGVDb2x1bW4obW9kaWZpZWRWYWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHcmlkRGF0YSh0aGlzLmRhdGFNb2RlbCBhcyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVXBkYXRlIHRvb2xiYXIgYnV0dG9uIHBvc2l0aW9ucyhlLmcuIHBvc2l0aW9uIG9mIHJpZ2h0IGFsaWduIHRvb2xiYXIpIGFmdGVyIGhpZGUgb3Igc2hvdyB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIucmVzaXplKHRoaXMud2lkdGgpO1xyXG4gICAgfVxyXG5cdFxyXG5cdC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgY2hhbmdlcyBvZiBvYnNlcnZlZCBpdGVtcyByZXF1ZXN0ZWQgYnkgJ29ic2VydmVEYXRhTW9kZWxJdGVtcydcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG5cdFx0dGhpcy51cGRhdGVHcmlkRGF0YShzZW5kZXIgYXMgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBBY3RpdmF0ZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnMgPSB0aGlzLmdldENvbXBvbmVudFBhcmFtZXRlcnMoKTtcclxuICAgICAgICBpZihjb21wb25lbnRQYXJhbWV0ZXJzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLmRhdGFNb2RlbCwgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGUgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnMgPSB0aGlzLmdldENvbXBvbmVudFBhcmFtZXRlcnMoKTtcclxuICAgICAgICBpZihjb21wb25lbnRQYXJhbWV0ZXJzKXtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuZGVhY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcy5kYXRhTW9kZWwsIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnMgPSB0aGlzLmdldENvbXBvbmVudFBhcmFtZXRlcnMoKTtcclxuICAgICAgICBpZihjb21wb25lbnRQYXJhbWV0ZXJzKXtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLmRhdGFNb2RlbCwgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICAgIFxyXG5cdC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgY29uZmlndXJhdGlvbiBzdHJ1Y3R1cmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuICAgICAgICBsZXQgY2VsbEVkaXRFdmVudHMgPSBuZXcgQ21UcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcbiAgICAgICAgbGV0IGNlbGxTdHlsZSA9IG5ldyBDbVRyZWVHcmlkQ2VsbFN0eWxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcdFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6XCJjaGlsZHNcIixcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogZmFsc2UsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93UmVvcmRlcmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dEZWxldGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1EaWFsb2cgIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybURpYWxvZyAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgXHJcblx0XHRcdGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcblx0XHRcdGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gY2VsbFN0eWxlLnNldENlbGxTdHlsZShhcmdzLCB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKSxcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MsIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IENvbmZpZ01hbmFnZXJXaWRnZXQuZGlzcGxheU5hbWVDb2x1bW5JZCwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIHdpZHRoOiBcIjMwMFwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcImNtRGlzcGxheU5hbWVDb2x1bW5UZW1wbGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDb25maWdNYW5hZ2VyV2lkZ2V0LmRpc3BsYXlNb2RpZmllZFZhbHVlQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgdmlzaWJsZTogZmFsc2UsIHdpZHRoOiBcIjE4MFwiLCBlZGl0VHlwZTogXCJzdHJpbmdlZGl0XCIsIGVkaXRUZW1wbGF0ZTogQ21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKX0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDb25maWdNYW5hZ2VyV2lkZ2V0LmRpc3BsYXlWYWx1ZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIlRhcmdldCBWYWx1ZVwiLCB3aWR0aDogXCIxODBcIiwgZWRpdFR5cGU6IFwic3RyaW5nZWRpdFwiLCBlZGl0VGVtcGxhdGU6IENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmNyZWF0ZUluc3RhbmNlKCl9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ29uZmlnTWFuYWdlcldpZGdldC51bml0Q29sdW1uSWQsIGhlYWRlclRleHQ6IFwiVW5pdFwiLCB3aWR0aDogXCIxMDBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ29uZmlnTWFuYWdlcldpZGdldC5kZXNjcmlwdGlvbkNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHdpZHRoOiBcIjQwMFwiIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBDbVRyZWVHcmlkVG9vbGJhcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk7XHJcbiAgICB9XHRcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGNvbGxhcHNlL2V4cGFuZCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCl7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnMgZnJvbSB0aGUgZGF0YW1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENvbXBvbmVudFBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZGF0YU1vZGVsIGFzIElDb25maWdNYW5hZ2VyRGF0YU1vZGVsKS5jb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cdC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZ3JpZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IGRhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVHcmlkRGF0YShkYXRhTW9kZWw6IElDb25maWdNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgbGV0IG5ld0RhdGFNb2RlbCA9IG5ldyBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKGRhdGFNb2RlbCk7XHJcbiAgICAgICAgaWYodGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBuZXdEYXRhTW9kZWwud3JpdGVBY2Nlc3MgPSB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLndyaXRlQWNjZXNzO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGV4cGFuZHMgc3RhdGVzIGZyb20gdGhlIGN1cnJlbnQgdG8gdGhlIG5ldyBkYXRhbW9kZWxcclxuICAgICAgICAgICAgbmV3RGF0YU1vZGVsLnNldEV4cGFuZFN0YXRlcyh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmdldERhdGFNb2RlbCgpKTtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgPSBuZXdEYXRhTW9kZWw7XHJcbiAgICAgICAgbGV0IHRvb2xiYXIgPSB0aGlzLl90b29sYmFyIGFzIENtVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgICAgIHRvb2xiYXIuc2V0VHJhbnNmZXJQb3NzaWJsZSh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmlzVHJhbnNmZXJQb3NzaWJsZSk7XHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHR9XHJcblx0ICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHRyZWUgZ3JpZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyByZWZyZXNoKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCAhPSB1bmRlZmluZWQgJiYgdGhpcy5yZWZyZXNoRW5hYmxlZCl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhbW9kZWwgPSB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsV2l0aEVkaXRTdXBwb3J0KGRhdGFtb2RlbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENvbmZpZ01hbmFnZXJXaWRnZXQgfTsiXX0=
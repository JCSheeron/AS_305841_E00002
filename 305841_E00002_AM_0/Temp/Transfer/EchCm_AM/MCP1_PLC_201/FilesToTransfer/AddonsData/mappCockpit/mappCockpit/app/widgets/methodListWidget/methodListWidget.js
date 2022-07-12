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
define(["require", "exports", "../../framework/events", "./view/methodsGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "../../models/online/mappCockpitComponentReflection", "../common/domHelper", "./componentDefaultDefinition", "../../common/componentBase/contextIds/ctxComponentView"], function (require, exports, events_1, methodsGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, mappCockpitComponentReflection_1, domHelper_1, componentDefaultDefinition_1, ctxComponentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSelectionChanged = /** @class */ (function (_super) {
        __extends(EventSelectionChanged, _super);
        function EventSelectionChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSelectionChanged;
    }(events_1.TypedEvent));
    ;
    /**
     * implements the MethodList widget
     *
     * @class MethodListWidget
     * @extends {WidgetBase}
     */
    var MethodListWidget = /** @class */ (function (_super) {
        __extends(MethodListWidget, _super);
        function MethodListWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventSelectionChanged = new EventSelectionChanged();
            _this._executableMethods = [];
            _this._quickCommands = [];
            _this._watchableParameters = [];
            return _this;
        }
        MethodListWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        MethodListWidget.prototype.initialized = function () {
            var context = this.component.context;
            if (context != undefined) {
                var componentIdFromContext = context.getContext(ctxComponentView_1.CtxComponentView.componentId);
                if (componentIdFromContext != undefined) {
                    // TODO: create binding to methods with context info
                }
            }
        };
        Object.defineProperty(MethodListWidget.prototype, "quickCommands", {
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodListWidget.prototype, "watchableParameters", {
            set: function (watchableParameters) {
                this._watchableParameters = watchableParameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodListWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof MethodListWidget
             */
            set: function (methods) {
                var _this = this;
                this._executableMethods = methods;
                // initialize the method parameters default values
                this._executableMethods.forEach(function (executableMethod) {
                    mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(executableMethod);
                    _this.observeMethodExecutability(executableMethod);
                });
                this.addToolBarButtons();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Observes if the executability of the methods has changed
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.observeMethodExecutability = function (executableMethod) {
            var _this = this;
            executableMethod.isExecutable.attachObserver(this, function (isExecutable) {
                // refreshes the methods executable state
                _this.refreshMethodState(executableMethod, isExecutable);
            });
        };
        /**
         * Refreshes a single methods executable state.
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @param {boolean} isExecutable
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.refreshMethodState = function (method, isExecutable) {
            if (this.isTreeGridDataSourceInitialized()) {
                this.updateMethodsList();
            }
        };
        /**
         * Activates the method list widget
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.activate = function () {
        };
        /**
         * Dispose some objects from the widget
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.dispose = function () {
            // detach observers
            this.detachMethodsExecutabilityObservation();
            if (this._methodsToolbar != undefined) {
                this._methodsToolbar.dispose();
            }
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, this._watchableParameters);
            _super.prototype.dispose.call(this);
        };
        /**
         * Detaches observation of the methods executability
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.detachMethodsExecutabilityObservation = function () {
            var _this = this;
            this._executableMethods.forEach(function (executableMethod) {
                mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(executableMethod);
                executableMethod.isExecutable.detachObserver(_this);
            });
        };
        /**
         * Loads the styles for the method list toolbar buttons
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/methodListWidget/style/css/methodListToolbarButtonStyle.css");
        };
        /**
         * Creates the tree grid for the methods list
         *
         * @protected
         * @returns {*}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var methodsDataSource = [];
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridToolbarSupport()), { dataSource: methodsDataSource, editSettings: {
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, childMapping: "childs", isResponsive: false, rowSelected: function (args) { return _this.handleMethodListItemSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, queryCellInfo: function (args) { return _this.showMethodDisabledIfNotExecutable(args); } }));
        };
        /**
         * Returns true if dataSource treegrid has been initialized with this._executableMethods
         *
         * @private
         * @returns {boolean}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.isTreeGridDataSourceInitialized = function () {
            var treeGridObj = this.getTreeGridObject();
            if (treeGridObj.model.dataSource != undefined) {
                var dataSource = treeGridObj.model.dataSource;
                //Check if tree grid dataSource has not been initialized.
                if (dataSource.length == 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Command", width: "250" },
                ],
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @protected
         * @returns {{}}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getTreeGridToolbarSupport = function () {
            this._methodsToolbar = new methodsGridToolbar_1.MethodGridToolbar(); // TODO: use _toolbar and super.getTreeGridToolbarSupport()
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._methodsToolbar.getDefaultToolbarButtons()
                },
            };
        };
        /**
         * Add toolbar buttons with quickCommands info
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addToolBarButtons = function () {
            if (this._quickCommands.length > 0) {
                this.addToolbarSettingsToTreeGrid();
                this.addQuickCommandButtons();
            }
            else {
                this.updateMethodsList();
                this._methodsToolbar.addDefaultToolbarButtons();
            }
            this._methodsToolbar.setActualComponentMethods(this._executableMethods);
        };
        /**
         * Add quick command buttons to treegrid's toolbar
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addQuickCommandButtons = function () {
            var _this = this;
            this._quickCommands.forEach(function (command) {
                _this._methodsToolbar.addQuickCommandsToolbarButtons(command.name, command.imageName);
            });
        };
        MethodListWidget.prototype.treeGridCreated = function () {
            //super.treeGridCreated();
            this._methodsToolbar.initToolbar(this.mainDiv);
            // Resize needed because toolbar size is changed
            this.resize(this.width, this.height);
        };
        MethodListWidget.prototype.showMethodDisabledIfNotExecutable = function (args) {
            if (args.column.field == "displayName") {
                if (args.data.item != undefined && args.data.item.isExecutable != undefined) {
                    if (args.cellElement.classList != undefined) {
                        // Show ReadOnly cell with other color
                        var disableTreeCellClassName = "treeCellDisabled";
                        if (args.data.item.isExecutable.value == false) {
                            args.cellElement.classList.add(disableTreeCellClassName);
                        }
                        else {
                            args.cellElement.classList.remove(disableTreeCellClassName);
                        }
                    }
                    domHelper_1.DomHelper.disableElement(args.cellElement, !args.data.item.isExecutable.value);
                }
            }
        };
        /**
         * updates the commands data
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.updateMethodsList = function () {
            $(this.mainDiv).ejTreeGrid({
                dataSource: this.getDataModel()
            });
        };
        MethodListWidget.prototype.getDataModel = function () {
            return this._executableMethods;
            /*let temp = new Array();
            let group1= {childs: new Array(), displayName: "Initialisation"};
            let group2= {childs: new Array(), displayName: "Movement"}
            let group3= {childs: new Array(), displayName: "Others"}
            temp.push(group1);
            temp.push(group2);
            temp.push(group3);
    
            group1.childs = this._executableMethods.slice(0,5);
            group2.childs = this._executableMethods.slice(5,11);
            group3.childs = this._executableMethods.slice(16);
            return temp;*/
        };
        /**
         * First time treegrid is updated, toolbar buttons are inserted
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addToolbarSettingsToTreeGrid = function () {
            $(this.mainDiv).ejTreeGrid({
                dataSource: this.getDataModel(),
                toolbarSettings: {
                    customToolbarItems: this._methodsToolbar.getCustomToolbars(this._quickCommands)
                }
            });
        };
        /**
         * handles selections of method items
         *
         * @param {*} args
         * @returns {*}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.handleMethodListItemSelected = function (args) {
            // update the method parameter list after a method has been selected.
            if (args.data.item && args.data.item instanceof mappCockpitComponent_1.MappCockpitComponentMethod) {
                this.onSelectionChanged(args.data.item);
            }
        };
        MethodListWidget.prototype.onSelectionChanged = function (method) {
            this.eventSelectionChanged.raise(null, method);
        };
        return MethodListWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MethodListWidget = MethodListWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L21ldGhvZExpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBb0MseUNBQTRDO1FBQWhGOztRQUFrRixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQW5GLENBQW9DLG1CQUFVLEdBQXFDO0lBQUEsQ0FBQztJQUVwRjs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQXlVQztZQXZVRywyQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFHNUMsd0JBQWtCLEdBQWlDLEVBQUUsQ0FBQztZQUN0RCxvQkFBYyxHQUF3QyxFQUFFLENBQUM7WUFDekQsMEJBQW9CLEdBQXFDLEVBQUUsQ0FBQzs7UUFrVXhFLENBQUM7UUFoVUcsOENBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELHNDQUFXLEdBQVg7WUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNyQyxJQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQ0FBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDOUUsSUFBRyxzQkFBc0IsSUFBSSxTQUFTLEVBQUM7b0JBQ25DLG9EQUFvRDtpQkFFdkQ7YUFDSjtRQUNMLENBQUM7UUFFRCxzQkFBVywyQ0FBYTtpQkFBeEIsVUFBeUIsYUFBc0Q7Z0JBQzNFLElBQUksQ0FBQyxj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LGNBQWMsQ0FBQztpQkFDbEY7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsdURBQTRCLEdBQTVCLFVBQTZCLElBQVM7WUFDbEMscUVBQXFFO1lBQ3JFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksaURBQTBCLEVBQUU7Z0JBRXhFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQWtDLENBQUMsQ0FBQzthQUN6RTtRQUNMLENBQUM7UUFFTyw2Q0FBa0IsR0FBMUIsVUFBMkIsTUFBa0M7WUFDekQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQXpVRCxDQUErQix1Q0FBa0IsR0F5VWhEO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1ldGhvZExpc3RXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGhvZExpc3RXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IE1ldGhvZEdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9tZXRob2RzR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IEN0eENvbXBvbmVudFZpZXcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29udGV4dElkcy9jdHhDb21wb25lbnRWaWV3XCI7XHJcblxyXG5jbGFzcyBFdmVudFNlbGVjdGlvbkNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBNZXRob2RMaXN0IHdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgTWV0aG9kTGlzdFdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIE1ldGhvZExpc3RXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWV0aG9kTGlzdFdpZGdldCB7XHJcblxyXG4gICAgZXZlbnRTZWxlY3Rpb25DaGFuZ2VkID0gbmV3IEV2ZW50U2VsZWN0aW9uQ2hhbmdlZCgpO1xyXG5cclxuICAgIHByaXZhdGUgX21ldGhvZHNUb29sYmFyITogTWV0aG9kR3JpZFRvb2xiYXI7XHJcbiAgICBwcml2YXRlIF9leGVjdXRhYmxlTWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfcXVpY2tDb21tYW5kcyA6IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtZXRlcnMgOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5jb21wb25lbnQuY29udGV4dDtcclxuICAgICAgICBpZihjb250ZXh0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRJZEZyb21Db250ZXh0ID0gY29udGV4dC5nZXRDb250ZXh0KEN0eENvbXBvbmVudFZpZXcuY29tcG9uZW50SWQpO1xyXG4gICAgICAgICAgICBpZihjb21wb25lbnRJZEZyb21Db250ZXh0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjcmVhdGUgYmluZGluZyB0byBtZXRob2RzIHdpdGggY29udGV4dCBpbmZvXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcXVpY2tDb21tYW5kcyhxdWlja0NvbW1hbmRzOiBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHdhdGNoYWJsZVBhcmFtZXRlcnMod2F0Y2hhYmxlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWV0aG9kcyBkYXRhIGxpbmsgYXMgYSByZWZlcmVuY2UgdG8gdGhlIG1ldGhvZHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbWV0aG9kcyhtZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pIHtcclxuICAgICAgICB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyA9IG1ldGhvZHM7XHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0aG9kIHBhcmFtZXRlcnMgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcy5mb3JFYWNoKChleGVjdXRhYmxlTWV0aG9kKT0+eyBcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhleGVjdXRhYmxlTWV0aG9kKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkoZXhlY3V0YWJsZU1ldGhvZCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmFkZFRvb2xCYXJCdXR0b25zKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgaWYgdGhlIGV4ZWN1dGFiaWxpdHkgb2YgdGhlIG1ldGhvZHMgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgICAgICBwcml2YXRlIG9ic2VydmVNZXRob2RFeGVjdXRhYmlsaXR5KGV4ZWN1dGFibGVNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGV4ZWN1dGFibGVNZXRob2QuaXNFeGVjdXRhYmxlLmF0dGFjaE9ic2VydmVyKHRoaXMsKGlzRXhlY3V0YWJsZSk9PntcclxuICAgICAgICAgICAgICAgIC8vIHJlZnJlc2hlcyB0aGUgbWV0aG9kcyBleGVjdXRhYmxlIHN0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNZXRob2RTdGF0ZShleGVjdXRhYmxlTWV0aG9kLGlzRXhlY3V0YWJsZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyBhIHNpbmdsZSBtZXRob2RzIGV4ZWN1dGFibGUgc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0V4ZWN1dGFibGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaE1ldGhvZFN0YXRlKG1ldGhvZDpNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCxpc0V4ZWN1dGFibGU6Ym9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVHJlZUdyaWREYXRhU291cmNlSW5pdGlhbGl6ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1ldGhvZHNMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSBtZXRob2QgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2Ugc29tZSBvYmplY3RzIGZyb20gdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuXHJcbiAgICAgICAgLy8gZGV0YWNoIG9ic2VydmVyc1xyXG4gICAgICAgIHRoaXMuZGV0YWNoTWV0aG9kc0V4ZWN1dGFiaWxpdHlPYnNlcnZhdGlvbigpO1xyXG5cclxuXHJcbiAgICAgICAgaWYodGhpcy5fbWV0aG9kc1Rvb2xiYXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kc1Rvb2xiYXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgb2JzZXJ2YXRpb24gb2YgdGhlIG1ldGhvZHMgZXhlY3V0YWJpbGl0eVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaE1ldGhvZHNFeGVjdXRhYmlsaXR5T2JzZXJ2YXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMuZm9yRWFjaCgoZXhlY3V0YWJsZU1ldGhvZCkgPT4ge1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKGV4ZWN1dGFibGVNZXRob2QpO1xyXG4gICAgICAgICAgICBleGVjdXRhYmxlTWV0aG9kLmlzRXhlY3V0YWJsZS5kZXRhY2hPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBtZXRob2QgbGlzdCB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2Nzcy9tZXRob2RMaXN0VG9vbGJhckJ1dHRvblN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIG1ldGhvZHMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIHZhciBtZXRob2RzRGF0YVNvdXJjZSA9IFtdO1xyXG5cclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogbWV0aG9kc0RhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBcclxuICAgICAgICAgICAgICAgIGFsbG93RGVsZXRpbmcgOiBmYWxzZSAsXHJcbiAgICAgICAgICAgICAgICBzaG93RGVsZXRlQ29uZmlybURpYWxvZyAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dDb25maXJtRGlhbG9nICA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoaWxkTWFwcGluZzogXCJjaGlsZHNcIixcclxuICAgICAgICAgICAgaXNSZXNwb25zaXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgcm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLmhhbmRsZU1ldGhvZExpc3RJdGVtU2VsZWN0ZWQoYXJncyksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB0aGlzLnNob3dNZXRob2REaXNhYmxlZElmTm90RXhlY3V0YWJsZShhcmdzKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBkYXRhU291cmNlIHRyZWVncmlkIGhhcyBiZWVuIGluaXRpYWxpemVkIHdpdGggdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzVHJlZUdyaWREYXRhU291cmNlSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cclxuICAgICAgICBpZiAodHJlZUdyaWRPYmoubW9kZWwuZGF0YVNvdXJjZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSB0cmVlR3JpZE9iai5tb2RlbC5kYXRhU291cmNlO1xyXG5cclxuICAgICAgICAgICAgLy9DaGVjayBpZiB0cmVlIGdyaWQgZGF0YVNvdXJjZSBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuXHJcbiAgICAgICAgICAgIGlmIChkYXRhU291cmNlLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJDb21tYW5kXCIsIHdpZHRoOiBcIjI1MFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl9tZXRob2RzVG9vbGJhciA9IG5ldyBNZXRob2RHcmlkVG9vbGJhcigpOyAvLyBUT0RPOiB1c2UgX3Rvb2xiYXIgYW5kIHN1cGVyLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX21ldGhvZHNUb29sYmFyLmdldERlZmF1bHRUb29sYmFyQnV0dG9ucygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0b29sYmFyIGJ1dHRvbnMgd2l0aCBxdWlja0NvbW1hbmRzIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUb29sQmFyQnV0dG9ucygpIHtcclxuICAgICAgICBpZiAodGhpcy5fcXVpY2tDb21tYW5kcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVG9vbGJhclNldHRpbmdzVG9UcmVlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFF1aWNrQ29tbWFuZEJ1dHRvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0xpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kc1Rvb2xiYXIuYWRkRGVmYXVsdFRvb2xiYXJCdXR0b25zKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLl9tZXRob2RzVG9vbGJhci5zZXRBY3R1YWxDb21wb25lbnRNZXRob2RzKHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBxdWljayBjb21tYW5kIGJ1dHRvbnMgdG8gdHJlZWdyaWQncyB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUXVpY2tDb21tYW5kQnV0dG9ucygpIHtcclxuICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzVG9vbGJhci5hZGRRdWlja0NvbW1hbmRzVG9vbGJhckJ1dHRvbnMoY29tbWFuZC5uYW1lLCBjb21tYW5kLmltYWdlTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICAvL3N1cGVyLnRyZWVHcmlkQ3JlYXRlZCgpO1xyXG4gICAgICAgIHRoaXMuX21ldGhvZHNUb29sYmFyLmluaXRUb29sYmFyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgLy8gUmVzaXplIG5lZWRlZCBiZWNhdXNlIHRvb2xiYXIgc2l6ZSBpcyBjaGFuZ2VkXHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd01ldGhvZERpc2FibGVkSWZOb3RFeGVjdXRhYmxlKGFyZ3Mpe1xyXG5cclxuICAgICAgICBpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJkaXNwbGF5TmFtZVwiKXtcclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLml0ZW0gIT0gdW5kZWZpbmVkICYmIGFyZ3MuZGF0YS5pdGVtLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG93IFJlYWRPbmx5IGNlbGwgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsICFhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY29tbWFuZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1ldGhvZHNMaXN0KCkge1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5nZXREYXRhTW9kZWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGF0YU1vZGVsKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzO1xyXG4gICAgICAgIC8qbGV0IHRlbXAgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgZ3JvdXAxPSB7Y2hpbGRzOiBuZXcgQXJyYXkoKSwgZGlzcGxheU5hbWU6IFwiSW5pdGlhbGlzYXRpb25cIn07XHJcbiAgICAgICAgbGV0IGdyb3VwMj0ge2NoaWxkczogbmV3IEFycmF5KCksIGRpc3BsYXlOYW1lOiBcIk1vdmVtZW50XCJ9XHJcbiAgICAgICAgbGV0IGdyb3VwMz0ge2NoaWxkczogbmV3IEFycmF5KCksIGRpc3BsYXlOYW1lOiBcIk90aGVyc1wifVxyXG4gICAgICAgIHRlbXAucHVzaChncm91cDEpO1xyXG4gICAgICAgIHRlbXAucHVzaChncm91cDIpO1xyXG4gICAgICAgIHRlbXAucHVzaChncm91cDMpO1xyXG5cclxuICAgICAgICBncm91cDEuY2hpbGRzID0gdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMuc2xpY2UoMCw1KTtcclxuICAgICAgICBncm91cDIuY2hpbGRzID0gdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMuc2xpY2UoNSwxMSk7XHJcbiAgICAgICAgZ3JvdXAzLmNoaWxkcyA9IHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzLnNsaWNlKDE2KTtcclxuICAgICAgICByZXR1cm4gdGVtcDsqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyc3QgdGltZSB0cmVlZ3JpZCBpcyB1cGRhdGVkLCB0b29sYmFyIGJ1dHRvbnMgYXJlIGluc2VydGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVG9vbGJhclNldHRpbmdzVG9UcmVlR3JpZCgpIHtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuZ2V0RGF0YU1vZGVsKCksXHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl9tZXRob2RzVG9vbGJhci5nZXRDdXN0b21Ub29sYmFycyh0aGlzLl9xdWlja0NvbW1hbmRzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBzZWxlY3Rpb25zIG9mIG1ldGhvZCBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNZXRob2RMaXN0SXRlbVNlbGVjdGVkKGFyZ3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXRob2QgcGFyYW1ldGVyIGxpc3QgYWZ0ZXIgYSBtZXRob2QgaGFzIGJlZW4gc2VsZWN0ZWQuXHJcbiAgICAgICAgaWYgKGFyZ3MuZGF0YS5pdGVtICYmIGFyZ3MuZGF0YS5pdGVtIGluc3RhbmNlb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkKGFyZ3MuZGF0YS5pdGVtIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlbGVjdGlvbkNoYW5nZWQobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLnJhaXNlKG51bGwsIG1ldGhvZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1ldGhvZExpc3RXaWRnZXQgfTsiXX0=
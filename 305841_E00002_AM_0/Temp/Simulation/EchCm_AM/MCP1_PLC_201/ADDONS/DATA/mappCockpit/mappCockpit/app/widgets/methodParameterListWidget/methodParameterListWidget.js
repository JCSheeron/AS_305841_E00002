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
define(["require", "exports", "../../models/online/mappCockpitComponent", "./methodParameterEditor", "../common/treeGridWidgetBase", "../common/domHelper", "./methodParameterFilterHelper"], function (require, exports, mappCockpitComponent_1, methodParameterEditor_1, treeGridWidgetBase_1, domHelper_1, methodParameterFilterHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the MethodParameterList widget
     *
     * @class MethodParameterListWidget
     * @extends {TreeGridWidgetBase}
     */
    var MethodParameterListWidget = /** @class */ (function (_super) {
        __extends(MethodParameterListWidget, _super);
        function MethodParameterListWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds id of execute button
            _this._executeButtonId = '';
            // Holds method filter helper class
            _this._methodParameterHelper = new methodParameterFilterHelper_1.MethodParameterFilterHelper(_this);
            /**
             * True if parameter list update is active
             *
             * @private
             * @memberof MethodParameterListWidget
             */
            _this._parameterListUpdateIsActive = false;
            return _this;
        }
        /**
         * Defines the height of the footer
         *
         * @returns {number}
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.defineFooterHeight = function () {
            return 36;
        };
        MethodParameterListWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this._executeButtonId = this.mainDivId + "_ExecuteButton";
            this.setFooterContent("<div id='" + this._executeButtonId + "' style='margin-top: -5px; margin-left: -5px;'></div>");
            this.createExecuteButton("Select command");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 100);
        };
        MethodParameterListWidget.prototype.createExecuteButton = function (commandDisplayName) {
            var _this = this;
            $("#" + this._executeButtonId).ejButton({
                cssClass: 'e-primary',
                // size:ej.ButtonSize.Large,
                width: "100%",
                height: "34px",
                enabled: false,
                contentType: "textandimage",
                text: commandDisplayName,
                imagePosition: ej.ImagePosition.ImageRight,
                showRoundedCorner: false,
                click: function (args) { _this.handleExecuteMethodClicked(args); },
                prefixIcon: "e-icon e-mediaplay"
            });
            $("#" + this._executeButtonId).css("font-size", "20px");
        };
        /**
         * handles click on the method execute button
         *
         * @param {*} args
         * @returns {*}
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.handleExecuteMethodClicked = function (args) {
            var treeObj = this.getTreeGridObject();
            // Save cell if currently in edit mode before executing method
            treeObj.saveCell();
            this.executeMethod();
        };
        /**
         * executes the selected method
         *
         * @private
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.executeMethod = function () {
            if (this._actualMethod && this._actualMethod instanceof mappCockpitComponent_1.MappCockpitComponentMethod) {
                mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._actualMethod);
            }
        };
        /**
         * Loads the styles for the method execute button
         *
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/methodParameterListWidget/style/css/methodExecuteButtonStyle.css");
        };
        /** resizes the methods parameter list widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            this.resizeExecuteButton(width);
        };
        /**
        * creates the tree grid for the method parameters list
        *
        * @protected
        * @returns {*}
        * @memberof MethodParameterListWidget
        */
        MethodParameterListWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var parameterListDataSource = [{}];
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), { dataSource: parameterListDataSource, editSettings: {
                    allowEditing: true,
                    allowAdding: false,
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, beginEdit: function (args) { return _this.beginEdit(args); }, endEdit: function (args) { return _this._methodParameterHelper.endTreegridEdit(_this._actualMethod); }, queryCellInfo: function (args) { return _this.showParametersInListDisabled(args); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Parameter", isPrimaryKey: true, allowEditing: false },
                    { field: "displayValue", headerText: "Value", width: "100", editType: "stringedit", editTemplate: methodParameterEditor_1.MappCockpitParameterTypeEditor.createInstance() },
                    { field: "engineeringUnit", headerText: "Unit", width: "100" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        /**
         * Update input parameter state (enable/disable)
         *
         * @private
         * @param {*} args
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.showParametersInListDisabled = function (args) {
            if (this._actualMethod != undefined && this._actualMethod.isExecutable != undefined) {
                if (args.cellElement.classList != undefined) {
                    // Show ReadOnly cell with other color
                    var disableTreeCellClassName = "treeCellDisabled";
                    if (this._actualMethod.isExecutable.value == false) {
                        args.cellElement.classList.add(disableTreeCellClassName);
                    }
                    else {
                        args.cellElement.classList.remove(disableTreeCellClassName);
                    }
                }
                domHelper_1.DomHelper.disableElement(args.cellElement, !this._actualMethod.isExecutable.value);
            }
        };
        /**
         * Called when edit cell action is started.
         *
         * @private
         * @param {*} args
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.beginEdit = function (args) {
            // Only value column can be edited (TODO: use column id instead of index)
            if (args.columnIndex != 1) { // 1 = value column
                args.cancel = true;
            }
            else {
                if (this._actualMethod == undefined) {
                    args.cancel = true;
                }
                else if (this._actualMethod.isExecutable == undefined) {
                    args.cancel = true;
                }
                else if (this._actualMethod.isExecutable.value == false) {
                    args.cancel = true;
                }
                else if (this._actualMethod.inputParameters != undefined && this._actualMethod.inputParameters.length == 0) {
                    // No input parameters available for this method; cancel edit of value column
                    args.cancel = true;
                }
            }
        };
        /**
         * updates the content of the method parameters list
         *
         * @param {MappCockpitComponentMethod} method
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.updateParametersList = function (method) {
            var _this = this;
            //console.info("CALL updateParametersList: " + method.browseName);
            if (this._actualMethod == method) {
                // No change of method
                return;
            }
            this.observeMethodExecutability(this._actualMethod, method);
            if (this._parameterListUpdateIsActive == true) {
                this._nextMethodForParameterListUpdate = method;
                return;
            }
            else {
                this._nextMethodForParameterListUpdate = undefined;
            }
            this._parameterListUpdateIsActive = true;
            this._actualMethod = method;
            // Check if method has been browsed already
            if (this._methodParameterHelper.methodInputParametersMapping.has(method.browseName)) {
                this.updateTreegridData(method);
            }
            else {
                // Browse method's input parameters
                mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(method).then(function (inputParameters) {
                    // add mapping to methodParameterHelper and update tree grid
                    _this._methodParameterHelper.addMethodInputParameters(method);
                    _this.updateTreegridData(method);
                });
            }
        };
        /**
         * Update tree grid
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.updateTreegridData = function (method) {
            var inputParameters = this._methodParameterHelper.methodInputParametersMapping.get(method.browseName);
            this.populateMethodParameterList(inputParameters, method);
            this._parameterListUpdateIsActive = false;
            if (this._nextMethodForParameterListUpdate != undefined) {
                this.updateParametersList(this._nextMethodForParameterListUpdate);
            }
        };
        /**
         * Detach/attach observer when selected method has changed
         *
         * @param {MappCockpitComponentMethod | undefined} previousMethod
         * @param {MappCockpitComponentMethod} method
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.observeMethodExecutability = function (previousMethod, method) {
            var _this = this;
            if (previousMethod != undefined && previousMethod.isExecutable.isObservedBy(this)) {
                previousMethod.isExecutable.detachObserver(this);
            }
            method.isExecutable.attachObserver(this, function (isExecutable) {
                _this.updateExecutePaneText(method);
            });
        };
        /**
         * Detach observation
         *
         * @private
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.detachExecutePaneMethod = function () {
            if (this._actualMethod) {
                this._actualMethod.isExecutable.detachObserver(this);
            }
        };
        /**
         * Populate the method parameter list
         *
         * @private
         * @param {MappCockpitMethodParameter[]} inputParameters
         * @param {MappCockpitComponentMethod} method
         * @returns
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.populateMethodParameterList = function (inputParameters, method) {
            var parameterListDataSource = [];
            if (inputParameters.length > 0) {
                parameterListDataSource = inputParameters;
            }
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            // Save cell if currently in edit mode before refreshing, otherwise refresh is not working
            treeObj.saveCell();
            // To refresh TreeGrid with new datasource
            treeObj.setModel({ "dataSource": parameterListDataSource }, true);
            this.resize(this._actualWidth, this._actualHeight);
            this.updateExecutePaneText(method);
        };
        /**
         * Update execute pane text
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.updateExecutePaneText = function (method) {
            var buttonActive = false;
            if (method != undefined && method.isExecutable != undefined) {
                if (method.isExecutable.value == true) {
                    buttonActive = true;
                }
            }
            // get button instance;
            var executeBtn = $("#" + this._executeButtonId).data("ejButton");
            if (executeBtn) {
                // set button text
                executeBtn.option({ text: method.displayName });
                // set button active state
                executeBtn.option({ enabled: buttonActive });
            }
        };
        MethodParameterListWidget.prototype.resizeExecuteButton = function (width) {
            var executeBtn = $("#" + this._executeButtonId).data("ejButton");
            executeBtn.option({ width: width - 1 });
        };
        MethodParameterListWidget.prototype.dispose = function () {
            this.detachExecutePaneMethod();
        };
        return MethodParameterListWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MethodParameterListWidget = MethodParameterListWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0L21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT0E7Ozs7O09BS0c7SUFDSDtRQUF3Qyw2Q0FBa0I7UUFBMUQ7WUFBQSxxRUE2WEM7WUF6WEcsNkJBQTZCO1lBQ3JCLHNCQUFnQixHQUFXLEVBQUUsQ0FBQztZQUN0QyxtQ0FBbUM7WUFDM0IsNEJBQXNCLEdBQUcsSUFBSSx5REFBMkIsQ0FBQyxLQUFJLENBQUMsQ0FBQztZQUV2RTs7Ozs7ZUFLRztZQUNLLGtDQUE0QixHQUFHLEtBQUssQ0FBQzs7UUE4V2pELENBQUM7UUFuV0c7Ozs7O1dBS0c7UUFDSCxzREFBa0IsR0FBbEI7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCwrQ0FBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7WUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUUsdURBQXVELENBQUMsQ0FBQztZQUNwSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUUzQyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFTyx1REFBbUIsR0FBM0IsVUFBNEIsa0JBQXlCO1lBQXJELGlCQWlCQztZQWZTLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLENBQUMsUUFBUSxDQUFDO2dCQUMzQyxR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LENBQUM7UUFDeEMsQ0FBQztRQUVNLDJDQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBRUwsZ0NBQUM7SUFBRCxDQUFDLEFBN1hELENBQXdDLHVDQUFrQixHQTZYekQ7SUFFUSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFBhcmFtZXRlclR5cGVFZGl0b3IgfSBmcm9tIFwiLi9tZXRob2RQYXJhbWV0ZXJFZGl0b3JcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuaW1wb3J0IHsgTWV0aG9kUGFyYW1ldGVyRmlsdGVySGVscGVyIH0gZnJvbSBcIi4vbWV0aG9kUGFyYW1ldGVyRmlsdGVySGVscGVyXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgTWV0aG9kUGFyYW1ldGVyTGlzdCB3aWRnZXRcclxuICpcclxuICogQGNsYXNzIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCB7XHJcblxyXG4gICAgLy8gSG9sZHMgY3VycmVudCBtZXRob2QgZm9yIHdoaWNoIG9uZSB0aGUgcGFyYW1ldGVyIGxpc3QgaXMgc2hvd25cclxuICAgIHByaXZhdGUgX2FjdHVhbE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQ7XHJcbiAgICAvLyBIb2xkcyBpZCBvZiBleGVjdXRlIGJ1dHRvblxyXG4gICAgcHJpdmF0ZSBfZXhlY3V0ZUJ1dHRvbklkOiBzdHJpbmcgPSAnJztcclxuICAgIC8vIEhvbGRzIG1ldGhvZCBmaWx0ZXIgaGVscGVyIGNsYXNzXHJcbiAgICBwcml2YXRlIF9tZXRob2RQYXJhbWV0ZXJIZWxwZXIgPSBuZXcgTWV0aG9kUGFyYW1ldGVyRmlsdGVySGVscGVyKHRoaXMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJ1ZSBpZiBwYXJhbWV0ZXIgbGlzdCB1cGRhdGUgaXMgYWN0aXZlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BhcmFtZXRlckxpc3RVcGRhdGVJc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV4dCBtZXRob2QgaW4gcXVldWUgZm9yIHBhcmFtZXRlciBsaXN0IHVwZGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9uZXh0TWV0aG9kRm9yUGFyYW1ldGVyTGlzdFVwZGF0ZTogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBmb290ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lRm9vdGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzY7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZXhlY3V0ZUJ1dHRvbklkID0gdGhpcy5tYWluRGl2SWQgKyBcIl9FeGVjdXRlQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5zZXRGb290ZXJDb250ZW50KFwiPGRpdiBpZD0nXCIgKyB0aGlzLl9leGVjdXRlQnV0dG9uSWQgK1wiJyBzdHlsZT0nbWFyZ2luLXRvcDogLTVweDsgbWFyZ2luLWxlZnQ6IC01cHg7Jz48L2Rpdj5cIik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVFeGVjdXRlQnV0dG9uKFwiU2VsZWN0IGNvbW1hbmRcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigwLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRXhlY3V0ZUJ1dHRvbihjb21tYW5kRGlzcGxheU5hbWU6c3RyaW5nKSB7XHJcblxyXG4gICAgICAgICg8YW55PiQoXCIjXCIgKyB0aGlzLl9leGVjdXRlQnV0dG9uSWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAnZS1wcmltYXJ5JyxcclxuICAgICAgICAgICAgLy8gc2l6ZTplai5CdXR0b25TaXplLkxhcmdlLFxyXG4gICAgICAgICAgICB3aWR0aDpcIjEwMCVcIixcclxuICAgICAgICAgICAgaGVpZ2h0OlwiMzRweFwiLFxyXG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwidGV4dGFuZGltYWdlXCIsXHJcbiAgICAgICAgICAgIHRleHQ6IGNvbW1hbmREaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgaW1hZ2VQb3NpdGlvbjogZWouSW1hZ2VQb3NpdGlvbi5JbWFnZVJpZ2h0LFxyXG4gICAgICAgICAgICBzaG93Um91bmRlZENvcm5lcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4geyB0aGlzLmhhbmRsZUV4ZWN1dGVNZXRob2RDbGlja2VkKGFyZ3MpIH0sXHJcbiAgICAgICAgICAgIHByZWZpeEljb246IFwiZS1pY29uIGUtbWVkaWFwbGF5XCJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgKDxKUXVlcnk+JChcIiNcIiArIHRoaXMuX2V4ZWN1dGVCdXR0b25JZCkpLmNzcyhcImZvbnQtc2l6ZVwiLFwiMjBweFwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBjbGljayBvbiB0aGUgbWV0aG9kIGV4ZWN1dGUgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUV4ZWN1dGVNZXRob2RDbGlja2VkKGFyZ3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHRyZWVPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIGV4ZWN1dGluZyBtZXRob2RcclxuICAgICAgICB0cmVlT2JqLnNhdmVDZWxsKCk7IFxyXG5cclxuICAgICAgICB0aGlzLmV4ZWN1dGVNZXRob2QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGV4ZWN1dGVzIHRoZSBzZWxlY3RlZCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlTWV0aG9kKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYWN0dWFsTWV0aG9kICYmIHRoaXMuX2FjdHVhbE1ldGhvZCBpbnN0YW5jZW9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUodGhpcy5fYWN0dWFsTWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgbWV0aG9kIGV4ZWN1dGUgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0L3N0eWxlL2Nzcy9tZXRob2RFeGVjdXRlQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSBtZXRob2RzIHBhcmFtZXRlciBsaXN0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHRcdHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNpemVFeGVjdXRlQnV0dG9uKHdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBtZXRob2QgcGFyYW1ldGVycyBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuICAgICAgICB2YXIgcGFyYW1ldGVyTGlzdERhdGFTb3VyY2UgPSBbe31dO1xyXG5cclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcblxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiBwYXJhbWV0ZXJMaXN0RGF0YVNvdXJjZSwgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0FkZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0RlbGV0aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93RGVsZXRlQ29uZmlybURpYWxvZyAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dDb25maXJtRGlhbG9nICA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gdGhpcy5iZWdpbkVkaXQoYXJncyksXHJcbiAgICAgICAgICAgIGVuZEVkaXQ6IChhcmdzKSA9PiB0aGlzLl9tZXRob2RQYXJhbWV0ZXJIZWxwZXIuZW5kVHJlZWdyaWRFZGl0KHRoaXMuX2FjdHVhbE1ldGhvZCksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB0aGlzLnNob3dQYXJhbWV0ZXJzSW5MaXN0RGlzYWJsZWQoYXJncyksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIlBhcmFtZXRlclwiLCBpc1ByaW1hcnlLZXk6IHRydWUsIGFsbG93RWRpdGluZzogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheVZhbHVlXCIsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgd2lkdGg6IFwiMTAwXCIsIGVkaXRUeXBlOiBcInN0cmluZ2VkaXRcIiwgZWRpdFRlbXBsYXRlOiBNYXBwQ29ja3BpdFBhcmFtZXRlclR5cGVFZGl0b3IuY3JlYXRlSW5zdGFuY2UoKSB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJlbmdpbmVlcmluZ1VuaXRcIiwgaGVhZGVyVGV4dDogXCJVbml0XCIsIHdpZHRoOiBcIjEwMFwiIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBpbnB1dCBwYXJhbWV0ZXIgc3RhdGUgKGVuYWJsZS9kaXNhYmxlKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd1BhcmFtZXRlcnNJbkxpc3REaXNhYmxlZChhcmdzKXsgXHJcbiAgICAgICAgaWYodGhpcy5fYWN0dWFsTWV0aG9kICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9hY3R1YWxNZXRob2QuaXNFeGVjdXRhYmxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuY2VsbEVsZW1lbnQuY2xhc3NMaXN0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBTaG93IFJlYWRPbmx5IGNlbGwgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSA9IFwidHJlZUNlbGxEaXNhYmxlZFwiO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsTWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIERvbUhlbHBlci5kaXNhYmxlRWxlbWVudChhcmdzLmNlbGxFbGVtZW50LCAhdGhpcy5fYWN0dWFsTWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gZWRpdCBjZWxsIGFjdGlvbiBpcyBzdGFydGVkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYmVnaW5FZGl0KGFyZ3Mpe1xyXG4gICAgICAgIC8vIE9ubHkgdmFsdWUgY29sdW1uIGNhbiBiZSBlZGl0ZWQgKFRPRE86IHVzZSBjb2x1bW4gaWQgaW5zdGVhZCBvZiBpbmRleClcclxuICAgICAgICBpZihhcmdzLmNvbHVtbkluZGV4ICE9IDEpeyAvLyAxID0gdmFsdWUgY29sdW1uXHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsTWV0aG9kID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLl9hY3R1YWxNZXRob2QuaXNFeGVjdXRhYmxlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLl9hY3R1YWxNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuX2FjdHVhbE1ldGhvZC5pbnB1dFBhcmFtZXRlcnMgIT0gdW5kZWZpbmVkICYmIHRoaXMuX2FjdHVhbE1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgLy8gTm8gaW5wdXQgcGFyYW1ldGVycyBhdmFpbGFibGUgZm9yIHRoaXMgbWV0aG9kOyBjYW5jZWwgZWRpdCBvZiB2YWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgdGhlIGNvbnRlbnQgb2YgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVBhcmFtZXRlcnNMaXN0KG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICAvL2NvbnNvbGUuaW5mbyhcIkNBTEwgdXBkYXRlUGFyYW1ldGVyc0xpc3Q6IFwiICsgbWV0aG9kLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdHVhbE1ldGhvZCA9PSBtZXRob2Qpe1xyXG4gICAgICAgICAgICAvLyBObyBjaGFuZ2Ugb2YgbWV0aG9kXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkodGhpcy5fYWN0dWFsTWV0aG9kLCBtZXRob2QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3BhcmFtZXRlckxpc3RVcGRhdGVJc0FjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5fbmV4dE1ldGhvZEZvclBhcmFtZXRlckxpc3RVcGRhdGUgPSBtZXRob2Q7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fbmV4dE1ldGhvZEZvclBhcmFtZXRlckxpc3RVcGRhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlckxpc3RVcGRhdGVJc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsTWV0aG9kID0gbWV0aG9kO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBtZXRob2QgaGFzIGJlZW4gYnJvd3NlZCBhbHJlYWR5XHJcbiAgICAgICAgaWYgKHRoaXMuX21ldGhvZFBhcmFtZXRlckhlbHBlci5tZXRob2RJbnB1dFBhcmFtZXRlcnNNYXBwaW5nLmhhcyhtZXRob2QuYnJvd3NlTmFtZSkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlZ3JpZERhdGEobWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEJyb3dzZSBtZXRob2QncyBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLnVwZGF0ZUlucHV0UGFyYW1ldGVycyhtZXRob2QpLnRoZW4oKGlucHV0UGFyYW1ldGVycyk9PntcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBtYXBwaW5nIHRvIG1ldGhvZFBhcmFtZXRlckhlbHBlciBhbmQgdXBkYXRlIHRyZWUgZ3JpZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0aG9kUGFyYW1ldGVySGVscGVyLmFkZE1ldGhvZElucHV0UGFyYW1ldGVycyhtZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlZ3JpZERhdGEobWV0aG9kKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRyZWUgZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVHJlZWdyaWREYXRhKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICBsZXQgaW5wdXRQYXJhbWV0ZXJzID0gdGhpcy5fbWV0aG9kUGFyYW1ldGVySGVscGVyLm1ldGhvZElucHV0UGFyYW1ldGVyc01hcHBpbmcuZ2V0KG1ldGhvZC5icm93c2VOYW1lKSBhcyBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdO1xyXG4gICAgICAgIHRoaXMucG9wdWxhdGVNZXRob2RQYXJhbWV0ZXJMaXN0KGlucHV0UGFyYW1ldGVycywgbWV0aG9kKTtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJMaXN0VXBkYXRlSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLl9uZXh0TWV0aG9kRm9yUGFyYW1ldGVyTGlzdFVwZGF0ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcnNMaXN0KHRoaXMuX25leHRNZXRob2RGb3JQYXJhbWV0ZXJMaXN0VXBkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoL2F0dGFjaCBvYnNlcnZlciB3aGVuIHNlbGVjdGVkIG1ldGhvZCBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWR9IHByZXZpb3VzTWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eShwcmV2aW91c01ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQsIG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICBpZiAocHJldmlvdXNNZXRob2QgIT0gdW5kZWZpbmVkICYmIHByZXZpb3VzTWV0aG9kLmlzRXhlY3V0YWJsZS5pc09ic2VydmVkQnkodGhpcykpIHtcclxuICAgICAgICAgICAgcHJldmlvdXNNZXRob2QuaXNFeGVjdXRhYmxlLmRldGFjaE9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLmF0dGFjaE9ic2VydmVyKHRoaXMsIChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXhlY3V0ZVBhbmVUZXh0KG1ldGhvZCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaCBvYnNlcnZhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaEV4ZWN1dGVQYW5lTWV0aG9kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hY3R1YWxNZXRob2QpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsTWV0aG9kLmlzRXhlY3V0YWJsZS5kZXRhY2hPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3B1bGF0ZSB0aGUgbWV0aG9kIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXX0gaW5wdXRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBvcHVsYXRlTWV0aG9kUGFyYW1ldGVyTGlzdChpbnB1dFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10sIG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICB2YXIgcGFyYW1ldGVyTGlzdERhdGFTb3VyY2UgOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciBbXSA9IFtdO1xyXG4gICAgICAgIGlmIChpbnB1dFBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJMaXN0RGF0YVNvdXJjZSA9IGlucHV0UGFyYW1ldGVycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGlmKCF0cmVlT2JqKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIHJlZnJlc2hpbmcsIG90aGVyd2lzZSByZWZyZXNoIGlzIG5vdCB3b3JraW5nXHJcbiAgICAgICAgdHJlZU9iai5zYXZlQ2VsbCgpOyBcclxuICAgICAgICBcclxuICAgICAgICAvLyBUbyByZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2VcclxuICAgICAgICB0cmVlT2JqLnNldE1vZGVsKHtcImRhdGFTb3VyY2VcIjogcGFyYW1ldGVyTGlzdERhdGFTb3VyY2UgfSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlRXhlY3V0ZVBhbmVUZXh0KG1ldGhvZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgZXhlY3V0ZSBwYW5lIHRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlRXhlY3V0ZVBhbmVUZXh0KG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBhbnkge1xyXG4gICAgICAgIGxldCBidXR0b25BY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZihtZXRob2QgIT0gdW5kZWZpbmVkICYmIG1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYobWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b25BY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBidXR0b24gaW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGV4ZWN1dGVCdG4gPSAoPGFueT4kKFwiI1wiICsgdGhpcy5fZXhlY3V0ZUJ1dHRvbklkKSkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChleGVjdXRlQnRuKSB7XHJcbiAgICAgICAgICAgIC8vIHNldCBidXR0b24gdGV4dFxyXG4gICAgICAgICAgICBleGVjdXRlQnRuLm9wdGlvbih7dGV4dDogbWV0aG9kLmRpc3BsYXlOYW1lfSk7XHJcbiAgICAgICAgICAgIC8vIHNldCBidXR0b24gYWN0aXZlIHN0YXRlXHJcbiAgICAgICAgICAgIGV4ZWN1dGVCdG4ub3B0aW9uKHtlbmFibGVkOiBidXR0b25BY3RpdmV9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNpemVFeGVjdXRlQnV0dG9uKHdpZHRoKXtcclxuICAgICAgICBsZXQgZXhlY3V0ZUJ0biA9ICg8YW55PiQoXCIjXCIgKyB0aGlzLl9leGVjdXRlQnV0dG9uSWQpKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgZXhlY3V0ZUJ0bi5vcHRpb24oe3dpZHRoOiB3aWR0aC0xfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5kZXRhY2hFeGVjdXRlUGFuZU1ldGhvZCgpO1xyXG4gICAgfVxyXG4gXHJcbn1cclxuXHJcbmV4cG9ydCB7IE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQgfTsiXX0=
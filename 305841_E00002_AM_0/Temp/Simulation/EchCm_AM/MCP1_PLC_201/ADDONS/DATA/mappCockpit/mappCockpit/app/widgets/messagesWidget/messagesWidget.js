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
define(["require", "exports", "../../common/directoryProvider", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./model/messagesViewModel", "../common/themeProvider"], function (require, exports, directoryProvider_1, treeGridWidgetBase_1, mappCockpitComponent_1, messagesViewModel_1, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessagesWidget = /** @class */ (function (_super) {
        __extends(MessagesWidget, _super);
        function MessagesWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Defines the html fragment for the split layout
            _this.messagesWidgetSeverityTemplate = "\n    <script type=\"text/x-jsrender\" id=\"severityColumnTemplate\">\n        {{if severity==0}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_success.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\" {{: 0 }} \">\n        {{else severity==1 }}\n            <img src=\"" + MessagesWidget.getImagePath("icon_info.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\"{{: 1 }}\"> \n        {{else severity==2}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_warning.svg") + "\" style=\"padding-left: 8px; max-height: 100%;  alt=\" {{: 2 }} \">\t\t\n        {{else severity==3}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_error.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\"{{: 3 }}\"> \n        {{/if}}\n    </script>\n    ";
            // holds the message parameters
            _this._messageParameters = [];
            _this._messageWidgetData = new messagesViewModel_1.MessagesData;
            return _this;
        }
        MessagesWidget.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "messagesWidget/style/images/" + imageName);
        };
        MessagesWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 2, 400);
        };
        Object.defineProperty(MessagesWidget.prototype, "messageParameters", {
            /**
             * Sets the message parameters as the data source for the messages widget
             *
             * @memberof MessagesWidget
             */
            set: function (messageParametersLink) {
                var messageParameters = messageParametersLink.value;
                if (messageParameters.length > 0) {
                    this.onComponentParametersUpdated(messageParameters);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * the component parameters have been updated.
         *
         * @private
         * @param {MappCockpitComponentParameter[]} messageParameters
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.onComponentParametersUpdated = function (messageParameters) {
            // filter the messages and update the messages parameter list
            this._messageParameters = messageParameters;
            // update the widgets data source.
            this.populateMessagesWidgetContent();
        };
        /**
         * Updates the data for the widget from the message parameter values
         *
         * @private
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.updateMessagesWidgetData = function () {
            this._messageWidgetData = messagesViewModel_1.MessagesViewModel.convertParametersToMessageData(this._messageParameters);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.createLayout = function () {
            $(this.mainDiv).append(this.messagesWidgetSeverityTemplate);
            _super.prototype.createLayout.call(this);
        };
        /**
         * Updates the messages widget with the data and populates the widget
         *
         * @private
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.populateMessagesWidgetContent = function () {
            this.refreshMessageContent();
            this.observeMessages();
        };
        /**
         * refreshes the messages after the message parameters have changed
         *
         * @private
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.refreshMessageContent = function () {
            this.updateMessagesWidgetData();
            $(this.mainDiv).ejTreeGrid({
                dataSource: this._messageWidgetData.messages,
            });
        };
        /**
         * Observes the message parameters for change and updates the content.
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.observeMessages = function () {
            // invoke observing the messages
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, this._messageParameters);
        };
        /**
         * handles observable changes
         *
         * @param {Observable[]} changedObservables
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.onObservablesChanged = function (changedObservables) {
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            this.refreshMessageContent();
        };
        /**
         * activates MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.activate = function () {
            console.log("MessagesWidget activated");
            mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this, this._messageParameters);
        };
        /**
         * deactivates MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.deactivate = function () {
            console.log("MessagesWidget deactivated");
            mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this, this._messageParameters);
        };
        /**
         * disposes MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.dispose = function () {
            console.log("MessagesWidget disposed");
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, this._messageParameters);
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the tree grid for the messages list
         *
         * @protected
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.createTreeGrid = function () {
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), { allowSelection: false, editSettings: {
                    allowEditing: true,
                    editMode: "normal",
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, queryCellInfo: function (args) {
                    if (args.column.field == "description") {
                        args.cellElement.style.fontWeight = "bold";
                    }
                    var messageItem = args.data;
                    if (messageItem.severity == "3") {
                        args.cellElement.style.color = "red";
                    }
                } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "severity", headerText: "Severity", isTemplateColumn: true, template: "#severityColumnTemplate", width: "32" },
                    { field: "timeStamp", headerText: "Time", width: "200" },
                    { field: "description", headerText: "Description" },
                    { field: "eventId", headerText: "ID", width: "160" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        return MessagesWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MessagesWidget = MessagesWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWVzc2FnZXNXaWRnZXQvbWVzc2FnZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBNkIsa0NBQWtCO1FBQS9DO1lBQUEscUVBK05DO1lBN05HLGlEQUFpRDtZQUNoQyxvQ0FBOEIsR0FBRyw0SEFHL0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsNkhBRXJELEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRywySEFFbEQsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsaUlBRXJELEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLDBHQUdyRSxDQUFDO1lBRUYsK0JBQStCO1lBQ3ZCLHdCQUFrQixHQUFvQyxFQUFFLENBQUM7WUFDekQsd0JBQWtCLEdBQWlCLElBQUksZ0NBQVksQ0FBQzs7UUE0TWhFLENBQUM7UUExTWtCLDJCQUFZLEdBQTNCLFVBQTRCLFNBQWlCO1lBQ3pDLE9BQU8sNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyw4QkFBOEIsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUM3SixDQUFDO1FBRUQsb0NBQVcsR0FBWDtZQUNJLGlCQUFNLFdBQVcsV0FBRSxDQUFDO1lBRXBCLDhCQUE4QjtZQUM5QixpQkFBTSxnQkFBZ0IsWUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQU9ELHNCQUFXLDZDQUFpQjtZQUw1Qjs7OztlQUlHO2lCQUNILFVBQTZCLHFCQUFxRTtnQkFFOUYsSUFBSSxpQkFBaUIsR0FBRyxxQkFBcUIs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USxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtnQkFDckYsYUFBYSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsaUJBQU0sbUJBQW1CLGFBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXZELENBQXVEO2FBQ25GLENBQUM7UUFDTixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBL05ELENBQTZCLHVDQUFrQixHQStOOUM7SUFHUSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCB7IElNZXNzYWdlc1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWVzc2FnZXNXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VzVmlld01vZGVsLCBNZXNzYWdlc0RhdGEsIE1lc3NhZ0RhdGFJdGVtIH0gZnJvbSBcIi4vbW9kZWwvbWVzc2FnZXNWaWV3TW9kZWxcIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vdGhlbWVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcblxyXG5jbGFzcyBNZXNzYWdlc1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElNZXNzYWdlc1dpZGdldCB7XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaHRtbCBmcmFnbWVudCBmb3IgdGhlIHNwbGl0IGxheW91dFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlc1dpZGdldFNldmVyaXR5VGVtcGxhdGUgPSBgXHJcbiAgICA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cInNldmVyaXR5Q29sdW1uVGVtcGxhdGVcIj5cclxuICAgICAgICB7e2lmIHNldmVyaXR5PT0wfX1cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJgICsgTWVzc2FnZXNXaWRnZXQuZ2V0SW1hZ2VQYXRoKFwiaWNvbl9zdWNjZXNzLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyBhbHQ9XCIge3s6IDAgfX0gXCI+XHJcbiAgICAgICAge3tlbHNlIHNldmVyaXR5PT0xIH19XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiYCArIE1lc3NhZ2VzV2lkZ2V0LmdldEltYWdlUGF0aChcImljb25faW5mby5zdmdcIikgKyBgXCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDhweDsgbWF4LWhlaWdodDogMTAwJTsgYWx0PVwie3s6IDEgfX1cIj4gXHJcbiAgICAgICAge3tlbHNlIHNldmVyaXR5PT0yfX1cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJgICsgTWVzc2FnZXNXaWRnZXQuZ2V0SW1hZ2VQYXRoKFwiaWNvbl93YXJuaW5nLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyAgYWx0PVwiIHt7OiAyIH19IFwiPlx0XHRcclxuICAgICAgICB7e2Vsc2Ugc2V2ZXJpdHk9PTN9fVxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImAgKyBNZXNzYWdlc1dpZGdldC5nZXRJbWFnZVBhdGgoXCJpY29uX2Vycm9yLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyBhbHQ9XCJ7ezogMyB9fVwiPiBcclxuICAgICAgICB7ey9pZn19XHJcbiAgICA8L3NjcmlwdD5cclxuICAgIGA7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIG1lc3NhZ2UgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VXaWRnZXREYXRhOiBNZXNzYWdlc0RhdGEgPSBuZXcgTWVzc2FnZXNEYXRhO1xyXG4gICBcclxuICAgIHByaXZhdGUgc3RhdGljIGdldEltYWdlUGF0aChpbWFnZU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcIm1lc3NhZ2VzV2lkZ2V0L3N0eWxlL2ltYWdlcy9cIiArIGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMiwgNDAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1lc3NhZ2UgcGFyYW1ldGVycyBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSBtZXNzYWdlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtZXNzYWdlUGFyYW1ldGVycyhtZXNzYWdlUGFyYW1ldGVyc0xpbms6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4pIHtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VQYXJhbWV0ZXJzID0gbWVzc2FnZVBhcmFtZXRlcnNMaW5rLnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAobWVzc2FnZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQobWVzc2FnZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSBjb21wb25lbnQgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBtZXNzYWdlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZChtZXNzYWdlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgICAgICAvLyBmaWx0ZXIgdGhlIG1lc3NhZ2VzIGFuZCB1cGRhdGUgdGhlIG1lc3NhZ2VzIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzID0gbWVzc2FnZVBhcmFtZXRlcnNcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB3aWRnZXRzIGRhdGEgc291cmNlLlxyXG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlTWVzc2FnZXNXaWRnZXRDb250ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkYXRhIGZvciB0aGUgd2lkZ2V0IGZyb20gdGhlIG1lc3NhZ2UgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVNZXNzYWdlc1dpZGdldERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVdpZGdldERhdGEgPSBNZXNzYWdlc1ZpZXdNb2RlbC5jb252ZXJ0UGFyYW1ldGVyc1RvTWVzc2FnZURhdGEodGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMpOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5hcHBlbmQodGhpcy5tZXNzYWdlc1dpZGdldFNldmVyaXR5VGVtcGxhdGUpO1xyXG4gICAgICAgIHN1cGVyLmNyZWF0ZUxheW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWVzc2FnZXMgd2lkZ2V0IHdpdGggdGhlIGRhdGEgYW5kIHBvcHVsYXRlcyB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBvcHVsYXRlTWVzc2FnZXNXaWRnZXRDb250ZW50KCkge1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hNZXNzYWdlQ29udGVudCgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1lc3NhZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIG1lc3NhZ2VzIGFmdGVyIHRoZSBtZXNzYWdlIHBhcmFtZXRlcnMgaGF2ZSBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hNZXNzYWdlQ29udGVudCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlc1dpZGdldERhdGEoKTtcclxuXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9tZXNzYWdlV2lkZ2V0RGF0YS5tZXNzYWdlcyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIHRoZSBtZXNzYWdlIHBhcmFtZXRlcnMgZm9yIGNoYW5nZSBhbmQgdXBkYXRlcyB0aGUgY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgb2JzZXJ2ZU1lc3NhZ2VzKCkgeyAgICAgXHJcbiAgICAgICAgLy8gaW52b2tlIG9ic2VydmluZyB0aGUgbWVzc2FnZXNcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5vYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKHRoaXMsdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBvYnNlcnZhYmxlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09ic2VydmFibGVbXX0gY2hhbmdlZE9ic2VydmFibGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgb25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uT2JzZXJ2YWJsZXNDaGFuZ2VkOiAlbyAlb1wiLHRoaXMsY2hhbmdlZE9ic2VydmFibGVzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hNZXNzYWdlQ29udGVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWN0aXZhdGVzIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZXNXaWRnZXQgYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlYWN0aXZhdGVzIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlc1dpZGdldCBkZWFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5kZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRpc3Bvc2VzIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlc1dpZGdldCBkaXNwb3NlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIG1lc3NhZ2VzIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93U2VsZWN0aW9uOiBmYWxzZSwgICBcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7IFxyXG4gICAgICAgICAgICAgICAgYWxsb3dFZGl0aW5nOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgIGVkaXRNb2RlOiBcIm5vcm1hbFwiLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNob3dEZWxldGVDb25maXJtRGlhbG9nICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1EaWFsb2cgIDogZmFsc2UgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiBmdW5jdGlvbiAoYXJncyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJkZXNjcmlwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VJdGVtID0gYXJncy5kYXRhIGFzIE1lc3NhZ0RhdGFJdGVtO1xyXG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZUl0ZW0uc2V2ZXJpdHkgPT0gXCIzXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwic2V2ZXJpdHlcIiwgaGVhZGVyVGV4dDogXCJTZXZlcml0eVwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZTogXCIjc2V2ZXJpdHlDb2x1bW5UZW1wbGF0ZVwiLCAgd2lkdGg6IFwiMzJcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJ0aW1lU3RhbXBcIiwgaGVhZGVyVGV4dDogXCJUaW1lXCIsICB3aWR0aDogXCIyMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsIGhlYWRlclRleHQ6IFwiRGVzY3JpcHRpb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJldmVudElkXCIsIGhlYWRlclRleHQ6IFwiSURcIiwgIHdpZHRoOiBcIjE2MFwiIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksIFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBNZXNzYWdlc1dpZGdldCB9OyJdfQ==
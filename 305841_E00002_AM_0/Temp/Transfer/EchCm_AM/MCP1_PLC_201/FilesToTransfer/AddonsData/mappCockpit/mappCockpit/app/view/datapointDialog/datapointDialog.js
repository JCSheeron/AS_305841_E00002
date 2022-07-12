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
define(["require", "exports", "../../framework/events", "./model/dataPoint", "./model/dataPointCategory", "./model/dataPointComponent", "./eventDatapointArgs"], function (require, exports, events_1, dataPoint_1, dataPointCategory_1, dataPointComponent_1, eventDatapointArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FooterContentType;
    (function (FooterContentType) {
        FooterContentType[FooterContentType["addReplaceClose"] = 0] = "addReplaceClose";
        FooterContentType[FooterContentType["applyClose"] = 1] = "applyClose";
    })(FooterContentType || (FooterContentType = {}));
    exports.FooterContentType = FooterContentType;
    var EventAddDatapoint = /** @class */ (function (_super) {
        __extends(EventAddDatapoint, _super);
        function EventAddDatapoint() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventAddDatapoint;
    }(events_1.TypedEvent));
    ;
    var EventDialogClosed = /** @class */ (function (_super) {
        __extends(EventDialogClosed, _super);
        function EventDialogClosed() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDialogClosed;
    }(events_1.TypedEvent));
    ;
    var DatapointDialog = /** @class */ (function () {
        function DatapointDialog() {
        }
        DatapointDialog.initialize = function (dialogId) {
            // Only init once
            //if(DatapointDialog._initDone == false){
            DatapointDialog._dialogId = "#" + dialogId;
            DatapointDialog._dataPointContentId = dialogId + "_ContentRoot";
            DatapointDialog._dataPointFooterId = dialogId + "_Footer";
            DatapointDialog._dataPointFooterScriptId = dialogId + "_FooterScript";
            // Add content div
            $(DatapointDialog._dialogId).append("<div id='" + DatapointDialog._dataPointContentId + "'></div>");
            // Add footer div
            $(DatapointDialog._dialogId).append("<script id=\"" + DatapointDialog._dataPointFooterScriptId + "\" type=\"text/x-jsrender\">\n            <div id=\"" + DatapointDialog._dataPointFooterId + "\" style=\"padding-left:10px; padding-top: 5px\"></div>\n            </script>");
            //DatapointDialog._initDone = true;
            //}
        };
        DatapointDialog.setDatapoints = function (data) {
            DatapointDialog._dataPointsData = new Array();
            var _loop_1 = function (i) {
                var dataPointInfo = data[i];
                var dataPointComponent = DatapointDialog._dataPointsData.filter(function (ele) { return ele.sourceName == dataPointInfo.componentName; })[0];
                if (dataPointComponent == undefined) {
                    dataPointComponent = new dataPointComponent_1.DataPointComponent(dataPointInfo.componentName);
                    DatapointDialog._dataPointsData.push(dataPointComponent);
                }
                var categoryName = DatapointDialog.getDataPointCategoryName(dataPointInfo.namespace);
                var dataPointCategory = dataPointComponent.childs.filter(function (ele) { return ele.sourceName == categoryName; })[0];
                if (dataPointCategory == undefined) {
                    dataPointCategory = new dataPointCategory_1.DataPointCategory(categoryName);
                    dataPointComponent.childs.push(dataPointCategory);
                }
                dataPointCategory.childs.push(new dataPoint_1.DataPoint(dataPointInfo));
            };
            for (var i = 0; i < data.length; i++) {
                _loop_1(i);
            }
            DatapointDialog.updateTreeGrid();
        };
        DatapointDialog.getDataPointCategoryName = function (namespaceName) {
            var categoryName = namespaceName;
            if (namespaceName == "*ACP") {
                categoryName = "Hardware: ACOPOS";
            }
            else if (namespaceName == "*DDP" || namespaceName == "*TRK") {
                categoryName = "Component on PLC";
            }
            return categoryName;
        };
        DatapointDialog.createDialog = function (dialogTitle) {
            $(DatapointDialog._dialogId).ejDialog({
                actionButtons: ["close"],
                height: "675px",
                width: "530px",
                title: dialogTitle,
                resize: function (args) { return DatapointDialog.resize(args); },
                enableModal: true,
                showFooter: true,
                footerTemplateId: DatapointDialog._dataPointFooterScriptId,
                close: function (args) { return DatapointDialog.onDialogClosed(); },
            });
        };
        DatapointDialog.resize = function (args) {
            // Set treegrid size to the Dialog size
            DatapointDialog._actualDialogHeight = args.model.height;
            DatapointDialog._actualDialogWidth = args.model.width;
            var treeGridObj = $("#" + DatapointDialog._dataPointContentId).data("ejTreeGrid"), sizeSettings = {
                height: DatapointDialog._actualDialogHeight - 107, width: DatapointDialog._actualDialogWidth - 30,
            };
            if (treeGridObj) {
                treeGridObj.option("sizeSettings", sizeSettings, true); // force the setting to resize the treegrid correct
            }
        };
        DatapointDialog.open = function (dialogTitle, footerContentType) {
            if (dialogTitle === void 0) { dialogTitle = "Add data points"; }
            if (footerContentType === void 0) { footerContentType = FooterContentType.addReplaceClose; }
            // Set dialog title
            $(DatapointDialog._dialogId).ejDialog({ title: dialogTitle });
            DatapointDialog.createDialog(dialogTitle);
            DatapointDialog.createContentOfDialog();
            // Set footer of the dialog
            DatapointDialog.createFooterOfDialog(footerContentType);
            var isOpen = $(DatapointDialog._dialogId).ejDialog("isOpen");
            if (!isOpen) {
                DatapointDialog.showDialog();
            }
        };
        DatapointDialog.close = function () {
            $(DatapointDialog._dialogId).ejDialog("close");
            var treeGridObj = $("#" + DatapointDialog._dataPointContentId).data("ejTreeGrid");
            treeGridObj.destroy();
        };
        DatapointDialog.showDialog = function () {
            $(DatapointDialog._dialogId).ejDialog("open");
            var treeGridObj = $("#" + DatapointDialog._dataPointContentId).data("ejTreeGrid"), sizeSettings = {
                height: DatapointDialog._actualDialogHeight - 107, width: DatapointDialog._actualDialogWidth - 30,
            };
            if (treeGridObj) {
                treeGridObj.option("sizeSettings", sizeSettings, true); // force the setting to resize the treegrid correct
            }
            $(DatapointDialog._dialogId).ejDialog({ height: DatapointDialog._actualDialogHeight });
            $(DatapointDialog._dialogId).ejDialog({ width: DatapointDialog._actualDialogWidth });
            $(DatapointDialog._dialogId).ejDialog("refresh");
        };
        DatapointDialog.createContentOfDialog = function () {
            $("#" + DatapointDialog._dataPointContentId).ejTreeGrid({
                columns: [
                    { field: "sourceName", headerText: "Name", width: 220 },
                    { field: "description", headerText: "Description", width: 300 },
                    { field: "dataPointName", headerText: "Data point", width: 300 },
                ],
                allowColumnResize: true,
                enableVirtualization: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.Normal },
                editSettings: { allowDeleting: false },
                childMapping: "childs",
                expandStateMapping: "expandState",
                sizeSettings: { height: "570px", width: "500px" },
                recordDoubleClick: function (args) { return DatapointDialog.onAddDatapoint(args.model.selectedItem, eventDatapointArgs_1.DatapointAction.add); },
            });
            DatapointDialog.updateTreeGrid();
        };
        DatapointDialog.createFooterOfDialog = function (footerContentType) {
            // Reset footer content
            $("#" + DatapointDialog._dataPointFooterId)[0].innerHTML = "";
            // Create footer content
            if (footerContentType == FooterContentType.applyClose) {
                DatapointDialog.createApplyCloseFooter();
            }
            else {
                DatapointDialog.createAddReplaceCloseFooter();
            }
        };
        DatapointDialog.createApplyCloseFooter = function () {
            var _this = this;
            $("#" + DatapointDialog._dataPointFooterId).append('<div id="replaceButton"></div>&nbsp;&nbsp;&nbsp;<div id="closeButton"></div>');
            $("#replaceButton").ejButton({
                text: "Apply",
                click: function (args) {
                    var treegridObj = $("#" + DatapointDialog._dataPointContentId).data("ejTreeGrid");
                    var selectedItem = treegridObj.model.selectedItem;
                    DatapointDialog.onAddDatapoint(selectedItem, eventDatapointArgs_1.DatapointAction.replace);
                }
            });
            $("#closeButton").ejButton({
                text: "Close",
                click: function (args) { _this.close(); }
            });
        };
        DatapointDialog.createAddReplaceCloseFooter = function () {
            var _this = this;
            $("#" + DatapointDialog._dataPointFooterId).append('<div id="addButton"></div>&nbsp;&nbsp;&nbsp;<div id="replaceButton"></div>&nbsp;&nbsp;&nbsp;<div id="closeButton"></div>');
            $("#addButton").ejButton({
                text: "Add",
                click: function (args) {
                    var treegridObj = $("#" + DatapointDialog._dataPointContentId).data("ejTreeGrid");
                    var selectedItem = treegridObj.model.selectedItem;
                    DatapointDialog.onAddDatapoint(selectedItem, eventDatapointArgs_1.DatapointAction.add);
                }
            });
            $("#replaceButton").ejButton({
                text: "Replace",
                click: function (args) {
                    var treegridObj = $("#" + DatapointDialog._dataPointContentId).data("ejTreeGrid");
                    var selectedItem = treegridObj.model.selectedItem;
                    DatapointDialog.onAddDatapoint(selectedItem, eventDatapointArgs_1.DatapointAction.replace);
                }
            });
            $("#closeButton").ejButton({
                text: "Close",
                click: function (args) { _this.close(); }
            });
        };
        DatapointDialog.updateTreeGrid = function () {
            var treegridObj = $("#" + DatapointDialog._dataPointContentId).data("ejTreeGrid");
            if (treegridObj != undefined) {
                // refresh TreeGrid with new datasource if tree grid is already available
                treegridObj.setModel({ "dataSource": DatapointDialog._dataPointsData });
            }
        };
        DatapointDialog.onAddDatapoint = function (datapoint, action) {
            if (datapoint.dataPointName != undefined && datapoint.dataPointName != "" && datapoint.dataPointInfo != undefined) {
                var eventArgs = new eventDatapointArgs_1.EventDatapointArgs(this, action, datapoint.dataPointInfo);
                this.eventAddDatapoint.raise(null, eventArgs);
            }
        };
        DatapointDialog.onDialogClosed = function () {
            DatapointDialog.eventDialogClosed.raise(null, null);
        };
        DatapointDialog.eventAddDatapoint = new EventAddDatapoint();
        DatapointDialog.eventDialogClosed = new EventDialogClosed();
        return DatapointDialog;
    }());
    exports.DatapointDialog = DatapointDialog;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXBvaW50RGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC92aWV3L2RhdGFwb2ludERpYWxvZy9kYXRhcG9pbnREaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BLElBQUssaUJBR0o7SUFIRCxXQUFLLGlCQUFpQjtRQUNsQiwrRUFBZSxDQUFBO1FBQ2YscUVBQVUsQ0FBQTtJQUNkLENBQUMsRUFISSxpQkFBaUIsS0FBakIsaUJBQWlCLFFBR3JCO0lBbVBRLDhDQUFpQjtJQWpQMUI7UUFBZ0MscUNBQW9DO1FBQXBFOztRQUFzRSxDQUFDO1FBQUQsd0JBQUM7SUFBRCxDQUFDLEFBQXZFLENBQWdDLG1CQUFVLEdBQTZCO0lBQUEsQ0FBQztJQUN4RTtRQUFnQyxxQ0FBc0I7UUFBdEQ7O1FBQXdELENBQUM7UUFBRCx3QkFBQztJQUFELENBQUMsQUFBekQsQ0FBZ0MsbUJBQVUsR0FBZTtJQUFBLENBQUM7SUFFMUQ7UUFBQTtRQTRPQSxDQUFDO1FBN05VLDBCQUFVLEdBQWpCLFVBQWtCLFFBQWdCO1lBQzlCLGlCQUFpQjtZQUNqQix5Q0FBeUM7WUFDckMsZUFBZSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO1lBQzNDLGVBQWUsQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLEdBQUcsY0FBYyxDQUFDO1lBQ2hFLGVBQWUsQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQzFELGVBQWUsQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLEdBQUcsZUFBZSxDQUFDO1lBQ3RFLGtCQUFrQjtZQUNsQixDQUFDLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUUsZUFBZSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBRW5HLGlCQUFpQjtZQUNqQixDQUFDLENBQUMsZUFBZSxDQUFDLFNBQVMs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O1lBQ2pGLElBQUcsV0FBVyxJQUFJLFNBQVMsRUFBQztnQkFDeEIseUVBQXlFO2dCQUN6RSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUMsWUFBWSxFQUFHLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2FBQzNFO1FBQ0wsQ0FBQztRQUVjLDhCQUFjLEdBQTdCLFVBQThCLFNBQW9CLEVBQUUsTUFBdUI7WUFFdkUsSUFBRyxTQUFTLENBQUMsYUFBYSxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsYUFBYSxJQUFJLEVBQUUsSUFBSSxTQUFTLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDN0csSUFBSSxTQUFTLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDN0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDakQ7UUFDTCxDQUFDO1FBRWMsOEJBQWMsR0FBN0I7WUFFSSxlQUFlLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBL05NLGlDQUFpQixHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUM1QyxpQ0FBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUErTnZELHNCQUFDO0tBQUEsQUE1T0QsSUE0T0M7SUFFMkIsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRGF0YVBvaW50IH0gZnJvbSBcIi4vbW9kZWwvZGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IERhdGFQb2ludENhdGVnb3J5IH0gZnJvbSBcIi4vbW9kZWwvZGF0YVBvaW50Q2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgRGF0YVBvaW50Q29tcG9uZW50IH0gZnJvbSBcIi4vbW9kZWwvZGF0YVBvaW50Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YXBvaW50QXJncywgRGF0YXBvaW50QWN0aW9uIH0gZnJvbSBcIi4vZXZlbnREYXRhcG9pbnRBcmdzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcblxyXG5lbnVtIEZvb3RlckNvbnRlbnRUeXBle1xyXG4gICAgYWRkUmVwbGFjZUNsb3NlLFxyXG4gICAgYXBwbHlDbG9zZSxcclxufVxyXG5cclxuY2xhc3MgRXZlbnRBZGREYXRhcG9pbnQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIEV2ZW50RGF0YXBvaW50QXJncz57IH07XHJcbmNsYXNzIEV2ZW50RGlhbG9nQ2xvc2VkIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBudWxsPnsgfTtcclxuXHJcbmNsYXNzIERhdGFwb2ludERpYWxvZ3tcclxuXHJcbiAgICAvL3ByaXZhdGUgc3RhdGljIF9pbml0RG9uZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2RhdGFQb2ludHNEYXRhO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2RpYWxvZ0lkO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2RhdGFQb2ludENvbnRlbnRJZDtcclxuICAgIHByaXZhdGUgc3RhdGljIF9kYXRhUG9pbnRGb290ZXJJZDtcclxuICAgIHByaXZhdGUgc3RhdGljIF9kYXRhUG9pbnRGb290ZXJTY3JpcHRJZDtcclxuICAgICAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIF9hY3R1YWxEaWFsb2dXaWR0aDtcclxuICAgIHByaXZhdGUgc3RhdGljIF9hY3R1YWxEaWFsb2dIZWlnaHQ7XHJcblxyXG4gICAgc3RhdGljIGV2ZW50QWRkRGF0YXBvaW50ID0gbmV3IEV2ZW50QWRkRGF0YXBvaW50KCk7XHJcbiAgICBzdGF0aWMgZXZlbnREaWFsb2dDbG9zZWQgPSBuZXcgRXZlbnREaWFsb2dDbG9zZWQoKTtcclxuICAgIFxyXG4gICAgc3RhdGljIGluaXRpYWxpemUoZGlhbG9nSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gT25seSBpbml0IG9uY2VcclxuICAgICAgICAvL2lmKERhdGFwb2ludERpYWxvZy5faW5pdERvbmUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBEYXRhcG9pbnREaWFsb2cuX2RpYWxvZ0lkID0gXCIjXCIgKyBkaWFsb2dJZDtcclxuICAgICAgICAgICAgRGF0YXBvaW50RGlhbG9nLl9kYXRhUG9pbnRDb250ZW50SWQgPSBkaWFsb2dJZCArIFwiX0NvbnRlbnRSb290XCI7XHJcbiAgICAgICAgICAgIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Rm9vdGVySWQgPSBkaWFsb2dJZCArIFwiX0Zvb3RlclwiO1xyXG4gICAgICAgICAgICBEYXRhcG9pbnREaWFsb2cuX2RhdGFQb2ludEZvb3RlclNjcmlwdElkID0gZGlhbG9nSWQgKyBcIl9Gb290ZXJTY3JpcHRcIjtcclxuICAgICAgICAgICAgLy8gQWRkIGNvbnRlbnQgZGl2XHJcbiAgICAgICAgICAgICQoRGF0YXBvaW50RGlhbG9nLl9kaWFsb2dJZCkuYXBwZW5kKFwiPGRpdiBpZD0nXCIrIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Q29udGVudElkICsgXCInPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEFkZCBmb290ZXIgZGl2XHJcbiAgICAgICAgICAgICQoRGF0YXBvaW50RGlhbG9nLl9kaWFsb2dJZCkuYXBwZW5kKGA8c2NyaXB0IGlkPVwiYCArIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Rm9vdGVyU2NyaXB0SWQgKyBgXCIgdHlwZT1cInRleHQveC1qc3JlbmRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiYCsgRGF0YXBvaW50RGlhbG9nLl9kYXRhUG9pbnRGb290ZXJJZCArYFwiIHN0eWxlPVwicGFkZGluZy1sZWZ0OjEwcHg7IHBhZGRpbmctdG9wOiA1cHhcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9zY3JpcHQ+YCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0RhdGFwb2ludERpYWxvZy5faW5pdERvbmUgPSB0cnVlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXREYXRhcG9pbnRzKGRhdGE6IEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50c0RhdGEgPSBuZXcgQXJyYXk8YW55PigpOyBcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludEluZm8gPSBkYXRhW2ldIGFzIFRyYWNlRGF0YVBvaW50SW5mbztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnRDb21wb25lbnQgPSBEYXRhcG9pbnREaWFsb2cuX2RhdGFQb2ludHNEYXRhLmZpbHRlcihlbGUgPT4gZWxlLnNvdXJjZU5hbWUgPT0gZGF0YVBvaW50SW5mby5jb21wb25lbnROYW1lKVswXTtcclxuICAgICAgICAgICAgaWYoZGF0YVBvaW50Q29tcG9uZW50ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBkYXRhUG9pbnRDb21wb25lbnQgPSBuZXcgRGF0YVBvaW50Q29tcG9uZW50KGRhdGFQb2ludEluZm8uY29tcG9uZW50TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBEYXRhcG9pbnREaWFsb2cuX2RhdGFQb2ludHNEYXRhLnB1c2goZGF0YVBvaW50Q29tcG9uZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNhdGVnb3J5TmFtZSA9IERhdGFwb2ludERpYWxvZy5nZXREYXRhUG9pbnRDYXRlZ29yeU5hbWUoZGF0YVBvaW50SW5mby5uYW1lc3BhY2UpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludENhdGVnb3J5ID0gZGF0YVBvaW50Q29tcG9uZW50LmNoaWxkcy5maWx0ZXIoZWxlID0+IGVsZS5zb3VyY2VOYW1lID09IGNhdGVnb3J5TmFtZSlbMF07XHJcbiAgICAgICAgICAgIGlmKGRhdGFQb2ludENhdGVnb3J5ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRhdGFQb2ludENhdGVnb3J5ID0gbmV3IERhdGFQb2ludENhdGVnb3J5KGNhdGVnb3J5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhUG9pbnRDb21wb25lbnQuY2hpbGRzLnB1c2goZGF0YVBvaW50Q2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhUG9pbnRDYXRlZ29yeS5jaGlsZHMucHVzaChuZXcgRGF0YVBvaW50KGRhdGFQb2ludEluZm8pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLnVwZGF0ZVRyZWVHcmlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGF0YVBvaW50Q2F0ZWdvcnlOYW1lKG5hbWVzcGFjZU5hbWUpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBjYXRlZ29yeU5hbWUgPSBuYW1lc3BhY2VOYW1lO1xyXG4gICAgICAgIGlmKG5hbWVzcGFjZU5hbWUgPT0gXCIqQUNQXCIpe1xyXG4gICAgICAgICAgICBjYXRlZ29yeU5hbWUgPSBcIkhhcmR3YXJlOiBBQ09QT1NcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihuYW1lc3BhY2VOYW1lID09IFwiKkREUFwiIHx8IG5hbWVzcGFjZU5hbWUgPT0gXCIqVFJLXCIpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lID0gXCJDb21wb25lbnQgb24gUExDXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYXRlZ29yeU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlRGlhbG9nKGRpYWxvZ1RpdGxlOiBzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoRGF0YXBvaW50RGlhbG9nLl9kaWFsb2dJZCkuZWpEaWFsb2coe1xyXG4gICAgICAgICAgICBhY3Rpb25CdXR0b25zOiBbXCJjbG9zZVwiXSxcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjY3NXB4XCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjUzMHB4XCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiBkaWFsb2dUaXRsZSxcclxuICAgICAgICAgICAgcmVzaXplOiAoYXJncykgPT4gRGF0YXBvaW50RGlhbG9nLnJlc2l6ZShhcmdzKSxcclxuICAgICAgICAgICAgZW5hYmxlTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dGb290ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGZvb3RlclRlbXBsYXRlSWQ6IERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Rm9vdGVyU2NyaXB0SWQsXHJcbiAgICAgICAgICAgIGNsb3NlOiAoYXJncykgPT4gRGF0YXBvaW50RGlhbG9nLm9uRGlhbG9nQ2xvc2VkKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVzaXplKGFyZ3Mpe1xyXG4gICAgICAgIC8vIFNldCB0cmVlZ3JpZCBzaXplIHRvIHRoZSBEaWFsb2cgc2l6ZVxyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5fYWN0dWFsRGlhbG9nSGVpZ2h0ID0gPG51bWJlcj5hcmdzLm1vZGVsIS5oZWlnaHQ7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLl9hY3R1YWxEaWFsb2dXaWR0aCA9IDxudW1iZXI+YXJncy5tb2RlbCEud2lkdGg7XHJcbiAgICAgICAgdmFyIHRyZWVHcmlkT2JqID0gJChcIiNcIisgRGF0YXBvaW50RGlhbG9nLl9kYXRhUG9pbnRDb250ZW50SWQpLmRhdGEoXCJlalRyZWVHcmlkXCIpLFxyXG4gICAgICAgICAgICBzaXplU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGhlaWdodDogRGF0YXBvaW50RGlhbG9nLl9hY3R1YWxEaWFsb2dIZWlnaHQtMTA3LCB3aWR0aDogRGF0YXBvaW50RGlhbG9nLl9hY3R1YWxEaWFsb2dXaWR0aC0zMCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0cmVlR3JpZE9iail7XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqLm9wdGlvbihcInNpemVTZXR0aW5nc1wiLCBzaXplU2V0dGluZ3MsIHRydWUpOyAvLyBmb3JjZSB0aGUgc2V0dGluZyB0byByZXNpemUgdGhlIHRyZWVncmlkIGNvcnJlY3RcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG9wZW4oZGlhbG9nVGl0bGU6IHN0cmluZyA9IFwiQWRkIGRhdGEgcG9pbnRzXCIsIGZvb3RlckNvbnRlbnRUeXBlOiBGb290ZXJDb250ZW50VHlwZSA9IEZvb3RlckNvbnRlbnRUeXBlLmFkZFJlcGxhY2VDbG9zZSl7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkaWFsb2cgdGl0bGVcclxuICAgICAgICAkKERhdGFwb2ludERpYWxvZy5fZGlhbG9nSWQpLmVqRGlhbG9nKHt0aXRsZTogZGlhbG9nVGl0bGUgfSk7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmNyZWF0ZURpYWxvZyhkaWFsb2dUaXRsZSk7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmNyZWF0ZUNvbnRlbnRPZkRpYWxvZygpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZm9vdGVyIG9mIHRoZSBkaWFsb2dcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuY3JlYXRlRm9vdGVyT2ZEaWFsb2coZm9vdGVyQ29udGVudFR5cGUpO1xyXG5cclxuICAgICAgICB2YXIgaXNPcGVuID0gJChEYXRhcG9pbnREaWFsb2cuX2RpYWxvZ0lkKS5lakRpYWxvZyhcImlzT3BlblwiKTtcclxuICAgICAgICBpZighaXNPcGVuKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIERhdGFwb2ludERpYWxvZy5zaG93RGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbG9zZSgpe1xyXG4gICAgICAgICQoRGF0YXBvaW50RGlhbG9nLl9kaWFsb2dJZCkuZWpEaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSAkKFwiI1wiKyBEYXRhcG9pbnREaWFsb2cuX2RhdGFQb2ludENvbnRlbnRJZCkuZGF0YShcImVqVHJlZUdyaWRcIik7XHJcbiAgICAgICAgdHJlZUdyaWRPYmouZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dEaWFsb2coKXtcclxuICAgICAgICAkKERhdGFwb2ludERpYWxvZy5fZGlhbG9nSWQpLmVqRGlhbG9nKFwib3BlblwiKTtcclxuICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSAkKFwiI1wiKyBEYXRhcG9pbnREaWFsb2cuX2RhdGFQb2ludENvbnRlbnRJZCkuZGF0YShcImVqVHJlZUdyaWRcIiksXHJcbiAgICAgICAgICAgIHNpemVTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiBEYXRhcG9pbnREaWFsb2cuX2FjdHVhbERpYWxvZ0hlaWdodC0xMDcsIHdpZHRoOiBEYXRhcG9pbnREaWFsb2cuX2FjdHVhbERpYWxvZ1dpZHRoLTMwLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRyZWVHcmlkT2JqKXtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmoub3B0aW9uKFwic2l6ZVNldHRpbmdzXCIsIHNpemVTZXR0aW5ncywgdHJ1ZSk7IC8vIGZvcmNlIHRoZSBzZXR0aW5nIHRvIHJlc2l6ZSB0aGUgdHJlZWdyaWQgY29ycmVjdFxyXG4gICAgICAgIH1cclxuICAgICAgICAkKERhdGFwb2ludERpYWxvZy5fZGlhbG9nSWQpLmVqRGlhbG9nKHtoZWlnaHQ6IERhdGFwb2ludERpYWxvZy5fYWN0dWFsRGlhbG9nSGVpZ2h0IH0pO1xyXG4gICAgICAgICQoRGF0YXBvaW50RGlhbG9nLl9kaWFsb2dJZCkuZWpEaWFsb2coe3dpZHRoOiBEYXRhcG9pbnREaWFsb2cuX2FjdHVhbERpYWxvZ1dpZHRoIH0pO1xyXG4gICAgICAgICQoRGF0YXBvaW50RGlhbG9nLl9kaWFsb2dJZCkuZWpEaWFsb2coXCJyZWZyZXNoXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUNvbnRlbnRPZkRpYWxvZygpe1xyXG4gICAgICAgIFxyXG4gICAgICAgICg8YW55PiQoXCIjXCIrIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwic291cmNlTmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IDIyMH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsIGhlYWRlclRleHQ6IFwiRGVzY3JpcHRpb25cIiwgd2lkdGg6IDMwMH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRhdGFQb2ludE5hbWVcIiwgaGVhZGVyVGV4dDogXCJEYXRhIHBvaW50XCIsIHdpZHRoOiAzMDB9LFxyXG4gICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGVuYWJsZVZpcnR1YWxpemF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLk5vcm1hbCB9LFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgYWxsb3dEZWxldGluZyA6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIGNoaWxkTWFwcGluZzpcImNoaWxkc1wiLFxyXG4gICAgICAgICAgICBleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuICAgICAgICAgICAgc2l6ZVNldHRpbmdzOiB7ICBoZWlnaHQ6IFwiNTcwcHhcIiwgd2lkdGg6IFwiNTAwcHhcIiB9LFxyXG4gICAgICAgICAgICByZWNvcmREb3VibGVDbGljazogKGFyZ3MpID0+IERhdGFwb2ludERpYWxvZy5vbkFkZERhdGFwb2ludChhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSwgRGF0YXBvaW50QWN0aW9uLmFkZCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLnVwZGF0ZVRyZWVHcmlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlRm9vdGVyT2ZEaWFsb2coZm9vdGVyQ29udGVudFR5cGU6IEZvb3RlckNvbnRlbnRUeXBlKXtcclxuICAgICAgICBcclxuICAgICAgICAvLyBSZXNldCBmb290ZXIgY29udGVudFxyXG4gICAgICAgICQoXCIjXCIgKyBEYXRhcG9pbnREaWFsb2cuX2RhdGFQb2ludEZvb3RlcklkKVswXS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZm9vdGVyIGNvbnRlbnRcclxuICAgICAgICBpZihmb290ZXJDb250ZW50VHlwZSA9PSBGb290ZXJDb250ZW50VHlwZS5hcHBseUNsb3NlKXtcclxuICAgICAgICAgICAgRGF0YXBvaW50RGlhbG9nLmNyZWF0ZUFwcGx5Q2xvc2VGb290ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgRGF0YXBvaW50RGlhbG9nLmNyZWF0ZUFkZFJlcGxhY2VDbG9zZUZvb3RlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVBcHBseUNsb3NlRm9vdGVyKCl7XHJcbiAgICAgICAgJChcIiNcIiArIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Rm9vdGVySWQpLmFwcGVuZCgnPGRpdiBpZD1cInJlcGxhY2VCdXR0b25cIj48L2Rpdj4mbmJzcDsmbmJzcDsmbmJzcDs8ZGl2IGlkPVwiY2xvc2VCdXR0b25cIj48L2Rpdj4nKTtcclxuICAgICAgICAoPGFueT4kKFwiI3JlcGxhY2VCdXR0b25cIikpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogXCJBcHBseVwiLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0cmVlZ3JpZE9iaiA9ICQoXCIjXCIrIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICAgICAgRGF0YXBvaW50RGlhbG9nLm9uQWRkRGF0YXBvaW50KHNlbGVjdGVkSXRlbSwgRGF0YXBvaW50QWN0aW9uLnJlcGxhY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgKDxhbnk+JChcIiNjbG9zZUJ1dHRvblwiKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkNsb3NlXCIsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4geyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVBZGRSZXBsYWNlQ2xvc2VGb290ZXIoKXtcclxuICAgICAgICAkKFwiI1wiICsgRGF0YXBvaW50RGlhbG9nLl9kYXRhUG9pbnRGb290ZXJJZCkuYXBwZW5kKCc8ZGl2IGlkPVwiYWRkQnV0dG9uXCI+PC9kaXY+Jm5ic3A7Jm5ic3A7Jm5ic3A7PGRpdiBpZD1cInJlcGxhY2VCdXR0b25cIj48L2Rpdj4mbmJzcDsmbmJzcDsmbmJzcDs8ZGl2IGlkPVwiY2xvc2VCdXR0b25cIj48L2Rpdj4nKTtcclxuICAgICAgICAoPGFueT4kKFwiI2FkZEJ1dHRvblwiKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkFkZFwiLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0cmVlZ3JpZE9iaiA9ICQoXCIjXCIrIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICAgICAgRGF0YXBvaW50RGlhbG9nLm9uQWRkRGF0YXBvaW50KHNlbGVjdGVkSXRlbSwgRGF0YXBvaW50QWN0aW9uLmFkZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgKDxhbnk+JChcIiNyZXBsYWNlQnV0dG9uXCIpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiUmVwbGFjZVwiLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0cmVlZ3JpZE9iaiA9ICQoXCIjXCIrIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICAgICAgRGF0YXBvaW50RGlhbG9nLm9uQWRkRGF0YXBvaW50KHNlbGVjdGVkSXRlbSwgRGF0YXBvaW50QWN0aW9uLnJlcGxhY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgKDxhbnk+JChcIiNjbG9zZUJ1dHRvblwiKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkNsb3NlXCIsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4geyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVUcmVlR3JpZCgpe1xyXG4gICAgICAgIHZhciB0cmVlZ3JpZE9iaiA9ICQoXCIjXCIrIERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuICAgICAgICBpZih0cmVlZ3JpZE9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyByZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2UgaWYgdHJlZSBncmlkIGlzIGFscmVhZHkgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIHRyZWVncmlkT2JqLnNldE1vZGVsKHtcImRhdGFTb3VyY2VcIiA6IERhdGFwb2ludERpYWxvZy5fZGF0YVBvaW50c0RhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyBvbkFkZERhdGFwb2ludChkYXRhcG9pbnQ6IERhdGFQb2ludCwgYWN0aW9uOiBEYXRhcG9pbnRBY3Rpb24pIHtcclxuXHJcbiAgICAgICAgaWYoZGF0YXBvaW50LmRhdGFQb2ludE5hbWUgIT0gdW5kZWZpbmVkICYmIGRhdGFwb2ludC5kYXRhUG9pbnROYW1lICE9IFwiXCIgJiYgZGF0YXBvaW50LmRhdGFQb2ludEluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGV2ZW50QXJncyA9IG5ldyBFdmVudERhdGFwb2ludEFyZ3ModGhpcywgYWN0aW9uLCBkYXRhcG9pbnQuZGF0YVBvaW50SW5mbylcclxuICAgICAgICAgICAgdGhpcy5ldmVudEFkZERhdGFwb2ludC5yYWlzZShudWxsLCBldmVudEFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBvbkRpYWxvZ0Nsb3NlZCgpIHtcclxuXHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50RGlhbG9nQ2xvc2VkLnJhaXNlKG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGb290ZXJDb250ZW50VHlwZSwgRGF0YXBvaW50RGlhbG9nIH07Il19
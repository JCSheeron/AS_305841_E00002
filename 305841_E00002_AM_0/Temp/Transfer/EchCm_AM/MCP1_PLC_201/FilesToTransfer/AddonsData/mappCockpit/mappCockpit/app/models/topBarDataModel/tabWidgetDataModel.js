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
define(["require", "exports", "../dataModelBase", "../../widgets/tabWidget/view/tabWidgetFlexTab", "./tabWidgetDataModelData", "../../widgets/tabWidget/view/tabWidgetFixedTab"], function (require, exports, dataModelBase_1, tabWidgetFlexTab_1, tabWidgetDataModelData_1, tabWidgetFixedTab_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetDataModel = /** @class */ (function (_super) {
        __extends(TabWidgetDataModel, _super);
        function TabWidgetDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._modelChangedHandler = function (sender, eventArgs) { _this.handleModelChanged(sender, eventArgs); };
            return _this;
        }
        TabWidgetDataModel.prototype.initialize = function () {
            this.data = new tabWidgetDataModelData_1.TabWidgetDataModelData();
            this.eventModelChanged.attach(this._modelChangedHandler);
            _super.prototype.initialize.call(this);
        };
        TabWidgetDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        TabWidgetDataModel.prototype.dispose = function () {
            this.eventModelChanged.detach(this._modelChangedHandler);
        };
        TabWidgetDataModel.prototype.connect = function () {
            throw new Error("Method not implemented.");
        };
        TabWidgetDataModel.prototype.onModelChanged = function (sender, data) {
            throw new Error("Method not implemented.");
        };
        TabWidgetDataModel.prototype.handleModelChanged = function (sender, data) {
            throw new Error("Method not implemented.");
        };
        TabWidgetDataModel.prototype.getData = function () {
            return this.data;
        };
        TabWidgetDataModel.prototype.addTab = function (newTab) {
            if (newTab instanceof tabWidgetFlexTab_1.TabWidgetFlexTab) {
                this.data.flexTabs.push(newTab);
            }
            else {
                this.data.fixedTabs.push(newTab);
            }
        };
        TabWidgetDataModel.prototype.getTabById = function (tabId) {
            for (var i = 0; i < this.getAllTabs().length; i++) {
                if (this.getAllTabs()[i].tabContainerId == tabId) {
                    return this.getAllTabs()[i];
                }
            }
            return undefined;
        };
        TabWidgetDataModel.prototype.getTabNameByTabId = function (tabId) {
            return tabId.replace("tab_", "");
        };
        TabWidgetDataModel.prototype.getFlexTabIndex = function (topBarTab) {
            return this.data.flexTabs.indexOf(topBarTab);
        };
        TabWidgetDataModel.prototype.setIndexOfFlexTab = function (index, topBarTab) {
            var oldIndex = this.data.flexTabs.indexOf(topBarTab);
            this.array_move(this.data.flexTabs, oldIndex, index);
        };
        TabWidgetDataModel.prototype.getAllTabs = function () {
            return this.data.flexTabs.concat(this.data.fixedTabs);
        };
        TabWidgetDataModel.prototype.getFlexTabs = function () {
            return this.data.flexTabs;
        };
        TabWidgetDataModel.prototype.getActiveTab = function () {
            for (var i = 0; i < this.getAllTabs().length; i++) {
                if (this.getAllTabs()[i].isActive) {
                    return this.getAllTabs()[i];
                }
            }
            return new tabWidgetFixedTab_1.TabWidgetFixedTab();
        };
        TabWidgetDataModel.prototype.setActiveTab = function (newActiveTab) {
            for (var i = 0; i < this.getAllTabs().length; i++) {
                if (this.getAllTabs()[i] == newActiveTab) {
                    this.getAllTabs()[i].isActive = true;
                }
                else {
                    this.getAllTabs()[i].isActive = false;
                }
            }
        };
        TabWidgetDataModel.prototype.setFlexTabPosition = function (newIndex, flexTab) {
            if (this.getFlexTabIndex(flexTab) < newIndex) {
                $("#" + flexTab.tabContainerId + "_tab").insertAfter("#" + this.data.flexTabs[newIndex].tabContainerId + "_tab");
            }
            else {
                $("#" + flexTab.tabContainerId + "_tab").insertBefore("#" + this.data.flexTabs[newIndex].tabContainerId + "_tab");
            }
            this.setIndexOfFlexTab(newIndex, flexTab);
        };
        TabWidgetDataModel.prototype.resizeWidgets = function (innerTabWidth, innerTabHeight) {
            var len = this.getAllTabs().length;
            for (var i = 0; i < this.getAllTabs().length; i++) {
                var widget = this.getAllTabs()[i].widget;
                if (widget != undefined) {
                    widget.resize(innerTabWidth, innerTabHeight);
                }
            }
        };
        TabWidgetDataModel.prototype.array_move = function (arr, old_index, new_index) {
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            console.log(" ");
            for (var i = 0; i < arr.length; i++) {
                console.log(arr[i].tabContainerId);
            }
            console.log(" ");
        };
        ;
        return TabWidgetDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.TabWidgetDataModel = TabWidgetDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvdG9wQmFyRGF0YU1vZGVsL3RhYldpZGdldERhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBaUMsc0NBQWE7UUFBOUM7WUFBQSxxRUFnSUM7WUEzSFcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7O1FBMkh6RyxDQUFDO1FBekhHLHVDQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksK0NBQXNCLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3pELGlCQUFNLFVBQVUsV0FBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxnREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELG9DQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCxvQ0FBTyxHQUFQO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCwyQ0FBYyxHQUFkLFVBQWUsTUFBa0IsRUFBRSxJQUEyQjtZQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELCtDQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLElBQTJCO1lBQzlELE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENB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U0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEVBQUUsRUFBRTtvQkFDUixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN2QjthQUNKO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdEM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFBQSxDQUFDO1FBQ04seUJBQUM7SUFBRCxDQUFDLEFBaElELENBQWlDLDZCQUFhLEdBZ0k3QztJQUNNLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUYWJXaWRnZXREYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RhYldpZGdldERhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBJVGFiV2lkZ2V0VGFiIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvdGFiV2lkZ2V0L2ludGVyZmFjZXMvdGFiV2lkZ2V0VGFiSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldEZsZXhUYWIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy90YWJXaWRnZXQvdmlldy90YWJXaWRnZXRGbGV4VGFiXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldERhdGFNb2RlbERhdGEgfSBmcm9tIFwiLi90YWJXaWRnZXREYXRhTW9kZWxEYXRhXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldEZpeGVkVGFiIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvdGFiV2lkZ2V0L3ZpZXcvdGFiV2lkZ2V0Rml4ZWRUYWJcIjtcclxuXHJcbmNsYXNzIFRhYldpZGdldERhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJVGFiV2lkZ2V0RGF0YU1vZGVse1xyXG4gICAgXHJcbiAgICBkYXRhOiBhbnk7ICAgIFxyXG4gICAgZGF0YVNvdXJjZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3MpIH07XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBuZXcgVGFiV2lkZ2V0RGF0YU1vZGVsRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX21vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fbW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdCgpOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhKCkgOiBhbnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUYWIobmV3VGFiOiBJVGFiV2lkZ2V0VGFiKXtcclxuICAgICAgICBpZihuZXdUYWIgaW5zdGFuY2VvZiBUYWJXaWRnZXRGbGV4VGFiKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmZsZXhUYWJzLnB1c2gobmV3VGFiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmZpeGVkVGFicy5wdXNoKG5ld1RhYik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFRhYkJ5SWQodGFiSWQ6c3RyaW5nKSA6IElUYWJXaWRnZXRUYWJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdldEFsbFRhYnMoKS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0QWxsVGFicygpW2ldLnRhYkNvbnRhaW5lcklkID09IHRhYklkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhYnMoKVtpXTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWJOYW1lQnlUYWJJZCh0YWJJZDpzdHJpbmcpIDogU3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0YWJJZC5yZXBsYWNlKFwidGFiX1wiLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGbGV4VGFiSW5kZXgodG9wQmFyVGFiIDogSVRhYldpZGdldFRhYik6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZsZXhUYWJzLmluZGV4T2YodG9wQmFyVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbmRleE9mRmxleFRhYihpbmRleCwgdG9wQmFyVGFiIDogSVRhYldpZGdldFRhYil7XHJcbiAgICAgICAgdmFyIG9sZEluZGV4ID0gdGhpcy5kYXRhLmZsZXhUYWJzLmluZGV4T2YodG9wQmFyVGFiKTtcclxuICAgICAgICB0aGlzLmFycmF5X21vdmUodGhpcy5kYXRhLmZsZXhUYWJzLG9sZEluZGV4LGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxUYWJzKCkgOiBJVGFiV2lkZ2V0VGFiW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5mbGV4VGFicy5jb25jYXQodGhpcy5kYXRhLmZpeGVkVGFicyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmxleFRhYnMoKSA6IElUYWJXaWRnZXRUYWJbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZsZXhUYWJzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjdGl2ZVRhYigpIDogSVRhYldpZGdldFRhYntcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRBbGxUYWJzKCkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldEFsbFRhYnMoKVtpXS5pc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxUYWJzKClbaV07XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgVGFiV2lkZ2V0Rml4ZWRUYWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmVUYWIobmV3QWN0aXZlVGFiIDpJVGFiV2lkZ2V0VGFiKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRBbGxUYWJzKCkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldEFsbFRhYnMoKVtpXSA9PSBuZXdBY3RpdmVUYWIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbGxUYWJzKClbaV0uaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFsbFRhYnMoKVtpXS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEZsZXhUYWJQb3NpdGlvbihuZXdJbmRleCwgZmxleFRhYiA6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RmxleFRhYkluZGV4KGZsZXhUYWIpIDwgbmV3SW5kZXgpe1xyXG4gICAgICAgICAgICAkKFwiI1wiK2ZsZXhUYWIudGFiQ29udGFpbmVySWQrXCJfdGFiXCIpLmluc2VydEFmdGVyKFwiI1wiK3RoaXMuZGF0YS5mbGV4VGFic1tuZXdJbmRleF0udGFiQ29udGFpbmVySWQrXCJfdGFiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAkKFwiI1wiK2ZsZXhUYWIudGFiQ29udGFpbmVySWQrXCJfdGFiXCIpLmluc2VydEJlZm9yZShcIiNcIit0aGlzLmRhdGEuZmxleFRhYnNbbmV3SW5kZXhdLnRhYkNvbnRhaW5lcklkK1wiX3RhYlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRJbmRleE9mRmxleFRhYihuZXdJbmRleCxmbGV4VGFiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNpemVXaWRnZXRzKGlubmVyVGFiV2lkdGgsIGlubmVyVGFiSGVpZ2h0KXtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5nZXRBbGxUYWJzKCkubGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdldEFsbFRhYnMoKS5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5nZXRBbGxUYWJzKClbaV0ud2lkZ2V0O1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5yZXNpemUoaW5uZXJUYWJXaWR0aCxpbm5lclRhYkhlaWdodClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gIFxyXG4gICAgfVxyXG5cclxuICAgIGFycmF5X21vdmUoYXJyLCBvbGRfaW5kZXgsIG5ld19pbmRleCkge1xyXG4gICAgICAgIGlmIChuZXdfaW5kZXggPj0gYXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgayA9IG5ld19pbmRleCAtIGFyci5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICB3aGlsZSAoay0tKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5zcGxpY2UobmV3X2luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZF9pbmRleCwgMSlbMF0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIFwiKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJyW2ldLnRhYkNvbnRhaW5lcklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgXCIpO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnR7VGFiV2lkZ2V0RGF0YU1vZGVsfSJdfQ==
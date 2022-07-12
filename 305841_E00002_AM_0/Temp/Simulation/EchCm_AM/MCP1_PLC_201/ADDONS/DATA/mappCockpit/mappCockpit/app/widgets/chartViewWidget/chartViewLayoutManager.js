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
define(["require", "exports", "../../framework/events", "./chartViewWidget", "../splitterWidget/splitterDefinition", "../../common/persistence/persistDataProvider", "../common/splitterComponentSettings"], function (require, exports, events_1, chartViewWidget_1, splitterDefinition_1, persistDataProvider_1, splitterComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventChartViewContentSizeChanged = /** @class */ (function (_super) {
        __extends(EventChartViewContentSizeChanged, _super);
        function EventChartViewContentSizeChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventChartViewContentSizeChanged;
    }(events_1.TypedEvent));
    ;
    var ChartViewLayoutManager = /** @class */ (function () {
        function ChartViewLayoutManager(chartViewWidget, component) {
            var _this = this;
            this.eventContentSizeChanged = new EventChartViewContentSizeChanged();
            this.chartSplitterParentContainerId = "ChartViewChartSplitterContainer"; // Container needed for scrollbar behavior (switch on/off)
            this.chartSplitterContainerId = "ChartViewChartSplitter"; // TODO: remove if possible => should be Cont31 (look for CSS and use class insted of id)
            this.chartViewToolbarContainerId = "ChartViewToolbar";
            this._chartViewWidgetToolbarButtonClickedHandler = function (sender, args) { return _this.chartViewWidget.onEventToolbarButtonClicked(sender, args); };
            this.chartViewWidget = chartViewWidget;
            this._component = component;
        }
        /**
         * initialize layout or chartViewWidget
         *
         * @param {string} containerID
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.initializeChartViewLayout = function () {
            var context = undefined;
            if (this._component != undefined) {
                context = this._component.context;
            }
            this.chartViewtoolbar = this._component.addSubComponent("ChartViewToolbar", "ChartViewToolbar", "", context);
            this.addChartViewToolbarToView(this.chartViewtoolbar, this.chartViewWidget.view);
            this.chartViewtoolbar.initialize();
            // add widget to the parent container
            this.chartViewtoolbar.addToParentContainerId(this.chartViewToolbarContainerId);
            this.chartViewtoolbar.eventToolbarButtonClicked.attach(this._chartViewWidgetToolbarButtonClickedHandler);
            this.initializeChartSplitter(this.chartSplitterContainerId);
        };
        /**
         * Dispose the chart view layout manager
         *
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.dispose = function () {
            if (this.chartViewtoolbar != undefined) {
                this.chartViewtoolbar.eventToolbarButtonClicked.detach(this._chartViewWidgetToolbarButtonClickedHandler);
                this.chartViewtoolbar.dispose();
            }
            if (this.chartSplitter != undefined) {
                this.chartSplitter.dispose();
            }
        };
        /**
         * adds the toolbar to the view explicitly.
         *
         * @param {IView} view
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.addChartViewToolbarToView = function (chartViewToolbar, view) {
            if (view) {
                view.addWidget(chartViewToolbar);
            }
        };
        /**
         * add needed containers for chartView
         *
         * @param {*} chartViewContainerDiv
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.addChartViewContainers = function (chartViewContainerDiv) {
            this.addChartViewToolbarContainer(chartViewContainerDiv);
            this.addChartSplitterContainer(chartViewContainerDiv);
        };
        /**
         * resize layout
         *
         * @param {number} width
         * @param {number} height
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.resize = function (width, height) {
            this.chartSplitter.resize(width, height);
        };
        /**
         *initialize chartSplitter
         *
         * @private
         * @param {string} containerID
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.initializeChartSplitter = function (containerID) {
            var defaultChartSplitterDefinitionId = "ChartSplitterDefinitionId";
            persistDataProvider_1.PersistDataProvider.getInstance().setDefaultDataWithId(defaultChartSplitterDefinitionId, ChartViewLayoutManager.getDefaultChartSplitterDefinition());
            this.chartSplitter = this._component.addSubComponent("SplitterWidget", containerID, defaultChartSplitterDefinitionId);
            this.chartSplitter.setDefaultComponentSettingsDataId(defaultChartSplitterDefinitionId);
            this.chartSplitter.initialize();
            // add widget to the parent container
            this.chartSplitter.addToParentContainerId(containerID);
        };
        ChartViewLayoutManager.getDefaultChartSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical, false);
            return splitterComponentSettings;
        };
        /**
         * Adds a chart splitter container div to the given chart view container
         *
         * @param {*} chartViewContainerId
         * @returns {string}
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.addChartSplitterContainer = function (chartViewContainerDiv) {
            var rect = chartViewContainerDiv[0].getBoundingClientRect();
            var splitterHeight = $(window).height() - rect.top;
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '.splitterStyle { height: ' + splitterHeight + 'px }';
            document.getElementsByTagName('head')[0].appendChild(style);
            chartViewContainerDiv.append("<div style='overflow: hidden auto; flex: 1' class='content' id='" + this.chartSplitterParentContainerId + "'> </div>");
            $("#" + this.chartSplitterParentContainerId).append("<div style='overflow: hidden auto' class='content' id='" + this.chartSplitterContainerId + "'> </div>");
        };
        /**
         * Adds a toolbar container div to the given chart view container
         *
         * @private
         * @param {JQuery<HTMLElement>} chartViewContainerDiv
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.addChartViewToolbarContainer = function (chartViewContainerDiv) {
            var toolbarContainerDiv = document.createElement("div");
            toolbarContainerDiv.id = this.chartViewToolbarContainerId;
            toolbarContainerDiv.classList.add("content");
            toolbarContainerDiv.style.overflow = "hidden";
            chartViewContainerDiv.append(toolbarContainerDiv);
        };
        /**
         * updateCharts by rereading series in all charts
         *      *
         * @param {Array<ITraceChart>} traceChartList
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.updateCharts = function (traceChartList) {
            for (var i = 0; i < traceChartList.length; i++) {
                traceChartList[i].setAvailableSeriesAsDataSource();
            }
        };
        /**
         * returns ZoomAxes for a given string, undefined if string does not equal any axis
         *
         * @param {string} zoomAxesString
         * @returns {(ZoomAxes|undefined)}
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.getZoomAxesFromString = function (zoomAxesString) {
            switch (zoomAxesString) {
                case "X":
                    return chartViewWidget_1.ZoomDirection.X;
                case "Y":
                    return chartViewWidget_1.ZoomDirection.Y;
                case "XY":
                    return chartViewWidget_1.ZoomDirection.XY;
                default:
                    return undefined;
            }
        };
        /**
         * Get height of pane from chartSplitter persisted pane
         *
         * @param {string} chartName
         * @returns {number}
         * @memberof SplitterWidget
         */
        ChartViewLayoutManager.prototype.getChartViewSplitterHeight = function (paneDefinitions, chartName) {
            for (var i = 0; i < paneDefinitions.length; i++) {
                if (paneDefinitions[i].paneData != undefined) {
                    if (paneDefinitions[i].paneData.data != undefined && paneDefinitions[i].componentDefinition.id == chartName) {
                        return paneDefinitions[i].paneData.data.size;
                    }
                }
            }
            //Return default size if there is no data available
            return 300;
        };
        return ChartViewLayoutManager;
    }());
    exports.ChartViewLayoutManager = ChartViewLayoutManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3TGF5b3V0TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3TGF5b3V0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBaUJBO1FBQWdELG9EQUFzQjtRQUF0RTs7UUFBd0UsQ0FBQztRQUFELHVDQUFDO0lBQUQsQ0FBQyxBQUF6RSxDQUFnRCxtQkFBVSxHQUFlO0lBQUEsQ0FBQztJQUMxRTtRQWdCSSxnQ0FBWSxlQUFnQyxFQUFFLFNBQXdCO1lBQXRFLGlCQUdDO1lBYkQsNEJBQXVCLEdBQUcsSUFBSSxnQ0FBZ0MsRUFBRSxDQUFDO1lBRXhELG1DQUE4QixHQUFXLGlDQUFpQyxDQUFDLENBQUMsMERBQTBEO1lBQ3RJLDZCQUF3QixHQUFXLHdCQUF3QixDQUFDLENBQUMseUZBQXlGO1lBQ3RKLGdDQUEyQixHQUFXLGtCQUFrQixDQUFDO1lBSTFELGdEQUEyQyxHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsMkJBQTJCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUE3RCxDQUE2RCxDQUFDO1lBR2pJLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDBEQUF5QixHQUF6QjtZQUNJLElBQUksT0FBTyxHQUErQixTQUFTLENBQUM7WUFDcEQsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2FBQ3JDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsZUFBZSxDQUFDLGtCQUFr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b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbn0gZnJvbSBcIi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1dpZGdldCB9IGZyb20gXCIuL2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBJU3BsaXR0ZXJXaWRnZXQgfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvaW50ZXJmYWNlcy9zcGxpdHRlcldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgSUNoYXJ0Vmlld1Rvb2xiYXIgfSBmcm9tIFwiLi90b29sYmFyL2ludGVyZmFjZXMvY2hhcnRWaWV3VG9vbGJhckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFQcm92aWRlclwiO1xyXG5cclxuaW1wb3J0IHsgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21tb24vc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50Q29udGV4dCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRDb250ZXh0XCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyUGFuZURlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJQYW5lRGVmaW5pdGlvblwiO1xyXG5cclxuY2xhc3MgRXZlbnRDaGFydFZpZXdDb250ZW50U2l6ZUNoYW5nZWQgIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBudWxsPnsgfTtcclxuY2xhc3MgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciB7XHJcblxyXG4gICAgY2hhcnRWaWV3V2lkZ2V0IDogQ2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgY2hhcnRTcGxpdHRlciEgOiBJU3BsaXR0ZXJXaWRnZXQ7XHJcbiAgICBjaGFydFZpZXd0b29sYmFyISA6IElDaGFydFZpZXdUb29sYmFyOyBcclxuXHJcbiAgICBldmVudENvbnRlbnRTaXplQ2hhbmdlZCA9IG5ldyBFdmVudENoYXJ0Vmlld0NvbnRlbnRTaXplQ2hhbmdlZCgpO1xyXG5cclxuICAgIHJlYWRvbmx5IGNoYXJ0U3BsaXR0ZXJQYXJlbnRDb250YWluZXJJZDogc3RyaW5nID0gXCJDaGFydFZpZXdDaGFydFNwbGl0dGVyQ29udGFpbmVyXCI7IC8vIENvbnRhaW5lciBuZWVkZWQgZm9yIHNjcm9sbGJhciBiZWhhdmlvciAoc3dpdGNoIG9uL29mZilcclxuICAgIHJlYWRvbmx5IGNoYXJ0U3BsaXR0ZXJDb250YWluZXJJZDogc3RyaW5nID0gXCJDaGFydFZpZXdDaGFydFNwbGl0dGVyXCI7IC8vIFRPRE86IHJlbW92ZSBpZiBwb3NzaWJsZSA9PiBzaG91bGQgYmUgQ29udDMxIChsb29rIGZvciBDU1MgYW5kIHVzZSBjbGFzcyBpbnN0ZWQgb2YgaWQpXHJcbiAgICByZWFkb25seSBjaGFydFZpZXdUb29sYmFyQ29udGFpbmVySWQ6IHN0cmluZyA9IFwiQ2hhcnRWaWV3VG9vbGJhclwiO1xyXG5cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudDogQ29tcG9uZW50QmFzZXx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRWaWV3V2lkZ2V0VG9vbGJhckJ1dHRvbkNsaWNrZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB0aGlzLmNoYXJ0Vmlld1dpZGdldC5vbkV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0LCBjb21wb25lbnQ6IENvbXBvbmVudEJhc2Upe1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0ID0gY2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemUgbGF5b3V0IG9yIGNoYXJ0Vmlld1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJJRFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUNoYXJ0Vmlld0xheW91dCgpe1xyXG4gICAgICAgIGxldCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29udGV4dCA9IHRoaXMuX2NvbXBvbmVudC5jb250ZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIgPSB0aGlzLl9jb21wb25lbnQhLmFkZFN1YkNvbXBvbmVudChcIkNoYXJ0Vmlld1Rvb2xiYXJcIiwgXCJDaGFydFZpZXdUb29sYmFyXCIsIFwiXCIsIGNvbnRleHQpIGFzIFdpZGdldHMuSUNoYXJ0Vmlld1Rvb2xiYXI7XHJcbiAgICAgICAgdGhpcy5hZGRDaGFydFZpZXdUb29sYmFyVG9WaWV3KCB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIsdGhpcy5jaGFydFZpZXdXaWRnZXQudmlldyk7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXd0b29sYmFyLmluaXRpYWxpemUoKTtcclxuICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXd0b29sYmFyLmFkZFRvUGFyZW50Q29udGFpbmVySWQodGhpcy5jaGFydFZpZXdUb29sYmFyQ29udGFpbmVySWQpO1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhci5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLmF0dGFjaCh0aGlzLl9jaGFydFZpZXdXaWRnZXRUb29sYmFyQnV0dG9uQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNoYXJ0U3BsaXR0ZXIodGhpcy5jaGFydFNwbGl0dGVyQ29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgY2hhcnQgdmlldyBsYXlvdXQgbWFuYWdlciBcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5jaGFydFZpZXd0b29sYmFyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhci5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLmRldGFjaCh0aGlzLl9jaGFydFZpZXdXaWRnZXRUb29sYmFyQnV0dG9uQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNoYXJ0U3BsaXR0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFNwbGl0dGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGRzIHRoZSB0b29sYmFyIHRvIHRoZSB2aWV3IGV4cGxpY2l0bHkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVmlld30gdmlld1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgYWRkQ2hhcnRWaWV3VG9vbGJhclRvVmlldyhjaGFydFZpZXdUb29sYmFyOiBJQ2hhcnRWaWV3VG9vbGJhciwgdmlldzogSVZpZXd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICB2aWV3LmFkZFdpZGdldChjaGFydFZpZXdUb29sYmFyKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIG5lZWRlZCBjb250YWluZXJzIGZvciBjaGFydFZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0Vmlld0NvbnRhaW5lckRpdlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgYWRkQ2hhcnRWaWV3Q29udGFpbmVycyhjaGFydFZpZXdDb250YWluZXJEaXY6IEpRdWVyeTxIVE1MRWxlbWVudD4pe1xyXG4gICAgICAgIHRoaXMuYWRkQ2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcihjaGFydFZpZXdDb250YWluZXJEaXYpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hhcnRTcGxpdHRlckNvbnRhaW5lcihjaGFydFZpZXdDb250YWluZXJEaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVzaXplIGxheW91dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXsgICBcclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIucmVzaXplKHdpZHRoLGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKmluaXRpYWxpemUgY2hhcnRTcGxpdHRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVySURcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUNoYXJ0U3BsaXR0ZXIoY29udGFpbmVySUQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkZWZhdWx0Q2hhcnRTcGxpdHRlckRlZmluaXRpb25JZCA9IFwiQ2hhcnRTcGxpdHRlckRlZmluaXRpb25JZFwiO1xyXG4gICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREZWZhdWx0RGF0YVdpdGhJZChkZWZhdWx0Q2hhcnRTcGxpdHRlckRlZmluaXRpb25JZCwgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlci5nZXREZWZhdWx0Q2hhcnRTcGxpdHRlckRlZmluaXRpb24oKSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlciA9IHRoaXMuX2NvbXBvbmVudCEuYWRkU3ViQ29tcG9uZW50KFwiU3BsaXR0ZXJXaWRnZXRcIiwgY29udGFpbmVySUQsIGRlZmF1bHRDaGFydFNwbGl0dGVyRGVmaW5pdGlvbklkKSBhcyBJU3BsaXR0ZXJXaWRnZXQ7IFxyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlci5zZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NEYXRhSWQoZGVmYXVsdENoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlci5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlci5hZGRUb1BhcmVudENvbnRhaW5lcklkKGNvbnRhaW5lcklEKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXREZWZhdWx0Q2hhcnRTcGxpdHRlckRlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyA9IG5ldyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzKFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvblZlcnRpY2FsLCBmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgY2hhcnQgc3BsaXR0ZXIgY29udGFpbmVyIGRpdiB0byB0aGUgZ2l2ZW4gY2hhcnQgdmlldyBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0Vmlld0NvbnRhaW5lcklkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFNwbGl0dGVyQ29udGFpbmVyKGNoYXJ0Vmlld0NvbnRhaW5lckRpdjogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgIHZhciByZWN0ID0gY2hhcnRWaWV3Q29udGFpbmVyRGl2WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBzcGxpdHRlckhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSEgLSByZWN0LnRvcDtcclxuXHJcbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSAnLnNwbGl0dGVyU3R5bGUgeyBoZWlnaHQ6ICcgKyBzcGxpdHRlckhlaWdodCArICdweCB9JztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICAgICAgY2hhcnRWaWV3Q29udGFpbmVyRGl2LmFwcGVuZChcIjxkaXYgc3R5bGU9J292ZXJmbG93OiBoaWRkZW4gYXV0bzsgZmxleDogMScgY2xhc3M9J2NvbnRlbnQnIGlkPSdcIiArIHRoaXMuY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkICsgXCInPiA8L2Rpdj5cIik7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMuY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkKS5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdvdmVyZmxvdzogaGlkZGVuIGF1dG8nIGNsYXNzPSdjb250ZW50JyBpZD0nXCIgKyB0aGlzLmNoYXJ0U3BsaXR0ZXJDb250YWluZXJJZCArIFwiJz4gPC9kaXY+XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHRvb2xiYXIgY29udGFpbmVyIGRpdiB0byB0aGUgZ2l2ZW4gY2hhcnQgdmlldyBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSBjaGFydFZpZXdDb250YWluZXJEaXZcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcihjaGFydFZpZXdDb250YWluZXJEaXY6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICB2YXIgdG9vbGJhckNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdG9vbGJhckNvbnRhaW5lckRpdi5pZCA9IHRoaXMuY2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcklkO1xyXG4gICAgICAgIHRvb2xiYXJDb250YWluZXJEaXYuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIik7XHJcbiAgICAgICAgdG9vbGJhckNvbnRhaW5lckRpdi5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgY2hhcnRWaWV3Q29udGFpbmVyRGl2LmFwcGVuZCh0b29sYmFyQ29udGFpbmVyRGl2KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVDaGFydHMgYnkgcmVyZWFkaW5nIHNlcmllcyBpbiBhbGwgY2hhcnRzXHJcbiAgICAgKiAgICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVRyYWNlQ2hhcnQ+fSB0cmFjZUNoYXJ0TGlzdFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ2hhcnRzKHRyYWNlQ2hhcnRMaXN0OiBBcnJheTxJVHJhY2VDaGFydD4pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnRMaXN0W2ldLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgWm9vbUF4ZXMgZm9yIGEgZ2l2ZW4gc3RyaW5nLCB1bmRlZmluZWQgaWYgc3RyaW5nIGRvZXMgbm90IGVxdWFsIGFueSBheGlzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHpvb21BeGVzU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB7KFpvb21BeGVzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBnZXRab29tQXhlc0Zyb21TdHJpbmcoem9vbUF4ZXNTdHJpbmcgOiBzdHJpbmcpOiBab29tRGlyZWN0aW9ufHVuZGVmaW5lZHtcclxuICAgICAgICBzd2l0Y2goem9vbUF4ZXNTdHJpbmcpe1xyXG4gICAgICAgICAgICBjYXNlIFwiWFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvb21EaXJlY3Rpb24uWFxyXG4gICAgICAgICAgICBjYXNlIFwiWVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvb21EaXJlY3Rpb24uWVxyXG4gICAgICAgICAgICBjYXNlIFwiWFlcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBab29tRGlyZWN0aW9uLlhZXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaGVpZ2h0IG9mIHBhbmUgZnJvbSBjaGFydFNwbGl0dGVyIHBlcnNpc3RlZCBwYW5lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcnRWaWV3U3BsaXR0ZXJIZWlnaHQocGFuZURlZmluaXRpb25zOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPiwgY2hhcnROYW1lOiBzdHJpbmcpOiBudW1iZXJ7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYW5lRGVmaW5pdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHBhbmVEZWZpbml0aW9uc1tpXS5wYW5lRGF0YSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYW5lRGVmaW5pdGlvbnNbaV0ucGFuZURhdGEuZGF0YSAhPSB1bmRlZmluZWQgJiYgcGFuZURlZmluaXRpb25zW2ldLmNvbXBvbmVudERlZmluaXRpb24uaWQgPT0gY2hhcnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhbmVEZWZpbml0aW9uc1tpXS5wYW5lRGF0YS5kYXRhLnNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vUmV0dXJuIGRlZmF1bHQgc2l6ZSBpZiB0aGVyZSBpcyBubyBkYXRhIGF2YWlsYWJsZVxyXG4gICAgICAgIHJldHVybiAzMDA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlcn07Il19
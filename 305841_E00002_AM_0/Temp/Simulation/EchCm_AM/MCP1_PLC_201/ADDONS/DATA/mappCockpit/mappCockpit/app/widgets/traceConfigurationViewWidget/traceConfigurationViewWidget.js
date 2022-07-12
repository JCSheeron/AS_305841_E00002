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
define(["require", "exports", "../common/viewBase", "./componentDefaultDefinition"], function (require, exports, viewBase_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the trace configuration view widget
     *
     * @class TraceConfigurationViewWidget
     * @extends {WidgetBase}
     */
    var TraceConfigurationViewWidget = /** @class */ (function (_super) {
        __extends(TraceConfigurationViewWidget, _super);
        function TraceConfigurationViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            return _this;
        }
        TraceConfigurationViewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setTraceControlWidget();
            this.setMessagesWidget();
            // attach layout of traceConfigurationWidget to view
            this.attachLayoutToView(this);
        };
        TraceConfigurationViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetTraceConfigurationViewId);
            this.attachLayoutToView(this);
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
        };
        TraceConfigurationViewWidget.prototype.dispose = function () {
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * set the trace control widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.setTraceControlWidget = function () {
            this._traceControlWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.TraceControlWidgetId);
        };
        /**
         * set the messages widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.setMessagesWidget = function () {
            this._messagesWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.TraceConfigurationMessagesWidgetId);
        };
        /** resizes the trace configuration view widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        Object.defineProperty(TraceConfigurationViewWidget.prototype, "activeComponent", {
            /**
             * Sets the active component to be displayed by the component view
             *
             * @memberof TraceConfigurationViewWidget
             */
            set: function (activeComponent) {
                var _this = this;
                this._activeComponent = activeComponent;
                this._activeComponent.value.initialize().then(function () {
                    _this.connectComponent(_this._activeComponent.value);
                });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Connects the active component
         *
         * @private
         * @param {MappCockpitComponent} activeComponent
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectComponent = function (activeComponent) {
            var _this = this;
            activeComponent.mappCockpitComponent.commandConnectComponent.execute(null, function () {
                if (activeComponent.mappCockpitComponent.parametersSource != undefined) {
                    _this.connectMessagesWidget(activeComponent.mappCockpitComponent.messageParametersSource);
                }
                if (activeComponent.traceControlInterface != undefined) {
                    _this.connectTraceControlWidget(activeComponent.traceControlInterface);
                }
            });
        };
        /**
         *   Connects the messages widget to the component parameters
         *
         * @param {Property<MappCockpitComponentParameter[]>} parametersSource
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectMessagesWidget = function (componentParametersLink) {
            if (this._messagesWidget) {
                this._messagesWidget.messageParameters = componentParametersLink;
            }
        };
        /**
         *   Connects the trace control widget to the trace control provider
         *
         * @param {ITraceComponentControl} traceControlProvider
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectTraceControlWidget = function (traceComponentControl) {
            if (this._traceControlWidget) {
                this._traceControlWidget.traceControlInterface = traceComponentControl;
            }
        };
        TraceConfigurationViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return TraceConfigurationViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceConfigurationViewWidget = TraceConfigurationViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0L3RyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBOzs7OztPQUtHO0lBQ0g7UUFBMkMsZ0RBQVE7UUFBbkQ7WUFBQSxxRUErSUM7WUF4SVcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQzs7UUF3SWhHLENBQUM7UUF0SUcsMERBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrREFBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFeEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFFekIsb0RBQW9EO1lBQ3BELElBQUksQ0FBQyxrQkFBa0IsQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsdURBQWdCLEdBQWhCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyx1REFBMEIsQ0FBQyxzQ0FBc0MsQ0FBNEIsQ0FBQztZQUNsSixJQUFJLENBQUMsa0JBQWtCLENBQU0sSUFBSSxDQUFDLENBQUM7WUFFbkMsSUFBSSxD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LFVBQTJCLE1BQU0sRUFBRSxJQUFJO1lBRW5DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBL0lELENBQTJDLG1CQUFRLEdBK0lsRDtJQUVRLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHZpZXcgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIGltcGxlbWVudHMgSVRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX3RyYWNlQ29udHJvbFdpZGdldCE6IFdpZGdldHMuSVRyYWNlQ29udHJvbFdpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVDb21wb25lbnQhOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50PjtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VzV2lkZ2V0OiBXaWRnZXRzLklNZXNzYWdlc1dpZGdldCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VDb250cm9sV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlc1dpZGdldCgpO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggbGF5b3V0IG9mIHRyYWNlQ29uZmlndXJhdGlvbldpZGdldCB0byB2aWV3XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoPGFueT50aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldFRyYWNlQ29uZmlndXJhdGlvblZpZXdJZCkgYXMgV2lkZ2V0cy5JU3BsaXR0ZXJXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoPGFueT50aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmluaXRpYWxpemUoKTtcclxuICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmFkZFRvUGFyZW50Q29udGFpbmVyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSB0cmFjZSBjb250cm9sIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2V0VHJhY2VDb250cm9sV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5UcmFjZUNvbnRyb2xXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JVHJhY2VDb250cm9sV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtZXNzYWdlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldE1lc3NhZ2VzV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlRyYWNlQ29uZmlndXJhdGlvbk1lc3NhZ2VzV2lkZ2V0SWQpIGFzIFdpZGdldHMuSU1lc3NhZ2VzV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9ICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBjb21wb25lbnQgdG8gYmUgZGlzcGxheWVkIGJ5IHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgYWN0aXZlQ29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudDogUHJvcGVydHk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4pIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmVDb21wb25lbnQgPSBhY3RpdmVDb21wb25lbnQ7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLmluaXRpYWxpemUoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdENvbXBvbmVudCh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIGFjdGl2ZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gYWN0aXZlQ29tcG9uZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RDb21wb25lbnQoYWN0aXZlQ29tcG9uZW50OiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgYWN0aXZlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50LmNvbW1hbmRDb25uZWN0Q29tcG9uZW50LmV4ZWN1dGUobnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihhY3RpdmVDb21wb25lbnQubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVyc1NvdXJjZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0TWVzc2FnZXNXaWRnZXQoYWN0aXZlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50Lm1lc3NhZ2VQYXJhbWV0ZXJzU291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihhY3RpdmVDb21wb25lbnQudHJhY2VDb250cm9sSW50ZXJmYWNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUcmFjZUNvbnRyb2xXaWRnZXQoYWN0aXZlQ29tcG9uZW50LnRyYWNlQ29udHJvbEludGVyZmFjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICAgQ29ubmVjdHMgdGhlIG1lc3NhZ2VzIHdpZGdldCB0byB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fSBwYXJhbWV0ZXJzU291cmNlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdE1lc3NhZ2VzV2lkZ2V0KGNvbXBvbmVudFBhcmFtZXRlcnNMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPik6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21lc3NhZ2VzV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0Lm1lc3NhZ2VQYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVyc0xpbms7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogICBDb25uZWN0cyB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXQgdG8gdGhlIHRyYWNlIGNvbnRyb2wgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNvbXBvbmVudENvbnRyb2x9IHRyYWNlQ29udHJvbFByb3ZpZGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdFRyYWNlQ29udHJvbFdpZGdldCh0cmFjZUNvbXBvbmVudENvbnRyb2w6IElUcmFjZUNvbXBvbmVudENvbnRyb2wpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnRyYWNlQ29udHJvbEludGVyZmFjZSA9IHRyYWNlQ29tcG9uZW50Q29udHJvbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG5cclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0IH07Il19
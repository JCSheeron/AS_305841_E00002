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
    var ComponentViewWidget = /** @class */ (function (_super) {
        __extends(ComponentViewWidget, _super);
        function ComponentViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            return _this;
        }
        ComponentViewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        Object.defineProperty(ComponentViewWidget.prototype, "activeComponent", {
            /**
             * Sets the active component to be displayed by the component view
             *
             * @memberof ComponentViewWidget
             */
            set: function (activeComponent) {
                this._activeComponent = activeComponent;
                this.connectComponent(activeComponent);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Connects the active component
         *
         * @private
         * @param {Property<MappCockpitComponent>} activeComponent
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectComponent = function (activeComponent) {
            var _this = this;
            activeComponent.value.commandConnectComponent.execute(null, function () {
                _this.connectPanes();
            });
        };
        /**
         * Connects the panes to the component members
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectPanes = function () {
            if (this._activeComponent.value.methodsSource != undefined) {
                this.connectMethodsWidget(this._activeComponent.value.userMethods, this._activeComponent.value.quickCommands, this._activeComponent.value.watchableParametersSource.value);
            }
            if (this._activeComponent.value.parametersSource != undefined) {
                this.connectWatchablesWidget(this._activeComponent.value.watchableParametersSource, this._activeComponent.value.watchableStateParameters);
                this.connectMessagesWidget(this._activeComponent.value.messageParametersSource);
                if (this._activeComponent.value.methodsSource != undefined) {
                    this.connectConfigurationManagerWidget(this._activeComponent.value.methodsSource, this._activeComponent.value.configurationParametersSource, this._activeComponent.value.writeAccess.value);
                }
            }
        };
        /**
         * Connects the watchables widget to the component parameters
         *
         * @private
         * @param {Property<MappCockpitComponentParameter[]>} watchableParameters
         * @param {Property<MappCockpitComponentParameter[]>} watchableStateParameters
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectWatchablesWidget = function (watchableParameters, watchableStateParameters) {
            if (this._watchablesWidget) {
                this._watchablesWidget.watchableStateParameters = watchableStateParameters;
                this._watchablesWidget.watchableParameters = watchableParameters;
            }
        };
        /**
         *
         *
         * @param {Property<MappCockpitComponentMethod[]>} componentMethodsLink
         * @param {Property<MappCockpitComponentParameter[]>} configurationParametersLink
         * @param {boolean} writeAccess
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectConfigurationManagerWidget = function (componentMethodsLink, configurationParametersLink, writeAccess) {
            if (this._configManagerWidget) {
                this._configManagerWidget.methods = componentMethodsLink;
                this._configManagerWidget.configurationParameters = configurationParametersLink;
                this._configManagerWidget.updateWriteAccess(writeAccess);
            }
        };
        /**
         * Connects the messages widget to the component parameters
         *
         * @param {Property<MappCockpitComponentParameter[]>} componentParametersLink
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectMessagesWidget = function (componentParametersLink) {
            if (this._messagesWidget) {
                this._messagesWidget.messageParameters = componentParametersLink;
            }
        };
        /**
         * Connects the methods widget to the component parameters
         *
         * @private
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {MappCockpitQuickCommandParameter[]} quickCommands
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectMethodsWidget = function (componentMethods, quickCommands, watchableParameters) {
            if (this._methodsWidget) {
                this._methodsWidget.setComponentsMethodsWidget(componentMethods, quickCommands, watchableParameters);
            }
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setMethodsWidget();
            this.setWatchablesWidget();
            this.setConfigManagerWidget();
            this.setMessagesWidget();
        };
        ComponentViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetComponentViewId);
            this.attachLayoutToView(this);
            this._layoutWidget.component.disablePersisting();
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
            //Disable persisting for inner splitters
            var innerLayoutWidget = this._layoutWidget.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetTopSplitterId);
            innerLayoutWidget.component.disablePersisting();
        };
        /**
         * Activates the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        /**
         * Deactivates the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.deactivate = function () {
            this._layoutWidget.deactivate();
        };
        /**
         * Disposes the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.dispose = function () {
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Resizes the component view
         *
         * @param number width
         * @param number height
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        ComponentViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        /**
         * set the messages widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setMessagesWidget = function () {
            this._messagesWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.ComponentViewMessagesWidgetId);
        };
        /**
         * set the watchables widget
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setWatchablesWidget = function () {
            this._watchablesWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.WatchablesWidgetId);
        };
        /**
         * set the configmanager widget
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setConfigManagerWidget = function () {
            this._configManagerWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.ConfigManagerWidgetId);
        };
        /**
         * set the commands widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setMethodsWidget = function () {
            this._methodsWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.MethodsWidgetId);
        };
        return ComponentViewWidget;
    }(viewBase_1.ViewBase));
    exports.ComponentViewWidget = ComponentViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50Vmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21wb25lbnRWaWV3V2lkZ2V0L2NvbXBvbmVudFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQWtDLHVDQUFRO1FBQTFDO1lBQUEscUVBb1BDO1lBNU9XLG1DQUE2QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7O1FBNE9oRyxDQUFDO1FBMU9HLGlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFPRCxzQkFBVyxnREFBZTtZQUwxQjs7OztlQUlHO2lCQUNILFVBQTJCLGVBQStDO2dCQUN0RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO2dCQUV4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0MsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSyw4Q0FBZ0IsR0FBeEIsVUFBeUIsZUFBK0M7WUFBeEUsaUJBSUM7WUFIRyxlQUFlLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hELEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDBDQUFZLEdBQXBCO1lBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUU7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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudFZpZXdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbXBvbmVudFZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciwgTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWaWV3QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdmlld0Jhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBJTGF5b3V0V2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2xheW91dFdpZGdldEludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgQ29tcG9uZW50Vmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIGltcGxlbWVudHMgSUNvbXBvbmVudFZpZXdXaWRnZXR7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlQ29tcG9uZW50ITogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+O1xyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlc1dpZGdldDogV2lkZ2V0cy5JV2F0Y2hhYmxlc1dpZGdldCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VzV2lkZ2V0OiBXaWRnZXRzLklNZXNzYWdlc1dpZGdldCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX21ldGhvZHNXaWRnZXQ6IFdpZGdldHMuSU1ldGhvZHNXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnTWFuYWdlcldpZGdldDogV2lkZ2V0cy5JQ29uZmlnTWFuYWdlcldpZGdldHx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgY29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBieSB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pikge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudCA9IGFjdGl2ZUNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIGFjdGl2ZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD59IGFjdGl2ZUNvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudDogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgYWN0aXZlQ29tcG9uZW50LnZhbHVlLmNvbW1hbmRDb25uZWN0Q29tcG9uZW50LmV4ZWN1dGUobnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RQYW5lcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIHBhbmVzIHRvIHRoZSBjb21wb25lbnQgbWVtYmVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RQYW5lcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLm1ldGhvZHNTb3VyY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdE1ldGhvZHNXaWRnZXQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLnVzZXJNZXRob2RzLCB0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUucXVpY2tDb21tYW5kcywgdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLndhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2UudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLnBhcmFtZXRlcnNTb3VyY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFdhdGNoYWJsZXNXaWRnZXQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLndhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2UsIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS53YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RNZXNzYWdlc1dpZGdldCh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUubWVzc2FnZVBhcmFtZXRlcnNTb3VyY2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLm1ldGhvZHNTb3VyY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RDb25maWd1cmF0aW9uTWFuYWdlcldpZGdldCh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUubWV0aG9kc1NvdXJjZSwgdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzU291cmNlLHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS53cml0ZUFjY2Vzcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgd2F0Y2hhYmxlcyB3aWRnZXQgdG8gdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0V2F0Y2hhYmxlc1dpZGdldCh3YXRjaGFibGVQYXJhbWV0ZXJzOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPiwgd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxlc1dpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl93YXRjaGFibGVzV2lkZ2V0LndhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVycztcclxuICAgICAgICAgICAgdGhpcy5fd2F0Y2hhYmxlc1dpZGdldC53YXRjaGFibGVQYXJhbWV0ZXJzID0gd2F0Y2hhYmxlUGFyYW1ldGVycztcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+fSBjb21wb25lbnRNZXRob2RzTGlua1xyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gY29uZmlndXJhdGlvblBhcmFtZXRlcnNMaW5rXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdyaXRlQWNjZXNzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3RDb25maWd1cmF0aW9uTWFuYWdlcldpZGdldChjb21wb25lbnRNZXRob2RzTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT4sIGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4sIHdyaXRlQWNjZXNzOmJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXQubWV0aG9kcyA9IGNvbXBvbmVudE1ldGhvZHNMaW5rO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0LmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnNMaW5rO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0LnVwZGF0ZVdyaXRlQWNjZXNzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgbWVzc2FnZXMgd2lkZ2V0IHRvIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59IGNvbXBvbmVudFBhcmFtZXRlcnNMaW5rXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdE1lc3NhZ2VzV2lkZ2V0KGNvbXBvbmVudFBhcmFtZXRlcnNMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPik6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21lc3NhZ2VzV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0Lm1lc3NhZ2VQYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVyc0xpbms7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIG1ldGhvZHMgd2lkZ2V0IHRvIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXX0gcXVpY2tDb21tYW5kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RNZXRob2RzV2lkZ2V0KGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10sIHF1aWNrQ29tbWFuZHM6IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyW10sIHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tZXRob2RzV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZHNXaWRnZXQuc2V0Q29tcG9uZW50c01ldGhvZHNXaWRnZXQoY29tcG9uZW50TWV0aG9kcywgcXVpY2tDb21tYW5kcywgd2F0Y2hhYmxlUGFyYW1ldGVycylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TWV0aG9kc1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuc2V0V2F0Y2hhYmxlc1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29uZmlnTWFuYWdlcldpZGdldCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldE1lc3NhZ2VzV2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdExheW91dFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU3BsaXR0ZXJXaWRnZXRDb21wb25lbnRWaWV3SWQpIGFzIElMYXlvdXRXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoPGFueT50aGlzKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIC8vIGFkZCB3aWRnZXQgdG8gdGhlIHBhcmVudCBjb250YWluZXJcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy9EaXNhYmxlIHBlcnNpc3RpbmcgZm9yIGlubmVyIHNwbGl0dGVyc1xyXG4gICAgICAgIGxldCBpbm5lckxheW91dFdpZGdldCA9IHRoaXMuX2xheW91dFdpZGdldC5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNwbGl0dGVyV2lkZ2V0VG9wU3BsaXR0ZXJJZCkgYXMgSUxheW91dFdpZGdldDtcclxuICAgICAgICBpbm5lckxheW91dFdpZGdldC5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlcyB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGVzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZGVhY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlcyB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBudW1iZXIgd2lkdGhcclxuICAgICAqIEBwYXJhbSBudW1iZXIgaGVpZ2h0XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBvbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtZXNzYWdlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE1lc3NhZ2VzV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbXBvbmVudFZpZXdNZXNzYWdlc1dpZGdldElkKSBhcyBXaWRnZXRzLklNZXNzYWdlc1dpZGdldDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0V2F0Y2hhYmxlc1dpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVzV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLldhdGNoYWJsZXNXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JV2F0Y2hhYmxlc1dpZGdldDtcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgY29uZmlnbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDb25maWdNYW5hZ2VyV2lkZ2V0KCkge1xyXG5cclxuICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbmZpZ01hbmFnZXJXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JQ29uZmlnTWFuYWdlcldpZGdldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIGNvbW1hbmRzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TWV0aG9kc1dpZGdldCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbWV0aG9kc1dpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5NZXRob2RzV2lkZ2V0SWQpIGFzIFdpZGdldHMuSU1ldGhvZHNXaWRnZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENvbXBvbmVudFZpZXdXaWRnZXQgfTsiXX0=
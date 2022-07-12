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
     * implements displaying and execution of methods
     *
     * @class MethodsWidget
     * @extends {WidgetBase}
     * @implements {IMethodsWidget}
     */
    var MethodsWidget = /** @class */ (function (_super) {
        __extends(MethodsWidget, _super);
        function MethodsWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._methods = [];
            _this._quickCommands = [];
            _this._watchableParameters = [];
            _this._layoutWidgetActivated = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._methodListSelectionChangedHandler = function (sender, args) { return _this.onMethodListSelectionChanged(sender, args); };
            return _this;
        }
        MethodsWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        MethodsWidget.prototype.setComponentsMethodsWidget = function (methods, quickCommands, watchableParameters) {
            //TODO: this.methods must be setted the last one. Change it so it doesn't matter when is set.
            this.quickCommands = quickCommands;
            this.watchableParameters = watchableParameters;
            this.methods = methods;
        };
        Object.defineProperty(MethodsWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof MethodsWidget
             */
            set: function (methods) {
                this._methods = methods;
                if (this._methodListWidget) {
                    this._methodListWidget.methods = this._methods;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodsWidget.prototype, "quickCommands", {
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
                if (this._methodListWidget) {
                    this._methodListWidget.quickCommands = this._quickCommands;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodsWidget.prototype, "watchableParameters", {
            set: function (watchableParameters) {
                this._watchableParameters = watchableParameters;
                if (this._methodListWidget) {
                    this._methodListWidget.watchableParameters = this._watchableParameters;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setHeaderContent("Commands");
            this.setMethodListWidget();
            this.setParameterListWidget();
        };
        MethodsWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetMethodsId);
            this.attachLayoutToView(this);
            //No persisting data in the common component view
            this._layoutWidget.component.disablePersisting();
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivated);
        };
        /**
         * set the method list widget
         *
         * @returns {*}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.setMethodListWidget = function () {
            this._methodListWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.MethodListWidgetId);
            this._methodListWidget.eventSelectionChanged.attach(this._methodListSelectionChangedHandler);
        };
        /**
         * set the method parameter list widget
         *
         * @returns {*}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.setParameterListWidget = function () {
            this._methodParameterListWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.MethodParameterListWidgetId);
        };
        /**
         * activates MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        /**
         * deactivates MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.deactivate = function () {
        };
        /**
         * disposes MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.dispose = function () {
            if (this._methodListWidget != undefined) {
                this._methodListWidget.eventSelectionChanged.detach(this._methodListSelectionChangedHandler);
            }
            if (this._methodParameterListWidget != undefined) {
                this._methodParameterListWidget.dispose();
            }
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivated);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * resizes the methods widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                var heightWithoutHeader = height - this._headerHeight;
                this._layoutWidget.resize(width, heightWithoutHeader);
            }
        };
        MethodsWidget.prototype.onMethodListSelectionChanged = function (sender, args) {
            this._methodParameterListWidget.updateParametersList(args);
        };
        MethodsWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return MethodsWidget;
    }(viewBase_1.ViewBase));
    exports.MethodsWidget = MethodsWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RzV2lkZ2V0L21ldGhvZHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVdBOzs7Ozs7T0FNRztJQUNIO1FBQTRCLGlDQUFRO1FBQXBDO1lBQUEscUVBMktDO1lBdEtXLGNBQVEsR0FBc0MsRUFBRSxDQUFDO1lBQ2pELG9CQUFjLEdBQTRDLEVBQUUsQ0FBQztZQUM3RCwwQkFBb0IsR0FBeUMsRUFBRSxDQUFDO1lBR2hFLDRCQUFzQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7WUFDN0Usd0NBQWtDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQzs7UUFnSy9HLENBQUM7UUE5SkcsMkNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVNLGtEQUEwQixHQUFqQyxVQUFrQyxPQUEwQyxFQUFFLGFBQXNELEVBQUUsbUJBQXlEO1lBQzNMLDZGQUE2RjtZQUM3RixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDMUIsQ0FBQztRQU9ELHNCQUFXLGtDQUFPO1lBTGxCOzs7O2VBSUc7aUJBQ0gsVUFBbUIs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ZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCB7IElNZXRob2RzV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tZXRob2RzV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJXaWRnZXQgfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJXaWRnZXRcIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuXHJcbmltcG9ydCB7IElMYXlvdXRXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvbGF5b3V0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIGRpc3BsYXlpbmcgYW5kIGV4ZWN1dGlvbiBvZiBtZXRob2RzXHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRob2RzV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SU1ldGhvZHNXaWRnZXR9XHJcbiAqL1xyXG5jbGFzcyBNZXRob2RzV2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJTWV0aG9kc1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldDogV2lkZ2V0cy5JTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9tZXRob2RMaXN0V2lkZ2V0OiBXaWRnZXRzLklNZXRob2RMaXN0V2lkZ2V0fHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9tZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4gPSBbXTtcclxuICAgIHByaXZhdGUgX3F1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2xheW91dFdpZGdldEFjdGl2YXRlZCA9IChzZW5kZXIsYXJncyk9PnRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX21ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25NZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcbiAgIFxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDb21wb25lbnRzTWV0aG9kc1dpZGdldChtZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4sIHF1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiwgd2F0Y2hhYmxlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KXtcclxuICAgICAgICAvL1RPRE86IHRoaXMubWV0aG9kcyBtdXN0IGJlIHNldHRlZCB0aGUgbGFzdCBvbmUuIENoYW5nZSBpdCBzbyBpdCBkb2Vzbid0IG1hdHRlciB3aGVuIGlzIHNldC5cclxuICAgICAgICB0aGlzLnF1aWNrQ29tbWFuZHMgPSBxdWlja0NvbW1hbmRzO1xyXG4gICAgICAgIHRoaXMud2F0Y2hhYmxlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5tZXRob2RzID0gbWV0aG9kc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWV0aG9kcyBkYXRhIGxpbmsgYXMgYSByZWZlcmVuY2UgdG8gdGhlIG1ldGhvZHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbWV0aG9kcyhtZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pIHtcclxuICAgICAgICB0aGlzLl9tZXRob2RzID0gbWV0aG9kcztcclxuICAgICAgICBpZiAodGhpcy5fbWV0aG9kTGlzdFdpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RMaXN0V2lkZ2V0Lm1ldGhvZHMgPSB0aGlzLl9tZXRob2RzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHF1aWNrQ29tbWFuZHMocXVpY2tDb21tYW5kczogQXJyYXk8TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fcXVpY2tDb21tYW5kcyA9IHF1aWNrQ29tbWFuZHM7XHJcbiAgICAgICAgaWYgKHRoaXMuX21ldGhvZExpc3RXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldC5xdWlja0NvbW1hbmRzID0gdGhpcy5fcXVpY2tDb21tYW5kcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB3YXRjaGFibGVQYXJhbWV0ZXJzKHdhdGNoYWJsZVBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMgPSB3YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIGlmICh0aGlzLl9tZXRob2RMaXN0V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZExpc3RXaWRnZXQud2F0Y2hhYmxlUGFyYW1ldGVycyA9IHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0SGVhZGVyQ29udGVudChcIkNvbW1hbmRzXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnNldE1ldGhvZExpc3RXaWRnZXQoKTtcclxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlckxpc3RXaWRnZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldE1ldGhvZHNJZCkgYXMgSUxheW91dFdpZGdldDtcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyg8YW55PnRoaXMpO1xyXG4gICAgICAgIC8vTm8gcGVyc2lzdGluZyBkYXRhIGluIHRoZSBjb21tb24gY29tcG9uZW50IHZpZXdcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmluaXRpYWxpemUoKTsgXHJcblxyXG4gICAgICAgIC8vIGFkZCB3aWRnZXQgdG8gdGhlIHBhcmVudCBjb250YWluZXJcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtZXRob2QgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldE1ldGhvZExpc3RXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5NZXRob2RMaXN0V2lkZ2V0SWQpIGFzIFdpZGdldHMuSU1ldGhvZExpc3RXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldC5ldmVudFNlbGVjdGlvbkNoYW5nZWQuYXR0YWNoKHRoaXMuX21ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIG1ldGhvZCBwYXJhbWV0ZXIgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldFBhcmFtZXRlckxpc3RXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5NZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0SWQpIGFzIFdpZGdldHMuSU1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhY3RpdmF0ZXMgTWV0aG9kV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVhY3RpdmF0ZXMgTWV0aG9kV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRpc3Bvc2VzIE1ldGhvZFdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fbWV0aG9kTGlzdFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RMaXN0V2lkZ2V0LmV2ZW50U2VsZWN0aW9uQ2hhbmdlZC5kZXRhY2godGhpcy5fbWV0aG9kTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWQpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZGlzcG9zZSgpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiByZXNpemVzIHRoZSBtZXRob2RzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGhlaWdodFdpdGhvdXRIZWFkZXIgPSBoZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQucmVzaXplKHdpZHRoLCBoZWlnaHRXaXRob3V0SGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkKHNlbmRlcixhcmdzKXtcclxuICAgICAgICB0aGlzLl9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0IS51cGRhdGVQYXJhbWV0ZXJzTGlzdChhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuXHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWV0aG9kc1dpZGdldCB9OyJdfQ==
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
define(["require", "exports", "../common/widgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/busyInformation", "../common/alertDialog", "../../common/persistence/persistDataController", "../../common/persistence/persistDataProvider", "./componentDefaultDefinition"], function (require, exports, widgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, property_1, busyInformation_1, alertDialog_1, persistDataController_1, persistDataProvider_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitWidget = /** @class */ (function (_super) {
        __extends(MappCockpitWidget, _super);
        function MappCockpitWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sideBarWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._componentOverviewOpenViewHandler = function (sender, args) { return _this.onComponentOverviewWidgetOpenView(sender, args); };
            _this._traceOverviewOpenViewHandler = function (sender, args) { return _this.onTraceOverviewWidgetOpenView(sender, args); };
            _this._toolsOverviewOpenViewHandler = function (sender, args) { return _this.onToolsOverviewWidgetOpenView(sender, args); };
            _this._mainModelConnectionChangedHandler = function (sender, connected) { return _this.connectionChanged(sender, connected); };
            /**
             * Eventhandler for persist data controller events
             *
             * @private
             * @memberof MappCockpitWidget
             */
            _this._persistDataControllerNotificationHandler = function (sender, eventArgs) { _this.persistDataControllerNotificationHandler(sender, eventArgs); };
            return _this;
        }
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            // create the start page
            this.createStartPageWidget();
            // Connects PersistDataController with the default storage 
            this.initPersistDataController();
        };
        /**
         * Connects to the main datamodel
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.connectMainDataModel = function () {
            // connect the main data model
            this.dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.MappCockpitDataModelId);
            if (this.dataModel != undefined) {
                var mainDataModel = this.dataModel;
                var mainMappCockpitModel = mainDataModel.dataSource;
                // wait for successfull connection
                mainMappCockpitModel.eventModelConnectionChanged.attach(this._mainModelConnectionChangedHandler);
                // connect the main model
                mainMappCockpitModel.connect();
            }
            else {
                console.error("mappCockpit datamodel not available!");
            }
        };
        /**
         * Initialize to the persist data controller with the default storage
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initPersistDataController = function () {
            // Create persist data controller
            this._persistDataController = new persistDataController_1.PersistDataController(persistDataProvider_1.PersistDataProvider.getInstance());
            // Handle events when connected or data loaded
            this._persistDataController.eventNotification.attach(this._persistDataControllerNotificationHandler);
            // Connect persist data controller with default storage
            this._persistDataController.connect();
        };
        /**
         * Handles the persist data controller storage connected event
         *
         * @private
         * @param {*} sender
         * @param {*} eventArgs
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.persistDataControllerNotificationHandler = function (sender, eventArgs) {
            if (eventArgs == persistDataController_1.PersistDataControllerEventNotificationType.connected) {
                // Connection done -> load data from default storage
                if (this._persistDataController != undefined) {
                    this._persistDataController.loadData();
                }
            }
            else if (eventArgs == persistDataController_1.PersistDataControllerEventNotificationType.dataLoaded) {
                // Detach _persistDataController events
                if (this._persistDataController != undefined) {
                    this._persistDataController.eventNotification.detach(this._persistDataControllerNotificationHandler);
                }
                // Data loaded from default storage -> start loading the mainDataModel(rest of the mappCockpit)
                this.connectMainDataModel();
            }
        };
        MappCockpitWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Dispose this widget
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.dispose = function () {
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.detach(this._sideBarWidgetActivatedHandler);
                this._mainNavigationWidget.dataModel.dispose();
                this._mainNavigationWidget.dispose();
            }
            if (this._traceOverviewWidget != undefined) {
                this._traceOverviewWidget.eventOpenView.detach(this._traceOverviewOpenViewHandler);
            }
            if (this._componentOverviewWidget != undefined) {
                this._componentOverviewWidget.eventOpenView.detach(this._componentOverviewOpenViewHandler);
            }
            var mainDataModel = this.dataModel;
            if (mainDataModel != undefined) {
                var mainMappCockpitModel = mainDataModel.dataSource;
                if (mainMappCockpitModel != undefined) {
                    mainMappCockpitModel.eventModelConnectionChanged.detach(this._mainModelConnectionChangedHandler);
                }
            }
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createLayout = function () {
            this._mainNavigationWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.MainNavigationWidgetId);
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.initialize();
                // add widget to the parent container
                this._mainNavigationWidget.addToParentContainer(this.mainDiv);
                this._mainNavigationWidget.dataModel = this.dataModel;
                this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.attach(this._sideBarWidgetActivatedHandler);
            }
            this.resize(window.innerWidth, window.innerHeight);
            // Init AlertBox
            new alertDialog_1.AlertDialog();
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.resize(width, height);
            }
        };
        /**
         * Load the style informations for the widget
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonStyleVariables.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/defaultScrollbarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonToolbarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/alertBoxStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/dragDropStyle.css");
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
        };
        MappCockpitWidget.prototype.connectionChanged = function (sender, connected) {
            if (connected) {
                this.onMainModelConnected(sender);
            }
            else {
                this.onMainModelDisconnected();
            }
        };
        /**
         * Called after the main model has been connected
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainMappCockpitModel
         * @returns
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onMainModelConnected = function (mainMappCockpitModel) {
            console.log("MappCockpitWidget.onMainModelConnected()");
            try {
                // force changing to anonymous to trigger the events for updating the ui state.
                this.changeUserToAnonymous();
                var loginWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.LoginWidgetId);
                if (loginWidget != undefined) {
                    loginWidget.loginInterface = { commandChangeUser: mainMappCockpitModel.commandChangeUser };
                    this._mainNavigationWidget.sideBarWidget.addWidget(loginWidget, "loginWidget", viewTypeProvider_1.ViewType.User, viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(viewTypeProvider_1.ViewType.User));
                }
                this.createContentWidgets();
            }
            catch (error) {
                console.error(error);
            }
            this._mainNavigationWidget.selectTab("StartView", "Startpage", viewTypeProvider_1.ViewType.Overview);
        };
        /**
         * Called after the main model has been disconnected
         *
         * @private
         * @returns {*}
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onMainModelDisconnected = function () {
            console.log("MappCockpitWidget.onMainModelDisconnected()");
            this.setBusyInformation(new busyInformation_1.BusyInformation("Connection to server is lost!<br/>&nbsp;Refresh page to reconnect.", busyInformation_1.ImageId.disconnectedImage));
            this.setBusy(true);
        };
        /**
         * Creates the content widgets
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createContentWidgets = function () {
            this.createComponentOverviewWidget();
            this.createTraceOverviewWidget();
            this.createToolsOverviewWidget();
            //this.createDummyWidget();
        };
        /**
         * Add the start page widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createStartPageWidget = function () {
            var startPageWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.StartPageWidgetId);
            if (startPageWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("StartView", "widgets/mappCockpitWidget/style/images/Areas/StartPageArea.svg");
                this._mainNavigationWidget.addWidget(startPageWidget, "Startpage", viewTypeProvider_1.ViewType.Overview, { parent: "StartView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                this._mainNavigationWidget.selectTab("StartView", "Startpage", viewTypeProvider_1.ViewType.Overview);
            }
        };
        MappCockpitWidget.prototype.createDummyWidget = function () {
            var dummyWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.DummyWidgetId);
            if (dummyWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("DummyView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
                this._mainNavigationWidget.addWidget(dummyWidget, "DummyWidget", viewTypeProvider_1.ViewType.Overview, { parent: "DummyView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
            }
        };
        /**
         * Add the tools overview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createToolsOverviewWidget = function () {
            var _this = this;
            var toolsOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ToolsOverviewWidgetId);
            if (toolsOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("ToolsView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
                // read the available components
                if (this.dataModel.dataSource.components != undefined &&
                    this.dataModel.dataSource.components.length > 0) {
                    if (toolsOverviewWidget != undefined) {
                        this.createToolsOverviewContent(this.dataModel.dataSource.components, toolsOverviewWidget);
                    }
                }
                else {
                    this.dataModel.dataSource.componentsSource.read(function (components) {
                        if (toolsOverviewWidget != undefined) {
                            _this.createToolsOverviewContent(components, toolsOverviewWidget);
                        }
                    });
                }
            }
        };
        /**
         * Creates the content of the tools widget
         *
         * @private
         * @param {MappCockpitComponent[]} components
         * @param {Widgets.IComponentOverviewWidget} toolsOverviewWidget
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createToolsOverviewContent = function (components, toolsOverviewWidget) {
            // create and initialize components link
            var componentsLink = property_1.Property.create([]);
            componentsLink.value = components;
            toolsOverviewWidget.components = componentsLink;
            // add overview widget
            this._mainNavigationWidget.addWidget(toolsOverviewWidget, "ToolsOverview", viewTypeProvider_1.ViewType.Overview, { parent: "ToolsView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
            toolsOverviewWidget.eventOpenView.attach(this._toolsOverviewOpenViewHandler);
        };
        /**
         * Add the component overview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createComponentOverviewWidget = function () {
            var _this = this;
            this._componentOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ComponentOverviewWidgetId);
            if (this._componentOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("ComponentsView", "widgets/mappCockpitWidget/style/images/Areas/ComponentArea.svg");
                // read the available user components
                this.dataModel.dataSource.userComponentsSource.read(function (userComponents) {
                    _this.createComponentOverviewContent(userComponents);
                });
            }
        };
        /**
         * Creates the content of the overview widget
         *
         * @private
         * @param {MappCockpitComponent[]} userComponents
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createComponentOverviewContent = function (userComponents) {
            // create and initialize components link
            var componentsLink = property_1.Property.create([]);
            componentsLink.value = userComponents;
            if (this._componentOverviewWidget != undefined) {
                this._componentOverviewWidget.components = componentsLink;
                // add overview widget
                this._mainNavigationWidget.addWidget(this._componentOverviewWidget, "ComponentOverview", viewTypeProvider_1.ViewType.Overview, { parent: "ComponentsView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                this._componentOverviewWidget.eventOpenView.attach(this._componentOverviewOpenViewHandler);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onComponentOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView("ComponentsView", args.component, args.viewType, true);
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onToolsOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView("ToolsView", args.component, args.viewType, true);
        };
        /**
         * Changes the user to anonymous
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.changeUserToAnonymous = function () {
            var mainDataModel = this.dataModel;
            var userInfo = { username: MappCockpitWidget.defaultUser.username, password: MappCockpitWidget.defaultUser.password };
            mainDataModel.dataSource.commandChangeUser.execute(userInfo, function (userRoles) {
                console.log("%o Logged in with roles: %o", MappCockpitWidget.defaultUser.username, userRoles);
            }, function (error) {
                console.error("Could not log in: %o %o", MappCockpitWidget.defaultUser.username, error);
            });
        };
        /**
         * creates the traceview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createTraceOverviewWidget = function () {
            var _this = this;
            this._traceOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.TraceOverviewWidgetId);
            if (this._traceOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("TraceView", "widgets/mappCockpitWidget/style/images/Areas/TraceArea.svg");
                // initialize the trace provider
                this.dataModel.dataSource.traceProvider.initialize().then(function () {
                    var traceComponents = _this.dataModel.dataSource.traceProvider.traceComponents;
                    var traceComponentsLink = property_1.Property.create([]);
                    traceComponentsLink.value = traceComponents;
                    if (_this._traceOverviewWidget != undefined) {
                        _this._traceOverviewWidget.components = traceComponentsLink;
                        _this._mainNavigationWidget.addWidget(_this._traceOverviewWidget, "TraceOverview", viewTypeProvider_1.ViewType.Overview, { parent: "TraceView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                        _this._traceOverviewWidget.eventOpenView.attach(_this._traceOverviewOpenViewHandler);
                    }
                });
            }
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onTraceOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView("TraceView", args.component, args.viewType, true);
        };
        // specifies the default user settings
        MappCockpitWidget.defaultUser = { username: "Anonymous", password: "" };
        return MappCockpitWidget;
    }(widgetBase_1.WidgetBase));
    exports.MappCockpitWidget = MappCockpitWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvbWFwcENvY2twaXRXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQW9CQTtRQUFnQyxxQ0FBVTtRQUExQztZQUFBLHFFQTBjQztZQXBjVyxvQ0FBOEIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBQ3JGLHVDQUFpQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXBELENBQW9ELENBQUE7WUFDMUcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQztZQUNqRyxtQ0FBNkIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFoRCxDQUFnRCxDQUFBO1lBRWxHLHdDQUFrQyxHQUFHLFVBQUMsTUFBTSxFQUFDLFNBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQXpDLENBQXlDLENBQUM7WUFlN0c7Ozs7O2VBS0c7WUFDSywrQ0FBeUMsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLHdDQUF3QyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7UUEwYXBKLENBQUM7UUF4YUc7Ozs7V0FJRztR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QXFCLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsMkJBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSw0Q0FBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUMzSyxLQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztxQkFDdEY7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0sseURBQTZCLEdBQXJDLFVBQXNDLE1BQU0sRUFBRSxJQUF1QjtZQUNqRSxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDeEYsQ0FBQztRQTNiRCxzQ0FBc0M7UUFDZCw2QkFBVyxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7UUEyYmxGLHdCQUFDO0tBQUEsQUExY0QsQ0FBZ0MsdUJBQVUsR0EwY3pDO0lBRVEsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5cclxuaW1wb3J0ICogYXMgRGF0YU1vZGVscyBmcm9tICcuLi8uLi9tb2RlbHMvZGF0YU1vZGVscyc7XHJcbmltcG9ydCB7IElNYXBwQ29ja3BpdFdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWFwcENvY2twaXRXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0L2ludGVyZmFjZXMvdGFiV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV2ZW50T3BlblZpZXdBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudE9wZW5WaWV3QXJnc1wiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSwgVmlld1R5cGVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9tYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvY29tcG9uZW50c0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBCdXN5SW5mb3JtYXRpb24sIEltYWdlSWQgfSBmcm9tIFwiLi4vY29tbW9uL2J1c3lJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBBbGVydERpYWxvZyB9IGZyb20gXCIuLi9jb21tb24vYWxlcnREaWFsb2dcIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFDb250cm9sbGVyLCBQZXJzaXN0RGF0YUNvbnRyb2xsZXJFdmVudE5vdGlmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElMb2dpbldpZGdldCwgSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LCBJTWFpbk5hdmlnYXRpb25XaWRnZXQsIElUcmFjZU92ZXJ2aWV3V2lkZ2V0LCBJVG9vbHNPdmVydmlld1dpZGdldCB9IGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0V2lkZ2V0IGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElNYXBwQ29ja3BpdFdpZGdldHtcclxuXHJcbiAgICBwcml2YXRlIF9tYWluTmF2aWdhdGlvbldpZGdldCEgOiBJTWFpbk5hdmlnYXRpb25XaWRnZXQ7XHJcbiAgICBwcml2YXRlIF90cmFjZU92ZXJ2aWV3V2lkZ2V0OiBJVHJhY2VPdmVydmlld1dpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRPdmVydmlld1dpZGdldDogSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0fHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Db21wb25lbnRPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJncylcclxuICAgIHByaXZhdGUgX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHRoaXMub25UcmFjZU92ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHNPdmVydmlld09wZW5WaWV3SGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Ub29sc092ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLCBhcmdzKVxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9tYWluTW9kZWxDb25uZWN0aW9uQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGNvbm5lY3RlZCkgPT4gdGhpcy5jb25uZWN0aW9uQ2hhbmdlZChzZW5kZXIsIGNvbm5lY3RlZCk7XHJcblxyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgZGVmYXVsdCB1c2VyIHNldHRpbmdzXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBkZWZhdWx0VXNlciA9IHsgdXNlcm5hbWU6IFwiQW5vbnltb3VzXCIsIHBhc3N3b3JkOiBcIlwiIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgcGVyc2lzdCBkYXRhIGNvbnRyb2xsZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhQZXJzaXN0RGF0YUNvbnRyb2xsZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wZXJzaXN0RGF0YUNvbnRyb2xsZXI6IFBlcnNpc3REYXRhQ29udHJvbGxlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudGhhbmRsZXIgZm9yIHBlcnNpc3QgZGF0YSBjb250cm9sbGVyIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcGVyc2lzdERhdGFDb250cm9sbGVyTm90aWZpY2F0aW9uSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLnBlcnNpc3REYXRhQ29udHJvbGxlck5vdGlmaWNhdGlvbkhhbmRsZXIoc2VuZGVyLCBldmVudEFyZ3MpIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzdGFydCBwYWdlXHJcbiAgICAgICAgdGhpcy5jcmVhdGVTdGFydFBhZ2VXaWRnZXQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDb25uZWN0cyBQZXJzaXN0RGF0YUNvbnRyb2xsZXIgd2l0aCB0aGUgZGVmYXVsdCBzdG9yYWdlIFxyXG4gICAgICAgIHRoaXMuaW5pdFBlcnNpc3REYXRhQ29udHJvbGxlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdG8gdGhlIG1haW4gZGF0YW1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RNYWluRGF0YU1vZGVsKCl7XHJcbiAgICAgICAgLy8gY29ubmVjdCB0aGUgbWFpbiBkYXRhIG1vZGVsXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWFwcENvY2twaXREYXRhTW9kZWxJZCkgYXMgRGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG1haW5EYXRhTW9kZWwgPSB0aGlzLmRhdGFNb2RlbDtcclxuICAgICAgICAgICAgbGV0IG1haW5NYXBwQ29ja3BpdE1vZGVsID0gbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlO1xyXG5cclxuICAgICAgICAgICAgLy8gd2FpdCBmb3Igc3VjY2Vzc2Z1bGwgY29ubmVjdGlvblxyXG4gICAgICAgICAgICBtYWluTWFwcENvY2twaXRNb2RlbC5ldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQuYXR0YWNoKHRoaXMuX21haW5Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkSGFuZGxlcilcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbm5lY3QgdGhlIG1haW4gbW9kZWxcclxuICAgICAgICAgICAgbWFpbk1hcHBDb2NrcGl0TW9kZWwuY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibWFwcENvY2twaXQgZGF0YW1vZGVsIG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdG8gdGhlIHBlcnNpc3QgZGF0YSBjb250cm9sbGVyIHdpdGggdGhlIGRlZmF1bHQgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0UGVyc2lzdERhdGFDb250cm9sbGVyKCl7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHBlcnNpc3QgZGF0YSBjb250cm9sbGVyXHJcbiAgICAgICAgdGhpcy5fcGVyc2lzdERhdGFDb250cm9sbGVyID0gbmV3IFBlcnNpc3REYXRhQ29udHJvbGxlcihQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEhhbmRsZSBldmVudHMgd2hlbiBjb25uZWN0ZWQgb3IgZGF0YSBsb2FkZWRcclxuICAgICAgICB0aGlzLl9wZXJzaXN0RGF0YUNvbnRyb2xsZXIuZXZlbnROb3RpZmljYXRpb24uYXR0YWNoKHRoaXMuX3BlcnNpc3REYXRhQ29udHJvbGxlck5vdGlmaWNhdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENvbm5lY3QgcGVyc2lzdCBkYXRhIGNvbnRyb2xsZXIgd2l0aCBkZWZhdWx0IHN0b3JhZ2VcclxuICAgICAgICB0aGlzLl9wZXJzaXN0RGF0YUNvbnRyb2xsZXIuY29ubmVjdCgpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIHBlcnNpc3QgZGF0YSBjb250cm9sbGVyIHN0b3JhZ2UgY29ubmVjdGVkIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGV2ZW50QXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGVyc2lzdERhdGFDb250cm9sbGVyTm90aWZpY2F0aW9uSGFuZGxlcihzZW5kZXIsIGV2ZW50QXJnczogUGVyc2lzdERhdGFDb250cm9sbGVyRXZlbnROb3RpZmljYXRpb25UeXBlKXtcclxuICAgICAgICBpZihldmVudEFyZ3MgPT0gUGVyc2lzdERhdGFDb250cm9sbGVyRXZlbnROb3RpZmljYXRpb25UeXBlLmNvbm5lY3RlZCl7XHJcbiAgICAgICAgICAgIC8vIENvbm5lY3Rpb24gZG9uZSAtPiBsb2FkIGRhdGEgZnJvbSBkZWZhdWx0IHN0b3JhZ2VcclxuICAgICAgICAgICAgaWYodGhpcy5fcGVyc2lzdERhdGFDb250cm9sbGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZXJzaXN0RGF0YUNvbnRyb2xsZXIubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGV2ZW50QXJncyA9PSBQZXJzaXN0RGF0YUNvbnRyb2xsZXJFdmVudE5vdGlmaWNhdGlvblR5cGUuZGF0YUxvYWRlZCl7XHJcbiAgICAgICAgICAgIC8vIERldGFjaCBfcGVyc2lzdERhdGFDb250cm9sbGVyIGV2ZW50c1xyXG4gICAgICAgICAgICBpZih0aGlzLl9wZXJzaXN0RGF0YUNvbnRyb2xsZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlcnNpc3REYXRhQ29udHJvbGxlci5ldmVudE5vdGlmaWNhdGlvbi5kZXRhY2godGhpcy5fcGVyc2lzdERhdGFDb250cm9sbGVyTm90aWZpY2F0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERhdGEgbG9hZGVkIGZyb20gZGVmYXVsdCBzdG9yYWdlIC0+IHN0YXJ0IGxvYWRpbmcgdGhlIG1haW5EYXRhTW9kZWwocmVzdCBvZiB0aGUgbWFwcENvY2twaXQpXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdE1haW5EYXRhTW9kZWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCkgeyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuc2lkZUJhcldpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmRldGFjaCh0aGlzLl90cmFjZU92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuZXZlbnRPcGVuVmlldy5kZXRhY2godGhpcy5fY29tcG9uZW50T3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1haW5EYXRhTW9kZWwgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKTtcclxuICAgICAgICBpZihtYWluRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBtYWluTWFwcENvY2twaXRNb2RlbCA9IG1haW5EYXRhTW9kZWwuZGF0YVNvdXJjZTtcclxuICAgICAgICAgICAgaWYobWFpbk1hcHBDb2NrcGl0TW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIG1haW5NYXBwQ29ja3BpdE1vZGVsLmV2ZW50TW9kZWxDb25uZWN0aW9uQ2hhbmdlZC5kZXRhY2godGhpcy5fbWFpbk1vZGVsQ29ubmVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWFpbk5hdmlnYXRpb25XaWRnZXRJZCkgYXMgSU1haW5OYXZpZ2F0aW9uV2lkZ2V0O1xyXG4gICAgICAgIGlmKHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kYXRhTW9kZWwgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuc2lkZUJhcldpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gSW5pdCBBbGVydEJveFxyXG4gICAgICAgIG5ldyBBbGVydERpYWxvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGlmKHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCB0aGUgc3R5bGUgaW5mb3JtYXRpb25zIGZvciB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblN0eWxlVmFyaWFibGVzLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2RlZmF1bHRTY3JvbGxiYXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9jb21tb25Ub29sYmFyU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvYWxlcnRCb3hTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9kcmFnRHJvcFN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdGlvbkNoYW5nZWQoc2VuZGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgY29ubmVjdGVkOiBib29sZWFuKXtcclxuICAgICAgICBpZiAoY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25NYWluTW9kZWxDb25uZWN0ZWQoc2VuZGVyKTsgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm9uTWFpbk1vZGVsRGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBtYWluIG1vZGVsIGhhcyBiZWVuIGNvbm5lY3RlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBtYWluTWFwcENvY2twaXRNb2RlbFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTWFpbk1vZGVsQ29ubmVjdGVkKG1haW5NYXBwQ29ja3BpdE1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRXaWRnZXQub25NYWluTW9kZWxDb25uZWN0ZWQoKVwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBmb3JjZSBjaGFuZ2luZyB0byBhbm9ueW1vdXMgdG8gdHJpZ2dlciB0aGUgZXZlbnRzIGZvciB1cGRhdGluZyB0aGUgdWkgc3RhdGUuXHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXNlclRvQW5vbnltb3VzKCk7XHJcbiAgICAgICAgICAgIGxldCBsb2dpbldpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5Mb2dpbldpZGdldElkKSBhcyBJTG9naW5XaWRnZXQ7XHJcbiAgICAgICAgICAgIGlmKGxvZ2luV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsb2dpbldpZGdldC5sb2dpbkludGVyZmFjZSA9IHsgY29tbWFuZENoYW5nZVVzZXI6IG1haW5NYXBwQ29ja3BpdE1vZGVsLmNvbW1hbmRDaGFuZ2VVc2VyIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmFkZFdpZGdldChsb2dpbldpZGdldCwgXCJsb2dpbldpZGdldFwiLCBWaWV3VHlwZS5Vc2VyLCBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbkJ5Vmlld1R5cGUoVmlld1R5cGUuVXNlcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29udGVudFdpZGdldHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zZWxlY3RUYWIoXCJTdGFydFZpZXdcIiwgXCJTdGFydHBhZ2VcIiwgVmlld1R5cGUuT3ZlcnZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBtYWluIG1vZGVsIGhhcyBiZWVuIGRpc2Nvbm5lY3RlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTWFpbk1vZGVsRGlzY29ubmVjdGVkKCk6IGFueSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdFdpZGdldC5vbk1haW5Nb2RlbERpc2Nvbm5lY3RlZCgpXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJDb25uZWN0aW9uIHRvIHNlcnZlciBpcyBsb3N0ITxici8+Jm5ic3A7UmVmcmVzaCBwYWdlIHRvIHJlY29ubmVjdC5cIiwgSW1hZ2VJZC5kaXNjb25uZWN0ZWRJbWFnZSkpO1xyXG4gICAgICAgIHRoaXMuc2V0QnVzeSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbnRlbnQgd2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb250ZW50V2lkZ2V0cygpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUcmFjZU92ZXJ2aWV3V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sc092ZXJ2aWV3V2lkZ2V0KCk7XHJcbiAgICAgICAgLy90aGlzLmNyZWF0ZUR1bW15V2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIHN0YXJ0IHBhZ2Ugd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVN0YXJ0UGFnZVdpZGdldCgpe1xyXG4gICAgICAgIGxldCBzdGFydFBhZ2VXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU3RhcnRQYWdlV2lkZ2V0SWQpIGFzIElXaWRnZXQ7XHJcbiAgICAgICAgaWYoc3RhcnRQYWdlV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJTdGFydFZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9TdGFydFBhZ2VBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHN0YXJ0UGFnZVdpZGdldCwgXCJTdGFydHBhZ2VcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IFwiU3RhcnRWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0fSk7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LnNlbGVjdFRhYihcIlN0YXJ0Vmlld1wiLFwiU3RhcnRwYWdlXCIsIFZpZXdUeXBlLk92ZXJ2aWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVEdW1teVdpZGdldCgpe1xyXG4gICAgICAgIGxldCBkdW1teVdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5EdW1teVdpZGdldElkKSBhcyBJV2lkZ2V0O1xyXG4gICAgICAgIGlmKGR1bW15V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJEdW1teVZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Ub29sc0FyZWEuc3ZnXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRXaWRnZXQoZHVtbXlXaWRnZXQsIFwiRHVtbXlXaWRnZXRcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IFwiRHVtbXlWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSB0b29scyBvdmVydmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVG9vbHNPdmVydmlld1dpZGdldCgpe1xyXG4gICAgICAgIGxldCB0b29sc092ZXJ2aWV3V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlRvb2xzT3ZlcnZpZXdXaWRnZXRJZCkgYXMgSVRvb2xzT3ZlcnZpZXdXaWRnZXQ7XHJcbiAgICAgICAgaWYodG9vbHNPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiVG9vbHNWaWV3XCIsIFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9pbWFnZXMvQXJlYXMvVG9vbHNBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgYXZhaWxhYmxlIGNvbXBvbmVudHNcclxuICAgICAgICAgICAgaWYoKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS5jb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS5jb21wb25lbnRzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRvb2xzT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUb29sc092ZXJ2aWV3Q29udGVudCgoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLmNvbXBvbmVudHMsIHRvb2xzT3ZlcnZpZXdXaWRnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS5jb21wb25lbnRzU291cmNlLnJlYWQoKGNvbXBvbmVudHMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodG9vbHNPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRvb2xzT3ZlcnZpZXdDb250ZW50KGNvbXBvbmVudHMsIHRvb2xzT3ZlcnZpZXdXaWRnZXQpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb250ZW50IG9mIHRoZSB0b29scyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFtdfSBjb21wb25lbnRzXHJcbiAgICAgKiBAcGFyYW0ge1dpZGdldHMuSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0fSB0b29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUb29sc092ZXJ2aWV3Q29udGVudChjb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdLCB0b29sc092ZXJ2aWV3V2lkZ2V0OiBJVG9vbHNPdmVydmlld1dpZGdldCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgaW5pdGlhbGl6ZSBjb21wb25lbnRzIGxpbmtcclxuICAgICAgICBsZXQgY29tcG9uZW50c0xpbms6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSk7XHJcbiAgICAgICAgY29tcG9uZW50c0xpbmsudmFsdWUgPSBjb21wb25lbnRzO1xyXG4gICAgICAgIHRvb2xzT3ZlcnZpZXdXaWRnZXQuY29tcG9uZW50cyA9IGNvbXBvbmVudHNMaW5rO1xyXG5cclxuICAgICAgICAvLyBhZGQgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHRvb2xzT3ZlcnZpZXdXaWRnZXQsIFwiVG9vbHNPdmVydmlld1wiLCBWaWV3VHlwZS5PdmVydmlldywge3BhcmVudDogXCJUb29sc1ZpZXdcIiwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnR9KTtcclxuICAgICAgICB0b29sc092ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuYXR0YWNoKHRoaXMuX3Rvb2xzT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSBjb21wb25lbnQgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0SWQpIGFzIElDb21wb25lbnRPdmVydmlld1dpZGdldDtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiQ29tcG9uZW50c1ZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Db21wb25lbnRBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgYXZhaWxhYmxlIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICAgICAgICAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLnVzZXJDb21wb25lbnRzU291cmNlLnJlYWQoKHVzZXJDb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRPdmVydmlld0NvbnRlbnQodXNlckNvbXBvbmVudHMpOyAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb250ZW50IG9mIHRoZSBvdmVydmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFtdfSB1c2VyQ29tcG9uZW50c1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50T3ZlcnZpZXdDb250ZW50KHVzZXJDb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBpbml0aWFsaXplIGNvbXBvbmVudHMgbGlua1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdKTtcclxuICAgICAgICBjb21wb25lbnRzTGluay52YWx1ZSA9IHVzZXJDb21wb25lbnRzO1xyXG4gICAgICAgIGlmKCB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5jb21wb25lbnRzID0gY29tcG9uZW50c0xpbms7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldCh0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCwgXCJDb21wb25lbnRPdmVydmlld1wiLCBWaWV3VHlwZS5PdmVydmlldywgeyBwYXJlbnQ6IFwiQ29tcG9uZW50c1ZpZXdcIiwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnQgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuYXR0YWNoKHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE9wZW5WaWV3QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJnczogRXZlbnRPcGVuVmlld0FyZ3Mpe1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFZpZXcoXCJDb21wb25lbnRzVmlld1wiICwgYXJncy5jb21wb25lbnQsIGFyZ3Mudmlld1R5cGUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRPcGVuVmlld0FyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG9vbHNPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJnczogRXZlbnRPcGVuVmlld0FyZ3Mpe1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFZpZXcoXCJUb29sc1ZpZXdcIiAsIGFyZ3MuY29tcG9uZW50LCBhcmdzLnZpZXdUeXBlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZXMgdGhlIHVzZXIgdG8gYW5vbnltb3VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoYW5nZVVzZXJUb0Fub255bW91cygpIHtcclxuICAgICAgICBsZXQgbWFpbkRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgIGxldCB1c2VySW5mbyA9IHsgdXNlcm5hbWU6ICBNYXBwQ29ja3BpdFdpZGdldC5kZWZhdWx0VXNlci51c2VybmFtZSwgcGFzc3dvcmQ6ICBNYXBwQ29ja3BpdFdpZGdldC5kZWZhdWx0VXNlci5wYXNzd29yZCB9O1xyXG4gICAgICAgIG1haW5EYXRhTW9kZWwuZGF0YVNvdXJjZS5jb21tYW5kQ2hhbmdlVXNlci5leGVjdXRlKHVzZXJJbmZvLCAodXNlclJvbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJW8gTG9nZ2VkIGluIHdpdGggcm9sZXM6ICVvXCIsIE1hcHBDb2NrcGl0V2lkZ2V0LmRlZmF1bHRVc2VyLnVzZXJuYW1lLCB1c2VyUm9sZXMpO1xyXG4gICAgICAgIH0sKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ291bGQgbm90IGxvZyBpbjogJW8gJW9cIiwgTWFwcENvY2twaXRXaWRnZXQuZGVmYXVsdFVzZXIudXNlcm5hbWUsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIHRyYWNldmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVHJhY2VPdmVydmlld1dpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlRyYWNlT3ZlcnZpZXdXaWRnZXRJZCkgYXMgSVRyYWNlT3ZlcnZpZXdXaWRnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiVHJhY2VWaWV3XCIsIFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9pbWFnZXMvQXJlYXMvVHJhY2VBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgdHJhY2UgcHJvdmlkZXJcclxuICAgICAgICAgICAgKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS50cmFjZVByb3ZpZGVyLmluaXRpYWxpemUoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2VDb21wb25lbnRzID0gKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS50cmFjZVByb3ZpZGVyLnRyYWNlQ29tcG9uZW50cztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNlQ29tcG9uZW50c0xpbms6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50Pj4oW10pO1xyXG4gICAgICAgICAgICAgICAgdHJhY2VDb21wb25lbnRzTGluay52YWx1ZSA9IHRyYWNlQ29tcG9uZW50cztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0LmNvbXBvbmVudHMgPSB0cmFjZUNvbXBvbmVudHNMaW5rO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldCh0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0LCBcIlRyYWNlT3ZlcnZpZXdcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHsgcGFyZW50OiBcIlRyYWNlVmlld1wiLCB3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuYXR0YWNoKHRoaXMuX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE9wZW5WaWV3QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UcmFjZU92ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLCBhcmdzOiBFdmVudE9wZW5WaWV3QXJncyl7XHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkVmlldyhcIlRyYWNlVmlld1wiLCBhcmdzLmNvbXBvbmVudCwgYXJncy52aWV3VHlwZSwgdHJ1ZSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXRXaWRnZXQgfTsiXX0=
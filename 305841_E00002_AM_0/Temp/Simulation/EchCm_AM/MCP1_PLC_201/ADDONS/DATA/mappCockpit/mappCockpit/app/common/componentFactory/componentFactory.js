define(["require", "exports", "../../widgets/cursorInfoWidget/model/cursorSignalsDataModel", "../../models/common/seriesProvider/seriesProvider", "../../widgets/widgets", "../../models/dataModels", "../componentBase/componentBase", "../../widgets/common/imageProvider", "../../widgets/common/commonLayoutProvider", "../../widgets/common/seriesIconProvider", "../textProvider/textProvider"], function (require, exports, cursorSignalsDataModel_1, seriesProvider_1, Widgets, DataModels, componentBase_1, imageProvider_1, commonLayoutProvider_1, seriesIconProvider_1, textProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentFactory = /** @class */ (function () {
        function ComponentFactory() {
            this._componentInstances = new Map();
        }
        ComponentFactory.getInstance = function () {
            if (this._instance == undefined) {
                this._instance = new ComponentFactory();
            }
            return this._instance;
        };
        ComponentFactory.prototype.create = function (componentDefinition, context) {
            if (context === void 0) { context = undefined; }
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var instance = undefined;
            var doInitialization = false;
            switch (componentDefinition.type) {
                case "e":
                    console.error(componentDefinition);
                    break;
                /////////////////
                // Create widgets
                case "MappCockpitWidget":
                    instance = Widgets.MappCockpitWidget.create();
                    break;
                case "WatchablesWidget":
                    instance = Widgets.WatchablesWidget.create();
                    break;
                case "MethodsWidget":
                    instance = Widgets.MethodsWidget.create();
                    break;
                case "ConfigManagerWidget":
                    instance = Widgets.ConfigManagerWidget.create();
                    break;
                case "SignalManagerWidget":
                    instance = Widgets.SignalManagerWidget.create();
                    break;
                case "ChartManagerWidget":
                    instance = Widgets.ChartManagerWidget.create();
                    break;
                case "TraceViewWidget":
                    instance = Widgets.TraceViewWidget.create();
                    break;
                case "ChartViewWidget":
                    instance = Widgets.ChartViewWidget.create();
                    break;
                case "MessagesWidget":
                    instance = Widgets.MessagesWidget.create();
                    break;
                case "SplitterWidget":
                    instance = Widgets.SplitterWidget.create();
                    break;
                case "ComponentViewWidget":
                    instance = Widgets.ComponentViewWidget.create();
                    break;
                case "MethodListWidget":
                    instance = Widgets.MethodListWidget.create();
                    break;
                case "MethodParameterListWidget":
                    instance = Widgets.MethodParameterListWidget.create();
                    break;
                case "SideBarWidget":
                    instance = Widgets.SideBarWidget.create();
                    break;
                case "TabWidget":
                    instance = Widgets.TabWidget.create();
                    break;
                case "StartPageWidget":
                    instance = Widgets.StartPageWidget.create();
                    break;
                case "ComponentOverviewWidget":
                    instance = Widgets.ComponentOverviewWidget.create();
                    break;
                case "TraceOverviewWidget":
                    instance = Widgets.TraceOverviewWidget.create();
                    break;
                case "TraceConfigurationViewWidget":
                    instance = Widgets.TraceConfigurationViewWidget.create();
                    break;
                case "TraceControlWidget":
                    instance = Widgets.TraceControlWidget.create();
                    break;
                case "TraceConfigurationWidget":
                    instance = Widgets.TraceConfigurationWidget.create();
                    break;
                case "TraceConfigTimingWidget":
                    instance = Widgets.TraceConfigTimingWidget.create();
                    break;
                case "TraceConfigTriggerWidget":
                    instance = Widgets.TraceConfigTriggerWidget.create();
                    break;
                case "TraceConfigDatapointsWidget":
                    instance = Widgets.TraceConfigDatapointsWidget.create();
                    break;
                case "MainNavigationWidget":
                    instance = Widgets.MainNavigationWidget.create();
                    break;
                case "LoginWidget":
                    instance = Widgets.LoginWidget.create();
                    break;
                case "CursorInfoWidget":
                    instance = Widgets.CursorInfoWidget.create();
                    break;
                case "ToolsOverviewWidget":
                    instance = Widgets.ToolsOverviewWidget.create();
                    break;
                case "ChartViewToolbar":
                    instance = Widgets.ChartViewToolbar.create();
                    break;
                case "ChartBase":
                    // Implement creation of chartBase(widget) in the component factory(type must be set by defaultSettingsId => fft, xy, yt, ...)
                    //instance = Widgets.ChartBaseWidget.create();
                    break;
                case "DummyWidget":
                    instance = Widgets.DummyWidget.create();
                    break;
                case "LoggerWidget":
                    instance = Widgets.LoggerWidget.create();
                    break;
                ////////////////////
                // Create datamodels
                case "MappCockpitDataModel":
                    instance = DataModels.MappCockpitDataModel.create();
                    doInitialization = true;
                    break;
                case "TabWidgetDataModel":
                    instance = DataModels.TabWidgetDataModel.create();
                    doInitialization = true;
                    break;
                case "ConfigManagerDataModel":
                    instance = DataModels.ConfigManagerDataModel.create();
                    doInitialization = true;
                    break;
                case "SignalManagerDataModel":
                    instance = DataModels.SignalManagerDataModel.create();
                    doInitialization = true;
                    break;
                case "CursorSignalsDataModel":
                    instance = new cursorSignalsDataModel_1.CursorSignalsDataModel();
                    doInitialization = true;
                    break;
                ////////////////////
                // Create providers
                case "SeriesProvider":
                case "TextProvider":
                case "ChartManagerDataModel":
                    if (this._componentInstances.has(componentDefinition.id)) {
                        instance = this._componentInstances.get(componentDefinition.id);
                    }
                    else {
                        if (componentDefinition.type == "SeriesProvider") {
                            instance = seriesProvider_1.SeriesProvider.getInstance();
                        }
                        else if (componentDefinition.type == "TextProvider") {
                            instance = new textProvider_1.TextProvider();
                        }
                        else if (componentDefinition.type == "ChartManagerDataModel") {
                            instance = DataModels.ChartManagerDataModel.create();
                        }
                        else {
                            console.error("Type not defined!");
                            return undefined;
                        }
                        this.createComponentAndInitializeInstance(componentDefinition, context, instance);
                    }
                    return instance;
                    break;
                case "SeriesIconProvider":
                    instance = seriesIconProvider_1.SeriesIconProvider.getInstance();
                    doInitialization = true;
                    break;
                case "ImageProvider":
                    instance = imageProvider_1.ImageProvider.getInstance();
                    break;
                case "CommonLayoutProvider":
                    instance = commonLayoutProvider_1.CommonLayoutProvider.getInstance();
                    doInitialization = true;
                    break;
                default:
                    console.error("Unkown type used for instance factory: " + componentDefinition.type);
                    break;
            }
            if (instance != undefined) {
                this.createComponent(instance, componentDefinition, context);
                if (doInitialization == true) {
                    // Does the initialization of the instance(datamodel,...) => widgets will be initialized later at the add of a widget to a splitter widget
                    instance.initialize();
                }
            }
            return instance;
            /* tslint:enable:max-func-body-length */
        };
        /**
         * Create component and initialize instance
         *
         * @private
         * @param {ComponentDefinition} componentDefinition
         * @param {(ComponentContext|undefined)} [context=undefined]
         * @param {IComponent} instance
         * @memberof ComponentFactory
         */
        ComponentFactory.prototype.createComponentAndInitializeInstance = function (componentDefinition, context, instance) {
            if (context === void 0) { context = undefined; }
            this._componentInstances.set(componentDefinition.id, instance);
            this.createComponent(instance, componentDefinition, context);
            instance.initialize();
        };
        /**
         * Dispose component
         *
         * @param {string} id
         * @memberof ComponentFactory
         */
        ComponentFactory.prototype.disposeComponent = function (id) {
            if (this._componentInstances.has(id)) {
                var instance = this._componentInstances.get(id);
                if (instance != undefined) {
                    instance.dispose();
                    this._componentInstances.delete(id);
                }
            }
        };
        /**
         * Creates an initializes the component object for the given instance(widget, datamodel, provider, ...)
         *
         * @private
         * @param {IComponent} instance
         * @param {ComponentDefinition} componentDefinition
         * @param {ComponentContext|undefined} context
         * @memberof ComponentFactory
         */
        ComponentFactory.prototype.createComponent = function (instance, componentDefinition, context) {
            instance.component = new componentBase_1.ComponentBase(this, instance);
            instance.component.initialize();
            if (context != undefined) {
                instance.component.context = context;
            }
            instance.component.setDefinition(componentDefinition);
        };
        return ComponentFactory;
    }());
    exports.ComponentFactory = ComponentFactory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFlQTtRQUFBO1lBRVksd0JBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUF1UGhFLENBQUM7UUFuUGlCLDRCQUFXLEdBQXpCO1lBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBQztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7YUFDM0M7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVNLGlDQUFNLEdBQWIsVUFBYyxtQkFBd0MsRUFBRSxPQUErQztZQUEvQyx3QkFBQSxFQUFBLG1CQUErQztZQUNuRyx5Q0FBeUMsQ0FBQyw4QkFBOEI7WUFDeEUsSUFBSSxRQUFRLEdBQXlCLFNBQVMsQ0FBQztZQUMvQyxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM3QixRQUFPLG1CQUFtQixDQUFDLElBQUksRUFBQztnQkFDNUIsS0FBSyxHQUFHO29CQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDbkMsTUFBTTtnQkFDVixpQkFBaUI7Z0JBQ2pCLGlCQUFpQjtnQkFDakIsS0FBSyxtQkFBbUI7b0JBQ3BCLFFBQVEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzlDLE1BQU07Z0JBQ1YsS0FBSyxrQkFBa0I7b0JBQ25CLFFBQVEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1YsS0FBSyxlQUFlO29CQUNoQixRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDMUMsTUFBTTtnQkFDVixLQUFLLHFCQUFxQjtvQkFDdEIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDaEQsTUFBTTtnQkFDVixLQUFLLHFCQUFxQjtvQkFDdEIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDaEQsTUFBTTtnQkFDVixLQUFLLG9CQUFvQjtvQkFDckIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDL0MsTUFBTTtnQkFDVixLQUFLLGlCQUFpQjtvQkFDbEIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxpQkFBaUI7b0JBQ2xCLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM1QyxNQUFNO2dCQUNWLEtBQUssZ0JBQWdCO29CQUNqQixRQUFRLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDM0MsTUFBTTtnQkFDVixLQUFLLGdCQUFnQjtvQkFDakIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzNDLE1BQU07Z0JBQ1YsS0FBSyxxQkFBcUI7b0JBQ3RCLFFBQVEsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2hELE1BQU07Z0JBQ1YsS0FBSyxrQkFBa0I7b0JBQ25CLFFBQVEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1YsS0FBSywyQkFBMkI7b0JBQzVCLFFBQVEsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3RELE1BQU07Z0JBQ1YsS0FBSyxlQUFlO29CQUNoQixRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDMUMsTUFBTTtnQkFDVixLQUFLLFdBQVc7b0JBQ1osUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3RDLE1BQU07Z0JBQ1YsS0FBSyxpQkFBaUI7b0JBQ2xCLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM1QyxNQUFNO2dCQUNWLEtBQUsseUJBQXlCO29CQUMxQixRQUFRLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNwRCxNQUFNO2dCQUNWLEtBQUsscUJBQXFCO29CQUN0QixRQUFRLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNoRCxNQUFNO2dCQUNWLEtBQUssOEJBQThCO29CQUMvQixRQUFRLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN6RCxNQUFNO2dCQUNWLEtBQUssb0JBQW9CO29CQUNyQixRQUFRLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUMvQyxNQUFNO2dCQUNWLEtBQUssMEJBQTBCO29CQUMzQixRQUFRLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNyRCxNQUFNO2dCQUNWLEtBQUsseUJBQXlCO29CQUMxQixRQUFRLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNwRCxNQUFNO2dCQUNWLEtBQUssMEJBQTBCO29CQUMzQixRQUFRLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNyRCxNQUFNO2dCQUNWLEtBQUssNkJBQTZCO29CQUM5QixRQUFRLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN4RCxNQUFNO2dCQUNWLEtBQUssc0JBQXNCO29CQUN2QixRQUFRLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNqRCxNQUFNO2dCQUNWLEtBQUssYUFBYTtvQkFDZCxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDeEMsTUFBTTtnQkFDVixLQUFLLGtCQUFrQjtvQkFDbkIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDN0MsTUFBTTtnQkFDVixLQUFLLHFCQUFxQjtvQkFDdEIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDaEQsTUFBTTtnQkFDVixLQUFLLGtCQUFrQjtvQkFDbkIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDN0MsTUFBTTtnQkFDVixLQUFLLFdBQVc7b0JBQ1osOEhBQThIO29CQUM5SCw4Q0FBOEM7b0JBQzlDLE1BQU07Z0JBQ1YsS0FBSyxhQUFhO29CQUNkLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN4QyxNQUFNO2dCQUNWLEtBQUssY0FBYztvQkFDZixRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDekMsTUFBTTtnQkFJVixvQkFBb0I7Z0JBQ3BCLG9CQUFvQjtnQkFDcEIsS0FBSyxzQkFBc0I7b0JBQ3ZCLFFBQVEsR0FBRyxVQUFVLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3BELGdCQUFnQixHQUFHLElBQUksQ0FBQztvQkFDeEIsTUFBTTtnQkFDVixLQUFLLG9CQUFvQjtvQkFDckIsUUFBUSxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO29CQUN4QixNQUFNO2dCQUNWLEtBQUssd0JBQXdCO29CQUN6QixRQUFRLEdBQUcsVUFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN0RCxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1YsS0FBSyx3QkFBd0I7b0JBQ3pCLFFBQVEsR0FBRyxVQUFVLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3RELGdCQUFnQixHQUFHLElBQUksQ0FBQztvQkFDeEIsTUFBTTtnQkFFVixLQUFLLHdCQUF3QjtvQkFDekIsUUFBUSxHQUFHLElBQUksK0NBQXNCLEVBQUUsQ0FBQztvQkFDeEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO29CQUN4QixNQUFNO2dCQUVWLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQixLQUFLLGdCQUFnQixDQUFDO2dCQUN0QixLQUFLLGNBQWMsQ0FBQztnQkFDcEIsS0FBSyx1QkFBdUI7b0JBQ3hCLElBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDckQsUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ25FO3lCQUNHO3dCQUNBLElBQUcsbUJBQW1CLENBQUMsSUFBSSxJQUFJLGdCQUFnQixFQUFDOzRCQUM1QyxRQUFRLEdBQUcsK0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt5QkFDM0M7NkJBQ0ksSUFBRyxtQkFBbUIsQ0FBQyxJQUFJLElBQUksY0FBYyxFQUFDOzRCQUMvQyxRQUFRLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7eUJBQ2pDOzZCQUNJLElBQUcsbUJBQW1CLENBQUMsSUFBSSxJQUFJLHVCQUF1QixFQUFDOzRCQUN4RCxRQUFRLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDO3lCQUN4RDs2QkFDRzs0QkFDQSxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7NEJBQ25DLE9BQU8sU0FBUyxDQUFDO3lCQUNwQjt3QkFDRCxJQUFJLENBQUMsb0NBQW9DLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUNyRjtvQkFDRCxPQUFPLFFBQVEsQ0FBQztvQkFDaEIsTUFBTTtnQkFDVixLQUFLLG9CQUFvQjtvQkFDckIsUUFBUSxHQUFHLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM1QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1YsS0FBSyxlQUFlO29CQUNoQixRQUFRLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDdkMsTUFBTTtnQkFDVixLQUFLLHNCQUFzQjtvQkFDdkIsUUFBUSxHQUFHLDJDQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM5QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLE1BQU07Z0JBRVY7b0JBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDbkYsTUFBTTthQUViO1lBQ0QsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDN0QsSUFBRyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUM7b0JBQ3hCLDBJQUEwSTtvQkFDcEksUUFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUNoQzthQUNKO1lBQ0QsT0FBTyxRQUFRLENBQUM7WUFDaEIsd0NBQXdDO1FBQzVDLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLCtEQUFvQyxHQUE1QyxVQUE2QyxtQkFBd0MsRUFBRSxPQUErQyxFQUFFLFFBQW9CO1lBQXJFLHdCQUFBLEVBQUEsbUJBQStDO1lBQ2xJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELFFBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwyQ0FBZ0IsR0FBdkIsVUFBd0IsRUFBVTtZQUM5QixJQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hELElBQUcsUUFBUSxJQUFJLFNBQVMsRUFBQztvQkFDckIsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNuQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QzthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssMENBQWUsR0FBdkIsVUFBd0IsUUFBb0IsRUFBRSxtQkFBd0MsRUFBRSxPQUFtQztZQUN2SCxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksNkJBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdkQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQyxJQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUN4QztZQUNELFFBQVEsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQXpQRCxJQXlQQztJQXpQWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuL2ludGVyZmFjZXMvY29tcG9uZW50RmFjdG9yeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnRJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbHNEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvclNpZ25hbHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlclwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0ICogYXMgRGF0YU1vZGVscyBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gXCIuLi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9pbWFnZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENvbW1vbkxheW91dFByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2NvbW1vbkxheW91dFByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc0ljb25Qcm92aWRlciB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zZXJpZXNJY29uUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50Q29udGV4dCB9IGZyb20gXCIuLi9jb21wb25lbnRCYXNlL2NvbXBvbmVudENvbnRleHRcIjtcclxuaW1wb3J0IHsgVGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4uL3RleHRQcm92aWRlci90ZXh0UHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRGYWN0b3J5IGltcGxlbWVudHMgSUNvbXBvbmVudEZhY3Rvcnl7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50SW5zdGFuY2VzID0gbmV3IE1hcDxzdHJpbmcsIElDb21wb25lbnQ+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBJQ29tcG9uZW50RmFjdG9yeTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IElDb21wb25lbnRGYWN0b3J5e1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IENvbXBvbmVudEZhY3RvcnkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGUoY29tcG9uZW50RGVmaW5pdGlvbjogQ29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dDogQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBJQ29tcG9uZW50fHVuZGVmaW5lZHtcclxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqLyAvLyBkaXNhYmxlZCBkdWUgdG8gc3dpdGNoIGNhc2VcclxuICAgICAgICBsZXQgaW5zdGFuY2U6IElDb21wb25lbnR8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBkb0luaXRpYWxpemF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgc3dpdGNoKGNvbXBvbmVudERlZmluaXRpb24udHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGNvbXBvbmVudERlZmluaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB3aWRnZXRzXHJcbiAgICAgICAgICAgIGNhc2UgXCJNYXBwQ29ja3BpdFdpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1hcHBDb2NrcGl0V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJXYXRjaGFibGVzV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuV2F0Y2hhYmxlc1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTWV0aG9kc1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1ldGhvZHNXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNvbmZpZ01hbmFnZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5Db25maWdNYW5hZ2VyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWduYWxNYW5hZ2VyV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuU2lnbmFsTWFuYWdlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hhcnRNYW5hZ2VyV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ2hhcnRNYW5hZ2VyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZVZpZXdXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5UcmFjZVZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoYXJ0Vmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkNoYXJ0Vmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTWVzc2FnZXNXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5NZXNzYWdlc1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiU3BsaXR0ZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5TcGxpdHRlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ29tcG9uZW50Vmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkNvbXBvbmVudFZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1ldGhvZExpc3RXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5NZXRob2RMaXN0V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiU2lkZUJhcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlNpZGVCYXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRhYldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRhYldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiU3RhcnRQYWdlV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuU3RhcnRQYWdlV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDb21wb25lbnRPdmVydmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZU92ZXJ2aWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VPdmVydmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlQ29udHJvbFdpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlQ29udHJvbFdpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5UcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTWFpbk5hdmlnYXRpb25XaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5NYWluTmF2aWdhdGlvbldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTG9naW5XaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5Mb2dpbldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ3Vyc29ySW5mb1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkN1cnNvckluZm9XaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRvb2xzT3ZlcnZpZXdXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5Ub29sc092ZXJ2aWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydFZpZXdUb29sYmFyXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ2hhcnRWaWV3VG9vbGJhci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hhcnRCYXNlXCI6XHJcbiAgICAgICAgICAgICAgICAvLyBJbXBsZW1lbnQgY3JlYXRpb24gb2YgY2hhcnRCYXNlKHdpZGdldCkgaW4gdGhlIGNvbXBvbmVudCBmYWN0b3J5KHR5cGUgbXVzdCBiZSBzZXQgYnkgZGVmYXVsdFNldHRpbmdzSWQgPT4gZmZ0LCB4eSwgeXQsIC4uLilcclxuICAgICAgICAgICAgICAgIC8vaW5zdGFuY2UgPSBXaWRnZXRzLkNoYXJ0QmFzZVdpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRHVtbXlXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5EdW1teVdpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTG9nZ2VyV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuTG9nZ2VyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZGF0YW1vZGVsc1xyXG4gICAgICAgICAgICBjYXNlIFwiTWFwcENvY2twaXREYXRhTW9kZWxcIjogXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuTWFwcENvY2twaXREYXRhTW9kZWwuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBkb0luaXRpYWxpemF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVGFiV2lkZ2V0RGF0YU1vZGVsXCI6IFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBEYXRhTW9kZWxzLlRhYldpZGdldERhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDb25maWdNYW5hZ2VyRGF0YU1vZGVsXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuQ29uZmlnTWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuU2lnbmFsTWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIFwiQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgZG9Jbml0aWFsaXphdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBwcm92aWRlcnNcclxuICAgICAgICAgICAgY2FzZSBcIlNlcmllc1Byb3ZpZGVyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJUZXh0UHJvdmlkZXJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiOlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmhhcyhjb21wb25lbnREZWZpbml0aW9uLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmdldChjb21wb25lbnREZWZpbml0aW9uLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tcG9uZW50RGVmaW5pdGlvbi50eXBlID09IFwiU2VyaWVzUHJvdmlkZXJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gU2VyaWVzUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihjb21wb25lbnREZWZpbml0aW9uLnR5cGUgPT0gXCJUZXh0UHJvdmlkZXJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IFRleHRQcm92aWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGNvbXBvbmVudERlZmluaXRpb24udHlwZSA9PSBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBEYXRhTW9kZWxzLkNoYXJ0TWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlR5cGUgbm90IGRlZmluZWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudEFuZEluaXRpYWxpemVJbnN0YW5jZShjb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0LCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNlcmllc0ljb25Qcm92aWRlclwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBTZXJpZXNJY29uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJJbWFnZVByb3ZpZGVyXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ29tbW9uTGF5b3V0UHJvdmlkZXJcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gQ29tbW9uTGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua293biB0eXBlIHVzZWQgZm9yIGluc3RhbmNlIGZhY3Rvcnk6IFwiICsgY29tcG9uZW50RGVmaW5pdGlvbi50eXBlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudChpbnN0YW5jZSwgY29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmKGRvSW5pdGlhbGl6YXRpb24gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBEb2VzIHRoZSBpbml0aWFsaXphdGlvbiBvZiB0aGUgaW5zdGFuY2UoZGF0YW1vZGVsLC4uLikgPT4gd2lkZ2V0cyB3aWxsIGJlIGluaXRpYWxpemVkIGxhdGVyIGF0IHRoZSBhZGQgb2YgYSB3aWRnZXQgdG8gYSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAgICAgICAgICAgICg8YW55Pmluc3RhbmNlKS5pbml0aWFsaXplKCk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGNvbXBvbmVudCBhbmQgaW5pdGlhbGl6ZSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudERlZmluaXRpb259IGNvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudENvbnRleHR8dW5kZWZpbmVkKX0gW2NvbnRleHQ9dW5kZWZpbmVkXVxyXG4gICAgICogQHBhcmFtIHtJQ29tcG9uZW50fSBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnRBbmRJbml0aWFsaXplSW5zdGFuY2UoY29tcG9uZW50RGVmaW5pdGlvbjogQ29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dDogQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQgPSB1bmRlZmluZWQsIGluc3RhbmNlOiBJQ29tcG9uZW50KXtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMuc2V0KGNvbXBvbmVudERlZmluaXRpb24uaWQsIGluc3RhbmNlKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudChpbnN0YW5jZSwgY29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dCk7XHJcbiAgICAgICAgKDxhbnk+aW5zdGFuY2UpLmluaXRpYWxpemUoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlQ29tcG9uZW50KGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcy5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcy5nZXQoaWQpO1xyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluaXRpYWxpemVzIHRoZSBjb21wb25lbnQgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gaW5zdGFuY2Uod2lkZ2V0LCBkYXRhbW9kZWwsIHByb3ZpZGVyLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUNvbXBvbmVudH0gaW5zdGFuY2VcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50RGVmaW5pdGlvbn0gY29tcG9uZW50RGVmaW5pdGlvblxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZH0gY29udGV4dFxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEZhY3RvcnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnQoaW5zdGFuY2U6IElDb21wb25lbnQsIGNvbXBvbmVudERlZmluaXRpb246IENvbXBvbmVudERlZmluaXRpb24sIGNvbnRleHQ6IENvbXBvbmVudENvbnRleHR8dW5kZWZpbmVkKXtcclxuICAgICAgICBpbnN0YW5jZS5jb21wb25lbnQgPSBuZXcgQ29tcG9uZW50QmFzZSh0aGlzLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50LmluaXRpYWxpemUoKTtcclxuICAgICAgICBpZihjb250ZXh0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50LnNldERlZmluaXRpb24oY29tcG9uZW50RGVmaW5pdGlvbik7XHJcbiAgICB9XHJcbn0iXX0=
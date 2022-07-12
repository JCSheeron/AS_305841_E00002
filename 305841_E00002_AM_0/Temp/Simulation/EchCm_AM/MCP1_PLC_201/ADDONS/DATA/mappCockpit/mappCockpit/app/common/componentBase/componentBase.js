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
define(["require", "exports", "./componentSettings", "../persistence/persistDataProvider", "../componentFactory/componentDefinition", "../../framework/componentHub/bindings/componentBindings", "../../framework/events", "./eventSubComponentsLoadedArgs", "./eventComponentSettingsLoadedArgs"], function (require, exports, componentSettings_1, persistDataProvider_1, componentDefinition_1, componentBindings_1, events_1, eventSubComponentsLoadedArgs_1, eventComponentSettingsLoadedArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSubComponentsLoaded = /** @class */ (function (_super) {
        __extends(EventSubComponentsLoaded, _super);
        function EventSubComponentsLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSubComponentsLoaded;
    }(events_1.TypedEvent));
    ;
    var EventComponentSettingsLoaded = /** @class */ (function (_super) {
        __extends(EventComponentSettingsLoaded, _super);
        function EventComponentSettingsLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentSettingsLoaded;
    }(events_1.TypedEvent));
    ;
    var ComponentBase = /** @class */ (function () {
        /**
         * Creates an instance of ComponentBase
         * @param {(IComponentFactory|undefined)} componentFactory
         * @param {*} owner
         * @memberof ComponentBase
         */
        function ComponentBase(componentFactory, owner) {
            this.eventSubComponentsLoaded = new EventSubComponentsLoaded();
            this.eventComponentSettingsLoaded = new EventComponentSettingsLoaded();
            /**
             * Main definition of this component(e.g. type, id, default settings data id)
             *
             * @type {ComponentDefinition}
             * @memberof ComponentBase
             */
            this._definition = new componentDefinition_1.ComponentDefinition("", "", ""); // Create default component definition
            /**
             * List of all created sub components after loading settings data
             *
             * @protected
             * @type {{ [id: string]: any; }}
             * @memberof ComponentBase
             */
            this._subComponents = {};
            /**
             * Data of this component will not be persisted if this flag is false
             *
             * @memberof ComponentBase
             */
            this._persistData = true;
            this._componentSettings = new componentSettings_1.ComponentSettings();
            this._componentFactory = componentFactory;
            this._owner = owner;
        }
        Object.defineProperty(ComponentBase.prototype, "componentFactory", {
            /**
             * Returns the component factory
             *
             * @readonly
             * @type {(IComponentFactory | undefined)}
             * @memberof ComponentBase
             */
            get: function () {
                return this._componentFactory;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Disable persisting of data for this component
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.disablePersisting = function () {
            this._persistData = false;
        };
        /**
         * Returns persist state of component
         *
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getPersistency = function () {
            return this._persistData;
        };
        /**
         * Initialize the component
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.initialize = function () {
            this._owner.initializeComponent();
            this.addDefaultComponentSettings();
            this.addAdditionalDefaultComponentSettings();
        };
        /**
         * Raises the subComponentsLoaded event
         *
         * @param {ComponentBase} sender
         * @param {EventSubComponentsLoadedArgs} data
         * @memberof ComponentBase
         */
        ComponentBase.prototype.onSubComponentsLoaded = function (sender, data) {
            this.eventSubComponentsLoaded.raise(sender, data);
        };
        /**
         * Raises the componentSettingsLoaded event
         *
         * @param {ComponentBase} sender
         * @param {EventComponentSettingsLoadedArgs} data
         * @memberof ComponentBase
         */
        ComponentBase.prototype.onComponentSettingsLoaded = function (sender, data) {
            this.eventComponentSettingsLoaded.raise(sender, data);
        };
        /**
         * Returns the settings of this component
         *
         * @returns {ComponentSettings}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getComponentSettings = function (onlyModified) {
            if (onlyModified === void 0) { onlyModified = false; }
            return this._componentSettings.getSettings(onlyModified);
        };
        /**
         * Sets settings to this component
         *
         * @param {(ComponentSettings|undefined)} settings
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setComponentSettings = function (settings) {
            if (settings != undefined) {
                // Set componentSettings
                this._componentSettings.setSettings(settings);
                var defaultSettingsData = this.getDefaultSettingsData();
                if (defaultSettingsData != undefined) {
                    // Currently SubComponent and Binding settings are static and were not saved, therefore the default settings must be used
                    var defaultSubComponentSettings = defaultSettingsData.getSubComponentSettings();
                    var subComponentSettings = this._componentSettings.getSubComponentSettings();
                    if (subComponentSettings == undefined && defaultSubComponentSettings != undefined) {
                        // Use default sub component settings if no sub component settings are available
                        this._componentSettings.setSubComponentSettings(defaultSubComponentSettings);
                    }
                    var defaultBindingSettings = defaultSettingsData.getBindingSettings();
                    var bindingSettings = this._componentSettings.getBindingSettings();
                    if (bindingSettings == undefined && defaultBindingSettings != undefined) {
                        // Use default binding settings if no sub component settings are available
                        this._componentSettings.setBindingSettings(defaultBindingSettings);
                    }
                }
            }
        };
        /**
         * Saves the component settings to the persisting data provider
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.saveComponentSettings = function () {
            if (this._persistData == true) {
                if (this.id != "") {
                    // Only persist if data was modified
                    persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.id, this._owner.getComponentSettings(true));
                }
                else {
                    console.warn("No id for persisting data available!(ComponentBase) => " + this.type);
                    console.warn(this);
                }
            }
        };
        /**
         * Loads the component settings from the persisting data provider(default or persisted data if available) to the component base,
         * and creates the subcomponents
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.loadComponentSettings = function () {
            var componentSettings = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(this.id);
            if (this.useDefaultComponentSettings(componentSettings) == true) {
                componentSettings = this.getDefaultSettingsData();
            }
            // Get sub component settings of the component settings object or default if not available
            var subComponentSettings = this.getSubComponentSettings(componentSettings);
            // Create sub component before set settings to the owner of this component base (because sub components are sometimes needed in the owner setComponentSettings method)
            this.createSubComponents(subComponentSettings);
            // Raise sub components loaded event
            this.onSubComponentsLoaded(this, new eventSubComponentsLoadedArgs_1.EventSubComponentsLoadedArgs(this.getSubComponentsArray()));
            // Set the component settings
            this._owner.setComponentSettings(componentSettings);
            // Raise components settings loaded event
            this.onComponentSettingsLoaded(this, new eventComponentSettingsLoadedArgs_1.EventComponentSettingsLoadedArgs());
        };
        /**
         * Returns an array with the current sub components
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSubComponentsArray = function () {
            var _this = this;
            var subComponents = new Array();
            var keys = Object.keys(this._subComponents);
            keys.forEach(function (key) {
                subComponents.push(_this._subComponents[key]);
            });
            return subComponents;
        };
        /**
         * Returns the sub component settings of the component settings object or default if not available
         *
         * @private
         * @param {(ComponentSettings|undefined)} componentSettings
         * @returns {(ComponentDefinition[]|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSubComponentSettings = function (componentSettings) {
            var subComponentSettings;
            if (componentSettings != undefined) {
                // Complete ComponentSetting object not available so we have to use the data array and the id to get the subcomponents data => getSubComponentSettings is not working here
                subComponentSettings = componentSettings.data[componentSettings_1.ComponentSettings.SubComponentsSettingId];
                if (subComponentSettings == undefined) {
                    var defaultSettingsData = this.getDefaultSettingsData();
                    if (defaultSettingsData != undefined) {
                        // Currently SubComponent and Binding settings are static and were not saved, therefore the default settings must be used
                        subComponentSettings = defaultSettingsData.getSubComponentSettings();
                    }
                }
            }
            return subComponentSettings;
        };
        /**
         * Returns true if no components settings are defined, or if persisting is deactivated, or version of component settings is not supported
         *
         * @private
         * @param {ComponentSettings} componentSettings
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.useDefaultComponentSettings = function (componentSettings) {
            if (componentSettings == undefined) {
                return true;
            }
            if (this._persistData == false) {
                return true;
            }
            if (this.isComponentSupportingSettings(componentSettings) == false) {
                return true;
            }
            return false;
        };
        /**
         * Check if the settings version is supported in this component version (equal versions are supported => only major version is checked)
         * major.minor => x.y (e.g)
         *
         * @private
         * @param {ComponentSettings} componentSettings
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.isComponentSupportingSettings = function (componentSettings) {
            var splittedSettingsVersion = componentSettings.version.split(".");
            var splittedComponentVersion = this._componentSettings.version.split(".");
            var settingVersionNumber = parseInt(splittedSettingsVersion[0], 10);
            var settingComponentNumber = parseInt(splittedComponentVersion[0], 10);
            // Currently only equal versions are allowed
            if (settingVersionNumber == settingComponentNumber) {
                return true;
            }
            return false;
        };
        /**
         * Adds the default component settings to the default settings provider
         *
         * @private
         * @memberof ComponentBase
         */
        ComponentBase.prototype.addDefaultComponentSettings = function () {
            // Is a default persisting data id definied
            if (this.defaultSettingsDataId != "") {
                // Is some default persisting data defined
                if (this._defaultDefinition != undefined) {
                    var defaultComponentSettings = this._defaultDefinition.getDefaultComponentSettings();
                    if (defaultComponentSettings != undefined) {
                        // Add default persisting definition to the default persisting data provider
                        this.addComponentDefaultDefinitionToProvider(this.defaultSettingsDataId, defaultComponentSettings);
                    }
                }
            }
        };
        /**
         * Adds the addiional defined default definitions which are defined in the defaultDefiniton to the defaultDefinitionProvider
         *
         * @private
         * @memberof ComponentBase
         */
        ComponentBase.prototype.addAdditionalDefaultComponentSettings = function () {
            var _this = this;
            if (this._defaultDefinition != undefined) {
                var additionalDefaultComponentSettingsPackages = this._defaultDefinition.getAdditionalDefaultComponentSettings();
                if (additionalDefaultComponentSettingsPackages != undefined) {
                    additionalDefaultComponentSettingsPackages.forEach(function (settingsPackage) {
                        _this.addComponentDefaultDefinitionToProvider(settingsPackage.id, settingsPackage.defaultSettings);
                    });
                }
            }
        };
        /**
         * Adds the given default component settings to the default persisting data provider(TODO: should be a seperated default componentSettings provider)
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.addComponentDefaultDefinitionToProvider = function (id, settings) {
            if (settings == undefined) {
                console.error("No default persisting data available for id: " + id);
            }
            else {
                persistDataProvider_1.PersistDataProvider.getInstance().setDefaultDataWithId(id, settings);
            }
        };
        ComponentBase.prototype.addSubComponent = function (type, id, defaultSettingsDataId, context) {
            if (defaultSettingsDataId === void 0) { defaultSettingsDataId = ""; }
            if (context === void 0) { context = undefined; }
            // Only add dynamic sub components to component settings if they should be persisted
            // this.getComponentSettings().addSubComponent(type, id, defaultInstanceDataId);
            var instance = this.createComponentInstance(new componentDefinition_1.ComponentDefinition(type, id, defaultSettingsDataId), context);
            if (instance != undefined) {
                this._subComponents[instance.component._definition.id] = instance;
            }
            return instance;
        };
        /**
         * Returns subcomponent for the given id
         *
         * @param {string} id
         * @returns {IComponent}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSubComponent = function (id) {
            return this._subComponents[id];
        };
        ComponentBase.prototype.setBindingsData = function () {
            // Set bindings needed for this component
            var bindings = this.getSetting(componentSettings_1.ComponentSettings.BindingsSettingId);
            this.createBindings(bindings);
        };
        Object.defineProperty(ComponentBase.prototype, "type", {
            get: function () {
                return this._definition.type;
            },
            set: function (value) {
                this._definition.type = value;
                // Additionaly set type in componentSettings
                this._componentSettings.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentBase.prototype, "id", {
            get: function () {
                return this._definition.id;
            },
            set: function (value) {
                this._definition.id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentBase.prototype, "defaultSettingsDataId", {
            /**
             * Returns the defaultSettingsData id (the component uses this data at startup if no persited data is available for this component)
             *
             * @type {string}
             * @memberof ComponentBase
             */
            get: function () {
                return this._definition.defaultSettingsDataId;
            },
            /**
             * Sets the defaultSettingsDataid (the component uses this data at startup if no persited data is available for this component)
             *
             * @memberof ComponentBase
             */
            set: function (value) {
                this._definition.defaultSettingsDataId = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the componentDefaultDefinition
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setDefaultDefinition = function (value) {
            if (value != undefined) {
                this.defaultSettingsDataId = value.defaultComponentSettingsId;
            }
            else {
                this.defaultSettingsDataId = "";
            }
            this._defaultDefinition = value;
        };
        /**
         * Returns the setting for the given key
         *
         * @param {string} key
         * @returns {(any|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSetting = function (key) {
            var setting = undefined;
            if (this._componentSettings != undefined) {
                setting = this._componentSettings.getValue(key);
            }
            return setting;
        };
        /**
         * Sets a new setting with the given key and value to the componentSettings
         *
         * @param {string} key
         * @param {*} value
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setSetting = function (key, value) {
            if (this._componentSettings != undefined) {
                this._componentSettings.setValue(key, value);
            }
            else {
                console.error("ComponentSettings not available for setting data!");
            }
        };
        /**
         * Returns the coomponentDefinition of this component(type, id, defaultDataId)
         *
         * @returns {ComponentDefinition}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getDefinition = function () {
            return this._definition;
        };
        /**
         * Sets the componentDefinition of this component(type, id, defaultDataId)
         *
         * @param {ComponentDefinition} value
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setDefinition = function (value) {
            var defaultSettingsDataId = this._definition.defaultSettingsDataId;
            this._definition = value;
            if (this._definition.defaultSettingsDataId == "") {
                this._definition.defaultSettingsDataId = defaultSettingsDataId; // Use old settings data id if not defined in the new one
            }
            // set type also to the component settings
            this._componentSettings.type = this._definition.type;
        };
        /**
         * Creates components for the given component definitions and add them to the sub components list of this component
         *
         * @protected
         * @param {Array<ComponentDefinition>} componentDefinitions
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createSubComponents = function (componentDefinitions) {
            if (componentDefinitions != undefined) {
                for (var i = 0; i < componentDefinitions.length; i++) {
                    var componentDef = componentDefinitions[i];
                    var instance = this.createComponentInstance(componentDef, this.context);
                    if (instance != undefined) {
                        this._subComponents[instance.component._definition.id] = instance;
                    }
                }
            }
        };
        /**
         * Creates a component instance with the given component definition if the component factory is available
         *
         * @private
         * @param {ComponentDefinition} componentDef
         * @returns {(IComponent|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createComponentInstance = function (componentDef, context) {
            if (this._componentFactory != undefined) {
                var instance = this._componentFactory.create(componentDef, context);
                if (instance != undefined) {
                    return instance;
                }
            }
            else {
                console.error("ComponentFactory not available!");
            }
            return undefined;
        };
        /**
         * Creates the bindings an binds them
         *
         * @protected
         * @param {Array<ComponentBinding>} bindings
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createBindings = function (bindings) {
            if (bindings != undefined) {
                for (var i = 0; i < bindings.length; i++) {
                    var binding = bindings[i];
                    // create new binding for this component (binding component = this.owner => e.g. widget, datamodel, ...)
                    componentBindings_1.ComponentBindings.create(binding.type, binding.dataType, this._owner, binding.scope, binding.id, binding.targetKey, binding.sourceKey);
                }
            }
        };
        /**
         * Returns the default settings data which should be used for default startup of this component or undefined if not available
         *
         * @private
         * @returns {(ComponentSettings|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getDefaultSettingsData = function () {
            if (this._definition.defaultSettingsDataId != "") {
                return persistDataProvider_1.PersistDataProvider.getInstance().getDefaultDataWithId(this._definition.defaultSettingsDataId);
            }
            return undefined;
        };
        return ComponentBase;
    }());
    exports.ComponentBase = ComponentBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBdUMsNENBQXVEO1FBQTlGOztRQUFnRyxDQUFDO1FBQUQsK0JBQUM7SUFBRCxDQUFDLEFBQWpHLENBQXVDLG1CQUFVLEdBQWdEO0lBQUEsQ0FBQztJQUNsRztRQUEyQyxnREFBMkQ7UUFBdEc7O1FBQXdHLENBQUM7UUFBRCxtQ0FBQztJQUFELENBQUMsQUFBekcsQ0FBMkMsbUJBQVUsR0FBb0Q7SUFBQSxDQUFDO0lBRTFHO1FBdUdJOzs7OztXQUtHO1FBQ0gsdUJBQVksZ0JBQTZDLEVBQUUsS0FBVTtZQTNHckUsNkJBQXdCLEdBQTZCLElBQUksd0JBQXdCLEVBQUUsQ0FBQztZQUNwRixpQ0FBNEIsR0FBaUMsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1lBOEJoRzs7Ozs7ZUFLRztZQUNLLGdCQUFXLEdBQXdCLElBQUkseUNBQW1CLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztZQVd0SDs7Ozs7O2VBTUc7WUFDSyxtQkFBYyxHQUFrQyxFQUFFLENBQUM7WUFvQjNEOzs7O2VBSUc7WUFDSyxpQkFBWSxHQUFZLElBQUksQ0FBQztZQTRCakMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQXBGRCxzQkFBVywyQ0FBZ0I7WUFQM0I7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7OztXQUFBO1FBcURE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QUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsd0dBQXdHO29CQUN4RyxxQ0FBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMzSTthQUNUO1FBQ0YsQ0FBQztRQUVFOzs7Ozs7V0FNRztRQUNLLDhDQUFzQixHQUE5QjtZQUNJLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsSUFBSSxFQUFFLEVBQUM7Z0JBQzVDLE9BQU8seUNBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3pHO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQS9qQkQsSUErakJDO0lBL2pCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFQcm92aWRlciB9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmluaXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJpbmRpbmcgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJpbmRpbmdzIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ3NcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vY29tcG9uZW50RmFjdG9yeS9pbnRlcmZhY2VzL2NvbXBvbmVudEZhY3RvcnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudENvbnRleHQgfSBmcm9tIFwiLi9jb21wb25lbnRDb250ZXh0XCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTdWJDb21wb25lbnRzTG9hZGVkQXJnc1wiO1xyXG5pbXBvcnQgeyBFdmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkQXJncyB9IGZyb20gXCIuL2V2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWRBcmdzXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuXHJcbmNsYXNzIEV2ZW50U3ViQ29tcG9uZW50c0xvYWRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8Q29tcG9uZW50QmFzZSwgRXZlbnRTdWJDb21wb25lbnRzTG9hZGVkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PENvbXBvbmVudEJhc2UsIEV2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWRBcmdzPnsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRCYXNlIHtcclxuICAgICBcclxuICAgIGV2ZW50U3ViQ29tcG9uZW50c0xvYWRlZDogRXZlbnRTdWJDb21wb25lbnRzTG9hZGVkID0gbmV3IEV2ZW50U3ViQ29tcG9uZW50c0xvYWRlZCgpO1xyXG4gICAgZXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZDogRXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZCA9IG5ldyBFdmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wb25lbnRGYWN0b3J5IGluc3RhbmNlIG5lZWRlZCBmb3IgY3JlYXRpbmcgbmV3IHN1YiBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoSUNvbXBvbmVudEZhY3Rvcnl8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3Rvcnk6IElDb21wb25lbnRGYWN0b3J5IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgc29tZSBjb250ZXh0IGluZm9ybWF0aW9ucyhlLmcuIGlkIGlmIGNvbXBvbmVudCA9PiBnQXhpczAxKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnRleHQ6IENvbXBvbmVudENvbnRleHR8dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBmYWN0b3J5XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KElDb21wb25lbnRGYWN0b3J5IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50RmFjdG9yeSgpOiBJQ29tcG9uZW50RmFjdG9yeSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudEZhY3Rvcnk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBkZWZpbml0aW9uIG9mIHRoaXMgY29tcG9uZW50KGUuZy4gdHlwZSwgaWQsIGRlZmF1bHQgc2V0dGluZ3MgZGF0YSBpZClcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Q29tcG9uZW50RGVmaW5pdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RlZmluaXRpb246IENvbXBvbmVudERlZmluaXRpb24gPSBuZXcgQ29tcG9uZW50RGVmaW5pdGlvbihcIlwiLCBcIlwiLCBcIlwiKTsgLy8gQ3JlYXRlIGRlZmF1bHQgY29tcG9uZW50IGRlZmluaXRpb25cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgZGVmaW5pdGlvbiBpbmZvcm1hdGlvbiBvZiB0aGlzIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7SUNvbXBvbmVudERlZmF1bHREZWZpbml0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdERlZmluaXRpb246IElDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGFsbCBjcmVhdGVkIHN1YiBjb21wb25lbnRzIGFmdGVyIGxvYWRpbmcgc2V0dGluZ3MgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHt7IFtpZDogc3RyaW5nXTogYW55OyB9fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc3ViQ29tcG9uZW50czogeyBbaWQ6IHN0cmluZ106IElDb21wb25lbnQ7IH0gPSB7fTsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3duZXIgb2YgdGhpcyBjb21wb25lbnQgb2JqZWN0KGUuZy4gYSB3aWRnZXQsIGEgZGF0YW1vZGVsLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtJQ29tcG9uZW50fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfb3duZXI6IElDb21wb25lbnQ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBjb21wb25lbnQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRTZXR0aW5ncyE6IENvbXBvbmVudFNldHRpbmdzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0YSBvZiB0aGlzIGNvbXBvbmVudCB3aWxsIG5vdCBiZSBwZXJzaXN0ZWQgaWYgdGhpcyBmbGFnIGlzIGZhbHNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcGVyc2lzdERhdGE6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBwZXJzaXN0aW5nIG9mIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVQZXJzaXN0aW5nKCkge1xyXG4gICAgICAgIHRoaXMuX3BlcnNpc3REYXRhID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHBlcnNpc3Qgc3RhdGUgb2YgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGVyc2lzdGVuY3koKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BlcnNpc3REYXRhO1xyXG4gICAgfVxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICogQHBhcmFtIHsoSUNvbXBvbmVudEZhY3Rvcnl8dW5kZWZpbmVkKX0gY29tcG9uZW50RmFjdG9yeVxyXG4gICAgICogQHBhcmFtIHsqfSBvd25lclxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50RmFjdG9yeTogSUNvbXBvbmVudEZhY3Rvcnl8dW5kZWZpbmVkLCBvd25lcjogYW55KXtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5O1xyXG4gICAgICAgIHRoaXMuX293bmVyID0gb3duZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCl7XHJcbiAgICAgICAgdGhpcy5fb3duZXIuaW5pdGlhbGl6ZUNvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIHN1YkNvbXBvbmVudHNMb2FkZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJhc2V9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBvblN1YkNvbXBvbmVudHNMb2FkZWQoc2VuZGVyOiBDb21wb25lbnRCYXNlLCBkYXRhOiBFdmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFN1YkNvbXBvbmVudHNMb2FkZWQucmFpc2Uoc2VuZGVyLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlcyB0aGUgY29tcG9uZW50U2V0dGluZ3NMb2FkZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJhc2V9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgb25Db21wb25lbnRTZXR0aW5nc0xvYWRlZChzZW5kZXI6IENvbXBvbmVudEJhc2UsIGRhdGE6IEV2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkLnJhaXNlKHNlbmRlciwgZGF0YSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmdzIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbiA9IGZhbHNlKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLmdldFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgICAqIFNldHMgc2V0dGluZ3MgdG8gdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5zZXRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFNldHRpbmdzRGF0YSA9IHRoaXMuZ2V0RGVmYXVsdFNldHRpbmdzRGF0YSgpO1xyXG4gICAgICAgICAgICBpZihkZWZhdWx0U2V0dGluZ3NEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBDdXJyZW50bHkgU3ViQ29tcG9uZW50IGFuZCBCaW5kaW5nIHNldHRpbmdzIGFyZSBzdGF0aWMgYW5kIHdlcmUgbm90IHNhdmVkLCB0aGVyZWZvcmUgdGhlIGRlZmF1bHQgc2V0dGluZ3MgbXVzdCBiZSB1c2VkXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFN1YkNvbXBvbmVudFNldHRpbmdzID0gZGVmYXVsdFNldHRpbmdzRGF0YS5nZXRTdWJDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YkNvbXBvbmVudFNldHRpbmdzID0gdGhpcy5fY29tcG9uZW50U2V0dGluZ3MuZ2V0U3ViQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1YkNvbXBvbmVudFNldHRpbmdzID09IHVuZGVmaW5lZCAmJiBkZWZhdWx0U3ViQ29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgZGVmYXVsdCBzdWIgY29tcG9uZW50IHNldHRpbmdzIGlmIG5vIHN1YiBjb21wb25lbnQgc2V0dGluZ3MgYXJlIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLnNldFN1YkNvbXBvbmVudFNldHRpbmdzKGRlZmF1bHRTdWJDb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRCaW5kaW5nU2V0dGluZ3MgPSBkZWZhdWx0U2V0dGluZ3NEYXRhLmdldEJpbmRpbmdTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJpbmRpbmdTZXR0aW5ncyA9IHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLmdldEJpbmRpbmdTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgaWYoYmluZGluZ1NldHRpbmdzID09IHVuZGVmaW5lZCAmJiBkZWZhdWx0QmluZGluZ1NldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIGRlZmF1bHQgYmluZGluZyBzZXR0aW5ncyBpZiBubyBzdWIgY29tcG9uZW50IHNldHRpbmdzIGFyZSBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5zZXRCaW5kaW5nU2V0dGluZ3MoZGVmYXVsdEJpbmRpbmdTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIFNhdmVzIHRoZSBjb21wb25lbnQgc2V0dGluZ3MgdG8gdGhlIHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlQ29tcG9uZW50U2V0dGluZ3MoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fcGVyc2lzdERhdGEgPT0gdHJ1ZSl7ICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5pZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgcGVyc2lzdCBpZiBkYXRhIHdhcyBtb2RpZmllZFxyXG4gICAgICAgICAgICAgICAgUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERhdGFXaXRoSWQodGhpcy5pZCwgdGhpcy5fb3duZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3ModHJ1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJObyBpZCBmb3IgcGVyc2lzdGluZyBkYXRhIGF2YWlsYWJsZSEoQ29tcG9uZW50QmFzZSkgPT4gXCIgKyB0aGlzLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyBmcm9tIHRoZSBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXIoZGVmYXVsdCBvciBwZXJzaXN0ZWQgZGF0YSBpZiBhdmFpbGFibGUpIHRvIHRoZSBjb21wb25lbnQgYmFzZSxcclxuICAgICAqIGFuZCBjcmVhdGVzIHRoZSBzdWJjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRDb21wb25lbnRTZXR0aW5ncygpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCA9IFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhV2l0aElkKHRoaXMuaWQpIGFzIENvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgICAgIGlmKHRoaXMudXNlRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgY29tcG9uZW50U2V0dGluZ3MgPSB0aGlzLmdldERlZmF1bHRTZXR0aW5nc0RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gR2V0IHN1YiBjb21wb25lbnQgc2V0dGluZ3Mgb2YgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyBvYmplY3Qgb3IgZGVmYXVsdCBpZiBub3QgYXZhaWxhYmxlXHJcbiAgICAgICAgbGV0IHN1YkNvbXBvbmVudFNldHRpbmdzID0gdGhpcy5nZXRTdWJDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRlIHN1YiBjb21wb25lbnQgYmVmb3JlIHNldCBzZXR0aW5ncyB0byB0aGUgb3duZXIgb2YgdGhpcyBjb21wb25lbnQgYmFzZSAoYmVjYXVzZSBzdWIgY29tcG9uZW50cyBhcmUgc29tZXRpbWVzIG5lZWRlZCBpbiB0aGUgb3duZXIgc2V0Q29tcG9uZW50U2V0dGluZ3MgbWV0aG9kKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlU3ViQ29tcG9uZW50cyhzdWJDb21wb25lbnRTZXR0aW5ncyk7IFxyXG5cclxuICAgICAgICAvLyBSYWlzZSBzdWIgY29tcG9uZW50cyBsb2FkZWQgZXZlbnRcclxuICAgICAgICB0aGlzLm9uU3ViQ29tcG9uZW50c0xvYWRlZCh0aGlzLCBuZXcgRXZlbnRTdWJDb21wb25lbnRzTG9hZGVkQXJncyh0aGlzLmdldFN1YkNvbXBvbmVudHNBcnJheSgpKSk7XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgICAgdGhpcy5fb3duZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpO1xyXG5cclxuICAgICAgICAvLyBSYWlzZSBjb21wb25lbnRzIHNldHRpbmdzIGxvYWRlZCBldmVudFxyXG4gICAgICAgIHRoaXMub25Db21wb25lbnRTZXR0aW5nc0xvYWRlZCh0aGlzLCBuZXcgRXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZEFyZ3MoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGN1cnJlbnQgc3ViIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElDb21wb25lbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTdWJDb21wb25lbnRzQXJyYXkoKTogQXJyYXk8SUNvbXBvbmVudD57XHJcbiAgICAgICAgbGV0IHN1YkNvbXBvbmVudHMgPSBuZXcgQXJyYXk8SUNvbXBvbmVudD4oKTtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3N1YkNvbXBvbmVudHMpO1xyXG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBzdWJDb21wb25lbnRzLnB1c2godGhpcy5fc3ViQ29tcG9uZW50c1trZXldKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3ViQ29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHN1YiBjb21wb25lbnQgc2V0dGluZ3Mgb2YgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyBvYmplY3Qgb3IgZGVmYXVsdCBpZiBub3QgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IGNvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudERlZmluaXRpb25bXXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTdWJDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKTogQ29tcG9uZW50RGVmaW5pdGlvbltdfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgc3ViQ29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudERlZmluaXRpb25bXXx1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoY29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gQ29tcGxldGUgQ29tcG9uZW50U2V0dGluZyBvYmplY3Qgbm90IGF2YWlsYWJsZSBzbyB3ZSBoYXZlIHRvIHVzZSB0aGUgZGF0YSBhcnJheSBhbmQgdGhlIGlkIHRvIGdldCB0aGUgc3ViY29tcG9uZW50cyBkYXRhID0+IGdldFN1YkNvbXBvbmVudFNldHRpbmdzIGlzIG5vdCB3b3JraW5nIGhlcmVcclxuICAgICAgICAgICAgc3ViQ29tcG9uZW50U2V0dGluZ3MgPSAgY29tcG9uZW50U2V0dGluZ3MuZGF0YVtDb21wb25lbnRTZXR0aW5ncy5TdWJDb21wb25lbnRzU2V0dGluZ0lkXTtcclxuICAgICAgICAgICAgaWYoc3ViQ29tcG9uZW50U2V0dGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U2V0dGluZ3NEYXRhID0gdGhpcy5nZXREZWZhdWx0U2V0dGluZ3NEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkZWZhdWx0U2V0dGluZ3NEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudGx5IFN1YkNvbXBvbmVudCBhbmQgQmluZGluZyBzZXR0aW5ncyBhcmUgc3RhdGljIGFuZCB3ZXJlIG5vdCBzYXZlZCwgdGhlcmVmb3JlIHRoZSBkZWZhdWx0IHNldHRpbmdzIG11c3QgYmUgdXNlZFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YkNvbXBvbmVudFNldHRpbmdzID0gZGVmYXVsdFNldHRpbmdzRGF0YS5nZXRTdWJDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBubyBjb21wb25lbnRzIHNldHRpbmdzIGFyZSBkZWZpbmVkLCBvciBpZiBwZXJzaXN0aW5nIGlzIGRlYWN0aXZhdGVkLCBvciB2ZXJzaW9uIG9mIGNvbXBvbmVudCBzZXR0aW5ncyBpcyBub3Qgc3VwcG9ydGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50U2V0dGluZ3N9IGNvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXNlRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpOiBib29sZWFue1xyXG4gICAgICAgIGlmKGNvbXBvbmVudFNldHRpbmdzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9wZXJzaXN0RGF0YSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzQ29tcG9uZW50U3VwcG9ydGluZ1NldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgc2V0dGluZ3MgdmVyc2lvbiBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBjb21wb25lbnQgdmVyc2lvbiAoZXF1YWwgdmVyc2lvbnMgYXJlIHN1cHBvcnRlZCA9PiBvbmx5IG1ham9yIHZlcnNpb24gaXMgY2hlY2tlZClcclxuICAgICAqIG1ham9yLm1pbm9yID0+IHgueSAoZS5nKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudFNldHRpbmdzfSBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzQ29tcG9uZW50U3VwcG9ydGluZ1NldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBzcGxpdHRlZFNldHRpbmdzVmVyc2lvbiA9IGNvbXBvbmVudFNldHRpbmdzLnZlcnNpb24uc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBzcGxpdHRlZENvbXBvbmVudFZlcnNpb24gPSB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmdWZXJzaW9uTnVtYmVyID0gcGFyc2VJbnQoc3BsaXR0ZWRTZXR0aW5nc1ZlcnNpb25bMF0sIDEwKTtcclxuICAgICAgICBsZXQgc2V0dGluZ0NvbXBvbmVudE51bWJlciA9IHBhcnNlSW50KHNwbGl0dGVkQ29tcG9uZW50VmVyc2lvblswXSwgMTApO1xyXG4gICAgICAgIC8vIEN1cnJlbnRseSBvbmx5IGVxdWFsIHZlcnNpb25zIGFyZSBhbGxvd2VkXHJcbiAgICAgICAgaWYoc2V0dGluZ1ZlcnNpb25OdW1iZXIgPT0gc2V0dGluZ0NvbXBvbmVudE51bWJlcil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgdG8gdGhlIGRlZmF1bHQgc2V0dGluZ3MgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpe1xyXG4gICAgICAgIC8vIElzIGEgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgaWQgZGVmaW5pZWRcclxuICAgICAgICBpZih0aGlzLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgLy8gSXMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBkZWZpbmVkXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2RlZmF1bHREZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzID0gdGhpcy5fZGVmYXVsdERlZmluaXRpb24uZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZGVmYXVsdCBwZXJzaXN0aW5nIGRlZmluaXRpb24gdG8gdGhlIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblRvUHJvdmlkZXIodGhpcy5kZWZhdWx0U2V0dGluZ3NEYXRhSWQsIGRlZmF1bHRDb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBhZGRpaW9uYWwgZGVmaW5lZCBkZWZhdWx0IGRlZmluaXRpb25zIHdoaWNoIGFyZSBkZWZpbmVkIGluIHRoZSBkZWZhdWx0RGVmaW5pdG9uIHRvIHRoZSBkZWZhdWx0RGVmaW5pdGlvblByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkQWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpe1xyXG4gICAgICAgIGlmKHRoaXMuX2RlZmF1bHREZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzUGFja2FnZXMgPSB0aGlzLl9kZWZhdWx0RGVmaW5pdGlvbi5nZXRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIGlmKGFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NQYWNrYWdlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1BhY2thZ2VzLmZvckVhY2goc2V0dGluZ3NQYWNrYWdlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uVG9Qcm92aWRlcihzZXR0aW5nc1BhY2thZ2UuaWQsIHNldHRpbmdzUGFja2FnZS5kZWZhdWx0U2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyB0byB0aGUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXIoVE9ETzogc2hvdWxkIGJlIGEgc2VwZXJhdGVkIGRlZmF1bHQgY29tcG9uZW50U2V0dGluZ3MgcHJvdmlkZXIpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uVG9Qcm92aWRlcihpZDogc3RyaW5nLCBzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3Mpe1xyXG4gICAgICAgIGlmKHNldHRpbmdzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBhdmFpbGFibGUgZm9yIGlkOiBcIiArIGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERlZmF1bHREYXRhV2l0aElkKGlkLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgYWRkU3ViQ29tcG9uZW50KHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZywgZGVmYXVsdFNldHRpbmdzRGF0YUlkOiBzdHJpbmcgPSBcIlwiLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IElDb21wb25lbnR8dW5kZWZpbmVke1xyXG4gICAgICAgIC8vIE9ubHkgYWRkIGR5bmFtaWMgc3ViIGNvbXBvbmVudHMgdG8gY29tcG9uZW50IHNldHRpbmdzIGlmIHRoZXkgc2hvdWxkIGJlIHBlcnNpc3RlZFxyXG4gICAgICAgIC8vIHRoaXMuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKS5hZGRTdWJDb21wb25lbnQodHlwZSwgaWQsIGRlZmF1bHRJbnN0YW5jZURhdGFJZCk7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcy5jcmVhdGVDb21wb25lbnRJbnN0YW5jZShuZXcgQ29tcG9uZW50RGVmaW5pdGlvbih0eXBlLCBpZCwgZGVmYXVsdFNldHRpbmdzRGF0YUlkKSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYoaW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fc3ViQ29tcG9uZW50c1tpbnN0YW5jZS5jb21wb25lbnQuX2RlZmluaXRpb24uaWRdID0gaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgc3ViY29tcG9uZW50IGZvciB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zIHtJQ29tcG9uZW50fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YkNvbXBvbmVudChpZDogc3RyaW5nKTogSUNvbXBvbmVudHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViQ29tcG9uZW50c1tpZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJpbmRpbmdzRGF0YSgpe1xyXG4gICAgICAgIC8vIFNldCBiaW5kaW5ncyBuZWVkZWQgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IGJpbmRpbmdzID0gdGhpcy5nZXRTZXR0aW5nKENvbXBvbmVudFNldHRpbmdzLkJpbmRpbmdzU2V0dGluZ0lkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJpbmRpbmdzKGJpbmRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbi50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbi50eXBlID0gdmFsdWU7XHJcbiAgICAgICAgLy8gQWRkaXRpb25hbHkgc2V0IHR5cGUgaW4gY29tcG9uZW50U2V0dGluZ3NcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy50eXBlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLmlkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uLmlkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0U2V0dGluZ3NEYXRhIGlkICh0aGUgY29tcG9uZW50IHVzZXMgdGhpcyBkYXRhIGF0IHN0YXJ0dXAgaWYgbm8gcGVyc2l0ZWQgZGF0YSBpcyBhdmFpbGFibGUgZm9yIHRoaXMgY29tcG9uZW50KVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRTZXR0aW5nc0RhdGFJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlZmF1bHRTZXR0aW5nc0RhdGFpZCAodGhlIGNvbXBvbmVudCB1c2VzIHRoaXMgZGF0YSBhdCBzdGFydHVwIGlmIG5vIHBlcnNpdGVkIGRhdGEgaXMgYXZhaWxhYmxlIGZvciB0aGlzIGNvbXBvbmVudClcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRTZXR0aW5nc0RhdGFJZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldERlZmF1bHREZWZpbml0aW9uKHZhbHVlOiBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb258dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYodmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSB2YWx1ZS5kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kZWZhdWx0RGVmaW5pdGlvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmcgZm9yIHRoZSBnaXZlbiBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7KGFueXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNldHRpbmcoa2V5OiBzdHJpbmcpOiBhbnl8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBzZXR0aW5nID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbXBvbmVudFNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNldHRpbmcgPSB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5nZXRWYWx1ZShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2V0dGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYSBuZXcgc2V0dGluZyB3aXRoIHRoZSBnaXZlbiBrZXkgYW5kIHZhbHVlIHRvIHRoZSBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTZXR0aW5nKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KXtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5zZXRWYWx1ZShrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudFNldHRpbmdzIG5vdCBhdmFpbGFibGUgZm9yIHNldHRpbmcgZGF0YSFcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb29tcG9uZW50RGVmaW5pdGlvbiBvZiB0aGlzIGNvbXBvbmVudCh0eXBlLCBpZCwgZGVmYXVsdERhdGFJZClcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50RGVmaW5pdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZpbml0aW9uKCk6IENvbXBvbmVudERlZmluaXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29tcG9uZW50RGVmaW5pdGlvbiBvZiB0aGlzIGNvbXBvbmVudCh0eXBlLCBpZCwgZGVmYXVsdERhdGFJZClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudERlZmluaXRpb259IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGVmaW5pdGlvbih2YWx1ZTogQ29tcG9uZW50RGVmaW5pdGlvbikge1xyXG4gICAgICAgIGxldCBkZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSB0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZmluaXRpb24uZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gZGVmYXVsdFNldHRpbmdzRGF0YUlkOyAvLyBVc2Ugb2xkIHNldHRpbmdzIGRhdGEgaWQgaWYgbm90IGRlZmluZWQgaW4gdGhlIG5ldyBvbmVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IHR5cGUgYWxzbyB0byB0aGUgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2V0dGluZ3MudHlwZSA9IHRoaXMuX2RlZmluaXRpb24udHlwZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGNvbXBvbmVudHMgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQgZGVmaW5pdGlvbnMgYW5kIGFkZCB0aGVtIHRvIHRoZSBzdWIgY29tcG9uZW50cyBsaXN0IG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDb21wb25lbnREZWZpbml0aW9uPn0gY29tcG9uZW50RGVmaW5pdGlvbnNcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlU3ViQ29tcG9uZW50cyhjb21wb25lbnREZWZpbml0aW9uczogQXJyYXk8Q29tcG9uZW50RGVmaW5pdGlvbj58dW5kZWZpbmVkKXtcclxuXHRcdGlmKGNvbXBvbmVudERlZmluaXRpb25zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudERlZmluaXRpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnREZWYgPSBjb21wb25lbnREZWZpbml0aW9uc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudEluc3RhbmNlKGNvbXBvbmVudERlZiwgdGhpcy5jb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmKGluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ViQ29tcG9uZW50c1tpbnN0YW5jZS5jb21wb25lbnQuX2RlZmluaXRpb24uaWRdID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNvbXBvbmVudCBpbnN0YW5jZSB3aXRoIHRoZSBnaXZlbiBjb21wb25lbnQgZGVmaW5pdGlvbiBpZiB0aGUgY29tcG9uZW50IGZhY3RvcnkgaXMgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50RGVmaW5pdGlvbn0gY29tcG9uZW50RGVmXHJcbiAgICAgKiBAcmV0dXJucyB7KElDb21wb25lbnR8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UoY29tcG9uZW50RGVmOiBDb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCk6IElDb21wb25lbnR8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbXBvbmVudEZhY3RvcnkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGluc3RhbmNlOiBJQ29tcG9uZW50fHVuZGVmaW5lZCA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnkuY3JlYXRlKGNvbXBvbmVudERlZiwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmKGluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudEZhY3Rvcnkgbm90IGF2YWlsYWJsZSFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiaW5kaW5ncyBhbiBiaW5kcyB0aGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDb21wb25lbnRCaW5kaW5nPn0gYmluZGluZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQmluZGluZ3MoYmluZGluZ3M6IEFycmF5PENvbXBvbmVudEJpbmRpbmc+KXtcclxuXHRcdGlmKGJpbmRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBiaW5kaW5nID0gYmluZGluZ3NbaV07XHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbmV3IGJpbmRpbmcgZm9yIHRoaXMgY29tcG9uZW50IChiaW5kaW5nIGNvbXBvbmVudCA9IHRoaXMub3duZXIgPT4gZS5nLiB3aWRnZXQsIGRhdGFtb2RlbCwgLi4uKVxyXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuY3JlYXRlKGJpbmRpbmcudHlwZSwgYmluZGluZy5kYXRhVHlwZSwgdGhpcy5fb3duZXIsIGJpbmRpbmcuc2NvcGUsIGJpbmRpbmcuaWQsIGJpbmRpbmcudGFyZ2V0S2V5LCBiaW5kaW5nLnNvdXJjZUtleSk7XHJcbiAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZGF0YSB3aGljaCBzaG91bGQgYmUgdXNlZCBmb3IgZGVmYXVsdCBzdGFydHVwIG9mIHRoaXMgY29tcG9uZW50IG9yIHVuZGVmaW5lZCBpZiBub3QgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdFNldHRpbmdzRGF0YSgpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQge1xyXG4gICAgICAgIGlmKHRoaXMuX2RlZmluaXRpb24uZGVmYXVsdFNldHRpbmdzRGF0YUlkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldERlZmF1bHREYXRhV2l0aElkKHRoaXMuX2RlZmluaXRpb24uZGVmYXVsdFNldHRpbmdzRGF0YUlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0gXHJcbn0iXX0=
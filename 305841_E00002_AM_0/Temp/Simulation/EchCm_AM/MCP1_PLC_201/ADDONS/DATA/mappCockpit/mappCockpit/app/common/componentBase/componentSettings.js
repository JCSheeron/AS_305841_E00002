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
define(["require", "exports", "../../common/componentFactory/componentDefinition", "../../framework/componentHub/bindings/componentBinding", "../persistence/settings"], function (require, exports, componentDefinition_1, componentBinding_1, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentSettings = /** @class */ (function (_super) {
        __extends(ComponentSettings, _super);
        /**
         * Creates an instance of ComponentSettings
         * @memberof ComponentSettings
         */
        function ComponentSettings() {
            return _super.call(this, "") || this;
        }
        /**
         * Sets the given component settings information to this component settings
         *
         * @param {(ISettings|undefined)} settings
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.setSettings = function (settings) {
            if (settings != undefined) {
                if (settings.type != "") {
                    this.type = settings.type;
                }
                this.version = settings.version;
                this.data = settings.data;
            }
        };
        ComponentSettings.prototype.getSettings = function (onlyModified) {
            var _this = this;
            if (onlyModified === void 0) { onlyModified = false; }
            if (onlyModified) {
                var onlyModifiedSettings_1 = new ComponentSettings();
                onlyModifiedSettings_1.type = this.type;
                onlyModifiedSettings_1.version = this.version;
                var keys = Object.keys(this.data);
                keys.forEach(function (key) {
                    // TODO: compare with default settings
                    // Currently SubComponent and Binding settings are static und must not be saved(or returned with getSettings)
                    if (key != ComponentSettings.SubComponentsSettingId && key != ComponentSettings.BindingsSettingId) {
                        var data = _this.data[key];
                        onlyModifiedSettings_1.setValue(key, data);
                    }
                });
                return onlyModifiedSettings_1;
            }
            else {
                return this;
            }
        };
        /**
         * Adds a new (sub) component to this component settings
         *
         * @param {string} type
         * @param {string} id
         * @param {string} [defaultInstanceDataId=""]
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.addSubComponent = function (type, id, defaultInstanceDataId) {
            if (defaultInstanceDataId === void 0) { defaultInstanceDataId = ""; }
            var addComponentData = false;
            // Find components data
            var components = this.getSubComponentSettings();
            if (components == undefined) {
                // Create components data
                components = new Array();
                addComponentData = true;
            }
            // Add component to sub components list
            components.push(new componentDefinition_1.ComponentDefinition(type, id, defaultInstanceDataId));
            if (addComponentData == true) {
                this.setValue(ComponentSettings.SubComponentsSettingId, components);
            }
        };
        /**
         * Adds a new binding to this component settings
         *
         * @param {BindingType} type
         * @param {TConnectionDataType} dataType
         * @param {string} scope
         * @param {string} id
         * @param {string} targetKey
         * @param {string} sourceKey
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.addBinding = function (type, dataType, scope, id, targetKey, sourceKey) {
            var addBindingsData = false;
            // Find bindings data
            var bindings = this.getValue(ComponentSettings.BindingsSettingId);
            if (bindings == undefined) {
                // Create binding data
                bindings = new Array();
                addBindingsData = true;
            }
            // Add binding to bindings data
            var binding = new componentBinding_1.ComponentBinding();
            binding.type = type;
            binding.dataType = dataType;
            //binding.component = undefined;
            binding.scope = scope;
            binding.id = id;
            binding.targetKey = targetKey;
            binding.sourceKey = sourceKey;
            bindings.push(binding);
            if (addBindingsData == true) {
                // add bindings data to this widget base data
                this.setValue(ComponentSettings.BindingsSettingId, bindings);
            }
        };
        ComponentSettings.prototype.getSubComponentSettings = function () {
            return this.getValue(ComponentSettings.SubComponentsSettingId);
        };
        ComponentSettings.prototype.setSubComponentSettings = function (subComponentSettings) {
            this.setValue(ComponentSettings.SubComponentsSettingId, subComponentSettings);
        };
        ComponentSettings.prototype.getBindingSettings = function () {
            return this.getValue(ComponentSettings.BindingsSettingId);
        };
        ComponentSettings.prototype.setBindingSettings = function (subComponentSettings) {
            this.setValue(ComponentSettings.BindingsSettingId, subComponentSettings);
        };
        ComponentSettings.SubComponentsSettingId = "subComponents";
        ComponentSettings.BindingsSettingId = "bindings";
        return ComponentSettings;
    }(settings_1.Settings));
    exports.ComponentSettings = ComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50U2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQTtRQUF1QyxxQ0FBUTtRQUkzQzs7O1dBR0c7UUFDSDttQkFDSSxrQkFBTSxFQUFFLENBQUM7UUFDYixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBVyxHQUFYLFVBQVksUUFBNkI7WUFDckMsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixJQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQzdCO2dCQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQzdCO1FBQ0wsQ0FBQztRQUVELHVDQUFXLEdBQVgsVUFBWSxZQUE2QjtZQUF6QyxpQkFvQkM7WUFwQlcsNkJBQUEsRUFBQSxvQkFBNkI7WUFDckMsSUFBRyxZQUFZLEVBQUM7Z0JBQ1osSUFBSSxzQkFBb0IsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ25ELHNCQUFvQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxzQkFBb0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFFNUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUNaLHNDQUFzQztvQkFDdEMsNkdBQTZHO29CQUM3RyxJQUFHLEdBQUcsSUFB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QUFRLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsOENBQWtCLEdBQWxCLFVBQW1CLG9CQUE2QztZQUM1RCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDN0UsQ0FBQztRQTVIc0Isd0NBQXNCLEdBQUcsZUFBZSxDQUFDO1FBQ3pDLG1DQUFpQixHQUFHLFVBQVUsQ0FBQztRQTRIMUQsd0JBQUM7S0FBQSxBQTlIRCxDQUF1QyxtQkFBUSxHQThIOUM7SUE5SFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlLCBDb21wb25lbnRCaW5kaW5nIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5pbXBvcnQgeyBUQ29ubmVjdGlvbkRhdGFUeXBlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvY29tbW9uL2NvbW1vblR5cGVzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBTZXR0aW5nc3tcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU3ViQ29tcG9uZW50c1NldHRpbmdJZCA9IFwic3ViQ29tcG9uZW50c1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBCaW5kaW5nc1NldHRpbmdJZCA9IFwiYmluZGluZ3NcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKFwiXCIpOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIGNvbXBvbmVudCBzZXR0aW5ncyBpbmZvcm1hdGlvbiB0byB0aGlzIGNvbXBvbmVudCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KElTZXR0aW5nc3x1bmRlZmluZWQpfSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBJU2V0dGluZ3N8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZihzZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihzZXR0aW5ncy50eXBlICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gc2V0dGluZ3MudHlwZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb24gPSBzZXR0aW5ncy52ZXJzaW9uO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBzZXR0aW5ncy5kYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgICAgIGlmKG9ubHlNb2RpZmllZCl7XHJcbiAgICAgICAgICAgIGxldCBvbmx5TW9kaWZpZWRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICBvbmx5TW9kaWZpZWRTZXR0aW5ncy50eXBlID0gdGhpcy50eXBlO1xyXG4gICAgICAgICAgICBvbmx5TW9kaWZpZWRTZXR0aW5ncy52ZXJzaW9uID0gdGhpcy52ZXJzaW9uO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YSlcclxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjb21wYXJlIHdpdGggZGVmYXVsdCBzZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgLy8gQ3VycmVudGx5IFN1YkNvbXBvbmVudCBhbmQgQmluZGluZyBzZXR0aW5ncyBhcmUgc3RhdGljIHVuZCBtdXN0IG5vdCBiZSBzYXZlZChvciByZXR1cm5lZCB3aXRoIGdldFNldHRpbmdzKVxyXG4gICAgICAgICAgICAgICAgaWYoa2V5ICE9IENvbXBvbmVudFNldHRpbmdzLlN1YkNvbXBvbmVudHNTZXR0aW5nSWQgJiYga2V5ICE9IENvbXBvbmVudFNldHRpbmdzLkJpbmRpbmdzU2V0dGluZ0lkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ubHlNb2RpZmllZFNldHRpbmdzLnNldFZhbHVlKGtleSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gb25seU1vZGlmaWVkU2V0dGluZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyAoc3ViKSBjb21wb25lbnQgdG8gdGhpcyBjb21wb25lbnQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2RlZmF1bHRJbnN0YW5jZURhdGFJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGFkZFN1YkNvbXBvbmVudCh0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGRlZmF1bHRJbnN0YW5jZURhdGFJZDogc3RyaW5nID0gXCJcIil7XHJcbiAgICAgICAgbGV0IGFkZENvbXBvbmVudERhdGEgPSBmYWxzZTtcclxuICAgICAgICAvLyBGaW5kIGNvbXBvbmVudHMgZGF0YVxyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gdGhpcy5nZXRTdWJDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGlmKGNvbXBvbmVudHMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbXBvbmVudHMgZGF0YVxyXG4gICAgICAgICAgICBjb21wb25lbnRzID0gbmV3IEFycmF5PENvbXBvbmVudERlZmluaXRpb24+KCk7XHJcbiAgICAgICAgICAgIGFkZENvbXBvbmVudERhdGEgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgY29tcG9uZW50IHRvIHN1YiBjb21wb25lbnRzIGxpc3RcclxuICAgICAgICBjb21wb25lbnRzLnB1c2gobmV3IENvbXBvbmVudERlZmluaXRpb24odHlwZSwgaWQsIGRlZmF1bHRJbnN0YW5jZURhdGFJZCkpO1xyXG4gICAgICAgIGlmKGFkZENvbXBvbmVudERhdGEgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoQ29tcG9uZW50U2V0dGluZ3MuU3ViQ29tcG9uZW50c1NldHRpbmdJZCwgY29tcG9uZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGJpbmRpbmcgdG8gdGhpcyBjb21wb25lbnQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0JpbmRpbmdUeXBlfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0ge1RDb25uZWN0aW9uRGF0YVR5cGV9IGRhdGFUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2NvcGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldEtleVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZUtleVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGFkZEJpbmRpbmcodHlwZTogQmluZGluZ1R5cGUsIGRhdGFUeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlLCBzY29wZTogc3RyaW5nLCBpZDogc3RyaW5nLCB0YXJnZXRLZXk6IHN0cmluZywgc291cmNlS2V5OiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBhZGRCaW5kaW5nc0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAvLyBGaW5kIGJpbmRpbmdzIGRhdGFcclxuICAgICAgICBsZXQgYmluZGluZ3MgPSB0aGlzLmdldFZhbHVlKENvbXBvbmVudFNldHRpbmdzLkJpbmRpbmdzU2V0dGluZ0lkKTtcclxuICAgICAgICBpZihiaW5kaW5ncyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYmluZGluZyBkYXRhXHJcbiAgICAgICAgICAgIGJpbmRpbmdzID0gbmV3IEFycmF5PENvbXBvbmVudEJpbmRpbmc+KCk7XHJcbiAgICAgICAgICAgIGFkZEJpbmRpbmdzRGF0YSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBiaW5kaW5nIHRvIGJpbmRpbmdzIGRhdGFcclxuICAgICAgICBjb25zdCBiaW5kaW5nID0gbmV3IENvbXBvbmVudEJpbmRpbmcoKTtcclxuICAgICAgICBiaW5kaW5nLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIGJpbmRpbmcuZGF0YVR5cGUgPSBkYXRhVHlwZTtcclxuICAgICAgICAvL2JpbmRpbmcuY29tcG9uZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJpbmRpbmcuc2NvcGUgPSBzY29wZTtcclxuICAgICAgICBiaW5kaW5nLmlkID0gaWQ7XHJcbiAgICAgICAgYmluZGluZy50YXJnZXRLZXkgPSB0YXJnZXRLZXk7XHJcbiAgICAgICAgYmluZGluZy5zb3VyY2VLZXkgPSBzb3VyY2VLZXk7XHJcbiBcclxuICAgICAgICBiaW5kaW5ncy5wdXNoKGJpbmRpbmcpO1xyXG4gICAgICAgIGlmKGFkZEJpbmRpbmdzRGF0YSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgLy8gYWRkIGJpbmRpbmdzIGRhdGEgdG8gdGhpcyB3aWRnZXQgYmFzZSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoQ29tcG9uZW50U2V0dGluZ3MuQmluZGluZ3NTZXR0aW5nSWQsIGJpbmRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3ViQ29tcG9uZW50U2V0dGluZ3MoKTogIEFycmF5PENvbXBvbmVudERlZmluaXRpb24+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlKENvbXBvbmVudFNldHRpbmdzLlN1YkNvbXBvbmVudHNTZXR0aW5nSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN1YkNvbXBvbmVudFNldHRpbmdzKHN1YkNvbXBvbmVudFNldHRpbmdzOiAgQXJyYXk8Q29tcG9uZW50RGVmaW5pdGlvbj4pe1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoQ29tcG9uZW50U2V0dGluZ3MuU3ViQ29tcG9uZW50c1NldHRpbmdJZCwgc3ViQ29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJpbmRpbmdTZXR0aW5ncygpOiBBcnJheTxDb21wb25lbnRCaW5kaW5nPntcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZShDb21wb25lbnRTZXR0aW5ncy5CaW5kaW5nc1NldHRpbmdJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QmluZGluZ1NldHRpbmdzKHN1YkNvbXBvbmVudFNldHRpbmdzOiBBcnJheTxDb21wb25lbnRCaW5kaW5nPil7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZShDb21wb25lbnRTZXR0aW5ncy5CaW5kaW5nc1NldHRpbmdJZCwgc3ViQ29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgfVxyXG59Il19
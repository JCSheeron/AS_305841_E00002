define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefinition = /** @class */ (function () {
        /**
         * Creates an instance of ComponentDefinition
         * @param {string} type
         * @param {string} id
         * @param {string} [defaultSettingsDataId=""]
         * @memberof ComponentDefinition
         */
        function ComponentDefinition(type, id, defaultSettingsDataId) {
            if (defaultSettingsDataId === void 0) { defaultSettingsDataId = ""; }
            /**
             * Id where to find the default setting data for this component
             *
             * @type {string}
             * @memberof ComponentDefinition
             */
            this.defaultSettingsDataId = "";
            this.type = type;
            this.id = id;
            this.defaultSettingsDataId = defaultSettingsDataId;
        }
        /**
         * Sets the given componentDefinition to this componentDefinition
         *
         * @param {ComponentDefinition} componentDefinition
         * @memberof ComponentDefinition
         */
        ComponentDefinition.prototype.set = function (componentDefinition) {
            this.type = componentDefinition.type;
            this.id = componentDefinition.id;
            this.defaultSettingsDataId = componentDefinition.defaultSettingsDataId;
        };
        return ComponentDefinition;
    }());
    exports.ComponentDefinition = ComponentDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQXlCSTs7Ozs7O1dBTUc7UUFDSCw2QkFBWSxJQUFZLEVBQUUsRUFBVSxFQUFFLHFCQUFrQztZQUFsQyxzQ0FBQSxFQUFBLDBCQUFrQztZQWZ4RTs7Ozs7ZUFLRztZQUNJLDBCQUFxQixHQUFXLEVBQUUsQ0FBQztZQVV0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztRQUN2RCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxpQ0FBRyxHQUFILFVBQUksbUJBQXdDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLENBQUMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQztRQUMzRSxDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQUFDLEFBakRELElBaURDO0lBakRZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZpbml0aW9ue1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgY29tcG9uZW50IChlLmcuIGNsYXNzIG5hbWUpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVW5pcXVlIGlkIG9mIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZCB3aGVyZSB0byBmaW5kIHRoZSBkZWZhdWx0IHNldHRpbmcgZGF0YSBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlZmF1bHRTZXR0aW5nc0RhdGFJZDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ29tcG9uZW50RGVmaW5pdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZWZhdWx0U2V0dGluZ3NEYXRhSWQ9XCJcIl1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZywgZGVmYXVsdFNldHRpbmdzRGF0YUlkOiBzdHJpbmcgPSBcIlwiKXtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IGRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIGNvbXBvbmVudERlZmluaXRpb24gdG8gdGhpcyBjb21wb25lbnREZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnREZWZpbml0aW9ufSBjb21wb25lbnREZWZpbml0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBzZXQoY29tcG9uZW50RGVmaW5pdGlvbjogQ29tcG9uZW50RGVmaW5pdGlvbil7XHJcbiAgICAgICAgdGhpcy50eXBlID0gY29tcG9uZW50RGVmaW5pdGlvbi50eXBlO1xyXG4gICAgICAgIHRoaXMuaWQgPSBjb21wb25lbnREZWZpbml0aW9uLmlkO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gY29tcG9uZW50RGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQ7XHJcbiAgICB9XHJcbn0iXX0=
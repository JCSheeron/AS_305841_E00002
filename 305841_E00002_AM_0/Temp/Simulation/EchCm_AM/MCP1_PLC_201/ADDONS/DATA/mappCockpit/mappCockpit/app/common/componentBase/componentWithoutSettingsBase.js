define(["require", "exports", "./componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentWithoutSettingsBase = /** @class */ (function () {
        function ComponentWithoutSettingsBase() {
        }
        ComponentWithoutSettingsBase.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        ComponentWithoutSettingsBase.prototype.getComponentSettings = function () {
            return new componentSettings_1.ComponentSettings();
        };
        ComponentWithoutSettingsBase.prototype.setComponentSettings = function (settings) {
            this.component.setComponentSettings(settings);
        };
        ComponentWithoutSettingsBase.prototype.dispose = function () {
        };
        return ComponentWithoutSettingsBase;
    }());
    exports.ComponentWithoutSettingsBase = ComponentWithoutSettingsBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50V2l0aG91dFNldHRpbmdzQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50V2l0aG91dFNldHRpbmdzQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQUFBO1FBa0JBLENBQUM7UUFmRywwREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELDJEQUFvQixHQUFwQjtZQUNJLE9BQU8sSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRCwyREFBb0IsR0FBcEIsVUFBcUIsUUFBdUM7WUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQsOENBQU8sR0FBUDtRQUVBLENBQUM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUFsQkQsSUFrQkM7SUFsQlksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY29tcG9uZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gXCIuL2NvbXBvbmVudEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRXaXRob3V0U2V0dGluZ3NCYXNlIGltcGxlbWVudHMgSUNvbXBvbmVudHtcclxuICAgIGNvbXBvbmVudCE6IENvbXBvbmVudEJhc2U7IFxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3MgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG5cclxuICAgIH1cclxufSJdfQ==
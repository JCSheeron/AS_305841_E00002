define(["require", "exports", "../../common/persistence/settings"], function (require, exports, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LayoutPane = /** @class */ (function () {
        function LayoutPane(name, size, widget, fillSpace, resizable, expandable, collapsible, minimumSize) {
            if (fillSpace === void 0) { fillSpace = false; }
            if (resizable === void 0) { resizable = false; }
            if (expandable === void 0) { expandable = false; }
            if (collapsible === void 0) { collapsible = false; }
            if (minimumSize === void 0) { minimumSize = 0; }
            this.name = "";
            this.name = name;
            this.size = size;
            this.expandable = expandable;
            this.collapsible = collapsible;
            this.fillSpace = fillSpace;
            this.resizable = resizable;
            this.minimumSize = minimumSize;
            this.widget = widget;
        }
        LayoutPane.prototype.getSettings = function () {
            return LayoutPane.getFormatedSettings(this.size, this.expandable, this.collapsible, this.fillSpace, this.resizable, this.minimumSize);
        };
        LayoutPane.getFormatedSettings = function (size, expandable, collapsible, fillSpace, resizable, minimumSize) {
            var settings = new settings_1.Settings("LayoutPane");
            settings.setValue("size", size);
            settings.setValue("expandable", expandable);
            settings.setValue("collapsible", collapsible);
            settings.setValue("fillSpace", fillSpace);
            settings.setValue("resizable", resizable);
            settings.setValue("minimumSize", minimumSize);
            return settings;
        };
        LayoutPane.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.size = settingsObj.getValue("size");
            this.expandable = settingsObj.getValue("expandable");
            this.collapsible = settingsObj.getValue("collapsible");
            this.fillSpace = settingsObj.getValue("fillSpace");
            this.resizable = settingsObj.getValue("resizable");
            this.minimumSize = settingsObj.getValue("minimumSize");
        };
        return LayoutPane;
    }());
    exports.LayoutPane = LayoutPane;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0UGFuZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zcGxpdHRlcldpZGdldC9sYXlvdXRQYW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBV0ksb0JBQVksSUFBWSxFQUFFLElBQVksRUFBRSxNQUFlLEVBQUUsU0FBaUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCLEVBQUUsV0FBbUIsRUFBRSxXQUFlO1lBQTlGLDBCQUFBLEVBQUEsaUJBQWlCO1lBQUUsMEJBQUEsRUFBQSxpQkFBaUI7WUFBRSwyQkFBQSxFQUFBLGtCQUFrQjtZQUFFLDRCQUFBLEVBQUEsbUJBQW1CO1lBQUUsNEJBQUEsRUFBQSxlQUFlO1lBVnZKLFNBQUksR0FBRyxFQUFFLENBQUM7WUFXTixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUUvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDO1FBRU0sZ0NBQVcsR0FBbEI7WUFDSSxPQUFPLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFJLENBQUM7UUFFYSw4QkFBbUIsR0FBakMsVUFBa0MsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXO1lBQzlGLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM1QyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM5QyxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRU0sZ0NBQVcsR0FBbEIsVUFBbUIsUUFBbUI7WUFDbEMsSUFBSSxXQUFXLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVMLGlCQUFDO0lBQUQsQ0FBQyxBQWhERCxJQWdEQztJQUVPLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxheW91dFBhbmUgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2xheW91dFBhbmVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5cclxuY2xhc3MgTGF5b3V0UGFuZSBpbXBsZW1lbnRzIElMYXlvdXRQYW5lIHtcclxuICAgIG5hbWUgPSBcIlwiO1xyXG4gICAgc2l6ZTtcclxuICAgIGV4cGFuZGFibGU7XHJcbiAgICBjb2xsYXBzaWJsZTtcclxuICAgIGZpbGxTcGFjZTtcclxuICAgIHJlc2l6YWJsZTtcclxuICAgIG1pbmltdW1TaXplO1xyXG5cclxuICAgIHdpZGdldDogSVdpZGdldDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgd2lkZ2V0OiBJV2lkZ2V0LCBmaWxsU3BhY2UgPSBmYWxzZSwgcmVzaXphYmxlID0gZmFsc2UsIGV4cGFuZGFibGUgPSBmYWxzZSwgY29sbGFwc2libGUgPSBmYWxzZSwgbWluaW11bVNpemUgPSAwKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5leHBhbmRhYmxlID0gZXhwYW5kYWJsZTtcclxuICAgICAgICB0aGlzLmNvbGxhcHNpYmxlID0gY29sbGFwc2libGU7XHJcbiAgICAgICAgdGhpcy5maWxsU3BhY2UgPSBmaWxsU3BhY2U7XHJcbiAgICAgICAgdGhpcy5yZXNpemFibGUgPSByZXNpemFibGU7XHJcbiAgICAgICAgdGhpcy5taW5pbXVtU2l6ZSA9IG1pbmltdW1TaXplO1xyXG5cclxuICAgICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2V0dGluZ3MoKTogSVNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiBMYXlvdXRQYW5lLmdldEZvcm1hdGVkU2V0dGluZ3ModGhpcy5zaXplLCB0aGlzLmV4cGFuZGFibGUsIHRoaXMuY29sbGFwc2libGUsIHRoaXMuZmlsbFNwYWNlLCB0aGlzLnJlc2l6YWJsZSwgdGhpcy5taW5pbXVtU2l6ZSk7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEZvcm1hdGVkU2V0dGluZ3Moc2l6ZSwgZXhwYW5kYWJsZSwgY29sbGFwc2libGUsIGZpbGxTcGFjZSwgcmVzaXphYmxlLCBtaW5pbXVtU2l6ZSk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoXCJMYXlvdXRQYW5lXCIpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwic2l6ZVwiLCBzaXplKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShcImV4cGFuZGFibGVcIiwgZXhwYW5kYWJsZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoXCJjb2xsYXBzaWJsZVwiLCBjb2xsYXBzaWJsZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoXCJmaWxsU3BhY2VcIiwgZmlsbFNwYWNlKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShcInJlc2l6YWJsZVwiLCByZXNpemFibGUpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwibWluaW11bVNpemVcIiwgbWluaW11bVNpemUpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncyl7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnNpemUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShcInNpemVcIik7XHJcbiAgICAgICAgdGhpcy5leHBhbmRhYmxlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoXCJleHBhbmRhYmxlXCIpO1xyXG4gICAgICAgIHRoaXMuY29sbGFwc2libGUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShcImNvbGxhcHNpYmxlXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsbFNwYWNlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoXCJmaWxsU3BhY2VcIik7XHJcbiAgICAgICAgdGhpcy5yZXNpemFibGUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShcInJlc2l6YWJsZVwiKTtcclxuICAgICAgICB0aGlzLm1pbmltdW1TaXplID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoXCJtaW5pbXVtU2l6ZVwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7TGF5b3V0UGFuZX07Il19
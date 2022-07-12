define(["require", "exports", "../../../common/persistence/settings", "./calculationDataInfoSettingIds"], function (require, exports, settings_1, calculationDataInfoSettingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationDataInfo = /** @class */ (function () {
        function CalculationDataInfo(uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            this.inputSeriesIds = [];
            this._uniqueId = uniqueId;
            this._inputData = [];
            this._inputDataValues = [];
            this._inputDataIds = [];
            this._type = "";
        }
        Object.defineProperty(CalculationDataInfo.prototype, "uniqueId", {
            get: function () {
                return this._uniqueId;
            },
            enumerable: true,
            configurable: true
        });
        CalculationDataInfo.prototype.getSettings = function () {
            var settings = new settings_1.Settings("CalculationDataInfo");
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.Type, this.type);
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues, this.inputDataValues);
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataIds, this.inputDataIds);
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId, this.uniqueId);
            return settings;
        };
        CalculationDataInfo.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.type = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.Type);
            this.inputDataValues = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues);
            this.inputDataIds = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.InputDataIds);
            if (this.inputDataIds == undefined) {
                this.inputDataIds = new Array();
            }
            this._uniqueId = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId);
        };
        Object.defineProperty(CalculationDataInfo.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationDataInfo.prototype, "inputData", {
            get: function () {
                return this._inputData;
            },
            set: function (inputData) {
                this._inputData = inputData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationDataInfo.prototype, "inputDataValues", {
            get: function () {
                return this._inputDataValues;
            },
            set: function (value) {
                this._inputDataValues = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationDataInfo.prototype, "inputDataIds", {
            get: function () {
                return this._inputDataIds;
            },
            set: function (value) {
                this._inputDataIds = value;
            },
            enumerable: true,
            configurable: true
        });
        return CalculationDataInfo;
    }());
    exports.CalculationDataInfo = CalculationDataInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQThDSSw2QkFBWSxRQUFtQjtZQUFuQix5QkFBQSxFQUFBLGFBQW1CO1lBdEN4QixtQkFBYyxHQUE0QixFQUFFLENBQUM7WUF1Q2hELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQWhERCxzQkFBVyx5Q0FBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBZ0RELHlDQUFXLEdBQVg7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLDBDQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLDBDQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsUUFBUSxDQUFDLDBDQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RCxRQUFRLENBQUMsUUFBUSxDQUFDLDBDQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQseUNBQVcsR0FBWCxVQUFZLFFBQW1CO1lBQzNCLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xFLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTLEVBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQzthQUMzQztZQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxzQkFBSSxxQ0FBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFFRCxVQUFTLElBQVk7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7OztXQUpBO1FBTUQsc0JBQUksMENBQVM7aUJBQWI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBYyxTQUF1QztnQkFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDaEMsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBSSxnREFBZTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsQ0FBQztpQkFFRCxVQUFvQixLQUFvQjtnQkFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUNsQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLDZDQUFZO2lCQUFoQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUIsQ0FBQztpQkFFRCxVQUFpQixLQUFvQjtnQkFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDL0IsQ0FBQzs7O1dBSkE7UUFNTCwwQkFBQztJQUFELENBQUMsQUEzR0QsSUEyR0M7SUEzR1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IElTZXR0aW5nc09iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc09iamVjdEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFJbmZvU2V0dGluZ0lkc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uRGF0YUluZm8gaW1wbGVtZW50cyBJU2V0dGluZ3NPYmplY3R7XHJcblxyXG4gICAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZztcclxuICAgIFxyXG4gICAgcHVibGljIGdldCB1bmlxdWVJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91bmlxdWVJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5wdXRTZXJpZXNJZHM6IEFycmF5PHN0cmluZ3x1bmRlZmluZWQ+ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdG9yIHR5cGUgaWQoZS5nLiBhZGQsIGNvcywgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YUluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlYWxseSB1c2VkIGlucHV0IGRhdGEgb2YgdGhlIGlucHV0IHNpZ25hbCAoY291bGQgYmUgb25seSBhIHBhcnQgb2YgdGhlIG9yaWdpbmFsIHNpZ25hbCBkYXRhKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2lucHV0RGF0YTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElucHV0IGRhdGEgdmFsdWUgKG9ubHkgdGhlIG5hbWVzIG9mIHRoZSBpbnB1dCBkYXRhOyBlLmcuIHNpZ25hbG5hbWUsIGZpbHRlciBvcmRlciBudW1iZXIsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pbnB1dERhdGFWYWx1ZXM6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnB1dCBkYXRhIGlkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2lucHV0RGF0YUlkczogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1bmlxdWVJZDogc3RyaW5nPVwiXCIpe1xyXG4gICAgICAgIHRoaXMuX3VuaXF1ZUlkID0gdW5pcXVlSWQ7XHJcbiAgICAgICAgdGhpcy5faW5wdXREYXRhID0gW107XHJcbiAgICAgICAgdGhpcy5faW5wdXREYXRhVmFsdWVzID0gW107XHJcbiAgICAgICAgdGhpcy5faW5wdXREYXRhSWRzID0gW107XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiQ2FsY3VsYXRpb25EYXRhSW5mb1wiKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlR5cGUsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5JbnB1dERhdGFWYWx1ZXMsIHRoaXMuaW5wdXREYXRhVmFsdWVzKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLklucHV0RGF0YUlkcywgdGhpcy5pbnB1dERhdGFJZHMpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuVW5pcXVlSWQsIHRoaXMudW5pcXVlSWQpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5nczogSVNldHRpbmdzKSB7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlR5cGUpO1xyXG4gICAgICAgIHRoaXMuaW5wdXREYXRhVmFsdWVzID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5JbnB1dERhdGFWYWx1ZXMpO1xyXG4gICAgICAgIHRoaXMuaW5wdXREYXRhSWRzID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5JbnB1dERhdGFJZHMpO1xyXG4gICAgICAgIGlmKHRoaXMuaW5wdXREYXRhSWRzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXREYXRhSWRzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3VuaXF1ZUlkID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5VbmlxdWVJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHR5cGUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0eXBlKHR5cGU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4pe1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YSA9IGlucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW5wdXREYXRhVmFsdWVzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dERhdGFWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGlucHV0RGF0YVZhbHVlcyh2YWx1ZTogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YVZhbHVlcyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnB1dERhdGFJZHMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0RGF0YUlkcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaW5wdXREYXRhSWRzKHZhbHVlOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdGhpcy5faW5wdXREYXRhSWRzID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
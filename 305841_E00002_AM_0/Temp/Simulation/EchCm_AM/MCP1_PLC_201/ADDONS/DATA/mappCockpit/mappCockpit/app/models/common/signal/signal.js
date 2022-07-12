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
define(["require", "exports", "../../../framework/events", "./eventSignalDataChangedArgs", "../point", "../../../common/persistence/settings", "./settingIds"], function (require, exports, events_1, eventSignalDataChangedArgs_1, point_1, settings_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDataChanged = /** @class */ (function (_super) {
        __extends(EventDataChanged, _super);
        function EventDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataChanged;
    }(events_1.TypedEvent));
    ;
    var Signal = /** @class */ (function () {
        /**
         * Creates an instance of Signal.
         * @param {string} name
         * @param {Array<IPoint>} data
         * @memberof Signal
         */
        function Signal(name, data) {
            this.eventDataChanged = new EventDataChanged();
            this._name = name;
            this._rawPoints = [];
            // preserve original data points
            this.rawPoints = data;
            this.id = name + Signal.uniqueId;
            Signal.uniqueId++;
        }
        Object.defineProperty(Signal.prototype, "rawPointsValid", {
            get: function () {
                if (this._rawPoints.length < 2) {
                    return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                var oldName = this._name;
                this._name = value;
                this.onDataChanged(eventSignalDataChangedArgs_1.SignalAction.rename, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "rawPoints", {
            get: function () {
                return this._rawPoints;
            },
            set: function (points) {
                this._rawPoints = points;
                //rawPoints as Transferable Float64Array
                this._rawPoints_x = new Float64Array(this._rawPoints.length);
                this._rawPoints_y = new Float64Array(this._rawPoints.length);
                for (var i = 0; i < this._rawPoints.length; i++) {
                    this._rawPoints_x[i] = this._rawPoints[i].x;
                    this._rawPoints_y[i] = this._rawPoints[i].y;
                }
                // Raise rawPoints changed event
                this.onDataChanged(eventSignalDataChangedArgs_1.SignalAction.dataPointsChanged, this._rawPoints);
            },
            enumerable: true,
            configurable: true
        });
        Signal.prototype.getSettings = function () {
            var settings = new settings_1.Settings("Signal");
            settings.setValue(settingIds_1.SettingIds.Name, this.name);
            settings.setValue(settingIds_1.SettingIds.RawPointsX, this._rawPoints_x);
            settings.setValue(settingIds_1.SettingIds.RawPointsY, this._rawPoints_y);
            return settings;
        };
        /*getSettings(): any {
            return { name: this.name, items: this._rawPoints, items_x: this._rawPoints_x, items_y: this._rawPoints_y };
        }*/
        Signal.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.name = settingsObj.getValue(settingIds_1.SettingIds.Name);
            var signalPoints = new Array();
            var pointsX = settingsObj.getValue(settingIds_1.SettingIds.RawPointsX);
            var pointsY = settingsObj.getValue(settingIds_1.SettingIds.RawPointsY);
            pointsX = Object.values(pointsX);
            pointsY = Object.values(pointsY);
            for (var i = 0; i < pointsX.length; i++) {
                var rawPointX = pointsX[i];
                var rawPointY = pointsY[i];
                signalPoints.push(new point_1.Point(parseFloat(rawPointX), parseFloat(rawPointY)));
            }
            // preserve original data points
            this._rawPoints = signalPoints;
            this._rawPoints_x = pointsX;
            this._rawPoints_y = pointsY;
        };
        /**
         * Clones the signal
         *
         * @returns
         * @memberof Signal
         */
        Signal.prototype.clone = function () {
            var clonedSignal = new Signal(this._name, this.rawPoints);
            return clonedSignal;
        };
        /**
         * Raises the name changed event
         *
         * @private
         * @param {string} name
         * @memberof Signal
         */
        Signal.prototype.onDataChanged = function (action, data) {
            var eventArgs = new eventSignalDataChangedArgs_1.EventSignalDataChangedArgs(action, data);
            this.eventDataChanged.raise(this, eventArgs);
        };
        Signal.uniqueId = 0; // TODO use unique id (first recent data and latest have same id) => create unique id generator
        return Signal;
    }());
    exports.Signal = Signal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQStCLG9DQUErQztRQUE5RTs7UUFBZ0YsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUFqRixDQUErQixtQkFBVSxHQUF3QztJQUFBLENBQUM7SUFHbEY7UUFtREk7Ozs7O1dBS0c7UUFDSCxnQkFBWSxJQUFZLEVBQUUsSUFBbUI7WUF2RDdDLHFCQUFnQixHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUF3RHhELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBcERELHNCQUFXLGtDQUFjO2lCQUF6QjtnQkFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztvQkFDMUIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsd0JBQUk7aUJBQWY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBZ0IsS0FBYTtnQkFDekIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMseUNBQVksQ0FB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Q0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztRQUVoQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxzQkFBSyxHQUFMO1lBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUQsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDhCQUFhLEdBQXJCLFVBQXNCLE1BQW9CLEVBQUUsSUFBUztZQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLHVEQUEwQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUdqRCxDQUFDO1FBckhjLGVBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQywrRkFBK0Y7UUF1SHhJLGFBQUM7S0FBQSxBQW5JRCxJQW1JQztJQW5JWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWwgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFNpZ25hbEFjdGlvbiwgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi9ldmVudFNpZ25hbERhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcblxyXG5jbGFzcyBFdmVudERhdGFDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsLCBFdmVudFNpZ25hbERhdGFDaGFuZ2VkQXJncz57IH07XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbCBpbXBsZW1lbnRzIElTaWduYWx7XHJcbiAgICAgICAgXHJcbiAgICBldmVudERhdGFDaGFuZ2VkOiBFdmVudERhdGFDaGFuZ2VkID0gbmV3IEV2ZW50RGF0YUNoYW5nZWQoKTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfcmF3UG9pbnRzOiBJUG9pbnRbXTtcclxuXHJcbiAgICBwcml2YXRlIF9yYXdQb2ludHNfeDtcclxuICAgIHByaXZhdGUgX3Jhd1BvaW50c195O1xyXG5cclxuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHVuaXF1ZUlkOiBudW1iZXIgPSAwOyAvLyBUT0RPIHVzZSB1bmlxdWUgaWQgKGZpcnN0IHJlY2VudCBkYXRhIGFuZCBsYXRlc3QgaGF2ZSBzYW1lIGlkKSA9PiBjcmVhdGUgdW5pcXVlIGlkIGdlbmVyYXRvclxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmF3UG9pbnRzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodGhpcy5fcmF3UG9pbnRzLmxlbmd0aCA8IDIpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgb2xkTmFtZSA9IHRoaXMuX25hbWU7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTaWduYWxBY3Rpb24ucmVuYW1lLCBvbGROYW1lKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCByYXdQb2ludHMoKTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcmF3UG9pbnRzKHBvaW50czogQXJyYXk8SVBvaW50Pil7XHJcbiAgICAgICAgdGhpcy5fcmF3UG9pbnRzID0gcG9pbnRzO1xyXG5cclxuICAgICAgICAvL3Jhd1BvaW50cyBhcyBUcmFuc2ZlcmFibGUgRmxvYXQ2NEFycmF5XHJcbiAgICAgICAgdGhpcy5fcmF3UG9pbnRzX3ggPSBuZXcgRmxvYXQ2NEFycmF5KHRoaXMuX3Jhd1BvaW50cy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50c195ID0gbmV3IEZsb2F0NjRBcnJheSh0aGlzLl9yYXdQb2ludHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3Jhd1BvaW50cy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLl9yYXdQb2ludHNfeFtpXSA9IHRoaXMuX3Jhd1BvaW50c1tpXS54O1xyXG4gICAgICAgICAgICB0aGlzLl9yYXdQb2ludHNfeVtpXSA9IHRoaXMuX3Jhd1BvaW50c1tpXS55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBSYWlzZSByYXdQb2ludHMgY2hhbmdlZCBldmVudFxyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTaWduYWxBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQsIHRoaXMuX3Jhd1BvaW50cylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRhdGE6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50cyA9IFtdO1xyXG4gICAgICAgIC8vIHByZXNlcnZlIG9yaWdpbmFsIGRhdGEgcG9pbnRzXHJcbiAgICAgICAgdGhpcy5yYXdQb2ludHMgPSBkYXRhO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaWQgPSBuYW1lICsgU2lnbmFsLnVuaXF1ZUlkO1xyXG4gICAgICAgIFNpZ25hbC51bmlxdWVJZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiU2lnbmFsXCIpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuTmFtZSwgdGhpcy5uYW1lKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlJhd1BvaW50c1gsIHRoaXMuX3Jhd1BvaW50c194KTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlJhd1BvaW50c1ksIHRoaXMuX3Jhd1BvaW50c195KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qZ2V0U2V0dGluZ3MoKTogYW55IHtcclxuICAgICAgICByZXR1cm4geyBuYW1lOiB0aGlzLm5hbWUsIGl0ZW1zOiB0aGlzLl9yYXdQb2ludHMsIGl0ZW1zX3g6IHRoaXMuX3Jhd1BvaW50c194LCBpdGVtc195OiB0aGlzLl9yYXdQb2ludHNfeSB9O1xyXG4gICAgfSovXHJcblxyXG4gICAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncyl7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLk5hbWUpO1xyXG4gICAgICAgIGxldCBzaWduYWxQb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBwb2ludHNYID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5SYXdQb2ludHNYKTtcclxuICAgICAgICBsZXQgcG9pbnRzWSA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuUmF3UG9pbnRzWSk7XHJcblxyXG4gICAgICAgIHBvaW50c1ggPSBPYmplY3QudmFsdWVzKHBvaW50c1gpO1xyXG4gICAgICAgIHBvaW50c1kgPSBPYmplY3QudmFsdWVzKHBvaW50c1kpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9pbnRzWC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCByYXdQb2ludFg6IHN0cmluZyA9IHBvaW50c1hbaV07XHJcbiAgICAgICAgICAgIGxldCByYXdQb2ludFk6IHN0cmluZyA9IHBvaW50c1lbaV07XHJcblxyXG4gICAgICAgICAgICBzaWduYWxQb2ludHMucHVzaChuZXcgUG9pbnQocGFyc2VGbG9hdChyYXdQb2ludFgpLCBwYXJzZUZsb2F0KHJhd1BvaW50WSkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHByZXNlcnZlIG9yaWdpbmFsIGRhdGEgcG9pbnRzXHJcbiAgICAgICAgdGhpcy5fcmF3UG9pbnRzID0gc2lnbmFsUG9pbnRzO1xyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50c194ID0gcG9pbnRzWDtcclxuICAgICAgICB0aGlzLl9yYXdQb2ludHNfeSA9IHBvaW50c1k7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoZSBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFxyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBTaWduYWx7XHJcbiAgICAgICAgbGV0IGNsb25lZFNpZ25hbCA9IG5ldyBTaWduYWwodGhpcy5fbmFtZSwgdGhpcy5yYXdQb2ludHMpO1xyXG4gICAgICAgIHJldHVybiBjbG9uZWRTaWduYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIG5hbWUgY2hhbmdlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGF0YUNoYW5nZWQoYWN0aW9uOiBTaWduYWxBY3Rpb24sIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3MoYWN0aW9uLCBkYXRhKTtcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUNoYW5nZWQucmFpc2UodGhpcywgZXZlbnRBcmdzKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==
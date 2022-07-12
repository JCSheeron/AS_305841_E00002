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
define(["require", "exports", "./dataModelInterface"], function (require, exports, dataModelInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the base interface for observing data model items
     *
     * @class DataModelItemObserver
     * @implements {IDataModelItemObserver}
     */
    var DataModelItemObserver = /** @class */ (function () {
        function DataModelItemObserver() {
            // declare event for notifying model item changes
            this.eventModelItemsChanged = new dataModelInterface_1.EventModelChanged();
        }
        /**
         * method for invoking the observation of model items
         *
         * @param {any[]} observableItems
         * @memberof DataModelItemObserver
         */
        DataModelItemObserver.prototype.observeModelItems = function (observableItems) {
            // has to be overloaded in a concretized data model
            throw new Error("Method not implemented.");
        };
        /**
         * notification method called when model items has changed
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof DataModelItemObserver
         */
        DataModelItemObserver.prototype.onModelItemsChanged = function (sender, data) {
            // raise the model items changed event
            this.eventModelItemsChanged.raise(sender, data);
        };
        /**
         * method for handling model item changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof DataModelItemObserver
         */
        DataModelItemObserver.prototype.handleModelItemsChanged = function (sender, data) {
        };
        return DataModelItemObserver;
    }());
    exports.DataModelItemObserver = DataModelItemObserver;
    /**
     * implements the base class for data models.
     *
     * @abstract
     * @class DataModelBase
     * @implements {IDataModel}
     */
    var DataModelBase = /** @class */ (function (_super) {
        __extends(DataModelBase, _super);
        function DataModelBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // event declarations
            _this.eventModelChanged = new dataModelInterface_1.EventModelChanged();
            _this.eventModelInitialized = new dataModelInterface_1.EventModelInitialized();
            _this._isPersistEnabled = false;
            return _this;
        }
        DataModelBase.prototype.connect = function (componentName) {
        };
        DataModelBase.prototype.initialize = function () {
            this.component.loadComponentSettings();
            this.initialized();
            this._isPersistEnabled = true;
        };
        DataModelBase.prototype.initializeComponent = function () {
        };
        DataModelBase.prototype.initialized = function () {
        };
        DataModelBase.prototype.clear = function () {
        };
        DataModelBase.prototype.dispose = function () {
            this._isPersistEnabled = false;
        };
        DataModelBase.prototype.getComponentSettings = function (onlyModified) {
            return this.component.getComponentSettings(onlyModified);
        };
        DataModelBase.prototype.setComponentSettings = function (componentSettings) {
            this.component.setComponentSettings(componentSettings);
        };
        DataModelBase.prototype.saveSettings = function () {
            if (this._isPersistEnabled) {
                this.component.saveComponentSettings();
            }
        };
        Object.defineProperty(DataModelBase.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (data) {
                this._data = data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataModelBase.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (dataSource) {
                this._dataSource = dataSource;
            },
            enumerable: true,
            configurable: true
        });
        DataModelBase.prototype.onModelChanged = function (sender, data) {
            this.eventModelChanged.raise(sender, data);
            this.saveSettings();
        };
        DataModelBase.prototype.onModelInitialized = function (sender, data) {
            this.eventModelInitialized.raise(sender, data);
        };
        DataModelBase.prototype.handleModelChanged = function (sender, data) { };
        return DataModelBase;
    }(DataModelItemObserver));
    exports.DataModelBase = DataModelBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1vZGVsQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RhdGFNb2RlbEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFBQTtZQUVJLGlEQUFpRDtZQUNqRCwyQkFBc0IsR0FBMkIsSUFBSSxzQ0FBaUIsRUFBRSxDQUFDO1FBbUM3RSxDQUFDO1FBakNHOzs7OztXQUtHO1FBQ0gsaURBQWlCLEdBQWpCLFVBQWtCLGVBQXNCO1lBQ3BDLG1EQUFtRDtZQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILG1EQUFtQixHQUFuQixVQUFvQixNQUFrQixFQUFFLElBQTJCO1lBQy9ELHNDQUFzQztZQUN0QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsdURBQXVCLEdBQXZCLFVBQXdCLE1BQWtCLEVBQUUsSUFBMkI7UUFFdkUsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXRDRCxJQXNDQztJQTRGdUIsc0RBQXFCO0lBekY3Qzs7Ozs7O09BTUc7SUFDSDtRQUFxQyxpQ0FBcUI7UUFBMUQ7WUFBQSxxRUFnRkM7WUE5RUcscUJBQXFCO1lBQ3JCLHVCQUFpQixHQUFzQixJQUFJLHNDQUFpQixFQUFFLENBQUM7WUFDL0QsMkJBQXFCLEdBQTBCLElBQUksMENBQXFCLEVBQUUsQ0FBQztZQUdqRSx1QkFBaUIsR0FBWSxLQUFLLENBQUM7O1FBeUVqRCxDQUFDO1FBdkVHLCtCQUFPLEdBQVAsVUFBUSxhQUFxQjtRQUU3QixDQUFDO1FBS0Qsa0NBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBRUQsMkNBQW1CLEdBQW5CO1FBRUEsQ0FBQztRQUVELG1DQUFXLEdBQVg7UUFFQSxDQUFDO1FBRUQsNkJBQUssR0FBTDtRQUVBLENBQUM7UUFFRCwrQkFBTyxHQUFQO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUNuQyxDQUFDO1FBRUQsNENBQW9CLEdBQXBCLFVBQXFCLFlBQXFCO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRUQsNENBQW9CLEdBQXBCLFVBQXFCLGlCQUFvQztZQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVTLG9DQUFZLEdBQXRCO1lBQ0ksSUFBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUM7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUMxQztRQUNMLENBQUM7UUFFRCxzQkFBSSwrQkFBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFFRCxVQUFTLElBQUk7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQzs7O1dBSkE7UUFPRCxzQkFBSSxxQ0FBVTtpQkFBZDtnQkFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUIsQ0FBQztpQkFFRCxVQUFlLFVBQVU7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLENBQUM7OztXQUpBO1FBTUQsc0NBQWMsR0FBZCxVQUFlLE1BQWtCLEVBQUUsSUFBMkI7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsTUFBa0IsRUFBRSxJQUFTO1lBQzVDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsTUFBa0IsRUFBRSxJQUEyQixJQUFJLENBQUM7UUFFM0Usb0JBQUM7SUFBRCxDQUFDLEFBaEZELENBQXFDLHFCQUFxQixHQWdGekQ7SUFFUSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElEYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIEV2ZW50TW9kZWxJbml0aWFsaXplZCwgSURhdGFNb2RlbEl0ZW1PYnNlcnZlciwgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCB9IGZyb20gXCIuL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBiYXNlIGludGVyZmFjZSBmb3Igb2JzZXJ2aW5nIGRhdGEgbW9kZWwgaXRlbXNcclxuICpcclxuICogQGNsYXNzIERhdGFNb2RlbEl0ZW1PYnNlcnZlclxyXG4gKiBAaW1wbGVtZW50cyB7SURhdGFNb2RlbEl0ZW1PYnNlcnZlcn1cclxuICovXHJcbmFic3RyYWN0IGNsYXNzIERhdGFNb2RlbEl0ZW1PYnNlcnZlciBpbXBsZW1lbnRzIElEYXRhTW9kZWxJdGVtT2JzZXJ2ZXIge1xyXG5cclxuICAgIC8vIGRlY2xhcmUgZXZlbnQgZm9yIG5vdGlmeWluZyBtb2RlbCBpdGVtIGNoYW5nZXNcclxuICAgIGV2ZW50TW9kZWxJdGVtc0NoYW5nZWQ6IEV2ZW50TW9kZWxJdGVtc0NoYW5nZWQgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWQoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCBmb3IgaW52b2tpbmcgdGhlIG9ic2VydmF0aW9uIG9mIG1vZGVsIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gb2JzZXJ2YWJsZUl0ZW1zXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YU1vZGVsSXRlbU9ic2VydmVyXHJcbiAgICAgKi9cclxuICAgIG9ic2VydmVNb2RlbEl0ZW1zKG9ic2VydmFibGVJdGVtczogYW55W10pIHtcclxuICAgICAgICAvLyBoYXMgdG8gYmUgb3ZlcmxvYWRlZCBpbiBhIGNvbmNyZXRpemVkIGRhdGEgbW9kZWxcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vdGlmaWNhdGlvbiBtZXRob2QgY2FsbGVkIHdoZW4gbW9kZWwgaXRlbXMgaGFzIGNoYW5nZWRcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YU1vZGVsSXRlbU9ic2VydmVyXHJcbiAgICAgKi9cclxuICAgIG9uTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICAvLyByYWlzZSB0aGUgbW9kZWwgaXRlbXMgY2hhbmdlZCBldmVudFxyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZC5yYWlzZShzZW5kZXIsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWV0aG9kIGZvciBoYW5kbGluZyBtb2RlbCBpdGVtIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuIFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIGJhc2UgY2xhc3MgZm9yIGRhdGEgbW9kZWxzLlxyXG4gKlxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIERhdGFNb2RlbEJhc2VcclxuICogQGltcGxlbWVudHMge0lEYXRhTW9kZWx9XHJcbiAqL1xyXG5hYnN0cmFjdCBjbGFzcyBEYXRhTW9kZWxCYXNlIGV4dGVuZHMgRGF0YU1vZGVsSXRlbU9ic2VydmVyIGltcGxlbWVudHMgSURhdGFNb2RlbCB7XHJcbiAgICBcclxuICAgIC8vIGV2ZW50IGRlY2xhcmF0aW9uc1xyXG4gICAgZXZlbnRNb2RlbENoYW5nZWQ6IEV2ZW50TW9kZWxDaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkKCk7XHJcbiAgICBldmVudE1vZGVsSW5pdGlhbGl6ZWQ6IEV2ZW50TW9kZWxJbml0aWFsaXplZCA9IG5ldyBFdmVudE1vZGVsSW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICBwdWJsaWMgY29tcG9uZW50ITogQ29tcG9uZW50QmFzZTtcclxuICAgIHByb3RlY3RlZCBfaXNQZXJzaXN0RW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbm5lY3QoY29tcG9uZW50TmFtZTogc3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfZGF0YTogYW55O1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhU291cmNlOiBhbnk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5sb2FkQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgdGhpcy5faXNQZXJzaXN0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5faXNQZXJzaXN0RW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNhdmVTZXR0aW5ncygpe1xyXG4gICAgICAgIGlmKHRoaXMuX2lzUGVyc2lzdEVuYWJsZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGEoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgZGF0YVNvdXJjZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGF0YVNvdXJjZShkYXRhU291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxDaGFuZ2VkLnJhaXNlKHNlbmRlciwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vZGVsSW5pdGlhbGl6ZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxJbml0aWFsaXplZC5yYWlzZShzZW5kZXIsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykgeyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBEYXRhTW9kZWxCYXNlLCBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXIgfTtcclxuIl19
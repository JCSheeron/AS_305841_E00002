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
define(["require", "exports", "../../framework/events", "./persistDataChangedEventArgs"], function (require, exports, events_1, persistDataChangedEventArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataChanged = /** @class */ (function (_super) {
        __extends(DataChanged, _super);
        function DataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DataChanged;
    }(events_1.TypedEvent));
    ;
    var PersistDataProvider = /** @class */ (function () {
        /**
         * Creates an instance of PersistDataProvider
         * @memberof PersistDataProvider
         */
        function PersistDataProvider() {
            this.dataChanged = new DataChanged();
            /**
             * Holds all of the persisting data
             *
             * @private
             * @type {{ [id: string]: any; }}
             * @memberof PersistDataProvider
             */
            this._data = {};
            /**
             * Holds default persisting/settings data (TODO: Move to seperated class/provider)
             *
             * @private
             * @type {{ [id: string]: any; }}
             * @memberof PersistDataProvider
             */
            this._defaultData = {};
        }
        /**
         * gets a singleton instance of PersistDataProvider
         *
         * @readonly
         * @type {PersistDataProvider}
         * @memberof PersistDataProvider
         */
        PersistDataProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new PersistDataProvider();
            return this._instance;
        };
        /**
         * Get the whole data from this data provider
         *
         * @returns {*}
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.getData = function () {
            return this._data;
        };
        /**
         * Set the whole data of this data provider
         *
         * @param {*} data
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.setData = function (data) {
            this._data = data;
        };
        /**
         * Get data from this dataprovider with the given id
         *
         * @param {string} id
         * @returns {*}
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.getDataWithId = function (id) {
            return this._data[id];
        };
        /**
         * Set data to this dataprovider with the given id
         *
         * @param {string} id
         * @param {*} data
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.setDataWithId = function (id, data) {
            this._data[id] = data;
            this.onDataChanged(id, data);
        };
        /**
         * Get default data from this dataprovider with the given id
         *
         * @param {string} id
         * @returns {ComponentSettings}
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.getDefaultDataWithId = function (id) {
            return this._defaultData[id];
        };
        /**
         * Set data to this dataprovider with the given id
         *
         * @param {string} id
         * @param {ComponentSettings} data
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.setDefaultDataWithId = function (id, data) {
            this._defaultData[id] = data;
        };
        /**
         * Raise dataChanged event
         *
         * @private
         * @param {string} id
         * @param {*} data
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.onDataChanged = function (id, data) {
            var eventArgs = new persistDataChangedEventArgs_1.PersistDataChangedEventArgs();
            eventArgs.id = id;
            eventArgs.data = data;
            this.dataChanged.raise(this, eventArgs);
        };
        return PersistDataProvider;
    }());
    exports.PersistDataProvider = PersistDataProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdERhdGFQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQTBCLCtCQUE0RDtRQUF0Rjs7UUFBd0YsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FBQyxBQUF6RixDQUEwQixtQkFBVSxHQUFxRDtJQUFBLENBQUM7SUFFMUY7UUFxQ0k7OztXQUdHO1FBQ0g7WUF2Q0EsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBRWhDOzs7Ozs7ZUFNRztZQUNLLFVBQUssR0FBMkIsRUFBRSxDQUFDO1lBRTNDOzs7Ozs7ZUFNRztZQUNLLGlCQUFZLEdBQXlDLEVBQUUsQ0FBQztRQXVCaEUsQ0FBQztRQWxCRDs7Ozs7O1dBTUc7UUFDVywrQkFBVyxHQUF6QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1lBQzdFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO1FBVUQ7Ozs7O1dBS0c7UUFDSCxxQ0FBTyxHQUFQO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHFDQUFPLEdBQVAsVUFBUSxJQUFTO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDJDQUFhLEdBQWIsVUFBYyxFQUFVO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsMkNBQWEsR0FBYixVQUFjLEVBQVUsRUFBRSxJQUFTO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2hDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxrREFBb0IsR0FBcEIsVUFBcUIsRUFBVTtZQUMzQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGtEQUFvQixHQUFwQixVQUFxQixFQUFVLEVBQUUsSUFBdUI7WUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSywyQ0FBYSxHQUFyQixVQUFzQixFQUFVLEVBQUUsSUFBUztZQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLHlEQUEyQixFQUFFLENBQUM7WUFDbEQsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDbEIsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUE1SEQsSUE0SEM7SUE1SFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJncyB9IGZyb20gXCIuL3BlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJnc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG5jbGFzcyBEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8UGVyc2lzdERhdGFQcm92aWRlciwgUGVyc2lzdERhdGFDaGFuZ2VkRXZlbnRBcmdzPnsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJzaXN0RGF0YVByb3ZpZGVye1xyXG5cclxuICAgIGRhdGFDaGFuZ2VkID0gbmV3IERhdGFDaGFuZ2VkKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyBhbGwgb2YgdGhlIHBlcnNpc3RpbmcgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7eyBbaWQ6IHN0cmluZ106IGFueTsgfX1cclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGE6IHsgW2lkOiBzdHJpbmddOiBhbnk7IH0gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIGRlZmF1bHQgcGVyc2lzdGluZy9zZXR0aW5ncyBkYXRhIChUT0RPOiBNb3ZlIHRvIHNlcGVyYXRlZCBjbGFzcy9wcm92aWRlcilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge3sgW2lkOiBzdHJpbmddOiBhbnk7IH19XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0RGF0YTogeyBbaWQ6IHN0cmluZ106IENvbXBvbmVudFNldHRpbmdzOyB9ID0ge307XHJcblxyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBQZXJzaXN0RGF0YVByb3ZpZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7UGVyc2lzdERhdGFQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGVyc2lzdERhdGFQcm92aWRlciB7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlIDogbmV3IFBlcnNpc3REYXRhUHJvdmlkZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBlcnNpc3REYXRhUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfSBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgd2hvbGUgZGF0YSBmcm9tIHRoaXMgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0RGF0YSgpOmFueXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgd2hvbGUgZGF0YSBvZiB0aGlzIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHNldERhdGEoZGF0YTogYW55KXtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBkYXRhIGZyb20gdGhpcyBkYXRhcHJvdmlkZXIgd2l0aCB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0RGF0YVdpdGhJZChpZDogc3RyaW5nKTphbnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbaWRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGRhdGEgdG8gdGhpcyBkYXRhcHJvdmlkZXIgd2l0aCB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc2V0RGF0YVdpdGhJZChpZDogc3RyaW5nLCBkYXRhOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuX2RhdGFbaWRdID0gZGF0YTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoaWQsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgZGVmYXVsdCBkYXRhIGZyb20gdGhpcyBkYXRhcHJvdmlkZXIgd2l0aCB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHREYXRhV2l0aElkKGlkOiBzdHJpbmcpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdERhdGFbaWRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGRhdGEgdG8gdGhpcyBkYXRhcHJvdmlkZXIgd2l0aCB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50U2V0dGluZ3N9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHNldERlZmF1bHREYXRhV2l0aElkKGlkOiBzdHJpbmcsIGRhdGE6IENvbXBvbmVudFNldHRpbmdzKXtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0RGF0YVtpZF0gPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2UgZGF0YUNoYW5nZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EYXRhQ2hhbmdlZChpZDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IFBlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJncygpO1xyXG4gICAgICAgIGV2ZW50QXJncy5pZCA9IGlkO1xyXG4gICAgICAgIGV2ZW50QXJncy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmRhdGFDaGFuZ2VkLnJhaXNlKHRoaXMsIGV2ZW50QXJncyk7XHJcbiAgICB9XHJcbn0iXX0=
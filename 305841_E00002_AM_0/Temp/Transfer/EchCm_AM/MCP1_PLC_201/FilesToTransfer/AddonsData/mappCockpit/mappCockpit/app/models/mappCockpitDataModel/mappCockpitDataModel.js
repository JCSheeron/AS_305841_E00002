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
define(["require", "exports", "../../models/dataModelBase", "../../models/online/componentsDataModel"], function (require, exports, dataModelBase_1, componentsDataModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the data model for the mappCockpit
     *
     * @class MappCockpitDataModel
     * @implements {IMappCockpitDataModel}
     */
    var MappCockpitDataModel = /** @class */ (function (_super) {
        __extends(MappCockpitDataModel, _super);
        function MappCockpitDataModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MappCockpitDataModel.prototype, "mappCockpitComponentDataModel", {
            get: function () { return this.dataSource; },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * initializes the data model
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.initialize = function () {
            // the main data models data source is the mapp cockpit component data model
            var mappCockpitComponentDataModel = new componentsDataModel_1.MappCockpitComponentDataModel();
            this.dataSource = mappCockpitComponentDataModel;
            mappCockpitComponentDataModel.initialize();
            _super.prototype.initialize.call(this);
        };
        MappCockpitDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        /**
         * Dispose the MappCockpitDataModel
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.dispose = function () {
            this.mappCockpitComponentDataModel.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * updates the data model
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.connect = function () {
            this.mappCockpitComponentDataModel.connect();
        };
        return MappCockpitDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.MappCockpitDataModel = MappCockpitDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREYXRhTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9tYXBwQ29ja3BpdERhdGFNb2RlbC9tYXBwQ29ja3BpdERhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7Ozs7O09BS0c7SUFDSDtRQUFtQyx3Q0FBYTtRQUFoRDs7UUF5Q0EsQ0FBQztRQXZDRyxzQkFBWSwrREFBNkI7aUJBQXpDLGNBQTZFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7OztXQUFBO1FBQUEsQ0FBQztRQUV2Rzs7OztXQUlHO1FBQ0gseUNBQVUsR0FBVjtZQUVJLDRFQUE0RTtZQUM1RSxJQUFJLDZCQUE2QixHQUFHLElBQUksbURBQTZCLEVBQUUsQ0FBQztZQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLDZCQUE2QixDQUFDO1lBQ2hELDZCQUE2QixDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzNDLGlCQUFNLFVBQVUsV0FBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxrREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxzQ0FBTyxHQUFQO1lBQ0ksSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsc0NBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqRCxDQUFDO1FBRUwsMkJBQUM7SUFBRCxDQUFDLEFBekNELENBQW1DLDZCQUFhLEdBeUMvQztJQUVRLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgSU1hcHBDb2NrcGl0RGF0YU1vZGVsIH0gZnJvbSBcIi4vbWFwcENvY2twaXREYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9jb21wb25lbnRzRGF0YU1vZGVsXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIGRhdGEgbW9kZWwgZm9yIHRoZSBtYXBwQ29ja3BpdFxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXREYXRhTW9kZWxcclxuICogQGltcGxlbWVudHMge0lNYXBwQ29ja3BpdERhdGFNb2RlbH1cclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0RGF0YU1vZGVsIGV4dGVuZHMgRGF0YU1vZGVsQmFzZSBpbXBsZW1lbnRzIElNYXBwQ29ja3BpdERhdGFNb2RlbHtcclxuXHJcbiAgICBwcml2YXRlIGdldCBtYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCgpOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB7IHJldHVybiB0aGlzLmRhdGFTb3VyY2U7IH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyB0aGUgbWFpbiBkYXRhIG1vZGVscyBkYXRhIHNvdXJjZSBpcyB0aGUgbWFwcCBjb2NrcGl0IGNvbXBvbmVudCBkYXRhIG1vZGVsXHJcbiAgICAgICAgbGV0IG1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsID0gbmV3IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gbWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIE1hcHBDb2NrcGl0RGF0YU1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3QoKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbC5jb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdERhdGFNb2RlbCB9OyJdfQ==
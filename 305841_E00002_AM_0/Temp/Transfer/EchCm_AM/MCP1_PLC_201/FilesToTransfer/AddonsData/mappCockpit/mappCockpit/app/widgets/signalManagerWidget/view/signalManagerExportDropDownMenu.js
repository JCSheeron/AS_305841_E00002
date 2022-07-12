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
define(["require", "exports", "../../common/dropDownMenuBase"], function (require, exports, dropDownMenuBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerExportDropDownMenu = /** @class */ (function (_super) {
        __extends(SignalManagerExportDropDownMenu, _super);
        function SignalManagerExportDropDownMenu(toolbar, widgetDiv) {
            var _this = _super.call(this, widgetDiv, "Export") || this;
            _this._width = '315px';
            _this._leftPosition = '32px';
            _this.toolbar = toolbar;
            _this.buttonsId = ["exportAll_Choose_Btn_DropDownMenu", "exportSelected_Choose_Btn_DropDownMenu", "exportAllNew_Choose_Btn_DropDownMenu"];
            _this.exportAll = _this.buttonsId[0];
            _this.exportAllAsCsv = _this.buttonsId[1];
            _this.exportSelected = _this.buttonsId[2];
            return _this;
        }
        /**
         * Show dropdown menu
         *
         * @param {SignalManagerWidget} signalManagerWidget
         * @param {*} model
         * @param {boolean} selectedItemsExportable
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.showDropDownMenu = function (signalManagerWidget, model, selectedItemsExportable) {
            this.createDropDownMenu(this._width, this._leftPosition, this.buttonsId);
            this.createButton(this.exportAll, "Export all signals and charts (recommended)", true, signalManagerWidget, model);
            this.createButton(this.exportAllAsCsv, "Export all signals as .csv", true, signalManagerWidget, model);
            this.createButton(this.exportSelected, "Export selected signals  as .csv", selectedItemsExportable, signalManagerWidget, model);
            this.isOpened = true;
        };
        /**
         * Create syncf button
         *
         * @private
         * @param {string} id
         * @param {string} text
         * @param {boolean} enabled
         * @param {SignalManagerWidget} signalManager
         * @param {*} model
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.createButton = function (id, text, enabled, signalManager, model) {
            var _this = this;
            $('#' + id).ejButton({
                text: text,
                contentType: ej.ContentType.TextOnly,
                cssClass: "dropDownMenu",
                prefixIcon: "e-icon",
                enabled: enabled,
                click: function (args) {
                    switch (id) {
                        case _this.exportSelected:
                            _this.exportSelectedData(signalManager, model.selectedItems);
                            break;
                        case _this.exportAllAsCsv:
                            _this.exportAllDataAsCsv(signalManager, model.currentViewData);
                            break;
                        case _this.exportAll:
                            _this.exportAllData(signalManager);
                            break;
                    }
                    _this.hideDropDownMenu();
                }
            });
        };
        /**
         * Exports selected data as .csv
         *
         * @private
         * @param {SignalManagerWidget} signalManagerWidget
         * @param {*} selectedItems
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.exportSelectedData = function (signalManagerWidget, selectedItems) {
            this.toolbar.exportSelectedTraceData(signalManagerWidget, selectedItems);
        };
        /**
         * Exports all data as .csv
         *
         * @private
         * @param {SignalManagerWidget} signalManagerWidget
         * @param {*} allItems
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.exportAllDataAsCsv = function (signalManagerWidget, allItems) {
            this.toolbar.exportAllTraceDataAsCsv(signalManagerWidget, allItems);
        };
        /**
         * Exports all data as .mce
         *
         * @private
         * @param {SignalManagerWidget} signalManagerWidget
         * @param {*} allItems
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.exportAllData = function (signalManagerWidget) {
            this.toolbar.exportAllTraceData(signalManagerWidget);
        };
        return SignalManagerExportDropDownMenu;
    }(dropDownMenuBase_1.dropDownMenuBase));
    exports.SignalManagerExportDropDownMenu = SignalManagerExportDropDownMenu;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3ZpZXcvc2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBcUQsbURBQWdCO1FBV2pFLHlDQUFZLE9BQXFDLEVBQUUsU0FBeUI7WUFBNUUsWUFDSSxrQkFBTSxTQUFTLEVBQUUsUUFBUSxDQUFDLFNBTTdCO1lBVmdCLFlBQU0sR0FBVyxPQUFPLENBQUM7WUFDekIsbUJBQWEsR0FBVyxNQUFNLENBQUM7WUFJNUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLHdDQUF3QyxFQUFFLHNDQUFzQyxDQUFDLENBQUM7WUFDekksS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQzVDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksMERBQWdCLEdBQXZCLFVBQXlCLG1CQUF3QyxFQUFFLEtBQUssRUFBRSx1QkFBZ0M7WUFDdEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDZDQUE2QyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxrQ0FBa0MsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVoSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNLLHNEQUFZLEdBQXBCLFVBQXFCLEVBQVUsRUFBRSxJQUFZLEVBQUUsT0FBZ0IsRUFBRSxhQUFrQyxFQUFFLEtBQUs7WUFBMUcsaUJBc0JDO1lBckJHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRO2dCQUNwQyxRQUFRLEVBQUUsY0FBYztnQkFDeEIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixLQUFLLEVBQUUsVUFBQyxJQUFJO29CQUNSLFFBQVEsRUFBRSxFQUFDO3dCQUNQLEtBQUssS0FBSSxDQUFDLGNBQWM7NEJBQ3BCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUM1RCxNQUFNO3dCQUNWLEtBQUssS0FBSSxDQUFDLGNBQWM7NEJBQ3BCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzRCQUM5RCxNQUFNO3dCQUNWLEtBQUssS0FBSSxDQUFDLFNBQVM7NEJBQ2YsS0FBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDbEMsTUFBTTtxQkFDYjtvQkFDRCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssNERBQWtCLEdBQTFCLFVBQTJCLG1CQUF3QyxFQUFFLGFBQWE7WUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDREQUFrQixHQUExQixVQUEyQixtQkFBd0MsRUFBRSxRQUFRO1lBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSyx1REFBYSxHQUFyQixVQUFzQixtQkFBd0M7WUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDTCxzQ0FBQztJQUFELENBQUMsQUE1R0QsQ0FBcUQsbUNBQWdCLEdBNEdwRTtJQTVHWSwwRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL3NpZ25hbE1hbmFnZXJXaWRnZXRcIjtcclxuaW1wb3J0IHsgZHJvcERvd25NZW51QmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZHJvcERvd25NZW51QmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnUgZXh0ZW5kcyBkcm9wRG93bk1lbnVCYXNle1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHRvb2xiYXI6IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBleHBvcnRTZWxlY3RlZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBleHBvcnRBbGxBc0Nzdjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBleHBvcnRBbGw6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF93aWR0aDogc3RyaW5nID0gJzMxNXB4JztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRQb3NpdGlvbjogc3RyaW5nID0gJzMycHgnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRvb2xiYXI6IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIsIHdpZGdldERpdjogSFRNTERpdkVsZW1lbnQpey8vIHR5cGVcclxuICAgICAgICBzdXBlcih3aWRnZXREaXYsIFwiRXhwb3J0XCIpXHJcbiAgICAgICAgdGhpcy50b29sYmFyID0gdG9vbGJhcjtcclxuICAgICAgICB0aGlzLmJ1dHRvbnNJZCA9IFtcImV4cG9ydEFsbF9DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiLCBcImV4cG9ydFNlbGVjdGVkX0Nob29zZV9CdG5fRHJvcERvd25NZW51XCIsIFwiZXhwb3J0QWxsTmV3X0Nob29zZV9CdG5fRHJvcERvd25NZW51XCJdO1xyXG4gICAgICAgIHRoaXMuZXhwb3J0QWxsID0gdGhpcy5idXR0b25zSWRbMF07XHJcbiAgICAgICAgdGhpcy5leHBvcnRBbGxBc0NzdiA9IHRoaXMuYnV0dG9uc0lkWzFdO1xyXG4gICAgICAgIHRoaXMuZXhwb3J0U2VsZWN0ZWQgPSB0aGlzLmJ1dHRvbnNJZFsyXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgZHJvcGRvd24gbWVudVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2lnbmFsTWFuYWdlcldpZGdldH0gc2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICogQHBhcmFtIHsqfSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZEl0ZW1zRXhwb3J0YWJsZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dEcm9wRG93bk1lbnUgKHNpZ25hbE1hbmFnZXJXaWRnZXQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQsIG1vZGVsLCBzZWxlY3RlZEl0ZW1zRXhwb3J0YWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRHJvcERvd25NZW51KHRoaXMuX3dpZHRoLCB0aGlzLl9sZWZ0UG9zaXRpb24sIHRoaXMuYnV0dG9uc0lkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLmV4cG9ydEFsbCwgXCJFeHBvcnQgYWxsIHNpZ25hbHMgYW5kIGNoYXJ0cyAocmVjb21tZW5kZWQpXCIsIHRydWUsIHNpZ25hbE1hbmFnZXJXaWRnZXQsIG1vZGVsKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLmV4cG9ydEFsbEFzQ3N2LCBcIkV4cG9ydCBhbGwgc2lnbmFscyBhcyAuY3N2XCIsIHRydWUsIHNpZ25hbE1hbmFnZXJXaWRnZXQsIG1vZGVsKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLmV4cG9ydFNlbGVjdGVkLCBcIkV4cG9ydCBzZWxlY3RlZCBzaWduYWxzICBhcyAuY3N2XCIsIHNlbGVjdGVkSXRlbXNFeHBvcnRhYmxlLCBzaWduYWxNYW5hZ2VyV2lkZ2V0LCBtb2RlbCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHN5bmNmIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcclxuICAgICAqIEBwYXJhbSB7U2lnbmFsTWFuYWdlcldpZGdldH0gc2lnbmFsTWFuYWdlclxyXG4gICAgICogQHBhcmFtIHsqfSBtb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b24oaWQ6IHN0cmluZywgdGV4dDogc3RyaW5nLCBlbmFibGVkOiBib29sZWFuLCBzaWduYWxNYW5hZ2VyOiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBtb2RlbCl7XHJcbiAgICAgICAgJCgnIycgKyBpZCkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dE9ubHksXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcImRyb3BEb3duTWVudVwiLFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvblwiICwvL1NwZWNpZmllcyB0aGUgcHJpbWFyeSBpY29uIGZvciBCdXR0b25cclxuICAgICAgICAgICAgZW5hYmxlZDogZW5hYmxlZCxcclxuICAgICAgICAgICAgY2xpY2s6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlkKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuZXhwb3J0U2VsZWN0ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0U2VsZWN0ZWREYXRhKHNpZ25hbE1hbmFnZXIsIG1vZGVsLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuZXhwb3J0QWxsQXNDc3Y6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0QWxsRGF0YUFzQ3N2KHNpZ25hbE1hbmFnZXIsIG1vZGVsLmN1cnJlbnRWaWV3RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5leHBvcnRBbGw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0QWxsRGF0YShzaWduYWxNYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVEcm9wRG93bk1lbnUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwb3J0cyBzZWxlY3RlZCBkYXRhIGFzIC5jc3ZcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTaWduYWxNYW5hZ2VyV2lkZ2V0fSBzaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbGVjdGVkSXRlbXNcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRXhwb3J0RHJvcERvd25NZW51XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhwb3J0U2VsZWN0ZWREYXRhKHNpZ25hbE1hbmFnZXJXaWRnZXQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQsIHNlbGVjdGVkSXRlbXMpIHtcclxuICAgICAgICB0aGlzLnRvb2xiYXIuZXhwb3J0U2VsZWN0ZWRUcmFjZURhdGEoc2lnbmFsTWFuYWdlcldpZGdldCwgc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIGFsbCBkYXRhIGFzIC5jc3ZcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTaWduYWxNYW5hZ2VyV2lkZ2V0fSBzaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp9IGFsbEl0ZW1zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4cG9ydEFsbERhdGFBc0NzdihzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBhbGxJdGVtcykge1xyXG4gICAgICAgIHRoaXMudG9vbGJhci5leHBvcnRBbGxUcmFjZURhdGFBc0NzdihzaWduYWxNYW5hZ2VyV2lkZ2V0LCBhbGxJdGVtcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwb3J0cyBhbGwgZGF0YSBhcyAubWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2lnbmFsTWFuYWdlcldpZGdldH0gc2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICogQHBhcmFtIHsqfSBhbGxJdGVtc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHBvcnRBbGxEYXRhKHNpZ25hbE1hbmFnZXJXaWRnZXQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQpIHtcclxuICAgICAgICB0aGlzLnRvb2xiYXIuZXhwb3J0QWxsVHJhY2VEYXRhKHNpZ25hbE1hbmFnZXJXaWRnZXQpO1xyXG4gICAgfVxyXG59Il19
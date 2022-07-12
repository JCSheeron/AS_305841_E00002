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
define(["require", "exports", "../../common/componentFactory/componentDefinition", "../splitterWidget/splitterDefinition", "../splitterWidget/splitterPaneDefinition", "../splitterWidget/layoutPane", "../../common/componentBase/componentSettings"], function (require, exports, componentDefinition_1, splitterDefinition_1, splitterPaneDefinition_1, layoutPane_1, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitterComponentSettings = /** @class */ (function (_super) {
        __extends(SplitterComponentSettings, _super);
        /**
         * Creates an instance of SplitterComponentSettings
         * @param {string} orientation (e.g. "vertical" or "horizontal")
         * @param {boolean} [responsive=true]
         * @memberof SplitterComponentSettings
         */
        function SplitterComponentSettings(orientation, responsive) {
            if (responsive === void 0) { responsive = true; }
            var _this = _super.call(this) || this;
            // Create SplitterDefinition
            _this._splitterDefinition = new splitterDefinition_1.SplitterDefinition(orientation, responsive);
            // Add SplitterDefinition to this widget base data
            _this.setValue(splitterDefinition_1.SplitterDefinition.splitterDefinitionId, _this._splitterDefinition);
            return _this;
        }
        /**
         * Adds a new pane to the splitter component settings
         *
         * @param {string} type
         * @param {string} id
         * @param {string} defaultDataId
         * @param {*} [paneDefinition=""]
         * @memberof SplitterComponentSettings
         */
        SplitterComponentSettings.prototype.addPane = function (type, id, defaultDataId, paneDefinition) {
            if (paneDefinition === void 0) { paneDefinition = ""; }
            // Add panes to panes data
            var paneDefs = this._splitterDefinition.paneDefinitions;
            paneDefs.push(new splitterPaneDefinition_1.SplitterPaneDefinition(new componentDefinition_1.ComponentDefinition(type, id, defaultDataId), paneDefinition));
        };
        /**
         * Returns an ISettings object with a pane definition for the given data
         *
         * @static
         * @param {number} size
         * @param {boolean} [resizable=true]
         * @param {number} [minimumSize=0]
         * @returns {ISettings}
         * @memberof SplitterComponentSettings
         */
        SplitterComponentSettings.getPaneSettings = function (size, resizable, minimumSize) {
            if (resizable === void 0) { resizable = true; }
            if (minimumSize === void 0) { minimumSize = 0; }
            var fillSpace = false;
            if (size == -1) {
                // Use dynamic size for the pane
                size = 0;
                fillSpace = true;
            }
            return layoutPane_1.LayoutPane.getFormatedSettings(size, false, false, fillSpace, resizable, minimumSize);
        };
        return SplitterComponentSettings;
    }(componentSettings_1.ComponentSettings));
    exports.SplitterComponentSettings = SplitterComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBT0E7UUFBK0MsNkNBQWlCO1FBSTVEOzs7OztXQUtHO1FBQ0gsbUNBQVksV0FBbUIsRUFBRSxVQUEwQjtZQUExQiwyQkFBQSxFQUFBLGlCQUEwQjtZQUEzRCxZQUNJLGlCQUFPLFNBT1Y7WUFORyw0QkFBNEI7WUFDNUIsS0FBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksdUNBQWtCLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRTNFLGtEQUFrRDtZQUNsRCxLQUFJLENBQUMsUUFBUSxDQUFDLHVDQUFrQixDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztRQUVyRixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCwyQ0FBTyxHQUFQLFVBQVEsSUFBWSxFQUFFLEVBQVUsRUFBRSxhQUFxQixFQUFFLGNBQXdCO1lBQXhCLCtCQUFBLEVBQUEsbUJBQXdCO1lBQzdFLDBCQUEwQjtZQUMxQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDO1lBQ3hELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQ0FBc0IsQ0FBQyxJQUFJLHlDQUFtQixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNoSCxDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0kseUNBQWUsR0FBdEIsVUFBdUIsSUFBWSxFQUFFLFNBQXlCLEVBQUUsV0FBdUI7WUFBbEQsMEJBQUEsRUFBQSxnQkFBeUI7WUFBRSw0QkFBQSxFQUFBLGVBQXVCO1lBQ25GLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBQztnQkFDVixnQ0FBZ0M7Z0JBQ2hDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ1QsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNwQjtZQUNELE9BQU8sdUJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pHLENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUF0REQsQ0FBK0MscUNBQWlCLEdBc0QvRDtJQXREWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBTcGxpdHRlclBhbmVEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyUGFuZURlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgTGF5b3V0UGFuZSB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9sYXlvdXRQYW5lXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBDb21wb25lbnRTZXR0aW5nc3tcclxuXHJcbiAgICBwcml2YXRlIF9zcGxpdHRlckRlZmluaXRpb246IFNwbGl0dGVyRGVmaW5pdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uIChlLmcuIFwidmVydGljYWxcIiBvciBcImhvcml6b250YWxcIilcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc3BvbnNpdmU9dHJ1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9yaWVudGF0aW9uOiBzdHJpbmcsIHJlc3BvbnNpdmU6IGJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBTcGxpdHRlckRlZmluaXRpb25cclxuICAgICAgICB0aGlzLl9zcGxpdHRlckRlZmluaXRpb24gPSBuZXcgU3BsaXR0ZXJEZWZpbml0aW9uKG9yaWVudGF0aW9uLCByZXNwb25zaXZlKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgU3BsaXR0ZXJEZWZpbml0aW9uIHRvIHRoaXMgd2lkZ2V0IGJhc2UgZGF0YVxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoU3BsaXR0ZXJEZWZpbml0aW9uLnNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLl9zcGxpdHRlckRlZmluaXRpb24pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgcGFuZSB0byB0aGUgc3BsaXR0ZXIgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlZmF1bHREYXRhSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gW3BhbmVEZWZpbml0aW9uPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBhZGRQYW5lKHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZywgZGVmYXVsdERhdGFJZDogc3RyaW5nLCBwYW5lRGVmaW5pdGlvbjogYW55ID0gXCJcIil7XHJcbiAgICAgICAgLy8gQWRkIHBhbmVzIHRvIHBhbmVzIGRhdGFcclxuICAgICAgICBsZXQgcGFuZURlZnMgPSB0aGlzLl9zcGxpdHRlckRlZmluaXRpb24ucGFuZURlZmluaXRpb25zO1xyXG4gICAgICAgIHBhbmVEZWZzLnB1c2gobmV3IFNwbGl0dGVyUGFuZURlZmluaXRpb24obmV3IENvbXBvbmVudERlZmluaXRpb24odHlwZSwgaWQsIGRlZmF1bHREYXRhSWQpLCBwYW5lRGVmaW5pdGlvbikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gSVNldHRpbmdzIG9iamVjdCB3aXRoIGEgcGFuZSBkZWZpbml0aW9uIGZvciB0aGUgZ2l2ZW4gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNpemFibGU9dHJ1ZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbWluaW11bVNpemU9MF1cclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0UGFuZVNldHRpbmdzKHNpemU6IG51bWJlciwgcmVzaXphYmxlOiBib29sZWFuID0gdHJ1ZSwgbWluaW11bVNpemU6IG51bWJlciA9IDApOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IGZpbGxTcGFjZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHNpemUgPT0gLTEpe1xyXG4gICAgICAgICAgICAvLyBVc2UgZHluYW1pYyBzaXplIGZvciB0aGUgcGFuZVxyXG4gICAgICAgICAgICBzaXplID0gMDtcclxuICAgICAgICAgICAgZmlsbFNwYWNlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIExheW91dFBhbmUuZ2V0Rm9ybWF0ZWRTZXR0aW5ncyhzaXplLCBmYWxzZSwgZmFsc2UsIGZpbGxTcGFjZSwgcmVzaXphYmxlLCBtaW5pbXVtU2l6ZSk7XHJcbiAgICB9XHJcbn0iXX0=
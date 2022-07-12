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
define(["require", "exports", "../../models/common/series/seriesType", "../../common/componentBase/componentWithoutSettingsBase", "./componentDefaultDefinitionSeriesIconProvider"], function (require, exports, seriesType_1, componentWithoutSettingsBase_1, componentDefaultDefinitionSeriesIconProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeriesIconProvider = /** @class */ (function (_super) {
        __extends(SeriesIconProvider, _super);
        function SeriesIconProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * gets a singleton instance of SeriesIconProvider
         *
         * @readonly
         * @type {SeriesIconProvider}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new SeriesIconProvider();
            return this._instance;
        };
        SeriesIconProvider.prototype.initializeComponent = function () {
            _super.prototype.initializeComponent.call(this);
            this.component.setDefaultDefinition(new componentDefaultDefinitionSeriesIconProvider_1.ComponentDefaultDefinitionSeriesIconProvider());
        };
        SeriesIconProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
        };
        /**
         * Disposes the series icon provider
         *
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * Returns html information(e.g img, svg, ...) with the icons for a series(main icon + overlays)
         *
         * @param {BaseSeries} serie
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getIcon = function (serie) {
            var iconDefinition = this.getBaseIconDefinition(serie);
            iconDefinition += this.getOverlayIconDefinition(serie);
            return iconDefinition;
        };
        /**
         * Returns html information(e.g img, svg, ...) with the base icons for a series
         *
         * @private
         * @param {BaseSeries} serie
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getBaseIconDefinition = function (serie) {
            var iconDefinition = "";
            // Set main icon
            if (serie.type == seriesType_1.SeriesType.timeSeries) {
                iconDefinition += this.getSeriesMainIcon(this.getSvgPath("timeSeries"), serie.color);
            }
            else if (serie.type == seriesType_1.SeriesType.xySeries) {
                iconDefinition += this.getSeriesMainIcon(this.getSvgPath("xySeries"), serie.color);
            }
            else if (serie.type == seriesType_1.SeriesType.fftSeries) {
                iconDefinition += this.getSeriesMainIcon(this.getSvgPath("fftSeries"), serie.color);
            }
            return iconDefinition;
        };
        /**
         *Returns html information(e.g img, svg, ...) with the overlay icons for a series
         *
         * @private
         * @param {BaseSeries} serie
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getOverlayIconDefinition = function (serie) {
            var iconDefinition = "";
            if (serie.isCalculated == true) {
                // Set calculation overlay
                //iconDefinition += '<img class="treeGridRowIcon" src="' + SeriesIconProvider.getSvgPath("calculationOverlay") + '" />';
            }
            if (serie.isAutoUpdated == true) {
                // Set auto update overlay 
                iconDefinition += '<img class="treeGridRowIcon" src="' + this.getSvgPath("autoUpdatedOverlay") + '" />';
            }
            if (serie.rawPointsValid == false) {
                //Set exclamation overlay for invalid series
                var tooltipText = "The data is invalid!"; // Default tooltiptext in case of invalid data
                var errorText = serie.getErrorText();
                if (errorText != "") {
                    tooltipText = errorText; // Use error info text for tooltip text
                }
                iconDefinition += "<img title=\"" + tooltipText + "\" class=\"treeGridRowIcon\" src=\"" + this.getSvgPath("exclamationOverlay") + "\" />";
            }
            return iconDefinition;
        };
        /**
         * Get filepath for svg
         *
         * @param {string} svgName
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getSvgPath = function (svgName) {
            return "../app/widgets/common/style/images/tree/" + svgName + ".svg";
        };
        /**
         * Get the main series icon (e.g. timeSeries, xySeries, fftSeries, ...)
         *
         * @private
         * @param {string} type
         * @param {string} color
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getSeriesMainIcon = function (path, color) {
            var imageProvider = this.component.getSubComponent(componentDefaultDefinitionSeriesIconProvider_1.ComponentDefaultDefinitionSeriesIconProvider.ImageProviderId);
            if (imageProvider != undefined) {
                var imageData = imageProvider.getImage(path);
                if (imageData != undefined) {
                    return imageData.replace("stroke:#76bea6", "stroke:" + color);
                }
            }
            return "";
        };
        return SeriesIconProvider;
    }(componentWithoutSettingsBase_1.ComponentWithoutSettingsBase));
    exports.SeriesIconProvider = SeriesIconProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzSWNvblByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9zZXJpZXNJY29uUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQXdDLHNDQUE0QjtRQUFwRTs7UUF3SUEsQ0FBQztRQW5JRzs7Ozs7O1dBTUc7UUFDVyw4QkFBVyxHQUF6QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQzVFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO1FBRU0sZ0RBQW1CLEdBQTFCO1lBQ0ksaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksMkZBQTRDLEVBQUUsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFFRCx1Q0FBVSxHQUFWO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzNDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0NBQU8sR0FBUDtZQUNJLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxvQ0FBTyxHQUFQLFVBQVEsS0FBaUI7WUFDckIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELGNBQWMsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxrREFBcUIsR0FBN0IsVUFBOEIsS0FBaUI7WUFDM0MsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBRXhCLGdCQUFnQjtZQUNoQixJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUM7Z0JBQ25DLGNBQWMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEY7aUJBQ0ksSUFBRyxLQUFLLENBQUMsSUFBSSxJQUFJLHVCQUFVLENBQUMsUUFBUSxFQUFDO2dCQUN0QyxjQUFjLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RGO2lCQUNJLElBQUcsS0FBSyxDQUFDLElBQUksSUFBSSx1QkFBVSxDQUFDLFNBQVMsRUFBQztnQkFDdkMsY0FBYyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2RjtZQUVELE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0sscURBQXdCLEdBQWhDLFVBQWlDLEtBQWlCO1lBQzlDLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFHLEtBQUssQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFDO2dCQUMxQiwwQkFBMEI7Z0JBQzFCLHdIQUF3SDthQUMzSDtZQUVELElBQUcsS0FBSyxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUM7Z0JBQzNCLDJCQUEyQjtnQkFDM0IsY0FBYyxJQUFJLG9DQUFvQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsR0FBRyxNQUFNLENBQUM7YUFDM0c7WUFFRCxJQUFHLEtBQUssQ0FBQyxjQUFjLElBQUksS0FBSyxFQUFDO2dCQUM3Qiw0Q0FBNEM7Z0JBQzVDLElBQUksV0FBVyxHQUFHLHNCQUFzQixDQUFDLENBQUMsOENBQThDO2dCQUN4RixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3JDLElBQUcsU0FBUyxJQUFJLEVBQUUsRUFBQztvQkFDZixXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUMsdUNBQXVDO2lCQUNuRTtnQkFDRCxjQUFjLElBQUksZUFBYyxHQUFFLFdBQVcsR0FBRSxxQ0FBaUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsT0FBTSxDQUFDO2FBQ3JJO1lBQ0QsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHVDQUFVLEdBQWpCLFVBQWtCLE9BQWU7WUFDN0IsT0FBTywwQ0FBMEMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3pFLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLDhDQUFpQixHQUF6QixVQUEwQixJQUFZLEVBQUUsS0FBYTtZQUNqRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQywyRkFBNEMsQ0FBQyxlQUFlLENBQW1CLENBQUM7WUFDbkksSUFBRyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMxQixJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUU3QyxJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUM7b0JBQ3RCLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7aUJBQ2pFO2FBQ0o7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDTCx5QkFBQztJQUFELENBQUMsQUF4SUQsQ0FBd0MsMkRBQTRCLEdBd0luRTtJQXhJWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFdpdGhvdXRTZXR0aW5nc0Jhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50V2l0aG91dFNldHRpbmdzQmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblNlcmllc0ljb25Qcm92aWRlciB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uU2VyaWVzSWNvblByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9pbWFnZVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZXNJY29uUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3Nlcmllc0ljb25Qcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmllc0ljb25Qcm92aWRlciBleHRlbmRzIENvbXBvbmVudFdpdGhvdXRTZXR0aW5nc0Jhc2UgaW1wbGVtZW50cyBJU2VyaWVzSWNvblByb3ZpZGVye1xyXG5cclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU2VyaWVzSWNvblByb3ZpZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBTZXJpZXNJY29uUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtTZXJpZXNJY29uUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogU2VyaWVzSWNvblByb3ZpZGVyIHtcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlID8gdGhpcy5faW5zdGFuY2UgOiBuZXcgU2VyaWVzSWNvblByb3ZpZGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVDb21wb25lbnQoKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25TZXJpZXNJY29uUHJvdmlkZXIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxvYWRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIHNlcmllcyBpY29uIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGh0bWwgaW5mb3JtYXRpb24oZS5nIGltZywgc3ZnLCAuLi4pIHdpdGggdGhlIGljb25zIGZvciBhIHNlcmllcyhtYWluIGljb24gKyBvdmVybGF5cylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXRJY29uKHNlcmllOiBCYXNlU2VyaWVzKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IHRoaXMuZ2V0QmFzZUljb25EZWZpbml0aW9uKHNlcmllKTtcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLmdldE92ZXJsYXlJY29uRGVmaW5pdGlvbihzZXJpZSk7XHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBodG1sIGluZm9ybWF0aW9uKGUuZyBpbWcsIHN2ZywgLi4uKSB3aXRoIHRoZSBiYXNlIGljb25zIGZvciBhIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEJhc2VJY29uRGVmaW5pdGlvbihzZXJpZTogQmFzZVNlcmllcyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8gU2V0IG1haW4gaWNvblxyXG4gICAgICAgIGlmKHNlcmllLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKXtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gdGhpcy5nZXRTZXJpZXNNYWluSWNvbih0aGlzLmdldFN2Z1BhdGgoXCJ0aW1lU2VyaWVzXCIpLCBzZXJpZS5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoc2VyaWUudHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKXtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gdGhpcy5nZXRTZXJpZXNNYWluSWNvbih0aGlzLmdldFN2Z1BhdGgoXCJ4eVNlcmllc1wiKSwgc2VyaWUuY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHNlcmllLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLmdldFNlcmllc01haW5JY29uKHRoaXMuZ2V0U3ZnUGF0aChcImZmdFNlcmllc1wiKSwgc2VyaWUuY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpSZXR1cm5zIGh0bWwgaW5mb3JtYXRpb24oZS5nIGltZywgc3ZnLCAuLi4pIHdpdGggdGhlIG92ZXJsYXkgaWNvbnMgZm9yIGEgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheUljb25EZWZpbml0aW9uKHNlcmllOiBCYXNlU2VyaWVzKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBcIlwiOyAgICBcclxuICAgICAgICBpZihzZXJpZS5pc0NhbGN1bGF0ZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjYWxjdWxhdGlvbiBvdmVybGF5XHJcbiAgICAgICAgICAgIC8vaWNvbkRlZmluaXRpb24gKz0gJzxpbWcgY2xhc3M9XCJ0cmVlR3JpZFJvd0ljb25cIiBzcmM9XCInICsgU2VyaWVzSWNvblByb3ZpZGVyLmdldFN2Z1BhdGgoXCJjYWxjdWxhdGlvbk92ZXJsYXlcIikgKyAnXCIgLz4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKHNlcmllLmlzQXV0b1VwZGF0ZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIFNldCBhdXRvIHVwZGF0ZSBvdmVybGF5IFxyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSAnPGltZyBjbGFzcz1cInRyZWVHcmlkUm93SWNvblwiIHNyYz1cIicgKyB0aGlzLmdldFN2Z1BhdGgoXCJhdXRvVXBkYXRlZE92ZXJsYXlcIikgKyAnXCIgLz4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc2VyaWUucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvL1NldCBleGNsYW1hdGlvbiBvdmVybGF5IGZvciBpbnZhbGlkIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgdG9vbHRpcFRleHQgPSBcIlRoZSBkYXRhIGlzIGludmFsaWQhXCI7IC8vIERlZmF1bHQgdG9vbHRpcHRleHQgaW4gY2FzZSBvZiBpbnZhbGlkIGRhdGFcclxuICAgICAgICAgICAgbGV0IGVycm9yVGV4dCA9IHNlcmllLmdldEVycm9yVGV4dCgpO1xyXG4gICAgICAgICAgICBpZihlcnJvclRleHQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGV4dCA9IGVycm9yVGV4dDsgLy8gVXNlIGVycm9yIGluZm8gdGV4dCBmb3IgdG9vbHRpcCB0ZXh0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDxpbWcgdGl0bGU9XCJgKyB0b29sdGlwVGV4dCArYFwiIGNsYXNzPVwidHJlZUdyaWRSb3dJY29uXCIgc3JjPVwiYCArIHRoaXMuZ2V0U3ZnUGF0aChcImV4Y2xhbWF0aW9uT3ZlcmxheVwiKSArIGBcIiAvPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBmaWxlcGF0aCBmb3Igc3ZnIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdmdOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U3ZnUGF0aChzdmdOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvdHJlZS9cIiArIHN2Z05hbWUgKyBcIi5zdmdcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbWFpbiBzZXJpZXMgaWNvbiAoZS5nLiB0aW1lU2VyaWVzLCB4eVNlcmllcywgZmZ0U2VyaWVzLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U2VyaWVzTWFpbkljb24ocGF0aDogc3RyaW5nLCBjb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaW1hZ2VQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblNlcmllc0ljb25Qcm92aWRlci5JbWFnZVByb3ZpZGVySWQpIGFzIElJbWFnZVByb3ZpZGVyO1xyXG4gICAgICAgIGlmKGltYWdlUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGltYWdlRGF0YSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UocGF0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihpbWFnZURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZURhdGEucmVwbGFjZShcInN0cm9rZTojNzZiZWE2XCIsIFwic3Ryb2tlOlwiICsgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59Il19
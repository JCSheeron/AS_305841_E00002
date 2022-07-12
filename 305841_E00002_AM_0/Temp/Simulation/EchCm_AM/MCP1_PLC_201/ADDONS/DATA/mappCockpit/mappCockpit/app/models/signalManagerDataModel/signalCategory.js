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
define(["require", "exports", "../../common/persistence/settings", "./signalManagerDataModelSettingIds", "../common/signal/serieContainer", "../common/signal/serieGroup"], function (require, exports, settings_1, signalManagerDataModelSettingIds_1, serieContainer_1, serieGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalCategory = /** @class */ (function (_super) {
        __extends(SignalCategory, _super);
        /**
         * Creates an instance of a signal category
         * @param {string} id
         * @memberof SignalCategory
         */
        function SignalCategory(id) {
            var _this = _super.call(this, SignalCategory.getDisplayName(id), id) || this;
            _this.id = id;
            _this.canDelete = false;
            return _this;
        }
        /**
         * Returns the settings of this signal category
         *
         * @returns {ISettings}
         * @memberof SignalCategory
         */
        SignalCategory.prototype.getSettings = function () {
            var settings = new settings_1.Settings("category");
            settings.setValue("id", this.id);
            settings.setValue("expandState", this.expandState);
            var seriesGroupsData = new Array();
            // get all serie groups from this category
            this.getChilds().forEach(function (container) {
                if (container instanceof serieGroup_1.SerieGroup) {
                    // add serie group settings
                    seriesGroupsData.push(container.getSettings());
                }
                else if (container instanceof serieContainer_1.SerieContainer) {
                    // Import file category
                    var serieGroups = container.getChilds(); // serie groups of an imported file
                    for (var i = 0; i < serieGroups.length; i++) {
                        var group = serieGroups[i];
                        if (group instanceof serieGroup_1.SerieGroup) {
                            seriesGroupsData.push(group.getSettings());
                        }
                    }
                }
            });
            settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroups, seriesGroupsData);
            return settings;
        };
        /**
         * Sets the given settings to this signal category (id can not be changed currently)
         *
         * @param {ISettings} settings
         * @memberof SignalCategory
         */
        SignalCategory.prototype.setSettings = function (settings) {
            var _this = this;
            var settingsObj = settings_1.Settings.create(settings);
            this.expandState = settingsObj.data.expandState;
            settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroups).forEach(function (importSerieGroup) {
                var container;
                if (_this.id == SignalCategory.CategoryIdImported) { // import category needs additionally container(file container)
                    container = _this.getOrCreateContainer(importSerieGroup.data[signalManagerDataModelSettingIds_1.SettingIds.ContainerName], importSerieGroup.data[signalManagerDataModelSettingIds_1.SettingIds.ContainerId], importSerieGroup.data[signalManagerDataModelSettingIds_1.SettingIds.ContainerExpandState]);
                }
                else {
                    container = _this;
                }
                // add default group to container
                var serieGroup = new serieGroup_1.SerieGroup("", "", 0);
                container.addSerieContainer(serieGroup);
                // set group data
                serieGroup.setSettings(importSerieGroup);
            });
        };
        /**
         * Returns the found serieContainer or creats and adds a new serieContainer with the given containerName
         *
         * @private
         * @param {string} containerName
         * @param {string} containerId
         * @param {boolean} expandState
         * @returns {ISerieContainer}
         * @memberof SignalCategory
         */
        SignalCategory.prototype.getOrCreateContainer = function (containerName, containerId, expandState) {
            // Search for existing container
            var foundContainer = this.getSerieContainerById(containerId);
            if (foundContainer != undefined) {
                return foundContainer;
            }
            // Create new container
            var container = new serieContainer_1.SerieContainer(containerName, containerId, expandState);
            this.addSerieContainer(container, -1);
            return container;
        };
        /**
         * Returns the display name for the given category id
         *
         * @private
         * @param {string} id
         * @returns
         * @memberof SignalCategory
         */
        SignalCategory.getDisplayName = function (id) {
            // get displaynames of the category
            if (id == SignalCategory.CategoryIdRecent) {
                return "Recent";
            }
            else if (id == SignalCategory.CategoryIdUploaded) {
                return "All uploaded from PLC";
            }
            else if (id == SignalCategory.CategoryIdImported) {
                return "Imported from file";
            }
            else if (id == SignalCategory.CategoryIdCalculated) {
                return "Calculated signals";
            }
            return "Unknown category id";
        };
        SignalCategory.CategoryIdRecent = "Recent";
        SignalCategory.CategoryIdUploaded = "Uploaded";
        SignalCategory.CategoryIdImported = "Imported";
        SignalCategory.CategoryIdCalculated = "Calculated";
        return SignalCategory;
    }(serieContainer_1.SerieContainer));
    exports.SignalCategory = SignalCategory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsQ2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTtRQUFvQyxrQ0FBYztRQVM5Qzs7OztXQUlHO1FBQ0gsd0JBQVksRUFBVTtZQUF0QixZQUNJLGtCQUFNLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBSy9DO1lBSEcsS0FBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFFYixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7UUFDM0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsb0NBQVcsR0FBWDtZQUNJLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDaEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25ELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxLQUFLLEVBQWEsQ0FBQztZQUU5QywwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7Z0JBQzlCLElBQUcsU0FBUyxZQUFZLHVCQUFVLEVBQUM7b0JBQy9CLDJCQUEyQjtvQkFDM0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2lCQUNsRDtxQkFDSSxJQUFHLFNBQVMsWUFBWSwrQkFBYyxFQUFDO29CQUN4Qyx1QkFBdUI7b0JBQ3ZCLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLG1D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RyxFQUFFLElBQUksY0FBYyxDQUFDLG9CQUFvQixFQUFDO2dCQUM5QyxPQUFPLG9CQUFvQixDQUFDO2FBQy9CO1lBQ0QsT0FBTyxxQkFBcUIsQ0FBQztRQUNqQyxDQUFDO1FBN0hlLCtCQUFnQixHQUFXLFFBQVEsQ0FBQztRQUNwQyxpQ0FBa0IsR0FBVyxVQUFVLENBQUM7UUFDeEMsaUNBQWtCLEdBQVcsVUFBVSxDQUFDO1FBQ3hDLG1DQUFvQixHQUFXLFlBQVksQ0FBQztRQTJIaEUscUJBQUM7S0FBQSxBQWhJRCxDQUFvQywrQkFBYyxHQWdJakQ7SUFoSVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbFNldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVDb250YWluZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVHcm91cCB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllR3JvdXBcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxDYXRlZ29yeSBleHRlbmRzIFNlcmllQ29udGFpbmVye1xyXG4gICAgXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ2F0ZWdvcnlJZFJlY2VudDogc3RyaW5nID0gXCJSZWNlbnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBDYXRlZ29yeUlkVXBsb2FkZWQ6IHN0cmluZyA9IFwiVXBsb2FkZWRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBDYXRlZ29yeUlkSW1wb3J0ZWQ6IHN0cmluZyA9IFwiSW1wb3J0ZWRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBDYXRlZ29yeUlkQ2FsY3VsYXRlZDogc3RyaW5nID0gXCJDYWxjdWxhdGVkXCI7XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgc2lnbmFsIGNhdGVnb3J5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxDYXRlZ29yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihTaWduYWxDYXRlZ29yeS5nZXREaXNwbGF5TmFtZShpZCksIGlkKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jYW5EZWxldGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmdzIG9mIHRoaXMgc2lnbmFsIGNhdGVnb3J5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxDYXRlZ29yeVxyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoXCJpZFwiLCB0aGlzLmlkKVxyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwiZXhwYW5kU3RhdGVcIiwgdGhpcy5leHBhbmRTdGF0ZSk7XHJcbiAgICAgICAgbGV0IHNlcmllc0dyb3Vwc0RhdGEgPSBuZXcgQXJyYXk8SVNldHRpbmdzPigpO1xyXG5cclxuICAgICAgICAvLyBnZXQgYWxsIHNlcmllIGdyb3VwcyBmcm9tIHRoaXMgY2F0ZWdvcnlcclxuICAgICAgICB0aGlzLmdldENoaWxkcygpLmZvckVhY2goY29udGFpbmVyID0+IHtcclxuICAgICAgICAgICAgaWYoY29udGFpbmVyIGluc3RhbmNlb2YgU2VyaWVHcm91cCl7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgc2VyaWUgZ3JvdXAgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgIHNlcmllc0dyb3Vwc0RhdGEucHVzaChjb250YWluZXIuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjb250YWluZXIgaW5zdGFuY2VvZiBTZXJpZUNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgICAgICAvLyBJbXBvcnQgZmlsZSBjYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllR3JvdXBzID0gY29udGFpbmVyLmdldENoaWxkcygpOyAvLyBzZXJpZSBncm91cHMgb2YgYW4gaW1wb3J0ZWQgZmlsZVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlcmllR3JvdXBzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXAgPSBzZXJpZUdyb3Vwc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihncm91cCBpbnN0YW5jZW9mIFNlcmllR3JvdXApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXNHcm91cHNEYXRhLnB1c2goZ3JvdXAuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZUdyb3Vwcywgc2VyaWVzR3JvdXBzRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgdG8gdGhpcyBzaWduYWwgY2F0ZWdvcnkgKGlkIGNhbiBub3QgYmUgY2hhbmdlZCBjdXJyZW50bHkpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsQ2F0ZWdvcnlcclxuICAgICAqL1xyXG4gICAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncyl7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLmV4cGFuZFN0YXRlID0gc2V0dGluZ3NPYmouZGF0YS5leHBhbmRTdGF0ZTtcclxuICAgICAgICBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllR3JvdXBzKS5mb3JFYWNoKGltcG9ydFNlcmllR3JvdXAgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlkID09IFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRJbXBvcnRlZCl7IC8vIGltcG9ydCBjYXRlZ29yeSBuZWVkcyBhZGRpdGlvbmFsbHkgY29udGFpbmVyKGZpbGUgY29udGFpbmVyKVxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5nZXRPckNyZWF0ZUNvbnRhaW5lcihpbXBvcnRTZXJpZUdyb3VwLmRhdGFbU2V0dGluZ0lkcy5Db250YWluZXJOYW1lXSxpbXBvcnRTZXJpZUdyb3VwLmRhdGFbU2V0dGluZ0lkcy5Db250YWluZXJJZF0sIGltcG9ydFNlcmllR3JvdXAuZGF0YVtTZXR0aW5nSWRzLkNvbnRhaW5lckV4cGFuZFN0YXRlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCBkZWZhdWx0IGdyb3VwIHRvIGNvbnRhaW5lclxyXG4gICAgICAgICAgICBsZXQgc2VyaWVHcm91cCA9IG5ldyBTZXJpZUdyb3VwKFwiXCIsXCJcIiwgMCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBncm91cCBkYXRhXHJcbiAgICAgICAgICAgIHNlcmllR3JvdXAuc2V0U2V0dGluZ3MoaW1wb3J0U2VyaWVHcm91cCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBmb3VuZCBzZXJpZUNvbnRhaW5lciBvciBjcmVhdHMgYW5kIGFkZHMgYSBuZXcgc2VyaWVDb250YWluZXIgd2l0aCB0aGUgZ2l2ZW4gY29udGFpbmVyTmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRhaW5lcklkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZFN0YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7SVNlcmllQ29udGFpbmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbENhdGVnb3J5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T3JDcmVhdGVDb250YWluZXIoY29udGFpbmVyTmFtZTogc3RyaW5nLCBjb250YWluZXJJZDogc3RyaW5nLCBleHBhbmRTdGF0ZTogYm9vbGVhbik6IElTZXJpZUNvbnRhaW5lcntcclxuICAgICAgICAvLyBTZWFyY2ggZm9yIGV4aXN0aW5nIGNvbnRhaW5lclxyXG4gICAgICAgIGxldCBmb3VuZENvbnRhaW5lciA9IHRoaXMuZ2V0U2VyaWVDb250YWluZXJCeUlkKGNvbnRhaW5lcklkKVxyXG4gICAgICAgIGlmKGZvdW5kQ29udGFpbmVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZENvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBjb250YWluZXJcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gbmV3IFNlcmllQ29udGFpbmVyKGNvbnRhaW5lck5hbWUsIGNvbnRhaW5lcklkLCBleHBhbmRTdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZUNvbnRhaW5lcihjb250YWluZXIsIC0xKTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSBuYW1lIGZvciB0aGUgZ2l2ZW4gY2F0ZWdvcnkgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbENhdGVnb3J5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldERpc3BsYXlOYW1lKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIGdldCBkaXNwbGF5bmFtZXMgb2YgdGhlIGNhdGVnb3J5XHJcbiAgICAgICAgaWYoaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCl7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlJlY2VudFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGlkID09IFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRVcGxvYWRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFsbCB1cGxvYWRlZCBmcm9tIFBMQ1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGlkID09IFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRJbXBvcnRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkltcG9ydGVkIGZyb20gZmlsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGlkID09IFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRDYWxjdWxhdGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQ2FsY3VsYXRlZCBzaWduYWxzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlVua25vd24gY2F0ZWdvcnkgaWRcIjtcclxuICAgIH1cclxufSJdfQ==
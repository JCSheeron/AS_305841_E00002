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
define(["require", "exports", "../dataModelInterface", "../../framework/events", "./eventSignalManagerDataChangedArgs", "./signalManagerCalculationInputData", "../../common/persistence/settings", "./signalManagerDataModelSettingIds", "./signalCategory", "./signalRoot", "../common/signal/serieContainer", "../dataModelBase", "./componentDefaultDefinition"], function (require, exports, dataModelInterface_1, events_1, eventSignalManagerDataChangedArgs_1, signalManagerCalculationInputData_1, settings_1, signalManagerDataModelSettingIds_1, signalCategory_1, signalRoot_1, serieContainer_1, dataModelBase_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSignalRemoved = /** @class */ (function (_super) {
        __extends(EventSignalRemoved, _super);
        function EventSignalRemoved() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSignalRemoved;
    }(events_1.TypedEvent));
    ;
    var SignalManagerDataModel = /** @class */ (function (_super) {
        __extends(SignalManagerDataModel, _super);
        function SignalManagerDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventSignalRemoved = new EventSignalRemoved();
            _this._supressUpdate = false;
            _this._editModeActive = false;
            _this._dataChangedHandler = function (sender, args) { return _this.onDataChanged(sender, args); };
            _this._settingsId = "categories";
            return _this;
        }
        Object.defineProperty(SignalManagerDataModel.prototype, "data", {
            get: function () {
                return this._signalManagerData.childs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerDataModel.prototype, "editModeActive", {
            /**
             * Returns the information if the datamodel provides data for the edit mode
             *
             * @type {boolean}
             * @memberof SignalManagerDataModel
             */
            get: function () {
                return this._editModeActive;
            },
            /**
             * Sets the information if the datamodel should provide the data for "edit mode" or "normal mode"
             *
             * @memberof SignalManagerDataModel
             */
            set: function (value) {
                this._editModeActive = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialization of the signalmanager datamodel
         *
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.initialize = function () {
            this._signalManagerData = new signalRoot_1.SignalRoot(this);
            this._signalManagerData.eventDataChanged.attach(this._dataChangedHandler);
            _super.prototype.initialize.call(this);
        };
        SignalManagerDataModel.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        SignalManagerDataModel.prototype.dispose = function () {
            // Bugfix to avoid use of not unbinded datamodel
            this["disposed"] = true;
            _super.prototype.dispose.call(this);
            this._signalManagerData.eventDataChanged.detach(this._dataChangedHandler);
        };
        /**
         * Removes all data from datamodel (excepting the root categories)
         *
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.clear = function () {
            this._supressUpdate = true;
            this._signalManagerData.clear();
            this._supressUpdate = false;
            this.raiseModelChangedEvent(new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.clearAll, ""));
        };
        SignalManagerDataModel.prototype.getComponentSettings = function (onlyModified) {
            var storingData = new Array();
            // get the settings from the categories
            for (var i = 0; i < this.data.length; i++) {
                var category = this.data[i];
                storingData.push(category.getSettings());
            }
            // add some component settings(e.g. categories with serie groups)
            this.component.setSetting(this._settingsId, storingData);
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SignalManagerDataModel.prototype.setComponentSettings = function (componentSettings) {
            // Remove all old data
            this.clear();
            // Set the series Provider
            this.seriesProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
            // Set the settings to the base class
            _super.prototype.setComponentSettings.call(this, componentSettings);
            // Set the settings to the categories
            var importCategories = this.component.getSetting(this._settingsId);
            if (importCategories != undefined) {
                for (var i = 0; i < importCategories.length; i++) {
                    var importCategory = importCategories[i];
                    var settings = settings_1.Settings.create(importCategory);
                    var category = this.getSignalCategory(settings.getValue(signalManagerDataModelSettingIds_1.SettingIds.CategoryId));
                    if (category != undefined) {
                        category.setSettings(importCategory);
                    }
                }
            }
        };
        /**
         * Adds a signal container to the datamodel (into the given category) // TODO: implement subcategory
         *
         * @param {ISerieContainer} serieContainer
         * @param {string} categoryId
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.addSerieContainer = function (serieContainer, categoryId) {
            for (var i = 0; i < this._signalManagerData.childs.length; i++) {
                if (this._signalManagerData.childs[i].id == categoryId) {
                    this._signalManagerData.childs[i].addSerieContainer(serieContainer, 0);
                }
            }
        };
        /**
         * Removes the given signal container from the datamodel
         *
         * @param {ISerieContainer} serieContainer
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.removeSerieContainer = function (serieContainer) {
            // Remove SerieContainer from category node ...
            this._signalManagerData.childs.forEach(function (category) {
                category.removeSerieContainer(serieContainer);
            });
        };
        /**
        * Adds a uploaded serie group to the datamodel(into recent category and creates a clone to all uploaded category )
        *
        * @param {ISerieGroup} serieGroup
        * @memberof SignalManagerDataModel
        */
        SignalManagerDataModel.prototype.addUploadedSerieGroup = function (serieGroup) {
            var subCategoryRecent = this.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent);
            var subCategoryAll = this.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdUploaded);
            if (subCategoryRecent != undefined && subCategoryAll != undefined) {
                var serieGroupClone = void 0;
                if (subCategoryRecent.getChilds().length > 0) { // Copy latest uploaded data to all if available
                    var latestSerieGroup = subCategoryRecent.getChilds()[0];
                    latestSerieGroup.mergeWithSerieGroup(serieGroup);
                    serieGroupClone = latestSerieGroup.clone();
                }
                else { // Add uploaded data to "recent" and clone to "all"
                    subCategoryRecent.addSerieContainer(serieGroup, -1);
                    serieGroupClone = this.getSerieGroupCloned(serieGroup);
                }
                if (serieGroupClone !== undefined) {
                    subCategoryAll.addSerieContainer(serieGroupClone, 0);
                }
                // TODO: Calculate after clone
            }
        };
        /**
         * Get a clone seriegroup just if it is not already in the 'all' folder
         *
         * @param {ISerieGroup} serieGroup
         * @returns {(ISerieGroup | undefined)}
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.getSerieGroupCloned = function (serieGroup) {
            var allCategory = this.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdUploaded);
            if (allCategory !== undefined) {
                var serieContainer = allCategory.getSerieContainerById(serieGroup.id);
                if (serieContainer !== undefined) { //SerieGroup already exists in 'All' Container.
                    return undefined;
                }
            }
            return serieGroup.clone();
        };
        /**
         * Returns the signal category with the given id // TODO: implement recursive, not only 2 levels
         *
         * @param {string} id
         * @returns {(ISignalCategory|undefined)}
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.getSignalCategory = function (id) {
            var signalCategory;
            this.data.forEach(function (child) {
                if (child.id == id) {
                    signalCategory = child;
                }
                else {
                    child.getChilds().forEach(function (subChild) {
                        if (subChild instanceof signalCategory_1.SignalCategory) {
                            if (subChild.id == id) {
                                signalCategory = subChild;
                            }
                        }
                    });
                }
            });
            return signalCategory;
        };
        /**
         * Removes the given serieNode
         *
         * @param {ISerieNode} serieNode
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.removeSerieNode = function (serieNode) {
            this._signalManagerData.childs.forEach(function (category) {
                category.removeSerieNode(serieNode);
            });
        };
        /**
         * Executed when some data was changed(signal or signalcontainer added or removed)
         *
         * @private
         * @param {*} sender
         * @param {EventSignalManagerDataChangedArgs} args
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.onDataChanged = function (sender, args) {
            var _this = this;
            if (args.action == eventSignalManagerDataChangedArgs_1.SignalManagerAction.remove) {
                if (args.data instanceof serieContainer_1.SerieContainer) {
                    args.data.getSeries().forEach(function (serie) {
                        _this.onSerieRemoved(serie);
                    });
                }
                else {
                    // send serie removed event
                    var serieNode = args.data;
                    if (serieNode != undefined && !(serieNode instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData)) {
                        this.onSerieRemoved(serieNode.serie);
                    }
                }
            }
            if (this._supressUpdate == false) {
                this.raiseModelChangedEvent(args);
            }
        };
        /**
         * Raises the model changed event
         *
         * @private
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.raiseModelChangedEvent = function (args) {
            // e.g. updates the signal manager widget
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, args.action, this.data);
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Raises the signal removed event
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.onSerieRemoved = function (serie) {
            if (serie != undefined) {
                this.eventSignalRemoved.raise(this, serie);
                if (this.seriesProvider != undefined) {
                    this.seriesProvider.remove(serie.id);
                }
            }
        };
        return SignalManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.SignalManagerDataModel = SignalManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBdUJBO1FBQWlDLHNDQUErQztRQUFoRjs7UUFBa0YsQ0FBQztRQUFELHlCQUFDO0lBQUQsQ0FBQyxBQUFuRixDQUFpQyxtQkFBVSxHQUF3QztJQUFBLENBQUM7SUFFcEY7UUFBNEMsMENBQWE7UUFBekQ7WUFBQSxxRUFxUkM7WUFuUkMsd0JBQWtCLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUcxRCxvQkFBYyxHQUFhLEtBQUssQ0FBQztZQUNqQyxxQkFBZSxHQUFZLEtBQUssQ0FBQztZQUVqQyx5QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQztZQUU5RCxpQkFBVyxHQUFHLFlBQVksQ0FBQzs7UUEyUTlDLENBQUM7UUF6UUMsc0JBQVcsd0NBQUk7aUJBQWY7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ3hDLENBQUM7OztXQUFBO1FBVUQsc0JBQVcsa0RBQWM7WUFOekI7Ozs7O2VBS0c7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzlCLENBQUM7WUFFRDs7OztlQUlHO2lCQUNILFVBQTBCLEtBQWM7Z0JBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQy9CLENBQUM7OztXQVRBO1FBV0Q7Ozs7V0FJRztRQUNILDJDQUFVLEdBQVY7WUFDRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFD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QUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDdEM7aUJBQ0Y7YUFDRjtZQUNELElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxLQUFLLEVBQUM7Z0JBQzlCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHVEQUFzQixHQUE5QixVQUErQixJQUF1QztZQUNwRSx5Q0FBeUM7WUFDekMsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLCtDQUFjLEdBQXRCLFVBQXVCLEtBQWlCO1lBQ3RDLElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRTNDLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxTQUFTLEVBQUM7b0JBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdEM7YUFDRjtRQUNILENBQUM7UUFDSCw2QkFBQztJQUFELENBQUMsQUFyUkQsQ0FBNEMsNkJBQWEsR0FxUnhEO0lBclJZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2lnbmFsQ2F0ZWdvcnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUgfSBmcm9tIFwiLi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MsIFNpZ25hbE1hbmFnZXJBY3Rpb24gfSBmcm9tIFwiLi9ldmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbFNldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi9zaWduYWxDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBTaWduYWxSb290IH0gZnJvbSBcIi4vc2lnbmFsUm9vdFwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuXHJcbmNsYXNzIEV2ZW50U2lnbmFsUmVtb3ZlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsIEJhc2VTZXJpZXM+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWx7XHJcbiAgICAgIFxyXG4gIGV2ZW50U2lnbmFsUmVtb3ZlZDogRXZlbnRTaWduYWxSZW1vdmVkID0gbmV3IEV2ZW50U2lnbmFsUmVtb3ZlZCgpO1xyXG4gIFxyXG4gIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJEYXRhITogU2lnbmFsUm9vdDtcclxuICBwcml2YXRlIF9zdXByZXNzVXBkYXRlOiAgYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2VkaXRNb2RlQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgXHJcbiAgcHJpdmF0ZSBfZGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncyk9PiB0aGlzLm9uRGF0YUNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IF9zZXR0aW5nc0lkID0gXCJjYXRlZ29yaWVzXCI7XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGluZm9ybWF0aW9uIGlmIHRoZSBkYXRhbW9kZWwgcHJvdmlkZXMgZGF0YSBmb3IgdGhlIGVkaXQgbW9kZVxyXG4gICAqXHJcbiAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGVkaXRNb2RlQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VkaXRNb2RlQWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgaW5mb3JtYXRpb24gaWYgdGhlIGRhdGFtb2RlbCBzaG91bGQgcHJvdmlkZSB0aGUgZGF0YSBmb3IgXCJlZGl0IG1vZGVcIiBvciBcIm5vcm1hbCBtb2RlXCJcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIHNldCBlZGl0TW9kZUFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZWRpdE1vZGVBY3RpdmUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemF0aW9uIG9mIHRoZSBzaWduYWxtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGEgPSBuZXcgU2lnbmFsUm9vdCh0aGlzKTtcclxuICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX2RhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCl7XHJcbiAgICAvLyBCdWdmaXggdG8gYXZvaWQgdXNlIG9mIG5vdCB1bmJpbmRlZCBkYXRhbW9kZWxcclxuICAgIHRoaXNbXCJkaXNwb3NlZFwiXSA9IHRydWU7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9kYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBkYXRhIGZyb20gZGF0YW1vZGVsIChleGNlcHRpbmcgdGhlIHJvb3QgY2F0ZWdvcmllcylcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgY2xlYXIoKXtcclxuICAgIHRoaXMuX3N1cHJlc3NVcGRhdGUgPSB0cnVlO1xyXG4gICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGEuY2xlYXIoKTtcclxuICAgIHRoaXMuX3N1cHJlc3NVcGRhdGUgPSBmYWxzZTtcclxuICAgIHRoaXMucmFpc2VNb2RlbENoYW5nZWRFdmVudChuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24uY2xlYXJBbGwsIFwiXCIpKTtcclxuICB9XHJcblxyXG4gIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgIGxldCBzdG9yaW5nRGF0YSA9IG5ldyBBcnJheTxJU2V0dGluZ3M+KCk7XHJcbiAgICAvLyBnZXQgdGhlIHNldHRpbmdzIGZyb20gdGhlIGNhdGVnb3JpZXNcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgY2F0ZWdvcnkgPSB0aGlzLmRhdGFbaV0gYXMgSVNpZ25hbENhdGVnb3J5O1xyXG4gICAgICBzdG9yaW5nRGF0YS5wdXNoKGNhdGVnb3J5LmdldFNldHRpbmdzKCkpO1xyXG4gICAgfVxyXG4gICAgLy8gYWRkIHNvbWUgY29tcG9uZW50IHNldHRpbmdzKGUuZy4gY2F0ZWdvcmllcyB3aXRoIHNlcmllIGdyb3VwcylcclxuICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcodGhpcy5fc2V0dGluZ3NJZCwgc3RvcmluZ0RhdGEpO1xyXG4gICAgcmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcbiAgfVxyXG4gICBcclxuICBzZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgIC8vIFJlbW92ZSBhbGwgb2xkIGRhdGFcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIFxyXG4gICAgLy8gU2V0IHRoZSBzZXJpZXMgUHJvdmlkZXJcclxuICAgIHRoaXMuc2VyaWVzUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU2VyaWVzUHJvdmlkZXJJZCkgYXMgSVNlcmllc1Byb3ZpZGVyO1xyXG5cclxuICAgIC8vIFNldCB0aGUgc2V0dGluZ3MgdG8gdGhlIGJhc2UgY2xhc3NcclxuICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKTtcclxuXHJcbiAgICAvLyBTZXQgdGhlIHNldHRpbmdzIHRvIHRoZSBjYXRlZ29yaWVzXHJcbiAgICBsZXQgaW1wb3J0Q2F0ZWdvcmllczogQXJyYXk8SVNldHRpbmdzPiA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcodGhpcy5fc2V0dGluZ3NJZCk7XHJcbiAgICBpZihpbXBvcnRDYXRlZ29yaWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgaW1wb3J0Q2F0ZWdvcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgbGV0IGltcG9ydENhdGVnb3J5OiBJU2V0dGluZ3MgPSBpbXBvcnRDYXRlZ29yaWVzW2ldO1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IFNldHRpbmdzLmNyZWF0ZShpbXBvcnRDYXRlZ29yeSk7XHJcbiAgICAgICAgbGV0IGNhdGVnb3J5ID0gdGhpcy5nZXRTaWduYWxDYXRlZ29yeShzZXR0aW5ncy5nZXRWYWx1ZShTZXR0aW5nSWRzLkNhdGVnb3J5SWQpKTtcclxuICAgICAgICBpZihjYXRlZ29yeSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgY2F0ZWdvcnkuc2V0U2V0dGluZ3MoaW1wb3J0Q2F0ZWdvcnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHNpZ25hbCBjb250YWluZXIgdG8gdGhlIGRhdGFtb2RlbCAoaW50byB0aGUgZ2l2ZW4gY2F0ZWdvcnkpIC8vIFRPRE86IGltcGxlbWVudCBzdWJjYXRlZ29yeVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IHNlcmllQ29udGFpbmVyXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5SWRcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGFkZFNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyOiBJU2VyaWVDb250YWluZXIsIGNhdGVnb3J5SWQ6IHN0cmluZyl7XHJcbiAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhLmNoaWxkc1tpXS5pZCA9PSBjYXRlZ29yeUlkKXtcclxuICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHNbaV0uYWRkU2VyaWVDb250YWluZXIoc2VyaWVDb250YWluZXIsIDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBzaWduYWwgY29udGFpbmVyIGZyb20gdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IHNlcmllQ29udGFpbmVyXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyKXtcclxuICAgIC8vIFJlbW92ZSBTZXJpZUNvbnRhaW5lciBmcm9tIGNhdGVnb3J5IG5vZGUgLi4uXHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XHJcbiAgICAgICAgY2F0ZWdvcnkucmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVDb250YWluZXIpO1xyXG4gICAgfSlcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgKiBBZGRzIGEgdXBsb2FkZWQgc2VyaWUgZ3JvdXAgdG8gdGhlIGRhdGFtb2RlbChpbnRvIHJlY2VudCBjYXRlZ29yeSBhbmQgY3JlYXRlcyBhIGNsb25lIHRvIGFsbCB1cGxvYWRlZCBjYXRlZ29yeSApXHJcbiAgKlxyXG4gICogQHBhcmFtIHtJU2VyaWVHcm91cH0gc2VyaWVHcm91cFxyXG4gICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAqL1xyXG4gIGFkZFVwbG9hZGVkU2VyaWVHcm91cChzZXJpZUdyb3VwOiBJU2VyaWVHcm91cCkge1xyXG4gICAgbGV0IHN1YkNhdGVnb3J5UmVjZW50ID0gdGhpcy5nZXRTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KTtcclxuICAgIGxldCBzdWJDYXRlZ29yeUFsbCA9IHRoaXMuZ2V0U2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFVwbG9hZGVkKTtcclxuICAgIGlmIChzdWJDYXRlZ29yeVJlY2VudCAhPSB1bmRlZmluZWQgJiYgc3ViQ2F0ZWdvcnlBbGwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXBDbG9uZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoc3ViQ2F0ZWdvcnlSZWNlbnQuZ2V0Q2hpbGRzKCkubGVuZ3RoID4gMCkgeyAvLyBDb3B5IGxhdGVzdCB1cGxvYWRlZCBkYXRhIHRvIGFsbCBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgbGV0IGxhdGVzdFNlcmllR3JvdXAgPSBzdWJDYXRlZ29yeVJlY2VudC5nZXRDaGlsZHMoKVswXSBhcyBJU2VyaWVHcm91cDtcclxuICAgICAgICAgICAgbGF0ZXN0U2VyaWVHcm91cC5tZXJnZVdpdGhTZXJpZUdyb3VwKHNlcmllR3JvdXApO1xyXG4gICAgICAgICAgICBzZXJpZUdyb3VwQ2xvbmUgPSBsYXRlc3RTZXJpZUdyb3VwLmNsb25lKCkgYXMgSVNlcmllR3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyAvLyBBZGQgdXBsb2FkZWQgZGF0YSB0byBcInJlY2VudFwiIGFuZCBjbG9uZSB0byBcImFsbFwiXHJcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5UmVjZW50LmFkZFNlcmllQ29udGFpbmVyKHNlcmllR3JvdXAsIC0xKTtcclxuICAgICAgICAgICAgc2VyaWVHcm91cENsb25lID0gdGhpcy5nZXRTZXJpZUdyb3VwQ2xvbmVkKHNlcmllR3JvdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlcmllR3JvdXBDbG9uZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBzdWJDYXRlZ29yeUFsbC5hZGRTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwQ2xvbmUsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBUT0RPOiBDYWxjdWxhdGUgYWZ0ZXIgY2xvbmVcclxuICAgIH0gXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYSBjbG9uZSBzZXJpZWdyb3VwIGp1c3QgaWYgaXQgaXMgbm90IGFscmVhZHkgaW4gdGhlICdhbGwnIGZvbGRlclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJU2VyaWVHcm91cH0gc2VyaWVHcm91cFxyXG4gICAqIEByZXR1cm5zIHsoSVNlcmllR3JvdXAgfCB1bmRlZmluZWQpfVxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgZ2V0U2VyaWVHcm91cENsb25lZChzZXJpZUdyb3VwOiBJU2VyaWVHcm91cCk6IElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCBhbGxDYXRlZ29yeSA9IHRoaXMuZ2V0U2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFVwbG9hZGVkKTtcclxuICAgIGlmIChhbGxDYXRlZ29yeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCBzZXJpZUNvbnRhaW5lciA9IGFsbENhdGVnb3J5LmdldFNlcmllQ29udGFpbmVyQnlJZChzZXJpZUdyb3VwLmlkKTtcclxuICAgICAgaWYgKHNlcmllQ29udGFpbmVyICE9PSB1bmRlZmluZWQpIHsgLy9TZXJpZUdyb3VwIGFscmVhZHkgZXhpc3RzIGluICdBbGwnIENvbnRhaW5lci5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VyaWVHcm91cC5jbG9uZSgpIGFzIElTZXJpZUdyb3VwO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHNpZ25hbCBjYXRlZ29yeSB3aXRoIHRoZSBnaXZlbiBpZCAvLyBUT0RPOiBpbXBsZW1lbnQgcmVjdXJzaXZlLCBub3Qgb25seSAyIGxldmVsc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICogQHJldHVybnMgeyhJU2lnbmFsQ2F0ZWdvcnl8dW5kZWZpbmVkKX1cclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGdldFNpZ25hbENhdGVnb3J5KGlkOiBzdHJpbmcpOiBJU2lnbmFsQ2F0ZWdvcnl8dW5kZWZpbmVke1xyXG4gICAgbGV0IHNpZ25hbENhdGVnb3J5OiBJU2lnbmFsQ2F0ZWdvcnl8dW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kYXRhLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICBpZihjaGlsZC5pZCA9PSBpZCl7XHJcbiAgICAgICAgc2lnbmFsQ2F0ZWdvcnkgPSBjaGlsZDtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGNoaWxkLmdldENoaWxkcygpLmZvckVhY2goc3ViQ2hpbGQgPT4ge1xyXG4gICAgICAgICAgaWYoc3ViQ2hpbGQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSl7XHJcbiAgICAgICAgICAgIGlmKHN1YkNoaWxkLmlkID09IGlkKXtcclxuICAgICAgICAgICAgICBzaWduYWxDYXRlZ29yeSA9IHN1YkNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNpZ25hbENhdGVnb3J5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gc2VyaWVOb2RlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lTZXJpZU5vZGV9IHNlcmllTm9kZVxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XHJcbiAgICAgIGNhdGVnb3J5LnJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGUpO1xyXG4gICAgfSkgICAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlZCB3aGVuIHNvbWUgZGF0YSB3YXMgY2hhbmdlZChzaWduYWwgb3Igc2lnbmFsY29udGFpbmVyIGFkZGVkIG9yIHJlbW92ZWQpXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICogQHBhcmFtIHtFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3N9IGFyZ3NcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3M6IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICBpZihhcmdzLmFjdGlvbiA9PSBTaWduYWxNYW5hZ2VyQWN0aW9uLnJlbW92ZSl7XHJcbiAgICAgIGlmKGFyZ3MuZGF0YSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICBhcmdzLmRhdGEuZ2V0U2VyaWVzKCkuZm9yRWFjaChzZXJpZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9uU2VyaWVSZW1vdmVkKHNlcmllKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIC8vIHNlbmQgc2VyaWUgcmVtb3ZlZCBldmVudFxyXG4gICAgICAgIGxldCBzZXJpZU5vZGUgPSBhcmdzLmRhdGE7XHJcbiAgICAgICAgaWYoc2VyaWVOb2RlICE9IHVuZGVmaW5lZCAmJiAhKHNlcmllTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSkpe1xyXG4gICAgICAgICAgdGhpcy5vblNlcmllUmVtb3ZlZChzZXJpZU5vZGUuc2VyaWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYodGhpcy5fc3VwcmVzc1VwZGF0ZSA9PSBmYWxzZSl7XHJcbiAgICAgIHRoaXMucmFpc2VNb2RlbENoYW5nZWRFdmVudChhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJhaXNlcyB0aGUgbW9kZWwgY2hhbmdlZCBldmVudFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmFpc2VNb2RlbENoYW5nZWRFdmVudChhcmdzOiBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgLy8gZS5nLiB1cGRhdGVzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXRcclxuICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIGFyZ3MuYWN0aW9uLCB0aGlzLmRhdGEpO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJhaXNlcyB0aGUgc2lnbmFsIHJlbW92ZWQgZXZlbnRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlcmllUmVtb3ZlZChzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgdGhpcy5ldmVudFNpZ25hbFJlbW92ZWQucmFpc2UodGhpcywgc2VyaWUpO1xyXG4gICAgICBcclxuICAgICAgaWYodGhpcy5zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuc2VyaWVzUHJvdmlkZXIucmVtb3ZlKHNlcmllLmlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==
define(["require", "exports", "../../../common/componentBase/componentBase", "../../common/series/YTSeries", "../../common/series/FFTSeries", "../../common/series/XYSeries", "./componentDefaultDefinition", "../../../common/persistence/persistDataProvider", "../../common/series/settingIds"], function (require, exports, componentBase_1, YTSeries_1, FFTSeries_1, XYSeries_1, componentDefaultDefinition_1, persistDataProvider_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeriesProvider = /** @class */ (function () {
        /**
         * Creates an instance of SeriesProvider
         * @memberof SeriesProvider
         */
        function SeriesProvider() {
            var _this = this;
            this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            this._series = new Map();
            this._settingSeriesIds = "seriesIds";
            this._settingSeries = "series";
            this.component = new componentBase_1.ComponentBase(undefined, this);
            // TODO: create initialize method(but call only once in component factory)
            //this.initializeComponent();
        }
        /**
         * gets a singleton instance of SeriesProvider
         * (TODO: Remove Singleton to have the possibility to use more SerieProviders in parallel(for different Trace analyses))
         *
         * @readonly
         * @type {ISeriesProvider}
         * @memberof SeriesProvider
         */
        SeriesProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new SeriesProvider();
            return this._instance;
        };
        /**
         * Disposes the SeriesProvider
         *
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.dispose = function () {
            this._series.clear();
            SeriesProvider._instance = undefined;
        };
        /**
         * Clears all the data of the SeriesProvider
         *
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.clear = function () {
            this._series.clear();
        };
        /**
         * Returns the current ComponentSettings
         *
         * @returns {ComponentSettings}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getComponentSettings = function (onlyModified) {
            var series = new Array();
            this._series.forEach(function (serie) {
                series.push(serie.persistID);
            });
            if (onlyModified == false) {
                var seriesObjects_1 = new Array();
                // Only list of series should be exported, not the serie data
                this._series.forEach(function (serie) {
                    seriesObjects_1.push(serie.getSettings());
                });
                this.component.setSetting(this._settingSeries, seriesObjects_1);
            }
            else {
                this.component.setSetting(this._settingSeries, undefined);
            }
            this.component.setSetting(this._settingSeriesIds, series);
            return this.component.getComponentSettings(onlyModified);
        };
        /**
         * Sets the given ComponentSettings
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.setComponentSettings = function (settings) {
            var _this = this;
            this.clear();
            this.component.setComponentSettings(settings);
            if (settings == undefined) {
                return;
            }
            var seriesSettingsObjects = this.component.getSetting(this._settingSeries);
            if (seriesSettingsObjects != undefined) {
                // if series informations are available add to persisting data
                seriesSettingsObjects.forEach(function (seriesSettingsObject) {
                    persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(_this.getSeriesPersistingId(seriesSettingsObject.data[settingIds_1.SettingIds.SeriesId]), seriesSettingsObject);
                });
                // Clear internal series list because the list will be created with the series list info from the given settings
                this.clear();
            }
            var seriesIds = this.component.getSetting(this._settingSeriesIds);
            if (seriesIds != undefined) {
                seriesIds.forEach(function (serieID) {
                    var serie = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(serieID);
                    //Workaround for import problem with mce files where series are not stored seperatly
                    var newSerie;
                    if (serie == undefined) {
                        newSerie = _this.createSerie(serieID);
                    }
                    else {
                        newSerie = _this.createSerie(serie);
                    }
                    if (newSerie != undefined) {
                        _this._series.set(newSerie.id, newSerie);
                    }
                    else {
                        console.error("Serie with the following id could not be created: " + serieID);
                    }
                });
            }
        };
        /**
         * Returns the serie id which should be used for persisting a serie object
         *
         * @public
         * @param {string} serieID
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getSeriesPersistingId = function (serieID) {
            return SeriesProvider.getSeriesPersistingIdForComponent(serieID, this.component.id);
        };
        /**
         * Returns the serie id which should be used for persisting or export/import a serie object for the given component id
         *
         * @static
         * @param {string} serieID
         * @param {string} componentID
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.getSeriesPersistingIdForComponent = function (serieID, componentID) {
            return componentID + "_series_" + serieID;
        };
        /**
         * Initializes the component of this SeriesProvider (e.g. load component settings if found)
         *
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        SeriesProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
        };
        SeriesProvider.prototype.initialized = function () {
        };
        /**
         * Returns a unique id for a new serie
         *
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getUniqueId = function () {
            for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
                var id = i.toString();
                if (this._series.has(id) == false) {
                    return id;
                }
            }
            console.error("No unique id for serie available!");
            return "";
        };
        /**
         * Returns a unique id for a new calculation
         *
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getUniqueCalculationId = function () {
            var usedIds = new Array();
            this._series.forEach(function (serie) {
                if (serie.calculationDataInfo != undefined) {
                    usedIds.push(serie.calculationDataInfo.uniqueId);
                }
            });
            for (var i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
                var id = i.toString();
                if (usedIds.includes(id) == false) {
                    return id;
                }
            }
            console.error("No unique calculation id for serie available!");
            return "";
        };
        /**
         * Returns html information(e.g img, svg, ...) with the icons for a series(main icon + overlays)
         *
         * @param {BaseSeries} series
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getIcon = function (series) {
            var seriesIconProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesIconProviderId);
            if (seriesIconProvider != undefined) {
                return seriesIconProvider.getIcon(series);
            }
            return "";
        };
        /**
         * Returns a specific icon for series (e.g. only a single overlay icon)
         *
         * @param {string} svgName (e.g. "autoUpdatedOverlay" or "exclamationOverlay")
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getSpecificIcon = function (svgName) {
            var seriesIconProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesIconProviderId);
            if (seriesIconProvider != undefined) {
                return seriesIconProvider.getSvgPath(svgName);
            }
            return "";
        };
        /**
         * Adds the given serie with the id of the serie to the SeriesProvider
         *
         * @param {BaseSeries} serie
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.add = function (serie) {
            if (this._series.has(serie.id) == true) {
                console.error("Serie with the given id already in serie provider! => id: " + serie.id);
            }
            this._series.set(serie.id, serie);
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(serie.persistID, serie.getSettings());
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.component.id, this.getComponentSettings(true));
            serie.eventDataChanged.attach(this._serieDataChangedHandler);
        };
        /**
         * Updates the data of an existing serie
         *
         * @param {BaseSeries} serie
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.onSerieDataChanged = function (serie, args) {
            if (this._series != undefined && this._series.has(serie.id) == false) {
                console.error("Serie with the given id is not set in the series provider! => id: " + serie.id);
            }
            this._series.set(serie.id, serie);
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(serie.persistID, serie.getSettings());
        };
        /**
         * Removes the serie with the given id from the SeriesProvider
         *
         * @param {string} id
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.remove = function (id, disposeSeries) {
            if (disposeSeries === void 0) { disposeSeries = true; }
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.getSeriesPersistingId(id), undefined);
            if (disposeSeries) {
                var series = this._series.get(id);
                if (series != undefined) {
                    series.eventDataChanged.detach(this._serieDataChangedHandler);
                    series.dispose();
                }
            }
            this._series.delete(id);
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.component.id, this.getComponentSettings(true));
        };
        /**
         * Returns the serie for the given id
         *
         * @param {(string|undefined)} id
         * @returns {(BaseSeries|undefined)}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.get = function (id) {
            if (id == undefined) {
                return undefined;
            }
            return this._series.get(id);
        };
        /**
         * Creates a serie for the given settings
         *
         * @param {ISettings} settings
         * @returns {(BaseSeries|undefined)}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.createSerie = function (settings) {
            // TODO: Handle with settings object factory
            var serie;
            if (settings.type == "YTSeries") {
                serie = YTSeries_1.YTSeries.create(settings, this);
            }
            else if (settings.type == "FFTSeries") {
                serie = FFTSeries_1.FFTSeries.create(settings, this);
            }
            else if (settings.type == "XYSeries") {
                serie = XYSeries_1.XYSeries.create(settings, this);
            }
            if (serie != undefined) {
                this.add(serie);
            }
            return serie;
        };
        return SeriesProvider;
    }());
    exports.SeriesProvider = SeriesProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBY0E7UUEwQkk7OztXQUdHO1FBQ0g7WUFBQSxpQkFHQztZQS9CTyw2QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBQ25GLFlBQU8sR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVwQyxzQkFBaUIsR0FBRyxXQUFXLENBQUM7WUFDaEMsbUJBQWMsR0FBRyxRQUFRLENBQUM7WUFrQnBDLGNBQVMsR0FBa0IsSUFBSSw2QkFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQU9qRSwwRUFBMEU7WUFDMUUsNkJBQTZCO1FBQ2pDLENBQUM7UUF0QkQ7Ozs7Ozs7V0FPRztRQUNXLDBCQUFXLEdBQXpCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3hFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO1FBYUQ7Ozs7V0FJRztRQUNJLGdDQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLGNBQWMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3pDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksOEJBQUssR0FBWjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksNkNBQW9C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R0FBbEIsVUFBbUIsUUFBbUI7WUFDbEMsNENBQTRDO1lBQzVDLElBQUksS0FBNEIsQ0FBQztZQUVqQyxJQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksVUFBVSxFQUFDO2dCQUMzQixLQUFLLEdBQUksbUJBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVDO2lCQUNJLElBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxXQUFXLEVBQUM7Z0JBQ2pDLEtBQUssR0FBSSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDN0M7aUJBQ0ksSUFBRyxRQUFRLENBQUMsSUFBSSxJQUFJLFVBQVUsRUFBQztnQkFDaEMsS0FBSyxHQUFJLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM1QztZQUVELElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQjtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUFqVkQsSUFpVkM7SUFqVlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4vc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZVwiO1xyXG5pbXBvcnQgeyBZVFNlcmllcyB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzL1lUU2VyaWVzXCI7XHJcbmltcG9ydCB7IEZGVFNlcmllcyB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzL0ZGVFNlcmllc1wiO1xyXG5pbXBvcnQgeyBYWVNlcmllcyB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzL1hZU2VyaWVzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgSVNlcmllc0ljb25Qcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi93aWRnZXRzL2NvbW1vbi9pbnRlcmZhY2VzL3Nlcmllc0ljb25Qcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllcy9zZXR0aW5nSWRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VyaWVzUHJvdmlkZXIgaW1wbGVtZW50cyBJU2VyaWVzUHJvdmlkZXJ7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBfc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfc2VyaWVzOiBNYXA8c3RyaW5nLCBCYXNlU2VyaWVzPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zZXR0aW5nU2VyaWVzSWRzID0gXCJzZXJpZXNJZHNcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NldHRpbmdTZXJpZXMgPSBcInNlcmllc1wiO1xyXG4gICAgXHJcbiAgICAvLyBob2xkcyBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNlcmllc1Byb3ZpZGVyfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqIChUT0RPOiBSZW1vdmUgU2luZ2xldG9uIHRvIGhhdmUgdGhlIHBvc3NpYmlsaXR5IHRvIHVzZSBtb3JlIFNlcmllUHJvdmlkZXJzIGluIHBhcmFsbGVsKGZvciBkaWZmZXJlbnQgVHJhY2UgYW5hbHlzZXMpKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0lTZXJpZXNQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IElTZXJpZXNQcm92aWRlciB7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlIDogbmV3IFNlcmllc1Byb3ZpZGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb21wb25lbnQ6IENvbXBvbmVudEJhc2UgPSBuZXcgQ29tcG9uZW50QmFzZSh1bmRlZmluZWQsIHRoaXMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gVE9ETzogY3JlYXRlIGluaXRpYWxpemUgbWV0aG9kKGJ1dCBjYWxsIG9ubHkgb25jZSBpbiBjb21wb25lbnQgZmFjdG9yeSlcclxuICAgICAgICAvL3RoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzLmNsZWFyKCk7XHJcbiAgICAgICAgU2VyaWVzUHJvdmlkZXIuX2luc3RhbmNlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGFsbCB0aGUgZGF0YSBvZiB0aGUgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyKCl7XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5mb3JFYWNoKChzZXJpZSkgPT4ge1xyXG4gICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZS5wZXJzaXN0SUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKG9ubHlNb2RpZmllZCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNPYmplY3RzID0gbmV3IEFycmF5PElTZXR0aW5ncz4oKTtcclxuICAgICAgICAgICAgLy8gT25seSBsaXN0IG9mIHNlcmllcyBzaG91bGQgYmUgZXhwb3J0ZWQsIG5vdCB0aGUgc2VyaWUgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJpZXMuZm9yRWFjaCgoc2VyaWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlcmllc09iamVjdHMucHVzaChzZXJpZS5nZXRTZXR0aW5ncygpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcodGhpcy5fc2V0dGluZ1Nlcmllcywgc2VyaWVzT2JqZWN0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcodGhpcy5fc2V0dGluZ1NlcmllcywgdW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyh0aGlzLl9zZXR0aW5nU2VyaWVzSWRzLCBzZXJpZXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gQ29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfSBzZXR0aW5nc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbiAgICAgICAgaWYoc2V0dGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlcmllc1NldHRpbmdzT2JqZWN0czogQXJyYXk8SVNldHRpbmdzPiA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcodGhpcy5fc2V0dGluZ1Nlcmllcyk7XHJcbiAgICAgICAgaWYoc2VyaWVzU2V0dGluZ3NPYmplY3RzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGlmIHNlcmllcyBpbmZvcm1hdGlvbnMgYXJlIGF2YWlsYWJsZSBhZGQgdG8gcGVyc2lzdGluZyBkYXRhXHJcbiAgICAgICAgICAgIHNlcmllc1NldHRpbmdzT2JqZWN0cy5mb3JFYWNoKHNlcmllc1NldHRpbmdzT2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHRoaXMuZ2V0U2VyaWVzUGVyc2lzdGluZ0lkKHNlcmllc1NldHRpbmdzT2JqZWN0LmRhdGFbU2V0dGluZ0lkcy5TZXJpZXNJZF0pLCBzZXJpZXNTZXR0aW5nc09iamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBDbGVhciBpbnRlcm5hbCBzZXJpZXMgbGlzdCBiZWNhdXNlIHRoZSBsaXN0IHdpbGwgYmUgY3JlYXRlZCB3aXRoIHRoZSBzZXJpZXMgbGlzdCBpbmZvIGZyb20gdGhlIGdpdmVuIHNldHRpbmdzXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNlcmllc0lkczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcodGhpcy5fc2V0dGluZ1Nlcmllc0lkcyk7XHJcbiAgICAgICAgaWYoc2VyaWVzSWRzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNlcmllc0lkcy5mb3JFYWNoKHNlcmllSUQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllID0gUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldERhdGFXaXRoSWQoc2VyaWVJRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Xb3JrYXJvdW5kIGZvciBpbXBvcnQgcHJvYmxlbSB3aXRoIG1jZSBmaWxlcyB3aGVyZSBzZXJpZXMgYXJlIG5vdCBzdG9yZWQgc2VwZXJhdGx5XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U2VyaWU7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcmllID0gdGhpcy5jcmVhdGVTZXJpZShzZXJpZUlEIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcmllID0gdGhpcy5jcmVhdGVTZXJpZShzZXJpZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobmV3U2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZXMuc2V0KG5ld1NlcmllLmlkLCBuZXdTZXJpZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXJpZSB3aXRoIHRoZSBmb2xsb3dpbmcgaWQgY291bGQgbm90IGJlIGNyZWF0ZWQ6IFwiICsgc2VyaWVJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcmllIGlkIHdoaWNoIHNob3VsZCBiZSB1c2VkIGZvciBwZXJzaXN0aW5nIGEgc2VyaWUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlcmllSURcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNlcmllc1BlcnNpc3RpbmdJZChzZXJpZUlEOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFNlcmllc1Byb3ZpZGVyLmdldFNlcmllc1BlcnNpc3RpbmdJZEZvckNvbXBvbmVudChzZXJpZUlELCB0aGlzLmNvbXBvbmVudC5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSBpZCB3aGljaCBzaG91bGQgYmUgdXNlZCBmb3IgcGVyc2lzdGluZyBvciBleHBvcnQvaW1wb3J0IGEgc2VyaWUgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50IGlkXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlcmllSURcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRJRFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNlcmllc1BlcnNpc3RpbmdJZEZvckNvbXBvbmVudChzZXJpZUlEOiBzdHJpbmcsIGNvbXBvbmVudElEOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudElEICsgXCJfc2VyaWVzX1wiICsgc2VyaWVJRDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQgb2YgdGhpcyBTZXJpZXNQcm92aWRlciAoZS5nLiBsb2FkIGNvbXBvbmVudCBzZXR0aW5ncyBpZiBmb3VuZClcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemUoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5sb2FkQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQoKXtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgYSBuZXcgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRVbmlxdWVJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWVzLmhhcyhpZCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyB1bmlxdWUgaWQgZm9yIHNlcmllIGF2YWlsYWJsZSFcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGEgbmV3IGNhbGN1bGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VW5pcXVlQ2FsY3VsYXRpb25JZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVzZWRJZHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5mb3JFYWNoKChzZXJpZSkgPT4ge1xyXG4gICAgICAgICAgICBpZihzZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB1c2VkSWRzLnB1c2goc2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mby51bmlxdWVJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IobGV0IGkgPTE7IGkgPCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gaS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZih1c2VkSWRzLmluY2x1ZGVzKGlkKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIHVuaXF1ZSBjYWxjdWxhdGlvbiBpZCBmb3Igc2VyaWUgYXZhaWxhYmxlIVwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBodG1sIGluZm9ybWF0aW9uKGUuZyBpbWcsIHN2ZywgLi4uKSB3aXRoIHRoZSBpY29ucyBmb3IgYSBzZXJpZXMobWFpbiBpY29uICsgb3ZlcmxheXMpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0SWNvbihzZXJpZXM6IEJhc2VTZXJpZXMpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHNlcmllc0ljb25Qcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TZXJpZXNJY29uUHJvdmlkZXJJZCkgYXMgSVNlcmllc0ljb25Qcm92aWRlcjtcclxuICAgICAgICBpZihzZXJpZXNJY29uUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmllc0ljb25Qcm92aWRlci5nZXRJY29uKHNlcmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHNwZWNpZmljIGljb24gZm9yIHNlcmllcyAoZS5nLiBvbmx5IGEgc2luZ2xlIG92ZXJsYXkgaWNvbilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3ZnTmFtZSAoZS5nLiBcImF1dG9VcGRhdGVkT3ZlcmxheVwiIG9yIFwiZXhjbGFtYXRpb25PdmVybGF5XCIpXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGdldFNwZWNpZmljSWNvbihzdmdOYW1lOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHNlcmllc0ljb25Qcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TZXJpZXNJY29uUHJvdmlkZXJJZCkgYXMgSVNlcmllc0ljb25Qcm92aWRlcjtcclxuICAgICAgICBpZihzZXJpZXNJY29uUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmllc0ljb25Qcm92aWRlci5nZXRTdmdQYXRoKHN2Z05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIHNlcmllIHdpdGggdGhlIGlkIG9mIHRoZSBzZXJpZSB0byB0aGUgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZChzZXJpZTogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgaWYodGhpcy5fc2VyaWVzLmhhcyhzZXJpZS5pZCkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXJpZSB3aXRoIHRoZSBnaXZlbiBpZCBhbHJlYWR5IGluIHNlcmllIHByb3ZpZGVyISA9PiBpZDogXCIgKyBzZXJpZS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5zZXQoc2VyaWUuaWQsIHNlcmllKTtcclxuICAgICAgICBcclxuICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZChzZXJpZS5wZXJzaXN0SUQsIHNlcmllLmdldFNldHRpbmdzKCkpO1xyXG4gICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHRoaXMuY29tcG9uZW50LmlkLCB0aGlzLmdldENvbXBvbmVudFNldHRpbmdzKHRydWUpKTtcclxuICAgICAgICBcclxuICAgICAgICBzZXJpZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlcilcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkYXRhIG9mIGFuIGV4aXN0aW5nIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25TZXJpZURhdGFDaGFuZ2VkKHNlcmllOiBCYXNlU2VyaWVzLCBhcmdzKXtcclxuICAgICAgICBpZih0aGlzLl9zZXJpZXMgIT0gdW5kZWZpbmVkICYmIHRoaXMuX3Nlcmllcy5oYXMoc2VyaWUuaWQpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNlcmllIHdpdGggdGhlIGdpdmVuIGlkIGlzIG5vdCBzZXQgaW4gdGhlIHNlcmllcyBwcm92aWRlciEgPT4gaWQ6IFwiICsgc2VyaWUuaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2VyaWVzLnNldChzZXJpZS5pZCwgc2VyaWUpO1xyXG4gICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHNlcmllLnBlcnNpc3RJRCwgc2VyaWUuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgc2VyaWUgd2l0aCB0aGUgZ2l2ZW4gaWQgZnJvbSB0aGUgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGlkOiBzdHJpbmcsIGRpc3Bvc2VTZXJpZXMgPSB0cnVlKXtcclxuICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZCh0aGlzLmdldFNlcmllc1BlcnNpc3RpbmdJZChpZCksIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZGlzcG9zZVNlcmllcyl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSB0aGlzLl9zZXJpZXMuZ2V0KGlkKTtcclxuICAgICAgICAgICAgaWYoc2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpXHJcbiAgICAgICAgICAgICAgICBzZXJpZXMuZGlzcG9zZSgpOyAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zZXJpZXMuZGVsZXRlKGlkKTtcclxuICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZCh0aGlzLmNvbXBvbmVudC5pZCwgdGhpcy5nZXRDb21wb25lbnRTZXR0aW5ncyh0cnVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSBmb3IgdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfHVuZGVmaW5lZCl9IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7KEJhc2VTZXJpZXN8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0KGlkOiBzdHJpbmd8dW5kZWZpbmVkKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgaWYoaWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlcmllcy5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHNlcmllIGZvciB0aGUgZ2l2ZW4gc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm5zIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVTZXJpZShzZXR0aW5nczogSVNldHRpbmdzKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgLy8gVE9ETzogSGFuZGxlIHdpdGggc2V0dGluZ3Mgb2JqZWN0IGZhY3RvcnlcclxuICAgICAgICBsZXQgc2VyaWUgOiBCYXNlU2VyaWVzfHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PSBcIllUU2VyaWVzXCIpe1xyXG4gICAgICAgICAgICBzZXJpZSA9ICBZVFNlcmllcy5jcmVhdGUoc2V0dGluZ3MsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHNldHRpbmdzLnR5cGUgPT0gXCJGRlRTZXJpZXNcIil7XHJcbiAgICAgICAgICAgIHNlcmllID0gIEZGVFNlcmllcy5jcmVhdGUoc2V0dGluZ3MsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHNldHRpbmdzLnR5cGUgPT0gXCJYWVNlcmllc1wiKXtcclxuICAgICAgICAgICAgc2VyaWUgPSAgWFlTZXJpZXMuY3JlYXRlKHNldHRpbmdzLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKHNlcmllKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpZTtcclxuICAgIH1cclxufSJdfQ==
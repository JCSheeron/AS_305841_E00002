define(["require", "exports", "./package", "./enum/dataTypeEnum", "./enum/objectTypeEnum", "./enum/additionalMetaKeys", "../../models/common/series/baseSeriesPackageAdapter", "../../models/common/series/ytSeriesPackageAdapter", "../../models/common/series/xySeriesPackageAdapter", "../../models/common/series/fftSeriesPackageAdapter", "../../models/common/signal/signalPackageAdapter", "../../models/common/calculatorProvider/calculationDataInfoPackageAdapter", "../../models/signalManagerDataModel/serieGroupPackageAdapter", "../../models/signalManagerDataModel/categoryPackageAdapter", "../../models/common/seriesProvider/seriesProviderPackageAdapter", "../../models/signalManagerDataModel/signalManagerDataModelPackageAdapter", "../../models/chartManagerDataModel/scalesPackageAdapter", "../../models/chartManagerDataModel/chartManagerChartPackageAdapter", "../../models/chartManagerDataModel/chartManagerDataModelPackageAdapter", "../../widgets/common/states/cursorStatesPackageAdapter"], function (require, exports, package_1, dataTypeEnum_1, objectTypeEnum_1, additionalMetaKeys_1, baseSeriesPackageAdapter_1, ytSeriesPackageAdapter_1, xySeriesPackageAdapter_1, fftSeriesPackageAdapter_1, signalPackageAdapter_1, calculationDataInfoPackageAdapter_1, serieGroupPackageAdapter_1, categoryPackageAdapter_1, seriesProviderPackageAdapter_1, signalManagerDataModelPackageAdapter_1, scalesPackageAdapter_1, chartManagerChartPackageAdapter_1, chartManagerDataModelPackageAdapter_1, cursorStatesPackageAdapter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportContainer = /** @class */ (function () {
        /**
         * Creates an instance of ExportContainer.
         * @memberof ExportContainer
         */
        function ExportContainer() {
            this._container = new Array();
        }
        /**
         * Creates an ExportContainer from an array containing IPackage data
         *
         * @static
         * @param {Array<IPackage>} packages
         * @returns {ExportContainer}
         * @memberof ExportContainer
         */
        ExportContainer.fromPackages = function (packages) {
            var container = new ExportContainer();
            container._container = packages;
            return container;
        };
        /**
         * Creates an ExportContainer from a string containing a JSON representing an array containing IPackage data.
         *
         * @static
         * @param {string} str
         * @returns {ExportContainer}
         * @memberof ExportContainer
         */
        ExportContainer.fromJson = function (str) {
            var container = new ExportContainer();
            var parsedData = JSON.parse(str, package_1.Package.reviver);
            if (Array.isArray(parsedData)) {
                container._container = parsedData;
            }
            else {
                container = ExportContainer.fromLegacyFormat(parsedData);
            }
            return container;
        };
        /**
         * Transforms legacy mce export format to an array containing IPackage data
         *
         * @private
         * @static
         * @param {Object} parsedData
         * @returns {Array<IPackage>}
         * @memberof ExportContainer
         */
        ExportContainer.fromLegacyFormat = function (parsedData) {
            var container = new ExportContainer();
            if (parsedData["SignalManagerDataModel"] !== undefined) {
                container.addSettings(parsedData["SignalManagerDataModel"], "SignalManagerDataModel");
            }
            if (parsedData["SeriesProvider"] !== undefined) {
                container.addSettings(parsedData["SeriesProvider"], "SeriesProvider");
            }
            return container;
        };
        /**
         * Creates the necessary IPackage data to represent ISettings data.
         *
         * @static
         * @param {ISettings} data
         * @returns {IPackage[]}
         * @memberof ExportContainer
         */
        ExportContainer.createPackages = function (data) {
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            var adapter = ExportContainer.getAdapterToSettings(data);
            if (adapter !== null) {
                packageStructure = adapter.settingToPackage(data);
            }
            return packageStructure;
        };
        /**
         * Adds a setting to the the export container.
         *
         * @param {ISettings} setting
         * @returns {boolean}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.addSettings = function (setting, key) {
            var _a;
            var success = false;
            if (this._container.every(function (packet) { return packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] !== key; })) {
                var packageStructure_1 = ExportContainer.createPackages(setting);
                if (packageStructure_1.packages.length > 0 && !Number.isNaN(packageStructure_1.topLevelID)) {
                    var topLevelPackage = packageStructure_1.packages.find(function (p) { return p.meta[additionalMetaKeys_1.AdditionalMetaKeys.ID] === packageStructure_1.topLevelID; });
                    if (topLevelPackage !== undefined) {
                        topLevelPackage.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] = key;
                        (_a = this._container).push.apply(_a, packageStructure_1.packages);
                        success = true;
                    }
                }
            }
            return success;
        };
        /**
         * Returns the associated package adapter to an ISettings based on the settings type.
         *
         * @private
         * @static
         * @param {ISettings} setting
         * @returns {(IPackageAdapter | null)}
         * @memberof ExportContainer
         */
        ExportContainer.getAdapterToSettings = function (setting) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var adapter = null;
            switch (setting.type) {
                case "BaseSeries":
                    adapter = new baseSeriesPackageAdapter_1.BaseSeriesPackageAdapter();
                    break;
                case "YTSeries":
                    adapter = new ytSeriesPackageAdapter_1.YTSeriesPackageAdapter();
                    break;
                case "XYSeries":
                    adapter = new xySeriesPackageAdapter_1.XYSeriesPackageAdapter();
                    break;
                case "FFTSeries":
                    adapter = new fftSeriesPackageAdapter_1.FFTSeriesPackageAdapter();
                    break;
                case "Signal":
                    adapter = new signalPackageAdapter_1.SignalPackageAdapter();
                    break;
                case "CalculationDataInfo":
                    adapter = new calculationDataInfoPackageAdapter_1.CalculationDataPackageAdapter();
                    break;
                case "SeriesProvider":
                    adapter = new seriesProviderPackageAdapter_1.SeriesProviderPackageAdapter();
                    break;
                case "SerieGroup":
                    adapter = new serieGroupPackageAdapter_1.SerieGroupPackageAdapter();
                    break;
                case "category":
                    adapter = new categoryPackageAdapter_1.CategoryPackageAdapter();
                    break;
                case "SignalManagerDataModel":
                    adapter = new signalManagerDataModelPackageAdapter_1.SignalManagerDataModelPackageAdapter();
                    break;
                case "Scale":
                    adapter = new scalesPackageAdapter_1.ScalePackageAdapter();
                    break;
                case "Chart":
                    adapter = new chartManagerChartPackageAdapter_1.ChartManagerChartPackageAdapter();
                    break;
                case "ChartManagerDataModel":
                    adapter = new chartManagerDataModelPackageAdapter_1.ChartManagerDataModelPackageAdapter();
                    break;
                case "CursorStates":
                    adapter = new cursorStatesPackageAdapter_1.CursorStatesPackageAdapter();
                    break;
            }
            return adapter;
            /* tslint:enable:max-func-body-length */
        };
        /**
         * Returns the associated package adapter to an IPackage based on the meta data.
         *
         * @private
         * @static
         * @param {IPackage} packet
         * @returns {(IPackageAdapter | null)}
         * @memberof ExportContainer
         */
        ExportContainer.getAdapterToPackage = function (packet) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var adapter = null;
            if (packet.meta.dataType === dataTypeEnum_1.DataType.OBJECT) {
                switch (packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE]) {
                    case objectTypeEnum_1.ObjectType.BASESERIES:
                        adapter = new baseSeriesPackageAdapter_1.BaseSeriesPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.YTSERIES:
                        adapter = new ytSeriesPackageAdapter_1.YTSeriesPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.XYSERIES:
                        adapter = new xySeriesPackageAdapter_1.XYSeriesPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.FFTSERIES:
                        adapter = new fftSeriesPackageAdapter_1.FFTSeriesPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SIGNAL:
                        adapter = new signalPackageAdapter_1.SignalPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CALCULATION:
                        adapter = new calculationDataInfoPackageAdapter_1.CalculationDataPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SERIESPROVIDER:
                        adapter = new seriesProviderPackageAdapter_1.SeriesProviderPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SERIEGROUP:
                        adapter = new serieGroupPackageAdapter_1.SerieGroupPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CATEGORY:
                        adapter = new categoryPackageAdapter_1.CategoryPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SIGNALMANAGERDATAMODEL:
                        adapter = new signalManagerDataModelPackageAdapter_1.SignalManagerDataModelPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SCALE:
                        adapter = new scalesPackageAdapter_1.ScalePackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CHART:
                        adapter = new chartManagerChartPackageAdapter_1.ChartManagerChartPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CHARTMANAGERDATAMODEL:
                        adapter = new chartManagerDataModelPackageAdapter_1.ChartManagerDataModelPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CURSORSTATES:
                        adapter = new cursorStatesPackageAdapter_1.CursorStatesPackageAdapter();
                }
            }
            return adapter;
            /* tslint:enable:max-func-body-length */
        };
        /**
         * Returns all top level settings (which are not part of another setting).
         *
         * @returns {Map<string,ISettings>}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.getAllSettings = function () {
            var _this = this;
            var settings = new Map();
            this._container.forEach(function (packet) {
                if (packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] !== undefined) {
                    var adapter = ExportContainer.getAdapterToPackage(packet);
                    if (adapter !== null) {
                        settings.set(packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY], adapter.packageToSetting(packet, _this));
                    }
                }
            });
            return settings;
        };
        /**
         * Returns all keys of ISettings.
         * Keys only exist on top level settings (which are not part of another setting).
         *
         * @returns {Array<string>}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.getAllKeys = function () {
            var keys = new Array();
            this._container.forEach(function (packet) {
                if (packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] !== undefined) {
                    keys.push(packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY]);
                }
            });
            return keys;
        };
        /**
         * Returns ISettings data based on its key (provided when adding).
         * Does only work for top level settings (which are not part of another setting).
         *
         * @param {string} key
         * @returns {(ISettings | null)}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.getSettingsByKey = function (key) {
            var setting = null;
            var packet = this._container.find(function (packet) {
                return packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] === key;
            });
            if (packet !== undefined) {
                var adapter = ExportContainer.getAdapterToPackage(packet);
                if (adapter !== null) {
                    setting = adapter.packageToSetting(packet, this);
                }
            }
            return setting;
        };
        /**
         * Returns ISettings data based on its id as a package.
         * Does not work for top level settings (which are not part of another setting).
         *
         * @param {number} packageID
         * @returns {(ISettings | null)}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.getSettingsByID = function (packageID) {
            var setting = null;
            var packet = this._container.find(function (packet) {
                return packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.ID] === packageID;
            });
            if (packet !== undefined) {
                var adapter = ExportContainer.getAdapterToPackage(packet);
                if (adapter !== null) {
                    setting = adapter.packageToSetting(packet, this);
                }
            }
            return setting;
        };
        /**
         * Stringifies the array containing IPackage data to a JSON string.
         *
         * @returns {string}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.toJson = function () {
            var str = "";
            str = JSON.stringify(this._container, package_1.Package.replacer);
            return str;
        };
        return ExportContainer;
    }());
    exports.ExportContainer = ExportContainer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0Q29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZXhwb3J0Q29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXNCQTtRQW9FSTs7O1dBR0c7UUFDSDtZQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQVksQ0FBQztRQUM1QyxDQUFDO1FBdkVEOzs7Ozs7O1dBT0c7UUFDVyw0QkFBWSxHQUExQixVQUEyQixRQUF5QjtZQUVoRCxJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBRWhDLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ1csd0JBQVEsR0FBdEIsVUFBdUIsR0FBVztZQUU5QixJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBRWxDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbEQsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMxQixTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzthQUNyQztpQkFBTTtnQkFDSCxTQUFTLEdBQUcsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVEO1lBR0wsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ1ksZ0NBQWdCLEdBQS9CLFVBQWdDLFVBQWtCO1lBRTlDLElBQUksU0FBUyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFFdEMsSUFBRyxVQUFVLENBQUMsd0JBQXdCLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ25ELFNBQVMsQ0FBQyxX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LE9BQU8sS0FBSyxJQUFJLEVBQUU7b0JBRWpCLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNwRDthQUNKO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUNEOzs7OztXQUtHO1FBQ0ksZ0NBQU0sR0FBYjtZQUVJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV4RCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDSixzQkFBQztJQUFELENBQUMsQUFwV0YsSUFvV0U7SUFFUSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQYWNrYWdlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3BhY2thZ2VJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBhY2thZ2VBZGFwdGVyLCBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlQWRhcHRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlIH0gZnJvbSBcIi4vcGFja2FnZVwiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi9lbnVtL29iamVjdFR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IEFkZGl0aW9uYWxNZXRhS2V5cyB9IGZyb20gXCIuL2VudW0vYWRkaXRpb25hbE1ldGFLZXlzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXNQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzUGFja2FnZUFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgWVRTZXJpZXNQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy95dFNlcmllc1BhY2thZ2VBZGFwdGVyXCI7XHJcbmltcG9ydCB7IFhZU2VyaWVzUGFja2FnZUFkYXB0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMveHlTZXJpZXNQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBGRlRTZXJpZXNQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9mZnRTZXJpZXNQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBTaWduYWxQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWxQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvUGFja2FnZUFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVHcm91cFBhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NlcmllR3JvdXBQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeVBhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL2NhdGVnb3J5UGFja2FnZUFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzUHJvdmlkZXJQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVyUGFja2FnZUFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFBhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBTY2FsZVBhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVzUGFja2FnZUFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyQ2hhcnRQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0UGFja2FnZUFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUFkYXB0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzUGFja2FnZUFkYXB0ZXJcIjtcclxuXHJcbmNsYXNzIEV4cG9ydENvbnRhaW5lciB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2NvbnRhaW5lcjogQXJyYXk8SVBhY2thZ2U+OyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gRXhwb3J0Q29udGFpbmVyIGZyb20gYW4gYXJyYXkgY29udGFpbmluZyBJUGFja2FnZSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUGFja2FnZT59IHBhY2thZ2VzXHJcbiAgICAgKiBAcmV0dXJucyB7RXhwb3J0Q29udGFpbmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21QYWNrYWdlcyhwYWNrYWdlczogQXJyYXk8SVBhY2thZ2U+KTogRXhwb3J0Q29udGFpbmVyIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gbmV3IEV4cG9ydENvbnRhaW5lcigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5fY29udGFpbmVyID0gcGFja2FnZXM7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIEV4cG9ydENvbnRhaW5lciBmcm9tIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBKU09OIHJlcHJlc2VudGluZyBhbiBhcnJheSBjb250YWluaW5nIElQYWNrYWdlIGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICogQHJldHVybnMge0V4cG9ydENvbnRhaW5lcn1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tSnNvbihzdHI6IHN0cmluZyk6IEV4cG9ydENvbnRhaW5lciB7XHJcblxyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBuZXcgRXhwb3J0Q29udGFpbmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShzdHIsIFBhY2thZ2UucmV2aXZlcik7XHJcblxyXG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHBhcnNlZERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuX2NvbnRhaW5lciA9IHBhcnNlZERhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBFeHBvcnRDb250YWluZXIuZnJvbUxlZ2FjeUZvcm1hdChwYXJzZWREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2Zvcm1zIGxlZ2FjeSBtY2UgZXhwb3J0IGZvcm1hdCB0byBhbiBhcnJheSBjb250YWluaW5nIElQYWNrYWdlIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcnNlZERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUGFja2FnZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGZyb21MZWdhY3lGb3JtYXQocGFyc2VkRGF0YTogT2JqZWN0KTogRXhwb3J0Q29udGFpbmVyIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gbmV3IEV4cG9ydENvbnRhaW5lcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBhcnNlZERhdGFbXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZFNldHRpbmdzKHBhcnNlZERhdGFbXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCJdLCBcIlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBhcnNlZERhdGFbXCJTZXJpZXNQcm92aWRlclwiXSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZFNldHRpbmdzKHBhcnNlZERhdGFbXCJTZXJpZXNQcm92aWRlclwiXSwgXCJTZXJpZXNQcm92aWRlclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcbiAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEV4cG9ydENvbnRhaW5lci5cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IG5ldyBBcnJheTxJUGFja2FnZT4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIG5lY2Vzc2FyeSBJUGFja2FnZSBkYXRhIHRvIHJlcHJlc2VudCBJU2V0dGluZ3MgZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gZGF0YVxyXG4gICAgICogQHJldHVybnMge0lQYWNrYWdlW119XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUGFja2FnZXMoZGF0YTogSVNldHRpbmdzKTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwYWNrYWdlU3RydWN0dXJlOiBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCA9IHtcclxuICAgICAgICAgICAgcGFja2FnZXM6IG5ldyBBcnJheTxJUGFja2FnZT4oKSxcclxuICAgICAgICAgICAgdG9wTGV2ZWxJRDogTmFOXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYWRhcHRlciA9IEV4cG9ydENvbnRhaW5lci5nZXRBZGFwdGVyVG9TZXR0aW5ncyhkYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihhZGFwdGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBhY2thZ2VTdHJ1Y3R1cmUgPSBhZGFwdGVyLnNldHRpbmdUb1BhY2thZ2UoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYWNrYWdlU3RydWN0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNldHRpbmcgdG8gdGhlIHRoZSBleHBvcnQgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNldHRpbmdzKHNldHRpbmc6IElTZXR0aW5ncywga2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc3VjY2VzczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLl9jb250YWluZXIuZXZlcnkocGFja2V0ID0+IHtyZXR1cm4gcGFja2V0Lm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLktFWV0gIT09IGtleTt9KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VTdHJ1Y3R1cmUgPSBFeHBvcnRDb250YWluZXIuY3JlYXRlUGFja2FnZXMoc2V0dGluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYocGFja2FnZVN0cnVjdHVyZS5wYWNrYWdlcy5sZW5ndGggPiAwICYmICFOdW1iZXIuaXNOYU4ocGFja2FnZVN0cnVjdHVyZS50b3BMZXZlbElEKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvcExldmVsUGFja2FnZSA9IHBhY2thZ2VTdHJ1Y3R1cmUucGFja2FnZXMuZmluZChwID0+IHsgcmV0dXJuIHAubWV0YVtBZGRpdGlvbmFsTWV0YUtleXMuSURdID09PSBwYWNrYWdlU3RydWN0dXJlLnRvcExldmVsSUQ7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRvcExldmVsUGFja2FnZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcExldmVsUGFja2FnZS5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5LRVldID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb250YWluZXIucHVzaCguLi5wYWNrYWdlU3RydWN0dXJlLnBhY2thZ2VzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGFzc29jaWF0ZWQgcGFja2FnZSBhZGFwdGVyIHRvIGFuIElTZXR0aW5ncyBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdcclxuICAgICAqIEByZXR1cm5zIHsoSVBhY2thZ2VBZGFwdGVyIHwgbnVsbCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEFkYXB0ZXJUb1NldHRpbmdzKHNldHRpbmc6IElTZXR0aW5ncyk6IElQYWNrYWdlQWRhcHRlciB8IG51bGwge1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovIC8vIGRpc2FibGVkIGR1ZSB0byBzd2l0Y2ggY2FzZVxyXG4gICAgICAgIGxldCBhZGFwdGVyOiBJUGFja2FnZUFkYXB0ZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICBcclxuICAgICAgICBzd2l0Y2goc2V0dGluZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJCYXNlU2VyaWVzXCI6IFxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBCYXNlU2VyaWVzUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiWVRTZXJpZXNcIjpcclxuICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgWVRTZXJpZXNQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJYWVNlcmllc1wiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBYWVNlcmllc1BhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkZGVFNlcmllc1wiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBGRlRTZXJpZXNQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWduYWxcIjpcclxuICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgU2lnbmFsUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2FsY3VsYXRpb25EYXRhSW5mb1wiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBDYWxjdWxhdGlvbkRhdGFQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTZXJpZXNQcm92aWRlclwiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBTZXJpZXNQcm92aWRlclBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNlcmllR3JvdXBcIjpcclxuICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgU2VyaWVHcm91cFBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNhdGVnb3J5XCI6XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IENhdGVnb3J5UGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiU2lnbmFsTWFuYWdlckRhdGFNb2RlbFwiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiU2NhbGVcIjpcclxuICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgU2NhbGVQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydFwiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBDaGFydE1hbmFnZXJDaGFydFBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBDaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDdXJzb3JTdGF0ZXNcIjpcclxuICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgQ3Vyc29yU3RhdGVzUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYXNzb2NpYXRlZCBwYWNrYWdlIGFkYXB0ZXIgdG8gYW4gSVBhY2thZ2UgYmFzZWQgb24gdGhlIG1ldGEgZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJUGFja2FnZX0gcGFja2V0XHJcbiAgICAgKiBAcmV0dXJucyB7KElQYWNrYWdlQWRhcHRlciB8IG51bGwpfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRBZGFwdGVyVG9QYWNrYWdlKHBhY2tldDogSVBhY2thZ2UpOiBJUGFja2FnZUFkYXB0ZXIgfCBudWxsIHtcclxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqLyAvLyBkaXNhYmxlZCBkdWUgdG8gc3dpdGNoIGNhc2VcclxuICAgICAgICBsZXQgYWRhcHRlcjogSVBhY2thZ2VBZGFwdGVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmKHBhY2tldC5tZXRhLmRhdGFUeXBlID09PSBEYXRhVHlwZS5PQkpFQ1QpIHtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaChwYWNrZXQubWV0YVtBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRV0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5CQVNFU0VSSUVTOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgQmFzZVNlcmllc1BhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuWVRTRVJJRVM6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBZVFNlcmllc1BhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuWFlTRVJJRVM6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBYWVNlcmllc1BhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuRkZUU0VSSUVTOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgRkZUU2VyaWVzUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5TSUdOQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBTaWduYWxQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBPYmplY3RUeXBlLkNBTENVTEFUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgQ2FsY3VsYXRpb25EYXRhUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5TRVJJRVNQUk9WSURFUjpcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IFNlcmllc1Byb3ZpZGVyUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5TRVJJRUdST1VQOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgU2VyaWVHcm91cFBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuQ0FURUdPUlk6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBDYXRlZ29yeVBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuU0lHTkFMTUFOQUdFUkRBVEFNT0RFTDpcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBPYmplY3RUeXBlLlNDQUxFOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgU2NhbGVQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBPYmplY3RUeXBlLkNIQVJUOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgQ2hhcnRNYW5hZ2VyQ2hhcnRQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBPYmplY3RUeXBlLkNIQVJUTUFOQUdFUkRBVEFNT0RFTDpcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IENoYXJ0TWFuYWdlckRhdGFNb2RlbFBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuQ1VSU09SU1RBVEVTOiBcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IEN1cnNvclN0YXRlc1BhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhZGFwdGVyXHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgdG9wIGxldmVsIHNldHRpbmdzICh3aGljaCBhcmUgbm90IHBhcnQgb2YgYW5vdGhlciBzZXR0aW5nKS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwPHN0cmluZyxJU2V0dGluZ3M+fVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsU2V0dGluZ3MoKTogTWFwPHN0cmluZyxJU2V0dGluZ3M+IHtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IE1hcDxzdHJpbmcsIElTZXR0aW5ncz4oKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9jb250YWluZXIuZm9yRWFjaCgocGFja2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHBhY2tldC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5LRVldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhZGFwdGVyID0gRXhwb3J0Q29udGFpbmVyLmdldEFkYXB0ZXJUb1BhY2thZ2UocGFja2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihhZGFwdGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KHBhY2tldC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5LRVldLCBhZGFwdGVyLnBhY2thZ2VUb1NldHRpbmcocGFja2V0LHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZ3NcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYWxsIGtleXMgb2YgSVNldHRpbmdzLlxyXG4gICAgICogS2V5cyBvbmx5IGV4aXN0IG9uIHRvcCBsZXZlbCBzZXR0aW5ncyAod2hpY2ggYXJlIG5vdCBwYXJ0IG9mIGFub3RoZXIgc2V0dGluZykuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxLZXlzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIGxldCBrZXlzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmZvckVhY2gocGFja2V0ID0+IHtcclxuICAgICAgICAgICAgaWYocGFja2V0Lm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLktFWV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKHBhY2tldC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5LRVldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ga2V5cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgSVNldHRpbmdzIGRhdGEgYmFzZWQgb24gaXRzIGtleSAocHJvdmlkZWQgd2hlbiBhZGRpbmcpLlxyXG4gICAgICogRG9lcyBvbmx5IHdvcmsgZm9yIHRvcCBsZXZlbCBzZXR0aW5ncyAod2hpY2ggYXJlIG5vdCBwYXJ0IG9mIGFub3RoZXIgc2V0dGluZykuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gICAgICogQHJldHVybnMgeyhJU2V0dGluZ3MgfCBudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNldHRpbmdzQnlLZXkoa2V5OiBzdHJpbmcpOiBJU2V0dGluZ3MgfCBudWxsIHtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmc6IElTZXR0aW5ncyB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIGxldCBwYWNrZXQgPSB0aGlzLl9jb250YWluZXIuZmluZCgocGFja2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQubWV0YVtBZGRpdGlvbmFsTWV0YUtleXMuS0VZXSA9PT0ga2V5O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHBhY2tldCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYWRhcHRlciA9IEV4cG9ydENvbnRhaW5lci5nZXRBZGFwdGVyVG9QYWNrYWdlKHBhY2tldCk7XHJcbiAgICAgICAgICAgIGlmKGFkYXB0ZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZyA9IGFkYXB0ZXIucGFja2FnZVRvU2V0dGluZyhwYWNrZXQsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBJU2V0dGluZ3MgZGF0YSBiYXNlZCBvbiBpdHMgaWQgYXMgYSBwYWNrYWdlLlxyXG4gICAgICogRG9lcyBub3Qgd29yayBmb3IgdG9wIGxldmVsIHNldHRpbmdzICh3aGljaCBhcmUgbm90IHBhcnQgb2YgYW5vdGhlciBzZXR0aW5nKS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFja2FnZUlEXHJcbiAgICAgKiBAcmV0dXJucyB7KElTZXR0aW5ncyB8IG51bGwpfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2V0dGluZ3NCeUlEKHBhY2thZ2VJRDogbnVtYmVyKTogSVNldHRpbmdzIHwgbnVsbCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmc6IElTZXR0aW5ncyB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIGxldCBwYWNrZXQgPSB0aGlzLl9jb250YWluZXIuZmluZCgocGFja2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQubWV0YVtBZGRpdGlvbmFsTWV0YUtleXMuSURdID09PSBwYWNrYWdlSUQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYocGFja2V0ICE9PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBhZGFwdGVyID0gRXhwb3J0Q29udGFpbmVyLmdldEFkYXB0ZXJUb1BhY2thZ2UocGFja2V0KTtcclxuICAgICAgICAgICAgaWYoYWRhcHRlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nID0gYWRhcHRlci5wYWNrYWdlVG9TZXR0aW5nKHBhY2tldCwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmc7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0cmluZ2lmaWVzIHRoZSBhcnJheSBjb250YWluaW5nIElQYWNrYWdlIGRhdGEgdG8gYSBKU09OIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9Kc29uKCk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMuX2NvbnRhaW5lciwgUGFja2FnZS5yZXBsYWNlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiB9XHJcblxyXG4gZXhwb3J0IHsgRXhwb3J0Q29udGFpbmVyIH0iXX0=
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
define(["require", "exports", "../../../common/dateTimeHelper", "../../../common/persistence/settings", "../../signalManagerDataModel/signalManagerDataModelSettingIds", "./serieContainer", "./serieNode", "../../signalManagerDataModel/signalManagerCalculation", "../../signalManagerDataModel/signalManagerCalculationInputData", "../../signalManagerDataModel/signalCategory"], function (require, exports, dateTimeHelper_1, settings_1, signalManagerDataModelSettingIds_1, serieContainer_1, serieNode_1, signalManagerCalculation_1, signalManagerCalculationInputData_1, signalCategory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieGroup = /** @class */ (function (_super) {
        __extends(SerieGroup, _super);
        /**
         * Creates an instance of SerieGroup.
         * @param {string} name
         * @param {number} startTriggerTime
         * @memberof SerieGroup
         */
        function SerieGroup(name, id, startTriggerTime, expandState) {
            if (expandState === void 0) { expandState = true; }
            var _this = _super.call(this, name, id, expandState) || this;
            _this.isSerieGroup = true;
            _this._startTriggerTime = startTriggerTime;
            return _this;
        }
        Object.defineProperty(SerieGroup.prototype, "startTriggerTime", {
            get: function () {
                return this._startTriggerTime;
            },
            set: function (value) {
                this._startTriggerTime = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieGroup.prototype, "color", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        SerieGroup.prototype.getSettings = function () {
            var settings = new settings_1.Settings("SerieGroup");
            var seriesOfGroup = this.getSeries();
            if (seriesOfGroup != undefined) {
                var seriesIds = new Array();
                for (var i = 0; i < seriesOfGroup.length; i++) {
                    seriesIds.push(seriesOfGroup[i].id);
                }
                var containerName = undefined;
                var containerId = undefined;
                var containerExpandState = undefined;
                var expandState = this.expandState;
                if (this.parent != undefined && !(this.parent instanceof signalCategory_1.SignalCategory)) {
                    containerName = this.parent.name;
                    containerId = this.parent.id;
                    containerExpandState = this.parent.expandState;
                }
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ContainerName, containerName);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ContainerExpandState, containerExpandState);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.SeriesIds, seriesIds);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ContainerId, containerId);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroupStartTriggerTime, this.startTriggerTime);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ExpandState, expandState);
            }
            return settings;
        };
        SerieGroup.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            // Set name, id, startTriggerTime and expandState of group
            var startTriggerTime = settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroupStartTriggerTime);
            this.name = dateTimeHelper_1.DateTimeHelper.getDateTime(startTriggerTime);
            this.id = startTriggerTime.toString();
            this._startTriggerTime = startTriggerTime;
            this.expandState = settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.ExpandState);
            this.addSerieIdsFromSerieProviderToGroup(settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.SeriesIds));
        };
        /**
         * Adds the series for the given seriesIds to this group
         *
         * @private
         * @param {Array<string>} seriesIds
         * @memberof SerieGroup
         */
        SerieGroup.prototype.addSerieIdsFromSerieProviderToGroup = function (seriesIds) {
            var _this = this;
            var calculations = new Map();
            var dataModel = this.getDataModel();
            if (dataModel != undefined && dataModel.seriesProvider != undefined) {
                // add series to group and calculations without input data (needed to have all )
                seriesIds.forEach(function (serieId) {
                    var foundSerie = dataModel.seriesProvider.get(serieId);
                    if (foundSerie != undefined) {
                        if (foundSerie.calculationDataInfo != undefined) {
                            if (foundSerie.calculationDataInfo.type != "") {
                                // set output series object
                                var newCalculation = _this.addCalculation(foundSerie.calculationDataInfo.type, foundSerie);
                                if (newCalculation != undefined) {
                                    calculations.set(foundSerie, newCalculation);
                                }
                                else {
                                    console.error("Calculator for given id not found! => " + foundSerie.calculationDataInfo.type);
                                }
                            }
                        }
                        else {
                            _this.addSerie(foundSerie);
                        }
                    }
                });
            }
            else {
                console.error("dataModel or dataModel.seriesProvider is undefined!");
            }
            // set input data of calculations
            calculations.forEach(function (signalManagerCalculation, series) {
                if (series != undefined) {
                    // get input values
                    var inputValues = new Array();
                    if (series.calculationDataInfo != undefined) {
                        for (var i = 0; i < series.calculationDataInfo.inputDataValues.length; i++) {
                            inputValues.push(series.calculationDataInfo.inputDataValues[i]);
                        }
                    }
                    if (series.calculationDataInfo != undefined) {
                        // set input values
                        for (var i = 0; i < series.calculationDataInfo.inputDataIds.length; i++) {
                            signalManagerCalculation.setInputValueById(series.calculationDataInfo.inputDataIds[i], inputValues[i]);
                        }
                    }
                }
            });
        };
        /**
         * Adds a new calculation with the given type to this group
         *
         * @param {string} type
         * @param {(BaseSeries|undefined)} [existingSerie=undefined]
         * @returns {SignalManagerCalculation}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.addCalculation = function (type, existingSerie) {
            if (existingSerie === void 0) { existingSerie = undefined; }
            // this serie is the output of a calculation => add calculation
            var dataModel = this.getDataModel();
            if (dataModel == undefined || dataModel.seriesProvider == undefined) {
                return undefined;
            }
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", dataModel.seriesProvider);
            this.addSerieContainer(calculation, -1);
            // set calculationType
            calculation.setCalculatorTypeById(type);
            if (existingSerie != undefined) {
                var outputData = calculation.getOutputCalculationData();
                if (outputData.length > 0) { // TODO: Implement multiOutput
                    // Add new serie object
                    outputData[0].serie = existingSerie;
                }
            }
            return calculation;
        };
        /**
         * Adds a serie to this serie container
         *
         * @param {BaseSeries} serie
         * @param {number} [index=-1]  -1 to add at the end, else the index where to add
         * @memberof SerieContainer
         */
        SerieGroup.prototype.addSerie = function (serie, index) {
            if (index === void 0) { index = -1; }
            var newSerieNode = new serieNode_1.SerieNode(undefined, serie);
            _super.prototype.addSerieNode.call(this, newSerieNode);
        };
        /**
         * Removes a serie from this serie container
         *
         * @param {BaseSeries} serie
         * @memberof SerieContainer
         */
        SerieGroup.prototype.removeSerie = function (serie) {
            // Found serie within serienodes
            var serieNode = undefined;
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i].serie == serie) {
                    serieNode = this.childs[i];
                }
            }
            if (serieNode != undefined) {
                _super.prototype.removeSerieNode.call(this, serieNode);
            }
        };
        /**
         * Remove all references to the given serie within this serie group(e.g. references in calculations)
         *
         * @param {(BaseSeries|undefined)} serie
         * @memberof SerieGroup
         */
        SerieGroup.prototype.removeReferencesToSerieNode = function (serieNode) {
            if (!(serieNode instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData)) {
                // inform all child nodes(calculations) that a serie will be removed from this serieGroup; only in case of
                // the serieNode is no inputSignal of a calculation
                this.getChilds().forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        var calculation = child;
                        if (serieNode.serie != undefined) {
                            calculation.removeReferencesToSerie(serieNode.serie);
                        }
                    }
                });
            }
        };
        /**
         * Makes a copy of the object with all sub objects(e.g. series)
         *
         * @returns {SerieGroup}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.clone = function () {
            var id = this.startTriggerTime.toString();
            var serieGroup = new SerieGroup(this.name, id, this.startTriggerTime);
            serieGroup.expandState = this.expandState;
            for (var i = 0; i < this.childs.length; i++) {
                var serieNode = this.childs[i];
                if (serieNode != undefined) {
                    serieGroup.addSerieNode(serieNode.clone(), -1);
                }
            }
            var listOfSeriesIdsToRemove = new Array();
            // update series at input calculation data with cloned series from serie group
            for (var i = 0; i < serieGroup.childs.length; i++) {
                var calculationNode = serieGroup.childs[i];
                if (calculationNode instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                    var serieIdsToRemove = calculationNode.updateInputData(serieGroup);
                    // Add only serie ids which are not already in the list
                    var addToList = serieIdsToRemove.filter(function (item) { return listOfSeriesIdsToRemove.indexOf(item) < 0; });
                    listOfSeriesIdsToRemove = listOfSeriesIdsToRemove.concat(addToList);
                }
            }
            var dataModel = this.getDataModel();
            if (dataModel != undefined) {
                var seriesProvider_1 = dataModel.seriesProvider;
                if (seriesProvider_1 != undefined) {
                    // Remove cloned series input objects from series provider to avoid unused series objects
                    listOfSeriesIdsToRemove.forEach(function (seriesId) {
                        seriesProvider_1.remove(seriesId);
                    });
                }
            }
            return serieGroup;
        };
        /**
         * Returns the serie with the given serieName within the serie group
         *
         * @param {string} serieName
         * @returns {(BaseSeries|undefined)}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.getSerie = function (serieName) {
            var series = this.getSeries();
            for (var i = 0; i < series.length; i++) {
                if (series[i].name == serieName) {
                    return series[i];
                }
            }
            return undefined;
        };
        SerieGroup.prototype.getSerieByOriginalName = function (originalName) {
            var series = this.getSeries();
            for (var i = 0; i < series.length; i++) {
                if (series[i].originalName == originalName) {
                    return series[i];
                }
            }
            return undefined;
        };
        /**
         * Merges the information of a serie group to an existing serie group
         * Adds new series; removes not available series; updates the data of existing series(same serie name)
         * Calculations will be ignored
         *
         * @param {ISerieGroup} newSerieGroup
         * @memberof SerieGroup
         */
        SerieGroup.prototype.mergeWithSerieGroup = function (newSerieGroup) {
            this.startTriggerTime = newSerieGroup.startTriggerTime;
            this.name = newSerieGroup.name;
            // Remove unused series (only if not a calculation)
            for (var i = 0; i < this.childs.length; i++) {
                var serieNode = this.childs[i];
                var serieNodeName = serieNode.name;
                if (serieNode.serie != undefined) {
                    serieNodeName = serieNode.serie.originalName;
                }
                var foundSerieNode = newSerieGroup.getSerieByOriginalName(serieNodeName);
                if (foundSerieNode == undefined) {
                    if (!(serieNode instanceof signalManagerCalculation_1.SignalManagerCalculation)) { // Remove only if not a calculation
                        this.removeSerieNode(serieNode);
                        i--;
                    }
                }
                else {
                    // Updates the data of an existing serie
                    if (serieNode.serie != undefined) {
                        serieNode.serie.updatePoints(foundSerieNode.rawPoints);
                        serieNode.serie.startTriggerTime = foundSerieNode.startTriggerTime;
                    }
                }
            }
            this.addSeriesFromGroup(newSerieGroup);
        };
        /**
         * Adds series from the given serieGroup to this serieGroup if not already there
         * Signals will be added before the first calculation
         *
         * @private
         * @param {ISerieGroup} serieGroup
         * @memberof SerieGroup
         */
        SerieGroup.prototype.addSeriesFromGroup = function (serieGroup) {
            // add new series before calculations
            var firstCalculationIndex = this.getFirstCalculationIndex();
            var childs = serieGroup.getChilds();
            for (var i = 0; i < childs.length; i++) {
                var serieNodeName = childs[i].name;
                if (childs[i].serie != undefined) {
                    serieNodeName = childs[i].serie.originalName;
                }
                var foundSerieNode = this.getSerieByOriginalName(serieNodeName);
                if (foundSerieNode == undefined) {
                    var newSerieNode = childs[i];
                    if (newSerieNode != undefined) {
                        this.addSerieNode(newSerieNode, firstCalculationIndex);
                        if (firstCalculationIndex != -1) {
                            firstCalculationIndex++;
                        }
                    }
                }
                else {
                    //Delete old serieNode from serieProvider (as the new serieNode of serieGroup is used)
                    var dataModel = this.getDataModel();
                    dataModel.seriesProvider.remove(childs[i].serie.id);
                }
            }
        };
        /**
         * Returns the index of the first calculation in the childs of this group
         *
         * @private
         * @returns {number}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.getFirstCalculationIndex = function () {
            for (var i = 0; i < this.childs.length; i++) {
                var child = this.childs[i];
                if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                    return i;
                }
            }
            return -1;
        };
        return SerieGroup;
    }(serieContainer_1.SerieContainer));
    exports.SerieGroup = SerieGroup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBZ0MsOEJBQWM7UUFnQjFDOzs7OztXQUtHO1FBQ0gsb0JBQVksSUFBWSxFQUFFLEVBQVUsRUFBRSxnQkFBd0IsRUFBRSxXQUEyQjtZQUEzQiw0QkFBQSxFQUFBLGtCQUEyQjtZQUEzRixZQUNJLGtCQUFNLElBQUksRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLFNBRS9CO1lBdkJELGtCQUFZLEdBQUcsSUFBSSxDQUFDO1lBc0JoQixLQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7O1FBQzlDLENBQUM7UUFwQkQsc0JBQVcsd0NBQWdCO2lCQUEzQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDO2lCQUNELFVBQTRCLEtBQWE7Z0JBQ3JDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDbkMsQ0FBQzs7O1dBSEE7UUFLRCxzQkFBVyw2QkFBSztpQkFBaEI7Z0JBQ0ksT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQzs7O1dBQUE7UUFhRCxnQ0FBVyxHQUFYO1lBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQyxJQUFHLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQzFCLElBQUksU0FBUyxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO2dCQUNuRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDekMsU0FBUyxDQUFDLElB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RUFBRSxDQUFDO3lCQUMzQjtxQkFDSjtpQkFDSjtxQkFDSTtvQkFDRCxzRkFBc0Y7b0JBQ3RGLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEMsU0FBVSxDQUFDLGNBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDMUQ7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyw2Q0FBd0IsR0FBaEM7WUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUM7Z0JBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUcsS0FBSyxZQUFZLG1EQUF3QixFQUFDO29CQUN6QyxPQUFPLENBQUMsQ0FBQztpQkFDWjthQUNKO1lBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUM7UUFFTCxpQkFBQztJQUFELENBQUMsQUFqWEQsQ0FBZ0MsK0JBQWMsR0FpWDdDO0lBalhZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNlcmllR3JvdXAgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVOb2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBEYXRlVGltZUhlbHBlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGF0ZVRpbWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsU2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IFNlcmllTm9kZSB9IGZyb20gXCIuL3NlcmllTm9kZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJpZUdyb3VwIGV4dGVuZHMgU2VyaWVDb250YWluZXIgaW1wbGVtZW50cyBJU2VyaWVHcm91cHtcclxuICAgIFxyXG4gICAgaXNTZXJpZUdyb3VwID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIF9zdGFydFRyaWdnZXJUaW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0VHJpZ2dlclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgc3RhcnRUcmlnZ2VyVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VyVGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5nfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2VyaWVHcm91cC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRUcmlnZ2VyVGltZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpZDogc3RyaW5nLCBzdGFydFRyaWdnZXJUaW1lOiBudW1iZXIsIGV4cGFuZFN0YXRlOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgaWQsIGV4cGFuZFN0YXRlKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJUaW1lID0gc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiU2VyaWVHcm91cFwiKTtcclxuICAgICAgICBsZXQgc2VyaWVzT2ZHcm91cCA9IHRoaXMuZ2V0U2VyaWVzKCk7XHJcbiAgICAgICAgaWYoc2VyaWVzT2ZHcm91cCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzSWRzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlcmllc09mR3JvdXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzSWRzLnB1c2goc2VyaWVzT2ZHcm91cFtpXS5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lck5hbWU6IHN0cmluZ3x1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJJZDogc3RyaW5nfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckV4cGFuZFN0YXRlOiBib29sZWFufHVuZGVmaW5lZCA9IHVuZGVmaW5lZDsgXHJcbiAgICAgICAgICAgIGxldCBleHBhbmRTdGF0ZTogYm9vbGVhbiA9IHRoaXMuZXhwYW5kU3RhdGU7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudCAhPSB1bmRlZmluZWQgJiYgISh0aGlzLnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbENhdGVnb3J5KSl7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJOYW1lID0gdGhpcy5wYXJlbnQubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcklkID0gdGhpcy5wYXJlbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJFeHBhbmRTdGF0ZSA9IHRoaXMucGFyZW50LmV4cGFuZFN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkNvbnRhaW5lck5hbWUsIGNvbnRhaW5lck5hbWUpO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkNvbnRhaW5lckV4cGFuZFN0YXRlLCBjb250YWluZXJFeHBhbmRTdGF0ZSk7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWRzLCBzZXJpZXNJZHMpO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkNvbnRhaW5lcklkLCBjb250YWluZXJJZCk7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVHcm91cFN0YXJ0VHJpZ2dlclRpbWUsIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSk7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuRXhwYW5kU3RhdGUsIGV4cGFuZFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBJU2V0dGluZ3Mpe1xyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgLy8gU2V0IG5hbWUsIGlkLCBzdGFydFRyaWdnZXJUaW1lIGFuZCBleHBhbmRTdGF0ZSBvZiBncm91cFxyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJUaW1lID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZUdyb3VwU3RhcnRUcmlnZ2VyVGltZSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gRGF0ZVRpbWVIZWxwZXIuZ2V0RGF0ZVRpbWUoc3RhcnRUcmlnZ2VyVGltZSk7XHJcbiAgICAgICAgdGhpcy5pZCA9IHN0YXJ0VHJpZ2dlclRpbWUudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJUaW1lID0gc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICB0aGlzLmV4cGFuZFN0YXRlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5FeHBhbmRTdGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVJZHNGcm9tU2VyaWVQcm92aWRlclRvR3JvdXAoc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZHMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIHNlcmllcyBmb3IgdGhlIGdpdmVuIHNlcmllc0lkcyB0byB0aGlzIGdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2VyaWVzSWRzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllSWRzRnJvbVNlcmllUHJvdmlkZXJUb0dyb3VwKHNlcmllc0lkczogQXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9ucyA9IG5ldyBNYXA8QmFzZVNlcmllcyxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24+KCk7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCAmJiBkYXRhTW9kZWwhLnNlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGFkZCBzZXJpZXMgdG8gZ3JvdXAgYW5kIGNhbGN1bGF0aW9ucyB3aXRob3V0IGlucHV0IGRhdGEgKG5lZWRlZCB0byBoYXZlIGFsbCApXHJcbiAgICAgICAgICAgIHNlcmllc0lkcy5mb3JFYWNoKHNlcmllSWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZm91bmRTZXJpZSA9IGRhdGFNb2RlbCEuc2VyaWVzUHJvdmlkZXIhLmdldChzZXJpZUlkKTtcclxuICAgICAgICAgICAgaWYoZm91bmRTZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoZm91bmRTZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm91bmRTZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvLnR5cGUgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCBvdXRwdXQgc2VyaWVzIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q2FsY3VsYXRpb24gPSB0aGlzLmFkZENhbGN1bGF0aW9uKGZvdW5kU2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mby50eXBlLCBmb3VuZFNlcmllKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld0NhbGN1bGF0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbnMuc2V0KGZvdW5kU2VyaWUsIG5ld0NhbGN1bGF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbGN1bGF0b3IgZm9yIGdpdmVuIGlkIG5vdCBmb3VuZCEgPT4gXCIgKyBmb3VuZFNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm8udHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWUoZm91bmRTZXJpZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZGF0YU1vZGVsIG9yIGRhdGFNb2RlbC5zZXJpZXNQcm92aWRlciBpcyB1bmRlZmluZWQhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0IGlucHV0IGRhdGEgb2YgY2FsY3VsYXRpb25zXHJcbiAgICAgICAgY2FsY3VsYXRpb25zLmZvckVhY2goKHNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiwgc2VyaWVzKSA9PiB7XHJcbiAgICAgICAgICBpZihzZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gZ2V0IGlucHV0IHZhbHVlc1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRWYWx1ZXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBpZihzZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgc2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhVmFsdWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlcy5wdXNoKHNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVZhbHVlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChzZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gc2V0IGlucHV0IHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YUlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKHNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YUlkc1tpXSwgaW5wdXRWYWx1ZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBjYWxjdWxhdGlvbiB3aXRoIHRoZSBnaXZlbiB0eXBlIHRvIHRoaXMgZ3JvdXBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfSBbZXhpc3RpbmdTZXJpZT11bmRlZmluZWRdXHJcbiAgICAgKiBAcmV0dXJucyB7U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRDYWxjdWxhdGlvbih0eXBlOiBzdHJpbmcsIGV4aXN0aW5nU2VyaWU6IEJhc2VTZXJpZXN8dW5kZWZpbmVkID0gdW5kZWZpbmVkKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ufHVuZGVmaW5lZHtcclxuICAgICAgICAvLyB0aGlzIHNlcmllIGlzIHRoZSBvdXRwdXQgb2YgYSBjYWxjdWxhdGlvbiA9PiBhZGQgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgPT0gdW5kZWZpbmVkIHx8IGRhdGFNb2RlbC5zZXJpZXNQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKFwiQ2FsY3VsYXRpb25cIiwgZGF0YU1vZGVsLnNlcmllc1Byb3ZpZGVyKTtcclxuICAgICAgICB0aGlzLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uVHlwZVxyXG4gICAgICAgIGNhbGN1bGF0aW9uLnNldENhbGN1bGF0b3JUeXBlQnlJZCh0eXBlKTtcclxuICAgICAgICBpZihleGlzdGluZ1NlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgaWYob3V0cHV0RGF0YS5sZW5ndGggPiAwKXsgLy8gVE9ETzogSW1wbGVtZW50IG11bHRpT3V0cHV0XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgbmV3IHNlcmllIG9iamVjdFxyXG4gICAgICAgICAgICBvdXRwdXREYXRhWzBdLnNlcmllID0gZXhpc3RpbmdTZXJpZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0aW9uO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBzZXJpZSB0byB0aGlzIHNlcmllIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaW5kZXg9LTFdICAtMSB0byBhZGQgYXQgdGhlIGVuZCwgZWxzZSB0aGUgaW5kZXggd2hlcmUgdG8gYWRkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgYWRkU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMsIGluZGV4OiBudW1iZXIgPS0xKXtcclxuICAgICAgICBsZXQgbmV3U2VyaWVOb2RlID0gbmV3IFNlcmllTm9kZSh1bmRlZmluZWQsIDxhbnk+c2VyaWUpO1xyXG4gICAgICAgIHN1cGVyLmFkZFNlcmllTm9kZShuZXdTZXJpZU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHNlcmllIGZyb20gdGhpcyBzZXJpZSBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIC8vIEZvdW5kIHNlcmllIHdpdGhpbiBzZXJpZW5vZGVzXHJcbiAgICAgICAgbGV0IHNlcmllTm9kZTogSVNlcmllTm9kZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldLnNlcmllID09IHNlcmllKXtcclxuICAgICAgICAgICAgICAgIHNlcmllTm9kZSA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlcmllTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzdXBlci5yZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYWxsIHJlZmVyZW5jZXMgdG8gdGhlIGdpdmVuIHNlcmllIHdpdGhpbiB0aGlzIHNlcmllIGdyb3VwKGUuZy4gcmVmZXJlbmNlcyBpbiBjYWxjdWxhdGlvbnMpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUmVmZXJlbmNlc1RvU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcbiAgICAgICAgaWYoIShzZXJpZU5vZGUgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpKXtcclxuICAgICAgICAgICAgLy8gaW5mb3JtIGFsbCBjaGlsZCBub2RlcyhjYWxjdWxhdGlvbnMpIHRoYXQgYSBzZXJpZSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGlzIHNlcmllR3JvdXA7IG9ubHkgaW4gY2FzZSBvZlxyXG4gICAgICAgICAgICAvLyB0aGUgc2VyaWVOb2RlIGlzIG5vIGlucHV0U2lnbmFsIG9mIGEgY2FsY3VsYXRpb25cclxuICAgICAgICAgICAgdGhpcy5nZXRDaGlsZHMoKS5mb3JFYWNoKGNoaWxkID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IGNoaWxkIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXJpZU5vZGUuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRpb24ucmVtb3ZlUmVmZXJlbmNlc1RvU2VyaWUoc2VyaWVOb2RlLnNlcmllKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aCBhbGwgc3ViIG9iamVjdHMoZS5nLiBzZXJpZXMpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NlcmllR3JvdXB9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBTZXJpZUdyb3Vwe1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuc3RhcnRUcmlnZ2VyVGltZS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBzZXJpZUdyb3VwID0gbmV3IFNlcmllR3JvdXAodGhpcy5uYW1lLCBpZCwgdGhpcy5zdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICBzZXJpZUdyb3VwLmV4cGFuZFN0YXRlID0gdGhpcy5leHBhbmRTdGF0ZTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVOb2RlID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKHNlcmllTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc2VyaWVHcm91cC5hZGRTZXJpZU5vZGUoc2VyaWVOb2RlLmNsb25lKCksIC0xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxpc3RPZlNlcmllc0lkc1RvUmVtb3ZlOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAvLyB1cGRhdGUgc2VyaWVzIGF0IGlucHV0IGNhbGN1bGF0aW9uIGRhdGEgd2l0aCBjbG9uZWQgc2VyaWVzIGZyb20gc2VyaWUgZ3JvdXBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVHcm91cC5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25Ob2RlID0gc2VyaWVHcm91cC5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKGNhbGN1bGF0aW9uTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVJZHNUb1JlbW92ZSA9IGNhbGN1bGF0aW9uTm9kZS51cGRhdGVJbnB1dERhdGEoc2VyaWVHcm91cCk7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgb25seSBzZXJpZSBpZHMgd2hpY2ggYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBsaXN0XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRkVG9MaXN0ID0gc2VyaWVJZHNUb1JlbW92ZS5maWx0ZXIoKGl0ZW0pID0+IGxpc3RPZlNlcmllc0lkc1RvUmVtb3ZlLmluZGV4T2YoaXRlbSkgPCAwKTtcclxuICAgICAgICAgICAgICAgIGxpc3RPZlNlcmllc0lkc1RvUmVtb3ZlID0gbGlzdE9mU2VyaWVzSWRzVG9SZW1vdmUuY29uY2F0KGFkZFRvTGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhTW9kZWwgPSB0aGlzLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgIGlmKGRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzUHJvdmlkZXIgPSBkYXRhTW9kZWwuc2VyaWVzUHJvdmlkZXI7XHJcbiAgICAgICAgICAgIGlmKHNlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY2xvbmVkIHNlcmllcyBpbnB1dCBvYmplY3RzIGZyb20gc2VyaWVzIHByb3ZpZGVyIHRvIGF2b2lkIHVudXNlZCBzZXJpZXMgb2JqZWN0c1xyXG4gICAgICAgICAgICAgICAgbGlzdE9mU2VyaWVzSWRzVG9SZW1vdmUuZm9yRWFjaChzZXJpZXNJZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzUHJvdmlkZXIhLnJlbW92ZShzZXJpZXNJZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmllR3JvdXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSB3aXRoIHRoZSBnaXZlbiBzZXJpZU5hbWUgd2l0aGluIHRoZSBzZXJpZSBncm91cFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZXJpZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWUoc2VyaWVOYW1lOiBzdHJpbmcpOiBCYXNlU2VyaWVzfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gdGhpcy5nZXRTZXJpZXMoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ubmFtZSA9PSBzZXJpZU5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcmllc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlcmllQnlPcmlnaW5hbE5hbWUob3JpZ2luYWxOYW1lOiBzdHJpbmcpOiBCYXNlU2VyaWVzfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gdGhpcy5nZXRTZXJpZXMoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ub3JpZ2luYWxOYW1lID09IG9yaWdpbmFsTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXJnZXMgdGhlIGluZm9ybWF0aW9uIG9mIGEgc2VyaWUgZ3JvdXAgdG8gYW4gZXhpc3Rpbmcgc2VyaWUgZ3JvdXBcclxuICAgICAqIEFkZHMgbmV3IHNlcmllczsgcmVtb3ZlcyBub3QgYXZhaWxhYmxlIHNlcmllczsgdXBkYXRlcyB0aGUgZGF0YSBvZiBleGlzdGluZyBzZXJpZXMoc2FtZSBzZXJpZSBuYW1lKVxyXG4gICAgICogQ2FsY3VsYXRpb25zIHdpbGwgYmUgaWdub3JlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNlcmllR3JvdXB9IG5ld1NlcmllR3JvdXBcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUdyb3VwXHJcbiAgICAgKi9cclxuICAgIG1lcmdlV2l0aFNlcmllR3JvdXAobmV3U2VyaWVHcm91cDogSVNlcmllR3JvdXApe1xyXG4gICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IG5ld1NlcmllR3JvdXAuc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuZXdTZXJpZUdyb3VwLm5hbWU7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHVudXNlZCBzZXJpZXMgKG9ubHkgaWYgbm90IGEgY2FsY3VsYXRpb24pXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VyaWVOb2RlID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzZXJpZU5vZGVOYW1lID0gc2VyaWVOb2RlLm5hbWU7XHJcbiAgICAgICAgICAgIGlmKHNlcmllTm9kZS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc2VyaWVOb2RlTmFtZSA9IHNlcmllTm9kZS5zZXJpZSEub3JpZ2luYWxOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmb3VuZFNlcmllTm9kZSA9IG5ld1NlcmllR3JvdXAuZ2V0U2VyaWVCeU9yaWdpbmFsTmFtZShzZXJpZU5vZGVOYW1lKTtcclxuICAgICAgICAgICAgaWYoZm91bmRTZXJpZU5vZGUgPT0gdW5kZWZpbmVkKXsgXHJcbiAgICAgICAgICAgICAgICBpZighKHNlcmllTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbikpeyAvLyBSZW1vdmUgb25seSBpZiBub3QgYSBjYWxjdWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGVzIHRoZSBkYXRhIG9mIGFuIGV4aXN0aW5nIHNlcmllXHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZU5vZGUuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZU5vZGUuc2VyaWUudXBkYXRlUG9pbnRzKGZvdW5kU2VyaWVOb2RlLnJhd1BvaW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVOb2RlLnNlcmllLnN0YXJ0VHJpZ2dlclRpbWUgPSBmb3VuZFNlcmllTm9kZS5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVzRnJvbUdyb3VwKG5ld1NlcmllR3JvdXApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNlcmllcyBmcm9tIHRoZSBnaXZlbiBzZXJpZUdyb3VwIHRvIHRoaXMgc2VyaWVHcm91cCBpZiBub3QgYWxyZWFkeSB0aGVyZVxyXG4gICAgICogU2lnbmFscyB3aWxsIGJlIGFkZGVkIGJlZm9yZSB0aGUgZmlyc3QgY2FsY3VsYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVHcm91cH0gc2VyaWVHcm91cFxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZXNGcm9tR3JvdXAoc2VyaWVHcm91cDogSVNlcmllR3JvdXApe1xyXG4gICAgICAgIC8vIGFkZCBuZXcgc2VyaWVzIGJlZm9yZSBjYWxjdWxhdGlvbnNcclxuICAgICAgICBsZXQgZmlyc3RDYWxjdWxhdGlvbkluZGV4ID0gdGhpcy5nZXRGaXJzdENhbGN1bGF0aW9uSW5kZXgoKTtcclxuICAgICAgICBsZXQgY2hpbGRzID0gc2VyaWVHcm91cC5nZXRDaGlsZHMoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNlcmllTm9kZU5hbWUgPSBjaGlsZHNbaV0ubmFtZTtcclxuICAgICAgICAgICAgaWYoY2hpbGRzW2ldLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZU5vZGVOYW1lID0gY2hpbGRzW2ldLnNlcmllIS5vcmlnaW5hbE5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZvdW5kU2VyaWVOb2RlID0gdGhpcy5nZXRTZXJpZUJ5T3JpZ2luYWxOYW1lKHNlcmllTm9kZU5hbWUpO1xyXG4gICAgICAgICAgICBpZihmb3VuZFNlcmllTm9kZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1NlcmllTm9kZSA9IGNoaWxkc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmKG5ld1NlcmllTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVOb2RlKG5ld1NlcmllTm9kZSwgZmlyc3RDYWxjdWxhdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZihmaXJzdENhbGN1bGF0aW9uSW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdENhbGN1bGF0aW9uSW5kZXgrKzsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9EZWxldGUgb2xkIHNlcmllTm9kZSBmcm9tIHNlcmllUHJvdmlkZXIgKGFzIHRoZSBuZXcgc2VyaWVOb2RlIG9mIHNlcmllR3JvdXAgaXMgdXNlZClcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhTW9kZWwgPSB0aGlzLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YU1vZGVsIS5zZXJpZXNQcm92aWRlciEucmVtb3ZlKGNoaWxkc1tpXS5zZXJpZSEuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGNhbGN1bGF0aW9uIGluIHRoZSBjaGlsZHMgb2YgdGhpcyBncm91cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRGaXJzdENhbGN1bGF0aW9uSW5kZXgoKTogbnVtYmVye1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
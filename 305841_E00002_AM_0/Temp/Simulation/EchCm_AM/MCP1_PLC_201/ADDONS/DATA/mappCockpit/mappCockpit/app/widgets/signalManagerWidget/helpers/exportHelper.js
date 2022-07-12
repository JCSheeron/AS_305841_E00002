define(["require", "exports", "../../../common/exportSerieGroup", "../../../models/common/signal/serieGroup", "../../../models/signalManagerDataModel/signalManagerCalculation", "../../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../../../models/common/series/seriesType", "../../../models/signalManagerDataModel/signalCategory"], function (require, exports, exportSerieGroup_1, serieGroup_1, signalManagerCalculation_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, seriesType_1, signalCategory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportHelper = /** @class */ (function () {
        function ExportHelper() {
        }
        /**
         * Returns array of exportSerieGroup elements
         *
         * @param {*} elements
         * @returns {Array<ExportSerieGroup>}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.getExportableElements = function (elements) {
            var serieGroups = new Array();
            var items = new Array();
            var groupElements = new Array();
            var signalCalculations = new Array();
            var signalInputCalculations = new Array();
            var signalOutputCalculations = new Array();
            //delete not exportable items
            for (var i = 0; i < elements.length; i++) {
                if (!this.isElementExportable(elements[i].item)) {
                    elements.splice(i, 1);
                    i = -1;
                }
            }
            //Classify selected elements into arrays according to its type 
            for (var i = 0; i < elements.length; i++) {
                items.push(elements[i].item);
                //Put all signalCalculations selected into an array for later checks
                if (elements[i].item instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                    signalCalculations.push(elements[i].item);
                }
                //Put all signalInputCalculations selected into an array for later checks
                else if (elements[i].item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    if (!this.isSignalRepeated(signalInputCalculations, elements[i].item.serie)) {
                        signalInputCalculations.push(elements[i].item);
                    }
                    else {
                        var index = items.indexOf(elements[i].item);
                        items.splice(index, 1);
                    }
                }
                //Put all signalOuputCalculations selected into an array for later
                else if (elements[i].item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    signalOutputCalculations.push(elements[i].item);
                }
                else if (elements[i].item instanceof serieGroup_1.SerieGroup) {
                    //Put all seriegroups selected into an array
                    var serieGroup = elements[i].item;
                    serieGroups.push(serieGroup);
                    //Convert selected Seriegroups to exportSerieGroups
                    if (serieGroup.getChilds()[0] != undefined) {
                        groupElements.push(new exportSerieGroup_1.ExportSerieGroup(serieGroup.name, serieGroup.startTriggerTime, elements[i].item.childs[0].serie));
                        for (var j = 1; j < serieGroup.getChilds().length; j++) {
                            if (serieGroup.getChilds()[j].serie != undefined && serieGroup.getChilds()[j].serie.rawPointsValid == true) {
                                var index = groupElements.length - 1;
                                groupElements[index].addSerie(serieGroup.getChilds()[j].serie);
                            }
                        }
                    }
                }
            }
            this.filterSelectedItems(items, serieGroups, signalCalculations, signalInputCalculations, signalOutputCalculations, groupElements);
            return groupElements;
        };
        /**
         * Delete duplicated series, invalid series or not need it
         *
         * @private
         * @param {Array<any>} items
         * @param {Array<SerieGroup>} serieGroups
         * @param {Array<SignalManagerCalculation>} signalCalculations
         * @param {Array<SignalManagerCalculationInputData>} signalInputCalculations
         * @param {Array<SignalManagerCalculationOutputData>} signalOutputCalculations
         * @memberof ExportHelper
         */
        ExportHelper.prototype.filterSelectedItems = function (items, serieGroups, signalCalculations, signalInputCalculations, signalOutputCalculations, groupElements) {
            //delete selected rows if its SerieGroup is also selected. 
            for (var i = 0; i < items.length; i++) {
                for (var j = 0; j < serieGroups.length; j++) {
                    if (!(items[i] instanceof serieGroup_1.SerieGroup) && items[i].getSerieGroup() == serieGroups[j]) {
                        //delete same element in alll arrays
                        var index = signalCalculations.indexOf(items[i]);
                        signalCalculations.splice(index, 1);
                        index = signalInputCalculations.indexOf(items[i]);
                        signalInputCalculations.splice(index, 1);
                        index = signalOutputCalculations.indexOf(items[i]);
                        signalOutputCalculations.splice(index, 1);
                        items.splice(i, 1);
                        i = -1;
                        break;
                    }
                }
            }
            //delete selected CalculationOutput if its CalculationData is also selected. 
            for (var i = 0; i < signalOutputCalculations.length; i++) {
                if (this.isSignalRepeated(signalCalculations, signalOutputCalculations[i].serie)) {
                    var index = items.indexOf(signalOutputCalculations[i]);
                    signalOutputCalculations.splice(i, 1);
                    items.splice(index, 1);
                    i = -1;
                }
            }
            //add input calculation data if calculation is selected
            for (var i = 0; i < signalCalculations.length; i++) {
                var inputSeries = signalCalculations[i].getInputCalculationData();
                if (signalCalculations[i].getOutputCalculationData()[0].serie.type != seriesType_1.SeriesType.timeSeries) { //Momentary solution. Next step: Export the whole YT formula
                    this.addInputElements(items, inputSeries);
                }
            }
            //add input calculation data if ouput calculation is selected 
            for (var i = 0; i < signalOutputCalculations.length; i++) {
                var calculation = signalOutputCalculations[i].parent.parent;
                var inputSeries = calculation.getInputCalculationData();
                if (signalOutputCalculations[i].serie.type != seriesType_1.SeriesType.timeSeries) { //Momentary solution. Next step: Export the whole YT formula
                    this.addInputElements(items, inputSeries);
                }
            }
            //delete repeated selected series (serie + same serie in input calculation)
            for (var i = 0; i < items.length; i++) {
                if (!(items[i] instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) && this.isSignalRepeated(signalInputCalculations, items[i].serie)) {
                    items.splice(i, 1);
                    i = -1;
                }
            }
            //create exportSerieGroups with the selected rows
            for (var i = 0; i < items.length; i++) {
                if (!(items[i] instanceof serieGroup_1.SerieGroup)) {
                    var parent_1 = items[i].getSerieGroup();
                    var newGroup = true;
                    for (var j = 0; j < groupElements.length; j++) {
                        if (parent_1.startTriggerTime == groupElements[j].startTriggerTime) {
                            newGroup = false;
                            groupElements[j].addSerie(items[i].serie);
                        }
                    }
                    if (newGroup) {
                        groupElements.push(new exportSerieGroup_1.ExportSerieGroup(parent_1.name, parent_1.startTriggerTime, items[i].serie));
                    }
                }
            }
        };
        /**
         * Returns true if a signal is repeated
         *
         * @private
         * @param {Array<any>} arrayOfItems
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.isSignalRepeated = function (arrayOfItems, serie) {
            for (var i = 0; i < arrayOfItems.length; i++) {
                if (arrayOfItems[i].serie == serie) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Add input series (if not selected) in XY or FFT formulas
         *
         * @private
         * @param {Array<any>} items
         * @param {Array<SignalManagerCalculationInputData>} inputSeries
         * @memberof ExportHelper
         */
        ExportHelper.prototype.addInputElements = function (items, inputSeries) {
            for (var j = 0; j < inputSeries.length; j++) {
                var isSelected = false;
                for (var a = 0; a < items.length; a++) {
                    if (inputSeries[j].serie == items[a].serie) {
                        isSelected = true;
                    }
                }
                if (!isSelected) {
                    items.push(inputSeries[j]);
                }
            }
        };
        /**
         * Returns true if selected element can be exported
         *
         * @param {*} item
         * @returns {boolean}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.isElementExportable = function (item) {
            //SignalCategory selected
            if (item instanceof signalCategory_1.SignalCategory) {
                return false;
            }
            //Input data without valid signal is selected
            else if (item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && item.serie == undefined) {
                return false;
            }
            //Name of Calculation selected
            else if (item.parent instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                return false;
            }
            //SerieContainer selected
            else if (!(item instanceof serieGroup_1.SerieGroup) && item.parent instanceof signalCategory_1.SignalCategory) {
                return false;
            }
            //Calculated signal is invalid
            else if ((item instanceof signalManagerCalculation_1.SignalManagerCalculation || item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) && (item.serie == undefined || item.serie.rawPointsValid == false)) {
                return false;
            }
            return true;
        };
        return ExportHelper;
    }());
    exports.ExportHelper = ExportHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvaGVscGVycy9leHBvcnRIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFBQTtRQThOQSxDQUFDO1FBNU5HOzs7Ozs7V0FNRztRQUNJLDRDQUFxQixHQUE1QixVQUE2QixRQUFRO1lBQ2pDLElBQUksV0FBVyxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBb0IsQ0FBQztZQUNsRCxJQUFJLGtCQUFrQixHQUFHLElBQUksS0FBSyxFQUE0QixDQUFDO1lBQy9ELElBQUksdUJBQXVCLEdBQUcsSUFBSSxLQUFLLEVBQXFDLENBQUM7WUFDN0UsSUFBSSx3QkFBd0IsR0FBRyxJQUFJLEtBQUssRUFBc0MsQ0FBQztZQUUvRSw2QkFBNkI7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM3QyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNWO2FBQ0o7WUFFRCwrREFBK0Q7WUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FB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QUMsVUFBVSxFQUFFO29CQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksMENBQW1CLEdBQTFCLFVBQTJCLElBQUk7WUFDM0IseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxZQUFZLCtCQUFjLEVBQUU7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsNkNBQTZDO2lCQUN4QyxJQUFHLElBQUksWUFBWSxxRUFBaUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDakYsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCw4QkFBOEI7aUJBQ3pCLElBQUcsSUFBSSxDQUFDLE1BQU0sWUFBWSxtREFBd0IsRUFBRTtnQkFDckQsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCx5QkFBeUI7aUJBQ3BCLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSx1QkFBVSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sWUFBWSwrQkFBYyxFQUFFO2dCQUM3RSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELDhCQUE4QjtpQkFDekIsSUFBSSxDQUFDLElBQUksWUFBWSxtREFBd0IsSUFBSSxJQUFJLFlBQVksdUVBQWtDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUMxSyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDTCxtQkFBQztJQUFELENBQUMsQUE5TkQsSUE4TkM7SUFFUSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4cG9ydFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2V4cG9ydFNlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgU2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5cclxuY2xhc3MgRXhwb3J0SGVscGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYXJyYXkgb2YgZXhwb3J0U2VyaWVHcm91cCBlbGVtZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudHNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxFeHBvcnRTZXJpZUdyb3VwPn1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEV4cG9ydGFibGVFbGVtZW50cyhlbGVtZW50cyk6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+IHtcclxuICAgICAgICBsZXQgc2VyaWVHcm91cHMgPSBuZXcgQXJyYXk8U2VyaWVHcm91cD4oKTtcclxuICAgICAgICBsZXQgaXRlbXMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGxldCBncm91cEVsZW1lbnRzID0gbmV3IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KCk7XHJcbiAgICAgICAgbGV0IHNpZ25hbENhbGN1bGF0aW9ucyA9IG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24+KCk7XHJcbiAgICAgICAgbGV0IHNpZ25hbElucHV0Q2FsY3VsYXRpb25zID0gbmV3IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4oKTtcclxuICAgICAgICBsZXQgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zID0gbmV3IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGE+KCk7XHJcblxyXG4gICAgICAgIC8vZGVsZXRlIG5vdCBleHBvcnRhYmxlIGl0ZW1zXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNFbGVtZW50RXhwb3J0YWJsZShlbGVtZW50c1tpXS5pdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgaSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0NsYXNzaWZ5IHNlbGVjdGVkIGVsZW1lbnRzIGludG8gYXJyYXlzIGFjY29yZGluZyB0byBpdHMgdHlwZSBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goZWxlbWVudHNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgIC8vUHV0IGFsbCBzaWduYWxDYWxjdWxhdGlvbnMgc2VsZWN0ZWQgaW50byBhbiBhcnJheSBmb3IgbGF0ZXIgY2hlY2tzXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50c1tpXS5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxDYWxjdWxhdGlvbnMucHVzaChlbGVtZW50c1tpXS5pdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1B1dCBhbGwgc2lnbmFsSW5wdXRDYWxjdWxhdGlvbnMgc2VsZWN0ZWQgaW50byBhbiBhcnJheSBmb3IgbGF0ZXIgY2hlY2tzXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnRzW2ldLml0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NpZ25hbFJlcGVhdGVkKHNpZ25hbElucHV0Q2FsY3VsYXRpb25zLCBlbGVtZW50c1tpXS5pdGVtLnNlcmllKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsSW5wdXRDYWxjdWxhdGlvbnMucHVzaChlbGVtZW50c1tpXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaXRlbXMuaW5kZXhPZihlbGVtZW50c1tpXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vUHV0IGFsbCBzaWduYWxPdXB1dENhbGN1bGF0aW9ucyBzZWxlY3RlZCBpbnRvIGFuIGFycmF5IGZvciBsYXRlclxyXG4gICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50c1tpXS5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zLnB1c2goZWxlbWVudHNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudHNbaV0uaXRlbSBpbnN0YW5jZW9mIFNlcmllR3JvdXApIHtcclxuICAgICAgICAgICAgICAgIC8vUHV0IGFsbCBzZXJpZWdyb3VwcyBzZWxlY3RlZCBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVHcm91cDogU2VyaWVHcm91cCA9IGVsZW1lbnRzW2ldLml0ZW07XHJcbiAgICAgICAgICAgICAgICBzZXJpZUdyb3Vwcy5wdXNoKHNlcmllR3JvdXApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vQ29udmVydCBzZWxlY3RlZCBTZXJpZWdyb3VwcyB0byBleHBvcnRTZXJpZUdyb3Vwc1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcmllR3JvdXAuZ2V0Q2hpbGRzKClbMF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBFbGVtZW50cy5wdXNoKG5ldyBFeHBvcnRTZXJpZUdyb3VwKHNlcmllR3JvdXAubmFtZSwgc2VyaWVHcm91cC5zdGFydFRyaWdnZXJUaW1lLCBlbGVtZW50c1tpXS5pdGVtLmNoaWxkc1swXS5zZXJpZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgc2VyaWVHcm91cC5nZXRDaGlsZHMoKS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VyaWVHcm91cC5nZXRDaGlsZHMoKVtqXS5zZXJpZSAhPSB1bmRlZmluZWQgJiYgc2VyaWVHcm91cC5nZXRDaGlsZHMoKVtqXS5zZXJpZSEucmF3UG9pbnRzVmFsaWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gZ3JvdXBFbGVtZW50cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBFbGVtZW50c1tpbmRleF0uYWRkU2VyaWUoc2VyaWVHcm91cC5nZXRDaGlsZHMoKVtqXS5zZXJpZSEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkSXRlbXMoaXRlbXMsIHNlcmllR3JvdXBzLCBzaWduYWxDYWxjdWxhdGlvbnMsIHNpZ25hbElucHV0Q2FsY3VsYXRpb25zLCBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnMsIGdyb3VwRWxlbWVudHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gZ3JvdXBFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZSBkdXBsaWNhdGVkIHNlcmllcywgaW52YWxpZCBzZXJpZXMgb3Igbm90IG5lZWQgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBpdGVtc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxTZXJpZUdyb3VwPn0gc2VyaWVHcm91cHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uPn0gc2lnbmFsQ2FsY3VsYXRpb25zXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT59IHNpZ25hbElucHV0Q2FsY3VsYXRpb25zXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGE+fSBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnNcclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaWx0ZXJTZWxlY3RlZEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+LCBzZXJpZUdyb3VwczogQXJyYXk8U2VyaWVHcm91cD4sIHNpZ25hbENhbGN1bGF0aW9uczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uPiwgc2lnbmFsSW5wdXRDYWxjdWxhdGlvbnM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4sIHNpZ25hbE91dHB1dENhbGN1bGF0aW9uczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT4sIGdyb3VwRWxlbWVudHM6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KSB7XHJcbiAgICAgICAgLy9kZWxldGUgc2VsZWN0ZWQgcm93cyBpZiBpdHMgU2VyaWVHcm91cCBpcyBhbHNvIHNlbGVjdGVkLiBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VyaWVHcm91cHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghKGl0ZW1zW2ldIGluc3RhbmNlb2YgU2VyaWVHcm91cCkgJiYgaXRlbXNbaV0uZ2V0U2VyaWVHcm91cCgpID09IHNlcmllR3JvdXBzW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgc2FtZSBlbGVtZW50IGluIGFsbGwgYXJyYXlzXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gc2lnbmFsQ2FsY3VsYXRpb25zLmluZGV4T2YoaXRlbXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbENhbGN1bGF0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gc2lnbmFsSW5wdXRDYWxjdWxhdGlvbnMuaW5kZXhPZihpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsSW5wdXRDYWxjdWxhdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucy5pbmRleE9mKGl0ZW1zW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2RlbGV0ZSBzZWxlY3RlZCBDYWxjdWxhdGlvbk91dHB1dCBpZiBpdHMgQ2FsY3VsYXRpb25EYXRhIGlzIGFsc28gc2VsZWN0ZWQuIFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2lnbmFsUmVwZWF0ZWQoc2lnbmFsQ2FsY3VsYXRpb25zLCBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnNbaV0uc2VyaWUhKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaXRlbXMuaW5kZXhPZihzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICBpID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWRkIGlucHV0IGNhbGN1bGF0aW9uIGRhdGEgaWYgY2FsY3VsYXRpb24gaXMgc2VsZWN0ZWRcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ25hbENhbGN1bGF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRTZXJpZXM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4gPSBzaWduYWxDYWxjdWxhdGlvbnNbaV0uZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgaWYgKHNpZ25hbENhbGN1bGF0aW9uc1tpXS5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKVswXS5zZXJpZSEudHlwZSAhPSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHsgLy9Nb21lbnRhcnkgc29sdXRpb24uIE5leHQgc3RlcDogRXhwb3J0IHRoZSB3aG9sZSBZVCBmb3JtdWxhXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZElucHV0RWxlbWVudHMoaXRlbXMsIGlucHV0U2VyaWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgaW5wdXQgY2FsY3VsYXRpb24gZGF0YSBpZiBvdXB1dCBjYWxjdWxhdGlvbiBpcyBzZWxlY3RlZCBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRpb24gPSBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnNbaV0ucGFyZW50IS5wYXJlbnQhIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbjtcclxuICAgICAgICAgICAgbGV0IGlucHV0U2VyaWVzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+ID0gY2FsY3VsYXRpb24uZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgaWYgKHNpZ25hbE91dHB1dENhbGN1bGF0aW9uc1tpXS5zZXJpZSEudHlwZSAhPSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHsgLy9Nb21lbnRhcnkgc29sdXRpb24uIE5leHQgc3RlcDogRXhwb3J0IHRoZSB3aG9sZSBZVCBmb3JtdWxhXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZElucHV0RWxlbWVudHMoaXRlbXMsIGlucHV0U2VyaWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9kZWxldGUgcmVwZWF0ZWQgc2VsZWN0ZWQgc2VyaWVzIChzZXJpZSArIHNhbWUgc2VyaWUgaW4gaW5wdXQgY2FsY3VsYXRpb24pXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIShpdGVtc1tpXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSkgJiYgdGhpcy5pc1NpZ25hbFJlcGVhdGVkKHNpZ25hbElucHV0Q2FsY3VsYXRpb25zLCBpdGVtc1tpXS5zZXJpZSkpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGkgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jcmVhdGUgZXhwb3J0U2VyaWVHcm91cHMgd2l0aCB0aGUgc2VsZWN0ZWQgcm93c1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCEoaXRlbXNbaV0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudDogU2VyaWVHcm91cCA9IGl0ZW1zW2ldLmdldFNlcmllR3JvdXAoKSBhcyBTZXJpZUdyb3VwO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0dyb3VwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZ3JvdXBFbGVtZW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuc3RhcnRUcmlnZ2VyVGltZSA9PSBncm91cEVsZW1lbnRzW2pdLnN0YXJ0VHJpZ2dlclRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBFbGVtZW50c1tqXS5hZGRTZXJpZShpdGVtc1tpXS5zZXJpZSEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0dyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBFbGVtZW50cy5wdXNoKG5ldyBFeHBvcnRTZXJpZUdyb3VwKHBhcmVudC5uYW1lLCBwYXJlbnQuc3RhcnRUcmlnZ2VyVGltZSwgaXRlbXNbaV0uc2VyaWUhKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYSBzaWduYWwgaXMgcmVwZWF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnJheU9mSXRlbXNcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzU2lnbmFsUmVwZWF0ZWQoYXJyYXlPZkl0ZW1zOiBBcnJheTxhbnk+LCBzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZkl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheU9mSXRlbXNbaV0uc2VyaWUgPT0gc2VyaWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBpbnB1dCBzZXJpZXMgKGlmIG5vdCBzZWxlY3RlZCkgaW4gWFkgb3IgRkZUIGZvcm11bGFzIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGl0ZW1zXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT59IGlucHV0U2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkSW5wdXRFbGVtZW50cyhpdGVtczogQXJyYXk8YW55PiwgaW5wdXRTZXJpZXM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4pIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGlucHV0U2VyaWVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgaXRlbXMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dFNlcmllc1tqXS5zZXJpZSA9PSBpdGVtc1thXS5zZXJpZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChpbnB1dFNlcmllc1tqXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgc2VsZWN0ZWQgZWxlbWVudCBjYW4gYmUgZXhwb3J0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGl0ZW1cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFbGVtZW50RXhwb3J0YWJsZShpdGVtKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy9TaWduYWxDYXRlZ29yeSBzZWxlY3RlZFxyXG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0lucHV0IGRhdGEgd2l0aG91dCB2YWxpZCBzaWduYWwgaXMgc2VsZWN0ZWRcclxuICAgICAgICBlbHNlIGlmKGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgJiYgaXRlbS5zZXJpZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vTmFtZSBvZiBDYWxjdWxhdGlvbiBzZWxlY3RlZFxyXG4gICAgICAgIGVsc2UgaWYoaXRlbS5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1NlcmllQ29udGFpbmVyIHNlbGVjdGVkXHJcbiAgICAgICAgZWxzZSBpZiAoIShpdGVtIGluc3RhbmNlb2YgU2VyaWVHcm91cCkgJiYgaXRlbS5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQ2FsY3VsYXRlZCBzaWduYWwgaXMgaW52YWxpZFxyXG4gICAgICAgIGVsc2UgaWYgKChpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIHx8IGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKSAmJiAoaXRlbS5zZXJpZSA9PSB1bmRlZmluZWQgfHwgaXRlbS5zZXJpZS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEV4cG9ydEhlbHBlciB9OyJdfQ==
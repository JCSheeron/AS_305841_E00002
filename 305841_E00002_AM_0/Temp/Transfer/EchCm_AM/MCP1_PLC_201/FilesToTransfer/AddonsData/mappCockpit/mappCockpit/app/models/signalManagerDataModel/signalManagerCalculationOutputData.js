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
define(["require", "exports", "../common/signal/serieNode", "./eventSignalManagerDataChangedArgs", "../common/signal/signal", "../common/calculatorProvider/calculationDataNumber", "../../common/seriesHelper", "../../common/colorHelper"], function (require, exports, serieNode_1, eventSignalManagerDataChangedArgs_1, signal_1, calculationDataNumber_1, seriesHelper_1, colorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculationOutputData = /** @class */ (function (_super) {
        __extends(SignalManagerCalculationOutputData, _super);
        /**
         * Creates an instance of SignalManagerCalculationOutputData.
         * @param {TCalculationData} calculationData
         * @param {boolean} isInput
         * @memberof SignalManagerCalculationOutputData
         */
        function SignalManagerCalculationOutputData(calculationData, seriesProvider) {
            var _this = _super.call(this, "", undefined) || this;
            _this.onlyValuesFromListAreAllowed = false;
            _this.dropPossible = false;
            _this.calculationData = calculationData;
            // generate unique calculation output name
            var uniqueOutputName = _this.calculationData.value + " " + seriesProvider.getUniqueCalculationId();
            if (calculationData.type != undefined) {
                var signal = new signal_1.Signal(uniqueOutputName, new Array());
                var settings = seriesHelper_1.SeriesHelper.createSerieSettings(signal, signal.name, colorHelper_1.ColorHelper.getColor(), seriesProvider.getUniqueId(), calculationData.type);
                _this.serie = seriesProvider.createSerie(settings);
                _this.serie.isCalculated = true;
            }
            _this._value = uniqueOutputName;
            _this.canDelete = false;
            return _this;
        }
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "values", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "minValue", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "maxValue", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "dataTypeName", {
            get: function () {
                if (this.calculationData instanceof calculationDataNumber_1.CalculationDataNumber) {
                    return "Float";
                }
                else {
                    return "String";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (value) {
                this._parent = value;
                if (this._parent != undefined && this.serie != undefined) {
                    this.serie.parent = this.getSerieGroup();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "name", {
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == true) {
                        return this.calculationData.getDisplayName(); // Show the display name of input/output parameter in edit mode
                    }
                }
                return this.value; // Show only the value 
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "description", {
            get: function () {
                return this.calculationData.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "color", {
            get: function () {
                if (this.serie != undefined) {
                    return this.serie.color;
                }
                return "";
            },
            set: function (value) {
                var oldValue = "";
                if (this.serie != undefined) {
                    oldValue = this.serie.color;
                    this.serie.color = value;
                }
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.colorChanged, value, oldValue));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "value", {
            get: function () {
                if (this.serie != undefined) {
                    return this.serie.name;
                }
                return this._value;
            },
            set: function (value) {
                var oldValue = this._value;
                this._value = value;
                if (this.serie != undefined) {
                    this.serie.name = value;
                }
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.valueChanged, value, oldValue));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "nodeType", {
            get: function () {
                return serieNode_1.NodeType.calculationOutputParam;
            },
            enumerable: true,
            configurable: true
        });
        return SignalManagerCalculationOutputData;
    }(serieNode_1.SerieNode));
    exports.SignalManagerCalculationOutputData = SignalManagerCalculationOutputData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBd0Qsc0RBQVM7UUEwRjdEOzs7OztXQUtHO1FBQ0gsNENBQVksZUFBaUMsRUFBRSxjQUErQjtZQUE5RSxZQUNJLGtCQUFNLEVBQUUsRUFBRSxTQUFTLENBQUMsU0FZdkI7WUEzR0Qsa0NBQTRCLEdBQVksS0FBSyxDQUFDO1lBQzlDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1lBK0YxQixLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QywwQ0FBMEM7WUFDMUMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDbEcsSUFBRyxlQUFlLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztnQkFDakMsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLFFBQVEsR0FBRywyQkFBWSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLHlCQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDaEosS0FBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBRSxDQUFDO2dCQUNuRCxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDbEM7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QUFJLFNBQVMsRUFBQztvQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2lCQUMzQjtnQkFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLHFFQUFpQyxDQUFDLHVEQUFtQixDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2SCxDQUFDOzs7V0FWQTtRQVlELHNCQUFXLHdEQUFRO2lCQUFuQjtnQkFDSSxPQUFPLG9CQUFRLENBQUMsc0JBQXNCLENBQUM7WUFDM0MsQ0FBQzs7O1dBQUE7UUFzQkwseUNBQUM7SUFBRCxDQUFDLEFBOUdELENBQXdELHFCQUFTLEdBOEdoRTtJQTlHWSxnRkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2VyaWVDb250YWluZXJJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFNlcmllTm9kZSwgTm9kZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckFjdGlvbiwgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NpZ25hbFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzSGVscGVyXCI7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvckhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEgZXh0ZW5kcyBTZXJpZU5vZGUgaW1wbGVtZW50cyBJQ2VsbEluZm97XHJcbiAgICBjYWxjdWxhdGlvbkRhdGE6IFRDYWxjdWxhdGlvbkRhdGE7XHJcbiAgICBvbmx5VmFsdWVzRnJvbUxpc3RBcmVBbGxvd2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBkcm9wUG9zc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsdWVzKCk6IEFycmF5PElWYWx1ZUxpc3RJdGVtPnx1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtaW5WYWx1ZSgpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgbWF4VmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGVOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkZsb2F0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0cmluZ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcmVudCAhPSB1bmRlZmluZWQgJiYgdGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllLnBhcmVudCA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmdldERpc3BsYXlOYW1lKCk7IC8vIFNob3cgdGhlIGRpc3BsYXkgbmFtZSBvZiBpbnB1dC9vdXRwdXQgcGFyYW1ldGVyIGluIGVkaXQgbW9kZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlOyAgLy8gU2hvdyBvbmx5IHRoZSB2YWx1ZSBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUuY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBvbGRWYWx1ZSA9IHRoaXMuc2VyaWUuY29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi5jb2xvckNoYW5nZWQsIHZhbHVlLCBvbGRWYWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllLm5hbWU7IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi52YWx1ZUNoYW5nZWQsIHZhbHVlLCBvbGRWYWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbm9kZVR5cGUoKTogTm9kZVR5cGV7XHJcbiAgICAgICAgcmV0dXJuIE5vZGVUeXBlLmNhbGN1bGF0aW9uT3V0cHV0UGFyYW07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhLlxyXG4gICAgICogQHBhcmFtIHtUQ2FsY3VsYXRpb25EYXRhfSBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNJbnB1dFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY2FsY3VsYXRpb25EYXRhOiBUQ2FsY3VsYXRpb25EYXRhLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyKXtcclxuICAgICAgICBzdXBlcihcIlwiLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhID0gY2FsY3VsYXRpb25EYXRhO1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIHVuaXF1ZSBjYWxjdWxhdGlvbiBvdXRwdXQgbmFtZVxyXG4gICAgICAgIGxldCB1bmlxdWVPdXRwdXROYW1lID0gdGhpcy5jYWxjdWxhdGlvbkRhdGEudmFsdWUgKyBcIiBcIiArIHNlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUNhbGN1bGF0aW9uSWQoKTtcclxuICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGEudHlwZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFsID0gbmV3IFNpZ25hbCh1bmlxdWVPdXRwdXROYW1lLCAgbmV3IEFycmF5PElQb2ludD4oKSk7XHJcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IFNlcmllc0hlbHBlci5jcmVhdGVTZXJpZVNldHRpbmdzKHNpZ25hbCwgc2lnbmFsLm5hbWUsIENvbG9ySGVscGVyLmdldENvbG9yKCksIHNlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUlkKCksIGNhbGN1bGF0aW9uRGF0YS50eXBlKVxyXG4gICAgICAgICAgICB0aGlzLnNlcmllID0gc2VyaWVzUHJvdmlkZXIuY3JlYXRlU2VyaWUoc2V0dGluZ3MpITtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5pc0NhbGN1bGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHVuaXF1ZU91dHB1dE5hbWU7XHJcbiAgICAgICAgdGhpcy5jYW5EZWxldGUgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=
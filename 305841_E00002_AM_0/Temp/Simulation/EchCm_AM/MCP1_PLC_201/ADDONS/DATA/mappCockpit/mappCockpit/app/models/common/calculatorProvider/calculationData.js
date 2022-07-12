define(["require", "exports", "../../common/series/seriesType"], function (require, exports, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationData = /** @class */ (function () {
        /**
         * Creates an instance of CalculationData
         * @param {string} id the id of the calculation data
         * @param {string} name the displayname of the calculation data
         * @param {string} value the displayValue of this calculation data
         * @param {(number| string| Array<IPoint>)} data the data(e.g. datapoints) of this calculation data
         * @param {string} [description=""]
         * @param {(CalculationDataDisplayInfo|undefined)} [displayInfo=undefined]
         * @memberof CalculationData
         */
        function CalculationData(id, name, value, data, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            this._type = seriesType_1.SeriesType.timeSeries;
            this.id = id;
            this._name = name;
            this._value = value;
            this._data = data;
            this.description = description;
            this.errorInfo = new Array();
            this.displayInfo = displayInfo;
            if (this.displayInfo != undefined) {
                this.values = this.displayInfo.values;
            }
        }
        /**
         * Sets the internal data from one object to an other one(e.g. for cloning objects)
         *
         * @static
         * @param {CalculationData} sourceObject
         * @param {CalculationData} targetObject
         * @memberof CalculationData
         */
        CalculationData.setRawData = function (sourceObject, targetObject) {
            targetObject._data = sourceObject._data;
        };
        /**
         * Creates a new calculationData object with the given data
         *
         * @param {*} data
         * @returns {CalculationData}
         * @memberof CalculationData
         */
        CalculationData.prototype.create = function (data) {
            var newObject = new CalculationData("", "", "", data);
            return newObject;
        };
        Object.defineProperty(CalculationData.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationData.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the display name of the calculation data
         *
         * @returns {string}
         * @memberof CalculationData
         */
        CalculationData.prototype.getDisplayName = function () {
            return this._name;
        };
        /**
         * Gets displayvalue to rawvalue if an value list exists.
         * Gets convererted string if value converter exists.
         *
         * @param {string} newValue
         * @returns {string}
         * @memberof CalculationData
         */
        CalculationData.prototype.getDisplayValue = function (newValue) {
            var retValue = newValue;
            if (this.values != undefined) {
                // Return displayValue instead of id if found in available values list
                this.values.forEach(function (value) {
                    if (newValue == value.value) {
                        retValue = value.displayValue;
                    }
                });
            }
            else if (this.valueConverter != undefined) {
                retValue = this.getValueFromRawValue(newValue);
            }
            return retValue;
        };
        /**
         * Gets rawvalue to displayvalue if an value list exists.
         *
         * @private
         * @param {string} value
         * @returns {string}
         * @memberof CalculationData
         */
        CalculationData.prototype.getRawValueToDisplayValue = function (value) {
            var rawValue = value;
            if (this.values != undefined) {
                // Set raw value instead of display value if found in available values list
                this.values.forEach(function (value) {
                    if (rawValue == value.displayValue) {
                        rawValue = value.value;
                    }
                });
            }
            return rawValue;
        };
        CalculationData.prototype.getIconPath = function () {
            return "";
        };
        CalculationData.prototype.getData = function () {
            return this._data;
        };
        CalculationData.prototype.setData = function (data) {
            this._data = data;
        };
        Object.defineProperty(CalculationData.prototype, "valueConverter", {
            get: function () {
                return this._valueConverter;
            },
            set: function (valueConverterInjection) {
                this._valueConverter = valueConverterInjection;
            },
            enumerable: true,
            configurable: true
        });
        CalculationData.prototype.getValueFromRawValue = function (rawValue) {
            if (this.valueConverter != undefined) {
                return this.valueConverter.getValueFromRawValue(rawValue);
            }
            return rawValue;
        };
        return CalculationData;
    }());
    exports.CalculationData = CalculationData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUE7UUFjSTs7Ozs7Ozs7O1dBU0c7UUFDSCx5QkFBWSxFQUFVLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxJQUFtQyxFQUFFLFdBQXVCLEVBQUUsV0FBNkQ7WUFBdEYsNEJBQUEsRUFBQSxnQkFBdUI7WUFBRSw0QkFBQSxFQUFBLHVCQUE2RDtZQVp4SyxVQUFLLEdBQTJCLHVCQUFVLENBQUMsVUFBVSxDQUFDO1lBYTFELElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBRXJDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSyxTQUFTLEVBQUM7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7YUFDekM7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLDBCQUFVLEdBQWpCLFVBQWtCLFlBQTZCLEVBQUUsWUFBNkI7WUFDMUUsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzVDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxnQ0FBTSxHQUFOLFVBQU8sSUFBUztZQUNaLElBQUksU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxzQkFBSSxrQ0FBSztpQkFBVDtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFFRCxVQUFVLEtBQWE7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7OztXQUpBO1FBTUQsc0JBQUksaUNBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBUyxLQUE2QjtnQkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQzs7O1dBSkE7UUFNRDs7Ozs7V0FLRztRQUNILHdDQUFjLEdBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSSx5Q0FBZSxHQUF0QixVQUF1QixRQUFnQjtZQUNuQyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDeEIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBQztnQkFDeEIsc0VBQXNFO2dCQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQ3JCLElBQUcsUUFBUSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUM7d0JBQ3ZCLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO3FCQUNqQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUNJLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxTQUFTLEVBQUM7Z0JBQ3JDLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLG1EQUF5QixHQUFoQyxVQUFpQyxLQUFhO1lBQzFDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFDO2dCQUN4QiwyRUFBMkU7Z0JBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDckIsSUFBRyxRQUFRLElBQUksS0FBSyxDQUFDLFlBQVksRUFBQzt3QkFDOUIsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7cUJBQzFCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQscUNBQVcsR0FBWDtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELGlDQUFPLEdBQVA7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUVELGlDQUFPLEdBQVAsVUFBUSxJQUFtQztZQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO1FBRUQsc0JBQUksMkNBQWM7aUJBSWxCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNoQyxDQUFDO2lCQU5ELFVBQW1CLHVCQUFrRDtnQkFDakUsSUFBSSxDQUFDLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQztZQUNuRCxDQUFDOzs7V0FBQTtRQU1PLDhDQUFvQixHQUE1QixVQUE2QixRQUFlO1lBQ3hDLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxTQUFTLEVBQUM7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM3RDtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFDTCxzQkFBQztJQUFELENBQUMsQUFoS0QsSUFnS0M7SUFoS1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jYWxjdWxhdGlvbkRhdGFJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBJVmFsdWVMaXN0SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vaW50ZXJmYWNlcy92YWx1ZUxpc3RJdGVtSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFTdHJpbmcgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFTdHJpbmdcIjtcclxuaW1wb3J0IHsgSVZhbHVlQ29udmVydGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy92YWx1ZUNvbnZlcnRlckludGVyZmFjZVwiO1xyXG5cclxuXHJcbi8vIGRlY2xhcmVzIGEgZGF0YSB0eXBlIGRlZmluaXRpb25cclxuZXhwb3J0IHR5cGUgVENhbGN1bGF0aW9uRGF0YSA9IENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c3xDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhU3RyaW5nO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uRGF0YSBpbXBsZW1lbnRzIElDYWxjdWxhdGlvbkRhdGF7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHZhbHVlczogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+fHVuZGVmaW5lZDtcclxuICAgIGRpc3BsYXlJbmZvOiBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQ7XHJcbiAgICBlcnJvckluZm86IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWVDb252ZXJ0ZXI6IElWYWx1ZUNvbnZlcnRlcnx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZ1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2RhdGE6IG51bWJlcnwgc3RyaW5nfCBBcnJheTxJUG9pbnQ+O1xyXG4gICAgcHJpdmF0ZSBfdHlwZTogU2VyaWVzVHlwZSB8IHVuZGVmaW5lZCA9IFNlcmllc1R5cGUudGltZVNlcmllcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2FsY3VsYXRpb25EYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgdGhlIGlkIG9mIHRoZSBjYWxjdWxhdGlvbiBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgZGlzcGxheW5hbWUgb2YgdGhlIGNhbGN1bGF0aW9uIGRhdGFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSB0aGUgZGlzcGxheVZhbHVlIG9mIHRoaXMgY2FsY3VsYXRpb24gZGF0YVxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD4pfSBkYXRhIHRoZSBkYXRhKGUuZy4gZGF0YXBvaW50cykgb2YgdGhpcyBjYWxjdWxhdGlvbiBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdXHJcbiAgICAgKiBAcGFyYW0geyhDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQpfSBbZGlzcGxheUluZm89dW5kZWZpbmVkXVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGE6IG51bWJlcnwgc3RyaW5nfCBBcnJheTxJUG9pbnQ+LCBkZXNjcmlwdGlvbjpzdHJpbmcgPSBcIlwiLCBkaXNwbGF5SW5mbzogQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm98dW5kZWZpbmVkID0gdW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5lcnJvckluZm8gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGlzcGxheUluZm8gPSBkaXNwbGF5SW5mbztcclxuICAgICAgICBpZih0aGlzLmRpc3BsYXlJbmZvICAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHRoaXMuZGlzcGxheUluZm8udmFsdWVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGludGVybmFsIGRhdGEgZnJvbSBvbmUgb2JqZWN0IHRvIGFuIG90aGVyIG9uZShlLmcuIGZvciBjbG9uaW5nIG9iamVjdHMpXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtDYWxjdWxhdGlvbkRhdGF9IHNvdXJjZU9iamVjdFxyXG4gICAgICogQHBhcmFtIHtDYWxjdWxhdGlvbkRhdGF9IHRhcmdldE9iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0UmF3RGF0YShzb3VyY2VPYmplY3Q6IENhbGN1bGF0aW9uRGF0YSwgdGFyZ2V0T2JqZWN0OiBDYWxjdWxhdGlvbkRhdGEpe1xyXG4gICAgICAgIHRhcmdldE9iamVjdC5fZGF0YSA9IHNvdXJjZU9iamVjdC5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgY2FsY3VsYXRpb25EYXRhIG9iamVjdCB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Q2FsY3VsYXRpb25EYXRhfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBjcmVhdGUoZGF0YTogYW55KTogQ2FsY3VsYXRpb25EYXRhe1xyXG4gICAgICAgIGxldCBuZXdPYmplY3QgPSBuZXcgQ2FsY3VsYXRpb25EYXRhKFwiXCIsXCJcIixcIlwiLGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBuZXdPYmplY3Q7IFxyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0eXBlKCk6IFNlcmllc1R5cGUgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHR5cGUodmFsdWU6IFNlcmllc1R5cGUgfCB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgbmFtZSBvZiB0aGUgY2FsY3VsYXRpb24gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhXHJcbiAgICAgKi9cclxuICAgIGdldERpc3BsYXlOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGRpc3BsYXl2YWx1ZSB0byByYXd2YWx1ZSBpZiBhbiB2YWx1ZSBsaXN0IGV4aXN0cy5cclxuICAgICAqIEdldHMgY29udmVyZXJ0ZWQgc3RyaW5nIGlmIHZhbHVlIGNvbnZlcnRlciBleGlzdHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGlzcGxheVZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHJldFZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gUmV0dXJuIGRpc3BsYXlWYWx1ZSBpbnN0ZWFkIG9mIGlkIGlmIGZvdW5kIGluIGF2YWlsYWJsZSB2YWx1ZXMgbGlzdFxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKG5ld1ZhbHVlID09IHZhbHVlLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IHZhbHVlLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy52YWx1ZUNvbnZlcnRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuZ2V0VmFsdWVGcm9tUmF3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHJhd3ZhbHVlIHRvIGRpc3BsYXl2YWx1ZSBpZiBhbiB2YWx1ZSBsaXN0IGV4aXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmF3VmFsdWVUb0Rpc3BsYXlWYWx1ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmF3VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZih0aGlzLnZhbHVlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgcmF3IHZhbHVlIGluc3RlYWQgb2YgZGlzcGxheSB2YWx1ZSBpZiBmb3VuZCBpbiBhdmFpbGFibGUgdmFsdWVzIGxpc3RcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihyYXdWYWx1ZSA9PSB2YWx1ZS5kaXNwbGF5VmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJhd1ZhbHVlID0gdmFsdWUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF3VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SWNvblBhdGgoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXREYXRhKCk6IG51bWJlcnwgc3RyaW5nfCBBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKGRhdGE6IG51bWJlcnwgc3RyaW5nfCBBcnJheTxJUG9pbnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlQ29udmVydGVyKHZhbHVlQ29udmVydGVySW5qZWN0aW9uOiBJVmFsdWVDb252ZXJ0ZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLl92YWx1ZUNvbnZlcnRlciA9IHZhbHVlQ29udmVydGVySW5qZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZUNvbnZlcnRlcigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZUNvbnZlcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFZhbHVlRnJvbVJhd1ZhbHVlKHJhd1ZhbHVlOnN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLnZhbHVlQ29udmVydGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlQ29udmVydGVyLmdldFZhbHVlRnJvbVJhd1ZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhd1ZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
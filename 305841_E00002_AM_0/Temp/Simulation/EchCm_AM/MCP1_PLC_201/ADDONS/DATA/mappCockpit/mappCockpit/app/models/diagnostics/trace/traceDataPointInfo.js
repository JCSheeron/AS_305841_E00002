define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides data for describing a trace data point info
     *
     * @class TraceDataPointInfo
     */
    var TraceDataPointInfo = /** @class */ (function () {
        function TraceDataPointInfo(componentName, address, namespace, reference) {
            if (reference != undefined) {
                this._name = reference.DataPoint.Name;
            }
            else {
                this._name = "";
            }
            this._address = address;
            this._namespace = namespace;
            this._dataPointReference = reference;
            this._componentName = componentName;
            this._fullname = this.getFullname();
        }
        TraceDataPointInfo.create = function (componentName, deviceAddress, namespace, dataPointRef) {
            return new TraceDataPointInfo(componentName, deviceAddress, namespace, dataPointRef);
        };
        Object.defineProperty(TraceDataPointInfo.prototype, "componentName", {
            get: function () {
                return this._componentName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataPointInfo.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataPointInfo.prototype, "fullname", {
            get: function () {
                return this._fullname;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataPointInfo.prototype, "address", {
            get: function () {
                return this._address;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataPointInfo.prototype, "namespace", {
            get: function () {
                if (this._namespace == undefined) {
                    return "";
                }
                return this._namespace.Namespace;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataPointInfo.prototype, "description", {
            get: function () {
                if (this._dataPointReference == undefined) {
                    return "";
                }
                return this._dataPointReference.DataPoint.Description;
            },
            enumerable: true,
            configurable: true
        });
        TraceDataPointInfo.prototype.getFullname = function () {
            if (this._namespace == undefined) {
                return "";
            }
            var syntax = this._namespace.Data.Syntax[0];
            var temp1 = syntax.replace("%Namespace%", this._namespace.Namespace);
            var temp2 = temp1.replace("%ComponentName%", this._componentName);
            if (this._address != undefined) {
                var temp3 = temp2.replace("%DeviceAddress%", this._address);
            }
            else {
                var temp3 = temp2;
            }
            var temp4 = temp3.replace("%DataPoint.Name%", this._dataPointReference.DataPoint.Name);
            if (this._dataPointReference.DataPoint.Id != undefined) {
                var temp5 = temp4.replace("%DataPoint.Id%", this._dataPointReference.DataPoint.Id);
            }
            else {
                var temp5 = temp4;
            }
            var dataPointName = temp5;
            return dataPointName;
        };
        return TraceDataPointInfo;
    }());
    exports.TraceDataPointInfo = TraceDataPointInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VEYXRhUG9pbnRJbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBOzs7O09BSUc7SUFDSDtRQVNJLDRCQUFvQixhQUFvQixFQUFFLE9BQWMsRUFBRSxTQUFTLEVBQUUsU0FBUztZQUMxRSxJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUM7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDekM7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDbkI7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLENBQUM7UUFFTSx5QkFBTSxHQUFiLFVBQWMsYUFBcUIsRUFBRSxhQUFrQixFQUFFLFNBQWMsRUFBRSxZQUFpQjtZQUN0RixPQUFPLElBQUksa0JBQWtCLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUVELHNCQUFXLDZDQUFhO2lCQUF4QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDL0IsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxvQ0FBSTtpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx3Q0FBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsdUNBQU87aUJBQWxCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDOzs7V0FBQTtRQUVELHNCQUFXLHlDQUFTO2lCQUFwQjtnQkFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFDO29CQUM1QixPQUFPLEVBQUUsQ0FBQztpQkFDYjtnQkFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQ3JDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsMkNBQVc7aUJBQXRCO2dCQUNJLElBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJLFNBQVMsRUFBQztvQkFDckMsT0FBTyxFQUFFLENBQUM7aUJBQ2I7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUMxRCxDQUFDOzs7V0FBQTtRQUVPLHdDQUFXLEdBQW5CO1lBQ0ksSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUVELElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRWxFLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUM7Z0JBQzFCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9EO2lCQUNHO2dCQUNBLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNyQjtZQUVELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RixJQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLFNBQVMsRUFBQztnQkFDbEQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RGO2lCQUNHO2dCQUNBLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNyQjtZQUVELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMxQixPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBdEZELElBc0ZDO0lBRU8sZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBkYXRhIGZvciBkZXNjcmliaW5nIGEgdHJhY2UgZGF0YSBwb2ludCBpbmZvXHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZURhdGFQb2ludEluZm9cclxuICovXHJcbmNsYXNzIFRyYWNlRGF0YVBvaW50SW5mb3tcclxuXHJcbiAgICBwcml2YXRlIF9mdWxsbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfYWRkcmVzczogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbmFtZXNwYWNlOiBhbnk7XHJcbiAgICBwcml2YXRlIF9kYXRhUG9pbnRSZWZlcmVuY2U6IGFueTtcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudE5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKGNvbXBvbmVudE5hbWU6c3RyaW5nLCBhZGRyZXNzOnN0cmluZywgbmFtZXNwYWNlLCByZWZlcmVuY2Upe1xyXG4gICAgICAgIGlmKHJlZmVyZW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gcmVmZXJlbmNlLkRhdGFQb2ludC5OYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2FkZHJlc3MgPSBhZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuX25hbWVzcGFjZSA9IG5hbWVzcGFjZTtcclxuICAgICAgICB0aGlzLl9kYXRhUG9pbnRSZWZlcmVuY2UgPSByZWZlcmVuY2U7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XHJcbiAgICAgICAgdGhpcy5fZnVsbG5hbWUgPSB0aGlzLmdldEZ1bGxuYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZShjb21wb25lbnROYW1lOiBzdHJpbmcsIGRldmljZUFkZHJlc3M6IGFueSwgbmFtZXNwYWNlOiBhbnksIGRhdGFQb2ludFJlZjogYW55KTogYW55IHtcclxuICAgICAgICByZXR1cm4gbmV3IFRyYWNlRGF0YVBvaW50SW5mbyhjb21wb25lbnROYW1lLCBkZXZpY2VBZGRyZXNzLCBuYW1lc3BhY2UsIGRhdGFQb2ludFJlZik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50TmFtZSgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgZnVsbG5hbWUoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Z1bGxuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYWRkcmVzcygpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWRkcmVzcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWVzcGFjZSgpIDogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLl9uYW1lc3BhY2UgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lc3BhY2UuTmFtZXNwYWNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuX2RhdGFQb2ludFJlZmVyZW5jZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFQb2ludFJlZmVyZW5jZS5EYXRhUG9pbnQuRGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGdWxsbmFtZSgpIHtcclxuICAgICAgICBpZih0aGlzLl9uYW1lc3BhY2UgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3ludGF4OiBzdHJpbmcgPSB0aGlzLl9uYW1lc3BhY2UuRGF0YS5TeW50YXhbMF07XHJcblxyXG4gICAgICAgIGxldCB0ZW1wMSA9IHN5bnRheC5yZXBsYWNlKFwiJU5hbWVzcGFjZSVcIiwgdGhpcy5fbmFtZXNwYWNlLk5hbWVzcGFjZSk7XHJcbiAgICAgICAgbGV0IHRlbXAyID0gdGVtcDEucmVwbGFjZShcIiVDb21wb25lbnROYW1lJVwiLCB0aGlzLl9jb21wb25lbnROYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9hZGRyZXNzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wMyA9IHRlbXAyLnJlcGxhY2UoXCIlRGV2aWNlQWRkcmVzcyVcIiwgdGhpcy5fYWRkcmVzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wMyA9IHRlbXAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRlbXA0ID0gdGVtcDMucmVwbGFjZShcIiVEYXRhUG9pbnQuTmFtZSVcIiwgdGhpcy5fZGF0YVBvaW50UmVmZXJlbmNlLkRhdGFQb2ludC5OYW1lKTtcclxuICAgICAgICBpZih0aGlzLl9kYXRhUG9pbnRSZWZlcmVuY2UuRGF0YVBvaW50LklkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wNSA9IHRlbXA0LnJlcGxhY2UoXCIlRGF0YVBvaW50LklkJVwiLCB0aGlzLl9kYXRhUG9pbnRSZWZlcmVuY2UuRGF0YVBvaW50LklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdmFyIHRlbXA1ID0gdGVtcDQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YVBvaW50TmFtZSA9IHRlbXA1O1xyXG4gICAgICAgIHJldHVybiBkYXRhUG9pbnROYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1RyYWNlRGF0YVBvaW50SW5mb30iXX0=
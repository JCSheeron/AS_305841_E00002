define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewSeries = /** @class */ (function () {
        function ChartViewSeries(serie, scale) {
            this.serie = serie;
        }
        Object.defineProperty(ChartViewSeries.prototype, "id", {
            get: function () {
                return this.serie.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "minY", {
            get: function () {
                return this.serie.minY;
            },
            set: function (value) {
                this.serie.minY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "maxY", {
            get: function () {
                return this.serie.maxY;
            },
            set: function (value) {
                this.serie.maxY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "minX", {
            get: function () {
                return this.serie.minX;
            },
            set: function (value) {
                this.serie.minX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "maxX", {
            get: function () {
                return this.serie.maxX;
            },
            set: function (value) {
                this.serie.maxX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "rawPoints", {
            get: function () {
                return this.serie.rawPoints;
            },
            set: function (value) {
                this.serie.rawPoints = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "color", {
            get: function () {
                return this.serie.color;
            },
            set: function (value) {
                this.serie.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "calculationDataInfo", {
            get: function () {
                return this.serie.calculationDataInfo;
            },
            set: function (value) {
                this.serie.calculationDataInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        return ChartViewSeries;
    }());
    exports.ChartViewSerie = ChartViewSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3U2VyaWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRWaWV3U2VyaWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFJSSx5QkFBYSxLQUFpQixFQUFFLEtBQVk7WUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUdELHNCQUFJLCtCQUFFO2lCQUFOO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSxpQ0FBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBUyxLQUF1QjtnQkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7OztXQUpBO1FBTUQsc0JBQUksaUNBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUMzQixDQUFDO2lCQUVELFVBQVMsS0FBdUI7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUM1QixDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLGlDQUFJO2lCQUFSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDM0IsQ0FBQztpQkFFRCxVQUFTLEtBQXVCO2dCQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDNUIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBSSxpQ0FBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBUyxLQUF1QjtnQkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7OztXQUpBO1FBTUQsc0JBQUksc0NBQVM7aUJBQWI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNoQyxDQUFDO2lCQUVELFVBQWMsS0FBaUI7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUNqQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLGtDQUFLO2lCQUFUO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDNUIsQ0FBQztpQkFFRCxVQUFXLEtBQWM7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUM3QixDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLGdEQUFtQjtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQzFDLENBQUM7aUJBRUQsVUFBd0IsS0FBcUM7Z0JBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQzNDLENBQUM7OztXQUpBO1FBTUwsc0JBQUM7SUFBRCxDQUFDLEFBckVELElBcUVDO0lBRTBCLHlDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YUluZm9cIjtcclxuXHJcblxyXG5jbGFzcyBDaGFydFZpZXdTZXJpZXN7XHJcblxyXG4gICAgcHVibGljIHNlcmllIDogQmFzZVNlcmllcztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoc2VyaWU6IEJhc2VTZXJpZXMsIHNjYWxlOiBTY2FsZSl7XHJcbiAgICAgICAgdGhpcy5zZXJpZSA9IHNlcmllO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgaWQoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pblkoKSA6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUubWluWTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWluWSh2YWx1ZTogbnVtYmVyfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5zZXJpZS5taW5ZID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFkoKSA6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUubWF4WTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF4WSh2YWx1ZTogbnVtYmVyfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5zZXJpZS5tYXhZID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pblgoKSA6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUubWluWDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWluWCh2YWx1ZTogbnVtYmVyfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5zZXJpZS5taW5YID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFgoKSA6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUubWF4WDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF4WCh2YWx1ZTogbnVtYmVyfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5zZXJpZS5tYXhYID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJhd1BvaW50cygpIDogSVBvaW50IFtde1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcmllLnJhd1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcmF3UG9pbnRzKHZhbHVlIDogSVBvaW50IFtdKXtcclxuICAgICAgICB0aGlzLnNlcmllLnJhd1BvaW50cyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb2xvciAoKSA6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgY29sb3IgKHZhbHVlIDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLnNlcmllLmNvbG9yID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhbGN1bGF0aW9uRGF0YUluZm8oKSA6IENhbGN1bGF0aW9uRGF0YUluZm98dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNhbGN1bGF0aW9uRGF0YUluZm8odmFsdWUgOiBDYWxjdWxhdGlvbkRhdGFJbmZvfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5zZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge0NoYXJ0Vmlld1NlcmllcyBhcyBDaGFydFZpZXdTZXJpZX0iXX0=
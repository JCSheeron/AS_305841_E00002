define(["require", "exports", "./chartDataOptimizer", "./chartLabelCache", "./chartRenderOptimizer"], function (require, exports, chartDataOptimizer_1, chartLabelCache_1, chartRenderOptimizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements chart extensions and optimizations
     *
     * @class ChartExtensions
     */
    var ChartExtensions = /** @class */ (function () {
        /**
         * Creates an instance of ChartExtensions.
         * @memberof ChartExtensions
         */
        function ChartExtensions(seriesProvider) {
            this._chartDataOptimizer = new chartDataOptimizer_1.ChartDataOptimizer(seriesProvider);
            this._chartLabelCache = new chartLabelCache_1.ChartLabelCache();
            this._chartRenderOptimizer = new chartRenderOptimizer_1.ChartRenderOptimizer();
        }
        Object.defineProperty(ChartExtensions.prototype, "chartDataOptimizer", {
            /**
             * Gets the chart data optimizer
             *
             * @readonly
             * @type {ChartDataOptimizer}
             * @memberof ChartExtensions
             */
            get: function () {
                return this._chartDataOptimizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartExtensions.prototype, "chartLabelCache", {
            /**
             * Gets the chart label cache
             *
             * @readonly
             * @type {ChartLabelCache}
             * @memberof ChartExtensions
             */
            get: function () {
                return this._chartLabelCache;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartExtensions.prototype, "chartRenderOptimizer", {
            /**
             * Gets the chart render optimizer
             *
             * @readonly
             * @type {ChartRenderOptimizer}
             * @memberof ChartExtensions
             */
            get: function () {
                return this._chartRenderOptimizer;
            },
            enumerable: true,
            configurable: true
        });
        return ChartExtensions;
    }());
    exports.ChartExtensions = ChartExtensions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRFeHRlbnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydEV4dGVuc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7Ozs7T0FJRztJQUNIO1FBT0k7OztXQUdHO1FBQ0gseUJBQVksY0FBb0M7WUFDNUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksdUNBQWtCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLDJDQUFvQixFQUFFLENBQUM7UUFDNUQsQ0FBQztRQVVELHNCQUFXLCtDQUFrQjtZQVA3Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFDcEMsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyw0Q0FBZTtZQVAxQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyxpREFBb0I7WUFQL0I7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBbERELElBa0RDO0lBRU8sMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydERhdGFPcHRpbWl6ZXIsIElDaGFydFNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4vY2hhcnREYXRhT3B0aW1pemVyXCI7XHJcbmltcG9ydCB7IENoYXJ0TGFiZWxDYWNoZSB9IGZyb20gXCIuL2NoYXJ0TGFiZWxDYWNoZVwiO1xyXG5pbXBvcnQge0NoYXJ0UmVuZGVyT3B0aW1pemVyfSBmcm9tIFwiLi9jaGFydFJlbmRlck9wdGltaXplclwiO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgY2hhcnQgZXh0ZW5zaW9ucyBhbmQgb3B0aW1pemF0aW9uc1xyXG4gKlxyXG4gKiBAY2xhc3MgQ2hhcnRFeHRlbnNpb25zXHJcbiAqL1xyXG5jbGFzcyBDaGFydEV4dGVuc2lvbnMge1xyXG5cclxuICAgIHByaXZhdGUgX2NoYXJ0RGF0YU9wdGltaXplcjpDaGFydERhdGFPcHRpbWl6ZXI7XHJcbiAgICBwcml2YXRlIF9jaGFydExhYmVsQ2FjaGU6Q2hhcnRMYWJlbENhY2hlO1xyXG4gICAgcHJpdmF0ZSBfY2hhcnRSZW5kZXJPcHRpbWl6ZXI6IENoYXJ0UmVuZGVyT3B0aW1pemVyXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGFydEV4dGVuc2lvbnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRFeHRlbnNpb25zXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlcmllc1Byb3ZpZGVyOiBJQ2hhcnRTZXJpZXNQcm92aWRlcil7XHJcbiAgICAgICAgdGhpcy5fY2hhcnREYXRhT3B0aW1pemVyID0gbmV3IENoYXJ0RGF0YU9wdGltaXplcihzZXJpZXNQcm92aWRlcik7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRMYWJlbENhY2hlID0gbmV3IENoYXJ0TGFiZWxDYWNoZSgpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0UmVuZGVyT3B0aW1pemVyID0gbmV3IENoYXJ0UmVuZGVyT3B0aW1pemVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNoYXJ0IGRhdGEgb3B0aW1pemVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Q2hhcnREYXRhT3B0aW1pemVyfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RXh0ZW5zaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNoYXJ0RGF0YU9wdGltaXplcigpIDogQ2hhcnREYXRhT3B0aW1pemVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhcnREYXRhT3B0aW1pemVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY2hhcnQgbGFiZWwgY2FjaGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtDaGFydExhYmVsQ2FjaGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRFeHRlbnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2hhcnRMYWJlbENhY2hlKCkgOiBDaGFydExhYmVsQ2FjaGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFydExhYmVsQ2FjaGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjaGFydCByZW5kZXIgb3B0aW1pemVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Q2hhcnRSZW5kZXJPcHRpbWl6ZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRFeHRlbnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2hhcnRSZW5kZXJPcHRpbWl6ZXIoKSA6IENoYXJ0UmVuZGVyT3B0aW1pemVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFydFJlbmRlck9wdGltaXplcjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtDaGFydEV4dGVuc2lvbnN9O1xyXG5cclxuIl19
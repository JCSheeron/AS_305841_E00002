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
define(["require", "exports", "./signalCategory", "../common/signal/serieContainer", "../common/signal/serieNode"], function (require, exports, signalCategory_1, serieContainer_1, serieNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalRoot = /** @class */ (function (_super) {
        __extends(SignalRoot, _super);
        /**
         * Creates an instance of the SignalRoot
         * @memberof SignalRoot
         */
        function SignalRoot(dataModel) {
            var _this = _super.call(this, name) || this;
            _this.dataModel = dataModel;
            _this.setDefaultData();
            return _this;
        }
        /**
         * Clears all the data and sets the default categories
         *
         * @memberof SignalRoot
         */
        SignalRoot.prototype.clear = function () {
            var categories = this.childs;
            // Remove all categories with data
            categories.forEach(function (category) {
                category.clear();
            });
            this.setDefaultData();
        };
        Object.defineProperty(SignalRoot.prototype, "nodeType", {
            get: function () {
                return serieNode_1.NodeType.root;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates a new data array and sets the default categories
         *
         * @private
         * @memberof SignalRoot
         */
        SignalRoot.prototype.setDefaultData = function () {
            // Create new data array
            this.childs = new Array();
            // Add default categories
            this.addDefaultCategories();
        };
        /**
         * Adds the main categories (Uploaded, Imported, Calculated, ...) to the SignalRoot
         *
         * @private
         * @memberof SignalRoot
         */
        SignalRoot.prototype.addDefaultCategories = function () {
            this.addSerieContainer(new signalCategory_1.SignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent));
            this.addSerieContainer(new signalCategory_1.SignalCategory(signalCategory_1.SignalCategory.CategoryIdUploaded));
            this.addSerieContainer(new signalCategory_1.SignalCategory(signalCategory_1.SignalCategory.CategoryIdImported));
            //this.addSerieContainer(new SignalCategory(SignalCategory.CategoryIdCalculated));
        };
        return SignalRoot;
    }(serieContainer_1.SerieContainer));
    exports.SignalRoot = SignalRoot;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsUm9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBT0E7UUFBZ0MsOEJBQWM7UUFLMUM7OztXQUdHO1FBQ0gsb0JBQVksU0FBa0M7WUFBOUMsWUFDSSxrQkFBTSxJQUFJLENBQUMsU0FLZDtZQUhHLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTNCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7UUFDMUIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCwwQkFBSyxHQUFMO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUU3QixrQ0FBa0M7WUFDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7Z0JBQ3ZCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsc0JBQVcsZ0NBQVE7aUJBQW5CO2dCQUNJLE9BQU8sb0JBQVEsQ0FBQyxJQUFJLENBQUM7WUFDekIsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7V0FLRztRQUNLLG1DQUFjLEdBQXRCO1lBQ0ksd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQW1CLENBQUM7WUFFM0MseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHlDQUFvQixHQUE1QjtZQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLCtCQUFjLENBQUMsK0JBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksK0JBQWMsQ0FBQywrQkFBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSwrQkFBYyxDQUFDLCtCQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzlFLGtGQUFrRjtRQUN0RixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBL0RELENBQWdDLCtCQUFjLEdBK0Q3QztJQS9EWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWxSb290IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zaWduYWxSb290SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2lnbmFsQ2F0ZWdvcnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi9zaWduYWxDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgTm9kZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxSb290IGV4dGVuZHMgU2VyaWVDb250YWluZXIgaW1wbGVtZW50cyBJU2lnbmFsUm9vdHtcclxuXHJcbiAgICBkYXRhTW9kZWw6IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgY2hpbGRzITogSVNpZ25hbENhdGVnb3J5W107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBTaWduYWxSb290XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsUm9vdFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhTW9kZWw6IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsKXtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgdGhlIGRhdGEgYW5kIHNldHMgdGhlIGRlZmF1bHQgY2F0ZWdvcmllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxSb290XHJcbiAgICAgKi9cclxuICAgIGNsZWFyKCl7XHJcbiAgICAgICAgbGV0IGNhdGVnb3JpZXMgPSB0aGlzLmNoaWxkcztcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBjYXRlZ29yaWVzIHdpdGggZGF0YVxyXG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5LmNsZWFyKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdERhdGEoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBub2RlVHlwZSgpOiBOb2RlVHlwZXtcclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUucm9vdDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGRhdGEgYXJyYXkgYW5kIHNldHMgdGhlIGRlZmF1bHQgY2F0ZWdvcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsUm9vdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERlZmF1bHREYXRhKCl7XHJcbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBkYXRhIGFycmF5XHJcbiAgICAgICAgdGhpcy5jaGlsZHMgPSBuZXcgQXJyYXk8SVNpZ25hbENhdGVnb3J5PigpO1xyXG5cclxuICAgICAgICAvLyBBZGQgZGVmYXVsdCBjYXRlZ29yaWVzXHJcbiAgICAgICAgdGhpcy5hZGREZWZhdWx0Q2F0ZWdvcmllcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgbWFpbiBjYXRlZ29yaWVzIChVcGxvYWRlZCwgSW1wb3J0ZWQsIENhbGN1bGF0ZWQsIC4uLikgdG8gdGhlIFNpZ25hbFJvb3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFJvb3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGREZWZhdWx0Q2F0ZWdvcmllcygpe1xyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVDb250YWluZXIobmV3IFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRSZWNlbnQpKTtcclxuICAgICAgICB0aGlzLmFkZFNlcmllQ29udGFpbmVyKG5ldyBTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkVXBsb2FkZWQpKTtcclxuICAgICAgICB0aGlzLmFkZFNlcmllQ29udGFpbmVyKG5ldyBTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkSW1wb3J0ZWQpKTtcclxuICAgICAgICAvL3RoaXMuYWRkU2VyaWVDb250YWluZXIobmV3IFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRDYWxjdWxhdGVkKSk7XHJcbiAgICB9XHJcbn0iXX0=
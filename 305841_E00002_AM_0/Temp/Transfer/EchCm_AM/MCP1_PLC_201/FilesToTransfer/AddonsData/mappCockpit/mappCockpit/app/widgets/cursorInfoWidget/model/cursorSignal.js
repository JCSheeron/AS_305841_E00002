define(["require", "exports", "./cursorSignalDescriptor", "./cursorInfoVisibility", "../../../common/persistence/settings", "./settingIds"], function (require, exports, cursorSignalDescriptor_1, cursorInfoVisibility_1, settings_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the base class for the various types of cursor signals
     *
     * @export
     * @class CursorSignal
     */
    var CursorSignal = /** @class */ (function () {
        function CursorSignal(serie, expandState) {
            // holds an object with informations describing the cursor signal
            this._cursorSignalDescriptor = new cursorSignalDescriptor_1.CursorSignalDescriptor(undefined);
            this._serie = serie;
            this._expandState = expandState;
        }
        Object.defineProperty(CursorSignal.prototype, "serie", {
            /**
             * provides the serie
             *
             * @readonly
             * @type {BaseSeries}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "expandState", {
            /**
             * provides expandState of signal in treeGrid
             *
             * @type {boolean}
             * @memberof CursorSignal
             */
            get: function () {
                return this._expandState;
            },
            /**
             * sets expandState of signal in treeGrid
             *
             * @memberof CursorSignal
             */
            set: function (expandState) {
                this._expandState = expandState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "name", {
            /**
             * provides the serie name
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "value", {
            /**
             * provides additional descriptive info
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie.additionalInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "visible", {
            /**
             * cursor signals are visible by default
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return "true";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the YTChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof CursorSignal
         */
        CursorSignal.prototype.getAllCursorInfo = function () {
            return [];
        };
        Object.defineProperty(CursorSignal.prototype, "cursorInfos", {
            /**
             * provides the current cursor infos
             *
             * @readonly
             * @type {Array<CursorInfo>}
             * @memberof CursorSignal
             */
            get: function () {
                return this._cursorSignalDescriptor.cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "filteredCursorInfos", {
            /**
             * provides the filtered cursor infos (only cursors infos which should be shown for this signal)
             *
             * @readonly
             * @type {Array<CursorInfo>}
             * @memberof CursorSignal
             */
            get: function () {
                return this._cursorSignalDescriptor.cursorInfos.filter(function (element) { return element.visible == "true"; });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * dummy method for updating cursor values
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof CursorSignal
         */
        CursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
        };
        /**
         * Clears all the cursor value informations
         *
         * @memberof CursorSignal
         */
        CursorSignal.prototype.clearValues = function () {
            this.cursorInfos.forEach(function (cursorInfo) {
                cursorInfo.value = "";
            });
        };
        Object.defineProperty(CursorSignal.prototype, "iconDefinition", {
            /**
             * Returns the icon representation for this node for the tree grid
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                var iconDefinition = "";
                var classNames = "e-treegridcollapse treegridcollapse";
                // Add collapse/expand icon 
                if (this.expandState == true) {
                    classNames += "e-treegridexpand treegridexpand";
                }
                iconDefinition += "<div class='" + classNames + "'></div>";
                // add series icon (with overlays)
                iconDefinition += "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:0px;margin-top:2px'>";
                iconDefinition += this._serie.getIcon();
                iconDefinition += "</div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        CursorSignal.prototype.getSettings = function () {
            var settings = new settings_1.Settings("CursorSignal");
            settings.setValue(settingIds_1.SettingIds.SerieId, this.serie.id);
            settings.setValue(settingIds_1.SettingIds.ExpandState, this.expandState);
            settings.setValue(settingIds_1.SettingIds.CursorInfo, this.getCursorInfoVisibility());
            return settings;
        };
        /**
         * Get id and visibility of cursor info
         *
         * @private
         * @returns
         * @memberof CursorSignal
         */
        CursorSignal.prototype.getCursorInfoVisibility = function () {
            var cursorInfoVisibility = Array();
            this.cursorInfos.forEach(function (cursorInfo) {
                var info = new cursorInfoVisibility_1.CursorInfoVisibility(cursorInfo.id, cursorInfo.visible);
                cursorInfoVisibility.push(info);
            });
            return cursorInfoVisibility;
        };
        return CursorSignal;
    }());
    exports.CursorSignal = CursorSignal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvY3Vyc29yU2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBOzs7OztPQUtHO0lBQ0g7UUFTSSxzQkFBWSxLQUFpQixFQUFFLFdBQW9CO1lBUG5ELGlFQUFpRTtZQUN2RCw0QkFBdUIsR0FBMkIsSUFBSSwrQ0FBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQU85RixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNwQyxDQUFDO1FBU0Qsc0JBQUksK0JBQUs7WUFQVDs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7OztXQUFBO1FBUUQsc0JBQUkscUNBQVc7WUFOZjs7Ozs7ZUFLRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQztZQUVEOzs7O2VBSUc7aUJBQ0gsVUFBZ0IsV0FBb0I7Z0JBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ3BDLENBQUM7OztXQVRBO1FBa0JELHNCQUFJLDhCQUFJO1lBUFI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDNUIsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBSSwrQkFBSztZQVBUOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBVUQsc0JBQUksaUNBQU87WUFQWDs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSSx1Q0FBZ0IsR0FBdkI7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFTRCxzQkFBSSxxQ0FBVztZQVBmOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7WUFDcEQsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBSSw2Q0FBbUI7WUFQdkI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsT0FBTyxJQUFJLE1BQU0sRUFBekIsQ0FBeUIsQ0FBRSxDQUFDO1lBQ2xHLENBQUM7OztXQUFBO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxtQ0FBWSxHQUFuQixVQUFvQixXQUE2QixFQUFFLFdBQTZCLEVBQUUsS0FBdUIsRUFBRSxLQUF1QjtRQUNsSSxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLGtDQUFXLEdBQWxCO1lBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2dCQUMvQixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFTRCxzQkFBVyx3Q0FBYztZQVB6Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixJQUFJLFVBQVUsR0FBRyxxQ0FBcUMsQ0FBQztnQkFFdkQsNEJBQTRCO2dCQUM1QixJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFDO29CQUN4QixVQUFVLElBQUksaUNBQWlDLENBQUM7aUJBQ25EO2dCQUNELGNBQWMsSUFBSSxjQUFjLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFFM0Qsa0NBQWtDO2dCQUNsQyxjQUFjLElBQUksNkhBQTZILENBQUM7Z0JBQ2hKLGNBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN4QyxjQUFjLElBQUksUUFBUSxDQUFDO2dCQUUzQixPQUFPLGNBQWMsQ0FBQztZQUMxQixDQUFDOzs7V0FBQTtRQUVNLGtDQUFXLEdBQWxCO1lBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTVDLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1RCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7WUFDekUsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNLLDhDQUF1QixHQUEvQjtZQUNJLElBQUksb0JBQW9CLEdBQUcsS0FBSyxFQUF3QixDQUFDO1lBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVTtnQkFDL0IsSUFBSSxJQUFJLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkUsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxvQkFBb0IsQ0FBQztRQUNoQyxDQUFDO1FBRUwsbUJBQUM7SUFBRCxDQUFDLEFBekxELElBeUxDO0lBekxZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyB9IGZyb20gXCIuL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWxEZXNjcmlwdG9yIH0gZnJvbSBcIi4vY3Vyc29yU2lnbmFsRGVzY3JpcHRvclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvIH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVmlzaWJpbGl0eSB9IGZyb20gXCIuL2N1cnNvckluZm9WaXNpYmlsaXR5XCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBiYXNlIGNsYXNzIGZvciB0aGUgdmFyaW91cyB0eXBlcyBvZiBjdXJzb3Igc2lnbmFscyBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ3Vyc29yU2lnbmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3Vyc29yU2lnbmFsIHtcclxuXHJcbiAgICAvLyBob2xkcyBhbiBvYmplY3Qgd2l0aCBpbmZvcm1hdGlvbnMgZGVzY3JpYmluZyB0aGUgY3Vyc29yIHNpZ25hbFxyXG4gICAgcHJvdGVjdGVkIF9jdXJzb3JTaWduYWxEZXNjcmlwdG9yOiBDdXJzb3JTaWduYWxEZXNjcmlwdG9yID0gbmV3IEN1cnNvclNpZ25hbERlc2NyaXB0b3IodW5kZWZpbmVkKTtcclxuICAgIC8vIGhvbGRzIHRoZSBzZXJpZXMgYXR0YWNoZWQgdG8gdGhlIGN1cnNvciBzaWduYWxcclxuICAgIHByb3RlY3RlZCBfc2VyaWU6IEJhc2VTZXJpZXM7XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfZXhwYW5kU3RhdGU6IGJvb2xlYW47ICBcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJpZTogQmFzZVNlcmllcywgZXhwYW5kU3RhdGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zZXJpZSA9IHNlcmllO1xyXG4gICAgICAgIHRoaXMuX2V4cGFuZFN0YXRlID0gZXhwYW5kU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwcm92aWRlcyB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtCYXNlU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBnZXQgc2VyaWUoKTogQmFzZVNlcmllcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgZXhwYW5kU3RhdGUgb2Ygc2lnbmFsIGluIHRyZWVHcmlkXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGdldCBleHBhbmRTdGF0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXhwYW5kU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzIGV4cGFuZFN0YXRlIG9mIHNpZ25hbCBpbiB0cmVlR3JpZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgc2V0IGV4cGFuZFN0YXRlKGV4cGFuZFN0YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwYW5kU3RhdGUgPSBleHBhbmRTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIHRoZSBzZXJpZSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpZS5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgYWRkaXRpb25hbCBkZXNjcmlwdGl2ZSBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWUuYWRkaXRpb25hbEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGN1cnNvciBzaWduYWxzIGFyZSB2aXNpYmxlIGJ5IGRlZmF1bHRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGdldCB2aXNpYmxlKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJ0cnVlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGJ5IHRoZSBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUgdG8gZ2V0IGhvbGRcclxuICAgICAqIG9mIGFsbCBhdmFpbGFibGUgY3Vyc29yIGluZm9ybWF0aW9uIGF2YWlsYWJsZSB0byB0aGUgWVRDaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFsbEN1cnNvckluZm8oKTogQXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz4ge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIHRoZSBjdXJyZW50IGN1cnNvciBpbmZvc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PEN1cnNvckluZm8+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBnZXQgY3Vyc29ySW5mb3MoKTogQXJyYXk8Q3Vyc29ySW5mbz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTaWduYWxEZXNjcmlwdG9yLmN1cnNvckluZm9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgdGhlIGZpbHRlcmVkIGN1cnNvciBpbmZvcyAob25seSBjdXJzb3JzIGluZm9zIHdoaWNoIHNob3VsZCBiZSBzaG93biBmb3IgdGhpcyBzaWduYWwpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8Q3Vyc29ySW5mbz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGdldCBmaWx0ZXJlZEN1cnNvckluZm9zKCk6IEFycmF5PEN1cnNvckluZm8+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFsRGVzY3JpcHRvci5jdXJzb3JJbmZvcy5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LnZpc2libGUgPT0gXCJ0cnVlXCIgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGR1bW15IG1ldGhvZCBmb3IgdXBkYXRpbmcgY3Vyc29yIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBjdXJzb3JEYXRhMVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IGN1cnNvckRhdGEyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZTFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lMlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVmFsdWVzKGN1cnNvckRhdGExOiBJUG9pbnR8dW5kZWZpbmVkLCBjdXJzb3JEYXRhMjogSVBvaW50fHVuZGVmaW5lZCwgdGltZTE6IG51bWJlcnx1bmRlZmluZWQsIHRpbWUyOiBudW1iZXJ8dW5kZWZpbmVkKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBjdXJzb3IgdmFsdWUgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXJWYWx1ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JJbmZvcy5mb3JFYWNoKGN1cnNvckluZm8gPT4ge1xyXG4gICAgICAgICAgICBjdXJzb3JJbmZvLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gcmVwcmVzZW50YXRpb24gZm9yIHRoaXMgbm9kZSBmb3IgdGhlIHRyZWUgZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcImUtdHJlZWdyaWRjb2xsYXBzZSB0cmVlZ3JpZGNvbGxhcHNlXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIGNvbGxhcHNlL2V4cGFuZCBpY29uIFxyXG4gICAgICAgIGlmKHRoaXMuZXhwYW5kU3RhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCJlLXRyZWVncmlkZXhwYW5kIHRyZWVncmlkZXhwYW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8ZGl2IGNsYXNzPSdgICsgY2xhc3NOYW1lcyArIGAnPjwvZGl2PmA7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzZXJpZXMgaWNvbiAod2l0aCBvdmVybGF5cylcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPGRpdiBjbGFzcz0nZS1kb2MnIHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7aGVpZ2h0OjE2cHg7d2lkdGg6MzBweDttYXJnaW46YXV0bztmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0OjBweDttYXJnaW4tdG9wOjJweCc+YDtcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLl9zZXJpZS5nZXRJY29uKCk7XHJcbiAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhcIkN1cnNvclNpZ25hbFwiKTtcclxuXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZUlkLCB0aGlzLnNlcmllLmlkKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkV4cGFuZFN0YXRlLCB0aGlzLmV4cGFuZFN0YXRlKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkN1cnNvckluZm8sIHRoaXMuZ2V0Q3Vyc29ySW5mb1Zpc2liaWxpdHkoKSk7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaWQgYW5kIHZpc2liaWxpdHkgb2YgY3Vyc29yIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3JJbmZvVmlzaWJpbGl0eSgpOiBDdXJzb3JJbmZvVmlzaWJpbGl0eVtdIHtcclxuICAgICAgICBsZXQgY3Vyc29ySW5mb1Zpc2liaWxpdHkgPSBBcnJheTxDdXJzb3JJbmZvVmlzaWJpbGl0eT4oKTtcclxuICAgICAgICB0aGlzLmN1cnNvckluZm9zLmZvckVhY2goY3Vyc29ySW5mbyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gbmV3IEN1cnNvckluZm9WaXNpYmlsaXR5KGN1cnNvckluZm8uaWQsIGN1cnNvckluZm8udmlzaWJsZSk7XHJcbiAgICAgICAgICAgIGN1cnNvckluZm9WaXNpYmlsaXR5LnB1c2goaW5mbyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gY3Vyc29ySW5mb1Zpc2liaWxpdHk7XHJcbiAgICB9XHJcblxyXG59Il19
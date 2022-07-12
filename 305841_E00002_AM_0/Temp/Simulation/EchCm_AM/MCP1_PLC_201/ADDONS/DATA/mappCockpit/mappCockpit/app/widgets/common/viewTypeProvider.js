define(["require", "exports", "./themeProvider"], function (require, exports, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewType;
    (function (ViewType) {
        ViewType[ViewType["Default"] = 0] = "Default";
        ViewType[ViewType["Common"] = 1] = "Common";
        ViewType[ViewType["Analysis"] = 2] = "Analysis";
        ViewType[ViewType["Configuration"] = 3] = "Configuration";
        ViewType[ViewType["Overview"] = 4] = "Overview";
        ViewType[ViewType["User"] = 5] = "User";
        ViewType[ViewType["SideBarTab"] = 6] = "SideBarTab";
        ViewType[ViewType["Open"] = 7] = "Open";
        /* Uncomment for switching back to export INSTEAD of Open */
        //Export 
    })(ViewType || (ViewType = {}));
    exports.ViewType = ViewType;
    /**
     *
     *
     * @class ViewTypeProvider
     */
    var ViewTypeProvider = /** @class */ (function () {
        function ViewTypeProvider() {
            this._iconPathList = {};
            /**
             * Maps viewType to its icon Css Class name
             *
             * @private
             * @type {Map<ViewType, string>}
             * @memberof ViewTypeProvider
             */
            this._viewTypeIconClassMap = new Map([
                [ViewType.Default, ""],
                [ViewType.Common, "iconComponentView"],
                [ViewType.Analysis, "iconTraceView"],
                [ViewType.Configuration, "iconTraceConfigurationView"],
                [ViewType.Overview, "iconOverviewPage"],
                [ViewType.User, "iconUser"],
                [ViewType.SideBarTab, ""],
                [ViewType.Open, "iconLoggerView"]
                /* Uncomment for switching back to export INSTEAD of Open */
                //[ViewType.Export, "iconLoggerView"]
            ]);
        }
        ViewTypeProvider.getInstance = function () {
            if (!ViewTypeProvider.instance) {
                ViewTypeProvider.instance = new ViewTypeProvider();
                // ... any one time initialization goes here ...
                this.instance.initIconPathList();
            }
            return ViewTypeProvider.instance;
        };
        /**
         * Returns the componentType for the given viewType
         *
         * @param {ViewType} viewType
         * @returns {string}
         * @memberof ViewTypeProvider
         */
        ViewTypeProvider.prototype.getComponentTypeForViewType = function (viewType) {
            if (viewType == ViewType.Analysis) {
                return "TraceViewWidget";
            }
            else if (viewType == ViewType.Configuration) {
                return "TraceConfigurationViewWidget";
            }
            else if (viewType == ViewType.Common) {
                return "ComponentViewWidget";
            }
            else if (viewType == ViewType.Open) {
                return "LoggerWidget";
            }
            /* Uncomment for switching back to export INSTEAD of Open */
            /*else if(viewType == ViewType.Export){
                return "LoggerWidget";
            }*/
            return "";
        };
        /**
         * Returns the default component id for the given view type
         *
         * @param {ViewType} viewType
         * @returns {string}
         * @memberof ViewTypeProvider
         */
        ViewTypeProvider.prototype.getDefaultComponentIdForViewType = function (viewType) {
            // Currently the default component id is the same as the view type
            return this.getComponentTypeForViewType(viewType);
        };
        ViewTypeProvider.prototype.getIconByViewType = function (viewType) {
            return this._iconPathList[viewType];
        };
        ViewTypeProvider.prototype.initIconPathList = function () {
            var themeProvider = themeProvider_1.ThemeProvider.getInstance();
            this._iconPathList[ViewType.Common.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconComponentView.svg");
            this._iconPathList[ViewType.Analysis.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconTraceView.svg");
            this._iconPathList[ViewType.Configuration.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconTraceConfigurationView.svg");
            this._iconPathList[ViewType.Overview.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconOverviewPage.svg");
            this._iconPathList[ViewType.User.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconUser.svg");
            this._iconPathList[ViewType.Open.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconLoggerView.svg");
            /* Uncomment for switching back to export INSTEAD of Open */
            //this._iconPathList[ViewType.Export.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconLoggerView.svg");
        };
        /**
         * Return css Class name by passed viewType.
         * When no css Class is found for the passed viewType, an empty string gets returned.
         *
         * @param {ViewType} viewType
         * @return {*}  {string}
         * @memberof ViewTypeProvider
         */
        ViewTypeProvider.prototype.getIconClassByViewType = function (viewType) {
            var cssClass = this._viewTypeIconClassMap.get(viewType);
            if (cssClass === undefined) {
                return "";
            }
            else {
                return cssClass;
            }
        };
        return ViewTypeProvider;
    }());
    exports.ViewTypeProvider = ViewTypeProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld1R5cGVQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdmlld1R5cGVQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxJQUFLLFFBV0o7SUFYRCxXQUFLLFFBQVE7UUFDVCw2Q0FBTyxDQUFBO1FBQ1AsMkNBQU0sQ0FBQTtRQUNOLCtDQUFRLENBQUE7UUFDUix5REFBYSxDQUFBO1FBQ2IsK0NBQVEsQ0FBQTtRQUNSLHVDQUFJLENBQUE7UUFDSixtREFBVSxDQUFBO1FBQ1YsdUNBQUksQ0FBQTtRQUNKLDREQUE0RDtRQUM1RCxTQUFTO0lBQ2IsQ0FBQyxFQVhJLFFBQVEsS0FBUixRQUFRLFFBV1o7SUFzSHlCLDRCQUFRO0lBcEhsQzs7OztPQUlHO0lBQ0g7UUFBQTtZQUVZLGtCQUFhLEdBQW9DLEVBQUUsQ0FBQztZQUU1RDs7Ozs7O2VBTUc7WUFDYywwQkFBcUIsR0FBMEIsSUFBSSxHQUFHLENBQW9CO2dCQUN2RixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2dCQUN0QixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUM7Z0JBQ3RDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUM7Z0JBQ3BDLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSw0QkFBNEIsQ0FBQztnQkFDdEQsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2dCQUN2QyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2dCQUMzQixDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO2dCQUN6QixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQ2pDLDREQUE0RDtnQkFDNUQscUNBQXFDO2FBQ3hDLENBQUMsQ0FBQztRQXVGUCxDQUFDO1FBbkZVLDRCQUFXLEdB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cnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4vdGhlbWVQcm92aWRlclwiO1xyXG5cclxuZW51bSBWaWV3VHlwZXtcclxuICAgIERlZmF1bHQsXHJcbiAgICBDb21tb24sXHJcbiAgICBBbmFseXNpcyxcclxuICAgIENvbmZpZ3VyYXRpb24sXHJcbiAgICBPdmVydmlldyxcclxuICAgIFVzZXIsXHJcbiAgICBTaWRlQmFyVGFiLFxyXG4gICAgT3BlbixcclxuICAgIC8qIFVuY29tbWVudCBmb3Igc3dpdGNoaW5nIGJhY2sgdG8gZXhwb3J0IElOU1RFQUQgb2YgT3BlbiAqL1xyXG4gICAgLy9FeHBvcnQgXHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKlxyXG4gKiBAY2xhc3MgVmlld1R5cGVQcm92aWRlclxyXG4gKi9cclxuY2xhc3MgVmlld1R5cGVQcm92aWRlcntcclxuXHJcbiAgICBwcml2YXRlIF9pY29uUGF0aExpc3Q6IHsgW3ZpZXdUeXBlOnN0cmluZ10gOiBzdHJpbmc7IH0gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgdmlld1R5cGUgdG8gaXRzIGljb24gQ3NzIENsYXNzIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge01hcDxWaWV3VHlwZSwgc3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBWaWV3VHlwZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3ZpZXdUeXBlSWNvbkNsYXNzTWFwOiBNYXA8Vmlld1R5cGUsIHN0cmluZz4gPSBuZXcgTWFwPFZpZXdUeXBlLCBzdHJpbmc+IChbXHJcbiAgICAgICAgW1ZpZXdUeXBlLkRlZmF1bHQsIFwiXCJdLFxyXG4gICAgICAgIFtWaWV3VHlwZS5Db21tb24sIFwiaWNvbkNvbXBvbmVudFZpZXdcIl0sXHJcbiAgICAgICAgW1ZpZXdUeXBlLkFuYWx5c2lzLCBcImljb25UcmFjZVZpZXdcIl0sXHJcbiAgICAgICAgW1ZpZXdUeXBlLkNvbmZpZ3VyYXRpb24sIFwiaWNvblRyYWNlQ29uZmlndXJhdGlvblZpZXdcIl0sXHJcbiAgICAgICAgW1ZpZXdUeXBlLk92ZXJ2aWV3LCBcImljb25PdmVydmlld1BhZ2VcIl0sXHJcbiAgICAgICAgW1ZpZXdUeXBlLlVzZXIsIFwiaWNvblVzZXJcIl0sXHJcbiAgICAgICAgW1ZpZXdUeXBlLlNpZGVCYXJUYWIsIFwiXCJdLFxyXG4gICAgICAgIFtWaWV3VHlwZS5PcGVuLCBcImljb25Mb2dnZXJWaWV3XCJdXHJcbiAgICAgICAgLyogVW5jb21tZW50IGZvciBzd2l0Y2hpbmcgYmFjayB0byBleHBvcnQgSU5TVEVBRCBvZiBPcGVuICovXHJcbiAgICAgICAgLy9bVmlld1R5cGUuRXhwb3J0LCBcImljb25Mb2dnZXJWaWV3XCJdXHJcbiAgICBdKTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogVmlld1R5cGVQcm92aWRlcjtcclxuICBcclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIVZpZXdUeXBlUHJvdmlkZXIuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgVmlld1R5cGVQcm92aWRlci5pbnN0YW5jZSA9IG5ldyBWaWV3VHlwZVByb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgIC8vIC4uLiBhbnkgb25lIHRpbWUgaW5pdGlhbGl6YXRpb24gZ29lcyBoZXJlIC4uLlxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmluaXRJY29uUGF0aExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlUHJvdmlkZXIuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb21wb25lbnRUeXBlIGZvciB0aGUgZ2l2ZW4gdmlld1R5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBWaWV3VHlwZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRUeXBlRm9yVmlld1R5cGUodmlld1R5cGU6IFZpZXdUeXBlKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkFuYWx5c2lzKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiVHJhY2VWaWV3V2lkZ2V0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodmlld1R5cGUgPT0gVmlld1R5cGUuQ29uZmlndXJhdGlvbil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2aWV3VHlwZSA9PSBWaWV3VHlwZS5Db21tb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJDb21wb25lbnRWaWV3V2lkZ2V0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodmlld1R5cGUgPT0gVmlld1R5cGUuT3Blbil7XHJcbiAgICAgICAgICAgcmV0dXJuIFwiTG9nZ2VyV2lkZ2V0XCI7XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvKiBVbmNvbW1lbnQgZm9yIHN3aXRjaGluZyBiYWNrIHRvIGV4cG9ydCBJTlNURUFEIG9mIE9wZW4gKi9cclxuICAgICAgICAvKmVsc2UgaWYodmlld1R5cGUgPT0gVmlld1R5cGUuRXhwb3J0KXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTG9nZ2VyV2lkZ2V0XCI7XHJcbiAgICAgICAgfSovIFxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IGlkIGZvciB0aGUgZ2l2ZW4gdmlldyB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVmlld1R5cGVQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudElkRm9yVmlld1R5cGUodmlld1R5cGU6IFZpZXdUeXBlKTogc3RyaW5ne1xyXG4gICAgICAgIC8vIEN1cnJlbnRseSB0aGUgZGVmYXVsdCBjb21wb25lbnQgaWQgaXMgdGhlIHNhbWUgYXMgdGhlIHZpZXcgdHlwZVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbXBvbmVudFR5cGVGb3JWaWV3VHlwZSh2aWV3VHlwZSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgZ2V0SWNvbkJ5Vmlld1R5cGUodmlld1R5cGU6IFZpZXdUeXBlKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pY29uUGF0aExpc3Rbdmlld1R5cGVdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEljb25QYXRoTGlzdCgpe1xyXG4gICAgICAgIGxldCB0aGVtZVByb3ZpZGVyID0gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX2ljb25QYXRoTGlzdFtWaWV3VHlwZS5Db21tb24udG9TdHJpbmcoKV0gPSB0aGVtZVByb3ZpZGVyLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL0ljb25Db21wb25lbnRWaWV3LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLl9pY29uUGF0aExpc3RbVmlld1R5cGUuQW5hbHlzaXMudG9TdHJpbmcoKV0gPSB0aGVtZVByb3ZpZGVyLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL0ljb25UcmFjZVZpZXcuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuX2ljb25QYXRoTGlzdFtWaWV3VHlwZS5Db25maWd1cmF0aW9uLnRvU3RyaW5nKCldID0gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9JY29uVHJhY2VDb25maWd1cmF0aW9uVmlldy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5faWNvblBhdGhMaXN0W1ZpZXdUeXBlLk92ZXJ2aWV3LnRvU3RyaW5nKCldID0gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9JY29uT3ZlcnZpZXdQYWdlLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLl9pY29uUGF0aExpc3RbVmlld1R5cGUuVXNlci50b1N0cmluZygpXSA9IHRoZW1lUHJvdmlkZXIuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvSWNvblVzZXIuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuX2ljb25QYXRoTGlzdFtWaWV3VHlwZS5PcGVuLnRvU3RyaW5nKCldID0gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9JY29uTG9nZ2VyVmlldy5zdmdcIik7XHJcbiAgICAgICAgLyogVW5jb21tZW50IGZvciBzd2l0Y2hpbmcgYmFjayB0byBleHBvcnQgSU5TVEVBRCBvZiBPcGVuICovXHJcbiAgICAgICAgLy90aGlzLl9pY29uUGF0aExpc3RbVmlld1R5cGUuRXhwb3J0LnRvU3RyaW5nKCldID0gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9JY29uTG9nZ2VyVmlldy5zdmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gY3NzIENsYXNzIG5hbWUgYnkgcGFzc2VkIHZpZXdUeXBlLlxyXG4gICAgICogV2hlbiBubyBjc3MgQ2xhc3MgaXMgZm91bmQgZm9yIHRoZSBwYXNzZWQgdmlld1R5cGUsIGFuIGVtcHR5IHN0cmluZyBnZXRzIHJldHVybmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBWaWV3VHlwZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRJY29uQ2xhc3NCeVZpZXdUeXBlKHZpZXdUeXBlOiBWaWV3VHlwZSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGNzc0NsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLl92aWV3VHlwZUljb25DbGFzc01hcC5nZXQodmlld1R5cGUpO1xyXG4gICAgICAgIGlmKGNzc0NsYXNzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gY3NzQ2xhc3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtWaWV3VHlwZVByb3ZpZGVyLCBWaWV3VHlwZX07Il19
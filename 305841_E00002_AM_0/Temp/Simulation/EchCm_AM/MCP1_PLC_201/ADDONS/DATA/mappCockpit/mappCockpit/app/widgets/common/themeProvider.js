define(["require", "exports", "../../common/fileProvider"], function (require, exports, fileProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ThemeProvider = /** @class */ (function () {
        function ThemeProvider() {
            this._currentThemeId = "";
            this._currentThemeId = ThemeProvider.getCurrentThemeId();
        }
        /**
         * gets a singleton instance of ThemeProvider
         *
         * @readonly
         * @type {ThemeProvider}
         * @memberof ThemeProvider
         */
        ThemeProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new ThemeProvider();
            return this._instance;
        };
        /**
         * Returns the theme id if defined in the address bar (e.g.: ?theme="myTheme") else ""
         *
         * @private
         * @returns {string}
         * @memberof WidgetBase
         */
        ThemeProvider.getCurrentThemeId = function () {
            var initCommands = window.location.search.substring(1);
            var themeIdIndex = initCommands.indexOf("theme=%22");
            if (themeIdIndex > -1) {
                var themeIdStartIndex = themeIdIndex + 9;
                var themeIdEndIndex = initCommands.indexOf("%22", themeIdStartIndex);
                var themeId = initCommands.substr(themeIdStartIndex, themeIdEndIndex - themeIdStartIndex);
                return themeId;
            }
            return "";
        };
        /**
         * Returns the filepath for the given theme if file is available in this theme, else the input file path will be returned
         *
         * @static
         * @param {string} filePath
         * @param {string} themeId
         * @returns {string}
         * @memberof ThemeProvider
         */
        ThemeProvider.prototype.getThemedFilePath = function (filePath) {
            if (this._currentThemeId != "") {
                var themeFolder = "themes/" + this._currentThemeId + "/";
                var themeFilePath = filePath.replace("widgets/", themeFolder);
                if (fileProvider_1.FileProvider.doesFileExistOnServer(themeFilePath)) {
                    filePath = themeFilePath;
                }
            }
            return filePath;
        };
        return ThemeProvider;
    }());
    exports.ThemeProvider = ThemeProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdGhlbWVQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQU9JO1lBRlEsb0JBQWUsR0FBRyxFQUFFLENBQUM7WUFHekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3RCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ1cseUJBQVcsR0FBekI7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUM7WUFDdkUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDWSwrQkFBaUIsR0FBaEM7WUFDSSxJQUFJLFlBQVksR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxpQkFBaUIsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLGVBQWUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsR0FBQyxpQkFBaUIsQ0FBQyxDQUFBO2dCQUN2RixPQUFPLE9BQU8sQ0FBQzthQUNsQjtZQUNELE9BQU8sRUFBRSxDQUFBO1FBQ2IsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gseUNBQWlCLEdBQWpCLFVBQWtCLFFBQWdCO1lBQzlCLElBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSyxFQUFFLEVBQUM7Z0JBQzNCLElBQUksV0FBVyxHQUFHLFNBQVMsR0FBRSxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQztnQkFDeEQsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzlELElBQUcsMkJBQVksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsRUFBQztvQkFDakQsUUFBUSxHQUFHLGFBQWEsQ0FBQztpQkFDNUI7YUFDSjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUE3REQsSUE2REM7SUE3RFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbGVQcm92aWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRoZW1lUHJvdmlkZXJ7XHJcbiAgICBcclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVGhlbWVQcm92aWRlcjtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJyZW50VGhlbWVJZCA9IFwiXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRUaGVtZUlkID0gVGhlbWVQcm92aWRlci5nZXRDdXJyZW50VGhlbWVJZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBUaGVtZVByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7VGhlbWVQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUaGVtZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogVGhlbWVQcm92aWRlciB7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlIDogbmV3IFRoZW1lUHJvdmlkZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0aGVtZSBpZCBpZiBkZWZpbmVkIGluIHRoZSBhZGRyZXNzIGJhciAoZS5nLjogP3RoZW1lPVwibXlUaGVtZVwiKSBlbHNlIFwiXCJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEN1cnJlbnRUaGVtZUlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIGluaXRDb21tYW5kczogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgbGV0IHRoZW1lSWRJbmRleCA9IGluaXRDb21tYW5kcy5pbmRleE9mKFwidGhlbWU9JTIyXCIpO1xyXG4gICAgICAgIGlmICh0aGVtZUlkSW5kZXggPiAtMSkgeyBcclxuICAgICAgICAgICAgbGV0IHRoZW1lSWRTdGFydEluZGV4ID0gdGhlbWVJZEluZGV4ICsgOTtcclxuICAgICAgICAgICAgbGV0IHRoZW1lSWRFbmRJbmRleCA9IGluaXRDb21tYW5kcy5pbmRleE9mKFwiJTIyXCIsIHRoZW1lSWRTdGFydEluZGV4KTtcclxuICAgICAgICAgICAgbGV0IHRoZW1lSWQgPSBpbml0Q29tbWFuZHMuc3Vic3RyKHRoZW1lSWRTdGFydEluZGV4LCB0aGVtZUlkRW5kSW5kZXgtdGhlbWVJZFN0YXJ0SW5kZXgpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGVtZUlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGZpbGVwYXRoIGZvciB0aGUgZ2l2ZW4gdGhlbWUgaWYgZmlsZSBpcyBhdmFpbGFibGUgaW4gdGhpcyB0aGVtZSwgZWxzZSB0aGUgaW5wdXQgZmlsZSBwYXRoIHdpbGwgYmUgcmV0dXJuZWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRoZW1lUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0VGhlbWVkRmlsZVBhdGgoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9jdXJyZW50VGhlbWVJZCAgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIGxldCB0aGVtZUZvbGRlciA9IFwidGhlbWVzL1wiKyB0aGlzLl9jdXJyZW50VGhlbWVJZCArIFwiL1wiO1xyXG4gICAgICAgICAgICBsZXQgdGhlbWVGaWxlUGF0aCA9IGZpbGVQYXRoLnJlcGxhY2UoXCJ3aWRnZXRzL1wiLCB0aGVtZUZvbGRlcik7XHJcbiAgICAgICAgICAgIGlmKEZpbGVQcm92aWRlci5kb2VzRmlsZUV4aXN0T25TZXJ2ZXIodGhlbWVGaWxlUGF0aCkpe1xyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGggPSB0aGVtZUZpbGVQYXRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmaWxlUGF0aDtcclxuICAgIH1cclxufSJdfQ==
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Settings = /** @class */ (function () {
        /**
         * Creates an instance of Settings
         * @param {string} type
         * @memberof Settings
         */
        function Settings(type, version) {
            if (version === void 0) { version = "1.0"; }
            /**
             * List of settings data with ids
             *
             * @type {{ [key: string]: any; }}
             * @memberof Settings
             */
            this.data = {};
            this.type = type;
            this.version = version;
        }
        /**
         * Creates an instance with the given interface data
         *
         * @static
         * @param {ISettings} settings
         * @returns {Settings}
         * @memberof Settings
         */
        Settings.create = function (settings) {
            var instance = new Settings(settings.type);
            instance.data = settings.data;
            return instance;
        };
        /**
         * sets some settings data with the given id
         *
         * @param {string} key
         * @param {*} value
         * @memberof Settings
         */
        Settings.prototype.setValue = function (key, value) {
            this.data[key] = value;
        };
        /**
         * Returns some settings data for the given id
         *
         * @param {string} key
         * @returns {*}
         * @memberof Settings
         */
        Settings.prototype.getValue = function (key) {
            return this.data[key];
        };
        return Settings;
    }());
    exports.Settings = Settings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQTZCSTs7OztXQUlHO1FBQ0gsa0JBQVksSUFBWSxFQUFFLE9BQXVCO1lBQXZCLHdCQUFBLEVBQUEsZUFBdUI7WUFiakQ7Ozs7O2VBS0c7WUFDSCxTQUFJLEdBQTRCLEVBQUUsQ0FBQztZQVEvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLGVBQU0sR0FBYixVQUFjLFFBQW1CO1lBQzdCLElBQUksUUFBUSxHQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDOUIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDJCQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsS0FBVTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsMkJBQVEsR0FBUixVQUFTLEdBQVc7WUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQTFFRCxJQTBFQztJQTFFWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyBpbXBsZW1lbnRzIElTZXR0aW5nc3tcclxuXHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgb2YgdGhlIHNldHRpbmdzIGRhdGEgKGUuZy4gY2xhc3NuYW1lLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJzaW9uIG9mIHRoaXMgc2V0dGluZ3MgZGF0YSBmb3JtYXQgPT4gXCJ4LnlcIiBcclxuICAgICAqIElmIHNldHRpbmdzIGRhdGEgd2lsbCBiZSBjaGFuZ2VkIFwieFwiIE1VU1QgYmUgaW5jcmVhc2VkXHJcbiAgICAgKiBJZiBhZGRpdGlvbmFsbHkgc2V0dGluZ3Mgd2lsbCBiZSBhZGRlZCBvbmx5IFwieVwiIE1VU1QgYmUgY2hhbmdlZChpbiB0aGlzIGNhc2UgZG9uJ3QgZm9yZ2V0IHRvIGNoZWNrIGlmIG5ldyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBpbiBcclxuICAgICAqIHNldENvbXBvbmVudFNldHRpbmdzIG1ldGhvZCBpZiBhIHByZXZpb3VzIHZlcnNpb24gaXMgbG9hZGVkIHdpdGhvdXQgdGhpcyBzZXR0aW5nKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgdmVyc2lvbjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBzZXR0aW5ncyBkYXRhIHdpdGggaWRzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3sgW2tleTogc3RyaW5nXTogYW55OyB9fVxyXG4gICAgICogQG1lbWJlcm9mIFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55OyB9ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNldHRpbmdzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQG1lbWJlcm9mIFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nID0gXCIxLjBcIil7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSB3aXRoIHRoZSBnaXZlbiBpbnRlcmZhY2UgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc1xyXG4gICAgICogQHJldHVybnMge1NldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoc2V0dGluZ3M6IElTZXR0aW5ncyk6IFNldHRpbmdze1xyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9ICBuZXcgU2V0dGluZ3Moc2V0dGluZ3MudHlwZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuZGF0YSA9IHNldHRpbmdzLmRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHNldHMgc29tZSBzZXR0aW5ncyBkYXRhIHdpdGggdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KXtcclxuICAgICAgICB0aGlzLmRhdGFba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgc29tZSBzZXR0aW5ncyBkYXRhIGZvciB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZShrZXk6IHN0cmluZyk6IGFueXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2tleV07XHJcbiAgICB9XHJcbn0iXX0=
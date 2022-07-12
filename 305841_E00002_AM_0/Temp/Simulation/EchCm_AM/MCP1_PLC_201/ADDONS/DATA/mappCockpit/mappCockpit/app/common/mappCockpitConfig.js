define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Holds mapp cockpit configuration data
     *
     * @class MappCockpitConfiguration
     */
    var MappCockpitConfiguration = /** @class */ (function () {
        function MappCockpitConfiguration() {
        }
        /**
         * Loads and initializes the application settings
         *
         * @static
         * @param {*} appCfg
         * @memberof MappCockpitConfiguration
         */
        MappCockpitConfiguration.initialize = function (appCfg) {
            MappCockpitConfiguration.port = appCfg.port;
            MappCockpitConfiguration.opcUaPort = appCfg.opcUaPort;
            MappCockpitConfiguration.writeAccessRole = appCfg.writeAccessRole;
        };
        MappCockpitConfiguration.opcUaPort = "";
        // specifies the application port
        MappCockpitConfiguration.port = "";
        // specifies the write access role
        MappCockpitConfiguration.writeAccessRole = "";
        return MappCockpitConfiguration;
    }());
    exports.MappCockpitConfiguration = MappCockpitConfiguration;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9tYXBwQ29ja3BpdENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTs7OztPQUlHO0lBQ0g7UUFBQTtRQW9CQSxDQUFDO1FBbEJHOzs7Ozs7V0FNRztRQUNJLG1DQUFVLEdBQWpCLFVBQWtCLE1BQVc7WUFDekIsd0JBQXdCLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDNUMsd0JBQXdCLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdEQsd0JBQXdCLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDdEUsQ0FBQztRQUVNLGtDQUFTLEdBQVcsRUFBRSxDQUFDO1FBQzlCLGlDQUFpQztRQUMxQiw2QkFBSSxHQUFVLEVBQUUsQ0FBQztRQUN4QixrQ0FBa0M7UUFDM0Isd0NBQWUsR0FBVSxFQUFFLENBQUM7UUFDdkMsK0JBQUM7S0FBQSxBQXBCRCxJQW9CQztJQUVPLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuICogSG9sZHMgbWFwcCBjb2NrcGl0IGNvbmZpZ3VyYXRpb24gZGF0YVxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb25maWd1cmF0aW9uXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24ge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGFuZCBpbml0aWFsaXplcyB0aGUgYXBwbGljYXRpb24gc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IGFwcENmZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdGlhbGl6ZShhcHBDZmc6IGFueSkge1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5wb3J0ID0gYXBwQ2ZnLnBvcnQ7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLm9wY1VhUG9ydCA9IGFwcENmZy5vcGNVYVBvcnQ7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLndyaXRlQWNjZXNzUm9sZSA9IGFwcENmZy53cml0ZUFjY2Vzc1JvbGU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG9wY1VhUG9ydDogc3RyaW5nID0gXCJcIjtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgYXBwbGljYXRpb24gcG9ydFxyXG4gICAgc3RhdGljIHBvcnQ6c3RyaW5nID0gXCJcIjtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgd3JpdGUgYWNjZXNzIHJvbGVcclxuICAgIHN0YXRpYyB3cml0ZUFjY2Vzc1JvbGU6c3RyaW5nID0gXCJcIjtcclxufVxyXG5cclxuZXhwb3J0IHtNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb259O1xyXG4iXX0=
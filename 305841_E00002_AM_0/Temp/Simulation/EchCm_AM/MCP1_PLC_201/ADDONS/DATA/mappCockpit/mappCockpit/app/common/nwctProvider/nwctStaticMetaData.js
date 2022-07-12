define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctStaticMetaData = /** @class */ (function () {
        /**
         * Creates an instance of NwctStaticMetaData
         * @param {*} acoposParameterMetaData
         * @param {*} errorInfoMetaData
         * @memberof NwctStaticMetaData
         */
        function NwctStaticMetaData(acoposParameterMetaData, errorInfoMetaData) {
            /**
             * Holds the acopos parameter definitions
             *
             * @private
             * @memberof NwctStaticMetaData
             */
            this._parameterDefinitions = new Array();
            /**
             * Holds the error infos definitions
             *
             * @private
             * @memberof NwctStaticMetaData
             */
            this._errorInfoDefinitions = new Array();
            // Use errorInfo metaData if available
            if (errorInfoMetaData != undefined) {
                this._errorInfoDefinitions = errorInfoMetaData.acoposErrInfTypes;
            }
            else {
                console.error("No acoposErrInfTypes from target available!");
                this.initializeErrorInfo();
            }
            // Use acoposParameter metaData if available
            if (acoposParameterMetaData != undefined) {
                this._acoposFubParIdDefinitions = acoposParameterMetaData.acoposParIDs.fubParIdDefines;
                this._parameterDefinitions = acoposParameterMetaData.acoposParIDs.parIdList;
            }
            else {
                // TODO: Default definitions should be removed later
                console.error("No acoposParameterMetaData from target available!");
                this.initializeAcoposFubParIdDefinitions();
                this.initializeParData();
            }
        }
        Object.defineProperty(NwctStaticMetaData.prototype, "acoposFubParIdDefinitions", {
            get: function () {
                return this._acoposFubParIdDefinitions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctStaticMetaData.prototype, "parameterDefinitions", {
            get: function () {
                return this._parameterDefinitions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctStaticMetaData.prototype, "errorInfoDefinitions", {
            get: function () {
                return this._errorInfoDefinitions;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the acopos fub parId definitions
         *
         * @private
         * @memberof NwctStaticMetaData
         */
        NwctStaticMetaData.prototype.initializeAcoposFubParIdDefinitions = function () {
            var metaData = this.getEmtpyAcoposParIdMetaData();
            this._acoposFubParIdDefinitions = metaData.acoposParIDs.fubParIdDefines;
        };
        /**
         * Initialize the par id data
         *
         * @private
         * @memberof NwctStaticMetaData
         */
        NwctStaticMetaData.prototype.initializeParData = function () {
            var metaData = this.getEmtpyAcoposParIdMetaData();
            this._parameterDefinitions = metaData.acoposParIDs.parIdList;
        };
        /**
         * Initialize the ErrorInfos
         *
         * @private
         * @memberof NwctStaticMetaData
         */
        NwctStaticMetaData.prototype.initializeErrorInfo = function () {
            var metaData = this.getEmptyErrorInfo();
            this._errorInfoDefinitions = metaData.mappMotionErrInfs;
        };
        /**
         * Returns an empty error info definition list
         *
         * @private
         * @returns {*}
         * @memberof NwctStaticMetaData
         */
        NwctStaticMetaData.prototype.getEmptyErrorInfo = function () {
            return { "mappMotionErrInfs": [] };
        };
        /**
         * Returns an empty acopos parameter definition list
         *
         * @private
         * @returns {*}
         * @memberof NwctStaticMetaData
         */
        NwctStaticMetaData.prototype.getEmtpyAcoposParIdMetaData = function () {
            return { "acoposParIDs": {
                    "fubParIdDefines": { "min": 3072, "range": 29696, "offsetPLCopen": 30720, "instances": 8 },
                    "parIdList": []
                } };
        };
        return NwctStaticMetaData;
    }());
    exports.NwctStaticMetaData = NwctStaticMetaData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFN0YXRpY01ldGFEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbndjdFByb3ZpZGVyL253Y3RTdGF0aWNNZXRhRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQXVDSTs7Ozs7V0FLRztRQUNILDRCQUFZLHVCQUE0QixFQUFFLGlCQUFzQjtZQTlCaEU7Ozs7O2VBS0c7WUFDSywwQkFBcUIsR0FBRyxJQUFJLEtBQUssRUFBOEIsQ0FBQztZQU14RTs7Ozs7ZUFLRztZQUNLLDBCQUFxQixHQUFHLElBQUksS0FBSyxFQUF3QixDQUFDO1lBYTlELHNDQUFzQztZQUN0QyxJQUFHLGlCQUFpQixJQUFJLFNBQVMsRUFBQztnQkFDOUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDO2FBQ3BFO2lCQUFJO2dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDOUI7WUFFRCw0Q0FBNEM7WUFDNUMsSUFBRyx1QkFBdUIsSUFBSSxTQUFTLEVBQUM7Z0JBQ3BDLElBQUksQ0FBQywwQkFBMEIsR0FBRyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsZUFBNEMsQ0FBQztnQkFDcEgsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxTQUE4QyxDQUFDO2FBQ3BIO2lCQUNHO2dCQUNBLG9EQUFvRDtnQkFDcEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsbUNBQW1DLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDO1FBdERELHNCQUFXLHlEQUF5QjtpQkFBcEM7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUM7WUFDM0MsQ0FBQzs7O1dBQUE7UUFVRCxzQkFBVyxvREFBb0I7aUJBQS9CO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBVUQsc0JBQVcsb0RBQW9CO2lCQUEvQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztZQUN0QyxDQUFDOzs7V0FBQTtRQThCRDs7Ozs7V0FLRztRQUNLLGdFQUFtQyxHQUEzQztZQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQywwQkFBMEIsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQztRQUM1RSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw4Q0FBaUIsR0FBekI7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDakUsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssZ0RBQW1CLEdBQTNCO1lBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLHFCQUFxQixHQUFRLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUNqRSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssOENBQWlCLEdBQXpCO1lBQ0ksT0FBTyxFQUFDLG1CQUFtQixFQUFDLEVBQUUsRUFBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyx3REFBMkIsR0FBbkM7WUFDSSxPQUFPLEVBQUMsY0FBYyxFQUFDO29CQUNuQixpQkFBaUIsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxlQUFlLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUM7b0JBQ2hGLFdBQVcsRUFBQyxFQUFFO2lCQUFDLEVBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ1QseUJBQUM7SUFBRCxDQUFDLEFBM0hELElBMkhDO0lBM0hZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElBY29wb3NGdWJQYXJJZERlZmluaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGFEYXRhL2Fjb3Bvc0Z1YlBhcklkRGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0YURhdGEvYWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRXJyb3JJbmZvRGVmaW5pdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0YURhdGEvZXJyb3JJbmZvRGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE53Y3RTdGF0aWNNZXRhRGF0YXtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBBQ09QT1MgRlVCIGRlZmluaXRpb25zKGUuZy4gc3RhcnQgb2YgdGhlIEZVQiBpbnN0YW5jZXMgYW5kIFBMQyBvcGVuIEZVQiBpbnRzYW5jZXMsIGNvdW50IG9mIGluc3RhbmNlcyBwZXIgRlVCKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7SUFjb3Bvc0Z1YlBhcklkRGVmaW5pdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0U3RhdGljTWV0YURhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYWNvcG9zRnViUGFySWREZWZpbml0aW9ucyE6IElBY29wb3NGdWJQYXJJZERlZmluaXRpb247XHJcblxyXG4gICAgcHVibGljIGdldCBhY29wb3NGdWJQYXJJZERlZmluaXRpb25zKCk6IElBY29wb3NGdWJQYXJJZERlZmluaXRpb257XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fjb3Bvc0Z1YlBhcklkRGVmaW5pdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgYWNvcG9zIHBhcmFtZXRlciBkZWZpbml0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFN0YXRpY01ldGFEYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BhcmFtZXRlckRlZmluaXRpb25zID0gbmV3IEFycmF5PElBY29wb3NQYXJhbWV0ZXJEZWZpbml0aW9uPigpO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFyYW1ldGVyRGVmaW5pdGlvbnMoKTogQXJyYXk8SUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb24+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBlcnJvciBpbmZvcyBkZWZpbml0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFN0YXRpY01ldGFEYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2Vycm9ySW5mb0RlZmluaXRpb25zID0gbmV3IEFycmF5PElFcnJvckluZm9EZWZpbml0aW9uPigpO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZXJyb3JJbmZvRGVmaW5pdGlvbnMoKTogQXJyYXk8SUVycm9ySW5mb0RlZmluaXRpb24+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lcnJvckluZm9EZWZpbml0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTndjdFN0YXRpY01ldGFEYXRhXHJcbiAgICAgKiBAcGFyYW0geyp9IGFjb3Bvc1BhcmFtZXRlck1ldGFEYXRhXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9ySW5mb01ldGFEYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFN0YXRpY01ldGFEYXRhXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGFjb3Bvc1BhcmFtZXRlck1ldGFEYXRhOiBhbnksIGVycm9ySW5mb01ldGFEYXRhOiBhbnkpeyAgICAgIFxyXG4gICAgICAgIC8vIFVzZSBlcnJvckluZm8gbWV0YURhdGEgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgaWYoZXJyb3JJbmZvTWV0YURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZXJyb3JJbmZvRGVmaW5pdGlvbnMgPSBlcnJvckluZm9NZXRhRGF0YS5hY29wb3NFcnJJbmZUeXBlcztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGFjb3Bvc0VyckluZlR5cGVzIGZyb20gdGFyZ2V0IGF2YWlsYWJsZSFcIik7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUVycm9ySW5mbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlIGFjb3Bvc1BhcmFtZXRlciBtZXRhRGF0YSBpZiBhdmFpbGFibGVcclxuICAgICAgICBpZihhY29wb3NQYXJhbWV0ZXJNZXRhRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY29wb3NGdWJQYXJJZERlZmluaXRpb25zID0gYWNvcG9zUGFyYW1ldGVyTWV0YURhdGEuYWNvcG9zUGFySURzLmZ1YlBhcklkRGVmaW5lcyBhcyBJQWNvcG9zRnViUGFySWREZWZpbml0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9ucyA9IGFjb3Bvc1BhcmFtZXRlck1ldGFEYXRhLmFjb3Bvc1BhcklEcy5wYXJJZExpc3QgYXMgQXJyYXk8SUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb24+O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBEZWZhdWx0IGRlZmluaXRpb25zIHNob3VsZCBiZSByZW1vdmVkIGxhdGVyXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBhY29wb3NQYXJhbWV0ZXJNZXRhRGF0YSBmcm9tIHRhcmdldCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVBY29wb3NGdWJQYXJJZERlZmluaXRpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVBhckRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBhY29wb3MgZnViIHBhcklkIGRlZmluaXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0U3RhdGljTWV0YURhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplQWNvcG9zRnViUGFySWREZWZpbml0aW9ucygpe1xyXG4gICAgICAgIGxldCBtZXRhRGF0YSA9IHRoaXMuZ2V0RW10cHlBY29wb3NQYXJJZE1ldGFEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5fYWNvcG9zRnViUGFySWREZWZpbml0aW9ucyA9IG1ldGFEYXRhLmFjb3Bvc1BhcklEcy5mdWJQYXJJZERlZmluZXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgcGFyIGlkIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RTdGF0aWNNZXRhRGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVQYXJEYXRhKCl7XHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0gdGhpcy5nZXRFbXRweUFjb3Bvc1BhcklkTWV0YURhdGEoKTtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJEZWZpbml0aW9ucyA9IG1ldGFEYXRhLmFjb3Bvc1BhcklEcy5wYXJJZExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBFcnJvckluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0U3RhdGljTWV0YURhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRXJyb3JJbmZvKCl7XHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0gdGhpcy5nZXRFbXB0eUVycm9ySW5mbygpO1xyXG4gICAgICAgIHRoaXMuX2Vycm9ySW5mb0RlZmluaXRpb25zID0gPGFueT5tZXRhRGF0YS5tYXBwTW90aW9uRXJySW5mcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gZW1wdHkgZXJyb3IgaW5mbyBkZWZpbml0aW9uIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFN0YXRpY01ldGFEYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RW1wdHlFcnJvckluZm8oKTogYW55e1xyXG4gICAgICAgIHJldHVybiB7XCJtYXBwTW90aW9uRXJySW5mc1wiOltdfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gZW1wdHkgYWNvcG9zIHBhcmFtZXRlciBkZWZpbml0aW9uIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFN0YXRpY01ldGFEYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RW10cHlBY29wb3NQYXJJZE1ldGFEYXRhKCk6IGFueXtcclxuICAgICAgICByZXR1cm4ge1wiYWNvcG9zUGFySURzXCI6e1xyXG4gICAgICAgICAgICBcImZ1YlBhcklkRGVmaW5lc1wiOntcIm1pblwiOjMwNzIsXCJyYW5nZVwiOjI5Njk2LFwib2Zmc2V0UExDb3BlblwiOjMwNzIwLFwiaW5zdGFuY2VzXCI6OH0sXHJcbiAgICAgICAgICAgIFwicGFySWRMaXN0XCI6W119fTtcclxuICAgICAgICB9XHJcbn0iXX0=
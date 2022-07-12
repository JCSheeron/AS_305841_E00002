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
define(["require", "exports", "./nwctPrsItemBase"], function (require, exports, nwctPrsItemBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Type safe access to number property
     *
     * @export
     * @class NwctPrsPropertyNumber
     * @extends {NwctPrsItemBase}
     * @implements {INwctPrsPropertyNumber}
     */
    var NwctPrsPropertyNumber = /** @class */ (function (_super) {
        __extends(NwctPrsPropertyNumber, _super);
        /**
         *Creates an instance of NwctPrsPropertyNumber.
         * @param {*} input
         * @param {Array<string>} locationOfPropertyInInput
         * @memberof NwctPrsPropertyNumber
         */
        function NwctPrsPropertyNumber(input, locationOfPropertyInInput) {
            var _this = _super.call(this, input) || this;
            _this._value = 0.0;
            _this._valid = false;
            _this._parsed = false; // only parse once
            _this._locationOfPropertyInInput = locationOfPropertyInInput;
            return _this;
        }
        Object.defineProperty(NwctPrsPropertyNumber.prototype, "value", {
            /**
             * returns the parsed number
             *
             * @readonly
             * @type {number}
             * @memberof NwctPrsPropertyNumber
             */
            get: function () {
                this.parse();
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctPrsPropertyNumber.prototype, "valid", {
            /**
             *
             *
             * @readonly
             * @memberof NwctPrsPropertyNumber
             */
            get: function () {
                this.parse();
                return this._valid;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * parses on demand (only once)
         *
         * @private
         * @memberof NwctPrsPropertyNumber
         */
        NwctPrsPropertyNumber.prototype.parse = function () {
            // parsing is only done once to reduce performance demand
            // parsing is only done on demand to reduce performance demand
            if (!this._parsed) {
                this._parsed = true; // it will not be parsed next time
                var property = this.getUntypedPropertyByName(this._input, this._locationOfPropertyInInput); // do parsing and get the untyped property
                this._valid = typeof (property) === 'number'; // check datatype to ensure that it is really a number
                if (this._valid) {
                    this._value = property;
                }
            }
        };
        return NwctPrsPropertyNumber;
    }(nwctPrsItemBase_1.NwctPrsItemBase));
    exports.NwctPrsPropertyNumber = NwctPrsPropertyNumber;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByc1Byb3BlcnR5TnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbndjdFByb3ZpZGVyL29ialBhcnNlci9ud2N0UHJzUHJvcGVydHlOdW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBOzs7Ozs7O09BT0c7SUFDSDtRQUEyQyx5Q0FBZTtRQU90RDs7Ozs7V0FLRztRQUNILCtCQUFvQixLQUFXLEVBQUUseUJBQXlDO1lBQTFFLFlBQ0ksa0JBQU0sS0FBSyxDQUFDLFNBRWY7WUFiTyxZQUFNLEdBQVksR0FBRyxDQUFDO1lBQ3RCLFlBQU0sR0FBYSxLQUFLLENBQUM7WUFDekIsYUFBTyxHQUFhLEtBQUssQ0FBQyxDQUFDLGtCQUFrQjtZQVVqRCxLQUFJLENBQUMsMEJBQTBCLEdBQUcseUJBQXlCLENBQUM7O1FBQ2hFLENBQUM7UUFVRCxzQkFBVyx3Q0FBSztZQVBoQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDOzs7V0FBQTtRQVFELHNCQUFXLHdDQUFLO1lBTmhCOzs7OztlQUtHO2lCQUNIO2dCQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQzs7O1dBQUE7UUFHRDs7Ozs7V0FLRztRQUNLLHFDQUFLLEdBQWI7WUFDSSx5REFBeUQ7WUFDekQsOERBQThEO1lBQzlELElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDO2dCQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsa0NBQWtDO2dCQUV2RCxJQUFJLFFBQVEsR0FBUyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztnQkFDNUksSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxDQUFBLENBQUMsc0RBQXNEO2dCQUVsRyxJQUFHLElBQUksQ0FBQyxNQUFNLEVBQUM7b0JBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7aUJBQzFCO2FBQ0o7UUFDTCxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBL0RELENBQTJDLGlDQUFlLEdBK0R6RDtJQS9EWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSU53Y3RQcnNQcm9wZXJ0eU51bWJlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdFByc1Byb3BlcnR5TnVtYmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE53Y3RQcnNJdGVtQmFzZSB9IGZyb20gXCIuL253Y3RQcnNJdGVtQmFzZVwiO1xyXG5cclxuLyoqXHJcbiAqIFR5cGUgc2FmZSBhY2Nlc3MgdG8gbnVtYmVyIHByb3BlcnR5XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE53Y3RQcnNQcm9wZXJ0eU51bWJlclxyXG4gKiBAZXh0ZW5kcyB7TndjdFByc0l0ZW1CYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOd2N0UHJzUHJvcGVydHlOdW1iZXIgZXh0ZW5kcyBOd2N0UHJzSXRlbUJhc2UgaW1wbGVtZW50cyBJTndjdFByc1Byb3BlcnR5TnVtYmVye1xyXG5cclxuICAgIHByb3RlY3RlZCByZWFkb25seSBfbG9jYXRpb25PZlByb3BlcnR5SW5JbnB1dCA6IEFycmF5PHN0cmluZz47IC8vIGxvY2F0aW9uIGluIHRoZSBpbnB1dCBkYXRhXHJcbiAgICBwcml2YXRlIF92YWx1ZSA6IG51bWJlciA9IDAuMDsgXHJcbiAgICBwcml2YXRlIF92YWxpZCA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3BhcnNlZCA6IGJvb2xlYW4gPSBmYWxzZTsgLy8gb25seSBwYXJzZSBvbmNlXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE53Y3RQcnNQcm9wZXJ0eU51bWJlci5cclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gbG9jYXRpb25PZlByb3BlcnR5SW5JbnB1dFxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcnNQcm9wZXJ0eU51bWJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKGlucHV0IDogYW55LCBsb2NhdGlvbk9mUHJvcGVydHlJbklucHV0IDogQXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgc3VwZXIoaW5wdXQpO1xyXG4gICAgICAgIHRoaXMuX2xvY2F0aW9uT2ZQcm9wZXJ0eUluSW5wdXQgPSBsb2NhdGlvbk9mUHJvcGVydHlJbklucHV0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIHBhcnNlZCBudW1iZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByc1Byb3BlcnR5TnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSA6IG51bWJlcntcclxuICAgICAgICB0aGlzLnBhcnNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzUHJvcGVydHlOdW1iZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWxpZCgpe1xyXG4gICAgICAgIHRoaXMucGFyc2UoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcGFyc2VzIG9uIGRlbWFuZCAob25seSBvbmNlKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByc1Byb3BlcnR5TnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2UoKXtcclxuICAgICAgICAvLyBwYXJzaW5nIGlzIG9ubHkgZG9uZSBvbmNlIHRvIHJlZHVjZSBwZXJmb3JtYW5jZSBkZW1hbmRcclxuICAgICAgICAvLyBwYXJzaW5nIGlzIG9ubHkgZG9uZSBvbiBkZW1hbmQgdG8gcmVkdWNlIHBlcmZvcm1hbmNlIGRlbWFuZFxyXG4gICAgICAgIGlmKCF0aGlzLl9wYXJzZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJzZWQgPSB0cnVlOyAvLyBpdCB3aWxsIG5vdCBiZSBwYXJzZWQgbmV4dCB0aW1lXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcHJvcGVydHkgOiBhbnkgPSB0aGlzLmdldFVudHlwZWRQcm9wZXJ0eUJ5TmFtZSh0aGlzLl9pbnB1dCwgdGhpcy5fbG9jYXRpb25PZlByb3BlcnR5SW5JbnB1dCk7IC8vIGRvIHBhcnNpbmcgYW5kIGdldCB0aGUgdW50eXBlZCBwcm9wZXJ0eVxyXG4gICAgICAgICAgICB0aGlzLl92YWxpZCA9IHR5cGVvZihwcm9wZXJ0eSkgPT09ICdudW1iZXInIC8vIGNoZWNrIGRhdGF0eXBlIHRvIGVuc3VyZSB0aGF0IGl0IGlzIHJlYWxseSBhIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLl92YWxpZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHByb3BlcnR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
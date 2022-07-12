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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Specifies the possible binding types
     *
     * @export
     * @enum {number}
     */
    var BindingType;
    (function (BindingType) {
        BindingType[BindingType["UNDEFINED"] = 0] = "UNDEFINED";
        BindingType[BindingType["DATA"] = 1] = "DATA";
        BindingType[BindingType["COMMAND"] = 2] = "COMMAND";
        BindingType[BindingType["COMMAND_RESPONSE"] = 3] = "COMMAND_RESPONSE";
        BindingType[BindingType["STATE"] = 4] = "STATE";
    })(BindingType = exports.BindingType || (exports.BindingType = {}));
    /**
     * Implements a binding descriptor
     *
     * @export
     * @class ComponentBindingPar
     */
    var ComponentBindingDescriptor = /** @class */ (function () {
        function ComponentBindingDescriptor() {
            this.type = BindingType.UNDEFINED;
            /**
             * The scope specifies which components can be connected with the the binding id's
             *
             * @type {(string|object)}
             * @memberof ComponentBinding
             */
            this.scope = "";
            /**
             * Specifies the binding id for matching binding points.
             *
             * @type {string}
             * @memberof ComponentBinding
             */
            this.id = "";
            /**
             * The target key specifies the name of a method or property to receive the bound data.
             *
             * @type {string}
             * @memberof ComponentBinding
             */
            this.targetKey = "";
            /**
             *  The source key specifies the name of a method to be obeserved as triggers for modifications to be forwarded to bound components.
             *
             * @type {string}
             * @memberof ComponentBinding
             */
            this.sourceKey = "";
            /**
             * The data type specifies the effective type to be exchanged between components.
             *
             * @type {TConnectionDataType}
             * @memberof ComponentBinding
             */
            this.dataType = "";
            /**
             *  Binding values are passed by value as default. The parameter specifies that the value is passed and transported as copy only. This way references get lost respectively invalid. When the data contains references the
             *  parameter needs to be set to false. Beware that in this case the receivers are able to access and modify the original instances.
             *
             * @type {boolean}
             * @memberof ComponentBinding
             */
            this.passByValue = true;
        }
        Object.defineProperty(ComponentBindingDescriptor.prototype, "fullId", {
            /**
             * Gets the id consisting of scope and id
             *
             * @readonly
             * @type {string}
             * @memberof ComponentBinding
             */
            get: function () {
                return this.scope + '.' + this.id;
            },
            enumerable: true,
            configurable: true
        });
        return ComponentBindingDescriptor;
    }());
    exports.ComponentBindingDescriptor = ComponentBindingDescriptor;
    /**
     * Implements a binding declaration
     *
     * @export
     * @class ComponentBindingPar
     */
    var ComponentBinding = /** @class */ (function (_super) {
        __extends(ComponentBinding, _super);
        function ComponentBinding() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = BindingType.UNDEFINED;
            return _this;
        }
        Object.defineProperty(ComponentBinding.prototype, "descriptor", {
            get: function () {
                var copiedBindingDescriptor = new ComponentBindingDescriptor();
                copiedBindingDescriptor.type = this.type;
                copiedBindingDescriptor.scope = this.scope;
                copiedBindingDescriptor.id = this.id;
                copiedBindingDescriptor.dataType = this.dataType;
                copiedBindingDescriptor.sourceKey = this.sourceKey;
                copiedBindingDescriptor.targetKey = this.targetKey;
                copiedBindingDescriptor.passByValue = this.passByValue;
                return copiedBindingDescriptor;
            },
            enumerable: true,
            configurable: true
        });
        return ComponentBinding;
    }(ComponentBindingDescriptor));
    exports.ComponentBinding = ComponentBinding;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50QmluZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTs7Ozs7T0FLRztJQUNILElBQVksV0FPWDtJQVBELFdBQVksV0FBVztRQUNuQix1REFBUyxDQUFBO1FBQ1QsNkNBQUksQ0FBQTtRQUNKLG1EQUFPLENBQUE7UUFDUCxxRUFBZ0IsQ0FBQTtRQUNoQiwrQ0FBSyxDQUFBO0lBRVQsQ0FBQyxFQVBXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBT3RCO0lBRUQ7Ozs7O09BS0c7SUFDSDtRQUFBO1lBRUksU0FBSSxHQUFnQixXQUFXLENBQUMsU0FBUyxDQUFBO1lBRXpDOzs7OztlQUtHO1lBQ0gsVUFBSyxHQUFlLEVBQUUsQ0FBQztZQUV2Qjs7Ozs7ZUFLRztZQUNILE9BQUUsR0FBUSxFQUFFLENBQUM7WUFFYjs7Ozs7ZUFLRztZQUNILGNBQVMsR0FBVSxFQUFFLENBQUM7WUFFdEI7Ozs7O2VBS0c7WUFDSCxjQUFTLEdBQVUsRUFBRSxDQUFDO1lBRXRCOzs7OztlQUtHO1lBQ0gsYUFBUSxHQUFxQixFQUFFLENBQUM7WUFFaEM7Ozs7OztlQU1HO1lBQ0gsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFjL0IsQ0FBQztRQUpHLHNCQUFXLDhDQUFNO1lBUGpCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdEMsQ0FBQzs7O1dBQUE7UUFFTCxpQ0FBQztJQUFELENBQUMsQUFqRUQsSUFpRUM7SUFqRVksZ0VBQTBCO0lBcUV2Qzs7Ozs7T0FLRztJQUNIO1FBQXNDLG9DQUEwQjtRQUFoRTtZQUFBLHFFQXdCQztZQXRCRyxVQUFJLEdBQWdCLFdBQVcsQ0FBQyxTQUFTLENBQUE7O1FBc0I3QyxDQUFDO1FBWkcsc0JBQVcsd0NBQVU7aUJBQXJCO2dCQUNJLElBQU0sdUJBQXVCLEdBQUcsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO2dCQUNqRSx1QkFBdUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDekMsdUJBQXVCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLHVCQUF1QixDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNyQyx1QkFBdUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDakQsdUJBQXVCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25ELHVCQUF1QixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuRCx1QkFBdUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFFdkQsT0FBTyx1QkFBdUIsQ0FBQztZQUNuQyxDQUFDOzs7V0FBQTtRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQXhCRCxDQUFzQywwQkFBMEIsR0F3Qi9EO0lBeEJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBUQ29ubmVjdGlvbkRhdGFUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21tb25UeXBlc1wiO1xyXG5cclxuLyoqXHJcbiAqIFNwZWNpZmllcyB0aGUgcG9zc2libGUgYmluZGluZyB0eXBlc1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBCaW5kaW5nVHlwZXtcclxuICAgIFVOREVGSU5FRCxcclxuICAgIERBVEEsXHJcbiAgICBDT01NQU5ELFxyXG4gICAgQ09NTUFORF9SRVNQT05TRSxcclxuICAgIFNUQVRFLFxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgYSBiaW5kaW5nIGRlc2NyaXB0b3JcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ29tcG9uZW50QmluZGluZ1BhclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJpbmRpbmdEZXNjcmlwdG9ye1xyXG5cclxuICAgIHR5cGU6IEJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuVU5ERUZJTkVEXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNjb3BlIHNwZWNpZmllcyB3aGljaCBjb21wb25lbnRzIGNhbiBiZSBjb25uZWN0ZWQgd2l0aCB0aGUgdGhlIGJpbmRpbmcgaWQnc1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfG9iamVjdCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ1xyXG4gICAgICovXHJcbiAgICBzY29wZTpzdHJpbmd8b2JqZWN0PVwiXCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIHRoZSBiaW5kaW5nIGlkIGZvciBtYXRjaGluZyBiaW5kaW5nIHBvaW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdcclxuICAgICAqL1xyXG4gICAgaWQ6c3RyaW5nPVwiXCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRhcmdldCBrZXkgc3BlY2lmaWVzIHRoZSBuYW1lIG9mIGEgbWV0aG9kIG9yIHByb3BlcnR5IHRvIHJlY2VpdmUgdGhlIGJvdW5kIGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nXHJcbiAgICAgKi9cclxuICAgIHRhcmdldEtleTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqICBUaGUgc291cmNlIGtleSBzcGVjaWZpZXMgdGhlIG5hbWUgb2YgYSBtZXRob2QgdG8gYmUgb2Jlc2VydmVkIGFzIHRyaWdnZXJzIGZvciBtb2RpZmljYXRpb25zIHRvIGJlIGZvcndhcmRlZCB0byBib3VuZCBjb21wb25lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ1xyXG4gICAgICovXHJcbiAgICBzb3VyY2VLZXk6c3RyaW5nID0gXCJcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGF0YSB0eXBlIHNwZWNpZmllcyB0aGUgZWZmZWN0aXZlIHR5cGUgdG8gYmUgZXhjaGFuZ2VkIGJldHdlZW4gY29tcG9uZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7VENvbm5lY3Rpb25EYXRhVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nXHJcbiAgICAgKi9cclxuICAgIGRhdGFUeXBlOlRDb25uZWN0aW9uRGF0YVR5cGU9XCJcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiAgQmluZGluZyB2YWx1ZXMgYXJlIHBhc3NlZCBieSB2YWx1ZSBhcyBkZWZhdWx0LiBUaGUgcGFyYW1ldGVyIHNwZWNpZmllcyB0aGF0IHRoZSB2YWx1ZSBpcyBwYXNzZWQgYW5kIHRyYW5zcG9ydGVkIGFzIGNvcHkgb25seS4gVGhpcyB3YXkgcmVmZXJlbmNlcyBnZXQgbG9zdCByZXNwZWN0aXZlbHkgaW52YWxpZC4gV2hlbiB0aGUgZGF0YSBjb250YWlucyByZWZlcmVuY2VzIHRoZVxyXG4gICAgICogIHBhcmFtZXRlciBuZWVkcyB0byBiZSBzZXQgdG8gZmFsc2UuIEJld2FyZSB0aGF0IGluIHRoaXMgY2FzZSB0aGUgcmVjZWl2ZXJzIGFyZSBhYmxlIHRvIGFjY2VzcyBhbmQgbW9kaWZ5IHRoZSBvcmlnaW5hbCBpbnN0YW5jZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ1xyXG4gICAgICovXHJcbiAgICBwYXNzQnlWYWx1ZTpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgaWQgY29uc2lzdGluZyBvZiBzY29wZSBhbmQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGZ1bGxJZCgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY29wZSArICcuJyArIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgYmluZGluZyBkZWNsYXJhdGlvblxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDb21wb25lbnRCaW5kaW5nUGFyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmluZGluZyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdEZXNjcmlwdG9ye1xyXG5cclxuICAgIHR5cGU6IEJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuVU5ERUZJTkVEXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIHRoZSBjb21wb25lbnQgd2hpY2ggaXMgdG8gYmUgY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudCE6IG9iamVjdHxudWxsO1xyXG4gICBcclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRvcigpIDogQ29tcG9uZW50QmluZGluZ0Rlc2NyaXB0b3Ige1xyXG4gICAgICAgIGNvbnN0IGNvcGllZEJpbmRpbmdEZXNjcmlwdG9yID0gbmV3IENvbXBvbmVudEJpbmRpbmdEZXNjcmlwdG9yKCk7XHJcbiAgICAgICAgY29waWVkQmluZGluZ0Rlc2NyaXB0b3IudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvci5zY29wZSA9IHRoaXMuc2NvcGU7XHJcbiAgICAgICAgY29waWVkQmluZGluZ0Rlc2NyaXB0b3IuaWQgPSB0aGlzLmlkO1xyXG4gICAgICAgIGNvcGllZEJpbmRpbmdEZXNjcmlwdG9yLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuICAgICAgICBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXkgPSB0aGlzLnNvdXJjZUtleTtcclxuICAgICAgICBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXkgPSB0aGlzLnRhcmdldEtleTtcclxuICAgICAgICBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvci5wYXNzQnlWYWx1ZSA9IHRoaXMucGFzc0J5VmFsdWU7XHJcblxyXG4gICAgICAgIHJldHVybiBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvcjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==
define(["require", "exports", "./componentBindingConnector", "./componentBinding"], function (require, exports, componentBindingConnector_1, componentBinding_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The class provides creation and management of component bindings
     *
     * @export
     * @class ComponentBindings
     */
    var ComponentBindings = /** @class */ (function () {
        function ComponentBindings() {
        }
        /**
         * Binds an instance (binding source) to the specified binding target (external binding reference).
         *
         * @static
         * @param {object} bindingSource
         * @param {ComponentBinding} bindingPars
         * @memberof ComponentBindings
         */
        ComponentBindings.bind = function (bindingObject) {
            componentBindingConnector_1.ComponentBindingConnector.bind(bindingObject);
        };
        /**
         * Unbinds a whole component or the binding specified by the binding declaration
         *
         * @static
         * @param {(object | ComponentBinding)} bindingObject
         * @memberof ComponentBindings
         */
        ComponentBindings.unbind = function (bindingObject) {
            componentBindingConnector_1.ComponentBindingConnector.unbind(bindingObject);
        };
        /**
         * Creates a binding with the given data and binds it
         *
         * @static
         * @param {BindingType} type
         * @param {*} component
         * @param {string | object} scope
         * @param {string} id
         * @param {string} targetKey
         * @param {string} sourceKey
         * @memberof ComponentBindings
         */
        ComponentBindings.create = function (type, dataType, component, scope, id, targetKey, sourceKey) {
            var binding = new componentBinding_1.ComponentBinding();
            binding.type = type;
            binding.dataType = dataType;
            binding.component = component;
            binding.scope = scope;
            binding.id = id;
            binding.targetKey = targetKey;
            binding.sourceKey = sourceKey;
            ComponentBindings.bind(binding);
        };
        return ComponentBindings;
    }());
    exports.ComponentBindings = ComponentBindings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50QmluZGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7Ozs7O09BS0c7SUFDSDtRQUFBO1FBbURBLENBQUM7UUFqREc7Ozs7Ozs7V0FPRztRQUNJLHNCQUFJLEdBQVgsVUFBWSxhQUErQjtZQUV2QyxxREFBeUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNXLHdCQUFNLEdBQXBCLFVBQXFCLGFBQXVDO1lBRXhELHFEQUF5QixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSSx3QkFBTSxHQUFiLFVBQWMsSUFBaUIsRUFBRSxRQUE2QixFQUFFLFNBQWMsRUFBRSxLQUFzQixFQUFFLEVBQVUsRUFBRSxTQUFpQixFQUFFLFNBQWlCO1lBQ3BKLElBQU0sT0FBTyxHQUFHLElBQUksbUNBQWdCLEVBQUUsQ0FBQztZQUN2QyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNwQixPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUM1QixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM5QixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN0QixPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNoQixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM5QixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM5QixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQW5ERCxJQW1EQztJQW5EWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUQ29ubmVjdGlvbkRhdGFUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21tb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yIH0gZnJvbSBcIi4vY29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nLCBCaW5kaW5nVHlwZSB9IGZyb20gXCIuL2NvbXBvbmVudEJpbmRpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgcHJvdmlkZXMgY3JlYXRpb24gYW5kIG1hbmFnZW1lbnQgb2YgY29tcG9uZW50IGJpbmRpbmdzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIENvbXBvbmVudEJpbmRpbmdzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmluZGluZ3Mge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYW4gaW5zdGFuY2UgKGJpbmRpbmcgc291cmNlKSB0byB0aGUgc3BlY2lmaWVkIGJpbmRpbmcgdGFyZ2V0IChleHRlcm5hbCBiaW5kaW5nIHJlZmVyZW5jZSkuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGJpbmRpbmdTb3VyY2VcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QmluZGluZ30gYmluZGluZ1BhcnNcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYmluZChiaW5kaW5nT2JqZWN0OiBDb21wb25lbnRCaW5kaW5nKSB7XHJcblxyXG4gICAgICAgIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3IuYmluZChiaW5kaW5nT2JqZWN0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmJpbmRzIGEgd2hvbGUgY29tcG9uZW50IG9yIHRoZSBiaW5kaW5nIHNwZWNpZmllZCBieSB0aGUgYmluZGluZyBkZWNsYXJhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KG9iamVjdCB8IENvbXBvbmVudEJpbmRpbmcpfSBiaW5kaW5nT2JqZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB1bmJpbmQoYmluZGluZ09iamVjdDpvYmplY3QgfCBDb21wb25lbnRCaW5kaW5nKXtcclxuXHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3Rvci51bmJpbmQoYmluZGluZ09iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgYmluZGluZyB3aXRoIHRoZSBnaXZlbiBkYXRhIGFuZCBiaW5kcyBpdFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QmluZGluZ1R5cGV9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG9iamVjdH0gc2NvcGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldEtleVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZUtleVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUodHlwZTogQmluZGluZ1R5cGUsIGRhdGFUeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlLCBjb21wb25lbnQ6IGFueSwgc2NvcGU6IHN0cmluZyB8IG9iamVjdCwgaWQ6IHN0cmluZywgdGFyZ2V0S2V5OiBzdHJpbmcsIHNvdXJjZUtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgYmluZGluZyA9IG5ldyBDb21wb25lbnRCaW5kaW5nKCk7XHJcbiAgICAgICAgYmluZGluZy50eXBlID0gdHlwZTtcclxuICAgICAgICBiaW5kaW5nLmRhdGFUeXBlID0gZGF0YVR5cGU7XHJcbiAgICAgICAgYmluZGluZy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgYmluZGluZy5zY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIGJpbmRpbmcuaWQgPSBpZDtcclxuICAgICAgICBiaW5kaW5nLnRhcmdldEtleSA9IHRhcmdldEtleTtcclxuICAgICAgICBiaW5kaW5nLnNvdXJjZUtleSA9IHNvdXJjZUtleTtcclxuICAgICAgICBDb21wb25lbnRCaW5kaW5ncy5iaW5kKGJpbmRpbmcpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmNode = /** @class */ (function () {
        function CmNode(element) {
            this.element = element;
        }
        Object.defineProperty(CmNode.prototype, "displayName", {
            get: function () {
                return this.element.displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "description", {
            get: function () {
                return this.element.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "modifiedDisplayValue", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    if (this.element.componentParameter.modifiedDisplayValue != undefined) {
                        return this.element.componentParameter.modifiedDisplayValue;
                    }
                    return this.displayValue;
                }
                return "";
            },
            set: function (value) {
                if (this.element.componentParameter != undefined) {
                    this.element.componentParameter.modifiedDisplayValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "displayValue", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.displayValue;
                }
                return "";
            },
            set: function (value) {
                if (this.element.componentParameter != undefined) {
                    this.element.componentParameter.displayValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "unit", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.engineeringUnit;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "readOnly", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return !this.element.componentParameter.isWriteable.value;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "writeAccess", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.writeAccess.value;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "transferFailed", {
            get: function () {
                var transferFailed = false;
                var param = this.element.componentParameter;
                if (param != undefined) {
                    if (param.transferFailed != undefined) {
                        transferFailed = param.transferFailed;
                    }
                }
                return transferFailed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "iconDefinition", {
            /**
             * Returns the icon definition for this node
             *
             * @readonly
             * @type {string}
             * @memberof CmNode
             */
            get: function () {
                if (this.isModified == true && this.element.editModeActive) {
                    //Show some modified icon
                    return this.getModifiedIconDefinition();
                }
                // Show the default node icon
                return CmNode.createDiv("e-treegrid e-cmdoc");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Return the icon definition if node is modified(e.g. only modified, or modified and transfer failed, or modified and not transferable)
         *
         * @protected
         * @returns {string}
         * @memberof CmNode
         */
        CmNode.prototype.getModifiedIconDefinition = function () {
            if (this.transferFailed == true) {
                return CmNode.createDiv("transferFailedIcon", "Pending change (failed to apply value in last attempt)");
            }
            if (this.readOnly == true) {
                return CmNode.createDiv("notTransferableIcon", "Pending change can’t be applied due to current component state");
            }
            return CmNode.createDiv("modifiedIcon", "Pending change");
        };
        /**
         * creates a div with the given tooltipText and className and returns the div string
         *
         * @private
         * @param {string} tooltipText
         * @param {string} className
         * @returns {string}
         * @memberof CmNode
         */
        CmNode.createDiv = function (className, tooltipText) {
            if (tooltipText === void 0) { tooltipText = ""; }
            if (tooltipText != "") {
                return "<div title='" + tooltipText + "' class='" + className + "'></div>";
            }
            return "<div class='" + className + "'></div>";
        };
        Object.defineProperty(CmNode.prototype, "collapseExpandIconDefinition", {
            /**
             * Returns the icon definition for collapse/expand icon for this node
             *
             * @readonly
             * @type {string}
             * @memberof CmNode
             */
            get: function () {
                // No collapse expand icon for nodes without childs
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "isModified", {
            /**
             * Is the value of this node already modified
             *
             * @protected
             * @returns {boolean}
             * @memberof CmNode
             */
            get: function () {
                var _a;
                if (((_a = this.element.componentParameter) === null || _a === void 0 ? void 0 : _a.modifiedValue) != undefined) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return CmNode;
    }());
    exports.CmNode = CmNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21Ob2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvbW9kZWwvY21Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBR0ksZ0JBQVksT0FBcUI7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUVELHNCQUFJLCtCQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDcEMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSwrQkFBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3BDLENBQUM7OztXQUFBO1FBRUQsc0JBQUksd0NBQW9CO2lCQUF4QjtnQkFDSSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksU0FBUyxFQUFDO29CQUM1QyxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLElBQUksU0FBUyxFQUFDO3dCQUNqRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUM7cUJBQy9EO29CQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFDNUI7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO2lCQUVELFVBQXlCLEtBQWE7Z0JBQ2xDLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLEVBQUM7b0JBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO2lCQUNoRTtZQUNMLENBQUM7OztXQU5BO1FBUUQsc0JBQUksZ0NBQVk7aUJBQWhCO2dCQUNJLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLEVBQUM7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QUFVLENBQUE7YUFDN0U7WUFDRCxPQUFPLGNBQWMsR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQ25ELENBQUM7UUFTRCxzQkFBSSxnREFBNEI7WUFQaEM7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLG1EQUFtRDtnQkFDbkQsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDOzs7V0FBQTtRQVNELHNCQUFXLDhCQUFVO1lBUHJCOzs7Ozs7ZUFNRztpQkFDSDs7Z0JBQ0ksSUFBRyxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLDBDQUFFLGFBQWEsS0FBSSxTQUFTLEVBQUM7b0JBQzNELE9BQU8sSUFBSSxDQUFDO2lCQUNmO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7OztXQUFBO1FBQ0wsYUFBQztJQUFELENBQUMsQUF2SkQsSUF1SkM7SUF2Slksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ21Ob2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY21Ob2RlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDbVBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29uZmlnTWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NtUGFyYW1ldGVySW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ21Ob2RlIGltcGxlbWVudHMgSUNtTm9kZXtcclxuICAgIGVsZW1lbnQ6IElDbVBhcmFtZXRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBJQ21QYXJhbWV0ZXIpe1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpc3BsYXlOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmRpc3BsYXlOYW1lOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZGVzY3JpcHRpb247ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtb2RpZmllZERpc3BsYXlWYWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyLm1vZGlmaWVkRGlzcGxheVZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5tb2RpZmllZERpc3BsYXlWYWx1ZTsgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IG1vZGlmaWVkRGlzcGxheVZhbHVlKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5tb2RpZmllZERpc3BsYXlWYWx1ZSA9IHZhbHVlOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5kaXNwbGF5VmFsdWU7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IGRpc3BsYXlWYWx1ZSh2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIuZGlzcGxheVZhbHVlID0gdmFsdWU7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5pdCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5lbmdpbmVlcmluZ1VuaXQ7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVhZE9ubHkoKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5pc1dyaXRlYWJsZS52YWx1ZTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd3JpdGVBY2Nlc3MoKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyLndyaXRlQWNjZXNzLnZhbHVlOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHJhbnNmZXJGYWlsZWQoKTogYm9vbGVhbntcclxuICAgICAgICBsZXQgdHJhbnNmZXJGYWlsZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgcGFyYW0gPSB0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyO1xyXG4gICAgICAgIGlmKHBhcmFtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHBhcmFtLnRyYW5zZmVyRmFpbGVkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2ZlckZhaWxlZCA9IHBhcmFtLnRyYW5zZmVyRmFpbGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmFuc2ZlckZhaWxlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gZGVmaW5pdGlvbiBmb3IgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENtTm9kZVxyXG4gICAgICovXHJcbiAgICBnZXQgaWNvbkRlZmluaXRpb24oKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuaXNNb2RpZmllZCA9PSB0cnVlICYmIHRoaXMuZWxlbWVudC5lZGl0TW9kZUFjdGl2ZSl7XHJcbiAgICAgICAgICAgIC8vU2hvdyBzb21lIG1vZGlmaWVkIGljb25cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TW9kaWZpZWRJY29uRGVmaW5pdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTaG93IHRoZSBkZWZhdWx0IG5vZGUgaWNvblxyXG4gICAgICAgIHJldHVybiBDbU5vZGUuY3JlYXRlRGl2KFwiZS10cmVlZ3JpZCBlLWNtZG9jXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBpY29uIGRlZmluaXRpb24gaWYgbm9kZSBpcyBtb2RpZmllZChlLmcuIG9ubHkgbW9kaWZpZWQsIG9yIG1vZGlmaWVkIGFuZCB0cmFuc2ZlciBmYWlsZWQsIG9yIG1vZGlmaWVkIGFuZCBub3QgdHJhbnNmZXJhYmxlKVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21Ob2RlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNb2RpZmllZEljb25EZWZpbml0aW9uKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLnRyYW5zZmVyRmFpbGVkID09IHRydWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gQ21Ob2RlLmNyZWF0ZURpdihcInRyYW5zZmVyRmFpbGVkSWNvblwiLCBcIlBlbmRpbmcgY2hhbmdlIChmYWlsZWQgdG8gYXBwbHkgdmFsdWUgaW4gbGFzdCBhdHRlbXB0KVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5yZWFkT25seSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIENtTm9kZS5jcmVhdGVEaXYoXCJub3RUcmFuc2ZlcmFibGVJY29uXCIsIFwiUGVuZGluZyBjaGFuZ2UgY2Fu4oCZdCBiZSBhcHBsaWVkIGR1ZSB0byBjdXJyZW50IGNvbXBvbmVudCBzdGF0ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENtTm9kZS5jcmVhdGVEaXYoXCJtb2RpZmllZEljb25cIiwgXCJQZW5kaW5nIGNoYW5nZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYSBkaXYgd2l0aCB0aGUgZ2l2ZW4gdG9vbHRpcFRleHQgYW5kIGNsYXNzTmFtZSBhbmQgcmV0dXJucyB0aGUgZGl2IHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbHRpcFRleHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21Ob2RlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgY3JlYXRlRGl2KGNsYXNzTmFtZTogc3RyaW5nLCB0b29sdGlwVGV4dDogc3RyaW5nID0gXCJcIik6IHN0cmluZ3tcclxuICAgICAgICBpZih0b29sdGlwVGV4dCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiB0aXRsZT0nXCIgKyB0b29sdGlwVGV4dCArIFwiJyBjbGFzcz0nXCIgKyBjbGFzc05hbWUgKyBcIic+PC9kaXY+XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz0nXCIgKyBjbGFzc05hbWUgKyBcIic+PC9kaXY+XCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIGRlZmluaXRpb24gZm9yIGNvbGxhcHNlL2V4cGFuZCBpY29uIGZvciB0aGlzIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21Ob2RlXHJcbiAgICAgKi9cclxuICAgIGdldCBjb2xsYXBzZUV4cGFuZEljb25EZWZpbml0aW9uKCk6IHN0cmluZ3tcclxuICAgICAgICAvLyBObyBjb2xsYXBzZSBleHBhbmQgaWNvbiBmb3Igbm9kZXMgd2l0aG91dCBjaGlsZHNcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHRoZSB2YWx1ZSBvZiB0aGlzIG5vZGUgYWxyZWFkeSBtb2RpZmllZFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENtTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzTW9kaWZpZWQoKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyPy5tb2RpZmllZFZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IconInfo = /** @class */ (function () {
        function IconInfo(name, tooltip, imageName) {
            if (tooltip === void 0) { tooltip = ''; }
            if (imageName === void 0) { imageName = ''; }
            this._name = name;
            this._tooltip = tooltip;
            this._imageName = imageName;
        }
        /**
         * Updates icon info image and tooltip
         *
         * @param {string} imageName
         * @param {string} tooltip
         * @memberof IconInfo
         */
        IconInfo.prototype.updateInfo = function (imageName, tooltip) {
            this.imageName = imageName;
            this.tooltip = tooltip;
        };
        Object.defineProperty(IconInfo.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconInfo.prototype, "tooltip", {
            get: function () {
                return this._tooltip;
            },
            set: function (tooltip) {
                this._tooltip = tooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconInfo.prototype, "imageName", {
            get: function () {
                return this._imageName;
            },
            set: function (imageName) {
                this._imageName = imageName;
            },
            enumerable: true,
            configurable: true
        });
        return IconInfo;
    }());
    exports.IconInfo = IconInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbkluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2ljb25JbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBU0ksa0JBQW1CLElBQVksRUFBRSxPQUFvQixFQUFFLFNBQXNCO1lBQTVDLHdCQUFBLEVBQUEsWUFBb0I7WUFBRSwwQkFBQSxFQUFBLGNBQXNCO1lBQ3pFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSw2QkFBVSxHQUFqQixVQUFrQixTQUFpQixFQUFFLE9BQWU7WUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUVELHNCQUFXLDBCQUFJO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO2lCQUVELFVBQWdCLElBQUk7Z0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7OztXQUpBO1FBTUQsc0JBQVcsNkJBQU87aUJBQWxCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDO2lCQUVELFVBQW1CLE9BQU87Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQzVCLENBQUM7OztXQUpBO1FBTUQsc0JBQVcsK0JBQVM7aUJBQXBCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO2lCQUVELFVBQXFCLFNBQVM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQ2hDLENBQUM7OztXQUpBO1FBS0wsZUFBQztJQUFELENBQUMsQUFsREQsSUFrREM7SUFsRFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSWNvbkluZm97XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIG5hbWUgb2YgaWNvblxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG4gICAgLy8gSG9sZHMgdGhlIHRvb2x0aXAgb2YgaWNvblxyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcDogc3RyaW5nO1xyXG4gICAgLy8gSG9sZHMgdGhlIGltYWdlIG5hbWUgb2YgaWNvblxyXG4gICAgcHJpdmF0ZSBfaW1hZ2VOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nID0gJycsIGltYWdlTmFtZTogc3RyaW5nID0gJycpe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlTmFtZSA9IGltYWdlTmFtZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGljb24gaW5mbyBpbWFnZSBhbmQgdG9vbHRpcFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b29sdGlwXHJcbiAgICAgKiBAbWVtYmVyb2YgSWNvbkluZm9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUluZm8oaW1hZ2VOYW1lOiBzdHJpbmcsIHRvb2x0aXA6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lID0gaW1hZ2VOYW1lO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcCA9IHRvb2x0aXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBuYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRvb2x0aXAodG9vbHRpcCkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaW1hZ2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGltYWdlTmFtZShpbWFnZU5hbWUpIHtcclxuICAgICAgICB0aGlzLl9pbWFnZU5hbWUgPSBpbWFnZU5hbWU7XHJcbiAgICB9XHJcbn0iXX0=
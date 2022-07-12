define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * !! ID and Class names are used in css file tabWidgetDropDownStyle.css
     *
     * @export
     * @class DropDownCssClassNameProvider
     */
    var DropDownCssClassNameProvider = /** @class */ (function () {
        function DropDownCssClassNameProvider() {
        }
        DropDownCssClassNameProvider.dropDownListStyle = "DropDownListStyle";
        DropDownCssClassNameProvider.dropDownWrapper = "DropDownWrapper";
        DropDownCssClassNameProvider.hideDropDownWrapper = "HideDropDownWrapper";
        DropDownCssClassNameProvider.dropDownItemImg = "DropDownItemImg";
        DropDownCssClassNameProvider.dropDownItemText = "DropDownItemText";
        DropDownCssClassNameProvider.dropDownFooterCloseAll = "DropDownFooterCloseAll";
        DropDownCssClassNameProvider.dropDownFooterCloseAllOther = "DropDownFooterCloseAllOther";
        DropDownCssClassNameProvider.listItemDeleteButton = "ListItemDeleteButton";
        return DropDownCssClassNameProvider;
    }());
    exports.DropDownCssClassNameProvider = DropDownCssClassNameProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcERvd25Dc3NDbGFzc05hbWVQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90YWJXaWRnZXQvc3R5bGUvZHJvcERvd25Dc3NDbGFzc05hbWVQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTs7Ozs7T0FLRztJQUNIO1FBRUk7UUFBc0IsQ0FBQztRQUVBLDhDQUFpQixHQUFXLG1CQUFtQixDQUFDO1FBQ2hELDRDQUFlLEdBQVcsaUJBQWlCLENBQUM7UUFDNUMsZ0RBQW1CLEdBQVcscUJBQXFCLENBQUM7UUFDcEQsNENBQWUsR0FBVyxpQkFBaUIsQ0FBQztRQUM1Qyw2Q0FBZ0IsR0FBVyxrQkFBa0IsQ0FBQztRQUM5QyxtREFBc0IsR0FBVyx3QkFBd0IsQ0FBQztRQUMxRCx3REFBMkIsR0FBVyw2QkFBNkIsQ0FBQztRQUNwRSxpREFBb0IsR0FBVyxzQkFBc0IsQ0FBQztRQUNqRixtQ0FBQztLQUFBLEFBWkQsSUFZQztJQVpZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAhISBJRCBhbmQgQ2xhc3MgbmFtZXMgYXJlIHVzZWQgaW4gY3NzIGZpbGUgdGFiV2lkZ2V0RHJvcERvd25TdHlsZS5jc3NcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgRHJvcERvd25Dc3NDbGFzc05hbWVQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERyb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXIge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7fVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZHJvcERvd25MaXN0U3R5bGU6IHN0cmluZyA9IFwiRHJvcERvd25MaXN0U3R5bGVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZHJvcERvd25XcmFwcGVyOiBzdHJpbmcgPSBcIkRyb3BEb3duV3JhcHBlclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBoaWRlRHJvcERvd25XcmFwcGVyOiBzdHJpbmcgPSBcIkhpZGVEcm9wRG93bldyYXBwZXJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZHJvcERvd25JdGVtSW1nOiBzdHJpbmcgPSBcIkRyb3BEb3duSXRlbUltZ1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkcm9wRG93bkl0ZW1UZXh0OiBzdHJpbmcgPSBcIkRyb3BEb3duSXRlbVRleHRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZHJvcERvd25Gb290ZXJDbG9zZUFsbDogc3RyaW5nID0gXCJEcm9wRG93bkZvb3RlckNsb3NlQWxsXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRyb3BEb3duRm9vdGVyQ2xvc2VBbGxPdGhlcjogc3RyaW5nID0gXCJEcm9wRG93bkZvb3RlckNsb3NlQWxsT3RoZXJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGlzdEl0ZW1EZWxldGVCdXR0b246IHN0cmluZyA9IFwiTGlzdEl0ZW1EZWxldGVCdXR0b25cIjtcclxufSJdfQ==
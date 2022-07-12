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
define(["require", "exports", "./cmParameter"], function (require, exports, cmParameter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmGroup = /** @class */ (function (_super) {
        __extends(CmGroup, _super);
        /**
         * Creates an instance of CmGroup
         * @param {IMetaDataGroup} groupMetaData
         * @param {Array<MappCockpitComponentParameter>} componentParameters
         * @param {boolean} editModeActive
         * @memberof CmGroup
         */
        function CmGroup(groupMetaData, componentParameters, editModeActive) {
            var _this = _super.call(this, groupMetaData, componentParameters, editModeActive) || this;
            var childConfigurationData = new Array();
            if (groupMetaData != null) {
                if (groupMetaData.Childs != null) {
                    groupMetaData.Childs.forEach(function (childElement) {
                        if (childElement.Group != null) {
                            childConfigurationData.push(new CmGroup(childElement.Group, componentParameters, editModeActive));
                        }
                        else {
                            childConfigurationData.push(new cmParameter_1.CmParameter(childElement.Parameter, componentParameters, editModeActive));
                        }
                    });
                }
            }
            _this.childs = childConfigurationData;
            return _this;
        }
        return CmGroup;
    }(cmParameter_1.CmParameter));
    exports.CmGroup = CmGroup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY21Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBNkIsMkJBQVc7UUFVcEM7Ozs7OztXQU1HO1FBQ0gsaUJBQVksYUFBNkIsRUFBRSxtQkFBbUUsRUFBRSxjQUF1QjtZQUF2SSxZQUNJLGtCQUFNLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLENBQUMsU0FlNUQ7WUFkRyxJQUFJLHNCQUFzQixHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1lBQ3ZELElBQUcsYUFBYSxJQUFJLElBQUksRUFBQztnQkFDckIsSUFBRyxhQUFhLENBQUMsTUFBTSxJQUFJLElBQUksRUFBQztvQkFDNUIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxZQUFZO3dCQUNyQyxJQUFHLFlBQVksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFDOzRCQUMxQixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO3lCQUNyRzs2QkFDRzs0QkFDQSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQzt5QkFDN0c7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047YUFDSjtZQUNELEtBQUksQ0FBQyxNQUFNLEdBQUcsc0JBQXNCLENBQUM7O1FBQ3pDLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FBQyxBQWxDRCxDQUE2Qix5QkFBVyxHQWtDdkM7SUFsQ1ksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ21QYXJhbWV0ZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NtUGFyYW1ldGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENtUGFyYW1ldGVyIH0gZnJvbSBcIi4vY21QYXJhbWV0ZXJcIjtcclxuaW1wb3J0IHsgSUNtR3JvdXAgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NtR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElNZXRhRGF0YUdyb3VwIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tZXRhRGF0YUdyb3VwSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ21Hcm91cCBleHRlbmRzIENtUGFyYW1ldGVyIGltcGxlbWVudHMgSUNtR3JvdXB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGNoaWxkIHBhcmFtZXRlcnMvZ3JvdXBcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7SUNtUGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21Hcm91cFxyXG4gICAgICovXHJcbiAgICBjaGlsZHM6IElDbVBhcmFtZXRlcltdO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ21Hcm91cFxyXG4gICAgICogQHBhcmFtIHtJTWV0YURhdGFHcm91cH0gZ3JvdXBNZXRhRGF0YVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZWRpdE1vZGVBY3RpdmVcclxuICAgICAqIEBtZW1iZXJvZiBDbUdyb3VwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGdyb3VwTWV0YURhdGE6IElNZXRhRGF0YUdyb3VwLCBjb21wb25lbnRQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj58dW5kZWZpbmVkLCBlZGl0TW9kZUFjdGl2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgc3VwZXIoZ3JvdXBNZXRhRGF0YSwgY29tcG9uZW50UGFyYW1ldGVycywgZWRpdE1vZGVBY3RpdmUpO1xyXG4gICAgICAgIHZhciBjaGlsZENvbmZpZ3VyYXRpb25EYXRhID0gbmV3IEFycmF5PElDbVBhcmFtZXRlcj4oKTtcclxuICAgICAgICBpZihncm91cE1ldGFEYXRhICE9IG51bGwpe1xyXG4gICAgICAgICAgICBpZihncm91cE1ldGFEYXRhLkNoaWxkcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGdyb3VwTWV0YURhdGEuQ2hpbGRzLmZvckVhY2goY2hpbGRFbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZEVsZW1lbnQuR3JvdXAgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ29uZmlndXJhdGlvbkRhdGEucHVzaChuZXcgQ21Hcm91cChjaGlsZEVsZW1lbnQuR3JvdXAsIGNvbXBvbmVudFBhcmFtZXRlcnMsIGVkaXRNb2RlQWN0aXZlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ29uZmlndXJhdGlvbkRhdGEucHVzaChuZXcgQ21QYXJhbWV0ZXIoY2hpbGRFbGVtZW50LlBhcmFtZXRlciwgY29tcG9uZW50UGFyYW1ldGVycywgZWRpdE1vZGVBY3RpdmUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoaWxkcyA9IGNoaWxkQ29uZmlndXJhdGlvbkRhdGE7XHJcbiAgICB9XHJcbn0iXX0=
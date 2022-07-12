define(["require", "exports", "./treeGridToolbarBase"], function (require, exports, treeGridToolbarBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolbarButton = /** @class */ (function () {
        function ToolbarButton(id, tooltip, icon, align) {
            if (align === void 0) { align = treeGridToolbarBase_1.ToolbarButtonAlignment.Left; }
            this.id = id;
            this.tooltip = tooltip;
            this.icon = icon;
            this.disabled = false;
            this.align = align;
        }
        return ToolbarButton;
    }());
    exports.ToolbarButton = ToolbarButton;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhckJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdG9vbGJhckJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQVFJLHVCQUFtQixFQUFVLEVBQUUsT0FBZSxFQUFFLElBQVksRUFBRSxLQUEyRDtZQUEzRCxzQkFBQSxFQUFBLFFBQWdDLDRDQUFzQixDQUFDLElBQUk7WUFDckgsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBZkQsSUFlQztJQWZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9vbGJhckJ1dHRvbkFsaWdubWVudCB9IGZyb20gXCIuL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUb29sYmFyQnV0dG9ue1xyXG5cclxuICAgIGlkOnN0cmluZztcclxuICAgIHRvb2x0aXA6c3RyaW5nO1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBhbGlnbjogVG9vbGJhckJ1dHRvbkFsaWdubWVudDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nLCBpY29uOiBzdHJpbmcsIGFsaWduOiBUb29sYmFyQnV0dG9uQWxpZ25tZW50ID0gVG9vbGJhckJ1dHRvbkFsaWdubWVudC5MZWZ0KXtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50b29sdGlwID0gdG9vbHRpcDtcclxuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFsaWduID0gYWxpZ247XHJcbiAgICB9XHJcbn0iXX0=
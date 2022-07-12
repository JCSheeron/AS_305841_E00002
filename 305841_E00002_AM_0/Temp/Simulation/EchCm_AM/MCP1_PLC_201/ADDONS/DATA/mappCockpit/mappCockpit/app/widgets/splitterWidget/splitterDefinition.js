define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitterDefinition = /** @class */ (function () {
        function SplitterDefinition(orientation, responsive) {
            if (responsive === void 0) { responsive = true; }
            this.orientation = orientation;
            this.responsive = responsive;
            this.paneDefinitions = new Array();
        }
        SplitterDefinition.orientationVertical = "vertical";
        SplitterDefinition.orientationHorizontal = "horizontal";
        SplitterDefinition.splitterDefinitionId = "splitterDefinition";
        return SplitterDefinition;
    }());
    exports.SplitterDefinition = SplitterDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJEZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyRGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQVVJLDRCQUFZLFdBQW1CLEVBQUUsVUFBMEI7WUFBMUIsMkJBQUEsRUFBQSxpQkFBMEI7WUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEtBQUssRUFBMEIsQ0FBQztRQUMvRCxDQUFDO1FBWnNCLHNDQUFtQixHQUFHLFVBQVUsQ0FBQztRQUNqQyx3Q0FBcUIsR0FBRyxZQUFZLENBQUM7UUFDckMsdUNBQW9CLEdBQUcsb0JBQW9CLENBQUM7UUFXdkUseUJBQUM7S0FBQSxBQWZELElBZUM7SUFmWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGxpdHRlclBhbmVEZWZpbml0aW9uIH0gZnJvbSBcIi4vc3BsaXR0ZXJQYW5lRGVmaW5pdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyRGVmaW5pdGlvbntcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBvcmllbnRhdGlvblZlcnRpY2FsID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBvcmllbnRhdGlvbkhvcml6b250YWwgPSBcImhvcml6b250YWxcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIG9yaWVudGF0aW9uOiBzdHJpbmc7XHJcbiAgICByZXNwb25zaXZlOiBib29sZWFuO1xyXG4gICAgcGFuZURlZmluaXRpb25zOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcmllbnRhdGlvbjogc3RyaW5nLCByZXNwb25zaXZlOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2l2ZSA9IHJlc3BvbnNpdmU7XHJcbiAgICAgICAgdGhpcy5wYW5lRGVmaW5pdGlvbnMgPSBuZXcgQXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj4oKTtcclxuICAgIH1cclxufSJdfQ==
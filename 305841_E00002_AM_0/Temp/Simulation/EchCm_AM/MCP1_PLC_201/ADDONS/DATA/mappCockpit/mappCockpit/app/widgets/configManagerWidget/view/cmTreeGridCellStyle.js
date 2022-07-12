define(["require", "exports", "../../common/domHelper", "../configManagerWidget"], function (require, exports, domHelper_1, configManagerWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridCellStyle = /** @class */ (function () {
        function CmTreeGridCellStyle() {
        }
        CmTreeGridCellStyle.prototype.setCellStyle = function (args, dataModel) {
            if (args.column.field == configManagerWidget_1.ConfigManagerWidget.displayModifiedValueColumnId) {
                var writeAccess = false;
                if (dataModel != undefined) {
                    writeAccess = dataModel.writeAccess;
                }
                var writeAccessDisabled = !writeAccess;
                if (args.cellElement.classList != undefined) {
                    // Show ReadOnly cells with other color
                    var disableTreeCellClassName = "treeCellDisabled";
                    if (writeAccessDisabled == true) {
                        args.cellElement.classList.add(disableTreeCellClassName);
                    }
                    else {
                        args.cellElement.classList.remove(disableTreeCellClassName);
                    }
                }
                // Set all cells disabled in the targetValue column
                domHelper_1.DomHelper.disableElement(args.cellElement, writeAccessDisabled);
            }
            if (args.column.field == configManagerWidget_1.ConfigManagerWidget.displayValueColumnId) {
                if (args.cellElement.classList != undefined) {
                    // Show all cells read only in the targetValue column
                    var disableTreeCellClassName = "treeCellDisabled";
                    args.cellElement.classList.add(disableTreeCellClassName);
                }
                // Set all cells disabled in the targetValue column
                domHelper_1.DomHelper.disableElement(args.cellElement, true);
            }
        };
        return CmTreeGridCellStyle;
    }());
    exports.CmTreeGridCellStyle = CmTreeGridCellStyle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZENlbGxTdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L3ZpZXcvY21UcmVlR3JpZENlbGxTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQUFBO1FBK0JBLENBQUM7UUE5QkcsMENBQVksR0FBWixVQUFjLElBQUksRUFBRSxTQUFpRDtZQUNqRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLHlDQUFtQixDQUFDLDRCQUE0QixFQUFDO2dCQUN0RSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7aUJBQ3ZDO2dCQUNELElBQUksbUJBQW1CLEdBQUcsQ0FBQyxXQUFXLENBQUM7Z0JBQ3ZDLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFDO29CQUN2Qyx1Q0FBdUM7b0JBQ3ZDLElBQUksd0JBQXdCLEdBQUcsa0JBQWtCLENBQUM7b0JBQ2xELElBQUcsbUJBQW1CLElBQUksSUFBSSxFQUFDO3dCQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztxQkFDNUQ7eUJBQ0c7d0JBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQy9EO2lCQUNKO2dCQUNELG1EQUFtRDtnQkFDbkQscUJBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2FBQ25FO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSx5Q0FBbUIsQ0FBQyxvQkFBb0IsRUFBQztnQkFDOUQsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUM7b0JBQ3ZDLHFEQUFxRDtvQkFDckQsSUFBSSx3QkFBd0IsR0FBRyxrQkFBa0IsQ0FBQztvQkFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7aUJBQzVEO2dCQUNELG1EQUFtRDtnQkFDbkQscUJBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyRDtRQUNKLENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUEvQkQsSUErQkM7SUEvQlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuaW1wb3J0IHsgQ29uZmlnTWFuYWdlcldpZGdldCB9IGZyb20gXCIuLi9jb25maWdNYW5hZ2VyV2lkZ2V0XCI7XHJcbmltcG9ydCB7IENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWwvY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtVHJlZUdyaWRDZWxsU3R5bGV7XHJcbiAgICBzZXRDZWxsU3R5bGUgKGFyZ3MsIGRhdGFNb2RlbDogQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbHx1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmIChhcmdzLmNvbHVtbi5maWVsZCA9PSBDb25maWdNYW5hZ2VyV2lkZ2V0LmRpc3BsYXlNb2RpZmllZFZhbHVlQ29sdW1uSWQpe1xyXG4gICAgICAgICAgICBsZXQgd3JpdGVBY2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3cml0ZUFjY2VzcyA9IGRhdGFNb2RlbC53cml0ZUFjY2VzcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd3JpdGVBY2Nlc3NEaXNhYmxlZCA9ICF3cml0ZUFjY2VzcztcclxuICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFNob3cgUmVhZE9ubHkgY2VsbHMgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSA9IFwidHJlZUNlbGxEaXNhYmxlZFwiO1xyXG4gICAgICAgICAgICAgICAgaWYod3JpdGVBY2Nlc3NEaXNhYmxlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2V0IGFsbCBjZWxscyBkaXNhYmxlZCBpbiB0aGUgdGFyZ2V0VmFsdWUgY29sdW1uXHJcbiAgICAgICAgICAgIERvbUhlbHBlci5kaXNhYmxlRWxlbWVudChhcmdzLmNlbGxFbGVtZW50LCB3cml0ZUFjY2Vzc0Rpc2FibGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IENvbmZpZ01hbmFnZXJXaWRnZXQuZGlzcGxheVZhbHVlQ29sdW1uSWQpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBhbGwgY2VsbHMgcmVhZCBvbmx5IGluIHRoZSB0YXJnZXRWYWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNldCBhbGwgY2VsbHMgZGlzYWJsZWQgaW4gdGhlIHRhcmdldFZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICBEb21IZWxwZXIuZGlzYWJsZUVsZW1lbnQoYXJncy5jZWxsRWxlbWVudCwgdHJ1ZSk7XHJcbiAgICAgICB9IFxyXG4gICAgfVxyXG59Il19
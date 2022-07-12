define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerTreeGridCellStyle = /** @class */ (function () {
        function ChartManagerTreeGridCellStyle() {
        }
        ChartManagerTreeGridCellStyle.prototype.setCellStyle = function (args) {
            if (args.column.field == "name" && (args.data.level == 0 || args.data.level == 1)) {
                // Show root nodes always bold => also if they have no childs
                args.cellElement.style.fontWeight = "bold";
                if (args.data.dropPossible == true) {
                    args.cellElement.classList.add("dropLocationArea");
                }
            }
            /*if (args.data.level == 0 && args.data.isDisabled == true ||             // Set different style for chart if chart is disabled
                args.data.level == 1 && args.data.parentItem.isDisabled == true){   // Set different style for series if parent chart is disabled
                
                $(args.cellElement).css("color", "rgba(128, 128, 128, 0.5)");
            }*/
        };
        return ChartManagerTreeGridCellStyle;
    }());
    exports.ChartManagerTreeGridCellStyle = ChartManagerTreeGridCellStyle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRNYW5hZ2VyV2lkZ2V0L3ZpZXcvY2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7UUFBQTtRQWVBLENBQUM7UUFkRyxvREFBWSxHQUFaLFVBQWMsSUFBSTtZQUNkLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUMvRSw2REFBNkQ7Z0JBQzdELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQzNDLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFDO29CQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDdEQ7YUFDSjtZQUNEOzs7O2VBSUc7UUFDUCxDQUFDO1FBQ0wsb0NBQUM7SUFBRCxDQUFDLEFBZkQsSUFlQztJQWZZLHNFQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDaGFydE1hbmFnZXJUcmVlR3JpZENlbGxTdHlsZXtcclxuICAgIHNldENlbGxTdHlsZSAoYXJncyl7XHJcbiAgICAgICAgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IFwibmFtZVwiICYmIChhcmdzLmRhdGEubGV2ZWwgPT0gMCB8fCBhcmdzLmRhdGEubGV2ZWwgPT0gMSkpIHtcclxuICAgICAgICAgICAgLy8gU2hvdyByb290IG5vZGVzIGFsd2F5cyBib2xkID0+IGFsc28gaWYgdGhleSBoYXZlIG5vIGNoaWxkc1xyXG4gICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLmRyb3BQb3NzaWJsZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRyb3BMb2NhdGlvbkFyZWFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyppZiAoYXJncy5kYXRhLmxldmVsID09IDAgJiYgYXJncy5kYXRhLmlzRGlzYWJsZWQgPT0gdHJ1ZSB8fCAgICAgICAgICAgICAvLyBTZXQgZGlmZmVyZW50IHN0eWxlIGZvciBjaGFydCBpZiBjaGFydCBpcyBkaXNhYmxlZFxyXG4gICAgICAgICAgICBhcmdzLmRhdGEubGV2ZWwgPT0gMSAmJiBhcmdzLmRhdGEucGFyZW50SXRlbS5pc0Rpc2FibGVkID09IHRydWUpeyAgIC8vIFNldCBkaWZmZXJlbnQgc3R5bGUgZm9yIHNlcmllcyBpZiBwYXJlbnQgY2hhcnQgaXMgZGlzYWJsZWRcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoYXJncy5jZWxsRWxlbWVudCkuY3NzKFwiY29sb3JcIiwgXCJyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuNSlcIik7XHJcbiAgICAgICAgfSovXHJcbiAgICB9XHJcbn0iXX0=
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DirectoryProvider = /** @class */ (function () {
        function DirectoryProvider() {
        }
        DirectoryProvider.getAppDirectory = function () {
            return "mappCockpit/app/";
        };
        DirectoryProvider.getWidgetsDirectory = function () {
            return DirectoryProvider.getAppDirectory() + "widgets/";
        };
        return DirectoryProvider;
    }());
    exports.DirectoryProvider = DirectoryProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0b3J5UHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTtRQUFBO1FBVUEsQ0FBQztRQVJVLGlDQUFlLEdBQXRCO1lBQ0ksT0FBTyxrQkFBa0IsQ0FBQztRQUM5QixDQUFDO1FBRU0scUNBQW1CLEdBQTFCO1lBQ0ksT0FBTyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDNUQsQ0FBQztRQUVMLHdCQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7SUFWWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNsYXNzIERpcmVjdG9yeVByb3ZpZGVyIHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0QXBwRGlyZWN0b3J5KCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJtYXBwQ29ja3BpdC9hcHAvXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdpZGdldHNEaXJlY3RvcnkoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBEaXJlY3RvcnlQcm92aWRlci5nZXRBcHBEaXJlY3RvcnkoKSArIFwid2lkZ2V0cy9cIjtcclxuICAgIH1cclxuICAgIFxyXG59Il19
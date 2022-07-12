define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IndexedDBCommandMessage;
    (function (IndexedDBCommandMessage) {
        IndexedDBCommandMessage["clear"] = "clear";
        IndexedDBCommandMessage["init"] = "init";
        IndexedDBCommandMessage["store"] = "store";
        IndexedDBCommandMessage["load"] = "load";
        IndexedDBCommandMessage["success"] = "success";
        IndexedDBCommandMessage["error"] = "error";
    })(IndexedDBCommandMessage = exports.IndexedDBCommandMessage || (exports.IndexedDBCommandMessage = {}));
    ;
    var IndexedDBCommand = /** @class */ (function () {
        function IndexedDBCommand(message, data) {
            this.message = message;
            this.data = data;
        }
        return IndexedDBCommand;
    }());
    exports.IndexedDBCommand = IndexedDBCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlZGRiQ29tbWFuZEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvaW5kZXhlZGRiQ29tbWFuZEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxJQUFZLHVCQU9YO0lBUEQsV0FBWSx1QkFBdUI7UUFDL0IsMENBQWUsQ0FBQTtRQUNmLHdDQUFhLENBQUE7UUFDYiwwQ0FBZSxDQUFBO1FBQ2Ysd0NBQWEsQ0FBQTtRQUNiLDhDQUFtQixDQUFBO1FBQ25CLDBDQUFjLENBQUE7SUFDbEIsQ0FBQyxFQVBXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBT2xDO0lBQUEsQ0FBQztJQUVGO1FBS0ksMEJBQWEsT0FBTyxFQUFFLElBQUk7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQVRELElBU0M7SUFUWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBJbmRleGVkREJDb21tYW5kTWVzc2FnZSB7XHJcbiAgICBjbGVhciA9IFwiY2xlYXJcIixcclxuICAgIGluaXQgPSBcImluaXRcIixcclxuICAgIHN0b3JlID0gXCJzdG9yZVwiLFxyXG4gICAgbG9hZCA9IFwibG9hZFwiLFxyXG4gICAgc3VjY2VzcyA9IFwic3VjY2Vzc1wiLFxyXG4gICAgZXJyb3I9IFwiZXJyb3JcIlxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEluZGV4ZWREQkNvbW1hbmR7XHJcblxyXG4gICAgbWVzc2FnZSA6IEluZGV4ZWREQkNvbW1hbmRNZXNzYWdlO1xyXG4gICAgZGF0YSA6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobWVzc2FnZSwgZGF0YSl7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
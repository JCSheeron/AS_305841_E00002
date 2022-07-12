define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UniqueIdGenerator = /** @class */ (function () {
        function UniqueIdGenerator() {
        }
        UniqueIdGenerator.getInstance = function () {
            if (!UniqueIdGenerator.instance) {
                UniqueIdGenerator.instance = new UniqueIdGenerator();
                // ... any one time initialization goes here ...
            }
            return UniqueIdGenerator.instance;
        };
        UniqueIdGenerator.prototype.getUniqueIdFromString = function (string) {
            var hash = 0;
            if (string.length == 0) {
                return string + hash.toString();
            }
            for (var i = 0; i < string.length; i++) {
                var char = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            if (hash < 0) {
                hash = hash * -1;
            }
            var id = string.toString().replace(/[&\/\\#,+( )$~%.'":*?<>{}]/g, '_') + hash;
            return id;
        };
        return UniqueIdGenerator;
    }());
    exports.UniqueIdGenerator = UniqueIdGenerator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcXVlSWRHZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3VuaXF1ZUlkR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7UUErQkEsQ0FBQztRQTNCVSw2QkFBVyxHQUFsQjtZQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3JELGdEQUFnRDthQUNuRDtZQUNELE9BQU8saUJBQWlCLENBQUMsUUFBUSxDQUFDO1FBQ3RDLENBQUM7UUFFRCxpREFBcUIsR0FBckIsVUFBc0IsTUFBZTtZQUNqQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7WUFDYixJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNwQixPQUFPLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkM7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDO2dCQUM3QixJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLDJCQUEyQjthQUNsRDtZQUVELElBQUcsSUFBSSxHQUFHLENBQUMsRUFBQztnQkFDUixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO1lBRUQsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFFN0UsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBL0JELElBK0JDO0lBL0JZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBVbmlxdWVJZEdlbmVyYXRvcntcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogVW5pcXVlSWRHZW5lcmF0b3I7XHJcbiAgIFxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghVW5pcXVlSWRHZW5lcmF0b3IuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgVW5pcXVlSWRHZW5lcmF0b3IuaW5zdGFuY2UgPSBuZXcgVW5pcXVlSWRHZW5lcmF0b3IoKTtcclxuICAgICAgICAgICAgLy8gLi4uIGFueSBvbmUgdGltZSBpbml0aWFsaXphdGlvbiBnb2VzIGhlcmUgLi4uXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBVbmlxdWVJZEdlbmVyYXRvci5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVbmlxdWVJZEZyb21TdHJpbmcoc3RyaW5nIDogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgICAgICB2YXIgaGFzaCA9IDA7XHJcbiAgICAgICAgaWYgKHN0cmluZy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nICsgaGFzaC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hhciA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgICAgICBoYXNoID0gKChoYXNoPDw1KS1oYXNoKStjaGFyO1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaCAmIGhhc2g7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihoYXNoIDwgMCl7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoICogLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaWQgPSBzdHJpbmcudG9TdHJpbmcoKS5yZXBsYWNlKC9bJlxcL1xcXFwjLCsoICkkfiUuJ1wiOio/PD57fV0vZywnXycpICsgaGFzaDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG59Il19
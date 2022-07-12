define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentContext = /** @class */ (function () {
        function ComponentContext() {
            this.data = new Map();
        }
        ComponentContext.prototype.addContext = function (key, value) {
            this.data.set(key, value);
        };
        ComponentContext.prototype.getContext = function (key) {
            if (this.data.has(key)) {
                return this.data.get(key);
            }
            return undefined;
        };
        ComponentContext.prototype.removeContext = function (key) {
            if (this.data.has(key)) {
                this.data.delete(key);
            }
        };
        return ComponentContext;
    }());
    exports.ComponentContext = ComponentContext;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50Q29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50Q29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1lBQ0ksU0FBSSxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBbUIxQyxDQUFDO1FBakJVLHFDQUFVLEdBQWpCLFVBQWtCLEdBQVUsRUFBRSxLQUFhO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRU0scUNBQVUsR0FBakIsVUFBa0IsR0FBVTtZQUN4QixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVNLHdDQUFhLEdBQXBCLFVBQXFCLEdBQVU7WUFDM0IsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBcEJELElBb0JDO0lBcEJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21wb25lbnRDb250ZXh0e1xyXG4gICAgZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwdWJsaWMgYWRkQ29udGV4dChrZXk6c3RyaW5nLCB2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmRhdGEuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb250ZXh0KGtleTpzdHJpbmcpOiBzdHJpbmd8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5oYXMoa2V5KSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDb250ZXh0KGtleTpzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5oYXMoa2V5KSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kZWxldGUoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
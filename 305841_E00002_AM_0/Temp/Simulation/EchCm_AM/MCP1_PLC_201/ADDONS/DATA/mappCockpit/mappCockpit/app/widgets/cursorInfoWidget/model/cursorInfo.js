define(["require", "exports", "./cursorSignal"], function (require, exports, cursorSignal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorDependency;
    (function (CursorDependency) {
        CursorDependency[CursorDependency["Cursor1"] = 0] = "Cursor1";
        CursorDependency[CursorDependency["Cursor2"] = 1] = "Cursor2";
        CursorDependency[CursorDependency["BothCursors"] = 2] = "BothCursors";
    })(CursorDependency = exports.CursorDependency || (exports.CursorDependency = {}));
    var CursorInfo = /** @class */ (function () {
        function CursorInfo(id, name, description, parent, visibile, cursorDependency) {
            this._name = "";
            this._id = "";
            this._visible = "true";
            this._description = "";
            this.value = "";
            this._id = id;
            this._name = name;
            this._description = description;
            this._parent = parent;
            this._visible = visibile;
            this._cursorDependency = cursorDependency;
        }
        Object.defineProperty(CursorInfo.prototype, "cursorDependency", {
            get: function () {
                return this._cursorDependency;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorInfo.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorInfo.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorInfo.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (visible) {
                this._visible = visible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorInfo.prototype, "description", {
            get: function () {
                return this._description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorInfo.prototype, "iconDefinition", {
            /**
             * Returns the icon representation for this node for the tree grid
             *
             * @readonly
             * @type {string}
             * @memberof CursorInfo
             */
            get: function () {
                var leftMargin = 6; // Default will be used for cursor info selection view (no indent needed)
                // Return only place holder for icon to move the following text in the cell a little bit to the right
                if (this._parent instanceof cursorSignal_1.CursorSignal) {
                    leftMargin = 14;
                }
                var cursorLine = "";
                if (this._cursorDependency == CursorDependency.Cursor1) {
                    cursorLine = "border-left: 2px solid var(--main-cursor1-active-color);";
                }
                else if (this._cursorDependency == CursorDependency.Cursor2) {
                    cursorLine = "border-left: 2px solid var(--main-cursor2-active-color);";
                }
                else if (this._cursorDependency == CursorDependency.BothCursors) {
                    cursorLine = "border-left: 2px solid var(--main-cursor1-active-color); border-right: 2px solid var(--main-cursor2-active-color);";
                }
                return "<div class='e-doc' style='position: relative;height:16px;width:14px;margin:auto;float:left;margin-left:" + leftMargin + "px;margin-top:2px'>\n        <div style='width: 5px; height: 16px; position: absolute; " + cursorLine + "'></div></div>";
            },
            enumerable: true,
            configurable: true
        });
        return CursorInfo;
    }());
    exports.CursorInfo = CursorInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvckluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsSUFBWSxnQkFJWDtJQUpELFdBQVksZ0JBQWdCO1FBQ3hCLDZEQUFPLENBQUE7UUFDUCw2REFBTyxDQUFBO1FBQ1AscUVBQVcsQ0FBQTtJQUNmLENBQUMsRUFKVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQUkzQjtJQUVEO1FBZ0JJLG9CQUFZLEVBQVUsRUFBRSxJQUFZLEVBQUUsV0FBbUIsRUFBRSxNQUFNLEVBQUUsUUFBZ0IsRUFBRSxnQkFBa0M7WUFkL0csVUFBSyxHQUFXLEVBQUUsQ0FBQztZQUNuQixRQUFHLEdBQVcsRUFBRSxDQUFDO1lBQ2pCLGFBQVEsR0FBVyxNQUFNLENBQUM7WUFDMUIsaUJBQVksR0FBVyxFQUFFLENBQUM7WUFFM0IsVUFBSyxHQUFVLEVBQUUsQ0FBQztZQVVyQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUM5QyxDQUFDO1FBWEQsc0JBQVcsd0NBQWdCO2lCQUEzQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDOzs7V0FBQTtRQVdELHNCQUFJLDRCQUFJO2lCQUFSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDOzs7V0FBQTtRQUVELHNCQUFJLDBCQUFFO2lCQUFOO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNwQixDQUFDOzs7V0FBQTtRQUVELHNCQUFJLCtCQUFPO2lCQUFYO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDO2lCQUVELFVBQVksT0FBZTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDNUIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBSSxtQ0FBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyxzQ0FBYztZQVB6Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMseUVBQXlFO2dCQUM3RixxR0FBcUc7Z0JBQ3JHLElBQUcsSUFBSSxDQUFDLE9BQU8sWUFBWSwyQkFBWSxFQUFFO29CQUNyQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2lCQUNuQjtnQkFFRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLElBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLGdCQUFnQixDQUFDLE9BQU8sRUFBQztvQkFDbEQsVUFBVSxHQUFHLDBEQUEwRCxDQUFDO2lCQUMzRTtxQkFDSSxJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUM7b0JBQ3ZELFVBQVUsR0FBRywwREFBMEQsQ0FBQztpQkFDM0U7cUJBQ0ksSUFBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksZ0JBQWdCLENBQUMsV0FBVyxFQUFDO29CQUMzRCxVQUFVLEdBQUcsb0hBQW9ILENBQUM7aUJBQ3JJO2dCQUVELE9BQU8seUdBQXlHLEdBQUcsVUFBVSxHQUFHLHlGQUNyRSxHQUFHLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztZQUNoRyxDQUFDOzs7V0FBQTtRQUNMLGlCQUFDO0lBQUQsQ0FBQyxBQXpFRCxJQXlFQztJQXpFWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL2N1cnNvclNpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGVudW0gQ3Vyc29yRGVwZW5kZW5jeXtcclxuICAgIEN1cnNvcjEsXHJcbiAgICBDdXJzb3IyLFxyXG4gICAgQm90aEN1cnNvcnMsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JJbmZve1xyXG4gICAgICAgICAgIFxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfdmlzaWJsZTogc3RyaW5nID0gXCJ0cnVlXCI7XHJcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgdmFsdWU6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3BhcmVudDtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJzb3JEZXBlbmRlbmN5OiBDdXJzb3JEZXBlbmRlbmN5O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGN1cnNvckRlcGVuZGVuY3koKTogQ3Vyc29yRGVwZW5kZW5jeSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvckRlcGVuZGVuY3k7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBwYXJlbnQsIHZpc2liaWxlOiBzdHJpbmcsIGN1cnNvckRlcGVuZGVuY3k6IEN1cnNvckRlcGVuZGVuY3kpe1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2liaWxlO1xyXG4gICAgICAgIHRoaXMuX2N1cnNvckRlcGVuZGVuY3kgPSBjdXJzb3JEZXBlbmRlbmN5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpZCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZpc2libGUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXQgdmlzaWJsZSh2aXNpYmxlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWNvbiByZXByZXNlbnRhdGlvbiBmb3IgdGhpcyBub2RlIGZvciB0aGUgdHJlZSBncmlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBsZWZ0TWFyZ2luID0gNjsgLy8gRGVmYXVsdCB3aWxsIGJlIHVzZWQgZm9yIGN1cnNvciBpbmZvIHNlbGVjdGlvbiB2aWV3IChubyBpbmRlbnQgbmVlZGVkKVxyXG4gICAgICAgIC8vIFJldHVybiBvbmx5IHBsYWNlIGhvbGRlciBmb3IgaWNvbiB0byBtb3ZlIHRoZSBmb2xsb3dpbmcgdGV4dCBpbiB0aGUgY2VsbCBhIGxpdHRsZSBiaXQgdG8gdGhlIHJpZ2h0XHJcbiAgICAgICAgaWYodGhpcy5fcGFyZW50IGluc3RhbmNlb2YgQ3Vyc29yU2lnbmFsICl7XHJcbiAgICAgICAgICAgIGxlZnRNYXJnaW4gPSAxNDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJzb3JMaW5lID0gXCJcIjtcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JEZXBlbmRlbmN5ID09IEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMSl7XHJcbiAgICAgICAgICAgIGN1cnNvckxpbmUgPSBcImJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0tbWFpbi1jdXJzb3IxLWFjdGl2ZS1jb2xvcik7XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5fY3Vyc29yRGVwZW5kZW5jeSA9PSBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjIpe1xyXG4gICAgICAgICAgICBjdXJzb3JMaW5lID0gXCJib3JkZXItbGVmdDogMnB4IHNvbGlkIHZhcigtLW1haW4tY3Vyc29yMi1hY3RpdmUtY29sb3IpO1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuX2N1cnNvckRlcGVuZGVuY3kgPT0gQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyl7XHJcbiAgICAgICAgICAgIGN1cnNvckxpbmUgPSBcImJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0tbWFpbi1jdXJzb3IxLWFjdGl2ZS1jb2xvcik7IGJvcmRlci1yaWdodDogMnB4IHNvbGlkIHZhcigtLW1haW4tY3Vyc29yMi1hY3RpdmUtY29sb3IpO1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9J2UtZG9jJyBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlO2hlaWdodDoxNnB4O3dpZHRoOjE0cHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDpgICsgbGVmdE1hcmdpbiArIGBweDttYXJnaW4tdG9wOjJweCc+XHJcbiAgICAgICAgPGRpdiBzdHlsZT0nd2lkdGg6IDVweDsgaGVpZ2h0OiAxNnB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IGAgKyBjdXJzb3JMaW5lICsgYCc+PC9kaXY+PC9kaXY+YDtcclxuICAgIH1cclxufSJdfQ==
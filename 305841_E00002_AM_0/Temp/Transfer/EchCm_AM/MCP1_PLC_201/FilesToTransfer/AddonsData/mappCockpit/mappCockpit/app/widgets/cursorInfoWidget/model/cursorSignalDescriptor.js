define(["require", "exports", "./cursorInfo"], function (require, exports, cursorInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorSignalDescriptor = /** @class */ (function () {
        function CursorSignalDescriptor(cursorInfo) {
            this._cursorInfoIds = [];
            this._cursorInfos = [];
            this.visibleInfoIds = [];
            this.initializeCursorSignalInfos();
            if (cursorInfo !== undefined) {
                this.setCursorInfoVisibility(cursorInfo);
            }
            this.setDefaultCursorInfos();
        }
        CursorSignalDescriptor.prototype.getAllCursorInfo = function () {
            return this._cursorInfoIds;
        };
        Object.defineProperty(CursorSignalDescriptor.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        CursorSignalDescriptor.prototype.initializeCursorSignalInfos = function () { };
        /**
         * Sets the default cursor infos for this cursor signal
         *
         * @private
         * @memberof CursorSignalDescriptor
         */
        CursorSignalDescriptor.prototype.setDefaultCursorInfos = function () {
            var _this = this;
            this._cursorInfoIds.forEach(function (cursorInfoId) {
                _this.addCursorInfo(cursorInfoId.id, cursorInfoId.displayName, cursorInfoId.description, cursorInfoId.cursorDependency);
            });
        };
        /**
         * Sets the persisted cursor infos for this cursor signal
         *
         * @protected
         * @param {CursorInfoVisibility[]} cursorInfo
         * @memberof CursorSignalDescriptor
         */
        CursorSignalDescriptor.prototype.setCursorInfoVisibility = function (cursorInfo) {
            var _this = this;
            //Redefine visible infoIds
            this.visibleInfoIds = [];
            cursorInfo.forEach(function (info) {
                if (info.visible === "true") {
                    _this.visibleInfoIds.push(info.id);
                }
            });
        };
        /**
         * Adds a new cursor info to the cursor info list with the default displayname and description if not given(undefined)
         *
         * @protected
         * @param {string} id
         * @param {string} displayName
         * @param {string} description
         * @param {CursorDependency} cursorDependency
         * @memberof CursorSignalDescriptor
         */
        CursorSignalDescriptor.prototype.addCursorInfo = function (id, displayName, description, cursorDependency) {
            var visible = this.getVisibility(id);
            this._cursorInfos.push(new cursorInfo_1.CursorInfo(id, displayName, description, this, visible, cursorDependency));
        };
        /**
         * Retrieves the visibility for a given cursor info id
         *
         * @protected
         * @param {string} id
         * @returns {string}
         * @memberof CursorSignalDescriptor
         */
        CursorSignalDescriptor.prototype.getVisibility = function (id) {
            return this.visibleInfoIds.includes(id).toString();
        };
        return CursorSignalDescriptor;
    }());
    exports.CursorSignalDescriptor = CursorSignalDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvclNpZ25hbERlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFPSSxnQ0FBWSxVQUE4QztZQUxoRCxtQkFBYyxHQUFrQyxFQUFFLENBQUM7WUFFbkQsaUJBQVksR0FBc0IsRUFBRSxDQUFDO1lBQ3JDLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztZQUl6QyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUVuQyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM1QztZQUNELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFTSxpREFBZ0IsR0FBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQztRQUVELHNCQUFJLCtDQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQUVELDREQUEyQixHQUEzQixjQUErQixDQUFDO1FBRWhDOzs7OztXQUtHO1FBQ08sc0RBQXFCLEdBQS9CO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQW9DO2dCQUM3RCxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNILENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLHdEQUF1QixHQUFqQyxVQUFrQyxVQUFrQztZQUFwRSxpQkFRQztZQVBHLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN6QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtvQkFDekIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNyQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNPLDhDQUFhLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxXQUFtQixFQUFFLFdBQW1CLEVBQUUsZ0JBQWtDO1lBRTVHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSx1QkFBVSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQzFHLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ08sOENBQWEsR0FBdkIsVUFBeUIsRUFBVTtZQUMvQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZELENBQUM7UUFFTCw2QkFBQztJQUFELENBQUMsQUFyRkQsSUFxRkM7SUFyRlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3Vyc29yRGVwZW5kZW5jeSwgQ3Vyc29ySW5mbyB9IGZyb20gXCIuL2N1cnNvckluZm9cIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mb1Zpc2liaWxpdHkgfSBmcm9tIFwiLi9jdXJzb3JJbmZvVmlzaWJpbGl0eVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcntcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2N1cnNvckluZm9JZHM6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+ID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIF9jdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSBbXTtcclxuICAgIHByb3RlY3RlZCB2aXNpYmxlSW5mb0lkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGN1cnNvckluZm86IEN1cnNvckluZm9WaXNpYmlsaXR5W10gfCB1bmRlZmluZWQpe1xyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDdXJzb3JTaWduYWxJbmZvcygpO1xyXG5cclxuICAgICAgICBpZiAoY3Vyc29ySW5mbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29ySW5mb1Zpc2liaWxpdHkoY3Vyc29ySW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEN1cnNvckluZm9zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFsbEN1cnNvckluZm8gKCk6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29ySW5mb0lkcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3Vyc29ySW5mb3MoKTogQXJyYXk8Q3Vyc29ySW5mbz57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvckluZm9zO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDdXJzb3JTaWduYWxJbmZvcygpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IGN1cnNvciBpbmZvcyBmb3IgdGhpcyBjdXJzb3Igc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxEZXNjcmlwdG9yXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXREZWZhdWx0Q3Vyc29ySW5mb3MoKXtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvSWRzLmZvckVhY2goKGN1cnNvckluZm9JZDogQ3Vyc29yRGlzcGxheUluZm9DbGFzcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEN1cnNvckluZm8oY3Vyc29ySW5mb0lkLmlkLCBjdXJzb3JJbmZvSWQuZGlzcGxheU5hbWUsIGN1cnNvckluZm9JZC5kZXNjcmlwdGlvbiwgY3Vyc29ySW5mb0lkLmN1cnNvckRlcGVuZGVuY3kpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcGVyc2lzdGVkIGN1cnNvciBpbmZvcyBmb3IgdGhpcyBjdXJzb3Igc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JJbmZvVmlzaWJpbGl0eVtdfSBjdXJzb3JJbmZvXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0Q3Vyc29ySW5mb1Zpc2liaWxpdHkoY3Vyc29ySW5mbzogQ3Vyc29ySW5mb1Zpc2liaWxpdHlbXSkge1xyXG4gICAgICAgIC8vUmVkZWZpbmUgdmlzaWJsZSBpbmZvSWRzXHJcbiAgICAgICAgdGhpcy52aXNpYmxlSW5mb0lkcyA9IFtdO1xyXG4gICAgICAgIGN1cnNvckluZm8uZm9yRWFjaChpbmZvPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5mby52aXNpYmxlID09PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlSW5mb0lkcy5wdXNoKGluZm8uaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgY3Vyc29yIGluZm8gdG8gdGhlIGN1cnNvciBpbmZvIGxpc3Qgd2l0aCB0aGUgZGVmYXVsdCBkaXNwbGF5bmFtZSBhbmQgZGVzY3JpcHRpb24gaWYgbm90IGdpdmVuKHVuZGVmaW5lZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwbGF5TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc2NyaXB0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvckRlcGVuZGVuY3l9IGN1cnNvckRlcGVuZGVuY3lcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxEZXNjcmlwdG9yXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRDdXJzb3JJbmZvKGlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIGN1cnNvckRlcGVuZGVuY3k6IEN1cnNvckRlcGVuZGVuY3kpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB2aXNpYmxlID0gdGhpcy5nZXRWaXNpYmlsaXR5KGlkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb3MucHVzaChuZXcgQ3Vyc29ySW5mbyhpZCwgZGlzcGxheU5hbWUsIGRlc2NyaXB0aW9uLCB0aGlzLCB2aXNpYmxlLCBjdXJzb3JEZXBlbmRlbmN5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIHZpc2liaWxpdHkgZm9yIGEgZ2l2ZW4gY3Vyc29yIGluZm8gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VmlzaWJpbGl0eSAoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZUluZm9JZHMuaW5jbHVkZXMoaWQpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG59Il19
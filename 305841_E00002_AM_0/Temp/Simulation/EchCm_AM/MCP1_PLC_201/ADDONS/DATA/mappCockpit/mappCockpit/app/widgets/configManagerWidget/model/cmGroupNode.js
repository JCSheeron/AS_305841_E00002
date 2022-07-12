var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./cmNode", "../../../models/configManagerDataModel/cmGroup"], function (require, exports, cmNode_1, cmGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmGroupNode = /** @class */ (function (_super) {
        __extends(CmGroupNode, _super);
        /**
         * Creates an instance of CmGroupNode
         * @param {ICmGroup} element
         * @memberof CmGroupNode
         */
        function CmGroupNode(element) {
            var _this = _super.call(this, element) || this;
            _this.expandState = true;
            var childConfigurationData = new Array();
            if (element instanceof cmGroup_1.CmGroup) {
                if (element.childs != null) {
                    element.childs.forEach(function (element) {
                        if (element.filter == null || element.filter.active == false) {
                            if (element instanceof cmGroup_1.CmGroup) {
                                childConfigurationData.push(new CmGroupNode(element));
                            }
                            else {
                                childConfigurationData.push(new cmNode_1.CmNode(element));
                            }
                        }
                    });
                }
                _this.childs = childConfigurationData;
            }
            _this.childs = childConfigurationData;
            return _this;
        }
        Object.defineProperty(CmGroupNode.prototype, "iconDefinition", {
            /**
             * Returns the icon definition for this groupnode
             *
             * @readonly
             * @type {string}
             * @memberof CmGroupNode
             */
            get: function () {
                if (this.element.editModeActive == true) {
                    // Show modified icon if group is modified
                    if (this.isModified == true) {
                        return this.getModifiedIconDefinition();
                    }
                    // Show containsChanges icon also if a child is modified and the group is collapsed
                    var firstModifiedChild = this.getFirstModifiedChild(this.childs);
                    if (firstModifiedChild != undefined && !this.expanded()) {
                        return cmNode_1.CmNode.createDiv("containsChangesIcon", "Child contains pending changes");
                    }
                }
                // Show expanded or collapsed group icon
                if (this.expanded()) {
                    return cmNode_1.CmNode.createDiv("e-treegrid e-cmtreegridexpandgroup");
                }
                return cmNode_1.CmNode.createDiv("e-treegrid e-cmtreegridcollapsegroup");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the first child where a modification, transfer failed or not transferable state is found, else undefined
         *
         * @protected
         * @returns {boolean}
         * @memberof CmGroupNode
         */
        CmGroupNode.prototype.getFirstModifiedChild = function (childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var childNode = childNodes[i];
                if (childNode.isModified == true) {
                    return childNode;
                }
                else if (childNode instanceof CmGroupNode) {
                    var firstModifiedChild = this.getFirstModifiedChild(childNode.childs);
                    if (firstModifiedChild != undefined) {
                        return firstModifiedChild;
                    }
                }
            }
            return undefined;
        };
        Object.defineProperty(CmGroupNode.prototype, "collapseExpandIconDefinition", {
            /**
             * Returns the icon definition for collapse/expand icon for this groupnode
             *
             * @readonly
             * @type {string}
             * @memberof CmGroupNode
             */
            get: function () {
                var hasChildRecords = this.childs.length > 0;
                if (this.expanded() == true) {
                    return cmNode_1.CmNode.createDiv("e-treegridexpand e-cmtreegridexpand");
                }
                else if (hasChildRecords == true) {
                    return cmNode_1.CmNode.createDiv("e-treegridcollapse e-cmtreegridcollapse");
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Is this node expanded(or collapsed)
         *
         * @private
         * @returns {boolean}
         * @memberof CmGroupNode
         */
        CmGroupNode.prototype.expanded = function () {
            return this.expandState;
        };
        return CmGroupNode;
    }(cmNode_1.CmNode));
    exports.CmGroupNode = CmGroupNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21Hcm91cE5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC9tb2RlbC9jbUdyb3VwTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBaUMsK0JBQU07UUFLbkM7Ozs7V0FJRztRQUNILHFCQUFZLE9BQWlCO1lBQTdCLFlBQ0ksa0JBQU0sT0FBTyxDQUFDLFNBa0JqQjtZQTFCRCxpQkFBVyxHQUFZLElBQUksQ0FBQztZQVN4QixJQUFJLHNCQUFzQixHQUFHLElBQUksS0FBSyxFQUFXLENBQUM7WUFDbEQsSUFBRyxPQUFPLFlBQVksaUJBQU8sRUFBQztnQkFDMUIsSUFBRyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksRUFBQztvQkFDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO3dCQUMxQixJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBQzs0QkFDeEQsSUFBRyxPQUFPLFlBQVksaUJBQU8sRUFBQztnQ0FDMUIsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NkJBQ3pEO2lDQUNHO2dDQUNBLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzZCQUNwRDt5QkFDSjtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxLQUFJLENBQUMsTUFBTSxHQUFHLHNCQUFzQixDQUFDO2FBQ3hDO1lBQ0QsS0FBSSxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQzs7UUFDekMsQ0FBQztRQVNELHNCQUFJLHVDQUFjO1lBUGxCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLElBQUksRUFBQztvQkFDbkMsMENBQTBDO29CQUMxQyxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFDO3dCQUN2QixPQUFPLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO3FCQUMzQztvQkFDRCxtRkFBbUY7b0JBQ25GLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakUsSUFBRyxrQkFBa0IsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUM7d0JBQ25ELE9BQU8sZUFBTSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxnQ0FBZ0MsQ0FBRyxDQUFDO3FCQUN0RjtpQkFDSjtnQkFDRCx3Q0FBd0M7Z0JBQ3hDLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDO29CQUNmLE9BQU8sZUFBTSxDQUFDLFNBQVMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO2lCQUNqRTtnQkFDRCxPQUFPLGVBQU0sQ0FBQyxTQUFTLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUNwRSxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNLLDJDQUFxQixHQUE3QixVQUE4QixVQUEwQjtZQUNwRCxLQUFJLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDckMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFHLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFDO29CQUM1QixPQUFPLFNBQVMsQ0FBQztpQkFDcEI7cUJBQ0ksSUFBRyxTQUFTLFlBQVksV0FBVyxFQUFDO29CQUNyQyxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3RFLElBQUcsa0JBQWtCLElBQUksU0FBUyxFQUFDO3dCQUMvQixPQUFPLGtCQUFrQixDQUFDO3FCQUM3QjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQVNELHNCQUFJLHFEQUE0QjtZQVBoQzs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUM7b0JBQ3hCLE9BQU8sZUFBTSxDQUFDLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2lCQUNsRTtxQkFDSSxJQUFHLGVBQWUsSUFBSSxJQUFJLEVBQUM7b0JBQzVCLE9BQU8sZUFBTSxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2lCQUN0RTtnQkFDRCxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUM7OztXQUFBO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssOEJBQVEsR0FBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQTVHRCxDQUFpQyxlQUFNLEdBNEd0QztJQTVHWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbU5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jbU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNtR3JvdXBOb2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY21Hcm91cE5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ21Ob2RlIH0gZnJvbSBcIi4vY21Ob2RlXCI7XHJcbmltcG9ydCB7IENtR3JvdXAgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY21Hcm91cFwiO1xyXG5pbXBvcnQgeyBJQ21Hcm91cCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29uZmlnTWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NtR3JvdXBJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDbUdyb3VwTm9kZSBleHRlbmRzIENtTm9kZSBpbXBsZW1lbnRzIElDbUdyb3VwTm9kZXtcclxuXHJcbiAgICBjaGlsZHM6IElDbU5vZGVbXTtcclxuICAgIGV4cGFuZFN0YXRlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENtR3JvdXBOb2RlXHJcbiAgICAgKiBAcGFyYW0ge0lDbUdyb3VwfSBlbGVtZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgQ21Hcm91cE5vZGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSUNtR3JvdXApe1xyXG4gICAgICAgIHN1cGVyKGVsZW1lbnQpO1xyXG4gICAgICAgIHZhciBjaGlsZENvbmZpZ3VyYXRpb25EYXRhID0gbmV3IEFycmF5PElDbU5vZGU+KCk7XHJcbiAgICAgICAgaWYoZWxlbWVudCBpbnN0YW5jZW9mIENtR3JvdXApe1xyXG4gICAgICAgICAgICBpZihlbGVtZW50LmNoaWxkcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5maWx0ZXIgPT0gbnVsbCB8fCBlbGVtZW50LmZpbHRlci5hY3RpdmUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgQ21Hcm91cCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENvbmZpZ3VyYXRpb25EYXRhLnB1c2gobmV3IENtR3JvdXBOb2RlKGVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRDb25maWd1cmF0aW9uRGF0YS5wdXNoKG5ldyBDbU5vZGUoZWxlbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMgPSBjaGlsZENvbmZpZ3VyYXRpb25EYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoaWxkcyA9IGNoaWxkQ29uZmlndXJhdGlvbkRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIGRlZmluaXRpb24gZm9yIHRoaXMgZ3JvdXBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENtR3JvdXBOb2RlXHJcbiAgICAgKi9cclxuICAgIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmVkaXRNb2RlQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAvLyBTaG93IG1vZGlmaWVkIGljb24gaWYgZ3JvdXAgaXMgbW9kaWZpZWRcclxuICAgICAgICAgICAgaWYodGhpcy5pc01vZGlmaWVkID09IHRydWUpeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE1vZGlmaWVkSWNvbkRlZmluaXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTaG93IGNvbnRhaW5zQ2hhbmdlcyBpY29uIGFsc28gaWYgYSBjaGlsZCBpcyBtb2RpZmllZCBhbmQgdGhlIGdyb3VwIGlzIGNvbGxhcHNlZFxyXG4gICAgICAgICAgICBsZXQgZmlyc3RNb2RpZmllZENoaWxkID0gdGhpcy5nZXRGaXJzdE1vZGlmaWVkQ2hpbGQodGhpcy5jaGlsZHMpO1xyXG4gICAgICAgICAgICBpZihmaXJzdE1vZGlmaWVkQ2hpbGQgIT0gdW5kZWZpbmVkICYmICF0aGlzLmV4cGFuZGVkKCkpeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiBDbU5vZGUuY3JlYXRlRGl2KFwiY29udGFpbnNDaGFuZ2VzSWNvblwiLCBcIkNoaWxkIGNvbnRhaW5zIHBlbmRpbmcgY2hhbmdlc1wiLCApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNob3cgZXhwYW5kZWQgb3IgY29sbGFwc2VkIGdyb3VwIGljb25cclxuICAgICAgICBpZih0aGlzLmV4cGFuZGVkKCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gQ21Ob2RlLmNyZWF0ZURpdihcImUtdHJlZWdyaWQgZS1jbXRyZWVncmlkZXhwYW5kZ3JvdXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDbU5vZGUuY3JlYXRlRGl2KFwiZS10cmVlZ3JpZCBlLWNtdHJlZWdyaWRjb2xsYXBzZWdyb3VwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgd2hlcmUgYSBtb2RpZmljYXRpb24sIHRyYW5zZmVyIGZhaWxlZCBvciBub3QgdHJhbnNmZXJhYmxlIHN0YXRlIGlzIGZvdW5kLCBlbHNlIHVuZGVmaW5lZFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENtR3JvdXBOb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Rmlyc3RNb2RpZmllZENoaWxkKGNoaWxkTm9kZXM6IEFycmF5PElDbU5vZGU+KTogSUNtTm9kZXx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZE5vZGUgPSBjaGlsZE5vZGVzW2ldO1xyXG4gICAgICAgICAgICBpZihjaGlsZE5vZGUuaXNNb2RpZmllZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjaGlsZE5vZGUgaW5zdGFuY2VvZiBDbUdyb3VwTm9kZSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RNb2RpZmllZENoaWxkID0gdGhpcy5nZXRGaXJzdE1vZGlmaWVkQ2hpbGQoY2hpbGROb2RlLmNoaWxkcyk7XHJcbiAgICAgICAgICAgICAgICBpZihmaXJzdE1vZGlmaWVkQ2hpbGQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlyc3RNb2RpZmllZENoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIGRlZmluaXRpb24gZm9yIGNvbGxhcHNlL2V4cGFuZCBpY29uIGZvciB0aGlzIGdyb3Vwbm9kZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDbUdyb3VwTm9kZVxyXG4gICAgICovXHJcbiAgICBnZXQgY29sbGFwc2VFeHBhbmRJY29uRGVmaW5pdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGhhc0NoaWxkUmVjb3JkcyA9IHRoaXMuY2hpbGRzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQoKSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIENtTm9kZS5jcmVhdGVEaXYoXCJlLXRyZWVncmlkZXhwYW5kIGUtY210cmVlZ3JpZGV4cGFuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihoYXNDaGlsZFJlY29yZHMgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBDbU5vZGUuY3JlYXRlRGl2KFwiZS10cmVlZ3JpZGNvbGxhcHNlIGUtY210cmVlZ3JpZGNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHRoaXMgbm9kZSBleHBhbmRlZChvciBjb2xsYXBzZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENtR3JvdXBOb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhwYW5kZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5leHBhbmRTdGF0ZTtcclxuICAgIH1cclxufSJdfQ==
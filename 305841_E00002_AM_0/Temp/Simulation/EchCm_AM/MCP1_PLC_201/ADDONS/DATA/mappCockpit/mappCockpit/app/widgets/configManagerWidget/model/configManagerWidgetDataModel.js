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
define(["require", "exports", "../../../framework/events", "./cmNode", "./cmGroupNode", "../../../models/configManagerDataModel/cmGroup"], function (require, exports, events_1, cmNode_1, cmGroupNode_1, cmGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Declares Event-AppInitialized
    var EventConfigManagerWidgetDataModelChanged = /** @class */ (function (_super) {
        __extends(EventConfigManagerWidgetDataModelChanged, _super);
        function EventConfigManagerWidgetDataModelChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventConfigManagerWidgetDataModelChanged;
    }(events_1.TypedEvent));
    ;
    var ConfigManagerWidgetDataModel = /** @class */ (function () {
        function ConfigManagerWidgetDataModel(dataModel) {
            // Events
            this.eventDataModelChanged = new EventConfigManagerWidgetDataModelChanged();
            /**
             * holds the info if write access is available
             *
             * @private
             * @memberof ConfigManagerWidgetDataModel
             */
            this._writeAccess = false;
            this._dataModel = dataModel;
            this._widgetDataModel = ConfigManagerWidgetDataModel.createWidgetDataModel((dataModel.data));
            this.isTransferPossible = this.isTransferOfModifiedNodesPossible(this._widgetDataModel);
        }
        /**
         * Dispose the configmanagerwidget datamodel
         *
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.dispose = function () {
        };
        Object.defineProperty(ConfigManagerWidgetDataModel.prototype, "writeAccess", {
            /**
             * Returns true if write access is available
             *
             * @type {boolean}
             * @memberof ConfigManagerWidgetDataModel
             */
            get: function () {
                return this._writeAccess;
            },
            /**
             * Activate or deactivate write access
             *
             * @memberof ConfigManagerWidgetDataModel
             */
            set: function (value) {
                this._writeAccess = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the expand states from an other datamodel to this datamodel
         *
         * @param {Array<ICmNode>} dataModel
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.setExpandStates = function (dataModel) {
            this.setExpandStatesForGroups(dataModel, this._widgetDataModel);
        };
        /**
         * Sets the expand states from an array of nodes to an other array of nodes with all child nodes
         *
         * @private
         * @param {Array<ICmNode>} oldGroup
         * @param {Array<ICmNode>} newGroup
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.setExpandStatesForGroups = function (oldGroup, newGroup) {
            for (var i = 0; i < newGroup.length; i++) {
                if (newGroup[i] instanceof cmGroupNode_1.CmGroupNode) {
                    // Set expand state for the group
                    var oldGroupNode = this.getGroup(oldGroup, newGroup[i].displayName);
                    if (oldGroupNode != undefined) {
                        newGroup[i].expandState = oldGroupNode.expandState;
                        // Set expand states for the childs
                        this.setExpandStatesForGroups(oldGroupNode.childs, newGroup[i].childs);
                    }
                }
            }
        };
        /**
         * Returns a group with the given groupId if found, else undefined (not recursive, only top level nodes)
         *
         * @private
         * @param {Array<ICmNode>} dataModel
         * @param {*} groupId
         * @returns {(ICmGroupNode|undefined)}
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.getGroup = function (dataModel, groupId) {
            if (dataModel != undefined) {
                for (var i = 0; i < dataModel.length; i++) {
                    if (dataModel[i] instanceof cmGroupNode_1.CmGroupNode) {
                        if (dataModel[i].displayName == groupId) {
                            return dataModel[i];
                        }
                    }
                }
            }
            return undefined;
        };
        /**
         * Returns the array with the nodes for the ui (widget datamodel)
         *
         * @returns {Array<ICmNode>}
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.getDataModel = function () {
            return this._widgetDataModel;
        };
        /**
         * Sets the value of the given parameter
         *
         * @param {ICmParameter} element
         * @param {string} value
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.setValue = function (element, value) {
            var node = this.getNode(this._widgetDataModel, element);
            if (node != undefined) {
                node.modifiedDisplayValue = value;
            }
            // Update the filter states corresponding to the new value
            this._dataModel.updateFiltersInDataModel();
        };
        /**
         * Returns the cmNode(widget datamodel) of the given cmParameter(datamodel)
         *
         * @private
         * @param {Array<ICmNode>} nodes
         * @param {ICmParameter} element
         * @returns {(ICmNode|undefined)}
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.getNode = function (nodes, element) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node instanceof cmGroupNode_1.CmGroupNode) {
                    var foundNode = this.getNode(node.childs, element);
                    if (foundNode != undefined) {
                        return foundNode;
                    }
                }
                else {
                    if (node.element == element) {
                        return node;
                    }
                }
            }
            return undefined;
        };
        /**
         * Creates the widget datamodel with the given data from the underlying datamodel
         *
         * @private
         * @static
         * @param {ICmGroup[]} dataModel
         * @returns {Array<ICmNode>}
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.createWidgetDataModel = function (dataModel) {
            var nodes = new Array();
            if (dataModel != undefined) {
                dataModel.forEach(function (element) {
                    if (element.filter == null || element.filter.active == false) {
                        nodes.push(ConfigManagerWidgetDataModel.CreateNode(element));
                    }
                });
            }
            return nodes;
        };
        /**
         * Is it possible to transfer the given nodes; false if a modified node was found which one is readonly
         *
         * @private
         * @param {Array<ICmNode>} nodes
         * @returns {boolean}
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.isTransferOfModifiedNodesPossible = function (nodes) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.isModified == true && node.readOnly == true) {
                    return false;
                }
                if (node instanceof cmGroupNode_1.CmGroupNode) {
                    var isTransferPossible = this.isTransferOfModifiedNodesPossible(node.childs);
                    if (isTransferPossible == false) {
                        return false;
                    }
                }
            }
            return true;
        };
        /**
         * Creates a single ui node/groupNode for the given underlying datamodel node
         *
         * @private
         * @static
         * @param {ICmParameter} element
         * @returns {ICmNode}
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.CreateNode = function (element) {
            if (element instanceof cmGroup_1.CmGroup) {
                return new cmGroupNode_1.CmGroupNode(element);
            }
            else {
                return new cmNode_1.CmNode(element);
            }
        };
        /**
         * Applies the modified parameters
         *
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.applyModifiedParameters = function () {
            this._dataModel.applyModifiedParameters();
        };
        /**
         * Discards the changes
         *
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.discard = function () {
            this._dataModel.discardModifications();
        };
        return ConfigManagerWidgetDataModel;
    }());
    exports.ConfigManagerWidgetDataModel = ConfigManagerWidgetDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L21vZGVsL2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVdBLGdDQUFnQztJQUNoQztRQUF1RCw0REFBOEM7UUFBckc7O1FBQXVHLENBQUM7UUFBRCwrQ0FBQztJQUFELENBQUMsQUFBeEcsQ0FBdUQsbUJBQVUsR0FBdUM7SUFBQSxDQUFDO0lBRXpHO1FBdUNJLHNDQUFZLFNBQWtDO1lBckM5QyxTQUFTO1lBQ1QsMEJBQXFCLEdBQUcsSUFBSSx3Q0FBd0MsRUFBRSxDQUFDO1lBb0J2RTs7Ozs7ZUFLRztZQUNLLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1lBV3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyw0QkFBNEIsQ0FBQyxxQkFBcUIsQ0FBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUYsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCw4Q0FBTyxHQUFQO1FBRUEsQ0FBQztRQU9ELHNCQUFXLHFEQUFXO1lBSXRCOzs7OztlQUtHO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDO1lBakJEOzs7O2VBSUc7aUJBQ0gsVUFBdUIsS0FBYztnQkFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDOUIsQ0FBQzs7O1dBQUE7UUFZRDs7Ozs7V0FLRztRQUNILHNEQUFlLEdBQWYsVUFBZ0IsU0FBeUI7WUFDckMs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QkFBTyxFQUFDO2dCQUMxQixPQUFPLElBQUkseUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuQztpQkFDRztnQkFDQSxPQUFPLElBQUksZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSw4REFBdUIsR0FBOUI7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDOUMsQ0FBQztRQUdEOzs7O1dBSUc7UUFDSSw4Q0FBTyxHQUFkO1lBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzNDLENBQUM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUF2UUQsSUF1UUM7SUF2UVksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElDbU5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jbU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ21Ob2RlIH0gZnJvbSBcIi4vY21Ob2RlXCI7XHJcbmltcG9ydCB7IENtR3JvdXBOb2RlIH0gZnJvbSBcIi4vY21Hcm91cE5vZGVcIjtcclxuaW1wb3J0IHsgSUNtR3JvdXAgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jbUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDbVBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29uZmlnTWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NtUGFyYW1ldGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENtR3JvdXAgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY21Hcm91cFwiO1xyXG5pbXBvcnQgeyBJQ21Hcm91cE5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jbUdyb3VwTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5cclxuXHJcbi8vIERlY2xhcmVzIEV2ZW50LUFwcEluaXRpYWxpemVkXHJcbmNsYXNzIEV2ZW50Q29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbENoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwsIG51bGw+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWx7XHJcbiAgICBcclxuICAgIC8vIEV2ZW50c1xyXG4gICAgZXZlbnREYXRhTW9kZWxDaGFuZ2VkID0gbmV3IEV2ZW50Q29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbENoYW5nZWQoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGhvbGRzIHRoZSBhcnJheSB3aXRoIHRoZSBub2RlcyBmb3IgdGhlIHVpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtBcnJheTxJQ21Ob2RlPn1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3dpZGdldERhdGFNb2RlbDogQXJyYXk8SUNtTm9kZT47XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogaG9sZHMgdGhlIHVuZXJseWluZyBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lDb25maWdNYW5hZ2VyRGF0YU1vZGVsfVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGF0YU1vZGVsOiBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGhvbGRzIHRoZSBpbmZvIGlmIHdyaXRlIGFjY2VzcyBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfd3JpdGVBY2Nlc3MgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHRoZSBtb2RpZmllZCBkYXRhIG9mIHRoaXMgZGF0YSBtb2RlbCBjdXJyZW50bHkgdHJhbnNmZXJhYmxlIChubyBtb2RpZmllZCByZWFkb25seSBwYXJhbWV0ZXJzKSBcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1RyYW5zZmVyUG9zc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YU1vZGVsOiBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gZGF0YU1vZGVsO1xyXG4gICAgICAgIHRoaXMuX3dpZGdldERhdGFNb2RlbCA9IENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuY3JlYXRlV2lkZ2V0RGF0YU1vZGVsKDxhbnk+KGRhdGFNb2RlbC5kYXRhKSk7XHJcbiAgICAgICAgdGhpcy5pc1RyYW5zZmVyUG9zc2libGUgPSB0aGlzLmlzVHJhbnNmZXJPZk1vZGlmaWVkTm9kZXNQb3NzaWJsZSh0aGlzLl93aWRnZXREYXRhTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldCBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGUgb3IgZGVhY3RpdmF0ZSB3cml0ZSBhY2Nlc3NcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHdyaXRlQWNjZXNzKHZhbHVlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl93cml0ZUFjY2VzcyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHdyaXRlIGFjY2VzcyBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgd3JpdGVBY2Nlc3MoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVBY2Nlc3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZXhwYW5kIHN0YXRlcyBmcm9tIGFuIG90aGVyIGRhdGFtb2RlbCB0byB0aGlzIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNtTm9kZT59IGRhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgc2V0RXhwYW5kU3RhdGVzKGRhdGFNb2RlbDogQXJyYXk8SUNtTm9kZT4pe1xyXG4gICAgICAgIHRoaXMuc2V0RXhwYW5kU3RhdGVzRm9yR3JvdXBzKGRhdGFNb2RlbCwgdGhpcy5fd2lkZ2V0RGF0YU1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGV4cGFuZCBzdGF0ZXMgZnJvbSBhbiBhcnJheSBvZiBub2RlcyB0byBhbiBvdGhlciBhcnJheSBvZiBub2RlcyB3aXRoIGFsbCBjaGlsZCBub2Rlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDbU5vZGU+fSBvbGRHcm91cFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ21Ob2RlPn0gbmV3R3JvdXBcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0RXhwYW5kU3RhdGVzRm9yR3JvdXBzKG9sZEdyb3VwOiBBcnJheTxJQ21Ob2RlPiwgbmV3R3JvdXA6IEFycmF5PElDbU5vZGU+KXtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IG5ld0dyb3VwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYobmV3R3JvdXBbaV0gaW5zdGFuY2VvZiBDbUdyb3VwTm9kZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZXhwYW5kIHN0YXRlIGZvciB0aGUgZ3JvdXBcclxuICAgICAgICAgICAgICAgIGxldCBvbGRHcm91cE5vZGUgPSB0aGlzLmdldEdyb3VwKG9sZEdyb3VwLCBuZXdHcm91cFtpXS5kaXNwbGF5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZihvbGRHcm91cE5vZGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAoPENtR3JvdXBOb2RlPm5ld0dyb3VwW2ldKS5leHBhbmRTdGF0ZSA9IG9sZEdyb3VwTm9kZS5leHBhbmRTdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZXhwYW5kIHN0YXRlcyBmb3IgdGhlIGNoaWxkc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RXhwYW5kU3RhdGVzRm9yR3JvdXBzKG9sZEdyb3VwTm9kZS5jaGlsZHMsICg8Q21Hcm91cE5vZGU+bmV3R3JvdXBbaV0pLmNoaWxkcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZ3JvdXAgd2l0aCB0aGUgZ2l2ZW4gZ3JvdXBJZCBpZiBmb3VuZCwgZWxzZSB1bmRlZmluZWQgKG5vdCByZWN1cnNpdmUsIG9ubHkgdG9wIGxldmVsIG5vZGVzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDbU5vZGU+fSBkYXRhTW9kZWxcclxuICAgICAqIEBwYXJhbSB7Kn0gZ3JvdXBJZFxyXG4gICAgICogQHJldHVybnMgeyhJQ21Hcm91cE5vZGV8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0R3JvdXAoZGF0YU1vZGVsOiBBcnJheTxJQ21Ob2RlPiwgZ3JvdXBJZCk6IElDbUdyb3VwTm9kZXx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZGF0YU1vZGVsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFNb2RlbFtpXSBpbnN0YW5jZW9mIENtR3JvdXBOb2RlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZigoPENtR3JvdXBOb2RlPmRhdGFNb2RlbFtpXSkuZGlzcGxheU5hbWUgPT0gZ3JvdXBJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPENtR3JvdXBOb2RlPmRhdGFNb2RlbFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhcnJheSB3aXRoIHRoZSBub2RlcyBmb3IgdGhlIHVpICh3aWRnZXQgZGF0YW1vZGVsKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJQ21Ob2RlPn1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGdldERhdGFNb2RlbCgpOiBBcnJheTxJQ21Ob2RlPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0RGF0YU1vZGVsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lDbVBhcmFtZXRlcn0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZShlbGVtZW50OiBJQ21QYXJhbWV0ZXIsIHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXROb2RlKHRoaXMuX3dpZGdldERhdGFNb2RlbCwgZWxlbWVudCk7XHJcbiAgICAgICAgaWYobm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBub2RlLm1vZGlmaWVkRGlzcGxheVZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZmlsdGVyIHN0YXRlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBuZXcgdmFsdWVcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwudXBkYXRlRmlsdGVyc0luRGF0YU1vZGVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjbU5vZGUod2lkZ2V0IGRhdGFtb2RlbCkgb2YgdGhlIGdpdmVuIGNtUGFyYW1ldGVyKGRhdGFtb2RlbClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ21Ob2RlPn0gbm9kZXNcclxuICAgICAqIEBwYXJhbSB7SUNtUGFyYW1ldGVyfSBlbGVtZW50XHJcbiAgICAgKiBAcmV0dXJucyB7KElDbU5vZGV8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Tm9kZShub2RlczogQXJyYXk8SUNtTm9kZT4sIGVsZW1lbnQ6IElDbVBhcmFtZXRlcik6IElDbU5vZGV8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgIG5vZGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlc1tpXTtcclxuICAgICAgICAgICAgaWYobm9kZSBpbnN0YW5jZW9mIENtR3JvdXBOb2RlKXtcclxuICAgICAgICAgICAgICAgIGxldCBmb3VuZE5vZGUgPSB0aGlzLmdldE5vZGUobm9kZS5jaGlsZHMsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYoZm91bmROb2RlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kTm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoKDxhbnk+bm9kZSkuZWxlbWVudCA9PSBlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgZGF0YW1vZGVsIHdpdGggdGhlIGdpdmVuIGRhdGEgZnJvbSB0aGUgdW5kZXJseWluZyBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJQ21Hcm91cFtdfSBkYXRhTW9kZWxcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJQ21Ob2RlPn1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVdpZGdldERhdGFNb2RlbCAoZGF0YU1vZGVsOiBJQ21Hcm91cFtdKSA6IEFycmF5PElDbU5vZGU+e1xyXG4gICAgICAgIHZhciBub2RlcyA9IG5ldyBBcnJheTxJQ21Ob2RlPigpO1xyXG5cclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZGF0YU1vZGVsLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LmZpbHRlciA9PSBudWxsIHx8IGVsZW1lbnQuZmlsdGVyLmFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLkNyZWF0ZU5vZGUoZWxlbWVudCkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyBpdCBwb3NzaWJsZSB0byB0cmFuc2ZlciB0aGUgZ2l2ZW4gbm9kZXM7IGZhbHNlIGlmIGEgbW9kaWZpZWQgbm9kZSB3YXMgZm91bmQgd2hpY2ggb25lIGlzIHJlYWRvbmx5XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNtTm9kZT59IG5vZGVzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNUcmFuc2Zlck9mTW9kaWZpZWROb2Rlc1Bvc3NpYmxlKG5vZGVzOiBBcnJheTxJQ21Ob2RlPik6IGJvb2xlYW57XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZXNbaV07XHJcbiAgICAgICAgICAgIGlmKG5vZGUuaXNNb2RpZmllZCA9PSB0cnVlICYmIG5vZGUucmVhZE9ubHkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobm9kZSBpbnN0YW5jZW9mIENtR3JvdXBOb2RlKXtcclxuICAgICAgICAgICAgICAgIGxldCBpc1RyYW5zZmVyUG9zc2libGUgPSB0aGlzLmlzVHJhbnNmZXJPZk1vZGlmaWVkTm9kZXNQb3NzaWJsZSgobm9kZSBhcyBJQ21Hcm91cE5vZGUpLmNoaWxkcyk7XHJcbiAgICAgICAgICAgICAgICBpZihpc1RyYW5zZmVyUG9zc2libGUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHNpbmdsZSB1aSBub2RlL2dyb3VwTm9kZSBmb3IgdGhlIGdpdmVuIHVuZGVybHlpbmcgZGF0YW1vZGVsIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJQ21QYXJhbWV0ZXJ9IGVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtJQ21Ob2RlfVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ3JlYXRlTm9kZShlbGVtZW50OiBJQ21QYXJhbWV0ZXIpIDogSUNtTm9kZXtcclxuICAgICAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgQ21Hcm91cCl7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ21Hcm91cE5vZGUoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ21Ob2RlKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGxpZXMgdGhlIG1vZGlmaWVkIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBwbHlNb2RpZmllZFBhcmFtZXRlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmFwcGx5TW9kaWZpZWRQYXJhbWV0ZXJzKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzY2FyZHMgdGhlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzY2FyZCgpIHtcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZGlzY2FyZE1vZGlmaWNhdGlvbnMoKTtcclxuICAgIH1cclxufSJdfQ==
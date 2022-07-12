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
define(["require", "exports", "../../../framework/events", "../../../common/persistence/persistDataProvider"], function (require, exports, events_1, persistDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDataChanged = /** @class */ (function (_super) {
        __extends(EventDataChanged, _super);
        function EventDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataChanged;
    }(events_1.TypedEvent));
    ;
    var EventSerieDataChanged = /** @class */ (function (_super) {
        __extends(EventSerieDataChanged, _super);
        function EventSerieDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDataChanged;
    }(events_1.TypedEvent));
    ;
    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["container"] = 0] = "container";
        NodeType[NodeType["series"] = 1] = "series";
        NodeType[NodeType["calculationInputParam"] = 2] = "calculationInputParam";
        NodeType[NodeType["calculationOutputParam"] = 3] = "calculationOutputParam";
        NodeType[NodeType["root"] = 4] = "root";
    })(NodeType = exports.NodeType || (exports.NodeType = {}));
    var SerieNode = /** @class */ (function () {
        /**
         * Creates an instance of SerieNode
         * @param {(string|undefined)} name
         * @param {(BaseSeries|undefined)} [serie=undefined]
         * @memberof SerieNode
         */
        function SerieNode(name, serie) {
            var _this = this;
            if (serie === void 0) { serie = undefined; }
            this.eventDataChanged = new EventDataChanged();
            this.eventSerieDataChanged = new EventSerieDataChanged();
            this._onSerieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            this._color = undefined;
            this._name = name;
            this.canDelete = true;
            this.serie = serie;
        }
        Object.defineProperty(SerieNode.prototype, "validNode", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "nodeType", {
            /**
             * Returns the type of the serieNode
             *
             * @protected
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                return NodeType.series;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "description", {
            /**
             * Returns the description of the serie
             *
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                if (this.serie != undefined) {
                    return this.serie.description;
                }
                return "";
            },
            /**
             * Sets the description of the serie
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this.serie != undefined) {
                    this.serie.description = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "color", {
            /**
             * Returns the color of the serie
             *
             * @type {(string | undefined)}
             * @memberof SerieNode
             */
            get: function () {
                if (this._color != undefined) {
                    return this._color;
                }
                else {
                    if (this.serie != undefined) {
                        return this.serie.color;
                    }
                    else {
                        return undefined;
                    }
                }
            },
            /**
             * Sets the color of the serie
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this._color != undefined) {
                    this._color = value;
                }
                else {
                    if (this.serie != undefined && value != undefined) {
                        this.serie.color = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "name", {
            /**
             * Returns the name or originalname of the serie corresponding to the edit mode
             *
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                if (this._name != undefined) {
                    return this._name;
                }
                else {
                    if (this.serie != undefined) {
                        var dataModel = this.getDataModel();
                        if (dataModel != undefined) {
                            if (dataModel.editModeActive == true && this.serie.originalName != "") {
                                return this.serie.originalName;
                            }
                        }
                        return this.serie.name;
                    }
                    return "";
                }
            },
            /**
             * Sets the name of the serie
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this._name != undefined) {
                    this._name = value;
                }
                else {
                    if (this.serie != undefined) {
                        this.serie.name = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "iconDefinition", {
            /**
             * Returns the icon definition for this serieNode
             *
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                var iconDefinition = "";
                if (this.nodeType == NodeType.container) {
                    iconDefinition = this.getIconDefinitionForContainer();
                }
                else {
                    iconDefinition = this.getIconDefinitionForNode();
                }
                return iconDefinition;
            },
            /**
             * Set icon definiton => not implemented; Setter only needed for use as field for the syncfusion tree grid
             *
             * @memberof SerieNode
             */
            set: function (value) {
                // this._iconDefinition = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the iconDefinition in case of a container node
         *
         * @private
         * @returns
         * @memberof SerieNode
         */
        SerieNode.prototype.getIconDefinitionForContainer = function () {
            var classNames = "e-treegridcollapse treegridcollapse";
            // Add collapse/expand icon 
            if (this.expandState == true) {
                classNames += "e-treegridexpand treegridexpand";
            }
            return "<div class='" + classNames + "'></div>";
        };
        /**
         * Returns the icon definition in case of a node(e.g. input param of calculation, output param of calculation, serie, ...)
         *
         * @private
         * @returns
         * @memberof SerieNode
         */
        SerieNode.prototype.getIconDefinitionForNode = function () {
            var iconDefinition = "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:6px;margin-top:2px'>";
            // Set main icon
            if (this.nodeType == NodeType.series) {
                if (this.serie != undefined) {
                    iconDefinition += this.serie.getIcon();
                }
                else {
                    console.warn("No serie info available for getting icon!");
                }
            }
            else if (this.nodeType == NodeType.calculationOutputParam) {
                iconDefinition += '<img class="treeGridRowIcon" src="../app/widgets/signalManagerWidget/style/images/tree/calculationOutput.svg" />';
                if (this.serie != undefined && !this.serie.rawPointsValid) {
                    // Set exclamation overlay for invalid series
                    var tooltipText = "The data is invalid!"; // Default tooltiptext in case of invalid data
                    var errorText = this.serie.getErrorText();
                    if (errorText != "") {
                        tooltipText = errorText; // Use error info text for tooltip text
                    }
                    iconDefinition += "<img title=\"" + tooltipText + "\" class=\"treeGridRowIcon\" src=\"" + this.serie.getSpecificIcon("exclamationOverlay") + "\" />";
                }
            }
            else if (this.nodeType == NodeType.calculationInputParam) {
                iconDefinition += '<img class="treeGridRowIcon" src="../app/widgets/signalManagerWidget/style/images/tree/calculationInput.svg" />';
            }
            iconDefinition += "</div>";
            return iconDefinition;
        };
        Object.defineProperty(SerieNode.prototype, "parent", {
            /**
             * Returns the parent of this node
             *
             * @type {(ISerieContainer | undefined)}
             * @memberof SerieNode
             */
            get: function () {
                return this._parent;
            },
            /**
             * Sets the parent of this node
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this.serie != undefined) {
                    if (value != undefined) {
                        this.serie.parent = value.getSerieGroup();
                    }
                    else {
                        this.serie.parent = undefined;
                    }
                }
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "serie", {
            /**
             * Returns the serie of this node
             *
             * @type {(BaseSeries | undefined)}
             * @memberof SerieNode
             */
            get: function () {
                return this._serie;
            },
            /**
             * Sets the serie of this node
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (value != this._serie) {
                    if (this._serie != undefined) { // Detach old serie events
                        if (value != undefined) {
                            // update new serie to parent group info
                            value.startTriggerTime = this._serie.startTriggerTime;
                            value.parent = this._serie.parent;
                        }
                        this._serie.eventDataChanged.detach(this._onSerieDataChangedHandler);
                        if (this.nodeType == NodeType.calculationOutputParam || this.nodeType == NodeType.series) {
                            var datamodel = this.getDataModel();
                            if (datamodel != undefined) {
                                if (datamodel.seriesProvider != undefined) {
                                    datamodel.seriesProvider.remove(this._serie.id);
                                }
                            }
                        }
                    }
                    this._serie = value;
                    if (this._serie != undefined) { // Attach new serie events
                        this._serie.eventDataChanged.attach(this._onSerieDataChangedHandler);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "value", {
            /**
             * Returns the value of this node
             *
             * @type {(string|undefined)}
             * @memberof SerieNode
             */
            get: function () {
                if (this._serie != undefined) {
                    if (this._serie.name != this._serie.originalName) { // Only show name(alias) in value column if different to the original name in the name column
                        return this._serie.name;
                    }
                    return "";
                }
                return undefined;
            },
            /**
             * Sets the value of this node
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this._serie != undefined && value != undefined) {
                    if (value == "") { // if empty name => use original name from signal
                        this._serie.resetName();
                    }
                    else {
                        this._serie.name = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Dispose the SerieNode
         *
         * @memberof SerieNode
         */
        SerieNode.prototype.dispose = function () {
            this.disposeSerie();
        };
        /**
         * Dispose the serie of this object
         *
         * @private
         * @memberof SerieNode
         */
        SerieNode.prototype.disposeSerie = function () {
            if (this.serie != undefined) {
                if (this.nodeType == NodeType.calculationOutputParam || this.nodeType == NodeType.series) {
                    // Only dispose serie if this node is the original series and not only a link to a series
                    var datamodel = this.getDataModel();
                    if (datamodel != undefined) {
                        if (datamodel.seriesProvider != undefined) {
                            datamodel.seriesProvider.remove(this.serie.id);
                        }
                    }
                }
            }
        };
        /**
         * Clones the calculated serie
         *
         * @returns
         * @memberof CalculatedSignal
         */
        SerieNode.prototype.clone = function () {
            var serieClone;
            if (this.serie != undefined) {
                serieClone = this.serie.clone();
            }
            // TODO: check clone (name undefined or from data)
            var clonedSerieNode = new SerieNode(undefined, serieClone);
            return clonedSerieNode;
        };
        /**
         * Returns the datamodel of this node
         *
         * @returns {(ISignalManagerDataModel|undefined)}
         * @memberof SerieNode
         */
        SerieNode.prototype.getDataModel = function () {
            var parent = this.parent;
            var lastKnownParent = parent;
            do {
                if (parent != undefined) {
                    lastKnownParent = parent;
                    parent = parent.parent;
                }
            } while (parent != undefined);
            if (lastKnownParent != undefined) {
                if (lastKnownParent.nodeType == NodeType.root) {
                    return lastKnownParent.dataModel;
                }
            }
            return undefined;
        };
        /**
         * Returns the serie group to which this node belongs
         *
         * @returns {(ISerieGroup|undefined)}
         * @memberof SerieNode
         */
        SerieNode.prototype.getSerieGroup = function () {
            if (this.isSerieGroup == true) {
                return this;
            }
            if (this.parent != undefined) {
                if (this.parent.isSerieGroup == true) {
                    return this.parent;
                }
                else {
                    return this.parent.getSerieGroup();
                }
            }
            return undefined;
        };
        /**
         * Raises the data changed event
         *
         * @protected
         * @param {*} sender
         * @param {EventSignalManagerDataChangedArgs} args
         * @memberof SerieNode
         */
        SerieNode.prototype.onDataChanged = function (sender, args) {
            this.eventDataChanged.raise(sender, args);
            if (this.serie != undefined) {
                persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.serie.persistID, this.serie.getSettings());
            }
        };
        /**
         * Raises the serie data cahnged event
         *
         * @protected
         * @param {*} sender
         * @param {EventSerieDataChangedArgs} args
         * @memberof SerieNode
         */
        SerieNode.prototype.onSerieDataChanged = function (sender, args) {
            this.eventSerieDataChanged.raise(sender, args);
        };
        return SerieNode;
    }());
    exports.SerieNode = SerieNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVlBO1FBQStCLG9DQUF5RDtRQUF4Rjs7UUFBMEYsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUEzRixDQUErQixtQkFBVSxHQUFrRDtJQUFBLENBQUM7SUFDNUY7UUFBb0MseUNBQWlEO1FBQXJGOztRQUF1RixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQXhGLENBQW9DLG1CQUFVLEdBQTBDO0lBQUEsQ0FBQztJQUV6RixJQUFZLFFBTVg7SUFORCxXQUFZLFFBQVE7UUFDaEIsaURBQVMsQ0FBQTtRQUNULDJDQUFNLENBQUE7UUFDTix5RUFBcUIsQ0FBQTtRQUNyQiwyRUFBc0IsQ0FBQTtRQUN0Qix1Q0FBSSxDQUFBO0lBQ1IsQ0FBQyxFQU5XLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBTW5CO0lBR0Q7UUEwVEk7Ozs7O1dBS0c7UUFDSCxtQkFBWSxJQUFzQixFQUFFLEtBQXVDO1lBQTNFLGlCQUlDO1lBSm1DLHNCQUFBLEVBQUEsaUJBQXVDO1lBL1QzRSxxQkFBZ0IsR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQzVELDBCQUFxQixHQUEwQixJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFFakUsK0JBQTBCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztZQU12RixXQUFNLEdBQXVCLFNBQVMsQ0FBQztZQXVUM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFD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QVMsRUFBQztnQkFDeEIsSUFBUyxJQUFJLENBQUMsTUFBTyxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7b0JBQ3hDLE9BQU8sSUFBSSxDQUFDLE1BQXFCLENBQUM7aUJBQ3JDO3FCQUNHO29CQUNBLE9BQU8sSUFBSSxDQUFDLE1BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDdkM7YUFDSjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ08saUNBQWEsR0FBdkIsVUFBd0IsTUFBTSxFQUFFLElBQXVDO1lBQ25FLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTFDLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ3ZCLHlDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDcEc7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNPLHNDQUFrQixHQUE1QixVQUE2QixNQUFNLEVBQUUsSUFBK0I7WUFDaEUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQTViRCxJQTRiQztJQTViWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVDb250YWluZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9ldmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgSVNpZ25hbFJvb3QgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL3NpZ25hbFJvb3RJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFQcm92aWRlclwiO1xyXG5cclxuY2xhc3MgRXZlbnREYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNlcmllTm9kZSwgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRTZXJpZURhdGFDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxCYXNlU2VyaWVzLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuXHJcbmV4cG9ydCBlbnVtIE5vZGVUeXBle1xyXG4gICAgY29udGFpbmVyLFxyXG4gICAgc2VyaWVzLFxyXG4gICAgY2FsY3VsYXRpb25JbnB1dFBhcmFtLFxyXG4gICAgY2FsY3VsYXRpb25PdXRwdXRQYXJhbSxcclxuICAgIHJvb3RcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJpZU5vZGUgaW1wbGVtZW50cyBJU2VyaWVOb2Rle1xyXG4gICAgZXZlbnREYXRhQ2hhbmdlZDogRXZlbnREYXRhQ2hhbmdlZCA9IG5ldyBFdmVudERhdGFDaGFuZ2VkKCk7XHJcbiAgICBldmVudFNlcmllRGF0YUNoYW5nZWQ6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZCA9IG5ldyBFdmVudFNlcmllRGF0YUNoYW5nZWQoKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX29uU2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHZhbGlkTm9kZSgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9jb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHNlcmllTm9kZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbm9kZVR5cGUoKTogTm9kZVR5cGUge1xyXG4gICAgICAgIHJldHVybiBOb2RlVHlwZS5zZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5kZXNjcmlwdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgZGVzY3JpcHRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5kZXNjcmlwdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbG9yIG9mIHRoZSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUuY29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2xvciBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkICYmIHZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllLmNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9yIG9yaWdpbmFsbmFtZSBvZiB0aGUgc2VyaWUgY29ycmVzcG9uZGluZyB0byB0aGUgZWRpdCBtb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYodGhpcy5fbmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhTW9kZWwuZWRpdE1vZGVBY3RpdmUgPT0gdHJ1ZSAmJiB0aGlzLnNlcmllLm9yaWdpbmFsTmFtZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUub3JpZ2luYWxOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5fbmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWUubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfcGFyZW50OiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIGRlZmluaXRpb24gZm9yIHRoaXMgc2VyaWVOb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZVR5cGUgPT0gTm9kZVR5cGUuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGljb25EZWZpbml0aW9uID0gdGhpcy5nZXRJY29uRGVmaW5pdGlvbkZvckNvbnRhaW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gPSB0aGlzLmdldEljb25EZWZpbml0aW9uRm9yTm9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaWNvbkRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uRGVmaW5pdGlvbiBpbiBjYXNlIG9mIGEgY29udGFpbmVyIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJY29uRGVmaW5pdGlvbkZvckNvbnRhaW5lcigpe1xyXG4gICAgICAgIGxldCBjbGFzc05hbWVzID0gXCJlLXRyZWVncmlkY29sbGFwc2UgdHJlZWdyaWRjb2xsYXBzZVwiO1xyXG5cclxuICAgICAgICAvLyBBZGQgY29sbGFwc2UvZXhwYW5kIGljb24gXHJcbiAgICAgICAgaWYgKCg8YW55PnRoaXMpLmV4cGFuZFN0YXRlID09IHRydWUpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lcyArPSBcImUtdHJlZWdyaWRleHBhbmQgdHJlZWdyaWRleHBhbmRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPSdgICsgY2xhc3NOYW1lcyArIGAnPjwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIGRlZmluaXRpb24gaW4gY2FzZSBvZiBhIG5vZGUoZS5nLiBpbnB1dCBwYXJhbSBvZiBjYWxjdWxhdGlvbiwgb3V0cHV0IHBhcmFtIG9mIGNhbGN1bGF0aW9uLCBzZXJpZSwgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEljb25EZWZpbml0aW9uRm9yTm9kZSgpe1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IGA8ZGl2IGNsYXNzPSdlLWRvYycgc3R5bGU9J3Bvc2l0aW9uOiByZWxhdGl2ZTtoZWlnaHQ6MTZweDt3aWR0aDozMHB4O21hcmdpbjphdXRvO2Zsb2F0OmxlZnQ7bWFyZ2luLWxlZnQ6NnB4O21hcmdpbi10b3A6MnB4Jz5gO1xyXG5cclxuICAgICAgICAvLyBTZXQgbWFpbiBpY29uXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZVR5cGUgPT0gTm9kZVR5cGUuc2VyaWVzKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGljb25EZWZpbml0aW9uICs9IHRoaXMuc2VyaWUuZ2V0SWNvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJObyBzZXJpZSBpbmZvIGF2YWlsYWJsZSBmb3IgZ2V0dGluZyBpY29uIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLm5vZGVUeXBlID09IE5vZGVUeXBlLmNhbGN1bGF0aW9uT3V0cHV0UGFyYW0pIHtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gJzxpbWcgY2xhc3M9XCJ0cmVlR3JpZFJvd0ljb25cIiBzcmM9XCIuLi9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3N0eWxlL2ltYWdlcy90cmVlL2NhbGN1bGF0aW9uT3V0cHV0LnN2Z1wiIC8+JztcclxuICAgICAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQgJiYgIXRoaXMuc2VyaWUucmF3UG9pbnRzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGV4Y2xhbWF0aW9uIG92ZXJsYXkgZm9yIGludmFsaWQgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcFRleHQgPSBcIlRoZSBkYXRhIGlzIGludmFsaWQhXCI7IC8vIERlZmF1bHQgdG9vbHRpcHRleHQgaW4gY2FzZSBvZiBpbnZhbGlkIGRhdGFcclxuICAgICAgICAgICAgICAgIGxldCBlcnJvclRleHQgPSB0aGlzLnNlcmllLmdldEVycm9yVGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3JUZXh0ICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gZXJyb3JUZXh0OyAvLyBVc2UgZXJyb3IgaW5mbyB0ZXh0IGZvciB0b29sdGlwIHRleHRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8aW1nIHRpdGxlPVwiYCsgdG9vbHRpcFRleHQgK2BcIiBjbGFzcz1cInRyZWVHcmlkUm93SWNvblwiIHNyYz1cImAgKyB0aGlzLnNlcmllLmdldFNwZWNpZmljSWNvbihcImV4Y2xhbWF0aW9uT3ZlcmxheVwiKSArIGBcIiAvPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5ub2RlVHlwZSA9PSBOb2RlVHlwZS5jYWxjdWxhdGlvbklucHV0UGFyYW0pIHtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gJzxpbWcgY2xhc3M9XCJ0cmVlR3JpZFJvd0ljb25cIiBzcmM9XCIuLi9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3N0eWxlL2ltYWdlcy90cmVlL2NhbGN1bGF0aW9uSW5wdXQuc3ZnXCIgLz4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPC9kaXY+YDtcclxuICAgICAgICByZXR1cm4gaWNvbkRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgaWNvbiBkZWZpbml0b24gPT4gbm90IGltcGxlbWVudGVkOyBTZXR0ZXIgb25seSBuZWVkZWQgZm9yIHVzZSBhcyBmaWVsZCBmb3IgdGhlIHN5bmNmdXNpb24gdHJlZSBncmlkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGljb25EZWZpbml0aW9uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgIC8vIHRoaXMuX2ljb25EZWZpbml0aW9uID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJlbnQgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwYXJlbnQgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHBhcmVudCh2YWx1ZTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih2YWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZS5wYXJlbnQgPSB2YWx1ZS5nZXRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWUucGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjYW5EZWxldGU6IGJvb2xlYW47XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBfc2VyaWU6IEJhc2VTZXJpZXMgfCB1bmRlZmluZWQ7XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSBvZiB0aGlzIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KEJhc2VTZXJpZXMgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNlcmllKCk6IEJhc2VTZXJpZXMgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZXJpZSBvZiB0aGlzIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgc2VyaWUodmFsdWU6IEJhc2VTZXJpZXMgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZih2YWx1ZSAhPSB0aGlzLl9zZXJpZSl7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlcmllICE9IHVuZGVmaW5lZCl7IC8vIERldGFjaCBvbGQgc2VyaWUgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBuZXcgc2VyaWUgdG8gcGFyZW50IGdyb3VwIGluZm9cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zdGFydFRyaWdnZXJUaW1lID0gdGhpcy5fc2VyaWUuc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wYXJlbnQgPSB0aGlzLl9zZXJpZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZS5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9vblNlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlVHlwZSA9PSBOb2RlVHlwZS5jYWxjdWxhdGlvbk91dHB1dFBhcmFtIHx8IHRoaXMubm9kZVR5cGUgPT0gTm9kZVR5cGUuc2VyaWVzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YW1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhbW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YW1vZGVsLnNlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhbW9kZWwuc2VyaWVzUHJvdmlkZXIucmVtb3ZlKHRoaXMuX3NlcmllLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fc2VyaWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWUgIT0gdW5kZWZpbmVkKXsgLy8gQXR0YWNoIG5ldyBzZXJpZSBldmVudHNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmllLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmd8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZih0aGlzLl9zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zZXJpZS5uYW1lICE9IHRoaXMuX3NlcmllLm9yaWdpbmFsTmFtZSl7IC8vIE9ubHkgc2hvdyBuYW1lKGFsaWFzKSBpbiB2YWx1ZSBjb2x1bW4gaWYgZGlmZmVyZW50IHRvIHRoZSBvcmlnaW5hbCBuYW1lIGluIHRoZSBuYW1lIGNvbHVtblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYodGhpcy5fc2VyaWUgIT0gdW5kZWZpbmVkICYmIHZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09IFwiXCIpeyAvLyBpZiBlbXB0eSBuYW1lID0+IHVzZSBvcmlnaW5hbCBuYW1lIGZyb20gc2lnbmFsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZS5yZXNldE5hbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VyaWUubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZXJpZU5vZGVcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3x1bmRlZmluZWQpfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0geyhCYXNlU2VyaWVzfHVuZGVmaW5lZCl9IFtzZXJpZT11bmRlZmluZWRdXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZ3x1bmRlZmluZWQsIHNlcmllOiBCYXNlU2VyaWVzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jYW5EZWxldGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VyaWUgPSBzZXJpZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIFNlcmllTm9kZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZVNlcmllKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBzZXJpZSBvZiB0aGlzIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlzcG9zZVNlcmllKCl7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGVUeXBlID09IE5vZGVUeXBlLmNhbGN1bGF0aW9uT3V0cHV0UGFyYW0gfHwgdGhpcy5ub2RlVHlwZSA9PSBOb2RlVHlwZS5zZXJpZXMpe1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSBkaXNwb3NlIHNlcmllIGlmIHRoaXMgbm9kZSBpcyB0aGUgb3JpZ2luYWwgc2VyaWVzIGFuZCBub3Qgb25seSBhIGxpbmsgdG8gYSBzZXJpZXNcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhbW9kZWwgPSB0aGlzLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YW1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YW1vZGVsLnNlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFtb2RlbC5zZXJpZXNQcm92aWRlci5yZW1vdmUodGhpcy5zZXJpZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoZSBjYWxjdWxhdGVkIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVkU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGNsb25lKCk6IElTZXJpZU5vZGV7XHJcbiAgICAgICAgbGV0IHNlcmllQ2xvbmU7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZXJpZUNsb25lID0gdGhpcy5zZXJpZS5jbG9uZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBUT0RPOiBjaGVjayBjbG9uZSAobmFtZSB1bmRlZmluZWQgb3IgZnJvbSBkYXRhKVxyXG4gICAgICAgIGxldCBjbG9uZWRTZXJpZU5vZGUgPSBuZXcgU2VyaWVOb2RlKHVuZGVmaW5lZCwgc2VyaWVDbG9uZSk7XHJcbiAgICAgICAgcmV0dXJuIGNsb25lZFNlcmllTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGFtb2RlbCBvZiB0aGlzIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIGdldERhdGFNb2RlbCgpOiBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbHx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHBhcmVudDogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZCA9IHRoaXMucGFyZW50O1xyXG4gICAgICAgIGxldCBsYXN0S25vd25QYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgZG97XHJcbiAgICAgICAgICAgIGlmKHBhcmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGFzdEtub3duUGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH13aGlsZShwYXJlbnQgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGlmKGxhc3RLbm93blBhcmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihsYXN0S25vd25QYXJlbnQubm9kZVR5cGUgPT0gTm9kZVR5cGUucm9vdCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGxhc3RLbm93blBhcmVudCBhcyBJU2lnbmFsUm9vdCkuZGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSBncm91cCB0byB3aGljaCB0aGlzIG5vZGUgYmVsb25nc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoSVNlcmllR3JvdXB8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWVHcm91cCgpOklTZXJpZUdyb3VwfHVuZGVmaW5lZHtcclxuICAgICAgICBpZigoPGFueT50aGlzKS5pc1NlcmllR3JvdXAgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55PnRoaXMgYXMgSVNlcmllR3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKCg8YW55PnRoaXMucGFyZW50KS5pc1NlcmllR3JvdXAgPT0gdHJ1ZSApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50IGFzIElTZXJpZUdyb3VwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQhLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIGRhdGEgY2hhbmdlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25EYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3M6IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhQ2hhbmdlZC5yYWlzZShzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHRoaXMuc2VyaWUhLnBlcnNpc3RJRCwgdGhpcy5zZXJpZS5nZXRTZXR0aW5ncygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIHNlcmllIGRhdGEgY2FobmdlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3M6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmV2ZW50U2VyaWVEYXRhQ2hhbmdlZC5yYWlzZShzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
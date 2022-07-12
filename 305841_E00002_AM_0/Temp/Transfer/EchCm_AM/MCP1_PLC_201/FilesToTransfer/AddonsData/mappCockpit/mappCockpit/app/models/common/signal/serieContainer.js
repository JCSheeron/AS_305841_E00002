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
define(["require", "exports", "../../signalManagerDataModel/eventSignalManagerDataChangedArgs", "./serieNode"], function (require, exports, eventSignalManagerDataChangedArgs_1, serieNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieContainer = /** @class */ (function (_super) {
        __extends(SerieContainer, _super);
        /**
         * Creates an instance of SerieContainer
         * @param {string} name
         * @param {string} [id=""]
         * @param {boolean} [expandState=true]
         * @memberof SerieContainer
         */
        function SerieContainer(name, id, expandState) {
            if (id === void 0) { id = ""; }
            if (expandState === void 0) { expandState = true; }
            var _this = _super.call(this, name, undefined) || this;
            _this._serieDataChangedHandler = function (sender, args) { return _this.onDataChanged(sender, args); };
            _this._serieContainerDataChangedHandler = function (sender, args) { return _this.onDataChanged(sender, args); };
            _this._name = name;
            _this.id = id;
            _this.expandState = expandState;
            _this.childs = new Array();
            // Removing of the container is possible by default
            _this.canDelete = true;
            return _this;
        }
        Object.defineProperty(SerieContainer.prototype, "visibleChilds", {
            get: function () {
                return this.childs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieContainer.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (value) {
                var _this = this;
                this._parent = value;
                // Also set parent to child containers
                this.childs.forEach(function (child) {
                    child.parent = _this;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieContainer.prototype, "color", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieContainer.prototype, "name", {
            get: function () {
                if (this._name != undefined) {
                    return this._name;
                }
                else {
                    return "";
                }
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieContainer.prototype, "nodeType", {
            get: function () {
                return serieNode_1.NodeType.container;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Dispose the SerieContainer
         *
         * @memberof SerieContainer
         */
        SerieContainer.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * Removes all serieNodes and serieContainers from this container
         *
         * @memberof SerieContainer
         */
        SerieContainer.prototype.clear = function () {
            for (var i = 0; i < this.childs.length; i++) {
                var child = this.childs[i];
                if (child instanceof SerieContainer) {
                    // Remove all childs of this container
                    child.clear();
                    if (child.canDelete == true) {
                        // remove container if deletable
                        this.removeSerieContainer(child);
                        i--;
                    }
                }
                else {
                    this.removeSerieNode(child);
                    i--;
                }
            }
        };
        /**
         * Returns all childs of this container
         *
         * @returns {Array<ISerieNode>}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getChilds = function () {
            return this.childs;
        };
        /**
         * Clones this SerieContainer
         *
         * @returns {ISerieNode}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.clone = function () {
            return new SerieContainer(this.name, this.id, this.expandState);
        };
        /**
         * Adds a serie node to this serie container
         *
         * @param {ISerieNode} serieNode
         * @param {number} [index=-1]
         * @memberof SerieContainer
         */
        SerieContainer.prototype.addSerieNode = function (serieNode, index) {
            if (index === void 0) { index = -1; }
            if (index == -1 || index >= this.childs.length) {
                this.childs.push(serieNode);
            }
            else {
                this.childs.splice(index, 0, serieNode);
            }
            serieNode.parent = this;
            serieNode.eventDataChanged.attach(this._serieDataChangedHandler);
            this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.add, serieNode));
        };
        /**
         * Removes a serie node from this serie container
         *
         * @param {ISerieNode} serieNode
         * @memberof SerieContainer
         */
        SerieContainer.prototype.removeSerieNode = function (serieNode) {
            var index = this.childs.indexOf(serieNode, 0);
            if (index > -1) {
                serieNode.eventDataChanged.detach(this._serieDataChangedHandler);
                // Remove references to this serie node if available
                this.removeReferences(serieNode);
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.remove, serieNode));
                serieNode.dispose();
                serieNode.parent = undefined;
                this.childs.splice(index, 1);
            }
            else {
                // serie not found => look in sub containers
                for (var i = 0; i < this.childs.length; i++) {
                    if (this.childs[i] instanceof SerieContainer) {
                        this.childs[i].removeSerieNode(serieNode);
                    }
                }
            }
        };
        SerieContainer.prototype.removeReferences = function (serieNode) {
            // serie node is no input data so remove all references to the serie in this serie node
            var serieGroup = serieNode.getSerieGroup();
            if (serieGroup != undefined) {
                serieGroup.removeReferencesToSerieNode(serieNode);
            }
        };
        /**
         * Returns the serieNode with the given seriename
         *
         * @param {string} serieName
         * @returns {(ISerieNode|undefined)}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getSerieNode = function (serieName) {
            var serieNodes = this.getSerieNodes();
            for (var i = 0; i < serieNodes.length; i++) {
                var nodeName = serieNodes[i].name;
                var serie = serieNodes[i].serie;
                if (serie != undefined) {
                    nodeName = serie.name;
                }
                if (nodeName == serieName) {
                    return serieNodes[i];
                }
            }
            return undefined;
        };
        /**
         * Returns all series nodes within the container or sub container
         *
         * @param {string} [serieName=""]
         * @returns {Array<ISerieNode>}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getSerieNodes = function (serieName) {
            if (serieName === void 0) { serieName = ""; }
            var serieNodes = new Array();
            for (var i = 0; i < this.childs.length; i++) {
                var child = this.childs[i];
                if (child.serie != undefined) {
                    if (serieName == "" || child.serie.name == serieName) {
                        serieNodes.push(child);
                    }
                }
                else if (child instanceof SerieContainer) {
                    serieNodes = serieNodes.concat(child.getSerieNodes(serieName));
                }
            }
            return serieNodes;
        };
        /**
         * Returns all series within the container or sub container
         *
         * @returns {Array<BaseSeries>}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getSeries = function () {
            var serieNodes = this.getSerieNodes();
            var series = new Array();
            for (var i = 0; i < serieNodes.length; i++) {
                var serie = serieNodes[i].serie;
                if (serie != undefined) {
                    series.push(serie);
                }
            }
            return series;
        };
        /**
         * Adds a serie container to this serie container
         *
         * @param {ISerieContainer} serieContainer
         * @param {number} [index=-1]  -1 to add at the end, else the index where to add
         * @memberof SerieContainer
         */
        SerieContainer.prototype.addSerieContainer = function (serieContainer, index) {
            if (index === void 0) { index = -1; }
            if (index == -1 || index >= this.childs.length) {
                this.childs.push(serieContainer);
            }
            else {
                this.childs.splice(index, 0, serieContainer);
            }
            serieContainer.parent = this;
            serieContainer.eventDataChanged.attach(this._serieContainerDataChangedHandler);
            this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.add, serieContainer));
        };
        /**
          * Removes a serie container from this container
          *
          * @param {ISerieContainer} serieContainer
          * @memberof SerieContainer
          */
        SerieContainer.prototype.removeSerieContainer = function (serieContainer) {
            var index = this.childs.indexOf(serieContainer, 0);
            if (index > -1) {
                serieContainer.eventDataChanged.detach(this._serieContainerDataChangedHandler);
                this.childs.splice(index, 1);
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.remove, serieContainer));
            }
            else {
                // container not found => look in sub containers
                for (var i = 0; i < this.childs.length; i++) {
                    if (this.childs[i] instanceof SerieContainer) {
                        this.childs[i].removeSerieContainer(serieContainer);
                    }
                }
            }
        };
        /**
         * Returns the serie container with the given id if found, else undefined
         *
         * @param {string} serieContainerId
         * @returns {(ISerieContainer|undefined)}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getSerieContainerById = function (serieContainerId) {
            for (var i = 0; i < this.childs.length; i++) {
                var node = this.childs[i];
                if (node instanceof SerieContainer) {
                    if (node.id == serieContainerId) {
                        return node;
                    }
                    var serieContainer = node.getSerieContainerById(serieContainerId);
                    if (serieContainer != undefined) {
                        return serieContainer;
                    }
                }
            }
            return undefined;
        };
        return SerieContainer;
    }(serieNode_1.SerieNode));
    exports.SerieContainer = SerieContainer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQUFvQyxrQ0FBUztRQStDekM7Ozs7OztXQU1HO1FBQ0gsd0JBQVksSUFBWSxFQUFFLEVBQWMsRUFBRSxXQUEyQjtZQUEzQyxtQkFBQSxFQUFBLE9BQWM7WUFBRSw0QkFBQSxFQUFBLGtCQUEyQjtZQUFyRSxZQUNJLGtCQUFNLElBQUksRUFBRSxTQUFTLENBQUMsU0FPekI7WUF6RE8sOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDOUUsdUNBQWlDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFrRDNGLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2IsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQ3RDLG1EQUFtRDtZQUNuRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7UUFDMUIsQ0FBQztRQXRERCxzQkFBVyx5Q0FBYTtpQkFBeEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7OztXQUFBO1FBS0Qsc0JBQVcsa0NBQU07aUJBQWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO2lC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LEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDckMsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBRyxJQUFJLFlBQVksY0FBYyxFQUFDO29CQUM5QixJQUFHLElBQUksQ0FBQyxFQUFFLElBQUksZ0JBQWdCLEVBQUM7d0JBQzNCLE9BQU8sSUFBSSxDQUFDO3FCQUNmO29CQUNELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNsRSxJQUFHLGNBQWMsSUFBSSxTQUFTLEVBQUM7d0JBQzNCLE9BQU8sY0FBYyxDQUFDO3FCQUN6QjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQWhURCxDQUFvQyxxQkFBUyxHQWdUNUM7SUFoVFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVOb2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MsIFNpZ25hbE1hbmFnZXJBY3Rpb24gfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9ldmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgU2VyaWVOb2RlLCBOb2RlVHlwZSB9IGZyb20gXCIuL3NlcmllTm9kZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmllQ29udGFpbmVyIGV4dGVuZHMgU2VyaWVOb2RlIGltcGxlbWVudHMgSVNlcmllQ29udGFpbmVye1xyXG4gICAgXHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBwcm90ZWN0ZWQgY2hpbGRzOiBJU2VyaWVOb2RlW107XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuICAgIHByaXZhdGUgX3NlcmllQ29udGFpbmVyRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkRhdGFDaGFuZ2VkKHNlbmRlciwgYXJncyk7XHJcblxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlQ2hpbGRzKCk6IElTZXJpZU5vZGVbXXx1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcztcclxuICAgIH1cclxuXHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgZXhwYW5kU3RhdGU6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgICAgIC8vIEFsc28gc2V0IHBhcmVudCB0byBjaGlsZCBjb250YWluZXJzXHJcbiAgICAgICAgdGhpcy5jaGlsZHMuZm9yRWFjaCgoY2hpbGQpPT57XHJcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmd8dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYodGhpcy5fbmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5vZGVUeXBlKCk6IE5vZGVUeXBle1xyXG4gICAgICAgIHJldHVybiBOb2RlVHlwZS5jb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpZD1cIlwiXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZXhwYW5kU3RhdGU9dHJ1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGlkOnN0cmluZyA9IFwiXCIsIGV4cGFuZFN0YXRlOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5leHBhbmRTdGF0ZSA9IGV4cGFuZFN0YXRlO1xyXG4gICAgICAgIHRoaXMuY2hpbGRzID0gbmV3IEFycmF5PElTZXJpZU5vZGU+KCk7XHJcbiAgICAgICAgLy8gUmVtb3Zpbmcgb2YgdGhlIGNvbnRhaW5lciBpcyBwb3NzaWJsZSBieSBkZWZhdWx0XHJcbiAgICAgICAgdGhpcy5jYW5EZWxldGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgU2VyaWVDb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIHNlcmllTm9kZXMgYW5kIHNlcmllQ29udGFpbmVycyBmcm9tIHRoaXMgY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGNsZWFyKCl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgIGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgY2hpbGRzIG9mIHRoaXMgY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQuY2FuRGVsZXRlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjb250YWluZXIgaWYgZGVsZXRhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZXJpZUNvbnRhaW5lcihjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlcmllTm9kZShjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBjaGlsZHMgb2YgdGhpcyBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVNlcmllTm9kZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgZ2V0Q2hpbGRzKCk6IEFycmF5PElTZXJpZU5vZGU+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGlzIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lTZXJpZU5vZGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogSVNlcmllTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTZXJpZUNvbnRhaW5lcih0aGlzLm5hbWUsIHRoaXMuaWQsIHRoaXMuZXhwYW5kU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNlcmllIG5vZGUgdG8gdGhpcyBzZXJpZSBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZU5vZGV9IHNlcmllTm9kZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpbmRleD0tMV1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBhZGRTZXJpZU5vZGUoc2VyaWVOb2RlOiBJU2VyaWVOb2RlLCBpbmRleDogbnVtYmVyID0tMSl7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gLTEgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMucHVzaChzZXJpZU5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5zcGxpY2UoaW5kZXgsIDAsIHNlcmllTm9kZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VyaWVOb2RlLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgc2VyaWVOb2RlLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgbmV3IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyhTaWduYWxNYW5hZ2VyQWN0aW9uLmFkZCwgc2VyaWVOb2RlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHNlcmllIG5vZGUgZnJvbSB0aGlzIHNlcmllIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNlcmllTm9kZX0gc2VyaWVOb2RlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNoaWxkcy5pbmRleE9mKHNlcmllTm9kZSwgMCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgc2VyaWVOb2RlLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSByZWZlcmVuY2VzIHRvIHRoaXMgc2VyaWUgbm9kZSBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVSZWZlcmVuY2VzKHNlcmllTm9kZSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi5yZW1vdmUsIHNlcmllTm9kZSkpO1xyXG4gICAgICAgICAgICBzZXJpZU5vZGUuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgc2VyaWVOb2RlLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIHNlcmllIG5vdCBmb3VuZCA9PiBsb29rIGluIHN1YiBjb250YWluZXJzXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHNbaV0gaW5zdGFuY2VvZiBTZXJpZUNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuY2hpbGRzW2ldIGFzIElTZXJpZUNvbnRhaW5lcikucmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVSZWZlcmVuY2VzKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcbiAgICAgICAgLy8gc2VyaWUgbm9kZSBpcyBubyBpbnB1dCBkYXRhIHNvIHJlbW92ZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgc2VyaWUgaW4gdGhpcyBzZXJpZSBub2RlXHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSBzZXJpZU5vZGUuZ2V0U2VyaWVHcm91cCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKHNlcmllR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgc2VyaWVHcm91cC5yZW1vdmVSZWZlcmVuY2VzVG9TZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2VyaWVOb2RlIHdpdGggdGhlIGdpdmVuIHNlcmllbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZXJpZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHsoSVNlcmllTm9kZXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGdldFNlcmllTm9kZShzZXJpZU5hbWU6IHN0cmluZyk6IElTZXJpZU5vZGV8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBzZXJpZU5vZGVzID0gdGhpcy5nZXRTZXJpZU5vZGVzKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZXJpZU5vZGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGVOYW1lID0gc2VyaWVOb2Rlc1tpXS5uYW1lO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWUgPSBzZXJpZU5vZGVzW2ldLnNlcmllO1xyXG4gICAgICAgICAgICBpZihzZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbm9kZU5hbWUgPSBzZXJpZS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG5vZGVOYW1lID09IHNlcmllTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWVOb2Rlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgc2VyaWVzIG5vZGVzIHdpdGhpbiB0aGUgY29udGFpbmVyIG9yIHN1YiBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlcmllTmFtZT1cIlwiXVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElTZXJpZU5vZGU+fVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGdldFNlcmllTm9kZXMoc2VyaWVOYW1lOiBzdHJpbmcgPSBcIlwiKTogQXJyYXk8SVNlcmllTm9kZT57XHJcbiAgICAgICAgbGV0IHNlcmllTm9kZXMgPSBuZXcgQXJyYXk8SVNlcmllTm9kZT4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKGNoaWxkLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZU5hbWUgPT0gXCJcIiB8fCBjaGlsZC5zZXJpZSEubmFtZSA9PSBzZXJpZU5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllTm9kZXMucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjaGlsZCBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICAgICAgICAgIHNlcmllTm9kZXMgPSBzZXJpZU5vZGVzLmNvbmNhdChjaGlsZC5nZXRTZXJpZU5vZGVzKHNlcmllTmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZU5vZGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgc2VyaWVzIHdpdGhpbiB0aGUgY29udGFpbmVyIG9yIHN1YiBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8QmFzZVNlcmllcz59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWVzKCk6IEFycmF5PEJhc2VTZXJpZXM+e1xyXG4gICAgICAgIGxldCBzZXJpZU5vZGVzID0gdGhpcy5nZXRTZXJpZU5vZGVzKCk7XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VyaWVOb2Rlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZSA9IHNlcmllTm9kZXNbaV0uc2VyaWU7XHJcbiAgICAgICAgICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNlcmllIGNvbnRhaW5lciB0byB0aGlzIHNlcmllIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBzZXJpZUNvbnRhaW5lclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpbmRleD0tMV0gIC0xIHRvIGFkZCBhdCB0aGUgZW5kLCBlbHNlIHRoZSBpbmRleCB3aGVyZSB0byBhZGRcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBhZGRTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyLCBpbmRleDogbnVtYmVyID0tMSl7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gLTEgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMucHVzaChzZXJpZUNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRzLnNwbGljZShpbmRleCwgMCwgc2VyaWVDb250YWluZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcmllQ29udGFpbmVyLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgc2VyaWVDb250YWluZXIuZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fc2VyaWVDb250YWluZXJEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24uYWRkLCBzZXJpZUNvbnRhaW5lcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIFJlbW92ZXMgYSBzZXJpZSBjb250YWluZXIgZnJvbSB0aGlzIGNvbnRhaW5lclxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IHNlcmllQ29udGFpbmVyXHJcbiAgICAgICogQG1lbWJlcm9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgICovXHJcbiAgICAgcmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVDb250YWluZXI6IElTZXJpZUNvbnRhaW5lcil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNoaWxkcy5pbmRleE9mKHNlcmllQ29udGFpbmVyLCAwKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBzZXJpZUNvbnRhaW5lci5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9zZXJpZUNvbnRhaW5lckRhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24ucmVtb3ZlLCBzZXJpZUNvbnRhaW5lcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBjb250YWluZXIgbm90IGZvdW5kID0+IGxvb2sgaW4gc3ViIGNvbnRhaW5lcnNcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5jaGlsZHNbaV0gYXMgSVNlcmllQ29udGFpbmVyKS5yZW1vdmVTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSBjb250YWluZXIgd2l0aCB0aGUgZ2l2ZW4gaWQgaWYgZm91bmQsIGVsc2UgdW5kZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlcmllQ29udGFpbmVySWRcclxuICAgICAqIEByZXR1cm5zIHsoSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWVDb250YWluZXJCeUlkKHNlcmllQ29udGFpbmVySWQ6IHN0cmluZyk6IElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBhbnkgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYobm9kZSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICAgICAgICAgIGlmKG5vZGUuaWQgPT0gc2VyaWVDb250YWluZXJJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVDb250YWluZXIgPSBub2RlLmdldFNlcmllQ29udGFpbmVyQnlJZChzZXJpZUNvbnRhaW5lcklkKTtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllQ29udGFpbmVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcmllQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn0gIl19
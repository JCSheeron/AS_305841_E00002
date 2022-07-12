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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "./componentDefaultDefinition", "../common/treeGridWidgetBase", "../toolsOverviewWidget/toolsOverviewWidget"], function (require, exports, componentDefaultDefinition_1, treeGridWidgetBase_1, toolsOverviewWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    import { FileReader } from "../../common/utilities/binFileReader";
    import * as KaitaiStream from "../../libs/dataparsing/kaitai-struct/kaitaiStream";
    import * as NwctBinParser from "../../libs/dataparsing/NwctBinParser";*/
    /**
     * implements the dummy widget
     *
     * @class DummyWidget
     * @extends {WidgetBase}
     */
    var DummyWidget = /** @class */ (function (_super) {
        __extends(DummyWidget, _super);
        function DummyWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Event handlers
            _this._contentActivatedHandler = function (sender, args) { return _this.onLayoutContentActivated(sender, args); };
            return _this;
            /**
             * resizes the trace configuration widget
             *
             * @param {number} width
             * @param {number} height
             * @memberof TraceConfigurationWidget
             */
            /*resize(width: number, height: number){
                this._actualWidth = width;
                this._actualHeight = height;
                
                if(this._layoutWidget != undefined){
                    this._layoutWidget!.resize(width, height);
                }
            }*/
            /**
             * Creates the widget content and eventually subwidgets
             *
             * @param {string} layoutContainerId
             * @memberof DummyWidget
             */
            /*createLayout() {
                this.createDummyData();
            }
        
            resize(width: number, height: number){
        
                this._mainDiv[0].style.width = width.toString() + "px";
                this._mainDiv[0].style.height = height.toString() + "px";
            }
        
            private createDummyData() {
        
                this._mainDiv.append("Dummy widget");
                this._mainDiv[0].style.background = ColorHelper.getColor();
                this._mainDiv[0].style.overflow = "hidden";
            }*/
        }
        DummyWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof DummyWidget
         */
        DummyWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.getNwctData();
            /*
            this._layoutWidget = this.component.getSubComponent(ComponentDefaultDefinition.mainWidgetId);
    
            this._layoutWidget!.initialize("");
            this._layoutWidget!.eventWidgetActivated.attach(this._contentActivatedHandler);
            this._layoutWidget.addToParentContainer(this.mainDiv);*/
        };
        DummyWidget.prototype.getNwctData = function () {
            return toolsOverviewWidget_1.ToolsOverviewWidget.nwctBinParser;
        };
        /**
         * Disposes the dummy widget
         *
         * @returns {*}
         * @memberof DummyWidget
         */
        DummyWidget.prototype.dispose = function () {
            /* this._layoutWidget!.eventWidgetActivated.detach(this._contentActivatedHandler);
             this._layoutWidget!.dispose();*/
            _super.prototype.dispose.call(this);
        };
        DummyWidget.prototype.getDataSource = function () {
            var _this = this;
            var dataSource = new Array();
            var data = this.getNwctData();
            data.dataRecords.forEach(function (dataRecord) {
                var ncObjectType = "";
                var channelIndex = "";
                if (dataRecord.ncObjectType == 1) {
                    ncObjectType = "ncAXIS";
                    channelIndex = (dataRecord.channelIndex + 1);
                }
                else if (dataRecord.ncObjectType == 3) {
                    ncObjectType = "ncMODULE";
                    channelIndex = (dataRecord.channelIndex + 1);
                }
                var nodeNumber = "";
                var networkType = "";
                data.configRecord.forEach(function (configRecord) {
                    if (configRecord.configurationRecordId == dataRecord.configRecordId) {
                        nodeNumber = configRecord.nodeNumberOfDrive;
                        if (configRecord.networkType == 254) {
                            networkType = "NCMAN";
                            nodeNumber = "";
                        }
                        else if (configRecord.networkType == 1) {
                            networkType = "PLK[0]";
                        }
                        else {
                            networkType = configRecord.networkType;
                        }
                    }
                });
                var parDatValue = "";
                if (dataRecord.acoposParameterData != undefined && dataRecord.acoposParameterData.parDat.value != undefined) {
                    parDatValue = " = " + dataRecord.acoposParameterData.parDat.value;
                }
                var type = "req";
                var record = _this.getRecord(dataRecord.index, networkType, nodeNumber, ncObjectType + " " + channelIndex, dataRecord.acoposParameterData.parId + parDatValue, dataRecord.timeInSeconds, type);
                dataSource.push(record);
            });
            return dataSource;
        };
        DummyWidget.prototype.getRecord = function (index, interfaceName, node, ncObject, description, time, type) {
            if (type == "res") {
                return { resIndex: index, interface: interfaceName, node: node, ncObject: ncObject, res: description, resTime: time };
            }
            else {
                return { reqIndex: index, interface: interfaceName, node: node, ncObject: ncObject, req: description, reqTime: time };
            }
        };
        DummyWidget.prototype.createTreeGrid = function () {
            var dataSource = this.getDataSource();
            $(this.mainDiv).ejTreeGrid(__assign(__assign({}, this.getTreeGridColumnDefinition()), { dataSource: dataSource, editSettings: { allowDeleting: false } }));
        };
        DummyWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "reqIndex", headerText: "Index", width: "40" },
                    { field: "interface", headerText: "Interface", width: "40" },
                    { field: "node", headerText: "Node", width: "40" },
                    { field: "ncObject", headerText: "NC Object", width: "100" },
                    { field: "req", headerText: "Request", width: "200" },
                    { field: "reqTime", headerText: "Time [s]", width: "100" },
                    { field: "resTime", headerText: "Time [s]", width: "100" },
                    { field: "res", headerText: "Response", width: "200" },
                    { field: "resIndex", headerText: "Index", width: "100" },
                ],
            };
        };
        /**
         * Raised after a layout content was activated
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof DummyWidget
         */
        DummyWidget.prototype.onLayoutContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return DummyWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.DummyWidget = DummyWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXlXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvZHVtbXlXaWRnZXQvZHVtbXlXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs0RUFHd0U7SUFHeEU7Ozs7O09BS0c7SUFDSDtRQUEwQiwrQkFBa0I7UUFBNUM7WUFBQSxxRUE4S0M7WUE1S0csaUJBQWlCO1lBQ1QsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQzs7WUFxSWpHOzs7Ozs7ZUFNRztZQUNIOzs7Ozs7O2VBT0c7WUFFSDs7Ozs7ZUFLRztZQUNIOzs7Ozs7Ozs7Ozs7Ozs7ZUFlRztRQUNQLENBQUM7UUF6S0cseUNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGlDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkI7Ozs7O29FQUt3RDtRQUM1RCxDQUFDO1FBRUQsaUNBQVcsR0FBWDtZQUNHLE9BQU8seUNBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzVDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDZCQUFPLEdBQVA7WUFDRzs2Q0FDaUM7WUFDaEMsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVPLG1DQUFhLEdBQXJCO1lBQUEsaUJBd0NDO1lBdkNHLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7WUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxD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YUFDSixDQUFDO1FBQ04sQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw4Q0FBd0IsR0FBaEMsVUFBaUMsTUFBTSxFQUFFLElBQUk7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUF3Q0wsa0JBQUM7SUFBRCxDQUFDLEFBOUtELENBQTBCLHVDQUFrQixHQThLM0M7SUFFUSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJRHVtbXlXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2R1bW15V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbi8vaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgTGF5b3V0V2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBUb29sc092ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4uL3Rvb2xzT3ZlcnZpZXdXaWRnZXQvdG9vbHNPdmVydmlld1dpZGdldFwiO1xyXG4vKlxyXG5pbXBvcnQgeyBGaWxlUmVhZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsaXRpZXMvYmluRmlsZVJlYWRlclwiO1xyXG5pbXBvcnQgKiBhcyBLYWl0YWlTdHJlYW0gZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcva2FpdGFpLXN0cnVjdC9rYWl0YWlTdHJlYW1cIjtcclxuaW1wb3J0ICogYXMgTndjdEJpblBhcnNlciBmcm9tIFwiLi4vLi4vbGlicy9kYXRhcGFyc2luZy9Od2N0QmluUGFyc2VyXCI7Ki9cclxuXHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgZHVtbXkgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBEdW1teVdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIER1bW15V2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSUR1bW15V2lkZ2V0IHtcclxuXHJcbiAgICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gICAgcHJpdmF0ZSBfY29udGVudEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uTGF5b3V0Q29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCkge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TndjdERhdGEoKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5tYWluV2lkZ2V0SWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmluaXRpYWxpemUoXCJcIik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fY29udGVudEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcih0aGlzLm1haW5EaXYpOyovXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TndjdERhdGEoKTogYW55e1xyXG4gICAgICAgcmV0dXJuIFRvb2xzT3ZlcnZpZXdXaWRnZXQubndjdEJpblBhcnNlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBkdW1teSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAvKiB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9jb250ZW50QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7Ki9cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXRhU291cmNlKCl7XHJcbiAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXROd2N0RGF0YSgpO1xyXG4gICAgICAgIGRhdGEuZGF0YVJlY29yZHMuZm9yRWFjaChkYXRhUmVjb3JkID0+IHtcclxuICAgICAgICAgICAgbGV0IG5jT2JqZWN0VHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBjaGFubmVsSW5kZXggPSBcIlwiO1xyXG4gICAgICAgICAgICBpZihkYXRhUmVjb3JkLm5jT2JqZWN0VHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIG5jT2JqZWN0VHlwZSA9IFwibmNBWElTXCI7XHJcbiAgICAgICAgICAgICAgICBjaGFubmVsSW5kZXggPSAoZGF0YVJlY29yZC5jaGFubmVsSW5kZXgrMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihkYXRhUmVjb3JkLm5jT2JqZWN0VHlwZSA9PSAzKXtcclxuICAgICAgICAgICAgICAgIG5jT2JqZWN0VHlwZSA9IFwibmNNT0RVTEVcIjtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWxJbmRleCA9IChkYXRhUmVjb3JkLmNoYW5uZWxJbmRleCsxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZU51bWJlciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGRhdGEuY29uZmlnUmVjb3JkLmZvckVhY2goY29uZmlnUmVjb3JkID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpZ1JlY29yZC5jb25maWd1cmF0aW9uUmVjb3JkSWQgPT0gZGF0YVJlY29yZC5jb25maWdSZWNvcmRJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU51bWJlciA9IGNvbmZpZ1JlY29yZC5ub2RlTnVtYmVyT2ZEcml2ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25maWdSZWNvcmQubmV0d29ya1R5cGUgPT0gMjU0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya1R5cGUgPSBcIk5DTUFOXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVOdW1iZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGNvbmZpZ1JlY29yZC5uZXR3b3JrVHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya1R5cGUgPSBcIlBMS1swXVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya1R5cGUgPSBjb25maWdSZWNvcmQubmV0d29ya1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IHBhckRhdFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgaWYoZGF0YVJlY29yZC5hY29wb3NQYXJhbWV0ZXJEYXRhICE9IHVuZGVmaW5lZCAmJiBkYXRhUmVjb3JkLmFjb3Bvc1BhcmFtZXRlckRhdGEucGFyRGF0LnZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwYXJEYXRWYWx1ZSA9IFwiID0gXCIgKyBkYXRhUmVjb3JkLmFjb3Bvc1BhcmFtZXRlckRhdGEucGFyRGF0LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gXCJyZXFcIjtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuZ2V0UmVjb3JkKGRhdGFSZWNvcmQuaW5kZXgsIG5ldHdvcmtUeXBlLCBub2RlTnVtYmVyLCBuY09iamVjdFR5cGUgKyBcIiBcIiArIGNoYW5uZWxJbmRleCwgZGF0YVJlY29yZC5hY29wb3NQYXJhbWV0ZXJEYXRhLnBhcklkICsgcGFyRGF0VmFsdWUsIGRhdGFSZWNvcmQudGltZUluU2Vjb25kcywgdHlwZSk7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2UucHVzaChyZWNvcmQpO1xyXG4gICAgICAgIH0pOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGFTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZWNvcmQoaW5kZXgsIGludGVyZmFjZU5hbWUsIG5vZGUsIG5jT2JqZWN0LCBkZXNjcmlwdGlvbiwgdGltZSwgdHlwZSl7XHJcblxyXG4gICAgICAgIGlmKHR5cGUgPT0gXCJyZXNcIil7XHJcbiAgICAgICAgICAgIHJldHVybiB7cmVzSW5kZXg6IGluZGV4LCBpbnRlcmZhY2U6IGludGVyZmFjZU5hbWUsIG5vZGU6IG5vZGUsIG5jT2JqZWN0OiBuY09iamVjdCwgcmVzOiBkZXNjcmlwdGlvbiwgcmVzVGltZTogdGltZX07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7cmVxSW5kZXg6IGluZGV4LCBpbnRlcmZhY2U6IGludGVyZmFjZU5hbWUsIG5vZGU6IG5vZGUsIG5jT2JqZWN0OiBuY09iamVjdCwgcmVxOiBkZXNjcmlwdGlvbiwgcmVxVGltZTogdGltZX07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuXHJcblxyXG4gICAgICAgIHZhciBkYXRhU291cmNlID0gdGhpcy5nZXREYXRhU291cmNlKCk7XHJcblxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IGRhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0RlbGV0aW5nIDogZmFsc2UgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlcUluZGV4XCIsIGhlYWRlclRleHQ6IFwiSW5kZXhcIiwgd2lkdGg6IFwiNDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImludGVyZmFjZVwiLCBoZWFkZXJUZXh0OiBcIkludGVyZmFjZVwiLCB3aWR0aDogXCI0MFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwibm9kZVwiLCBoZWFkZXJUZXh0OiBcIk5vZGVcIiwgd2lkdGg6IFwiNDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5jT2JqZWN0XCIsIGhlYWRlclRleHQ6IFwiTkMgT2JqZWN0XCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVxXCIsIGhlYWRlclRleHQ6IFwiUmVxdWVzdFwiLCB3aWR0aDogXCIyMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlcVRpbWVcIiwgaGVhZGVyVGV4dDogXCJUaW1lIFtzXVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlc1RpbWVcIiwgaGVhZGVyVGV4dDogXCJUaW1lIFtzXVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlc1wiLCBoZWFkZXJUZXh0OiBcIlJlc3BvbnNlXCIsIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVzSW5kZXhcIiwgaGVhZGVyVGV4dDogXCJJbmRleFwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCBhZnRlciBhIGxheW91dCBjb250ZW50IHdhcyBhY3RpdmF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25MYXlvdXRDb250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogcmVzaXplcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgLypyZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICAvKmNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUR1bW15RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVEdW1teURhdGEoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5EaXYuYXBwZW5kKFwiRHVtbXkgd2lkZ2V0XCIpO1xyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUuYmFja2dyb3VuZCA9IENvbG9ySGVscGVyLmdldENvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fbWFpbkRpdlswXS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9Ki9cclxufVxyXG5cclxuZXhwb3J0IHsgRHVtbXlXaWRnZXQgfTsiXX0=
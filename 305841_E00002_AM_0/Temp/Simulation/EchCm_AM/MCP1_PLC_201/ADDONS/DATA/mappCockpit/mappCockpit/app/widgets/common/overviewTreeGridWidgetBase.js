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
define(["require", "exports", "./treeGridWidgetBase"], function (require, exports, treeGridWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OverviewTreeGridWidgetBase = /** @class */ (function (_super) {
        __extends(OverviewTreeGridWidgetBase, _super);
        function OverviewTreeGridWidgetBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.defineHeaderHeight = function () {
            return 30;
        };
        OverviewTreeGridWidgetBase.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, this.getHeaderText());
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 100);
        };
        /**
         * creates the tree grid for the items overview
         *
         * @protected
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridColumnSorting()), { recordDoubleClick: function (args) { return _this.doubleClick(args); }, queryCellInfo: function (args) {
                    if (args.column.field == "commandButtons") {
                        _this.addCommandButtons(args);
                    }
                } }));
        };
        /**
         * Loads the styles for the overview treegrid widget base
         *
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            this.addStyle("widgets/common/style/css/overviewCommandButtonStyle.css");
            this.addStyle("widgets/common/style/css/iconComponentViewStyle.css");
            this.addStyle("widgets/common/style/css/iconTraceConfigurationViewStyle.css");
            this.addStyle("widgets/common/style/css/iconTraceViewStyle.css");
            this.addStyle("widgets/common/style/css/iconLoggerViewStyle.css");
        };
        OverviewTreeGridWidgetBase.prototype.addCommandButtons = function (args) {
            args.cellElement.innerHTML = "";
            var cellRowIndex = args.data.index;
            var commandIds = this.getCommandIdsFromItem(args.data.item);
            // Add divs for the buttons
            for (var index = 0; index < commandIds.length; index++) {
                var commandId = commandIds[index];
                var uniqueId = this.getUniqueButtonId(commandId, cellRowIndex);
                args.cellElement.innerHTML += "<div id='" + uniqueId + "' ></div>   ";
            }
            ;
            // Create ejButtons within the divs (after all divs were inserted in the innerHTML, otherwise problems occur)
            for (var index = 0; index < commandIds.length; index++) {
                var commandId = commandIds[index];
                var uniqueId = this.getUniqueButtonId(commandId, cellRowIndex);
                this.createButton(uniqueId, commandId, args.data.item);
            }
            ;
        };
        OverviewTreeGridWidgetBase.prototype.createButton = function (uniqueId, commandId, item) {
            var _this = this;
            var imageClass = this.getIconForCommandId(commandId) + "-Overview";
            var buttonObj = $(this.mainDiv).find("#" + uniqueId);
            buttonObj.ejButton({
                text: this.getNameForCommandId(commandId),
                contentType: ej.ContentType.TextAndImage,
                cssClass: "overviewCommandButton " + imageClass,
                prefixIcon: "e-icon",
                click: function (clickArgs) { return _this.click(item, commandId); },
            });
        };
        OverviewTreeGridWidgetBase.prototype.getUniqueButtonId = function (commandId, cellRowIndex) {
            return "overviewCommandButton" + commandId + cellRowIndex;
        };
        OverviewTreeGridWidgetBase.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        OverviewTreeGridWidgetBase.prototype.getTreeGridColumnSorting = function () {
            return {
                allowSorting: false,
            };
        };
        return OverviewTreeGridWidgetBase;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.OverviewTreeGridWidgetBase = OverviewTreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBO1FBQWtELDhDQUFrQjtRQUFwRTs7UUF3SEEsQ0FBQztRQXRIRzs7Ozs7V0FLRztRQUNILHVEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELGdEQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixpQkFBTSxnQkFBZ0IsWUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUU3Qyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNPLG1EQUFjLEdBQXhCO1lBQUEsaUJBYUM7WUFaRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUseUNBQ25CLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUNsQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsR0FDckMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEtBRWxDLGlCQUFpQixFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsRUFDbkQsYUFBYSxFQUFFLFVBQUMsSUFBSTtvQkFDaEIsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxnQkFBZ0IsRUFBQzt3QkFDckMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNoQztnQkFDTCxDQUFDLElBQ0gsQ0FBQztRQUNQLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gs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QixDQUFDLFlBQVksRUFBRTtnQkFDckYsYUFBYSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsaUJBQU0sbUJBQW1CLGFBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXZELENBQXVEO2FBQ25GLENBQUM7UUFDTixDQUFDO1FBRVMsNkRBQXdCLEdBQWxDO1lBQ0ksT0FBTztnQkFDSCxZQUFZLEVBQUUsS0FBSzthQUN0QixDQUFDO1FBQ04sQ0FBQztRQWFMLGlDQUFDO0lBQUQsQ0FBQyxBQXhIRCxDQUFrRCx1Q0FBa0IsR0F3SG5FO0lBRU8sZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZSBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZXtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudCh0aGlzLmdldEhlYWRlclRleHQoKSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMSwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGl0ZW1zIG92ZXJ2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHsgXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uU29ydGluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVjb3JkRG91YmxlQ2xpY2s6IChhcmdzKSA9PiB0aGlzLmRvdWJsZUNsaWNrKGFyZ3MpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJjb21tYW5kQnV0dG9uc1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvbW1hbmRCdXR0b25zKGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIG92ZXJ2aWV3IHRyZWVncmlkIHdpZGdldCBiYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5sb2FkU3R5bGVzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy9vdmVydmlld0NvbW1hbmRCdXR0b25TdHlsZS5jc3NcIik7XHJcbiAgICAgICAgdGhpcy5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy9pY29uQ29tcG9uZW50Vmlld1N0eWxlLmNzc1wiKTtcclxuICAgICAgICB0aGlzLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2ljb25UcmFjZUNvbmZpZ3VyYXRpb25WaWV3U3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvaWNvblRyYWNlVmlld1N0eWxlLmNzc1wiKTtcclxuICAgICAgICB0aGlzLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2ljb25Mb2dnZXJWaWV3U3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuXHRwcml2YXRlIGFkZENvbW1hbmRCdXR0b25zKGFyZ3Mpe1xyXG4gICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgXHJcbiAgICAgICAgdmFyIGNlbGxSb3dJbmRleCA9IGFyZ3MuZGF0YS5pbmRleDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29tbWFuZElkcyA9IHRoaXMuZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGFyZ3MuZGF0YS5pdGVtKTtcclxuICAgICAgICAvLyBBZGQgZGl2cyBmb3IgdGhlIGJ1dHRvbnNcclxuICAgICAgICBmb3IobGV0IGluZGV4PTA7IGluZGV4IDwgY29tbWFuZElkcy5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBsZXQgY29tbWFuZElkID0gY29tbWFuZElkc1tpbmRleF07XHJcbiAgICAgICAgICAgIGxldCB1bmlxdWVJZCA9IHRoaXMuZ2V0VW5pcXVlQnV0dG9uSWQoY29tbWFuZElkLCBjZWxsUm93SW5kZXgpO1xyXG4gICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmlubmVySFRNTCArPSBcIjxkaXYgaWQ9J1wiICsgdW5pcXVlSWQgKyBcIicgPjwvZGl2PiAgIFwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBlakJ1dHRvbnMgd2l0aGluIHRoZSBkaXZzIChhZnRlciBhbGwgZGl2cyB3ZXJlIGluc2VydGVkIGluIHRoZSBpbm5lckhUTUwsIG90aGVyd2lzZSBwcm9ibGVtcyBvY2N1cilcclxuICAgICAgICBmb3IobGV0IGluZGV4PTA7IGluZGV4IDwgY29tbWFuZElkcy5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBsZXQgY29tbWFuZElkID0gY29tbWFuZElkc1tpbmRleF07XHJcbiAgICAgICAgICAgIGxldCB1bmlxdWVJZCA9IHRoaXMuZ2V0VW5pcXVlQnV0dG9uSWQoY29tbWFuZElkLCBjZWxsUm93SW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih1bmlxdWVJZCwgY29tbWFuZElkLCBhcmdzLmRhdGEuaXRlbSlcclxuICAgICAgICB9O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjcmVhdGVCdXR0b24odW5pcXVlSWQsIGNvbW1hbmRJZDogc3RyaW5nLCBpdGVtKXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1hZ2VDbGFzczogc3RyaW5nID0gdGhpcy5nZXRJY29uRm9yQ29tbWFuZElkKGNvbW1hbmRJZCkgKyBcIi1PdmVydmlld1wiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBidXR0b25PYmogPSAkKHRoaXMubWFpbkRpdikuZmluZChcIiNcIiArIHVuaXF1ZUlkKTtcclxuICAgICAgICBidXR0b25PYmouZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiB0aGlzLmdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkKSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRBbmRJbWFnZSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwib3ZlcnZpZXdDb21tYW5kQnV0dG9uIFwiICsgaW1hZ2VDbGFzcyxcclxuICAgICAgICAgICAgcHJlZml4SWNvbjogXCJlLWljb25cIiAsLy9TcGVjaWZpZXMgdGhlIHByaW1hcnkgaWNvbiBmb3IgQnV0dG9uXHJcbiAgICAgICAgICAgIGNsaWNrOiAoY2xpY2tBcmdzKSA9PiB0aGlzLmNsaWNrKGl0ZW0sIGNvbW1hbmRJZCksXHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5cdFx0XHJcblx0cHJpdmF0ZSBnZXRVbmlxdWVCdXR0b25JZChjb21tYW5kSWQ6IHN0cmluZywgY2VsbFJvd0luZGV4KTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIm92ZXJ2aWV3Q29tbWFuZEJ1dHRvblwiICsgY29tbWFuZElkICsgY2VsbFJvd0luZGV4O1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4geyAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZENvbHVtblNvcnRpbmcoKToge317XHJcbiAgICAgICAgcmV0dXJuIHsgICAgICAgIFxyXG4gICAgICAgICAgICBhbGxvd1NvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZztcclxuXHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fTtcclxuXHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldEljb25Gb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRDb21tYW5kSWRzRnJvbUl0ZW0oaXRlbSk6IEFycmF5PHN0cmluZz47XHJcblx0XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGNsaWNrKGl0ZW0sIGNvbW1hbmRJZCk7XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGRvdWJsZUNsaWNrKGFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQge092ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlfTsiXX0=
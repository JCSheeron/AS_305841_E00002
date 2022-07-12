define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dropDownMenuBase = /** @class */ (function () {
        function dropDownMenuBase(widgetDiv, toolbarButtonId) {
            this._buttonsId = [];
            this.isOpened = false;
            this._widgetDiv = widgetDiv;
            this.toolbarButtonId = toolbarButtonId;
        }
        Object.defineProperty(dropDownMenuBase.prototype, "buttonsId", {
            get: function () {
                return this._buttonsId;
            },
            set: function (value) {
                this._buttonsId = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates dropdown menu
         *
         * @protected
         * @memberof SignalManagerExportDropDownMenu
         */
        dropDownMenuBase.prototype.createDropDownMenu = function (width, leftPos, buttonsId) {
            this.dropDownMenu = $('<div style="height:120px;width:' + width + ';background-color:transparent;position:absolute; top: 63px; left: ' + leftPos + '"></div>');
            for (var i = 0; i < buttonsId.length; i++) {
                this.dropDownMenu.append('<button id=' + buttonsId[i] + '/>');
            }
            this.appendDropDownMenu();
        };
        /**
         * Append the html element and add eventListeners
         *
         * @private
         * @memberof dropDownMenuBase
         */
        dropDownMenuBase.prototype.appendDropDownMenu = function () {
            $(this._widgetDiv).append(this.dropDownMenu[0]);
            this.removeEventListenerForDropDownMenu = this.removeEventListenerForDropDownMenu.bind(this);
            document.addEventListener('mousedown', this.removeEventListenerForDropDownMenu);
        };
        /**
         * Remove event listener when 'mousedown' is triggered
         *
         * @private
         * @param {*} e
         * @memberof dropDownMenuBase
         */
        dropDownMenuBase.prototype.removeEventListenerForDropDownMenu = function (e) {
            if (!this._buttonsId.includes(e.target.id) &&
                !['#' + e.target.parentElement.id, '#' + e.target.id].includes(this._widgetDiv.id + '_' + this.toolbarButtonId)) {
                this.hideDropDownMenu();
            }
        };
        /**
         * Hide the dropdown menu
         *
         * @memberof dropDownMenuBase
         */
        dropDownMenuBase.prototype.hideDropDownMenu = function () {
            document.removeEventListener('mousedown', this.removeEventListenerForDropDownMenu);
            this.dropDownMenu.remove();
            this.isOpened = false;
        };
        return dropDownMenuBase;
    }());
    exports.dropDownMenuBase = dropDownMenuBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcERvd25NZW51QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vZHJvcERvd25NZW51QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQVNJLDBCQUFZLFNBQXlCLEVBQUUsZUFBdUI7WUFOcEQsZUFBVSxHQUFrQixFQUFFLENBQUM7WUFHbEMsYUFBUSxHQUFZLEtBQUssQ0FBQztZQUk3QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUMzQyxDQUFDO1FBRUQsc0JBQVcsdUNBQVM7aUJBQXBCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO2lCQUVELFVBQXNCLEtBQUs7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7OztXQUpBO1FBTUQ7Ozs7O1dBS0c7UUFDTyw2Q0FBa0IsR0FBNUIsVUFBNkIsS0FBYSxFQUFFLE9BQWUsRUFBRSxTQUF3QjtZQUNqRixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxpQ0FBaUMsR0FBRyxLQUFLLEdBQUcsb0VBQW9FLEdBQUcsT0FBTyxHQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlKLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO2FBQ2hFO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssNkNBQWtCLEdBQTFCO1lBQ0ksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxrQ0FBa0MsR0FBRyxJQUFJLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDZEQUFrQyxHQUExQyxVQUE0QyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2pILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO1FBQ0wsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSwyQ0FBZ0IsR0FBdkI7WUFDSSxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQXhFRCxJQXdFQztJQXhFWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgZHJvcERvd25NZW51QmFzZXtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF93aWRnZXREaXY6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIF9idXR0b25zSWQ6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHByb3RlY3RlZCB0b29sYmFyQnV0dG9uSWQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgaXNPcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBkcm9wRG93bk1lbnUhOiBKUXVlcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0RGl2OiBIVE1MRGl2RWxlbWVudCwgdG9vbGJhckJ1dHRvbklkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3dpZGdldERpdiA9IHdpZGdldERpdjtcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25JZCA9IHRvb2xiYXJCdXR0b25JZDsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBidXR0b25zSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbnNJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGJ1dHRvbnNJZCAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9idXR0b25zSWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgZHJvcGRvd24gbWVudVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRXhwb3J0RHJvcERvd25NZW51XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVEcm9wRG93bk1lbnUod2lkdGg6IHN0cmluZywgbGVmdFBvczogc3RyaW5nLCBidXR0b25zSWQ6IEFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIHRoaXMuZHJvcERvd25NZW51ID0gJCgnPGRpdiBzdHlsZT1cImhlaWdodDoxMjBweDt3aWR0aDonICsgd2lkdGggKyAnO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7cG9zaXRpb246YWJzb2x1dGU7IHRvcDogNjNweDsgbGVmdDogJyArIGxlZnRQb3MgKydcIj48L2Rpdj4nKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1dHRvbnNJZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyb3BEb3duTWVudS5hcHBlbmQoJzxidXR0b24gaWQ9JyArIGJ1dHRvbnNJZFtpXSArICcvPicpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXBwZW5kRHJvcERvd25NZW51KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmQgdGhlIGh0bWwgZWxlbWVudCBhbmQgYWRkIGV2ZW50TGlzdGVuZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBkcm9wRG93bk1lbnVCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXBwZW5kRHJvcERvd25NZW51KCkge1xyXG4gICAgICAgICQodGhpcy5fd2lkZ2V0RGl2KS5hcHBlbmQodGhpcy5kcm9wRG93bk1lbnVbMF0pO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lckZvckRyb3BEb3duTWVudSA9IHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lckZvckRyb3BEb3duTWVudS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lckZvckRyb3BEb3duTWVudSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXIgd2hlbiAnbW91c2Vkb3duJyBpcyB0cmlnZ2VyZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlXHJcbiAgICAgKiBAbWVtYmVyb2YgZHJvcERvd25NZW51QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZUV2ZW50TGlzdGVuZXJGb3JEcm9wRG93bk1lbnUgKGUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2J1dHRvbnNJZC5pbmNsdWRlcyhlLnRhcmdldC5pZCkgJiYgXHJcbiAgICAgICAgICAgICFbJyMnICsgZS50YXJnZXQucGFyZW50RWxlbWVudC5pZCwgJyMnICsgZS50YXJnZXQuaWRdLmluY2x1ZGVzKHRoaXMuX3dpZGdldERpdi5pZCArICdfJyArIHRoaXMudG9vbGJhckJ1dHRvbklkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVEcm9wRG93bk1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlIHRoZSBkcm9wZG93biBtZW51XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGRyb3BEb3duTWVudUJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVEcm9wRG93bk1lbnUoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyRm9yRHJvcERvd25NZW51KTtcclxuICAgICAgICB0aGlzLmRyb3BEb3duTWVudS5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=
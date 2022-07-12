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
define(["require", "exports", "../../common/treeGridToolbarBase", "../interfaces/cursorInfoWidgetInterface", "../../../common/directoryProvider"], function (require, exports, treeGridToolbarBase_1, cursorInfoWidgetInterface_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorInfoTreeGridToolbar = /** @class */ (function (_super) {
        __extends(CursorInfoTreeGridToolbar, _super);
        /**
         * Creates an instance of CursorInfoTreeGridToolbar.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof CursorInfoTreeGridToolbar
         */
        function CursorInfoTreeGridToolbar(widgetMainDiv) {
            var _this = _super.call(this, widgetMainDiv) || this;
            _this._toolbarIdCursor1 = "Cursor1";
            _this._toolbarToolTipCursor1 = "Selects the first cursor";
            _this._toolbarIdCursor2 = "Cursor2";
            _this._toolbarToolTipCursor2 = "Selects the second cursor";
            //private readonly _toolbarIdMoveExtendedLeft ="MoveExtendedLeft";
            //private readonly _toolbarToolTipMoveExtendedLeft ="Moves the selected cursor to the left(extended)";
            _this._toolbarIdMoveLeft = "MoveLeft";
            _this._toolbarToolTipMoveLeft = "Moves the selected cursor to the left";
            _this._toolbarIdMoveRight = "MoveRight";
            _this._toolbarToolTipMoveRight = "Moves the selected cursor to the right";
            //private readonly _toolbarIdMoveExtendedRight ="MoveExtendedRight";
            //private readonly _toolbarToolTipMoveExtendedRight ="Moves the selected cursor to the right(extended)";
            _this._toolbarIdCursorInfoSelector = "ToogleFilter";
            _this._toolbarToolTipCursorInfoSelector = "Choose cursor informations for the selected signals";
            _this._selectedCursorIndex = -1;
            _this.cursorInfoSelectionIsActive = false;
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "cursorInfoWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdCursor1, _this._toolbarToolTipCursor1, imageDirectory + "cursor1.svg");
            _this.addToolbarButton(_this._toolbarIdCursor2, _this._toolbarToolTipCursor2, imageDirectory + "cursor2.svg");
            //this.addToolbarButton(this._toolbarIdMoveExtendedLeft, this._toolbarToolTipMoveExtendedLeft, imageDirectory + "moveExtendedLeft.svg");
            _this.addToolbarButton(_this._toolbarIdMoveLeft, _this._toolbarToolTipMoveLeft, imageDirectory + "moveLeft.svg");
            _this.addToolbarButton(_this._toolbarIdMoveRight, _this._toolbarToolTipMoveRight, imageDirectory + "moveRight.svg");
            //this.addToolbarButton(this._toolbarIdMoveExtendedRight, this._toolbarToolTipMoveExtendedRight, imageDirectory + "moveExtendedRight.svg");
            _this.addCollapseButton();
            _this.addExpandButton();
            _this.addToolbarButton(_this._toolbarIdCursorInfoSelector, _this._toolbarToolTipCursorInfoSelector, imageDirectory + "toggleVisibility.svg", treeGridToolbarBase_1.ToolbarButtonAlignment.Right);
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {ICursorInfoWidget} widget
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.toolbarClick = function (args, widget) {
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdCursor1) {
                widget.onReferenceCursorSelected(0);
                args.cancel = true;
            }
            else if (clickedToolbarId == this._toolbarIdCursor2) {
                widget.onReferenceCursorSelected(1);
                args.cancel = true;
            }
            /*else if (clickedToolbarId == this._toolbarIdMoveExtendedLeft) {
                widget.onMoveCursor(this._selectedCursorIndex, CursorAction.moveLeftExtended);
                args.cancel = true;
            }*/
            else if (clickedToolbarId == this._toolbarIdMoveLeft) {
                widget.onMoveCursor(this._selectedCursorIndex, cursorInfoWidgetInterface_1.CursorMovement.Left);
                args.cancel = true;
            }
            else if (clickedToolbarId == this._toolbarIdMoveRight) {
                widget.onMoveCursor(this._selectedCursorIndex, cursorInfoWidgetInterface_1.CursorMovement.Right);
                args.cancel = true;
            }
            /*else if (clickedToolbarId == this._toolbarIdMoveExtendedRight) {
                widget.onMoveCursor(this._selectedCursorIndex, CursorAction.moveRightExtended);
                args.cancel = true;
            }*/
            else if (clickedToolbarId == this._toolbarIdCursorInfoSelector) {
                widget.activateCursorInfoSelectorView(!this.cursorInfoSelectionIsActive);
                args.cancel = true;
            }
        };
        /**
         * Shows the correct toolbar buttons for the current view
         *
         * @param {boolean} activate
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.activateCursorInfoSelectorView = function (activate) {
            this.cursorInfoSelectionIsActive = activate;
            this.activateButton(this._toolbarIdCursorInfoSelector, activate);
            this.hideButton(this._toolbarIdCursor1, activate);
            this.hideButton(this._toolbarIdCursor2, activate);
            this.hideButton(this._toolbarIdMoveLeft, activate);
            this.hideButton(this._toolbarIdMoveRight, activate);
            this.hideCollapseButton(activate);
            this.hideExpandButton(activate);
        };
        /**
         * Initializes the toolbar stats
         *
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.initToolbarStates = function () {
            _super.prototype.initToolbarStates.call(this);
            // Disable buttons at startup
            this.disableButton(this._toolbarIdMoveLeft, true);
            this.disableButton(this._toolbarIdMoveRight, true);
            this.disableButton(this._toolbarIdCursorInfoSelector, true);
        };
        /**
         * Disables the button for the activation of the cursor info selector view
         *
         * @param {boolean} disable
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.disableCursorInfoSelectorButton = function (disable) {
            this.disableButton(this._toolbarIdCursorInfoSelector, disable);
        };
        /**
         * Updates the toolbar buttons (enable only if a cursor is defined)
         *
         * @param {CursorStates} cursorStates
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.updateButtonStates = function (cursorStates) {
            // Set selected cursor index
            var selectedCursorIndex = cursorStates.getSelectedCursorIndex();
            this._selectedCursorIndex = selectedCursorIndex;
            // Activate/Deactivate cursor buttons for current selected cursor
            this.activateCursorButton(selectedCursorIndex);
            // Activate/Deactivate cursor move buttons
            this.activateMoveButtons(cursorStates, selectedCursorIndex);
        };
        /**
         * Sets the active cursor index
         * The cursor button for the given index will be set activated(other deactivated)
         *
         *
         * @private
         * @param {number} index
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.activateCursorButton = function (index) {
            // Activate or deactivate ref cursor 1 or 2 button
            if (index == 0) {
                this.activateButton(this._toolbarIdCursor1, true);
                this.activateButton(this._toolbarIdCursor2, false);
            }
            else if (index == 1) {
                this.activateButton(this._toolbarIdCursor2, true);
                this.activateButton(this._toolbarIdCursor1, false);
            }
            else {
                this.activateButton(this._toolbarIdCursor2, false);
                this.activateButton(this._toolbarIdCursor1, false);
            }
        };
        /**
         * Sets the move buttons active or inactive for the given selected cursor index
         *
         * @private
         * @param {CursorStates} cursorStates
         * @param {number} selectedCursorIndex
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.activateMoveButtons = function (cursorStates, selectedCursorIndex) {
            var selectedCursorIsActive = false;
            if (selectedCursorIndex != -1) {
                if (cursorStates.getActive(selectedCursorIndex) == true) {
                    selectedCursorIsActive = true;
                }
            }
            if (selectedCursorIsActive) {
                this.enableMoveButtons(true);
            }
            else {
                this.enableMoveButtons(false);
            }
        };
        /**
         * Enables the buttons for the cursor move operations
         *
         * @private
         * @param {boolean} enable
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.enableMoveButtons = function (enable) {
            this.disableButton(this._toolbarIdMoveLeft, !enable);
            this.disableButton(this._toolbarIdMoveRight, !enable);
        };
        return CursorInfoTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.CursorInfoTreeGridToolbar = CursorInfoTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L3ZpZXcvY3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBK0MsNkNBQW1CO1FBMkI5RDs7OztXQUlHO1FBQ0gsbUNBQVksYUFBNkI7WUFBekMsWUFDSSxrQkFBTSxhQUFhLENBQUMsU0FldkI7WUE5Q2dCLHVCQUFpQixHQUFFLFNBQVMsQ0FBQztZQUM3Qiw0QkFBc0IsR0FBRSwwQkFBMEIsQ0FBQztZQUVuRCx1QkFBaUIsR0FBRSxTQUFTLENBQUM7WUFDN0IsNEJBQXNCLEdBQUUsMkJBQTJCLENBQUM7WUFFckUsa0VBQWtFO1lBQ2xFLHNHQUFzRztZQUVyRix3QkFBa0IsR0FBRSxVQUFVLENBQUM7WUFDL0IsNkJBQXVCLEdBQUUsdUNBQXVDLENBQUM7WUFFakUseUJBQW1CLEdBQUUsV0FBVyxDQUFDO1lBQ2pDLDhCQUF3QixHQUFFLHdDQUF3QyxDQUFDO1lBRXBGLG9FQUFvRTtZQUNwRSx3R0FBd0c7WUFFdkYsa0NBQTRCLEdBQUUsY0FBYyxDQUFDO1lBQzdDLHVDQUFpQyxHQUFFLHFEQUFxRCxDQUFDO1lBRWxHLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDO1lBRW5DLGlDQUEyQixHQUFZLEtBQUssQ0FBQztZQVVoRCxJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyx3Q0FBd0MsQ0FBQztZQUV0SCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLEdBQUcsYUFBYSxDQUFDLENBQUM7WUFDM0csS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxp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QUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUFoTkQsQ0FBK0MseUNBQW1CLEdBZ05qRTtJQWhOWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlLCBUb29sYmFyQnV0dG9uQWxpZ25tZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IElDdXJzb3JJbmZvV2lkZ2V0LEN1cnNvck1vdmVtZW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY3Vyc29ySW5mb1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEN1cnNvcjEgPVwiQ3Vyc29yMVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBDdXJzb3IxID1cIlNlbGVjdHMgdGhlIGZpcnN0IGN1cnNvclwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEN1cnNvcjIgPVwiQ3Vyc29yMlwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBDdXJzb3IyID1cIlNlbGVjdHMgdGhlIHNlY29uZCBjdXJzb3JcIjtcclxuXHJcbiAgICAvL3ByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZE1vdmVFeHRlbmRlZExlZnQgPVwiTW92ZUV4dGVuZGVkTGVmdFwiO1xyXG4gICAgLy9wcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcE1vdmVFeHRlbmRlZExlZnQgPVwiTW92ZXMgdGhlIHNlbGVjdGVkIGN1cnNvciB0byB0aGUgbGVmdChleHRlbmRlZClcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRNb3ZlTGVmdCA9XCJNb3ZlTGVmdFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBNb3ZlTGVmdCA9XCJNb3ZlcyB0aGUgc2VsZWN0ZWQgY3Vyc29yIHRvIHRoZSBsZWZ0XCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkTW92ZVJpZ2h0ID1cIk1vdmVSaWdodFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBNb3ZlUmlnaHQgPVwiTW92ZXMgdGhlIHNlbGVjdGVkIGN1cnNvciB0byB0aGUgcmlnaHRcIjtcclxuXHJcbiAgICAvL3ByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZE1vdmVFeHRlbmRlZFJpZ2h0ID1cIk1vdmVFeHRlbmRlZFJpZ2h0XCI7XHJcbiAgICAvL3ByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwTW92ZUV4dGVuZGVkUmlnaHQgPVwiTW92ZXMgdGhlIHNlbGVjdGVkIGN1cnNvciB0byB0aGUgcmlnaHQoZXh0ZW5kZWQpXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQ3Vyc29ySW5mb1NlbGVjdG9yID1cIlRvb2dsZUZpbHRlclwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBDdXJzb3JJbmZvU2VsZWN0b3IgPVwiQ2hvb3NlIGN1cnNvciBpbmZvcm1hdGlvbnMgZm9yIHRoZSBzZWxlY3RlZCBzaWduYWxzXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRDdXJzb3JJbmRleDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgcHVibGljIGN1cnNvckluZm9TZWxlY3Rpb25Jc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gd2lkZ2V0TWFpbkRpdlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0TWFpbkRpdjogSFRNTERpdkVsZW1lbnQpe1xyXG4gICAgICAgIHN1cGVyKHdpZGdldE1haW5EaXYpO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJjdXJzb3JJbmZvV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRDdXJzb3IxLCB0aGlzLl90b29sYmFyVG9vbFRpcEN1cnNvcjEsIGltYWdlRGlyZWN0b3J5ICsgXCJjdXJzb3IxLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQ3Vyc29yMiwgdGhpcy5fdG9vbGJhclRvb2xUaXBDdXJzb3IyLCBpbWFnZURpcmVjdG9yeSArIFwiY3Vyc29yMi5zdmdcIik7XHJcbiAgICAgICAgLy90aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkTW92ZUV4dGVuZGVkTGVmdCwgdGhpcy5fdG9vbGJhclRvb2xUaXBNb3ZlRXh0ZW5kZWRMZWZ0LCBpbWFnZURpcmVjdG9yeSArIFwibW92ZUV4dGVuZGVkTGVmdC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZE1vdmVMZWZ0LCB0aGlzLl90b29sYmFyVG9vbFRpcE1vdmVMZWZ0LCBpbWFnZURpcmVjdG9yeSArIFwibW92ZUxlZnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlUmlnaHQsIHRoaXMuX3Rvb2xiYXJUb29sVGlwTW92ZVJpZ2h0LCBpbWFnZURpcmVjdG9yeSArIFwibW92ZVJpZ2h0LnN2Z1wiKTtcclxuICAgICAgICAvL3RoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlRXh0ZW5kZWRSaWdodCwgdGhpcy5fdG9vbGJhclRvb2xUaXBNb3ZlRXh0ZW5kZWRSaWdodCwgaW1hZ2VEaXJlY3RvcnkgKyBcIm1vdmVFeHRlbmRlZFJpZ2h0LnN2Z1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDb2xsYXBzZUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMuYWRkRXhwYW5kQnV0dG9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRDdXJzb3JJbmZvU2VsZWN0b3IsIHRoaXMuX3Rvb2xiYXJUb29sVGlwQ3Vyc29ySW5mb1NlbGVjdG9yLCBpbWFnZURpcmVjdG9yeSArIFwidG9nZ2xlVmlzaWJpbGl0eS5zdmdcIiwgVG9vbGJhckJ1dHRvbkFsaWdubWVudC5SaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgb24gdG9vbGJhciBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtJQ3Vyc29ySW5mb1dpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrIChhcmdzLCB3aWRnZXQ6IElDdXJzb3JJbmZvV2lkZ2V0KXtcclxuICAgICAgICBzdXBlci50b29sYmFyQ2xpY2tCYXNlKGFyZ3MpO1xyXG4gICAgICAgIHZhciBjbGlja2VkVG9vbGJhcklkID0gdGhpcy5nZXRDbGlja2VkVG9vbGJhcklkKGFyZ3MuaXRlbU5hbWUsIGFyZ3MubW9kZWwudG9vbGJhclNldHRpbmdzKTtcclxuICAgICAgICBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRDdXJzb3IxKSB7XHJcbiAgICAgICAgICAgIHdpZGdldC5vblJlZmVyZW5jZUN1cnNvclNlbGVjdGVkKDApO1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQ3Vyc29yMikge1xyXG4gICAgICAgICAgICB3aWRnZXQub25SZWZlcmVuY2VDdXJzb3JTZWxlY3RlZCgxKTtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKmVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkTW92ZUV4dGVuZGVkTGVmdCkge1xyXG4gICAgICAgICAgICB3aWRnZXQub25Nb3ZlQ3Vyc29yKHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5kZXgsIEN1cnNvckFjdGlvbi5tb3ZlTGVmdEV4dGVuZGVkKTtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkTW92ZUxlZnQpIHtcclxuICAgICAgICAgICAgd2lkZ2V0Lm9uTW92ZUN1cnNvcih0aGlzLl9zZWxlY3RlZEN1cnNvckluZGV4LCBDdXJzb3JNb3ZlbWVudC5MZWZ0KTtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZE1vdmVSaWdodCkge1xyXG4gICAgICAgICAgICB3aWRnZXQub25Nb3ZlQ3Vyc29yKHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5kZXgsIEN1cnNvck1vdmVtZW50LlJpZ2h0KTtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKmVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkTW92ZUV4dGVuZGVkUmlnaHQpIHtcclxuICAgICAgICAgICAgd2lkZ2V0Lm9uTW92ZUN1cnNvcih0aGlzLl9zZWxlY3RlZEN1cnNvckluZGV4LCBDdXJzb3JBY3Rpb24ubW92ZVJpZ2h0RXh0ZW5kZWQpO1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRDdXJzb3JJbmZvU2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgd2lkZ2V0LmFjdGl2YXRlQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyghdGhpcy5jdXJzb3JJbmZvU2VsZWN0aW9uSXNBY3RpdmUpO1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGNvcnJlY3QgdG9vbGJhciBidXR0b25zIGZvciB0aGUgY3VycmVudCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhY3RpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFjdGl2YXRlQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyhhY3RpdmF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JJbmZvU2VsZWN0aW9uSXNBY3RpdmUgPSBhY3RpdmF0ZTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvckluZm9TZWxlY3RvciwgYWN0aXZhdGUpXHJcbiAgICAgICAgdGhpcy5oaWRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjEsIGFjdGl2YXRlKTtcclxuICAgICAgICB0aGlzLmhpZGVCdXR0b24odGhpcy5fdG9vbGJhcklkQ3Vyc29yMiwgYWN0aXZhdGUpO1xyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlTGVmdCwgYWN0aXZhdGUpO1xyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlUmlnaHQsIGFjdGl2YXRlKTtcclxuICAgICAgICB0aGlzLmhpZGVDb2xsYXBzZUJ1dHRvbihhY3RpdmF0ZSk7XHJcbiAgICAgICAgdGhpcy5oaWRlRXhwYW5kQnV0dG9uKGFjdGl2YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSB0b29sYmFyIHN0YXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRUb29sYmFyU3RhdGVzKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdFRvb2xiYXJTdGF0ZXMoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbnMgYXQgc3RhcnR1cFxyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlTGVmdCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZE1vdmVSaWdodCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvckluZm9TZWxlY3RvciwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcyB0aGUgYnV0dG9uIGZvciB0aGUgYWN0aXZhdGlvbiBvZiB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b24oZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvckluZm9TZWxlY3RvciwgZGlzYWJsZSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRvb2xiYXIgYnV0dG9ucyAoZW5hYmxlIG9ubHkgaWYgYSBjdXJzb3IgaXMgZGVmaW5lZClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yU3RhdGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQnV0dG9uU3RhdGVzKGN1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzKXtcclxuICAgICAgICAvLyBTZXQgc2VsZWN0ZWQgY3Vyc29yIGluZGV4XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySW5kZXggPSBjdXJzb3JTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5kZXggPSBzZWxlY3RlZEN1cnNvckluZGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFjdGl2YXRlL0RlYWN0aXZhdGUgY3Vyc29yIGJ1dHRvbnMgZm9yIGN1cnJlbnQgc2VsZWN0ZWQgY3Vyc29yXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUN1cnNvckJ1dHRvbihzZWxlY3RlZEN1cnNvckluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBY3RpdmF0ZS9EZWFjdGl2YXRlIGN1cnNvciBtb3ZlIGJ1dHRvbnNcclxuICAgICAgICB0aGlzLmFjdGl2YXRlTW92ZUJ1dHRvbnMoY3Vyc29yU3RhdGVzLCBzZWxlY3RlZEN1cnNvckluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBjdXJzb3IgaW5kZXhcclxuICAgICAqIFRoZSBjdXJzb3IgYnV0dG9uIGZvciB0aGUgZ2l2ZW4gaW5kZXggd2lsbCBiZSBzZXQgYWN0aXZhdGVkKG90aGVyIGRlYWN0aXZhdGVkKVxyXG4gICAgICogXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZUN1cnNvckJ1dHRvbihpbmRleDogbnVtYmVyKXtcclxuICAgICAgICAvLyBBY3RpdmF0ZSBvciBkZWFjdGl2YXRlIHJlZiBjdXJzb3IgMSBvciAyIGJ1dHRvblxyXG4gICAgICAgIGlmKGluZGV4ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjEsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbmRleCA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUJ1dHRvbih0aGlzLl90b29sYmFySWRDdXJzb3IyLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUJ1dHRvbih0aGlzLl90b29sYmFySWRDdXJzb3IxLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVCdXR0b24odGhpcy5fdG9vbGJhcklkQ3Vyc29yMiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjEsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtb3ZlIGJ1dHRvbnMgYWN0aXZlIG9yIGluYWN0aXZlIGZvciB0aGUgZ2l2ZW4gc2VsZWN0ZWQgY3Vyc29yIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JTdGF0ZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWxlY3RlZEN1cnNvckluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlTW92ZUJ1dHRvbnMoY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMsIHNlbGVjdGVkQ3Vyc29ySW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZihzZWxlY3RlZEN1cnNvckluZGV4ICE9IC0xKXtcclxuICAgICAgICAgICAgaWYoY3Vyc29yU3RhdGVzLmdldEFjdGl2ZShzZWxlY3RlZEN1cnNvckluZGV4KSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3Vyc29ySXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGVjdGVkQ3Vyc29ySXNBY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZU1vdmVCdXR0b25zKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZU1vdmVCdXR0b25zKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzIHRoZSBidXR0b25zIGZvciB0aGUgY3Vyc29yIG1vdmUgb3BlcmF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbmFibGVNb3ZlQnV0dG9ucyhlbmFibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlTGVmdCwgIWVuYWJsZSk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZE1vdmVSaWdodCwgIWVuYWJsZSk7XHJcbiAgICB9XHJcbn0iXX0=
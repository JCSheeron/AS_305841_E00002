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
define(["require", "exports", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridToolbar = /** @class */ (function (_super) {
        __extends(CmTreeGridToolbar, _super);
        /**
         * Creates an instance of CmTreeGridToolbar.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof CmTreeGridToolbar
         */
        function CmTreeGridToolbar(widgetMainDiv) {
            var _this = _super.call(this, widgetMainDiv) || this;
            _this._toolbarIdSaveParameters = "Save";
            _this._toolbarToolTipSaveParameters = "Save parameters";
            _this._toolbarIdApplyParameters = "Apply";
            _this._toolbarToolTipApplyParameters = "Apply parameters";
            _this._toolbarIdDiscard = "Discard";
            _this._toolbarToolTipDiscard = "Discard changes";
            _this._toolbarIdEditMode = "EditMode";
            _this._toolbarToolTipEditMode = "Open/Close edit mode";
            /**
             * Holds the state if the edit mode is active or not
             *
             * @private
             * @memberof CmTreeGridToolbar
             */
            _this._editMode = false;
            /**
             * Holds the state if writeAccess is available or not
             *
             * @private
             * @memberof CmTreeGridToolbar
             */
            _this._writeAccess = false;
            /**
             * Holds the state if save button is executable
             *
             * @private
             * @memberof CmTreeGridToolbar
             */
            _this._saveButtonExecutable = false;
            /**
             * Holds the state if the current modified data can be transfered
             *
             * @private
             * @memberof CmTreeGridToolbar
             */
            _this._transferPossible = false;
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "configManagerWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdApplyParameters, _this._toolbarToolTipApplyParameters, imageDirectory + "apply.svg");
            _this.addToolbarButton(_this._toolbarIdDiscard, _this._toolbarToolTipDiscard, imageDirectory + "discardChanges.svg");
            _this.addToolbarButton(_this._toolbarIdSaveParameters, _this._toolbarToolTipSaveParameters, imageDirectory + "save.svg");
            _this.addCollapseButton();
            _this.addExpandButton();
            // add editMode button to the right
            _this.addToolbarButton(_this._toolbarIdEditMode, _this._toolbarToolTipEditMode, imageDirectory + "editMode.svg", treeGridToolbarBase_1.ToolbarButtonAlignment.Right);
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {IConfigManagerWidget} widget
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.toolbarClick = function (args, widget) {
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            switch (clickedToolbarId) {
                case this._toolbarIdSaveParameters:
                    args.cancel = true;
                    widget.saveParameters();
                    break;
                case this._toolbarIdApplyParameters:
                    args.cancel = true;
                    widget.applyModifiedParameters();
                    break;
                case this._toolbarIdDiscard:
                    args.cancel = true;
                    widget.discard();
                    break;
                case this._toolbarIdEditMode:
                    args.cancel = true;
                    // Toggle editMode
                    this.toggleEditMode();
                    // Update widget with editMode
                    widget.setEditMode(this._editMode);
                    break;
            }
        };
        /**
         * Sets the default toolbar states at startup
         *
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.initToolbarStates = function () {
            _super.prototype.initToolbarStates.call(this);
            this.updateButtons();
        };
        /**
         * Change the edit mode(activate/deactivate)
         *
         * @private
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.toggleEditMode = function () {
            this._editMode = !this._editMode;
            this.updateButtons();
        };
        /**
         * Update the visibilitiy and state of all buttons corresponding to the editMode, writeAccess, ...
         *
         * @private
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.updateButtons = function () {
            // hide/show buttons
            this.hideButton(this._toolbarIdApplyParameters, !this._editMode);
            this.hideButton(this._toolbarIdDiscard, !this._editMode);
            this.hideButton(this._toolbarIdSaveParameters, !this._editMode);
            // set active state of buttons
            this.activateButton(this._toolbarIdEditMode, this._editMode);
            // activate/deactivate buttons
            var disableSaveButton = true;
            if (this._writeAccess == true && this._saveButtonExecutable == true) {
                disableSaveButton = false;
            }
            this.disableButton(this._toolbarIdSaveParameters, disableSaveButton);
            var disableApplyButton = true;
            if (this._writeAccess == true && this._transferPossible == true) {
                disableApplyButton = false;
            }
            this.disableButton(this._toolbarIdApplyParameters, disableApplyButton);
        };
        /**
         * Is the save button executable
         *
         * @param {boolean} value
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.saveButtonExecutable = function (value) {
            this._saveButtonExecutable = value;
            this.updateButtons();
        };
        /**
         * Sets the info if writeAccess is available or not
         *
         * @param {boolean} value
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.setWriteAccess = function (value) {
            this._writeAccess = value;
            this.updateButtons();
        };
        /**
         * Sets the info if the current modified data can be transfered
         *
         * @param {boolean} value
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.setTransferPossible = function (value) {
            this._transferPossible = value;
            this.updateButtons();
        };
        return CmTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.CmTreeGridToolbar = CmTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZFRvb2xiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC92aWV3L2NtVHJlZUdyaWRUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUF1QyxxQ0FBbUI7UUE4Q3REOzs7O1dBSUc7UUFDSCwyQkFBWSxhQUE2QjtZQUF6QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQWF2QjtZQS9EZ0IsOEJBQXdCLEdBQUcsTUFBTSxDQUFDO1lBQ2xDLG1DQUE2QixHQUFHLGlCQUFpQixDQUFDO1lBRWxELCtCQUF5QixHQUFHLE9BQU8sQ0FBQztZQUNwQyxvQ0FBOEIsR0FBRyxrQkFBa0IsQ0FBQztZQUVwRCx1QkFBaUIsR0FBRyxTQUFTLENBQUM7WUFDOUIsNEJBQXNCLEdBQUcsaUJBQWlCLENBQUM7WUFFM0Msd0JBQWtCLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLDZCQUF1QixHQUFHLHNCQUFzQixDQUFDO1lBRWxFOzs7OztlQUtHO1lBQ0ssZUFBUyxHQUFHLEtBQUssQ0FBQztZQUUxQjs7Ozs7ZUFLRztZQUNNLGtCQUFZLEdBQUcsS0FBSyxDQUFDO1lBRTlCOzs7OztlQUtHO1lBQ00sMkJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBRXRDOzs7OztlQUtHO1lBQ0ssdUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBVS9CLElBQUksY0FBYyxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLDJDQUEyQyxDQUFDO1lBRXpILEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMseUJBQXlCLEVBQUUsS0FBSSxDQUFDLDhCQUE4QixFQUFFLGNBQWMsR0FBRyxXQUFXLENBQUMsQ0FBQztZQUN6SCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUksQ0FB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QztnQkFDL0QsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUVyRSxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUM5QixJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLEVBQUM7Z0JBQzNELGtCQUFrQixHQUFHLEtBQUssQ0FBQzthQUM5QjtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksZ0RBQW9CLEdBQTNCLFVBQTRCLEtBQWM7WUFDdEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksMENBQWMsR0FBckIsVUFBc0IsS0FBYztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksK0NBQW1CLEdBQTFCLFVBQTJCLEtBQWM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQTFMRCxDQUF1Qyx5Q0FBbUIsR0EwTHpEO0lBMUxZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkVG9vbGJhckJhc2UsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElDb25maWdNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29uZmlnTWFuYWdlcldpZGdldEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkU2F2ZVBhcmFtZXRlcnMgPSBcIlNhdmVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwU2F2ZVBhcmFtZXRlcnMgPSBcIlNhdmUgcGFyYW1ldGVyc1wiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEFwcGx5UGFyYW1ldGVycyA9IFwiQXBwbHlcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwQXBwbHlQYXJhbWV0ZXJzID0gXCJBcHBseSBwYXJhbWV0ZXJzXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkRGlzY2FyZCA9IFwiRGlzY2FyZFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBEaXNjYXJkID0gXCJEaXNjYXJkIGNoYW5nZXNcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRFZGl0TW9kZSA9IFwiRWRpdE1vZGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwRWRpdE1vZGUgPSBcIk9wZW4vQ2xvc2UgZWRpdCBtb2RlXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgc3RhdGUgaWYgdGhlIGVkaXQgbW9kZSBpcyBhY3RpdmUgb3Igbm90XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDbVRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9lZGl0TW9kZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHN0YXRlIGlmIHdyaXRlQWNjZXNzIGlzIGF2YWlsYWJsZSBvciBub3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgICBwcml2YXRlIF93cml0ZUFjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHN0YXRlIGlmIHNhdmUgYnV0dG9uIGlzIGV4ZWN1dGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgICBwcml2YXRlIF9zYXZlQnV0dG9uRXhlY3V0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAvKipcclxuICAgICAgKiBIb2xkcyB0aGUgc3RhdGUgaWYgdGhlIGN1cnJlbnQgbW9kaWZpZWQgZGF0YSBjYW4gYmUgdHJhbnNmZXJlZFxyXG4gICAgICAqXHJcbiAgICAgICogQHByaXZhdGVcclxuICAgICAgKiBAbWVtYmVyb2YgQ21UcmVlR3JpZFRvb2xiYXJcclxuICAgICAgKi9cclxuICAgICBwcml2YXRlIF90cmFuc2ZlclBvc3NpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENtVHJlZUdyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gd2lkZ2V0TWFpbkRpdlxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHdpZGdldE1haW5EaXY6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICAgICAgc3VwZXIod2lkZ2V0TWFpbkRpdik7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcImNvbmZpZ01hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEFwcGx5UGFyYW1ldGVycywgdGhpcy5fdG9vbGJhclRvb2xUaXBBcHBseVBhcmFtZXRlcnMsIGltYWdlRGlyZWN0b3J5ICsgXCJhcHBseS5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZERpc2NhcmQsIHRoaXMuX3Rvb2xiYXJUb29sVGlwRGlzY2FyZCwgaW1hZ2VEaXJlY3RvcnkgKyBcImRpc2NhcmRDaGFuZ2VzLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkU2F2ZVBhcmFtZXRlcnMsIHRoaXMuX3Rvb2xiYXJUb29sVGlwU2F2ZVBhcmFtZXRlcnMsIGltYWdlRGlyZWN0b3J5ICsgXCJzYXZlLnN2Z1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDb2xsYXBzZUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMuYWRkRXhwYW5kQnV0dG9uKCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBlZGl0TW9kZSBidXR0b24gdG8gdGhlIHJpZ2h0XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCB0aGlzLl90b29sYmFyVG9vbFRpcEVkaXRNb2RlLCBpbWFnZURpcmVjdG9yeSArIFwiZWRpdE1vZGUuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuUmlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIG9uIHRvb2xiYXIgY2xpY2tcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7SUNvbmZpZ01hbmFnZXJXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b29sYmFyQ2xpY2soYXJncywgd2lkZ2V0OiBJQ29uZmlnTWFuYWdlcldpZGdldCkge1xyXG4gICAgICAgIHN1cGVyLnRvb2xiYXJDbGlja0Jhc2UoYXJncyk7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRUb29sYmFySWQgPSB0aGlzLmdldENsaWNrZWRUb29sYmFySWQoYXJncy5pdGVtTmFtZSwgYXJncy5tb2RlbC50b29sYmFyU2V0dGluZ3MpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNsaWNrZWRUb29sYmFySWQpIHtcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl90b29sYmFySWRTYXZlUGFyYW1ldGVyczpcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5zYXZlUGFyYW1ldGVycygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdG9vbGJhcklkQXBwbHlQYXJhbWV0ZXJzOlxyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmFwcGx5TW9kaWZpZWRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl90b29sYmFySWREaXNjYXJkOlxyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmRpc2NhcmQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlOlxyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xlIGVkaXRNb2RlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUVkaXRNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB3aWRnZXQgd2l0aCBlZGl0TW9kZVxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnNldEVkaXRNb2RlKHRoaXMuX2VkaXRNb2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgdG9vbGJhciBzdGF0ZXMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbVRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdFRvb2xiYXJTdGF0ZXMoKXtcclxuICAgICAgICBzdXBlci5pbml0VG9vbGJhclN0YXRlcygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIHRoZSBlZGl0IG1vZGUoYWN0aXZhdGUvZGVhY3RpdmF0ZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdG9nZ2xlRWRpdE1vZGUoKXtcclxuICAgICAgICB0aGlzLl9lZGl0TW9kZSA9ICF0aGlzLl9lZGl0TW9kZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgdmlzaWJpbGl0aXkgYW5kIHN0YXRlIG9mIGFsbCBidXR0b25zIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGVkaXRNb2RlLCB3cml0ZUFjY2VzcywgLi4uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDbVRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUJ1dHRvbnMoKXtcclxuICAgICAgICAvLyBoaWRlL3Nob3cgYnV0dG9uc1xyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl90b29sYmFySWRBcHBseVBhcmFtZXRlcnMsICF0aGlzLl9lZGl0TW9kZSk7XHJcbiAgICAgICAgdGhpcy5oaWRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZERpc2NhcmQsICF0aGlzLl9lZGl0TW9kZSk7XHJcbiAgICAgICAgdGhpcy5oaWRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZFNhdmVQYXJhbWV0ZXJzLCAhdGhpcy5fZWRpdE1vZGUpO1xyXG5cclxuICAgICAgICAvLyBzZXQgYWN0aXZlIHN0YXRlIG9mIGJ1dHRvbnNcclxuICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCB0aGlzLl9lZGl0TW9kZSk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGFjdGl2YXRlL2RlYWN0aXZhdGUgYnV0dG9uc1xyXG4gICAgICAgIGxldCBkaXNhYmxlU2F2ZUJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgaWYodGhpcy5fd3JpdGVBY2Nlc3MgPT0gdHJ1ZSAmJiB0aGlzLl9zYXZlQnV0dG9uRXhlY3V0YWJsZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgZGlzYWJsZVNhdmVCdXR0b24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZFNhdmVQYXJhbWV0ZXJzLCBkaXNhYmxlU2F2ZUJ1dHRvbik7XHJcblxyXG4gICAgICAgIGxldCBkaXNhYmxlQXBwbHlCdXR0b24gPSB0cnVlO1xyXG4gICAgICAgIGlmKHRoaXMuX3dyaXRlQWNjZXNzID09IHRydWUgJiYgdGhpcy5fdHJhbnNmZXJQb3NzaWJsZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgZGlzYWJsZUFwcGx5QnV0dG9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRBcHBseVBhcmFtZXRlcnMsIGRpc2FibGVBcHBseUJ1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB0aGUgc2F2ZSBidXR0b24gZXhlY3V0YWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBDbVRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZUJ1dHRvbkV4ZWN1dGFibGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zYXZlQnV0dG9uRXhlY3V0YWJsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyBpZiB3cml0ZUFjY2VzcyBpcyBhdmFpbGFibGUgb3Igbm90XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRXcml0ZUFjY2Vzcyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3dyaXRlQWNjZXNzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpbmZvIGlmIHRoZSBjdXJyZW50IG1vZGlmaWVkIGRhdGEgY2FuIGJlIHRyYW5zZmVyZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ21UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFRyYW5zZmVyUG9zc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl90cmFuc2ZlclBvc3NpYmxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XHJcbiAgICB9XHJcbn0iXX0=
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
define(["require", "exports", "../common/treeGridToolbarBase", "../../common/directoryProvider", "../common/iconInfo", "../../models/common/stateExpression/watchableIcon"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1, iconInfo_1, watchableIcon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WatchablesGridToolbar = /** @class */ (function (_super) {
        __extends(WatchablesGridToolbar, _super);
        /**
         * Creates an instance of WatchablesGridToolbar.
         * @param {HTMLDivElement} widgetDiv
         * @memberof WatchablesGridToolbar
         */
        function WatchablesGridToolbar(widgetDiv) {
            var _this = _super.call(this, widgetDiv) || this;
            // Path to image directory     
            _this.imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "watchablesWidget/style/images/toolbar/";
            // Holds an array of existing icons
            _this._toolbarIconInfo = new Array();
            // Last icon where mouse has been over
            _this._lastIconMouseOver = new iconInfo_1.IconInfo('', '', '');
            //Add empty button so toolbar is created
            _this.addToolbarButton('empty', '', _this.imageDirectory + "empty.svg");
            return _this;
        }
        /**
         * Sets the default toolbar states at startup
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.initToolbarStates = function () {
            // Don't use the default initializer because watchables widget uses only state icons, no really buttons
            //super.initToolbarStates();       
            // disable dummy button after creation
            this.disableDummyButton();
        };
        /**
         * Adds icon to be inserted in the toolbar
         *
         * @param {MappCockpitStateParameter} watchableStateParameter
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.addIcon = function (watchableStateParameter) {
            //Add button to toolbar
            var name = watchableStateParameter.name;
            this.addToolbarButton(name, '', '');
            //Create toolbar icon info
            this._toolbarIconInfo.push(new iconInfo_1.IconInfo(name));
            //Initialize as unkown state
            this.updateIcon(name, watchableIcon_1.WatchableIcon.getUnkownWatchableIcon());
        };
        /**
         * Add event listener to icons for mouseover
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.addEventListeners = function () {
            var _this = this;
            this._toolbarIconInfo.forEach(function (iconInfo) {
                var elemId = '#' + _this._widgetMainDiv.id + '_' + iconInfo.name;
                $(elemId).on('mouseover', function (e) { return _this.getMouseOverIcon(e); });
            });
        };
        /**
         * Updates icon image
         *
         * @param {string} name
         * @param {WatchableIcon} watchableIcon
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.updateIcon = function (name, watchableIcon) {
            var toolbarIcon = this.getToolbarIconInfo(name);
            if (toolbarIcon !== undefined && toolbarIcon.imageName !== watchableIcon.imageName) {
                this.updateIconInToolbar(toolbarIcon, name, watchableIcon.imageName, watchableIcon.tooltip);
            }
        };
        /**
         * Updates icon image in treegrid's toolbar
         *
         * @private
         * @param {IconInfo} toolbarIcon
         * @param {string} buttonId
         * @param {string} imageName
         * @param {string} tooltip
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.updateIconInToolbar = function (toolbarIcon, buttonId, imageName, tooltip) {
            // wTbI => watchablesToolbarIcon
            this.updateButtonIcon(buttonId, imageName, "wTbI");
            toolbarIcon.updateInfo(imageName, tooltip);
        };
        /**
         * Get Icon info
         *
         * @private
         * @param {string} name
         * @returns {IconInfo}
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.getToolbarIconInfo = function (name) {
            var iconInfo = this._toolbarIconInfo.find(function (iconInfo) { return iconInfo.name === name; });
            return iconInfo;
        };
        /**
         * Get icon where we are dragging the mouse over
         *
         * @private
         * @param {*} args
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.getMouseOverIcon = function (args) {
            var name = ('#' + args.currentTarget.id).split(this._widgetMainDiv.id + '_')[1];
            var toolbarIconInfo = this._toolbarIconInfo.find(function (iconInfo) { return iconInfo.name === name; });
            if (toolbarIconInfo !== undefined) {
                this._lastIconMouseOver = toolbarIconInfo;
            }
        };
        /**
         * Updates toolbar tooltip without updating the whole treegrid
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.tooltipExtension = function () {
            var _this = this;
            // Get HTML element of current tooltip icon
            var target = $('#' + this._widgetMainDiv.id + '_toolbarItems_content')[0];
            if (target != undefined) {
                //Create a mutation observer
                var observer = new MutationObserver(function (mutations) {
                    _this.updateTooltipOnMutationChanged(target, mutations);
                });
                //Observe changes in tooltip content. 
                //There is just one <div> for all tooltips of the same toolbar. 
                observer.observe(target, { attributes: true, childList: true, characterData: true });
            }
        };
        /**
         * Update tooltip when a mutationRecord is changed
         *
         * @private
         * @param {HTMLElement} target
         * @param {MutationRecord[]} mutations
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.updateTooltipOnMutationChanged = function (target, mutations) {
            var _this = this;
            mutations.forEach(function (mutationRecord) {
                var iconInfo = _this.getToolbarIconInfo(_this._lastIconMouseOver.name);
                if (iconInfo !== undefined) {
                    var newValue = iconInfo.tooltip;
                    var oldValue = target.innerHTML;
                    if (newValue != oldValue) {
                        target.innerHTML = newValue;
                    }
                }
            });
        };
        /**
         * hide selected icon
         *
         * @param {string} id
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.hideIcon = function (id) {
            this.hideButton(id, true);
        };
        /**
         * disables dummy button needed for initialization of toolbar
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.disableDummyButton = function () {
            this.disableButton('empty', true, true);
        };
        /**
         * Disable icons in toolbar so they don't behave as buttons
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.disableIcons = function () {
            for (var i = 0; i < this._toolbarIconInfo.length; i++) {
                this.disableButton(this._toolbarIconInfo[i].name, true, true);
            }
        };
        return WatchablesGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.WatchablesGridToolbar = WatchablesGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvd2F0Y2hhYmxlc0dyaWRUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQTtRQUEyQyx5Q0FBbUI7UUFRMUQ7Ozs7V0FJRztRQUNILCtCQUFZLFNBQXlCO1lBQXJDLFlBQ0ksa0JBQU0sU0FBUyxDQUFDLFNBSW5CO1lBakJELCtCQUErQjtZQUNkLG9CQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsd0NBQXdDLENBQUM7WUFDbkksbUNBQW1DO1lBQzNCLHNCQUFnQixHQUFJLElBQUksS0FBSyxFQUFZLENBQUM7WUFDbEQsc0NBQXNDO1lBQzlCLHdCQUFrQixHQUFhLElBQUksbUJBQVEsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBVTFELHdDQUF3QztZQUN4QyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxDQUFDOztRQUMxRSxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLGlEQUFpQixHQUF4QjtZQUNJLHVHQUF1RztZQUN2RyxtQ0FBbUM7WUFFbkMsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHVDQUFPLEdBQWQsVUFBZSx1QkFBa0Q7WUFDN0QsdUJBQXVCO1lBQ3ZCLElBQUksSUFBSSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQztZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwQywwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLGdCQUFn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LDRDQUFZLEdBQW5CO1lBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDakU7UUFDTCxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBaE1ELENBQTJDLHlDQUFtQixHQWdNN0Q7SUFoTVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgSWNvbkluZm8gfSBmcm9tIFwiLi4vY29tbW9uL2ljb25JbmZvXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBXYXRjaGFibGVJY29uIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc3RhdGVFeHByZXNzaW9uL3dhdGNoYWJsZUljb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXYXRjaGFibGVzR3JpZFRvb2xiYXIgZXh0ZW5kcyBUcmVlR3JpZFRvb2xiYXJCYXNle1xyXG4gICAgLy8gUGF0aCB0byBpbWFnZSBkaXJlY3RvcnkgICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcIndhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcbiAgICAvLyBIb2xkcyBhbiBhcnJheSBvZiBleGlzdGluZyBpY29uc1xyXG4gICAgcHJpdmF0ZSBfdG9vbGJhckljb25JbmZvID0gIG5ldyBBcnJheTxJY29uSW5mbz4oKTtcclxuICAgIC8vIExhc3QgaWNvbiB3aGVyZSBtb3VzZSBoYXMgYmVlbiBvdmVyXHJcbiAgICBwcml2YXRlIF9sYXN0SWNvbk1vdXNlT3ZlcjogSWNvbkluZm8gPSBuZXcgSWNvbkluZm8oJycsJycsJycpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gd2lkZ2V0RGl2XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHdpZGdldERpdjogSFRNTERpdkVsZW1lbnQpe1xyXG4gICAgICAgIHN1cGVyKHdpZGdldERpdik7IFxyXG5cclxuICAgICAgICAvL0FkZCBlbXB0eSBidXR0b24gc28gdG9vbGJhciBpcyBjcmVhdGVkXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKCdlbXB0eScsICcnLCB0aGlzLmltYWdlRGlyZWN0b3J5ICsgXCJlbXB0eS5zdmdcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCB0b29sYmFyIHN0YXRlcyBhdCBzdGFydHVwXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdFRvb2xiYXJTdGF0ZXMoKXtcclxuICAgICAgICAvLyBEb24ndCB1c2UgdGhlIGRlZmF1bHQgaW5pdGlhbGl6ZXIgYmVjYXVzZSB3YXRjaGFibGVzIHdpZGdldCB1c2VzIG9ubHkgc3RhdGUgaWNvbnMsIG5vIHJlYWxseSBidXR0b25zXHJcbiAgICAgICAgLy9zdXBlci5pbml0VG9vbGJhclN0YXRlcygpOyAgICAgICBcclxuXHJcbiAgICAgICAgLy8gZGlzYWJsZSBkdW1teSBidXR0b24gYWZ0ZXIgY3JlYXRpb25cclxuICAgICAgICB0aGlzLmRpc2FibGVEdW1teUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBpY29uIHRvIGJlIGluc2VydGVkIGluIHRoZSB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyfSB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkSWNvbih3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcjogTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vQWRkIGJ1dHRvbiB0byB0b29sYmFyXHJcbiAgICAgICAgbGV0IG5hbWUgPSB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlci5uYW1lO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbihuYW1lLCAnJywgJycpO1xyXG5cclxuICAgICAgICAvL0NyZWF0ZSB0b29sYmFyIGljb24gaW5mb1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJJY29uSW5mby5wdXNoKG5ldyBJY29uSW5mbyhuYW1lKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Jbml0aWFsaXplIGFzIHVua293biBzdGF0ZVxyXG4gICAgICAgIHRoaXMudXBkYXRlSWNvbihuYW1lLCBXYXRjaGFibGVJY29uLmdldFVua293bldhdGNoYWJsZUljb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gaWNvbnMgZm9yIG1vdXNlb3ZlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJJY29uSW5mby5mb3JFYWNoKChpY29uSW5mbykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZWxlbUlkID0gJyMnICsgdGhpcy5fd2lkZ2V0TWFpbkRpdi5pZCArICdfJyArIGljb25JbmZvLm5hbWU7XHJcbiAgICAgICAgICAgICQoZWxlbUlkKS5vbignbW91c2VvdmVyJywgKGUpID0+IHRoaXMuZ2V0TW91c2VPdmVySWNvbihlKSApO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogVXBkYXRlcyBpY29uIGltYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7V2F0Y2hhYmxlSWNvbn0gd2F0Y2hhYmxlSWNvblxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlSWNvbihuYW1lOiBzdHJpbmcsIHdhdGNoYWJsZUljb246IFdhdGNoYWJsZUljb24pIHtcclxuICAgICAgICB2YXIgdG9vbGJhckljb24gPSB0aGlzLmdldFRvb2xiYXJJY29uSW5mbyhuYW1lKTtcclxuICAgICAgICBpZiAodG9vbGJhckljb24gIT09IHVuZGVmaW5lZCAmJiB0b29sYmFySWNvbi5pbWFnZU5hbWUgIT09IHdhdGNoYWJsZUljb24uaW1hZ2VOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSWNvbkluVG9vbGJhcih0b29sYmFySWNvbiwgbmFtZSwgd2F0Y2hhYmxlSWNvbi5pbWFnZU5hbWUsIHdhdGNoYWJsZUljb24udG9vbHRpcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBpY29uIGltYWdlIGluIHRyZWVncmlkJ3MgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0ljb25JbmZvfSB0b29sYmFySWNvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbHRpcFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUljb25JblRvb2xiYXIodG9vbGJhckljb246IEljb25JbmZvLCBidXR0b25JZDogc3RyaW5nLCBpbWFnZU5hbWU6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gd1RiSSA9PiB3YXRjaGFibGVzVG9vbGJhckljb25cclxuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvbkljb24oYnV0dG9uSWQsIGltYWdlTmFtZSwgXCJ3VGJJXCIpO1xyXG4gICAgICAgIHRvb2xiYXJJY29uLnVwZGF0ZUluZm8oaW1hZ2VOYW1lLCB0b29sdGlwKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEljb24gaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHJldHVybnMge0ljb25JbmZvfVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRvb2xiYXJJY29uSW5mbyhuYW1lOiBzdHJpbmcpOiBJY29uSW5mbyB8IHVuZGVmaW5lZHtcclxuICAgICAgICB2YXIgaWNvbkluZm8gPSB0aGlzLl90b29sYmFySWNvbkluZm8uZmluZCgoaWNvbkluZm8pID0+IGljb25JbmZvLm5hbWUgPT09IG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBpY29uSW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBpY29uIHdoZXJlIHdlIGFyZSBkcmFnZ2luZyB0aGUgbW91c2Ugb3ZlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNb3VzZU92ZXJJY29uKGFyZ3MpIHtcclxuICAgICAgICB2YXIgbmFtZSA9ICgnIycgKyBhcmdzLmN1cnJlbnRUYXJnZXQuaWQpLnNwbGl0KHRoaXMuX3dpZGdldE1haW5EaXYuaWQgKyAnXycpWzFdO1xyXG4gICAgICAgIGxldCB0b29sYmFySWNvbkluZm8gPSB0aGlzLl90b29sYmFySWNvbkluZm8uZmluZCgoaWNvbkluZm8pID0+IGljb25JbmZvLm5hbWUgPT09IG5hbWUpO1xyXG4gICAgICAgIGlmICh0b29sYmFySWNvbkluZm8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0SWNvbk1vdXNlT3ZlciA9IHRvb2xiYXJJY29uSW5mbztcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0b29sYmFyIHRvb2x0aXAgd2l0aG91dCB1cGRhdGluZyB0aGUgd2hvbGUgdHJlZWdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b29sdGlwRXh0ZW5zaW9uKCkge1xyXG4gICAgICAgIC8vIEdldCBIVE1MIGVsZW1lbnQgb2YgY3VycmVudCB0b29sdGlwIGljb25cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gJCgnIycgKyB0aGlzLl93aWRnZXRNYWluRGl2LmlkICsgJ190b29sYmFySXRlbXNfY29udGVudCcpWzBdO1xyXG5cclxuICAgICAgICBpZih0YXJnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy9DcmVhdGUgYSBtdXRhdGlvbiBvYnNlcnZlclxyXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBPbk11dGF0aW9uQ2hhbmdlZCh0YXJnZXQsIG11dGF0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9PYnNlcnZlIGNoYW5nZXMgaW4gdG9vbHRpcCBjb250ZW50LiBcclxuICAgICAgICAgICAgLy9UaGVyZSBpcyBqdXN0IG9uZSA8ZGl2PiBmb3IgYWxsIHRvb2x0aXBzIG9mIHRoZSBzYW1lIHRvb2xiYXIuIFxyXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgeyBhdHRyaWJ1dGVzIDogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOnRydWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRvb2x0aXAgd2hlbiBhIG11dGF0aW9uUmVjb3JkIGlzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkW119IG11dGF0aW9uc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvb2x0aXBPbk11dGF0aW9uQ2hhbmdlZCh0YXJnZXQ6IEhUTUxFbGVtZW50LCBtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW10pIHtcclxuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb25SZWNvcmQpID0+IHtcclxuICAgICAgICAgICAgdmFyIGljb25JbmZvID0gdGhpcy5nZXRUb29sYmFySWNvbkluZm8odGhpcy5fbGFzdEljb25Nb3VzZU92ZXIubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpY29uSW5mbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBpY29uSW5mby50b29sdGlwXHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkVmFsdWUgPSB0YXJnZXQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9IG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoaWRlIHNlbGVjdGVkIGljb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVJY29uKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmhpZGVCdXR0b24oaWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzYWJsZXMgZHVtbXkgYnV0dG9uIG5lZWRlZCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVEdW1teUJ1dHRvbigpe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbignZW1wdHknLCB0cnVlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGUgaWNvbnMgaW4gdG9vbGJhciBzbyB0aGV5IGRvbid0IGJlaGF2ZSBhcyBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZUljb25zKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fdG9vbGJhckljb25JbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWNvbkluZm9baV0ubmFtZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
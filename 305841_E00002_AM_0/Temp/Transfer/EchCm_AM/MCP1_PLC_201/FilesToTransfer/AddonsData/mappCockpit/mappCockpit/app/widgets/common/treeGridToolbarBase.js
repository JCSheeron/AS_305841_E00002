define(["require", "exports", "../../common/directoryProvider", "./toolbarButton", "./domHelper", "./themeProvider", "./customToolbarButton"], function (require, exports, directoryProvider_1, toolbarButton_1, domHelper_1, themeProvider_1, customToolbarButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolbarButtonAlignment;
    (function (ToolbarButtonAlignment) {
        ToolbarButtonAlignment[ToolbarButtonAlignment["Left"] = 0] = "Left";
        ToolbarButtonAlignment[ToolbarButtonAlignment["Right"] = 1] = "Right";
    })(ToolbarButtonAlignment || (ToolbarButtonAlignment = {}));
    exports.ToolbarButtonAlignment = ToolbarButtonAlignment;
    var TreeGridToolbarBase = /** @class */ (function () {
        /**
         * Creates an instance of TreeGridToolbarBase.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof TreeGridToolbarBase
         */
        function TreeGridToolbarBase(widgetMainDiv) {
            this._collapseButtonId = "collapse";
            this._expandButtonId = "expand";
            this._collapseButtonToolTip = "Collapse all childs";
            this._expandButtonToolTip = "Expand all childs";
            this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "common/style/images/tree/toolbar/";
            this._collapseLevel = 0;
            this._defaultButtonClassNameIsUsed = false;
            this._widgetMainDiv = widgetMainDiv;
            this._toolbarButtons = new Array();
        }
        /**
         * Adds a new toolbar button to the toolbar buttons list
         *
         * @param {string} id must be without spaces
         * @param {string} tooltip
         * @param {string} icon
         * @param {string} [align="left"]
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.addToolbarButton = function (id, tooltip, icon, align) {
            if (align === void 0) { align = ToolbarButtonAlignment.Left; }
            // add toolbar button needed to show a toolbar
            if (id.indexOf(" ") != -1) {
                console.error("Empty ' ' not allowed within id!");
            }
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(id, tooltip, icon, align));
        };
        TreeGridToolbarBase.prototype.setCollapseLevel = function (level) {
            this._collapseLevel = level;
        };
        TreeGridToolbarBase.prototype.addCollapseButton = function () {
            // add toolbar button for collapse
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(this._collapseButtonId, this._collapseButtonToolTip, this._imageDirectory + "collapse.svg", ToolbarButtonAlignment.Left));
        };
        TreeGridToolbarBase.prototype.addExpandButton = function () {
            // add toolbar button for expand
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(this._expandButtonId, this._expandButtonToolTip, this._imageDirectory + "expand.svg", ToolbarButtonAlignment.Left));
        };
        TreeGridToolbarBase.prototype.hideCollapseButton = function (hide) {
            // hide collapse toolbar button
            this.hideButton(this._collapseButtonId, hide);
        };
        TreeGridToolbarBase.prototype.hideExpandButton = function (hide) {
            // hide expand toolbar button
            this.hideButton(this._expandButtonId, hide);
        };
        TreeGridToolbarBase.prototype.toolbarClick = function (args, widget) { };
        TreeGridToolbarBase.prototype.toolbarClickBase = function (args) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._collapseButtonId) {
                if (this._collapseLevel == 0) {
                    this.getTreeGridObject().collapseAll();
                }
                else {
                    this.getTreeGridObject().collapseAtLevel(this._collapseLevel);
                }
            }
            else if (clickedToolbarId == this._expandButtonId) {
                this.getTreeGridObject().expandAll();
            }
        };
        /**
         * Returns true if Expand or Collapse button is selected
         *
         * @param {*} args
         * @returns {boolean}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.isExpandCollapseSelected = function (args) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId === this._collapseButtonId || clickedToolbarId === this._expandButtonId) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Returns the toolbar definition for the tree grid
         *
         * @returns {CustomToolbarButton[]}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getCustomToolbars = function () {
            var toolbars = [];
            this._toolbarButtons.forEach(function (button) {
                toolbars.push(new customToolbarButton_1.CustomToolbarButton(button.id, button.tooltip));
            });
            return toolbars;
        };
        /**
         * Disables the button (e.g. show the "..._deactivated.svg icon instead of "....svg")
         *
         * @param {string} buttonId
         * @param {boolean} disable
         * @param {boolean} [isIcon]
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.disableButton = function (buttonId, disable, isIcon) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            button.disabled = disable;
            var element = this.getElementByToolbarButtonElementId(button.id);
            if (element == undefined) {
                return;
            }
            var icon = button.icon;
            if (this._defaultButtonClassNameIsUsed == true) {
                // Switch automatically to deactivated icon if default classnames are used for buttons
                if (disable == true) {
                    if (!isIcon) {
                        icon = this.getDeactivatedIcon(button.icon);
                    }
                    element.classList.remove(TreeGridToolbarBase.defaultToolbarButtonClassName);
                    element.classList.add(TreeGridToolbarBase.defaultToolbarButtonDeactivatedClassName);
                }
                else {
                    element.classList.remove(TreeGridToolbarBase.defaultToolbarButtonDeactivatedClassName);
                    element.classList.add(TreeGridToolbarBase.defaultToolbarButtonClassName);
                }
            }
            domHelper_1.DomHelper.disableElement(element, disable);
            if (this._defaultButtonClassNameIsUsed == true) {
                // Switch automatically to deactivated icon if default classnames are used for buttons
                if (!isIcon) {
                    element.style.backgroundImage = "url(" + this.getImagePath(icon) + ")";
                }
            }
        };
        /**
         * Updates class entry in button to show other icon
         * Removes other class names with prefix and adds new class name with prefix
         *
         * @param {string} buttonId
         * @param {string} iconName
         * @param {string} classNamePrefix
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.updateButtonIcon = function (buttonId, iconName, classNamePrefix) {
            // Add "_" to prefix
            classNamePrefix += "_";
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonElementId(button.id);
            if (element == undefined) {
                return;
            }
            // get iconElement 
            var iconElement = element.firstElementChild;
            if (iconElement != undefined) {
                var classNamesToRemove_1 = new Array();
                iconElement.classList.forEach(function (className) {
                    if (className.startsWith(classNamePrefix)) {
                        classNamesToRemove_1.push(className);
                    }
                });
                classNamesToRemove_1.forEach(function (className) {
                    iconElement.classList.remove(className);
                });
                iconElement.classList.add(classNamePrefix + iconName);
            }
        };
        /**
         * Hides(Shows) the button with the given id
         *
         * @param {string} buttonId
         * @param {boolean} hide
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.hideButton = function (buttonId, hide) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonElementId(button.id);
            if (element != undefined) {
                if (hide == true) {
                    element.style.display = "none";
                }
                else {
                    element.style.display = "";
                }
            }
        };
        /**
         * Shows the button highlighted (e.g orange background)
         *
         * @param {string} buttonId
         * @param {boolean} activate
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.activateButton = function (buttonId, activate) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonElementId(button.id);
            if (element != undefined) {
                if (activate == true) {
                    element.style.backgroundColor = "var(--main-orange)";
                }
                else {
                    element.style.backgroundColor = "";
                }
            }
        };
        /**
         * Returns the id of the toolbar button that was clicked. Only if the toolbar button is not deactivated!
         *
         * @param {string} toolTipText
         * @param {*} toolbarSettings
         * @returns {string}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getClickedToolbarId = function (toolTipText, toolbarSettings) {
            // TODO: why itemName == tooltiptext of customtoolbar and not the id!!!
            // ej.TreeGrid.ToolbarItems.Add = "add" => will be "Add" in itemName!!!
            // custom toolbar
            for (var index = 0; index < toolbarSettings.customToolbarItems.length; index++) {
                if (toolbarSettings.customToolbarItems[index].tooltipText == toolTipText) {
                    var button = this.getToolbarButton(toolbarSettings.customToolbarItems[index].text);
                    if (button != undefined && button.disabled == false) {
                        return toolbarSettings.customToolbarItems[index].text;
                    }
                    return "";
                }
            }
            return "";
        };
        /**
         * Adds a className to the toolbar buttons
         *
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.addToolbarButtonClassName = function (className) {
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                $(this._widgetMainDiv).append(this.getImageStyle(this._toolbarButtons[i].id, this._toolbarButtons[i].icon));
                // add toolbar class to element
                var element = this.getElementByToolbarButtonElementId(this._toolbarButtons[i].id);
                if (element != undefined) {
                    element.classList.add(className);
                }
            }
        };
        /**
         * Sets the default toolbar states at startup
         *
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.initToolbarStates = function () {
            // Sets the default toolbar button class name
            this._defaultButtonClassNameIsUsed = true;
            this.addToolbarButtonClassName(TreeGridToolbarBase.defaultToolbarButtonClassName);
        };
        /**
         * Resize the toolbar to the given width
         * Sets the position of the right aligned buttons
         *
         * @param {number} width
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.resize = function (width) {
            var buttonWidth = 31; // TODO: get 31px from div/svg
            var leftButtonCount = this.getVisibleToolbarButtonOnLeftSideCount();
            var rightButtonCount = this.getVisibleToolbarButtonsOnRightSideCount();
            var buttonCount = leftButtonCount + rightButtonCount;
            if (width > (buttonCount * buttonWidth)) { // Only move buttons from right to left if there is enought space  
                // Set the position of the buttons that should be on the right side of the toolbar
                for (var i = 0; i < this._toolbarButtons.length; i++) {
                    if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Right) {
                        var element = this.getElementByToolbarButtonElementId(this._toolbarButtons[i].id);
                        if (element != undefined) {
                            element.parentElement.style.width = width.toString() + "px";
                            var newPosition = width - (leftButtonCount * buttonWidth) - ((rightButtonCount) * buttonWidth);
                            element.style.left = newPosition.toString() + "px";
                        }
                    }
                }
            }
        };
        /**
         * Returns the number of the visible toolbar buttons on the right side
         *
         * @private
         * @returns {number}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getVisibleToolbarButtonsOnRightSideCount = function () {
            var visibleToolbarButtons = 0;
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Right) {
                    var element = this.getElementByToolbarButtonElementId(this._toolbarButtons[i].id);
                    if (element != undefined) {
                        if (element.style.display != "none") {
                            visibleToolbarButtons++;
                        }
                    }
                }
            }
            return visibleToolbarButtons;
        };
        /**
         * Returns the number of the visible toolbar buttons on the left side
         *
         * @private
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getVisibleToolbarButtonOnLeftSideCount = function () {
            var visibleToolbarButtons = 0;
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Left) {
                    var element = this.getElementByToolbarButtonElementId(this._toolbarButtons[i].id);
                    if (element != undefined) {
                        if (element.style.display != "none") {
                            visibleToolbarButtons++;
                        }
                    }
                }
            }
            return visibleToolbarButtons;
        };
        TreeGridToolbarBase.prototype.getImageStyle = function (toolbarId, imageName) {
            var elementId = this.getElementId(toolbarId);
            return "\n            <style type=\"text/css\">\n            " + elementId + " {\n                background-image: url(" + this.getImagePath(imageName) + ");\n                background-size: 20px 20px;\n                background-repeat: no-repeat;\n                background-position: center center;\n                height: 20px;\n                width: 24px;\n            }\n            </style>";
        };
        TreeGridToolbarBase.prototype.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath(imageName);
        };
        TreeGridToolbarBase.prototype.getDeactivatedIcon = function (icon) {
            return icon.replace(".svg", "_deactivated.svg");
        };
        TreeGridToolbarBase.prototype.getToolbarButton = function (id) {
            return this._toolbarButtons.filter(function (toolbarButton) { return toolbarButton.id == id; })[0];
        };
        /**
         * Returns the HTMLDivElement of the toolbar button for the given id
         *
         * @private
         * @param {string} toolbarButtonId
         * @returns {(HTMLDivElement | undefined)}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getElementByToolbarButtonElementId = function (toolbarButtonId) {
            var id = this.getElementId(toolbarButtonId);
            var mySubDiv = this._widgetMainDiv.querySelector(id);
            if (mySubDiv == null) {
                return undefined;
            }
            return mySubDiv;
        };
        /**
         * Returns the element id incl. "#..."
         *
         * @private
         * @param {string} toolbarId
         * @returns {string}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getElementId = function (toolbarId) {
            return "#" + this._widgetMainDiv.id + "_" + toolbarId;
        };
        /**
         * Returns the ej tree grid object
         *
         * @returns {ej.TreeGrid}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getTreeGridObject = function () {
            return $(this._widgetMainDiv).data("ejTreeGrid");
        };
        TreeGridToolbarBase.defaultToolbarButtonClassName = "toolbarButton";
        TreeGridToolbarBase.defaultToolbarButtonDeactivatedClassName = TreeGridToolbarBase.defaultToolbarButtonClassName + "Deactivated";
        return TreeGridToolbarBase;
    }());
    exports.TreeGridToolbarBase = TreeGridToolbarBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRUb29sYmFyQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQSxJQUFLLHNCQUdKO0lBSEQsV0FBSyxzQkFBc0I7UUFDdkIsbUVBQUksQ0FBQTtRQUNKLHFFQUFLLENBQUE7SUFDVCxDQUFDLEVBSEksc0JBQXNCLEtBQXRCLHNCQUFzQixRQUcxQjtJQW1jNEIsd0RBQXNCO0lBamNsRDtRQW9CRzs7OztXQUlHO1FBQ0gsNkJBQW1CLGFBQTZCO1lBbkJ4QyxzQkFBaUIsR0FBVyxVQUFVLENBQUM7WUFDdkMsb0JBQWUsR0FBVyxRQUFRLENBQUM7WUFFbkMsMkJBQXNCLEdBQVcscUJBQXFCLENBQUM7WUFDdkQseUJBQW9CLEdBQVcsbUJBQW1CLENBQUM7WUFFbkQsb0JBQWUsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxtQ0FBbUMsQ0FBQztZQUU5RyxtQkFBYyxHQUFVLENBQUMsQ0FBQztZQUUxQixrQ0FBNkIsR0FBRyxLQUFLLENBQUM7WUFVMUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztRQUN0RCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSw4Q0FBZ0IsR0FBdkIsVUFBd0IsRUFBVSxFQUFFLE9BQWUsRUFBRSxJQUFZLEVBQUUsS0FBMkQ7WUFBM0Qsc0JBQUEsRUFBQSxRQUFnQyxzQkFBc0IsQ0FBQyxJQUFJO1lBQzFILDhDQUE4QztZQUM5QyxJQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQzthQUNyRDtZQUNE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QWUsQ0FBQztRQUNoRCw0REFBd0MsR0FBRyxtQkFBbUIsQ0FBQyw2QkFBNkIsR0FBRyxhQUFhLENBQUM7UUE2YWhJLDBCQUFDO0tBQUEsQUEvYkEsSUErYkE7SUFFTyxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVG9vbGJhckJ1dHRvbiB9IGZyb20gXCIuL3Rvb2xiYXJCdXR0b25cIjtcclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi90aGVtZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXN0b21Ub29sYmFyQnV0dG9uIH0gZnJvbSBcIi4vY3VzdG9tVG9vbGJhckJ1dHRvblwiO1xyXG5cclxuXHJcbmVudW0gVG9vbGJhckJ1dHRvbkFsaWdubWVudHtcclxuICAgIExlZnQsXHJcbiAgICBSaWdodCxcclxufVxyXG5cclxuIGNsYXNzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcblxyXG4gICAgcHJvdGVjdGVkIF93aWRnZXRNYWluRGl2OiBIVE1MRGl2RWxlbWVudDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdG9vbGJhckJ1dHRvbnM6IEFycmF5PFRvb2xiYXJCdXR0b24+O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9jb2xsYXBzZUJ1dHRvbklkOiBzdHJpbmcgPSBcImNvbGxhcHNlXCI7XHJcbiAgICBwcml2YXRlIF9leHBhbmRCdXR0b25JZDogc3RyaW5nID0gXCJleHBhbmRcIjtcclxuXHJcbiAgICBwcml2YXRlIF9jb2xsYXBzZUJ1dHRvblRvb2xUaXA6IHN0cmluZyA9IFwiQ29sbGFwc2UgYWxsIGNoaWxkc1wiO1xyXG4gICAgcHJpdmF0ZSBfZXhwYW5kQnV0dG9uVG9vbFRpcDogc3RyaW5nID0gXCJFeHBhbmQgYWxsIGNoaWxkc1wiO1xyXG5cclxuICAgIHByaXZhdGUgX2ltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwiY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL3Rvb2xiYXIvXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VMZXZlbDpudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX2RlZmF1bHRCdXR0b25DbGFzc05hbWVJc1VzZWQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc3RhdGljIGRlZmF1bHRUb29sYmFyQnV0dG9uQ2xhc3NOYW1lID0gXCJ0b29sYmFyQnV0dG9uXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0VG9vbGJhckJ1dHRvbkRlYWN0aXZhdGVkQ2xhc3NOYW1lID0gVHJlZUdyaWRUb29sYmFyQmFzZS5kZWZhdWx0VG9vbGJhckJ1dHRvbkNsYXNzTmFtZSArIFwiRGVhY3RpdmF0ZWRcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVHJlZUdyaWRUb29sYmFyQmFzZS5cclxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHdpZGdldE1haW5EaXZcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih3aWRnZXRNYWluRGl2OiBIVE1MRGl2RWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0TWFpbkRpdiA9IHdpZGdldE1haW5EaXY7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhckJ1dHRvbnMgPSBuZXcgQXJyYXk8VG9vbGJhckJ1dHRvbj4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgdG9vbGJhciBidXR0b24gdG8gdGhlIHRvb2xiYXIgYnV0dG9ucyBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIG11c3QgYmUgd2l0aG91dCBzcGFjZXNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b29sdGlwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFthbGlnbj1cImxlZnRcIl1cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRUb29sYmFyQnV0dG9uKGlkOiBzdHJpbmcsIHRvb2x0aXA6IHN0cmluZywgaWNvbjogc3RyaW5nLCBhbGlnbjogVG9vbGJhckJ1dHRvbkFsaWdubWVudCA9IFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuTGVmdCl7XHJcbiAgICAgICAgLy8gYWRkIHRvb2xiYXIgYnV0dG9uIG5lZWRlZCB0byBzaG93IGEgdG9vbGJhclxyXG4gICAgICAgIGlmKGlkLmluZGV4T2YoXCIgXCIpICE9IC0xKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVtcHR5ICcgJyBub3QgYWxsb3dlZCB3aXRoaW4gaWQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90b29sYmFyQnV0dG9ucy5wdXNoKG5ldyBUb29sYmFyQnV0dG9uKGlkLCB0b29sdGlwLCBpY29uLCBhbGlnbikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0Q29sbGFwc2VMZXZlbChsZXZlbDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9jb2xsYXBzZUxldmVsID0gbGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENvbGxhcHNlQnV0dG9uKCl7XHJcbiAgICAgICAgLy8gYWRkIHRvb2xiYXIgYnV0dG9uIGZvciBjb2xsYXBzZVxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zLnB1c2gobmV3IFRvb2xiYXJCdXR0b24odGhpcy5fY29sbGFwc2VCdXR0b25JZCwgdGhpcy5fY29sbGFwc2VCdXR0b25Ub29sVGlwLCB0aGlzLl9pbWFnZURpcmVjdG9yeSArIFwiY29sbGFwc2Uuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuTGVmdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFeHBhbmRCdXR0b24oKXtcclxuICAgICAgICAvLyBhZGQgdG9vbGJhciBidXR0b24gZm9yIGV4cGFuZFxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zLnB1c2gobmV3IFRvb2xiYXJCdXR0b24odGhpcy5fZXhwYW5kQnV0dG9uSWQsIHRoaXMuX2V4cGFuZEJ1dHRvblRvb2xUaXAsIHRoaXMuX2ltYWdlRGlyZWN0b3J5ICsgXCJleHBhbmQuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuTGVmdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlQ29sbGFwc2VCdXR0b24oaGlkZTogYm9vbGVhbil7XHJcbiAgICAgICAgLy8gaGlkZSBjb2xsYXBzZSB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl9jb2xsYXBzZUJ1dHRvbklkLCBoaWRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUV4cGFuZEJ1dHRvbihoaWRlOiBib29sZWFuKXtcclxuICAgICAgICAvLyBoaWRlIGV4cGFuZCB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl9leHBhbmRCdXR0b25JZCwgaGlkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvb2xiYXJDbGljayhhcmdzLCB3aWRnZXQ6IElXaWRnZXQpe31cclxuXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrQmFzZSAoYXJncyl7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRUb29sYmFySWQgPSB0aGlzLmdldENsaWNrZWRUb29sYmFySWQoYXJncy5pdGVtTmFtZSwgYXJncy5tb2RlbC50b29sYmFyU2V0dGluZ3MpO1xyXG4gICAgICAgIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX2NvbGxhcHNlQnV0dG9uSWQpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fY29sbGFwc2VMZXZlbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKS5jb2xsYXBzZUFsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCkuY29sbGFwc2VBdExldmVsKHRoaXMuX2NvbGxhcHNlTGV2ZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fZXhwYW5kQnV0dG9uSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpLmV4cGFuZEFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBFeHBhbmQgb3IgQ29sbGFwc2UgYnV0dG9uIGlzIHNlbGVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0V4cGFuZENvbGxhcHNlU2VsZWN0ZWQgKGFyZ3MpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT09IHRoaXMuX2NvbGxhcHNlQnV0dG9uSWQgfHwgY2xpY2tlZFRvb2xiYXJJZCA9PT0gdGhpcy5fZXhwYW5kQnV0dG9uSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRvb2xiYXIgZGVmaW5pdGlvbiBmb3IgdGhlIHRyZWUgZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDdXN0b21Ub29sYmFyQnV0dG9uW119XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tVG9vbGJhcnMgKCk6Q3VzdG9tVG9vbGJhckJ1dHRvbltde1xyXG4gICAgICAgIGxldCB0b29sYmFyczogQ3VzdG9tVG9vbGJhckJ1dHRvbltdID0gW107XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhckJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJzLnB1c2gobmV3IEN1c3RvbVRvb2xiYXJCdXR0b24oYnV0dG9uLmlkLCBidXR0b24udG9vbHRpcCkpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiB0b29sYmFycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzIHRoZSBidXR0b24gKGUuZy4gc2hvdyB0aGUgXCIuLi5fZGVhY3RpdmF0ZWQuc3ZnIGljb24gaW5zdGVhZCBvZiBcIi4uLi5zdmdcIilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbaXNJY29uXVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNhYmxlQnV0dG9uKGJ1dHRvbklkOnN0cmluZywgZGlzYWJsZTogYm9vbGVhbiwgaXNJY29uPzogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0VG9vbGJhckJ1dHRvbihidXR0b25JZCk7XHJcbiAgICAgICAgaWYoYnV0dG9uID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCdXR0b24gaWQgbm90IGZvdW5kISBpZDogXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gZGlzYWJsZTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25FbGVtZW50SWQoYnV0dG9uLmlkKTtcclxuICAgICAgICBpZihlbGVtZW50ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGljb24gPSBidXR0b24uaWNvbjtcclxuICAgICAgICBpZih0aGlzLl9kZWZhdWx0QnV0dG9uQ2xhc3NOYW1lSXNVc2VkID09IHRydWUpe1xyXG4gICAgICAgICAgICAvLyBTd2l0Y2ggYXV0b21hdGljYWxseSB0byBkZWFjdGl2YXRlZCBpY29uIGlmIGRlZmF1bHQgY2xhc3NuYW1lcyBhcmUgdXNlZCBmb3IgYnV0dG9uc1xyXG4gICAgICAgICAgICBpZihkaXNhYmxlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0ljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5nZXREZWFjdGl2YXRlZEljb24oYnV0dG9uLmljb24pOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShUcmVlR3JpZFRvb2xiYXJCYXNlLmRlZmF1bHRUb29sYmFyQnV0dG9uQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChUcmVlR3JpZFRvb2xiYXJCYXNlLmRlZmF1bHRUb29sYmFyQnV0dG9uRGVhY3RpdmF0ZWRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoVHJlZUdyaWRUb29sYmFyQmFzZS5kZWZhdWx0VG9vbGJhckJ1dHRvbkRlYWN0aXZhdGVkQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChUcmVlR3JpZFRvb2xiYXJCYXNlLmRlZmF1bHRUb29sYmFyQnV0dG9uQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBEb21IZWxwZXIuZGlzYWJsZUVsZW1lbnQoZWxlbWVudCwgZGlzYWJsZSk7XHJcbiAgICAgICAgaWYodGhpcy5fZGVmYXVsdEJ1dHRvbkNsYXNzTmFtZUlzVXNlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgLy8gU3dpdGNoIGF1dG9tYXRpY2FsbHkgdG8gZGVhY3RpdmF0ZWQgaWNvbiBpZiBkZWZhdWx0IGNsYXNzbmFtZXMgYXJlIHVzZWQgZm9yIGJ1dHRvbnNcclxuICAgICAgICAgICAgaWYgKCFpc0ljb24pIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChpY29uKSArIFwiKVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBjbGFzcyBlbnRyeSBpbiBidXR0b24gdG8gc2hvdyBvdGhlciBpY29uXHJcbiAgICAgKiBSZW1vdmVzIG90aGVyIGNsYXNzIG5hbWVzIHdpdGggcHJlZml4IGFuZCBhZGRzIG5ldyBjbGFzcyBuYW1lIHdpdGggcHJlZml4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbk5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVQcmVmaXhcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQnV0dG9uSWNvbihidXR0b25JZDogc3RyaW5nLCBpY29uTmFtZTogc3RyaW5nLCBjbGFzc05hbWVQcmVmaXg6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gQWRkIFwiX1wiIHRvIHByZWZpeFxyXG4gICAgICAgIGNsYXNzTmFtZVByZWZpeCArPSBcIl9cIjtcclxuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5nZXRUb29sYmFyQnV0dG9uKGJ1dHRvbklkKTtcclxuICAgICAgICBpZihidXR0b24gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkJ1dHRvbiBpZCBub3QgZm91bmQhIGlkOiBcIiArIGJ1dHRvbklkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbkVsZW1lbnRJZChidXR0b24uaWQpO1xyXG4gICAgICAgIGlmKGVsZW1lbnQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgaWNvbkVsZW1lbnQgXHJcbiAgICAgICAgbGV0IGljb25FbGVtZW50ID0gZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICBpZihpY29uRWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lc1RvUmVtb3ZlID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoY2xhc3NOYW1lUHJlZml4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lc1RvUmVtb3ZlLnB1c2goY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbGFzc05hbWVzVG9SZW1vdmUuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQhLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZVByZWZpeCArIGljb25OYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyhTaG93cykgdGhlIGJ1dHRvbiB3aXRoIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBoaWRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgaGlkZTogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0VG9vbGJhckJ1dHRvbihidXR0b25JZCk7XHJcbiAgICAgICAgaWYoYnV0dG9uID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCdXR0b24gaWQgbm90IGZvdW5kISBpZDogXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25FbGVtZW50SWQoYnV0dG9uLmlkKTtcclxuICAgICAgICBpZihlbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGhpZGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIHRoZSBidXR0b24gaGlnaGxpZ2h0ZWQgKGUuZyBvcmFuZ2UgYmFja2dyb3VuZClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWN0aXZhdGVCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBidXR0b24gPSB0aGlzLmdldFRvb2xiYXJCdXR0b24oYnV0dG9uSWQpO1xyXG4gICAgICAgIGlmKGJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQnV0dG9uIGlkIG5vdCBmb3VuZCEgaWQ6IFwiICsgYnV0dG9uSWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlUb29sYmFyQnV0dG9uRWxlbWVudElkKGJ1dHRvbi5pZCk7XHJcbiAgICAgICAgaWYoZWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihhY3RpdmF0ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1tYWluLW9yYW5nZSlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWQgb2YgdGhlIHRvb2xiYXIgYnV0dG9uIHRoYXQgd2FzIGNsaWNrZWQuIE9ubHkgaWYgdGhlIHRvb2xiYXIgYnV0dG9uIGlzIG5vdCBkZWFjdGl2YXRlZCFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbFRpcFRleHRcclxuICAgICAqIEBwYXJhbSB7Kn0gdG9vbGJhclNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENsaWNrZWRUb29sYmFySWQodG9vbFRpcFRleHQ6IHN0cmluZywgdG9vbGJhclNldHRpbmdzKTpzdHJpbmd7XHJcbiAgICAgICAgLy8gVE9ETzogd2h5IGl0ZW1OYW1lID09IHRvb2x0aXB0ZXh0IG9mIGN1c3RvbXRvb2xiYXIgYW5kIG5vdCB0aGUgaWQhISFcclxuICAgICAgICAvLyBlai5UcmVlR3JpZC5Ub29sYmFySXRlbXMuQWRkID0gXCJhZGRcIiA9PiB3aWxsIGJlIFwiQWRkXCIgaW4gaXRlbU5hbWUhISFcclxuXHJcbiAgICAgICAgLy8gY3VzdG9tIHRvb2xiYXJcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0wOyBpbmRleCA8IHRvb2xiYXJTZXR0aW5ncy5jdXN0b21Ub29sYmFySXRlbXMubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgaWYodG9vbGJhclNldHRpbmdzLmN1c3RvbVRvb2xiYXJJdGVtc1tpbmRleF0udG9vbHRpcFRleHQgPT0gdG9vbFRpcFRleHQpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5nZXRUb29sYmFyQnV0dG9uKHRvb2xiYXJTZXR0aW5ncy5jdXN0b21Ub29sYmFySXRlbXNbaW5kZXhdLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYnV0dG9uICE9IHVuZGVmaW5lZCAmJiBidXR0b24uZGlzYWJsZWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b29sYmFyU2V0dGluZ3MuY3VzdG9tVG9vbGJhckl0ZW1zW2luZGV4XS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgY2xhc3NOYW1lIHRvIHRoZSB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkVG9vbGJhckJ1dHRvbkNsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAkKHRoaXMuX3dpZGdldE1haW5EaXYpLmFwcGVuZCh0aGlzLmdldEltYWdlU3R5bGUodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQsIHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmljb24pKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCB0b29sYmFyIGNsYXNzIHRvIGVsZW1lbnRcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25FbGVtZW50SWQodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQpO1xyXG4gICAgICAgICAgICBpZihlbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IHRvb2xiYXIgc3RhdGVzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdFRvb2xiYXJTdGF0ZXMoKXtcclxuICAgICAgICAvLyBTZXRzIHRoZSBkZWZhdWx0IHRvb2xiYXIgYnV0dG9uIGNsYXNzIG5hbWVcclxuICAgICAgICB0aGlzLl9kZWZhdWx0QnV0dG9uQ2xhc3NOYW1lSXNVc2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b25DbGFzc05hbWUoVHJlZUdyaWRUb29sYmFyQmFzZS5kZWZhdWx0VG9vbGJhckJ1dHRvbkNsYXNzTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgdGhlIHRvb2xiYXIgdG8gdGhlIGdpdmVuIHdpZHRoXHJcbiAgICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcmlnaHQgYWxpZ25lZCBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzaXplKHdpZHRoOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBidXR0b25XaWR0aCA9IDMxOyAvLyBUT0RPOiBnZXQgMzFweCBmcm9tIGRpdi9zdmdcclxuICAgICAgICBsZXQgbGVmdEJ1dHRvbkNvdW50ID0gdGhpcy5nZXRWaXNpYmxlVG9vbGJhckJ1dHRvbk9uTGVmdFNpZGVDb3VudCgpO1xyXG4gICAgICAgIGxldCByaWdodEJ1dHRvbkNvdW50ID0gdGhpcy5nZXRWaXNpYmxlVG9vbGJhckJ1dHRvbnNPblJpZ2h0U2lkZUNvdW50KCk7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkNvdW50ID0gbGVmdEJ1dHRvbkNvdW50K3JpZ2h0QnV0dG9uQ291bnQ7XHJcbiAgICAgICAgaWYod2lkdGggPiAoYnV0dG9uQ291bnQgKiBidXR0b25XaWR0aCkpeyAvLyBPbmx5IG1vdmUgYnV0dG9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQgaWYgdGhlcmUgaXMgZW5vdWdodCBzcGFjZSAgXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGJ1dHRvbnMgdGhhdCBzaG91bGQgYmUgb24gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHRvb2xiYXJcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLl90b29sYmFyQnV0dG9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5hbGlnbiA9PSBUb29sYmFyQnV0dG9uQWxpZ25tZW50LlJpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbkVsZW1lbnRJZCh0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQhLnN0eWxlLndpZHRoID0gd2lkdGgudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IHdpZHRoIC0gKGxlZnRCdXR0b25Db3VudCpidXR0b25XaWR0aCktKChyaWdodEJ1dHRvbkNvdW50KSpidXR0b25XaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IG5ld1Bvc2l0aW9uLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHRoZSB2aXNpYmxlIHRvb2xiYXIgYnV0dG9ucyBvbiB0aGUgcmlnaHQgc2lkZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRWaXNpYmxlVG9vbGJhckJ1dHRvbnNPblJpZ2h0U2lkZUNvdW50KCk6IG51bWJlcntcclxuICAgICAgICBsZXQgdmlzaWJsZVRvb2xiYXJCdXR0b25zID0gMDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLl90b29sYmFyQnV0dG9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmFsaWduID09IFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuUmlnaHQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25FbGVtZW50SWQodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuc3R5bGUuZGlzcGxheSAhPSBcIm5vbmVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGVUb29sYmFyQnV0dG9ucysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlzaWJsZVRvb2xiYXJCdXR0b25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHRoZSB2aXNpYmxlIHRvb2xiYXIgYnV0dG9ucyBvbiB0aGUgbGVmdCBzaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZpc2libGVUb29sYmFyQnV0dG9uT25MZWZ0U2lkZUNvdW50KCl7XHJcbiAgICAgICAgbGV0IHZpc2libGVUb29sYmFyQnV0dG9ucz0wO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuX3Rvb2xiYXJCdXR0b25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uYWxpZ24gPT0gVG9vbGJhckJ1dHRvbkFsaWdubWVudC5MZWZ0KXtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlUb29sYmFyQnV0dG9uRWxlbWVudElkKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50IS5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZVRvb2xiYXJCdXR0b25zKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2aXNpYmxlVG9vbGJhckJ1dHRvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVN0eWxlKHRvb2xiYXJJZDogc3RyaW5nLCBpbWFnZU5hbWU6c3RyaW5nKXtcclxuICAgICAgICBsZXQgZWxlbWVudElkID0gdGhpcy5nZXRFbGVtZW50SWQodG9vbGJhcklkKTsgXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxyXG4gICAgICAgICAgICBgICsgZWxlbWVudElkICtgIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChgICsgdGhpcy5nZXRJbWFnZVBhdGgoaW1hZ2VOYW1lKSArIGApO1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1zaXplOiAyMHB4IDIwcHg7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvc3R5bGU+YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEltYWdlUGF0aChpbWFnZU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWFjdGl2YXRlZEljb24oaWNvbjogc3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGljb24ucmVwbGFjZShcIi5zdmdcIiwgXCJfZGVhY3RpdmF0ZWQuc3ZnXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VG9vbGJhckJ1dHRvbihpZDogc3RyaW5nKTogVG9vbGJhckJ1dHRvbnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2xiYXJCdXR0b25zLmZpbHRlcih0b29sYmFyQnV0dG9uID0+IHtyZXR1cm4gdG9vbGJhckJ1dHRvbi5pZCA9PSBpZH0pWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgSFRNTERpdkVsZW1lbnQgb2YgdGhlIHRvb2xiYXIgYnV0dG9uIGZvciB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvb2xiYXJCdXR0b25JZFxyXG4gICAgICogQHJldHVybnMgeyhIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25FbGVtZW50SWQodG9vbGJhckJ1dHRvbklkOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldEVsZW1lbnRJZCh0b29sYmFyQnV0dG9uSWQpXHJcbiAgICAgICAgbGV0IG15U3ViRGl2ID0gdGhpcy5fd2lkZ2V0TWFpbkRpdi5xdWVyeVNlbGVjdG9yKGlkKTtcclxuICAgICAgICBpZihteVN1YkRpdiA9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxIVE1MRGl2RWxlbWVudD5teVN1YkRpdjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgaWQgaW5jbC4gXCIjLi4uXCJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvb2xiYXJJZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RWxlbWVudElkKHRvb2xiYXJJZDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIiNcIiArIHRoaXMuX3dpZGdldE1haW5EaXYuaWQgKyBcIl9cIiArIHRvb2xiYXJJZDtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBlaiB0cmVlIGdyaWQgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2VqLlRyZWVHcmlkfVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgZ2V0VHJlZUdyaWRPYmplY3QoKTogZWouVHJlZUdyaWR7XHJcblx0XHRyZXR1cm4gJCh0aGlzLl93aWRnZXRNYWluRGl2KS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtUcmVlR3JpZFRvb2xiYXJCYXNlLCBUb29sYmFyQnV0dG9uQWxpZ25tZW50fTsiXX0=
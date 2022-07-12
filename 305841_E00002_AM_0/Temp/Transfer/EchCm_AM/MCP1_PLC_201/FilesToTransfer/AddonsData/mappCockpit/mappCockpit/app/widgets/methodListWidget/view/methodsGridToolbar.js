define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../common/domHelper", "../../../common/directoryProvider", "../../common/themeProvider", "../../common/customToolbarButton", "./methodsToolbarButton"], function (require, exports, mappCockpitComponent_1, domHelper_1, directoryProvider_1, themeProvider_1, customToolbarButton_1, methodsToolbarButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MethodGridToolbar = /** @class */ (function () {
        function MethodGridToolbar() {
            // Default button id 'Off'
            this.toolbarIdOff = "Off";
            // Default button id 'Abort'
            this.toolbarIdStop = "Abort";
            // Path to image directory
            this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "methodListWidget/style/images/toolbar/";
            // Holds an array of buttons used in the toolbar
            this._buttonList = new Array();
            // False if quickCommand buttons are used
            this._areDefaultButtons = true;
        }
        /**
         * Initialization of toolbar
         *
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.initToolbar = function (widgetMainDiv) {
            this._widgetMainDiv = $(widgetMainDiv);
            this._parentDivId = this._widgetMainDiv[0].id;
            // Clear the button list
            this._buttonList.splice(0, this._buttonList.length);
        };
        /**
         * Get default toolbarButtons
         *
         * @returns {CustomToolbarButton[]}
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.getDefaultToolbarButtons = function () {
            var toolbar = [];
            toolbar.push(new customToolbarButton_1.CustomToolbarButton(this.toolbarIdOff, this.toolbarIdOff));
            toolbar.push(new customToolbarButton_1.CustomToolbarButton(this.toolbarIdStop, this.toolbarIdStop));
            return toolbar;
        };
        /**
         * Define toolbar buttons
         *
         * @param {MappCockpitQuickCommandParameter[]} commands
         * @returns {CustomToolbar[]}
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.getCustomToolbars = function (commands) {
            var toolbar = [];
            if (commands !== undefined && commands.length !== 0) {
                commands.forEach(function (command) {
                    //Text cannot contain spaces
                    var text = command.name.replace(/\s/g, '_');
                    toolbar.push(new customToolbarButton_1.CustomToolbarButton(text, command.tooltip));
                });
            }
            return toolbar;
        };
        /**
         * Dispose the toolbar
         *
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.dispose = function () {
            for (var i = 0; i < this._buttonList.length; i++) {
                this.destroyButton(this._buttonList[i].buttonId);
            }
        };
        /**
         * Add quick commands toolbar buttons
         *
         * @param {string} methodId
         * @param {string} imageName
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.addQuickCommandsToolbarButtons = function (methodId, imageName) {
            this._areDefaultButtons = false;
            var buttonId = this._parentDivId + "_" + methodId.replace(/\s/g, '_');
            var imagePath = this._imageDirectory + imageName + '.svg';
            //Add button to toolbar
            this.addMethodToolbarButton(buttonId, methodId, imagePath, '', '35px');
        };
        /**
         * Add default method toolbar buttons
         *
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.addDefaultToolbarButtons = function () {
            var powerOffIcon = themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/methodListWidget/style/images/toolbar/Off_white.svg");
            var abortCommandIcon = themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/methodListWidget/style/images/toolbar/Stop_white.svg");
            var buttonIdOff = this._parentDivId + "_" + this.toolbarIdOff;
            var buttonIdAbort = this._parentDivId + "_" + this.toolbarIdStop;
            //Add buttons to toolbar
            this.addMethodToolbarButton(buttonIdOff, "Power Off", powerOffIcon, this.toolbarIdOff, "100px");
            this.addMethodToolbarButton(buttonIdAbort, "Abort Command", abortCommandIcon, this.toolbarIdStop, "100px");
        };
        /**
         * Add method toolbar buttons
         *
         * @param {string} buttonId
         * @param {string} methodId
         * @param {string} imagePath
         * @param {string} text
         * @param {string} buttonWidth
         * @param {boolean} defaultButtons
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.addMethodToolbarButton = function (buttonId, methodId, imagePath, text, buttonWidth) {
            var _this = this;
            this._buttonList.push(new methodsToolbarButton_1.MethodsToolbarButton(buttonId, methodId));
            var buttonElement = this._widgetMainDiv.find("#" + buttonId);
            buttonElement.ejButton({
                cssClass: 'methodListToolbarButton',
                text: text,
                contentType: ej.ContentType.TextAndImage,
                width: buttonWidth,
                click: function (args) { return _this.toolbarButtonClick(methodId); },
            });
            this.setButtonImage(buttonId, imagePath);
        };
        /**
         * Defines the image for the button
         *
         * @private
         * @param {string} buttonId
         * @param {string} imagePath
         * @param {string} methodId
         * @param {boolean} defaultButtons
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setButtonImage = function (buttonId, imagePath) {
            try {
                var buttonElement = this._widgetMainDiv.find("#" + buttonId)[0];
                buttonElement.style.backgroundImage = "url(" + imagePath + ")";
            }
            catch (e) {
                // Method is called (it should not) when component tab is closed before component has been completely loaded. 
                // Console error is commented until a more robust fixed is found.
                // console.error('MethodsGridToolbar could not add button :' + buttonId + ', ' + e.message);
            }
        };
        /**
         * Destroys the button object
         *
         * @private
         * @param {string} toolbarId
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.destroyButton = function (toolbarId) {
            var buttonElement = this._widgetMainDiv.find("#" + toolbarId);
            var button = buttonElement.data("ejButton");
            if (button != undefined) {
                button.destroy();
            }
        };
        /**
         * Execute corresponding method when button is clicked
         *
         * @private
         * @param {string} methodId
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.toolbarButtonClick = function (methodId) {
            var method = mappCockpitComponent_1.MappCockpitComponentMethod.find(methodId, this._actualComponentMethods);
            if (method) {
                if (method.isExecutable != undefined && method.isExecutable.value == true) {
                    mappCockpitComponent_1.MappCockpitComponentMethod.execute(method);
                }
            }
        };
        /**
         * Set button state
         *
         * @private
         * @param {string} buttonId
         * @param {boolean} activated
         * @returns
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setButtonState = function (buttonId, activated) {
            // get button instance;
            var buttonElement = this._widgetMainDiv.find("#" + buttonId);
            var button = buttonElement.data("ejButton");
            if (!button) {
                return;
            }
            this.setButtonClass(button, activated);
            domHelper_1.DomHelper.disableElement(buttonElement[0], !activated);
        };
        /**
         * Set specific button class
         *
         * @param {ej.Button} button
         * @param {(boolean | undefined)} activated
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setButtonClass = function (button, activated) {
            if (activated) {
                if (this._areDefaultButtons) {
                    button.option({ cssClass: "methodListToolbarButton" });
                }
                else {
                    button.option({ cssClass: "quickCommandToolbarButton" });
                }
            }
            else {
                if (this._areDefaultButtons) {
                    button.option({ cssClass: "methodListToolbarButtonDeactivated" });
                }
                else {
                    button.option({ cssClass: "quickCommandToolbarButtonDeactivated" });
                }
            }
        };
        /**
         * Set executable methods
         *
         * @param {Array<MappCockpitComponentMethod>} actualComponentMethods
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setActualComponentMethods = function (actualComponentMethods) {
            var _this = this;
            this._actualComponentMethods = actualComponentMethods;
            this._buttonList.forEach(function (button) {
                _this.observeMethodExecutabilityForButtonState(button.methodId, button.buttonId, button);
            });
        };
        /**
         * Update button state when executability is changed
         *
         * @private
         * @param {string} methodId
         * @param {string} buttonId
         * @param {ej.Button} button
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.observeMethodExecutabilityForButtonState = function (methodId, buttonId, button) {
            var _this = this;
            var method = mappCockpitComponent_1.MappCockpitComponentMethod.find(methodId, this._actualComponentMethods);
            if (method) {
                if (method.isExecutable != undefined) {
                    // Set init state of button   
                    this.setButtonState(buttonId, method.isExecutable.value);
                }
                method.isExecutable.changed(function (isExecutable) {
                    // Refresh button state if needed
                    _this.setButtonState(buttonId, isExecutable);
                });
            }
            else {
                this.setButtonState(buttonId, false);
            }
        };
        return MethodGridToolbar;
    }());
    exports.MethodGridToolbar = MethodGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvdmlldy9tZXRob2RzR3JpZFRvb2xiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7UUFBQTtZQUlJLDBCQUEwQjtZQUNULGlCQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3RDLDRCQUE0QjtZQUNYLGtCQUFhLEdBQUcsT0FBTyxDQUFDO1lBQ3pDLDBCQUEwQjtZQUNULG9CQUFlLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsd0NBQXdDLENBQUE7WUFDbkksZ0RBQWdEO1lBQ3hDLGdCQUFXLEdBQUcsSUFBSSxLQUFLLEVBQXdCLENBQUM7WUFLeEQseUNBQXlDO1lBQ2pDLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQWtRdEMsQ0FBQztRQWhRRzs7Ozs7V0FLRztRQUNJLHVDQUFXLEdBQWxCLFVBQW1CLGFBQTZCO1lBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFOUMsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLG9EQUF3QixHQUEvQjtZQUNJLElBQUksT0FBTyxHQUEwQixFQUFFLENBQUM7WUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHlDQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxDQUFDLElBQUksQ0FB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QkFDakMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxDQUFBO2FBQ0w7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEM7UUFDTCxDQUFDO1FBRUwsd0JBQUM7SUFBRCxDQUFDLEFBblJELElBbVJDO0lBblJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90aGVtZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEN1c3RvbVRvb2xiYXJCdXR0b24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2N1c3RvbVRvb2xiYXJCdXR0b25cIjtcclxuaW1wb3J0IHsgTWV0aG9kc1Rvb2xiYXJCdXR0b24gfSBmcm9tIFwiLi9tZXRob2RzVG9vbGJhckJ1dHRvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1ldGhvZEdyaWRUb29sYmFye1xyXG4gICAgXHJcbiAgICAvL0hvbGRzIGFuIGFycmF5IG9mIGV4ZWN1dGFibGUgbWV0aG9kc1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsQ29tcG9uZW50TWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+fHVuZGVmaW5lZDtcclxuICAgIC8vIERlZmF1bHQgYnV0dG9uIGlkICdPZmYnXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJJZE9mZiA9IFwiT2ZmXCI7XHJcbiAgICAvLyBEZWZhdWx0IGJ1dHRvbiBpZCAnQWJvcnQnXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJJZFN0b3AgPSBcIkFib3J0XCI7XHJcbiAgICAvLyBQYXRoIHRvIGltYWdlIGRpcmVjdG9yeVxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJtZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiXHJcbiAgICAvLyBIb2xkcyBhbiBhcnJheSBvZiBidXR0b25zIHVzZWQgaW4gdGhlIHRvb2xiYXJcclxuICAgIHByaXZhdGUgX2J1dHRvbkxpc3QgPSBuZXcgQXJyYXk8TWV0aG9kc1Rvb2xiYXJCdXR0b24+KCk7XHJcbiAgICAvLyBQYXJlbnQgZGl2IGlkXHJcbiAgICBwcml2YXRlIF9wYXJlbnREaXZJZDogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIC8vIFdpZGdldCBtYWluIGRpdlxyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0TWFpbkRpdiE6IEpRdWVyeTxIVE1MRGl2RWxlbWVudD47XHJcbiAgICAvLyBGYWxzZSBpZiBxdWlja0NvbW1hbmQgYnV0dG9ucyBhcmUgdXNlZFxyXG4gICAgcHJpdmF0ZSBfYXJlRGVmYXVsdEJ1dHRvbnMgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb24gb2YgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHdpZGdldE1haW5EaXZcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdFRvb2xiYXIod2lkZ2V0TWFpbkRpdjogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl93aWRnZXRNYWluRGl2ID0gJCh3aWRnZXRNYWluRGl2KTtcclxuICAgICAgICB0aGlzLl9wYXJlbnREaXZJZCA9IHRoaXMuX3dpZGdldE1haW5EaXZbMF0uaWQ7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBidXR0b24gbGlzdFxyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3Quc3BsaWNlKDAsdGhpcy5fYnV0dG9uTGlzdC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGRlZmF1bHQgdG9vbGJhckJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q3VzdG9tVG9vbGJhckJ1dHRvbltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0VG9vbGJhckJ1dHRvbnMoKTpDdXN0b21Ub29sYmFyQnV0dG9uW10ge1xyXG4gICAgICAgIGxldCB0b29sYmFyOiBDdXN0b21Ub29sYmFyQnV0dG9uW10gPSBbXTtcclxuICAgICAgICB0b29sYmFyLnB1c2gobmV3IEN1c3RvbVRvb2xiYXJCdXR0b24odGhpcy50b29sYmFySWRPZmYsIHRoaXMudG9vbGJhcklkT2ZmKSk7XHJcbiAgICAgICAgdG9vbGJhci5wdXNoKG5ldyBDdXN0b21Ub29sYmFyQnV0dG9uKHRoaXMudG9vbGJhcklkU3RvcCwgdGhpcy50b29sYmFySWRTdG9wKSk7XHJcbiAgICAgICAgcmV0dXJuIHRvb2xiYXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lIHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXX0gY29tbWFuZHNcclxuICAgICAqIEByZXR1cm5zIHtDdXN0b21Ub29sYmFyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1c3RvbVRvb2xiYXJzIChjb21tYW5kczogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSk6Q3VzdG9tVG9vbGJhckJ1dHRvbltdeyBcclxuICAgICAgICBsZXQgdG9vbGJhcjogQ3VzdG9tVG9vbGJhckJ1dHRvbltdID0gW107XHJcbiAgICAgICAgaWYgKGNvbW1hbmRzICE9PSB1bmRlZmluZWQgJiYgY29tbWFuZHMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vVGV4dCBjYW5ub3QgY29udGFpbiBzcGFjZXNcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gY29tbWFuZC5uYW1lLnJlcGxhY2UoL1xccy9nLCdfJyk7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFyLnB1c2gobmV3IEN1c3RvbVRvb2xiYXJCdXR0b24odGV4dCwgY29tbWFuZC50b29sdGlwKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0b29sYmFyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fYnV0dG9uTGlzdFtpXS5idXR0b25JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHF1aWNrIGNvbW1hbmRzIHRvb2xiYXIgYnV0dG9ucyBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkUXVpY2tDb21tYW5kc1Rvb2xiYXJCdXR0b25zKG1ldGhvZElkOiBzdHJpbmcsIGltYWdlTmFtZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9hcmVEZWZhdWx0QnV0dG9ucyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uSWQgPSB0aGlzLl9wYXJlbnREaXZJZCAgKyBcIl9cIiArIG1ldGhvZElkLnJlcGxhY2UoL1xccy9nLCdfJyk7XHJcbiAgICAgICAgbGV0IGltYWdlUGF0aCA9IHRoaXMuX2ltYWdlRGlyZWN0b3J5ICsgaW1hZ2VOYW1lICsgJy5zdmcnO1xyXG5cclxuICAgICAgICAvL0FkZCBidXR0b24gdG8gdG9vbGJhclxyXG4gICAgICAgIHRoaXMuYWRkTWV0aG9kVG9vbGJhckJ1dHRvbihidXR0b25JZCwgbWV0aG9kSWQsIGltYWdlUGF0aCwgJycsICczNXB4JylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkZWZhdWx0IG1ldGhvZCB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZmF1bHRUb29sYmFyQnV0dG9ucygpIHtcclxuICAgICAgICBsZXQgcG93ZXJPZmZJY29uID0gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL09mZl93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGFib3J0Q29tbWFuZEljb24gPSBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvU3RvcF93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGJ1dHRvbklkT2ZmID0gdGhpcy5fcGFyZW50RGl2SWQgKyBcIl9cIiArIHRoaXMudG9vbGJhcklkT2ZmO1xyXG4gICAgICAgIGxldCBidXR0b25JZEFib3J0ID0gdGhpcy5fcGFyZW50RGl2SWQgKyBcIl9cIiArIHRoaXMudG9vbGJhcklkU3RvcDtcclxuXHJcbiAgICAgICAgLy9BZGQgYnV0dG9ucyB0byB0b29sYmFyXHJcbiAgICAgICAgdGhpcy5hZGRNZXRob2RUb29sYmFyQnV0dG9uKGJ1dHRvbklkT2ZmLCBcIlBvd2VyIE9mZlwiLCBwb3dlck9mZkljb24sIHRoaXMudG9vbGJhcklkT2ZmLCBcIjEwMHB4XCIpO1xyXG4gICAgICAgIHRoaXMuYWRkTWV0aG9kVG9vbGJhckJ1dHRvbihidXR0b25JZEFib3J0LCBcIkFib3J0IENvbW1hbmRcIiwgYWJvcnRDb21tYW5kSWNvbiwgdGhpcy50b29sYmFySWRTdG9wLCBcIjEwMHB4XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG1ldGhvZCB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlUGF0aFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25XaWR0aFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWZhdWx0QnV0dG9uc1xyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRNZXRob2RUb29sYmFyQnV0dG9uKGJ1dHRvbklkOiBzdHJpbmcsIG1ldGhvZElkOiBzdHJpbmcsIGltYWdlUGF0aDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGJ1dHRvbldpZHRoOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3QucHVzaChuZXcgTWV0aG9kc1Rvb2xiYXJCdXR0b24oYnV0dG9uSWQsIG1ldGhvZElkKSk7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl93aWRnZXRNYWluRGl2LmZpbmQoXCIjXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAnbWV0aG9kTGlzdFRvb2xiYXJCdXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dEFuZEltYWdlLFxyXG4gICAgICAgICAgICB3aWR0aDogYnV0dG9uV2lkdGgsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4gdGhpcy50b29sYmFyQnV0dG9uQ2xpY2sobWV0aG9kSWQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uSW1hZ2UoYnV0dG9uSWQsIGltYWdlUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBpbWFnZSBmb3IgdGhlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVBhdGhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWZhdWx0QnV0dG9uc1xyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uSW1hZ2UoYnV0dG9uSWQ6IHN0cmluZywgaW1hZ2VQYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9IHRoaXMuX3dpZGdldE1haW5EaXYuZmluZChcIiNcIiArIGJ1dHRvbklkKVswXTtcclxuICAgICAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGltYWdlUGF0aCArXCIpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgLy8gTWV0aG9kIGlzIGNhbGxlZCAoaXQgc2hvdWxkIG5vdCkgd2hlbiBjb21wb25lbnQgdGFiIGlzIGNsb3NlZCBiZWZvcmUgY29tcG9uZW50IGhhcyBiZWVuIGNvbXBsZXRlbHkgbG9hZGVkLiBcclxuICAgICAgICAgICAgLy8gQ29uc29sZSBlcnJvciBpcyBjb21tZW50ZWQgdW50aWwgYSBtb3JlIHJvYnVzdCBmaXhlZCBpcyBmb3VuZC5cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ01ldGhvZHNHcmlkVG9vbGJhciBjb3VsZCBub3QgYWRkIGJ1dHRvbiA6JyArIGJ1dHRvbklkICsgJywgJyArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc3Ryb3lzIHRoZSBidXR0b24gb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b29sYmFySWRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lCdXR0b24odG9vbGJhcklkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gdGhpcy5fd2lkZ2V0TWFpbkRpdi5maW5kKFwiI1wiICsgdG9vbGJhcklkKTtcclxuICAgICAgICBsZXQgYnV0dG9uID0gYnV0dG9uRWxlbWVudC5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgaWYoYnV0dG9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZSBjb3JyZXNwb25kaW5nIG1ldGhvZCB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdG9vbGJhckJ1dHRvbkNsaWNrKG1ldGhvZElkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBtZXRob2QgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5maW5kKG1ldGhvZElkLCB0aGlzLl9hY3R1YWxDb21wb25lbnRNZXRob2RzKTtcclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGlmKG1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkICYmIG1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKG1ldGhvZCk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYnV0dG9uIHN0YXRlIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZhdGVkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3RhdGUoYnV0dG9uSWQ6IHN0cmluZywgYWN0aXZhdGVkOiBib29sZWFuIHwgdW5kZWZpbmVkKXtcclxuICAgICAgICAvLyBnZXQgYnV0dG9uIGluc3RhbmNlO1xyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gdGhpcy5fd2lkZ2V0TWFpbkRpdi5maW5kKFwiI1wiICsgYnV0dG9uSWQpO1xyXG4gICAgICAgIGxldCBidXR0b24gPSBidXR0b25FbGVtZW50LmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZighYnV0dG9uKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEJ1dHRvbkNsYXNzKGJ1dHRvbiwgYWN0aXZhdGVkKVxyXG4gICAgICAgIFxyXG4gICAgICAgIERvbUhlbHBlci5kaXNhYmxlRWxlbWVudChidXR0b25FbGVtZW50WzBdLCAhYWN0aXZhdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzcGVjaWZpYyBidXR0b24gY2xhc3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2VqLkJ1dHRvbn0gYnV0dG9uXHJcbiAgICAgKiBAcGFyYW0geyhib29sZWFuIHwgdW5kZWZpbmVkKX0gYWN0aXZhdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgc2V0QnV0dG9uQ2xhc3MoYnV0dG9uOiBlai5CdXR0b24sIGFjdGl2YXRlZDogYm9vbGVhbiB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKGFjdGl2YXRlZCl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcmVEZWZhdWx0QnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLm9wdGlvbih7Y3NzQ2xhc3M6IFwibWV0aG9kTGlzdFRvb2xiYXJCdXR0b25cIn0pO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5vcHRpb24oe2Nzc0NsYXNzOiBcInF1aWNrQ29tbWFuZFRvb2xiYXJCdXR0b25cIn0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcmVEZWZhdWx0QnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLm9wdGlvbih7Y3NzQ2xhc3M6IFwibWV0aG9kTGlzdFRvb2xiYXJCdXR0b25EZWFjdGl2YXRlZFwifSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24ub3B0aW9uKHtjc3NDbGFzczogXCJxdWlja0NvbW1hbmRUb29sYmFyQnV0dG9uRGVhY3RpdmF0ZWRcIn0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGV4ZWN1dGFibGUgbWV0aG9kc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+fSBhY3R1YWxDb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEFjdHVhbENvbXBvbmVudE1ldGhvZHMoYWN0dWFsQ29tcG9uZW50TWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxDb21wb25lbnRNZXRob2RzID0gYWN0dWFsQ29tcG9uZW50TWV0aG9kcztcclxuICAgICAgICB0aGlzLl9idXR0b25MaXN0LmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eUZvckJ1dHRvblN0YXRlKGJ1dHRvbi5tZXRob2RJZCwgYnV0dG9uLmJ1dHRvbklkLCBidXR0b24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGJ1dHRvbiBzdGF0ZSB3aGVuIGV4ZWN1dGFiaWxpdHkgaXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZFxyXG4gICAgICogQHBhcmFtIHtlai5CdXR0b259IGJ1dHRvblxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHlGb3JCdXR0b25TdGF0ZShtZXRob2RJZDogc3RyaW5nLCBidXR0b25JZDogc3RyaW5nLCBidXR0b246IE1ldGhvZHNUb29sYmFyQnV0dG9uKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9ICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5maW5kKG1ldGhvZElkLCB0aGlzLl9hY3R1YWxDb21wb25lbnRNZXRob2RzKTtcclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGlmKG1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBpbml0IHN0YXRlIG9mIGJ1dHRvbiAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZShidXR0b25JZCwgbWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS5jaGFuZ2VkKChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIGJ1dHRvbiBzdGF0ZSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGUoYnV0dG9uSWQsIGlzRXhlY3V0YWJsZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGUoYnV0dG9uSWQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19
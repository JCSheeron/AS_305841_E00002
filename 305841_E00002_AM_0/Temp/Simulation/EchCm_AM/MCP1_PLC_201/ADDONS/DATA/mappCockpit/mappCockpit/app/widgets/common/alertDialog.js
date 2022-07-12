define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var messageBoxType;
    (function (messageBoxType) {
        messageBoxType[messageBoxType["CancelDelete"] = 0] = "CancelDelete";
        messageBoxType[messageBoxType["YesNo"] = 1] = "YesNo";
        messageBoxType[messageBoxType["Warning"] = 2] = "Warning";
    })(messageBoxType = exports.messageBoxType || (exports.messageBoxType = {}));
    var AlertDialog = /** @class */ (function () {
        function AlertDialog() {
            this._activeElement = document.activeElement;
        }
        /**
         * Creates a warning message box
         *
         * @param {string} header
         * @param {string} message
         * @param {messageBoxType} type
         * @param {(JQuery.Deferred<any, any, any> | undefined)} deferred
         * @returns
         * @memberof AlertDialog
         */
        AlertDialog.prototype.createMessageBox = function (header, message, type, deferred) {
            this._createMessageBox(header, message);
            this.createButtons(type, deferred);
            $(this._activeElement).blur();
            this.handleEvents();
        };
        AlertDialog.prototype._createMessageBox = function (header, message) {
            var ALERT_TITLE = header;
            var d = document;
            if (d.getElementById("modalContainer")) {
                return;
            }
            var mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
            mObj.id = "modalContainer";
            mObj.style.height = d.documentElement.scrollHeight + "px";
            var alertObj = mObj.appendChild(d.createElement("div"));
            alertObj.id = "alertBox";
            if (d.all /*&& !window.opera*/) {
                alertObj.style.top = document.documentElement.scrollTop + "px";
            }
            alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
            alertObj.style.visibility = "visible";
            alertObj.style.display = "block";
            var h1 = alertObj.appendChild(d.createElement("h1"));
            h1.appendChild(d.createTextNode(ALERT_TITLE));
            var img = alertObj.appendChild(d.createElement("img"));
            img.src = './widgets/common/style/images/messageBox/warning.svg';
            var container = alertObj.appendChild(d.createElement("div"));
            container.id = 'containerMsgBox';
            container.style.display = 'flow-root';
            var msg = container.appendChild(d.createElement("p"));
            msg.innerHTML = message;
        };
        /**
         * Creates buttons for the message box
         *
         * @private
         * @param {*} container
         * @param {*} type
         * @param {(JQuery.Deferred<any, any, any> | undefined)} deferred
         * @memberof AlertDialog
         */
        AlertDialog.prototype.createButtons = function (type, deferred) {
            var _this = this;
            var buttonsData = this.getButtonData(type);
            var container = document.getElementById('containerMsgBox');
            var btn1 = container.appendChild(document.createElement("div"));
            btn1.classList.add('msgButton', 'highlighted');
            btn1.style.left = '111px';
            btn1.appendChild(document.createTextNode('Ok'));
            btn1.onclick = function () {
                _this.removeMessageBox();
                if (deferred != undefined) {
                    deferred.resolve();
                }
                return false;
            };
            if (buttonsData.number == 2) {
                btn1.innerText = buttonsData.text[0];
                btn1.style.left = '56px';
                var btn2 = container.appendChild(document.createElement("div"));
                btn2.classList.add('msgButton', 'notMain');
                btn2.style.left = '166px';
                btn2.appendChild(document.createTextNode(buttonsData.text[1]));
                btn2.onclick = function () {
                    _this.removeMessageBox();
                    return false;
                };
            }
        };
        AlertDialog.prototype.keyActions = function (e) {
            if (e.keyCode == 13) { //key enter
                var btn = document.getElementsByClassName('highlighted')[0];
                $(btn).click();
            }
            else if (e.keyCode == 27) { //key escape
                this.removeMessageBox();
            }
            else if (e.keyCode == 37 || e.keyCode == 39) { //right left arrow keys
                //Currently just working for 1 or 2 buttons
                var buttons = document.getElementsByClassName('msgButton');
                if (buttons.length > 1) {
                    for (var i = 0; i < buttons.length; i++) {
                        if (buttons[i].classList.value.includes('highlighted')) {
                            buttons[i].classList.remove('highlighted');
                        }
                        else {
                            buttons[i].classList.add('highlighted');
                        }
                    }
                }
            }
        };
        /**
         * Gets button information according to the type of message box
         *
         * @private
         * @param {messageBoxType} type
         * @returns
         * @memberof AlertDialog
         */
        AlertDialog.prototype.getButtonData = function (type) {
            var btnData = {
                number: 1,
                text: new Array(),
            };
            switch (type) {
                case messageBoxType.CancelDelete: {
                    btnData.number = 2;
                    btnData.text[0] = 'Delete';
                    btnData.text[1] = 'Cancel';
                    return btnData;
                }
                case messageBoxType.YesNo: {
                    btnData.number = 2;
                    btnData.text[0] = 'Yes';
                    btnData.text[1] = 'No';
                    return btnData;
                }
                case messageBoxType.Warning: {
                    btnData.number = 1;
                    btnData.text[0] = 'Ok';
                    return btnData;
                }
            }
        };
        AlertDialog.prototype.handleEvents = function () {
            this.focusOut = this.focusOut.bind(this);
            this.keyActions = this.keyActions.bind(this);
            document.addEventListener('keydown', this.keyActions);
            this._activeElement.addEventListener('focusin', this.focusOut);
        };
        AlertDialog.prototype.focusOut = function () {
            $(document.activeElement).blur();
        };
        /**
         * Removes message box
         *
         * @private
         * @memberof AlertDialog
         */
        AlertDialog.prototype.removeMessageBox = function () {
            document.removeEventListener('keydown', this.keyActions);
            this._activeElement.removeEventListener('focusin', this.focusOut);
            $(this._activeElement).focus();
            document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
        };
        return AlertDialog;
    }());
    exports.AlertDialog = AlertDialog;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnREaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2FsZXJ0RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLElBQVksY0FJWDtJQUpELFdBQVksY0FBYztRQUN0QixtRUFBWSxDQUFBO1FBQ1oscURBQUssQ0FBQTtRQUNMLHlEQUFPLENBQUE7SUFDWCxDQUFDLEVBSlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFJekI7SUFFRDtRQUlJO1lBRlEsbUJBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBR2hELENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxzQ0FBZ0IsR0FBaEIsVUFBaUIsTUFBYyxFQUFFLE9BQWUsRUFBRSxJQUFvQixFQUFFLFFBQW9EO1lBQ3hILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUvQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUVPLHVDQUFpQixHQUF6QixVQUEwQixNQUFjLEVBQUUsT0FBZTtZQUNyRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ2pCLElBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO2dCQUNqQyxPQUFPO2FBQ1g7WUFDRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZ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LENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLENBQUM7UUFDckcsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQW5MRCxJQW1MQztJQW5MWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZW51bSBtZXNzYWdlQm94VHlwZSB7XHJcbiAgICBDYW5jZWxEZWxldGUsXHJcbiAgICBZZXNObyxcclxuICAgIFdhcm5pbmdcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFsZXJ0RGlhbG9ne1xyXG4gICAgICAgIFxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSB3YXJuaW5nIG1lc3NhZ2UgYm94XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSB7bWVzc2FnZUJveFR5cGV9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7KEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiB8IHVuZGVmaW5lZCl9IGRlZmVycmVkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEFsZXJ0RGlhbG9nXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZU1lc3NhZ2VCb3goaGVhZGVyOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgdHlwZTogbWVzc2FnZUJveFR5cGUsIGRlZmVycmVkOiBKUXVlcnkuRGVmZXJyZWQ8YW55LCBhbnksIGFueT4gfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9jcmVhdGVNZXNzYWdlQm94KGhlYWRlciwgbWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKHR5cGUsIGRlZmVycmVkKTtcclxuICAgICAgICAkKHRoaXMuX2FjdGl2ZUVsZW1lbnQhKS5ibHVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVNZXNzYWdlQm94KGhlYWRlcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgQUxFUlRfVElUTEUgPSBoZWFkZXI7XHJcbiAgICAgICAgbGV0IGQgPSBkb2N1bWVudDtcclxuICAgICAgICBpZihkLmdldEVsZW1lbnRCeUlkKFwibW9kYWxDb250YWluZXJcIikpe1xyXG4gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbU9iaiA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgbU9iai5pZCA9IFwibW9kYWxDb250YWluZXJcIjtcclxuICAgICAgICBtT2JqLnN0eWxlLmhlaWdodCA9IGQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYWxlcnRPYmogPSBtT2JqLmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgYWxlcnRPYmouaWQgPSBcImFsZXJ0Qm94XCI7XHJcbiAgICAgICAgaWYoZC5hbGwgLyomJiAhd2luZG93Lm9wZXJhKi8pe1xyXG4gICAgICAgICAgICBhbGVydE9iai5zdHlsZS50b3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBhbGVydE9iai5zdHlsZS5sZWZ0ID0gKGQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIC0gYWxlcnRPYmoub2Zmc2V0V2lkdGgpLzIgKyBcInB4XCI7XHJcbiAgICAgICAgYWxlcnRPYmouc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgIGFsZXJ0T2JqLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblxyXG4gICAgICAgIGxldCBoMSA9IGFsZXJ0T2JqLmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudChcImgxXCIpKTtcclxuICAgICAgICBoMS5hcHBlbmRDaGlsZChkLmNyZWF0ZVRleHROb2RlKEFMRVJUX1RJVExFKSk7XHJcblxyXG4gICAgICAgIGxldCBpbWcgPSBhbGVydE9iai5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoXCJpbWdcIikpO1xyXG4gICAgICAgIGltZy5zcmMgPSAnLi93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvbWVzc2FnZUJveC93YXJuaW5nLnN2Zyc7XHJcblxyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBhbGVydE9iai5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pZCA9ICdjb250YWluZXJNc2dCb3gnO1xyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Zsb3ctcm9vdCc7XHJcblxyXG4gICAgICAgIGxldCBtc2cgPSBjb250YWluZXIuYXBwZW5kQ2hpbGQoZC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XHJcbiAgICAgICAgbXNnLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGJ1dHRvbnMgZm9yIHRoZSBtZXNzYWdlIGJveFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRhaW5lclxyXG4gICAgICogQHBhcmFtIHsqfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyhKUXVlcnkuRGVmZXJyZWQ8YW55LCBhbnksIGFueT4gfCB1bmRlZmluZWQpfSBkZWZlcnJlZFxyXG4gICAgICogQG1lbWJlcm9mIEFsZXJ0RGlhbG9nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9ucyh0eXBlLCBkZWZlcnJlZDogSlF1ZXJ5LkRlZmVycmVkPGFueSwgYW55LCBhbnk+IHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbnNEYXRhID0gdGhpcy5nZXRCdXR0b25EYXRhKHR5cGUpO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyTXNnQm94Jyk7XHJcbiAgICAgICAgbGV0IGJ0bjEgPSBjb250YWluZXIhLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG5cclxuICAgICAgICBidG4xLmNsYXNzTGlzdC5hZGQoJ21zZ0J1dHRvbicsICdoaWdobGlnaHRlZCcpXHJcbiAgICAgICAgYnRuMS5zdHlsZS5sZWZ0ID0gJzExMXB4JztcclxuICAgICAgICBidG4xLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdPaycpKTtcclxuICAgICAgICBidG4xLm9uY2xpY2sgPSAoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1lc3NhZ2VCb3goKTtcclxuICAgICAgICAgICAgaWYgKGRlZmVycmVkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChidXR0b25zRGF0YS5udW1iZXIgPT0gMikge1xyXG4gICAgICAgICAgICBidG4xLmlubmVyVGV4dCA9IGJ1dHRvbnNEYXRhLnRleHRbMF07XHJcbiAgICAgICAgICAgIGJ0bjEuc3R5bGUubGVmdCA9ICc1NnB4JztcclxuICAgICAgICAgICAgbGV0IGJ0bjIgPSBjb250YWluZXIhLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgICAgICBidG4yLmNsYXNzTGlzdC5hZGQoJ21zZ0J1dHRvbicsICdub3RNYWluJyk7XHJcbiAgICAgICAgICAgIGJ0bjIuc3R5bGUubGVmdCA9ICcxNjZweCc7XHJcbiAgICAgICAgICAgIGJ0bjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnV0dG9uc0RhdGEudGV4dFsxXSkpO1xyXG4gICAgICAgICAgICBidG4yLm9uY2xpY2sgPSAoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVNZXNzYWdlQm94KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUga2V5QWN0aW9ucyhlOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAxMykgeyAvL2tleSBlbnRlclxyXG4gICAgICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGlnaGxpZ2h0ZWQnKVswXTtcclxuICAgICAgICAgICAgJChidG4pLmNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PSAyNykgeyAvL2tleSBlc2NhcGVcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVNZXNzYWdlQm94KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzNyB8fCBlLmtleUNvZGUgPT0gMzkpIHsgLy9yaWdodCBsZWZ0IGFycm93IGtleXNcclxuICAgICAgICAgICAgLy9DdXJyZW50bHkganVzdCB3b3JraW5nIGZvciAxIG9yIDIgYnV0dG9uc1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21zZ0J1dHRvbicpO1xyXG4gICAgICAgICAgICBpZiAoYnV0dG9ucy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uc1tpXS5jbGFzc0xpc3QudmFsdWUuaW5jbHVkZXMoJ2hpZ2hsaWdodGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uc1tpXS5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBidXR0b24gaW5mb3JtYXRpb24gYWNjb3JkaW5nIHRvIHRoZSB0eXBlIG9mIG1lc3NhZ2UgYm94XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bWVzc2FnZUJveFR5cGV9IHR5cGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQWxlcnREaWFsb2dcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRCdXR0b25EYXRhKHR5cGU6IG1lc3NhZ2VCb3hUeXBlKSB7XHJcbiAgICAgICAgbGV0IGJ0bkRhdGEgPSB7XHJcbiAgICAgICAgICAgIG51bWJlcjogMSxcclxuICAgICAgICAgICAgdGV4dDogbmV3IEFycmF5PHN0cmluZz4oKSxcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgbWVzc2FnZUJveFR5cGUuQ2FuY2VsRGVsZXRlOiB7XHJcbiAgICAgICAgICAgICAgICBidG5EYXRhLm51bWJlciA9IDI7XHJcbiAgICAgICAgICAgICAgICBidG5EYXRhLnRleHRbMF0gPSAnRGVsZXRlJztcclxuICAgICAgICAgICAgICAgIGJ0bkRhdGEudGV4dFsxXSA9ICdDYW5jZWwnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ0bkRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBtZXNzYWdlQm94VHlwZS5ZZXNObzoge1xyXG4gICAgICAgICAgICAgICAgYnRuRGF0YS5udW1iZXIgPSAyO1xyXG4gICAgICAgICAgICAgICAgYnRuRGF0YS50ZXh0WzBdID0gJ1llcyc7XHJcbiAgICAgICAgICAgICAgICBidG5EYXRhLnRleHRbMV0gPSAnTm8nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ0bkRhdGE7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbWVzc2FnZUJveFR5cGUuV2FybmluZzoge1xyXG4gICAgICAgICAgICAgICAgYnRuRGF0YS5udW1iZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnRuRGF0YS50ZXh0WzBdID0gJ09rJztcclxuICAgICAgICAgICAgICAgIHJldHVybiBidG5EYXRhOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLmZvY3VzT3V0ID0gdGhpcy5mb2N1c091dC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMua2V5QWN0aW9ucyA9IHRoaXMua2V5QWN0aW9ucy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleUFjdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQhLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLmZvY3VzT3V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvY3VzT3V0KCl7XHJcbiAgICAgICAgJChkb2N1bWVudC5hY3RpdmVFbGVtZW50ISkuYmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBtZXNzYWdlIGJveFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQWxlcnREaWFsb2dcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVNZXNzYWdlQm94KCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleUFjdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLmZvY3VzT3V0KTtcclxuICAgICAgICAkKHRoaXMuX2FjdGl2ZUVsZW1lbnQhKS5mb2N1cygpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsQ29udGFpbmVyXCIpISk7XHJcbiAgICB9XHJcbn0iXX0=
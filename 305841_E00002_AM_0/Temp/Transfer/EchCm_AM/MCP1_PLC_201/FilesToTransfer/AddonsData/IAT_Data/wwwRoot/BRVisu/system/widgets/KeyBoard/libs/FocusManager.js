define(['brease/events/BreaseEvent'],
    function (BreaseEvent) {

        'use strict';
        function FocusManager() {
            var self = this,
                cursor;

            self.init = function (eventDispatcher, widget, sharedCursor) {
                cursor = sharedCursor;
                self.widget = widget;
                self.eventDispatcher = eventDispatcher;
                self.eventDispatcher.addEventListener('Keyboard.Hide', self.onHide);
                self.eventDispatcher.addEventListener('Keyboard.Show', self.onShow);
                self.eventDispatcher.addEventListener('Input.Focus', self.inputFocus);
                self.inputEl = widget.inputEl;
                self.inputElem = widget.inputElem;
            };

            self.onShow = function () {
                self.inputEl.one('focusout', function (e) {
                    _setFocus.call(self, cursor.pos);
                });
                self.inputEl.on('click', function (e) {
                    cursor.pos = self.inputElem.selectionStart;
                });
                _setInitialFocus.call(self);
            };

            self.onHide = function () {
                self.inputBlur();
                self.inputEl.off('click');
            };

            self.dispose = function () {
                self.eventDispatcher.removeEventListener('Keyboard.Hide', self.onHide);
                self.eventDispatcher.removeEventListener('Keyboard.Show', self.onShow);
                self.eventDispatcher.removeEventListener('Input.Focus', self.inputFocus);
                self.inputEl.off();
                self.inputEl = null;
                self.inputElem = null;
                self.widget = null;
            };

            self.inputFocus = function () {
                _setFocus.call(self, cursor.pos);
            };

            self.inputBlur = function () {
                self.inputEl.blur(); 
            };
        }

        function _setFocus(pos) {
            if (this.widget && this.widget.data && this.widget.data.open === true) {
                if (this.inputElem && this.inputElem !== document.activeElement) {
                    // correct order: first the focus, then the cursor (setSelectionRange)
                    this.inputEl.focus();
                    this.inputElem.setSelectionRange(pos, pos);
                }
            }
        }

        function _setInitialFocus() { 
            var instance = this,
                pos = this.inputElem.value.length;
                
            // following delay of setSelectionRange is due to the behavior of iPad
            // order is as in setFocus: first the focus, then the cursor (setSelectionRange)
            this.inputEl.one('focusin', function () {
                instance.inputElem.setSelectionRange(pos, pos);
            });
            this.inputEl.focus();
        }
        
        return FocusManager;
    });

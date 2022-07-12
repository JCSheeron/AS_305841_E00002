define(['widgets/brease/Window/Window',
    'brease/controller/PopUpManager',
    'brease/events/BreaseEvent',
    'system/widgets/common/keyboards/NodeInfo', 
    'system/widgets/common/keyboards/Docking',
    'system/widgets/common/keyboards/KeyboardType'],
function (SuperClass, PopUpManager, BreaseEvent, NodeInfo, Docking, KeyboardType) {

    'use strict';

    /**
    * @class system.widgets.KeyBoard
    * @extends widgets.brease.Window
    *
    * @iatMeta studio:visible
    * false
    * @iatMeta category:Category
    * System
    */

    var defaultSettings = {
            modal: true,
            showCloseButton: false,
            forceInteraction: false
        },

        WidgetClass = SuperClass.extend(function KeyBoardBase(elem, options, deferredInit, inherited) {
            if (inherited === true) {
                SuperClass.call(this, null, null, true, true);
            } else {
                SuperClass.call(this, elem, options, false, true);
            }

        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        this.data = { open: false };
        this.settings.windowType = 'KeyBoard';
        this.nodeInfo = new NodeInfo(this);
        SuperClass.prototype.init.apply(this, arguments);
    };

    p.show = function (options, refElement) {
        options = Docking.applyConfig(KeyboardType.ALPHANUMERIC, options);
        SuperClass.prototype.show.call(this, options, refElement);
        if (!this.inputEl) {
            this.inputEl = this.el.find('.ValueOutput');
        }
        this.nodeInfo.show(options);
        addListeners.call(this);
        this.data.open = true;
    };

    p.hide = function () {
        this.data.open = false;
        removeListeners.call(this);
        SuperClass.prototype.hide.apply(this, arguments);
    };

    p.dispose = function () {
        removeListeners.call(this);
        this.nodeInfo.dispose();
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p.inputFocus = function () {
        this.inputEl.focus();
    };

    p.inputBlur = function () {
        this.inputEl.blur();
    };

    p.langChangeHandler = function () {
        // close keyboard if the language changes
        this.hide();
    };

    p._keyDownHandler = function (e) {
        if (brease.config.visu.keyboardOperation && e.key === 'Escape') {
            this.hide();
        }
    };

    function overlayOpenHandler() {
        // remove focus of input field
        // otherwise it would be possible to enter characters under the MessageBox via hard keyboard
        this.inputBlur();
    }

    function overlayCloseHandler() {
        // set focus back if all MessageBoxes are closed
        if (PopUpManager.getNumberOfWindowsOfType('MessageBox') === 0) {
            this.inputFocus();
        }
    }

    function dialogOpenHandler() {
        // close keyboard if a dialog is opened
        this.hide();
    }

    function addListeners() {
        document.body.addEventListener(BreaseEvent.DIALOG_OPEN, this._bind(dialogOpenHandler));
        document.body.addEventListener(BreaseEvent.CLOSED, this._bind(overlayCloseHandler));
        document.body.addEventListener(BreaseEvent.WINDOW_SHOW, this._bind(overlayOpenHandler));
        document.body.addEventListener('keydown', this._bind('_keyDownHandler'));
    }

    function removeListeners() {
        document.body.removeEventListener(BreaseEvent.DIALOG_OPEN, this._bind(dialogOpenHandler));
        document.body.removeEventListener(BreaseEvent.CLOSED, this._bind(overlayCloseHandler));
        document.body.removeEventListener(BreaseEvent.WINDOW_SHOW, this._bind(overlayOpenHandler));
        document.body.removeEventListener('keydown', this._bind('_keyDownHandler'));
    }

    return WidgetClass;

});

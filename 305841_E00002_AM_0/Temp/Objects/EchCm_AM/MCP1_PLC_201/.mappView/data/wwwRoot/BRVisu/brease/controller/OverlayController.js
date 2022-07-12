define(['brease/events/BreaseEvent',
    'brease/core/Utils',
    'brease/enum/Enum',
    'brease/core/Types',
    'brease/model/VisuModel',
    'brease/controller/FileManager',
    'brease/controller/libs/ContentHelper',
    'system/widgets/ChangePasswordDialog/ChangePasswordDialog'],
function (BreaseEvent, Utils, Enum, Types, visuModel, fileManager, contentHelper, ChangePasswordDialog) {

    'use strict';

    /**
    * @class brease.controller.OverlayController
    * @extends core.javascript.Object
    * Main controller to show and hide Messageboxes and Dialogs
    * 
    * @singleton
    */

    var DialogWindow,
        MessageBox,
        defaults = {
            openDialog: {
                horizontalPos: 'center',
                verticalPos: 'middle',
                mode: 'modal',
                autoClose: false,
                autoRaise: Enum.AutoRaise.ENABLED
            },
            openDialogAtTarget: {
                horizontalPos: 'right',
                verticalPos: 'top',
                horDialogAlignment: 'left',
                verDialogAlignment: 'top',
                mode: 'modeless',
                autoClose: false,
                autoRaise: Enum.AutoRaise.ENABLED
            }
        },
        controller = {
            defaults: defaults,
            init: function () {

                this.ready = $.Deferred();
                this.ChangePasswordDialogClass = ChangePasswordDialog;

                var systemWidgets = ['widgets/brease/DialogWindow/DialogWindow', 'widgets/brease/MessageBox/MessageBox', 'widgets/brease/DateTimePicker/DateTimePicker', 'system/widgets/ContentLoader/ContentLoader'];
                fileManager.loadOverlays(systemWidgets).done(function (DialogWindowClass, MessageBoxClass) {
                    DialogWindow = DialogWindowClass;
                    MessageBox = MessageBoxClass;
                    _messageBoxPool.push({
                        widget: new MessageBox(),
                        used: false,
                        type: 'MessageBox'
                    });
                    _messageBoxPool.push({
                        widget: new DialogWindow(),
                        used: false,
                        type: 'DialogWindow'
                    });
                    controller.ready.resolve();
                }).fail(errorHandler);

                return this.ready.promise();
            },

            /**
            * @method showMessageBox
            * shows a MessageBox window
            * @param {brease.enum.MessageBoxType} type
            * @param {String} header
            * @param {String} message
            * @param {brease.enum.MessageBoxIcon} icon
            * @param {Object} buttonText
            * @param {String} style
            * @param {Function} callback The callback function is called after a button was clicked. It's passed a parameter data, which contains info about the clicked button, e.g. {button:'ok'}
            */
            showMessageBox: function (type, header, message, icon, buttonText, style) {
                var def = $.Deferred();
                $.when(this.getWindow('MessageBox')).then(function (messageBox) {
                    var options = {};

                    options.header = { text: header || '' };

                    options.content = { text: message || '' };

                    if (icon) {
                        options.icon = icon;
                    }
                    if (buttonText) {
                        options.buttonText = buttonText;
                    }

                    if (type) {
                        options.type = type;
                    }
                    messageBox.widget.resetStyles();

                    if (style) {
                        options.style = style;
                    }

                    messageBox.widget.show(options).then(
                        function (result) {
                            //console.iatInfo("MessageBoxResult", result);
                            def.resolve(result);
                            messageBox.used = false;
                        });
                });

                return def.promise();
            },

            /**
            * @method getWindow
            * get a MessageBox from the Pool
            * @param {String} type Type of Window (MessageBox/DialogWindow)
            * @return {Function} deferred Object with Messagebox Object
            */
            getWindow: function (type) {
                var def, self = this, WindowType;
                for (var i in _messageBoxPool) {
                    if (_messageBoxPool[i].used === false && _messageBoxPool[i].type === type) {
                        _messageBoxPool[i].used = true;
                        return _messageBoxPool[i];
                    }
                }
                def = $.Deferred();

                switch (type) {
                    case 'MessageBox':
                        WindowType = MessageBox;
                        break;
                    case 'DialogWindow':
                        WindowType = DialogWindow;
                        break;
                }

                new WindowType().isReady().then(function (box) {
                    _messageBoxPool.push({
                        widget: box,
                        used: false,
                        type: type
                    });
                    def.resolve(self.getWindow(type));
                });

                return def.promise();

            },

            /**
            * @method openDialog
            * opens a Dialog window
            * @param {String} dialogId Id of the Dialog
            * @param {brease.enum.DialogMode} mode
            * @param {String} horizontalPos
            * @param {String} verticalPos
            * @param {HTMLElement} refContainer
            * @param {String} headerText
            * @param {Boolean} autoClose
            * @param {brease.enum.AutoRaise} autoRaise
            */
            openDialog: function (dialogId, mode, horizontalPos, verticalPos, refContainer, headerText, autoClose, autoRaise) {
                var def = $.Deferred(),
                    options = {};

                if (_dialogs[dialogId] !== undefined) {
                    // dialog already open -> action response true
                    def.resolve(true);
                    return def.promise();
                }

                autoClose = Types.parseValue(autoClose, 'Boolean', { default: defaults.openDialog.autoClose });
                options.forceInteraction = !autoClose;

                mode = Types.parseValue(mode, 'Enum', { Enum: Enum.DialogMode, default: defaults.openDialog.mode });
                options.modal = mode === Enum.DialogMode.MODAL;

                autoRaise = Types.parseValue(autoRaise, 'Enum', { Enum: Enum.AutoRaise, default: defaults.openDialog.autoRaise });
                options.autoRaise = autoRaise;

                options.position = options.position || {};
                if (horizontalPos !== undefined) {
                    horizontalPos = _parsePosition(horizontalPos);
                    if (Utils.isString(horizontalPos)) {
                        options.position.horizontal = Types.parseValue(horizontalPos, 'Enum', { Enum: Enum.HorizontalPosition, default: defaults.openDialog.horizontalPos });
                    } else {
                        options.position.horizontal = horizontalPos;
                    }
                } else {
                    options.position.horizontal = defaults.openDialog.horizontalPos;
                }

                if (verticalPos !== undefined) {
                    verticalPos = _parsePosition(verticalPos);
                    if (Utils.isString(verticalPos)) {
                        options.position.vertical = Types.parseValue(verticalPos, 'Enum', { Enum: Enum.VerticalPosition, default: defaults.openDialog.verticalPos });
                    } else {
                        options.position.vertical = verticalPos;
                    }
                } else {
                    options.position.vertical = defaults.openDialog.verticalPos;
                }

                if (headerText !== undefined) {
                    options.headerText = headerText;
                }

                $.when(this.getWindow('DialogWindow')).then(function (dwindow) {
                    options.id = dialogId;
                    _dialogs[dialogId] = dwindow;
                    // dispatch dialog id to event controller for ClientSystemEvent.DIALOG_OPENED event
                    document.body.dispatchEvent(new CustomEvent(BreaseEvent.DIALOG_OPEN, { bubbles: true, cancelable: true, detail: { dialogId: dialogId } }));
                    var dialogExists = dwindow.widget.show(options, refContainer);
                    def.resolve(dialogExists);
                });

                return def.promise();
            },

            /**
            * @method openDialogAtTarget
            * @param {String} dialogId Id of the Dialog
            * @param {brease.enum.DialogMode} mode
            * @param {String} horizontalPos
            * @param {String} verticalPos
            * @param {HTMLElement} refContainer
            * @param {String} headerText
            * @param {Boolean} autoClose
            * @param {String} horDialogAlignment
            * @param {String} verDialogAlignment
            * @param {brease.enum.AutoRaise} autoRaise
            */
            openDialogAtTarget: function (dialogId, mode, horizontalPos, verticalPos, refContainer, headerText, autoClose, horDialogAlignment, verDialogAlignment, autoRaise) {
                var def = $.Deferred(),
                    options = {};

                if (_dialogs[dialogId] !== undefined) {
                    // dialog already open -> action response true
                    def.resolve(true);
                    return def.promise();
                }

                autoClose = Types.parseValue(autoClose, 'Boolean', { default: defaults.openDialogAtTarget.autoClose });
                options.forceInteraction = !autoClose;

                mode = Types.parseValue(mode, 'Enum', { Enum: Enum.DialogMode, default: defaults.openDialogAtTarget.mode });
                options.modal = mode === Enum.DialogMode.MODAL;

                autoRaise = Types.parseValue(autoRaise, 'Enum', { Enum: Enum.AutoRaise, default: defaults.openDialogAtTarget.autoRaise });
                options.autoRaise = autoRaise;
                options.position = {
                    horizontal: Types.parseValue(horizontalPos, 'Enum', { Enum: Enum.HorizontalPosition, default: defaults.openDialogAtTarget.horizontalPos }),
                    vertical: Types.parseValue(verticalPos, 'Enum', { Enum: Enum.VerticalPosition, default: defaults.openDialogAtTarget.verticalPos }),
                    horizontalDialog: Types.parseValue(horDialogAlignment, 'Enum', { Enum: Enum.HorizontalPosition, default: defaults.openDialogAtTarget.horDialogAlignment }),
                    verticalDialog: Types.parseValue(verDialogAlignment, 'Enum', { Enum: Enum.VerticalPosition, default: defaults.openDialogAtTarget.verDialogAlignment })
                };

                if (Utils.isString(headerText)) {
                    options.headerText = headerText;
                }

                $.when(this.getWindow('DialogWindow')).then(function (dwindow) {
                    options.id = dialogId;
                    _dialogs[dialogId] = dwindow;
                    // dispatch dialog id to event controller for ClientSystemEvent.DIALOG_OPENED event
                    document.body.dispatchEvent(new CustomEvent(BreaseEvent.DIALOG_OPEN, { bubbles: true, cancelable: true, detail: { dialogId: dialogId } }));
                    var dialogExists = dwindow.widget.show(options, refContainer);
                    def.resolve(dialogExists);
                });

                return def.promise();

            },

            /**
            * @method closeDialog
            * close a Dialog window
            * @param {String} id Id of the Dialog
            */
            closeDialog: function (dialogId) {
                var dWindow = _dialogs[dialogId];
                if (dWindow) {
                    var contentsInDialog = contentHelper.contentsInDialog(dialogId),
                        dialogPosition = _getDialogPosition(dWindow.widget.elem),
                        notActiveContentsInDialog = contentHelper.extractNotActive(contentsInDialog);

                    if (notActiveContentsInDialog.length > 0) {
                        console.iatWarn('Dialog ' + dialogId + ' open aborted! Not active contents: ' + notActiveContentsInDialog);
                        document.body.dispatchEvent(new CustomEvent(BreaseEvent.DIALOG_OPEN_ABORTED, { detail: { arContentId: notActiveContentsInDialog } }));
                    }
                    var activeContentsInDialog = contentHelper.extractActive(contentsInDialog);
                    $.when(
                        dWindow.widget.onClose(),
                        contentHelper.deactivateFinished(activeContentsInDialog)
                    ).then(function () {
                        visuModel.deactivateEmbeddedVisusWithoutActiveContent();
                        // dispatch dialog id to event controller for ClientSystemEvent.DIALOG_CLOSED
                        document.body.dispatchEvent(new CustomEvent(BreaseEvent.DIALOG_CLOSED, { bubbles: true, cancelable: true, detail: { dialogId: dialogId, horizontalPos: dialogPosition.x, verticalPos: dialogPosition.y } }));
                    });
                    dWindow.widget.hide();
                    _dialogs[dialogId] = undefined;
                    dWindow.used = false;
                }
            },

            openChangePasswordDialog: function (userName, showPolicy) {
                var def = $.Deferred(),
                    widget = new this.ChangePasswordDialogClass();

                $.when(widget.isParsed()).then(function () {
                    widget.show(userName, showPolicy);
                    def.resolve(true);
                });
                return def.promise();
            }
        },
        _messageBoxPool = [],
        _dialogs = [];

    function _getDialogPosition(elem) {
        var pos = { x: '0px', y: '0px' },
            elemPosition = elem ? { x: elem.style['left'], y: elem.style['top'] } : pos,
            rootZoom = brease.pageController.getRootZoom();
        if (!_.isNumber(rootZoom) || rootZoom === 0) { rootZoom = 1; }
        pos.x = Math.round(parseInt(elemPosition.x, 10) / rootZoom) + 'px';
        pos.y = Math.round(parseInt(elemPosition.y, 10) / rootZoom) + 'px';
        return pos;
    }

    function errorHandler() {
        brease.messenger.announce('WIDGET_LOAD_ERROR');
    }

    function _parsePosition(pos) {
        var pixelRegex = /\d+px/g;
        if (pixelRegex.test(pos)) {
            return parseInt(pos, 10);
        }
        return pos;
    }

    return controller;
});

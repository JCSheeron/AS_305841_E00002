define([
    'widgets/brease/Window/Window',
    'brease/controller/PopUpManager',
    'brease/controller/ZoomManager',
    'brease/events/BreaseEvent',
    'brease/enum/Enum',
    'brease/core/Utils',
    'brease/helper/SimpleQueue',
    'system/widgets/ChangePasswordDialog/libs/Validator',
    'system/widgets/ChangePasswordDialog/libs/Message',
    'system/widgets/ChangePasswordDialog/libs/Elements',
    'system/widgets/ChangePasswordDialog/libs/PolicyView'
], function (SuperClass, popUpManager, zoomManager, BreaseEvent, Enum, Utils, SimpleQueue, Validator, Message, Elements, PolicyView) {

    'use strict';

    /**
    * @class system.widgets.ChangePasswordDialog
    * #Description
    * widget to show a dialog window
    * @extends widgets.brease.Window
    *
    * @iatMeta studio:visible
    * false
    * @iatMeta category:Category
    * System
    * @finalClass
    */

    /**
    * @cfg {StyleReference} style
    * @hide
    */
    /**
     * @cfg {String} tooltip=''
     * @iatStudioExposed
     * @hide
     */
    /**
    * @cfg {Boolean} visible
    * @hide
    */
    /**
    * @cfg {Boolean} enable
    * @hide
    */
    /**
    * @cfg {RoleCollection} permissionOperate
    * @hide
    */
    /**
    * @cfg {RoleCollection} permissionView
    * @hide
    */

    /**
    * @method showTooltip
    * @hide
    */
    /**
     * @method setEnable
     * @hide
     */
    /**
     * @method setStyle
     * @hide
     */

    /**
     * @event EnableChanged
     * @hide
     */
    /**
     * @event VisibleChanged
     * @hide
     */
    /**
     * @event Click
     * @hide
     */
    /**
     * @event DisabledClick
     * @hide
     */
    /**
     * @event property_changed
     * @hide
     */

    /**
    * @cfg {Boolean} modal = true
    * @inheritdoc 
    */
    /**
    * @cfg {Boolean} forceInteraction = true
    * @inheritdoc 
    */
    /**
    * @cfg {Boolean} showCloseButton = true
    * @inheritdoc  
    */
    var defaultSettings = {
            modal: true,
            arrow: {
                show: false
            },
            forceInteraction: true,
            showCloseButton: true,
            position: {
                horizontal: 'center',
                vertical: 'middle'
            },
            pointOfOrigin: Enum.PointOfOrigin.CONTAINER,
            html: 'system/widgets/ChangePasswordDialog/ChangePasswordDialog.html',
            stylePrefix: 'system_brease_ChangePasswordDialog',
            width: 342,
            height: 524,
            hideTimeout: 5000,
            messageInterval: 1000
        },
        WidgetClass = SuperClass.extend(function ChangePasswordDialog(elem, options) {
            SuperClass.call(this, null, options, true, true);
            _loadHTML.call(this);
            this.parsedDeferred = $.Deferred();
        }, defaultSettings, true),
        p = WidgetClass.prototype;

    WidgetClass.RESULT = {
        success: 1,
        aborted: 0,
        not_supported: -2
    };

    p.init = function () {
        this.addInitialClass('breaseChangePasswordDialog');
        this.$outputArea = this.el.find('.outputArea');
        this.settings.windowType = 'ChangePasswordDialog';
        this.internalData.changeInProgress = false;
        this.internalData.changeSuccess = false;
        this.validator = new Validator();
        this.policyView = new PolicyView(this);
        SuperClass.prototype.init.call(this, true);
    };

    /**
    * @method show
    * Opens the ChangePasswordDialog
    * @param {String} userName
    * @param {Boolean} showPolicy
    */
    p.show = function (userName, showPolicy) {

        userName = Utils.isString(userName) ? userName : '';
        showPolicy = Utils.isBoolean(showPolicy) ? showPolicy : false;
        this.loadPolicies();
        
        var headerText = (userName) ? _text('IAT/System/Dialog/CHANGEPASSWORD_DIALOG_HEADER_USERNAME') : _text('IAT/System/Dialog/CHANGEPASSWORD_DIALOG_HEADER');

        if (userName) {
            headerText = headerText.replace('{1}', userName);
        }
        var options = {
            header: {
                text: headerText
            }
        };
        this.internalData.userName = userName;
        this.internalData.showPolicy = showPolicy;
        
        SuperClass.prototype.show.call(this, options);

        if (userName) {
            brease.uiController.setWidgetPropertyIndependentOfState(this.inputs.userName.elemId, 'value', userName);
            brease.uiController.setWidgetPropertyIndependentOfState(this.inputs.userName.elemId, 'visible', false);
            brease.uiController.setWidgetPropertyIndependentOfState(this.labels.userName.elemId, 'visible', false);
        }
        if (this.internalData.showPolicy) {
            var grpBoxPos = $('#chpwd_GroupBox').position(),
                btnChangePos = this.buttons.change.$el.position(),
                oldPasswordPos = this.inputs.oldPassword.$el.position();
            this.buttons.cancel.$el.css({ position: 'absolute', top: btnChangePos.top / this.dimensions.scale, left: 300 });
            this.policyView.$policyBox.css({ top: (oldPasswordPos.top + grpBoxPos.top) / this.dimensions.scale });
        }
    };

    p.loadPolicies = function () {
        var widget = this;
        brease.user.loadPasswordPolicies().then(
            function (policies) {
                widget.setPolicies(policies);
            },
            function (status) {
                console.iatWarn('loadPasswordPolicies.fail,status=', status);
            }
        );
    };

    p.setPolicies = function (policies) {
        this.validator.setPolicies(policies);
        if (this.internalData.showPolicy) {
            this.policyView.setPolicies(policies); 
        }
    };

    function _getCSS($el, property) {
        var value = parseInt($el.css(property), 10);
        if (isNaN(value)) {
            value = 0;
        }
        return value;
    }

    p._setDimensions = function () {
        if (this.internalData.showPolicy) {
            this.$contentBox.addClass('showPolicy');
        }

        var borderTop = _getCSS(this.$contentBox, 'border-top'),
            borderRight = _getCSS(this.$contentBox, 'border-right'),
            borderBottom = _getCSS(this.$contentBox, 'border-bottom'),
            borderLeft = _getCSS(this.$contentBox, 'border-left');

        this.dimensions.width = this.el.outerWidth();
        this.dimensions.height = this.el.outerHeight();
        if (this.internalData.userName) {
            this.dimensions.height -= 60;
        }

        var newWidth = this.dimensions.width + borderLeft + borderRight;
        var newHeight = this.dimensions.height + borderTop + borderBottom;
        if (this.internalData.showPolicy) {
            newWidth = 2 * this.dimensions.width + borderLeft + borderRight - 40;
            newHeight -= 40;
        }
        
        this.el.width(newWidth);
        this.el.height(newHeight);
        this.dimensions.width = newWidth;
        this.dimensions.height = newHeight;

        var headerHeight = this.el.find('header').outerHeight();

        this.$contentBox.css({
            width: newWidth - borderLeft - borderRight,
            height: newHeight - headerHeight - borderBottom - borderTop + 1,
            'margin-top': '-1px' // overlap header and content to avoid gap when zoom!=1
        });

        if (this.internalData.showPolicy) {
            this.policyView.init(this.elem, this.$contentBox);
        }
        _setZoom.call(this);
    };

    function _setZoom() {
        
        var rootZoom = brease.pageController.getRootZoom(),
            globalDim = popUpManager.getDimensions(),
            //calculate zoom factor depending on window size
            factor = zoomManager.zoomFitContainerSize(rootZoom, this.dimensions, 
                { 
                    width: globalDim.winWidth, 
                    height: globalDim.winHeight 
                });
        this._applyScale(factor);
    }

    p._setCloseButton = function () {
        SuperClass.prototype._setCloseButton.apply(this, arguments);
        // to allow setting the display property via styles
        this.closeButton.css('display', '');
    };

    p.readyHandler = function () {
        var widget = this;

        this.buttons.forEach(function (button) {
            button.$el.on(BreaseEvent.CLICK, widget._bind(_btnClickHandler));
        });

        this.inputs.forEach(function (input) {
            input.$el.on('ValueChanged', widget._bind(_inputChangeHandler));
        });

        SuperClass.prototype.readyHandler.apply(this, arguments);
    };

    p.isParsed = function () {
        return this.parsedDeferred.promise();
    };

    p.getForm = function () {
        return {
            userName: brease.callWidget(this.inputs.userName.elemId, 'getValue'),
            oldPassword: brease.callWidget(this.inputs.oldPassword.elemId, 'getValue'),
            newPassword: brease.callWidget(this.inputs.newPassword.elemId, 'getValue'),
            confirmPassword: brease.callWidget(this.inputs.confirmPassword.elemId, 'getValue')
        };
    };

    p.formValidation = function () {
        var form = this.getForm(),
            result = this.validator.validate(this.testInputs, form);
        
        if (result.policiesResult && this.testInputs.indexOf('newPassword') !== -1) {
            this.policyView.applyValidationResult(result.policiesResult);
        }

        this.showMessages(result.arError);
        this.highlightInputs(result.arInputs);
        return {
            isValid: result.isValid,
            form: form
        };
    };

    p.setInputLabel = function (elemId, value) {
        var fieldName = this.inputs.getMemberIdByElemId(elemId);
        if (value) {
            brease.callWidget(this.labels[fieldName].elemId, 'setText', this.labels[fieldName].textKey);
        } else {
            brease.callWidget(this.labels[fieldName].elemId, 'setText', '');
        }
    };

    p.enableTestAll = function () {
        if (!this.internalData.testAll) {
            this.internalData.testAll = true;
            this.testInputs = Object.keys(this.inputs);
        }
    };

    p.showMessages = function (arMessages) {
        var out = '';
        arMessages.forEach(function (message) {
            out += '<p class="' + message.type + '">' + message.content + '</p>';
        });
        this.$outputArea.html(out);
    };

    p.highlightInputs = function (arFields) {
        this.inputs.forEach(function (input, key) {
            input.$el.removeClass('error');
            if (arFields.indexOf(key) !== -1) {
                input.$el.addClass('error');
            }
        });
    };

    p.sendChange = function (form) {
        var widget = this;
        brease.user.changePassword(form.userName, form.oldPassword, form.newPassword).then(
            function (response, userName) {
                widget.internalData.changeInProgress = false;
                _showResponse.call(widget, 'success', response, userName);
            },
            function (response, userName) {
                widget.internalData.changeInProgress = false;
                _showResponse.call(widget, 'error', response, userName);
            }
        );
    };

    /**
    * @method hide
    * @inheritdoc  
    */
    p.hide = function () {
        SuperClass.prototype.hide.apply(this, arguments);

        document.body.dispatchEvent(new CustomEvent(BreaseEvent.CHANGEPASSWORDDIALOG_CLOSED, {
            detail: {
                result: (this.internalData.changeSuccess) ? WidgetClass.RESULT.success : WidgetClass.RESULT.aborted,
                userName: (this.internalData.userName) ? this.internalData.userName : ''
            }
        }));
        this.dispose();
    };

    p.dispose = function () {
        window.clearTimeout(this.internalData.timer);
        window.clearInterval(this.internalData.interval);
        this.elem.removeEventListener(BreaseEvent.WIDGET_READY, this._bind(_readyListener));
        this.elem.removeEventListener(BreaseEvent.CONTENT_PARSED, this._bind(_parsedListener));
        this.validator.dispose();
        this.buttons.dispose();
        this.inputs.dispose();
        this.labels.dispose();
        this.$contentBox = undefined;
        this.$outputArea = undefined;
        brease.uiController.dispose(this.elem, false);
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    /* PRIVATE */

    function _loadHTML() {
        var widget = this;
        require(['text!' + widget.settings.html], function _loadHTMLSuccess(html) {
            widget.deferredInit(document.body, html);
            _checkParsed.call(widget);
            _checkReady.call(widget);
            brease.uiController.parse(widget.elem);
        });
    }

    function _checkParsed() {
        this.elem.addEventListener(BreaseEvent.CONTENT_PARSED, this._bind(_parsedListener));
    }

    function _checkReady() {
        var widget = this;
        this.children = new SimpleQueue();
        this.el.find('[data-brease-widget]').each(function (index, element) {
            widget.children.add(element.id);
        });
        this.elem.addEventListener(BreaseEvent.WIDGET_READY, this._bind(_readyListener));
    }

    function _parsedListener(e) {
        this.elem.removeEventListener(BreaseEvent.CONTENT_PARSED, this._bind(_parsedListener));

        this.buttons = new Elements({
            change: { elemId: 'brease_chpwd_btn_change' },
            cancel: { elemId: 'brease_chpwd_btn_cancel' },
            confirm: { elemId: 'brease_chpwd_btn_confirm' }
        });

        this.inputs = new Elements({
            userName: { elemId: 'brease_chpwd_userName' },
            oldPassword: { elemId: 'brease_chpwd_oldPassword' },
            newPassword: { elemId: 'brease_chpwd_newPassword' },
            confirmPassword: { elemId: 'brease_chpwd_confirmPassword' }
        });
        this.testInputs = [];

        this.labels = new Elements({
            userName: { elemId: 'brease_chpwd_userName_label', textKey: '$IAT/System/Dialog/USERNAME' },
            oldPassword: { elemId: 'brease_chpwd_oldPassword_label', textKey: '$IAT/System/Dialog/OLD_PASSWORD' },
            newPassword: { elemId: 'brease_chpwd_newPassword_label', textKey: '$IAT/System/Dialog/NEW_PASSWORD' },
            confirmPassword: { elemId: 'brease_chpwd_confirmPassword_label', textKey: '$IAT/System/Dialog/CONFIRM_PASSWORD' }
        });

        this.$contentBox = this.el.find('.contentBox');
        this.parsedDeferred.resolve(this);
    }

    function _readyListener(e) {
        this.children.remove(e.target.id);
        if (this.children.length === 0) {
            this.elem.removeEventListener(BreaseEvent.WIDGET_READY, this._bind(_readyListener));
            this.readyHandler();
        }
    }

    function _btnClickHandler(e) {
        switch (e.target.id) {
            case this.buttons.confirm.elemId:
                _btnConfirmClickHandler.call(this);
                break;
            case this.buttons.change.elemId:
                _btnChangeClickHandler.call(this);
                break;
            case this.buttons.cancel.elemId:
                _btnCancelClickHandler.call(this);
                break;
        }
    }

    function _btnConfirmClickHandler() {
        this.internalData.changeInProgress = false;
        this.debouncedHide();
    }

    function _btnChangeClickHandler() {
        if (!this.internalData.changeInProgress) {
            this.internalData.changeInProgress = true;

            this.enableTestAll();
            var result = this.formValidation();
            if (result.isValid) {
                this.sendChange(result.form);
            } else {
                this.internalData.changeInProgress = false;
            }
        }
    }

    function _btnCancelClickHandler() {
        this.internalData.changeInProgress = false;
        this.debouncedHide();
    }

    function _inputChangeHandler(e) {
        var fieldName = this.inputs.getMemberIdByElemId(e.target.id);
        if (this.testInputs.indexOf(fieldName) === -1) {
            this.testInputs.push(fieldName);
        }
        this.setInputLabel(e.target.id, e.detail.value);
        this.formValidation();
    }

    function _showResponse(type, response, userName) {

        if (type === 'error') {
            this.internalData.changeSuccess = false;
            this.showMessages([new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_FAIL') + '<br/>' + _error(response.message), Message.Type.ERROR)]);
        } else {
            this.internalData.changeSuccess = true;
            this.internalData.userName = userName;
            this.buttons.change.$el.hide(100);
            this.buttons.cancel.$el.hide(100);
            this.inputs.forEach(function (input) {
                input.$el.hide(100);
            });
            this.policyView.hide();
            this.el.find('[data-brease-widget="widgets/brease/Label"]').hide(100);

            var btnConfirmWidth = this.buttons.confirm.$el.outerWidth(),
                contentWidth = this.$contentBox.innerWidth(),
                outputAreaWidth = this.$outputArea.outerWidth(),
                grpBoxLeft = $('#chpwd_GroupBox').position().left;

            this.buttons.confirm.$el.css({ 
                top: 220, 
                left: (contentWidth - btnConfirmWidth) / 2, 
                margin: '0px', 
                position: 'absolute' });

            this.$outputArea.css({ 
                top: 120, 
                left: (contentWidth - outputAreaWidth) / 2 - grpBoxLeft / this.dimensions.scale, 
                margin: '0px', 
                position: 'absolute' });

            brease.callWidget(this.buttons.confirm.elemId, 'setVisible', true);
            var successMessage = new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_SUCCESS'), Message.Type.SUCCESS);
            this.showMessages([successMessage]);
            _startTimer.call(this, successMessage);
        }
    }

    function _startTimer(successMessage) {
        this.internalData.countdown = 5;
        this.internalData.timer = window.setTimeout(_timerMethod, this.settings.hideTimeout, this);
        this.internalData.interval = window.setInterval(_intervalMethod, this.settings.messageInterval, this, successMessage);
    }

    function _timerMethod(widget) {
        widget.hide();
    }

    function _intervalMethod(widget, successMessage) {
        widget.internalData.countdown -= 1;
        if (widget.internalData.countdown > 0) {
            var text = _text('IAT/System/Dialog/DIALOG_CLOSES'),
                timerMessage = new Message('<br/>' + text.replace('{1}', widget.internalData.countdown), Message.Type.INFO);
            widget.showMessages([successMessage, timerMessage]);
        }
    }

    function _text(key) {
        return brease.language.getText(key);
    }

    var _errorKeys = {
        InvalidCredentials: 'IAT/System/Dialog/CHANGEPASSWORD_INVALID_CREDENTIALS',
        NotSupported: 'IAT/System/Dialog/CHANGEPASSWORD_SERVICE_NOTAVAILABLE',
        PasswordPoliciesNotMet: 'IAT/System/Dialog/CHANGEPASSWORD_POLICIES_NOT_MET',
        TimeOut: 'IAT/System/Dialog/CHANGEPASSWORD_TIMEOUT',
        UnknownError: 'IAT/System/Dialog/CHANGEPASSWORD_UNKNOWN_ERROR',
        'Command error': 'IAT/System/Dialog/CHANGEPASSWORD_UNKNOWN_ERROR'
    };

    function _error(error) {
        var key = _errorKeys['UnknownError'];
        if (_errorKeys[error] !== undefined) {
            key = _errorKeys[error];
        } else {
            console.iatWarn('unknown server response');
        }
        return brease.language.getText(key);
    }

    return WidgetClass;

});

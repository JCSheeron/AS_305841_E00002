define(['widgets/brease/Window/Window',
    'widgets/brease/MessageBox/libs/ButtonManager', 
    'brease/enum/Enum',
    'brease/events/BreaseEvent',
    'brease/controller/PopUpManager', 
    'brease/core/Utils', 
    'text!widgets/brease/MessageBox/MessageBox.html'], 
function (SuperClass, ButtonManager, Enum, BreaseEvent, popupManager, Utils) {

    'use strict';

    /**
    * @class widgets.brease.MessageBox
    * #Description
    * widget to show a window with some text (header, content and question) and some buttons.  
    * @extends widgets.brease.Window
    *
    * @iatMeta studio:visible
    * false
    * @iatMeta category:Category
    * System
    */

    /**
    * @htmltag examples
    * ##Example for calling a MessageBox:
    *
    *     <script>
    *         require(['widgets/brease/MessageBox/MessageBox', 'brease/enum/Enum'], function (MessageBox, Enum) {
    *             var messageBox = new MessageBox();
    *             messageBox.show({ header: { text: '$brease.common.attention' }, content: { text: '$brease.common.dummyContent' }, 'OKCancel')
    *               .then( function messageBoxResponseHandler(data) {
    *                   console.log(data);
    *               });
    *         
    *         }
    *     </script>
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
    * @cfg {Boolean} showCloseButton = false
    * @inheritdoc  
    */
    /**
    * @method setEnable
    * @inheritdoc
    */
    /**
    * @method setVisible
    * @inheritdoc
    */
    /**
    * @event EnableChanged
    * @inheritdoc
    */
    /**
    * @event Click
    * @inheritdoc
    */
    /**
    * @event VisibleChanged
    * @inheritdoc
    */
    var defaultSettings = {
            modal: true,
            arrow: {
                show: false
            },
            forceInteraction: true,
            showCloseButton: false,
            position: {
                horizontal: 'center',
                vertical: 'middle'
            },
            html: 'widgets/brease/MessageBox/MessageBox.html',
            icon: Enum.MessageBoxIcon.NONE,
            stylePrefix: 'system_brease_MessageBox',
            width: 500
        },

        WidgetClass = SuperClass.extend(function MessageBox(elem, options, deferredInit, inherited) {
            if (inherited === true) {
                SuperClass.call(this, null, null, true, true);
            } else {
                SuperClass.call(this, null, null, true, true);
                _loadHTML(this);
            }
        }, defaultSettings),

        p = WidgetClass.prototype,
        _counter = 0;

    function _loadHTML(widget) {
        require(['text!' + widget.settings.html], function (html) {
            var id = 'MessageBox' + (_counter += 1);
            html = html.replace(/\{\{ID\}\}/g, id);
            widget.deferredInit(document.body, html);
            widget.readyHandler();
            brease.uiController.parse(widget.elem, false, brease.settings.globalContent);
        });
    }

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseMessageBox');
        }
        this.settings.windowType = 'MessageBox';
        SuperClass.prototype.init.call(this, true);

        this.buttonManager = new ButtonManager(this, btnClickHandler);
    };

    p._setDimensions = function () {
        SuperClass.prototype._setDimensions.call(this);
        if (this.settings.height !== undefined) {
            this.el.find('.contentBox').css('height', this.settings.height - 42 - this.el.find('.messageBoxFooter').outerHeight());
        }
    };

    p._getOffset = function () {

        var num = popupManager.getNumberOfWindowsOfType(this.settings.windowType);
        return (num - 1) * 20;
    };

    /**
    * @method show
    * Opens the MessageBox window
    * @param {brease.objects.MessageBoxOptions} options
    * @param {Function} callback The callback function is called after a button was clicked. It's passed a parameter data, which contains info about the clicked button, e.g. {button:'ok'}
    */
    p.show = function (options) {

        this.deferred = $.Deferred();
        if (this.settings.question !== undefined && brease.language.isKey(this.settings.question.text)) {
            this.settings.question.textkey = brease.language.parseKey(this.settings.question.text);
        }
        SuperClass.prototype.show.call(this, options);
        this.buttonManager.setButtons(this.settings.type);
        this.buttonManager.addEventListeners();
        this.setIcon();
        this._setDimensions();
        this.dispatchEvent(new CustomEvent(BreaseEvent.MESSAGE_BOX_OPENED, { detail: { id: this.elem.id }, bubbles: true }));
        return this.deferred.promise();
    };

    /**
    * @method hide
    * closes window  
    */
    p.hide = function () {
        this.buttonManager.removeEventListeners();
        SuperClass.prototype.hide.call(this);
        this.dispatchEvent(new CustomEvent(BreaseEvent.MESSAGE_BOX_CLOSED, { detail: { id: this.elem.id }, bubbles: true }));
    };
    /**
       * @method setStyle
       * Overwrites method from BaseWidget module  
       * @param {StyleReference} style
       */
    p.setStyle = function (style) {
        Utils.removeClassByRegExp(this.elem, new RegExp('\\b' + this.settings.stylePrefix + '\\S+', 'g'));
        SuperClass.prototype.setStyle.apply(this, arguments);
    };
    /**
    * @method _setContent
    * sets Content
    */
    p._setContent = function () {
        SuperClass.prototype._setContent.call(this);

        if (this.settings.question !== undefined) {
            this.el.find('.messageBoxQuestion').html((this.settings.question.textkey) ? brease.language.getTextByKey(this.settings.question.textkey) : this.settings.question.text).show();
        } else {
            this.el.find('.messageBoxQuestion').html('').hide();
        }
    };

    p.langChangeHandler = function () {
        SuperClass.prototype.langChangeHandler.apply(this, arguments);
        this.buttonManager.setTexts();
    };

    /**
    * @method setIcon
    * sets the configured icon
    */
    p.setIcon = function () {
        var icon = this.settings.icon,
            iconEl = this.el.find('.icon');

        iconEl.removeClass('asterisk error exclamation information question stop warning hand none');

        switch (icon) {
            case Enum.MessageBoxIcon.ASTERISK:
                iconEl.addClass('asterisk');
                break;

            case Enum.MessageBoxIcon.ERROR:
                iconEl.addClass('error');
                break;

            case Enum.MessageBoxIcon.EXCLAMATION:
                iconEl.addClass('exclamation');
                break;

            case Enum.MessageBoxIcon.INFORMATION:
                iconEl.addClass('information');
                break;

            case Enum.MessageBoxIcon.QUESTION:
                iconEl.addClass('question');
                break;

            case Enum.MessageBoxIcon.STOP:
                iconEl.addClass('stop');
                break;

            case Enum.MessageBoxIcon.WARNING:
                iconEl.addClass('warning');
                break;

            case Enum.MessageBoxIcon.HAND:
                iconEl.addClass('hand');
                break;

            default:
                iconEl.addClass('none');
                break;

        }

    };

    function btnClickHandler(submitValue) {

        this.deferred.resolve(submitValue);
        this.hide();
    }

    return WidgetClass;

});

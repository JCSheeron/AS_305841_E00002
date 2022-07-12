define([
    'brease/core/Class',
    'brease/events/BreaseEvent',
    'widgets/brease/GenericDialog/GenericDialog',
    'widgets/brease/GenericDialog/libs/config',
    'widgets/brease/Table/libs/FilterSettings',
    'widgets/brease/Table/libs/DialogueTexts',
    'widgets/brease/Label/Label',
    'widgets/brease/CheckBox/CheckBox',
    'widgets/brease/DateTimeInput/DateTimeInput',
    'widgets/brease/Image/Image',
    'widgets/brease/Rectangle/Rectangle',
    'widgets/brease/DropDownBox/DropDownBox',
    'widgets/brease/NumericInput/NumericInput'
], function (
    SuperClass, BreaseEvent, GenericDialog, DialogConfig, Filter, Texts
) {
    
    'use strict';

    var DialogueClass = SuperClass.extend(function Dialogue(widget) {
            this.dialog = new GenericDialog(widget.elem);
            SuperClass.apply(this);
            this.widget = widget;
        }, null),

        p = DialogueClass.prototype;
    
    p.initializeFilter = function (lang) {
        this.filter = new Filter(this.dialog, this.widget, lang);
        this._initializeEmptyDialogConfig(Texts[lang].title);
        return this.config;
    };

    p.openFilter = function () {
        this.lang = _getLanguage();
        this.dialog.show(this.initializeFilter(this.lang), this.widget.elem);
        this.passedFirst = false;
        var self = this;
        this.dialog.isReady().then(function () {
            $('#' + self.dialog.elem.id)
                .on(BreaseEvent.WIDGET_READY, self._bind('_widgetAddedToFilter'))
                .on('window_closing', self._bind('_collectFilterBeforeClosing'));
        });
    };

    p._initializeEmptyDialogConfig = function (headerText) {
        this.config = new DialogConfig();

        // dialog
        this.config.forceInteraction = true;
        this.config.contentWidth = 600;
        this.config.contentHeight = 480;

        // header
        this.config.header.text = headerText;

        //footer
        this.config.buttons.ok = true;
        this.config.buttons.cancel = true;
    };

    p._widgetAddedToFilter = function () {
        $('#' + this.dialog.elem.id)
            .off(BreaseEvent.WIDGET_READY, this._bind('_widgetAddedToFilter'))
            .addClass('system_brease_TableConfigurationDialog_style_default');
        this.filter.initialize();
        this.filter._reColourFirstLineSeparator();
    };

    p._collectFilterBeforeClosing = function (e) {
        if (brease.uiController.parentWidgetId(e.target) === this.dialog.elem.id) {
            this.filter.removeEventListeners();
            if (this.dialog.getDialogResult() === 'ok') {
                this.widget.settings.filter = this.filter._widgetCollectStateBeforeClosing();
                this.widget.renderer.updateTableSize();
                this.widget.submitFilterConfiguration();
            }
        }
    };

    p._addRowHandler = function (e) {
        this.filter._addRowHandler(e);
    };
    
    function _getLanguage() {
        var lang = brease.language.getCurrentLanguage();
        if (lang !== 'de') {
            lang = 'en';
        }
        return lang;
    }

    p.dispose = function () {
        this.dialog.dispose();
        SuperClass.prototype.dispose.call(this);
    };

    return DialogueClass;
});

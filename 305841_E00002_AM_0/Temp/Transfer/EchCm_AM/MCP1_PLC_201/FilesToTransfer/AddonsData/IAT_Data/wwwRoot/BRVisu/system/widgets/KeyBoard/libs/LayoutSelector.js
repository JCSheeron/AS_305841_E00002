define([
    'brease/events/BreaseEvent'
], function (BreaseEvent) {

    'use strict';

    /**
     * @class system.widgets.KeyBoard.libs.LayoutSelector
     * #Description
     * Handles the selection of language independent layouts. Displays
     * a list of available layouts if there are more than two configured. Otherwise
     * it will switch between the configured layouts without displaying a list.
     * @extends Class
     */
    var LayoutSelector = function () {
            this.currentLayout = '';
        },
        p = LayoutSelector.prototype;

    p.init = function (callback) {
        this.el = $('<div class="dropdown"></div>');
        this.btn = $('<div class="button"></div>');
        this.list = $('<div class="dropdownlist"></div>');
        this.callback = callback;
        this.btn.on(BreaseEvent.CLICK, { self: this }, _onBtnClick);
        this.list.on(BreaseEvent.CLICK, '[data-value]', { self: this }, _onListEntryClick);
        //this.setItems(items);
        this.el.append([this.btn, this.list]);
    };
    /**
     * @method setItems
     * set the items to be selected
     * @param {Object} items
     */
    p.setItems = function (items) {
        //console.debug('setItems:',items);
        var optionel;
        this.list.empty();
        for (var item in items) {
            var displayName = items[item].displayName,
                description = items[item].description;
            optionel = $('<div data-value="' + item + '" data-displayName="' + (displayName || '') + '" data-name="' + description + '" data-index="' + items[item].index + '">' + (displayName || description) + '</div>');
            if (item === this.currentLayout) {
                optionel.addClass('selected');
                this.setButtonText(displayName || item);
            }
            this.list.append(optionel);
        }
    };
    /**
     * @method getItems
     * returns a set of available items. accepts an optional selector to filter
     * items to be returned.
     * @param {String} selector
     */
    p.getItems = function (selector) {
        if (selector) {
            return this.list.children(selector);
        } else {
            return this.list.children();
        }

    };

    /**
     * @method setCurrentLayout
     * sets the current layout
     * @param {String} currentLayout
     */
    p.setCurrentLayout = function (currentLayout) {
        this.currentLayout = currentLayout;
        if (!this.list) {
            this.list = $('<div class="dropdownlist"></div>');
        }
        this.list.find('.selected').removeClass('selected');
        this.list.find('[data-value="' + currentLayout + '"]').addClass('selected');
    };

    p.setButtonText = function (text) {
        this.btn.text(text);
    };

    p.dispose = function () {
        this.callback = null;
        this.btn.off(BreaseEvent.CLICK, { self: this }, _onBtnClick);
        this.list.off(BreaseEvent.CLICK, '[data-value]', { self: this }, _onListEntryClick);
        $('#breaseKeyBoard').off(BreaseEvent.CLICK, _onOutsideClick);
    };

    p.close = function () {
        _closeSelector.call(this);
    };

    function _openSelector() {
        var self = this;
        this.list.addClass('open');
        window.setTimeout(function () {
            $('#breaseKeyBoard').on(BreaseEvent.CLICK, { selector: self }, _onOutsideClick);
        }, 0);
    }

    function _closeSelector() {
        this.list.removeClass('open');
        $('#breaseKeyBoard').off(BreaseEvent.CLICK, _onOutsideClick);
    }

    function _onOutsideClick(e) {
        var selector = e.data.selector;

        if (selector.getItems().length > 2 && selector.list.hasClass('open') && !$.contains(selector.el[0], e.target)) {
            _closeSelector.call(selector);
        }
    }

    function _onBtnClick(e) {
        var selector = e.data.self;
        if (selector.getItems().length > 2 && !selector.list.hasClass('open')) {
            _openSelector.call(selector);
        } else if (selector.list.hasClass('open')) {
            selector.list.removeClass('open');
        } else {
            selector.list.removeClass('open').find(':not(.selected),:only-child()').trigger(BreaseEvent.CLICK);
        }

    }

    function _onListEntryClick(e) {
        var selector = e.data.self,
            target = $(this),
            langcode = target.attr('data-value'),
            displayName = target.attr('data-displayName');
        selector.list.find('.selected').removeClass('selected');
        target.addClass('selected');
        selector.setButtonText(displayName || langcode);
        if (typeof selector.callback === 'function') {
            selector.callback(langcode);
        }
        selector.list.removeClass('open');
    }
    return LayoutSelector;
});

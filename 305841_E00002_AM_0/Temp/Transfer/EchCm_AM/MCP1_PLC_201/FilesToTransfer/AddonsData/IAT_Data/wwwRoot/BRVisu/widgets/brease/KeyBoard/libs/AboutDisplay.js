define([
    'brease/events/BreaseEvent'
], function (BreaseEvent) {

    'use strict';

    /**
     * @class widgets.brease.KeyBoard.AboutDisplay
     * #Description
     * Handles the selection of language independent layouts. Displays
     * a list of available layouts if there are more than two configured. Otherwise
     * it will switch between the configured layouts without displaying a list.
     * @extends Class
     */
    var AboutDisplay = function () {},
        p = AboutDisplay.prototype;

    p.init = function (el) {
        this.parentEl = el;
        this.frameEl = el.find('.keyBoardAbout');
        if (this.frameEl) {
            this.frameEl.find('button').on(BreaseEvent.CLICK, { self: this }, this.onButtonCLick);
            this.parentEl.on(BreaseEvent.CLICK, '[data-href]', { self: this }, this.onSpanCLick);
        }
    };

    p.onSpanCLick = function (e) {
        var display = e.data.self;
        display.frameEl.find('iframe').attr('src', $(this).attr('data-href').replace('http://www.edrdg.org/', 'widgets/brease/KeyBoard/assets/doc/KanjiDic/'));
        display.frameEl.find('span').text($(this).attr('data-href'));
        display.frameEl.show();
    };

    p.onButtonCLick = function (e) {
        var display = e.data.self;
        display.frameEl.hide();
    };

    p.dispose = function () {
        if (this.frameEl) {
            this.frameEl.find('button').off(BreaseEvent.CLICK, { self: this }, this.onButtonCLick);
            this.parentEl.off(BreaseEvent.CLICK, '[data-href]', { self: this }, this.onSpanCLick);
        }
        this.frameEl = null;
        this.parentEl = null;
    };
    return AboutDisplay;
});

define([
    'brease/core/Class', 
    'brease/events/BreaseEvent'
], function (SuperClass, BreaseEvent) {

    'use strict';

    var SliderWheel = SuperClass.extend(function SliderWheel($el, settings, callback) {
            SuperClass.call(this);
            if (typeof callback !== 'function') {
                throw new SyntaxError('callback required');
            }
            this.callback = callback;
            this.$el = $el;
            this.settings = settings;
            this.itemHeight = defaults.itemHeight;
            this.initialize();
        }, null),

        p = SliderWheel.prototype,
        defaults = {
            itemHeight: 40
        };

    p.initialize = function () {
        var marker1 = $('<div class="marker">'),
            marker2 = $('<div class="marker">');
        this.fragment = $('<div class="fragment"></div>');
        this.data = [];

        this.drawSlider();

        this.$el.append([marker1, marker2, this.fragment]);

        this.fragment.on(BreaseEvent.MOUSE_DOWN, this._bind('_onMouseDown'));

        this._setIndex(0);
    };

    p.drawSlider = function () {
        var index = 0, text, elems = '';
        if (this.settings.range !== undefined) {
            for (var i = this.settings.range.start; i <= this.settings.range.end; i += this.settings.range.offset) {
                if (this.settings.digits !== undefined) {
                    text = _format(i, this.settings.digits);
                } else {
                    text = i;
                }
                elems += '<button data-index="' + index + '" data-value="' + i + '">' + text + '</button>';
                this.data[index] = { value: i, text: text };
                index += 1;
            }
            this.offset = 0;
            this.max = 2 * this.itemHeight;
            this.min = (index - 3) * -this.itemHeight;

        } else if (this.settings.data !== undefined) {
            for (var j in this.settings.data) {
                elems += '<button data-index="' + index + '" data-value="' + this.settings.data[j].value + '">' + this.settings.data[j].text + '</button>';
                this.data[index] = { value: this.settings.data[j].value, text: this.settings.data[j].text };
                index += 1;
            }
            this.offset = 0;
            this.max = 2 * this.itemHeight;
            this.min = (index - 3) * -this.itemHeight;

        }
        this.fragment.append(elems);

    };

    p.dispose = function () {
        this.$el.empty();
        this.callback = null;
    };

    p.update = function (data) {
        for (var i = 0; i < data.length; i += 1) {
            var item = data[i];
            this.fragment.find('[data-value=' + item.value + ']').html(item.text);
        }
    };

    p._onClick = function (e) {
        e.originalEvent.preventDefault();
        var index = $(e.target).attr('data-index');

        if (index !== undefined) {
            this._setIndex(index);
        }
    };

    p._onMouseDown = function (e) {
        this.oldOffset = this.offset;
        e.originalEvent.preventDefault();
        if (e.originalEvent.touches) {
            this.pageY = e.originalEvent.touches[0].pageY - this.offset;
        } else {
            this.pageY = e.pageY - this.offset;
        }
        this.fragment.removeClass('transition');
        brease.docEl.on(BreaseEvent.MOUSE_MOVE, this._bind('_onMouseMove'));
        brease.docEl.on(BreaseEvent.MOUSE_UP, this._bind('_onMouseUp'));
    };

    p._onMouseMove = function (e) {
        var pageY, offset;

        if (e.originalEvent.touches) {
            pageY = e.originalEvent.touches[0].pageY;
        } else {
            pageY = e.pageY;
        }

        offset = pageY - this.pageY;

        if (offset >= this.min && offset <= this.max) {
            this.offset = pageY - this.pageY;
        }
        this.fragment.css('top', this.offset);
    };

    p._onMouseUp = function (e) {
        brease.docEl.off(BreaseEvent.MOUSE_MOVE, this._bind('_onMouseMove'));
        brease.docEl.off(BreaseEvent.MOUSE_UP, this._bind('_onMouseUp'));
        if (this.offset !== this.oldOffset) {
            var index = Math.round(((this.offset) / -this.itemHeight) + 2);
            this._setIndex(index);
        } else {
            this._onClick(e);
        }
    };

    p._setIndex = function (index) {
        this.index = index;
        var offset = index * (-this.itemHeight) + 2 * this.itemHeight;

        var value = this.data[index].value;

        this.fragment.addClass('transition');

        this.fragment.css('top', offset);
        this.offset = offset;
        this.callback(value); 
    };

    p.getValue = function () {
        return this.data[this.index].value;
    };

    p.setValue = function (value) {
        var elem = this.fragment.find("button[data-value='" + value + "']"),
            index;

        if (elem.length > 0) {
            index = elem.attr('data-index');
        }
        if (index !== undefined) {
            this._setIndex(index); 
        }
    };

    p.show = function () {
        this.$el.show();
    };

    p.hide = function () {
        this.$el.hide();

    };

    p.detach = function () {
        this.$el.detach();
    };

    p.insert = function () {
        this.$el.appendTo('.dateTimePickerButtons');
    };

    function _format(value, digits) {
        var str = value + '';
        if (str.length < digits) {
            str = '000000000' + str;
            return str.substr(str.length - digits);
        } else {
            return str;
        }
    }

    return SliderWheel;

});

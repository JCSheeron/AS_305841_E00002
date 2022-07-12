define(function () {

    'use strict';

    /**
     * @class widgets.brease.KeyBoard.ComposerZhCHS
     * #Description
     * Handles phonetic input for simplified chinese
     * @extends Object
     */
    var ComposerZhCHS = function () {
            this.value = '';
            this.startIndex = -1;
        },
        p = ComposerZhCHS.prototype;

    p.init = function () {
        this.value = '';
        this.startIndex = -1;
    };
    p.parseInput = function (value) {
        var arrPhoneticChars = [];
        return arrPhoneticChars;
    };
    p.setValue = function (value) {
        this.value = value;
        this.len = value.length;
    };
    p.getValue = function () {
        return this.value;
    };
    p.clearValue = function () {
        this.value = '';
    };
    p.setStartIndex = function (index) {
        if (index < 0) {
            index = 0;
        }
        this.startIndex = index;
    };
    p.resetStartIndex = function () {
        this.startIndex = -1;
    };
    p.getStartIndex = function () {
        return this.startIndex;
    };
    p.addChar = function (val, index) {
        var position = index - this.startIndex,
            start = this.value.slice(0, position),
            end = this.value.slice(position, this.value.length);
        if (position >= 0 && position <= this.value.length + 1) {
            this.value = start + val + end;
        }
        //console.log('addChar', index, this.startIndex, char);
    };
    p.getLen = function () {
        return typeof this.value === 'string' ? this.value.length : null;
    };
    p.removeChar = function (val, index) {
        var position = index - this.startIndex,
            start = this.value.slice(0, position),
            end = this.value.slice(position + 1, this.value.length);
        if (position === this.value.length) {
            start = this.value.slice(0, position - 1);
        }
        if (position >= 0 && position <= this.value.length) {
            this.value = start + end;
        }
        //console.log('removeChar', index, this.startIndex, char);
    };
    p.dispose = function () {
        this.value = null;
        this.startIndex = null;
    };
    return new ComposerZhCHS();
});
